describe('Printer Zebra', function() {
    var ENABLE9K = 9000;
    var ENABLE10K = 10000;
    var ENABLE60K = 60000;
    var ENABLE120K = 120000;
    var ENABLE5MIN = 300000;
    var ENABLE30MIN = 1800000;
    var connect_type = Rho.PrinterZebra.CONNECTION_TYPE_TCP;
    var CommandZPL = '^XA^FO50,50^ADN,36,20^FDZebraPrinting^FS^XZ';
    var CommandCCPL = '"! 0 200 200 210 1\r\nTEXT 4 0 30 40 Hello World\r\nFORM\r\nPRINT\r\n';
    var last_found_printer_id = null;

    // DO NOT COPYPASTE IT!
    function makeFilePath(filename) {
        return Rho.RhoFile.join(Rho.Application.modelFolderPath('PrinterZebra'), Rho.RhoFile.join('PrinterZebraFiles', filename));
    }

    var txtfilepath = makeFilePath('txtfile.txt');
    var csvfilepath = makeFilePath('csvfile.csv');
    var xlsfilepath = makeFilePath('xlsfile.xls');
    var docfilepath = makeFilePath('docfile.doc');
    var htmlcssfilepath = makeFilePath('htmlfile.html');
    var jsfilepath = makeFilePath('jsfile.js');
    var cppfilepath = makeFilePath('cppfile.cpp');
    var pdffilepath = makeFilePath('pdffile.pdf');
    var hashzplfilepath = makeFilePath('hashzplfile.zpl');
    var hashccplfilepath = makeFilePath('hashccplfile.ccpl');
    var arrayzplfilepath = makeFilePath('arrayzplfile.zpl');
    var arrayccplfilepath = makeFilePath('arrayccplfile.ccpl');
    var invalidcontentsfilepath = makeFilePath('invalidcontetsfile');
    var sizes = [];
    
    if (Rho.System.platform == Rho.System.PLATFORM_WM_CE)
    {
        sizes = ['320px', '640px', '1024px'];
    }
    else
    {
        sizes = ['320px', '640px', '1024px', '2048px'];
    }
        
    var extensions = ['png', 'jpg', 'gif', 'bmp'];

    for (var e = extensions.length - 1; e >= 0; e--) {
        var collection = [];
        for (var sz = 0; sz < sizes.length; sz++) {
            var varname = extensions[e] + 'imagepath_' + sizes[sz];
            var filepath = makeFilePath(varname + '.' + extensions[e]);
            // EVAL INTENT!
            eval("var " + varname + " = '" + filepath + "'");

            collection.push(varname);
        }
        eval("var " + extensions[e] + "_s" + " = [" + collection.join(",") + "];");
    }

    var pngimagepath_320px = makeFilePath('pngimagepath_320px.png');

    var test_cpcl = makeFilePath('test_cpcl.lbl');
    var test_zpl = makeFilePath('test_zpl.zpl');

    var printerDriveAndFileName = 'E:FILE.GRF';
    var printerOnlyFileName = 'FILE.GRF';
    var invalidfilepath = 'ZA://flder';

    var zplformatpath = 'e:zplformat.zpl';
    var hashzpl = {
        0: 'val1',
        5: 'val2',
        1: 'val3',
        25: 'val4',
        100: 'val5'
    };
    var ccplformatpath = 'e:ccplformat.ccpl';
    var hashccpl = {
        0: 'val1',
        1: 'val3',
        5: 'val2',
        25: 'val4',
        100: 'val5'
    };
    var invalidformatpath = 'bg:ccplformat.invalid';
    // hash should be parseable by javascript
    var invalidzplhash = {
        0: 'val1',
        10203: 'val1',
        2211: 'val1',
        '3355sasa': 'val1'
    };
    var arrayzpl = [0, 1, 10, 5, 20];
    var arrayccpl = [0, 1, 2, 3, 4, 5, 6];

    function makeCurrentTestLabel() {
        return makeTestLabel(jasmine.getEnv().currentSpec.description);
    }

    ////////////////////////////////
    var thisprinter = null;

    function doConnect() {
        var callresult = null;

        function cbk(val) {
            callresult = val;
        }

        runs(function() {
            if (last_found_printer_id == null) {
                var allprinters = Rho.PrinterZebra.enumerate();
                last_found_printer_id = allprinters[0].ID;
            }
            expect(last_found_printer_id).toNotEqual(null);
            thisprinter = Rho.PrinterZebra.getPrinterByID(last_found_printer_id);
            callresult = null;
            thisprinter.connect(cbk);
        });

        waitsFor(function() {
            return callresult !== null;
        }, 'wait until connected', 10000);

        runs(function() {
            expect(callresult).toEqual(Rho.PrinterZebra.PRINTER_STATUS_SUCCESS);
            expect(thisprinter.isConnected).toEqual(true);
            callresult = null;
        });
    }

    function doPrintTestLabel() {
        var callresult = null;

        function cbk(val) {
            callresult = val;
        }

        runs(function() {
            callresult = null;
            thisprinter.printRawString(makeCurrentTestLabel(), {}, cbk);
        });

        waitsFor(function() {
            return callresult !== null;
        }, 'wait until printingLabel', 20000);

        runs(function() {
            expect(callresult.status).toEqual(Rho.PrinterZebra.PRINTER_STATUS_SUCCESS);
            callresult = null;
        });
    }

    function doSetLabelLength(len) {
        var callresult = null;

        function cbk(val) {
            callresult = val;
        }

        runs(function() {
            callresult = null;
            thisprinter.printRawString('^XA^MNN^LL' + len + '^XA^JUS^XZ', {}, cbk);
        });

        waitsFor(function() {
            return callresult !== null;
        }, 'wait until setting lable length', 7000);
    }

    function doPrintPrintFile(filename, options, isOk) {
        var callresult = null;

        function cbk(val) {
            callresult = val;
        }

        runs(function() {
            callresult = null;
            thisprinter.printFile(filename, options, cbk);
        });

        waitsFor(function() {
            return callresult !== null;
        }, 'wait until printingFile', 30000);

        runs(function() {
            if (isOk !== false) {
                expect(callresult).toEqual(Rho.PrinterZebra.PRINTER_STATUS_SUCCESS);
            } else {
                expect(callresult).toNotEqual(Rho.PrinterZebra.PRINTER_STATUS_SUCCESS);
            }
        });
    }

    function doPrintRawCommand(cmd) {
        var callresult = null;

        function cbk(val) {
            callresult = val;
        }

        runs(function() {
            callresult = null;
            thisprinter.printRawString(cmd, {}, cbk);
        });

        waitsFor(function() {
            return callresult !== null;
        }, 'wait until setting lable length', 15000);
    }

    function doPrintImage(from, x, y, options, isOk) {
        var callresult = null;

        function cbk(val) {
            callresult = val;
        }

        runs(function() {
            callresult = null;
            thisprinter.printImageFromFile(from, x, y, options, cbk);
        });

        waitsFor(function() {
            return callresult !== null;
        }, 'wait printImageFromFile', 30000);

        runs(function() {
            if (isOk !== false) {
                expect(callresult).toEqual(Rho.PrinterZebra.PRINTER_STATUS_SUCCESS);
                callresult = null;
            } else {
                expect(callresult).toNotEqual(Rho.PrinterZebra.PRINTER_STATUS_SUCCESS);
            }
        });
    }

    function doSendFileContents(filename) {
        var callresult = null;

        function cbk(val) {
            callresult = val;
        }

        runs(function() {
            callresult = null;
            thisprinter.sendFileContents(filename, cbk);
        });

        waitsFor(function() {
            return callresult !== null;
        }, 'wait doSendFileContents', 30000);

        runs(function() {
            expect(callresult).toEqual(Rho.PrinterZebra.PRINTER_STATUS_SUCCESS);
        });
    }

    function doRetrieveFileNames(filelist) {
        var callresult = null;

        function cbk(val) {
            callresult = val;
        }

        runs(function() {
            callresult = null;
            thisprinter.retrieveFileNames(cbk);
        });

        waitsFor(function() {
            return callresult !== null;
        }, 'wait doRetrieveFileNames', 30000);

        runs(function() {
            expect(callresult.status).toEqual(Rho.PrinterZebra.PRINTER_STATUS_SUCCESS);
            expect(callresult.fileNames).toNotEqual(filelist);
        });
    }

    function doRetrieveFileNamesWithExtensions(ext, filelist) {
        var callresult = null;

        function cbk(val) {
            callresult = val;
        }

        runs(function() {
            callresult = null;
            thisprinter.retrieveFileNamesWithExtensions(ext, cbk);
        });

        waitsFor(function() {
            return callresult !== null;
        }, 'wait doRetrieveFileNames', 30000);

        runs(function() {
            expect(callresult.status).toEqual(Rho.PrinterZebra.PRINTER_STATUS_SUCCESS);
            expect(callresult.fileNames).toNotEqual(filelist);
        });
    }


    beforeEach(function() {
        document.getElementById('actResult').innerHTML = 'init';
        $('#select_box_wrapper').empty();
        $('#myList').empty();
        $('#event_list').empty();
    });

    afterEach(function() {});

    // setup 
    it('initialize before tests', function() {
        var searchObject = {};
        runs(function() {
            setObjective(jasmine.getEnv().currentSpec.description);
            setInstruction('Wait until devices are discovered to continue');
            setExpected('Press any button to continute');
            setupTestFields();
        });

        runs(function() {
            Rho.Log.info("initialize ", "JSC");
            searchObject = runSearch({}, 30000);
            Rho.Log.info("runned ", "JSC");
        });

        waitsFor(function() {
            return searchObject.finished;
        }, '60sec waiting for Search printer', ENABLE60K);

        runs(function() {
            Rho.Log.info("afterwait ", "JSC");
            if (searchObject.printers.length > 0) {
                displaySearchResults({}, searchObject.printers, searchObject.errors);
                updatePrinterList(searchObject.printers);
                last_found_printer_id = searchObject.printers[0];
            }
            expect(searchObject.errors).toEqual([]);
            expect(searchObject.printers.length).toBeGreaterThan(0);
        });
    });

    // call function 
    describe('enumerateSupportedTypes method', function() {
        it('using result', function() {
            runs(function() {
                var printerTypes = Rho.PrinterZebra.enumerateSupportedTypes();
                expect(printerTypes).toEqual([Rho.PrinterZebra.PRINTER_TYPE_ZEBRA]);
            });
        });
        it('using callback', function() {
            var enumCb = null;

            function enumerateCallback(callbackValue) {
                enumCb = callbackValue;
            }
            runs(function() {
                Rho.PrinterZebra.enumerateSupportedTypes(enumerateCallback);
            });
            waitsFor(function() {
                return enumCb !== null;
            }, 'Timed out waiting for testing callback', 2000);
            runs(function() {
                expect(enumCb).toEqual([Rho.PrinterZebra.PRINTER_TYPE_ZEBRA]);
            });
        });
        it('using anonymous callback', function() {
            var enumCb = null;

            runs(function() {
                Rho.PrinterZebra.enumerateSupportedTypes(
                    function(callbackValue) {
                        enumCb = callbackValue;
                    });
            });
            waitsFor(function() {
                return enumCb !== null;
            }, 'Timed out waiting for testing callback', 2000);
            runs(function() {
                expect(enumCb).toEqual([Rho.PrinterZebra.PRINTER_TYPE_ZEBRA]);
            });
        });
    });

    // search printer automatically with all available parameters
    xdescribe('searchPrinters Method', function() {
        var searchParamaters = {};

        beforeEach(function() {
            searchParamaters = {};
        });

        // generator for search

        function generateSearchTest(description, searchParamaters, shouldFail) {
            it(description, function() {
                var searchVals = {};
                var searchObj = {}
                runs(function() {
                    if (searchParamaters['printerType']) {
                        searchVals['printerType'] = Rho.Printer.PRINTER_TYPE_ZEBRA;
                    }
                    if (searchParamaters['connectionType']) {
                        searchVals['connectionType'] = $('#dev_conn_type').val();
                    }
                    if (searchParamaters['timeout']) {
                        searchVals['timeout'] = 30000;
                    }
                    if (searchParamaters['devicePort']) {
                        searchVals['devicePort'] = $('#dev_port').val();
                    }
                    if (searchParamaters['deviceAddress']) {
                        searchVals['deviceAddress'] = $('#dev_addr').val();
                    }
                    searchObject = runSearch(searchVals, 30000);
                });

                waits(2000);

                runs(function() {
                    // check if search was ended before printer discovery
                    if (searchParamaters['timeout'] && !searchParamaters['deviceAddress'] && $('#dev_conn_type').val() != Rho.PrinterZebra.CONNECTION_TYPE_BLUETOOTH) {
                        expect(searchObject.finished).toEqual(false);
                    }
                });

                waitsFor(function() {
                    return searchObject.finished;
                }, '20sec waiting for Search printer', 35000);

                runs(function() {
                    displaySearchResults(searchVals, searchObject.printers, searchObject.errors);
                });

                runs(function() {
                    if (shouldFail) {
                        expect(searchObject.errors).toBeGreaterThan(0);
                    } else {
                        expect(searchObject.errors).toEqual([]);
                        expect(searchObject.printers.length).toBeGreaterThan(0);
                    }
                });
            });
        }

        // search params
        // due to function is
        searchParamaters = {
            'printerType': true,
            'connectionType': true,
            'timeout': true,
            'devicePort': true,
            'deviceAddress': true,
        };

        // test all the combinations
        var combinations = makeAllCombinationsOfFileds(searchParamaters);

        for (var i = 0; i < combinations.length; i++) {
            var obj = combinations[i];
            var keys = objkeys(obj);
            var description = '(default options)';
            if (keys.length > 0) {
                description = '(with options ' + keys.join(', ') + ')';
            }
            generateSearchTest(description, obj, false);
        }

    });

    describe('should getPrinterByID', function() {
        // find printer
        it('and get base properties', function() {
            var searchVals = {};
            runs(function() {
                searchVals = {};
                searchVals.devicePort = $('#dev_port').val();
                searchVals.deviceAddress = $('#dev_addr').val();
                searchVals.connectionType = $('#dev_conn_type').val();
                searchObject = runSearch(searchVals, 25000);
            });

            waitsFor(function() {
                return searchObject.finished;
            }, '20sec waiting for Search printer', 30000);

            runs(function() {
                displaySearchResults(searchVals, searchObject.printers, searchObject.errors);
            });

            runs(function() {
                expect(searchObject.errors).toEqual([]);
                expect(searchObject.printers.length).toBeGreaterThan(0);

                expect(last_found_printer_id).toNotEqual(null);

                var thisprinter = Rho.PrinterZebra.getPrinterByID(last_found_printer_id);
                expect(thisprinter).toNotEqual(null);

                expect(parseInt(thisprinter.devicePort, 10)).toEqual(parseInt($('#dev_port').val(), 10));
                expect(thisprinter.deviceAddress).toEqual($('#dev_addr').val());
                expect(thisprinter.connectionType).toEqual($('#dev_conn_type').val());
                expect(thisprinter.isConnected).isNotEmptyString();
            });
        });
    });

    // connect printers
    describe('connect and disconnect methods', function() {
        // just connect
        it('should just connect', function() {
            var thisprinter = null;
            var callresult = null;

            runs(function() {
                expect(last_found_printer_id).toNotEqual(null);
                thisprinter = Rho.PrinterZebra.getPrinterByID(last_found_printer_id);
                callresult = null;
                thisprinter.disconnect(function(result) {
                    callresult = result;
                });
            });

            waitsFor(function() {
                return callresult !== null;
            }, 'wait until disconnected', 10000);

            runs(function() {
                expect(callresult).toEqual(Rho.PrinterZebra.PRINTER_STATUS_SUCCESS);
                expect(thisprinter.isConnected).toEqual(false);
            });

            runs(function() {
                thisprinter.connect();
            });
        });

        // connect without callback, wait for property isConnected to become 'true'
        it('should just connect, wait for isConnected', function() {
            var thisprinter = null;
            var callresult = null;

            runs(function() {
                expect(last_found_printer_id).toNotEqual(null);
                thisprinter = Rho.PrinterZebra.getPrinterByID(last_found_printer_id);
                callresult = null;
                thisprinter.disconnect(function(result) {
                    callresult = result;
                });
            });

            waitsFor(function() {
                return callresult !== null;
            }, 'wait until disconnected', 10000);

            runs(function() {
                expect(callresult).toEqual(Rho.PrinterZebra.PRINTER_STATUS_SUCCESS);
                expect(thisprinter.isConnected).toEqual(false);
            });

            runs(function() {
                thisprinter.connect();
            });
            waitsFor(function() {
                return thisprinter.isConnected == true;
            }, 'wait untill connect', 10000);
        });

        function generateConnectWithParams(connectparams) {
            // connect and wait for callback
            it('should just connect with callback params' + JSON.stringify(connectparams, null, " "), function() {
                var thisprinter = null;
                var callresult = null;

                runs(function() {
                    expect(last_found_printer_id).toNotEqual(null);
                    thisprinter = Rho.PrinterZebra.getPrinterByID(last_found_printer_id);
                    callresult = null;
                    thisprinter.disconnect(function(result) {
                        callresult = result;
                    });
                });

                waitsFor(function() {
                    return callresult != null;
                }, 'wait until disconnected', 5000);

                runs(function() {
                    expect(callresult).toEqual(Rho.PrinterZebra.PRINTER_STATUS_SUCCESS);
                    expect(thisprinter.isConnected).toEqual(false);
                });

                runs(function() {
                    callresult = null;
                    thisprinter.connectWithOptions(connectparams, function cbk(val) {
                        callresult = val;
                    });
                });
                waitsFor(function() {
                    return callresult != null;
                }, 'wait while disconnected', 5000);

                runs(function() {
                    expect(callresult).toEqual(Rho.PrinterZebra.PRINTER_STATUS_SUCCESS);
                    expect(thisprinter.isConnected).toEqual(true);
                });
            });
        }

        var connectParams = [{}, {
            "timeout": 20000
        }, {
            "timeout": 0
        }, {
            "timeout": 1000
        }, {
            "timeout": 15000.5
        }, ];

        for (var i = 0; i < connectParams.length; i++) {
            generateConnectWithParams(connectParams[i]);
        }
    });

    // 
    describe('printFile method', function() {
        it('should connect', function() {
            doConnect();
        });

        it('should print png with callback', function() {
            doPrintTestLabel();
            doSetLabelLength(500);
            doPrintPrintFile(pngimagepath_320px, {});
        });

        it('should print jpeg with callback', function() {
            doPrintTestLabel();
            doSetLabelLength(500);
            doPrintPrintFile(jpgimagepath_320px, {});
        });
        it('should not print bmp with callback', function() {
            doPrintTestLabel();
            doSetLabelLength(500);
            doPrintPrintFile(bmpimagepath_320px, {}, false);
        });
        it('should not print pdf with callback', function() {
            doPrintTestLabel();
            doSetLabelLength(500);
            doPrintPrintFile(pdffilepath, {}, false);
        });
        it('should not print empty filename with callback', function() {
            doPrintTestLabel();
            doSetLabelLength(500);
            doPrintPrintFile('', {}, false);
        });
        it('should not print invalid filename with callback', function() {
            doPrintTestLabel();
            doSetLabelLength(500);
            doPrintPrintFile(invalidfilepath, {}, false);
        });
    });

    describe('printRawString method', function() {
        it('should print ZPL Command with callback', function() {
            doConnect();
            doPrintTestLabel();
            doPrintRawCommand(CommandZPL);
        });
        it('should print CPCL Command with callback', function() {
            doConnect();
            doPrintTestLabel();
            doPrintRawCommand(CommandCCPL);
        });
    });

    describe('sendFileContents method', function() {
        it('should print test_zpl.zpl', function() {
            doConnect();
            doPrintTestLabel();
            doSendFileContents(test_zpl);
        });
        it('should print test_cpcl.lbl', function() {
            doConnect();
            doPrintTestLabel();
            doSendFileContents(test_cpcl);
        });
    });

    describe('retrieveFileNames method', function() {
        it('should retrieveFileNames return non empty list', function() {
            doConnect();
            doRetrieveFileNames([]);
        });
        it('should pretrieveFileNamesWithExtensions return non empty list', function() {
            doConnect();
            doRetrieveFileNamesWithExtensions(['FMT', 'LBL', 'GRF'], []);
        });
    });

    function generateStoreImage(from, to, width, height, isOk, force) {
        if ((!Rho.RhoFile.exists(from)) || (width == 0) || (height == 0)) {
            if (!isOk && !force) {
                return;
            }
            isOk = false;
        }
        var def = isOk ? 'should ' : 'should not ';
        var deftext = [def, 'store image', Rho.RhoFile.basename(from), '=>', to, '[w:', width, 'h:', height, ']'];

        it(deftext.join(' '), function() {
            doConnect();

            var callresult = null;

            function cbk(val) {
                callresult = val;
            }


            runs(function() {
                callresult = null;
                thisprinter.storeImage(to, from, width, height, cbk);
            });

            waitsFor(function() {
                return callresult !== null;
            }, 'wait storeImage', 30000);

            runs(function() {
                if (isOk !== false) {
                    expect(callresult).toEqual(Rho.PrinterZebra.PRINTER_STATUS_SUCCESS);
                    callresult = null;
                    //thisprinter.retrieveFileNamesWithExtensions(['GRF'],cbk);
                } else {
                    expect(callresult).toNotEqual(Rho.PrinterZebra.PRINTER_STATUS_SUCCESS);
                    callresult = null;
                }
            });
        });

//        waitsFor(function() {
//            return callresult !== null;
//        }, 'wait retrieveFileNames', 7000);

//        runs(function() {
//            if (isOk !== false) {
//                expect(callresult.status).toEqual(Rho.PrinterZebra.PRINTER_STATUS_SUCCESS);
//                expect(callresult.fileNames).toContain(to);
//            }
//        });
    }

    describe('storeImage method', function() {
        generateStoreImage(pngimagepath_320px, 'PNG.GRF', 50, 50, true);

        generateStoreImage(pngimagepath_320px, 'E:TF1.GRF', 50, 50, true);
        generateStoreImage(pngimagepath_320px, 'R:TF1.GRF', 50, 50, true);
        generateStoreImage(pngimagepath_320px, 'E:TF2.GRF', 0, 0, false);
        generateStoreImage(pngimagepath_320px, 'TF2.GRF', -1, -1, true);
        generateStoreImage(invalidfilepath, 'TF2.GRF', 0, 0, false, true);
        generateStoreImage('', '', 0, 0, false, true);

        var sizes = [0, 1, 10, 50, 100, 1000, -1];
        var formats = [png_s, jpg_s];

        for (var i = 0; i < formats.length; i++) {
            var files = formats[i];
            for (var j = 0; j < sizes.length; j++) {
                for (var k = 0; k < files.length; k++) {
                    if (sizes[j] == 0) {
                        // invalid size
                        generateStoreImage(files[k], 'C' + i + j + k + '.GRF', sizes[j], sizes[j], false);
                    } else {
                        generateStoreImage(files[k], 'C' + i + j + k + '.GRF', sizes[j], sizes[j], true);
                    }
                }
            }
        }

        var othersizes = [0, 1, 10, 100, 1000];
        var otherformats = [bmp_s, gif_s];
        for (var i = 0; i < otherformats.length; i++) {
            var files = otherformats[i];
            for (var j = 0; j < sizes.length; j++) {
                for (var k = 0; k < files.length; k++) {
                    generateStoreImage(files[k], 'F' + i + j + k + '.GRF', sizes[j], sizes[j], false);
                }
            }
        }
    });

    function generatePrintImage(from, x, y, options, isOk, force) {
        if ((!Rho.RhoFile.exists(from))) {
            if (!isOk && !force) {
                return;
            }
            isOk = false;
        }
        var def = isOk ? 'should ' : 'should not ';
        var deftext = [def, 'print image', Rho.RhoFile.basename(from), 'x:', x, 'y:', y, 'options:', JSON.stringify(options, null, " ")];

        it(deftext.join(' '), function() {
            doConnect();

            doPrintTestLabel();

            doPrintImage(from, x, y, options, isOk);
        });
    }

    describe('printImageFromFile method', function() {
        generatePrintImage(pngimagepath_320px, 100, 100, {
            'width': 0,
            'height': 0
        }, false);

        var sizes = [10, 100, -1];
        var formats = [png_s, jpg_s];
        var offsets = [
            [0, 0],
            [10, 10],
            [-10, -10],
            [50, 50],
            [-50, -50],
            [100, -100]
        ];
        var offIter = 0;

        for (var i = 0; i < formats.length; i++) {
            var files = formats[i];
            for (var j = 0; j < sizes.length; j++) {
                for (var k = 0; k < files.length; k++) {
                    var coords = offsets[offIter];
                    offIter++;
                    if (offIter == offsets.length) {
                        offIter = 0;
                    }
                    if (sizes[j] == 0) {
                        generatePrintImage(files[k], coords[0], coords[1], {
                            'width': sizes[j],
                            'height': sizes[j]
                        }, false);
                    } else {
                        generatePrintImage(files[k], coords[0], coords[1], {
                            'width': sizes[j],
                            'height': sizes[j]
                        }, true);
                    }
                }
            }
        }
    });

    function generategetproperty(property, type) {
        var deftext = ['Should return', property, 'value as a ', type];
        it(deftext.join(' '), function() {
            runs(function() {
                if (type == 'string') {
                    //TODO: Add Display code
                    expect(thisprinter.property).isNotEmptyString();
                } else if (type == 'int') {
                    //TODO: Add Display code
                    expect(thisprinter.property).isNumberGreaterThenZero();
                } else if (type == 'isBoolean') {
                    //TODO: Add Display code
                    expect(thisprinter.property).isBoolean();
                }
            });
        });

    }

    describe('PrinterZebra APIs Property Get Test', function() {
        it('should connect', function() {
            doConnect();
        });

        var offIter = 0;
        var formats = [
            ['connectionType', 'string'],
            ['deviceAddress', 'string'],
            ['ID', 'string'],
            ['deviceName', 'string'],
            ['printerType', 'string'],
            ['isConnected', 'boolean'],
            ['controlLanguage', 'string'],
            ['maxTimeoutForRead', 'int'],
            ['maxTimeoutForOpen', 'int'],
            ['timeToWaitForMoreData', 'int']
        ];
        for (var i = 0; i < formats.length; i++) {
            var property = formats[i][0];
            var type = formats[i][1];
            generategetproperty(property, type);
        }

        if (thisprinter.getProperty("connectionType") != "CONNECTION_TYPE_BLUETOOTH") {
            it('Should return devicePort value as an integer', function() {
                //TODO: Add Display code
                expect(thisprinter.devicePort).isNumberGreaterThenZero();
            });
        }

//        it('Should return printerEventCallback value as a Callback', function () {
//            expect(thisprinter.printerEventCallback).toEqual(function(event) {});
//        });

        it('Should Get timeToWaitAfterReadInMilliseconds default value', function() {
            expect(thisprinter.getProperty('timeToWaitAfterReadInMilliseconds')).toEqual('10');
        });

        it('Should Get timeToWaitAfterWriteInMilliseconds default value', function() {
            expect(thisprinter.getProperty('timeToWaitAfterWriteInMilliseconds')).toEqual('200');
        });

    });

    function generatesetproperty(property, value) {
        var deftext = ['Should Set', property, ' to ', value.toString(), ' using direct calling method'];
        it(deftext.join(' '), function() {
            runs(function() {
                thisprinter.property = value;
                expect(thisprinter.property).toEqual(value);
            });
        });

        deftext = ['Should Set', property, ' to ', value.toString(), ' using setProperty calling method'];
        it(deftext.join(' '), function() {
            runs(function() {
                thisprinter.setProperty(property, value.toString());
                expect(parseInt(thisprinter.property, 10)).toEqual(value);
                // getProperty returns string type
                expect(parseInt(thisprinter.getProperty(property), 10)).toEqual(value);
            });
        });

        deftext = ['Should Set', property, ' to ', value, ' using setProperties calling method'];
        it(deftext.join(' '), function() {
            runs(function() {
                thisprinter.setProperties({
                    property: value.toString()
                });
                // getProperties also returns property values as a strings
                var data = thisprinter.getProperties([property]);
                data = parseInt(data[property], 10);
                expect(data).toEqual(value);
            });
        });
    }

    describe('Setting Zebra property Values', function() {

        it('should connect', function() {
            doConnect();
        });

        var values = [0, 50000, -1];
        var formats = ['maxTimeoutForRead', 'maxTimeoutForOpen', 'timeToWaitForMoreData', 'timeToWaitAfterReadInMilliseconds', 'timeToWaitAfterWriteInMilliseconds'];
        for (var i = 0; i < formats.length; i++) {
            var property = formats[i];
            for (var j = 0; j < values.length; j++) {
                generatesetproperty(property, values[j]);
            }
        }
    });

    describe('enumerateSupportedControlLanguages method', function() {
        it('should connect', function() {
            doConnect();
        });

        it('using result', function() {
            runs(function() {
                var languagesTypes = thisprinter.enumerateSupportedControlLanguages();
                expect(languagesTypes).toEqual([Rho.PrinterZebra.PRINTER_LANGUAGE_ZPL, Rho.PrinterZebra.PRINTER_LANGUAGE_CPCL]);
            });
        });
        it('using callback', function() {
            var enumCb = null;

            function enumerateControlLanguagesCallback(callbackValue) {
                enumCb = callbackValue;
            }
            runs(function() {
                thisprinter.enumerateSupportedControlLanguages(enumerateControlLanguagesCallback);
            });
            waitsFor(function() {
                return enumCb !== null;
            }, 'Timed out waiting for testing callback', 2000);

            runs(function() {
                expect(enumCb).toEqual([Rho.PrinterZebra.PRINTER_LANGUAGE_ZPL, Rho.PrinterZebra.PRINTER_LANGUAGE_CPCL]);
            });
        });
        it('using anonymous callback', function() {
            var enumCb = null;

            runs(function() {
                thisprinter.enumerateSupportedControlLanguages(
                    function(callbackValue) {
                        enumCb = callbackValue;
                    });
            });
            waitsFor(function() {
                return enumCb !== null;
            }, 'Timed out waiting for testing callback', 2000);
            runs(function() {
                expect(enumCb).toEqual([Rho.PrinterZebra.PRINTER_LANGUAGE_ZPL, Rho.PrinterZebra.PRINTER_LANGUAGE_CPCL]);
            });
        });
    });

    var listofrequeststate = [Rho.PrinterZebra.PRINTER_STATE_IS_HEAD_COLD, Rho.PrinterZebra.PRINTER_STATE_IS_HEAD_OPEN, Rho.PrinterZebra.PRINTER_STATE_IS_HEAD_TOO_HOT, Rho.PrinterZebra.PRINTER_STATE_IS_PARTIAL_FORMAT_IN_PROGRESS, Rho.PrinterZebra.PRINTER_STATE_IS_PAUSED, Rho.PrinterZebra.PRINTER_STATE_IS_RECEIVE_BUFFER_FULL, Rho.PrinterZebra.PRINTER_STATE_IS_RIBBON_OUT, Rho.PrinterZebra.PRINTER_STATE_LABEL_LENGTH_IN_DOTS, Rho.PrinterZebra.PRINTER_STATE_LABELS_REMAINING_IN_BATCH, Rho.PrinterZebra.PRINTER_STATE_NUMBER_OF_FORMATS_IN_RECEIVE_BUFFER, Rho.PrinterZebra.PRINTER_STATE_PRINT_MODE, Rho.PrinterZebra.PRINTER_STATE_IS_READY_TO_PRINT, Rho.PrinterZebra.PRINTER_STATE_IS_COVER_OPENED, Rho.PrinterZebra.PRINTER_STATE_IS_DRAWER_OPENED, Rho.PrinterZebra.PRINTER_STATE_IS_PAPER_OUT, Rho.PrinterZebra.PRINTER_STATE_IS_BATTERY_LOW];
    var requeststate_boolean = ["PRINTER_STATE_IS_HEAD_COLD", "PRINTER_STATE_IS_HEAD_OPEN", "PRINTER_STATE_IS_HEAD_TOO_HOT", "PRINTER_STATE_IS_PARTIAL_FORMAT_IN_PROGRESS", "PRINTER_STATE_IS_PAUSED", "PRINTER_STATE_IS_RECEIVE_BUFFER_FULL", "PRINTER_STATE_IS_RIBBON_OUT", "PRINTER_STATE_LABELS_REMAINING_IN_BATCH", "PRINTER_STATE_IS_READY_TO_PRINT", "   PRINTER_STATE_IS_COVER_OPENED", "PRINTER_STATE_IS_DRAWER_OPENED", "PRINTER_STATE_IS_PAPER_OUT", "PRINTER_STATE_IS_BATTERY_LOW"];
    var requeststate_int = ["PRINTER_STATE_LABEL_LENGTH_IN_DOTS", "PRINTER_STATE_NUMBER_OF_FORMATS_IN_RECEIVE_BUFFER"];
    var requeststate_printmode = ["PRINTER_STATE_PRINT_MODE"];
    var printmode_values = [Rho.PrinterZebra.PRINT_MODE_APPLICATOR, Rho.PrinterZebra.PRINT_MODE_CUTTER, Rho.PrinterZebra.PRINT_MODE_DELAYED_CUT, Rho.PrinterZebra.PRINT_MODE_KIOSK, Rho.PrinterZebra.PRINT_MODE_LINERLESS_PEEL, Rho.PrinterZebra.PRINT_MODE_LINERLESS_REWIND, Rho.PrinterZebra.PRINT_MODE_LINERLESS_REWIND, Rho.PrinterZebra.PRINT_MODE_PARTIAL_CUTTER, Rho.PrinterZebra.PRINT_MODE_PEEL_OFF, Rho.PrinterZebra.PRINT_MODE_REWIND, Rho.PrinterZebra.PRINT_MODE_RFID, Rho.PrinterZebra.PRINT_MODE_TEAR_OFF, Rho.PrinterZebra.PRINT_MODE_UNKNOWN];
    var requeststate_callbackValue = {};

    function requestStateCallback(args) {
        if (args.status == Rho.PrinterZebra.PRINTER_STATUS_SUCCESS) {
            expect(args.status).toEqual(Rho.PrinterZebra.PRINTER_STATUS_SUCCESS);
            requeststate_callbackValue = args;

        } else if (args.status == Rho.PrinterZebra.PRINTER_STATUS_ERROR) {
            expect(args.status).toEqual(Rho.PrinterZebra.PRINTER_STATUS_SUCCESS);
        }
        callresult = true;
    }

    describe('requestState method', function() {
        it('should connect', function() {
            doConnect();
        });

        it("Request printer state for list of parameters", function() {
            runs(function() {
                callresult = null;
                thisprinter.requestState(listofrequeststate, requestStateCallback);
            });

            waitsFor(function() {
                return callresult !== null;
            }, 'wait requestState', 30000);

            runs(function() {
                expect(requeststate_callbackValue.status).toEqual(Rho.PrinterZebra.PRINTER_STATUS_SUCCESS);
            });
        });

        it("Result of Request printer state Boolean values", function() {
            runs(function() {
                if (requeststate_callbackValue.status == Rho.PrinterZebra.PRINTER_STATUS_SUCCESS) {
                    for (var i = 0; i < requeststate_boolean.length; i++) {
                        if (requeststate_callbackValue[requeststate_boolean[i]] != undefined) {
                            var result = requeststate_callbackValue[requeststate_boolean[i]];
                            expect(result).isBoolean();
                        }
                    }
                } else {
                    expect(requeststate_callbackValue.status).toEqual(Rho.PrinterZebra.PRINTER_STATUS_SUCCESS);
                }
            });
        });

        it("Result of Request printer state int values", function() {
            runs(function() {
                if (requeststate_callbackValue.status == Rho.PrinterZebra.PRINTER_STATUS_SUCCESS) {
                    for (var i = 0; i < requeststate_int.length; i++) {
                        if (requeststate_callbackValue[requeststate_boolean[i]] != undefined) {
                            var result = (requeststate_callbackValue[requeststate_int[i]] >= 0) ? true : false;
                            expect(result).toEqual(true);
                        }
                    }
                } else {
                    expect(requeststate_callbackValue.status).toEqual(Rho.PrinterZebra.PRINTER_STATUS_SUCCESS);
                }
            });
        });

        it("Result of Request printer state printmode values", function() {
            runs(function() {
                if (requeststate_callbackValue.status == Rho.PrinterZebra.PRINTER_STATUS_SUCCESS) {
                    for (var i = 0; i < requeststate_printmode.length; i++) {
                        if (requeststate_callbackValue[requeststate_boolean[i]] != undefined) {
                            var result = requeststate_callbackValue[requeststate_printmode[i]];
                            expect(result).toContain(printmode_values);
                        }
                    }
                } else {
                    expect(requeststate_callbackValue.status).toEqual(Rho.PrinterZebra.PRINTER_STATUS_SUCCESS);
                }
            });
        });

    });


});
