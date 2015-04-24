describe("Rho.Config module", function(){

    it("Should set start_path using setPropertyString method with saveToFile as false", function(){
        var spec = new ManualSpec(jasmine, window.document);
        spec.addGoal("Should set start_path using setPropertyString method with saveToFile as false");
        spec.addStep("Run the test which calls setPropertyString method with parameter start_path, /app/ConfigTest/specRunner.html and saveToFile as false.");
        spec.addStep("Call getPropertyString with start_path param");
        spec.addStep("Exit and relaunch the application.");
        spec.addStep("Call getPropertyString with start_path param.");
        spec.addExpectation('Should set to new start_path as /app/ConfigTest/specRunner.html');
        spec.addExpectation('Should not save new start_path on Application relaunch');
        spec.addExpectation('On relaunch should load default page.');
        spec.displayScenario();
        spec.waitForButtonPressing("Run test");
        runs(function(){
            var firstVal = Rho.Config.getPropertyString("start_path")
            spec.addResult("1. Initial start_path value: ", firstVal);
            Rho.Config.setPropertyString("start_path", "/app/ConfigTest/specRunner.html", false);
            var secondVal = Rho.Config.getPropertyString("start_path")
            spec.addResult("2. After setting new start_path value: ", secondVal);
            spec.displayResults();
            spec.waitForResponse();
        });
    });

    it("Should set start_path using setPropertyString method with saveToFile as true", function(){
        var spec = new ManualSpec(jasmine, window.document);
        spec.addGoal("Should set start_path using setPropertyString method with saveToFile as true");
        spec.addStep("Run the test which calls setPropertyString method with parameter start_path, /app/ConfigTest/specRunner.html and saveToFile as true.");
        spec.addStep("Call getPropertyString with start_path param.");
        spec.addStep("Exit and relaunch the application.");
        spec.addStep("Call getPropertyString with start_path param.");
        spec.addExpectation('Should set to new start_path.');
        spec.addExpectation('Should save new start_path on Application relaunch.');
        spec.addExpectation('On relaunch should load /app/ConfigTest/specRunner.html page.');
        spec.displayScenario();
        spec.waitForButtonPressing("Run test");
        runs(function(){
            var firstVal = Rho.Config.getPropertyString("start_path")
            spec.addResult("1. Initial start_path value: ", firstVal);
            Rho.Config.setPropertyString("start_path", "/app/ConfigTest/specRunner.html", true);
            var secondVal = Rho.Config.getPropertyString("start_path")
            spec.addResult("2. After setting new start_path value: ", secondVal);
            spec.displayResults();
            spec.waitForResponse();
        });
    });

    it("Should set MinSeverity using setPropertyInt method with saveToFile as false", function(){
        var spec = new ManualSpec(jasmine, window.document);
        spec.addGoal("Should set MinSeverity using setPropertyInt method with saveToFile as false");
        spec.addStep("Run the test which calls setPropertyInt method with parameter MinSeverity,0 and saveToFile as false.");
        spec.addStep("Call getPropertyInt with MinSeverity param.");
        spec.addStep("Exit and relaunch the application.");
        spec.addStep("Call getPropertyInt with MinSeverity param.");
        spec.addExpectation('Should set to new MinSeverity as 0');
        spec.addExpectation('Should not save new MinSeverity value on Application relaunch.');
        spec.addExpectation('On relaunch should contain default MinSeverity value.');
        spec.displayScenario();
        spec.waitForButtonPressing("Run test");
        runs(function(){
            var firstVal = Rho.Config.getPropertyInt("MinSeverity")
            spec.addResult("1. Initial MinSeverity value: ", firstVal);
            Rho.Config.setPropertyInt("MinSeverity", 0, false);
            var secondVal = Rho.Config.getPropertyInt("MinSeverity")
            spec.addResult("2. After setting new MinSeverity value: ", secondVal);
            spec.displayResults();
            spec.waitForResponse();
        });
    });

    it("Should set MinSeverity using setPropertyInt method with saveToFile as true", function(){
        var spec = new ManualSpec(jasmine, window.document);
        spec.addGoal("Should set MinSeverity using setPropertyInt method with saveToFile as true");
        spec.addStep("Run the test which calls setPropertyInt method with parameter MinSeverity,0 and saveToFile as true.");
        spec.addStep("Call getPropertyInt with MinSeverity param.");
        spec.addStep("Exit and relaunch the application.");
        spec.addStep("Call getPropertyInt with MinSeverity param.");
        spec.addStep("");
        spec.addExpectation('Should set to new MinSeverity as 0');
        spec.addExpectation('Should save new MinSeverity value on Application relaunch');
        spec.addExpectation('On relaunch should contain MinSeverity value as 0.');
        spec.displayScenario();
        spec.waitForButtonPressing("Run test");
        runs(function(){
            var firstVal = Rho.Config.getPropertyInt("MinSeverity")
            spec.addResult("1. Initial MinSeverity value: ", firstVal);
            Rho.Config.setPropertyInt("MinSeverity", 0, true);
            var secondVal = Rho.Config.getPropertyInt("MinSeverity")
            spec.addResult("2. After setting new MinSeverity value: ", secondVal);
            spec.displayResults();
            spec.waitForResponse();
        });
    });        

    it("Should set use_bulk_model using setPropertyBool method with saveToFile as false", function(){
        var spec = new ManualSpec(jasmine, window.document);
        spec.addGoal("Should set use_bulk_model using setPropertyBool method with saveToFile as false ");
        spec.addStep("Run the test which calls setPropertyBool method with parameter use_bulk_model,true and saveToFile as false.");
        spec.addStep("Call getPropertyBool with use_bulk_model param.");
        spec.addStep("Exit and relaunch the application.");
        spec.addStep("Call getPropertyBool with use_bulk_model param.");
        spec.addExpectation('Should set to new use_bulk_model as true.');
        spec.addExpectation('Should not save new use_bulk_model value on Application relaunch.');
        spec.addExpectation('On relaunch should contain default use_bulk_model value.');
        spec.displayScenario();
        spec.waitForButtonPressing("Run test");
        runs(function(){
            var firstVal = Rho.Config.getPropertyBool("use_bulk_model")
            spec.addResult("1. Initial use_bulk_model value: ", firstVal);
            Rho.Config.setPropertyBool("use_bulk_model", true, false);
            var secondVal = Rho.Config.getPropertyBool("use_bulk_model")
            spec.addResult("2. After setting new use_bulk_model value: ", secondVal);
            spec.displayResults();
            spec.waitForResponse();
        });
    });

    it("Should set use_bulk_model using setPropertyBool method with saveToFile as true", function(){
        var spec = new ManualSpec(jasmine, window.document);
        spec.addGoal("Should set use_bulk_model using setPropertyBool method with saveToFile as true");
        spec.addStep("Run the test which calls setPropertyBool method with parameter use_bulk_model,true and saveToFile as true.");
        spec.addStep("Call getPropertyBool with use_bulk_model param.");
        spec.addStep("Exit and relaunch the application.");
        spec.addStep("Call getPropertyBool with use_bulk_model param.");
        spec.addExpectation('Should set to new use_bulk_model as true.');
        spec.addExpectation('Should save new use_bulk_model value on Application relaunch.');
        spec.addExpectation('On relaunch should contain use_bulk_model value as true.');
        spec.displayScenario();
        spec.waitForButtonPressing("Run test");
        runs(function(){
            var firstVal = Rho.Config.getPropertyBool("use_bulk_model")
            spec.addResult("1. Initial use_bulk_model value: ", firstVal);
            Rho.Config.setPropertyBool("use_bulk_model", true, true);
            var secondVal = Rho.Config.getPropertyBool("use_bulk_model")
            spec.addResult("2. After setting new use_bulk_model value: ", secondVal);
            spec.displayResults();
            spec.waitForResponse();
        });
    });

    it("Should not set invalid property using setPropertyString method ", function(){
        var spec = new ManualSpec(jasmine, window.document);
        spec.addGoal("Should not set invalid property using setPropertyString method ");
        spec.addStep("Run the test which calls setPropertyString method with parameter Test123, 1234 and saveToFile as false.");
        spec.addStep("Call getPropertyString with Test123 param.");
        spec.addExpectation('Should not set invalid property name.');
        spec.addExpectation('getPropertyString should return proper error message.');
        spec.displayScenario();
        spec.waitForButtonPressing("Run test");
        runs(function(){
        	var firstVal;
        	try {
        		Rho.Config.setPropertyString("Test123", 1234, false);
        		firstVal = Rho.Config.getPropertyString("Test123")
        	}
        	catch(err) {
        		firstVal = err;
        	}
            
            spec.addResult("getPropertyString Return value after setting to invalid: ", firstVal);
            spec.displayResults();
            spec.waitForResponse();
        });
    });

    it("Should not set invalid property using setPropertyInt method", function(){
        var spec = new ManualSpec(jasmine, window.document);
        spec.addGoal("Should not set invalid property using setPropertyInt method");
        spec.addStep("Run the test which calls setPropertyInt method with parameter Test234, \"test\" and saveToFile as false.");
        spec.addStep("Call getPropertyString with Test234 param.");
        spec.addExpectation('Should not set invalid property name.');
        spec.addExpectation('getPropertyInt should not return any value.');
        spec.displayScenario();
        spec.waitForButtonPressing("Run test");
        runs(function(){
        	var firstVal;
        	try {
        		Rho.Config.setPropertyInt("Test234", "test", false);
        		firstVal = Rho.Config.getPropertyInt("Test234")
        	}
        	catch(err) {
        		firstVal = err;
        	}
        	spec.addResult("getPropertyInt Return value after setting to invalid: ", firstVal);
            spec.displayResults();
            spec.waitForResponse();
        });
    });

    it("Should not set invalid property using setPropertyBool method", function(){
        var spec = new ManualSpec(jasmine, window.document);
        spec.addGoal("Should not set invalid property using setPropertyBool method");
        spec.addStep("Run the test which calls setPropertyBool method with parameter Test123, 1234 and saveToFile as false");
        spec.addStep("Call getPropertyBool with Test123 param.");
        spec.addExpectation('Should not set invalid property name.');
        spec.addExpectation('getPropertyBool should not return any value.');
        spec.displayScenario();
        spec.waitForButtonPressing("Run test");
        runs(function(){
        	var firstVal;
        	try {
        		Rho.Config.setPropertyBool("Test123", 1234, false);
                firstVal = Rho.Config.getPropertyBool("Test123")
        	}
        	catch(err) {
        		firstVal = err;
        	}
            spec.addResult("getPropertyBool Return value after setting to invalid: ", firstVal);
            spec.displayResults();
            spec.waitForResponse();
        });
    });

    it("Should not get confilcts on setting mutliple values using setPropertyString method", function(){
        var spec = new ManualSpec(jasmine, window.document);
        spec.addGoal("Should not get confilcts on setting mutliple values using setPropertyString method");
        spec.addStep("Run the test which calls setPropertyString method with parameter LogFilePath /mnt/sdcard/myapp.log and saveToFile as false.");
        spec.addStep("Call getPropertyString with LogFilePath param.");
        spec.addStep("Set again by setPropertyString method with parameter LogFilePath /mnt/sdcard/myapp2.log and saveToFile as false.");
        spec.addStep("Call getPropertyString with LogFilePath param.");
        spec.addStep("Call getConflicts method");
        spec.addExpectation('First get should return LogFilePath as /mnt/sdcard/myapp.log');
        spec.addExpectation('Second get should return LogFilePath as /mnt/sdcard/myapp2.log');
        spec.addExpectation('getConflicts method should not return any conflict for LogFilePath property.');
        spec.displayScenario();
        spec.waitForButtonPressing("Run test");
        runs(function(){
            Rho.Config.setPropertyString("LogFilePath", "/mnt/sdcard/myapp.log", false);
            var firstVal = Rho.Config.getPropertyString("LogFilePath");
            spec.addResult("First set LogFilePath value:", firstVal);
            Rho.Config.setPropertyString("LogFilePath", "/mnt/sdcard/myapp2.log", false);
            var secondVal = Rho.Config.getPropertyString("LogFilePath");
            spec.addResult("Second set LogFilePath value:", secondVal);
            var returnVal = Rho.Config.getConflicts();
            spec.addResult("getConflicts return value", returnVal);
            spec.displayResults();
            spec.waitForResponse();
        });
    });

    it("Should not get confilcts on setting mutliple values using setPropertyInt method ", function(){
        var spec = new ManualSpec(jasmine, window.document);
        spec.addGoal("Should not get confilcts on setting mutliple values using setPropertyInt method ");
        spec.addStep("Run the test which calls setPropertyInt method with parameter LogMemPeriod 5000 and saveToFile as false.");
        spec.addStep("Call getPropertyInt with LogMemPeriod param.");
        spec.addStep("Set again by setPropertyInt method with parameter LogMemPeriod 6000 and saveToFile as false.");
        spec.addStep("Call getPropertyInt with LogMemPeriod param.");
        spec.addStep("Call getConflicts method");
        spec.addExpectation('First get should return LogMemPeriod as 5000');
        spec.addExpectation('Second get should return LogMemPeriod 6000');
        spec.addExpectation('getConflicts method should not return any conflict for LogMemPeriod property.');
        spec.displayScenario();
        spec.waitForButtonPressing("Run test");
        runs(function(){
            Rho.Config.setPropertyInt("LogMemPeriod", 5000, false);
            var firstVal = Rho.Config.getPropertyInt("LogMemPeriod");
            spec.addResult("First set LogMemPeriod value:", firstVal);
            Rho.Config.setPropertyInt("LogMemPeriod", 6000, false);
            var secondVal = Rho.Config.getPropertyInt("LogMemPeriod");
            spec.addResult("Second set LogMemPeriod value:", secondVal);
            var returnVal = Rho.Config.getConflicts();
            spec.addResult("getConflicts return value", returnVal);
            spec.displayResults();
            spec.waitForResponse();
        });
    });

    it("Should not get confilcts on setting mutliple values setPropertyBool method ", function(){
        var spec = new ManualSpec(jasmine, window.document);
        spec.addGoal("");
        spec.addStep("Run the test which calls setPropertyBool method with parameter use_bulk_model, true and saveToFile as false.");
        spec.addStep("Call getPropertyBool with use_bulk_model param.");
        spec.addStep("Set again by setPropertyBool method with parameter use_bulk_model false and saveToFile as false.");
        spec.addStep("Call getPropertyBool with use_bulk_model param.");
        spec.addStep("Call getConflicts method");
        spec.addExpectation('First get should return use_bulk_model as true');
        spec.addExpectation('Second get should return use_bulk_model false');
        spec.addExpectation('getConflicts method should not return any conflict for use_bulk_model property.');
        spec.displayScenario();
        spec.waitForButtonPressing("Run test");
        runs(function(){
            Rho.Config.setPropertyBool("use_bulk_model", true, false);
            var firstVal = Rho.Config.getPropertyBool("use_bulk_model");
            spec.addResult("First set use_bulk_model value:", firstVal);
            Rho.Config.setPropertyBool("use_bulk_model", false, false);
            var secondVal = Rho.Config.getPropertyBool("use_bulk_model");
            spec.addResult("Second set use_bulk_model value:", secondVal);
            var returnVal = Rho.Config.getConflicts();
            spec.addResult("getConflicts return value", returnVal);
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


describe("Rho.Config module, removeProperties specs", function(){

    it("Initial step for removeProperties testing", function(){
        var spec = new ManualSpec(jasmine, window.document);
        spec.addGoal("Should set full_screen_user using setPropertyString method with saveToFile as true");
        spec.addStep("Run the test which calls setPropertyString method with parameter , /app/ConfigTest/specRunner.html and saveToFile as true.");
        spec.addStep("Call getPropertyString with start_path param.");
        spec.addStep("Skip this spec if you finished it before.");
        spec.addExpectation('Should set to new full_screen_user.');
        spec.addExpectation('Should save full_screen_user on Application relaunch.');
        spec.displayScenario();
        spec.waitForButtonPressing("Run test");
        runs(function(){
            var firstVal = Rho.Config.getPropertyString("full_screen_user")
            spec.addResult("1. Initial full_screen_user value: ", firstVal);
            Rho.Config.setPropertyString("full_screen_user", "screen_value", true);
            var secondVal = Rho.Config.getPropertyString("full_screen_user")
            spec.addResult("2. After setting new full_screen_user value: ", secondVal);
            spec.displayResults();
            spec.waitForResponse();
        });
    });

    it("Checking the existance of the property after application restart when removed with saveToFile as false ", function(){
		var spec = new ManualSpec(jasmine, window.document);
    	spec.addGoal("Checking the existance of the property after application restart when removed with saveToFile as false ");
    	spec.addStep("rhoconfig.txt should contain full_screen property");
		spec.addStep("Run the test which calls removeProperty method with full_screen property and saveToFile as false.");
		spec.addStep("Check isPropertyExists second return value should be false");
		spec.addStep("Restart the application.");
		spec.addStep("Run test and check first isPropertyExists return value.");
        spec.addExpectation('isPropertyExists method should return true after application restart.');
        spec.displayScenario();
        spec.waitForButtonPressing("Run test");
        runs(function(){
            var firstVal = Rho.Config.isPropertyExists("full_screen_user");
            spec.addResult("First value full_screen: ", firstVal);
            Rho.Config.removeProperty("full_screen", false);
            var secondVal = Rho.Config.isPropertyExists("full_screen_user");
            spec.addResult("Second value full_screen: ", secondVal);
		    spec.displayResults();
		    spec.waitForResponse();
        });
	});

	it("Checking the existance of the property after application restart when removed with saveToFile as true ", function(){
		var spec = new ManualSpec(jasmine, window.document);
    	spec.addGoal("Checking the existance of the property after application restart when removed with saveToFile as true ");
    	spec.addStep("rhoconfig.txt should contain full_screen property");
		spec.addStep("Run the test which calls removeProperty method with full_screen property and saveToFile as true.");
		spec.addStep("Check isPropertyExists second return value should be false");
		spec.addStep("Restart the application.");
		spec.addStep("Run test and check first isPropertyExists return value.");
        spec.addExpectation('isPropertyExists method should return false after application restart.');
        spec.displayScenario();
        spec.waitForButtonPressing("Run test");
        runs(function(){
            var firstVal = Rho.Config.isPropertyExists("full_screen_user");
            spec.addResult("First full_screen_user value: ", firstVal);
            Rho.Config.removeProperty("full_screen_user", true);
            var secondVal = Rho.Config.isPropertyExists("full_screen_user");
            spec.addResult("Second full_screen_user value: ", secondVal);
		    spec.displayResults();
		    spec.waitForResponse();
        });
	});
});
