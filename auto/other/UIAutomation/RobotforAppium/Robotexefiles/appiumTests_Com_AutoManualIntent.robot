*** Settings ***
Library    appiumTests_EB.py

*** Test Cases ***
STTL-116701 AutotoManualIntent
    [Documentation]    Change Start page
    startAutotoManualIntentModuleTests    STTL-116701

STTL-116702 AutotoManualIntent
    [Documentation]    VT328_47 Check for callback while starting an activity from target appliaction
    startAutotoManualIntentModuleTests    STTL-116702

STTL-116703 AutotoManualIntent
    [Documentation]    VT328_0048 Check for callback while starting an activity from target appliaction which is running in the background
    startAutotoManualIntentModuleTests    STTL-116703

STTL-116704 AutotoManualIntent
    [Documentation]    VT328_0049 Check for callback while starting an activity from target application using targetClass
    startAutotoManualIntentModuleTests    STTL-116704

STTL-116705 AutotoManualIntent
    [Documentation]    VT328_0050 Check for callback while launching browser from test application
    startAutotoManualIntentModuleTests    STTL-116705

STTL-116706 AutotoManualIntent
    [Documentation]    VT328_0051 Check for callback while launching music player from test application
    startAutotoManualIntentModuleTests    STTL-116706

STTL-116707 AutotoManualIntent
    [Documentation]    VT328_0052 Check for callback while launching calculator from test application
    startAutotoManualIntentModuleTests    STTL-116707

STTL-116708 AutotoManualIntent
    [Documentation]    VT328_0053 Check for callback while launching calendar from test application
    startAutotoManualIntentModuleTests    STTL-116708

STTL-116709 AutotoManualIntent
    [Documentation]    VT328_0054 Check for callback while launching contacts from test application
    startAutotoManualIntentModuleTests    STTL-116709

STTL-116710 AutotoManualIntent
    [Documentation]    VT328_0055 Check for callback while launching email from test application
    startAutotoManualIntentModuleTests    STTL-116710

STTL-116711 AutotoManualIntent
    [Documentation]    VT328_0056 Check for callback while launching gallery from test application
    startAutotoManualIntentModuleTests    STTL-116711

STTL-116712 AutotoManualIntent
    [Documentation]    VT328_0057 Check for callback while launching messaging from test application
    startAutotoManualIntentModuleTests    STTL-116712

STTL-116713 AutotoManualIntent
    [Documentation]    VT328_0061 | Sending Intent with null parameter should raise error
    startAutotoManualIntentModuleTests    STTL-116713

STTL-116714 AutotoManualIntent
    [Documentation]    VT328_0063 | Sending Intent with callback which does\'n handle the input argument shouldn\'t raise error
    startAutotoManualIntentModuleTests    STTL-116714

STTL-116715 AutotoManualIntent
    [Documentation]    VT328_0064 | Sending Intent with variable in place of callback function
    startAutotoManualIntentModuleTests    STTL-116715

STTL-116716 AutotoManualIntent
    [Documentation]    VT328_0065 | Broad cast with callback
    startAutotoManualIntentModuleTests    STTL-116716

STTL-116717 AutotoManualIntent
    [Documentation]    VT328_0066 | Pass intent data array with unsupported type
    startAutotoManualIntentModuleTests    STTL-116717

