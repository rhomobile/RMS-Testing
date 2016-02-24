*** Settings ***
Library   appiumTests_EB.py

*** Test Cases ***
STTL-116701 RE22Battery
    [Documentation]    Change Start page
    startRE22BatteryModuleTests    STTL-116701

STTL-116702 RE22Battery
    [Documentation]    Battery visible
    startRE22BatteryModuleTests    STTL-116702

STTL-116703 RE22Battery
    [Documentation]    Battery hidden
    startRE22BatteryModuleTests    STTL-116703

STTL-116704 RE22Battery
    [Documentation]    Battery with Layout Left
    startRE22BatteryModuleTests    STTL-116704

STTL-116705 RE22Battery
    [Documentation]    Battery with Layout Right
    startRE22BatteryModuleTests    STTL-116705

STTL-116706 RE22Battery
    [Documentation]    Battery with RGB
    startRE22BatteryModuleTests    STTL-116706

STTL-116707 RE22Battery
    [Documentation]    BatteryEvent
    startRE22BatteryModuleTests    STTL-116707

STTL-116708 RE22Battery
    [Documentation]    batteryEvent with JSON
    startRE22BatteryModuleTests    STTL-116708

