*** Settings ***
Library    appiumTests_EB.py

*** Test Cases ***
STTL-116701 Signal
    [Documentation]    Change Start page
    startSignalModuleTests    STTL-116701

STTL-116702 Signal
    [Documentation]    Signal showIcon all property
    startSignalModuleTests    STTL-116702

STTL-116703 Signal
    [Documentation]    wlanStatus with callback
    startSignalModuleTests    STTL-116703

STTL-116704 Signal
    [Documentation]    Signal showIcon color without any property
    startSignalModuleTests    STTL-116704

STTL-116705 Signal
    [Documentation]    Signal showIcon left with 80
    startSignalModuleTests    STTL-116705

STTL-116706 Signal
    [Documentation]    Signal showIcon top with 80
    startSignalModuleTests    STTL-116706

STTL-116707 Signal
    [Documentation]    Signal showIcon layout with left
    startSignalModuleTests    STTL-116707

STTL-116708 Signal
    [Documentation]    Signal showIcon layout with right
    startSignalModuleTests    STTL-116708

STTL-116709 Signal
    [Documentation]    Signal showIcon layout with up
    startSignalModuleTests    STTL-116709

STTL-116710 Signal
    [Documentation]    Signal showIcon layout with down
    startSignalModuleTests    STTL-116710

STTL-116711 Signal
    [Documentation]    Signal showIcon color with #0000FF value
    startSignalModuleTests    STTL-116711

STTL-116712 Signal
    [Documentation]    Signal hideIcon after calling showIcon method
    startSignalModuleTests    STTL-116712

STTL-116713 Signal
    [Documentation]    stopWlanStatus after calling wlanStatus
    startSignalModuleTests    STTL-116713

STTL-116714 Signal
    [Documentation]    wlanStatus with callback after disabling wlan profile
    startSignalModuleTests    STTL-116714

STTL-116715 Signal
    [Documentation]    Signal showIcon left with -10
    startSignalModuleTests    STTL-116715

STTL-116716 Signal
    [Documentation]    Signal showIcon top with -10
    startSignalModuleTests    STTL-116716

STTL-116717 Signal
    [Documentation]    Signal showIcon layout with invalid
    startSignalModuleTests    STTL-116717

STTL-116718 Signal
    [Documentation]    Signal showIcon color with #FF0000 value
    startSignalModuleTests    STTL-116718

STTL-116719 Signal
    [Documentation]    Signal showIcon color with #000000 value
    startSignalModuleTests    STTL-116719

STTL-116720 Signal
    [Documentation]    wlanStatus with synch Without callback
    startSignalModuleTests    STTL-116720

STTL-116721 Signal
    [Documentation]    wlanStatus with anonymouscallback
    startSignalModuleTests    STTL-116721

