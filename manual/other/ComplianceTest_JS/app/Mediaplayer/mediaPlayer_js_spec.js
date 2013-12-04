function displayTestDescription(aString) {
    $("#description").text(aString);
}

function displayTestInstruction(aString) {
    $("#instruction").text(aString);
}

function displayTestExpectation(aString) {
    $("#expectation").text(aString);
}

var callbackCalled;
var ringtone_names = "";
var global_ringtones = "";
var testResult = '';
var captured = false;
var srvURL = "http://" + SERVER_HOST + ":" + SERVER_PORT.toString() + "/";
var httpsSrvURL = "https://" + SECURE_HOST + ":" + SECURE_PORT.toString() + "/";

var audioMediaPath = Rho.RhoFile.join(Rho.Application.modelFolderPath('Mediaplayer'), "MediaFiles/Audio");
var videoMediaPath = Rho.RhoFile.join(Rho.Application.modelFolderPath('Mediaplayer'), "MediaFiles/Video");


function getkeys(obj) {
    var allkeys = [];

    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            allkeys.push(key);
        }
    }

    return allkeys;
}

function ringtoneCallback(arguments) {
    var ringtones = arguments;
    global_ringtones = arguments;
    var htmlout = '<select name="choose a ringtone" size="1" id="item1">';
    var keys = getkeys(ringtones);
    ringtone_names = keys;
    for (var i = 0; i < keys.length; i++) {
        htmlout += '<option>';
        htmlout += keys[i];
        htmlout += '</option>'
    }
    htmlout += '</select>';
    document.getElementById('ringtones').innerHTML = htmlout;
    callbackCalled = true;
}
/*
 function ringtonePlayed()
 {
 callbackCalled = true;
 }

 function audioFilePlayed()
 {
 callbackCalled = true;
 }

 function videoFilePlayed()
 {
 callbackCalled = true;
 }
 */
describe("MediaPlayer", function () {
    beforeEach(function () {
        /* ... Set up your object ... */
    });

    afterEach(function () {
        /* ... Tear it down ... */
    });

    describe("Media Player", function () {
        var played = false;

        beforeEach(function () {
            callbackCalled = false;
            played = false;
            testResult = '';
            captured = false;
            dispCurrentProcess("");
        });

        // This test relies on the device having an audio file
        it("VT200-0646-Play Audio(valid file local)", function () {
            displayTestDescription("VT200-0646-Play | Audio(valid file local");
            displayTestInstruction("");
            displayTestExpectation("You should hear the music");

            runs(function () {
                audiolocation = Rho.RhoFile.join(audioMediaPath, "badfeeling.wav");

                Rho.Mediaplayer.start(audiolocation);
                setTimeout(function () {
                    played = true;
                }, 5000);
            });

            waitsFor(function () {
                return played;
            }, 'Audio file playing for 10 sec.', 6000);

            runs(function () {
                // Stop the audio file
                Rho.Mediaplayer.stop();
            });

            waitsFor(function () {
                dispCurrentProcess("Did you hear the Audio? ");
                return captured;
            }, 'Waiting for Pass or Fail.', 10000);


            runs(function () {
                expect(testResult).toEqual(true);
            });
        });

        xit("VTXXX-0005-Play Audio(mp3 file)", function () {
            displayTestDescription("VTXXX-0005 | Play Audio(mp3 file)");
            displayTestInstruction("");
            displayTestExpectation("You should hear the music");
            runs(function () {
                var platform = Rho.System.platform;
                var audiolocation = Rho.RhoFile.join(audioMediaPath, 'super_android_tune.mp3');

                Rho.Mediaplayer.start(audiolocation);
                setTimeout(function () {
                    played = true;
                }, 5000);
            });

            waitsFor(function () {
                return played;
            }, 'Audio file playing for 10 sec.', 6000);

            runs(function () {
                // Stop the audio file
                Rho.Mediaplayer.stop();
            });

            waitsFor(function () {
                dispCurrentProcess("Did you hear the Audio? ");
                return captured;
            }, 'Waiting for Pass or Fail.', 10000);


            runs(function () {
                expect(testResult).toEqual(true);
            });
        });

        if (isAnyButApplePlatform()) {

            it("VT200-0647-Play Audio(valid file local) and Stop", function () {
                displayTestDescription("VT200-0647 | Play Audio(valid file local) and Stop");
                displayTestInstruction("");
                displayTestExpectation("Playing should stops after 3 seconds");
                runs(function () {
                    var audiolocation = Rho.RhoFile.join(audioMediaPath, "super_android_tune.mp3");

                    Rho.Mediaplayer.start(audiolocation);
                    setTimeout(function () {
                        played = true;
                    }, 3000);
                });

                waitsFor(function () {
                    return played;
                }, 'Audio file playing for 10 sec.', 6000);

                runs(function () {
                    // Stop the audio file
                    Rho.Mediaplayer.stop();
                });

                waitsFor(function () {
                    dispCurrentProcess("Called Audio start AND Stop local after 3 seconds. Did the Audio stop mid-way??");
                    return captured;
                }, 'Waiting for Pass or Fail.', 10000);


                runs(function () {
                    expect(testResult).toEqual(true);
                });
            });
        }

//
//MediaPlayer Video Tests
//						
        it("VT200-0648-Play Video(valid file local)", function () {
            displayTestDescription("VT200-0648 | Play Video(valid file local)");
            displayTestInstruction("");
            displayTestExpectation("You should see video");
            runs(function () {
                var platform = Rho.System.platform;
                var Videolocation = Rho.RhoFile.join(videoMediaPath, "AMR-NB.mp4");

                Rho.Mediaplayer.startvideo(Videolocation);
                setTimeout(function () {
                    played = true;
                }, 5000);
            });

            waitsFor(function () {
                return played;
            }, 'Video file playing for 10 sec.', 6000);

            runs(function () {
                // Stop the video file
                Rho.Mediaplayer.stopvideo();
            });

            waitsFor(function () {
                dispCurrentProcess("Did you see the Video? ");
                return captured;
            }, 'Waiting for Pass or Fail.', 10000);


            runs(function () {
                expect(testResult).toEqual(true);
            });
        });

        xit("VTXXX-00019-Play Video(mp4 file)", function () {
            displayTestDescription("VTXXX-00019 | Play Video(mp4 file)");
            displayTestInstruction("");
            displayTestExpectation("You should see video");
            runs(function () {
                var platform = Rho.System.platform;
                var Videolocation = Rho.RhoFile.join(videoMediaPath, "test.mp4");

                Rho.Mediaplayer.startvideo(Videolocation);
                setTimeout(function () {
                    played = true;
                }, 5000);
            });

            waitsFor(function () {
                return played;
            }, 'Video file playing for 10 sec.', 6000);

            runs(function () {
                // Stop the Video file
                Rho.Mediaplayer.stopvideo();
            });

            waitsFor(function () {
                dispCurrentProcess("Did you see the Video?");
                return captured;
            }, 'Waiting for Pass or Fail.', 10000);


            runs(function () {
                expect(testResult).toEqual(true);
            });
        });

        if (isAnyButApplePlatform()) {

            it("VT200-0649-Play Video(valid file local) and Stop", function () {
                displayTestDescription("VT200-0649-Play Video(valid file local) and Stop");
                displayTestInstruction("");
                displayTestExpectation("Playing should stop after 3 seconds");
                runs(function () {
                    var Videolocation = Rho.RhoFile.join(videoMediaPath, "test.mp4");

                    Rho.Mediaplayer.startvideo(Videolocation);
                    setTimeout(function () {
                        played = true;
                    }, 3000);
                });

                waitsFor(function () {
                    return played;
                }, 'Video file playing for 10 sec.', 6000);

                runs(function () {
                    // Stop the Video file
                    Rho.Mediaplayer.stopvideo();
                });

                waitsFor(function () {
                    dispCurrentProcess("Called Video start AND Stop local after 3 seconds. Did the Video stop mid-way??");
                    return captured;
                }, 'Waiting for Pass or Fail.', 10000);


                runs(function () {
                    expect(testResult).toEqual(true);
                });
            });
        }
//
//Ringtone Tests
//
        var platform = Rho.System.platform;

        if ((platform != "WINDOWS") && (isAnyButApplePlatform())) {

            it("VT200-0650-Play Ringtone(valid file)", function () {
                displayTestDescription("VT200-0650 | Play Ringtone(valid file)");
                displayTestInstruction("");
                displayTestExpectation("You should hear a ringtone");
                runs(function () {
                    var chosen = ringtone_names[Math.floor((Math.random() * ringtone_names.length))];
                    var chosen = document.getElementById('item1').value;

                    Rho.Mediaplayer.playRingTone(global_ringtones[chosen]);
                    ringtonePlayed();
                });

                waitsFor(function () {
                    return callbackCalled;
                }, 'Ringtone should have been played.', 5000);

                runs(function () {
                    var testPassed = confirm("Did you hear a ringtone?");
                    expect(testPassed).toEqual(true);

                    // Stop the ring tone from playing.
                    Rho.Mediaplayer.stopRingTone();
                });
            });

            xit("VTXXX-00034-Play ringtone(Call Stop without Start)", function () {
                displayTestDescription("VTXXX-00034 | Play ringtone(Call Stop without Start)");
                displayTestInstruction("");
                displayTestExpectation("App should not crashes");
                runs(function () {

                    Rho.Mediaplayer.stopRingTone();

                });

                waitsFor(function () {
                    dispCurrentProcess("Called STOP without Start. Did it break anthing?");
                    return captured;
                }, 'Waiting for Pass or Fail.', 10000);


                runs(function () {
                    expect(testResult).toEqual(true);
                });
            });
        }
    });
});