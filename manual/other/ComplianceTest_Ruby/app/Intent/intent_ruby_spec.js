describe('Intent_UseCases Functionality Test', function () {
    beforeEach(function(){
        preConditions = [];
        document.getElementById('preCondition').innerHTML = "";
    });

    // NOTE: some test cases x ed because they are not needed for compliance tests
    

    if(isAndroidPlatform()){
        it('VT328_01 | intentType - StartActivity: Launch target application by \'packageName\', which is installed but not running.', function () {
            displayObjective("VT328_01 | intentType - StartActivity: Launch target application by packageName, which is installed but not running");
            var preConditions = ["Ensure Target application installed in the device", "Ensure Target application is not running"];
            displayPrecondition(preConditions);
            dispTestCaseRunning('Sending Intent with parameters {"params":{"intentType":Rho.Intent.START_ACTIVITY,"action":"ACTION_MAIN","appName":"com.smap.targetapp"}}');
            dispExpectedResult('The Target application should be launched successfully.');
            _result.waitToRunTest();
            runs(function () {
                Ruby.call('Intent','intent_send?par='+1);
            });
            _result.waitForResponse();
        });
        xit('VT328_03 | intentType - StartActivity: Launch target application by \'className\',which is installed but not running.', function () {
            displayObjective("VT328_03 | intentType - StartActivity: Launch target application by \'className\',which is installed but not running.");
            var preConditions = ["Ensure Target application installed in the device"];
            displayPrecondition(preConditions);
            dispTestCaseRunning('Sending Intent with parameters {"params":{"intentType":Rho.Intent.START_ACTIVITY,"action":"ACTION_MAIN","appName":"com.smap.targetapp","targetClass":"com.smap.targetapp.MainActivity"}}');
            dispExpectedResult('The Target application should be launched successfully.');
            _result.waitToRunTest();
            runs(function () {
                Ruby.call('Intent','intent_send?par='+3);
            });
            _result.waitForResponse();
        });
        xit('VT328_05 | intentType - Start service of the test appliation.', function () {
            displayObjective("VT328_05 | intentType - Start service of the test appliation.");
            dispTestCaseRunning('Sending Intent with parameters {"intentType":Rho.Intent.START_SERVICE,"appName":"com.rhomobile.manual_common_spec","targetClass":"com.rhomobile.rhodes.RhodesService", "data":{"message":"Mesage to service"}}');
            dispExpectedResult('Service of test application should be started and toast from service is shown.');
            _result.waitToRunTest();
            runs(function () {
                Ruby.call('Intent','intent_listen_send?par='+5)
            });
            _result.waitForResponse();
        });
        it('VT328_06 | intentType - Start service of the target appliation.', function () {
            displayObjective("VT328_06 | intentType - Start service of the target appliation.");
            var preConditions = ["Ensure Target application installed in the device","Ensure Target application is running in background"];
            displayPrecondition(preConditions);
            dispTestCaseRunning('Sending Intent with parameters {"intentType":Rho.Intent.START_SERVICE, "appName":"com.smap.targetapp", "targetClass":"com.smap.targetapp.MyFirstService"}');
            dispExpectedResult('Service of target applciation should be started successfully.');
            _result.waitToRunTest();
            runs(function () {
                Ruby.call('Intent','intent_send?par='+6);
            });
            _result.waitForResponse();
        });
        xit('VT328_08 | intentType - Start service of the target applciation in which the service is already instantiated', function () {
            displayObjective("VT328_08 | intentType - Start service of the target applciation in which the service is already instantiated");
            var preConditions = ["Ensure Target application installed in the device"];
            displayPrecondition(preConditions);
            dispTestCaseRunning('Sending Intent two times with parameters {"intentType":Rho.Intent.START_SERVICE, "appName":"com.smap.targetapp", "targetClass":"com.smap.targetapp.MyFirstService"}');
            dispExpectedResult('No crash should be seen in the test application or target appliation, since the service is already instantiated');
            _result.waitToRunTest();
            runs(function () {
                Ruby.call('Intent','intent_send?par='+8);
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
                Ruby.call('Intent','intent_send?par='+9);
            });
            _result.waitForResponse();
        });
        xit('VT328_11 | intentType - Broadcast data from test app and receive back at test app.', function () {
            displayObjective("VT328_11 | intentType - Broadcast data from test app and receive at test app.");
            dispTestCaseRunning('Sending Intent with parameters {"intentType":Rho.Intent.BROADCAST, "action":"com.smap.targetapp.mySecondAction", "data":{"reply":"This is my broadcast data!"}}');
            dispExpectedResult('Broadcast and reply to RhodesService would be successful and alert from test app callback is displayed.');
            _result.waitToRunTest();
            runs(function () {
                Ruby.call('Intent','intent_listen_send?par='+11);
            });
            _result.waitForResponse();
        });
        xit('VT328_12 | intentType - Broadcast data from test app and receive at target app, when target app is not running.', function () {
            displayObjective("VT328_12 | intentType - Broadcast data from test app and receive at target app, when target app is not running.");
            var preConditions = ["Ensure Target application installed but not running in the device"];
            displayPrecondition(preConditions);
            dispTestCaseRunning('Sending Intent with parameters {"intentType":Rho.Intent.BROADCAST, "appName":"com.smap.targetapp", "data":{"toast":"Target: Test case passed If you see this in Andorid Toast !"}}');
            dispExpectedResult('Broadcast should be successful.');
            _result.waitToRunTest();
            runs(function () {
                Ruby.call('Intent','intent_send?par='+12);
            });
            _result.waitForResponse();
        });
        it('VT328_13 | category - Launch browser from test application by setting category "CATEGORY_APP_BROWSER" and action "ACTION_MAIN"', function () {
            displayObjective('VT328_13 | category - Launch browser from test application by setting category "CATEGORY_APP_BROWSER" and action "ACTION_MAIN". Starting from android Android 4.0.3 (15) ICE_CREAM_SANDWICH_MR1');
            dispTestCaseRunning('Sending Intent with parameters {"params":{"intentType":Rho.Intent.START_ACTIVITY,"action":"ACTION_MAIN","categories":["CATEGORY_APP_BROWSER"]}}');
            dispExpectedResult('Browser should be launched successfully.');
            _result.waitToRunTest();
            runs(function () {
                var category = ["CATEGORY_APP_BROWSER"];
                Ruby.call('Intent','intent_send?cat='+category);
            });
            _result.waitForResponse();
        });
        xit('VT328_14 | category - Launch Music Player from test application by setting category "CATEGORY_APP_MUSIC"  and action "ACTION_MAIN"', function () {
            displayObjective('VT328_14 | category - Launch Music Player from test application by setting category "CATEGORY_APP_MUSIC"  and action "ACTION_MAIN". Starting from android Android 4.0.3 (15) ICE_CREAM_SANDWICH_MR1');
            dispTestCaseRunning('Sending Intent with parameters {"intentType":Rho.Intent.START_ACTIVITY,"action":"ACTION_MAIN","categories":["CATEGORY_APP_MUSIC"]}');
            dispExpectedResult('Launch Music Player from test application by setting category "CATEGORY_APP_MUSIC"  and action "ACTION_MAIN"');
            _result.waitToRunTest();
            runs(function () {
                var category = ["CATEGORY_APP_MUSIC"];
                Ruby.call('Intent','intent_send?cat='+category);
            });
            _result.waitForResponse();
        });
        xit('VT328_15 | category - Launch Calculator from test applciation by setting category "CATEGORY_APP_CALCULATOR"  and action "ACTION_MAIN"', function () {
            displayObjective('VT328_15 | category - Launch Calculator from test applciation by setting category "CATEGORY_APP_CALCULATOR"  and action "ACTION_MAIN". Starting from android Android 4.0.3 (15) ICE_CREAM_SANDWICH_MR1');
            dispTestCaseRunning('Sending Intent with parameters {"intentType":Rho.Intent.START_ACTIVITY,"action":"ACTION_MAIN","categories":["CATEGORY_APP_CALCULATOR"]}');
            dispExpectedResult('Calculator should be launched successfully.');
            _result.waitToRunTest();
            runs(function () {
                var category = ["CATEGORY_APP_CALCULATOR"];
                Ruby.call('Intent','intent_send?cat='+category);
            });
            _result.waitForResponse();
        });
        xit('VT328_16 | category - Launch Calendar from test application by setting category "CATEGORY_APP_CALENDAR" and action "ACTION_MAIN"', function () {
            displayObjective('VT328_16 | category - Launch Calendar from test application by setting category "CATEGORY_APP_CALENDAR" and action "ACTION_MAIN". Starting from android Android 4.0.3 (15) ICE_CREAM_SANDWICH_MR1');
            dispTestCaseRunning('Sending Intent with parameters {"intentType":Rho.Intent.START_ACTIVITY,"action":"ACTION_MAIN","categories":["CATEGORY_APP_CALENDAR"]}');
            dispExpectedResult('Calendar should be launched successfully.');
            _result.waitToRunTest();
            runs(function () {
                var category = ["CATEGORY_APP_CALENDAR"];
                Ruby.call('Intent','intent_send?cat='+category);
            });
            _result.waitForResponse();
        });
        xit('VT328_17 | category - Launch contacts from test application by setting category "CATEGORY_APP_CONTACTS" and action "ACTION_MAIN"', function () {
            displayObjective('VT328_17 | category - Launch contacts from test application by setting category "CATEGORY_APP_CONTACTS" and action "ACTION_MAIN". Starting from android Android 4.0.3 (15) ICE_CREAM_SANDWICH_MR1');
            dispTestCaseRunning('Sending Intent with parameters {"intentType":Rho.Intent.START_ACTIVITY,"action":"ACTION_MAIN","categories":["CATEGORY_APP_CONTACTS"]}');
            dispExpectedResult('Contacts applciation should be launched successfully.');
            _result.waitToRunTest();
            runs(function () {
                var category = ["CATEGORY_APP_CONTACTS"];
                Ruby.call('Intent','intent_send?cat='+category);
            });
            _result.waitForResponse();
        });
        xit('VT328_18 | category - Launch Email application from test application by setting category "CATEGORY_APP_EMAIL" and action "ACTION_MAIN"', function () {
            displayObjective('VT328_18 | category - Launch Email application from test application by setting category "CATEGORY_APP_EMAIL" and action "ACTION_MAIN". Starting from android Android 4.0.3 (15) ICE_CREAM_SANDWICH_MR1');
            dispTestCaseRunning('Sending Intent with parameters {"intentType":Rho.Intent.START_ACTIVITY,"action":"ACTION_MAIN","categories":["CATEGORY_APP_EMAIL"]}');
            dispExpectedResult('Email application should be launched successfully.');
            _result.waitToRunTest();
            runs(function () {
                var category = ["CATEGORY_APP_EMAIL"];
                Ruby.call('Intent','intent_send?cat='+category);
            });
            _result.waitForResponse();
        });
        xit('VT328_19 | category - Launch Gallery application from test app by setting category "CATEGORY_APP_GALLERY" and action "ACTION_MAIN"', function () {
            displayObjective('VT328_19 | category - Launch Gallery application from test app by setting category "CATEGORY_APP_GALLERY" and action "ACTION_MAIN". Starting from android Android 4.0.3 (15) ICE_CREAM_SANDWICH_MR1');
            dispTestCaseRunning('Sending Intent with parameters {"intentType":Rho.Intent.START_ACTIVITY,"action":"ACTION_MAIN","categories":["CATEGORY_APP_GALLERY"]}');
            dispExpectedResult('Gallery launched successfully');
            _result.waitToRunTest();
            runs(function () {
                var category = ["CATEGORY_APP_GALLERY"];
                Ruby.call('Intent','intent_send?cat='+category);
            });
            _result.waitForResponse();
        });
        xit('VT328_21 | category - Launch Message application from test app by setting category "CATEGORY_APP_MESSAGING" and action "ACTION_MAIN"', function () {
            displayObjective('VT328_21 | category - Launch Message application from test app by setting category "CATEGORY_APP_MESSAGING" and action "ACTION_MAIN". Starting from android Android 4.0.3 (15) ICE_CREAM_SANDWICH_MR1');
            dispTestCaseRunning('Sending Intent with parameters {"intentType":Rho.Intent.START_ACTIVITY,"action":"ACTION_MAIN","categories":["CATEGORY_APP_MESSAGING"]}');
            dispExpectedResult('Messaging app launched successfully.');
            _result.waitToRunTest();
            runs(function () {
                var category = ["CATEGORY_APP_MESSAGING"];
                Ruby.call('Intent','intent_send?cat='+category);
            });
            _result.waitForResponse();
        });
        it('VT328_22 | mimeType - Launch Message application from test app by setting mimeType "vnd.android-dir/mms-sms" and data', function () {
            displayObjective('VT328_22 | mimeType - Launch Message application from test app by setting mimeType "vnd.android-dir/mms-sms" and data');
            dispTestCaseRunning('Sending Intent with parameters {"intentType":Rho.Intent.START_ACTIVITY,"action":"ACTION_SEND","mimeType":"vnd.android-dir/mms-sms",{"sms_body":"Test case passed if you see this text in Green color with browser."}}}');
            dispExpectedResult('Messaging app launched successfully and message body should contain "Test case passed if you see this in Message body"');
            _result.waitToRunTest();
            runs(function () {
                Ruby.call('Intent','intent_send?par='+22);
            });
            _result.waitForResponse();
        });
    }
    if(isAnyWindowsFamilyPlatform()){
        it('VT328_26 | appName - Launch any other Application by setting \'appName\' in intent params, from test application.', function () {
            displayObjective('VT328_25 | appName - Launch any other Application by setting \'appName\' in intent params, from test application.');
            dispTestCaseRunning('Sending Intent with parameters {"intentType":Rho.Intent.START_ACTIVITY,"action":"","categories":"","appName":"rhomobile TestApp/TestApp.exe"}');
            dispExpectedResult('Application should be launched from test application successfully');
            _result.waitToRunTest();
            runs(function () {
                Ruby.call('Intent','intent_send?par='+26);
            });
            _result.waitForResponse();
        });
    }

    if(isAndroidPlatform()){
        it('VT328_27 | appName - Launch Android application via \'appName\' (packageName) from test application.', function () {
            displayObjective('VT328_26 | appName - Launch Android application via \'appName\' (packageName) from test application.');
            dispTestCaseRunning('Sending Intent with parameters {"intentType":Rho.Intent.START_ACTIVITY,"appName":"com.smap.targetapp"}');
            dispExpectedResult('Android application should launched whose package name matches.');
            _result.waitToRunTest();
            runs(function () {
                Ruby.call('Intent','intent_send?par='+27);
            });
            _result.waitForResponse();
        });
    }
    if(isApplePlatform()){
        it('VT328_28 | appName - Launch iOS application via \'appName\' (BundleURLScheme) from test application.', function () {
            displayObjective('VT328_27 | appName - Launch iOS application via \'testapp\' (BundleURLScheme) from test application.');
            dispTestCaseRunning('Sending Intent with parameters {"intentType":Rho.Intent.START_ACTIVITY,"testapp":"testapp"}');
            dispExpectedResult('iOS application should be launched whose bundleUrlScheme matches.');
            _result.waitToRunTest();
            runs(function () {
                Ruby.call('Intent','intent_send?par='+28);
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
            Ruby.call('Intent','intent_send?par='+29);
        });
        _result.waitForResponse();
    });
    it('VT328_30 | uri - Launch Message application with data from test app by setting URI "sms:9611896991"', function () {
        displayObjective('VT328_29 | uri - Launch Message application with data from test app by setting URI "sms:9611896991"');
        dispTestCaseRunning('Sending Intent with parameters {"intentType":Rho.Intent.START_ACTIVITY,"uri":"sms:9611896991"}');
        dispExpectedResult('Message compose application should be launched with pre-filled recepient number.');
        _result.waitToRunTest();
        runs(function () {
            Ruby.call('Intent','intent_send?par='+30);
        });
        _result.waitForResponse();
        });
    xit('VT328_31 | uri - Launch Email appliation with data from test app by setting URI "mailto:abcd@domain.com"', function () {
        displayObjective('VT328_30 | uri - Launch Email appliation with data from test app by setting URI "mailto:abcd@domain.com"');
        var preConditions = ["Ensure default mail box is configured in the device"];
        displayPrecondition(preConditions);
        dispTestCaseRunning('Sending Intent with parameters Sending Intent with parameters {"intentType":Rho.Intent.START_ACTIVITY,"uri":"mailto:abcd@domain.com"}');
        dispExpectedResult('Email compose view should be launched with pre-filled recepient email address.');
        _result.waitToRunTest();
        runs(function () {
            if (isAndroidPlatform()) {
                Ruby.call('Intent','intent_send?par='+311);
            } else {
                Ruby.call('Intent','intent_send?par='+312);
            }
        });
        _result.waitForResponse();
    });
    it('VT328_32 | uri - Launch dialler with pre-filled number from test application by setting URI "tel:9611896991" and with Action: ACTION_DIAL', function () {
        displayObjective('VT328_31 | uri - Launch dialler with pre-filled number from test application by setting URI "tel:9611896991" and with Action: ACTION_DIAL');
        dispTestCaseRunning('Sending Intent with parameters {"intentType":Rho.Intent.START_ACTIVITY,"action":"ACTION_DIAL","uri":"tel:9611896991"}');
        dispExpectedResult('Dialer launches with pre-loaded number in it.');
        _result.waitToRunTest();
        runs(function () {
            Ruby.call('Intent','intent_send?par='+32);
        });
        _result.waitForResponse();
    });
    }
    if (!isApplePlatform()) {
        xit('VT328_30 | uri - Launch Message application with data from test app by setting URI "sms:9611896991"', function () {
            displayObjective('VT328_30 | uri - Launch Message application with data from test app by setting URI "sms:9611896991"');
            dispTestCaseRunning('Sending Intent with parameters {"intentType":Rho.Intent.START_ACTIVITY,"uri":"sms:9611896991"}');
            dispExpectedResult('Message compose application should be launched with pre-filled recepient number.');
            _result.waitToRunTest();
            runs(function () {
            	if (isAndroidPlatform()) {
                    Ruby.call('Intent','intent_send?par='+301);
                }
                if (isAnyWindowsFamilyPlatform()) {
                    Ruby.call('Intent','intent_send?par='+302);
                }
            });
            _result.waitForResponse();
        });
        xit('VT328_31 | uri - Launch Email appliation with data from test app by setting URI "mailto:abcd@domain.com"', function () {
            displayObjective('VT328_31 | uri - Launch Email appliation with data from test app by setting URI "mailto:abcd@domain.com"');
            var preConditions = ["Ensure default mail box is configured in the device"];
            displayPrecondition(preConditions);
            dispTestCaseRunning('Sending Intent with parameters Sending Intent with parameters {"intentType":Rho.Intent.START_ACTIVITY,"uri":"mailto:abcd@domain.com"}');
            dispExpectedResult('Email compose view should be launched with pre-filled recepient email address.');
            _result.waitToRunTest();
            runs(function () {
            	if (isAndroidPlatform()) {
                    Ruby.call('Intent','intent_send?par='+311);
                }
                if (isAnyWindowsFamilyPlatform()) {
                    Ruby.call('Intent','intent_send?par='+312);
                }
            });
            _result.waitForResponse();
        });
        xit('VT328_32 | uri - Launch dialler with pre-filled number from test application by setting URI "tel:9611896991" and with Action: ACTION_DIAL', function () {
            displayObjective('VT328_32 | uri - Launch dialler with pre-filled number from test application by setting URI "tel:9611896991" and with Action: ACTION_DIAL');
            dispTestCaseRunning('Sending Intent with parameters {"intentType":Rho.Intent.START_ACTIVITY,"action":"ACTION_DIAL","uri":"tel:9611896991"}');
            dispExpectedResult('Dialer launches with pre-loaded number in it.');
            _result.waitToRunTest();
            runs(function () {
                Ruby.call('Intent','intent_send?par='+32);
            });
            _result.waitForResponse();
        });

        xit('VT328_34 | uri - Make a call from test application by setting URI "tel:9611896991" and Action : "ACTION_CALL"', function () {
            displayObjective('VT328_33 | uri - Make a call from test application by setting URI "tel:9611896991" and Action : "ACTION_CALL"');
            dispTestCaseRunning('Sending Intent with parameters {"intentType":Rho.Intent.START_ACTIVITY,"action":"ACTION_CALL","uri":"tel:9611896991"}');
            dispExpectedResult('Phone call made to the pre-loaded number.');
            _result.waitToRunTest();
            runs(function () {
                Ruby.call('Intent','intent_send?par='+34);
            });
            _result.waitForResponse();
        });
    }
    if(isAndroidPlatform()){
        xit('VT328_35 | uri - Launch Contacts from test application via Uri "content://contacts/people/" and Action: ACTION_VIEW', function () {
            displayObjective('VT328_34 | uri - Launch Contacts from test application via Uri "content://contacts/people/" and Action: ACTION_VIEW');
            var preConditions = ["Ensure atleast one contact is present in the device"];
            displayPrecondition(preConditions);
            dispTestCaseRunning('Sending Intent with parameters {"intentType":Rho.Intent.START_ACTIVITY,"action":"ACTION_VIEW",,"uri":"content://contacts/people/"}');
            dispExpectedResult('Contacts application is launched successfully');
            _result.waitToRunTest();
            runs(function () {
                Ruby.call('Intent','intent_send?par='+35);
            });
            _result.waitForResponse();
        });
    }
    if(!isApplePlatform()) {
        xit('VT328_37 | uri - Launch Email compose screen with pre-filled email from test application by setting URI and data.', function () {
            displayObjective('VT328_37 | uri - Launch Email compose screen with pre-filled email from test application by setting URI and data.');
            var preConditions = ["Ensure default mailbox is configured in the device"];
            displayPrecondition(preConditions);
            dispTestCaseRunning('Sending Intent with parameters {"intentType":Rho.Intent.START_ACTIVITY,"uri":"mailto:abcd@domain.com","data":{"body":"This is test email body"}}');
            dispExpectedResult('Email compose screen should be launched successfully with pre-filled data in it.');
            _result.waitToRunTest();
            runs(function () {
                 Ruby.call('Intent','intent_send?par='+37);
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
                Ruby.call('Intent','intent_send_callback?par='+38);
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
            if (isAndroidPlatform()) {
                Ruby.call('Intent','intent_listen_send?par='+391);
            }
            if (isApplePlatform()) {
                Ruby.call('Intent','intent_listen_send?par='+392);
            }
            if (isAnyWindowsFamilyPlatform()) {
                Ruby.call('Intent','intent_listen_send?par='+393);
            }
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
                Ruby.call('Intent','intent_listen_stop?par='+411);
            }
            if (isApplePlatform()) {
                Ruby.call('Intent','intent_listen_stop?par='+412);
            }
            if (isAnyWindowsFamilyPlatform()) {
                Ruby.call('Intent','intent_listen_stop?par='+413);
            }
        });
        _result.waitForResponse();
    });

    
    if(isAndroidPlatform()){
        it('VT328_44 | Sending array of data with the intent', function(){
            displayObjective('VT328_44 | Sending array of data with the intent');
            dispTestCaseRunning('Sending Intent with multiple EXTRA\'s');
            dispExpectedResult('Email compose screen should be displayed with prefilled To, CC, BCC and Subject field !');
            _result.waitToRunTest();
            runs(function(){
                Ruby.call('Intent','intent_send?par='+441);
            });
            _result.waitForResponse();
        });
        it('Send intent to view pdf from package', function(){
            displayObjective('Send intent to view pdf from package (Use Adobe Reader app only!)');
            dispTestCaseRunning('Sending intent with URI to internal pdf file');
            dispExpectedResult('Adobe Reader app should be opened with pdf content');
            _result.waitToRunTest();
            runs(function(){
                Ruby.call('Intent','intent_send?par='+442);
            });
            _result.waitForResponse();
        });
    }
    if (!isApplePlatform()) {
    xit('VT328_46 | Start Listening to the background intents using callback without argument', function () {
        displayObjective('VT328_46 | Start Listening to the background intents callback without argument');
        dispTestCaseRunning('Executing startListening method with callback function which does not have argument !');
        dispExpectedResult('No crash or bad behavior should be seen in the test application and an alert message should be shown to the user.');
        _result.waitToRunTest();
        runs(function () {
            if (isAndroidPlatform()) {
                Ruby.call('Intent','intent_listen_send?par='+461);
            }
            if (isAnyWindowsFamilyPlatform()) {
                Ruby.call('Intent','intent_listen_send?par='+462);
            }
        });
        _result.waitForResponse();
    });
    }
});
    
