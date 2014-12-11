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
    EB.Application.setApplicationNotify( function(params)
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

	describe("Basic specs", function () {
		
	    it("Test appBundleFolder property", function () {
	        var result = EB.Application.appBundleFolder;
			EB.Log.info(" EB.Application.appBundleFolder = " + result, "App");
 			expect(result).isNotEmptyString();
	    });
	
	    it("Test appsBundleFolder proeprty", function () {
	        var result = EB.Application.appsBundleFolder;
			EB.Log.info(" EB.Application.appsBundleFolder = " + result, "App");
 			expect(result).isNotEmptyString();
	    });
	
	    it("Test userFolder property", function () {
	        var result = EB.Application.userFolder;
			EB.Log.info(" EB.Application.userFolder = " + result, "App");
 			expect(result).isNotEmptyString();
	    });
	
	    xit("Test configPath property", function () {
	        var result = EB.Application.configPath;
			EB.Log.info(" EB.Application.configPath = " + result, "App");
 			expect(result).isNotEmptyString();
	    });
	
	    it("Test modelsManifestPath property", function () {
	        var result = EB.Application.modelsManifestPath;
			EB.Log.info(" EB.Application.modelsManifestPath = " + result, "App");
 			expect(result).isNotEmptyString(0);
	    });
	
	    it("Test databaseBlobFolder property", function () {
	        var result = EB.Application.databaseBlobFolder;
			EB.Log.info(" EB.Application.databaseBlobFolder = " + result, "App");
 			expect(result).isNotEmptyString(0);
	    });
	
	    it("Test publicFolder property", function () {
	        var result = EB.Application.publicFolder;
			EB.Log.info(" EB.Application.publicFolder = " + result, "App");
 			expect(result).isNotEmptyString();
	    });
	
	    it("Test startURI property", function () {
	        EB.Application.startURI = 'index.html';
	        var result = EB.Application.startURI;
			EB.Log.info(" EB.Application.startURI = " + result, "App");
 			expect(result).toEqual('index.html');
	    });
	
	    it("Test settingsPageURI property", function () {
	        EB.Application.settingsPageURI = 'settings.html';
	        var result = EB.Application.settingsPageURI;
			EB.Log.info(" EB.Application.settingsPageURI = " + result, "App");
 			expect(result).toEqual('settings.html');
	    });
	
	    it("Test splash property", function () {
	        var result = EB.Application.splash;
			EB.Log.info(" EB.Application.splash = " + result, "App");
 			expect(result).isNotEmptyString();
	    });
	
	    it("Test version property", function () {
	        var result = EB.Application.version;
			EB.Log.info(" EB.Application.version = " + result, "App");
 			expect(result).toEqual("1.0");
	    });
	
	    it("Test name property", function () {
	    	var result = EB.Application.appName;
			EB.Log.info(" EB.Application.appName = " + result, "App");
			expect(result).toEqual("auto_common_spec");
			var result2 = EB.Application.getAppName();
	        expect(result2).toEqual("auto_common_spec");
	    });
	
	
	
	    //TODO: Implement Localization for Javascript app
	    //it("Current application locale.Like 'en', 'ru' etc", function(){
	    //	expect(EB.Application.getLocale()).isNotEmptyString();
	    //});
	
	    //TODO: Implement Country for Javascript app
	    //it("Current application country code", function(){
	    //	expect(EB.Application.getCountry()).isNotEmptyString();
	    //});
	
	    //TODO: implement modelFolderPath method
	
	    //TODO: implement databaseFilePath method
	
	    //TODO: implement expandDatabaseBlobFilePath method
	
	    //TODO: implement quit method
	
	    //TODO: implement modelFolderPath method
	
	    it("Test minimize method", function () {
	        expect(EB.Application.minimize).not.toThrow();
	    });
	
	    it("Test restore method", function () {
	        expect(EB.Application.restore).not.toThrow();
	    });
	
	    //TODO: implement spec for setActivationNotify with callback on all platforms
	
	    //TODO: implement spec for getRhoPlatformVersion with callback
	
	
	    if(isWindowsMobilePlatform()){
	        it("Bad link URI to navigate in browser", function () {
	            EB.Application.badLinkURI = 'badLink.html';
	            expect(EB.Application.badLinkURI).toEqual('badLink.html');
	        });
	    }
	
	    if (['WINDOWS_DESKTOP', 'WINDOWS'].indexOf(EB.System.platform) != -1) {
	
	        it("Test title property", function () {
	            expect(EB.Application.title).isNotEmptyString();
	
	            EB.Application.title = 'Title';
	            expect(EB.Application.title).toEqual('Title');
	        });
	
	    }
	
	});
	

	describe('Events specs', function() {
    if (isApplePlatform()) {
        beforeEach(function() {
            EB.AppEvents.simulateEvent(EB.AppEvents.APP_EVENT_ACTIVATED);
            EB.AppEvents.simulateEvent(EB.AppEvents.APP_EVENT_UICREATED);
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
                EB.AppEvents.simulateEvent(EB.AppEvents.APP_EVENT_DEACTIVATED);
            });
            
            waitsFor(function ()
            {
                return appEventsTest.callbackFired;
            }, "the callback didnt fire", 750);
            
            runs(function ()
            {
                expect(appEventsTest.lastEvent).toEqual(EB.AppEvents.APP_EVENT_DEACTIVATED);
            });
        });

        it('Should fire callback not once', function(){
            events = [
                EB.AppEvents.APP_EVENT_DEACTIVATED,
                EB.AppEvents.APP_EVENT_UIDESTROYED,
                EB.AppEvents.APP_EVENT_UICREATED,
                EB.AppEvents.APP_EVENT_ACTIVATED
            ];

            runs(function ()
            {
                appEventsTest.setCallback();
                for(var i = 0; i < events.length; i++)
                {
                    EB.AppEvents.simulateEvent(events[i]);
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
                EB.AppEvents.APP_EVENT_DEACTIVATED,
                EB.AppEvents.APP_EVENT_UIDESTROYED,
                EB.AppEvents.APP_EVENT_ACTIVATED,
                EB.AppEvents.APP_EVENT_UICREATED
            ];

            runs(function ()
            {
                appEventsTest.setCallback();
                for(var i = 0; i < events.length; i++)
                {
                    EB.AppEvents.simulateEvent(events[i]);
                    EB.AppEvents.simulateEvent(events[i]);
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
                EB.AppEvents.addConflictInt("intProp",64,128);
                EB.AppEvents.addConflictString("stringProp","rho","ohr");
                EB.AppEvents.simulateConflicts();
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
});
