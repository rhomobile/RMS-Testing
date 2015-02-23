var appEventsTest = {};

appEventsTest.ajax = function(url)
{
	var ajax = new XMLHttpRequest();
	//ajax.onreadystatechange = function () {} //Async call
	ajax.open("GET", url, false); //Sync Call
	ajax.send();
	return ajax.responseText;
};

appEventsTest.setCallback = function ()
{
    Rho.Application.setApplicationNotify( function(params)
    {
        event = params.applicationEvent;
        eventData = params.eventData;
        
        appEventsTest.lastEvent = event;
        appEventsTest.lastEventData = eventData;
        appEventsTest.eventList.push(event);
        appEventsTest.callbackFired = true;
    });
};

describe("Application JS API", function () {


    beforeEach(function(){
        var matchers = {
            isNotEmptyString: function () {
                return (typeof this.actual == 'string') && (this.actual.length != 0)
            }
        };

        this.addMatchers(
            matchers
        );

    });

	xdescribe("Basic specs", function () {
		
	    it("Test appBundleFolder property", function () {
	        var result = Rho.Application.appBundleFolder;
			Rho.Log.info(" Rho.Application.appBundleFolder = " + result, "App");
 			expect(result).isNotEmptyString();
	    });
	
	    it("Test appsBundleFolder proeprty", function () {
	        var result = Rho.Application.appsBundleFolder;
			Rho.Log.info(" Rho.Application.appsBundleFolder = " + result, "App");
 			expect(result).isNotEmptyString();
	    });
	
	    it("Test userFolder property", function () {
	        var result = Rho.Application.userFolder;
			Rho.Log.info(" Rho.Application.userFolder = " + result, "App");
 			expect(result).isNotEmptyString();
	    });
	
	    xit("Test configPath property", function () {
	        var result = Rho.Application.configPath;
			Rho.Log.info(" Rho.Application.configPath = " + result, "App");
 			expect(result).isNotEmptyString();
	    });
	
	    it("Test modelsManifestPath property", function () {
	        var result = Rho.Application.modelsManifestPath;
			Rho.Log.info(" Rho.Application.modelsManifestPath = " + result, "App");
 			expect(result).isNotEmptyString(0);
	    });
	
	    it("Test databaseBlobFolder property", function () {
	        var result = Rho.Application.databaseBlobFolder;
			Rho.Log.info(" Rho.Application.databaseBlobFolder = " + result, "App");
 			expect(result).isNotEmptyString(0);
	    });
	
	    it("Test publicFolder property", function () {
	        var result = Rho.Application.publicFolder;
			Rho.Log.info(" Rho.Application.publicFolder = " + result, "App");
 			expect(result).isNotEmptyString();
	    });
	
	    it("Test startURI property", function () {
	        Rho.Application.startURI = 'index.html';
	        var result = Rho.Application.startURI;
			Rho.Log.info(" Rho.Application.startURI = " + result, "App");
 			expect(result).toEqual('index.html');
	    });
	
	    it("Test settingsPageURI property", function () {
	        Rho.Application.settingsPageURI = 'settings.html';
	        var result = Rho.Application.settingsPageURI;
			Rho.Log.info(" Rho.Application.settingsPageURI = " + result, "App");
 			expect(result).toEqual('settings.html');
	    });
	
	    it("Test splash property", function () {
	        var result = Rho.Application.splash;
			Rho.Log.info(" Rho.Application.splash = " + result, "App");
 			expect(result).isNotEmptyString();
	    });
	
	    it("Test version property", function () {
	        var result = Rho.Application.version;
			Rho.Log.info(" Rho.Application.version = " + result, "App");
 			expect(result).toEqual("1.0");
	    });
	
	    it("Test name property", function () {
	    	var result = Rho.Application.appName;
			Rho.Log.info(" Rho.Application.appName = " + result, "App");
			expect(result).toEqual("auto_common_spec");
			var result2 = Rho.Application.getAppName();
	        expect(result2).toEqual("auto_common_spec");
	    });
	
	
	
	    //TODO: Implement Localization for Javascript app
	    //it("Current application locale.Like 'en', 'ru' etc", function(){
	    //	expect(Rho.Application.getLocale()).isNotEmptyString();
	    //});
	
	    //TODO: Implement Country for Javascript app
	    //it("Current application country code", function(){
	    //	expect(Rho.Application.getCountry()).isNotEmptyString();
	    //});
	
	    //TODO: implement modelFolderPath method
	
	    //TODO: implement databaseFilePath method
	
	    //TODO: implement expandDatabaseBlobFilePath method
	
	    //TODO: implement quit method
	
	    //TODO: implement modelFolderPath method
	
	    it("Test minimize method", function () {
	        expect(Rho.Application.minimize).not.toThrow();
	    });
	
	    it("Test restore method", function () {
	        expect(Rho.Application.restore).not.toThrow();
	    });
	
	    //TODO: implement spec for setActivationNotify with callback on all platforms
	
	    //TODO: implement spec for getRhoPlatformVersion with callback
	
	
	    if(isWindowsMobilePlatform()){
	        it("Bad link URI to navigate in browser", function () {
	            Rho.Application.badLinkURI = 'badLink.html';
	            expect(Rho.Application.badLinkURI).toEqual('badLink.html');
	        });
	    }
	
	    if (['WINDOWS_DESKTOP', 'WINDOWS'].indexOf(Rho.System.platform) != -1) {
	
	        it("Test title property", function () {
	            expect(Rho.Application.title).isNotEmptyString();
	
	            Rho.Application.title = 'Title';
	            expect(Rho.Application.title).toEqual('Title');
	        });
	
	    }
	
	});
	

	xdescribe('Events specs', function() {
    if (isApplePlatform()) {
        beforeEach(function() {
            Rho.AppEvents.simulateEvent(Rho.AppEvents.APP_EVENT_ACTIVATED);
            Rho.AppEvents.simulateEvent(Rho.AppEvents.APP_EVENT_UICREATED);
            appEventsTest.callbackFired = false;
            appEventsTest.lastEvent = "";
            appEventsTest.lastEventData = {};
            appEventsTest.eventList = [];
        });
        
        it('Should fire callback', function(){
            runs(function ()
            {
                appEventsTest.setCallback();
                // state is "activated" should be changed
                Rho.AppEvents.simulateEvent(Rho.AppEvents.APP_EVENT_DEACTIVATED);
            });
            
            waitsFor(function ()
            {
                return appEventsTest.callbackFired;
            }, "the callback didnt fire", 750);
            
            runs(function ()
            {
                expect(appEventsTest.lastEvent).toEqual(Rho.AppEvents.APP_EVENT_DEACTIVATED);
            });
        });

        it('Should fire callback not once', function(){
            events = [
                Rho.AppEvents.APP_EVENT_DEACTIVATED,
                Rho.AppEvents.APP_EVENT_UIDESTROYED,
                Rho.AppEvents.APP_EVENT_UICREATED,
                Rho.AppEvents.APP_EVENT_ACTIVATED
            ];

            runs(function ()
            {
                appEventsTest.setCallback();
                for(var i = 0; i < events.length; i++)
                {
                    Rho.AppEvents.simulateEvent(events[i]);
                }
            });
            
            waitsFor(function ()
            {
                return appEventsTest.eventList.length == events.length;
            }, "the callback didnt fire", 750);
            
            runs(function ()
            {
                expect(appEventsTest.eventList).toEqual(events);
            });
        });

        it('Should not duplicate callbacks', function(){
            events = [
                Rho.AppEvents.APP_EVENT_DEACTIVATED,
                Rho.AppEvents.APP_EVENT_UIDESTROYED,
                Rho.AppEvents.APP_EVENT_ACTIVATED,
                Rho.AppEvents.APP_EVENT_UICREATED
            ];

            runs(function ()
            {
                appEventsTest.setCallback();
                for(var i = 0; i < events.length; i++)
                {
                    Rho.AppEvents.simulateEvent(events[i]);
                    Rho.AppEvents.simulateEvent(events[i]);
                }
            });
            
            waitsFor(function ()
            {
                return appEventsTest.eventList.length == events.length;
            }, "the callback didnt fire", 750);
            
            runs(function ()
            {
                expect(appEventsTest.eventList).toEqual(events);
            }); 
        });

        it('Should handle conflicts', function(){
            template = {
              "intProp" : ['128', '42'],
              "stringProp" : ["ohr","abc"]
            };

            runs(function ()
            {
                appEventsTest.setCallback();
                Rho.AppEvents.addConflictInt("intProp",64,128);
                Rho.AppEvents.addConflictString("stringProp","rho","ohr");
                Rho.AppEvents.simulateConflicts();
            });
            
            waitsFor(function ()
            {
                return appEventsTest.callbackFired;
            }, "the callback didnt fire", 750);
            
            runs(function ()
            {
                expect(appEventsTest.lastEventData).toEqual(template);
            });
        });
    }	
	});
	
	describe("Migrated from manual comman spec", function(){
	
		it("Property 'appBundleFolder' should return path to folder of application bundle", function () {
			var path = Rho.Application.appBundleFolder;
			expect(path).toMatch(/\/app/);
			expect(Rho.RhoFile.isDir(path)).toBeTruthy();
    	});
		
		it("Property 'appsBundleFolder'", function () {
			var path = Rho.Application.appsBundleFolder
			//TODO: Need to add a check auto_common_spec should be the last in the path
			expect(path).toMatch(/auto_common_spec/);
			expect(Rho.RhoFile.isDir(path)).toBeTruthy();
    	});

    	if (isWindowsMobilePlatform()) {

	        it("Property 'badLinkURI'", function () {
	        	var badlink_uri = Rho.Application.badLinkURI;
				badlink_uri = badlink_uri.split("file://")[1];
				//alert(badlink_uri);
	        	expect(badlink_uri).toMatch(/BadLink.html/);
	        	expect(Rho.RhoFile.isFile(badlink_uri)).toBeTruthy();
	        });

    	}

    	it("Property \"configPath\"", function () {
        	var path = Rho.Application.configPath;
        	expect(path).toMatch(/rhoconfig.txt/);
        	expect(Rho.RhoFile.isFile(path)).toBeTruthy();
    	});

    	it("Property \"appName\"", function () {
    		expect( Rho.Application.appName).toEqual("auto_common_spec");
    	});

    	it("Property \"publicFolder\"", function () {
    		var path = Rho.Application.publicFolder;
    		expect(path).toMatch(/public/);
    		expect(Rho.RhoFile.isDir(path)).toBeTruthy();
    	});

    	it("Property \"settingsPageURI\"", function () {
			Rho.Application.settingsPageURI = 'settings.html';
    		var path = Rho.Application.settingsPageURI;
    		expect(path).toMatch(/settings.html/);
    	});

	    it("Property \"splash\"", function () {
	    	var splash_settings = Rho.Application.splash;
	    	expect(splash_settings).toMatch(/delay|center|hcenter|vcenter|vzoom|hzoom|zoom/);
    	});

    	it("Property \"startURI\"", function () {
    		var start_path = Rho.Application.startURI;
    		expect(start_path).toMatch(/\/app\/ApplicationTest\/specRunner.html|\/app\/index.html/)
    	});

    	it("Property \"userFolder\"", function () {
    		var path = Rho.Application.userFolder;
    		expect(path).toMatch(/auto_common_spec/);
    		expect(Rho.RhoFile.isDir(path)).toBeTruthy();
    	});

    	it("Property \"version\"", function () {
    		var version = Rho.Application.version;
	        expect(version).toEqual("1.0");
    	});

    	it("Property \"databaseBlobFolder\"", function () {
    		var path = Rho.Application.databaseBlobFolder;
    		expect(path).toMatch(/db\/db-files/);
    		expect(Rho.RhoFile.isDir(path)).toBeTruthy();
    	});

    	it("Property \"modelsManifestPath\"", function () {
    		var path = Rho.Application.modelsManifestPath;
    		expect(path).toMatch(/app_manifest.txt/);
    		expect(Rho.RhoFile.isFile(path)).toBeTruthy();
    	});

    	it("Property \"securityTokenNotPassed\" should return false if security token don't specified at build.yml", function () {
	        expect(Rho.Application.securityTokenNotPassed).toBeFalsy();
    	});
	
	});

	

});
