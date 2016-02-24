*** Settings ***
Library    appiumTests_EB.py

*** Test Cases ***
STTL-116701 Battery
    [Documentation]    Change Start page
    startBatteryModuleTests    STTL-116701

STTL-116702 Battery
    [Documentation]    Battery showIcon all property
    startBatteryModuleTests    STTL-116702

STTL-116703 Battery
    [Documentation]    Battery hideIcon after calling showIcon method
    startBatteryModuleTests    STTL-116703

STTL-116704 Battery
    [Documentation]    Battery showIcon color without any property
    startBatteryModuleTests    STTL-116704

STTL-116705 Battery
    [Documentation]    Battery showIcon left with 40
    startBatteryModuleTests    STTL-116705

STTL-116706 Battery
    [Documentation]    Battery showIcon top with 40
    startBatteryModuleTests    STTL-116706

STTL-116707 Battery
    [Documentation]    Battery showIcon layout with left
    startBatteryModuleTests    STTL-116707

STTL-116708 Battery
    [Documentation]    Battery showIcon layout with right
    startBatteryModuleTests    STTL-116708

STTL-116709 Battery
    [Documentation]    Battery showIcon layout with up
    startBatteryModuleTests    STTL-116709

STTL-116710 Battery
    [Documentation]    Battery showIcon layout with down
    startBatteryModuleTests    STTL-116710

STTL-116711 Battery
    [Documentation]    Battery showIcon color with #0000FF value
    startBatteryModuleTests    STTL-116711

STTL-116712 Battery
    [Documentation]    Battery showIcon left with -10
    startBatteryModuleTests    STTL-116712

STTL-116713 Battery
    [Documentation]    Battery showIcon top with -10
    startBatteryModuleTests    STTL-116713

STTL-116714 Battery
    [Documentation]    Battery showIcon layout with invalid
    startBatteryModuleTests    STTL-116714

STTL-116715 Battery
    [Documentation]    Battery showIcon color with #FF0000 value
    startBatteryModuleTests    STTL-116715

STTL-116716 Battery
    [Documentation]    Battery showIcon color with #FFFFFF value
    startBatteryModuleTests    STTL-116716

STTL-116717 Battery
    [Documentation]    batteryStatus with callback and trigger to system with default refreshInterval value
    startBatteryModuleTests    STTL-116717

STTL-116718 Battery
    [Documentation]    batteryStatus with sync callback and trigger to system with default refreshInterval value
    startBatteryModuleTests    STTL-116718

STTL-116719 Battery
    [Documentation]    stopbattery status without calling battery status
    startBatteryModuleTests    STTL-116719

