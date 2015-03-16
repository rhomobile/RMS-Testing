describe('Printing Generic', function() {
    var ENABLE9K = 9000;
    var ENABLE10K = 10000;
    var ENABLE60K = 60000;
    var ENABLE120K = 120000;
    var ENABLE5MIN = 300000;
    var ENABLE30MIN = 1800000;
    var enableFlag = false;
    var callbackstatus = false;
    var printers_array = [];
    var printers_errors = [];
    var discovery_finished = false;
    var connect_type = EB.Printer.CONNECTION_TYPE_TCP;
    var stopsearch = '';
    var deviceaddressFlag = false;
    var CommandZPL = '^XA^FO50,50^ADN,36,20^FDPrinting Generic ZPL^FS^XZ';
    var CommandCCPL = '"! 0 200 200 210 1\r\nTEXT 4 0 30 40 Printing Generic CCPL\r\nFORM\r\nPRINT\r\n';
    var connect_status = '';
    var existingPritingObject = null;
    var last_found_printer = null;
    var last_found_printer_id = null;

    // DO NOT COPYPASTE IT!
    function makeFilePath(filename) {
        return EB.RhoFile.join(EB.Application.modelFolderPath('Printing'), EB.RhoFile.join('PrinterFiles', filename));
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
        sizes = ['320px', '640px', '1024px'];
    } else {
        sizes = ['320px', '640px', '1024px'];
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
        if (callbackValue.status == EB.Printer.PRINTER_STATUS_SUCCESS && callbackValue.printerID && callbackValue.printerID.length > 0) {
            printers_array.push(callbackValue.printerID);
        } else if (callbackValue.status == EB.Printer.PRINTER_STATUS_SUCCESS) {
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
		dispTestCaseRunning("initialize before tests, searching for printers..");
		dispExpectedResult("Please Wait until devices are discovered to continue");
		//_result.waitToRunTest();
        runs(function() {
            //dispTestCaseRunning(jasmine.getEnv().currentSpec.description);
            //dispExpectedResult('Wait until devices are discovered to continue');
            //dispExpectedResult('Press any button to continute');
            $('#dev_list').empty();
            $('#dev_list').prepend('<option value=\'\'>none</option>').val('');
            $('#dev_list').change(function() {
                var valueSelected = $(this).val();
                if (valueSelected == '') {
                    $('#dev_addr').val('127.0.0.1');
                    $('#dev_port').val('6101');
                    $('#dev_conn_type').val(EB.Printer.CONNECTION_TYPE_TCP);
                } else {
                    var res = valueSelected.split('|');
                    $('#dev_conn_type').val(res[0]);
                    $('#dev_addr').val(res[1]);
                    $('#dev_port').val(res[2]);
                }
            });
        });

        runs(function() {
            EB.Printer.searchPrinters({}, searchPrinterCallback);
        });

        waitsFor(function() {
            return discovery_finished;
        }, '60sec waiting for Search printer', ENABLE60K);

        runs(function() {
            for (var i = 0; i < printers_array.length; i++) {
                var printerInstance = EB.Printer.getPrinterByID(printers_array[i]);
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
            //expect(printers_errors).toEqual([]);
           // expect(printers_array.length).toBeGreaterThan(0);
        });
		//_result.waitForResponse();
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
    	dispTestCaseRunning("Connecting... to printer");
        dispExpectedResult("Should connect to the printer");
		
        runs(function() {
            expect(last_found_printer_id).toNotEqual(null);
            thisprinter = EB.Printer.getPrinterByID(last_found_printer_id);
            callresult = null;
            thisprinter.connect(cbk);
        });

        waitsFor(function() {
            return callresult !== null;
        }, 'wait until connected', 10000);

        runs(function() {
            expect(callresult).toEqual(EB.Printer.PRINTER_STATUS_SUCCESS);
            expect(thisprinter.isConnected).toEqual(true);
            callresult = null;
        });

		//_result.waitForResponse();
    }

    function doPrintTestLabel() {
		var callresult = null;
		function cbk(val) {
			callresult = val;
		}
        runs(function() {
            thisprinter.printRawString(makeTestLabel(), {}, cbk);
        });

        waitsFor(function() {
            return callresult !== null;
        }, 'wait until printingLabel', 20000);

        runs(function() {
            displayResult(jasmine.getEnv().currentSpec.description, callresult.toString());
            callresult = null;
        });
					
    }

    function doSetLabelLength(len) {
		var callresult = null;
		function cbk(val) {
			callresult = val;
		}
        runs(function() {
            thisprinter.printRawString('^XA^MNN^LL' + len + '^XA^JUS^XZ', {}, cbk);
        });

        waitsFor(function() {
            return callresult !== null;
        }, 'wait until setting lable length', 7000);
    }

    function doPrintPrintFileCbk(filename, options) {
		var callresult = null;
		function cbk(val) {
			callresult = val;
		}
        runs(function() {
            thisprinter.printFile(filename, options, cbk);
        });

        waitsFor(function() {
            return callresult !== null;
        }, 'wait until printingFile', 15000);
		
		runs(function() {
			displayResult(jasmine.getEnv().currentSpec.description, callresult.toString());
        });

        _result.waitForResponse();
    }

    function doPrintRawCommandCbk(cmd) {
		var callresult = null;
		function cbk(val) {
			callresult = val;
		}
        runs(function() {
            thisprinter.printRawString(cmd, {}, cbk);
        });

        waitsFor(function() {
            return callresult !== null;
        }, 'wait until setting lable length', 15000);
		runs(function() {
			displayResult(jasmine.getEnv().currentSpec.description, callresult.toString());
        });
    }

    
    // Printing Generic printFile method
    describe('printFile method', function() {
        it('should connect', function() {
			doConnect();
        });

        // png
        it('should print png with callback', function() {
            dispTestCaseRunning(" 1. Should Print label <br />2. Should print PNG image ");
            dispExpectedResult("should print png image and return PRINT_STATUS_SUCCESS after printing");
            //Common Method implemented to wait for tester to run the test.Code available in specHelper.js
            _result.waitToRunTest();
            doPrintTestLabel();
            doSetLabelLength(500);
            doPrintPrintFileCbk(pngimagepath_320px, {});
        });

        //jpg
       
        it('should print jpeg with callback', function() {
            dispTestCaseRunning(" 1. Should Print label <br />2. Should print jpeg image. ");
            dispExpectedResult("should print jpeg image and return PRINT_STATUS_SUCCESS after printing");
            //Common Method implemented to wait for tester to run the test.Code available in specHelper.js
            _result.waitToRunTest();
            doPrintTestLabel();
            doSetLabelLength(500);
            doPrintPrintFileCbk(jpgimagepath_320px, {});
        });

        it('should print bmp with callback only in WM/CE devices', function() {
            dispTestCaseRunning(" 1. Should Print label <br />2. Should print bmp image.");
            dispExpectedResult("should print bmp image file  in WM/CE devices and not in android or ios device");
            //Common Method implemented to wait for tester to run the test.Code available in specHelper.js
            _result.waitToRunTest();
            doPrintTestLabel();
            doSetLabelLength(500);
            doPrintPrintFileCbk(bmpimagepath_320px, {});
        });

        it('should not print pdf with callback', function() {
            dispTestCaseRunning(" 1. Should Print label <br />2. Should not print PDF file.");
            dispExpectedResult("should not print pdf file as its not supported. should return PRINT_STATUS_ERROR");
            //Common Method implemented to wait for tester to run the test.Code available in specHelper.js
            _result.waitToRunTest();
            doPrintTestLabel();
            doSetLabelLength(500);
            doPrintPrintFileCbk(pdffilepath, {});
        });
    });


    // printRawString method tests
    describe('printRawString method', function() {
        it('should connect', function() {
            doConnect();
        });

        it('should print ZPL Command with callback', function() {
            dispTestCaseRunning(" 1. Should Print label <br />2. should print ZPL Command ");
            dispExpectedResult("should print ZPL Command and return PRINT_STATUS_SUCCESS after printing");
            //Common Method implemented to wait for tester to run the test.Code available in specHelper.js
            _result.waitToRunTest();
            doPrintTestLabel();
            doPrintRawCommandCbk(CommandZPL);
            _result.waitForResponse();
        });

        it('should print CPCL Command with callback', function() {
            dispTestCaseRunning(" 1. Should Print label <br />2. should print CPCL Command ");
            dispExpectedResult("should print CPCL Command and return PRINT_STATUS_SUCCESS after printing");
            //Common Method implemented to wait for tester to run the test.Code available in specHelper.js
            _result.waitToRunTest();
            doPrintTestLabel();
            doPrintRawCommandCbk(CommandCCPL);
            _result.waitForResponse();
        });

    });


    function generatePrintImage(from,x,y,options,isOk,force) {
        if ((!EB.RhoFile.exists(from))) {
            if (!isOk && !force) {
                return;
            }
            isOk = false;
        }
        var def = isOk ? 'should ' : 'should not ';
        var deftext = [def,'print image',EB.RhoFile.basename(from),'x:',x,'y:',y,'options:',JSON.stringify(options,null," ") ];

        it( deftext.join(' ') , function() {
			dispTestCaseRunning("Print image from file tests");
			dispExpectedResult(deftext.toString());
			//Common Method implemented to wait for tester to run the test.Code available in specHelper.js
			_result.waitToRunTest();
            doPrintTestLabel();

			var callresult = null;
			function cbk(val) {
				callresult = val;
			}
		
            runs(function() {
                thisprinter.printImageFromFile(from,x,y,options,cbk);
            });

            waitsFor(function() {
                return callresult !== null;
            }, 'wait printImageFromFile', 15000);

			runs(function() {
				displayResult(jasmine.getEnv().currentSpec.description, callresult.toString());
			});
			_result.waitForResponse();
        });
    }


    // printImageFromFile method tests
    describe('printImageFromFile method', function() {
        it('should connect', function() {
            doConnect();
        });

        generatePrintImage(pngimagepath_320px,100,100,{'width':0,'height':0},false);

        var sizes = [100,-1];
        var formats = [png_s,jpg_s];
        var offsets = [[10,10],[100,-100]];
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

    function generatePrintImageWithoutAnonymous(callback_type, from, x, y, options, isOk, force) {
         if ((!EB.RhoFile.exists(from))) {
            if (!isOk && !force) {
                return;
            }
            isOk = false;
         }
        var def = isOk ? 'should ' : 'should not ';
        var deftext = [def, 'print image', callback_type, 'callback', EB.RhoFile.basename(from), 'x:',x,'y:',y,'options:', JSON.stringify(options,null," ") ];

        it( deftext.join(' ') , function() {
            dispTestCaseRunning("1. Should Print label <br />2. " +def+ " Print " + EB.RhoFile.basename(from) + " image");
            dispExpectedResult(jasmine.getEnv().currentSpec.description);
            //Common Method implemented to wait for tester to run the test.Code available in specHelper.js
            _result.waitToRunTest();
            doPrintTestLabel();

            runs(function() {
                callresult = null;
                if(callback_type == 'without')  {
					thisprinter.printImageFromFile(from,x,y,options);
                }
                else if (callback_type == 'Anonymous') {
                    thisprinter.printImageFromFile(from,x,y,options,function(callbackValue) { callresult = callbackValue;})
                }
            });

            waitsFor(function() {
                if(callback_type == 'without') {
                    setTimeout(function(){callresult = true;},10000);
                    return callresult;
                }
                else {
                    return callresult !== null;
                }
            }, 'wait printImageFromFile', 30000);

    
            runs(function() {
                displayResult(jasmine.getEnv().currentSpec.description, callresult.toString());
            });
            _result.waitForResponse();
        });
    }

    describe('printImageFromFile method more test cases', function() {
        it('should connect', function() {
            doConnect();
        });

        generatePrintImageWithoutAnonymous('without', pngimagepath_320px,100,100,{'width':10,'height':10,'isInsideFormat':false},true);
        generatePrintImageWithoutAnonymous('Anonymous', pngimagepath_640px,10,10,{'width':50,'height':50,'isInsideFormat':false},true);
        generatePrintImageWithoutAnonymous('Anonymous', jpgimagepath_640px,10,10,{'width':50,'height':50,'isInsideFormat':true},false);

    });


    // PRINTER_STATE_IS_COVER_OPENED, PRINTER_STATE_IS_DRAWER_OPENED, PRINTER_STATE_IS_BATTERY_LOW - unsupported by Zebra Printer !!!
    var listofrequeststate = [EB.Printer.PRINTER_STATE_IS_READY_TO_PRINT,   EB.Printer.PRINTER_STATE_IS_PAPER_OUT];
    var requeststate_callbackValue = {};
    
    function requestStateCallback(args) {
        if (args.status == EB.Printer.PRINTER_STATUS_SUCCESS) {
            requeststate_callbackValue = args;
                
        } else if (args.status == EB.Printer.PRINTER_STATUS_ERROR) {
            requeststate_callbackValue = args;
        } 
        callresult = true;
    }
    
    function dorequestState(requestStatearray) {
            
        var deftext = [];
        var dispcase = [];
        var dispexp = [];
        
       
        deftext = ['Set printer to ',requestStatearray,' state'];
        dispcase = ['Set printer to ',requestStatearray,' state'];
        dispexp = ['Should return True if ',requestStatearray,' is set'];
        
        it(deftext.join('') , function() {
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
                if(requeststate_callbackValue.status ==  EB.Printer.PRINTER_STATUS_SUCCESS) {
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
    
    });

    // get and set default printer
    describe("Should print a raw string using the get default printer", function() {
		it("Should print a raw string using the get default printer", function() {
			var thisprinter = null;
			var printerObj = null;

			_result.waitToRunTest();

			dispTestCaseRunning("Set default printer and print a raw string using the get default");
			dispExpectedResult(jasmine.getEnv().currentSpec.description, callresult.toString());

			runs(function() {
				expect(last_found_printer_id).toNotEqual(null);
				printerObj = EB.Printer.getPrinterByID(last_found_printer_id);
				EB.Printer.setDefault(printerObj);
				expect(EB.Printer.getDefault()).toEqual(printerObj);
			});
		
			runs(function() {
				thisprinter = EB.Printer.getDefault();
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

    // display all properties of printer
    describe('getAllProperties method', function() {
        it('should connect', function() {
            doConnect();
        });

        it( "Should get All printer properties using getAllProperties", function() {
            dispTestCaseRunning("1. Should display all printer properties");
            dispExpectedResult(jasmine.getEnv().currentSpec.description);
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

    // display PRINTER_STATUS_ERR_TIMEOUT when turned off the printer
    describe ("Should get PRINTER_STATUS_ERROR when trying to connect the turned off printer", function() {

        it ("Should get PRINTER_STATUS_ERROR when using connect printer to a turned off printer", function() {
            var thisprinter = null;
            var callresult = null;
			function cbk(val) {
                callresult = val;
            }
            dispTestCaseRunning("Turn off the Printer and then click on Run Test");

            _result.waitToRunTest();

            dispExpectedResult("Should get PRINTER_STATUS_ERROR when using connect printer to a turned off printer");

             runs(function() {
                expect(last_found_printer_id).toNotEqual(null);
                thisprinter = EB.Printer.getPrinterByID(last_found_printer_id);
                callresult = null;
                thisprinter.connect(cbk);
            });

            waitsFor(function() {
                return callresult != null;
            }, 'wait while disconnected', 20000);

            runs(function() {
                displayResult(jasmine.getEnv().currentSpec.description, callresult.toString());
            });

            _result.waitForResponse();
        });

        it ("Should get PRINTER_STATUS_ERROR when using connectWithOptions printer to a turned off printer", function() {
            var thisprinter = null;
            var callresult = null;

            dispTestCaseRunning("Turn off the Printer and then click on Run Test");

            _result.waitToRunTest();

            dispExpectedResult("Should get PRINTER_STATUS_ERROR when using connectWithOptions printer to a turned off printer");

             runs(function() {
                expect(last_found_printer_id).toNotEqual(null);
                thisprinter = EB.Printer.getPrinterByID(last_found_printer_id);
                callresult = null;
                thisprinter.connectWithOptions({
                    "timeout": 0
                }, 
				function(val){
                    callresult = val;
                }
				);
            });

            waitsFor(function() {
                return callresult != null;
            }, 'wait while disconnected', 20000);

            runs(function() {
                displayResult(jasmine.getEnv().currentSpec.description, callresult.toString());
            });

            _result.waitForResponse();
        });
    });

	
});