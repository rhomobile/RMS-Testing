describe("KeyCapture Test", function() {

	describe("captureKey, captureTrigger and remapKey Test", function() {
	
		var keydata = '';

		var capturekeycallback = function (data){
				var keyval = data.keyValue
				callbackdata(keyval);
			}

		var capturekeycallback2 = function (data){
				var keyval2 = data.keyValue
				callbackdata2(keyval2);
			}

		var triggercallback = function (data){
				var trigger = data.triggerFlag
				callbackdata(trigger);
		}

		beforeEach(function() {
			keydata ='';
			document.getElementById("actResult").innerHTML = "init";
			callbackdata(keydata);
			callbackdata2(keydata);
		});

		afterEach(function() {
			/* ... Tear it down ... */
		});

		///////////////////////////////////////////////////////////////////////
		//  captureKey Tests
		///////////////////////////////////////////////////////////////////////

			it("VT200-0607 | call captureKey with keyValue for" +hardwareKeysTest.testKey11.description+" function callback |", function() {

				runs(function()
				{
					setObjective("VT200-0607 | call captureKey keyValue for " +hardwareKeysTest.testKey11.description+"  function callback");
					setInstruction("Press hardware key " +hardwareKeysTest.testKey11.description+ "and all other keys");
					setExpected("Callback should fire only for key" +hardwareKeysTest.testKey11.description+ " with value " +hardwareKeysTest.testKey11.string+ "and key" +hardwareKeysTest.testKey11.description+ "should not be disaptached and other all keys should" );
					//var keyval1 = Rho.KeyCapture.captureKey(true,hardwareKeysTest.testKey11.string);
					Rho.KeyCapture.captureKey(false,hardwareKeysTest.testKey11.string,capturekeycallback);
					//callbackdata(keyval1);
				});

				runs(function()
				{		
					waitsFor(function() {
					return document.getElementById("actResult").innerHTML != "init";
					}, "Timed out waiting for tester to respond", 300000);
					runs(function() {
					expect("pass").toEqual(document.getElementById("actResult").innerHTML);
					Rho.KeyCapture.captureKey(true,hardwareKeysTest.testKey11.string);
					});	
				});

			});

			it("VT200-0608 | call captureKey keyValue ALL and callback |", function() {

				runs(function()
				{
					setObjective("VT200-0608 | call captureKey keyValue ALL and callback");
					setInstruction("Press all type of key");
					setExpected("Callback should fire with retrun key values");
					Rho.KeyCapture.captureKey(true,'ALL',capturekeycallback);
				});

				runs(function()
				{		
					waitsFor(function() {
					return document.getElementById("actResult").innerHTML != "init";
					}, "Timed out waiting for tester to respond", 300000);
					runs(function() {
					expect("pass").toEqual(document.getElementById("actResult").innerHTML);
					Rho.KeyCapture.captureKey(true,'ALL');
					});	
				});

			});

			it("VT200-0609 | call captureKey with different callback for 2 different keys |", function() {

				runs(function()
				{
					setObjective("VT200-0609 | call captureKey with different callback for 2 different keys");
					setInstruction("Press " +hardwareKeysTest.testKey11.description+", Press numeric key " +hardwareKeysTest.testKey15.description);
					setExpected("2 different Callback should fire after pressing " +hardwareKeysTest.testKey11.description+" and " +hardwareKeysTest.testKey15.description+ " Key" + hardwareKeysTest.testKey11.description + "should not dispatch and other should dispatch" );
					Rho.KeyCapture.captureKey(true,hardwareKeysTest.testKey15.string,capturekeycallback);
					Rho.KeyCapture.captureKey(false,hardwareKeysTest.testKey11.string,capturekeycallback2);
				});

				runs(function()
				{		
					waitsFor(function() {
					return document.getElementById("actResult").innerHTML != "init";
					}, "Timed out waiting for tester to respond", 300000);
					runs(function() {
					expect("pass").toEqual(document.getElementById("actResult").innerHTML);
					Rho.KeyCapture.captureKey(true,hardwareKeysTest.testKey15.string);
					Rho.KeyCapture.captureKey(true,hardwareKeysTest.testKey11.string);
					});	
				});

			});

			it("VT200-0610 | call captureKey with no callback |", function() {

				runs(function()
				{
					setObjective("VT200-0610 | call captureKey with no callback");
					setInstruction("Press all the hardware keys");
					setExpected("No callback should fire after pressing any hardware key");
					Rho.KeyCapture.captureKey(false,'ALL');
					Rho.KeyCapture.captureKey(true,'ALL');
				});

				runs(function()
				{		
					waitsFor(function() {
					return document.getElementById("actResult").innerHTML != "init";
					}, "Timed out waiting for tester to respond", 300000);
					runs(function() {
					expect("pass").toEqual(document.getElementById("actResult").innerHTML);
					//Rho.KeyCapture.captureKey(true,'ALL');
					});	
				});

			});

			///////////////////////////////////////////////////////////////////////
			//  CaptureTrigger and Remap Tests
			///////////////////////////////////////////////////////////////////////

			if (isWindowsMobileOrAndroidPlatform() && Rho.System.isMotorolaDevice == true) 
			{

				it("VT200-0611 | call captureTrigger with callback as anonymous function |", function() {

					runs(function()
					{
						setObjective("VT200-0611 | call captureTrigger with callback as anonymous function ");
						setInstruction("Press left trigger and then press right trigger, Main trigger(if available)");
						setExpected("The callback should fire and triggerflag should be retrurned for both the triggers with callback");
						Rho.KeyCapture.captureTrigger(function(data){triggercallback(data);});
					});

					runs(function()
					{		
						waitsFor(function() {
						return document.getElementById("actResult").innerHTML != "init";
						}, "Timed out waiting for tester to respond", 300000);
						runs(function() {
						expect("pass").toEqual(document.getElementById("actResult").innerHTML);
						Rho.KeyCapture.captureTrigger();
						});	
					});
				});

				it("VT200-0612 | call remapKey |", function() {

					runs(function()
					{
						setObjective("VT200-0612 | call remapKey with" + hardwareKeysTest.testKey18.description + " and " + hardwareKeysTest.testKey21.description);
						setInstruction("click inside the textbox Press " + hardwareKeysTest.testKey18.description + " and " + hardwareKeysTest.testKey21.description);
						setExpected( hardwareKeysTest.testKey18.description + "should be displayed after pressing both keys");
						Rho.KeyCapture.remapKey(hardwareKeysTest.testKey18.string,hardwareKeysTest.testKey21.string);
					});

					runs(function()
					{		
						waitsFor(function() {
						return document.getElementById("actResult").innerHTML != "init";
						}, "Timed out waiting for tester to respond", 300000);
						runs(function() {
						expect("pass").toEqual(document.getElementById("actResult").innerHTML);
						Rho.KeyCapture.remapKey(hardwareKeysTest.testKey18.string,'');
						});	
					});

				});

			}
	});	
});	