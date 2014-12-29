
//	<script type="text/javascript" src="/public/re1/elements.js"></script>
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
				"VTID":"VT187-2876",
				"RegLevel":"R1",
				"Description":"Enable accelerometer",
				"PreCondition":[],
				"Steps":["Attach sensorEvent event.","Set accelerometer value to enable.","Set minimumInterval value to 5 sec.","Call getSensorData() method."],
				"ExpectedOutcome":["The accelerometerX, accelerometerY and accelerometerZ values should be returned.","The values will be updated after every 5 seconds."],
				"testToPerform":function(){

					RawSensors.sensorEvent="getsettingsjsFunction('%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s');";
					RawSensors.accelerometer = 'enabled';   
					RawSensors.minimumInterval = '5000'
					RawSensors.getSensorData();

				},
				"FinalResult":""
			},{
				"VTID":"VT187-2877",
				"RegLevel":"R1",
				"Description":"Disable accelerometer",
				"PreCondition":[],
				"Steps":["Attach sensorEvent event.","Set accelerometer value to enable.","Set minimumInterval value to 5 sec.","Set accelerometer value to enable","Call getSensorData() method."],
				"ExpectedOutcome":["The accelerometerX, accelerometerY and accelerometerZ values should not be returned"],
				"testToPerform":function(){

					RawSensors.sensorEvent="getsettingsjsFunction('%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s');";
					RawSensors.accelerometer = 'enabled';   
					RawSensors.minimumInterval = '5000'
					RawSensors.accelerometer = 'Disabled'; 
					RawSensors.getSensorData();
 

				},
				"FinalResult":""
		
		
			},{
				"VTID":"VT187-2880",
				"RegLevel":"R1",
				"Description":"Enable deviceOrientation",
				"PreCondition":[],
				"Steps":["Attach sensorEvent event.","Set deviceOrientation value to enable","Set minimumInterval value to 5 sec.","Call getSensorData() method."],
				"ExpectedOutcome":["Value of the orientation sensor should be returned","The values will be updated after every 5 seconds."],
				"testToPerform":function(){

					RawSensors.sensorEvent="getsettingsjsFunction('%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s');";
					RawSensors.deviceOrientation = 'enabled';   
					RawSensors.minimumInterval = '5000'
					RawSensors.getSensorData();
  
					
				},
				"FinalResult":""	
			},{
				"VTID":"VT187-2884",
				"RegLevel":"R1",
				"Description":"Enable tiltangle",
				"PreCondition":[],
				"Steps":["Attach sensorEvent event.","Set tiltangle value to enable","Set minimumInterval value to 5 sec.","Call getSensorData() method."],
				"ExpectedOutcome":["The tiltangleX, tiltangleY and tiltangleZ values should be returned","The values will be updated after every 5 seconds."],
				"testToPerform":function(){

					RawSensors.sensorEvent="getsettingsjsFunction('%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s');";
					RawSensors.tiltangle = 'enabled';   
					RawSensors.minimumInterval = '5000'
					RawSensors.getSensorData(); 
					
				},
				"FinalResult":""	
			},{
				"VTID":"VT187-2888",
				"RegLevel":"R1",
				"Description":"Enable motion",
				"PreCondition":[],
				"Steps":["Attach sensorEvent event.","Set motion value to enable","Set minimumInterval value to 5 sec.","Call getSensorData() method.","Shake the device","Check the return value of Motion"],
				"ExpectedOutcome":["The value of the motion sensor should be returned.","The values will be updated after every 5 seconds."],
				"testToPerform":function(){

					RawSensors.sensorEvent="getsettingsjsFunction('%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s');";
					RawSensors.motion = 'enabled';   
					RawSensors.minimumInterval = '5000'
					RawSensors.getSensorData();   
				},
				"FinalResult":""	
			},{
				"VTID":"VT187-2892",
				"RegLevel":"R1",
				"Description":"Enable ecompass",
				"PreCondition":[],
				"Steps":["Attach sensorEvent event.","Set ecompass value to enable","Set minimumInterval value to 5 sec.","Call getSensorData() method."],
				"ExpectedOutcome":["The value of the ecompass sensor should be returned","The values will be updated after every 5 seconds."],
				"testToPerform":function(){

					RawSensors.sensorEvent="getsettingsjsFunction('%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s');";
					RawSensors.ecompass = 'enabled';   
					RawSensors.minimumInterval = '5000'
					RawSensors.getSensorData();  
					
					
				},
				"FinalResult":""	
			},{
				"VTID":"VT187-2896",
				"RegLevel":"R1",
				"Description":"Enable magnetometer",
				"PreCondition":[],
				"Steps":["Attach sensorEvent event.","Set magnetometer value to enable","Set minimumInterval value to 5 sec.","Call getSensorData() method."],
				"ExpectedOutcome":["The magnetometerX, magnetometerY and magnetometerZ values should be returned","The values will be updated after every 5 seconds."],
				"testToPerform":function(){

					RawSensors.sensorEvent="getsettingsjsFunction('%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s');";
					RawSensors.magnetometer = 'enabled';   
					RawSensors.minimumInterval = '5000'
					RawSensors.getSensorData();  
						
									
				},
				"FinalResult":""	
			},{
				"VTID":"VT187-2900",
				"RegLevel":"R1",
				"Description":"Enable gyroscope",
				"PreCondition":[],
				"Steps":["Attach sensorEvent event.","Set gyroscope value to enable","Set minimumInterval value to 5 sec.","Call getSensorData() method."],
				"ExpectedOutcome":["The gyroscopeX, gyroscopeY and gyroscopeZ values should be returned","The values will be updated after every 5 seconds."],
				"testToPerform":function(){

					RawSensors.sensorEvent="getsettingsjsFunction('%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s');";
					RawSensors.gyroscope = 'enabled';   
					RawSensors.minimumInterval = '5000'
					RawSensors.getSensorData();  
					
					
				},
				"FinalResult":""
			},{
				"VTID":"VT187-2904",
				"RegLevel":"R1",
				"Description":"Enable ambientlight",
				"PreCondition":[],
				"Steps":["Attach sensorEvent event.","Set ambientlight value to enable","Do not set any value to minimumInterval","Call getSensorData() method."],
				"ExpectedOutcome":["The value of the ambient Light sensor should be returned","The values will be updated after every 1 seconds."],
				"testToPerform":function(){

					RawSensors.sensorEvent="getsettingsjsFunction('%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s');";
					RawSensors.ambientlight = 'enabled';   
					RawSensors.getSensorData();   
			
					
				},
				"FinalResult":""	
			},{
				
				"VTID":"VT187-2908",
				"RegLevel":"R1",
				"Description":"Enable proximity",
				"PreCondition":[],
				"Steps":["Attach sensorEvent event.","Set proximity value to enable","Do not set any value to minimumInterval","Call getSensorData() method."],
				"ExpectedOutcome":["The value of the proximity sensor should be returned","The values will be updated after every 1 seconds."],
				"testToPerform":function(){

					RawSensors.sensorEvent="getsettingsjsFunction('%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s');";
					RawSensors.proximity = 'enabled';   
					RawSensors.getSensorData();
									
				},
				"FinalResult":""				
			},{
				"VTID":"VT187-2912",
				"RegLevel":"R1",
				"Description":"Enable proximitylongrange",
				"PreCondition":[],
				"Steps":["Attach sensorEvent event.","Set proximitylongrange value to enable","Do not set any value to minimumInterval","Call getSensorData() method."],
				"ExpectedOutcome":["The value of the proximitylongrange sensor should be returned","The values will be updated after every 1 seconds."],
				"testToPerform":function(){

					RawSensors.sensorEvent="getsettingsjsFunction('%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s');";
					RawSensors.proximitylongrange = 'enabled';   
					RawSensors.getSensorData();
					
					
				},
				"FinalResult":""
			},{
				"VTID":"VT187-2916",
				"RegLevel":"R1",
				"Description":"Enable pressure",
				"PreCondition":[],
				"Steps":["Attach sensorEvent event.","Set pressure value to enable","Do not set any value to minimumInterval","Call getSensorData() method."],
				"ExpectedOutcome":["The value of the pressure sensor should be returned","The values will be updated after every 1 seconds."],
				"testToPerform":function(){

					RawSensors.sensorEvent="getsettingsjsFunction('%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s');";
					RawSensors.pressure = 'enabled';   
					RawSensors.getSensorData();
									
					
				},
				"FinalResult":""
			},{
				"VTID":"VT187-2920",
				"RegLevel":"R1",
				"Description":"Enable temperature",
				"PreCondition":[],
				"Steps":["Attach sensorEvent event.","Set temperature value to enable","Set minimumInterval value to 1 sec","Call getSensorData() method."],
				"ExpectedOutcome":["The value of the pressure sensor should be returned","The values will be updated after every 1 seconds."],
				"testToPerform":function(){

					RawSensors.sensorEvent="getsettingsjsFunction('%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s');";
					RawSensors.temperature = 'enabled'; 
					RawSensors.minimumInterval = '1000'  
					RawSensors.getSensorData();
								
									
				},
				"FinalResult":""	
			},{
				"VTID":"VT187-2924",
				"RegLevel":"R1",
				"Description":"Enable humidity",
				"PreCondition":[],
				"Steps":["Attach sensorEvent event.","Set humidity value to enable","Set minimumInterval value to 1 sec","Call getSensorData() method."],
				"ExpectedOutcome":["The value of the humidity sensor should be returned","The values will be updated after every 1 seconds."],
				"testToPerform":function(){

					RawSensors.sensorEvent="getsettingsjsFunction('%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s');";
					RawSensors.humidity = 'enabled'; 
					RawSensors.minimumInterval = '1000'  
					RawSensors.getSensorData();
					
					
				},
				"FinalResult":""
			},{
				"VTID":"VT187-2928",
				"RegLevel":"R1",
				"Description":"Enable gravity",
				"PreCondition":[],
				"Steps":["Attach sensorEvent event.","Set gravity value to enable","Set minimumInterval value to 1 sec","Call getSensorData() method."],
				"ExpectedOutcome":["The gravityX, gravityY and gravityZ values should be returned","The values will be updated after every 1 seconds."],
				"testToPerform":function(){

					RawSensors.sensorEvent="getsettingsjsFunction('%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s');";
					RawSensors.gravity = 'enabled'; 
					RawSensors.minimumInterval = '1000'  
					RawSensors.getSensorData();
					
				},
				"FinalResult":""	
			},{
				"VTID":"VT187-2932",
				"RegLevel":"R1",
				"Description":"Enable linearAcceleration",
				"PreCondition":[],
				"Steps":["Attach sensorEvent event.","Set linearAcceleration value to enable","Set minimumInterval value to 1 sec","Call getSensorData() method."],
				"ExpectedOutcome":["The linearAccelerationX, linearAccelerationY and linearAccelerationZ values should be returned.","The values will be updated after every 1 seconds."],
				"testToPerform":function(){

					RawSensors.sensorEvent="getsettingsjsFunction('%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s');";
					RawSensors.linearAcceleration = 'enabled'; 
					RawSensors.minimumInterval = '1000'  
					RawSensors.getSensorData();  
					
				},
				"FinalResult":""
			},{
				"VTID":"VT187-2936",
				"RegLevel":"R1",
				"Description":"Enable rotation",
				"PreCondition":[],
				"Steps":["Attach sensorEvent event.","Set rotation value to enable","Set minimumInterval value to 1 sec","Call getSensorData() method."],
				"ExpectedOutcome":["The rotationX, rotationY and rotationZ values should be returned","The values will be updated after every 1 seconds."],
				"testToPerform":function(){

					RawSensors.sensorEvent="getsettingsjsFunction('%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s');";
					RawSensors.rotation = 'enabled'; 
					RawSensors.minimumInterval = '1000'  
					RawSensors.getSensorData(); 
					
				},
				"FinalResult":""			
			},{
				"VTID":"VT187-2940",
				"RegLevel":"R1",
				"Description":"Enable orientation",
				"PreCondition":[],
				"Steps":["Attach sensorEvent event.","Set orientation value to enable","Set minimumInterval value to 1 sec","Call getSensorData() method."],
				"ExpectedOutcome":["The orientationX, orientationY and orientationZ values should be returned","The values will be updated after every 1 seconds."],
				"testToPerform":function(){

					RawSensors.sensorEvent="getsettingsjsFunction('%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s');";
					RawSensors.orientation = 'enabled'; 
					RawSensors.minimumInterval = '1000'  
					RawSensors.getSensorData(); 
					
					
				},
				"FinalResult":""	
			},{
				"VTID":"VT187-2945",
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
				"VTID":"VT187-2946",
				"RegLevel":"R1",
				"Description":"Disable all",
				"PreCondition":[],
				"Steps":["Attach sensorEvent event.","Set all value to enable","Set minimumInterval value to 2 sec","Set all value to disable","Call getSensorData() method."],
				"ExpectedOutcome":["Values for different parameters should not be returned."],
				"testToPerform":function(){

					RawSensors.sensorEvent="getsettingsjsFunction('%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s');";
					RawSensors.all = 'disabled'; 
					RawSensors.minimumInterval = '2000'  
					RawSensors.getSensorData();  
					
				},
				"FinalResult":""		
			},{
				"VTID":"VT187-2948",
				"RegLevel":"R1",
				"Description":"all persistence test",
				"PreCondition":[],
				"Steps":["Attach sensorEvent event.","Set all value to enable","Set minimumInterval value to 2 sec","Navigate to some other page or refresh the current page","Call getSensorData() method."],
				"ExpectedOutcome":["Values for different parameters should not be returned after reloading the page"],
				"testToPerform":function(){

					RawSensors.sensorEvent="getsettingsjsFunction('%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s');";
					RawSensors.all = 'enabled'; 
					RawSensors.minimumInterval = '2000'  
					RawSensors.getSensorData();  
					
				},
				"FinalResult":""
			},{
				"VTID":"VT187-2863",
				"RegLevel":"R1",
				"Description":"Test RawSensor with JSON objects",
				"PreCondition":[],
				"Steps":["Test all the Applicable Sensors. Via JSON Object"],
				"ExpectedOutcome":["All the values for different parameters should be returned correctly"],
				"testToPerform":function(){

					RawSensors.sensorEvent="getsettingsjsonFunction(%json);";
					RawSensors.all = 'enabled'; 
					RawSensors.minimumInterval = '2000'  
					RawSensors.getSensorData();   
					
				},
				"FinalResult":""
			},{
				"VTID":"VT187-2864",
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
			},{
				"VTID":"VT187-2261",
				"RegLevel":"R1",
				"Description":"Device & Application <br/> Set autoRotate is enabled",
				"PreCondition":[],
				"Steps":["Attach screenOrientationEvent on page.","Set autoRotate value to enabled","Rotate the device now either using method or manually"],
				"ExpectedOutcome":["Screen should be rotated.","ScreenOrientationEvent should fire with each rotation and should return the correct orientation with below values normal,rightHanded,leftHanded"],
				"testToPerform":function(){
					screenOrientation.autoRotate = 'Enabled'; 
					
				},
				"FinalResult":""
			},{
				"VTID":"VT187-2262",
				"RegLevel":"R1",
				"Description":"Device & Application <br/> Set autoRotate is disabled",
				"PreCondition":[],
				"Steps":["Attach screenOrientationEvent on page","Set autoRotate value to disabled","rotate the device manually","Call rightHanded method.","rotate the device manually."],
				"ExpectedOutcome":["Screen should not be rotated at step 3","Screen should be rotated at step 4 and event should fire.","Screen should not be rotated at step 5."],
				"testToPerform":function(){
					screenOrientation.autoRotate = 'Disabled'; 
					setTimeout(function(){
								ScreenOrientation.rightHanded();	
								alert("RightHanded called")				
							},10000);
					
				},
				"FinalResult":""															
			},{
				"VTID":"VT187-2299",
				"RegLevel":"R1",
				"Description":"Device & Application <br/> Stylus with Disable",
				"PreCondition":[],
				"Steps":["Call disable() method of stylus module.","Check the page interaction with device screen."],
				"ExpectedOutcome":["Page interaction with device screen should be disabled."],
				"testToPerform":function(){
					stylus.disable(); 
					setTimeout(function(){
								stylus.enable();	
								alert("Stylus Enabled")				
							},10000);
					
				},
				"FinalResult":""
			},{
				"VTID":"VT187-2338",
				"RegLevel":"R1",
				"Description":"Device & Application <br/> Volume with zero",
				"PreCondition":[],
				"Steps":["Keep the SetVolume parameter value to 0x0000.","Play the Wav file using playWave method.."],
				"ExpectedOutcome":["Device volume should be set to 0 i.e. silence mode and wav file should not be audible"],
				"testToPerform":function(){
					volume.setVolume = '0x0000'; 
					generic.PlayWave('\\Application\audio.wav', 1);
				
				},
				"FinalResult":""		
			},{
				"VTID":"VT187-2339",
				"RegLevel":"R1",
				"Description":"Device & Application <br/> Volume with Maximum",
				"PreCondition":[],
				"Steps":["Keep the SetVolume parameter value to 0xFFFF.","Play the Wav file using playWave method.."],
				"ExpectedOutcome":["Device volume should be set to Maximum and wav file should be audible"],
				"testToPerform":function(){
					volume.setVolume = '0xFFFF'; 
					generic.PlayWave('\\Application\audio.wav', 1);
				
				},
				"FinalResult":""		
			},{
				"VTID":"VT187-2348",
				"RegLevel":"R1",
				"Description":"Device & Application <br/> Zoom- text parameter to 0.",
				"PreCondition":[],
				"Steps":["Set the text parameter value of zoom module to 0.","Check the page with font size and image element"],
				"ExpectedOutcome":["The text font of the page will be smallest but it should not affect the image size."],
				"testToPerform":function(){
					zoom.text = '0'; 
				
				},
				"FinalResult":""	
			},{
				"VTID":"VT187-2354",
				"RegLevel":"R1",
				"Description":"Device & Application <br/> Zoom- page parameter value greater than 1",
				"PreCondition":[],
				"Steps":["Set the page parameter value greater than 1.","Check the page with font size and image element."],
				"ExpectedOutcome":["Page will be zoomed in.","All the content of page including image will be enlarged.."],
				"testToPerform":function(){
					zoom.page = '2'; 
				
				},
				"FinalResult":""
			},{
				"VTID":"VT187-1500",
				"RegLevel":"R1",
				"Description":"Device & Application <br/> Zoom- page parameter value less than 1",
				"PreCondition":[],
				"Steps":["Set the page parameter value greater than 1.","Check the page with font size and image element."],
				"ExpectedOutcome":["Page will be zoomed out","All the content of page including image will be smaller"],
				"testToPerform":function(){
					zoom.page = '0.5'; 
				
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