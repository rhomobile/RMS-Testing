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
    
    if (Rho.System.platform == Rho.System.PLATFORM_WM_CE)
    {
        sizes = ['320px', '640px', '1024px'];
    }
    else
    {
        sizes = ['320px', '640px', '1024px', '2048px'];
    }

    var extensions = ['png','jpg','gif','bmp'];

    for (var e = extensions.length - 1; e >= 0; e--) {
        var collection = [];
        for (var sz = 0; sz < sizes.length; sz++) {
            var varname = extensions[e]+'imagepath_'+sizes[sz];
            var filepath = makeFilePath(varname + '.' + extensions[e]);
            // EVAL INTENT!
            eval("var "+ varname + " = '" + filepath +"'");

            collection.push(varname);
        }
        eval("var " + extensions[e] + "_s" + " = [" + collection.join(",") +"];" );
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
			if(printers_array.length > 0){
				discovery_finished = true;
			}
			else{
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
				dispExpectedResult("should Wait until devices are discovered to continue");
			  runs(function() {
            $('#dev_list').empty();
            $('#dev_list').prepend('<option value=\'\'>none</option>').val('');
            $('#dev_list').change(function() {
                var valueSelected = $(this).val();
                if (valueSelected == '') {
                    $('#dev_addr').val('127.0.0.1');
                    $('#dev_port').val('6101');
                    $('#dev_conn_type').val(Rho.PrinterZebra.CONNECTION_TYPE_TCP);
                } else {
                    var res = valueSelected.split('|');
                    $('#dev_conn_type').val(res[0]);
                    $('#dev_addr').val(res[1]);
                    $('#dev_port').val(res[2]);
                }
            });
        });

        runs(function() {
            Rho.PrinterZebra.searchPrinters({}, searchPrinterCallback);
        });

        waitsFor(function() {
            return discovery_finished;
        }, '60sec waiting for Search printer', ENABLE60K);

        runs(function() {
            for (var i = 0; i < printers_array.length; i++) {
                var printerInstance = Rho.PrinterZebra.getPrinterByID(printers_array[i]);
                last_found_printer_id = printers_array[i];
                last_found_printer = printerInstance;

                var printerType = printerInstance.printerType.replace('PRINTER_TYPE_', '');
                var connType = printerInstance.connectionType.replace('CONNECTION_TYPE_', '');
                var devName = printerType + '-' + connType + '@' + printerInstance.deviceAddress;
                var pid = printerInstance.connectionType + '|' + printerInstance.deviceAddress + '|' + printerInstance.devicePort;

                $('#dev_list').append($('<option>', {
                    value: pid
                }).text(devName));
            }
            $('#dev_list').val($('#dev_list option:eq(1)').val()).trigger('change');

            displaySearchResults({}, printers_array, printers_errors);
            expect(printers_errors).toEqual([]);
            expect(printers_array.length).toBeGreaterThan(0);
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
			displayResult(jasmine.getEnv().currentSpec.description, callresult.toString());
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

        /*runs(function() {
            if (isOk !== false) {
                expect(callresult).toEqual(Rho.PrinterZebra.PRINTER_STATUS_SUCCESS);
            } else {
                expect(callresult).toNotEqual(Rho.PrinterZebra.PRINTER_STATUS_SUCCESS);
            }
        });*/
		runs(function() {
			displayResult(jasmine.getEnv().currentSpec.description, callresult.toString());
		});
		_result.waitForResponse();
    }

   
    function doPrintFileDiffTypeCallback(filename, options, callback_type) {
        runs(function() {
            callresult = null;
            if(callback_type == 'without')  {
                callresult = thisprinter.printFile(filename, options);
            }
            else if (callback_type == 'Anonymous') {
                thisprinter.printFile(filename, options, function(callbackValue) { callresult = callbackValue;})
            }
        });

        waitsFor(function() {
            return callresult !== null;
        }, 'wait until printingFile', 30000);

        /*runs(function() {
            if (isOk !== false) {
                expect(callresult).toEqual(Rho.PrinterZebra.PRINTER_STATUS_SUCCESS);
            } else {
                expect(callresult).toNotEqual(Rho.PrinterZebra.PRINTER_STATUS_SUCCESS);
            }
        });*/
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
			displayResult(jasmine.getEnv().currentSpec.description, callresult.toString());
		});
    }

    function doPrintRawCommandDiffTypeCallback(cmd, callback_type) {
        runs(function() {
            callresult = null;
            if(callback_type == 'without')  {
                callresult = thisprinter.printRawString(cmd, {});
            }
            else if (callback_type == 'Anonymous') {
                thisprinter.printRawString(cmd, {}, function(callbackValue) { callresult = callbackValue;})
            }
        });

        waitsFor(function() {
            return callresult !== null;
        }, 'wait until setting lable length', 15000);
                
        runs(function() {
            displayResult(jasmine.getEnv().currentSpec.description, callresult.toString());
        });
    }
     

    // printFile method
    describe('printFile method', function() {
        it('should connect', function() {
		  doConnect();
		});

        it('should print png with callback', function() {
			dispTestCaseRunning("1. Should Print label <br />2. Should print PNG image.");
			dispExpectedResult("Should print png with callback");
			//Common Method implemented to wait for tester to run the test.Code available in specHelper.js
			_result.waitToRunTest();
			
			doPrintTestLabel();
			doSetLabelLength(500);
			doPrintPrintFile(pngimagepath_320px, {});
				
        });

        it('should print png without callback', function() {
            dispTestCaseRunning("1. Should Print label <br />2. Should print PNG image.");
            dispExpectedResult("Should print png without callback");
            //Common Method implemented to wait for tester to run the test.Code available in specHelper.js
            _result.waitToRunTest();
            
            doPrintTestLabel();
            doSetLabelLength(500);
            doPrintFileDiffTypeCallback(pngimagepath_320px, {}, 'without');
                
        });

        it('should print png Anonymous callback', function() {
            dispTestCaseRunning("1. Should Print label <br />2. Should print PNG image.");
            dispExpectedResult("Should print png Anonymous callback");
            //Common Method implemented to wait for tester to run the test.Code available in specHelper.js
            _result.waitToRunTest();
            
            doPrintTestLabel();
            doSetLabelLength(500);
            doPrintFileDiffTypeCallback(pngimagepath_320px, {}, 'Anonymous');
                
        });

        it('should print jpeg with callback', function() {
			dispTestCaseRunning("1. Should Print label <br />2. Should print jpeg image.");
			dispExpectedResult("should print jpeg with callback");
			//Common Method implemented to wait for tester to run the test.Code available in specHelper.js
			_result.waitToRunTest();
						
            doPrintTestLabel();
            doSetLabelLength(500);
            doPrintPrintFile(jpgimagepath_320px, {});
        });

         it('should print jpeg without callback', function() {
            dispTestCaseRunning("1. Should Print label <br />2. Should print PNG image.");
            dispExpectedResult("Should print jpeg without callback");
            //Common Method implemented to wait for tester to run the test.Code available in specHelper.js
            _result.waitToRunTest();
            
            doPrintTestLabel();
            doSetLabelLength(500);
            doPrintFileDiffTypeCallback(jpgimagepath_320px, {}, 'without');
                
        });

        it('should print jpeg Anonymous callback', function() {
            dispTestCaseRunning("1. Should Print label <br />2. Should print PNG image.");
            dispExpectedResult("Should print jpeg Anonymous callback");
            //Common Method implemented to wait for tester to run the test.Code available in specHelper.js
            _result.waitToRunTest();
            
            doPrintTestLabel();
            doSetLabelLength(500);
            doPrintFileDiffTypeCallback(jpgimagepath_320px, {}, 'Anonymous');
        });   

        it('should print bmp with callback', function() {
			dispTestCaseRunning("1. Should Print label <br />2. Should print bmp image.");
			dispExpectedResult("should print bmp with callback");
			//Common Method implemented to wait for tester to run the test.Code available in specHelper.js
			_result.waitToRunTest();
			
            doPrintTestLabel();
            doSetLabelLength(500);
            doPrintPrintFile(bmpimagepath_320px, {}, false);
        });

        it('should print bmp without callback', function() {
            dispTestCaseRunning("1. Should Print label <br />2. Should print PNG image.");
            dispExpectedResult("Should print bmp without callback");
            //Common Method implemented to wait for tester to run the test.Code available in specHelper.js
            _result.waitToRunTest();
            
            doPrintTestLabel();
            doSetLabelLength(500);
            doPrintFileDiffTypeCallback(bmpimagepath_320px, {}, 'without');
                
        });

        it('should print bmp Anonymous callback', function() {
            dispTestCaseRunning("1. Should Print label <br />2. Should print PNG image.");
            dispExpectedResult("Should print bmp Anonymous callback");
            //Common Method implemented to wait for tester to run the test.Code available in specHelper.js
            _result.waitToRunTest();
            
            doPrintTestLabel();
            doSetLabelLength(500);
            doPrintFileDiffTypeCallback(bmpimagepath_320px, {}, 'Anonymous');

        });       

        it('should print pdf with callback', function() {
			dispTestCaseRunning(" 1. Should Print label <br />2. Should print PDF file.");
			dispExpectedResult("should print PDF with callback");
			//Common Method implemented to wait for tester to run the test.Code available in specHelper.js
			_result.waitToRunTest();
            doPrintTestLabel();
            doSetLabelLength(500);
            doPrintPrintFile(pdffilepath, {}, false);
        });

        it('should print pdf without callback', function() {
            dispTestCaseRunning("1. Should Print label <br />2. Should print PNG image.");
            dispExpectedResult("Should print pdf without callback");
            //Common Method implemented to wait for tester to run the test.Code available in specHelper.js
            _result.waitToRunTest();
            
            doPrintTestLabel();
            doSetLabelLength(500);
            doPrintFileDiffTypeCallback(pdffilepath, {}, 'without');
                
        });

        it('should print pdf Anonymous callback', function() {
            dispTestCaseRunning("1. Should Print label <br />2. Should print PNG image.");
            dispExpectedResult("Should print pdf Anonymous callback");
            //Common Method implemented to wait for tester to run the test.Code available in specHelper.js
            _result.waitToRunTest();
            
            doPrintTestLabel();
            doSetLabelLength(500);
            doPrintFileDiffTypeCallback(pdffilepath, {}, 'Anonymous');

        }); 

        it('should not print empty filename with callback', function() {
    		dispTestCaseRunning(" 1. Should Print label <br />2. should not print empty filename ");
    		dispExpectedResult("should not print empty filename with callback");
    		//Common Method implemented to wait for tester to run the test.Code available in specHelper.js
    		_result.waitToRunTest();
            doPrintTestLabel();
            doSetLabelLength(500);
            doPrintPrintFile('', {}, false);
        });
        it('should not print invalid filename with callback', function() {
    		dispTestCaseRunning(" 1. Should Print label <br />2. should not print invalid filename ");
    		dispExpectedResult("should not print invalid filename with callback");
    		//Common Method implemented to wait for tester to run the test.Code available in specHelper.js
    		_result.waitToRunTest();
            doPrintTestLabel();
            doSetLabelLength(500);
            doPrintPrintFile(invalidfilepath, {}, false);
        });
    });

    describe('printRawString method', function() {
        it('should connect', function() {
            doConnect();
        });

        it('should print ZPL Command with callback', function() {
			dispTestCaseRunning(" 1. Should Print label <br />2. should print ZPL Command ");
			dispExpectedResult("should print ZPL Command with callback");
			//Common Method implemented to wait for tester to run the test.Code available in specHelper.js
			_result.waitToRunTest();
            doPrintTestLabel();
            doPrintRawCommand(CommandZPL);
			_result.waitForResponse();
        });
        it('should print CPCL Command with callback', function() {
    		dispTestCaseRunning(" 1. Should Print label <br />2. should print CPCL Command ");
    		dispExpectedResult("should print CPCL Command with callback");
    		//Common Method implemented to wait for tester to run the test.Code available in specHelper.js
    		_result.waitToRunTest();
            doPrintTestLabel();
            doPrintRawCommand(CommandCCPL);
			_result.waitForResponse();
        });

         it('should print ZPL Command without callback', function() {
            dispTestCaseRunning(" 1. Should Print label <br />2. should print ZPL Command ");
            dispExpectedResult("should print ZPL Command without callback");
            //Common Method implemented to wait for tester to run the test.Code available in specHelper.js
            _result.waitToRunTest();
            doPrintTestLabel();
            doPrintRawCommandDiffTypeCallback(CommandZPL, 'without');
            _result.waitForResponse();
        });

        it('should print CPCL Command with Anonymous', function() {
            dispTestCaseRunning(" 1. Should Print label <br />2. should print CPCL Command ");
            dispExpectedResult("should print CPCL Command Anonymous callback");
            //Common Method implemented to wait for tester to run the test.Code available in specHelper.js
            _result.waitToRunTest();
            doPrintTestLabel();
            doPrintRawCommandDiffTypeCallback(CommandCCPL, 'Anonymous');
            _result.waitForResponse();
        });

        it('should not print String with callback', function() {
            dispTestCaseRunning(" 1. Should Print label <br />2. Pass a simple string to print");
            dispExpectedResult("should not print string with callback. Callback should return error");
            //Common Method implemented to wait for tester to run the test.Code available in specHelper.js
            _result.waitToRunTest();
            doPrintTestLabel();
            doPrintRawCommand('Simple string');
            _result.waitForResponse();
        });

    });


    //sendFileContents method
    function doSendFileContents(filename, callback_type) {
        runs(function() {
            callresult = null;
            if(callback_type == 'with') {
                thisprinter.sendFileContents(filename,cbk);
            }
            else if(callback_type == 'without')  {
                callresult = thisprinter.sendFileContents(filename);
            }
            else if (callback_type == 'Anonymous') {
                thisprinter.sendFileContents(filename, function(callbackValue) { callresult = callbackValue;})
            }
        });

        waitsFor(function() {
            return callresult !== null;
        }, 'wait doSendFileContents', 30000);

       /* runs(function() {
            expect(callresult).toEqual(Rho.PrinterZebra.PRINTER_STATUS_SUCCESS);
        });*/
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
			dispTestCaseRunning(" 1. Should Print label <br />2. should send test_zpl.zpl file and should get printed");
			dispExpectedResult("should print test_zpl.zpl");
			//Common Method implemented to wait for tester to run the test.Code available in specHelper.js
			_result.waitToRunTest();
            doPrintTestLabel();
            doSendFileContents(test_zpl, 'with');
        });
        it('should print test_cpcl.lbl with callback', function() {
			dispTestCaseRunning(" 1. Should Print label <br />2. should send  test_zpl.zpl file and should get printed");
			dispExpectedResult("should print test_CCPL.CCPL");
			//Common Method implemented to wait for tester to run the test.Code available in specHelper.js
			_result.waitToRunTest();
            doPrintTestLabel();
            doSendFileContents(test_cpcl, 'with');
        });

        it('should print txtfilepath without callback', function() {
            dispTestCaseRunning(" 1. Should Print label <br />2. should send txtfilepath file and should get printed");
            dispExpectedResult("should print txtfilepath");
            //Common Method implemented to wait for tester to run the test.Code available in specHelper.js
            _result.waitToRunTest();
            doPrintTestLabel();
            doSendFileContents(txtfilepath, 'without');
        });
        it('should print csvfilepath Anonymous Callback', function() {
            dispTestCaseRunning(" 1. Should Print label <br />2. should send csvfilepath file and should get printed");
            dispExpectedResult("should print csvfilepath");
            //Common Method implemented to wait for tester to run the test.Code available in specHelper.js
            _result.waitToRunTest();
            doPrintTestLabel();
            doSendFileContents(csvfilepath, 'Anonymous');
        });

         it('should print docfilepath with callback', function() {
            dispTestCaseRunning(" 1. Should Print label <br />2. should send  docfilepath file and should get printed");
            dispExpectedResult("should print docfilepath");
            //Common Method implemented to wait for tester to run the test.Code available in specHelper.js
            _result.waitToRunTest();
            doPrintTestLabel();
            doSendFileContents(docfilepath, 'with');
        });

        it('should print htmlcssfilepath without callback', function() {
            dispTestCaseRunning(" 1. Should Print label <br />2. should send htmlcssfilepath file and should get printed");
            dispExpectedResult("should print htmlcssfilepath");
            //Common Method implemented to wait for tester to run the test.Code available in specHelper.js
            _result.waitToRunTest();
            doPrintTestLabel();
            doSendFileContents(htmlcssfilepath, 'without');
        });
        it('should print jsfilepath Anonymous Callback', function() {
            dispTestCaseRunning(" 1. Should Print label <br />2. should send jsfilepath file and should get printed");
            dispExpectedResult("should print jsfilepath");
            //Common Method implemented to wait for tester to run the test.Code available in specHelper.js
            _result.waitToRunTest();
            doPrintTestLabel();
            doSendFileContents(test_cpcl, 'Anonymous');
        });

        it('should not print invalidcontentsfilepath with callback', function() {
            dispTestCaseRunning(" 1. Should Print label <br />2. should send invalidcontentsfilepath file and should not get printed");
            dispExpectedResult("should not print invalidcontentsfilepath");
            //Common Method implemented to wait for tester to run the test.Code available in specHelper.js
            _result.waitToRunTest();
            doPrintTestLabel();
            doSendFileContents(invalidcontentsfilepath, 'with');
        });

    });




    function generatePrintImage(from,x,y,options,isOk,force) {
         if ((!Rho.RhoFile.exists(from))) {
            if (!isOk && !force) {
                return;
            }
            isOk = false;
         }
        var def = isOk ? 'should ' : 'should not ';
        var deftext = [def,'print image',Rho.RhoFile.basename(from),'x:',x,'y:',y,'options:',JSON.stringify(options,null," ") ];

        it( deftext.join(' ') , function() {
			dispTestCaseRunning("1. Should Print label <br />2. "+def+" Print "+Rho.RhoFile.basename(from)+" image");
			dispExpectedResult(jasmine.getEnv().currentSpec.description);
			//Common Method implemented to wait for tester to run the test.Code available in specHelper.js
			_result.waitToRunTest();
            doPrintTestLabel();

            runs(function() {
                callresult = null;
                thisprinter.printImageFromFile(from,x,y,options,cbk);
            });

            waitsFor(function() {
                return callresult !== null;
            }, 'wait printImageFromFile', 30000);

            /*runs(function() {
                if (isOk !== false) {
                    expect(callresult).toEqual(Rho.PrinterZebra.PRINTER_STATUS_SUCCESS);
                    callresult = null;
                } else {
                    expect(callresult).toNotEqual(Rho.PrinterZebra.PRINTER_STATUS_SUCCESS);
                }
            });*/
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

        generatePrintImage(pngimagepath_320px,100,100,{'width':0,'height':0},false);

        var sizes = [10,100,-1];
        var formats = [png_s,jpg_s];
        var offsets = [[0,0],[10,10],[-10,-10],[50,50],[-50,-50],[100,-100]];
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
                        generatePrintImage(files[k],coords[0],coords[1],{'width':sizes[j],'height':sizes[j]},false);
                    }
                    else {
                        generatePrintImage(files[k],coords[0],coords[1],{'width':sizes[j],'height':sizes[j]},true);
                    }
                }
            }
        }
    });

 function generatePrintImageWithoutAnonymous(callback_type, from,x,y,options,isOk,force) {
         if ((!Rho.RhoFile.exists(from))) {
            if (!isOk && !force) {
                return;
            }
            isOk = false;
         }
        var def = isOk ? 'should ' : 'should not ';
        var deftext = [def,'print image',callback_type,'callback',Rho.RhoFile.basename(from),'x:',x,'y:',y,'options:',JSON.stringify(options,null," ") ];

        it( deftext.join(' ') , function() {
            dispTestCaseRunning("1. Should Print label <br />2. "+def+" Print "+Rho.RhoFile.basename(from)+" image");
            dispExpectedResult(jasmine.getEnv().currentSpec.description);
            //Common Method implemented to wait for tester to run the test.Code available in specHelper.js
            _result.waitToRunTest();
            doPrintTestLabel();

            runs(function() {
                callresult = null;
                if(callback_type == 'without')  {
                    callresult = thisprinter.printImageFromFile(from,x,y,options);
                }
                else if (callback_type == 'Anonymous') {
                    thisprinter.printImageFromFile(from,x,y,options,function(callbackValue) { callresult = callbackValue;})
                }
            });

            waitsFor(function() {
                return callresult !== null;
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

        generatePrintImageWithoutAnonymous('without', pngimagepath_320px,100,100,{'width':10,'height':10,'isInsideFormat':true},true);
        generatePrintImageWithoutAnonymous('Anonymous', pngimagepath_640px,10,10,{'width':50,'height':50,'isInsideFormat':false},true);
        generatePrintImageWithoutAnonymous('Anonymous', pngimagepath_1024px,10,10,{'width':-1,'height':-1,'isInsideFormat':false},true);
        generatePrintImageWithoutAnonymous('without', jpgimagepath_320px,100,100,{'width':10,'height':10,'isInsideFormat':true},true);
        generatePrintImageWithoutAnonymous('Anonymous', jpgimagepath_640px,10,10,{'width':50,'height':50,'isInsideFormat':true},true);
        generatePrintImageWithoutAnonymous('Anonymous', pngimagepath_1024px,10,10,{'width':-1,'height':-1,'isInsideFormat':false},true);

        
    });

	var listofrequeststate = [Rho.PrinterZebra.PRINTER_STATE_IS_HEAD_COLD, Rho.PrinterZebra.PRINTER_STATE_IS_HEAD_OPEN, Rho.PrinterZebra.PRINTER_STATE_IS_HEAD_TOO_HOT, Rho.PrinterZebra.PRINTER_STATE_IS_PARTIAL_FORMAT_IN_PROGRESS, Rho.PrinterZebra.PRINTER_STATE_IS_PAUSED, Rho.PrinterZebra.PRINTER_STATE_IS_RECEIVE_BUFFER_FULL, Rho.PrinterZebra.PRINTER_STATE_IS_RIBBON_OUT, Rho.PrinterZebra.PRINTER_STATE_LABEL_LENGTH_IN_DOTS, Rho.PrinterZebra.PRINTER_STATE_LABELS_REMAINING_IN_BATCH, Rho.PrinterZebra.PRINTER_STATE_NUMBER_OF_FORMATS_IN_RECEIVE_BUFFER, Rho.PrinterZebra.PRINTER_STATE_IS_READY_TO_PRINT, 	Rho.PrinterZebra.PRINTER_STATE_IS_COVER_OPENED, Rho.PrinterZebra.PRINTER_STATE_IS_DRAWER_OPENED, Rho.PrinterZebra.PRINTER_STATE_IS_PAPER_OUT, Rho.PrinterZebra.PRINTER_STATE_IS_BATTERY_LOW];
	var printmode_state= [Rho.PrinterZebra.PRINTER_STATE_PRINT_MODE];
	var printmode_values = [Rho.PrinterZebra.PRINT_MODE_APPLICATOR, Rho.PrinterZebra.PRINT_MODE_CUTTER, Rho.PrinterZebra.PRINT_MODE_DELAYED_CUT, Rho.PrinterZebra.PRINT_MODE_KIOSK, Rho.PrinterZebra.PRINT_MODE_LINERLESS_PEEL, Rho.PrinterZebra.PRINT_MODE_LINERLESS_REWIND, Rho.PrinterZebra.PRINT_MODE_LINERLESS_REWIND, Rho.PrinterZebra.PRINT_MODE_PARTIAL_CUTTER, Rho.PrinterZebra.PRINT_MODE_PEEL_OFF, Rho.PrinterZebra.PRINT_MODE_REWIND, Rho.PrinterZebra.PRINT_MODE_RFID, Rho.PrinterZebra.PRINT_MODE_TEAR_OFF, Rho.PrinterZebra.PRINT_MODE_UNKNOWN];
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
		
		if(printmode == undefined) {
			deftext = ['Set printer to ',requestStatearray,' state'];
			dispcase = ['Set printer to ',requestStatearray,' state'];
			dispexp = ['Should return True if ',requestStatearray,' is set'];
		}	
		else {
			deftext = ['Set printer to ',printmode,' state'];
			dispcase = ['Set printer to ',printmode,' state by manually Zebra utilities'];
			dispexp = ['Should return ',printmode,' value for ',requestStatearray,''];
		} 
		
		it( deftext.join('') , function() {
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
				if(requeststate_callbackValue.status ==  Rho.PrinterZebra.PRINTER_STATUS_SUCCESS) {
					displayResult(jasmine.getEnv().currentSpec.description, JSON.stringify(requeststate_callbackValue));
				}
				else {
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
		
		for(var i = 0; i<listofrequeststate.length;i++) {
			dorequestState(listofrequeststate[i]);
		}	
		
		for(var i = 0; i<printmode_values.length;i++) {
			dorequestState(printmode_state[0], printmode_values[i]);
		}	
	
	});	
	

	function doprintStoredFormatWithHash(format, formatpath, hashvalue, callback_type, lang) {
	    var deftext = ['Should Print a ',lang,' stored format by Hash ',callback_type,' callback'];
		var dispcase = ['1. Should Store format path using printRawString<br />2.Should Print a ',lang,' stored format on the printer fields specified by the Hash'];
		var dispexp = ['Should Print a ',lang,' stored format on the printer fields specified by the Hash'];
	
		it( deftext.join('') , function() {
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
				if(callback_type == 'with') {
					thisprinter.printStoredFormatWithHash(formatpath, hashvalue, cbk);
				}
				else if(callback_type == 'without') {
					callresult = thisprinter.printStoredFormatWithHash(formatpath, hashvalue);
				}	
				else if(callback_type == 'Anonymous') {
					thisprinter.printStoredFormatWithHash(formatpath, hashvalue, function(callbackValue) {callresult = callbackValue;});
				}	
			});

			waitsFor(function() {
					return callresult !== null;
			}, 'wait to Print', 30000);
			
			runs(function() {
				if(lang != 'invalid')	{
					displayResult(jasmine.getEnv().currentSpec.description, callresult.toString());
				}	
				else {	
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

        var zplstoredformat = '^XA^DFFORMAT^FS^LH30,30^FO20,10^AF^FN1^FS^FO20,60^B3,,40,,^FN2^FS^FO20,120^AF^FN3^FS^FO20,180^AF^FN4^FS^FO20,240^AF^FN5^FS^FO20,300^AF^FN6^FS^XZ';
         var ccplstoredformat = "! DF FORMAT.FMT\n" +
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
        
        doprintStoredFormatWithHash(ccplstoredformat, 'E:FORMAT.FMT', hashccpl, 'with', "CCPL Language");
        doprintStoredFormatWithHash(ccplstoredformat, 'E:FORMAT.FMT', hashccpl, 'without', "CCPL Language");
        doprintStoredFormatWithHash(ccplstoredformat, 'E:FORMAT.FMT', hashccpl, 'Anonymous', "CCPL Language");
        
        doprintStoredFormatWithHash(invalidformatpath, 'E:FORMAT.ZPL', invalidzplhash, 'with', "invalid");
		
	});
	
	
	function doprintStoredFormatWithArray(format, formatpath, arrayvalue, callback_type, lang) {
		var deftext = ['Should Print a ',lang,' stored format by Array ',callback_type,' callback'];
		var dispcase = ['1. Should Print label <br />2.Should Print a ',lang,' stored format on the printer fields specified by the Array'];
		var dispexp = ['Should Print a ',lang,' stored format on the printer fields specified by the Array'];
	
		it( deftext.join('') , function() {
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
				if(callback_type == 'with') {
					thisprinter.printStoredFormatWithArray(formatpath, arrayvalue, cbk);
				}
				else if(callback_type == 'without') {
					callresult = thisprinter.printStoredFormatWithArray(formatpath, arrayvalue);
				}	
				else if(callback_type == 'Anonymous') {
					thisprinter.printStoredFormatWithArray(formatpath, arrayvalue, function(callbackValue) {callresult = callbackValue;});
				}	
			});

			waitsFor(function() {
				return callresult !== null;
			}, 'wait to Print', 30000);
			
			runs(function() {
				if(lang != 'invalid')	{
					displayResult(jasmine.getEnv().currentSpec.description, callresult.toString());
				}	
				else {	
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
        var zplstoredformat = '^XA^DFFORMAT^FS^LH30,30^FO20,10^AF^FN1^FS^FO20,60^B3,,40,,^FN2^FS^FO20,120^AF^FN3^FS^FO20,180^AF^FN4^FS^FO20,240^AF^FN5^FS^FO20,300^AF^FN6^FS^XZ';
        var ccplstoredformat = "! DF FORMAT.FMT\n" +
                  "! 0 200 200 310 1\n" +
                  "CENTER\n" +
                  "TEXT 4 1 0 50 RECEIPT\n" +
                  "TEXT 4 0 0 150 \\\\\n" +
                  "TEXT 4 0 0 200 \\\\\n" +
                  "TEXT 4 0 0 250 \\\\\n" +
                  "FORM\n" +
                  "PRINT\n";
		doprintStoredFormatWithArray(zplstoredformat, 'E:FORMAT.ZPL', arrayzpl, 'with', "ZPL Language");
        doprintStoredFormatWithArray(zplstoredformat, 'E:FORMAT.ZPL', arrayzpl, 'without', "ZPL Language");
        doprintStoredFormatWithArray(zplstoredformat, 'E:FORMAT.ZPL', arrayzpl, 'Anonymous', "ZPL Language");
        
        doprintStoredFormatWithArray(ccplstoredformat, 'E:FORMAT.FMT', arrayccpl,'with', "CCPL Language");
        doprintStoredFormatWithArray(ccplstoredformat, 'E:FORMAT.FMT', arrayccpl, 'without', "CCPL Language");
        doprintStoredFormatWithArray(ccplstoredformat, 'E:FORMAT.FMT', arrayccpl, 'Anonymous', "CCPL Language");
        
        doprintStoredFormatWithArray(invalidformatpath, 'E:FORMAT.ZPL', invalidzplhash, 'with', "invalid");
		
	});
	

    describe('getAllProperties method', function() {
        it('should connect', function() {
            doConnect();
        });

        it( "Should get All printer zebra properties using getAllProperties", function() {
            dispTestCaseRunning("1. Should Display All printer zebra properties");
            dispExpectedResult(jasmine.getEnv().currentSpec.description, callresult.toString());
            //Common Method implemented to wait for tester to run the test.Code available in specHelper.js
            _result.waitToRunTest();
            var allproperties = {};
            runs(function() {
                allproperties = thisprinter.getAllProperties();
            });

            runs(function() {
                displayResult(jasmine.getEnv().currentSpec.description, JSON.stringify(allproperties));
            });
            _result.waitForResponse();
        });
       
    });

    describe("Should print a raw string using the get default printer", function() {
        it("Should print a raw string using the get default printer", function() {
            var thisprinter = null;
            var printerObj = null;
            dispTestCaseRunning("Set default printer and print a raw string using the get default");
            dispExpectedResult(jasmine.getEnv().currentSpec.description, callresult.toString());

            _result.waitToRunTest();

            
            runs(function() {
                expect(last_found_printer_id).toNotEqual(null);
                printerObj = Rho.PrinterZebra.getPrinterByID(last_found_printer_id);
                Rho.PrinterZebra.setDefault(printerObj);
                expect(Rho.PrinterZebra.getDefault()).toEqual(printerObj);
            });
        
            runs(function() {
                thisprinter = Rho.PrinterZebra.getDefault();
                thisprinter.connect(cbk);
            });

            waitsFor(function() {
                return callresult !== null;
            }, 'wait until connected', 10000);

            runs(function() {
                thisprinter.printRawString(CommandCCPL, {});
            });
            
            _result.waitForResponse();
        });
    });


   	 describe ("Should get PRINTER_STATUS_ERR_TIMEOUT when trying to connect the turned off printer", function() {

        it ("Should get PRINTER_STATUS_ERR_TIMEOUT when using connect printer to a turned off printer", function() {
            var thisprinter = null;
            var callresult = null;
            dispTestCaseRunning("Turn off the Printer and then click on Run Test");
            dispExpectedResult("Should get PRINTER_STATUS_ERR_TIMEOUT when using connect printer to a turned off printer");
            _result.waitToRunTest();

            

             runs(function() {
                expect(last_found_printer_id).toNotEqual(null);
                thisprinter = Rho.PrinterZebra.getPrinterByID(last_found_printer_id);
                callresult = null;
                thisprinter.connect(cbk);
            });

            waitsFor(function() {
                return callresult != null;
            }, 'wait while disconnected', 5000);

            runs(function() {
                displayResult(jasmine.getEnv().currentSpec.description, callresult.toString());
            });

            _result.waitForResponse();
        });

        it ("Should get PRINTER_STATUS_ERR_TIMEOUT when using connectWithOptions printer to a turned off printer", function() {
            var thisprinter = null;
            var callresult = null;
            dispExpectedResult("Should get PRINTER_STATUS_ERR_TIMEOUT when using connectWithOptions printer to a turned off printer");
            dispTestCaseRunning("Turn off the Printer and then click on Run Test");
            _result.waitToRunTest();

           

             runs(function() {
                expect(last_found_printer_id).toNotEqual(null);
                thisprinter = Rho.PrinterZebra.getPrinterByID(last_found_printer_id);
                callresult = null;
                thisprinter.connectWithOptions({
                    "timeout": 0
                });
            });

            waitsFor(function() {
                return callresult != null;
            }, 'wait while disconnected', 5000);

            runs(function() {
                displayResult(jasmine.getEnv().currentSpec.description, callresult.toString());
            });

            _result.waitForResponse();
        });
    })
		

});




