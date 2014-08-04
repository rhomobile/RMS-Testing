describe("RSM Compliance Ruby Test", function() {
	var ENABLE8K = 8000;
	var ENABLE1K = 1000;
	var ENABLE10K = 10000;
	var ENABLE60K = 60000;
	var enumData = Rho.Barcode.enumerate();
	var callbackdata = '';
	var decodeFlag = false;
	var i = enumData.length -1;
	var BTstatus = "";
	
	 var scnid = enumData[i].getProperty('ID');
	 var scntype = enumData[i].getProperty('scannerType');
	 var scnname = enumData[i].getProperty('friendlyName');


	beforeEach(function() {
		decodeFlag = false;
		callbackdata = '';
		decodedata ='';
		document.getElementById("actResult").innerHTML = "";
		document.getElementById("clbkData").innerHTML = "";
		//enablecallbackdata(decodedata);
		//enumData[i].disconnectBtOnDisable = false;
	});

	afterEach(function() {
	});
			
	it("Enable scanner", function() {		
		
		_result.waitToRunTest();
		
		runs(function() {
			Ruby.call('RSMTest','rsm_enable');
		});

		_result.waitForResponse();	
	});	
	
	var arrReadSCN = getApplicableReadOnlyProperties(enumData[i]);
	(function(enumObject,arrReadScanner){
		describe("RSM Read Only property using getProperty for "+ scnid +": "+ scnname, function() {
			for (var i=0;i<arrReadScanner.length;i++){
			
				(function(idx){
					it(arrReadScanner[idx]['testName'], function() {
						displayObjective(jasmine.getEnv().currentSpec.description);

						runs(function() {
							Ruby.call('RSMTest','rsm_props?data='+arrReadScanner[idx]['propertyName']+'&test='+arrReadScanner[idx]['testName']);
						});
						
						_result.waitForResponse();
					});

				})(i);
			}
		});	
	})(enumData[i],arrReadSCN);
	
	describe("RSM Test with ", function() {

		it("VT200-0673 | call commandRemoteScanner with Disconnect |" , function() {

			displayObjective("VT200-0673 | call commandRemoteScanner with Disconnect |");
			dispTestCaseRunning("Check for RSM is connected or not with calling enable <br /> connectionIdleTimeout to 10000<br />scan a barcode<br />commandRemoteScanner with Disconnect(9 sec wait)<br />check for RSM is conncted or not with calling enable");
			dispExpectedResult("Commands BT Scanner to disconnect from its connected device. It should ask for BT pairing while trying to re-enable");

			_result.waitToRunTest();

			runs(function(){
				Ruby.call('RSMTest','command_remote_scanner?data=Disconnect');

				setTimeout(function(){
					decodeFlag = true;
				}, ENABLE8K);
			});

			waitsFor(function(){
				return decodeFlag;
			}, '9sec wait to enable the Scanner', 9000);

			runs(function(){
				Ruby.call('RSMTest','rsm_enable_method');
			});

			_result.waitForResponse();
			
		});

		it("VT200-0674 | call commandRemoteScanner with unpair |" , function() {

			displayObjective("VT200-0674 | call commandRemoteScanner with unpair |");
			dispTestCaseRunning("Check for RSM is connected or not with calling enable <br /> connectionIdleTimeout to 10000<br />scan a barcode<br />commandRemoteScanner with unpair(9 sec wait)<br />check for RSM is conncted or not with calling enable");
			dispExpectedResult("Commands BT Scanner to disconnect from its connected device. It should ask for BT pairing while trying to re-enable");
				
			_result.waitToRunTest();

			runs(function(){
				Ruby.call('RSMTest','command_remote_scanner?data=unpair');

				setTimeout(function() {
					decodeFlag = true;
				}, ENABLE8K);
			});

			waitsFor(function(){
				return decodeFlag;
			}, '9sec wait to enable the Scanner', 9000);
			
			runs(function(){
				Ruby.call('RSMTest','rsm_enable_method');
			});
			
			_result.waitForResponse();

		});	
	});

});	