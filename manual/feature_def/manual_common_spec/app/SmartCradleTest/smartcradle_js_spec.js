describe("SmartCradle Manual Tests", function() {
	
	describe("Unlocking the Cradle with LED parameter values that are in range", function() {

		beforeEach(function() {
			document.getElementById("actResult").innerHTML = "init";
			startTestTimer();
		});

		afterEach(function() {
			stopTestTimer();
			//  Tear it down
		});

		///////////////////////////////////////////////////////////////////////
		//  Cradle Unlock Positive Tests
		///////////////////////////////////////////////////////////////////////
		it("is able to unlock the cradle for 10 seconds without LED illumination", function() {

			runs(function()
			{
				setObjective("able to unlock the cradle for 10 seconds without LED illumination");
				setInstruction("Observe whether or not the cradle is unlocked (try removing the device).  Observe the cradle LED state");
				setExpected("Cradle should remain unlocked for 10 seconds and then re-engage.  LEDs should not be illuminated");
				Rho.SmartCradle.unlock(0, 0, 10);
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

		it("is able to unlock the cradle for 10 seconds with constant LED illumination", function() {

			runs(function()
			{
				setObjective("able to unlock the cradle for 10 seconds without LED illumination");
				setInstruction("Observe whether or not the cradle is unlocked (try removing the device).  Observe the cradle LED state");
				setExpected("Cradle should remain unlocked for 10 seconds and then re-engage.  LEDs should be illuminated");
				Rho.SmartCradle.unlock(1, 0, 10);
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
		
		it("is able to unlock the cradle for 10 seconds with slowly flashing LEDs", function() {

			runs(function()
			{
				setObjective("able to unlock the cradle for 10 seconds without LED illumination");
				setInstruction("Observe whether or not the cradle is unlocked (try removing the device).  Observe the cradle LED state");
				setExpected("Cradle should remain unlocked for 10 seconds and then re-engage.  LEDs state should transition every 2 seconds");
				Rho.SmartCradle.unlock(2000, 2000, 10);
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
		
		it("is able to unlock the cradle for 10 seconds with quickly flashing LEDs", function() {

			runs(function()
			{
				setObjective("able to unlock the cradle for 10 seconds without LED illumination");
				setInstruction("Observe whether or not the cradle is unlocked (try removing the device).  Observe the cradle LED state");
				setExpected("Cradle should remain unlocked for 10 seconds and then re-engage.  LEDs state should transition every 500 milliseconds");
				Rho.SmartCradle.unlock(500, 500, 10);
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
	});	
	
	
	describe("Unlocking the Cradle with the timeout parameter in range", function() {

		beforeEach(function() {
			document.getElementById("actResult").innerHTML = "init";
			startTestTimer();
		});

		afterEach(function() {
			stopTestTimer();
			//  Tear it down
		});

		///////////////////////////////////////////////////////////////////////
		//  Cradle Unlock Positive Tests
		///////////////////////////////////////////////////////////////////////
		it("is able to unlock the cradle for 15 seconds without LED illumination", function() {

			runs(function()
			{
				setObjective("able to unlock the cradle for 15 seconds with LED illumination");
				setInstruction("Observe whether or not the cradle is unlocked (try removing the device).  Observe the cradle LED state");
				setExpected("Cradle should remain unlocked for 15 seconds and then re-engage.  LEDs should be illuminated");
				Rho.SmartCradle.unlock(1, 0, 15);
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

		it("is able to unlock the cradle for 30 seconds with constant LED illumination", function() {

			runs(function()
			{
				setObjective("able to unlock the cradle for 30 seconds with LED illumination");
				setInstruction("Observe whether or not the cradle is unlocked (try removing the device).  Observe the cradle LED state");
				setExpected("Cradle should remain unlocked for 30 seconds and then re-engage.  LEDs should be illuminated");
				Rho.SmartCradle.unlock(1, 0, 30);
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
		
	});		
	
	
	describe("Unlocking the Cradle with LED parameter values that are out of range", function() {

		beforeEach(function() {
			document.getElementById("actResult").innerHTML = "init";
			startTestTimer();
		});

		afterEach(function() {
			stopTestTimer();
			//  Tear it down
		});

		it("is able to unlock the cradle for 10 seconds despite invalid LED values", function() {

			runs(function()
			{
				setObjective("able to unlock the cradle for 10 seconds despite invalid LED values");
				setInstruction("Observe whether or not the cradle is unlocked (try removing the device).  Observe the cradle LED state");
				setExpected("Cradle should remain unlocked for 10 seconds and then re-engage.  LED state does not affect test outcome (LEDs will take on previously set state)");
				Rho.SmartCradle.unlock(70000, -1, 10);
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

		it("is able to unlock the cradle for 10 seconds despite invalid LED values", function() {

			runs(function()
			{
				setObjective("able to unlock the cradle for 10 seconds despite invalid LED values");
				setInstruction("Observe whether or not the cradle is unlocked (try removing the device).  Observe the cradle LED state");
				setExpected("Cradle should remain unlocked for 10 seconds and then re-engage.  LED state does not affect test outcome (LEDs will take on previously set state)");
				Rho.SmartCradle.unlock(-1, 70000, 10);
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
	});	
	

	describe("Unlocking the Cradle with the timeout parameter out of range", function() {

		beforeEach(function() {
			document.getElementById("actResult").innerHTML = "init";
			startTestTimer();
		});

		afterEach(function() {
			stopTestTimer();
			//  Tear it down
		});

		it("is not able to unlock the cradle for 45 seconds", function() {

			runs(function()
			{
				setObjective("not able to unlock the cradle for 45 seconds");
				setInstruction("Observe whether or not the cradle is unlocked (try removing the device).");
				setExpected("Cradle should not unlock");
				Rho.SmartCradle.unlock(1, 0, 45);
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
		
		it("is not able to unlock the cradle for -1 seconds", function() {

			runs(function()
			{
				setObjective("not able to unlock the cradle for -1 seconds");
				setInstruction("Observe whether or not the cradle is unlocked (try removing the device).");
				setExpected("Cradle should not unlock");
				Rho.SmartCradle.unlock(1, 0, -1);
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
	});	

});	