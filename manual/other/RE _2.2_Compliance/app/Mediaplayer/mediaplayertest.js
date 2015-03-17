var a=0;
function callBackFunc(param) {
	       var sig = document.getElementById("actualResult"); 
	       sig.innerHTML = "Param: "+ param;
}


(function(){
	var pbTest = function(){
		var pbTestObj = {};
		pbTestObj.testCases = [
		{
				"VTID":"VT366-0271",
				"RegLevel":"R1",
				"Description":"Start playing the  audio file with type set to audio",
				"PreCondition":[],
				"Steps":["1. Set file parameter to valid audio file.(file://Application/Audiofilename)","2. Set type parameter to audio.","3. Call start method to play the file","Note: Please check the file format whether it is supported on particular platform or not."],
				"ExpectedOutcome":["Audio file should play suceesfully as type is set to audio."],
				"testToPerform":function(){
					mediaPlayer.filename = "url('file://\\Application\\Alarm5.wav')";
					mediaPlayer.type = 'audio';
					mediaPlayer.start();
				},
				"FinalResult":""
			},{
				"VTID":"VT366-0272",
				"RegLevel":"R1",
				"Description":"Start playing the  video file with type set to video",
				"PreCondition":[],
				"Steps":["1. Set file parameter to valid video file.(file://Application/Videofilename)","2. Set type parameter to video","3. Call start method to play the file"],
				"ExpectedOutcome":["Video file should play suceesfully as type is set to video."],
				"testToPerform":function(){
					if(isAndroidPlatform()){
					mediaPlayer.filename = "url('file://\\Application\\video.mp4')";
					mediaPlayer.type = 'video';
					mediaPlayer.start();
					}
					if(isWindowsMobilePlatform()){
					mediaPlayer.filename = "url('file://\\Application\\video.wmv')";
					mediaPlayer.type = 'video';
					mediaPlayer.start();
				    }
				},
				"FinalResult":""
			},{
				"VTID":"VT366-0273",
				"RegLevel":"R1",
				"Description":"Play the video  file from http location ",
				"PreCondition":[],
				"Steps":["1. Set file parameter to video file with http location (http://192.168.6.18/filename)","2. Set type parameter to video type","3. Call start method to play the file"],
				"ExpectedOutcome":["video  file should play on device from http location"],
				"testToPerform":function(){
					if(isAndroidPlatform()){
					mediaPlayer.filename = "url('http://10.233.85.82:80/NEON/ReceivedFiles/video/video.mp4')";
					mediaPlayer.type = 'video';
					mediaPlayer.start();
				    }
				    if(isWindowsMobilePlatform()){
					mediaPlayer.filename = "url('http://10.233.85.82:80/NEON/ReceivedFiles/video/video.wmv')";
					mediaPlayer.type = 'video';
					mediaPlayer.start();
				    }
					
				},
				"FinalResult":""
			}


		];
		pbTestObj.afterEach = function(){
			signatureCapture.clear();
			signatureCapture.visibility = 'hidden';
		}
		return pbTestObj;
	}
	window.pbTest = pbTest();
})();