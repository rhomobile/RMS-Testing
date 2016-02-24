*** Settings ***
Library    jasmineTests.py
Library    config.py
Suite Setup    precondition

*** keywords ***
precondition
    waitTimeCapture    60
    startPath    Configuration/Applications/Application/General,StartPage,<StartPage value="http://127.0.0.1:8082/app/ScreenOrientationTest/specRunner.html" name="Menu"/>

*** Test Cases ***
STTL-116701 ScreenOrientation should enable automatic screen orientation
    [Documentation]
    [Tags]    Android
    readResult    should enable automatic screen orientation

STTL-116702 ScreenOrientation should disable automatic screen orientation
    [Documentation]
    [Tags]    Android
    readResult    should disable automatic screen orientation

STTL-116703 ScreenOrientation VT281-0905 - Test Screen Orientation rightHanded with callback -
    [Documentation]
    [Tags]    Android
    readResult    VT281-0905 - Test Screen Orientation rightHanded with callback -

STTL-116704 ScreenOrientation VT281-0906 - Test Screen Orientation leftHanded with callback -
    [Documentation]
    [Tags]    Android
    readResult    VT281-0906 - Test Screen Orientation leftHanded with callback -

STTL-116705 ScreenOrientation VT281-0907 - Test Screen Orientation upsideDown with callback -
    [Documentation]
    [Tags]    Android
    readResult    VT281-0907 - Test Screen Orientation upsideDown with callback -

STTL-116706 ScreenOrientation VT281-0908 - Test Screen Orientation normal with callback -
    [Documentation]
    [Tags]    Android
    readResult    VT281-0908 - Test Screen Orientation normal with callback -

STTL-116707 ScreenOrientation VT281-0910 - Set autoRotate as false and call righthand method -
    [Documentation]
    [Tags]    Android
    readResult    VT281-0910 - Set autoRotate as false and call righthand method -

STTL-116708 ScreenOrientation VT281-0912- Set autoRotate as true and call normal method -
    [Documentation]
    [Tags]    Android
    readResult    VT281-0912- Set autoRotate as true and call normal method -

