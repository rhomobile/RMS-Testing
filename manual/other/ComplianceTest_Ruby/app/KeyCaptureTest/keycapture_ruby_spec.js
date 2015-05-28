describe("KeyCapture Test", function() {


	describe("homeKey Test", function() {

		var keydata = '';

		beforeEach(function() {
			keydata ='';
			callbackdata(keydata);
		});

		if (isWindowsMobilePlatform()){

			it("VT200-0604 | set homeKeyValue to enter key |", function() {

				displayObjective(jasmine.getEnv().currentSpec.description);
				dispTestCaseRunning("press the Enter key and check for application navigate");
				dispExpectedResult("Application should navigate to Homepage of application after Pressing the Enter Key");

				_result.waitToRunTest();

				runs(function(){
					Ruby.call('KeyCaptureTest','homekey?val=13');
				});

				_result.waitForResponse();

				runs(function(){	
					Ruby.call('KeyCaptureTest','homekey?val=Disabled');
				});

			});

			it("VT200-0605 | set homeKeyValue to Disabled |", function() {

				displayObjective(jasmine.getEnv().currentSpec.description);
				dispTestCaseRunning("press the Enter key and check for application navigate");
				dispExpectedResult("Application should not navigate to Homepage of application after Pressing the Enter Key");

				_result.waitToRunTest();

				runs(function(){
					Ruby.call('KeyCaptureTest','homekey?val=0x0D');
					Ruby.call('KeyCaptureTest','homekey?val=Disabled');
				});

				_result.waitForResponse();
			});

			it("VT200-0606 | set homeKeyValue to 1 and then 2|", function() {

				displayObjective(jasmine.getEnv().currentSpec.description);
				dispTestCaseRunning("press 1 and 2 key and check for application navigate");
				dispExpectedResult("Application should navigate to Homepage of application after Pressing the numeric key 1 and 2 ");

				_result.waitToRunTest();

				runs(function(){
					Ruby.call('KeyCaptureTest','homekey?val=0x31');
					Ruby.call('KeyCaptureTest','homekey?val=0x32');					
				});

				_result.waitForResponse();

				runs(function(){
					Ruby.call('KeyCaptureTest','homekey?val=Disabled');
				});
			});
		}
	});	

	describe("captureKey, captureTrigger and remapKey Test", function() {
	
		var keydata = '';

		beforeEach(function() {
			keydata ='';
			callbackdata(keydata);
			callbackdatafunc(keydata);
		});


		///////////////////////////////////////////////////////////////////////
		//  captureKey Tests
		///////////////////////////////////////////////////////////////////////

		it("VT200-0607 | call captureKey with keyValue for " +hardwareKeysTest.testKey11.description+" function callback |", function() {

			displayObjective(jasmine.getEnv().currentSpec.description);
			dispTestCaseRunning("Press hardware key " +hardwareKeysTest.testKey11.description+ " and all other keys");
			dispExpectedResult("Callback should fire only for key " +hardwareKeysTest.testKey11.description+ " with value " +hardwareKeysTest.testKey11.string+ "and key" +hardwareKeysTest.testKey11.description+ "should not be disaptached and other all keys should" );

			_result.waitToRunTest();

			runs(function(){
				Ruby.call('KeyCaptureTest','capturekey?keystring=' + hardwareKeysTest.testKey11.string + '&call=yes');
			});

			_result.waitForResponse();

			runs(function(){
				Ruby.call('KeyCaptureTest','capturekey?keystring=' + hardwareKeysTest.testKey11.string + '&truth=yes');
			});
		
		});

		it("VT200-0608 | call captureKey keyValue ALL and callback |", function() {

			displayObjective(jasmine.getEnv().currentSpec.description);
			dispTestCaseRunning("Press all type of key");
			dispExpectedResult("Callback should fire with retrun key values");

			_result.waitToRunTest();

			runs(function(){
				Ruby.call('KeyCaptureTest','capturekey?keystring=ALL&truth=yes&call=yes');
			});

			_result.waitForResponse();

			runs(function(){
				Ruby.call('KeyCaptureTest','capturekey?keystring=ALL&truth=yes');
			});

		});

		it("VT200-0609 | call captureKey with different callback for 2 different keys |", function() {

			displayObjective(jasmine.getEnv().currentSpec.description);
			dispTestCaseRunning("Press " +hardwareKeysTest.testKey11.description+", Press numeric key " +hardwareKeysTest.testKey15.description);
			dispExpectedResult("2 different Callback should fire after pressing " +hardwareKeysTest.testKey11.description+" and " +hardwareKeysTest.testKey15.description+ " Key" + hardwareKeysTest.testKey11.description + "should not dispatch and other should dispatch" );

			_result.waitToRunTest();

			runs(function(){
				Ruby.call('KeyCaptureTest','capturekey?keystring='+hardwareKeysTest.testKey15.string+'&truth=yes&call=yes');
				Ruby.call('KeyCaptureTest','capturekey_method?keystring='+hardwareKeysTest.testKey11.string+'&call=yes');
			});

			_result.waitForResponse();

			runs(function(){
				Ruby.call('KeyCaptureTest','capturekey?keystring='+hardwareKeysTest.testKey15.string+'&truth=yes');
				Ruby.call('KeyCaptureTest','capturekey_method?keystring='+hardwareKeysTest.testKey11.string+'&truth=yes');
			});

		});

		it("VT200-0610 | call captureKey with no callback |", function() {
			displayObjective(jasmine.getEnv().currentSpec.description);
			dispTestCaseRunning("Press all the hardware keys");
			dispExpectedResult("No callback should fire after pressing any hardware key");

			_result.waitToRunTest();

			runs(function(){
				Ruby.call('KeyCaptureTest','capturekey?keystring=ALL');
				Ruby.call('KeyCaptureTest','capturekey?keystring=ALL&truth=yes');
			});

			_result.waitForResponse();
		});

		///////////////////////////////////////////////////////////////////////
		//  CaptureTrigger and Remap Tests
		///////////////////////////////////////////////////////////////////////

		if (isWindowsMobileOrAndroidPlatform() && Rho.System.isSymbolDevice == true) {

			it("VT200-0611 | call captureTrigger with callback as anonymous function |", function() {

				displayObjective(jasmine.getEnv().currentSpec.description);
				dispTestCaseRunning("Press left trigger and then press right trigger, Main trigger(if available)");
				dispExpectedResult("The callback should fire and triggerflag should be retrurned for both the triggers with callback");

				_result.waitToRunTest();

				runs(function(){
					Ruby.call('KeyCaptureTest','capturetrigger?call=yes');
				});

				_result.waitForResponse();

				runs(function(){
					Ruby.call('KeyCaptureTest','capturetrigger');
				});
			});

			it("VT200-0612 | call remapKey |", function() {

				displayObjective("VT200-0612 | call remapKey with " + hardwareKeysTest.testKey18.description + " and " + hardwareKeysTest.testKey21.description);
				dispTestCaseRunning("click inside the textbox Press " + hardwareKeysTest.testKey18.description + " and " + hardwareKeysTest.testKey21.description);
				dispExpectedResult(hardwareKeysTest.testKey18.description + " should be displayed after pressing both keys");
				
				_result.waitToRunTest();

				runs(function(){
					Ruby.call('KeyCaptureTest','remapkey?keystring1='+hardwareKeysTest.testKey18.string+'&keystring2='+hardwareKeysTest.testKey21.string);
				});

				_result.waitForResponse();

				runs(function(){
					Ruby.call('KeyCaptureTest','remapkey?keystring1='+hardwareKeysTest.testKey18.string+'&keystring2=');
				});

			});
		}

	});

});