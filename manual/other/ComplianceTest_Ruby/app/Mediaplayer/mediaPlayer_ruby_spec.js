describe("Media Player", function () {

	/**
	 **	MediaPlayer Audio Tests
	 **/

	it("VT200-0646-Play Audio(valid file local)", function () {
	
		dispTestCaseRunning("VT200-0646-Play | Audio(valid file local");
		dispExpectedResult("You should hear the audio");
		
		_result.waitToRunTest();

		runs(function () {
			if (isWindowsMobilePlatform()) {
				Ruby.call('Mediaplayer','play_audio?case='+1);
			}else{
				Ruby.call('Mediaplayer','play_audio?case='+2);	
			};
		});
		
		_result.waitForResponse();
	});

	if (isAnyButApplePlatform()) {

		it("VT200-0647-Play Audio(valid file local) and Stop", function () {
			
			dispTestCaseRunning("VT200-0647 | Play Audio(valid file local) and Stop");
			dispExpectedResult("Playing should stops after 3 seconds");
		
			_result.waitToRunTest();
		
			runs(function () {
				if (isWindowsMobilePlatform()) {
					Ruby.call('Mediaplayer','play_audio?case='+1);
				}else{
					Ruby.call('Mediaplayer','play_audio?case='+2);	
				};
				
				setTimeout(function () {
					Ruby.call('Mediaplayer','stop_audio');
				}, 3000);
			});
			
			_result.waitForResponse();
		});
	}

	/**
	 **	MediaPlayer Video Tests
	 **/			
 	var plat;
	if (isWindowsMobilePlatform()){
		plat = 'wm';
	}else{
		plat = 'other';
	};

	it("VT200-0648-Play Video(valid file local)", function () {

		dispTestCaseRunning("VT200-0648 | Play Video(valid file local)");
		dispExpectedResult("You should see video");
		
		_result.waitToRunTest();

		runs(function () {
			Ruby.call('Mediaplayer','play_video?file='+plat);

			setTimeout(function () {
				Ruby.call('Mediaplayer','stop_video');
			}, 5000);
		});
		
		_result.waitForResponse();
	});


	if (isAnyButApplePlatform()) {

		it("VT200-0649-Play Video(valid file local) and Stop", function () {
			
			dispTestCaseRunning("VT200-0649-Play Video(valid file local) and Stop");
			dispExpectedResult("Playing should stop after 3 seconds");
			
			_result.waitToRunTest();
		
			runs(function () {
				Ruby.call('Mediaplayer','play_video?file='+plat);

				setTimeout(function () {
					Ruby.call('Mediaplayer','stop_video');
				}, 3000);
			});

			_result.waitForResponse();
		});
	
	}
	
	/**
	 ** MediaPlayer Ringtone Tests
	 **/

	if (!isWindowsMobilePlatform() && isAnyButApplePlatform()) {

		it("VT200-0650-Play Ringtone(valid file)", function () {
		
			dispTestCaseRunning("VT200-0650 | Play Ringtone(valid file)");
			dispExpectedResult("You should hear a ringtone");
			
			_result.waitToRunTest();
			
			runs(function () {
				Ruby.call('Mediaplayer','play_ringtones');
			});
			
			_result.waitForResponse();

		});
		
		it("VT200-XXXX- STOP Ringtone", function () {
		
			dispTestCaseRunning("VT200- | STOP Ringtone Applicable if ringtone currently playing");
			dispExpectedResult("It should stop the currently playing ringtone");
			
			_result.waitToRunTest();
			
			runs(function () {
				Ruby.call('Mediaplayer','stop_ringtone');
			});
			
			_result.waitForResponse();

		});

	}
});