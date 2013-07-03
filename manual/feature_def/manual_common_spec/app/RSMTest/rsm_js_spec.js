describe("RSM Manual Test", function() {
	var ENABLE8K = 8000;
	var ENABLE1K = 1000;
	var ENABLE10K = 10000;
	var ENABLE60K = 60000;
	var bluetoothStatusdata ='';
	var enumData = Rho.Barcode.enumerate();
	var enableFlag = false;
	var callbackstatus = false;
	var decodeFlag = false;
	var i = enumData.length -1;
	var BTstatus = "";
	
    var bluetoothStatus = function (data){
		bluetoothStatusdata = JSON.stringify(data);
		callbackstatus = true;
		BTstatus = data.status;
	}   	   
	var scnid = enumData[i].getProperty('ID');
	var scntype = enumData[i].getProperty('scannerType');
	var scnname = enumData[i].getProperty('friendlyName');

	var callbackenable = function (data){
		enablecallbackdata(JSON.stringify(data));
	}	
	beforeEach(function() {
		enableFlag = false;
		decodeFlag = false;
		decodedata ='';
		document.getElementById("actResult").innerHTML = "init";
		enablecallbackdata(decodedata);
		enumData[i].disconnectBtOnDisable = false;
	});

	afterEach(function() {
		//enumData[i].clearAllProperties();
	});
			
	it("Enable" + scnid +scnname, function() {		
		runs(function() {
			enumData[i].connectionIdleTimeout = 30;
			enumData[i].disconnectBtOnDisable = false;
			enumData[i].displayBtAddressBarcodeOnEnable = true;
			enumData[i].disableScannerDuringNavigate = false;
			enumData[i].registerBluetoothStatus(bluetoothStatus);
			enumData[i].enable();
		});

		waitsFor(function(){
			return callbackstatus;
		});

		runs(function() {							
			expect(bluetoothStatusdata).toContain('BluetoothConnected');
			
		});		
	});	
	describe("RSM Test with ", function() {
		it("VT282-2737 | call commandRemoteScanner with Disconnect |" , function() {

			runs(function()
			{
				setObjective("VT282-2737 | call commandRemoteScanner with Disconnect |");
				setInstruction("Check for RSM is connected or not with calling enable <br /> connectionIdleTimeout to 10000<br />scan a barcode<br />commandRemoteScanner with Disconnect(9 sec wait)<br />check for RSM is conncted or not with calling enable");
				setExpected("Commands BT Scanner to disconnect from its connected device. It should ask for BT pairing while trying to re-enable");
				enumData[i].connectionIdleTimeout = 10000;
				enumData[i].commandRemoteScanner('Disconnect');
				setTimeout(function() {
						decodeFlag = true;
					}, ENABLE8K);
				waitsFor(function()
				{
					return decodeFlag;
				}, '9sec wait to enable the Scanner', 9000);
			});

			runs(function()
			{
				
				runs(function()
				{
					enumData[i].connectionIdleTimeout = 30;
					enumData[i].disconnectBtOnDisable = false;
					enumData[i].displayBtAddressBarcodeOnEnable = true;
					enumData[i].disableScannerDuringNavigate = false;
					enumData[i].enable({},callbackenable);
					setTimeout(function() {
							enableFlag = true;
						}, ENABLE8K);
				});

				waitsFor(function()
				{
					return enableFlag;
				}, '9sec wait to enable the Scanner', 9000);
				
				waitsFor(function() {
				return document.getElementById("actResult").innerHTML != "init";
				}, "Timed out waiting for tester to respond", 300000);
				runs(function() {
				expect("pass").toEqual(document.getElementById("actResult").innerHTML);
				});
			});
		});
		it("VT282-2738 | call commandRemoteScanner with unpair |" , function() {

			runs(function()
			{
				setObjective("VT282-2738 | call commandRemoteScanner with unpair |");
				setInstruction("Check for RSM is connected or not with calling enable <br /> connectionIdleTimeout to 10000<br />scan a barcode<br />commandRemoteScanner with unpair(9 sec wait)<br />check for RSM is conncted or not with calling enable");
				setExpected("Commands BT Scanner to disconnect from its connected device. It should ask for BT pairing while trying to re-enable");
				enumData[i].connectionIdleTimeout = 10000;
				enumData[i].commandRemoteScanner('unpair');
				setTimeout(function() {
					decodeFlag = true;
				}, ENABLE8K);
				waitsFor(function()
				{
					return decodeFlag;
				}, '9sec wait to enable the Scanner', 9000);
			});

			
			runs(function()
			{
				
				runs(function()
				{
					enumData[i].connectionIdleTimeout = 30;
					enumData[i].disconnectBtOnDisable = false;
					enumData[i].displayBtAddressBarcodeOnEnable = true;
					enumData[i].disableScannerDuringNavigate = false;
					enumData[i].enable({},callbackenable);
					setTimeout(function() {
							enableFlag = true;
						}, ENABLE8K);
				});

				waitsFor(function()
				{
					return enableFlag;
				}, '9sec wait to enable the Scanner', 9000);
				
				waitsFor(function() {
				return document.getElementById("actResult").innerHTML != "init";
				}, "Timed out waiting for tester to respond", 300000);
				runs(function() {
				expect("pass").toEqual(document.getElementById("actResult").innerHTML);
				});
			});
		});		
		
		it("VT282-2739 | Call commandRemoteScanner with StartPaging" , function() {

			runs(function()
			{
				setObjective("VT282-2739 | Call commandRemoteScanner with StartPaging |");
				setInstruction("ConnectionIdleTimeout to 10000 <br />Check for RSM is connected or not with calling enable <br />call commandRemoteScanner with StartPaging<br />scan a barcode<br />Keep the device idle for 10 second<br />Call again commandRemoteScanner with StartPaging");
				setExpected("BT scanner should start emitting a beep, to allow it to be located after startpaging being called <br />After detecting the device the barcode scanning should be successful");
			});

	
			runs(function()
			{			
				enumData[i].connectionIdleTimeout = 10000;
				enumData[i].commandRemoteScanner("StartPaging");
				setTimeout(function() {
					decodeFlag = true;
				}, ENABLE10K);
			});	
			waitsFor(function()
			{
				return decodeFlag;
			}, '11sec wait to enable the Scanner', 11000);
			
			runs(function()
			{			
				enumData[i].commandRemoteScanner("StartPaging");
			});	
			runs(function()
			{
				waitsFor(function() {
				return document.getElementById("actResult").innerHTML != "init";
				}, "Timed out waiting for tester to respond", 300000);
				runs(function() {
				expect("pass").toEqual(document.getElementById("actResult").innerHTML);
				});
			});
		});
		
		it("VT282-2740 | Call commandRemoteScanner with StopPaging" , function() {

			runs(function()
			{
				setObjective("VT282-2740 | Call commandRemoteScanner with StopPaging|");
				setInstruction("Check for RSM is connected or not with calling enable <br />ConnectionIdleTimeout to 10000<br />Call commandRemoteScanner with StartPaging<br />Call commandRemoteScanner with StopPaging<br />scan a barcode<br />");
				setExpected("BT scanner should start and stop emitting a beep, to allow it to be located after startpaging and StopPaging being called <br />After detecting the device the barcode scanning should be successful");
			});


			runs(function()
			{			
				enumData[i].connectionIdleTimeout = 10000;
				enumData[i].commandRemoteScanner("StartPaging");
				setTimeout(function() {
					decodeFlag = true;
				}, ENABLE1K);
				waitsFor(function()
				{
					return decodeFlag;
				}, '2sec wait to enable the Scanner', 2000);
				enumData[i].commandRemoteScanner("StopPaging");
			});	

			runs(function()
			{
				waitsFor(function() {
				return document.getElementById("actResult").innerHTML != "init";
				}, "Timed out waiting for tester to respond", 300000);
				runs(function() {
				expect("pass").toEqual(document.getElementById("actResult").innerHTML);
				});
			});
		});
		
		it("VT282-2741 | Set rsmBluetoothAuthentication as true" , function() {

			runs(function()
			{
				setObjective("VT282-2741 | Set rsmBluetoothAuthentication as true|");
				setInstruction("Check for RSM is connected or not with calling enable <br />rsmBluetoothAuthentication as true<br />Unpair the RSM<br />Enable the RSM again ");
				setExpected("The RSM device should ask for passcode while pairing with device");
			});

			runs(function()
			{			
				enumData[i].rsmBluetoothAuthentication = true;
				enumData[i].commandRemoteScanner("unpair")
				setTimeout(function() {
					decodeFlag = true;
				}, ENABLE8K);
				waitsFor(function()
				{
					return decodeFlag;
				}, '9sec wait to enable the Scanner', 9000);
			});	
			
			runs(function()
			{
				enableFlag = false;
				enumData[i].connectionIdleTimeout = 30;
				enumData[i].disconnectBtOnDisable = false;
				enumData[i].displayBtAddressBarcodeOnEnable = true;
				enumData[i].disableScannerDuringNavigate = false;
				enumData[i].enable({},callbackenable);
				setTimeout(function() {
					enableFlag = true;
				}, ENABLE8K);
			});

			waitsFor(function()
			{
				return enableFlag;
			}, '9sec wait to enable the Scanner', 9000);
						
			
			runs(function()
			{
				waitsFor(function() {
				return document.getElementById("actResult").innerHTML != "init";
				}, "Timed out waiting for tester to respond", 300000);
				runs(function() {
				expect("pass").toEqual(document.getElementById("actResult").innerHTML);
				});
			});
		});		
		
		it("VT282-2742 | Set rsmBluetoothAuthentication as false" , function() {

			runs(function()
			{
				setObjective("VT282-2742 | Set rsmBluetoothAuthentication as false|");
				setInstruction("Check for RSM is connected or not with calling enable <br />rsmBluetoothAuthentication as false<br />Unpair the RSM<br />Enable the RSM again ");
				setExpected("The RSM device should not ask for passcode while pairing with device");
			});

			
			runs(function()
			{			
				enumData[i].rsmBluetoothAuthentication = false;
				enumData[i].commandRemoteScanner("unpair")
				setTimeout(function() {
					decodeFlag = true;
				}, ENABLE8K);
				waitsFor(function()
				{
					return decodeFlag;
				}, '9sec wait to enable the Scanner', 9000);				
			});	

			
			runs(function()
			{
				enableFlag = false;
				enumData[i].connectionIdleTimeout = 30;
				enumData[i].disconnectBtOnDisable = false;
				enumData[i].displayBtAddressBarcodeOnEnable = true;
				enumData[i].disableScannerDuringNavigate = false;
				enumData[i].enable({},callbackenable);
				setTimeout(function() {
					enableFlag = true;
				}, ENABLE8K);
			});

			waitsFor(function()
			{
				return enableFlag;
			}, '9sec wait to enable the Scanner', 9000);
						
			
			runs(function()
			{
				waitsFor(function() {
				return document.getElementById("actResult").innerHTML != "init";
				}, "Timed out waiting for tester to respond", 300000);
				runs(function() {
				expect("pass").toEqual(document.getElementById("actResult").innerHTML);
				});
			});
		});	

		it("VT282-2743 | Set rsmBluetoothAutoReconnect as none" , function() {

			runs(function()
			{
				setObjective("VT282-2743 | Set rsmBluetoothAutoReconnect as none|");
				setInstruction("Check for RSM is connected or not with calling enable <br />rsmBluetoothAutoReconnect as none<br />Take the RSM device out of range from the mobile device and get it back within time(10 sec) for reconnection specified.<br />Call start and check BT scanner is emitting beam or not");
				setExpected("The RSM device should not be connected automatically after coming near to the device.");

			});

			runs(function()
			{			
				enumData[i].rsmBluetoothAutoReconnect = "none";
				setTimeout(function() {
					decodeFlag = true;
				}, ENABLE10K);
			});	
			waitsFor(function()
			{
				return decodeFlag;
			}, '11sec wait to enable the Scanner', 11000);
			runs(function()
			{				
				enumData[i].start();
			});
			runs(function()
			{
				waitsFor(function() {
				return document.getElementById("actResult").innerHTML != "init";
				}, "Timed out waiting for tester to respond", 300000);
				runs(function() {
				expect("pass").toEqual(document.getElementById("actResult").innerHTML);
				});
			});
		});	


		it("VT282-2744 | Set rsmBluetoothAutoReconnect as onPower" , function() {

			runs(function()
			{
				setObjective("VT282-2744 | Set rsmBluetoothAutoReconnect as onPower|");
				setInstruction("Check for RSM is connected or not with calling enable <br />rsmBluetoothAutoReconnect as onPower<br />Remove the battery from the RSM device and put it back (10 sec)<br />Call start and check BT scanner is emitting beam or not");
				setExpected("The RSM device should be connected automatically after powered on.");

			});


			runs(function()
			{			
				enumData[i].rsmBluetoothAutoReconnect = "onPower";
				setTimeout(function() {
					decodeFlag = true;
				}, ENABLE10K);
			});	
			waitsFor(function()
			{
				return decodeFlag;
			}, '11sec wait to enable the Scanner', 11000);
			runs(function()
			{				
				enumData[i].start();
			});
			runs(function()
			{
				waitsFor(function() {
				return document.getElementById("actResult").innerHTML != "init";
				}, "Timed out waiting for tester to respond", 300000);
				runs(function() {
				expect("pass").toEqual(document.getElementById("actResult").innerHTML);
				});
			});
		});	

		it("VT282-2745 | Set rsmBluetoothAutoReconnect as onOutOfRange" , function() {

			runs(function()
			{
				setObjective("VT282-2745 | Set rsmBluetoothAutoReconnect as onOutOfRange|");
				setInstruction("Check for RSM is connected or not with calling enable <br />rsmBluetoothAutoReconnect as onOutOfRange<br />Take the RSM device out of range from the mobile device and get it back within time for reconnection specified. (10 sec)<br />Call start and check BT scanner is emitting beam or not");
				setExpected("The RSM device should not be connected automatically after coming near to the device.");

			});


			runs(function()
			{			
				enumData[i].rsmBluetoothAutoReconnect = "onOutOfRange";
				setTimeout(function() {
					decodeFlag = true;
				}, ENABLE10K);
			});	
			waitsFor(function()
			{
				return decodeFlag;
			}, '11sec wait to enable the Scanner', 11000);
			runs(function()
			{				
				enumData[i].start();
			});
			runs(function()
			{
				waitsFor(function() {
				return document.getElementById("actResult").innerHTML != "init";
				}, "Timed out waiting for tester to respond", 300000);
				runs(function() {
				expect("pass").toEqual(document.getElementById("actResult").innerHTML);
				});
			});
		});			

		it("VT282-2746 | Set rsmBluetoothAutoReconnect as onPowerOutOfRange with taking RSM out of range" , function() {

			runs(function()
			{
				setObjective("VT282-2746 | Set rsmBluetoothAutoReconnect as onPowerOutOfRange with taking RSM out of range|");
				setInstruction("Check for RSM is connected or not with calling enable <br />rsmBluetoothAutoReconnect as onPowerOutOfRange<br />Take the RSM device out of range from the mobile device and get it back within time for reconnection specified. (10 sec)<br />Call start and check BT scanner is emitting beam or not");
				setExpected("The RSM device should not be connected automatically after coming near to the device.");

			});

			runs(function()
			{			
				enumData[i].rsmBluetoothAutoReconnect = "onPowerOutOfRange";
				setTimeout(function() {
					decodeFlag = true;
				}, ENABLE10K);
			});	
			waitsFor(function()
			{
				return decodeFlag;
			}, '11sec wait to enable the Scanner', 11000);
			runs(function()
			{				
				enumData[i].start();
			});
			runs(function()
			{
				waitsFor(function() {
				return document.getElementById("actResult").innerHTML != "init";
				}, "Timed out waiting for tester to respond", 300000);
				runs(function() {
				expect("pass").toEqual(document.getElementById("actResult").innerHTML);
				});
			});
		});	
		
		it("VT282-2747 | Set rsmBluetoothAutoReconnect as onPowerOutOfRange with RSM poweroff" , function() {

			runs(function()
			{
				setObjective("VT282-2747 | Set rsmBluetoothAutoReconnect as onPowerOutOfRange with RSM poweroff|");
				setInstruction("Check for RSM is connected or not with calling enable <br />rsmBluetoothAutoReconnect as onPowerOutOfRange<br />Remove the battery from the RSM device and put it back (10 sec)<br />Call start and check BT scanner is emitting beam or not");
				setExpected("The RSM device should be connected automatically after powered on");
				enumData[i].enable({},callbackenable);
				setTimeout(function() {
					enableFlag = true;
				}, ENABLE8K);
			});

			waitsFor(function()
			{
				return enableFlag;
			}, '9sec wait to enable the Scanner', 9000);

			runs(function()
			{			
				enumData[i].rsmBluetoothAutoReconnect = "onPowerOutOfRange";
				setTimeout(function() {
					decodeFlag = true;
				}, ENABLE10K);
			});	
			waitsFor(function()
			{
				return decodeFlag;
			}, '11sec wait to enable the Scanner', 11000);
			runs(function()
			{				
				enumData[i].start();
			});
			runs(function()
			{
				waitsFor(function() {
				return document.getElementById("actResult").innerHTML != "init";
				}, "Timed out waiting for tester to respond", 300000);
				runs(function() {
				expect("pass").toEqual(document.getElementById("actResult").innerHTML);
				});
			});
		});	

		it("VT282-2748 | Set  BluetoothBeepOnReconnectAttempt as true" , function() {

			runs(function()
			{
				setObjective("VT282-2748 | Set  BluetoothBeepOnReconnectAttempt as true|");
				setInstruction("Check for RSM is connected or not with calling enable <br />BluetoothBeepOnReconnectAttempt as true<br />rsmBluetoothAutoReconnect as onPowerOutOfRange <br />Remove the battery from the RSM device and put it back<br />check for the number of beeps while reconnecting (1 min)<br />Call start and check BT scanner is emitting beam or not");
				setExpected("scanner should emit 5 beeps every 5 seconds whilst re-connection in progress");
			});

			runs(function()
			{
				enumData[i].rsmBluetoothBeepOnReconnectAttempt = true;
				enumData[i].rsmBluetoothAutoReconnect = "onPowerOutOfRange";
				setTimeout(function() {
					decodeFlag = true;
				}, ENABLE60K);
			});	
			waitsFor(function()
			{
				return decodeFlag;
			}, '60sec wait to enable ', 61000);
			runs(function()
			{				
				enumData[i].start();
			});
			runs(function()
			{
				waitsFor(function() {
				return document.getElementById("actResult").innerHTML != "init";
				}, "Timed out waiting for tester to respond", 300000);
				runs(function() {
				expect("pass").toEqual(document.getElementById("actResult").innerHTML);
				});
			});
		});	
		
		it("VT282-2749 | Set  BluetoothBeepOnReconnectAttempt as false" , function() {

			runs(function()
			{
				setObjective("VT282-2749 | Set  BluetoothBeepOnReconnectAttempt as false|");
				setInstruction("Check for RSM is connected or not with calling enable <br />BluetoothBeepOnReconnectAttempt as false<br />rsmBluetoothAutoReconnect as onPowerOutOfRange <br />Remove the battery from the RSM device and put it back<br />check for the number of beeps while reconnecting (1 min)<br />Call start and check BT scanner is emitting beam or not");
				setExpected("scanner should not emit 5 beeps every 5 seconds whilst re-connection in progress");
		
			});


			runs(function()
			{
				enumData[i].rsmBluetoothBeepOnReconnectAttempt = false;
				enumData[i].rsmBluetoothAutoReconnect = "onPowerOutOfRange";
				setTimeout(function() {
					decodeFlag = true;
				}, ENABLE60K);
			});	
			waitsFor(function()
			{
				return decodeFlag;
			}, '11sec wait to enable the Scanner', 61000);
			runs(function()
			{				
				enumData[i].start();
			});
			runs(function()
			{
				waitsFor(function() {
				return document.getElementById("actResult").innerHTML != "init";
				}, "Timed out waiting for tester to respond", 300000);
				runs(function() {
				expect("pass").toEqual(document.getElementById("actResult").innerHTML);
				});
			});
		});				
		
		it("VT282-2750 | Set  rsmBluetoothEncryption as true" , function() {

			runs(function()
			{
				setObjective("VT282-2750 | Set  rsmBluetoothEncryption as true|");
				setInstruction("Check for RSM is connected or not with calling enable <br />rsmBluetoothEncryption as true<br />scan any barcode<br />");
				setExpected("rsmBluetoothEncryption should be set to true<br /> barcode should get scanned");

			});

			runs(function()
			{
				enumData[i].rsmBluetoothEncryption = true;
			});		
			runs(function()
			{
				waitsFor(function() {
				return document.getElementById("actResult").innerHTML != "init";
				}, "Timed out waiting for tester to respond", 300000);
				runs(function() {
				expect("pass").toEqual(document.getElementById("actResult").innerHTML);
				});
			});
		});		

		it("VT282-2751 | Set  rsmBluetoothEncryption as false" , function() {

			runs(function()
			{
				setObjective("VT282-2751 | Set  rsmBluetoothEncryption as false|");
				setInstruction("Check for RSM is connected or not with calling enable <br />rsmBluetoothEncryption as false<br />scan any barcode<br />");
				setExpected("rsmBluetoothEncryption should be set to false<br /> barcode should get scanned");

			});


			runs(function()
			{
				enumData[i].rsmBluetoothEncryption = false;
			});		
			runs(function()
			{
				waitsFor(function() {
				return document.getElementById("actResult").innerHTML != "init";
				}, "Timed out waiting for tester to respond", 300000);
				runs(function() {
				expect("pass").toEqual(document.getElementById("actResult").innerHTML);
				});
			});
		});	

		it("VT282-2752 | Set  rsmBluetoothFriendlyName as MyBTScanner" , function() {

			runs(function()
			{
				setObjective("VT282-2752 | Set  rsmBluetoothFriendlyName as MyBTScanner|");
				setInstruction("Check for RSM is connected or not with calling enable <br />rsmBluetoothFriendlyName as MyBTScanner<br />Call getproperty with rsmBluetoothFriendlyName<br />");
				setExpected("The rsmBluetoothFriendlyName should return the set name (MyBTScanner)");

			});

			runs(function()
			{
				enumData[i].rsmBluetoothFriendlyName = 'MyBTScanner';
				var data = enumData[i].getProperty("rsmBluetoothFriendlyName");
				displayResult("VT282-2752 | Get  rsmBluetoothFriendlyName as MyBTScanner| ",data);
			});		
			runs(function()
			{
				waitsFor(function() {
				return document.getElementById("actResult").innerHTML != "init";
				}, "Timed out waiting for tester to respond", 300000);
				runs(function() {
				expect("pass").toEqual(document.getElementById("actResult").innerHTML);
				});
			});
		});			

		it("VT282-2753 | Set  rsmBluetoothFriendlyName as 12345scanner" , function() {

			runs(function()
			{
				setObjective("VT282-2753 | Set  rsmBluetoothFriendlyName as 12345scanner|");
				setInstruction("Check for RSM is connected or not with calling enable <br />rsmBluetoothFriendlyName as 12345scanner<br />Call getproperty with rsmBluetoothFriendlyName<br />");
				setExpected("The rsmBluetoothFriendlyName should return the set name (12345scanner)");

			});


			runs(function()
			{
				enumData[i].rsmBluetoothFriendlyName = '12345scanner';
				var data = enumData[i].getProperty("rsmBluetoothFriendlyName");
				displayResult("VT282-2753 | Get  rsmBluetoothFriendlyName as 12345scanner| ",data);
			});		
			runs(function()
			{
				waitsFor(function() {
				return document.getElementById("actResult").innerHTML != "init";
				}, "Timed out waiting for tester to respond", 300000);
				runs(function() {
				expect("pass").toEqual(document.getElementById("actResult").innerHTML);
				});
			});
		});	

		it("VT282-2754 | Set  rsmBluetoothHidAutoReconnect as NeverReconnect" , function() {

			runs(function()
			{
				setObjective("VT282-2754 | Set  rsmBluetoothHidAutoReconnect as NeverReconnect|");
				setInstruction("Check for RSM is connected or not with calling enable <br />set rsmBluetoothHidAutoReconnect as NeverReconnect<br />Call getproperty with rsmBluetoothHidAutoReconnect<br />");
				setExpected("The rsmBluetoothHidAutoReconnect should return NeverReconnect");
			});

			runs(function()
			{
				enumData[i].rsmBluetoothHidAutoReconnect = 'NeverReconnect';
				var data = enumData[i].getProperty("rsmBluetoothHidAutoReconnect");
				displayResult("VT282-2754 | Get  rsmBluetoothHidAutoReconnect as NeverReconnect| ",data);
			});		
			runs(function()
			{
				waitsFor(function() {
				return document.getElementById("actResult").innerHTML != "init";
				}, "Timed out waiting for tester to respond", 300000);
				runs(function() {
				expect("pass").toEqual(document.getElementById("actResult").innerHTML);
				});
			});
		});	

		it("VT282-2755 | Set  rsmBluetoothHidAutoReconnect as ReconnectOnData" , function() {

			runs(function()
			{
				setObjective("VT282-2755 | Set  rsmBluetoothHidAutoReconnect as ReconnectOnData|");
				setInstruction("Check for RSM is connected or not with calling enable <br />set rsmBluetoothHidAutoReconnect as ReconnectOnData<br />Call getproperty with rsmBluetoothHidAutoReconnect<br />");
				setExpected("The rsmBluetoothHidAutoReconnect should return ReconnectOnData");

			});


			runs(function()
			{
				enumData[i].rsmBluetoothHidAutoReconnect = 'ReconnectOnData';
				var data = enumData[i].getProperty("rsmBluetoothHidAutoReconnect");
				displayResult("VT282-2755 | Get  rsmBluetoothHidAutoReconnect as ReconnectOnData| ",data);
			});		
			runs(function()
			{
				waitsFor(function() {
				return document.getElementById("actResult").innerHTML != "init";
				}, "Timed out waiting for tester to respond", 300000);
				runs(function() {
				expect("pass").toEqual(document.getElementById("actResult").innerHTML);
				});
			});
		});	

		it("VT282-2756 | Set  rsmBluetoothHidAutoReconnect as ReconnectImmediately" , function() {

			runs(function()
			{
				setObjective("VT282-2756 | Set  rsmBluetoothHidAutoReconnect as ReconnectImmediately|");
				setInstruction("Check for RSM is connected or not with calling enable <br />set rsmBluetoothHidAutoReconnect as ReconnectImmediately<br />Call getproperty with rsmBluetoothHidAutoReconnect<br />");
				setExpected("The rsmBluetoothHidAutoReconnect should return ReconnectImmediately");
			});

			runs(function()
			{
				enumData[i].rsmBluetoothHidAutoReconnect = 'ReconnectImmediately';
				var data = enumData[i].getProperty("rsmBluetoothHidAutoReconnect");
				displayResult("VT282-2756 | Get  rsmBluetoothHidAutoReconnect as ReconnectImmediately| ",data);
			});		
			runs(function()
			{
				waitsFor(function() {
				return document.getElementById("actResult").innerHTML != "init";
				}, "Timed out waiting for tester to respond", 300000);
				runs(function() {
				expect("pass").toEqual(document.getElementById("actResult").innerHTML);
				});
			});
		});	

		it("VT282-2757 | Set  rsmBluetoothInquiryMode as General" , function() {

			runs(function()
			{
				setObjective("VT282-2757 | Set  rsmBluetoothInquiryMode as General|");
				setInstruction("Check for RSM is connected or not with calling enable <br />set rsmBluetoothInquiryMode as General<br />Call getproperty with rsmBluetoothInquiryMode<br />");
				setExpected("The rsmBluetoothInquiryMode should return General");
			});

			runs(function()
			{
				enumData[i].rsmBluetoothInquiryMode = 'General';
				var data = enumData[i].getProperty("rsmBluetoothInquiryMode");
				displayResult("VT282-2757 | Get  rsmBluetoothInquiryMode as General| ",data);
			});		
			runs(function()
			{
				waitsFor(function() {
				return document.getElementById("actResult").innerHTML != "init";
				}, "Timed out waiting for tester to respond", 300000);
				runs(function() {
				expect("pass").toEqual(document.getElementById("actResult").innerHTML);
				});
			});
		});		

		it("VT282-2758 | Set  rsmBluetoothInquiryMode as Limited" , function() {

			runs(function()
			{
				setObjective("VT282-2758 | Set  rsmBluetoothInquiryMode as Limited|");
				setInstruction("Check for RSM is connected or not with calling enable <br />set rsmBluetoothInquiryMode as Limited<br />Call getproperty with rsmBluetoothInquiryMode<br />");
				setExpected("The rsmBluetoothInquiryMode should return Limited");
			});

			runs(function()
			{
				enumData[i].rsmBluetoothInquiryMode = 'Limited';
				var data = enumData[i].getProperty("rsmBluetoothInquiryMode");
				displayResult("VT282-2758 | Get  rsmBluetoothInquiryMode as Limited| ",data);
			});		
			runs(function()
			{
				waitsFor(function() {
				return document.getElementById("actResult").innerHTML != "init";
				}, "Timed out waiting for tester to respond", 300000);
				runs(function() {
				expect("pass").toEqual(document.getElementById("actResult").innerHTML);
				});
			});
		});	

		it("VT282-2759 | Set  rsmBluetoothPinCode as 13579" , function() {

			runs(function()
			{
				setObjective("VT282-2759 | Set  rsmBluetoothPinCode as 13579|");
				setInstruction("Check for RSM is connected or not with calling enable <br />rsmBluetoothAuthentication as true<br /> rsmBluetoothPinCode as 13579<br />Call commandRemoteScanner with unpair to unpair the BT<br />Enable rsm again and scan the pairing barcode<br />Put the pincode as 13579 for successful pair<br />");
				setExpected("The RSM should pair after putting the pincode as 13579");
			});


			runs(function()
			{
				enumData[i].rsmBluetoothAuthentication = true;
				enumData[i].rsmBluetoothPinCode = '13579';
				enumData[i].commandRemoteScanner("unpair");
				setTimeout(function() {
					decodeFlag = true;
				}, ENABLE8K);
				waitsFor(function()
				{
					return decodeFlag;
				}, '9sec wait to enable the Scanner', 9000);				
				
			});	
			runs(function()
			{
				enumData[i].connectionIdleTimeout = 30;
				enumData[i].disconnectBtOnDisable = false;
				enumData[i].displayBtAddressBarcodeOnEnable = true;
				enumData[i].disableScannerDuringNavigate = false;
				enumData[i].enable({},callbackenable);
				setTimeout(function() {
						enableFlag = true;
					}, ENABLE8K);
			});

			waitsFor(function()
			{
				return enableFlag;
			}, '9sec wait to enable the Scanner', 9000);	
			
			runs(function()
			{
				waitsFor(function() {
				return document.getElementById("actResult").innerHTML != "init";
				}, "Timed out waiting for tester to respond", 300000);
				runs(function() {
				expect("pass").toEqual(document.getElementById("actResult").innerHTML);
				});
			});
		});	

		it("VT282-2760 | Set  rsmBluetoothPinCode as hello" , function() {
			runs(function()
			{
				setObjective("VT282-2760 | Set  rsmBluetoothPinCode as hello|");
				setInstruction("Check for RSM is connected or not with calling enable <br />rsmBluetoothAuthentication as true<br /> rsmBluetoothPinCode as hello<br />Call commandRemoteScanner with unpair to unpair the BT<br />Enable rsm again and scan the pairing barcode<br />Put the pincode as hello for successful pair<br />");
				setExpected("The RSM should pair after putting the pincode as hello");

			});

			runs(function()
			{
				enumData[i].rsmBluetoothAuthentication = true;
				enumData[i].rsmBluetoothPinCode = 'hello';
				enumData[i].commandRemoteScanner("unpair");
				setTimeout(function() {
					decodeFlag = true;
				}, ENABLE8K);
				waitsFor(function()
				{
					return decodeFlag;
				}, '9sec wait to enable the Scanner', 9000);						
			});	
			runs(function()
			{
				enumData[i].connectionIdleTimeout = 30;
				enumData[i].disconnectBtOnDisable = false;
				enumData[i].displayBtAddressBarcodeOnEnable = true;
				enumData[i].disableScannerDuringNavigate = false;
				enumData[i].enable({},callbackenable);
				setTimeout(function() {
						enableFlag = true;
					}, ENABLE8K);
			});

			waitsFor(function()
			{
				return enableFlag;
			}, '9sec wait to enable the Scanner', 9000);	
			
			runs(function()
			{
				waitsFor(function() {
				return document.getElementById("actResult").innerHTML != "init";
				}, "Timed out waiting for tester to respond", 300000);
				runs(function() {
				expect("pass").toEqual(document.getElementById("actResult").innerHTML);
				});
			});
		});	

		it("VT282-2761 | Set  rsmBluetoothPinCodeType as UseStored" , function() {
			runs(function()
			{
				setObjective("VT282-2761 | Set  rsmBluetoothPinCodeType as UseStored|");
				setInstruction("Check for RSM is connected or not with calling enable <br />rsmBluetoothAuthentication as true<br /> rsmBluetoothPinCodeType as UseStored<br />call commandRemoteScanner with unpair to unpair the BT<br />Enable rsm again and scan the pairing barcode<br />put the pincode as 12345 for successful pair<br />");
				setExpected("The RSM should pair after putting the pincode as 12345 (default)");
			});

			waitsFor(function()
			{
				return enableFlag;
			}, '2sec wait to enable the Scanner', 9000);

			runs(function()
			{
				enumData[i].rsmBluetoothAuthentication = true;
				enumData[i].rsmBluetoothPinCodeType = 'UseStored';
				enumData[i].commandRemoteScanner("unpair");
				setTimeout(function() {
					decodeFlag = true;
				}, ENABLE8K);
				waitsFor(function()
				{
					return decodeFlag;
				}, '9sec wait to enable the Scanner', 9000);						
			});	
			runs(function()
			{
				enumData[i].connectionIdleTimeout = 30;
				enumData[i].disconnectBtOnDisable = false;
				enumData[i].displayBtAddressBarcodeOnEnable = true;
				enumData[i].disableScannerDuringNavigate = false;
				enumData[i].enable({},callbackenable);
				setTimeout(function() {
						enableFlag = true;
					}, ENABLE8K);
			});

			waitsFor(function()
			{
				return enableFlag;
			}, '9sec wait to enable the Scanner', 9000);	
			
			runs(function()
			{
				waitsFor(function() {
				return document.getElementById("actResult").innerHTML != "init";
				}, "Timed out waiting for tester to respond", 300000);
				runs(function() {
				expect("pass").toEqual(document.getElementById("actResult").innerHTML);
				});
			});
		});
		
		it("VT282-2762 | Set  rsmBluetoothPinCodeType as PromptUser" , function() {
			runs(function()
			{
				setObjective("VT282-2762 | Set  rsmBluetoothPinCodeType as PromptUser|");
				setInstruction("Check for RSM is connected or not with calling enable <br />rsmBluetoothAuthentication as true<br /> rsmBluetoothPinCodeType as PromptUser<br />call commandRemoteScanner with unpair to unpair the BT<br />Enable rsm again and scan the pairing barcode<br />Scan the barcode for pincode<br />");
				setExpected("ring scanner should be used to scan 5 alpha numeric barcodes to define the PIN, eg. '1', '2', '3', '4', '5' (for PIN 12345)");
				
			});

			
			runs(function()
			{
				enumData[i].rsmBluetoothAuthentication = true;
				enumData[i].rsmBluetoothPinCodeType = 'PromptUser';
				enumData[i].commandRemoteScanner("unpair");
				
				setTimeout(function() {
					decodeFlag = true;
				}, ENABLE8K);
				waitsFor(function()
				{
					return decodeFlag;
				}, '9sec wait to enable the Scanner', 9000);						
			});	
			runs(function()
			{
				enumData[i].connectionIdleTimeout = 30;
				enumData[i].disconnectBtOnDisable = false;
				enumData[i].displayBtAddressBarcodeOnEnable = true;
				enumData[i].disableScannerDuringNavigate = false;
				enumData[i].enable({},callbackenable);
				setTimeout(function() {
						enableFlag = true;
					}, ENABLE8K);
			});

			waitsFor(function()
			{
				return enableFlag;
			}, '9sec wait to enable the Scanner', 9000);				
			
			runs(function()
			{
				waitsFor(function() {
				return document.getElementById("actResult").innerHTML != "init";
				}, "Timed out waiting for tester to respond", 300000);
				runs(function() {
				expect("pass").toEqual(document.getElementById("actResult").innerHTML);
				});
			});
		});		

		it("VT282-2763 | Set rsmBluetoothReconnectionAttempts as 30 sec with taking RSM out of range" , function() {
			runs(function()
			{
				setObjective("VT282-2763 | Set rsmBluetoothReconnectionAttempts as 30 sec with taking RSM out of range|");
				setInstruction("Check for RSM is connected or not with calling enable <br />rsmBluetoothReconnectionAttempts as 30<br /> Take the RSM device out of range from the mobile device and get it back within time for reconnection specified.(2 min wait)<br />Call start and check BT scanner is emitting beam or not<br />");
				setExpected("The RSM device should be connected automatically after coming near to the device. within 30 second");

			});

			runs(function()
			{
				enumData[i].rsmBluetoothReconnectionAttempts = 30;
				
			});	
			waitsFor(function()
			{
			}, '2 min wait for reconnection', 120000);
			runs(function()
			{				
				enumData[i].start();
			});
			
			runs(function()
			{
				waitsFor(function() {
				return document.getElementById("actResult").innerHTML != "init";
				}, "Timed out waiting for tester to respond", 300000);
				runs(function() {
				expect("pass").toEqual(document.getElementById("actResult").innerHTML);
				});
			});
		});	

		it("VT282-2764 | Set rsmBluetoothReconnectionAttempts as 60 sec with taking RSM out of range" , function() {
			runs(function()
			{
				setObjective("VT282-2764 | Set rsmBluetoothReconnectionAttempts as 60 sec with taking RSM out of range|");
				setInstruction("Check for RSM is connected or not with calling enable <br />rsmBluetoothReconnectionAttempts as 60<br /> rsmBluetoothAutoReconnect as onPowerOutOfRange<br />Remove the battery from the RSM device and put it back(2 min wait)<br />Call start and check BT scanner is emitting beam or not<br />");
				setExpected("The RSM device should be connected automatically after coming near to the device. within 60 second");

			});

			runs(function()
			{
				enumData[i].rsmBluetoothReconnectionAttempts = 60;
				enumData[i].rsmBluetoothAutoReconnect = "onPowerOutOfRange";
				
			});	
			waitsFor(function()
			{
			}, '2 min wait for reconnection', 120000);
			runs(function()
			{				
				enumData[i].start();
			});
			
			runs(function()
			{
				waitsFor(function() {
				return document.getElementById("actResult").innerHTML != "init";
				}, "Timed out waiting for tester to respond", 300000);
				runs(function() {
				expect("pass").toEqual(document.getElementById("actResult").innerHTML);
				});
			});
		});	

		it("VT282-2765 | Set rsmDecodeFeedback as true" , function() {
			runs(function()
			{
				setObjective("VT282-2765 | Set rsmDecodeFeedback as true|");
				setInstruction("Check for RSM is connected or not with calling enable <br /> rsmDecodeFeedback as true<br /> scan any barcode<br />Check for the beep sound and green LED illumination<br />");
				setExpected("The remote scanner should beep and illuminate its green LED on a successful decode.");
			});


			runs(function()
			{
				enumData[i].rsmDecodeFeedback = true;
				
			});	
			
			runs(function()
			{
				waitsFor(function() {
				return document.getElementById("actResult").innerHTML != "init";
				}, "Timed out waiting for tester to respond", 300000);
				runs(function() {
				expect("pass").toEqual(document.getElementById("actResult").innerHTML);
				});
			});
		});	

		it("VT282-2766 | Set rsmDecodeFeedback as false" , function() {
			runs(function()
			{
				setObjective("VT282-2766 | Set rsmDecodeFeedback as false|");
				setInstruction("Check for RSM is connected or not with calling enable <br /> rsmDecodeFeedback as false<br /> scan any barcode<br />Check for the beep sound and green LED illumination<br />");
				setExpected("The remote scanner should not beep and should not illuminate its green LED on a successful decode.");

			});


			runs(function()
			{
				enumData[i].rsmDecodeFeedback = false;
				
			});	
			
			runs(function()
			{
				waitsFor(function() {
				return document.getElementById("actResult").innerHTML != "init";
				}, "Timed out waiting for tester to respond", 300000);
				runs(function() {
				expect("pass").toEqual(document.getElementById("actResult").innerHTML);
				});
			});
		});			

		it("VT282-2767 | set rsmForceSavePairingBarcode as true" , function() {
			runs(function()
			{
				setObjective("VT282-2767 | set rsmForceSavePairingBarcode as true|");
				setInstruction("Check for RSM is connected or not with calling enable <br /> rsmForceSavePairingBarcode as true<br /> scan any barcode<br />call getproperty with rsmForceSavePairingBarcode<br />");
				setExpected("getproperty should return true and barcode should scan.");

			});


			runs(function()
			{
				enumData[i].rsmForceSavePairingBarcode = true;
				var data = enumData[i].getProperty("rsmForceSavePairingBarcode");
				displayResult("VT282-2767 | set rsmForceSavePairingBarcode as true| ",data);
				
			});	


			runs(function()
			{
				waitsFor(function() {
				return document.getElementById("actResult").innerHTML != "init";
				}, "Timed out waiting for tester to respond", 300000);
				runs(function() {
				expect("pass").toEqual(document.getElementById("actResult").innerHTML);
				});
			});
		});		

		it("VT282-2768 | set rsmForceSavePairingBarcode as false" , function() {
			runs(function()
			{
				setObjective("VT282-2768 | set rsmForceSavePairingBarcode as false|");
				setInstruction("Check for RSM is connected or not with calling enable <br /> rsmForceSavePairingBarcode as false<br /> scan any barcode<br />call getproperty with rsmForceSavePairingBarcode<br />");
				setExpected("getproperty should return false and barcode should scan.");

			});


			runs(function()
			{
				enumData[i].rsmForceSavePairingBarcode = false;
				var data = enumData[i].getProperty("rsmForceSavePairingBarcode");
				displayResult("VT282-2768 | set rsmForceSavePairingBarcode as false| ",data);
				
			});	


			runs(function()
			{
				waitsFor(function() {
				return document.getElementById("actResult").innerHTML != "init";
				}, "Timed out waiting for tester to respond", 300000);
				runs(function() {
				expect("pass").toEqual(document.getElementById("actResult").innerHTML);
				});
			});
		});	

		it("VT282-2769 | set rsmGoodScansDelay as true" , function() {
			runs(function()
			{
				setObjective("VT282-2769 | set rsmGoodScansDelay as true|");
				setInstruction("Check for RSM is connected or not with calling enable <br /> set rsmGoodScansDelay as true<br /> scan any barcode<br />call getproperty with rsmGoodScansDelay<br />");
				setExpected("getproperty should return true and barcode should scan.");

			});



			runs(function()
			{
				enumData[i].rsmGoodScansDelay = true;
				var data = enumData[i].getProperty("rsmGoodScansDelay");
				displayResult("VT282-2769 | set rsmGoodScansDelay as true| ",data);
				
			});	


			runs(function()
			{
				waitsFor(function() {
				return document.getElementById("actResult").innerHTML != "init";
				}, "Timed out waiting for tester to respond", 300000);
				runs(function() {
				expect("pass").toEqual(document.getElementById("actResult").innerHTML);
				});
			});
		});	

		it("VT282-2770 | set rsmGoodScansDelay as false" , function() {
			runs(function()
			{
				setObjective("VT282-2769 | set rsmGoodScansDelay as false|");
				setInstruction("Check for RSM is connected or not with calling enable <br /> set rsmGoodScansDelay as false<br /> scan any barcode<br />call getproperty with rsmGoodScansDelay<br />");
				setExpected("getproperty should return false and barcode should scan.");

			});


			runs(function()
			{
				enumData[i].rsmGoodScansDelay = false;
				var data = enumData[i].getProperty("rsmGoodScansDelay");
				displayResult("VT282-2770 | set rsmGoodScansDelay as false| ",data);
				
			});	


			runs(function()
			{
				waitsFor(function() {
				return document.getElementById("actResult").innerHTML != "init";
				}, "Timed out waiting for tester to respond", 300000);
				runs(function() {
				expect("pass").toEqual(document.getElementById("actResult").innerHTML);
				});
			});
		});					

		it("VT282-2771 | set rsmIgnoreCode128Usps as true" , function() {
			runs(function()
			{
				setObjective("VT282-2771 | set rsmIgnoreCode128Usps as true|");
				setInstruction("Check for RSM is connected or not with calling enable <br />  rsmIgnoreCode128Usps as true<br /> scan the  Code 128 barcodes beginning with 420 and 421<br />scan other 128 barcodes<br />");
				setExpected("Code 128 barcodes beginning with 420 and 421 should decode");

			});


			runs(function()
			{
				enumData[i].rsmIgnoreCode128Usps = true;
			});	


			runs(function()
			{
				waitsFor(function() {
				return document.getElementById("actResult").innerHTML != "init";
				}, "Timed out waiting for tester to respond", 300000);
				runs(function() {
				expect("pass").toEqual(document.getElementById("actResult").innerHTML);
				});
			});
		});	

		it("VT282-2772 | set rsmIgnoreCode128Usps as false" , function() {
			runs(function()
			{
				setObjective("VT282-2772 | set rsmIgnoreCode128Usps as false|");
				setInstruction("Check for RSM is connected or not with calling enable <br />  rsmIgnoreCode128Usps as false<br /> scan the  Code 128 barcodes beginning with 420 and 421<br />scan other 128 barcodes<br />");
				setExpected("Code 128 barcodes beginning with 420 and 421 will not decode");

			});


			runs(function()
			{
				enumData[i].rsmIgnoreCode128Usps = false;
			});	


			runs(function()
			{
				waitsFor(function() {
				return document.getElementById("actResult").innerHTML != "init";
				}, "Timed out waiting for tester to respond", 300000);
				runs(function() {
				expect("pass").toEqual(document.getElementById("actResult").innerHTML);
				});
			});
		});			

		it("VT282-2773 | set rsmLowBatteryIndication as true" , function() {
			runs(function()
			{
				setObjective("VT282-2773 | set rsmLowBatteryIndication as true|");
				setInstruction("Check for RSM is connected or not with calling enable <br />  rsmLowBatteryIndication as true<br /> scan any barcode<br />call getproperty with rsmLowBatteryIndication<br />");
				setExpected("getproperty should return true and barcode should scan");

			});

			runs(function()
			{
				enumData[i].rsmLowBatteryIndication = true;
				var data = enumData[i].getProperty("rsmLowBatteryIndication");
				displayResult("VT282-2773 | set rsmLowBatteryIndication as true| ",data);
			});	


			runs(function()
			{
				waitsFor(function() {
				return document.getElementById("actResult").innerHTML != "init";
				}, "Timed out waiting for tester to respond", 300000);
				runs(function() {
				expect("pass").toEqual(document.getElementById("actResult").innerHTML);
				});
			});
		});		

		it("VT282-2774 | set rsmLowBatteryIndication as false" , function() {
			runs(function()
			{
				setObjective("VT282-2774 | set rsmLowBatteryIndication as false|");
				setInstruction("Check for RSM is connected or not with calling enable <br />  rsmLowBatteryIndication as false<br /> scan any barcode<br />call getproperty with rsmLowBatteryIndication<br />");
				setExpected("getproperty should return false and barcode should scan");

			});


			runs(function()
			{
				enumData[i].rsmLowBatteryIndication = false;
				var data = enumData[i].getProperty("rsmLowBatteryIndication");
				displayResult("VT282-2774 | set rsmLowBatteryIndication as false| ",data);
			});	


			runs(function()
			{
				waitsFor(function() {
				return document.getElementById("actResult").innerHTML != "init";
				}, "Timed out waiting for tester to respond", 300000);
				runs(function() {
				expect("pass").toEqual(document.getElementById("actResult").innerHTML);
				});
			});
		});				

		it("VT282-2775 | set rsmLowBatteryIndicationCycle as 15" , function() {
			runs(function()
			{
				setObjective("VT282-2775 | set rsmLowBatteryIndicationCycle as 15|");
				setInstruction("Check for RSM is connected or not with calling enable <br />  rsmLowBatteryIndicationCycle as 15<br /> scan any barcode<br />call getproperty with rsmLowBatteryIndicationCycle<br />");
				setExpected("getproperty should return 15 and barcode should scan");

			});



			runs(function()
			{
				enumData[i].rsmLowBatteryIndicationCycle = 15;
				var data = enumData[i].getProperty("rsmLowBatteryIndicationCycle");
				displayResult("VT282-2775 | set rsmLowBatteryIndicationCycle as 15| ",data);
			});	


			runs(function()
			{
				waitsFor(function() {
				return document.getElementById("actResult").innerHTML != "init";
				}, "Timed out waiting for tester to respond", 300000);
				runs(function() {
				expect("pass").toEqual(document.getElementById("actResult").innerHTML);
				});
			});
		});		

		it("VT282-2776 | set rsmLowBatteryIndicationCycle as 60" , function() {
			runs(function()
			{
				setObjective("VT282-2776 | set rsmLowBatteryIndicationCycle as 60|");
				setInstruction("Check for RSM is connected or not with calling enable <br />  rsmLowBatteryIndicationCycle as 60<br /> scan any barcode<br />call getproperty with rsmLowBatteryIndicationCycle<br />");
				setExpected("getproperty should return 60 and barcode should scan");

			});



			runs(function()
			{
				enumData[i].rsmLowBatteryIndicationCycle = 60;
				var data = enumData[i].getProperty("rsmLowBatteryIndicationCycle");
				displayResult("VT282-2776 | set rsmLowBatteryIndicationCycle as 60| ",data);
			});	


			runs(function()
			{
				waitsFor(function() {
				return document.getElementById("actResult").innerHTML != "init";
				}, "Timed out waiting for tester to respond", 300000);
				runs(function() {
				expect("pass").toEqual(document.getElementById("actResult").innerHTML);
				});
			});
		});	

		it("VT282-2777 | set rsmLowBatteryIndicationCycle as 120" , function() {
			runs(function()
			{
				setObjective("VT282-2777 | set rsmLowBatteryIndicationCycle as 120|");
				setInstruction("Check for RSM is connected or not with calling enable <br />  rsmLowBatteryIndicationCycle as 120<br /> scan any barcode<br />call getproperty with rsmLowBatteryIndicationCycle<br />");
				setExpected("getproperty should return 120 and barcode should scan");

			});


			runs(function()
			{
				enumData[i].rsmLowBatteryIndicationCycle = 120;
				var data = enumData[i].getProperty("rsmLowBatteryIndicationCycle");
				displayResult("VT282-2777 | set rsmLowBatteryIndicationCycle as 120| ",data);
			});	


			runs(function()
			{
				waitsFor(function() {
				return document.getElementById("actResult").innerHTML != "init";
				}, "Timed out waiting for tester to respond", 300000);
				runs(function() {
				expect("pass").toEqual(document.getElementById("actResult").innerHTML);
				});
			});
		});			

		it("VT282-2778 | set rsmMems as true" , function() {
			runs(function()
			{
				setObjective("VT282-2778 | set rsmMems as true|");
				setInstruction("Check for RSM is connected or not with calling enable <br />   rsmMems as true<br /> scan any barcode<br />call getproperty with rsmMems<br />");
				setExpected("getproperty should return true and barcode should scan");

			});



			runs(function()
			{
				enumData[i].rsmMems = true;
				var data = enumData[i].getProperty("rsmMems");
				displayResult("VT282-2778 | set rsmMems as true| ",data);
			});	


			runs(function()
			{
				waitsFor(function() {
				return document.getElementById("actResult").innerHTML != "init";
				}, "Timed out waiting for tester to respond", 300000);
				runs(function() {
				expect("pass").toEqual(document.getElementById("actResult").innerHTML);
				});
			});
		});		

		it("VT282-2779 | set rsmMems as false" , function() {
			runs(function()
			{
				setObjective("VT282-2779 | set rsmMems as false|");
				setInstruction("Check for RSM is connected or not with calling enable <br />   rsmMems as false<br /> scan any barcode<br />call getproperty with rsmMems<br />");
				setExpected("getproperty should return false and barcode should scan");

			});



			runs(function()
			{
				enumData[i].rsmMems = false;
				var data = enumData[i].getProperty("rsmMems");
				displayResult("VT282-2779 | set rsmMems as false| ",data);
			});	


			runs(function()
			{
				waitsFor(function() {
				return document.getElementById("actResult").innerHTML != "init";
				}, "Timed out waiting for tester to respond", 300000);
				runs(function() {
				expect("pass").toEqual(document.getElementById("actResult").innerHTML);
				});
			});
		});		

		it("VT282-2780 | set rsmPagingBeepSequence as 0" , function() {
			runs(function()
			{
				setObjective("VT282-2780 | set rsmPagingBeepSequence as 0|");
				setInstruction("Check for RSM is connected or not with calling enable <br />   rsmPagingBeepSequence as 0<br /> scan any barcode<br />call getproperty with rsmPagingBeepSequence<br />");
				setExpected("getproperty should return 0 and barcode should scan");

			});


			runs(function()
			{
				enumData[i].rsmPagingBeepSequence = 0;
				var data = enumData[i].getProperty("rsmPagingBeepSequence");
				displayResult("VT282-2780 | set rsmPagingBeepSequence as 0| ",data);
			});	


			runs(function()
			{
				waitsFor(function() {
				return document.getElementById("actResult").innerHTML != "init";
				}, "Timed out waiting for tester to respond", 300000);
				runs(function() {
				expect("pass").toEqual(document.getElementById("actResult").innerHTML);
				});
			});
		});	

		it("VT282-2781 | set rsmPagingBeepSequence as 15" , function() {
			runs(function()
			{
				setObjective("VT282-2781 | set rsmPagingBeepSequence as 15|");
				setInstruction("Check for RSM is connected or not with calling enable <br />   rsmPagingBeepSequence as 15<br /> scan any barcode<br />call getproperty with rsmPagingBeepSequence<br />");

			});



			runs(function()
			{
				enumData[i].rsmPagingBeepSequence = 15;
				var data = enumData[i].getProperty("rsmPagingBeepSequence");
				displayResult("VT282-2781 | set rsmPagingBeepSequence as 15| ",data);
			});	


			runs(function()
			{
				waitsFor(function() {
				return document.getElementById("actResult").innerHTML != "init";
				}, "Timed out waiting for tester to respond", 300000);
				runs(function() {
				expect("pass").toEqual(document.getElementById("actResult").innerHTML);
				});
			});
		});
		
		it("VT282-2782 | set rsmPagingBeepSequence as 7" , function() {
			runs(function()
			{
				setObjective("VT282-2782 | set rsmPagingBeepSequence as 7|");
				setInstruction("Check for RSM is connected or not with calling enable <br />   rsmPagingBeepSequence as 7<br /> scan any barcode<br />call getproperty with rsmPagingBeepSequence<br />");
				setExpected("getproperty should return 7 and barcode should scan");

			});



			runs(function()
			{
				enumData[i].rsmPagingBeepSequence = 7;
				var data = enumData[i].getProperty("rsmPagingBeepSequence");
				displayResult("VT282-2782 | set rsmPagingBeepSequence as 7| ",data);
			});	


			runs(function()
			{
				waitsFor(function() {
				return document.getElementById("actResult").innerHTML != "init";
				}, "Timed out waiting for tester to respond", 300000);
				runs(function() {
				expect("pass").toEqual(document.getElementById("actResult").innerHTML);
				});
			});
		});		

		it("VT282-2783 | set rsmPagingEnable as true" , function() {
			runs(function()
			{
				setObjective("VT282-2783 | set rsmPagingEnable as true|");
				setInstruction("Check for RSM is connected or not with calling enable <br />   rsmPagingEnable as true<br /> scan any barcode<br />call getproperty with rsmPagingEnable<br />");
				setExpected("getproperty should return true and barcode should scan");

			});

	

			runs(function()
			{
				enumData[i].rsmPagingBeepSequence = true;
				var data = enumData[i].getProperty("rsmPagingEnable");
				displayResult("VT282-2783 | set rsmPagingEnable as true| ",data);
			});	


			runs(function()
			{
				waitsFor(function() {
				return document.getElementById("actResult").innerHTML != "init";
				}, "Timed out waiting for tester to respond", 300000);
				runs(function() {
				expect("pass").toEqual(document.getElementById("actResult").innerHTML);
				});
			});
		});	

		it("VT282-2784 | set rsmPagingEnable as false" , function() {
			runs(function()
			{
				setObjective("VT282-2784 | set rsmPagingEnable as false|");
				setInstruction("Check for RSM is connected or not with calling enable <br />   rsmPagingEnable as false<br /> scan any barcode<br />call getproperty with rsmPagingEnable<br />");
				setExpected("getproperty should return false and barcode should scan");

			});

			runs(function()
			{
				enumData[i].rsmPagingBeepSequence = false;
				var data = enumData[i].getProperty("rsmPagingEnable");
				displayResult("VT282-2784 | set rsmPagingEnable as false| ",data);
			});	


			runs(function()
			{
				waitsFor(function() {
				return document.getElementById("actResult").innerHTML != "init";
				}, "Timed out waiting for tester to respond", 300000);
				runs(function() {
				expect("pass").toEqual(document.getElementById("actResult").innerHTML);
				});
			});
		});		

		it("VT282-2785 | set rsmProximityContinuous as true" , function() {
			runs(function()
			{
				setObjective("VT282-2785 | set rsmProximityContinuous as true|");
				setInstruction("Check for RSM is connected or not with calling enable <br />   rsmProximityContinuous as true<br /> scan any barcode<br />call getproperty with rsmProximityContinuous<br />");
				setExpected("getproperty should return true and barcode should scan");

			});



			runs(function()
			{
				enumData[i].rsmProximityContinuous = true;
				var data = enumData[i].getProperty("rsmProximityContinuous");
				displayResult("VT282-2785 | set rsmProximityContinuous as true| ",data);
			});	


			runs(function()
			{
				waitsFor(function() {
				return document.getElementById("actResult").innerHTML != "init";
				}, "Timed out waiting for tester to respond", 300000);
				runs(function() {
				expect("pass").toEqual(document.getElementById("actResult").innerHTML);
				});
			});
		});		

		it("VT282-2786 | set rsmProximityContinuous as false" , function() {
			runs(function()
			{
				setObjective("VT282-2786 | set rsmProximityContinuous as false|");
				setInstruction("Check for RSM is connected or not with calling enable <br />   rsmProximityContinuous as false<br /> scan any barcode<br />call getproperty with rsmProximityContinuous<br />");
				setExpected("getproperty should return false and barcode should scan");

			});


			runs(function()
			{
				enumData[i].rsmProximityContinuous = false;
				var data = enumData[i].getProperty("rsmProximityContinuous");
				displayResult("VT282-2786 | set rsmProximityContinuous as false| ",data);
			});	


			runs(function()
			{
				waitsFor(function() {
				return document.getElementById("actResult").innerHTML != "init";
				}, "Timed out waiting for tester to respond", 300000);
				runs(function() {
				expect("pass").toEqual(document.getElementById("actResult").innerHTML);
				});
			});
		});	

		it("VT282-2787 | set rsmProximityDistance as Short" , function() {
			runs(function()
			{
				setObjective("VT282-2787 | set rsmProximityDistance as Short|");
				setInstruction("Check for RSM is connected or not with calling enable <br />   set rsmProximityDistance as Short<br /> scan any barcode<br />call getproperty with rsmProximityDistance<br />");
				setExpected("getproperty should return Short and barcode should scan");

			});



			runs(function()
			{
				enumData[i].rsmProximityDistance = 'Short';
				var data = enumData[i].getProperty("rsmProximityDistance");
				displayResult("VT282-2787 | set rsmProximityDistance as Short| ",data);
			});	


			runs(function()
			{
				waitsFor(function() {
				return document.getElementById("actResult").innerHTML != "init";
				}, "Timed out waiting for tester to respond", 300000);
				runs(function() {
				expect("pass").toEqual(document.getElementById("actResult").innerHTML);
				});
			});
		});	

		it("VT282-2788 | set rsmProximityDistance as Medium" , function() {
			runs(function()
			{
				setObjective("VT282-2788 | set rsmProximityDistance as Medium|");
				setInstruction("Check for RSM is connected or not with calling enable <br />   set rsmProximityDistance as Medium<br /> scan any barcode<br />call getproperty with rsmProximityDistance<br />");
				setExpected("getproperty should return Medium and barcode should scan");

			});



			runs(function()
			{
				enumData[i].rsmProximityDistance = 'Medium';
				var data = enumData[i].getProperty("rsmProximityDistance");
				displayResult("VT282-2788 | set rsmProximityDistance as Medium| ",data);
			});	


			runs(function()
			{
				waitsFor(function() {
				return document.getElementById("actResult").innerHTML != "init";
				}, "Timed out waiting for tester to respond", 300000);
				runs(function() {
				expect("pass").toEqual(document.getElementById("actResult").innerHTML);
				});
			});
		});	

		it("VT282-2789 | set rsmProximityDistance as Long" , function() {
			runs(function()
			{
				setObjective("VT282-2789 | set rsmProximityDistance as Long|");
				setInstruction("Check for RSM is connected or not with calling enable <br />   set rsmProximityDistance as Long<br /> scan any barcode<br />call getproperty with rsmProximityDistance<br />");
				setExpected("getproperty should return Long and barcode should scan");

			});



			runs(function()
			{
				enumData[i].rsmProximityDistance = 'Long';
				var data = enumData[i].getProperty("rsmProximityDistance");
				displayResult("VT282-2789 | set rsmProximityDistance as Long| ",data);
			});	


			runs(function()
			{
				waitsFor(function() {
				return document.getElementById("actResult").innerHTML != "init";
				}, "Timed out waiting for tester to respond", 300000);
				runs(function() {
				expect("pass").toEqual(document.getElementById("actResult").innerHTML);
				});
			});
		});	

		it("VT282-2790 | set rsmProximityEnable as true" , function() {
			runs(function()
			{
				setObjective("VT282-2790 | set rsmProximityEnable as true|");
				setInstruction("Check for RSM is connected or not with calling enable <br />   rsmProximityEnable as true<br /> scan any barcode<br />call getproperty with rsmProximityEnable<br />");
				setExpected("getproperty should return true and barcode should scan");

			});


			runs(function()
			{
				enumData[i].rsmProximityEnable = true;
				var data = enumData[i].getProperty("rsmProximityEnable");
				displayResult("VT282-2790 | set rsmProximityEnable as true| ",data);
			});	


			runs(function()
			{
				waitsFor(function() {
				return document.getElementById("actResult").innerHTML != "init";
				}, "Timed out waiting for tester to respond", 300000);
				runs(function() {
				expect("pass").toEqual(document.getElementById("actResult").innerHTML);
				});
			});
		});	

		it("VT282-2791 | set rsmProximityEnable as false" , function() {
			runs(function()
			{
				setObjective("VT282-2791 | set rsmProximityEnable as false|");
				setInstruction("Check for RSM is connected or not with calling enable <br />   rsmProximityEnable as false<br /> scan any barcode<br />call getproperty with rsmProximityEnable<br />");
				setExpected("getproperty should return false and barcode should scan");

			});


			runs(function()
			{
				enumData[i].rsmProximityEnable = false;
				var data = enumData[i].getProperty("rsmProximityEnable");
				displayResult("VT282-2791 | set rsmProximityEnable as false| ",data);
			});	


			runs(function()
			{
				waitsFor(function() {
				return document.getElementById("actResult").innerHTML != "init";
				}, "Timed out waiting for tester to respond", 300000);
				runs(function() {
				expect("pass").toEqual(document.getElementById("actResult").innerHTML);
				});
			});
		});		
		
		it("VT282-2792 | set rsmScanLineWidth as Wide" , function() {
			runs(function()
			{
				setObjective("VT282-2792 | set rsmScanLineWidth as Wide|");
				setInstruction("Check for RSM is connected or not with calling enable <br />   rsmScanLineWidth as Wide<br /> scan any barcode<br />call getproperty with rsmScanLineWidth as Wide<br />");
				setExpected("getproperty should return Wide and barcode should scan");

			});


			runs(function()
			{
				enumData[i].rsmScanLineWidth = 'Wide';
				var data = enumData[i].getProperty("rsmScanLineWidth");
				displayResult("VT282-2792 | set rsmScanLineWidth as Wide| ",data);
			});	


			runs(function()
			{
				waitsFor(function() {
				return document.getElementById("actResult").innerHTML != "init";
				}, "Timed out waiting for tester to respond", 300000);
				runs(function() {
				expect("pass").toEqual(document.getElementById("actResult").innerHTML);
				});
			});
		});	

		it("VT282-2793 | set rsmScanLineWidth as Narrow" , function() {
			runs(function()
			{
				setObjective("VT282-2792 | set rsmScanLineWidth as Narrow|");
				setInstruction("Check for RSM is connected or not with calling enable <br />   rsmScanLineWidth as Narrow<br /> scan any barcode<br />call getproperty with rsmScanLineWidth as Narrow<br />");
				setExpected("getproperty should return Narrow and barcode should scan");

			});



			runs(function()
			{
				enumData[i].rsmScanLineWidth = 'Narrow';
				var data = enumData[i].getProperty("rsmScanLineWidth");
				displayResult("VT282-2792 | set rsmScanLineWidth as Narrow| ",data);
			});	


			runs(function()
			{
				waitsFor(function() {
				return document.getElementById("actResult").innerHTML != "init";
				}, "Timed out waiting for tester to respond", 300000);
				runs(function() {
				expect("pass").toEqual(document.getElementById("actResult").innerHTML);
				});
			});
		});	

		it("VT282-2794 | set rsmScanTriggerWakeup as true" , function() {
			runs(function()
			{
				setObjective("VT282-2794 | set rsmScanTriggerWakeup as true|");
				setInstruction("Check for RSM is connected or not with calling enable <br />   rsmScanTriggerWakeup as true<br /> scan any barcode<br />call getproperty with rsmScanTriggerWakeup<br />");
				setExpected("getproperty should return true and barcode should scan");

			});

			waitsFor(function()
			{
				return enableFlag;
			}, '2sec wait to enable the Scanner', 9000);

			runs(function()
			{
				enumData[i].rsmScanTriggerWakeup = true;
				var data = enumData[i].getProperty("rsmScanTriggerWakeup");
				displayResult("VT282-2794 | set rsmScanTriggerWakeup as true| ",data);
			});	


			runs(function()
			{
				waitsFor(function() {
				return document.getElementById("actResult").innerHTML != "init";
				}, "Timed out waiting for tester to respond", 300000);
				runs(function() {
				expect("pass").toEqual(document.getElementById("actResult").innerHTML);
				});
			});
		});	

		it("VT282-2795 | set rsmScanTriggerWakeup as false" , function() {
			runs(function()
			{
				setObjective("VT282-2795 | set rsmScanTriggerWakeup as false|");
				setInstruction("Check for RSM is connected or not with calling enable <br />   rsmScanTriggerWakeup as false<br /> scan any barcode<br />call getproperty with rsmScanTriggerWakeup<br />");
				setExpected("getproperty should return false and barcode should scan");
			});



			runs(function()
			{
				enumData[i].rsmScanTriggerWakeup = false;
				var data = enumData[i].getProperty("rsmScanTriggerWakeup");
				displayResult("VT282-2795 | set rsmScanTriggerWakeup as false| ",data);
			});	


			runs(function()
			{
				waitsFor(function() {
				return document.getElementById("actResult").innerHTML != "init";
				}, "Timed out waiting for tester to respond", 300000);
				runs(function() {
				expect("pass").toEqual(document.getElementById("actResult").innerHTML);
				});
			});
		});	

		it("VT282-2796 | call setproperty with rsmBluetoothAuthentication as true" , function() {

			runs(function()
			{
				setObjective("VT282-2796 | call setproperty with rsmBluetoothAuthentication as true|");
				setInstruction("Check for RSM is connected or not with calling enable <br />rsmBluetoothAuthentication as true<br />Unpair the RSM<br />Enable the RSM again<br /> pair with paring barcode and check for passcode to be asked or not");
				setExpected("The RSM device should ask for passcode while pairing with device");

			});

			
			runs(function()
			{	
				enumData[i].setProperty("rsmBluetoothAuthentication", "true");
				enumData[i].commandRemoteScanner("unpair")
				setTimeout(function() {
					decodeFlag = true;
				}, ENABLE8K);
				waitsFor(function()
				{
					return decodeFlag;
				}, '9sec wait to enable the Scanner', 9000);
			});	
			

			runs(function()
			{
				enumData[i].connectionIdleTimeout = 30;
				enumData[i].disconnectBtOnDisable = false;
				enumData[i].displayBtAddressBarcodeOnEnable = true;
				enumData[i].disableScannerDuringNavigate = false;
				enumData[i].enable({},callbackenable);
				setTimeout(function() {
						enableFlag = true;
					}, ENABLE8K);
			});

			waitsFor(function()
			{
				return enableFlag;
			}, '9sec wait to enable the Scanner', 9000);	
						
			
			runs(function()
			{
				waitsFor(function() {
				return document.getElementById("actResult").innerHTML != "init";
				}, "Timed out waiting for tester to respond", 300000);
				runs(function() {
				expect("pass").toEqual(document.getElementById("actResult").innerHTML);
				});
			});
		});

		it("VT282-2797 | call setproperty with rsmBluetoothAuthentication as false" , function() {

			runs(function()
			{
				setObjective("VT282-2797 | call setproperty with rsmBluetoothAuthentication as false|");
				setInstruction("Check for RSM is connected or not with calling enable <br />rsmBluetoothAuthentication as false<br />Unpair the RSM<br />Enable the RSM again<br /> pair with paring barcode and check for passcode to be asked or not");
				setExpected("The RSM device should not ask for passcode while pairing with device");

			});


			
			runs(function()
			{	
				enumData[i].setProperty("rsmBluetoothAuthentication", "false");
				enumData[i].commandRemoteScanner("unpair")
				setTimeout(function() {
					decodeFlag = true;
				}, ENABLE8K);
				waitsFor(function()
				{
					return decodeFlag;
				}, '9sec wait to enable the Scanner', 9000);
			});	
			

			runs(function()
			{
				enumData[i].connectionIdleTimeout = 30;
				enumData[i].disconnectBtOnDisable = false;
				enumData[i].displayBtAddressBarcodeOnEnable = true;
				enumData[i].disableScannerDuringNavigate = false;
				enumData[i].enable({},callbackenable);
				setTimeout(function() {
						enableFlag = true;
					}, ENABLE8K);
			});

			waitsFor(function()
			{
				return enableFlag;
			}, '9sec wait to enable the Scanner', 9000);	
						
			
			runs(function()
			{
				waitsFor(function() {
				return document.getElementById("actResult").innerHTML != "init";
				}, "Timed out waiting for tester to respond", 300000);
				runs(function() {
				expect("pass").toEqual(document.getElementById("actResult").innerHTML);
				});
			});
		});	

		it("VT282-2798 | call setproperty with rsmBluetoothAutoReconnect as none" , function() {

			runs(function()
			{
				setObjective("VT282-2798 | call setproperty with rsmBluetoothAutoReconnect as none|");
				setInstruction("Check for RSM is connected or not with calling enable <br />rsmBluetoothAutoReconnect as none<br />Take the RSM device out of range from the mobile device and get it back within time(10 sec) for reconnection specified.<br />Call start and check BT scanner is emitting beam or not");
				setExpected("The RSM device should not be connected automatically after coming near to the device.");

			});

			runs(function()
			{		
				enumData[i].setProperty("rsmBluetoothAutoReconnect", "none");
				setTimeout(function() {
					decodeFlag = true;
				}, ENABLE10K);
			});	
			waitsFor(function()
			{
				return decodeFlag;
			}, '11sec wait to enable the Scanner', 11000);
			runs(function()
			{				
				enumData[i].start();
			});
			runs(function()
			{
				waitsFor(function() {
				return document.getElementById("actResult").innerHTML != "init";
				}, "Timed out waiting for tester to respond", 300000);
				runs(function() {
				expect("pass").toEqual(document.getElementById("actResult").innerHTML);
				});
			});
		});	


		it("VT282-2799 | call setproperty with rsmBluetoothAutoReconnect as onPower" , function() {

			runs(function()
			{
				setObjective("VT282-2799 | call setproperty with rsmBluetoothAutoReconnect as onPower|");
				setInstruction("Check for RSM is connected or not with calling enable <br /> rsmBluetoothAutoReconnect as onPower<br />Remove the battery from the RSM device and put it back (10 sec)<br />Call start and check BT scanner is emitting beam or not");
				setExpected("The RSM device should be connected automatically after powered on.");

			});


			runs(function()
			{	
				enumData[i].setProperty("rsmBluetoothAutoReconnect", "onPower");
				setTimeout(function() {
					decodeFlag = true;
				}, ENABLE10K);
			});	
			waitsFor(function()
			{
				return decodeFlag;
			}, '11sec wait to enable the Scanner', 11000);
			runs(function()
			{				
				enumData[i].start();
			});
			runs(function()
			{
				waitsFor(function() {
				return document.getElementById("actResult").innerHTML != "init";
				}, "Timed out waiting for tester to respond", 300000);
				runs(function() {
				expect("pass").toEqual(document.getElementById("actResult").innerHTML);
				});
			});
		});	

		it("VT282-2800 | call setproperty with rsmBluetoothAutoReconnect as onOutOfRange" , function() {

			runs(function()
			{
				setObjective("VT282-2800 | call setproperty with rsmBluetoothAutoReconnect as onOutOfRange|");
				setInstruction("Check for RSM is connected or not with calling enable <br />rsmBluetoothAutoReconnect as onOutOfRange<br />Take the RSM device out of range from the mobile device and get it back within time for reconnection specified. (10 sec)<br />Call start and check BT scanner is emitting beam or not");
				setExpected("The RSM device should not be connected automatically after coming near to the device.");

			});



			runs(function()
			{	
				enumData[i].setProperty("rsmBluetoothAutoReconnect", "onOutOfRange");
				setTimeout(function() {
					decodeFlag = true;
				}, ENABLE10K);
			});	
			waitsFor(function()
			{
				return decodeFlag;
			}, '11sec wait to enable the Scanner', 11000);
			runs(function()
			{				
				enumData[i].start();
			});
			runs(function()
			{
				waitsFor(function() {
				return document.getElementById("actResult").innerHTML != "init";
				}, "Timed out waiting for tester to respond", 300000);
				runs(function() {
				expect("pass").toEqual(document.getElementById("actResult").innerHTML);
				});
			});
		});			

		it("VT282-2801 | call setproperty with rsmBluetoothAutoReconnect as onPowerOutOfRange with taking RSM out of range" , function() {

			runs(function()
			{
				setObjective("VT282-2801 | call setproperty with rsmBluetoothAutoReconnect as onPowerOutOfRange with taking RSM out of range|");
				setInstruction("Check for RSM is connected or not with calling enable <br />rsmBluetoothAutoReconnect as onPowerOutOfRange<br />Take the RSM device out of range from the mobile device and get it back within time for reconnection specified. (10 sec)<br />Call start and check BT scanner is emitting beam or not");
				setExpected("The RSM device should not be connected automatically after coming near to the device.");

			});



			runs(function()
			{			
				enumData[i].setProperty("rsmBluetoothAutoReconnect", "onPowerOutOfRange");
				setTimeout(function() {
					decodeFlag = true;
				}, ENABLE10K);
			});	
			waitsFor(function()
			{
				return decodeFlag;
			}, '11sec wait to enable the Scanner', 11000);
			runs(function()
			{				
				enumData[i].start();
			});
			runs(function()
			{
				waitsFor(function() {
				return document.getElementById("actResult").innerHTML != "init";
				}, "Timed out waiting for tester to respond", 300000);
				runs(function() {
				expect("pass").toEqual(document.getElementById("actResult").innerHTML);
				});
			});
		});	
		
		it("VT282-2802 | call setproperty with rsmBluetoothAutoReconnect as onPowerOutOfRange with RSM poweroff" , function() {

			runs(function()
			{
				setObjective("VT282-2802 | call setproperty with rsmBluetoothAutoReconnect as onPowerOutOfRange with RSM powerof|");
				setInstruction("Check for RSM is connected or not with calling enable <br />rsmBluetoothAutoReconnect as onPowerOutOfRange<br />Remove the battery from the RSM device and put it back (10 sec)<br />Call start and check BT scanner is emitting beam or not");
				setExpected("The RSM device should be connected automatically after powered on");
				enumData[i].enable({},callbackenable);
				setTimeout(function() {
					enableFlag = true;
				}, ENABLE8K);
			});

			waitsFor(function()
			{
				return enableFlag;
			}, '2sec wait to enable the Scanner', 9000);

			runs(function()
			{			
				enumData[i].setProperty("rsmBluetoothAutoReconnect", "onPowerOutOfRange");
				setTimeout(function() {
					decodeFlag = true;
				}, ENABLE10K);
			});	
			waitsFor(function()
			{
				return decodeFlag;
			}, '11sec wait to enable the Scanner', 11000);
			runs(function()
			{				
				enumData[i].start();
			});
			runs(function()
			{
				waitsFor(function() {
				return document.getElementById("actResult").innerHTML != "init";
				}, "Timed out waiting for tester to respond", 300000);
				runs(function() {
				expect("pass").toEqual(document.getElementById("actResult").innerHTML);
				});
			});
		});	

		it("VT282-2803 | call setproperty with  BluetoothBeepOnReconnectAttempt as true" , function() {

			runs(function()
			{
				setObjective("VT282-2803 | call setproperty with  BluetoothBeepOnReconnectAttempt as true|");
				setInstruction("Check for RSM is connected or not with calling enable <br />BluetoothBeepOnReconnectAttempt as true<br />rsmBluetoothAutoReconnect as onPowerOutOfRange <br />Remove the battery from the RSM device and put it back<br />check for the number of beeps while reconnecting (1 min)<br />Call start and check BT scanner is emitting beam or not");
				setExpected("scanner should emit 5 beeps every 5 seconds whilst re-connection in progress");

			});



			runs(function()
			{
				enumData[i].setProperty("rsmBluetoothBeepOnReconnectAttempt", "true");
				enumData[i].rsmBluetoothAutoReconnect = "onPowerOutOfRange";
				setTimeout(function() {
					decodeFlag = true;
				}, ENABLE60K);
			});	
			waitsFor(function()
			{
				return decodeFlag;
			}, '60sec wait to enable ', 61000);
			runs(function()
			{				
				enumData[i].start();
			});
			runs(function()
			{
				waitsFor(function() {
				return document.getElementById("actResult").innerHTML != "init";
				}, "Timed out waiting for tester to respond", 300000);
				runs(function() {
				expect("pass").toEqual(document.getElementById("actResult").innerHTML);
				});
			});
		});	
		
		it("VT282-2804 | call setproperty with  BluetoothBeepOnReconnectAttempt as false" , function() {

			runs(function()
			{
				setObjective("VT282-2804 | call setproperty with  BluetoothBeepOnReconnectAttempt as false|");
				setInstruction("Check for RSM is connected or not with calling enable <br />BluetoothBeepOnReconnectAttempt as false<br />rsmBluetoothAutoReconnect as onPowerOutOfRange <br />Remove the battery from the RSM device and put it back<br />check for the number of beeps while reconnecting (1 min)<br />Call start and check BT scanner is emitting beam or not");
				setExpected("scanner should not emit 5 beeps every 5 seconds whilst re-connection in progress");

			});


			runs(function()
			{
				enumData[i].setProperty("rsmBluetoothBeepOnReconnectAttempt", "false");
				enumData[i].rsmBluetoothAutoReconnect = "onPowerOutOfRange";
				setTimeout(function() {
					decodeFlag = true;
				}, ENABLE60K);
			});	
			waitsFor(function()
			{
				return decodeFlag;
			}, '60sec wait to enable the Scanner', 61000);
			runs(function()
			{				
				enumData[i].start();
			});
			runs(function()
			{
				waitsFor(function() {
				return document.getElementById("actResult").innerHTML != "init";
				}, "Timed out waiting for tester to respond", 300000);
				runs(function() {
				expect("pass").toEqual(document.getElementById("actResult").innerHTML);
				});
			});
		});				
		
		it("VT282-2805 | call setproperty with  rsmBluetoothEncryption as true" , function() {

			runs(function()
			{
				setObjective("VT282-2805 | call setproperty with  rsmBluetoothEncryption as true|");
				setInstruction("Check for RSM is connected or not with calling enable <br />rsmBluetoothEncryption as true<br />scan any barcode<br />");
				setExpected("rsmBluetoothEncryption should be set to true<br /> barcode should get scanned");

			});


			runs(function()
			{
				enumData[i].setProperty("rsmBluetoothEncryption", "true");
			});		
			runs(function()
			{
				waitsFor(function() {
				return document.getElementById("actResult").innerHTML != "init";
				}, "Timed out waiting for tester to respond", 300000);
				runs(function() {
				expect("pass").toEqual(document.getElementById("actResult").innerHTML);
				});
			});
		});		

		it("VT282-2806 | call setproperty with  rsmBluetoothEncryption as false" , function() {

			runs(function()
			{
				setObjective("VT282-2806 | call setproperty with  rsmBluetoothEncryption as false|");
				setInstruction("Check for RSM is connected or not with calling enable <br />rsmBluetoothEncryption as false<br />scan any barcode<br />");
				setExpected("rsmBluetoothEncryption should be set to false<br /> barcode should get scanned");

			});


			runs(function()
			{
				enumData[i].setProperty("rsmBluetoothEncryption", "false");
			});		
			runs(function()
			{
				waitsFor(function() {
				return document.getElementById("actResult").innerHTML != "init";
				}, "Timed out waiting for tester to respond", 300000);
				runs(function() {
				expect("pass").toEqual(document.getElementById("actResult").innerHTML);
				});
			});
		});	

		it("VT282-2807 | call setproperty with  rsmBluetoothFriendlyName as MyBTScanner" , function() {

			runs(function()
			{
				setObjective("VT282-2807 | call setproperty with  rsmBluetoothFriendlyName as MyBTScanner|");
				setInstruction("Check for RSM is connected or not with calling enable <br />rsmBluetoothFriendlyName as MyBTScanner<br />Call getproperty with rsmBluetoothFriendlyName<br />");
				setExpected("The rsmBluetoothFriendlyName should return the set name (MyBTScanner)");

			});



			runs(function()
			{
				enumData[i].setProperty("rsmBluetoothFriendlyName", "MyBTScanner");
				var data = enumData[i].getProperty("rsmBluetoothFriendlyName");
				displayResult("VT282-2807 | Get  rsmBluetoothFriendlyName as MyBTScanner| ",data);
			});		
			runs(function()
			{
				waitsFor(function() {
				return document.getElementById("actResult").innerHTML != "init";
				}, "Timed out waiting for tester to respond", 300000);
				runs(function() {
				expect("pass").toEqual(document.getElementById("actResult").innerHTML);
				});
			});
		});			

		it("VT282-2808 | call setproperty with  rsmBluetoothFriendlyName as 12345scanner" , function() {

			runs(function()
			{
				setObjective("VT282-2808 | call setproperty with  rsmBluetoothFriendlyName as 12345scanner|");
				setInstruction("Check for RSM is connected or not with calling enable <br />rsmBluetoothFriendlyName as 12345scanner<br />Call getproperty with rsmBluetoothFriendlyName<br />");
				setExpected("The rsmBluetoothFriendlyName should return the set name (12345scanner)");

			});



			runs(function()
			{
				enumData[i].setProperty("rsmBluetoothFriendlyName", "12345scanner");
				var data = enumData[i].getProperty("rsmBluetoothFriendlyName");
				displayResult("VT282-2808 | Get  rsmBluetoothFriendlyName as 12345scanner| ",data);
			});		
			runs(function()
			{
				waitsFor(function() {
				return document.getElementById("actResult").innerHTML != "init";
				}, "Timed out waiting for tester to respond", 300000);
				runs(function() {
				expect("pass").toEqual(document.getElementById("actResult").innerHTML);
				});
			});
		});	

		it("VT282-2809 | call setproperty with  rsmBluetoothHidAutoReconnect as NeverReconnect" , function() {

			runs(function()
			{
				setObjective("VT282-2809 | call setproperty with  rsmBluetoothHidAutoReconnect as NeverReconnect|");
				setInstruction("Check for RSM is connected or not with calling enable <br />set rsmBluetoothHidAutoReconnect as NeverReconnect<br />Call getproperty with rsmBluetoothHidAutoReconnect<br />");
				setExpected("The rsmBluetoothHidAutoReconnect should return NeverReconnect");

			});


			runs(function()
			{
				enumData[i].setProperty("rsmBluetoothHidAutoReconnect", "NeverReconnect");
				var data = enumData[i].getProperty("rsmBluetoothHidAutoReconnect");
				displayResult("VT282-2809 | Get  rsmBluetoothHidAutoReconnect as NeverReconnect| ",data);
			});		
			runs(function()
			{
				waitsFor(function() {
				return document.getElementById("actResult").innerHTML != "init";
				}, "Timed out waiting for tester to respond", 300000);
				runs(function() {
				expect("pass").toEqual(document.getElementById("actResult").innerHTML);
				});
			});
		});	

		it("VT282-2810 | call setproperty with  rsmBluetoothHidAutoReconnect as ReconnectOnData" , function() {

			runs(function()
			{
				setObjective("VT282-2810 | call setproperty with  rsmBluetoothHidAutoReconnect as ReconnectOnData|");
				setInstruction("Check for RSM is connected or not with calling enable <br />set rsmBluetoothHidAutoReconnect as ReconnectOnData<br />Call getproperty with rsmBluetoothHidAutoReconnect<br />");
				setExpected("The rsmBluetoothHidAutoReconnect should return ReconnectOnData");

			});


			runs(function()
			{
				enumData[i].setProperty("rsmBluetoothHidAutoReconnect", "ReconnectOnData");
				var data = enumData[i].getProperty("rsmBluetoothHidAutoReconnect");
				displayResult("VT282-2810 | Get  rsmBluetoothHidAutoReconnect as ReconnectOnData| ",data);
			});		
			runs(function()
			{
				waitsFor(function() {
				return document.getElementById("actResult").innerHTML != "init";
				}, "Timed out waiting for tester to respond", 300000);
				runs(function() {
				expect("pass").toEqual(document.getElementById("actResult").innerHTML);
				});
			});
		});	

		it("VT282-2811 | call setproperty with  rsmBluetoothHidAutoReconnect as ReconnectImmediately" , function() {

			runs(function()
			{
				setObjective("VT282-2811 | call setproperty with  rsmBluetoothHidAutoReconnect as ReconnectImmediately|");
				setInstruction("Check for RSM is connected or not with calling enable <br />set rsmBluetoothHidAutoReconnect as ReconnectImmediately<br />Call getproperty with rsmBluetoothHidAutoReconnect<br />");
				setExpected("The rsmBluetoothHidAutoReconnect should return ReconnectImmediately");

			});



			runs(function()
			{
				enumData[i].setProperty("rsmBluetoothHidAutoReconnect","ReconnectImmediately");
				var data = enumData[i].getProperty("rsmBluetoothHidAutoReconnect");
				displayResult("VT282-2811 | Get  rsmBluetoothHidAutoReconnect as ReconnectImmediately| ",data);
			});		
			runs(function()
			{
				waitsFor(function() {
				return document.getElementById("actResult").innerHTML != "init";
				}, "Timed out waiting for tester to respond", 300000);
				runs(function() {
				expect("pass").toEqual(document.getElementById("actResult").innerHTML);
				});
			});
		});	

		it("VT282-2812 | call setproperty with  rsmBluetoothInquiryMode as General" , function() {

			runs(function()
			{
				setObjective("VT282-2812 | call setproperty with  rsmBluetoothInquiryMode as General|");
				setInstruction("Check for RSM is connected or not with calling enable <br />set rsmBluetoothInquiryMode as General<br />Call getproperty with rsmBluetoothInquiryMode<br />");
				setExpected("The rsmBluetoothInquiryMode should return General");

			});


			runs(function()
			{
				enumData[i].setProperty("rsmBluetoothInquiryMode", "General");
				var data = enumData[i].getProperty("rsmBluetoothInquiryMode");
				displayResult("VT282-2812 | Get  rsmBluetoothInquiryMode as General| ",data);
			});		
			runs(function()
			{
				waitsFor(function() {
				return document.getElementById("actResult").innerHTML != "init";
				}, "Timed out waiting for tester to respond", 300000);
				runs(function() {
				expect("pass").toEqual(document.getElementById("actResult").innerHTML);
				});
			});
		});		

		it("VT282-2813 | call setproperty with  rsmBluetoothInquiryMode as Limited" , function() {

			runs(function()
			{
				setObjective("VT282-2813 | call setproperty with  rsmBluetoothInquiryMode as Limited|");
				setInstruction("Check for RSM is connected or not with calling enable <br />set rsmBluetoothInquiryMode as Limited<br />Call getproperty with rsmBluetoothInquiryMode<br />");
				setExpected("The rsmBluetoothInquiryMode should return Limited");

			});


			runs(function()
			{
				enumData[i].setProperty("rsmBluetoothInquiryMode","Limited");
				var data = enumData[i].getProperty("rsmBluetoothInquiryMode");
				displayResult("VT282-2813 | Get  rsmBluetoothInquiryMode as Limited| ",data);
			});		
			runs(function()
			{
				waitsFor(function() {
				return document.getElementById("actResult").innerHTML != "init";
				}, "Timed out waiting for tester to respond", 300000);
				runs(function() {
				expect("pass").toEqual(document.getElementById("actResult").innerHTML);
				});
			});
		});	

		it("VT282-2814 | call setproperty with  rsmBluetoothPinCode as 13579" , function() {

			runs(function()
			{
				setObjective("VT282-2814 | call setproperty with  rsmBluetoothPinCode as 13579|");
				setInstruction("Check for RSM is connected or not with calling enable <br />rsmBluetoothAuthentication as true<br /> rsmBluetoothPinCode as 13579<br />Call commandRemoteScanner with unpair to unpair the BT<br />Enable rsm again and scan the pairing barcode<br />Put the pincode as 13579 for successful pair<br />");
				setExpected("The RSM should pair after putting the pincode as 13579");

			});


			runs(function()
			{
				enumData[i].setProperty("rsmBluetoothAuthentication","true");
				enumData[i].setProperty("rsmBluetoothPinCode","13579");
				enumData[i].commandRemoteScanner("unpair");
				setTimeout(function() {
					decodeFlag = true;
				}, ENABLE8K);
				waitsFor(function()
				{
					return decodeFlag;
				}, '9sec wait to enable the Scanner', 9000);
				
			});	
			runs(function()
			{
				enumData[i].connectionIdleTimeout = 30;
				enumData[i].disconnectBtOnDisable = false;
				enumData[i].displayBtAddressBarcodeOnEnable = true;
				enumData[i].disableScannerDuringNavigate = false;
				enumData[i].enable({},callbackenable);
				setTimeout(function() {
						enableFlag = true;
					}, ENABLE8K);
			});

			waitsFor(function()
			{
				return enableFlag;
			}, '9sec wait to enable the Scanner', 9000);
			
			runs(function()
			{
				waitsFor(function() {
				return document.getElementById("actResult").innerHTML != "init";
				}, "Timed out waiting for tester to respond", 300000);
				runs(function() {
				expect("pass").toEqual(document.getElementById("actResult").innerHTML);
				});
			});
		});	

		it("VT282-2815 | call setproperty with  rsmBluetoothPinCode as hello" , function() {
			runs(function()
			{
				setObjective("VT282-2815 | call setproperty with  rsmBluetoothPinCode as hello|");
				setInstruction("Check for RSM is connected or not with calling enable <br />rsmBluetoothAuthentication as true<br /> rsmBluetoothPinCode as hello<br />Call commandRemoteScanner with unpair to unpair the BT<br />Enable rsm again and scan the pairing barcode<br />Put the pincode as hello for successful pair<br />");
				setExpected("The RSM should pair after putting the pincode as hello");

			});



			runs(function()
			{
				enumData[i].setProperty("rsmBluetoothAuthentication", "true");
				enumData[i].setProperty("rsmBluetoothPinCode","hello");
				enumData[i].commandRemoteScanner("unpair");
				setTimeout(function() {
					decodeFlag = true;
				}, ENABLE8K);
				waitsFor(function()
				{
					return decodeFlag;
				}, '9sec wait to enable the Scanner', 9000);
				
			});	
			runs(function()
			{
				enumData[i].connectionIdleTimeout = 30;
				enumData[i].disconnectBtOnDisable = false;
				enumData[i].displayBtAddressBarcodeOnEnable = true;
				enumData[i].disableScannerDuringNavigate = false;
				enumData[i].enable({},callbackenable);
				setTimeout(function() {
						enableFlag = true;
					}, ENABLE8K);
			});

			waitsFor(function()
			{
				return enableFlag;
			}, '9sec wait to enable the Scanner', 9000);
			
			runs(function()
			{
				waitsFor(function() {
				return document.getElementById("actResult").innerHTML != "init";
				}, "Timed out waiting for tester to respond", 300000);
				runs(function() {
				expect("pass").toEqual(document.getElementById("actResult").innerHTML);
				});
			});
		});		

		it("VT282-2816 | call setproperty with  rsmBluetoothPinCodeType as UseStored" , function() {
			runs(function()
			{
				setObjective("VT282-2816 | call setproperty with  rsmBluetoothPinCodeType as UseStored|");
				setInstruction("Check for RSM is connected or not with calling enable <br />rsmBluetoothAuthentication as true<br /> rsmBluetoothPinCodeType as UseStored<br />call commandRemoteScanner with unpair to unpair the BT<br />Enable rsm again and scan the pairing barcode<br />put the pincode as 12345 for successful pair<br />");
				setExpected("The RSM should pair after putting the pincode as 12345 (default)");

			});

			runs(function()
			{
				enumData[i].setProperty("rsmBluetoothAuthentication","true");
				enumData[i].setProperty("rsmBluetoothPinCodeType","UseStored");
				enumData[i].commandRemoteScanner("unpair");
				setTimeout(function() {
					decodeFlag = true;
				}, ENABLE8K);
				waitsFor(function()
				{
					return decodeFlag;
				}, '9sec wait to enable the Scanner', 9000);
				
			});	
			runs(function()
			{
				enumData[i].connectionIdleTimeout = 30;
				enumData[i].disconnectBtOnDisable = false;
				enumData[i].displayBtAddressBarcodeOnEnable = true;
				enumData[i].disableScannerDuringNavigate = false;
				enumData[i].enable({},callbackenable);
				setTimeout(function() {
						enableFlag = true;
					}, ENABLE8K);
			});

			waitsFor(function()
			{
				return enableFlag;
			}, '9sec wait to enable the Scanner', 9000);
			
			runs(function()
			{
				waitsFor(function() {
				return document.getElementById("actResult").innerHTML != "init";
				}, "Timed out waiting for tester to respond", 300000);
				runs(function() {
				expect("pass").toEqual(document.getElementById("actResult").innerHTML);
				});
			});
		});
		
		it("VT282-2817 | call setproperty with  rsmBluetoothPinCodeType as PromptUser" , function() {
			runs(function()
			{
				setObjective("VT282-2817 | call setproperty with  rsmBluetoothPinCodeType as PromptUser|");
				setInstruction("Check for RSM is connected or not with calling enable <br />rsmBluetoothAuthentication as true<br /> rsmBluetoothPinCodeType as PromptUser<br />call commandRemoteScanner with unpair to unpair the BT<br />Enable rsm again and scan the pairing barcode<br />Scan the barcode for pincode<br />");
				setExpected("ring scanner should be used to scan 5 alpha numeric barcodes to define the PIN, eg. '1', '2', '3', '4', '5' (for PIN 12345)");
	
			});

			runs(function()
			{
				enumData[i].setProperty("rsmBluetoothAuthentication","true");
				enumData[i].setProperty("rsmBluetoothPinCodeType","PromptUser");
				setTimeout(function() {
					decodeFlag = true;
				}, ENABLE8K);
				waitsFor(function()
				{
					return decodeFlag;
				}, '9sec wait to enable the Scanner', 9000);
				
			});	
			runs(function()
			{
				enumData[i].connectionIdleTimeout = 30;
				enumData[i].disconnectBtOnDisable = false;
				enumData[i].displayBtAddressBarcodeOnEnable = true;
				enumData[i].disableScannerDuringNavigate = false;
				enumData[i].enable({},callbackenable);
				setTimeout(function() {
						enableFlag = true;
					}, ENABLE8K);
			});

			waitsFor(function()
			{
				return enableFlag;
			}, '9sec wait to enable the Scanner', 9000);				
			
			runs(function()
			{
				waitsFor(function() {
				return document.getElementById("actResult").innerHTML != "init";
				}, "Timed out waiting for tester to respond", 300000);
				runs(function() {
				expect("pass").toEqual(document.getElementById("actResult").innerHTML);
				});
			});
		});		

		it("VT282-2818 | call setproperty with rsmBluetoothReconnectionAttempts as 30 sec with taking RSM out of range" , function() {
			runs(function()
			{
				setObjective("VT282-2818 | call setproperty with rsmBluetoothReconnectionAttempts as 30 sec with taking RSM out of range|");
				setInstruction("Check for RSM is connected or not with calling enable <br />rsmBluetoothReconnectionAttempts as 30<br /> Take the RSM device out of range from the mobile device and get it back within time for reconnection specified.(2 min wait)<br />Call start and check BT scanner is emitting beam or not<br />");
				setExpected("The RSM device should be connected automatically after coming near to the device. within 30 second");

			});



			runs(function()
			{
				enumData[i].setProperty("rsmBluetoothReconnectionAttempts","30");
				
			});	
			waitsFor(function()
			{
			}, '2 min wait for reconnection', 120000);
			runs(function()
			{				
				enumData[i].start();
			});
			
			runs(function()
			{
				waitsFor(function() {
				return document.getElementById("actResult").innerHTML != "init";
				}, "Timed out waiting for tester to respond", 300000);
				runs(function() {
				expect("pass").toEqual(document.getElementById("actResult").innerHTML);
				});
			});
		});	

		it("VT282-2819 | call setproperty with rsmBluetoothReconnectionAttempts as 60 sec with taking RSM out of range" , function() {
			runs(function()
			{
				setObjective("VT282-2819 | call setproperty with rsmBluetoothReconnectionAttempts as 60 sec with taking RSM out of range|");
				setInstruction("Check for RSM is connected or not with calling enable <br />rsmBluetoothReconnectionAttempts as 60<br /> rsmBluetoothAutoReconnect as onPowerOutOfRange<br />Remove the battery from the RSM device and put it back(2 min wait)<br />Call start and check BT scanner is emitting beam or not<br />");
				setExpected("The RSM device should be connected automatically after coming near to the device. within 60 second");

			});



			runs(function()
			{
				enumData[i].setProperty("rsmBluetoothReconnectionAttempts","60");
				enumData[i].setProperty("rsmBluetoothAutoReconnect","onPowerOutOfRange");
				
			});	
			waitsFor(function()
			{
			}, '2 min wait for reconnection', 120000);
			runs(function()
			{				
				enumData[i].start();
			});
			
			runs(function()
			{
				waitsFor(function() {
				return document.getElementById("actResult").innerHTML != "init";
				}, "Timed out waiting for tester to respond", 300000);
				runs(function() {
				expect("pass").toEqual(document.getElementById("actResult").innerHTML);
				});
			});
		});	

		it("VT282-2820 | call setproperty with rsmDecodeFeedback as true" , function() {
			runs(function()
			{
				setObjective("VT282-2820 | call setproperty with rsmDecodeFeedback as true|");
				setInstruction("Check for RSM is connected or not with calling enable <br /> rsmDecodeFeedback as true<br /> scan any barcode<br />Check for the beep sound and green LED illumination<br />");
				setExpected("The remote scanner should beep and illuminate its green LED on a successful decode.");
				enumData[i].enable({},callbackenable);
				setTimeout(function() {
					enableFlag = true;
				}, ENABLE8K);
			});

			waitsFor(function()
			{
				return enableFlag;
			}, '2sec wait to enable the Scanner', 9000);

			runs(function()
			{
				enumData[i].setProperty("rsmDecodeFeedback","true");
				
			});	
			
			runs(function()
			{
				waitsFor(function() {
				return document.getElementById("actResult").innerHTML != "init";
				}, "Timed out waiting for tester to respond", 300000);
				runs(function() {
				expect("pass").toEqual(document.getElementById("actResult").innerHTML);
				});
			});
		});	

		it("VT282-2821 | call setproperty with rsmDecodeFeedback as false" , function() {
			runs(function()
			{
				setObjective("VT282-2821 | call setproperty with rsmDecodeFeedback as false|");
				setInstruction("Check for RSM is connected or not with calling enable <br /> rsmDecodeFeedback as false<br /> scan any barcode<br />Check for the beep sound and green LED illumination<br />");
				setExpected("The remote scanner should not beep and should not illuminate its green LED on a successful decode.");

			});



			runs(function()
			{
				enumData[i].setProperty("rsmDecodeFeedback","false");
				
			});	
			
			runs(function()
			{
				waitsFor(function() {
				return document.getElementById("actResult").innerHTML != "init";
				}, "Timed out waiting for tester to respond", 300000);
				runs(function() {
				expect("pass").toEqual(document.getElementById("actResult").innerHTML);
				});
			});
		});			

		it("VT282-2822 | call setproperty with rsmIgnoreCode128Usps as true" , function() {
			runs(function()
			{
				setObjective("VT282-2822 | call setproperty with rsmIgnoreCode128Usps as true|");
				setInstruction("Check for RSM is connected or not with calling enable <br />  rsmIgnoreCode128Usps as true<br /> scan the  Code 128 barcodes beginning with 420 and 421<br />scan other 128 barcodes<br />");
				setExpected("Code 128 barcodes beginning with 420 and 421 should decode");

			});


			runs(function()
			{
				enumData[i].setProperty("rsmIgnoreCode128Usps","true");
			});	


			runs(function()
			{
				waitsFor(function() {
				return document.getElementById("actResult").innerHTML != "init";
				}, "Timed out waiting for tester to respond", 300000);
				runs(function() {
				expect("pass").toEqual(document.getElementById("actResult").innerHTML);
				});
			});
		});	

		it("VT282-2823 | call setproperty with rsmIgnoreCode128Usps as false" , function() {
			runs(function()
			{
				setObjective("VT282-2823 | call setproperty with rsmIgnoreCode128Usps as false|");
				setInstruction("Check for RSM is connected or not with calling enable <br />  rsmIgnoreCode128Usps as false<br /> scan the  Code 128 barcodes beginning with 420 and 421<br />scan other 128 barcodes<br />");
				setExpected("Code 128 barcodes beginning with 420 and 421 will not decode");

			});

			runs(function()
			{
				enumData[i].setProperty("rsmIgnoreCode128Usps","false");
			});	


			runs(function()
			{
				waitsFor(function() {
				return document.getElementById("actResult").innerHTML != "init";
				}, "Timed out waiting for tester to respond", 300000);
				runs(function() {
				expect("pass").toEqual(document.getElementById("actResult").innerHTML);
				});
			});
		});
		
	});
	var arrReadSCN = getApplicableReadOnlyProperties(enumData[i]);
	(function(enumObject,arrReadScanner){
		describe("RSM Read Only property using getProperty for "+ scnid +": "+ scnname, function() {

			for (var i=0;i<arrReadScanner.length;i++){
			
				(function(idx){
					it(arrReadScanner[idx]['testName'], function() {
							var data = enumObject.getProperty(arrReadScanner[idx]['propertyName']);
							displayResult(arrReadScanner[idx]['testName'],data);
							waitsFor(function() {
							return document.getElementById("actResult").innerHTML != "init";
							}, "Timed out waiting for tester to respond", 300000);
							runs(function() {
							expect("pass").toEqual(document.getElementById("actResult").innerHTML);
							});
					});

				})(i);
			}
		});	
	})(enumData[i],arrReadSCN);
});	