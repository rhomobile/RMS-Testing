*** Settings ***
Library    appiumTests_EB.py

*** Test Cases ***
STTL-116701 Intent
    [Documentation]    Change Start page
    startIntentModuleTests    STTL-116701

STTL-116702 Intent
    [Documentation]    intentType - StartActivity: Launch target application by 'packageName', which is installed but not running.
    startIntentModuleTests    STTL-116702

STTL-116703 Intent
    [Documentation]    category - Launch browser from test application by setting category "CATEGORY_APP_BROWSER" and action "ACTION_MAIN"
    startIntentModuleTests    STTL-116703

STTL-116704 Intent
    [Documentation]    mimeType - Launch Message application from test app by setting mimeType "vnd.android-dir/mms-sms" and Data to "<Some HTML text>"
    startIntentModuleTests    STTL-116704

STTL-116705 Intent
    [Documentation]    appName - Launch Android application via 'appName' (packageName) from test application.
    startIntentModuleTests    STTL-116705

STTL-116706 Intent
    [Documentation]    Callback : Send an Intent and the same intent details should be seen in the callback.
    startIntentModuleTests    STTL-116706

STTL-116707 Intent
    [Documentation]    Start Listening to the background intents - broadcast messages (receiving broadcast messages)
    startIntentModuleTests    STTL-116707

STTL-116708 Intent
    [Documentation]    Stop Listening to the background intents
    startIntentModuleTests    STTL-116708

STTL-116709 Intent
    [Documentation]    Sending array of data with the intent
    startIntentModuleTests    STTL-116709

STTL-116710 Intent
    [Documentation]    intentType - StartActivity: Launch target application by \'packageName\', which is running in background
    startIntentModuleTests    STTL-116710

STTL-116711 Intent
    [Documentation]    intentType - StartActivity: Launch target application by \'className\',which is installed but not running
    startIntentModuleTests    STTL-116711

STTL-116712 Intent
    [Documentation]    intentType - StartActivity: Launch target application by \'className\', which is running in background
    startIntentModuleTests    STTL-116712

STTL-116713 Intent
    [Documentation]    intentType - Start service of the test appliation
    startIntentModuleTests    STTL-116713

STTL-116714 Intent
    [Documentation]    intentType - Broadcast data from test app and receive back at test app
    startIntentModuleTests    STTL-116714

STTL-116715 Intent
    [Documentation]    category - Launch Music Player from test application by setting category "CATEGORY_APP_MUSIC"  and action "ACTION_MAIN"
    startIntentModuleTests    STTL-116715

STTL-116716 Intent
    [Documentation]    category - Launch Calculator from test applciation by setting category "CATEGORY_APP_CALCULATOR"  and action "ACTION_MAIN"
    startIntentModuleTests    STTL-116716

STTL-116717 Intent
    [Documentation]    category - Launch Calendar from test application by setting category "CATEGORY_APP_CALENDAR" and action "ACTION_MAIN"
    startIntentModuleTests    STTL-116717

STTL-116718 Intent
    [Documentation]    category - Launch contacts from test application by setting category "CATEGORY_APP_CONTACTS" and action "ACTION_MAIN"
    startIntentModuleTests    STTL-116718

STTL-116719 Intent
    [Documentation]    category - Launch Email application from test application by setting category "CATEGORY_APP_EMAIL" and action "ACTION_MAIN"
    startIntentModuleTests    STTL-116719

STTL-116720 Intent
    [Documentation]    category - Launch Gallery application from test app by setting category "CATEGORY_APP_GALLERY" and action "ACTION_MAIN"
    startIntentModuleTests    STTL-116720

STTL-116721 Intent
    [Documentation]    uri - Launch URL via browser appliation from test app by setting URI "http://www.google.com"
    startIntentModuleTests    STTL-116721

STTL-116722 Intent
    [Documentation]    uri - Launch Email appliation with data from test app by setting URI "mailto:abcd@domain.com"
    startIntentModuleTests    STTL-116722

STTL-116723 Intent
    [Documentation]    uri - Launch dialler with pre-filled number from test application by setting URI "tel:9611896991" and with Action: ACTION_DIAL'
    startIntentModuleTests    STTL-116723

STTL-116724 Intent
    [Documentation]    uri - Launch Contacts from test application via Uri "content://contacts/people/" and Action: ACTION_VIEW'
    startIntentModuleTests    STTL-116724

STTL-116725 Intent
    [Documentation]    uri - Launch Email compose screen with pre-filled email from test application by setting URI and data.
    startIntentModuleTests    STTL-116725

STTL-116726 Intent
    [Documentation]    Send intent to view jpeg from package
    startIntentModuleTests    STTL-116726

STTL-116727 Intent
    [Documentation]    category - Launch Message application from test app by setting category "CATEGORY_APP_MESSAGING" and action "ACTION_MAIN"
    startIntentModuleTests    STTL-116727

STTL-116728 Intent
    [Documentation]    mimeType - Launch Message application from test app by setting mimeType "vnd.android-dir/mms-sms" and Data to "This is message body !"
    startIntentModuleTests    STTL-116728

STTL-116729 Intent
    [Documentation]    Start Activity with Intent_Action and Intent_Category
    startIntentModuleTests    STTL-116729

STTL-116730 Intent
    [Documentation]    Suggest different applications to send text message
    startIntentModuleTests    STTL-116730

STTL-116731 Intent
    [Documentation]    uri - Launch Message application with data from test app by setting URI "sms:9611896991"
    startIntentModuleTests    STTL-116731

STTL-116732 Intent
    [Documentation]    Start Listening to the background intents - broadcast messages (receiving broadcast messages)
    startIntentModuleTests    STTL-116732

STTL-116733 Intent
    [Documentation]    Stop listening to background intents before executing startListening method
    startIntentModuleTests    STTL-116733

STTL-116734 Intent
    [Documentation]    Sending an intent with null in place of callback function
    startIntentModuleTests    STTL-116734

STTL-116735 Intent
    [Documentation]    Start Listening to the background intents callback without argument
    startIntentModuleTests    STTL-116735

STTL-116736 Intent
    [Documentation]    Start Listening to the background intents - broadcast messages (receiving broadcast messages)with action main
    startIntentModuleTests    STTL-116736

