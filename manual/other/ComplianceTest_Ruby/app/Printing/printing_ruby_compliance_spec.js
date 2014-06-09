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
    var connect_type = Rho.Printer.CONNECTION_TYPE_TCP;
    var stopsearch = '';
    var deviceaddressFlag = false;
    var CommandZPL = '^XA^FO50,50^ADN,36,20^FDPrinting Generic ZPL^FS^XZ';
    var CommandCCPL = '"! 0 200 200 210 1\r\nTEXT 4 0 30 40 Printing Generic CCPL\r\nFORM\r\nPRINT\r\n';
    var connect_status = '';
    var existingPritingObject = null;
    var last_found_printer = null;
    var last_found_printer_id = null;
    var timeout = null;

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

    var sizes = ['320px', '640px'];
    
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
    var jpgimagepath_640px = makeFilePath('jpgimagepath_640px.jpg');


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
        captured = false;
        timeout = false;
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
            last_found_printer = Rho.Printer.getPrinterByID(last_found_printer_id);
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
    	dispTestCaseRunning("Connecting... to printer");
        dispExpectedResult("Should connect to the printer");
		
        runs(function() {
            expect(last_found_printer_id).toNotEqual(null);
            
            Ruby.call('Printing','rho_connect?pid='+last_found_printer_id);
            
            setTimeout(function() {
                timeout = true;
            }, 5000);
            
        });

        waitsFor(function(){
            if(timeout == true){
                return true;
            }
        }, 'Wait for 10msec ajax call to happen', 10000);

        runs(function() {
            displayResult("Output: ", Ruby.getReturnedValue()+"<br/>");
            expect(Ruby.getReturnedValue()).toEqual('PRINTER_STATUS_SUCCESS');
        });
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
        var testResult = '';
        runs(function() {
            expect(last_found_printer_id).toNotEqual(null);
            
            Ruby.call('Printing','rho_printFile?pid='+last_found_printer_id+'&file='+filename);
            
            setTimeout(function() {
                testResult = Ruby.getReturnedValue();
            }, 5000);
            
        });

        waitsFor(function(){
            return testResult !== '';
        }, 'Wait for 10msec ajax call to happen', 10000);

        runs(function() {
            displayResult("Output: ", testResult +"<br/>");
            //expect(testResult).toEqual('PRINTER_STATUS_SUCCESS');
        });

        _result.waitForResponse();
    }

    function doPrintRawCommandCbk(cmd){
        var testResult = '';
		runs(function() {
            expect(last_found_printer_id).toNotEqual(null);
            
            Ruby.call('Printing','rho_printRawString?pid=' + last_found_printer_id + '&rawstr='+ cmd );
            
            setTimeout(function() {
                testResult = Ruby.getReturnedValue();
            }, 5000);
            
        });

        waitsFor(function(){
            return testResult !== '';
        }, 'Wait for 10msec ajax call to happen', 10000);

        runs(function() {
            displayResult("Output: ", testResult +"<br/>");
            //expect(testResult).toEqual('PRINTER_STATUS_SUCCESS');
        });

        _result.waitForResponse();
    }

    
    // Printing Generic printFile method
    describe('printFile method', function() {
        it('should connect', function() {
			doConnect();
        });

        it('Search printer method with callback', function() {
            dispTestCaseRunning("search printer method ");
            dispExpectedResult("should search and display printer id");
            _result.waitToRunTest();
            runs(function() {
               
                Ruby.call('Printing','rho_searchPrinters');
                
                setTimeout(function() {
                    timeout = true;
                }, 20000);
                
            });

            waitsFor(function(){
                if(timeout == true){
                    return true;
                }
            }, 'Wait for 10msec ajax call to happen', 30000);

            runs(function() {
                displayResult("Output: ", Ruby.getReturnedValue()+"<br/>");
            });
            _result.waitForResponse();
        });

        // png
        it('should print png with callback', function() {
            dispTestCaseRunning(" 1. Should print PNG image ");
            dispExpectedResult("should print png image and return PRINT_STATUS_SUCCESS after printing");
            //Common Method implemented to wait for tester to run the test.Code available in specHelper.js
            _result.waitToRunTest();
            // doPrintTestLabel();
            // doSetLabelLength(500);
            doPrintPrintFileCbk(pngimagepath_320px, {});
        });

        //jpg
        it('should print jpeg with callback', function() {
            dispTestCaseRunning(" 1. Should print jpeg image. ");
            dispExpectedResult("should print jpeg image and return PRINT_STATUS_SUCCESS after printing");
            //Common Method implemented to wait for tester to run the test.Code available in specHelper.js
            _result.waitToRunTest();
            // doPrintTestLabel();
            // doSetLabelLength(500);
            doPrintPrintFileCbk(jpgimagepath_320px, {});
        });

    });


    // printRawString method tests
    describe('printRawString method', function() {

        it('should print ZPL Command with callback', function() {
            dispTestCaseRunning(" should print ZPL Command ");
            dispExpectedResult("should print ZPL Command and return PRINT_STATUS_SUCCESS after printing");
            //Common Method implemented to wait for tester to run the test.Code available in specHelper.js
            _result.waitToRunTest();
            //doPrintTestLabel();
            doPrintRawCommandCbk('zpl');
        });

        it('should print CPCL Command with callback', function() {
            dispTestCaseRunning("should print CPCL Command ");
            dispExpectedResult("should print CPCL Command and return PRINT_STATUS_SUCCESS after printing");
            //Common Method implemented to wait for tester to run the test.Code available in specHelper.js
            _result.waitToRunTest();
            //doPrintTestLabel();
            doPrintRawCommandCbk('ccpl');
        });

    });


    // printImageFromFile method tests
    describe('printImageFromFile method', function() {

        xit('should connect', function() {
            doConnect();
        });

        it('Print png image from file tests', function() {
            dispTestCaseRunning("Print png image from file tests");
            dispExpectedResult("should print png image with x:50 y:50 of width:100 height:100");

            _result.waitToRunTest();

            var testResult = '';
            runs(function() {
                expect(last_found_printer_id).toNotEqual(null);
                
                Ruby.call('Printing','rho_printFileImage?pid='+last_found_printer_id+'&file='+pngimagepath_320px);
                
                setTimeout(function() {
                    testResult = Ruby.getReturnedValue();
                }, 5000);
                
            });

            waitsFor(function(){
                return testResult !== '';
            }, 'Wait for 10msec ajax call to happen', 10000);

            runs(function() {
                displayResult("Output: ", testResult +"<br/>");
                //expect(testResult).toEqual('PRINTER_STATUS_SUCCESS');
            });

            _result.waitForResponse();
        });

        it('Print jpg image from file tests', function() {
            dispTestCaseRunning("Print jpg image from file tests");
            dispExpectedResult("should print jpg image with x:50 y:50 of width:100 height:100");

            _result.waitToRunTest();

            var testResult = '';
            runs(function() {
                expect(last_found_printer_id).toNotEqual(null);
                
                Ruby.call('Printing','rho_printFileImage?pid='+last_found_printer_id+'&file='+jpgimagepath_640px);
                
                setTimeout(function() {
                    testResult = Ruby.getReturnedValue();
                }, 5000);
                
            });

            waitsFor(function(){
                return testResult !== '';
            }, 'Wait for 10msec ajax call to happen', 10000);

            runs(function() {
                displayResult("Output: ", testResult +"<br/>");
                //expect(testResult).toEqual('PRINTER_STATUS_SUCCESS');
            });

            _result.waitForResponse();
        });

    });


    describe('connect and disconnect methods', function() {

        it('disconnect and try to print should return status error', function() {
            dispTestCaseRunning("1. Run test will try to print the Rawstring after disconnect");
            dispExpectedResult("Should return status error when try to print Rawstring after disconnect");
            //Common Method implemented to wait for tester to run the test.Code available in specHelper.js
            _result.waitToRunTest();

            var testResult = '';
            runs(function() {
               Ruby.call('Printing','rho_disconnect?pid='+last_found_printer_id);
                
                setTimeout(function() {
                    testResult = Ruby.getReturnedValue();
                }, 5000);

            });

            waitsFor(function(){
                return testResult !== '';
            }, 'Wait for 10msec ajax call to happen', 10000);

            doPrintRawCommandCbk('zpl');

            _result.waitForResponse();
            
        });

    });   
    
	
});