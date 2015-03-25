var platformSupported = ["ANDROID", "WINDOWS", "APPLE"];

    describe('Rho.AudioCapture JS API', function () {
    	if(platformSupported.indexOf(Rho.System.platform)!= -1){
    	var filePath = "";
    	
        var AudioCapturedFolder = Rho.RhoFile.join( Rho.Application.userFolder, "audio" );
        Rho.RhoFile.makeDir(AudioCapturedFolder);
    	
    	afterEach(function () {
            var resultDiv = document.getElementById('actResult');
            resultDiv.innerHTML = "";
            resultDiv.style.display = 'none';
    	});
    	
        var audioCallBack = function (args) {
            var resultDiv = document.getElementById('actResult');
            resultDiv.innerHTML = JSON.stringify(args);
            resultDiv.style.display = 'block';
            var tempFileName=args.fileName.substring(7);
            //File Exist Check
            if(Rho.RhoFile.exists(tempFileName)){
                // Audio Play
                Rho.Mediaplayer.start(tempFileName);
                setTimeout(function(){
                    Rho.Mediaplayer.stop();
                },30000);
            }
            else{
                resultDiv.innerHTML = resultDiv.innerHTML + "<br/>File Not Exist";
            }
            
        }
        
    	var showSpeakMsg = function(){
    		var resultDiv = document.getElementById('actResult');
            resultDiv.innerHTML = "##Audio Capture started.. Speak to record##";
    		resultDiv.style.display = 'block';
    	}
        
        it('VT200-0502 Call Start with mandatory parameter filename and callback check captured audio saved path in device', function () {
            dispTestCaseRunning(jasmine.getEnv().currentSpec.description);
            dispExpectedResult('Callback should return ok and full file path of recored audiofile and Captured audio file should get saved with defaultvalue.wav in root director of WM device and defaultvalue.mp4 andorid device');
            
            _result.waitToRunTest();

            runs(function(){
                Rho.AudioCapture.start({'fileName': "defaultvalue"}, audioCallBack);
                showSpeakMsg();
            });

            _result.waitForResponse();
        });
        
    if(!isAndroidPlatform()){
        it('VT200-0503 Call start method with all properties set', function () {
            dispTestCaseRunning(jasmine.getEnv().currentSpec.description);
            dispExpectedResult('Callback should return ok and full file path of recored audiofile and captured audio file name should be wmallparams, and audio duration should be 8 seconds');
            
            _result.waitToRunTest();

            var fname = Rho.RhoFile.join(AudioCapturedFolder,"audioallparams");

            runs(function () {
                Rho.AudioCapture.start({'fileName': fname, 'maxDuration': 8000}, audioCallBack);
                showSpeakMsg();

            });

            _result.waitForResponse();
        });
    }


        if(isAndroidPlatform()){
            it('VT200-0504 Call start method with all properties set', function () {
                dispTestCaseRunning(jasmine.getEnv().currentSpec.description);
                dispExpectedResult('Callback should return ok and full file path of recored audiofile and and captured audio file name should be captured with default source MIC, and captured audio fileName should be androidallparams with encoder ENCODER_AMR_WB  and audio duration should be 8 seconds');
                
                _result.waitToRunTest();
                
                var fname = Rho.RhoFile.join(AudioCapturedFolder,"androidallparams");

                runs(function () {
                    Rho.AudioCapture.start({'fileName': fname, 'maxDuration': 8000, 'encoder': Rho.AudioCapture.ENCODER_AMR_WB}, audioCallBack);
                    showSpeakMsg();
                    alert(AudioCapturedFolder);
                });

                _result.waitForResponse();
            });
        }
        
        it('VT200-0505 Call stop method after capturing 2 secs of audio capture', function () {
        	dispTestCaseRunning(jasmine.getEnv().currentSpec.description);
            dispExpectedResult('VT200-0505 Callback should return ok and full file path of recored audiofile and Captured audio duration should be 2 seconds');
            
            _result.waitToRunTest();
            
    		runs(function(){
    			Rho.AudioCapture.start({'fileName': Rho.RhoFile.join(AudioCapturedFolder,"audiowithstop"), 'maxDuration': 15000}, audioCallBack);
    			showSpeakMsg();

    			setTimeout(function(){
    				Rho.AudioCapture.stop();
    			},2000);
    		});
    		
    		_result.waitForResponse();
    	});
        
        it('VT200-0506 Call cancel method after capturing 3secs of audio capture', function () {
        	dispTestCaseRunning(jasmine.getEnv().currentSpec.description);
            dispExpectedResult('Callback should return CANCEL Captured audio for 3 seconds should get discarded and it should not save on device');
            
            _result.waitToRunTest();
            
    		runs(function(){
    			Rho.AudioCapture.start({'fileName': Rho.RhoFile.join(AudioCapturedFolder,"audiowithcancel"), 'maxDuration': 15000}, audioCallBack);
    			showSpeakMsg();

    			setTimeout(function(){
    				Rho.AudioCapture.cancel();
    			},3000);
    		});
    		
    		_result.waitForResponse();
    	});
        }else{
            it("Your Platform/Device does not support this feature", function(){

            });
        }
});