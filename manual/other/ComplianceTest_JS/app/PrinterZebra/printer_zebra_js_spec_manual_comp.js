describe('Printer Zebra', function() {
    var ENABLE9K = 9000;
    var ENABLE10K = 10000;
    var ENABLE60K = 60000;
    var ENABLE120K = 120000;
    var ENABLE5MIN = 300000;
    var ENABLE30MIN = 1800000;
    var enableFlag = false;
    var callbackstatus = false;
    //var enumData = Rho.PrinterZebra.enumerateSupportedTypes();
    var printers_array = [];
    var printers_errors = [];
    var discovery_finished = false;
    var connect_type = Rho.PrinterZebra.CONNECTION_TYPE_TCP;
    var macipaddress = '';
    var stopsearch = '';
    var deviceaddressFlag = false;
    var CommandZPL = '^XA^FO50,50^ADN,36,20^FDZebraPrinting^FS^XZ';
    var CommandCCPL = '"! 0 200 200 210 1\r\nTEXT 4 0 30 40 Hello World\r\nFORM\r\nPRINT\r\n';
    var connect_status = '';
    var existingPritingObject = null;
    var last_found_printer = null;
    var last_found_printer_id = null;

    // DO NOT COPYPASTE IT!
    function makeFilePath(filename) {
        return Rho.RhoFile.join(Rho.Application.modelFolderPath('PrinterZebra'), Rho.RhoFile.join('PrinterZebraFiles', filename));
    }

    function objkeys(obj) {
        var keys = [];
        $.each(obj, function(key, value) {
            keys.push(key);
        });
        return keys;
    }

    function makeTestLabel() {
        return '^XA^MNN^LL200^XZ^XA^JUS^XZ^XA^FO50,50^A0I25,25^FD' + jasmine.getEnv().currentSpec.description + '^FS^XZ\r\n';
    }

    // BLACK WOODO MAGIC
    function evaluateHashValues(obj) {
        var result = {};
        var keys = objkeys(searchParamaters);
        for (var i = keys.length - 1; i >= 0; i--) {
            var key = keys[i];
            result[key] = obj[key]();
        }
        return result;
    }

    // make a list of all available combinations of fields within object
    function makeAllCombinationsOfFileds(obj) {
        var combinations = []; //All combinations
        var keys = objkeys(obj);
        var quantity = (1 << keys.length);
        if (quantity > 0) {
            for (var i = 0; i < quantity; i++) {
                var combination = {};
                for (var j = 0; j < keys.length; j++) {
                    if ((i & (1 << j))) {
                        var key = keys[j];
                        combination[key] = obj[key];
                    }
                }
                combinations.push(combination);
            }
        }
        Rho.Log.info(" " + JSON.stringify(combinations, null, 2), "APP");
        return combinations;
    }
    var testResult = '';
    var captured = false;
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
        sizes = ['320px'];
    } else {
        sizes = ['320px'];
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


    //var zplformatpath = 'e:zplformat.zpl';
    var hashzpl = {
        '1': 'val1',
        '2': 'val2',
        '3': 'val3',
        '4': 'val4',
        '5': 'val5',
        '6': 'val6'
    };
    //var ccplformatpath = 'e:ccplformat.ccpl';
    var hashccpl = {
        '1': 'val1',
        '2': 'val2',
        '3': 'val3',
        '4': 'val4',
        '5': 'val5',
        '6': 'val6'
    };
    var invalidformatpath = 'bg:ccplformat.invalid';
    // hash should be parseable by javascript
    var invalidzplhash = {
        0: 'val1',
        10203: 'val1',
        2211: 'val1',
        '3355sasa': 'val1'
    };
    var arrayzpl = ['val2', 'val1', 'val3', 'val4', 'val5', 'val6'];
    var arrayccpl = ['val1', 'val2', 'val3', 'val4', 'val5', 'val6'];

    function displaySearchResults(paramaters, display_printers, display_errors) {
        var query = {
            'Parameters:': paramaters
        };
        if (display_errors.length > 0) {
            query['Errors:'] = display_errors;
        }
        if (display_printers.length > 0) {
            query['Discoveder printers:'] = display_printers;
        }

        displayPrinterResult(jasmine.getEnv().currentSpec.description, query);
    }

    function searchPrinterCallback(callbackValue) {
        if (callbackValue.status == Rho.PrinterZebra.PRINTER_STATUS_SUCCESS && callbackValue.printerID && callbackValue.printerID.length > 0) {
            printers_array.push(callbackValue.printerID);
        } else if (callbackValue.status == Rho.PrinterZebra.PRINTER_STATUS_SUCCESS) {
            //discovery_finished = true;
            if (printers_array.length > 0) {
                discovery_finished = true;
            } else {
                location = location;
            }
        } else {
            printers_errors.push(callbackValue);
            discovery_finished = true;
        }
    }

    beforeEach(function() {
        document.getElementById('actResult').innerHTML = 'init';
        $('#select_box_wrapper').empty();
        discovery_finished = false;
        connectFlag = false;
        stopsearch = '';
        deviceaddressFlag = false;
        retrievedFlag = false;
        connect_status = '';
        $('#myList').empty();
        $('#event_list').empty();

        printers_array = [];
        printers_errors = [];

        displayflag = false;
        testResult = '';
        captured = false;

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
        }, '60sec waiting for Search printer', ENABLE120K);

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



    var errorCode = null;
    var usedPrinter = null;




    ////////////////////////////////
    var thisprinter = null;
    var callresult = null;

    function cbk(val) {
        callresult = val;
    }

    function doConnect() {
        dispTestCaseRunning("Connecting... to Zebra printer");
        dispExpectedResult("Should connect to the Zebra printer");
        runs(function() {
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

        runs(function() {
            callresult = null;
            thisprinter.printRawString(makeTestLabel(), {}, cbk);
        });

        waitsFor(function() {
            return callresult !== null;
        }, 'wait until printingLabel', 20000);

        runs(function() {
            //expect(callresult.status).toEqual(Rho.PrinterZebra.PRINTER_STATUS_SUCCESS);
            displayResult("Print test label", JSON.stringify(callresult));
            callresult = null;
        });

    }

    function doSetLabelLength(len) {
        runs(function() {
            callresult = null;
            thisprinter.printRawString('^XA^MNN^LL' + len + '^XA^JUS^XZ', {}, cbk);
        });

        waitsFor(function() {
            return callresult !== null;
        }, 'wait until setting lable length', 7000);
    }

    function doPrintPrintFile(filename, options, isOk) {
        runs(function() {
            callresult = null;
            thisprinter.printFile(filename, options, cbk);
        });

        waitsFor(function() {
            return callresult !== null;
        }, 'wait until printingFile', 30000);

        runs(function() {
            displayResult(jasmine.getEnv().currentSpec.description, callresult.toString());
        });
        _result.waitForResponse();
    }


    function doPrintFileDiffTypeCallback(filename, options, callback_type) {
        runs(function() {
            callresult = null;
            if (callback_type == 'without') {
                thisprinter.printFile(filename);
            } else if (callback_type == 'Anonymous') {
                thisprinter.printFile(filename, options, function(callbackValue) {
                    callresult = callbackValue;
                });
            }
        });

        waitsFor(function() {
            if (callback_type == 'without') {
                setTimeout(function() {
                    callresult = true;
                }, 10000);
                return callresult;
            } else {
                return callresult !== null;
            }

        }, 'wait until printingFile', 30000);

        runs(function() {
            displayResult(jasmine.getEnv().currentSpec.description, callresult.toString());
        });
        _result.waitForResponse();
    }

    function doPrintRawCommand(cmd) {
        runs(function() {
            callresult = null;
            thisprinter.printRawString(cmd, {}, cbk);
        });

        waitsFor(function() {
            return callresult !== null;
        }, 'wait until setting lable length', 15000);
				
		runs(function() {
			displayResult(jasmine.getEnv().currentSpec.description, JSON.stringify(callresult));
		});
    }

    function doPrintRawCommandDiffTypeCallback(cmd, callback_type) {
        runs(function() {
            callresult = null;
            if (callback_type == 'without') {
                thisprinter.printRawString(cmd);
            } else if (callback_type == 'Anonymous') {
                thisprinter.printRawString(cmd, {}, function(callbackValue) {
                    callresult = callbackValue;
                });
            }
        });

        waitsFor(function() {
            if (callback_type == 'without') {
                setTimeout(function() {
                    callresult = true;
                }, 10000);
                return callresult;
            } else {
                return callresult !== null;
            }
        }, 'wait until setting lable length', 15000);

        runs(function() {
            displayResult(jasmine.getEnv().currentSpec.description, JSON.stringify(callresult));
        });
    }


    // printFile method
    describe('printFile method', function() {
        it('should connect', function() {
            doConnect();
        });

        it('Should print png image with callback', function() {
            dispTestCaseRunning("1. Should Print label <br />2. print PNG image.");
            dispExpectedResult("Should print png image and status should return PRINTER_STATUS_SUCCESS");
            //Common Method implemented to wait for tester to run the test.Code available in specHelper.js
            _result.waitToRunTest();

            doPrintTestLabel();
            doSetLabelLength(500);
            doPrintPrintFile(pngimagepath_320px, {});

        });


   
    });

    describe('printRawString method', function() {
        xit('should connect', function() {
            doConnect();
        });

        it('should print ZPL Command with callback', function() {
            dispTestCaseRunning(" 1. Should Print label <br />2. print ZPL Command ");
            dispExpectedResult("should print Zebra Printing lebel and status should return PRINTER_STATUS_SUCCESS");
            //Common Method implemented to wait for tester to run the test.Code available in specHelper.js
            _result.waitToRunTest();
            doPrintTestLabel();
            doPrintRawCommand(CommandZPL);
            _result.waitForResponse();
        });
        it('should print CPCL Command with callback', function() {
            dispTestCaseRunning(" 1. Should Print label <br />2. print CPCL Command ");
            dispExpectedResult("should print Hello World lebel and status should return PRINTER_STATUS_SUCCESS");
            //Common Method implemented to wait for tester to run the test.Code available in specHelper.js
            _result.waitToRunTest();
            doPrintTestLabel();
            doPrintRawCommand(CommandCCPL);
            _result.waitForResponse();
        });


    
    });


    //sendFileContents method

    function doSendFileContents(filename, callback_type) {
        runs(function() {
            callresult = null;
            if (callback_type == 'with') {
                thisprinter.sendFileContents(filename, cbk);
            } else if (callback_type == 'without') {
                thisprinter.sendFileContents(filename);
            } else if (callback_type == 'Anonymous') {
                thisprinter.sendFileContents(filename, function(callbackValue) {
                    callresult = callbackValue;
                });
            }
        });

        waitsFor(function() {
            if (callback_type == 'without') {
                setTimeout(function() {
                    callresult = true;
                }, 20000);
                return callresult;
            } else {
                return callresult !== null;
            }
        }, 'wait doSendFileContents', 30000);

        runs(function() {
            displayResult(jasmine.getEnv().currentSpec.description, callresult.toString());
        });

        _result.waitForResponse();
    }



    describe('sendFileContents method', function() {
        xit('should connect', function() {
            doConnect();
        });

        it('should print test_zpl.zpl with callback', function() {
            dispTestCaseRunning(" 1. Should Print label <br />2. send test_zpl.zpl file to get printed");
            dispExpectedResult("should print Test from test_zpl.zpl file and status should return PRINTER_STATUS_SUCCESS");
            //Common Method implemented to wait for tester to run the test.Code available in specHelper.js
            _result.waitToRunTest();
            doPrintTestLabel();
            doSendFileContents(test_zpl, 'with');
        });
        it('should print test_cpcl.lbl with callback', function() {
            dispTestCaseRunning(" 1. Should Print label <br />2. send test_zpl.ccpl file to get printed");
            dispExpectedResult("should print Test test_CCPL.CCPL and status should return PRINTER_STATUS_SUCCESS");
            //Common Method implemented to wait for tester to run the test.Code available in specHelper.js
            _result.waitToRunTest();
            doPrintTestLabel();
            doSendFileContents(test_cpcl, 'with');
        });

       
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
            dispTestCaseRunning("1. Should Print label <br />2. " + def + " Print " + Rho.RhoFile.basename(from) + " image");
            dispExpectedResult(jasmine.getEnv().currentSpec.description);
            //Common Method implemented to wait for tester to run the test.Code available in specHelper.js
            _result.waitToRunTest();
            doPrintTestLabel();

            runs(function() {
                callresult = null;
                thisprinter.printImageFromFile(from, x, y, options, cbk);
            });

            waitsFor(function() {
                return callresult !== null;
            }, 'wait printImageFromFile', 30000);


            runs(function() {
                displayResult(jasmine.getEnv().currentSpec.description, callresult);
            });
            _result.waitForResponse();
        });
    }

    describe('printImageFromFile method', function() {
        xit('should connect', function() {
            doConnect();
        });

        
        var sizes = [-1];
        var formats = [jpg_s];
        var offsets = [
           [50, 50],
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




    var listofrequeststate = [Rho.PrinterZebra.PRINTER_STATE_IS_READY_TO_PRINT];
    var printmode_state = [Rho.PrinterZebra.PRINTER_STATE_PRINT_MODE];
    var printmode_values = [Rho.PrinterZebra.PRINT_MODE_CUTTER];
    var requeststate_callbackValue = {};

    function requestStateCallback(args) {
        if (args.status == Rho.PrinterZebra.PRINTER_STATUS_SUCCESS) {
            requeststate_callbackValue = args;

        } else if (args.status == Rho.PrinterZebra.PRINTER_STATUS_ERROR) {
            requeststate_callbackValue = args;
        }
        callresult = true;
    }

    function dorequestState(requestStatearray, printmode) {

        var deftext = [];
        var dispcase = [];
        var dispexp = [];

        if (printmode == undefined) {
            deftext = ['Set printer to ', requestStatearray, ' state'];
            dispcase = ['Set printer to ', requestStatearray, ' state'];
            dispexp = ['Should return True if ', requestStatearray, ' is set and If printer does not supports  parameter then it will not be included in result hash'];
        } else {
            deftext = ['Set printer to ', printmode, ' state'];
            dispcase = ['Set printer to ', printmode, ' state by manually Zebra utilities'];
            dispexp = ['Should return ', printmode, ' value for ', requestStatearray, ' and If printer does not supports some parameter then it will not be included in result hash'];
        }

        it(deftext.join(''), function() {
            dispTestCaseRunning(dispcase.join(''));
            dispExpectedResult(dispexp.join(''));
            _result.waitToRunTest();

            runs(function() {
                callresult = null;
                thisprinter.requestState([requestStatearray], requestStateCallback);
            });

            waitsFor(function() {
                return callresult !== null;
            }, 'wait requestState', 30000);

            runs(function() {
                if (requeststate_callbackValue.status == Rho.PrinterZebra.PRINTER_STATUS_SUCCESS) {
                    displayResult(jasmine.getEnv().currentSpec.description, JSON.stringify(requeststate_callbackValue));
                } else {
                    displayResult(jasmine.getEnv().currentSpec.description, JSON.stringify(requeststate_callbackValue));
                }
            });

            _result.waitForResponse();

        });
    }

    describe('requestState method', function() {
        xit('should connect', function() {
            doConnect();
        });

        for (var i = 0; i < listofrequeststate.length; i++) {
            dorequestState(listofrequeststate[i]);
        }


    });

    function doStoreFormat(value) {

    }

    function doprintStoredFormatWithHash(format, formatpath, hashvalue, callback_type, lang) {
        var deftext = ['Should Print a ', lang, ' stored format by Hash ', callback_type, ' callback'];
        var dispcase = ['1. Should Store format path using printRawString<br />2.Should Print a ', lang, ' stored format on the printer fields specified by the Hash'];
        var dispexp = ['Should Print a ', lang, ' stored format on the printer fields specified by the Hash. Barcode should be printed.'];

        it(deftext.join(''), function() {
            dispTestCaseRunning(dispcase.join(''));
            dispExpectedResult(dispexp.join(''));
            //Common Method implemented to wait for tester to run the test.Code available in specHelper.js
            _result.waitToRunTest();
            runs(function() {
                callresult = null;
                thisprinter.printRawString(format, {}, cbk);
            });
            waitsFor(function() {
                return callresult !== null;
            }, 'wait until printing', 20000);

            runs(function() {
                callresult = null;
                if (callback_type == 'with') {
                    thisprinter.printStoredFormatWithHash(formatpath, hashvalue, cbk);
                } else if (callback_type == 'without') {
                    thisprinter.printStoredFormatWithHash(formatpath, hashvalue);
                } else if (callback_type == 'Anonymous') {
                    thisprinter.printStoredFormatWithHash(formatpath, hashvalue, function(callbackValue) {
                        callresult = callbackValue;
                    });
                }
            });

            waitsFor(function() {
                if (callback_type == 'without') {
                    setTimeout(function() {
                        callresult = true;
                    }, 10000);
                    return callresult;
                } else {
                    return callresult !== null;
                }
            }, 'wait to Print', 30000);

            runs(function() {
                if (lang != 'invalid') {
                    displayResult(jasmine.getEnv().currentSpec.description, callresult.toString());
                } else {
                    displayResult(jasmine.getEnv().currentSpec.description, callresult.toString());
                }
            });

            _result.waitForResponse();
        });
    }

    describe('printStoredFormatWithHash method', function() {
        xit('should connect', function() {
            doConnect();
        });

        var zplstoredformat = '^XA^DFE:FORMAT.ZPL^FS^LH30,30^FO20,10^AF^FN1^FS^FO20,60^B3,,40,,^FN2^FS^FO20,120^AF^FN3^FS^FO20,180^AF^FN4^FS^FO20,240^AF^FN5^FS^FO20,300^AF^FN6^FS^XZ';
        var ccplstoredformat = "! DF E:FORMATAS.FMT\n" +
            "! 0 200 200 310 1\n" +
            "CENTER\n" +
            "TEXT 4 1 0 50 RECEIPT\n" +
            "TEXT 4 0 0 150 \\\\\n" +
            "TEXT 4 0 0 200 \\\\\n" +
            "TEXT 4 0 0 250 \\\\\n" +
            "FORM\n" +
            "PRINT\n";
             
        doprintStoredFormatWithHash(zplstoredformat, 'E:FORMAT.ZPL', hashzpl, 'with', "ZPL Language");
  

    });


    function doprintStoredFormatWithArray(format, formatpath, arrayvalue, callback_type, lang) {
        var deftext = ['Should Print a ', lang, ' stored format by Array ', callback_type, ' callback'];
        var dispcase = ['1. Should Print label <br />2.Should Print a ', lang, ' stored format on the printer fields specified by the Array'];
        var dispexp = ['Should Print a ', lang, ' stored format on the printer fields specified by the Array. Barcode should be printed.'];

        it(deftext.join(''), function() {
            dispTestCaseRunning(dispcase.join(''));
            dispExpectedResult(dispexp.join(''));
            //Common Method implemented to wait for tester to run the test.Code available in specHelper.js
            _result.waitToRunTest();

            runs(function() {
                callresult = null;
                thisprinter.printRawString(format, {}, cbk);
            });
            waitsFor(function() {
                return callresult !== null;
            }, 'wait until printing', 20000);

            runs(function() {
                callresult = null;
                if (callback_type == 'with') {
                    thisprinter.printStoredFormatWithArray(formatpath, arrayvalue, cbk);
                } else if (callback_type == 'without') {
                    thisprinter.printStoredFormatWithArray(formatpath, arrayvalue);
                } else if (callback_type == 'Anonymous') {
                    thisprinter.printStoredFormatWithArray(formatpath, arrayvalue, function(callbackValue) {
                        callresult = callbackValue;
                    });
                }
            });

            waitsFor(function() {
                if (callback_type == 'without') {
                    setTimeout(function() {
                        callresult = true;
                    }, 10000);
                    return callresult;
                } else {
                    return callresult !== null;
                }
            }, 'wait to Print', 120000);

            runs(function() {
                if (lang != 'invalid') {
                    displayResult(jasmine.getEnv().currentSpec.description, callresult.toString());
                } else {
                    displayResult(jasmine.getEnv().currentSpec.description, callresult.toString());
                }
            });

            _result.waitForResponse();
        });
    }

    describe('printStoredFormatWithArray method', function() {
        xit('should connect', function() {
            doConnect();
        });
        var zplstoredformat = '^XA^DFE:FORMAT.ZPL^FS^LH30,30^FO20,10^AF^FN1^FS^FO20,60^B3,,40,,^FN2^FS^FO20,120^AF^FN3^FS^FO20,180^AF^FN4^FS^FO20,240^AF^FN5^FS^FO20,300^AF^FN6^FS^XZ';
        var ccplstoredformat = "! DF E:FORMATAS.FMT\n" +
            "! 0 200 200 310 1\n" +
            "CENTER\n" +
            "TEXT 4 1 0 50 RECEIPT\n" +
            "TEXT 4 0 0 150 \\\\\n" +
            "TEXT 4 0 0 200 \\\\\n" +
            "TEXT 4 0 0 250 \\\\\n" +
            "FORM\n" +
            "PRINT\n";

        doprintStoredFormatWithArray(zplstoredformat, 'E:FORMAT.ZPL', arrayzpl, 'with', "ZPL Language");


    });


    describe('connect and disconnect methods', function() {
        var callresult = null;

        function cbk(val) {
            callresult = val;
        }

        it('disconnect and try to print should return status error', function() {
            dispTestCaseRunning("1. Run test will try to print the print png after disconnect");
            dispExpectedResult("Should return status error when try to print print png after disconnect");
            //Common Method implemented to wait for tester to run the test.Code available in specHelper.js
            _result.waitToRunTest();
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
                thisprinter.disconnect();
            });
            
			doPrintPrintFile(pngimagepath_320px, {});
			
            _result.waitForResponse();
            
        });
    });    

});
