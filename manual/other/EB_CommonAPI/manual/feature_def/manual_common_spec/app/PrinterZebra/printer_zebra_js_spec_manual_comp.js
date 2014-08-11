describe('Printer Zebra', function() {
    var ENABLE9K = 9000;
    var ENABLE10K = 10000;
    var ENABLE60K = 60000;
    var ENABLE120K = 120000;
    var ENABLE5MIN = 300000;
    var ENABLE30MIN = 1800000;
    var enableFlag = false;
    var callbackstatus = false;
    //var enumData = EB.PrinterZebra.enumerateSupportedTypes();
    var printers_array = [];
    var printers_errors = [];
    var discovery_finished = false;
    var connect_type = EB.PrinterZebra.CONNECTION_TYPE_TCP;
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
        return EB.RhoFile.join(EB.Application.modelFolderPath('PrinterZebra'), EB.RhoFile.join('PrinterZebraFiles', filename));
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
        EB.Log.info(" " + JSON.stringify(combinations, null, 2), "APP");
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

    if (EB.System.platform == EB.System.PLATFORM_WM_CE) {
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
        if (callbackValue.status == EB.PrinterZebra.PRINTER_STATUS_SUCCESS && callbackValue.printerID && callbackValue.printerID.length > 0) {
            printers_array.push(callbackValue.printerID);
        } else if (callbackValue.status == EB.PrinterZebra.PRINTER_STATUS_SUCCESS) {
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
        dispTestCaseRunning("initializing before tests, Will search the Zebra Printers");
        dispExpectedResult("Should wait until devices are discovered to continue");
        runs(function() {
            $('#dev_list').empty();
            $('#dev_list').prepend('<option value=\'\'>none</option>').val('');
            $('#dev_list').change(function() {
                var valueSelected = $(this).val();
                if (valueSelected === '') {
                    $('#dev_addr').val('127.0.0.1');
                    $('#dev_port').val('6101');
                    $('#dev_conn_type').val(EB.PrinterZebra.CONNECTION_TYPE_TCP);
                } else {
                    var res = valueSelected.split('|');
                    $('#dev_conn_type').val(res[0]);
                    $('#dev_addr').val(res[1]);
                    $('#dev_port').val(res[2]);
                }
            });
        });

        runs(function() {
            dispTestCaseRunning('Wait until devices are discovered to continue');
            dispExpectedResult('');
            EB.PrinterZebra.searchPrinters({}, searchPrinterCallback);
        });

        waitsFor(function() {
            return discovery_finished;
        }, '60sec waiting for Search printer', ENABLE60K);

        runs(function() {
            dispTestCaseRunning('Use drop-down list to select tested device and then press "done" button.');
            dispExpectedResult('There should be at least one device to select.');

            for (var i = 0; i < printers_array.length; i++) {
                var printerInstance = EB.PrinterZebra.getPrinterByID(printers_array[i]);
                last_found_printer_id = printers_array[i];
                last_found_printer = printerInstance;

                var printerType = printerInstance.printerType.replace('PRINTER_TYPE_', '');
                var connType = printerInstance.connectionType.replace('CONNECTION_TYPE_', '');
                var devName = printerType + '-' + connType + '@' + printerInstance.deviceAddress;
                var pid = printerInstance.connectionType + '|' + printerInstance.deviceAddress + '|' + printerInstance.devicePort + '|' + printers_array[i];

                $('#dev_list').append($('<option>', {
                    value: pid
                }).text(devName));
            }
            $('#dev_list').val($('#dev_list option:eq(1)').val()).trigger('change');

            displaySearchResults({}, printers_array, printers_errors);
            expect(printers_errors).toEqual([]);
            expect(printers_array.length).toBeGreaterThan(0);
        });

        _result.waitUntilDone();

        runs(function() {
            var printerSettings = $('#dev_list').val().split('|');
            last_found_printer_id = printerSettings[3];
            last_found_printer = EB.PrinterZebra.getPrinterByID(last_found_printer_id);
        });
    });




    var errorCode = null;
    var usedPrinter = null;




    ////////////////////////////////
    var thisprinter = null;
    var callresult = null;

    function cbk(val) {
        callresult = val;
        alert(callresult);
    }

    function doConnect() {
        dispTestCaseRunning("Connecting... to Zebra printer");
        dispExpectedResult("Should connect to the Zebra printer");
        runs(function() {
            expect(last_found_printer_id).toNotEqual(null);
            thisprinter = EB.PrinterZebra.getPrinterByID(last_found_printer_id);
            callresult = null;
            thisprinter.connect(cbk);
        });

        waitsFor(function() {
            return callresult !== null;
        }, 'wait until connected', 10000);

        runs(function() {
            expect(callresult).toEqual(EB.PrinterZebra.PRINTER_STATUS_SUCCESS);
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
            //expect(callresult.status).toEqual(EB.PrinterZebra.PRINTER_STATUS_SUCCESS);
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

        it('should print png image with callback', function() {
            dispTestCaseRunning("1. Should Print label <br />2. print PNG image.");
            dispExpectedResult("Should print png image and status should return PRINTER_STATUS_SUCCESS");
            //Common Method implemented to wait for tester to run the test.Code available in specHelper.js
            _result.waitToRunTest();

            doPrintTestLabel();
            doSetLabelLength(500);
            doPrintPrintFile(pngimagepath_320px, {});

        });

        it('should print png without callback', function() {
            dispTestCaseRunning("1. Should Print label <br />2. print PNG image.");
            dispExpectedResult("Should print png image.");
            //Common Method implemented to wait for tester to run the test.Code available in specHelper.js
            _result.waitToRunTest();

            doPrintTestLabel();
            doSetLabelLength(500);
            doPrintFileDiffTypeCallback(pngimagepath_320px, {}, 'without');

        });


        it('should print jpeg with callback', function() {
            dispTestCaseRunning("1. Should Print label <br />2. print jpeg image.");
            dispExpectedResult("Should print jpeg image and status should return PRINTER_STATUS_SUCCESS");
            //Common Method implemented to wait for tester to run the test.Code available in specHelper.js
            _result.waitToRunTest();

            doPrintTestLabel();
            doSetLabelLength(500);
            doPrintPrintFile(jpgimagepath_320px, {});
        });

   
    });

    describe('printRawString method', function() {
        it('should connect', function() {
            doConnect();
        });

        it('should print ZPL Command with callback', function() {
            dispTestCaseRunning(" 1. Should Print label <br />2. print ZPL Command ");
            dispExpectedResult("should print ZPL Command and status should return PRINTER_STATUS_SUCCESS");
            //Common Method implemented to wait for tester to run the test.Code available in specHelper.js
            _result.waitToRunTest();
            doPrintTestLabel();
            doPrintRawCommand(CommandZPL);
            _result.waitForResponse();
        });
        it('should print CPCL Command with callback', function() {
            dispTestCaseRunning(" 1. Should Print label <br />2. print CPCL Command ");
            dispExpectedResult("should print CPCL Command and status should return PRINTER_STATUS_SUCCESS");
            //Common Method implemented to wait for tester to run the test.Code available in specHelper.js
            _result.waitToRunTest();
            doPrintTestLabel();
            doPrintRawCommand(CommandCCPL);
            _result.waitForResponse();
        });

        it('should print ZPL Command without callback', function() {
            dispTestCaseRunning(" 1. Should Print label <br />2. print ZPL Command ");
            dispExpectedResult("should print ZPL Command");
            //Common Method implemented to wait for tester to run the test.Code available in specHelper.js
            _result.waitToRunTest();
            doPrintTestLabel();
            doPrintRawCommandDiffTypeCallback(CommandZPL, 'without');
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
        it('should connect', function() {
            doConnect();
        });

        it('should print test_zpl.zpl with callback', function() {
            dispTestCaseRunning(" 1. Should Print label <br />2. send test_zpl.zpl file to get printed");
            dispExpectedResult("should print test_zpl.zpl and status should return PRINTER_STATUS_SUCCESS");
            //Common Method implemented to wait for tester to run the test.Code available in specHelper.js
            _result.waitToRunTest();
            doPrintTestLabel();
            doSendFileContents(test_zpl, 'with');
        });
        it('should print test_cpcl.lbl with callback', function() {
            dispTestCaseRunning(" 1. Should Print label <br />2. send test_zpl.ccpl file to get printed");
            dispExpectedResult("should print test_CCPL.CCPL and status should return PRINTER_STATUS_SUCCESS");
            //Common Method implemented to wait for tester to run the test.Code available in specHelper.js
            _result.waitToRunTest();
            doPrintTestLabel();
            doSendFileContents(test_cpcl, 'with');
        });

       
    });




    function generatePrintImage(from, x, y, options, isOk, force) {
        if ((!EB.RhoFile.exists(from))) {
            if (!isOk && !force) {
                return;
            }
            isOk = false;
        }
        var def = isOk ? 'should ' : 'should not ';
        var deftext = [def, 'print image', EB.RhoFile.basename(from), 'x:', x, 'y:', y, 'options:', JSON.stringify(options, null, " ")];

        it(deftext.join(' '), function() {
            dispTestCaseRunning("1. Should Print label <br />2. " + def + " Print " + EB.RhoFile.basename(from) + " image");
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
        it('should connect', function() {
            doConnect();
        });

        
        var sizes = [-1];
        var formats = [png_s, jpg_s];
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

    function generatePrintImageWithoutAnonymous(callback_type, from, x, y, options, isOk, force) {
        if ((!EB.RhoFile.exists(from))) {
            if (!isOk && !force) {
                return;
            }
            isOk = false;
        }
        var def = isOk ? 'should ' : 'should not ';
        var deftext = [def, 'print image', callback_type, 'callback', EB.RhoFile.basename(from), 'x:', x, 'y:', y, 'options:', JSON.stringify(options, null, " ")];

        it(deftext.join(' '), function() {
            dispTestCaseRunning("1. Should Print label <br />2. " + def + " Print " + EB.RhoFile.basename(from) + " image");
            dispExpectedResult(jasmine.getEnv().currentSpec.description);
            //Common Method implemented to wait for tester to run the test.Code available in specHelper.js
            _result.waitToRunTest();
            doPrintTestLabel();

            runs(function() {
                callresult = null;
                if (callback_type == 'without') {
                    thisprinter.printImageFromFile(from, x, y, options);
                } else if (callback_type == 'Anonymous') {
                    thisprinter.printImageFromFile(from, x, y, options, function(callbackValue) {
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
            }, 'wait printImageFromFile', 30000);


            runs(function() {
                displayResult(jasmine.getEnv().currentSpec.description, callresult.toString());
            });
            _result.waitForResponse();
        });
    }

    describe('printImageFromFile method', function() {
        it('should connect', function() {
            doConnect();
        });

        generatePrintImageWithoutAnonymous('without', pngimagepath_320px, 100, 100, {
            'width': 10,
            'height': 10,
            'isInsideFormat': true
        }, true);
 
        generatePrintImageWithoutAnonymous('without', jpgimagepath_320px, 100, 100, {
            'width': 10,
            'height': 10,
            'isInsideFormat': false
        }, true);


    });

    var listofrequeststate = [EB.PrinterZebra.PRINTER_STATE_IS_PAPER_OUT, EB.PrinterZebra.PRINTER_STATE_IS_READY_TO_PRINT];
    var printmode_state = [EB.PrinterZebra.PRINTER_STATE_PRINT_MODE];
    var printmode_values = [EB.PrinterZebra.PRINT_MODE_CUTTER];
    var requeststate_callbackValue = {};

    function requestStateCallback(args) {
        if (args.status == EB.PrinterZebra.PRINTER_STATUS_SUCCESS) {
            requeststate_callbackValue = args;

        } else if (args.status == EB.PrinterZebra.PRINTER_STATUS_ERROR) {
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
                if (requeststate_callbackValue.status == EB.PrinterZebra.PRINTER_STATUS_SUCCESS) {
                    displayResult(jasmine.getEnv().currentSpec.description, JSON.stringify(requeststate_callbackValue));
                } else {
                    displayResult(jasmine.getEnv().currentSpec.description, JSON.stringify(requeststate_callbackValue));
                }
            });

            _result.waitForResponse();

        });
    }

    describe('requestState method', function() {
        it('should connect', function() {
            doConnect();
        });

        for (var i = 0; i < listofrequeststate.length; i++) {
            dorequestState(listofrequeststate[i]);
        }

        for (var i = 0; i < printmode_values.length; i++) {
            dorequestState(printmode_state[0], printmode_values[i]);
        }

    });

    function doStoreFormat(value) {

    }

    function doprintStoredFormatWithHash(format, formatpath, hashvalue, callback_type, lang) {
        var deftext = ['Should Print a ', lang, ' stored format by Hash ', callback_type, ' callback'];
        var dispcase = ['1. Should Store format path using printRawString<br />2.Should Print a ', lang, ' stored format on the printer fields specified by the Hash'];
        var dispexp = ['Should Print a ', lang, ' stored format on the printer fields specified by the Hash'];

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
        it('should connect', function() {
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
        doprintStoredFormatWithHash(zplstoredformat, 'E:FORMAT.ZPL', hashzpl, 'without', "ZPL Language");
        doprintStoredFormatWithHash(zplstoredformat, 'E:FORMAT.ZPL', hashzpl, 'Anonymous', "ZPL Language");

        //doprintStoredFormatWithHash(ccplstoredformat, 'E:FORMATAS.FMT', hashccpl, 'with', "CCPL Language");
        //doprintStoredFormatWithHash(ccplstoredformat, 'E:FORMATAS.FMT', hashccpl, 'without', "CCPL Language");
        //doprintStoredFormatWithHash(ccplstoredformat, 'E:FORMATAS.FMT', hashccpl, 'Anonymous', "CCPL Language");

        doprintStoredFormatWithHash(invalidformatpath, 'E:FORMAT.ZPL', invalidzplhash, 'with', "invalid");

    });


    function doprintStoredFormatWithArray(format, formatpath, arrayvalue, callback_type, lang) {
        var deftext = ['Should Print a ', lang, ' stored format by Array ', callback_type, ' callback'];
        var dispcase = ['1. Should Print label <br />2.Should Print a ', lang, ' stored format on the printer fields specified by the Array'];
        var dispexp = ['Should Print a ', lang, ' stored format on the printer fields specified by the Array'];

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
        it('should connect', function() {
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

        //doPrintRawCommand(zplstoredformat);
        //doPrintRawCommand(ccplstoredformat);
        doprintStoredFormatWithArray(zplstoredformat, 'E:FORMAT.ZPL', arrayzpl, 'with', "ZPL Language");
        doprintStoredFormatWithArray(zplstoredformat, 'E:FORMAT.ZPL', arrayzpl, 'without', "ZPL Language");
        doprintStoredFormatWithArray(zplstoredformat, 'E:FORMAT.ZPL', arrayzpl, 'Anonymous', "ZPL Language");

        //doprintStoredFormatWithArray(ccplstoredformat, 'E:FORMATAS.FMT', arrayccpl, 'with', "CCPL Language");
        //doprintStoredFormatWithArray(ccplstoredformat, 'E:FORMATAS.FMT', arrayccpl, 'without', "CCPL Language");
        //doprintStoredFormatWithArray(ccplstoredformat, 'E:FORMATAS.FMT', arrayccpl, 'Anonymous', "CCPL Language");

        doprintStoredFormatWithArray(invalidformatpath, 'E:FORMAT.ZPL', invalidzplhash, 'with', "invalid");

    });

});
