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
	
	describe("RSM Test with ", function() {
		it("VT200-0416 | call commandRemoteScanner with Disconnect |" , function() {

			runs(function()
			{
				setObjective("VT200-0416 | call commandRemoteScanner with Disconnect |");
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

		it("VT200-0417 | call commandRemoteScanner with unpair |" , function() {

			runs(function()
			{
				setObjective("VT200-0417 | call commandRemoteScanner with unpair |");
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
	});

});	