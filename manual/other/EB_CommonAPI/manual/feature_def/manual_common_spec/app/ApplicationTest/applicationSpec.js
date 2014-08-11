var appEventsTest = {};

appEventsTest.ajax = function(url)
{
	var ajax = new XMLHttpRequest();
	//ajax.onreadystatechange = function () {} //Async call
	ajax.open("GET", url, false); //Sync Call
	ajax.send();
	return ajax.responseText;
};

appEventsTest.eventCallback = function(event,eventData)
{
	appEventsTest.lastEvent = event;
    appEventsTest.lastEventData = eventData;
	appEventsTest.eventList.push(event);
	appEventsTest.callbackFired = true;
};

appEventsTest.setCallback = function ()
{
	appEventsTest.ajax('/app/ApplicationTest/set_callback');
};

describe("<application module specs>", function () {

    beforeEach(function(){
        var matchers = {
            isNotEmptyString: function () {
                return (typeof this.actual == 'string') && (this.actual.length != 0)
            }
        };

        this.addMatchers(
            matchers
        );

    })

    it("Test appBundleFolder property", function () {
        expect(EB.Application.appBundleFolder).isNotEmptyString();
    });

    it("Test appsBundleFolder proeprty", function () {
        expect(EB.Application.appsBundleFolder).isNotEmptyString();
    });

    it("Test userFolder property", function () {
        expect(EB.Application.userFolder).isNotEmptyString();
    });

    xit("Test configPath property", function () {
        expect(EB.Application.configPath).isNotEmptyString();
    });

    it("Test modelsManifestPath property", function () {
        expect(EB.Application.modelsManifestPath).isNotEmptyString(0);
    });

    it("Test databaseBlobFolder property", function () {
        expect(EB.Application.databaseBlobFolder).isNotEmptyString(0);
    });

    it("Test publicFolder property", function () {
        expect(EB.Application.publicFolder).isNotEmptyString();
    });

    it("Test startURI property", function () {
        EB.Application.startURI = 'index.html';
        expect(EB.Application.startURI).toEqual('index.html');
    });

    it("Test settingsPageURI property", function () {
        EB.Application.settingsPageURI = 'settings.html';
        expect(EB.Application.settingsPageURI).toEqual('settings.html');
    });

    it("Test splash property", function () {
        expect(EB.Application.splash).isNotEmptyString();
    });

    it("Test version property", function () {
        expect(EB.Application.version).isNotEmptyString();
    });

    it("Test name property", function () {
        expect(EB.Application.getName()).isNotEmptyString();
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


    if(isWindowsMobileOrAndroidPlatform()){
        it("Bad link URI to navigate in browser", function () {
            EB.Application.badLinkURI = 'badLink.html';
            expect(EB.Application.badLinkURI).toEqual('badLink.html');
        });
    }

    if (['WINDOWS_DESKTOP', 'WINDOWS'].indexOf(EB.System.platform) != -1) {

        it("Test title property", function () {
            expect(EB.Application.title()).isNotEmptyString();

            EB.Application.title = 'Title';
            expect(EB.Application.title).toEqual('Title');
        });

    }

});

/*

describe('<application module events specs>', function() {
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

*/
