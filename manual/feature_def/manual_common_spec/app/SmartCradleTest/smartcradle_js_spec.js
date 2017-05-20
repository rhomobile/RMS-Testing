var testResult = '';
var captured = false;
describe("SmartCradle Manual Tests", function() {
if(Rho.System.platform == "WINDOWS"){	
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
	
	describe("Unlocking the Cradle with setting wallId rowId and columnId", function() {

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
		it("is able to unlock the cradle for 15 seconds with setting wallId to 1 rowId to 2 and columnId to 3", function() {

			runs(function()
			{
				setObjective("able to unlock the cradle for 15 seconds with LED illumination");
				setInstruction("Observe whether or not the cradle is unlocked (try removing the device).  Observe the cradle LED state");
				setExpected("Cradle should remain unlocked for 15 seconds and then re-engage.  LEDs should be illuminated");
				Rho.SmartCradle.columnId = 3;
				Rho.SmartCradle.wallId = 1;
				Rho.SmartCradle.rowId = 2;
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

		it("is able to unlock the cradle for 10 seconds with setting wallId to 2 rowId to 1 and columnId to 4", function() {

			runs(function()
			{
				setObjective("able to unlock the cradle for 10 seconds with LED illumination");
				setInstruction("Observe whether or not the cradle is unlocked (try removing the device).  Observe the cradle LED state");
				setExpected("Cradle should remain unlocked for 10 seconds and then re-engage.  LEDs should be illuminated");
				Rho.SmartCradle.columnId = 4;
				Rho.SmartCradle.wallId = 2;
				Rho.SmartCradle.rowId = 1;
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
}
	///////////////////////////////////////////////////////////////////////
		//  Cradle unlockEx Tests
    ///////////////////////////////////////////////////////////////////////
if(Rho.System.platform == "ANDROID"){
describe("Unlocking the Cradle using unlockEx method with LED parameter values that are in range", function() {

		beforeEach(function() {
			document.getElementById("actResult").innerHTML = "init";
			startTestTimer();
		});

		afterEach(function() {
			stopTestTimer();
			//  Tear it down
		});

		///////////////////////////////////////////////////////////////////////
		//  Cradle unlockEx Positive Tests
		///////////////////////////////////////////////////////////////////////
		it("is able to unlockEx the cradle for 10 seconds without LED illumination", function() {

			runs(function()
			{
				setObjective("able to unlockEx the cradle for 10 seconds without LED illumination");
				setInstruction("Observe whether or not the cradle is unlocked (try removing the device).  Observe the cradle LED state");
				setExpected("Cradle should remain unlocked for 10 seconds and then re-engage.  LEDs should not be illuminated");
				Rho.SmartCradle.unlockEx(0, 0, 10, true);
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

		it("is able to unlockEx the cradle for 10 seconds with constant LED illumination", function() {

			runs(function()
			{
				setObjective("able to unlockEx the cradle for 10 seconds without LED illumination");
				setInstruction("Observe whether or not the cradle is unlocked (try removing the device).  Observe the cradle LED state");
				setExpected("Cradle should remain unlocked for 10 seconds and then re-engage.  LEDs should be illuminated");
				Rho.SmartCradle.unlockEx(1, 0, 10, true);
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
		
		it("is able to unlockEx the cradle for 10 seconds with slowly flashing LEDs", function() {

			runs(function()
			{
				setObjective("able to unlockEx the cradle for 10 seconds without LED illumination");
				setInstruction("Observe whether or not the cradle is unlocked (try removing the device).  Observe the cradle LED state");
				setExpected("Cradle should remain unlocked for 10 seconds and then re-engage.  LEDs state should transition every 2 seconds");
				Rho.SmartCradle.unlockEx(2000, 2000, 10, false);
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
		
		it("is able to unlockEx the cradle for 10 seconds with quickly flashing LEDs", function() {

			runs(function()
			{
				setObjective("able to unlockEx the cradle for 10 seconds without LED illumination");
				setInstruction("Observe whether or not the cradle is unlocked (try removing the device).  Observe the cradle LED state");
				setExpected("Cradle should remain unlocked for 10 seconds and then re-engage.  LEDs state should transition every 500 milliseconds");
				Rho.SmartCradle.unlockEx(500, 500, 10, true);
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
	
	
	describe("Unlocking the Cradle using unlockEx method with the timeout parameter in range", function() {

		beforeEach(function() {
			document.getElementById("actResult").innerHTML = "init";
			startTestTimer();
		});

		afterEach(function() {
			stopTestTimer();
			//  Tear it down
		});

		///////////////////////////////////////////////////////////////////////
		//  Cradle unlockEx Positive Tests
		///////////////////////////////////////////////////////////////////////
		it("is able to unlockEx the cradle for 15 seconds without LED illumination", function() {

			runs(function()
			{
				setObjective("able to unlockEx the cradle for 15 seconds with LED illumination");
				setInstruction("Observe whether or not the cradle is unlocked (try removing the device).  Observe the cradle LED state");
				setExpected("Cradle should remain unlocked for 15 seconds and then re-engage.  LEDs should be illuminated");
				Rho.SmartCradle.unlockEx(1, 0, 15, true);
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

		it("is able to unlockEx the cradle for 30 seconds with constant LED illumination", function() {

			runs(function()
			{
				setObjective("able to unlockEx the cradle for 30 seconds with LED illumination");
				setInstruction("Observe whether or not the cradle is unlocked (try removing the device).  Observe the cradle LED state");
				setExpected("Cradle should remain unlocked for 30 seconds and then re-engage.  LEDs should be illuminated");
				Rho.SmartCradle.unlockEx(1, 0, 30, false);
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

	describe("Unlocking Cradle using unlockEx method with the smoothingEffect parameter valid value", function() {

		beforeEach(function() {
			document.getElementById("actResult").innerHTML = "init";
			startTestTimer();
		});

		afterEach(function() {
			stopTestTimer();
			//  Tear it down
		});

		///////////////////////////////////////////////////////////////////////
		//  Cradle unlockEx Positive Tests
		///////////////////////////////////////////////////////////////////////
		it("is able to unlockEx the cradle for 15 seconds with the smoothingEffect set to true", function() {

			runs(function()
			{
				setObjective("able to unlockEx with smooth effect");
				setInstruction("Listen to device unlock sound it should come out of cradle smoothly whether or not the cradle is unlocked (try removing the device)");
				setExpected("Device should get unlocked smoothly");
				Rho.SmartCradle.unlockEx(0, 0, 15, true);
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

		it("is able to unlockEx the cradle for 15 seconds with the smoothingEffect set to false", function() {

			runs(function()
			{
				setObjective("able to unlockEx without smooth effect");
				setInstruction("Listen to device unlock sound it should not come out of cradle smoothly unlock sound should be heard clearly whether or not the cradle is unlocked (try removing the device)");
				setExpected("Device should get unlocked smoothly");
				Rho.SmartCradle.unlockEx(0, 0, 15, false);
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
	
	describe("without Unlocking device from Cradle tests properties with flashLed method", function() {

		beforeEach(function() {
			startTestTimer();
			testResult = '';
            captured = false;
		});

		afterEach(function() {
			stopTestTimer();
			//  Tear it down
		});

		///////////////////////////////////////////////////////////////////////
		//  Cradle unlockEx Positive Tests
		///////////////////////////////////////////////////////////////////////
		it("without Unlocking device from Cradle led should flash 1 time", function() {

			runs(function()
			{
				setObjective("device led should flash for 1 time");
				setInstruction("cradle led should be on and off duration set to 1sec and led flash count set 1(try removing the device device should not come out)");
				setExpected("without Unlocking device from Cradle led should flash every 1sec like this led should flash for only one time");
				Rho.SmartCradle.flashLed(1000, 1000, true, 1);
			});

			waitsFor(function () {
				return captured;
			}, 'Tester should have been displayed by now', 30000);

			runs(function () {
				expect(testResult).toEqual(true);
			});

		});
		
		it("without Unlocking device from Cradle led should flash 6 times", function() {

			runs(function()
			{
				setObjective("device led should flash for 6 times");
				setInstruction("cradle led on set to 1 sec and off duration set to 2sec and led flash count set 6(try removing the device device should not come out)");
				setExpected("without Unlocking device from Cradle led should flash every 1sec like this led should flash for 6 times");
				Rho.SmartCradle.flashLed(1000, 2000, false, 6);
			});

			waitsFor(function () {
				return captured;
			}, 'Tester should have been displayed by now', 30000);

			runs(function () {
				expect(testResult).toEqual(true);
			});

		});
		
		it("without Unlocking device from Cradle led should flash 12 times", function() {

			runs(function()
			{
				setObjective("device led should flash for 12 times");
				setInstruction("cradle led should be on and off duration set to 2sec and led flash count set 12(try removing the device device should not come out)");
				setExpected("without Unlocking device from Cradle led should flash every 2sec like this led should flash for 12 times");
				Rho.SmartCradle.flashLed(2000, 2000, true, 12);
			});

			waitsFor(function () {
				return captured;
			}, 'Tester should have been displayed by now', 30000);

			runs(function () {
				expect(testResult).toEqual(true);
			});

		});

		it("without Unlocking device from Cradle led should flash 25 times", function() {

			runs(function()
			{
				setObjective("device led should flash for 25 times");
				setInstruction("cradle led on set to  3sec and off duration set to 1sec and led flash count set 25(try removing the device device should not come out)");
				setExpected("without Unlocking device from Cradle led should flash for 3sec led should off for 1 sec like this led should flash for 25 times");
				Rho.SmartCradle.flashLed(3000, 1000, false, 25);
			});

			waitsFor(function () {
				return captured;
			}, 'Tester should have been displayed by now', 30000);

			runs(function () {
				expect(testResult).toEqual(true);
			});

		});
		
	});	
	
	
	describe("Unlocking the Cradle using unlockEx method with LED parameter values that are out of range", function() {

		beforeEach(function() {
			document.getElementById("actResult").innerHTML = "init";
			startTestTimer();
		});

		afterEach(function() {
			stopTestTimer();
			//  Tear it down
		});

		it("is able to unlockEx the cradle for 10 seconds despite invalid LED values", function() {

			runs(function()
			{
				setObjective("able to unlockEx the cradle for 10 seconds despite invalid LED values");
				setInstruction("Observe whether or not the cradle is unlocked (try removing the device).  Observe the cradle LED state");
				setExpected("Cradle should remain unlocked for 10 seconds and then re-engage.  LED state does not affect test outcome (LEDs will take on previously set state)");
				Rho.SmartCradle.unlockEx(70000, -1, 10, true);
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

		it("is able to unlockEx the cradle for 10 seconds despite invalid LED values", function() {

			runs(function()
			{
				setObjective("able to unlockEx the cradle for 10 seconds despite invalid LED values");
				setInstruction("Observe whether or not the cradle is unlocked (try removing the device).  Observe the cradle LED state");
				setExpected("Cradle should remain unlocked for 10 seconds and then re-engage.  LED state does not affect test outcome (LEDs will take on previously set state)");
				Rho.SmartCradle.unlockEx(-1, 70000, 10, true);
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
	

	describe("Unlocking the Cradle using unlockEx method with the timeout parameter out of range", function() {

		beforeEach(function() {
			document.getElementById("actResult").innerHTML = "init";
			startTestTimer();
		});

		afterEach(function() {
			stopTestTimer();
			//  Tear it down
		});

		it("is not able to unlockEx the cradle for 45 seconds", function() {

			runs(function()
			{
				setObjective("not able to unlockEx the cradle for 45 seconds");
				setInstruction("Observe whether or not the cradle is unlocked (try removing the device).");
				setExpected("Cradle should not unlockEx");
				Rho.SmartCradle.unlockEx(1, 0, 45, true);
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
		
		it("is not able to unlockEx the cradle for -1 seconds", function() {

			runs(function()
			{
				setObjective("not able to unlockEx the cradle for -1 seconds");
				setInstruction("Observe whether or not the cradle is unlocked (try removing the device).");
				setExpected("Cradle should not unlockEx");
				Rho.SmartCradle.unlockEx(1, 0, -1, true);
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

describe("without Unlocking device from Cradle ledFlashCount property invalid values with flashLed method", function() {

		beforeEach(function() {
			startTestTimer();
			testResult = '';
            captured = false;
		});

		afterEach(function() {
			stopTestTimer();
			//  Tear it down
		});

		///////////////////////////////////////////////////////////////////////
		//  Cradle unlockEx Positive Tests
		///////////////////////////////////////////////////////////////////////
		it("without Unlocking device from Cradle led should flash 5 time and led off durations set to 0", function() {

			runs(function()
			{
				setObjective("observe the ledFlashCount with led off durations set to 0");
				setInstruction("cradle led on set to 2 sec and off duration set to 0 sec and led flash count set 5(try removing the device device should not come out)");
				setExpected("observe the ledFlashCount with led off durations set to 0");
				Rho.SmartCradle.flashLed(2000, 0, true, 5);
			});

			waitsFor(function () {
				return captured;
			}, 'Tester should have been displayed by now', 30000);

			runs(function () {
				expect(testResult).toEqual(true);
			});

		});
		
		it("without Unlocking device from Cradle led should flash 8 time and led on durations set to 0", function() {

			runs(function()
			{
				setObjective("observe the ledFlashCount with led on durations set to 0");
				setInstruction("cradle led on set to 0 sec and off duration set to 2 sec and led flash count set 8(try removing the device device should not come out)");
				setExpected("observe the ledFlashCount with led on durations set to 0");
				Rho.SmartCradle.flashLed(0, 2000, false, 8);
			});

			waitsFor(function () {
				return captured;
			}, 'Tester should have been displayed by now', 30000);

			runs(function () {
				expect(testResult).toEqual(true);
			});

		});
		
		it("without Unlocking device from Cradle led should flash 0 times", function() {

			runs(function()
			{
				setObjective("observe the ledFlashCount with ledFlashCount set to 0");
				setInstruction("cradle led should be on and off duration set to 2sec and led flash count set 0(try removing the device device should not come out)");
				setExpected("observe the ledFlashCount with ledFlashCount set to 0");
				Rho.SmartCradle.flashLed(2000, 2000, true, 0);
			});

			waitsFor(function () {
				return captured;
			}, 'Tester should have been displayed by now', 30000);

			runs(function () {
				expect(testResult).toEqual(true);
			});

		});

		it("without Unlocking device from Cradle led should flash -1 times", function() {

			runs(function()
			{
				setObjective("observe the ledFlashCount with ledFlashCount set to -1");
				setInstruction("cradle led should be on and off duration set to 2sec and led flash count set -1(try removing the device device should not come out)");
				setExpected("observe the ledFlashCount with ledFlashCount set to -1");
				Rho.SmartCradle.flashLed(2000, 2000, false, -1);
			});

			waitsFor(function () {
				return captured;
			}, 'Tester should have been displayed by now', 30000);

			runs(function () {
				expect(testResult).toEqual(true);
			});

		});

		
	});		 
	}
});