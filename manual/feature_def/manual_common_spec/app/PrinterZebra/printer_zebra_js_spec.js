describe("Printer Zebra Manual Test", function() {
	var ENABLE9K = 9000;
	var ENABLE10K = 10000;
	var ENABLE60K = 60000;
	var ENABLE120K = 120000;
	var ENABLE5MIN = 300000;
	var ENABLE30MIN = 1800000;
	var enableFlag = false;
	var callbackstatus = false;
	var searchFlag = false;
	//var enumData = Rho.PrinterZebra.enumerateSupportedTypes();
	var printers_array = [];
	var printers_errors = [];
	var discovery_finished = false;
	var connect_type = '';
	var macipaddress = '';
	var stopsearch = '';
	var calback_flag = false;
	var deviceaddressFlag = false;
	var ZPLstr = "^XA^FO50,50^ADN,36,20^FDZebraPrinting^FS^XZ"; 
	var CCPLstr = "! 0.3937 200 200 1 1IN-INCHEST 4 0 0 0 1 cm = 0.3937”IN-DOTST 4 0 0 48 1 mm = 8 dotsB 128 1 1 48 16 112 UNITST40 48 160 UNITSFORMPRINT"

	beforeEach(function() {
		document.getElementById("actResult").innerHTML = "init";
		discovery_finished = false;
		searchFlag = false;
		connectFlag = false;
		stopsearch ='';
		calback_flag = false
		deviceaddressFlag = false;

	});

	afterEach(function() {

	});

	it("VTXXX-0001 | EnumerateSupportedTypes Method (without callback function)", function() {
		runs(function() {
			setObjective("VTXXX-0001 | EnumerateSupportedTypes Method (without callback function)");
			setInstruction("");
			setExpected("Method should return the result as names/list of printer types that are supported in this build.");
		});

		runs(function() {
			var printerTypes = Rho.PrinterZebra.enumerateSupportedTypes();
			
			waitsFor(function() {
			}, "10 sec Waiting for enumerate", ENABLE10K);
			
			displayResult("VTXXX-0001|enumerateSupportedTypes", printerTypes.toString());
		});

		runs(function() {
			setAction("Do you see the correct output ?");
			waitsFor(function() {
				return document.getElementById("actResult").innerHTML != "init";
			}, "Timed out waiting for tester to respond", ENABLE30MIN);
			runs(function() {
				expect("pass").toEqual(document.getElementById("actResult").innerHTML);
			});
		});
	});

    it("VTXXX-0002 | enumerateSupportedTypes Method (with callback function)", function() {
		runs(function() {
			setObjective("VTXXX-0002 | enumerateSupportedTypes Method (with callback function)"); 
			setInstruction(""); 
			setExpected("Method should return the result as names/list of printer types that are supported in this build.");
		});

		runs(function() {
			Rho.PrinterZebra.enumerateSupportedTypes(enumerateCallback);
		});
		
		waitsFor(function() {
    	}, "10 sec waiting for enumerate", ENABLE10K);
		
		
		runs(function() {
			setAction("Have you seen the correct output ?");
			waitsFor(function() {
				return document.getElementById("actResult").innerHTML != "init";
			}, "Timed out waiting for tester to respond", ENABLE30MIN);
			runs(function() {
				expect("pass").toEqual(document.getElementById("actResult").innerHTML);
			});
		});
	});	
		
	

	it("VTXXX-0003 | enumerateSupportedTypes Method (with anonymous function)", function() {
		runs(function() {
			setObjective("VTXXX-0003 | enumerateSupportedTypes Method (with anonymous function)"); 
			setInstruction(""); 
			setExpected("Method should return the result as names/list of printer types that are supported in this build.");
		});

		runs(function() {
			Rho.PrinterZebra.enumerateSupportedTypes(function(data) {
				enumerateCallback(data);
			});
		});
		
		waitsFor(function() {
    	
		}, "10 sec waiting for enumerate", ENABLE10K);

		runs(function() {
			setAction("Have you seen the correct output ?");
			waitsFor(function() {
				return document.getElementById("actResult").innerHTML != "init";
			}, "Timed out waiting for tester to respond", ENABLE30MIN);
			runs(function() {
				expect("pass").toEqual(document.getElementById("actResult").innerHTML);
			});
		});
	});

	it("VTXXX-0004|searchPrinters Method(default options)", function() {
		runs(function() {
			setObjective("VTXXX-0004|searchPrinters Method(default options)"); 
			setInstruction("Connect the Zebra printer device using (bluetooth/tcp/usb). Call searchPrinters"); 
			setExpected("The printer connected with the device using (bluetooth/tcp/usb) should be discovered successfully and return STATUS_SUCCESS.");
		}); 
		
		runs(function() {
			PrinterConnectiontype();
		}); 
		
		runs(function() {
			Rho.PrinterZebra.searchPrinters({}, searchPrinterCallback);
		});
		
		waitsFor(function() {
			return discovery_finished;
		}, '120sec waiting for Search printer', ENABLE120K);

		runs(function() {
			displaySearchResults(printers_array, printers_errors);
		}); 
			
		runs(function() {
			setAction("Have you seen the correct output ?");
			waitsFor(function() {
				return document.getElementById("actResult").innerHTML != "init";
			}, "Timed out waiting for tester to respond", ENABLE30MIN);
			runs(function() {
				expect("pass").toEqual(document.getElementById("actResult").innerHTML);
			});
		});
	});

	it("VTXXX-0005|searchPrinters Method(with options 'printerType' and 'connectionType')", function() {
		runs(function() {
			setObjective("VTXXX-0005|searchPrinters Method(with options 'printerType' and 'connectionType')"); 
			setInstruction("Connect the Zebra printer device using (bluetooth/tcp/usb). Call searchPrinters"); 
			setExpected("The printer connected with the device using bluetooth should be discovered successfully and return STATUS_SUCCESS.");
		}); 
		
		runs(function() {
			PrinterConnectiontype();
		}); 

		runs(function() {
			Rho.PrinterZebra.searchPrinters({
				"printerType": Printer.PRINTER_TYPE_ZEBRA,
				"connectionType": connect_type
			}, searchPrinterCallback);
		});
		
		waitsFor(function() {
				return discovery_finished;
		}, '120sec waiting for Search printer', ENABLE120K);

		runs(function() {
			displaySearchResults(printers_array, printers_errors);
		}); 
		
		runs(function() {
			setAction("Have you seen the correct output ?");
			waitsFor(function() {
				return document.getElementById("actResult").innerHTML != "init";
			}, "Timed out waiting for tester to respond", ENABLE30MIN);
			runs(function() {
				expect("pass").toEqual(document.getElementById("actResult").innerHTML);
			});
		});
	});

	it("VTXXX-0006|searchPrinters Method(with options 'printerType', 'connectionType', 'timeout')", function() {
		runs(function() {
			setObjective("VTXXX-0006|searchPrinters Method(with options 'printerType', 'connectionType', 'timeout')"); setInstruction("Connect the Zebra printer device using (bluetooth/tcp/usb). Call searchPrinters"); 
			setExpected("The printer connected with the device using bluetooth should be discovered successfully and return STATUS_SUCCESS.");
		}); 
		
		runs(function() {
			PrinterConnectiontype();
		}); 

		runs(function() {
			Rho.PrinterZebra.searchPrinters({
				"printerType": Printer.PRINTER_TYPE_ZEBRA,
				"connectionType": connect_type,
				"timeout": 15000
			}, searchPrinterCallback);
		});
		
		waitsFor(function() {
			return discovery_finished;
		}, '120sec waiting for Search printer', ENABLE120K);

		runs(function() {
			displaySearchResults(printers_array, printers_errors);
		}); 
		
		runs(function() {
			setAction("Have you seen the correct output ?");
			waitsFor(function() {
				return document.getElementById("actResult").innerHTML != "init";
			}, "Timed out waiting for tester to respond", ENABLE30MIN);
			runs(function() {
				expect("pass").toEqual(document.getElementById("actResult").innerHTML);
			});
		});
	});

	it("VTXXX-0007|searchPrinters Method(with only option 'timeout')", function() {
		runs(function() {
			setObjective("VTXXX-0007|searchPrinters Method(with only option 'timeout')"); 
			setInstruction("Connect the Zebra printer device using (bluetooth/tcp/usb). Call searchPrinters"); 
			setExpected("The printer connected with the device using bluetooth should be discovered successfully and return STATUS_SUCCESS.");
		}); 
		
		runs(function() {
			PrinterConnectiontype();
		}); 

		runs(function() {
			Rho.PrinterZebra.searchPrinters({
				"timeout": 15000
			}, searchPrinterCallback);
		
		});
		
		waitsFor(function() {
			return discovery_finished;
		}, '120sec waiting for Search printer', ENABLE120K);

		runs(function() {
			displaySearchResults(printers_array, printers_errors);
		}); 
		runs(function() {
			setAction("Have you seen the correct output ?");
			waitsFor(function() {
				return document.getElementById("actResult").innerHTML != "init";
			}, "Timed out waiting for tester to respond", ENABLE30MIN);
			runs(function() {
				expect("pass").toEqual(document.getElementById("actResult").innerHTML);
			});
		});
	});
	
	it("VTXXX-0008|searchPrinters Method(with only option 'deviceAddress')", function() {
		runs(function() {
			setObjective("VTXXX-0008|searchPrinters Method(with only option 'deviceAddress')"); 
			setInstruction("Connect the Zebra printer device using (bluetooth/tcp/usb). Call searchPrinters"); 
			setExpected("The printer connected with the device using bluetooth should be discovered successfully and return STATUS_SUCCESS.");
		}); 
		
		runs(function() {
			PrinterConnectiontype();
		}); 
			
		runs(function() {
			macipaddress = Rho.PrinterZebra.deviceAddress;
			document.getElementById("deviceAddress").innerHTML = "Device Address:" +macipaddress;
			setTimeout(function() {
				deviceaddressFlag = true;
			}, ENABLE9K);
		}); 
		
		waitsFor(function() {
			return deviceaddressFlag;
		}, '10sec wait to get connection type', ENABLE10K);

		runs(function() {
			Rho.PrinterZebra.searchPrinters({"deviceAddress":macipaddress}, searchPrinterCallback);
		});
		
		waitsFor(function() {
				return discovery_finished;
		}, '120sec waiting for Search printer', ENABLE120K);

		runs(function() {
			displaySearchResults(printers_array, printers_errors);
		}); 
		
		runs(function() {
			setAction("Have you seen the correct output ?");
			waitsFor(function() {
				return document.getElementById("actResult").innerHTML != "init";
			}, "Timed out waiting for tester to respond", ENABLE30MIN);
			runs(function() {
				expect("pass").toEqual(document.getElementById("actResult").innerHTML);
			});
		});
	});	
	
	it("VTXXX-0009|searchPrinters Method(with options 'printerType', 'connectionType', 'timeout' and 'deviceAddress')", function() {
		runs(function() {
			setObjective("searchPrinters Method(with options 'printerType', 'connectionType', 'timeout' and 'deviceAddress')"); setInstruction("Connect the Zebra printer device using (bluetooth/tcp/usb). Call searchPrinters"); 
			setExpected("The printer connected with the device using bluetooth should be discovered successfully and return STATUS_SUCCESS.");
		}); 
		runs(function() {
			PrinterConnectiontype();
		}); 
			
		runs(function() {
			macipaddress = Rho.PrinterZebra.deviceAddress;
			document.getElementById("deviceAddress").innerHTML = "Device Address:" +macipaddress;
			setTimeout(function() {
				deviceaddressFlag = true;
			}, ENABLE9K);
		}); 
		waitsFor(function() {
			return deviceaddressFlag;
		}, '10sec wait to get connection type', ENABLE10K);

		runs(function() {
			Rho.PrinterZebra.searchPrinters({"printerType":Printer.PRINTER_TYPE_ZEBRA, "connectionType":connect_type, "timeout":15000, "deviceAddress":macipaddress}, searchPrinterCallback);
		});
		waitsFor(function() {
			return discovery_finished;
		}, '120sec waiting for Search printer', ENABLE120K);

		runs(function() {
			displaySearchResults(printers_array, printers_errors);
		}); 
		
		runs(function() {
			setAction("Have you seen the correct output ?");
			waitsFor(function() {
				return document.getElementById("actResult").innerHTML != "init";
			}, "Timed out waiting for tester to respond", ENABLE30MIN);
			runs(function() {
				expect("pass").toEqual(document.getElementById("actResult").innerHTML);
			});
		});
	});	
	
/*	it("VTXXX-0010|searchPrinters Method for non-zebra printer(with options 'printerType' and 'connectionType')", function() {
		runs(function() {
			setObjective("searchPrinters Method for non-zebra printer(with options 'printerType' and 'connectionType')"); 
			setInstruction("Connect the Zebra printer device using (bluetooth/tcp/usb). Call searchPrinters"); 
			setExpected(" The printer should not be discovered with these settings and return error message for STATUS_ERROR.");
		}); 

		runs(function() {
			Rho.PrinterZebra.searchPrinters({"printerType":Printer.PRINTER_TYPE_ZEBRA, "connectionType":Rho.PrinterZebra.CONNECTION_TYPE_TCP}, searchPrinterCallback);
		});
		waitsFor(function() {
				return discovery_finished;
		}, '120sec waiting for Search printer', ENABLE120K);

		runs(function() {
			displaySearchResults(printers_array, printers_errors);
		}); 
		
		runs(function() {
			setAction("Have you seen the correct output ?");
			waitsFor(function() {
				return document.getElementById("actResult").innerHTML != "init";
			}, "Timed out waiting for tester to respond", ENABLE30MIN);
			runs(function() {
				expect("pass").toEqual(document.getElementById("actResult").innerHTML);
			});
		});
	});	
*/
	it("VTXXX-0011|searchPrinters Method(with only option 'devicePort':80)", function() {
		runs(function() {
			setObjective("searchPrinters Method(with only option 'devicePort':80)"); 
			setInstruction("Connect the Zebra printer device using (bluetooth/tcp/usb). Call searchPrinters"); 
			setExpected("The printer should not be discovered with these settings and return error message for STATUS_ERROR.");
		});
		
		runs(function() {
			PrinterConnectiontype();
		}); 	

		runs(function() {
			Rho.PrinterZebra.searchPrinters({"devicePort":80}, searchPrinterCallback);
		});
		
		waitsFor(function() {
			return discovery_finished;
		}, '120sec waiting for Search printer', ENABLE120K);

		runs(function() {
			displaySearchResults(printers_array, printers_errors);
		}); 
		runs(function() {
			setAction("Have you seen the correct output ?");
			waitsFor(function() {
				return document.getElementById("actResult").innerHTML != "init";
			}, "Timed out waiting for tester to respond", ENABLE30MIN);
			runs(function() {
				expect("pass").toEqual(document.getElementById("actResult").innerHTML);
			});
		});
	});	
	
	it("VTXXX-0012|stopSearch Method (without callback function)", function() {
		runs(function() {
			setObjective("stopSearch Method (without callback function)"); 
			setInstruction(""); 
			setExpected("The search should be terminated and printer should not be discovered.");
		}); 

		runs(function() {
			PrinterConnectiontype();
		}); 
			
		runs(function() {
			Rho.PrinterZebra.searchPrinters({"printerType":Printer.PRINTER_TYPE_ZEBRA, "connectionType":connect_type}, searchPrinterCallback);
			stopsearch = Rho.PrinterZebra.stopSearch();
		});

		runs(function() {
			displaySearchResults(printers_array, printers_errors);
			displayResult("VTXXX-0012|stopSearch Method (without callback function)", stopsearch.toString());
		}); 
		runs(function() {
			setAction("Have you seen the correct output ?");
			waitsFor(function() {
				return document.getElementById("actResult").innerHTML != "init";
			}, "Timed out waiting for tester to respond", ENABLE30MIN);
			runs(function() {
				expect("pass").toEqual(document.getElementById("actResult").innerHTML);
			});
		});
	});		

	it("VTXXX-0013|stopSearch Method (with callback function)", function() {
		runs(function() {
			setObjective("stopSearch Method (with callback function)"); 
			setInstruction(""); 
			setExpected("The search should be terminated and printer should not be discovered. Callback function should return STATUS_SUCCESS");
		}); 

		runs(function() {
			PrinterConnectiontype();
		}); 
			
		runs(function() {
			Rho.PrinterZebra.searchPrinters({"printerType":Printer.PRINTER_TYPE_ZEBRA, "connectionType":connect_type}, searchPrinterCallback);        
			stopsearch = Rho.PrinterZebra.stopSearch(stopSearchPrinterCallback);
		});

		runs(function() {
			displaySearchResults(printers_array, printers_errors);
			displayResult("VTXXX-0013|stopSearch Method (with callback function)", stopsearch.toString());			
		}); 
		
		runs(function() {
			setAction("Have you seen the correct output ?");
			waitsFor(function() {
				return document.getElementById("actResult").innerHTML != "init";
			}, "Timed out waiting for tester to respond", ENABLE30MIN);
			runs(function() {
				expect("pass").toEqual(document.getElementById("actResult").innerHTML);
			});
		});
	});	

	it("VTXXX-0014|stopSearch Method (with anonymous function)", function() {
		runs(function() {
			setObjective("stopSearch Method (with anonymous function)"); 
			setInstruction(""); 
			setExpected("The search should be terminated and printer should not be discovered. Anonymous function should return STATUS_SUCCESS");
		}); 

		runs(function() {
			PrinterConnectiontype();
		}); 
			
		runs(function() {
			Rho.PrinterZebra.searchPrinters({"printerType":Printer.PRINTER_TYPE_ZEBRA, "connectionType":connect_type}, searchPrinterCallback);        
			stopsearch = Rho.PrinterZebra.stopSearch(function(data){stopSearchPrinterCallback(data)});
		});

		runs(function() {
			displaySearchResults(printers_array, printers_errors);
			displayResult("VTXXX-0014|stopSearch Method (with anonymous function)", stopsearch.toString());			
		}); 
		runs(function() {
			setAction("Have you seen the correct output ?");
			waitsFor(function() {
				return document.getElementById("actResult").innerHTML != "init";
			}, "Timed out waiting for tester to respond", ENABLE30MIN);
			
			runs(function() {
				expect("pass").toEqual(document.getElementById("actResult").innerHTML);
			});
		});
	});			
	
	it("VTXXX-0015|getPrinterByID Method ", function() {
		runs(function() {
			setObjective("getPrinterByID Method "); 
			setInstruction(""); 
			setExpected("The method should return an instance of the connected printer.");
		}); 

		runs(function() {
			PrinterConnectiontype();
		}); 
			
		runs(function() {
			Rho.PrinterZebra.searchPrinters({"printerType":Printer.PRINTER_TYPE_ZEBRA, "connectionType":connect_type}, searchPrinterCallback);
		});
		
		waitsFor(function() {
			return discovery_finished;
		}, '120sec waiting for Search printer', ENABLE120K);
		
		runs(function() {
			displaySearchResults(printers_array, printers_errors);
		
		}); 
		runs(function () {
			var printer = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			printer.connect();
			if (printer.isConnected || printer.isReadyToPrint) {
				displayResult("Printer Instance returned successfully.", printer.status);
				printer.disconnect();
			}
			else {
				displayResult("Printer instance not returned", printer.message);
			}
        });

		runs(function() {
			setAction("Have you seen the correct output ?");
			waitsFor(function() {
				return document.getElementById("actResult").innerHTML != "init";
			}, "Timed out waiting for tester to respond", ENABLE30MIN);
			runs(function() {
				expect("pass").toEqual(document.getElementById("actResult").innerHTML);
			});
		});
	});		
	
	it("VTXXX-0016|getPrinterByID Method without discovering the printer. ", function() {
		runs(function() {
			setObjective("getPrinterByID Method without discovering the printer. "); 
			setInstruction("Printer should not be available for discovery"); 
			setExpected("STATUS_ERROR should be returned with error message.");
		}); 

		runs(function () {
			var printer = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			printer.connect();
			if (printer.isConnected || printer.isReadyToPrint) {
				displayResult("Printer Instance returned successfully.", printer.status);
				printer.disconnect();
			}
			else {
				displayResult("Printer instance not returned", printer.message);
			}
        });

		runs(function() {
			setAction("Have you seen the correct output ?");
			waitsFor(function() {
				return document.getElementById("actResult").innerHTML != "init";
			}, "Timed out waiting for tester to respond", ENABLE30MIN);
			runs(function() {
				expect("pass").toEqual(document.getElementById("actResult").innerHTML);
			});
		});
	});	

	it("VTXXX-0017|getPrinterByID Method with device turned off device. ", function() {
		runs(function() {
			setObjective("getPrinterByID Method with device turned off device. "); 
			setInstruction("Please turn of the printer in 5 min"); 
			setExpected("The method should not return any instance of the disconnected printer. But STATUS_ERROR should be returned with error message.");
		}); 

		waitsFor(function() {
		}, '5 min wait to tunrn off device', ENABLE5MIN);	

		runs(function() {
			PrinterConnectiontype();
		}); 
			
		runs(function() {
			Rho.PrinterZebra.searchPrinters({"printerType":Printer.PRINTER_TYPE_ZEBRA, "connectionType":connect_type}, searchPrinterCallback);
		});
		
		waitsFor(function() {
			return discovery_finished;
		}, '120sec waiting for Search printer', ENABLE120K);
	
		runs(function() {
			displaySearchResults(printers_array, printers_errors);
		}); 

		runs(function () {
			var printer = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			printer.connect();
			if (printer.isConnected || printer.isReadyToPrint) {
				displayResult("Printer Instance returned successfully.", printer.status);
				printer.disconnect();
			}
			else {
				displayResult("Printer instance not returned", printer.message);
			}
        });
		
		runs(function() {
			setAction("Have you seen the correct output ?");
			waitsFor(function() {
				return document.getElementById("actResult").innerHTML != "init";
			}, "Timed out waiting for tester to respond", ENABLE30MIN);
			runs(function() {
				expect("pass").toEqual(document.getElementById("actResult").innerHTML);
			});
		});
	});	
	
	it("VTXXX-0018|connect Method (without callback function) ", function() {
		runs(function() {
			setObjective("connect Method (without callback function) "); 
			setInstruction(""); 
			setExpected("1.The method should execute without errors. <br /> 2. The string should be printed successfully on the printer.");
		}); 
		runs(function() {
			PrinterConnectiontype();
		}); 
			
		runs(function() {
			Rho.PrinterZebra.searchPrinters({"printerType":Printer.PRINTER_TYPE_ZEBRA, "connectionType":connect_type}, searchPrinterCallback);
		});
		
		waitsFor(function() {
			return discovery_finished;
		}, '120sec waiting for Search printer', ENABLE120K);
	
		runs(function() {
			displaySearchResults(printers_array, printers_errors);
		}); 

		runs(function () {
			var printer = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			printer.connect();
			if (printer.isConnected || printer.isReadyToPrint) {
				printer.printRawString(ZPLstr);
                printer.disconnect();
			}
			else {
				displayResult("Printer instance not returned", printer.message);
			}
        });

		runs(function() {
			setAction("Have you seen the correct output ?");
			waitsFor(function() {
				return document.getElementById("actResult").innerHTML != "init";
			}, "Timed out waiting for tester to respond", ENABLE30MIN);
			runs(function() {
				expect("pass").toEqual(document.getElementById("actResult").innerHTML);
			});
		});
	});		

	it("VTXXX-0019|connect Method (with callback function)", function() {
		runs(function() {
			setObjective("connect Method (with callback function)"); 
			setInstruction(""); 
			setExpected("1.The method should execute without errors. <br />2. The callback should return STATUS_OK");
		}); 

		runs(function() {
			PrinterConnectiontype();
		}); 
			
		/*runs(function() {
			Rho.PrinterZebra.searchPrinters({"printerType":Printer.PRINTER_TYPE_ZEBRA, "connectionType":connect_type}, searchPrinterCallback);
		});
		
		waitsFor(function() {
			return discovery_finished;
		}, '120sec waiting for Search printer', ENABLE120K);
	
		runs(function() {
			displaySearchResults(printers_array, printers_errors);
		}); */

		runs(function () {
			var printer = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			printer.connect(connectCallback);
		      if (printer.isConnected || printer.isReadyToPrint) {
					printer.disconnect();
				}
		});

		runs(function() {
			setAction("Have you seen the correct output ?");
			waitsFor(function() {
				return document.getElementById("actResult").innerHTML != "init";
			}, "Timed out waiting for tester to respond", ENABLE30MIN);
			runs(function() {
				expect("pass").toEqual(document.getElementById("actResult").innerHTML);
			});
		});
	});	

	it("VTXXX-0020|connect Method (with anonymous function)", function() {
		runs(function() {
			setObjective("connect Method (with anonymous function)"); 
			setInstruction(""); 
			setExpected("1.The method should execute without errors. <br />2. The anonymous function should return STATUS_OK");
		}); 

		runs(function() {
			PrinterConnectiontype();
		}); 
			
	/*	runs(function() {
			Rho.PrinterZebra.searchPrinters({"printerType":Printer.PRINTER_TYPE_ZEBRA, "connectionType":connect_type}, searchPrinterCallback);
		});
		
		waitsFor(function() {
			return discovery_finished;
		}, '120sec waiting for Search printer', ENABLE120K);
	
	
		runs(function() {
			displaySearchResults(printers_array, printers_errors);
		}); */

		runs(function () {
			var printer = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			printer.connect(function (data){connectCallback(data)});
		       if (printer.isConnected || printer.isReadyToPrint) {
					printer.disconnect();
				}
		});
		
		runs(function() {
			waitsFor(function() {
				return document.getElementById("actResult").innerHTML != "init";
			}, "Timed out waiting for tester to respond", ENABLE30MIN);
			runs(function() {
				expect("pass").toEqual(document.getElementById("actResult").innerHTML);
			});
		});
	});	
	
	it("VTXXX-0021|connect Method (with param 'timeout') ", function() {
		runs(function() {
			setObjective("connect Method (with param 'timeout') "); 
			setInstruction(""); 
			setExpected("1.The method should execute without errors. <br />2. The Printer.isConnected should return STATUS_OK");
		}); 

		runs(function() {
			PrinterConnectiontype();
		}); 
			
		/*runs(function() {
			Rho.PrinterZebra.searchPrinters({"printerType":Printer.PRINTER_TYPE_ZEBRA, "connectionType":connect_type}, searchPrinterCallback);
		});
			
		waitsFor(function() {
			return discovery_finished;
		}, '120sec waiting for Search printer', ENABLE120K);
		
		runs(function() {
			displaySearchResults(printers_array, printers_errors);
		}); */

		runs(function () {
			var printer = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			printer.connect({"timeout":20000}, connectCallback);
		       if (printer.isConnected == printer.STATUS_OK|| printer.isReadyToPrint == printer.STATUS_OK) {
					displayResult("Result: ", printer.isConnected);
					printer.disconnect();
				}
				else {
					displayResult("Result: ", printer.isConnected);
				}
		});
		
		runs(function() {
			setAction("Have you seen the correct output ?");
			waitsFor(function() {
				return document.getElementById("actResult").innerHTML != "init";
			}, "Timed out waiting for tester to respond", ENABLE30MIN);
			runs(function() {
				expect("pass").toEqual(document.getElementById("actResult").innerHTML);
			});
		});
	});	

	it("VTXXX-0022|connect Method (with param 'timeout':0) ", function() {
		runs(function() {
			setObjective("connect Method (with param 'timeout':0) "); 
			setInstruction(""); 
			setExpected("1.The connection should timeout and should not connect. <br />2. The Printer.isConnected should return STATUS_TIMEOUT");
		}); 

		runs(function() {
			PrinterConnectiontype();
		}); 
			
		/*runs(function() {
			Rho.PrinterZebra.searchPrinters({"printerType":Printer.PRINTER_TYPE_ZEBRA, "connectionType":connect_type}, searchPrinterCallback);
		});
		
		waitsFor(function() {
			return discovery_finished;
		}, '120sec waiting for Search printer', ENABLE120K);
	
		runs(function() {
			displaySearchResults(printers_array, printers_errors);
		
		}); */

		runs(function () {
			var printer = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			printer.connect({"timeout":0}, connectCallback);
			if (printer.isConnected == printer.STATUS_OK|| printer.isReadyToPrint == printer.STATUS_OK) {
				displayResult("Result: ", printer.isConnected);
				printer.disconnect();
			}
			else {
				displayResult("Result: ", printer.isConnected);
			}
		});

		runs(function() {
			setAction("Have you seen the correct output ?");
			waitsFor(function() {
				return document.getElementById("actResult").innerHTML != "init";
			}, "Timed out waiting for tester to respond", ENABLE30MIN);
			runs(function() {
				expect("pass").toEqual(document.getElementById("actResult").innerHTML);
			});
		});
	});		

	it("VTXXX-0023|connect Method (with param 'timeout':1000)", function() {
		runs(function() {
			setObjective("connect Method (with param 'timeout':1000)"); 
			setInstruction(""); 
			setExpected("1.The connection should timeout and should not connect. <br />2. The Printer.isConnected should return STATUS_TIMEOUT");
		}); 
		
		runs(function() {
			PrinterConnectiontype();
		}); 
			
		/*runs(function() {
			Rho.PrinterZebra.searchPrinters({"printerType":Printer.PRINTER_TYPE_ZEBRA, "connectionType":connect_type}, searchPrinterCallback);
		});
		
		waitsFor(function() {
			return discovery_finished;
		}, '120sec waiting for Search printer', ENABLE120K);
	
		runs(function() {
			displaySearchResults(printers_array, printers_errors);
		
		}); */

		runs(function () {
			var printer = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			printer.connect({"timeout":1000}, connectCallback);
		       if (printer.isConnected == printer.STATUS_OK|| printer.isReadyToPrint == printer.STATUS_OK)
				{
					displayResult("Result: ", printer.isConnected);
					printer.disconnect();
				}
				else
				{
					displayResult("Result: ", printer.isConnected);
				}
		});

		
		runs(function() {
			setAction("Have you seen the correct output ?");
			waitsFor(function() {
				return document.getElementById("actResult").innerHTML != "init";
			}, "Timed out waiting for tester to respond", ENABLE30MIN);
			runs(function() {
				expect("pass").toEqual(document.getElementById("actResult").innerHTML);
			});
		});
	});		

	it("VTXXX-0024|connect Method (with param 'timeout': 15000.5) ", function () {
		runs(function () {
			setObjective("connect Method (with param 'timeout': 15000.5) ");
			setInstruction("");
			setExpected("The method should return STATUS_ERROR due to the param value passed as float.");
		});
		
		runs(function() {
			PrinterConnectiontype();
		}); 
		/*
		runs(function () {
			Rho.PrinterZebra.searchPrinters({
				"printerType": Printer.PRINTER_TYPE_ZEBRA,
				"connectionType": connect_type
			}, searchPrinterCallback);
			waitsFor(function () {
				return discovery_finished;
			}, '120sec waiting for Search printer', ENABLE120K);
		});
		
		runs(function () {
			displaySearchResults(printers_array, printers_errors);
		});*/
		
		runs(function () {
			var printer = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			printer.connect({
				"timeout": 15000.5
			}, connectCallback);
			if(printer.isConnected == printer.STATUS_OK || printer.isReadyToPrint == printer.STATUS_OK) {
				displayResult("Result: ", printer.isConnected);
				printer.disconnect();
			}
			else {
				displayResult("Result: ", printer.isConnected);
			}
		});
		
		runs(function () {
			setAction("Have you seen the correct output ?");
			waitsFor(function () {
				return document.getElementById("actResult").innerHTML != "init";
			}, "Timed out waiting for tester to respond", ENABLE30MIN);
			runs(function () {
				expect("pass").toEqual(document.getElementById("actResult").innerHTML);
			});
		});
	});
	it("VTXXX-0025|connect Method (with param 'timeout') with device disconnected ", function () {
		runs(function () {
			setObjective("connect Method (with param 'timeout') with device disconnected ");
			setInstruction("Please turn off the printer in 2 min");
			setExpected("The Printer.isConnected should return STATUS_ERROR or STATUS_NOT_FOUND");
		});
		
		waitsFor(function () {}, '2 min wait turn off the printer', 120000);
		
		runs(function() {
			PrinterConnectiontype();
		}); 
		
		/*runs(function () {
			Rho.PrinterZebra.searchPrinters({
				"printerType": Printer.PRINTER_TYPE_ZEBRA,
				"connectionType": connect_type
			}, searchPrinterCallback);
			waitsFor(function () {
				return discovery_finished;
			}, '120sec waiting for Search printer', ENABLE120K);
		});
		
		runs(function () {
			displaySearchResults(printers_array, printers_errors);
		});*/
		runs(function () {
			var printer = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			printer.connect({
				"timeout": 20000
			}, connectCallback);
			if(printer.isConnected == printer.STATUS_OK || printer.isReadyToPrint == printer.STATUS_OK) {
				displayResult("Result: ", printer.isConnected);
				printer.disconnect();
			}
			else {
				displayResult("Result: ", printer.isConnected);
			}
		});
		runs(function () {
			setAction("Have you seen the correct output ?");
			waitsFor(function () {
				return document.getElementById("actResult").innerHTML != "init";
			}, "Timed out waiting for tester to respond", ENABLE30MIN);
			runs(function () {
				expect("pass").toEqual(document.getElementById("actResult").innerHTML);
			});
		});
	});
	it("VTXXX-0030|disconnect Method (without callback function) ", function () {
		runs(function () {
			setObjective("disconnect Method (without callback function) ");
			setInstruction("");
			setExpected("The method should execute without errors.");
		});
		
		waitsFor(function () {}, '2 min wait to start priner', 120000);
		
		runs(function() {
			PrinterConnectiontype();
		}); 
		
		/*runs(function () {
			Rho.PrinterZebra.searchPrinters({
				"printerType": Printer.PRINTER_TYPE_ZEBRA,
				"connectionType": connect_type
			}, searchPrinterCallback);
			waitsFor(function () {
				return discovery_finished;
			}, '120sec waiting for Search printer', ENABLE120K);
		});
		runs(function () {
			displaySearchResults(printers_array, printers_errors);
		});*/
		runs(function () {
			var printer = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			printer.connect(connectCallback);
			if(printer.isConnected == printer.STATUS_OK || printer.isReadyToPrint == printer.STATUS_OK) {
				var diconnect_status = printer.disconnect();
				if(!diconnect_status)
					displayResult("Diconnected ", diconnect_status.toString());
				else
					displayResult("Not Diconnected ", diconnect_status.toString());
			}
			else {
				displayResult("Unable to Connect ", printer.isConnected);
			}
		});
		runs(function () {
			waitsFor(function () {
				return document.getElementById("actResult").innerHTML != "init";
			}, "Timed out waiting for tester to respond", ENABLE30MIN);
			runs(function () {
				expect("pass").toEqual(document.getElementById("actResult").innerHTML);
			});
		});
	});
	
	it("VTXXX-0031|disconnect Method (with callback function)", function () {
		runs(function () {
			setObjective("disconnect Method (with callback function)");
			setInstruction("");
			setExpected("The callback should return STATUS_SUCCESS for successful update.");
		});
		runs(function() {
			PrinterConnectiontype();
		}); 
		/*runs(function () {
			Rho.PrinterZebra.searchPrinters({
				"printerType": Printer.PRINTER_TYPE_ZEBRA,
				"connectionType": connect_type
			}, searchPrinterCallback);
			waitsFor(function () {
				return discovery_finished;
			}, '120sec waiting for Search printer', ENABLE120K);
		});
		runs(function () {
			displaySearchResults(printers_array, printers_errors);
		});*/
		runs(function () {
			var printer = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			printer.connect(connectCallback);
			if(printer.isConnected == printer.STATUS_OK || printer.isReadyToPrint == printer.STATUS_OK) {
				printer.disconnect(disconnectCallback);
			}
			else {
				displayResult("Unable to Connect ", printer.isConnected);
			}
		});
		runs(function () {
			setAction("Have you seen the correct output ?");
			waitsFor(function () {
				return document.getElementById("actResult").innerHTML != "init";
			}, "Timed out waiting for tester to respond", ENABLE30MIN);
			runs(function () {
				expect("pass").toEqual(document.getElementById("actResult").innerHTML);
			});
		});
	});
	
	it("VTXXX-0032|disconnect Method (with anonymous function)", function () {
		runs(function () {
			setObjective("disconnect Method (with anonymous function)");
			setInstruction("");
			setExpected("The callback should return STATUS_SUCCESS for successful update.");
		});
		runs(function() {
			PrinterConnectiontype();
		}); 
		/*runs(function () {
			Rho.PrinterZebra.searchPrinters({
				"printerType": Printer.PRINTER_TYPE_ZEBRA,
				"connectionType": connect_type
			}, searchPrinterCallback);
			waitsFor(function () {
				return discovery_finished;
			}, '120sec waiting for Search printer', ENABLE120K);
		});
		runs(function () {
			displaySearchResults(printers_array, printers_errors);
		});*/
		runs(function () {
			var printer = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			printer.connect(connectCallback);
			if(printer.isConnected == printer.STATUS_OK || printer.isReadyToPrint == printer.STATUS_OK) {
				printer.disconnect(function (data) {
					disconnectCallback(data)
				});
			}
			else {
				displayResult("Unable to Connect ", printer.isConnected);
			}
		});
		runs(function () {
			setAction("Have you seen the correct output ?");
			waitsFor(function () {
				return document.getElementById("actResult").innerHTML != "init";
			}, "Timed out waiting for tester to respond", ENABLE30MIN);
			runs(function () {
				expect("pass").toEqual(document.getElementById("actResult").innerHTML);
			});
		});
	});
	
	it("VTXXX-0033|disconnect Method (sending string to print)", function () {
		runs(function () {
			setObjective("disconnect Method (sending string to print)");
			setInstruction("");
			setExpected("The string should not be printed on the printer.");
		});
		runs(function() {
			PrinterConnectiontype();
		}); 
		/*runs(function () {
			Rho.PrinterZebra.searchPrinters({
				"printerType": Printer.PRINTER_TYPE_ZEBRA,
				"connectionType": connect_type
			}, searchPrinterCallback);
			waitsFor(function () {
				return discovery_finished;
			}, '120sec waiting for Search printer', ENABLE120K);
		});
		runs(function () {
			displaySearchResults(printers_array, printers_errors);
		});*/
		runs(function () {
			var printer = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			printer.connect(connectCallback);
			if(printer.isConnected == printer.STATUS_OK || printer.isReadyToPrint == printer.STATUS_OK) {
				printer.disconnect(function () {
					disconnectCallback()
				});
			}
			else {
				displayResult("Unable to Connect ", printer.isConnected);
			}
		});
		runs(function () {
			setAction("Have you seen the correct output ?");
			waitsFor(function () {
				return document.getElementById("actResult").innerHTML != "init";
			}, "Timed out waiting for tester to respond", ENABLE30MIN);
			runs(function () {
				expect("pass").toEqual(document.getElementById("actResult").innerHTML);
			});
		});
	});
	it("VTXXX-0033|disconnect Method (sending string to print)", function () {
		runs(function () {
			setObjective("disconnect Method (sending string to print)");
			setInstruction("");
			setExpected("The string should not be printed on the printer.");
		});
		runs(function() {
			PrinterConnectiontype();
		}); 
		/*runs(function () {
			Rho.PrinterZebra.searchPrinters({
				"printerType": Printer.PRINTER_TYPE_ZEBRA,
				"connectionType": connect_type
			}, searchPrinterCallback);
			waitsFor(function () {
				return discovery_finished;
			}, '120sec waiting for Search printer', ENABLE120K);
		});
		runs(function () {
			displaySearchResults(printers_array, printers_errors);
		});*/
		runs(function () {
			var printer = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			printer.connect(connectCallback);
			if(printer.isConnected == printer.STATUS_OK || printer.isReadyToPrint == printer.STATUS_OK) {
				printer.disconnect();
				var print_str = printer.printRawString(ZPLstr);
				waitsFor(function () {}, '10sec wait for print', ENABLE10K);
				displayResult("print attempt", print_str);
			}
			else {
				displayResult("Unable to Connect ", printer.isConnected);
			}
		});
		runs(function () {
			setAction("Have you seen the correct output ?");
			waitsFor(function () {
				return document.getElementById("actResult").innerHTML != "init";
			}, "Timed out waiting for tester to respond", ENABLE30MIN);
			runs(function () {
				expect("pass").toEqual(document.getElementById("actResult").innerHTML);
			});
		});
	});
	it("VTXXX-0034|disconnect Method (call this before the connect method)", function () {
		runs(function () {
			setObjective("disconnect Method (call this before the connect method)");
			setInstruction("");
			setExpected("The method should execute without any error.");
		});
		runs(function() {
			PrinterConnectiontype();
		}); 
		/*runs(function () {
			Rho.PrinterZebra.searchPrinters({
				"printerType": Printer.PRINTER_TYPE_ZEBRA,
				"connectionType": connect_type
			}, searchPrinterCallback);
			waitsFor(function () {
				return discovery_finished;
			}, '120sec waiting for Search printer', ENABLE120K);
		});
		runs(function () {
			displaySearchResults(printers_array, printers_errors);
		});*/
		runs(function () {
			var printer = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			var diconnect_status = printer.disconnect();
			if(!diconnect_status)
				displayResult("Diconnected ", diconnect_status.toString());
			else
				displayResult("Not Diconnected ", diconnect_status.toString());
			printer.connect(connectCallback);
			if(printer.isConnected == printer.STATUS_OK || printer.isReadyToPrint == printer.STATUS_OK) {
				var print_str = printer.printRawString(ZPLstr);
				waitsFor(function () {}, '10sec wait for print', ENABLE10K);
				displayResult("print attempt", print_str);
				printer.disconnect();
			}
			else {
				displayResult("Unable to Connect ", printer.isConnected);
			}
		});
		runs(function () {
			setAction("Have you seen the correct output ?");
			waitsFor(function () {
				return document.getElementById("actResult").innerHTML != "init";
			}, "Timed out waiting for tester to respond", ENABLE30MIN);
			runs(function () {
				expect("pass").toEqual(document.getElementById("actResult").innerHTML);
			});
		});
	});
	
	it("VTXXX-0035|disconnect Method with callback (call this before the connect method)", function () {
		runs(function () {
			setObjective("disconnect Method with callback (call this before the connect method)");
			setInstruction("");
			setExpected("The callback function should return STATUS_ERROR.");
		});
		runs(function() {
			PrinterConnectiontype();
		}); 
		/*runs(function () {
			Rho.PrinterZebra.searchPrinters({
				"printerType": Printer.PRINTER_TYPE_ZEBRA,
				"connectionType": connect_type
			}, searchPrinterCallback);
			waitsFor(function () {
				return discovery_finished;
			}, '120sec waiting for Search printer', ENABLE120K);
		});
		runs(function () {
			displaySearchResults(printers_array, printers_errors);
		});*/
		runs(function () {
			var printer = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			printer.disconnect(disconnectCallback);
			printer.connect(connectCallback);
			if(printer.isConnected == printer.STATUS_OK || printer.isReadyToPrint == printer.STATUS_OK) {
				var print_str = printer.printRawString(ZPLstr);
				waitsFor(function () {}, '10sec wait for print', ENABLE10K);
				displayResult("print attempt", print_str);
				printer.disconnect();
			}
			else {
				displayResult("Unable to Connect ", printer.isConnected);
			}
		});
		runs(function () {
			setAction("Have you seen the correct output ?");
			waitsFor(function () {
				return document.getElementById("actResult").innerHTML != "init";
			}, "Timed out waiting for tester to respond", ENABLE30MIN);
			runs(function () {
				expect("pass").toEqual(document.getElementById("actResult").innerHTML);
			});
		});
	});
	
	it("VTXXX-0036|printFile Method (without callback function)", function () {
		runs(function () {
			setObjective("printFile Method (without callback function)");
			setInstruction("");
			setExpected("The file should be sent successfully to the printer.");
		});
		runs(function() {
			PrinterConnectiontype();
		}); 
		/*runs(function () {
			Rho.PrinterZebra.searchPrinters({
				"printerType": Printer.PRINTER_TYPE_ZEBRA,
				"connectionType": connect_type
			}, searchPrinterCallback);
			waitsFor(function () {
				return discovery_finished;
			}, '120sec waiting for Search printer', ENABLE120K);
		});
		runs(function () {
			displaySearchResults(printers_array, printers_errors);
		});*/
		runs(function () {
			var printer = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			printer.disconnect(disconnectCallback);
			printer.connect(connectCallback);
			if(printer.isConnected == printer.STATUS_OK || printer.isReadyToPrint == printer.STATUS_OK) {
				var fileURI = Rho.RhoFile.join(Rho.Application.modelFolderPath('PrinterZebra'), "Files/image1.jpg");
				var print_str = printer.printFile(fileURI);
				waitsFor(function () {
					return print_str;
				}, '10sec wait for print', ENABLE10K);
				displayResult("Printed ", print_str);
			}
			else {
				displayResult("Unable to Connect ", printer.isConnected);
			}
		});
		runs(function () {
			setAction("Have you seen the correct output ?");
			waitsFor(function () {
				return document.getElementById("actResult").innerHTML != "init";
			}, "Timed out waiting for tester to respond", ENABLE30MIN);
			runs(function () {
				expect("pass").toEqual(document.getElementById("actResult").innerHTML);
			});
		});
	});
	it("VTXXX-0037|printFile Method (with callback function))", function () {
		runs(function () {
			setObjective("printFile Method (with callback function)");
			setInstruction("");
			setExpected("The file should be sent successfully to the printer.");
		});
		runs(function() {
			PrinterConnectiontype();
		}); 
		/*runs(function () {
			Rho.PrinterZebra.searchPrinters({
				"printerType": Printer.PRINTER_TYPE_ZEBRA,
				"connectionType": connect_type
			}, searchPrinterCallback);
			waitsFor(function () {
				return discovery_finished;
			}, '120sec waiting for Search printer', ENABLE120K);
		});
		runs(function () {
			displaySearchResults(printers_array, printers_errors);
		});*/
		runs(function () {
			var printer = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			printer.disconnect(disconnectCallback);
			printer.connect(connectCallback);
			if(printer.isConnected == printer.STATUS_OK || printer.isReadyToPrint == printer.STATUS_OK) {
				var fileURI = Rho.RhoFile.join(Rho.Application.modelFolderPath('PrinterZebra'), "Files/image1.jpg");
				printer.printFile(fileURI, printFileCallback);
				waitsFor(function () {
					return print_str;
				}, '10sec wait for print', ENABLE10K);
				displayResult("Printed ", print_str);
			}
			else {
				displayResult("Unable to Connect ", printer.isConnected);
			}
		});
		runs(function () {
			setAction("Have you seen the correct output ?");
			waitsFor(function () {
				return document.getElementById("actResult").innerHTML != "init";
			}, "Timed out waiting for tester to respond", ENABLE30MIN);
			runs(function () {
				expect("pass").toEqual(document.getElementById("actResult").innerHTML);
			});
		});
	});
	it("VTXXX-0038|printFile Method (without callback function)", function () {
		runs(function () {
			setObjective("printFile Method (without callback function)");
			setInstruction("");
			setExpected("The file should be sent successfully to the printer.");
		});
		runs(function() {
			PrinterConnectiontype();
		}); 
		/*runs(function () {
			Rho.PrinterZebra.searchPrinters({
				"printerType": Printer.PRINTER_TYPE_ZEBRA,
				"connectionType": connect_type
			}, searchPrinterCallback);
			waitsFor(function () {
				return discovery_finished;
			}, '120sec waiting for Search printer', ENABLE120K);
		});
		runs(function () {
			displaySearchResults(printers_array, printers_errors);
		});*/
		runs(function () {
			var printer = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			printer.disconnect(disconnectCallback);
			printer.connect(connectCallback);
			if(printer.isConnected == printer.STATUS_OK || printer.isReadyToPrint == printer.STATUS_OK) {
				var fileURI = Rho.RhoFile.join(Rho.Application.modelFolderPath('PrinterZebra'), "Files/image1.png");
				var print_str = printer.printFile(fileURI);
				waitsFor(function () {
					return print_str;
				}, '10sec wait for print', ENABLE10K);
				displayResult("Printed ", print_str);
			}
			else {
				displayResult("Unable to Connect ", printer.isConnected);
			}
		});
		runs(function () {
			setAction("Have you seen the correct output ?");
			waitsFor(function () {
				return document.getElementById("actResult").innerHTML != "init";
			}, "Timed out waiting for tester to respond", ENABLE30MIN);
			runs(function () {
				expect("pass").toEqual(document.getElementById("actResult").innerHTML);
			});
		});
	});
	it("VTXXX-0039|printFile Method (with callback function))", function () {
		runs(function () {
			setObjective("printFile Method (with callback function)");
			setInstruction("");
			setExpected("The file should be sent successfully to the printer.");
		});
		runs(function() {
			PrinterConnectiontype();
		}); 
		/*runs(function () {
			Rho.PrinterZebra.searchPrinters({
				"printerType": Printer.PRINTER_TYPE_ZEBRA,
				"connectionType": connect_type
			}, searchPrinterCallback);
			waitsFor(function () {
				return discovery_finished;
			}, '120sec waiting for Search printer', ENABLE120K);
		});
		runs(function () {
			displaySearchResults(printers_array, printers_errors);
		});*/
		runs(function () {
			var printer = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			printer.disconnect(disconnectCallback);
			printer.connect(connectCallback);
			if(printer.isConnected == printer.STATUS_OK || printer.isReadyToPrint == printer.STATUS_OK) {
				var fileURI = Rho.RhoFile.join(Rho.Application.modelFolderPath('PrinterZebra'), "Files/image1.png");
				printer.printFile(fileURI, printFileCallback);
				waitsFor(function () {
					return print_str;
				}, '10sec wait for print', ENABLE10K);
				displayResult("Printed ", print_str);
			}
			else {
				displayResult("Unable to Connect ", printer.isConnected);
			}
		});
		runs(function () {
			setAction("Have you seen the correct output ?");
			waitsFor(function () {
				return document.getElementById("actResult").innerHTML != "init";
			}, "Timed out waiting for tester to respond", ENABLE30MIN);
			runs(function () {
				expect("pass").toEqual(document.getElementById("actResult").innerHTML);
			});
		});
	});
	it("VTXXX-0040|printFile Method (without callback function)", function () {
		runs(function () {
			setObjective("printFile Method (without callback function)");
			setInstruction("");
			setExpected("The file should be sent successfully to the printer.");
		});
		runs(function() {
			PrinterConnectiontype();
		}); 
		/*runs(function () {
			Rho.PrinterZebra.searchPrinters({
				"printerType": Printer.PRINTER_TYPE_ZEBRA,
				"connectionType": connect_type
			}, searchPrinterCallback);
			waitsFor(function () {
				return discovery_finished;
			}, '120sec waiting for Search printer', ENABLE120K);
		});
		runs(function () {
			displaySearchResults(printers_array, printers_errors);
		});*/
		runs(function () {
			var printer = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			printer.disconnect(disconnectCallback);
			printer.connect(connectCallback);
			if(printer.isConnected == printer.STATUS_OK || printer.isReadyToPrint == printer.STATUS_OK) {
				var fileURI = Rho.RhoFile.join(Rho.Application.modelFolderPath('PrinterZebra'), "Files/image1.bmp");
				var print_str = printer.printFile(fileURI);
				waitsFor(function () {
					return print_str;
				}, '10sec wait for print', ENABLE10K);
				displayResult("Printed ", print_str);
			}
			else {
				displayResult("Unable to Connect ", printer.isConnected);
			}
		});
		runs(function () {
			setAction("Have you seen the correct output ?");
			waitsFor(function () {
				return document.getElementById("actResult").innerHTML != "init";
			}, "Timed out waiting for tester to respond", ENABLE30MIN);
			runs(function () {
				expect("pass").toEqual(document.getElementById("actResult").innerHTML);
			});
		});
	});
	it("VTXXX-0041|printFile Method (with callback function))", function () {
		runs(function () {
			setObjective("printFile Method (with callback function)");
			setInstruction("");
			setExpected("The file should be sent successfully to the printer.");
		});
		runs(function() {
			PrinterConnectiontype();
		}); 
		/*runs(function () {
			Rho.PrinterZebra.searchPrinters({
				"printerType": Printer.PRINTER_TYPE_ZEBRA,
				"connectionType": connect_type
			}, searchPrinterCallback);
			waitsFor(function () {
				return discovery_finished;
			}, '120sec waiting for Search printer', ENABLE120K);
		});
		runs(function () {
			displaySearchResults(printers_array, printers_errors);
		});*/
		runs(function () {
			var printer = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			printer.disconnect(disconnectCallback);
			printer.connect(connectCallback);
			if(printer.isConnected == printer.STATUS_OK || printer.isReadyToPrint == printer.STATUS_OK) {
				var fileURI = Rho.RhoFile.join(Rho.Application.modelFolderPath('PrinterZebra'), "Files/image1.bmp");
				printer.printFile(fileURI, printFileCallback);
				waitsFor(function () {
					return print_str;
				}, '10sec wait for print', ENABLE10K);
				displayResult("Printed ", print_str);
			}
			else {
				displayResult("Unable to Connect ", printer.isConnected);
			}
		});
		runs(function () {
			setAction("Have you seen the correct output ?");
			waitsFor(function () {
				return document.getElementById("actResult").innerHTML != "init";
			}, "Timed out waiting for tester to respond", ENABLE30MIN);
			runs(function () {
				expect("pass").toEqual(document.getElementById("actResult").innerHTML);
			});
		});
	});
	it("VTXXX-0042|printFile Method (with anonymous function for pdf file", function () {
		runs(function () {
			setObjective("printFile Method (with anonymous function for pdf file");
			setInstruction("");
			setExpected("1.The file should be sent successfully to the printer. <br />2. The callback should return STATUS_SUCCESS.");
		});
		runs(function() {
			PrinterConnectiontype();
		}); 
		/*runs(function () {
			Rho.PrinterZebra.searchPrinters({
				"printerType": Printer.PRINTER_TYPE_ZEBRA,
				"connectionType": connect_type
			}, searchPrinterCallback);
			waitsFor(function () {
				return discovery_finished;
			}, '120sec waiting for Search printer', ENABLE120K);
		});
		runs(function () {
			displaySearchResults(printers_array, printers_errors);
		});*/
		runs(function () {
			var printer = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			printer.disconnect(disconnectCallback);
			printer.connect(connectCallback);
			if(printer.isConnected == printer.STATUS_OK || printer.isReadyToPrint == printer.STATUS_OK) {
				var fileURI = Rho.RhoFile.join(Rho.Application.modelFolderPath('PrinterZebra'), "Files/image1.bmp");
				printer.printFile(fileURI, function () {
					printFileCallback()
				});
				waitsFor(function () {
					return print_str;
				}, '10sec wait for print', ENABLE10K);
				displayResult("Printed ", print_str);
			}
			else {
				displayResult("Unable to Connect ", printer.isConnected);
			}
		});
		runs(function () {
			setAction("Have you seen the correct output ?");
			waitsFor(function () {
				return document.getElementById("actResult").innerHTML != "init";
			}, "Timed out waiting for tester to respond", ENABLE30MIN);
			runs(function () {
				expect("pass").toEqual(document.getElementById("actResult").innerHTML);
			});
		});
	});
	
	it("VTXXX-0043|printFile Method (with anonymous function))", function () {
		runs(function () {
			setObjective("printFile Method (with anonymous function)");
			setInstruction("");
			setExpected("The file should be sent successfully to the printer.");
		});
		runs(function() {
			PrinterConnectiontype();
		}); 
		/*runs(function () {
			Rho.PrinterZebra.searchPrinters({
				"printerType": Printer.PRINTER_TYPE_ZEBRA,
				"connectionType": connect_type
			}, searchPrinterCallback);
			waitsFor(function () {
				return discovery_finished;
			}, '120sec waiting for Search printer', ENABLE120K);
		});
		runs(function () {
			displaySearchResults(printers_array, printers_errors);
		});*/
		runs(function () {
			var printer = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			printer.disconnect(disconnectCallback);
			printer.connect(connectCallback);
			if(printer.isConnected == printer.STATUS_OK || printer.isReadyToPrint == printer.STATUS_OK) {
				var fileURI = Rho.RhoFile.join(Rho.Application.modelFolderPath('PrinterZebra'), "Files/test1.pdf");
				printer.printFile(fileURI, function () {
					printFileCallback()
				});
				waitsFor(function () {
					return print_str;
				}, '10sec wait for print', ENABLE10K);
				displayResult("Printed ", print_str);
			}
			else {
				displayResult("Unable to Connect ", printer.isConnected);
			}
		});
		runs(function () {
			setAction("Have you seen the correct output ?");
			waitsFor(function () {
				return document.getElementById("actResult").innerHTML != "init";
			}, "Timed out waiting for tester to respond", ENABLE30MIN);
			runs(function () {
				expect("pass").toEqual(document.getElementById("actResult").innerHTML);
			});
		});
	});
	it("VTXXX-0044|printFile Method (with callback function and No File specified in fileURI)", function () {
		runs(function () {
			setObjective("printFile Method (with callback function and No File specified in fileURI)");
			setInstruction("");
			setExpected("1. No file should be sent to the printer. <br />2. The callback should return STATUS_ERROR.");
		});
		runs(function() {
			PrinterConnectiontype();
		}); 
		/*runs(function () {
			Rho.PrinterZebra.searchPrinters({
				"printerType": Printer.PRINTER_TYPE_ZEBRA,
				"connectionType": connect_type
			}, searchPrinterCallback);
			waitsFor(function () {
				return discovery_finished;
			}, '120sec waiting for Search printer', ENABLE120K);
		});
		runs(function () {
			displaySearchResults(printers_array, printers_errors);
		});*/
		runs(function () {
			var printer = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			printer.disconnect(disconnectCallback);
			printer.connect(connectCallback);
			if(printer.isConnected == printer.STATUS_OK || printer.isReadyToPrint == printer.STATUS_OK) {
				var fileURI = "";
				printer.printFile(fileURI, printFileCallback);
				waitsFor(function () {
					return print_str;
				}, '10sec wait for print', ENABLE10K);
				displayResult("Printed ", print_str);
			}
			else {
				displayResult("Unable to Connect ", printer.isConnected);
			}
		});
		runs(function () {
			waitsFor(function () {
				return document.getElementById("actResult").innerHTML != "init";
			}, "Timed out waiting for tester to respond", ENABLE30MIN);
			runs(function () {
				expect("pass").toEqual(document.getElementById("actResult").innerHTML);
			});
		});
	});
	
	it("VTXXX-0045|printFile Method (with callback function and fileURI has no file at that location)", function () {
		runs(function () {
			setObjective("printFile Method (with callback function and fileURI has no file at that location)");
			setInstruction("");
			setExpected("1. No file should be sent to the printer. <br />2. The callback should return STATUS_ERROR.");
		});
		runs(function() {
			PrinterConnectiontype();
		}); 
		/*runs(function () {
			Rho.PrinterZebra.searchPrinters({
				"printerType": Printer.PRINTER_TYPE_ZEBRA,
				"connectionType": connect_type
			}, searchPrinterCallback);
			waitsFor(function () {
				return discovery_finished;
			}, '120sec waiting for Search printer', ENABLE120K);
		});
		runs(function () {
			displaySearchResults(printers_array, printers_errors);
		});*/
		runs(function () {
			var printer = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			printer.disconnect(disconnectCallback);
			printer.connect(connectCallback);
			if(printer.isConnected == printer.STATUS_OK || printer.isReadyToPrint == printer.STATUS_OK) {
				var fileURI = '/app/NoFile/';
				printer.printFile(fileURI, printFileCallback);
				waitsFor(function () {
					return print_str;
				}, '10sec wait for print', ENABLE10K);
				displayResult("Printed ", print_str);
			}
			else {
				displayResult("Unable to Connect ", printer.isConnected);
			}
		});
		runs(function () {
			setAction("Have you seen the correct output ?");
			waitsFor(function () {
				return document.getElementById("actResult").innerHTML != "init";
			}, "Timed out waiting for tester to respond", ENABLE30MIN);
			runs(function () {
				expect("pass").toEqual(document.getElementById("actResult").innerHTML);
			});
		});
	});
	
	it("VTXXX-0046|printRawString Method (without callback function)", function () {
		runs(function () {
			setObjective("printRawString Method (without callback function)");
			setInstruction("");
			setExpected("The raw string should be sent successfully and printed on the printer.");
		});
		runs(function() {
			PrinterConnectiontype();
		}); 
		/*runs(function () {
			Rho.PrinterZebra.searchPrinters({
				"printerType": Printer.PRINTER_TYPE_ZEBRA,
				"connectionType": connect_type
			}, searchPrinterCallback);
			waitsFor(function () {
				return discovery_finished;
			}, '120sec waiting for Search printer', ENABLE120K);
		});
		runs(function () {
			displaySearchResults(printers_array, printers_errors);
		});*/
		runs(function () {
			var printer = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			printer.disconnect(disconnectCallback);
			printer.connect(connectCallback);
			if(printer.isConnected == printer.STATUS_OK || printer.isReadyToPrint == printer.STATUS_OK) {
				print_str = printer.printRawString(ZPLstr)
				waitsFor(function () {
					return print_str;
				}, '10sec wait for print', ENABLE10K);
			}
			else {
				displayResult("Unable to Connect ", printer.isConnected);
			}
		});
		runs(function () {
			setAction("Have you seen the correct output ?");
			waitsFor(function () {
				return document.getElementById("actResult").innerHTML != "init";
			}, "Timed out waiting for tester to respond", ENABLE30MIN);
			runs(function () {
				expect("pass").toEqual(document.getElementById("actResult").innerHTML);
			});
		});
	});
	it("VTXXX-0047|printRawString Method (with callback function)", function () {
		runs(function () {
			setObjective("printRawString Method (with callback function)");
			setInstruction("");
			setExpected("1. The raw string should be sent successfully and printed on the printer. <br />2. The callback should return STATUS_SUCCESS.");
		});
		runs(function() {
			PrinterConnectiontype();
		}); 
		/*runs(function () {
			Rho.PrinterZebra.searchPrinters({
				"printerType": Printer.PRINTER_TYPE_ZEBRA,
				"connectionType": connect_type
			}, searchPrinterCallback);
			waitsFor(function () {
				return discovery_finished;
			}, '120sec waiting for Search printer', ENABLE120K);
		});
		runs(function () {
			displaySearchResults(printers_array, printers_errors);
		});*/
		runs(function () {
			var printer = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			printer.disconnect(disconnectCallback);
			printer.connect(connectCallback);
			if(printer.isConnected == printer.STATUS_OK || printer.isReadyToPrint == printer.STATUS_OK) {
				print_str = printer.printRawString(CCPLstr, printRawStringCallback)
				waitsFor(function () {
					return print_str;
				}, '10sec wait for print', ENABLE10K);
			}
			else {
				displayResult("Unable to Connect ", printer.isConnected);
			}
		});
		runs(function () {
			setAction("Have you seen the correct output ?");
			waitsFor(function () {
				return document.getElementById("actResult").innerHTML != "init";
			}, "Timed out waiting for tester to respond", ENABLE30MIN);
			runs(function () {
				expect("pass").toEqual(document.getElementById("actResult").innerHTML);
			});
		});
	});
	
	it("VTXXX-0048|printRawString Method (with anonymous function)", function () {
		runs(function () {
			setObjective("printRawString Method (with anonymous function)");
			setInstruction("");
			setExpected("1. The raw string should be sent successfully and printed on the printer. <br />2. The callback should return STATUS_SUCCESS.");
		});
		runs(function() {
			PrinterConnectiontype();
		}); 
		/*runs(function () {
			Rho.PrinterZebra.searchPrinters({
				"printerType": Printer.PRINTER_TYPE_ZEBRA,
				"connectionType": connect_type
			}, searchPrinterCallback);
			waitsFor(function () {
				return discovery_finished;
			}, '120sec waiting for Search printer', ENABLE120K);
		});
		runs(function () {
			displaySearchResults(printers_array, printers_errors);
		});*/
		runs(function () {
			var printer = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			printer.disconnect(disconnectCallback);
			printer.connect(connectCallback);
			if(printer.isConnected == printer.STATUS_OK || printer.isReadyToPrint == printer.STATUS_OK) {
				print_str = printer.printRawString(ZPLstr, function () {
					printRawStringCallback()
				})
				waitsFor(function () {
					return print_str;
				}, '10sec wait for print', ENABLE10K);
			}
			else {
				displayResult("Unable to Connect ", printer.isConnected);
			}
		});
		runs(function () {
			setAction("Have you seen the correct output ?");
			waitsFor(function () {
				return document.getElementById("actResult").innerHTML != "init";
			}, "Timed out waiting for tester to respond", ENABLE30MIN);
			runs(function () {
				expect("pass").toEqual(document.getElementById("actResult").innerHTML);
			});
		});
	});
	
	// Zebra Specific..
	
	it("VTXXX-0100 | Retrieve file names stored on printer using retrieveFileNames method ( without Callback )" , function() {
		runs(function() {
			setObjective("VTXXX-0100 | Retrieve file names stored on printer using retrieveFileNames method ( without Callback )");
			setInstruction("1. Connect a Zebra printer with the device <br /> 2. Store some files in the Zebra printer like ( image1.jpg, img2.png, img3.bmp, testfile.pdf, printarray.zpl, printhash.zpl and files with no extention )<br /> 3. Call Retrieve file names");
			setExpected("1. Should Retrieve the names of the files which are stored on the printer. <br />2. HASH containing STATUS_SUCCESS and all the file names should be retrived. (image1.jpg, img2.png, img3.bmp, testfile.pdf, printarray.zpl, printhash.zpl and file with no extention.)<br /> 3. STATUS_ERROR should be thrown on failure in search");
		});
		
		
		runs(function() {
				PrinterConnectiontype();
			});
		
		runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			connect_status = PrinterInstance.connect();
			waitsFor(function()	{
				return PrinterInstance.isConnected;
			}, '9sec wait for connection', ENABLE9K);
			if (PrinterInstance.isConnected) {
				retrievedfilenames = PrinterInstance.retrieveFileNames();
				waitsFor(function() {
					if(retrievedfilenames.status == STATUS_SUCCESS) {
						retrievedFlag = true;	
					}
					return retrievedFlag;
				}, '9sec wait to retrieve filenames', ENABLE9K);
				displayResult("Retrieved file names: ", JSON.stringify(retrievedfilenames));
			}
			else {
				displayResult("Failed to connect to the printer", connect_status);	
			}
		});
		
		runs(function() {
			if (PrinterInstance.isConnected) {
				PrinterInstance.disconnect();
			}
		});
		waitsFor(function() {
			return document.getElementById("actResult").innerHTML != "init";
		}, "Timed out waiting for tester to respond", ENABLE30MIN);
		runs(function() {
			expect("pass").toEqual(document.getElementById("actResult").innerHTML);
		});
	});

	it("VTXXX-0101 | Retrieve file names when there is no files stored on the printer, using retrieveFileNames method ( without Callback )" , function() {
		runs(function() {
			setObjective("VTXXX-0101 | Retrieve file names when there is no files stored on the printer, using retrieveFileNames method ( without Callback )");
			setInstruction("1. Connect a Zebra printer with the device <br /> 2. Do not store any files on the Zebra printer<br /> 3. Call Retrieve file names");
			setExpected("1.  Should Retrive nil filenames. <br /> 2. STATUS_ERROR should be thrown on failure in search");
		});
		
		
		runs(function() {
				PrinterConnectiontype();
			});
		
		runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			connect_status = PrinterInstance.connect();
			waitsFor(function()	{
				return PrinterInstance.isConnected;
			}, '9sec wait for connection', ENABLE9K);
			if (PrinterInstance.isConnected) {
				retrievedfilenames = PrinterInstance.retrieveFileNames();
				waitsFor(function() {
					if(retrievedfilenames.status == STATUS_SUCCESS) {
						retrievedFlag = true;	
					}
					return retrievedFlag;
				}, '9sec wait to retrieve filenames', ENABLE9K);
				displayResult("Retrieved file names: ", JSON.stringify(retrievedfilenames));
			}
			else {
				displayResult("Failed to connect to the printer", connect_status);	
			}
		});
		
		runs(function() {
			if (PrinterInstance.isConnected) {
				PrinterInstance.disconnect();
			}
		});
		waitsFor(function() {
			return document.getElementById("actResult").innerHTML != "init";
		}, "Timed out waiting for tester to respond", ENABLE30MIN);
		runs(function() {
			expect("pass").toEqual(document.getElementById("actResult").innerHTML);
		});
	});


	it("VTXXX-0102 | Retrieve file names stored on printer using retrieveFileNames method when there is no connection or connection loss between device and printer( without Callback )" , function() {
		runs(function() {
			setObjective("VTXXX-0102 | Retrieve file names stored on printer using retrieveFileNames method when there is no connection or connection loss between device and printer( without Callback )");
			setInstruction("1. Connect a Zebra printer with the device <br /> 2. Store some files in the Zebra printer like ( image1.jpg, img2.png, img3.bmp, testfile.pdf, printarray.zpl, printhash.zpl and files with no extention )<br /> 3.  Disconnect the printer. <br />4. Call Retrieve file names");
			setExpected("1. STATUS_ERROR should be thrown on failure in search.");
		});
		
		
		runs(function() {
				PrinterConnectiontype();
			});
		
		runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			if (PrinterInstance.isConnected) {
				PrinterInstance.disconnect();
			}
			retrievedfilenames = PrinterInstance.retrieveFileNames();
			waitsFor(function() {
				if(retrievedfilenames.status == STATUS_SUCCESS) {
					retrievedFlag = true;	
				}
				return retrievedFlag;
			}, '9sec wait to retrieve filenames', ENABLE9K);
			displayResult("Retrieved file names: ", JSON.stringify(retrievedfilenames));
		});
		
		waitsFor(function() {
			return document.getElementById("actResult").innerHTML != "init";
		}, "Timed out waiting for tester to respond", ENABLE30MIN);
		runs(function() {
			expect("pass").toEqual(document.getElementById("actResult").innerHTML);
		});
	});

	it("VTXXX-0103 | Retrieve file names stored on printer using retrieveFileNames method ( with Callback )" , function() {
		runs(function() {
			setObjective("VTXXX-0103 | Retrieve file names stored on printer using retrieveFileNames method ( with Callback )");
			setInstruction("1. Connect a Zebra printer with the device <br /> 2. Store some files in the Zebra printer like ( image1.jpg, img2.png, img3.bmp, testfile.pdf, printarray.zpl, printhash.zpl and files with no extention )<br /> 3. Call Retrieve file names with callback");
			setExpected("1. Retrieves the names of the files which are stored on the printer. <br /> 2. Callback should get fired with HASH containing status STATUS_SUCCESS and with all the file names (image1.jpg, img2.png, img3.bmp, testfile.pdf, printarray.zpl, printhash.zpl and file with no extention). <br />3. STATUS_ERROR should be thrown on failure in search");
		});
		
		
		runs(function() {
				PrinterConnectiontype();
			});
		
		runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			connect_status = PrinterInstance.connect();
			waitsFor(function()	{
				return PrinterInstance.isConnected;
			}, '9sec wait for connection', ENABLE9K);
			if (PrinterInstance.isConnected) {
				PrinterInstance.retrieveFileNames(retrieveCallback);
			}
			else {
				displayResult("Failed to connect to the printer", connect_status);	
			}
		});
		
		runs(function() {
			if (PrinterInstance.isConnected) {
				PrinterInstance.disconnect();
			}
		});
		waitsFor(function() {
			return document.getElementById("actResult").innerHTML != "init";
		}, "Timed out waiting for tester to respond", ENABLE30MIN);
		runs(function() {
			expect("pass").toEqual(document.getElementById("actResult").innerHTML);
		});
	});

	it("VTXXX-0104 | Retrieve file names when there is no files stored on the printer, using retrieveFileNames method ( with Callback )" , function() {
		runs(function() {
			setObjective("VTXXX-0104 | Retrieve file names when there is no files stored on the printer, using retrieveFileNames method ( with Callback )");
			setInstruction("1. Connect a Zebra printer with the device <br /> 2. Do not store any files on the Zebra printer<br /> 3. Call Retrieve file names with callback");
			setExpected("1. Callback should get fired with HASH containing STATUS_SUCCESS and retrives nil filenames.<br /> 2. STATUS_ERROR should be thrown on failure in search");
		});
		
		
		runs(function() {
				PrinterConnectiontype();
			});
		
		runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			connect_status = PrinterInstance.connect();
			waitsFor(function()	{
				return PrinterInstance.isConnected;
			}, '9sec wait for connection', ENABLE9K);
			if (PrinterInstance.isConnected) {
				PrinterInstance.retrieveFileNames(retrieveCallback);
			}
			else {
				displayResult("Failed to connect to the printer", connect_status);	
			}
		});
		
		runs(function() {
			if (PrinterInstance.isConnected) {
				PrinterInstance.disconnect();
			}
		});
		waitsFor(function() {
			return document.getElementById("actResult").innerHTML != "init";
		}, "Timed out waiting for tester to respond", ENABLE30MIN);
		runs(function() {
			expect("pass").toEqual(document.getElementById("actResult").innerHTML);
		});
	});


	it("VTXXX-0105 | Retrieve file names stored on printer using retrieveFileNames method when there is no connection or connection loss between device and printer( with Callback )" , function() {
		runs(function() {
			setObjective("VTXXX-0105 | Retrieve file names stored on printer using retrieveFileNames method when there is no connection or connection loss between device and printer( with Callback )");
			setInstruction("1. Connect a Zebra printer with the device <br /> 2. Store some files in the Zebra printer like ( image1.jpg, img2.png, img3.bmp, testfile.pdf, printarray.zpl, printhash.zpl and files with no extention )<br /> 3.  Disconnect the printer. <br />4. Call Retrieve file names with callback");
			setExpected("1. Callback should get fired and STATUS_ERROR should be thrown on failure in search");
		});
		
		
		runs(function() {
				PrinterConnectiontype();
			});
		
		runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			if (PrinterInstance.isConnected) {
				PrinterInstance.disconnect();
			}
			PrinterInstance.retrieveFileNames(retrieveCallback);
		});
		
		waitsFor(function() {
			return document.getElementById("actResult").innerHTML != "init";
		}, "Timed out waiting for tester to respond", ENABLE30MIN);
		runs(function() {
			expect("pass").toEqual(document.getElementById("actResult").innerHTML);
		});
	});



	it("VTXXX-0106 | Retrieve file names stored on printer using retrieveFileNames method ( with Anonymous callback )" , function() {
		runs(function() {
			setObjective("VTXXX-0106 | Retrieve file names stored on printer using retrieveFileNames method ( with Anonymous callback )");
			setInstruction("1. Connect a Zebra printer with the device <br /> 2. Store some files in the Zebra printer like ( image1.jpg, img2.png, img3.bmp, testfile.pdf, printarray.zpl, printhash.zpl and files with no extention )<br /> 3. Call Retrieve file names with Anonymous callback");
			setExpected("1. Retrieves the names of the files which are stored on the printer. <br /> 2. Callback should get fired with HASH containing status STATUS_SUCCESS and with all the file names (image1.jpg, img2.png, img3.bmp, testfile.pdf, printarray.zpl, printhash.zpl and file with no extention). <br />3. STATUS_ERROR should be thrown on failure in search");
		});
		
		
		runs(function() {
				PrinterConnectiontype();
			});
		
		runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			connect_status = PrinterInstance.connect();
			waitsFor(function()	{
				return PrinterInstance.isConnected;
			}, '9sec wait for connection', ENABLE9K);
			if (PrinterInstance.isConnected) {
				PrinterInstance.retrieveFileNames(function(data){retrieveCallback(data)});
			}
			else {
				displayResult("Failed to connect to the printer", connect_status);	
			}
		});
		
		runs(function() {
			if (PrinterInstance.isConnected) {
				PrinterInstance.disconnect();
			}
		});
		waitsFor(function() {
			return document.getElementById("actResult").innerHTML != "init";
		}, "Timed out waiting for tester to respond", ENABLE30MIN);
		runs(function() {
			expect("pass").toEqual(document.getElementById("actResult").innerHTML);
		});
	});

	it("VTXXX-0107 | Retrieve filenames with extension stored on printer using retrieveFileNamesWithExtensions method ( without Callback )" , function() {
		runs(function() {
			setObjective("VTXXX-0107 | Retrieve filenames with extension stored on printer using retrieveFileNamesWithExtensions method ( without Callback )");
			setInstruction("1. Connect a Zebra printer with the device <br /> 2. Store some files in Zebra printer like image1.jpg, img2.png, img3.bmp, testfile.pdf, printarray.zpl, printhash.zpl and file with no extention<br /> 3. Call Retrieve file names With Extensions");
			setExpected("1. Will only returns files which have the extensions in 'extensions'. <br />2. HASH containing Status STATUS_SUCCESS and all the file names contains below extension  ['png', 'bmp', 'jpg', 'pdf', 'zpl', 'txt', 'xls', 'doc']. <br />3. STATUS_ERROR should be thrown on failure in search.");
		});
		
		
		runs(function() {
				PrinterConnectiontype();
			});
		
		runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			connect_status = PrinterInstance.connect();
			waitsFor(function()	{
				return PrinterInstance.isConnected;
			}, '9sec wait for connection', ENABLE9K);
			if (PrinterInstance.isConnected) {
				retrievedfilenameswithextension = PrinterInstance.retrieveFileNamesWithExtensions(extentions ['png', 'bmp', 'jpg', 'pdf', 'zpl', 'txt', 'xls', 'doc']);
				waitsFor(function() {
					if(retrievedfilenameswithextension.status == STATUS_SUCCESS) {
						retrievedFlag = true;	
					}
					return retrievedFlag;
				}, '9sec wait to retrieve filenames', ENABLE9K);
				displayResult("Retrieved file names: ", JSON.stringify(retrievedfilenameswithextension));
			}
			else {
				displayResult("Failed to connect to the printer", connect_status);	
			}
		});
		
		runs(function() {
			if (PrinterInstance.isConnected) {
				PrinterInstance.disconnect();
			}
		});
		waitsFor(function() {
			return document.getElementById("actResult").innerHTML != "init";
		}, "Timed out waiting for tester to respond", ENABLE30MIN);
		runs(function() {
			expect("pass").toEqual(document.getElementById("actResult").innerHTML);
		});
	});

	it("VTXXX-0108 | Retrieve file names when files with no extension stored on printer using retrieveFileNamesWithExtensions method ( without Callback ) )" , function() {
		runs(function() {
			setObjective("VTXXX-0108 | Retrieve file names when files with no extension stored on printer using retrieveFileNamesWithExtensions method ( without Callback )");
			setInstruction("1. Connect a Zebra printer with the device <br /> 2. Store some files in Zebra printer which doesn't contain extention.<br /> 3. Call Retrieve file names With Extensions");
			setExpected("1. Will return Nil files. status STATUS_SUCCESS. <br />3. STATUS_ERROR should be thrown on failure in search.");
		});
		
		
		runs(function() {
				PrinterConnectiontype();
			});
		
		runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			connect_status = PrinterInstance.connect();
			waitsFor(function()	{
				return PrinterInstance.isConnected;
			}, '9sec wait for connection', ENABLE9K);
			if (PrinterInstance.isConnected) {
				retrievedfilenameswithextension = PrinterInstance.retrieveFileNamesWithExtensions(extentions ['png', 'bmp', 'jpg', 'pdf', 'zpl', 'txt', 'xls', 'doc']);
				waitsFor(function() {
					if(retrievedfilenameswithextension.status == STATUS_SUCCESS) {
						retrievedFlag = true;	
					}
					return retrievedFlag;
				}, '9sec wait to retrieve filenames', ENABLE9K);
				displayResult("Retrieved file names: ", JSON.stringify(retrievedfilenameswithextension));
			}
			else {
				displayResult("Failed to connect to the printer", connect_status);	
			}
		});
		
		runs(function() {
			if (PrinterInstance.isConnected) {
				PrinterInstance.disconnect();
			}
		});
		waitsFor(function() {
			return document.getElementById("actResult").innerHTML != "init";
		}, "Timed out waiting for tester to respond", ENABLE30MIN);
		runs(function() {
			expect("pass").toEqual(document.getElementById("actResult").innerHTML);
		});
	});

	it("VTXXX-0109 | Retrieve file names with extension stored on printer using retrieveFileNamesWithExtensions method when there is no connection or connection loss between device and printer( without Callback )" , function() {
		runs(function() {
			setObjective("VTXXX-0109 | Retrieve file names with extension stored on printer using retrieveFileNamesWithExtensions method when there is no connection or connection loss between device and printer( without Callback )");
			setInstruction("1. Connect a Zebra printer with the device <br /> 2. Store some files in Zebra printer like image1.jpg, img2.png, img3.bmp, testfile.pdf, printarray.zpl, printhash.zpl and file with no extention.<br /> 3. Disconnect the printer. <br /> 4. Call Retrieve file names With Extensions");
			setExpected("1. STATUS_ERROR should be thrown on failure in search.");
		});
		
		
		runs(function() {
				PrinterConnectiontype();
			});
		
		runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			if (PrinterInstance.isConnected) {
				PrinterInstance.disconnect();
			}
			retrievedfilenameswithextension = PrinterInstance.retrieveFileNamesWithExtensions(extentions ['png', 'bmp', 'jpg', 'pdf', 'zpl', 'txt', 'xls', 'doc']);
			waitsFor(function() {
				if(retrievedfilenameswithextension.status == STATUS_SUCCESS) {
					retrievedFlag = true;	
				}
				return retrievedFlag;
			}, '9sec wait to retrieve filenames', ENABLE9K);
			displayResult("Retrieved file names: ", JSON.stringify(retrievedfilenameswithextension));
		
		});
		
		runs(function() {
			
		});
		waitsFor(function() {
			return document.getElementById("actResult").innerHTML != "init";
		}, "Timed out waiting for tester to respond", ENABLE30MIN);
		runs(function() {
			expect("pass").toEqual(document.getElementById("actResult").innerHTML);
		});
	});


	it("VTXXX-0110 | Retrieve filenames with extension stored on printer using retrieveFileNamesWithExtensions method ( with Callback )" , function() {
		runs(function() {
			setObjective("VTXXX-0110 | Retrieve filenames with extension stored on printer using retrieveFileNamesWithExtensions method ( with Callback )");
			setInstruction("1. Connect a Zebra printer with the device <br /> 2. Store some files in Zebra printer like image1.jpg, img2.png, img3.bmp, testfile.pdf, printarray.zpl, printhash.zpl and file with no extention<br /> 3. Call Retrieve file names With Extensions with callback");
			setExpected("1. Will only returns files which have the extensions in 'extensions'. <br />2. Callback containing HASH with Status STATUS_SUCCESS and all the file names contains below extension  ['png', 'bmp', 'jpg', 'pdf', 'zpl', 'txt', 'xls', 'doc']. <br />3. STATUS_ERROR should be thrown on failure in search");
		});
		
		
		runs(function() {
				PrinterConnectiontype();
			});
		
		runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			connect_status = PrinterInstance.connect();
			waitsFor(function()	{
				return PrinterInstance.isConnected;
			}, '9sec wait for connection', ENABLE9K);
			if (PrinterInstance.isConnected) {
				PrinterInstance.retrieveFileNamesWithExtensions(extentions ['png', 'bmp', 'jpg', 'pdf', 'zpl', 'txt', 'xls', 'doc'], retrieveextensionCallback);
			}
			else {
				displayResult("Failed to connect to the printer", connect_status);	
			}
		});
		
		runs(function() {
			if (PrinterInstance.isConnected) {
				PrinterInstance.disconnect();
			}
		});
		waitsFor(function() {
			return document.getElementById("actResult").innerHTML != "init";
		}, "Timed out waiting for tester to respond", ENABLE30MIN);
		runs(function() {
			expect("pass").toEqual(document.getElementById("actResult").innerHTML);
		});
	});

	it("VTXXX-0111 | Retrieve file names when files with no extension stored on printer using retrieveFileNamesWithExtensions method ( with Callback ) )" , function() {
		runs(function() {
			setObjective("VTXXX-0111 | Retrieve file names when files with no extension stored on printer using retrieveFileNamesWithExtensions method ( with Callback )");
			setInstruction("1. Connect a Zebra printer with the device <br /> 2. Store some files in Zebra printer which doesn't contain extention.<br /> 3. Call Retrieve file names With Extensions with callback");
			setExpected("1. Callback with hash containing Nil filenames and status STATUS_SUCCESS. <br />3. STATUS_ERROR should be thrown on failure in search.");
		});
		
		
		runs(function() {
				PrinterConnectiontype();
			});
		
		runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			connect_status = PrinterInstance.connect();
			waitsFor(function()	{
				return PrinterInstance.isConnected;
			}, '9sec wait for connection', ENABLE9K);
			if (PrinterInstance.isConnected) {
				PrinterInstance.retrieveFileNamesWithExtensions(extentions ['png', 'bmp', 'jpg', 'pdf', 'zpl', 'txt', 'xls', 'doc'], retrieveextensionCallback);
			}
			else {
				displayResult("Failed to connect to the printer", connect_status);	
			}
		});
		
		runs(function() {
			if (PrinterInstance.isConnected) {
				PrinterInstance.disconnect();
			}
		});
		waitsFor(function() {
			return document.getElementById("actResult").innerHTML != "init";
		}, "Timed out waiting for tester to respond", ENABLE30MIN);
		runs(function() {
			expect("pass").toEqual(document.getElementById("actResult").innerHTML);
		});
	});

	it("VTXXX-0112 | Retrieve file names with extension stored on printer using retrieveFileNamesWithExtensions method ( with anonymous callback )" , function() {
		runs(function() {
			setObjective("VTXXX-0112 | Retrieve file names with extension stored on printer using retrieveFileNamesWithExtensions method ( with anonymous callback )");
			setInstruction("1. Connect a Zebra printer with the device <br /> 2. Store some files in Zebra printer like image1.jpg, img2.png, img3.bmp, testfile.pdf, printarray.zpl, printhash.zpl and file with no extention<br /> 3. Call Retrieve file names With Extensions with anonymous callback");
			setExpected("1. Will only returns files which have the extensions in 'extensions'. <br />2. Anonymous callback containing HASH with Status STATUS_SUCCESS and all the file names contains below extension  ['png', 'bmp', 'jpg', 'pdf', 'zpl', 'txt', 'xls', 'doc']. <br />3. STATUS_ERROR should be thrown on failure in search.");
		});
		
		
		runs(function() {
				PrinterConnectiontype();
			});
		
		runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			connect_status = PrinterInstance.connect();
			waitsFor(function()	{
				return PrinterInstance.isConnected;
			}, '9sec wait for connection', ENABLE9K);
			if (PrinterInstance.isConnected) {
				PrinterInstance.retrieveFileNamesWithExtensions(extentions ['png', 'bmp', 'jpg', 'pdf', 'zpl', 'txt', 'xls', 'doc'], function(data){ retrieveextensionCallback(data);});
			}
			else {
				displayResult("Failed to connect to the printer", connect_status);	
			}
		});
		
		runs(function() {
			if (PrinterInstance.isConnected) {
				PrinterInstance.disconnect();
			}
		});
		waitsFor(function() {
			return document.getElementById("actResult").innerHTML != "init";
		}, "Timed out waiting for tester to respond", ENABLE30MIN);
		runs(function() {
			expect("pass").toEqual(document.getElementById("actResult").innerHTML);
		});
	});


	it("VTXXX-0113 | Retrieve file names with extension stored on printer using retrieveFileNamesWithExtensions method with nil extensions filter as param ( with Callback )" , function() {
		runs(function() {
			setObjective("VTXXX-0113 | Retrieve file names with extension stored on printer using retrieveFileNamesWithExtensions method with nil extensions filter as param ( with Callback )");
			setInstruction("1. Connect a Zebra printer with the device <br /> 2. Store some files in Zebra printer like image1.jpg, img2.png, img3.bmp, testfile.pdf, printarray.zpl, printhash.zpl and file with no extention<br /> 3. Call Retrieve file names With Extensions nil param with callback");
			setExpected("1. Will only returns files which have the extensions in 'extensions'. <br />2. Callback containing HASH with Status STATUS_SUCCESS and nil files. <br />3. STATUS_ERROR should be thrown on failure in search.");
		});
		
		
		runs(function() {
				PrinterConnectiontype();
			});
		
		runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			connect_status = PrinterInstance.connect();
			waitsFor(function()	{
				return PrinterInstance.isConnected;
			}, '9sec wait for connection', ENABLE9K);
			if (PrinterInstance.isConnected) {
				PrinterInstance.retrieveFileNamesWithExtensions(extentions, retrieveextensionCallback);
			}
			else {
				displayResult("Failed to connect to the printer", connect_status);	
			}
		});
		
		runs(function() {
			if (PrinterInstance.isConnected) {
				PrinterInstance.disconnect();
			}
		});
		waitsFor(function() {
			return document.getElementById("actResult").innerHTML != "init";
		}, "Timed out waiting for tester to respond", ENABLE30MIN);
		runs(function() {
			expect("pass").toEqual(document.getElementById("actResult").innerHTML);
		});
	});

	it("VTXXX-0114 | sendFileContents method with txt filepath ( with callback )" , function() {
		runs(function() {
			setObjective("VTXXX-0114 | sendFileContents method with txt filepath ( with callback )");
			setInstruction("1. Connect a Zebra printer with the device <br /> 2. Call sendFileContents (TXT file path) with callback.");
			setExpected("1. Callback should be fired on successful print with return STATUS_SUCCESS <br /> 2. STATUS_ERROR should be thrown on failure in print.");
		});
		
		
		runs(function() {
				PrinterConnectiontype();
			});
		
		runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			connect_status = PrinterInstance.connect();
			waitsFor(function()	{
				return PrinterInstance.isConnected;
			}, '9sec wait for connection', ENABLE9K);
			if (PrinterInstance.isConnected) {
				PrinterInstance.sendFileContents(txtfilepath, sendfilecontentsCallback);
			}
			else {
				displayResult("Failed to connect to the printer", connect_status);	
			}
		});
		
		runs(function() {
			if (PrinterInstance.isConnected) {
				PrinterInstance.disconnect();
			}
		});
		waitsFor(function() {
			return document.getElementById("actResult").innerHTML != "init";
		}, "Timed out waiting for tester to respond", ENABLE30MIN);
		runs(function() {
			expect("pass").toEqual(document.getElementById("actResult").innerHTML);
		});
	});


	it("VTXXX-0115 | sendFileContents method with CSV filepath ( with callback )" , function() {
		runs(function() {
			setObjective("VTXXX-0115 | sendFileContents method with CSV filepath ( with callback )");
			setInstruction("1. Connect a Zebra printer with the device <br /> 2. Call sendFileContents (CSV file path) with callback.");
			setExpected("1. Callback should be fired on successful print with return STATUS_SUCCESS <br /> 2. STATUS_ERROR should be thrown on failure in print.");
		});
		
		
		runs(function() {
				PrinterConnectiontype();
			});
		
		runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			connect_status = PrinterInstance.connect();
			waitsFor(function()	{
				return PrinterInstance.isConnected;
			}, '9sec wait for connection', ENABLE9K);
			if (PrinterInstance.isConnected) {
				PrinterInstance.sendFileContents(csvfilepath, sendfilecontentsCallback);
			}
			else {
				displayResult("Failed to connect to the printer", connect_status);	
			}
		});
		
		runs(function() {
			if (PrinterInstance.isConnected) {
				PrinterInstance.disconnect();
			}
		});
		waitsFor(function() {
			return document.getElementById("actResult").innerHTML != "init";
		}, "Timed out waiting for tester to respond", ENABLE30MIN);
		runs(function() {
			expect("pass").toEqual(document.getElementById("actResult").innerHTML);
		});
	});

	it("VTXXX-0116 | sendFileContents method with xls filepath ( with callback )" , function() {
		runs(function() {
			setObjective("VTXXX-0116 | sendFileContents method with xls filepath ( with callback )");
			setInstruction("1. Connect a Zebra printer with the device <br /> 2. Call sendFileContents (xls file path) with callback.");
			setExpected("1. Callback should be fired on successful print with return STATUS_SUCCESS <br /> 2. STATUS_ERROR should be thrown on failure in print.");
		});
		
		
		runs(function() {
				PrinterConnectiontype();
			});
		
		runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			connect_status = PrinterInstance.connect();
			waitsFor(function()	{
				return PrinterInstance.isConnected;
			}, '9sec wait for connection', ENABLE9K);
			if (PrinterInstance.isConnected) {
				PrinterInstance.sendFileContents(xlsfilepath, sendfilecontentsCallback);
			}
			else {
				displayResult("Failed to connect to the printer", connect_status);	
			}
		});
		
		runs(function() {
			if (PrinterInstance.isConnected) {
				PrinterInstance.disconnect();
			}
		});
		waitsFor(function() {
			return document.getElementById("actResult").innerHTML != "init";
		}, "Timed out waiting for tester to respond", ENABLE30MIN);
		runs(function() {
			expect("pass").toEqual(document.getElementById("actResult").innerHTML);
		});
	});

	it("VTXXX-0117 | sendFileContents method with doc filepath ( with callback )" , function() {
		runs(function() {
			setObjective("VTXXX-0117 | sendFileContents method with doc filepath ( with callback )");
			setInstruction("1. Connect a Zebra printer with the device <br /> 2. Call sendFileContents (doc file path) with callback.");
			setExpected("1. Callback should be fired on successful print with return STATUS_SUCCESS <br /> 2. STATUS_ERROR should be thrown on failure in print.");
		});
		
		
		runs(function() {
				PrinterConnectiontype();
			});
		
		runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			connect_status = PrinterInstance.connect();
			waitsFor(function()	{
				return PrinterInstance.isConnected;
			}, '9sec wait for connection', ENABLE9K);
			if (PrinterInstance.isConnected) {
				PrinterInstance.sendFileContents(docfilepath, sendfilecontentsCallback);
			}
			else {
				displayResult("Failed to connect to the printer", connect_status);	
			}
		});
		
		runs(function() {
			if (PrinterInstance.isConnected) {
				PrinterInstance.disconnect();
			}
		});
		waitsFor(function() {
			return document.getElementById("actResult").innerHTML != "init";
		}, "Timed out waiting for tester to respond", ENABLE30MIN);
		runs(function() {
			expect("pass").toEqual(document.getElementById("actResult").innerHTML);
		});
	});

	it("VTXXX-0118 | sendFileContents method with HTML CSS filepath ( with callback )" , function() {
		runs(function() {
			setObjective("VTXXX-0118 | sendFileContents method with HTML CSS  filepath ( with callback )");
			setInstruction("1. Connect a Zebra printer with the device <br /> 2. Call sendFileContents (HTML CSS  file path) with callback.");
			setExpected("1. Callback should be fired on successful print with return STATUS_SUCCESS <br /> 2. STATUS_ERROR should be thrown on failure in print.");
		});
		
		
		runs(function() {
				PrinterConnectiontype();
			});
		
		runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			connect_status = PrinterInstance.connect();
			waitsFor(function()	{
				return PrinterInstance.isConnected;
			}, '9sec wait for connection', ENABLE9K);
			if (PrinterInstance.isConnected) {
				PrinterInstance.sendFileContents(htmlcssfilepath, sendfilecontentsCallback);
			}
			else {
				displayResult("Failed to connect to the printer", connect_status);	
			}
		});
		
		runs(function() {
			if (PrinterInstance.isConnected) {
				PrinterInstance.disconnect();
			}
		});
		waitsFor(function() {
			return document.getElementById("actResult").innerHTML != "init";
		}, "Timed out waiting for tester to respond", ENABLE30MIN);
		runs(function() {
			expect("pass").toEqual(document.getElementById("actResult").innerHTML);
		});
	});	

	it("VTXXX-0119 | sendFileContents method with js filepath ( with callback )" , function() {
		runs(function() {
			setObjective("VTXXX-0119 | sendFileContents method with js filepath ( with callback )");
			setInstruction("1. Connect a Zebra printer with the device <br /> 2. Call sendFileContents (js  file path) with callback.");
			setExpected("1. Callback should be fired on successful print with return STATUS_SUCCESS <br /> 2. STATUS_ERROR should be thrown on failure in print.");
		});
		
		
		runs(function() {
				PrinterConnectiontype();
			});
		
		runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			connect_status = PrinterInstance.connect();
			waitsFor(function()	{
				return PrinterInstance.isConnected;
			}, '9sec wait for connection', ENABLE9K);
			if (PrinterInstance.isConnected) {
				PrinterInstance.sendFileContents(jsfilepath, sendfilecontentsCallback);
			}
			else {
				displayResult("Failed to connect to the printer", connect_status);	
			}
		});
		
		runs(function() {
			if (PrinterInstance.isConnected) {
				PrinterInstance.disconnect();
			}
		});
		waitsFor(function() {
			return document.getElementById("actResult").innerHTML != "init";
		}, "Timed out waiting for tester to respond", ENABLE30MIN);
		runs(function() {
			expect("pass").toEqual(document.getElementById("actResult").innerHTML);
		});
	});	
	
	it("VTXXX-0120 | sendFileContents method with cpp filepath ( with callback )" , function() {
		runs(function() {
			setObjective("VTXXX-0120 | sendFileContents method with cpp filepath ( with callback )");
			setInstruction("1. Connect a Zebra printer with the device <br /> 2. Call sendFileContents (cpp  file path) with callback.");
			setExpected("1. Callback should be fired on successful print with return STATUS_SUCCESS <br /> 2. STATUS_ERROR should be thrown on failure in print.");
		});
		
		
		runs(function() {
				PrinterConnectiontype();
			});
		
		runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			connect_status = PrinterInstance.connect();
			waitsFor(function()	{
				return PrinterInstance.isConnected;
			}, '9sec wait for connection', ENABLE9K);
			if (PrinterInstance.isConnected) {
				PrinterInstance.sendFileContents(cppfilepath, sendfilecontentsCallback);
			}
			else {
				displayResult("Failed to connect to the printer", connect_status);	
			}
		});
		
		runs(function() {
			if (PrinterInstance.isConnected) {
				PrinterInstance.disconnect();
			}
		});
		waitsFor(function() {
			return document.getElementById("actResult").innerHTML != "init";
		}, "Timed out waiting for tester to respond", ENABLE30MIN);
		runs(function() {
			expect("pass").toEqual(document.getElementById("actResult").innerHTML);
		});
	});		

	it("VTXXX-0121 | sendFileContents method with jpg filepath ( with callback )" , function() {
		runs(function() {
			setObjective("VTXXX-0121 | sendFileContents method with jpg filepath ( with callback )");
			setInstruction("1. Connect a Zebra printer with the device <br /> 2. Call sendFileContents (jpg  file path) with callback.");
			setExpected("1. Callback should be fired on successful print with return STATUS_SUCCESS <br /> 2. STATUS_ERROR should be thrown on failure in print.");
		});
		
		
		runs(function() {
				PrinterConnectiontype();
			});
		
		runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			connect_status = PrinterInstance.connect();
			waitsFor(function()	{
				return PrinterInstance.isConnected;
			}, '9sec wait for connection', ENABLE9K);
			if (PrinterInstance.isConnected) {
				PrinterInstance.sendFileContents(jpgfilepath, sendfilecontentsCallback);
			}
			else {
				displayResult("Failed to connect to the printer", connect_status);	
			}
		});
		
		runs(function() {
			if (PrinterInstance.isConnected) {
				PrinterInstance.disconnect();
			}
		});
		waitsFor(function() {
			return document.getElementById("actResult").innerHTML != "init";
		}, "Timed out waiting for tester to respond", ENABLE30MIN);
		runs(function() {
			expect("pass").toEqual(document.getElementById("actResult").innerHTML);
		});
	});	
	
	it("VTXXX-0122 | sendFileContents method with png filepath ( with callback )" , function() {
		runs(function() {
			setObjective("VTXXX-0122 | sendFileContents method with png filepath ( with callback )");
			setInstruction("1. Connect a Zebra printer with the device <br /> 2. Call sendFileContents (png  file path) with callback.");
			setExpected("1. Callback should be fired on successful print with return STATUS_SUCCESS <br /> 2. STATUS_ERROR should be thrown on failure in print.");
		});
		
		
		runs(function() {
				PrinterConnectiontype();
			});
		
		runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			connect_status = PrinterInstance.connect();
			waitsFor(function()	{
				return PrinterInstance.isConnected;
			}, '9sec wait for connection', ENABLE9K);
			if (PrinterInstance.isConnected) {
				PrinterInstance.sendFileContents(pngfilepath, sendfilecontentsCallback);
			}
			else {
				displayResult("Failed to connect to the printer", connect_status);	
			}
		});
		
		runs(function() {
			if (PrinterInstance.isConnected) {
				PrinterInstance.disconnect();
			}
		});
		waitsFor(function() {
			return document.getElementById("actResult").innerHTML != "init";
		}, "Timed out waiting for tester to respond", ENABLE30MIN);
		runs(function() {
			expect("pass").toEqual(document.getElementById("actResult").innerHTML);
		});
	});	
	
	it("VTXXX-0123 | sendFileContents method with bmp filepath ( with callback )" , function() {
		runs(function() {
			setObjective("VTXXX-0123 | sendFileContents method with bmp filepath ( with callback )");
			setInstruction("1. Connect a Zebra printer with the device <br /> 2. Call sendFileContents (bmp  file path) with callback.");
			setExpected("1. Callback should be fired on successful print with return STATUS_SUCCESS <br /> 2. STATUS_ERROR should be thrown on failure in print.");
		});
		
		
		runs(function() {
				PrinterConnectiontype();
			});
		
		runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			connect_status = PrinterInstance.connect();
			waitsFor(function()	{
				return PrinterInstance.isConnected;
			}, '9sec wait for connection', ENABLE9K);
			if (PrinterInstance.isConnected) {
				PrinterInstance.sendFileContents(bmpfilepath, sendfilecontentsCallback);
			}
			else {
				displayResult("Failed to connect to the printer", connect_status);	
			}
		});
		
		runs(function() {
			if (PrinterInstance.isConnected) {
				PrinterInstance.disconnect();
			}
		});
		waitsFor(function() {
			return document.getElementById("actResult").innerHTML != "init";
		}, "Timed out waiting for tester to respond", ENABLE30MIN);
		runs(function() {
			expect("pass").toEqual(document.getElementById("actResult").innerHTML);
		});
	});	

	it("VTXXX-0124 | sendFileContents method with gif filepath ( with callback )" , function() {
		runs(function() {
			setObjective("VTXXX-0124 | sendFileContents method with gif filepath ( with callback )");
			setInstruction("1. Connect a Zebra printer with the device <br /> 2. Call sendFileContents (gif  file path) with callback.");
			setExpected("1. Callback should be fired on successful print with return STATUS_SUCCESS <br /> 2. STATUS_ERROR should be thrown on failure in print.");
		});
		
		
		runs(function() {
				PrinterConnectiontype();
			});
		
		runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			connect_status = PrinterInstance.connect();
			waitsFor(function()	{
				return PrinterInstance.isConnected;
			}, '9sec wait for connection', ENABLE9K);
			if (PrinterInstance.isConnected) {
				PrinterInstance.sendFileContents(giffilepath, sendfilecontentsCallback);
			}
			else {
				displayResult("Failed to connect to the printer", connect_status);	
			}
		});
		
		runs(function() {
			if (PrinterInstance.isConnected) {
				PrinterInstance.disconnect();
			}
		});
		waitsFor(function() {
			return document.getElementById("actResult").innerHTML != "init";
		}, "Timed out waiting for tester to respond", ENABLE30MIN);
		runs(function() {
			expect("pass").toEqual(document.getElementById("actResult").innerHTML);
		});
	});	
	
	it("VTXXX-0125 | sendFileContents method with pdf filepath ( with callback )" , function() {
		runs(function() {
			setObjective("VTXXX-0125 | sendFileContents method with pdf filepath ( with callback )");
			setInstruction("1. Connect a Zebra printer with the device <br /> 2. Call sendFileContents (pdf  file path) with callback.");
			setExpected("1. Callback should be fired on successful print with return STATUS_SUCCESS <br /> 2. STATUS_ERROR should be thrown on failure in print.");
		});
		
		
		runs(function() {
				PrinterConnectiontype();
			});
		
		runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			connect_status = PrinterInstance.connect();
			waitsFor(function()	{
				return PrinterInstance.isConnected;
			}, '9sec wait for connection', ENABLE9K);
			if (PrinterInstance.isConnected) {
				PrinterInstance.sendFileContents(pdffilepath, sendfilecontentsCallback);
			}
			else {
				displayResult("Failed to connect to the printer", connect_status);	
			}
		});
		
		runs(function() {
			if (PrinterInstance.isConnected) {
				PrinterInstance.disconnect();
			}
		});
		waitsFor(function() {
			return document.getElementById("actResult").innerHTML != "init";
		}, "Timed out waiting for tester to respond", ENABLE30MIN);
		runs(function() {
			expect("pass").toEqual(document.getElementById("actResult").innerHTML);
		});
	});		

	it("VTXXX-0126 | sendFileContents method with HASH ZPL format filepath ( with callback )" , function() {
		runs(function() {
			setObjective("VTXXX-0126 | sendFileContents method with HASH ZPL format filepath ( with callback )");
			setInstruction("1. Connect a Zebra printer with the device <br /> 2. Call sendFileContents (HASH ZPL format  file path) with callback.");
			setExpected("1. Callback should be fired on successful print with return STATUS_SUCCESS <br /> 2. STATUS_ERROR should be thrown on failure in print.");
		});
		
		
		runs(function() {
				PrinterConnectiontype();
			});
		
		runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			connect_status = PrinterInstance.connect();
			waitsFor(function()	{
				return PrinterInstance.isConnected;
			}, '9sec wait for connection', ENABLE9K);
			if (PrinterInstance.isConnected) {
				PrinterInstance.sendFileContents(hashzplfilepath, sendfilecontentsCallback);
			}
			else {
				displayResult("Failed to connect to the printer", connect_status);	
			}
		});
		
		runs(function() {
			if (PrinterInstance.isConnected) {
				PrinterInstance.disconnect();
			}
		});
		waitsFor(function() {
			return document.getElementById("actResult").innerHTML != "init";
		}, "Timed out waiting for tester to respond", ENABLE30MIN);
		runs(function() {
			expect("pass").toEqual(document.getElementById("actResult").innerHTML);
		});
	});	
	
	it("VTXXX-0127 | sendFileContents method with HASH CCPL format filepath ( with callback )" , function() {
		runs(function() {
			setObjective("VTXXX-0127 | sendFileContents method with HASH CCPL format filepath ( with callback )");
			setInstruction("1. Connect a Zebra printer with the device <br /> 2. Call sendFileContents (HASH CCPL format  file path) with callback.");
			setExpected("1. Callback should be fired on successful print with return STATUS_SUCCESS <br /> 2. STATUS_ERROR should be thrown on failure in print.");
		});
		
		
		runs(function() {
				PrinterConnectiontype();
			});
		
		runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			connect_status = PrinterInstance.connect();
			waitsFor(function()	{
				return PrinterInstance.isConnected;
			}, '9sec wait for connection', ENABLE9K);
			if (PrinterInstance.isConnected) {
				PrinterInstance.sendFileContents(hashccplfilepath, sendfilecontentsCallback);
			}
			else {
				displayResult("Failed to connect to the printer", connect_status);	
			}
		});
		
		runs(function() {
			if (PrinterInstance.isConnected) {
				PrinterInstance.disconnect();
			}
		});
		waitsFor(function() {
			return document.getElementById("actResult").innerHTML != "init";
		}, "Timed out waiting for tester to respond", ENABLE30MIN);
		runs(function() {
			expect("pass").toEqual(document.getElementById("actResult").innerHTML);
		});
	});		
	
	it("VTXXX-0128 | sendFileContents method with Array ZPL format filepath ( with callback )" , function() {
		runs(function() {
			setObjective("VTXXX-0128 | sendFileContents method with Array ZPL format filepath ( with callback )");
			setInstruction("1. Connect a Zebra printer with the device <br /> 2. Call sendFileContents (Array ZPL format  file path) with callback.");
			setExpected("1. Callback should be fired on successful print with return STATUS_SUCCESS <br /> 2. STATUS_ERROR should be thrown on failure in print.");
		});
		
		
		runs(function() {
				PrinterConnectiontype();
			});
		
		runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			connect_status = PrinterInstance.connect();
			waitsFor(function()	{
				return PrinterInstance.isConnected;
			}, '9sec wait for connection', ENABLE9K);
			if (PrinterInstance.isConnected) {
				PrinterInstance.sendFileContents(arrayzplfilepath, sendfilecontentsCallback);
			}
			else {
				displayResult("Failed to connect to the printer", connect_status);	
			}
		});
		
		runs(function() {
			if (PrinterInstance.isConnected) {
				PrinterInstance.disconnect();
			}
		});
		waitsFor(function() {
			return document.getElementById("actResult").innerHTML != "init";
		}, "Timed out waiting for tester to respond", ENABLE30MIN);
		runs(function() {
			expect("pass").toEqual(document.getElementById("actResult").innerHTML);
		});
	});	
	
	it("VTXXX-0129 | sendFileContents method with Array CCPL format filepath ( with callback )" , function() {
		runs(function() {
			setObjective("VTXXX-0129 | sendFileContents method with Array CCPL format filepath ( with callback )");
			setInstruction("1. Connect a Zebra printer with the device <br /> 2. Call sendFileContents (Array CCPL format  file path) with callback.");
			setExpected("1. Callback should be fired on successful print with return STATUS_SUCCESS <br /> 2. STATUS_ERROR should be thrown on failure in print.");
		});
		
		
		runs(function() {
				PrinterConnectiontype();
			});
		
		runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			connect_status = PrinterInstance.connect();
			waitsFor(function()	{
				return PrinterInstance.isConnected;
			}, '9sec wait for connection', ENABLE9K);
			if (PrinterInstance.isConnected) {
				PrinterInstance.sendFileContents(arrayccplfilepath, sendfilecontentsCallback);
			}
			else {
				displayResult("Failed to connect to the printer", connect_status);	
			}
		});
		
		runs(function() {
			if (PrinterInstance.isConnected) {
				PrinterInstance.disconnect();
			}
		});
		waitsFor(function() {
			return document.getElementById("actResult").innerHTML != "init";
		}, "Timed out waiting for tester to respond", ENABLE30MIN);
		runs(function() {
			expect("pass").toEqual(document.getElementById("actResult").innerHTML);
		});
	});		

	it("VTXXX-0130 | sendFileContents method with Invalid file contents filepath ( with callback )" , function() {
		runs(function() {
			setObjective("VTXXX-0130 | sendFileContents method with Invalid file contents filepath ( with callback )");
			setInstruction("1. Connect a Zebra printer with the device <br /> 2. Call sendFileContents (Invalid file contents file path) with callback.");
			setExpected("1. Callback should be fired on successful print with return STATUS_SUCCESS <br /> 2. STATUS_ERROR should be thrown on failure in print.");
		});
		
		
		runs(function() {
				PrinterConnectiontype();
			});
		
		runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			connect_status = PrinterInstance.connect();
			waitsFor(function()	{
				return PrinterInstance.isConnected;
			}, '9sec wait for connection', ENABLE9K);
			if (PrinterInstance.isConnected) {
				PrinterInstance.sendFileContents(invalidcontentsfilepath, sendfilecontentsCallback);
			}
			else {
				displayResult("Failed to connect to the printer", connect_status);	
			}
		});
		
		runs(function() {
			if (PrinterInstance.isConnected) {
				PrinterInstance.disconnect();
			}
		});
		waitsFor(function() {
			return document.getElementById("actResult").innerHTML != "init";
		}, "Timed out waiting for tester to respond", ENABLE30MIN);
		runs(function() {
			expect("pass").toEqual(document.getElementById("actResult").innerHTML);
		});
	});	

	it("VTXXX-0131 | sendFileContents method with Invalid filepath ( with callback )" , function() {
		runs(function() {
			setObjective("VTXXX-0131 | sendFileContents method with Invalid filepath ( with callback )");
			setInstruction("1. Connect a Zebra printer with the device <br /> 2. Call sendFileContents (Invalid file path) with callback.");
			setExpected("1. Callback should be fired on successful print with return STATUS_SUCCESS <br /> 2. STATUS_ERROR should be thrown on failure in print.");
		});
		
		
		runs(function() {
				PrinterConnectiontype();
			});
		
		runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			connect_status = PrinterInstance.connect();
			waitsFor(function()	{
				return PrinterInstance.isConnected;
			}, '9sec wait for connection', ENABLE9K);
			if (PrinterInstance.isConnected) {
				PrinterInstance.sendFileContents(invalidfilepath, sendfilecontentsCallback);
			}
			else {
				displayResult("Failed to connect to the printer", connect_status);	
			}
		});
		
		runs(function() {
			if (PrinterInstance.isConnected) {
				PrinterInstance.disconnect();
			}
		});
		waitsFor(function() {
			return document.getElementById("actResult").innerHTML != "init";
		}, "Timed out waiting for tester to respond", ENABLE30MIN);
		runs(function() {
			expect("pass").toEqual(document.getElementById("actResult").innerHTML);
		});
	});		
	
	it("VTXXX-0132 | sendFileContents method with PDF filepath ( with Anonymous callback )" , function() {
		runs(function() {
			setObjective("VTXXX-0132 | sendFileContents method with PDF filepath ( with Anonymous callback )");
			setInstruction("1. Connect a Zebra printer with the device <br /> 2. Call sendFileContents (PDF file path) with Anonymous callback.");
			setExpected("1. Callback should be fired on successful print with return STATUS_SUCCESS <br /> 2. STATUS_ERROR should be thrown on failure in print.");
		});
		
		
		runs(function() {
				PrinterConnectiontype();
			});
		
		runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			connect_status = PrinterInstance.connect();
			waitsFor(function()	{
				return PrinterInstance.isConnected;
			}, '9sec wait for connection', ENABLE9K);
			if (PrinterInstance.isConnected) {
				PrinterInstance.sendFileContents(pdffilepath, function(data){sendfilecontentsCallback(data);});
			}
			else {
				displayResult("Failed to connect to the printer", connect_status);	
			}
		});
		
		runs(function() {
			if (PrinterInstance.isConnected) {
				PrinterInstance.disconnect();
			}
		});
		waitsFor(function() {
			return document.getElementById("actResult").innerHTML != "init";
		}, "Timed out waiting for tester to respond", ENABLE30MIN);
		runs(function() {
			expect("pass").toEqual(document.getElementById("actResult").innerHTML);
		});
	});	

	it("VTXXX-0133 | sendFileContents method with any file or PDF or XLS in filepath with no connection or connection loss between printer and device( with callback )" , function() {
		runs(function() {
			setObjective("VTXXX-0133 | sendFileContents method with PDF filepath ( with Anonymous callback )");
			setInstruction("1. Disconnect the printer. <br />2. Send XLS file contents ( with callback )");
			setExpected("1. Callback should be fired on successful print with return STATUS_SUCCESS <br /> 2. STATUS_ERROR should be thrown on failure in print.");
		});
		
		
		runs(function() {
			PrinterConnectiontype();
		});
		
		runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			if (PrinterInstance.isConnected) {
				PrinterInstance.disconnect();
			}
			
			if (!PrinterInstance.isConnected) {
				PrinterInstance.sendFileContents(pdffilepath, sendfilecontentsCallback);
			}
			else {
				displayResult("Printer is not disconnected", connect_status);	
			}
		});
		
		runs(function() {
			if (PrinterInstance.isConnected) {
				PrinterInstance.disconnect();
			}
		});
		waitsFor(function() {
			return document.getElementById("actResult").innerHTML != "init";
		}, "Timed out waiting for tester to respond", ENABLE30MIN);
		runs(function() {
			expect("pass").toEqual(document.getElementById("actResult").innerHTML);
		});
	});

	it("VTXXX-0134 | sendFileContents method with ( PDF or XLS or DOC or TXT or JS or JPG or BMP or GIF or PNG or HASH ZPL or Array CCPL )filepath ( without Callback )" , function() {
		runs(function() {
			setObjective("VTXXX-0134 | sendFileContents method with ( PDF or XLS or DOC or TXT or JS or JPG or BMP or GIF or PNG or HASH ZPL or Array CCPL )filepath ( without Callback )");
			setInstruction("1. Connect a Zebra printer with the device <br /> 2. Call sendFileContents ( PDF or XLS or DOC or TXT or JS or JPG or BMP or GIF or PNG or HASH ZPL or Array CCPL ) ( without Callback ).");
			setExpected("1. Callback should be fired on successful print with return STATUS_SUCCESS <br /> 2. STATUS_ERROR should be thrown on failure in print.");
		});
		
		
		runs(function() {
				PrinterConnectiontype();
			});
		
		runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			connect_status = PrinterInstance.connect();
			waitsFor(function()	{
				return PrinterInstance.isConnected;
			}, '9sec wait for connection', ENABLE9K);
			if (PrinterInstance.isConnected) {
				//TODO: add code
			}
			else {
				displayResult("Failed to connect to the printer", connect_status);	
			}
		});
		
		runs(function() {
			if (PrinterInstance.isConnected) {
				PrinterInstance.disconnect();
			}
		});
		waitsFor(function() {
			return document.getElementById("actResult").innerHTML != "init";
		}, "Timed out waiting for tester to respond", ENABLE30MIN);
		runs(function() {
			expect("pass").toEqual(document.getElementById("actResult").innerHTML);
		});
	});	

	it("VTXXX-0135 | sendFileContents method with Invalid file contents filepath ( without callback )" , function() {
		runs(function() {
			setObjective("VTXXX-0130 | sendFileContents method with Invalid file contents filepath ( without callback )");
			setInstruction("1. Connect a Zebra printer with the device <br /> 2. Call sendFileContents (Invalid file contents file path) without callback.");
			setExpected("1.STATUS_ERROR should be thrown on failure in print.");
		});
		
		
		runs(function() {
				PrinterConnectiontype();
			});
		
		runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			connect_status = PrinterInstance.connect();
			waitsFor(function()	{
				return PrinterInstance.isConnected;
			}, '9sec wait for connection', ENABLE9K);
			if (PrinterInstance.isConnected) {
				PrinterInstance.sendFileContents(invalidcontentsfilepath);
			}
			else {
				displayResult("Failed to connect to the printer", connect_status);	
			}
		});
		
		runs(function() {
			if (PrinterInstance.isConnected) {
				PrinterInstance.disconnect();
			}
		});
		waitsFor(function() {
			return document.getElementById("actResult").innerHTML != "init";
		}, "Timed out waiting for tester to respond", ENABLE30MIN);
		runs(function() {
			expect("pass").toEqual(document.getElementById("actResult").innerHTML);
		});
	});	

	it("VTXXX-0136 | sendFileContents method with Invalid filepath ( without callback )" , function() {
		runs(function() {
			setObjective("VTXXX-0136 | sendFileContents method with Invalid filepath ( without callback )");
			setInstruction("1. Connect a Zebra printer with the device <br /> 2. Call sendFileContents (Invalid file path) without callback.");
			setExpected("1.STATUS_ERROR should be thrown on failure in print.");
		});
		
		
		runs(function() {
				PrinterConnectiontype();
			});
		
		runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			connect_status = PrinterInstance.connect();
			waitsFor(function()	{
				return PrinterInstance.isConnected;
			}, '9sec wait for connection', ENABLE9K);
			if (PrinterInstance.isConnected) {
				PrinterInstance.sendFileContents(invalidfilepath);
			}
			else {
				displayResult("Failed to connect to the printer", connect_status);	
			}
		});
		
		runs(function() {
			if (PrinterInstance.isConnected) {
				PrinterInstance.disconnect();
			}
		});
		waitsFor(function() {
			return document.getElementById("actResult").innerHTML != "init";
		}, "Timed out waiting for tester to respond", ENABLE30MIN);
		runs(function() {
			expect("pass").toEqual(document.getElementById("actResult").innerHTML);
		});
	});	

	it("VTXXX-0137 | sendFileContents method with any file or PDF or XLS in filepath with no connection or connection loss between printer and device( without callback )" , function() {
		runs(function() {
			setObjective("VTXXX-0137 | sendFileContents method with any file or PDF or XLS in filepath with no connection or connection loss between printer and device( without callback )");
			setInstruction("1. Disconnect the printer. <br /> 2. sendFileContents method with any file or PDF or XLS without callback.");
			setExpected("1.STATUS_ERROR should be thrown on failure in print.");
		});
		
		
		runs(function() {
				PrinterConnectiontype();
			});
		
		runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			connect_status = PrinterInstance.disconnect();
			if (!PrinterInstance.isConnected) {
				PrinterInstance.sendFileContents(invalidfilepath);
			}
			else {
				displayResult("Failed to disconnect the printer", connect_status);	
			}
		});
		
		runs(function() {
			if (PrinterInstance.isConnected) {
				PrinterInstance.disconnect();
			}
		});
		waitsFor(function() {
			return document.getElementById("actResult").innerHTML != "init";
		}, "Timed out waiting for tester to respond", ENABLE30MIN);
		runs(function() {
			expect("pass").toEqual(document.getElementById("actResult").innerHTML);
		});
	});		

	it("VTXXX-0138 | printStoredFormatWithHash method with ZPL HASH ( with Callback )" , function() {
		runs(function() {
			setObjective("VTXXX-0138 | printStoredFormatWithHash method with ZPL HASH ( with Callback )");
			setInstruction("1. Connect a Zebra printer with the device <br /> 2. Call printStoredFormatWithHash (  'E:FORMAT.ZPL',  HASH ZPL ) with callback.");
			setExpected("1. On successful print callback should return with STATUS_SUCCESS <br />2. On failure print callback should return with STATUS_ERROR ");
		});
		
		
		runs(function() {
				PrinterConnectiontype();
			});
		
		runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			connect_status = PrinterInstance.connect();
			waitsFor(function()	{
				return PrinterInstance.isConnected;
			}, '9sec wait for connection', ENABLE9K);
			if (PrinterInstance.isConnected) {
				PrinterInstance.printStoredFormatWithHash(zplformat, hashzpl, printStoredHashCallback);
			}
			else {
				displayResult("Failed to connect to the printer", connect_status);	
			}
		});
		
		runs(function() {
			if (PrinterInstance.isConnected) {
				PrinterInstance.disconnect();
			}
		});
		waitsFor(function() {
			return document.getElementById("actResult").innerHTML != "init";
		}, "Timed out waiting for tester to respond", ENABLE30MIN);
		runs(function() {
			expect("pass").toEqual(document.getElementById("actResult").innerHTML);
		});
	});	

	it("VTXXX-0139 | printStoredFormatWithHash method with CCPL HASH ( with Callback )" , function() {
		runs(function() {
			setObjective("VTXXX-0139 | printStoredFormatWithHash method with CCPL HASH ( with Callback )");
			setInstruction("1. Connect a Zebra printer with the device <br /> 2. Call printStoredFormatWithHash (  'E:FORMAT.CCPL',  HASH CCPL ) with callback.");
			setExpected("1. On successful print callback should return with STATUS_SUCCESS <br />2. On failure print callback should return with STATUS_ERROR ");
		});
		
		
		runs(function() {
				PrinterConnectiontype();
			});
		
		runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			connect_status = PrinterInstance.connect();
			waitsFor(function()	{
				return PrinterInstance.isConnected;
			}, '9sec wait for connection', ENABLE9K);
			if (PrinterInstance.isConnected) {
				PrinterInstance.printStoredFormatWithHash(ccplformat, hashccpl, printStoredHashCallback);
			}
			else {
				displayResult("Failed to connect to the printer", connect_status);	
			}
		});
		
		runs(function() {
			if (PrinterInstance.isConnected) {
				PrinterInstance.disconnect();
			}
		});
		waitsFor(function() {
			return document.getElementById("actResult").innerHTML != "init";
		}, "Timed out waiting for tester to respond", ENABLE30MIN);
		runs(function() {
			expect("pass").toEqual(document.getElementById("actResult").innerHTML);
		});
	});	

	it("VTXXX-0140 | Print Any HASH stored format by using printStoredFormatWithHash method with no connection between printer and device ( with Callback )" , function() {
		runs(function() {
			setObjective("VTXXX-0140 | Print Any HASH stored format by using printStoredFormatWithHash method with no connection between printer and device ( with Callback )");
			setInstruction("1. Disconnect the printer. <br /> 2. Call printStoredFormatWithHash (  'E:FORMAT.ZPL',  HASH ZPL ) with callback.");
			setExpected("1. On failure print callback should return with STATUS_ERROR ");
		});
		
		
		runs(function() {
				PrinterConnectiontype();
			});
		
		runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			if (PrinterInstance.isConnected) {
				PrinterInstance.disconnect();
			}
			
			if (!PrinterInstance.isConnected) {
				PrinterInstance.printStoredFormatWithHash(ccplformat, hashccpl, printStoredHashCallback);
			}
			else {
				displayResult("Failed to disconnect the printer", connect_status);	
			}
		});
		
		runs(function() {
			if (PrinterInstance.isConnected) {
				PrinterInstance.disconnect();
			}
		});
		waitsFor(function() {
			return document.getElementById("actResult").innerHTML != "init";
		}, "Timed out waiting for tester to respond", ENABLE30MIN);
		runs(function() {
			expect("pass").toEqual(document.getElementById("actResult").innerHTML);
		});
	});		

	it("VTXXX-0141 | printStoredFormatWithHash method with ZPL HASH ( without Callback )" , function() {
		runs(function() {
			setObjective("VTXXX-0141 | printStoredFormatWithHash method with ZPL HASH ( without Callback )");
			setInstruction("1. Connect a Zebra printer with the device <br /> 2. Call printStoredFormatWithHash (  'E:FORMAT.ZPL',  HASH ZPL ) without callback.");
			setExpected("1. On successful print should return with STATUS_SUCCESS <br />2. On failure print should return with STATUS_ERROR ");
		});
		
		
		runs(function() {
				PrinterConnectiontype();
			});
		
		runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			connect_status = PrinterInstance.connect();
			waitsFor(function()	{
				return PrinterInstance.isConnected;
			}, '9sec wait for connection', ENABLE9K);
			if (PrinterInstance.isConnected) {
				PrinterInstance.printStoredFormatWithHash(zplformat, hashzpl);
			}
			else {
				displayResult("Failed to connect to the printer", connect_status);	
			}
		});
		
		runs(function() {
			if (PrinterInstance.isConnected) {
				PrinterInstance.disconnect();
			}
		});
		waitsFor(function() {
			return document.getElementById("actResult").innerHTML != "init";
		}, "Timed out waiting for tester to respond", ENABLE30MIN);
		runs(function() {
			expect("pass").toEqual(document.getElementById("actResult").innerHTML);
		});
	});	

	it("VTXXX-0142 | printStoredFormatWithHash method with CCPL HASH ( without Callback )" , function() {
		runs(function() {
			setObjective("VTXXX-0142 | printStoredFormatWithHash method with CCPL HASH ( without Callback )");
			setInstruction("1. Connect a Zebra printer with the device <br /> 2. Call printStoredFormatWithHash (  'E:FORMAT.CCPL',  HASH CCPL ) without callback.");
			setExpected("1. On successful print should return with STATUS_SUCCESS <br />2. On failure print should return with STATUS_ERROR ");
		});
		
		
		runs(function() {
				PrinterConnectiontype();
			});
		
		runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			connect_status = PrinterInstance.connect();
			waitsFor(function()	{
				return PrinterInstance.isConnected;
			}, '9sec wait for connection', ENABLE9K);
			if (PrinterInstance.isConnected) {
				PrinterInstance.printStoredFormatWithHash(ccplformat, hashccpl);
			}
			else {
				displayResult("Failed to connect to the printer", connect_status);	
			}
		});
		
		runs(function() {
			if (PrinterInstance.isConnected) {
				PrinterInstance.disconnect();
			}
		});
		waitsFor(function() {
			return document.getElementById("actResult").innerHTML != "init";
		}, "Timed out waiting for tester to respond", ENABLE30MIN);
		runs(function() {
			expect("pass").toEqual(document.getElementById("actResult").innerHTML);
		});
	});	

	it("VTXXX-0143 | Print Any HASH stored format by using printStoredFormatWithHash method with no connection between printer and device ( without Callback )" , function() {
		runs(function() {
			setObjective("VTXXX-0143 | Print Any HASH stored format by using printStoredFormatWithHash method with no connection between printer and device ( without Callback )");
			setInstruction("1. Disconnect the printer. <br /> 2. Call printStoredFormatWithHash (  'E:FORMAT.ZPL',  HASH ZPL ) without callback.");
			setExpected("1. On failure print should return with STATUS_ERROR ");
		});
		
		
		runs(function() {
				PrinterConnectiontype();
			});
		
		runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			if (PrinterInstance.isConnected) {
				PrinterInstance.disconnect();
			}
			
			if (!PrinterInstance.isConnected) {
				PrinterInstance.printStoredFormatWithHash(ccplformat, hashccpl);
			}
			else {
				displayResult("Failed to disconnect the printer", connect_status);	
			}
		});
		
		runs(function() {
			if (PrinterInstance.isConnected) {
				PrinterInstance.disconnect();
			}
		});
		waitsFor(function() {
			return document.getElementById("actResult").innerHTML != "init";
		}, "Timed out waiting for tester to respond", ENABLE30MIN);
		runs(function() {
			expect("pass").toEqual(document.getElementById("actResult").innerHTML);
		});
	});		

	it("VTXXX-0144 | Print Invalid HASH stored format with invalid path by using printStoredFormatWithHash method ( with Callback )" , function() {
		runs(function() {
			setObjective("VTXXX-0144 | printStoredFormatWithHash method with CCPL HASH ( with Callback )");
			setInstruction("1. Connect a Zebra printer with the device <br /> 2. Call printStoredFormatWithHash (  'Invalid Path',  Invalid HASH ZPL ) with callback.");
			setExpected("1. On failure print callback should return with STATUS_ERROR ");
		});
		
		
		runs(function() {
				PrinterConnectiontype();
			});
		
		runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			connect_status = PrinterInstance.connect();
			waitsFor(function()	{
				return PrinterInstance.isConnected;
			}, '9sec wait for connection', ENABLE9K);
			if (PrinterInstance.isConnected) {
				PrinterInstance.printStoredFormatWithHash(invalidformatformat, invalidzplhash, printStoredHashCallback);
			}
			else {
				displayResult("Failed to connect to the printer", connect_status);	
			}
		});
		
		runs(function() {
			if (PrinterInstance.isConnected) {
				PrinterInstance.disconnect();
			}
		});
		waitsFor(function() {
			return document.getElementById("actResult").innerHTML != "init";
		}, "Timed out waiting for tester to respond", ENABLE30MIN);
		runs(function() {
			expect("pass").toEqual(document.getElementById("actResult").innerHTML);
		});
	});	

	it("VTXXX-0145 | printStoredFormatWithHash method with ZPL HASH ( with Anonymous  Callback )" , function() {
		runs(function() {
			setObjective("VTXXX-0145 | printStoredFormatWithHash method with ZPL HASH ( with Anonymous  Callback )");
			setInstruction("1. Connect a Zebra printer with the device <br /> 2. Call printStoredFormatWithHash (  'E:FORMAT.ZPL',  HASH ZPL ) with Anonymous  callback.");
			setExpected("1. On successful print callback should return with STATUS_SUCCESS <br />2. On failure print callback should return with STATUS_ERROR ");
		});
		
		
		runs(function() {
				PrinterConnectiontype();
			});
		
		runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			connect_status = PrinterInstance.connect();
			waitsFor(function()	{
				return PrinterInstance.isConnected;
			}, '9sec wait for connection', ENABLE9K);
			if (PrinterInstance.isConnected) {
				PrinterInstance.printStoredFormatWithHash(zplformat, hashzpl, function(data) { printStoredHashCallback(data) });
			}
			else {
				displayResult("Failed to connect to the printer", connect_status);	
			}
		});
		
		runs(function() {
			if (PrinterInstance.isConnected) {
				PrinterInstance.disconnect();
			}
		});
		waitsFor(function() {
			return document.getElementById("actResult").innerHTML != "init";
		}, "Timed out waiting for tester to respond", ENABLE30MIN);
		runs(function() {
			expect("pass").toEqual(document.getElementById("actResult").innerHTML);
		});
	});	


	it("VTXXX-0146 | printStoredFormatWithHash method with CCPL HASH ( with Anonymous Callback )" , function() {
		runs(function() {
			setObjective("VTXXX-0146 | printStoredFormatWithHash method with CCPL HASH ( with Anonymous Callback )");
			setInstruction("1. Connect a Zebra printer with the device <br /> 2. Call printStoredFormatWithHash (  'E:FORMAT.CCPL',  HASH CCPL ) with Anonymous callback.");
			setExpected("1. On successful print callback should return with STATUS_SUCCESS <br />2. On failure print callback should return with STATUS_ERROR ");
		});
		
		
		runs(function() {
				PrinterConnectiontype();
			});
		
		runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			connect_status = PrinterInstance.connect();
			waitsFor(function()	{
				return PrinterInstance.isConnected;
			}, '9sec wait for connection', ENABLE9K);
			if (PrinterInstance.isConnected) {
				PrinterInstance.printStoredFormatWithHash(ccplformat, hashccpl, function(data) { printStoredHashCallback(data) });
			}
			else {
				displayResult("Failed to connect to the printer", connect_status);	
			}
		});
		
		runs(function() {
			if (PrinterInstance.isConnected) {
				PrinterInstance.disconnect();
			}
		});
		waitsFor(function() {
			return document.getElementById("actResult").innerHTML != "init";
		}, "Timed out waiting for tester to respond", ENABLE30MIN);
		runs(function() {
			expect("pass").toEqual(document.getElementById("actResult").innerHTML);
		});
	});		

	
	it("VTXXX-0147 | printStoredFormatWithArray method with ZPL ARRAY ( with Callback )" , function() {
		runs(function() {
			setObjective("VTXXX-0147 | printStoredFormatWithArray method with ZPL ARRAY ( with Callback )");
			setInstruction("1. Connect a Zebra printer with the device <br /> 2. Call printStoredFormatWithArray (  'E:FORMAT.ZPL',  ARRAY ZPL ) with callback.");
			setExpected("1. On successful print callback should return with STATUS_SUCCESS <br />2. On failure print callback should return with STATUS_ERROR ");
		});
		
		
		runs(function() {
				PrinterConnectiontype();
			});
		
		runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			connect_status = PrinterInstance.connect();
			waitsFor(function()	{
				return PrinterInstance.isConnected;
			}, '9sec wait for connection', ENABLE9K);
			if (PrinterInstance.isConnected) {
				PrinterInstance.printStoredFormatWithArray(zplformat, arrayzpl, printStoredArrayCallback);
			}
			else {
				displayResult("Failed to connect to the printer", connect_status);	
			}
		});
		
		runs(function() {
			if (PrinterInstance.isConnected) {
				PrinterInstance.disconnect();
			}
		});
		waitsFor(function() {
			return document.getElementById("actResult").innerHTML != "init";
		}, "Timed out waiting for tester to respond", ENABLE30MIN);
		runs(function() {
			expect("pass").toEqual(document.getElementById("actResult").innerHTML);
		});
	});	

	it("VTXXX-0148 | printStoredFormatWithArray method with CCPL ARRAY ( with Callback )" , function() {
		runs(function() {
			setObjective("VTXXX-0148 | printStoredFormatWithArray method with CCPL ARRAY ( with Callback )");
			setInstruction("1. Connect a Zebra printer with the device <br /> 2. Call printStoredFormatWithArray (  'E:FORMAT.CCPL',  ARRAY CCPL ) with callback.");
			setExpected("1. On successful print callback should return with STATUS_SUCCESS <br />2. On failure print callback should return with STATUS_ERROR ");
		});
		
		
		runs(function() {
				PrinterConnectiontype();
			});
		
		runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			connect_status = PrinterInstance.connect();
			waitsFor(function()	{
				return PrinterInstance.isConnected;
			}, '9sec wait for connection', ENABLE9K);
			if (PrinterInstance.isConnected) {
				PrinterInstance.printStoredFormatWithArray(ccplformat, arrayccpl, printStoredArrayCallback);
			}
			else {
				displayResult("Failed to connect to the printer", connect_status);	
			}
		});
		
		runs(function() {
			if (PrinterInstance.isConnected) {
				PrinterInstance.disconnect();
			}
		});
		waitsFor(function() {
			return document.getElementById("actResult").innerHTML != "init";
		}, "Timed out waiting for tester to respond", ENABLE30MIN);
		runs(function() {
			expect("pass").toEqual(document.getElementById("actResult").innerHTML);
		});
	});	

	it("VTXXX-0149 | Print Any ARRAY stored format by using printStoredFormatWithArray method with no connection between printer and device ( with Callback )" , function() {
		runs(function() {
			setObjective("VTXXX-0149 | Print Any ARRAY stored format by using printStoredFormatWithArray method with no connection between printer and device ( with Callback )");
			setInstruction("1. Disconnect the printer. <br /> 2. Call printStoredFormatWithArray (  'E:FORMAT.ZPL',  ARRAY ZPL ) with callback.");
			setExpected("1. On failure print callback should return with STATUS_ERROR ");
		});
		
		
		runs(function() {
				PrinterConnectiontype();
			});
		
		runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			if (PrinterInstance.isConnected) {
				PrinterInstance.disconnect();
			}
			
			if (!PrinterInstance.isConnected) {
				PrinterInstance.printStoredFormatWithArray(ccplformat, arrayccpl, printStoredArrayCallback);
			}
			else {
				displayResult("Failed to disconnect the printer", connect_status);	
			}
		});
		
		runs(function() {
			if (PrinterInstance.isConnected) {
				PrinterInstance.disconnect();
			}
		});
		waitsFor(function() {
			return document.getElementById("actResult").innerHTML != "init";
		}, "Timed out waiting for tester to respond", ENABLE30MIN);
		runs(function() {
			expect("pass").toEqual(document.getElementById("actResult").innerHTML);
		});
	});		

	it("VTXXX-0150 | printStoredFormatWithArray method with ZPL ARRAY ( without Callback )" , function() {
		runs(function() {
			setObjective("VTXXX-0150 | printStoredFormatWithArray method with ZPL ARRAY ( without Callback )");
			setInstruction("1. Connect a Zebra printer with the device <br /> 2. Call printStoredFormatWithArray (  'E:FORMAT.ZPL',  ARRAY ZPL ) without callback.");
			setExpected("1. On successful print should return with STATUS_SUCCESS <br />2. On failure print should return with STATUS_ERROR ");
		});
		
		
		runs(function() {
				PrinterConnectiontype();
			});
		
		runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			connect_status = PrinterInstance.connect();
			waitsFor(function()	{
				return PrinterInstance.isConnected;
			}, '9sec wait for connection', ENABLE9K);
			if (PrinterInstance.isConnected) {
				PrinterInstance.printStoredFormatWithArray(zplformat, arrayzpl);
			}
			else {
				displayResult("Failed to connect to the printer", connect_status);	
			}
		});
		
		runs(function() {
			if (PrinterInstance.isConnected) {
				PrinterInstance.disconnect();
			}
		});
		waitsFor(function() {
			return document.getElementById("actResult").innerHTML != "init";
		}, "Timed out waiting for tester to respond", ENABLE30MIN);
		runs(function() {
			expect("pass").toEqual(document.getElementById("actResult").innerHTML);
		});
	});	

	it("VTXXX-0151 | printStoredFormatWithArray method with CCPL ARRAY ( without Callback )" , function() {
		runs(function() {
			setObjective("VTXXX-0151 | printStoredFormatWithArray method with CCPL ARRAY ( without Callback )");
			setInstruction("1. Connect a Zebra printer with the device <br /> 2. Call printStoredFormatWithArray (  'E:FORMAT.CCPL',  ARRAY CCPL ) without callback.");
			setExpected("1. On successful print should return with STATUS_SUCCESS <br />2. On failure print should return with STATUS_ERROR ");
		});
		
		
		runs(function() {
				PrinterConnectiontype();
			});
		
		runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			connect_status = PrinterInstance.connect();
			waitsFor(function()	{
				return PrinterInstance.isConnected;
			}, '9sec wait for connection', ENABLE9K);
			if (PrinterInstance.isConnected) {
				PrinterInstance.printStoredFormatWithArray(ccplformat, arrayccpl);
			}
			else {
				displayResult("Failed to connect to the printer", connect_status);	
			}
		});
		
		runs(function() {
			if (PrinterInstance.isConnected) {
				PrinterInstance.disconnect();
			}
		});
		waitsFor(function() {
			return document.getElementById("actResult").innerHTML != "init";
		}, "Timed out waiting for tester to respond", ENABLE30MIN);
		runs(function() {
			expect("pass").toEqual(document.getElementById("actResult").innerHTML);
		});
	});	

	it("VTXXX-0152 | Print Any ARRAY stored format by using printStoredFormatWithArray method with no connection between printer and device ( without Callback )" , function() {
		runs(function() {
			setObjective("VTXXX-0152 | Print Any ARRAY stored format by using printStoredFormatWithArray method with no connection between printer and device ( without Callback )");
			setInstruction("1. Disconnect the printer. <br /> 2. Call printStoredFormatWithArray (  'E:FORMAT.ZPL',  ARRAY ZPL ) without callback.");
			setExpected("1. On failure print should return with STATUS_ERROR ");
		});
		
		
		runs(function() {
				PrinterConnectiontype();
			});
		
		runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			if (PrinterInstance.isConnected) {
				PrinterInstance.disconnect();
			}
			
			if (!PrinterInstance.isConnected) {
				PrinterInstance.printStoredFormatWithArray(ccplformat, arrayccpl);
			}
			else {
				displayResult("Failed to disconnect the printer", connect_status);	
			}
		});
		
		runs(function() {
			if (PrinterInstance.isConnected) {
				PrinterInstance.disconnect();
			}
		});
		waitsFor(function() {
			return document.getElementById("actResult").innerHTML != "init";
		}, "Timed out waiting for tester to respond", ENABLE30MIN);
		runs(function() {
			expect("pass").toEqual(document.getElementById("actResult").innerHTML);
		});
	});		

	it("VTXXX-0153 | Print Invalid ARRAY stored format with invalid path by using printStoredFormatWithArray method ( with Callback )" , function() {
		runs(function() {
			setObjective("VTXXX-0153 | printStoredFormatWithArray method with CCPL ARRAY ( with Callback )");
			setInstruction("1. Connect a Zebra printer with the device <br /> 2. Call printStoredFormatWithArray (  'Invalid Path',  Invalid ARRAY ZPL ) with callback.");
			setExpected("1. On failure print callback should return with STATUS_ERROR ");
		});
		
		
		runs(function() {
				PrinterConnectiontype();
			});
		
		runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			connect_status = PrinterInstance.connect();
			waitsFor(function()	{
				return PrinterInstance.isConnected;
			}, '9sec wait for connection', ENABLE9K);
			if (PrinterInstance.isConnected) {
				PrinterInstance.printStoredFormatWithArray(invalidformatformat, invalidzplarray, printStoredArrayCallback);
			}
			else {
				displayResult("Failed to connect to the printer", connect_status);	
			}
		});
		
		runs(function() {
			if (PrinterInstance.isConnected) {
				PrinterInstance.disconnect();
			}
		});
		waitsFor(function() {
			return document.getElementById("actResult").innerHTML != "init";
		}, "Timed out waiting for tester to respond", ENABLE30MIN);
		runs(function() {
			expect("pass").toEqual(document.getElementById("actResult").innerHTML);
		});
	});	

	it("VTXXX-0154 | printStoredFormatWithArray method with ZPL ARRAY ( with Anonymous  Callback )" , function() {
		runs(function() {
			setObjective("VTXXX-0154 | printStoredFormatWithArray method with ZPL ARRAY ( with Anonymous  Callback )");
			setInstruction("1. Connect a Zebra printer with the device <br /> 2. Call printStoredFormatWithArray (  'E:FORMAT.ZPL',  ARRAY ZPL ) with Anonymous  callback.");
			setExpected("1. On successful print callback should return with STATUS_SUCCESS <br />2. On failure print callback should return with STATUS_ERROR ");
		});
		
		
		runs(function() {
				PrinterConnectiontype();
			});
		
		runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			connect_status = PrinterInstance.connect();
			waitsFor(function()	{
				return PrinterInstance.isConnected;
			}, '9sec wait for connection', ENABLE9K);
			if (PrinterInstance.isConnected) {
				PrinterInstance.printStoredFormatWithArray(zplformat, arrayzpl, function(data) { printStoredArrayCallback(data) });
			}
			else {
				displayResult("Failed to connect to the printer", connect_status);	
			}
		});
		
		runs(function() {
			if (PrinterInstance.isConnected) {
				PrinterInstance.disconnect();
			}
		});
		waitsFor(function() {
			return document.getElementById("actResult").innerHTML != "init";
		}, "Timed out waiting for tester to respond", ENABLE30MIN);
		runs(function() {
			expect("pass").toEqual(document.getElementById("actResult").innerHTML);
		});
	});	

	it("VTXXX-0155 | printStoredFormatWithArray method with CCPL ARRAY ( with Anonymous Callback )" , function() {
		runs(function() {
			setObjective("VTXXX-0155 | printStoredFormatWithArray method with CCPL ARRAY ( with Anonymous Callback )");
			setInstruction("1. Connect a Zebra printer with the device <br /> 2. Call printStoredFormatWithArray (  'E:FORMAT.CCPL',  ARRAY CCPL ) with Anonymous callback.");
			setExpected("1. On successful print callback should return with STATUS_SUCCESS <br />2. On failure print callback should return with STATUS_ERROR ");
		});
		
		
		runs(function() {
				PrinterConnectiontype();
			});
		
		runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			connect_status = PrinterInstance.connect();
			waitsFor(function()	{
				return PrinterInstance.isConnected;
			}, '9sec wait for connection', ENABLE9K);
			if (PrinterInstance.isConnected) {
				PrinterInstance.printStoredFormatWithArray(ccplformat, arrayccpl, function(data) { printStoredArrayCallback(data) });
			}
			else {
				displayResult("Failed to connect to the printer", connect_status);	
			}
		});
		
		runs(function() {
			if (PrinterInstance.isConnected) {
				PrinterInstance.disconnect();
			}
		});
		waitsFor(function() {
			return document.getElementById("actResult").innerHTML != "init";
		}, "Timed out waiting for tester to respond", ENABLE30MIN);
		runs(function() {
			expect("pass").toEqual(document.getElementById("actResult").innerHTML);
		});
	});		
	
	it("VTXXX-0156 | Print PNG file (320X240) with Path to image file, x=0, y =0 and NIL options printImageFromFile method( with Callback )" , function() {
		runs(function() {
			setObjective("VTXXX-0156 | Print PNG file (320X240) with Path to image file, x=0, y =0 and NIL options printImageFromFile method( with Callback )");
			setInstruction("1. Connect a Zebra printer with the device <br /> 2. Call printImageFromFile with callback.");
			setExpected("1. On successful print callback should return with STATUS_SUCCESS <br />2. On failure print callback should return with STATUS_ERROR ");
		});
		
		
		runs(function() {
				PrinterConnectiontype();
			});
		
		runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			connect_status = PrinterInstance.connect();
			waitsFor(function()	{
				return PrinterInstance.isConnected;
			}, '9sec wait for connection', ENABLE9K);
			if (PrinterInstance.isConnected) {
				PrinterInstance.printImageFromFile(pngimagepath_320px, 0, 0, {}, printImageFromFileCallback);
			}
			else {
				displayResult("Failed to connect to the printer", connect_status);	
			}
		});
		
		runs(function() {
			if (PrinterInstance.isConnected) {
				PrinterInstance.disconnect();
			}
		});
		waitsFor(function() {
			return document.getElementById("actResult").innerHTML != "init";
		}, "Timed out waiting for tester to respond", ENABLE30MIN);
		runs(function() {
			expect("pass").toEqual(document.getElementById("actResult").innerHTML);
		});
	});	
	
	it("VTXXX-0157 | Print PNG file (320X240) with Path to image file, x=50, y =50 and NIL options printImageFromFile method( with Callback )" , function() {
		runs(function() {
			setObjective("VTXXX-0157 | Print PNG file (320X240) with Path to image file, x=50, y =50 and NIL options printImageFromFile method( with Callback )");
			setInstruction("1. Connect a Zebra printer with the device <br /> 2. Call printImageFromFile with callback.");
			setExpected("1. On successful print callback should return with STATUS_SUCCESS <br />2. On failure print callback should return with STATUS_ERROR ");
		});
		
		
		runs(function() {
				PrinterConnectiontype();
			});
		
		runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			connect_status = PrinterInstance.connect();
			waitsFor(function()	{
				return PrinterInstance.isConnected;
			}, '9sec wait for connection', ENABLE9K);
			if (PrinterInstance.isConnected) {
				PrinterInstance.printImageFromFile(pngimagepath_320px, 50, 50, {}, printImageFromFileCallback);
			}
			else {
				displayResult("Failed to connect to the printer", connect_status);	
			}
		});
		
		runs(function() {
			if (PrinterInstance.isConnected) {
				PrinterInstance.disconnect();
			}
		});
		waitsFor(function() {
			return document.getElementById("actResult").innerHTML != "init";
		}, "Timed out waiting for tester to respond", ENABLE30MIN);
		runs(function() {
			expect("pass").toEqual(document.getElementById("actResult").innerHTML);
		});
	});		
	
	it("VTXXX-0158 | Print PNG file (320X240) with Path to image file, x=-100, y =-200 and NIL options printImageFromFile method ( with Callback )" , function() {
		runs(function() {
			setObjective("VTXXX-0158 | Print PNG file (320X240) with Path to image file, x=-100, y =-200 and NIL options printImageFromFile method ( with Callback )");
			setInstruction("1. Connect a Zebra printer with the device <br /> 2. Call printImageFromFile with callback.");
			setExpected("1. On successful print callback should return with STATUS_SUCCESS <br />2. On failure print callback should return with STATUS_ERROR ");
		});
		
		
		runs(function() {
				PrinterConnectiontype();
			});
		
		runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			connect_status = PrinterInstance.connect();
			waitsFor(function()	{
				return PrinterInstance.isConnected;
			}, '9sec wait for connection', ENABLE9K);
			if (PrinterInstance.isConnected) {
				PrinterInstance.printImageFromFile(pngimagepath_320px, -100, -200, {}, printImageFromFileCallback);
			}
			else {
				displayResult("Failed to connect to the printer", connect_status);	
			}
		});
		
		runs(function() {
			if (PrinterInstance.isConnected) {
				PrinterInstance.disconnect();
			}
		});
		waitsFor(function() {
			return document.getElementById("actResult").innerHTML != "init";
		}, "Timed out waiting for tester to respond", ENABLE30MIN);
		runs(function() {
			expect("pass").toEqual(document.getElementById("actResult").innerHTML);
		});
	});		
	
	it("VTXXX-0159 | Print PNG file (320X240) with Path to image file, x=0, y =0 and options as width as 50, height as 50 and isInsideFormat as True printImageFromFile method ( with Callback )" , function() {
		runs(function() {
			setObjective("VTXXX-0159 | Print PNG file (320X240) with Path to image file, x=0, y =0 and options as width as 50, height as 50 and isInsideFormat as True printImageFromFile method ( with Callback )");
			setInstruction("1. Connect a Zebra printer with the device <br /> 2. Call printImageFromFile with callback.");
			setExpected("1. On successful print callback should return with STATUS_SUCCESS <br />2. On failure print callback should return with STATUS_ERROR ");
		});
		
		
		runs(function() {
				PrinterConnectiontype();
			});
		
		runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			connect_status = PrinterInstance.connect();
			waitsFor(function()	{
				return PrinterInstance.isConnected;
			}, '9sec wait for connection', ENABLE9K);
			if (PrinterInstance.isConnected) {
				PrinterInstance.printImageFromFile(pngimagepath_320px, 0, 0, {'height':50, 'width':50, 'isInsideFormat':true}, printImageFromFileCallback);
			}
			else {
				displayResult("Failed to connect to the printer", connect_status);	
			}
		});
		
		runs(function() {
			if (PrinterInstance.isConnected) {
				PrinterInstance.disconnect();
			}
		});
		waitsFor(function() {
			return document.getElementById("actResult").innerHTML != "init";
		}, "Timed out waiting for tester to respond", ENABLE30MIN);
		runs(function() {
			expect("pass").toEqual(document.getElementById("actResult").innerHTML);
		});
	});
	
	it("VTXXX-0160 | Print PNG file (320X240) with Path to image file, x=50, y =100 and options as width as -1, height as -1 and isInsideFormat as false printImageFromFile method ( with Callback )" , function() {
		runs(function() {
			setObjective("VTXXX-0160 |Print PNG file (320X240) with Path to image file, x=50, y =100 and options as width as -1, height as -1 and isInsideFormat as false printImageFromFile method ( with Callback )");
			setInstruction("1. Connect a Zebra printer with the device <br /> 2. Call printImageFromFile with callback.");
			setExpected("1. On successful print callback should return with STATUS_SUCCESS <br />2. On failure print callback should return with STATUS_ERROR ");
		});
		
		
		runs(function() {
				PrinterConnectiontype();
			});
		
		runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			connect_status = PrinterInstance.connect();
			waitsFor(function()	{
				return PrinterInstance.isConnected;
			}, '9sec wait for connection', ENABLE9K);
			if (PrinterInstance.isConnected) {
				PrinterInstance.printImageFromFile(pngimagepath_320px, 50, 100, {'height':-1, 'width':-1, 'isInsideFormat':false}, printImageFromFileCallback);
			}
			else {
				displayResult("Failed to connect to the printer", connect_status);	
			}
		});
		
		runs(function() {
			if (PrinterInstance.isConnected) {
				PrinterInstance.disconnect();
			}
		});
		waitsFor(function() {
			return document.getElementById("actResult").innerHTML != "init";
		}, "Timed out waiting for tester to respond", ENABLE30MIN);
		runs(function() {
			expect("pass").toEqual(document.getElementById("actResult").innerHTML);
		});
	});
	
	it("VTXXX-0161 | Print PNG file (320X240) with Path to image file, x=-100, y =-100 and options as width as -50, height as -50 and isInsideFormat as false printImageFromFile method ( with Callback )" , function() {
		runs(function() {
			setObjective("VTXXX-0161 |Print PNG file (320X240) with Path to image file, x=-100, y =-100 and options as width as -50, height as -50 and isInsideFormat as false printImageFromFile method ( with Callback )");
			setInstruction("1. Connect a Zebra printer with the device <br /> 2. Call printImageFromFile with callback.");
			setExpected("1. On successful print callback should return with STATUS_SUCCESS <br />2. On failure print callback should return with STATUS_ERROR ");
		});
		
		
		runs(function() {
				PrinterConnectiontype();
			});
		
		runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			connect_status = PrinterInstance.connect();
			waitsFor(function()	{
				return PrinterInstance.isConnected;
			}, '9sec wait for connection', ENABLE9K);
			if (PrinterInstance.isConnected) {
				PrinterInstance.printImageFromFile(pngimagepath_320px, -100, -100, {'height':-50, 'width':-50, 'isInsideFormat':false}, printImageFromFileCallback);
			}
			else {
				displayResult("Failed to connect to the printer", connect_status);	
			}
		});
		
		runs(function() {
			if (PrinterInstance.isConnected) {
				PrinterInstance.disconnect();
			}
		});
		waitsFor(function() {
			return document.getElementById("actResult").innerHTML != "init";
		}, "Timed out waiting for tester to respond", ENABLE30MIN);
		runs(function() {
			expect("pass").toEqual(document.getElementById("actResult").innerHTML);
		});
	});
	
	it("VTXXX-0162 | Print JPG file (320X240) with Path to image file, x=50, y =50 and NIL options printImageFromFile method ( with Callback )" , function() {
		runs(function() {
			setObjective("VTXXX-0162 |Print JPG file (320X240) with Path to image file, x=50, y =50 and NIL options printImageFromFile method ( with Callback )");
			setInstruction("1. Connect a Zebra printer with the device <br /> 2. Call printImageFromFile with callback.");
			setExpected("1. On successful print callback should return with STATUS_SUCCESS <br />2. On failure print callback should return with STATUS_ERROR ");
		});
		
		
		runs(function() {
				PrinterConnectiontype();
			});
		
		runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			connect_status = PrinterInstance.connect();
			waitsFor(function()	{
				return PrinterInstance.isConnected;
			}, '9sec wait for connection', ENABLE9K);
			if (PrinterInstance.isConnected) {
				PrinterInstance.printImageFromFile(jpgimagepath_320px, 50, 50, {}, printImageFromFileCallback);
			}
			else {
				displayResult("Failed to connect to the printer", connect_status);	
			}
		});
		
		runs(function() {
			if (PrinterInstance.isConnected) {
				PrinterInstance.disconnect();
			}
		});
		waitsFor(function() {
			return document.getElementById("actResult").innerHTML != "init";
		}, "Timed out waiting for tester to respond", ENABLE30MIN);
		runs(function() {
			expect("pass").toEqual(document.getElementById("actResult").innerHTML);
		});
	});

	it("VTXXX-0163 | Print JPG file (320X240) with Path to image file, x=0, y =0 and options as width as 50, height as 50 and isInsideFormat as True printImageFromFile method( with Callback )" , function() {
		runs(function() {
			setObjective("VTXXX-0163 |Print JPG file (320X240) with Path to image file, x=0, y =0 and options as width as 50, height as 50 and isInsideFormat as True printImageFromFile method( with Callback )");
			setInstruction("1. Connect a Zebra printer with the device <br /> 2. Call printImageFromFile with callback.");
			setExpected("1. On successful print callback should return with STATUS_SUCCESS <br />2. On failure print callback should return with STATUS_ERROR ");
		});
		
		
		runs(function() {
				PrinterConnectiontype();
			});
		
		runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			connect_status = PrinterInstance.connect();
			waitsFor(function()	{
				return PrinterInstance.isConnected;
			}, '9sec wait for connection', ENABLE9K);
			
			if (PrinterInstance.isConnected) {
				PrinterInstance.printImageFromFile(jpgimagepath_320px, 0, 0, {'height':50, 'width':50, 'isInsideFormat':true}, printImageFromFileCallback);
			}
			else {
				displayResult("Failed to connect to the printer", connect_status);	
			}
		});
		
		runs(function() {
			if (PrinterInstance.isConnected) {
				PrinterInstance.disconnect();
			}
		});
		waitsFor(function() {
			return document.getElementById("actResult").innerHTML != "init";
		}, "Timed out waiting for tester to respond", ENABLE30MIN);
		runs(function() {
			expect("pass").toEqual(document.getElementById("actResult").innerHTML);
		});
	});	

	it("VTXXX-0164 | Print JPG file (320X240) with Path to image file, x=50, y =100 and options as width as -1, height as -1 and isInsideFormat as false printImageFromFile method ( with Callback )" , function() {
		runs(function() {
			setObjective("VTXXX-0164 |Print JPG file (320X240) with Path to image file, x=50, y =100 and options as width as -1, height as -1 and isInsideFormat as false printImageFromFile method ( with Callback )");
			setInstruction("1. Connect a Zebra printer with the device <br /> 2. Call printImageFromFile with callback.");
			setExpected("1. On successful print callback should return with STATUS_SUCCESS <br />2. On failure print callback should return with STATUS_ERROR ");
		});
		
		
		runs(function() {
				PrinterConnectiontype();
			});
		
		runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			connect_status = PrinterInstance.connect();
			waitsFor(function()	{
				return PrinterInstance.isConnected;
			}, '9sec wait for connection', ENABLE9K);
			
			if (PrinterInstance.isConnected) {
				PrinterInstance.printImageFromFile(jpgimagepath_320px, 50, 100, {'height':-1, 'width':-1, 'isInsideFormat':false}, printImageFromFileCallback);
			}
			else {
				displayResult("Failed to connect to the printer", connect_status);	
			}
		});
		
		runs(function() {
			if (PrinterInstance.isConnected) {
				PrinterInstance.disconnect();
			}
		});
		waitsFor(function() {
			return document.getElementById("actResult").innerHTML != "init";
		}, "Timed out waiting for tester to respond", ENABLE30MIN);
		runs(function() {
			expect("pass").toEqual(document.getElementById("actResult").innerHTML);
		});
	});	
	
	it("VTXXX-0165 | Print PNG file (640X480) with Path to image file, x=0, y =0 and options as width as 50, height as 50 and isInsideFormat as True printImageFromFile method ( with Callback )" , function() {
		runs(function() {
			setObjective("VTXXX-0165 |Print PNG file (640X480) with Path to image file, x=0, y =0 and options as width as 50, height as 50 and isInsideFormat as True printImageFromFile method ( with Callback )");
			setInstruction("1. Connect a Zebra printer with the device <br /> 2. Call printImageFromFile with callback.");
			setExpected("1. On successful print callback should return with STATUS_SUCCESS <br />2. On failure print callback should return with STATUS_ERROR ");
		});
		
		
		runs(function() {
				PrinterConnectiontype();
			});
		
		runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			connect_status = PrinterInstance.connect();
			waitsFor(function()	{
				return PrinterInstance.isConnected;
			}, '9sec wait for connection', ENABLE9K);
			
			if (PrinterInstance.isConnected) {
				PrinterInstance.printImageFromFile(pngimagepath_640px, 0, 0, {'height':50, 'width':50, 'isInsideFormat':true}, printImageFromFileCallback);
			}
			else {
				displayResult("Failed to connect to the printer", connect_status);	
			}
		});
		
		runs(function() {
			if (PrinterInstance.isConnected) {
				PrinterInstance.disconnect();
			}
		});
		waitsFor(function() {
			return document.getElementById("actResult").innerHTML != "init";
		}, "Timed out waiting for tester to respond", ENABLE30MIN);
		runs(function() {
			expect("pass").toEqual(document.getElementById("actResult").innerHTML);
		});
	});	
	
	it("VTXXX-0166 | Print PNG file (640X480) with Path to image file, x=50, y =100 and options as width as -1, height as -1 and isInsideFormat as false printImageFromFile method( with Callback )" , function() {
		runs(function() {
			setObjective("VTXXX-0166 |Print PNG file (640X480) with Path to image file, x=50, y =100 and options as width as -1, height as -1 and isInsideFormat as false printImageFromFile method( with Callback )");
			setInstruction("1. Connect a Zebra printer with the device <br /> 2. Call printImageFromFile with callback.");
			setExpected("1. On successful print callback should return with STATUS_SUCCESS <br />2. On failure print callback should return with STATUS_ERROR ");
		});
		
		
		runs(function() {
				PrinterConnectiontype();
			});
		
		runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			connect_status = PrinterInstance.connect();
			waitsFor(function()	{
				return PrinterInstance.isConnected;
			}, '9sec wait for connection', ENABLE9K);
			
			if (PrinterInstance.isConnected) {
				PrinterInstance.printImageFromFile(pngimagepath_640px, 50, 100, {'height':-1, 'width':-1, 'isInsideFormat':false}, printImageFromFileCallback);
			}
			else {
				displayResult("Failed to connect to the printer", connect_status);	
			}
		});
		
		runs(function() {
			if (PrinterInstance.isConnected) {
				PrinterInstance.disconnect();
			}
		});
		waitsFor(function() {
			return document.getElementById("actResult").innerHTML != "init";
		}, "Timed out waiting for tester to respond", ENABLE30MIN);
		runs(function() {
			expect("pass").toEqual(document.getElementById("actResult").innerHTML);
		});
	});		
	
	it("VTXXX-0167 | Print JPG file (640X480) with Path to image file, x=0, y =0 and options as width as 50, height as 50 and isInsideFormat as True printImageFromFile method ( with Callback )" , function() {
		runs(function() {
			setObjective("VTXXX-0167 |Print JPG file (640X480) with Path to image file, x=0, y =0 and options as width as 50, height as 50 and isInsideFormat as True printImageFromFile method ( with Callback )");
			setInstruction("1. Connect a Zebra printer with the device <br /> 2. Call printImageFromFile with callback.");
			setExpected("1. On successful print callback should return with STATUS_SUCCESS <br />2. On failure print callback should return with STATUS_ERROR ");
		});
		
		
		runs(function() {
				PrinterConnectiontype();
			});
		
		runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			connect_status = PrinterInstance.connect();
			waitsFor(function()	{
				return PrinterInstance.isConnected;
			}, '9sec wait for connection', ENABLE9K);
			
			if (PrinterInstance.isConnected) {
				PrinterInstance.printImageFromFile(jpgimagepath_640px, 0, 0, {'height':50, 'width':50, 'isInsideFormat':true}, printImageFromFileCallback);
			}
			else {
				displayResult("Failed to connect to the printer", connect_status);	
			}
		});
		
		runs(function() {
			if (PrinterInstance.isConnected) {
				PrinterInstance.disconnect();
			}
		});
		waitsFor(function() {
			return document.getElementById("actResult").innerHTML != "init";
		}, "Timed out waiting for tester to respond", ENABLE30MIN);
		runs(function() {
			expect("pass").toEqual(document.getElementById("actResult").innerHTML);
		});
	});	
	
	it("VTXXX-0168 | Print JPG file (640X480) with Path to image file, x=50, y =100 and options as width as -1, height as -1 and isInsideFormat as false printImageFromFile method( with Callback )" , function() {
		runs(function() {
			setObjective("VTXXX-0168 |Print JPG file (640X480) with Path to image file, x=50, y =100 and options as width as -1, height as -1 and isInsideFormat as false printImageFromFile method( with Callback )");
			setInstruction("1. Connect a Zebra printer with the device <br /> 2. Call printImageFromFile with callback.");
			setExpected("1. On successful print callback should return with STATUS_SUCCESS <br />2. On failure print callback should return with STATUS_ERROR ");
		});
		
		
		runs(function() {
				PrinterConnectiontype();
			});
		
		runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			connect_status = PrinterInstance.connect();
			waitsFor(function()	{
				return PrinterInstance.isConnected;
			}, '9sec wait for connection', ENABLE9K);
			
			if (PrinterInstance.isConnected) {
				PrinterInstance.printImageFromFile(jpgimagepath_640px, 50, 100, {'height':-1, 'width':-1, 'isInsideFormat':false}, printImageFromFileCallback);
			}
			else {
				displayResult("Failed to connect to the printer", connect_status);	
			}
		});
		
		runs(function() {
			if (PrinterInstance.isConnected) {
				PrinterInstance.disconnect();
			}
		});
		waitsFor(function() {
			return document.getElementById("actResult").innerHTML != "init";
		}, "Timed out waiting for tester to respond", ENABLE30MIN);
		runs(function() {
			expect("pass").toEqual(document.getElementById("actResult").innerHTML);
		});
	});			
	
	it("VTXXX-0169 | Print PNG file (1024X768) with Path to image file, x=0, y =0 and options as width as 50, height as 50 and isInsideFormat as True printImageFromFile method ( with Callback )" , function() {
		runs(function() {
			setObjective("VTXXX-0169 |Print PNG file (1024X768) with Path to image file, x=0, y =0 and options as width as 50, height as 50 and isInsideFormat as True printImageFromFile method ( with Callback )");
			setInstruction("1. Connect a Zebra printer with the device <br /> 2. Call printImageFromFile with callback.");
			setExpected("1. On successful print callback should return with STATUS_SUCCESS <br />2. On failure print callback should return with STATUS_ERROR ");
		});
		
		
		runs(function() {
				PrinterConnectiontype();
			});
		
		runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			connect_status = PrinterInstance.connect();
			waitsFor(function()	{
				return PrinterInstance.isConnected;
			}, '9sec wait for connection', ENABLE9K);
			
			if (PrinterInstance.isConnected) {
				PrinterInstance.printImageFromFile(pngimagepath_1024px, 0, 0, {'height':50, 'width':50, 'isInsideFormat':true}, printImageFromFileCallback);
			}
			else {
				displayResult("Failed to connect to the printer", connect_status);	
			}
		});
		
		runs(function() {
			if (PrinterInstance.isConnected) {
				PrinterInstance.disconnect();
			}
		});
		waitsFor(function() {
			return document.getElementById("actResult").innerHTML != "init";
		}, "Timed out waiting for tester to respond", ENABLE30MIN);
		runs(function() {
			expect("pass").toEqual(document.getElementById("actResult").innerHTML);
		});
	});	
	
	it("VTXXX-0170 | Print PNG file (1024X768) with Path to image file, x=50, y =100 and options as width as -1, height as -1 and isInsideFormat as false printImageFromFile method( with Callback )" , function() {
		runs(function() {
			setObjective("VTXXX-0170 |Print PNG file (1024X768) with Path to image file, x=50, y =100 and options as width as -1, height as -1 and isInsideFormat as false printImageFromFile method( with Callback )");
			setInstruction("1. Connect a Zebra printer with the device <br /> 2. Call printImageFromFile with callback.");
			setExpected("1. On successful print callback should return with STATUS_SUCCESS <br />2. On failure print callback should return with STATUS_ERROR ");
		});
		
		
		runs(function() {
				PrinterConnectiontype();
			});
		
		runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			connect_status = PrinterInstance.connect();
			waitsFor(function()	{
				return PrinterInstance.isConnected;
			}, '9sec wait for connection', ENABLE9K);
			
			if (PrinterInstance.isConnected) {
				PrinterInstance.printImageFromFile(pngimagepath_1024px, 50, 100, {'height':-1, 'width':-1, 'isInsideFormat':false}, printImageFromFileCallback);
			}
			else {
				displayResult("Failed to connect to the printer", connect_status);	
			}
		});
		
		runs(function() {
			if (PrinterInstance.isConnected) {
				PrinterInstance.disconnect();
			}
		});
		waitsFor(function() {
			return document.getElementById("actResult").innerHTML != "init";
		}, "Timed out waiting for tester to respond", ENABLE30MIN);
		runs(function() {
			expect("pass").toEqual(document.getElementById("actResult").innerHTML);
		});
	});		
	
	it("VTXXX-0171 | Print JPG file (1024X768) with Path to image file, x=0, y =0 and options as width as 50, height as 50 and isInsideFormat as True printImageFromFile method ( with Callback )" , function() {
		runs(function() {
			setObjective("VTXXX-0171 |Print JPG file (1024X768) with Path to image file, x=0, y =0 and options as width as 50, height as 50 and isInsideFormat as True printImageFromFile method ( with Callback )");
			setInstruction("1. Connect a Zebra printer with the device <br /> 2. Call printImageFromFile with callback.");
			setExpected("1. On successful print callback should return with STATUS_SUCCESS <br />2. On failure print callback should return with STATUS_ERROR ");
		});
		
		
		runs(function() {
				PrinterConnectiontype();
			});
		
		runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			connect_status = PrinterInstance.connect();
			waitsFor(function()	{
				return PrinterInstance.isConnected;
			}, '9sec wait for connection', ENABLE9K);
			
			if (PrinterInstance.isConnected) {
				PrinterInstance.printImageFromFile(jpgimagepath_1024px, 0, 0, {'height':50, 'width':50, 'isInsideFormat':true}, printImageFromFileCallback);
			}
			else {
				displayResult("Failed to connect to the printer", connect_status);	
			}
		});
		
		runs(function() {
			if (PrinterInstance.isConnected) {
				PrinterInstance.disconnect();
			}
		});
		waitsFor(function() {
			return document.getElementById("actResult").innerHTML != "init";
		}, "Timed out waiting for tester to respond", ENABLE30MIN);
		runs(function() {
			expect("pass").toEqual(document.getElementById("actResult").innerHTML);
		});
	});	
	
	it("VTXXX-0172 | Print JPG file (1024X768) with Path to image file, x=50, y =100 and options as width as -1, height as -1 and isInsideFormat as false printImageFromFile method( with Callback )" , function() {
		runs(function() {
			setObjective("VTXXX-0172 |Print JPG file (1024X768) with Path to image file, x=50, y =100 and options as width as -1, height as -1 and isInsideFormat as false printImageFromFile method( with Callback )");
			setInstruction("1. Connect a Zebra printer with the device <br /> 2. Call printImageFromFile with callback.");
			setExpected("1. On successful print callback should return with STATUS_SUCCESS <br />2. On failure print callback should return with STATUS_ERROR ");
		});
		
		
		runs(function() {
				PrinterConnectiontype();
			});
		
		runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			connect_status = PrinterInstance.connect();
			waitsFor(function()	{
				return PrinterInstance.isConnected;
			}, '9sec wait for connection', ENABLE9K);
			
			if (PrinterInstance.isConnected) {
				PrinterInstance.printImageFromFile(jpgimagepath_1024px, 50, 100, {'height':-1, 'width':-1, 'isInsideFormat':false}, printImageFromFileCallback);
			}
			else {
				displayResult("Failed to connect to the printer", connect_status);	
			}
		});
		
		runs(function() {
			if (PrinterInstance.isConnected) {
				PrinterInstance.disconnect();
			}
		});
		waitsFor(function() {
			return document.getElementById("actResult").innerHTML != "init";
		}, "Timed out waiting for tester to respond", ENABLE30MIN);
		runs(function() {
			expect("pass").toEqual(document.getElementById("actResult").innerHTML);
		});
	});	

	it("VTXXX-0173 | Print PNG file (2048X1536) with Path to image file, x=0, y =0 and options as width as 50, height as 50 and isInsideFormat as True printImageFromFile method ( with Callback )" , function() {
		runs(function() {
			setObjective("VTXXX-0173 |Print PNG file (2048X1536) with Path to image file, x=0, y =0 and options as width as 50, height as 50 and isInsideFormat as True printImageFromFile method ( with Callback )");
			setInstruction("1. Connect a Zebra printer with the device <br /> 2. Call printImageFromFile with callback.");
			setExpected("1. On successful print callback should return with STATUS_SUCCESS <br />2. On failure print callback should return with STATUS_ERROR ");
		});
		
		
		runs(function() {
				PrinterConnectiontype();
			});
		
		runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			connect_status = PrinterInstance.connect();
			waitsFor(function()	{
				return PrinterInstance.isConnected;
			}, '9sec wait for connection', ENABLE9K);
			
			if (PrinterInstance.isConnected) {
				PrinterInstance.printImageFromFile(pngimagepath_2048px, 0, 0, {'height':50, 'width':50, 'isInsideFormat':true}, printImageFromFileCallback);
			}
			else {
				displayResult("Failed to connect to the printer", connect_status);	
			}
		});
		
		runs(function() {
			if (PrinterInstance.isConnected) {
				PrinterInstance.disconnect();
			}
		});
		waitsFor(function() {
			return document.getElementById("actResult").innerHTML != "init";
		}, "Timed out waiting for tester to respond", ENABLE30MIN);
		runs(function() {
			expect("pass").toEqual(document.getElementById("actResult").innerHTML);
		});
	});	

	it("VTXXX-0174 | Print JPG file (2048X1536) with Path to image file, x=50, y =100 and options as width as -1, height as -1 and isInsideFormat as false printImageFromFile method( with Callback )" , function() {
		runs(function() {
			setObjective("VTXXX-0174 |Print JPG file (2048X1536) with Path to image file, x=50, y =100 and options as width as -1, height as -1 and isInsideFormat as false printImageFromFile method( with Callback )");
			setInstruction("1. Connect a Zebra printer with the device <br /> 2. Call printImageFromFile with callback.");
			setExpected("1. On successful print callback should return with STATUS_SUCCESS <br />2. On failure print callback should return with STATUS_ERROR ");
		});
		
		
		runs(function() {
				PrinterConnectiontype();
			});
		
		runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			connect_status = PrinterInstance.connect();
			waitsFor(function()	{
				return PrinterInstance.isConnected;
			}, '9sec wait for connection', ENABLE9K);
			
			if (PrinterInstance.isConnected) {
				PrinterInstance.printImageFromFile(jpgimagepath_2048px, 50, 100, {'height':-1, 'width':-1, 'isInsideFormat':false}, printImageFromFileCallback);
			}
			else {
				displayResult("Failed to connect to the printer", connect_status);	
			}
		});
		
		runs(function() {
			if (PrinterInstance.isConnected) {
				PrinterInstance.disconnect();
			}
		});
		waitsFor(function() {
			return document.getElementById("actResult").innerHTML != "init";
		}, "Timed out waiting for tester to respond", ENABLE30MIN);
		runs(function() {
			expect("pass").toEqual(document.getElementById("actResult").innerHTML);
		});
	});		
	
	it("VTXXX-0175 | Print PNG file (1024X768) with Path to image file, x=0, y =0 and options as width as 50, height as 50 and isInsideFormat as True printImageFromFile method ( without Callback )" , function() {
		runs(function() {
			setObjective("VTXXX-0173 |Print PNG file (1024X768) with Path to image file, x=0, y =0 and options as width as 50, height as 50 and isInsideFormat as True printImageFromFile method ( without Callback )");
			setInstruction("1. Connect a Zebra printer with the device <br /> 2. Call printImageFromFile without callback.");
			setExpected("1. On successful print should return with STATUS_SUCCESS <br />2. On failure print should return with STATUS_ERROR ");
		});
		
		
		runs(function() {
				PrinterConnectiontype();
			});
		
		runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			connect_status = PrinterInstance.connect();
			waitsFor(function()	{
				return PrinterInstance.isConnected;
			}, '9sec wait for connection', ENABLE9K);
			
			if (PrinterInstance.isConnected) {
				PrinterInstance.printImageFromFile(pngimagepath_1024px, 0, 0, {'height':50, 'width':50, 'isInsideFormat':true});
			}
			else {
				displayResult("Failed to connect to the printer", connect_status);	
			}
		});
		
		runs(function() {
			if (PrinterInstance.isConnected) {
				PrinterInstance.disconnect();
			}
		});
		waitsFor(function() {
			return document.getElementById("actResult").innerHTML != "init";
		}, "Timed out waiting for tester to respond", ENABLE30MIN);
		runs(function() {
			expect("pass").toEqual(document.getElementById("actResult").innerHTML);
		});
	});	

	it("VTXXX-0176 | Print PNG file (1024X768) with Path to image file, x=50, y =100 and options as width as -1, height as -1 and isInsideFormat as false printImageFromFile method( without Callback )" , function() {
		runs(function() {
			setObjective("VTXXX-0176 |Print PNG file (1024X768) with Path to image file, x=50, y =100 and options as width as -1, height as -1 and isInsideFormat as false printImageFromFile method( without Callback )");
			setInstruction("1. Connect a Zebra printer with the device <br /> 2. Call printImageFromFile without callback.");
			setExpected("1. On successful print should return with STATUS_SUCCESS <br />2. On failure print should return with STATUS_ERROR ");
		});
		
		
		runs(function() {
				PrinterConnectiontype();
			});
		
		runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			connect_status = PrinterInstance.connect();
			waitsFor(function()	{
				return PrinterInstance.isConnected;
			}, '9sec wait for connection', ENABLE9K);
			
			if (PrinterInstance.isConnected) {
				PrinterInstance.printImageFromFile(pngimagepath_1024px, 50,100, {'width': -1, 'height': -1, 'isInsideFormat': false});
			}
			else {
				displayResult("Failed to connect to the printer", connect_status);	
			}
		});
		
		runs(function() {
			if (PrinterInstance.isConnected) {
				PrinterInstance.disconnect();
			}
		});
		waitsFor(function() {
			return document.getElementById("actResult").innerHTML != "init";
		}, "Timed out waiting for tester to respond", ENABLE30MIN);
		runs(function() {
			expect("pass").toEqual(document.getElementById("actResult").innerHTML);
		});
	});	
	
	it("VTXXX-0177 | Print JPG file (1024X768) with Path to image file, x=0, y =0 and options as width as 50, height as 50 and isInsideFormat as True printImageFromFile method ( without Callback )" , function() {
		runs(function() {
			setObjective("VTXXX-0177 |Print JPG file (1024X768) with Path to image file, x=0, y =0 and options as width as 50, height as 50 and isInsideFormat as True printImageFromFile method ( without Callback )");
			setInstruction("1. Connect a Zebra printer with the device <br /> 2. Call printImageFromFile without callback.");
			setExpected("1. On successful print should return with STATUS_SUCCESS <br />2. On failure print should return with STATUS_ERROR ");
		});
		
		
		runs(function() {
				PrinterConnectiontype();
			});
		
		runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			connect_status = PrinterInstance.connect();
			waitsFor(function()	{
				return PrinterInstance.isConnected;
			}, '9sec wait for connection', ENABLE9K);
			
			if (PrinterInstance.isConnected) {
				PrinterInstance.printImageFromFile(jpgimagepath_1024px, 0, 0, {'height':50, 'width':50, 'isInsideFormat':true});
			}
			else {
				displayResult("Failed to connect to the printer", connect_status);	
			}
		});
		
		runs(function() {
			if (PrinterInstance.isConnected) {
				PrinterInstance.disconnect();
			}
		});
		waitsFor(function() {
			return document.getElementById("actResult").innerHTML != "init";
		}, "Timed out waiting for tester to respond", ENABLE30MIN);
		runs(function() {
			expect("pass").toEqual(document.getElementById("actResult").innerHTML);
		});
	});	
	
	it("VTXXX-0178 | Print JPG file (1024X768) with Path to image file, x=50, y =100 and options as width as -1, height as -1 and isInsideFormat as false printImageFromFile method( without Callback )" , function() {
		runs(function() {
			setObjective("VTXXX-0178 |Print JPG file (1024X768) with Path to image file, x=50, y =100 and options as width as -1, height as -1 and isInsideFormat as false printImageFromFile method( without Callback )");
			setInstruction("1. Connect a Zebra printer with the device <br /> 2. Call printImageFromFile without callback.");
			setExpected("1. On successful print should return with STATUS_SUCCESS <br />2. On failure print should return with STATUS_ERROR ");
		});
		
		
		runs(function() {
				PrinterConnectiontype();
			});
		
		runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			connect_status = PrinterInstance.connect();
			waitsFor(function()	{
				return PrinterInstance.isConnected;
			}, '9sec wait for connection', ENABLE9K);
			
			if (PrinterInstance.isConnected) {
				PrinterInstance.printImageFromFile(jpgimagepath_1024px, 50, 100, {'height':-1, 'width':-1, 'isInsideFormat':false});
			}
			else {
				displayResult("Failed to connect to the printer", connect_status);	
			}
		});
		
		runs(function() {
			if (PrinterInstance.isConnected) {
				PrinterInstance.disconnect();
			}
		});
		waitsFor(function() {
			return document.getElementById("actResult").innerHTML != "init";
		}, "Timed out waiting for tester to respond", ENABLE30MIN);
		runs(function() {
			expect("pass").toEqual(document.getElementById("actResult").innerHTML);
		});
	});			

	it("VTXXX-0179 | Print PNG file (1024X768) with Path to image file, x=0, y =0 and options as width as 50, height as 50 and isInsideFormat as True printImageFromFile method ( with Anonymous Callback )" , function() {
		runs(function() {
			setObjective("VTXXX-0169 |Print PNG file (1024X768) with Path to image file, x=0, y =0 and options as width as 50, height as 50 and isInsideFormat as True printImageFromFile method ( with Anonymous Callback )");
			setInstruction("1. Connect a Zebra printer with the device <br /> 2. Call printImageFromFile with Anonymous callback.");
			setExpected("1. On successful print callback should return with STATUS_SUCCESS <br />2. On failure print callback should return with STATUS_ERROR ");
		});
		
		
		runs(function() {
				PrinterConnectiontype();
			});
		
		runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			connect_status = PrinterInstance.connect();
			waitsFor(function()	{
				return PrinterInstance.isConnected;
			}, '9sec wait for connection', ENABLE9K);
			
			if (PrinterInstance.isConnected) {
				PrinterInstance.printImageFromFile(pngimagepath_1024px, 0, 0, {'height':50, 'width':50, 'isInsideFormat':true}, function(data) {printImageFromFileCallback(data);});
			}
			else {
				displayResult("Failed to connect to the printer", connect_status);	
			}
		});
		
		runs(function() {
			if (PrinterInstance.isConnected) {
				PrinterInstance.disconnect();
			}
		});
		waitsFor(function() {
			return document.getElementById("actResult").innerHTML != "init";
		}, "Timed out waiting for tester to respond", ENABLE30MIN);
		runs(function() {
			expect("pass").toEqual(document.getElementById("actResult").innerHTML);
		});
	});	
	
	it("VTXXX-0180 | Print PNG file (1024X768) with Path to image file, x=50, y =100 and options as width as -1, height as -1 and isInsideFormat as false printImageFromFile method( with Anonymous Callback )" , function() {
		runs(function() {
			setObjective("VTXXX-0180 |Print PNG file (1024X768) with Path to image file, x=50, y =100 and options as width as -1, height as -1 and isInsideFormat as false printImageFromFile method( with Anonymous Callback )");
			setInstruction("1. Connect a Zebra printer with the device <br /> 2. Call printImageFromFile with Anonymous callback.");
			setExpected("1. On successful print callback should return with STATUS_SUCCESS <br />2. On failure print callback should return with STATUS_ERROR ");
		});
		
		
		runs(function() {
				PrinterConnectiontype();
			});
		
		runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			connect_status = PrinterInstance.connect();
			waitsFor(function()	{
				return PrinterInstance.isConnected;
			}, '9sec wait for connection', ENABLE9K);
			
			if (PrinterInstance.isConnected) {
				PrinterInstance.printImageFromFile(pngimagepath_1024px, 50, 100, {'height':-1, 'width':-1, 'isInsideFormat':false}, function(data) {printImageFromFileCallback(data);});
			}
			else {
				displayResult("Failed to connect to the printer", connect_status);	
			}
		});
		
		runs(function() {
			if (PrinterInstance.isConnected) {
				PrinterInstance.disconnect();
			}
		});
		waitsFor(function() {
			return document.getElementById("actResult").innerHTML != "init";
		}, "Timed out waiting for tester to respond", ENABLE30MIN);
		runs(function() {
			expect("pass").toEqual(document.getElementById("actResult").innerHTML);
		});
	});		
	
	it("VTXXX-0181 | Print JPG file (1024X768) with Path to image file, x=0, y =0 and options as width as 50, height as 50 and isInsideFormat as True printImageFromFile method ( with Anonymous Callback )" , function() {
		runs(function() {
			setObjective("VTXXX-0181 |Print JPG file (1024X768) with Path to image file, x=0, y =0 and options as width as 50, height as 50 and isInsideFormat as True printImageFromFile method ( with Anonymous Callback )");
			setInstruction("1. Connect a Zebra printer with the device <br /> 2. Call printImageFromFile with Anonymous callback.");
			setExpected("1. On successful print callback should return with STATUS_SUCCESS <br />2. On failure print callback should return with STATUS_ERROR ");
		});
		
		
		runs(function() {
				PrinterConnectiontype();
			});
		
		runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			connect_status = PrinterInstance.connect();
			waitsFor(function()	{
				return PrinterInstance.isConnected;
			}, '9sec wait for connection', ENABLE9K);
			
			if (PrinterInstance.isConnected) {
				PrinterInstance.printImageFromFile(jpgimagepath_1024px, 0, 0, {'height':50, 'width':50, 'isInsideFormat':true}, function(data) {printImageFromFileCallback(data);});
			}
			else {
				displayResult("Failed to connect to the printer", connect_status);	
			}
		});
		
		runs(function() {
			if (PrinterInstance.isConnected) {
				PrinterInstance.disconnect();
			}
		});
		waitsFor(function() {
			return document.getElementById("actResult").innerHTML != "init";
		}, "Timed out waiting for tester to respond", ENABLE30MIN);
		runs(function() {
			expect("pass").toEqual(document.getElementById("actResult").innerHTML);
		});
	});	
	
	it("VTXXX-0182 | Print JPG file (1024X768) with Path to image file, x=50, y =100 and options as width as -1, height as -1 and isInsideFormat as false printImageFromFile method( with Anonymous Callback )" , function() {
		runs(function() {
			setObjective("VTXXX-0182 |Print JPG file (1024X768) with Path to image file, x=50, y =100 and options as width as -1, height as -1 and isInsideFormat as false printImageFromFile method( with Anonymous Callback )");
			setInstruction("1. Connect a Zebra printer with the device <br /> 2. Call printImageFromFile with Anonymous callback.");
			setExpected("1. On successful print callback should return with STATUS_SUCCESS <br />2. On failure print callback should return with STATUS_ERROR ");
		});
		
		
		runs(function() {
				PrinterConnectiontype();
			});
		
		runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			connect_status = PrinterInstance.connect();
			waitsFor(function()	{
				return PrinterInstance.isConnected;
			}, '9sec wait for connection', ENABLE9K);
			
			if (PrinterInstance.isConnected) {
				PrinterInstance.printImageFromFile(jpgimagepath_1024px, 50, 100, {'height':-1, 'width':-1, 'isInsideFormat':false}, function(data) {printImageFromFileCallback(data);});
			}
			else {
				displayResult("Failed to connect to the printer", connect_status);	
			}
		});
		
		runs(function() {
			if (PrinterInstance.isConnected) {
				PrinterInstance.disconnect();
			}
		});
		waitsFor(function() {
			return document.getElementById("actResult").innerHTML != "init";
		}, "Timed out waiting for tester to respond", ENABLE30MIN);
		runs(function() {
			expect("pass").toEqual(document.getElementById("actResult").innerHTML);
		});
	});	
	
	it("VTXXX-0183 | storeImage method with valid printerDriveAndFileName D:FILE.GRF, imageFilePathOnDevice BMP (320X240), width = 50, height = 50  ( with Callback)" , function() {
		runs(function() {
			setObjective("VTXXX-0183 | storeImage method with valid printerDriveAndFileName D:FILE.GRF, imageFilePathOnDevice BMP (320X240), width = 50, height = 50  ( with Callback)");
			setInstruction("1. Connect a Zebra printer with the device <br /> 2. Call storeImage with callback.");
			setExpected("1.  On successful storing image callback should return with STATUS_SUCCESS. <br />2. File should be stored at D:FILE.GRF on printer <br />3. On failure storing image callback should return with STATUS_ERROR ");
		});
		
		
		runs(function() {
				PrinterConnectiontype();
			});
		
		runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			connect_status = PrinterInstance.connect();
			waitsFor(function()	{
				return PrinterInstance.isConnected;
			}, '9sec wait for connection', ENABLE9K);
			
			if (PrinterInstance.isConnected) {
				PrinterInstance.storeImage(printerDriveAndFileName, bmpimagepath_320px, 50, 50,storeImageCallback);
			}
			else {
				displayResult("Failed to connect to the printer", connect_status);	
			}
		});
		
		runs(function() {
			if (PrinterInstance.isConnected) {
				PrinterInstance.disconnect();
			}
		});
		waitsFor(function() {
			return document.getElementById("actResult").innerHTML != "init";
		}, "Timed out waiting for tester to respond", ENABLE30MIN);
		runs(function() {
			expect("pass").toEqual(document.getElementById("actResult").innerHTML);
		});
	});		
	
	it("VTXXX-0184 | storeImage method with valid printerDriveAndFileName D:FILE.GRF, imageFilePathOnDevice BMP (320X240), width = 0, height = 0  ( with Callback)" , function() {
		runs(function() {
			setObjective("VTXXX-0184 | storeImage method with valid printerDriveAndFileName D:FILE.GRF, imageFilePathOnDevice BMP (320X240), width = 0, height = 0  ( with Callback)");
			setInstruction("1. Connect a Zebra printer with the device <br /> 2. Call storeImage with callback.");
			setExpected("1.  On successful storing image callback should return with STATUS_SUCCESS. <br />2. File should be stored at D:FILE.GRF on printer <br />3. On failure storing image callback should return with STATUS_ERROR ");
		});
		
		
		runs(function() {
				PrinterConnectiontype();
			});
		
		runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			connect_status = PrinterInstance.connect();
			waitsFor(function()	{
				return PrinterInstance.isConnected;
			}, '9sec wait for connection', ENABLE9K);
			
			if (PrinterInstance.isConnected) {
				PrinterInstance.storeImage(printerDriveAndFileName, bmpimagepath_320px, 0, 0,storeImageCallback);
			}
			else {
				displayResult("Failed to connect to the printer", connect_status);	
			}
		});
		
		runs(function() {
			if (PrinterInstance.isConnected) {
				PrinterInstance.disconnect();
			}
		});
		waitsFor(function() {
			return document.getElementById("actResult").innerHTML != "init";
		}, "Timed out waiting for tester to respond", ENABLE30MIN);
		runs(function() {
			expect("pass").toEqual(document.getElementById("actResult").innerHTML);
		});
	});		

	it("VTXXX-0185 | storeImage method with printerDriveAndFileName without drive FILE.GRF, imageFilePathOnDevice BMP (320X240), width = -1, height = -1  ( with Callback)" , function() {
		runs(function() {
			setObjective("VTXXX-0185 | storeImage method with printerDriveAndFileName without drive FILE.GRF, imageFilePathOnDevice BMP (320X240), width = -1, height = -1  ( with Callback)");
			setInstruction("1. Connect a Zebra printer with the device <br /> 2. Call storeImage with callback.");
			setExpected("1.  On successful storing image callback should return with STATUS_SUCCESS. <br />2. File should be stored at default drive E:FILE.GRF on printer <br />3. On failure storing image callback should return with STATUS_ERROR ");
		});
		
		
		runs(function() {
				PrinterConnectiontype();
			});
		
		runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			connect_status = PrinterInstance.connect();
			waitsFor(function()	{
				return PrinterInstance.isConnected;
			}, '9sec wait for connection', ENABLE9K);
			
			if (PrinterInstance.isConnected) {
				PrinterInstance.storeImage(printerOnlyFileName, bmpimagepath_320px, -1, -1,storeImageCallback);
			}
			else {
				displayResult("Failed to connect to the printer", connect_status);	
			}
		});
		
		runs(function() {
			if (PrinterInstance.isConnected) {
				PrinterInstance.disconnect();
			}
		});
		waitsFor(function() {
			return document.getElementById("actResult").innerHTML != "init";
		}, "Timed out waiting for tester to respond", ENABLE30MIN);
		runs(function() {
			expect("pass").toEqual(document.getElementById("actResult").innerHTML);
		});
	});		
	
	it("VTXXX-0186 | storeImage method with   Invalid drive path, Invalid  image path, width = 0, height = 0  ( with Callback)" , function() {
		runs(function() {
			setObjective("VTXXX-0186 | storeImage method with   Invalid drive path, Invalid  image path, width = 0, height = 0  ( with Callback)");
			setInstruction("1. Connect a Zebra printer with the device <br /> 2. Call storeImage with callback.");
			setExpected("1. On failure storing image callback should return with STATUS_ERROR ");
		});
		
		
		runs(function() {
				PrinterConnectiontype();
			});
		
		runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			connect_status = PrinterInstance.connect();
			waitsFor(function()	{
				return PrinterInstance.isConnected;
			}, '9sec wait for connection', ENABLE9K);
			
			if (PrinterInstance.isConnected) {
				PrinterInstance.storeImage(Invaliddrivepath, invalidImagepath, 0, 0,storeImageCallback);
			}
			else {
				displayResult("Failed to connect to the printer", connect_status);	
			}
		});
		
		runs(function() {
			if (PrinterInstance.isConnected) {
				PrinterInstance.disconnect();
			}
		});
		waitsFor(function() {
			return document.getElementById("actResult").innerHTML != "init";
		}, "Timed out waiting for tester to respond", ENABLE30MIN);
		runs(function() {
			expect("pass").toEqual(document.getElementById("actResult").innerHTML);
		});
	});		
	
	it("VTXXX-0187 | storeImage method with '', '', width = 0, height = 0  ( with Callback)" , function() {
		runs(function() {
			setObjective("VTXXX-0187 | storeImage method with '', '', width = 0, height = 0  ( with Callback)");
			setInstruction("1. Connect a Zebra printer with the device <br /> 2. Call storeImage with callback.");
			setExpected("1. On failure storing image callback should return with STATUS_ERROR ");
		});
		
		
		runs(function() {
				PrinterConnectiontype();
			});
		
		runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			connect_status = PrinterInstance.connect();
			waitsFor(function()	{
				return PrinterInstance.isConnected;
			}, '9sec wait for connection', ENABLE9K);
			
			if (PrinterInstance.isConnected) {
				PrinterInstance.storeImage("", "", 0, 0,storeImageCallback);
			}
			else {
				displayResult("Failed to connect to the printer", connect_status);	
			}
		});
		
		runs(function() {
			if (PrinterInstance.isConnected) {
				PrinterInstance.disconnect();
			}
		});
		waitsFor(function() {
			return document.getElementById("actResult").innerHTML != "init";
		}, "Timed out waiting for tester to respond", ENABLE30MIN);
		runs(function() {
			expect("pass").toEqual(document.getElementById("actResult").innerHTML);
		});
	});
	
	it("VTXXX-0188 | storeImage method with valid printerDriveAndFileName BMP (640X480), imageFilePathOnDevice, width = 50, height = 50  ( with Callback)" , function() {
		runs(function() {
			setObjective("VTXXX-0188 | storeImage method with valid printerDriveAndFileName BMP (640X480), imageFilePathOnDevice, width = 50, height = 50  ( with Callback)");
			setInstruction("1. Connect a Zebra printer with the device <br /> 2. Call storeImage with callback.");
			setExpected("1.  On successful storing image callback should return with STATUS_SUCCESS.<br />2. File should be stored at    D:FILE.GRF on printer <br />3. On failure storing image callback should return with STATUS_ERROR ");
		});
		
		
		runs(function() {
				PrinterConnectiontype();
			});
		
		runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			connect_status = PrinterInstance.connect();
			waitsFor(function()	{
				return PrinterInstance.isConnected;
			}, '9sec wait for connection', ENABLE9K);
			
			if (PrinterInstance.isConnected) {
				PrinterInstance.storeImage(printerDriveAndFileName, bmpimagepath_640px, 50, 50,storeImageCallback);
			}
			else {
				displayResult("Failed to connect to the printer", connect_status);	
			}
		});
		
		runs(function() {
			if (PrinterInstance.isConnected) {
				PrinterInstance.disconnect();
			}
		});
		waitsFor(function() {
			return document.getElementById("actResult").innerHTML != "init";
		}, "Timed out waiting for tester to respond", ENABLE30MIN);
		runs(function() {
			expect("pass").toEqual(document.getElementById("actResult").innerHTML);
		});
	});	
	
	it("VTXXX-0189 | storeImage method with valid printerDriveAndFileName BMP (1024X768) , imageFilePathOnDevice, width = 150, height = 150  ( with Callback)" , function() {
		runs(function() {
			setObjective("VTXXX-0189 | storeImage method with valid printerDriveAndFileName BMP (1024X768) , imageFilePathOnDevice, width = 150, height = 150  ( with Callback)");
			setInstruction("1. Connect a Zebra printer with the device <br /> 2. Call storeImage with callback.");
			setExpected("1.  On successful storing image callback should return with STATUS_SUCCESS.<br />2. File should be stored at    D:FILE.GRF on printer <br />3. On failure storing image callback should return with STATUS_ERROR ");
		});
		
		
		runs(function() {
				PrinterConnectiontype();
			});
		
		runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			connect_status = PrinterInstance.connect();
			waitsFor(function()	{
				return PrinterInstance.isConnected;
			}, '9sec wait for connection', ENABLE9K);
			
			if (PrinterInstance.isConnected) {
				PrinterInstance.storeImage(printerDriveAndFileName, bmpimagepath_1024px, 150, 150,storeImageCallback);
			}
			else {
				displayResult("Failed to connect to the printer", connect_status);	
			}
		});
		
		runs(function() {
			if (PrinterInstance.isConnected) {
				PrinterInstance.disconnect();
			}
		});
		waitsFor(function() {
			return document.getElementById("actResult").innerHTML != "init";
		}, "Timed out waiting for tester to respond", ENABLE30MIN);
		runs(function() {
			expect("pass").toEqual(document.getElementById("actResult").innerHTML);
		});
	});		
	
	it("VTXXX-0190 | storeImage method with valid printerDriveAndFileName BMP (2048X1536), imageFilePathOnDevice, width = -1, height = -1 ( with Callback)" , function() {
		runs(function() {
			setObjective("VTXXX-0190 | storeImage method with valid printerDriveAndFileName BMP (2048X1536), imageFilePathOnDevice, width = -1, height = -1 ( with Callback)");
			setInstruction("1. Connect a Zebra printer with the device <br /> 2. Call storeImage with callback.");
			setExpected("1.  On successful storing image callback should return with STATUS_SUCCESS.<br />2. File should be stored at    D:FILE.GRF on printer <br />3. On failure storing image callback should return with STATUS_ERROR ");
		});
		
		
		runs(function() {
				PrinterConnectiontype();
			});
		
		runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			connect_status = PrinterInstance.connect();
			waitsFor(function()	{
				return PrinterInstance.isConnected;
			}, '9sec wait for connection', ENABLE9K);
			
			if (PrinterInstance.isConnected) {
				PrinterInstance.storeImage(printerDriveAndFileName, bmpimagepath_2048px, -1, -1,storeImageCallback);
			}
			else {
				displayResult("Failed to connect to the printer", connect_status);	
			}
		});
		
		runs(function() {
			if (PrinterInstance.isConnected) {
				PrinterInstance.disconnect();
			}
		});
		waitsFor(function() {
			return document.getElementById("actResult").innerHTML != "init";
		}, "Timed out waiting for tester to respond", ENABLE30MIN);
		runs(function() {
			expect("pass").toEqual(document.getElementById("actResult").innerHTML);
		});
	});		
	
	it("VTXXX-0191 | storeImage method  printerDriveAndFileName without print drive FILE.GRF, imageFilePathOnDevice JPG (320X240), width = 50, height = 50  ( with Callback)" , function() {
		runs(function() {
			setObjective("VTXXX-0191 | storeImage method  printerDriveAndFileName without print drive FILE.GRF, imageFilePathOnDevice JPG (320X240), width = 50, height = 50  ( with Callback)");
			setInstruction("1. Connect a Zebra printer with the device <br /> 2. Call storeImage with callback.");
			setExpected("1.  On successful storing image callback should return with STATUS_SUCCESS.<br />2.  File should be stored at  default E:FILE.GRF on printer <br />3. On failure storing image callback should return with STATUS_ERROR ");
		});
		
		
		runs(function() {
				PrinterConnectiontype();
			});
		
		runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			connect_status = PrinterInstance.connect();
			waitsFor(function()	{
				return PrinterInstance.isConnected;
			}, '9sec wait for connection', ENABLE9K);
			
			if (PrinterInstance.isConnected) {
				PrinterInstance.storeImage(printerOnlyFileName, jpgimagepath_320px, 50, 50,storeImageCallback);
			}
			else {
				displayResult("Failed to connect to the printer", connect_status);	
			}
		});
		
		runs(function() {
			if (PrinterInstance.isConnected) {
				PrinterInstance.disconnect();
			}
		});
		waitsFor(function() {
			return document.getElementById("actResult").innerHTML != "init";
		}, "Timed out waiting for tester to respond", ENABLE30MIN);
		runs(function() {
			expect("pass").toEqual(document.getElementById("actResult").innerHTML);
		});
	});	
	
	it("VTXXX-0192 | storeImage method with valid printerDriveAndFileName JPG (640X480), imageFilePathOnDevice, width = 50, height = 50  ( with Callback)" , function() {
		runs(function() {
			setObjective("VTXXX-0192 | storeImage method with valid printerDriveAndFileName JPG (640X480), imageFilePathOnDevice, width = 50, height = 50  ( with Callback)");
			setInstruction("1. Connect a Zebra printer with the device <br /> 2. Call storeImage with callback.");
			setExpected("1.  On successful storing image callback should return with STATUS_SUCCESS.<br />2.  File should be stored at  D:FILE.GRF on printer <br />3. On failure storing image callback should return with STATUS_ERROR ");
		});
		
		
		runs(function() {
				PrinterConnectiontype();
			});
		
		runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			connect_status = PrinterInstance.connect();
			waitsFor(function()	{
				return PrinterInstance.isConnected;
			}, '9sec wait for connection', ENABLE9K);
			
			if (PrinterInstance.isConnected) {
				PrinterInstance.storeImage(printerDriveAndFileName, jpgimagepath_640px, 50, 50,storeImageCallback);
			}
			else {
				displayResult("Failed to connect to the printer", connect_status);	
			}
		});
		
		runs(function() {
			if (PrinterInstance.isConnected) {
				PrinterInstance.disconnect();
			}
		});
		waitsFor(function() {
			return document.getElementById("actResult").innerHTML != "init";
		}, "Timed out waiting for tester to respond", ENABLE30MIN);
		runs(function() {
			expect("pass").toEqual(document.getElementById("actResult").innerHTML);
		});
	});	
	
	it("VTXXX-0193 | storeImage method with valid printerDriveAndFileName JPG (1024X768) , imageFilePathOnDevice, width = 150, height = 150  ( with Callback)" , function() {
		runs(function() {
			setObjective("VTXXX-0193 | storeImage method with valid printerDriveAndFileName JPG (1024X768) , imageFilePathOnDevice, width = 150, height = 150  ( with Callback)");
			setInstruction("1. Connect a Zebra printer with the device <br /> 2. Call storeImage with callback.");
			setExpected("1.  On successful storing image callback should return with STATUS_SUCCESS.<br />2.  File should be stored at  D:FILE.GRF on printer <br />3. On failure storing image callback should return with STATUS_ERROR ");
		});
		
		
		runs(function() {
				PrinterConnectiontype();
			});
		
		runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			connect_status = PrinterInstance.connect();
			waitsFor(function()	{
				return PrinterInstance.isConnected;
			}, '9sec wait for connection', ENABLE9K);
			
			if (PrinterInstance.isConnected) {
				PrinterInstance.storeImage(printerDriveAndFileName, jpgimagepath_1024px, 150, 150,storeImageCallback);
			}
			else {
				displayResult("Failed to connect to the printer", connect_status);	
			}
		});
		
		runs(function() {
			if (PrinterInstance.isConnected) {
				PrinterInstance.disconnect();
			}
		});
		waitsFor(function() {
			return document.getElementById("actResult").innerHTML != "init";
		}, "Timed out waiting for tester to respond", ENABLE30MIN);
		runs(function() {
			expect("pass").toEqual(document.getElementById("actResult").innerHTML);
		});
	});	
	
	it("VTXXX-0194 | storeImage method with valid printerDriveAndFileName JPG (2048X1536), imageFilePathOnDevice, width = -1, height = -1 ( with Callback)" , function() {
		runs(function() {
			setObjective("VTXXX-0194 | storeImage method with valid printerDriveAndFileName JPG (2048X1536), imageFilePathOnDevice, width = -1, height = -1 ( with Callback)");
			setInstruction("1. Connect a Zebra printer with the device <br /> 2. Call storeImage with callback.");
			setExpected("1.  On successful storing image callback should return with STATUS_SUCCESS.<br />2.  File should be stored at  D:FILE.GRF on printer <br />3. On failure storing image callback should return with STATUS_ERROR ");
		});
		
		
		runs(function() {
				PrinterConnectiontype();
			});
		
		runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			connect_status = PrinterInstance.connect();
			waitsFor(function()	{
				return PrinterInstance.isConnected;
			}, '9sec wait for connection', ENABLE9K);
			
			if (PrinterInstance.isConnected) {
				PrinterInstance.storeImage(printerDriveAndFileName, jpgimagepath_2048px, -1, -1,storeImageCallback);
			}
			else {
				displayResult("Failed to connect to the printer", connect_status);	
			}
		});
		
		runs(function() {
			if (PrinterInstance.isConnected) {
				PrinterInstance.disconnect();
			}
		});
		waitsFor(function() {
			return document.getElementById("actResult").innerHTML != "init";
		}, "Timed out waiting for tester to respond", ENABLE30MIN);
		runs(function() {
			expect("pass").toEqual(document.getElementById("actResult").innerHTML);
		});
	});		
	
	it("VTXXX-0195 | storeImage method  printerDriveAndFileName without print drive FILE.GRF, imageFilePathOnDevice PNG (320X240), width = 50, height = 50  ( with Callback)" , function() {
		runs(function() {
			setObjective("VTXXX-0195 | storeImage method  printerDriveAndFileName without print drive FILE.GRF, imageFilePathOnDevice PNG (320X240), width = 50, height = 50  ( with Callback)");
			setInstruction("1. Connect a Zebra printer with the device <br /> 2. Call storeImage with callback.");
			setExpected("1.  On successful storing image callback should return with STATUS_SUCCESS.<br />2.  File should be stored at  default E:FILE.GRF on printer <br />3. On failure storing image callback should return with STATUS_ERROR ");
		});
		
		
		runs(function() {
				PrinterConnectiontype();
			});
		
		runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			connect_status = PrinterInstance.connect();
			waitsFor(function()	{
				return PrinterInstance.isConnected;
			}, '9sec wait for connection', ENABLE9K);
			
			if (PrinterInstance.isConnected) {
				PrinterInstance.storeImage(printerOnlyFileName, pngimagepath_320px, 50, 50,storeImageCallback);
			}
			else {
				displayResult("Failed to connect to the printer", connect_status);	
			}
		});
		
		runs(function() {
			if (PrinterInstance.isConnected) {
				PrinterInstance.disconnect();
			}
		});
		waitsFor(function() {
			return document.getElementById("actResult").innerHTML != "init";
		}, "Timed out waiting for tester to respond", ENABLE30MIN);
		runs(function() {
			expect("pass").toEqual(document.getElementById("actResult").innerHTML);
		});
	});	
	
	it("VTXXX-0196 | storeImage method with valid printerDriveAndFileName PNG (640X480), imageFilePathOnDevice, width = 50, height = 50  ( with Callback)" , function() {
		runs(function() {
			setObjective("VTXXX-0196 | storeImage method with valid printerDriveAndFileName PNG (640X480), imageFilePathOnDevice, width = 50, height = 50  ( with Callback)");
			setInstruction("1. Connect a Zebra printer with the device <br /> 2. Call storeImage with callback.");
			setExpected("1.  On successful storing image callback should return with STATUS_SUCCESS.<br />2.  File should be stored at  D:FILE.GRF on printer <br />3. On failure storing image callback should return with STATUS_ERROR ");
		});
		
		
		runs(function() {
				PrinterConnectiontype();
			});
		
		runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			connect_status = PrinterInstance.connect();
			waitsFor(function()	{
				return PrinterInstance.isConnected;
			}, '9sec wait for connection', ENABLE9K);
			
			if (PrinterInstance.isConnected) {
				PrinterInstance.storeImage(printerDriveAndFileName, pngimagepath_640px, 50, 50,storeImageCallback);
			}
			else {
				displayResult("Failed to connect to the printer", connect_status);	
			}
		});
		
		runs(function() {
			if (PrinterInstance.isConnected) {
				PrinterInstance.disconnect();
			}
		});
		waitsFor(function() {
			return document.getElementById("actResult").innerHTML != "init";
		}, "Timed out waiting for tester to respond", ENABLE30MIN);
		runs(function() {
			expect("pass").toEqual(document.getElementById("actResult").innerHTML);
		});
	});	
	
	it("VTXXX-0197 | storeImage method with valid printerDriveAndFileName PNG (1024X768) , imageFilePathOnDevice, width = 150, height = 150  ( with Callback)" , function() {
		runs(function() {
			setObjective("VTXXX-0197 | storeImage method with valid printerDriveAndFileName PNG (1024X768) , imageFilePathOnDevice, width = 150, height = 150  ( with Callback)");
			setInstruction("1. Connect a Zebra printer with the device <br /> 2. Call storeImage with callback.");
			setExpected("1.  On successful storing image callback should return with STATUS_SUCCESS.<br />2.  File should be stored at  D:FILE.GRF on printer <br />3. On failure storing image callback should return with STATUS_ERROR ");
		});
		
		
		runs(function() {
				PrinterConnectiontype();
			});
		
		runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			connect_status = PrinterInstance.connect();
			waitsFor(function()	{
				return PrinterInstance.isConnected;
			}, '9sec wait for connection', ENABLE9K);
			
			if (PrinterInstance.isConnected) {
				PrinterInstance.storeImage(printerDriveAndFileName, pngimagepath_1024px, 150, 150,storeImageCallback);
			}
			else {
				displayResult("Failed to connect to the printer", connect_status);	
			}
		});
		
		runs(function() {
			if (PrinterInstance.isConnected) {
				PrinterInstance.disconnect();
			}
		});
		waitsFor(function() {
			return document.getElementById("actResult").innerHTML != "init";
		}, "Timed out waiting for tester to respond", ENABLE30MIN);
		runs(function() {
			expect("pass").toEqual(document.getElementById("actResult").innerHTML);
		});
	});	
	
	it("VTXXX-0198 | storeImage method with valid printerDriveAndFileName PNG (2048X1536), imageFilePathOnDevice, width = -1, height = -1 ( with Callback)" , function() {
		runs(function() {
			setObjective("VTXXX-0198 | storeImage method with valid printerDriveAndFileName PNG (2048X1536), imageFilePathOnDevice, width = -1, height = -1 ( with Callback)");
			setInstruction("1. Connect a Zebra printer with the device <br /> 2. Call storeImage with callback.");
			setExpected("1.  On successful storing image callback should return with STATUS_SUCCESS.<br />2.  File should be stored at  D:FILE.GRF on printer <br />3. On failure storing image callback should return with STATUS_ERROR ");
		});
		
		
		runs(function() {
				PrinterConnectiontype();
			});
		
		runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			connect_status = PrinterInstance.connect();
			waitsFor(function()	{
				return PrinterInstance.isConnected;
			}, '9sec wait for connection', ENABLE9K);
			
			if (PrinterInstance.isConnected) {
				PrinterInstance.storeImage(printerDriveAndFileName, pngimagepath_2048px, -1, -1,storeImageCallback);
			}
			else {
				displayResult("Failed to connect to the printer", connect_status);	
			}
		});
		
		runs(function() {
			if (PrinterInstance.isConnected) {
				PrinterInstance.disconnect();
			}
		});
		waitsFor(function() {
			return document.getElementById("actResult").innerHTML != "init";
		}, "Timed out waiting for tester to respond", ENABLE30MIN);
		runs(function() {
			expect("pass").toEqual(document.getElementById("actResult").innerHTML);
		});
	});		
	
	it("VTXXX-0199 | storeImage method  printerDriveAndFileName without print drive FILE.GRF, imageFilePathOnDevice GIF (320X240), width = 50, height = 50  ( with Callback)" , function() {
		runs(function() {
			setObjective("VTXXX-0199 | storeImage method  printerDriveAndFileName without print drive FILE.GRF, imageFilePathOnDevice GIF (320X240), width = 50, height = 50  ( with Callback)");
			setInstruction("1. Connect a Zebra printer with the device <br /> 2. Call storeImage with callback.");
			setExpected("1.  On successful storing image callback should return with STATUS_SUCCESS.<br />2.  File should be stored at  default E:FILE.GRF on printer <br />3. On failure storing image callback should return with STATUS_ERROR ");
		});
		
		
		runs(function() {
				PrinterConnectiontype();
			});
		
		runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			connect_status = PrinterInstance.connect();
			waitsFor(function()	{
				return PrinterInstance.isConnected;
			}, '9sec wait for connection', ENABLE9K);
			
			if (PrinterInstance.isConnected) {
				PrinterInstance.storeImage(printerOnlyFileName, gifimagepath_320px, 50, 50,storeImageCallback);
			}
			else {
				displayResult("Failed to connect to the printer", connect_status);	
			}
		});
		
		runs(function() {
			if (PrinterInstance.isConnected) {
				PrinterInstance.disconnect();
			}
		});
		waitsFor(function() {
			return document.getElementById("actResult").innerHTML != "init";
		}, "Timed out waiting for tester to respond", ENABLE30MIN);
		runs(function() {
			expect("pass").toEqual(document.getElementById("actResult").innerHTML);
		});
	});	
	
	it("VTXXX-0200 | storeImage method with valid printerDriveAndFileName GIF (640X480), imageFilePathOnDevice, width = 50, height = 50  ( with Callback)" , function() {
		runs(function() {
			setObjective("VTXXX-0200 | storeImage method with valid printerDriveAndFileName GIF (640X480), imageFilePathOnDevice, width = 50, height = 50  ( with Callback)");
			setInstruction("1. Connect a Zebra printer with the device <br /> 2. Call storeImage with callback.");
			setExpected("1.  On successful storing image callback should return with STATUS_SUCCESS.<br />2.  File should be stored at  D:FILE.GRF on printer <br />3. On failure storing image callback should return with STATUS_ERROR ");
		});
		
		
		runs(function() {
				PrinterConnectiontype();
			});
		
		runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			connect_status = PrinterInstance.connect();
			waitsFor(function()	{
				return PrinterInstance.isConnected;
			}, '9sec wait for connection', ENABLE9K);
			
			if (PrinterInstance.isConnected) {
				PrinterInstance.storeImage(printerDriveAndFileName, gifimagepath_640px, 50, 50,storeImageCallback);
			}
			else {
				displayResult("Failed to connect to the printer", connect_status);	
			}
		});
		
		runs(function() {
			if (PrinterInstance.isConnected) {
				PrinterInstance.disconnect();
			}
		});
		waitsFor(function() {
			return document.getElementById("actResult").innerHTML != "init";
		}, "Timed out waiting for tester to respond", ENABLE30MIN);
		runs(function() {
			expect("pass").toEqual(document.getElementById("actResult").innerHTML);
		});
	});	
	
	it("VTXXX-0201 | storeImage method with valid printerDriveAndFileName GIF (1024X768) , imageFilePathOnDevice, width = 150, height = 150  ( with Callback)" , function() {
		runs(function() {
			setObjective("VTXXX-0201 | storeImage method with valid printerDriveAndFileName GIF (1024X768) , imageFilePathOnDevice, width = 150, height = 150  ( with Callback)");
			setInstruction("1. Connect a Zebra printer with the device <br /> 2. Call storeImage with callback.");
			setExpected("1.  On successful storing image callback should return with STATUS_SUCCESS.<br />2.  File should be stored at  D:FILE.GRF on printer <br />3. On failure storing image callback should return with STATUS_ERROR ");
		});
		
		
		runs(function() {
				PrinterConnectiontype();
			});
		
		runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			connect_status = PrinterInstance.connect();
			waitsFor(function()	{
				return PrinterInstance.isConnected;
			}, '9sec wait for connection', ENABLE9K);
			
			if (PrinterInstance.isConnected) {
				PrinterInstance.storeImage(printerDriveAndFileName, gifimagepath_1024px, 150, 150,storeImageCallback);
			}
			else {
				displayResult("Failed to connect to the printer", connect_status);	
			}
		});
		
		runs(function() {
			if (PrinterInstance.isConnected) {
				PrinterInstance.disconnect();
			}
		});
		waitsFor(function() {
			return document.getElementById("actResult").innerHTML != "init";
		}, "Timed out waiting for tester to respond", ENABLE30MIN);
		runs(function() {
			expect("pass").toEqual(document.getElementById("actResult").innerHTML);
		});
	});	
	
	it("VTXXX-0202 | storeImage method with valid printerDriveAndFileName GIF (2048X1536), imageFilePathOnDevice, width = -1, height = -1 ( with Callback)" , function() {
		runs(function() {
			setObjective("VTXXX-0202 | storeImage method with valid printerDriveAndFileName GIF (2048X1536), imageFilePathOnDevice, width = -1, height = -1 ( with Callback)");
			setInstruction("1. Connect a Zebra printer with the device <br /> 2. Call storeImage with callback.");
			setExpected("1.  On successful storing image callback should return with STATUS_SUCCESS.<br />2.  File should be stored at  D:FILE.GRF on printer <br />3. On failure storing image callback should return with STATUS_ERROR ");
		});
		
		
		runs(function() {
				PrinterConnectiontype();
			});
		
		runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			connect_status = PrinterInstance.connect();
			waitsFor(function()	{
				return PrinterInstance.isConnected;
			}, '9sec wait for connection', ENABLE9K);
			
			if (PrinterInstance.isConnected) {
				PrinterInstance.storeImage(printerDriveAndFileName, gifimagepath_2048px, -1, -1,storeImageCallback);
			}
			else {
				displayResult("Failed to connect to the printer", connect_status);	
			}
		});
		
		runs(function() {
			if (PrinterInstance.isConnected) {
				PrinterInstance.disconnect();
			}
		});
		waitsFor(function() {
			return document.getElementById("actResult").innerHTML != "init";
		}, "Timed out waiting for tester to respond", ENABLE30MIN);
		runs(function() {
			expect("pass").toEqual(document.getElementById("actResult").innerHTML);
		});
	});	

	it("VTXXX-0203 | storeImage method  printerDriveAndFileName without print drive FILE.GRF, imageFilePathOnDevice BMP (320X240), width = 50, height = 50  ( without Callback)" , function() {
		runs(function() {
			setObjective("VTXXX-0203 | storeImage method  printerDriveAndFileName without print drive FILE.GRF, imageFilePathOnDevice BMP (320X240), width = 50, height = 50  ( without Callback)");
			setInstruction("1. Connect a Zebra printer with the device <br /> 2. Call storeImage with callback.");
			setExpected("1.  On successful storing image should return with STATUS_SUCCESS.<br />2.  File should be stored at  E:FILE.GRF on printer <br />3. On failure storing image should return with STATUS_ERROR ");
		});
		
		
		runs(function() {
				PrinterConnectiontype();
			});
		
		runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			connect_status = PrinterInstance.connect();
			waitsFor(function()	{
				return PrinterInstance.isConnected;
			}, '9sec wait for connection', ENABLE9K);
			
			if (PrinterInstance.isConnected) {
				PrinterInstance.storeImage(printerOnlyFileName, bmpimagepath_320px, 50, 50);
			}
			else {
				displayResult("Failed to connect to the printer", connect_status);	
			}
		});
		
		runs(function() {
			if (PrinterInstance.isConnected) {
				PrinterInstance.disconnect();
			}
		});
		waitsFor(function() {
			return document.getElementById("actResult").innerHTML != "init";
		}, "Timed out waiting for tester to respond", ENABLE30MIN);
		runs(function() {
			expect("pass").toEqual(document.getElementById("actResult").innerHTML);
		});
	});		

	it("VTXXX-0204 | storeImage method with valid printerDriveAndFileName BMP (640X480), imageFilePathOnDevice, width = 50, height = 50  ( without Callback)" , function() {
		runs(function() {
			setObjective("VTXXX-0204 | storeImage method with valid printerDriveAndFileName BMP (640X480), imageFilePathOnDevice, width = 50, height = 50  ( without Callback)");
			setInstruction("1. Connect a Zebra printer with the device <br /> 2. Call storeImage with callback.");
			setExpected("1.  On successful storing image should return with STATUS_SUCCESS.<br />2.  File should be stored at  D:FILE.GRF on printer <br />3. On failure storing image should return with STATUS_ERROR ");
		});
		
		
		runs(function() {
				PrinterConnectiontype();
			});
		
		runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			connect_status = PrinterInstance.connect();
			waitsFor(function()	{
				return PrinterInstance.isConnected;
			}, '9sec wait for connection', ENABLE9K);
			
			if (PrinterInstance.isConnected) {
				PrinterInstance.storeImage(printerDriveAndFileName, bmpimagepath_640px, 50, 50);
			}
			else {
				displayResult("Failed to connect to the printer", connect_status);	
			}
		});
		
		runs(function() {
			if (PrinterInstance.isConnected) {
				PrinterInstance.disconnect();
			}
		});
		waitsFor(function() {
			return document.getElementById("actResult").innerHTML != "init";
		}, "Timed out waiting for tester to respond", ENABLE30MIN);
		runs(function() {
			expect("pass").toEqual(document.getElementById("actResult").innerHTML);
		});
	});	

	it("VTXXX-0205 | storeImage method with valid printerDriveAndFileName BMP (1024X768) , imageFilePathOnDevice, width = 150, height = 150  ( without Callback)" , function() {
		runs(function() {
			setObjective("VTXXX-0205 | storeImage method with valid printerDriveAndFileName BMP (1024X768) , imageFilePathOnDevice, width = 150, height = 150  ( without Callback)");
			setInstruction("1. Connect a Zebra printer with the device <br /> 2. Call storeImage with callback.");
			setExpected("1.  On successful storing image should return with STATUS_SUCCESS.<br />2.  File should be stored at  D:FILE.GRF on printer <br />3. On failure storing image should return with STATUS_ERROR ");
		});
		
		
		runs(function() {
				PrinterConnectiontype();
			});
		
		runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			connect_status = PrinterInstance.connect();
			waitsFor(function()	{
				return PrinterInstance.isConnected;
			}, '9sec wait for connection', ENABLE9K);
			
			if (PrinterInstance.isConnected) {
				PrinterInstance.storeImage(printerDriveAndFileName, bmpimagepath_1024px, 150, 150);
			}
			else {
				displayResult("Failed to connect to the printer", connect_status);	
			}
		});
		
		runs(function() {
			if (PrinterInstance.isConnected) {
				PrinterInstance.disconnect();
			}
		});
		waitsFor(function() {
			return document.getElementById("actResult").innerHTML != "init";
		}, "Timed out waiting for tester to respond", ENABLE30MIN);
		runs(function() {
			expect("pass").toEqual(document.getElementById("actResult").innerHTML);
		});
	});		
	
	it("VTXXX-0206 | storeImage method with valid printerDriveAndFileName BMP (2048X1536), imageFilePathOnDevice, width = -1, height = -1 ( without Callback)" , function() {
		runs(function() {
			setObjective("VTXXX-0206 | storeImage method with valid printerDriveAndFileName BMP (2048X1536), imageFilePathOnDevice, width = -1, height = -1 ( without Callback)");
			setInstruction("1. Connect a Zebra printer with the device <br /> 2. Call storeImage with callback.");
			setExpected("1.  On successful storing image should return with STATUS_SUCCESS.<br />2.  File should be stored at  D:FILE.GRF on printer <br />3. On failure storing image should return with STATUS_ERROR ");
		});
		
		
		runs(function() {
				PrinterConnectiontype();
			});
		
		runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			connect_status = PrinterInstance.connect();
			waitsFor(function()	{
				return PrinterInstance.isConnected;
			}, '9sec wait for connection', ENABLE9K);
			
			if (PrinterInstance.isConnected) {
				PrinterInstance.storeImage(printerDriveAndFileName, bmpimagepath_2048px, -1, -1);
			}
			else {
				displayResult("Failed to connect to the printer", connect_status);	
			}
		});
		
		runs(function() {
			if (PrinterInstance.isConnected) {
				PrinterInstance.disconnect();
			}
		});
		waitsFor(function() {
			return document.getElementById("actResult").innerHTML != "init";
		}, "Timed out waiting for tester to respond", ENABLE30MIN);
		runs(function() {
			expect("pass").toEqual(document.getElementById("actResult").innerHTML);
		});
	});	

	it("VTXXX-0207 | storeImage method  printerDriveAndFileName without print drive FILE.GRF, imageFilePathOnDevice GIF (320X240), width = 50, height = 50  ( without Callback)" , function() {
		runs(function() {
			setObjective("VTXXX-0207 | storeImage method  printerDriveAndFileName without print drive FILE.GRF, imageFilePathOnDevice GIF (320X240), width = 50, height = 50  ( without Callback)");
			setInstruction("1. Connect a Zebra printer with the device <br /> 2. Call storeImage with callback.");
			setExpected("1.  On successful storing image should return with STATUS_SUCCESS.<br />2.  File should be stored at  E:FILE.GRF on printer <br />3. On failure storing image should return with STATUS_ERROR ");
		});
		
		
		runs(function() {
				PrinterConnectiontype();
			});
		
		runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			connect_status = PrinterInstance.connect();
			waitsFor(function()	{
				return PrinterInstance.isConnected;
			}, '9sec wait for connection', ENABLE9K);
			
			if (PrinterInstance.isConnected) {
				PrinterInstance.storeImage(printerOnlyFileName, gifimagepath_320px, 50, 50);
			}
			else {
				displayResult("Failed to connect to the printer", connect_status);	
			}
		});
		
		runs(function() {
			if (PrinterInstance.isConnected) {
				PrinterInstance.disconnect();
			}
		});
		waitsFor(function() {
			return document.getElementById("actResult").innerHTML != "init";
		}, "Timed out waiting for tester to respond", ENABLE30MIN);
		runs(function() {
			expect("pass").toEqual(document.getElementById("actResult").innerHTML);
		});
	});		

	it("VTXXX-0208 | storeImage method with valid printerDriveAndFileName GIF (640X480), imageFilePathOnDevice, width = 50, height = 50  ( without Callback)" , function() {
		runs(function() {
			setObjective("VTXXX-0208 | storeImage method with valid printerDriveAndFileName GIF (640X480), imageFilePathOnDevice, width = 50, height = 50  ( without Callback)");
			setInstruction("1. Connect a Zebra printer with the device <br /> 2. Call storeImage with callback.");
			setExpected("1.  On successful storing image should return with STATUS_SUCCESS.<br />2.  File should be stored at  D:FILE.GRF on printer <br />3. On failure storing image should return with STATUS_ERROR ");
		});
		
		
		runs(function() {
				PrinterConnectiontype();
			});
		
		runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			connect_status = PrinterInstance.connect();
			waitsFor(function()	{
				return PrinterInstance.isConnected;
			}, '9sec wait for connection', ENABLE9K);
			
			if (PrinterInstance.isConnected) {
				PrinterInstance.storeImage(printerDriveAndFileName, gifimagepath_640px, 50, 50);
			}
			else {
				displayResult("Failed to connect to the printer", connect_status);	
			}
		});
		
		runs(function() {
			if (PrinterInstance.isConnected) {
				PrinterInstance.disconnect();
			}
		});
		waitsFor(function() {
			return document.getElementById("actResult").innerHTML != "init";
		}, "Timed out waiting for tester to respond", ENABLE30MIN);
		runs(function() {
			expect("pass").toEqual(document.getElementById("actResult").innerHTML);
		});
	});	

	it("VTXXX-0209 | storeImage method with valid printerDriveAndFileName GIF (1024X768) , imageFilePathOnDevice, width = 150, height = 150  ( without Callback)" , function() {
		runs(function() {
			setObjective("VTXXX-0209 | storeImage method with valid printerDriveAndFileName GIF (1024X768) , imageFilePathOnDevice, width = 150, height = 150  ( without Callback)");
			setInstruction("1. Connect a Zebra printer with the device <br /> 2. Call storeImage with callback.");
			setExpected("1.  On successful storing image should return with STATUS_SUCCESS.<br />2.  File should be stored at  D:FILE.GRF on printer <br />3. On failure storing image should return with STATUS_ERROR ");
		});
		
		
		runs(function() {
				PrinterConnectiontype();
			});
		
		runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			connect_status = PrinterInstance.connect();
			waitsFor(function()	{
				return PrinterInstance.isConnected;
			}, '9sec wait for connection', ENABLE9K);
			
			if (PrinterInstance.isConnected) {
				PrinterInstance.storeImage(printerDriveAndFileName, gifimagepath_1024px, 150, 150);
			}
			else {
				displayResult("Failed to connect to the printer", connect_status);	
			}
		});
		
		runs(function() {
			if (PrinterInstance.isConnected) {
				PrinterInstance.disconnect();
			}
		});
		waitsFor(function() {
			return document.getElementById("actResult").innerHTML != "init";
		}, "Timed out waiting for tester to respond", ENABLE30MIN);
		runs(function() {
			expect("pass").toEqual(document.getElementById("actResult").innerHTML);
		});
	});		
	
	it("VTXXX-0210 | storeImage method with valid printerDriveAndFileName GIF (2048X1536), imageFilePathOnDevice, width = -1, height = -1 ( without Callback)" , function() {
		runs(function() {
			setObjective("VTXXX-0210 | storeImage method with valid printerDriveAndFileName GIF (2048X1536), imageFilePathOnDevice, width = -1, height = -1 ( without Callback)");
			setInstruction("1. Connect a Zebra printer with the device <br /> 2. Call storeImage with callback.");
			setExpected("1.  On successful storing image should return with STATUS_SUCCESS.<br />2.  File should be stored at  D:FILE.GRF on printer <br />3. On failure storing image should return with STATUS_ERROR ");
		});
		
		
		runs(function() {
				PrinterConnectiontype();
			});
		
		runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			connect_status = PrinterInstance.connect();
			waitsFor(function()	{
				return PrinterInstance.isConnected;
			}, '9sec wait for connection', ENABLE9K);
			
			if (PrinterInstance.isConnected) {
				PrinterInstance.storeImage(printerDriveAndFileName, gifimagepath_2048px, -1, -1);
			}
			else {
				displayResult("Failed to connect to the printer", connect_status);	
			}
		});
		
		runs(function() {
			if (PrinterInstance.isConnected) {
				PrinterInstance.disconnect();
			}
		});
		waitsFor(function() {
			return document.getElementById("actResult").innerHTML != "init";
		}, "Timed out waiting for tester to respond", ENABLE30MIN);
		runs(function() {
			expect("pass").toEqual(document.getElementById("actResult").innerHTML);
		});
	});		

	it("VTXXX-0211 | storeImage method  printerDriveAndFileName without print drive FILE.GRF, imageFilePathOnDevice JPG (320X240), width = 50, height = 50  ( without Callback)" , function() {
		runs(function() {
			setObjective("VTXXX-0211 | storeImage method  printerDriveAndFileName without print drive FILE.GRF, imageFilePathOnDevice JPG (320X240), width = 50, height = 50  ( without Callback)");
			setInstruction("1. Connect a Zebra printer with the device <br /> 2. Call storeImage with callback.");
			setExpected("1.  On successful storing image should return with STATUS_SUCCESS.<br />2.  File should be stored at  E:FILE.GRF on printer <br />3. On failure storing image should return with STATUS_ERROR ");
		});
		
		
		runs(function() {
				PrinterConnectiontype();
			});
		
		runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			connect_status = PrinterInstance.connect();
			waitsFor(function()	{
				return PrinterInstance.isConnected;
			}, '9sec wait for connection', ENABLE9K);
			
			if (PrinterInstance.isConnected) {
				PrinterInstance.storeImage(printerOnlyFileName, jpgimagepath_320px, 50, 50);
			}
			else {
				displayResult("Failed to connect to the printer", connect_status);	
			}
		});
		
		runs(function() {
			if (PrinterInstance.isConnected) {
				PrinterInstance.disconnect();
			}
		});
		waitsFor(function() {
			return document.getElementById("actResult").innerHTML != "init";
		}, "Timed out waiting for tester to respond", ENABLE30MIN);
		runs(function() {
			expect("pass").toEqual(document.getElementById("actResult").innerHTML);
		});
	});		

	it("VTXXX-0212 | storeImage method with valid printerDriveAndFileName JPG (640X480), imageFilePathOnDevice, width = 50, height = 50  ( without Callback)" , function() {
		runs(function() {
			setObjective("VTXXX-0212 | storeImage method with valid printerDriveAndFileName JPG (640X480), imageFilePathOnDevice, width = 50, height = 50  ( without Callback)");
			setInstruction("1. Connect a Zebra printer with the device <br /> 2. Call storeImage with callback.");
			setExpected("1.  On successful storing image should return with STATUS_SUCCESS.<br />2.  File should be stored at  D:FILE.GRF on printer <br />3. On failure storing image should return with STATUS_ERROR ");
		});
		
		
		runs(function() {
				PrinterConnectiontype();
			});
		
		runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			connect_status = PrinterInstance.connect();
			waitsFor(function()	{
				return PrinterInstance.isConnected;
			}, '9sec wait for connection', ENABLE9K);
			
			if (PrinterInstance.isConnected) {
				PrinterInstance.storeImage(printerDriveAndFileName, jpgimagepath_640px, 50, 50);
			}
			else {
				displayResult("Failed to connect to the printer", connect_status);	
			}
		});
		
		runs(function() {
			if (PrinterInstance.isConnected) {
				PrinterInstance.disconnect();
			}
		});
		waitsFor(function() {
			return document.getElementById("actResult").innerHTML != "init";
		}, "Timed out waiting for tester to respond", ENABLE30MIN);
		runs(function() {
			expect("pass").toEqual(document.getElementById("actResult").innerHTML);
		});
	});	

	it("VTXXX-0213 | storeImage method with valid printerDriveAndFileName JPG (1024X768) , imageFilePathOnDevice, width = 150, height = 150  ( without Callback)" , function() {
		runs(function() {
			setObjective("VTXXX-0213 | storeImage method with valid printerDriveAndFileName JPG (1024X768) , imageFilePathOnDevice, width = 150, height = 150  ( without Callback)");
			setInstruction("1. Connect a Zebra printer with the device <br /> 2. Call storeImage with callback.");
			setExpected("1.  On successful storing image should return with STATUS_SUCCESS.<br />2.  File should be stored at  D:FILE.GRF on printer <br />3. On failure storing image should return with STATUS_ERROR ");
		});
		
		
		runs(function() {
				PrinterConnectiontype();
			});
		
		runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			connect_status = PrinterInstance.connect();
			waitsFor(function()	{
				return PrinterInstance.isConnected;
			}, '9sec wait for connection', ENABLE9K);
			
			if (PrinterInstance.isConnected) {
				PrinterInstance.storeImage(printerDriveAndFileName, jpgimagepath_1024px, 150, 150);
			}
			else {
				displayResult("Failed to connect to the printer", connect_status);	
			}
		});
		
		runs(function() {
			if (PrinterInstance.isConnected) {
				PrinterInstance.disconnect();
			}
		});
		waitsFor(function() {
			return document.getElementById("actResult").innerHTML != "init";
		}, "Timed out waiting for tester to respond", ENABLE30MIN);
		runs(function() {
			expect("pass").toEqual(document.getElementById("actResult").innerHTML);
		});
	});		
	
	it("VTXXX-0214 | storeImage method with valid printerDriveAndFileName JPG (2048X1536), imageFilePathOnDevice, width = -1, height = -1 ( without Callback)" , function() {
		runs(function() {
			setObjective("VTXXX-0214 | storeImage method with valid printerDriveAndFileName JPG (2048X1536), imageFilePathOnDevice, width = -1, height = -1 ( without Callback)");
			setInstruction("1. Connect a Zebra printer with the device <br /> 2. Call storeImage with callback.");
			setExpected("1.  On successful storing image should return with STATUS_SUCCESS.<br />2.  File should be stored at  D:FILE.GRF on printer <br />3. On failure storing image should return with STATUS_ERROR ");
		});
		
		
		runs(function() {
				PrinterConnectiontype();
			});
		
		runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			connect_status = PrinterInstance.connect();
			waitsFor(function()	{
				return PrinterInstance.isConnected;
			}, '9sec wait for connection', ENABLE9K);
			
			if (PrinterInstance.isConnected) {
				PrinterInstance.storeImage(printerDriveAndFileName, jpgimagepath_2048px, -1, -1);
			}
			else {
				displayResult("Failed to connect to the printer", connect_status);	
			}
		});
		
		runs(function() {
			if (PrinterInstance.isConnected) {
				PrinterInstance.disconnect();
			}
		});
		waitsFor(function() {
			return document.getElementById("actResult").innerHTML != "init";
		}, "Timed out waiting for tester to respond", ENABLE30MIN);
		runs(function() {
			expect("pass").toEqual(document.getElementById("actResult").innerHTML);
		});
	});	

	it("VTXXX-0215 | storeImage method  printerDriveAndFileName without print drive FILE.GRF, imageFilePathOnDevice PNG (320X240), width = 50, height = 50  ( without Callback)" , function() {
		runs(function() {
			setObjective("VTXXX-0215 | storeImage method  printerDriveAndFileName without print drive FILE.GRF, imageFilePathOnDevice PNG (320X240), width = 50, height = 50  ( without Callback)");
			setInstruction("1. Connect a Zebra printer with the device <br /> 2. Call storeImage with callback.");
			setExpected("1.  On successful storing image should return with STATUS_SUCCESS.<br />2.  File should be stored at  E:FILE.GRF on printer <br />3. On failure storing image should return with STATUS_ERROR ");
		});
		
		
		runs(function() {
				PrinterConnectiontype();
			});
		
		runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			connect_status = PrinterInstance.connect();
			waitsFor(function()	{
				return PrinterInstance.isConnected;
			}, '9sec wait for connection', ENABLE9K);
			
			if (PrinterInstance.isConnected) {
				PrinterInstance.storeImage(printerOnlyFileName, pngimagepath_320px, 50, 50);
			}
			else {
				displayResult("Failed to connect to the printer", connect_status);	
			}
		});
		
		runs(function() {
			if (PrinterInstance.isConnected) {
				PrinterInstance.disconnect();
			}
		});
		waitsFor(function() {
			return document.getElementById("actResult").innerHTML != "init";
		}, "Timed out waiting for tester to respond", ENABLE30MIN);
		runs(function() {
			expect("pass").toEqual(document.getElementById("actResult").innerHTML);
		});
	});		

	it("VTXXX-0216 | storeImage method with valid printerDriveAndFileName PNG (640X480), imageFilePathOnDevice, width = 50, height = 50  ( without Callback)" , function() {
		runs(function() {
			setObjective("VTXXX-0216 | storeImage method with valid printerDriveAndFileName PNG (640X480), imageFilePathOnDevice, width = 50, height = 50  ( without Callback)");
			setInstruction("1. Connect a Zebra printer with the device <br /> 2. Call storeImage with callback.");
			setExpected("1.  On successful storing image should return with STATUS_SUCCESS.<br />2.  File should be stored at  D:FILE.GRF on printer <br />3. On failure storing image should return with STATUS_ERROR ");
		});
		
		
		runs(function() {
				PrinterConnectiontype();
			});
		
		runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			connect_status = PrinterInstance.connect();
			waitsFor(function()	{
				return PrinterInstance.isConnected;
			}, '9sec wait for connection', ENABLE9K);
			
			if (PrinterInstance.isConnected) {
				PrinterInstance.storeImage(printerDriveAndFileName, pngimagepath_640px, 50, 50);
			}
			else {
				displayResult("Failed to connect to the printer", connect_status);	
			}
		});
		
		runs(function() {
			if (PrinterInstance.isConnected) {
				PrinterInstance.disconnect();
			}
		});
		waitsFor(function() {
			return document.getElementById("actResult").innerHTML != "init";
		}, "Timed out waiting for tester to respond", ENABLE30MIN);
		runs(function() {
			expect("pass").toEqual(document.getElementById("actResult").innerHTML);
		});
	});	

	it("VTXXX-0217 | storeImage method with valid printerDriveAndFileName PNG (1024X768) , imageFilePathOnDevice, width = 150, height = 150  ( without Callback)" , function() {
		runs(function() {
			setObjective("VTXXX-0217 | storeImage method with valid printerDriveAndFileName PNG (1024X768) , imageFilePathOnDevice, width = 150, height = 150  ( without Callback)");
			setInstruction("1. Connect a Zebra printer with the device <br /> 2. Call storeImage with callback.");
			setExpected("1.  On successful storing image should return with STATUS_SUCCESS.<br />2.  File should be stored at  D:FILE.GRF on printer <br />3. On failure storing image should return with STATUS_ERROR ");
		});
		
		
		runs(function() {
				PrinterConnectiontype();
			});
		
		runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			connect_status = PrinterInstance.connect();
			waitsFor(function()	{
				return PrinterInstance.isConnected;
			}, '9sec wait for connection', ENABLE9K);
			
			if (PrinterInstance.isConnected) {
				PrinterInstance.storeImage(printerDriveAndFileName, pngimagepath_1024px, 150, 150);
			}
			else {
				displayResult("Failed to connect to the printer", connect_status);	
			}
		});
		
		runs(function() {
			if (PrinterInstance.isConnected) {
				PrinterInstance.disconnect();
			}
		});
		waitsFor(function() {
			return document.getElementById("actResult").innerHTML != "init";
		}, "Timed out waiting for tester to respond", ENABLE30MIN);
		runs(function() {
			expect("pass").toEqual(document.getElementById("actResult").innerHTML);
		});
	});		
	
	it("VTXXX-0218 | storeImage method with valid printerDriveAndFileName PNG (2048X1536), imageFilePathOnDevice, width = -1, height = -1 ( without Callback)" , function() {
		runs(function() {
			setObjective("VTXXX-0218 | storeImage method with valid printerDriveAndFileName PNG (2048X1536), imageFilePathOnDevice, width = -1, height = -1 ( without Callback)");
			setInstruction("1. Connect a Zebra printer with the device <br /> 2. Call storeImage with callback.");
			setExpected("1.  On successful storing image should return with STATUS_SUCCESS.<br />2.  File should be stored at  D:FILE.GRF on printer <br />3. On failure storing image should return with STATUS_ERROR ");
		});
		
		
		runs(function() {
				PrinterConnectiontype();
			});
		
		runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			connect_status = PrinterInstance.connect();
			waitsFor(function()	{
				return PrinterInstance.isConnected;
			}, '9sec wait for connection', ENABLE9K);
			
			if (PrinterInstance.isConnected) {
				PrinterInstance.storeImage(printerDriveAndFileName, pngimagepath_2048px, -1, -1);
			}
			else {
				displayResult("Failed to connect to the printer", connect_status);	
			}
		});
		
		runs(function() {
			if (PrinterInstance.isConnected) {
				PrinterInstance.disconnect();
			}
		});
		waitsFor(function() {
			return document.getElementById("actResult").innerHTML != "init";
		}, "Timed out waiting for tester to respond", ENABLE30MIN);
		runs(function() {
			expect("pass").toEqual(document.getElementById("actResult").innerHTML);
		});
	});		

	it("VTXXX-0219 | storeImage method  printerDriveAndFileName without print drive FILE.GRF, imageFilePathOnDevice BMP (320X240), width = 50, height = 50  ( with Anonymous Callback)" , function() {
		runs(function() {
			setObjective("VTXXX-0219 | storeImage method  printerDriveAndFileName without print drive FILE.GRF, imageFilePathOnDevice BMP (320X240), width = 50, height = 50  ( with Anonymous Callback)");
			setInstruction("1. Connect a Zebra printer with the device <br /> 2. Call storeImage with Anonymous Callback.");
			setExpected("1.  On successful storing image callback should return with STATUS_SUCCESS.<br />2.  File should be stored at  E:FILE.GRF on printer <br />3. On failure storing image callback should return with STATUS_ERROR ");
		});
		
		
		runs(function() {
				PrinterConnectiontype();
			});
		
		runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			connect_status = PrinterInstance.connect();
			waitsFor(function()	{
				return PrinterInstance.isConnected;
			}, '9sec wait for connection', ENABLE9K);
			
			if (PrinterInstance.isConnected) {
				PrinterInstance.storeImage(printerOnlyFileName, bmpimagepath_320px, 50, 50, function(data){storeImageCallback(data)});
			}
			else {
				displayResult("Failed to connect to the printer", connect_status);	
			}
		});
		
		runs(function() {
			if (PrinterInstance.isConnected) {
				PrinterInstance.disconnect();
			}
		});
		waitsFor(function() {
			return document.getElementById("actResult").innerHTML != "init";
		}, "Timed out waiting for tester to respond", ENABLE30MIN);
		runs(function() {
			expect("pass").toEqual(document.getElementById("actResult").innerHTML);
		});
	});		

	it("VTXXX-0220 | storeImage method with valid printerDriveAndFileName GIF (640X480), imageFilePathOnDevice, width = 50, height = 50  ( with Anonymous Callback)" , function() {
		runs(function() {
			setObjective("VTXXX-0220 | storeImage method with valid printerDriveAndFileName GIF (640X480), imageFilePathOnDevice, width = 50, height = 50  ( with Anonymous Callback)");
			setInstruction("1. Connect a Zebra printer with the device <br /> 2. Call storeImage with Anonymous Callback.");
			setExpected("1.  On successful storing image callback should return with STATUS_SUCCESS.<br />2.  File should be stored at  D:FILE.GRF on printer <br />3. On failure storing image callback should return with STATUS_ERROR ");
		});
		
		
		runs(function() {
				PrinterConnectiontype();
			});
		
		runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			connect_status = PrinterInstance.connect();
			waitsFor(function()	{
				return PrinterInstance.isConnected;
			}, '9sec wait for connection', ENABLE9K);
			
			if (PrinterInstance.isConnected) {
				PrinterInstance.storeImage(printerDriveAndFileName, gifimagepath_640px, 50, 50,function(data){storeImageCallback(data)});
			}
			else {
				displayResult("Failed to connect to the printer", connect_status);	
			}
		});
		
		runs(function() {
			if (PrinterInstance.isConnected) {
				PrinterInstance.disconnect();
			}
		});
		waitsFor(function() {
			return document.getElementById("actResult").innerHTML != "init";
		}, "Timed out waiting for tester to respond", ENABLE30MIN);
		runs(function() {
			expect("pass").toEqual(document.getElementById("actResult").innerHTML);
		});
	});	

	it("VTXXX-0221 | storeImage method with valid printerDriveAndFileName JPG (1024X768) , imageFilePathOnDevice, width = 150, height = 150  ( with Anonymous Callback)" , function() {
		runs(function() {
			setObjective("VTXXX-0221 | storeImage method with valid printerDriveAndFileName JPG (1024X768) , imageFilePathOnDevice, width = 150, height = 150  ( with Anonymous Callback)");
			setInstruction("1. Connect a Zebra printer with the device <br /> 2. Call storeImage with Anonymous Callback.");
			setExpected("1.  On successful storing image callback should return with STATUS_SUCCESS.<br />2.  File should be stored at  D:FILE.GRF on printer <br />3. On failure storing image callback should return with STATUS_ERROR ");
		});
		
		
		runs(function() {
				PrinterConnectiontype();
			});
		
		runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			connect_status = PrinterInstance.connect();
			waitsFor(function()	{
				return PrinterInstance.isConnected;
			}, '9sec wait for connection', ENABLE9K);
			
			if (PrinterInstance.isConnected) {
				PrinterInstance.storeImage(printerDriveAndFileName, jpgimagepath_1024px, 150, 150);
			}
			else {
				displayResult("Failed to connect to the printer", connect_status,function(data){storeImageCallback(data)});	
			}
		});
		
		runs(function() {
			if (PrinterInstance.isConnected) {
				PrinterInstance.disconnect();
			}
		});
		waitsFor(function() {
			return document.getElementById("actResult").innerHTML != "init";
		}, "Timed out waiting for tester to respond", ENABLE30MIN);
		runs(function() {
			expect("pass").toEqual(document.getElementById("actResult").innerHTML);
		});
	});		
	
	it("VTXXX-0222 | storeImage method with valid printerDriveAndFileName PNG (2048X1536), imageFilePathOnDevice, width = -1, height = -1 ( with Anonymous Callback)" , function() {
		runs(function() {
			setObjective("VTXXX-0222 | storeImage method with valid printerDriveAndFileName PNG (2048X1536), imageFilePathOnDevice, width = -1, height = -1 ( with Anonymous Callback)");
			setInstruction("1. Connect a Zebra printer with the device <br /> 2. Call storeImage with Anonymous Callback.");
			setExpected("1.  On successful storing image callback should return with STATUS_SUCCESS.<br />2.  File should be stored at  D:FILE.GRF on printer <br />3. On failure storing image callback should return with STATUS_ERROR ");
		});
		
		
		runs(function() {
				PrinterConnectiontype();
			});
		
		runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			connect_status = PrinterInstance.connect();
			waitsFor(function()	{
				return PrinterInstance.isConnected;
			}, '9sec wait for connection', ENABLE9K);
			
			if (PrinterInstance.isConnected) {
				PrinterInstance.storeImage(printerDriveAndFileName, pngimagepath_2048px, -1, -1,function(data){storeImageCallback(data)});
			}
			else {
				displayResult("Failed to connect to the printer", connect_status);	
			}
		});
		
		runs(function() {
			if (PrinterInstance.isConnected) {
				PrinterInstance.disconnect();
			}
		});
		waitsFor(function() {
			return document.getElementById("actResult").innerHTML != "init";
		}, "Timed out waiting for tester to respond", ENABLE30MIN);
		runs(function() {
			expect("pass").toEqual(document.getElementById("actResult").innerHTML);
		});
	});		
});
