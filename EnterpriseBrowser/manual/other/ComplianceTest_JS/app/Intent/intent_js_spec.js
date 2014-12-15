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
     beforeEach(function(){
        preConditions = [];
        document.getElementById('preCondition').innerHTML = "";
    });
    if(isAndroidPlatform()){
        it('VT328_01 | intentType - StartActivity: Launch target application by \'packageName\', which is installed but not running.', function () {
            displayObjective("VT328_01 | intentType - StartActivity: Launch target application by packageName, which is installed but not running");
            var preConditions = ["Ensure Target application installed in the device", "Ensure Target application is not running"];
            displayPrecondition(preConditions);
            dispTestCaseRunning('Sending Intent with parameters {"params":{"intentType":EB.Intent.START_ACTIVITY,"action":"ACTION_MAIN","appName":"com.smap.targetapp"}}');
            dispExpectedResult('The Target application should be launched successfully.');
            _result.waitToRunTest();
            runs(function () {
                var params = new parameters(EB.Intent.START_ACTIVITY, "", "ACTION_MAIN", "", "com.smap.targetapp", "", "", "", "");
                EB.Intent.send(params);
            });
            _result.waitForResponse();
        });
        it('VT328_06 | intentType - Start service of the target appliation.', function () {
            displayObjective("VT328_06 | intentType - Start service of the target appliation.");
            var preConditions = ["Ensure Target application installed in the device","Ensure Target application is running in background"];
            displayPrecondition(preConditions);
            dispTestCaseRunning('Sending Intent with parameters {"intentType":EB.Intent.START_SERVICE, "appName":"com.smap.targetapp", "targetClass":"com.smap.targetapp.MyFirstService"}');
            dispExpectedResult('Service of target applciation should be started successfully.');
            _result.waitToRunTest();
            runs(function () {
                var params = new parameters(EB.Intent.START_SERVICE,"","","","com.smap.targetapp","com.smap.targetapp.MyFirstService","","","");
                EB.Intent.send(params);
            });
            _result.waitForResponse();
        });
        it('VT328_09 | intentType - Broadcast data from test app and receive at target app.', function () {
            displayObjective("VT328_09 | intentType - Broadcast data from test app and receive at target app.");
            var preConditions = ["Ensure Target application installed in the device"];
            displayPrecondition(preConditions);
            dispTestCaseRunning('Sending Intent with parameters {"intentType":EB.Intent.BROADCAST, "action":"com.smap.targetapp.mySecondAction", "data":{"toast":"Target -Test case passed If you see this in Andorid Toast !"}}');
            dispExpectedResult('Broadcast should be successful and toast from testApp is displayed.');
            _result.waitToRunTest();
            runs(function () {
                var data = {
                    "toast":"Target - Test case passed if you see this in Android Toast !"
                };
                var params = new parameters(EB.Intent.BROADCAST,"","com.smap.targetapp.mySecondAction","","","","","",data);
                EB.Intent.send(params);
            });
            _result.waitForResponse();
        });
        it('VT328_13 | category - Launch browser from test application by setting category "CATEGORY_APP_BROWSER" and action "ACTION_MAIN"', function () {
            displayObjective('VT328_13 | category - Launch browser from test application by setting category "CATEGORY_APP_BROWSER" and action "ACTION_MAIN". Starting from android Android 4.0.3 (15) ICE_CREAM_SANDWICH_MR1');
            dispTestCaseRunning('Sending Intent with parameters {"params":{"intentType":EB.Intent.START_ACTIVITY,"action":"ACTION_MAIN","categories":["CATEGORY_APP_BROWSER"]}}');
            dispExpectedResult('Browser should be launched successfully.');
            _result.waitToRunTest();
            runs(function () {
                var category = ["CATEGORY_APP_BROWSER"];
                var params = new parameters(EB.Intent.START_ACTIVITY,"","ACTION_MAIN",category,"","","","","");
                EB.Intent.send(params);
            });
            _result.waitForResponse();
        });
        it('VT328_22 | mimeType - Launch Message application from test app by setting mimeType "vnd.android-dir/mms-sms" and data', function () {
            displayObjective('VT328_22 | mimeType - Launch Message application from test app by setting mimeType "vnd.android-dir/mms-sms" and data');
            dispTestCaseRunning('Sending Intent with parameters {"intentType":EB.Intent.START_ACTIVITY,"action":"ACTION_SEND","mimeType":"vnd.android-dir/mms-sms",{"sms_body":"Test case passed if you see this text in Green color with browser."}}}');
            dispExpectedResult('Messaging app launched successfully and message body should contain "Test case passed if you see this in Message body"');
            _result.waitToRunTest();
            runs(function () {
                var data = {"sms_body":"Test case passed if you see this in Message body."};
                var params = new parameters(EB.Intent.START_ACTIVITY,"","ACTION_VIEW","","","","","vnd.android-dir/mms-sms",data);
                EB.Intent.send(params);
            });
            _result.waitForResponse();
        });
    }
    if(isAnyWindowsFamilyPlatform()){
        it('VT328_26 | appName - Launch any other Application by setting \'appName\' in intent params, from test application.', function () {
            displayObjective('VT328_25 | appName - Launch any other Application by setting \'appName\' in intent params, from test application.');
            dispTestCaseRunning('Sending Intent with parameters {"intentType":EB.Intent.START_ACTIVITY,"action":"","categories":"","appName":"rhomobile TestApp/TestApp.exe"}');
            dispExpectedResult('Application should be launched from test application successfully');
            _result.waitToRunTest();
            runs(function () {
                var parameters = {intentType: EB.Intent.START_ACTIVITY, appName: "rhomobile TestApp/TestApp.exe", data: {}};
                EB.Intent.send(parameters);
            });
            _result.waitForResponse();
        });
    }

    if(isAndroidPlatform()){
        it('VT328_27 | appName - Launch Android application via \'appName\' (packageName) from test application.', function () {
            displayObjective('VT328_26 | appName - Launch Android application via \'appName\' (packageName) from test application.');
            dispTestCaseRunning('Sending Intent with parameters {"intentType":EB.Intent.START_ACTIVITY,"appName":"com.smap.targetapp"}');
            dispExpectedResult('Android application should launched whose package name matches.');
            _result.waitToRunTest();
            runs(function () {
                var params = new parameters(EB.Intent.START_ACTIVITY,"","","","com.smap.targetapp","","","","");
                EB.Intent.send(params);
            });
            _result.waitForResponse();
        });
    }
    if(isApplePlatform()){
        it('VT328_28 | appName - Launch iOS application via \'appName\' (BundleURLScheme) from test application.', function () {
            displayObjective('VT328_28 | appName - Launch iOS application via \'testapp\' (BundleURLScheme) from test application.');
            dispTestCaseRunning('Sending Intent with parameters {"intentType":EB.Intent.START_ACTIVITY,"testapp":"testapp"}');
            dispExpectedResult('iOS application should be launched whose bundleUrlScheme matches.');
            _result.waitToRunTest();
            runs(function () {
                var params = new parameters(EB.Intent.START_ACTIVITY,"","","","testapp","","","","");
                EB.Intent.send(params);
            });
            _result.waitForResponse();
        });
        it('VT328_29 | uri - Launch URL via browser appliation from test app by setting URI "http://www.google.com"', function () {
            displayObjective('VT328_29 | uri - Launch URL via browser appliation from test app by setting URI "http://www.google.com"');
            dispTestCaseRunning('Sending Intent with parameters {"params":{"intentType":EB.Intent.START_ACTIVITY,"action":"ACTION_VIEW","categories":"","appName":"","targetClass":"","uri":"http://www.google.com","mimeType":"","data":""}}');
            dispExpectedResult('Browser should be launched with default data in the view.');
            _result.waitToRunTest();
            runs(function () {
                var params = new parameters(EB.Intent.START_ACTIVITY,"","ACTION_VIEW","","","","http://www.google.com","","");
                EB.Intent.send(params);
            });
            _result.waitForResponse();
        });
        it('VT328_32 | uri - Launch dialler with pre-filled number from test application by setting URI "tel:9611896991" and with Action: ACTION_DIAL', function () {
            displayObjective('VT328_32 | uri - Launch dialler with pre-filled number from test application by setting URI "tel:9611896991" and with Action: ACTION_DIAL');
            dispTestCaseRunning('Sending Intent with parameters {"intentType":EB.Intent.START_ACTIVITY,"action":"ACTION_DIAL","uri":"tel:9611896991"}');
            dispExpectedResult('Dialer launches with pre-loaded number in it.');
            _result.waitToRunTest();
            runs(function () {
                 var params = new parameters(EB.Intent.START_ACTIVITY,"","ACTION_DIAL","","","","tel:9611896991","","");
                 EB.Intent.send(params);
                 });
            _result.waitForResponse();
        });
    }
    if(isAndroidPlatform()){
        it('VT328_38 | Callback : Send an Intent and the same intent details should be seen in the callback.', function () {
            displayObjective('VT328_38 | Callback : Send an Intent and the same intent details should be seen in the callback.');
            var preConditions = ["Ensure Target application is installed in the device"];
            displayPrecondition(preConditions);
            dispTestCaseRunning('Sending intent with callback should handle the returned intent in the callback fuction. The parameters below should match with call back handled intent parameters. <br/> {"params":{"intentType":EB.Intent.START_ACTIVITY,"action":"ACTION_MAIN","categories":"","appName":"com.smap.targetapp","targetClass":"","uri":"","mimeType":"","data":{"myData":"This is Test data !"}}}');
            dispExpectedResult('The intent param sent from test application should be returned back to the callback handler. Test case passed only if an alert message should be shown with result: Passed!');
            _result.waitToRunTest();
            runs(function () {
                var data = {
                    "myData":"This is Test data !"
                };
                var params = new parameters(EB.Intent.START_ACTIVITY,"","ACTION_MAIN","","com.smap.targetapp","","","",data);
                var successCB = function(intent){
                    console.log(JSON.stringify(intent))
                    if(intent.data.myData == "This is Test data !"){
                        alert("Test Passed !");
                    }else{
                        alert("Test Failed !");
                    }
                };
                EB.Intent.send(params, successCB);
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
                params = new parameters(EB.Intent.BROADCAST,"","com.symbol.BROADCAST","","com.symbol.enterprisebrowser","","","",data);
            }
            if (isApplePlatform()) {
                params = new parameters(EB.Intent.BROADCAST,"","","","compliancetestjs","","","",data);
            }
            if (isAnyWindowsFamilyPlatform()) {
                params = new parameters(EB.Intent.BROADCAST,"","","","Symbol EnterpriseBrowser compliancetest_js/Menu.exe","","","",data);
            }
            var receiveCB = function(intent){
            	alert(JSON.stringify(intent));
            };
            EB.Intent.startListening(receiveCB);
            EB.Intent.send(params);
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
                params = new parameters(EB.Intent.BROADCAST,"","com.symbol.BROADCAST","","com.symbol.enterprisebrowser","","","",data);
            }
            if (isApplePlatform()) {
                params = new parameters(EB.Intent.BROADCAST,"","","","compliancetestjs","","","",data);
            }
            if (isAnyWindowsFamilyPlatform()) {
                params = new parameters(EB.Intent.BROADCAST,"","","","rhomobile compliancetest_js/compliancetest_js.exe","","","",data);
            }
            var receiveCB = function(intent){
                alert("Test Case failed if you see this alert message!");
            };
            EB.Intent.startListening(receiveCB);
            EB.Intent.stopListening();
            EB.Intent.send(params);
        });
        _result.waitForResponse();
    });
    if(isAndroidPlatform()){
        it('Sending array of data with the intent', function(){
            displayObjective('VT328_44 | Sending array of data with the intent');
            dispTestCaseRunning('Sending Intent with multiple EXTRA\'s');
            dispExpectedResult('Email compose screen should be displayed with prefilled To, CC, BCC and Subject field !');
            _result.waitToRunTest();
            runs(function(){
                var data =
                {"EXTRA_EMAIL":["test@domain.com"],
                 "EXTRA_CC":["carbon.copy@domain.com"],
                 "EXTRA_BCC":["bcc.email@domain.com"],
                 "EXTRA_SUBJECT":"Email Subject !",
                 "EXTRA_TEXT":"Email body content !"};
                var params = new parameters(EB.Intent.START_ACTIVITY,"","ACTION_SEND","","","","","text/plain",data);
                EB.Intent.send(params);
            });
            _result.waitForResponse();
        });
    }
});
    
