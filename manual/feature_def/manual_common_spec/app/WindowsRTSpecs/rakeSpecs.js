describe("WindowsRT spec", function () {

    it("should build WindowsRT rhobundle", function () {
        var spec = new ManualSpec(jasmine, window.document);
        spec.addGoal(jasmine.getEnv().currentSpec.description);
        spec.addPrecondition("run \"rake build:wp8:rhobundle_noext\" command in CLI");
        spec.addExpectation("File *** must appears in directory bin/");
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
        spec.addExpectation("And what should happen?");
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
        spec.addExpectation("And what should happen?");
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
        spec.addPrecondition("run \"rake emulator:wp8:production\" command in CLI");
        spec.addExpectation("And what should happen?");
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
        spec.addExpectation("And what should happen?");
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
        spec.addExpectation("And what should happen?");
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
        spec.addExpectation("And what should happen?");
        spec.displayScenario();
        runs(function () {
            //spec.addResult("", "");
            spec.displayResults();
            spec.waitForResponse();
        });
    });


});