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
		it("VT289-011 | call captureKey keyValue for " +hardwareKeysTest.testKey11.description+" with dispatch true and function callback |", function() {

			runs(function()
			{
				setObjective("VT289-011 | call captureKey keyValue for " +hardwareKeysTest.testKey11.description+" with dispatch true and function callback");
				if (isWindowsMobilePlatform())
				{					
					setInstruction("click inside textbox and Press hardware key " +hardwareKeysTest.testKey11.description+"press other keys aswell");
					setExpected("Callback should fire with value" +hardwareKeysTest.testKey11.value + "only and " + hardwareKeysTest.testKey11.description +"should showup in textbox");
				}
				else
				{
					setInstruction("Press hardware key " +hardwareKeysTest.testKey11.description+"press other keys aswell");
					setExpected("Callback should fire with value " +hardwareKeysTest.testKey11.value+"only and pressed key should be dispatched. Note:Dispatch is NA for ios");
				}
				EB.KeyCapture.captureKey(true,hardwareKeysTest.testKey11.string,capturekeycallback);
			});

			runs(function()
			{		
				waitsFor(function() {
				return document.getElementById("actResult").innerHTML != "init";
				}, "Timed out waiting for tester to respond", 300000);
				runs(function() {
				expect("pass").toEqual(document.getElementById("actResult").innerHTML);
				EB.KeyCapture.captureKey(true,hardwareKeysTest.testKey11.string);
				});	
			});

		});

        //Synchronous callback is not supported in Keycapture, so converted to async callback
		it("VT289-012 | call captureKey with keyValue for" +hardwareKeysTest.testKey13.description+" with dispatch false and function callback |", function() {

			runs(function()
			{
				setObjective("VT289-012 | call captureKey keyValue for " +hardwareKeysTest.testKey13.description+" with dispatch false and function callback");
				if (isWindowsMobilePlatform())
				{
					setInstruction("Press hardware key " +hardwareKeysTest.testKey13.description+" press other keys as well");
					setExpected("Callback should fire with value " +hardwareKeysTest.testKey13.value+ " only and only " +hardwareKeysTest.testKey13.description+" should not comeup in textbox" );
				}
				else
				{
					setInstruction("Press hardware key " +hardwareKeysTest.testKey13.description+" press other keys as well");
					setExpected("Callback should fire with value " +hardwareKeysTest.testKey13.value+" only and only "+hardwareKeysTest.testKey13.description+ " key should not dispatch. Note:Dispatch is NA for ios");						
				}
				//var keyval1 = EB.KeyCapture.captureKey(true,hardwareKeysTest.testKey13.string);
				EB.KeyCapture.captureKey(false,hardwareKeysTest.testKey13.string,capturekeycallback);
				//callbackdata(keyval1);
			});

			runs(function()
			{		
				waitsFor(function() {
				return document.getElementById("actResult").innerHTML != "init";
				}, "Timed out waiting for tester to respond", 300000);
				runs(function() {
				expect("pass").toEqual(document.getElementById("actResult").innerHTML);
				EB.KeyCapture.captureKey(true,hardwareKeysTest.testKey13.string);
				});	
			});

		});

		it("VT289-014 | call captureKey keyValue for " +hardwareKeysTest.testKey14.description+" and callback as Anynomous function |", function() {

			runs(function()
			{
				setObjective("VT289-014 | call captureKey keyValue for " +hardwareKeysTest.testKey14.description+" and callback as Anynomous function");
				setInstruction("Press hardware key " +hardwareKeysTest.testKey14.description);
				setExpected("Callback should fire with value " +hardwareKeysTest.testKey14.value);
				EB.KeyCapture.captureKey(true,hardwareKeysTest.testKey14.string,function(data){callbackdata(data.keyValue);});
			});

			runs(function()
			{		
				waitsFor(function() {
				return document.getElementById("actResult").innerHTML != "init";
				}, "Timed out waiting for tester to respond", 300000);
				runs(function() {
				expect("pass").toEqual(document.getElementById("actResult").innerHTML);
				EB.KeyCapture.captureKey(true,hardwareKeysTest.testKey14.string);
				});	
			});

		});

		it("VT289-016 | call captureKey with dispatch True, keyValue ALL and callback |", function() {

			runs(function()
			{
				setObjective("VT289-016 | call captureKey with dispatch True, keyValue ALL and callback");
				if (isWindowsMobilePlatform())
				{
					setInstruction("Press inside textbox and Press all type of key");
					setExpected("Callback should fire with retrun key values and all keys should showup inside textbox");
				}
				else
				{
					setInstruction("Press all type of key");
					setExpected("Callback should fire with retrun key values and all keys should be dispatch. Note:Dispatch is NA for ios");
				} 
				EB.KeyCapture.captureKey(true,'ALL',capturekeycallback);
			});

			runs(function()
			{		
				waitsFor(function() {
				return document.getElementById("actResult").innerHTML != "init";
				}, "Timed out waiting for tester to respond", 300000);
				runs(function() {
				expect("pass").toEqual(document.getElementById("actResult").innerHTML);
				EB.KeyCapture.captureKey(true,'ALL');
				});	
			});

		});

		if (!isApplePlatform())
		{
			it("VT289-017 | call captureKey twice, dispatch false with keyValue ALL first then true with particular key |", function() {

				runs(function()
				{
					setObjective("VT289-017 | call captureKey twice, dispatch false with keyValue ALL first then true with particular key");
					setInstruction("Press" +hardwareKeysTest.testKey11.description+" ,Press other keys as well (Note: for WM/CE need to click inside textbox before pressing key)");
					setExpected("Callback1 should fire after pressing all the key, except with pressing " +hardwareKeysTest.testKey11.description+" callback2 should fire and only " +hardwareKeysTest.testKey11.description+" should be dispatched, others not");
					EB.KeyCapture.captureKey(false,'ALL',capturekeycallback);
					EB.KeyCapture.captureKey(true,hardwareKeysTest.testKey11.string,capturekeycallback2);
				});

				runs(function()
				{		
					waitsFor(function() {
					return document.getElementById("actResult").innerHTML != "init";
					}, "Timed out waiting for tester to respond", 300000);
					runs(function() {
					expect("pass").toEqual(document.getElementById("actResult").innerHTML);
					EB.KeyCapture.captureKey(true,'ALL');
					EB.KeyCapture.captureKey(true,hardwareKeysTest.testKey11.string);
					});	
				});

			});

			it("VT289-018 | call captureKey twice, dispatch true with particular key first then false with keyValue ALL|", function() {

				runs(function()
				{
					setObjective("VT289-018 | call captureKey twice, dispatch true with particular key first then false with keyValue ALL");
					setInstruction("Press key " +hardwareKeysTest.testKey18.description+" and Press other keys as well. (Note: for WM/CE, press inside texbox before pressing key)");
					setExpected("Callback2 should fire after pressing all keys except callback1 should fire after pressing " +hardwareKeysTest.testKey18.description+ " and only " +hardwareKeysTest.testKey18.description+" should be dispatched, others not");
					EB.KeyCapture.captureKey(true,hardwareKeysTest.testKey18.string,capturekeycallback);
					EB.KeyCapture.captureKey(false,'ALL',capturekeycallback2);
				});

				runs(function()
				{		
					waitsFor(function() {
					return document.getElementById("actResult").innerHTML != "init";
					}, "Timed out waiting for tester to respond", 300000);
					runs(function() {
					expect("pass").toEqual(document.getElementById("actResult").innerHTML);
					EB.KeyCapture.captureKey(true,'ALL');
					EB.KeyCapture.captureKey(true,hardwareKeysTest.testKey18.string);
					});	
				});

			});

			it("VT289-019 | call captureKey twice, dispatch true with keyvalue ALL firts then false with particular key |", function() {

				runs(function()
				{
					setObjective("VT289-019 | call captureKey twice with keyvalue ALL and keyValue 1 with different dispatch value");
					setInstruction("Press key " +hardwareKeysTest.testKey11.description+ "and press all other keys as well (Note: for WM/CE, press inside texbox before pressing key)");
					setExpected("Callback2 only should fire after pressing key " +hardwareKeysTest.testKey11.description+", otherwise callback1 should fire and " +"all keys should dispatch except "+hardwareKeysTest.testKey11.description);
					EB.KeyCapture.captureKey(true,'ALL',function(data){callbackdata(data.keyValue);});
					EB.KeyCapture.captureKey(false,hardwareKeysTest.testKey11.string,function(data){callbackdata2(data.keyValue);});
				});

				runs(function()
				{		
					waitsFor(function() {
					return document.getElementById("actResult").innerHTML != "init";
					}, "Timed out waiting for tester to respond", 300000);
					runs(function() {
					expect("pass").toEqual(document.getElementById("actResult").innerHTML);
					EB.KeyCapture.captureKey(true,'ALL');
					EB.KeyCapture.captureKey(true,hardwareKeysTest.testKey11.string);
					});	
				});

			});				
		}

		it("VT289-020 | call captureKey with different callback for 2 different keys |", function() {

			runs(function()
			{
				setObjective("VT289-020 | call captureKey with different callback for 2 different keys");
				setInstruction("Press " +hardwareKeysTest.testKey11.description+", Press numeric key " +hardwareKeysTest.testKey15.description);
				setExpected("2 different Callback should fire after pressing " +hardwareKeysTest.testKey11.description+" and " +hardwareKeysTest.testKey15.description);
				EB.KeyCapture.captureKey(true,hardwareKeysTest.testKey15.string,capturekeycallback);
				EB.KeyCapture.captureKey(false,hardwareKeysTest.testKey11.string,capturekeycallback2);
			});

			runs(function()
			{		
				waitsFor(function() {
				return document.getElementById("actResult").innerHTML != "init";
				}, "Timed out waiting for tester to respond", 300000);
				runs(function() {
				expect("pass").toEqual(document.getElementById("actResult").innerHTML);
				EB.KeyCapture.captureKey(true,hardwareKeysTest.testKey15.string);
				EB.KeyCapture.captureKey(true,hardwareKeysTest.testKey11.string);
				});	
			});

		});

		it("VT289-021 | call captureKey twice, one with callback and other without callback |", function() {

			runs(function()
			{
				setObjective("VT289-021| call captureKey twice, one with callback and other without callback");
				setInstruction("Press " +hardwareKeysTest.testKey15.description+" and " +hardwareKeysTest.testKey21.description+"");
				setExpected("callback1 should fire after pressing " +hardwareKeysTest.testKey15.description+" and no callback should fire after pressing " +hardwareKeysTest.testKey21.description);
				EB.KeyCapture.captureKey(true,hardwareKeysTest.testKey15.string,capturekeycallback);
				EB.KeyCapture.captureKey(true,hardwareKeysTest.testKey21.string);
			});

			runs(function()
			{		
				waitsFor(function() {
				return document.getElementById("actResult").innerHTML != "init";
				}, "Timed out waiting for tester to respond", 300000);
				runs(function() {
				expect("pass").toEqual(document.getElementById("actResult").innerHTML);
				EB.KeyCapture.captureKey(true,hardwareKeysTest.testKey15.string);
				});	
			});

		});

		it("VT289-022 | call captureKey twice, one with callback and other without callback for keyValue ALL |", function() {

			runs(function()
			{
				setObjective("VT289-022| call captureKey twice, one with callback and other without callback for keyValue ALL");
				setInstruction("Press " +hardwareKeysTest.testKey15.description+" and press other keys as well");
				setExpected("callback should fire after pressing " +hardwareKeysTest.testKey15.description+"no callback for others");
				EB.KeyCapture.captureKey(true,hardwareKeysTest.testKey15.string,capturekeycallback);
				EB.KeyCapture.captureKey(true,'ALL');
			});

			runs(function()
			{		
				waitsFor(function() {
				return document.getElementById("actResult").innerHTML != "init";
				}, "Timed out waiting for tester to respond", 300000);
				runs(function() {
				expect("pass").toEqual(document.getElementById("actResult").innerHTML);
				EB.KeyCapture.captureKey(true,hardwareKeysTest.testKey15.string);
				});	
			});

		});

		it("VT289-023 | call captureKey to check the keyvalues of all hardware key |", function() {

			runs(function()
			{
				setObjective("VT289-023 | call captureKey to check the keyvalues of all hardware key");
				setInstruction("Press all hardwarekey in android and Ios, for WM/CE press only numeric keys Note:click inside textbox for WM/CE before pressing key");
				setExpected("Callback should fire and different keyvalue should return and all key should be dispatched");
				EB.KeyCapture.captureKey(true,'ALL',capturekeycallback);
			});

			runs(function()
			{		
				waitsFor(function() {
				return document.getElementById("actResult").innerHTML != "init";
				}, "Timed out waiting for tester to respond", 300000);
				runs(function() {
				expect("pass").toEqual(document.getElementById("actResult").innerHTML);
				EB.KeyCapture.captureKey(true,'ALL');
				});	
			});

		});

		if (isWindowsMobilePlatform())
		{
			it("VT289-024 | call captureKey to check the keyvalues of all alphabet key |", function() {

				runs(function()
				{
					setObjective("VT289-024 | call captureKey to check the keyvalues of all alphabet key");
					setInstruction("Click inside Textbox and Press all the alphabet key one by one (first all small then caps");
					setExpected("Callback should fire and different keyvalue should come for all the alphabet keys from a to z and A to Z");
					EB.KeyCapture.captureKey(true,'ALL',capturekeycallback);
				});

				runs(function()
				{		
					waitsFor(function() {
					return document.getElementById("actResult").innerHTML != "init";
					}, "Timed out waiting for tester to respond", 300000);
					runs(function() {
					expect("pass").toEqual(document.getElementById("actResult").innerHTML);
						EB.KeyCapture.captureKey(true,'ALL');
					});	
				});

			});

			it("VT289-025 | call captureKey to check the keyvalues of all symbol key |", function() {

				runs(function()
				{
					setObjective("VT289-025 | call captureKey to check the keyvalues of all symbol key");
					setInstruction("Click inside Textbox and Press all the symbol key one by one");
					setExpected("Callback should fire and different keyvalue should come for all the symbol keys");
					EB.KeyCapture.captureKey(true,'ALL',capturekeycallback);
				});

				runs(function()
				{		
					waitsFor(function() {
					return document.getElementById("actResult").innerHTML != "init";
					}, "Timed out waiting for tester to respond", 300000);
					runs(function() {
					expect("pass").toEqual(document.getElementById("actResult").innerHTML);
					EB.KeyCapture.captureKey(true,'ALL');
					});	
				});

			});

			it("VT289-026 | call captureKey to check the keyvalues of all Function key |", function() {

				runs(function()
				{
					setObjective("VT289-026 | call captureKey to check the keyvalues of all Function key");
					setInstruction("Press all the Function key one by one");
					setExpected("Callback should fire and different keyvalue should come for all the Function key, Caputring function keys depend upon values of Fx in config.xml");
					EB.KeyCapture.captureKey(true,'ALL',capturekeycallback);
				});

				runs(function()
				{		
					waitsFor(function() {
					return document.getElementById("actResult").innerHTML != "init";
					}, "Timed out waiting for tester to respond", 300000);
					runs(function() {
					expect("pass").toEqual(document.getElementById("actResult").innerHTML);
					EB.KeyCapture.captureKey(true,'ALL');
					});	
				});

			});

			it("VT289-027 | call captureKey to check the keyvalues of all Application key |", function() {

				runs(function()
				{
					setObjective("VT289-027 | call captureKey to check the keyvalues of all Application key");
					setInstruction("Press all the Application key one by one");
					setExpected("Callback should fire and different keyvalue should come for supported the Application key, all applications keys can not be captured");
					EB.KeyCapture.captureKey(true,'ALL',capturekeycallback);
				});

				runs(function()
				{		
					waitsFor(function() {
					return document.getElementById("actResult").innerHTML != "init";
					}, "Timed out waiting for tester to respond", 300000);
					runs(function() {
					expect("pass").toEqual(document.getElementById("actResult").innerHTML);
					EB.KeyCapture.captureKey(true,'ALL');
					});	
				});

			});
		}

		it("VT289-030 | call captureKey with no callback and dispatch false |", function() {

			runs(function()
			{
				setObjective("VT289-030 | call captureKey with no callback and dispatch false");
				setInstruction("Press any key");
				setExpected("No callback should fire after pressing any hardware key and no dispatch");
				EB.KeyCapture.captureKey(false,'ALL');
			});

			runs(function()
			{		
				waitsFor(function() {
				return document.getElementById("actResult").innerHTML != "init";
				}, "Timed out waiting for tester to respond", 300000);
				runs(function() {
				expect("pass").toEqual(document.getElementById("actResult").innerHTML);
				EB.KeyCapture.captureKey(true,'ALL');
				});	
			});

		});

		it("VT289-031 | call captureKey with no callback after setting "+ hardwareKeysTest.testKey11.description, function() {

			runs(function()
			{
				setObjective("VT289-031 | call captureKey with no callback after setting "+ hardwareKeysTest.testKey11.description);
				setInstruction("press "+ hardwareKeysTest.testKey11.description);
				setExpected("No callback should fire after pressing" +hardwareKeysTest.testKey11.description);
				EB.KeyCapture.captureKey(false,hardwareKeysTest.testKey11.string,capturekeycallback);
				EB.KeyCapture.captureKey(true,hardwareKeysTest.testKey11.string);
			});

			runs(function()
			{		
				waitsFor(function() {
				return document.getElementById("actResult").innerHTML != "init";
				}, "Timed out waiting for tester to respond", 300000);
				runs(function() {
				expect("pass").toEqual(document.getElementById("actResult").innerHTML);
				EB.KeyCapture.captureKey(true,'ALL');
				});	
			});

		});
//SIP is not supported By Keycapture API
		xit("VT289-032 | call captureKey with callback and use SIP keys |", function() {

			runs(function()
			{
				setObjective("VT289-032 | call captureKey with callback and use SIP keys");
				setInstruction("Click inside Textbox, show the SIP and Press all numeric key, Alphabet and Symbols through SIP");
				setExpected("There should not be any bad behaviour Keyacpture API is only for hardware key");
				EB.KeyCapture.captureKey(true,'ALL',capturekeycallback);
			});

			runs(function()
			{		
				waitsFor(function() {
				return document.getElementById("actResult").innerHTML != "init";
				}, "Timed out waiting for tester to respond", 300000);
				runs(function() {
				expect("pass").toEqual(document.getElementById("actResult").innerHTML);
				EB.KeyCapture.captureKey(true,'ALL');
				});	
			});

		});

		///////////////////////////////////////////////////////////////////////
		//  CaptureTrigger Tests
		///////////////////////////////////////////////////////////////////////

		if (isWindowsMobileOrAndroidPlatform() && EB.System.isMotorolaDevice == true) 
		{
			it("VT289-035 | call captureTrigger with function callback |", function() {

				runs(function()
				{
					setObjective("VT289-035 | call captureTrigger with function callback ");
					setInstruction("Press left trigger and then press right trigger, Main trigger(if available)");
					setExpected("The callback should fire and triggerflag should be retrurned for both the triggers with callback");
					EB.KeyCapture.captureTrigger(triggercallback);
				});

				runs(function()
				{		
					waitsFor(function() {
					return document.getElementById("actResult").innerHTML != "init";
					}, "Timed out waiting for tester to respond", 300000);
					runs(function() {
					expect("pass").toEqual(document.getElementById("actResult").innerHTML);
					EB.KeyCapture.captureTrigger();
					});	
				});
			});

			it("VT289-036 | call captureTrigger with callback as anonymous function |", function() {

				runs(function()
				{
					setObjective("VT289-036 | call captureTrigger with callback as anonymous function ");
					setInstruction("Press left trigger and then press right trigger, Main trigger(if available)");
					setExpected("The callback should fire and triggerflag should be retrurned for both the triggers with callback");
					EB.KeyCapture.captureTrigger(function(data){triggercallback(data);});
				});

				runs(function()
				{		
					waitsFor(function() {
					return document.getElementById("actResult").innerHTML != "init";
					}, "Timed out waiting for tester to respond", 300000);
					runs(function() {
					expect("pass").toEqual(document.getElementById("actResult").innerHTML);
					EB.KeyCapture.captureTrigger();
					});	
				});
			});
//Only Async callback is supported
			xit("VT289-037 | call captureTrigger with no callback (Sync Access) |", function() {

				runs(function()
				{
					setObjective("VT289-037 | call captureTrigger with no callback (Sync Access) ");
					setInstruction("Press left trigger and then press right trigger, Main trigger(if available)");
					setExpected("The triggerflag should be returned with Sync Access");
					var trigger1 = EB.KeyCapture.captureTrigger();
					callbackdata(trigger);
				});

				runs(function()
				{		
					waitsFor(function() {
					return document.getElementById("actResult").innerHTML != "init";
					}, "Timed out waiting for tester to respond", 300000);
					runs(function() {
					expect("pass").toEqual(document.getElementById("actResult").innerHTML);
					EB.KeyCapture.captureTrigger();
					});	
				});
			});

			it("VT289-038 | call captureTrigger with no callback after calling with callback |", function() {

				runs(function()
				{
					setObjective("VT289-038 | call captureTrigger with no callback after calling with callback ");
					setInstruction("Press left trigger and then press right trigger, Main trigger(if available)");
					setExpected("The callback should not fire after pressing the triggers");
					EB.KeyCapture.captureTrigger(triggercallback);
					EB.KeyCapture.captureTrigger();
				});

				runs(function()
				{		
					waitsFor(function() {
					return document.getElementById("actResult").innerHTML != "init";
					}, "Timed out waiting for tester to respond", 300000);
					runs(function() {
					expect("pass").toEqual(document.getElementById("actResult").innerHTML);
					//EB.KeyCapture.captureTrigger();
					});	
				});
			});
		}

		///////////////////////////////////////////////////////////////////////
		//  Remap Key Tests
		///////////////////////////////////////////////////////////////////////

		if (isWindowsMobileOrAndroidPlatform())
		{
			it("VT289-039 | call remapKey with "+hardwareKeysTest.testKey18.description+" and "+ hardwareKeysTest.testKey13.description, function() {

				runs(function()
				{
					setObjective("VT289-039 | call remapKey with "+hardwareKeysTest.testKey18.description+" and "+ hardwareKeysTest.testKey13.description);
					setInstruction("Press "+hardwareKeysTest.testKey18.description+" and "+ hardwareKeysTest.testKey13.description);
					setExpected("both the keys should be dispatched as "+ hardwareKeysTest.testKey13.description);
					EB.KeyCapture.remapKey(hardwareKeysTest.testKey18.string,hardwareKeysTest.testKey13.string);
				});

				runs(function()
				{		
					waitsFor(function() {
					return document.getElementById("actResult").innerHTML != "init";
					}, "Timed out waiting for tester to respond", 300000);
					runs(function() {
					expect("pass").toEqual(document.getElementById("actResult").innerHTML);
					EB.KeyCapture.remapKey(hardwareKeysTest.testKey18.string, null);
					});	
				});
			});

			it("VT289-041 | call remapKey with "+hardwareKeysTest.testKey11.description+" and null |", function() {

				runs(function()
				{
					setObjective("VT289-041 | call remapKey with "+hardwareKeysTest.testKey11.description+" and null |");
					setInstruction("Press "+hardwareKeysTest.testKey11.description+" and "+ hardwareKeysTest.testKey14.description);
					setExpected("both the keys should be dispatched as per their original value");
					EB.KeyCapture.remapKey(hardwareKeysTest.testKey11.string,hardwareKeysTest.testKey14.string);
					EB.KeyCapture.remapKey(hardwareKeysTest.testKey11.string, null);
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

			it("VT289-044 | call capturekey after remapKey |", function() {

				runs(function()
				{
					setObjective("VT289-044 | call capturekey after remapKey |");
					setInstruction("Press "+hardwareKeysTest.testKey11.description+" and "+ hardwareKeysTest.testKey13.description);
					setExpected("both the keys should be dispatched as " +hardwareKeysTest.testKey13.description+ " and capture callback should not fire after pressing keys");
					EB.KeyCapture.remapKey(hardwareKeysTest.testKey11.string,hardwareKeysTest.testKey13.string);
					EB.KeyCapture.captureKey(true,hardwareKeysTest.testKey11.string,capturekeycallback);					
				});

				runs(function()
				{		
					waitsFor(function() {
					return document.getElementById("actResult").innerHTML != "init";
					}, "Timed out waiting for tester to respond", 300000);
					runs(function() {
					expect("pass").toEqual(document.getElementById("actResult").innerHTML);
					EB.KeyCapture.remapKey(hardwareKeysTest.testKey11.string, null);
					EB.KeyCapture.captureKey(true,hardwareKeysTest.testKey11.string);
					});	
				});
			});

			it("VT289-045 | call capturekey after remapKey and callback to fire with both key |", function() {

				runs(function()
				{
					setObjective("VT289-045 | call capturekey after remapKey and callback to fire with both key |");
					setInstruction("Press "+hardwareKeysTest.testKey14.description+" and "+ hardwareKeysTest.testKey21.description);
					setExpected("both the keys should be dispatched as " +hardwareKeysTest.testKey21.description+ " and capture callback should fire after pressing both the keys");
					EB.KeyCapture.remapKey(hardwareKeysTest.testKey14.string,hardwareKeysTest.testKey21.string);
					EB.KeyCapture.captureKey(true,hardwareKeysTest.testKey21.string,capturekeycallback);					
				});

				runs(function()
				{		
					waitsFor(function() {
					return document.getElementById("actResult").innerHTML != "init";
					}, "Timed out waiting for tester to respond", 300000);
					runs(function() {
					expect("pass").toEqual(document.getElementById("actResult").innerHTML);
					EB.KeyCapture.remapKey(hardwareKeysTest.testKey14.string, null);
					EB.KeyCapture.captureKey(true,hardwareKeysTest.testKey21.string);
					});	
				});
			});

			it("VT289-046 | call remapKey after capturekey and callback to fire with both key |", function() {

				runs(function()
				{
					setObjective("VT289-046 | call remapKey after capturekey and callback to fire with both key|");
					setInstruction("Press "+hardwareKeysTest.testKey13.description+" and "+ hardwareKeysTest.testKey11.description);
					setExpected("both the keys should be dispatched as " +hardwareKeysTest.testKey13.description+ " and capture callback should fire after pressing both the keys");
					EB.KeyCapture.captureKey(true,hardwareKeysTest.testKey13.string,capturekeycallback);
					EB.KeyCapture.remapKey(hardwareKeysTest.testKey11.string,hardwareKeysTest.testKey13.string);
					
				});

				runs(function()
				{		
					waitsFor(function() {
					return document.getElementById("actResult").innerHTML != "init";
					}, "Timed out waiting for tester to respond", 300000);
					runs(function() {
					expect("pass").toEqual(document.getElementById("actResult").innerHTML);
					EB.KeyCapture.remapKey(hardwareKeysTest.testKey11.string, null);
					EB.KeyCapture.captureKey(true,hardwareKeysTest.testKey13.string);
					});	
				});
			});

		}
	});	
});	