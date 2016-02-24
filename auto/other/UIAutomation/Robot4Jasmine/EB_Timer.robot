*** Settings ***
Library    jasmineTests.py
Library    config.py
Suite Setup    precondition

*** keywords ***
precondition
    waitTimeCapture    60
    startPath    Configuration/Applications/Application/General,StartPage,<StartPage value="http://127.0.0.1:8082/app/TimerTest/specRunner.html" name="Menu"/>

*** Test Cases ***
STTL-116701 Timer VTXX-0001 - call isAlive before timeout seconds -
    [Documentation]
    [Tags]    Android
    readResult    VTXX-0001 - call isAlive before timeout seconds -

STTL-116702 Timer VTXX-0003 - call isAlive after timeout seconds -
    [Documentation]
    [Tags]    Android
    readResult    VTXX-0003 - call isAlive after timeout seconds -

STTL-116703 Timer VTXX-0004 - call isAlive for different timers (1) -
    [Documentation]
    [Tags]    Android
    readResult    VTXX-0004 - call isAlive for different timers (1) -

STTL-116704 Timer VTXX-0005 - call isAlive for different timers (2) -
    [Documentation]
    [Tags]    Android
    readResult    VTXX-0005 - call isAlive for different timers (2) -

STTL-116705 Timer VTXX-0006 - call stop before timeout -
    [Documentation]
    [Tags]    Android
    readResult    VTXX-0006 - call stop before timeout -

STTL-116706 Timer VTXX-0008 - call stop after timeout -
    [Documentation]
    [Tags]    Android
    readResult    VTXX-0008 - call stop after timeout -

STTL-116707 Timer VTXX-0009 - call stop for one of three timers-
    [Documentation]
    [Tags]    Android
    readResult    VTXX-0009 - call stop for one of three timers-

STTL-116708 Timer VTXX-0010 - call stop for all timers -
    [Documentation]
    [Tags]    Android
    readResult    VTXX-0010 - call stop for all timers -

STTL-116709 Timer VTXX-0011 - call isAlive without calling start -
    [Documentation]
    [Tags]    Android
    readResult    VTXX-0011 - call isAlive without calling start -

STTL-116710 Timer VTXX-0012 - call stop without calling start -
    [Documentation]
    [Tags]    Android
    readResult    VTXX-0012 - call stop without calling start -

STTL-116711 Timer VTXX-0013 - call start with 100 ms -
    [Documentation]
    [Tags]    Android
    readResult    VTXX-0013 - call start with 100 ms -

STTL-116712 Timer VTXX-0014 - call start with 0 ms -
    [Documentation]
    [Tags]    Android
    readResult    VTXX-0014 - call start with 0 ms -

STTL-116713 Timer VTXX-0015 - call start with -10000 ms -
    [Documentation]
    [Tags]    Android
    readResult    VTXX-0015 - call start with -10000 ms -

STTL-116714 Timer VTXX-0016 - call start without param and callback -
    [Documentation]
    [Tags]    Android
    readResult    VTXX-0016 - call start without param and callback -

STTL-116715 Timer VTXX-0017 - call start only with callback -
    [Documentation]
    [Tags]    Android
    readResult    VTXX-0017 - call start only with callback -

STTL-116716 Timer VTXX-0018 - call start only with interval -
    [Documentation]
    [Tags]    Android
    readResult    VTXX-0018 - call start only with interval -

