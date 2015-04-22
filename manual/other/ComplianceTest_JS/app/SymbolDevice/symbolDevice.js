describe('Symbol Device test cases : ', function(){
	describe('Non Power test cases : ', function(){
		if(isAnyWindowsFamilyPlatform()){
			it("VT200-0600 | Should calibrate successfully with out optional callback", function(){
				var spec = new ManualSpec(jasmine, window.document); 
		    	spec.addGoal("Should support for the method \"calibrate()\", to trigger the calibrate screen.");
		        spec.addStep("Press 'RunTest' button");
		        spec.addExpectation('Test passed, only if calibration screen is brought foreground by pressing Run Test button.');
		        spec.displayScenario();
		        spec.waitForButtonPressing("Run test");
		        runs(function(){
		        	Rho.Device.calibrate();
		        });
		        runs(function(){
	                spec.waitForResponse();
				});
			});
			it("VT200-0601 | Should caliberate successfully with optional callback and press 'Ok' ", function(){
				var spec = new ManualSpec(jasmine, window.document);
		    	spec.addGoal("Should support for the method \"caliberate()\", to trigger the caliberate screen.");
		        spec.addStep("Press 'RunTest' button.");
		        spec.addStep("Do caliberation on the device.");
		        spec.addStep("Press 'Ok' button from the device keypad.");
		        spec.addExpectation('Test passed, only if calibration screen is brought foreground and by pressing Ok button device doesnot behave abnormally.');
		        spec.displayScenario();
		        spec.waitForButtonPressing("Run test");
		        runs(function(){
		        	var calibrateCB = function(data){
		        		spec.addResult("Status : ", data.status);
		        		spec.addResult("Message : ", data.message);
		        	}
		        	Rho.Device.calibrate(calibrateCB);
		        });
		        runs(function(){
	                spec.waitForResponse();
				});
			});
			it("VT200-0602 | Should put the device to idle mode using method \"idle()\"", function(){
				var spec = new ManualSpec(jasmine, window.document);
		    	spec.addGoal("Should put the device to idle mode using method \"idle()\"");
		        spec.addStep("Press Run Test button to put the device into idle mode.");
		        spec.addExpectation('Test passed only, if device goes to idle mode.');
		        spec.displayScenario();
		        spec.waitForButtonPressing("Run test");
		        runs(function(){
		        	Rho.Device.idle();
	                spec.waitForResponse();
				});
			});
			it("VT200-0603 | Should put the device in to idle mode with optional callback", function(){
				var spec = new ManualSpec(jasmine, window.document);
		    	spec.addGoal("Should put the device to idle mode using method \"idle()\"");
		    	spec.addStep("Press Run Test button to put the device into idle mode.");
		    	spec.addExpectation('Test passed only, if device goes to idle mode.');
		    	spec.displayScenario();
		    	spec.waitForButtonPressing("Run test");
		    	runs(function(){
		    		var idleCB = function(data){
		    			spec.addResult('idleCB status : ', data.status);
		    			spec.addResult('idleCB message : ', data.message);
		    			console.log("idleCB : Triggered");
		    		}
		    		Rho.Device.idle(idleCB);
		    	});
		    	runs(function(){
		    		spec.waitForResponse();
		    	});
			});
			it("VT200-0604 | Should change device mode from idle to awake and later awake to idle.", function(){
				var spec = new ManualSpec(jasmine, window.document);
				spec.addGoal("Should change device mode from awake to idle by executing idle method.");
				spec.addStep("Press Run Test buton.");
				spec.addExpectation("Observe that device goes idle mode and after 10 sec bring back to awake mode.");
				spec.displayScenario();
				spec.waitForButtonPressing("Run test");
				runs(function(){
					var idleCB = function(data){
						console.log("idleCB : Triggered");
						spec.addResult('idleCB status :', data.status);
						spec.addResult('idleCB message :', data.message);
					};
					var wakeCB = function(data){
						console.log("wakeCB : Triggered");
						spec.addResult('wakeCB status : ', data.status);
						spec.addResult('wakeCB message : ', data.message);
					};
					Rho.Device.idle(idleCB);
					setTimeout(function(){
						Rho.Device.wake(wakeCB);
					},10000);
					Rho.Device.idle(idleCB);
				});
				runs(function(){
					spec.waitForResponse();
				});
			});
			it("VT200-0605 | Should suspend the device from active mode with optional callback.", function(){
				var spec = new ManualSpec(jasmine, window.document);
				spec.addGoal("Should suspend the device from active mode.");
				spec.addStep("Press Run Test buton.");
				spec.addExpectation("Observe that device changes to suspend mode from active mode.");
				spec.displayScenario();
				spec.waitForButtonPressing("Run test");
				runs(function(){
					var suspendCB = function(){
						console.log("suspend : ", data.status);
						console.log("Suspend : ", data.message);
					};
					Rho.Device.suspend(suspendCB);
				});
				runs(function(){
					spec.waitForResponse();
				});
			});
		}
	});
	describe("Power related test cases : ", function(){
		if(isAnyWindowsFamilyPlatform()){
			it("VT200-0606 | Should power Off the device by executing power Off method without callback", function(){
				var spec = new ManualSpec(jasmine, window.document);
				spec.addGoal("Should power off the device by executing power off method.");
				spec.addStep("Press Run Test button");
				spec.addExpectation("Observer that device goes Off using method poweroff.");
				spec.displayScenario();
				spec.waitForButtonPressing("Run test");
				runs(function(){
					Rho.Device.powerOff();
				});
			});
			it("VT200-0607 | Should reboot the device by executing reboot method with bootType warm.", function(){
				var spec = new ManualSpec(jasmine, window.document);
				spec.addGoal("Should reboot the device by executing reboot method.");
				spec.addStep("Press Run Test button");
				spec.addExpectation("Observer that device gets rebooted successfully using method reboot.");
				spec.displayScenario();
				spec.waitForButtonPressing("Run test");
				runs(function(){
					Rho.Device.reboot("Warm");
				});
			});
			it("VT200-0608 | Should reboot the device by executing reboot method with bootType cold.", function(){
				var spec = new ManualSpec(jasmine, window.document);
				spec.addGoal("Should reboot the device by executing reboot method.");
				spec.addStep("Press Run Test button");
				spec.addExpectation("Observer that device gets cold rebooted successfully if device supports cold boot else does warm boot.");
				spec.displayScenario();
				spec.waitForButtonPressing("Run test");
				runs(function(){
					Rho.Device.reboot("Cold");
				});
			});
			it("VT200-0609 | Should reboot the device by executing reboot method with bootType coldcad.", function(){
				var spec = new ManualSpec(jasmine, window.document);
				spec.addGoal("Should reboot the device by executing reboot method.");
				spec.addStep("Press Run Test button");
				spec.addExpectation("Observer that device gets rebooted successfully if device supports coldcad boot else does warm boot.");
				spec.displayScenario();
				spec.waitForButtonPressing("Run test");
				runs(function(){
					Rho.Device.reboot("ColdCad");
				});
			});
		}
	});
});
