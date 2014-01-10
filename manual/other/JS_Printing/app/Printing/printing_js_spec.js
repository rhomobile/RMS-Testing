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
    if (pppp.length > 0) {
        var str = tresult + "<br/>";
        str += abcd;
        document.getElementById('actualResult').innerHTML = str;
    } else {
        document.getElementById('actualResult').innerHTML = tresult;
    }
}

var printers = [];
var discovery_finished = false;
var testResult = '';
var connect_type = '';
var macipaddress = '';
var captured = false;
var errmsg = '';
var platform = Rho.System.platform;

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
    Rho.Printer.searchPrinters({
        "printerType": Printer.PRINTER_TYPE_ANY,
        "connectionType": connect_type
    }, searchPrinterCallback);
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
    if (printer.status == Rho.Printer.STATUS_SUCCESS) {
        printers.push(printer);
    } else if (printer.status == Rho.Printer.STATUS_DONE || printer.status == Rho.Printer.STATUS_ERR_TIMEOUT) {
        discovery_finished = true;
    } else {
        errmsg = printer.message; // when status = ERROR
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

describe("Printing_with_JS", function () {
    beforeEach(function () {
        /* ... Set up your object ... */
        $('#for_js').show();
        $('#for_ruby').hide();
    });

    afterEach(function () {
        /* ... Tear it down ... */
    });

    describe('Rho.Printer APIs Set/Get Test', function () {
        var enumData = Rho.Printer.enumerate();
        for (var j = 0; j < enumData.length; j++) {
            (function (enumObject) {
                describe("PROPERTIES... ", function () {

                    describe('Getting ID', function () {
                        it('Should return ID value as a string', function () {
                            expect(enumObject.ID).isNotEmptyString();
                        });
                    });


                    describe('Getting deviceName', function () {
                        it('Should return deviceName value as a string', function () {
                            expect(enumObject.deviceName).isNotEmptyString();
                        });
                    });


                    describe('Getting printerType', function () {
                        it('Should return printerType value as a string', function () {
                            expect(enumObject.printerType).isNotEmptyString();
                        });
                    });


                    describe('Getting deviceAddress', function () {
                        it('Should return deviceAddress value as a string', function () {
                            expect(enumObject.deviceAddress).isNotEmptyString();
                        });
                    });

                    describe('Getting devicePort', function () {
                        it('Should return devicePort value as an integer', function () {
                            expect(enumObject.devicePort).isNumberGreaterThenZero();
                        });
                    });


                    describe('Getting connectionType', function () {
                        it('Should return connectionType value as a string', function () {
                            expect(enumObject.connectionType).isNotEmptyString();
                        });
                    });


                    describe('Getting isConnected', function () {
                        it('Should return isConnected value as BOOLEAN (true or false)', function () {
                            expect(enumObject.isConnected).isBoolean();
                        });
                    });

                    describe('Getting printerEventCallback', function () {
                        it('Should return printerEventCallback value as a Callback', function () {
                            expect(enumObject.printerEventCallback).toEqual(typeof (function () {
                                searchPrintersNow();
                            }));
                        });
                    });

                    describe('Getting controlLanguage', function () {
                        it('Should return controlLanguage value as a string', function () {
                            expect(enumObject.controlLanguage).isNotEmptyString();
                        });
                    });
                });
            })(enumData[j]);
        }
    });

    describe("Rho.Printer JS API", function () {
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
                Rho.Printer.enumerateSupportedTypes(function (printer) {
                    enumerateCallback(printer);
                });

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
            printers = [];
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
                /*if (printers.length > 0) {
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
            printers = [];
            displayTestDescription("VTXXX-0005 | searchPrinters Method(with options \"printerType\" and \"connectionType\")");
            displayTestInstruction("");
            displayTestExpectation("The printer connected with the device should be discovered successfully and return STATUS_SUCCESS.");

            runs(function () {
                connect_type = Rho.Printer.connectionType;
                Rho.Printer.searchPrinters({
                    "printerType": Rho.Printer.PRINTER_TYPE_ANY,
                    "connectionType": connect_type
                }, searchPrinterCallback);
            });

            waitsFor(function () {
                return true;
            }, 'Searching for Printers....', 5000);

            runs(function () {
                displayTestResults(testResult, printers, printers[0].toString());
                /*
            	if (printers.length > 0) {
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
            printers = [];
            displayTestDescription("VTXXX-0006 | searchPrinters Method(with options \"printerType\", \"connectionType\", \"timeout\")");
            displayTestInstruction("");
            displayTestExpectation("The printer connected with the device should be discovered successfully and return STATUS_SUCCESS.");

            runs(function () {
                if (!connect_type) {
                    connect_type = Rho.Printer.connectionType;
                }
                Rho.Printer.searchPrinters({
                    "printerType": Rho.Printer.PRINTER_TYPE_ANY,
                    "connectionType": connect_type,
                    "timeout": 15000
                }, searchPrinterCallback);
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
            printers = [];
            displayTestDescription("VTXXX-0007 | with only option \"timeout\")");
            displayTestInstruction("");
            displayTestExpectation("The printer connected with the device should be discovered successfully and return STATUS_SUCCESS.");

            runs(function () {
                if (!connect_type) {
                    connect_type = Rho.Printer.connectionType;
                }
                Rho.Printer.searchPrinters({
                    "timeout": 15000
                }, searchPrinterCallback);
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
            printers = [];
            displayTestDescription("VTXXX-0008 | searchPrinters Method(with only option \"deviceAddress\")");
            displayTestInstruction("");
            displayTestExpectation("The printer connected with the device should be discovered successfully and return STATUS_SUCCESS.");

            runs(function () {
                $('#address').css("display", "block");
            });

            waitsFor(function () {
                dispCurrentProcess("Please provide MAC/IP address of the printer ");
                return captured;
            }, 'Waiting for Click "Ok".', 100000);

            runs(function () {
                $('#address').css("display", "none");
                macipaddress = $('#macip').val();
                Rho.Printer.searchPrinters({
                    "deviceAddress": macipaddress
                }, searchPrinterCallback);
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
            printers = [];
            displayTestDescription("VTXXX-0009 | searchPrinters Method(with options \"printerType\", \"connectionType\", \"timeout\", \"deviceAddress\")");
            displayTestInstruction("");
            displayTestExpectation("The printer connected with the device should be discovered successfully and return STATUS_SUCCESS.");

            runs(function () {
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
                Rho.Printer.searchPrinters({
                    "printerType": Rho.Printer.PRINTER_TYPE_ANY,
                    "connectionType": connect_type,
                    "timeout": 15000,
                    "deviceAddress": macipaddress
                }, searchPrinterCallback);
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

        if (Rho.Printer.printerType != Rho.Printer.PRINTER_TYPE_ZEBRA || Rho.Printer.connectionType != Rho.Printer.CONNECTION_TYPE_TCP) {
            it("VTXXX-0010-searchPrinters Method for non-zebra printer(with options \"printerType\" and \"connectionType\")", function () {
                printers = [];
                displayTestDescription("VTXXX-0010 | searchPrinters Method for non-zebra printer(with options \"printerType\" and \"connectionType\")");
                displayTestInstruction("");
                displayTestExpectation("The printer should not be discovered with these settings and return error message for STATUS_ERROR.");

                runs(function () {

                    Rho.Printer.searchPrinters({
                        "printerType": Rho.Printer.PRINTER_TYPE_ZEBRA,
                        "connectionType": Rho.Printer.CONNECTION_TYPE_TCP
                    }, searchPrinterCallback);
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
        }

        it("VTXXX-0011-searchPrinters Method(with only option \"devicePort\":80)", function () {
            printers = [];
            displayTestDescription("VTXXX-0011 | searchPrinters Method(with only option \"devicePort\")");
            displayTestInstruction("");
            displayTestExpectation("The printer should not be discovered with these settings and return error message for STATUS_ERROR.");

            runs(function () {

                Rho.Printer.searchPrinters({
                    "devicePort": 80
                }, searchPrinterCallback);
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
            printers = [];
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
            printers = [];
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
            printers = [];
            displayTestDescription("VTXXX-0014 | stopSearch Method (with anonymous function)");
            displayTestInstruction("");
            displayTestExpectation("The search should be terminated and printer should not be discovered.");

            runs(function () {
                // Let the printer be search first then use stop
                searchPrintersNow();
                var stopsrch = Rho.Printer.stopSearch(function () {
                    stopSearchPrinterCallback();
                });
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
            printers = [];
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
                if (printer.isConnected || printer.isReadyToPrint) {
                    displayTestResults(printer.status, printers, "Printer Instance returned successfully.");
                    printer.disconnect();
                } else {
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
            printers = [];
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
            printers = [];
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
                if (printer.isConnected || printer.isReadyToPrint) {
                    displayTestResults(printer.status, printers, "Printer Instance returned successfully.");
                    printer.disconnect();
                } else {
                    displayTestResults(printer.status, printers, printer.message);
                }
            });

            waitsFor(function () {
                dispCurrentProcess("Can you see Error Message in the results? ");
                return captured;
            }, 'Waiting for Pass or Fail.', 10000);


            runs(function () {
                expect(testResult).toEqual(true);
            });
        });

        it("VTXXX-0018-connect Method (without callback function) ", function () {
            printers = [];
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
                if (printer.isConnected || printer.isReadyToPrint) {
                    printer.printRawString("Hello Printing!");
                    printer.disconnect();
                } else {
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
                printer.connect(function () {
                    connectCallback();
                });
                if (printer.isConnected || printer.isReadyToPrint) {
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
                printer.connect({
                    "timeout": 20000
                }, connectCallback);
                if (printer.isConnected || printer.isReadyToPrint) {
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
                printer.connect({
                    "timeout": 0
                }, connectCallback);
                if (printer.isConnected || printer.isReadyToPrint) {
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
                printer.connect({
                    "timeout": 1000
                }, connectCallback);
                if (printer.isConnected || printer.isReadyToPrint) {
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
                printer.connect({
                    "timeout": 15000.5
                }, connectCallback);
                if (printer.isConnected || printer.isReadyToPrint) {
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
                printer.connect({
                    "timeout": 20000
                }, connectCallback);
                if (printer.isConnected || printer.isReadyToPrint) {
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

        // Need to write tests for "updateState" after implementation from the developer(if applicable)

        it("VTXXX-0030-disconnect Method (without callback function) ", function () {
            printers = [];
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
                if (printer.isConnected || printer.isReadyToPrint) {
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
                if (printer.isConnected || printer.isReadyToPrint) {
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
                if (printer.isConnected || printer.isReadyToPrint) {
                    printer.disconnect(function () {
                        disconnectCallback();
                    });
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
                if (printer.isConnected || printer.isReadyToPrint) {
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
                if (printer.isConnected || printer.isReadyToPrint) {
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
                if (printer.isConnected || printer.isReadyToPrint) {
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

        it("VTXXX-0036-printFile Method (without callback function for jpg file) ", function () {
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
                if (printer.isConnected || printer.isReadyToPrint) {
                    var fileURI = Rho.RhoFile.join(filesMediaPath, "flower.jpg");
                    var print_str = printer.printFile(fileURI);
                    waitsFor(function () {
                        return print_str;
                    }, '10sec wait for print', 10000);
                    displayTestResults(print_str, printers, "Printed ");
                    printer.disconnect();
                } else {
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

        it("VTXXX-0037-printFile Method (with callback function for jpg file) ", function () {
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
                if (printer.isConnected || printer.isReadyToPrint) {
                    var fileURI = Rho.RhoFile.join(filesMediaPath, "simple_sun.jpg");
                    var print_str = printer.printFile(fileURI, printFileCallback);
                    waitsFor(function () {
                        return print_str;
                    }, '10sec wait for print', 10000);
                    displayTestResults(print_str, printers, "Printed ");
                    printer.disconnect();
                } else {
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
                if (printer.isConnected || printer.isReadyToPrint) {
                    var fileURI = Rho.RhoFile.join(filesMediaPath, "motorola_logo.jpg");
                    var print_str = printer.printFile(fileURI, function () {
                        printFileCallback();
                    });
                    waitsFor(function () {
                        return print_str;
                    }, '10sec wait for print', 10000);
                    displayTestResults(print_str, printers, "Printed ");
                    printer.disconnect();
                } else {
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
                if (printer.isConnected || printer.isReadyToPrint) {
                    var fileURI = Rho.RhoFile.join(filesMediaPath, "basketball.png");
                    var print_str = printer.printFile(fileURI);
                    waitsFor(function () {
                        return print_str;
                    }, '10sec wait for print', 10000);
                    displayTestResults(print_str, printers, "Printed ");
                    printer.disconnect();
                } else {
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
                if (printer.isConnected || printer.isReadyToPrint) {
                    var fileURI = Rho.RhoFile.join(filesMediaPath, "swirl.png");
                    var print_str = printer.printFile(fileURI, printFileCallback);
                    waitsFor(function () {
                        return print_str;
                    }, '10sec wait for print', 10000);
                    displayTestResults(print_str, printers, "Printed ");
                    printer.disconnect();
                } else {
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
                if (printer.isConnected || printer.isReadyToPrint) {
                    var fileURI = Rho.RhoFile.join(filesMediaPath, "vine.png");
                    var print_str = printer.printFile(fileURI, function () {
                        printFileCallback();
                    });
                    waitsFor(function () {
                        return print_str;
                    }, '10sec wait for print', 10000);
                    displayTestResults(print_str, printers, "Printed ");
                    printer.disconnect();
                } else {
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
                    if (printer.isConnected || printer.isReadyToPrint) {
                        var fileURI = Rho.RhoFile.join(filesMediaPath, "dots.bmp");
                        var print_str = printer.printFile(fileURI);
                        waitsFor(function () {
                            return print_str;
                        }, '10sec wait for print', 10000);
                        displayTestResults(print_str, printers, "Printed ");
                        printer.disconnect();
                    } else {
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
                    if (printer.isConnected || printer.isReadyToPrint) {
                        var fileURI = Rho.RhoFile.join(filesMediaPath, "grass.bmp");
                        var print_str = printer.printFile(fileURI, printFileCallback);
                        waitsFor(function () {
                            return print_str;
                        }, '10sec wait for print', 10000);
                        displayTestResults(print_str, printers, "Printed ");
                        printer.disconnect();
                    } else {
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
                    if (printer.isConnected || printer.isReadyToPrint) {
                        var fileURI = Rho.RhoFile.join(filesMediaPath, "motobike.bmp");
                        var print_str = printer.printFile(fileURI, function () {
                            printFileCallback();
                        });
                        waitsFor(function () {
                            return print_str;
                        }, '10sec wait for print', 10000);
                        displayTestResults(print_str, printers, "Printed ");
                        printer.disconnect();
                    } else {
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
                if (printer.isConnected || printer.isReadyToPrint) {
                    var fileURI = Rho.RhoFile.join(filesMediaPath, "pdfSample.pdf");
                    var print_str = printer.printFile(fileURI);
                    waitsFor(function () {
                        return print_str;
                    }, '30sec wait for print', 30000);
                    displayTestResults(print_str, printers, "Printed ");
                    printer.disconnect();
                } else {
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
                if (printer.isConnected || printer.isReadyToPrint) {
                    var fileURI = Rho.RhoFile.join(filesMediaPath, "pdfSample.pdf");
                    var print_str = printer.printFile(fileURI, printFileCallback);
                    waitsFor(function () {
                        return print_str;
                    }, '30sec wait for print', 30000);
                    displayTestResults(print_str, printers, "Printed ");
                    printer.disconnect();
                } else {
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
                if (printer.isConnected || printer.isReadyToPrint) {
                    var fileURI = Rho.RhoFile.join(filesMediaPath, "pdfSample.pdf");
                    var print_str = printer.printFile(fileURI, function () {
                        printFileCallback();
                    });
                    waitsFor(function () {
                        return print_str;
                    }, '30sec wait for print', 30000);
                    displayTestResults(print_str, printers, "Printed ");
                    printer.disconnect();
                } else {
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
                if (printer.isConnected || printer.isReadyToPrint) {
                    var fileURI = Rho.RhoFile.join(filesMediaPath, "");
                    var print_str = printer.printFile(fileURI, printFileCallback);
                    waitsFor(function () {
                        return print_str;
                    }, '10sec wait for print', 10000);
                    displayTestResults(print_str, printers, "No File Sent to Printer ");
                    printer.disconnect();
                } else {
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
                if (printer.isConnected || printer.isReadyToPrint) {
                    var fileURI = Rho.RhoFile.join(filesMediaPath, "abcdef.jpg");
                    var print_str = printer.printFile(fileURI, printFileCallback);
                    waitsFor(function () {
                        return print_str;
                    }, '10sec wait for print', 10000);
                    displayTestResults(print_str, printers, "No File Sent to Printer ");
                    printer.disconnect();
                } else {
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
                if (printer.isConnected || printer.isReadyToPrint) {
                    var command = "^XA^FO50,50^ADN,36,20^FDTesting^FS^XZ";
                    var print_str = printer.printRawString(fileURI, printFileCallback);
                    waitsFor(function () {
                        return print_str;
                    }, '10sec wait for print', 10000);
                    displayTestResults(print_str, printers, "Printed ");
                    printer.disconnect();
                } else {
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
                if (printer.isConnected || printer.isReadyToPrint) {
                    var command = "^XA^FO50,50^ADN,36,20^FDTesting^FS^XZ";
                    var print_str = printer.printRawString(fileURI, printRawStringCallback);
                    waitsFor(function () {
                        return print_str;
                    }, '10sec wait for print', 10000);
                    displayTestResults(print_str, printers, "Printed ");
                    printer.disconnect();
                } else {
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
                if (printer.isConnected || printer.isReadyToPrint) {
                    var command = "^XA^FO50,50^ADN,36,20^FDTesting^FS^XZ";
                    var print_str = printer.printRawString(fileURI, printRawStringCallback);
                    waitsFor(function () {
                        return print_str;
                    }, '10sec wait for print', 10000);
                    displayTestResults(print_str, printers, "Printed ");
                    printer.disconnect();
                } else {
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
                if (printer.isConnected || printer.isReadyToPrint) {
                    var command = "! 0.3937 200 200 1 1 IN-INCHEST 4 0 0 0 1 cm = 0.3937” IN-DOTST 4 0 0 48 1 mm = 8 dots B 128 1 1 48 16 112 UNITST 4 0 48 160 UNITSFORMPRINT";
                    var print_str = printer.printRawString(fileURI, printFileCallback);
                    waitsFor(function () {
                        return print_str;
                    }, '10sec wait for print', 10000);
                    displayTestResults(print_str, printers, "Printed ");
                    printer.disconnect();
                } else {
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
                if (printer.isConnected || printer.isReadyToPrint) {
                    var command = "! 0.3937 200 200 1 1IN-INCHEST 4 0 0 0 1 cm = 0.3937”IN-DOTST 4 0 0 48 1 mm = 8 dotsB 128 1 1 48 16 112 UNITST 4 0 48 160 UNITSFORMPRINT";
                    var print_str = printer.printRawString(fileURI, printRawStringCallback);
                    waitsFor(function () {
                        return print_str;
                    }, '10sec wait for print', 10000);
                    displayTestResults(print_str, printers, "Printed ");
                    printer.disconnect();
                } else {
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
                if (printer.isConnected || printer.isReadyToPrint) {
                    var command = "! 0.3937 200 200 1 1IN-INCHEST 4 0 0 0 1 cm = 0.3937”IN-DOTST 4 0 0 48 1 mm = 8 dotsB 128 1 1 48 16 112 UNITST 4 0 48 160 UNITSFORMPRINT";
                    var print_str = printer.printRawString(fileURI, printRawStringCallback);
                    waitsFor(function () {
                        return print_str;
                    }, '10sec wait for print', 10000);
                    displayTestResults(print_str, printers, "Printed ");
                    printer.disconnect();
                } else {
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
                if (printer.isConnected || printer.isReadyToPrint) {
                    var command = "^XA^FO50,50^ADN,36,20^FDTesting^FS^XZ";
                    var print_str = printer.printRawString(fileURI, printRawStringCallback);
                    waitsFor(function () {
                        return print_str;
                    }, '10sec wait for print', 10000);
                    displayTestResults(print_str, printers, "Printed ");
                    printer.disconnect();
                } else {
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
            printers = [];
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
                if (printer.isConnected || printer.isReadyToPrint) {
                    var command = "^XA^FO50,50^ADN,36,20^FDTesting^FS^XZ";
                    var print_str = printer.printRawString(fileURI, printRawStringCallback);
                    waitsFor(function () {
                        return print_str;
                    }, '10sec wait for print', 10000);
                    displayTestResults(print_str, printers, "Printed ");
                    printer.disconnect();
                } else {
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

describe("Printing_with_Ruby", function () {
    beforeEach(function () {
        /* ... Set up your object ... */
        $('#for_js').hide();
        $('#for_ruby').show();
    });
    describe("Printing Tests", function () {
        it("VTXXX-0001-enumerateSupportedTypes Method (without callback function)", function () {
            displayTestDescription("VTXXX-0001-enumerateSupportedTypes Method (without callback function)");
            displayTestInstruction("");
            displayTestExpectation("Method should return the result as names/list of printer types that are supported in this build.");

            _result.waitToRunTest();

            runs(function () {
                Ruby.call("Printing", "rho_enumerateSupportedTypes");
                //displayTestResults(Ruby.getReturnedValue()+"<br>", [], "");
                document.getElementById('actualResult').innerHTML = Ruby.getReturnedValue();

                dispCurrentProcess("Can you see the supported Printer Types? ");
            });

            _result.waitForResponse();
        });

        it("VTXXX-0002-enumerateSupportedTypes Method (with callback function)", function () {
            displayTestDescription("VTXXX-0002 | enumerateSupportedTypes Method (with callback function)");
            displayTestInstruction("");
            displayTestExpectation("Method should return the result as names/list of printer types that are supported in this build.");

            _result.waitToRunTest();

            runs(function () {
                Ruby.call("Printing", "rho_enumerateSupportedTypes_callback");
                document.getElementById('actualResult').innerHTML = Ruby.getReturnedValue();

                dispCurrentProcess("Can you see the supported Printer Types? ");
            });

            _result.waitForResponse();
        });

        it("VTXXX-0003-enumerateSupportedTypes Method (with anonymous function)", function () {
            displayTestDescription("VTXXX-0003 | enumerateSupportedTypes Method (with anonymous function)");
            displayTestInstruction("");
            displayTestExpectation("Method should return the result as names/list of printer types that are supported in this build.");

            _result.waitToRunTest();

            runs(function () {
                Ruby.call("Printing", "rho_enumerateSupportedTypes_anonymous");
                document.getElementById('actualResult').innerHTML = Ruby.getReturnedValue();

                dispCurrentProcess("Can you see the supported Printer Types? ");
            });

            _result.waitForResponse();
        });

        it("VTXXX-0004-searchPrinters Method(default options)", function () {
            printers = [];
            displayTestDescription("VTXXX-0004 | searchPrinters Method(default options)");
            displayTestInstruction("");
            displayTestExpectation("The printer connected with the device should be discovered successfully and return STATUS_SUCCESS.");

            _result.waitToRunTest();

            runs(function () {
                Ruby.call("Printing", "rho_searchPrinters");
            });

            waitsFor(function () {
                return true;
            }, 'Searching for Printers....', 10000);

            runs(function () {
                displayTestResults(Ruby.getReturnedValue(), printers, "");
                dispCurrentProcess("Can you see the status and Printer in the results? ");
            });

            _result.waitForResponse();
        });

        it("VTXXX-0005-searchPrinters Method(with options \"printerType\" and \"connectionType\")", function () {
            printers = [];
            displayTestDescription("VTXXX-0005 | searchPrinters Method(with options \"printerType\" and \"connectionType\")");
            displayTestInstruction("");
            displayTestExpectation("The printer connected with the device should be discovered successfully and return STATUS_SUCCESS.");

            _result.waitToRunTest();
            runs(function () {
                Ruby.call("Printing", "rho_searchPrinters_printerType_connectType");
            });

            waitsFor(function () {
                return true;
            }, 'Searching for Printers....', 5000);

            runs(function () {
                displayTestResults(Ruby.getReturnedValue(), printers, "");
                dispCurrentProcess("Can you see the status and Printer in the results? ");
            });

            _result.waitForResponse();
        });

        it("VTXXX-0006-searchPrinters Method(with options \"printerType\", \"connectionType\", \"timeout\")", function () {
            printers = [];
            displayTestDescription("VTXXX-0006 | searchPrinters Method(with options \"printerType\", \"connectionType\", \"timeout\")");
            displayTestInstruction("");
            displayTestExpectation("The printer connected with the device should be discovered successfully and return STATUS_SUCCESS.");

            _result.waitToRunTest();
            runs(function () {
                Ruby.call("Printing", "rho_searchPrinters_printerType_connectType_timeout");
            });

            waitsFor(function () {
                return true;
            }, 'Searching for Printers....', 5000);

            runs(function () {
                displayTestResults(Ruby.getReturnedValue(), printers, "");
                dispCurrentProcess("Can you see the status and Printer in the results? ");
            });

            _result.waitForResponse();
        });

        it("VTXXX-0007-searchPrinters Method(with only option \"timeout\")", function () {
            printers = [];
            displayTestDescription("VTXXX-0007 | with only option \"timeout\")");
            displayTestInstruction("");
            displayTestExpectation("The printer connected with the device should be discovered successfully and return STATUS_SUCCESS.");

            _result.waitToRunTest();
            runs(function () {
                Ruby.call("Printing", "rho_searchPrinters_timeout");
            });

            waitsFor(function () {
                return true;
            }, 'Searching for Printers....', 5000);

            runs(function () {
                displayTestResults(Ruby.getReturnedValue(), printers, "");
                dispCurrentProcess("Can you see the status and Printer in the results? ");
            });

            _result.waitForResponse();
        });

        it("VTXXX-0008-searchPrinters Method(with only option \"deviceAddress\")", function () {
            printers = [];
            displayTestDescription("VTXXX-0008 | searchPrinters Method(with only option \"deviceAddress\")");
            displayTestInstruction("");
            displayTestExpectation("The printer connected with the device should be discovered successfully and return STATUS_SUCCESS.");

            _result.waitToRunTest();

            runs(function () {
                $('#address').css("display", "block");
            });

            waitsFor(function () {
                dispCurrentProcess("Please provide MAC/IP address of the printer ");
                return captured;
            }, 'Waiting for Click "Ok".', 100000);

            runs(function () {
                $('#address').css("display", "none");
                macipaddress = $('#macip').val();
                Ruby.call("Printing", "rho_searchPrinters_macip{:macip => " + macipaddress + "}");
            });

            waitsFor(function () {
                return true;
            }, 'Searching for Printers....', 5000);

            runs(function () {
                displayTestResults(Ruby.getReturnedValue(), printers, "");
                dispCurrentProcess("Can you see the status and Printer in the results? ");
            });

            _result.waitForResponse();
        });

        it("VTXXX-0009-searchPrinters Method(with options \"printerType\", \"connectionType\", \"timeout\", \"deviceAddress\")", function () {
            printers = [];
            displayTestDescription("VTXXX-0009 | searchPrinters Method(with options \"printerType\", \"connectionType\", \"timeout\", \"deviceAddress\")");
            displayTestInstruction("");
            displayTestExpectation("The printer connected with the device should be discovered successfully and return STATUS_SUCCESS.");

            _result.waitToRunTest();

            waitsFor(function () {
                dispCurrentProcess("Please provide MAC/IP address of the printer or Click 'Ok' if already provided. ");
                return captured;
            }, 'Waiting for Click "Ok".', 100000);

            runs(function () {
                Ruby.call("Printing", "rho_searchPrinters_macip_all{:macip => " + macipaddress + "}");
            });

            waitsFor(function () {
                return true;
            }, 'Searching for Printers....', 5000);

            runs(function () {
                displayTestResults(Ruby.getReturnedValue(), printers, "");
                dispCurrentProcess("Can you see the status and Printer in the results? ");
            });

            _result.waitForResponse();
        });

        if (Rho.Printer.printerType != Rho.Printer.PRINTER_TYPE_ZEBRA || Rho.Printer.connectionType != Rho.Printer.CONNECTION_TYPE_TCP) {
            it("VTXXX-0010-searchPrinters Method for non-zebra printer(with options \"printerType\" and \"connectionType\")", function () {
                printers = [];
                displayTestDescription("VTXXX-0010 | searchPrinters Method for non-zebra printer(with options \"printerType\" and \"connectionType\")");
                displayTestInstruction("");
                displayTestExpectation("The printer should not be discovered with these settings and return error message for STATUS_ERROR.");

                _result.waitToRunTest();

                runs(function () {
                    Ruby.call("Printing", "rho_searchPrinters_printerType_connectType{:p_type => " + Rho.Printer.PRINTER_TYPE_ZEBRA + ", :p_connectype => " + Rho.Printer.CONNECTION_TYPE_TCP + "}");
                });

                waitsFor(function () {
                    return true;
                }, 'Searching for Printers....', 5000);

                runs(function () {
                    displayTestResults(Ruby.getReturnedValue(), printers, "");
                    dispCurrentProcess("Can you see the STATUS_ERROR and Error Message in the results? ");
                });

                _result.waitForResponse();
            });
        }

        it("VTXXX-0011-searchPrinters Method(with only option \"devicePort\":80)", function () {
            printers = [];
            displayTestDescription("VTXXX-0011 | searchPrinters Method(with only option \"devicePort\")");
            displayTestInstruction("");
            displayTestExpectation("The printer should not be discovered with these settings and return error message for STATUS_ERROR.");

            _result.waitToRunTest();

            runs(function () {
                Ruby.call("Printing", "rho_searchPrinters_devicePort");
                Rho.Printer.searchPrinters({
                    "devicePort": 80
                }, searchPrinterCallback);
            });

            waitsFor(function () {
                return true;
            }, 'Searching for Printers....', 5000);

            runs(function () {
                displayTestResults(Ruby.getReturnedValue(), printers, "");
                dispCurrentProcess("Can you see the STATUS_ERROR and Error Message in the results? ");
            });

            _result.waitForResponse();
        });

        it("VTXXX-0012-stopSearch Method (without callback function)", function () {
            printers = [];
            displayTestDescription("VTXXX-0012 | stopSearch Method (without callback function)");
            displayTestInstruction("");
            displayTestExpectation("The search should be terminated and printer should not be discovered.");

            _result.waitToRunTest();

            runs(function () {
                // Let the printer be search first then use stop
                Ruby.call("Printing", "rho_stopSearch");
            });

            waitsFor(function () {
                return true;
            }, 'Searching for Printers....', 5000);

            runs(function () {
                displayTestResults(Ruby.getReturnedValue(), printers, "");
                dispCurrentProcess("Can you see any printer listed in the results? ");
            });

            _result.waitForResponse();
        });

        it("VTXXX-0013-stopSearch Method (with callback function)", function () {
            printers = [];
            displayTestDescription("VTXXX-0013 | stopSearch Method (with callback function)");
            displayTestInstruction("");
            displayTestExpectation("The search should be terminated and printer should not be discovered.");

            _result.waitToRunTest();

            runs(function () {
                // Let the printer be search first then use stop
                Ruby.call("Printing", "rho_stopSearch{:_type => \"callbk\"}");
            });

            waitsFor(function () {
                return true;
            }, 'Searching for Printers....', 5000);

            runs(function () {
                displayTestResults(Ruby.getReturnedValue(), printers, "");
                dispCurrentProcess("Can you see any printer listed in the results? ");
            });

            _result.waitForResponse();
        });

        it("VTXXX-0014-stopSearch Method (with anonymous function)", function () {
            printers = [];
            displayTestDescription("VTXXX-0014 | stopSearch Method (with anonymous function)");
            displayTestInstruction("");
            displayTestExpectation("The search should be terminated and printer should not be discovered.");

            _result.waitToRunTest();

            runs(function () {
                // Let the printer be search first then use stop
                Ruby.call("Printing", "rho_stopSearch{:_type => \"anony\"}");
            });

            waitsFor(function () {
                return true;
            }, 'Searching for Printers....', 5000);

            runs(function () {
                displayTestResults(Ruby.getReturnedValue(), printers, "");
                dispCurrentProcess("Can you see any printer listed in the results? ");
            });

            _result.waitForResponse();
        });

        it("VTXXX-0015-getPrinterByID Method ", function () {
            printers = [];
            displayTestDescription("VTXXX-0015 | getPrinterByID Method ");
            displayTestInstruction("");
            displayTestExpectation("The method should return an instance of the connected printer.");

            _result.waitToRunTest();

            runs(function () {
                Ruby.call("Printing", "rho_searchPrinters");
            });

            waitsFor(function () {
                return true;
            }, 'Searching for Printers....', 5000);

            runs(function () {
                Ruby.call("Printing", "rho_getPrinterByID");
            });

            runs(function () {
                displayTestResults(Ruby.getReturnedValue(), printers, "");
                dispCurrentProcess("Can you see Success Message in the results? ");
            });

            _result.waitForResponse();
        });

        it("VTXXX-0016-getPrinterByID Method without discovering the printer ", function () {
            printers = [];
            displayTestDescription("VTXXX-0016 | getPrinterByID Method without discovering the printer ");
            displayTestInstruction("");
            displayTestExpectation("The method should not return any instance of the disconnected printer and STATUS_ERROR should be returned with error message.");

            _result.waitToRunTest();

            runs(function () {
                Ruby.call("Printing", "rho_getPrinterByID_without_discovery");
            });

            runs(function () {
                displayTestResults(Ruby.getReturnedValue(), printers, "");
                dispCurrentProcess("Can you see Error Message in the results? ");
            });

            _result.waitForResponse();
        });

        it("VTXXX-0017-getPrinterByID Method with device turned off device ", function () {
            printers = [];
            displayTestDescription("VTXXX-0017 | getPrinterByID Method with device turned off device ");
            displayTestInstruction("");
            displayTestExpectation("The method should not return any instance of the disconnected printer and STATUS_ERROR should be returned with error message.");

            _result.waitToRunTest();

            waitsFor(function () {
                return true;
            }, 'Please Turn Off the Printer....', 10000);

            runs(function () {
                Ruby.call("Printing", "rho_searchPrinters");
            });

            waitsFor(function () {
                return true;
            }, 'Searching for Printers....', 5000);

            runs(function () {
                Ruby.call("Printing", "rho_getPrinterByID_without_discovery");
            });

            runs(function () {
                displayTestResults(Ruby.getReturnedValue(), printers, "");
                dispCurrentProcess("Can you see Error Message in the results? ");
            });

            _result.waitForResponse();
        });

        it("VTXXX-0018-connect Method (without callback function) ", function () {
            printers = [];
            displayTestDescription("VTXXX-0018 | connect Method (without callback function) ");
            displayTestInstruction("");
            displayTestExpectation("The string should be printed successfully on the printer.");

            _result.waitToRunTest();

            waitsFor(function () {
                return true;
            }, 'Please Turn On the Printer....', 30000);

            runs(function () {
                Ruby.call("Printing", "rho_searchPrinters");
            });

            waitsFor(function () {
                return true;
            }, 'Searching for Printers....', 5000);

            runs(function () {
                Ruby.call("Printing", "rho_connect");
                dispCurrentProcess("Did the Printer print the string \"Hello Printing!\"? ");
            });

            _result.waitForResponse();
        });

        it("VTXXX-0019-connect Method (with callback function) ", function () {
            displayTestDescription("VTXXX-0019 | connect Method (with callback function) ");
            displayTestInstruction("");
            displayTestExpectation("The callback should return STATUS_OK");

            _result.waitToRunTest();

            runs(function () {
                Ruby.call("Printing", "rho_connect_callback");
            });

            runs(function () {
                displayTestResults(Ruby.getReturnedValue(), printers, "");
                dispCurrentProcess("Did you get status as STATUS_OK? ");
            });

            _result.waitForResponse();
        });

        it("VTXXX-0020-connect Method (with anonymous function) ", function () {
            displayTestDescription("VTXXX-0020 | connect Method (with anonymous function) ");
            displayTestInstruction("");
            displayTestExpectation("The callback should return STATUS_OK");


            _result.waitToRunTest();

            runs(function () {
                Ruby.call("Printing", "rho_connect_anony");
            });

            runs(function () {
                displayTestResults(Ruby.getReturnedValue(), printers, "");
                dispCurrentProcess("Did you get status as STATUS_OK? ");
            });

            _result.waitForResponse();
        });

        it("VTXXX-0021-connect Method (with param \"timeout\") ", function () {
            displayTestDescription("VTXXX-0021 | connect Method (with param \"timeout\") ");
            displayTestInstruction("");
            displayTestExpectation("The Printer.isConnected should return STATUS_OK");

            _result.waitToRunTest();

            runs(function () {
                Ruby.call("Printing", "rho_connect_timeout{:duration => 20000}");
            });

            runs(function () {
                displayTestResults(Ruby.getReturnedValue(), printers, "");
                dispCurrentProcess("Did you get status as STATUS_OK? ");
            });

            _result.waitForResponse();
        });

        it("VTXXX-0022-connect Method (with param \"timeout\":0) ", function () {
            displayTestDescription("VTXXX-0022 | connect Method (with param \"timeout\":0) ");
            displayTestInstruction("");
            displayTestExpectation("The Printer.isConnected should return STATUS_TIMEOUT");

            _result.waitToRunTest();

            runs(function () {
                Ruby.call("Printing", "rho_connect_timeout{:duration => 0}");
            });

            runs(function () {
                displayTestResults(Ruby.getReturnedValue(), printers, "");
                dispCurrentProcess("Did you get the status STATUS_TIMEOUT? ");
            });

            _result.waitForResponse();
        });

        it("VTXXX-0023-connect Method (with param \"timeout\":1000) ", function () {
            displayTestDescription("VTXXX-0023 | connect Method (with param \"timeout\":1000) ");
            displayTestInstruction("");
            displayTestExpectation("The Printer.isConnected should return STATUS_TIMEOUT");

            _result.waitToRunTest();

            runs(function () {
                Ruby.call("Printing", "rho_connect_timeout{:duration => 1000}");
            });

            runs(function () {
                displayTestResults(Ruby.getReturnedValue(), printers, "");
                dispCurrentProcess("Did you get the status STATUS_TIMEOUT? ");
            });

            _result.waitForResponse();
        });

        it("VTXXX-0024-connect Method (with param \"timeout\":15000.5) ", function () {
            displayTestDescription("VTXXX-0024 | connect Method (with param \"timeout\":15000.5) ");
            displayTestInstruction("");
            displayTestExpectation("The method should return STATUS_ERROR due to the param value passed as float.");

            _result.waitToRunTest();

            runs(function () {
                Ruby.call("Printing", "rho_connect_timeout{:duration => 15000.5, :convType => \"fl_oat\"}");
            });

            runs(function () {
                displayTestResults(Ruby.getReturnedValue(), printers, "");
                dispCurrentProcess("Did you get the status STATUS_ERROR or error message? ");
            });

            _result.waitForResponse();
        });

        it("VTXXX-0025-connect Method (with param \"timeout\") with device disconnected ", function () {
            displayTestDescription("VTXXX-0025 | connect Method (with param \"timeout\") with device disconnected ");
            displayTestInstruction("");
            displayTestExpectation("The Printer.isConnected should return STATUS_ERROR or STATUS_NOT_FOUND.");

            _result.waitToRunTest();

            waitsFor(function () {
                return true;
            }, 'Please Turn OFF the Printer....', 10000);

            runs(function () {
                Ruby.call("Printing", "rho_connect_timeout{:duration => 20000}");
            });

            runs(function () {
                displayTestResults(Ruby.getReturnedValue(), printers, "");
                dispCurrentProcess("Did you get the status STATUS_ERROR or STATUS_NOT_FOUND? ");
            });

            _result.waitForResponse();
        });

        // Need to write tests for "updateState" after implementation from the developer(if applicable)

        it("VTXXX-0030-disconnect Method (without callback function) ", function () {
            printers = [];
            displayTestDescription("VTXXX-0030 | disconnect Method (without callback function) ");
            displayTestInstruction("");
            displayTestExpectation("The method should execute without errors.");

            _result.waitToRunTest();

            waitsFor(function () {
                return true;
            }, 'Please Turn On the Printer....', 30000);

            runs(function () {
                Ruby.call("Printing", "rho_searchPrinters");
            });

            waitsFor(function () {
                return true;
            }, 'Searching for Printers....', 5000);

            runs(function () {
                Ruby.call("Printing", "rho_disconnect");
            });

            runs(function () {
                displayTestResults(Ruby.getReturnedValue(), printers, "");
                dispCurrentProcess("Did the method execute without errors? ");
            });

            _result.waitForResponse();
        });

        it("VTXXX-0031-disconnect Method (with callback function) ", function () {
            displayTestDescription("VTXXX-0031 | disconnect Method (with callback function) ");
            displayTestInstruction("");
            displayTestExpectation("The method should execute without errors.");

            _result.waitToRunTest();

            runs(function () {
                Ruby.call("Printing", "rho_disconnect_callback");
            });

            runs(function () {
                displayTestResults(Ruby.getReturnedValue(), printers, "");
                dispCurrentProcess("Did the method execute without errors? ");
            });

            _result.waitForResponse();
        });

        it("VTXXX-0032-disconnect Method (with anonymous function) ", function () {
            displayTestDescription("VTXXX-0032 | disconnect Method (with anonymous function) ");
            displayTestInstruction("");
            displayTestExpectation("The method should execute without errors.");

            _result.waitToRunTest();

            runs(function () {
                Ruby.call("Printing", "rho_disconnect_anony");
            });

            runs(function () {
                displayTestResults(Ruby.getReturnedValue(), printers, "");
                dispCurrentProcess("Did the method execute without errors? ");
            });

            _result.waitForResponse();
        });

        it("VTXXX-0033-disconnect Method (sending string to print)) ", function () {
            displayTestDescription("VTXXX-0033 | disconnect Method (sending string to print) ");
            displayTestInstruction("");
            displayTestExpectation("The string should not be printed on the printer.");

            _result.waitToRunTest();

            runs(function () {
                Ruby.call("Printing", "rho_disconnect_and_print");
            });

            runs(function () {
                displayTestResults(Ruby.getReturnedValue(), printers, "");
                dispCurrentProcess("Did the printer print the given string? ");
            });

            _result.waitForResponse();
        });

        it("VTXXX-0034-disconnect Method (call this before the connect method) ", function () {
            displayTestDescription("VTXXX-0034 | disconnect Method (call this before the connect method) ");
            displayTestInstruction("");
            displayTestExpectation("The method should execute without any error.");

            _result.waitToRunTest();

            runs(function () {
                Ruby.call("Printing", "rho_disconnect_disconnect");
            });

            runs(function () {
                displayTestResults(Ruby.getReturnedValue(), printers, "");
                dispCurrentProcess("Did the method execute without errors? ");
            });

            _result.waitForResponse();
        });

        it("VTXXX-0035-disconnect Method with callback (call this before the connect method) ", function () {
            displayTestDescription("VTXXX-0035 | disconnect Method with callback (call this before the connect method) ");
            displayTestInstruction("");
            displayTestExpectation("The method should execute with STATUS_ERROR.");

            _result.waitToRunTest();

            runs(function () {
                Ruby.call("Printing", "rho_disconnect_callback_disconnect");
            });

            runs(function () {
                displayTestResults(Ruby.getReturnedValue(), printers, "");
                dispCurrentProcess("Did you get the status STATUS_ERROR ? ");
            });

            _result.waitForResponse();
        });

        it("VTXXX-0036-printFile Method (without callback function for jpg file) ", function () {
            displayTestDescription("VTXXX-0036 | printFile Method (without callback function) ");
            displayTestInstruction("");
            displayTestExpectation("The file should be sent successfully to the printer.");

            _result.waitToRunTest();

            runs(function () {
                var fileURI = Rho.RhoFile.join(filesMediaPath, "flower.jpg");
                Ruby.call("Printing", "rho_printFile{:fileURI => " + fileURI + "}");
                waitsFor(function () {
                    return print_str;
                }, '10sec wait for print', 10000);
            });

            runs(function () {
                displayTestResults(Ruby.getReturnedValue(), printers, "");
                dispCurrentProcess("Is the 'flower.jpg' file sent successfully to the printer ? ");
            });

            _result.waitForResponse();
        });

        it("VTXXX-0037-printFile Method (with callback function for jpg file) ", function () {
            displayTestDescription("VTXXX-0037 | printFile Method (with callback function) ");
            displayTestInstruction("");
            displayTestExpectation("The file should be sent successfully to the printer.");

            _result.waitToRunTest();

            runs(function () {
                var fileURI = Rho.RhoFile.join(filesMediaPath, "simple_sun.jpg");
                Ruby.call("Printing", "rho_printFile_callback{:fileURI => " + fileURI + "}");
                waitsFor(function () {
                    return print_str;
                }, '10sec wait for print', 10000);
            });

            runs(function () {
                displayTestResults(Ruby.getReturnedValue(), printers, "");
                dispCurrentProcess("Is the 'simple_sun.jpg' file sent successfully to the printer ? ");
            });

            _result.waitForResponse();
        });

        it("VTXXX-0038-printFile Method (with anonymous function for jpg file) ", function () {
            displayTestDescription("VTXXX-0038 | printFile Method (with anonymous function for jpg file) ");
            displayTestInstruction("");
            displayTestExpectation("The file should be sent successfully to the printer.");

            _result.waitToRunTest();

            runs(function () {
                var fileURI = Rho.RhoFile.join(filesMediaPath, "motorola_logo.jpg");
                Ruby.call("Printing", "rho_printFile_anony{:fileURI => " + fileURI + "}");
                waitsFor(function () {
                    return print_str;
                }, '10sec wait for print', 10000);
            });

            runs(function () {
                displayTestResults(Ruby.getReturnedValue(), printers, "");
                dispCurrentProcess("Is the 'motorola_logo.jpg' file sent successfully to the printer ? ");
            });

            _result.waitForResponse();
        });

        it("VTXXX-0039-printFile Method (without callback function for png file) ", function () {
            displayTestDescription("VTXXX-0039 | printFile Method (without callback function for png file) ");
            displayTestInstruction("");
            displayTestExpectation("The file should be sent successfully to the printer.");

            _result.waitToRunTest();

            runs(function () {
                var fileURI = Rho.RhoFile.join(filesMediaPath, "basketball.png");
                Ruby.call("Printing", "rho_printFile{:fileURI => " + fileURI + "}");
                waitsFor(function () {
                    return print_str;
                }, '10sec wait for print', 10000);
            });

            runs(function () {
                displayTestResults(Ruby.getReturnedValue(), printers, "");
                dispCurrentProcess("Is the 'basketball.png' file sent successfully to the printer ? ");
            });

            _result.waitForResponse();
        });

        it("VTXXX-0040-printFile Method (with callback function for png file) ", function () {
            displayTestDescription("VTXXX-0040 | printFile Method (with callback function for png file) ");
            displayTestInstruction("");
            displayTestExpectation("The file should be sent successfully to the printer.");

            _result.waitToRunTest();

            runs(function () {
                var fileURI = Rho.RhoFile.join(filesMediaPath, "swirl.png");
                Ruby.call("Printing", "rho_printFile_callback{:fileURI => " + fileURI + "}");
                waitsFor(function () {
                    return print_str;
                }, '10sec wait for print', 10000);
            });

            runs(function () {
                displayTestResults(Ruby.getReturnedValue(), printers, "");
                dispCurrentProcess("Is the 'swirl.png' file sent successfully to the printer ? ");
            });

            _result.waitForResponse();
        });

        it("VTXXX-0041-printFile Method (with anonymous function for png file) ", function () {
            displayTestDescription("VTXXX-0041 | printFile Method (with anonymous function for png file) ");
            displayTestInstruction("");
            displayTestExpectation("The file should be sent successfully to the printer.");

            _result.waitToRunTest();

            runs(function () {
                var fileURI = Rho.RhoFile.join(filesMediaPath, "vine.png");
                Ruby.call("Printing", "rho_printFile_anony{:fileURI => " + fileURI + "}");
                waitsFor(function () {
                    return print_str;
                }, '10sec wait for print', 10000);
            });

            runs(function () {
                displayTestResults(Ruby.getReturnedValue(), printers, "");
                dispCurrentProcess("Is the 'vine.png' file sent successfully to the printer ? ");
            });

            _result.waitForResponse();
        });

        if (platform == "WINDOWS") {
            it("VTXXX-0042-printFile Method (without callback function for bmp file) ", function () {
                displayTestDescription("VTXXX-0042 | printFile Method (without callback function for bmp file) ");
                displayTestInstruction("");
                displayTestExpectation("The file should be sent successfully to the printer.");

                _result.waitToRunTest();

                runs(function () {
                    var fileURI = Rho.RhoFile.join(filesMediaPath, "dots.bmp");
                    Ruby.call("Printing", "rho_printFile{:fileURI => " + fileURI + "}");
                    waitsFor(function () {
                        return print_str;
                    }, '10sec wait for print', 10000);
                });

                runs(function () {
                    displayTestResults(Ruby.getReturnedValue(), printers, "");
                    dispCurrentProcess("Is the 'dots.bmp' file sent successfully to the printer ? ");
                });

                _result.waitForResponse();
            });

            it("VTXXX-0043-printFile Method (with callback function for bmp file) ", function () {
                displayTestDescription("VTXXX-0043 | printFile Method (with callback function for bmp file) ");
                displayTestInstruction("");
                displayTestExpectation("The file should be sent successfully to the printer.");

                _result.waitToRunTest();

                runs(function () {
                    var fileURI = Rho.RhoFile.join(filesMediaPath, "grass.bmp");
                    Ruby.call("Printing", "rho_printFile_callback{:fileURI => " + fileURI + "}");
                    waitsFor(function () {
                        return print_str;
                    }, '10sec wait for print', 10000);
                });

                runs(function () {
                    displayTestResults(Ruby.getReturnedValue(), printers, "");
                    dispCurrentProcess("Is the 'grass.bmp' file sent successfully to the printer ? ");
                });

                _result.waitForResponse();
            });

            it("VTXXX-0044-printFile Method (with anonymous function for bmp file) ", function () {
                displayTestDescription("VTXXX-0044 | printFile Method (with anonymous function for bmp file) ");
                displayTestInstruction("");
                displayTestExpectation("The file should be sent successfully to the printer.");

                _result.waitToRunTest();

                runs(function () {
                    var fileURI = Rho.RhoFile.join(filesMediaPath, "motobike.bmp");
                    Ruby.call("Printing", "rho_printFile_anony{:fileURI => " + fileURI + "}");
                    waitsFor(function () {
                        return print_str;
                    }, '10sec wait for print', 10000);
                });

                runs(function () {
                    displayTestResults(Ruby.getReturnedValue(), printers, "");
                    dispCurrentProcess("Is the 'motobike.bmp' file sent successfully to the printer ? ");
                });

                _result.waitForResponse();
            });
        }

        it("VTXXX-0045-printFile Method (without callback function for pdf file) ", function () {
            displayTestDescription("VTXXX-0045 | printFile Method (without callback function for pdf file) ");
            displayTestInstruction("");
            displayTestExpectation("The file should be sent successfully to the printer.");

            _result.waitToRunTest();

            runs(function () {
                var fileURI = Rho.RhoFile.join(filesMediaPath, "pdfSample.pdf");
                Ruby.call("Printing", "rho_printFile{:fileURI => " + fileURI + "}");
                waitsFor(function () {
                    return print_str;
                }, '10sec wait for print', 10000);
            });

            runs(function () {
                displayTestResults(Ruby.getReturnedValue(), printers, "");
                dispCurrentProcess("Is the 'pdfSample.pdf' file sent successfully to the printer ? ");
            });

            _result.waitForResponse();
        });

        it("VTXXX-0046-printFile Method (with callback function for pdf file) ", function () {
            displayTestDescription("VTXXX-0046 | printFile Method (with callback function for pdf file) ");
            displayTestInstruction("");
            displayTestExpectation("The file should be sent successfully to the printer.");

            _result.waitToRunTest();

            runs(function () {
                var fileURI = Rho.RhoFile.join(filesMediaPath, "pdfSample.pdf");
                Ruby.call("Printing", "rho_printFile_callback{:fileURI => " + fileURI + "}");
                waitsFor(function () {
                    return print_str;
                }, '10sec wait for print', 10000);
            });

            runs(function () {
                displayTestResults(Ruby.getReturnedValue(), printers, "");
                dispCurrentProcess("Is the 'pdfSample.pdf' file sent successfully to the printer ? ");
            });

            _result.waitForResponse();
        });

        it("VTXXX-0047-printFile Method (with anonymous function for pdf file) ", function () {
            displayTestDescription("VTXXX-0047 | printFile Method (with anonymous function for pdf file) ");
            displayTestInstruction("");
            displayTestExpectation("The file should be sent successfully to the printer.");

            _result.waitToRunTest();

            runs(function () {
                var fileURI = Rho.RhoFile.join(filesMediaPath, "pdfSample.pdf");
                Ruby.call("Printing", "rho_printFile_anony{:fileURI => " + fileURI + "}");
                waitsFor(function () {
                    return print_str;
                }, '10sec wait for print', 10000);
            });

            runs(function () {
                displayTestResults(Ruby.getReturnedValue(), printers, "");
                dispCurrentProcess("Is the 'pdfSample.pdf' file sent successfully to the printer ? ");
            });

            _result.waitForResponse();
        });

        it("VTXXX-0048-printFile Method (with callback function and No File specified in fileURI) ", function () {
            displayTestDescription("VTXXX-0048 | printFile Method (with callback function and No File specified in fileURI) ");
            displayTestInstruction("");
            displayTestExpectation("No file should be sent to the printer. The callback should return STATUS_ERROR.");

            _result.waitToRunTest();

            runs(function () {
                Ruby.call("Printing", "rho_printFile_callback");
            });

            runs(function () {
                displayTestResults(Ruby.getReturnedValue(), printers, "");
                dispCurrentProcess("Does the test return STATUS_ERROR and no file is sent to the printer ? ");
            });

            _result.waitForResponse();
        });

        it("VTXXX-0049-printFile Method (with callback function and fileURI has no file at that location with that specified name) ", function () {
            displayTestDescription("VTXXX-0049 | printFile Method (with callback function and fileURI has no file at that location with that specified name) ");
            displayTestInstruction("");
            displayTestExpectation("No file should be sent to the printer. The callback should return STATUS_ERROR.");

            _result.waitToRunTest();

            runs(function () {
                var fileURI = Rho.RhoFile.join(filesMediaPath, "abcdef.jpg");
                Ruby.call("Printing", "rho_printFile_callback{:fileURI => " + fileURI + "}");
                waitsFor(function () {
                    return print_str;
                }, '10sec wait for print', 10000);
            });

            runs(function () {
                displayTestResults(Ruby.getReturnedValue(), printers, "");
                dispCurrentProcess("Does the test return STATUS_ERROR and no file is sent to the printer ? ");
            });

            _result.waitForResponse();
        });

        it("VTXXX-0050-printRawString Method (without callback function for ZPL Command) ", function () {
            displayTestDescription("VTXXX-0050 | printRawString Method (without callback function for ZPL Command) ");
            displayTestInstruction("");
            displayTestExpectation("The raw string should be sent successfully and printed on the printer.");

            _result.waitToRunTest();

            runs(function () {
                var command = "^XA^FO50,50^ADN,36,20^FDTesting^FS^XZ";
                Ruby.call("Printing", "rho_printRawString{:cmmd => " + command + "}");
                waitsFor(function () {
                    return print_str;
                }, '10sec wait for print', 10000);
            });

            runs(function () {
                displayTestResults(Ruby.getReturnedValue(), printers, "");
                dispCurrentProcess("Is the raw string printed on the printer ? ");
            });

            _result.waitForResponse();
        });

        it("VTXXX-0051-printRawString Method (with callback function for ZPL Command) ", function () {
            displayTestDescription("VTXXX-0051 | printRawString Method (with callback function for ZPL Command) ");
            displayTestInstruction("");
            displayTestExpectation("The raw string should be sent successfully and printed on the printer. Also return STATUS_SUCCESS.");

            _result.waitToRunTest();

            runs(function () {
                var command = "^XA^FO50,50^ADN,36,20^FDTesting^FS^XZ";
                Ruby.call("Printing", "rho_printRawString_callback{:cmmd => " + command + "}");
                waitsFor(function () {
                    return print_str;
                }, '10sec wait for print', 10000);
            });

            runs(function () {
                displayTestResults(Ruby.getReturnedValue(), printers, "");
                dispCurrentProcess("Is the raw string printed on the printer ? ");
            });

            _result.waitForResponse();
        });

        it("VTXXX-0052-printRawString Method (with anonymous function for ZPL Command) ", function () {
            displayTestDescription("VTXXX-0052 | printRawString Method (with anonymous function for ZPL Command) ");
            displayTestInstruction("");
            displayTestExpectation("The raw string should be sent successfully and printed on the printer. Also return STATUS_SUCCESS.");

            _result.waitToRunTest();

            runs(function () {
                var command = "^XA^FO50,50^ADN,36,20^FDTesting^FS^XZ";
                Ruby.call("Printing", "rho_printRawString_anony{:cmmd => " + command + "}");
                waitsFor(function () {
                    return print_str;
                }, '10sec wait for print', 10000);
            });

            runs(function () {
                displayTestResults(Ruby.getReturnedValue(), printers, "");
                dispCurrentProcess("Is the raw string printed on the printer ? ");
            });

            _result.waitForResponse();
        });

        it("VTXXX-0053-printRawString Method (without callback function for CPCL Command) ", function () {
            displayTestDescription("VTXXX-0053 | printRawString Method (without callback function for CPCL Command) ");
            displayTestInstruction("");
            displayTestExpectation("The raw string should be sent successfully and printed on the printer.");

            _result.waitToRunTest();

            runs(function () {
                var command = "! 0.3937 200 200 1 1 IN-INCHEST 4 0 0 0 1 cm = 0.3937” IN-DOTST 4 0 0 48 1 mm = 8 dots B 128 1 1 48 16 112 UNITST 4 0 48 160 UNITSFORMPRINT";
                Ruby.call("Printing", "rho_printRawString{:cmmd => " + command + "}");
                waitsFor(function () {
                    return print_str;
                }, '10sec wait for print', 10000);
            });

            runs(function () {
                displayTestResults(Ruby.getReturnedValue(), printers, "");
                dispCurrentProcess("Is the raw string printed on the printer ? ");
            });

            _result.waitForResponse();
        });

        it("VTXXX-0054-printRawString Method (with callback function for CPCL Command) ", function () {
            displayTestDescription("VTXXX-0054 | printRawString Method (with callback function for CPCL Command) ");
            displayTestInstruction("");
            displayTestExpectation("The raw string should be sent successfully and printed on the printer. Also return STATUS_SUCCESS.");

            _result.waitToRunTest();

            runs(function () {
                var command = "! 0.3937 200 200 1 1 IN-INCHEST 4 0 0 0 1 cm = 0.3937” IN-DOTST 4 0 0 48 1 mm = 8 dots B 128 1 1 48 16 112 UNITST 4 0 48 160 UNITSFORMPRINT";
                Ruby.call("Printing", "rho_printRawString_callback{:cmmd => " + command + "}");
                waitsFor(function () {
                    return print_str;
                }, '10sec wait for print', 10000);
            });

            runs(function () {
                displayTestResults(Ruby.getReturnedValue(), printers, "");
                dispCurrentProcess("Is the raw string printed on the printer ? ");
            });

            _result.waitForResponse();
        });

        it("VTXXX-0055-printRawString Method (with anonymous function for CPCL Command) ", function () {
            displayTestDescription("VTXXX-0055 | printRawString Method (with anonymous function for CPCL Command) ");
            displayTestInstruction("");
            displayTestExpectation("The raw string should be sent successfully and printed on the printer. Also return STATUS_SUCCESS.");

            _result.waitToRunTest();

            runs(function () {
                var command = "! 0.3937 200 200 1 1 IN-INCHEST 4 0 0 0 1 cm = 0.3937” IN-DOTST 4 0 0 48 1 mm = 8 dots B 128 1 1 48 16 112 UNITST 4 0 48 160 UNITSFORMPRINT";
                Ruby.call("Printing", "rho_printRawString_anony{:cmmd => " + command + "}");
                waitsFor(function () {
                    return print_str;
                }, '10sec wait for print', 10000);
            });

            runs(function () {
                displayTestResults(Ruby.getReturnedValue(), printers, "");
                dispCurrentProcess("Is the raw string printed on the printer ? ");
            });

            _result.waitForResponse();
        });

        it("VTXXX-0056-printRawString Method with callback (with the printer turned off) ", function () {
            displayTestDescription("VTXXX-0056 | printRawString Method with callback (with the printer turned off) ");
            displayTestInstruction("");
            displayTestExpectation("The raw string should not be sent and printed on the printer. The callback function should return STATUS_ERROR.");

            _result.waitToRunTest();

            waitsFor(function () {
                return true;
            }, 'Turn OFF the Printer', 5000);

            runs(function () {
                var command = "^XA^FO50,50^ADN,36,20^FDTesting^FS^XZ";
                Ruby.call("Printing", "rho_printRawString_callback{:cmmd => " + command + "}");
                waitsFor(function () {
                    return print_str;
                }, '10sec wait for print', 10000);
            });

            runs(function () {
                displayTestResults(Ruby.getReturnedValue(), printers, "");
                dispCurrentProcess("Is the method returning with error ? ");
            });

            _result.waitForResponse();
        });

        it("VTXXX-0057-printRawString Method with callback (with the printer's blue tooth[applicable for Bluetooth Printers only], tcp/network[applicable for network printers], USB[applicable for USB printers] turned off/disconnected) ", function () {
            printers = [];
            displayTestDescription("VTXXX-0057 | printRawString Method with callback (with the printer's blue tooth[applicable for Bluetooth Printers only], tcp/network[applicable for network printers], USB[applicable for USB printers] turned off/disconnected) ");
            displayTestInstruction("");
            displayTestExpectation("The raw string should not be sent and printed on the printer. The callback function should return STATUS_ERROR.");

            _result.waitToRunTest();

            runs(function () {
                Ruby.call("Printing", "rho_searchPrinters");
            });

            waitsFor(function () {
                return true;
            }, 'Searching for Printers....', 5000);

            waitsFor(function () {
                return true;
            }, 'Turn OFF(Bluetooth or TCP/Network or USB) of the Printer', 5000);

            runs(function () {
                var command = "^XA^FO50,50^ADN,36,20^FDTesting^FS^XZ";
                Ruby.call("Printing", "rho_printRawString_callback{:cmmd => " + command + "}");
                waitsFor(function () {
                    return print_str;
                }, '10sec wait for print', 10000);
            });

            runs(function () {
                displayTestResults(Ruby.getReturnedValue(), printers, "");
                dispCurrentProcess("Is the method returning with error ? ");
            });

            _result.waitForResponse();
        });

        // Need to write tests for "requestState" after implementation and more info from the developer
    });
});