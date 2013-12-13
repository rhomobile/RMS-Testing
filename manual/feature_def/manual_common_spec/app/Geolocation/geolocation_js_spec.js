describe("Geolocation RUBY API Test", function() {

	var timeout = false;

	beforeEach(function() {
		timeout = false;
		document.getElementById("myList").innerHTML = '';
	});

	it("should return current latitude of the device",function(){
		runs(function()
		{
			dispCurrentProcess(jasmine.getEnv().currentSpec.description);
			Ruby.call('Geolocation','getLatitude');
						
			// Time to wait ajax to be happen
			setTimeout(function() {
				timeout = true;
			}, 2000);
		});

		waitsFor(function()
		{
			if(timeout == true)
				return true;
		}, 'Wait for 2 sec ajax call to happen', 3000);

		runs(function(){
			displayResult("Output: ",Ruby.getReturnedValue()+"<br>");
		});

		_result.waitForResponse(); //Common Method implemented to wait for tester to make it pass or fail.Code available in specHelper.js
		
	});

	it("should return current longitude of the device",function(){

		runs(function()
		{
			dispCurrentProcess(jasmine.getEnv().currentSpec.description);
			Ruby.call('Geolocation','getLongitude');

			setTimeout(function() {
				timeout = true;
			}, 2000);
		});

		waitsFor(function()
		{
			if(timeout == true)
				return true;
		}, 'Wait for 2 sec ajax call to happen', 3000);

		runs(function(){
			displayResult("Output: ",Ruby.getReturnedValue()+"<br>");
		});

		_result.waitForResponse(); //Common Method implemented to wait for tester to make it pass or fail.Code available in specHelper.js

		
	});

	it("should return true if the location system is up and running, false otherwise.returns null if this feature is not supported on the device platform", function(){
		runs(function()
		{
			dispCurrentProcess(jasmine.getEnv().currentSpec.description);
			Ruby.call('Geolocation','getKnownPostion');

			setTimeout(function() {
				timeout = true;
			}, 2000);
		});

		waitsFor(function()
		{
			if(timeout == true)
				return true;
		}, 'Wait for 2 sec ajax call to happen', 3000);

		runs(function(){
			displayResult("Output: ",Ruby.getReturnedValue()+"<br>");
		});

		_result.waitForResponse(); //Common Method implemented to wait for tester to make it pass or fail.Code available in specHelper.js

		
	});

	it("should return distance between Washington, D.C. and Moscow, Russia: expected  4856.99 miles using geolocation haversine_distance)",function(){
		runs(function()
		{
			dispCurrentProcess(jasmine.getEnv().currentSpec.description);
			Ruby.call('Geolocation','getHaversineDistance');

			setTimeout(function() {
				timeout = true;
			}, 2000);
		});

		waitsFor(function()
		{
			if(timeout == true)
				return true;
		}, 'Wait for 2 sec ajax call to happen', 3000);

		runs(function(){
			displayResult("Output: ",Ruby.getReturnedValue()+"<br>");
		});

		_result.waitForResponse(); //Common Method implemented to wait for tester to make it pass or fail.Code available in specHelper.js
		
	});
	if (["WINDOWS", "ANDROID","APPLE"].indexOf(Rho.System.platform) != -1) {
		it("should return altitude in meters(meters above sea level)", function(){
			runs(function()
			{
				dispCurrentProcess(jasmine.getEnv().currentSpec.description);
				Ruby.call('Geolocation','getAltitude');

				setTimeout(function() {
					timeout = true;
				}, 2000);
			});

			waitsFor(function()
			{
				if(timeout == true)
					return true;
			}, 'Wait for 2 sec ajax call to happen', 3000);

			runs(function(){
				displayResult("Output: ",Ruby.getReturnedValue()+"<br>");
			});

			_result.waitForResponse(); //Common Method implemented to wait for tester to make it pass or fail.Code available in specHelper.js
			
		});
	}
	if (["WINDOWS", "ANDROID","APPLE"].indexOf(Rho.System.platform) != -1) {
		it("should return the speed if it is available(meters/sec over ground)", function(){
			runs(function()
			{
				dispCurrentProcess(jasmine.getEnv().currentSpec.description);
				Ruby.call('Geolocation','getSpeed');

				setTimeout(function() {
					timeout = true;
				}, 2000);
			});

			waitsFor(function()
			{
				if(timeout == true)
					return true;
			}, 'Wait for 2 sec ajax call to happen', 3000);

			runs(function(){
				displayResult("Output: ",Ruby.getReturnedValue()+"<br>");
			});

			_result.waitForResponse(); //Common Method implemented to wait for tester to make it pass or fail.Code available in specHelper.js
			
		});
	}
	if (["ANDROID","APPLE"].indexOf(Rho.System.platform) != -1) {
		it("should returns the estimated accuracy of the fix(Horizontal radius in Meters)", function(){
			runs(function()
			{
				dispCurrentProcess(jasmine.getEnv().currentSpec.description);
				Ruby.call('Geolocation','getAccuracy');

				setTimeout(function() {
					timeout = true;
				}, 2000);
			});

			waitsFor(function()
			{
				if(timeout == true)
					return true;
			}, 'Wait for 2 sec ajax call to happen', 3000);

			runs(function(){
				displayResult("Output: ",Ruby.getReturnedValue()+"<br>");
			});

			_result.waitForResponse(); //Common Method implemented to wait for tester to make it pass or fail.Code available in specHelper.js
			
		});
	}
	if (["WINDOWS", "ANDROID"].indexOf(Rho.System.platform) != -1) {
		it("should returns the number of satellites used to determine the fix", function(){
			runs(function()
			{
				dispCurrentProcess(jasmine.getEnv().currentSpec.description);
				Ruby.call('Geolocation','getSatellitesCount');

				setTimeout(function() {
					timeout = true;
				}, 2000);
			});

			waitsFor(function()
			{
				if(timeout == true)
					return true;
			}, 'Wait for 2 sec ajax call to happen', 3000);

			runs(function(){
				displayResult("Output: ",Ruby.getReturnedValue()+"<br>");
			});

			_result.waitForResponse(); //Common Method implemented to wait for tester to make it pass or fail.Code available in specHelper.js
			
		});
	}
});