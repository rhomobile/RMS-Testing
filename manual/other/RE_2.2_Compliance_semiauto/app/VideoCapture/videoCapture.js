
(function(){
	var pbTest = function(){
		var pbTestObj = {};
		function onCaptured(response){
			main.displayResult("video save event response: " + response);
		}
		pbTestObj.testCases = [
		{
						"VTID":"VT366-0119",
						"RegLevel":"R1",
						"Description":"Video Capture <br/> Destination to FTP",
						"PreCondition":[],
						"Steps":["Set the destination as valid FTP address like ftp://10.233.85.82/Received/Test.wmv.","Set valid username and password","Attach videoSaveEvent on page.","Call the start method to start recording.","Wait for recording to finish."],
						"ExpectedOutcome":["video should be captured and transferred to specified FTP location","videoSaveEvent should retrun 'OK: File Sent' or 'OK: File Received'"],
						"testToPerform":function(){
						//	var ftpsrc = "ftp://ftpadmin:ftpadmin@10.233.85.82/Received/videoFilenew.wmv";
						//	var ftpsrc = "ftp://10.233.85.82/Received/videoFilenew.wmv";
							//videoCapture.destination = "ftp://10.233.85.82/Received/video1.wmv";
							//videoCapture.name = "videoFileInFTP";
							videoCapture.duration = '10000';
							videoCapture.destination = "url('ftp://10.233.85.82/Received/videoFileInFTP.wmv')";
							videoCapture.username = "ftpadmin";
							videoCapture.password = "ftpadmin";
							videoCapture.videoSaveEvent = "main.displayResult('%s')";
							
							videoCapture.start();
						},
						"FinalResult":""
					},{
						"VTID":"VT366-0289",
						"RegLevel":"R1",
						"Description":"Video Capture <br/> duration as 10second for videoCapture",
						"PreCondition":[],
						"Steps":["Set duration to 10000", "Call the start method", "Record the video", "Wait for the recording to stop automatically",],
						"ExpectedOutcome":["Recording should stop after 10 second automatically and recorded video should Play for 10 seconds at default location with the name VideoCapture"],
						"testToPerform":function(){
							videoCapture.name = 'VideoCapture';
							videoCapture.duration = '10000';
							videoCapture.start();
						},
						"FinalResult":""
					}];
		pbTestObj.afterEach = function(){
			
		}
		return pbTestObj;
	}
	window.pbTest = pbTest();
})();

/*var deleteFile = function(destFileName){
			var deleteFile = EB.File.is_exist(fileName);
			if( true == deleteFile){
				EB.File.do_delete(fileName);
			}
		}*/