var parameters = function (intentType, permission, action, categories, appName, targetClass, uri, mimeType, data) {
    var result = {};
    if (permission != "") result.permission = permission;
    if (intentType != "") result.intentType = intentType;
    if (action != "") result.action = action;
    if (categories != "") result.categories = categories;
    if (appName != "") result.appName = appName;
    if (targetClass != "") result.targetClass = targetClass;
    if (uri != "") result.uri = uri;
    if (mimeType != "") result.mimeType = mimeType;
    if (data != "") result.data = data;
    return result;
};

describe('Intent_UseCases Functionality Test', function () {
    if(isAndroidPlatform()){
        it('VT328_01 | intentType - StartActivity: Launch target application by \'packageName\', which is installed but not running.', function () {
            displayObjective("VT328_01 | intentType - StartActivity: Launch target application by packageName, which is installed but not running");
            var preConditions = ["Ensure Target application installed in the device", "Ensure Target application is not running"];
            displayPrecondition(preConditions);
            dispTestCaseRunning('Sending Intent with parameters {"params":{"intentType":Rho.Intent.START_ACTIVITY,"action":"ACTION_MAIN","categories":"","appName":"com.smap.targetapp","targetClass":"","uri":"","mimeType":"","data":""}}');
            dispExpectedResult('The Target application should be launched successfully.');
            _result.waitToRunTest();
            runs(function () {
                var params = new parameters(Rho.Intent.START_ACTIVITY, "", "ACTION_MAIN", "", "com.smap.targetapp", "", "", "", "");
                Rho.Intent.send(params);
            });
            _result.waitForResponse();
        });
        it('VT328_02 | intentType - StartActivity: Launch target application by \'packageName\', which is running in background.', function () {
            displayObjective("VT328_02 | intentType - StartActivity: Launch target application by \'packageName\', which is running in background.");
            var preConditions = ["Ensure Target application installed in the device", "Ensure Target application is running in background"];
            displayPrecondition(preConditions);
            dispTestCaseRunning('Sending Intent with parameters: </br> {"params":{"intentType":Rho.Intent.START_ACTIVITY,"action":"ACTION_MAIN","categories":"","appName":"com.smap.targetapp","targetClass":"","uri":"","mimeType":"","data":""}}');
            dispExpectedResult('The Target application which is running in the background should be bought to foreground.');
            _result.waitToRunTest();
            runs(function () {
                var params = new parameters(Rho.Intent.START_ACTIVITY,"","ACTION_MAIN","","com.smap.targetapp","","","","");
                Rho.Intent.send(params);
            });
            _result.waitForResponse();
        });
        it('VT328_03 | intentType - StartActivity: Launch target application by \'className\',which is installed but not running.', function () {
            displayObjective("VT328_03 | intentType - StartActivity: Launch target application by \'className\',which is installed but not running.");
            var preConditions = ["Ensure Target application installed in the device"];
            displayPrecondition(preConditions);
            dispTestCaseRunning('Sending Intent with parameters {"params":{"intentType":Rho.Intent.START_ACTIVITY,"action":"ACTION_MAIN","categories":"","appName":"com.smap.targetapp","targetClass":"MainActivity","uri":"","mimeType":"","data":""}}');
            dispExpectedResult('The Target application should be launched successfully with Passed Text in it.');
            _result.waitToRunTest();
            runs(function () {
                var params = new parameters(Rho.Intent.START_ACTIVITY,"","ACTION_MAIN","","com.smap.targetapp","com.smap.targetapp.MainActivity","","","");
                Rho.Intent.send(params);
            });
            _result.waitForResponse();
        });
        it('VT328_04 | intentType - StartActivity: Launch target application by \'className\', which is running in background.', function () {
            displayObjective("VT328_04 | intentType - StartActivity: Launch target application by \'className\', which is running in background.");
            var preConditions = ["Ensure Target application installed in the device","Ensure Target application running in background"];
            displayPrecondition(preConditions);
            dispTestCaseRunning('Ensure the Target application is running in the background. <br/>Sending Intent with parameters {"params":{"intentType":Rho.Intent.START_ACTIVITY,"action":"ACTION_MAIN","categories":"","appName":"com.smap.targetapp","targetClass":"MainActivity","uri":"","mimeType":"","data":""}} <br/> should bring the application to foreground');
            dispExpectedResult('The Target application which is running in the background should be bought to foreground.');
            _result.waitToRunTest();
            runs(function () {
                var params = new parameters(Rho.Intent.START_ACTIVITY,"","ACTION_MAIN","","com.smap.targetapp","com.smap.targetapp.MainActivity","","","");
                Rho.Intent.send(params);
            });
            _result.waitForResponse();
        });
        it('VT328_05 | intentType - Start service of the test appliation.', function () {
            displayObjective("VT328_05 | intentType - Start service of the test appliation.");
            dispTestCaseRunning('Sending Intent with parameters {"intentType":Rho.Intent.START_SERVICE,"appName":"manual_common_spec","targetClass":"RhodesService"}');
            dispExpectedResult('Service of test application should be started and toast from service is shown.');
            _result.waitToRunTest();
            runs(function () {
                var mytestapp = 'com.rhomobile.manual_common_spec';
                var params = new parameters(Rho.Intent.START_SERVICE,"","","",mytestapp,"com.rhomobile.rhodes.RhodesService","","",{"message":"Message to service"});
                var intentCB = function(intent){
                    if(intent.data.message == "Message to service"){
                        alert("Test case passed!");
                    } else {
                        alert("Test case failed!");
                    }
                };
                Rho.Intent.startListening(intentCB);
                Rho.Intent.send(params);
            });
            _result.waitForResponse();
        });
        it('VT328_06 | intentType - Start service of the target appliation.', function () {
            displayObjective("VT328_06 | intentType - Start service of the target appliation.");
            var preConditions = ["Ensure Target application installed in the device","Ensure Target application is running in background"];
            displayPrecondition(preConditions);
            dispTestCaseRunning('Sending Intent with parameters {"intentType":Rho.Intent.START_SERVICE, "appName":"com.smap.targetapp", "targetClass":"MyFirstService"}');
            dispExpectedResult('Service of target applciation should be started successfully.');
            _result.waitToRunTest();
            runs(function () {
                var params = new parameters(Rho.Intent.START_SERVICE,"","","","com.smap.targetapp","com.smap.targetapp.MyFirstService","","","");
                Rho.Intent.send(params);
            });
            _result.waitForResponse();
        });
        it('VT328_07 | intentType - Start service of the target application which is not running.', function () {
            displayObjective("VT328_07 | intentType - Start service of the target application which is not running.");
            var preConditions = ["Ensure Target application installed in the device","Ensure that Target appliation is not running."];
            displayPrecondition(preConditions);
            dispTestCaseRunning('Sending Intent with parameters {"intentType":Rho.Intent.START_SERVICE, "appName":"com.smap.targetapp", "targetClass":"MyFirstService"}');
            dispExpectedResult('Service of the target applciation should be started successfully.');
            _result.waitToRunTest();
            runs(function () {
                var params = new parameters(Rho.Intent.START_SERVICE,"","","","com.smap.targetapp","com.smap.targetapp.MyFirstService","","","");
                Rho.Intent.send(params);
            });
            _result.waitForResponse();
        });

        it('VT328_08 | intentType - Start service of the target applciation in which the service is already instantiated', function () {
            displayObjective("VT328_08 | intentType - Start service of the target applciation in which the service is already instantiated");
            var preConditions = ["Ensure Target application installed in the device"];
            displayPrecondition(preConditions);
            dispTestCaseRunning('Sending Intent two times with parameters {"intentType":Rho.Intent.START_SERVICE, "appName":"com.smap.targetapp", "targetClass":"MyFirstService"}');
            dispExpectedResult('No crash should be seen in the test application or target appliation, since the service is already instantiated');
            _result.waitToRunTest();
            runs(function () {
                var params = new parameters(Rho.Intent.START_SERVICE,"","ACTION_MAIN","","com.smap.targetapp","com.smap.targetapp.MyFirstService","","","");
                Rho.Intent.send(params);
                Rho.Intent.send(params);
            });
            _result.waitForResponse();
        });
        it('VT328_09 | intentType - Broadcast data from test app and receive at target app.', function () {
            displayObjective("VT328_09 | intentType - Broadcast data from test app and receive at target app.");
            var preConditions = ["Ensure Target application installed in the device"];
            displayPrecondition(preConditions);
            dispTestCaseRunning('Sending Intent with parameters {"intentType":Rho.Intent.BROADCAST, "action":"com.smap.targetapp.mySecondAction", "data":{"toast":"Target -Test case passed If you see this in Andorid Toast !"}}');
            dispExpectedResult('Broadcast should be successful and toast from testApp is displayed.');
            _result.waitToRunTest();
            runs(function () {
                var data = {
                    "toast":"Target - Test case passed if you see this in Android Toast !"
                };
                var params = new parameters(Rho.Intent.BROADCAST,"","com.smap.targetapp.mySecondAction","","","","","",data);
                Rho.Intent.send(params);
            });
            _result.waitForResponse();
        });
		it('VT328_10 | intentType - Broadcast data from test app and receive at target app with permission', function () {
            displayObjective("VT328_10 | intentType - Broadcast data from test app and receive at target app which has permission");
            var preConditions = ["Ensure that both Target application 1 and 2 installed in the device"];
            displayPrecondition(preConditions);
            dispTestCaseRunning('Sending Intent with parameters {"intentType":Rho.Intent.BROADCAST, "permission":"com.example.testtarget.PERMISSION","action":"com.smap.targetapp.mySecondAction", "data":{"toast":"Target -Test case passed If you see this in Andorid Toast !"}}');
            dispExpectedResult('Broadcast should be successful and only one toast is displayed "Target - Test case passed if you see \'PERMISSION\' after this : PERMISSION" ');
            _result.waitToRunTest();
            runs(function () {
                var data = {
                    "toast":"Target - Test case passed if you see 'PERMISSION' after this : "
                };
                var params = new parameters(Rho.Intent.BROADCAST,"com.example.testtarget.PERMISSION","com.smap.targetapp.mySecondAction","","","","","",data);
                Rho.Intent.send(params);
            });
            _result.waitForResponse();
        });
        it('VT328_11 | intentType - Broadcast data from test app and receive back at test app.', function () {
            displayObjective("VT328_11 | intentType - Broadcast data from test app and receive at test app.");
            dispTestCaseRunning('Sending Intent with parameters {"intentType":Rho.Intent.BROADCAST, "action":"com.smap.targetapp.mySecondAction", "data":{"reply":"This is my broadcast data!"}}');
            dispExpectedResult('Broadcast and reply to RhodesService would be successful and alert from test app callback is displayed.');
            _result.waitToRunTest();
            runs(function () {
                var listeningCB = function(intent){
                    if(intent.data.reply == "This is my broadcast data!"){
                        alert("Test case Passed!");
                    } else {
                        alert("Test case Failed!");
                    }
                };
                Rho.Intent.startListening(listeningCB);
                
                var params = new parameters(Rho.Intent.BROADCAST,"","com.smap.targetapp.mySecondAction","","","","","",{"reply":"This is my broadcast data!"});
                Rho.Intent.send(params);
            });
            _result.waitForResponse();
        });
        it('VT328_12 | intentType - Broadcast data from test app and receive at target app, when target app is not running.', function () {
            displayObjective("VT328_12 | intentType - Broadcast data from test app and receive at target app, when target app is not running.");
            var preConditions = ["Ensure Target application installed but not running in the device"];
            displayPrecondition(preConditions);
            dispTestCaseRunning('Sending Intent with parameters {"intentType":Rho.Intent.BROADCAST, "appName":"com.smap.targetapp", "data":{"toast":"Target: Test case passed If you see this in Andorid Toast !"}}');
            dispExpectedResult('Broadcast should be successful.');
            _result.waitToRunTest();
            runs(function () {
                var params = new parameters(Rho.Intent.BROADCAST,"","","","com.smap.targetapp","","","",{"toast":"Target - Test case passed If you see this in Andorid Toast !"});
                Rho.Intent.send(params);
            });
            _result.waitForResponse();
        });
        it('VT328_13 | category - Launch browser from test application by setting category "CATEGORY_APP_BROWSER" and action "ACTION_MAIN"', function () {
            displayObjective('VT328_13 | category - Launch browser from test application by setting category "CATEGORY_APP_BROWSER" and action "ACTION_MAIN". Starting from android Android 4.0.3 (15) ICE_CREAM_SANDWICH_MR1');
            dispTestCaseRunning('Sending Intent with parameters {"params":{"intentType":Rho.Intent.START_ACTIVITY,"action":"ACTION_MAIN","categories":["CATEGORY_APP_BROWSER"],"appName":"","targetClass":"","uri":"","mimeType":"","data":""}}');
            dispExpectedResult('Browser should be launched with blank screen');
            _result.waitToRunTest();
            runs(function () {
                var category = ["CATEGORY_APP_BROWSER"];
                var params = new parameters(Rho.Intent.START_ACTIVITY,"","ACTION_MAIN",category,"","","","","");
                Rho.Intent.send(params);
            });
            _result.waitForResponse();
        });
        it('VT328_14 | category - Launch Music Player from test application by setting category "CATEGORY_APP_MUSIC"  and action "ACTION_MAIN"', function () {
            displayObjective('VT328_14 | category - Launch Music Player from test application by setting category "CATEGORY_APP_MUSIC"  and action "ACTION_MAIN". Starting from android Android 4.0.3 (15) ICE_CREAM_SANDWICH_MR1');
            dispTestCaseRunning('Sending Intent with parameters {"params":{"intentType":Rho.Intent.START_ACTIVITY,"action":"ACTION_MAIN","categories":["CATEGORY_APP_MUSIC"],"appName":"","targetClass":"","uri":"","mimeType":"","data":""}}');
            dispExpectedResult('Launch Music Player from test application by setting category "CATEGORY_APP_MUSIC"  and action "ACTION_MAIN"');
            _result.waitToRunTest();
            runs(function () {
                var category = ["CATEGORY_APP_MUSIC","CATEGORY_APP_MUSIC"];
                var params = new parameters(Rho.Intent.START_ACTIVITY,"","ACTION_MAIN",category,"","","","","");
                Rho.Intent.send(params);
            });
            _result.waitForResponse();
        });
        it('VT328_15 | category - Launch Calculator from test applciation by setting category "CATEGORY_APP_CALCULATOR"  and action "ACTION_MAIN"', function () {
            displayObjective('VT328_15 | category - Launch Calculator from test applciation by setting category "CATEGORY_APP_CALCULATOR"  and action "ACTION_MAIN". Starting from android Android 4.0.3 (15) ICE_CREAM_SANDWICH_MR1');
            dispTestCaseRunning('Sending Intent with parameters {"params":{"intentType":Rho.Intent.START_ACTIVITY,"action":"ACTION_MAIN","categories":["CATEGORY_APP_CALCULATOR"],"appName":"","targetClass":"","uri":"","mimeType":"","data":""}}');
            dispExpectedResult('Calculator should be launched successfully.');
            _result.waitToRunTest();
            runs(function () {
                var category = ["CATEGORY_APP_CALCULATOR"];
                var params = new parameters(Rho.Intent.START_ACTIVITY,"","ACTION_MAIN",category,"","","","","");
                Rho.Intent.send(params);
            });
            _result.waitForResponse();
        });
        it('VT328_16 | category - Launch Calendar from test application by setting category "CATEGORY_APP_CALENDAR" and action "ACTION_MAIN"', function () {
            displayObjective('VT328_16 | category - Launch Calendar from test application by setting category "CATEGORY_APP_CALENDAR" and action "ACTION_MAIN". Starting from android Android 4.0.3 (15) ICE_CREAM_SANDWICH_MR1');
            dispTestCaseRunning('Sending Intent with parameters {"params":{"intentType":Rho.Intent.START_ACTIVITY,"action":"ACTION_MAIN","categories":["CATEGORY_APP_CALENDAR"],"appName":"","targetClass":"","uri":"","mimeType":"","data":""}}');
            dispExpectedResult('Calendar should be launched successfully.');
            _result.waitToRunTest();
            runs(function () {
                var category = ["CATEGORY_APP_CALENDAR"];
                var params = new parameters(Rho.Intent.START_ACTIVITY,"","ACTION_MAIN",category,"","","","","");
                Rho.Intent.send(params);
            });
            _result.waitForResponse();
        });
        it('VT328_17 | category - Launch contacts from test application by setting category "CATEGORY_APP_CONTACTS" and action "ACTION_MAIN"', function () {
            displayObjective('VT328_17 | category - Launch contacts from test application by setting category "CATEGORY_APP_CONTACTS" and action "ACTION_MAIN". Starting from android Android 4.0.3 (15) ICE_CREAM_SANDWICH_MR1');
            dispTestCaseRunning('Sending Intent with parameters {"params":{"intentType":Rho.Intent.START_ACTIVITY,"action":"ACTION_MAIN","categories":["CATEGORY_APP_CONTACTS"],"appName":"","targetClass":"","uri":"","mimeType":"","data":""}}');
            dispExpectedResult('Contacts applciation should be launched successfully.');
            _result.waitToRunTest();
            runs(function () {
                var category = ["CATEGORY_APP_CONTACTS"];
                var params = new parameters(Rho.Intent.START_ACTIVITY,"","ACTION_MAIN",category,"","","","","");
                Rho.Intent.send(params);
            });
            _result.waitForResponse();
        });
        it('VT328_18 | category - Launch Email application from test application by setting category "CATEGORY_APP_EMAIL" and action "ACTION_MAIN"', function () {
            displayObjective('VT328_18 | category - Launch Email application from test application by setting category "CATEGORY_APP_EMAIL" and action "ACTION_MAIN". Starting from android Android 4.0.3 (15) ICE_CREAM_SANDWICH_MR1');
            dispTestCaseRunning('Sending Intent with parameters {"params":{"intentType":Rho.Intent.START_ACTIVITY,"action":"ACTION_MAIN","categories":["CATEGORY_APP_EMAIL"],"appName":"","targetClass":"","uri":"","mimeType":"","data":""}}');
            dispExpectedResult('Email application should be launched successfully.');
            _result.waitToRunTest();
            runs(function () {
                var category = ["CATEGORY_APP_EMAIL"];
                var params = new parameters(Rho.Intent.START_ACTIVITY,"","ACTION_MAIN",category,"","","","","");
                Rho.Intent.send(params);
            });
            _result.waitForResponse();
        });
        it('VT328_19 | category - Launch Gallery application from test app by setting category "CATEGORY_APP_GALLERY" and action "ACTION_MAIN"', function () {
            displayObjective('VT328_19 | category - Launch Gallery application from test app by setting category "CATEGORY_APP_GALLERY" and action "ACTION_MAIN". Starting from android Android 4.0.3 (15) ICE_CREAM_SANDWICH_MR1');
            dispTestCaseRunning('Sending Intent with parameters {"params":{"intentType":Rho.Intent.START_ACTIVITY,"action":"ACTION_MAIN","categories":["CATEGORY_APP_GALLERY"],"appName":"","targetClass":"","uri":"","mimeType":"","data":""}}');
            dispExpectedResult('Gallery launched successfully');
            _result.waitToRunTest();
            runs(function () {
                var category = ["CATEGORY_APP_GALLERY"];
                var params = new parameters(Rho.Intent.START_ACTIVITY,"","ACTION_MAIN",category,"","","","","");
                Rho.Intent.send(params);
            });
            _result.waitForResponse();
        });
        xit('VT328_20 | category - Launch Maps application from test app by setting category "CATEGORY_APP_MAPS" and action "ACTION_MAIN"', function () {
            // Does not accepted by Android for some reason
            displayObjective('VT328_20 | category - Launch Maps application from test app by setting category "CATEGORY_APP_MAPS" and action "ACTION_MAIN". Starting from android Android 4.0.3 (15) ICE_CREAM_SANDWICH_MR1');
            dispTestCaseRunning('Sending Intent with parameters {"params":{"intentType":Rho.Intent.START_ACTIVITY,"action":"ACTION_MAIN","categories":["CATEGORY_APP_MAPS"],"appName":"","targetClass":"","uri":"","mimeType":"","data":""}}');
            dispExpectedResult('Maps should be launched successfully.');
            _result.waitToRunTest();
            runs(function () {
                var category = ["CATEGORY_APP_MAPS"];
                var params = new parameters(Rho.Intent.START_ACTIVITY,"","ACTION_MAIN",category,"","","","","");
                Rho.Intent.send(params);
            });
            _result.waitForResponse();
        });
        it('VT328_21 | category - Launch Message application from test app by setting category "CATEGORY_APP_MESSAGING" and action "ACTION_MAIN"', function () {
            displayObjective('VT328_21 | category - Launch Message application from test app by setting category "CATEGORY_APP_MESSAGING" and action "ACTION_MAIN". Starting from android Android 4.0.3 (15) ICE_CREAM_SANDWICH_MR1');
            dispTestCaseRunning('Sending Intent with parameters {"params":{"intentType":Rho.Intent.START_ACTIVITY,"action":"ACTION_MAIN","categories":["CATEGORY_APP_MESSAGING"],"appName":"","targetClass":"","uri":"","mimeType":"","data":""}}');
            dispExpectedResult('Messaging app launched successfully.');
            _result.waitToRunTest();
            runs(function () {
                var category = ["CATEGORY_APP_MESSAGING"];
                var params = new parameters(Rho.Intent.START_ACTIVITY,"","ACTION_MAIN",category,"","","","","");
                Rho.Intent.send(params);
            });
            _result.waitForResponse();
        });
        it('VT328_22 | mimeType - Launch Message application from test app by setting mimeType "vnd.android-dir/mms-sms" and Data to "<Some HTML text>"', function () {
            displayObjective('VT328_22 | mimeType - Launch Message application from test app by setting mimeType "vnd.android-dir/mms-sms" and Data to "<Some HTML text>"');
            dispTestCaseRunning('Sending Intent with parameters {"params":{"intentType":Rho.Intent.START_ACTIVITY,"action":"ACTION_SEND","categories":"","appName":"","targetClass":"","uri":"","mimeType":"vnd.android-dir/mms-sms",{"EXTRA_HTML_TEXT":"<h3 style=\'color:green\'>Test case passed if you see this text in Green color with browser</h3>"}}}');
            dispExpectedResult('Messaging app launched successfully and message body should contain "Test case passed if you see this text in Green color with browser" in green color');
            _result.waitToRunTest();
            runs(function () {
                var data = {"EXTRA_HTML_TEXT":"<h3 style=\'color:green\'>Test case passed if you see this text in Green color with browser</h3>"};
                var params = new parameters(Rho.Intent.START_ACTIVITY,"","ACTION_SEND","","","","","vnd.android-dir/mms-sms",data);
                Rho.Intent.send(params);
            });
            _result.waitForResponse();
        });
        it('VT328_23 | mimeType - Launch Message application from test app by setting mimeType "vnd.android-dir/mms-sms" and Data to "This is message body !"', function () {
            // mimeType param can be used to override default mime type from URL and has no effect used separately without other data
            displayObjective('VT328_23 | mimeType - Launch Message application from test app by setting mimeType "vnd.android-dir/mms-sms" and Data to "This is message body !"');
            dispTestCaseRunning('Sending Intent with parameters {"params":{"intentType":Rho.Intent.START_ACTIVITY,"action":"ACTION_SEND","categories":"","appName":"","targetClass":"","uri":"","mimeType":"vnd.android-dir/mms-sms",{"EXTRA_TEXT":"This should be in message body!"}}}');
            dispExpectedResult('Messaging app launched successfully and message body should contain "This is message body !"');
            _result.waitToRunTest();
            runs(function () {
                var data = {"EXTRA_TEXT":"This is message body !"};
                var params = new parameters(Rho.Intent.START_ACTIVITY,"ACTION_SEND","","","","","vnd.android-dir/mms-sms",data);
                Rho.Intent.send(params);
            });
            _result.waitForResponse();
        });
		xit('VT328_24 | mimeType - Launch Image viewer from test app by setting an EXTRA - EXTRA_STREAM with "image data URI"', function () {
            displayObjective('VT328_24 | mimeType - Launch Image viewer from test app by setting mimeType "image (jpeg, gif, png etc.,)" and Data to "image data URI"');
            dispTestCaseRunning('Sending Intent with parameters {"params":{"intentType":Rho.Intent.START_ACTIVITY,"action":"","categories":"","appName":"","targetClass":"","uri":"","mimeType":"image/jpeg",{"EXTRA_STREAM":"data:image/jpeg;base64,/qerwe.... "}}');
            dispExpectedResult('Image viewer should be launched successfully.');
            _result.waitToRunTest();
            runs(function () {
                var data = {"EXTRA_STREAM":"data:image/jpeg;base64,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"};
                var params = new parameters(Rho.Intent.START_ACTIVITY,"","","","","","","image/jpeg",data);
                Rho.Intent.send(params);
            });
            _result.waitForResponse();
        });
    }
    //TODO: Is such method usage supports on iOS ?
    if(isApplePlatform()){
        // No common app in android supports "data:" URIs in intents
        it('VT328_25 | mimeType - Launch Image viewer from test app by setting uri to "image data URI"', function () {
            displayObjective('VT328_24 | mimeType - Launch Image viewer from test app by setting mimeType "image (jpeg, gif, png etc.,)" and Data to "image data URI"');
            dispTestCaseRunning('Sending Intent with parameters {"params":{"intentType":Rho.Intent.START_ACTIVITY,"action":"","categories":"","appName":"","targetClass":"","uri":"","mimeType":"image/jpeg","data":"<data:image/jpeg;base64,/qerwe.... >"}}');
            dispExpectedResult('Image viewer should be launched successfully.');
            _result.waitToRunTest();
            runs(function () {
                var uri = "data:image/jpeg;base64,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";
                var params = new parameters(Rho.Intent.START_ACTIVITY,"","","","","",uri,"image/jpeg","");
                Rho.Intent.send(params);
                //Rho.System.openUrl(uri);
            });
            _result.waitForResponse();
        });
    }
    if(isAnyWindowsFamilyPlatform()){
        it('VT328_26 | appName - Launch any other Application by setting \'appName\' in intent params, from test application.', function () {
            displayObjective('VT328_25 | appName - Launch any other Application by setting \'appName\' in intent params, from test application.');
            dispTestCaseRunning('Sending Intent with parameters {"params":{"intentType":Rho.Intent.START_ACTIVITY,"action":"","categories":"","appName":"testApp","targetClass":"","uri":"","mimeType":"","data":""}}');
            dispExpectedResult('Application should be launched from test application successfully');
            _result.waitToRunTest();
            runs(function () {
                var parameters = {intentType: Rho.Intent.START_ACTIVITY, appName: "rhomobile TestApp/TestApp.exe", data: {}};
                Rho.Intent.send(parameters);
            });
            _result.waitForResponse();
        });
    }

    if(isAndroidPlatform()){
        it('VT328_27 | appName - Launch Android application via \'appName\' (packageName) from test application.', function () {
            displayObjective('VT328_26 | appName - Launch Android application via \'appName\' (packageName) from test application.');
            dispTestCaseRunning('Sending Intent with parameters {"params":{"intentType":Rho.Intent.START_ACTIVITY,"action":"","categories":"","appName":"com.smap.targetapp","targetClass":"","uri":"","mimeType":"","data":""}}');
            dispExpectedResult('Android application should launched whose package name matches.');
            _result.waitToRunTest();
            runs(function () {
                var params = new parameters(Rho.Intent.START_ACTIVITY,"","","","com.smap.targetapp","","","","");
                Rho.Intent.send(params);
            });
            _result.waitForResponse();
        });
    }
    if(isApplePlatform()){
        it('VT328_28 | appName - Launch iOS application via \'appName\' (BundleURLScheme) from test application.', function () {
            displayObjective('VT328_27 | appName - Launch iOS application via \'testapp\' (BundleURLScheme) from test application.');
            dispTestCaseRunning('Sending Intent with parameters {"params":{"intentType":Rho.Intent.START_ACTIVITY,"action":"","categories":"","testapp":"ios bundle url","targetClass":"","uri":"","mimeType":"","data":""}}');
            dispExpectedResult('iOS application should be launched whose bundleUrlScheme matches.');
            _result.waitToRunTest();
            runs(function () {
                var params = new parameters(Rho.Intent.START_ACTIVITY,"","","","testapp","","","","");
                Rho.Intent.send(params);
            });
            _result.waitForResponse();
        });
    }
    if (isAnyButWindowsFamilyPlatform()){
    it('VT328_29 | uri - Launch URL via browser appliation from test app by setting URI "http://www.google.com"', function () {
        displayObjective('VT328_28 | uri - Launch URL via browser appliation from test app by setting URI "http://www.google.com"');
        dispTestCaseRunning('Sending Intent with parameters {"params":{"intentType":Rho.Intent.START_ACTIVITY,"action":"ACTION_VIEW","categories":"","appName":"","targetClass":"","uri":"http://www.google.com","mimeType":"","data":""}}');
        dispExpectedResult('Browser should be launched with default data in the view.');
        _result.waitToRunTest();
        runs(function () {
            var params = new parameters(Rho.Intent.START_ACTIVITY,"","ACTION_VIEW","","","","http://www.google.com","","");
            Rho.Intent.send(params);
        });
        _result.waitForResponse();
    });
    }
    if (!isApplePlatform()) {
         it('VT328_30 | uri - Launch Message application with data from test app by setting URI "sms:9611896991"', function () {
            displayObjective('VT328_29 | uri - Launch Message application with data from test app by setting URI "sms:9611896991"');
            dispTestCaseRunning('Sending Intent with parameters {"params":{"intentType":Rho.Intent.START_ACTIVITY,"action":"","categories":"","appName":"","targetClass":"","uri":"sms:9611896991","mimeType":"","data":""}}');
            dispExpectedResult('Message compose application should be launched with pre-filled recepient number.');
            _result.waitToRunTest();
            runs(function () {
            	var params;
            	if (isAndroidPlatform()) {
            		params = new parameters(Rho.Intent.START_ACTIVITY,"","","","","","sms:9611896991","","");
                }
                if (isAnyWindowsFamilyPlatform()) {
                	params = new parameters("","","","","","","sms:9611896991","","");
                }
                Rho.Intent.send(params);
                });
            _result.waitForResponse();
            });
         it('VT328_31 | uri - Launch Email appliation with data from test app by setting URI "mailto:abcd@domain.com"', function () {
            displayObjective('VT328_30 | uri - Launch Email appliation with data from test app by setting URI "mailto:abcd@domain.com"');
            var preConditions = ["Ensure default mail box is configured in the device"];
            displayPrecondition(preConditions);
            dispTestCaseRunning('Sending Intent with parameters Sending Intent with parameters {"params":{"intentType":Rho.Intent.START_ACTIVITY,"action":"","categories":"","appName":"","targetClass":"","uri":"mailto:abcd@domain.com","mimeType":"","data":""}}');
            dispExpectedResult('Email compose view should be launched with pre-filled recepient email address.');
            _result.waitToRunTest();
            runs(function () {
            	var params;
            	if (isAndroidPlatform()) {
            		params = new parameters(Rho.Intent.START_ACTIVITY,"","","","","","mailto:abcd@domain.com","","");
                }
                if (isAnyWindowsFamilyPlatform()) {
                	params = new parameters("","","","","","","mailto:abcd@domain.com","","");
                }
                 Rho.Intent.send(params);
                 });
            _result.waitForResponse();
            });
         it('VT328_32 | uri - Launch dialler with pre-filled number from test application by setting URI "tel:9611896991" and with Action: ACTION_DIAL', function () {
            displayObjective('VT328_31 | uri - Launch dialler with pre-filled number from test application by setting URI "tel:9611896991" and with Action: ACTION_DIAL');
            dispTestCaseRunning('Sending Intent with parameters {"params":{"intentType":Rho.Intent.START_ACTIVITY,"action":"ACTION_DIAL","categories":"","appName":"","targetClass":"","uri":"tel:9611896991","mimeType":"","data":""}}');
            dispExpectedResult('Dialer launches with pre-loaded number in it.');
            _result.waitToRunTest();
            runs(function () {
                 var params = new parameters(Rho.Intent.START_ACTIVITY,"","ACTION_DIAL","","","","tel:9611896991","","");
                 Rho.Intent.send(params);
                 });
            _result.waitForResponse();
            });
         if(!isAndroidPlatform()){
         it('VT328_33 | uri - Launch Maps with pre-set lat and longitute values from test app by setting Uri "geo:latitude,longitude"', function () {
            displayObjective('VT328_32 | uri - Launch Maps with pre-set lat and longitute values from test app by setting Uri "geo:latitude,longitude"');
            var preConditions = ["Ensure maps application present in the device"];
            displayPrecondition(preConditions);
            dispTestCaseRunning('Sending Intent with parameters {"params":{"intentType":Rho.Intent.START_ACTIVITY,"action":"ACTION_VIEW","categories":"","appName":"","targetClass":"","uri":"geo:12.9667° N, 77.5667° E","mimeType":"","data":""}}');
            dispExpectedResult('Maps application launched with the pre-set Lattitude and Longitude');
            _result.waitToRunTest();
            runs(function () {
                 var params = new parameters(Rho.Intent.START_ACTIVITY,"","ACTION_VIEW","","","","geo:12.9667° N, 77.5667° E","","");
                 Rho.Intent.send(params);
                 });
            _result.waitForResponse();
            });
         }
         it('VT328_34 | uri - Make a call from test application by setting URI "tel:9611896991" and Action : "ACTION_CALL"', function () {
            displayObjective('VT328_33 | uri - Make a call from test application by setting URI "tel:9611896991" and Action : "ACTION_CALL"');
            dispTestCaseRunning('Sending Intent with parameters {"params":{"intentType":Rho.Intent.START_ACTIVITY,"action":"ACTION_CALL","categories":"","appName":"","targetClass":"","uri":"tel:9611896991","mimeType":"","data":""}}');
            dispExpectedResult('Phone call made to the pre-loaded number.');
            _result.waitToRunTest();
            runs(function () {
                 var params = new parameters(Rho.Intent.START_ACTIVITY,"","ACTION_CALL","","","","tel:9611896991","","");
                 Rho.Intent.send(params);
                 });
            _result.waitForResponse();
            });
    }
    if(isAndroidPlatform()){
        it('VT328_35 | uri - Launch Contacts from test application via Uri "content://contacts/people/" and Action: ACTION_VIEW', function () {
            displayObjective('VT328_34 | uri - Launch Contacts from test application via Uri "content://contacts/people/" and Action: ACTION_VIEW');
            var preConditions = ["Ensure atleast one contact is present in the device"];
            displayPrecondition(preConditions);
            dispTestCaseRunning('Sending Intent with parameters {"params":{"intentType":Rho.Intent.START_ACTIVITY,"action":"ACTION_VIEW","categories":"","appName":"","targetClass":"","uri":"content://contacts/people/","mimeType":"","data":""}}');
            dispExpectedResult('Contacts application is launched successfully');
            _result.waitToRunTest();
            runs(function () {
                var params = new parameters(Rho.Intent.START_ACTIVITY,"","ACTION_VIEW","","","","content://contacts/people/","","");
                Rho.Intent.send(params);
            });
            _result.waitForResponse();
        });
        it('VT328_36 | uri - Launch individual contact from test application via Uri "content://contacts/people/1" and Action: ACTION_VIEW', function () {
            displayObjective('VT328_35 | uri - Launch Contacts from test application via Uri "content://contacts/people/" and Action: ACTION_VIEW');
            var preConditions = ["Ensure atleast one contact is present in the device"];
            displayPrecondition(preConditions);
            dispTestCaseRunning('Sending Intent with parameters {"params":{"intentType":Rho.Intent.START_ACTIVITY,"action":"ACTION_EDIT","categories":"","appName":"","targetClass":"","uri":"content://contacts/people/1","mimeType":"","data":""}}');
            dispExpectedResult('Contacts application is launched in edit mode of the first contact successfully');
            _result.waitToRunTest();
            runs(function () {
                var params = new parameters(Rho.Intent.START_ACTIVITY,"","ACTION_EDIT","","","","content://contacts/people/1","","");
                Rho.Intent.send(params);
            });
            _result.waitForResponse();
        });
    }
    if(!isApplePlatform()) {
         it('VT328_37 | uri - Launch Email compose screen with pre-filled email from test application by setting URI and data.', function () {
            displayObjective('VT328_36 | uri - Launch Email compose screen with pre-filled email from test application by setting URI and data.');
            var preConditions = ["Ensure default mailbox is configured in the device"];
            displayPrecondition(preConditions);
            dispTestCaseRunning('Sending Intent with parameters {"params":{"intentType":Rho.Intent.START_ACTIVITY,"action":"","categories":"","appName":"","targetClass":"","uri":"mailto:abcd@domain.com","mimeType":"","data":"This is test email body"}}');
            dispExpectedResult('Email compose screen should be launched successfully with pre-filled data in it.');
            _result.waitToRunTest();
            runs(function () {
                 var data = {
                 "body":"Test case Passed : only if this is displayed in email body content with prefilled recepient address !"
                 };
                 var params = new parameters(Rho.Intent.START_ACTIVITY,"","","","","","mailto:abcd@domain.com","",data);
                 Rho.Intent.send(params);
                 });
            _result.waitForResponse();
            });
    }
    if(isAndroidPlatform()){
        it('VT328_38 | Callback : Send an Intent and the same intent details should be seen in the callback.', function () {
            displayObjective('VT328_38 | Callback : Send an Intent and the same intent details should be seen in the callback.');
            var preConditions = ["Ensure Target application is installed in the device"];
            displayPrecondition(preConditions);
            dispTestCaseRunning('Sending intent with callback should handle the returned intent in the callback fuction. The parameters below should match with call back handled intent parameters. <br/> {"params":{"intentType":Rho.Intent.START_ACTIVITY,"action":"ACTION_MAIN","categories":"","appName":"com.smap.targetapp","targetClass":"","uri":"","mimeType":"","data":{"myData":"This is Test data !"}}}');
            dispExpectedResult('The intent param sent from test application should be returned back to the callback handler. Test case passed only if an alert message should be shown with result: Passed!');
            _result.waitToRunTest();
            runs(function () {
                var data = {
                    "myData":"This is Test data !"
                };
                var params = new parameters(Rho.Intent.START_ACTIVITY,"","ACTION_MAIN","","com.smap.targetapp","","","",data);
                var successCB = function(intent){
                    console.log(JSON.stringify(intent))
                    if(intent.data.myData == "This is Test data !"){
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
    it('VT328_39 | Start Listening to the background intents - broadcast messages (receiving broadcast messages)', function () {
        displayObjective('VT328_39 | Start Listening to the background intents - broadcast messages (receiving broadcast messages)');
        dispTestCaseRunning('Test app should receive broad cast messages with the help of Start Listening API.');
        dispExpectedResult('Test appliation starts listening to background intents and should alert the broadcast message received and also should trigger callback function of the send method which alerts test case passed.');
        _result.waitToRunTest();
        runs(function () {
            var data = {
                "myData":"This is broad cast data 3!"
            };
            var params;
            if (isAndroidPlatform()) {
                params = new parameters(Rho.Intent.BROADCAST,"","com.rhomobile.BROADCAST",["com.rhomobile.manual_common_spec"],"","","","",data);
            }
            if (isApplePlatform()) {
                params = new parameters(Rho.Intent.BROADCAST,"","","","testApp","","","",data);
            }
            if (isAnyWindowsFamilyPlatform()) {
                params = new parameters(Rho.Intent.BROADCAST,"","","","rhomobile manual_common_spec/manual_common_spec.exe","","","",data);
            }
            var receiveCB = function(intent){
            	alert(JSON.stringify(intent));
            };
            Rho.Intent.startListening(receiveCB);
            Rho.Intent.send(params);
        });
        _result.waitForResponse();
    });
    it('VT328_40 | Try to start listening to the background intents, when already started listenting.', function () {
        displayObjective('VT328_40 | Try to start listening to the background intents, when already started listenting.');
        dispTestCaseRunning('Try to start listening to the background intents, when already started listenting.');
        dispExpectedResult('No effect or no crash should be seen in the test application.');
        _result.waitToRunTest();
        runs(function () {
            var data = {
                "myData":"This is broad cast data 4!"
            };
            var params;
            if (isAndroidPlatform()) {
                params = new parameters(Rho.Intent.BROADCAST,"","com.rhomobile.BROADCAST",["com.rhomobile.manual_common_spec"],"","","","",data);
            }
            if (isApplePlatform()) {
                params = new parameters(Rho.Intent.BROADCAST,"","","","testApp","","","",data);
            }
            if (isAnyWindowsFamilyPlatform()) {
                params = new parameters(Rho.Intent.BROADCAST,"","","","rhomobile manual_common_spec/manual_common_spec.exe","","","",data);
            }
            var receiveCB = function(intent){
            	alert(JSON.stringify(intent));
            };
            Rho.Intent.startListening(receiveCB);
            Rho.Intent.startListening(receiveCB);
            Rho.Intent.send(params);
        });
        _result.waitForResponse();
    });
    it('VT328_41 | Stop Listening to the background intents', function () {
        displayObjective('VT328_41 | Stop Listening to the background intents');
        dispTestCaseRunning('Execute \'Stop Listening\' API.');
        dispExpectedResult('Test application should stop listening to background intents ie., (test application should not receive any broad cast messages).');
        _result.waitToRunTest();
        runs(function () {
            var data = {
                "myData":"This is broad cast data 5!"
            };
            var params;
            if (isAndroidPlatform()) {
                params = new parameters(Rho.Intent.BROADCAST,"","com.rhomobile.BROADCAST",["com.rhomobile.manual_common_spec"],"","","","",data);
            }
            if (isApplePlatform()) {
                params = new parameters(Rho.Intent.BROADCAST,"","","","testApp","","","",data);
            }
            if (isAnyWindowsFamilyPlatform()) {
                params = new parameters(Rho.Intent.BROADCAST,"","","","rhomobile manual_common_spec/manual_common_spec.exe","","","",data);
            }
            var receiveCB = function(intent){
                alert("Test Case failed if you see this alert message!");
            };
            Rho.Intent.startListening(receiveCB);
            Rho.Intent.stopListening();
            Rho.Intent.send(params);
        });
        _result.waitForResponse();
    });
    it('VT328_42 | Stop Listening to the background intents before executing startListenting method', function () {
        displayObjective('VT328_42 | Stop Listening to the background intents before executing startListenting method');
        dispTestCaseRunning('Performing multiple execution of \'Stop Listening\'.');
        dispExpectedResult('No effect or no crash should be seen in the test application.');
        _result.waitToRunTest();
        runs(function () {
            var mytestapp = 'com.rhomobile.manual_common_spec';
            var data = {
                "myData":"This is broad cast data !"
            };
            var params;
            if (isAndroidPlatform()) {
                params = new parameters(Rho.Intent.BROADCAST,"","com.rhomobile.BROADCAST",["com.rhomobile.manual_common_spec"],"","","","",data);
            }
            if (isApplePlatform()) {
                params = new parameters(Rho.Intent.BROADCAST,"","","","testApp","","","",data);
            }
            if (isAnyWindowsFamilyPlatform()) {
                params = new parameters(Rho.Intent.BROADCAST,"","","","rhomobile manual_common_spec/manual_common_spec.exe","","","",data);
            }
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
    if(isAndroidPlatform()){
        it('VT328_43 | Suggest different applications to send text message', function(){
            displayObjective('VT328_43 | Suggest different applications to send text message');
            dispTestCaseRunning('Sending Intent matches with multiple activities, should suggest for the application to launch!');
            dispExpectedResult('Application chooser should be shown to the user in performing the intent!');
            _result.waitToRunTest();
            runs(function(){
                var data = {"EXTRA_TEXT":"This is message to be sent!"};
                var params = new parameters(Rho.Intent.START_ACTIVITY,"","ACTION_SEND","","","","","text/plain",data);
                Rho.Intent.send(params);
            });
            _result.waitForResponse();
        });
        it('VT328_44 | Sending array of data with the intent', function(){
            displayObjective('VT328_44 | Sending array of data with the intent');
            dispTestCaseRunning('Sending Intent with multiple EXTRA\'s');
            dispExpectedResult('Email compose screen should be displayed with prefilled To, CC, BCC and Subject field !');
            _result.waitToRunTest();
            runs(function(){
                var data = 
                {"EXTRA_EMAIL":"test@domain.com",
                 "EXTRA_CC":"carbon.copy@domain.com",
                 "EXTRA_BCC":"bcc.email@domain.com",
                 "EXTRA_SUBJECT":"Email Subject !",
                 "EXTRA_TEXT":"Email body content !"};
                var params = new parameters(Rho.Intent.START_ACTIVITY,"","ACTION_SEND","","","","","text/plain",data);
                Rho.Intent.send(params);
            });
            _result.waitForResponse();
        });   
    }
    it('VT328_45 | Sending Intent with null in place of callback function', function(){
        displayObjective('VT328_45 | Sending Intent with null in place of callback function');
        dispTestCaseRunning('Sending intent with NULL value as a callback parameter');
        dispExpectedResult('No crash or any bad behavior should be seen in the test applciation.');
        _result.waitToRunTest();

        if (isAndroidPlatform()) {
            parameters = {intentType: Rho.Intent.START_ACTIVITY, appName:  "com.smap.targetapp"};
        }
        if (isApplePlatform()) {
            parameters = {intentType: Rho.Intent.START_ACTIVITY, appName: "testapp"};
        }
        if (isAnyWindowsFamilyPlatform()) {
            parameters = {intentType: Rho.Intent.START_ACTIVITY, appName: "rhomobile TestApp/TestApp.exe", data: {}};
        }
        runs(function(){
            Rho.Intent.send(parameters, null);
        });
        _result.waitForResponse();
    });
    if (!isApplePlatform()) {
    it('VT328_46 | Start Listening to the background intents using callback without argument', function () {
        displayObjective('VT328_46 | Start Listening to the background intents callback without argument');
        dispTestCaseRunning('Executing startListening method with callback function which does not have argument !');
        dispExpectedResult('No crash or bad behavior should be seen in the test application and an alert message should be shown to the user.');
        _result.waitToRunTest();
        runs(function () {
            var parameters;
            if (isAndroidPlatform()) {
                parameters = {intentType: Rho.Intent.BROADCAST, action: "com.rhomobile.BROADCAST", appName: "com.rhomobile.manual_common_spec", data: {myData: "This is broad cast data!" } };
            }
            if (isAnyWindowsFamilyPlatform()) {
                parameters = {intentType: Rho.Intent.BROADCAST, appName: "rhomobile manual_common_spec/manual_common_spec.exe", data: {myData: "This is broad cast data!" } };
            }
            var callback = function(){
                alert("Callback without arguments !");
            };
            Rho.Intent.startListening(callback);
            Rho.Intent.send(parameters);
        });
        _result.waitForResponse();
    });
    }
});
    
