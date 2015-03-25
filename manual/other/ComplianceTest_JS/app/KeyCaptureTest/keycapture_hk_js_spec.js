describe("KeyCapture Test", function() {

	describe("homeKey Test", function() {

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

		if (isWindowsMobilePlatform())
		{

			it("VT200-0348 | set homeKeyValue to enter key |", function() {

				runs(function()
				{
					setObjective("VT200-0348 | set homeKeyValue to enter key");
					setInstruction("Press the Enter key and check for application navigate");
					setExpected("Application should navigate to Homepage of application after Pressing the Enter Key");
					Rho.KeyCapture.homeKeyValue = '13';
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

			it("VT200-0349 | set homeKeyValue to Disabled |", function() {

				runs(function()
				{
					setObjective("VT200-0349 | set homeKeyValue to Disabled");
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

			it("VT200-0350 | set homeKeyValue to 1 and then 2|", function() {

				runs(function()
				{
					setObjective("VT200-0350 | set homeKeyValue to 1 and 2");
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
		}
	});	
});	