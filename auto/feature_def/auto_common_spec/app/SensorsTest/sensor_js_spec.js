	var eventsRcvd = 0;
	var callbackFired = false;
	var sensorInstance = null; 
	var getstatus = null;
	var getpropresult = '';
	var getallpropresult ='';
	var getresult = null;
	var sensorType = null;
	var myvar = '';
	var deviceOS = Rho.System.platform;

describe("Sensor JS API Test", function() {
	
	beforeEach(function() {
		callbackFired = false;
		eventsRcvd = 0;
		sensorInstance = null; 
		sensorType = null;
		getstatus = null;
		displayResult("Output: ","");
	});

    afterEach(function () {
        /* ... Tear it down ... */
        getresult = null;
        getpropresult = null;
        getallpropresult = null;

        if (sensorInstance != null)
    	{
    		sensorInstance.stop();
    		sensorInstance.minimumGap = 200;
    	}
        
        myvar = '';
    });

	var accelerometer_callback =  function (args){	
		eventsRcvd++;
		var result = '';
		result = 'Event ' + eventsRcvd + ' from ' + sensorInstance.type;	
		result += '<br/>Sensor status ' + sensorInstance.status;
        result += '<br/>Sensor read gap ' + sensorInstance.minimumGap;	
		result += '<br/>Status :- ' + JSON.stringify(args["status"]);
		result += '<br/>Message :- ' + JSON.stringify(args["message"]);
		result += '<br/> Coordinates are(' + JSON.stringify(args["accelerometer_x"]);
		result += ',' + JSON.stringify(args["accelerometer_y"]);
		result += ',' + JSON.stringify(args["accelerometer_z"]);
		result += ')'
	    displayResult("Output: ",result);
	    callbackFired = true;
	}

	var deviceOrientation_callback =  function (args){	
		eventsRcvd++;
		var result = '';
		result = 'Event ' + eventsRcvd + ' from ' + sensorInstance.type;
		result += '<br/>Sensor status ' + sensorInstance.status;
        result += '<br/>Sensor read gap ' + sensorInstance.minimumGap;
		result += '<br/>Status :- ' + JSON.stringify(args["status"]);
		result += '<br/>Message :- ' + JSON.stringify(args["message"]);
		result += '<br/>Coordinates is(' + JSON.stringify(args["deviceorientation_value"]);
	    result += ')'
	    displayResult("Output: ",result);
	    callbackFired = true;
	}

	var tiltangle_callback =  function (args){	
		eventsRcvd++;
		var result = '';
		result = 'Event ' + eventsRcvd + ' from ' + sensorInstance.type;
		result += '<br/>Sensor status ' + sensorInstance.status;
        result += '<br/>Sensor read gap ' + sensorInstance.minimumGap;
		result += '<br/>Status :- ' + JSON.stringify(args["status"]);
		result += '<br/>Message :- ' + JSON.stringify(args["message"]);
		result += '<br/>Coordinates are(' + JSON.stringify(args["tiltangle_x"]);
		result += ',' + JSON.stringify(args["tiltangle_y"]);
		result += ',' + JSON.stringify(args["tiltangle_z"]);
	    result += ')'
	    displayResult("Output: ",result);
	    callbackFired = true;
	}

	var motion_callback =  function (args){	
		eventsRcvd++;
		var result = '';
		result = 'Event ' + eventsRcvd + ' from ' + sensorInstance.type;
		result += '<br/>Sensor status ' + sensorInstance.status;
        result += '<br/>Sensor read gap ' + sensorInstance.minimumGap;
		result += '<br/>Status :- ' + JSON.stringify(args["status"]);
		result += '<br/>Message :- ' + JSON.stringify(args["message"]);
		result += '<br/>Coordinates is(' + JSON.stringify(args["motion_value"]);
	    result += ')'
	    displayResult("Output: ",result);
	    callbackFired = true;
	}

	var ecompass_callback =  function (args){	
		eventsRcvd++;
		var result = '';
		result = 'Event ' + eventsRcvd + ' from ' + sensorInstance.type;
		result += '<br/>Sensor status ' + sensorInstance.status;
        result += '<br/>Sensor read gap ' + sensorInstance.minimumGap;
		result += '<br/>Status :- ' + JSON.stringify(args["status"]);
		result += '<br/>Message :- ' + JSON.stringify(args["message"]);
		result += '<br/>Coordinates is(' + JSON.stringify(args["ecompass_value"]);
	    result += ')'
	    displayResult("Output: ",result);
	    callbackFired = true;
	}

	var magnetometer_callback =  function (args){	
		eventsRcvd++;
		var result = '';
		result = 'Event ' + eventsRcvd + ' from ' + sensorInstance.type;
		result += '<br/>Sensor status ' + sensorInstance.status;
        result += '<br/>Sensor read gap ' + sensorInstance.minimumGap;
		result += '<br/>Status :- ' + JSON.stringify(args["status"]);
		result += '<br/>Message :- ' + JSON.stringify(args["message"]);
		result += '<br/>Coordinates are(' + JSON.stringify(args["magnetometer_x"]);
		result += ',' + JSON.stringify(args["magnetometer_y"]);
		result += ',' + JSON.stringify(args["magnetometer_z"]);
		result += ')'
	    displayResult("Output: ",result);
	    callbackFired = true;
	}

	var gyroscope_callback =  function (args){	
		eventsRcvd++;
		var result = '';
		result = 'Event ' + eventsRcvd + ' from ' + sensorInstance.type;
		result += '<br/>Sensor status ' + sensorInstance.status;
        result += '<br/>Sensor read gap ' + sensorInstance.minimumGap;
		result += '<br/>Status :- ' + JSON.stringify(args["status"]);
		result += '<br/>Message :- ' + JSON.stringify(args["message"]);
		result += '<br/>Coordinates are(' + JSON.stringify(args["gyroscope_x"]);
		result += ',' + JSON.stringify(args["gyroscope_y"]);
		result += ',' + JSON.stringify(args["gyroscope_z"]);
		result += ')'
	    displayResult("Output: ",result);
	    callbackFired = true;
	}

	var ambientlight_callback =  function (args){	
		eventsRcvd++;
		var result = '';
		result = 'Event ' + eventsRcvd + ' from ' + sensorInstance.type;
		result += '<br/>Sensor status ' + sensorInstance.status;
        result += '<br/>Sensor read gap ' + sensorInstance.minimumGap;
		result += '<br/>Status :- ' + JSON.stringify(args["status"]);
		result += '<br/>Message :- ' + JSON.stringify(args["message"]);
		result += 'Coordinates is(' + JSON.stringify(args["ambientlight_value"]);
		result += ')'	
	    displayResult("Output: ",result);
	    callbackFired = true;
	}

	var proximity_callback =  function (args){	
		eventsRcvd++;
		var result = '';
		result = 'Event ' + eventsRcvd + ' from ' + sensorInstance.type;
		result += '<br/>Sensor status ' + sensorInstance.status;
        result += '<br/>Sensor read gap ' + sensorInstance.minimumGap;
		result += '<br/>Status :- ' + JSON.stringify(args["status"]);
		result += '<br/>Message :- ' + JSON.stringify(args["message"]);
		result += 'Coordinates is(' + JSON.stringify(args["proximity_value"]);
		result += ')'
	    displayResult("Output: ",result);
	    callbackFired = true;
	}

	var proximitylongrange_callback =  function (args){	
		eventsRcvd++;
		var result = '';
		result = 'Event ' + eventsRcvd + ' from ' + sensorInstance.type;
		result += '<br/>Sensor status ' + sensorInstance.status;
        result += '<br/>Sensor read gap ' + sensorInstance.minimumGap;
		result += '<br/>Status :- ' + JSON.stringify(args["status"]);
		result += '<br/>Message :- ' + JSON.stringify(args["message"]);
		result += '<br/>Coordinates is(' + JSON.stringify(args["proximitylongrange_value"]);
		result += ')'
	    displayResult("Output: ",result);
	    callbackFired = true;
	}

	var pressure_callback =  function (args){	
		eventsRcvd++;
		var result = '';
		result = 'Event ' + eventsRcvd + ' from ' + sensorInstance.type;
		result += '<br/>Sensor status ' + sensorInstance.status;
        result += '<br/>Sensor read gap ' + sensorInstance.minimumGap;
		result += '<br/>Status :- ' + JSON.stringify(args["status"]);
		result += '<br/>Message :- ' + JSON.stringify(args["message"]);
		result += '<br/>Coordinates is(' + JSON.stringify(args["pressure_value"]);
	    result += ')'
	    displayResult("Output: ",result);
	    callbackFired = true;
	}

	var temperature_callback =  function (args){	
		eventsRcvd++;
		var result = '';
		result = 'Event ' + eventsRcvd + ' from ' + sensorInstance.type;
		result += '<br/>Sensor status ' + sensorInstance.status;
        result += '<br/>Sensor read gap ' + sensorInstance.minimumGap;
		result += '<br/>Status :- ' + JSON.stringify(args["status"]);
		result += '<br/>Message :- ' + JSON.stringify(args["message"]);
		result += '<br/>Coordinates is(' + JSON.stringify(args["temperature_value"]);
	    result += ')'
	    displayResult("Output: ",result);
	    callbackFired = true;
	}

	var humidity_callback =  function (args){	
		eventsRcvd++;
		var result = '';
		result = 'Event ' + eventsRcvd + ' from ' + sensorInstance.type;
		result += '<br/>Sensor status ' + sensorInstance.status;
        result += '<br/>Sensor read gap ' + sensorInstance.minimumGap;
		result += '<br/>Status :- ' + JSON.stringify(args["status"]);
		result += '<br/>Message :- ' + JSON.stringify(args["message"]);
		result += '<br/>Coordinates is(' + JSON.stringify(args["humidity_value"]);
	    result += ')'
	    displayResult("Output: ",result);
	    callbackFired = true;
	}

	var gravity_callback =  function (args){
		eventsRcvd++;	
		var result = '';
		result = 'Event ' + eventsRcvd + ' from ' + sensorInstance.type;
		result += '<br/>Sensor status ' + sensorInstance.status;
        result += '<br/>Sensor read gap ' + sensorInstance.minimumGap;
		result += '<br/>Status :- ' + JSON.stringify(args["status"]);
		result += '<br/>Message :- ' + JSON.stringify(args["message"]);
		result += '<br/>Coordinates are(' + JSON.stringify(args["gravity_x"]);
		result += ',' + JSON.stringify(args["gravity_y"]);
		result += ',' + JSON.stringify(args["gravity_z"]);
	    result += ')'
	    displayResult("Output: ",result);
	    callbackFired = true;
	}

	var linearAcceleration_callback =  function (args){	
		eventsRcvd++;
		var result = '';
		result = 'Event ' + eventsRcvd + ' from ' + sensorInstance.type;
		result += '<br/>Sensor status ' + sensorInstance.status;
        result += '<br/>Sensor read gap ' + sensorInstance.minimumGap;
		result += '<br/>Status :- ' + JSON.stringify(args["status"]);
		result += '<br/>Message :- ' + JSON.stringify(args["message"]);
		result += '<br/>Coordinates are(' + JSON.stringify(args["linearacceleration_x"]);
		result += ',' + JSON.stringify(args["linearacceleration_y"]);
		result += ',' + JSON.stringify(args["linearacceleration_z"]);
	    result += ')'
	    displayResult("Output: ",result);
	    callbackFired = true;
	}

	var rotation_callback =  function (args){	
		eventsRcvd++;
		var result = '';
		result = 'Event ' + eventsRcvd + ' from ' + sensorInstance.type;
		result += '<br/>Sensor status ' + sensorInstance.status;
        result += '<br/>Sensor read gap ' + sensorInstance.minimumGap;
		result += '<br/>Status :- ' + JSON.stringify(args["status"]);
		result += '<br/>Message :- ' + JSON.stringify(args["message"]);
		result += '<br/>Coordinates are(' + JSON.stringify(args["rotation_x"]);
		result += ',' + JSON.stringify(args["rotation_y"]);
		result += ',' + JSON.stringify(args["rotation_z"]);
	    result += ')'
	    displayResult("Output: ",result);
	    callbackFired = true;
	}

	var orientation_callback =  function (args){	
		eventsRcvd++;
		var result = '';
		result = 'Event ' + eventsRcvd + ' from ' + sensorInstance.type;
		result += '<br/>Sensor status ' + sensorInstance.status;
        result += '<br/>Sensor read gap ' + sensorInstance.minimumGap;
		result += '<br/>Status :- ' + JSON.stringify(args["status"]);
		result += '<br/>Message :- ' + JSON.stringify(args["message"]);
		result += '<br/>Coordinates are(' + JSON.stringify(args["orientation_x"]);
		result += ',' + JSON.stringify(args["orientation_y"]);
		result += ',' + JSON.stringify(args["orientation_z"]);
	    result += ')'
	    displayResult("Output: ",result);
	    callbackFired = true;
	}

	var accelerometerdata_display =  function (){	
		var data = sensorInstance.readData();
		var result = '';
		result = 'Event ' + eventsRcvd + ' from ' + sensorInstance.type;
		result += '<br/>Sensor status ' + sensorInstance.status;
        result += '<br/>Sensor read gap ' + sensorInstance.minimumGap;
		result += '<br/>Status :- ' + JSON.stringify(data["status"]);
		result += '<br/>Message :- ' + JSON.stringify(data["message"]);
		result += '<br/> Coordinates are(' + JSON.stringify(data["accelerometer_x"]);
		result += ',' + JSON.stringify(data["accelerometer_y"]);
		result += ',' + JSON.stringify(data["accelerometer_z"]);
		result += ')'
	    displayResult("Output: ",result);
	    getstatus = JSON.stringify(data["status"]);
	}

	var deviceOrientationdata_display =  function (){	
		var data = sensorInstance.readData();
		var result = '';
		result = 'Event ' + eventsRcvd + ' from ' + sensorInstance.type;
		result += '<br/>Sensor status ' + sensorInstance.status;
        result += '<br/>Sensor read gap ' + sensorInstance.minimumGap;
		result += '<br/>Status :- ' + JSON.stringify(data["status"]);
		result += '<br/>Message :- ' + JSON.stringify(data["message"]);
		result += '<br/>Coordinates is(' + JSON.stringify(data["deviceorientation_value"]);
	    result += ')'
	    displayResult("Output: ",result);
	    getstatus = JSON.stringify(data["status"]);
	}

	var tiltangledata_display =  function (){
		var data = sensorInstance.readData();	
		var result = '';
		result = 'Event ' + eventsRcvd + ' from ' + sensorInstance.type;
		result += '<br/>Sensor status ' + sensorInstance.status;
        result += '<br/>Sensor read gap ' + sensorInstance.minimumGap;
		result += '<br/>Status :- ' + JSON.stringify(data["status"]);
		result += '<br/>Message :- ' + JSON.stringify(data["message"]);
		result += '<br/>Coordinates are(' + JSON.stringify(data["tiltangle_x"]);
		result += ',' + JSON.stringify(data["tiltangle_y"]);
		result += ',' + JSON.stringify(data["tiltangle_z"]);
	    result += ')'
	    displayResult("Output: ",result);
	    getstatus = JSON.stringify(data["status"]);
	}

	var motiondata_display =  function (){
		var data = sensorInstance.readData();	
		var result = '';
		result = 'Event ' + eventsRcvd + ' from ' + sensorInstance.type;
		result += '<br/>Sensor status ' + sensorInstance.status;
        result += '<br/>Sensor read gap ' + sensorInstance.minimumGap;
		result += '<br/>Status :- ' + JSON.stringify(data["status"]);
		result += '<br/>Message :- ' + JSON.stringify(data["message"]);
		result += '<br/>Coordinates is(' + JSON.stringify(data["motion_value"]);
	    result += ')'
	    displayResult("Output: ",result);
	    getstatus = JSON.stringify(data["status"]);
	}

	var ecompassdata_display =  function (){	
		var data = sensorInstance.readData();
		var result = '';
		result = 'Event ' + eventsRcvd + ' from ' + sensorInstance.type;
		result += '<br/>Sensor status ' + sensorInstance.status;
        result += '<br/>Sensor read gap ' + sensorInstance.minimumGap;
		result += '<br/>Status :- ' + JSON.stringify(data["status"]);
		result += '<br/>Message :- ' + JSON.stringify(data["message"]);
		result += '<br/>Coordinates is(' + JSON.stringify(data["ecompass_value"]);
	    result += ')'
	    displayResult("Output: ",result);
	    getstatus = JSON.stringify(data["status"]);
	}

	var magnetometerdata_display =  function (){	
		var data = sensorInstance.readData();
		var result = '';
		result = 'Event ' + eventsRcvd + ' from ' + sensorInstance.type;
		result += '<br/>Sensor status ' + sensorInstance.status;
        result += '<br/>Sensor read gap ' + sensorInstance.minimumGap;
		result += '<br/>Status :- ' + JSON.stringify(data["status"]);
		result += '<br/>Message :- ' + JSON.stringify(data["message"]);
		result += '<br/>Coordinates are(' + JSON.stringify(data["magnetometer_x"]);
		result += ',' + JSON.stringify(data["magnetometer_y"]);
		result += ',' + JSON.stringify(data["magnetometer_z"]);
		result += ')'
	    displayResult("Output: ",result);
	    getstatus = JSON.stringify(data["status"]);
	}

	var gyroscopedata_display =  function (){	
		var data = sensorInstance.readData();
		var result = '';
		result = 'Event ' + eventsRcvd + ' from ' + sensorInstance.type;
		result += '<br/>Sensor status ' + sensorInstance.status;
        result += '<br/>Sensor read gap ' + sensorInstance.minimumGap;
		result += '<br/>Status :- ' + JSON.stringify(data["status"]);
		result += '<br/>Message :- ' + JSON.stringify(data["message"]);
		result += '<br/>Coordinates are(' + JSON.stringify(data["gyroscope_x"]);
		result += ',' + JSON.stringify(data["gyroscope_y"]);
		result += ',' + JSON.stringify(data["gyroscope_z"]);
		result += ')'
	    displayResult("Output: ",result);
	    getstatus = JSON.stringify(data["status"]);
	}

	var ambientlightdata_display =  function (){	
		var data = sensorInstance.readData();
		var result = '';
		result = 'Event ' + eventsRcvd + ' from ' + sensorInstance.type;
		result += '<br/>Sensor status ' + sensorInstance.status;
        result += '<br/>Sensor read gap ' + sensorInstance.minimumGap;
		result += '<br/>Status :- ' + JSON.stringify(data["status"]);
		result += '<br/>Message :- ' + JSON.stringify(data["message"]);
		result += 'Coordinates is(' + JSON.stringify(data["ambientlight_value"]);
		result += ')'
	    displayResult("Output: ",result);
	    getstatus = JSON.stringify(data["status"]);
	}

	var proximitydata_display =  function (){	
		var data = sensorInstance.readData();
		var result = '';
		result = 'Event ' + eventsRcvd + ' from ' + sensorInstance.type;
		result += '<br/>Sensor status ' + sensorInstance.status;
        result += '<br/>Sensor read gap ' + sensorInstance.minimumGap;
		result += '<br/>Status :- ' + JSON.stringify(data["status"]);
		result += '<br/>Message :- ' + JSON.stringify(data["message"]);
		result += '<br/>Proximity Value :- ' + JSON.stringify(data["proximity_value"]);
	    displayResult("Output: ",result);
	    getstatus = JSON.stringify(data["status"]);
	}

	var proximitylongrangedata_display =  function (){	
		var data = sensorInstance.readData();
		var result = '';
		result = 'Event ' + eventsRcvd + ' from ' + sensorInstance.type;
		result += '<br/>Sensor status ' + sensorInstance.status;
        result += '<br/>Sensor read gap ' + sensorInstance.minimumGap;
		result += '<br/>Status :- ' + JSON.stringify(data["status"]);
		result += '<br/>Message :- ' + JSON.stringify(data["message"]);
		result += '<br/>Coordinates is(' + JSON.stringify(data["proximitylongrange_value"]);
		result += ')'
	    displayResult("Output: ",result);
	    getstatus = JSON.stringify(data["status"]);
	}

	var pressuredata_display =  function (){	
		var data = sensorInstance.readData();
		var result = '';
		result = 'Event ' + eventsRcvd + ' from ' + sensorInstance.type;
		result += '<br/>Sensor status ' + sensorInstance.status;
        result += '<br/>Sensor read gap ' + sensorInstance.minimumGap;
		result += '<br/>Status :- ' + JSON.stringify(data["status"]);
		result += '<br/>Message :- ' + JSON.stringify(data["message"]);
		result += '<br/>Coordinates is(' + JSON.stringify(data["pressure_value"]);
	    result += ')'
	    displayResult("Output: ",result);
	    getstatus = JSON.stringify(data["status"]);
	}

	var temperaturedata_display =  function (){	
		var data = sensorInstance.readData();
		var result = '';
		result = 'Event ' + eventsRcvd + ' from ' + sensorInstance.type;
		result += '<br/>Sensor status ' + sensorInstance.status;
        result += '<br/>Sensor read gap ' + sensorInstance.minimumGap;
		result += '<br/>Status :- ' + JSON.stringify(data["status"]);
		result += '<br/>Message :- ' + JSON.stringify(data["message"]);
		result += '<br/>Coordinates is(' + JSON.stringify(data["temperature_value"]);
	    result += ')'
	    displayResult("Output: ",result);
	    getstatus = JSON.stringify(data["status"]);
	}

	var humiditydata_display =  function (){	
		var data = sensorInstance.readData();
		var result = '';
		result = 'Event ' + eventsRcvd + ' from ' + sensorInstance.type;
		result += '<br/>Sensor status ' + sensorInstance.status;
        result += '<br/>Sensor read gap ' + sensorInstance.minimumGap;
		result += '<br/>Status :- ' + JSON.stringify(data["status"]);
		result += '<br/>Message :- ' + JSON.stringify(data["message"]);
		result += '<br/>Coordinates is(' + JSON.stringify(data["humidity_value"]);
	    result += ')'
	    displayResult("Output: ",result);
	    getstatus = JSON.stringify(data["status"]);
	}

	var gravitydata_display =  function (){	
		var data = sensorInstance.readData();
		var result = '';
		result = 'Event ' + eventsRcvd + ' from ' + sensorInstance.type;
		result += '<br/>Sensor status ' + sensorInstance.status;
        result += '<br/>Sensor read gap ' + sensorInstance.minimumGap;
		result += '<br/>Status :- ' + JSON.stringify(data["status"]);
		result += '<br/>Message :- ' + JSON.stringify(data["message"]);
		result += '<br/>Coordinates are(' + JSON.stringify(data["gravity_x"]);
		result += ',' + JSON.stringify(data["gravity_y"]);
		result += ',' + JSON.stringify(data["gravity_z"]);
	    result += ')'
	    displayResult("Output: ",result);
	    getstatus = JSON.stringify(data["status"]);
	}

	var linearAccelerationdata_display =  function (){	
		var data = sensorInstance.readData();
		var result = '';
		result = 'Event ' + eventsRcvd + ' from ' + sensorInstance.type;
		result += '<br/>Sensor status ' + sensorInstance.status;
        result += '<br/>Sensor read gap ' + sensorInstance.minimumGap;
		result += '<br/>Status :- ' + JSON.stringify(data["status"]);
		result += '<br/>Message :- ' + JSON.stringify(data["message"]);
		result += '<br/>Coordinates are(' + JSON.stringify(data["linearacceleration_x"]);
		result += ',' + JSON.stringify(data["linearacceleration_y"]);
		result += ',' + JSON.stringify(data["linearacceleration_z"]);
	    result += ')'
	    displayResult("Output: ",result);
	    getstatus = JSON.stringify(data["status"]);
	}

	var rotationdata_display =  function (){	
		var data = sensorInstance.readData();
		var result = '';
		result = 'Event ' + eventsRcvd + ' from ' + sensorInstance.type;
		result += '<br/>Sensor status ' + sensorInstance.status;
        result += '<br/>Sensor read gap ' + sensorInstance.minimumGap;
		result += '<br/>Status :- ' + JSON.stringify(data["status"]);
		result += '<br/>Message :- ' + JSON.stringify(data["message"]);
		result += '<br/>Coordinates are(' + JSON.stringify(data["rotation_x"]);
		result += ',' + JSON.stringify(data["rotation_y"]);
		result += ',' + JSON.stringify(data["rotation_z"]);
	    result += ')'
	    displayResult("Output: ",result);
	    getstatus = JSON.stringify(data["status"]);
	}

	var orientationdata_display =  function (){	
		var data = sensorInstance.readData();
		var result = '';
		result = 'Event ' + eventsRcvd + ' from ' + sensorInstance.type;
		result += '<br/>Sensor status ' + sensorInstance.status;
        result += '<br/>Sensor read gap ' + sensorInstance.minimumGap;
		result += '<br/>Status :- ' + JSON.stringify(data["status"]);
		result += '<br/>Message :- ' + JSON.stringify(data["message"]);
		result += '<br/>Coordinates are(' + JSON.stringify(data["orientation_x"]);
		result += ',' + JSON.stringify(data["orientation_y"]);
		result += ',' + JSON.stringify(data["orientation_z"]);
	    result += ')'
	    displayResult("Output: ",result);
	    getstatus = JSON.stringify(data["status"]);
	}

	var getproperty_callback =  function (args){	
		//var result = '<br/>Property Value :- ' + JSON.stringify(args);
		//getresult = JSON.stringify(args);		
		getresult = args;
	    displayResult("Output: ",getresult);
	}

	var getproperties_callback =  function (args){	
		//var result = '';
		//getpropresult = JSON.stringify(args);
		getpropresult = args;
		//getpropresult += '<br/>Status :- ' + JSON.stringify(args["status"]);
		//getpropresult += '<br/>Type :- ' + JSON.stringify(args["type"]);
	    displayResult("Output: ",getpropresult);
	}

	var getallproperties_callback =  function (args){	
		getallpropresult = args;
		//getallpropresult = '<br/>Minimumgap :- ' + JSON.stringify(args["minimumGap"]);
		//getallpropresult += '<br/>Status :- ' + JSON.stringify(args["status"]);
		//getallpropresult += '<br/>Type :- ' + JSON.stringify(args["type"]);
	    displayResult("Output: ",getallpropresult);
	}

	it("VT297-0001 | minimumGap getproperty before setting any value with synch for accelerometer |", function() {
		sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_ACCELEROMETER);

	    if (sensorInstance)
        {
	    	myvar = sensorInstance.getProperty("minimumGap");
	    	expect(myvar).toEqual("200");
	    	//expect(sensorInstance.getProperty("status")).toEqual("started");
	    }
	    else
	    	expect(sensorInstance).toBeNull(); // if sensor is not supported on the device should we fail the test?

	});

	it("VT297-0002 | minimumGap getproperty before setting any value with synch for deviceOrientation |", function() {
		sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_DEVICE_ORIENTATION);
		
		if (sensorInstance)
        {
			myvar = sensorInstance.getProperty("minimumGap");
			expect(myvar).toEqual("200");
			//expect(sensorInstance.getProperty("status")).toEqual("started");
	    }
		else
	    	expect(sensorInstance).toBeNull(); // if sensor is not supported on the device should we fail the test?
	});

	it("VT297-0003 | minimumGap getproperty before setting any value with synch for tiltangle |", function() {
		sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_TILT_ANGLE);
		if (sensorInstance)
        {
			myvar = sensorInstance.getProperty("minimumGap");
			expect(myvar).toEqual("200");
			//expect(sensorInstance.getProperty("status")).toEqual("started");
	    }
		else
	    	expect(sensorInstance).toBeNull(); // if sensor is not supported on the device should we fail the test?

	});

	it("VT297-0004 | minimumGap getproperty before setting any value with synch for motion |", function() {
		sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_MOTION);
		if (sensorInstance)
        {
			myvar = sensorInstance.getProperty("minimumGap");
			expect(myvar).toEqual("200");
			//expect(sensorInstance.getProperty("status")).toEqual("started");
	    }

		else
	    	expect(sensorInstance).toBeNull(); // if sensor is not supported on the device should we fail the test?
	});

	it("VT297-0005 | minimumGap getproperty before setting any value with synch for ecompass |", function() {
		
		sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_ECOMPASS);
		if (sensorInstance)
        {
			myvar = sensorInstance.getProperty("minimumGap");
			expect(myvar).toEqual("200");
			//expect(sensorInstance.getProperty("status")).toEqual("started");
	    }

		else
	    	expect(sensorInstance).toBeNull(); // if sensor is not supported on the device should we fail the test?
	});

	it("VT297-0006 | minimumGap getproperty before setting any value with synch for magnetometer |", function() {
		
		sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_MAGNETOMETER);
		if (sensorInstance)
        {
			myvar = sensorInstance.getProperty("minimumGap");
			expect(myvar).toEqual("200");
			//expect(sensorInstance.getProperty("status")).toEqual("started");
	    }

		else
	    	expect(sensorInstance).toBeNull(); // if sensor is not supported on the device should we fail the test?

	});

	it("VT297-0007 | minimumGap getproperty before setting any value with synch for gyroscope |", function() {
		
		sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_GYROSCOPE);
		if (sensorInstance)
        {
			myvar = sensorInstance.getProperty("minimumGap");
			expect(myvar).toEqual("200");
			//expect(sensorInstance.getProperty("status")).toEqual("started");
	    }

		else
	    	expect(sensorInstance).toBeNull(); // if sensor is not supported on the device should we fail the test?		

	});

	it("VT297-0008 | minimumGap getproperty before setting any value with synch for ambientlight |", function() {
		
		sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_AMBIENT_LIGHT);
		if (sensorInstance)
        {
			myvar = sensorInstance.getProperty("minimumGap");
			expect(myvar).toEqual("200");
			//expect(sensorInstance.getProperty("status")).toEqual("started");
	    }

		else
	    	expect(sensorInstance).toBeNull(); // if sensor is not supported on the device should we fail the test?

	});

	it("VT297-0009 | minimumGap getproperty before setting any value with synch for proximity |", function() {
		
		sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_PROXIMITY);
		if (sensorInstance)
        {
			myvar = sensorInstance.getProperty("minimumGap");
			expect(myvar).toEqual("200");
			//expect(sensorInstance.getProperty("status")).toEqual("started");
	    }

		else
	    	expect(sensorInstance).toBeNull(); // if sensor is not supported on the device should we fail the test?
	});

	it("VT297-0010 | minimumGap getproperty before setting any value with synch for proximitylongrange |", function() {
		
		sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_PROXIMITY_LONG_RANGE);
		if (sensorInstance)
        {
			myvar = sensorInstance.getProperty("minimumGap");
			expect(myvar).toEqual("200");
			//expect(sensorInstance.getProperty("status")).toEqual("started");
	    }

		else
	    	expect(sensorInstance).toBeNull(); // if sensor is not supported on the device should we fail the test?

	});

	it("VT297-0011 | minimumGap getproperty before setting any value with synch for pressure |", function() {
		
		sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_PRESSURE);
		if (sensorInstance)
        {
			myvar = sensorInstance.getProperty("minimumGap");
			expect(myvar).toEqual("200");
			//expect(sensorInstance.getProperty("status")).toEqual("started");
	    }

		else
	    	expect(sensorInstance).toBeNull(); // if sensor is not supported on the device should we fail the test?

	});

	it("VT297-0012 | minimumGap getproperty before setting any value with synch for temperature |", function() {
		
		sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_TEMPERATURE);
		if (sensorInstance)
        {
			myvar = sensorInstance.getProperty("minimumGap");
			expect(myvar).toEqual("200");
			//expect(sensorInstance.getProperty("status")).toEqual("started");
	    }

		else
	    	expect(sensorInstance).toBeNull(); // if sensor is not supported on the device should we fail the test?

	});

	it("VT297-0013 | minimumGap getproperty before setting any value with synch for humidity |", function() {
		
		sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_HUMIDITY);
		if (sensorInstance)
        {
			myvar = sensorInstance.getProperty("minimumGap");
			expect(myvar).toEqual("200");
			//expect(sensorInstance.getProperty("status")).toEqual("started");
	    }

		else
	    	expect(sensorInstance).toBeNull(); // if sensor is not supported on the device should we fail the test?

	});

	it("VT297-0014 | minimumGap getproperty before setting any value with synch for gravity |", function() {
		
		sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_GRAVITY);
		if (sensorInstance)
        {
			myvar = sensorInstance.getProperty("minimumGap");
			expect(myvar).toEqual("200");
			//expect(sensorInstance.getProperty("status")).toEqual("started");
	    }

		else
	    	expect(sensorInstance).toBeNull(); // if sensor is not supported on the device should we fail the test?

	});

	it("VT297-0015 | minimumGap getproperty before setting any value with synch for linearAcceleration |", function() {
		
		sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_LINEAR_ACCELERATION);
		if (sensorInstance)
        {
			myvar = sensorInstance.getProperty("minimumGap");
			expect(myvar).toEqual("200");
			//expect(sensorInstance.getProperty("status")).toEqual("started");
	    }

		else
	    	expect(sensorInstance).toBeNull(); // if sensor is not supported on the device should we fail the test?

	});

	it("VT297-0016 | minimumGap getproperty before setting any value with synch for rotation |", function() {
		
		sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_ROTATION);
		if (sensorInstance)
        {
			myvar = sensorInstance.getProperty("minimumGap");
			expect(myvar).toEqual("200");
			//expect(sensorInstance.getProperty("status")).toEqual("started");
	    }

		else
	    	expect(sensorInstance).toBeNull(); // if sensor is not supported on the device should we fail the test?

	});

	it("VT297-0017 | minimumGap getproperty before setting any value with synch for orientation |", function() {
		
		sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_ORIENTATION);
		if (sensorInstance)
        {
			myvar = sensorInstance.getProperty("minimumGap");
			expect(myvar).toEqual("200");
			//expect(sensorInstance.getProperty("status")).toEqual("started");
	    }
		else
	    	expect(sensorInstance).toBeNull(); // if sensor is not supported on the device should we fail the test?

	});

	it("VT297-0018 | type getproperty before setting any value with synch for accelerometer |", function() {
		
		sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_ACCELEROMETER);
		if (sensorInstance)
        {
			myvar = sensorInstance.getProperty("type");
			expect(myvar).toEqual("Accelerometer");
	    }
		else
	    	expect(sensorInstance).toBeNull(); // if sensor is not supported on the device should we fail the test?		

	});

	it("VT297-0019 | type getproperty before setting any value with synch for deviceOrientation |", function() {
		
		sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_DEVICE_ORIENTATION);
		if (sensorInstance)
        {
			myvar = sensorInstance.getProperty("type");
			expect(myvar).toEqual("DeviceOrientation");
	    }
		else
	    	expect(sensorInstance).toBeNull(); // if sensor is not supported on the device should we fail the test?
		

	});

	it("VT297-0020 | type getproperty before setting any value with synch for tiltangle |", function() {
		
		sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_TILT_ANGLE);
		if (sensorInstance)
        {
			myvar = sensorInstance.getProperty("type");
			expect(myvar).toEqual("TiltAngle");
	    }
		else
	    	expect(sensorInstance).toBeNull(); // if sensor is not supported on the device should we fail the test?

	});

	it("VT297-0021 | type getproperty before setting any value with synch for motion |", function() {
		
		sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_MOTION);
		if (sensorInstance)
        {
			myvar = sensorInstance.getProperty("type");
			expect(myvar).toEqual("Motion");
	    }
		else
	    	expect(sensorInstance).toBeNull(); // if sensor is not supported on the device should we fail the test?
		

	});

	it("VT297-0022 | type getproperty before setting any value with synch for ecompass |", function() {
		
		sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_ECOMPASS);
		if (sensorInstance)
        {
			myvar = sensorInstance.getProperty("type");
			expect(myvar).toEqual("ECompass");
	    }
		else
	    	expect(sensorInstance).toBeNull(); // if sensor is not supported on the device should we fail the test?
		

	});

	it("VT297-0023 | type getproperty before setting any value with synch for magnetometer |", function() {
		
		sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_MAGNETOMETER);
		if (sensorInstance)
        {
			myvar = sensorInstance.getProperty("type");
			expect(myvar).toEqual("Magnetometer");
	    }
		else
	    	expect(sensorInstance).toBeNull(); // if sensor is not supported on the device should we fail the test?
		

	});

	it("VT297-0024 | type getproperty before setting any value with synch for gyroscope |", function() {
		
		sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_GYROSCOPE);
		if (sensorInstance)
        {
			myvar = sensorInstance.getProperty("type");
			expect(myvar).toEqual("Gyroscope");
	    }
		else
	    	expect(sensorInstance).toBeNull(); // if sensor is not supported on the device should we fail the test?
		

	});

	it("VT297-0025 | type getproperty before setting any value with synch for ambientlight |", function() {
		
		sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_AMBIENT_LIGHT);
		if (sensorInstance)
        {
			myvar = sensorInstance.getProperty("type");
			expect(myvar).toEqual("AmbientLight");
	    }
		else
	    	expect(sensorInstance).toBeNull(); // if sensor is not supported on the device should we fail the test?		

	});

	it("VT297-0026 | type getproperty before setting any value with synch for proximity |", function() {
		
		sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_PROXIMITY);
		if (sensorInstance)
        {
			myvar = sensorInstance.getProperty("type");
			expect(myvar).toEqual("Proximity");
	    }
		else
	    	expect(sensorInstance).toBeNull(); // if sensor is not supported on the device should we fail the test?

	});

	it("VT297-0027 | type getproperty before setting any value with synch for proximitylongrange |", function() {
		
		sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_PROXIMITY_LONG_RANGE);
		if (sensorInstance)
        {
			myvar = sensorInstance.getProperty("type");
			expect(myvar).toEqual("ProximityLongRange");
	    }
		else
	    	expect(sensorInstance).toBeNull(); // if sensor is not supported on the device should we fail the test?
		

	});

	it("VT297-0028 | type getproperty before setting any value with synch for pressure |", function() {
		
		sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_PRESSURE);
		if (sensorInstance)
        {
			myvar = sensorInstance.getProperty("type");
			expect(myvar).toEqual("Pressure");
	    }
		else
	    	expect(sensorInstance).toBeNull(); // if sensor is not supported on the device should we fail the test?
		

	});

	it("VT297-0029 | type getproperty before setting any value with synch for temperature |", function() {
		
		sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_TEMPERATURE);
		if (sensorInstance)
        {
			myvar = sensorInstance.getProperty("type");
			expect(myvar).toEqual("Temperature");
	    }
		else
	    	expect(sensorInstance).toBeNull(); // if sensor is not supported on the device should we fail the test?
		

	});

	it("VT297-0030 | type getproperty before setting any value with synch for humidity |", function() {
		
		sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_HUMIDITY);
		if (sensorInstance)
        {
			myvar = sensorInstance.getProperty("type");
			expect(myvar).toEqual("Humidity");
	    }
		else
	    	expect(sensorInstance).toBeNull(); // if sensor is not supported on the device should we fail the test?		

	});

	it("VT297-0031 | type getproperty before setting any value with synch for gravity |", function() {
		
		sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_GRAVITY);
		if (sensorInstance)
        {
			myvar = sensorInstance.getProperty("type");
			expect(myvar).toEqual("Gravity");
	    }
		else
	    	expect(sensorInstance).toBeNull(); // if sensor is not supported on the device should we fail the test?

	});

	it("VT297-0032 | type getproperty before setting any value with synch for linearAcceleration |", function() {
		
		sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_LINEAR_ACCELERATION);
		if (sensorInstance)
        {
			myvar = sensorInstance.getProperty("type");
			expect(myvar).toEqual("LinearAcceleration");
	    }
		else
	    	expect(sensorInstance).toBeNull(); // if sensor is not supported on the device should we fail the test?
		

	});

	it("VT297-0033 | type getproperty before setting any value with synch for rotation |", function() {
		
		sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_ROTATION);
		if (sensorInstance)
        {
			myvar = sensorInstance.getProperty("type");
			expect(myvar).toEqual("Rotation");
	    }
		else
	    	expect(sensorInstance).toBeNull(); // if sensor is not supported on the device should we fail the test?
		

	});

	it("VT297-0034 | type getproperty before setting any value with synch for orientation |", function() {
		
		sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_ORIENTATION);
		if (sensorInstance)
        {
			myvar = sensorInstance.getProperty("type");
			expect(myvar).toEqual("Orientation");
	    }
		else
	    	expect(sensorInstance).toBeNull(); // if sensor is not supported on the device should we fail the test?		

	});

	it("VT297-0035 | status getproperty synch for accelerometer before start sensor |", function() {
		
		sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_ACCELEROMETER);		
		if (sensorInstance)
        {
			// sensorInstance.start(); //uncomment this line the sensor will return ready,  as the sensor was stopped in aftereach
			myvar = sensorInstance.getProperty("status");
			expect(myvar).toEqual("ready");	 
	    }
		else
	    	expect(sensorInstance).toBeNull(); // if sensor is not supported on the device should we fail the test?
	});

	it("VT297-0036 | status getproperty synch for deviceOrientation before start sensor |", function() {
		
		sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_DEVICE_ORIENTATION);
		if (sensorInstance)
        {
			// sensorInstance.start(); //uncomment this line the sensor will return ready,  as the sensor was stopped in aftereach
			myvar = sensorInstance.getProperty("status");
			expect(myvar).toEqual("ready");
	    }
		else
	    	expect(sensorInstance).toBeNull(); // if sensor is not supported on the device should we fail the test?

	});

	it("VT297-0037 | status getproperty synch for tiltangle before start sensor |", function() {
		
		sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_TILT_ANGLE);
		if (sensorInstance)
        {
			// sensorInstance.start(); //uncomment this line the sensor will return ready,  as the sensor was stopped in aftereach
			myvar = sensorInstance.getProperty("status");
			expect(myvar).toEqual("ready");
	    }
		else
	    	expect(sensorInstance).toBeNull(); // if sensor is not supported on the device should we fail the test?

	});

	it("VT297-0038 | status getproperty synch for motion before start sensor |", function() {
		
		sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_MOTION);
		if (sensorInstance)
        {
			// sensorInstance.start(); //uncomment this line the sensor will return ready,  as the sensor was stopped in aftereach
			myvar = sensorInstance.getProperty("status");
			expect(myvar).toEqual("ready");
	    }
		else
	    	expect(sensorInstance).toBeNull(); // if sensor is not supported on the device should we fail the test?

	});

	it("VT297-0039 | status getproperty synch for ecompass before start sensor |", function() {
		
		sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_ECOMPASS);
		if (sensorInstance)
        {
			// sensorInstance.start(); //uncomment this line the sensor will return ready,  as the sensor was stopped in aftereach
			myvar = sensorInstance.getProperty("status");
			expect(myvar).toEqual("ready");
	    }
		else
	    	expect(sensorInstance).toBeNull(); // if sensor is not supported on the device should we fail the test?

	});

	it("VT297-0040 | status getproperty synch for magnetometer before start sensor |", function() {
		
		sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_MAGNETOMETER);
		if (sensorInstance)
        {
			// sensorInstance.start(); //uncomment this line the sensor will return ready,  as the sensor was stopped in aftereach
			myvar = sensorInstance.getProperty("status");
			expect(myvar).toEqual("ready");
	    }
		else
	    	expect(sensorInstance).toBeNull(); // if sensor is not supported on the device should we fail the test?

	});

	it("VT297-0041 | status getproperty synch for gyroscope before start sensor |", function() {
		
		sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_GYROSCOPE);
		if (sensorInstance)
        {
			// sensorInstance.start(); //uncomment this line the sensor will return ready,  as the sensor was stopped in aftereach
			myvar = sensorInstance.getProperty("status");
			expect(myvar).toEqual("ready");
	    }
		else
	    	expect(sensorInstance).toBeNull(); // if sensor is not supported on the device should we fail the test?

	});

	it("VT297-0042 | status getproperty synch for ambientlight before start sensor |", function() {
		
		sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_AMBIENT_LIGHT);
		if (sensorInstance)
        {
			// sensorInstance.start(); //uncomment this line the sensor will return ready,  as the sensor was stopped in aftereach
			myvar = sensorInstance.getProperty("status");
			expect(myvar).toEqual("ready");
	    }
		else
	    	expect(sensorInstance).toBeNull(); // if sensor is not supported on the device should we fail the test?

	});

	it("VT297-0043 | status getproperty synch for proximity before start sensor |", function() {
		
		sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_PROXIMITY);
		if (sensorInstance)
        {
			// sensorInstance.start(); //uncomment this line the sensor will return ready,  as the sensor was stopped in aftereach
			myvar = sensorInstance.getProperty("status");
			expect(myvar).toEqual("ready");
	    }
		else
	    	expect(sensorInstance).toBeNull(); // if sensor is not supported on the device should we fail the test?

	});

	it("VT297-0044 | status getproperty synch for proximitylongrange before start sensor |", function() {
		
		sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_PROXIMITY_LONG_RANGE);
		if (sensorInstance)
        {
			// sensorInstance.start(); //uncomment this line the sensor will return ready,  as the sensor was stopped in aftereach
			myvar = sensorInstance.getProperty("status");
			expect(myvar).toEqual("ready");
	    }
		else
	    	expect(sensorInstance).toBeNull(); // if sensor is not supported on the device should we fail the test?

	});

	it("VT297-0045 | status getproperty synch for pressure before start sensor |", function() {
		
		sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_PRESSURE);
		if (sensorInstance)
        {
			// sensorInstance.start(); //uncomment this line the sensor will return ready,  as the sensor was stopped in aftereach
			myvar = sensorInstance.getProperty("status");
			expect(myvar).toEqual("ready");
	    }
		else
	    	expect(sensorInstance).toBeNull(); // if sensor is not supported on the device should we fail the test?

	});

	it("VT297-0046 | status getproperty synch for temperature before start sensor |", function() {
		
		sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_TEMPERATURE);
		if (sensorInstance)
        {
			// sensorInstance.start(); //uncomment this line the sensor will return ready,  as the sensor was stopped in aftereach
			myvar = sensorInstance.getProperty("status");
			expect(myvar).toEqual("ready");
	    }
		else
	    	expect(sensorInstance).toBeNull(); // if sensor is not supported on the device should we fail the test?

	});

	it("VT297-0047 | status getproperty synch for humidity before start sensor |", function() {
		
		sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_HUMIDITY);
		if (sensorInstance)
        {
			// sensorInstance.start(); //uncomment this line the sensor will return ready,  as the sensor was stopped in aftereach
			myvar = sensorInstance.getProperty("status");
			expect(myvar).toEqual("ready");
	    }
		else
	    	expect(sensorInstance).toBeNull(); // if sensor is not supported on the device should we fail the test?

	});

	it("VT297-0048 | status getproperty synch for gravity before start sensor |", function() {
		
		sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_GRAVITY);
		if (sensorInstance)
        {
			// sensorInstance.start(); //uncomment this line the sensor will return ready,  as the sensor was stopped in aftereach
			myvar = sensorInstance.getProperty("status");
			expect(myvar).toEqual("ready");
	    }
		else
	    	expect(sensorInstance).toBeNull(); // if sensor is not supported on the device should we fail the test?

	});

	it("VT297-0049 | status getproperty synch for linearAcceleration before start sensor |", function() {
		
		sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_LINEAR_ACCELERATION);
		if (sensorInstance)
        {
			// sensorInstance.start(); //uncomment this line the sensor will return ready,  as the sensor was stopped in aftereach
			myvar = sensorInstance.getProperty("status");
			expect(myvar).toEqual("ready");
	    }
		else
	    	expect(sensorInstance).toBeNull(); // if sensor is not supported on the device should we fail the test?

	});

	it("VT297-0050 | status getproperty synch for rotation before start sensor |", function() {
		
		sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_ROTATION);
		if (sensorInstance)
        {
			// sensorInstance.start(); //uncomment this line the sensor will return ready,  as the sensor was stopped in aftereach
			myvar = sensorInstance.getProperty("status");
			expect(myvar).toEqual("ready");
	    }
		else
	    	expect(sensorInstance).toBeNull(); // if sensor is not supported on the device should we fail the test?

	});

	it("VT297-0051 | status getproperty synch for orientation before start sensor |", function() {
		
		sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_ORIENTATION);
		if (sensorInstance)
        {
			// sensorInstance.start(); //uncomment this line the sensor will return ready,  as the sensor was stopped in aftereach
			myvar = sensorInstance.getProperty("status");
			expect(myvar).toEqual("ready");
	    }
		else
	    	expect(sensorInstance).toBeNull(); // if sensor is not supported on the device should we fail the test?

	});

	it("VT297-0052 | status getproperty synch for accelerometer after start sensor |", function() {	
		sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_ACCELEROMETER);
		if (sensorInstance)
        {
          sensorInstance.start();	
	      myvar = sensorInstance.getProperty("status");
		  expect(myvar).toEqual("started");
	    }
	    else
    	expect(sensorInstance).toBeNull(); // if sensor is not supported on the device should we fail the test?

	});

	it("VT297-0053 | status getproperty synch for deviceOrientation after start sensor |", function() {

		sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_DEVICE_ORIENTATION);
		if (sensorInstance)
        {
          sensorInstance.start();	
	      myvar = sensorInstance.getProperty("status");
		  expect(myvar).toEqual("started");
	    }
	    else
    	expect(sensorInstance).toBeNull(); // if sensor is not supported on the device should we fail the test?

	});

	it("VT297-0054 | status getproperty synch for tiltangle after start sensor |", function() {

		sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_TILT_ANGLE);
		if (sensorInstance)
        {
          sensorInstance.start();	
	      myvar = sensorInstance.getProperty("status");
		  expect(myvar).toEqual("started");
	    }
	    else
    	expect(sensorInstance).toBeNull(); // if sensor is not supported on the device should we fail the test?

	});

	it("VT297-0055 | status getproperty synch for motion after start sensor |", function() {

		sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_MOTION);
		if (sensorInstance)
        {
          sensorInstance.start();	
	      myvar = sensorInstance.getProperty("status");
		  expect(myvar).toEqual("started");
	    }
	    else
    	expect(sensorInstance).toBeNull(); // if sensor is not supported on the device should we fail the test?

	});

	it("VT297-0056 | status getproperty synch for ecompass after start sensor |", function() {

		sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_ECOMPASS);
		if (sensorInstance)
        {
          sensorInstance.start();	
	      myvar = sensorInstance.getProperty("status");
		  expect(myvar).toEqual("started");
	    }
	    else
    	expect(sensorInstance).toBeNull(); // if sensor is not supported on the device should we fail the test?

	});

	it("VT297-0057 | status getproperty synch for magnetometer after start sensor |", function() {

		sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_MAGNETOMETER);
		if (sensorInstance)
        {
          sensorInstance.start();	
	      myvar = sensorInstance.getProperty("status");
		  expect(myvar).toEqual("started");
	    }
	    else
    	expect(sensorInstance).toBeNull(); // if sensor is not supported on the device should we fail the test?

	});

	it("VT297-0058 | status getproperty synch for gyroscope after start sensor |", function() {

		sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_GYROSCOPE);
		if (sensorInstance)
        {
          sensorInstance.start();	
	      myvar = sensorInstance.getProperty("status");
		  expect(myvar).toEqual("started");
	    }
	    else
    	expect(sensorInstance).toBeNull(); // if sensor is not supported on the device should we fail the test?

	});

	it("VT297-0059 | status getproperty synch for ambientlight after start sensor |", function() {

		sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_AMBIENT_LIGHT);
		if (sensorInstance)
        {
          sensorInstance.start();	
	      myvar = sensorInstance.getProperty("status");
		  expect(myvar).toEqual("started");
	    }
	    else
    	expect(sensorInstance).toBeNull(); // if sensor is not supported on the device should we fail the test?

	});

	it("VT297-0060 | status getproperty synch for proximity after start sensor |", function() {

		sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_PROXIMITY);
		if (sensorInstance)
        {
          sensorInstance.start();	
	      myvar = sensorInstance.getProperty("status");
		  expect(myvar).toEqual("started");
	    }
	    else
    	expect(sensorInstance).toBeNull(); // if sensor is not supported on the device should we fail the test?

	});

	it("VT297-0061 | status getproperty synch for proximitylongrange after start sensor |", function() {

		sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_PROXIMITY_LONG_RANGE);
		if (sensorInstance)
        {
          sensorInstance.start();	
	      myvar = sensorInstance.getProperty("status");
		  expect(myvar).toEqual("started");
	    }
	    else
    	expect(sensorInstance).toBeNull(); // if sensor is not supported on the device should we fail the test?

	});

	it("VT297-0062 | status getproperty synch for pressure after start sensor |", function() {

		sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_PRESSURE);
		if (sensorInstance)
        {
          sensorInstance.start();	
	      myvar = sensorInstance.getProperty("status");
		  expect(myvar).toEqual("started");
	    }
	    else
    	expect(sensorInstance).toBeNull(); // if sensor is not supported on the device should we fail the test?

	});

	it("VT297-0063 | status getproperty synch for temperature after start sensor |", function() {

		sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_TEMPERATURE);
		if (sensorInstance)
        {
          sensorInstance.start();	
	      myvar = sensorInstance.getProperty("status");
		  expect(myvar).toEqual("started");
	    }
	    else
    	expect(sensorInstance).toBeNull(); // if sensor is not supported on the device should we fail the test?

	});

	it("VT297-0064 | status getproperty synch for humidity after start sensor |", function() {

		sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_HUMIDITY);
		if (sensorInstance)
        {
          sensorInstance.start();	
	      myvar = sensorInstance.getProperty("status");
		  expect(myvar).toEqual("started");
	    }
	    else
    	expect(sensorInstance).toBeNull(); // if sensor is not supported on the device should we fail the test?

	});

	it("VT297-0065 | status getproperty synch for gravity after start sensor |", function() {

		sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_GRAVITY);
		if (sensorInstance)
        {
          sensorInstance.start();	
	      myvar = sensorInstance.getProperty("status");
		  expect(myvar).toEqual("started");
	    }
	    else
    	expect(sensorInstance).toBeNull(); // if sensor is not supported on the device should we fail the test?

	});

	it("VT297-0066 | status getproperty synch for linearAcceleration after start sensor |", function() {

		sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_LINEAR_ACCELERATION);
		if (sensorInstance)
        {
          sensorInstance.start();	
	      myvar = sensorInstance.getProperty("status");
		  expect(myvar).toEqual("started");
	    }
	    else
    	expect(sensorInstance).toBeNull(); // if sensor is not supported on the device should we fail the test?

	});

	it("VT297-0067 | status getproperty synch for rotation after start sensor |", function() {

		sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_ROTATION);				
		if (sensorInstance)
        {
          sensorInstance.start();	
	      myvar = sensorInstance.getProperty("status");
		  expect(myvar).toEqual("started");
	    }
	    else
    	expect(sensorInstance).toBeNull(); // if sensor is not supported on the device should we fail the test?

	});

	it("VT297-0068 | status getproperty synch for orientation after start sensor |", function() {

		sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_ORIENTATION);
		if (sensorInstance)
        {
          sensorInstance.start();	
	      myvar = sensorInstance.getProperty("status");
		  expect(myvar).toEqual("started");
	    }
	    else
    	expect(sensorInstance).toBeNull(); // if sensor is not supported on the device should we fail the test?

	});

	it("VT297-0069 | status getproperty synch for accelerometer after stop sensor |", function() {

		sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_ACCELEROMETER);
		if (sensorInstance)
        {
          sensorInstance.start();	
		  sensorInstance.stop();
	      myvar = sensorInstance.getProperty("status");
		  expect(myvar).toEqual("ready");
	    }
	    else
    	expect(sensorInstance).toBeNull(); // if sensor is not supported on the device should we fail the test?

	});

	it("VT297-0070 | status getproperty synch for deviceOrientation after stop sensor |", function() {

		sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_DEVICE_ORIENTATION);
		if (sensorInstance)
        {
          sensorInstance.start();	
          sensorInstance.stop();
	      myvar = sensorInstance.getProperty("status");
		  expect(myvar).toEqual("ready");
	    }
	    else
    	expect(sensorInstance).toBeNull(); // if sensor is not supported on the device should we fail the test?

	});

	it("VT297-0071 | status getproperty synch for tiltangle after stop sensor |", function() {

		sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_TILT_ANGLE);
		if (sensorInstance)
        {
          sensorInstance.start();
          sensorInstance.stop();	
	      myvar = sensorInstance.getProperty("status");
		  expect(myvar).toEqual("ready");
	    }
	    else
    	expect(sensorInstance).toBeNull(); // if sensor is not supported on the device should we fail the test?

	});

	it("VT297-0072 | status getproperty synch for motion after stop sensor |", function() {

		sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_MOTION);
		if (sensorInstance)
        {
          sensorInstance.start();
          sensorInstance.stop();	
	      myvar = sensorInstance.getProperty("status");
		  expect(myvar).toEqual("ready");
	    }
	    else
    	expect(sensorInstance).toBeNull(); // if sensor is not supported on the device should we fail the test?

	});

	it("VT297-0073 | status getproperty synch for ecompass after stop sensor |", function() {

		sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_ECOMPASS);
		if (sensorInstance)
        {
          sensorInstance.start();
          sensorInstance.stop();	
	      myvar = sensorInstance.getProperty("status");
		  expect(myvar).toEqual("ready");
	    }
	    else
    	expect(sensorInstance).toBeNull(); // if sensor is not supported on the device should we fail the test?

	});

	it("VT297-0074 | status getproperty synch for magnetometer after stop sensor |", function() {

		sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_MAGNETOMETER);
		if (sensorInstance)
        {
          sensorInstance.start();	
	      myvar = sensorInstance.getProperty("status");
	      sensorInstance.stop();
		  expect(myvar).toEqual("started"); // when the staus read the scanner was in started state.
	    }
	    else
    	expect(sensorInstance).toBeNull(); // if sensor is not supported on the device should we fail the test?

	});

	it("VT297-0075 | status getproperty synch for gyroscope after stop sensor |", function() {

		sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_GYROSCOPE);
		if (sensorInstance)
        {
          sensorInstance.start();	
          sensorInstance.stop();
	      myvar = sensorInstance.getProperty("status");
		  expect(myvar).toEqual("ready");
	    }
	    else
    	expect(sensorInstance).toBeNull(); // if sensor is not supported on the device should we fail the test?

	});

	it("VT297-0076 | status getproperty synch for ambientlight after stop sensor |", function() {

		sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_AMBIENT_LIGHT);
		if (sensorInstance)
        {
          sensorInstance.start();	
          sensorInstance.stop();
	      myvar = sensorInstance.getProperty("status");
		  expect(myvar).toEqual("ready");
	    }
	    else
    	expect(sensorInstance).toBeNull(); // if sensor is not supported on the device should we fail the test?

	});

	it("VT297-0077 | status getproperty synch for proximity after stop sensor |", function() {

		sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_PROXIMITY);
		if (sensorInstance)
        {
          sensorInstance.start();	
		  sensorInstance.stop();
	      myvar = sensorInstance.getProperty("status");
		  expect(myvar).toEqual("ready");
	    }
	    else
    	expect(sensorInstance).toBeNull(); // if sensor is not supported on the device should we fail the test?

	});


	it("VT297-0078 | status getproperty synch for proximitylongrange after stop sensor |", function() {

		sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_PROXIMITY_LONG_RANGE);
		if (sensorInstance)
        {
          sensorInstance.start();	
		  sensorInstance.stop();
	      myvar = sensorInstance.getProperty("status");
		  expect(myvar).toEqual("ready");
	    }
	    else
    	expect(sensorInstance).toBeNull(); // if sensor is not supported on the device should we fail the test?

	});


	it("VT297-0079 | status getproperty synch for pressure after stop sensor |", function() {

		sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_PRESSURE);
		if (sensorInstance)
        {
          sensorInstance.start();	
		  sensorInstance.stop();
	      myvar = sensorInstance.getProperty("status");
		  expect(myvar).toEqual("ready");
	    }
	    else
    	expect(sensorInstance).toBeNull(); // if sensor is not supported on the device should we fail the test?

	});


	it("VT297-0080 | status getproperty synch for temperature after stop sensor |", function() {

		sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_TEMPERATURE);
		if (sensorInstance)
        {
          sensorInstance.start();	
		  sensorInstance.stop();
	      myvar = sensorInstance.getProperty("status");
		  expect(myvar).toEqual("ready");
	    }
	    else
    	expect(sensorInstance).toBeNull(); // if sensor is not supported on the device should we fail the test?

	});


	it("VT297-0081 | status getproperty synch for humidity after stop sensor |", function() {

		sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_HUMIDITY);
		if (sensorInstance)
        {
          sensorInstance.start();	
		  sensorInstance.stop();
	      myvar = sensorInstance.getProperty("status");
		  expect(myvar).toEqual("ready");
	    }
	    else
    	expect(sensorInstance).toBeNull(); // if sensor is not supported on the device should we fail the test?

	});


	it("VT297-0082 | status getproperty synch for gravity after stop sensor |", function() {

		sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_GRAVITY);
		if (sensorInstance)
        {
          sensorInstance.start();	
		  sensorInstance.stop();
	      myvar = sensorInstance.getProperty("status");
		  expect(myvar).toEqual("ready");
	    }
	    else
    	expect(sensorInstance).toBeNull(); // if sensor is not supported on the device should we fail the test?

	});


	it("VT297-0083 | status getproperty synch for linearAcceleration after stop sensor |", function() {

		sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_LINEAR_ACCELERATION);
		if (sensorInstance)
        {
          sensorInstance.start();	
		  sensorInstance.stop();
	      myvar = sensorInstance.getProperty("status");
		  expect(myvar).toEqual("ready");
	    }
	    else
    	expect(sensorInstance).toBeNull(); // if sensor is not supported on the device should we fail the test?

	});


	it("VT297-0084 | status getproperty synch for rotation after stop sensor |", function() {

		sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_ROTATION);				
		if (sensorInstance)
        {
          sensorInstance.start();	
		  sensorInstance.stop();
	      myvar = sensorInstance.getProperty("status");
		  expect(myvar).toEqual("ready");
	    }
	    else
    	expect(sensorInstance).toBeNull(); // if sensor is not supported on the device should we fail the test?

	});


	it("VT297-0085 | status getproperty synch for orientation after stop sensor |", function() {

		sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_ORIENTATION);
		if (sensorInstance)
        {
          sensorInstance.start();	
		  sensorInstance.stop();
	      myvar = sensorInstance.getProperty("status");
		  expect(myvar).toEqual("ready");
	    }
	    else
    	expect(sensorInstance).toBeNull(); // if sensor is not supported on the device should we fail the test?

	});

	it("VT297-0086 | minimumGap getProperties before setting any value with synch for accelerometer |", function() {

		sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_ACCELEROMETER);
		if (sensorInstance)
        {
		  myvar = sensorInstance.getProperties(['minimumGap']);
		  expect(myvar.minimumGap).toEqual("200");
	    }
	    else
    	expect(sensorInstance).toBeNull(); // if sensor is not supported on the device should we fail the test?

	});


	it("VT297-0087 | minimumGap getProperties before setting any value with synch for deviceOrientation |", function() {

		sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_DEVICE_ORIENTATION);
		if (sensorInstance)
        {
		  myvar = sensorInstance.getProperties(['minimumGap']);
		  expect(myvar["minimumGap"]).toEqual("200");
	    }
	    else
    	expect(sensorInstance).toBeNull(); // if sensor is not supported on the device should we fail the test?

	});

	it("VT297-0088 | minimumGap getProperties before setting any value with synch for tiltangle |", function() {

		sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_TILT_ANGLE);
		if (sensorInstance)
        {
		  myvar = sensorInstance.getProperties(['minimumGap']);
		  expect(myvar["minimumGap"]).toEqual("200");
	    }
	    else
    	expect(sensorInstance).toBeNull(); // if sensor is not supported on the device should we fail the test?

	});

	it("VT297-0089 | minimumGap getProperties before setting any value with synch for motion |", function() {

		sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_MOTION);
		if (sensorInstance)
        {
		  myvar = sensorInstance.getProperties(['minimumGap']);
		  expect(myvar["minimumGap"]).toEqual("200");
	    }
	    else
    	expect(sensorInstance).toBeNull(); // if sensor is not supported on the device should we fail the test?

	});
	it("VT297-0090 | minimumGap getProperties before setting any value with synch for ecompass |", function() {

		sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_ECOMPASS);
		if (sensorInstance)
        {
		  myvar = sensorInstance.getProperties(['minimumGap']);
		  expect(myvar["minimumGap"]).toEqual("200");
	    }
	    else
    	expect(sensorInstance).toBeNull(); // if sensor is not supported on the device should we fail the test?

	});

	it("VT297-0091 | minimumGap getProperties before setting any value with synch for magnetometer |", function() {

		sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_MAGNETOMETER);
		if (sensorInstance)
        {
		  myvar = sensorInstance.getProperties(['minimumGap']);
		  expect(myvar["minimumGap"]).toEqual("200");
	    }
	    else
    	expect(sensorInstance).toBeNull(); // if sensor is not supported on the device should we fail the test?

	});

	it("VT297-0092 | minimumGap getProperties before setting any value with synch for gyroscope |", function() {

		sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_GYROSCOPE);
		if (sensorInstance)
        {
		  myvar = sensorInstance.getProperties(['minimumGap']);
		  expect(myvar["minimumGap"]).toEqual("200");
	    }
	    else
    	expect(sensorInstance).toBeNull(); // if sensor is not supported on the device should we fail the test?

	});

	it("VT297-0093 | minimumGap getProperties before setting any value with synch for ambientlight |", function() {

		sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_AMBIENT_LIGHT);
		if (sensorInstance)
        {
		  myvar = sensorInstance.getProperties(['minimumGap']);
		  expect(myvar["minimumGap"]).toEqual("200");
	    }
	    else
    	expect(sensorInstance).toBeNull(); // if sensor is not supported on the device should we fail the test?

	});

	it("VT297-0094 | minimumGap getProperties before setting any value with synch for proximity |", function() {

		sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_PROXIMITY);
		if (sensorInstance)
        {
		  myvar = sensorInstance.getProperties(['minimumGap']);
		  expect(myvar["minimumGap"]).toEqual("200");
	    }
	    else
    	expect(sensorInstance).toBeNull(); // if sensor is not supported on the device should we fail the test?

	});

	it("VT297-0095 | minimumGap getProperties before setting any value with synch for proximitylongrange |", function() {

		sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_PROXIMITY_LONG_RANGE);
		if (sensorInstance)
        {
		  myvar = sensorInstance.getProperties(['minimumGap']);
		  expect(myvar["minimumGap"]).toEqual("200");
	    }
	    else
    	expect(sensorInstance).toBeNull(); // if sensor is not supported on the device should we fail the test?

	});

	it("VT297-0096 | minimumGap getProperties before setting any value with synch for pressure |", function() {

		sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_PRESSURE);
		if (sensorInstance)
        {
		  myvar = sensorInstance.getProperties(['minimumGap']);
		  expect(myvar["minimumGap"]).toEqual("200");
	    }
	    else
    	expect(sensorInstance).toBeNull(); // if sensor is not supported on the device should we fail the test?

	});

	it("VT297-0097 | minimumGap getProperties before setting any value with synch for temperature |", function() {

		sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_TEMPERATURE);
		if (sensorInstance)
        {
		  myvar = sensorInstance.getProperties(['minimumGap']);
		  expect(myvar["minimumGap"]).toEqual("200");
	    }
	    else
    	expect(sensorInstance).toBeNull(); // if sensor is not supported on the device should we fail the test?

	});

	it("VT297-0098 | minimumGap getProperties before setting any value with synch for humidity |", function() {

		sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_HUMIDITY);
		if (sensorInstance)
        {
		  myvar = sensorInstance.getProperties(['minimumGap']);
		  expect(myvar["minimumGap"]).toEqual("200");
	    }
	    else
    	expect(sensorInstance).toBeNull(); // if sensor is not supported on the device should we fail the test?

	});

	it("VT297-0099 | minimumGap getProperties before setting any value with synch for gravity |", function() {

		sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_GRAVITY);
		if (sensorInstance)
        {
		  myvar = sensorInstance.getProperties(['minimumGap']);
		  expect(myvar["minimumGap"]).toEqual("200");
	    }
	    else
    	expect(sensorInstance).toBeNull(); // if sensor is not supported on the device should we fail the test?

	});

	it("VT297-0100 | minimumGap getProperties before setting any value with synch for linearAcceleration |", function() {

		sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_LINEAR_ACCELERATION);
		if (sensorInstance)
        {
		  myvar = sensorInstance.getProperties(['minimumGap']);
		  expect(myvar["minimumGap"]).toEqual("200");
	    }
	    else
    	expect(sensorInstance).toBeNull(); // if sensor is not supported on the device should we fail the test?

	});

	it("VT297-0101 | minimumGap getProperties before setting any value with synch for rotation |", function() {

		sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_ROTATION);
		if (sensorInstance)
        {
		  myvar = sensorInstance.getProperties(['minimumGap']);
		  expect(myvar["minimumGap"]).toEqual("200");
	    }
	    else
    	expect(sensorInstance).toBeNull(); // if sensor is not supported on the device should we fail the test?

	});

	it("VT297-0102 | minimumGap getProperties before setting any value with synch for orientation |", function() {

		sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_ORIENTATION);
		if (sensorInstance)
        {
		  myvar = sensorInstance.getProperties(['minimumGap']);
		  expect(myvar["minimumGap"]).toEqual("200");
	    }
	    else
    	expect(sensorInstance).toBeNull(); // if sensor is not supported on the device should we fail the test?

	});

	it("VT297-0103 | type getProperties before setting any value with synch for accelerometer |", function() {

		sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_ACCELEROMETER);
		if (sensorInstance)
        {
		  myvar = sensorInstance.getProperties(['type']);
		  expect(myvar["type"]).toEqual("Accelerometer");
	    }
	    else
    	expect(sensorInstance).toBeNull(); // if sensor is not supported on the device should we fail the test?

	});

	it("VT297-0104 | type getProperties before setting any value with synch for deviceOrientation |", function() {

		sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_DEVICE_ORIENTATION);
		if (sensorInstance)
        {
		  myvar = sensorInstance.getProperties(['type']);
		  expect(myvar["type"]).toEqual("DeviceOrientation");
	    }
	    else
    	expect(sensorInstance).toBeNull(); // if sensor is not supported on the device should we fail the test?

	});

	it("VT297-0105 | type getProperties before setting any value with synch for tiltangle |", function() {

		sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_TILT_ANGLE);
		if (sensorInstance)
        {
		  myvar = sensorInstance.getProperties(['type']);
		  expect(myvar["type"]).toEqual("TiltAngle");
	    }
	    else
    	expect(sensorInstance).toBeNull(); // if sensor is not supported on the device should we fail the test?

	});

	it("VT297-0106 | type getProperties before setting any value with synch for motion |", function() {

		sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_MOTION);
		if (sensorInstance)
        {
		  myvar = sensorInstance.getProperties(['type']);
		  expect(myvar["type"]).toEqual("Motion");
	    }
	    else
    	expect(sensorInstance).toBeNull(); // if sensor is not supported on the device should we fail the test?

	});

	it("VT297-0107 | type getProperties before setting any value with synch for ecompass |", function() {

		sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_ECOMPASS);
		if (sensorInstance)
        {
		  myvar = sensorInstance.getProperties(['type']);
		  expect(myvar["type"]).toEqual("ECompass");
	    }
	    else
    	expect(sensorInstance).toBeNull(); // if sensor is not supported on the device should we fail the test?

	});

	it("VT297-0108 | type getProperties before setting any value with synch for magnetometer |", function() {

		sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_MAGNETOMETER);
		if (sensorInstance)
        {
		  myvar = sensorInstance.getProperties(['type']);
		  expect(myvar["type"]).toEqual("Magnetometer");
	    }
	    else
    	expect(sensorInstance).toBeNull(); // if sensor is not supported on the device should we fail the test?

	});

	it("VT297-0109 | type getProperties before setting any value with synch for gyroscope |", function() {

		sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_GYROSCOPE);
		if (sensorInstance)
        {
		  myvar = sensorInstance.getProperties(['type']);
		  expect(myvar["type"]).toEqual("Gyroscope");
	    }
	    else
    	expect(sensorInstance).toBeNull(); // if sensor is not supported on the device should we fail the test?

	});

	it("VT297-0110 | type getProperties before setting any value with synch for ambientlight |", function() {

		sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_AMBIENT_LIGHT);
		if (sensorInstance)
        {
		  myvar = sensorInstance.getProperties(['type']);
		  expect(myvar["type"]).toEqual("AmbientLight");
	    }
	    else
    	expect(sensorInstance).toBeNull(); // if sensor is not supported on the device should we fail the test?

	});

	it("VT297-0111 | type getProperties before setting any value with synch for proximity |", function() {

		sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_PROXIMITY);
		if (sensorInstance)
        {
		  myvar = sensorInstance.getProperties(['type']);
		  expect(myvar["type"]).toEqual("Proximity");
	    }
	    else
    	expect(sensorInstance).toBeNull(); // if sensor is not supported on the device should we fail the test?

	});

	it("VT297-0112 | type getProperties before setting any value with synch for proximitylongrange |", function() {

		sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_PROXIMITY_LONG_RANGE);
		if (sensorInstance)
        {
		  myvar = sensorInstance.getProperties(['type']);
		  expect(myvar["type"]).toEqual("ProximityLongRange");
	    }
	    else
    	expect(sensorInstance).toBeNull(); // if sensor is not supported on the device should we fail the test?

	});

	it("VT297-0113 | type getProperties before setting any value with synch for pressure |", function() {

		sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_PRESSURE);
		if (sensorInstance)
        {
		  myvar = sensorInstance.getProperties(['type']);
		  expect(myvar["type"]).toEqual("Pressure");
	    }
	    else
    	expect(sensorInstance).toBeNull(); // if sensor is not supported on the device should we fail the test?

	});

	it("VT297-0114 | type getProperties before setting any value with synch for temperature |", function() {

		sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_TEMPERATURE);
		if (sensorInstance)
        {
		  myvar = sensorInstance.getProperties(['type']);
		  expect(myvar["type"]).toEqual("Temperature");
	    }
	    else
    	expect(sensorInstance).toBeNull(); // if sensor is not supported on the device should we fail the test?

	});

	it("VT297-0115 | type getProperties before setting any value with synch for humidity |", function() {

		sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_HUMIDITY);
		if (sensorInstance)
        {
		  myvar = sensorInstance.getProperties(['type']);
		  expect(myvar["type"]).toEqual("Humidity");
	    }
	    else
    	expect(sensorInstance).toBeNull(); // if sensor is not supported on the device should we fail the test?

	});

	it("VT297-0116 | type getProperties before setting any value with synch for gravity |", function() {

		sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_GRAVITY);
		if (sensorInstance)
        {
		  myvar = sensorInstance.getProperties(['type']);
		  expect(myvar["type"]).toEqual("Gravity");
	    }
	    else
    	expect(sensorInstance).toBeNull(); // if sensor is not supported on the device should we fail the test?

	});

	it("VT297-0117 | type getProperties before setting any value with synch for linearAcceleration |", function() {

		sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_LINEAR_ACCELERATION);
		if (sensorInstance)
        {
		  myvar = sensorInstance.getProperties(['type']);
		  expect(myvar["type"]).toEqual("LinearAcceleration");
	    }
	    else
    	expect(sensorInstance).toBeNull(); // if sensor is not supported on the device should we fail the test?

	});

	it("VT297-0118 | type getProperties before setting any value with synch for rotation |", function() {

		sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_ROTATION);
		if (sensorInstance)
        {
		  myvar = sensorInstance.getProperties(['type']);
		  expect(myvar["type"]).toEqual("Rotation");
	    }
	    else
    	expect(sensorInstance).toBeNull(); // if sensor is not supported on the device should we fail the test?

	});

	it("VT297-0119 | type getProperties before setting any value with synch for orientation |", function() {

		sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_ORIENTATION);
		if (sensorInstance)
        {
		  myvar = sensorInstance.getProperties(['type']);
		  expect(myvar["type"]).toEqual("Orientation");
	    }
	    else
    	expect(sensorInstance).toBeNull(); // if sensor is not supported on the device should we fail the test?

	});

	it("VT297-0120 | status getProperties synch for accelerometer before start sensor |", function() {

		sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_ACCELEROMETER);
		if (sensorInstance)
        {
		  myvar = sensorInstance.getProperties(['status']);
		  expect(myvar["status"]).toEqual("ready");
	    }
	    else
    	expect(sensorInstance).toBeNull(); // if sensor is not supported on the device should we fail the test?

	});

	it("VT297-0121 | status getProperties synch for deviceOrientation before start sensor |", function() {

		sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_DEVICE_ORIENTATION);
		if (sensorInstance)
        {
		  myvar = sensorInstance.getProperties(['status']);
		  expect(myvar["status"]).toEqual("ready");
	    }
	    else
    	expect(sensorInstance).toBeNull(); // if sensor is not supported on the device should we fail the test?

	});

	it("VT297-0122 | status getProperties synch for tiltangle before start sensor |", function() {

		sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_TILT_ANGLE);
		if (sensorInstance)
        {
		  myvar = sensorInstance.getProperties(['status']);
		  expect(myvar["status"]).toEqual("ready");
	    }
	    else
    	expect(sensorInstance).toBeNull(); // if sensor is not supported on the device should we fail the test?

	});

	it("VT297-0123 | status getProperties synch for motion before start sensor |", function() {

		sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_MOTION);
		if (sensorInstance)
        {
		  myvar = sensorInstance.getProperties(['status']);
		  expect(myvar["status"]).toEqual("ready");
	    }
	    else
    	expect(sensorInstance).toBeNull(); // if sensor is not supported on the device should we fail the test?

	});

	it("VT297-0124 | status getProperties synch for ecompass before start sensor |", function() {

		sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_ECOMPASS);
		if (sensorInstance)
        {
		  myvar = sensorInstance.getProperties(['status']);
		  expect(myvar["status"]).toEqual("ready");
	    }
	    else
    	expect(sensorInstance).toBeNull(); // if sensor is not supported on the device should we fail the test?

	});

	it("VT297-0125 | status getProperties synch for magnetometer before start sensor |", function() {

		sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_MAGNETOMETER);
		if (sensorInstance)
        {
		  myvar = sensorInstance.getProperties(['status']);
		  expect(myvar["status"]).toEqual("ready");
	    }
	    else
    	expect(sensorInstance).toBeNull(); // if sensor is not supported on the device should we fail the test?

	});

	it("VT297-0126 | status getProperties synch for gyroscope before start sensor |", function() {

		sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_GYROSCOPE);
		if (sensorInstance)
        {
		  myvar = sensorInstance.getProperties(['status']);
		  expect(myvar["status"]).toEqual("ready");
	    }
	    else
    	expect(sensorInstance).toBeNull(); // if sensor is not supported on the device should we fail the test?

	});

	it("VT297-0127 | status getProperties synch for ambientlight before start sensor |", function() {

		sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_AMBIENT_LIGHT);
		if (sensorInstance)
        {
		  myvar = sensorInstance.getProperties(['status']);
		  expect(myvar["status"]).toEqual("ready");
	    }
	    else
    	expect(sensorInstance).toBeNull(); // if sensor is not supported on the device should we fail the test?

	});

	it("VT297-0128 | status getProperties synch for proximity before start sensor |", function() {

		if (sensorInstance)
        {
		  myvar = sensorInstance.getProperties(['status']);
		  expect(myvar["status"]).toEqual("ready");
	    }
	    else
    	expect(sensorInstance).toBeNull(); // if sensor is not supported on the device should we fail the test?

	});

	it("VT297-0129 | status getProperties synch for proximitylongrange before start sensor |", function() {

		sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_PROXIMITY_LONG_RANGE);
		if (sensorInstance)
        {
		  myvar = sensorInstance.getProperties(['status']);
		  expect(myvar["status"]).toEqual("ready");
	    }
	    else
    	expect(sensorInstance).toBeNull(); // if sensor is not supported on the device should we fail the test?

	});

	it("VT297-0130 | status getProperties synch for pressure before start sensor |", function() {

		sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_PRESSURE);
		if (sensorInstance)
        {
		  myvar = sensorInstance.getProperties(['status']);
		  expect(myvar["status"]).toEqual("ready");
	    }
	    else
    	expect(sensorInstance).toBeNull(); // if sensor is not supported on the device should we fail the test?

	});

	it("VT297-0131 | status getProperties synch for temperature before start sensor |", function() {
		sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_TEMPERATURE);
		if (sensorInstance)
        {
		  myvar = sensorInstance.getProperties(['status']);
		  expect(myvar["status"]).toEqual("ready");
	    }
	    else
    	expect(sensorInstance).toBeNull(); // if sensor is not supported on the device should we fail the test?

	});

	it("VT297-0132 | status getProperties synch for humidity before start sensor |", function() {

		sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_HUMIDITY);
		if (sensorInstance)
        {
		  myvar = sensorInstance.getProperties(['status']);
		  expect(myvar["status"]).toEqual("ready");
	    }
	    else
    	expect(sensorInstance).toBeNull(); // if sensor is not supported on the device should we fail the test?

	});

	it("VT297-0133 | status getProperties synch for gravity before start sensor |", function() {

		sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_GRAVITY);
		if (sensorInstance)
        {
		  myvar = sensorInstance.getProperties(['status']);
		  expect(myvar["status"]).toEqual("ready");
	    }
	    else
    	expect(sensorInstance).toBeNull(); // if sensor is not supported on the device should we fail the test?

	});

	it("VT297-0134 | status getProperties synch for linearAcceleration before start sensor |", function() {

		sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_LINEAR_ACCELERATION);
		if (sensorInstance)
        {
		  myvar = sensorInstance.getProperties(['status']);
		  expect(myvar["status"]).toEqual("ready");
	    }
	    else
    	expect(sensorInstance).toBeNull(); // if sensor is not supported on the device should we fail the test?

	});

	it("VT297-0135 | status getProperties synch for rotation before start sensor |", function() {

		sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_ROTATION);
		if (sensorInstance)
        {
		  myvar = sensorInstance.getProperties(['status']);
		  expect(myvar["status"]).toEqual("ready");
	    }
	    else
    	expect(sensorInstance).toBeNull(); // if sensor is not supported on the device should we fail the test?

	});

	it("VT297-0136 | status getProperties synch for orientation before start sensor |", function() {

		sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_ORIENTATION);
		if (sensorInstance)
        {
		  myvar = sensorInstance.getProperties(['status']);
		  expect(myvar["status"]).toEqual("ready");
	    }
	    else
    	expect(sensorInstance).toBeNull(); // if sensor is not supported on the device should we fail the test?

	});

	it("VT297-0137 | status getProperties synch for accelerometer after start sensor |", function() {

		sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_ACCELEROMETER);
		if (sensorInstance)
        {
          sensorInstance.start();
		  myvar = sensorInstance.getProperties(['status']);
		  expect(myvar["status"]).toEqual("started");
	    }
	    else
    	expect(sensorInstance).toBeNull(); // if sensor is not supported on the device should we fail the test?

	});

	it("VT297-0138 | status getProperties synch for deviceOrientation after start sensor |", function() {

		sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_DEVICE_ORIENTATION);
		if (sensorInstance)
        {
          sensorInstance.start();
		  myvar = sensorInstance.getProperties(['status']);
		  expect(myvar["status"]).toEqual("started");
	    }
	    else
    	expect(sensorInstance).toBeNull(); // if sensor is not supported on the device should we fail the test?

	});

	it("VT297-0139 | status getProperties synch for tiltangle after start sensor |", function() {

		sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_TILT_ANGLE);
		if (sensorInstance)
        {
          sensorInstance.start();
		  myvar = sensorInstance.getProperties(['status']);
		  expect(myvar["status"]).toEqual("started");
	    }
	    else
    	expect(sensorInstance).toBeNull(); // if sensor is not supported on the device should we fail the test?

	});

	it("VT297-0140 | status getProperties synch for motion after start sensor |", function() {

		sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_MOTION);
		if (sensorInstance)
        {
          sensorInstance.start();
		  myvar = sensorInstance.getProperties(['status']);
		  expect(myvar["status"]).toEqual("started");
	    }
	    else
    	expect(sensorInstance).toBeNull(); // if sensor is not supported on the device should we fail the test?

	});

	it("VT297-0141 | status getProperties synch for ecompass after start sensor |", function() {

		sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_ECOMPASS);
		if (sensorInstance)
        {
          sensorInstance.start();
		  myvar = sensorInstance.getProperties(['status']);
		  expect(myvar["status"]).toEqual("started");
	    }
	    else
    	expect(sensorInstance).toBeNull(); // if sensor is not supported on the device should we fail the test?

	});

	it("VT297-0142 | status getProperties synch for magnetometer after start sensor |", function() {

		sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_MAGNETOMETER);
		if (sensorInstance)
        {
          sensorInstance.start();
		  myvar = sensorInstance.getProperties(['status']);
		  expect(myvar["status"]).toEqual("started");
	    }
	    else
    	expect(sensorInstance).toBeNull(); // if sensor is not supported on the device should we fail the test?

	});

	it("VT297-0143 | status getProperties synch for gyroscope after start sensor |", function() {

		sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_GYROSCOPE);
		if (sensorInstance)
        {
          sensorInstance.start();
		  myvar = sensorInstance.getProperties(['status']);
		  expect(myvar["status"]).toEqual("started");
	    }
	    else
    	expect(sensorInstance).toBeNull(); // if sensor is not supported on the device should we fail the test?

	});

	it("VT297-0144 | status getProperties synch for ambientlight after start sensor |", function() {

		sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_AMBIENT_LIGHT);
		if (sensorInstance)
        {
          sensorInstance.start();
		  myvar = sensorInstance.getProperties(['status']);
		  expect(myvar["status"]).toEqual("started");
	    }
	    else
    	expect(sensorInstance).toBeNull(); // if sensor is not supported on the device should we fail the test?

	});

	it("VT297-0145 | status getProperties synch for proximity after start sensor |", function() {

		sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_PROXIMITY);
		if (sensorInstance)
        {
          sensorInstance.start();
		  myvar = sensorInstance.getProperties(['status']);
		  expect(myvar["status"]).toEqual("started");
	    }
	    else
    	expect(sensorInstance).toBeNull(); // if sensor is not supported on the device should we fail the test?

	});

	it("VT297-0146 | status getProperties synch for proximitylongrange after start sensor |", function() {

		sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_PROXIMITY_LONG_RANGE);
		if (sensorInstance)
        {
          sensorInstance.start();
		  myvar = sensorInstance.getProperties(['status']);
		  expect(myvar["status"]).toEqual("started");
	    }
	    else
    	expect(sensorInstance).toBeNull(); // if sensor is not supported on the device should we fail the test?

	});

	it("VT297-0147 | status getProperties synch for pressure after start sensor |", function() {

		sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_PRESSURE);
		if (sensorInstance)
        {
          sensorInstance.start();
		  myvar = sensorInstance.getProperties(['status']);
		  expect(myvar["status"]).toEqual("started");
	    }
	    else
    	expect(sensorInstance).toBeNull(); // if sensor is not supported on the device should we fail the test?

	});

	it("VT297-0148 | status getProperties synch for temperature after start sensor |", function() {

		sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_TEMPERATURE);
		if (sensorInstance)
        {
          sensorInstance.start();
		  myvar = sensorInstance.getProperties(['status']);
		  expect(myvar["status"]).toEqual("started");
	    }
	    else
    	expect(sensorInstance).toBeNull(); // if sensor is not supported on the device should we fail the test?

	});

	it("VT297-0149 | status getProperties synch for humidity after start sensor |", function() {

		sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_HUMIDITY);
		if (sensorInstance)
        {
          sensorInstance.start();
		  myvar = sensorInstance.getProperties(['status']);
		  expect(myvar["status"]).toEqual("started");
	    }
	    else
    	expect(sensorInstance).toBeNull(); // if sensor is not supported on the device should we fail the test?

	});

	it("VT297-0150 | status getProperties synch for gravity after start sensor |", function() {

		sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_GRAVITY);
		if (sensorInstance)
        {
          sensorInstance.start();
		  myvar = sensorInstance.getProperties(['status']);
		  expect(myvar["status"]).toEqual("started");
	    }
	    else
    	expect(sensorInstance).toBeNull(); // if sensor is not supported on the device should we fail the test?

	});

	it("VT297-0151 | status getProperties synch for linearAcceleration after start sensor |", function() {

		sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_LINEAR_ACCELERATION);
		if (sensorInstance)
        {
          sensorInstance.start();
		  myvar = sensorInstance.getProperties(['status']);
		  expect(myvar["status"]).toEqual("started");
	    }
	    else
    	expect(sensorInstance).toBeNull(); // if sensor is not supported on the device should we fail the test?

	});

	it("VT297-0152 | status getProperties synch for rotation after start sensor |", function() {

		sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_ROTATION);				
		if (sensorInstance)
        {
          sensorInstance.start();
		  myvar = sensorInstance.getProperties(['status']);
		  expect(myvar["status"]).toEqual("started");
	    }
	    else
    	expect(sensorInstance).toBeNull(); // if sensor is not supported on the device should we fail the test?

	});

	it("VT297-0153 | status getProperties synch for orientation after start sensor |", function() {

		sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_ORIENTATION);
		if (sensorInstance)
        {
          sensorInstance.start();
		  myvar = sensorInstance.getProperties(['status']);
		  expect(myvar["status"]).toEqual("started");
	    }
	    else
    	expect(sensorInstance).toBeNull(); // if sensor is not supported on the device should we fail the test?

	});

	it("VT297-0154 | status getProperties synch for accelerometer after stop sensor |", function() {

		sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_ACCELEROMETER);
		if (sensorInstance)
        {
          sensorInstance.start();
          sensorInstance.stop();
		  myvar = sensorInstance.getProperties(['status']);
		  expect(myvar["status"]).toEqual("ready");
	    }
	    else
    	expect(sensorInstance).toBeNull(); // if sensor is not supported on the device should we fail the test?

	});

	it("VT297-0155 | status getProperties synch for deviceOrientation after stop sensor |", function() {

		sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_DEVICE_ORIENTATION);
		if (sensorInstance)
        {
          sensorInstance.start();
          sensorInstance.stop();
		  myvar = sensorInstance.getProperties(['status']);
		  expect(myvar["status"]).toEqual("ready");
	    }
	    else
    	expect(sensorInstance).toBeNull(); // if sensor is not supported on the device should we fail the test?

	});

	it("VT297-0156 | status getProperties synch for tiltangle after stop sensor |", function() {

		sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_TILT_ANGLE);
		if (sensorInstance)
        {
          sensorInstance.start();
          sensorInstance.stop();
		  myvar = sensorInstance.getProperties(['status']);
		  expect(myvar["status"]).toEqual("ready");
	    }
	    else
    	expect(sensorInstance).toBeNull(); // if sensor is not supported on the device should we fail the test?

	});

	it("VT297-0157 | status getProperties synch for motion after stop sensor |", function() {

		sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_MOTION);
		if (sensorInstance)
        {
          sensorInstance.start();
          sensorInstance.stop();
		  myvar = sensorInstance.getProperties(['status']);
		  expect(myvar["status"]).toEqual("ready");
	    }
	    else
    	expect(sensorInstance).toBeNull(); // if sensor is not supported on the device should we fail the test?

	});

	it("VT297-0158 | status getProperties synch for ecompass after stop sensor |", function() {

		sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_ECOMPASS);
		if (sensorInstance)
        {
          sensorInstance.start();
          sensorInstance.stop();
		  myvar = sensorInstance.getProperties(['status']);
		  expect(myvar["status"]).toEqual("ready");
	    }
	    else
    	expect(sensorInstance).toBeNull(); // if sensor is not supported on the device should we fail the test?

	});

	it("VT297-0159 | status getProperties synch for magnetometer after stop sensor |", function() {

		sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_MAGNETOMETER);
		if (sensorInstance)
        {
          sensorInstance.start();
          sensorInstance.stop();
		  myvar = sensorInstance.getProperties(['status']);
		  expect(myvar["status"]).toEqual("ready");
	    }
	    else
    	expect(sensorInstance).toBeNull(); // if sensor is not supported on the device should we fail the test?

	});

	it("VT297-0160 | status getProperties synch for gyroscope after stop sensor |", function() {

		sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_GYROSCOPE);
		if (sensorInstance)
        {
          sensorInstance.start();
          sensorInstance.stop();
		  myvar = sensorInstance.getProperties(['status']);
		  expect(myvar["status"]).toEqual("ready");
	    }
	    else
    	expect(sensorInstance).toBeNull(); // if sensor is not supported on the device should we fail the test?

	});

	it("VT297-0161 | status getProperties synch for ambientlight after stop sensor |", function() {

		sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_AMBIENT_LIGHT);
		if (sensorInstance)
        {
          sensorInstance.start();
          sensorInstance.stop();
		  myvar = sensorInstance.getProperties(['status']);
		  expect(myvar["status"]).toEqual("ready");
	    }
	    else
    	expect(sensorInstance).toBeNull(); // if sensor is not supported on the device should we fail the test?

	});

	it("VT297-0162 | status getProperties synch for proximity after stop sensor |", function() {

		sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_PROXIMITY);
		if (sensorInstance)
        {
          sensorInstance.start();
          sensorInstance.stop();
		  myvar = sensorInstance.getProperties(['status']);
		  expect(myvar["status"]).toEqual("ready");
	    }
	    else
    	expect(sensorInstance).toBeNull(); // if sensor is not supported on the device should we fail the test?

	});

	it("VT297-0163 | status getProperties synch for proximitylongrange after stop sensor |", function() {

		sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_PROXIMITY_LONG_RANGE);
		if (sensorInstance)
        {
          sensorInstance.start();
          sensorInstance.stop();
		  myvar = sensorInstance.getProperties(['status']);
		  expect(myvar["status"]).toEqual("ready");
	    }
	    else
    	expect(sensorInstance).toBeNull(); // if sensor is not supported on the device should we fail the test?

	});

	it("VT297-0164 | status getProperties synch for pressure after stop sensor |", function() {

		sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_PRESSURE);
		if (sensorInstance)
        {
          sensorInstance.start();
          sensorInstance.stop();
		  myvar = sensorInstance.getProperties(['status']);
		  expect(myvar["status"]).toEqual("ready");
	    }
	    else
    	expect(sensorInstance).toBeNull(); // if sensor is not supported on the device should we fail the test?

	});

	it("VT297-0165 | status getProperties synch for temperature after stop sensor |", function() {

		sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_TEMPERATURE);
		if (sensorInstance)
        {
          sensorInstance.start();
          sensorInstance.stop();
		  myvar = sensorInstance.getProperties(['status']);
		  expect(myvar["status"]).toEqual("ready");
	    }
	    else
    	expect(sensorInstance).toBeNull(); // if sensor is not supported on the device should we fail the test?

	});

	it("VT297-0166 | status getProperties synch for humidity after stop sensor |", function() {

		sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_HUMIDITY);
		if (sensorInstance)
        {
          sensorInstance.start();
          sensorInstance.stop();
		  myvar = sensorInstance.getProperties(['status']);
		  expect(myvar["status"]).toEqual("ready");
	    }
	    else
    	expect(sensorInstance).toBeNull(); // if sensor is not supported on the device should we fail the test?

	});

	it("VT297-0167 | status getProperties synch for gravity after stop sensor |", function() {

		sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_GRAVITY);
		if (sensorInstance)
        {
          sensorInstance.start();
          sensorInstance.stop();
		  myvar = sensorInstance.getProperties(['status']);
		  expect(myvar["status"]).toEqual("ready");
	    }
	    else
    	expect(sensorInstance).toBeNull(); // if sensor is not supported on the device should we fail the test?

	});

	it("VT297-0168 | status getProperties synch for linearAcceleration after stop sensor |", function() {

		sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_LINEAR_ACCELERATION);
		if (sensorInstance)
        {
          sensorInstance.start();
          sensorInstance.stop();
		  myvar = sensorInstance.getProperties(['status']);
		  expect(myvar["status"]).toEqual("ready");
	    }
	    else
    	expect(sensorInstance).toBeNull(); // if sensor is not supported on the device should we fail the test?

	});

	it("VT297-0169 | status getProperties synch for rotation after stop sensor |", function() {

		sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_ROTATION);				
		if (sensorInstance)
        {
          sensorInstance.start();
          sensorInstance.stop();
		  myvar = sensorInstance.getProperties(['status']);
		  expect(myvar["status"]).toEqual("ready");
	    }
	    else
    	expect(sensorInstance).toBeNull(); // if sensor is not supported on the device should we fail the test?

	});

	it("VT297-0170 | status getProperties synch for orientation after stop sensor |", function() {

		sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_ORIENTATION);
		if (sensorInstance)
        {
          sensorInstance.start();
          sensorInstance.stop();
		  myvar = sensorInstance.getProperties(['status']);
		  expect(myvar["status"]).toEqual("ready");
	    }
	    else
    	expect(sensorInstance).toBeNull(); // if sensor is not supported on the device should we fail the test?

	});

	it("VT297-0171 | setproperty minimumGap to 300 and  getProperty synch for accelerometer sensor |", function() {

		sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_ACCELEROMETER);
		if (sensorInstance)
        {
		  sensorInstance.setProperty("minimumGap","300");
		  myvar = sensorInstance.getProperty("minimumGap");
		  expect(myvar).toEqual("300");
	    }
	    else
    	expect(sensorInstance).toBeNull(); // if sensor is not supported on the device should we fail the test?

	});

	it("VT297-0172 | setproperty minimumGap to 100 and  getProperty synch for accelerometer sensor |", function() {

		sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_ACCELEROMETER);
		if (sensorInstance)
        {
		  sensorInstance.setProperty("minimumGap","100");
		  myvar = sensorInstance.getProperty("minimumGap");
		  expect(myvar).toEqual("200");
	    }
	    else
    	expect(sensorInstance).toBeNull(); // if sensor is not supported on the device should we fail the test?

	});

	it("VT297-0173 | setproperty minimumGap to 300 and  getProperty synch for deviceOrientation sensor |", function() {

		sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_DEVICE_ORIENTATION);
		if (sensorInstance)
        {
		  sensorInstance.setProperty("minimumGap","300");
		  myvar = sensorInstance.getProperty("minimumGap");
		  expect(myvar).toEqual("300");
	    }
	    else
    	expect(sensorInstance).toBeNull(); // if sensor is not supported on the device should we fail the test?

	});

	it("VT297-0174 | setproperty minimumGap to 100 and  getProperty synch for deviceOrientation sensor |", function() {

		sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_DEVICE_ORIENTATION);
		if (sensorInstance)
        {
		  sensorInstance.setProperty("minimumGap","100");
		  myvar = sensorInstance.getProperty("minimumGap");
		  expect(myvar).toEqual("200");
	    }
	    else
    	expect(sensorInstance).toBeNull(); // if sensor is not supported on the device should we fail the test?

	});

	it("VT297-0175 | setproperty minimumGap to 300 and  getProperty synch for tiltangle sensor |", function() {

		sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_TILT_ANGLE);
		if (sensorInstance)
        {
		  sensorInstance.setProperty("minimumGap","300");
		  myvar = sensorInstance.getProperty("minimumGap");
		  expect(myvar).toEqual("300");
	    }
	    else
    	expect(sensorInstance).toBeNull(); // if sensor is not supported on the device should we fail the test?

	});

	it("VT297-0176 | setproperty minimumGap to 100 and  getProperty synch for tiltangle sensor |", function() {

		sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_TILT_ANGLE);
		if (sensorInstance)
        {
		  sensorInstance.setProperty("minimumGap","100");
		  myvar = sensorInstance.getProperty("minimumGap");
		  expect(myvar).toEqual("200");
	    }
	    else
    	expect(sensorInstance).toBeNull(); // if sensor is not supported on the device should we fail the test?

	});

	it("VT297-0177 | setproperty minimumGap to 300 and  getProperty synch for motion sensor |", function() {

		sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_MOTION);
		if (sensorInstance)
        {
		  sensorInstance.setProperty("minimumGap","300");
		  myvar = sensorInstance.getProperty("minimumGap");
		  expect(myvar).toEqual("300");
	    }
	    else
    	expect(sensorInstance).toBeNull(); // if sensor is not supported on the device should we fail the test?

	});

	it("VT297-0178 | setproperty minimumGap to 100 and  getProperty synch for motion sensor |", function() {

		sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_MOTION);
		if (sensorInstance)
        {
		  sensorInstance.setProperty("minimumGap","100");
		  myvar = sensorInstance.getProperty("minimumGap");
		  expect(myvar).toEqual("200");
	    }
	    else
    	expect(sensorInstance).toBeNull(); // if sensor is not supported on the device should we fail the test?

	});

	it("VT297-0179 | setproperty minimumGap to 300 and  getProperty synch for ecompass sensor |", function() {

		sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_ECOMPASS);
		if (sensorInstance)
        {
		  sensorInstance.setProperty("minimumGap","300");
		  myvar = sensorInstance.getProperty("minimumGap");
		  expect(myvar).toEqual("300");
	    }
	    else
    	expect(sensorInstance).toBeNull(); // if sensor is not supported on the device should we fail the test?

	});

	it("VT297-0180 | setproperty minimumGap to 100 and  getProperty synch for ecompass sensor |", function() {

		sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_ECOMPASS);
		if (sensorInstance)
        {
		  sensorInstance.setProperty("minimumGap","100");
		  myvar = sensorInstance.getProperty("minimumGap");
		  expect(myvar).toEqual("200");
	    }
	    else
    	expect(sensorInstance).toBeNull(); // if sensor is not supported on the device should we fail the test?

	});

	it("VT297-0181 | setproperty minimumGap to 300 and  getProperty synch for magnetometer sensor |", function() {

		sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_MAGNETOMETER);
		if (sensorInstance)
        {
		  sensorInstance.setProperty("minimumGap","300");
		  myvar = sensorInstance.getProperty("minimumGap");
		  expect(myvar).toEqual("300");
	    }
	    else
    	expect(sensorInstance).toBeNull(); // if sensor is not supported on the device should we fail the test?

	});

	it("VT297-0182 | setproperty minimumGap to 100 and  getProperty synch for magnetometer sensor |", function() {

		sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_MAGNETOMETER);
		if (sensorInstance)
        {
		  sensorInstance.setProperty("minimumGap","100");
		  myvar = sensorInstance.getProperty("minimumGap");
		  expect(myvar).toEqual("200");
	    }
	    else
    	expect(sensorInstance).toBeNull(); // if sensor is not supported on the device should we fail the test?

	});

	it("VT297-0183 | setproperty minimumGap to 300 and  getProperty synch for gyroscope sensor |", function() {

		sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_GYROSCOPE);
		if (sensorInstance)
        {
		  sensorInstance.setProperty("minimumGap","300");
		  myvar = sensorInstance.getProperty("minimumGap");
		  expect(myvar).toEqual("300");
	    }
	    else
    	expect(sensorInstance).toBeNull(); // if sensor is not supported on the device should we fail the test?

	});

	it("VT297-0184 | setproperty minimumGap to 100 and  getProperty synch for gyroscope sensor |", function() {

		sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_GYROSCOPE);
		if (sensorInstance)
        {
		  sensorInstance.setProperty("minimumGap","100");
		  myvar = sensorInstance.getProperty("minimumGap");
		  expect(myvar).toEqual("200");
	    }
	    else
    	expect(sensorInstance).toBeNull(); // if sensor is not supported on the device should we fail the test?

	});

	it("VT297-0185 | setproperty minimumGap to 300 and  getProperty synch for ambientlight sensor |", function() {

		sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_AMBIENT_LIGHT);
		if (sensorInstance)
        {
		  sensorInstance.setProperty("minimumGap","300");
		  myvar = sensorInstance.getProperty("minimumGap");
		  expect(myvar).toEqual("300");
	    }
	    else
    	expect(sensorInstance).toBeNull(); // if sensor is not supported on the device should we fail the test?

	});

	it("VT297-0186 | setproperty minimumGap to 100 and  getProperty synch for ambientlight sensor |", function() {

		sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_AMBIENT_LIGHT);
		if (sensorInstance)
        {
		  sensorInstance.setProperty("minimumGap","100");
		  myvar = sensorInstance.getProperty("minimumGap");
		  expect(myvar).toEqual("200");
	    }
	    else
    	expect(sensorInstance).toBeNull(); // if sensor is not supported on the device should we fail the test?

	});

	it("VT297-0187 | setproperty minimumGap to 300 and  getProperty synch for proximity sensor |", function() {

		sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_PROXIMITY);
		if (sensorInstance)
        {
		  sensorInstance.setProperty("minimumGap","300");
		  myvar = sensorInstance.getProperty("minimumGap");
		  expect(myvar).toEqual("300");
	    }
	    else
    	expect(sensorInstance).toBeNull(); // if sensor is not supported on the device should we fail the test?

	});

	it("VT297-0188 | setproperty minimumGap to 100 and  getProperty synch for proximity sensor |", function() {

		sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_PROXIMITY);
		if (sensorInstance)
        {
		  sensorInstance.setProperty("minimumGap","100");
		  myvar = sensorInstance.getProperty("minimumGap");
		  expect(myvar).toEqual("200");
	    }
	    else
    	expect(sensorInstance).toBeNull(); // if sensor is not supported on the device should we fail the test?

	});

	it("VT297-0189 | setproperty minimumGap to 300 and  getProperty synch for proximitylongrange sensor |", function() {

		sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_PROXIMITY_LONG_RANGE);
		if (sensorInstance)
        {
		  sensorInstance.setProperty("minimumGap","300");
		  myvar = sensorInstance.getProperty("minimumGap");
		  expect(myvar).toEqual("300");
	    }
	    else
    	expect(sensorInstance).toBeNull(); // if sensor is not supported on the device should we fail the test?

	});

	it("VT297-0190 | setproperty minimumGap to 100 and  getProperty synch for proximitylongrange sensor |", function() {

		sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_PROXIMITY_LONG_RANGE);
		if (sensorInstance)
        {
		  sensorInstance.setProperty("minimumGap","100");
		  myvar = sensorInstance.getProperty("minimumGap");
		  expect(myvar).toEqual("200");
	    }
	    else
    	expect(sensorInstance).toBeNull(); // if sensor is not supported on the device should we fail the test?

	});

	it("VT297-0191 | setproperty minimumGap to 300 and  getProperty synch for pressure sensor |", function() {

		sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_PRESSURE);
		if (sensorInstance)
        {
		  sensorInstance.setProperty("minimumGap","300");
		  myvar = sensorInstance.getProperty("minimumGap");
		  expect(myvar).toEqual("300");
	    }
	    else
    	expect(sensorInstance).toBeNull(); // if sensor is not supported on the device should we fail the test?

	});

	it("VT297-0192 | setproperty minimumGap to 100 and  getProperty synch for pressure sensor |", function() {

		sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_PRESSURE);
		if (sensorInstance)
        {
		  sensorInstance.setProperty("minimumGap","100");
		  myvar = sensorInstance.getProperty("minimumGap");
		  expect(myvar).toEqual("200");
	    }
	    else
    	expect(sensorInstance).toBeNull(); // if sensor is not supported on the device should we fail the test?

	});

	it("VT297-0193 | setproperty minimumGap to 300 and  getProperty synch for temperature sensor |", function() {

		sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_TEMPERATURE);
		if (sensorInstance)
        {
		  sensorInstance.setProperty("minimumGap","300");
		  myvar = sensorInstance.getProperty("minimumGap");
		  expect(myvar).toEqual("300");
	    }
	    else
    	expect(sensorInstance).toBeNull(); // if sensor is not supported on the device should we fail the test?

	});

	it("VT297-0194 | setproperty minimumGap to 100 and  getProperty synch for temperature sensor |", function() {

		sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_TEMPERATURE);
		if (sensorInstance)
        {
		  sensorInstance.setProperty("minimumGap","100");
		  myvar = sensorInstance.getProperty("minimumGap");
		  expect(myvar).toEqual("200");
	    }
	    else
    	expect(sensorInstance).toBeNull(); // if sensor is not supported on the device should we fail the test?

	});

	it("VT297-0195 | setproperty minimumGap to 300 and  getProperty synch for humidity sensor |", function() {

		sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_HUMIDITY);
		if (sensorInstance)
        {
		  sensorInstance.setProperty("minimumGap","300");
		  myvar = sensorInstance.getProperty("minimumGap");
		  expect(myvar).toEqual("300");
	    }
	    else
    	expect(sensorInstance).toBeNull(); // if sensor is not supported on the device should we fail the test?

	});

	it("VT297-0196 | setproperty minimumGap to 100 and  getProperty synch for humidity sensor |", function() {

		sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_HUMIDITY);
		if (sensorInstance)
        {
		  sensorInstance.setProperty("minimumGap","100");
		  myvar = sensorInstance.getProperty("minimumGap");
		  expect(myvar).toEqual("200");
	    }
	    else
    	expect(sensorInstance).toBeNull(); // if sensor is not supported on the device should we fail the test?

	});

	it("VT297-0197 | setproperty minimumGap to 300 and  getProperty synch for gravity sensor |", function() {

		sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_GRAVITY);
		if (sensorInstance)
        {
		  sensorInstance.setProperty("minimumGap","300");
		  myvar = sensorInstance.getProperty("minimumGap");
		  expect(myvar).toEqual("300");
	    }
	    else
    	expect(sensorInstance).toBeNull(); // if sensor is not supported on the device should we fail the test?

	});

	it("VT297-0198 | setproperty minimumGap to 100 and  getProperty synch for gravity sensor |", function() {

		sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_GRAVITY);
		if (sensorInstance)
        {
		  sensorInstance.setProperty("minimumGap","100");
		  myvar = sensorInstance.getProperty("minimumGap");
		  expect(myvar).toEqual("200");
	    }
	    else
    	expect(sensorInstance).toBeNull(); // if sensor is not supported on the device should we fail the test?

	});

	it("VT297-0199 | setproperty minimumGap to 300 and  getProperty synch for linearAcceleration sensor |", function() {

		sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_LINEAR_ACCELERATION);
		if (sensorInstance)
        {
		  sensorInstance.setProperty("minimumGap","300");
		  myvar = sensorInstance.getProperty("minimumGap");
		  expect(myvar).toEqual("300");
	    }
	    else
    	expect(sensorInstance).toBeNull(); // if sensor is not supported on the device should we fail the test?

	});

	it("VT297-0200 | setproperty minimumGap to 100 and  getProperty synch for linearAcceleration sensor |", function() {

		sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_LINEAR_ACCELERATION);
		if (sensorInstance)
        {
		  sensorInstance.setProperty("minimumGap","100");
		  myvar = sensorInstance.getProperty("minimumGap");
		  expect(myvar).toEqual("200");
	    }
	    else
    	expect(sensorInstance).toBeNull(); // if sensor is not supported on the device should we fail the test?

	});

	it("VT297-0201 | setproperty minimumGap to 300 and  getProperty synch for rotation sensor |", function() {

		sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_ROTATION);
		if (sensorInstance)
        {
		  sensorInstance.setProperty("minimumGap","300");
		  myvar = sensorInstance.getProperty("minimumGap");
		  expect(myvar).toEqual("300");
	    }
	    else
    	expect(sensorInstance).toBeNull(); // if sensor is not supported on the device should we fail the test?

	});

	it("VT297-0202 | setproperty minimumGap to 100 and  getProperty synch for rotation sensor |", function() {

		sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_ROTATION);
		if (sensorInstance)
        {
		  sensorInstance.setProperty("minimumGap","100");
		  myvar = sensorInstance.getProperty("minimumGap");
		  expect(myvar).toEqual("200");
	    }
	    else
    	expect(sensorInstance).toBeNull(); // if sensor is not supported on the device should we fail the test?

	});

	it("VT297-0203 | setproperty minimumGap to 300 and  getProperty synch for orientation sensor |", function() {

		sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_ORIENTATION);
		if (sensorInstance)
        {
		  sensorInstance.setProperty("minimumGap","300");
		  myvar = sensorInstance.getProperty("minimumGap");
		  expect(myvar).toEqual("300");
	    }
	    else
    	expect(sensorInstance).toBeNull(); // if sensor is not supported on the device should we fail the test?

	});

	it("VT297-0204 | setproperty minimumGap to 100 and  getProperty synch for orientation sensor |", function() {

		sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_ORIENTATION);
		if (sensorInstance)
        {
		  sensorInstance.setProperty("minimumGap","100");
		  myvar = sensorInstance.getProperty("minimumGap");
		  expect(myvar).toEqual("200");
	    }
	    else
    	expect(sensorInstance).toBeNull(); // if sensor is not supported on the device should we fail the test?

	});

	it("VT297-0205 | setProperties minimumGap to 300 and  getProperties synch for accelerometer sensor |", function() {

		sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_ACCELEROMETER);
		if (sensorInstance)
        {
           var setProps = {
        			        "minimumGap" : "300"
        			      };
		  sensorInstance.setProperties(setProps);
		  myvar = JSON.stringify(sensorInstance.getProperties(['minimumGap']));
		  expect(myvar).toContain("300");
	    }
	    else
    	expect(sensorInstance).toBeNull(); // if sensor is not supported on the device should we fail the test?

	});

	it("VT297-0206 | setProperties minimumGap to 100 and  getProperties synch for accelerometer sensor |", function() {

		sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_ACCELEROMETER);
		if (sensorInstance)
        {
           var setProps = {
        			        minimumGap : "100"
        			      };
		  sensorInstance.setProperties(setProps);
		  myvar = JSON.stringify(sensorInstance.getProperties(['minimumGap']));
		  expect(myvar).toContain("200");
	    }
	    else
    	expect(sensorInstance).toBeNull(); // if sensor is not supported on the device should we fail the test?

	});

	it("VT297-0207 | setProperties minimumGap to 300 and  getProperties synch for deviceOrientation sensor |", function() {

		sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_DEVICE_ORIENTATION);
		if (sensorInstance)
        {
           var setProps = {
        			        minimumGap : "300"
        			      };
		  sensorInstance.setProperties(setProps);
		  myvar = JSON.stringify(sensorInstance.getProperties(['minimumGap']));
		  expect(myvar).toContain("300");
	    }
	    else
    	expect(sensorInstance).toBeNull(); // if sensor is not supported on the device should we fail the test?

	});

	it("VT297-0208 | setProperties minimumGap to 100 and  getProperties synch for deviceOrientation sensor |", function() {

		sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_DEVICE_ORIENTATION);
		if (sensorInstance)
        {
           var setProps = {
        			        minimumGap : "100"
        			      };
		  sensorInstance.setProperties(setProps);
		  myvar = JSON.stringify(sensorInstance.getProperties(['minimumGap']));
		  expect(myvar).toContain("200");
	    }
	    else
    	expect(sensorInstance).toBeNull(); // if sensor is not supported on the device should we fail the test?

	});

	it("VT297-0209 | setProperties minimumGap to 300 and  getProperties synch for tiltangle sensor |", function() {

		sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_TILT_ANGLE);
		if (sensorInstance)
        {
           var setProps = {
        			        minimumGap : "300"
        			      };
		  sensorInstance.setProperties(setProps);
		  myvar = JSON.stringify(sensorInstance.getProperties(['minimumGap']));
		  expect(myvar).toContain("300");
	    }
	    else
    	expect(sensorInstance).toBeNull(); // if sensor is not supported on the device should we fail the test?

	});

	it("VT297-0210 | setProperties minimumGap to 100 and  getProperties synch for tiltangle sensor |", function() {

		sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_TILT_ANGLE);
		if (sensorInstance)
        {
           var setProps = {
        			        minimumGap : "100"
        			      };
		  sensorInstance.setProperties(setProps);
		  myvar = JSON.stringify(sensorInstance.getProperties(['minimumGap']));
		  expect(myvar).toContain("200");
	    }
	    else
    	expect(sensorInstance).toBeNull(); // if sensor is not supported on the device should we fail the test?

	});

	it("VT297-0211 | setProperties minimumGap to 300 and  getProperties synch for motion sensor |", function() {

		sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_MOTION);
		if (sensorInstance)
        {
           var setProps = {
        			        minimumGap : "300"
        			      };
		  sensorInstance.setProperties(setProps);
		  myvar = JSON.stringify(sensorInstance.getProperties(['minimumGap']));
		  expect(myvar).toContain("300");
	    }
	    else
    	expect(sensorInstance).toBeNull(); // if sensor is not supported on the device should we fail the test?

	});

	it("VT297-0212 | setProperties minimumGap to 100 and  getProperties synch for motion sensor |", function() {

		sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_MOTION);
		if (sensorInstance)
        {
           var setProps = {
        			        minimumGap : "100"
        			      };
		  sensorInstance.setProperties(setProps);
		  myvar = JSON.stringify(sensorInstance.getProperties(['minimumGap']));
		  expect(myvar).toContain("200");
	    }
	    else
    	expect(sensorInstance).toBeNull(); // if sensor is not supported on the device should we fail the test?

	});

	it("VT297-0213 | setProperties minimumGap to 300 and  getProperties synch for ecompass sensor |", function() {

		sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_ECOMPASS);
		if (sensorInstance)
        {
           var setProps = {
        			        minimumGap : "300"
        			      };
		  sensorInstance.setProperties(setProps);
		  myvar = JSON.stringify(sensorInstance.getProperties(['minimumGap']));
		  expect(myvar).toContain("300");
	    }
	    else
    	expect(sensorInstance).toBeNull(); // if sensor is not supported on the device should we fail the test?

	});

	it("VT297-0214 | setProperties minimumGap to 100 and  getProperties synch for ecompass sensor |", function() {

		sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_ECOMPASS);
		if (sensorInstance)
        {
           var setProps = {
        			        minimumGap : "100"
        			      };
		  sensorInstance.setProperties(setProps);
		  myvar = JSON.stringify(sensorInstance.getProperties(['minimumGap']));
		  expect(myvar).toContain("200");
	    }
	    else
    	expect(sensorInstance).toBeNull(); // if sensor is not supported on the device should we fail the test?

	});

	it("VT297-0215 | setProperties minimumGap to 300 and  getProperties synch for magnetometer sensor |", function() {

		sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_MAGNETOMETER);
		if (sensorInstance)
        {
           var setProps = {
        			        minimumGap : "300"
        			      };
		  sensorInstance.setProperties(setProps);
		  myvar = JSON.stringify(sensorInstance.getProperties(['minimumGap']));
		  expect(myvar).toContain("300");
	    }
	    else
    	expect(sensorInstance).toBeNull(); // if sensor is not supported on the device should we fail the test?

	});

	it("VT297-0216 | setProperties minimumGap to 100 and  getProperties synch for magnetometer sensor |", function() {

		sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_MAGNETOMETER);
		if (sensorInstance)
        {
           var setProps = {
        			        minimumGap : "100"
        			      };
		  sensorInstance.setProperties(setProps);
		  myvar = JSON.stringify(sensorInstance.getProperties(['minimumGap']));
		  expect(myvar).toContain("200");
	    }
	    else
    	expect(sensorInstance).toBeNull(); // if sensor is not supported on the device should we fail the test?

	});

	it("VT297-0217 | setProperties minimumGap to 300 and  getProperties synch for gyroscope sensor |", function() {

		sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_GYROSCOPE);
		if (sensorInstance)
        {
           var setProps = {
        			        minimumGap : "300"
        			      };
		  sensorInstance.setProperties(setProps);
		  myvar = JSON.stringify(sensorInstance.getProperties(['minimumGap']));
		  expect(myvar).toContain("300");
	    }
	    else
    	expect(sensorInstance).toBeNull(); // if sensor is not supported on the device should we fail the test?

	});

	it("VT297-0216 | setProperties minimumGap to 100 and  getProperties synch for gyroscope sensor |", function() {

		sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_GYROSCOPE);
		if (sensorInstance)
        {
           var setProps = {
        			        minimumGap : "100"
        			      };
		  sensorInstance.setProperties(setProps);
		  myvar = JSON.stringify(sensorInstance.getProperties(['minimumGap']));
		  expect(myvar).toContain("200");
	    }
	    else
    	expect(sensorInstance).toBeNull(); // if sensor is not supported on the device should we fail the test?

	});

	it("VT297-0219 | setProperties minimumGap to 300 and  getProperties synch for eambientlighte sensor |", function() {

		sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_AMBIENT_LIGHT);
		if (sensorInstance)
        {
           var setProps = {
        			        minimumGap : "300"
        			      };
		  sensorInstance.setProperties(setProps);
		  myvar = JSON.stringify(sensorInstance.getProperties(['minimumGap']));
		  expect(myvar).toContain("300");
	    }
	    else
    	expect(sensorInstance).toBeNull(); // if sensor is not supported on the device should we fail the test?

	});

	it("VT297-0220 | setProperties minimumGap to 100 and  getProperties synch for eambientlighte sensor |", function() {

		sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_AMBIENT_LIGHT);
		if (sensorInstance)
        {
           var setProps = {
        			        minimumGap : "100"
        			      };
		  sensorInstance.setProperties(setProps);
		  myvar = JSON.stringify(sensorInstance.getProperties(['minimumGap']));
		  expect(myvar).toContain("200");
	    }
	    else
    	expect(sensorInstance).toBeNull(); // if sensor is not supported on the device should we fail the test?

	});

	it("VT297-0221 | setProperties minimumGap to 300 and  getProperties synch for proximity sensor |", function() {

		sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_PROXIMITY);
		if (sensorInstance)
        {
           var setProps = {
        			        minimumGap : "300"
        			      };
		  sensorInstance.setProperties(setProps);
		  myvar = JSON.stringify(sensorInstance.getProperties(['minimumGap']));
		  expect(myvar).toContain("300");
	    }
	    else
    	expect(sensorInstance).toBeNull(); // if sensor is not supported on the device should we fail the test?

	});

	it("VT297-0222 | setProperties minimumGap to 100 and  getProperties synch for proximity sensor |", function() {

		sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_PROXIMITY);
		if (sensorInstance)
        {
           var setProps = {
        			        minimumGap : "100"
        			      };
		  sensorInstance.setProperties(setProps);
		  myvar = JSON.stringify(sensorInstance.getProperties(['minimumGap']));
		  expect(myvar).toContain("200");
	    }
	    else
    	expect(sensorInstance).toBeNull(); // if sensor is not supported on the device should we fail the test?

	});
	
	it("VT297-0223 | setProperties minimumGap to 300 and  getProperties synch for proximitylongrange sensor |", function() {

		sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_PROXIMITY_LONG_RANGE);
		if (sensorInstance)
        {
           var setProps = {
        			        minimumGap : "300"
        			      };
		  sensorInstance.setProperties(setProps);
		  myvar = JSON.stringify(sensorInstance.getProperties(['minimumGap']));
		  expect(myvar).toContain("300");
	    }
	    else
    	expect(sensorInstance).toBeNull(); // if sensor is not supported on the device should we fail the test?

	});

	it("VT297-0224 | setProperties minimumGap to 100 and  getProperties synch for proximitylongrange sensor |", function() {

		sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_PROXIMITY_LONG_RANGE);
		if (sensorInstance)
        {
           var setProps = {
        			        minimumGap : "100"
        			      };
		  sensorInstance.setProperties(setProps);
		  myvar = JSON.stringify(sensorInstance.getProperties(['minimumGap']));
		  expect(myvar).toContain("200");
	    }
	    else
    	expect(sensorInstance).toBeNull(); // if sensor is not supported on the device should we fail the test?

	});

	it("VT297-0225 | setProperties minimumGap to 300 and  getProperties synch for pressure sensor |", function() {

		sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_PRESSURE);
		if (sensorInstance)
        {
           var setProps = {
        			        minimumGap : "300"
        			      };
		  sensorInstance.setProperties(setProps);
		  myvar = JSON.stringify(sensorInstance.getProperties(['minimumGap']));
		  expect(myvar).toContain("300");
	    }
	    else
    	expect(sensorInstance).toBeNull(); // if sensor is not supported on the device should we fail the test?

	});

	it("VT297-0226 | setProperties minimumGap to 100 and  getProperties synch for pressure sensor |", function() {

		sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_PRESSURE);
		if (sensorInstance)
        {
           var setProps = {
        			        minimumGap : "100"
        			      };
		  sensorInstance.setProperties(setProps);
		  myvar = JSON.stringify(sensorInstance.getProperties(['minimumGap']));
		  expect(myvar).toContain("200");
	    }
	    else
    	expect(sensorInstance).toBeNull(); // if sensor is not supported on the device should we fail the test?

	});

	it("VT297-0227 | setProperties minimumGap to 300 and  getProperties synch for temperature sensor |", function() {

		sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_TEMPERATURE);
		if (sensorInstance)
        {
           var setProps = {
        			        minimumGap : "300"
        			      };
		  sensorInstance.setProperties(setProps);
		  myvar = JSON.stringify(sensorInstance.getProperties(['minimumGap']));
		  expect(myvar).toContain("300");
	    }
	    else
    	expect(sensorInstance).toBeNull(); // if sensor is not supported on the device should we fail the test?

	});

	it("VT297-0228 | setProperties minimumGap to 100 and  getProperties synch for temperature sensor |", function() {

		sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_TEMPERATURE);
		if (sensorInstance)
        {
           var setProps = {
        			        minimumGap : "100"
        			      };
		  sensorInstance.setProperties(setProps);
		  myvar = JSON.stringify(sensorInstance.getProperties(['minimumGap']));
		  expect(myvar).toContain("200");
	    }
	    else
    	expect(sensorInstance).toBeNull(); // if sensor is not supported on the device should we fail the test?

	});

	it("VT297-0229 | setProperties minimumGap to 300 and  getProperties synch for humidity sensor |", function() {

		sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_HUMIDITY);
		if (sensorInstance)
        {
           var setProps = {
        			        minimumGap : "300"
        			      };
		  sensorInstance.setProperties(setProps);
		  myvar = JSON.stringify(sensorInstance.getProperties(['minimumGap']));
		  expect(myvar).toContain("300");
	    }
	    else
    	expect(sensorInstance).toBeNull(); // if sensor is not supported on the device should we fail the test?

	});

	it("VT297-0230 | setProperties minimumGap to 100 and  getProperties synch for humidity sensor |", function() {

		sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_HUMIDITY);
		if (sensorInstance)
        {
           var setProps = {
        			        minimumGap : "100"
        			      };
		  sensorInstance.setProperties(setProps);
		  myvar = JSON.stringify(sensorInstance.getProperties(['minimumGap']));
		  expect(myvar).toContain("200");
	    }
	    else
    	expect(sensorInstance).toBeNull(); // if sensor is not supported on the device should we fail the test?

	});

	it("VT297-0231 | setProperties minimumGap to 300 and  getProperties synch for gravity sensor |", function() {

		sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_GRAVITY);
		if (sensorInstance)
        {
           var setProps = {
        			        minimumGap : "300"
        			      };
		  sensorInstance.setProperties(setProps);
		  myvar = JSON.stringify(sensorInstance.getProperties(['minimumGap']));
		  expect(myvar).toContain("300");
	    }
	    else
    	expect(sensorInstance).toBeNull(); // if sensor is not supported on the device should we fail the test?

	});

	it("VT297-0232 | setProperties minimumGap to 100 and  getProperties synch for gravity sensor |", function() {

		sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_GRAVITY);
		if (sensorInstance)
        {
           var setProps = {
        			        minimumGap : "100"
        			      };
		  sensorInstance.setProperties(setProps);
		  myvar = JSON.stringify(sensorInstance.getProperties(['minimumGap']));
		  expect(myvar).toContain("200");
	    }
	    else
    	expect(sensorInstance).toBeNull(); // if sensor is not supported on the device should we fail the test?

	});

	it("VT297-0233 | setProperties minimumGap to 300 and  getProperties synch for linearAcceleration sensor |", function() {

		sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_LINEAR_ACCELERATION);
		if (sensorInstance)
        {
           var setProps = {
        			        minimumGap : "300"
        			      };
		  sensorInstance.setProperties(setProps);
		  myvar = JSON.stringify(sensorInstance.getProperties(['minimumGap']));
		  expect(myvar).toContain("300");
	    }
	    else
    	expect(sensorInstance).toBeNull(); // if sensor is not supported on the device should we fail the test?

	});

	it("VT297-0234 | setProperties minimumGap to 100 and  getProperties synch for linearAcceleration sensor |", function() {

		sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_LINEAR_ACCELERATION);
		if (sensorInstance)
        {
           var setProps = {
        			        minimumGap : "100"
        			      };
		  sensorInstance.setProperties(setProps);
		  myvar = JSON.stringify(sensorInstance.getProperties(['minimumGap']));
		  expect(myvar).toContain("200");
	    }
	    else
    	expect(sensorInstance).toBeNull(); // if sensor is not supported on the device should we fail the test?

	});

	it("VT297-0235 | setProperties minimumGap to 300 and  getProperties synch for rotation sensor |", function() {

		sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_ROTATION);
		if (sensorInstance)
        {
           var setProps = {
        			        minimumGap : "300"
        			      };
		  sensorInstance.setProperties(setProps);
		  myvar = JSON.stringify(sensorInstance.getProperties(['minimumGap']));
		  expect(myvar).toContain("300");
	    }
	    else
    	expect(sensorInstance).toBeNull(); // if sensor is not supported on the device should we fail the test?

	});

	it("VT297-0236 | setProperties minimumGap to 100 and  getProperties synch for rotation sensor |", function() {

		sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_ROTATION);
		if (sensorInstance)
        {
           var setProps = {
        			        minimumGap : "100"
        			      };
		  sensorInstance.setProperties(setProps);
		  myvar = JSON.stringify(sensorInstance.getProperties(['minimumGap']));
		  expect(myvar).toContain("200");
	    }
	    else
    	expect(sensorInstance).toBeNull(); // if sensor is not supported on the device should we fail the test?

	});

	it("VT297-0237 | setProperties minimumGap to 300 and  getProperties synch for orientation sensor |", function() {

		sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_ORIENTATION);
		if (sensorInstance)
        {
           var setProps = {
        			        minimumGap : "300"
        			      };
		  sensorInstance.setProperties(setProps);
		  myvar = JSON.stringify(sensorInstance.getProperties(['minimumGap']));
		  expect(myvar).toContain("300");
	    }
	    else
    	expect(sensorInstance).toBeNull(); // if sensor is not supported on the device should we fail the test?

	});

	it("VT297-0238 | setProperties minimumGap to 100 and  getProperties synch for orientation sensor |", function() {

		sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_ORIENTATION);
		if (sensorInstance)
        {
           var setProps = {
        			        minimumGap : "100"
        			      };
		  sensorInstance.setProperties(setProps);
		  myvar = JSON.stringify(sensorInstance.getProperties(['minimumGap']));
		  expect(myvar).toContain("200");
	    }
	    else
    	expect(sensorInstance).toBeNull(); // if sensor is not supported on the device should we fail the test?

	});

	it("VT297-0239 | minimumGap getproperty with asynch for Accelerometer |", function() {
		runs(function()
		{
			sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_ACCELEROMETER);
		    if (sensorInstance)
              	sensorInstance.getProperty("minimumGap", getproperty_callback);
		    else
    			expect(sensorInstance).toBeNull(); // if sensor is not supported on the device should we fail the test?			
		});

		waitsFor(function () {
			
            return (getresult != null);            
        }, 'The Accelerometer coordinates should display', 3000);

		runs(function()
		{
			if (sensorInstance)
				expect(getresult).toEqual("200");
			else
    			expect(sensorInstance).toBeNull(); // if sensor is not supported on the device should we fail the test?
		});

	});

	it("VT297-0240 | getProperty ananymous for accelerometer sensor |", function() {
		runs(function()
		{
			sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_ACCELEROMETER);
		    if (sensorInstance)
            {
		     	sensorInstance.getProperty("minimumGap",function (args){	
				getresult = args;
			    });
			 }   
			else
    			expect(sensorInstance).toBeNull(); // if sensor is not supported on the device should we fail the test?			
		
		});

		waitsFor(function()
		{
			return (getresult != null);
		}, "Property value not returned via callback", 3000);

		runs(function()
		{
			if (sensorInstance)
				expect(getresult).toEqual("200");
			else
    			expect(sensorInstance).toBeNull(); // if sensor is not supported on the device should we fail the test?			
		});

	});

	it("VT297-0241 | getProperties asynch for accelerometer sensor |", function() {
		runs(function()
		{
			sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_ACCELEROMETER);
		    if (sensorInstance)
		    {		    	
               	sensorInstance.getProperties(['minimumGap'],getproperties_callback);
            }
		    else
    			expect(sensorInstance).toBeNull(); // if sensor is not supported on the device should we fail the test?						
		});

		waitsFor(function () {
			if (sensorInstance)
            	return (getpropresult != null);
            else
            	return true;
        }, 'The Accelerometer coordinates should display', 5000);

		runs(function()
		{
			if (sensorInstance)
				expect(getpropresult['minimumGap']).toEqual("200");
		    else
    			expect(sensorInstance).toBeNull(); // if sensor is not supported on the device should we fail the test?			
		});

	});

	it("VT297-0242 | getProperties for accelerometer sensor with ananymous |", function() {
		runs(function()
		{
			sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_ACCELEROMETER);
		    if (sensorInstance)
            {
		     	sensorInstance.getProperties(['minimumGap'],function (args)
		     	{	
					getpropresult = args;
				});
		    }
						
		});

		waitsFor(function () {
			if (sensorInstance)
            	return (getpropresult != null);
            else
            	return true;
        }, 'The Accelerometer coordinates should display', 5000);

		runs(function()
		{
			if (sensorInstance)
				expect(getpropresult['minimumGap']).toEqual("200");
		    else
    			expect(sensorInstance).toBeNull(); // if sensor is not supported on the device should we fail the test?			
		});


	});

	it("VT297-0243 | set minimumGap to 300 through set property and getProperty asynch for accelerometer sensor |", function() {
		runs(function()
		{
			sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_ACCELEROMETER);
		    if (sensorInstance)
            {
		     	sensorInstance.setProperty("minimumGap","300");
		     	sensorInstance.getProperty("minimumGap",getproperty_callback);
		   	}
		    else
    			expect(sensorInstance).toBeNull();			
		});

		waitsFor(function () {
			if (sensorInstance)
            	return (getresult != null);
            else
            	return true;

        }, 'The Accelerometer coordinates should display', 5000);

		runs(function()
		{
			if (sensorInstance)
				expect(getresult).toEqual("300");
			else
    			expect(sensorInstance).toBeNull(); // if sensor is not supported on the device should we fail the test?			
		});

	});

	it("VT297-0244 | set minimumGap to 500 through set property and getProperty ananymous for accelerometer sensor |", function() {
		runs(function()
		{
			sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_ACCELEROMETER);
		    if (sensorInstance)
            {
		     	sensorInstance.setProperty("minimumGap","500");
		     	sensorInstance.getProperty("minimumGap",function (args){	
				getresult = args//JSON.stringify(args);
			    });
			}
		});

		waitsFor(function () {
			if (sensorInstance)
            	return (getresult != null);
            else
            	return true;
        }, 'The Accelerometer coordinates should display', 5000);

		runs(function()
		{
			if (sensorInstance)
				expect(getresult).toEqual("500");
			else
    		 	expect(sensorInstance).toBeNull(); // if sensor is not supported on the device should we fail the test?
		});

	});

	it("VT297-0245 | set minimumGap to 400 through set properties and getProperties asynch for accelerometer sensor |", function() {
		runs(function()
		{
			sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_ACCELEROMETER);
		    if (sensorInstance)
            {
                var setProps = {
        			            minimumGap : "400"
        			           };
		   	 	sensorInstance.setProperties(setProps);
		     	sensorInstance.getProperties(['minimumGap'],getproperties_callback);
		    }
		});

		waitsFor(function () {
			if (sensorInstance)
            	return (getpropresult != null);
            else
            	return true;
        }, 'The Accelerometer coordinates should display', 5000);


		runs(function()
		{
			if (sensorInstance)
				expect(getpropresult['minimumGap']).toEqual("400");
		    else
    			expect(sensorInstance).toBeNull(); // if sensor is not supported on the device should we fail the test?			
		});

	});

	it("VT297-0246 | set minimumGap to 700 through set properties and getProperties ananymous for accelerometer sensor |", function() {
		runs(function()
		{
			sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_ACCELEROMETER);
		    if (sensorInstance)
            {
                var setProps = {
        			            minimumGap : "700"
        			           };
		   	 	sensorInstance.setProperties(setProps);
		     	sensorInstance.getProperties(['minimumGap'],function (args){	
					getpropresult = args;
			    });
		    }
		});

		waitsFor(function () {
			if (sensorInstance)
            	return (getpropresult != null);
            else
            	return true;
        }, 'The Accelerometer coordinates should display', 5000);

		runs(function()
		{
			if (sensorInstance)
				expect(getpropresult['minimumGap']).toEqual("700");
		    else
    			expect(sensorInstance).toBeNull(); // if sensor is not supported on the device should we fail the test?			
		});

	});

	it("VT297-0247 | set minimumGap to 800 directly without using any setProperty |", function() {
		sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_ACCELEROMETER);
	    if (sensorInstance)
        {
	   	 	sensorInstance.minimumGap = 800;
	     	//myvar = sensorInstance.getProperty("minimumGap");
			expect(sensorInstance.minimumGap).toEqual(800);
		}

		else
		expect(sensorInstance).toBeNull(); // if sensor is not supported on the device should we fail the test?			

	});

	it("VT297-0248 | set minimumGap to 900 directly without using any using any setProperty |", function() {
		sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_ACCELEROMETER);
	    if (sensorInstance)
        {
	   	 	sensorInstance.minimumGap = 900;
	     	//myvar = sensorInstance.getProperty("minimumGap");
			expect(sensorInstance.minimumGap).toEqual(900);
		}		
		else
			expect(sensorInstance).toBeNull(); // if sensor is not supported on the device should we fail the test?	

	});

	it("VT297-0249 | getAllProperties for accelerometer with asynch callback |", function() {
		runs(function() {
			sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_ACCELEROMETER);
			if (sensorInstance)
			{
				sensorInstance.getAllProperties(getallproperties_callback);
			}			
		});

		waitsFor(function () {
			if (sensorInstance)
            	return (getallpropresult != null);
            else
            	return true;
        }, 'The Accelerometer coordinates should display', 5000);

		runs(function()
		{
			if (sensorInstance)
			{	
				expect(getallpropresult["minimumGap"]).toEqual("200");
				expect(getallpropresult["status"]).toEqual("ready");
				expect(getallpropresult["type"]).toEqual("Accelerometer");
			}
			else
				expect(sensorInstance).toBeNull(); 
		});


	});

	it("VT297-0250 | getAllProperties for accelerometer with synch |", function() {

		sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_ACCELEROMETER);
        if (sensorInstance)
        {
           sensorInstance.start();
           myvar = sensorInstance.getAllProperties();
           expect(myvar["minimumGap"]).toEqual("200");
           expect(myvar["status"]).toEqual("started");
           expect(myvar["type"]).toEqual("Accelerometer");
        }
	    else
	    	expect(sensorInstance).toBeNull();
	});

	it("VT297-0251 | getAllProperties for accelerometer with ananymous |", function() {
	    runs(function () {
        	sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_ACCELEROMETER);
            if (sensorInstance)
            {
               	sensorInstance.getAllProperties(function (args){	
					getallpropresult = args;
				    displayResult("Output: ", getallpropresult);
				});              
            }            
        });

        waitsFor(function () {
        	if (sensorInstance)
            	return (getallpropresult != null);
            else
            	return true;
        }, 'The Accelerometer coordinates should display', 5000);

         runs(function () {
         	if (sensorInstance)
            {
				expect(getallpropresult["minimumGap"]).toEqual("200");
				expect(getallpropresult["status"]).toEqual("ready");
				expect(getallpropresult["type"]).toEqual("Accelerometer");
		    }
		    else
    			expect(sensorInstance).toBeNull();	
        });

	});

	/*it("VT297-0252 | makeSensorByType to get Return the new accelerometer sensor object by type with asynch |", function() {
	    runs(function () {
       	 	Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_ACCELEROMETER, function(args) {
                sensorType = args;
                displayResult("Output: ",sensorType);
            });
        });

		waitsFor(function () {
            return (sensorType != null);
        }, 'No Accelerometer sinstance available', 5000);        

        runs(function() {

        	if (sensorType)
            {
               	sensorType.getProperty("type", getproperty_callback);          
            }
        });

		waitsFor(function () {
			if (sensorType)
            	return (getresult != null);
            else
            	return true;
        }, 'The Accelerometer coordinates should display', 5000);

         runs(function () {
         	if (sensorType)
         	{	
				expect(getresult).toEqual("Accelerometer");
			}
			else
    			expect(sensorType).toBeNull();	
			
        });

	});

	it("VT297-0253 | makeSensorByType to get Return the new accelerometer sensor object by type with ananymous callback |", function() {
	    runs(function () {
	        Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_ACCELEROMETER, function (args) {	
				sensorType = args;
			    displayResult("Output: ",sensorType);
			});
            
        });

        waitsFor(function () {
            return (sensorType != null);
        }, 'No Accelerometer sinstance available', 5000);

        runs(function() {

        	if (sensorType)
            {
               	sensorType.getProperty("type", getproperty_callback);          
            }
        });

        waitsFor(function () {
            if (sensorType)
            	return (getresult != null);
            else
            	return true;
        }, 'The Accelerometer coordinates should display', 5000);

        runs(function () {
         	if (sensorType)
         	{	
				expect(getresult).toEqual("Accelerometer");
			}
			else
    			expect(sensorType).toBeNull();	
		});

	});*/


	it("VT297-0254 | setProperty MinimumGap to 0 and call getproperty |", function() {
		sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_ACCELEROMETER);
		if (sensorInstance)
        {
        	sensorInstance.setProperty("minimumGap","0");
			myvar = sensorInstance.getProperty("minimumGap");
			expect(myvar).toEqual("200");
			//expect(sensorInstance.getProperty("status")).toEqual("started");
	    }
		else
	    	expect(sensorInstance).toBeNull();

	});

	it("VT297-0255 | makeSensorByType to get Return the new Accelerometer sensor object by type  |", function() {
        sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_ACCELEROMETER);
		if (sensorInstance)
        {
			expect(sensorInstance.type).toMatch("Accelerometer");
        }           
        else
	    	expect(sensorInstance).toBeNull();

	});

	it("VT297-0256 | readData for Accelerometer before start to get read current sensor data |", function() {
		runs(function () {
	        sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_ACCELEROMETER);
	        if (sensorInstance)
	        {
	            setTimeout(accelerometerdata_display, 3000);
	        }
        });

        waitsFor(function () {
        	if (sensorInstance)
            	return (getstatus != null);
            else
            	return true;
        }, 'The Accelerometer coordinates should display', 20000);

        runs(function () {
        	if(sensorInstance)
        	    expect(getstatus).toMatch("error");
        	else
	    	    expect(sensorInstance).toBeNull();	
	        
        }); 
	});
	
	it("VT297-0257 | start to enable the Accelerometer sensor data retrieval with asych callback |", function() {
        runs(function () {
            sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_ACCELEROMETER);
            if (sensorInstance)
            {
                sensorInstance.minimumGap = 5000;                
                sensorInstance.start(accelerometer_callback);
            }
            
        });

        waitsFor(function () {
        	if (sensorInstance)
            	return (eventsRcvd >=  3);
            else
            	return true;
        }, 'The Accelerometer coordinates should display', 20000);

        runs(function () {
        	if (sensorInstance)
            	expect(eventsRcvd).toBeGreaterThan(2);
            else
	    	    expect(sensorInstance).toBeNull();	
        });

	});

	it("VT297-0258 | readData for Accelerometer after start to get read current sensor data |", function() {
        runs(function () {

            sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_ACCELEROMETER);
            if (sensorInstance)
            {
                sensorInstance.start();  
                setTimeout(accelerometerdata_display, 3000);
            }            
        });

        waitsFor(function () {
        	if (sensorInstance)
            	return (getstatus != null);
            else
            	return true;
        }, 'The Accelerometer coordinates should display', 20000);

        runs(function () {
        	if(sensorInstance)
        	{
        		if ("ANDROID" == deviceOS)
        			expect(getstatus).toMatch("error"); // read data on android will always reurn error
        		else     	        	
                	expect(getstatus).toMatch("ok");
            }
            else
	    	    expect(sensorInstance).toBeNull();	
	        
        }); 
	});

	/*it("VT297-0259 | stop to Stop listening to the Accelerometer sensor |", function() {
        runs(function () {
 
                setTimeout(accelerometerdata_display, 3000);
        });

        waitsFor(function () {
            return (getstatus != null);
        }, 'The Accelerometer coordinates should display', 20000);

        runs(function () {

	    	    expect(sensorInstance).toBeNull();	
        });
	});*/

	it("VT297-0260 | makeSensorByType to get Return the new DeviceOrientation sensor object by type  |", function() {
            sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_DEVICE_ORIENTATION);
            if (sensorInstance)
            {
            	expect(sensorInstance.type).toMatch("DeviceOrientation");
            }
            else
	    		expect(sensorInstance).toBeNull();
	    	
	});

	it("VT297-0265 | makeSensorByType to get Return the new TiltAngle sensor object by type  |", function() {
            sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_TILT_ANGLE);
            if (sensorInstance)
            {
           	 	expect(sensorInstance.type).toMatch("TiltAngle");
            }
            else
	    		expect(sensorInstance).toBeNull();
			    
	});

	it("VT297-0266 | readData for TiltAngle before start to get read current sensor data |", function() {
        runs(function () {

            sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_TILT_ANGLE);
            if (sensorInstance)
            {
                setTimeout(tiltangledata_display, 3000);
            }          
			
        });

        waitsFor(function () {
        	if (sensorInstance)
            	return (getstatus != null);
            else
            	return true;
        }, 'The Accelerometer coordinates should display', 20000);

        runs(function () {
			if (sensorInstance)
			{	
            	expect(getstatus).toMatch("error");
            }
            else
	    		expect(sensorInstance).toBeNull();
	        
        }); 
	});
	
	it("VT297-0267 | start to enable the TiltAngle sensor data retrieval with asych callback |", function() {
        runs(function () {
            sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_TILT_ANGLE);
            if (sensorInstance)
            {
                sensorInstance.minimumGap = 5000;                
                sensorInstance.start(tiltangle_callback);
            }            
        });

        waitsFor(function () {
        	if (sensorInstance)
            	return (eventsRcvd >=  3);
            else
            	return true;
        }, 'The Accelerometer coordinates should display', 20000);

        runs(function () {
        	if (sensorInstance)
            	expect(eventsRcvd).toBeGreaterThan(2);
            else
	    	    expect(sensorInstance).toBeNull();
        });

	});

	it("VT297-0268 | readData for TiltAngle after start to get read current sensor data |", function() {
        runs(function () {

            sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_TILT_ANGLE);
            if (sensorInstance)
            {
                sensorInstance.start();  
                setTimeout(tiltangledata_display, 3000);
            }
            
        });

        waitsFor(function () {
        	if (sensorInstance)
            	return (getstatus != null);
            else
            	return true;
        }, 'The Accelerometer coordinates should display', 20000);

        runs(function () {
        	if (sensorInstance)
        	{
        		if ("ANDROID" == deviceOS)
        			expect(getstatus).toMatch("error"); // read data on android will always reurn error
        		else     	        	
                	expect(getstatus).toMatch("ok");
            }
            else
	    		expect(sensorInstance).toBeNull();
	        
        }); 
	});

	it("VT297-0269 | stop to Stop listening to the TiltAngle sensor |", function() {
        runs(function () {
        	sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_TILT_ANGLE);
        	if (sensorInstance)
                setTimeout(tiltangledata_display, 3000);

        });

        waitsFor(function () {
        	if (sensorInstance)
            	return (getstatus != null);
            else
            	return true;
        }, 'The Accelerometer coordinates should display', 20000);

        runs(function () {
        	if (sensorInstance)
            	expect(getstatus).toMatch("error");
            else
            	expect(sensorInstance).toBeNull();
        });
	});

	it("VT297-0270 | makeSensorByType to get Return the new Motion sensor object by type  |", function() {
            sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_MOTION);
             if (sensorInstance)
			{
				expect(sensorInstance.type).toMatch("Motion");
            }
            else
	    		expect(sensorInstance).toBeNull();
	        
	});

	it("VT297-0275 | makeSensorByType to get Return the new ECompass sensor object by type  |", function() {
            sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_ECOMPASS);
            if (sensorInstance)
			{
            	expect(sensorInstance.type).toMatch("ECompass");
            }
            else
	    		expect(sensorInstance).toBeNull();
	        
	});

	it("VT297-0276 | readData for ECompass before start to get read current sensor data |", function() {
        runs(function () {

            sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_ECOMPASS);
            if (sensorInstance)
            {
                setTimeout(ecompassdata_display, 3000);
            }            
	        
        });

        waitsFor(function () {
        	if (sensorInstance)
            	return (getstatus != null);
            else
            	return true;
        }, 'The Accelerometer coordinates should display', 20000);

        runs(function () {
        	if (sensorInstance)
			{
            	expect(getstatus).toMatch("error");
            }
            else
	    		expect(sensorInstance).toBeNull();
	        
        }); 
	});
	
	it("VT297-0277 | start to enable the ECompass sensor data retrieval with asych callback |", function() {
        runs(function () {
            sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_ECOMPASS);
            if (sensorInstance)
            {
                sensorInstance.minimumGap = 5000;                
                sensorInstance.start(ecompass_callback);
            }
        });

        waitsFor(function () {
        	if (sensorInstance)
            	return (eventsRcvd >=  3);
            else
            	return true;
        }, 'The Accelerometer coordinates should display', 20000);

        runs(function () {
        	if (sensorInstance)
            {
               expect(eventsRcvd).toBeGreaterThan(2);
            }
            else
                expect(sensorInstance).toBeNull();
                 
        });

	});

	it("VT297-0278 | readData for ECompass after start to get read current sensor data |", function() {
        runs(function () {

            sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_ECOMPASS);
            if (sensorInstance)
            {
                sensorInstance.start();  
                setTimeout(ecompassdata_display, 3000);
            }            
        });

        waitsFor(function () {
        	if (sensorInstance)
            	return (getstatus != null);
            else
            	return true;
        }, 'The Accelerometer coordinates should display', 20000);

        runs(function () {
            if (sensorInstance)
            {
            	expect(getstatus).toMatch("ok");
            }
             else
	    		expect(sensorInstance).toBeNull();
	    	
        }); 
	});

	it("VT297-0279 | stop to Stop listening to the ECompass sensor |", function() {
        runs(function () {
        	sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_ECOMPASS);
        	if (sensorInstance)
               setTimeout(ecompassdata_display, 3000);
        });

        waitsFor(function () {
        	if (sensorInstance)
            	return (getstatus != null);
            else
            	return true;
        }, 'The Accelerometer coordinates should display', 20000);

        runs(function () {
        	if (sensorInstance)
            	expect(getstatus).toMatch("error");
            else
            	expect(sensorInstance).toBeNull();
        });
	});

	it("VT297-0280 | makeSensorByType to get Return the new Magnetometer sensor object by type  |", function() {
            sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_MAGNETOMETER);
            if (sensorInstance)
            {
             	expect(sensorInstance.type).toMatch("Magnetometer");
            }
            else
	         	expect(sensorInstance).toBeNull();
	         
	});

	it("VT297-0281 | readData for Magnetometer before start to get read current sensor data |", function() {
        runs(function () {

            sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_MAGNETOMETER);
            if (sensorInstance)
            {
                setTimeout(magnetometerdata_display, 3000);
            }

        });

        waitsFor(function () {
        	if (sensorInstance)
            	return (getstatus != null);
            else
            	return true;
        }, 'The Accelerometer coordinates should display', 20000);

        runs(function () {
            if (sensorInstance)
            {
            	expect(getstatus).toMatch("error");
            }
             else
	    		expect(sensorInstance).toBeNull();

        });
	});

	it("VT297-0282 | start to enable the Magnetometer sensor data retrieval with asych callback |", function() {
        runs(function () {
            sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_MAGNETOMETER);
            if (sensorInstance)
            {
                sensorInstance.minimumGap = 5000;                
                sensorInstance.start(magnetometer_callback);
            }            
        });

        waitsFor(function () {
        	if (sensorInstance)
            	return (eventsRcvd >=  3);
            else
            	return true;
        }, 'The Accelerometer coordinates should display', 20000);

        runs(function () {
        	if (sensorInstance)
            	expect(eventsRcvd).toBeGreaterThan(2);
            else
            	expect(sensorInstance).toBeNull();
        });

	});

	it("VT297-0283 | readData for Magnetometer after start to get read current sensor data |", function() {
        runs(function () {

            sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_MAGNETOMETER);
            if (sensorInstance)
            {
                sensorInstance.start();  
                setTimeout(magnetometerdata_display, 3000);
            }            
        });

        waitsFor(function () {
        	if (sensorInstance)
            	return (getstatus != null);
            else
            	return true;
        }, 'The Accelerometer coordinates should display', 20000);

        runs(function () {
            if (sensorInstance)
            {
        		if ("ANDROID" == deviceOS)
        			expect(getstatus).toMatch("error"); // read data on android will always reurn error
        		else     	        	
                	expect(getstatus).toMatch("ok");
            }
            else
	    		expect(sensorInstance).toBeNull();	    	
        }); 
	});

	it("VT297-0284 | stop to Stop listening to the Magnetometer sensor |", function() {
        runs(function () {
    		sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_MAGNETOMETER);
    		if (sensorInstance)
            	setTimeout(magnetometerdata_display, 3000);
        });

        waitsFor(function () {
        	if (sensorInstance)
            	return (getstatus != null);
            else
            	return true;
        }, 'The Accelerometer coordinates should display', 20000);

        runs(function () {

        	if (sensorInstance)
            	expect(getstatus).toMatch("error");
            else
            	expect(sensorInstance).toBeNull();

        });
	});

	it("VT297-0285 | makeSensorByType to get Return the new Gyroscope sensor object by type  |", function() {
			sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_GYROSCOPE);
            if (sensorInstance)
            { 
            	expect(sensorInstance.type).toMatch("Gyroscope");
            }
            else
	    		expect(sensorInstance).toBeNull();
	    	
	});

	it("VT297-0286 | readData for Gyroscope before start to get read current sensor data |", function() {
        runs(function () {

            sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_GYROSCOPE);
            if (sensorInstance)
            {
                setTimeout(gyroscopedata_display, 3000);
            }            
	    	
        });

        waitsFor(function () {
        	if (sensorInstance)
            	return (getstatus != null);
            else
            	return true;
        }, 'The Accelerometer coordinates should display', 20000);

        runs(function () {
        	if (sensorInstance)
            {
            	expect(getstatus).toMatch("error");
            }
            else
	    		expect(sensorInstance).toBeNull();
	    	
        }); 
	});
	
	it("VT297-0287 | start to enable the Gyroscope sensor data retrieval with asych callback |", function() {
        runs(function () {
            sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_GYROSCOPE);
            if (sensorInstance)
            {
                sensorInstance.minimumGap = 5000;                
                sensorInstance.start(gyroscope_callback);
            }

        });

        waitsFor(function () {
        	if (sensorInstance)
            	return (eventsRcvd >=  3);
            else
            	return true;
        }, 'The Accelerometer coordinates should display', 20000);

        runs(function () {
        	if (sensorInstance)
            	expect(eventsRcvd).toBeGreaterThan(2);
            else
            	expect(sensorInstance).toBeNull();
        });

	});

	it("VT297-0288 | readData for Gyroscope after start to get read current sensor data |", function() {
        runs(function () {

            sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_GYROSCOPE);
            if (sensorInstance)
            {
                sensorInstance.start();  
                setTimeout(gyroscopedata_display, 3000);
            }
        });

        waitsFor(function () {
        	if (sensorInstance)
            	return (getstatus != null);
            else
            	return true;
        }, 'The Accelerometer coordinates should display', 20000);

        runs(function () {
            if (sensorInstance)
            {            	
	    		if ("ANDROID" == deviceOS)
	    			expect(getstatus).toMatch("error"); // read data on android will always reurn error
	    		else     	        	
	            	expect(getstatus).toMatch("ok");            
            }
            else
	    		expect(sensorInstance).toBeNull();
	    	
        }); 
	});

	it("VT297-0289 | stop to Stop listening to the Gyroscope sensor |", function() {
        runs(function () {
        	sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_GYROSCOPE);
        	if (sensorInstance)				
	        	setTimeout(gyroscopedata_display, 3000);

        });

        waitsFor(function () {
        	if (sensorInstance)
            	return (getstatus != null);
            else
            	return true;
        }, 'The Gyroscope coordinates should display', 20000);

        runs(function () {
        	if (sensorInstance)
            	expect(getstatus).toMatch("error");
            else
  				expect(sensorInstance).toBeNull();  				
        });
	});

	it("VT297-0290 | makeSensorByType to get Return the new AmbientLight sensor object by type  |", function() {
            sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_AMBIENT_LIGHT);
            if (sensorInstance)
            {    
               expect(sensorInstance.type).toMatch("AmbientLight");
            }
            else
            	 expect(sensorInstance).toBeNull();
            	   
	});

	it("VT297-0295 | makeSensorByType to get Return the new Proximity sensor object by type  |", function() {
            sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_PROXIMITY);
            if (sensorInstance)
            {    
            	expect(sensorInstance.type).toMatch("Proximity");
            }
            else
            	 expect(sensorInstance).toBeNull();
            	 
	});

	it("VT297-0300 | makeSensorByType to get Return the new ProximityLongRange sensor object by type  |", function() {
            sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_PROXIMITY_LONG_RANGE);
            if (sensorInstance)
            {   
            	expect(sensorInstance.type).toMatch("ProximityLongRange");
            }
            else
            	 expect(sensorInstance).toBeNull();
            	
	});

	it("VT297-0305 | makeSensorByType to get Return the new Pressure sensor object by type  |", function() {
            sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_PRESSURE);
            if (sensorInstance)
            {   
                   expect(sensorInstance.type).toMatch("Pressure");
    		}
    		else 
    		  	   expect(sensorInstance).toBeNull();  
            
	});

	it("VT297-0310 | makeSensorByType to get Return the new Temperature sensor object by type  |", function() {
            sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_TEMPERATURE);
            if (sensorInstance)
            {   
            	   expect(sensorInstance.type).toMatch("Temperature");
    		}
    		else 
    		  	   expect(sensorInstance).toBeNull();  
            
	});

	it("VT297-0311 | readData for Temperature before start to get read current sensor data |", function() {
        runs(function () {

            sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_TEMPERATURE);
            if (sensorInstance)
            {
                setTimeout(temperaturedata_display, 3000);           
            }
    		  	
        });

        waitsFor(function () {
        	if (sensorInstance)
            	return (getstatus != null);
            else
            	return true;
        }, 'The Accelerometer coordinates should display', 20000);

        runs(function () {
        	if (sensorInstance)
            {
            		expect(getstatus).toMatch("error");
            }
            else 
    		  	   expect(sensorInstance).toBeNull();  
            
        }); 
	});
	
	it("VT297-0312 | start to enable the Temperature sensor data retrieval with asych callback |", function() {
        runs(function () {
            sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_TEMPERATURE);
            if (sensorInstance)
            {
                sensorInstance.minimumGap = 5000;                
                sensorInstance.start(temperature_callback);
            }
        });

        waitsFor(function () {
        	if (sensorInstance)
            	return (eventsRcvd >=  3);
            else
            	return true;
        }, 'The Accelerometer coordinates should display', 20000);

        runs(function () {
        	if (sensorInstance)
            	expect(eventsRcvd).toBeGreaterThan(2);
            else
            	expect(sensorInstance).toBeNull();  
        });

	});

	it("VT297-0313 | readData for Temperature after start to get read current sensor data |", function() {
        runs(function () {

            sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_TEMPERATURE);
            if (sensorInstance)
            {
                sensorInstance.start();  
                setTimeout(temperaturedata_display, 3000);
            }  
        });

        waitsFor(function () {
        	if (sensorInstance)
            	return (getstatus != null);
            else
            	return true;
        }, 'The Accelerometer coordinates should display', 20000);

        runs(function () {
        	if (sensorInstance)
            {
        		if ("ANDROID" == deviceOS)
        			expect(getstatus).toMatch("error"); // read data on android will always reurn error
        		else     	        	
                	expect(getstatus).toMatch("ok");
            }
            else 
    		   expect(sensorInstance).toBeNull();  
            
        }); 
	});

	it("VT297-0314 | stop to Stop listening to the Temperature sensor |", function() {
        runs(function () {

        	sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_TEMPERATURE);
        	if (sensorInstance) 
                setTimeout(temperaturedata_display, 3000);
        });

        waitsFor(function () {
        	if (sensorInstance)
            	return (getstatus != null);
            else
            	return true;
        }, 'The Accelerometer coordinates should display', 20000);

        runs(function () {
        	if (sensorInstance)
            	expect(getstatus).toMatch("error");
            else
            	expect(sensorInstance).toBeNull();
        });
	});

	it("VT297-0315 | makeSensorByType to get Return the new Humidity sensor object by type  |", function() {
		sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_HUMIDITY);
        if (sensorInstance)
        {
        	   expect(sensorInstance.type).toMatch("Humidity");
        }
        else 
		  	   expect(sensorInstance).toBeNull();  
            
	});

	it("VT297-0316 | readData for Humidity before start to get read current sensor data |", function() {
        runs(function () {

            sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_HUMIDITY);
            if (sensorInstance)
            {
                setTimeout(humiditydata_display, 3000);
            }
            
        });

        waitsFor(function () {
        	if (sensorInstance)
               	return (getstatus != null);
            else
            	return true;
        }, 'The Accelerometer coordinates should display', 20000);

        runs(function () {
        	if (sensorInstance)
            	expect(getstatus).toMatch("error");
            else 
    		  	expect(sensorInstance).toBeNull();  
            
        }); 
	});
	
	it("VT297-0317 | start to enable the Humidity sensor data retrieval with asych callback |", function() {
        runs(function () {
            sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_HUMIDITY);
            if (sensorInstance)
            {
                sensorInstance.minimumGap = 5000;                
                sensorInstance.start(humidity_callback);
            }              

        });

        waitsFor(function () {
        	if (sensorInstance)
            	return (eventsRcvd >=  3);
            else
            	return true;
        }, 'The Accelerometer coordinates should display', 20000);

        runs(function () {
        	if (sensorInstance)
            	expect(eventsRcvd).toBeGreaterThan(2);
            else
    		  	   expect(sensorInstance).toBeNull();
        });

	});

	it("VT297-0318 | readData for Humidity after start to get read current sensor data |", function() {
        runs(function () {

            sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_HUMIDITY);
            if (sensorInstance)
            {
                sensorInstance.start();  
                setTimeout(humiditydata_display, 3000);
            }
              
            
        });

        waitsFor(function () {
        	if (sensorInstance)
            	return (getstatus != null);
            else
            	return true;
        }, 'The Accelerometer coordinates should display', 20000);

        runs(function () {
        	if (sensorInstance)
            {
            		expect(getstatus).toMatch("ok");
            }
            else 
    		  	   expect(sensorInstance).toBeNull();  
            
        }); 
	});

	it("VT297-0319 | stop to Stop listening to the Humidity sensor |", function() {
        runs(function () {
        	sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_HUMIDITY);
        	if (sensorInstance)
        		setTimeout(humiditydata_display, 3000);
        });

        waitsFor(function () {
        	if (sensorInstance)
            	return (getstatus != null);
           	else
           		return true;
        }, 'The Accelerometer coordinates should display', 20000);

        runs(function () {
        	if (sensorInstance)
            	expect(getstatus).toMatch("error");
            else
            	expect(sensorInstance).toBeNull();
        });
	});

	it("VT297-0320 | makeSensorByType to get Return the new Gravity sensor object by type  |", function() {
        sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_GRAVITY);
            if (sensorInstance)
            {   
            	expect(sensorInstance.type).toMatch("Gravity");
            }
            else 
    		  	expect(sensorInstance).toBeNull();  
            
	});

	it("VT297-0325 | makeSensorByType to get Return the new LinearAcceleration sensor object by type  |", function() {
        sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_LINEAR_ACCELERATION);
            if (sensorInstance)
            {   
           		 expect(sensorInstance.type).toMatch("LinearAcceleration");
            }
            else 
    		  	expect(sensorInstance).toBeNull();  
            
	});

	it("VT297-0326 | readData for LinearAcceleration before start to get read current sensor data |", function() {
        runs(function () {

            sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_LINEAR_ACCELERATION);
            if (sensorInstance)
            {
                setTimeout(linearAccelerationdata_display, 3000);
            }              
            
        });

        waitsFor(function () {
        	if (sensorInstance)
            	return (getstatus != null);
            else
            	return true;
        }, 'The Accelerometer coordinates should display', 20000);

        runs(function () {
        	if (sensorInstance)
            {
            		expect(getstatus).toMatch("error");
            }
            else 
    		  	   expect(sensorInstance).toBeNull();  
            
        }); 
	});
	
	it("VT297-0327 | start to enable the LinearAcceleration sensor data retrieval with asych callback |", function() {
        runs(function () {
            sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_LINEAR_ACCELERATION);
            if (sensorInstance)
            {
                sensorInstance.minimumGap = 5000;                
                sensorInstance.start(linearAcceleration_callback);
            }              

        });

        waitsFor(function () {
        	if (sensorInstance)
            	return (eventsRcvd >=  3);
            else
            	return true;
        }, 'The Accelerometer coordinates should display', 20000);

        runs(function () {
        	if (sensorInstance)
            	expect(eventsRcvd).toBeGreaterThan(2);
            else
            	expect(sensorInstance).toBeNull();
        });

	});

	it("VT297-0328 | readData for LinearAcceleration after start to get read current sensor data |", function() {
        runs(function () {

            sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_LINEAR_ACCELERATION);
            if (sensorInstance)
            {
                sensorInstance.start();  
                setTimeout(linearAccelerationdata_display, 3000);
            }
            else 
    		  	expect(sensorInstance).toBeNull(); 
        });

        waitsFor(function () {
        	if (sensorInstance)
            	return (getstatus != null);
            else
            	return true;
        }, 'The Accelerometer coordinates should display', 20000);

        runs(function () {
            if (sensorInstance)
            {
        		if ("ANDROID" == deviceOS)
        			expect(getstatus).toMatch("error"); // read data on android will always reurn error
        		else     	        	
                	expect(getstatus).toMatch("ok");
            }
            else 
    		  	   expect(sensorInstance).toBeNull();  
            
        }); 
	});

	it("VT297-0329 | stop to Stop listening to the LinearAcceleration sensor |", function() {
        runs(function () {
 			sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_LINEAR_ACCELERATION);
 			if (sensorInstance)
            	setTimeout(linearAccelerationdata_display, 3000);
        });

        waitsFor(function () {
        	if (sensorInstance)
            	return (getstatus != null);
            else
            	return true;
        }, 'The Accelerometer coordinates should display', 20000);

        runs(function () {
        	if (sensorInstance)
            	expect(getstatus).toMatch("error");
            else
            	expect(sensorInstance).toBeNull();  
        });
	});

	it("VT297-0330 | makeSensorByType to get Return the new Rotation sensor object by type  |", function() {
        sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_ROTATION);
            if (sensorInstance)
            {
            expect(sensorInstance.type).toMatch("Rotation");
            }
            else 
    		  	   expect(sensorInstance).toBeNull();  
            

	});

	it("VT297-0331 | readData for Rotation before start to get read current sensor data |", function() {
        runs(function () {

            sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_ROTATION);
            if (sensorInstance)
            {
                setTimeout(rotationdata_display, 3000);
            }
             else 
    		  	   expect(sensorInstance).toBeNull();  
            
        });

        waitsFor(function () {
        	if (sensorInstance)
            	return (getstatus != null);
            else
            	return true;
        }, 'The Accelerometer coordinates should display', 20000);

        runs(function () {
            if (sensorInstance)
            {
            		expect(getstatus).toMatch("error");
            }
            else 
    		  	   expect(sensorInstance).toBeNull();  
            
        }); 
	});
	
	it("VT297-0332 | start to enable the Rotation sensor data retrieval with asych callback |", function() {
        runs(function () {
            sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_ROTATION);
            if (sensorInstance)
            {
                sensorInstance.minimumGap = 5000;                
                sensorInstance.start(rotation_callback);
            }
            else 
    		  	   expect(sensorInstance).toBeNull();  
        });

        waitsFor(function () {
        	if (sensorInstance)
            	return (eventsRcvd >=  3);
            else
            	return true;
        }, 'The Accelerometer coordinates should display', 20000);

        runs(function () {
        	if (sensorInstance)
            	expect(eventsRcvd).toBeGreaterThan(2);
            else
           		expect(sensorInstance).toBeNull(); 	
        });

	});

	it("VT297-0333 | readData for Rotation after start to get read current sensor data |", function() {
        runs(function () {

            sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_ROTATION);
            if (sensorInstance)
            {
                sensorInstance.start();  
                setTimeout(rotationdata_display, 3000);
            }
            else 
    		  	   expect(sensorInstance).toBeNull();  
        });

        waitsFor(function () {
        	if (sensorInstance)
            	return (getstatus != null);
            else
            	return true;
        }, 'The Accelerometer coordinates should display', 20000);

        runs(function () {
            if (sensorInstance)
            {
        		if ("ANDROID" == deviceOS)
        			expect(getstatus).toMatch("error"); // read data on android will always reurn error
        		else     	        	
                	expect(getstatus).toMatch("ok");
            }
            else 
    		  	   expect(sensorInstance).toBeNull();  
            
        }); 
	});

	it("VT297-0334 | stop to Stop listening to the Rotation sensor |", function() {

        runs(function () {
    		sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_ROTATION); 	
            setTimeout(rotationdata_display, 3000);
        });

        waitsFor(function () {
        	if (sensorInstance)
            	return (getstatus != null);
            else
            	return true;
        }, 'The Accelerometer coordinates should display', 20000);

        runs(function () {
        	if (sensorInstance)
            	expect(getstatus).toMatch("error");
            else
            	expect(sensorInstance).toBeNull();
        });
	});

	it("VT297-0335 | makeSensorByType to get Return the new Orientation sensor object by type  |", function() {
        sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_ORIENTATION);
           if(sensorInstance)
           {
           		expect(sensorInstance.type).toMatch("Orientation");
            } 
            else 
    		  	expect(sensorInstance).toBeNull();  
            
	});

	it("VT297-0336 | readData for Orientation before start to get read current sensor data |", function() {
        runs(function () {

            sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_ORIENTATION);
            if (sensorInstance)
            {
                setTimeout(orientationdata_display, 3000);
			}
			else 
    		  	expect(sensorInstance).toBeNull();  
            
        });

        waitsFor(function () {
        	if (sensorInstance)
            	return (getstatus != null);
            else
           		return true;
        }, 'The Accelerometer coordinates should display', 20000);

        runs(function () {
            if (sensorInstance)
            {
            		expect(getstatus).toMatch("error");
            }
            else 
    		  	   expect(sensorInstance).toBeNull();  
            
        }); 
	});
	
	it("VT297-0337 | start to enable the Orientation sensor data retrieval with asych callback |", function() {
        runs(function () {
            sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_ORIENTATION);
            if (sensorInstance)
            {
                sensorInstance.minimumGap = 5000;                
                sensorInstance.start(orientation_callback);
            }
            else 
    		  	   expect(sensorInstance).toBeNull();  
        });

        waitsFor(function () {
        	if (sensorInstance)
            	return (eventsRcvd >=  3);
            else
            	return true;
        }, 'The Accelerometer coordinates should display', 20000);

        runs(function () {
        	if (sensorInstance)
            	expect(eventsRcvd).toBeGreaterThan(2);
            else
            	expect(sensorInstance).toBeNull();  
        });

	});

	it("VT297-0338 | readData for Orientation after start to get read current sensor data |", function() {
        runs(function () {

            sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_ORIENTATION);
            if (sensorInstance)
            {
                sensorInstance.start();  
                setTimeout(orientationdata_display, 3000);
            }
            else 
    		  	   expect(sensorInstance).toBeNull();  
        });

        waitsFor(function () {
        	if (sensorInstance)
            	return (getstatus != null);
            else
            	return true;
        }, 'The Accelerometer coordinates should display', 20000);

        runs(function () {
            if (sensorInstance)
            {
        		if ("ANDROID" == deviceOS)
        			expect(getstatus).toMatch("error"); // read data on android will always reurn error
        		else     	        	
                	expect(getstatus).toMatch("ok");
            }
            else 
    		  	   expect(sensorInstance).toBeNull();  
            
        }); 
	});

	it("VT297-0339 | stop to Stop listening to the Orientation sensor |", function() {
        runs(function () {
        	sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_ORIENTATION);
        	if (sensorInstance)
 				setTimeout(orientationdata_display, 3000);
        });

        waitsFor(function () {
        	if (sensorInstance)
        	{	
            	return (getstatus != null);
            }
            else
            	return true;
        }, 'The Accelerometer coordinates should display', 20000);

        runs(function () {
        	if (sensorInstance)
            	expect(getstatus).toMatch("error");
            else 
    		  	   expect(sensorInstance).toBeNull();  
        });
	});

	// start doesn't return an object
	/*it("VT297-0340 | start to enables the accelerometer sensor data retrieval with synch |", function() {
        sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_ACCELEROMETER);
        if (sensorInstance)
        {
            var mystate = sensorInstance.start();  
            expect(mystate["status"]).toMatch("ok");
        }  
        else
    		expect(sensorInstance).toBeNull();  
	});

	it("VT297-0341 | start to enables the accelerometer sensor data retrieval with anonymous callback |", function() {
    	sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_ACCELEROMETER);
	    if (sensorInstance)
	    {
	        sensorInstance.start(function (args){	
			eventsRcvd++;
			var result = '';
			result = 'Event ' + eventsRcvd + ' from ' + sensorInstance.type;	
			result += '<br/>Sensor status ' + sensorInstance.status;
	        result += '<br/>Sensor read gap ' + sensorInstance.minimumGap;	
			result += '<br/>Status :- ' + JSON.stringify(args["status"]);
			result += '<br/>Message :- ' + JSON.stringify(args["message"]);
			result += '<br/> Coordinates are(' + JSON.stringify(args["accelerometer_x"]);
			result += ',' + JSON.stringify(args["accelerometer_y"]);
			result += ',' + JSON.stringify(args["accelerometer_z"]);
			result += ')'
		    displayResult("Output: ",result);
		    callbackFired = true;
			});  
			
	        expect(mystate["status"]).toMatch("ok");
	    }  
		else
		expect(sensorInstance).toBeNull();

	});*/

});
