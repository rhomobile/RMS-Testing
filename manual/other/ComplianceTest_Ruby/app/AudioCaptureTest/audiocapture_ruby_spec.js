describe('Rho::AudioCapture Ruby API', function () {
	
	afterEach(function () {
        var resultDiv = document.getElementById('actResult');
        resultDiv.innerHTML = "";
        resultDiv.style.display = 'none';
	});

	var showSpeakMsg = function(){
		var resultDiv = document.getElementById('actResult');
        resultDiv.innerHTML = "##Audio Capture started.. Speak to record##";
		resultDiv.style.display = 'block';
	}
    
    it('Call Start with mandatory parameter filename and callback check captured audio saved path in device', function () {
        dispTestCaseRunning(jasmine.getEnv().currentSpec.description);
        dispExpectedResult('Callback should return ok and full file path of recored audiofile and Captured audio file should get saved with defaultvalue.wav in root director of WM device and defaultvalue.mp4 andorid device');
        
        _result.waitToRunTest();

        var result;
        runs(function(){
            Ruby.call('AudioCaptureTest','audio_capture_default');
            showSpeakMsg();
        });

        _result.waitForResponse();
    });
    
    it('Call start method with all properties set', function () {
        dispTestCaseRunning(jasmine.getEnv().currentSpec.description);
        dispExpectedResult('Callback should return ok and full file path of recored audiofile and captured audio file name should be wmallparams, and audio duration should be 8 seconds');
        
        _result.waitToRunTest();

        runs(function () {
            Ruby.call('AudioCaptureTest','audio_capture_allparams');
            showSpeakMsg();
        });

        _result.waitForResponse();
    });


    if(isAndroidPlatform()){
        it('<br/>Call start method with all properties set', function () {
            dispTestCaseRunning(jasmine.getEnv().currentSpec.description);
            dispExpectedResult('Callback should return ok and full file path of recored audiofile and and captured audio file name should be captured with default source MIC, and captured audio fileName should be androidallparams with encoder ENCODER_AMR_WB  and audio duration should be 8 seconds');
            
            _result.waitToRunTest();

            runs(function () {
                Ruby.call('AudioCaptureTest','audio_capture_androidallparams');
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
			Ruby.call('AudioCaptureTest','audio_capture_stop');
			showSpeakMsg();

			// setTimeout(function(){
			// 	Ruby.call('AudioCaptureTest','audio_stop');
			// },2000);
		});
		
		_result.waitForResponse();
	});
    
    it('call cancel method after capturing 3secs of audio capture', function () {
    	dispTestCaseRunning(jasmine.getEnv().currentSpec.description);
        dispExpectedResult('Callback should return CANCEL Captured audio for 3 seconds should get discarded and it should not save on device');
        
        _result.waitToRunTest();
        
		runs(function(){
			Ruby.call('AudioCaptureTest','audio_capture_cancel');
			showSpeakMsg();

			// setTimeout(function(){
			// 	Ruby.call('AudioCaptureTest','audio_cancel');
			// },3000);
		});
		
		_result.waitForResponse();
	});

});