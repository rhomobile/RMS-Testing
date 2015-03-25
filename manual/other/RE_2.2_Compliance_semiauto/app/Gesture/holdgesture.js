/*function callBackFunc(param) {
	       var sig = document.getElementById("actualResult"); 
	       sig.innerHTML = "Param: "+ param;
}*/

(function(){
	var pbTest = function(){
		var pbTestObj = {};
		pbTestObj.testCases = [

		{
		    "VTID":"VT366-0089",
            "RegLevel":"R1",
		    "Description":"Hold gesture - Interval to 3000 and Delay to 1000",
		    "PreCondition":[],
		    "Steps":["The value of interval is set to 3000 for Hold Gesture.", "Explicitly Set the Diagonstic value to true", "Press and hold the stylus inside the Gesture circle."],
		    "ExpectedOutcome":["Radius should be set to 60.", "Hold gesture should be detected."],
		    "testToPerform":function(){
				myPage = document.getElementById('mainBlock').innerHTML;
		    	document.getElementById('mainBlock').innerHTML = "<div id='actualResult'>No Gesture found Yet.</div><br><input type='button' value='back' onclick='backToTest()' />";
		    	gesture.id = 'My Hold Gesture';
		    	gesture.type = 'Hold';
		    	gesture.centerX = '100';
		    	gesture.centerY = '150';
		    	gesture.radius = '60';
		    	gesture.preset = 'center';
		    	gesture.diagnostics = 'TRUE';
		    	gesture.delay = '1000';
		    	gesture.interval = '3000';
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
