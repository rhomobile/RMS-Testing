*** Settings ***
Library    appiumTests_EB.py

*** Test Cases ***
STTL-116701 Network
    [Documentation]    Change Start page
    startNetworkModuleTests    STTL-116701

STTL-116702 Network
    [Documentation]    Objective: startStatusNotify without pollinterval
    startNetworkModuleTests    STTL-116702

STTL-116703 Network
    [Documentation]    Objective: startStatusNotify with Synch
    startNetworkModuleTests    STTL-116703

STTL-116704 Network
    [Documentation]    Objective: startStatusNotify with Anonymous Callback
    startNetworkModuleTests    STTL-116704

STTL-116705 Network
    [Documentation]    Objective: stopStatusNotify
    startNetworkModuleTests    STTL-116705

STTL-116706 Network
    [Documentation]    Objective: detectConnection with wlan profile disabled
    startNetworkModuleTests    STTL-116706

STTL-116707 Network
    [Documentation]    Objective: hasCellNetwork without CellNetowrk
    startNetworkModuleTests    STTL-116707

STTL-116708 Network
    [Documentation]    Objective: hasCellNetwork with wifi netowrk
    startNetworkModuleTests    STTL-116708

STTL-116709 Network
    [Documentation]    Objective: hasNetwork with wifi
    startNetworkModuleTests    STTL-116709

STTL-116710 Network
    [Documentation]    Objective: hasNetwork with both cell and wifi
    startNetworkModuleTests    STTL-116710

STTL-116711 Network
    [Documentation]    Objective: hasNetwork without both cell and wifi
    startNetworkModuleTests    STTL-116711

STTL-116712 Network
    [Documentation]    Objective: hasWifiNetwork with wifi network
    startNetworkModuleTests    STTL-116712

STTL-116713 Network
    [Documentation]    Objective: hasWifiNetwork with Cell network
    startNetworkModuleTests    STTL-116713

