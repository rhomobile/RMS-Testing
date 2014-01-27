var parameters = function(intentType, action, categories, appName, targetClass, uri, mimeType, data){
    var me = this;
    me.params = {};
    if(intentType !="") me.params.intentType = intentType;
    if(action!="") me.params.action = action;
    if(categories!="") me.params.categories = categories;
    if(appName!="") me.params.appName = appName;
    if(targetClass!="") me.params.targetClass = targetClass;
    if(uri!="") me.params.uri = uri;
    if(mimeType!="") me.params.mimeType = mimeType;
    if(data!="") me.params.data = data;
};
var extraData = function(EXTRA, DATA){
    var me = this;
    if(EXTRA!=""){
        if(EXTRA == "EXTRA_EMAIL") me.EXTRA_EMAIL = DATA;
        if(EXTRA == "EXTRA_HTML_TEXT") me.EXTRA_HTML_TEXT = DATA;
        if(EXTRA == "EXTRA_STREAM") me.EXTRA_STREAM = DATA;
        if(EXTRA == "EXTRA_SUBJECT") me.EXTRA_SUBJECT = DATA;
        if(EXTRA == "EXTRA_CC") me.EXTRA_CC = DATA;
        if(EXTRA == "EXTRA_BCC") me.EXTRA_BCC = DATA;
        if(EXTRA == "EXTRA_TEXT") me.EXTRA_TEXT = DATA;
    }
};
var getData = function(enterData){
    var dataArray = [];
    console.log("arrayLength : "+ enterData.length);
    if(enterData.length>0){
        for(var i=0; i<enterData.length; i++){
            if(enterData[i].EXTRA!==""){
                dataReturn[enterData[i].EXTRA] = enterData[i].DATA;
            }
        }
    }
    return dataArray;
};
describe('Intent_UseCases Functionality Test', function () {
    if(isAndroidPlatform()){
        it('intentType - StartActivity: Launch target application by \'packageName\', which is installed but not running. ', function () {
            dispTestCaseRunning('Sending Intent with parameters {"params":{"intentType":"START_ACTIVITY","action":"ACTION_MAIN","categories":"","appName":"com.smap.targetapp","targetClass":"","uri":"","mimeType":"","data":""}}');
            dispExpectedResult('The Target application should be launched successfully.');
            _result.waitToRunTest();
            runs(function () {
                var params = new parameters("START_ACTIVITY","ACTION_MAIN","","com.smap.targetapp","","","","");
                Rho.Intent.send(params);
            });
            _result.waitForResponse();
        });
        it('intentType - StartActivity: Launch target application by \'packageName\', which is running in background.', function () {
            dispTestCaseRunning('Sending Intent with parameters: </br> {"params":{"intentType":"START_ACTIVITY","action":"ACTION_MAIN","categories":"","appName":"com.smap.targetapp","targetClass":"","uri":"","mimeType":"","data":""}}');
            dispExpectedResult('The Target application which is running in the background should be bought to foreground.');
            _result.waitToRunTest();
            runs(function () {
                var params = new parameters("START_ACTIVITY","ACTION_MAIN","","com.smap.target","","","","");
                Rho.Intent.send(params);
            });
            _result.waitForResponse();
        });
        it('intentType - StartActivity: Try to launch target appilcation by \'packageName\', which is not installed.', function () {
            dispTestCaseRunning('Sending Intent with parameters {"params":{"intentType":"START_ACTIVITY","action":"ACTION_MAIN","categories":"","appName":"com.notInstalled","targetClass":"","uri":"","mimeType":"","data":""}}');
            dispExpectedResult('No effect, No crash should be seen in the test application.');
            _result.waitToRunTest();
            runs(function () {
                var params = new parameters("START_ACTIVITY","ACTION_MAIN","","com.notInstalled","","","","");
                Rho.Intent.send(params);
            });
            _result.waitForResponse();
        });
        it('intentType - StartActivity: Launch target application by \'className\',which is installed but not running.', function () {
            dispTestCaseRunning('Sending Intent with parameters {"params":{"intentType":"START_ACTIVITY","action":"ACTION_MAIN","categories":"","appName":"com.smap.targetapp","targetClass":"MainActivity","uri":"","mimeType":"","data":""}}');
            dispExpectedResult('The Target application should be launched successfully with Passed Text in it.');
            _result.waitToRunTest();
            runs(function () {
                var params = new parameters("START_ACTIVITY","ACTION_MAIN","","com.smap.targetapp","MainActivity","","","");
                Rho.Intent.send(params);
            });
            _result.waitForResponse();
        });
        it('intentType - StartActivity: Launch target application by \'className\', which is running in background.', function () {
            dispTestCaseRunning('Ensure the Target application is running in the background. <br/>Sending Intent with parameters {"params":{"intentType":"START_ACTIVITY","action":"ACTION_MAIN","categories":"","appName":"com.smap.targetapp","targetClass":"MainActivity","uri":"","mimeType":"","data":""}} <br/> should bring the application to foreground');
            dispExpectedResult('The Target application which is running in the background should be bought to foreground.');
            _result.waitToRunTest();
            runs(function () {
                var params = new parameters("START_ACTIVITY","ACTION_MAIN","","com.smap.targetapp","MainActivity","","","");
                Rho.Intent.send(params);
            });
            _result.waitForResponse();
        });
        it('intentType - StartActivity: Try to launch target appilcation by \'className\', which is not installed.', function () {
            dispTestCaseRunning('Sending Intent with parameters {"params":{"intentType":"START_ACTIVITY","action":"ACTION_MAIN","categories":"","appName":"com.notinstalled","targetClass":"MainActivity","uri":"","mimeType":"","data":""}}');
            dispExpectedResult('No effect, No crash should be seen in the test application.');
            _result.waitToRunTest();
            runs(function () {
                var params = new parameters("START_ACTIVITY","ACTION_MAIN","","com.smap.targetapp","dummyClass","","","");
                Rho.Intent.send(params);
            });
            _result.waitForResponse();
        });
        it('intentType - Start service of the test appliation.', function () {
            dispTestCaseRunning('Sending Intent with parameters {"params":{"intentType":"START_SERVICE","action":"","categories":"","appName":"testApp","targetClass":"com.rhomobile.rhodes.RhodesService","uri":"","mimeType":"","data":""}}');
            dispExpectedResult('Service of test application should be started successfully.');
            _result.waitToRunTest();
            runs(function () {
                var mytestapp = Rho.Application.appName;
                var params = new parameters("START_SERVICE","","",mytestapp,"com.rhomobile.rhodes.RhodesService","","","");
                var intentCB = function(intents){
                    if(params == intents){
                        alert("Test case passed!");
                    } else {
                        alert("Test case failed!");
                    }
                };
                Rho.Intent.send(params, intentCB);
            });
            _result.waitForResponse();
        });
        it('intentType - Start service of the target appliation.', function () {
            dispTestCaseRunning('Sending Intent with parameters {"params":{"intentType":"START_SERVICE","action":"","categories":"","appName":"com.smap.targetapp","targetClass":"MyFirstService","uri":"","mimeType":"","data":""}}');
            dispExpectedResult('Service of target applciation should be started successfully.');
            _result.waitToRunTest();
            runs(function () {
                var params = new parameters("START_SERVICE","","","com.smap.targetapp","MyFirstService","","","");
                Rho.Intent.send(params);
            });
            _result.waitForResponse();
        });
        it('intentType - Start service of the target application which is not running.', function () {
            dispTestCaseRunning('Sending Intent with parameters {"params":{"intentType":"START_SERVICE","action":"","categories":"","appName":"com.smap.targetapp","targetClass":"MyFirstService","uri":"","mimeType":"","data":""}}');
            dispExpectedResult('Service of the target applciation should be started successfully.');
            _result.waitToRunTest();
            runs(function () {
                var params = new parameters("START_SERVICE","","","com.smap.targetapp","MyFirstService","","","");
                Rho.Intent.send(params);
            });
            _result.waitForResponse();
        });
        it('intentType - Start service of the target applciation in which the service is already instantiated', function () {
            dispTestCaseRunning('Sending Intent with parameters {"params":{"intentType":"START_SERVICE","action":"","categories":"","appName":"com.smap.targetapp","targetClass":"MyFirstService","uri":"","mimeType":"","data":""}}');
            dispExpectedResult('No effect or crash should be seen in the test application or target appliation, since the service is already instantiated');
            _result.waitToRunTest();
            runs(function () {
                var params = new parameters("START_SERVICE","ACTION_MAIN","","com.smap.targetapp","MyFirstService","","","");
                Rho.Intent.send(params);
            });
            _result.waitForResponse();
        });
        it('intentType - Broadcast data from test app and receive at test app.', function () {
            dispTestCaseRunning('Sending Intent with parameters {"params":{"intentType":"BROADCAST","action":"com.smap.targetapp.mySecondAction","categories":"","appName":"","targetClass":"","uri":"","mimeType":"","data":{"myData":"Test case passed If you see this in an alert !"}}}');
            dispExpectedResult('Broadcast should be successful.');
            _result.waitToRunTest();
            runs(function () {
                var data = {
                    "myData":"Test case passed If you see this in an alert !"
                };
                var listeningCB = function(intents){
                    if(intents.data.myData = "Test case passed If you see this in an alert !"){
                        alert("Test case Passed!");
                    } else {
                        alert("Test case Failed!");
                    }
                };
                var params = new parameters("BROADCAST","com.smap.targetapp.mySecondAction","","","","","",data);
                Rho.Intent.startListening(listeningCB);
                Rho.Intent.send(params);
            });
            _result.waitForResponse();
        });
        it('intentType - Broadcast data from test app and receive at target app.', function () {
            dispTestCaseRunning('Sending Intent with parameters {"params":{"intentType":"BROADCAST","action":"","categories":"","appName":"com.smap.targetapp","targetClass":"","uri":"","mimeType":"","data":{"broadCastData":"Target -Test case passed If you see this in Andorid Toast !"}}}');
            dispExpectedResult('Broadcast should be successful.');
            _result.waitToRunTest();
            runs(function () {
                var data = {
                    "broadCastData":"Target - Test case passed if you see this in Android Toast !"
                };
                var params = new parameters("BROADCAST","com.smap.targetapp.mySecondAction","","","","","",data);
                Rho.Intent.send(params);
            });
            _result.waitForResponse();
        });
        it('intentType - Broadcast data from test app and receive at target app, when target app is not running.', function () {
            dispTestCaseRunning('Sending Intent with parameters {"params":{"intentType":"BROADCAST","action":"","categories":"","appName":"com.smap.targetapp","targetClass":"","uri":"","mimeType":"","data":{"broadCastData":"Target: Test case passed If you see this in Andorid Toast !"}}}');
            dispExpectedResult('Broadcast should be successful.');
            _result.waitToRunTest();
            runs(function () {
                var data = {
                    "broadCastData":"Target - Test case passed If you see this in Andorid Toast !"
                }
                var params = new parameters("BROADCAST","com.smap.targetapp.mySecondAction","","","","","",data);
                Rho.Intent.send(params);
            });
            _result.waitForResponse();
        });
        it('category - Launch browser from test application by setting category "CATEGORY_APP_BROWSER" and action "ACTION_MAIN"', function () {
            dispTestCaseRunning('Sending Intent with parameters {"params":{"intentType":"START_ACTIVITY","action":"ACTION_MAIN","categories":["CATEGORY_APP_BROWSER"],"appName":"","targetClass":"","uri":"","mimeType":"","data":""}}');
            dispExpectedResult('Browser should be launched with blank screen');
            _result.waitToRunTest();
            runs(function () {
                var category = ["CATEGORY_APP_BROWSER"];
                var params = new parameters("START_ACTIVITY","ACTION_MAIN",category,"","","","","");
                Rho.Intent.send(params);
            });
            _result.waitForResponse();
        });
        it('category - Launch Music Player from test application by setting category "CATEGORY_APP_MUSIC"  and action "ACTION_MAIN"', function () {
            dispTestCaseRunning('Sending Intent with parameters {"params":{"intentType":"START_ACTIVITY","action":"ACTION_MAIN","categories":["CATEGORY_APP_MUSIC"],"appName":"","targetClass":"","uri":"","mimeType":"","data":""}}');
            dispExpectedResult('Launch Music Player from test application by setting category "CATEGORY_APP_MUSIC"  and action "ACTION_MAIN"');
            _result.waitToRunTest();
            runs(function () {
                var category = ["CATEGORY_APP_MUSIC","CATEGORY_APP_MUSIC"];
                var params = new parameters("START_ACTIVITY","ACTION_MAIN",category,"","","","","");
                Rho.Intent.send(params);
            });
            _result.waitForResponse();
        });
        it('category - Launch Calculator from test applciation by setting category "CATEGORY_APP_CALCULATOR"  and action "ACTION_MAIN"', function () {
            dispTestCaseRunning('Sending Intent with parameters {"params":{"intentType":"START_ACTIVITY","action":"ACTION_MAIN","categories":["CATEGORY_APP_CALCULATOR"],"appName":"","targetClass":"","uri":"","mimeType":"","data":""}}');
            dispExpectedResult('Calculator should be launched successfully.');
            _result.waitToRunTest();
            runs(function () {
                var category = ["CATEGORY_APP_CALCULATOR"];
                var params = new parameters("START_ACTIVITY","ACTION_MAIN",category,"","","","","");
                Rho.Intent.send(params);
            });
            _result.waitForResponse();
        });
        it('category - Launch Calendar from test application by setting category "CATEGORY_APP_CALENDAR" and action "ACTION_MAIN"', function () {
            dispTestCaseRunning('Sending Intent with parameters {"params":{"intentType":"START_ACTIVITY","action":"ACTION_MAIN","categories":["CATEGORY_APP_CALENDAR"],"appName":"","targetClass":"","uri":"","mimeType":"","data":""}}');
            dispExpectedResult('Calendar should be launched successfully.');
            _result.waitToRunTest();
            runs(function () {
                var category = ["CATEGORY_APP_CALENDAR"];
                var params = new parameters("START_ACTIVITY","ACTION_MAIN",category,"","","","","");
                Rho.Intent.send(params);
            });
            _result.waitForResponse();
        });
        it('category - Launch contacts from test application by setting category "CATEGORY_APP_CONTACTS" and action "ACTION_MAIN"', function () {
            dispTestCaseRunning('Sending Intent with parameters {"params":{"intentType":"START_ACTIVITY","action":"ACTION_MAIN","categories":["CATEGORY_APP_CONTACTS"],"appName":"","targetClass":"","uri":"","mimeType":"","data":""}}');
            dispExpectedResult('Contacts applciation should be launched successfully.');
            _result.waitToRunTest();
            runs(function () {
                var category = ["CATEGORY_APP_CONTACTS"];
                var params = new parameters("START_ACTIVITY","ACTION_MAIN",category,"","","","","");
                Rho.Intent.send(params);
            });
            _result.waitForResponse();
        });
        it('category - Launch Email application from test application by setting category "CATEGORY_APP_EMAIL" and action "ACTION_MAIN"', function () {
            dispTestCaseRunning('Sending Intent with parameters {"params":{"intentType":"START_ACTIVITY","action":"ACTION_MAIN","categories":["CATEGORY_APP_EMAIL"],"appName":"","targetClass":"","uri":"","mimeType":"","data":""}}');
            dispExpectedResult('Email application should be launched successfully.');
            _result.waitToRunTest();
            runs(function () {
                var category = ["CATEGORY_APP_EMAIL"];
                var params = new parameters("START_ACTIVITY","ACTION_MAIN",category,"","","","","");
                Rho.Intent.send(params);
            });
            _result.waitForResponse();
        });
        it('category - Launch Gallery application from test app by setting category "CATEGORY_APP_GALLERY" and action "ACTION_MAIN"', function () {
            dispTestCaseRunning('Sending Intent with parameters {"params":{"intentType":"START_ACTIVITY","action":"ACTION_MAIN","categories":["CATEGORY_APP_GALLERY"],"appName":"","targetClass":"","uri":"","mimeType":"","data":""}}');
            dispExpectedResult('Gallery launched successfully');
            _result.waitToRunTest();
            runs(function () {
                var category = ["CATEGORY_APP_GALLERY"];
                var params = new parameters("START_ACTIVITY","ACTION_MAIN",category,"","","","","");
                Rho.Intent.send(params);
            });
            _result.waitForResponse();
        });
        it('category - Launch Maps application from test app by setting category "CATEGORY_APP_MAPS" and action "ACTION_MAIN"', function () {
            dispTestCaseRunning('Sending Intent with parameters {"params":{"intentType":"START_ACTIVITY","action":"ACTION_MAIN","categories":["CATEGORY_APP_MAPS"],"appName":"","targetClass":"","uri":"","mimeType":"","data":""}}');
            dispExpectedResult('Maps should be launched successfully.');
            _result.waitToRunTest();
            runs(function () {
                var category = ["CATEGORY_APP_MAPS"];
                var params = new parameters("START_ACTIVITY","ACTION_MAIN",category,"","","","","");
                Rho.Intent.send(params);
            });
            _result.waitForResponse();
        });
        it('category - Launch Message application from test app by setting category "CATEGORY_APP_MESSAGING" and action "ACTION_MAIN"', function () {
            dispTestCaseRunning('Sending Intent with parameters {"params":{"intentType":"START_ACTIVITY","action":"ACTION_MAIN","categories":["CATEGORY_APP_MESSAGING"],"appName":"","targetClass":"","uri":"","mimeType":"","data":""}}');
            dispExpectedResult('Messaging app launched successfully.');
            _result.waitToRunTest();
            runs(function () {
                var category = ["CATEGORY_APP_MESSAGING"];
                var params = new parameters("START_ACTIVITY","ACTION_MAIN",category,"","","","","");
                Rho.Intent.send(params);
            });
            _result.waitForResponse();
        });
        it('mimeType - Launch browser from test app by setting mimeType to "text/html" and Data to "<Some HTML text>"', function () {
            dispTestCaseRunning('Sending Intent with parameters {"params":{"intentType":"START_ACTIVITY","action":"ACTION_VIEW","categories":"","appName":"","targetClass":"","uri":"","mimeType":"text/html","data":"<h3 style=\'color:green\'>Test case passed if you see this text in Green color with browser</h3>"}}');
            dispExpectedResult('Browser should be launched successfully.');
            _result.waitToRunTest();
            runs(function () {
                var enterData = [{"EXTRA":"EXTRA_HTML_TEXT","DATA":"<h3 style=\'color:green\'>Test case passed if you see this text in Green color with browser</h3>"}];
                var data = getData(enterData);
                var params = new parameters("START_ACTIVITY","ACTION_VIEW","","","","","text/html",data);
                Rho.Intent.send(params);
            });
            _result.waitForResponse();
        });
        it('mimeType - Launch Message application from test app by setting mimeType "vnd.android-dir/mms-sms" and Data to "This is message body !"', function () {
            dispTestCaseRunning('Sending Intent with parameters {"params":{"intentType":"START_ACTIVITY","action":"","categories":"","appName":"","targetClass":"","uri":"","mimeType":"vnd.android-dir/mms-sms","data":"This should be in message body!"}}');
            dispExpectedResult('Messaging app launched successfully.');
            _result.waitToRunTest();
            runs(function () {
                
                var params = new parameters("START_ACTIVITY","","","","","",data);
                Rho.Intent.send(params);
            });
            _result.waitForResponse();
        });
    }
    it('mimeType - Launch Music player from test app by setting mimeType "audio/x-mpeg-3" and Data to "streaming data"', function () {
        dispTestCaseRunning('Sending Intent with parameters {"params":{"intentType":"START_ACTIVITY","action":"","categories":"","appName":"","targetClass":"","uri":"","mimeType":"audio/x-mpeg-3","data":""}}');
        dispExpectedResult('MusicPlayer should be launched successfully');
        _result.waitToRunTest();
        runs(function () {
            var enterData = [{"EXTRA":"EXTRA_STREAM","DATA":""}];
                var data = getData(enterData);
            var params = new parameters("START_ACTIVITY","","","","","","audio/x-mpeg-3",data);
            Rho.Intent.send(params);
        });
        _result.waitForResponse();
    });
    it('mimeType - Launch Image viewer from test app by setting mimeType "image/* (jpeg, gif, png etc.,)" and Data to "image data URI"', function () {
        dispTestCaseRunning('Sending Intent with parameters {"params":{"intentType":"START_ACTIVITY","action":"","categories":"","appName":"","targetClass":"","uri":"","mimeType":"image/jpeg","data":"<data:image/jpeg;base64,/qerwe.... >"}}');
        dispExpectedResult('Image viewer should be launched successfully.');
        _result.waitToRunTest();
        runs(function () {
            var enterData = [{"EXTRA":"EXTRA_STREAM","DATA":"data:image/jpeg;base64,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"}];
            var data = getData(enterData);
            var params = new parameters("START_ACTIVITY","","","","","","image/jpeg",data);
            Rho.Intent.send(params);
        });
        _result.waitForResponse();
    });
    if(!isAndroidPlatform() && !isApplePlatform()){
        it('appName - Launch any other Application by setting \'appName\' in intent params, from test application.', function () {
            dispTestCaseRunning('Sending Intent with parameters {"params":{"intentType":"START_ACTIVITY","action":"","categories":"","appName":"testApp","targetClass":"","uri":"","mimeType":"","data":""}}');
            dispExpectedResult('Application should be launched from test application successfully');
            _result.waitToRunTest();
            runs(function () {
                var params = new parameters("START_ACTIVITY","","","testApp","","","","");
                Rho.Intent.send(params);
            });
            _result.waitForResponse();
        });
    }
    it('appName - Try to Launch non-existing Application via \'appName\' from test application.', function () {
        dispTestCaseRunning('Sending Intent with parameters {"params":{"intentType":"START_ACTIVITY","action":"","categories":"","appName":"nonExistingApp","targetClass":"","uri":"","mimeType":"","data":""}}');
        dispExpectedResult('No effect and no crash should be seen.');
        _result.waitToRunTest();
        runs(function () {
            var params = new parameters("START_ACTIVITY","","","nonExistingApp","","","","");
            Rho.Intent.send(params);
        });
        _result.waitForResponse();
    });
    if(isAndroidPlatform()){
        it('appName - Launch Android application via \'appName\' (packageName) from test application.', function () {
            dispTestCaseRunning('Sending Intent with parameters {"params":{"intentType":"START_ACTIVITY","action":"","categories":"","appName":"com.smap.targetapp","targetClass":"","uri":"","mimeType":"","data":""}}');
            dispExpectedResult('Android application should launched whose package name matches.');
            _result.waitToRunTest();
            runs(function () {
                var params = new parameters("START_ACTIVITY","","","com.smap.targetapp","","","","");
                Rho.Intent.send(params);
            });
            _result.waitForResponse();
        });
    }
    if(isApplePlatform()){
        it('appName - Launch iOS application via \'appName\' (BundleURLScheme) from test application.', function () {
            dispTestCaseRunning('Sending Intent with parameters {"params":{"intentType":"START_ACTIVITY","action":"","categories":"","appName":"com.smap.targetapp","targetClass":"","uri":"","mimeType":"","data":""}}');
            dispExpectedResult('iOS application should be launched whose bundleUrlScheme matches.');
            _result.waitToRunTest();
            runs(function () {
                var params = new parameters("START_ACTIVITY","","","ios app url","","","","");
                Rho.Intent.send(params);
            });
            _result.waitForResponse();
        });
    }
    it('uri - Launch URL via browser appliation from test app by setting URI "http://www.google.com"', function () {
        dispTestCaseRunning('Sending Intent with parameters {"params":{"intentType":"START_ACTIVITY","action":"ACTION_VIEW","categories":"","appName":"","targetClass":"","uri":"http://www.google.com","mimeType":"","data":""}}');
        dispExpectedResult('Browser should be launched with default data in the view.');
        _result.waitToRunTest();
        runs(function () {
            var params = new parameters("START_ACTIVITY","ACTION_VIEW","","","","http://www.google.com","","");
            Rho.Intent.send(params);
        });
        _result.waitForResponse();
    });
    it('uri - Launch Message application with data from test app by setting URI "sms:9611896991"', function () {
        dispTestCaseRunning('Sending Intent with parameters {"params":{"intentType":"START_ACTIVITY","action":"","categories":"","appName":"","targetClass":"","uri":"sms:9611896991","mimeType":"","data":""}}');
        dispExpectedResult('Message compose application should be launched with pre-filled recepient number.');
        _result.waitToRunTest();
        runs(function () {
            var params = new parameters("START_ACTIVITY","","","","","sms:9611896991","","");
            Rho.Intent.send(params);
        });
        _result.waitForResponse();
    });
    it('uri - Launch Email appliation with data from test app by setting URI "mailto:abcd@domain.com"', function () {
        dispTestCaseRunning('Sending Intent with parameters Sending Intent with parameters {"params":{"intentType":"START_ACTIVITY","action":"","categories":"","appName":"","targetClass":"","uri":"mailto:abcd@domain.com","mimeType":"","data":""}}');
        dispExpectedResult('Email compose view should be launched with pre-filled recepient email address.');
        _result.waitToRunTest();
        runs(function () {
            var params = new parameters("START_ACTIVITY","","","","","mailto:abcd@domain.com","","");
            Rho.Intent.send(params);
        });
        _result.waitForResponse();
    });
    it('uri - Launch dialler with pre-filled number from test application by setting URI "tel:9611896991" and with Action: ACTION_DIAL', function () {
        dispTestCaseRunning('Sending Intent with parameters {"params":{"intentType":"START_ACTIVITY","action":"ACTION_DIAL","categories":"","appName":"","targetClass":"","uri":"mailto:abcd@domain.com","mimeType":"","data":""}}');
        dispExpectedResult('Dialer launches with pre-loaded number in it.');
        _result.waitToRunTest();
        runs(function () {
            var params = new parameters("START_ACTIVITY","ACTION_DIAL","","","","tel:9611896991","","");
            Rho.Intent.send(params);
        });
        _result.waitForResponse();
    });
    it('uri - Launch Maps with pre-set lat and longitute values from test app by setting Uri "geo:latitude,longitude"', function () {
        dispTestCaseRunning('Sending Intent with parameters {"params":{"intentType":"START_ACTIVITY","action":"ACTION_VIEW","categories":"","appName":"","targetClass":"","uri":"geo:12.9667° N, 77.5667° E","mimeType":"","data":""}}');
        dispExpectedResult('Maps application launched with the pre-set Lattitude and Longitude');
        _result.waitToRunTest();
        runs(function () {
            var params = new parameters("START_ACTIVITY","ACTION_VIEW","","","","geo:12.9667° N, 77.5667° E","","");
            Rho.Intent.send(params);
        });
        _result.waitForResponse();
    });
    it('uri - Make a call from test application by setting URI "tel:9611896991" and Action : "ACTION_CALL"', function () {
        dispTestCaseRunning('Sending Intent with parameters {"params":{"intentType":"START_ACTIVITY","action":"ACTION_CALL","categories":"","appName":"","targetClass":"","uri":"mailto:abcd@domain.com","mimeType":"","data":""}}');
        dispExpectedResult('Phone call made to the pre-loaded number.');
        _result.waitToRunTest();
        runs(function () {
            var params = new parameters("START_ACTIVITY","ACTION_CALL","","","","tel:9611896991","","");
            Rho.Intent.send(params);
        });
        _result.waitForResponse();
    });
    if(isAndroidPlatform()){
        it('uri - Launch Contacts from test application via Uri "content://contacts/people/" and Action: ACTION_VIEW', function () {
            dispTestCaseRunning('Sending Intent with parameters {"params":{"intentType":"START_ACTIVITY","action":"ACTION_VIEW","categories":"","appName":"","targetClass":"","uri":"content://contacts/people/","mimeType":"","data":""}}');
            dispExpectedResult('Contacts application is launched successfully');
            _result.waitToRunTest();
            runs(function () {
                var params = new parameters("START_ACTIVITY","ACTION_VIEW","","","","content://contacts/people/","","");
                Rho.Intent.send(params);
            });
            _result.waitForResponse();
        });
        it('uri - Launch Contacts from test application via Uri "content://contacts/people/" and Action: ACTION_VIEW', function () {
            dispTestCaseRunning('Sending Intent with parameters {"params":{"intentType":"START_ACTIVITY","action":"ACTION_EDIT","categories":"","appName":"","targetClass":"","uri":"content://contacts/people/","mimeType":"","data":""}}');
            dispExpectedResult('Contacts application is launched in edit mode of the first contact successfully');
            _result.waitToRunTest();
            runs(function () {
                var params = new parameters("START_ACTIVITY","ACTION_EDIT","","","","content://contacts/people/1","","");
                Rho.Intent.send(params);
            });
            _result.waitForResponse();
        });
        it('uri - Launch target application from test application via Custom Uri "myApp://homeScreen"', function () {
            dispTestCaseRunning('Sending Intent with parameters {"params":{"intentType":"START_ACTIVITY","action":"","categories":"","appName":"","targetClass":"","uri":"myApp://homeScreen","mimeType":"","data":""}}');
            dispExpectedResult('Target applicatoin is launched by custom Uri successfully.');
            _result.waitToRunTest();
            runs(function () {
                var params = new parameters("START_ACTIVITY","","","","","myApp://homeScreen","","");
                Rho.Intent.send(params);
            });
            _result.waitForResponse();
        });
        it('uri - Launch SMS application from test application via URI "content://sms"', function () {
            dispTestCaseRunning('Sending Intent with parameters {"params":{"intentType":"START_ACTIVITY","action":"","categories":"","appName":"","targetClass":"","uri":"content://sms","mimeType":"","data":""}}');
            dispExpectedResult('Message appliation launched successfully.');
            _result.waitToRunTest();
            runs(function () {
                var params = new parameters("START_ACTIVITY","","","","","content://sms","","");
                Rho.Intent.send(params);
            });
            _result.waitForResponse();
        });
    }
    it('uri - Launch Email compose screen with pre-filled email from test application by setting URI and data.', function () {
        dispTestCaseRunning('Sending Intent with parameters {"params":{"intentType":"START_ACTIVITY","action":"","categories":"","appName":"","targetClass":"","uri":"mailto:abcd@domain.com","mimeType":"","data":"This is test email body"}}');
        dispExpectedResult('Email compose screen should be launched successfully with pre-filled data in it.');
        _result.waitToRunTest();
        runs(function () {
            var data ={
                "EXTRA_TEXT":"Test case Passed : only if this is displayed in email body content with prefilled recepient address !"
            };
            var params = new parameters("START_ACTIVITY","","","","","mailto:abcd@domain.com","",data);
            Rho.Intent.send(params);
        });
        _result.waitForResponse();
    });
    if(isAndroidPlatform()){
        it('category - Launch Message application from test app by setting URI "content://sms" and data "This is message body".', function () {
            dispTestCaseRunning('Sending Intent with parameters {"params":{"intentType":"START_ACTIVITY","action":"","categories":"","appName":"","targetClass":"","uri":"content://sms","mimeType":"","data":"This is SMS message body"}}');
            dispExpectedResult('Message compose screen should be launched successfully with data in it.');
            _result.waitToRunTest();
            runs(function () {
                var enterData = [{"EXTRA":"EXTRA_TEXT","DATA":"Test case passed only if this is displayed in message body with prefille recepient number !"}];
                var params = new parameters("START_ACTIVITY","","","","","content://sms","",data);
                Rho.Intent.send(params);
            });
            _result.waitForResponse();
        });
    }
    if(isAndroidPlatform()){
        it('Callback : Send an Intent and the same intent details should be seen in the callback.', function () {
            dispTestCaseRunning('Sending intent with callback should handle the returned intent in the callback fuction. The parameters below should match with call back handled intent parameters. <br/> {"params":{"intentType":"START_ACTIVITY","action":"ACTION_MAIN","categories":"","appName":"com.smap.targetapp","targetClass":"","uri":"","mimeType":"","data":{"myData":"This is Test data !"}}}');
            dispExpectedResult('The intent param sent from test application should be returned back to the callback handler. Test case passed only if an alert message should be shown with result: Passed!');
            _result.waitToRunTest();
            runs(function () {
                var data = {
                    "myData":"This is Test data !"
                };
                var params = new parameters("START_ACTIVITY","ACTION_MAIN","","com.smap.targetapp","","","",data);
                var successCB = function(intents){
                    var intentParam = intents.params;
                    console.log("intentType : "+intentParam.intentType+"</br>"+
                    "intentType : "+intentParam.intentType+"</br>"+
                    "action : "+intentParam.action+"</br>"+
                    "categories : "+intentParam.categories+"</br>"+
                    "appName : "+intentParam.appName+"</br>"+
                    "targetClass : "+intentParam.targetClass+"</br>"+
                    "uri : "+intentParam.uri+"</br>"+
                    "mimeType : "+intentParam.mimeType+"</br>"+
                    "data : "+intentParam.data.myData);
                    if(params === intents){
                        alert("Test Passed !");
                    }else{
                        alert("Test Failed !");
                    }
                };
                Rho.Intent.send(params, successCB);
            });
            _result.waitForResponse();
        });
    }
    it('Start Listening to the background intents - broadcast messages (receiving broadcast messages)', function () {
        dispTestCaseRunning('Test app should receive broad cast messages with the help of Start Listening API.');
        dispExpectedResult('Test appliation starts listening to background intents and should alert the broadcast message received');
        _result.waitToRunTest();
        runs(function () {
            var mytestapp = Rho.Application.appName;
            var data = {
                "myData":"This is broad cast data !"
            };
            var params = new parameters("BROADCAST","ACTION_VIEW","",mytestapp,"","","",data);
            var receiveCB = function(intents){
                var receivedParam = intents.params;
                if(receivedParam.data.myData == "This is broad cast data !")
                {
                    alert("Test case passed !");
                }
            };
            Rho.Intent.startListening(receiveCB);
            Rho.Intent.send(params);
        });
        _result.waitForResponse();
    });
    it('Start Listening to the background intents - broadcast messages (receiving broadcast messages)', function () {
        dispTestCaseRunning('Test app should receive broad cast messages with the help of Start Listening API.');
        dispExpectedResult('Test appliation starts listening to background intents and should alert the broadcast message received and also should trigger callback function of the send method which alerts test case passed.');
        _result.waitToRunTest();
        runs(function () {
            var mytestapp = Rho.Application.appName;
            var data = {
                "myData":"This is broad cast data !"
            };
            var params = new parameters("BROADCAST","ACTION_VIEW","",mytestapp,"","","",data);
            var receiveCB = function(intents){
                var receivedParam = intents.params;
                if(receivedParam.data.myData == "This is broad cast data !")
                {
                    alert("startListening Callback: fired !");
                }
            };
            var successCB = function(intents){
                    var intentParam = intents.params;
                    console.log("intentType : "+intentParam.intentType+"</br>"+
                    "intentType : "+intentParam.intentType+"</br>"+
                    "action : "+intentParam.action+"</br>"+
                    "categories : "+intentParam.categories+"</br>"+
                    "appName : "+intentParam.appName+"</br>"+
                    "targetClass : "+intentParam.targetClass+"</br>"+
                    "uri : "+intentParam.uri+"</br>"+
                    "mimeType : "+intentParam.mimeType+"</br>"+
                    "data : "+intentParam.data.myData);
                    if(params === intents){
                        alert("send Callback: fired - Test Passed !");
                    }else{
                        alert("send Callback: fired - Test Failed !");
                    }
                };
            Rho.Intent.startListening(receiveCB);
            Rho.Intent.send(params, successCB);
        });
        _result.waitForResponse();
    });
    it('Try to start listening to the background intents, when already started listenting.', function () {
        dispTestCaseRunning('Try to start listening to the background intents, when already started listenting.');
        dispExpectedResult('No effect or no crash should be seen in the test application.');
        _result.waitToRunTest();
        runs(function () {
            var mytestapp = Rho.Application.appName;
            var data = {
                "myData":"This is broad cast data !"
            };
            var params = new parameters("BROADCAST","","",mytestapp,"","","",data);
            var receiveCB = function(intents){
                var receivedParam = intents.params;
                if(receivedParam.data.myData == "This is broad cast data !")
                {
                    alert("Test case passed !");
                }
            };
            Rho.Intent.startListening(receiveCB);
            Rho.Intent.startListening(receiveCB);
            Rho.Intent.send(params);
        });
        _result.waitForResponse();
    });
    it('Stop Listening to the background intents', function () {
        dispTestCaseRunning('Execute \'Stop Listening\' API.');
        dispExpectedResult('Test application should stop listening to background intents ie., ( test application should not receive any broad cast messages).');
        _result.waitToRunTest();
        runs(function () {
            var mytestapp = Rho.Application.appName;
            var data = {
                "myData":"This is broad cast data !"
            };
            var params = new parameters("BROADCAST","","",mytestapp,"","","",data);
            var receiveCB = function(intents){
                var receivedParam = intents.params;
                alert("Test Case failed if you see this alert message!");
            };
            Rho.Intent.startListening(receiveCB);
            Rho.Intent.stopListening();
            Rho.Intent.send(params);
        });
        _result.waitForResponse();
    });
    it('Stop Listening to the background intents before executing startListenting method', function () {
        dispTestCaseRunning('Performing multiple execution of \'Stop Listening\'.');
        dispExpectedResult('No effect or no crash should be seen in the test application.');
        _result.waitToRunTest();
        runs(function () {
            var mytestapp = Rho.Application.appName;
            var data = {
                "myData":"This is broad cast data !"
            };
            var params = new parameters("BROADCAST","","",mytestapp,"","","",data);
            var receiveCB = function(intents){
                var receivedParam = intents.params;
                alert("Test Case failed if you see this alert message!");
            };
            Rho.Intent.startListening(receiveCB);
            Rho.Intent.stopListening();
            Rho.Intent.stopListening();
            Rho.Intent.send(params);
        });
        _result.waitForResponse();
    });
    it('Suggest different applications to send text message', function(){
        dispTestCaseRunning('Sending Intent matches with multiple activities, should suggest for the application to launch!');
        dispExpectedResult('Application chooser should be shown to the user in performing the intent!');
        _result.waitToRunTest();
        runs(function(){
            var enterData = [{"EXTRA":"EXTRA_TEXT", "DATA":"This is message to be sent!"}];
            var data = getData(enterData);
            var params = new parameters("START_ACTIVITY","ACTION_SEND","","","","","text/plain",data);
            Rho.Intent.send(params);
        });
        _result.waitForResponse();
    });
    it('Sending array of data with the intent', function(){
        dispTestCaseRunning('Sending Intent with multiple EXTRA\'s');
        dispExpectedResult('Email compose screen should be displayed with prefilled To, CC, BCC and Subject field !');
        _result.waitToRunTest();
        runs(function(){
            var enterData = [
            {"EXTRA":"EXTRA_EMAIL", "DATA":"test@domain.com"},
            {"EXTRA":"EXTRA_CC", "DATA":"carbon.copy@domain.com"},
            {"EXTRA":"EXTRA_BCC", "DATA":"bcc.email@domain.com"},
            {"EXTRA":"EXTRA_SUBJECT", "DATA":"Email Subject !"},
            {"EXTRA":"EXTRA_TEXT","DATA":"Email body content !"}
            ];
            var data = getData(enterData);
            var params = new parameters("START_ACTIVITY","ACTION_SEND","","","","","text/plain",data);
            Rho.Intent.send(params);
        });
        _result.waitForResponse();
    });    

    // Negative test case:
    it('Sending Intent with null parameter', function(){
        dispTestCaseRunning('No parameters passed to the Rho.Intent.send() API');
        dispExpectedResult('No Effect or no crash should be seen in the test application');
        _result.waitToRunTest();
        runs(function(){
            Rho.Intent.send();
        })
        _result.waitForResponse();
    });
    it('Sending Intent with intentparameter Object with null values', function(){
        dispTestCaseRunning('Sending intent with null intent parameter object');
        dispExpectedResult('No effect or crash should be seen at the test application.');
        _result.waitToRunTest();
        runs(function(){
            var params = new parameters("","","","","","","","");
            Rho.Intent.send(params);
        });
        _result.waitForResponse();
    });
    it('Sending Intent with callback which does not handle the intent parameter', function(){
        dispTestCaseRunning('Sending intent with callback which has empty argument');
        dispExpectedResult('No effect or crash should be seen in the test applciation.');
        _result.waitToRunTest();
        runs(function(){
            var successCB = function(){
                console.log("This is callback from intent API");
            };
            var params = new parameters("START_ACTIVITY","ACTION_MAIN","","com.smap.targetapp","","","","");
            Rho.Intent.send(params, successCB);
        });
        _result.waitForResponse();
    });
    it('Sending Intent with variable in place of callback function', function(){
        dispTestCaseRunning('Sending intent with string variable as a callback parameter');
        dispExpectedResult('No effect or crash should be seen in the test applciation.');
        _result.waitToRunTest();
        runs(function(){
            var successCB = "This is not a call back function!";
            var params = new parameters("START_ACTIVITY","ACTION_MAIN","","com.smap.targetapp","","","","");
            Rho.Intent.send(params, successCB);
        });
        _result.waitForResponse();
    });
    it('Sending Intent with null in place of callback function', function(){
        dispTestCaseRunning('Sending intent with NULL value as a callback parameter');
        dispExpectedResult('No effect or crash should be seen in the test applciation.');
        _result.waitToRunTest();
        runs(function(){
            var successCB = "This is not a call back function!";
            var params = new parameters("START_ACTIVITY","ACTION_MAIN","","com.smap.targetapp","","","","");
            Rho.Intent.send(params, null);
        });
        _result.waitForResponse();
    });
     it('Stop Listening to the background intents with empty callback', function () {
        dispTestCaseRunning('Executing stopListening method without callback function !');
        dispExpectedResult('No effect or no crash should be seen in the test application.');
        _result.waitToRunTest();
        runs(function () {
            var mytestapp = Rho.Application.appName;
            var data = {
                "myData":"This is broad cast data !"
            };
            var params = new parameters("BROADCAST","","",mytestapp,"","","",data);
            Rho.Intent.startListening();
            Rho.Intent.send(params);
        });
        _result.waitForResponse();
    });
    it('Stop Listening to the background intents callback without argument', function () {
        dispTestCaseRunning('Executing stopListening method with callback function which does not have argument !');
        dispExpectedResult('No effect or no crash should be seen in the test application.');
        _result.waitToRunTest();
        runs(function () {
            var mytestapp = Rho.Application.appName;
            var data = {
                "myData":"This is broad cast data !"
            };
            var receiveCB = function(){
                alert("Callback without arguments !");
            };
            var params = new parameters("BROADCAST","","",mytestapp,"","","",data);
            Rho.Intent.startListening(receiveCB);
            Rho.Intent.send(params);
        });
        _result.waitForResponse();
    });
});