describe("Media Player", function () {
	
	var audioMediaPath = Rho.RhoFile.join(Rho.Application.modelFolderPath('Mediaplayer'), "MediaFiles/Audio");
	var videoMediaPath = Rho.RhoFile.join(Rho.Application.modelFolderPath('Mediaplayer'), "MediaFiles/Video");

	beforeEach(function () {
	/*Add any reset codes here*/
	});

	// This test relies on the device having an audio file
	it("VT200-0389-Play Audio(valid file local)", function () {
	
		dispTestCaseRunning("VT200-0389-Play | Audio(valid file local)");
		dispExpectedResult("You should hear the music");
		
		//Common Method implemented to wait for tester to run the test.Code available in specHelper.js
		_result.waitToRunTest();

		runs(function () {

			var audiolocation = "";
			if(isWindowsMobilePlatform()){
				audiolocation = Rho.RhoFile.join(audioMediaPath, "badfeeling.wav");
			}
			if(isAndroidPlatform() || isApplePlatform()){
				audiolocation = Rho.RhoFile.join(audioMediaPath, "super_android_tune.mp3");
			}
			Rho.Mediaplayer.start(audiolocation);
			setTimeout(function () {
				Rho.Mediaplayer.stop();
			}, 5000);
		});
		
		//Common Method implemented to wait for tester to make it pass or fail.Code available in specHelper.js
		_result.waitForResponse();

	});

	if (isAnyButApplePlatform()) {

		it("VT200-0390-Play Audio(valid file local) and Stop", function () {
			
			dispTestCaseRunning("VT200-0390 | Play Audio(valid file local) and Stop");
			dispExpectedResult("Playing should stops after 3 seconds");
		
			//Common Method implemented to wait for tester to run the test.Code available in specHelper.js
			_result.waitToRunTest();
		
			runs(function () {
				var audiolocation = "";
				if(isWindowsMobilePlatform()){
					audiolocation = Rho.RhoFile.join(audioMediaPath, "badfeeling.wav");
				}
				if(isAndroidPlatform() || isApplePlatform()){
					audiolocation = Rho.RhoFile.join(audioMediaPath, "super_android_tune.mp3");
				}
				console.log(audiolocation);
				Rho.Mediaplayer.start(audiolocation);
				setTimeout(function () {
					Rho.Mediaplayer.stop();
				}, 3000);
			});
			
			//Common Method implemented to wait for tester to make it pass or fail.Code available in specHelper.js
			_result.waitForResponse();

		});
	}

	/**
	 **	MediaPlayer Video Tests
	 **/			
	 
	it("VT200-0391-Play Video(valid file local)", function () {

		dispTestCaseRunning("VT200-0391 | Play Video(valid file local)");
		dispExpectedResult("You should see video");
		
		//Common Method implemented to wait for tester to run the test.Code available in specHelper.js
		_result.waitToRunTest();
		
		runs(function () {
			var Videolocation = "";
			if(isWindowsMobilePlatform()){
				Videolocation = Rho.RhoFile.join(videoMediaPath, "video.wmv");
			}
			if(isAndroidPlatform() || isApplePlatform()){
				Videolocation = Rho.RhoFile.join(videoMediaPath, "test.mp4");
			}
			console.log(Videolocation);
			Rho.Mediaplayer.startvideo(Videolocation);
			setTimeout(function () {
				Rho.Mediaplayer.stopvideo();
			}, 5000);
		});
		
		//Common Method implemented to wait for tester to make it pass or fail.Code available in specHelper.js
		_result.waitForResponse();
	});

	if (isAnyButApplePlatform()) {

		it("VT200-0392-Play Video(valid file local) and Stop", function () {
			
			dispTestCaseRunning("VT200-0392-Play Video(valid file local) and Stop");
			dispExpectedResult("Playing should stop after 3 seconds");
			
			//Common Method implemented to wait for tester to run the test.Code available in specHelper.js
			_result.waitToRunTest();
		
			runs(function () {
				var Videolocation = "";
				if(isWindowsMobilePlatform()){
					Videolocation = Rho.RhoFile.join(videoMediaPath, "video.wmv");
				}
				if(isAndroidPlatform() || isApplePlatform()){
					Videolocation = Rho.RhoFile.join(videoMediaPath, "test.mp4");
				}
				console.log(Videolocation);
				Rho.Mediaplayer.startvideo(Videolocation);
				setTimeout(function () {
					Rho.Mediaplayer.stopvideo();
				}, 3000);
			});

			//Common Method implemented to wait for tester to make it pass or fail.Code available in specHelper.js
			_result.waitForResponse();
		});
	}
	
	/**
	 ** Ringtone Tests
	 **/

	if (!isWindowsMobilePlatform() && isAnyButApplePlatform()) {

		it("VT200-0393-Play Ringtone(valid file)", function () {
		
			dispTestCaseRunning("VT200-0393 | Play Ringtone(valid file)");
			dispExpectedResult("You should hear a ringtone");
			
			//Common Method implemented to wait for tester to run the test.Code available in specHelper.js
			_result.waitToRunTest();
			
			runs(function () {
				Rho.Mediaplayer.getAllRingtones(function(ringtones){
					if(isAndroidPlatform && ringtones.length > 0){
						name = ringtones[0]['name'];
						Rho.Mediaplayer.playRingTone(name);
					}
				});
				
			});
			
			//Common Method implemented to wait for tester to make it pass or fail.Code available in specHelper.js
			_result.waitForResponse();

		});
		
		it("VT200-0394-Stop Ringtone", function () {
		
			dispTestCaseRunning("VT200-0394 | STOP Ringtone Applicable if ringtone currently playing");
			dispExpectedResult("It should stop the currently playing ringtone");
			
			//Common Method implemented to wait for tester to run the test.Code available in specHelper.js
			_result.waitToRunTest();
			
			runs(function () {
				Rho.Mediaplayer.stopRingTone();	
			});
			
			//Common Method implemented to wait for tester to make it pass or fail.Code available in specHelper.js
			_result.waitForResponse();

		});

	}
});