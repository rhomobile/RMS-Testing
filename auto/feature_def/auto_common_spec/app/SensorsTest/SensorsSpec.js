describe("SensorsTestSuite", function() {
	describe("Testing Sensors Module in Ruby via AJAX.  ", function() {
		
		var deviceOS = Rho.System.platform;
		
		if ((deviceOS == "ANDROID")/* || (deviceOS == "WINDOWS")*/)
		{
			it("AT55571, test Accelerometer sensor callback", function() {									
				var result = runAccelerometer();			
				expect(result).toBe("true");				
			});		
			
			it("AT55572, test TiltAngle sensor callback", function() {			
				var result = runTiltAngle();			
				expect(result).toBe("true");			
			});	
			
			it("AT55576, test Magnetometer sensor callback", function() {									
				var result = runMagnetometer();			
				expect(result).toBe("true");				
			});			
			
			it("AT55577, test gyroscope sensor callback", function() {			
				var result = runGyroscope();			
				expect(result).toBe("true");			
			});	
			
			it("AT55578, test ambient light sensor callback", function() {									
				var result = runAmbientLight();			
				expect(result).toBe("true");				
			});		
			
			it("AT55579, test proximity sensor callback", function() {			
				var result = runProximity();			
				expect(result).toBe("true");			
			});	
			
			it("AT55581, test pressure sensor callback", function() {									
				var result = runPressure();			
				expect(result).toBe("true");				
			});				
		}
		
		/*if (deviceOS == "WINDOWS")
		{
			it("AT55573, test device orientation sensor callback", function() {									
				var result = runDeviceOrientation();			
				expect(result).toBe("true");				
			});		

			it("AT55574, test motion sensor callback", function() {									
				var result = runMotion();			
				expect(result).toBe("true");				
			});		
			
			it("AT55575, test eCompass sensor callback", function() {			
				var result = runeCompass();			
				expect(result).toBe("true");			
			});		
		
			it("AT55580, test proximitylongrange sensor callback", function() {			
				var result = runProximityLongRange();			
				expect(result).toBe("true");			
			});
		
			it("AT55582, test temperature sensor callback", function() {			
				var result = runTemperature();			
				expect(result).toBe("true");			
			});	
			
			it("AT55583, test humidity sensor callback", function() {			
				var result = runHumidity();			
				expect(result).toBe("true");			
			});	
		}*/
		
		if (deviceOS == "ANDROID")
		{
			it("AT55584, test gravity sensor callback", function() {									
				var result = runGravity();			
				expect(result).toBe("true");				
			});		
			
			it("AT55585, test linear acceleration sensor callback", function() {			
				var result = runLinearAcceleration();			
				expect(result).toBe("true");			
			});		
			
			it("AT55586, test rotation sensor callback", function() {									
				var result = runRotation();			
				expect(result).toBe("true");				
			});		
			
			it("AT55587, test orientation sensor callback", function() {			
				var result = runOrientation();			
				expect(result).toBe("true");			
			});
		}
	});
});
