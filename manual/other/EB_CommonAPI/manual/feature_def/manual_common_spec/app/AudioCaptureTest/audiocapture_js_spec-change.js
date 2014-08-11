describe("Audio Capture Test", function(){

    var createPropertyArray = function(arrData){
        var arrAudio = {};

        if(arrData['fileName']){
            arrAudio['fileName'] = arrData['fileName']
        }
        else{
            arrAudio['fileName'] = "/sdcard/audio/audiofile"
        }

        if(arrData["maxDuration"])
            arrAudio['maxDuration'] = arrData['maxDuration'];
        if(arrData['encoder'])
            arrAudio['encoder'] = arrData['encoder'];

        return arrAudio;
    };

   #var AudioCapturedFolder = EB.RhoFile.join( EB.Application.userFolder, "audio" );
    #EB.RhoFile.makeDir(AudioCapturedFolder);

    var audioCallBack = function (args) {
        var resultDiv = document.getElementById('actResult');
        resultDiv.innerHTML = JSON.stringify(args);
        resultDiv.style.display = 'block';
        var playFile = args.fileName.substring(7);
        //File Exist Check
        if(EB.RhoFile.exists(playFile)){
            // Audio Play
            EB.Mediaplayer.start(playFile);
            setTimeout(function(){
                EB.Mediaplayer.stop();
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
    });

    it('Call Start with mandatory parameter filename and callback check captured audio saved path in device', function () {
        dispTestCaseRunning(jasmine.getEnv().currentSpec.description);
        dispExpectedResult('Callback should return ok and full file path of recored audiofile and Captured audio file should get saved with defaultvalue.wav in root director of WM device and defaultvalue.mp4 andorid device');
        
        _result.waitToRunTest();

        runs(function(){
            EB.AudioCapture.start({'fileName': "defaultvalue"}, audioCallBack);
        });

        _result.waitForResponse();
    });

    if(isAndroidPlatform()){
        var arrAudioCapture = {};
        
            arrAudioCapture['encoder']= {
                "values": [EB.AudioCapture.ENCODER_AAC, EB.AudioCapture.ENCODER_AMR_NB, EB.AudioCapture.ENCODER_AMR_WB, "INVALID", null],
                //"values": ["AAC", "AMR_NB", "AMR_WB", "INVALID", null],
                "expected": "Callback should return ok and full file path of recored audiofile and in captured audio for ENCODER_AAC as .mp4, ENCODER_AMR_NB & ENCODER_AMR_WB as .3gpp "
            };

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
                               EB.AudioCapture.start(data, audioCallBack);
                           });
                           
                           _result.waitForResponse();
                       });
                   
                   })(listPropertyValue['values'][i])
                    
                }

            })(object,arrAudioCapture[object]);
           
        }
    }

    it('overWrite the capture file - 1st part', function () {
        dispTestCaseRunning(jasmine.getEnv().currentSpec.description);
        dispExpectedResult('Callback should return ok and full file path of recored audiofile and captured audio');
        
        _result.waitToRunTest();

        var fname = EB.RhoFile.join(AudioCapturedFolder,"audiooverwrite");

        runs(function(){
            EB.AudioCapture.start({'fileName': fname, 'maxDuration': 10000}, audioCallBack);
        });

        _result.waitForResponse();
    });

    it('overWrite the capture file - 2nd part', function () {
        dispTestCaseRunning(jasmine.getEnv().currentSpec.description);
        dispExpectedResult('Callback should return ok and full file path of recored audiofile and captured audio should overwrite the file with new captured fille');
        
        _result.waitToRunTest();

        var fname = EB.RhoFile.join(AudioCapturedFolder,"audiooverwrite");

        runs(function(){
            EB.AudioCapture.start({'fileName': fname, 'maxDuration': 15000}, audioCallBack);
        });
        
        _result.waitForResponse();
    }); 

    it('call start method two times continusly', function () {
        dispTestCaseRunning(jasmine.getEnv().currentSpec.description);
        dispExpectedResult('First time call of start method should NOT get discarded on calling start method second time<br/>and  Callback should return ok and full file path of recored audiofile and captured audio should save on the device audiowithstart for 10 secs');
        
        _result.waitToRunTest();

        var fname = EB.RhoFile.join(AudioCapturedFolder,"audiowithstart");

        runs(function(){
            EB.AudioCapture.start({'fileName': fname, 'maxDuration': 10000}, audioCallBack);
            EB.AudioCapture.start({'fileName': fname, 'maxDuration': 5000}, audioCallBack);
        });
        
        _result.waitForResponse();
    });


    xit('try to capture the audio after application brought to forgorund from background', function () {
        dispTestCaseRunning(jasmine.getEnv().currentSpec.description);
        dispExpectedResult('Callback should return ok and full file path of recored audiofile  and In step 3 captured audio should play successfully audioTest1 <br/><br/>after step 3 captured audio file should play successfully audioTest2');
        
        _result.waitToRunTest();

        var fname1 = EB.RhoFile.join(AudioCapturedFolder,"audioTest1");

        runs(function () {
            EB.AudioCapture.start({'fileName': fname1, 'maxDuration': 5000}, audioCallBack);

            setTimeout(function(){
                EB.Application.minimize();
            },7000);
        });

        var fname2 = EB.RhoFile.join(AudioCapturedFolder,"audioTest2");

        runs(function () {
            setTimeout(function(){
                EB.Application.restore();
            },1000);

            EB.AudioCapture.start({'fileName': fname2, 'maxDuration': 5000}, audioCallBack);
			
        }); 
		
        
        _result.waitForResponse();
		
		
    });
	
	
   
    xit('try to capture the audio while application in background', function () {
        dispTestCaseRunning(jasmine.getEnv().currentSpec.description);
        dispExpectedResult('Callback should return ok and Audio capture should happen when application sent to backgorund');
        
        _result.waitToRunTest();

        var fname = EB.RhoFile.join(AudioCapturedFolder,"audiomin");

        runs(function () {
            setTimeout(function(){
                EB.Application.minimize();
            },1000);

            EB.AudioCapture.start({'fileName': fname, 'maxDuration': 15000}, audioCallBack);
        });

        setTimeout(function(){
            EB.Application.restore();
        },2000);

        _result.waitForResponse();
    }); 
	
	//Start New Audio capture background script
	
	it('try to capture the audio after application brought to forgorund from background', function () {       
	dispTestCaseRunning(jasmine.getEnv().currentSpec.description);        
	dispExpectedResult('Callback should return ok and full file path of recored audiofile and captured 5secs audio should play successfully');
	_result.waitToRunTest();
	var fname1 = Rho.RhoFile.join(AudioCapturedFolder,"audioTest1");		
	var flag = false;
	
	runs(function () {           
	Rho.AudioCapture.start({'fileName': fname1, 'maxDuration': 5000}, audioCallBack);
	
	setTimeout(function(){              
	Rho.Application.minimize();				
	flag = true;
	},15000);      
	});
	
	waitsFor(function() {           
	return flag !== false;        
	}, 'wait until minimize', 17000);
	
	runs(function () {			
	var fname2 = Rho.RhoFile.join(AudioCapturedFolder,"audioTest2");
	
	setTimeout(function(){				
	Rho.AudioCapture.start({'fileName': fname2, 'maxDuration': 5000}, audioCallBack);
	},21000);
	
	});               
	_result.waitForResponse();  
	});
	
	//End New Audio capture background script
	

    it('Call start method with all properties set', function () {
        dispTestCaseRunning(jasmine.getEnv().currentSpec.description);
        dispExpectedResult('Callback should return ok and full file path of recored audiofile and captured audio file name should be wmallparams, and audio duration should be 8 seconds');
        
        _result.waitToRunTest();

        var fname = EB.RhoFile.join(AudioCapturedFolder,"audioallparams");

        runs(function () {
            EB.AudioCapture.start({'fileName': fname, 'maxDuration': 8000}, audioCallBack);
        });

        _result.waitForResponse();
    });


    if(isAndroidPlatform){
        it('<br/>Call start method with all properties set', function () {
            dispTestCaseRunning(jasmine.getEnv().currentSpec.description);
            dispExpectedResult('Callback should return ok and full file path of recored audiofile and and captured audio file name should be captured with default source MIC, and captured audio fileName should be androidallparams with encoder ENCODER_AMR_WB  and audio duration should be 8 seconds');
            
            _result.waitToRunTest();
            
            var fname = EB.RhoFile.join(AudioCapturedFolder,"androidallparams");

            runs(function () {
                EB.AudioCapture.start({'fileName': fname, 'maxDuration': 8000, 'encoder': EB.AudioCapture.ENCODER_AMR_WB}, audioCallBack);
            });

            _result.waitForResponse();
        });
    }

    it('set the properties after calling start', function () {
        dispTestCaseRunning(jasmine.getEnv().currentSpec.description);
        dispExpectedResult('audio file should get save with the name as audiotest, it should not take affect on any other properties set while capture is going on');
        
        _result.waitToRunTest();

        var fname = EB.RhoFile.join(AudioCapturedFolder,"audiotest");
        var fname1 = EB.RhoFile.join(AudioCapturedFolder,"myaudio");

        runs(function(){
            EB.AudioCapture.start({'fileName': fname}, audioCallBack);
            EB.AudioCapture.setProperties({
                'fileName': fname1,
                'maxDuration': '10000'
            });
        });
        
        _result.waitForResponse();
    });

	if (isAnyButApplePlatform()) {
		it('minimize the application at time capture is going on', function () {
			dispTestCaseRunning(jasmine.getEnv().currentSpec.description);
			dispExpectedResult('Callback should return ok and full file path of recored audiofile, audio should successfully capture event the application is in minimize state');

			_result.waitToRunTest();

			var fname = EB.RhoFile.join(AudioCapturedFolder,"audiominimze");

			runs(function(){
				EB.AudioCapture.start({'fileName': fname, 'maxDuration': 10000}, audioCallBack);

				setTimeout(function(){
					EB.Application.minimize();
				},4000);
			});

			setTimeout(function(){
				EB.Application.restore();
			},2000);

			_result.waitForResponse();
		});
	}

    it('capture the audio at the time screen time out occurs', function () {
        dispTestCaseRunning(jasmine.getEnv().currentSpec.description);
        dispExpectedResult('Callback should return ok and full file path of recored audiofile');
        
        _result.waitToRunTest();

        var fname = EB.RhoFile.join(AudioCapturedFolder,"audiotest");

        runs(function(){
            EB.AudioCapture.start({'fileName': fname, 'maxDuration': 30000}, audioCallBack);
        });
        
        _result.waitForResponse();
    });

    it('suspend and resume the device at time of audio capture', function () {
        dispTestCaseRunning(jasmine.getEnv().currentSpec.description);
        dispExpectedResult('audio capture should be recorded successfuly on resume of the process.');
        
        _result.waitToRunTest();

        var fname = EB.RhoFile.join(AudioCapturedFolder,"audiotest");

        runs(function(){
            EB.AudioCapture.start({'fileName': fname}, audioCallBack);
        });
        
        _result.waitForResponse();
    });

    it('Persitstant test/page navigation test', function () {
        dispTestCaseRunning(jasmine.getEnv().currentSpec.description);
        dispExpectedResult('callback should not get fire on other page/index page');
        
        _result.waitToRunTest();

        var fname = EB.RhoFile.join(AudioCapturedFolder,"audiopersist");

        runs(function () {
            EB.AudioCapture.start({'fileName': fname, 'maxDuration': 20000}, audioCallBack);

            setTimeout(function(){
                window.history.back();
            },5000);
        });

        _result.waitForResponse();
    });

	if (isAnyButApplePlatform()) {
		it('quit the application at the time of audio is getting captured should not crash', function () {
			dispTestCaseRunning(jasmine.getEnv().currentSpec.description);
			dispExpectedResult('Application should not behave abnormal or crash');

			_result.waitToRunTest();

			var fname = EB.RhoFile.join(AudioCapturedFolder,"audioquit");

			runs(function(){
				EB.AudioCapture.start({'fileName': fname, 'maxDuration': 15000}, audioCallBack);

				setTimeout(function(){
					EB.Application.quit();
				},5000);
			});

			_result.waitForResponse();
		});
	}

});