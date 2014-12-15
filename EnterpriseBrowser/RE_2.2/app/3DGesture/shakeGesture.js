var EventCounter = 1;
var myPage = "";

function onGestureJSON(jsonobject) {
		
	document.getElementById("actualResult").innerHTML += "Gesture with json event detected for "+EventCounter+"th time.<br>Gesture ID: " + jsonobject.id + ", Count: " + jsonobject.count;
	EventCounter++;

		if(id=="Scan") {
			generic.InvokeMETAFunction("Scanner","enabled;start");
		}
		
		if(id=="Signal") {
			generic.InvokeMETAFunction("Signal","visibility:visible");
		}

	if(id=="Battery")
	{
		generic.InvokeMETAFunction("battery","visibility:visible");
		}
	}

function onGesture(id,count) {
	document.getElementById("actualResult").innerHTML += "Gesture detected for "+EventCounter+"th time.<br>Gesture ID: " + id + ", Count: " + count;
    EventCounter++;
	if(id=="Scan") {
		generic.InvokeMETAFunction("Scanner","enabled;start");
	}

	if(id=="Signal") {
		generic.InvokeMETAFunction("Signal","visibility:visible");
	}

	if(id=="Battery") {
		generic.InvokeMETAFunction("battery","visibility:visible");
	}
}

function DeleteGesture() { 
	gesture.delete();
	document.getElementById("actualResult").innerHTML = "Gesture deleted"
} 

function performGesture(Gtype, GID, Preset_value, Diagonstics_value, VThreshold_value, VQuiet_value, NumberOfGestures_value, callback_type_value) {

	var Gesturetype = Gtype;
	var GestureID = GID;
	var Preset = Preset_value;
	var Diagonstics = Diagonstics_value;
	var VThreshold = VThreshold_value;
	var VQuiet = VQuiet_value;
	var SelectedItem = callback_type_value;
	var NumberOfGestures= NumberOfGestures_value;
	var httpPath = 'http://'+SERVER_HOST+'/NEON/Navigate.html?ID=%s&COUNT=%s';
	
	if(Gesturetype!="NULL") {
		if(SelectedItem=="HTML") {
			gesture.setEMML("detected:url(httpPath)");
		}
		else if(SelectedItem=="JSON") { 
			gesture.detected='onGestureJSON(%json);';
		}
		else if(SelectedItem=="DETACHEVENT") {
			gesture.detected='';
		}
		else {
				gesture.detected="onGesture('%s','%s');";
			}

		//generic.InvokeMETAFunction("gesture","type:" + Gesturetype);
		gesture.type=Gesturetype;
		
        if(GestureID!="NULL") {
           //generic.InvokeMETAFunction("gesture","id:"+GestureID);
            gesture.id=GestureID;
        }
        
        if(Preset!="NULL") {
           //generic.InvokeMETAFunction("gesture","preset:"+Preset);
            gesture.preset=Preset;
        }
        if(Diagonstics!="NULL") {
          // generic.InvokeMETAFunction("gesture","diagnostics:"+Diagonstics);
                gesture.diagnostics=Diagonstics;
        }
        if(VThreshold!="NULL") {
           //generic.InvokeMETAFunction("gesture","center-X:"+Centerx);
           gesture.Threshold=VThreshold;
        }
        if(VQuiet!="NULL") {
           //generic.InvokeMETAFunction("gesture","center-Y:"+Centery);
           gesture.Quiet=VQuiet;
        }

	    //generic.InvokeMETAFunction("gesture", "create");
	  	for(var i = 0; i<NumberOfGestures; i++) {

			gesture.create();
			document.getElementById("actualResult").innerHTML = i;
		}
		//generic.InvokeMETAFunction("gesture", "");
	}
        
}

(function(){
	var pbTest = function(){
		var pbTestObj = {};
		pbTestObj.testCases = [
		{
			"VTID":"VT187 - 2523",
			"RegLevel":"R1",
			"Description":"Shake Gesture Preset=Normal",
			"PreCondition":[],
			"Steps":["1.Set the Gesture type to shake", "2.Do not set any parameter value for shake gesture and create the gesture", "3.Set the preset to Normal", "4.Attach the detect event", "5.Shake the device"],
			"ExpectedOutcome":["Gesture event should get fired.Gesture ID should be Shake-Normal"],
			"testToPerform":function(){
				myPage = document.getElementById('mainBlock').innerHTML;
				var Gesturetype = 'Shake';
				var GestureID = 'id1';
				var Preset = 'normal';
				var Diagonstics = "NULL";
				var VThreshold = "NULL";
				var VQuiet = "NULL";
				var NumberOfGestures= 1;
				var callback_type = "JavaScript";
		    	performGesture(Gesturetype, GestureID, Preset, Diagonstics, VThreshold, VQuiet, NumberOfGestures, callback_type);
			},
			"FinalResult":""
		},
		{
			"VTID":"VT187 - 2527",
			"RegLevel":"R1",
			"Description":"Shake Gesture Threshold=100",
			"PreCondition":[],
			"Steps":[" 1.Set the Gesture type to shake", "2.Set Threshold = 100", "3.Attach the detect event", "4.Shake the device very slowly", "5.Gradually increase the shaking speed"],
			"ExpectedOutcome":["Gesture event should get fired when vigorously  shaken.Threshold shold be set to 100.Threshold-How vigorously the device must be shaken. The smaller the value the more vigorous"],
			"testToPerform":function(){
				myPage = document.getElementById('mainBlock').innerHTML;
				var Gesturetype = 'Shake';
				var GestureID = 'id1';
				var Preset = "NULL";
				var Diagonstics = "NULL";
				var VThreshold = 100;
				var VQuiet = "NULL";
				var NumberOfGestures= 1;
				var callback_type = "JavaScript"
		    	performGesture(Gesturetype, GestureID, Preset, Diagonstics, VThreshold, VQuiet, NumberOfGestures, callback_type);
			},
			"FinalResult":""
		},
		{
			"VTID":"VT187 - 2536",
			"RegLevel":"R1",
			"Description":"Shake Gesture Default Quiet Shaking time difference<Quiet",
			"PreCondition":[],
			"Steps":[ "1.Set the Gesture type to shake", "2.Set Threshold = 400", "3.Attach the detect event", "4.Shake the device" , "5.Again shake the device within 1 seconds"],
			"ExpectedOutcome":["Gesture event should get fired once.Second time gesture event should not get fired as shaking time difference is less than quiet value. Quiet shold be set to 1000."],
			"testToPerform":function(){
				myPage = document.getElementById('mainBlock').innerHTML;
				var Gesturetype = 'Shake';
				var GestureID = 'id1';
				var Preset = "NULL";
				var Diagonstics = "NULL";
				var VThreshold = 400;
				var VQuiet = 1000;
				var NumberOfGestures= 1;
				var callback_type = "JavaScript"
		    	performGesture(Gesturetype, GestureID, Preset, Diagonstics, VThreshold, VQuiet, NumberOfGestures, callback_type);
			},
			"FinalResult":""
		},
		{
			"VTID":"VT187 - 2537",
			"RegLevel":"R1",
			"Description":"Shake Gesture Quiet=3000 Shaking time difference>Quiet",
			"PreCondition":[],
			"Steps":["1.Set the Gesture type to shake", "2.Set Threshold = 400", "3.Set quiet = 3000", "4.Attach the detect event", "5.Shake the device ", "6.Shake the device again after 3 seconds"],
			"ExpectedOutcome":[" Gesture event should get fired twice. Quiet shold be set to 3000."],
			"testToPerform":function(){
				myPage = document.getElementById('mainBlock').innerHTML;
				var Gesturetype = 'Shake';
				var GestureID = 'id1';
				var Preset = "NULL";
				var Diagonstics = "NULL";
				var VThreshold = 400;
				var VQuiet = 3000;
				var NumberOfGestures= 1;
				var callback_type = "JavaScript"
		    	performGesture(Gesturetype, GestureID, Preset, Diagonstics, VThreshold, VQuiet, NumberOfGestures, callback_type);
			},
			"FinalResult":""
		},
		{
			"VTID":"VT187 - 2545",
			"RegLevel":"R1",
			"Description":"Test Gestures with JSON objects",
			"PreCondition":[],
			"Steps":["Test Gesture with JSON objects."],
			"ExpectedOutcome":[" Each property should be accessible through JSON objects."],
			"testToPerform":function(){
				myPage = document.getElementById('mainBlock').innerHTML;
				var Gesturetype = 'Shake';
				var GestureID = 'id1';
				var Preset = "normal";
				var Diagonstics = "NULL";
				var VThreshold = 400;
				var VQuiet = 1000;
				var NumberOfGestures= 1;
				var callback_type = "JSON"
		    	performGesture(Gesturetype, GestureID, Preset, Diagonstics, VThreshold, VQuiet, NumberOfGestures, callback_type);
			},
			"FinalResult":""
		},
		{
			"VTID":"VT187 - 2546",
			"RegLevel":"R1",
			"Description":"Gesture event as HTTP URL",
			"PreCondition":[],
			"Steps":["Test gestures eventURL as HTTP location."],
			"ExpectedOutcome":["RhoElements should navigate to the specified HTTP location on gesture detection."],
			"testToPerform":function(){
				myPage = document.getElementById('mainBlock').innerHTML;
				var Gesturetype = 'Shake';
				var GestureID = 'id1';
				var Preset = "normal";
				var Diagonstics = "NULL";
				var VThreshold = 400;
				var VQuiet = 1000;
				var NumberOfGestures= 1;
				var callback_type = "HTML"
		    	performGesture(Gesturetype, GestureID, Preset, Diagonstics, VThreshold, VQuiet, NumberOfGestures, callback_type);
			},
			"FinalResult":""
		}, {
			"VTID":"VT187 - 2550",
			"RegLevel":"R1",
			"Description":"Delete Shake  Gesture",
			"PreCondition":["After 10 sec try to detect Gesture"],
			"Steps":["1. Create a Shake  Gesture with digonstic true", "2. Perform Shake gesture", "3. Delete the gesture", "4.Again Perform Shake gesture"],
			"ExpectedOutcome":["Gesture should be detected first time. Gesture should not be detected after deleting the gesture."],
			"testToPerform":function(){
				myPage = document.getElementById('mainBlock').innerHTML;
				var Gesturetype = 'Shake';
				var GestureID = 'id1';
				var Preset = 'normal';
				var Diagonstics = true;
				var VThreshold = "NULL";
				var VQuiet = "NULL";
				var NumberOfGestures= 1;
				var callback_type = "JavaScript"
		    	performGesture(Gesturetype, GestureID, Preset, Diagonstics, VThreshold, VQuiet, NumberOfGestures, callback_type);
		    	setTimeout("DeleteGesture()",10000);
			},
			"FinalResult":""
		}
		];
		pbTestObj.afterEach = function(){
			myPage = "";
			EventCounter = 1;
			DeleteGesture();
		};
		return pbTestObj;
	}
	window.pbTest = pbTest();
})();