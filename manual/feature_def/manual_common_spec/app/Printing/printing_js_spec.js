describe('Printing Generic', function() {
    var ENABLE9K = 9000;
    var ENABLE10K = 10000;
    var ENABLE60K = 60000;
    var ENABLE120K = 120000;
    var ENABLE5MIN = 300000;
    var ENABLE30MIN = 1800000;
    var enableFlag = false;
    var callbackstatus = false;
    //var enumData = Rho.Printer.enumerateSupportedTypes();
    var printers_array = [];
    var printers_errors = [];
    var discovery_finished = false;
    var connect_type = Rho.Printer.CONNECTION_TYPE_TCP;
    var stopsearch = '';
    var deviceaddressFlag = false;
    var CommandZPL = '^XA^FO50,50^ADN,36,20^FDPrinting^FS^XZ';
    var CommandCCPL = '"! 0 200 200 210 1\r\nTEXT 4 0 30 40 Hello World\r\nFORM\r\nPRINT\r\n';
    var connect_status = '';
    var existingPritingObject = null;
    var last_found_printer = null;
    var last_found_printer_id = null;

    // DO NOT COPYPASTE IT!
    function makeFilePath(filename) {
        return Rho.RhoFile.join(Rho.Application.modelFolderPath('Printing'), Rho.RhoFile.join('PrinterFiles', filename));
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

    if (Rho.System.platform == Rho.System.PLATFORM_WM_CE) {
        sizes = ['320px', '640px', '1024px'];
    } else {
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
        if (callbackValue.status == Rho.Printer.PRINTER_STATUS_SUCCESS && callbackValue.printerID && callbackValue.printerID.length > 0) {
            printers_array.push(callbackValue.printerID);
        } else if (callbackValue.status == Rho.Printer.PRINTER_STATUS_SUCCESS) {
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
                    $('#dev_conn_type').val(Rho.Printer.CONNECTION_TYPE_TCP);
                } else {
                    var res = valueSelected.split('|');
                    $('#dev_conn_type').val(res[0]);
                    $('#dev_addr').val(res[1]);
                    $('#dev_port').val(res[2]);
                }
            });
        });

        runs(function() {
            Rho.Printer.searchPrinters({}, searchPrinterCallback);
        });

        waitsFor(function() {
            return discovery_finished;
        }, '60sec waiting for Search printer', ENABLE60K);

        runs(function() {
            for (var i = 0; i < printers_array.length; i++) {
                var printerInstance = Rho.Printer.getPrinterByID(printers_array[i]);
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
            thisprinter = Rho.Printer.getPrinterByID(last_found_printer_id);
            callresult = null;
            thisprinter.connect(cbk);
        });

        waitsFor(function() {
            return callresult !== null;
        }, 'wait until connected', 10000);

        runs(function() {
            expect(callresult).toEqual(Rho.Printer.PRINTER_STATUS_SUCCESS);
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

    function doPrintPrintFile(filename, options) {
        runs(function() {
            thisprinter.printFile(filename, options);
        });

        waitsFor(function() {
            return;
        }, 'wait until printingFile', 30000);
		
		// runs(function() {
			// displayResult(jasmine.getEnv().currentSpec.description, callresult.toString());
        // });

		_result.waitForResponse();
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
        }, 'wait until printingFile', 30000);
		
		runs(function() {
			displayResult(jasmine.getEnv().currentSpec.description, callresult.toString());
        });

        _result.waitForResponse();
    }

    function doPrintPrintFileAnonCbk(filename, options) {
        runs(function() {
            var callresult = null;
            thisprinter.printFile(filename, options, function(val){ 
                callresult = val; 
            });
        });

        waitsFor(function() {
            return callresult !== null;
        }, 'wait until printingFile', 30000);
		
		runs(function() {
			displayResult(jasmine.getEnv().currentSpec.description, callresult.toString());
        });

        _result.waitForResponse();
    }

    function doPrintRawCommand(cmd) {
        runs(function() {
            callresult = null;
            thisprinter.printRawString(cmd, {});
        });

        waitsFor(function() {
            return;
        }, 'wait until setting lable length', 15000);
		runs(function() {
			displayResult(jasmine.getEnv().currentSpec.description, callresult.toString());
        });
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

    function doPrintRawCommandAnonCbk(cmd) {
        runs(function() {
            var callresult = null;
            thisprinter.printRawString(cmd, {}, function(val){ 
                callresult = val; 
            });
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
        it('should print png without callback', function() {
			dispTestCaseRunning(" 1. Should Print label <br />2. Should print PNG image ");
			dispExpectedResult("should print png image");
			//Common Method implemented to wait for tester to run the test.Code available in specHelper.js
			_result.waitToRunTest();
			doPrintTestLabel();
			doSetLabelLength(500);
			doPrintPrintFile(pngimagepath_320px, {});
        });

        it('should print png with callback', function() {
            dispTestCaseRunning(" 1. Should Print label <br />2. Should print PNG image ");
            dispExpectedResult("should print png image");
            //Common Method implemented to wait for tester to run the test.Code available in specHelper.js
            _result.waitToRunTest();
            doPrintTestLabel();
            doSetLabelLength(500);
            doPrintPrintFileCbk(pngimagepath_320px, {});
        });

        it('should print png with anonymous function', function() {
            dispTestCaseRunning(" 1. Should Print label <br />2. Should print PNG image ");
            dispExpectedResult("should print png image");
            //Common Method implemented to wait for tester to run the test.Code available in specHelper.js
            _result.waitToRunTest();
            doPrintTestLabel();
            doSetLabelLength(500);
            doPrintPrintFileAnonCbk(pngimagepath_320px, {});
        });

        //jpg
        it('should print jpeg without callback', function() {
			dispTestCaseRunning(" 1. Should Print label <br />2. Should print jpeg image. ");
			dispExpectedResult("should print jpeg image");
			//Common Method implemented to wait for tester to run the test.Code available in specHelper.js
			_result.waitToRunTest();
            doPrintTestLabel();
            doSetLabelLength(500);
            doPrintPrintFile(jpgimagepath_320px, {});
        });

        it('should print jpeg with callback', function() {
            dispTestCaseRunning(" 1. Should Print label <br />2. Should print jpeg image. ");
            dispExpectedResult("should print jpeg image");
            //Common Method implemented to wait for tester to run the test.Code available in specHelper.js
            _result.waitToRunTest();
            doPrintTestLabel();
            doSetLabelLength(500);
            doPrintPrintFileCbk(jpgimagepath_320px, {});
        });

        it('should print jpeg with anonymous function', function() {
            dispTestCaseRunning(" 1. Should Print label <br />2. Should print jpeg image. ");
            dispExpectedResult("should print jpeg image file");
            //Common Method implemented to wait for tester to run the test.Code available in specHelper.js
            _result.waitToRunTest();
            doPrintTestLabel();
            doSetLabelLength(500);
            doPrintPrintFileAnonCbk(jpgimagepath_320px, {});
        });

        //bmp
        xit('should print bmp without callback only in WM/CE devices', function() {
			dispTestCaseRunning(" 1. Should Print label <br />2. Should print bmp image.");
			dispExpectedResult("should print bmp image file  in WM/CE devices and not in android or ios device");
			//Common Method implemented to wait for tester to run the test.Code available in specHelper.js
			_result.waitToRunTest();
            doPrintTestLabel();
            doSetLabelLength(500);
            doPrintPrintFile(bmpimagepath_320px, {});
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

        xit('should print bmp with anonymous function only in WM/CE devices', function() {
            dispTestCaseRunning(" 1. Should Print label <br />2. Should print bmp image.");
            dispExpectedResult("should print bmp image file in WM/CE devices and not in android or ios device");
            //Common Method implemented to wait for tester to run the test.Code available in specHelper.js
            _result.waitToRunTest();
            doPrintTestLabel();
            doSetLabelLength(500);
            doPrintPrintFileAnonCbk(bmpimagepath_320px, {});
        });

        //pdf is unsupported !!!
        /*
        it('should print pdf without callback', function() {
			dispTestCaseRunning(" 1. Should Print label <br />2. Should print PDF file.");
			dispExpectedResult("should print pDF file");
			//Common Method implemented to wait for tester to run the test.Code available in specHelper.js
			_result.waitToRunTest();
            doPrintTestLabel();
            doSetLabelLength(500);
            doPrintPrintFile(pdffilepath, {});
        });

        it('should print pdf with callback', function() {
            dispTestCaseRunning(" 1. Should Print label <br />2. Should print PDF file.");
            dispExpectedResult("should print pDF file");
            //Common Method implemented to wait for tester to run the test.Code available in specHelper.js
            _result.waitToRunTest();
            doPrintTestLabel();
            doSetLabelLength(500);
            doPrintPrintFileCbk(pdffilepath, {});
        });

        it('should print pdf with anonymous function', function() {
            dispTestCaseRunning(" 1. Should Print label <br />2. Should print PDF file.");
            dispExpectedResult("should print pDF file");
            //Common Method implemented to wait for tester to run the test.Code available in specHelper.js
            _result.waitToRunTest();
            doPrintTestLabel();
            doSetLabelLength(500);
            doPrintPrintFileAnonCbk(pdffilepath, {});
        });
        */

        // empty filename
        it('should not print empty filename with callback', function() {
    		dispTestCaseRunning(" 1. Should Print label <br />2. should not print empty filename.");
    		dispExpectedResult("should not print empty filename with callback");
    		//Common Method implemented to wait for tester to run the test.Code available in specHelper.js
    		_result.waitToRunTest();
            doPrintTestLabel();
            doSetLabelLength(500);
            doPrintPrintFileCbk('', {});
        });

        // invalid filename
        it('should not print invalid filename with callback', function() {
			dispTestCaseRunning(" 1. Should Print label <br />2. should not print invalid filename");
			dispExpectedResult("should not print invalid filename with callback");
			//Common Method implemented to wait for tester to run the test.Code available in specHelper.js
			_result.waitToRunTest();
            doPrintTestLabel();
            doSetLabelLength(500);
            doPrintPrintFileCbk(invalidfilepath, {});
        });
    });


    // printRawString method tests
    describe('printRawString method', function() {
        it('should connect', function() {
            doConnect();
        });

        // for ZPL command
        it('should print ZPL Command without callback', function() {
			dispTestCaseRunning(" 1. Should Print label <br />2. should print ZPL Command ");
			dispExpectedResult("should print ZPL Command without callback");
			//Common Method implemented to wait for tester to run the test.Code available in specHelper.js
			_result.waitToRunTest();
            doPrintTestLabel();
            doPrintRawCommand(CommandZPL);
			_result.waitForResponse();
        });

        it('should print ZPL Command with callback', function() {
            dispTestCaseRunning(" 1. Should Print label <br />2. should print ZPL Command ");
            dispExpectedResult("should print ZPL Command with callback");
            //Common Method implemented to wait for tester to run the test.Code available in specHelper.js
            _result.waitToRunTest();
            doPrintTestLabel();
            doPrintRawCommandCbk(CommandZPL);
            _result.waitForResponse();
        });

        it('should print ZPL Command with anonymous function', function() {
            dispTestCaseRunning(" 1. Should Print label <br />2. should print ZPL Command ");
            dispExpectedResult("should print ZPL Command with anonymous function");
            //Common Method implemented to wait for tester to run the test.Code available in specHelper.js
            _result.waitToRunTest();
            doPrintTestLabel();
            doPrintRawCommandAnonCbk(CommandZPL);
            _result.waitForResponse();
        });

        // for CPCL command
        it('should print CPCL Command without callback', function() {
    		dispTestCaseRunning(" 1. Should Print label <br />2. should print CPCL Command ");
    		dispExpectedResult("should print CPCL Command without callback");
    		//Common Method implemented to wait for tester to run the test.Code available in specHelper.js
    		_result.waitToRunTest();
            doPrintTestLabel();
            doPrintRawCommand(CommandCCPL);
			_result.waitForResponse();
        });

        it('should print CPCL Command with callback', function() {
            dispTestCaseRunning(" 1. Should Print label <br />2. should print CPCL Command ");
            dispExpectedResult("should print CPCL Command with callback");
            //Common Method implemented to wait for tester to run the test.Code available in specHelper.js
            _result.waitToRunTest();
            doPrintTestLabel();
            doPrintRawCommandCbk(CommandCCPL);
            _result.waitForResponse();
        });

        it('should print CPCL Command with anonymous function', function() {
            dispTestCaseRunning(" 1. Should Print label <br />2. should print CPCL Command ");
            dispExpectedResult("should print CPCL Command with anonymous function");
            //Common Method implemented to wait for tester to run the test.Code available in specHelper.js
            _result.waitToRunTest();
            doPrintTestLabel();
            doPrintRawCommandAnonCbk(CommandCCPL);
            _result.waitForResponse();
        });

        // xit('should not printRawString when printer turned off', function() {
        //     dispTestCaseRunning(" turn off connected the printer run the test ");
        //     dispExpectedResult("should return PRINTER_STATUS_ERROR in the output");
        //     _result.waitToRunTest();
        //     doPrintTestLabel();
        //     doPrintRawCommandCbk(CommandZPL);
        //     showOutput(callresult);
        //     _result.waitForResponse();
        // });

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
            }, 'wait printImageFromFile', 30000);

            /*runs(function() {
                if (isOk !== false) {
                    expect(callresult).toEqual(Rho.Printer.PRINTER_STATUS_SUCCESS);
                    callresult = null;
                } else {
                    expect(callresult).toNotEqual(Rho.Printer.PRINTER_STATUS_SUCCESS);
                }
            });*/
			_result.waitForResponse();
        });
    }


    // printImageFromFile method tests
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
            dispExpectedResult(jasmine.getEnv().currentSpec.description, callresult.toString());
            //Common Method implemented to wait for tester to run the test.Code available in specHelper.js
            _result.waitToRunTest();
            doPrintTestLabel();

            runs(function() {
                var callresult = null;
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

    describe('printImageFromFile method more test cases', function() {
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


    // PRINTER_STATE_IS_COVER_OPENED, PRINTER_STATE_IS_DRAWER_OPENED, PRINTER_STATE_IS_BATTERY_LOW - unsupported by Zebra Printer !!!
    var listofrequeststate = [Rho.Printer.PRINTER_STATE_IS_READY_TO_PRINT,   Rho.Printer.PRINTER_STATE_IS_PAPER_OUT];
    var requeststate_callbackValue = {};
    
    function requestStateCallback(args) {
        if (args.status == Rho.Printer.PRINTER_STATUS_SUCCESS) {
            requeststate_callbackValue = args;
                
        } else if (args.status == Rho.Printer.PRINTER_STATUS_ERROR) {
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
                if(requeststate_callbackValue.status ==  Rho.Printer.PRINTER_STATUS_SUCCESS) {
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

    // get and set default printer -- disabled bec its crashing the app as of now
    describe("Should print a raw string using the get default printer", function() {
		it("Should print a raw string using the get default printer", function() {
			var thisprinter = null;
			var printerObj = null;

			_result.waitToRunTest();

			dispTestCaseRunning("Set default printer and print a raw string using the get default");
			dispExpectedResult(jasmine.getEnv().currentSpec.description, callresult.toString());

			runs(function() {
				expect(last_found_printer_id).toNotEqual(null);
				printerObj = Rho.Printer.getPrinterByID(last_found_printer_id);
				Rho.Printer.setDefault(printerObj);
				expect(Rho.Printer.getDefault()).toEqual(printerObj);
			});
		
			runs(function() {
				thisprinter = Rho.Printer.getDefault();
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
            dispTestCaseRunning("1. Should Display All printer properties");
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
                thisprinter = Rho.Printer.getPrinterByID(last_found_printer_id);
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
                thisprinter = Rho.Printer.getPrinterByID(last_found_printer_id);
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