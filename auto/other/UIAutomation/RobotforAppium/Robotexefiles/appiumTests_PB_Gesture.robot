*** Settings ***
Library    appiumTests_EB.py

*** Test Cases ***
STTL-116701 PBGesture
    [Documentation]    Change Start page
    startPBGestureModuleTests    STTL-116701

STTL-116702 PBGesture
    [Documentation]    Gesture - Gesture Type=linear
    startPBGestureModuleTests    STTL-116702

STTL-116703 PBGesture
    [Documentation]    Linear gesture type invalid
    startPBGestureModuleTests    STTL-116703

STTL-116704 PBGesture
    [Documentation]    Linear Gesture left-right
    startPBGestureModuleTests    STTL-116704

STTL-116705 PBGesture
    [Documentation]    Linear gesture - preset:Right-left
    startPBGestureModuleTests    STTL-116705

STTL-116706 PBGesture
    [Documentation]    Linear gesture - preset:top-bottom
    startPBGestureModuleTests    STTL-116706

STTL-116707 PBGesture
    [Documentation]    Linear gesture - preset:bottom-top
    startPBGestureModuleTests    STTL-116707

STTL-116708 PBGesture
    [Documentation]    Linear Gesture start-x :80,start-y:80,end-x:250,end-y:250
    startPBGestureModuleTests    STTL-116708

STTL-116709 PBGesture
    [Documentation]    Linear Gesture start-x :200,start-y:200,end-x:2000,end-y:2000
    startPBGestureModuleTests    STTL-116709

STTL-116710 PBGesture
    [Documentation]    Linear gesture - Tolerance 50
    startPBGestureModuleTests    STTL-116710

STTL-116711 PBGesture
    [Documentation]    Linear gesture - Tolerance 2000
    startPBGestureModuleTests    STTL-116711

STTL-116712 PBGesture
    [Documentation]    Linear gesture - Skew 90
    startPBGestureModuleTests    STTL-116712

STTL-116713 PBGesture
    [Documentation]    Linear gesture - Skew 45
    startPBGestureModuleTests    STTL-116713

STTL-116714 PBGesture
    [Documentation]    Linear gesture - Deviation 50
    startPBGestureModuleTests    STTL-116714

STTL-116715 PBGesture
    [Documentation]    Linear gesture - Deviation 100
    startPBGestureModuleTests    STTL-116715

STTL-116716 PBGesture
    [Documentation]    Linear gesture - RegionWidth 50
    startPBGestureModuleTests    STTL-116716

STTL-116717 PBGesture
    [Documentation]    Linear gesture - RegionWidth 40 and sensitivity 100
    startPBGestureModuleTests    STTL-116717

STTL-116718 PBGesture
    [Documentation]    Linear gesture - RegionWidth 40 and sensitivity 80
    startPBGestureModuleTests    STTL-116718

STTL-116719 PBGesture
    [Documentation]    Linear gesture - RegionWidth 40 and sensitivity 0
    startPBGestureModuleTests    STTL-116719

STTL-116720 PBGesture
    [Documentation]    Gesture Gesture Type=Hold
    startPBGestureModuleTests    STTL-116720

STTL-116721 PBGesture
    [Documentation]    Gesture - Gesture Type=Hold, Center-x=100, Center-y=100, radius=Default.
    startPBGestureModuleTests    STTL-116721

STTL-116722 PBGesture
    [Documentation]    Gesture - Gesture Type=Hold, Center-x=100, Center-y=100, radius=60
    startPBGestureModuleTests    STTL-116722

STTL-116723 PBGesture
    [Documentation]    Gesture - Gesture Type=Hold, Center-x=Default, Center-y=Default, radius=2000(out of the screen)
    startPBGestureModuleTests    STTL-116723

STTL-116724 PBGesture
    [Documentation]    Gesture - Gesture Type=Hold, Delay=Default
    startPBGestureModuleTests    STTL-116724

STTL-116725 PBGesture
    [Documentation]    Gesture - Gesture Type=Hold, Delay=5000
    startPBGestureModuleTests    STTL-116725

STTL-116726 PBGesture
    [Documentation]    Gesture - Gesture Type=Hold, Delay=1000, Interval=2000
    startPBGestureModuleTests    STTL-116726

STTL-116727 PBGesture
    [Documentation]    Gesture - Gesture Type=Hold, Checking count after Gesture detection
    startPBGestureModuleTests    STTL-116727

STTL-116728 PBGesture
    [Documentation]    URL detection for Hold Gesture
    startPBGestureModuleTests    STTL-116728

