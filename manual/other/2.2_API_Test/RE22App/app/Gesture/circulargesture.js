/*function callBackFunc(param) {
	       var sig = document.getElementById("actualResult"); 
	       sig.innerHTML = "Param: "+ param;
}*/

(function(){
	var pbTest = function(){
		var pbTestObj = {};
		pbTestObj.testCases = [
		

		{
		    "VTID":"VT187-0072",
            "RegLevel":"R1",
		    "Description":"Circular gesture - preset:happy",
		    "PreCondition":[],
		    "Steps":["The preset value is set to Happy for a Circular gesture.", "All the Circular Gesture Parameters are set to Null", "Explicitly Set the Diagonstic value to true", "Draw a line(clockwise) on the screen approximately similar to the Circular gesture line."],
		    "ExpectedOutcome":["Circular Gesture  should be created with specified  preset.", "Happy means a 180 degree semi-circle, clockwise from the 3 o'clock position", "Circular  Gesture should be detected and ID should be displayed as Circle-Happy."],
		    "testToPerform":function(){
				myPage = document.getElementById('mainBlock').innerHTML;
		    	document.getElementById('mainBlock').innerHTML = "<div id='actualResult'>No Gesture found Yet.</div><br><input type='button' value='back' onclick='backToTest()' />";
		    	gesture.id = 'NULL';
		    	gesture.type = 'Circle';
		    	gesture.startX = 'NULL';
		    	gesture.startY = 'NULL';
		    	gesture.endX = 'NULL';
		    	gesture.endY = 'NULL';
		    	gesture.tolerance = 'NULL';
		    	gesture.regionWidth = 'NULL';
		    	gesture.sensitivity = 'NULL';
		    	gesture.skew = 'NULL';
		    	gesture.deviation = 'NULL';
		    	gesture.preset = 'happy';
		    	gesture.diagnostics = 'TRUE';
		    	gesture.create();
		    	gesture.detected = "url('Javascript:onGesture('%s','%s');')";

		    },
		    "FinalResult":""
		},

		{
		    "VTID":"VT187-0077",
            "RegLevel":"R1",
		    "Description":"Circular gesture - with center values(100,150).",
		    "PreCondition":[],
		    "Steps":["The value of Center-x and Center-Y are set to (100,150) for Circular Gesture.", "Explicitly Set the Diagonstic value to true", "Draw a curvilinear line on the screen approximately similar to the gesture circle."],
		    "ExpectedOutcome":["Circular gesture should be created at specified center coordinates.", "Circular gesture should be detected."],
		    "testToPerform":function(){
				myPage = document.getElementById('mainBlock').innerHTML;
		    	document.getElementById('mainBlock').innerHTML = "<div id='actualResult'>No Gesture found Yet.</div><br><input type='button' value='back' onclick='backToTest()' />";
		    	gesture.id = 'MyCircularGesture';
		    	gesture.type = 'Circle';
		    	gesture.centerX = '100';
		    	gesture.centerY = '150';
		    	gesture.radius = '100';
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
		},

		{
		    "VTID":"VT187-0085",
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
		},

		{
		    "VTID":"VT187-0094",
            "RegLevel":"R1",
		    "Description":"Circular gesture - with start and end value to 360 and 0.",
		    "PreCondition":[],
		    "Steps":["The values of start=360,end=0 are Set", "Explicitly Set the Diagonstic value to true", "Draw a curvilinear line on the screen approximately similar to the gesture circle."],
		    "ExpectedOutcome":["Circular gesture should be created at specified center coordinates.", "Circular gesture should be detected in anticlockwise."],
		    "testToPerform":function(){
				myPage = document.getElementById('mainBlock').innerHTML;
		    	document.getElementById('mainBlock').innerHTML = "<div id='actualResult'>No Gesture found Yet.</div><br><input type='button' value='back' onclick='backToTest()' />";
		    	gesture.id = 'MyCircularGesture';
		    	gesture.type = 'Circle';
		    	gesture.centerX = '100';
		    	gesture.centerY = '150';
		    	gesture.radius = '150';
		    	gesture.start = '360';
		    	gesture.end = '0';
		    	gesture.preset = 'happy';
		    	gesture.tolerance = '30';
		    	gesture.sensitivity = '80';
		    	gesture.diagnostics = 'TRUE';
		    	gesture.create();
		    	gesture.detected = "url('Javascript:onGesture('%s','%s');')";

		    },
		    "FinalResult":""
		},

		{
		    "VTID":"VT187-0103",
            "RegLevel":"R1",
		    "Description":"Circular gesture - with tolerance value to 30.",
		    "PreCondition":[],
		    "Steps":["The values of tolerance=30 are Set", "Explicitly Set the Diagonstic value to true", "Draw a curvilinear line on the screen approximately similar to the gesture circle."],
		    "ExpectedOutcome":["Circular gesture should be detected when the line is drawn in tolerance region", "If any part of the circular line goes outside the tolerance region gesture should not be detected","Tolerance tells that how far (in pixels) the mouse track can vary from the gesture path."],
		    "testToPerform":function(){
				myPage = document.getElementById('mainBlock').innerHTML;
		    	document.getElementById('mainBlock').innerHTML = "<div id='actualResult'>No Gesture found Yet.</div><br><input type='button' value='back' onclick='backToTest()' />";
		    	gesture.id = 'MyCircularGesture';
		    	gesture.type = 'Circle';
		    	gesture.centerX = '100';
		    	gesture.centerY = '150';
		    	gesture.radius = '150';
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
		},

		{
		    "VTID":"VT187-0110",
            "RegLevel":"R1",
		    "Description":"Circular gesture - with default sensitivity",
		    "PreCondition":[],
		    "Steps":["Sensitivity is set to default", "Explicitly Set the Diagonstic value to true", "Draw a curvilinear line on the screen approximately similar to the gesture circle such that it passes through at least 100% of the small circles"],
		    "ExpectedOutcome":["Circular gesture should be detected when the line is drawn such that,it passes through at least 100% of the small circles.", "Circular gesture should not be detected when the line is drawn such that, it does not pass through at least 100% of the small circles."],
		    "testToPerform":function(){
				myPage = document.getElementById('mainBlock').innerHTML;
		    	document.getElementById('mainBlock').innerHTML = "<div id='actualResult'>No Gesture found Yet.</div><br><input type='button' value='back' onclick='backToTest()' />";
		    	gesture.id = 'MyCircularGesture';
		    	gesture.type = 'Circle';
		    	gesture.centerX = '100';
		    	gesture.centerY = '150';
		    	gesture.radius = '150';
		    	gesture.start = '0';
		    	gesture.end = '180';
		    	gesture.preset = 'happy';
		    	gesture.tolerance = '30';
		     	gesture.diagnostics = 'TRUE';
		    	gesture.create();
		    	gesture.detected = "url('Javascript:onGesture('%s','%s');')";

		    },
		    "FinalResult":""
		},

		

		{
		    "VTID":"VT187-0151",
            "RegLevel":"R1",
		    "Description":"Test Gestures event of JSON object type",
		    "PreCondition":[],
		    "Steps":["Explicitly Set the Diagonstic value to true", "JSON Object type gesture event","Create the Gesture."],
		    "ExpectedOutcome":["Gesture should be detected and event should fire", "Event parameters value should be returned"],
		    "testToPerform":function(){
				myPage = document.getElementById('mainBlock').innerHTML;
		    	document.getElementById('mainBlock').innerHTML = "<div id='actualResult'>No Gesture found Yet.</div><br><input type='button' value='back' onclick='backToTest()' />";
		    	gesture.id = 'My Linear Gesture';
		    	gesture.type = 'Circle';
		    	gesture.centerX = '100';
		    	gesture.centerY = '150';
		    	gesture.radius = '150';
		    	gesture.start = '0';
		    	gesture.end = '180';
		    	gesture.preset = 'happy';
		    	gesture.tolerance = '30';
		     	gesture.diagnostics = 'TRUE';
		      	gesture.create();
		    	gesture.detected = "url('onGestureJSON(%json);')";

		    },
		    "FinalResult":""
		},

		
		{
		    "VTID":"VT187-0160",
            "RegLevel":"R1",
		    "Description":"Test Gesture event as HTTP URL",
		    "PreCondition":[],
		    "Steps":["Explicitly Set the Diagonstic value to true", "HTML Object type gesture event","Create the Gesture."],
		    "ExpectedOutcome":["Gesture event should fire and cause to navigate to the specified HTTP location on gesture detection."],
		    "testToPerform":function(){
				myPage = document.getElementById('mainBlock').innerHTML;
		    	document.getElementById('mainBlock').innerHTML = "<div id='actualResult'>No Gesture found Yet.</div><br><input type='button' value='back' onclick='backToTest()' />";
		    	gesture.id = 'My Linear Gesture';
		    	gesture.type = 'Circle';
		    	gesture.centerX = '100';
		    	gesture.centerY = '150';
		    	gesture.radius = '150';
		    	gesture.start = '0';
		    	gesture.end = '180';
		    	gesture.preset = 'happy';
		    	gesture.tolerance = '30';
		     	gesture.diagnostics = 'TRUE';
		      	gesture.create();
		    	gesture.detected = "url('http://10.233.85.82/pb3.x/Gesture/gesture.asp?ID=%s&COUNT=%s')";

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
