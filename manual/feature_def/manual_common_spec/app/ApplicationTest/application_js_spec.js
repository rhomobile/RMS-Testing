describe("Application manual specs", function () {

	// The below test should be in pure manual
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
