*** Settings ***
Library    appiumTests_EB_Full.py

*** Test Cases ***
STTL-116701 Application
    [Documentation]    Change Start page
    startApplicationModuleTests    STTL-116701

STTL-116702 Application
    [Documentation]    get defaultNative menu
    startApplicationModuleTests    STTL-116702

STTL-116703 Application
    [Documentation]    Security token not passed
    startApplicationModuleTests    STTL-116703

STTL-116704 Application
    [Documentation]    set StartUri to a web page
    startApplicationModuleTests    STTL-116704

STTL-116701 Battery
    [Documentation]    Change Start page
    startBatteryModuleTests    STTL-116701

STTL-116702 Battery
    [Documentation]    Battery showIcon all property
    startBatteryModuleTests    STTL-116702

STTL-116703 Battery
    [Documentation]    Battery hideIcon after calling showIcon method
    startBatteryModuleTests    STTL-116703
