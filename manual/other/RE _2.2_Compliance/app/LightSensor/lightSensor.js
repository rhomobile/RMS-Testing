
//	<script type="text/javascript" src="http://10.233.85.82/src/elements.js"></script>
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
				"VTID":"VT366-0275",
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