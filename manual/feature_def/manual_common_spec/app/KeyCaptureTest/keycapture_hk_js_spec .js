describe("KeyCapture Test", function() {
	
	var keydata = '';

	var capturekeycallback = function (data){
			var keyval = data.keyValue
			callbackdata(keyval);
		}

	var triggercallback = function (data){
			var trigger = data.triggerFlag
			callbackdata(trigger);
	}

	beforeEach(function() {
		keydata ='';
		document.getElementById("actResult").innerHTML = "init";
		callbackdata(keydata);
	});

	afterEach(function() {
		/* ... Tear it down ... */
	});

	describe("homeKey Test", function() {
		it("VT289-001 | set homeKeyValue to enter key |", function() {

			runs(function()
			{
				setObjective("VT289-001 | set homeKeyValue to enter key");
				setInstruction("press the Enter key and check for application navigate");
				setExpected("Application should navigate to Homepage of application after Pressing the Enter Key");
				Rho.KeyCapture.homeKeyValue = '0x0D';
			});

			runs(function()
			{		
				waitsFor(function() {
				return document.getElementById("actResult").innerHTML != "init";
				}, "Timed out waiting for tester to respond", 300000);
				runs(function() {
				expect("pass").toEqual(document.getElementById("actResult").innerHTML);
				Rho.KeyCapture.homeKeyValue = 'Disabled';
				});	
			});

		});


		it("VT289-002 | set homeKeyValue to Disabled |", function() {

			runs(function()
			{
				setObjective("VT289-002 | set homeKeyValue to Disabled");
				setInstruction("press the Enter key and check for application navigate");
				setExpected("Application should not navigate to Homepage of application after Pressing the Enter Key");
				Rho.KeyCapture.homeKeyValue = '0x0D';
				Rho.KeyCapture.homeKeyValue = 'Disabled';
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

		it("VT289-003 | set homeKeyValue to Uparrow |", function() {

			runs(function()
			{
				setObjective("VT289-003 | set homeKeyValue to Uparrow");
				setInstruction("press the Uparrow and check for application navigat");
				setExpected("Application should navigate to Homepage of application after Pressing the Uparrow");
				Rho.KeyCapture.homeKeyValue = '0x26';
			});

			runs(function()
			{		
				waitsFor(function() {
				return document.getElementById("actResult").innerHTML != "init";
				}, "Timed out waiting for tester to respond", 300000);
				runs(function() {
				expect("pass").toEqual(document.getElementById("actResult").innerHTML);
				Rho.KeyCapture.homeKeyValue = 'Disabled';
				});	
			});

		});

		it("VT289-004 | set homeKeyValue to numeric key 1 |", function() {

			runs(function()
			{
				setObjective("VT289-004 | set homeKeyValue to numeric key 1");
				setInstruction("press the numeric key 1 and check for application navigat");
				setExpected("Application should navigate to Homepage of application after Pressing the numeric key 1");
				Rho.KeyCapture.homeKeyValue = '0x31';
			});

			runs(function()
			{		
				waitsFor(function() {
				return document.getElementById("actResult").innerHTML != "init";
				}, "Timed out waiting for tester to respond", 300000);
				runs(function() {
				expect("pass").toEqual(document.getElementById("actResult").innerHTML);
				Rho.KeyCapture.homeKeyValue = 'Disabled';
				});	
			});

		});

		it("VT289-004 | set homeKeyValue to alphabet key a |", function() {

			runs(function()
			{
				setObjective("VT289-004 | set homeKeyValue to alphabet key a");
				setInstruction("press the alphabet key a and check for application navigat");
				setExpected("Application should navigate to Homepage of application after Pressing the alphabet key a");
				Rho.KeyCapture.homeKeyValue = '0x65';
			});

			runs(function()
			{		
				waitsFor(function() {
				return document.getElementById("actResult").innerHTML != "init";
				}, "Timed out waiting for tester to respond", 300000);
				runs(function() {
				expect("pass").toEqual(document.getElementById("actResult").innerHTML);
				Rho.KeyCapture.homeKeyValue = 'Disabled';
				});	
			});

		});

		it("VT289-005 | set homeKeyValue to alphabet key C (caps) |", function() {

			runs(function()
			{
				setObjective("VT289-005 | set homeKeyValue to alphabet key C (caps)");
				setInstruction("press the alphabet key C (caps) and check for application navigat");
				setExpected("Application should navigate to Homepage of application after Pressing the alphabet key C (caps)");
				Rho.KeyCapture.homeKeyValue = '0x67';
			});

			runs(function()
			{		
				waitsFor(function() {
				return document.getElementById("actResult").innerHTML != "init";
				}, "Timed out waiting for tester to respond", 300000);
				runs(function() {
				expect("pass").toEqual(document.getElementById("actResult").innerHTML);
				Rho.KeyCapture.homeKeyValue = 'Disabled';
				});	
			});

		});

		it("VT289-006 | set homeKeyValue to symbol key # |", function() {

			runs(function()
			{
				setObjective("VT289-006 | set homeKeyValue to symbol key #");
				setInstruction("press the symbol key # and check for application navigat");
				setExpected("Application should navigate to Homepage of application after Pressing the alphabet key #");
				Rho.KeyCapture.homeKeyValue = '0x78';
			});

			runs(function()
			{		
				waitsFor(function() {
				return document.getElementById("actResult").innerHTML != "init";
				}, "Timed out waiting for tester to respond", 300000);
				runs(function() {
				expect("pass").toEqual(document.getElementById("actResult").innerHTML);
				Rho.KeyCapture.homeKeyValue = 'Disabled';
				});	
			});

		});

		it("VT289-007 | set homeKeyValue to trigger key |", function() {

			runs(function()
			{
				setObjective("VT289-007 | set homeKeyValue to trigger key");
				setInstruction("press the trigger key and check for application navigate");
				setExpected("Application should navigate to Homepage of application after Pressing the trigger key ");
				Rho.KeyCapture.homeKeyValue = 'todo';
			});

			runs(function()
			{		
				waitsFor(function() {
				return document.getElementById("actResult").innerHTML != "init";
				}, "Timed out waiting for tester to respond", 300000);
				runs(function() {
				expect("pass").toEqual(document.getElementById("actResult").innerHTML);
				Rho.KeyCapture.homeKeyValue = 'Disabled';
				});	
			});

		});


		it("VT289-008 | set homeKeyValue to null |", function() {

			runs(function()
			{
				setObjective("VT289-008 | set homeKeyValue to null");
				setInstruction("press enter key and check for application navigate");
				setExpected("Application should navigate to Homepage of application after Pressing the trigger key ");
				Rho.KeyCapture.homeKeyValue = '0x0D';
				Rho.KeyCapture.homeKeyValue = '';
			});

			runs(function()
			{		
				waitsFor(function() {
				return document.getElementById("actResult").innerHTML != "init";
				}, "Timed out waiting for tester to respond", 300000);
				runs(function() {
				expect("pass").toEqual(document.getElementById("actResult").innerHTML);
				Rho.KeyCapture.homeKeyValue = 'Disabled';
				});	
			});

		});

		it("VT289-009 | set homeKeyValue to 1 and then 2|", function() {

			runs(function()
			{
				setObjective("VT289-008 | set homeKeyValue to 1 and 2");
				setInstruction("press 1 and 2 key and check for application navigate");
				setExpected("Application should navigate to Homepage of application after Pressing the numeric key 1 and 2 ");
				Rho.KeyCapture.homeKeyValue = '0x31';
				Rho.KeyCapture.homeKeyValue = '0x32';
			});

			runs(function()
			{		
				waitsFor(function() {
				return document.getElementById("actResult").innerHTML != "init";
				}, "Timed out waiting for tester to respond", 300000);
				runs(function() {
				expect("pass").toEqual(document.getElementById("actResult").innerHTML);
				Rho.KeyCapture.homeKeyValue = 'Disabled';
				});	
			});

		});

		it("VT289-033 | call captureKey after setting homeKeyValue|", function() {

			runs(function()
			{
				setObjective("VT289-033 | call captureKey after setting homeKeyValue");
				setInstruction("Click inside Textbox, Press enterkey");
				setExpected("Application should navigate to Homepage of application after Pressing enter key, the capture callback will not fire. ");
				Rho.KeyCapture.homeKeyValue = '0x0D';
				Rho.KeyCapture.captureKey(true,'0x0D',capturekeycallback);
			});

			runs(function()
			{		
				waitsFor(function() {
				return document.getElementById("actResult").innerHTML != "init";
				}, "Timed out waiting for tester to respond", 300000);
				runs(function() {
				expect("pass").toEqual(document.getElementById("actResult").innerHTML);
				Rho.KeyCapture.homeKeyValue = 'Disabled';
				Rho.KeyCapture.captureKey(true,'0x0D');
				});	
			});

		});

		it("VT289-034 | call captureTrigger after setting homeKeyValue |", function() {

			runs(function()
			{
				setObjective("VT289-034 | call captureTrigger after setting homeKeyValue ");
				setInstruction("Press triger");
				setExpected("Application should navigate to Homepage of application after Pressing trigger key, the trigger callback will not fire. ");
				Rho.KeyCapture.homeKeyValue = 'todo';
				Rho.KeyCapture.captureKey(true,'todo',triggercallback);
			});

			runs(function()
			{		
				waitsFor(function() {
				return document.getElementById("actResult").innerHTML != "init";
				}, "Timed out waiting for tester to respond", 300000);
				runs(function() {
				expect("pass").toEqual(document.getElementById("actResult").innerHTML);
				Rho.KeyCapture.homeKeyValue = 'Disabled';
				Rho.KeyCapture.captureKey(true,'todo');
				});	
			});

		});

		it("VT289-042 | call remapKey after setting homeKeyValue |", function() {

			runs(function()
			{
				setObjective("VT289-042 | call remapKey after setting homeKeyValue ");
				setInstruction("click inside the textbox, Press numeric key 3 and 4");
				setExpected("4 should be displayed after pressing 3 and 4,, Application will not navigate to Homepage ");
				Rho.KeyCapture.homeKeyValue = '0x33';
				Rho.KeyCapture.remapKey('0x33','0x34');
			});

			runs(function()
			{		
				waitsFor(function() {
				return document.getElementById("actResult").innerHTML != "init";
				}, "Timed out waiting for tester to respond", 300000);
				runs(function() {
				expect("pass").toEqual(document.getElementById("actResult").innerHTML);
				Rho.KeyCapture.homeKeyValue = 'Disabled';
				Rho.KeyCapture.remapKey('0x33','');
				});	
			});

		});
		it("VT289-043 | call remapKey after setting homeKeyValue and navigate to homepage |", function() {

			runs(function()
			{
				setObjective("VT289-043 | call remapKey after setting homeKeyValue and navigate to homepage ");
				setInstruction("click inside the textbox, Press numeric key 7, check for the navigation, comeback to application and press numeric key 6");
				setExpected("Application should navigate to homepage after pressing key 7 and 6 both");
				Rho.KeyCapture.homeKeyValue = '0x36';
				Rho.KeyCapture.remapKey('0x37','0x36');
			});

			runs(function()
			{		
				waitsFor(function() {
				return document.getElementById("actResult").innerHTML != "init";
				}, "Timed out waiting for tester to respond", 300000);
				runs(function() {
				expect("pass").toEqual(document.getElementById("actResult").innerHTML);
				Rho.KeyCapture.homeKeyValue = 'Disabled';
				Rho.KeyCapture.remapKey('0x33','');
				});	
			});

		});

	});	
});	