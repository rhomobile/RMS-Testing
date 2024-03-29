var config = {
	_config_path : undefined,
	getDefaultConfigPath : function(){
		return config._config_path;
	},
	setDefaultConfigPath : function(data){
		if (config._config_path == undefined){
			config._config_path = data;
		}
	}
};
describe('Rho.Config module', function() {
	//Don't call this set anywhere else. Test may behave abnormally.
	config.setDefaultConfigPath(Rho.Config.configPath);
	
    beforeEach(function() {
		Rho.Config.configPath = config.getDefaultConfigPath();
		Rho.Config.loadFromFile();
    });

    afterEach(function() {

    });
    //Made the test common for android and ios. Duplicate test with android condition is not required.
    //if(isWindowsPhone8Platform() || isApplePlatform()) {
    	it("Should return default rhoconfig path", function() {
	    	var defaultConfigPath = Rho.Config.configPath;
	    	if(isApplePlatform())
	    		expect(defaultConfigPath).toMatch(/Library\/Caches\/Private Documents\/apps\/rhoconfig.txt/);
	    	if(isAndroidPlatform())
	    		expect(defaultConfigPath).toMatch(/\/rhodata\/apps\/rhoconfig.txt/);
	    });

    	it("isPropertyExists method should return true if start_path property exists in rhoconfig file ", function() {
	    	var returnVal = Rho.Config.isPropertyExists("start_path");
	    	expect(returnVal).toEqual(true);
	    });

	   	it("isPropertyExists method should return true if MinSeverity property exists in rhoconfig file", function() {
	    	var returnVal = Rho.Config.isPropertyExists("MinSeverity");
	    	expect(returnVal).toEqual(true);
	    });



	    it("Should set rhoconfig to different path in device", function() {
	    	var custom_config_path = Rho.Application.modelFolderPath("ConfigTest")+"rhoconfig.txt";
	    	Rho.Config.configPath = custom_config_path;
	    	var newConfigPath = Rho.Config.configPath;
	    	expect(newConfigPath).toEqual(custom_config_path);
	    	Rho.Config.loadFromFile();
	    	var result = Rho.Config.getPropertyString("start_path")
			expect(result).toEqual('/app/ConfigTest/specRunner.html');
			
	    });
	    
	    
	    it("Should not behave abnormally on setting invalid rhoconfig path", function() {
	    	Rho.Config.configPath = "/app//Invalid!@#rhoconfig.txt";
	    	var newConfigPath = Rho.Config.configPath;
	    	expect(newConfigPath).toEqual("/app//Invalid!@#rhoconfig.txt");
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
	    	var returnStr = Rho.Config.getPropertyString('start_path');
	    	var returnInt = Rho.Config.getPropertyInt('MinSeverity');
	    	var custom_config_path = Rho.Application.modelFolderPath("ConfigTest")+"/rhoconfig.txt";
	    	Rho.Config.configPath = custom_config_path;
	    	Rho.Config.loadFromFile();
	    	expect(Rho.Config.getPropertyString('start_path')).not.toEqual(returnStr);
	    	expect(Rho.Config.getPropertyInt('MinSeverity')).not.toEqual(returnInt);
	    });
	    
	    it("removeProperty should remove logserver property when multiple logserver property exists in rhoconfig", function() {
	    	var custom_config_path = Rho.Application.modelFolderPath("ConfigTest")+"/rhoconfig.txt";
	    	Rho.Config.configPath = custom_config_path;
	    	Rho.Config.loadFromFile();
	    	if(Rho.Config.isPropertyExists("logserver")) {
	    		Rho.Config.removeProperty("logserver", false);
		    	expect(Rho.Config.isPropertyExists("logserver")).toEqual(false);
	    	}
	    	else {
	    		expect("Property doesnt exists please add logserver property").toEqual("doesnt exists");
	    	}
	    	
	    }); 
	    
	    it("Should set rhoconfig to default path and checking the original start path", function() {
	    	var newConfigPath = Rho.Config.configPath;
	    	var actual = Rho.Config.getPropertyString("start_path");
	    	if(isApplePlatform())
	    		expect(config.getDefaultConfigPath()).toMatch(/Library\/Caches\/Private Documents\/apps\/rhoconfig.txt/);
	    	if(isAndroidPlatform())
	    		expect(config.getDefaultConfigPath()).toMatch(/\/rhodata\/apps\/rhoconfig.txt/);
	    	expect(actual).toEqual("/app/index.html");
	    });

    //}
/*   
	  if(isAndroidPlatform()) {

    	it("Should return default rhoconfig path", function() {
	    	var defaultConfigPath = Rho.Config.configPath;
	    	expect(defaultConfigPath).toEqual('/data/data/com.rhomobile.auto_common_spec/rhodata/apps/rhoconfig.txt'); 
	    });

	    it("Should set rhoconfig to different path in device", function() {
	    	Rho.Config.configPath = "/data/data/com.rhomobile.auto_common_spec/rhodata/apps/app/ConfigTest/rhoconfig.txt";
	    	var newConfigPath = Rho.Config.configPath;
	    	expect(newConfigPath).toEqual('/data/data/com.rhomobile.auto_common_spec/rhodata/apps/app/ConfigTest/rhoconfig.txt');
	    	Rho.Config.loadFromFile();
	    	var result = Rho.Config.getPropertyString("start_path")
			expect(result).toEqual('/app/ConfigTest/specRunner.html');
			
	    });
	    
	    
	    it("Should not behave abnormally on setting invalid rhoconfig path", function() {
	    	Rho.Config.configPath = '/data/data/com.rhomobile.auto_common_spec/rhodata/apps/rhoconfig.txt';
	    	var defaultConfigPath = Rho.Config.configPath;
	    	Rho.Config.configPath = "/app//Invalid!@#rhoconfig.txt";
	    	var newConfigPath = Rho.Config.configPath;
	    	expect(newConfigPath).toEqual("/app//Invalid!@#rhoconfig.txt");
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
	    	Rho.Config.configPath = '/data/data/com.rhomobile.auto_common_spec/rhodata/apps/rhoconfig.txt';
	    	Rho.Config.loadFromFile();
	    	var returnStr = Rho.Config.getPropertyString('start_path');
	    	var returnInt = Rho.Config.getPropertyInt('MinSeverity');
	    	Rho.Config.configPath = "/data/data/com.rhomobile.auto_common_spec/rhodata/apps/app/ConfigTest/rhoconfig.txt";
	    	Rho.Config.loadFromFile();
	    	expect(Rho.Config.getPropertyString('start_path')).not.toEqual(returnStr);
	    	expect(Rho.Config.getPropertyInt('MinSeverity')).not.toEqual(returnInt);
	    });
	    
	    it("removeProperty should remove logserver property when multiple logserver property exists in rhoconfig", function() {
	    	Rho.Config.configPath = "/data/data/com.rhomobile.auto_common_spec/rhodata/apps/app/ConfigTest/rhoconfig.txt";
	    	Rho.Config.loadFromFile();
	    	if(Rho.Config.isPropertyExists("logserver")) {
	    		Rho.Config.removeProperty("logserver", false);
		    	expect(Rho.Config.isPropertyExists("logserver")).toEqual(false);
	    	}
	    	else {
	    		expect("Property doesnt exists please add logserver property").toEqual("doesnt exists");
	    	}
	    	
	    }); 
	    
	    it("Should set rhoconfig to default path and checking the original start path", function() {
	    	Rho.Config.configPath = "/data/data/com.rhomobile.auto_common_spec/rhodata/apps/rhoconfig.txt";
	    	Rho.Config.loadFromFile();
	    	var newConfigPath = Rho.Config.configPath;
	    	var actual = Rho.Config.getPropertyString("start_path")
	    	expect(newConfigPath).toEqual('/data/data/com.rhomobile.auto_common_spec/rhodata/apps/rhoconfig.txt');
	    	expect(actual).toEqual("/app/index.html");
	    });

    }
*/   
	   

	describe("Get default using getPropertyString method", function () {
	    beforeEach(function() {
			Rho.Config.configPath = config.getDefaultConfigPath();
			Rho.Config.loadFromFile();
		});
		for (var i = 0; i < config_get_property.length; i++) {
	        (function (idx) {

	            var record = config_get_property[i];
	            var testName = record['testName'];
	            var suitablePlatforms = record['osType'];
	            var propertyName = record['propertyName'];
	            var expectedValue = record['expectedStrResult'];

	            if (isTestApplicable(suitablePlatforms)) {
	                it(testName+"getPropertyString method", function () {
	                	var actual = Rho.Config.getPropertyString(propertyName);
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
	                	var actual = '';
	                	try{
	                		Rho.Config.setPropertyString(propertyName, propertyValue, false)
							actual = Rho.Config.getPropertyString(propertyName)
	                	}
	                	catch(err){
	                		actual = err;
	                	}	
	                	
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
	                   
	                   var actual = '';
	                   try{
	                		Rho.Config.setPropertyInt(propertyName, propertyValue, false)
							actual = Rho.Config.getPropertyInt(propertyName)
	                	}
	                	catch(err){
	                		actual = err;
	                	}	
	                	
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
	                 	var actual = '';
	                   try{
	                		Rho.Config.setPropertyBool(propertyName, propertyValue, false)
							actual = Rho.Config.getPropertyBool(propertyName)
	                	}
	                	catch(err){
	                		actual = err;
	                	}	
	                	expect(actual).toEqual(expectedValue);
	                   
	                });
	            }
	        })(i);
	    }
	});	
});

