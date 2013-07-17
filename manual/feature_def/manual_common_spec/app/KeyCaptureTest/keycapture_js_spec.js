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
		if (isApplePlatform())
		{
			it("VT289-012 | call captureKey  keyValue for " +hardwareKeysTest.testKey11.description+" and function callback |", function() {

				runs(function()
				{
					setObjective("VT289-012 | call captureKey keyValue for " +hardwareKeysTest.testKey11.description+" and function callback");
					setInstruction("Press hardware key " +hardwareKeysTest.testKey11.description);
					setExpected("Callback should fire with value " +hardwareKeysTest.testKey11.string);
					Rho.KeyCapture.captureKey(false,hardwareKeysTest.testKey11.string,capturekeycallback);
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

			it("VT289-013 | call captureKey with keyValue for" +hardwareKeysTest.testKey13.description+" function callback |", function() {

				runs(function()
				{
					setObjective("VT289-013 | call captureKey keyValue for " +hardwareKeysTest.testKey13.description+"  function callback");
					setInstruction("Press hardware key " +hardwareKeysTest.testKey13.description);
					setExpected("Callback should fire with value " +hardwareKeysTest.testKey13.string);
					//var keyval1 = Rho.KeyCapture.captureKey(true,hardwareKeysTest.testKey13.string);
					Rho.KeyCapture.captureKey(false,hardwareKeysTest.testKey13.string,capturekeycallback);
					//callbackdata(keyval1);
				});

				runs(function()
				{		
					waitsFor(function() {
					return document.getElementById("actResult").innerHTML != "init";
					}, "Timed out waiting for tester to respond", 300000);
					runs(function() {
					expect("pass").toEqual(document.getElementById("actResult").innerHTML);
					Rho.KeyCapture.captureKey(true,hardwareKeysTest.testKey13.string);
					});	
				});

			});

			it("VT289-014 | call captureKey keyValue for " +hardwareKeysTest.testKey14.description+" and callback as Anynomous function |", function() {

				runs(function()
				{
					setObjective("VT289-014 | call captureKey keyValue for " +hardwareKeysTest.testKey14.description+" and callback as Anynomous function");
					setInstruction("Press hardware key " +hardwareKeysTest.testKey14.description);
					setExpected("Callback should fire with value " +hardwareKeysTest.testKey14.string+" check for Callback to fire with value "+hardwareKeysTest.testKey14.string);
					Rho.KeyCapture.captureKey(true,hardwareKeysTest.testKey14.string,function(data){callbackdata(data.keyValue);});
				});

				runs(function()
				{		
					waitsFor(function() {
					return document.getElementById("actResult").innerHTML != "init";
					}, "Timed out waiting for tester to respond", 300000);
					runs(function() {
					expect("pass").toEqual(document.getElementById("actResult").innerHTML);
					Rho.KeyCapture.captureKey(true,hardwareKeysTest.testKey14.string);
					});	
				});

			});

			it("VT289-016 | call captureKey keyValue ALL and callback |", function() {

				runs(function()
				{
					setObjective("VT289-016 | call captureKey keyValue ALL and callback");
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

			it("VT289-020 | call captureKey with different callback for 2 different keys |", function() {

				runs(function()
				{
					setObjective("VT289-020 | call captureKey with different callback for 2 different keys");
					setInstruction("Press " +hardwareKeysTest.testKey11.description+", Press numeric key " +hardwareKeysTest.testKey15.description);
					setExpected("2 different Callback should fire after pressing " +hardwareKeysTest.testKey11.description+" and " +hardwareKeysTest.testKey15.description);
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

			it("VT289-021 | call captureKey twice, one with callback and other without callback |", function() {

				runs(function()
				{
					setObjective("VT289-021| call captureKey twice, one with callback and other without callback");
					setInstruction("Press " +hardwareKeysTest.testKey15.description+", " +hardwareKeysTest.testKey21.description+"");
					setExpected("callback1 should fire after pressing " +hardwareKeysTest.testKey15.description+" and no callback should fire after pressing " +hardwareKeysTest.testKey21.description);
					Rho.KeyCapture.captureKey(true,hardwareKeysTest.testKey15.string,capturekeycallback);
					Rho.KeyCapture.captureKey(true,hardwareKeysTest.testKey21.string);
				});

				runs(function()
				{		
					waitsFor(function() {
					return document.getElementById("actResult").innerHTML != "init";
					}, "Timed out waiting for tester to respond", 300000);
					runs(function() {
					expect("pass").toEqual(document.getElementById("actResult").innerHTML);
					Rho.KeyCapture.captureKey(true,hardwareKeysTest.testKey15.string);
					});	
				});

			});


			it("VT289-023 | call captureKey to check the keyvalues of all hardware key |", function() {

				runs(function()
				{
					setObjective("VT289-023 | call captureKey to check the keyvalues of all hardware key");
					setInstruction("Press all hardwarekey on Iphone and Android ");
					setExpected("Callback should fire and different keyvalue should return and all key should be dispatched");
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


			it("VT289-030 | call captureKey with no callback |", function() {

				runs(function()
				{
					setObjective("VT289-030 | call captureKey with no callback");
					setInstruction("Press key 2 and b from soft key");
					setExpected("No callback should fire after pressing any hardware and soft  key");
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

			it("VT289-031 | call captureKey with no callback after setting "+ hardwareKeysTest.testKey11.description, function() {

				runs(function()
				{
					setObjective("VT289-031 | call captureKey with no callback after setting key 1");
					setInstruction("Textbox and press "+ hardwareKeysTest.testKey11.description);
					setExpected("No callback should fire after pressing" +hardwareKeysTest.testKey11.description);
					Rho.KeyCapture.captureKey(false,hardwareKeysTest.testKey11.string,capturekeycallback);
					Rho.KeyCapture.captureKey(true,hardwareKeysTest.testKey11.string);
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
		}
		else
		{
			it("VT289-017 | call captureKey with dispatch false and true for 2 different key and diff callback function |", function() {

				runs(function()
				{
					setObjective("VT289-017 | call captureKey with dispatch false and true for 2 different key and diff callback function");
					setInstruction("click inside textbox and Press" +hardwareKeysTest.testKey11.description+" ,Press alphabet a or volumedown , Press Symbols # or menukey");
					setExpected("Callback1 should fire after pressing all the key , Callback2 should not fire after pressing " +hardwareKeysTest.testKey11.description+"  and " +hardwareKeysTest.testKey11.description+"  only should be dispatched inside box, others not");
					Rho.KeyCapture.captureKey(false,'ALL',capturekeycallback);
					Rho.KeyCapture.captureKey(true,hardwareKeysTest.testKey11.string,capturekeycallback2);
				});

				runs(function()
				{		
					waitsFor(function() {
					return document.getElementById("actResult").innerHTML != "init";
					}, "Timed out waiting for tester to respond", 300000);
					runs(function() {
					expect("pass").toEqual(document.getElementById("actResult").innerHTML);
					Rho.KeyCapture.captureKey(true,'ALL');
					Rho.KeyCapture.captureKey(true,hardwareKeysTest.testKey11.string);
					});	
				});

			});

			it("VT289-018 | call captureKey with keyValue enter and ALL and different callback function |", function() {

				runs(function()
				{
					setObjective("VT289-018 | call captureKey with keyValue enter and ALL and different callback function");
					setInstruction("click inside textbox and " +hardwareKeysTest.testKey18.description+", Press numeric key 9/volumedown and press alphabet b/menu key");
					setExpected("Callback2 should fire after pressing alphabet b (0x66),number 9 (0x39) and " +hardwareKeysTest.testKey18.description+"/" +hardwareKeysTest.testKey18.string + " , Callback1 should not fire after pressing " +hardwareKeysTest.testKey18.description+" and " +hardwareKeysTest.testKey18.description+" should be dispatched, others not");
					Rho.KeyCapture.captureKey(true,hardwareKeysTest.testKey18.string,capturekeycallback);
					Rho.KeyCapture.captureKey(false,'ALL',capturekeycallback2);
				});

				runs(function()
				{		
					waitsFor(function() {
					return document.getElementById("actResult").innerHTML != "init";
					}, "Timed out waiting for tester to respond", 300000);
					runs(function() {
					expect("pass").toEqual(document.getElementById("actResult").innerHTML);
					Rho.KeyCapture.captureKey(true,'ALL');
					Rho.KeyCapture.captureKey(true,hardwareKeysTest.testKey18.string);
					});	
				});

			});

			it("VT289-019 | call captureKey twice with keyvalue ALL and keyValue 1 with different dispatch value |", function() {

				runs(function()
				{
					setObjective("VT289-019 | call captureKey twice with keyvalue ALL and keyValue 1 with different dispatch value");
					setInstruction("click inside textbox and Press alphabet z/volumedownkey, Press numeric key " +hardwareKeysTest.testKey11.description);
					setExpected("Callback1 only should fire after pressing alphabet z/volumedown key, and " +hardwareKeysTest.testKey11.description+", Callback2 should not fire after pressing " +hardwareKeysTest.testKey11.description+" and z/voulmedown should appear and " +hardwareKeysTest.testKey11.description+" should not dispatch");
					Rho.KeyCapture.captureKey(true,'ALL',function(data){callbackdata(data.keyValue);});
					Rho.KeyCapture.captureKey(false,hardwareKeysTest.testKey11.string,function(data){callbackdata2(data.keyValue);});
				});

				runs(function()
				{		
					waitsFor(function() {
					return document.getElementById("actResult").innerHTML != "init";
					}, "Timed out waiting for tester to respond", 300000);
					runs(function() {
					expect("pass").toEqual(document.getElementById("actResult").innerHTML);
					Rho.KeyCapture.captureKey(true,'ALL');
					Rho.KeyCapture.captureKey(true,hardwareKeysTest.testKey11.string);
					});	
				});

			});

			it("VT289-020 | call captureKey with different callback for 2 different keys |", function() {

				runs(function()
				{
					setObjective("VT289-020 | call captureKey with different callback for 2 different keys");
					setInstruction("click inside textbox and Press " +hardwareKeysTest.testKey11.description+", Press numeric key " +hardwareKeysTest.testKey15.description);
					setExpected("2 different Callback should fire after pressing " +hardwareKeysTest.testKey11.description+" and " +hardwareKeysTest.testKey15.description+" and " +hardwareKeysTest.testKey11.description+" should be dispatched and " +hardwareKeysTest.testKey15.description+" should not");
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

			it("VT289-023 | call captureKey to check the keyvalues of all hardware key |", function() {

				runs(function()
				{
					setObjective("VT289-023 | call captureKey to check the keyvalues of all hardware key");
					setInstruction("click inside textbox and Press all the numeric key one by one i windows, Press all hardwarekey on Iphone and Android ");
					setExpected("Callback should fire and different keyvalue should return and all key should be dispatched");
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
	/*
			it("VT289-032 | call captureKey with callback and use SIP keys |", function() {

				runs(function()
				{
					setObjective("VT289-032 | call captureKey with callback and use SIP keys");
					setInstruction("Click inside Textbox, show the SIP and Press all numeric key, Alphabet and Symbols through SIP");
					setExpected("Callback should fire and different keyvalue should come for all the keys and all the keys should dispatched inside textbox also, the value of hardware key and soft key should be same. ");
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
	*/
			if (isWindowsMobilePlatform())
			{
				it("VT289-024 | call captureKey to check the keyvalues of all alphabet key |", function() {

					runs(function()
					{
						setObjective("VT289-024 | call captureKey to check the keyvalues of all alphabet key");
						setInstruction("Click inside Textbox and Press all the alphabet key one by one (first all small then caps");
						setExpected("Callback should fire and different keyvalue should come for all the alphabet keys from a to z and A to Z");
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

				it("VT289-025 | call captureKey to check the keyvalues of all symbol key |", function() {

					runs(function()
					{
						setObjective("VT289-025 | call captureKey to check the keyvalues of all symbol key");
						setInstruction("Click inside Textbox and Press all the symbol key one by one (first all small then caps");
						setExpected("Callback should fire and different keyvalue should come for all the symbol keys");
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

				it("VT289-026 | call captureKey to check the keyvalues of all Function key |", function() {

					runs(function()
					{
						setObjective("VT289-026 | call captureKey to check the keyvalues of all Function key");
						setInstruction("Click inside Textbox and Press all the Function key one by one");
						setExpected("Callback should fire and different keyvalue should come for all the Function key");
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

				it("VT289-027 | call captureKey to check the keyvalues of all Application key |", function() {

					runs(function()
					{
						setObjective("VT289-027 | call captureKey to check the keyvalues of all Application key");
						setInstruction("Click inside Textbox and Press all the Application key one by one");
						setExpected("Callback should fire and different keyvalue should come for all the Application key");
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
			}

			///////////////////////////////////////////////////////////////////////
			//  CaptureTrigger Tests
			///////////////////////////////////////////////////////////////////////

			if (isWindowsMobileOrAndroidPlatform() && Rho.System.isMotorolaDevice == true) 
			{
				it("VT289-035 | call captureTrigger with function callback |", function() {

					runs(function()
					{
						setObjective("VT289-035 | call captureTrigger with function callback ");
						setInstruction("Press left trigger and then press right trigger, Main trigger(if available)");
						setExpected("The callback should fire and triggerflag should be retrurned for both the triggers with callback");
						Rho.KeyCapture.captureTrigger(triggercallback);
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

				it("VT289-036 | call captureTrigger with callback as anonymous function |", function() {

					runs(function()
					{
						setObjective("VT289-036 | call captureTrigger with callback as anonymous function ");
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
	/*
				it("VT289-037 | call captureTrigger with no callback (Sync Access) |", function() {

					runs(function()
					{
						setObjective("VT289-037 | call captureTrigger with no callback (Sync Access) ");
						setInstruction("Press left trigger and then press right trigger, Main trigger(if available)");
						setExpected("The triggerflag should be returned with Sync Access");
						var trigger1 = Rho.KeyCapture.captureTrigger();
						callbackdata(trigger);
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
	*/
				it("VT289-038 | call captureTrigger with no callback after calling with callback |", function() {

					runs(function()
					{
						setObjective("VT289-038 | call captureTrigger with no callback after calling with callback ");
						setInstruction("Press left trigger and then press right trigger, Main trigger(if available)");
						setExpected("The callback should not fire after pressing the triggers");
						Rho.KeyCapture.captureTrigger(triggercallback);
						Rho.KeyCapture.captureTrigger();
					});

					runs(function()
					{		
						waitsFor(function() {
						return document.getElementById("actResult").innerHTML != "init";
						}, "Timed out waiting for tester to respond", 300000);
						runs(function() {
						expect("pass").toEqual(document.getElementById("actResult").innerHTML);
						//Rho.KeyCapture.captureTrigger();
						});	
					});
				});

			}
		}
	});	
});	