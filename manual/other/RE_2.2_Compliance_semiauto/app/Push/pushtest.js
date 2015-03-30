
(function(){
	var pbTest = function(){
		var pbTestObj = {};
		function onCaptured(response){
			main.displayResult("video save event response: " + response);
		}
		pbTestObj.testCases = [
		{
						"VTID":"VT366-0285",
						"RegLevel":"R1",
						"Description":"Push with start",
						"PreCondition":[],
						"Steps":["1. Attach the push-detected event."],
						"ExpectedOutcome":["Detected event should fire and should return the value mentioned in client request url","Device push server should respond to the client request successfully and default response like  'RE Push Received OK' is shown on client side."],
						"testToPerform":function(){
						     push.detected = "doLocatejs('%s');";
						     push.port = 8080;
						     push.passKey = '';
						     push.start();

						},
						"FinalResult":""
					},{
						"VTID":"VT366-0286",
						"RegLevel":"R1",
						"Description":"Push with Stop when port is set to 8080",
						"PreCondition":[],
						"Steps":["1. Attach the push-detected event and set port value to 8080","2. Set Passkey value to 12345.","3. Call Start() method.","4. Call Stop() method.","5. Send http request from client to device server on port 8080 with passkey."],
						"ExpectedOutcome":["Device server should not respond to the client request successfully as device server is stopped."],
						"testToPerform":function(){
							 push.stop();
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