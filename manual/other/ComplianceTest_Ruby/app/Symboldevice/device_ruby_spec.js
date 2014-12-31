describe('Symbol Device test cases : ', function(){
	describe('Non Power test cases : ', function(){
		if(isAnyWindowsFamilyPlatform()){
			it("Should calibrate successfully with out optional callback", function(){
				var spec = new ManualSpec(jasmine, window.document);
		    	spec.addGoal("Should support for the method \"calibrate()\", to trigger the calibrate screen.");
		        spec.addStep("Press 'RunTest' button");
		        spec.addExpectation('Test passed, only if calibration screen is brought foreground by pressing Run Test button.');
		        spec.displayScenario();
		        spec.waitForButtonPressing("Run test");
		        runs(function(){
		        	Ruby.call('Symboldevice','device_calibrate');
		        	spec.waitForResponse();
		        });
			});

			it("Should put the device to idle mode using method \"idle()\"", function(){
				var spec = new ManualSpec(jasmine, window.document);
		    	spec.addGoal("Should put the device to idle mode using method \"idle()\"");
		        spec.addStep("Press Run Test button to put the device into idle mode.");
		        spec.addExpectation('Test passed only, if device goes to idle mode.');
		        spec.displayScenario();
		        spec.waitForButtonPressing("Run test");
		        runs(function(){
		        	Ruby.call('Symboldevice','device_idle');
	                spec.waitForResponse();
				});
			});

			it("Should put the device in to idle mode with optional callback", function(){
				var spec = new ManualSpec(jasmine, window.document);
		    	spec.addGoal("Should put the device to idle mode using method \"idle()\"");
		    	spec.addStep("Press Run Test button to put the device into idle mode.");
		    	spec.addExpectation('Test passed only, if device goes to idle mode.');
		    	spec.displayScenario();
		    	spec.waitForButtonPressing("Run test");
		    	runs(function(){
		    		Ruby.call('Symboldevice','device_idle?cb=yes');
		    		spec.waitForResponse();
		    	});
			});
			
			it("Should change device mode from idle to wake by executing wake method.", function(){
				var spec = new ManualSpec(jasmine, window.document);
				spec.addGoal("Should change device mode from idle to wake by executing wake method.");
				spec.addStep("Press Run Test buton.");
				spec.addExpectation("Observe that device goes idle mode and after 10 sec bring back to wake mode.");
				spec.displayScenario();
				spec.waitForButtonPressing("Run test");
				runs(function(){
					Ruby.call('Symboldevice','device_idle?cb=yes');

					setTimeout(function(){
						Ruby.call('Symboldevice','device_wake?cb=yes');
					},10000);
				});
				runs(function(){
					spec.waitForResponse();
				});
			});
			
			it("Should suspend the device from active mode with optional callback.", function(){
				var spec = new ManualSpec(jasmine, window.document);
				spec.addGoal("Should suspend the device from active mode.");
				spec.addStep("Press Run Test buton.");
				spec.addExpectation("Observe that device changes to suspend mode from active mode.");
				spec.displayScenario();
				spec.waitForButtonPressing("Run test");
				runs(function(){
					Ruby.call('Symboldevice','device_suspend?cb=yes');
					spec.waitForResponse();
				});
			});
			
		}
	});

	describe("Power related test cases : ", function(){
		if(isAnyWindowsFamilyPlatform()){
			it("Should power Off the device by executing power Off method without callback", function(){
				var spec = new ManualSpec(jasmine, window.document);
				spec.addGoal("Should power off the device by executing power off method.");
				spec.addStep("Press Run Test button");
				spec.addExpectation("Observer that device goes Off using method poweroff.");
				spec.displayScenario();
				spec.waitForButtonPressing("Run test");
				runs(function(){
					Ruby.call('Symboldevice','device_poweroff');
					spec.waitForResponse();
				});
			});
			it("Should power Off the device by executing power Off method with optional callback", function(){
				var spec = new ManualSpec(jasmine, window.document);
				spec.addGoal("Should power off the device by executing power off method.");
				spec.addStep("Press Run Test button");
				spec.addExpectation("Observer that device goes Off using method poweroff.");
				spec.displayScenario();
				spec.waitForButtonPressing("Run test");
				runs(function(){
					Ruby.call('Symboldevice','device_poweroff?cb=yes');
					spec.waitForResponse();
				});
			});
			it("Should reboot the device by executing reboot method with bootType warm.", function(){
				var spec = new ManualSpec(jasmine, window.document);
				spec.addGoal("Should reboot the device by executing reboot method.");
				spec.addStep("Press Run Test button");
				spec.addExpectation("Observer that device gets rebooted successfully using method reboot.");
				spec.displayScenario();
				spec.waitForButtonPressing("Run test");
				runs(function(){
					Ruby.call('Symboldevice','device_reboot?type=Warm');
					spec.waitForResponse();
				});
			});
			it("Should reboot the device by executing reboot method with bootType cold.", function(){
				var spec = new ManualSpec(jasmine, window.document);
				spec.addGoal("Should reboot the device by executing reboot method.");
				spec.addStep("Press Run Test button");
				spec.addExpectation("Observer that device gets cold rebooted successfully if device supports cold boot else does warm boot.");
				spec.displayScenario();
				spec.waitForButtonPressing("Run test");
				runs(function(){
					Ruby.call('Symboldevice','device_reboot?type=Cold');
					spec.waitForResponse();
				});
			});
			it("Should reboot the device by executing reboot method with bootType coldcad.", function(){
				var spec = new ManualSpec(jasmine, window.document);
				spec.addGoal("Should reboot the device by executing reboot method.");
				spec.addStep("Press Run Test button");
				spec.addExpectation("Observer that device gets rebooted successfully if device supports coldcad boot else does warm boot.");
				spec.displayScenario();
				spec.waitForButtonPressing("Run test");
				runs(function(){
					Ruby.call('Symboldevice','device_reboot?type=ColdCad');
					spec.waitForResponse();
				});
			});
		}
	});
});
