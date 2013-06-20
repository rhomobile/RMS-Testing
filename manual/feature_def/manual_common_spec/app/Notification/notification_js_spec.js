
describe("Notification", function() {
	
	beforeEach(function() {
		
	});

	afterEach(function() {
		
	});

	for (var d = 1000; d <= 3000; d = d + 2000)
	{
		for (var h = 1500; h <= 2500; h = h + 1000)
		{
			for (var v = 2; v <= 3; v = v + 2)
			{
				(function(d, h, v)
				{
					describe("Sound Beeper for " + d + " ms at frequency" + h + "Hz at volume " + v + "", function() {
						beforeEach(function() {
							document.getElementById("actResult").innerHTML = "init";
						});

						it("Able to control the Beeper (duration: " + d + "ms, frequency: " + h + "Hz, volume level: " + v + "", function() {
							runs(function()
							{
								setInstruction("Beep (duration: " + d + "ms, frequency: " + h + "Hz, volume level: " + v + "");
								setExpected("Did the device Beep as per the instruction");
								strProperty = '{"frequency":' + h + ',"volume":' + v + ',"duration":' + d + '}';
								var objProperties = JSON.parse(strProperty);
								Rho.Notification.beep(objProperties);
							});

							waitsFor(function()
							{
								return document.getElementById("actResult").innerHTML != "init";
							}, "Timed out waiting for tester to respond", 30000);

							runs(function()
							{
								expect("pass").toEqual(document.getElementById("actResult").innerHTML);
							});
						});
					});
				})(d, h, v);
			}
		}
	}

	for (var v = 1000; v <= 5000; v = v + 2000)
	{
		(function(v)
		{
			describe("Vibrate Function for " + v + " ms", function() {
				beforeEach(function() {
					document.getElementById("actResult").innerHTML = "init";
				});

				it("Should Vibrate for " + v + "milliseconds", function() {
					runs(function()
					{
						setInstruction("Vibrate for " + v + "ms");
						setExpected("Did the device vibrate for " + v + "ms?");						
						Rho.Notification.vibrate(v);
					});

					waitsFor(function()
					{
						return document.getElementById("actResult").innerHTML != "init";
					}, "Timed out waiting for tester to respond", 30000);

					runs(function()
					{
						expect("pass").toEqual(document.getElementById("actResult").innerHTML);
					});
				});
			});
		})(v);
	}
	
    var enumData = Rho.Notification.Led.enumerate();
	if (enumData != null)
	{
		for (var j = 0;j<enumData.length;j++)
		{
			(function(enumObject,arrScanner)
			{
				var ledName = enumObject.name;

				describe("Controlling LED: "+ ledName, function() {

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
							var objProperties = JSON.parse(strProperty);
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
							var objProperties = JSON.parse(strProperty);
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
							var objProperties = JSON.parse(strProperty);
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
							var objProperties = JSON.parse(strProperty);
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