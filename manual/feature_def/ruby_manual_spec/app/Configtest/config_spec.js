describe("Rho::Config module (Ruby api)", function(){

    beforeEach(function(){
        document.getElementById('result1').innerHTML = '';
        document.getElementById('result2').innerHTML = '';
        document.getElementById('result3').innerHTML = '';
    });

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
        var cbstatus;
        runs(function(){
            Ruby.call('Configtest','config_startpath?prop=string');
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
            Ruby.call('Configtest','config_startpath?prop=string&savefile=true');
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
            Ruby.call('Configtest','config_startpath?prop=int');
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
            Ruby.call('Configtest','config_startpath?prop=int&savefile=true');
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
            Ruby.call('Configtest','config_startpath?prop=bool');
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
            Ruby.call('Configtest','config_startpath?prop=bool&savefile=true');
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
        	Ruby.call('Configtest','config_startpath_invalid?prop=string');
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
            Ruby.call('Configtest','config_startpath_invalid?prop=int');
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
            Ruby.call('Configtest','config_startpath_invalid?prop=bool');
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
            Ruby.call('Configtest','config_startpath_multiple?prop=string');
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
            Ruby.call('Configtest','config_startpath_multiple?prop=int');
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
            Ruby.call('Configtest','config_startpath_multiple?prop=bool');
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
            Ruby.call('Configtest','config_ispropertyexists?savefile=false');
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
            Ruby.call('Configtest','config_ispropertyexists?savefile=true');
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
            Ruby.call('Configtest','config_ispropertyexists');
		    spec.waitForResponse();
        });
	});
});