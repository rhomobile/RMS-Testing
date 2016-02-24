*** Settings ***
Library    appiumTests_EB.py

*** Test Cases ***
STTL-116701 ScreenOrientation
    [Documentation]    Change Start page
    startScreenOrientationModuleTests    STTL-116701

STTL-116702 ScreenOrientation
    [Documentation]    Set autoRotate without callback rotate the device manually
    startScreenOrientationModuleTests    STTL-116702

STTL-116703 ScreenOrientation
    [Documentation]    ScreenOrientation RightHanded
    startScreenOrientationModuleTests    STTL-116703

STTL-116704 ScreenOrientation
    [Documentation]    ScreenOrientation LeftHanded
    startScreenOrientationModuleTests    STTL-116704

STTL-116705 ScreenOrientation
    [Documentation]    ScreenOrientation Upsidedown
    startScreenOrientationModuleTests    STTL-116705

STTL-116706 ScreenOrientation
    [Documentation]    ScreenOrientation Normal
    startScreenOrientationModuleTests    STTL-116706

STTL-116707 ScreenOrientation
    [Documentation]    autoRotate with default value
    startScreenOrientationModuleTests    STTL-116707

STTL-116708 ScreenOrientation
    [Documentation]    autorRotate as true and rotate device manually
    startScreenOrientationModuleTests    STTL-116708

STTL-116709 ScreenOrientation
    [Documentation]    set autorotate true without callback and call RightHanded method
    startScreenOrientationModuleTests    STTL-116709

STTL-116710 ScreenOrientation
    [Documentation]    ScreenOrientation tag persistency
    startScreenOrientationModuleTests    STTL-116710

STTL-116711 ScreenOrientation
    [Documentation]    Detach ScreenOrientationEvent callback
    startScreenOrientationModuleTests    STTL-116711

