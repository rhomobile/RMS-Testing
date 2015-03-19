
//	<script type="text/javascript" src="http://10.233.85.82/src/elements.js"></script>
//	<script type="text/javascript">
function callBackFunc(param) {
	       var sig = document.getElementById("actualResult"); 
	       sig.innerHTML = "Param: "+ param;
}
function getsettingsjsFunction(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,a1,b1,c1,d1,e1,f1,g1)
	{
		var theOutput = "<BR><BR><B>Accelerometer  </B>";   
		var sig = document.getElementById("actualResult");     
        theOutput = theOutput + "X: " + a + ", Y: " + b + ", Z: " + c + "<BR>";
		theOutput = theOutput + "<B>DeviceOrientation  </B>";  
		theOutput = theOutput + "X: " + d  + "<BR>";
        theOutput = theOutput + "<B>Tilt  </B>";
        theOutput = theOutput + "X: " + e  + ", Y: " + f  + ", Z: " + g  + "<BR>";
        theOutput = theOutput + "<B>Motion  </B>";
        theOutput = theOutput + "X: " + h  + "<BR>";
        theOutput = theOutput + "<B>Ecompass  </B>";
        theOutput = theOutput + "X: " + i  + "<BR>";
        theOutput = theOutput + "<B>Magnetometer  </B>";
        theOutput = theOutput + "X: " + j  + ", Y: " + k  + ", Z: " + l  + "<BR>";
        theOutput = theOutput + "<B>Gyroscope  </B>";
        theOutput = theOutput + "X: " + m  + ", Y: " + n + ", Z: " + o  + "<BR>";
        theOutput = theOutput + "<B>AmbientLight  </B>";
        theOutput = theOutput + "X: " + p  + "<BR>";
        theOutput = theOutput + "<B>Proximity  </B>";
        theOutput = theOutput + "X: " + q  + "<BR>";
        theOutput = theOutput + "<B>Proximitylongrange  </B>";
        theOutput = theOutput + "X: " + r  + "<BR>";
        theOutput = theOutput + "<B>Pressure  </B>";
        theOutput = theOutput + "X: " + s  + "<BR>";
        theOutput = theOutput + "<B>Temperature  </B>";
        theOutput = theOutput + "X: " + t  + "<BR>";
        theOutput = theOutput + "<B>Humidity  </B>";
        theOutput = theOutput + "X: " + u  + "<BR>";
        theOutput = theOutput + "<B>Gravity  </B>";
        theOutput = theOutput + "X: " + v  + ", Y: " + w  + ", Z: " + x  + "<BR>";
        theOutput = theOutput + "<B>Linear Acceleration  </B>";
        theOutput = theOutput + "X: " + y  + ", Y: " + z + ", Z: " + a1  + "<BR>";
        theOutput = theOutput + "<B>Rotation  </B>";
        theOutput = theOutput + "X: " + b1  + ", Y: " + c1  + ", Z: " + d1  + "<BR>";
        theOutput = theOutput + "<B>Orientation  </B>";
        theOutput = theOutput + "X: " + e1 + ", Y: " + f1  + ", Z: " + g1 + "<BR>";
		sig.innerHTML = "JSObject"+theOutput;
	}
	function getsettingsjsonFunction(jsonObject)
	{
		var theOutput = "<BR><BR><B>Accelerometer  </B>";      
		var sig = document.getElementById("actualResult");  
        theOutput = theOutput + "X: " + jsonObject.accelerometerX + ", Y: " + jsonObject.accelerometerY + ", Z: " + jsonObject.accelerometerZ + "<BR>";
        theOutput = theOutput + "<B>DeviceOrientation  </B>";        
        theOutput = theOutput + "X: " + jsonObject.deviceOrientation  + "<BR>";
        theOutput = theOutput + "<B>Tilt  </B>";
        theOutput = theOutput + "X: " + jsonObject.tiltangleX  + ", Y: " + jsonObject.tiltangleY  + ", Z: " + jsonObject.tiltangleZ  + "<BR>";
        theOutput = theOutput + "<B>Motion  </B>";
        theOutput = theOutput + "X: " + jsonObject.motion  + "<BR>";
        theOutput = theOutput + "<B>Ecompass  </B>";
        theOutput = theOutput + "X: " + jsonObject.ecompass  + "<BR>";
        theOutput = theOutput + "<B>Magnetometer  </B>";
        theOutput = theOutput + "X: " + jsonObject.magnetometerX  + ", Y: " + jsonObject.magnetometerY  + ", Z: " + jsonObject.magnetometerZ  + "<BR>";
        theOutput = theOutput + "<B>Gyroscope  </B>";
        theOutput = theOutput + "X: " + jsonObject.gyroscopeX  + ", Y: " + jsonObject.gyroscopeY  + ", Z: " + jsonObject.gyroscopeZ  + "<BR>";
        theOutput = theOutput + "<B>AmbientLight  </B>";
        theOutput = theOutput + "X: " + jsonObject.ambientLight  + "<BR>";
        theOutput = theOutput + "<B>Proximity  </B>";
        theOutput = theOutput + "X: " + jsonObject.proximity  + "<BR>";
        theOutput = theOutput + "<B>Proximitylongrange  </B>";
        theOutput = theOutput + "X: " + jsonObject.proximitylongrange  + "<BR>";
        theOutput = theOutput + "<B>Pressure  </B>";
        theOutput = theOutput + "X: " + jsonObject.pressure  + "<BR>";
        theOutput = theOutput + "<B>Temperature  </B>";
        theOutput = theOutput + "X: " + jsonObject.temperature  + "<BR>";
        theOutput = theOutput + "<B>Humidity  </B>";
        theOutput = theOutput + "X: " + jsonObject.humidity  + "<BR>";
        theOutput = theOutput + "<B>Gravity  </B>";
        theOutput = theOutput + "X: " + jsonObject.gravityX  + ", Y: " + jsonObject.gravityY  + ", Z: " + jsonObject.gravityZ  + "<BR>";
        theOutput = theOutput + "<B>Linear Acceleration  </B>";
        theOutput = theOutput + "X: " + jsonObject.linearAccelerationX  + ", Y: " + jsonObject.linearAccelerationY  + ", Z: " + jsonObject.linearAccelerationZ  + "<BR>";
        theOutput = theOutput + "<B>Rotation  </B>";
        theOutput = theOutput + "X: " + jsonObject.rotationX  + ", Y: " + jsonObject.rotationY  + ", Z: " + jsonObject.rotationZ  + "<BR>";
        theOutput = theOutput + "<B>Orientation  </B>";
        theOutput = theOutput + "X: " + jsonObject.orientationX  + ", Y: " + jsonObject.orientationY  + ", Z: " + jsonObject.orientationZ  + "<BR>";
        sig.innerHTML = "JSON"+theOutput;
}
(function(){
	var pbTest = function(){
		var pbTestObj = {};
		pbTestObj.testCases = [
		{
				"VTID":"VT366-0281",
				"RegLevel":"R1",
				"Description":"Enable all",
				"PreCondition":[],
				"Steps":["Attach sensorEvent event.","Set all value to enable","Set minimumInterval value to 2 sec","Call getSensorData() method."],
				"ExpectedOutcome":["All the values for different parameters should be returned.","The values will be updated after every 2 seconds."],
				"testToPerform":function(){

					RawSensors.sensorEvent="getsettingsjsFunction('%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s');";
					RawSensors.all = 'enabled'; 
					RawSensors.minimumInterval = '2000'  
					RawSensors.getSensorData(); 
					
				},
				"FinalResult":""
			},{
				"VTID":"VT366-0282",
				"RegLevel":"R1",
				"Description":"RawSensor event as HTTP URL",
				"PreCondition":[],
				"Steps":["Attach a Sensor event and specify a http url to navigate when the event fire","Set all value to enable","Set minimumInterval value to 2 sec","Call getSensorData() method"],
				"ExpectedOutcome":["The mentioned HTTP location should be opened after event get triggered"],
				"testToPerform":function(){

					RawSensors.sensorEvent="url('http://10.233.85.82/Neon/Navigate.html')";
					RawSensors.all = 'enabled'; 
					RawSensors.minimumInterval = '2000'  
					RawSensors.getSensorData();  
				},
				"FinalResult":""
			}];
		pbTestObj.afterEach = function(){
			RawSensors.sensorEvent="";
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