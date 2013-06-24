var testResult = '';
var captured = false;
var callbackCount = 0;


describe("Notification Manual FD  Tests", function () {

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

    it("VT281-0850 |showStatus with only Message |", function () {

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
    
    it("VT281-0850 |showStatus with all null parameters |", function () {

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

    it("VT281-0851 |showPopup with only Message |", function () {

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

    it("VT281-0852 |showPopup with Message and title as well |", function () {

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

    it("VT281-0853 |showPopup with Message and title and predefined icon  as well |", function () {

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


    it("VT281-0853 |showPopup with Message, title, predefined icon  and ok cancel buttons |", function () {

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
    
    it("VT281-0854 |showPopup with all null parameters and only button |", function () {

        runs(function () {
            dispTestCaseRunning(" wait for the status message to pop up else check for odd behavior in the app  ");
            dispExpectedResult("no odd behavior should be seen if there is no popup")
            var propertyMap = {message: '', buttons:['No'], title: '', icon: ''};
            Rho.Notification.showPopup(propertyMap);
        });

        waitsFor(function () {
            return captured;
        }, 'The message  should have been popped up by now', 30000);

        runs(function () {
            expect(testResult).toEqual(true);
        });
    });


    it("VT281-0855 |showPopup with Message and title , icon and buttons, with callback for buttton |", function () {

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

if ( Rho.System.platform == "WINDOWS_DESKTOP" || Rho.System.platform == "WINDOWS" || Rho.System.isRhoSimulator )
{
    it("VT281-0856 |showStatus up and then hide Status|", function () {

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
}else
{
    it("VT281-0856 |showPopup up and then hide Pop up|", function () {

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
    
if ( Rho.System.platform == "WINDOWS_DESKTOP" || Rho.System.isRhoSimulator )
{
}else
{
    it("VT281-0857 |Beep for 5 secs and with volume 3 with 1000 hz|", function () {

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
    it("VT281-0858 |Beep for 2 secs and with volume one  with 2000 hz|", function () {

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

    it("VT281-0859|Play File - Mp3 file with media type|", function () {

        runs(function () {
            dispTestCaseRunning(" MP3 file will be played  ");
            dispExpectedResult("MP3 file should be played ");
            Rho.Notification.playFile( Rho.RhoFile.join( Rho.Application.modelFolderPath('Notification'), 'media1.mp3'), '.mp3');
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


    it("VT281-0860|Play File - Mp3 file without media type|", function () {

        runs(function () {
            dispTestCaseRunning(" MP3 file will be played  ");
            dispExpectedResult("MP3 file should be played ");
            Rho.Notification.playFile(Rho.RhoFile.join( Rho.Application.modelFolderPath('Notification'), 'media1.mp3'), '');
        });

        waitsFor(function () {
            dispExpectedResult("MP3 file should be played ");
            return captured;
        }, 'Mp3 file should have been played by now ', 30000);

        runs(function () {
            expect(testResult).toEqual(true);
        });
    });

    it("VT281-0860|Play File - Wav file with media type|", function () {

        runs(function () {
            dispTestCaseRunning(" MP3 file will be played  ");
            dispExpectedResult("MP3 file should be played ");
            Rho.Notification.playFile(Rho.RhoFile.join( Rho.Application.modelFolderPath('Notification'), 'media2.wav'), '.wav');
        });

        waitsFor(function () {
            dispExpectedResult("Wav file should be played ");
            return captured;
        }, 'Wav file should have been played by now ', 30000);

        runs(function () {
            expect(testResult).toEqual(true);
        });
    });

    it("VT281-0861|Vibrate with duration 0 seconds |", function () {

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

    it("VT281-0861|Vibrate with duration null|", function () {

        runs(function () {
            dispTestCaseRunning(" Device will vibrate if applicable ");
            dispExpectedResult("Device should vibrate for default time  ");
            Rho.Notification.vibrate(null);
        });

        waitsFor(function () {
            dispExpectedResult("Device should vibrate for default time");
            return captured;
        }, 'Tester should ve responded by now ', 30000);

        runs(function () {
            expect(testResult).toEqual(true);
        });
    });

    it("VT281-0861|Vibrate with duration 2 sec|", function () {

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
	
	    it("VT281-0861|Vibrate with duration 17 sec|", function () {
	        runs(function () {
	            dispTestCaseRunning(" Device will vibrate if applicable ");
	            dispExpectedResult("Device should vibrate for ONLY 15 seconds even though it is 17 sec as 15 is the max value it can take");
	            Rho.Notification.vibrate(17000);
	        });
	        waitsFor(function () {
	            dispExpectedResult("Device should vibrate for ONLY 15 seconds even though it is 17 sec as 15 is the max value it can take")
	            return captured;
	        }, 'Tester should ve responded by now ', 30000);
	
	        runs(function () {
	            expect(testResult).toEqual(true);
	        });
	    });
	}
	else
	{
	    it("VT281-0861|Vibrate with duration 25 sec|", function () {
	
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
}    
});

var enumData = Rho.Notification.Led.enumerate();
if (enumData != null) {
    for (var j = 0; j < enumData.length; j++) {
        (function (enumObject, arrScanner) {
            var ledName = enumObject.name;
            describe("Controlling LED: " + ledName, function () {

                beforeEach(function () {
                    document.getElementById("actResult").innerHTML = "init";
                });
                it("is able to illuminate LED: " + ledName, function () {

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

                it("is able to extinguish LED: " + ledName, function () {

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


                it("is able to flash LED: " + ledName + " (on: 5sec, off: 5sec, cycles: 3)", function () {

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

                it("is able to flash LED: " + ledName + " (on: 3sec, off: 1sec, cycles: 3)", function () {

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

                it("is able to flash LED: " + ledName + " (on: 5sec, off: 5sec, cycles: 0)", function () {

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


                it("is able to flash LED: " + ledName + " (on: sec, off: 2sec, cycles: 2)", function () {

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


        })
    }

}
