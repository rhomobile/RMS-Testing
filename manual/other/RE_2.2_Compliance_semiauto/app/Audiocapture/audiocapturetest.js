var a=0;
function callBackFunc(param) {
	       var sig = document.getElementById("actualResult"); 
	       sig.innerHTML = "Param: "+ param;
}
function onCaptured(response)
{   //alert('hi');
   // setTimeout(function(){
	var message1 = "Javascript response ="+response;
	main.displayResult(message1);
  // },2000);
}

function onCapturedjson(jsondata)
{
	var message2 = "JSON response: " +jsondata.transferResult;
	main.displayResult(message2);
}


(function(){
	var pbTest = function(){
		var pbTestObj = {};
		pbTestObj.testCases = [
		{
				"VTID":"VT366-0269",
				"RegLevel":"R1",
				"Description":"Start audioCapture",
				"PreCondition":[],
				"Steps":["1.Don't set any duration","2.call the start method","3.Record few discussion","4.Don't call stop method","5.Play the recorded audio"],
				"ExpectedOutcome":["Start method should start to capture the audio and should stop after 20 seconds "],
				"testToPerform":function(){
					//AudioCapture.destination = "url('file://\\Temp\\CapturedaudioTemporary.wav')"
					//alert('1');
					audioCapture.destination = "url('ftp://10.233.85.82/Received/audioFileInFTP.wav')";
					//alert('2');
					audioCapture.username = 'ftpadmin';
					audioCapture.password = 'ftpadmin';
					//alert('hi');
					audioCapture.audioSaveEvent = "onCaptured('%s')";
					//alert('hi1');
					audioCapture.start();
					
				},
				"FinalResult":""
			},{
				"VTID":"VT366-0270",
				"RegLevel":"R1",
				"Description":"Destination to FTP",
				"PreCondition":[],
				"Steps":["1.Set the destination as valid FTP address like FTP://192.168.6.8/Received/Test.wav and attach the event","2.Set valid username and password","3.call the start method","4.Record few discussion","5.check the recorded audio file at specified location","6.Check for the return value of audioSaveEvent"],
				"ExpectedOutcome":["1.audio should be captured and transferred to specified FTP location.","2.audioSaveEvent should retrun 'OK: File Sent' or 'OK: File Received' "],
				"testToPerform":function(){
					audioCapture.destination = "url('ftp://10.233.85.82/Received/audioFileInFTP.wav')";
					audioCapture.username = 'ftpadmin';
					audioCapture.password = 'ftpadmin';
					audioCapture.audioSaveEvent="onCaptured('%s')";
					audioCapture.start();
				},
				"FinalResult":""
			}

		];
		pbTestObj.afterEach = function(){
			audioCapture.duration = 20000;
		}
		return pbTestObj;
	}
	window.pbTest = pbTest();
})();