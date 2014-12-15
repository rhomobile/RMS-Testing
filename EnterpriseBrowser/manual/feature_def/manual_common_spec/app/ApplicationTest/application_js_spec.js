describe("Application manual specs", function () {

    it("Property \"appBundleFolder\" should return path to folder of application bundle", function () {
        var spec = new ManualSpec(jasmine, window.document);
        spec.addGoal(jasmine.getEnv().currentSpec.description);
        spec.addExpectation("String ends with \"path/manual_common_spec/app\"");
        spec.displayScenario();
        runs(function () {
            spec.addResult("Property \"appBundleFolder\"", EB.Application.appBundleFolder);
            spec.displayResults();
            spec.waitForResponse();
        });
    });

    it("Property \"appsBundleFolder\"", function () {
        var spec = new ManualSpec(jasmine, window.document);
        spec.addGoal("Property \"appsBundleFolder\" should return path to folder of application bundle");
        spec.addExpectation("String ends with \"path/manual_common_spec\"");
        spec.displayScenario();
        runs(function () {
            spec.addResult("Property \"appBundleFolder\"", EB.Application.appsBundleFolder);
            spec.displayResults();
            spec.waitForResponse();
        });
    });

    if (isWindowsMobilePlatform()) {
        it("Property \"badLinkURI\"", function () {
            var spec = new ManualSpec(jasmine, window.document);
            spec.addGoal("Property \"badLinkURI\" should return bad link URI to navigate in browser");
            spec.addExpectation("It must be same as defined in config.xml: Navigation\\BadLinkURI");
            spec.displayScenario();
            runs(function () {
                spec.addResult("Property \"badLinkURI\"", EB.Application.badLinkURI);
                spec.displayResults();
                spec.waitForResponse();
            });
        });
    }

    it("Property \"configPath\"", function () {
        var spec = new ManualSpec(jasmine, window.document);
        spec.addGoal("Property \"configPath\" should return path to the configuration file");
        spec.addExpectation("String ends with \"path/manual_common_spec/rhoconfig.txt\"");
        spec.displayScenario();
        runs(function () {
            spec.addResult("Property \"configPath\"", EB.Application.configPath);
            spec.displayResults();
            spec.waitForResponse();
        });
    });

    it("Property \"appName\"", function () {
        var spec = new ManualSpec(jasmine, window.document);
        spec.addGoal("Property \"appName\" should return application name");
        spec.addExpectation("Some string");
        spec.displayScenario();
        runs(function () {
            spec.addResult("Property \"appName\"", EB.Application.appName);
            spec.displayResults();
            spec.waitForResponse();
        });
    });

    it("Property \"publicFolder\"", function () {
        var spec = new ManualSpec(jasmine, window.document);
        spec.addGoal("Property \"publicFolder\" should return path to public folder in application folder");
        spec.addExpectation("String ends with \"path/manual_common_spec/public\"");
        spec.displayScenario();
        runs(function () {
            spec.addResult("Property \"publicFolder\"", EB.Application.publicFolder);
            spec.displayResults();
            spec.waitForResponse();
        });
    });

    it("Property \"settingsPageURI\"", function () {
        var spec = new ManualSpec(jasmine, window.document);
        spec.addGoal("Property \"settingsPageURI\" should return settings page URI");
        spec.addExpectation("Some string like \"path/settings.html\"");
        spec.displayScenario();
        runs(function () {
            spec.addResult("Property \"settingsPageURI\"", EB.Application.settingsPageURI);
            spec.displayResults();
            spec.waitForResponse();
        });
    });

    it("Property \"splash\"", function () {
        var spec = new ManualSpec(jasmine, window.document);
        spec.addGoal("Property \"splash\" should return splash screen image display options");
        spec.addExpectation("String with one or several parameters divided by \";\": delay=5;center;hcenter;vcenter;vzoom;hzoom;zoom");
        spec.displayScenario();
        runs(function () {
            spec.addResult("Property \"splash\"", EB.Application.splash);
            spec.displayResults();
            spec.waitForResponse();
        });
    });

    it("Property \"startURI\"", function () {
        var spec = new ManualSpec(jasmine, window.document);
        spec.addGoal("Property \"startURI\" should return startup page for application.");
        spec.addExpectation("Path to URI with value of parameter \"start_path\" in \"rhoconfig.txt\"");
        spec.displayScenario();
        runs(function () {
            spec.addResult("Property \"startURI\"", EB.Application.startURI);
            spec.displayResults();
            spec.waitForResponse();
        });
    });

    it("Property \"userFolder\"", function () {
        var spec = new ManualSpec(jasmine, window.document);
        spec.addGoal("Property \"userFolder\" should return path to user folder");
        spec.addExpectation("Some path");
        spec.displayScenario();
        runs(function () {
            spec.addResult("Property \"userFolder\"", EB.Application.userFolder);
            spec.displayResults();
            spec.waitForResponse();
        });
    });

    it("Property \"version\"", function () {
        var spec = new ManualSpec(jasmine, window.document);
        spec.addGoal("Property \"version\" should return version from build time configuration file (build.yml)");
        spec.addExpectation("Value of parameter \"version\" in build.yml");
        spec.displayScenario();
        runs(function () {
            spec.addResult("Property \"version\"", EB.Application.version);
            spec.displayResults();
            spec.waitForResponse();
        });
    });


    it("Property \"databaseBlobFolder\"", function () {
        var spec = new ManualSpec(jasmine, window.document);
        spec.addGoal("Property \"databaseBlobFolder\" should return path to folder where the database blob files are stored");
        spec.addExpectation("Some path like \"path/db/db-files\"");
        spec.displayScenario();
        runs(function () {
            spec.addResult("Method \"databaseBlobFolder\"", EB.Application.databaseBlobFolder);
            spec.displayResults();
            spec.waitForResponse();
        });
    });

    it("Property \"modelsManifestPath\"", function () {
        var spec = new ManualSpec(jasmine, window.document);
        spec.addGoal("Property \"modelsManifestPath\" should return path to file with the model list");
        spec.addExpectation("Some path like \"path/manual_common_spec/app_manifest.txt\"");
        spec.displayScenario();
        runs(function () {
            spec.addResult("Property \"modelsManifestPath\"", EB.Application.modelsManifestPath);
            spec.displayResults();
            spec.waitForResponse();
        });
    });

    it("Property \"securityTokenNotPassed\" should return false if security token don't specified at build.yml", function () {
        var spec = new ManualSpec(jasmine, window.document);
        spec.addGoal(jasmine.getEnv().currentSpec.description);
        spec.addPrecondition("Security token shouldn't be specified in the build.yml");
        spec.addExpectation("Property \"securityTokenNotPassed\" should return false");
        spec.displayScenario();
        runs(function () {
            spec.addResult("Property \"securityTokenNotPassed\"", EB.Application.securityTokenNotPassed);
            spec.displayResults();
            spec.waitForResponse();
        });
    });

    it("Property \"securityTokenNotPassed\" should return false if security token exists, but it don't specified at parameters", function () {
        var spec = new ManualSpec(jasmine, window.document);
        spec.addGoal(jasmine.getEnv().currentSpec.description);
        spec.addPrecondition("Security token should be specified in the build.yml");
        spec.addPrecondition("Security token shouldn't be listed at parameters");
        spec.addExpectation("Property \"securityTokenNotPassed\" should return false");
        spec.displayScenario();
        runs(function () {
            spec.addResult("Property \"securityTokenNotPassed\"", EB.Application.securityTokenNotPassed);
            spec.displayResults();
            spec.waitForResponse();
        });
    });



    /* Ruby only
     it ("|get defaultNative menu", function() {
     var data = EB.Application.defaultNativeMenu;
     displayResult("|get defaultNative menu",data);
     });

     it ("|get default Application Locale", function() {
     var data = EB.Application.locale;
     displayResult("|get default Application Locale",data);
     });

     it ("|get default Country code", function() {
     var data = EB.Application.country;
     displayResult("|get default Country code",data);
     });

     */

    // Below specs are necessary move to automatic specs
    /*

     it("|Set setting page settingsPageURI:/app/NoSettings ", function () {
     EB.Application.settingsPageURI = '/app/NoSettings';
     var data = EB.Application.settingsPageURI;
     displayResult("|Set setting page settingsPageURI:/app/NoSettings ", data);
     });

     it("|Set settings page to empty string settingsPageURI", function () {
     EB.Application.settingsPageURI = '';
     var data = EB.Application.settingsPageURI;
     displayResult("|Set settings page to empty string settingsPageURI", data);
     });

     it("Property \"databaseFilePath\"", function () {
     var spec = new ManualSpec(jasmine, window.document);
     spec.addGoal("Property \"databaseFilePath\" should return path to database file based partition name");
     spec.addExpectation("String ends with \"manual_common_spec\\myDatabase\"");
     spec.displayScenario();
     spec.waitForButtonPressing("Run test");
     runs(function () {
     spec.addResult("Method \"databaseFilePath(\"myDatabase\")\"", EB.Application.databaseFilePath("myDatabase"));
     spec.displayResults();
     spec.waitForResponse();
     });
     });

     it("|Database File path with Local as Partition", function () {
     var beja = EB.Application.databaseFilePath('local');
     var jija = EB.Application.relativeDatabaseBlobFilePath(beja)
     var data = EB.Application.expandDatabaseBlobFilePath(jija);
     displayResult("|Database File path with Local as Partition", data);
     });

     it("|Database File path with User as Partition", function () {
     var beja = EB.Application.databaseFilePath('user');
     var jija = EB.Application.relativeDatabaseBlobFilePath(beja);
     var jaja = EB.Application.expandDatabaseBlobFilePath(jija);
     var data = EB.Application.relativeDatabaseBlobFilePath(jaja);
     displayResult("|Database File path with User as Partition", data);
     });

     it("|Database File path with No Partition name", function () {
     var data = EB.Application.databaseFilePath('');
     displayResult("|Database File path with No Partition name ", data);
     });

     it("|Database File path with Invalid Partition name", function () {
     var data = EB.Application.databaseFilePath('@$@4324$#2');
     displayResult("|Database File path with Invalid Partition name ", data);
     });


     it("|Model folder path for model : BarcodeTest", function () {
     var data = EB.Application.modelFolderPath('BarcodeTest');
     displayResult("|Model folder path for model : BarcodeTest", data);
     });

     it("|Model folder path WITH NULL", function () {
     var data = EB.Application.modelFolderPath('');
     displayResult("|Model folder path  WITH NULL", data);
     });


     it("|Model folder path with model name that doesn't exist", function () {
     var data = EB.Application.modelFolderPath('idontExist');
     displayResult("|Model folder path model name that doesn't exist", data);
     });

     it("|Relative Database File path for the database file path with local partition", function () {
     var obj = EB.Application.databaseFilePath('local');
     var data = EB.Application.relativeDatabaseBlobFilePath(obj);
     displayResult("|Relative Database File path for the database file path with local partition", data);
     });

     it("|Relative Database File path with null", function () {
     var data = EB.Application.relativeDatabaseBlobFilePath('');
     displayResult("|Relative Database File path with null", data);
     });

     it("|Relative Database File path with Invalid file path", function () {
     var obj = EB.Application.databaseFilePath('local');
     var obj1 = EB.Application.relativeDatabaseBlobFilePath(obj);
     var data = EB.Application.relativeDatabaseBlobFilePath(obj1);
     displayResult("|Relative Database File path with Invalid file path", data);
     });

     it("|Expand Database File path by giving the Relative database File path of Local", function () {
     var obj = EB.Application.databaseFilePath('local');
     var obj1 = EB.Application.relativeDatabaseBlobFilePath(obj);
     var data = EB.Application.expandDatabaseBlobFilePath(obj1);
     displayResult("|Expand Database File path by giving the Relative database File path of Local", data);
     });

     it("|Expand Database File path with null", function () {
     var data = EB.Application.expandDatabaseBlobFilePath('');
     displayResult("|Expand Database File path with null", data);
     });

     it("|Expand Database File path with Invalid file path", function () {
     var obj = EB.Application.databaseFilePath('local');
     var obj1 = EB.Application.expandDatabaseBlobFilePath(obj);
     var data = EB.Application.expandDatabaseBlobFilePath(obj1);
     displayResult("|Expand Database File path with Invalid file path", data);
     });


     */

});
