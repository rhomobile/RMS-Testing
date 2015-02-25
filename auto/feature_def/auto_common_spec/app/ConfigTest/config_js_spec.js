describe('Rho.Config module', function() {
	
    beforeEach(function() {

    });

    afterEach(function() {

    });
    if(isWindowsPhone8Platform()) {

    	it("Should return default rhoconfig path", function() {
	    	var defaultConfigPath = Rho.Config.configPath;
	    	expect(defaultConfigPath).toEqual('./rhoconfig.txt'); //TODO: add correct default path
	    });

	    it("Should set rhoconfig to different path in device", function() {
	    	Rho.Config.configPath = "/app/ConfigTest/rhoconfig.txt";
	    	var newConfigPath = Rho.Config.configPath;
	    	expect(newConfigPath).toEqual('/app/ConfigTest/rhoconfig.txt');
	    });

	    it("Should not set invalid rhoconfig path", function() {
	    	Rho.Config.configPath = './rhoconfig.txt';
	    	var defaultConfigPath = Rho.Config.configPath;
	    	Rho.Config.configPath = "/app//Invalid!@#rhoconfig.txt";
	    	var newConfigPath = Rho.Config.configPath;
	    	expect(newConfigPath).toEqual(defaultConfigPath);
	    });

	    it("isPropertyExists method should return true if start_path property exists in rhoconfig file ", function() {
	    	var returnVal = Rho.Config.isPropertyExists("start_path");
	    	expect(returnVal).toEqual(true);
	    });
	     
	    it("isPropertyExists method should return true if MinSeverity property exists in rhoconfig file", function() {
	    	var returnVal = Rho.Config.isPropertyExists("MinSeverity");
	    	expect(returnVal).toEqual(true);
	    });

	    //disable_loading_indication should be commented in rhoconfig.txt file
	    it("isPropertyExists method should return false if disable_loading_indication property is commented in rhoconfig file", function() {
	    	var returnVal = Rho.Config.isPropertyExists("disable_loading_indication");
	    	expect(returnVal).toEqual(false);
	    });

	    it("isPropertyExists method should return false if full_screen property is removed from rhoconfig file using removeProperty method", function() {
	    	Rho.Config.removeProperty("full_screen", false);
	    	var returnVal = Rho.Config.isPropertyExists("full_screen");
	    	expect(returnVal).toEqual(false);
	    });
	    
	    it("isPropertyExists method should return false for invalid property", function() {
	    	var returnVal = Rho.Config.isPropertyExists("invalid");
	    	expect(returnVal).toEqual(false);
	    });

	    it("loadFromFile method should load default rhoconfig file after setting to different rhoconfig path", function() {
	    	Rho.Config.configPath = "/app/ConfigTest/rhoconfig.txt";
	    	var returnStr = Rho.Config.getPropertyString('start_path');
	    	var returnInt = Rho.Config.getPropertyString('MinSeverity');
	    	Rho.Config.loadFromFile();
	    	expect(Rho.Config.getPropertyString('start_path')).not.toEqual(returnStr);
	    	expect(Rho.Config.getPropertyString('MinSeverity')).not.toEqual(returnInt);
	    });

	    it("Should return conflicts when rhoconfig file contains multiple logserver, MaxLogFileSize properties", function() {
	    	Rho.Config.configPath = "/app/ConfigTest/rhoconfig.txt";
	    	var returnVal = Rho.Config.getConflicts();
	    	var expectedVal = {'logserver': ['http://rhologs.heroku.com','http://google.com','http://yahoo.com'], 'MaxLogFileSize': [5000000,1000000]};
	    	expect(returnVal['logserver'][0]).toEqual(expectedVal['logserver'][0]);
	    	expect(returnVal['logserver'][1]).toEqual(expectedVal['logserver'][1]);
	    	expect(returnVal['logserver'][2]).toEqual(expectedVal['logserver'][2]);
	    	expect(returnVal['MaxLogFileSize'][0]).toEqual(expectedVal['MaxLogFileSize'][0]);
	    	expect(returnVal['MaxLogFileSize'][1]).toEqual(expectedVal['MaxLogFileSize'][1]);
	    });

	    it("removeProperty should remove ????? when multiple logserver property exists in rhoconfig", function() {
	    	Rho.Config.configPath = "/app/ConfigTest/rhoconfig.txt";
	    	Rho.Config.removeProperty("logserver", false);
	    	//TODO: Need to add expected result 
	    }); 

	    it("Should not return any conflicts when multiple properties are commented", function() {
	    	Rho.Config.loadFromFile();
	    	var expectedVal = {};
	    	expect(returnVal).toEqual(expectedVal);
	    }); 

    }

	describe("Get default using getPropertyString method", function () {

	    for (var i = 0; i < config_get_property.length; i++) {
	        (function (idx) {

	            var record = config_get_property[i];
	            var testName = record['testName'];
	            var suitablePlatforms = record['osType'];
	            var propertyName = record['propertyName'];
	            var expectedValue = record['expectedStrResult'];

	            if (isTestApplicable(suitablePlatforms)) {
	                it(testName+"getPropertyString method", function () {
	                   var actual = Rho.Config.getPropertyString(propertyName)
	                   expect(actual).toEqual(expectedValue);
	                });
	            }
	        })(i);
	    }
	});

	describe("Get default using getPropertyInt method", function () {

	    for (var i = 0; i < config_get_property.length; i++) {
	        (function (idx) {

	            var record = config_get_property[i];
	            var testName = record['testName'];
	            var suitablePlatforms = record['osType'];
	            var propertyName = record['propertyName'];
	            var expectedValue = record['expectedIntResult'];

	            if (isTestApplicable(suitablePlatforms)) {
	                it(testName+"getPropertyInt method", function () {
	                   var actual = Rho.Config.getPropertyInt(propertyName)
	                   expect(actual).toEqual(expectedValue);
	                });
	            }
	        })(i);
	    }
	});

	describe("Get default using getPropertyBool method", function () {

	    for (var i = 0; i < config_get_property.length; i++) {
	        (function (idx) {

	            var record = config_get_property[i];
	            var testName = record['testName'];
	            var suitablePlatforms = record['osType'];
	            var propertyName = record['propertyName'];
	            var expectedValue = record['expectedBoolResult'];

	            if (isTestApplicable(suitablePlatforms)) {
	                it(testName+"getPropertyBool method", function () {
	                   var actual = Rho.Config.getPropertyBool(propertyName)
	                   expect(actual).toEqual(expectedValue);
	                });
	            }
	        })(i);
	    }
	});	

	describe("setPropertyString and getPropertyString method", function () {

	    for (var i = 0; i < config_set_get_property.length; i++) {
	        (function (idx) {

	            var record = config_set_get_property[i];
	            var testName = record['testName'];
	            var suitablePlatforms = record['osType'];
	            var propertyName = record['propertyName'];
	            var propertyValue = record['propertyValue'];
	            var expectedValue = record['expectedStrResult'];

	            if (isTestApplicable(suitablePlatforms)) {
	                it(testName+"setPropertyString and getPropertyString", function () {
	                   Rho.Config.setPropertyString(propertyName, propertyValue, false)
	                   var actual = Rho.Config.getPropertyString(propertyName)
	                   expect(actual).toEqual(expectedValue);
	                });
	            }
	        })(i);
	    }
	});

	describe("setPropertyInt and getPropertyInt method", function () {

	    for (var i = 0; i < config_set_get_property.length; i++) {
	        (function (idx) {

	            var record = config_set_get_property[i];
	            var testName = record['testName'];
	            var suitablePlatforms = record['osType'];
	            var propertyName = record['propertyName'];
	            var propertyValue = record['propertyValue'];
	            var expectedValue = record['expectedIntResult'];

	            if (isTestApplicable(suitablePlatforms)) {
	                it(testName+"setPropertyInt and getPropertyInt", function () {
	                   Rho.Config.setPropertyInt(propertyName, propertyValue, false)
	                   var actual = Rho.Config.getPropertyInt(propertyName)
	                   expect(actual).toEqual(expectedValue);
	                });
	            }
	        })(i);
	    }
	});

	describe("setPropertyBool and getPropertyBool method", function () {

	    for (var i = 0; i < config_set_get_property.length; i++) {
	        (function (idx) {

	            var record = config_set_get_property[i];
	            var testName = record['testName'];
	            var suitablePlatforms = record['osType'];
	            var propertyName = record['propertyName'];
	            var propertyValue = record['propertyValue'];
	            var expectedValue = record['expectedBoolResult'];

	            if (isTestApplicable(suitablePlatforms)) {
	                it(testName+"setPropertyBool and getPropertyBool", function () {
	                   Rho.Config.setPropertyBool(propertyName, propertyValue, false)
	                   var actual = Rho.Config.getPropertyBool(propertyName)
	                   expect(actual).toEqual(expectedValue);
	                });
	            }
	        })(i);
	    }
	});	

});

