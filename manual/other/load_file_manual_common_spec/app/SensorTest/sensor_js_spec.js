	var testResult = '';
	var captured = false;
	var eventsRcvd = 0;
	var callbackFired = false;
	var sensorInstance = null; 
	var getstatus = null;
	var getpropresult = '';
	var getallpropresult ='';
	var getresult = '';
	var sensorType = '';
	var myvar = '';

describe("Sensor JS API Test", function() {
	
	beforeEach(function() {
		testResult = '';
		captured = false;
		callbackFired = false;
		eventsRcvd = 0;
		sensorInstance = null; 
		getstatus = null;
		displayResult("Output: ","");
	});

    afterEach(function () {
        /* ... Tear it down ... */
        getresult = '';
        getpropresult = '';
        getallpropresult ='';
        sensorType = '';
        if (sensorInstance != null)
    	{
    		sensorInstance.stop();
    		sensorInstance.minimumGap = 200;
    		sensorType = null;
    	}
        
        myvar = '';
    });

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

	var deviceOrientationdata_display =  function (){	
		var data = sensorType.readData();
		var result = '';
		result = 'Event ' + eventsRcvd + ' from ' + sensorType.type;
		result += '<br/>Sensor status ' + sensorType.status;
        result += '<br/>Sensor read gap ' + sensorType.minimumGap;
		result += '<br/>Status :- ' + JSON.stringify(data["status"]);
		result += '<br/>Message :- ' + JSON.stringify(data["message"]);
		result += '<br/>Coordinates is(' + JSON.stringify(data["deviceorientation_value"]);
	    result += ')'
	    displayResult("Output: ",result);
	    getstatus = JSON.stringify(data["status"]);
	}

	var motiondata_display =  function (){
		var data = sensorType.readData();	
		var result = '';
		result = 'Event ' + eventsRcvd + ' from ' + sensorType.type;
		result += '<br/>Sensor status ' + sensorType.status;
        result += '<br/>Sensor read gap ' + sensorType.minimumGap;
		result += '<br/>Status :- ' + JSON.stringify(data["status"]);
		result += '<br/>Message :- ' + JSON.stringify(data["message"]);
		result += '<br/>Coordinates is(' + JSON.stringify(data["motion_value"]);
	    result += ')'
	    displayResult("Output: ",result);
	    getstatus = JSON.stringify(data["status"]);
	}

	var ambientlightdata_display =  function (){	
		var data = sensorType.readData();
		var result = '';
		result = 'Event ' + eventsRcvd + ' from ' + sensorType.type;
		result += '<br/>Sensor status ' + sensorType.status;
        result += '<br/>Sensor read gap ' + sensorType.minimumGap;
		result += '<br/>Status :- ' + JSON.stringify(data["status"]);
		result += '<br/>Message :- ' + JSON.stringify(data["message"]);
		result += 'Coordinates is(' + JSON.stringify(data["ambientlight_value"]);
		result += ')'
	    displayResult("Output: ",result);
	    getstatus = JSON.stringify(data["status"]);
	}

	var proximitydata_display =  function (){	
		var data = sensorType.readData();
		var result = '';
		result = 'Event ' + eventsRcvd + ' from ' + sensorType.type;
		result += '<br/>Sensor status ' + sensorType.status;
        result += '<br/>Sensor read gap ' + sensorType.minimumGap;
		result += '<br/>Status :- ' + JSON.stringify(data["status"]);
		result += '<br/>Message :- ' + JSON.stringify(data["message"]);
		result += '<br/>Proximity Value :- ' + JSON.stringify(data["proximity_value"]);
	    displayResult("Output: ",result);
	    getstatus = JSON.stringify(data["status"]);
	}

	var proximitylongrangedata_display =  function (){	
		var data = sensorType.readData();
		var result = '';
		result = 'Event ' + eventsRcvd + ' from ' + sensorType.type;
		result += '<br/>Sensor status ' + sensorType.status;
        result += '<br/>Sensor read gap ' + sensorType.minimumGap;
		result += '<br/>Status :- ' + JSON.stringify(data["status"]);
		result += '<br/>Message :- ' + JSON.stringify(data["message"]);
		result += '<br/>Coordinates is(' + JSON.stringify(data["proximitylongrange_value"]);
		result += ')'
	    displayResult("Output: ",result);
	    getstatus = JSON.stringify(data["status"]);
	}

	var pressuredata_display =  function (){	
		var data = sensorType.readData();
		var result = '';
		result = 'Event ' + eventsRcvd + ' from ' + sensorType.type;
		result += '<br/>Sensor status ' + sensorType.status;
        result += '<br/>Sensor read gap ' + sensorType.minimumGap;
		result += '<br/>Status :- ' + JSON.stringify(data["status"]);
		result += '<br/>Message :- ' + JSON.stringify(data["message"]);
		result += '<br/>Coordinates is(' + JSON.stringify(data["pressure_value"]);
	    result += ')'
	    displayResult("Output: ",result);
	    getstatus = JSON.stringify(data["status"]);
	}

	var gravitydata_display =  function (){	
		var data = sensorType.readData();
		var result = '';
		result = 'Event ' + eventsRcvd + ' from ' + sensorType.type;
		result += '<br/>Sensor status ' + sensorType.status;
        result += '<br/>Sensor read gap ' + sensorType.minimumGap;
		result += '<br/>Status :- ' + JSON.stringify(data["status"]);
		result += '<br/>Message :- ' + JSON.stringify(data["message"]);
		result += '<br/>Coordinates are(' + JSON.stringify(data["gravity_x"]);
		result += ',' + JSON.stringify(data["gravity_y"]);
		result += ',' + JSON.stringify(data["gravity_z"]);
	    result += ')'
	    displayResult("Output: ",result);
	    getstatus = JSON.stringify(data["status"]);
	}
	
	var makesensorbytype_callback =  function (args){	
		sensorType = JSON.stringify(args);
	    displayResult("Output: ",sensorType);
	}


	it("VT297-0261 | readData for DeviceOrientation before start to get read current sensor data |", function() {
        runs(function () {
        	dispTestCaseRunning("VT297-0261 | readData for DeviceOrientation before start to get read current sensor data");
	        dispExpectedResult("It should return error in status");
           //sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_DEVICE_ORIENTATION);
           Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_DEVICE_ORIENTATION,makesensorbytype_callback);
           if (sensorType)
           {
            setTimeout(deviceOrientationdata_display, 3000);
           }
		});

		waitsFor(function()
		{
			return captured;
		}, '30sec Wait before move to next test', 30000);

		runs(function()
		{
			expect(testResult).toEqual(true);
		});
	});
	
	it("VT297-0262 | start to enable the DeviceOrientation sensor data retrieval with asych callback |", function() {
        runs(function () {
        	dispTestCaseRunning("VT297-0262 | start to enable the DeviceOrientation sensor data retrieval with asych callback");
	        dispExpectedResult("It should return deviceOrientation senor valid values in hash callback prameters with minimulGap of 5000 milliseconds");
            sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_DEVICE_ORIENTATION);
            if (sensorInstance)
            {
                sensorInstance.minimumGap = 5000;                
                sensorInstance.start(deviceOrientation_callback);
            }    
		});

		waitsFor(function()
		{
			return captured;
		}, '30sec Wait before move to next test', 30000);

		runs(function()
		{
			expect(testResult).toEqual(true);
		});

	});

	it("VT297-0263 | readData for DeviceOrientation after start to get read current sensor data |", function() {
        runs(function () {
        	dispTestCaseRunning("VT297-0262 | start to enable the DeviceOrientation sensor data retrieval with asych callback");
	        dispExpectedResult("It should return hash of current sensor deviceOrientation data");
           //sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_DEVICE_ORIENTATION);
           Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_DEVICE_ORIENTATION,makesensorbytype_callback);
           if (sensorType)
            {
                sensorInstance.start();  
                setTimeout(deviceOrientationdata_display, 3000);
            }
        });

		waitsFor(function()
		{
			return captured;
		}, '30sec Wait before move to next test', 30000);

		runs(function()
		{
			expect(testResult).toEqual(true);
		});

	});

	it("VT297-0264 | stop to Stop listening to the DeviceOrientation sensor |", function() {
        runs(function () {
	 		dispTestCaseRunning("VT297-0264 | stop to Stop listening to the DeviceOrientation sensor");
	        dispExpectedResult("calling stop method should Stops listening to the deviceOrientation sensor so read data should return error status");
	        setTimeout(deviceOrientationdata_display, 3000);
        });

		waitsFor(function()
		{
			return captured;
		}, '30sec Wait before move to next test', 30000);

		runs(function()
		{
			expect(testResult).toEqual(true);
		});
	});

    it("VT297-0271 | readData for Motion before start to get read current sensor data |", function() {
        runs(function () {
            dispTestCaseRunning("VT297-0271 | readData for Motion before start to get read current sensor data");
	        dispExpectedResult("It should return error in status");
           //sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_MOTION);
           Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_MOTION,makesensorbytype_callback);
           if (sensorType)
           {
            setTimeout(motiondata_display, 3000);
           }
		});

		waitsFor(function()
		{
			return captured;
		}, '30sec Wait before move to next test', 30000);

		runs(function()
		{
			expect(testResult).toEqual(true);
		});
	});
	
	it("VT297-0272 | start to enable the Motion sensor data retrieval with asych callback |", function() {
        runs(function () {
            dispTestCaseRunning("VT297-0272 | start to enable the Motion sensor data retrieval with asych callback");
	        dispExpectedResult("It should return Motion senor valid values in hash callback prameters with minimulGap of 5000 milliseconds");
            sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_MOTION);
            if (sensorInstance)
            {
                sensorInstance.minimumGap = 5000;                
                sensorInstance.start(motion_callback);
            }    
		});

		waitsFor(function()
		{
			return captured;
		}, '30sec Wait before move to next test', 30000);

		runs(function()
		{
			expect(testResult).toEqual(true);
		});

	});

	it("VT297-0273 | readData for Motion after start to get read current sensor data |", function() {
        runs(function () {
        	dispTestCaseRunning("VT297-0273 | readData for Motion after start to get read current sensor data");
	        dispExpectedResult("It should return hash of current sensor Motion data");
           //sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_MOTION);
           Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_MOTION,makesensorbytype_callback);
           if (sensorType)
            {
                sensorInstance.start();  
                setTimeout(motiondata_display, 3000);
            }
        });

		waitsFor(function()
		{
			return captured;
		}, '30sec Wait before move to next test', 30000);

		runs(function()
		{
			expect(testResult).toEqual(true);
		});

	});

	it("VT297-0274 | stop to Stop listening to the Motion sensor |", function() {
        runs(function () {
	 		dispTestCaseRunning("VT297-0274 | stop to Stop listening to the Motion sensor");
	        dispExpectedResult("calling stop method should Stops listening to the Motion sensor so read data should return error status");
	        setTimeout(motiondata_display, 3000);
        });

		waitsFor(function()
		{
			return captured;
		}, '30sec Wait before move to next test', 30000);

		runs(function()
		{
			expect(testResult).toEqual(true);
		});
	});

	it("VT297-0291 | readData for AmbientLight before start to get read current sensor data |", function() {
        runs(function () {
            dispTestCaseRunning("VT297-0291 | readData for AmbientLight before start to get read current sensor data");
	        dispExpectedResult("It should return error in status");
           //sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_AMBIENT_LIGHT);
           Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_AMBIENT_LIGHT,makesensorbytype_callback);
           if (sensorType)
           {
            setTimeout(ambientlightdata_display, 3000);
           }
		});

		waitsFor(function()
		{
			return captured;
		}, '30sec Wait before move to next test', 30000);

		runs(function()
		{
			expect(testResult).toEqual(true);
		});
	});
	
	it("VT297-0292 | start to enable the AmbientLight sensor data retrieval with asych callback |", function() {
        runs(function () {
            dispTestCaseRunning("VT297-0292 | start to enable the AmbientLight sensor data retrieval with asych callback");
	        dispExpectedResult("It should return AmbientLight senor valid values in hash callback prameters with minimulGap of 5000 milliseconds");
            sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_AMBIENT_LIGHT);
            if (sensorInstance)
            {
                sensorInstance.minimumGap = 5000;                
                sensorInstance.start(ambientlight_callback);
            }    
		});

		waitsFor(function()
		{
			return captured;
		}, '30sec Wait before move to next test', 30000);

		runs(function()
		{
			expect(testResult).toEqual(true);
		});

	});

	it("VT297-0293 | readData for AmbientLight after start to get read current sensor data |", function() {
        runs(function () {
        	dispTestCaseRunning("VT297-0293 | readData for AmbientLight after start to get read current sensor data");
	        dispExpectedResult("It should return hash of current sensor AmbientLight data");
           //sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_AMBIENT_LIGHT);
           Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_AMBIENT_LIGHT,makesensorbytype_callback);
           if (sensorType)
            {
                sensorInstance.start();  
                setTimeout(ambientlightdata_display, 3000);
            }
        });

		waitsFor(function()
		{
			return captured;
		}, '30sec Wait before move to next test', 30000);

		runs(function()
		{
			expect(testResult).toEqual(true);
		});

	});

	it("VT297-0294 | stop to Stop listening to the AmbientLight sensor |", function() {
        runs(function () {
	 		dispTestCaseRunning("VT297-0294 | stop to Stop listening to the AmbientLight sensor");
	        dispExpectedResult("calling stop method should Stops listening to the AmbientLight sensor so read data should return error status");
	        setTimeout(ambientlightdata_display, 3000);
        });

		waitsFor(function()
		{
			return captured;
		}, '30sec Wait before move to next test', 30000);

		runs(function()
		{
			expect(testResult).toEqual(true);
		});
	});

	it("VT297-0296 | readData for Proximity before start to get read current sensor data |", function() {
        runs(function () {
            dispTestCaseRunning("VT297-0296 | readData for Proximity before start to get read current sensor data");
	        dispExpectedResult("It should return error in status");
           //sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_PROXIMITY);
           Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_PROXIMITY,makesensorbytype_callback);
           if (sensorType)
           {
            setTimeout(proximitydata_display, 3000);
           }
		});

		waitsFor(function()
		{
			return captured;
		}, '30sec Wait before move to next test', 30000);

		runs(function()
		{
			expect(testResult).toEqual(true);
		});
	});
	
	it("VT297-0297 | start to enable the Proximity sensor data retrieval with asych callback |", function() {
        runs(function () {
            dispTestCaseRunning("VT297-0297 | start to enable the Proximity sensor data retrieval with asych callback");
	        dispExpectedResult("It should return Proximity senor valid values in hash callback prameters with minimulGap of 5000 milliseconds");
            sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_PROXIMITY);
            if (sensorInstance)
            {
                sensorInstance.minimumGap = 5000;                
                sensorInstance.start(proximity_callback);
            }    
		});

		waitsFor(function()
		{
			return captured;
		}, '30sec Wait before move to next test', 30000);

		runs(function()
		{
			expect(testResult).toEqual(true);
		});

	});

	it("VT297-0298 | readData for Proximity after start to get read current sensor data |", function() {
        runs(function () {
        	dispTestCaseRunning("VT297-0298 | readData for Proximity after start to get read current sensor data");
	        dispExpectedResult("It should return hash of current sensor Proximity data");
           //sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_PROXIMITY);
           Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_PROXIMITY,makesensorbytype_callback);
           if (sensorType)
            {
                sensorInstance.start();  
                setTimeout(proximitydata_display, 3000);
            }
        });

		waitsFor(function()
		{
			return captured;
		}, '30sec Wait before move to next test', 30000);

		runs(function()
		{
			expect(testResult).toEqual(true);
		});

	});

	it("VT297-0299 | stop to Stop listening to the Proximity sensor |", function() {
        runs(function () {
	 		dispTestCaseRunning("VT297-0299 | stop to Stop listening to the Proximity sensor");
	        dispExpectedResult("calling stop method should Stops listening to the Proximity sensor so read data should return error status");
	        setTimeout(proximitydata_display, 3000);
        });

		waitsFor(function()
		{
			return captured;
		}, '30sec Wait before move to next test', 30000);

		runs(function()
		{
			expect(testResult).toEqual(true);
		});
	});

	it("VT297-0301 | readData for ProximityLongRange before start to get read current sensor data |", function() {
        runs(function () {
            dispTestCaseRunning("VT297-0301 | readData for ProximityLongRange before start to get read current sensor data");
	        dispExpectedResult("It should return error in status");
           //sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_PROXIMITY_LONG_RANGE);
           Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_PROXIMITY_LONG_RANGE,makesensorbytype_callback);
           if (sensorType)
           {
            setTimeout(proximitylongrangedata_display, 3000);
           }
		});

		waitsFor(function()
		{
			return captured;
		}, '30sec Wait before move to next test', 30000);

		runs(function()
		{
			expect(testResult).toEqual(true);
		});
	});
	
	it("VT297-0302 | start to enable the ProximityLongRange sensor data retrieval with asych callback |", function() {
        runs(function () {
            dispTestCaseRunning("VT297-0302 | start to enable the ProximityLongRange sensor data retrieval with asych callback");
	        dispExpectedResult("It should return ProximityLongRange senor valid values in hash callback prameters with minimulGap of 5000 milliseconds");
            sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_PROXIMITY_LONG_RANGE);
            if (sensorInstance)
            {
                sensorInstance.minimumGap = 5000;                
                sensorInstance.start(proximitylongrange_callback);
            }    
		});

		waitsFor(function()
		{
			return captured;
		}, '30sec Wait before move to next test', 30000);

		runs(function()
		{
			expect(testResult).toEqual(true);
		});

	});

	it("VT297-0303 | readData for ProximityLongRange after start to get read current sensor data |", function() {
        runs(function () {
        	dispTestCaseRunning("VT297-0303 | readData for ProximityLongRange after start to get read current sensor data");
	        dispExpectedResult("It should return hash of current sensor ProximityLongRange data");
           //sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_PROXIMITY_LONG_RANGE);
           Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_PROXIMITY_LONG_RANGE,makesensorbytype_callback);
           if (sensorType)
            {
                sensorInstance.start();  
                setTimeout(proximitylongrangedata_display, 3000);
            }
        });

		waitsFor(function()
		{
			return captured;
		}, '30sec Wait before move to next test', 30000);

		runs(function()
		{
			expect(testResult).toEqual(true);
		});

	});

	it("VT297-0304 | stop to Stop listening to the ProximityLongRange sensor |", function() {
        runs(function () {
	 		dispTestCaseRunning("VT297-0304 | stop to Stop listening to the ProximityLongRange sensor");
	        dispExpectedResult("calling stop method should Stops listening to the ProximityLongRange sensor so read data should return error status");
	        setTimeout(proximitylongrangedata_display, 3000);
        });

		waitsFor(function()
		{
			return captured;
		}, '30sec Wait before move to next test', 30000);

		runs(function()
		{
			expect(testResult).toEqual(true);
		});
	});

	it("VT297-0306 | readData for Pressure before start to get read current sensor data |", function() {
        runs(function () {
            dispTestCaseRunning("VT297-0306 | readData for Pressure before start to get read current sensor data");
	        dispExpectedResult("It should return error in status");
           //sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_PRESSURE);
           Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_PRESSURE,makesensorbytype_callback);
           if (sensorType)
           {
            setTimeout(pressuredata_display, 3000);
           }
		});

		waitsFor(function()
		{
			return captured;
		}, '30sec Wait before move to next test', 30000);

		runs(function()
		{
			expect(testResult).toEqual(true);
		});
	});
	
	it("VT297-0307 | start to enable the Pressure sensor data retrieval with asych callback |", function() {
        runs(function () {
            dispTestCaseRunning("VT297-0307 | start to enable the Pressure sensor data retrieval with asych callback");
	        dispExpectedResult("It should return Pressure senor valid values in hash callback prameters with minimulGap of 5000 milliseconds");
            sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_PRESSURE);
            if (sensorInstance)
            {
                sensorInstance.minimumGap = 5000;                
                sensorInstance.start(pressure_callback);
            }    
		});

		waitsFor(function()
		{
			return captured;
		}, '30sec Wait before move to next test', 30000);

		runs(function()
		{
			expect(testResult).toEqual(true);
		});

	});

	it("VT297-0308 | readData for Pressure after start to get read current sensor data |", function() {
        runs(function () {
        	dispTestCaseRunning("VT297-0308 | readData for Pressure after start to get read current sensor data");
	        dispExpectedResult("It should return hash of current sensor Pressure data");
           //sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_PRESSURE);
           Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_PRESSURE,makesensorbytype_callback);
           if (sensorType)
            {
                sensorInstance.start();  
                setTimeout(pressuredata_display, 3000);
            }
        });

		waitsFor(function()
		{
			return captured;
		}, '30sec Wait before move to next test', 30000);

		runs(function()
		{
			expect(testResult).toEqual(true);
		});

	});

	it("VT297-0309 | stop to Stop listening to the Pressure sensor |", function() {
        runs(function () {
	 		dispTestCaseRunning("VT297-0309 | stop to Stop listening to the Pressure sensor");
	        dispExpectedResult("calling stop method should Stops listening to the Pressure sensor so read data should return error status");
	        setTimeout(pressuredata_display, 3000);
        });

		waitsFor(function()
		{
			return captured;
		}, '30sec Wait before move to next test', 30000);

		runs(function()
		{
			expect(testResult).toEqual(true);
		});
	});
	
	it("VT297-0321 | readData for Gravity before start to get read current sensor data |", function() {
        runs(function () {
            dispTestCaseRunning("VT297-0321 | readData for Gravity before start to get read current sensor data");
	        dispExpectedResult("It should return error in status");
           //sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_GRAVITY);
           Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_GRAVITY,makesensorbytype_callback);
           if (sensorType)
           {
            setTimeout(gravitydata_display, 3000);
           }
		});

		waitsFor(function()
		{
			return captured;
		}, '30sec Wait before move to next test', 30000);

		runs(function()
		{
			expect(testResult).toEqual(true);
		});
	});
	
	it("VT297-0322 | start to enable the Gravity sensor data retrieval with asych callback |", function() {
        runs(function () {
            dispTestCaseRunning("VT297-0322 | start to enable the Gravity sensor data retrieval with asych callback");
	        dispExpectedResult("It should return Gravity senor valid values in hash callback prameters with minimulGap of 5000 milliseconds");
            sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_GRAVITY);
            if (sensorInstance)
            {
                sensorInstance.minimumGap = 5000;                
                sensorInstance.start(gravity_callback);
            }    
		});

		waitsFor(function()
		{
			return captured;
		}, '30sec Wait before move to next test', 30000);

		runs(function()
		{
			expect(testResult).toEqual(true);
		});

	});

	it("VT297-0323 | readData for Gravity after start to get read current sensor data |", function() {
        runs(function () {
        	dispTestCaseRunning("VT297-0323 | readData for Gravity after start to get read current sensor data");
	        dispExpectedResult("It should return hash of current sensor Gravity data");
           //sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_GRAVITY);
           Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_GRAVITY,makesensorbytype_callback);
           if (sensorType)
            {
                sensorInstance.start();  
                setTimeout(gravitydata_display, 3000);
            }
        });

		waitsFor(function()
		{
			return captured;
		}, '30sec Wait before move to next test', 30000);

		runs(function()
		{
			expect(testResult).toEqual(true);
		});

	});

	it("VT297-0324 | stop to Stop listening to the Gravity sensor |", function() {
        runs(function () {
	 		dispTestCaseRunning("VT297-0324 | stop to Stop listening to the Gravity sensor");
	        dispExpectedResult("calling stop method should Stops listening to the Gravity sensor so read data should return error status");
	        setTimeout(gravitydata_display, 3000);
        });

		waitsFor(function()
		{
			return captured;
		}, '30sec Wait before move to next test', 30000);

		runs(function()
		{
			expect(testResult).toEqual(true);
		});
	});
});