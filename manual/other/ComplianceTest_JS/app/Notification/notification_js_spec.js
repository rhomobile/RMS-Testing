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
        document.getElementById("actResult").innerHTML = "init";
    });

    afterEach(function () {
        /* ... Tear it down ... */
    });


    if (Rho.System.platform == "WINDOWS_DESKTOP" || Rho.System.isRhoSimulator) {
    } 
    else 
    {
        if (Rho.System.platform == "WINDOWS" || Rho.System.platform == "ANDROID") 
        {
            it("VT200-0652 |Beep for 5 secs and with volume 3 with 1000 hz|", function () {

                runs(function () {
                    setObjective("VT200-0652  |Beep for 5 secs and with volume 3 with 1000 hz|");
                    setInstruction("Beeper will be started if its applicable for the Device  ");
                    setExpected(" Beeper should sound for 5 secs and with volume 3 and frequency 1000  ");
                    var propertyMap = {frequency: 1000, volume: 3, duration: 5000};
                    Rho.Notification.beep(propertyMap);
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

            it("VT200-0653|Play File - Mp3 file with media type|", function () {

                runs(function () {
                    setObjective("VT200-0653 |Play File - Mp3 file with media type|");
                    setInstruction(" MP3 file will be played  ");
                    setExpected("MP3 file should be played ");
                    Rho.Notification.playFile(Rho.RhoFile.join(Rho.Application.modelFolderPath('Notification'), 'media1.mp3'), '.mp3');
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

            xit("VT307-015|Vibrate with duration 2 sec|", function () {

                runs(function () {
                    setInstruction(" Device will vibrate if applicable ");
                    setExpected("Device should vibrate for 2 seconds ");
                    Rho.Notification.vibrate(2000);
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

            if(Rho.System.platform == "ANDROID")
            {
                it("VT200-0655|Vibrate with duration 15 sec|", function () {
                    runs(function () {
                        setObjective("VT200-0655|Vibrate with duration 15 sec");
                        setInstruction(" Device will vibrate if applicable ");
                        setExpected("Device should vibrate for 15 seconds ");
                        Rho.Notification.vibrate(15000);
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

                xit("VT281-0861|Vibrate with duration 30 sec|", function () {
                    runs(function () {
                        setInstruction(" Device will vibrate if applicable ");
                        setExpected("Device should vibrate for ONLY 15 seconds even though it is 30 sec as 15 is the max value it can take");
                        Rho.Notification.vibrate(30000);
                    });
                    waitsFor(function () {
                        setExpected("Device should vibrate for ONLY 15 seconds even though it is 30 sec as 15 is the max value it can take")
                        return captured;
                    }, 'Tester should ve responded by now ', 30000);
                    runs(function () {
                        expect(testResult).toEqual(true);
                    });
                });
            }
            else
            {
                it("VT200-0655|Vibrate with duration 25 sec|", function () {

                    runs(function () {
                        setObjective("VT200-0655|Vibrate with duration 25 sec|");
                        setInstruction(" Device will vibrate if applicable ");
                        setExpected("Device should vibrate for 25 seconds ");
                        Rho.Notification.vibrate(25000);
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
            }
        }
    }


    if (Rho.System.platform == "WINDOWS_DESKTOP" || Rho.System.platform == "WINDOWS" || Rho.System.isRhoSimulator) {
        it("VT200-0654|showStatus up and then hide Status|", function () {

            runs(function () {
                setObjective("VT200-0654|showStatus up and then hide Status|");
                setInstruction(" wait for the pop up and then after 10 sec hide pop up is called  ");
                setExpected(" see if the pop up is showing the message, then it hides automatically after 10sec");

            });
            runs(function () {

                Rho.Notification.showStatus('MyAlert', 'This is status message', 'click to hide');
                setTimeout(function () {
                    Rho.Notification.hidePopup();
                }, 10000);
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
    } 
    else 
    {
        it("VT200-0654 |showPopup up and then hide Pop up|", function () {

            runs(function () {
                setObjective("VT200-0654|showPopup up and then hide Pop up|");
                setInstruction(" wait for the pop up and then after 10 sec hide pop up is called  ");
                setExpected(" see if the pop up is showing the message, then it hides automatically after 10sec");

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
    }

    

    it("VT200-0656 |showStatus|", function () {

        runs(function () {
            setObjective("VT200-0656|showStatus|");
            setInstruction("wait for the status message to pop up");
            setExpected("see if the status message is shown with title , message and hide button label click on hide button to see if the popup is closed ");
            Rho.Notification.showStatus('MyAlert', 'This is status message', 'click to hide');
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

    it("VT200-0657 |showPopup with Message and title , icon and buttons, with callback for buttton |", function () {

        runs(function () {
            setObjective("VT200-0657 |showPopup with Message and title , icon and buttons, with callback for buttton |");
            setInstruction(" wait for the status message to pop up click on any button and check the log for callback event fired ");
            setExpected(" see if the pop up is showing the message, check the log and see three parameters button id,,title and index is displayed or not and then pass  ");
            var propertyMap = {message: 'This is a pop up for callback', buttons: [
                {id: 'yes', title: 'yes'},
                'No',
                'Cancel'
            ], title: 'MyTitle', icon: '/app/Notification/icon.png'};
            Rho.Notification.showPopup(propertyMap, buttonCallback);
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
