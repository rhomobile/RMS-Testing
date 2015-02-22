describe("Rho.Config module", function(){
	it("Checking the existance of the property after application restart when removed with saveToFile as false ", function(){
		var spec = new ManualSpec(jasmine, window.document);
    	spec.addGoal("Checking the existance of the property after application restart when removed with saveToFile as false ");
    	spec.addStep("rholog.txt should contain full_screen property");
		spec.addStep("Run the test which calls removeProperty method with full_screen property and saveToFile as false.");
		spec.addStep("Check isPropertyExists second return value should be false");
		spec.addStep("Restart the application.");
		spec.addStep("Run test and check first isPropertyExists return value.");
        spec.addExpectation('isPropertyExists method should return true after application restart.');
        spec.displayScenario();
        spec.waitForButtonPressing("Run test");
        runs(function(){
        	var firstVal = Rho.Config.isPropertyExists("full_screen");
            spec.addResult("First value: ", firstVal);
            Rho.Config.removeProperty("full_screen", false);
            var secondVal = Rho.Config.isPropertyExists("full_screen");
            spec.addResult("Second value: ", secondVal);
		    spec.displayResults();
		    spec.waitForResponse();
        });
	});

	it("Checking the existance of the property after application restart when removed with saveToFile as true ", function(){
		var spec = new ManualSpec(jasmine, window.document);
    	spec.addGoal("Checking the existance of the property after application restart when removed with saveToFile as true ");
    	spec.addStep("rholog.txt should contain full_screen property");
		spec.addStep("Run the test which calls removeProperty method with full_screen property and saveToFile as true.");
		spec.addStep("Check isPropertyExists second return value should be false");
		spec.addStep("Restart the application.");
		spec.addStep("Run test and check first isPropertyExists return value.");
        spec.addExpectation('isPropertyExists method should return false after application restart.');
        spec.displayScenario();
        spec.waitForButtonPressing("Run test");
        runs(function(){
        	var firstVal = Rho.Config.isPropertyExists("full_screen");
            spec.addResult("First value: ", firstVal);
            Rho.Config.removeProperty("full_screen", true);
            var secondVal = Rho.Config.isPropertyExists("full_screen");
            spec.addResult("Second value: ", secondVal);
		    spec.displayResults();
		    spec.waitForResponse();
        });
	});

	it("Application should not behave abnormally on removing invalid property using removeProperty method ", function(){
		var spec = new ManualSpec(jasmine, window.document);
    	spec.addGoal("Application should not behave abnormally on removing invalid property using removeProperty method ");
    	spec.addStep("Run the test which calls removeProperty method with invalid value.");
		spec.addStep("Check any isPropertyExists return value.");
        spec.addExpectation('Application should not behave abnormally on removing invalid property.No other property should be removed. Both start path should be same');
        spec.displayScenario();
        spec.waitForButtonPressing("Run test");
        runs(function(){
        	var firstVal = Rho.Config.isPropertyExists("start_path");
            spec.addResult("1.start_path value: ", firstVal);
            Rho.Config.removeProperty("Invalid", true);
            var secondVal = Rho.Config.isPropertyExists("start_path");
            spec.addResult("2.start_path value: ", secondVal);
		    spec.displayResults();
		    spec.waitForResponse();
        });
	});
});