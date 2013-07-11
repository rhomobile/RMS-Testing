var testResult = '';
var captured = false;
var callbackCount = 0;


describe("Notification Manual FD Tests", function () {

    var buttonCallback = function (args) {

        Rho.Log.info(args.button_id, 'button_id');
        Rho.Log.info(args.button_title, 'button_title');
        Rho.Log.info(args.button_index, 'button_index');
    }
    var displayflag = false;

    beforeEach(function () {
        /* ... Set up your object ... */
        displayflag = false;
        testResult = '';
        captured = false;
    });

    afterEach(function () {
        /* ... Tear it down ... */
    });

    it("VT307-018 |showStatus  |", function () {

        runs(function () {
            dispTestCaseRunning("wait for the status message to pop up");
            dispExpectedResult("see if the status message is shown with title , message and hide button label click on hide button to see if the popup is closed ");
            Rho.Notification.showStatus('MyAlert', 'This is status message', 'click to hide');

        });


        waitsFor(function () {
            dispExpectedResult("see if the status message is shown with title , message and hide button label click on hide button to see if the popup is closed ");
            return captured;
        }, 'The status should have been popped up by now', 30000);

        runs(function () {
            expect(testResult).toEqual(true);
        });
    });

    it("VT281-019|showStatus with all null parameters |", function () {

        runs(function () {
            dispTestCaseRunning("check if the status is shown or check of rodd behavior in the app ");
            dispExpectedResult("should not be any odd behavior if ststaus is not popped up  ");
            Rho.Notification.showStatus('', '', '');

        });


        waitsFor(function () {

            return captured;
        }, 'The status should have been popped up by now', 30000);

        runs(function () {
            expect(testResult).toEqual(true);
        });
    });

    it("VT307-020 |showPopup with only Message |", function () {

        runs(function () {
            dispTestCaseRunning(" wait for the status message to pop up");
            dispExpectedResult("see if the pop up is showing the message ");
            var propertyMap = {message: 'This is just pop up', buttons: [
                {id: 'yes', title: 'yes'}
            ]};
            Rho.Notification.showPopup(propertyMap);
        });

        waitsFor(function () {
            dispExpectedResult("see if the pop up is showing the message ");
            return captured;
        }, 'The message  should have been popped up by now', 30000);

        runs(function () {
            expect(testResult).toEqual(true);
        });
    });

    it("VT307-021 |showPopup with Message and title as well |", function () {

        runs(function () {
            dispTestCaseRunning(" wait for the status message to pop up along with title ");
            dispExpectedResult("see if the pop up is showing the message and also th title at the top ");
            var propertyMap = {message: 'This is a popup with title', buttons: [
                {id: 'yes', title: 'yes'}
            ], title: 'MyTitle'};
            Rho.Notification.showPopup(propertyMap);
        });

        waitsFor(function () {
            dispExpectedResult("see if the pop up is showing the message and also th title at the top ");
            return captured;
        }, 'The message  should have been popped up by now', 30000);

        runs(function () {
            expect(testResult).toEqual(true);
        });
    });

    it("VT307-022 |showPopup with Message and title and predefined icon  as well |", function () {

        runs(function () {
            dispTestCaseRunning(" wait for the status message to pop up along with title and question icon ");
            dispExpectedResult("see if the pop up is showing the message ,title and also then question icon ");
            var propertyMap = {message: 'This is a popup with Icon', buttons: [
                {id: 'yes', title: 'yes'}
            ], title: 'MyTitle', icon: 'question'};
            Rho.Notification.showPopup(propertyMap);
        });


        waitsFor(function () {
            dispExpectedResult("see if the pop up is showing the message ,title and also thenicon ");
            return captured;
        }, 'The message  should have been popped up by now', 30000);

        runs(function () {
            expect(testResult).toEqual(true);
        });
    });


    it("VT307-023 |showPopup with Message, title, predefined icon  and ok cancel buttons |", function () {

        runs(function () {
            dispTestCaseRunning(" wait for the status message to pop up along with title, info icon and ok cancel buttons");
            dispExpectedResult("see if the pop up is showing the message ,title, info icon and ok cancel buttons ");
            var propertyMap = {message: 'This is a popup with Icon', buttons: [
                {id: 'ok', title: 'ok'},
                {id: 'cancel', title: 'cancel'}
            ], title: 'MyTitle', icon: 'info'};
            Rho.Notification.showPopup(propertyMap);
        });


        waitsFor(function () {
            dispExpectedResult("see if the pop up is showing the Message, title, predefined icon  and ok cancel buttons ");
            return captured;
        }, 'The message  should have been popped up by now', 30000);

        runs(function () {
            expect(testResult).toEqual(true);
        });
    });

    it("VT281-0854 |showPopup with Message and title , icon and buttons  as well |", function () {

        runs(function () {
            dispTestCaseRunning(" wait for the status message to pop up along with title,icon(iOS, Android) and three buttons ");
            dispExpectedResult(" see if the pop up is showing the message, title, icon and three buttons")
            var propertyMap = {message: 'This is a pop up with buttons', buttons: [
                {id: 'yes', title: 'yes'},
                'No',
                'Cancel'
            ], title: 'MyTitle', icon: Rho.RhoFile.join(Rho.Application.modelFolderPath('Notification'), 'icon.png')};
            Rho.Notification.showPopup(propertyMap);
        });

        waitsFor(function () {
            dispExpectedResult("see if the pop up is showing the message, title, icon and three buttons ");
            return captured;
        }, 'The message  should have been popped up by now', 30000);

        runs(function () {
            expect(testResult).toEqual(true);
        });
    });

    it("VT307-024|showPopup with all null parameters and only button |", function () {

        runs(function () {
            dispTestCaseRunning(" wait for the status message to pop up else check for odd behavior in the app  ");
            dispExpectedResult("no odd behavior should be seen if there is no popup")
            var propertyMap = {message: '', buttons: ['No'], title: '', icon: ''};
            Rho.Notification.showPopup(propertyMap);
        });

        waitsFor(function () {
            return captured;
        }, 'The message  should have been popped up by now', 30000);

        runs(function () {
            expect(testResult).toEqual(true);
        });
    });


    it("VT307-023 |showPopup with Message and title , icon and buttons, with callback for buttton |", function () {

        runs(function () {
            dispTestCaseRunning(" wait for the status message to pop up click on any button and check the log for callback event fired ");
            dispExpectedResult(" see if the pop up is showing the message, check the log and see three parameters button id,,title and index is displayed or not and then pass  ");
            var propertyMap = {message: 'This is a pop up for callback', buttons: [
                {id: 'yes', title: 'yes'},
                'No',
                'Cancel'
            ], title: 'MyTitle', icon: '/app/Notification/icon.png'};
            Rho.Notification.showPopup(propertyMap, buttonCallback);
        });

        waitsFor(function () {
            dispExpectedResult("see if the pop up is showing the message, check the log and see three parameters button id,,title and index is displayed or not and then pass  ");
            return captured;
        }, 'The message  should have been popped up by now', 100000);

        runs(function () {
            expect(testResult).toEqual(true);
        });
    });

    if (Rho.System.platform == "WINDOWS_DESKTOP" || Rho.System.platform == "WINDOWS" || Rho.System.isRhoSimulator) {
        it("VT307-012|showStatus up and then hide Status|", function () {

            runs(function () {
                dispTestCaseRunning(" wait for the pop up and then after 10 sec hide pop up is called  ");
                dispExpectedResult(" see if the pop up is showing the message, then it hides automatically after 10sec");

            });
            runs(function () {

                Rho.Notification.showStatus('MyAlert', 'This is status message', 'click to hide');
                setTimeout(function () {
                    Rho.Notification.hidePopup();
                }, 10000);
            });
            waitsFor(function () {
                dispExpectedResult("see if the pop up is showing the message, then it hides automatically after 10sec");
                return captured;
            }, 'The message  should have been popped up and hidden by now', 30000);

            runs(function () {
                expect(testResult).toEqual(true);
            });
        });
    } else {
        it("VT307-012 |showPopup up and then hide Pop up|", function () {

            runs(function () {
                dispTestCaseRunning(" wait for the pop up and then after 10 sec hide pop up is called  ");
                dispExpectedResult(" see if the pop up is showing the message, then it hides automatically after 10sec");

            });
            runs(function () {
                var propertyMap = {message: 'This is a pop up for hide ', buttons: [
                    {id: 'yes', title: 'yes'},
                    'No',
                    'Cancel'
                ], title: 'MyTitle', icon: '/app/Notification/icon.png'};
                Rho.Notification.showPopup(propertyMap);

                setTimeout(function () {
                    Rho.Notification.hidePopup();
                }, 10000);
            });
            waitsFor(function () {
                dispExpectedResult("see if the pop up is showing the message, then it hides automatically after 10sec");
                return captured;
            }, 'The message  should have been popped up and hidden by now', 30000);

            runs(function () {
                expect(testResult).toEqual(true);
            });
        });
    }

    if (Rho.System.platform == "WINDOWS_DESKTOP" || Rho.System.isRhoSimulator) {
    } else 
    {
        if (Rho.System.platform == "WINDOWS" || Rho.System.platform == "ANDROID") 
        {
            it("VT307-001 |Beep for 5 secs and with volume 3 with 1000 hz|", function () {

                runs(function () {
                    dispTestCaseRunning(" Beeper will be started if its applicable for the Device  ");
                    dispExpectedResult(" Beeper should sound for 5 secs and with volume 3 and frequency 1000  ");
                    var propertyMap = {frequency: 1000, volume: 3, duration: 5000};
                    Rho.Notification.beep(propertyMap);

                });

                waitsFor(function () {
                    dispExpectedResult("Beeper should sound for 5 secs and with volume 3 and frequency 1000  ");
                    return captured;
                }, 'Beep sound should have ended by now', 30000);

                runs(function () {
                    expect(testResult).toEqual(true);
                });
            });
            it("VT281-0857 |Beep with null duration null frequency and only volume|", function () {

                runs(function () {
                    dispTestCaseRunning("see if beeper starts and no odd behaviour in device occurs   ");
                    dispExpectedResult(" No odd behaviour should be seen if beeper is not sounded ");
                    var propertyMap = {frequency: null, volume: 3, duration: null};
                    Rho.Notification.beep(propertyMap);

                });

                waitsFor(function () {
                    return captured;
                }, 'Beep sound should have ended by now', 30000);

                runs(function () {
                    expect(testResult).toEqual(true);
                });
            });
            it("VT307-002 |Beep for 2 secs and with volume one  with 2000 hz|", function () {

                runs(function () {
                    dispTestCaseRunning(" Beeper will be started if its applicable for the Device  ");
         	    dispExpectedResult(" Beeper should sound for 2 secs and with volume 1 and frequency 10000, please observe the change in the volume from previous case  ");
                    var propertyMap = {frequency: 10000, volume: 1, duration: 2000};
                    Rho.Notification.beep(propertyMap);
                });

                waitsFor(function () {
        	    dispExpectedResult("Beeper should sound for 2 secs and with volume 1 and frequency 2000  ");
                    return captured;
                }, 'Beep sound should have ended by now', 30000);

                runs(function () {
                    expect(testResult).toEqual(true);
                });
            });
        it("VT307-008|Play File - Mp3 file with media type|", function () {

            runs(function () {
                dispTestCaseRunning(" MP3 file will be played  ");
                dispExpectedResult("MP3 file should be played ");
                Rho.Notification.playFile(Rho.RhoFile.join(Rho.Application.modelFolderPath('Notification'), 'media1.mp3'), '.mp3');
            });

            waitsFor(function () {
                dispExpectedResult("MP3 file should be played ");
                return captured;
            }, 'Mp3 file should have been played by now ', 45000);

            runs(function () {
                expect(testResult).toEqual(true);
            });
        });

        it("VT281-0859|Play File method with no file path|", function () {

            runs(function () {
                dispTestCaseRunning(" Observe for any odd behavior in the application  ");
                dispExpectedResult("Pass if there is no abnormal behavior  ");
                Rho.Notification.playFile('', '.mp3');
            });

            waitsFor(function () {
                return captured;
            }, 'Mp3 file should have been played by now ', 45000);

            runs(function () {
                expect(testResult).toEqual(true);
            });
        });


        it("VT307-009|Play File - Mp3 file without media type|", function () {

            runs(function () {
                dispTestCaseRunning(" MP3 file will be played  ");
                dispExpectedResult("MP3 file should be played ");
                Rho.Notification.playFile(Rho.RhoFile.join(Rho.Application.modelFolderPath('Notification'), 'media1.mp3'));
            });

            waitsFor(function () {
                dispExpectedResult("MP3 file should be played ");
                return captured;
            }, 'Mp3 file should have been played by now ', 30000);

            runs(function () {
                expect(testResult).toEqual(true);
            });
        });

        it("VT307-010|Play File - Wav file with media type|", function () {

            runs(function () {
                dispTestCaseRunning(" MP3 file will be played  ");
                dispExpectedResult("MP3 file should be played ");
                Rho.Notification.playFile(Rho.RhoFile.join(Rho.Application.modelFolderPath('Notification'), 'media2.wav'), '.wav');
            });

            waitsFor(function () {
                dispExpectedResult("Wav file should be played ");
                return captured;
            }, 'Wav file should have been played by now ', 30000);

            runs(function () {
                expect(testResult).toEqual(true);
            });
        });

        it("VT307-013|Vibrate with duration 0 seconds |", function () {

            runs(function () {
                dispTestCaseRunning(" Device will vibrate if applicable ");
                dispExpectedResult("Device should not vibrate as the duration is 0 seconds ");
                Rho.Notification.vibrate(0);
            });

            waitsFor(function () {
                dispExpectedResult("Device should not vibrate  as the duration is 0 seconds");
                return captured;
            }, 'Tester should ve responded by now ', 30000);

            runs(function () {
                expect(testResult).toEqual(true);
            });
        });

        it("VT307-014|Vibrate with duration null|", function () {

            runs(function () {
                dispTestCaseRunning(" Device will vibrate if applicable ");
                dispExpectedResult("Device should vibrate for default time  ");
                Rho.Notification.vibrate();
            });

            waitsFor(function () {
                dispExpectedResult("Device should vibrate for default time");
                return captured;
            }, 'Tester should ve responded by now ', 30000);

            runs(function () {
                expect(testResult).toEqual(true);
            });
        });

        it("VT307-015|Vibrate with duration 2 sec|", function () {

            runs(function () {
                dispTestCaseRunning(" Device will vibrate if applicable ");
                dispExpectedResult("Device should vibrate for 2 seconds ");
                Rho.Notification.vibrate(2000);
            });

            waitsFor(function () {
                dispExpectedResult("Device should vibrate for 2 seconds");
                return captured;
            }, 'Tester should ve responded by now ', 30000);

            runs(function () {
                expect(testResult).toEqual(true);
            });
        });
	if(Rho.System.platform == "ANDROID")
	{
	    it("VT281-0861|Vibrate with duration 15 sec|", function () {
	        runs(function () {
	            dispTestCaseRunning(" Device will vibrate if applicable ");
	            dispExpectedResult("Device should vibrate for 15 seconds ");
	            Rho.Notification.vibrate(15000);
	        });
	        waitsFor(function () {
	            dispExpectedResult("Device should vibrate for 15 seconds");
	            return captured;
	        }, 'Tester should ve responded by now ', 30000);
	        runs(function () {
	            expect(testResult).toEqual(true);
	        });
	    });
	    it("VT281-0861|Vibrate with duration 30 sec|", function () {
	        runs(function () {
	            dispTestCaseRunning(" Device will vibrate if applicable ");
	            dispExpectedResult("Device should vibrate for ONLY 15 seconds even though it is 30 sec as 15 is the max value it can take");
	            Rho.Notification.vibrate(30000);
	        });
	        waitsFor(function () {
	            dispExpectedResult("Device should vibrate for ONLY 15 seconds even though it is 30 sec as 15 is the max value it can take")
	            return captured;
	        }, 'Tester should ve responded by now ', 30000);
	        runs(function () {
	            expect(testResult).toEqual(true);
	        });
	    });
	}
	else
	{
        it("VT307-016|Vibrate with duration 25 sec|", function () {

            runs(function () {
                dispTestCaseRunning(" Device will vibrate if applicable ");
                dispExpectedResult("Device should vibrate for 25 seconds ");
                Rho.Notification.vibrate(25000);
            });

            waitsFor(function () {
                dispExpectedResult("Device should vibrate for 25 seconds");
                return captured;
            }, 'Tester should ve responded by now ', 30000);

            runs(function () {
                expect(testResult).toEqual(true);
            });
        });

        it("VT281-0861|Vibrate with duration 27 sec|", function () {
            runs(function () {
                dispTestCaseRunning(" Device will vibrate if applicable ");
                dispExpectedResult("Device should vibrate for ONLY 25 seconds even though it is 27 sec as 25 is the max value it can take");
                Rho.Notification.vibrate(27000);
            });
            waitsFor(function () {
                dispExpectedResult("Device should vibrate for ONLY 25 seconds even though it is 27 sec as 25 is the max value it can take")
                return captured;
            }, 'Tester should ve responded by now ', 30000);

            runs(function () {
                expect(testResult).toEqual(true);
            });
        });
	  }
    }}
});

/* REMOVED from 4.0
var enumData = Rho.Notification.Led.enumerate();

for (var j = 0; j < enumData.length; j++) {
    var enumObject = enumData[j];
    var ledName = enumObject.name;

    describe("Controlling LED: " + ledName, function () {

        beforeEach(function () {
        	 testResult = '';
             captured = false;
            document.getElementById("actResult").innerHTML = "init";
        });

        it("VT307-026|is able to illuminate LED: " + ledName, function () {

            runs(function () {
                dispTestCaseRunning("Able to illuminate LED " + ledName);
                dispExpectedResult("Is the " + ledName + " illuminated?");
                enumObject.illuminate();
            });
            waitsFor(function () {
                return captured;
            }, "Timed out waiting for tester to respond", 30000);
            runs(function () {
                expect(testResult).toEqual(true);
            });

        });

        it("VT307-027|is able to extinguish LED: " + ledName, function () {

            runs(function () {
                dispTestCaseRunning("Able to extinguish LED " + ledName);
                dispExpectedResult("Is the " + ledName + " extinguished?");
                enumObject.extinguish();
            });
            waitsFor(function () {
                return captured;
            }, "Timed out waiting for tester to respond", 30000);
            runs(function () {
                expect(testResult).toEqual(true);
            });
        });

        it("VT307-029|is able to flash LED: " + ledName + " (on: 5sec, off: 5sec, cycles: 3)", function () {

            runs(function () {
                dispTestCaseRunning("able to flash LED: " + ledName + " (on: 5sec, off: 5sec, cycles: 3)");
                dispExpectedResult("Is the " + ledName + " flashing as per the instruction?");
                var strProperty = {onDuration: 5000, offDuration: 5000, numberOfCycles: 3};
                enumObject.flash(strProperty);
            });
            waitsFor(function () {
                return captured;
            }, "Timed out waiting for tester to respond", 30000);
            runs(function () {
                expect(testResult).toEqual(true);

            });
        });

        it("VT307-030|is able to flash LED: " + ledName + " (on: 3sec, off: 1sec, cycles: 3)", function () {

            runs(function () {
                dispTestCaseRunning("able to flash LED: " + ledName + " (on: 3sec, off: 1sec, cycles: 3)");
                dispExpectedResult("Is the " + ledName + " flashing as per the instruction?");
                var strProperty = {onDuration: 3000, offDuration: 1000, numberOfCycles: 3};
                enumObject.flash(strProperty);
            });
            waitsFor(function () {
                return captured;
            }, "Timed out waiting for tester to respond", 30000);
            runs(function () {
                expect(testResult).toEqual(true);

            });
        });

        it("VT307-031|is able to flash LED: " + ledName + " (on: 5sec, off: 5sec, cycles: 0)", function () {

            runs(function () {
                dispTestCaseRunning("able to flash LED: " + ledName + " (on: 5sec, off: 5sec, cycles: null)");
                dispExpectedResult("Is the " + ledName + " flashing as per the instruction?");
                var strProperty = {onDuration: 5000, offDuration: 5000, numberOfCycles: 0};
                enumObject.flash(strProperty);
            });
            waitsFor(function () {
                return captured;
            }, "Timed out waiting for tester to respond", 30000);
            runs(function () {
                expect(testResult).toEqual(true);
            });
        });


        it("VT307-032|is able to flash LED: " + ledName + " (on: sec, off: 2sec, cycles: 2)", function () {

            runs(function () {
                dispTestCaseRunning("able to flash LED: " + ledName + " (on: null, off: null, cycles: 3)");
                dispExpectedResult("Is the " + ledName + " flashing as per the instruction?");
                var strProperty = {onDuration: null, offDuration: null, numberOfCycles: 3};
                enumObject.flash(strProperty);
            });
            waitsFor(function () {
                return captured;
            }, "Timed out waiting for tester to respond", 30000);
            runs(function () {
                expect(testResult).toEqual(true);
            });
        });
    });


}
*/

/*

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

});*/
