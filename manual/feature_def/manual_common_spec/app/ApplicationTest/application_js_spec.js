describe("Application Module Test Starts Here", function () {

    it("Property \"appBundleFolder\"", function () {
        var spec = new ManualSpec(jasmine, window.document);
        spec.addGoal("Property \"appBundleFolder\" should return path to folder of application bundle");
        spec.addExpectation("String ends with \"path/manual_common_spec/app\"");
        spec.displayScenario();
        runs(function () {
            spec.addResult("Property \"appBundleFolder\"", Rho.Application.appBundleFolder);
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
            spec.addResult("Property \"appBundleFolder\"", Rho.Application.appsBundleFolder);
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
                spec.addResult("Property \"badLinkURI\"", Rho.Application.badLinkURI);
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
            spec.addResult("Property \"configPath\"", Rho.Application.configPath);
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
            spec.addResult("Property \"appName\"", Rho.Application.appName);
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
            spec.addResult("Property \"publicFolder\"", Rho.Application.publicFolder);
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
            spec.addResult("Property \"settingsPageURI\"", Rho.Application.settingsPageURI);
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
            spec.addResult("Property \"splash\"", Rho.Application.splash);
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
            spec.addResult("Property \"startURI\"", Rho.Application.startURI);
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
            spec.addResult("Property \"userFolder\"", Rho.Application.userFolder);
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
            spec.addResult("Property \"version\"", Rho.Application.version);
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
            spec.addResult("Method \"databaseBlobFolder\"", Rho.Application.databaseBlobFolder);
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
            spec.addResult("Property \"modelsManifestPath\"", Rho.Application.modelsManifestPath);
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
            spec.addResult("Property \"securityTokenNotPassed\"", Rho.Application.securityTokenNotPassed);
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
            spec.addResult("Property \"securityTokenNotPassed\"", Rho.Application.securityTokenNotPassed);
            spec.displayResults();
            spec.waitForResponse();
        });
    });



    /* Ruby only
     it ("|get defaultNative menu", function() {
     var data = Rho.Application.defaultNativeMenu;
     displayResult("|get defaultNative menu",data);
     });

     it ("|get default Application Locale", function() {
     var data = Rho.Application.locale;
     displayResult("|get default Application Locale",data);
     });

     it ("|get default Country code", function() {
     var data = Rho.Application.country;
     displayResult("|get default Country code",data);
     });

     */

    // Below specs are necessary move to automatic specs
    /*

     it("|Set setting page settingsPageURI:/app/NoSettings ", function () {
     Rho.Application.settingsPageURI = '/app/NoSettings';
     var data = Rho.Application.settingsPageURI;
     displayResult("|Set setting page settingsPageURI:/app/NoSettings ", data);
     });

     it("|Set settings page to empty string settingsPageURI", function () {
     Rho.Application.settingsPageURI = '';
     var data = Rho.Application.settingsPageURI;
     displayResult("|Set settings page to empty string settingsPageURI", data);
     });

     it("Property \"databaseFilePath\"", function () {
     var spec = new ManualSpec(jasmine, window.document);
     spec.addGoal("Property \"databaseFilePath\" should return path to database file based partition name");
     spec.addExpectation("String ends with \"manual_common_spec\\myDatabase\"");
     spec.displayScenario();
     spec.waitForButtonPressing("Run test");
     runs(function () {
     spec.addResult("Method \"databaseFilePath(\"myDatabase\")\"", Rho.Application.databaseFilePath("myDatabase"));
     spec.displayResults();
     spec.waitForResponse();
     });
     });

     it("|Database File path with Local as Partition", function () {
     var beja = Rho.Application.databaseFilePath('local');
     var jija = Rho.Application.relativeDatabaseBlobFilePath(beja)
     var data = Rho.Application.expandDatabaseBlobFilePath(jija);
     displayResult("|Database File path with Local as Partition", data);
     });

     it("|Database File path with User as Partition", function () {
     var beja = Rho.Application.databaseFilePath('user');
     var jija = Rho.Application.relativeDatabaseBlobFilePath(beja);
     var jaja = Rho.Application.expandDatabaseBlobFilePath(jija);
     var data = Rho.Application.relativeDatabaseBlobFilePath(jaja);
     displayResult("|Database File path with User as Partition", data);
     });

     it("|Database File path with No Partition name", function () {
     var data = Rho.Application.databaseFilePath('');
     displayResult("|Database File path with No Partition name ", data);
     });

     it("|Database File path with Invalid Partition name", function () {
     var data = Rho.Application.databaseFilePath('@$@4324$#2');
     displayResult("|Database File path with Invalid Partition name ", data);
     });


     it("|Model folder path for model : BarcodeTest", function () {
     var data = Rho.Application.modelFolderPath('BarcodeTest');
     displayResult("|Model folder path for model : BarcodeTest", data);
     });

     it("|Model folder path WITH NULL", function () {
     var data = Rho.Application.modelFolderPath('');
     displayResult("|Model folder path  WITH NULL", data);
     });


     it("|Model folder path with model name that doesn't exist", function () {
     var data = Rho.Application.modelFolderPath('idontExist');
     displayResult("|Model folder path model name that doesn't exist", data);
     });

     it("|Relative Database File path for the database file path with local partition", function () {
     var obj = Rho.Application.databaseFilePath('local');
     var data = Rho.Application.relativeDatabaseBlobFilePath(obj);
     displayResult("|Relative Database File path for the database file path with local partition", data);
     });

     it("|Relative Database File path with null", function () {
     var data = Rho.Application.relativeDatabaseBlobFilePath('');
     displayResult("|Relative Database File path with null", data);
     });

     it("|Relative Database File path with Invalid file path", function () {
     var obj = Rho.Application.databaseFilePath('local');
     var obj1 = Rho.Application.relativeDatabaseBlobFilePath(obj);
     var data = Rho.Application.relativeDatabaseBlobFilePath(obj1);
     displayResult("|Relative Database File path with Invalid file path", data);
     });

     it("|Expand Database File path by giving the Relative database File path of Local", function () {
     var obj = Rho.Application.databaseFilePath('local');
     var obj1 = Rho.Application.relativeDatabaseBlobFilePath(obj);
     var data = Rho.Application.expandDatabaseBlobFilePath(obj1);
     displayResult("|Expand Database File path by giving the Relative database File path of Local", data);
     });

     it("|Expand Database File path with null", function () {
     var data = Rho.Application.expandDatabaseBlobFilePath('');
     displayResult("|Expand Database File path with null", data);
     });

     it("|Expand Database File path with Invalid file path", function () {
     var obj = Rho.Application.databaseFilePath('local');
     var obj1 = Rho.Application.expandDatabaseBlobFilePath(obj);
     var data = Rho.Application.expandDatabaseBlobFilePath(obj1);
     displayResult("|Expand Database File path with Invalid file path", data);
     });


     */

});
