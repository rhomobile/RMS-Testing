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
			"VTID":"VT366 - 2536",
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