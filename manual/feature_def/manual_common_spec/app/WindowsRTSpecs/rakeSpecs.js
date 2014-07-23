describe("WindowsRT spec", function () {

    it("should build WindowsRT rhobundle", function () {
        var spec = new ManualSpec(jasmine, window.document);
        spec.addGoal(jasmine.getEnv().currentSpec.description);
        spec.addPrecondition("run \"rake build:wp8:rhobundle_noext\" command in CLI");
        spec.addExpectation("File *** must appears in directory bin/. Passed if the application installed and launched successfully in the WindowsRT device.");
        spec.displayScenario();
        runs(function () {
            //spec.addResult("", "");
            spec.displayResults();
            spec.waitForResponse();
        });
    });

    it("should clean", function () {
        var spec = new ManualSpec(jasmine, window.document);
        spec.addGoal(jasmine.getEnv().currentSpec.description);
        spec.addPrecondition("run \"rake clean:wp8 \" command in CLI");
        spec.addExpectation("Contents in the bin/ directory should get cleaned/flushed.");
        spec.displayScenario();
        runs(function () {
            //spec.addResult("", "");
            spec.displayResults();
            spec.waitForResponse();
        });
    });

    it("should build production for device", function () {
        var spec = new ManualSpec(jasmine, window.document);
        spec.addGoal(jasmine.getEnv().currentSpec.description);
        spec.addPrecondition("run \"rake device:wp8:production\" command in CLI");
        spec.addExpectation("File .xap should be placed under 'app/bin/target/wp8'. Passed if the application installed and launched successfully in the WindowsRT device.");
        spec.displayScenario();
        runs(function () {
            //spec.addResult("", "");
            spec.displayResults();
            spec.waitForResponse();
        });
    });

    it("should build production for emulator", function () {
        var spec = new ManualSpec(jasmine, window.document);
        spec.addGoal(jasmine.getEnv().currentSpec.description);
        spec.addPrecondition("run \"rake emulator:wp8:production\" command in CLI");
        spec.addExpectation("File .xap should be placed under 'app/bin/target/wp8'. Passed if the application installed and launched successfully in the WindowsRT device.");
        spec.displayScenario();
        runs(function () {
            //spec.addResult("", "");
            spec.displayResults();
            spec.waitForResponse();
        });
    });

    it("should build, install .xap and run on WP8 emulator", function () {
        var spec = new ManualSpec(jasmine, window.document);
        spec.addGoal(jasmine.getEnv().currentSpec.description);
        spec.addPrecondition("run \"rake run:wp8\" command in CLI");
        spec.addExpectation("Application should get build and installed with the emulator.");
        spec.displayScenario();
        runs(function () {
            //spec.addResult("", "");
            spec.displayResults();
            spec.waitForResponse();
        });
    });

    it("should build, install .xap and run on WP8 device", function () {
        var spec = new ManualSpec(jasmine, window.document);
        spec.addGoal(jasmine.getEnv().currentSpec.description);
        spec.addPrecondition("run \"rake run:wp8:device\" command in CLI");
        spec.addExpectation("Application should get build and installed with the device.");
        spec.displayScenario();
        runs(function () {
            //spec.addResult("", "");
            spec.displayResults();
            spec.waitForResponse();
        });
    });


    it("should run application on RhoSimulator", function () {
        var spec = new ManualSpec(jasmine, window.document);
        spec.addGoal(jasmine.getEnv().currentSpec.description);
        spec.addPrecondition("run \"rake run:wp8:rhosimulator\" command in CLI");
        spec.addExpectation("Application should get installed and launched with rhosimulator.");
        spec.displayScenario();
        runs(function () {
            //spec.addResult("", "");
            spec.displayResults();
            spec.waitForResponse();
        });
    });

    it("should run all auto test cases with auto_common_spec", function () {
        var spec = new ManualSpec(jasmine, window.document);
        spec.addGoal(jasmine.getEnv().currentSpec.description);
        spec.addPrecondition("auto_common_spec application build and installed with WindowsRT device.");
        spec.addPrecondition('Run auto test for the objects given below:');
        spec.addStep("Application");
        spec.addStep("Database");
        spec.addStep("Log");
        spec.addStep("NativeTabBar");
        spec.addStep("NativeToolBar");
        spec.addStep("ORM and ORMModel");
        spec.addStep("Rhoconnect-client");
        spec.addStep("RhoFile");
        spec.addStep("System");
        spec.addStep("WebView");
        spec.addExpectation("All auto test cases related to the object supported by wp8 should pass.");
        spec.displayScenario();
        runs(function () {
            //spec.addResult("", "");
            spec.displayResults();
            spec.waitForResponse();
        });
    });

    it("should run all manual test cases with manual_common_spec", function () {
        var spec = new ManualSpec(jasmine, window.document);
        spec.addGoal(jasmine.getEnv().currentSpec.description);
        spec.addPrecondition("manual_common_spec application build and installed with WindowsRT device.");
        spec.addPrecondition("Run manual test for the objects given below.");
        spec.addStep("Application");
        spec.addStep("Database");
        spec.addStep("Log");
        spec.addStep("NativeTabBar");
        spec.addStep("NativeToolBar");
        spec.addStep("ORM and ORMModel");
        spec.addStep("Rhoconnect-client");
        spec.addStep("RhoFile");
        spec.addStep("System");
        spec.addStep("WebView");
        spec.addExpectation("All manual test cases related to the object supported by wp8 should pass");
        spec.displayScenario();
        runs(function () {
            //spec.addResult("", "");
            spec.displayResults();
            spec.waitForResponse();
        });
    });
});