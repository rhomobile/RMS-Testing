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
	    gesture.create();
	  	for(var i = 0; i<NumberOfGestures; i++) {
    		document.getElementById("actualResult").innerHTML += i;
    		//DeleteGesture();
	   	}


		//generic.InvokeMETAFunction("gesture", "");
	}
        
}

(function(){
	var pbTest = function(){
		var pbTestObj = {};
		pbTestObj.testCases = [
		
		{
			"VTID":"VT366 - 0113",
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