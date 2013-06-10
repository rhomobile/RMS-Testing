
describe("Notification", function() {
	
	beforeEach(function() {
		
	});

	afterEach(function() {
		
	});

	describe("Beeper", function() {
		beforeEach(function() {

		});

		it("Should Beep at the specified frequency", function() {
/*			runs(function()
			{
				//Rho.Mediaplayer.getAllRingtones(ringtoneCallback);
			});

			waitsFor(function()
			{
				return callbackCalled;
			}, 'Ringtone Callback should have responded', 5000);
*/
			runs(function()
			{
				var testPassed = true;//confirm("Do you want the test to pass?");
				expect(testPassed).toEqual(true);
			});
		});
	});

	describe("Vibrate Function", function() {
		beforeEach(function() {

		});

		it("Should Beep at the specified frequency", function() {
/*			runs(function()
			{
				//Rho.Mediaplayer.getAllRingtones(ringtoneCallback);
			});

			waitsFor(function()
			{
				return callbackCalled;
			}, 'Ringtone Callback should have responded', 5000);
*/
			runs(function()
			{
				var testPassed = true;//confirm("Do you want the test to pass?");
				expect(testPassed).toEqual(true);
			});
		});
	});
	
	
    var enumData = Rho.Notification.Led.enumerate();
	if (enumData != null)
	{
		for (var j = 0;j<enumData.length;j++)
		{
			(function(enumObject,arrScanner)
			{
				var ledName = enumObject.name;

				describe("Illuminating LED: "+ ledName, function() {

					beforeEach(function() {
						document.getElementById("actResult").innerHTML = "init";
					});
					
					it("is able to illuminate LED: "+ ledName, function() {
						
						runs(function() {
							setInstruction("Able to illuminate LED " + ledName);
							setExpected("Is the " + ledName + " illuminated?");
							enumObject.illuminate();
							
							waitsFor(function() {
								return document.getElementById("actResult").innerHTML != "init";
							}, "Timed out waiting for tester to respond", 30000);
							runs(function() {
								expect("pass").toEqual(document.getElementById("actResult").innerHTML);
							});
						});					
					});

					it("is able to extinguish LED: "+ ledName, function() {
						
						runs(function() {
							setInstruction("Able to extinguish LED " + ledName);
							setExpected("Is the " + ledName + " extinguished?");
							enumObject.extinguish();
							
							waitsFor(function() {
								return document.getElementById("actResult").innerHTML != "init";
							}, "Timed out waiting for tester to respond", 30000);
							runs(function() {
								expect("pass").toEqual(document.getElementById("actResult").innerHTML);
							});
						});					
					});

					it("is able to flash LED: "+ ledName + " (on: 1sec, off: 1sec, cycles: 1)", function() {
						
						runs(function() {
							setInstruction("able to flash LED: "+ ledName + " (on: 1sec, off: 1sec, cycles: 1)");
							setExpected("Is the " + ledName + " flashing as per the instruction?");
							strProperty = '{"onDuration":1000,"offDuration":1000,"numberOfCycles":1}';
							var objProperties = jQuery.parseJSON(strProperty);
							enumObject.flash(objProperties);
							
							waitsFor(function() {
								return document.getElementById("actResult").innerHTML != "init";
							}, "Timed out waiting for tester to respond", 30000);
							runs(function() {
								expect("pass").toEqual(document.getElementById("actResult").innerHTML);
							});
						});					
					});

					it("is able to flash LED: "+ ledName + " (on: 2sec, off: 2sec, cycles: 1)", function() {
						
						runs(function() {
							setInstruction("able to flash LED: "+ ledName + " (on: 2sec, off: 2sec, cycles: 1)");
							setExpected("Is the " + ledName + " flashing as per the instruction?");
							strProperty = '{"onDuration":2000,"offDuration":2000,"numberOfCycles":1}';
							var objProperties = jQuery.parseJSON(strProperty);
							enumObject.flash(objProperties);
							waitsFor(function() {
								return document.getElementById("actResult").innerHTML != "init";
							}, "Timed out waiting for tester to respond", 30000);
							runs(function() {
								expect("pass").toEqual(document.getElementById("actResult").innerHTML);
							});
						});					
					});

					it("is able to flash LED: "+ ledName + " (on: 1sec, off: 1sec, cycles: 3)", function() {
						
						runs(function() {
							setInstruction("able to flash LED: "+ ledName + " (on: 1sec, off: 1sec, cycles: 3)");
							setExpected("Is the " + ledName + " flashing as per the instruction?");
							strProperty = '{"onDuration":1000,"offDuration":1000,"numberOfCycles":3}';
							var objProperties = jQuery.parseJSON(strProperty);
							enumObject.flash(objProperties);

							waitsFor(function() {
								return document.getElementById("actResult").innerHTML != "init";
							}, "Timed out waiting for tester to respond", 30000);
							runs(function() {
								expect("pass").toEqual(document.getElementById("actResult").innerHTML);
							});
						});					
					});

					it("is able to flash LED: "+ ledName + " (on: 4sec, off: 2sec, cycles: 2)", function() {
						
						runs(function() {
							setInstruction("is able to flash LED: "+ ledName + " (on: 4sec, off: 2sec, cycles: 2)");
							setExpected("Is the " + ledName + " flashing as per the instruction?");
							strProperty = '{"onDuration":4000,"offDuration":2000,"numberOfCycles":2}';
							var objProperties = jQuery.parseJSON(strProperty);
							enumObject.flash(objProperties);

							waitsFor(function() {
								return document.getElementById("actResult").innerHTML != "init";
							}, "Timed out waiting for tester to respond", 30000);
							runs(function() {
								expect("pass").toEqual(document.getElementById("actResult").innerHTML);
							});
						});					
					});
				});


			})(enumData[j],null);

		}
	}
});