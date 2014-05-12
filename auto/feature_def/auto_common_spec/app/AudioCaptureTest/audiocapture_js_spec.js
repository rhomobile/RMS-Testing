describe('Rho.AudioCapture JS API', function () {
    describe('Rho.AudioCapture APIs Set Test', function () {
        if (["ANDROID"].indexOf(Rho.System.platform) != -1) {
            describe('Setting encoder', function () {
                it('Should Set encoder to ENCODER_AAC using direct calling method', function () {
                    Rho.AudioCapture.encoder = Rho.AudioCapture.ENCODER_AAC;
                    expect(Rho.AudioCapture.encoder).toEqual(Rho.AudioCapture.ENCODER_AAC);
                });
                it('Should Set encoder to AAC using setProperty calling method', function () {
                    Rho.AudioCapture.setProperty('encoder', Rho.AudioCapture.ENCODER_AAC);
                    expect(Rho.AudioCapture.getProperty('encoder')).toEqual(Rho.AudioCapture.ENCODER_AAC);
                });
                it('Should Set encoder to AAC using setProperties calling method', function () {
                    Rho.AudioCapture.setProperties({
                        'encoder': Rho.AudioCapture.ENCODER_AAC
                    });
                    var data = Rho.AudioCapture.getProperties([Rho.AudioCapture.ENCODER_AAC]);
                    data = data['encoder'];
                    expect(data).toEqual(Rho.AudioCapture.ENCODER_AAC);
                });
                it('Should Set encoder to ENCODER_AMR_NB using direct calling method', function () {
                    Rho.AudioCapture.encoder = Rho.AudioCapture.ENCODER_AMR_NB;
                    expect(Rho.AudioCapture.encoder).toEqual(Rho.AudioCapture.ENCODER_AMR_NB);
                });
                it('Should Set encoder to AMR_NB using setProperty calling method', function () {
                    Rho.AudioCapture.setProperty('encoder', Rho.AudioCapture.ENCODER_AMR_NB);
                    expect(Rho.AudioCapture.getProperty('encoder')).toEqual(Rho.AudioCapture.ENCODER_AMR_NB);
                });
                it('Should Set encoder to AMR_NB using setProperties calling method', function () {
                    Rho.AudioCapture.setProperties({
                        'encoder': Rho.AudioCapture.ENCODER_AMR_NB
                    });
                    var data = Rho.AudioCapture.getProperties(['encoder']);
                    data = data['encoder'];
                    expect(data).toEqual(Rho.AudioCapture.ENCODER_AMR_NB);
                });
                it('Should Set encoder to ENCODER_AMR_WB using direct calling method', function () {
                    Rho.AudioCapture.encoder = Rho.AudioCapture.ENCODER_AMR_WB;
                    expect(Rho.AudioCapture.encoder).toEqual(Rho.AudioCapture.ENCODER_AMR_WB);
                });
                it('Should Set encoder to AMR_WB using setProperty calling method', function () {
                    Rho.AudioCapture.setProperty('encoder', Rho.AudioCapture.ENCODER_AMR_WB);
                    expect(Rho.AudioCapture.getProperty('encoder')).toEqual(Rho.AudioCapture.ENCODER_AMR_WB);
                });
                it('Should Set encoder to AMR_WB using setProperties calling method', function () {
                    Rho.AudioCapture.setProperties({
                        'encoder': Rho.AudioCapture.ENCODER_AMR_WB
                    });
                    var data = Rho.AudioCapture.getProperties(['encoder']);
                    data = data['encoder'];
                    expect(data).toEqual(Rho.AudioCapture.ENCODER_AMR_WB);
                });
            });
        }
		if (["WINDOWS", "ANDROID"].indexOf(Rho.System.platform) != -1) {
			describe('getting property default value', function () {

				it('Should get maxDuration default value', function () {
					expect(Rho.AudioCapture.maxDuration).toEqual(20000);
				});

				it('Should get fileName default value', function () {
					expect(Rho.AudioCapture.fileName).toEqual('AudioCapture');
				});

                /* --source has been removed--
				it('Should get source default value', function () {
					expect(Rho.AudioCapture.source).toEqual(Rho.AudioCapture.MIC);
				});    */
			});
	
		}
		if (["ANDROID"].indexOf(Rho.System.platform) != -1) {
			describe('getting property default value', function () {

				it('Should get encoder default value', function () {
					expect(Rho.AudioCapture.encoder).toEqual(Rho.AudioCapture.ENCODER_AAC);
				});
				
			});    
		}
        if (["WINDOWS", "ANDROID"].indexOf(Rho.System.platform) != -1) {
            describe('Setting maxDuration', function () {
                it('Should Set maxDuration to 1000 using direct calling method', function () {
                    Rho.AudioCapture.maxDuration = 1000;
                    expect(Rho.AudioCapture.maxDuration).toEqual(1000);
                });
                it('Should Set maxDuration to 1000 using setProperty calling method', function () {
                    Rho.AudioCapture.setProperty('maxDuration', '1000');
                    expect(Rho.AudioCapture.getProperty('maxDuration')).toEqual('1000');
                });
                it('Should Set maxDuration to 1000 using setProperties calling method', function () {
                    Rho.AudioCapture.setProperties({
                        'maxDuration': 1000
                    });
                    var data = Rho.AudioCapture.getProperties(['maxDuration']);
                    data = data['maxDuration'];
                    expect(data).toEqual('1000');
                });
                it('Should Set maxDuration to 2000 using direct calling method', function () {
                    Rho.AudioCapture.maxDuration = 2000;
                    expect(Rho.AudioCapture.maxDuration).toEqual(2000);
                });
                it('Should Set maxDuration to 2000 using setProperty calling method', function () {
                    Rho.AudioCapture.setProperty('maxDuration', '2000');
                    expect(Rho.AudioCapture.getProperty('maxDuration')).toEqual('2000');
                });
                it('Should Set maxDuration to 2000 using setProperties calling method', function () {
                    Rho.AudioCapture.setProperties({
                        'maxDuration': 2000
                    });
                    var data = Rho.AudioCapture.getProperties(['maxDuration']);
                    data = data['maxDuration'];
                    expect(data).toEqual('2000');
                });
                it('Should Set maxDuration to 30000 using direct calling method', function () {
                    Rho.AudioCapture.maxDuration = 30000;
                    expect(Rho.AudioCapture.maxDuration).toEqual(30000);
                });
                it('Should Set maxDuration to 30000 using setProperty calling method', function () {
                    Rho.AudioCapture.setProperty('maxDuration', '30000');
                    expect(Rho.AudioCapture.getProperty('maxDuration')).toEqual('30000');
                });
                it('Should Set maxDuration to 30000 using setProperties calling method', function () {
                    Rho.AudioCapture.setProperties({
                        'maxDuration': '30000'
                    });
                    var data = Rho.AudioCapture.getProperties(['maxDuration']);
                    data = data['maxDuration'];
                    expect(data).toEqual('30000');
                });
                it('Should Set maxDuration to -1000 using direct calling method', function () {
                    Rho.AudioCapture.maxDuration = -1000;
                    expect(Rho.AudioCapture.maxDuration).toEqual(-1000);
                });
                it('Should Set maxDuration to -1000 using setProperty calling method', function () {
                    Rho.AudioCapture.setProperty('maxDuration', '-1000');
                    expect(Rho.AudioCapture.getProperty('maxDuration')).toEqual('20000');
                });
                it('Should Set maxDuration to -1000 using setProperties calling method', function () {
                    Rho.AudioCapture.setProperties({
                        'maxDuration': '-1000'
                    });
                    var data = Rho.AudioCapture.getProperties(['maxDuration']);
                    data = data['maxDuration'];
                    expect(data).toEqual('20000');
                });
                it('Should Set maxDuration to 0 using direct calling method', function () {
                    Rho.AudioCapture.maxDuration = 0;
                    expect(Rho.AudioCapture.maxDuration).toEqual(20000);
                });
                it('Should Set maxDuration to 0 using setProperty calling method', function () {
                    Rho.AudioCapture.setProperty('maxDuration', '0');
                    expect(Rho.AudioCapture.getProperty('maxDuration')).toEqual('20000');
                });
                it('Should Set maxDuration to 0 using setProperties calling method', function () {
                    Rho.AudioCapture.setProperties({
                        'maxDuration': '0'
                    });
                    var data = Rho.AudioCapture.getProperties(['maxDuration']);
                    data = data['maxDuration'];
                    expect(data).toEqual('20000');
                });
                it('Should Set maxDuration to 500 using direct calling method', function () {
                    Rho.AudioCapture.maxDuration = 500;
                    expect(Rho.AudioCapture.maxDuration).toEqual(20000);
                });
                it('Should Set maxDuration to 500 using setProperty calling method', function () {
                    Rho.AudioCapture.setProperty('maxDuration', '500');
                    expect(Rho.AudioCapture.getProperty('maxDuration')).toEqual('20000');
                });
                it('Should Set maxDuration to 500 using setProperties calling method', function () {
                    Rho.AudioCapture.setProperties({
                        'maxDuration': '500'
                    });
                    var data = Rho.AudioCapture.getProperties(['maxDuration']);
                    data = data['maxDuration'];
                    expect(data).toEqual('20000');
                });
            });
        }
        if (["ANDROID"].indexOf(Rho.System.platform) != -1) {
            describe('Setting fileName', function () {
                it('Should Set fileName to myAudio using direct calling method', function () {
                    Rho.AudioCapture.fileName = 'myAudio.mp4';
                    expect(Rho.AudioCapture.fileName).toEqual('myAudio');
                });
                it('Should Set fileName to myAudio using setProperty calling method', function () {
                    Rho.AudioCapture.setProperty('fileName', 'myAudio');
                    expect(Rho.AudioCapture.getProperty('fileName')).toEqual('myAudio');
                });
                it('Should Set fileName to myAudio using setProperties calling method', function () {
                    Rho.AudioCapture.setProperties({
                        'fileName': 'myAudio'
                    });
                    var data = Rho.AudioCapture.getProperties(['fileName']);
                    data = data['fileName'];
                    expect(data).toEqual('myAudio');
                });
                it('Should Set fileName to AudioCapture using direct calling method', function () {
                    Rho.AudioCapture.fileName = 'AudioCapture';
                    expect(Rho.AudioCapture.fileName).toEqual('AudioCapture');
                });
                it('Should Set fileName to AudioCapture using setProperty calling method', function () {
                    Rho.AudioCapture.setProperty('fileName', 'AudioCapture');
                    expect(Rho.AudioCapture.getProperty('fileName')).toEqual('AudioCapture');
                });
                it('Should Set fileName to AudioCapture using setProperties calling method', function () {
                    Rho.AudioCapture.setProperties({
                        'fileName': 'AudioCapture'
                    });
                    var data = Rho.AudioCapture.getProperties(['fileName']);
                    data = data['fileName'];
                    expect(data).toEqual('AudioCapture');
                });
                it('Should Set fileName to myAudio_test using direct calling method', function () {
                    Rho.AudioCapture.fileName = 'myAudio_test';
                    expect(Rho.AudioCapture.fileName).toEqual('myAudio_test');
                });
                it('Should Set fileName to myAudio_test using setProperty calling method', function () {
                    Rho.AudioCapture.setProperty('fileName', 'myAudio_test');
                    expect(Rho.AudioCapture.getProperty('fileName')).toEqual('myAudio_test');
                });
                it('Should Set fileName to myAudio_test using setProperties calling method', function () {
                    Rho.AudioCapture.setProperties({
                        'fileName': 'myAudio_test'
                    });
                    var data = Rho.AudioCapture.getProperties(['fileName']);
                    data = data['fileName'];
                    expect(data).toEqual('myAudio_test');
                });
                it('Should Set fileName to audio_test123 using direct calling method', function () {
                    Rho.AudioCapture.fileName = 'audio_test123';
                    expect(Rho.AudioCapture.fileName).toEqual('audio_test123');
                });
                it('Should Set fileName to audio_test123 using setProperty calling method', function () {
                    Rho.AudioCapture.setProperty('fileName', 'audio_test123');
                    expect(Rho.AudioCapture.getProperty('fileName')).toEqual('audio_test123');
                });
                it('Should Set fileName to audio_test123 using setProperties calling method', function () {
                    Rho.AudioCapture.setProperties({
                        'fileName': 'audio_test123'
                    });
                    var data = Rho.AudioCapture.getProperties(['fileName']);
                    data = data['fileName'];
                    expect(data).toEqual('audio_test123');
                });
            });
        }
		if (["WINDOWS"].indexOf(Rho.System.platform) != -1) {
            describe('Setting fileName', function () {
                it('Should Set fileName to myAudio using direct calling method', function () {
                    Rho.AudioCapture.fileName = 'myAudio';
                    expect(Rho.AudioCapture.fileName).toEqual('\\myAudio.wav');
                });
                it('Should Set fileName to myAudio using setProperty calling method', function () {
                    Rho.AudioCapture.setProperty('fileName', 'myAudio');
                    expect(Rho.AudioCapture.getProperty('fileName')).toEqual('\\myAudio.wav');
                });
                it('Should Set fileName to myAudio using setProperties calling method', function () {
                    Rho.AudioCapture.setProperties({
                        'fileName': 'myAudio'
                    });
                    var data = Rho.AudioCapture.getProperties(['fileName']);
                    data = data['fileName'];
                    expect(data).toEqual('\\myAudio.wav');
                });
                it('Should Set fileName to AudioCapture using direct calling method', function () {
                    Rho.AudioCapture.fileName = 'AudioCapture.wav';
                    expect(Rho.AudioCapture.fileName).toEqual('\\AudioCapture.wav');
                });
                it('Should Set fileName to AudioCapture using setProperty calling method', function () {
                    Rho.AudioCapture.setProperty('fileName', 'AudioCapture');
                    expect(Rho.AudioCapture.getProperty('fileName')).toEqual('\\AudioCapture.wav');
                });
                it('Should Set fileName to AudioCapture using setProperties calling method', function () {
                    Rho.AudioCapture.setProperties({
                        'fileName': 'AudioCapture'
                    });
                    var data = Rho.AudioCapture.getProperties(['fileName']);
                    data = data['fileName'];
                    expect(data).toEqual('\\AudioCapture.wav');
                });
                it('Should Set fileName to myAudio_test using direct calling method', function () {
                    Rho.AudioCapture.fileName = 'myAudio_test';
                    expect(Rho.AudioCapture.fileName).toEqual('\\myAudio_test.wav');
                });
                it('Should Set fileName to myAudio_test using setProperty calling method', function () {
                    Rho.AudioCapture.setProperty('fileName', 'myAudio_test');
                    expect(Rho.AudioCapture.getProperty('fileName')).toEqual('\\myAudio_test.wav');
                });
                it('Should Set fileName to myAudio_test using setProperties calling method', function () {
                    Rho.AudioCapture.setProperties({
                        'fileName': 'myAudio_test'
                    });
                    var data = Rho.AudioCapture.getProperties(['fileName']);
                    data = data['fileName'];
                    expect(data).toEqual('\\myAudio_test.wav');
                });
                it('Should Set fileName to audio_test123 using direct calling method', function () {
                    Rho.AudioCapture.fileName = 'audio_test123';
                    expect(Rho.AudioCapture.fileName).toEqual('\\audio_test123.wav');
                });
                it('Should Set fileName to audio_test123 using setProperty calling method', function () {
                    Rho.AudioCapture.setProperty('fileName', 'audio_test123');
                    expect(Rho.AudioCapture.getProperty('fileName')).toEqual('\\audio_test123.wav');
                });
                it('Should Set fileName to audio_test123 using setProperties calling method', function () {
                    Rho.AudioCapture.setProperties({
                        'fileName': 'audio_test123'
                    });
                    var data = Rho.AudioCapture.getProperties(['fileName']);
                    data = data['fileName'];
                    expect(data).toEqual('\\audio_test123.wav');
                });
            });
        }
    });


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

        return arrAudio;
    };

    var AudioCapturedFolder = Rho.RhoFile.join( Rho.Application.userFolder, "audio" );
    Rho.RhoFile.makeDir(AudioCapturedFolder);

    var callbackStatus = false;
    var filePath = "";

    beforeEach(function () {
        callbackStatus = false;
		filePath = "";
    });

    var audioCallBack = function (args) {
        //File Exist Check
        if(Rho.RhoFile.exists(args['fileName'])){
            filePath = args['fileName'];
            callbackStatus = true;
        }        
    }

    var arrAudioCapture = {};
    
    arrAudioCapture['maxDuration'] = {
        "values": [10000, 60000, 1000, 500, 1500 , 0, -3000, null],
        "expected": "Callback should return ok and full file path of recored audiofile and Capture audio duration should be "
    };

    arrAudioCapture['fileName']= {
        "values":  ["audio_123", "1234", "12345 audio", "audio_capture"],
        "expected": "Callback should return ok and full file path of recored audiofile and captured audio should get save with the fileName as "
    };

    for (var object in arrAudioCapture) {

        (function(propertyName,listPropertyValue){

            for (var i = 0; i < listPropertyValue['values'].length; i++) {
                
                (function(propertyValue){
                    
                    it('set '+propertyName+'with value '+ propertyValue, function () {

                        var arrayData = {};
                        arrayData[propertyName] = propertyValue;
                        var data = createPropertyArray(arrayData);
                        var startTime = new Date();
                        runs(function () {
                            Rho.AudioCapture.start(data, audioCallBack);
                        });

                        runs(function(){
                            var endTime = new Date();
                            var captureTime = endTime - startTime;
                            if (propertyValue < 1000){
                                expect(captureTime).toBeGreaterThan(20000);
                                expect(captureTime).toBeLessThan(22000);}
                            else{
                                expect(captureTime).toBeGreaterThan(propertyValue);
                                expect(captureTime).toBeLessThan(propertyValue+2000);}
                            expect(callbackStatus).toEqual(true);
                        });

                   });
               
               })(listPropertyValue['values'][i])
                
            }

        })(object,arrAudioCapture[object]);
       
    }


    if(isWindowsMobilePlatform()){

        it('call start with filename set to "myaudio.wav" with extension', function () {
            dispTestCaseRunning(jasmine.getEnv().currentSpec.description);
            dispExpectedResult('Callback should return ok and full file path of recored audiofile and captured audio should get save with the fileName as myaudio.wav');

            var fname = Rho.RhoFile.join(AudioCapturedFolder,"myaudio.wav");

            runs(function(){
                Rho.AudioCapture.start({'fileName': fname, 'maxDuration': 10000}, audioCallBack);
            });

            runs(function(){
                expect(filePath).toEqual(fname);
                expect(callbackStatus).toEqual(true);
            });
            
        });

        it('call start with filename set to "\\Temp\\myaudio"', function () {
            dispTestCaseRunning(jasmine.getEnv().currentSpec.description);
            dispExpectedResult('Callback should return ok and full file path of recored audiofile and captured audio should get save with the fileName as myaudio in Temp folder');

            var dirName = "\\Temp";
            var isDirExists = Rho.RhoFile.isDir(dirName);

            runs(function(){
                
                if(isDirExists == false){
                    Rho.RhoFile.makeDir(dirName);
                }

                Rho.AudioCapture.start({'fileName': "\\Temp\\myaudio", 'maxDuration': 10000}, audioCallBack);
            });

            runs(function(){
                expect(filePath).toEqual("\\Temp\\myaudio.wav");
                expect(callbackStatus).toEqual(true);
            });
            
        });
        
        it('call start with filename set to "\\Temp\\myaudio.wav"', function () {
            dispTestCaseRunning(jasmine.getEnv().currentSpec.description);
            dispExpectedResult('Callback should return ok and full file path of recored audiofile and captured audio should get save with the fileName as myaudio in Temp folder');
            
            var dirName = "\\Temp";
            var isDirExists = Rho.RhoFile.isDir(dirName);

            runs(function(){
                
                if(isDirExists == false){
                    Rho.RhoFile.makeDir(dirName);
                }

                Rho.AudioCapture.start({'fileName': "\\Temp\\myaudio.wav", 'maxDuration': 10000}, audioCallBack);
            });
            
            runs(function(){
                expect(filePath).toEqual("\\Temp\\myaudio.wav");
                expect(callbackStatus).toEqual(true);
            });

        });
        
        it('call start with filename set to path which does not exists in device \\create\\audio', function () {
            dispTestCaseRunning(jasmine.getEnv().currentSpec.description);
            dispExpectedResult('Callback should return proper error message');
            
            runs(function(){
                Rho.AudioCapture.start({'fileName': "\\create\\audio", 'maxDuration': 10000}, audioCallBack);
            });

            runs(function(){
                expect(callbackStatus).toEqual(false);
            });
        });

    }


    if(isAndroidPlatform()){

       it('call start with filename set to "myaudio.mp4" with extension', function () {
            dispTestCaseRunning(jasmine.getEnv().currentSpec.description);
            dispExpectedResult('Callback should return ok and full file path of recored audiofile and captured audio should get save with the fileName as myaudio.mp4');

            var fname = Rho.RhoFile.join(AudioCapturedFolder,"myaudio.mp4");

            runs(function(){
                Rho.AudioCapture.start({'fileName': fname, 'maxDuration': 10000}, audioCallBack);
            });
            
            runs(function(){
                expect(filePath).toEqual(fname);
                expect(callbackStatus).toEqual(true);
            });
        });


        it('call start with filename set to "/sdcard/Temp/myaudio"', function () {
            dispTestCaseRunning(jasmine.getEnv().currentSpec.description);
            dispExpectedResult('Callback should return ok and full file path of recored audiofile and captured audio should get save with the fileName as myaudio in /sdcard/Temp folder');

            var dirName = "/sdcard/Temp";
            var isDirExists = Rho.RhoFile.isDir(dirName);

            runs(function(){
                
                if(isDirExists == false){
                    Rho.RhoFile.makeDir(dirName);
                }

                Rho.AudioCapture.start({'fileName': "/sdcard/Temp/myaudio", 'maxDuration': 10000}, audioCallBack);
            });
            
            runs(function(){
                expect(filePath).toEqual("/sdcard/Temp/myaudio.mp4");
                expect(callbackStatus).toEqual(true);
            });
        });

        it('call start with filename set to "/sdcard/Temp/myaudio.mp4"', function () {
            dispTestCaseRunning(jasmine.getEnv().currentSpec.description);
            dispExpectedResult('Callback should return ok and full file path of recored audiofile and captured audio should get save with the fileName as myaudio in /sdcard/Temp folder');

            var dirName = "/sdcard/Temp";
            var isDirExists = Rho.RhoFile.isDir(dirName);

            runs(function(){
                
                if(isDirExists == false){
                    Rho.RhoFile.makeDir(dirName);
                }

                Rho.AudioCapture.start({'fileName': "/sdcard/Temp/myaudio.mp4", 'maxDuration': 10000}, audioCallBack);
            });
            
            runs(function(){
                expect(filePath).toEqual("/sdcard/Temp/myaudio.mp4");
                expect(callbackStatus).toEqual(true);
            });
        });             
        
        it('call start with filename set to path which does not exists in device /create/audio', function () {
            dispTestCaseRunning(jasmine.getEnv().currentSpec.description);
            dispExpectedResult('Callback should return proper error message');
            
            runs(function(){
                Rho.AudioCapture.start({'fileName': "/create/audio", 'maxDuration': 10000}, audioCallBack);
            });

            runs(function(){
                expect(callbackStatus).toEqual(false);
            });
        });
        
        //same name audio files with different encoders test series
        
        it('capture the audio with two different encoders(ENCODER_ACC and ENCODER_AMR_NB) with same fileName - 1st part', function () {
            dispTestCaseRunning(jasmine.getEnv().currentSpec.description);
            dispExpectedResult('Callback should return ok and full file path of recored audiofile and should capture audio files in Application folder with fileName as audioencode1.mp4');

            var fname = Rho.RhoFile.join(AudioCapturedFolder,"audioencode1");

            runs(function(){
                Rho.AudioCapture.start({'fileName': fname, 'maxDuration': 10000}, audioCallBack);
            });

            runs(function(){
                expect(filePath).toEqual(fname + ".mp4");
                expect(callbackStatus).toEqual(true);
            });
        });

        it('capture the audio with two different encoders(ENCODER_ACC and ENCODER_AMR_NB) with same fileName - 2nd part', function () {
            dispTestCaseRunning(jasmine.getEnv().currentSpec.description);
            dispExpectedResult('Callback should return ok and full file path of recored audiofile and there should be two captured audio files in Application folder with fileName as audioencode1.mp4 and audioencode1.3gpp');

            var fname = Rho.RhoFile.join(AudioCapturedFolder,"audioencode1");

            runs(function(){
                Rho.AudioCapture.start({'fileName': fname, 'maxDuration': 10000, 'encoder': Rho.AudioCapture.ENCODER_AMR_NB}, audioCallBack);
            });

            runs(function(){
                expect(Rho.RhoFile.exists(fname+".mp4")).toEqual(true);
                expect(filePath).toEqual(fname + ".3gpp");
                expect(callbackStatus).toEqual(true);
            });
        });
        
        it('capture the audio with two different encoders(ENCODER_ACC and ENCODER_AMR_WB) with same fileName - 1st part', function () {
            dispTestCaseRunning(jasmine.getEnv().currentSpec.description);
            dispExpectedResult('Callback should return ok and full file path of recored audiofile and should capture audio files in Application folder with fileName as audioencode2.mp4');

            var fname = Rho.RhoFile.join(AudioCapturedFolder,"audioencode2");

            runs(function(){
                Rho.AudioCapture.start({'fileName': fname, 'maxDuration': 10000}, audioCallBack);
            });

            runs(function(){
                expect(filePath).toEqual(fname + ".mp4");
                expect(callbackStatus).toEqual(true);
            });
        });

        it('capture the audio with two different encoders(ENCODER_ACC and ENCODER_AMR_WB) with same fileName - 2nd part', function () {
            dispTestCaseRunning(jasmine.getEnv().currentSpec.description);
            dispExpectedResult('Callback should return ok and full file path of recored audiofile and there should be two captured audio files in Application folder with fileName as audioencode2.mp4 and audioencode2.3gpp');
            
            var fname = Rho.RhoFile.join(AudioCapturedFolder,"audioencode2");

            runs(function(){
                Rho.AudioCapture.start({'fileName': fname, 'maxDuration': 10000, 'encoder': Rho.AudioCapture.ENCODER_AMR_WB}, audioCallBack);
            });

            runs(function(){
                expect(Rho.RhoFile.exists(fname+".mp4")).toEqual(true);
                expect(filePath).toEqual(fname + ".3gpp");
                expect(callbackStatus).toEqual(true);
            });
        });
        
        it('capture the audio with two different encoders(ENCODER_AMR_NB and ENCODER_AMR_WB) with same fileName - 1st part', function () {
            dispTestCaseRunning(jasmine.getEnv().currentSpec.description);
            dispExpectedResult('Callback should return ok and full file path of recored audiofile and should capture audio files in Application folder with fileName as audioencode3.3gpp');
            
            var fname = Rho.RhoFile.join(AudioCapturedFolder,"audioencode3");

            runs(function(){
                Rho.AudioCapture.start({'fileName': fname, 'maxDuration': 10000, 'encoder': Rho.AudioCapture.ENCODER_AMR_NB}, audioCallBack);
            });

            runs(function(){
                expect(filePath).toEqual(fname + ".3gpp");
                expect(callbackStatus).toEqual(true);
            });
        });

        it('capture the audio with two different encoders(ENCODER_AMR_NB and ENCODER_AMR_WB) with same fileName - 2nd part', function () {
            dispTestCaseRunning(jasmine.getEnv().currentSpec.description);
            dispExpectedResult('Callback should return ok and full file path of recored audiofile and first time captured file should get overwritten by second time captured file so only one file should be present in device path as audioencode3.3gpp');
            
            var fname = Rho.RhoFile.join(AudioCapturedFolder,"audioencode3");

            runs(function(){
                Rho.AudioCapture.start({'fileName': fname, 'maxDuration': 10000, 'encoder': Rho.AudioCapture.ENCODER_AMR_WB}, audioCallBack);
            });

            runs(function(){
                expect(filePath).toEqual(fname + ".3gpp");
                expect(callbackStatus).toEqual(true);
            });
        });
    }


    var arrStopTime = [2000, 4000, 10000];
    
    for (var i = 0; i < arrStopTime.length; i++) {
        (function(valStopTime){
            
            it('call stop method after capturing '+ valStopTime +' msecs of audio capture', function () {
                dispTestCaseRunning(jasmine.getEnv().currentSpec.description);
                dispExpectedResult('Callback should return ok and full file path of recored audiofile and Captured audio duration should be ' + valStopTime + ' msecs in audiowithstop');
                
                var fname = Rho.RhoFile.join(AudioCapturedFolder,"audiowithstop");

                runs(function(){
                    Rho.AudioCapture.start({'fileName': fname, 'maxDuration': 10000}, audioCallBack);

                    setTimeout(function(){
                        Rho.AudioCapture.stop();
                    },valStopTime);
                });
                
                runs(function(){
                    expect(callbackStatus).toEqual(true);
                    Rho.RhoFile.deleteFile(filePath);
                });
            });
        
        })(arrStopTime[i])
    }


    var arrCancelTime = [3000, 10000];

    for (var i = 0; i < arrCancelTime.length; i++) {
        (function(valCancelTime){
            
            it('call stop method after capturing '+ valCancelTime +' msecs of audio capture', function () {
                dispTestCaseRunning(jasmine.getEnv().currentSpec.description);
                dispExpectedResult('Callback should return CANCEL Captured audio for ' + valCancelTime + ' msecs should get discarded and it should not save on device');
                
                var fname = Rho.RhoFile.join(AudioCapturedFolder,"audiowithcancel");

                runs(function(){
                    Rho.AudioCapture.start({'fileName': fname, 'maxDuration': 15000}, audioCallBack);

                    setTimeout(function(){
                        Rho.AudioCapture.cancel();
                    },valCancelTime);
                });
                
                runs(function(){
                    expect(callbackStatus).toEqual(false);
                });
            });
        
        })(arrCancelTime[i])
    }   

    it('call stop method after capturing 10 seconds of audio capture and again call cancel method continuosly', function () {
        dispTestCaseRunning(jasmine.getEnv().currentSpec.description);
        dispExpectedResult('Callback should return ok and full file path of recored audiofile and captured audio duration should be 10 seconds in audiowithstart1');
        
        var fname = Rho.RhoFile.join(AudioCapturedFolder,"audiowithstart1");

        runs(function(){
            Rho.AudioCapture.start({'fileName': fname, 'maxDuration': 15000}, audioCallBack);

            setTimeout(function(){
                Rho.AudioCapture.cancel();
                setTimeout(function(){
                     Rho.AudioCapture.stop();
                },10000);
            },12000);
        });

        runs(function(){
            expect(callbackStatus).toEqual(true);
        });
    });

    it('call cancel method after capturing 10 seconds of audio capture and again call stop method continuosly', function () {
        dispTestCaseRunning(jasmine.getEnv().currentSpec.description);
        dispExpectedResult('Callback should return cancel and Captured audio for 10 seconds should get discarded and it should not save on device');
        
        var fname = Rho.RhoFile.join(AudioCapturedFolder,"audiocancel");

        runs(function(){
            Rho.AudioCapture.start({'fileName': fname, 'maxDuration': 15000}, audioCallBack);

            setTimeout(function(){
                Rho.AudioCapture.stop();
                setTimeout(function(){
                     Rho.AudioCapture.cancel();
                },10000);
            },12000);
        });

        runs(function(){
            expect(callbackStatus).toEqual(false);
        });
    });

    it('Once captured the audio file by setting all properties again call start without setting any properties - part 1', function () {
        dispTestCaseRunning(jasmine.getEnv().currentSpec.description);
        dispExpectedResult('audio file should get save with the name as audiotest, it should not take affect on any other properties set while capture is going on');
        
        var fname = Rho.RhoFile.join(AudioCapturedFolder,"setprop_audio");

        var data = {};
        data['fileName'] = fname;
        data['maxDuration'] = 10000;
        if(isAndroidPlatform){ data['encoder'] = Rho.AudioCapture.ENCODER_AMR_WB };

        runs(function(){
            Rho.AudioCapture.start(data, audioCallBack);
        });
        
        runs(function(){
            expect(callbackStatus).toEqual(true);
        });
    });

    it('Once captured the audio file by setting all properties again call start without setting any properties - part 2', function () {
        dispTestCaseRunning(jasmine.getEnv().currentSpec.description);
        dispExpectedResult('audio file should get save with the name as audiotest, it should not take affect on any other properties set while capture is going on');

        runs(function(){
            Rho.AudioCapture.start({}, audioCallBack);
        });
        
        runs(function(){
            expect(callbackStatus).toEqual(true);
        });
    });


});