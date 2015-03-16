describe("Feature definition for Device API", function(){
	describe("Calibration method support with Device API", function(){
		itFD("Successfull calibrate with optional callback", function(){
			// test code to implement
			var spec = new ManualSpec(jasmine, window.document);
			spec.addGoal("Should support for method calibrate with optional callback");
			spec.addStep("Press 'RunTest' button");
            spec.addExpectation('This is Semi- Auto case !.');
            spec.displayScenario();
            spec.waitForButtonPressing("Run test");
            var calibrateCBCalled=false;
			var calibrateHandler = {
				calibrateCB: function(res){
					calibrateCBCalled = true;
					console.log("calibrateCB: triggered");
				}
			};
            runs(function(){
				spyOn(calibrateHandler,'calibrateCB');
				Rho.Device.calibrate(calibrateHandler.calibrateCB);
			});
			waitsFor(function(){
            	 return calibrateCBCalled;
            },"wait for calibrate callback",5000);
			runs(function(){
            	expect(openHandler.openCB).toHaveBeenCalledWith({"status":"success"});
            });
		}, ["WM","CE"]);
		itFD("UnSuccessfull calibrate with optional callback", function(){
			// test code to implement
		}, ["WM","CE"]);
		itFD("Successful calibrate with out callback", function(){
			// test code to implement
		}, ["WM","CE"]);
		itFD("UnSuccessful calibrate with out callback", function(){
			// test code to implement
		}, ["WM","CE"]);
	}, null);
	describe("Suspend, Idle and Wake method support with Device API", function(){
		itFD("Suspend device when the device is active", function(){
			// test code to implement
		}, ["WM","CE"]);
		it("Try to Suspend the device which is already suspended", function(){
			// using timer
		}, ["WM","CE"]);
		it("Try to suspend the device multiple times", function(){
			// test code to implement
		}, ["WM","CE"]);
		itFD("Change device mode to Idle from active", function(){
			// test code to implement
		}, ["Android","WM","CE"]);
		itFD("Changed device mode to wake \(device went Idle after timeout \)", function(){
			// test code to implement.
		}, ["Android","WM","CE"]);
		itFD("Change device mode to wake from Idle \(done via Device API\)", function(){
			// test code to implement.
		}, ["Android","WM","CE"]);
		itFD("Change device mode to wake from Idle \(done manually\)", function(){
			// test code to implement.
		}, ["Android","WM","CE"]);
		it("Status of unsuccessful suspend will get updated in the log file", function(){
			// test code to implement.
		}, ["WM","CE"]);
		it("Status of unsuccessful Idle will get updated in the log file", function(){
			// test code to implement.
		}, ["WM","CE"]);
		it("Status of unsuccessful Wake will get updated in the log file", function(){
			// test code to implement.
		}, ["Android","WM","CE"]);
	}, null);
	describe("PowerOff and Reboot method support with Device API", function(){
		itFD("Power-Off device", function(){
			// test code to implement
		}, ["WM","CE"]);
		itFD("Power-Off device - unsuccess scenario will get updated in the log file", function(){
			// test code to implement.
		}, ["WM","CE"]);
		itFD("Warm - Reboot the device", function(){
			// test code to implement
		}, ["Android","WM","CE"]);		
		itFD("Cold - Reboot the device", function(){
			// test code to implemnt
		}, ["Android","WM","CE"]);
		itFD("ColdCAD - Reboot the device", function(){
			// test code to implement
		}, ["Android","WM","CE"]);
		itFD("Reboot device - unsuccess scenario willl update the log file", function(){
			// test code to implement.
		}, ["Android","WM","CE"]);
	}, null);
}, null);