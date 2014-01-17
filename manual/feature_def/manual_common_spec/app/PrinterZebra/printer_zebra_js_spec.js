describe("Printer Zebra Manual Test", function() {
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
	var CommandZPL = "^XA^FO50,50^ADN,36,20^FDZebraPrinting^FS^XZ"; 
	var CommandCCPL = "! 0.3937 200 200 1 1IN-INCHEST 4 0 0 0 1 cm = 0.3937”IN-DOTST 4 0 0 48 1 mm = 8 dotsB 128 1 1 48 16 112 UNITST40 48 160 UNITSFORMPRINT";
	var connect_status = '';
	var existingPritingObject = null;

	window.onerror = function(message, source, lineno) {
        alert("Error:"+message +"\n" + "file:" + source + "\n" + "line:" + lineno);
    };

	$( window ).load(
		function() {
			var conn_types = [Rho.PrinterZebra.CONNECTION_TYPE_BLUETOOTH, Rho.PrinterZebra.CONNECTION_TYPE_ON_BOARD, Rho.PrinterZebra.CONNECTION_TYPE_TCP ];
			for(var i = conn_types.length - 1; i >= 0; i--) {

				$('#dev_conn_type')
					.append($('<option>', { value : conn_types[i] })
					.text(conn_types[i].replace("CONNECTION_TYPE_",""))); 
			}
		});

	function setupDiscoverPrintersCallback(callbackValue) {
		$('#myList').append("<li>"+JSON.stringify(callbackValue," ")+"<li>");
		if (callbackValue.status == Rho.PrinterZebra.PRINTER_STATUS_SUCCESS && callbackValue.printerID && callbackValue.printerID.length > 0) {
			printerInstance = Rho.PrinterZebra.getPrinterByID(callbackValue.printerID);

			var printerType = printerInstance.printerType.replace("PRINTER_TYPE_","");
			var connType = printerInstance.connectionType.replace("CONNECTION_TYPE_","");
			var devName = printerType + "-" + connType + "@" + printerInstance.deviceAddress;
			var pid = printerInstance.connectionType + "|" + printerInstance.deviceAddress + "|" + printerInstance.devicePort;

			$('#dev_list')
				.append($('<option>', { value : pid })
				.text(devName)); 
		} 
		else if (callbackValue.status == Rho.PrinterZebra.PRINTER_STATUS_SUCCESS) {
			discovery_finished = true;

			$("#dev_list").val($("#dev_list option:eq(1)").val()).trigger('change');
		} 
		else if (callbackValue.message == Rho.PrinterZebra.PRINTER_STATUS_ERROR) {
			printers_errors.push(callbackValue)
		}
	}

	function searchPrinterCallback(callbackValue) {
		if (callbackValue.status == Rho.PrinterZebra.PRINTER_STATUS_SUCCESS && callbackValue.printerID && callbackValue.printerID.length > 0) {
			printers_array.push(callbackValue);
		} 
		else if (callbackValue.status == Rho.PrinterZebra.PRINTER_STATUS_SUCCESS) {
			discovery_finished = true;
		} 
		else if (callbackValue.message == Rho.PrinterZebra.PRINTER_STATUS_ERROR) {
			printers_errors.push(callbackValue)
		}
	}

	beforeEach(function() {
		document.getElementById("actResult").innerHTML = "init";
		discovery_finished = false;
		connectFlag = false;
		stopsearch ='';
		deviceaddressFlag = false;
		retrievedFlag = false;
		connect_status = '';
		$('#myList').empty();
	});

	afterEach(function() {

	});

	it("VTXXX-Setup | Please power up printer and make sure it is connected.", function() {
		runs(function() {
			setObjective(jasmine.getEnv().currentSpec.description);
			setInstruction("Wait until devices are discovered to continue");
			setExpected("Press any button to continute");
			debug.error("ABC!");
			$('#dev_list').empty();
			$("#dev_list").prepend("<option value=''>none</option>").val('');
			$('#dev_list').change(function () {
				var valueSelected = $(this).val();
				if (valueSelected=='') {
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
			Rho.PrinterZebra.searchPrinters({}, setupDiscoverPrintersCallback);
		});
		
		waitsFor(function() {
			return discovery_finished;
		}, '10sec waiting for Search printer', ENABLE10K);

		runs(function() {
			setAction("Just press any button");
			waitsFor(function() {
				return document.getElementById("actResult").innerHTML != "init";
			}, "Timed out waiting for tester to respond", ENABLE30MIN);
			runs(function() {
				expect("pass").toEqual("pass");
			});
		});
	});

	// EnumerateSupportedTypes Method
	
	it("VTXXX-0001 | EnumerateSupportedTypes Method (without callback function)", function() {
		runs(function() {
			setObjective(jasmine.getEnv().currentSpec.description);
			setInstruction("");
			setExpected("Method should return the result as names/list of printer types that are supported in this build.");
		});
		runs(function() {
			var printerTypes = Rho.PrinterZebra.enumerateSupportedTypes();
			
			displayResult("Result:", JSON.stringify(printerTypes, 2));
		});

		runs(function() {
			setAction("Do you see the names/list of printer types that are supported ?");
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
			setObjective(jasmine.getEnv().currentSpec.description); 
			setInstruction(""); 
			setExpected("Method should return the result as names/list of printer types that are supported in this build.");
		});

		runs(function() {
			Rho.PrinterZebra.enumerateSupportedTypes(enumerateCallback);
		});
		
		runs(function() {
			setAction("Do you see the names/list of printer types that are supported ?");
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
			setObjective(jasmine.getEnv().currentSpec.description); 
			setInstruction(""); 
			setExpected("Method should return the result as names/list of printer types that are supported in this build.");
		});

		runs(function() {
			Rho.PrinterZebra.enumerateSupportedTypes(function(data) {
				enumerateCallback(data);
			});
		});

		runs(function() {
			setAction("Do you see the names/list of printer types that are supported ?");
			waitsFor(function() {
				return document.getElementById("actResult").innerHTML != "init";
			}, "Timed out waiting for tester to respond", ENABLE30MIN);
			runs(function() {
				expect("pass").toEqual(document.getElementById("actResult").innerHTML);
			});
		});
	});

	
	//searchPrinters Method
	
	it("VTXXX-0004|searchPrinters Method(default options)", function() {
		printers_array = [];
		printers_errors = [];
		runs(function() {
			setObjective(jasmine.getEnv().currentSpec.description); 
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
		}, '10sec waiting for Search printer', ENABLE10K);

		runs(function() {
			displaySearchResults(printers_array, printers_errors);
		}); 
			
		runs(function() {
			setAction("All connected Printers are discovered ?");
			waitsFor(function() {
				return document.getElementById("actResult").innerHTML != "init";
			}, "Timed out waiting for tester to respond", ENABLE30MIN);
			runs(function() {
				expect("pass").toEqual(document.getElementById("actResult").innerHTML);
			});
		});
	});



	it("VTXXX-0005|searchPrinters Method(with options 'printerType' and 'connectionType')", function() {
		printers_array = [];
		printers_errors = [];
		runs(function() {
			setObjective(jasmine.getEnv().currentSpec.description); 
			setInstruction("Connect the Zebra printer device using (bluetooth/tcp/usb). Call searchPrinters"); 
			setExpected("The printer connected with the device using bluetooth should be discovered successfully and return STATUS_SUCCESS.");
		}); 
		
		runs(function() {
			PrinterConnectiontype();
		}); 

		runs(function() {
			Rho.PrinterZebra.searchPrinters({
				"printerType": Rho.Printer.PRINTER_TYPE_ZEBRA,
				"connectionType": $('#dev_conn_type').val()
			}, searchPrinterCallback);
		});
		
		waitsFor(function() {
				return discovery_finished;
		}, '120sec waiting for Search printer', ENABLE120K);

		runs(function() {
			displaySearchResults(printers_array, printers_errors);
		}); 
		
		runs(function() {
			setAction("All connected Zebra Printers are discovered ?");
			waitsFor(function() {
				return document.getElementById("actResult").innerHTML != "init";
			}, "Timed out waiting for tester to respond", ENABLE30MIN);
			runs(function() {
				expect("pass").toEqual(document.getElementById("actResult").innerHTML);
			});
		});
	});

	it("VTXXX-0006|searchPrinters Method(with options 'printerType', 'connectionType', 'timeout')", function() {
		printers_array = [];
		printers_errors = [];
		runs(function() {
			setObjective(jasmine.getEnv().currentSpec.description); setInstruction("Connect the Zebra printer device using (bluetooth/tcp/usb). Call searchPrinters"); 
			setExpected("The printer connected with the device using bluetooth should be discovered successfully and return STATUS_SUCCESS.");
		}); 
		
		runs(function() {
			PrinterConnectiontype();
		}); 

		runs(function() {
			Rho.PrinterZebra.searchPrinters({
				"printerType": Rho.Printer.PRINTER_TYPE_ZEBRA,
				"connectionType": $('#dev_conn_type').val(),
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
			setAction("All connected Zebra Printers are discovered ?");
			waitsFor(function() {
				return document.getElementById("actResult").innerHTML != "init";
			}, "Timed out waiting for tester to respond", ENABLE30MIN);
			runs(function() {
				expect("pass").toEqual(document.getElementById("actResult").innerHTML);
			});
		});
	});

	it("VTXXX-0007|searchPrinters Method(with only option 'timeout')", function() {
		printers_array = [];
		printers_errors = [];
		runs(function() {
			setObjective(jasmine.getEnv().currentSpec.description); 
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
			setAction("All connected Printers are discovered ?");
			waitsFor(function() {
				return document.getElementById("actResult").innerHTML != "init";
			}, "Timed out waiting for tester to respond", ENABLE30MIN);
			runs(function() {
				expect("pass").toEqual(document.getElementById("actResult").innerHTML);
			});
		});
	});
	
	it("VTXXX-0008|searchPrinters Method(with only option 'deviceAddress')", function() {
		printers_array = [];
		printers_errors = [];
		runs(function() {
			setObjective(jasmine.getEnv().currentSpec.description); 
			setInstruction("Connect the Zebra printer device using (bluetooth/tcp/usb). Call searchPrinters"); 
			setExpected("The printer connected with the device using bluetooth should be discovered successfully and return STATUS_SUCCESS.");
		}); 
		
		runs(function() {
			PrinterConnectiontype();
		}); 
			
		runs(function() {
			macipaddress = $('#dev_addr').val();
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
			setAction("All connected Printers are discovered ?");
			waitsFor(function() {
				return document.getElementById("actResult").innerHTML != "init";
			}, "Timed out waiting for tester to respond", ENABLE30MIN);
			runs(function() {
				expect("pass").toEqual(document.getElementById("actResult").innerHTML);
			});
		});
	});	
	
	it("VTXXX-0009|searchPrinters Method(with options 'printerType', 'connectionType', 'timeout' and 'deviceAddress')", function() {
		printers_array = [];
		printers_errors = [];
		runs(function() {
			setObjective(jasmine.getEnv().currentSpec.description); setInstruction("Connect the Zebra printer device using (bluetooth/tcp/usb). Call searchPrinters"); 
			setExpected("The printer connected with the device using bluetooth should be discovered successfully and return STATUS_SUCCESS.");
		}); 
		runs(function() {
			PrinterConnectiontype();
		}); 
			
		runs(function() {
			macipaddress = $('#dev_addr').val();
			document.getElementById("deviceAddress").innerHTML = "Device Address:" +macipaddress;
			setTimeout(function() {
				deviceaddressFlag = true;
			}, ENABLE9K);
		}); 
		waitsFor(function() {
			return deviceaddressFlag;
		}, '10sec wait to get connection type', ENABLE10K);

		runs(function() {
			Rho.PrinterZebra.searchPrinters({"printerType":Rho.Printer.PRINTER_TYPE_ZEBRA, "connectionType":$('#dev_conn_type').val(), "timeout":15000, "deviceAddress":macipaddress}, searchPrinterCallback);
		});
		waitsFor(function() {
			return discovery_finished;
		}, '120sec waiting for Search printer', ENABLE120K);

		runs(function() {
			displaySearchResults(printers_array, printers_errors);
		}); 
		
		runs(function() {
			setAction("All connected Zebra Printers are discovered ?");
			waitsFor(function() {
				return document.getElementById("actResult").innerHTML != "init";
			}, "Timed out waiting for tester to respond", ENABLE30MIN);
			runs(function() {
				expect("pass").toEqual(document.getElementById("actResult").innerHTML);
			});
		});
	});	
	
	it("VTXXX-0010|searchPrinters Method for non-zebra printer(with options 'printerType' and 'connectionType')", function() {
		printers_array = [];
		printers_errors = [];
		runs(function() {
			setObjective(jasmine.getEnv().currentSpec.description); 
			setInstruction("Connect a printer other than zebra printer with the device"); 
			setExpected(" The printer should not be discovered with these settings and return error message for STATUS_ERROR.");
		}); 

		runs(function() {
			Rho.PrinterZebra.searchPrinters({"printerType":Rho.Printer.PRINTER_TYPE_ZEBRA, "connectionType":Rho.PrinterZebra.CONNECTION_TYPE_TCP}, searchPrinterCallback);
		});
		waitsFor(function() {
				return discovery_finished;
		}, '120sec waiting for Search printer', ENABLE120K);

		runs(function() {
			displaySearchResults(printers_array, printers_errors);
		}); 
		
		runs(function() {
			setAction("Have you seen the STATUS_ERROR message ?");
			waitsFor(function() {
				return document.getElementById("actResult").innerHTML != "init";
			}, "Timed out waiting for tester to respond", ENABLE30MIN);
			runs(function() {
				expect("pass").toEqual(document.getElementById("actResult").innerHTML);
			});
		});
	});	

	it("VTXXX-0011|searchPrinters Method(with only option 'devicePort':80)", function() {
		printers_array = [];
		printers_errors = [];
		runs(function() {
			setObjective(jasmine.getEnv().currentSpec.description); 
			setInstruction(""); 
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
			setAction("Have you seen the STATUS_ERROR message ?");
			waitsFor(function() {
				return document.getElementById("actResult").innerHTML != "init";
			}, "Timed out waiting for tester to respond", ENABLE30MIN);
			runs(function() {
				expect("pass").toEqual(document.getElementById("actResult").innerHTML);
			});
		});
	});	
	
	
	// stopSearch Method
	
	it("VTXXX-0012|stopSearch Method (without callback function)", function() {
		printers_array = [];
		printers_errors = [];
		runs(function() {
			setObjective(jasmine.getEnv().currentSpec.description); 
			setInstruction(""); 
			setExpected("The search should be terminated and printer should not be discovered.");
		}); 

		runs(function() {
			PrinterConnectiontype();
		}); 
			
		runs(function() {
			Rho.PrinterZebra.searchPrinters({"printerType":Rho.Printer.PRINTER_TYPE_ZEBRA, "connectionType":$('#dev_conn_type').val()}, searchPrinterCallback);
			stopsearch = Rho.PrinterZebra.stopSearch();
		});

		runs(function() {
			displaySearchResults(printers_array, printers_errors);
			displayResult("Result:", stopsearch.toString());
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
		printers_array = [];
		printers_errors = [];
		runs(function() {
			setObjective(jasmine.getEnv().currentSpec.description); 
			setInstruction(""); 
			setExpected("The search should be terminated and printer should not be discovered. Callback function should return STATUS_SUCCESS");
		}); 

		runs(function() {
			PrinterConnectiontype();
		}); 
			
		runs(function() {
			Rho.PrinterZebra.searchPrinters({"printerType":Rho.Printer.PRINTER_TYPE_ZEBRA, "connectionType":$('#dev_conn_type').val()}, searchPrinterCallback);        
			Rho.PrinterZebra.stopSearch(handleStatusCallback);
		});

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

	it("VTXXX-0014|stopSearch Method (with anonymous function)", function() {
		printers_array = [];
		printers_errors = [];
		runs(function() {
			setObjective(jasmine.getEnv().currentSpec.description); 
			setInstruction(""); 
			setExpected("The search should be terminated and printer should not be discovered. Anonymous function should return STATUS_SUCCESS");
		}); 

		runs(function() {
			PrinterConnectiontype();
		}); 
			
		runs(function() {
			Rho.PrinterZebra.searchPrinters({"printerType":Rho.Printer.PRINTER_TYPE_ZEBRA, "connectionType":$('#dev_conn_type').val()}, searchPrinterCallback);        
			Rho.PrinterZebra.stopSearch(function(data){handleStatusCallback(data)});
		});

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
	
	
	//getPrinterByID Method 
	
	it("VTXXX-0015|getPrinterByID Method ", function() {
		printers_array = [];
		printers_errors = [];
		runs(function() {
			setObjective(jasmine.getEnv().currentSpec.description); 
			setInstruction(""); 
			setExpected("The method should return an instance of the connected Rho.Printer.");
		}); 

		runs(function() {
			PrinterConnectiontype();
		}); 
			
		runs(function() {
			Rho.PrinterZebra.searchPrinters({"printerType":Rho.Printer.PRINTER_TYPE_ZEBRA, "connectionType":$('#dev_conn_type').val()}, searchPrinterCallback);
		});
		
		waitsFor(function() {
			return discovery_finished;
		}, '120sec waiting for Search printer', ENABLE120K);
		
		runs(function() {
			displaySearchResults(printers_array, printers_errors);
		
		}); 
		runs(function () {
			var printer = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			Rho.Printer.connect();
			if (Rho.Printer.isConnected || Rho.Printer.isReadyToPrint) {
				displayResult("Printer Instance returned successfully.", Rho.Printer.status);
				Rho.Printer.disconnect();
			}
			else {
				displayResult("Printer instance not returned", Rho.Printer.message);
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
	
	it("VTXXX-0016|getPrinterByID Method without discovering the Rho.Printer. ", function() {
		printers_array = [];
		printers_errors = [];
		runs(function() {
			setObjective(jasmine.getEnv().currentSpec.description); 
			setInstruction("Printer should not be available for discovery, should be turned off"); 
			setExpected("STATUS_ERROR should be returned with error message.");
		}); 

		runs(function () {
			var printer = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			Rho.Printer.connect();
			if (Rho.Printer.isConnected || Rho.Printer.isReadyToPrint) {
				displayResult("Printer Instance returned successfully.", Rho.Printer.status);
				Rho.Printer.disconnect();
			}
			else {
				displayResult("Printer instance not returned", Rho.Printer.message);
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
		printers_array = [];
		printers_errors = [];
		runs(function() {
			setObjective(jasmine.getEnv().currentSpec.description); 
			setInstruction("Please turn of the printer in 5 min"); 
			setExpected("The method should not return any instance of the disconnected Rho.Printer. But STATUS_ERROR should be returned with error message.");
		}); 

		waitsFor(function() {
		}, '5 min wait to tunrn off device', ENABLE5MIN);	

		runs(function() {
			PrinterConnectiontype();
		}); 
			
		runs(function() {
			Rho.PrinterZebra.searchPrinters({"printerType":Rho.Printer.PRINTER_TYPE_ZEBRA, "connectionType":$('#dev_conn_type').val()}, searchPrinterCallback);
		});
		
		waitsFor(function() {
			return discovery_finished;
		}, '120sec waiting for Search printer', ENABLE120K);
	
		runs(function() {
			displaySearchResults(printers_array, printers_errors);
		}); 

		runs(function () {
			var printer = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			Rho.Printer.connect();
			if (Rho.Printer.isConnected || Rho.Printer.isReadyToPrint) {
				displayResult("Printer Instance returned successfully.", Rho.Printer.status);
				Rho.Printer.disconnect();
			}
			else {
				displayResult("Printer instance not returned", Rho.Printer.message);
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
	
	// connect Method 
	it("VTXXX-0018|connect Method (without callback function) ", function() {
		printers_array = [];
		printers_errors = [];
		runs(function() {
			setObjective(jasmine.getEnv().currentSpec.description); 
			setInstruction(""); 
			setExpected("1.The method should execute without errors. <br /> 2. The string should be printed successfully on the Rho.Printer.");
		}); 
		runs(function() {
			PrinterConnectiontype();
		}); 
			
		runs(function() {
			Rho.PrinterZebra.searchPrinters({"printerType":Rho.Printer.PRINTER_TYPE_ZEBRA, "connectionType":$('#dev_conn_type').val()}, searchPrinterCallback);
		});
		
		waitsFor(function() {
			return discovery_finished;
		}, '120sec waiting for Search printer', ENABLE120K);
	
		runs(function() {
			displaySearchResults(printers_array, printers_errors);
		}); 

		runs(function () {
			var printer = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			Rho.Printer.connect();
			if (Rho.Printer.isConnected || Rho.Printer.isReadyToPrint) {
				Rho.Printer.printRawString(CommandZPL);
                Rho.Printer.disconnect();
			}
			else {
				displayResult("Printer instance not returned", Rho.Printer.message);
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
			setObjective(jasmine.getEnv().currentSpec.description); 
			setInstruction(""); 
			setExpected("1.The method should execute without errors. <br />2. The callback should return STATUS_OK");
		}); 

		runs(function() {
			PrinterConnectiontype();
		}); 
			

		runs(function () {
			var printer = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			Rho.Printer.connect(connectCallback);
		      if (Rho.Printer.isConnected || Rho.Printer.isReadyToPrint) {
					Rho.Printer.disconnect();
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
			setObjective(jasmine.getEnv().currentSpec.description); 
			setInstruction(""); 
			setExpected("1.The method should execute without errors. <br />2. The anonymous function should return STATUS_OK");
		}); 

		runs(function() {
			PrinterConnectiontype();
		}); 
			


		runs(function () {
			var printer = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			Rho.Printer.connect(function (data){connectCallback(data)});
		       if (Rho.Printer.isConnected || Rho.Printer.isReadyToPrint) {
					Rho.Printer.disconnect();
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
			setObjective(jasmine.getEnv().currentSpec.description); 
			setInstruction(""); 
			setExpected("1.The method should execute without errors. <br />2. The Rho.Printer.isConnected should return STATUS_OK");
		}); 

		runs(function() {
			PrinterConnectiontype();
		}); 
			
		/*runs(function() {
			Rho.PrinterZebra.searchPrinters({"printerType":Rho.Printer.PRINTER_TYPE_ZEBRA, "connectionType":$('#dev_conn_type').val()}, searchPrinterCallback);
		});
			
		waitsFor(function() {
			return discovery_finished;
		}, '120sec waiting for Search printer', ENABLE120K);
		
		runs(function() {
			displaySearchResults(printers_array, printers_errors);
		}); */

		runs(function () {
			var printer = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			Rho.Printer.connect({"timeout":20000}, connectCallback);
		       if (Rho.Printer.isConnected == Rho.Printer.STATUS_OK|| Rho.Printer.isReadyToPrint == Rho.Printer.STATUS_OK) {
					displayResult("Result: ", Rho.Printer.isConnected);
					Rho.Printer.disconnect();
				}
				else {
					displayResult("Result: ", Rho.Printer.isConnected);
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
			setObjective(jasmine.getEnv().currentSpec.description); 
			setInstruction(""); 
			setExpected("1.The connection should timeout and should not connect. <br />2. The Rho.Printer.isConnected should return STATUS_TIMEOUT");
		}); 

		runs(function() {
			PrinterConnectiontype();
		}); 
			
		/*runs(function() {
			Rho.PrinterZebra.searchPrinters({"printerType":Rho.Printer.PRINTER_TYPE_ZEBRA, "connectionType":$('#dev_conn_type').val()}, searchPrinterCallback);
		});
		
		waitsFor(function() {
			return discovery_finished;
		}, '120sec waiting for Search printer', ENABLE120K);
	
		runs(function() {
			displaySearchResults(printers_array, printers_errors);
		
		}); */

		runs(function () {
			var printer = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			Rho.Printer.connect({"timeout":0}, connectCallback);
			if (Rho.Printer.isConnected == Rho.Printer.STATUS_OK|| Rho.Printer.isReadyToPrint == Rho.Printer.STATUS_OK) {
				displayResult("Result: ", Rho.Printer.isConnected);
				Rho.Printer.disconnect();
			}
			else {
				displayResult("Result: ", Rho.Printer.isConnected);
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
			setObjective(jasmine.getEnv().currentSpec.description); 
			setInstruction(""); 
			setExpected("1.The connection should timeout and should not connect. <br />2. The Rho.Printer.isConnected should return STATUS_TIMEOUT");
		}); 
		
		runs(function() {
			PrinterConnectiontype();
		}); 
			
		/*runs(function() {
			Rho.PrinterZebra.searchPrinters({"printerType":Rho.Printer.PRINTER_TYPE_ZEBRA, "connectionType":$('#dev_conn_type').val()}, searchPrinterCallback);
		});
		
		waitsFor(function() {
			return discovery_finished;
		}, '120sec waiting for Search printer', ENABLE120K);
	
		runs(function() {
			displaySearchResults(printers_array, printers_errors);
		
		}); */

		runs(function () {
			var printer = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			Rho.Printer.connect({"timeout":1000}, connectCallback);
		       if (Rho.Printer.isConnected == Rho.Printer.STATUS_OK|| Rho.Printer.isReadyToPrint == Rho.Printer.STATUS_OK)
				{
					displayResult("Result: ", Rho.Printer.isConnected);
					Rho.Printer.disconnect();
				}
				else
				{
					displayResult("Result: ", Rho.Printer.isConnected);
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
			setObjective(jasmine.getEnv().currentSpec.description);
			setInstruction("");
			setExpected("The method should return STATUS_ERROR due to the param value passed as float.");
		});
		
		runs(function() {
			PrinterConnectiontype();
		}); 
		/*
		runs(function () {
			Rho.PrinterZebra.searchPrinters({
				"printerType": Rho.Printer.PRINTER_TYPE_ZEBRA,
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
			Rho.Printer.connect({
				"timeout": 15000.5
			}, connectCallback);
			if(Rho.Printer.isConnected == Rho.Printer.STATUS_OK || Rho.Printer.isReadyToPrint == Rho.Printer.STATUS_OK) {
				displayResult("Result: ", Rho.Printer.isConnected);
				Rho.Printer.disconnect();
			}
			else {
				displayResult("Result: ", Rho.Printer.isConnected);
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
			setObjective(jasmine.getEnv().currentSpec.description);
			setInstruction("Please turn off the printer in 2 min");
			setExpected("The Rho.Printer.isConnected should return STATUS_ERROR or STATUS_NOT_FOUND");
		});
		
		waitsFor(function () {}, '2 min wait turn off the printer', 120000);
		
		runs(function() {
			PrinterConnectiontype();
		}); 
		
		/*runs(function () {
			Rho.PrinterZebra.searchPrinters({
				"printerType": Rho.Printer.PRINTER_TYPE_ZEBRA,
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
			Rho.Printer.connect({
				"timeout": 20000
			}, connectCallback);
			if(Rho.Printer.isConnected == Rho.Printer.STATUS_OK || Rho.Printer.isReadyToPrint == Rho.Printer.STATUS_OK) {
				displayResult("Result: ", Rho.Printer.isConnected);
				Rho.Printer.disconnect();
			}
			else {
				displayResult("Result: ", Rho.Printer.isConnected);
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
	
	// disconnect Method 
	
	it("VTXXX-0030|disconnect Method (without callback function) ", function () {
		runs(function () {
			setObjective(jasmine.getEnv().currentSpec.description);
			setInstruction("");
			setExpected("The method should execute without errors.");
		});
		
		waitsFor(function () {}, '2 min wait to start priner', 120000);
		
		runs(function() {
			PrinterConnectiontype();
		}); 
		
		/*runs(function () {
			Rho.PrinterZebra.searchPrinters({
				"printerType": Rho.Printer.PRINTER_TYPE_ZEBRA,
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
			Rho.Printer.connect(connectCallback);
			if(Rho.Printer.isConnected == Rho.Printer.STATUS_OK || Rho.Printer.isReadyToPrint == Rho.Printer.STATUS_OK) {
				var diconnect_status = Rho.Printer.disconnect();
				if(diconnect_status == Rho.Printer.STATUS_SUCCESS)
					displayResult("Disconnected ", diconnect_status.toString());
				else if(diconnect_status == Rho.Printer.STATUS_ERROR)
					displayResult("Not Disconnected ", diconnect_status.toString());
				else	
					displayResult("Error ", diconnect_status.toString());
			}
			else {
				displayResult("Unable to Connect ", Rho.Printer.isConnected);
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
			setObjective(jasmine.getEnv().currentSpec.description);
			setInstruction("");
			setExpected("The callback should return STATUS_SUCCESS for successful update.");
		});
		runs(function() {
			PrinterConnectiontype();
		}); 
		/*runs(function () {
			Rho.PrinterZebra.searchPrinters({
				"printerType": Rho.Printer.PRINTER_TYPE_ZEBRA,
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
			Rho.Printer.connect(connectCallback);
			if(Rho.Printer.isConnected == Rho.Printer.STATUS_OK || Rho.Printer.isReadyToPrint == Rho.Printer.STATUS_OK) {
				Rho.Printer.disconnect(handleStatusCallback);
			}
			else {
				displayResult("Unable to Connect ", Rho.Printer.isConnected);
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
			setObjective(jasmine.getEnv().currentSpec.description);
			setInstruction("");
			setExpected("The callback should return STATUS_SUCCESS for successful update.");
		});
		runs(function() {
			PrinterConnectiontype();
		}); 
		/*runs(function () {
			Rho.PrinterZebra.searchPrinters({
				"printerType": Rho.Printer.PRINTER_TYPE_ZEBRA,
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
			Rho.Printer.connect(connectCallback);
			if(Rho.Printer.isConnected == Rho.Printer.STATUS_OK || Rho.Printer.isReadyToPrint == Rho.Printer.STATUS_OK) {
				Rho.Printer.disconnect(function (data) {
					handleStatusCallback(data)
				});
			}
			else {
				displayResult("Unable to Connect ", Rho.Printer.isConnected);
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
			setObjective(jasmine.getEnv().currentSpec.description);
			setInstruction("");
			setExpected("The string should not be printed on the Rho.Printer.");
		});
		runs(function() {
			PrinterConnectiontype();
		}); 
		/*runs(function () {
			Rho.PrinterZebra.searchPrinters({
				"printerType": Rho.Printer.PRINTER_TYPE_ZEBRA,
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
			Rho.Printer.connect(connectCallback);
			if(Rho.Printer.isConnected == Rho.Printer.STATUS_OK || Rho.Printer.isReadyToPrint == Rho.Printer.STATUS_OK) {
				Rho.Printer.disconnect();
				var print_str = Rho.Printer.printRawString(CommandZPL);
				waitsFor(function () {}, '10sec wait for print', ENABLE10K);
				displayResult("print attempt", print_str);
			}
			else {
				displayResult("Unable to Connect ", Rho.Printer.isConnected);
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
			setObjective(jasmine.getEnv().currentSpec.description);
			setInstruction("");
			setExpected("The method should execute without any error.");
		});
		runs(function() {
			PrinterConnectiontype();
		}); 
		/*runs(function () {
			Rho.PrinterZebra.searchPrinters({
				"printerType": Rho.Printer.PRINTER_TYPE_ZEBRA,
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
			var diconnect_status = Rho.Printer.disconnect();
			if(diconnect_status == Rho.PrinterZebra.STATUS_SUCCESS) {
				document.getElementById('actResult').innerHTML = diconnect_status.toString();
			}
			else if(diconnect_status == Rho.PrinterZebra.STATUS_ERROR) {
				document.getElementById('actResult').innerHTML = diconnect_status.toString();
			}
			else {
				document.getElementById('actResult').innerHTML = diconnect_status.toString();
			}
			Rho.Printer.connect(connectCallback);
			if(Rho.Printer.isConnected == Rho.Printer.STATUS_OK || Rho.Printer.isReadyToPrint == Rho.Printer.STATUS_OK) {
				var print_str = Rho.Printer.printRawString(CommandZPL);
				waitsFor(function () {}, '10sec wait for print', ENABLE10K);
				displayResult("print attempt", print_str);
				Rho.Printer.disconnect();
			}
			else {
				displayResult("Unable to Connect ", Rho.Printer.isConnected);
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
			setObjective(jasmine.getEnv().currentSpec.description);
			setInstruction("");
			setExpected("The callback function should return STATUS_ERROR.");
		});
		runs(function() {
			PrinterConnectiontype();
		}); 
		/*runs(function () {
			Rho.PrinterZebra.searchPrinters({
				"printerType": Rho.Printer.PRINTER_TYPE_ZEBRA,
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
			Rho.Printer.disconnect(handleStatusCallback);
			Rho.Printer.connect(connectCallback);
			if(Rho.Printer.isConnected == Rho.Printer.STATUS_OK || Rho.Printer.isReadyToPrint == Rho.Printer.STATUS_OK) {
				Rho.Printer.disconnect();
			}
			else {
				displayResult("Unable to Connect ", Rho.Printer.isConnected);
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
	
	// printFile Method 
	
	it("VTXXX-0036|printFile Method (without callback function jpg file)", function () {
		runs(function () {
			setObjective(jasmine.getEnv().currentSpec.description);
			setInstruction("");
			setExpected("The file should be sent successfully to the Rho.Printer.");
		});
		runs(function() {
			PrinterConnectiontype();
		}); 
		/*runs(function () {
			Rho.PrinterZebra.searchPrinters({
				"printerType": Rho.Printer.PRINTER_TYPE_ZEBRA,
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
			Rho.Printer.connect();
			if(Rho.Printer.isConnected == Rho.Printer.STATUS_OK || Rho.Printer.isReadyToPrint == Rho.Printer.STATUS_OK) {
				var print_str = Rho.Printer.printFile(jpgimagepath_640px);
				waitsFor(function () {
					return print_str;
				}, '10sec wait for print', ENABLE10K);
				displayResult("Printed ", print_str);
				Rho.Printer.disconnect();
			}
			else {
				displayResult("Unable to Connect ", Rho.Printer.isConnected);
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
	it("VTXXX-0037|printFile Method (with callback function jpg file))", function () {
		runs(function () {
			setObjective(jasmine.getEnv().currentSpec.description);
			setInstruction("");
			setExpected("The file should be sent successfully to the Rho.Printer.");
		});
		runs(function() {
			PrinterConnectiontype();
		}); 
		/*runs(function () {
			Rho.PrinterZebra.searchPrinters({
				"printerType": Rho.Printer.PRINTER_TYPE_ZEBRA,
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
			Rho.Printer.connect();
			if(Rho.Printer.isConnected == Rho.Printer.STATUS_OK || Rho.Printer.isReadyToPrint == Rho.Printer.STATUS_OK) {
				var print_str = Rho.Printer.printFile(jpgimagepath_640px, handleStatusCallback);
				waitsFor(function () {
					return print_str;
				}, '10sec wait for print', ENABLE10K);
				displayResult("Printed ", print_str);
				Rho.Printer.disconnect();
			}
			else {
				displayResult("Unable to Connect ", Rho.Printer.isConnected);
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
	
	it("VTXXX-0038|printFile Method (with anonymous function for jpg file)", function () {
		runs(function () {
			setObjective(jasmine.getEnv().currentSpec.description);
			setInstruction("");
			setExpected("The file should be sent successfully to the Rho.Printer.");
		});
		runs(function() {
			PrinterConnectiontype();
		}); 
		/*runs(function () {
			Rho.PrinterZebra.searchPrinters({
				"printerType": Rho.Printer.PRINTER_TYPE_ZEBRA,
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
			Rho.Printer.connect();
			if(Rho.Printer.isConnected == Rho.Printer.STATUS_OK || Rho.Printer.isReadyToPrint == Rho.Printer.STATUS_OK) {
				var print_str = Rho.Printer.printFile(jpgimagepath_640px, function(data){handleStatusCallback(data)});
				waitsFor(function () {
					return print_str;
				}, '10sec wait for print', ENABLE10K);
				displayResult("Printed ", print_str);
				Rho.Printer.disconnect();
			}
			else {
				displayResult("Unable to Connect ", Rho.Printer.isConnected);
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
	
	it("VTXXX-0039|printFile Method (without callback function png file)", function () {
		runs(function () {
			setObjective(jasmine.getEnv().currentSpec.description);
			setInstruction("");
			setExpected("The file should be sent successfully to the Rho.Printer.");
		});
		runs(function() {
			PrinterConnectiontype();
		}); 
		/*runs(function () {
			Rho.PrinterZebra.searchPrinters({
				"printerType": Rho.Printer.PRINTER_TYPE_ZEBRA,
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
			Rho.Printer.connect();
			if(Rho.Printer.isConnected == Rho.Printer.STATUS_OK || Rho.Printer.isReadyToPrint == Rho.Printer.STATUS_OK) {
				var print_str = Rho.Printer.printFile(pngimagepath_640px);
				waitsFor(function () {
					return print_str;
				}, '10sec wait for print', ENABLE10K);
				displayResult("Printed ", print_str);
				Rho.Printer.disconnect();
			}
			else {
				displayResult("Unable to Connect ", Rho.Printer.isConnected);
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
	it("VTXXX-0040|printFile Method (with callback function png file)", function () {
		runs(function () {
			setObjective(jasmine.getEnv().currentSpec.description);
			setInstruction("");
			setExpected("The file should be sent successfully to the Rho.Printer.");
		});
		runs(function() {
			PrinterConnectiontype();
		}); 
		/*runs(function () {
			Rho.PrinterZebra.searchPrinters({
				"printerType": Rho.Printer.PRINTER_TYPE_ZEBRA,
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
			Rho.Printer.connect();
			if(Rho.Printer.isConnected == Rho.Printer.STATUS_OK || Rho.Printer.isReadyToPrint == Rho.Printer.STATUS_OK) {
				print_str = Rho.Printer.printFile(pngimagepath_640px, handleStatusCallback);
				waitsFor(function () {
					return print_str;
				}, '10sec wait for print', ENABLE10K);
				displayResult("Printed ", print_str);
				Rho.Printer.disconnect();
			}
			else {
				displayResult("Unable to Connect ", Rho.Printer.isConnected);
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

	it("VTXXX-0041|printFile Method (with anonymous function for png file)", function () {
		runs(function () {
			setObjective(jasmine.getEnv().currentSpec.description);
			setInstruction("");
			setExpected("The file should be sent successfully to the Rho.Printer.");
		});
		runs(function() {
			PrinterConnectiontype();
		}); 
		/*runs(function () {
			Rho.PrinterZebra.searchPrinters({
				"printerType": Rho.Printer.PRINTER_TYPE_ZEBRA,
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
			Rho.Printer.connect();
			if(Rho.Printer.isConnected == Rho.Printer.STATUS_OK || Rho.Printer.isReadyToPrint == Rho.Printer.STATUS_OK) {
				print_str = Rho.Printer.printFile(pngimagepath_640px, function(data){handleStatusCallback(data)});
				waitsFor(function () {
					return print_str;
				}, '10sec wait for print', ENABLE10K);
				displayResult("Printed ", print_str);
				Rho.Printer.disconnect();
			}
			else {
				displayResult("Unable to Connect ", Rho.Printer.isConnected);
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
	if (Rho.System.platform != "ANDROID") {
		it("VTXXX-0042|printFile Method (without callback function)", function () {
			runs(function () {
				setObjective(jasmine.getEnv().currentSpec.description);
				setInstruction("");
				setExpected("The file should be sent successfully to the Rho.Printer.");
			});
			runs(function() {
				PrinterConnectiontype();
			}); 
			/*runs(function () {
				Rho.PrinterZebra.searchPrinters({
					"printerType": Rho.Printer.PRINTER_TYPE_ZEBRA,
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
				Rho.Printer.connect();
				if(Rho.Printer.isConnected == Rho.Printer.STATUS_OK || Rho.Printer.isReadyToPrint == Rho.Printer.STATUS_OK) {
					var print_str = Rho.Printer.printFile(bmpimagepath_640px);
					waitsFor(function () {
						return print_str;
					}, '10sec wait for print', ENABLE10K);
					displayResult("Printed ", print_str);
					Rho.Printer.disconnect();
				}
				else {
					displayResult("Unable to Connect ", Rho.Printer.isConnected);
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
		it("VTXXX-0043|printFile Method (with callback function))", function () {
			runs(function () {
				setObjective(jasmine.getEnv().currentSpec.description);
				setInstruction("");
				setExpected("The file should be sent successfully to the Rho.Printer.");
			});
			runs(function() {
				PrinterConnectiontype();
			}); 
			/*runs(function () {
				Rho.PrinterZebra.searchPrinters({
					"printerType": Rho.Printer.PRINTER_TYPE_ZEBRA,
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
				Rho.Printer.connect();
				if(Rho.Printer.isConnected == Rho.Printer.STATUS_OK || Rho.Printer.isReadyToPrint == Rho.Printer.STATUS_OK) {
					Rho.Printer.printFile(bmpimagepath_640px, handleStatusCallback);
					waitsFor(function () {
						return print_str;
					}, '10sec wait for print', ENABLE10K);
					displayResult("Printed ", print_str);
					Rho.Printer.disconnect();
				}
				else {
					displayResult("Unable to Connect ", Rho.Printer.isConnected);
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
		
		it("VTXXX-0044|printFile Method (with anonymous function for bmp file)", function () {
			runs(function () {
				setObjective(jasmine.getEnv().currentSpec.description);
				setInstruction("");
				setExpected("The file should be sent successfully to the Rho.Printer.");
			});
			runs(function() {
				PrinterConnectiontype();
			}); 
			/*runs(function () {
				Rho.PrinterZebra.searchPrinters({
					"printerType": Rho.Printer.PRINTER_TYPE_ZEBRA,
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
				Rho.Printer.connect();
				if(Rho.Printer.isConnected == Rho.Printer.STATUS_OK || Rho.Printer.isReadyToPrint == Rho.Printer.STATUS_OK) {
					var print_str = Rho.Printer.printFile(bmpimagepath_640px, function(data) { handleStatusCallback(data) });
					waitsFor(function () {
						return print_str;
					}, '10sec wait for print', ENABLE10K);
					displayResult("Printed ", print_str);
					Rho.Printer.disconnect();
				}
				else {
					displayResult("Unable to Connect ", Rho.Printer.isConnected);
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
		
		
	}	
	
	it("VTXXX-0045|printFile Method (without callback function for pdf file)", function () {
		runs(function () {
			setObjective(jasmine.getEnv().currentSpec.description);
			setInstruction("");
			setExpected("1.The file should be sent successfully to the Rho.Printer.");
		});
		runs(function() {
			PrinterConnectiontype();
		}); 
		/*runs(function () {
			Rho.PrinterZebra.searchPrinters({
				"printerType": Rho.Printer.PRINTER_TYPE_ZEBRA,
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
			Rho.Printer.connect();
			if(Rho.Printer.isConnected == Rho.Printer.STATUS_OK || Rho.Printer.isReadyToPrint == Rho.Printer.STATUS_OK) {
				var print_str = Rho.Printer.printFile(pdffilepath);
				waitsFor(function () {
					return print_str;
				}, '10sec wait for print', ENABLE10K);
				displayResult("Printed ", print_str);
				Rho.Printer.disconnect();
			}
			else {
				displayResult("Unable to Connect ", Rho.Printer.isConnected);
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

	it("VTXXX-0046|printFile Method (with callback function for pdf file) ", function () {
		runs(function () {
			setObjective(jasmine.getEnv().currentSpec.description);
			setInstruction("");
			setExpected("1.The file should be sent successfully to the Rho.Printer.");
		});
		runs(function() {
			PrinterConnectiontype();
		}); 
		/*runs(function () {
			Rho.PrinterZebra.searchPrinters({
				"printerType": Rho.Printer.PRINTER_TYPE_ZEBRA,
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
			Rho.Printer.connect();
			if(Rho.Printer.isConnected == Rho.Printer.STATUS_OK || Rho.Printer.isReadyToPrint == Rho.Printer.STATUS_OK) {
				var print_str = Rho.Printer.printFile(pdffilepath, handleStatusCallback);
				waitsFor(function () {
					return print_str;
				}, '10sec wait for print', ENABLE10K);
				displayResult("Printed ", print_str);
				Rho.Printer.disconnect();
			}
			else {
				displayResult("Unable to Connect ", Rho.Printer.isConnected);
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
	

	it("VTXXX-0047|printFile Method (with anonymous function for pdf file) ", function () {
		runs(function () {
			setObjective(jasmine.getEnv().currentSpec.description);
			setInstruction("");
			setExpected("1.The file should be sent successfully to the Rho.Printer.");
		});
		runs(function() {
			PrinterConnectiontype();
		}); 
		/*runs(function () {
			Rho.PrinterZebra.searchPrinters({
				"printerType": Rho.Printer.PRINTER_TYPE_ZEBRA,
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
			
			Rho.Printer.connect();
			if(Rho.Printer.isConnected == Rho.Printer.STATUS_OK || Rho.Printer.isReadyToPrint == Rho.Printer.STATUS_OK) {
				var print_str = Rho.Printer.printFile(pdffilepath, function(data){handleStatusCallback(data)});
				waitsFor(function () {
					return print_str;
				}, '10sec wait for print', ENABLE10K);
				displayResult("Printed ", print_str);
				Rho.Printer.disconnect();
			}
			else {
				displayResult("Unable to Connect ", Rho.Printer.isConnected);
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

	

	it("VTXXX-0048|printFile Method (with callback function and No File specified in fileURI)", function () {
		runs(function () {
			setObjective(jasmine.getEnv().currentSpec.description);
			setInstruction("");
			setExpected("1. No file should be sent to the Rho.Printer. <br />2. The callback should return STATUS_ERROR.");
		});
		runs(function() {
			PrinterConnectiontype();
		}); 
		/*runs(function () {
			Rho.PrinterZebra.searchPrinters({
				"printerType": Rho.Printer.PRINTER_TYPE_ZEBRA,
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
			Rho.Printer.connect();
			if(Rho.Printer.isConnected == Rho.Printer.STATUS_OK || Rho.Printer.isReadyToPrint == Rho.Printer.STATUS_OK) {
				var fileURI = "";
				var print_str = Rho.Printer.printFile(fileURI, handleStatusCallback);
				waitsFor(function () {
					return print_str;
				}, '10sec wait for print', ENABLE10K);
				displayResult("Printed ", print_str);
				Rho.Printer.disconnect();
			
			}
			else {
				displayResult("Unable to Connect ", Rho.Printer.isConnected);
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
	
	it("VTXXX-0049|printFile Method (with callback function and fileURI has no file at that location)", function () {
		runs(function () {
			setObjective(jasmine.getEnv().currentSpec.description);
			setInstruction("");
			setExpected("1. No file should be sent to the Rho.Printer. <br />2. The callback should return STATUS_ERROR.");
		});
		runs(function() {
			PrinterConnectiontype();
		}); 
		/*runs(function () {
			Rho.PrinterZebra.searchPrinters({
				"printerType": Rho.Printer.PRINTER_TYPE_ZEBRA,
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
			
			Rho.Printer.connect();
			if(Rho.Printer.isConnected == Rho.Printer.STATUS_OK || Rho.Printer.isReadyToPrint == Rho.Printer.STATUS_OK) {
				var fileURI = '/app/NoFile/';
				var print_str = Rho.Printer.printFile(fileURI, handleStatusCallback);
				waitsFor(function () {
					return print_str;
				}, '10sec wait for print', ENABLE10K);
				displayResult("Printed ", print_str);
				Rho.Printer.disconnect();
			}
			else {
				displayResult("Unable to Connect ", Rho.Printer.isConnected);
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
	
	// printRawString Method
	
	it("VTXXX-0050|printRawString Method (without callback function for ZPL Command)", function () {
		runs(function () {
			setObjective(jasmine.getEnv().currentSpec.description);
			setInstruction("");
			setExpected("The raw string should be sent successfully and printed on the Rho.Printer.");
		});
		runs(function() {
			PrinterConnectiontype();
		}); 
		/*runs(function () {
			Rho.PrinterZebra.searchPrinters({
				"printerType": Rho.Printer.PRINTER_TYPE_ZEBRA,
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
			Rho.Printer.connect();
			if(Rho.Printer.isConnected == Rho.Printer.STATUS_OK || Rho.Printer.isReadyToPrint == Rho.Printer.STATUS_OK) {
				var print_str = Rho.Printer.printRawString(CommandZPL)
				waitsFor(function () {
					return print_str;
				}, '10sec wait for print', ENABLE10K);
				displayResult("Printed ", print_str);
				Rho.Printer.disconnect();
			
			}
			else {
				displayResult("Unable to Connect ", Rho.Printer.isConnected);
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
	it("VTXXX-0051|printRawString Method (with callback function for ZPL Command)", function () {
		runs(function () {
			setObjective(jasmine.getEnv().currentSpec.description);
			setInstruction("");
			setExpected("1. The raw string should be sent successfully and printed on the Rho.Printer. <br />2. The callback should return STATUS_SUCCESS.");
		});
		runs(function() {
			PrinterConnectiontype();
		}); 
		/*runs(function () {
			Rho.PrinterZebra.searchPrinters({
				"printerType": Rho.Printer.PRINTER_TYPE_ZEBRA,
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
			Rho.Printer.connect();
			if(Rho.Printer.isConnected == Rho.Printer.STATUS_OK || Rho.Printer.isReadyToPrint == Rho.Printer.STATUS_OK) {
				var print_str = Rho.Printer.printRawString(CommandZPL, handleStatusCallback)
				waitsFor(function () {
					return print_str;
				}, '10sec wait for print', ENABLE10K);
				displayResult("Printed ", print_str);
				Rho.Printer.disconnect();
			
			}
			else {
				displayResult("Unable to Connect ", Rho.Printer.isConnected);
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
	
	it("VTXXX-0052|printRawString Method (with anonymous function for ZPL Command)", function () {
		runs(function () {
			setObjective(jasmine.getEnv().currentSpec.description);
			setInstruction("");
			setExpected("1. The raw string should be sent successfully and printed on the Rho.Printer. <br />2. The callback should return STATUS_SUCCESS.");
		});
		runs(function() {
			PrinterConnectiontype();
		}); 
		/*runs(function () {
			Rho.PrinterZebra.searchPrinters({
				"printerType": Rho.Printer.PRINTER_TYPE_ZEBRA,
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
			Rho.Printer.connect();
			if(Rho.Printer.isConnected == Rho.Printer.STATUS_OK || Rho.Printer.isReadyToPrint == Rho.Printer.STATUS_OK) {
				var print_str = Rho.Printer.printRawString(CommandZPL, function () {
					handleStatusCallback()
				})
				waitsFor(function () {
					return print_str;
				}, '10sec wait for print', ENABLE10K);
				displayResult("Printed ", print_str);
				Rho.Printer.disconnect();
			}
			else {
				displayResult("Unable to Connect ", Rho.Printer.isConnected);
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
	
	it("VTXXX-0053|printRawString Method (without callback function for CCPL Command)", function () {
		runs(function () {
			setObjective(jasmine.getEnv().currentSpec.description);
			setInstruction("");
			setExpected("The raw string should be sent successfully and printed on the Rho.Printer.");
		});
		runs(function() {
			PrinterConnectiontype();
		}); 
		/*runs(function () {
			Rho.PrinterZebra.searchPrinters({
				"printerType": Rho.Printer.PRINTER_TYPE_ZEBRA,
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
			Rho.Printer.connect();
			if(Rho.Printer.isConnected == Rho.Printer.STATUS_OK || Rho.Printer.isReadyToPrint == Rho.Printer.STATUS_OK) {
				var print_str = Rho.Printer.printRawString(CommandCCPL)
				waitsFor(function () {
					return print_str;
				}, '10sec wait for print', ENABLE10K);
				displayResult("Printed ", print_str);
				Rho.Printer.disconnect();
			
			}
			else {
				displayResult("Unable to Connect ", Rho.Printer.isConnected);
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
	it("VTXXX-0054|printRawString Method (with callback function for CCPL Command)", function () {
		runs(function () {
			setObjective(jasmine.getEnv().currentSpec.description);
			setInstruction("");
			setExpected("1. The raw string should be sent successfully and printed on the Rho.Printer. <br />2. The callback should return STATUS_SUCCESS.");
		});
		runs(function() {
			PrinterConnectiontype();
		}); 
		/*runs(function () {
			Rho.PrinterZebra.searchPrinters({
				"printerType": Rho.Printer.PRINTER_TYPE_ZEBRA,
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
			Rho.Printer.connect();
			if(Rho.Printer.isConnected == Rho.Printer.STATUS_OK || Rho.Printer.isReadyToPrint == Rho.Printer.STATUS_OK) {
				var print_str = Rho.Printer.printRawString(CommandCCPL, handleStatusCallback)
				waitsFor(function () {
					return print_str;
				}, '10sec wait for print', ENABLE10K);
				displayResult("Printed ", print_str);
				Rho.Printer.disconnect();
			
			}
			else {
				displayResult("Unable to Connect ", Rho.Printer.isConnected);
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
	
	it("VTXXX-0055|printRawString Method (with anonymous function for CCPL Command)", function () {
		runs(function () {
			setObjective(jasmine.getEnv().currentSpec.description);
			setInstruction("");
			setExpected("1. The raw string should be sent successfully and printed on the Rho.Printer. <br />2. The callback should return STATUS_SUCCESS.");
		});
		runs(function() {
			PrinterConnectiontype();
		}); 
		/*runs(function () {
			Rho.PrinterZebra.searchPrinters({
				"printerType": Rho.Printer.PRINTER_TYPE_ZEBRA,
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
			Rho.Printer.connect();
			if(Rho.Printer.isConnected == Rho.Printer.STATUS_OK || Rho.Printer.isReadyToPrint == Rho.Printer.STATUS_OK) {
				var print_str = Rho.Printer.printRawString(CommandCCPL, function () {
					handleStatusCallback()
				})
				waitsFor(function () {
					return print_str;
				}, '10sec wait for print', ENABLE10K);
				displayResult("Printed ", print_str);
				Rho.Printer.disconnect();
			}
			else {
				displayResult("Unable to Connect ", Rho.Printer.isConnected);
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
	
	
	it("VTXXX-0056|printRawString Method with callback (with the printer turned off) ", function () {
		runs(function () {
			setObjective(jasmine.getEnv().currentSpec.description);
			setInstruction("");
			setExpected("1. The raw string should not be sent and printed on the Rho.Printer. The callback function should return STATUS_ERROR.");
		});
		runs(function() {
			PrinterConnectiontype();
		}); 
		/*runs(function () {
			Rho.PrinterZebra.searchPrinters({
				"printerType": Rho.Printer.PRINTER_TYPE_ZEBRA,
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
			waitsFor(function () {
                    return true;
                }, 'Turn OFF the Printer', 5000);
			Rho.Printer.connect();
			if(Rho.Printer.isConnected == Rho.Printer.STATUS_OK || Rho.Printer.isReadyToPrint == Rho.Printer.STATUS_OK) {
				var print_str = Rho.Printer.printRawString(CommandZPL, handleStatusCallback)
				waitsFor(function () {
					return print_str;
				}, '10sec wait for print', ENABLE10K);
				displayResult("Printed ", print_str);
				Rho.Printer.disconnect();
			
			}
			else {
				displayResult("Unable to Connect ", Rho.Printer.isConnected);
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
	
	it("VTXXX-0057|printRawString Method with callback (with the printer's blue tooth[applicable for Bluetooth Printers only], tcp/network[applicable for network printers], USB[applicable for USB printers] turned off/disconnected)", function () {
		runs(function () {
			setObjective(jasmine.getEnv().currentSpec.description);
			setInstruction("");
			setExpected("1. The raw string should not be sent and printed on the Rho.Printer. The callback function should return STATUS_ERROR.");
		});
		runs(function() {
			PrinterConnectiontype();
		}); 
		/*runs(function () {
			Rho.PrinterZebra.searchPrinters({
				"printerType": Rho.Printer.PRINTER_TYPE_ZEBRA,
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
			waitsFor(function () {
                    return true;
                }, 'Turn OFF(Bluetooth or TCP/Network or USB) of the Printer', 5000);
			Rho.Printer.connect();
			if(Rho.Printer.isConnected == Rho.Printer.STATUS_OK || Rho.Printer.isReadyToPrint == Rho.Printer.STATUS_OK) {
				var print_str = Rho.Printer.printRawString(CommandCCPL, function () {
					handleStatusCallback()
				})
				waitsFor(function () {
					return print_str;
				}, '10sec wait for print', ENABLE10K);
				displayResult("Printed ", print_str);
				Rho.Printer.disconnect();
			}
			else {
				displayResult("Unable to Connect ", Rho.Printer.isConnected);
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
			setObjective(jasmine.getEnv().currentSpec.description);
			setInstruction("1. Connect a Zebra printer with the device <br /> 2. Store some files in the Zebra printer like ( image1.jpg, img2.png, img3.bmp, testfile.pdf, printarray.zpl, printhash.zpl and files with no extention )<br /> 3. Call Retrieve file names");
			setExpected("1. Should Retrieve the names of the files which are stored on the Rho.Printer. <br />2. HASH containing STATUS_SUCCESS and all the file names should be retrived. (image1.jpg, img2.png, img3.bmp, testfile.pdf, printarray.zpl, printhash.zpl and file with no extention.)<br /> 3. STATUS_ERROR should be thrown on failure in search");
		});
		
		
		runs(function() {
				PrinterConnectiontype();
			});
		
		runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			connect_status = PrinterInstance.connect();
			 /* waitsFor(function()	{
				return PrinterInstance.isConnected;
			}, '9sec wait for connection', ENABLE9K); */ 
			
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
			setObjective(jasmine.getEnv().currentSpec.description);
			setInstruction("1. Connect a Zebra printer with the device <br /> 2. Do not store any files on the Zebra printer<br /> 3. Call Retrieve file names");
			setExpected("1.  Should Retrive nil filenames. <br /> 2. STATUS_ERROR should be thrown on failure in search");
		});
		
		
		runs(function() {
				PrinterConnectiontype();
			});
		
		runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			connect_status = PrinterInstance.connect();
			 /* waitsFor(function()	{
				return PrinterInstance.isConnected;
			}, '9sec wait for connection', ENABLE9K); */ 
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
			setObjective(jasmine.getEnv().currentSpec.description);
			setInstruction("1. Connect a Zebra printer with the device <br /> 2. Store some files in the Zebra printer like ( image1.jpg, img2.png, img3.bmp, testfile.pdf, printarray.zpl, printhash.zpl and files with no extention )<br /> 3.  Disconnect the Rho.Printer. <br />4. Call Retrieve file names");
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
			setObjective(jasmine.getEnv().currentSpec.description);
			setInstruction("1. Connect a Zebra printer with the device <br /> 2. Store some files in the Zebra printer like ( image1.jpg, img2.png, img3.bmp, testfile.pdf, printarray.zpl, printhash.zpl and files with no extention )<br /> 3. Call Retrieve file names with callback");
			setExpected("1. Retrieves the names of the files which are stored on the Rho.Printer. <br /> 2. Callback should get fired with HASH containing status STATUS_SUCCESS and with all the file names (image1.jpg, img2.png, img3.bmp, testfile.pdf, printarray.zpl, printhash.zpl and file with no extention). <br />3. STATUS_ERROR should be thrown on failure in search");
		});
		
		
		runs(function() {
				PrinterConnectiontype();
			});
		
		runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			connect_status = PrinterInstance.connect();
			/* waitsFor(function()	{
				return PrinterInstance.isConnected;
			}, '9sec wait for connection', ENABLE9K); */
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
			setObjective(jasmine.getEnv().currentSpec.description);
			setInstruction("1. Connect a Zebra printer with the device <br /> 2. Do not store any files on the Zebra printer<br /> 3. Call Retrieve file names with callback");
			setExpected("1. Callback should get fired with HASH containing STATUS_SUCCESS and retrives nil filenames.<br /> 2. STATUS_ERROR should be thrown on failure in search");
		});
		
		
		runs(function() {
				PrinterConnectiontype();
			});
		
		runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			connect_status = PrinterInstance.connect();
			/* waitsFor(function()	{
				return PrinterInstance.isConnected;
			}, '9sec wait for connection', ENABLE9K); */
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
			setObjective(jasmine.getEnv().currentSpec.description);
			setInstruction("1. Connect a Zebra printer with the device <br /> 2. Store some files in the Zebra printer like ( image1.jpg, img2.png, img3.bmp, testfile.pdf, printarray.zpl, printhash.zpl and files with no extention )<br /> 3.  Disconnect the Rho.Printer. <br />4. Call Retrieve file names with callback");
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
			setObjective(jasmine.getEnv().currentSpec.description);
			setInstruction("1. Connect a Zebra printer with the device <br /> 2. Store some files in the Zebra printer like ( image1.jpg, img2.png, img3.bmp, testfile.pdf, printarray.zpl, printhash.zpl and files with no extention )<br /> 3. Call Retrieve file names with Anonymous callback");
			setExpected("1. Retrieves the names of the files which are stored on the Rho.Printer. <br /> 2. Callback should get fired with HASH containing status STATUS_SUCCESS and with all the file names (image1.jpg, img2.png, img3.bmp, testfile.pdf, printarray.zpl, printhash.zpl and file with no extention). <br />3. STATUS_ERROR should be thrown on failure in search");
		});
		
		
		runs(function() {
				PrinterConnectiontype();
			});
		
		runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			connect_status = PrinterInstance.connect();
			/* waitsFor(function()	{
				return PrinterInstance.isConnected;
			}, '9sec wait for connection', ENABLE9K); */
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
			setObjective(jasmine.getEnv().currentSpec.description);
			setInstruction("1. Connect a Zebra printer with the device <br /> 2. Store some files in Zebra printer like image1.jpg, img2.png, img3.bmp, testfile.pdf, printarray.zpl, printhash.zpl and file with no extention<br /> 3. Call Retrieve file names With Extensions");
			setExpected("1. Will only returns files which have the extensions in 'extensions'. <br />2. HASH containing Status STATUS_SUCCESS and all the file names contains below extension  ['png', 'bmp', 'jpg', 'pdf', 'zpl', 'txt', 'xls', 'doc']. <br />3. STATUS_ERROR should be thrown on failure in search.");
		});
		
		
		runs(function() {
				PrinterConnectiontype();
			});
		
		runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			connect_status = PrinterInstance.connect();
			/* waitsFor(function()	{
				return PrinterInstance.isConnected;
			}, '9sec wait for connection', ENABLE9K); */
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

	it("VTXXX-0108 | Retrieve file names when files with no extension stored on printer using retrieveFileNamesWithExtensions method ( without Callback )" , function() {
		runs(function() {
			setObjective(jasmine.getEnv().currentSpec.description);
			setInstruction("1. Connect a Zebra printer with the device <br /> 2. Store some files in Zebra printer which doesn't contain extention.<br /> 3. Call Retrieve file names With Extensions");
			setExpected("1. Will return Nil files. status STATUS_SUCCESS. <br />3. STATUS_ERROR should be thrown on failure in search.");
		});
		
		
		runs(function() {
				PrinterConnectiontype();
			});
		
		runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			connect_status = PrinterInstance.connect();
			/* waitsFor(function()	{
				return PrinterInstance.isConnected;
			}, '9sec wait for connection', ENABLE9K); */
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
			setObjective(jasmine.getEnv().currentSpec.description);
			setInstruction("1. Connect a Zebra printer with the device <br /> 2. Store some files in Zebra printer like image1.jpg, img2.png, img3.bmp, testfile.pdf, printarray.zpl, printhash.zpl and file with no extention.<br /> 3. Disconnect the Rho.Printer. <br /> 4. Call Retrieve file names With Extensions");
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
			setObjective(jasmine.getEnv().currentSpec.description);
			setInstruction("1. Connect a Zebra printer with the device <br /> 2. Store some files in Zebra printer like image1.jpg, img2.png, img3.bmp, testfile.pdf, printarray.zpl, printhash.zpl and file with no extention<br /> 3. Call Retrieve file names With Extensions with callback");
			setExpected("1. Will only returns files which have the extensions in 'extensions'. <br />2. Callback containing HASH with Status STATUS_SUCCESS and all the file names contains below extension  ['png', 'bmp', 'jpg', 'pdf', 'zpl', 'txt', 'xls', 'doc']. <br />3. STATUS_ERROR should be thrown on failure in search");
		});
		
		
		runs(function() {
				PrinterConnectiontype();
			});
		
		runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			connect_status = PrinterInstance.connect();
			/* waitsFor(function()	{
				return PrinterInstance.isConnected;
			}, '9sec wait for connection', ENABLE9K); */
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
			setObjective(jasmine.getEnv().currentSpec.description);
			setInstruction("1. Connect a Zebra printer with the device <br /> 2. Store some files in Zebra printer which doesn't contain extention.<br /> 3. Call Retrieve file names With Extensions with callback");
			setExpected("1. Callback with hash containing Nil filenames and status STATUS_SUCCESS. <br />3. STATUS_ERROR should be thrown on failure in search.");
		});
		
		
		runs(function() {
				PrinterConnectiontype();
			});
		
		runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			connect_status = PrinterInstance.connect();
			/* waitsFor(function()	{
				return PrinterInstance.isConnected;
			}, '9sec wait for connection', ENABLE9K); */
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
			setObjective(jasmine.getEnv().currentSpec.description);
			setInstruction("1. Connect a Zebra printer with the device <br /> 2. Store some files in Zebra printer like image1.jpg, img2.png, img3.bmp, testfile.pdf, printarray.zpl, printhash.zpl and file with no extention<br /> 3. Call Retrieve file names With Extensions with anonymous callback");
			setExpected("1. Will only returns files which have the extensions in 'extensions'. <br />2. Anonymous callback containing HASH with Status STATUS_SUCCESS and all the file names contains below extension  ['png', 'bmp', 'jpg', 'pdf', 'zpl', 'txt', 'xls', 'doc']. <br />3. STATUS_ERROR should be thrown on failure in search.");
		});
		
		
		runs(function() {
				PrinterConnectiontype();
			});
		
		runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			connect_status = PrinterInstance.connect();
			/* waitsFor(function()	{
				return PrinterInstance.isConnected;
			}, '9sec wait for connection', ENABLE9K); */
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
			setObjective(jasmine.getEnv().currentSpec.description);
			setInstruction("1. Connect a Zebra printer with the device <br /> 2. Store some files in Zebra printer like image1.jpg, img2.png, img3.bmp, testfile.pdf, printarray.zpl, printhash.zpl and file with no extention<br /> 3. Call Retrieve file names With Extensions nil param with callback");
			setExpected("1. Will only returns files which have the extensions in 'extensions'. <br />2. Callback containing HASH with Status STATUS_SUCCESS and nil files. <br />3. STATUS_ERROR should be thrown on failure in search.");
		});
		
		
		runs(function() {
				PrinterConnectiontype();
			});
		
		runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			connect_status = PrinterInstance.connect();
			/* waitsFor(function()	{
				return PrinterInstance.isConnected;
			}, '9sec wait for connection', ENABLE9K); */
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
			setObjective(jasmine.getEnv().currentSpec.description);
			setInstruction("1. Connect a Zebra printer with the device <br /> 2. Call sendFileContents (TXT file path) with callback.");
			setExpected("1. Callback should be fired on successful print with return STATUS_SUCCESS <br /> 2. STATUS_ERROR should be thrown on failure in print.");
		});
		
		
		runs(function() {
				PrinterConnectiontype();
			});
		
		runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			connect_status = PrinterInstance.connect();
			/* waitsFor(function()	{
				return PrinterInstance.isConnected;
			}, '9sec wait for connection', ENABLE9K); */
			if (PrinterInstance.isConnected) {
				PrinterInstance.sendFileContents(txtfilepath, handleStatusCallback);
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
			setObjective(jasmine.getEnv().currentSpec.description);
			setInstruction("1. Connect a Zebra printer with the device <br /> 2. Call sendFileContents (CSV file path) with callback.");
			setExpected("1. Callback should be fired on successful print with return STATUS_SUCCESS <br /> 2. STATUS_ERROR should be thrown on failure in print.");
		});
		
		
		runs(function() {
				PrinterConnectiontype();
			});
		
		runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			connect_status = PrinterInstance.connect();
			/* waitsFor(function()	{
				return PrinterInstance.isConnected;
			}, '9sec wait for connection', ENABLE9K); */
			if (PrinterInstance.isConnected) {
				PrinterInstance.sendFileContents(csvfilepath, handleStatusCallback);
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
			setObjective(jasmine.getEnv().currentSpec.description);
			setInstruction("1. Connect a Zebra printer with the device <br /> 2. Call sendFileContents (xls file path) with callback.");
			setExpected("1. Callback should be fired on successful print with return STATUS_SUCCESS <br /> 2. STATUS_ERROR should be thrown on failure in print.");
		});
		
		
		runs(function() {
				PrinterConnectiontype();
			});
		
		runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			connect_status = PrinterInstance.connect();
			/* waitsFor(function()	{
				return PrinterInstance.isConnected;
			}, '9sec wait for connection', ENABLE9K); */
			if (PrinterInstance.isConnected) {
				PrinterInstance.sendFileContents(xlsfilepath, handleStatusCallback);
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
			setObjective(jasmine.getEnv().currentSpec.description);
			setInstruction("1. Connect a Zebra printer with the device <br /> 2. Call sendFileContents (doc file path) with callback.");
			setExpected("1. Callback should be fired on successful print with return STATUS_SUCCESS <br /> 2. STATUS_ERROR should be thrown on failure in print.");
		});
		
		
		runs(function() {
				PrinterConnectiontype();
			});
		
		runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			connect_status = PrinterInstance.connect();
			/* waitsFor(function()	{
				return PrinterInstance.isConnected;
			}, '9sec wait for connection', ENABLE9K); */
			if (PrinterInstance.isConnected) {
				PrinterInstance.sendFileContents(docfilepath, handleStatusCallback);
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
			setObjective(jasmine.getEnv().currentSpec.description);
			setInstruction("1. Connect a Zebra printer with the device <br /> 2. Call sendFileContents (HTML CSS  file path) with callback.");
			setExpected("1. Callback should be fired on successful print with return STATUS_SUCCESS <br /> 2. STATUS_ERROR should be thrown on failure in print.");
		});
		
		
		runs(function() {
				PrinterConnectiontype();
			});
		
		runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			connect_status = PrinterInstance.connect();
			/* waitsFor(function()	{
				return PrinterInstance.isConnected;
			}, '9sec wait for connection', ENABLE9K); */
			if (PrinterInstance.isConnected) {
				PrinterInstance.sendFileContents(htmlcssfilepath, handleStatusCallback);
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
			setObjective(jasmine.getEnv().currentSpec.description);
			setInstruction("1. Connect a Zebra printer with the device <br /> 2. Call sendFileContents (js  file path) with callback.");
			setExpected("1. Callback should be fired on successful print with return STATUS_SUCCESS <br /> 2. STATUS_ERROR should be thrown on failure in print.");
		});
		
		
		runs(function() {
				PrinterConnectiontype();
			});
		
		runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			connect_status = PrinterInstance.connect();
			/* waitsFor(function()	{
				return PrinterInstance.isConnected;
			}, '9sec wait for connection', ENABLE9K); */
			if (PrinterInstance.isConnected) {
				PrinterInstance.sendFileContents(jsfilepath, handleStatusCallback);
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
			setObjective(jasmine.getEnv().currentSpec.description);
			setInstruction("1. Connect a Zebra printer with the device <br /> 2. Call sendFileContents (cpp  file path) with callback.");
			setExpected("1. Callback should be fired on successful print with return STATUS_SUCCESS <br /> 2. STATUS_ERROR should be thrown on failure in print.");
		});
		
		
		runs(function() {
				PrinterConnectiontype();
			});
		
		runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			connect_status = PrinterInstance.connect();
			/* waitsFor(function()	{
				return PrinterInstance.isConnected;
			}, '9sec wait for connection', ENABLE9K); */
			if (PrinterInstance.isConnected) {
				PrinterInstance.sendFileContents(cppfilepath, handleStatusCallback);
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
			setObjective(jasmine.getEnv().currentSpec.description);
			setInstruction("1. Connect a Zebra printer with the device <br /> 2. Call sendFileContents (jpg  file path) with callback.");
			setExpected("1. Callback should be fired on successful print with return STATUS_SUCCESS <br /> 2. STATUS_ERROR should be thrown on failure in print.");
		});
		
		
		runs(function() {
				PrinterConnectiontype();
			});
		
		runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			connect_status = PrinterInstance.connect();
			/* waitsFor(function()	{
				return PrinterInstance.isConnected;
			}, '9sec wait for connection', ENABLE9K); */
			if (PrinterInstance.isConnected) {
				PrinterInstance.sendFileContents(jpgimagepath_640px, handleStatusCallback);
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
			setObjective(jasmine.getEnv().currentSpec.description);
			setInstruction("1. Connect a Zebra printer with the device <br /> 2. Call sendFileContents (png  file path) with callback.");
			setExpected("1. Callback should be fired on successful print with return STATUS_SUCCESS <br /> 2. STATUS_ERROR should be thrown on failure in print.");
		});
		
		
		runs(function() {
				PrinterConnectiontype();
			});
		
		runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			connect_status = PrinterInstance.connect();
			/* waitsFor(function()	{
				return PrinterInstance.isConnected;
			}, '9sec wait for connection', ENABLE9K); */
			if (PrinterInstance.isConnected) {
				PrinterInstance.sendFileContents(pngimagepath_640px, handleStatusCallback);
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
			setObjective(jasmine.getEnv().currentSpec.description);
			setInstruction("1. Connect a Zebra printer with the device <br /> 2. Call sendFileContents (bmp  file path) with callback.");
			setExpected("1. Callback should be fired on successful print with return STATUS_SUCCESS <br /> 2. STATUS_ERROR should be thrown on failure in print.");
		});
		
		
		runs(function() {
				PrinterConnectiontype();
			});
		
		runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			connect_status = PrinterInstance.connect();
			/* waitsFor(function()	{
				return PrinterInstance.isConnected;
			}, '9sec wait for connection', ENABLE9K); */
			if (PrinterInstance.isConnected) {
				PrinterInstance.sendFileContents(bmpimagepath_640px, handleStatusCallback);
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
			setObjective(jasmine.getEnv().currentSpec.description);
			setInstruction("1. Connect a Zebra printer with the device <br /> 2. Call sendFileContents (gif  file path) with callback.");
			setExpected("1. Callback should be fired on successful print with return STATUS_SUCCESS <br /> 2. STATUS_ERROR should be thrown on failure in print.");
		});
		
		
		runs(function() {
				PrinterConnectiontype();
			});
		
		runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			connect_status = PrinterInstance.connect();
			/* waitsFor(function()	{
				return PrinterInstance.isConnected;
			}, '9sec wait for connection', ENABLE9K); */
			if (PrinterInstance.isConnected) {
				PrinterInstance.sendFileContents(gifimagepath_640px, handleStatusCallback);
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
			setObjective(jasmine.getEnv().currentSpec.description);
			setInstruction("1. Connect a Zebra printer with the device <br /> 2. Call sendFileContents (pdf  file path) with callback.");
			setExpected("1. Callback should be fired on successful print with return STATUS_SUCCESS <br /> 2. STATUS_ERROR should be thrown on failure in print.");
		});
		
		
		runs(function() {
				PrinterConnectiontype();
			});
		
		runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			connect_status = PrinterInstance.connect();
			/* waitsFor(function()	{
				return PrinterInstance.isConnected;
			}, '9sec wait for connection', ENABLE9K); */
			if (PrinterInstance.isConnected) {
				PrinterInstance.sendFileContents(pdffilepath, handleStatusCallback);
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
			setObjective(jasmine.getEnv().currentSpec.description);
			setInstruction("1. Connect a Zebra printer with the device <br /> 2. Call sendFileContents (HASH ZPL format  file path) with callback.");
			setExpected("1. Callback should be fired on successful print with return STATUS_SUCCESS <br /> 2. STATUS_ERROR should be thrown on failure in print.");
		});
		
		
		runs(function() {
				PrinterConnectiontype();
			});
		
		runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			connect_status = PrinterInstance.connect();
			/* waitsFor(function()	{
				return PrinterInstance.isConnected;
			}, '9sec wait for connection', ENABLE9K); */
			if (PrinterInstance.isConnected) {
				PrinterInstance.sendFileContents(hashzplfilepath, handleStatusCallback);
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
			setObjective(jasmine.getEnv().currentSpec.description);
			setInstruction("1. Connect a Zebra printer with the device <br /> 2. Call sendFileContents (HASH CCPL format  file path) with callback.");
			setExpected("1. Callback should be fired on successful print with return STATUS_SUCCESS <br /> 2. STATUS_ERROR should be thrown on failure in print.");
		});
		
		
		runs(function() {
				PrinterConnectiontype();
			});
		
		runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			connect_status = PrinterInstance.connect();
			/* waitsFor(function()	{
				return PrinterInstance.isConnected;
			}, '9sec wait for connection', ENABLE9K); */
			if (PrinterInstance.isConnected) {
				PrinterInstance.sendFileContents(hashccplfilepath, handleStatusCallback);
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
			setObjective(jasmine.getEnv().currentSpec.description);
			setInstruction("1. Connect a Zebra printer with the device <br /> 2. Call sendFileContents (Array ZPL format  file path) with callback.");
			setExpected("1. Callback should be fired on successful print with return STATUS_SUCCESS <br /> 2. STATUS_ERROR should be thrown on failure in print.");
		});
		
		
		runs(function() {
				PrinterConnectiontype();
			});
		
		runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			connect_status = PrinterInstance.connect();
			/* waitsFor(function()	{
				return PrinterInstance.isConnected;
			}, '9sec wait for connection', ENABLE9K); */
			if (PrinterInstance.isConnected) {
				PrinterInstance.sendFileContents(arrayzplfilepath, handleStatusCallback);
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
			setObjective(jasmine.getEnv().currentSpec.description);
			setInstruction("1. Connect a Zebra printer with the device <br /> 2. Call sendFileContents (Array CCPL format  file path) with callback.");
			setExpected("1. Callback should be fired on successful print with return STATUS_SUCCESS <br /> 2. STATUS_ERROR should be thrown on failure in print.");
		});
		
		
		runs(function() {
				PrinterConnectiontype();
			});
		
		runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			connect_status = PrinterInstance.connect();
			/* waitsFor(function()	{
				return PrinterInstance.isConnected;
			}, '9sec wait for connection', ENABLE9K); */
			if (PrinterInstance.isConnected) {
				PrinterInstance.sendFileContents(arrayccplfilepath, handleStatusCallback);
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
			setObjective(jasmine.getEnv().currentSpec.description);
			setInstruction("1. Connect a Zebra printer with the device <br /> 2. Call sendFileContents (Invalid file contents file path) with callback.");
			setExpected("1. Callback should be fired on successful print with return STATUS_SUCCESS <br /> 2. STATUS_ERROR should be thrown on failure in print.");
		});
		
		
		runs(function() {
				PrinterConnectiontype();
			});
		
		runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			connect_status = PrinterInstance.connect();
			/* waitsFor(function()	{
				return PrinterInstance.isConnected;
			}, '9sec wait for connection', ENABLE9K); */
			if (PrinterInstance.isConnected) {
				PrinterInstance.sendFileContents(invalidcontentsfilepath, handleStatusCallback);
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
			setObjective(jasmine.getEnv().currentSpec.description);
			setInstruction("1. Connect a Zebra printer with the device <br /> 2. Call sendFileContents (Invalid file path) with callback.");
			setExpected("1. Callback should be fired on successful print with return STATUS_SUCCESS <br /> 2. STATUS_ERROR should be thrown on failure in print.");
		});
		
		
		runs(function() {
				PrinterConnectiontype();
			});
		
		runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			connect_status = PrinterInstance.connect();
			/* waitsFor(function()	{
				return PrinterInstance.isConnected;
			}, '9sec wait for connection', ENABLE9K); */
			if (PrinterInstance.isConnected) {
				PrinterInstance.sendFileContents(invalidfilepath, handleStatusCallback);
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
			setObjective(jasmine.getEnv().currentSpec.description);
			setInstruction("1. Connect a Zebra printer with the device <br /> 2. Call sendFileContents (PDF file path) with Anonymous callback.");
			setExpected("1. Callback should be fired on successful print with return STATUS_SUCCESS <br /> 2. STATUS_ERROR should be thrown on failure in print.");
		});
		
		
		runs(function() {
				PrinterConnectiontype();
			});
		
		runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			connect_status = PrinterInstance.connect();
			/* waitsFor(function()	{
				return PrinterInstance.isConnected;
			}, '9sec wait for connection', ENABLE9K); */
			if (PrinterInstance.isConnected) {
				PrinterInstance.sendFileContents(pdffilepath, function(data){handleStatusCallback(data);});
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
			setObjective(jasmine.getEnv().currentSpec.description);
			setInstruction("1. Disconnect the Rho.Printer. <br />2. Send XLS file contents ( with callback )");
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
				PrinterInstance.sendFileContents(pdffilepath, handleStatusCallback);
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
			setObjective(jasmine.getEnv().currentSpec.description);
			setInstruction("1. Connect a Zebra printer with the device <br /> 2. Call sendFileContents ( PDF or XLS or DOC or TXT or JS or JPG or BMP or GIF or PNG or HASH ZPL or Array CCPL ) ( without Callback ).");
			setExpected("1. Callback should be fired on successful print with return STATUS_SUCCESS <br /> 2. STATUS_ERROR should be thrown on failure in print.");
		});
		
		
		runs(function() {
				PrinterConnectiontype();
			});
		
		runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			connect_status = PrinterInstance.connect();
			/* waitsFor(function()	{
				return PrinterInstance.isConnected;
			}, '9sec wait for connection', ENABLE9K); */
			if (PrinterInstance.isConnected) {
				var selected_value = document.getElementById("combo").value;
				PrinterInstance.sendFileContents(selected_value);
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
			hideCombo();
		});
		
	});	

	it("VTXXX-0135 | sendFileContents method with Invalid file contents filepath ( without callback )" , function() {
		runs(function() {
			setObjective(jasmine.getEnv().currentSpec.description);
			setInstruction("1. Connect a Zebra printer with the device <br /> 2. Call sendFileContents (Invalid file contents file path) without callback.");
			setExpected("1.STATUS_ERROR should be thrown on failure in print.");
		});
		
		
		runs(function() {
				PrinterConnectiontype();
			});
		
		runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			connect_status = PrinterInstance.connect();
			/* waitsFor(function()	{
				return PrinterInstance.isConnected;
			}, '9sec wait for connection', ENABLE9K); */
			if (PrinterInstance.isConnected) {
				var contents = PrinterInstance.sendFileContents(invalidcontentsfilepath);
				displayResult("Result", contents);
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
			setObjective(jasmine.getEnv().currentSpec.description);
			setInstruction("1. Connect a Zebra printer with the device <br /> 2. Call sendFileContents (Invalid file path) without callback.");
			setExpected("1.STATUS_ERROR should be thrown on failure in print.");
		});
		
		
		runs(function() {
				PrinterConnectiontype();
			});
		
		runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			connect_status = PrinterInstance.connect();
			/* waitsFor(function()	{
				return PrinterInstance.isConnected;
			}, '9sec wait for connection', ENABLE9K); */
			if (PrinterInstance.isConnected) {
				var contents = PrinterInstance.sendFileContents(invalidfilepath);
				displayResult("Result", contents);
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
			setObjective(jasmine.getEnv().currentSpec.description);
			setInstruction("1. Disconnect the Rho.Printer. <br /> 2. sendFileContents method with any file or PDF or XLS without callback.");
			setExpected("1.STATUS_ERROR should be thrown on failure in print.");
		});
		
		
		runs(function() {
				PrinterConnectiontype();
			});
		
		runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			connect_status = PrinterInstance.disconnect();
			if (!PrinterInstance.isConnected) {
				var contents = PrinterInstance.sendFileContents(pdffilepath);
				displayResult("Result", contents);
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
			setObjective(jasmine.getEnv().currentSpec.description);
			setInstruction("1. Connect a Zebra printer with the device <br /> 2. Call printStoredFormatWithHash (  'E:FORMAT.ZPL',  HASH ZPL ) with callback.");
			setExpected("1. On successful print callback should return with STATUS_SUCCESS <br />2. On failure print callback should return with STATUS_ERROR ");
		});
		
		
		runs(function() {
				PrinterConnectiontype();
			});
		
		runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			connect_status = PrinterInstance.connect();
			/* waitsFor(function()	{
				return PrinterInstance.isConnected;
			}, '9sec wait for connection', ENABLE9K); */
			if (PrinterInstance.isConnected) {
				PrinterInstance.printStoredFormatWithHash(zplformatpath, hashzpl, handleStatusCallback);
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
			setObjective(jasmine.getEnv().currentSpec.description);
			setInstruction("1. Connect a Zebra printer with the device <br /> 2. Call printStoredFormatWithHash (  'E:FORMAT.CCPL',  HASH CCPL ) with callback.");
			setExpected("1. On successful print callback should return with STATUS_SUCCESS <br />2. On failure print callback should return with STATUS_ERROR ");
		});
		
		
		runs(function() {
				PrinterConnectiontype();
			});
		
		runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			connect_status = PrinterInstance.connect();
			/* waitsFor(function()	{
				return PrinterInstance.isConnected;
			}, '9sec wait for connection', ENABLE9K); */
			if (PrinterInstance.isConnected) {
				PrinterInstance.printStoredFormatWithHash(ccplformatpath, hashccpl, handleStatusCallback);
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
			setObjective(jasmine.getEnv().currentSpec.description);
			setInstruction("1. Disconnect the Rho.Printer. <br /> 2. Call printStoredFormatWithHash (  'E:FORMAT.ZPL',  HASH ZPL ) with callback.");
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
				PrinterInstance.printStoredFormatWithHash(ccplformatpath, hashccpl, handleStatusCallback);
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
			setObjective(jasmine.getEnv().currentSpec.description);
			setInstruction("1. Connect a Zebra printer with the device <br /> 2. Call printStoredFormatWithHash (  'E:FORMAT.ZPL',  HASH ZPL ) without callback.");
			setExpected("1. On successful print should return with STATUS_SUCCESS <br />2. On failure print should return with STATUS_ERROR ");
		});
		
		
		runs(function() {
				PrinterConnectiontype();
			});
		
		runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			connect_status = PrinterInstance.connect();
			/* waitsFor(function()	{
				return PrinterInstance.isConnected;
			}, '9sec wait for connection', ENABLE9K); */
			if (PrinterInstance.isConnected) {
				var storedformathash = PrinterInstance.printStoredFormatWithHash(zplformatpath, hashzpl);
				displayResult("Result", storedformathash);
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
			setObjective(jasmine.getEnv().currentSpec.description);
			setInstruction("1. Connect a Zebra printer with the device <br /> 2. Call printStoredFormatWithHash (  'E:FORMAT.CCPL',  HASH CCPL ) without callback.");
			setExpected("1. On successful print should return with STATUS_SUCCESS <br />2. On failure print should return with STATUS_ERROR ");
		});
		
		
		runs(function() {
				PrinterConnectiontype();
			});
		
		runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			connect_status = PrinterInstance.connect();
			/* waitsFor(function()	{
				return PrinterInstance.isConnected;
			}, '9sec wait for connection', ENABLE9K); */
			if (PrinterInstance.isConnected) {
				var storedformathash = PrinterInstance.printStoredFormatWithHash(ccplformatpath, hashccpl);
				displayResult("Result", storedformathash);
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
			setObjective(jasmine.getEnv().currentSpec.description);
			setInstruction("1. Disconnect the Rho.Printer. <br /> 2. Call printStoredFormatWithHash (  'E:FORMAT.ZPL',  HASH ZPL ) without callback.");
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
				var storedformathash = PrinterInstance.printStoredFormatWithHash(ccplformatpath, hashccpl);
				displayResult("Result", storedformathash);
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
			setObjective(jasmine.getEnv().currentSpec.description);
			setInstruction("1. Connect a Zebra printer with the device <br /> 2. Call printStoredFormatWithHash (  'Invalid Path',  Invalid HASH ZPL ) with callback.");
			setExpected("1. On failure print callback should return with STATUS_ERROR ");
		});
		
		
		runs(function() {
				PrinterConnectiontype();
			});
		
		runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			connect_status = PrinterInstance.connect();
			/* waitsFor(function()	{
				return PrinterInstance.isConnected;
			}, '9sec wait for connection', ENABLE9K); */
			if (PrinterInstance.isConnected) {
				PrinterInstance.printStoredFormatWithHash(invalidformatpath, invalidzplhash, handleStatusCallback);
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
			setObjective(jasmine.getEnv().currentSpec.description);
			setInstruction("1. Connect a Zebra printer with the device <br /> 2. Call printStoredFormatWithHash (  'E:FORMAT.ZPL',  HASH ZPL ) with Anonymous  callback.");
			setExpected("1. On successful print callback should return with STATUS_SUCCESS <br />2. On failure print callback should return with STATUS_ERROR ");
		});
		
		
		runs(function() {
				PrinterConnectiontype();
			});
		
		runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			connect_status = PrinterInstance.connect();
			/* waitsFor(function()	{
				return PrinterInstance.isConnected;
			}, '9sec wait for connection', ENABLE9K); */
			if (PrinterInstance.isConnected) {
				PrinterInstance.printStoredFormatWithHash(zplformatpath, hashzpl, function(data) { handleStatusCallback(data) });
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
			setObjective(jasmine.getEnv().currentSpec.description);
			setInstruction("1. Connect a Zebra printer with the device <br /> 2. Call printStoredFormatWithHash (  'E:FORMAT.CCPL',  HASH CCPL ) with Anonymous callback.");
			setExpected("1. On successful print callback should return with STATUS_SUCCESS <br />2. On failure print callback should return with STATUS_ERROR ");
		});
		
		
		runs(function() {
				PrinterConnectiontype();
			});
		
		runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			connect_status = PrinterInstance.connect();
			/* waitsFor(function()	{
				return PrinterInstance.isConnected;
			}, '9sec wait for connection', ENABLE9K); */
			if (PrinterInstance.isConnected) {
				PrinterInstance.printStoredFormatWithHash(ccplformatpath, hashccpl, function(data) { handleStatusCallback(data) });
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
			setObjective(jasmine.getEnv().currentSpec.description);
			setInstruction("1. Connect a Zebra printer with the device <br /> 2. Call printStoredFormatWithArray (  'E:FORMAT.ZPL',  ARRAY ZPL ) with callback.");
			setExpected("1. On successful print callback should return with STATUS_SUCCESS <br />2. On failure print callback should return with STATUS_ERROR ");
		});
		
		
		runs(function() {
				PrinterConnectiontype();
			});
		
		runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			connect_status = PrinterInstance.connect();
			/* waitsFor(function()	{
				return PrinterInstance.isConnected;
			}, '9sec wait for connection', ENABLE9K); */
			if (PrinterInstance.isConnected) {
				PrinterInstance.printStoredFormatWithArray(zplformatpath, arrayzpl, handleStatusCallback);
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
			setObjective(jasmine.getEnv().currentSpec.description);
			setInstruction("1. Connect a Zebra printer with the device <br /> 2. Call printStoredFormatWithArray (  'E:FORMAT.CCPL',  ARRAY CCPL ) with callback.");
			setExpected("1. On successful print callback should return with STATUS_SUCCESS <br />2. On failure print callback should return with STATUS_ERROR ");
		});
		
		
		runs(function() {
				PrinterConnectiontype();
			});
		
		runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			connect_status = PrinterInstance.connect();
			/* waitsFor(function()	{
				return PrinterInstance.isConnected;
			}, '9sec wait for connection', ENABLE9K); */
			if (PrinterInstance.isConnected) {
				PrinterInstance.printStoredFormatWithArray(ccplformatpath, arrayccpl, handleStatusCallback);
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
			setObjective(jasmine.getEnv().currentSpec.description);
			setInstruction("1. Disconnect the Rho.Printer. <br /> 2. Call printStoredFormatWithArray (  'E:FORMAT.ZPL',  ARRAY ZPL ) with callback.");
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
				PrinterInstance.printStoredFormatWithArray(ccplformatpath, arrayccpl, handleStatusCallback);
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
			setObjective(jasmine.getEnv().currentSpec.description);
			setInstruction("1. Connect a Zebra printer with the device <br /> 2. Call printStoredFormatWithArray (  'E:FORMAT.ZPL',  ARRAY ZPL ) without callback.");
			setExpected("1. On successful print should return with STATUS_SUCCESS <br />2. On failure print should return with STATUS_ERROR ");
		});
		
		
		runs(function() {
				PrinterConnectiontype();
			});
		
		runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			connect_status = PrinterInstance.connect();
			/* waitsFor(function()	{
				return PrinterInstance.isConnected;
			}, '9sec wait for connection', ENABLE9K); */
			if (PrinterInstance.isConnected) {
				var storeformatarray = PrinterInstance.printStoredFormatWithArray(zplformatpath, arrayzpl);
				displayResult("Result", storeformatarray);	
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
			setObjective(jasmine.getEnv().currentSpec.description);
			setInstruction("1. Connect a Zebra printer with the device <br /> 2. Call printStoredFormatWithArray (  'E:FORMAT.CCPL',  ARRAY CCPL ) without callback.");
			setExpected("1. On successful print should return with STATUS_SUCCESS <br />2. On failure print should return with STATUS_ERROR ");
		});
		
		
		runs(function() {
				PrinterConnectiontype();
			});
		
		runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			connect_status = PrinterInstance.connect();
			/* waitsFor(function()	{
				return PrinterInstance.isConnected;
			}, '9sec wait for connection', ENABLE9K); */
			if (PrinterInstance.isConnected) {
				var storeformatarray = PrinterInstance.printStoredFormatWithArray(ccplformatpath, arrayccpl);
				displayResult("Result", storeformatarray);	
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
			setObjective(jasmine.getEnv().currentSpec.description);
			setInstruction("1. Disconnect the Rho.Printer. <br /> 2. Call printStoredFormatWithArray (  'E:FORMAT.ZPL',  ARRAY ZPL ) without callback.");
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
				var storeformatarray = PrinterInstance.printStoredFormatWithArray(ccplformatpath, arrayccpl);
				displayResult("Result", storeformatarray);
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
			setObjective(jasmine.getEnv().currentSpec.description);
			setInstruction("1. Connect a Zebra printer with the device <br /> 2. Call printStoredFormatWithArray (  'Invalid Path',  Invalid ARRAY ZPL ) with callback.");
			setExpected("1. On failure print callback should return with STATUS_ERROR ");
		});
		
		
		runs(function() {
				PrinterConnectiontype();
			});
		
		runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			connect_status = PrinterInstance.connect();
			/* waitsFor(function()	{
				return PrinterInstance.isConnected;
			}, '9sec wait for connection', ENABLE9K); */
			if (PrinterInstance.isConnected) {
				PrinterInstance.printStoredFormatWithArray(invalidformatformat, invalidzplarray, handleStatusCallback);
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
			setObjective(jasmine.getEnv().currentSpec.description);
			setInstruction("1. Connect a Zebra printer with the device <br /> 2. Call printStoredFormatWithArray (  'E:FORMAT.ZPL',  ARRAY ZPL ) with Anonymous  callback.");
			setExpected("1. On successful print callback should return with STATUS_SUCCESS <br />2. On failure print callback should return with STATUS_ERROR ");
		});
		
		
		runs(function() {
				PrinterConnectiontype();
			});
		
		runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			connect_status = PrinterInstance.connect();
			/* waitsFor(function()	{
				return PrinterInstance.isConnected;
			}, '9sec wait for connection', ENABLE9K); */
			if (PrinterInstance.isConnected) {
				PrinterInstance.printStoredFormatWithArray(zplformatpath, arrayzpl, function(data) { handleStatusCallback(data) });
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
			setObjective(jasmine.getEnv().currentSpec.description);
			setInstruction("1. Connect a Zebra printer with the device <br /> 2. Call printStoredFormatWithArray (  'E:FORMAT.CCPL',  ARRAY CCPL ) with Anonymous callback.");
			setExpected("1. On successful print callback should return with STATUS_SUCCESS <br />2. On failure print callback should return with STATUS_ERROR ");
		});
		
		
		runs(function() {
				PrinterConnectiontype();
			});
		
		runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			connect_status = PrinterInstance.connect();
			/* waitsFor(function()	{
				return PrinterInstance.isConnected;
			}, '9sec wait for connection', ENABLE9K); */
			if (PrinterInstance.isConnected) {
				PrinterInstance.printStoredFormatWithArray(ccplformatpath, arrayccpl, function(data) { handleStatusCallback(data) });
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
			setObjective(jasmine.getEnv().currentSpec.description);
			setInstruction("1. Connect a Zebra printer with the device <br /> 2. Call printImageFromFile with callback.");
			setExpected("1. On successful print callback should return with STATUS_SUCCESS <br />2. On failure print callback should return with STATUS_ERROR ");
		});
		
		
		runs(function() {
				PrinterConnectiontype();
			});
		
		runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			connect_status = PrinterInstance.connect();
			/* waitsFor(function()	{
				return PrinterInstance.isConnected;
			}, '9sec wait for connection', ENABLE9K); */
			if (PrinterInstance.isConnected) {
				PrinterInstance.printImageFromFile(pngimagepath_320px, 0, 0, {}, handleStatusCallback);
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
			setObjective(jasmine.getEnv().currentSpec.description);
			setInstruction("1. Connect a Zebra printer with the device <br /> 2. Call printImageFromFile with callback.");
			setExpected("1. On successful print callback should return with STATUS_SUCCESS <br />2. On failure print callback should return with STATUS_ERROR ");
		});
		
		
		runs(function() {
				PrinterConnectiontype();
			});
		
		runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			connect_status = PrinterInstance.connect();
			/* waitsFor(function()	{
				return PrinterInstance.isConnected;
			}, '9sec wait for connection', ENABLE9K); */
			if (PrinterInstance.isConnected) {
				PrinterInstance.printImageFromFile(pngimagepath_320px, 50, 50, {}, handleStatusCallback);
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
			setObjective(jasmine.getEnv().currentSpec.description);
			setInstruction("1. Connect a Zebra printer with the device <br /> 2. Call printImageFromFile with callback.");
			setExpected("1. On successful print callback should return with STATUS_SUCCESS <br />2. On failure print callback should return with STATUS_ERROR ");
		});
		
		
		runs(function() {
				PrinterConnectiontype();
			});
		
		runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			connect_status = PrinterInstance.connect();
			/* waitsFor(function()	{
				return PrinterInstance.isConnected;
			}, '9sec wait for connection', ENABLE9K); */
			if (PrinterInstance.isConnected) {
				PrinterInstance.printImageFromFile(pngimagepath_320px, -100, -200, {}, handleStatusCallback);
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
			setObjective(jasmine.getEnv().currentSpec.description);
			setInstruction("1. Connect a Zebra printer with the device <br /> 2. Call printImageFromFile with callback.");
			setExpected("1. On successful print callback should return with STATUS_SUCCESS <br />2. On failure print callback should return with STATUS_ERROR ");
		});
		
		
		runs(function() {
				PrinterConnectiontype();
			});
		
		runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			connect_status = PrinterInstance.connect();
			/* waitsFor(function()	{
				return PrinterInstance.isConnected;
			}, '9sec wait for connection', ENABLE9K); */
			if (PrinterInstance.isConnected) {
				PrinterInstance.printImageFromFile(pngimagepath_320px, 0, 0, {'height':50, 'width':50, 'isInsideFormat':true}, handleStatusCallback);
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
			setObjective(jasmine.getEnv().currentSpec.description);
			setInstruction("1. Connect a Zebra printer with the device <br /> 2. Call printImageFromFile with callback.");
			setExpected("1. On successful print callback should return with STATUS_SUCCESS <br />2. On failure print callback should return with STATUS_ERROR ");
		});
		
		
		runs(function() {
				PrinterConnectiontype();
			});
		
		runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			connect_status = PrinterInstance.connect();
			/* waitsFor(function()	{
				return PrinterInstance.isConnected;
			}, '9sec wait for connection', ENABLE9K); */
			if (PrinterInstance.isConnected) {
				PrinterInstance.printImageFromFile(pngimagepath_320px, 50, 100, {'height':-1, 'width':-1, 'isInsideFormat':false}, handleStatusCallback);
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
			setObjective(jasmine.getEnv().currentSpec.description);
			setInstruction("1. Connect a Zebra printer with the device <br /> 2. Call printImageFromFile with callback.");
			setExpected("1. On successful print callback should return with STATUS_SUCCESS <br />2. On failure print callback should return with STATUS_ERROR ");
		});
		
		
		runs(function() {
				PrinterConnectiontype();
			});
		
		runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			connect_status = PrinterInstance.connect();
			/* waitsFor(function()	{
				return PrinterInstance.isConnected;
			}, '9sec wait for connection', ENABLE9K); */
			if (PrinterInstance.isConnected) {
				PrinterInstance.printImageFromFile(pngimagepath_320px, -100, -100, {'height':-50, 'width':-50, 'isInsideFormat':false}, handleStatusCallback);
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
			setObjective(jasmine.getEnv().currentSpec.description);
			setInstruction("1. Connect a Zebra printer with the device <br /> 2. Call printImageFromFile with callback.");
			setExpected("1. On successful print callback should return with STATUS_SUCCESS <br />2. On failure print callback should return with STATUS_ERROR ");
		});
		
		
		runs(function() {
				PrinterConnectiontype();
			});
		
		runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			connect_status = PrinterInstance.connect();
			/* waitsFor(function()	{
				return PrinterInstance.isConnected;
			}, '9sec wait for connection', ENABLE9K); */
			if (PrinterInstance.isConnected) {
				PrinterInstance.printImageFromFile(jpgimagepath_320px, 50, 50, {}, handleStatusCallback);
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
			setObjective(jasmine.getEnv().currentSpec.description);
			setInstruction("1. Connect a Zebra printer with the device <br /> 2. Call printImageFromFile with callback.");
			setExpected("1. On successful print callback should return with STATUS_SUCCESS <br />2. On failure print callback should return with STATUS_ERROR ");
		});
		
		
		runs(function() {
				PrinterConnectiontype();
			});
		
		runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			connect_status = PrinterInstance.connect();
			/* waitsFor(function()	{
				return PrinterInstance.isConnected;
			}, '9sec wait for connection', ENABLE9K); */
			
			if (PrinterInstance.isConnected) {
				PrinterInstance.printImageFromFile(jpgimagepath_320px, 0, 0, {'height':50, 'width':50, 'isInsideFormat':true}, handleStatusCallback);
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
			setObjective(jasmine.getEnv().currentSpec.description);
			setInstruction("1. Connect a Zebra printer with the device <br /> 2. Call printImageFromFile with callback.");
			setExpected("1. On successful print callback should return with STATUS_SUCCESS <br />2. On failure print callback should return with STATUS_ERROR ");
		});
		
		
		runs(function() {
				PrinterConnectiontype();
			});
		
		runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			connect_status = PrinterInstance.connect();
			/* waitsFor(function()	{
				return PrinterInstance.isConnected;
			}, '9sec wait for connection', ENABLE9K); */
			
			if (PrinterInstance.isConnected) {
				PrinterInstance.printImageFromFile(jpgimagepath_320px, 50, 100, {'height':-1, 'width':-1, 'isInsideFormat':false}, handleStatusCallback);
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
			setObjective(jasmine.getEnv().currentSpec.description);
			setInstruction("1. Connect a Zebra printer with the device <br /> 2. Call printImageFromFile with callback.");
			setExpected("1. On successful print callback should return with STATUS_SUCCESS <br />2. On failure print callback should return with STATUS_ERROR ");
		});
		
		
		runs(function() {
				PrinterConnectiontype();
			});
		
		runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			connect_status = PrinterInstance.connect();
			/* waitsFor(function()	{
				return PrinterInstance.isConnected;
			}, '9sec wait for connection', ENABLE9K); */
			
			if (PrinterInstance.isConnected) {
				PrinterInstance.printImageFromFile(pngimagepath_640px, 0, 0, {'height':50, 'width':50, 'isInsideFormat':true}, handleStatusCallback);
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
			setObjective(jasmine.getEnv().currentSpec.description);
			setInstruction("1. Connect a Zebra printer with the device <br /> 2. Call printImageFromFile with callback.");
			setExpected("1. On successful print callback should return with STATUS_SUCCESS <br />2. On failure print callback should return with STATUS_ERROR ");
		});
		
		
		runs(function() {
				PrinterConnectiontype();
			});
		
		runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			connect_status = PrinterInstance.connect();
			/* waitsFor(function()	{
				return PrinterInstance.isConnected;
			}, '9sec wait for connection', ENABLE9K); */
			
			if (PrinterInstance.isConnected) {
				PrinterInstance.printImageFromFile(pngimagepath_640px, 50, 100, {'height':-1, 'width':-1, 'isInsideFormat':false}, handleStatusCallback);
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
			setObjective(jasmine.getEnv().currentSpec.description);
			setInstruction("1. Connect a Zebra printer with the device <br /> 2. Call printImageFromFile with callback.");
			setExpected("1. On successful print callback should return with STATUS_SUCCESS <br />2. On failure print callback should return with STATUS_ERROR ");
		});
		
		
		runs(function() {
				PrinterConnectiontype();
			});
		
		runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			connect_status = PrinterInstance.connect();
			/* waitsFor(function()	{
				return PrinterInstance.isConnected;
			}, '9sec wait for connection', ENABLE9K); */
			
			if (PrinterInstance.isConnected) {
				PrinterInstance.printImageFromFile(jpgimagepath_640px, 0, 0, {'height':50, 'width':50, 'isInsideFormat':true}, handleStatusCallback);
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
			setObjective(jasmine.getEnv().currentSpec.description);
			setInstruction("1. Connect a Zebra printer with the device <br /> 2. Call printImageFromFile with callback.");
			setExpected("1. On successful print callback should return with STATUS_SUCCESS <br />2. On failure print callback should return with STATUS_ERROR ");
		});
		
		
		runs(function() {
				PrinterConnectiontype();
			});
		
		runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			connect_status = PrinterInstance.connect();
			/* waitsFor(function()	{
				return PrinterInstance.isConnected;
			}, '9sec wait for connection', ENABLE9K); */
			
			if (PrinterInstance.isConnected) {
				PrinterInstance.printImageFromFile(jpgimagepath_640px, 50, 100, {'height':-1, 'width':-1, 'isInsideFormat':false}, handleStatusCallback);
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
			setObjective(jasmine.getEnv().currentSpec.description);
			setInstruction("1. Connect a Zebra printer with the device <br /> 2. Call printImageFromFile with callback.");
			setExpected("1. On successful print callback should return with STATUS_SUCCESS <br />2. On failure print callback should return with STATUS_ERROR ");
		});
		
		
		runs(function() {
				PrinterConnectiontype();
			});
		
		runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			connect_status = PrinterInstance.connect();
			/* waitsFor(function()	{
				return PrinterInstance.isConnected;
			}, '9sec wait for connection', ENABLE9K); */
			
			if (PrinterInstance.isConnected) {
				PrinterInstance.printImageFromFile(pngimagepath_1024px, 0, 0, {'height':50, 'width':50, 'isInsideFormat':true}, handleStatusCallback);
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
			setObjective(jasmine.getEnv().currentSpec.description);
			setInstruction("1. Connect a Zebra printer with the device <br /> 2. Call printImageFromFile with callback.");
			setExpected("1. On successful print callback should return with STATUS_SUCCESS <br />2. On failure print callback should return with STATUS_ERROR ");
		});
		
		
		runs(function() {
				PrinterConnectiontype();
			});
		
		runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			connect_status = PrinterInstance.connect();
			/* waitsFor(function()	{
				return PrinterInstance.isConnected;
			}, '9sec wait for connection', ENABLE9K); */
			
			if (PrinterInstance.isConnected) {
				PrinterInstance.printImageFromFile(pngimagepath_1024px, 50, 100, {'height':-1, 'width':-1, 'isInsideFormat':false}, handleStatusCallback);
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
			setObjective(jasmine.getEnv().currentSpec.description);
			setInstruction("1. Connect a Zebra printer with the device <br /> 2. Call printImageFromFile with callback.");
			setExpected("1. On successful print callback should return with STATUS_SUCCESS <br />2. On failure print callback should return with STATUS_ERROR ");
		});
		
		
		runs(function() {
				PrinterConnectiontype();
			});
		
		runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			connect_status = PrinterInstance.connect();
			/* waitsFor(function()	{
				return PrinterInstance.isConnected;
			}, '9sec wait for connection', ENABLE9K); */
			
			if (PrinterInstance.isConnected) {
				PrinterInstance.printImageFromFile(jpgimagepath_1024px, 0, 0, {'height':50, 'width':50, 'isInsideFormat':true}, handleStatusCallback);
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
			setObjective(jasmine.getEnv().currentSpec.description);
			setInstruction("1. Connect a Zebra printer with the device <br /> 2. Call printImageFromFile with callback.");
			setExpected("1. On successful print callback should return with STATUS_SUCCESS <br />2. On failure print callback should return with STATUS_ERROR ");
		});
		
		
		runs(function() {
				PrinterConnectiontype();
			});
		
		runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			connect_status = PrinterInstance.connect();
			/* waitsFor(function()	{
				return PrinterInstance.isConnected;
			}, '9sec wait for connection', ENABLE9K); */
			
			if (PrinterInstance.isConnected) {
				PrinterInstance.printImageFromFile(jpgimagepath_1024px, 50, 100, {'height':-1, 'width':-1, 'isInsideFormat':false}, handleStatusCallback);
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
			setObjective(jasmine.getEnv().currentSpec.description);
			setInstruction("1. Connect a Zebra printer with the device <br /> 2. Call printImageFromFile with callback.");
			setExpected("1. On successful print callback should return with STATUS_SUCCESS <br />2. On failure print callback should return with STATUS_ERROR ");
		});
		
		
		runs(function() {
				PrinterConnectiontype();
			});
		
		runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			connect_status = PrinterInstance.connect();
			/* waitsFor(function()	{
				return PrinterInstance.isConnected;
			}, '9sec wait for connection', ENABLE9K); */
			
			if (PrinterInstance.isConnected) {
				PrinterInstance.printImageFromFile(pngimagepath_2048px, 0, 0, {'height':50, 'width':50, 'isInsideFormat':true}, handleStatusCallback);
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
			setObjective(jasmine.getEnv().currentSpec.description);
			setInstruction("1. Connect a Zebra printer with the device <br /> 2. Call printImageFromFile with callback.");
			setExpected("1. On successful print callback should return with STATUS_SUCCESS <br />2. On failure print callback should return with STATUS_ERROR ");
		});
		
		
		runs(function() {
				PrinterConnectiontype();
			});
		
		runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			connect_status = PrinterInstance.connect();
			/* waitsFor(function()	{
				return PrinterInstance.isConnected;
			}, '9sec wait for connection', ENABLE9K); */
			
			if (PrinterInstance.isConnected) {
				PrinterInstance.printImageFromFile(jpgimagepath_2048px, 50, 100, {'height':-1, 'width':-1, 'isInsideFormat':false}, handleStatusCallback);
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
			setObjective(jasmine.getEnv().currentSpec.description);
			setInstruction("1. Connect a Zebra printer with the device <br /> 2. Call printImageFromFile without callback.");
			setExpected("1. On successful print should return with STATUS_SUCCESS <br />2. On failure print should return with STATUS_ERROR ");
		});
		
		
		runs(function() {
				PrinterConnectiontype();
			});
		
		runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			connect_status = PrinterInstance.connect();
			/* waitsFor(function()	{
				return PrinterInstance.isConnected;
			}, '9sec wait for connection', ENABLE9K); */
			
			if (PrinterInstance.isConnected) {
				var printimagefromfile_status = PrinterInstance.printImageFromFile(pngimagepath_1024px, 0, 0, {'height':50, 'width':50, 'isInsideFormat':true});
				displayResult("Result", printimagefromfile_status);
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
			setObjective(jasmine.getEnv().currentSpec.description);
			setInstruction("1. Connect a Zebra printer with the device <br /> 2. Call printImageFromFile without callback.");
			setExpected("1. On successful print should return with STATUS_SUCCESS <br />2. On failure print should return with STATUS_ERROR ");
		});
		
		
		runs(function() {
				PrinterConnectiontype();
			});
		
		runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			connect_status = PrinterInstance.connect();
			/* waitsFor(function()	{
				return PrinterInstance.isConnected;
			}, '9sec wait for connection', ENABLE9K); */
			
			if (PrinterInstance.isConnected) {
				var printimagefromfile_status = PrinterInstance.printImageFromFile(pngimagepath_1024px, 50,100, {'width': -1, 'height': -1, 'isInsideFormat': false});
				displayResult("Result", printimagefromfile_status);
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
			setObjective(jasmine.getEnv().currentSpec.description);
			setInstruction("1. Connect a Zebra printer with the device <br /> 2. Call printImageFromFile without callback.");
			setExpected("1. On successful print should return with STATUS_SUCCESS <br />2. On failure print should return with STATUS_ERROR ");
		});
		
		
		runs(function() {
				PrinterConnectiontype();
			});
		
		runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			connect_status = PrinterInstance.connect();
			/* waitsFor(function()	{
				return PrinterInstance.isConnected;
			}, '9sec wait for connection', ENABLE9K); */
			
			if (PrinterInstance.isConnected) {
				var printimagefromfile_status = PrinterInstance.printImageFromFile(jpgimagepath_1024px, 0, 0, {'height':50, 'width':50, 'isInsideFormat':true});
				displayResult("Result", printimagefromfile_status);
				
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
			setObjective(jasmine.getEnv().currentSpec.description);
			setInstruction("1. Connect a Zebra printer with the device <br /> 2. Call printImageFromFile without callback.");
			setExpected("1. On successful print should return with STATUS_SUCCESS <br />2. On failure print should return with STATUS_ERROR ");
		});
		
		
		runs(function() {
				PrinterConnectiontype();
			});
		
		runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			connect_status = PrinterInstance.connect();
			/* waitsFor(function()	{
				return PrinterInstance.isConnected;
			}, '9sec wait for connection', ENABLE9K); */
			
			if (PrinterInstance.isConnected) {
				var printimagefromfile_status = PrinterInstance.printImageFromFile(jpgimagepath_1024px, 50, 100, {'height':-1, 'width':-1, 'isInsideFormat':false});
				displayResult("Result", printimagefromfile_status);
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
			setObjective(jasmine.getEnv().currentSpec.description);
			setInstruction("1. Connect a Zebra printer with the device <br /> 2. Call printImageFromFile with Anonymous callback.");
			setExpected("1. On successful print callback should return with STATUS_SUCCESS <br />2. On failure print callback should return with STATUS_ERROR ");
		});
		
		
		runs(function() {
				PrinterConnectiontype();
			});
		
		runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			connect_status = PrinterInstance.connect();
			/* waitsFor(function()	{
				return PrinterInstance.isConnected;
			}, '9sec wait for connection', ENABLE9K); */
			
			if (PrinterInstance.isConnected) {
				PrinterInstance.printImageFromFile(pngimagepath_1024px, 0, 0, {'height':50, 'width':50, 'isInsideFormat':true}, function(data) {handleStatusCallback(data);});
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
			setObjective(jasmine.getEnv().currentSpec.description);
			setInstruction("1. Connect a Zebra printer with the device <br /> 2. Call printImageFromFile with Anonymous callback.");
			setExpected("1. On successful print callback should return with STATUS_SUCCESS <br />2. On failure print callback should return with STATUS_ERROR ");
		});
		
		
		runs(function() {
				PrinterConnectiontype();
			});
		
		runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			connect_status = PrinterInstance.connect();
			/* waitsFor(function()	{
				return PrinterInstance.isConnected;
			}, '9sec wait for connection', ENABLE9K); */
			
			if (PrinterInstance.isConnected) {
				PrinterInstance.printImageFromFile(pngimagepath_1024px, 50, 100, {'height':-1, 'width':-1, 'isInsideFormat':false}, function(data) {handleStatusCallback(data);});
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
			setObjective(jasmine.getEnv().currentSpec.description);
			setInstruction("1. Connect a Zebra printer with the device <br /> 2. Call printImageFromFile with Anonymous callback.");
			setExpected("1. On successful print callback should return with STATUS_SUCCESS <br />2. On failure print callback should return with STATUS_ERROR ");
		});
		
		
		runs(function() {
				PrinterConnectiontype();
			});
		
		runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			connect_status = PrinterInstance.connect();
			/* waitsFor(function()	{
				return PrinterInstance.isConnected;
			}, '9sec wait for connection', ENABLE9K); */
			
			if (PrinterInstance.isConnected) {
				PrinterInstance.printImageFromFile(jpgimagepath_1024px, 0, 0, {'height':50, 'width':50, 'isInsideFormat':true}, function(data) {handleStatusCallback(data);});
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
			setObjective(jasmine.getEnv().currentSpec.description);
			setInstruction("1. Connect a Zebra printer with the device <br /> 2. Call printImageFromFile with Anonymous callback.");
			setExpected("1. On successful print callback should return with STATUS_SUCCESS <br />2. On failure print callback should return with STATUS_ERROR ");
		});
		
		
		runs(function() {
				PrinterConnectiontype();
			});
		
		runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			connect_status = PrinterInstance.connect();
			/* waitsFor(function()	{
				return PrinterInstance.isConnected;
			}, '9sec wait for connection', ENABLE9K); */
			
			if (PrinterInstance.isConnected) {
				PrinterInstance.printImageFromFile(jpgimagepath_1024px, 50, 100, {'height':-1, 'width':-1, 'isInsideFormat':false}, function(data) {handleStatusCallback(data);});
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
			setObjective(jasmine.getEnv().currentSpec.description);
			setInstruction("1. Connect a Zebra printer with the device <br /> 2. Call storeImage with callback.");
			setExpected("1.  On successful storing image callback should return with STATUS_SUCCESS. <br />2. File should be stored at D:FILE.GRF on printer <br />3. On failure storing image callback should return with STATUS_ERROR ");
		});
		
		
		runs(function() {
				PrinterConnectiontype();
			});
		
		runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			connect_status = PrinterInstance.connect();
			/* waitsFor(function()	{
				return PrinterInstance.isConnected;
			}, '9sec wait for connection', ENABLE9K); */
			
			if (PrinterInstance.isConnected) {
				PrinterInstance.storeImage(printerDriveAndFileName, bmpimagepath_320px, 50, 50,handleStatusCallback);
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
			setObjective(jasmine.getEnv().currentSpec.description);
			setInstruction("1. Connect a Zebra printer with the device <br /> 2. Call storeImage with callback.");
			setExpected("1.  On successful storing image callback should return with STATUS_SUCCESS. <br />2. File should be stored at D:FILE.GRF on printer <br />3. On failure storing image callback should return with STATUS_ERROR ");
		});
		
		
		runs(function() {
				PrinterConnectiontype();
			});
		
		runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			connect_status = PrinterInstance.connect();
			/* waitsFor(function()	{
				return PrinterInstance.isConnected;
			}, '9sec wait for connection', ENABLE9K); */
			
			if (PrinterInstance.isConnected) {
				PrinterInstance.storeImage(printerDriveAndFileName, bmpimagepath_320px, 0, 0,handleStatusCallback);
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
			setObjective(jasmine.getEnv().currentSpec.description);
			setInstruction("1. Connect a Zebra printer with the device <br /> 2. Call storeImage with callback.");
			setExpected("1.  On successful storing image callback should return with STATUS_SUCCESS. <br />2. File should be stored at default drive E:FILE.GRF on printer <br />3. On failure storing image callback should return with STATUS_ERROR ");
		});
		
		
		runs(function() {
				PrinterConnectiontype();
			});
		
		runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			connect_status = PrinterInstance.connect();
			/* waitsFor(function()	{
				return PrinterInstance.isConnected;
			}, '9sec wait for connection', ENABLE9K); */
			
			if (PrinterInstance.isConnected) {
				PrinterInstance.storeImage(printerOnlyFileName, bmpimagepath_320px, -1, -1,handleStatusCallback);
				
				
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
			setObjective(jasmine.getEnv().currentSpec.description);
			setInstruction("1. Connect a Zebra printer with the device <br /> 2. Call storeImage with callback.");
			setExpected("1. On failure storing image callback should return with STATUS_ERROR ");
		});
		
		
		runs(function() {
				PrinterConnectiontype();
			});
		
		runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			connect_status = PrinterInstance.connect();
			/* waitsFor(function()	{
				return PrinterInstance.isConnected;
			}, '9sec wait for connection', ENABLE9K); */
			
			if (PrinterInstance.isConnected) {
				PrinterInstance.storeImage(Invaliddrivepath, invalidImagepath, 0, 0,handleStatusCallback);
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
			setObjective(jasmine.getEnv().currentSpec.description);
			setInstruction("1. Connect a Zebra printer with the device <br /> 2. Call storeImage with callback.");
			setExpected("1. On failure storing image callback should return with STATUS_ERROR ");
		});
		
		
		runs(function() {
				PrinterConnectiontype();
			});
		
		runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			connect_status = PrinterInstance.connect();
			/* waitsFor(function()	{
				return PrinterInstance.isConnected;
			}, '9sec wait for connection', ENABLE9K); */
			
			if (PrinterInstance.isConnected) {
				PrinterInstance.storeImage("", "", 0, 0,handleStatusCallback);
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
			setObjective(jasmine.getEnv().currentSpec.description);
			setInstruction("1. Connect a Zebra printer with the device <br /> 2. Call storeImage with callback.");
			setExpected("1.  On successful storing image callback should return with STATUS_SUCCESS.<br />2. File should be stored at    D:FILE.GRF on printer <br />3. On failure storing image callback should return with STATUS_ERROR ");
		});
		
		
		runs(function() {
				PrinterConnectiontype();
			});
		
		runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			connect_status = PrinterInstance.connect();
			/* waitsFor(function()	{
				return PrinterInstance.isConnected;
			}, '9sec wait for connection', ENABLE9K); */
			
			if (PrinterInstance.isConnected) {
				PrinterInstance.storeImage(printerDriveAndFileName, bmpimagepath_640px, 50, 50,handleStatusCallback);
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
			setObjective(jasmine.getEnv().currentSpec.description);
			setInstruction("1. Connect a Zebra printer with the device <br /> 2. Call storeImage with callback.");
			setExpected("1.  On successful storing image callback should return with STATUS_SUCCESS.<br />2. File should be stored at    D:FILE.GRF on printer <br />3. On failure storing image callback should return with STATUS_ERROR ");
		});
		
		
		runs(function() {
				PrinterConnectiontype();
			});
		
		runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			connect_status = PrinterInstance.connect();
			/* waitsFor(function()	{
				return PrinterInstance.isConnected;
			}, '9sec wait for connection', ENABLE9K); */
			
			if (PrinterInstance.isConnected) {
				PrinterInstance.storeImage(printerDriveAndFileName, bmpimagepath_1024px, 150, 150,handleStatusCallback);
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
			setObjective(jasmine.getEnv().currentSpec.description);
			setInstruction("1. Connect a Zebra printer with the device <br /> 2. Call storeImage with callback.");
			setExpected("1.  On successful storing image callback should return with STATUS_SUCCESS.<br />2. File should be stored at    D:FILE.GRF on printer <br />3. On failure storing image callback should return with STATUS_ERROR ");
		});
		
		
		runs(function() {
				PrinterConnectiontype();
			});
		
		runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			connect_status = PrinterInstance.connect();
			/* waitsFor(function()	{
				return PrinterInstance.isConnected;
			}, '9sec wait for connection', ENABLE9K); */
			
			if (PrinterInstance.isConnected) {
				PrinterInstance.storeImage(printerDriveAndFileName, bmpimagepath_2048px, -1, -1,handleStatusCallback);
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
			setObjective(jasmine.getEnv().currentSpec.description);
			setInstruction("1. Connect a Zebra printer with the device <br /> 2. Call storeImage with callback.");
			setExpected("1.  On successful storing image callback should return with STATUS_SUCCESS.<br />2.  File should be stored at  default E:FILE.GRF on printer <br />3. On failure storing image callback should return with STATUS_ERROR ");
		});
		
		
		runs(function() {
				PrinterConnectiontype();
			});
		
		runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			connect_status = PrinterInstance.connect();
			/* waitsFor(function()	{
				return PrinterInstance.isConnected;
			}, '9sec wait for connection', ENABLE9K); */
			
			if (PrinterInstance.isConnected) {
				PrinterInstance.storeImage(printerOnlyFileName, jpgimagepath_320px, 50, 50,handleStatusCallback);
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
			setObjective(jasmine.getEnv().currentSpec.description);
			setInstruction("1. Connect a Zebra printer with the device <br /> 2. Call storeImage with callback.");
			setExpected("1.  On successful storing image callback should return with STATUS_SUCCESS.<br />2.  File should be stored at  D:FILE.GRF on printer <br />3. On failure storing image callback should return with STATUS_ERROR ");
		});
		
		
		runs(function() {
				PrinterConnectiontype();
			});
		
		runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			connect_status = PrinterInstance.connect();
			/* waitsFor(function()	{
				return PrinterInstance.isConnected;
			}, '9sec wait for connection', ENABLE9K); */
			
			if (PrinterInstance.isConnected) {
				PrinterInstance.storeImage(printerDriveAndFileName, jpgimagepath_640px, 50, 50,handleStatusCallback);
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
			setObjective(jasmine.getEnv().currentSpec.description);
			setInstruction("1. Connect a Zebra printer with the device <br /> 2. Call storeImage with callback.");
			setExpected("1.  On successful storing image callback should return with STATUS_SUCCESS.<br />2.  File should be stored at  D:FILE.GRF on printer <br />3. On failure storing image callback should return with STATUS_ERROR ");
		});
		
		
		runs(function() {
				PrinterConnectiontype();
			});
		
		runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			connect_status = PrinterInstance.connect();
			/* waitsFor(function()	{
				return PrinterInstance.isConnected;
			}, '9sec wait for connection', ENABLE9K); */
			
			if (PrinterInstance.isConnected) {
				PrinterInstance.storeImage(printerDriveAndFileName, jpgimagepath_1024px, 150, 150,handleStatusCallback);
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
			setObjective(jasmine.getEnv().currentSpec.description);
			setInstruction("1. Connect a Zebra printer with the device <br /> 2. Call storeImage with callback.");
			setExpected("1.  On successful storing image callback should return with STATUS_SUCCESS.<br />2.  File should be stored at  D:FILE.GRF on printer <br />3. On failure storing image callback should return with STATUS_ERROR ");
		});
		
		
		runs(function() {
				PrinterConnectiontype();
			});
		
		runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			connect_status = PrinterInstance.connect();
			/* waitsFor(function()	{
				return PrinterInstance.isConnected;
			}, '9sec wait for connection', ENABLE9K); */
			
			if (PrinterInstance.isConnected) {
				PrinterInstance.storeImage(printerDriveAndFileName, jpgimagepath_2048px, -1, -1,handleStatusCallback);
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
			setObjective(jasmine.getEnv().currentSpec.description);
			setInstruction("1. Connect a Zebra printer with the device <br /> 2. Call storeImage with callback.");
			setExpected("1.  On successful storing image callback should return with STATUS_SUCCESS.<br />2.  File should be stored at  default E:FILE.GRF on printer <br />3. On failure storing image callback should return with STATUS_ERROR ");
		});
		
		
		runs(function() {
				PrinterConnectiontype();
			});
		
		runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			connect_status = PrinterInstance.connect();
			/* waitsFor(function()	{
				return PrinterInstance.isConnected;
			}, '9sec wait for connection', ENABLE9K); */
			
			if (PrinterInstance.isConnected) {
				PrinterInstance.storeImage(printerOnlyFileName, pngimagepath_320px, 50, 50,handleStatusCallback);
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
			setObjective(jasmine.getEnv().currentSpec.description);
			setInstruction("1. Connect a Zebra printer with the device <br /> 2. Call storeImage with callback.");
			setExpected("1.  On successful storing image callback should return with STATUS_SUCCESS.<br />2.  File should be stored at  D:FILE.GRF on printer <br />3. On failure storing image callback should return with STATUS_ERROR ");
		});
		
		
		runs(function() {
				PrinterConnectiontype();
			});
		
		runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			connect_status = PrinterInstance.connect();
			/* waitsFor(function()	{
				return PrinterInstance.isConnected;
			}, '9sec wait for connection', ENABLE9K); */
			
			if (PrinterInstance.isConnected) {
				PrinterInstance.storeImage(printerDriveAndFileName, pngimagepath_640px, 50, 50,handleStatusCallback);
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
			setObjective(jasmine.getEnv().currentSpec.description);
			setInstruction("1. Connect a Zebra printer with the device <br /> 2. Call storeImage with callback.");
			setExpected("1.  On successful storing image callback should return with STATUS_SUCCESS.<br />2.  File should be stored at  D:FILE.GRF on printer <br />3. On failure storing image callback should return with STATUS_ERROR ");
		});
		
		
		runs(function() {
				PrinterConnectiontype();
			});
		
		runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			connect_status = PrinterInstance.connect();
			/* waitsFor(function()	{
				return PrinterInstance.isConnected;
			}, '9sec wait for connection', ENABLE9K); */
			
			if (PrinterInstance.isConnected) {
				PrinterInstance.storeImage(printerDriveAndFileName, pngimagepath_1024px, 150, 150,handleStatusCallback);
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
			setObjective(jasmine.getEnv().currentSpec.description);
			setInstruction("1. Connect a Zebra printer with the device <br /> 2. Call storeImage with callback.");
			setExpected("1.  On successful storing image callback should return with STATUS_SUCCESS.<br />2.  File should be stored at  D:FILE.GRF on printer <br />3. On failure storing image callback should return with STATUS_ERROR ");
		});
		
		
		runs(function() {
				PrinterConnectiontype();
			});
		
		runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			connect_status = PrinterInstance.connect();
			/* waitsFor(function()	{
				return PrinterInstance.isConnected;
			}, '9sec wait for connection', ENABLE9K); */
			
			if (PrinterInstance.isConnected) {
				PrinterInstance.storeImage(printerDriveAndFileName, pngimagepath_2048px, -1, -1,handleStatusCallback);
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
			setObjective(jasmine.getEnv().currentSpec.description);
			setInstruction("1. Connect a Zebra printer with the device <br /> 2. Call storeImage with callback.");
			setExpected("1.  On successful storing image callback should return with STATUS_SUCCESS.<br />2.  File should be stored at  default E:FILE.GRF on printer <br />3. On failure storing image callback should return with STATUS_ERROR ");
		});
		
		
		runs(function() {
				PrinterConnectiontype();
			});
		
		runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			connect_status = PrinterInstance.connect();
			/* waitsFor(function()	{
				return PrinterInstance.isConnected;
			}, '9sec wait for connection', ENABLE9K); */
			
			if (PrinterInstance.isConnected) {
				PrinterInstance.storeImage(printerOnlyFileName, gifimagepath_320px, 50, 50,handleStatusCallback);
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
			setObjective(jasmine.getEnv().currentSpec.description);
			setInstruction("1. Connect a Zebra printer with the device <br /> 2. Call storeImage with callback.");
			setExpected("1.  On successful storing image callback should return with STATUS_SUCCESS.<br />2.  File should be stored at  D:FILE.GRF on printer <br />3. On failure storing image callback should return with STATUS_ERROR ");
		});
		
		
		runs(function() {
				PrinterConnectiontype();
			});
		
		runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			connect_status = PrinterInstance.connect();
			/* waitsFor(function()	{
				return PrinterInstance.isConnected;
			}, '9sec wait for connection', ENABLE9K); */
			
			if (PrinterInstance.isConnected) {
				PrinterInstance.storeImage(printerDriveAndFileName, gifimagepath_640px, 50, 50,handleStatusCallback);
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
			setObjective(jasmine.getEnv().currentSpec.description);
			setInstruction("1. Connect a Zebra printer with the device <br /> 2. Call storeImage with callback.");
			setExpected("1.  On successful storing image callback should return with STATUS_SUCCESS.<br />2.  File should be stored at  D:FILE.GRF on printer <br />3. On failure storing image callback should return with STATUS_ERROR ");
		});
		
		
		runs(function() {
				PrinterConnectiontype();
			});
		
		runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			connect_status = PrinterInstance.connect();
			/* waitsFor(function()	{
				return PrinterInstance.isConnected;
			}, '9sec wait for connection', ENABLE9K); */
			
			if (PrinterInstance.isConnected) {
				PrinterInstance.storeImage(printerDriveAndFileName, gifimagepath_1024px, 150, 150,handleStatusCallback);
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
			setObjective(jasmine.getEnv().currentSpec.description);
			setInstruction("1. Connect a Zebra printer with the device <br /> 2. Call storeImage with callback.");
			setExpected("1.  On successful storing image callback should return with STATUS_SUCCESS.<br />2.  File should be stored at  D:FILE.GRF on printer <br />3. On failure storing image callback should return with STATUS_ERROR ");
		});
		
		
		runs(function() {
				PrinterConnectiontype();
			});
		
		runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			connect_status = PrinterInstance.connect();
			/* waitsFor(function()	{
				return PrinterInstance.isConnected;
			}, '9sec wait for connection', ENABLE9K); */
			
			if (PrinterInstance.isConnected) {
				PrinterInstance.storeImage(printerDriveAndFileName, gifimagepath_2048px, -1, -1,handleStatusCallback);
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
			setObjective(jasmine.getEnv().currentSpec.description);
			setInstruction("1. Connect a Zebra printer with the device <br /> 2. Call storeImage with callback.");
			setExpected("1.  On successful storing image should return with STATUS_SUCCESS.<br />2.  File should be stored at  E:FILE.GRF on printer <br />3. On failure storing image should return with STATUS_ERROR ");
		});
		
		
		runs(function() {
				PrinterConnectiontype();
			});
		
		runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			connect_status = PrinterInstance.connect();
			/* waitsFor(function()	{
				return PrinterInstance.isConnected;
			}, '9sec wait for connection', ENABLE9K); */
			
			if (PrinterInstance.isConnected) {
				var storeimage_status = PrinterInstance.storeImage(printerOnlyFileName, bmpimagepath_320px, 50, 50);
				displayResult("Result", storeimage_status);	
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
			setObjective(jasmine.getEnv().currentSpec.description);
			setInstruction("1. Connect a Zebra printer with the device <br /> 2. Call storeImage with callback.");
			setExpected("1.  On successful storing image should return with STATUS_SUCCESS.<br />2.  File should be stored at  D:FILE.GRF on printer <br />3. On failure storing image should return with STATUS_ERROR ");
		});
		
		
		runs(function() {
				PrinterConnectiontype();
			});
		
		runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			connect_status = PrinterInstance.connect();
			/* waitsFor(function()	{
				return PrinterInstance.isConnected;
			}, '9sec wait for connection', ENABLE9K); */
			
			if (PrinterInstance.isConnected) {
				var storeimage_status = PrinterInstance.storeImage(printerDriveAndFileName, bmpimagepath_640px, 50, 50);
				displayResult("Result", storeimage_status);
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
			setObjective(jasmine.getEnv().currentSpec.description);
			setInstruction("1. Connect a Zebra printer with the device <br /> 2. Call storeImage with callback.");
			setExpected("1.  On successful storing image should return with STATUS_SUCCESS.<br />2.  File should be stored at  D:FILE.GRF on printer <br />3. On failure storing image should return with STATUS_ERROR ");
		});
		
		
		runs(function() {
				PrinterConnectiontype();
			});
		
		runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			connect_status = PrinterInstance.connect();
			/* waitsFor(function()	{
				return PrinterInstance.isConnected;
			}, '9sec wait for connection', ENABLE9K); */
			
			if (PrinterInstance.isConnected) {
				var storeimage_status = PrinterInstance.storeImage(printerDriveAndFileName, bmpimagepath_1024px, 150, 150);
				displayResult("Result", storeimage_status);
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
			setObjective(jasmine.getEnv().currentSpec.description);
			setInstruction("1. Connect a Zebra printer with the device <br /> 2. Call storeImage with callback.");
			setExpected("1.  On successful storing image should return with STATUS_SUCCESS.<br />2.  File should be stored at  D:FILE.GRF on printer <br />3. On failure storing image should return with STATUS_ERROR ");
		});
		
		
		runs(function() {
				PrinterConnectiontype();
			});
		
		runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			connect_status = PrinterInstance.connect();
			/* waitsFor(function()	{
				return PrinterInstance.isConnected;
			}, '9sec wait for connection', ENABLE9K); */
			
			if (PrinterInstance.isConnected) {
				var storeimage_status = PrinterInstance.storeImage(printerDriveAndFileName, bmpimagepath_2048px, -1, -1);
				displayResult("Result", storeimage_status);
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
			setObjective(jasmine.getEnv().currentSpec.description);
			setInstruction("1. Connect a Zebra printer with the device <br /> 2. Call storeImage with callback.");
			setExpected("1.  On successful storing image should return with STATUS_SUCCESS.<br />2.  File should be stored at  E:FILE.GRF on printer <br />3. On failure storing image should return with STATUS_ERROR ");
		});
		
		
		runs(function() {
				PrinterConnectiontype();
			});
		
		runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			connect_status = PrinterInstance.connect();
			/* waitsFor(function()	{
				return PrinterInstance.isConnected;
			}, '9sec wait for connection', ENABLE9K); */
			
			if (PrinterInstance.isConnected) {
				var storeimage_status = PrinterInstance.storeImage(printerOnlyFileName, gifimagepath_320px, 50, 50);
				displayResult("Result", storeimage_status);
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
			setObjective(jasmine.getEnv().currentSpec.description);
			setInstruction("1. Connect a Zebra printer with the device <br /> 2. Call storeImage with callback.");
			setExpected("1.  On successful storing image should return with STATUS_SUCCESS.<br />2.  File should be stored at  D:FILE.GRF on printer <br />3. On failure storing image should return with STATUS_ERROR ");
		});
		
		
		runs(function() {
				PrinterConnectiontype();
			});
		
		runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			connect_status = PrinterInstance.connect();
			/* waitsFor(function()	{
				return PrinterInstance.isConnected;
			}, '9sec wait for connection', ENABLE9K); */
			
			if (PrinterInstance.isConnected) {
				var storeimage_status = PrinterInstance.storeImage(printerDriveAndFileName, gifimagepath_640px, 50, 50);
				displayResult("Result", storeimage_status);
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
			setObjective(jasmine.getEnv().currentSpec.description);
			setInstruction("1. Connect a Zebra printer with the device <br /> 2. Call storeImage with callback.");
			setExpected("1.  On successful storing image should return with STATUS_SUCCESS.<br />2.  File should be stored at  D:FILE.GRF on printer <br />3. On failure storing image should return with STATUS_ERROR ");
		});
		
		
		runs(function() {
				PrinterConnectiontype();
			});
		
		runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			connect_status = PrinterInstance.connect();
			/* waitsFor(function()	{
				return PrinterInstance.isConnected;
			}, '9sec wait for connection', ENABLE9K); */
			
			if (PrinterInstance.isConnected) {
				var storeimage_status = PrinterInstance.storeImage(printerDriveAndFileName, gifimagepath_1024px, 150, 150);
				displayResult("Result", storeimage_status);
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
			setObjective(jasmine.getEnv().currentSpec.description);
			setInstruction("1. Connect a Zebra printer with the device <br /> 2. Call storeImage with callback.");
			setExpected("1.  On successful storing image should return with STATUS_SUCCESS.<br />2.  File should be stored at  D:FILE.GRF on printer <br />3. On failure storing image should return with STATUS_ERROR ");
		});
		
		
		runs(function() {
				PrinterConnectiontype();
			});
		
		runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			connect_status = PrinterInstance.connect();
			/* waitsFor(function()	{
				return PrinterInstance.isConnected;
			}, '9sec wait for connection', ENABLE9K); */
			
			if (PrinterInstance.isConnected) {
				var storeimage_status = PrinterInstance.storeImage(printerDriveAndFileName, gifimagepath_2048px, -1, -1);
				displayResult("Result", storeimage_status);
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
			setObjective(jasmine.getEnv().currentSpec.description);
			setInstruction("1. Connect a Zebra printer with the device <br /> 2. Call storeImage with callback.");
			setExpected("1.  On successful storing image should return with STATUS_SUCCESS.<br />2.  File should be stored at  E:FILE.GRF on printer <br />3. On failure storing image should return with STATUS_ERROR ");
		});
		
		
		runs(function() {
				PrinterConnectiontype();
			});
		
		runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			connect_status = PrinterInstance.connect();
			/* waitsFor(function()	{
				return PrinterInstance.isConnected;
			}, '9sec wait for connection', ENABLE9K); */
			
			if (PrinterInstance.isConnected) {
				var storeimage_status = PrinterInstance.storeImage(printerOnlyFileName, jpgimagepath_320px, 50, 50);
				displayResult("Result", storeimage_status);
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
			setObjective(jasmine.getEnv().currentSpec.description);
			setInstruction("1. Connect a Zebra printer with the device <br /> 2. Call storeImage with callback.");
			setExpected("1.  On successful storing image should return with STATUS_SUCCESS.<br />2.  File should be stored at  D:FILE.GRF on printer <br />3. On failure storing image should return with STATUS_ERROR ");
		});
		
		
		runs(function() {
				PrinterConnectiontype();
			});
		
		runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			connect_status = PrinterInstance.connect();
			/* waitsFor(function()	{
				return PrinterInstance.isConnected;
			}, '9sec wait for connection', ENABLE9K); */
			
			if (PrinterInstance.isConnected) {
				var storeimage_status = PrinterInstance.storeImage(printerDriveAndFileName, jpgimagepath_640px, 50, 50);
				displayResult("Result", storeimage_status);
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
			setObjective(jasmine.getEnv().currentSpec.description);
			setInstruction("1. Connect a Zebra printer with the device <br /> 2. Call storeImage with callback.");
			setExpected("1.  On successful storing image should return with STATUS_SUCCESS.<br />2.  File should be stored at  D:FILE.GRF on printer <br />3. On failure storing image should return with STATUS_ERROR ");
		});
		
		
		runs(function() {
				PrinterConnectiontype();
			});
		
		runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			connect_status = PrinterInstance.connect();
			/* waitsFor(function()	{
				return PrinterInstance.isConnected;
			}, '9sec wait for connection', ENABLE9K); */
			
			if (PrinterInstance.isConnected) {
				var storeimage_status = PrinterInstance.storeImage(printerDriveAndFileName, jpgimagepath_1024px, 150, 150);
				displayResult("Result", storeimage_status);
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
			setObjective(jasmine.getEnv().currentSpec.description);
			setInstruction("1. Connect a Zebra printer with the device <br /> 2. Call storeImage with callback.");
			setExpected("1.  On successful storing image should return with STATUS_SUCCESS.<br />2.  File should be stored at  D:FILE.GRF on printer <br />3. On failure storing image should return with STATUS_ERROR ");
		});
		
		
		runs(function() {
				PrinterConnectiontype();
			});
		
		runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			connect_status = PrinterInstance.connect();
			/* waitsFor(function()	{
				return PrinterInstance.isConnected;
			}, '9sec wait for connection', ENABLE9K); */
			
			if (PrinterInstance.isConnected) {
				var storeimage_status = PrinterInstance.storeImage(printerDriveAndFileName, jpgimagepath_2048px, -1, -1);
				displayResult("Result", storeimage_status);
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
			setObjective(jasmine.getEnv().currentSpec.description);
			setInstruction("1. Connect a Zebra printer with the device <br /> 2. Call storeImage with callback.");
			setExpected("1.  On successful storing image should return with STATUS_SUCCESS.<br />2.  File should be stored at  E:FILE.GRF on printer <br />3. On failure storing image should return with STATUS_ERROR ");
		});
		
		
		runs(function() {
				PrinterConnectiontype();
			});
		
		runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			connect_status = PrinterInstance.connect();
			/* waitsFor(function()	{
				return PrinterInstance.isConnected;
			}, '9sec wait for connection', ENABLE9K); */
			
			if (PrinterInstance.isConnected) {
				var storeimage_status = PrinterInstance.storeImage(printerOnlyFileName, pngimagepath_320px, 50, 50);
				displayResult("Result", storeimage_status);
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
			setObjective(jasmine.getEnv().currentSpec.description);
			setInstruction("1. Connect a Zebra printer with the device <br /> 2. Call storeImage with callback.");
			setExpected("1.  On successful storing image should return with STATUS_SUCCESS.<br />2.  File should be stored at  D:FILE.GRF on printer <br />3. On failure storing image should return with STATUS_ERROR ");
		});
		
		
		runs(function() {
				PrinterConnectiontype();
			});
		
		runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			connect_status = PrinterInstance.connect();
			/* waitsFor(function()	{
				return PrinterInstance.isConnected;
			}, '9sec wait for connection', ENABLE9K); */
			
			if (PrinterInstance.isConnected) {
				var storeimage_status = PrinterInstance.storeImage(printerDriveAndFileName, pngimagepath_640px, 50, 50);
				displayResult("Result", storeimage_status);
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
			setObjective(jasmine.getEnv().currentSpec.description);
			setInstruction("1. Connect a Zebra printer with the device <br /> 2. Call storeImage with callback.");
			setExpected("1.  On successful storing image should return with STATUS_SUCCESS.<br />2.  File should be stored at  D:FILE.GRF on printer <br />3. On failure storing image should return with STATUS_ERROR ");
		});
		
		
		runs(function() {
				PrinterConnectiontype();
			});
		
		runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			connect_status = PrinterInstance.connect();
			/* waitsFor(function()	{
				return PrinterInstance.isConnected;
			}, '9sec wait for connection', ENABLE9K); */
			
			if (PrinterInstance.isConnected) {
				var storeimage_status = PrinterInstance.storeImage(printerDriveAndFileName, pngimagepath_1024px, 150, 150);
				displayResult("Result", storeimage_status);
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
			setObjective(jasmine.getEnv().currentSpec.description);
			setInstruction("1. Connect a Zebra printer with the device <br /> 2. Call storeImage with callback.");
			setExpected("1.  On successful storing image should return with STATUS_SUCCESS.<br />2.  File should be stored at  D:FILE.GRF on printer <br />3. On failure storing image should return with STATUS_ERROR ");
		});
		
		
		runs(function() {
				PrinterConnectiontype();
			});
		
		runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			connect_status = PrinterInstance.connect();
			/* waitsFor(function()	{
				return PrinterInstance.isConnected;
			}, '9sec wait for connection', ENABLE9K); */
			
			if (PrinterInstance.isConnected) {
				var storeimage_status = PrinterInstance.storeImage(printerDriveAndFileName, pngimagepath_2048px, -1, -1);
				displayResult("Result", storeimage_status);
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
			setObjective(jasmine.getEnv().currentSpec.description);
			setInstruction("1. Connect a Zebra printer with the device <br /> 2. Call storeImage with Anonymous Callback.");
			setExpected("1.  On successful storing image callback should return with STATUS_SUCCESS.<br />2.  File should be stored at  E:FILE.GRF on printer <br />3. On failure storing image callback should return with STATUS_ERROR ");
		});
		
		
		runs(function() {
				PrinterConnectiontype();
			});
		
		runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			connect_status = PrinterInstance.connect();
			/* waitsFor(function()	{
				return PrinterInstance.isConnected;
			}, '9sec wait for connection', ENABLE9K); */
			
			if (PrinterInstance.isConnected) {
				PrinterInstance.storeImage(printerOnlyFileName, bmpimagepath_320px, 50, 50, function(data){handleStatusCallback(data)});
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
			setObjective(jasmine.getEnv().currentSpec.description);
			setInstruction("1. Connect a Zebra printer with the device <br /> 2. Call storeImage with Anonymous Callback.");
			setExpected("1.  On successful storing image callback should return with STATUS_SUCCESS.<br />2.  File should be stored at  D:FILE.GRF on printer <br />3. On failure storing image callback should return with STATUS_ERROR ");
		});
		
		
		runs(function() {
				PrinterConnectiontype();
			});
		
		runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			connect_status = PrinterInstance.connect();
			/* waitsFor(function()	{
				return PrinterInstance.isConnected;
			}, '9sec wait for connection', ENABLE9K); */
			
			if (PrinterInstance.isConnected) {
				PrinterInstance.storeImage(printerDriveAndFileName, gifimagepath_640px, 50, 50,function(data){handleStatusCallback(data)});
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
			setObjective(jasmine.getEnv().currentSpec.description);
			setInstruction("1. Connect a Zebra printer with the device <br /> 2. Call storeImage with Anonymous Callback.");
			setExpected("1.  On successful storing image callback should return with STATUS_SUCCESS.<br />2.  File should be stored at  D:FILE.GRF on printer <br />3. On failure storing image callback should return with STATUS_ERROR ");
		});
		
		
		runs(function() {
				PrinterConnectiontype();
			});
		
		runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			connect_status = PrinterInstance.connect();
			/* waitsFor(function()	{
				return PrinterInstance.isConnected;
			}, '9sec wait for connection', ENABLE9K); */
			
			if (PrinterInstance.isConnected) {
				PrinterInstance.storeImage(printerDriveAndFileName, jpgimagepath_1024px, 150, 150);
			}
			else {
				displayResult("Failed to connect to the printer", connect_status,function(data){handleStatusCallback(data)});	
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
			setObjective(jasmine.getEnv().currentSpec.description);
			setInstruction("1. Connect a Zebra printer with the device <br /> 2. Call storeImage with Anonymous Callback.");
			setExpected("1.  On successful storing image callback should return with STATUS_SUCCESS.<br />2.  File should be stored at  D:FILE.GRF on printer <br />3. On failure storing image callback should return with STATUS_ERROR ");
		});
		
		
		runs(function() {
				PrinterConnectiontype();
			});
		
		runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			connect_status = PrinterInstance.connect();
			/* waitsFor(function()	{
				return PrinterInstance.isConnected;
			}, '9sec wait for connection', ENABLE9K); */
			
			if (PrinterInstance.isConnected) {
				PrinterInstance.storeImage(printerDriveAndFileName, pngimagepath_2048px, -1, -1,function(data){handleStatusCallback(data)});
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
	
	it("VTXXX-0223 | Print PDF file with Path to PDF file, x=50, y =100 and options as width as -1, height as -1 and isInsideFormat as false printImageFromFile method ( with Callback )" , function() {
		runs(function() {
			setObjective(jasmine.getEnv().currentSpec.description);
			setInstruction("1. Connect a Zebra printer with the device <br /> 2. Call printImageFromFile with callback.");
			setExpected("1. On failure print callback should return with STATUS_ERROR ");
		});
		
		
		runs(function() {
				PrinterConnectiontype();
			});
		
		runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			connect_status = PrinterInstance.connect();
			/* waitsFor(function()	{
				return PrinterInstance.isConnected;
			}, '9sec wait for connection', ENABLE9K); */
			if (PrinterInstance.isConnected) {
				PrinterInstance.printImageFromFile(pdffilepath, 50, 100, {'height':-1, 'width':-1, 'isInsideFormat':false}, handleStatusCallback);
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
	
	it("VTXXX-0224 | storeImage method with valid printerDriveAndFileName D:FILE.GRF, imageFilePathOnDevice as PDF, width = 50, height = 50  ( with Callback)" , function() {
		runs(function() {
			setObjective(jasmine.getEnv().currentSpec.description);
			setInstruction("1. Connect a Zebra printer with the device <br /> 2. Call storeImage with callback.");
			setExpected("1. On failure storing image callback should return with STATUS_ERROR ");
		});
		
		
		runs(function() {
				PrinterConnectiontype();
			});
		
		runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			connect_status = PrinterInstance.connect();
			/* waitsFor(function()	{
				return PrinterInstance.isConnected;
			}, '9sec wait for connection', ENABLE9K); */
			
			if (PrinterInstance.isConnected) {
				PrinterInstance.storeImage(printerDriveAndFileName, pdffilepath, 50, 50,handleStatusCallback);
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
	
	 it('Set maxTimeoutForRead 10 sec and call retrieveFileNames', function() {
        dispTestCaseRunning('1. Connect a Zebra printer with the device using Bluetooth setting.<br/>2. Search for the Zebra printer and get id of the Rho.Printer.<br/>3. By using the Zebra printer ID, Create an instance.<br/>4. By using the instance, connect to the Rho.Printer.<br/>5. Store some files in the Zebra printer like ( image1.jpg, img2.png, img3.bmp, testfile.pdf, printarray.zpl, printhash.zpl and file with no extention )<br/>6. Set maxTimeoutForRead = 10 sec<br/>6. Retrieve file names stored on the printer by calling Instance.PrinterZebra.retrieveFileNames() with callback.<br/>7. Once the file names are retrieved Disconnect the printer');
        dispExpectedResult('1. Should be able to retrieve filenames in 10 sec.<br/>2. Timeout error should be thrown on failure to retrieve the files in 10sec.');
        //Common Method implemented to wait for tester to run the test.Code available in specHelper.js
        _result.waitToRunTest();
        runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			PrinterInstance.maxTimeoutForRead = 10000;
			connect_status = PrinterInstance.connect();
			if (PrinterInstance.isConnected) {
				retrievedfilenames = PrinterInstance.retrieveFileNames(retrieveCallback);
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
		
		
        //Common Method implemented to wait for tester to make it pass or fail.Code available in specHelper.js
        _result.waitForResponse();
    });
    it('maxTimeoutForRead 0 sec', function() {
        dispTestCaseRunning('1. Connect a Zebra printer with the device using Bluetooth setting.<br/>2. Search for the Zebra printer and get id of the Rho.Printer.<br/>3. By using the Zebra printer ID, Create an instance.<br/>4. By using the instance, connect to the Rho.Printer.<br/>5. Store some files in the Zebra printer like ( image1.jpg, img2.png, img3.bmp, testfile.pdf, printarray.zpl, printhash.zpl and file with no extention )<br/>6. Set maxTimeoutForRead = 0 sec<br/>6. Retrieve file names stored on the printer by calling Instance.PrinterZebra.retrieveFileNames() with callback.<br/>7. Once the file names are retrieved Disconnect the printer');
        dispExpectedResult('1.  Timeout error should be thrown on failure to retrieve the files in 0sec.');
        //Common Method implemented to wait for tester to run the test.Code available in specHelper.js
        _result.waitToRunTest();
		
         runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			PrinterInstance.maxTimeoutForRead = 0;
			connect_status = PrinterInstance.connect();
			if (PrinterInstance.isConnected) {
				retrievedfilenames = PrinterInstance.retrieveFileNames(retrieveCallback);
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
		
		
        //Common Method implemented to wait for tester to make it pass or fail.Code available in specHelper.js
        _result.waitForResponse();
    });
    it('maxTimeoutForRead -1 sec', function() {
        dispTestCaseRunning('1. Connect a Zebra printer with the device using Bluetooth setting.<br/>2. Search for the Zebra printer and get id of the Rho.Printer.<br/>3. By using the Zebra printer ID, Create an instance.<br/>4. By using the instance, connect to the Rho.Printer.<br/>5. Store some files in the Zebra printer like ( image1.jpg, img2.png, img3.bmp, testfile.pdf, printarray.zpl, printhash.zpl and file with no extention )<br/>6. Set maxTimeoutForRead = -1 sec<br/>6. Retrieve file names stored on the printer by calling Instance.PrinterZebra.retrieveFileNames() with callback.<br/>7. Once the file names are retrieved Disconnect the printer');
        dispExpectedResult('1.  Timeout error should be thrown on failure to retrieve the files.');
        //Common Method implemented to wait for tester to run the test.Code available in specHelper.js
        _result.waitToRunTest();
		
		runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			PrinterInstance.maxTimeoutForRead = -1;
			connect_status = PrinterInstance.connect();
			if (PrinterInstance.isConnected) {
				retrievedfilenames = PrinterInstance.retrieveFileNames(retrieveCallback);
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
		
        //Common Method implemented to wait for tester to make it pass or fail.Code available in specHelper.js
        _result.waitForResponse();
    });
    it('Set maxTimeoutForOpen 10 sec and call connect', function() {
        dispTestCaseRunning('1. Connect a Zebra printer with the device using Bluetooth setting.<br/>2. Search for the Zebra printer and get id of the Rho.Printer.<br/>3. By using the Zebra printer ID, Create an instance.<br/>5. set maxTimeoutForOpen = 10 sec<br/>6. By using the instance, connect to the Rho.Printer.');
        dispExpectedResult('1. Should be able to Open TCP connection and connect.<br/>2. Timeout error should be thrown on fail.');
        //Common Method implemented to wait for tester to run the test.Code available in specHelper.js
        _result.waitToRunTest();
	   
	   	runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			PrinterInstance.maxTimeoutForOpen = 10000;
			connect_status = PrinterInstance.connect();
			if (PrinterInstance.isConnected) {
				displayResult("Connected ", connect_status);
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
	   
        //Common Method implemented to wait for tester to make it pass or fail.Code available in specHelper.js
        _result.waitForResponse();
    });
    it('maxTimeoutForOpen 0 sec', function() {
        dispTestCaseRunning('1. Connect a Zebra printer with the device using Bluetooth setting.<br/>2. Search for the Zebra printer and get id of the Rho.Printer.<br/>3. By using the Zebra printer ID, Create an instance.<br/>5. set maxTimeoutForOpen = 0 sec<br/>6. By using the instance, connect to the Rho.Printer.');
        dispExpectedResult('1.  Timeout error should be thrown on failure to connect in 0sec.');
        //Common Method implemented to wait for tester to run the test.Code available in specHelper.js
        _result.waitToRunTest();
		
	   	runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			PrinterInstance.maxTimeoutForOpen = 0;
			connect_status = PrinterInstance.connect();
			if (PrinterInstance.isConnected) {
				displayResult("Connected ", connect_status);
			}
			else {
				displayResult("Failed to connect to the printer", connect_status);	
			}
		});
		
        //Common Method implemented to wait for tester to make it pass or fail.Code available in specHelper.js
        _result.waitForResponse();
    });
    it('maxTimeoutForOpen -1 sec', function() {
        dispTestCaseRunning('1. Connect a Zebra printer with the device using Bluetooth setting.<br/>2. Search for the Zebra printer and get id of the Rho.Printer.<br/>3. By using the Zebra printer ID, Create an instance.<br/>5. set maxTimeoutForOpen = -1 sec<br/>6. By using the instance, connect to the Rho.Printer.');
        dispExpectedResult('1.  Timeout error should be thrown on failure to connect.');
        //Common Method implemented to wait for tester to run the test.Code available in specHelper.js
        _result.waitToRunTest();
		
	   	runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			PrinterInstance.maxTimeoutForOpen = -1;
			connect_status = PrinterInstance.connect();
			if (PrinterInstance.isConnected) {
				displayResult("Connected ", connect_status);
			}
			else {
				displayResult("Failed to connect to the printer", connect_status);	
			}
		});
		
        //Common Method implemented to wait for tester to make it pass or fail.Code available in specHelper.js
        _result.waitForResponse();
    });
    it('timeToWaitForMoreData 10 sec after retrieve files', function() {
        dispTestCaseRunning('1. Connect a Zebra printer with the device using Bluetooth setting.<br/>2. Search for the Zebra printer and get id of the Rho.Printer.<br/>3. By using the Zebra printer ID, Create an instance.<br/>4. By using the instance, connect to the Rho.Printer.<br/>5. Store some files in the Zebra printer like ( image1.jpg, img2.png, img3.bmp, testfile.pdf, printarray.zpl, printhash.zpl and file with no extention )<br/>6. Set maxTimeoutForRead = 1 sec<br/>7. set timeToWaitForMoreData = 10 sec<br/>6. Retrieve file names stored on the printer by calling Instance.PrinterZebra.retrieveFileNames() with callback.<br/>7. Once the file names are retrieved Disconnect the printer');
        dispExpectedResult('1. Should be able to wait 10 sec for more data after timeout for read occurs.');
        //Common Method implemented to wait for tester to run the test.Code available in specHelper.js
        _result.waitToRunTest();
		
         runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			PrinterInstance.maxTimeoutForRead = 1000;
			PrinterInstance.timeToWaitForMoreData = 10000;
			connect_status = PrinterInstance.connect();
			if (PrinterInstance.isConnected) {
				retrievedfilenames = PrinterInstance.retrieveFileNames(retrieveCallback);
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
		
		
        //Common Method implemented to wait for tester to make it pass or fail.Code available in specHelper.js
        _result.waitForResponse();
    });
    it('timeToWaitForMoreData -1 sec after retrieve files', function() {
        dispTestCaseRunning('1. Connect a Zebra printer with the device using Bluetooth setting.<br/>2. Search for the Zebra printer and get id of the Rho.Printer.<br/>3. By using the Zebra printer ID, Create an instance.<br/>4. By using the instance, connect to the Rho.Printer.<br/>5. Store some files in the Zebra printer like ( image1.jpg, img2.png, img3.bmp, testfile.pdf, printarray.zpl, printhash.zpl and file with no extention )<br/>6. Set maxTimeoutForRead = 1 sec<br/>7. set timeToWaitForMoreData = -1 sec<br/>6. Retrieve file names stored on the printer by calling Instance.PrinterZebra.retrieveFileNames() with callback.<br/>7. Once the file names are retrieved Disconnect the printer');
        dispExpectedResult('1.  Timeout error should be thrown on failure.');
        //Common Method implemented to wait for tester to run the test.Code available in specHelper.js
        _result.waitToRunTest();
		
         runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			PrinterInstance.maxTimeoutForRead = 1000;
			PrinterInstance.timeToWaitForMoreData = -1;
			connect_status = PrinterInstance.connect();
			if (PrinterInstance.isConnected) {
				retrievedfilenames = PrinterInstance.retrieveFileNames(retrieveCallback);
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
        //Common Method implemented to wait for tester to make it pass or fail.Code available in specHelper.js
        _result.waitForResponse();
    });
    it('timeToWaitAfterReadInMilliseconds 10 sec', function() {
        dispTestCaseRunning('1. Connect a Zebra printer with the device using Bluetooth setting.<br/>2. Search for the Zebra printer and get id of the Rho.Printer.<br/>3. By using the Zebra printer ID, Create an instance.<br/>4. By using the instance, connect to the Rho.Printer.<br/>5. Store some files in the Zebra printer like ( image1.jpg, img2.png, img3.bmp, testfile.pdf, printarray.zpl, printhash.zpl and file with no extention )<br/>6. Set maxTimeoutForRead = 10 sec<br/>7. set timeToWaitAfterReadInMilliseconds = 10 sec<br/>6. Retrieve file names stored on the printer by calling Instance.PrinterZebra.retrieveFileNames() with callback.<br/>7. Once the file names are retrieved Disconnect the printer');
        dispExpectedResult('1. Should wait for 10 sec more after retrieving files.');
        //Common Method implemented to wait for tester to run the test.Code available in specHelper.js
        _result.waitToRunTest();
		
         runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			PrinterInstance.maxTimeoutForRead = 10000;
			PrinterInstance.timeToWaitAfterReadInMilliseconds = 10000;
			connect_status = PrinterInstance.connect();
			if (PrinterInstance.isConnected) {
				retrievedfilenames = PrinterInstance.retrieveFileNames(retrieveCallback);
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
		
        //Common Method implemented to wait for tester to make it pass or fail.Code available in specHelper.js
        _result.waitForResponse();
    });
    it('timeToWaitAfterReadInMilliseconds 0 sec', function() {
        dispTestCaseRunning('1. Connect a Zebra printer with the device using Bluetooth setting.<br/>2. Search for the Zebra printer and get id of the Rho.Printer.<br/>3. By using the Zebra printer ID, Create an instance.<br/>4. By using the instance, connect to the Rho.Printer.<br/>5. Store some files in the Zebra printer like ( image1.jpg, img2.png, img3.bmp, testfile.pdf, printarray.zpl, printhash.zpl and file with no extention )<br/>6. Set maxTimeoutForRead = 10 sec<br/>7. set timeToWaitAfterReadInMilliseconds = 0 sec<br/>6. Retrieve file names stored on the printer by calling Instance.PrinterZebra.retrieveFileNames() with callback.<br/>7. Once the file names are retrieved Disconnect the printer');
        dispExpectedResult('1. Should wait for 0 sec more after retrieving files.');
        //Common Method implemented to wait for tester to run the test.Code available in specHelper.js
        _result.waitToRunTest();
		
         runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			PrinterInstance.maxTimeoutForRead = 10000;
			PrinterInstance.timeToWaitAfterReadInMilliseconds = 0;
			connect_status = PrinterInstance.connect();
			if (PrinterInstance.isConnected) {
				retrievedfilenames = PrinterInstance.retrieveFileNames(retrieveCallback);
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
		
        //Common Method implemented to wait for tester to make it pass or fail.Code available in specHelper.js
        _result.waitForResponse();
    });
    it('timeToWaitAfterReadInMilliseconds -1 sec', function() {
        dispTestCaseRunning('1. Connect a Zebra printer with the device using Bluetooth setting.<br/>2. Search for the Zebra printer and get id of the Rho.Printer.<br/>3. By using the Zebra printer ID, Create an instance.<br/>4. By using the instance, connect to the Rho.Printer.<br/>5. Store some files in the Zebra printer like ( image1.jpg, img2.png, img3.bmp, testfile.pdf, printarray.zpl, printhash.zpl and file with no extention )<br/>6. Set maxTimeoutForRead = 10 sec<br/>7. set timeToWaitAfterReadInMilliseconds = -1 sec<br/>6. Retrieve file names stored on the printer by calling Instance.PrinterZebra.retrieveFileNames() with callback.<br/>7. Once the file names are retrieved Disconnect the printer');
        dispExpectedResult('1. Should wait for -1 sec more after retrieving files.');
        //Common Method implemented to wait for tester to run the test.Code available in specHelper.js
        _result.waitToRunTest();
		
         runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			PrinterInstance.maxTimeoutForRead = 10000;
			PrinterInstance.timeToWaitAfterReadInMilliseconds = -1;
			connect_status = PrinterInstance.connect();
			if (PrinterInstance.isConnected) {
				retrievedfilenames = PrinterInstance.retrieveFileNames(retrieveCallback);
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
		
        //Common Method implemented to wait for tester to make it pass or fail.Code available in specHelper.js
        _result.waitForResponse();
    });
    it('timeToWaitAfterWriteInMilliseconds 10 sec', function() {
        dispTestCaseRunning('1. Connect a Zebra printer with the device using Bluetooth setting.<br/>2. Search for the Zebra printer and get id of the Rho.Printer.<br/>3. By using the Zebra printer ID, Create an instance.<br/>4. By using the instance, connect to the Rho.Printer.<br/>5. Store some files in the Zebra printer like ( image1.jpg, img2.png, img3.bmp, testfile.pdf, printarray.zpl, printhash.zpl and file with no extention )<br/>6. set timeToWaitAfterWriteInMilliseconds = 10 sec<br/>7. Store image files with callback.<br/>8. Once the file names are retrieved Disconnect the printer');
        dispExpectedResult('1. Should wait for 10 sec more after storing image files files.');
        //Common Method implemented to wait for tester to run the test.Code available in specHelper.js
        _result.waitToRunTest();
		
         runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			PrinterInstance.timeToWaitAfterWriteInMilliseconds = 10000;
			connect_status = PrinterInstance.connect();
			if (PrinterInstance.isConnected) {
				PrinterInstance.storeImage(printerDriveAndFileName, bmpimagepath_320px, 50, 50,handleStatusCallback);
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
		
        //Common Method implemented to wait for tester to make it pass or fail.Code available in specHelper.js
        _result.waitForResponse();
    });
    it('timeToWaitAfterWriteInMilliseconds 0 sec', function() {
        dispTestCaseRunning('1. Connect a Zebra printer with the device using Bluetooth setting.<br/>2. Search for the Zebra printer and get id of the Rho.Printer.<br/>3. By using the Zebra printer ID, Create an instance.<br/>4. By using the instance, connect to the Rho.Printer.<br/>5. Store some files in the Zebra printer like ( image1.jpg, img2.png, img3.bmp, testfile.pdf, printarray.zpl, printhash.zpl and file with no extention )<br/>6. set timeToWaitAfterWriteInMilliseconds = 0 sec<br/>6. Store image files with callback.<br/>7. Once the file names are retrieved Disconnect the printer');
        dispExpectedResult('1. Should wait for 0 sec more after storing image files files.');
        //Common Method implemented to wait for tester to run the test.Code available in specHelper.js
        _result.waitToRunTest();
		
		 runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			PrinterInstance.timeToWaitAfterWriteInMilliseconds = 0;
			connect_status = PrinterInstance.connect();
			if (PrinterInstance.isConnected) {
				PrinterInstance.storeImage(printerDriveAndFileName, bmpimagepath_320px, 50, 50,handleStatusCallback);
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
		
        //Common Method implemented to wait for tester to make it pass or fail.Code available in specHelper.js
        _result.waitForResponse();
    });
    it('timeToWaitAfterWriteInMilliseconds -1 sec', function() {
        dispTestCaseRunning('1. Connect a Zebra printer with the device using Bluetooth setting.<br/>2. Search for the Zebra printer and get id of the Rho.Printer.<br/>3. By using the Zebra printer ID, Create an instance.<br/>4. By using the instance, connect to the Rho.Printer.<br/>5. Store some files in the Zebra printer like ( image1.jpg, img2.png, img3.bmp, testfile.pdf, printarray.zpl, printhash.zpl and file with no extention )<br/>7. set timeToWaitAfterWriteInMilliseconds = -1 sec<br/>6. Store image files with callback.<br/>7. Once the file names are retrieved Disconnect the printer');
        dispExpectedResult('1. Should wait for -1 sec more after storing image files files.');
        //Common Method implemented to wait for tester to run the test.Code available in specHelper.js
        _result.waitToRunTest();
		
		
		 runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			PrinterInstance.timeToWaitAfterWriteInMilliseconds = -1;
			connect_status = PrinterInstance.connect();
			if (PrinterInstance.isConnected) {
				PrinterInstance.storeImage(printerDriveAndFileName, bmpimagepath_320px, 50, 50,handleStatusCallback);
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
		
		
        //Common Method implemented to wait for tester to make it pass or fail.Code available in specHelper.js
        _result.waitForResponse();
    });
	
	
	it("VTXXX-0225 | requestState Method with callback (check All Zebra printer states)  " , function() {
		runs(function() {
			setObjective(jasmine.getEnv().currentSpec.description);
			setInstruction("1. Connect a Zebra printer with the device <br /> 2. Call requestState.");
			setExpected("1. The method should return STATUS_SUCCESS.<br />2. The following results should be observed in the result: <br />1. PRINTER_STATE_IS_HEAD_COLD = true if the head is cold.<br />2. PRINTER_STATE_IS_HEAD_OPEN =  true if the head is open<br />3. PRINTER_STATE_IS_HEAD_TOO_HOT = true if the head is too hot<br />4. PRINTER_STATE_IS_PARTIAL_FORMAT_IN_PROGRESS = true if there is a partial format in progress<br />5. PRINTER_STATE_IS_PAUSED = true if the printer is paused<br />6. PRINTER_STATE_IS_RECEIVE_BUFFER_FULL = true if the receive buffer is full<br />7. PRINTER_STATE_IS_RIBBON_OUT = true if the ribbon is out<br />8. PRINTER_STATE_LABEL_LENGTH_IN_DOTS = The length of the label in dots<br />9. PRINTER_STATE_LABELS_REMAINING_IN_BATCH = The number of labels remaining in the batch<br />10. PRINTER_STATE_NUMBER_OF_FORMATS_IN_RECEIVE_BUFFER =  The number of formats currently in the receive buffer of the printer<br />11. PRINTER_STATE_PRINT_MODE = The print mode ");
		});
		
		
		runs(function() {
				PrinterConnectiontype();
			});
		
		runs(function() {
			var PrinterInstance = Rho.PrinterZebra.getPrinterByID(printers_array[0].printerID);
			connect_status = PrinterInstance.connect();
			/* waitsFor(function()	{
				return PrinterInstance.isConnected;
			}, '9sec wait for connection', ENABLE9K); */
			var listOfParameters = [PrinterInstance.PRINTER_STATE_IS_HEAD_COLD, PrinterInstance.PRINTER_STATE_IS_HEAD_OPEN, PrinterInstance.PRINTER_STATE_IS_HEAD_TOO_HOT, PrinterInstance.PRINTER_STATE_IS_PARTIAL_FORMAT_IN_PROGRESS, PrinterInstance.PRINTER_STATE_IS_PAUSED, PrinterInstance.PRINTER_STATE_IS_RECEIVE_BUFFER_FULL, PrinterInstance.PRINTER_STATE_IS_RIBBON_OUT, PrinterInstance.PRINTER_STATE_LABEL_LENGTH_IN_DOTS, PrinterInstance.PRINTER_STATE_LABELS_REMAINING_IN_BATCH, PrinterInstance.PRINTER_STATE_NUMBER_OF_FORMATS_IN_RECEIVE_BUFFER, PrinterInstance.PRINTER_STATE_PRINT_MODE]
			if (PrinterInstance.isConnected) {
				PrinterInstance.requestState(listOfParameters, requestStateCallback)
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

	it('requestState Method with callback (check All Zebra printer states)<br/>', function() {
        dispTestCaseRunning('1. Connect a Zebra printer with the device using Bluetooth setting.<br/>2. Search for the Zebra printer and get id of the Rho.Printer.<br/>3. By using the Zebra printer ID, Create an instance.<br/>4. By using the instance, connect to the Rho.Printer.<br/>5. Call Rho.Printer.requestState method with callback for all PRINTER_STATE.<br/>');
        dispExpectedResult('1. The method should return STATUS_SUCCESS.<br/>2. The following results should be observed in the result:<br/>1. PRINTER_STATE_IS_HEAD_COLD = true if the head is cold.<br/>2. PRINTER_STATE_IS_HEAD_OPEN =  true if the head is open<br/>3. PRINTER_STATE_IS_HEAD_TOO_HOT = true if the head is too hot<br/>4. PRINTER_STATE_IS_PARTIAL_FORMAT_IN_PROGRESS = true if there is a partial format in progress<br/>5. PRINTER_STATE_IS_PAUSED = true if the printer is paused<br/>6. PRINTER_STATE_IS_RECEIVE_BUFFER_FULL = true if the receive buffer is full<br/>7. PRINTER_STATE_IS_RIBBON_OUT = true if the ribbon is out<br/>8. PRINTER_STATE_LABEL_LENGTH_IN_DOTS = The length of the label in dots<br/>9. PRINTER_STATE_LABELS_REMAINING_IN_BATCH = The number of labels remaining in the batch<br/>10. PRINTER_STATE_NUMBER_OF_FORMATS_IN_RECEIVE_BUFFER =  The number of formats currently in the receive buffer of the printer<br/>11. PRINTER_STATE_PRINT_MODE = The print mode');
        //Common Method implemented to wait for tester to run the test.Code available in specHelper.js
        _result.waitToRunTest();
        runs(function() {
            // Write your code here.
        });
        //Add more waitsfor or run blocks if required.
        //Common Method implemented to wait for tester to make it pass or fail.Code available in specHelper.js
        _result.waitForResponse();
    });
    it('requestState Method with callback (PRINTER_STATE_IS_HEAD_COLD)<br/>', function() {
        dispTestCaseRunning('1. Connect a Zebra printer with the device using Bluetooth setting.<br/>2. Search for the Zebra printer and get id of the Rho.Printer.<br/>3. By using the Zebra printer ID, Create an instance.<br/>4. By using the instance, connect to the Rho.Printer.<br/>5. Make Zebra printer head cold<br/>6. Call Rho.Printer.requestState method with callback for check PRINTER_STATE_IS_HEAD_COLD.<br/>');
        dispExpectedResult('1. The method should return STATUS_SUCCESS.<br/>2. if Zebra printer head cold then<br/> PRINTER_STATE_IS_HEAD_COLD= True or if not false <br/>3. On failure callback should return with STATUS_ERROR');
        //Common Method implemented to wait for tester to run the test.Code available in specHelper.js
        _result.waitToRunTest();
        runs(function() {
            // Write your code here.
        });
        //Add more waitsfor or run blocks if required.
        //Common Method implemented to wait for tester to make it pass or fail.Code available in specHelper.js
        _result.waitForResponse();
    });
    it('requestState Method with callback (PRINTER_STATE_IS_HEAD_OPEN)<br/>', function() {
        dispTestCaseRunning('1. Connect a Zebra printer with the device using Bluetooth setting.<br/>2. Search for the Zebra printer and get id of the Rho.Printer.<br/>3. By using the Zebra printer ID, Create an instance.<br/>4. By using the instance, connect to the Rho.Printer.<br/>5. Open zebra printer head.<br/>6. Call Rho.Printer.requestState method with callback for check PRINTER_STATE_IS_HEAD_OPEN<br/>');
        dispExpectedResult('1. The method should return STATUS_SUCCESS.<br/>2. if Zebra printer head is open then<br/>PRINTER_STATE_IS_HEAD_OPEN= True or if not false <br/>3. On failure callback should return with STATUS_ERROR');
        //Common Method implemented to wait for tester to run the test.Code available in specHelper.js
        _result.waitToRunTest();
        runs(function() {
            // Write your code here.
        });
        //Add more waitsfor or run blocks if required.
        //Common Method implemented to wait for tester to make it pass or fail.Code available in specHelper.js
        _result.waitForResponse();
    });
    it('requestState Method with callback (PRINTER_STATE_IS_HEAD_TOO_HOT)<br/>', function() {
        dispTestCaseRunning('1. Connect a Zebra printer with the device using Bluetooth setting.<br/>2. Search for the Zebra printer and get id of the Rho.Printer.<br/>3. By using the Zebra printer ID, Create an instance.<br/>4. By using the instance, connect to the Rho.Printer.<br/>5. Make Zebra printer head is too hot<br/>6. Call Rho.Printer.requestState method with callback for check PRINTER_STATE_IS_HEAD_TOO_HOT.<br/>');
        dispExpectedResult('1. The method should return STATUS_SUCCESS.<br/>2. if Zebra printer head too hot then<br/>PRINTER_STATE_IS_HEAD_TOO_HOT= True or if not false <br/>3. On failure callback should return with STATUS_ERROR');
        //Common Method implemented to wait for tester to run the test.Code available in specHelper.js
        _result.waitToRunTest();
        runs(function() {
            // Write your code here.
        });
        //Add more waitsfor or run blocks if required.
        //Common Method implemented to wait for tester to make it pass or fail.Code available in specHelper.js
        _result.waitForResponse();
    });
    it('requestState Method with callback (PRINTER_STATE_IS_PARTIAL_FORMAT_IN_PROGRESS)<br/>', function() {
        dispTestCaseRunning('1. Connect a Zebra printer with the device using Bluetooth setting.<br/>2. Search for the Zebra printer and get id of the Rho.Printer.<br/>3. By using the Zebra printer ID, Create an instance.<br/>4. By using the instance, connect to the Rho.Printer.<br/>5. Start Zebra printer partial format<br/>6. Call Rho.Printer.requestState method with callback for check PRINTER_STATE_IS_PARTIAL_FORMAT_IN_PROGRESS.<br/>');
        dispExpectedResult('1. The method should return STATUS_SUCCESS.<br/>2. if Zebra printer partial format in progress then<br/>PRINTER_STATE_IS_PARTIAL_FORMAT_IN_PROGRESS= True or if not false <br/>3. On failure callback should return with STATUS_ERROR');
        //Common Method implemented to wait for tester to run the test.Code available in specHelper.js
        _result.waitToRunTest();
        runs(function() {
            // Write your code here.
        });
        //Add more waitsfor or run blocks if required.
        //Common Method implemented to wait for tester to make it pass or fail.Code available in specHelper.js
        _result.waitForResponse();
    });
    it('requestState Method with callback (PRINTER_STATE_IS_PAUSED)<br/>', function() {
        dispTestCaseRunning('1. Connect a Zebra printer with the device using Bluetooth setting.<br/>2. Search for the Zebra printer and get id of the Rho.Printer.<br/>3. By using the Zebra printer ID, Create an instance.<br/>4. By using the instance, connect to the Rho.Printer.<br/>5. Pause Zebra Rho.Printer.<br/>6. Call Rho.Printer.requestState method with callback for check PRINTER_STATE_IS_PAUSED.<br/>');
        dispExpectedResult('1. The method should return STATUS_SUCCESS.<br/>2. if Zebra printer is paused then<br/>PRINTER_STATE_IS_PARTIAL_FORMAT_IN_PROGRESS= True or if not false <br/>3. On failure callback should return with STATUS_ERROR');
        //Common Method implemented to wait for tester to run the test.Code available in specHelper.js
        _result.waitToRunTest();
        runs(function() {
            // Write your code here.
        });
        //Add more waitsfor or run blocks if required.
        //Common Method implemented to wait for tester to make it pass or fail.Code available in specHelper.js
        _result.waitForResponse();
    });
    it('requestState Method with callback (PRINTER_STATE_IS_RECEIVE_BUFFER_FULL)<br/>', function() {
        dispTestCaseRunning('1. Connect a Zebra printer with the device using Bluetooth setting.<br/>2. Search for the Zebra printer and get id of the Rho.Printer.<br/>3. By using the Zebra printer ID, Create an instance.<br/>4. By using the instance, connect to the Rho.Printer.<br/>5. Make Zebra printer receive buffer full.<br/>6. Call Rho.Printer.requestState method with callback for check PRINTER_STATE_IS_RECEIVE_BUFFER_FULL.<br/>');
        dispExpectedResult('1. The method should return STATUS_SUCCESS.<br/>2. if Zebra printer receive buffer is full then<br/>PRINTER_STATE_IS_RECEIVE_BUFFER_FULL= True or if not false <br/>3. On failure callback should return with STATUS_ERROR');
        //Common Method implemented to wait for tester to run the test.Code available in specHelper.js
        _result.waitToRunTest();
        runs(function() {
            // Write your code here.
        });
        //Add more waitsfor or run blocks if required.
        //Common Method implemented to wait for tester to make it pass or fail.Code available in specHelper.js
        _result.waitForResponse();
    });
    it('requestState Method with callback (PRINTER_STATE_IS_RIBBON_OUT)<br/>', function() {
        dispTestCaseRunning('1. Connect a Zebra printer with the device using Bluetooth setting.<br/>2. Search for the Zebra printer and get id of the Rho.Printer.<br/>3. By using the Zebra printer ID, Create an instance.<br/>4. By using the instance, connect to the Rho.Printer.<br/>5. Make Zebra printer ribbon out.<br/>6. Call Rho.Printer.requestState method with callback for check PRINTER_STATE_IS_RIBBON_OUT.<br/>');
        dispExpectedResult('1. The method should return STATUS_SUCCESS.<br/>2. if Zebra printer ribbon out then<br/>PRINTER_STATE_IS_RIBBON_OUT= True or if not false <br/>3. On failure callback should return with STATUS_ERROR');
        //Common Method implemented to wait for tester to run the test.Code available in specHelper.js
        _result.waitToRunTest();
        runs(function() {
            // Write your code here.
        });
        //Add more waitsfor or run blocks if required.
        //Common Method implemented to wait for tester to make it pass or fail.Code available in specHelper.js
        _result.waitForResponse();
    });
    it('requestState Method with callback (PRINTER_STATE_LABEL_LENGTH_IN_DOTS)<br/>', function() {
        dispTestCaseRunning('1. Connect a Zebra printer with the device using Bluetooth setting.<br/>2. Search for the Zebra printer and get id of the Rho.Printer.<br/>3. By using the Zebra printer ID, Create an instance.<br/>4. By using the instance, connect to the Rho.Printer.<br/>5. Provide label for Zebra printer<br/>6. Call Rho.Printer.requestState method with callback for check PRINTER_STATE_LABEL_LENGTH_IN_DOTS.<br/>');
        dispExpectedResult('1. The method should return STATUS_SUCCESS.<br/>2. Should return label length.<br/>3. On failure callback should return with STATUS_ERROR');
        //Common Method implemented to wait for tester to run the test.Code available in specHelper.js
        _result.waitToRunTest();
        runs(function() {
            // Write your code here.
        });
        //Add more waitsfor or run blocks if required.
        //Common Method implemented to wait for tester to make it pass or fail.Code available in specHelper.js
        _result.waitForResponse();
    });
    it('requestState Method with callback (PRINTER_STATE_LABELS_REMAINING_IN_BATCH)<br/>', function() {
        dispTestCaseRunning('1. Connect a Zebra printer with the device using Bluetooth setting.<br/>2. Search for the Zebra printer and get id of the Rho.Printer.<br/>3. By using the Zebra printer ID, Create an instance.<br/>4. By using the instance, connect to the Rho.Printer.<br/>5. Call Rho.Printer.requestState method with callback for check PRINTER_STATE_LABELS_REMAINING_IN_BATCH.<br/>');
        dispExpectedResult('1. The method should return STATUS_SUCCESS.<br/>2. Should return number of labels remaining in batch.<br/>3. On failure callback should return with STATUS_ERROR');
        //Common Method implemented to wait for tester to run the test.Code available in specHelper.js
        _result.waitToRunTest();
        runs(function() {
            // Write your code here.
        });
        //Add more waitsfor or run blocks if required.
        //Common Method implemented to wait for tester to make it pass or fail.Code available in specHelper.js
        _result.waitForResponse();
    });
    it('requestState Method with callback (PRINTER_STATE_NUMBER_OF_FORMATS_IN_RECEIVE_BUFFER)<br/>', function() {
        dispTestCaseRunning('1. Connect a Zebra printer with the device using Bluetooth setting.<br/>2. Search for the Zebra printer and get id of the Rho.Printer.<br/>3. By using the Zebra printer ID, Create an instance.<br/>4. By using the instance, connect to the Rho.Printer.<br/>5. Call Rho.Printer.requestState method with callback for check PRINTER_STATE_NUMBER_OF_FORMATS_IN_RECEIVE_BUFFER.<br/>');
        dispExpectedResult('1. The method should return STATUS_SUCCESS.<br/>2. Should return number of formats currently in the receive buffer of the printer<br/>3. On failure callback should return with STATUS_ERROR');
        //Common Method implemented to wait for tester to run the test.Code available in specHelper.js
        _result.waitToRunTest();
        runs(function() {
            // Write your code here.
        });
        //Add more waitsfor or run blocks if required.
        //Common Method implemented to wait for tester to make it pass or fail.Code available in specHelper.js
        _result.waitForResponse();
    });
    it('Turn on Applicator print mode and call requestState Method in (PRINTER_STATE_PRINT_MODE)<br/>', function() {
        dispTestCaseRunning('1. Connect a Zebra printer with the device using Bluetooth setting.<br/>2. Search for the Zebra printer and get id of the Rho.Printer.<br/>3. By using the Zebra printer ID, Create an instance.<br/>4. By using the instance, connect to the Rho.Printer.<br/>5. Turn on Zebra printer Applicator print mode<br/>5. Call Rho.Printer.requestState method with callback for check PRINTER_STATE_PRINT_MODE.<br/>');
        dispExpectedResult('1. The method should return STATUS_SUCCESS.<br/>2. Should return PRINT_MODE_APPLICATOR constant<br/>3. On failure callback should return with STATUS_ERROR');
        //Common Method implemented to wait for tester to run the test.Code available in specHelper.js
        _result.waitToRunTest();
        runs(function() {
            // Write your code here.
        });
        //Add more waitsfor or run blocks if required.
        //Common Method implemented to wait for tester to make it pass or fail.Code available in specHelper.js
        _result.waitForResponse();
    });
    it('Turn on Cutter print mode and call requestState Method in (PRINTER_STATE_PRINT_MODE)<br/>', function() {
        dispTestCaseRunning('1. Connect a Zebra printer with the device using Bluetooth setting.<br/>2. Search for the Zebra printer and get id of the Rho.Printer.<br/>3. By using the Zebra printer ID, Create an instance.<br/>4. By using the instance, connect to the Rho.Printer.<br/>5. Turn on Zebra printer Cutter print mode<br/>5. Call Rho.Printer.requestState method with callback for check PRINTER_STATE_PRINT_MODE.<br/>');
        dispExpectedResult('1. The method should return STATUS_SUCCESS.<br/>2. Should return PRINT_MODE_CUTTER constant<br/>3. On failure callback should return with STATUS_ERROR');
        //Common Method implemented to wait for tester to run the test.Code available in specHelper.js
        _result.waitToRunTest();
        runs(function() {
            // Write your code here.
        });
        //Add more waitsfor or run blocks if required.
        //Common Method implemented to wait for tester to make it pass or fail.Code available in specHelper.js
        _result.waitForResponse();
    });
    it('Turn on Kiosk print mode and call requestState Method in (PRINTER_STATE_PRINT_MODE)<br/>', function() {
        dispTestCaseRunning('1. Connect a Zebra printer with the device using Bluetooth setting.<br/>2. Search for the Zebra printer and get id of the Rho.Printer.<br/>3. By using the Zebra printer ID, Create an instance.<br/>4. By using the instance, connect to the Rho.Printer.<br/>5. Turn on Zebra printer Kiosk print mode<br/>5. Call Rho.Printer.requestState method with callback for check PRINTER_STATE_PRINT_MODE.<br/>');
        dispExpectedResult('1. The method should return STATUS_SUCCESS.<br/>2. Should return PRINT_MODE_KIOSK constant<br/>3. On failure callback should return with STATUS_ERROR');
        //Common Method implemented to wait for tester to run the test.Code available in specHelper.js
        _result.waitToRunTest();
        runs(function() {
            // Write your code here.
        });
        //Add more waitsfor or run blocks if required.
        //Common Method implemented to wait for tester to make it pass or fail.Code available in specHelper.js
        _result.waitForResponse();
    });
    it('Turn on Linerless peel print mode and call requestState Method in (PRINTER_STATE_PRINT_MODE)<br/>', function() {
        dispTestCaseRunning('1. Connect a Zebra printer with the device using Bluetooth setting.<br/>2. Search for the Zebra printer and get id of the Rho.Printer.<br/>3. By using the Zebra printer ID, Create an instance.<br/>4. By using the instance, connect to the Rho.Printer.<br/>5. Turn on Zebra printer Linerless peel print mode<br/>5. Call Rho.Printer.requestState method with callback for check PRINTER_STATE_PRINT_MODE.<br/>');
        dispExpectedResult('1. The method should return STATUS_SUCCESS.<br/>2. Should return PRINT_MODE_LINERLESS_PEEL constant<br/>3. On failure callback should return with STATUS_ERROR');
        //Common Method implemented to wait for tester to run the test.Code available in specHelper.js
        _result.waitToRunTest();
        runs(function() {
            // Write your code here.
        });
        //Add more waitsfor or run blocks if required.
        //Common Method implemented to wait for tester to make it pass or fail.Code available in specHelper.js
        _result.waitForResponse();
    });
    it('Turn on Linerless rewind print mode and call requestState Method in (PRINTER_STATE_PRINT_MODE)<br/>', function() {
        dispTestCaseRunning('1. Connect a Zebra printer with the device using Bluetooth setting.<br/>2. Search for the Zebra printer and get id of the Rho.Printer.<br/>3. By using the Zebra printer ID, Create an instance.<br/>4. By using the instance, connect to the Rho.Printer.<br/>5. Turn on Zebra printer Linerless rewind print mode<br/>5. Call Rho.Printer.requestState method with callback for check PRINTER_STATE_PRINT_MODE.<br/>');
        dispExpectedResult('1. The method should return STATUS_SUCCESS.<br/>2. Should return PRINT_MODE_LINERLESS_REWIND constant<br/>3. On failure callback should return with STATUS_ERROR');
        //Common Method implemented to wait for tester to run the test.Code available in specHelper.js
        _result.waitToRunTest();
        runs(function() {
            // Write your code here.
        });
        //Add more waitsfor or run blocks if required.
        //Common Method implemented to wait for tester to make it pass or fail.Code available in specHelper.js
        _result.waitForResponse();
    });
    it('Turn on Partial cutter print mode and call requestState Method in (PRINTER_STATE_PRINT_MODE)<br/>', function() {
        dispTestCaseRunning('1. Connect a Zebra printer with the device using Bluetooth setting.<br/>2. Search for the Zebra printer and get id of the Rho.Printer.<br/>3. By using the Zebra printer ID, Create an instance.<br/>4. By using the instance, connect to the Rho.Printer.<br/>5. Turn on Zebra printer Partial cutter print mode<br/>5. Call Rho.Printer.requestState method with callback for check PRINTER_STATE_PRINT_MODE.<br/>');
        dispExpectedResult('1. The method should return STATUS_SUCCESS.<br/>2. Should return PRINT_MODE_PARTIAL_CUTTER constant<br/>3. On failure callback should return with STATUS_ERROR');
        //Common Method implemented to wait for tester to run the test.Code available in specHelper.js
        _result.waitToRunTest();
        runs(function() {
            // Write your code here.
        });
        //Add more waitsfor or run blocks if required.
        //Common Method implemented to wait for tester to make it pass or fail.Code available in specHelper.js
        _result.waitForResponse();
    });
    it('Turn on Peel-off print mode and call requestState Method in (PRINTER_STATE_PRINT_MODE)<br/>', function() {
        dispTestCaseRunning('1. Connect a Zebra printer with the device using Bluetooth setting.<br/>2. Search for the Zebra printer and get id of the Rho.Printer.<br/>3. By using the Zebra printer ID, Create an instance.<br/>4. By using the instance, connect to the Rho.Printer.<br/>5. Turn on Zebra printer Peel-off print mode<br/>5. Call Rho.Printer.requestState method with callback for check PRINTER_STATE_PRINT_MODE.<br/>');
        dispExpectedResult('1. The method should return STATUS_SUCCESS.<br/>2. Should return PRINT_MODE_PEEL_OFF constant<br/>3. On failure callback should return with STATUS_ERROR');
        //Common Method implemented to wait for tester to run the test.Code available in specHelper.js
        _result.waitToRunTest();
        runs(function() {
            // Write your code here.
        });
        //Add more waitsfor or run blocks if required.
        //Common Method implemented to wait for tester to make it pass or fail.Code available in specHelper.js
        _result.waitForResponse();
    });
    it('Turn on Rewind print mode and call requestState Method in (PRINTER_STATE_PRINT_MODE)<br/>', function() {
        dispTestCaseRunning('1. Connect a Zebra printer with the device using Bluetooth setting.<br/>2. Search for the Zebra printer and get id of the Rho.Printer.<br/>3. By using the Zebra printer ID, Create an instance.<br/>4. By using the instance, connect to the Rho.Printer.<br/>5. Turn on Zebra printer Rewind print mode<br/>5. Call Rho.Printer.requestState method with callback for check PRINTER_STATE_PRINT_MODE.<br/>');
        dispExpectedResult('1. The method should return STATUS_SUCCESS.<br/>2. Should return PRINT_MODE_REWIND constant<br/>3. On failure callback should return with STATUS_ERROR');
        //Common Method implemented to wait for tester to run the test.Code available in specHelper.js
        _result.waitToRunTest();
        runs(function() {
            // Write your code here.
        });
        //Add more waitsfor or run blocks if required.
        //Common Method implemented to wait for tester to make it pass or fail.Code available in specHelper.js
        _result.waitForResponse();
    });
    it('Turn on RFID print mode and call requestState Method in (PRINTER_STATE_PRINT_MODE)<br/>', function() {
        dispTestCaseRunning('1. Connect a Zebra printer with the device using Bluetooth setting.<br/>2. Search for the Zebra printer and get id of the Rho.Printer.<br/>3. By using the Zebra printer ID, Create an instance.<br/>4. By using the instance, connect to the Rho.Printer.<br/>5. Turn on Zebra printer RFID print mode<br/>5. Call Rho.Printer.requestState method with callback for check PRINTER_STATE_PRINT_MODE.<br/>');
        dispExpectedResult('1. The method should return STATUS_SUCCESS.<br/>2. Should return PRINT_MODE_RFID constant<br/>3. On failure callback should return with STATUS_ERROR');
        //Common Method implemented to wait for tester to run the test.Code available in specHelper.js
        _result.waitToRunTest();
        runs(function() {
            // Write your code here.
        });
        //Add more waitsfor or run blocks if required.
        //Common Method implemented to wait for tester to make it pass or fail.Code available in specHelper.js
        _result.waitForResponse();
    });
    it('Turn on Tear-off print mode and call requestState Method in (PRINTER_STATE_PRINT_MODE)<br/>', function() {
        dispTestCaseRunning('1. Connect a Zebra printer with the device using Bluetooth setting.<br/>2. Search for the Zebra printer and get id of the Rho.Printer.<br/>3. By using the Zebra printer ID, Create an instance.<br/>4. By using the instance, connect to the Rho.Printer.<br/>5. Turn on Zebra printer RFID print mode<br/>5. Call Rho.Printer.requestState method with callback for check PRINTER_STATE_PRINT_MODE.<br/>');
        dispExpectedResult('1. The method should return STATUS_SUCCESS.<br/>2. Should return PRINT_MODE_TEAR_OFF constant<br/>3. On failure callback should return with STATUS_ERROR');
        //Common Method implemented to wait for tester to run the test.Code available in specHelper.js
        _result.waitToRunTest();
        runs(function() {
            // Write your code here.
        });
        //Add more waitsfor or run blocks if required.
        //Common Method implemented to wait for tester to make it pass or fail.Code available in specHelper.js
        _result.waitForResponse();
    });
    it('Turn on Unknown print mode and call requestState Method in (PRINTER_STATE_PRINT_MODE)<br/>', function() {
        dispTestCaseRunning('1. Connect a Zebra printer with the device using Bluetooth setting.<br/>2. Search for the Zebra printer and get id of the Rho.Printer.<br/>3. By using the Zebra printer ID, Create an instance.<br/>4. By using the instance, connect to the Rho.Printer.<br/>5. Turn on Zebra printer Unknown print mode<br/>5. Call Rho.Printer.requestState method with callback for check PRINTER_STATE_PRINT_MODE.<br/>');
        dispExpectedResult('1. The method should return STATUS_SUCCESS.<br/>2. Should return PRINT_MODE_UNKNOWN constant<br/>3. On failure callback should return with STATUS_ERROR');
        //Common Method implemented to wait for tester to run the test.Code available in specHelper.js
        _result.waitToRunTest();
        runs(function() {
            // Write your code here.
        });
        //Add more waitsfor or run blocks if required.
        //Common Method implemented to wait for tester to make it pass or fail.Code available in specHelper.js
        _result.waitForResponse();
    });
	
});
