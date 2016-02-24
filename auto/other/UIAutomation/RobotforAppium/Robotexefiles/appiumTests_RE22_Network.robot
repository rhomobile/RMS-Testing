*** Settings ***
Library  appiumTests_EB.py

*** Test Cases ***
STTL-116701 RE22Network
    [Documentation]    Change Start page
    startRE22NetworkModuleTests    STTL-116701

STTL-116702 RE22Network
    [Documentation]    Network Event with valid server IP
    startRE22NetworkModuleTests    STTL-116702

STTL-116703 RE22Network
    [Documentation]    Stop network checking
    startRE22NetworkModuleTests    STTL-116703

STTL-116704 RE22Network
    [Documentation]    Check network event upon toggling the WLAN connection
    startRE22NetworkModuleTests    STTL-116704

STTL-116705 RE22Network
    [Documentation]    Test Network event of JSON Object type
    startRE22NetworkModuleTests    STTL-116705

STTL-116706 RE22Network
    [Documentation]    Check NetworkPollInterval
    startRE22NetworkModuleTests    STTL-116706

STTL-116707 RE22Network
    [Documentation]    Check Network event of HTTP url type
    startRE22NetworkModuleTests    STTL-116707

