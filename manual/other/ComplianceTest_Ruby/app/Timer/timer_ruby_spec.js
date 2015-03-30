describe("Enumerate Barcode Scanner ", function() {

	var enableFlag = false;
	var decodeFlag = false;
	var readFlag = false;
	var enumData_json = '';
	var enumData = '';
	var scannerType = '';
	
	beforeEach(function() {
		enableFlag = false;
		decodeFlag = false;
		readFlag = false;
		decodedata ='';
		document.getElementById("verificationResult").innerHTML = "";
	});

	var enumObjCount = false;
	
	it("Timer test 001", function() {
		displayObjective(jasmine.getEnv().currentSpec.description);
		dispTestCaseRunning("wait for timer event fired and appears alert window");
		dispExpectedResult("");
		
		_result.waitToRunTest();
		
		runs(function() {
			Ruby.call('Timer','timertest');
			                                   
			setTimeout(function() {
				enableFlag = true;
			}, 4000);                          
		});
		
		waitsFor(function(){
			return enableFlag;
		}, '5sec wait to enable the Scanner', 12000);
		
		_result.waitForResponse();
	});
});
