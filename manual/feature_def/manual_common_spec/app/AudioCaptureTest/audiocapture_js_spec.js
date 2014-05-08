describe("Audio Capture Test", function(){

    var createPropertyArray = function(arrData){
        var arrAudio = {};

        if(arrData['fileName']){
            arrAudio['fileName'] = arrData['fileName']
        }
        else{
            arrAudio['fileName'] = Rho.RhoFile.join(AudioCapturedFolder,"myaudio");
        }

        if(arrData["maxDuration"])
            arrAudio['maxDuration'] = arrData['maxDuration'];
        if(arrData['encoder'])
            arrAudio['encoder'] = arrData['encoder'];

        return arrAudio;
    };

    var AudioCapturedFolder = Rho.RhoFile.join( Rho.Application.userFolder, "audio" );
    Rho.RhoFile.makeDir(AudioCapturedFolder);

    var audioCallBack = function (args) {
        var resultDiv = document.getElementById('actResult');
        resultDiv.innerHTML = JSON.stringify(args);
        resultDiv.style.display = 'block';
        
        //File Exist Check
        if(Rho.RhoFile.exists(args['fileName'])){
            // Audio Play
            Rho.Mediaplayer.start(args['fileName']);
            setTimeout(function(){
                Rho.Mediaplayer.stop();
            },30000);
        }
        else{
            resultDiv.innerHTML = resultDiv.innerHTML + "<br/>File Not Exist";
        }
        
    }

    beforeEach(function () {
        
    });

    afterEach(function () {
        /* ... Tear it down ... */
        var resultDiv = document.getElementById('actResult');
        resultDiv.innerHTML = "";
        resultDiv.style.display = 'none';
        playtime = false;
    });


    var arrAudioCapture = {};
    arrAudioCapture['maxDuration'] = {
        "values": [10000, 60000, 1000, 1500, 500 , 0, -3000, null],
        "expected": "Callback should return ok and full file path of recored audiofile and Capture audio duration should be "
    };
    
    arrAudioCapture['fileName']= {
        "values":  ["audio_123", "1234", "12345_$", "audio_capture", "audi!@#*%123", null],
        "expected": "Callback should return ok and full file path of recored audiofile and captured audio should get save with the fileName as "
    };
    
    if(isAndroidPlatform()){
        arrAudioCapture['encoder']= {
            "values": [Rho.AudioCapture.ENCODER_AAC, Rho.AudioCapture.ENCODER_AMR_NB, Rho.AudioCapture.ENCODER_AMR_WB, "INVALID", null],
            //"values": ["AAC", "AMR_NB", "AMR_WB", "INVALID", null],
            "expected": "Callback should return ok and full file path of recored audiofile and in captured audio for ENCODER_AAC as .mp4, ENCODER_AMR_NB & ENCODER_AMR_WB as .3gpp "
        };
    }

    for (var object in arrAudioCapture) {

        (function(propertyName,listPropertyValue){

            for (var i = 0; i < listPropertyValue['values'].length; i++) {
                
                (function(propertyValue){
                    
                    it('set '+propertyName+'with value '+ propertyValue, function () {
                       dispTestCaseRunning(jasmine.getEnv().currentSpec.description);
                       dispExpectedResult(listPropertyValue['expected'] + propertyValue);
                       
                       _result.waitToRunTest();
                       var arrayData = {};
                       arrayData[propertyName] = propertyValue;
                       var data = createPropertyArray(arrayData);
                       runs(function () {
                           //alert(JSON.stringify(data));
                           Rho.AudioCapture.start(data, audioCallBack);
                       });
                       
                       _result.waitForResponse();
                   });
               
               })(listPropertyValue['values'][i])
                
            }

        })(object,arrAudioCapture[object]);
       
    }


    if(isWindowsMobilePlatform()){

        it('call start with filename set to "myaudio.wav" with extension', function () {
            dispTestCaseRunning(jasmine.getEnv().currentSpec.description);
            dispExpectedResult('Callback should return ok and full file path of recored audiofile and captured audio should get save with the fileName as myaudio.wav');
            
            _result.waitToRunTest();

            var fname = Rho.RhoFile.join(AudioCapturedFolder,"myaudio.wav");

            runs(function(){
                Rho.AudioCapture.start({'fileName': fname, 'maxDuration': 10000}, audioCallBack);
            });
            
            _result.waitForResponse();
        });

        it('call start with filename set to "\\Temp\\myaudio"', function () {
            dispTestCaseRunning(jasmine.getEnv().currentSpec.description);
            dispExpectedResult('Callback should return ok and full file path of recored audiofile and captured audio should get save with the fileName as myaudio in Temp folder');
            
            _result.waitToRunTest();

            var dirName = "\\Temp";
            var isDirExists = Rho.RhoFile.isDir(dirName);

            runs(function(){
                
                if(isDirExists == false){
                    Rho.RhoFile.makeDir(dirName);
                }

                Rho.AudioCapture.start({'fileName': "\\Temp\\myaudio", 'maxDuration': 10000}, audioCallBack);
            });
            
            _result.waitForResponse();
        });
        
        it('call start with filename set to "\\Temp\\myaudio.wav"', function () {
            dispTestCaseRunning(jasmine.getEnv().currentSpec.description);
            dispExpectedResult('Callback should return ok and full file path of recored audiofile and captured audio should get save with the fileName as myaudio in Temp folder');
            
            _result.waitToRunTest();

            var dirName = "\\Temp";
            var isDirExists = Rho.RhoFile.isDir(dirName);

            runs(function(){
                
                if(isDirExists == false){
                    Rho.RhoFile.makeDir(dirName);
                }

                Rho.AudioCapture.start({'fileName': "\\Temp\\myaudio.wav", 'maxDuration': 10000}, audioCallBack);
            });
            
            _result.waitForResponse();
        });
        
        it('call start with filename set to path which does not exists in device \\create\\audio', function () {
            dispTestCaseRunning(jasmine.getEnv().currentSpec.description);
            dispExpectedResult('Callback should return proper error message');
            
            _result.waitToRunTest();

            runs(function(){
                Rho.AudioCapture.start({'fileName': "\\create\\audio", 'maxDuration': 10000}, audioCallBack);
            });

            _result.waitForResponse();
        });

    }



    if(isAndroidPlatform()){

       it('call start with filename set to "myaudio.mp4" with extension', function () {
            dispTestCaseRunning(jasmine.getEnv().currentSpec.description);
            dispExpectedResult('Callback should return ok and full file path of recored audiofile and captured audio should get save with the fileName as myaudio.mp4');
            
            _result.waitToRunTest();

            var fname = Rho.RhoFile.join(AudioCapturedFolder,"myaudio.mp4");

            runs(function(){
                Rho.AudioCapture.start({'fileName': fname, 'maxDuration': 10000}, audioCallBack);
            });
            
            _result.waitForResponse();
        });


        it('call start with filename set to "/sdcard/Temp/myaudio"', function () {
            dispTestCaseRunning(jasmine.getEnv().currentSpec.description);
            dispExpectedResult('Callback should return ok and full file path of recored audiofile and captured audio should get save with the fileName as myaudio in /sdcard/Temp folder');
            
            _result.waitToRunTest();

            var dirName = "/sdcard/Temp";
            var isDirExists = Rho.RhoFile.isDir(dirName);

            runs(function(){
                
                if(isDirExists == false){
                    Rho.RhoFile.makeDir(dirName);
                }

                Rho.AudioCapture.start({'fileName': "/sdcard/Temp/myaudio", 'maxDuration': 10000}, audioCallBack);
            });
            
            _result.waitForResponse();
        });

        it('call start with filename set to "/sdcard/Temp/myaudio.mp4"', function () {
            dispTestCaseRunning(jasmine.getEnv().currentSpec.description);
            dispExpectedResult('Callback should return ok and full file path of recored audiofile and captured audio should get save with the fileName as myaudio in /sdcard/Temp folder');
            
            _result.waitToRunTest();

            var dirName = "/sdcard/Temp";
            var isDirExists = Rho.RhoFile.isDir(dirName);

            runs(function(){
                
                if(isDirExists == false){
                    Rho.RhoFile.makeDir(dirName);
                }

                Rho.AudioCapture.start({'fileName': "/sdcard/Temp/myaudio.mp4", 'maxDuration': 10000}, audioCallBack);
            });
            
            _result.waitForResponse();
        });             
        
        it('call start with filename set to path which does not exists in device /create/audio', function () {
            dispTestCaseRunning(jasmine.getEnv().currentSpec.description);
            dispExpectedResult('Callback should return proper error message');
            
            _result.waitToRunTest();

            runs(function(){
                Rho.AudioCapture.start({'fileName': "/create/audio", 'maxDuration': 10000}, audioCallBack);
            });

            _result.waitForResponse();
        });
        
        //same name audio files with different encoders test series
        
        it('capture the audio with two different encoders(ENCODER_ACC and ENCODER_AMR_NB) with same fileName - 1st part', function () {
            dispTestCaseRunning(jasmine.getEnv().currentSpec.description);
            dispExpectedResult('Callback should return ok and full file path of recored audiofile and should capture audio files in Application folder with fileName as audioencode1.mp4');
            
            _result.waitToRunTest();

            var fname = Rho.RhoFile.join(AudioCapturedFolder,"audioencode1");

            runs(function(){
                Rho.AudioCapture.start({'fileName': fname, 'maxDuration': 10000}, audioCallBack);
            });

            _result.waitForResponse();
        });

        it('capture the audio with two different encoders(ENCODER_ACC and ENCODER_AMR_NB) with same fileName - 2nd part', function () {
            dispTestCaseRunning(jasmine.getEnv().currentSpec.description);
            dispExpectedResult('Callback should return ok and full file path of recored audiofile and there should be two captured audio files in Application folder with fileName as audioencode1.mp4 and audioencode1.3gpp');
            
            _result.waitToRunTest();

            var fname = Rho.RhoFile.join(AudioCapturedFolder,"audioencode1");

            runs(function(){
                Rho.AudioCapture.start({'fileName': fname, 'maxDuration': 10000, 'encoder': Rho.AudioCapture.ENCODER_AMR_NB}, audioCallBack);
            });

            _result.waitForResponse();
        });
        
        it('capture the audio with two different encoders(ENCODER_ACC and ENCODER_AMR_WB) with same fileName - 1st part', function () {
            dispTestCaseRunning(jasmine.getEnv().currentSpec.description);
            dispExpectedResult('Callback should return ok and full file path of recored audiofile and should capture audio files in Application folder with fileName as audioencode2.mp4');
            
            _result.waitToRunTest();

            var fname = Rho.RhoFile.join(AudioCapturedFolder,"audioencode2");

            runs(function(){
                Rho.AudioCapture.start({'fileName': fname, 'maxDuration': 10000}, audioCallBack);
            });

            _result.waitForResponse();
        });

        it('capture the audio with two different encoders(ENCODER_ACC and ENCODER_AMR_WB) with same fileName - 2nd part', function () {
            dispTestCaseRunning(jasmine.getEnv().currentSpec.description);
            dispExpectedResult('Callback should return ok and full file path of recored audiofile and there should be two captured audio files in Application folder with fileName as audioencode2.mp4 and audioencode2.3gpp');
            
            _result.waitToRunTest();

            var fname = Rho.RhoFile.join(AudioCapturedFolder,"audioencode2");

            runs(function(){
                Rho.AudioCapture.start({'fileName': fname, 'maxDuration': 10000, 'encoder': Rho.AudioCapture.ENCODER_AMR_WB}, audioCallBack);
            });

            _result.waitForResponse();
        });
        
        it('capture the audio with two different encoders(ENCODER_AMR_NB and ENCODER_AMR_WB) with same fileName - 1st part', function () {
            dispTestCaseRunning(jasmine.getEnv().currentSpec.description);
            dispExpectedResult('Callback should return ok and full file path of recored audiofile and should capture audio files in Application folder with fileName as audioencode3.3gpp');
            
            _result.waitToRunTest();

            var fname = Rho.RhoFile.join(AudioCapturedFolder,"audioencode3");

            runs(function(){
                Rho.AudioCapture.start({'fileName': fname, 'maxDuration': 10000, 'encoder': Rho.AudioCapture.ENCODER_AMR_NB}, audioCallBack);
            });

            _result.waitForResponse();
        });

        it('capture the audio with two different encoders(ENCODER_AMR_NB and ENCODER_AMR_WB) with same fileName - 2nd part', function () {
            dispTestCaseRunning(jasmine.getEnv().currentSpec.description);
            dispExpectedResult('Callback should return ok and full file path of recored audiofile and first time captured file should get overwritten by second time captured file so only one file should be present in device path as audioencode3.3gpp');
            
            _result.waitToRunTest();

            var fname = Rho.RhoFile.join(AudioCapturedFolder,"audioencode3");

            runs(function(){
                Rho.AudioCapture.start({'fileName': fname, 'maxDuration': 10000, 'encoder': Rho.AudioCapture.ENCODER_AMR_WB}, audioCallBack);
            });

            _result.waitForResponse();
        });
    }

    

    it('call start with filename set to only "audiotest"', function () {
        dispTestCaseRunning(jasmine.getEnv().currentSpec.description);
        dispExpectedResult('capture audio should get saved in should save in root folder with fileName as audiotest (in sdcard in case of android)');
        
        _result.waitToRunTest();

        runs(function(){
            Rho.AudioCapture.start({'fileName': "audiotest", 'maxDuration': 10000}, audioCallBack);
        });

        _result.waitForResponse();
    });

    it('overWrite the capture file - 1st part', function () {
        dispTestCaseRunning(jasmine.getEnv().currentSpec.description);
        dispExpectedResult('Callback should return ok and full file path of recored audiofile and captured audio');
        
        _result.waitToRunTest();

        var fname = Rho.RhoFile.join(AudioCapturedFolder,"audiooverwrite");

        runs(function(){
            Rho.AudioCapture.start({'fileName': "audiooverwrite", 'maxDuration': 10000}, audioCallBack);
        });

        _result.waitForResponse();
    });

    it('overWrite the capture file - 2nd part', function () {
        dispTestCaseRunning(jasmine.getEnv().currentSpec.description);
        dispExpectedResult('Callback should return ok and full file path of recored audiofile and captured audio should overwrite the file with new captured fille');
        
        _result.waitToRunTest();

        var fname = Rho.RhoFile.join(AudioCapturedFolder,"audiooverwrite");

        runs(function(){
            Rho.AudioCapture.start({'fileName': "audiooverwrite", 'maxDuration': 15000}, audioCallBack);
        });
        
        _result.waitForResponse();
    }); 
    
    
    var arrStopTime = [2000, 4000, 10000];

    for (var i = 0; i < arrStopTime.length; i++) {
        (function(valStopTime){
            
            it('call stop method after capturing '+ valStopTime +' msecs of audio capture', function () {
                dispTestCaseRunning(jasmine.getEnv().currentSpec.description);
                dispExpectedResult('Callback should return ok and full file path of recored audiofile and Captured audio duration should be ' + valStopTime + ' msecs in audiowithstop');
                
                _result.waitToRunTest();
                
                var fname = Rho.RhoFile.join(AudioCapturedFolder,"audiowithstop");

                runs(function(){
                    Rho.AudioCapture.start({'fileName': fname, 'maxDuration': 10000}, audioCallBack);

                    setTimeout(function(){
                        Rho.Mediaplayer.stop();
                    },valStopTime);
                });
                
                _result.waitForResponse();
            });
        
        })(arrStopTime[i])
    }
    
    var arrCancelTime = [3000, 10000];

    for (var i = 0; i < arrCancelTime.length; i++) {
        (function(valCancelTime){
            
            it('call stop method after capturing '+ valCancelTime +' msecs of audio capture', function () {
                dispTestCaseRunning(jasmine.getEnv().currentSpec.description);
                dispExpectedResult('Callback should return CANCEL Captured audio for ' + valCancelTime + ' msecs should get discarded and it should not save on device');
                
                _result.waitToRunTest();
                
                var fname = Rho.RhoFile.join(AudioCapturedFolder,"audiowithcancel");

                runs(function(){
                    Rho.AudioCapture.start({'fileName': fname, 'maxDuration': 15000}, audioCallBack);

                    setTimeout(function(){
                        Rho.AudioCapture.cancel();
                    },valCancelTime);
                });
                
                _result.waitForResponse();
            });
        
        })(arrCancelTime[i])
    }    
   
    it('call start method two times continusly', function () {
        dispTestCaseRunning(jasmine.getEnv().currentSpec.description);
        dispExpectedResult('First time call of satrt method should get discarded on calling start method second time<br/>and  Callback should return ok and full file path of recored audiofile and captured audio should save  on the device audiowithstart');
        
        _result.waitToRunTest();

        var fname = Rho.RhoFile.join(AudioCapturedFolder,"audiowithstart");

        runs(function(){
            Rho.AudioCapture.start({'fileName': fname, 'maxDuration': 10000}, audioCallBack);
            Rho.AudioCapture.start({'fileName': fname, 'maxDuration': 10000}, audioCallBack);
        });
        
        _result.waitForResponse();
    });
    
    it('call stop method after capturing 10 seconds of audio capture and again call cancel method continuosly', function () {
        dispTestCaseRunning(jasmine.getEnv().currentSpec.description);
        dispExpectedResult('Callback should return ok and full file path of recored audiofile and captured audio duration should be 10 seconds in audiowithstart1');
        
        _result.waitToRunTest();

        var fname = Rho.RhoFile.join(AudioCapturedFolder,"audiowithstart1");

        runs(function(){
            Rho.AudioCapture.start({'fileName': fname, 'maxDuration': 15000}, audioCallBack);

            setTimeout(function(){
                Rho.AudioCapture.stop();
            },10000);
        });

        runs(function(){
            Rho.AudioCapture.cancel();
        });

        _result.waitForResponse();
    });
    
    it('call cancel method after capturing 10 seconds of audio capture and again call stop method continuosly', function () {
        dispTestCaseRunning(jasmine.getEnv().currentSpec.description);
        dispExpectedResult('Callback should return cancel and Captured audio for 10 seconds should get discarded and it should not save on device');
        
        _result.waitToRunTest();

        var fname = Rho.RhoFile.join(AudioCapturedFolder,"audiocancel");

        runs(function(){
            Rho.AudioCapture.start({'fileName': fname, 'maxDuration': 15000}, audioCallBack);

            setTimeout(function(){
                Rho.AudioCapture.cancel();
            },10000);
        });

        runs(function(){
            Rho.AudioCapture.stop();
        });

        _result.waitForResponse();
    });
    
    it('quit the application at the time of audio is getting captured should not crash', function () {
        dispTestCaseRunning(jasmine.getEnv().currentSpec.description);
        dispExpectedResult('Callback should return cancel and of Application should not behave abnormal or crash');
        
        _result.waitToRunTest();

        var fname = Rho.RhoFile.join(AudioCapturedFolder,"audioquit");

        runs(function(){
            Rho.AudioCapture.start({'fileName': fname, 'maxDuration': 15000}, audioCallBack);

            setTimeout(function(){
                Rho.Application.quit();
            },5000);
        });
        
        _result.waitForResponse();
    });
    
    it('try to capture the audio after application brought to forgorund from background', function () {
        dispTestCaseRunning(jasmine.getEnv().currentSpec.description);
        dispExpectedResult('Callback should return ok and full file path of recored audiofile  and In step 3 captured audio should play successfully audioTest1 <br/><br/>after step 3 captured audio file should play successfully audioTest2');
        
        _result.waitToRunTest();

        var fname1 = Rho.RhoFile.join(AudioCapturedFolder,"audioTest1");

        runs(function () {
            Rho.AudioCapture.start({'fileName': fname1, 'maxDuration': 5000}, audioCallBack);

            setTimeout(function(){
                Rho.Application.minimize();
            },7000);
        });

        var fname2 = Rho.RhoFile.join(AudioCapturedFolder,"audioTest2");

        runs(function () {
            Rho.Application.restore();

            Rho.AudioCapture.start({'fileName': fname2, 'maxDuration': 5000}, audioCallBack);
        });
        
        _result.waitForResponse();
    });
   
    it('try to capture the audio while application in background', function () {
        dispTestCaseRunning(jasmine.getEnv().currentSpec.description);
        dispExpectedResult('Callback should return cancel and Audio capture should get discarded when application sent to backgorund');
        
        _result.waitToRunTest();

        var fname = Rho.RhoFile.join(AudioCapturedFolder,"audiomin");

        runs(function () {
            Rho.AudioCapture.start({'fileName': fname, 'maxDuration': 15000}, audioCallBack);

            setTimeout(function(){
                Rho.Application.minimize();
            },5000);
        });

        _result.waitForResponse();
    });
    
    it('Call start method with all prooperties set', function () {
        dispTestCaseRunning(jasmine.getEnv().currentSpec.description);
        dispExpectedResult('Callback should return ok and full file path of recored audiofile and captured audio file name should be wmallparams, and audio duration should be 8 seconds');
        
        _result.waitToRunTest();

        var fname = Rho.RhoFile.join(AudioCapturedFolder,"wmallparams");

        runs(function () {
            Rho.AudioCapture.start({'fileName': fname, 'maxDuration': 8000}, audioCallBack);
        });

        _result.waitForResponse();
    });


    if(isAndroidPlatform){
        it('<br/>Call start method with all prooperties set', function () {
            dispTestCaseRunning(jasmine.getEnv().currentSpec.description);
            dispExpectedResult('Callback should return ok and full file path of recored audiofile and and captured audio file name should be captured with default source MIC, and captured audio fileName should be androidallparams with encoder ENCODER_AMR_WB  and audio duration should be 8 seconds');
            
            _result.waitToRunTest();
            
            var fname = Rho.RhoFile.join(AudioCapturedFolder,"androidallparams");

            runs(function () {
                Rho.AudioCapture.start({'fileName': fname, 'maxDuration': 8000, 'encoder': RHo.AudioCapture.ENCODER_AMR_WB}, audioCallBack);
            });

            _result.waitForResponse();
        });
    }

    it('set the properties after calling start', function () {
        dispTestCaseRunning(jasmine.getEnv().currentSpec.description);
        dispExpectedResult('audio file should get save with the name as audiotest, it should not take affect on any other properties set while capture is going on');
        
        _result.waitToRunTest();

        var fname = Rho.RhoFile.join(AudioCapturedFolder,"audiotest");
        var fname1 = Rho.RhoFile.join(AudioCapturedFolder,"myaudio");

        runs(function(){
            Rho.AudioCapture.start({'fileName': fname}, audioCallBack);
            Rho.AudioCapture.setProperties({
                'fileName': fname1,
                'maxDuration': 10000
            });
        });
        
        _result.waitForResponse();
    });

    it('minimize the application at time capture is going on', function () {
        dispTestCaseRunning(jasmine.getEnv().currentSpec.description);
        dispExpectedResult('Callback should return ok and full file path of recored audiofile, audio should successfully capture event the application is in minimize state');
        
        _result.waitToRunTest();

        var fname = Rho.RhoFile.join(AudioCapturedFolder,"audiominimze");

        runs(function(){
            Rho.AudioCapture.start({'fileName': fname, 'maxDuration': 10000}, audioCallBack);

            setTimeout(function(){
                Rho.Application.minimize();
            },4000);
        });
        
        _result.waitForResponse();
    });

    it('capture the audio at the time screen time out occurs', function () {
        dispTestCaseRunning(jasmine.getEnv().currentSpec.description);
        dispExpectedResult('Callback should return ok and full file path of recored audiofile');
        
        _result.waitToRunTest();

        var fname = Rho.RhoFile.join(AudioCapturedFolder,"audiotest");

        runs(function(){
            Rho.AudioCapture.start({'fileName': fname}, audioCallBack);
        });
        
        _result.waitForResponse();
    });

    it('suspend and resume the device at time of audio capture', function () {
        dispTestCaseRunning(jasmine.getEnv().currentSpec.description);
        dispExpectedResult('audio capture should get discarded/cancled');
        
        _result.waitToRunTest();

        var fname = Rho.RhoFile.join(AudioCapturedFolder,"audiotest");

        runs(function(){
            Rho.AudioCapture.start({'fileName': fname}, audioCallBack);
        });
        
        _result.waitForResponse();
    });

    it('Persitstant test/page navigation test', function () {
        dispTestCaseRunning(jasmine.getEnv().currentSpec.description);
        dispExpectedResult('callback should not get fire on other page/index page');
        
        _result.waitToRunTest();

        var fname = Rho.RhoFile.join(AudioCapturedFolder,"audiopersist");

        runs(function () {
            Rho.AudioCapture.start({'fileName': fname, 'maxDuration': 20000}, audioCallBack);

            setTimeout(function(){
                window.history.back();
            },5000);
        });

        _result.waitForResponse();
    });


});
