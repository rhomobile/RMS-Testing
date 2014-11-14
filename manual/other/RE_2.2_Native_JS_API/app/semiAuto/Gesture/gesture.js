/*function callBackFunc(param) {
	       var sig = document.getElementById("actualResult"); 
	       sig.innerHTML = "Param: "+ param;
}*/

(function(){
	var pbTest = function(){
		var pbTestObj = {};
		pbTestObj.testCases = [
		{
				"VTID":"VT187-0005",
            "RegLevel":"R1",
		    "Description":"Gesture - Gesture Type=linear",
		    "PreCondition":[],
		    "Steps":["Create a Gesture of Type=Linear,ID='My linear Gesture' and with default Diagonstic value(false)", "Draw a line on the screen approximately similar to the gesture line.", " Call an URL on detection of gesture."],
		    "ExpectedOutcome":["Linear Gesture should be detected.", "Proper ID should be returned inside the event.", "After gesture detection the http site mentioned in gesture-Detected event will be opened."],
		    "testToPerform":function(){
				myPage = document.getElementById('mainBlock').innerHTML;
		    	document.getElementById('mainBlock').innerHTML = "<div id='actualResult'>No Gesture found Yet.</div><br><input type='button' value='back' onclick='backToTest()' />";
		    	gesture.id = "My Linear Gesture";
		    	gesture.type = "linear";
		    	gesture.startX = '10';
		    	gesture.startY = '200';
		    	gesture.endX = '150';
		    	gesture.endY = '200';
		    	gesture.preset = 'left-right';
		    	gesture.tolerance = '50';
		    	gesture.regionWidth = '20';
		    	gesture.sensitivity = '80';
		    	gesture.skew = '15';
		    	gesture.deviation = '10';
		    	gesture.diagnostics = 'TRUE';
		    	gesture.create();
		    	gesture.detected = "url('Javascript:onGesture('%s','%s');')";

		    },
		    "FinalResult":""
		},
		{
		    "VTID":"VT187-0006",
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
		    	gesture.preset = 'left-right';
		    	gesture.tolerance = '20';
		    	gesture.regionWidth = '30';
		    	gesture.sensitivity = '80';
		    	gesture.skew = '20';
		    	gesture.deviation = '50';
		    	gesture.diagnostics = 'FALSE';
		    	gesture.create();
		    	gesture.detected = "url('Javascript:onGesture('%s','%s');')";

		    },
		    "FinalResult":""
		},

		{
		    "VTID":"VT187-0014",
            "RegLevel":"R1",
		    "Description":"Linear gesture - preset:Right-left",
		    "PreCondition":[],
		    "Steps":["Create a Gesture of Type = Linear,ID ='My linear Gesture' and Set the preset value to right-left for a linear gesture.", "All the Linear Gesture Parameters are set to Null", "Explicitly Set the Diagonstic value to true", "Draw a line on the screen approximately similar to the gesture line."],
		    "ExpectedOutcome":["Linear Gesture should be detected and ID should be displayed as linear-right-left."],
		    "testToPerform":function(){
				myPage = document.getElementById('mainBlock').innerHTML;
		    	document.getElementById('mainBlock').innerHTML = "<div id='actualResult'>No Gesture found Yet.</div><br><input type='button' value='back' onclick='backToTest()' />";
		    	gesture.id = "NULL";
		    	gesture.type = "linear";
		    	gesture.startX = 'NULL';
		    	gesture.startY = 'NULL';
		    	gesture.endX = 'NULL';
		    	gesture.endY = 'NULL';
		    	gesture.preset = 'right-left';
		    	gesture.tolerance = 'NULL';
		    	gesture.regionWidth = 'NULL';
		    	gesture.sensitivity = 'NULL';
		    	gesture.skew = 'NULL';
		    	gesture.deviation = 'NULL';
		    	gesture.diagnostics = 'TRUE';
		    	gesture.create();
		    	gesture.detected = "url('Javascript:onGesture('%s','%s');')";

		    },
		    "FinalResult":""
		},

		{
		    "VTID":"VT187-0016",
            "RegLevel":"R1",
		    "Description":"Linear gesture - preset:top-bottom",
		    "PreCondition":[],
		    "Steps":["Create a Gesture of Type = Linear,ID ='My linear Gesture' and Set the preset value to top-bottom for a linear gesture.", "All the Linear Gesture Parameters are set to Null", "Explicitly Set the Diagonstic value to true", "Draw a line on the screen approximately similar to the gesture line."],
		    "ExpectedOutcome":["Linear Gesture should be detected and ID should be displayed as linear-right-left."],
		    "testToPerform":function(){
				myPage = document.getElementById('mainBlock').innerHTML;
		    	document.getElementById('mainBlock').innerHTML = "<div id='actualResult'>No Gesture found Yet.</div><br><input type='button' value='back' onclick='backToTest()' />";
		    	gesture.id = "NULL";
		    	gesture.type = "linear";
		    	gesture.startX = 'NULL';
		    	gesture.startY = 'NULL';
		    	gesture.endX = 'NULL';
		    	gesture.endY = 'NULL';
		    	gesture.preset = 'top-bottom';
		    	gesture.tolerance = 'NULL';
		    	gesture.regionWidth = 'NULL';
		    	gesture.sensitivity = 'NULL';
		    	gesture.skew = 'NULL';
		    	gesture.deviation = 'NULL';
		    	gesture.diagnostics = 'TRUE';
		    	gesture.create();
		    	gesture.detected = "url('Javascript:onGesture('%s','%s');')";

		    },
		    "FinalResult":""
		},

		{
		    "VTID":"VT187-0021",
            "RegLevel":"R1",
		    "Description":"Linear gesture - start-x :10,start-y:200,end-x:150,end-y:200",
		    "PreCondition":[],
		    "Steps":["Start-x and start-y to (10,200) and end-X and end-Y(150,200) for Linear Gesture.", "Explicitly the Diagonstic value is Set to true", "Draw a line on the screen approximately similar to the gesture line."],
		    "ExpectedOutcome":["Linear gesture should be created with specified start and end point.", "Linear Gesture should be detected."],
		    "testToPerform":function(){
				myPage = document.getElementById('mainBlock').innerHTML;
		    	document.getElementById('mainBlock').innerHTML = "<div id='actualResult'>No Gesture found Yet.</div><br><input type='button' value='back' onclick='backToTest()' />";
		    	gesture.id = "My Linear Gesture";
		    	gesture.type = "linear";
		    	gesture.startX = '10';
		    	gesture.startY = '200';
		    	gesture.endX = '150';
		    	gesture.endY = '200';
		    	gesture.preset = 'left-right';
		    	gesture.tolerance = '20';
		    	gesture.regionWidth = '200';
		    	gesture.sensitivity = '80';
		    	gesture.skew = '15';
		    	gesture.deviation = '20';
		    	gesture.diagnostics = 'TRUE';
		    	gesture.create();
		    	gesture.detected = "url('Javascript:onGesture('%s','%s');')";

		    },
		    "FinalResult":""
		},

		{
		    "VTID":"VT187-0035",
            "RegLevel":"R1",
		    "Description":"Linear gesture - Tolerance 50",
		    "PreCondition":[],
		    "Steps":["The  tolerance is Set to 50 for Linear Gesture.", "Explicitly the Diagonstic value is Set to true", "Draw a line on the screen approximately similar to the gesture line Inside the Active Gesture Area(Rectangle)."],
		    "ExpectedOutcome":["The height of the rectangle should be changed when tolerance value is changed.", "Linear gesture should be detected when line is drawn inside the rectangle and should not be detected when it is drawn outside ot partly outside.", "If any part of the line fall outside the active gesture area gesture should not be detected"],
		    "testToPerform":function(){
				myPage = document.getElementById('mainBlock').innerHTML;
		    	document.getElementById('mainBlock').innerHTML = "<div id='actualResult'>No Gesture found Yet.</div><br><input type='button' value='back' onclick='backToTest()' />";
		    	gesture.id = "My Linear Gesture";
		    	gesture.type = "linear";
		    	gesture.startX = '10';
		    	gesture.startY = '200';
		    	gesture.endX = '150';
		    	gesture.endY = '200';
		    	gesture.preset = 'left-right';
		    	gesture.tolerance = '50';
		    	gesture.regionWidth = '200';
		    	gesture.sensitivity = '80';
		    	gesture.skew = '25';
		    	gesture.deviation = '20';
		    	gesture.diagnostics = 'TRUE';
		    	gesture.create();
		    	gesture.detected = "url('Javascript:onGesture('%s','%s');')";

		    },
		    "FinalResult":""
		},

		{
		    "VTID":"VT187-0043",
            "RegLevel":"R1",
		    "Description":"Linear gesture - Skew 15",
		    "PreCondition":[],
		    "Steps":["The Skew value is Set to 15 for a linear gesture.", "Explicitly the Diagonstic value is Set to true", "Draw a line on the screen approximately similar to the gesture line Inside the Active Gesture Area(Rectangle) making an angle more than 45 degree with the gesture line."],
		    "ExpectedOutcome":["Linear gesture should be detected when line is drawn inside the rectangle making an angle less  than 15 degree with the gesture line and should not be detected when it is drawn making an angle more  than 15 degree."],
		    "testToPerform":function(){
				myPage = document.getElementById('mainBlock').innerHTML;
		    	document.getElementById('mainBlock').innerHTML = "<div id='actualResult'>No Gesture found Yet.</div><br><input type='button' value='back' onclick='backToTest()' />";
		    	gesture.id = "My Linear Gesture";
		    	gesture.type = "linear";
		    	gesture.startX = '10';
		    	gesture.startY = '200';
		    	gesture.endX = '150';
		    	gesture.endY = '200';
		    	gesture.preset = 'left-right';
		    	gesture.tolerance = '50';
		    	gesture.regionWidth = '200';
		    	gesture.sensitivity = '80';
		    	gesture.skew = '15';
		    	gesture.deviation = '20';
		    	gesture.diagnostics = 'TRUE';
		    	gesture.create();
		    	gesture.detected = "url('Javascript:onGesture('%s','%s');')";

		    },
		    "FinalResult":""
		},

		{
		    "VTID":"VT187-0051",
            "RegLevel":"R1",
		    "Description":"Linear gesture - deviation 10",
		    "PreCondition":[],
		    "Steps":["The deviation value is Set to 10 for a Linear Gesture", "Explicitly the Diagonstic value is Set to true", "Draw a line on the screen approximately similar to the gesture line Inside the Active Gesture Area(Rectangle) which will be straight", "Draw a line on the screen approximately similar to the gesture line Inside the Active Gesture Area(Rectangle) which will be curvilinear,and deviating from straight line."],

		    "ExpectedOutcome":["Linear gesture should be detected  when deviation is less than 10 and should not be detected when deviation is more than 10 and line more curvilinear."],
		    "testToPerform":function(){
				myPage = document.getElementById('mainBlock').innerHTML;
		    	document.getElementById('mainBlock').innerHTML = "<div id='actualResult'>No Gesture found Yet.</div><br><input type='button' value='back' onclick='backToTest()' />";
		    	gesture.id = "My Linear Gesture";
		    	gesture.type = "linear";
		    	gesture.startX = '10';
		    	gesture.startY = '200';
		    	gesture.endX = '150';
		    	gesture.endY = '200';
		    	gesture.preset = 'left-right';
		    	gesture.tolerance = '50';
		    	gesture.regionWidth = '200';
		    	gesture.sensitivity = '80';
		    	gesture.skew = '15';
		    	gesture.deviation = '10';
		    	gesture.diagnostics = 'TRUE';
		    	gesture.create();
		    	gesture.detected = "url('Javascript:onGesture('%s','%s');')";

		    },
		    "FinalResult":""
		},

		{
		    "VTID":"VT187-0059",
            "RegLevel":"R1",
		    "Description":"Linear gesture - Region width 20",
		    "PreCondition":[],
		    "Steps":["The RegionWidth is Set to 20 for Linear Gesture.", "Explicitly the Diagonstic value is Set to true", "Draw a line on the screen approximately similar to the gesture line Inside the Active Gesture Area(Rectangle)"],

		    "ExpectedOutcome":["Linear Gesture should be detected.","Active Gesture area(Rectangle) should be divided into a number of ovelapping rectangles of width= region width"],
		    "testToPerform":function(){
				myPage = document.getElementById('mainBlock').innerHTML;
		    	document.getElementById('mainBlock').innerHTML = "<div id='actualResult'>No Gesture found Yet.</div><br><input type='button' value='back' onclick='backToTest()' />";
		    	gesture.id = "My Linear Gesture";
		    	gesture.type = "linear";
		    	gesture.startX = '10';
		    	gesture.startY = '200';
		    	gesture.endX = '150';
		    	gesture.endY = '200';
		    	gesture.preset = 'left-right';
		    	gesture.tolerance = '50';
		    	gesture.regionWidth = '20';
		    	gesture.sensitivity = '80';
		    	gesture.skew = '15';
		    	gesture.deviation = '10';
		    	gesture.diagnostics = 'TRUE';
		    	gesture.create();
		    	gesture.detected = "url('Javascript:onGesture('%s','%s');')";

		    },
		    "FinalResult":""
		},

		{
		    "VTID":"VT187-0063",
            "RegLevel":"R1",
		    "Description":"Linear gesture - RegionWidth=40 and Sensitivity=100",
		    "PreCondition":[],
		    "Steps":["RegionWidth=40 and Sensitivity=100 for Linear Gesture.", "Explicitly the Diagonstic value is Set to true", "Draw a line on the screen approximately similar to the gesture line Inside the Active Gesture Area(Rectangle)"],

		    "ExpectedOutcome":["Linear Gesture should be detected.","Active Gesture area(Rectangle) should be divided into a number of ovelapping rectangles of width= region width"],
		    "testToPerform":function(){
				myPage = document.getElementById('mainBlock').innerHTML;
		    	document.getElementById('mainBlock').innerHTML = "<div id='actualResult'>No Gesture found Yet.</div><br><input type='button' value='back' onclick='backToTest()' />";
		    	gesture.id = "My Linear Gesture";
		    	gesture.type = "linear";
		    	gesture.startX = '10';
		    	gesture.startY = '200';
		    	gesture.endX = '150';
		    	gesture.endY = '200';
		    	gesture.preset = 'left-right';
		    	gesture.tolerance = '50';
		    	gesture.regionWidth = '40';
		    	gesture.sensitivity = '100';
		    	gesture.skew = '15';
		    	gesture.deviation = '10';
		    	gesture.diagnostics = 'TRUE';
		    	gesture.create();
		    	gesture.detected = "url('Javascript:onGesture('%s','%s');')";

		    },
		    "FinalResult":""
		},

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
		    	gesture.preset = 'happy';
		    	gesture.tolerance = 'NULL';
		    	gesture.regionWidth = 'NULL';
		    	gesture.sensitivity = 'NULL';
		    	gesture.skew = 'NULL';
		    	gesture.deviation = 'NULL';
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
		    "VTID":"VT187-0120",
            "RegLevel":"R1",
		    "Description":"Hold gesture - Preset value to Center",
		    "PreCondition":[],
		    "Steps":["The Preset value to Center for a Hold Gesture.", "Make all the Hold Gesture Parameters Null.","Explicitly Set the Diagonstic value to true", "Press and hold the stylus on the screen."],
		    "ExpectedOutcome":["Hold  Gesture should be created at center of device screen.", "Hold  Gesture should be detected and ID should be displayed as Hold-Center"],
		    "testToPerform":function(){
				myPage = document.getElementById('mainBlock').innerHTML;
		    	document.getElementById('mainBlock').innerHTML = "<div id='actualResult'>No Gesture found Yet.</div><br><input type='button' value='back' onclick='backToTest()' />";
		    	gesture.id = 'NULL';
		    	gesture.type = 'Hold';
		    	gesture.centerX = 'NULL';
		    	gesture.centerY = 'NULL';
		    	gesture.radius = 'NULL';
		    	gesture.delay = 'NULL';
		    	gesture.interval = 'NULL';
		    	gesture.preset = 'center';
		    	gesture.diagnostics = 'TRUE';
		    	gesture.create();
		    	gesture.detected = "url('Javascript:onGesture('%s','%s');')";

		    },
		    "FinalResult":""
		},

		{
		    "VTID":"VT187-0125",
            "RegLevel":"R1",
		    "Description":"Hold gesture - center values(100,150).",
		    "PreCondition":[],
		    "Steps":["The value of Center-x and Center-Y are Set to (100,150) for Hold Gesture.", "Explicitly Set the Diagonstic value to true", "Press and hold the stylus inside the Gesture circle."],
		    "ExpectedOutcome":["Hold gesture should be created at the specified center coordinates", "Hold gesture should be detected."],
		    "testToPerform":function(){
				myPage = document.getElementById('mainBlock').innerHTML;
		    	document.getElementById('mainBlock').innerHTML = "<div id='actualResult'>No Gesture found Yet.</div><br><input type='button' value='back' onclick='backToTest()' />";
		    	gesture.id = 'My Hold Gesture';
		    	gesture.type = 'Hold';
		    	gesture.centerX = '100';
		    	gesture.centerY = '150';
		    	gesture.radius = '60';
		    	gesture.delay = '2000';
		    	gesture.interval = '3000';
		    	gesture.preset = 'center';
		    	gesture.diagnostics = 'TRUE';
		    	gesture.create();
		    	gesture.detected = "url('Javascript:onGesture('%s','%s');')";

		    },
		    "FinalResult":""
		},

		{
		    "VTID":"VT187-0133",
            "RegLevel":"R1",
		    "Description":"Hold gesture - radius value of 60.",
		    "PreCondition":[],
		    "Steps":["The value of radius is Set to 60 for Hold Gesture.", "Explicitly Set the Diagonstic value to true", "Press and hold the stylus inside the Gesture circle."],
		    "ExpectedOutcome":["Radius should be set to 60.", "Hold gesture should be detected."],
		    "testToPerform":function(){
				myPage = document.getElementById('mainBlock').innerHTML;
		    	document.getElementById('mainBlock').innerHTML = "<div id='actualResult'>No Gesture found Yet.</div><br><input type='button' value='back' onclick='backToTest()' />";
		    	gesture.id = 'My Hold Gesture';
		    	gesture.type = 'Hold';
		    	gesture.centerX = '100';
		    	gesture.centerY = '150';
		    	gesture.radius = '60';
		    	gesture.delay = '2000';
		    	gesture.interval = '3000';
		    	gesture.preset = 'center';
		    	gesture.diagnostics = 'TRUE';
		    	gesture.create();
		    	gesture.detected = "url('Javascript:onGesture('%s','%s');')";

		    },
		    "FinalResult":""
		},

		{
		    "VTID":"VT187-0139",
            "RegLevel":"R1",
		    "Description":"Hold gesture - Delay to 2000ms",
		    "PreCondition":[],
		    "Steps":["The value of delay is set to 2000ms for Hold Gesture.", "Explicitly Set the Diagonstic value to true", "Press and hold the stylus inside the Gesture circle."],
		    "ExpectedOutcome":["Radius should be set to 60.", "Hold gesture should be detected."],
		    "testToPerform":function(){
				myPage = document.getElementById('mainBlock').innerHTML;
		    	document.getElementById('mainBlock').innerHTML = "<div id='actualResult'>No Gesture found Yet.</div><br><input type='button' value='back' onclick='backToTest()' />";
		    	gesture.id = 'My Hold Gesture';
		    	gesture.type = 'Hold';
		    	gesture.centerX = '100';
		    	gesture.centerY = '150';
		    	gesture.radius = '60';
		    	gesture.delay = '2000';
		    	gesture.interval = '3000';
		    	gesture.preset = 'center';
		    	gesture.diagnostics = 'TRUE';
		    	gesture.create();
		    	gesture.detected = "url('Javascript:onGesture('%s','%s');')";

		    },
		    "FinalResult":""
		},

		{
		    "VTID":"VT187-0146",
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
		    	gesture.delay = '1000';
		    	gesture.interval = '3000';
		    	gesture.preset = 'center';
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
		    "VTID":"VT187-0159",
            "RegLevel":"R1",
		    "Description":"Linear gesture - start-x :10,start-y:200,end-x:150,end-y:200",
		    "PreCondition":[],
		    "Steps":["Explicitly the Diagonstic value is Set to true", "Draw a line on the screen approximately similar to the gesture line."],
		    "ExpectedOutcome":["Linear gesture should be created with specified start and end point.", "Linear Gesture should be detected."],
		    "testToPerform":function(){
				myPage = document.getElementById('mainBlock').innerHTML;
		    	document.getElementById('mainBlock').innerHTML = "<div id='actualResult'>No Gesture found Yet.</div><br><input type='button' value='back' onclick='backToTest()' />";
		    	gesture.id = "My Linear Gesture";
		    	gesture.type = "linear";
		    	gesture.startX = '10';
		    	gesture.startY = '200';
		    	gesture.endX = '150';
		    	gesture.endY = '200';
		    	gesture.preset = 'left-right';
		    	gesture.tolerance = '20';
		    	gesture.regionWidth = '200';
		    	gesture.sensitivity = '80';
		    	gesture.skew = '15';
		    	gesture.deviation = '20';
		    	gesture.diagnostics = 'TRUE';
		    	gesture.create();
		    	gesture.detected = "url('Javascript:onGesture('%s','%s');')";

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
		},

		{
		    "VTID":"VT187-0164",
            "RegLevel":"R1",
		    "Description":"Delete Linear Gesture",
		    "PreCondition":[],
		    "Steps":["Create a Linear Gesture with digonstic true", "Draw a line on the screen approximately similar to the gesture line.", "Delete the gesture","Now try to draw the gesture line again"],

		    "ExpectedOutcome":["Gesture should be shown first time and should be detected.","Gesture area should be deleted when delete method is called.And gesture should not be detected."],
		    "testToPerform":function(){
				myPage = document.getElementById('mainBlock').innerHTML;
		    	document.getElementById('mainBlock').innerHTML = "<div id='actualResult'>No Gesture found Yet.</div><br><input type='button' value='back' onclick='backToTest()' />";
		    	gesture.id = "My Linear Gesture";
		    	gesture.type = "linear";
		    	gesture.startX = '10';
		    	gesture.startY = '200';
		    	gesture.endX = '150';
		    	gesture.endY = '200';
		    	gesture.preset = 'left-right';
		    	gesture.tolerance = '50';
		    	gesture.regionWidth = '20';
		    	gesture.sensitivity = '80';
		    	gesture.skew = '15';
		    	gesture.deviation = '10';
		    	gesture.diagnostics = 'TRUE';
		    	gesture.create();
		     	gesture.detected = "url('Javascript:onGesture('%s','%s');')";
		     	//gesture.delete();

		    },
		    "FinalResult":""
		},

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
