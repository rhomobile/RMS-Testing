
describe("VedioCapture FD  Tests", function () {

	describe("1st set of test cases", function () {

        it("Video Capture <br/> Start videoCapture", function () {
            var spec = new ManualSpec(jasmine, window.document);
            spec.addGoal(jasmine.getEnv().currentSpec.description);
            spec.addExpectation("Start method should start to capture the video and should stop after 5 seconds");
            spec.displayScenario();
            spec.waitForButtonPressing("Run test");
            runs(function () {
                videoCapture.duration = '5000';
				videoCapture.start();
                spec.waitForResponse();
            });
        });

        it("Video Capture <br/> Start videoCapture with stop", function () {
            var spec = new ManualSpec(jasmine, window.document);
            spec.addGoal(jasmine.getEnv().currentSpec.description);
            spec.addExpectation("Start method should start to capture the video and should stop after 5 seconds");
            spec.displayScenario();
            spec.waitForButtonPressing("Run test");
            runs(function () {
				videoCapture.start();
				setTimeout(function(){
					videoCapture.stop();	
					
				},3000);

            });

            runs(function () {
				spec.addResult("user msg","Video Stopped");
                spec.displayResults();
               	spec.waitForResponse();
            });
        });

	});


});

// can be implemented, but time consuming


/*(function(){
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
}*/
