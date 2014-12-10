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
        // 2048 is too large for all platfroms !
        sizes = ['320px', '640px', '1024px'];
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

        var matchers = {
            isNotEmptyString: function () {
                return (typeof this.actual == 'string') && (this.actual.length != 0)
            }
        };
        this.addMatchers(
            matchers
        );
    });

    afterEach(function() {});

    // setup 
    it('initialize before tests', function() {
        var searchObject = {};

        runs(function() {
            setObjective(jasmine.getEnv().currentSpec.description);
            setInstruction('Select desired discovery mode');
        });

        _result.waitForSelectTestMode();

        runs(function() {
            if (_result.auto_fill === false) {
                setInstruction('Set device type, address and port, then press "done button"');
            } else {
                setInstruction('Wait until devices are discovered to continue');
            }
        });

        _result.waitUntilDone(function(){ return _result.auto_fill === false; });

        runs(function() {
            if (_result.auto_fill == true) {
                searchObject = runSearch({}, 30000);
            } else {
                searchVals = {};
                searchVals['connectionType'] = $('#dev_conn_type').val();
                searchVals['devicePort'] = $('#dev_port').val();
                searchVals['deviceAddress'] = $('#dev_addr').val();
                searchObject = runSearch(searchVals, 30000);
            }
            setExpected('');
            setupTestFields();
        });

        waitsFor(function() {
            return searchObject.finished;
        }, '60sec waiting for Search printer', ENABLE60K);

        runs(function() {
            setInstruction('Use drop-down list to select tested device and then press "done" button.');
            setExpected('There shopud be at least one device to select.');
            if (searchObject.printers.length > 0) {
                displaySearchResults({}, searchObject.printers, searchObject.errors);
                updatePrinterList(searchObject.printers);
                last_found_printer_id = searchObject.printers[0];
            }
            expect(searchObject.errors).toEqual([]);
            expect(searchObject.printers.length).toBeGreaterThan(0);
        });

        _result.waitUntilDone(function(){ return _result.auto_fill === true; });

        runs(function() {
            var printerSettings = $('#dev_list').val().split('|');
            last_found_printer_id = printerSettings[3];
            window.onunload = function(){
                var printer = Rho.PrinterZebra.getPrinterByID(last_found_printer_id);
                printer.disconnect();
            };
            last_found_printer = Rho.PrinterZebra.getPrinterByID(last_found_printer_id);
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
            }, '30sec waiting for Search printer', 30000);

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
                expect(thisprinter.isConnected.toString()).isNotEmptyString();
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
            }, 'wait until disconnected', 20000);

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
            }, 'wait until disconnected', 20000);

            runs(function() {
                expect(callresult).toEqual(Rho.PrinterZebra.PRINTER_STATUS_SUCCESS);
                expect(thisprinter.isConnected).toEqual(false);
            });

            runs(function() {
                thisprinter.connect();
            });
            waitsFor(function() {
                return thisprinter.isConnected == true;
            }, 'wait untill connect', 20000);
        });

        it('disconnect and try to print should return status error', function() {
            var callresult = null;
           var callresultp = null;
            var thisprinter = null;
            expect(last_found_printer_id).toNotEqual(null);
            thisprinter = Rho.PrinterZebra.getPrinterByID(last_found_printer_id);

            if (thisprinter.isConnected == false) {
                thisprinter.connect(function(val) {
                    callresult = val;
                });
                waitsFor(function() {
                    return callresult !== null;
                }, 'wait until connected', 25000);
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
            }, 'wait until disconnected', 25000);

            runs(function() {
                expect(callresult).toEqual(Rho.PrinterZebra.PRINTER_STATUS_SUCCESS);
                expect(thisprinter.isConnected).toEqual(false);
            });
            runs(function() {
                callresultp = null;
                 thisprinter.printRawString(CommandZPL, {}, function(result) {
                                            callresultp = result;
                                            });
            });

            waitsFor(function() {
                return callresultp !== null;
            }, 'wait.. trying to print..', 25000);

            runs(function() {
                expect(callresultp.status).toBeIn([Rho.PrinterZebra.PRINTER_STATUS_ERROR,Rho.PrinterZebra.PRINTER_STATUS_ERR_NOT_CONNECTED]);
            });
        });

        function generateConnectWithParams(connectparams, case_type, expectedResult) {
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
                }, 'wait until disconnected', 20000);

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
                         if (!expectedResult) {
                            return !thisprinter.isConnected;
                         }
                         return thisprinter.isConnected;
                    } else {
                        return callresult !== null;
                    }
                }, 'wait while disconnected', 25000);

                runs(function() {
                     if (expectedResult) {
                            if (case_type != 'without') {
                                expect(callresult).toEqual(Rho.Printer.PRINTER_STATUS_SUCCESS);
                            }
                            expect(thisprinter.isConnected).toEqual(true);
                     }
                     else {
                        if (case_type != 'without') {
                            expect((callresult == Rho.Printer.PRINTER_STATUS_ERR_TIMEOUT) || (callresult == Rho.Printer.PRINTER_STATUS_ERROR)).toEqual(true);
                        }
                        expect(thisprinter.isConnected).toEqual(false);
                     }
                });
            });
        }

        var connectParams = [{}, {
            "timeout": 20000
        }, 
		//{"timeout": 0}, - invalid as per doc
		{
            "timeout": 1
        },
        {
            "timeout": 15000.5
        }];

        // 20 sec is enought for connect
        // 0 is invalid timeout
        // 10 too short time - should not connected for this time
        // 15000.5 - invalid type - must be integer (but in this case method must return ERROR not TIMEOUT!)
             
             
             
             
        //for (var i = 0; i < connectParams.length; i++) {
             generateConnectWithParams(connectParams[0], 'without', true);
             generateConnectWithParams(connectParams[0], 'withcb', true);
             generateConnectWithParams(connectParams[0], 'anonymous', true);
        //if (Rho.System.platform != Rho.System.PLATFORM_ANDROID) {
             
             
             generateConnectWithParams(connectParams[1], 'without', true);
            generateConnectWithParams(connectParams[1], 'withcb', true);
            generateConnectWithParams(connectParams[1], 'anonymous', true);
        //}
             generateConnectWithParams(connectParams[2], 'without', false);
             generateConnectWithParams(connectParams[2], 'withcb', false);
             generateConnectWithParams(connectParams[2], 'anonymous', false);

             generateConnectWithParams(connectParams[3], 'without', false);
             generateConnectWithParams(connectParams[3], 'withcb', false);
             generateConnectWithParams(connectParams[3], 'anonymous', false);

             //generateConnectWithParams(connectParams[4], 'without', false);
             //generateConnectWithParams(connectParams[4], 'withcb', false);
             //generateConnectWithParams(connectParams[4], 'anonymous', false);
        //}
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
        }, 'wait doRetrieveFileNames', 60000);

        runs(function() {
            expect(callresult.status).toEqual(Rho.PrinterZebra.PRINTER_STATUS_SUCCESS);
            expect(callresult.fileNames).toNotEqual(
			);
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
        }, 'wait doRetrieveFileNames', 60000);

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
            }, 'wait doRetrieveFileNames', 60000);

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
            }, 'wait storeImage', 60000);

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
            }, 'wait storeImage', 60000);

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

        // 2048 is TOO LARGE for ticket printers !
             
        generateStoreImageWithoutAnonymous('with', pngimagepath_320px, 'PNG.GRF', 50, 50, true);
        generateStoreImageWithoutAnonymous('Anonymous', pngimagepath_640px, 'E:TF1.GRF', 50, 50, true);
        generateStoreImageWithoutAnonymous('with', pngimagepath_1024px, 'R:TF1.GRF', 50, 50, true);
        //generateStoreImageWithoutAnonymous('Anonymous', pngimagepath_2048px, 'E:TF2.GRF', 0, 0, false);
        generateStoreImageWithoutAnonymous('with', pngimagepath_320px, 'TF2.GRF', -1, -1, true);

        generateStoreImageWithoutAnonymous('with', jpgimagepath_320px, 'JPG.GRF', 50, 50, true);
        generateStoreImageWithoutAnonymous('Anonymous', jpgimagepath_640px, 'E:JF1.GRF', 50, 50, true);
        generateStoreImageWithoutAnonymous('with', jpgimagepath_1024px, 'R:JF1.GRF', 50, 50, true);
        //generateStoreImageWithoutAnonymous('Anonymous', jpgimagepath_2048px, 'E:JF2.GRF', 0, 0, false);
        generateStoreImageWithoutAnonymous('with', jpgimagepath_320px, 'JF2.GRF', -1, -1, true);
    });


    function generategetproperty(property, type) {
        var deftext = ['Should return', property, 'value as a ', type];
        it(deftext.join(' '), function() {
            runs(function() {
                var propertyVal = thisprinter.getProperty(property);
                if (type == 'string') {
                    expect(propertyVal).isNotEmptyString();
                } else if (type == 'int') {
                    var num = parseInt(propertyVal, 10);
                    expect(num).isNumberGreaterThenZero();
                } else if (type == 'isBoolean') {
                    expect(propertyVal).isBoolean();
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
                    data = data[property];
                    expect(data).isNotEmptyString();
                } else if (type == 'int') {
                    var data = thisprinter.getProperties([property]);
                    var val = parseInt(data[property], 10);
                    expect(val).isNumberGreaterThenZero();
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
            ['isConnected', 'boolean']
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
                    var val = parseInt(data.devicePort, 10);
                    expect(val).isNumberGreaterThenZero();
                }
            });
        });
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
    var requeststate_boolean = ["PRINTER_STATE_IS_HEAD_COLD", "PRINTER_STATE_IS_HEAD_OPEN", "PRINTER_STATE_IS_HEAD_TOO_HOT", "PRINTER_STATE_IS_PARTIAL_FORMAT_IN_PROGRESS", "PRINTER_STATE_IS_PAUSED", "PRINTER_STATE_IS_RECEIVE_BUFFER_FULL", "PRINTER_STATE_IS_RIBBON_OUT", "PRINTER_STATE_IS_READY_TO_PRINT", "PRINTER_STATE_IS_COVER_OPENED", "PRINTER_STATE_IS_DRAWER_OPENED", "PRINTER_STATE_IS_PAPER_OUT", "PRINTER_STATE_IS_BATTERY_LOW"];
    var requeststate_int = ["PRINTER_STATE_LABEL_LENGTH_IN_DOTS", "PRINTER_STATE_LABELS_REMAINING_IN_BATCH", "PRINTER_STATE_NUMBER_OF_FORMATS_IN_RECEIVE_BUFFER"];
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
            }, 'wait requestState', 60000);

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
                            expect(printmode_values).toContain(result);
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
                runs(function() {
                    // Let the printer be search first then use stop
                    searchObject = runSearch({}, 60000);

                    setTimeout(function(){
                        Rho.PrinterZebra.stopSearch();
                    },4000);
                });

                waits(65000);

                runs(function() {
                    expect(searchObject.finished).toEqual(false);
                });
            });
        });
    }

    describe("Get & Set default PrinterZebra", function() {
        var printerObj = null;

        it('there is an instance of a printer, ', function() {
            runs(function() {
                expect(last_found_printer_id).toNotEqual(null);

            });
        });

        it('set default PrinterZebra', function() {
            runs(function() {
                printerObj = Rho.PrinterZebra.getPrinterByID(last_found_printer_id);
                Rho.PrinterZebra.setDefault( printerObj );
            });
        });

        it('get default PrinterZebra', function() {
            runs(function() {
                expect(Rho.PrinterZebra.ID).toNotEqual(null);
                expect(Rho.PrinterZebra.ID).toEqual(last_found_printer_id);
                expect(Rho.PrinterZebra.getDefault().ID).toEqual(printerObj.ID);
            });
        });
    });
});
