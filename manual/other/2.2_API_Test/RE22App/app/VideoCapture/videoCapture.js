
var count = 0;

(function(){
	var pbTest = function(){
		var pbTestObj = {};
		pbTestObj.testCases = [
		{
						"VTID":"VT187-3095",
						"RegLevel":"R1",
						"Description":"Video Capture <br/> Start videoCapture",
						"PreCondition":[],
						"Steps":["Don't set any duration", "Call the start method", "Record the video", "Don't call stop method","Play the recorded video",],
						"ExpectedOutcome":["Start method should start to capture the video and should stop after 5 seconds"],
						"testToPerform":function(){
							videoCapture.start();
						},
						"FinalResult":""
					},{
						"VTID":"VT187-3096",
						"RegLevel":"R1",
						"Description":"Video Capture <br/> stop videoCapture",
						"PreCondition":[],
						"Steps":["Don't set any duration", "Call the start method", "Record the video", "call stop after 2 second to end the recording",],
						"ExpectedOutcome":["video recording should stop and recorded video should play for 2 second"],
						"testToPerform":function(){
							videoCapture.start();
							setTimeout(function(){
								videoCapture.stop();	
								alert("Video Stopped")				
							},3000);
						},
						"FinalResult":""
					},{
						"VTID":"VT187-3097",
						"RegLevel":"R1",
						"Description":"Video Capture <br/> cancel videoCapture",
						"PreCondition":[],
						"Steps":["Don't set any duration", "Call the start method", "Record the video", "Call cancel after 2 second to end the recording",],
						"ExpectedOutcome":["After calling cancel ,the video recording should stop and recorded video should be discarded"],
						"testToPerform":function(){
							videoCapture.start();
							setTimeout(function(){
							videoCapture.cancel();
							alert("Video Cancelled");
						},3000);
							
						},
						"FinalResult":""
					},{
						"VTID":"VT187-3099",
						"RegLevel":"R1",
						"Description":"Video Capture <br/> duration as 10second for videoCapture",
						"PreCondition":[],
						"Steps":["Set duration to 10000", "Call the start method", "Record the video", "Wait for the recording to stop automatically",],
						"ExpectedOutcome":["Recording should stop after 10 second automatically and recorded video should Play for 10 seconds"],
						"testToPerform":function(){
							videoCapture.duration = '10000'
							videoCapture.start();
						},
						"FinalResult":""
					},{
						"VTID":"VT187-3106",
						"RegLevel":"R1",
						"Description":"Video Capture <br/> name as My_123$ for videoCapture",
						"PreCondition":[],
						"Steps":["Set the name as My_123$", "Set Duration to 20 Seconds", "Call the start method", "Record the video", "Call stop method after 10 second", "Check the name of recorded video"],
						"ExpectedOutcome":["The name of the recorded video file should be My_123$.wmv."],
						"testToPerform":function(){
							//deleteFile("./My.wmv");
							//var destFileName = '\\Application\\My.wmv';
							var destFileName = '\\My.wmv';
							videoCapture.name = 'My';
							videoCapture.duration = '20000';
							
							if( true == EB.RhoFile.exists(destFileName)){
      							alert("File: "+ destFileName + " Exists!");
   							};
							videoCapture.start();
							setTimeout(function(){
								videoCapture.stop();
								if( true == EB.RhoFile.exists(destFileName))
								alert("File: "+ destFileName + " Exists!");	
								//alert("File Exists Status: ");
							},10000);
							

						},
						"FinalResult":""
					},{
						"VTID":"VT187-3109",
						"RegLevel":"R1",
						"Description":"Video Capture <br/> Destination to file system with file name",
						"PreCondition":[],
						"Steps":["Set the name as Myvideo", "Set the destination as valid file system (in application/Mine/Test.wmv)","Attach videoSaveEvent on page","Call the start method to start recording","Call stop method before recording finish",],
						"ExpectedOutcome":["The recorded video file should be inside the application/Mine folder of name test.wmv", "videoSaveEvent should fire and retrun value of transferResult.",],
						"testToPerform":function(){
						//	deleteFile("/application/Mine/Test.wmv");
							videoCapture.name = 'Test.wmv';
							videoCapture.destination = "\\Application\\Test.wmv";
							var destFileName = '\\Application\\Test.wmv';
						//	videoCapture.videoSaveEvent="onCaptured('%s')";
						//	function onCaptured(response)
						//		{
						//			message.innerHTML = "Javascript response ="+response;
						//		}
							videoCapture.start();
							videoCapture.duration = '20000';
							if( true == EB.RhoFile.exists(destFileName)){
      							alert("File: "+ destFileName + " Exists!");
   							};
							//setTimeout(function(){
							//	videoCapture.stop();
							//	var fileCheck = Rho.File.is_exist("./My_123.wmv");
							//	alert("File Exists Status: "+fileCheck);
							//},10000);
						},
						"FinalResult":""
					},{
						"VTID":"VT187-3113",
						"RegLevel":"R1",
						"Description":"Video Capture <br/> Destination to FTP",
						"PreCondition":[],
						"Steps":["Set the destination as valid FTP address like FTP://192.168.6.8/Received/Test.wmv.","Set valid username and password","Attach videoSaveEvent on page.","Call the start method to start recording.","Wait for recording to finish."],
						"ExpectedOutcome":["video should be captured and transferred to specified FTP location","videoSaveEvent should retrun 'OK: File Sent' or 'OK: File Received'"],
						"testToPerform":function(){
						//	var ftpsrc = "ftp://ftpadmin:ftpadmin@10.233.85.82/Received/videoFilenew.wmv";
						//	var ftpsrc = "ftp://10.233.85.82/Received/videoFilenew.wmv";
							videoCapture.destination = "ftp://10.233.85.82/Received/video1.wmv";
							videoCapture.username = "ftpadmin";
							videoCapture.password = "ftpadmin";
							videoCapture.videoSaveEvent="onCaptured('%s')";	
							videoCapture.duration = '20000';								
							videoCapture.start();
								
									
						},
						"FinalResult":""
					},{
						"VTID":"VT187-3120",
						"RegLevel":"R1",
						"Description":"Video Capture <br/> Set the destination to HTTP",
						"PreCondition":[],
						"Steps":["Set the destination as valid HTTP address","Set valid username and password","Attach videoSaveEvent on page.","Call the start method to start recording.","Wait for recording to finish."],
						"ExpectedOutcome":["Recorded video should be captured and transferred to specified HTTP location.","videoSaveEvent should fire and retrun value of transferResult"],
						"testToPerform":function(){
							videoCapture.destination = "http://10.233.85.82/NEON/ReceivedFiles/Upload.aspx";
							videoCapture.name = 'Test1.wmv';
							videoCapture.username = "ftpadmin";
							videoCapture.password = "ftpadmin";
							videoCapture.videoSaveEvent="onCaptured('%s')";	
							videoCapture.duration = '20000';								
							videoCapture.start();
							
						},
						"FinalResult":""	
					},
					{
						"VTID":"VT187-3124",
						"RegLevel":"R1",
						"Description":"Video Capture <br/> Destination HTTP with wrong password",
						"PreCondition":[],
						"Steps":["Set the destination as valid HTTP address","Set valid username and invalid password","Attach videoSaveEvent on page.","Call the start method to start recording.","Wait for recording to finish."],
						"ExpectedOutcome":["Recorded video should be captured and transferred to specified HTTP location.","videoSaveEvent should fire and retrun value of transferResult"],
						"testToPerform":function(){
							videoCapture.destination = "http://10.233.85.82/NEON/ReceivedFiles/Upload.aspx";
							videoCapture.username = "ftpadmin";
							videoCapture.password = "ftpadmin1";
							videoCapture.videoSaveEvent="onCaptured('%s')";	
							videoCapture.duration = '20000';								
							videoCapture.start();
							
						
						},
						"FinalResult":""
					},
					{
						"VTID":"VT187-3128",
						"RegLevel":"R1",
						"Description":"Video Capture <br/> Destination as fully qualified URL HTTP",
						"PreCondition":[],
						"Steps":["Set the destination as qualified URL HTTP like http://192.168.6.18:80/NEON/ReceivedFiles/Upload.aspx","Attach videoSaveEvent on page.","Call the start method to start recording.","Wait for recording to finish."],
						"ExpectedOutcome":["Recorded video should be captured and transferred to specified HTTP location.","videoSaveEvent should fire and retrun value of transferResult"],
						"testToPerform":function(){
							videoCapture.destination = "http://10.233.85.82:80/NEON/ReceivedFiles/Upload.aspx";
							//videoCapture.username = "ftpadmin";
							//videoCapture.password = "ftpadmin";
							videoCapture.videoSaveEvent="onCaptured('%s')";	
							videoCapture.duration = '20000';								
							videoCapture.start();
							
						
						},
						"FinalResult":""

				},{
						"VTID":"VT187-3131",
						"RegLevel":"R1",
						"Description":"Video Capture <br/> videoSaveEvent with URL for page navigation",
						"PreCondition":[],
						"Steps":["Set the destination as local file system","Attach videoSaveEvent on page.","Call the start method to start recording.","Wait for recording to finish."],
						"ExpectedOutcome":["videoSaveEvent should fire and cause to navigate the specified url page after the recorded video gets saved."],
						"testToPerform":function(){
							videoCapture.destination = "file://\\Temp\\CapturedvideoTemp.wmv";
							videoCapture.username = "ftpadmin";
							videoCapture.password = "ftpadmin";
							videoCapture.videoSaveEvent="url('http://10.233.85.82/Navigate.html?Resposnse=%s')";	
							videoCapture.duration = '20000';								
							videoCapture.start();
							
						
						},
						"FinalResult":""
				},{
						"VTID":"VT187-3134",
						"RegLevel":"R1",
						"Description":"Video Capture <br/> videoSaveEvent of JSON Object type",
						"PreCondition":[],
						"Steps":["Set the destination as FTP with valid username and password"," Attach videoSaveEvent of JSON Object type","Call the start method to start recording.","Wait for recording to finish."],
						"ExpectedOutcome":["video should be captured and transferred to specified FTP location","videoSaveEvent should fire and should return the appropriate transferResult value'"],
						"testToPerform":function(){
							videoCapture.destination = "ftp://10.233.85.82/Received/videoFilenew.wmv"
							videoCapture.username = "ftpadmin";
							videoCapture.password = "ftpadmin";
							videoCapture.videoSaveEvent="onCapturedjson(%json)";	
							videoCapture.duration = '20000';								
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

function onCaptured(response)
{
	var sig = document.getElementById("actualResult");
	var theOutput = "<BR><BR><B>Javascript response  </B>";
	theOutput = theOutput + "Response " + response + "<BR>";
	sig.innerHTML = "Javascript response ="+theOutput;
}
var fileCheck = function(){
        var sig = document.getElementById("actualResult"); 
	    if( true == EB.File.is_exist(destFileName));
   {
      alert("File: "+ destFileName + " Exists!");
   }
        
}
function mytimeoutjs(time)
{
var sig = document.getElementById("actualResult"); 
sig.innerHTML="Current time is using javascript is:"+time;
}
var deleteFile = function(destFileName){
			var deleteFile = EB.File.is_exist(fileName);
			if( true == deleteFile){
				EB.File.do_delete(fileName);
			}
		}