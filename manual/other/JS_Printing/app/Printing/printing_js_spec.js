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

//var audioMediaPath = Rho.RhoFile.join(Rho.Application.modelFolderPath('Printing'), "Printing_Files/Audio");
var videoMediaPath = Rho.RhoFile.join(Rho.Application.modelFolderPath('Printing'), "Printing_Files/Video");
var filesMediaPath = Rho.RhoFile.join(Rho.Application.modelFolderPath('Printing'), "Printing_Files/Files");


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
		/* Need to add get property for connection type
    	$('#test').css("display", "block");
    	setTimeout(function () {
            $('#test').onchange(function()
            	connect_type = $("#connection_type").val();
            	$('#test').css("display", "none");
            });
        }, 10000);*/
        connect_type = Rho.Printer.connectionType;
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

function printFileCallback(stat_us) {
	if (stat_us.status) {
		displayTestResults(stat_us.status, printers, "Printing your file... ");
	} else {
		displayTestResults(stat_us, printers, "Printing your file... ");
	}
}

function printRawStringCallback() {
	if (stat_us.status) {
		displayTestResults(stat_us.status, printers, "Printing your file... ");
	} else {
		displayTestResults(stat_us, printers, "Printing your file... ");
	}
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
            	connect_type = Rho.Printer.connectionType;
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
            		connect_type = Rho.Printer.connectionType;
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
            		connect_type = Rho.Printer.connectionType;
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
            		connect_type = Rho.Printer.connectionType;
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
        	//printers  = [];
            displayTestDescription("VTXXX-0019 | connect Method (with callback function) ");
            displayTestInstruction("");
            displayTestExpectation("The callback should return STATUS_OK");
            /*
            runs(function () {
            	// Let the printer be search first then use stop
            	searchPrintersNow();
            });
            
            waitsFor(function () {
                return true;
            }, 'Searching for Printers....', 5000);
            */
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
        	//printers  = [];
            displayTestDescription("VTXXX-0020 | connect Method (with anonymous function) ");
            displayTestInstruction("");
            displayTestExpectation("The callback should return STATUS_OK");
            /*
            runs(function () {
            	// Let the printer be search first then use stop
            	searchPrintersNow();
            });
            
            waitsFor(function () {
                return true;
            }, 'Searching for Printers....', 5000);
            */
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
        	//printers  = [];
            displayTestDescription("VTXXX-0021 | connect Method (with param \"timeout\") ");
            displayTestInstruction("");
            displayTestExpectation("The Printer.isConnected should return STATUS_OK");
            /*
            runs(function () {
            	// Let the printer be search first then use stop
            	searchPrintersNow();
            });
            
            waitsFor(function () {
                return true;
            }, 'Searching for Printers....', 5000);
            */
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
        	//printers  = [];
            displayTestDescription("VTXXX-0022 | connect Method (with param \"timeout\":0) ");
            displayTestInstruction("");
            displayTestExpectation("The Printer.isConnected should return STATUS_TIMEOUT");
            /*
            runs(function () {
            	// Let the printer be search first then use stop
            	searchPrintersNow();
            });
            
            waitsFor(function () {
                return true;
            }, 'Searching for Printers....', 5000);
            */
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
        	//printers  = [];
            displayTestDescription("VTXXX-0023 | connect Method (with param \"timeout\":1000) ");
            displayTestInstruction("");
            displayTestExpectation("The Printer.isConnected should return STATUS_TIMEOUT");
            /*
            runs(function () {
            	// Let the printer be search first then use stop
            	searchPrintersNow();
            });
            
            waitsFor(function () {
                return true;
            }, 'Searching for Printers....', 5000);
            */
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
        	//printers  = [];
            displayTestDescription("VTXXX-0024 | connect Method (with param \"timeout\":15000.5) ");
            displayTestInstruction("");
            displayTestExpectation("The method should return STATUS_ERROR due to the param value passed as float.");
            /*
            runs(function () {
            	// Let the printer be search first then use stop
            	searchPrintersNow();
            });
            
            waitsFor(function () {
                return true;
            }, 'Searching for Printers....', 5000);
            */
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
        	//printers  = [];
            displayTestDescription("VTXXX-0025 | connect Method (with param \"timeout\") with device disconnected ");
            displayTestInstruction("");
            displayTestExpectation("The Printer.isConnected should return STATUS_ERROR or STATUS_NOT_FOUND.");
            
            waitsFor(function () {
                return true;
            }, 'Please Turn OFF the Printer....', 10000);
			/*
            runs(function () {
            	// Let the printer be search first then use stop
            	searchPrintersNow();
            });
            
            waitsFor(function () {
                return true;
            }, 'Searching for Printers....', 5000);
            */
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
        	//printers  = [];
            displayTestDescription("VTXXX-0031 | disconnect Method (with callback function) ");
            displayTestInstruction("");
            displayTestExpectation("The method should execute without errors.");
            
            /*
            runs(function () {
            	// Let the printer be search first then use stop
            	searchPrintersNow();
            });
            
            waitsFor(function () {
                return true;
            }, 'Searching for Printers....', 5000);
            */
            
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
        	//printers  = [];
            displayTestDescription("VTXXX-0032 | disconnect Method (with anonymous function) ");
            displayTestInstruction("");
            displayTestExpectation("The method should execute without errors.");
            
            /*
            runs(function () {
            	// Let the printer be search first then use stop
            	searchPrintersNow();
            });
            
            waitsFor(function () {
                return true;
            }, 'Searching for Printers....', 5000);
            */
            
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
        	//printers  = [];
            displayTestDescription("VTXXX-0033 | disconnect Method (sending string to print) ");
            displayTestInstruction("");
            displayTestExpectation("The string should not be printed on the printer.");
            
            /*
            runs(function () {
            	// Let the printer be search first then use stop
            	searchPrintersNow();
            });
            
            waitsFor(function () {
                return true;
            }, 'Searching for Printers....', 5000);
            */
            
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
        	//printers  = [];
            displayTestDescription("VTXXX-0034 | disconnect Method (call this before the connect method) ");
            displayTestInstruction("");
            displayTestExpectation("The method should execute without any error.");
            
            /*
            runs(function () {
            	// Let the printer be search first then use stop
            	searchPrintersNow();
            });
            
            waitsFor(function () {
                return true;
            }, 'Searching for Printers....', 5000);
            */
            
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
        	//printers  = [];
            displayTestDescription("VTXXX-0035 | disconnect Method with callback (call this before the connect method) ");
            displayTestInstruction("");
            displayTestExpectation("The method should execute with STATUS_ERROR.");
            
            /*
            runs(function () {
            	// Let the printer be search first then use stop
            	searchPrintersNow();
            });
            
            waitsFor(function () {
                return true;
            }, 'Searching for Printers....', 5000);
            */
            
            runs(function () {
            	var printer = Rho.Printer.getPrinterByID(printers[0].printerID);
            	printer.disconnect(disconnectCallback);
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
        
        it("VTXXX-0036-printFile Method (without callback function) ", function () {
        	//printers  = [];
            displayTestDescription("VTXXX-0036 | printFile Method (without callback function) ");
            displayTestInstruction("");
            displayTestExpectation("The file should be sent successfully to the printer.");
            
            /*
            runs(function () {
            	// Let the printer be search first then use stop
            	searchPrintersNow();
            });
            
            waitsFor(function () {
                return true;
            }, 'Searching for Printers....', 5000);
            */
            
            runs(function () {
            	var printer = Rho.Printer.getPrinterByID(printers[0].printerID);
            	printer.connect();
            	if (printer.isConnected || printer.isReadyToPrint)
				{
					var fileURI = Rho.RhoFile.join(filesMediaPath, "flower.jpg");
					var print_str = Rho.Printer.printFile(fileURI);
					waitsFor(function() {
                        return print_str;
                    }, '10sec wait for print', 10000);
					displayTestResults(print_str, printers, "Printed ");
					printer.disconnect();
				}
            	else
            	{
                    displayTestResults(printer.isConnected, printers, "Unable to Connect ");
                }
            });

            waitsFor(function () {
            	dispCurrentProcess("Is the 'flower.jpg' file sent successfully to the printer ? ");
                return captured;
            }, 'Waiting for Pass or Fail.', 10000);


            runs(function () {
                expect(testResult).toEqual(true);
            });
        });
        
        it("VTXXX-0037-printFile Method (with callback function) ", function () {
        	//printers  = [];
            displayTestDescription("VTXXX-0037 | printFile Method (with callback function) ");
            displayTestInstruction("");
            displayTestExpectation("The file should be sent successfully to the printer.");
            
            /*
            runs(function () {
            	// Let the printer be search first then use stop
            	searchPrintersNow();
            });
            
            waitsFor(function () {
                return true;
            }, 'Searching for Printers....', 5000);
            */
            
            runs(function () {
            	var printer = Rho.Printer.getPrinterByID(printers[0].printerID);
            	printer.connect();
            	if (printer.isConnected || printer.isReadyToPrint)
				{
					var fileURI = Rho.RhoFile.join(filesMediaPath, "simple_sun.jpg");
					var print_str = Rho.Printer.printFile(fileURI, printFileCallback);
					waitsFor(function() {
                        return print_str;
                    }, '10sec wait for print', 10000);
					displayTestResults(print_str, printers, "Printed ");
					printer.disconnect();
				}
            	else
            	{
                    displayTestResults(printer.isConnected, printers, "Unable to Connect ");
                }
            });

            waitsFor(function () {
            	dispCurrentProcess("Is the 'simple_sun.jpg' file sent successfully to the printer ? ");
                return captured;
            }, 'Waiting for Pass or Fail.', 10000);


            runs(function () {
                expect(testResult).toEqual(true);
            });
        });
        
        it("VTXXX-0038-printFile Method (with anonymous function for jpg file) ", function () {
        	//printers  = [];
            displayTestDescription("VTXXX-0038 | printFile Method (with anonymous function for jpg file) ");
            displayTestInstruction("");
            displayTestExpectation("The file should be sent successfully to the printer.");
            
            /*
            runs(function () {
            	// Let the printer be search first then use stop
            	searchPrintersNow();
            });
            
            waitsFor(function () {
                return true;
            }, 'Searching for Printers....', 5000);
            */
            
            runs(function () {
            	var printer = Rho.Printer.getPrinterByID(printers[0].printerID);
            	printer.connect();
            	if (printer.isConnected || printer.isReadyToPrint)
				{
					var fileURI = Rho.RhoFile.join(filesMediaPath, "motorola_logo.jpg");
					var print_str = Rho.Printer.printFile(fileURI, function(){printFileCallback();});
					waitsFor(function() {
                        return print_str;
                    }, '10sec wait for print', 10000);
					displayTestResults(print_str, printers, "Printed ");
					printer.disconnect();
				}
            	else
            	{
                    displayTestResults(printer.isConnected, printers, "Unable to Connect ");
                }
            });

            waitsFor(function () {
            	dispCurrentProcess("Is the 'motorola_logo.jpg' file sent successfully to the printer ? ");
                return captured;
            }, 'Waiting for Pass or Fail.', 10000);


            runs(function () {
                expect(testResult).toEqual(true);
            });
        });
        
        it("VTXXX-0039-printFile Method (without callback function for png file) ", function () {
        	//printers  = [];
            displayTestDescription("VTXXX-0039 | printFile Method (without callback function for png file) ");
            displayTestInstruction("");
            displayTestExpectation("The file should be sent successfully to the printer.");
            
            /*
            runs(function () {
            	// Let the printer be search first then use stop
            	searchPrintersNow();
            });
            
            waitsFor(function () {
                return true;
            }, 'Searching for Printers....', 5000);
            */
            
            runs(function () {
            	var printer = Rho.Printer.getPrinterByID(printers[0].printerID);
            	printer.connect();
            	if (printer.isConnected || printer.isReadyToPrint)
				{
					var fileURI = Rho.RhoFile.join(filesMediaPath, "basketball.png");
					var print_str = Rho.Printer.printFile(fileURI);
					waitsFor(function() {
                        return print_str;
                    }, '10sec wait for print', 10000);
					displayTestResults(print_str, printers, "Printed ");
					printer.disconnect();
				}
            	else
            	{
                    displayTestResults(printer.isConnected, printers, "Unable to Connect ");
                }
            });

            waitsFor(function () {
            	dispCurrentProcess("Is the 'basketball.png' file sent successfully to the printer ? ");
                return captured;
            }, 'Waiting for Pass or Fail.', 10000);


            runs(function () {
                expect(testResult).toEqual(true);
            });
        });
        
        it("VTXXX-0040-printFile Method (with callback function for png file) ", function () {
        	//printers  = [];
            displayTestDescription("VTXXX-0040 | printFile Method (with callback function for png file) ");
            displayTestInstruction("");
            displayTestExpectation("The file should be sent successfully to the printer.");
            
            /*
            runs(function () {
            	// Let the printer be search first then use stop
            	searchPrintersNow();
            });
            
            waitsFor(function () {
                return true;
            }, 'Searching for Printers....', 5000);
            */
            
            runs(function () {
            	var printer = Rho.Printer.getPrinterByID(printers[0].printerID);
            	printer.connect();
            	if (printer.isConnected || printer.isReadyToPrint)
				{
					var fileURI = Rho.RhoFile.join(filesMediaPath, "swirl.png");
					var print_str = Rho.Printer.printFile(fileURI, printFileCallback);
					waitsFor(function() {
                        return print_str;
                    }, '10sec wait for print', 10000);
					displayTestResults(print_str, printers, "Printed ");
					printer.disconnect();
				}
            	else
            	{
                    displayTestResults(printer.isConnected, printers, "Unable to Connect ");
                }
            });

            waitsFor(function () {
            	dispCurrentProcess("Is the 'swirl.png' file sent successfully to the printer ? ");
                return captured;
            }, 'Waiting for Pass or Fail.', 10000);


            runs(function () {
                expect(testResult).toEqual(true);
            });
        });
        
        it("VTXXX-0041-printFile Method (with anonymous function for png file) ", function () {
        	//printers  = [];
            displayTestDescription("VTXXX-0041 | printFile Method (with anonymous function for png file) ");
            displayTestInstruction("");
            displayTestExpectation("The file should be sent successfully to the printer.");
            
            /*
            runs(function () {
            	// Let the printer be search first then use stop
            	searchPrintersNow();
            });
            
            waitsFor(function () {
                return true;
            }, 'Searching for Printers....', 5000);
            */
            
            runs(function () {
            	var printer = Rho.Printer.getPrinterByID(printers[0].printerID);
            	printer.connect();
            	if (printer.isConnected || printer.isReadyToPrint)
				{
					var fileURI = Rho.RhoFile.join(filesMediaPath, "vine.png");
					var print_str = Rho.Printer.printFile(fileURI, function(){printFileCallback();});
					waitsFor(function() {
                        return print_str;
                    }, '10sec wait for print', 10000);
					displayTestResults(print_str, printers, "Printed ");
					printer.disconnect();
				}
            	else
            	{
                    displayTestResults(printer.isConnected, printers, "Unable to Connect ");
                }
            });

            waitsFor(function () {
            	dispCurrentProcess("Is the 'vine.png' file sent successfully to the printer ? ");
                return captured;
            }, 'Waiting for Pass or Fail.', 10000);


            runs(function () {
                expect(testResult).toEqual(true);
            });
        });
        
        var platform = Rho.System.platform;
        if (platform == "WINDOWS") {
	        it("VTXXX-0042-printFile Method (without callback function for bmp file) ", function () {
	        	//printers  = [];
	            displayTestDescription("VTXXX-0042 | printFile Method (without callback function for bmp file) ");
	            displayTestInstruction("");
	            displayTestExpectation("The file should be sent successfully to the printer.");
	            
	            /*
	            runs(function () {
	            	// Let the printer be search first then use stop
	            	searchPrintersNow();
	            });
	            
	            waitsFor(function () {
	                return true;
	            }, 'Searching for Printers....', 5000);
	            */
	            
	            runs(function () {
	            	var printer = Rho.Printer.getPrinterByID(printers[0].printerID);
	            	printer.connect();
	            	if (printer.isConnected || printer.isReadyToPrint)
					{
						var fileURI = Rho.RhoFile.join(filesMediaPath, "dots.bmp");
						var print_str = Rho.Printer.printFile(fileURI);
						waitsFor(function() {
	                        return print_str;
	                    }, '10sec wait for print', 10000);
						displayTestResults(print_str, printers, "Printed ");
						printer.disconnect();
					}
	            	else
	            	{
	                    displayTestResults(printer.isConnected, printers, "Unable to Connect ");
	                }
	            });
	
	            waitsFor(function () {
	            	dispCurrentProcess("Is the 'dots.bmp' file sent successfully to the printer ? ");
	                return captured;
	            }, 'Waiting for Pass or Fail.', 10000);
	
	
	            runs(function () {
	                expect(testResult).toEqual(true);
	            });
	        });
	        
	        it("VTXXX-0043-printFile Method (with callback function for bmp file) ", function () {
	        	//printers  = [];
	            displayTestDescription("VTXXX-0043 | printFile Method (with callback function for bmp file) ");
	            displayTestInstruction("");
	            displayTestExpectation("The file should be sent successfully to the printer.");
	            
	            /*
	            runs(function () {
	            	// Let the printer be search first then use stop
	            	searchPrintersNow();
	            });
	            
	            waitsFor(function () {
	                return true;
	            }, 'Searching for Printers....', 5000);
	            */
	            
	            runs(function () {
	            	var printer = Rho.Printer.getPrinterByID(printers[0].printerID);
	            	printer.connect();
	            	if (printer.isConnected || printer.isReadyToPrint)
					{
						var fileURI = Rho.RhoFile.join(filesMediaPath, "grass.bmp");
						var print_str = Rho.Printer.printFile(fileURI, printFileCallback);
						waitsFor(function() {
	                        return print_str;
	                    }, '10sec wait for print', 10000);
						displayTestResults(print_str, printers, "Printed ");
						printer.disconnect();
					}
	            	else
	            	{
	                    displayTestResults(printer.isConnected, printers, "Unable to Connect ");
	                }
	            });
	
	            waitsFor(function () {
	            	dispCurrentProcess("Is the 'grass.bmp' file sent successfully to the printer ? ");
	                return captured;
	            }, 'Waiting for Pass or Fail.', 10000);
	
	
	            runs(function () {
	                expect(testResult).toEqual(true);
	            });
	        });
	        
	        it("VTXXX-0044-printFile Method (with anonymous function for bmp file) ", function () {
	        	//printers  = [];
	            displayTestDescription("VTXXX-0044 | printFile Method (with anonymous function for bmp file) ");
	            displayTestInstruction("");
	            displayTestExpectation("The file should be sent successfully to the printer.");
	            
	            /*
	            runs(function () {
	            	// Let the printer be search first then use stop
	            	searchPrintersNow();
	            });
	            
	            waitsFor(function () {
	                return true;
	            }, 'Searching for Printers....', 5000);
	            */
	            
	            runs(function () {
	            	var printer = Rho.Printer.getPrinterByID(printers[0].printerID);
	            	printer.connect();
	            	if (printer.isConnected || printer.isReadyToPrint)
					{
						var fileURI = Rho.RhoFile.join(filesMediaPath, "motobike.bmp");
						var print_str = Rho.Printer.printFile(fileURI, function(){printFileCallback();});
						waitsFor(function() {
	                        return print_str;
	                    }, '10sec wait for print', 10000);
						displayTestResults(print_str, printers, "Printed ");
						printer.disconnect();
					}
	            	else
	            	{
	                    displayTestResults(printer.isConnected, printers, "Unable to Connect ");
	                }
	            });
	
	            waitsFor(function () {
	            	dispCurrentProcess("Is the 'motobike.bmp' file sent successfully to the printer ? ");
	                return captured;
	            }, 'Waiting for Pass or Fail.', 10000);
	
	
	            runs(function () {
	                expect(testResult).toEqual(true);
	            });
	        });
        }
        
        it("VTXXX-0045-printFile Method (without callback function for pdf file) ", function () {
        	//printers  = [];
            displayTestDescription("VTXXX-0045 | printFile Method (without callback function for pdf file) ");
            displayTestInstruction("");
            displayTestExpectation("The file should be sent successfully to the printer.");
            
            /*
            runs(function () {
            	// Let the printer be search first then use stop
            	searchPrintersNow();
            });
            
            waitsFor(function () {
                return true;
            }, 'Searching for Printers....', 5000);
            */
            
            runs(function () {
            	var printer = Rho.Printer.getPrinterByID(printers[0].printerID);
            	printer.connect();
            	if (printer.isConnected || printer.isReadyToPrint)
				{
					var fileURI = Rho.RhoFile.join(filesMediaPath, "pdfSample.pdf");
					var print_str = Rho.Printer.printFile(fileURI);
					waitsFor(function() {
                        return print_str;
                    }, '30sec wait for print', 30000);
					displayTestResults(print_str, printers, "Printed ");
					printer.disconnect();
				}
            	else
            	{
                    displayTestResults(printer.isConnected, printers, "Unable to Connect ");
                }
            });

            waitsFor(function () {
            	dispCurrentProcess("Is the 'pdfSample.pdf' file sent successfully to the printer ? ");
                return captured;
            }, 'Waiting for Pass or Fail.', 10000);


            runs(function () {
                expect(testResult).toEqual(true);
            });
        });
        
        it("VTXXX-0046-printFile Method (with callback function for pdf file) ", function () {
        	//printers  = [];
            displayTestDescription("VTXXX-0046 | printFile Method (with callback function for pdf file) ");
            displayTestInstruction("");
            displayTestExpectation("The file should be sent successfully to the printer.");
            
            /*
            runs(function () {
            	// Let the printer be search first then use stop
            	searchPrintersNow();
            });
            
            waitsFor(function () {
                return true;
            }, 'Searching for Printers....', 5000);
            */
            
            runs(function () {
            	var printer = Rho.Printer.getPrinterByID(printers[0].printerID);
            	printer.connect();
            	if (printer.isConnected || printer.isReadyToPrint)
				{
					var fileURI = Rho.RhoFile.join(filesMediaPath, "pdfSample.pdf");
					var print_str = Rho.Printer.printFile(fileURI, printFileCallback);
					waitsFor(function() {
                        return print_str;
                    }, '30sec wait for print', 30000);
					displayTestResults(print_str, printers, "Printed ");
					printer.disconnect();
				}
            	else
            	{
                    displayTestResults(printer.isConnected, printers, "Unable to Connect ");
                }
            });

            waitsFor(function () {
            	dispCurrentProcess("Is the 'pdfSample.pdf' file sent successfully to the printer ? ");
                return captured;
            }, 'Waiting for Pass or Fail.', 10000);


            runs(function () {
                expect(testResult).toEqual(true);
            });
        });
        
        it("VTXXX-0047-printFile Method (with anonymous function for pdf file) ", function () {
        	//printers  = [];
            displayTestDescription("VTXXX-0047 | printFile Method (with anonymous function for pdf file) ");
            displayTestInstruction("");
            displayTestExpectation("The file should be sent successfully to the printer.");
            
            /*
            runs(function () {
            	// Let the printer be search first then use stop
            	searchPrintersNow();
            });
            
            waitsFor(function () {
                return true;
            }, 'Searching for Printers....', 5000);
            */
            
            runs(function () {
            	var printer = Rho.Printer.getPrinterByID(printers[0].printerID);
            	printer.connect();
            	if (printer.isConnected || printer.isReadyToPrint)
				{
					var fileURI = Rho.RhoFile.join(filesMediaPath, "pdfSample.pdf");
					var print_str = Rho.Printer.printFile(fileURI, function(){printFileCallback();});
					waitsFor(function() {
                        return print_str;
                    }, '30sec wait for print', 30000);
					displayTestResults(print_str, printers, "Printed ");
					printer.disconnect();
				}
            	else
            	{
                    displayTestResults(printer.isConnected, printers, "Unable to Connect ");
                }
            });

            waitsFor(function () {
            	dispCurrentProcess("Is the 'pdfSample.pdf' file sent successfully to the printer ? ");
                return captured;
            }, 'Waiting for Pass or Fail.', 10000);


            runs(function () {
                expect(testResult).toEqual(true);
            });
        });
        
        it("VTXXX-0048-printFile Method (with callback function and No File specified in fileURI) ", function () {
        	//printers  = [];
            displayTestDescription("VTXXX-0048 | printFile Method (with callback function and No File specified in fileURI) ");
            displayTestInstruction("");
            displayTestExpectation("No file should be sent to the printer. The callback should return STATUS_ERROR.");
            
            /*
            runs(function () {
            	// Let the printer be search first then use stop
            	searchPrintersNow();
            });
            
            waitsFor(function () {
                return true;
            }, 'Searching for Printers....', 5000);
            */
            
            runs(function () {
            	var printer = Rho.Printer.getPrinterByID(printers[0].printerID);
            	printer.connect();
            	if (printer.isConnected || printer.isReadyToPrint)
				{
					var fileURI = Rho.RhoFile.join(filesMediaPath, "");
					var print_str = Rho.Printer.printFile(fileURI, printFileCallback);
					waitsFor(function() {
                        return print_str;
                    }, '10sec wait for print', 10000);
					displayTestResults(print_str, printers, "No File Sent to Printer ");
					printer.disconnect();
				}
            	else
            	{
                    displayTestResults(printer.isConnected, printers, "Unable to Connect ");
                }
            });

            waitsFor(function () {
            	dispCurrentProcess("Does the test return STATUS_ERROR and no file is sent to the printer ? ");
                return captured;
            }, 'Waiting for Pass or Fail.', 10000);


            runs(function () {
                expect(testResult).toEqual(true);
            });
        });
        
        it("VTXXX-0049-printFile Method (with callback function and fileURI has no file at that location with that specified name) ", function () {
        	//printers  = [];
            displayTestDescription("VTXXX-0049 | printFile Method (with callback function and fileURI has no file at that location with that specified name) ");
            displayTestInstruction("");
            displayTestExpectation("No file should be sent to the printer. The callback should return STATUS_ERROR.");
            
            /*
            runs(function () {
            	// Let the printer be search first then use stop
            	searchPrintersNow();
            });
            
            waitsFor(function () {
                return true;
            }, 'Searching for Printers....', 5000);
            */
            
            runs(function () {
            	var printer = Rho.Printer.getPrinterByID(printers[0].printerID);
            	printer.connect();
            	if (printer.isConnected || printer.isReadyToPrint)
				{
					var fileURI = Rho.RhoFile.join(filesMediaPath, "abcdef.jpg");
					var print_str = Rho.Printer.printFile(fileURI, printFileCallback);
					waitsFor(function() {
                        return print_str;
                    }, '10sec wait for print', 10000);
					displayTestResults(print_str, printers, "No File Sent to Printer ");
					printer.disconnect();
				}
            	else
            	{
                    displayTestResults(printer.isConnected, printers, "Unable to Connect ");
                }
            });

            waitsFor(function () {
            	dispCurrentProcess("Does the test return STATUS_ERROR and no file is sent to the printer ? ");
                return captured;
            }, 'Waiting for Pass or Fail.', 10000);


            runs(function () {
                expect(testResult).toEqual(true);
            });
        });
        
        it("VTXXX-0050-printRawString Method (without callback function for ZPL Command) ", function () {
        	//printers  = [];
            displayTestDescription("VTXXX-0050 | printRawString Method (without callback function for ZPL Command) ");
            displayTestInstruction("");
            displayTestExpectation("The raw string should be sent successfully and printed on the printer.");
            
            /*
            runs(function () {
            	// Let the printer be search first then use stop
            	searchPrintersNow();
            });
            
            waitsFor(function () {
                return true;
            }, 'Searching for Printers....', 5000);
            */
            
            runs(function () {
            	var printer = Rho.Printer.getPrinterByID(printers[0].printerID);
            	printer.connect();
            	if (printer.isConnected || printer.isReadyToPrint)
				{
					var command = "^XA^FO50,50^ADN,36,20^FDTesting^FS^XZ";
					var print_str = Rho.Printer.printRawString(fileURI, printFileCallback);
					waitsFor(function() {
                        return print_str;
                    }, '10sec wait for print', 10000);
					displayTestResults(print_str, printers, "Printed ");
					printer.disconnect();
				}
            	else
            	{
                    displayTestResults(printer.isConnected, printers, "Unable to Connect ");
                }
            });

            waitsFor(function () {
            	dispCurrentProcess("Is the raw string printed on the printer ? ");
                return captured;
            }, 'Waiting for Pass or Fail.', 10000);


            runs(function () {
                expect(testResult).toEqual(true);
            });
        });
        
        it("VTXXX-0051-printRawString Method (with callback function for ZPL Command) ", function () {
        	//printers  = [];
            displayTestDescription("VTXXX-0051 | printRawString Method (with callback function for ZPL Command) ");
            displayTestInstruction("");
            displayTestExpectation("The raw string should be sent successfully and printed on the printer. Also return STATUS_SUCCESS.");
            
            /*
            runs(function () {
            	// Let the printer be search first then use stop
            	searchPrintersNow();
            });
            
            waitsFor(function () {
                return true;
            }, 'Searching for Printers....', 5000);
            */
            
            runs(function () {
            	var printer = Rho.Printer.getPrinterByID(printers[0].printerID);
            	printer.connect();
            	if (printer.isConnected || printer.isReadyToPrint)
				{
					var command = "^XA^FO50,50^ADN,36,20^FDTesting^FS^XZ";
					var print_str = Rho.Printer.printRawString(fileURI, printRawStringCallback);
					waitsFor(function() {
                        return print_str;
                    }, '10sec wait for print', 10000);
					displayTestResults(print_str, printers, "Printed ");
					printer.disconnect();
				}
            	else
            	{
                    displayTestResults(printer.isConnected, printers, "Unable to Connect ");
                }
            });

            waitsFor(function () {
            	dispCurrentProcess("Is the raw string printed on the printer ? ");
                return captured;
            }, 'Waiting for Pass or Fail.', 10000);


            runs(function () {
                expect(testResult).toEqual(true);
            });
        });
        
        it("VTXXX-0052-printRawString Method (with anonymous function for ZPL Command) ", function () {
        	//printers  = [];
            displayTestDescription("VTXXX-0052 | printRawString Method (with anonymous function for ZPL Command) ");
            displayTestInstruction("");
            displayTestExpectation("The raw string should be sent successfully and printed on the printer. Also return STATUS_SUCCESS.");
            
            /*
            runs(function () {
            	// Let the printer be search first then use stop
            	searchPrintersNow();
            });
            
            waitsFor(function () {
                return true;
            }, 'Searching for Printers....', 5000);
            */
            
            runs(function () {
            	var printer = Rho.Printer.getPrinterByID(printers[0].printerID);
            	printer.connect();
            	if (printer.isConnected || printer.isReadyToPrint)
				{
					var command = "^XA^FO50,50^ADN,36,20^FDTesting^FS^XZ";
					var print_str = Rho.Printer.printRawString(fileURI, printRawStringCallback);
					waitsFor(function() {
                        return print_str;
                    }, '10sec wait for print', 10000);
					displayTestResults(print_str, printers, "Printed ");
					printer.disconnect();
				}
            	else
            	{
                    displayTestResults(printer.isConnected, printers, "Unable to Connect ");
                }
            });

            waitsFor(function () {
            	dispCurrentProcess("Is the raw string printed on the printer ? ");
                return captured;
            }, 'Waiting for Pass or Fail.', 10000);


            runs(function () {
                expect(testResult).toEqual(true);
            });
        });
        
        it("VTXXX-0053-printRawString Method (without callback function for CPCL Command) ", function () {
        	//printers  = [];
            displayTestDescription("VTXXX-0053 | printRawString Method (without callback function for CPCL Command) ");
            displayTestInstruction("");
            displayTestExpectation("The raw string should be sent successfully and printed on the printer.");
            
            /*
            runs(function () {
            	// Let the printer be search first then use stop
            	searchPrintersNow();
            });
            
            waitsFor(function () {
                return true;
            }, 'Searching for Printers....', 5000);
            */
            
            runs(function () {
            	var printer = Rho.Printer.getPrinterByID(printers[0].printerID);
            	printer.connect();
            	if (printer.isConnected || printer.isReadyToPrint)
				{
					var command = "! 0.3937 200 200 1 1 IN-INCHEST 4 0 0 0 1 cm = 0.3937” IN-DOTST 4 0 0 48 1 mm = 8 dots B 128 1 1 48 16 112 UNITST 4 0 48 160 UNITSFORMPRINT";
					var print_str = Rho.Printer.printRawString(fileURI, printFileCallback);
					waitsFor(function() {
                        return print_str;
                    }, '10sec wait for print', 10000);
					displayTestResults(print_str, printers, "Printed ");
					printer.disconnect();
				}
            	else
            	{
                    displayTestResults(printer.isConnected, printers, "Unable to Connect ");
                }
            });

            waitsFor(function () {
            	dispCurrentProcess("Is the raw string printed on the printer ? ");
                return captured;
            }, 'Waiting for Pass or Fail.', 10000);


            runs(function () {
                expect(testResult).toEqual(true);
            });
        });
        
        it("VTXXX-0054-printRawString Method (with callback function for CPCL Command) ", function () {
        	//printers  = [];
            displayTestDescription("VTXXX-0054 | printRawString Method (with callback function for CPCL Command) ");
            displayTestInstruction("");
            displayTestExpectation("The raw string should be sent successfully and printed on the printer. Also return STATUS_SUCCESS.");
            
            /*
            runs(function () {
            	// Let the printer be search first then use stop
            	searchPrintersNow();
            });
            
            waitsFor(function () {
                return true;
            }, 'Searching for Printers....', 5000);
            */
            
            runs(function () {
            	var printer = Rho.Printer.getPrinterByID(printers[0].printerID);
            	printer.connect();
            	if (printer.isConnected || printer.isReadyToPrint)
				{
					var command = "! 0.3937 200 200 1 1IN-INCHEST 4 0 0 0 1 cm = 0.3937”IN-DOTST 4 0 0 48 1 mm = 8 dotsB 128 1 1 48 16 112 UNITST 4 0 48 160 UNITSFORMPRINT";
					var print_str = Rho.Printer.printRawString(fileURI, printRawStringCallback);
					waitsFor(function() {
                        return print_str;
                    }, '10sec wait for print', 10000);
					displayTestResults(print_str, printers, "Printed ");
					printer.disconnect();
				}
            	else
            	{
                    displayTestResults(printer.isConnected, printers, "Unable to Connect ");
                }
            });

            waitsFor(function () {
            	dispCurrentProcess("Is the raw string printed on the printer ? ");
                return captured;
            }, 'Waiting for Pass or Fail.', 10000);


            runs(function () {
                expect(testResult).toEqual(true);
            });
        });
        
        it("VTXXX-0055-printRawString Method (with anonymous function for CPCL Command) ", function () {
        	//printers  = [];
            displayTestDescription("VTXXX-0055 | printRawString Method (with anonymous function for CPCL Command) ");
            displayTestInstruction("");
            displayTestExpectation("The raw string should be sent successfully and printed on the printer. Also return STATUS_SUCCESS.");
            
            /*
            runs(function () {
            	// Let the printer be search first then use stop
            	searchPrintersNow();
            });
            
            waitsFor(function () {
                return true;
            }, 'Searching for Printers....', 5000);
            */
            
            runs(function () {
            	var printer = Rho.Printer.getPrinterByID(printers[0].printerID);
            	printer.connect();
            	if (printer.isConnected || printer.isReadyToPrint)
				{
					var command = "! 0.3937 200 200 1 1IN-INCHEST 4 0 0 0 1 cm = 0.3937”IN-DOTST 4 0 0 48 1 mm = 8 dotsB 128 1 1 48 16 112 UNITST 4 0 48 160 UNITSFORMPRINT";
					var print_str = Rho.Printer.printRawString(fileURI, printRawStringCallback);
					waitsFor(function() {
                        return print_str;
                    }, '10sec wait for print', 10000);
					displayTestResults(print_str, printers, "Printed ");
					printer.disconnect();
				}
            	else
            	{
                    displayTestResults(printer.isConnected, printers, "Unable to Connect ");
                }
            });

            waitsFor(function () {
            	dispCurrentProcess("Is the raw string printed on the printer ? ");
                return captured;
            }, 'Waiting for Pass or Fail.', 10000);


            runs(function () {
                expect(testResult).toEqual(true);
            });
        });
        
        it("VTXXX-0056-printRawString Method with callback (with the printer turned off) ", function () {
        	//printers  = [];
            displayTestDescription("VTXXX-0056 | printRawString Method with callback (with the printer turned off) ");
            displayTestInstruction("");
            displayTestExpectation("The raw string should not be sent and printed on the printer. The callback function should return STATUS_ERROR.");
            
            /*
            runs(function () {
            	// Let the printer be search first then use stop
            	searchPrintersNow();
            });
            
            waitsFor(function () {
                return true;
            }, 'Searching for Printers....', 5000);
            */
            
            runs(function () {
            	var printer = Rho.Printer.getPrinterByID(printers[0].printerID);
            	waitsFor(function () {
                    return true;
                }, 'Turn OFF the Printer', 5000);
            	printer.connect();
            	if (printer.isConnected || printer.isReadyToPrint)
				{
					var command = "^XA^FO50,50^ADN,36,20^FDTesting^FS^XZ";
					var print_str = Rho.Printer.printRawString(fileURI, printRawStringCallback);
					waitsFor(function() {
                        return print_str;
                    }, '10sec wait for print', 10000);
					displayTestResults(print_str, printers, "Printed ");
					printer.disconnect();
				}
            	else
            	{
                    displayTestResults(printer.isConnected, printers, "Unable to Connect ");
                }
            });

            waitsFor(function () {
            	dispCurrentProcess("Is the method returning with error ? ");
                return captured;
            }, 'Waiting for Pass or Fail.', 10000);


            runs(function () {
                expect(testResult).toEqual(true);
            });
        });
        
        it("VTXXX-0057-printRawString Method with callback (with the printer's blue tooth[applicable for Bluetooth Printers only], tcp/network[applicable for network printers], USB[applicable for USB printers] turned off/disconnected) ", function () {
        	printers  = [];
            displayTestDescription("VTXXX-0057 | printRawString Method with callback (with the printer's blue tooth[applicable for Bluetooth Printers only], tcp/network[applicable for network printers], USB[applicable for USB printers] turned off/disconnected) ");
            displayTestInstruction("");
            displayTestExpectation("The raw string should not be sent and printed on the printer. The callback function should return STATUS_ERROR.");
            
            runs(function () {
            	// Let the printer be search first then use stop
            	searchPrintersNow();
            });
            
            waitsFor(function () {
                return true;
            }, 'Searching for Printers....', 5000);
            
            runs(function () {
            	var printer = Rho.Printer.getPrinterByID(printers[0].printerID);
            	waitsFor(function () {
                    return true;
                }, 'Turn OFF(Bluetooth or TCP/Network or USB) of the Printer', 5000);
            	printer.connect();
            	if (printer.isConnected || printer.isReadyToPrint)
				{
					var command = "^XA^FO50,50^ADN,36,20^FDTesting^FS^XZ";
					var print_str = Rho.Printer.printRawString(fileURI, printRawStringCallback);
					waitsFor(function() {
                        return print_str;
                    }, '10sec wait for print', 10000);
					displayTestResults(print_str, printers, "Printed ");
					printer.disconnect();
				}
            	else
            	{
                    displayTestResults(printer.isConnected, printers, "Unable to Connect ");
                }
            });

            waitsFor(function () {
            	dispCurrentProcess("Is the method returning with error ? ");
                return captured;
            }, 'Waiting for Pass or Fail.', 10000);


            runs(function () {
                expect(testResult).toEqual(true);
            });
        });
        
        // Need to write tests for "requestState" after implementation and more info from the developer
    });
});