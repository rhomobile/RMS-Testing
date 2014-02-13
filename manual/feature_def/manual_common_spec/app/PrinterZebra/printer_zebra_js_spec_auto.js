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

    if (Rho.System.platform == Rho.System.PLATFORM_WM_CE) {
        sizes = ['320px', '640px', '1024px'];
    } else {
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
            setInstruction('Wait for connection to a device');
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
            setInstruction('Connection result:' + callresult);
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
            setInstruction('Wait for printing test label');
            callresult = null;
            thisprinter.printRawString(makeCurrentTestLabel(), {}, cbk);
        });

        waitsFor(function() {
            return callresult !== null;
        }, 'wait until printingLabel', 20000);

        runs(function() {
            setInstruction('Printing result:' + status);
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
            setInstruction('Setting label lenght');
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
            setInstruction('Printing file...');
            callresult = null;
            thisprinter.printFile(filename, options, cbk);
        });

        waitsFor(function() {
            return callresult !== null;
        }, 'wait until printingFile', 30000);

        runs(function() {
            setInstruction('Printing file result:' + callresult);
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
            setInstruction('Printing rawCommand:');
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
            setInstruction('Printing image');
            callresult = null;
            thisprinter.printImageFromFile(from, x, y, options, cbk);
        });

        waitsFor(function() {
            return callresult !== null;
        }, 'wait printImageFromFile', 30000);

        runs(function() {
            setInstruction('Printing image result:' + callresult);
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
            setInstruction('Sending file');
            callresult = null;
            thisprinter.sendFileContents(filename, cbk);
        });

        waitsFor(function() {
            return callresult !== null;
        }, 'wait doSendFileContents', 30000);

        runs(function() {
            setInstruction('Sending file result:' + callresult);
            expect(callresult).toEqual(Rho.PrinterZebra.PRINTER_STATUS_SUCCESS);
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
            searchObject = runSearch({}, 30000);
        });

        waitsFor(function() {
            return searchObject.finished;
        }, '60sec waiting for Search printer', ENABLE60K);

        runs(function() {
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
                setInstruction('Calling enumerateSupportedTypes ');
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

    var errorCode = null;
    var usedPrinter = null;

    describe('should getPrinterByID', function() {
        // find printer
        it('and get base properties', function() {
            var searchVals = {};
            runs(function() {
                setInstruction('Searching for printer from settings. Please wait.');
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
                setInstruction('Checking printer');
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
        var callresult = null;

        function cbk(val) {
            callresult = val;
        }

        // just connect
        it('should just connect', function() {
            runs(function() {
                setInstruction('Testing connect.');
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
                setInstruction('Testing connect without callback, checking property.');
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

        it('disconnect and try to print should return status error', function() {
            var callresult = null;
            var thisprinter = null;
            expect(last_found_printer_id).toNotEqual(null);
            thisprinter = Rho.PrinterZebra.getPrinterByID(last_found_printer_id);

            if (thisprinter.isConnected == false) {
                thisprinter.connect(function(val) {
                    callresult = val;
                });
                waitsFor(function() {
                    return callresult !== null;
                }, 'wait until connected', 10000);
            }
            runs(function() {
                expect(thisprinter.isConnected).toEqual(true);
            });
            runs(function() {
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
                thisprinter.printRawString(CommandZPL, cbk);
            });

            waitsFor(function() {
                return callresult !== null;
            }, 'wait.. trying to print..', 15000);

            runs(function() {
                expect(callresult).toEqual(Rho.PrinterZebra.PRINTER_STATUS_ERROR);
            });
        });

        function generateConnectWithParams(connectparams, case_type) {
            // connect and wait for callback
            it('should connect ' + case_type + ' callback; params:' + JSON.stringify(connectparams, null, " "), function() {
                var thisprinter = null;
                var callresult = null;

                function cbk(val) {
                    callresult = val;
                }

                runs(function() {
                    expect(last_found_printer_id).toNotEqual(null);
                    thisprinter = Rho.PrinterZebra.getPrinterByID(last_found_printer_id);
                    callresult = null;
                    thisprinter.disconnect(cbk);
                });

                waitsFor(function() {
                    return callresult !== null;
                }, 'wait until disconnected', 5000);

                runs(function() {
                    expect(callresult).toEqual(Rho.PrinterZebra.PRINTER_STATUS_SUCCESS);
                    expect(thisprinter.isConnected).toEqual(false);
                });

                runs(function() {
                    callresult = null;

                    if (case_type == 'without') {
                        callresult = thisprinter.connectWithOptions(connectparams);
                    } else if (case_type == 'withcb') {
                        thisprinter.connectWithOptions(connectparams, cbk);
                    } else if (case_type == 'anonymous') {
                        thisprinter.connectWithOptions(connectparams, function cbk(val) {
                            callresult = val;
                        });
                    }
                });

                waitsFor(function() {
                    if (case_type == 'without') {
                        return thisprinter.isConnected;
                    } else {
                        return callresult !== null;
                    }
                }, 'wait while disconnected', 5000);

                runs(function() {
                    if (case_type != 'without') {
                        expect(callresult).toEqual(Rho.Printer.PRINTER_STATUS_SUCCESS);
                    }
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
            generateConnectWithParams(connectParams[i], 'without');
            generateConnectWithParams(connectParams[i], 'withcb');
            generateConnectWithParams(connectParams[i], 'anonymous');
        }

    });

    function doRetrieveFileNames(filelist, callback_type) {
        var callresult = null;

        function cbk(val) {
            callresult = val;
        }

        runs(function() {
            callresult = null;
            if (callback_type == 'with') {
                thisprinter.retrieveFileNames(cbk);
            } else if (callback_type == 'Anonymous') {
                thisprinter.retrieveFileNames(function(callbackValue) {
                    callresult = callbackValue;
                })
            }
        });

        waitsFor(function() {
            return callresult !== null;
        }, 'wait doRetrieveFileNames', 30000);

        runs(function() {
            expect(callresult.status).toEqual(Rho.PrinterZebra.PRINTER_STATUS_SUCCESS);
            expect(callresult.fileNames).toNotEqual(filelist);
        });
    }

    function doRetrieveFileNamesWithExtensions(ext, filelist, callback_type) {
        var callresult = null;

        function cbk(val) {
            callresult = val;
        }

        runs(function() {
            callresult = null;
            if (callback_type == 'with') {
                thisprinter.retrieveFileNamesWithExtensions(ext, cbk);
            } else if (callback_type == 'Anonymous') {
                thisprinter.retrieveFileNamesWithExtensions(ext, function(callbackValue) {
                    callresult = callbackValue;
                });
            }
        });

        waitsFor(function() {
            return callresult !== null;
        }, 'wait doRetrieveFileNames', 30000);

        runs(function() {
            expect(callresult.status).toEqual(Rho.PrinterZebra.PRINTER_STATUS_SUCCESS);
            expect(callresult.fileNames).toNotEqual(filelist);
        });
    }

    describe('retrieveFileNames method', function() {
        it('should connect', function() {
            doConnect();
        });

        it('should retrieveFileNames return non empty list with callback', function() {
            doRetrieveFileNames([], 'with');
        });
        it('should retrieveFileNames return non empty list Anonymous callback', function() {
            doRetrieveFileNames([], 'Anonymous');
        });

        it('should retrieveFileNamesWithExtensions return non empty list with callback', function() {
            doRetrieveFileNamesWithExtensions(['FMT', 'LBL', 'GRF', 'PRF', 'CFG', 'WML', 'BAT', 'CPF', 'TXT', 'PCX'], [], 'with');
        });
        it('should retrieveFileNamesWithExtensions return non empty list Anonymous callback', function() {
            doRetrieveFileNamesWithExtensions(['FMT', 'LBL', 'GRF', 'PRF', 'CFG', 'WML', 'BAT', 'CPF', 'TXT', 'PCX'], [], 'Anonymous');
        });

        it('should not retrieveFileNamesWithExtensions return  empty list with callback', function() {
            var callresult = null;

            function cbk(val) {
                callresult = val;
            }

            runs(function() {
                callresult = null;
                thisprinter.retrieveFileNamesWithExtensions([], cbk);
            });

            waitsFor(function() {
                return callresult !== null;
            }, 'wait doRetrieveFileNames', 30000);

            runs(function() {
                expect(callresult.status).toEqual(Rho.PrinterZebra.PRINTER_STATUS_SUCCESS);
                expect(callresult.fileNames).toEqual([]);
            });
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
    }

    describe('storeImage method', function() {
        it('should connect', function() {
            doConnect();
        });

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
                        generateStoreImage(files[k], 'R:C' + i + j + k + '.GRF', sizes[j], sizes[j], false);
                    } else {
                        generateStoreImage(files[k], 'R:C' + i + j + k + '.GRF', sizes[j], sizes[j], true);
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
                    generateStoreImage(files[k], 'R:F' + i + j + k + '.GRF', sizes[j], sizes[j], false);
                }
            }
        }
    });


    function generateStoreImageWithoutAnonymous(callback_type, from, to, width, height, isOk, force) {
        if ((!Rho.RhoFile.exists(from)) || (width == 0) || (height == 0)) {
            if (!isOk && !force) {
                return;
            }
            isOk = false;
        }
        var def = isOk ? 'should ' : 'should not ';
        var deftext = [def, 'store image', Rho.RhoFile.basename(from), '=>', to, '[w:', width, 'h:', height, ']'];

        it(deftext.join(' '), function() {
            var callresult = null;

            function cbk(val) {
                callresult = val;
            }

            runs(function() {
                callresult = null;
                if (callback_type == 'with') {
                    thisprinter.storeImage(to, from, width, height, cbk);
                } else if (callback_type == 'Anonymous') {
                    thisprinter.storeImage(to, from, width, height, function(callbackValue) {
                        callresult = callbackValue;
                    });
                }

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
    }


    describe('storeImage method without callback and Anonymous', function() {
        it('should connect', function() {
            doConnect();
        });

        generateStoreImageWithoutAnonymous('with', pngimagepath_320px, 'PNG.GRF', 50, 50, true);
        generateStoreImageWithoutAnonymous('Anonymous', pngimagepath_640px, 'E:TF1.GRF', 50, 50, true);
        generateStoreImageWithoutAnonymous('with', pngimagepath_1024px, 'R:TF1.GRF', 50, 50, true);
        generateStoreImageWithoutAnonymous('Anonymous', pngimagepath_2048px, 'E:TF2.GRF', 0, 0, false);
        generateStoreImageWithoutAnonymous('with', pngimagepath_320px, 'TF2.GRF', -1, -1, true);

        generateStoreImageWithoutAnonymous('with', jpgimagepath_320px, 'JPG.GRF', 50, 50, true);
        generateStoreImageWithoutAnonymous('Anonymous', jpgimagepath_640px, 'E:JF1.GRF', 50, 50, true);
        generateStoreImageWithoutAnonymous('with', jpgimagepath_1024px, 'R:JF1.GRF', 50, 50, true);
        generateStoreImageWithoutAnonymous('Anonymous', jpgimagepath_2048px, 'E:JF2.GRF', 0, 0, false);
        generateStoreImageWithoutAnonymous('with', jpgimagepath_320px, 'JF2.GRF', -1, -1, true);
    });


    function generategetproperty(property, type) {
        var deftext = ['Should return', property, 'value as a ', type];
        it(deftext.join(' '), function() {
            runs(function() {
                if (type == 'string') {
                    expect(thisprinter.getProperty(property)).isNotEmptyString();
                } else if (type == 'int') {
                    expect(thisprinter.getProperty(property)).isNumberGreaterThenZero();
                } else if (type == 'isBoolean') {
                    expect(thisprinter.getProperty(property)).isBoolean();
                }
            });
        });
    }

    function generategetproperties(property, type) {
        var deftext = ['Should return', property, 'value as a ', type];
        it(deftext.join(' '), function() {
            runs(function() {
                if (type == 'string') {
                    var data = thisprinter.getProperties([property]);
                    data = JSON.stringify(data[property]);
                    expect(data).isNotEmptyString();
                } else if (type == 'int') {
                    var data = thisprinter.getProperties([property]);
                    data = parseInt(data[property], 10);
                    expect(data).isNumberGreaterThenZero();
                } else if (type == 'isBoolean') {
                    var data = thisprinter.getProperties([property]);
                    expect(data.property).isBoolean();
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
            generategetproperties(property, type);
        }

        // Note that thisprinter is defined only during test run, not inside describe
        it('Should return devicePort value as an integer', function() {
            runs(function() {
                if (thisprinter.getProperty("connectionType") != "CONNECTION_TYPE_BLUETOOTH") {
                    expect(thisprinter.devicePort).isNumberGreaterThenZero();
                }
            });
        });

        it('Should return devicePort value as an integer using get properties', function() {
            runs(function() {
                if (thisprinter.getProperty("connectionType") != "CONNECTION_TYPE_BLUETOOTH") {
                    var data = thisprinter.getProperties(['devicePort']);
                    expect(data).isNumberGreaterThenZero();
                }
            });
        });

        it('Should Get timeToWaitAfterReadInMilliseconds default value', function() {
            runs(function() {
                expect(thisprinter.getProperty('timeToWaitAfterReadInMilliseconds')).toEqual('10');
            });
        });

        it('Should Get timeToWaitAfterWriteInMilliseconds default value', function() {
            runs(function() {
                expect(thisprinter.getProperty('timeToWaitAfterWriteInMilliseconds')).toEqual('200');
            });
        });

    });

    function generatesetproperty(property, value) {
        var deftext = ['Should Set', property, ' to ', value.toString(), ' using direct calling method'];
        it(deftext.join(' '), function() {
            runs(function() {
                thisprinter[property] = value;
                expect(thisprinter[property]).toEqual(value);
            });
        });

        deftext = ['Should Set', property, ' to ', value.toString(), ' using setProperty calling method'];
        it(deftext.join(' '), function() {
            runs(function() {
                thisprinter.setProperty(property, value.toString());
                expect(thisprinter[property]).toEqual(value);
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

    //enumerateSupportedControlLanguages method tests
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


    //requestState method tests
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
        var callresult = null;

        function cbk(val) {
            callresult = val;
        }

        it('should connect', function() {
            doConnect();
        });

        it("Request printer state for list of parameters", function() {
            runs(function() {
                callresult = null;
                thisprinter.requestState(listofrequeststate, cbk);
            });

            waitsFor(function() {
                return callresult !== null;
            }, 'wait requestState', 30000);

            runs(function() {
                expect(callresult.status).toEqual(Rho.PrinterZebra.PRINTER_STATUS_SUCCESS);
            });
        });

        it("Result of Request printer state Boolean values", function() {
            runs(function() {
                expect(callresult.status).toEqual(Rho.PrinterZebra.PRINTER_STATUS_SUCCESS);
                if (callresult.status == Rho.PrinterZebra.PRINTER_STATUS_SUCCESS) {
                    for (var i = 0; i < requeststate_boolean.length; i++) {
                        if (callresult[requeststate_boolean[i]] !== undefined) {
                            var result = callresult[requeststate_boolean[i]];
                            expect(result).isBoolean();
                        }
                    }
                }
            });
        });

        it("Result of Request printer state int values", function() {
            runs(function() {
                expect(callresult.status).toEqual(Rho.PrinterZebra.PRINTER_STATUS_SUCCESS);
                if (callresult.status == Rho.PrinterZebra.PRINTER_STATUS_SUCCESS) {
                    for (var i = 0; i < requeststate_int.length; i++) {
                        if (callresult[requeststate_int[i]] !== undefined) {
                            var result = (callresult[requeststate_int[i]] >= 0) ? true : false;
                            expect(result).toEqual(true);
                        }
                    }
                }
            });
        });

        it("Result of Request printer state printmode values", function() {
            runs(function() {
                expect(callresult.status).toEqual(Rho.PrinterZebra.PRINTER_STATUS_SUCCESS);
                if (callresult.status == Rho.PrinterZebra.PRINTER_STATUS_SUCCESS) {
                    for (var i = 0; i < requeststate_printmode.length; i++) {
                        if (callresult[requeststate_printmode[i]] !== undefined) {
                            var result = callresult[requeststate_printmode[i]];
                            expect(result).toContain(printmode_values);
                        }
                    }
                }
            });
        });

    });

    if(!isWindowsMobilePlatform()) {
        // stopSearch method tests
        describe('stopSearch method', function() {
            it("callback should not fire after calling stopSearch", function() {
                var callresult = null;

                function cbk(val) {
                    callresult = val;
                }

                runs(function() {
                    // Let the printer be search first then use stop
                    callresult = null;
                    searchObject = runSearch({}, 20000);
                    Rho.PrinterZebra.stopSearch();
                });

                waits(21000);

                runs(function() {
                    expect(searchObject.finished).toEqual(false);
                });
            });
        });
    }

    describe("Get & Set default PrinterZebra", function() {
        var thisprinter = null;
        var printerObj = null;

        it('get default PrinterZebra', function() {
            runs(function() {
                thisprinter = Rho.PrinterZebra.getDefault();
                expect(thisprinter.__rhoClass).toEqual('Rho.PrinterZebra');
            });
        });

        it('set default PrinterZebra', function() {
            runs(function() {
                expect(last_found_printer_id).toNotEqual(null);
                printerObj = Rho.PrinterZebra.getPrinterByID(last_found_printer_id);
                Rho.PrinterZebra.setDefault(printerObj);
                var defId = Rho.PrinterZebra.getDefault();
                expect(defId).toEqual(printerObj);
            });
        });

    });

    function doPrintTestLabel(value_type) {
        var callresult = null;

        function cbk(val) {
            callresult = val;
        }

        runs(function() {
            callresult = null;
            thisprinter.printRawString(makeTestLabel("test"), {}, cbk);
        });

        waitsFor(function() {
            return callresult !== null;
        }, 'wait until printingLabel', 20000);

        runs(function() {
            if (value_type > 0) {
                expect(callresult.status).toEqual(Rho.PrinterZebra.PRINTER_STATUS_SUCCESS);
            } else {
                expect(callresult.status).toEqual(Rho.PrinterZebra.PRINTER_STATUS_ERR_TIMEOUT);
            }
        });
    }


    describe('maxTimeoutForRead property ', function() {
        it('should connect', function() {
            doConnect();
        });

        it('should get print text/label within 10 sec succesfully after setting maxTimeoutForRead to 10 sec', function() {
            runs(function() {
                thisprinter.maxTimeoutForRead = 10000;
            });

            doPrintTestLabel();


        });


        it('should get timeout error after setting maxTimeoutForRead to 0 sec', function() {
            runs(function() {
                thisprinter.maxTimeoutForRead = 0;
            });
            waitsFor(function() {
                return true;
            }, 'wait for timeout', 5000);


        });

    });

    describe('maxTimeoutForOpen property ', function() {
        it('should connect', function() {
            doConnect();
        });

        it('should print text successfully after setting maxTimeoutForOpen to 10 sec', function() {
            runs(function() {
                thisprinter.maxTimeoutForOpen = 10000;
            });

            doPrintTestLabel(10000);

        });

        it('should get timeout error setting maxTimeoutForOpen to 0 sec', function() {
            runs(function() {
                thisprinter.maxTimeoutForOpen = 0;
            });

            waitsFor(function() {
                return true;
            }, 'wait for timeout', 5000);

            doPrintTestLabel(0);
        });

    });

    describe('timeToWaitForMoreData property ', function() {
        it('should connect', function() {
            doConnect();
        });

        it('should print 2 labels successfully after setting timeToWaitForMoreData to 10 sec', function() {

            doPrintTestLabel(10000);

            runs(function() {
                thisprinter.timeToWaitForMoreData = 10000;
            });

            doPrintTestLabel(10000);


        });

        it('should print 1 label only after setting timeToWaitForMoreData to 0 sec', function() {

            doPrintTestLabel(10000);

            runs(function() {
                thisprinter.timeToWaitForMoreData = 0;
            });

            waitsFor(function() {
                return true;
            }, 'wait for timeout', 5000);

            doPrintTestLabel(0);


        });

    });

    // if(Rho.PrinterZebra.getProperty("connectionType") == "CONNECTION_TYPE_BLUETOOTH") {
    describe('timeToWaitAfterReadInMilliseconds property ', function() {
        it('should connect', function() {
            doConnect();
        });

        it('should print text after setting timeToWaitAfterReadInMilliseconds to 10 sec', function() {

            runs(function() {
                thisprinter.timeToWaitAfterReadInMilliseconds = 10000;
            });

            doPrintTestLabel(10000);

        });

        it('should not print any label after setting timeToWaitAfterReadInMilliseconds to 0 sec', function() {

            runs(function() {
                thisprinter.timeToWaitAfterReadInMilliseconds = 0;
            });

            waitsFor(function() {
                return true;
            }, 'wait for timeout', 5000);

            doPrintTestLabel(0);

        });

    });

    describe('timeToWaitAfterWriteInMilliseconds property ', function() {
        it('should connect', function() {
            doConnect();
        });

        it('should print text after setting timeToWaitAfterWriteInMilliseconds to 10 sec', function() {

            runs(function() {
                thisprinter.timeToWaitAfterWriteInMilliseconds = 10000;
            });

            doPrintTestLabel(10000);

        });

        it('should not print any label after setting timeToWaitAfterWriteInMilliseconds to 0 sec', function() {

            runs(function() {
                thisprinter.timeToWaitAfterWriteInMilliseconds = 0;
            });

            waitsFor(function() {
                return true;
            }, 'wait for timeout', 5000);

            doPrintTestLabel(0);

        });

    });
});
