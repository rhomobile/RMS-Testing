/*function callBackFunc(param) {
	       var sig = document.getElementById("actualResult"); 
	       sig.innerHTML = "Param: "+ param;
}*/

(function(){
	var pbTest = function(){
		var pbTestObj = {};
		pbTestObj.testCases = [
		
		{
		    "VTID":"VT366-0087",
            "RegLevel":"R1",
		    "Description":"Linear gesture Diagonstic False",
		    "PreCondition":[],
		    "Steps":["Create a Gesture of Type = Linear,ID ='My linear Gesture' and with Diagonstic value = false", "Draw a line on the screen approximately similar to the gesture line.", "Call an URL on detection of gesture."],
		    "ExpectedOutcome":["Diagonstics shuld not be shown on screen.", "Proper ID should be returned inside the event.","After gesture detection the http site mentioned in gesture-Detected event will be opened."],

		    "testToPerform":function(){
				myPage = document.getElementById('mainBlock').innerHTML;
		    	document.getElementById('mainBlock').innerHTML = "<div id='actualResult'>No Gesture found Yet.</div><br><input type='button' value='back' onclick='backToTest()' />";

		    	gesture.id = "My Linear Gesture";
		    	gesture.type = "linear";
		    	gesture.startX = '100';
		    	gesture.startY = '300';
		    	gesture.endX = '300';
		    	gesture.endY = '300';
		    	gesture.tolerance = '20';
                gesture.skew = '20';
		    	gesture.deviation = '50';
		    	gesture.regionWidth = '30';
		    	gesture.sensitivity = '80';
		    	gesture.preset = 'left-right';
		    	gesture.diagnostics = 'FALSE';
		    	gesture.create();
		    	gesture.detected = "url('Javascript:onGesture('%s','%s');')";

		    },
		    "FinalResult":""
		}

		];
		pbTestObj.afterEach = function(){
			gesture.type = 'NONE';
			gesture.id = 'MyLinearGesture';
			gesture.preset = 'linear';
			gesture.diagnostics = 'FALSE';
			gesture.skew = '20';
			gesture.deviation = '20';
			gesture.start = '0';
			gesture.end = '180';
			gesture.sensitivity = '50';
			gesture.radius = '80';
			gesture.delay = '1000';
			gesture.interval = '0';
			var EventCounter = 1;
		}
		return pbTestObj;
	}
	window.pbTest = pbTest();
})();
