describe("Key State Test", function() {

	it("VT200-0669 | KeyState showStates with all properties |", function() {
		
		dispTestCaseRunning(jasmine.getEnv().currentSpec.description);
		dispExpectedResult("KeyState showStates with all properties<br>right:100,top:150,<br>Height:200,width:250 Press Shift, Alt, Control, <br>Function, Caps, Num lock and Orange key");
		
		_result.waitToRunTest();
		
		runs(function(){
			Ruby.call('Keystate','keystate_show');
		});

		_result.waitForResponse();
	});

	it("VT281-0xxx | KeyState hideStates |", function() {
		
		dispTestCaseRunning(jasmine.getEnv().currentSpec.description);
		dispExpectedResult("KeyState hideStates<br>KeyState should get hidden");
		
		_result.waitToRunTest();
		
		runs(function(){
			Ruby.call('Keystate','keystate_show');
			Ruby.call('Keystate','keystate_hide');
		});

		_result.waitForResponse();
	});

});
