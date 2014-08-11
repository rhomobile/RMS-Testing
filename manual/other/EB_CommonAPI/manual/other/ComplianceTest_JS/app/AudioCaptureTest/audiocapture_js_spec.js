describe('EB.AudioCapture JS API', function () {
	
	var filePath = "";
	
    var AudioCapturedFolder = EB.RhoFile.join( EB.Application.userFolder, "audio" );
    EB.RhoFile.makeDir(AudioCapturedFolder);
	
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
        if(EB.RhoFile.exists(tempFileName)){
            // Audio Play
            EB.Mediaplayer.start(tempFileName);
            setTimeout(function(){
                EB.Mediaplayer.stop();
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
    
    it('Call Start with mandatory parameter filename and callback check captured audio saved path in device', function () {
        dispTestCaseRunning(jasmine.getEnv().currentSpec.description);
        dispExpectedResult('Callback should return ok and full file path of recored audiofile and Captured audio file should get saved with defaultvalue.wav in root director of WM device and defaultvalue.mp4 andorid device');
        
        _result.waitToRunTest();

        runs(function(){
            EB.AudioCapture.start({'fileName': "defaultvalue"}, audioCallBack);
            showSpeakMsg();
        });

        _result.waitForResponse();
    });
    
    it('Call start method with all properties set', function () {
        dispTestCaseRunning(jasmine.getEnv().currentSpec.description);
        dispExpectedResult('Callback should return ok and full file path of recored audiofile and captured audio file name should be wmallparams, and audio duration should be 8 seconds');
        
        _result.waitToRunTest();

        var fname = EB.RhoFile.join(AudioCapturedFolder,"audioallparams");

        runs(function () {
            EB.AudioCapture.start({'fileName': fname, 'maxDuration': 8000}, audioCallBack);
            showSpeakMsg();
        });

        _result.waitForResponse();
    });


    if(isAndroidPlatform()){
        it('<br/>Call start method with all properties set', function () {
            dispTestCaseRunning(jasmine.getEnv().currentSpec.description);
            dispExpectedResult('Callback should return ok and full file path of recored audiofile and and captured audio file name should be captured with default source MIC, and captured audio fileName should be androidallparams with encoder ENCODER_AMR_WB  and audio duration should be 8 seconds');
            
            _result.waitToRunTest();
            
            var fname = EB.RhoFile.join(AudioCapturedFolder,"androidallparams");

            runs(function () {
                EB.AudioCapture.start({'fileName': fname, 'maxDuration': 8000, 'encoder': EB.AudioCapture.ENCODER_AMR_WB}, audioCallBack);
                showSpeakMsg();
            });

            _result.waitForResponse();
        });
    }
    
    it('call stop method after capturing secs of audio capture', function () {
    	dispTestCaseRunning(jasmine.getEnv().currentSpec.description);
        dispExpectedResult('Callback should return ok and full file path of recored audiofile and Captured audio duration should be 2 seconds');
        
        _result.waitToRunTest();
        
		runs(function(){
			EB.AudioCapture.start({'fileName': EB.RhoFile.join(AudioCapturedFolder,"audiowithstop"), 'maxDuration': 15000}, audioCallBack);
			showSpeakMsg();

			setTimeout(function(){
				EB.AudioCapture.stop();
			},2000);
		});
		
		_result.waitForResponse();
	});
    
    it('call cancel method after capturing 3secs of audio capture', function () {
    	dispTestCaseRunning(jasmine.getEnv().currentSpec.description);
        dispExpectedResult('Callback should return CANCEL Captured audio for 3 seconds should get discarded and it should not save on device');
        
        _result.waitToRunTest();
        
		runs(function(){
			EB.AudioCapture.start({'fileName': EB.RhoFile.join(AudioCapturedFolder,"audiowithcancel"), 'maxDuration': 15000}, audioCallBack);
			showSpeakMsg();

			setTimeout(function(){
				EB.AudioCapture.cancel();
			},3000);
		});
		
		_result.waitForResponse();
	});


});