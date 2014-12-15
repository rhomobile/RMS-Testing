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
} 

function performGesture(GType_value, GestureID_value, Preset_value, Diagonstics_value, TargetX_value, TargetY_value, TargetZ_value, TiltTolerance_value, Hysteresis_value, group1_value, Number_value) {

	var Gesturetype = GType_value;
	var GestureID = GestureID_value;
	var Preset = Preset_value;
	var Diagonstics = Diagonstics_value;
	var VTargetX = TargetX_value;
	var VTargetY = TargetY_value;
	var VTargetZ = TargetZ_value;
	var VTiltTolerance = TiltTolerance_value;
	var VHysteresis = Hysteresis_value;
	var SelectedItem = group1_value;
	var NumberOfGestures = Number_value;
	var httpPath = 'http://'+SERVER_HOST+'/NEON/Navigate.html?ID=%s&COUNT=%s'
	
	if(Gesturetype!="NULL") {
	    if(SelectedItem=="HTML") {
	    	gesture.setEMML("detected:url()");
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
        if(VTargetX!="NULL") {
           //generic.InvokeMETAFunction("gesture","center-X:"+Centerx);
           gesture.TargetX=VTargetX;
		   //alert(VTargetX);
        }
        if(VTargetY!="NULL") {
           //generic.InvokeMETAFunction("gesture","center-Y:"+Centery);
           gesture.TargetY=VTargetY;
        }
        if(VTargetZ!="NULL") {
           //generic.InvokeMETAFunction("gesture","radius:"+Radius);
            gesture.TargetZ=VTargetZ;
        }
        if(VTiltTolerance!="NULL") {
           //generic.InvokeMETAFunction("gesture","delay:"+Delay);
           gesture.TiltTolerance=VTiltTolerance;
        }
        
        if(VHysteresis!="NULL") {
          // generic.InvokeMETAFunction("gesture","interval:"+Interval);
            gesture.Hysteresis=VHysteresis;
        }


	        //generic.InvokeMETAFunction("gesture", "create");
	  	for(var i = 0; i<NumberOfGestures; i++) {
    		gesture.create();
    		document.getElementById("actualResult").innerHTML += i;
	   	}


		//generic.InvokeMETAFunction("gesture", "");
	}
        
}

(function(){
	var pbTest = function(){
		var pbTestObj = {};
		pbTestObj.testCases = [
		{
			"VTID":"VT187 - 2480",
			"RegLevel":"R1",
			"Description":"Tilt Gesture Default Preset",
			"PreCondition":[],
			"Steps":["1.Set the Gesture type to tilt", "2.Do not set any parameter value for tilt gesture and create the gesture", "3.Attach the detect event", "4.Put the device in faceup position"],
			"ExpectedOutcome":["Gesture event should get fired.Gesture ID should be Tilt-faceup"],
			"testToPerform":function(){
				myPage = document.getElementById('mainBlock').innerHTML;
				var Gesturetype = "tilt";
				var GestureID = "id1";
				var Preset = "NULL";
				var Diagonstics = "NULL";
				var VTargetX = "NULL";
				var VTargetY = "NULL";
				var VTargetZ = "NULL";
				var VTiltTolerance = "NULL";
				var VHysteresis = "NULL";
				var SelectedItem = "JavaScript";
				var NumberOfGestures = 1;
		    	performGesture(Gesturetype, GestureID, Preset, Diagonstics, VTargetX, VTargetY, VTargetZ, VTiltTolerance, VHysteresis, SelectedItem, NumberOfGestures);
			},
			"FinalResult":""
		},
		{
			"VTID":"VT187 - 2481",
			"RegLevel":"R1",
			"Description":"Tilt Gesture Preset=upright",
			"PreCondition":[],
			"Steps":["1.Set the Gesture type to tilt", "2.Do not set any other parameter value for tilt gesture", "3.Set the preset to upright and create the gesture ", "4.Attach the detect event", "4.Put the device in upright position"],
			"ExpectedOutcome":["Gesture event should get fired.Gesture ID should be Tilt-upright"],
			"testToPerform":function(){
				myPage = document.getElementById('mainBlock').innerHTML;
				var Gesturetype = "tilt";
				var GestureID = "id1";
				var Preset = "upright";
				var Diagonstics = "NULL";
				var VTargetX = "NULL";
				var VTargetY = "NULL";
				var VTargetZ = "NULL";
				var VTiltTolerance = "NULL";
				var VHysteresis = "NULL";
				var SelectedItem = "JavaScript";
				var NumberOfGestures = 1;
		    	performGesture(Gesturetype, GestureID, Preset, Diagonstics, VTargetX, VTargetY, VTargetZ, VTiltTolerance, VHysteresis, SelectedItem, NumberOfGestures);
			},
			"FinalResult":""
		},
		{
			"VTID":"VT187 - 2488",
			"RegLevel":"R1",
			"Description":"Tilt Gesture Target-X =0 Target-Y =0 Target-Z = 90",
			"PreCondition":[],
			"Steps":["1.Set the Gesture type to tilt and ID to Mytiltgesture", "2.Set Target-X =0, Target-Y =0, Target-Z = 90", "3.Attach the detect event", "4.Move the device in faceup position" ],
			"ExpectedOutcome":["Gesture event should get fired when device is moved in faceup position.Event parameters value should be returned inside event", "Notes  :  Event will return ID and Count."],
			"testToPerform":function(){
				myPage = document.getElementById('mainBlock').innerHTML;
				var Gesturetype = "tilt";
				var GestureID = "Mytiltgesture";
				var Preset = "faceup";
				var Diagonstics = "NULL";
				var VTargetX = 0;
				var VTargetY = 0;
				var VTargetZ = 90;
				var VTiltTolerance = "NULL";
				var VHysteresis = "NULL";
				var SelectedItem = "JavaScript";
				var NumberOfGestures = 1;
		    	performGesture(Gesturetype, GestureID, Preset, Diagonstics, VTargetX, VTargetY, VTargetZ, VTiltTolerance, VHysteresis, SelectedItem, NumberOfGestures);
			},
			"FinalResult":""
		},
		{
			"VTID":"VT187 - 2490",
			"RegLevel":"R1",
			"Description":"Tilt Gesture Target-X =0 Target-Y =90 Target-Z = 0",
			"PreCondition":[],
			"Steps":["1.Set the Gesture type to tilt and ID to Mytiltgesture", "2.Set", "Target-X =0", "Target-Y =90", "Target-Z =0", "3.Attach the detect event", "4.Move the device in upright  position"],
			"ExpectedOutcome":["Gesture event should get fired when device is moved in upright position.Event parameters value should be returned inside event", "Notes  :  Event will return ID and Count."],
			"testToPerform":function(){
				myPage = document.getElementById('mainBlock').innerHTML;
				var Gesturetype = "tilt";
				var GestureID = "Mytiltgesture";
				var Preset = "upright";
				var Diagonstics = "NULL";
				var VTargetX = 0;
				var VTargetY = 90;
				var VTargetZ = 0;
				var VTiltTolerance = "NULL";
				var VHysteresis = "NULL";
				var SelectedItem = "JavaScript";
				var NumberOfGestures = 1;
		    	performGesture(Gesturetype, GestureID, Preset, Diagonstics, VTargetX, VTargetY, VTargetZ, VTiltTolerance, VHysteresis, SelectedItem, NumberOfGestures);
			},
			"FinalResult":""
		},
		{
			"VTID":"VT187 - 2492",
			"RegLevel":"R1",
			"Description":"Tilt Gesture Target-X =90 Target-Y =0 Target-Z =0",
			"PreCondition":[],
			"Steps":["1.Set the Gesture type to tilt and ID to Mytiltgesture", "2.Set", "Target-X =90", "Target-Y = 0", "Target-Z =0", "3.Attach the detect event", "4.Put the device in turn-left position"],
			"ExpectedOutcome":["Gesture event should get fired when device is moved in turn-left position. Event parameters value should be returned inside event", "Notes  :  Event will return ID and Count."],
			"testToPerform":function(){
				myPage = document.getElementById('mainBlock').innerHTML;
				var Gesturetype = "tilt";
				var GestureID = "Mytiltgesture";
				var Preset = "turn-left";
				var Diagonstics = "NULL";
				var VTargetX = 90;
				var VTargetY = 0;
				var VTargetZ = 0;
				var VTiltTolerance = "NULL";
				var VHysteresis = "NULL";
				var SelectedItem = "JavaScript";
				var NumberOfGestures = 1;
		    	performGesture(Gesturetype, GestureID, Preset, Diagonstics, VTargetX, VTargetY, VTargetZ, VTiltTolerance, VHysteresis, SelectedItem, NumberOfGestures);
			},
			"FinalResult":""
		},
		{
			"VTID":"VT187 - 2501",
			"RegLevel":"R1",
			"Description":"Tilt Gesture Tolerance=30",
			"PreCondition":[],
			"Steps":["1.Set the Gesture type to tilt and ID to Mytiltgesture", "2.Set", "Target-X =0", "Target-Y =0", "Target-Z =90", "3.Set Tolerance = 30", "4.Attach the detect event", "5.Take the device in face up position very slowly."],
			"ExpectedOutcome":["Gesture should be detected when the devices all tilt angles are less than 30 degrees. Value of the tolerance should be 30."],
			"testToPerform":function(){
				myPage = document.getElementById('mainBlock').innerHTML;
				var Gesturetype = "tilt";
				var GestureID = "Mytiltgesture";
				var Preset = "faceup";
				var Diagonstics = "NULL";
				var VTargetX = 0;
				var VTargetY = 0;
				var VTargetZ = 90;
				var VTiltTolerance = 30;
				var VHysteresis = "NULL";
				var SelectedItem = "JavaScript";
				var NumberOfGestures = 1;
		    	performGesture(Gesturetype, GestureID, Preset, Diagonstics, VTargetX, VTargetY, VTargetZ, VTiltTolerance, VHysteresis, SelectedItem, NumberOfGestures);
			},
			"FinalResult":""
		},
		{
			"VTID":"VT187 - 2513",
			"RegLevel":"R1",
			"Description":"Tilt Gesture Hysteresis= 45 Orienetation change>Hysteresis",
			"PreCondition":[],
			"Steps":["  1.Set the Gesture type to tilt and ID to Mytiltgesture", "2.Set", "Target-X =0", "Target-Y =90", "Target-Z =0", "Hysteresis= 45", "3.Attach the detect event", "4.Take the device in upright position very slowly.", "5.Now change the device orientation slowly from protrait up and change the angle more than 45 degrees.", "6.Again come back to portratit up position slowly."],
			"ExpectedOutcome":[" Gesture should be detected both the times Value of the Hysteresis should be set to 45.How far the device must move away from the target orientation before the gesture can be detected again"],
			"testToPerform":function(){
				myPage = document.getElementById('mainBlock').innerHTML;
				var Gesturetype = "tilt";
				var GestureID = "Mytiltgesture";
				var Preset = "upright";
				var Diagonstics = "NULL";
				var VTargetX = 0;
				var VTargetY = 90;
				var VTargetZ = 0;
				var VTiltTolerance = "NULL";
				var VHysteresis = 45;
				var SelectedItem = "JavaScript";
				var NumberOfGestures = 1;
		    	performGesture(Gesturetype, GestureID, Preset, Diagonstics, VTargetX, VTargetY, VTargetZ, VTiltTolerance, VHysteresis, SelectedItem, NumberOfGestures);
			},
			"FinalResult":""
		},
		{
			"VTID":"VT187 - 2549",
			"RegLevel":"R1",
			"Description":"Delete Tilt  Gesture",
			"PreCondition":[],
			"Steps":["1. Create a Tilt  Gesture with digonstic true", "2. Perform Tilt gesture", "3. Delete the gesture", "4.Again Perform Tilt gesture"],
			"ExpectedOutcome":["Gesture should be detected first time.Gesture should not be detected after deleting the gesture.."],
			"testToPerform":function(){
				myPage = document.getElementById('mainBlock').innerHTML;
				var Gesturetype = "tilt";
				var GestureID = "Mytiltgesture";
				var Preset = "NULL";
				var Diagonstics = true;
				var VTargetX = "NULL";
				var VTargetY = "NULL";
				var VTargetZ = "NULL";
				var VTiltTolerance = "NULL";
				var VHysteresis = "NULL";
				var SelectedItem = "JavaScript";
				var NumberOfGestures = 1;
		    	performGesture(Gesturetype, GestureID, Preset, Diagonstics, VTargetX, VTargetY, VTargetZ, VTiltTolerance, VHysteresis, SelectedItem, NumberOfGestures);
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