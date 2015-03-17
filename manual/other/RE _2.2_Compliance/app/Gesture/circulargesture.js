/*function callBackFunc(param) {
	       var sig = document.getElementById("actualResult"); 
	       sig.innerHTML = "Param: "+ param;
}*/

(function(){
	var pbTest = function(){
		var pbTestObj = {};
		pbTestObj.testCases = [

		{
		    "VTID":"VT366-0088",
            "RegLevel":"R1",
		    "Description":"Circular gesture - with radius value of 80.",
		    "PreCondition":[],
		    "Steps":["The radius is Set to 80", "Explicitly Set the Diagonstic value to true", "Draw a curvilinear line on the screen approximately similar to the gesture circle."],
		    "ExpectedOutcome":["Radius should be set to 80.","Circular gesture should be created at specified center coordinates.", "Circular gesture should be detected."],
		    "testToPerform":function(){
				myPage = document.getElementById('mainBlock').innerHTML;
		    	document.getElementById('mainBlock').innerHTML = "<div id='actualResult'>No Gesture found Yet.</div><br><input type='button' value='back' onclick='backToTest()' />";
		    	gesture.id = 'MyCircularGesture';
		    	gesture.type = 'Circle';
		    	gesture.centerX = '100';
		    	gesture.centerY = '150';
		    	gesture.radius = '80';
		    	gesture.start = '0';
		    	gesture.end = '180';
		    	gesture.preset = 'happy';
		    	gesture.tolerance = '30';
		    	gesture.sensitivity = '80';
		    	gesture.diagnostics = 'TRUE';
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
