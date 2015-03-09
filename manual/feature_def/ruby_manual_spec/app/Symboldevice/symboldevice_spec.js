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
			it("Should caliberate successfully with optional callback and press 'esc' ", function(){
				var spec = new ManualSpec(jasmine, window.document);
		    	spec.addGoal("Should support for the method \"caliberate()\", to trigger the caliberate screen.");
		        spec.addStep("Press 'RunTest' button.");
		        spec.addStep("Press 'esc' button from the device keypad.");
		        spec.addExpectation('Test passed, only if calibration screen is brought foreground and by pressing esc button device doesnot behave abnormally.');
		        spec.displayScenario();
		        spec.waitForButtonPressing("Run test");
		        runs(function(){
		        	Ruby.call('Symboldevice','device_calibrate?cb=yes');
	                spec.waitForResponse();
				});
			});
			it("Should caliberate successfully with optional callback and press 'Ok' ", function(){
				var spec = new ManualSpec(jasmine, window.document);
		    	spec.addGoal("Should support for the method \"caliberate()\", to trigger the caliberate screen.");
		        spec.addStep("Press 'RunTest' button.");
		        spec.addStep("Do caliberation on the device.");
		        spec.addStep("Press 'Ok' button from the device keypad.");
		        spec.addExpectation('Test passed, only if calibration screen is brought foreground and by pressing Ok button device doesnot behave abnormally.');
		        spec.displayScenario();
		        spec.waitForButtonPressing("Run test");
		        runs(function(){
			        Ruby.call('Symboldevice','device_calibrate?cb=yes');
	                spec.waitForResponse();
				});
			});
			it("Should not trigger caliberate callback when caliberation done via settings", function(){
				var spec = new ManualSpec(jasmine, window.document);
		    	spec.addGoal("Should not trigger calibrate callback when caliberation done via settings");
		        spec.addStep("Launch the test application press run test button and put it in the background.");
		        spec.addStep("Navigate to settings -> stylus -> calibrate.");
		        spec.addStep("Perform caliberation and press Ok button once done with it.");
		        spec.addExpectation('Test passed only, if doing calibration via settings did not trigger callback.');
		        spec.displayScenario();
		        spec.waitForButtonPressing("Run test");
		        runs(function(){
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
			it("Should put the device in to idle mode with optional callback, even if the appliation is in background", function(){
				var spec = new ManualSpec(jasmine, window.document);
				spec.addGoal("Should put the device to idle mode, even if the appliation is in background");
				spec.addStep("Press Run Test buton");
				spec.addStep("Put the test application to run in background with in 10 sec after Run Test button pressed.");
				spec.addExpectation("Observe that device goes to idle mode even if the test application is in background");
				spec.displayScenario();
				spec.waitForButtonPressing("Run test");
				runs(function(){
					setTimeout(function(){
						Ruby.call('Symboldevice','device_idle?cb=yes');
					},10000);
					spec.waitForResponse();
				})
			});
			it("Should put the device in to idle mode and immediately call wake method.", function(){
				var spec = new ManualSpec(jasmine, window.document);
				spec.addGoal("Should put the device to idle mode and immediately call wake method");
				spec.addStep("Press Run Test buton");
				spec.addExpectation("Observe that device does not go to idle mode.");
				spec.displayScenario();
				spec.waitForButtonPressing("Run test");
				runs(function(){
					Ruby.call('Symboldevice','device_idle?cb=yes');
					Ruby.call('Symboldevice','device_wake?cb=yes');
					spec.waitForResponse();
				})
			});
			it("Should change device mode from idle to awake and later awake to idle.", function(){
				var spec = new ManualSpec(jasmine, window.document);
				spec.addGoal("Should change device mode from awake to idle by executing idle method.");
				spec.addStep("Press Run Test buton.");
				spec.addExpectation("Observe that device goes idle mode and after 10 sec bring back to awake mode.");
				spec.displayScenario();
				spec.waitForButtonPressing("Run test");
				runs(function(){
					Ruby.call('Symboldevice','device_idle?cb=yes');
					setTimeout(function(){
						Ruby.call('Symboldevice','device_wake?cb=yes');
					},10000);
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
					spec.waitForResponse();
				});
			});
			it("Should change device mode from suspend to wake by executing wake method.", function(){
				var spec = new ManualSpec(jasmine, window.document);
				spec.addGoal("Should change device mode from suspend to wake by executing wake method.");
				spec.addStep("Press Run Test buton.");
				spec.addExpectation("Observe that device goes suspend mode and after 10 sec bring back to wake mode.");
				spec.displayScenario();
				spec.waitForButtonPressing("Run test");
				runs(function(){
					Ruby.call('Symboldevice','device_suspend');
					setTimeout(function(){
						Ruby.call('Symboldevice','device_wake');
					},10000);
					spec.waitForResponse();
				});
			});
			it("Should not behave abnormally when tried to wake device which is already wake.", function(){
				var spec = new ManualSpec(jasmine, window.document);
				spec.addGoal("Should not behave abnormally when tried to wake device which is already wake.");
				spec.addStep("Press Run Test buton.");
				spec.addExpectation("Observe that no abnormal behaviour is seen with the application.");
				spec.displayScenario();
				spec.waitForButtonPressing("Run test");
				runs(function(){
					Ruby.call('Symboldevice','device_wake?cb=yes');
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
			it("Should not behave abnormally while trying to suspend a device which is already suspended.", function(){
				var spec = new ManualSpec(jasmine, window.document);
				spec.addGoal("Should not behave abnormally while trying to suspend a device which is already suspended.");
				spec.addStep("Press Run Test button.");
				spec.addExpectation("Observe that device changes to suspend mode and does not behave abnormally.");
				spec.displayScenario();
				spec.waitForButtonPressing("Run test");
				runs(function(){
					Ruby.call('Symboldevice','device_suspend?cb=yes');
					Ruby.call('Symboldevice','device_suspend?cb=yes');
					spec.waitForResponse();
				});
			});
			it("Should suspend the device sucessfully with out callback", function(){
				var spec = new ManualSpec(jasmine, window.document);
				spec.addGoal("Should suspend the device successfully with out callback.");
				spec.addStep("Press Run Test button.");
				spec.addExpectation("Observe that device changes to suspend mode successfully.");
				spec.displayScenario();
				spec.waitForButtonPressing("Run test");
				runs(function(){
					Ruby.call('Symboldevice','device_suspend');
					spec.waitForResponse();
				});
			});
			it("Should not behave abnormally by trying to execute suspend method when the device is already in idle mode", function(){
				var spec = new ManualSpec(jasmine, window.document);
				spec.addGoal("Should not behave abnormally by trying to execute suspend method when the deivce is already in idle mode.");
				spec.addStep("Press Run Test button");
				spec.addExpectation("Observe that device changes to suspend mode successfully.");
				spec.displayScenario();
				spec.waitForButtonPressing("Run test");
				runs(function(){
					Ruby.call('Symboldevice','device_idle');
					setTimeout(function(){
						Ruby.call('Symboldevice','device_suspend');
					},10000);
					spec.waitForResponse();
				});
			});
			it("Should not behave abnormally by trying to execute wake method when the device is in suspend mode", function(){
				var spec = new ManualSpec(jasmine, window.document);
				spec.addGoal("Should not behave abnormally by trying to execute wake method when the deivce is in suspend mode.");
				spec.addStep("Press Run Test button");
				spec.addExpectation("Observe that device remains in suspend mode.");
				spec.displayScenario();
				spec.waitForButtonPressing("Run test");
				runs(function(){
					Ruby.call('Symboldevice','device_suspend');
					setTimeout(function(){
						Ruby.call('Symboldevice','device_wake');
					},10000);
					spec.waitForResponse();
				});
			});
		}
		if(isAndroidPlatform()){
			it("Should wake the device automatically from idle mode.", function(){
				var spec = new ManualSpec(jasmine, window.document);
				spec.addGoal("Should wake the device automatically from idle mode.");
				spec.addStep("Press Run Test button");
				spec.addStep("Put the phone to idle mode manually.");
				spec.addExpectation("Observe that device wakes successfully automatically after 10sec.");
				spec.displayScenario();
				spec.waitForButtonPressing("Run test");
				runs(function(){
					setTimeout(function(){
						Ruby.call('Symboldevice','device_wake');
					},10000);
					spec.waitForResponse();
				});
			});
			it("Should not behave abnormally when wake method executed multiple times.", function(){
				var spec = new ManualSpec(jasmine, window.document);
				spec.addGoal("Should wake the device automatically from idle mode.");
				spec.addStep("Press Run Test button");
				spec.addStep("Put the phone to idle mode manually.");
				spec.addExpectation("Observe that device wakes successfully automatically after 10sec.");
				spec.displayScenario();
				spec.waitForButtonPressing("Run test");
				runs(function(){
					setTimeout(function(){
						Ruby.call('Symboldevice','device_wake');
						Ruby.call('Symboldevice','device_wake');
						Ruby.call('Symboldevice','device_wake');
					},10000);
					spec.waitForResponse();
				});
			});
			it("Should wake the device from idle mode successfully when called with callback.", function(){
				var spec = new ManualSpec(jasmine, window.document);
				spec.addGoal("Should wake the device automatically from idle mode.");
				spec.addStep("Press Run Test button");
				spec.addStep("Put the phone to idle mode manually.");
				spec.addExpectation("Observe that device wakes successfully automatically after 10sec.");
				spec.displayScenario();
				spec.waitForButtonPressing("Run test");
				runs(function(){
					setTimeout((function(){
						Ruby.call('Symboldevice','device_wake?cb=yes');
					})(),10000);
				});
				runs(function(){
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
					Ruby.call('Symboldevice','device_reboot?type=warm');
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
				});
			});
			it("Should reboot the device by executing reboot method with param bootType warm with optional callback.", function(){
				var spec = new ManualSpec(jasmine, window.document);
				spec.addGoal("Should reboot the device by executing reboot method with optional callback.");
				spec.addStep("Press Run Test button");
				spec.addExpectation("Observe that device gets rebooted successfully using method reboot.");
				spec.displayScenario();
				spec.waitForButtonPressing("Run test");
				runs(function(){
					Ruby.call('Symboldevice','device_reboot?type=warm&cb=yes');
				});
			});
			it("Should not behave abnormally by trying to execute reboot method when the device is in suspend mode", function(){
				var spec = new ManualSpec(jasmine, window.document);
				spec.addGoal("Should not behave abnormally by trying to execute reboot method when the deivce is in suspend mode.");
				spec.addStep("Press Run Test button");
				spec.addExpectation("Observe that device remains in suspend mode.");
				spec.displayScenario();
				spec.waitForButtonPressing("Run test");
				runs(function(){
					Ruby.call('Symboldevice','device_suspend?cb=yes');
					setTimeout(function(){
						Ruby.call('Symboldevice','device_reboot?type=warm');
					},10000);
				});
			});
			it("Should not behave abnormally by trying to execute reboot method when the device is in idle mode", function(){
				var spec = new ManualSpec(jasmine, window.document);
				spec.addGoal("Should not behave abnormally by trying to execute reboot method when the deivce is in idle mode.");
				spec.addStep("Press Run Test button");
				spec.addExpectation("Observe that device remains in idle mode.");
				spec.displayScenario();
				spec.waitForButtonPressing("Run test");
				runs(function(){
					Ruby.call('Symboldevice','device_idle');
					setTimeout(function(){
						Ruby.call('Symboldevice','device_reboot?type=warm');
					},10000);
				});
			});
			it("Should not behave abnormally by trying to execute powerOff method when the device is in suspend mode", function(){
				var spec = new ManualSpec(jasmine, window.document);
				spec.addGoal("Should not behave abnormally by trying to execute poweOff method when the deivce is in suspend mode.");
				spec.addStep("Press Run Test button");
				spec.addExpectation("Observe that device remains in suspend mode.");
				spec.displayScenario();
				spec.waitForButtonPressing("Run test");
				runs(function(){
					Ruby.call('Symboldevice','device_suspend');
					setTimeout(function(){
						Ruby.call('Symboldevice','device_poweroff');
					},10000);
				});
			});
			it("Should not behave abnormally by trying to execute powerOff method when the device is in idle mode", function(){
				var spec = new ManualSpec(jasmine, window.document);
				spec.addGoal("Should not behave abnormally by trying to execute poweOff method when the deivce is in idle mode.");
				spec.addStep("Press Run Test button");
				spec.addExpectation("Observe that device remains in idle mode.");
				spec.displayScenario();
				spec.waitForButtonPressing("Run test");
				runs(function(){
					Ruby.call('Symboldevice','device_idle');
					setTimeout(function(){
						Ruby.call('Symboldevice','device_poweroff');
					},10000);
				});
			});
		}
	});
});
