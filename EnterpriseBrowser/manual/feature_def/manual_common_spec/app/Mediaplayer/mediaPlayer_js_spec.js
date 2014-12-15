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

var audioMediaPath = EB.RhoFile.join(EB.Application.modelFolderPath('Mediaplayer'), "MediaFiles/Audio");
var videoMediaPath = EB.RhoFile.join(EB.Application.modelFolderPath('Mediaplayer'), "MediaFiles/Video");

if(isAndroidPlatform() || isApplePlatform()){
	audioMediaPath = '/sdcard/Application/MediaFiles/Audio';
	videoMediaPath = '/sdcard/Application/MediaFiles/Video';
	//audiolocation = EB.RhoFile.join(audioMediaPath, "super_android_tune.mp3");
	//audiolocation = '/sdcard/Application/super_android_tune.mp3';
}

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
         it("VTXXX-0001-Play Audio(valid file local)", function () {
            displayTestDescription("VTXXX-0001-Play | Audio(valid file local");
            displayTestInstruction("");
            displayTestExpectation("You should hear the music");

            runs(function () {
                var audiolocation = EB.RhoFile.join(audioMediaPath, "badfeeling.wav");
				if(isAndroidPlatform() || isApplePlatform()){
	
				audiolocation =  EB.RhoFile.join(audioMediaPath, "super_android_tune.mp3");
				}
				alert(audiolocation);
                EB.Mediaplayer.start(audiolocation);
				//EB.Mediaplayer.startvideo(audiolocation);
                setTimeout(function () {
                    played = true;
                }, 5000);
            });

            waitsFor(function () {
                return played;
            }, 'Audio file playing for 10 sec.', 6000);

            runs(function () {
                // Stop the audio file
                EB.Mediaplayer.stop();
            });

            waitsFor(function () {
                dispCurrentProcess("Did you hear the Audio? ");
                return captured;
            }, 'Waiting for Pass or Fail.', 10000);


            runs(function () {
                expect(testResult).toEqual(true);
            });
        }); 

         it("VTXXX-0002-Play Audio(valid file remote http)", function () {
            displayTestDescription("VTXXX-0002 | Play Audio(valid file remote http");
            displayTestInstruction("");
            displayTestExpectation("You should hear the music");

            runs(function () {
                   // var path = EB.RhoFile.join(srvURL, "badfeeling.wav");
				var path = "http://10.233.85.82:8081/badfeeling.wav";
				alert(path);
                EB.Mediaplayer.start(path);
				
                setTimeout(function () {
                    played = true;
                }, 5000);
            });

            waitsFor(function () {
                return played;
            }, 'Audio file playing for 10 sec.', 6000);

            runs(function () {
                // Stop the audio file
                EB.Mediaplayer.stop();
            });

            waitsFor(function () {
                dispCurrentProcess("Is audio file got played and stopped ? ");
                return captured;
            }, 'Waiting for Pass or Fail.', 10000);


            runs(function () {
                expect(testResult).toEqual(true);
            });
        }); 


        if (isAnyButApplePlatform()) {
            it("VTXXX-0003-Play Audio(valid file remote https)", function () {
                displayTestDescription("VTXXX-0003 | Play Audio(valid file remote https");
                displayTestInstruction("");
                displayTestExpectation("You should hear the music");

                runs(function () {
                    var path = httpsSrvURL + "hello.mp3";
					alert(path);
                    EB.Mediaplayer.start(path);
                    setTimeout(function () {
                        played = true;
                    }, 5000);
                });

                waitsFor(function () {
                    return played;
                }, 'Audio file playing for 10 sec.', 6000);

                runs(function () {
                    // Stop the audio file
                    EB.Mediaplayer.stop();
                });

                waitsFor(function () {
                    dispCurrentProcess("Is audio file got played and stopped ? ");
                    return captured;
                }, 'Waiting for Pass or Fail.', 10000);


                runs(function () {
                    expect(testResult).toEqual(true);
                });
            });
        }
        ; 
         it("VTXXX-0004-Play Audio(wav file)", function () {
            displayTestDescription("VTXXX-0004 | Play Audio(wav file)");
            displayTestInstruction("");
            displayTestExpectation("You should hear the music");

            runs(function () {
                var platform = EB.System.platform;
                var audiolocation = EB.RhoFile.join(audioMediaPath, 'badfeeling.wav');
				if(isAndroidPlatform() || isApplePlatform()){
	
				audiolocation =  EB.RhoFile.join(audioMediaPath, "badfeeling.wav");
				}
				//var audiolocation = '/sdcard/Application/badfeeling.wav';
				alert(audiolocation);
                EB.Mediaplayer.start(audiolocation);
                setTimeout(function () {
                    played = true;
                }, 5000);
            });

            waitsFor(function () {
                return played;
            }, 'Audio file playing for 10 sec.', 6000);

            runs(function () {
                // Stop the audio file
                EB.Mediaplayer.stop();
            });

            waitsFor(function () {
                dispCurrentProcess("Did you hear the Audio? ");
                return captured;
            }, 'Waiting for Pass or Fail.', 10000);


            runs(function () {
                expect(testResult).toEqual(true);
            });
        }); 

         it("VTXXX-0005-Play Audio(mp3 file)", function () {
            displayTestDescription("VTXXX-0005 | Play Audio(mp3 file)");
            displayTestInstruction("");
            displayTestExpectation("You should hear the music");
            runs(function () {
                var platform = EB.System.platform;
                //var audiolocation = EB.RhoFile.join(audioMediaPath, 'hello.mp3');
				var audiolocation = '/sdcard/Application/hello.mp3';
				if(isAndroidPlatform() || isApplePlatform()){
	
				audiolocation =  EB.RhoFile.join(audioMediaPath, "super_android_tune.mp3");
				}
				alert(audiolocation);
                EB.Mediaplayer.start(audiolocation);
                setTimeout(function () {
                    played = true;
                }, 5000);
            });

            waitsFor(function () {
                return played;
            }, 'Audio file playing for 10 sec.', 6000);

            runs(function () {
                // Stop the audio file
                EB.Mediaplayer.stop();
            });

            waitsFor(function () {
                dispCurrentProcess("Did you hear the Audio? ");
                return captured;
            }, 'Waiting for Pass or Fail.', 10000);


            runs(function () {
                expect(testResult).toEqual(true);
            });
        }); 

         xit("VTXXX-0006-Play Audio(mp4 file)", function () {
            displayTestDescription("VTXXX-0006 | Play Audio(mp4 file)");
            displayTestInstruction("");
            displayTestExpectation("You should hear the music");
            runs(function () {
                var platform = EB.System.platform;
                var audiolocation = EB.RhoFile.join(audioMediaPath, 'video.mp4');
				if(isAndroidPlatform() || isApplePlatform()){
	
				audiolocation =  EB.RhoFile.join(videoMediaPath, "video.mp4");
				}
				//var audiolocation = '/sdcard/Application/VID.mp4';

                EB.Mediaplayer.start(audiolocation);
                setTimeout(function () {
                    played = true;
                }, 5000);
            });

            waitsFor(function () {
                return played;
            }, 'Audio file playing for 10 sec.', 6000);

            runs(function () {
                // Stop the audio file
                EB.Mediaplayer.stop();
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

            it("VTXXX-0007-Play Audio(wma file)", function () {
                displayTestDescription("VTXXX-0007 | Play Audio(wma file)");
                displayTestInstruction("");
                displayTestExpectation("You should hear the music");
                runs(function () {
                    var platform = EB.System.platform;
                    //var audiolocation = EB.RhoFile.join(audioMediaPath, 'badfeeling.wav');
					var audiolocation = '/sdcard/Application/badfeeling.wav';
				alert(audiolocation);
                    EB.Mediaplayer.start(audiolocation);
                    setTimeout(function () {
                        played = true;
                    }, 5000);
                });

                waitsFor(function () {
                    return played;
                }, 'Audio file playing for 10 sec.', 6000);

                runs(function () {
                    // Stop the audio file
                    EB.Mediaplayer.stop();
                });

                waitsFor(function () {
                    dispCurrentProcess("Did you hear the Audio? ");
                    return captured;
                }, 'Waiting for Pass or Fail.', 10000);


                runs(function () {
                    expect(testResult).toEqual(true);
                });
            });
        } 
         xit("VTXXX-0008-Play Audio(null)", function () {
            displayTestDescription("VTXXX-0008 | Play Audio(null)");
            displayTestInstruction("");
            displayTestExpectation("You should not hear the music, app should not crashes");
            runs(function () {

                EB.Mediaplayer.start(null);

            });

            waitsFor(function () {
                dispCurrentProcess("Called Audio start with null. Did it break anthing?");
                return captured;
            }, 'Waiting for Pass or Fail.', 10000);


            runs(function () {
                expect(testResult).toEqual(true);
            });
        }); 

         xit("VTXXX-0009-Play Audio(invalid Local file)", function () {
            displayTestDescription("VTXXX-0009 | Play Audio(invalid Local file)");
            displayTestInstruction("");
            displayTestExpectation("You should not hear the music, app should not crashes");
            runs(function () {
                var audiolocation = audioMediaPath + "xxx.wav";
			alert(audiolocation);
                EB.Mediaplayer.start(audiolocation);

            });

            waitsFor(function () {
                dispCurrentProcess("Called Audio start with invalid file. Did it break anything?");
                return captured;
            }, 'Waiting for Pass or Fail.', 10000);


            runs(function () {
                expect(testResult).toEqual(true);
            });
        }); 


         xit("VTXXX-00010-Play Audio(invalid remote URL)", function () {
            displayTestDescription("VTXXX-00010 | Play Audio(invalid remote URL");
            displayTestInstruction("");
            displayTestExpectation("You should not hear the music, app should not crashes");
            runs(function () {
                var audiolocation = "http://www.myinvalidURL.com/xxx.wav";

                EB.Mediaplayer.start(audiolocation);

            });

            waitsFor(function () {
                dispCurrentProcess("Called Audio start with invalid URL. Did it break anthing?");
                return captured;
            }, 'Waiting for Pass or Fail.', 10000);


            runs(function () {
                expect(testResult).toEqual(true);
            });
        }); 

        if (isAnyButApplePlatform()) {

            it("VTXXX-00011-Play Audio(valid file local) and Stop", function () {
                displayTestDescription("VTXXX-00011 | Play Audio(valid file local) and Stop");
                displayTestInstruction("");
                displayTestExpectation("Playing should stops after 3 seconds");
                runs(function () {
                    var audiolocation = EB.RhoFile.join(audioMediaPath, "Austin_Powers_death.wav");
					//var audiolocation = '/sdcard/Application/badfeeling.wav';
alert(audiolocation);
                    EB.Mediaplayer.start(audiolocation);
                    setTimeout(function () {
                        played = true;
                    }, 3000);
                });

                waitsFor(function () {
                    return played;
                }, 'Audio file playing for 10 sec.', 6000);

                runs(function () {
                    // Stop the audio file
                    EB.Mediaplayer.stop();
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

         if (isAnyButApplePlatform()) {

            it("VTXXX-00012-Play Audio(valid file remote http) and Stop", function () {
                displayTestDescription("VTXXX-00012 | Play Audio(valid file remote http) and Stop");
                displayTestInstruction("");
                displayTestExpectation("Playing should stops after 3 seconds");
                runs(function () {
                    //var audiolocation = "\\Program Files\\EB\\rho\\apps\\app\\Mediaplayer\\MediaFiles\\Audio\\super_android_tune.mp3";
					var srvHttpMediaDownload= "http://10.233.85.82:8081/Austin_Powers_death.wav";
                    //var srvHttpMediaDownload = EB.RhoFile.join(srvURL, "Austin_Powers_death.wav");
					//var path = EB.RhoFile.join(srvURL, "badfeeling.wav");
alert(srvHttpMediaDownload);
                    EB.Mediaplayer.start(srvHttpMediaDownload);
                    setTimeout(function () {
                        played = true;
                    }, 3000);
                });

                waitsFor(function () {
                    return played;
                }, 'Audio file playing for 10 sec.', 6000);

                runs(function () {
                    // Stop the audio file
                    EB.Mediaplayer.stop();
                });

                waitsFor(function () {
                    dispCurrentProcess("Called Audio start AND Stop remote after 3 seconds. Did the Audio stop mid-way??");
                    return captured;
                }, 'Waiting for Pass or Fail.', 10000);


                runs(function () {
                    expect(testResult).toEqual(true);
                });
            });
        }

        if (isAnyButApplePlatform()) {

            it("VTXXX-00013-Play Audio(valid file remote https) and Stop", function () {
                displayTestDescription("VTXXX-00013 | Play Audio(valid file remote https) and Stop");
                displayTestInstruction("");
                displayTestExpectation("Playing should stops after 3 seconds");
                runs(function () {
                    //var audiolocation = "\\Program Files\\manual_common_spec\\rho\\apps\\app\\Mediaplayer\\MediaFiles\\Audio\\super_android_tune.mp3";
                    var srvHttpsMediaDownload = EB.RhoFile.join(httpsSrvURL, "Austin_Powers_death.wav");

                    EB.Mediaplayer.start(srvHttpsMediaDownload);
                    setTimeout(function () {
                        played = true;
                    }, 3000);
                });

                waitsFor(function () {
                    return played;
                }, 'Audio file playing for 10 sec.', 6000);

                runs(function () {
                    // Stop the audio file
                    EB.Mediaplayer.stop();
                });

                waitsFor(function () {
                    dispCurrentProcess("Called Audio start AND Stop remote HTTPS after 3 seconds. Did the Audio stop mid-way??");
                    return captured;
                }, 'Waiting for Pass or Fail.', 10000);


                runs(function () {
                    expect(testResult).toEqual(true);
                });
            });
        }
        xit("VTXXX-00014-Play Audio(Call Stop without Start)", function () {
            displayTestDescription("VTXXX-00014 | Play Audio(Call Stop without Start");
            displayTestInstruction("");
            displayTestExpectation("App should not craches");
            runs(function () {

                EB.Mediaplayer.stop();

            });

            waitsFor(function () {
                dispCurrentProcess("Called Audio STOP without Start. Did it break anthing?");
                return captured;
            }, 'Waiting for Pass or Fail.', 10000);


            runs(function () {
                expect(testResult).toEqual(true);
            });
        }); 

//
//MediaPlayer Video Tests
//						
        it("VTXXX-00015-Play Video(valid file local)", function () {
            displayTestDescription("VTXXX-00015 | Play Video(valid file local)");
            displayTestInstruction("");
            displayTestExpectation("You should see video");
            runs(function () {
                var platform = EB.System.platform;
                var Videolocation = EB.RhoFile.join(videoMediaPath, "video.wmv");
				if(isAndroidPlatform() || isApplePlatform()){
	
				Videolocation =  EB.RhoFile.join(videoMediaPath, "video.mp4");
				}
				alert(Videolocation);
                EB.Mediaplayer.startvideo(Videolocation);
                setTimeout(function () {
                    played = true;
                }, 5000);
            });

            waitsFor(function () {
                return played;
            }, 'Video file playing for 10 sec.', 6000);

            runs(function () {
                // Stop the video file
                EB.Mediaplayer.stopvideo();
            });

            waitsFor(function () {
                dispCurrentProcess("Did you see the Video? ");
                return captured;
            }, 'Waiting for Pass or Fail.', 10000);


            runs(function () {
                expect(testResult).toEqual(true);
            });
        });

        it("VTXXX-00016-Play Video(valid file remote http)", function () {
            displayTestDescription("VTXXX-00016 | Play Video(valid file remote http)");
            displayTestInstruction("");
            displayTestExpectation("You should see video");
            runs(function () {
                var srvHttpMediaDownload = EB.RhoFile.join(srvURL, "video.wmv");
				if(isAndroidPlatform() || isApplePlatform()){
	
				srvHttpMediaDownload = EB.RhoFile.join(srvURL, "test.mp4");
				}
				alert(srvHttpMediaDownload);
                EB.Mediaplayer.startvideo(srvHttpMediaDownload);

                setTimeout(function () {
                    played = true;
                }, 5000);
            });

            waitsFor(function () {
                return played;
            }, 'Video file playing for 10 sec.', 6000);

            runs(function () {
                // Stop the Video file
                EB.Mediaplayer.stopvideo();
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
            it("VTXXX-00017-Play Video(valid file remote https)", function () {
                displayTestDescription("VTXXX-00017 | Play Video(valid file remote https)");
                displayTestInstruction("");
                displayTestExpectation("You should see video");
                runs(function () {
                    var srvHttpsMediaDownload = EB.RhoFile.join(httpsSrvURL, "video.wmv");
					if(isAndroidPlatform() || isApplePlatform()){
	
					srvHttpsMediaDownload = EB.RhoFile.join(srvURL, "video.mp4");
					}
					alert(srvHttpsMediaDownload);
                    EB.Mediaplayer.startvideo(srvHttpsMediaDownload);
                    setTimeout(function () {
                        played = true;
                    }, 5000);
                });

                waitsFor(function () {
                    return played;
                }, 'Video file playing for 10 sec.', 6000);

                runs(function () {
                    // Stop the Video file
                    EB.Mediaplayer.stopvideo();
                });

                waitsFor(function () {
                    dispCurrentProcess("Did you see the Video?");
                    return captured;
                }, 'Waiting for Pass or Fail.', 10000);


                runs(function () {
                    expect(testResult).toEqual(true);
                });
            });
        }
        ;
        /*it("VTXXX-00018-Play Video(3gp file)", function () {
            displayTestDescription("VTXXX-00018 | Play Video(3gp file)");
            displayTestInstruction("");
            displayTestExpectation("You should see video");
            runs(function () {
                var platform = EB.System.platform;
                var Videolocation = EB.RhoFile.join(videoMediaPath, "video.3gp");
alert(Videolocation);
                EB.Mediaplayer.startvideo(Videolocation);
                setTimeout(function () {
                    played = true;
                }, 5000);
            });

            waitsFor(function () {
                return played;
            }, 'Video file playing for 10 sec.', 6000);

            runs(function () {
                // Stop the Video file
                EB.Mediaplayer.stopvideo();
            });

            waitsFor(function () {
                dispCurrentProcess("Did you see the Video?");
                return captured;
            }, 'Waiting for Pass or Fail.', 10000);


            runs(function () {
                expect(testResult).toEqual(true);
            });
        });

        it("VTXXX-00019-Play Video(mp4 file)", function () {
            displayTestDescription("VTXXX-00019 | Play Video(mp4 file)");
            displayTestInstruction("");
            displayTestExpectation("You should see video");
            runs(function () {
                var platform = EB.System.platform;
                var Videolocation = EB.RhoFile.join(videoMediaPath, "test.mp4");

                EB.Mediaplayer.startvideo(Videolocation);
                setTimeout(function () {
                    played = true;
                }, 5000);
            });

            waitsFor(function () {
                return played;
            }, 'Video file playing for 10 sec.', 6000);

            runs(function () {
                // Stop the Video file
                EB.Mediaplayer.stopvideo();
            });

            waitsFor(function () {
                dispCurrentProcess("Did you see the Video?");
                return captured;
            }, 'Waiting for Pass or Fail.', 10000);


            runs(function () {
                expect(testResult).toEqual(true);
            });
        });
        
         it("VTXXX-00020-Play Video(mp4 file)", function() {
         runs(function() {
         var platform = EB.System.platform;
         var Videolocation = EB.RhoFile.join(videoMediaPath, "test.mp4");

         EB.Mediaplayer.startvideo(Videolocation);
         setTimeout(function() {
         played = true;
         }, 5000);
         });

         waitsFor(function()
         {
         return played;
         }, 'Video file playing for 10 sec.', 6000);

         runs(function()
         {
         // Stop the Video file
         EB.Mediaplayer.stopvideo();
         });

         waitsFor(function()
         {
         dispCurrentProcess("Did you see the Video? ");
         return captured;
         }, 'Waiting for Pass or Fail.', 10000);


         runs(function()
         {
         expect(testResult).toEqual(true);
         });
         });

        if (isAnyButApplePlatform()) {

            it("VTXXX-00021-Play Video(wma file)", function () {
                displayTestDescription("VTXXX-00021 | Play Video(wma file)");
                displayTestInstruction("");
                displayTestExpectation("You should see video");
                runs(function () {
                    var platform = EB.System.platform;
                    var Videolocation = EB.RhoFile.join(videoMediaPath, "dunkcontest2003.mwma");

                    EB.Mediaplayer.startvideo(Videolocation);
                    setTimeout(function () {
                        played = true;
                    }, 5000);
                });

                waitsFor(function () {
                    return played;
                }, 'Video file playing for 10 sec.', 6000);

                runs(function () {
                    // Stop the Video file
                    EB.Mediaplayer.stopvideo();
                });

                waitsFor(function () {
                    dispCurrentProcess("Did you see the Video? ");
                    return captured;
                }, 'Waiting for Pass or Fail.', 10000);


                runs(function () {
                    expect(testResult).toEqual(true);
                });
            });
        }
        it("VTXXX-00022-Play Video(null)", function () {
            displayTestDescription("VTXXX-00022 | Play Video(null)");
            displayTestInstruction("");
            displayTestExpectation("You should not see video, app should not crashes");
            runs(function () {

                EB.Mediaplayer.startvideo(null);

            });

            waitsFor(function () {
                dispCurrentProcess("Called Video start with null. Did it break anthing?");
                return captured;
            }, 'Waiting for Pass or Fail.', 10000);


            runs(function () {
                expect(testResult).toEqual(true);
            });
        });

        xit("VTXXX-00023-Play Video(invalid Local file)", function () {
            displayTestDescription("VTXXX-00023 | Play Video(invalid Local file)");
            displayTestInstruction("");
            displayTestExpectation("You should not see video, app should not crashes");
            runs(function () {
                var Videolocation = EB.RhoFile.join(videoMediaPath, "xxx.wav");

                EB.Mediaplayer.startvideo(Videolocation);

            });

            waitsFor(function () {
                dispCurrentProcess("Called Video start with invalid file. Did it break anthing?");
                return captured;
            }, 'Waiting for Pass or Fail.', 10000);


            runs(function () {
                expect(testResult).toEqual(true);
            });
        });


        xit("VTXXX-00024-Play Video(invalid remote URL)", function () {
            displayTestDescription("VTXXX-00024 | Play Video(invalid remote URL)");
            displayTestInstruction("");
            displayTestExpectation("You should not see video, app should not crashes");
            runs(function () {
                var Videolocation = "http://www.myinvalidURL.com/xxx.wav";

                EB.Mediaplayer.startvideo(Videolocation);

            });

            waitsFor(function () {
                dispCurrentProcess("Called Video start with invalid URL. Did it break anthing?");
                return captured;
            }, 'Waiting for Pass or Fail.', 10000);


            runs(function () {
                expect(testResult).toEqual(true);
            });
        });
*/
        if (isAnyButApplePlatform()) {

            it("VTXXX-00025-Play Video(valid file local) and Stop", function () {
                displayTestDescription("VTXXX-00025-Play Video(valid file local) and Stop");
                displayTestInstruction("");
                displayTestExpectation("Playing should stop after 3 seconds");
                runs(function () {
                    var Videolocation = EB.RhoFile.join(videoMediaPath, "video.wmv");
					if(isAndroidPlatform() || isApplePlatform()){
	
					Videolocation =  EB.RhoFile.join(videoMediaPath, "test.mp4");
					}
					alert(Videolocation);
                    EB.Mediaplayer.startvideo(Videolocation);
                    setTimeout(function () {
                        played = true;
                    }, 3000);
                });

                waitsFor(function () {
                    return played;
                }, 'Video file playing for 10 sec.', 6000);

                runs(function () {
                    // Stop the Video file
                    EB.Mediaplayer.stopvideo();
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

        if (isAnyButApplePlatform()) {

            it("VTXXX-00026-Play Video(valid file remote http) and Stop", function () {
                displayTestDescription("VTXXX-00026 | Play Video(valid file remote http) and Stop");
                displayTestInstruction("");
                displayTestExpectation("Playing should stop after 3 seconds");
                runs(function () {
                    //var Videolocation = "\\Program Files\\manual_common_spec\\rho\\apps\\app\\Mediaplayer\\MediaFiles\\Video\\super_android_tune.mp3";
                    var srvHttpMediaDownload = EB.RhoFile.join(srvURL, "video.wmv");
					if(isAndroidPlatform() || isApplePlatform()){
	
					srvHttpMediaDownload =  EB.RhoFile.join(videoMediaPath, "video.mp4");
					}
					alert(srvHttpMediaDownload);
                    EB.Mediaplayer.startvideo(srvHttpMediaDownload);
                    setTimeout(function () {
                        played = true;
                    }, 3000);
                });

                waitsFor(function () {
                    return played;
                }, 'Video file playing for 10 sec.', 6000);

                runs(function () {
                    // Stop the Video file
                    EB.Mediaplayer.stopvideo();
                });

                waitsFor(function () {
                    dispCurrentProcess("Called Video start AND Stop remote after 3 seconds. Did the Video stop mid-way??");
                    return captured;
                }, 'Waiting for Pass or Fail.', 10000);


                runs(function () {
                    expect(testResult).toEqual(true);
                });
            });
        }

        if (isAnyButApplePlatform()) {

            it("VTXXX-00027-Play Video(valid file remote https) and Stop", function () {
                displayTestDescription("VTXXX-00027 | Play Video(valid file remote https) and Stop");
                displayTestInstruction("");
                displayTestExpectation("Playing should stop after 3 seconds")
                runs(function () {
                    //var Videolocation = "\\Program Files\\manual_common_spec\\rho\\apps\\app\\Mediaplayer\\MediaFiles\\Video\\super_android_tune.mp3";
                    var srvHttpsMediaDownload = EB.RhoFile.join(httpsSrvURL, "video.wmv");
					if(isAndroidPlatform() || isApplePlatform()){
	
					srvHttpsMediaDownload =  EB.RhoFile.join(videoMediaPath, "test.mp4");
					}
					alert(srvHttpsMediaDownload);
                    EB.Mediaplayer.startvideo(srvHttpsMediaDownload);
                    setTimeout(function () {
                        played = true;
                    }, 3000);
                });

                waitsFor(function () {
                    return played;
                }, 'Video file playing for 10 sec.', 6000);

                runs(function () {
                    // Stop the Video file
                    EB.Mediaplayer.stopvideo();
                });

                waitsFor(function () {
                    dispCurrentProcess("Called Video start AND Stop remote HTTPS after 3 seconds. Did the Video stop mid-way??");
                    return captured;
                }, 'Waiting for Pass or Fail.', 10000);


                runs(function () {
                    expect(testResult).toEqual(true);
                });
            });
        }
        it("VTXXX-00028-Play Video(Call Stop without Start)", function () {
            displayTestDescription("VTXXX-00028-Play Video(Call Stop without Start)");
            displayTestInstruction("");
            displayTestExpectation("App should not crashes")
            runs(function () {

                EB.Mediaplayer.stopvideo();

            });

            waitsFor(function () {
                dispCurrentProcess("Called Video STOP without Start. Did it break anthing?");
                return captured;
            }, 'Waiting for Pass or Fail.', 10000);


            runs(function () {
                expect(testResult).toEqual(true);
            });
        });

//
//Ringtone Tests
//
        var platform = EB.System.platform;

        if ((platform != "WINDOWS") && (isAnyButApplePlatform())) {
            it("VTXXX-00029-should be able to retrieve all ringtones", function () {
                displayTestDescription("VTXXX-00029 | should be able to retrieve all ringtones");
                displayTestInstruction("");
                displayTestExpectation("You should ringtones list");
                runs(function () {
                    EB.Mediaplayer.getAllRingtones(ringtoneCallback);
                });

                waitsFor(function () {
                    return callbackCalled;
                }, 'Ringtone Callback should have responded', 5000);

                runs(function () {
                    var testPassed = confirm("Do you see a list of ringtones?");
                    expect(testPassed).toEqual(true);
                });
            });

            it("VTXXX-00030-Play Ringtone(valid file)", function () {
                displayTestDescription("VTXXX-00030 | Play Ringtone(valid file)");
                displayTestInstruction("");
                displayTestExpectation("You should hear a ringtone");
                runs(function () {
                    var chosen = ringtone_names[Math.floor((Math.random() * ringtone_names.length))];
                    var chosen = document.getElementById('item1').value;

                    EB.Mediaplayer.playRingTone(global_ringtones[chosen]);
                    ringtonePlayed();
                });

                waitsFor(function () {
                    return callbackCalled;
                }, 'Ringtone should have been played.', 5000);

                runs(function () {
                    var testPassed = confirm("Did you hear a ringtone?");
                    expect(testPassed).toEqual(true);

                    // Stop the ring tone from playing.
                    EB.Mediaplayer.stopRingTone();
                });
            });

            it("VTXXX-00031-Play Ringtone(null)", function () {
                displayTestDescription("VTXXX-00031 | Play Ringtone(null)");
                displayTestInstruction("");
                displayTestExpectation("App should not crashes");
                runs(function () {
                    //var chosen = ringtone_names[Math.floor((Math.random()*ringtone_names.length))];
                    //var chosen = document.getElementById('item1').value;

                    EB.Mediaplayer.playRingTone(null);
                    //ringtonePlayed();
                });

                waitsFor(function () {
                    dispCurrentProcess("Called playRingTone with null. Did you hear the ringtone? Did it break anthing?");
                    return captured;
                }, 'Waiting for Pass or Fail.', 10000);

                runs(function () {
                    expect(testResult).toEqual(true);
                });
            });

            it("VTXXX-00032-Play Ringtone(invalid file local)", function () {
                displayTestDescription("VTXXX-00032 | Play Ringtone(invalid file local)");
                displayTestInstruction("");
                displayTestExpectation("App should not crashes");
                runs(function () {
                    //var chosen = ringtone_names[Math.floor((Math.random()*ringtone_names.length))];
                    //var chosen = document.getElementById('item1').value;

                    EB.Mediaplayer.playRingTone('Spring');
                    //ringtonePlayed();
                });

                waitsFor(function () {
                    dispCurrentProcess("Called playRingTone with invalid file. Did you hear the ringtone? Did it break anthing?");
                    return captured;
                }, 'Waiting for Pass or Fail.', 10000);

                runs(function () {
                    expect(testResult).toEqual(true);
                });
            });

            it("VTXXX-00033-Play Ringtone(valid file local) and Stop", function () {
                displayTestDescription("VTXXX-00033 | Play Ringtone(valid file local) and Stop");
                displayTestInstruction("");
                displayTestExpectation("Playing ringtone should stop after 3 seconds");
                runs(function () {
                    var chosen = ringtone_names[Math.floor((Math.random() * ringtone_names.length))];
                    var chosen = document.getElementById('item1').value;

                    EB.Mediaplayer.playRingTone(global_ringtones[chosen]);
                    setTimeout(function () {
                        played = true;
                    }, 3000);
                });

                waitsFor(function () {
                    return played;
                }, 'Video file playing for 10 sec.', 6000);

                runs(function () {
                    // Stop the Video file
                    EB.Mediaplayer.stopRingTone();
                });

                waitsFor(function () {
                    dispCurrentProcess("Called Video start AND Stop local after 3 seconds. Did the ringtone stop mid-way??");
                    return captured;
                }, 'Waiting for Pass or Fail.', 10000);


                runs(function () {
                    expect(testResult).toEqual(true);
                });
            });


            it("VTXXX-00034-Play ringtone(Call Stop without Start)", function () {
                displayTestDescription("VTXXX-00034 | Play ringtone(Call Stop without Start)");
                displayTestInstruction("");
                displayTestExpectation("App should not crashes");
                runs(function () {

                    EB.Mediaplayer.stopRingTone();

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