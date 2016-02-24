*** Settings ***
Library  appiumTests_EB.py

*** Test Cases ***
STTL-116701 RE22Gesture
    [Documentation]    Change Start page
    startRE22GestureModuleTests    STTL-116701

STTL-116702 RE22Gesture
    [Documentation]    Linear Gesture start-x :10,start-y:200,end-x:150,end-y:200
    startRE22GestureModuleTests    STTL-116702

STTL-116703 RE22Gesture
    [Documentation]    Gesture - Gesture Type=linear
    startRE22GestureModuleTests    STTL-116703

STTL-116704 RE22Gesture
    [Documentation]    Linear gesture Diagonstic False
    startRE22GestureModuleTests    STTL-116704

STTL-116705 RE22Gesture
    [Documentation]    Linear gesture - preset:Right-left
    startRE22GestureModuleTests    STTL-116705

STTL-116706 RE22Gesture
    [Documentation]    Linear gesture - preset:top-bottom
    startRE22GestureModuleTests    STTL-116706

STTL-116707 RE22Gesture
    [Documentation]    Linear gesture - Tolerance 50
    startRE22GestureModuleTests    STTL-116707

STTL-116708 RE22Gesture
    [Documentation]    Linear gesture - Skew 15
    startRE22GestureModuleTests    STTL-116708

STTL-116709 RE22Gesture
    [Documentation]    Linear gesture - Deviation 10
    startRE22GestureModuleTests    STTL-116709

STTL-116710 RE22Gesture
    [Documentation]    Linear gesture - RegionWidth 20
    startRE22GestureModuleTests    STTL-116710

STTL-116711 RE22Gesture
    [Documentation]    Linear gesture - RegionWidth 40 and sensitivity 100
    startRE22GestureModuleTests    STTL-116711

STTL-116712 RE22Gesture
    [Documentation]    Linear Gesture with JSON event
    startRE22GestureModuleTests    STTL-116712

STTL-116713 RE22Gesture
    [Documentation]    Gesture event as HTTP URL
    startRE22GestureModuleTests    STTL-116713

STTL-116714 RE22Gesture
    [Documentation]    Delete gesture
    startRE22GestureModuleTests    STTL-116714

STTL-116715 RE22Gesture
    [Documentation]    Hold gesture - Preset value to Center
    startRE22GestureModuleTests    STTL-116715

STTL-116716 RE22Gesture
    [Documentation]    Hold gesture - center values(200,900).
    startRE22GestureModuleTests    STTL-116716

STTL-116717 RE22Gesture
    [Documentation]    Hold gesture - radius value of 60
    startRE22GestureModuleTests    STTL-116717

STTL-116718 RE22Gesture
    [Documentation]    Hold gesture - Delay to 2000ms
    startRE22GestureModuleTests    STTL-116718

STTL-116719 RE22Gesture
    [Documentation]    Hold gesture - Interval to 3000 and Delay to 1000
    startRE22GestureModuleTests    STTL-116719

STTL-116720 RE22Gesture
    [Documentation]    Hold Gesture with JSON event
    startRE22GestureModuleTests    STTL-116720

STTL-116721 RE22Gesture
    [Documentation]    Gesture event as HTTP URL
    startRE22GestureModuleTests    STTL-116721

STTL-116722 RE22Gesture
    [Documentation]    Delete gesture
    startRE22GestureModuleTests    STTL-116722

