describe('Developer Experience - Rho Component Installer Functionality Test', function() {
    it("rho command should be enabled on installing Standalone package", function() {
        var spec = new ManualSpec(jasmine, window.document);
        spec.addGoal("rho command should be enabled on installing Standalone package");
        spec.addStep("Download the Standalone package.");
        spec.addStep("Extract the package.");
        spec.addStep("Register rho command into PATH.");
        spec.addStep("Run rho command.");
        spec.addExpectation("rho command should be enabled.");
        spec.displayScenario();
        spec.waitForButtonPressing("Run test");
        spec.waitForResponse();
    });

    it("rho command should be enabled on installing Ruby installation", function() {
        var spec = new ManualSpec(jasmine, window.document);
        spec.addGoal("rho command should be enabled on installing Ruby installation");
        spec.addStep("Install Ruby 1.9+");
        spec.addStep("Install rho by using gem install rho");
        spec.addStep("Run rho command.");
        spec.addExpectation("Installs latest version of rhodes framework into Ruby");
        spec.addExpectation("rho command should be enabled.");
        spec.displayScenario();
        spec.waitForButtonPressing("Run test");
        spec.waitForResponse();
    });

    it("rho command should be enabled on installing nodejs installation", function() {
        var spec = new ManualSpec(jasmine, window.document);
        spec.addGoal("rho command should be enabled on installing nodejs installation");
        spec.addStep("Install Node.js 0.10+.");
        spec.addStep("Install rho by using npm install rho -g");
        spec.addStep("Run rho command.");
        spec.addExpectation("Installs latest version of rhodes framework into Node.js");
        spec.addExpectation("rho command should be enabled.");
        spec.displayScenario();
        spec.waitForButtonPressing("Run test");
        spec.waitForResponse();
    });

    it("Should print list of available commands", function() {
        var spec = new ManualSpec(jasmine, window.document);
        spec.addGoal("Should print list of available commands");
        spec.addPrecondition("Install Rhodes framework to enable rho command.");
        spec.addStep("Run command rho help");
        spec.addExpectation("Should print list of available commands in rho.");
        spec.displayScenario();
        spec.waitForButtonPressing("Run test");
        spec.waitForResponse();
    });

    it("Should print help on the given command.", function() {
        var spec = new ManualSpec(jasmine, window.document);
        spec.addGoal("Should print help on the given command.");
        spec.addPrecondition("Install Rhodes framework to enable rho command.");
        spec.addStep("Run command rho help <command>");
        spec.addExpectation("Should print help on given command in rho.");
        spec.displayScenario();
        spec.waitForButtonPressing("Run test");
        spec.waitForResponse();
    });

    it("Should print rho version", function() {
        var spec = new ManualSpec(jasmine, window.document);
        spec.addGoal("Should print rho version");
        spec.addPrecondition("Install Rhodes framework to enable rho command.");
        spec.addStep("Run command rho version.");
        spec.addExpectation("Should print rho version.");
        spec.displayScenario();
        spec.waitForButtonPressing("Run test");
        spec.waitForResponse();
    });

    it("Should list available/installed packages", function() {
        var spec = new ManualSpec(jasmine, window.document);
        spec.addGoal("Should list available/installed packages");
        spec.addPrecondition("Install Rhodes framework to enable rho command.");
        spec.addStep("Run command rho list_packages");
        spec.addExpectation("Should list available packages to install.");
        spec.addExpectation("Should list installed packages.");
        spec.displayScenario();
        spec.waitForButtonPressing("Run test");
        spec.waitForResponse();
    });

    it("Manually installing package", function() {
        var spec = new ManualSpec(jasmine, window.document);
        spec.addGoal("Manually installing package");
        spec.addPrecondition("Install Rhodes framework to enable rho command.");
        spec.addStep("Run command rho list_packages.");
        spec.addStep("From the available packages list install rho install <package> (rhosimulator, rhoelements, rhoconnect-client, rhodes-containers, liveupdate)");
        spec.addStep("Now run Command rho list_packages.");
        spec.addExpectation("After installing package should list in installed packages list.");
        spec.displayScenario();
        spec.waitForButtonPressing("Run test");
        spec.waitForResponse();
    });

    it("Should login into rhomobile.com with rho token:login", function() {
        var spec = new ManualSpec(jasmine, window.document);
        spec.addGoal("Should login into rhomobile.com with rho token:login");
        spec.addPrecondition("Install Rhodes framework to enable rho command.");
        spec.addPrecondition("Make sure token is not set.");
        spec.addPrecondition("Make sure have subscription profile in rhohub.com");
        spec.addPrecondition("Make sure network connection is present on your machine");
        spec.addStep("Open command prompt.");
        spec.addStep("Run rho token:login");
        spec.addStep("Enter valid username and password.");
        spec.addStep("Build the application and check for asking rhohub login or not");
        spec.addExpectation("Login to rhomobile.com should be successfull.");
        spec.addExpectation("Build System should not ask for subscription key while building application.");
        spec.displayScenario();
        spec.waitForButtonPressing("Run test");
        spec.waitForResponse();
    });

    it("Cancelling login into rhomobile.com with rho token:login", function() {
        var spec = new ManualSpec(jasmine, window.document);
        spec.addGoal("Cancelling login into rhomobile.com with rho token:login");
        spec.addPrecondition("Install Rhodes framework to enable rho command.");
        spec.addPrecondition("Make sure token is not set.");
        spec.addPrecondition("Make sure have subscription profile in rhohub.com");
        spec.addPrecondition("Make sure network connection is present on your machine");
        spec.addStep("Open command prompt.");
        spec.addStep("Run rho token:login");
        spec.addStep("Don\'t provide any details and cancel the login");
        spec.addStep("Build the application and check for asking rhohub login or not");
        spec.addExpectation("Should be able to cancel the rhomobile.com login request successfully without providing valid data.");
        spec.addExpectation("Build System should ask for subscription key while building application as rhomobile.com login is not done.");
        spec.displayScenario();
        spec.waitForButtonPressing("Run test");
        spec.waitForResponse();
    });

    it("rho token:login with proxy network", function() {
        var spec = new ManualSpec(jasmine, window.document);
        spec.addGoal("rho token:login with proxy network");
        spec.addPrecondition("Install Rhodes framework to enable rho command.");
        spec.addPrecondition("Make sure token is not set.");
        spec.addPrecondition("Make sure have subscription profile in rhohub.com");
        spec.addPrecondition("Make sure network connection is present on your machine and with proper proxy setup.");
        spec.addStep("Open command prompt.");
        spec.addStep("Run rho token:login");
        spec.addStep("Enter valid username and password.");
        spec.addStep("Build the application and check for asking rhohub login or not.");
        spec.addExpectation("Login to rhomobile.com should be successfull with the proxy network.");
        spec.addExpectation("Build System should not ask for subscription key while building application.");
        spec.displayScenario();
        spec.waitForButtonPressing("Run test");
        spec.waitForResponse();
    });

    it("Build Rhodes application in without network after rho token:login", function() {
        var spec = new ManualSpec(jasmine, window.document);
        spec.addGoal("Build Rhodes application in without network after rho token:login");
        spec.addPrecondition("Install Rhodes framework to enable rho command.");
        spec.addPrecondition("Make sure token is not set.");
        spec.addPrecondition("Make sure have subscription profile in rhohub.com");
        spec.addPrecondition("Make sure network connection is present on your machine");
        spec.addStep("In commad prompt rho token:login");
        spec.addStep("Provide rhombile.com login credentials.");
        spec.addStep("Disconnect the network");
        spec.addStep("Build the application again and check for login warning");
        spec.addExpectation("When build the application without network should not ask for login details again once login is done successfully.");
        spec.displayScenario();
        spec.waitForButtonPressing("Run test");
        spec.waitForResponse();
    });

    it("rho token:login without network", function() {
        var spec = new ManualSpec(jasmine, window.document);
        spec.addGoal("rho token:login without network");
        spec.addPrecondition("Install Rhodes framework to enable rho command.");
        spec.addPrecondition("Make sure token is not set.");
        spec.addPrecondition("Make sure have subscription profile in rhohub.com");
        spec.addStep("Disconnect the network on machine");
        spec.addStep("Run the command rho token:login");
        spec.addStep("Provide rhomobile.com login credentials.");
        spec.addExpectation("Login should be failed without network with proper error messages.");
        spec.displayScenario();
        spec.waitForButtonPressing("Run test");
        spec.waitForResponse();
    });

    it("Should display rhomobile.com token info", function() {
        var spec = new ManualSpec(jasmine, window.document);
        spec.addGoal("Should display rhomobile.com token info");
        spec.addPrecondition("Install Rhodes framework to enable rho command.");
        spec.addPrecondition("Make sure token is not set.");
        spec.addPrecondition("Make sure have subscription profile in rhohub.com");
        spec.addPrecondition("Make sure network connection is present on your machine");
        spec.addStep("Set the token with rho token:login");
        spec.addStep("Run the command rho token:info");
        spec.addStep("Check for the output.");
        spec.addExpectation("Should display rhomobile.com token info");
        spec.displayScenario();
        spec.waitForButtonPressing("Run test");
        spec.waitForResponse();
    });

    it("token:info after clearing token", function() {
        var spec = new ManualSpec(jasmine, window.document);
        spec.addGoal("token:info after clearing token");
        spec.addPrecondition("Install Rhodes framework to enable rho command.");
        spec.addPrecondition("Make sure token is not set.");
        spec.addPrecondition("Make sure have subscription profile in rhohub.com");
        spec.addPrecondition("Make sure network connection is present on your machine");
        spec.addStep("Clear the already set token with rho token:clear");
        spec.addStep("Run the command rho token:info");
        spec.addStep("Check for the output");
        spec.addExpectation("Should return warning that token has not set.");
        spec.displayScenario();
        spec.waitForButtonPressing("Run test");
        spec.waitForResponse();
    });

    it("token:info without network", function() {
        var spec = new ManualSpec(jasmine, window.document);
        spec.addGoal("token:info without network");
        spec.addPrecondition("Install Rhodes framework to enable rho command.");
        spec.addPrecondition("Make sure token is not set.");
        spec.addPrecondition("Make sure have subscription profile in rhohub.com");
        spec.addStep("Set the token with rho token:login with valid credentials.");
        spec.addStep("Disconnect the network");
        spec.addStep("Run the command rho token:info");
        spec.addStep("Check for the output");
        spec.addExpectation("Should return valid information on token without having in network");
        spec.displayScenario();
        spec.waitForButtonPressing("Run test");
        spec.waitForResponse();
    });

    it("Log out from the rhomobile.com", function() {
        var spec = new ManualSpec(jasmine, window.document);
        spec.addGoal("Log out from the rhomobile.com");
        spec.addPrecondition("Install Rhodes framework to enable rho command.");
        spec.addPrecondition("Make sure token is set.");
        spec.addStep("Log out from rhomobile.com by rho token:clear");
        spec.addStep("Build the application and check for asking rhohub login or not");
        spec.addExpectation("Should clear the token.");
        spec.addExpectation("While building application should ask for login into rhomobile.com");
        spec.displayScenario();
        spec.waitForButtonPressing("Run test");
        spec.waitForResponse();
    });

    it("Should create rhodes application", function() {
        var spec = new ManualSpec(jasmine, window.document);
        spec.addGoal("Should create rhodes application");
        spec.addPrecondition("Install Rhodes framework to enable rho command.");
        spec.addPrecondition("Make sure token is set.");
        spec.addStep("In command prompt run rho app <app_name>.");
        spec.addExpectation("Should create rhodes application ");
        spec.displayScenario();
        spec.waitForButtonPressing("Run test");
        spec.waitForResponse();
    });

    it("Should not create rhodes application with special characters", function() {
        var spec = new ManualSpec(jasmine, window.document);
        spec.addGoal("Should not create rhodes application with special characters");
        spec.addPrecondition("Install Rhodes framework to enable rho command.");
        spec.addPrecondition("Make sure token is set.");
        spec.addStep("In command prompt run rho app <app_name !@#$%^> with special characters.");
        spec.addExpectation("Should not create rhodes application with speacial characters.");
        spec.addExpectation("Should return nonzero.");
        spec.displayScenario();
        spec.waitForButtonPressing("Run test");
        spec.waitForResponse();
    });

    it("Should create rhoelements application", function() {
        var spec = new ManualSpec(jasmine, window.document);
        spec.addGoal("Should create rhoelements application");
        spec.addPrecondition("Install Rhodes framework to enable rho command.");
        spec.addPrecondition("Make sure token is set.");
        spec.addStep("In command prompt run rho app:rhoelements <app_name>.");
        spec.addExpectation("Should create rhoelements application ");
        spec.displayScenario();
        spec.waitForButtonPressing("Run test");
        spec.waitForResponse();
    });

    it("Should not create rhoelements application with special characters", function() {
        var spec = new ManualSpec(jasmine, window.document);
        spec.addGoal("Should not create rhoelements application with special characters");
        spec.addPrecondition("Install Rhodes framework to enable rho command.");
        spec.addPrecondition("Make sure token is set.");
        spec.addStep("In command prompt run rho app:rhoelements <app_name !@#$%^> with special characters.");
        spec.addExpectation("Should not create rhoelements application with speacial characters.");
        spec.addExpectation("Should return nonzero.");
        spec.displayScenario();
        spec.waitForButtonPressing("Run test");
        spec.waitForResponse();
    });

    it("Should add extension to application", function() {
        var spec = new ManualSpec(jasmine, window.document);
        spec.addGoal("Should add extension to application");
        spec.addPrecondition("Install Rhodes framework to enable rho command.");
        spec.addPrecondition("Make sure token is set.");
        spec.addStep("Create Rhodes or Rhoelements application with  rho app <app_name> or rho app:rhoelements <app_name>.");
        spec.addStep("In application, add extension by rho add:extension <extension_name>");
        spec.addExpectation("Should create rhoelements/rhodes application.");
        spec.addExpectation("Should add extension to application.");
        spec.displayScenario();
        spec.waitForButtonPressing("Run test");
        spec.waitForResponse();
    });

    it("Shoud not add extension to application with special characters", function() {
        var spec = new ManualSpec(jasmine, window.document);
        spec.addGoal("Shoud not add extension to application with special characters");
        spec.addPrecondition("Install Rhodes framework to enable rho command.");
        spec.addPrecondition("Make sure token is set.");
        spec.addStep("Create Rhodes or Rhoelements application with  rho app <app_name> or rho app:rhoelements <app_name>.");
        spec.addStep("In application, add extension by rho add:extension <extension_name !@#$%^> with special characters");
        spec.addExpectation("Should create rhoelements/rhodes application.");
        spec.addExpectation("Should not add extension to application with special characters.");
        spec.addExpectation("Should return nonzero.");
        spec.displayScenario();
        spec.waitForButtonPressing("Run test");
        spec.waitForResponse();
    });

    it("Should add model to application", function() {
        var spec = new ManualSpec(jasmine, window.document);
        spec.addGoal("Should add model to application");
        spec.addPrecondition("Install Rhodes framework to enable rho command.");
        spec.addPrecondition("Make sure token is set.");
        spec.addStep("Create Rhodes or Rhoelements application with  rho app <app_name> or rho app:rhoelements <app_name>.");
        spec.addStep("In application, add model by rho add:model <model_name> <model_attributes>");
        spec.addExpectation("Should create rhoelements/rhodes application.");
        spec.addExpectation("Should add model to application.");
        spec.displayScenario();
        spec.waitForButtonPressing("Run test");
        spec.waitForResponse();
    });

    it("Shoud not add model to application with special characters", function() {
        var spec = new ManualSpec(jasmine, window.document);
        spec.addGoal("Shoud not add model to application with special characters");
        spec.addPrecondition("Install Rhodes framework to enable rho command.");
        spec.addPrecondition("Make sure token is set.");
        spec.addStep("Create Rhodes or Rhoelements application with  rho app <app_name> or rho app:rhoelements <app_name>.");
        spec.addStep("In application, add extension by rho add:model <model_name!@#$%^> <model_attributes> with special characters");
        spec.addExpectation("Should create rhoelements/rhodes application.");
        spec.addExpectation("Should not add model to application with special characters.");
        spec.addExpectation("Should return nonzero.");
        spec.displayScenario();
        spec.waitForButtonPressing("Run test");
        spec.waitForResponse();
    });

    it("Should add spec to application", function() {
        var spec = new ManualSpec(jasmine, window.document);
        spec.addGoal("Should add spec to application");
        spec.addPrecondition("Install Rhodes framework to enable rho command.");
        spec.addPrecondition("Make sure token is set.");
        spec.addStep("Create Rhodes or Rhoelements application with  rho app <app_name> or rho app:rhoelements <app_name>.");
        spec.addStep("In application, add spec by rho add:spec");
        spec.addExpectation("Should create rhoelements/rhodes application.");
        spec.addExpectation("Should add spec to application");
        spec.displayScenario();
        spec.waitForButtonPressing("Run test");
        spec.waitForResponse();
    });

    it("Should build for WM in cloud by rho cloud:build:wm:production", function() {
        var spec = new ManualSpec(jasmine, window.document);
        spec.addGoal("Should build for WM in cloud by rho cloud:build:wm:production");
        spec.addPrecondition("Install Rhodes framework to enable rho command.");
        spec.addPrecondition("Make sure token is not set.");
        spec.addPrecondition("Make sure application has been pushed to rhohub git successfully.");
        spec.addStep("Go to the Root folder of application which is there in RhoHub");
        spec.addStep("Run the command rho cloud:build:wm:production for WM");
        spec.addStep("Check for the messages in command line");
        spec.addExpectation("Should ask for cloud login credentials.");
        spec.addExpectation("After successfull cloud login, should build the application for WM in cloud.");
        spec.addExpectation("There should not be any misleading messages show in command line.");
        spec.displayScenario();
        spec.waitForButtonPressing("Run test");
        spec.waitForResponse();
    });

    it("Should build for Android in cloud by rho cloud:build:android:production", function() {
        var spec = new ManualSpec(jasmine, window.document);
        spec.addGoal("Should build for Android in cloud by rho cloud:build:android:production");
        spec.addPrecondition("Install Rhodes framework to enable rho command.");
        spec.addPrecondition("Make sure token is not set.");
        spec.addPrecondition("Make sure application has been pushed to rhohub git successfully.");
        spec.addStep("Go to the Root folder of application which is there in RhoHub");
        spec.addStep("Run the command rho cloud:build:android:production for Android");
        spec.addStep("Check for the messages in command line");
        spec.addExpectation("Should ask for cloud login credentials.");
        spec.addExpectation("After successfull cloud login, should build the application for Android in cloud.");
        spec.addExpectation("There should not be any misleading messages show in command line.");
        spec.displayScenario();
        spec.waitForButtonPressing("Run test");
        spec.waitForResponse();
    });

    it("Should build iPhone development build in cloud by rho cloud:build:iphone:development", function() {
        var spec = new ManualSpec(jasmine, window.document);
        spec.addGoal("Should build iPhone development build in cloud by rho cloud:build:iphone:development");
        spec.addPrecondition("Install Rhodes framework to enable rho command.");
        spec.addPrecondition("Make sure token is not set.");
        spec.addPrecondition("Make sure IOS certificate/provision setup done for IOS build.");
        spec.addPrecondition("Make sure application has been pushed to rhohub git successfully.");
        spec.addStep("Go to the Root folder of application which is there in RhoHub");
        spec.addStep("Run the command rho cloud:build:iphone:development for iPhone development.");
        spec.addStep("Check for the messages in command line");
        spec.addExpectation("Should ask for cloud login credentials.");
        spec.addExpectation("After successfull cloud login, should build the application for iPhone development in cloud.");
        spec.addExpectation("There should not be any misleading messages show in command line.");
        spec.displayScenario();
        spec.waitForButtonPressing("Run test");
        spec.waitForResponse();
    });

    it("Should build iPhone Distribution build in cloud by rho cloud:build:iphone:distribution", function() {
        var spec = new ManualSpec(jasmine, window.document);
        spec.addGoal("Should build iPhone Distribution build in cloud by rho cloud:build:iphone:distribution");
        spec.addPrecondition("Install Rhodes framework to enable rho command.");
        spec.addPrecondition("Make sure token is not set.");
        spec.addPrecondition("Make sure IOS certificate/provision setup done for IOS build.");
        spec.addPrecondition("Make sure application has been pushed to rhohub git successfully.");
        spec.addStep("Go to the Root folder of application which is there in RhoHub");
        spec.addStep("Run the command rho cloud:build:iphone:distribution for iPhone distribution.");
        spec.addStep("Check for the messages in command line");
        spec.addExpectation("Should ask for cloud login credentials.");
        spec.addExpectation("After successfull cloud login, should build the application for iPhone distribution in cloud.");
        spec.addExpectation("There should not be any misleading messages show in command line.");
        spec.displayScenario();
        spec.waitForButtonPressing("Run test");
        spec.waitForResponse();
    });

    it("Should build for 2 different application in cloud at same time", function() {
        var spec = new ManualSpec(jasmine, window.document);
        spec.addGoal("Should build for 2 different application in cloud at same time");
        spec.addPrecondition("Install Rhodes framework to enable rho command.");
        spec.addPrecondition("Make sure token is set.");
        spec.addPrecondition("Make sure IOS certificate/provision setup done for IOS build.");
        spec.addPrecondition("Make sure application has been pushed to rhohub git successfully.");
        spec.addStep("Go to the Root folder of application which is there in RhoHub.");
        spec.addStep("Run the command rho cloud:build:android:production for Android");
        spec.addStep("In another command prompt run rho cloud:build:wm:production for WM in cloud.");
        spec.addStep("Check for the messages in command line");
        spec.addExpectation("Should build the application for WM and android in cloud.");
        spec.addExpectation("There should not be any misleading messages show in command line.");
        spec.displayScenario();
        spec.waitForButtonPressing("Run test");
        spec.waitForResponse();
    });

    it("Should throw error while building more than 2 builds at same time in cloud", function() {
        var spec = new ManualSpec(jasmine, window.document);
        spec.addGoal("Should throw error while building more than 2 builds at same time in cloud");
        spec.addPrecondition("Install Rhodes framework to enable rho command.");
        spec.addPrecondition("Make sure token is set.");
        spec.addPrecondition("Make sure IOS certificate/provision setup done for IOS build.");
        spec.addPrecondition("Make sure application has been pushed to rhohub git successfully.");
        spec.addStep("Go to the Root folder of application which is there in RhoHub.");
        spec.addStep("Run the command rho cloud:build:android:production for Android");
        spec.addStep("In another command prompt run rho cloud:build:wm:production for WM in cloud.");
        spec.addStep("In another command prompt run rho cloud:build:wm:production for WM in cloud.");
        spec.addStep("Check for the messages in command line.");
        spec.addExpectation("Should throw proper error message \'could not start build\' while building more than 2 builds at same time in cloud");
        spec.displayScenario();
        spec.waitForButtonPressing("Run test");
        spec.waitForResponse();
    });

    it("Should throw proper error while cloud building in no network", function() {
        var spec = new ManualSpec(jasmine, window.document);
        spec.addGoal("Should throw proper error while cloud building in no network");
        spec.addPrecondition("Install Rhodes framework to enable rho command.");
        spec.addPrecondition("Make sure token is set.");
        spec.addPrecondition("Make sure IOS certificate/provision setup done for IOS build.");
        spec.addPrecondition("Make sure application has been pushed to rhohub git successfully.");
        spec.addStep("Disconnect network.");
        spec.addStep("Go to the Root folder of application which is there in RhoHub.");
        spec.addStep("Run the command rho cloud:build:android:production for Android or run rho cloud:build:wm:production for WM in cloud or run rho cloud:build:iphone:development for iPhone development.");
        spec.addStep("Check for the messages in command line");
        spec.addExpectation("Should throw proper network error message while cloud building in no network.");
        spec.displayScenario();
        spec.waitForButtonPressing("Run test");
        spec.waitForResponse();
    });

    it("Should throw proper error on running cloud build commands for application which is not in RhoHub but in Git", function() {
        var spec = new ManualSpec(jasmine, window.document);
        spec.addGoal("Should throw proper error on running cloud build commands for application which is not in RhoHub but in Git");
        spec.addPrecondition("Install Rhodes framework to enable rho command.");
        spec.addPrecondition("Make sure token is set.");
        spec.addStep("Go to the Root folder of application which is there in Github.");
        spec.addStep("Run the command rho cloud:build:android:production for Android or run rho cloud:build:wm:production for WM in cloud or run rho cloud:build:iphone:development for iPhone development.");
        spec.addStep("Check for the messages in command line");
        spec.addExpectation("Should return proper error message saying \'Current project folder is not supported by rhohub cloud build system\'");
        spec.displayScenario();
        spec.waitForButtonPressing("Run test");
        spec.waitForResponse();
    });

    it("Should throw proper error on running cloud build commands for application which is not in RhoHub or Git", function() {
        var spec = new ManualSpec(jasmine, window.document);
        spec.addGoal("Should throw proper error on running cloud build commands for application which is not in RhoHub or Git");
        spec.addPrecondition("Install Rhodes framework to enable rho command.");
        spec.addPrecondition("Make sure token is set.");
        spec.addStep("Go to the local Root folder of application.");
        spec.addStep("Run the command rho cloud:build:android:production for Android or run rho cloud:build:wm:production for WM in cloud or run rho cloud:build:iphone:development for iPhone development.");
        spec.addStep("Check for the messages in command line");
        spec.addExpectation("Should return proper error message saying \'Application folder is not tracked by git\'");
        spec.displayScenario();
        spec.waitForButtonPressing("Run test");
        spec.waitForResponse();
    });

    it("Should build for WM and download rho cloud:download", function() {
        var spec = new ManualSpec(jasmine, window.document);
        spec.addGoal("Should build for WM and download rho cloud:download");
        spec.addPrecondition("Install Rhodes framework to enable rho command.");
        spec.addPrecondition("Make sure token is set.");
        spec.addPrecondition("Make sure application has been pushed to rhohub git successfully.");
        spec.addStep("Go to the Root folder of application which is there in RhoHub");
        spec.addStep("Run the command rho cloud:build:wm:production for WM");
        spec.addStep("Run command rho cloud:download to download");
        spec.addStep("Check for the messages in command line");
        spec.addExpectation("Should build the application for WM in cloud.");
        spec.addExpectation("Should download the application and store in bin folder.");
        spec.addExpectation("There should not be any misleading messages show in command line.");
        spec.displayScenario();
        spec.waitForButtonPressing("Run test");
        spec.waitForResponse();
    });

    it("Should build for android and download rho cloud:download", function() {
        var spec = new ManualSpec(jasmine, window.document);
        spec.addGoal("Should build for android and download rho cloud:download");
        spec.addPrecondition("Install Rhodes framework to enable rho command.");
        spec.addPrecondition("Make sure token is set.");
        spec.addPrecondition("Make sure application has been pushed to rhohub git successfully.");
        spec.addStep("Go to the Root folder of application which is there in RhoHub");
        spec.addStep("Run the command rho cloud:build:android:production for Android");
        spec.addStep("Run command rho cloud:download to download");
        spec.addStep("Check for the messages in command line");
        spec.addExpectation("Should build the application for Android in cloud.");
        spec.addExpectation("Should download the latest build for android and store in bin folder.");
        spec.addExpectation("There should not be any misleading messages show in command line.");
        spec.displayScenario();
        spec.waitForButtonPressing("Run test");
        spec.waitForResponse();
    });

    it("Should build for iPhone and download by rho cloud:download", function() {
        var spec = new ManualSpec(jasmine, window.document);
        spec.addGoal("Should build for iPhone and download by rho cloud:download");
        spec.addPrecondition("Install Rhodes framework to enable rho command.");
        spec.addPrecondition("Make sure token is set.");
        spec.addPrecondition("Make sure IOS certificate/provision setup done for IOS build.");
        spec.addPrecondition("Make sure application has been pushed to rhohub git successfully.");
        spec.addStep("Go to the Root folder of application which is there in RhoHub");
        spec.addStep("Run the command rho cloud:build:iphone:development for iPhone development.");
        spec.addStep("Run command rho cloud:download to download");
        spec.addStep("Check for the messages in command line.");
        spec.addExpectation("Should build the application for iPhone development in cloud.");
        spec.addExpectation("Should download the latest build for iphone and store in bin folder.");
        spec.addExpectation("There should not be any misleading messages show in command line.");
        spec.displayScenario();
        spec.waitForButtonPressing("Run test");
        spec.waitForResponse();
    });

    it("Should throw proper error on running rho cloud:download when there is no build available to download", function() {
        var spec = new ManualSpec(jasmine, window.document);
        spec.addGoal("Should throw proper error on running rho cloud:download when there is no build available to download");
        spec.addPrecondition("Install Rhodes framework to enable rho command.");
        spec.addPrecondition("Make sure token is set.");
        spec.addPrecondition("In cloud make sure there is no application is built.");
        spec.addStep("Go to the Root folder of application which is there in RhoHub");
        spec.addStep("Run command rho cloud:download to download");
        spec.addStep("Check for the messages in command line.");
        spec.addExpectation("Should return error \'You have no builds to download\'.");
        spec.displayScenario();
        spec.waitForButtonPressing("Run test");
        spec.waitForResponse();
    });

    it("Should run WM cloud build on WM/CE device by rho cloud:run:device ", function() {
        var spec = new ManualSpec(jasmine, window.document);
        spec.addGoal("Should run WM cloud build on WM/CE device by rho cloud:run:device ");
        spec.addPrecondition("Install Rhodes framework to enable rho command.");
        spec.addPrecondition("Make sure token is set.");
        spec.addPrecondition("Make sure application has been pushed to rhohub git successfully.");
        spec.addPrecondition("Connect the WM/CE device to system.");
        spec.addStep("Go to the Root folder of application which is there in RhoHub");
        spec.addStep("Run the command rho cloud:build:wm:production for WM.");
        spec.addStep("Run command rho cloud:run:device to run cloud build on device.");
        spec.addStep("Check for the messages in command line.");
        spec.addExpectation("Should build the application for WM in cloud.");
        spec.addExpectation("Should download the application, install on WM device and should launch the application on WM/CE device.");
        spec.addExpectation("There should not be any misleading messages show in command line.");
        spec.displayScenario();
        spec.waitForButtonPressing("Run test");
        spec.waitForResponse();
    });

    it("Should run android cloud build on android device by rho cloud:run:device ", function() {
        var spec = new ManualSpec(jasmine, window.document);
        spec.addGoal("Should run android cloud build on android device by rho cloud:run:device ");
        spec.addPrecondition("Install Rhodes framework to enable rho command.");
        spec.addPrecondition("Make sure token is set.");
        spec.addPrecondition("Make sure application has been pushed to rhohub git successfully.");
        spec.addPrecondition("Connect the Android device to system.");
        spec.addStep("Go to the Root folder of application which is there in RhoHub");
        spec.addStep("Run the command rho cloud:build:android:production for Android.");
        spec.addStep("Run command rho cloud:run:device to run cloud build on device.");
        spec.addStep("Check for the messages in command line.");
        spec.addExpectation("Should build the application for Android in cloud.");
        spec.addExpectation("Should download the application, install on Android device and should launch the application on Android device.");
        spec.addExpectation("There should not be any misleading messages show in command line.");
        spec.displayScenario();
        spec.waitForButtonPressing("Run test");
        spec.waitForResponse();
    });

    it("Should run iphone cloud build on iphone device by rho cloud:run:device ", function() {
        var spec = new ManualSpec(jasmine, window.document);
        spec.addGoal("Should run iphone cloud build on iphone device by rho cloud:run:device ");
        spec.addPrecondition("Install Rhodes framework to enable rho command.");
        spec.addPrecondition("Make sure token is set.");
        spec.addPrecondition("Make sure IOS certificate/provision setup done for IOS build.");
        spec.addPrecondition("Make sure application has been pushed to rhohub git successfully.");
        spec.addPrecondition("Connect the iPhone device to system.");
        spec.addStep("Go to the Root folder of application which is there in RhoHub");
        spec.addStep("Run the command rho cloud:build:iphone:development/rho cloud:build:iphone:distribution for iPhone.");
        spec.addStep("Run command rho cloud:run:device to run cloud build on device.");
        spec.addStep("Check for the messages in command line.");
        spec.addExpectation("Should build the application for iPhone in cloud.");
        spec.addExpectation("Should download the application, install on iPhone device and should launch the application on iPhone device.");
        spec.addExpectation("There should not be any misleading messages show in command line.");
        spec.displayScenario();
        spec.waitForButtonPressing("Run test");
        spec.waitForResponse();
    });

    it("Should run WM cloud build on WM/CE simulator by rho cloud:run:simulator", function() {
        var spec = new ManualSpec(jasmine, window.document);
        spec.addGoal("Should run WM cloud build on WM/CE simulator by rho cloud:run:simulator");
        spec.addPrecondition("Install Rhodes framework to enable rho command.");
        spec.addPrecondition("Make sure token is set.");
        spec.addPrecondition("Make sure application has been pushed to rhohub git successfully.");
        spec.addPrecondition("Make WM/CE simulator setup");
        spec.addStep("Go to the Root folder of application which is there in RhoHub");
        spec.addStep("Run the command rho cloud:build:wm:production for WM.");
        spec.addStep("Run command rho cloud:run:simulator to run cloud build on simulator.");
        spec.addStep("Check for the messages in command line.");
        spec.addExpectation("Should build the application for WM in cloud.");
        spec.addExpectation("Should download the application, install on WM simulator and should launch the application on WM/CE simulator.");
        spec.addExpectation("There should not be any misleading messages show in command line.");
        spec.displayScenario();
        spec.waitForButtonPressing("Run test");
        spec.waitForResponse();
    });

    it("Should run android cloud build on android simulator by rho cloud:run:simulator", function() {
        var spec = new ManualSpec(jasmine, window.document);
        spec.addGoal("Should run android cloud build on android simulator by rho cloud:run:simulator");
        spec.addPrecondition("Install Rhodes framework to enable rho command.");
        spec.addPrecondition("Make sure token is set.");
        spec.addPrecondition("Make sure application has been pushed to rhohub git successfully.");
        spec.addPrecondition("Make android simulator setup and provide AVD version in build.yml");
        spec.addStep("Go to the Root folder of application which is there in RhoHub");
        spec.addStep("Run the command rho cloud:build:android:production for Android.");
        spec.addStep("Run command rho cloud:run:simulator to run cloud build on simulator.");
        spec.addStep("Check for the messages in command line.");
        spec.addExpectation("Should build the application for Android in cloud.");
        spec.addExpectation("Should download the application, install on Android device and should launch the application on Android device.");
        spec.addExpectation("There should not be any misleading messages show in command line.");
        spec.displayScenario();
        spec.waitForButtonPressing("Run test");
        spec.waitForResponse();
    });

    it("Should run iphone cloud build on iphone simulator by rho cloud:run:simulator", function() {
        var spec = new ManualSpec(jasmine, window.document);
        spec.addGoal("Should run iphone cloud build on iphone simulator by rho cloud:run:simulator");
        spec.addPrecondition("Install Rhodes framework to enable rho command.");
        spec.addPrecondition("Make sure token is set.");
        spec.addPrecondition("Make sure IOS certificate/provision setup done for IOS build.");
        spec.addPrecondition("Make sure application has been pushed to rhohub git successfully.");
        spec.addPrecondition("Make iPhone simulator setup.");
        spec.addStep("Go to the Root folder of application which is there in RhoHub");
        spec.addStep("Run the command rho cloud:build:iphone:development/rho cloud:build:iphone:distribution for iPhone.");
        spec.addStep("Run command rho cloud:run:simulator to run cloud build on simulator.");
        spec.addStep("Check for the messages in command line.");
        spec.addExpectation("Should build the application for iPhone in cloud.");
        spec.addExpectation("Should download the application, install on iPhone simulator and should launch the application on iPhone simulator.");
        spec.addExpectation("There should not be any misleading messages show in command line.");
        spec.displayScenario();
        spec.waitForButtonPressing("Run test");
        spec.waitForResponse();
    });

    it("Should build and download the application for android from cloud with single command", function() {
        var spec = new ManualSpec(jasmine, window.document);
        spec.addGoal("Should build and download the application for android from cloud with single command");
        spec.addPrecondition("Install Rhodes framework to enable rho command.");
        spec.addPrecondition("Make sure token is set.");
        spec.addPrecondition("Make sure application has been pushed to rhohub git successfully.");
        spec.addStep("Go to the Root folder of application which is there in RhoHub");
        spec.addStep("Run the command rho cloud:build:android:production && rho cloud:download for Android");
        spec.addStep("Check for the messages in command line");
        spec.addExpectation("Should build the application for Android in cloud.");
        spec.addExpectation("Should download the latest build for android and store in bin folder.");
        spec.addExpectation("There should not be any misleading messages show in command line.");
        spec.displayScenario();
        spec.waitForButtonPressing("Run test");
        spec.waitForResponse();
    });

    it("Should build and download the application for WM from cloud with single command", function() {
        var spec = new ManualSpec(jasmine, window.document);
        spec.addGoal("Should build and download the application for WM from cloud with single command");
        spec.addPrecondition("Install Rhodes framework to enable rho command.");
        spec.addPrecondition("Make sure token is set.");
        spec.addPrecondition("Make sure application has been pushed to rhohub git successfully.");
        spec.addStep("Go to the Root folder of application which is there in RhoHub");
        spec.addStep("Run the command rho cloud:build:wm:production && rho cloud:download for WM");
        spec.addStep("Check for the messages in command line.");
        spec.addExpectation("Should build the application for WM in cloud.");
        spec.addExpectation("Should download the application and store in bin folder.");
        spec.addExpectation("There should not be any misleading messages show in command line.");
        spec.displayScenario();
        spec.waitForButtonPressing("Run test");
        spec.waitForResponse();
    });

    it("Should build and download the application for iPhone from cloud with single command", function() {
        var spec = new ManualSpec(jasmine, window.document);
        spec.addGoal("Should build and download the application for iPhone from cloud with single command");
        spec.addPrecondition("Install Rhodes framework to enable rho command.");
        spec.addPrecondition("Make sure token is set.");
        spec.addPrecondition("Make sure IOS certificate/provision setup done for IOS build.");
        spec.addPrecondition("Make sure application has been pushed to rhohub git successfully.");
        spec.addStep("Go to the Root folder of application which is there in RhoHub");
        spec.addStep("Run the command rho cloud:build:iphone:development && rho cloud:download to download for iPhone development.");
        spec.addStep("Check for the messages in command line");
        spec.addExpectation("Should build the application for iPhone development in cloud.");
        spec.addExpectation("Should download the latest build for iphone and store in bin folder.");
        spec.addExpectation("There should not be any misleading messages show in command line.");
        spec.displayScenario();
        spec.waitForButtonPressing("Run test");
        spec.waitForResponse();
    });

    it("Should build and run application on WM device from cloud with single command", function() {
        var spec = new ManualSpec(jasmine, window.document);
        spec.addGoal("Should build and run application on WM device from cloud with single command");
        spec.addPrecondition("Install Rhodes framework to enable rho command.");
        spec.addPrecondition("Make sure token is set.");
        spec.addPrecondition("Make sure application has been pushed to rhohub git successfully.");
        spec.addPrecondition("Connect the WM/CE device to system.");
        spec.addStep("Go to the Root folder of application which is there in RhoHub");
        spec.addStep("Run the command rho cloud:build:wm:production && rho cloud:run:device to run cloud build on WM device.");
        spec.addStep("Check for the messages in command line.");
        spec.addExpectation("Should build the application for WM in cloud.");
        spec.addExpectation("Should download the application, install on WM device and should launch the application on WM/CE device.");
        spec.addExpectation("There should not be any misleading messages show in command line.");
        spec.displayScenario();
        spec.waitForButtonPressing("Run test");
        spec.waitForResponse();
    });

    it("Should build and run application on Android device from cloud with single command", function() {
        var spec = new ManualSpec(jasmine, window.document);
        spec.addGoal("Should build and run application on Android device from cloud with single command");
        spec.addPrecondition("Install Rhodes framework to enable rho command.");
        spec.addPrecondition("Make sure token is set.");
        spec.addPrecondition("Make sure application has been pushed to rhohub git successfully.");
        spec.addPrecondition("Connect the Android device to system.");
        spec.addStep("Go to the Root folder of application which is there in RhoHub");
        spec.addStep("Run the command rho cloud:build:android:production && rho cloud:run:device to run cloud build on Android device.");
        spec.addStep("Check for the messages in command line.");
        spec.addExpectation("Should build the application for Android in cloud.");
        spec.addExpectation("Should download the application, install on Android device and should launch the application on Android device.");
        spec.addExpectation("There should not be any misleading messages show in command line.");
        spec.displayScenario();
        spec.waitForButtonPressing("Run test");
        spec.waitForResponse();
    });

    it("Should build and run application on iPhone device from cloud with single command", function() {
        var spec = new ManualSpec(jasmine, window.document);
        spec.addGoal("Should build and run application on iPhone device from cloud with single command");
        spec.addPrecondition("Install Rhodes framework to enable rho command.");
        spec.addPrecondition("Make sure token is set.");
        spec.addPrecondition("Make sure IOS certificate/provision setup done for IOS build.");
        spec.addPrecondition("Make sure application has been pushed to rhohub git successfully.");
        spec.addPrecondition("Connect the iPhone device to system.");
        spec.addStep("Go to the Root folder of application which is there in RhoHub");
        spec.addStep("Run the command rho cloud:build:iphone:development/rho cloud:build:iphone:distribution && rho cloud:run:device to run cloud build on iPhone device..");
        spec.addStep("Check for the messages in command line.");
        spec.addExpectation("Should build the application for iPhone in cloud.");
        spec.addExpectation("Should download the application, install on iPhone device and should launch the application on iPhone device.");
        spec.addExpectation("There should not be any misleading messages show in command line.");
        spec.displayScenario();
        spec.waitForButtonPressing("Run test");
        spec.waitForResponse();
    });

    it("Should build and run application on WM simulator from cloud with single command", function() {
        var spec = new ManualSpec(jasmine, window.document);
        spec.addGoal("Should build and run application on WM simulator from cloud with single command");
        spec.addPrecondition("Install Rhodes framework to enable rho command.");
        spec.addPrecondition("Make sure token is set.");
        spec.addPrecondition("Make sure application has been pushed to rhohub git successfully.");
        spec.addPrecondition("Make WM/CE simulator setup");
        spec.addStep("Go to the Root folder of application which is there in RhoHub");
        spec.addStep("Run the command rho cloud:build:wm:production &&  rho cloud:run:simulator to run cloud build on WM simulator.");
        spec.addStep("Check for the messages in command line.");
        spec.addExpectation("Should build the application for WM in cloud.");
        spec.addExpectation("Should download the application, install on WM simulator and should launch the application on WM/CE simulator.");
        spec.addExpectation("There should not be any misleading messages show in command line.");
        spec.displayScenario();
        spec.waitForButtonPressing("Run test");
        spec.waitForResponse();
    });

    it("Should build and run application on Android simulator from cloud with single command", function() {
        var spec = new ManualSpec(jasmine, window.document);
        spec.addGoal("Should build and run application on Android simulator from cloud with single command");
        spec.addPrecondition("Install Rhodes framework to enable rho command.");
        spec.addPrecondition("Make sure token is set.");
        spec.addPrecondition("Make sure application has been pushed to rhohub git successfully.");
        spec.addPrecondition("Make android simulator setup and provide AVD version in build.yml");
        spec.addStep("Go to the Root folder of application which is there in RhoHub");
        spec.addStep("Run the command rho cloud:build:android:production && rho cloud:run:simulator to run cloud build on Android simulator.");
        spec.addStep("Check for the messages in command line.");
        spec.addExpectation("Should build the application for Android in cloud.");
        spec.addExpectation("Should download the application, install on Android device and should launch the application on Android device.");
        spec.addExpectation("There should not be any misleading messages show in command line.");
        spec.displayScenario();
        spec.waitForButtonPressing("Run test");
        spec.waitForResponse();
    });

    it("Should build and run application on iPhone simulator from cloud with single command", function() {
        var spec = new ManualSpec(jasmine, window.document);
        spec.addGoal("Should build and run application on iPhone simulator from cloud with single command");
        spec.addPrecondition("Install Rhodes framework to enable rho command.");
        spec.addPrecondition("Make sure token is set.");
        spec.addPrecondition("Make sure IOS certificate/provision setup done for IOS build.");
        spec.addPrecondition("Make sure application has been pushed to rhohub git successfully.");
        spec.addPrecondition("Make iPhone simulator setup.");
        spec.addStep("Go to the Root folder of application which is there in RhoHub");
        spec.addStep("Run the command rho cloud:build:iphone:development/rho cloud:build:iphone:distribution rho cloud:run:simulator to run cloud build on iPhone simulator.");
        spec.addStep("Check for the messages in command line.");
        spec.addExpectation("Should build the application for iPhone in cloud.");
        spec.addExpectation("Should download the application, install on iPhone simulator and should launch the application on iPhone simulator.");
        spec.addExpectation("There should not be any misleading messages show in command line.");
        spec.displayScenario();
        spec.waitForButtonPressing("Run test");
        spec.waitForResponse();
    });

    //These tests are moved to auto  
    /*it("Should build application using local containers for WM with app_type: rhoelements", function() {
        var spec = new ManualSpec(jasmine, window.document);
        spec.addGoal("Should build application using local containers for WM with app_type: rhoelements");
        spec.addPrecondition("Install Rhodes framework to enable rho command.");
        spec.addPrecondition("Make sure token is set.");
        spec.addStep("Go to the application and add app_type: rhoelements in build.yml.");
        spec.addStep("Build the application for WM using local containers rho device:wm:production_with_prebuild_binary");
        spec.addExpectation("Should build the application successfully using local containers for WM with app_type: rhoelements");
        spec.displayScenario();
        spec.waitForButtonPressing("Run test");
        spec.waitForResponse();
    });

    it("Should build application using local containers for WM with motorola_browser capability", function() {
        var spec = new ManualSpec(jasmine, window.document);
        spec.addGoal("Should build application using local containers for WM with motorola_browser capability");
        spec.addPrecondition("Install Rhodes framework to enable rho command.");
        spec.addPrecondition("Make sure token is set.");
        spec.addStep("Go to the application and add capabilities: \'motorola_browser\' in build.yml.");
        spec.addStep("Build the application for WM using local containers rho device:wm:production_with_prebuild_binary");
        spec.addExpectation("Should build application successfully using local containers for WM with motorola_browser capability");
        spec.displayScenario();
        spec.waitForButtonPressing("Run test");
        spec.waitForResponse();
    });

    it("Should build application using local containers for WM with shared_runtime capability", function() {
        var spec = new ManualSpec(jasmine, window.document);
        spec.addGoal("Should build application using local containers for WM with shared_runtime capability");
        spec.addPrecondition("Install Rhodes framework to enable rho command.");
        spec.addPrecondition("Make sure token is set.");
        spec.addStep("Go to the application and add capabilities: \'shared_runtime\' in build.yml.");
        spec.addStep("Build the application for WM using local containers rho device:wm:production_with_prebuild_binary");
        spec.addExpectation("Should build application successfully using local containers for WM with shared_runtime capability");
        spec.displayScenario();
        spec.waitForButtonPressing("Run test");
        spec.waitForResponse();
    });

    it("Should build application using local containers for WM with database encrption enabled", function() {
        var spec = new ManualSpec(jasmine, window.document);
        spec.addGoal("Should build application using local containers for WM with database encrption enabled");
        spec.addPrecondition("Install Rhodes framework to enable rho command.");
        spec.addPrecondition("Make sure token is set.");
        spec.addStep("Go to the application and add encrypt_database: 1 in build.yml.");
        spec.addStep("Build the application for WM using local containers rho device:wm:production_with_prebuild_binary");
        spec.addExpectation("Should build application successfully using local containers for WM with database encrption enabled");
        spec.displayScenario();
        spec.waitForButtonPressing("Run test");
        spec.waitForResponse();
    });

    it("Should build application using local containers for WM with sharedruntime capability is set to No", function() {
        var spec = new ManualSpec(jasmine, window.document);
        spec.addGoal("Should build application using local containers for WM with sharedruntime capability is set to No");
        spec.addPrecondition("Install Rhodes framework to enable rho command.");
        spec.addPrecondition("Make sure token is set.");
        spec.addStep("Go to the application and add use_shared_runtime: \'no\' in build.yml.");
        spec.addStep("Build the application for WM using local containers rho device:wm:production_with_prebuild_binary");
        spec.addExpectation("Should build application successfully using local containers for WM with sharedruntime capability is set to No");
        spec.displayScenario();
        spec.waitForButtonPressing("Run test");
        spec.waitForResponse();
    });

    it("Should build application using local containers for WM with all licensed extensions", function() {
        var spec = new ManualSpec(jasmine, window.document);
        spec.addGoal("Should build application using local containers for WM with all licensed extensions");
        spec.addPrecondition("Install Rhodes framework to enable rho command.");
        spec.addPrecondition("Make sure token is set.");
        spec.addStep("Go to the application and add extensions: [\'barcode\',\'hardwarekeys\',\'indicators\',\'cardreader\',\'signature\',\'NFC\'] in build.yml.");
        spec.addStep("Build the application for WM using local containers rho device:wm:production_with_prebuild_binary");
        spec.addExpectation("Should build application successfully using local containers for WM with all licensed extensions");
        spec.displayScenario();
        spec.waitForButtonPressing("Run test");
        spec.waitForResponse();
    });

    it("Should build application using local containers for WM with all non-licensed extensions", function() {
        var spec = new ManualSpec(jasmine, window.document);
        spec.addGoal("Should build application using local containers for WM with all non-licensed extensions");
        spec.addPrecondition("Install Rhodes framework to enable rho command.");
        spec.addPrecondition("Make sure token is set.");
        spec.addStep("Go to the application and add extensions: [\'audiocapture\',\'coreapi\',\'mediaplayer\',\'screenorientation\',\'printing\',\'printing_zebra\',\'sensor\', \'rhoconnect-push\', \'rhoconnect-client\'] in build.yml.");
        spec.addStep("Build the application for WM using local containers rho device:wm:production_with_prebuild_binary");
        spec.addExpectation("Should build application successfully using local containers for WM with all non-licensed extensions");
        spec.displayScenario();
        spec.waitForButtonPressing("Run test");
        spec.waitForResponse();
    });

    it("Should build application using local containers for WM with capabilities", function() {
        var spec = new ManualSpec(jasmine, window.document);
        spec.addGoal("Should build application using local containers for WM with capabilities");
        spec.addPrecondition("Install Rhodes framework to enable rho command.");
        spec.addPrecondition("Make sure token is set.");
        spec.addStep("Go to the application and add capabilities: [\'camera\',\'bluetooth\',\'gps\',\'sdcard\',\'pim\',\'calendar\',\'vibrate\',\'phone\'] in build.yml.");
        spec.addStep("Build the application for WM using local containers rho device:wm:production_with_prebuild_binary");
        spec.addExpectation("Should build application successfully using local containers for WM with capabilities");
        spec.displayScenario();
        spec.waitForButtonPressing("Run test");
        spec.waitForResponse();
    });

    it("Should build application using local containers for WM with old 2.2 extensions", function() {
        var spec = new ManualSpec(jasmine, window.document);
        spec.addGoal("Should build application using local containers for WM with old 2.2 extensions");
        spec.addPrecondition("Install Rhodes framework to enable rho command.");
        spec.addPrecondition("Make sure token is set.");
        spec.addStep("Go to the application and add old 2.2 extensions: [\'digest\', \'digest-md5\', \'digest-sha1\', \'digest-sha2\', \'openssl.so\', \'openssl\', \'ezcrypto\',\'rawsensors\',\'audiocapture\'] in build.yml.");
        spec.addStep("Build the application for WM using local containers rho device:wm:production_with_prebuild_binary");
        spec.addExpectation("Should build application successfully using local containers for WM with old 2.2 extensions");
        spec.displayScenario();
        spec.waitForButtonPressing("Run test");
        spec.waitForResponse();
    });

    it("Should build application using local containers for WM with javascript_application: true", function() {
        var spec = new ManualSpec(jasmine, window.document);
        spec.addGoal("Should build application using local containers for WM with javascript_application: true");
        spec.addPrecondition("Install Rhodes framework to enable rho command.");
        spec.addPrecondition("Make sure token is set.");
        spec.addStep("Go to the application and add javascript_application: true in build.yml.");
        spec.addStep("Build the application for WM using local containers rho device:wm:production_with_prebuild_binary");
        spec.addExpectation("Should build application successfully using local containers for WM with javascript_application: true");
        spec.displayScenario();
        spec.waitForButtonPressing("Run test");
        spec.waitForResponse();
    });

    it("Should build application using local containers for WM with native extensions", function() {
        var spec = new ManualSpec(jasmine, window.document);
        spec.addGoal("Should build application using local containers for WM with native extensions");
        spec.addPrecondition("Install Rhodes framework to enable rho command.");
        spec.addPrecondition("Make sure token is set.");
        spec.addStep("Go to the application and add native extension in build.yml.");
        spec.addStep("Build the application for WM using local containers rho device:wm:production_with_prebuild_binary");
        spec.addExpectation("Should build application successfully using local containers for WM with native extension");
        spec.displayScenario();
        spec.waitForButtonPressing("Run test");
        spec.waitForResponse();
    });

    it("Should build application using local containers for Android with app_type: rhoelements", function() {
        var spec = new ManualSpec(jasmine, window.document);
        spec.addGoal("Should build application using local containers for Android with app_type: rhoelements");
        spec.addPrecondition("Install Rhodes framework to enable rho command.");
        spec.addPrecondition("Make sure token is set.");
        spec.addStep("Go to the application and add app_type: \'rhoelements\' in build.yml.");
        spec.addStep("Build the application for android using local containers rho device:android:production_with_prebuild_binary");
        spec.addExpectation("Should build application successfully using local containers for Android with app_type: rhoelements");
        spec.displayScenario();
        spec.waitForButtonPressing("Run test");
        spec.waitForResponse();
    });

    it("Should build application using local containers for Android with non_motorola_device and apptype rhoelements capability", function() {
        var spec = new ManualSpec(jasmine, window.document);
        spec.addGoal("Should build application using local containers for Android with non_motorola_device and apptype rhoelements capability");
        spec.addPrecondition("Install Rhodes framework to enable rho command.");
        spec.addPrecondition("Make sure token is set.");
        spec.addStep("Go to the application and add app_type: \'rhoelements\' and capabilities: \'non_motorola_device\' in build.yml.");
        spec.addStep("Build the application for android using local containers rho device:android:production_with_prebuild_binary");
        spec.addExpectation("Should build application successfully using local containers for Android with non_motorola_device and apptype rhoelements capability");
        spec.displayScenario();
        spec.waitForButtonPressing("Run test");
        spec.waitForResponse();
    });

    it("Should build application using local containers for Android with apptype is not rhoelements", function() {
        var spec = new ManualSpec(jasmine, window.document);
        spec.addGoal("Should build application using local containers for Android with apptype is not rhoelements");
        spec.addPrecondition("Install Rhodes framework to enable rho command.");
        spec.addPrecondition("Make sure token is set.");
        spec.addStep("Go to the application and remove app_type: \'rhoelements\' in build.yml.");
        spec.addStep("Build the application for android using local containers rho device:android:production_with_prebuild_binary");
        spec.addExpectation("Should build application successfully using local containers for Android with apptype is not rhoelements");
        spec.displayScenario();
        spec.waitForButtonPressing("Run test");
        spec.waitForResponse();
    });

    it("Should build application using local containers for Android with motorola_browser capability", function() {
        var spec = new ManualSpec(jasmine, window.document);
        spec.addGoal("Should build application using local containers for Android with motorola_browser capability");
        spec.addPrecondition("Install Rhodes framework to enable rho command.");
        spec.addPrecondition("Make sure token is set.");
        spec.addStep("Go to the application and add capabilities: \'motorola_browser\' in build.yml.");
        spec.addStep("Build the application for android using local containers rho device:android:production_with_prebuild_binary");
        spec.addExpectation("Should build application successfully using local containers for Android with motorola_browser capability");
        spec.displayScenario();
        spec.waitForButtonPressing("Run test");
        spec.waitForResponse();
    });

    it("Should build application using local containers for Android with native_browser capability", function() {
        var spec = new ManualSpec(jasmine, window.document);
        spec.addGoal("Should build application using local containers for Android with native_browser capability");
        spec.addPrecondition("Install Rhodes framework to enable rho command.");
        spec.addPrecondition("Make sure token is set.");
        spec.addStep("Go to the application and add capabilities: \'native_browser\' in build.yml.");
        spec.addStep("Build the application for android using local containers rho device:android:production_with_prebuild_binary");
        spec.addExpectation("Should build application successfully using local containers for Android with native_browser capability");
        spec.displayScenario();
        spec.waitForButtonPressing("Run test");
        spec.waitForResponse();
    });

    it("Should build application using local containers for Android with moto_browser capability if App_type RE", function() {
        var spec = new ManualSpec(jasmine, window.document);
        spec.addGoal("Should build application using local containers for Android with moto_browser capability if App_type RE");
        spec.addPrecondition("Install Rhodes framework to enable rho command.");
        spec.addPrecondition("Make sure token is set.");
        spec.addStep("Go to the application and add app_type: \'rhoelements\' and capabilities: \'motorola_browser\' in build.yml.");
        spec.addStep("Build the application for android using local containers rho device:android:production_with_prebuild_binary");
        spec.addExpectation("Should build application successfully using local containers for Android with moto_browser capability if App_type RE");
        spec.displayScenario();
        spec.waitForButtonPressing("Run test");
        spec.waitForResponse();
    });

    it("Should build application using local containers for Android with all licensed extension with non_motorola_device capability", function() {
        var spec = new ManualSpec(jasmine, window.document);
        spec.addGoal("Should build application using local containers for Android with all licensed extension with non_motorola_device capability");
        spec.addPrecondition("Install Rhodes framework to enable rho command.");
        spec.addPrecondition("Make sure token is set.");
        spec.addStep("Go to the application and add capabilities: \'non_motorola_device\' and extensions: [\'barcode\',\'hardwarekeys\',\'indicators\',\'cardreader\',\'signature\',\'NFC\',\'SimulScan\'] in build.yml.");
        spec.addStep("Build the application for android using local containers rho device:android:production_with_prebuild_binary");
        spec.addExpectation("Should build application successfully using local containers for Android with all licensed extension with non_motorola_device capability");
        spec.displayScenario();
        spec.waitForButtonPressing("Run test");
        spec.waitForResponse();
    });

    it("Should build application using local containers for Android with non-licensed extension when app type is not rhoelements", function() {
        var spec = new ManualSpec(jasmine, window.document);
        spec.addGoal("Should build application using local containers for Android with non-licensed extension when app type is not rhoelements");
        spec.addPrecondition("Install Rhodes framework to enable rho command.");
        spec.addPrecondition("Make sure token is set.");
        spec.addStep("Go to the application and add extensions: [\'audiocapture\',\'coreapi\',\'mediaplayer\',\'screenorientation\',\'printing\',\'printing_zebra\',\'sensor\', \'rhoconnect-push\', \'rhoconnect-client\'] in build.yml.");
        spec.addStep("Build the application for android using local containers rho device:android:production_with_prebuild_binary");
        spec.addExpectation("Should build application using successfully local containers for Android with non-licensed extension when app type is not rhoelements");
        spec.displayScenario();
        spec.waitForButtonPressing("Run test");
        spec.waitForResponse();
    });

    it("Should build application by local containers for Android with all licensed extension when app type is not rhoelements", function() {
        var spec = new ManualSpec(jasmine, window.document);
        spec.addGoal("Should build application by local containers for Android with all licensed extension when app type is not rhoelements");
        spec.addPrecondition("Install Rhodes framework to enable rho command.");
        spec.addPrecondition("Make sure token is set.");
        spec.addStep("Go to the application and remove app_type: rhoelements and add extensions: [\'barcode\',\'hardwarekeys\',\'indicators\',\'cardreader\',\'signature\',\'NFC\',\'SimulScan\'] in build.yml.");
        spec.addStep("Build the application for android using local containers rho device:android:production_with_prebuild_binary");
        spec.addExpectation("Should build application using successfully local containers for Android with all licensed extension when app type is not rhoelements");
        spec.displayScenario();
        spec.waitForButtonPressing("Run test");
        spec.waitForResponse();
    });

    it("Should build application using local containers for Android with all extensions when app type is rhoelements", function() {
        var spec = new ManualSpec(jasmine, window.document);
        spec.addGoal("Should build application using local containers for Android with all extensions when app type is rhoelements");
        spec.addPrecondition("Install Rhodes framework to enable rho command.");
        spec.addPrecondition("Make sure token is set.");
        spec.addStep("Go to the application and add app_type: rhoelements, add licensed extensions: [\'barcode\',\'hardwarekeys\',\'indicators\',\'cardreader\',\'signature\',\'NFC\',\'SimulScan\'] and add non-licensed extensions: [\'audiocapture\',\'coreapi\',\'mediaplayer\',\'screenorientation\',\'printing\',\'printing_zebra\',\'sensor\'] in build.yml.");
        spec.addStep("Build the application for android using local containers rho device:android:production_with_prebuild_binary");
        spec.addExpectation("Should build application using local containers for Android with all extensions when app type is rhoelements");
        spec.displayScenario();
        spec.waitForButtonPressing("Run test");
        spec.waitForResponse();
    });

    it("Should build application using local containers for Android with old 2.2 extensions", function() {
        var spec = new ManualSpec(jasmine, window.document);
        spec.addGoal("Should build application using local containers for Android with old 2.2 extensions");
        spec.addPrecondition("Install Rhodes framework to enable rho command.");
        spec.addPrecondition("Make sure token is set.");
        spec.addStep("Go to the application and add old 2.2 extensions: [\'nfc\',\'rawsensors\',\'audiocapture\',\'digest\', \'digest-md5\', \'digest-sha1\', \'digest-sha2\', \'openssl.so\', \'openssl\', \'ezcrypto\'] in build.yml.");
        spec.addStep("Build the application for android using local containers rho device:android:production_with_prebuild_binary");
        spec.addExpectation("Should build application successfully using local containers for Android with old 2.2 extensions");
        spec.displayScenario();
        spec.waitForButtonPressing("Run test");
        spec.waitForResponse();
    });

    it("Should build application using local containers for Android with capabilities", function() {
        var spec = new ManualSpec(jasmine, window.document);
        spec.addGoal("Should build application using local containers for Android with capabilities");
        spec.addPrecondition("Install Rhodes framework to enable rho command.");
        spec.addPrecondition("Make sure token is set.");
        spec.addStep("Go to the application and add capabilities: [\'camera\',\'bluetooth\',\'gps\',\'sdcard\',\'pim\',\'calendar\',\'vibrate\',\'phone\'] in build.yml.");
        spec.addStep("Build the application for android using local containers rho device:android:production_with_prebuild_binary");
        spec.addExpectation("Should build application successfully using local containers for Android with capabilities");
        spec.displayScenario();
        spec.waitForButtonPressing("Run test");
        spec.waitForResponse();
    });

    it("Should build application using local containers for Android with database encrption enabled", function() {
        var spec = new ManualSpec(jasmine, window.document);
        spec.addGoal("Should build application using local containers for Android with database encrption enabled");
        spec.addPrecondition("Install Rhodes framework to enable rho command.");
        spec.addPrecondition("Make sure token is set.");
        spec.addStep("Go to the application and add app_type: \'rhoelements\' and encrypt_database: 1 in build.yml.");
        spec.addStep("Build the application for android using local containers rho device:android:production_with_prebuild_binary");
        spec.addExpectation("Should build application successfully using local containers for Android with database encrption enabled");
        spec.displayScenario();
        spec.waitForButtonPressing("Run test");
        spec.waitForResponse();
    });

    it("Should build application using local containers for Android with javascript_application: true", function() {
        var spec = new ManualSpec(jasmine, window.document);
        spec.addGoal("Should build application using local containers for Android with javascript_application: true");
        spec.addPrecondition("Install Rhodes framework to enable rho command.");
        spec.addPrecondition("Make sure token is set.");
        spec.addStep("Go to the application and add javascript_application: true in build.yml.");
        spec.addStep("Build the application for Android using local containers rho device:Android:production_with_prebuild_binary");
        spec.addExpectation("Should build application successfully using local containers for Android with javascript_application: true");
        spec.displayScenario();
        spec.waitForButtonPressing("Run test");
        spec.waitForResponse();
    });

    it("Should build application using local containers for Android with abis: [\'x86\']", function() {
        var spec = new ManualSpec(jasmine, window.document);
        spec.addGoal("Should build application using local containers for Android with abis: [\'x86\']");
        spec.addPrecondition("Install Rhodes framework to enable rho command.");
        spec.addPrecondition("Make sure token is set.");
        spec.addStep("Go to the application and add abis: [\'x86\'] in build.yml.");
        spec.addStep("Build the application for Android using local containers rho device:Android:production_with_prebuild_binary");
        spec.addExpectation("Should build application successfully using local containers for Android with abis: [\'x86\']");
        spec.displayScenario();
        spec.waitForButtonPressing("Run test");
        spec.waitForResponse();
    });

    it("Should build application using local containers for Android with native extensions", function() {
        var spec = new ManualSpec(jasmine, window.document);
        spec.addGoal("Should build application using local containers for Android with native extensions");
        spec.addPrecondition("Install Rhodes framework to enable rho command.");
        spec.addPrecondition("Make sure token is set.");
        spec.addStep("Go to the application and add native extension in build.yml.");
        spec.addStep("Build the application for Android using local containers rho device:Android:production_with_prebuild_binary");
        spec.addExpectation("Should build application successfully using local containers for Android with native extension");
        spec.displayScenario();
        spec.waitForButtonPressing("Run test");
        spec.waitForResponse();
    });

    it("Should build application using local containers for IOS with app_type: rhoelements", function() {
        var spec = new ManualSpec(jasmine, window.document);
        spec.addGoal("Should build application using local containers for IOS with app_type: rhoelements");
        spec.addPrecondition("Install Rhodes framework to enable rho command.");
        spec.addPrecondition("Make sure token is set.");
        spec.addStep("Go to the application and add app_type: \'rhoelements\' in build.yml.");
        spec.addStep("Build the application for IOS using local containers rho device:iphone:production_with_prebuild_binary");
        spec.addExpectation("Should build application successfully using local containers for IOS with app_type: rhoelements");
        spec.displayScenario();
        spec.waitForButtonPressing("Run test");
        spec.waitForResponse();
    });

    it("Should build application by local containers for IOS with non_motorola_device and apptype rhoelements capability", function() {
        var spec = new ManualSpec(jasmine, window.document);
        spec.addGoal("Should build application by local containers for IOS with non_motorola_device and apptype rhoelements capability");
        spec.addPrecondition("Install Rhodes framework to enable rho command.");
        spec.addPrecondition("Make sure token is set.");
        spec.addStep("Go to the application and add app_type: \'rhoelements\' and capabilities: \'non_motorola_device\' in build.yml.");
        spec.addStep("Build the application for IOS using local containers rho device:iphone:production_with_prebuild_binary");
        spec.addExpectation("Should build application successfully using local containers for IOS with non_motorola_device and apptype rhoelements capability");
        spec.displayScenario();
        spec.waitForButtonPressing("Run test");
        spec.waitForResponse();
    });

    it("Should build application using local containers for IOS with apptype is not rhoelements", function() {
        var spec = new ManualSpec(jasmine, window.document);
        spec.addGoal("Should build application using local containers for IOS with apptype is not rhoelements");
        spec.addPrecondition("Install Rhodes framework to enable rho command.");
        spec.addPrecondition("Make sure token is set.");
        spec.addStep("Go to the application and remove app_type: \'rhoelements\' in build.yml.");
        spec.addStep("Build the application for IOS using local containers rho device:iphone:production_with_prebuild_binary");
        spec.addExpectation("Should build application successfully using local containers for IOS with apptype is not rhoelements");
        spec.displayScenario();
        spec.waitForButtonPressing("Run test");
        spec.waitForResponse();
    });

    it("Should build application using local containers for IOS with all licensed extension with non_motorola_device capability", function() {
        var spec = new ManualSpec(jasmine, window.document);
        spec.addGoal("Should build application using local containers for IOS with all licensed extension with non_motorola_device capability");
        spec.addPrecondition("Install Rhodes framework to enable rho command.");
        spec.addPrecondition("Make sure token is set.");
        spec.addStep("Go to the application and add capabilities: \'non_motorola_device\' and extensions: [\'barcode\',\'hardwarekeys\',\'indicators\',\'signature\'] in build.yml.");
        spec.addStep("Build the application for IOS using local containers rho device:iphone:production_with_prebuild_binary");
        spec.addExpectation("Should build application successfully using local containers for IOS with all licensed extension with non_motorola_device capability");
        spec.displayScenario();
        spec.waitForButtonPressing("Run test");
        spec.waitForResponse();
    });

    it("Should build application using local containers for IOS with all non-licensed extension when app type is not rhoelements", function() {
        var spec = new ManualSpec(jasmine, window.document);
        spec.addGoal("Should build application using local containers for IOS with all non-licensed extension when app type is not rhoelements");
        spec.addPrecondition("Install Rhodes framework to enable rho command.");
        spec.addPrecondition("Make sure token is set.");
        spec.addStep("Go to the application and add extensions: [\'audiocapture\',\'coreapi\',\'mediaplayer\',\'screenorientation\',\'printing\',\'printing_zebra\',\'sensor\', \'rhoconnect-push\', \'rhoconnect-client\'] in build.yml.");
        spec.addStep("Build the application for IOS using local containers rho device:iphone:production_with_prebuild_binary");
        spec.addExpectation("Should build application using successfully local containers for IOS with non-licensed extension when app type is not rhoelements");
        spec.displayScenario();
        spec.waitForButtonPressing("Run test");
        spec.waitForResponse();
    });

    it("Should build application using local containers for IOS with all licensed extension when app type is not rhoelements", function() {
        var spec = new ManualSpec(jasmine, window.document);
        spec.addGoal("Should build application using local containers for IOS with all licensed extension when app type is not rhoelements");
        spec.addPrecondition("Install Rhodes framework to enable rho command.");
        spec.addPrecondition("Make sure token is set.");
        spec.addStep("Go to the application and remove app_type: rhoelements and add extensions: [\'barcode\',\'hardwarekeys\',\'indicators\',\'signature\'] in build.yml.");
        spec.addStep("Build the application for IOS using local containers rho device:iphone:production_with_prebuild_binary");
        spec.addExpectation("Should build application using successfully local containers for IOS with all licensed extension when app type is not rhoelements");
        spec.displayScenario();
        spec.waitForButtonPressing("Run test");
        spec.waitForResponse();
    });

    it("Should build application using local containers for IOS with all extensions when app type is rhoelements", function() {
        var spec = new ManualSpec(jasmine, window.document);
        spec.addGoal("Should build application using local containers for IOS with all extensions when app type is rhoelements");
        spec.addPrecondition("Install Rhodes framework to enable rho command.");
        spec.addPrecondition("Make sure token is set.");
        spec.addStep("Go to the application and add app_type: rhoelements, add licensed extensions: [\'barcode\',\'hardwarekeys\',\'indicators\',\'signature\'] and add non-licensed extensions: [\'audiocapture\',\'coreapi\',\'mediaplayer\',\'screenorientation\',\'printing\',\'printing_zebra\',\'sensor\', \'rhoconnect-push\', \'rhoconnect-client\'] in build.yml.");
        spec.addStep("Build the application for IOS using local containers rho device:iphone:production_with_prebuild_binary");
        spec.addExpectation("Should build application using local containers for IOS with all extensions when app type is rhoelements");
        spec.displayScenario();
        spec.waitForButtonPressing("Run test");
        spec.waitForResponse();
    });

    it("Should build application using local containers for IOS with old 2.2 extensions", function() {
        var spec = new ManualSpec(jasmine, window.document);
        spec.addGoal("Should build application using local containers for IOS with old 2.2 extensions");
        spec.addPrecondition("Install Rhodes framework to enable rho command.");
        spec.addPrecondition("Make sure token is set.");
        spec.addStep("Go to the application and add old 2.2 extensions: [\'digest\', \'digest-md5\', \'digest-sha1\', \'digest-sha2\', \'openssl.so\', \'openssl\', \'ezcrypto\',\'rawsensors\',\'audiocapture\'] in build.yml.");
        spec.addStep("Build the application for IOS using local containers rho device:iphone:production_with_prebuild_binary");
        spec.addExpectation("Should build application successfully using local containers for IOS with old 2.2 extensions");
        spec.displayScenario();
        spec.waitForButtonPressing("Run test");
        spec.waitForResponse();
    });

    it("Should build application using local containers for IOS with capabilities", function() {
        var spec = new ManualSpec(jasmine, window.document);
        spec.addGoal("Should build application using local containers for IOS with capabilities");
        spec.addPrecondition("Install Rhodes framework to enable rho command.");
        spec.addPrecondition("Make sure token is set.");
        spec.addStep("Go to the application and add capabilities: [\'camera\',\'bluetooth\',\'gps\',\'sdcard\',\'pim\',\'calendar\',\'vibrate\',\'phone\'] in build.yml.");
        spec.addStep("Build the application for IOS using local containers rho device:iphone:production_with_prebuild_binary");
        spec.addExpectation("Should build application successfully using local containers for IOS with capabilities");
        spec.displayScenario();
        spec.waitForButtonPressing("Run test");
        spec.waitForResponse();
    });

    it("Should build application using local containers for IOS with database encrption enabled", function() {
        var spec = new ManualSpec(jasmine, window.document);
        spec.addGoal("Should build application using local containers for IOS with database encrption enabled");
        spec.addPrecondition("Install Rhodes framework to enable rho command.");
        spec.addPrecondition("Make sure token is set.");
        spec.addStep("Go to the application and add app_type: \'rhoelements\' and encrypt_database: 1 in build.yml.");
        spec.addStep("Build the application for IOS using local containers rho device:iphone:production_with_prebuild_binary");
        spec.addExpectation("Should build application successfully using local containers for IOS with database encrption enabled");
        spec.displayScenario();
        spec.waitForButtonPressing("Run test");
        spec.waitForResponse();
    });

    it("Should build application using local containers for IOS with javascript_application: true", function() {
        var spec = new ManualSpec(jasmine, window.document);
        spec.addGoal("Should build application using local containers for IOS with javascript_application: true");
        spec.addPrecondition("Install Rhodes framework to enable rho command.");
        spec.addPrecondition("Make sure token is set.");
        spec.addStep("Go to the application and add javascript_application: true in build.yml.");
        spec.addStep("Build the application for IOS using local containers rho device:iphone:production_with_prebuild_binary");
        spec.addExpectation("Should build application successfully using local containers for IOS with javascript_application: true");
        spec.displayScenario();
        spec.waitForButtonPressing("Run test");
        spec.waitForResponse();
    });

    it("Should build application using local containers for IOS with native extensions", function() {
        var spec = new ManualSpec(jasmine, window.document);
        spec.addGoal("Should build application using local containers for IOS with native extensions");
        spec.addPrecondition("Install Rhodes framework to enable rho command.");
        spec.addPrecondition("Make sure token is set.");
        spec.addStep("Go to the application and add native extension in build.yml.");
        spec.addStep("Build the application for IOS using local containers rho device:iphone:production_with_prebuild_binary");
        spec.addExpectation("Should build application successfully using local containers for IOS with native extension");
        spec.displayScenario();
        spec.waitForButtonPressing("Run test");
        spec.waitForResponse();
    });*/

    it("Should build the application using local containers and runs it on Android device by rho containers:run:android:device", function() {
        var spec = new ManualSpec(jasmine, window.document);
        spec.addGoal("Should build the application using local containers and runs it on Android device by rho containers:run:android:device");
        spec.addPrecondition("Install Rhodes framework to enable rho command.");
        spec.addPrecondition("Make sure token is set.");
        spec.addPrecondition("Connect the android device to PC.");
        spec.addStep("Go to the application and run command rho containers:run:android:device");
        spec.addExpectation("Should build the application successfully using local containers and should launch the application on android device successfully.");
        spec.displayScenario();
        spec.waitForButtonPressing("Run test");
        spec.waitForResponse();
    });

    it("Should build the application using local containers and runs it on WM device by rho containers:run:wm:device", function() {
        var spec = new ManualSpec(jasmine, window.document);
        spec.addGoal("Should build the application using local containers and runs it on WM device by rho containers:run:wm:device");
        spec.addPrecondition("Install Rhodes framework to enable rho command.");
        spec.addPrecondition("Make sure token is set.");
        spec.addPrecondition("Connect the WM/CE device to PC.");
        spec.addStep("Go to the application and run command rho containers:run:wm:device");
        spec.addExpectation("Should build the application successfully using local containers and should launch the application on WM device successfully.");
        spec.displayScenario();
        spec.waitForButtonPressing("Run test");
        spec.waitForResponse();
    });

    it("Should build the application using local containers and runs it on iPhone device by rho containers:run:iphone:device", function() {
        var spec = new ManualSpec(jasmine, window.document);
        spec.addGoal("Should build the application using local containers and runs it on iPhone device by rho containers:run:iphone:device");
        spec.addPrecondition("Install Rhodes framework to enable rho command.");
        spec.addPrecondition("Make sure token is set.");
        spec.addPrecondition("Connect the IOS device to PC.");
        spec.addStep("Go to the application and run command rho containers:run:iphone:device");
        spec.addExpectation("Should build the application successfully using local containers and should launch the application on IOS device successfully.");
        spec.displayScenario();
        spec.waitForButtonPressing("Run test");
        spec.waitForResponse();
    });

    it("Should build the application using local containers and runs it on Android simulator by rho containers:run:android:simulator", function() {
        var spec = new ManualSpec(jasmine, window.document);
        spec.addGoal("Should build the application using local containers and runs it on Android simulator by rho containers:run:android:simulator");
        spec.addPrecondition("Install Rhodes framework to enable rho command.");
        spec.addPrecondition("Make sure token is set.");
        spec.addPrecondition("Make android simulator setup and provide AVD version in build.yml.");
        spec.addStep("Go to the application and run command rho containers:run:android:simulator");
        spec.addExpectation("Should build the application successfully using local containers and should launch the application on Android simulator successfully.");
        spec.displayScenario();
        spec.waitForButtonPressing("Run test");
        spec.waitForResponse();
    });

    it("Should build the application by local containers and runs it on WM simulator by rho containers:run:wm:simulator", function() {
        var spec = new ManualSpec(jasmine, window.document);
        spec.addGoal("Should build the application by local containers and runs it on WM simulator by rho containers:run:wm:simulator");
        spec.addPrecondition("Install Rhodes framework to enable rho command.");
        spec.addPrecondition("Make sure token is set.");
        spec.addPrecondition("Make WM simulator setup.");
        spec.addStep("Go to the application and run command rho containers:run:wm:simulator");
        spec.addExpectation("Should build the application successfully using local containers and should launch the application on WM simulator successfully.");
        spec.displayScenario();
        spec.waitForButtonPressing("Run test");
        spec.waitForResponse();
    });

    it("Should build the application by local containers and runs it on iPhone simulator by rho containers:run:iphone:simulator", function() {
        var spec = new ManualSpec(jasmine, window.document);
        spec.addGoal("Should build the application by local containers and runs it on iPhone simulator by rho containers:run:iphone:simulator");
        spec.addPrecondition("Install Rhodes framework to enable rho command.");
        spec.addPrecondition("Make sure token is set.");
        spec.addPrecondition("Make iPhone simulator setup.");
        spec.addStep("Go to the application and run command rho containers:run:iphone:simulator");
        spec.addExpectation("Should build the application successfully using local containers and should launch the application on iPhone simulator successfully.");
        spec.displayScenario();
        spec.waitForButtonPressing("Run test");
        spec.waitForResponse();
    });

    it("Should build the application and runs it on Android rhosimulator by rho run:android:rhosimulator", function() {
        var spec = new ManualSpec(jasmine, window.document);
        spec.addGoal("Should build the application and runs it on Android rhosimulator by rho run:android:rhosimulator");
        spec.addPrecondition("Install Rhodes framework to enable rho command.");
        spec.addPrecondition("Make sure token is set.");
        spec.addStep("Go to the application and run command rho run:android:rhosimulator");
        spec.addExpectation("Should build the application and launch android rhosimulator successfully.");
        spec.displayScenario();
        spec.waitForButtonPressing("Run test");
        spec.waitForResponse();
    });

    it("Should build the application and runs it on WM rhosimulator by rho run:wm:rhosimulator", function() {
        var spec = new ManualSpec(jasmine, window.document);
        spec.addGoal("Should build the application and runs it on WM rhosimulator by rho run:wm:rhosimulator");
        spec.addPrecondition("Install Rhodes framework to enable rho command.");
        spec.addPrecondition("Make sure token is set.");
        spec.addStep("Go to the application and run command rho run:wm:rhosimulator");
        spec.addExpectation("Should build the application and launch WM rhosimulator successfully.");
        spec.displayScenario();
        spec.waitForButtonPressing("Run test");
        spec.waitForResponse();
    });

    it("Should build the application and runs it on iPhone rhosimulator by rho run:iphone:rhosimulator", function() {
        var spec = new ManualSpec(jasmine, window.document);
        spec.addGoal("Should build the application and runs it on iPhone rhosimulator by rho run:iphone:rhosimulator");
        spec.addPrecondition("Install Rhodes framework to enable rho command.");
        spec.addPrecondition("Make sure token is set.");
        spec.addStep("Go to the application and run command rho run:iphone:rhosimulator");
        spec.addExpectation("Should build the application and launch iphone rhosimulator successfully.");
        spec.displayScenario();
        spec.waitForButtonPressing("Run test");
        spec.waitForResponse();
    });

    it("Should install rhosimulator package on running rhosimulator command", function() {
        var spec = new ManualSpec(jasmine, window.document);
        spec.addGoal("Should install rhosimulator package on running rhosimulator command");
        spec.addPrecondition("Install Rhodes framework to enable rho command.");
        spec.addPrecondition("Make sure token is set.");
        spec.addPrecondition("Make sure no package is installed");
        spec.addStep("Go to the application and run command to launch rhosimulator rho run:android:rhosimulator,rho run:iphone:rhosimulator,rho run:wm:rhosimulator");
        spec.addExpectation("Should download rhosimulator package and other packages automatically and install package.");
        spec.addExpectation("Should launch the rhosimulator successfully.");
        spec.displayScenario();
        spec.waitForButtonPressing("Run test");
        spec.waitForResponse();
    });

    it("Should install rhoelements package on building rhoelements application", function() {
        var spec = new ManualSpec(jasmine, window.document);
        spec.addGoal("Should install rhoelements package on building rhoelements application");
        spec.addPrecondition("Install Rhodes framework to enable rho command.");
        spec.addPrecondition("Make sure token is set.");
        spec.addPrecondition("Make sure no package is installed");
        spec.addStep("Go to the application and add app_type: \'rhoelements\' in build.yml");
        spec.addStep("Run below commands to build application,rho device:android:production_with_prebuild_binary,rho device:iphone:production_with_prebuild_binary,rho device:wm:production_with_prebuild_binary ");
        spec.addExpectation("Should download rhoelements package and other required packages automatically and install package.");
        spec.addExpectation("Build should be successfull and should be found in bin folder.");
        spec.displayScenario();
        spec.waitForButtonPressing("Run test");
        spec.waitForResponse();
    });

    it("Should install rhoconnect-client package on building rhoconnect-client application", function() {
        var spec = new ManualSpec(jasmine, window.document);
        spec.addGoal("Should install rhoconnect-client package on building rhoconnect-client application");
        spec.addPrecondition("Install Rhodes framework to enable rho command.");
        spec.addPrecondition("Make sure token is set.");
        spec.addPrecondition("Make sure no package is installed");
        spec.addStep("Go to the application and add rhoconnect-client extension in build.yml");
        spec.addStep("Run below commands to build application,rho device:android:production_with_prebuild_binary,rho device:iphone:production_with_prebuild_binary,rho device:wm:production_with_prebuild_binary ");
        spec.addExpectation("Should download rhoconnect-client package and other required packages automatically and install package.");
        spec.addExpectation("Build should be successfull and should be found in bin folder.");
        spec.displayScenario();
        spec.waitForButtonPressing("Run test");
        spec.waitForResponse();
    });

    it("Should install rhodes-containers package on running containers build command", function() {
        var spec = new ManualSpec(jasmine, window.document);
        spec.addGoal("Should install rhodes-containers package on running containers build command");
        spec.addPrecondition("Install Rhodes framework to enable rho command.");
        spec.addPrecondition("Make sure token is set.");
        spec.addPrecondition("Make sure no package is installed");
        spec.addStep("Create a rhodes application.");
        spec.addStep("Run below commands to build rhodes application,rho device:android:production_with_prebuild_binary,rho device:iphone:production_with_prebuild_binary,rho device:wm:production_with_prebuild_binary ");
        spec.addExpectation("Should download rhodes-containers package and other required packages automatically and install package.");
        spec.addExpectation("Build should be successfull and should be found in bin folder.");
        spec.displayScenario();
        spec.waitForButtonPressing("Run test");
        spec.waitForResponse();
    });

    it("Should install live update package on running live update command", function() {
        var spec = new ManualSpec(jasmine, window.document);
        spec.addGoal("Should install live update package on running live update command");
        spec.addPrecondition("Install Rhodes framework to enable rho command.");
        spec.addPrecondition("Make sure no package is installed");
        spec.addPrecondition("Connect the devices to server network.");
        spec.addPrecondition("Build the application using local containers with \'development\' extension for all platforms.");
        spec.addPrecondition("Install the  application on all subscribers (WM, CE, Android, IOS, Android Simulator and IOS simulator)");
        spec.addPrecondition("Launch the application in all subscribers.");
        spec.addStep("From the project root folder run command rho dev:discovery.");
        spec.addExpectation("Should download liveupdate package and other required packages automatically and install package.");
        spec.addExpectation("Web server should be started if not running.");
        spec.addExpectation("In dev-config.yml it should register all the available subscribers with eg:devices:  uri: 192.168.1.102:37579  name: macbook-pro  platform: APPLE  application: ReloadBundleformat");
        spec.displayScenario();
        spec.waitForButtonPressing("Run test");
        spec.waitForResponse();
    });

    it("Build simple Rhoelements application and compare local container build time with cloud for WM", function() {
        var spec = new ManualSpec(jasmine, window.document);
        spec.addGoal("Build simple Rhoelements application and compare local container build time with cloud for WM");
        spec.addPrecondition("Install Rhodes framework to enable rho command.");
        spec.addPrecondition("Make sure token is set.");
        spec.addPrecondition("Make sure application has been pushed to rhohub git successfully.");
        spec.addPrecondition("Build.yml should have app_type: rhoelements");
        spec.addStep("Go to the Root folder of application which is there in RhoHub");
        spec.addStep("Run the command rho cloud:build:wm:production to build using cloud.");
        spec.addStep("Check build time in cloud.");
        spec.addStep("Now same application build using local containers.");
        spec.addStep("Run Command rho device:wm:production_with_prebuild_binary to build application using local containers.");
        spec.addStep("Check build time in local containers");
        spec.addExpectation("There should not be any time difference between local containers and cloud build timings.");
        spec.addExpectation("Build should happen within a minute.");
        spec.displayScenario();
        spec.waitForButtonPressing("Run test");
        spec.waitForResponse();
    });

    it("Build simple Rhoelements application and compare local container build time with cloud for Android", function() {
        var spec = new ManualSpec(jasmine, window.document);
        spec.addGoal("Build simple Rhoelements application and compare local container build time with cloud for Android");
        spec.addPrecondition("Install Rhodes framework to enable rho command.");
        spec.addPrecondition("Make sure token is set.");
        spec.addPrecondition("Make sure application has been pushed to rhohub git successfully.");
        spec.addPrecondition("Build.yml should have app_type: rhoelements");
        spec.addStep("Go to the Root folder of application which is there in RhoHub");
        spec.addStep("Run the command rho cloud:build:android:production to build using cloud.");
        spec.addStep("Check build time in cloud.");
        spec.addStep("Now same application build using local containers.");
        spec.addStep("Run Command rho device:android:production_with_prebuild_binary to build application using local containers.");
        spec.addStep("Check build time in local containers");
        spec.addExpectation("There should not be any time difference between local containers and cloud build timings.");
        spec.addExpectation("Build should happen within a minute.");
        spec.displayScenario();
        spec.waitForButtonPressing("Run test");
        spec.waitForResponse();
    });

    it("Build simple Rhoelements application and compare local container build time with cloud for iPhone", function() {
        var spec = new ManualSpec(jasmine, window.document);
        spec.addGoal("Build simple Rhoelements application and compare local container build time with cloud for iPhone");
        spec.addPrecondition("Install Rhodes framework to enable rho command.");
        spec.addPrecondition("Make sure token is set.");
        spec.addPrecondition("Make sure IOS certificate/provision setup done for IOS build.");
        spec.addPrecondition("Make sure application has been pushed to rhohub git successfully.");
        spec.addPrecondition("Build.yml should have app_type: rhoelements");
        spec.addStep("Go to the Root folder of application which is there in RhoHub");
        spec.addStep("Run the command rho cloud:build:iphone:development to build using cloud.");
        spec.addStep("Check build time in cloud.");
        spec.addStep("Now same application build using local containers.");
        spec.addStep("Run Command rho device:iphone:production_with_prebuild_binary to build application using local containers.");
        spec.addStep("Check build time in local containers");
        spec.addExpectation("There should not be any time difference between local containers and cloud build timings.");
        spec.addExpectation("Build should happen within a minute.");
        spec.displayScenario();
        spec.waitForButtonPressing("Run test");
        spec.waitForResponse();
    });

    it("Build simple Rhodes application and compare local container build time with cloud for WM", function() {
        var spec = new ManualSpec(jasmine, window.document);
        spec.addGoal("Build simple Rhodes application and compare local container build time with cloud for WM");
        spec.addPrecondition("Install Rhodes framework to enable rho command.");
        spec.addPrecondition("Make sure token is set.");
        spec.addPrecondition("Make sure application has been pushed to rhohub git successfully.");
        spec.addPrecondition("Remove app_type: rhoelements from build.yml.");
        spec.addStep("Go to the Root folder of application which is there in RhoHub");
        spec.addStep("Run the command rho cloud:build:wm:production to build using cloud.");
        spec.addStep("Check build time in cloud.");
        spec.addStep("Now same application build using local containers.");
        spec.addStep("Run Command rho device:wm:production_with_prebuild_binary to build application using local containers.");
        spec.addStep("Check build time in local containers");
        spec.addExpectation("There should not be any time difference between local containers and cloud build timings.");
        spec.addExpectation("Build should happen within a minute.");
        spec.displayScenario();
        spec.waitForButtonPressing("Run test");
        spec.waitForResponse();
    });

    it("Build simple Rhodes application and compare local container build time with cloud for Android", function() {
        var spec = new ManualSpec(jasmine, window.document);
        spec.addGoal("Build simple Rhodes application and compare local container build time with cloud for Android");
        spec.addPrecondition("Install Rhodes framework to enable rho command.");
        spec.addPrecondition("Make sure token is set.");
        spec.addPrecondition("Make sure application has been pushed to rhohub git successfully.");
        spec.addPrecondition("Remove app_type: rhoelements from build.yml.");
        spec.addStep("Go to the Root folder of application which is there in RhoHub");
        spec.addStep("Run the command rho cloud:build:android:production to build using cloud.");
        spec.addStep("Check build time in cloud.");
        spec.addStep("Now same application build using local containers.");
        spec.addStep("Run Command rho device:android:production_with_prebuild_binary to build application using local containers.");
        spec.addStep("Check build time in local containers");
        spec.addExpectation("There should not be any time difference between local containers and cloud build timings.");
        spec.addExpectation("Build should happen within a minute.");
        spec.displayScenario();
        spec.waitForButtonPressing("Run test");
        spec.waitForResponse();
    });

    it("Build simple Rhodes application and compare local container build time with cloud for iPhone", function() {
        var spec = new ManualSpec(jasmine, window.document);
        spec.addGoal("Build simple Rhodes application and compare local container build time with cloud for iPhone");
        spec.addPrecondition("Install Rhodes framework to enable rho command.");
        spec.addPrecondition("Make sure token is set.");
        spec.addPrecondition("Make sure application has been pushed to rhohub git successfully.");
        spec.addPrecondition("Remove app_type: rhoelements from build.yml.");
        spec.addStep("Go to the Root folder of application which is there in RhoHub");
        spec.addStep("Run the command rho cloud:build:iphone:development to build using cloud.");
        spec.addStep("Check build time in cloud.");
        spec.addStep("Now same application build using local containers.");
        spec.addStep("Run Command rho device:iphone:production_with_prebuild_binary to build application using local containers.");
        spec.addStep("Check build time in local containers");
        spec.addExpectation("There should not be any time difference between local containers and cloud build timings.");
        spec.addExpectation("Build should happen within a minute.");
        spec.displayScenario();
        spec.waitForButtonPressing("Run test");
        spec.waitForResponse();
    });

    it("Build simple Rhoelements application with all extension and compare local container build time with cloud for WM", function() {
        var spec = new ManualSpec(jasmine, window.document);
        spec.addGoal("Build simple Rhoelements application with all extension and compare local container build time with cloud for WM");
        spec.addPrecondition("Install Rhodes framework to enable rho command.");
        spec.addPrecondition("Make sure token is set.");
        spec.addPrecondition("Make sure application has been pushed to rhohub git successfully.");
        spec.addPrecondition("Remove app_type: rhoelements from build.yml.");
        spec.addPrecondition("Add all extension in build.yml extension: [\'barcode\',\'hardwarekeys\',\'indicators\',\'cardreader\',\'signature\',\'NFC\',\'SimulScan\', \'audiocapture\',\'coreapi\',\'mediaplayer\',\'screenorientation\',\'printing\',\'printing_zebra\',\'sensor\']");
        spec.addStep("Go to the Root folder of application which is there in RhoHub");
        spec.addStep("Run the command rho cloud:build:wm:production to build using cloud.");
        spec.addStep("Check build time in cloud.");
        spec.addStep("Now same application build using local containers.");
        spec.addStep("Run Command rho device:wm:production_with_prebuild_binary to build application using local containers.");
        spec.addStep("Check build time in local containers");
        spec.addExpectation("There should not be any time difference between local containers and cloud build timings.");
        spec.addExpectation("Build should happen within a minute.");
        spec.displayScenario();
        spec.waitForButtonPressing("Run test");
        spec.waitForResponse();
    });

    it("Build simple Rhoelements application with all extension and compare local container build time with cloud for Android", function() {
        var spec = new ManualSpec(jasmine, window.document);
        spec.addGoal("Build simple Rhoelements application with all extension and compare local container build time with cloud for Android");
        spec.addPrecondition("Install Rhodes framework to enable rho command.");
        spec.addPrecondition("Make sure token is set.");
        spec.addPrecondition("Make sure application has been pushed to rhohub git successfully.");
        spec.addPrecondition("Remove app_type: rhoelements from build.yml.");
        spec.addPrecondition("Add all extension in build.yml extension: [\'barcode\',\'hardwarekeys\',\'indicators\',\'cardreader\',\'signature\',\'NFC\',\'SimulScan\', \'audiocapture\',\'coreapi\',\'mediaplayer\',\'screenorientation\',\'printing\',\'printing_zebra\',\'sensor\']");
        spec.addStep("Go to the Root folder of application which is there in RhoHub");
        spec.addStep("Run the command rho cloud:build:android:production to build using cloud.");
        spec.addStep("Check build time in cloud.");
        spec.addStep("Now same application build using local containers.");
        spec.addStep("Run Command rho device:android:production_with_prebuild_binary to build application using local containers.");
        spec.addStep("Check build time in local containers");
        spec.addExpectation("There should not be any time difference between local containers and cloud build timings.");
        spec.addExpectation("Build should happen within a minute.");
        spec.displayScenario();
        spec.waitForButtonPressing("Run test");
        spec.waitForResponse();
    });

    it("Build simple Rhoelements application with all extension and compare local container build time with cloud for iPhone", function() {
        var spec = new ManualSpec(jasmine, window.document);
        spec.addGoal("Build simple Rhoelements application with all extension and compare local container build time with cloud for iPhone");
        spec.addPrecondition("Install Rhodes framework to enable rho command.");
        spec.addPrecondition("Make sure token is set.");
        spec.addPrecondition("Make sure application has been pushed to rhohub git successfully.");
        spec.addPrecondition("Remove app_type: rhoelements from build.yml.");
        spec.addPrecondition("Add all extension in build.yml extension: [\'barcode\',\'hardwarekeys\',\'indicators\',\'cardreader\',\'signature\',\'NFC\',\'SimulScan\', \'audiocapture\',\'coreapi\',\'mediaplayer\',\'screenorientation\',\'printing\',\'printing_zebra\',\'sensor\']");
        spec.addStep("Go to the Root folder of application which is there in RhoHub");
        spec.addStep("Run the command rho cloud:build:iphone:development to build using cloud.");
        spec.addStep("Check build time in cloud.");
        spec.addStep("Now same application build using local containers.");
        spec.addStep("Run Command rho device:iphone:production_with_prebuild_binary to build application using local containers.");
        spec.addStep("Check build time in local containers");
        spec.addExpectation("There should not be any time difference between local containers and cloud build timings.");
        spec.addExpectation("Build should happen within a minute.");
        spec.displayScenario();
        spec.waitForButtonPressing("Run test");
        spec.waitForResponse();
    });

    it("Build manual_common_spec application using local containers and compare local container build time with cloud for WM", function() {
        var spec = new ManualSpec(jasmine, window.document);
        spec.addGoal("Build manual_common_spec application using local containers and compare local container build time with cloud for WM");
        spec.addPrecondition("Install Rhodes framework to enable rho command.");
        spec.addPrecondition("Make sure token is set.");
        spec.addPrecondition("Make sure manual_common_spec has been pushed to rhohub git successfully and ssh setup has been done.");
        spec.addStep("Go to the Root folder of application which is there in RhoHub");
        spec.addStep("Run the command rho cloud:build:wm:production to build using cloud.");
        spec.addStep("Check build time in cloud.");
        spec.addStep("Now same application build using local containers.");
        spec.addStep("Run Command rho device:wm:production_with_prebuild_binary to build application using local containers.");
        spec.addStep("Check build time in local containers");
        spec.addExpectation("There should not be any time difference between local containers and cloud build timings.");
        spec.addExpectation("Build should happen within a minute.");
        spec.displayScenario();
        spec.waitForButtonPressing("Run test");
        spec.waitForResponse();
    });

    it("Build manual_common_spec application using local containers and compare local container build time with cloud for Android", function() {
        var spec = new ManualSpec(jasmine, window.document);
        spec.addGoal("Build manual_common_spec application using local containers and compare local container build time with cloud for Android");
        spec.addPrecondition("Install Rhodes framework to enable rho command.");
        spec.addPrecondition("Make sure token is set.");
        spec.addPrecondition("Make sure manual_common_spec has been pushed to rhohub git successfully.");
        spec.addStep("Go to the Root folder of application which is there in RhoHub");
        spec.addStep("Run the command rho cloud:build:android:production to build using cloud.");
        spec.addStep("Check build time in cloud.");
        spec.addStep("Now same application build using local containers.");
        spec.addStep("Run Command rho device:android:production_with_prebuild_binary to build application using local containers.");
        spec.addStep("Check build time in local containers");
        spec.addExpectation("There should not be any time difference between local containers and cloud build timings.");
        spec.addExpectation("Build should happen within a minute.");
        spec.displayScenario();
        spec.waitForButtonPressing("Run test");
        spec.waitForResponse();
    });

    it("Build manual_common_spec application using local containers and compare local container build time with cloud for iPhone", function() {
        var spec = new ManualSpec(jasmine, window.document);
        spec.addGoal("Build manual_common_spec application using local containers and compare local container build time with cloud for iPhone");
        spec.addPrecondition("Install Rhodes framework to enable rho command.");
        spec.addPrecondition("Make sure token is set.");
        spec.addPrecondition("Make sure manual_common_spec has been pushed to rhohub git successfully.");
        spec.addStep("Go to the Root folder of application which is there in RhoHub");
        spec.addStep("Run the command rho cloud:build:iphone:development to build using cloud.");
        spec.addStep("Check build time in cloud.");
        spec.addStep("Now same application build using local containers.");
        spec.addStep("Run Command rho device:iphone:production_with_prebuild_binary to build application using local containers.");
        spec.addStep("Check build time in local containers");
        spec.addExpectation("There should not be any time difference between local containers and cloud build timings.");
        spec.displayScenario();
        spec.waitForButtonPressing("Run test");
        spec.waitForResponse();
    });

    it("Build app_type rhoelements with free subscription using local containers ", function() {
        var spec = new ManualSpec(jasmine, window.document);
        spec.addGoal("Build app_type rhoelements with free subscription using local containers ");
        spec.addPrecondition("Install Rhodes framework to enable rho command.");
        spec.addPrecondition("Make sure token is not set.");
        spec.addPrecondition("Build.yml should have app_type: rhoelements");
        spec.addStep("Open command prompt.");
        spec.addStep("Run rho token:login");
        spec.addStep("Login using free account.");
        spec.addStep("Build the application for WM or android or iphone using local containersrho device:wm:production_with_prebuild_binaryrho device:android:production_with_prebuild_binaryrho device:iphone:production_with_prebuild_binary");
        spec.addExpectation("Should not build the rhoelements application using free account");
        spec.displayScenario();
        spec.waitForButtonPressing("Run test");
        spec.waitForResponse();
    });

    it("Build app_type rhoelements with silver subscription using local containers ", function() {
        var spec = new ManualSpec(jasmine, window.document);
        spec.addGoal("Build app_type rhoelements with silver subscription using local containers ");
        spec.addPrecondition("Install Rhodes framework to enable rho command.");
        spec.addPrecondition("Make sure token is not set.");
        spec.addPrecondition("Build.yml should have app_type: rhoelements");
        spec.addStep("Open command prompt.");
        spec.addStep("Run rho token:login");
        spec.addStep("Login using silver account.");
        spec.addStep("Build the application for WM or android or iphone using local containersrho device:wm:production_with_prebuild_binaryrho device:android:production_with_prebuild_binaryrho device:iphone:production_with_prebuild_binary");
        spec.addExpectation("Should build the rhoelements application using silver account");
        spec.displayScenario();
        spec.waitForButtonPressing("Run test");
        spec.waitForResponse();
    });

    it("Build app_type rhoelements with Gold subscription using local containers ", function() {
        var spec = new ManualSpec(jasmine, window.document);
        spec.addGoal("Build app_type rhoelements with Gold subscription using local containers ");
        spec.addPrecondition("Install Rhodes framework to enable rho command.");
        spec.addPrecondition("Make sure token is not set.");
        spec.addPrecondition("Build.yml should have app_type: rhoelements");
        spec.addStep("Open command prompt.");
        spec.addStep("Run rho token:login");
        spec.addStep("Login using Gold account.");
        spec.addStep("Build the application for WM or android or iphone using local containersrho device:wm:production_with_prebuild_binaryrho device:android:production_with_prebuild_binaryrho device:iphone:production_with_prebuild_binary");
        spec.addExpectation("Should build the rhoelements application using gold account");
        spec.displayScenario();
        spec.waitForButtonPressing("Run test");
        spec.waitForResponse();
    });

    it("Build Rhodes application using local containers with free subscription ", function() {
        var spec = new ManualSpec(jasmine, window.document);
        spec.addGoal("Build Rhodes application using local containers with free subscription ");
        spec.addPrecondition("Install Rhodes framework to enable rho command.");
        spec.addPrecondition("Make sure token is not set.");
        spec.addPrecondition("Build.yml should not contain app_type: rhoelements or paid extension");
        spec.addStep("Open command prompt.");
        spec.addStep("Run rho token:login");
        spec.addStep("Login using free account.");
        spec.addStep("Build the application for WM or android or iphone using local containersrho device:wm:production_with_prebuild_binaryrho device:android:production_with_prebuild_binaryrho device:iphone:production_with_prebuild_binary");
        spec.addExpectation("Should build the rhodes application using free account");
        spec.displayScenario();
        spec.waitForButtonPressing("Run test");
        spec.waitForResponse();
    });

    it("Should not build paid extensions using local containers with free subscription", function() {
        var spec = new ManualSpec(jasmine, window.document);
        spec.addGoal("Should not build paid extensions using local containers with free subscription");
        spec.addPrecondition("Install Rhodes framework to enable rho command.");
        spec.addPrecondition("Make sure token is not set.");
        spec.addPrecondition("Build.yml should not contain app_type: rhoelements or paid extension");
        spec.addStep("Open command prompt.");
        spec.addStep("Run rho token:login");
        spec.addStep("Login using free account.");
        spec.addStep("Add paid extension to build.yml [\'barcode\',\'hardwarekeys\',\'indicators\',\'signature\']");
        spec.addStep("Build the application for WM or android or iphone using local containersrho device:wm:production_with_prebuild_binaryrho device:android:production_with_prebuild_binaryrho device:iphone:production_with_prebuild_binary");
        spec.addExpectation("Should return error cannot build paid extension with free account.");
        spec.displayScenario();
        spec.waitForButtonPressing("Run test");
        spec.waitForResponse();
    });

    it("Should build free extensions using local containers with free subscription", function() {
        var spec = new ManualSpec(jasmine, window.document);
        spec.addGoal("Should build free extensions using local containers with free subscription");
        spec.addPrecondition("Install Rhodes framework to enable rho command.");
        spec.addPrecondition("Make sure token is not set.");
        spec.addPrecondition("Build.yml should not contain app_type: rhoelements or paid extension");
        spec.addStep("Open command prompt.");
        spec.addStep("Run rho token:login");
        spec.addStep("Login using free account.");
        spec.addStep("Add free extension to build.yml [\'audiocapture\',\'coreapi\',\'mediaplayer\',\'screenorientation\',\'printing\',\'printing_zebra\',\'sensor\', \'rhoconnect-push\', \'rhoconnect-client\']");
        spec.addStep("Build the application for WM or android or iphone using local containersrho device:wm:production_with_prebuild_binaryrho device:android:production_with_prebuild_binaryrho device:iphone:production_with_prebuild_binary");
        spec.addExpectation("Should build the application which contains free extension.");
        spec.displayScenario();
        spec.waitForButtonPressing("Run test");
        spec.waitForResponse();
    });

    it("Should be able to use one rhodes framework when All 3 Rhodes framework and Rhomobilesuite is installed", function() {
        var spec = new ManualSpec(jasmine, window.document);
        spec.addGoal("Should be able to use one rhodes framework when All 3 Rhodes framework and Rhomobilesuite is installed");
        spec.addStep("Download the Standalone package.");
        spec.addStep("Extract the package.");
        spec.addStep("Install Ruby 1.9+");
        spec.addStep("Install rho by using gem install rho");
        spec.addStep("Install Node.js 0.10+.");
        spec.addStep("Install rho by using npm install rho -g");
        spec.addStep("Install RhomobileSuite.");
        spec.addStep("Provide path of ruby installer to enable rho command");
        spec.addStep("Run rho command rho help or rho list_packages.");
        spec.addStep("Provide ENV for node installer.");
        spec.addStep("Run rho command rho help or rho list_packages.");
        spec.addExpectation("On changing to path to ruby installer rho command should use the ruby installer.");
        spec.addExpectation("On changing to path to nodejs installer rho command should use the nodejs installer.");
        spec.displayScenario();
        spec.waitForButtonPressing("Run test");
        spec.waitForResponse();
    });

    it("Running rho command with invalid application in the current directory", function() {
        var spec = new ManualSpec(jasmine, window.document);
        spec.addGoal("Running rho command with invalid application in the current directory");
        spec.addPrecondition("Install Rhodes framework to enable rho command.");
        spec.addPrecondition("Make sure token is set.");
        spec.addStep("Goto Empty folder or Invalid Rhoelements or Rhodes app.");
        spec.addStep("Build the application for WM or android or iphone using local containers.rho device:wm:production_with_prebuild_binaryrho device:android:production_with_prebuild_binaryrho device:iphone:production_with_prebuild_binary");
        spec.addExpectation("Should return this is not a valid rhodes or rhoelements app.");
        spec.displayScenario();
        spec.waitForButtonPressing("Run test");
        spec.waitForResponse();
    });

    it("Subscription check with rho container run command", function() {
        var spec = new ManualSpec(jasmine, window.document);
        spec.addGoal("Subscription check with rho container run command");
        spec.addPrecondition("Install Rhodes framework to enable rho command.");
        spec.addPrecondition("Make sure token is not set.");
        spec.addStep("Build the application for WM or android or iphone using local containers commandrho containers:run:android:device,rho containers:run:iphone:device,rho containers:run:wm:device ");
        spec.addStep("Check if it asks for rhohub login credentials or not.");
        spec.addStep("Provide valid login details.");
        spec.addExpectation("Should ask for rhohub login credentials after initiating the build.");
        spec.addExpectation("Once the valid credential is provided build should start.");
        spec.displayScenario();
        spec.waitForButtonPressing("Run test");
        spec.waitForResponse();
    });

    it("Subscription check with rho container production_with_prebuild_binary command", function() {
        var spec = new ManualSpec(jasmine, window.document);
        spec.addGoal("Subscription check with rho container production_with_prebuild_binary command");
        spec.addPrecondition("Install Rhodes framework to enable rho command.");
        spec.addPrecondition("Make sure token is not set.");
        spec.addStep("Build the application for WM or android or iphone using local containers commandrho device:android:production_with_prebuild_binary,rho device:iphone:production_with_prebuild_binary,rho device:wm:production_with_prebuild_binary");
        spec.addStep("Check if it asks for rhohub login credentials or not.");
        spec.addStep("Provide valid login details.");
        spec.addExpectation("Should ask for rhohub login credentials after initiating the build.");
        spec.addExpectation("Once the valid credential is provided build should start.");
        spec.displayScenario();
        spec.waitForButtonPressing("Run test");
        spec.waitForResponse();
    });

    it("Subscription check with rho container rhosimulator command", function() {
        var spec = new ManualSpec(jasmine, window.document);
        spec.addGoal("Subscription check with rho container rhosimulator command");
        spec.addPrecondition("Install Rhodes framework to enable rho command.");
        spec.addPrecondition("Make sure token is not set.");
        spec.addStep("Build the application for WM or android or iphone using local containers commandrho run:android:rhosimulator,rho run:iphone:rhosimulator,rho run:wm:rhosimulator");
        spec.addStep("Check if it asks for rhohub login credentials or not.");
        spec.addStep("Provide valid login details.");
        spec.addExpectation("Should ask for rhohub login credentials after initiating the build.");
        spec.addExpectation("Once the valid credential is provided build should start.");
        spec.displayScenario();
        spec.waitForButtonPressing("Run test");
        spec.waitForResponse();
    });

    it("Subscription check with rho container simulator command", function() {
        var spec = new ManualSpec(jasmine, window.document);
        spec.addGoal("Subscription check with rho container simulator command");
        spec.addPrecondition("Install Rhodes framework to enable rho command.");
        spec.addPrecondition("Make sure token is not set.");
        spec.addStep("Build the application for WM or android or iphone using local containers commandrho containers:run:android:simulator,rho containers:run:iphone:simulator,rho containers:run:wm:simulator");
        spec.addStep("Check if it asks for rhohub login credentials or not.");
        spec.addStep("Provide valid login details.");
        spec.addExpectation("Should ask for rhohub login credentials after initiating the build.");
        spec.addExpectation("Once the valid credential is provided build should start.");
        spec.displayScenario();
        spec.waitForButtonPressing("Run test");
        spec.waitForResponse();
    });

    it("Don\'t Provide rhohub login details in command line", function() {
        var spec = new ManualSpec(jasmine, window.document);
        spec.addGoal("Don\'t Provide rhohub login details in command line");
        spec.addPrecondition("Install Rhodes framework to enable rho command.");
        spec.addPrecondition("Make sure token is not set.");
        spec.addStep("Build the application for WM or android or iphone using local containers command");
        spec.addStep("Don\'t provide any credentails and try to come out.");
        spec.addExpectation("There should be way to terminate and comeout of the flow without providing the login credentials");
        spec.displayScenario();
        spec.waitForButtonPressing("Run test");
        spec.waitForResponse();
    });

    it("Provide invalid rhohub login credentials in command line", function() {
        var spec = new ManualSpec(jasmine, window.document);
        spec.addGoal("Provide invalid rhohub login credentials in command line");
        spec.addPrecondition("Install Rhodes framework to enable rho command.");
        spec.addPrecondition("Make sure token is not set.");
        spec.addStep("Build the application for WM or android or iphone using local containers command");
        spec.addStep("Provide invalid rhohub login credentials and igonre the warning messages");
        spec.addStep("And try to build the application again and check if it asks for rhohub login credentials again or not");
        spec.addExpectation("Should return error invalid username and password.");
        spec.addExpectation("On building again should ask for login credenial.");
        spec.displayScenario();
        spec.waitForButtonPressing("Run test");
        spec.waitForResponse();
    });

    it("Build rhoelements app after 7 days in command line", function() {
        var spec = new ManualSpec(jasmine, window.document);
        spec.addGoal("Build rhoelements app after 7 days in command line");
        spec.addPrecondition("Install Rhodes framework to enable rho command.");
        spec.addPrecondition("Make sure token is not set.");
        spec.addPrecondition("Make sure you have have gold subscription profile at rhohub.com");
        spec.addStep("Set the token with rho token:login");
        spec.addStep("Build the rhoelements application using containers command.");
        spec.addStep("Make sure token has not been reset in next 7 days");
        spec.addStep("Build the application again after 7 days.");
        spec.addStep("Check for build success or error log");
        spec.addExpectation("The build should succeed after 7 days of setting token");
        spec.displayScenario();
        spec.waitForButtonPressing("Run test");
        spec.waitForResponse();
    });

    it("Build rhoelements app after 7 days without network", function() {
        var spec = new ManualSpec(jasmine, window.document);
        spec.addGoal("Build rhoelements app after 7 days without network");
        spec.addPrecondition("Install Rhodes framework to enable rho command.");
        spec.addPrecondition("Make sure token is not set.");
        spec.addPrecondition("Make sure you have have gold subscription profile at rhohub.com");
        spec.addStep("Set the token with rho token:login");
        spec.addStep("Build the rhoelements application using containers command.");
        spec.addStep("Remove network connection");
        spec.addStep("Make sure token has not been reset in next 7 days");
        spec.addStep("Build the application again after 7 days.");
        spec.addStep("Check for build success or error log");
        spec.addExpectation("The build should not succeed after 7 days of setting token");
        spec.displayScenario();
        spec.waitForButtonPressing("Run test");
        spec.waitForResponse();
    });

    it("Build rhoelements app after original subscription expiry date", function() {
        var spec = new ManualSpec(jasmine, window.document);
        spec.addGoal("Build rhoelements app after original subscription expiry date");
        spec.addPrecondition("Install Rhodes framework to enable rho command.");
        spec.addPrecondition("Make sure token is not set.");
        spec.addPrecondition("Make sure you have have gold subscription profile at rhohub.com");
        spec.addStep("Set the token with rho token:login");
        spec.addStep("Build the rhoelements application using containers command.");
        spec.addStep("Build the application again after actual subscription expiry date.");
        spec.addStep("Check for build success or error log");
        spec.addExpectation("The build should not succeed after subscription expired.");
        spec.addExpectation("It should retrun message to renew the subscription");
        spec.displayScenario();
        spec.waitForButtonPressing("Run test");
        spec.waitForResponse();
    });

    it("Build rhodes app after 1 month with free subscription and no network", function() {
        var spec = new ManualSpec(jasmine, window.document);
        spec.addGoal("Build rhodes app after 1 month with free subscription and no network");
        spec.addPrecondition("Install Rhodes framework to enable rho command.");
        spec.addPrecondition("Make sure token is not set.");
        spec.addPrecondition("Make sure you have have free subscription profile at rhohub.com");
        spec.addStep("Set the token with rho token:login");
        spec.addStep("Build the rhodes application using containers command.");
        spec.addStep("Remove the network connection");
        spec.addStep("Make sure token has not been reset for 1 month");
        spec.addStep("Build the application again after 1 month");
        spec.addStep("Check for build success or error log");
        spec.addExpectation("The rhodes build should succeed after 1 month being in without network.");
        spec.displayScenario();
        spec.waitForButtonPressing("Run test");
        spec.waitForResponse();
    });

    it("Should search and register all the subscribers connected to the server", function() {
        var spec = new ManualSpec(jasmine, window.document);
        spec.addGoal("Should search and register all the subscribers connected to the server");
        spec.addPrecondition("Connect the devices to server network.");
        spec.addPrecondition("Build the application using local containers with \'development\' extension for all platforms.");
        spec.addPrecondition("Install the  application on all subscribers (WM, CE, Android, IOS, Android Simulator and IOS simulator)");
        spec.addPrecondition("Launch the application in all subscribers.");
        spec.addStep("From the project root folder run command rho dev:discovery.");
        spec.addExpectation("Web server should be started if not running.");
        spec.addExpectation("In dev-config.yml it should register all the available subscribers with eg:devices:  uri: 192.168.1.102:37579  name: macbook-pro  platform: APPLE  application: ReloadBundleformat");
        spec.displayScenario();
        spec.waitForButtonPressing("Run test");
        spec.waitForResponse();
    });

    it("Discovery from app2 when app1 and app2 is launched in different subscribers", function() {
        var spec = new ManualSpec(jasmine, window.document);
        spec.addGoal("Discovery from app2 when app1 and app2 is launched in different subscribers");
        spec.addPrecondition("Connect the devices to server network.");
        spec.addPrecondition("Build the app1 and app2 using local containers with \'development\' extension for all platforms.");
        spec.addPrecondition("Install app1 and app2 application on all subscribers (WM, CE, Android, IOS, Android Simulator and IOS simulator).");
        spec.addPrecondition("Launch the app1 in some subscribers and app2 in other subscribers.");
        spec.addStep("From app2 project root folder run command rho dev:discovery.");
        spec.addExpectation("Web server should be started if not running.");
        spec.addExpectation("Devices launched with App1 and App2 should be registered in dev_config.yml.");
        spec.displayScenario();
        spec.waitForButtonPressing("Run test");
        spec.waitForResponse();
    });

    it("On applying partial update, should detect changed HTML file, builds partial bundle update and sends notification", function() {
        var spec = new ManualSpec(jasmine, window.document);
        spec.addGoal("On applying partial update, should detect changed HTML file, builds partial bundle update and sends notification");
        spec.addPrecondition("Connect the devices to server network.");
        spec.addPrecondition("Build the application using local containers with \'development\' extension for all platforms.");
        spec.addPrecondition("Install the  application on all subscribers (WM, CE, Android, IOS, Android Simulator and IOS simulator).");
        spec.addPrecondition("Launch the application in all subscribers.");
        spec.addPrecondition("Discover and register subscribers in dev-config.yml.");
        spec.addStep("Modify HTML file in app and pubic folder with code <p id=\'pid\' onClick=\'alertTest()\'>Modified HTML file onetime update</p>.");
        spec.addStep("Call rho dev:update:partial");
        spec.addStep("Refresh the page.");
        spec.addExpectation("Web server should be started if not running");
        spec.addExpectation("Should detect changed html file, builds partial bundle update and sends notification to subscriber.");
        spec.addExpectation("After refresh modified HTML page should be displayed.");
        spec.displayScenario();
        spec.waitForButtonPressing("Run test");
        spec.waitForResponse();
    });

    it("On applying partial update, should detect changed JS file, builds partial bundle update and sends notification", function() {
        var spec = new ManualSpec(jasmine, window.document);
        spec.addGoal("On applying partial update, should detect changed JS file, builds partial bundle update and sends notification");
        spec.addPrecondition("Connect the devices to server network.");
        spec.addPrecondition("Build the application using local containers with \'development\' extension for all platforms.");
        spec.addPrecondition("Install the  application on all subscribers (WM, CE, Android, IOS, Android Simulator and IOS simulator)");
        spec.addPrecondition("Launch the application in all subscribers.");
        spec.addPrecondition("Discover and register subscribers in dev-config.yml.");
        spec.addPrecondition("Add refresh: true to dev-config.yml");
        spec.addPrecondition("Stop all servers and start webserver rho dev:webserver:start");
        spec.addStep("Modify JS file in app and pubic folder with code function alertTest() { alert(\'Test alert for onetime update\')} ");
        spec.addStep("Call rho dev:update:partial.");
        spec.addStep("Call the alertTest funtion.");
        spec.addExpectation("Web server should be started.");
        spec.addExpectation("Should detect changed JS file, builds partial bundle update and sends notification  to subscriber.");
        spec.addExpectation("Automatic page refresh should happen and on calling alert function should display alert message.");
        spec.displayScenario();
        spec.waitForButtonPressing("Run test");
        spec.waitForResponse();
    });

    it("On applying partial update, should detect changed CSS file, builds partial bundle update and sends notification", function() {
        var spec = new ManualSpec(jasmine, window.document);
        spec.addGoal("On applying partial update, should detect changed CSS file, builds partial bundle update and sends notification");
        spec.addPrecondition("Connect the devices to server network.");
        spec.addPrecondition("Build the application using local containers with \'development\' extension for all platforms.");
        spec.addPrecondition("Install the  application on all subscribers (WM, CE, Android, IOS, Android Simulator and IOS simulator)");
        spec.addPrecondition("Launch the application in all subscribers.");
        spec.addPrecondition("Discover and register subscribers in dev-config.yml.");
        spec.addPrecondition("Add refresh: false to dev-config.yml");
        spec.addStep("Modify CSS file in app and public folder with code #pid {background-color:red}.");
        spec.addStep("Call rho dev:update:partial.");
        spec.addStep("Refresh the page.");
        spec.addExpectation("Web server should be started if not running");
        spec.addExpectation("Should detect changed CSS file, builds partial bundle update and sends notification to subscriber.");
        spec.addExpectation("After manual refresh Background-color should be Red.");
        spec.displayScenario();
        spec.waitForButtonPressing("Run test");
        spec.waitForResponse();
    });

    it("On applying partial update, should detect changed Ruby file, builds partial bundle update and sends notification", function() {
        var spec = new ManualSpec(jasmine, window.document);
        spec.addGoal("On applying partial update, should detect changed Ruby file, builds partial bundle update and sends notification");
        spec.addPrecondition("Connect the devices to server network.");
        spec.addPrecondition("Build the application using local containers with \'development\' extension for all platforms.");
        spec.addPrecondition("Install the  application on all subscribers (WM, CE, Android, IOS, Android Simulator and IOS simulator)");
        spec.addPrecondition("Launch the application in all subscribers.");
        spec.addPrecondition("Discover and register subscribers in dev-config.yml.");
        spec.addStep("Modify controller file in app folder with code def show_popup  Alert.show_popup \'Test alert for onetime update\'; end");
        spec.addStep("Add link to this function in erb file with code <%= link_to \'[show_popup]\', { :action => :show_popup }%> ");
        spec.addStep("Call rho dev:update:partial.");
        spec.addStep("Refresh the page.");
        spec.addStep("Call show_popup function.");
        spec.addExpectation("Web server should be started if not running");
        spec.addExpectation("Should detect changed erb and controller file, builds partial bundle update and sends notification to subscriber.");
        spec.addExpectation("Popup should be displayed on calling show popup function.");
        spec.displayScenario();
        spec.waitForButtonPressing("Run test");
        spec.waitForResponse();
    });

    it("On applying partial update, should detect newly added HTML, CSS, JS, image and Ruby files and builds partial bundle update and sends notification", function() {
        var spec = new ManualSpec(jasmine, window.document);
        spec.addGoal("On applying partial update, should detect newly added HTML, CSS, JS, image and Ruby files and builds partial bundle update and sends notification");
        spec.addPrecondition("Connect the devices to server network.");
        spec.addPrecondition("Build the application using local containers with \'development\' extension for all platforms.");
        spec.addPrecondition("Install the  application on all subscribers (WM, CE, Android, IOS, Android Simulator and IOS simulator).");
        spec.addPrecondition("Launch the application in all subscribers.");
        spec.addPrecondition("Discover and register subscribers in dev-config.yml.");
        spec.addStep("To App and public folder Add new HTML, CSS, JS, image and Ruby files");
        spec.addStep("Add links to the newly added files.");
        spec.addStep("Call rho dev:update:partial.");
        spec.addExpectation("Web server should be started if not running");
        spec.addExpectation("Should detect added HTML, CSS, JS, image and Ruby files, builds partial bundle update and sends notification to subscriber.");
        spec.addExpectation("Added HTML, CSS, JS, image and Ruby files links should be working.");
        spec.displayScenario();
        spec.waitForButtonPressing("Run test");
        spec.waitForResponse();
    });

    it("Should Auto update in all registered subscribers on Modifying HTML files", function() {
        var spec = new ManualSpec(jasmine, window.document);
        spec.addGoal("Should Auto update in all registered subscribers on Modifying HTML files");
        spec.addPrecondition("Connect the devices to server network.");
        spec.addPrecondition("Build the application using local containers with \'development\' extension for all platforms.");
        spec.addPrecondition("Install the  application on all subscribers (WM, CE, Android, IOS, Android Simulator and IOS simulator)");
        spec.addPrecondition("Launch the application in all subscribers.");
        spec.addPrecondition("Discover and register subscribers in dev-config.yml.");
        spec.addPrecondition("To Apply auto update run command rho dev:update:auto");
        spec.addStep("Modify HTML file in app and pubic folder with code <p id=\'pid\' onClick=\'alertTest()\'> Auto update HTML files </p>.");
        spec.addStep("Refresh the page.");
        spec.addExpectation("Web server should be started if not running");
        spec.addExpectation("The auto update command should launch file system monitoring process. ");
        spec.addExpectation("On changing HTML file monitoring process should run rho dev:update:partial and apply changes to subscriber.");
        spec.addExpectation("After refresh modified HTML content should be seen.");
        spec.displayScenario();
        spec.waitForButtonPressing("Run test");
        spec.waitForResponse();
    });

    it("Should Auto update in all registered subscribers on Modifying JS files", function() {
        var spec = new ManualSpec(jasmine, window.document);
        spec.addGoal("Should Auto update in all registered subscribers on Modifying JS files");
        spec.addPrecondition("Connect the devices to server network.");
        spec.addPrecondition("Build the application using local containers with \'development\' extension for all platforms.");
        spec.addPrecondition("Install the  application on all subscribers (WM, CE, Android, IOS, Android Simulator and IOS simulator)");
        spec.addPrecondition("Launch the application in all subscribers.");
        spec.addPrecondition("Discover and register subscribers in dev-config.yml.");
        spec.addPrecondition("Add refresh: false to dev-config.yml.");
        spec.addPrecondition("To Apply auto update run command rho dev:update:auto");
        spec.addStep("Modify JS file in app and pubic folder with code function alertTest() { alert(\'Test alert for auto update\')}");
        spec.addStep("Call the alertTest funtion.");
        spec.addExpectation("Web server should be started if not running");
        spec.addExpectation("The auto update command should launch file system monitoring process.");
        spec.addExpectation("On changing JS file monitoring process should run rho dev:update:partial and apply changes to subscriber.");
        spec.addExpectation("After refresh alert message should be displayed.");
        spec.displayScenario();
        spec.waitForButtonPressing("Run test");
        spec.waitForResponse();
    });

    it("Should Auto update in all registered subscribers on Modifying CSS file", function() {
        var spec = new ManualSpec(jasmine, window.document);
        spec.addGoal("Should Auto update in all registered subscribers on Modifying CSS file");
        spec.addPrecondition("Connect the devices to server network.");
        spec.addPrecondition("Build the application using local containers with \'development\' extension for all platforms.");
        spec.addPrecondition("Install the  application on all subscribers (WM, CE, Android, IOS, Android Simulator and IOS simulator)");
        spec.addPrecondition("Launch the application in all subscribers.");
        spec.addPrecondition("Discover and register subscribers in dev-config.yml.");
        spec.addPrecondition("Add refresh: true to dev-config.yml.");
        spec.addPrecondition("To Apply auto update run command rho dev:update:auto");
        spec.addStep("Modify CSS file in app and public folder with code #pid {background-color:green}.");
        spec.addExpectation("Web server should be started if not running");
        spec.addExpectation("The auto update command should launch file system monitoring process. ");
        spec.addExpectation("On changing CSS file monitoring process should run rho dev:update:partial and apply changes to subscriber.");
        spec.addExpectation("Page should be refreshed automatically and background-color green should be applied to page.");
        spec.displayScenario();
        spec.waitForButtonPressing("Run test");
        spec.waitForResponse();
    });

    it("Should Auto update in all registered subscribers on Modifying ruby files", function() {
        var spec = new ManualSpec(jasmine, window.document);
        spec.addGoal("Should Auto update in all registered subscribers on Modifying ruby files");
        spec.addPrecondition("Connect the devices to server network.");
        spec.addPrecondition("Build the application using local containers with \'development\' extension for all platforms.");
        spec.addPrecondition("Install the  application on all subscribers (WM, CE, Android, IOS, Android Simulator and IOS simulator)");
        spec.addPrecondition("Launch the application in all subscribers.");
        spec.addPrecondition("Discover and register subscribers in dev-config.yml.");
        spec.addPrecondition("Add refresh: true to dev-config.yml.");
        spec.addPrecondition("To Apply auto update run command rho dev:update:auto");
        spec.addStep("Modify controller file in app folder with code def show_popup  Alert.show_popup \'Test alert for Auto update\';end");
        spec.addStep("Add link to this function in erb file with code <%= link_to \'[show_popup]\', { :action => :show_popup }%> ");
        spec.addStep("Call show_popup function.");
        spec.addExpectation("Web server should be started if not running");
        spec.addExpectation("The auto update command should launch file system monitoring process. ");
        spec.addExpectation("On changing Ruby file monitoring process should run rho dev:update:partial and apply changes to subscriber.");
        spec.addExpectation("Page should be refreshed automatically and popup should be displayed on calling show popup function.");
        spec.displayScenario();
        spec.waitForButtonPressing("Run test");
        spec.waitForResponse();
    });

    it("Should Auto update in all registered subscribers on Adding new model to project", function() {
        var spec = new ManualSpec(jasmine, window.document);
        spec.addGoal("Should Auto update in all registered subscribers on Adding new model to project");
        spec.addPrecondition("Connect the devices to server network.");
        spec.addPrecondition("Build the application using local containers with \'development\' extension for all platforms.");
        spec.addPrecondition("Install the  application on all subscribers (WM, CE, Android, IOS, Android Simulator and IOS simulator)");
        spec.addPrecondition("Launch the application in all subscribers.");
        spec.addPrecondition("Discover and register subscribers in dev-config.yml.");
        spec.addPrecondition("To Apply auto update run command rho dev:update:auto");
        spec.addStep("In the app folder add a model by using the command rhodes model newmodel test1 test2 test3.");
        spec.addStep("Refresh the page and open the newmodel added to the application.");
        spec.addExpectation("Web server should be started if not running");
        spec.addExpectation("The auto update command should launch file system monitoring process. ");
        spec.addExpectation("On adding newmodel monitoring process should run rho dev:update:partial and apply changes to subscriber.");
        spec.addExpectation("New model should be loaded.");
        spec.displayScenario();
        spec.waitForButtonPressing("Run test");
        spec.waitForResponse();
    });

    it("Should Auto update in all registered subscribers on adding new HTML, CSS, JS, image and Ruby files to project.", function() {
        var spec = new ManualSpec(jasmine, window.document);
        spec.addGoal("Should Auto update in all registered subscribers on adding new HTML, CSS, JS, image and Ruby files to project.");
        spec.addPrecondition("Connect the devices to server network.");
        spec.addPrecondition("Build the application using local containers with \'development\' extension for all platforms.");
        spec.addPrecondition("Install the  application on all subscribers (WM, CE, Android, IOS, Android Simulator and IOS simulator)");
        spec.addPrecondition("Launch the application in all subscribers.");
        spec.addPrecondition("Discover and register subscribers in dev-config.yml.");
        spec.addPrecondition("To Apply auto update run command rho dev:update:auto");
        spec.addStep("To App and public folder Add new HTML, CSS, JS, image and Ruby files");
        spec.addStep("Add links to the newly added files.");
        spec.addStep("Refresh the page.");
        spec.addExpectation("Web server should be started if not running");
        spec.addExpectation("The auto update command should launch file system monitoring process. ");
        spec.addExpectation("On adding HTML, CSS, JS and Ruby files monitoring process should run rho dev:update:partial and apply changes to subscriber.");
        spec.addExpectation("On refreshing added HTML, CSS, JS, image and Ruby files should be loaded.");
        spec.displayScenario();
        spec.waitForButtonPressing("Run test");
        spec.waitForResponse();
    });

    it("Should Auto update in all registered subscribers on Deleting HTML, JS, CSS files from project", function() {
        var spec = new ManualSpec(jasmine, window.document);
        spec.addGoal("Should Auto update in all registered subscribers on Deleting HTML, JS, CSS files from project");
        spec.addPrecondition("Connect the devices to server network.");
        spec.addPrecondition("Build the application using local containers with \'development\' extension for all platforms.");
        spec.addPrecondition("Install the  application on all subscribers (WM, CE, Android, IOS, Android Simulator and IOS simulator)");
        spec.addPrecondition("Launch the application in all subscribers.");
        spec.addPrecondition("Discover and register subscribers in dev-config.yml.");
        spec.addPrecondition("To Apply auto update run command rho dev:update:auto");
        spec.addStep("Delete HTML, CSS, JS, image and Ruby files from app and public folder.");
        spec.addStep("Refresh the page.");
        spec.addStep("Check the links working or not.");
        spec.addExpectation("Web server should be started if not running");
        spec.addExpectation("The auto update command should launch file system monitoring process. ");
        spec.addExpectation("On deleting HTML, CSS, JS and Ruby monitoring process should run rho dev:update:partial and apply changes to subscriber..");
        spec.addExpectation("HTML, CSS, JS and Ruby files should be deleted in all devices, links to corresponding files should not work.");
        spec.displayScenario();
        spec.waitForButtonPressing("Run test");
        spec.waitForResponse();
    });

    it("Full bundle update on modifying HTML, CSS, JS and Ruby files to project.", function() {
        var spec = new ManualSpec(jasmine, window.document);
        spec.addGoal("Full bundle update on modifying HTML, CSS, JS and Ruby files to project.");
        spec.addPrecondition("Connect the devices to server network.");
        spec.addPrecondition("In local computer build the application with \'development\' extension for all platforms.");
        spec.addPrecondition("Install the  application on all subscribers (WM, CE, Android, IOS, Android Simulator and IOS simulator)");
        spec.addPrecondition("Launch the application in all subscribers.");
        spec.addPrecondition("Discover and register subscribers in dev-config.yml.");
        spec.addStep("Modify HTML, CSS, JS and Ruby files.");
        spec.addStep("Run command rho dev:update:full.");
        spec.addStep("Refresh the page.");
        spec.addExpectation("Web server should be started if not running");
        spec.addExpectation("Should detect changed html, css, js and ruby file, builds full bundle update and sends notification to subscriber.");
        spec.addExpectation("After refresh modified HTML, JS, CSS and Ruby files should be displayed.");
        spec.displayScenario();
        spec.waitForButtonPressing("Run test");
        spec.waitForResponse();
    });

    it("Full bundle update on adding new HTML, CSS, JS and Ruby files to project.", function() {
        var spec = new ManualSpec(jasmine, window.document);
        spec.addGoal("Full bundle update on adding new HTML, CSS, JS and Ruby files to project.");
        spec.addPrecondition("Connect the devices to server network.");
        spec.addPrecondition("Build the application using local containers with \'development\' extension for all platforms.");
        spec.addPrecondition("Install the  application on all subscribers (WM, CE, Android, IOS, Android Simulator and IOS simulator)");
        spec.addPrecondition("Launch the application in all subscribers.");
        spec.addPrecondition("Discover and register subscribers in dev-config.yml.");
        spec.addStep("To App and public folder Add new HTML, CSS, JS, image and Ruby files");
        spec.addStep("Add links to the newly added files.");
        spec.addStep("Run command rho dev:update:full.");
        spec.addStep("Refresh the page.");
        spec.addExpectation("Web server should be started if not running");
        spec.addExpectation("Should bundle all the files located in app and public folder and should notify subscriber");
        spec.addExpectation("Added HTML, CSS, JS, Ruby and image files should be reflected in the subscriber.");
        spec.displayScenario();
        spec.waitForButtonPressing("Run test");
        spec.waitForResponse();
    });

    it("Should return an error message on Modifying project files when device is switched off and start the application for full bundle update", function() {
        var spec = new ManualSpec(jasmine, window.document);
        spec.addGoal("Should return an error message on Modifying project files when device is switched off and start the application for full bundle update");
        spec.addPrecondition("Connect the devices to server network.");
        spec.addPrecondition("Build the application using local containers with \'development\' extension for all platforms.");
        spec.addPrecondition("Install the  application on all subscribers (WM, CE, Android, IOS, Android Simulator and IOS simulator)");
        spec.addPrecondition("Launch the application in all subscribers.");
        spec.addPrecondition("Discover and register subscribers in dev-config.yml.");
        spec.addPrecondition("To Apply auto update run command rho dev:update:auto");
        spec.addStep("Switch off the device.");
        spec.addStep("Modify HTML file in app and pubic folder with code <p id=\'pid\' onClick=\'alertTest()\'>Device is switched off.</p>.");
        spec.addStep("Modify js file in app and publid folder. function alertTest() { alert(\'Device is switched off\')}");
        spec.addStep("Add css styling to css file #pid {background-color:#00ff00}");
        spec.addStep("Turn on the device and start the application.");
        spec.addStep("Refresh the page.");
        spec.addExpectation("Web server should be started if not running");
        spec.addExpectation("The auto update command should launch file system monitoring process. ");
        spec.addExpectation("On modifying files monitoring process should run rho dev:update:partial.");
        spec.addExpectation("In Web-server terminal window should get error \'subcriber notify…failed\'. ");
        spec.addExpectation("After starting the application full bundle update should happen.");
        spec.addExpectation("Modified files should get reflected in the subscriber.");
        spec.displayScenario();
        spec.waitForButtonPressing("Run test");
        spec.waitForResponse();
    });

    it("Should return an error message on modifying project files when application was terminated and start the application for full bundle update", function() {
        var spec = new ManualSpec(jasmine, window.document);
        spec.addGoal("Should return an error message on modifying project files when application was terminated and start the application for full bundle update");
        spec.addPrecondition("Connect the devices to server network.");
        spec.addPrecondition("Build the application using local containers with \'development\' extension for all platforms.");
        spec.addPrecondition("Install the  application on all subscribers (WM, CE, Android, IOS, Android Simulator and IOS simulator)");
        spec.addPrecondition("Launch the application in all subscribers.");
        spec.addPrecondition("Discover and register subscribers in dev-config.yml.");
        spec.addPrecondition("To Apply auto update run command rho dev:update:auto");
        spec.addStep("Terminate the application on the device.");
        spec.addStep("Modify HTML file in app and pubic folder with code <p id=\'pid\' onClick=\'alertTest()\'>Application terminated</p>.");
        spec.addStep("Modify controller file in app folder with code def show_popup  Alert.show_popup \'Application Terminated\'; end");
        spec.addStep("Add link to this function in erb file with code <%= link_to \'[show_popup]\', { :action => :show_popup }%>");
        spec.addStep("Start the application.");
        spec.addStep("Refresh the page.");
        spec.addExpectation("Web server should be started if not running");
        spec.addExpectation("The auto update command should launch file system monitoring process. ");
        spec.addExpectation("On modifying files monitoring process should run rho dev:update:partial.");
        spec.addExpectation("In Web-server terminal window should get error \'subcriber notify…failed\'. ");
        spec.addExpectation("After starting the application full bundle update should happen.");
        spec.addExpectation("Modified files should get reflected in the subscriber.");
        spec.displayScenario();
        spec.waitForButtonPressing("Run test");
        spec.waitForResponse();
    });

    it("Adding files to project when network is not avaiable and full bundle update once the network is available", function() {
        var spec = new ManualSpec(jasmine, window.document);
        spec.addGoal("Adding files to project when network is not avaiable and full bundle update once the network is available");
        spec.addPrecondition("Connect the devices to server network.");
        spec.addPrecondition("Build the application using local containers with \'development\' extension for all platforms.");
        spec.addPrecondition("Install the  application on all subscribers (WM, CE, Android, IOS, Android Simulator and IOS simulator)");
        spec.addPrecondition("Launch the application in all subscribers.");
        spec.addPrecondition("Discover and register subscribers in dev-config.yml.");
        spec.addStep("Disable network connection on the device");
        spec.addStep("Add HTML, CSS, JS, erb and image files to project.");
        spec.addStep("Run rho dev:update:partial");
        spec.addStep("After getting error message, Enable network on devices.");
        spec.addStep("Run rho dev:update:partial.");
        spec.addExpectation("Web server should be started if not running");
        spec.addExpectation("On running run rho dev:update:partial when network is disabled Web-server terminal window should get error \'subcriber notify…failed\'. ");
        spec.addExpectation("After regaining network full bundle update should happen.");
        spec.addExpectation("Added files should get reflected in the subscriber.");
        spec.displayScenario();
        spec.waitForButtonPressing("Run test");
        spec.waitForResponse();
    });

    it("Should update new subscriber with modified files when it is newly registered", function() {
        var spec = new ManualSpec(jasmine, window.document);
        spec.addGoal("Should update new subscriber with modified files when it is newly registered");
        spec.addPrecondition("Connect any 2 devices to server network.");
        spec.addPrecondition("Build the application using local containers with \'development\' extension for all platforms.");
        spec.addPrecondition("Install the application in 3 subscribers.");
        spec.addPrecondition("Launch the application in 2 subscribers.");
        spec.addPrecondition("Discover and register 2 subscribers in dev-config.yml.");
        spec.addPrecondition("Add refresh: true to dev-config.yml.");
        spec.addPrecondition("To Apply auto update run command rho dev:update:auto");
        spec.addStep("Modify HTML file in app folder with code <p>First update 2 devices</p>.");
        spec.addStep("Now Discover and register 3rd subscriber in dev-config.yml.");
        spec.addStep("Launch application in 3rd subscriber.");
        spec.addStep("Append HTML file in app folder with code <p>Second update 3 devices</p>.");
        spec.addExpectation("Web server should be started if not running.");
        spec.addExpectation("The auto update command should launch file system monitoring process. ");
        spec.addExpectation("When 3rd device is registered, it should apply with both the updates.");
        spec.displayScenario();
        spec.waitForButtonPressing("Run test");
        spec.waitForResponse();
    });

    it("Using External file watcher grunt to detect changes in HTML file", function() {
        var spec = new ManualSpec(jasmine, window.document);
        spec.addGoal("Using External file watcher grunt to detect changes in HTML file");
        spec.addPrecondition("Connect the devices to server network.");
        spec.addPrecondition("Build the application using local containers with \'development\' extension for all platforms.");
        spec.addPrecondition("Install the  application on all subscribers (WM, CE, Android, IOS, Android Simulator and IOS simulator)");
        spec.addPrecondition("Launch the application in all subscribers.");
        spec.addPrecondition("Discover and register subscribers in dev-config.yml.");
        spec.addPrecondition("Add refresh: true to dev-config.yml");
        spec.addPrecondition("Run external file watcher grunt.");
        spec.addStep("Modify HTML file in app and pubic folder with code <p id=\'pid\' onClick=\'alertTest()\'>External file watcher grunt </p>.");
        spec.addStep("External watcher should create list of changed files in upgrade_package_add_files.txt");
        spec.addStep("By using modified files list call command rho dev:update:build_and_notify.");
        spec.addExpectation("Web server should be started if not running");
        spec.addExpectation("Build_and_notify command should build partial bundle from upgrade_package_add_files.txt files list.");
        spec.addExpectation("Should auto refresh and modified HTML page should be displayed.");
        spec.displayScenario();
        spec.waitForButtonPressing("Run test");
        spec.waitForResponse();
    });

    it("Using External file watcher grunt to detect added JS file", function() {
        var spec = new ManualSpec(jasmine, window.document);
        spec.addGoal("Using External file watcher grunt to detect added JS file");
        spec.addPrecondition("Connect the devices to server network.");
        spec.addPrecondition("Build the application using local containers with \'development\' extension for all platforms.");
        spec.addPrecondition("Install the  application on all subscribers (WM, CE, Android, IOS, Android Simulator and IOS simulator)");
        spec.addPrecondition("Launch the application in all subscribers.");
        spec.addPrecondition("Discover and register subscribers in dev-config.yml.");
        spec.addPrecondition("Run external file watcher grunt.");
        spec.addStep("Add new JS and CSS files to app and puble folder ");
        spec.addStep("External watcher should create list of added files in upgrade_package_add_files.txt ");
        spec.addStep("By using added files list call command rho dev:update:build_and_notify.");
        spec.addExpectation("Web server should be started if not running ");
        spec.addExpectation("Build_and_notify command should build partial bundle from upgrade_package_add_files.txt files list. ");
        spec.addExpectation("JS and CSS files should be added to subscribers");
        spec.displayScenario();
        spec.waitForButtonPressing("Run test");
        spec.waitForResponse();
    });

    it("Using External file watcher grunt to detect deleted JS file", function() {
        var spec = new ManualSpec(jasmine, window.document);
        spec.addGoal("Using External file watcher grunt to detect deleted JS file");
        spec.addPrecondition("Connect the devices to server network.");
        spec.addPrecondition("Build the application using local containers with \'development\' extension for all platforms.");
        spec.addPrecondition("Install the  application on all subscribers (WM, CE, Android, IOS, Android Simulator and IOS simulator)");
        spec.addPrecondition("Launch the application in all subscribers.");
        spec.addPrecondition("Discover and register subscribers in dev-config.yml.");
        spec.addPrecondition("Run external file watcher grunt.");
        spec.addStep("Delete js file from app and puble folder ");
        spec.addStep("External watcher should create list of deleted files in upgrade_package_remove_files.txt.");
        spec.addStep("By using deleted files list call command rho dev:update:build_and_notify.");
        spec.addExpectation("Web server should be started if not running ");
        spec.addExpectation("Build_and_notify command should build partial bundle from upgrade_package_remove_files.txt files list. ");
        spec.addExpectation("JS file should be removed in subscribers");
        spec.displayScenario();
        spec.waitForButtonPressing("Run test");
        spec.waitForResponse();
    });

    it("Using External file watcher grunt to detect changes in CSS file", function() {
        var spec = new ManualSpec(jasmine, window.document);
        spec.addGoal("Using External file watcher grunt to detect changes in CSS file");
        spec.addPrecondition("Connect the devices to server network.");
        spec.addPrecondition("Build the application using local containers with \'development\' extension for all platforms.");
        spec.addPrecondition("Install the  application on all subscribers (WM, CE, Android, IOS, Android Simulator and IOS simulator)");
        spec.addPrecondition("Launch the application in all subscribers.");
        spec.addPrecondition("Discover and register subscribers in dev-config.yml.");
        spec.addPrecondition("Add refresh: true to dev-config.yml");
        spec.addPrecondition("Run external file watcher grunt.");
        spec.addStep("Modify CSS file in app and pubic folder with code #pid {background-color:red}.");
        spec.addStep("External watcher should create list of changed files in upgrade_package_add_files.txt");
        spec.addStep("By using modified files list call command rho dev:update:build_and_notify.");
        spec.addExpectation("Web server should be started if not running");
        spec.addExpectation("Build_and_notify command should build partial bundle from upgrade_package_add_files.txt files list.");
        spec.addExpectation("Should auto refresh and backgroud-color should be Red.");
        spec.displayScenario();
        spec.waitForButtonPressing("Run test");
        spec.waitForResponse();
    });

    it("Using External file watcher grunt to detect changes in Ruby file", function() {
        var spec = new ManualSpec(jasmine, window.document);
        spec.addGoal("Using External file watcher grunt to detect changes in Ruby file");
        spec.addPrecondition("Connect the devices to server network.");
        spec.addPrecondition("Build the application using local containers with \'development\' extension for all platforms.");
        spec.addPrecondition("Install the  application on all subscribers (WM, CE, Android, IOS, Android Simulator and IOS simulator)");
        spec.addPrecondition("Launch the application in all subscribers.");
        spec.addPrecondition("Discover and register subscribers in dev-config.yml.");
        spec.addPrecondition("Run external file watcher grunt.");
        spec.addStep("Modify controller file in app folder with code def show_popup  Alert.show_popup \'External file watcher\'; end");
        spec.addStep("Add link to this function in erb file with code <%= link_to \'[show_popup]\', { :action => :show_popup }%>.");
        spec.addStep("External watcher should create list of changed files in upgrade_package_add_files.txt");
        spec.addStep("By using modified files list call command rho dev:update:build_and_notify.");
        spec.addStep("Refresh the page.");
        spec.addExpectation("Web server should be started if not running");
        spec.addExpectation("Build_and_notify command should build partial bundle from upgrade_package_add_files.txt files list.");
        spec.addExpectation("Popup should be displayed on calling show popup function.");
        spec.displayScenario();
        spec.waitForButtonPressing("Run test");
        spec.waitForResponse();
    });

    it("Using External file watcher grunt to detect changes in sass file and update in css file", function() {
        var spec = new ManualSpec(jasmine, window.document);
        spec.addGoal("Using External file watcher grunt to detect changes in sass file and update in css file");
        spec.addPrecondition("Connect the devices to server network.");
        spec.addPrecondition("In local computer build the application with \'development\' extension for all platforms.");
        spec.addPrecondition("Install the  application on all subscribers (WM, CE, Android, IOS, Android Simulator and IOS simulator)");
        spec.addPrecondition("Launch the application in all subscribers.");
        spec.addPrecondition("Discover and register subscribers in dev-config.yml.");
        spec.addPrecondition("Add refresh: true to dev-config.yml");
        spec.addPrecondition("Run external file watcher grunt.");
        spec.addStep("Add a sass file.");
        spec.addStep("Add styling to sass file body font: 100% $font-stack and update css file using grunt.");
        spec.addStep("List the modified file.");
        spec.addStep("Call rho dev:update:build_and_notify");
        spec.addExpectation("Web server should be started if not running");
        spec.addExpectation("External watcher should detect source code changes and should create list of changed files list in upgrade_package_add_files.txt");
        spec.addExpectation("Command should detect changed CSS files, builds partial bundle update and sends notification to subscribers once.");
        spec.displayScenario();
        spec.waitForButtonPressing("Run test");
        spec.waitForResponse();
    });

    it("Should return an error message on runing rho dev:update:build_and_notify and Modifying project files when device is switched off", function() {
        var spec = new ManualSpec(jasmine, window.document);
        spec.addGoal("Should return an error message on runing rho dev:update:build_and_notify and Modifying project files when device is switched off");
        spec.addPrecondition("Connect the devices to server network.");
        spec.addPrecondition("Build the application using local containers with \'development\' extension for all platforms.");
        spec.addPrecondition("Install the  application on all subscribers (WM, CE, Android, IOS, Android Simulator and IOS simulator)");
        spec.addPrecondition("Launch the application in all subscribers.");
        spec.addPrecondition("Discover and register subscribers in dev-config.yml.");
        spec.addPrecondition("To Apply auto update run command rho dev:update:auto");
        spec.addStep("Switch off the device.");
        spec.addStep("Modify HTML file in app and pubic folder with code <p>Device is switched off.</p>.");
        spec.addStep("Add css styling to css file #pid {background-color:#00ff00}");
        spec.addStep("External watcher should create list of changed files in upgrade_package_add_files.txt");
        spec.addStep("By using modified files list call command rho dev:update:build_and_notify.");
        spec.addStep("Turn on the device and start the application.");
        spec.addStep("Refresh the page.");
        spec.addExpectation("Web server should be started if not running");
        spec.addExpectation("Build_and_notify command should build partial bundle from upgrade_package_add_files.txt files list.");
        spec.addExpectation("In Web-server terminal window should get error \'subcriber notify…failed\'. ");
        spec.addExpectation("After starting the application full bundle update should happen.");
        spec.addExpectation("Modified files should get reflected in the subscriber.");
        spec.displayScenario();
        spec.waitForButtonPressing("Run test");
        spec.waitForResponse();
    });

    it("Should update all subscribers on changing files when registered manually on dev-config.yml", function() {
        var spec = new ManualSpec(jasmine, window.document);
        spec.addGoal("Should update all subscribers on changing files when registered manually on dev-config.yml");
        spec.addPrecondition("Connect the devices to server network.");
        spec.addPrecondition("Build the application using local containers with \'development\' extension for all platforms.");
        spec.addPrecondition("Install the  application on all subscribers (WM, CE, Android, IOS, Android Simulator and IOS simulator)");
        spec.addPrecondition("Launch the application in all subscribers.");
        spec.addStep("Register the subscribers manually add uri: 192.168.1.102:37579 name: macbook-pro platform: APPLE application: ReloadBundleformat to dev-config.yml");
        spec.addStep("To apply auto update run command rho dev:update:auto");
        spec.addStep("Modify HTML file in app and pubic folder with code <p>Register manually subscribers on server</p>.");
        spec.addStep("Refresh the page.");
        spec.addExpectation("Web server should be started if not running");
        spec.addExpectation("The auto update command should launch file system monitoring process. ");
        spec.addExpectation("On changing HTML file monitoring process should run rho dev:update:partial and apply changes to subscriber.");
        spec.addExpectation("After refresh modified HTML content should be seen.");
        spec.displayScenario();
        spec.waitForButtonPressing("Run test");
        spec.waitForResponse();
    });

    it("Should update all subscribers on changing images, HTML, JS, CSS and ruby files when built from Rhohub.", function() {
        var spec = new ManualSpec(jasmine, window.document);
        spec.addGoal("Should update all subscribers on changing images, HTML, JS, CSS and ruby files when built from Rhohub.");
        spec.addPrecondition("Connect the devices to server network.");
        spec.addPrecondition("Build the aplication with \'development\' extension in RhoHub for all platforms.");
        spec.addPrecondition("Install the  application on all subscribers (WM, CE, Android, IOS, Android Simulator and IOS simulator)");
        spec.addPrecondition("Launch the application in all subscribers.");
        spec.addPrecondition("Rhohub repository should be cloned to desktop.");
        spec.addPrecondition("Discover and register subscribers in dev-config.yml.");
        spec.addPrecondition("To Apply auto update run command rho dev:update:auto");
        spec.addStep("Modify HTML file in app and public folder with code <p id=\'pid\' onClick=\'alertTest()\'>RhoHub with auto update..</p>.");
        spec.addStep("Modify js file with code function alertTest() { alert(\'Development on rhohub\')}");
        spec.addStep("Modify CSS file with code  #pid {backgroung-color:red}");
        spec.addStep("Modify controller file in app folder with code def show_popup  Alert.show_popup \'Rhohub update\'; end");
        spec.addStep("Add link to this function in erb file with code <%= link_to \'[show_popup]\', { :action => :show_popup }%>");
        spec.addStep("Refresh the page. ");
        spec.addExpectation("Web server should be started if not running");
        spec.addExpectation("The auto update command should launch file system monitoring process. ");
        spec.addExpectation("On changing HTML and Ruby file monitoring process should run rho dev:update:partial.");
        spec.addExpectation("On refreshing should display Modified HTML page.");
        spec.addExpectation("Should display popup on caling popup/alert function");
        spec.displayScenario();
        spec.waitForButtonPressing("Run test");
        spec.waitForResponse();
    });

    it("Should update all subscribers on changing images, HTML, JS, CSS and ruby files when built from prebuilt containers(Rhomobile / App Store / GitHub).", function() {
        var spec = new ManualSpec(jasmine, window.document);
        spec.addGoal("Should update all subscribers on changing images, HTML, JS, CSS and ruby files when built from prebuilt containers(Rhomobile / App Store / GitHub).");
        spec.addPrecondition("Connect the devices to server network.");
        spec.addPrecondition("Build the aplication with \'development\' extension using Prebuilt Containers for all platforms.");
        spec.addPrecondition("Install the  application on all subscribers (WM, CE, Android, IOS, Android Simulator and IOS simulator)");
        spec.addPrecondition("Launch the application in all subscribers.");
        spec.addPrecondition("Discover and register subscribers in dev-config.yml.");
        spec.addPrecondition("To Apply auto update run command rho dev:update:auto");
        spec.addStep("Modify HTML file in app and public folder with code <p id=\'pid\' onClick=\'alertTest()\'>Prebuilt Containers with auto update..</p>.");
        spec.addStep("Modify js file with code function alertTest() { alert(\'Development Prebuilt Containers\')}");
        spec.addStep("Modify CSS file with code  #pid {backgroung-color:red}");
        spec.addStep("Modify controller file in app folder with code def show_popup  Alert.show_popup \'Prebuilt Containers update\'; end");
        spec.addStep("Add link to this function in erb file with code <%= link_to \'[show_popup]\', { :action => :show_popup }%>");
        spec.addStep("Refresh the page.");
        spec.addExpectation("Web server should be started if not running");
        spec.addExpectation("The auto update command should launch file system monitoring process. ");
        spec.addExpectation("On changing HTML and Ruby file monitoring process should run rho dev:update:partial.");
        spec.addExpectation("On refreshing should display Modified HTML page.");
        spec.addExpectation("Should display popup on caling popup/alert function");
        spec.displayScenario();
        spec.waitForButtonPressing("Run test");
        spec.waitForResponse();
    });

    it("Discovery timeout test", function() {
        var spec = new ManualSpec(jasmine, window.document);
        spec.addGoal("Discovery timeout test");
        spec.addPrecondition("Dont connect any devices server network.");
        spec.addPrecondition("Build the application using local containers with \'development\' extension for all platforms.");
        spec.addPrecondition("Install the  application on all subscribers (WM, CE, Android, IOS, Android Simulator, and IOS simulator)");
        spec.addPrecondition("Launch the aplication all subscribers.");
        spec.addStep("Run command rho dev:discovery.");
        spec.addExpectation("Web server should be started if not running");
        spec.addExpectation("Timeout should happen when no devices connected to the server network");
        spec.addExpectation("In MAC discovery timeout should happen in 5 sec");
        spec.addExpectation("In Windows discovery timeout should happen in 21 sec");
        spec.displayScenario();
        spec.waitForButtonPressing("Run test");
        spec.waitForResponse();
    });

    it("Modified files should get updated in all the devices at once when more than 10 devices connected.", function() {
        var spec = new ManualSpec(jasmine, window.document);
        spec.addGoal("Modified files should get updated in all the devices at once when more than 10 devices connected.");
        spec.addPrecondition("Connect more than 10 devices to server network.");
        spec.addPrecondition("Build the application using local containers with \'development\' extension for all platforms.");
        spec.addPrecondition("Install the  application on all subscribers (WM, CE, Android, IOS, Android Simulator and IOS simulator)");
        spec.addPrecondition("Launch the application in all subscribers.");
        spec.addPrecondition("Discover and register subscribers in dev-config.yml.");
        spec.addPrecondition("Add refresh: true to dev-config.yml.");
        spec.addPrecondition("To Apply auto update run command rho dev:update:auto");
        spec.addStep("Add controller code Alert.show_popup \'More than 10 devices\';");
        spec.addExpectation("Web server should be started if not running");
        spec.addExpectation("Changed files should be applied to all connected devices at once in parallel.");
        spec.addExpectation("Same time popup should be displayed in all devices");
        spec.displayScenario();
        spec.waitForButtonPressing("Run test");
        spec.waitForResponse();
    });

    it("Performance Check between partial and full bundle update", function() {
        var spec = new ManualSpec(jasmine, window.document);
        spec.addGoal("Performance Check between partial and full bundle update");
        spec.addPrecondition("Connect the devices to server network.");
        spec.addPrecondition("Build the application using local containers with \'development\' extension for all platforms.");
        spec.addPrecondition("Install the  application on all subscribers (WM, CE, Android, IOS, Android Simulator and IOS simulator)");
        spec.addPrecondition("Launch the application in all subscribers.");
        spec.addPrecondition("Discover and register subscribers in dev-config.yml.");
        spec.addStep("Modify HTML file in app folder with code <p>first modification for performance check</p>.");
        spec.addStep("Call rho dev:update:partial and Check time. ");
        spec.addStep("Modify HTML file in app folder with code <p>second modification for performance check</p>.");
        spec.addStep("Call rho dev:update:full and Check time.");
        spec.addExpectation("Web server should be started if not running");
        spec.addExpectation("Partial bundle update should be faster than full bundle update");
        spec.displayScenario();
        spec.waitForButtonPressing("Run test");
        spec.waitForResponse();
    });

    it("Performance Check of full bundle update with and without clean", function() {
        var spec = new ManualSpec(jasmine, window.document);
        spec.addGoal("Performance Check of full bundle update with and without clean");
        spec.addPrecondition("Connect devices to server network.");
        spec.addPrecondition("Build the application using local containers with \'development\' extension for all platforms.");
        spec.addPrecondition("Install the  application on all subscribers (WM, CE, Android, IOS, Android Simulator, and IOS simulator)");
        spec.addPrecondition("Launch the aplication all subscribers.");
        spec.addPrecondition("Discover and register subscribers in dev-config.yml.");
        spec.addPrecondition("Add refresh: true to dev-config.yml.");
        spec.addStep("Modify HTML file in app folder with code <p>First full bundle</p>.");
        spec.addStep("Call rho dev:update:full and Check time.");
        spec.addStep("Call rho clean:platformname.");
        spec.addStep("Modify HTML file in app folder with code <p>Second full bundle</p>.");
        spec.addStep("Call rho dev:update:full and Check time.");
        spec.addStep("Modify HTML file in app folder with code <p>Third full bundle</p>.");
        spec.addStep("Call rho dev:update:full and Check time.");
        spec.addExpectation("Web server should be started if not running");
        spec.addExpectation("There should not be any time difference for full bundle update with and without clean.");
        spec.displayScenario();
        spec.waitForButtonPressing("Run test");
        spec.waitForResponse();
    });

    it("Checking auto-disable of development extension with distribution build", function() {
        var spec = new ManualSpec(jasmine, window.document);
        spec.addGoal("Checking auto-disable of development extension with distribution build");
        spec.addPrecondition("Connect devices to server network.");
        spec.addPrecondition("Build the distribution application using local containers with \'development\' extension for all platforms.");
        spec.addPrecondition("Install the  application on all subscribers (WM, CE, Android, IOS, Android Simulator, and IOS simulator)");
        spec.addPrecondition("Launch the aplication all subscribers.");
        spec.addStep("From project root folder run command rho dev:discovery.");
        spec.addExpectation("Web server should be started if not running");
        spec.addExpectation("Distribution applications should not be discovered .");
        spec.addExpectation("It should discover only Relase/debug build.");
        spec.displayScenario();
        spec.waitForButtonPressing("Run test");
        spec.waitForResponse();
    });

    it("Checking discovery without \'development\' extension", function() {
        var spec = new ManualSpec(jasmine, window.document);
        spec.addGoal("Checking discovery without \'development\' extension");
        spec.addPrecondition("Connect the devices to server network.");
        spec.addPrecondition("Build the application using local containers without \'development\' extension for all platforms.");
        spec.addPrecondition("Install the  application on all subscribers (WM, CE, Android, IOS, Android Simulator, and IOS simulator)");
        spec.addPrecondition("Launch the aplication all subscribers.");
        spec.addStep("From project root folder run command rho dev:discovery.");
        spec.addExpectation("Web server should be started if not running");
        spec.addExpectation("Subscribers without development extension should not be discovered");
        spec.displayScenario();
        spec.waitForButtonPressing("Run test");
        spec.waitForResponse();
    });

    it("Checking discovery without network", function() {
        var spec = new ManualSpec(jasmine, window.document);
        spec.addGoal("Checking discovery without network");
        spec.addPrecondition("Server should not be connected in any network");
        spec.addPrecondition("Build the application using local containers with \'development\' extension for all platforms.");
        spec.addPrecondition("Install the  application on all subscribers (WM, CE, Android, IOS, Android Simulator, and IOS simulator)");
        spec.addPrecondition("Launch the aplication all subscribers.");
        spec.addStep("From project root folder run command rho dev:discovery.");
        spec.addExpectation("Web server should be started if not running");
        spec.addExpectation("There should not be any abnormal behavior. Shoud display proper error message");
        spec.displayScenario();
        spec.waitForButtonPressing("Run test");
        spec.waitForResponse();
    });

    it("Start webserver, apply update and stop webserver", function() {
        var spec = new ManualSpec(jasmine, window.document);
        spec.addGoal("Start webserver, apply update and stop webserver");
        spec.addPrecondition("Connect the devices to server network.");
        spec.addPrecondition("Build the application using local containers with \'development\' extension for all platforms.");
        spec.addPrecondition("Install the  application on all subscribers (WM, CE, Android, IOS, Android Simulator and IOS simulator)");
        spec.addPrecondition("Launch the application in all subscribers.");
        spec.addPrecondition("Discover and register subscribers in dev-config.yml.");
        spec.addPrecondition("Stop all webservers.");
        spec.addStep("Modify HTML file in app and pubic folder with code <p>Webserver Test</p>.");
        spec.addStep("Start the webserver by rho dev:webserver:start");
        spec.addStep("Call rho dev:update:partial");
        spec.addStep("Stop the webserver by rho dev:webserver:stop");
        spec.addExpectation("Webserver should be started succesfully.");
        spec.addExpectation("On running update command changed HTML file should be applied to subscriber.");
        spec.addExpectation("It should not start one more server in background.");
        spec.addExpectation("Webserver should be stopped succesfully");
        spec.displayScenario();
        spec.waitForButtonPressing("Run test");
        spec.waitForResponse();
    });

    it("Checking auto update on webserver restart", function() {
        var spec = new ManualSpec(jasmine, window.document);
        spec.addGoal("Checking auto update on webserver restart");
        spec.addPrecondition("Connect the devices to server network.");
        spec.addPrecondition("Build the application using local containers with \'development\' extension for all platforms.");
        spec.addPrecondition("Install the  application on all subscribers (WM, CE, Android, IOS, Android Simulator and IOS simulator)");
        spec.addPrecondition("Launch the application in all subscribers.");
        spec.addPrecondition("Discover and register subscribers in dev-config.yml.");
        spec.addPrecondition("Stop all webservers.");
        spec.addStep("Run command rho dev:update:auto.");
        spec.addStep("Modify HTML file in app and pubic folder with code <p>Webserver restart</p>.");
        spec.addStep("Stop the webserver by rho dev:webserver:stop");
        spec.addStep("Modify HTML file in app and pubic folder with code <p>Webserver stop</p>.");
        spec.addStep("restart the webserver by rho dev:webserver:start");
        spec.addExpectation("Webserver should be started succesfully.");
        spec.addExpectation("Once the webserver is stopped any auto update should be failed");
        spec.addExpectation("Once the webserver is restarted changed html file should be applied automatically.");
        spec.displayScenario();
        spec.waitForButtonPressing("Run test");
        spec.waitForResponse();
    });

    it("Should not apply changes made in public/api folder", function() {
        var spec = new ManualSpec(jasmine, window.document);
        spec.addGoal("Should not apply changes made in public/api folder");
        spec.addPrecondition("Connect the devices to server network.");
        spec.addPrecondition("Build the application using local containers with \'development\' extension for all platforms.");
        spec.addPrecondition("Install the  application on all subscribers (WM, CE, Android, IOS, Android Simulator and IOS simulator)");
        spec.addPrecondition("Launch the application in all subscribers.");
        spec.addPrecondition("Discover and register subscribers in dev-config.yml.");
        spec.addStep("Add HTML, CSS, JS files to public/api folder.");
        spec.addStep("Add code to /public/api/rho-api.js function alertTest() { alert(\'Test alert for onetime update\')} ");
        spec.addStep("Run rho dev:update:partial");
        spec.addStep("Try to open the link and call alert function");
        spec.addExpectation("Web server should be started if not running");
        spec.addExpectation("Should not apply changes made in public/api folder");
        spec.addExpectation("HTML link and alert function should not work");
        spec.displayScenario();
        spec.waitForButtonPressing("Run test");
        spec.waitForResponse();
    });

    it("Should not apply changes made other than app and public folder", function() {
        var spec = new ManualSpec(jasmine, window.document);
        spec.addGoal("Should not apply changes made other than app and public folder");
        spec.addPrecondition("Connect the devices to server network.");
        spec.addPrecondition("Build the application using local containers with \'development\' extension for all platforms.");
        spec.addPrecondition("Install the application on all subscribers (WM, CE, Android, IOS, Android Simulator and IOS simulator)");
        spec.addPrecondition("Launch the application in all subscribers.");
        spec.addPrecondition("Discover and register subscribers in dev-config.yml.");
        spec.addStep("Add HTML, CSS, JS files to root folder.");
        spec.addStep("Add one extension(audiocapture) in build.yml");
        spec.addStep("Change start page in rhoconfig.txt");
        spec.addStep("Run rho dev:update:partial.");
        spec.addStep("Check the HTML links added working or not, Test audiocapture function.");
        spec.addExpectation("Web server should be started if not running");
        spec.addExpectation("Should not apply changes made other than app and public folder");
        spec.addExpectation("Start page should not be changed.");
        spec.addExpectation("audiocapture API should not work");
        spec.displayScenario();
        spec.waitForButtonPressing("Run test");
        spec.waitForResponse();
    });

    it("Should hit breakpoints when built with debug configarations", function() {
        var spec = new ManualSpec(jasmine, window.document);
        spec.addGoal("Should hit breakpoints when built with debug configarations");
        spec.addPrecondition("Connect the devices to server network.");
        spec.addPrecondition("In Rhostudio build using Debug configarations with \'development\' extension");
        spec.addPrecondition("Application should be launched in subscribers.");
        spec.addPrecondition("Discover and register subscribers in dev-config.yml.");
        spec.addStep("Modify controller file in app folder with code def show_popup  Alert.show_popup \'Test alert for onetime update\'; end");
        spec.addStep("Add link to this function in erb file with code <%= link_to \'[show_popup]\', { :action => :show_popup }%>.");
        spec.addStep("Add break pont to alert function in controller file.");
        spec.addStep("Run rho dev:update:partial.");
        spec.addStep("Invoke alert function.");
        spec.addExpectation("Web server should be started if not running");
        spec.addExpectation("Should detect changed erb and controller file, builds partial bundle update and sends notification to subscriber.");
        spec.addExpectation("Should hit breakpoint when alert function is called.");
        spec.displayScenario();
        spec.waitForButtonPressing("Run test");
        spec.waitForResponse();
    });

    it("Changes to the subscriber should be applied when more than 50 files are added to the project", function() {
        var spec = new ManualSpec(jasmine, window.document);
        spec.addGoal("Changes to the subscriber should be applied when more than 50 files are added to the project");
        spec.addPrecondition("Connect devices to server network.");
        spec.addPrecondition("Build the application using local containers with \'development\' extension for all platforms.");
        spec.addPrecondition("Install the  application on all subscribers (WM, CE, Android, IOS, Android Simulator, and IOS simulator)");
        spec.addPrecondition("Launch the aplication all subscribers.");
        spec.addPrecondition("Discover and register subscribers in dev-config.yml.");
        spec.addPrecondition("To Apply auto update run command rho dev:update:auto");
        spec.addStep("Add more than 50 HTML, CSS or JS files to the project.");
        spec.addStep("Add 2 to 5 MB image files.");
        spec.addStep("Check the added files reflected in subscriber or not.");
        spec.addExpectation("Web server should be started if not running");
        spec.addExpectation("Should detect added html, css, js and image files, builds partial bundle update and sends notification to subscriber.");
        spec.addExpectation("All the added files should be reflectd in subscriber.");
        spec.displayScenario();
        spec.waitForButtonPressing("Run test");
        spec.waitForResponse();
    });

    it("Installing new version of Standalone package on top of existing and building the application", function() {
        var spec = new ManualSpec(jasmine, window.document);
        spec.addGoal("Installing new version of Standalone package on top of existing and building the application");
        spec.addPrecondition("Standalone package should be installed already.");
        spec.addPrecondition("All packages should be installed.");
        spec.addStep("Install new version of Standalone package by extracting providing the rho path.");
        spec.addStep("Build the Rhoelements application by rho device:android:production_with_prebuild_binary,rho device:iphone:production_with_prebuild_binary,rho device:wm:production_with_prebuild_binary");
        spec.addExpectation("Packages related new version should be downloaded and installed.");
        spec.addExpectation("Build should be successfull.");
        spec.displayScenario();
        spec.waitForButtonPressing("Run test");
        spec.waitForResponse();
    });

    it("Installing new version of Ruby installer on top of existing and building the application", function() {
        var spec = new ManualSpec(jasmine, window.document);
        spec.addGoal("Installing new version of Ruby installer on top of existing and building the application");
        spec.addPrecondition("Ruby installer should be installed already.");
        spec.addPrecondition("All packages should be installed.");
        spec.addStep("Install new version of Ruby installer gem install rho.");
        spec.addStep("Build the Rhoelements application by rho device:android:production_with_prebuild_binary,rho device:iphone:production_with_prebuild_binary,rho device:wm:production_with_prebuild_binary");
        spec.addExpectation("Packages related new version should be downloaded and installed.");
        spec.addExpectation("Build should be successfull.");
        spec.displayScenario();
        spec.waitForButtonPressing("Run test");
        spec.waitForResponse();
    });

    it("Installing new version of Nodejs installer on top of existing and building the application", function() {
        var spec = new ManualSpec(jasmine, window.document);
        spec.addGoal("Installing new version of Nodejs installer on top of existing and building the application");
        spec.addPrecondition("Nodejs installer should be installed already.");
        spec.addPrecondition("All packages should be installed.");
        spec.addStep("Install new version of Nodejs installer npm install rho -g.");
        spec.addStep("Build the Rhoelements application by rho device:android:production_with_prebuild_binary,rho device:iphone:production_with_prebuild_binary,rho device:wm:production_with_prebuild_binary");
        spec.addExpectation("Packages related new version should be downloaded and installed.");
        spec.addExpectation("Build should be successfull.");
        spec.displayScenario();
        spec.waitForButtonPressing("Run test");
        spec.waitForResponse();
    });

    it("Running live update commands without setting a token", function() {
        var spec = new ManualSpec(jasmine, window.document);
        spec.addGoal("Running live update commands without setting a token");
        spec.addPrecondition("Connect devices to server network.");
        spec.addPrecondition("In local computer build the application with \'development\' extension for all platforms.");
        spec.addPrecondition("Install the  application on all subscribers (WM, CE, Android, IOS, Android Simulator, and IOS simulator)");
        spec.addPrecondition("Launch the application all subscribers.");
        spec.addPrecondition("Clear the token by rho token:clear");
        spec.addStep("Run live update commands like rho dev:discovery, rho dev:update:partial, rho dev:update:full, rho dev:update:auto, rho dev:update:build_and_notify");
        spec.addStep("Check whether asking for rhohub login");
        spec.addExpectation("Should ask for rhohub login on running live update commands");
        spec.displayScenario();
        spec.waitForButtonPressing("Run test");
        spec.waitForResponse();
    });

    it("Should apply changed file in app2, after discovering from app1", function() {
        var spec = new ManualSpec(jasmine, window.document);
        spec.addGoal("Should apply changed file in app2, after discovering from app1");
        spec.addPrecondition("Connect the devices to server network.");
        spec.addPrecondition("In local computer build app1 and app2 with \'development\' extension for all platforms.");
        spec.addPrecondition("Install app1 and app2 application on all subscribers (WM, CE, Android, IOS, Android Simulator and IOS simulator).");
        spec.addPrecondition("Launch the app1 in some subscribers and app2 in other subscribers.");
        spec.addStep("From app1 project root folder run command rho dev:discovery.");
        spec.addStep("Goto app2 project root folder.");
        spec.addStep("Modify HTML file in app2 with code <p>Modify HTML file in app2</p>.");
        spec.addStep("Call rho dev:update:partial from app2.");
        spec.addStep("Refresh page in app2.");
        spec.addExpectation("Web server should be started if not running.");
        spec.addExpectation("Devices launched with App1 and App2 should be registered in dev_config.yml.");
        spec.addExpectation("Should see modified HTML file in devices which is launched with app2.");
        spec.displayScenario();
        spec.waitForButtonPressing("Run test");
        spec.waitForResponse();
    });

    it("Should apply changed file in any application after discovery from app1 and app2", function() {
        var spec = new ManualSpec(jasmine, window.document);
        spec.addGoal("Should apply changed file in any application after discovery from app1 and app2");
        spec.addPrecondition("Connect the devices to server network.");
        spec.addPrecondition("In local computer build app1 and app2 with \'development\' extension for all platforms.");
        spec.addPrecondition("Install app1 and app2 application on all subscribers (WM, CE, Android, IOS, Android Simulator and IOS simulator).");
        spec.addPrecondition("Launch the app1 in some subscribers and app2 in other subscribers.");
        spec.addStep("From app1 project root folder run command rho dev:discovery.");
        spec.addStep("Go to app2 project root folder.");
        spec.addStep("From app2 project root folder run command rho dev:discovery.");
        spec.addStep("Modify HTML file in app1 with code <p>Modify HTML file in app1</p>.");
        spec.addStep("Call rho dev:update:partial from app1.");
        spec.addStep("Refresh page in app1.");
        spec.addExpectation("Web server should be started if not running.");
        spec.addExpectation("Devices launched with App1 and App2 should be registered in dev_config.yml in app1 root folder.");
        spec.addExpectation("Devices launched with App1 and App2 should be registered in dev_config.yml in app2 root folder.");
        spec.addExpectation("Should see modified HTML file in devices which is launched with app1.");
        spec.displayScenario();
        spec.waitForButtonPressing("Run test");
        spec.waitForResponse();
    });

    it("Add non existing file names to development folder", function() {
        var spec = new ManualSpec(jasmine, window.document);
        spec.addGoal("Add non existing file names to development folder");
        spec.addPrecondition("Connect the devices to server network.");
        spec.addPrecondition("In local computer build the application with \'development\' extension for all platforms.");
        spec.addPrecondition("Install the  application on all subscribers (WM, CE, Android, IOS, Android Simulator and IOS simulator)");
        spec.addPrecondition("Launch the application in all subscribers.");
        spec.addPrecondition("Discover and register subscribers in dev-config.yml.");
        spec.addStep("Add invalid file name to upgrade_package_add_files.txt, upgrade_package_remove_files.txt in development folder");
        spec.addStep("Call rho dev:update:build_and_notify.");
        spec.addExpectation("Web server should be started if not running");
        spec.addExpectation("Build_and_notify command should throw proper error message. There should not be any abnormal behavior.");
        spec.displayScenario();
        spec.waitForButtonPressing("Run test");
        spec.waitForResponse();
    });

    it("Add not modified or not deleted file names to development folder", function() {
        var spec = new ManualSpec(jasmine, window.document);
        spec.addGoal("Add not modified or not deleted file names to development folder");
        spec.addPrecondition("Connect the devices to server network.");
        spec.addPrecondition("In local computer build the application with \'development\' extension for all platforms.");
        spec.addPrecondition("Install the  application on all subscribers (WM, CE, Android, IOS, Android Simulator and IOS simulator)");
        spec.addPrecondition("Launch the application in all subscribers.");
        spec.addPrecondition("Discover and register subscribers in dev-config.yml.");
        spec.addStep("Add not modified or not deleted file names from app and public folder to upgrade_package_add_files.txt, upgrade_package_remove_files.txt in development folder");
        spec.addStep("Call rho dev:update:build_and_notify.");
        spec.addExpectation("Web server should be started if not running");
        spec.addExpectation("Build_and_notify command should build partial bundle from upgrade_package_add_files.txt and upgrade_package_remove_files.txt files list.");
        spec.addExpectation("Files listed in upgrade_package_remove_files.txt should be deleted in device.");
        spec.displayScenario();
        spec.waitForButtonPressing("Run test");
        spec.waitForResponse();
    });

});