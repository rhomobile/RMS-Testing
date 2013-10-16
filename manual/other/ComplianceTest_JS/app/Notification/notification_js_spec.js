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
	  }
    }}
});
