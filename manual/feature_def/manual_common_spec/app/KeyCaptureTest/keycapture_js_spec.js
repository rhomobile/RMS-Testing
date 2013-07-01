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

		it("VT289-011 | call captureKey with dispatch true, keyValue for 1 and function callback |", function() {

			runs(function()
			{
				setObjective("VT289-011 | call captureKey with dispatch true, keyValue for 1 and function callback");
				setInstruction("Click inside Textbox and Press numeric key 1");
				setExpected("Callback should fire with value 0x31 and number 1 should be displayed inside the textbox");
				Rho.KeyCapture.captureKey(true,'0x31',capturekeycallback);
			});

			runs(function()
			{		
				waitsFor(function() {
				return document.getElementById("actResult").innerHTML != "init";
				}, "Timed out waiting for tester to respond", 300000);
				runs(function() {
				expect("pass").toEqual(document.getElementById("actResult").innerHTML);
				Rho.KeyCapture.captureKey(true,'0x31');
				});	
			});

		});


		it("VT289-012 | call captureKey with dispatch false, keyValue for 1 and function callback |", function() {

			runs(function()
			{
				setObjective("VT289-012 | call captureKey with dispatch false, keyValue for 1 and function callback");
				setInstruction("Click inside Textbox and Press numeric key 1");
				setExpected("Callback should fire with value 0x31 and number 1 should not be displayed inside the textbox");
				Rho.KeyCapture.captureKey(false,'0x31',capturekeycallback);
			});

			runs(function()
			{		
				waitsFor(function() {
				return document.getElementById("actResult").innerHTML != "init";
				}, "Timed out waiting for tester to respond", 300000);
				runs(function() {
				expect("pass").toEqual(document.getElementById("actResult").innerHTML);
				Rho.KeyCapture.captureKey(true,'0x31');
				});	
			});

		});

		it("VT289-013 | call captureKey with dispatch true, keyValue for 'a' and no callback(Sync) |", function() {

			runs(function()
			{
				setObjective("VT289-013 | call captureKey with dispatch true, keyValue for 'a' and no callback(Sync)");
				setInstruction("Click inside Textbox and Press Alpha key a");
				setExpected("Callback should fire with value 0x65 and alphabet a should be displayed inside the textbox");
				var keyval1 = Rho.KeyCapture.captureKey(true,'0x65');
				callbackdata(keyval1);
			});

			runs(function()
			{		
				waitsFor(function() {
				return document.getElementById("actResult").innerHTML != "init";
				}, "Timed out waiting for tester to respond", 300000);
				runs(function() {
				expect("pass").toEqual(document.getElementById("actResult").innerHTML);
				Rho.KeyCapture.captureKey(true,'0x65');
				});	
			});

		});

		it("VT289-014 | call captureKey with dispatch true, keyValue for 'B' and callback as Anynomous function |", function() {

			runs(function()
			{
				setObjective("VT289-014 | call captureKey with dispatch true, keyValue for 'B' and callback as Anynomous function");
				setInstruction("Click inside Textbox and Press Alpha key B");
				setExpected("Callback should fire with value 0x65 check for Callback to fire with value and alphabet B should be displayed inside the textbox");
				Rho.KeyCapture.captureKey(true,'0x66',function(data){callbackdata(data.keyValue);});
			});

			runs(function()
			{		
				waitsFor(function() {
				return document.getElementById("actResult").innerHTML != "init";
				}, "Timed out waiting for tester to respond", 300000);
				runs(function() {
				expect("pass").toEqual(document.getElementById("actResult").innerHTML);
				Rho.KeyCapture.captureKey(true,'0x66');
				});	
			});

		});

		it("VT289-015 | call captureKey with dispatch false, keyValue for 2 and press numeric key 1 |", function() {

			runs(function()
			{
				setObjective("VT289-015 | call captureKey with dispatch false, keyValue for 2 and press numeric key 1");
				setInstruction("Click inside Textbox and Press key 1");
				setExpected("Callback should fire and alphabet 1 should be displayed inside the textbox");
				Rho.KeyCapture.captureKey(false,'0x32',capturekeycallback);
			});

			runs(function()
			{		
				waitsFor(function() {
				return document.getElementById("actResult").innerHTML != "init";
				}, "Timed out waiting for tester to respond", 300000);
				runs(function() {
				expect("pass").toEqual(document.getElementById("actResult").innerHTML);
				Rho.KeyCapture.captureKey(true,'0x32');
				});	
			});

		});

		it("VT289-016 | call captureKey with dispatch True, keyValue ALL and callback |", function() {

			runs(function()
			{
				setObjective("VT289-016 | call captureKey with dispatch True, keyValue ALL and callback");
				setInstruction("click inside textbox and Press numeric key 1, Press alphabet a, Press Symbols #");
				setExpected("Callback should fire with retrun key values 0x31, 0x65 and 0x78 (for #) and all pressed keys should be displayed inside the textbox");
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

		it("VT289-017 | call captureKey with dispatch false and true for 2 different key and diff callback function |", function() {

			runs(function()
			{
				setObjective("VT289-017 | call captureKey with dispatch false and true for 2 different key and diff callback function");
				setInstruction("click inside textbox and Press numeric key 1, Press alphabet a, Press Symbols #");
				setExpected("Callback1 should fire after pressing alphabet a (0x65),Symbol # (0x78) and keyValue 1(0x31), Callback2 should not fire after pressing 1 \n and only numeric key 1 only should be displayed inside box");
				Rho.KeyCapture.captureKey(false,'ALL',capturekeycallback);
				Rho.KeyCapture.captureKey(true,'0x31',capturekeycallback2);
			});

			runs(function()
			{		
				waitsFor(function() {
				return document.getElementById("actResult").innerHTML != "init";
				}, "Timed out waiting for tester to respond", 300000);
				runs(function() {
				expect("pass").toEqual(document.getElementById("actResult").innerHTML);
				Rho.KeyCapture.captureKey(true,'ALL');
				Rho.KeyCapture.captureKey(true,'0x31');
				});	
			});

		});


		it("VT289-018 | call captureKey with keyValue enter and ALL and different callback function |", function() {

			runs(function()
			{
				setObjective("VT289-018 | call captureKey with keyValue enter and ALL and different callback function");
				setInstruction("click inside textbox and Press enterkey, Press numeric key 9 and press alphabet b");
				setExpected("Callback2 should fire after pressing alphabet b (0x66),number 9 (0x39) and enter (0x0D), Callback1 should not fire after pressing enter button \n and alphabet 'b' and number 9 should not be displayed inside box, enter should come inside textbox");
				Rho.KeyCapture.captureKey(true,'0x0D',capturekeycallback);
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
				Rho.KeyCapture.captureKey(true,'0x0D');
				});	
			});

		});


		it("VT289-019 | call captureKey twice with keyvalue ALL and keyValue 1 with different dispatch value |", function() {

			runs(function()
			{
				setObjective("VT289-019 | call captureKey twice with keyvalue ALL and keyValue 1 with different dispatch value");
				setInstruction("click inside textbox and Press alphabet z, Press numeric key 1");
				setExpected("Callback1 only should fire after pressing alphabet z, and numeric key 1, Callback2 should not fire after pressing number 1 \n and z should appear inside textbox and number 1 should not come inside textbox");
				Rho.KeyCapture.captureKey(true,'ALL',function(data){callbackdata(data.keyValue);});
				Rho.KeyCapture.captureKey(false,'0x31',function(data){callbackdata2(data.keyValue);});
			});

			runs(function()
			{		
				waitsFor(function() {
				return document.getElementById("actResult").innerHTML != "init";
				}, "Timed out waiting for tester to respond", 300000);
				runs(function() {
				expect("pass").toEqual(document.getElementById("actResult").innerHTML);
				Rho.KeyCapture.captureKey(true,'ALL');
				Rho.KeyCapture.captureKey(true,'0x31');
				});	
			});

		});

		it("VT289-020 | call captureKey with different callback for 2 different keys |", function() {

			runs(function()
			{
				setObjective("VT289-020 | call captureKey with different callback for 2 different keys");
				setInstruction("click inside textbox and Press number 1, Press numeric key 2");
				setExpected("2 different Callback should fire after pressing numeric key 1 and numeric key 2 \n and numeric key 1 should be displayed inside box and 2 should not");
				Rho.KeyCapture.captureKey(true,'0x32',capturekeycallback);
				Rho.KeyCapture.captureKey(false,'0x31',capturekeycallback2);
			});

			runs(function()
			{		
				waitsFor(function() {
				return document.getElementById("actResult").innerHTML != "init";
				}, "Timed out waiting for tester to respond", 300000);
				runs(function() {
				expect("pass").toEqual(document.getElementById("actResult").innerHTML);
				Rho.KeyCapture.captureKey(true,'0x32');
				Rho.KeyCapture.captureKey(true,'0x31');
				});	
			});

		});

		it("VT289-021 | call captureKey twice, one with callback and other without callback |", function() {

			runs(function()
			{
				setObjective("VT289-021| call captureKey twice, one with callback and other without callback");
				setInstruction("click inside textbox and Press number 1, Press numeric key 3");
				setExpected("callback1 should fire after pressing key 1 and no callback should fire after pressing key 3 \n and key3 and key2 both should be displayed inside the textbox");
				Rho.KeyCapture.captureKey(true,'0x32',capturekeycallback);
				Rho.KeyCapture.captureKey(true,'0x33');
			});

			runs(function()
			{		
				waitsFor(function() {
				return document.getElementById("actResult").innerHTML != "init";
				}, "Timed out waiting for tester to respond", 300000);
				runs(function() {
				expect("pass").toEqual(document.getElementById("actResult").innerHTML);
				Rho.KeyCapture.captureKey(true,'0x32');
				});	
			});

		});

		it("VT289-022 | call captureKey twice, one with callback and other without callback for keyValue ALL |", function() {

			runs(function()
			{
				setObjective("VT289-022 | call captureKey twice, one with callback and other without callback for keyValue ALL");
				setInstruction("click inside textbox and Press number 2, Press numeric key 5, press alphabet c ");
				setExpected("callback should not fire after pressing any key including key 1 \n and allkeys should not be displayed inside the textbox");
				Rho.KeyCapture.captureKey(true,'0x32',function(data){callbackdata(data.keyValue);});
				Rho.KeyCapture.captureKey(false,'ALL');
			});

			runs(function()
			{		
				waitsFor(function() {
				return document.getElementById("actResult").innerHTML != "init";
				}, "Timed out waiting for tester to respond", 300000);
				runs(function() {
				expect("pass").toEqual(document.getElementById("actResult").innerHTML);
				Rho.KeyCapture.captureKey(true,'0x32');
				});	
			});

		});

		it("VT289-022 | call captureKey twice, one with callback and other without callback for keyValue ALL |", function() {

			runs(function()
			{
				setObjective("VT289-022 | call captureKey twice, one with callback and other without callback for keyValue ALL");
				setInstruction("click inside textbox and Press number 2, Press numeric key 5, press alphabet c ");
				setExpected("callback should not fire after pressing any key including key 1 \n and allkeys should not be displayed inside the textbox");
				Rho.KeyCapture.captureKey(true,'0x32',capturekeycallback);
				Rho.KeyCapture.captureKey(false,'ALL');
			});

			runs(function()
			{		
				waitsFor(function() {
				return document.getElementById("actResult").innerHTML != "init";
				}, "Timed out waiting for tester to respond", 300000);
				runs(function() {
				expect("pass").toEqual(document.getElementById("actResult").innerHTML);
				Rho.KeyCapture.captureKey(true,'0x32');
				Rho.KeyCapture.captureKey(true,'ALL');
				});	
			});

		});

		it("VT289-023 | call captureKey to check the keyvalues of all numeric key |", function() {

			runs(function()
			{
				setObjective("VT289-023 | call captureKey to check the keyvalues of all numeric key");
				setInstruction("click inside textbox and Press all the numeric key one by one ");
				setExpected("Callback should fire and different keyvalue should come for all the numeric keys");
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

		it("VT289-030 | call captureKey with no callback |", function() {

			runs(function()
			{
				setObjective("VT289-030 | call captureKey with no callback");
				setInstruction("Click inside Textbox and Press key 1 and a from Hardware key, Press key 2 and b from soft key");
				setExpected("No callback should fire after pressing any hardware and soft  key, all keys should be displayed inside textbox after pressing any key");
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

		it("VT289-031 | call captureKey with no callback after setting key 1 |", function() {

			runs(function()
			{
				setObjective("VT289-031 | call captureKey with no callback after setting key 1");
				setInstruction("Click inside Textbox and Press key 1");
				setExpected("No callback should fire after pressing numeric key1, Numeric key 1 should be displayed inside text box");
				Rho.KeyCapture.captureKey(false,'0x31',capturekeycallback);
				Rho.KeyCapture.captureKey(true,'0x31');
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

		it("VT289-032 | call captureKey with callback and use SIP keys |", function() {

			runs(function()
			{
				setObjective("VT289-032 | call captureKey with callback and use SIP keys");
				setInstruction("Click inside Textbox, show the SIP and Press all numeric key, Alphabet and Symbols through SIP");
				setExpected("Callback should fire and different keyvalue should come for all the keys and all the keys should displayed inside textbox also, the value of hardware key and soft key should be same. ");
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
					Rho.KeyCapture.captureTrigger(function(data){callbackdata(data.keyValue);});
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

		it("VT289-039 | call remapKey with enter and numeric key 1 |", function() {

			runs(function()
			{
				setObjective("VT289-039 | call remapKey with enter and numeric key 1");
				setInstruction("click inside the textbox, Press enter key and press numeric key 1");
				setExpected("Both key should be displayed as 1");
				Rho.KeyCapture.remapKey('0x0D','0x31');
			});

			runs(function()
			{		
				waitsFor(function() {
				return document.getElementById("actResult").innerHTML != "init";
				}, "Timed out waiting for tester to respond", 300000);
				runs(function() {
				expect("pass").toEqual(document.getElementById("actResult").innerHTML);
				Rho.KeyCapture.remapKey('0x0D','');
				});	
			});
		});

		it("VT289-040 | call remapKey with functionkey F1 and numeric key 9 |", function() {

			runs(function()
			{
				setObjective("VT289-040 | call remapKey with functionkey F1 and numeric key 9");
				setInstruction("click inside the textbox, Press functionkey F1 and numeric key 9");
				setExpected("Both key should be displayed as 9");
				Rho.KeyCapture.remapKey('0x70','0x39');
			});

			runs(function()
			{		
				waitsFor(function() {
				return document.getElementById("actResult").innerHTML != "init";
				}, "Timed out waiting for tester to respond", 300000);
				runs(function() {
				expect("pass").toEqual(document.getElementById("actResult").innerHTML);
				Rho.KeyCapture.remapKey('0x70','');
				});	
			});
		});

		it("VT289-041 | call remapKey with numeric key 5 and null |", function() {

			runs(function()
			{
				setObjective("VT289-041 | call remapKey with numeric key 5 and null");
				setInstruction("click inside the textbox, .Press numeric key 5 and 2");
				setExpected("5 should be displayed after pressing 5 and 2 should be displayed after pressing 2, No Remap");
				Rho.KeyCapture.remapKey('0x35','0x32');
				Rho.KeyCapture.remapKey('0x35');
			});

			runs(function()
			{		
				waitsFor(function() {
				return document.getElementById("actResult").innerHTML != "init";
				}, "Timed out waiting for tester to respond", 300000);
				runs(function() {
				expect("pass").toEqual(document.getElementById("actResult").innerHTML);
				//Rho.KeyCapture.remapKey('0x70','');
				});	
			});
		});

		it("VT289-044 | call capturekey after remapKey |", function() {

			runs(function()
			{
				setObjective("VT289-044 | call capturekey after remapKey ");
				setInstruction("click inside the textbox, .Press numeric key a and b");
				setExpected("Callback should not fire after pressing key a, Both key should be displayed as b after pressing a and b");
				Rho.KeyCapture.remapKey('0x65','0x66');
				Rho.KeyCapture.captureKey(true,'0x65',capturekeycallback);
			});

			runs(function()
			{		
				waitsFor(function() {
				return document.getElementById("actResult").innerHTML != "init";
				}, "Timed out waiting for tester to respond", 300000);
				runs(function() {
				expect("pass").toEqual(document.getElementById("actResult").innerHTML);
				Rho.KeyCapture.remapKey('0x65');
				Rho.KeyCapture.captureKey(true,'0x65');
				});	
			});
		});

		it("VT289-045 | call capturekey after remapKey and callback to fire |", function() {

			runs(function()
			{
				setObjective("VT289-045 | call capturekey after remapKey and callback to fire");
				setInstruction("click inside the textbox,Press numeric key y and z");
				setExpected("Callback should fire after pressing key z and y, Both key should be displayed as y after pressing z and y");
				Rho.KeyCapture.remapKey('0x91','0x90');
				Rho.KeyCapture.captureKey(true,'0x90',capturekeycallback);
			});

			runs(function()
			{		
				waitsFor(function() {
				return document.getElementById("actResult").innerHTML != "init";
				}, "Timed out waiting for tester to respond", 300000);
				runs(function() {
				expect("pass").toEqual(document.getElementById("actResult").innerHTML);
				Rho.KeyCapture.remapKey('0x65');
				Rho.KeyCapture.captureKey(true,'0x65');
				});	
			});
		});

		it("VT289-046 | call remapKey after capturekey and callback to fire |", function() {

			runs(function()
			{
				setObjective("VT289-046 | call remapKey after capturekey and callback to fire");
				setInstruction("click inside the textbox, Press numeric key y and z");
				setExpected("Callback should fire after pressing key * and #, Both key should be displayed as # after pressing * and #");
				Rho.KeyCapture.captureKey(true,'0x78',capturekeycallback);
				Rho.KeyCapture.remapKey('0x77','0x78');
			});

			runs(function()
			{		
				waitsFor(function() {
				return document.getElementById("actResult").innerHTML != "init";
				}, "Timed out waiting for tester to respond", 300000);
				runs(function() {
				expect("pass").toEqual(document.getElementById("actResult").innerHTML);
				Rho.KeyCapture.remapKey('0x65');
				Rho.KeyCapture.captureKey(true,'0x65');
				});	
			});
		});

	});	
});	