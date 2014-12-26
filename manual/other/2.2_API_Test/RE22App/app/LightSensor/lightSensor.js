
//	<script type="text/javascript" src="/public/re1/elements.js"></script>
//	<script type="text/javascript">
function callBackFunc(param) {
	       var sig = document.getElementById("actualResult"); 
	       sig.innerHTML = "Param: "+ param;
}
function getsettingsjsFunction(a)
	{
		alert("Event JSfired");
		var theOutput = "<BR><BR><B>LightSensorValue  </B>";     
		var sig = document.getElementById("actualResult");    
        theOutput = theOutput + "LightSensorValue: " + a + "<BR>";
		sig.innerHTML = "JSObject"+theOutput;
	}
	function getsettingsjsonFunction(jsonObject)
	{
		alert("Event Josnfired");
		var theOutput = "<BR><BR><B>LightSensorValue  </B>";   
		var sig = document.getElementById("actualResult");      
        theOutput = theOutput + "LightSensorValue: " + jsonObject.LightSensorValue + "<BR>";
        sig.innerHTML = "JSON"+theOutput;
}
(function(){
	var pbTest = function(){
		var pbTestObj = {};
		pbTestObj.testCases = [
		{
				"VTID":"VT187-2848",
				"RegLevel":"R1",
				"Description":"minimumInterval with default",
				"PreCondition":[],
				"Steps":["Attach LightSensorEvent","Set status is enabled","Call GetSensorData Method","check for the light event to fire"],
				"ExpectedOutcome":["LightSensorEvent will fire once any change will happen to the light sensor value."],
				"testToPerform":function(){

					lightsensor.LightSensorEvent="getsettingsjsFunction('%s');";
					lightsensor.status = 'Enabled';
					lightsensor.getSensorData(); 

				},
				"FinalResult":""
			},{
				"VTID":"VT187-2855",
				"RegLevel":"R1",
				"Description":"status Enabled",
				"PreCondition":[],
				"Steps":["Attach LightSensorEvent","Set status is enabled","set minimumInterval to 5000","Call GetSensorData Method","check for the light event to fire"],
				"ExpectedOutcome":["LightSensorEvent will fire with 5 second interval if any changes to the light sensor value will happen"],
				"testToPerform":function(){

					lightsensor.LightSensorEvent="getsettingsjsFunction('%s');";
					lightsensor.status = 'Enabled';
					lightsensor.minimumInterval = '5000';
					lightsensor.getSensorData(); 

				},
				"FinalResult":""
		
		
			},{
				"VTID":"VT187-2860",
				"RegLevel":"R1",
				"Description":"getSensorData",
				"PreCondition":[],
				"Steps":["Attach LightSensorEvent","Set status is enabled","set minimumInterval to 20000","Call GetSensorData Method","check for the light event to fire"],
				"ExpectedOutcome":["LightSensorEvent should fire immediately after calling getSensorData"],
				"testToPerform":function(){

					lightsensor.LightSensorEvent="getsettingsjsFunction('%s');";
					lightsensor.status = 'Enabled';
					lightsensor.minimumInterval = '20000';
					lightsensor.getSensorData(); 
					
				},
				"FinalResult":""	
			},{
				"VTID":"VT187-2862",
				"RegLevel":"R1",
				"Description":"LightSensorEvent with JSON",
				"PreCondition":[],
				"Steps":["Attach LightSensorEvent with JSON Implemenation","Set status to Enabled","set minimumInterval to 10000","call getSensorData"],
				"ExpectedOutcome":["LightSensorEvent should fire immediately after calling getSensorData and LightSensorValue should retun by event"],
				"testToPerform":function(){

					lightsensor.LightSensorEvent="getsettingsjsonFunction(%json);";
					lightsensor.status = 'Enabled';
					lightsensor.minimumInterval = '10000';
					lightsensor.getSensorData(); 
					
				},
				"FinalResult":""	
				
			}];
		pbTestObj.afterEach = function(){
			
		}
		return pbTestObj;
	}
	window.pbTest = pbTest();
})();
//
//	<script type="text/javascript">
//		var count = 0;
//		function doAlarm(){
//			var resultDiv = document.getElementById("actualResult");
//			count++;
//        	resultDiv.innerHTML = 'Alarm Triggered';
 //       	resultDiv.innerHTML += "\nCount = "+count;
//		}
//	</script>
//<!--<script type="text/javascript" src="js/myMain.js"></script>-->
//	<script type="text/javascript">
//		main.init();
//	</script>