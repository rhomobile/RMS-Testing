function displayTestDescription(aString) {
    $("#description").text(aString);
}

function displayTestInstruction(aString) {
    $("#instruction").text(aString);
}

function displayTestExpectation(aString) {
    $("#expectation").text(aString);
}

function displayTestResults(tresult, pppp, abcd) {
	if (pppp.lenght > 0) {
		var str = tresult + "<br/>";
		str += abcd;
		document.getElementById('actualResult').innerHTML = str;
	} else {
		document.getElementById('actualResult').innerHTML = tresult;
	}
}

var printers  = [];
var discovery_finished = false;
var testResult = '';
var connect_type = '';
var macipaddress = '';
var captured = false;
var errmsg = '';

var audioMediaPath = Rho.RhoFile.join(Rho.Application.modelFolderPath('Printing'), "Printing/Audio");
var videoMediaPath = Rho.RhoFile.join(Rho.Application.modelFolderPath('Printing'), "Printing/Video");


function getkeys(obj) {
    var allkeys = [];

    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            allkeys.push(key);
        }
    }

    return allkeys;
}
/*
function ringtoneCallback(arguments) {
    var ringtones = arguments;
    global_ringtones = arguments;
    var htmlout = '<select name="choose a ringtone" size="1" id="item1">';
    var keys = getkeys(ringtones);
    ringtone_names = keys;
    for (var i = 0; i < keys.length; i++) {
        htmlout += '<option>';
        htmlout += keys[i];
        htmlout += '</option>'
    }
    htmlout += '</select>';
    document.getElementById('ringtones').innerHTML = htmlout;
    callbackCalled = true;
}
*/

function searchPrintersNow() {
	if (!connect_type) {
    	$('#test').css("display", "block");
    	setTimeout(function () {
            $('#test').onchange(function()
            	connect_type = $("#connection_type").val();
            	$('#test').css("display", "none");
            });
        }, 5000);
    }
	Rho.Printer.searchPrinters({"printerType":Printer.PRINTER_TYPE_ANY, "connectionType":connect_type}, searchPrinterCallback);	
}

function enumerateCallback(printer) {
	if (printer.length > 0) {
		alert(printer);
		document.getElementById('actualResult').innerHTML = printer.toString();
	} else {
		document.getElementById('actualResult').innerHTML = "Could not find printer types.";
	}
}

function searchPrinterCallback(printer) {
	testResult = printer.status;
    if (printer.status == Rho.Printer.STATUS_SUCCESS) 
    {
          printers.push(printer);
    } 
    else if (printer.status == Rho.Printer.STATUS_DONE || printer.status ==  Rho.Printer.STATUS_ERR_TIMEOUT)
    {
          discovery_finished = true;
    } else {
    	errmsg = printer.message;// when status = ERROR
    }
}

function stopSearchPrinterCallback(printer) {
	testResult = printer.status;
	if (testResult.toLowerCase().indexOf("STATUS_ERROR") <= 0) {
		testResult = "STATUS_SUCCESS";
	} else {
		testResult = "STATUS_ERROR";
	}
}

function connectCallback(stat_us) {
	displayTestResults(stat_us, printers, "");
}

function disconnectCallback(stat_us) {
	displayTestResults(stat_us, printers, "");
}

/*
 function ringtonePlayed()
 {
 callbackCalled = true;
 }

 function audioFilePlayed()
 {
 callbackCalled = true;
 }

 function videoFilePlayed()
 {
 callbackCalled = true;
 }
 */
describe("Printing", function () {
    beforeEach(function () {
        /* ... Set up your object ... */
    });

    afterEach(function () {
        /* ... Tear it down ... */
    });

    describe("Printing Tests", function () {
        var played = false;
        
        beforeEach(function () {
            callbackCalled = false;
            played = false;
            testResult = '';
            captured = false;
            dispCurrentProcess("");
            //printers  = []
            discovery_finished = false;

        });

        // This test relies on the device having an audio file
        it("VTXXX-0001-enumerateSupportedTypes Method (without callback function)", function () {
            displayTestDescription("VTXXX-0001-enumerateSupportedTypes Method (without callback function)");
            displayTestInstruction("");
            displayTestExpectation("Method should return the result as names/list of printer types that are supported in this build.");

            runs(function () {
                var printerTypes = Rho.Printer.enumerateSupportedTypes();

                document.getElementById('actualResult').innerHTML = printerTypes.toString();
            });

            waitsFor(function () {
                dispCurrentProcess("Can you see the supported Printer Types? ");
                return captured;
            }, 'Waiting for Pass or Fail.', 10000);

            runs(function () {
                expect(testResult).toEqual(true);
            });
        });

        it("VTXXX-0002-enumerateSupportedTypes Method (with callback function)", function () {
            displayTestDescription("VTXXX-0002 | enumerateSupportedTypes Method (with callback function)");
            displayTestInstruction("");
            displayTestExpectation("Method should return the result as names/list of printer types that are supported in this build.");

            runs(function () {
            	Rho.Printer.enumerateSupportedTypes(enumerateCallback);
                
            });

            waitsFor(function () {
                dispCurrentProcess("Can you see the supported Printer Types ? And you see the pop up? ");
                return captured;
            }, 'Waiting for Pass or Fail.', 10000);


            runs(function () {
                expect(testResult).toEqual(true);
            });
        });
        
        it("VTXXX-0003-enumerateSupportedTypes Method (with anonymous function)", function () {
            displayTestDescription("VTXXX-0003 | enumerateSupportedTypes Method (with anonymous function)");
            displayTestInstruction("");
            displayTestExpectation("Method should return the result as names/list of printer types that are supported in this build.");

            runs(function () {
            	Rho.Printer.enumerateSupportedTypes(function(printer){enumerateCallback(printer);});
                
            });

            waitsFor(function () {
                dispCurrentProcess("Can you see the supported Printer Types ? And you see the pop up? ");
                return captured;
            }, 'Waiting for Pass or Fail.', 10000);


            runs(function () {
                expect(testResult).toEqual(true);
            });
        });
        
        it("VTXXX-0004-searchPrinters Method(default options)", function () {
        	printers  = [];
            displayTestDescription("VTXXX-0004 | searchPrinters Method(default options)");
            displayTestInstruction("");
            displayTestExpectation("The printer connected with the device should be discovered successfully and return STATUS_SUCCESS.");

            runs(function () {
            	Rho.Printer.searchPrinters(searchPrinterCallback);
            });
            
            waitsFor(function () {
                return true;
            }, 'Searching for Printers....', 10000);
            
            runs(function () {
            	displayTestResults(testResult, printers, printers[0].toString());
            	/*if (printers.lenght > 0) {
            		var str = testResult;
            		str += printers[0].toString();
            		document.getElementById('actualResult').innerHTML = testResult;
            	} else {
            		document.getElementById('actualResult').innerHTML = "";
            	}*/
            });

            waitsFor(function () {
                dispCurrentProcess("Can you see the status and Printer in the results? ");
                return captured;
            }, 'Waiting for Pass or Fail.', 5000);


            runs(function () {
                expect(testResult).toEqual(true);
            });
        });
        
        it("VTXXX-0005-searchPrinters Method(with options \"printerType\" and \"connectionType\")", function () {
        	printers  = [];
            displayTestDescription("VTXXX-0005 | searchPrinters Method(with options \"printerType\" and \"connectionType\")");
            displayTestInstruction("");
            displayTestExpectation("The printer connected with the device should be discovered successfully and return STATUS_SUCCESS.");
            
            runs(function () {
            	$('#test').css("display", "block");
            	setTimeout(function () {
                    $('#test').onchange(function()
                    	connect_type = $("#connection_type").val();
                    	$('#test').css("display", "none");
                    });
                }, 5000);
            	Rho.Printer.searchPrinters({"printerType":Printer.PRINTER_TYPE_ANY, "connectionType":connect_type}, searchPrinterCallback);
            });
            
            waitsFor(function () {
                return true;
            }, 'Searching for Printers....', 5000);
            
            runs(function () {
            	displayTestResults(testResult, printers, printers[0].toString());
            	/*
            	if (printers.lenght > 0) {
            		var str = testResult + "<br/>";
            		str += printers[0].toString();
            		document.getElementById('actualResult').innerHTML = testResult;
            	} else {
            		document.getElementById('actualResult').innerHTML = "";
            	}
            	*/
            });

            waitsFor(function () {
                dispCurrentProcess("Can you see the status and Printer in the results? ");
                return captured;
            }, 'Waiting for Pass or Fail.', 10000);


            runs(function () {
                expect(testResult).toEqual(true);
            });
        });
        
        it("VTXXX-0006-searchPrinters Method(with options \"printerType\", \"connectionType\", \"timeout\")", function () {
        	printers  = [];
            displayTestDescription("VTXXX-0006 | searchPrinters Method(with options \"printerType\", \"connectionType\", \"timeout\")");
            displayTestInstruction("");
            displayTestExpectation("The printer connected with the device should be discovered successfully and return STATUS_SUCCESS.");
            
            runs(function () {
            	if (!connect_type) {
	            	$('#test').css("display", "block");
	            	setTimeout(function () {
	                    $('#test').onchange(function()
	                    	connect_type = $("#connection_type").val();
	                    	$('#test').css("display", "none");
	                    });
	                }, 5000);
	            }
            	Rho.Printer.searchPrinters({"printerType":Printer.PRINTER_TYPE_ANY, "connectionType":connect_type, "timeout":15000}, searchPrinterCallback);
            });
            
            waitsFor(function () {
                return true;
            }, 'Searching for Printers....', 5000);
            
            runs(function () {
            	displayTestResults(testResult, printers, printers[0].toString());
            });

            waitsFor(function () {
                dispCurrentProcess("Can you see the status and Printer in the results? ");
                return captured;
            }, 'Waiting for Pass or Fail.', 10000);


            runs(function () {
                expect(testResult).toEqual(true);
            });
        });
        
        it("VTXXX-0007-searchPrinters Method(with only option \"timeout\")", function () {
        	printers  = [];
            displayTestDescription("VTXXX-0007 | with only option \"timeout\")");
            displayTestInstruction("");
            displayTestExpectation("The printer connected with the device should be discovered successfully and return STATUS_SUCCESS.");
            
            runs(function () {
            	if (!connect_type) {
	            	$('#test').css("display", "block");
	            	setTimeout(function () {
	                    $('#test').onchange(function()
	                    	connect_type = $("#connection_type").val();
	                    	$('#test').css("display", "none");
	                    });
	                }, 5000);
	            }
            	Rho.Printer.searchPrinters({"timeout":15000}, searchPrinterCallback);
            });
            
            waitsFor(function () {
                return true;
            }, 'Searching for Printers....', 5000);
            
            runs(function () {
            	displayTestResults(testResult, printers, printers[0].toString());
            });

            waitsFor(function () {
                dispCurrentProcess("Can you see the status and Printer in the results? ");
                return captured;
            }, 'Waiting for Pass or Fail.', 10000);


            runs(function () {
                expect(testResult).toEqual(true);
            });
        });
        
        it("VTXXX-0008-searchPrinters Method(with only option \"deviceAddress\")", function () {
        	printers  = [];
            displayTestDescription("VTXXX-0008 | searchPrinters Method(with only option \"deviceAddress\")");
            displayTestInstruction("");
            displayTestExpectation("The printer connected with the device should be discovered successfully and return STATUS_SUCCESS.");
            
            runs(function() {
            	$('#address').css("display", "block");
            });
            
            waitsFor(function () {
                dispCurrentProcess("Please provide MAC/IP address of the printer ");
                return captured;
            }, 'Waiting for Click "Ok".', 100000);
            
            runs(function () {
            	$('#address').css("display", "none");
            	macipaddress = $('#macip').val();
            	Rho.Printer.searchPrinters({"deviceAddress":macipaddress}, searchPrinterCallback);
            });
            
            waitsFor(function () {
                return true;
            }, 'Searching for Printers....', 5000);
            
            runs(function () {
            	displayTestResults(testResult, printers, printers[0].toString());
            });

            waitsFor(function () {
                dispCurrentProcess("Can you see the status and Printer in the results? ");
                return captured;
            }, 'Waiting for Pass or Fail.', 10000);


            runs(function () {
                expect(testResult).toEqual(true);
            });
        });
        
        it("VTXXX-0009-searchPrinters Method(with options \"printerType\", \"connectionType\", \"timeout\", \"deviceAddress\")", function () {
        	printers  = [];
            displayTestDescription("VTXXX-0009 | searchPrinters Method(with options \"printerType\", \"connectionType\", \"timeout\", \"deviceAddress\")");
            displayTestInstruction("");
            displayTestExpectation("The printer connected with the device should be discovered successfully and return STATUS_SUCCESS.");
            
            runs(function() {
            	$('#address').css("display", "block");
            });
            
            waitsFor(function () {
                dispCurrentProcess("Please provide MAC/IP address of the printer or Click 'Ok' if already provided. ");
                return captured;
            }, 'Waiting for Click "Ok".', 100000);
            
            runs(function () {
            	$('#address').css("display", "none");
            	macipaddress = $('#macip').val();
            	if (!connect_type) {
	            	$('#test').css("display", "block");
	            	setTimeout(function () {
	                    $('#test').onchange(function()
	                    	connect_type = $("#connection_type").val();
	                    	$('#test').css("display", "none");
	                    });
	                }, 5000);
	            }
            	Rho.Printer.searchPrinters({"printerType":Printer.PRINTER_TYPE_ANY, "connectionType":connect_type, "timeout":15000, "deviceAddress":macipaddress}, searchPrinterCallback);
            });
            
            waitsFor(function () {
                return true;
            }, 'Searching for Printers....', 5000);
            
            runs(function () {
            	displayTestResults(testResult, printers, printers[0].toString());
            });

            waitsFor(function () {
                dispCurrentProcess("Can you see the status and Printer in the results? ");
                return captured;
            }, 'Waiting for Pass or Fail.', 10000);


            runs(function () {
                expect(testResult).toEqual(true);
            });
        });
        
        it("VTXXX-0010-searchPrinters Method for non-zebra printer(with options \"printerType\" and \"connectionType\")", function () {
        	printers  = [];
            displayTestDescription("VTXXX-0010 | searchPrinters Method for non-zebra printer(with options \"printerType\" and \"connectionType\")");
            displayTestInstruction("");
            displayTestExpectation("The printer should not be discovered with these settings and return error message for STATUS_ERROR.");
                        
            runs(function () {
            	
            	Rho.Printer.searchPrinters({"printerType":Printer.PRINTER_TYPE_ZEBRA, "connectionType":Rho.Printer.CONNECTION_TYPE_TCP}, searchPrinterCallback);
            });
            
            waitsFor(function () {
                return true;
            }, 'Searching for Printers....', 5000);
            
            runs(function () {
            	displayTestResults(testResult, printers, errmsg);
            });

            waitsFor(function () {
                dispCurrentProcess("Can you see the STATUS_ERROR and Error Message in the results? ");
                return captured;
            }, 'Waiting for Pass or Fail.', 10000);


            runs(function () {
                expect(testResult).toEqual(true);
            });
        });
        
        it("VTXXX-0011-searchPrinters Method(with only option \"devicePort\":80)", function () {
        	printers  = [];
            displayTestDescription("VTXXX-0011 | searchPrinters Method(with only option \"devicePort\")");
            displayTestInstruction("");
            displayTestExpectation("The printer should not be discovered with these settings and return error message for STATUS_ERROR.");
                        
            runs(function () {
            	
            	Rho.Printer.searchPrinters({"devicePort":80}, searchPrinterCallback);
            });
            
            waitsFor(function () {
                return true;
            }, 'Searching for Printers....', 5000);
            
            runs(function () {
            	displayTestResults(testResult, printers, errmsg);
            });

            waitsFor(function () {
                dispCurrentProcess("Can you see the STATUS_ERROR and Error Message in the results? ");
                return captured;
            }, 'Waiting for Pass or Fail.', 10000);


            runs(function () {
                expect(testResult).toEqual(true);
            });
        });
        
        it("VTXXX-0012-stopSearch Method (without callback function)", function () {
        	printers  = [];
            displayTestDescription("VTXXX-0012 | stopSearch Method (without callback function)");
            displayTestInstruction("");
            displayTestExpectation("The search should be terminated and printer should not be discovered.");
                        
            runs(function () {
            	// Let the printer be search first then use stop
            	searchPrintersNow();
            	var stopsrch = Rho.Printer.stopSearch();
            });
            
            waitsFor(function () {
                return true;
            }, 'Searching for Printers....', 5000);
            
            runs(function () {
            	displayTestResults(testResult, printers, errmsg);
            });

            waitsFor(function () {
                dispCurrentProcess("Can you see the STATUS_ERROR and Error Message in the results? ");
                return captured;
            }, 'Waiting for Pass or Fail.', 10000);


            runs(function () {
                expect(testResult).toEqual(true);
            });
        });
        
        it("VTXXX-0013-stopSearch Method (with callback function)", function () {
        	printers  = [];
            displayTestDescription("VTXXX-0013 | stopSearch Method (with callback function)");
            displayTestInstruction("");
            displayTestExpectation("The search should be terminated and printer should not be discovered.");
                        
            runs(function () {
            	// Let the printer be search first then use stop
            	searchPrintersNow();
            	var stopsrch = Rho.Printer.stopSearch(stopSearchPrinterCallback);
            });
            
            waitsFor(function () {
                return true;
            }, 'Searching for Printers....', 5000);
            
            runs(function () {
            	displayTestResults(testResult, printers, errmsg);            	
            });

            waitsFor(function () {
                dispCurrentProcess("Can you see the STATUS_ERROR and Error Message in the results? ");
                return captured;
            }, 'Waiting for Pass or Fail.', 10000);


            runs(function () {
                expect(testResult).toEqual(true);
            });
        });
        
        it("VTXXX-0014-stopSearch Method (with anonymous function)", function () {
        	printers  = [];
            displayTestDescription("VTXXX-0014 | stopSearch Method (with anonymous function)");
            displayTestInstruction("");
            displayTestExpectation("The search should be terminated and printer should not be discovered.");
                        
            runs(function () {
            	// Let the printer be search first then use stop
            	searchPrintersNow();
            	var stopsrch = Rho.Printer.stopSearch(function(){stopSearchPrinterCallback();});
            });
            
            waitsFor(function () {
                return true;
            }, 'Searching for Printers....', 5000);
            
            runs(function () {
            	displayTestResults(testResult, printers, errmsg);            	
            });

            waitsFor(function () {
                dispCurrentProcess("Can you see the STATUS_ERROR and Error Message in the results? ");
                return captured;
            }, 'Waiting for Pass or Fail.', 10000);


            runs(function () {
                expect(testResult).toEqual(true);
            });
        });
        
        it("VTXXX-0015-getPrinterByID Method ", function () {
        	printers  = [];
            displayTestDescription("VTXXX-0015 | getPrinterByID Method ");
            displayTestInstruction("");
            displayTestExpectation("The method should return an instance of the connected printer.");
                        
            runs(function () {
            	// Let the printer be search first then use stop
            	searchPrintersNow();
            });
            
            waitsFor(function () {
                return true;
            }, 'Searching for Printers....', 5000);
            
            runs(function () {
            	var printer = Rho.Printer.getPrinterByID(printers[0].printerID);
            	printer.connect();
            	if (printer.isConnected || printer.isReadyToPrint)
				{
					displayTestResults(printer.status, printers, "Printer Instance returned successfully.");
					printer.disconnect();
				}
            	else
            	{
            		displayTestResults(printer.status, printers, printer.message);
				}
            });

            waitsFor(function () {
                dispCurrentProcess("Can you see Success Message in the results? ");
                return captured;
            }, 'Waiting for Pass or Fail.', 10000);


            runs(function () {
                expect(testResult).toEqual(true);
            });
        });
        
        it("VTXXX-0016-getPrinterByID Method without discovering the printer ", function () {
        	printers  = [];
            displayTestDescription("VTXXX-0016 | getPrinterByID Method without discovering the printer ");
            displayTestInstruction("");
            displayTestExpectation("The method should not return any instance of the disconnected printer and STATUS_ERROR should be returned with error message.");
            
            runs(function () {
            	//try {
				//	var printer = Rho.Printer.getPrinterByID(printers[0].printerID))
				//	displayTestResults(printer.status, printers, "Printer Instance returned successfully.");					
				//} catch(err) {
					//displayTestResults("STATUS_ERROR", printers, err.message);
				//}
            });

            waitsFor(function () {
                dispCurrentProcess("Can you see Error Message in the results? ");
                return captured;
            }, 'Waiting for Pass or Fail.', 10000);


            runs(function () {
                expect(testResult).toEqual(true);
            });
        });
        
        it("VTXXX-0017-getPrinterByID Method with device turned off device ", function () {
        	printers  = [];
            displayTestDescription("VTXXX-0017 | getPrinterByID Method with device turned off device ");
            displayTestInstruction("");
            displayTestExpectation("The method should not return any instance of the disconnected printer and STATUS_ERROR should be returned with error message.");

            waitsFor(function () {
                return true;
            }, 'Please Turn Off the Printer....', 10000);
            
            runs(function () {
            	// Let the printer be search first then use stop
            	searchPrintersNow();
            });
            
            waitsFor(function () {
                return true;
            }, 'Searching for Printers....', 5000);
            
            runs(function () {
            	var printer = Rho.Printer.getPrinterByID(printers[0].printerID);
            	printer.connect();
            	if (printer.isConnected || printer.isReadyToPrint)
				{
					displayTestResults(printer.status, printers, "Printer Instance returned successfully.");
					printer.disconnect();
				}
            	else
            	{
            		displayTestResults(printer.status, printers, printer.message);
				}
            });

            waitsFor(function () {
                dispCurrentProcess("Can you see Success Message in the results? ");
                return captured;
            }, 'Waiting for Pass or Fail.', 10000);


            runs(function () {
                expect(testResult).toEqual(true);
            });
        });
        
        it("VTXXX-0018-connect Method (without callback function) ", function () {
        	printers  = [];
            displayTestDescription("VTXXX-0018 | connect Method (without callback function) ");
            displayTestInstruction("");
            displayTestExpectation("The string should be printed successfully on the printer.");

            waitsFor(function () {
                return true;
            }, 'Please Turn On the Printer....', 30000);
            
            runs(function () {
            	// Let the printer be search first then use stop
            	searchPrintersNow();
            });
            
            waitsFor(function () {
                return true;
            }, 'Searching for Printers....', 5000);
            
            runs(function () {
            	var printer = Rho.Printer.getPrinterByID(printers[0].printerID);
            	printer.connect();
            	if (printer.isConnected || printer.isReadyToPrint)
				{
					printer.printRawString("Hello Printing!");
				    printer.disconnect();
				}
            	else
            	{
            		displayTestResults(printer.status, printers, printer.message);
				}
            });

            waitsFor(function () {
                dispCurrentProcess("Did the Printer print the string \"Hello Printing!\"? ");
                return captured;
            }, 'Waiting for Pass or Fail.', 10000);


            runs(function () {
                expect(testResult).toEqual(true);
            });
        });
        
        it("VTXXX-0019-connect Method (with callback function) ", function () {
        	printers  = [];
            displayTestDescription("VTXXX-0019 | connect Method (with callback function) ");
            displayTestInstruction("");
            displayTestExpectation("The callback should return STATUS_OK");

            runs(function () {
            	// Let the printer be search first then use stop
            	searchPrintersNow();
            });
            
            waitsFor(function () {
                return true;
            }, 'Searching for Printers....', 5000);
            
            runs(function () {
            	var printer = Rho.Printer.getPrinterByID(printers[0].printerID);
            	printer.connect(connectCallback);
            	printer.disconnect();
            });

            waitsFor(function () {
                dispCurrentProcess("Did you get status as STATUS_OK? ");
                return captured;
            }, 'Waiting for Pass or Fail.', 10000);


            runs(function () {
                expect(testResult).toEqual(true);
            });
        });
        
        it("VTXXX-0020-connect Method (with anonymous function) ", function () {
        	printers  = [];
            displayTestDescription("VTXXX-0020 | connect Method (with anonymous function) ");
            displayTestInstruction("");
            displayTestExpectation("The callback should return STATUS_OK");

            runs(function () {
            	// Let the printer be search first then use stop
            	searchPrintersNow();
            });
            
            waitsFor(function () {
                return true;
            }, 'Searching for Printers....', 5000);
            
            runs(function () {
            	var printer = Rho.Printer.getPrinterByID(printers[0].printerID);
            	printer.connect(function(){connectCallback();});
            	if (printer.isConnected || printer.isReadyToPrint)
				{
				    printer.disconnect();
				}
            });

            waitsFor(function () {
            	dispCurrentProcess("Did you get status as STATUS_OK? ");
                return captured;
            }, 'Waiting for Pass or Fail.', 10000);


            runs(function () {
                expect(testResult).toEqual(true);
            });
        });
        
        it("VTXXX-0021-connect Method (with param \"timeout\") ", function () {
        	printers  = [];
            displayTestDescription("VTXXX-0021 | connect Method (with param \"timeout\") ");
            displayTestInstruction("");
            displayTestExpectation("The Printer.isConnected should return STATUS_OK");

            runs(function () {
            	// Let the printer be search first then use stop
            	searchPrintersNow();
            });
            
            waitsFor(function () {
                return true;
            }, 'Searching for Printers....', 5000);
            
            runs(function () {
            	var printer = Rho.Printer.getPrinterByID(printers[0].printerID);
            	printer.connect({"timeout":20000}, connectCallback);
            	if (printer.isConnected || printer.isReadyToPrint)
				{
				    printer.disconnect();
				}
            });

            waitsFor(function () {
            	dispCurrentProcess("Did you get status as STATUS_OK? ");
                return captured;
            }, 'Waiting for Pass or Fail.', 10000);


            runs(function () {
                expect(testResult).toEqual(true);
            });
        });
        
        it("VTXXX-0022-connect Method (with param \"timeout\":0) ", function () {
        	printers  = [];
            displayTestDescription("VTXXX-0022 | connect Method (with param \"timeout\":0) ");
            displayTestInstruction("");
            displayTestExpectation("The Printer.isConnected should return STATUS_TIMEOUT");

            runs(function () {
            	// Let the printer be search first then use stop
            	searchPrintersNow();
            });
            
            waitsFor(function () {
                return true;
            }, 'Searching for Printers....', 5000);
            
            runs(function () {
            	var printer = Rho.Printer.getPrinterByID(printers[0].printerID);
            	printer.connect({"timeout":0}, connectCallback);
            	if (printer.isConnected || printer.isReadyToPrint)
				{
				    printer.disconnect();
				}
            });

            waitsFor(function () {
            	dispCurrentProcess("Did you get the status STATUS_TIMEOUT? ");
                return captured;
            }, 'Waiting for Pass or Fail.', 10000);


            runs(function () {
                expect(testResult).toEqual(true);
            });
        });
        
        it("VTXXX-0023-connect Method (with param \"timeout\":1000) ", function () {
        	printers  = [];
            displayTestDescription("VTXXX-0023 | connect Method (with param \"timeout\":1000) ");
            displayTestInstruction("");
            displayTestExpectation("The Printer.isConnected should return STATUS_TIMEOUT");

            runs(function () {
            	// Let the printer be search first then use stop
            	searchPrintersNow();
            });
            
            waitsFor(function () {
                return true;
            }, 'Searching for Printers....', 5000);
            
            runs(function () {
            	var printer = Rho.Printer.getPrinterByID(printers[0].printerID);
            	printer.connect({"timeout":1000}, connectCallback);
            	if (printer.isConnected || printer.isReadyToPrint)
				{
				    printer.disconnect();
				}
            });

            waitsFor(function () {
            	dispCurrentProcess("Did you get the status STATUS_TIMEOUT? ");
                return captured;
            }, 'Waiting for Pass or Fail.', 10000);


            runs(function () {
                expect(testResult).toEqual(true);
            });
        });
        
        it("VTXXX-0024-connect Method (with param \"timeout\":15000.5) ", function () {
        	printers  = [];
            displayTestDescription("VTXXX-0024 | connect Method (with param \"timeout\":15000.5) ");
            displayTestInstruction("");
            displayTestExpectation("The method should return STATUS_ERROR due to the param value passed as float.");

            runs(function () {
            	// Let the printer be search first then use stop
            	searchPrintersNow();
            });
            
            waitsFor(function () {
                return true;
            }, 'Searching for Printers....', 5000);
            
            runs(function () {
            	var printer = Rho.Printer.getPrinterByID(printers[0].printerID);
            	printer.connect({"timeout":15000.5}, connectCallback);
            	if (printer.isConnected || printer.isReadyToPrint)
				{
				    printer.disconnect();
				}
            });

            waitsFor(function () {
            	dispCurrentProcess("Did you get the status STATUS_ERROR or error message? ");
                return captured;
            }, 'Waiting for Pass or Fail.', 10000);


            runs(function () {
                expect(testResult).toEqual(true);
            });
        });
        
        it("VTXXX-0025-connect Method (with param \"timeout\") with device disconnected ", function () {
        	printers  = [];
            displayTestDescription("VTXXX-0025 | connect Method (with param \"timeout\") with device disconnected ");
            displayTestInstruction("");
            displayTestExpectation("The Printer.isConnected should return STATUS_ERROR or STATUS_NOT_FOUND.");
            
            waitsFor(function () {
                return true;
            }, 'Please Turn OFF the Printer....', 10000);

            runs(function () {
            	// Let the printer be search first then use stop
            	searchPrintersNow();
            });
            
            waitsFor(function () {
                return true;
            }, 'Searching for Printers....', 5000);
            
            runs(function () {
            	var printer = Rho.Printer.getPrinterByID(printers[0].printerID);
            	printer.connect({"timeout":20000}, connectCallback);
            	if (printer.isConnected || printer.isReadyToPrint)
				{
				    printer.disconnect();
				}
            });

            waitsFor(function () {
            	dispCurrentProcess("Did you get the status STATUS_ERROR or STATUS_NOT_FOUND? ");
                return captured;
            }, 'Waiting for Pass or Fail.', 10000);


            runs(function () {
                expect(testResult).toEqual(true);
            });
        });
        
        it("VTXXX-0030-disconnect Method (without callback function) ", function () {
        	printers  = [];
            displayTestDescription("VTXXX-0030 | disconnect Method (without callback function) ");
            displayTestInstruction("");
            displayTestExpectation("The method should execute without errors.");
            
            waitsFor(function () {
                return true;
            }, 'Please Turn ON the Printer....', 30000);

            runs(function () {
            	// Let the printer be search first then use stop
            	searchPrintersNow();
            });
            
            waitsFor(function () {
                return true;
            }, 'Searching for Printers....', 5000);
            
            runs(function () {
            	var printer = Rho.Printer.getPrinterByID(printers[0].printerID);
            	printer.connect(connectCallback);
            	if (printer.isConnected || printer.isReadyToPrint)
				{
				    printer.disconnect();
				}
            });

            waitsFor(function () {
            	dispCurrentProcess("Did the method execute without errors? ");
                return captured;
            }, 'Waiting for Pass or Fail.', 10000);


            runs(function () {
                expect(testResult).toEqual(true);
            });
        });
        
        it("VTXXX-0031-disconnect Method (with callback function) ", function () {
        	printers  = [];
            displayTestDescription("VTXXX-0031 | disconnect Method (with callback function) ");
            displayTestInstruction("");
            displayTestExpectation("The method should execute without errors.");
            
            runs(function () {
            	// Let the printer be search first then use stop
            	searchPrintersNow();
            });
            
            waitsFor(function () {
                return true;
            }, 'Searching for Printers....', 5000);
            
            runs(function () {
            	var printer = Rho.Printer.getPrinterByID(printers[0].printerID);
            	printer.connect(connectCallback);
            	if (printer.isConnected || printer.isReadyToPrint)
				{
				    printer.disconnect(disconnectCallback);
				}
            });

            waitsFor(function () {
            	dispCurrentProcess("Did the method execute without errors? ");
                return captured;
            }, 'Waiting for Pass or Fail.', 10000);


            runs(function () {
                expect(testResult).toEqual(true);
            });
        });
        
        it("VTXXX-0032-disconnect Method (with anonymous function) ", function () {
        	printers  = [];
            displayTestDescription("VTXXX-0032 | disconnect Method (with anonymous function) ");
            displayTestInstruction("");
            displayTestExpectation("The method should execute without errors.");
            
            runs(function () {
            	// Let the printer be search first then use stop
            	searchPrintersNow();
            });
            
            waitsFor(function () {
                return true;
            }, 'Searching for Printers....', 5000);
            
            runs(function () {
            	var printer = Rho.Printer.getPrinterByID(printers[0].printerID);
            	printer.connect(connectCallback);
            	if (printer.isConnected || printer.isReadyToPrint)
				{
				    printer.disconnect(function(){disconnectCallback();});
				}
            });

            waitsFor(function () {
            	dispCurrentProcess("Did the method execute without errors? ");
                return captured;
            }, 'Waiting for Pass or Fail.', 10000);


            runs(function () {
                expect(testResult).toEqual(true);
            });
        });
        
        it("VTXXX-0033-disconnect Method (sending string to print)) ", function () {
        	printers  = [];
            displayTestDescription("VTXXX-0033 | disconnect Method (sending string to print) ");
            displayTestInstruction("");
            displayTestExpectation("The string should not be printed on the printer.");
            
            runs(function () {
            	// Let the printer be search first then use stop
            	searchPrintersNow();
            });
            
            waitsFor(function () {
                return true;
            }, 'Searching for Printers....', 5000);
            
            runs(function () {
            	var printer = Rho.Printer.getPrinterByID(printers[0].printerID);
            	printer.connect(connectCallback);
            	if (printer.isConnected || printer.isReadyToPrint)
				{
				    printer.disconnect();
				    var prs_str = printer.printRawString("Hello Printing!");
				    displayTestResults(prs_str, printers, "");
				}
            });

            waitsFor(function () {
            	dispCurrentProcess("Did the printer print the given string? ");
                return captured;
            }, 'Waiting for Pass or Fail.', 10000);


            runs(function () {
                expect(testResult).toEqual(true);
            });
        });
        
        it("VTXXX-0034-disconnect Method (call this before the connect method) ", function () {
        	printers  = [];
            displayTestDescription("VTXXX-0034 | disconnect Method (call this before the connect method) ");
            displayTestInstruction("");
            displayTestExpectation("The method should execute without any error.");
            
            runs(function () {
            	// Let the printer be search first then use stop
            	searchPrintersNow();
            });
            
            waitsFor(function () {
                return true;
            }, 'Searching for Printers....', 5000);
            
            runs(function () {
            	var printer = Rho.Printer.getPrinterByID(printers[0].printerID);
            	printer.disconnect();
            	printer.connect(connectCallback);
            	if (printer.isConnected || printer.isReadyToPrint)
				{
					printer.disconnect(disconnectCallback);
				}
            });

            waitsFor(function () {
            	dispCurrentProcess("Did the method execute without errors? ");
                return captured;
            }, 'Waiting for Pass or Fail.', 10000);


            runs(function () {
                expect(testResult).toEqual(true);
            });
        });
        
        it("VTXXX-0035-disconnect Method with callback (call this before the connect method) ", function () {
        	printers  = [];
            displayTestDescription("VTXXX-0035 | disconnect Method with callback (call this before the connect method) ");
            displayTestInstruction("");
            displayTestExpectation("The method should execute with STATUS_ERROR.");
            
            runs(function () {
            	// Let the printer be search first then use stop
            	searchPrintersNow();
            });
            
            waitsFor(function () {
                return true;
            }, 'Searching for Printers....', 5000);
            
            runs(function () {
            	var printer = Rho.Printer.getPrinterByID(printers[0].printerID);
            	printer.disconnect();
            	printer.connect(connectCallback);
            	if (printer.isConnected || printer.isReadyToPrint)
				{
					printer.disconnect(disconnectCallback);
				}
            });

            waitsFor(function () {
            	dispCurrentProcess("Did you get the status STATUS_ERROR ? ");
                return captured;
            }, 'Waiting for Pass or Fail.', 10000);


            runs(function () {
                expect(testResult).toEqual(true);
            });
        });
    });
});