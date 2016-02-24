*** Settings ***
Library    jasmineTests.py
Library    config.py
Suite Setup    precondition

*** keywords ***
precondition
    waitTimeCapture    60
    startPath    Configuration/Applications/Application/General,StartPage,<StartPage value="http://127.0.0.1:8082/app/IndicatorsTest/specRunner.html" name="Menu"/>

*** Test Cases ***
STTL-116701 Indicators are able to set and retrieve the tripDuration property (valid values)
    [Documentation]
    [Tags]    Android
    readResult    are able to set and retrieve the tripDuration property (valid values)

STTL-116702 Indicators are able to set and retrieve the tripDuration property (invalid / unrealistic values)
    [Documentation]
    [Tags]    Android
    readResult    are able to set and retrieve the tripDuration property (invalid / unrealistic values)

STTL-116703 Indicators are able to set and retrieve the averageCurrentConsumption property (valid values)
    [Documentation]
    [Tags]    Android
    readResult    are able to set and retrieve the averageCurrentConsumption property (valid values)

STTL-116704 Indicators are able to set and retrieve the averageCurrentConsumption property (invalid / unrealistic values)
    [Documentation]
    [Tags]    Android
    readResult    are able to set and retrieve the averageCurrentConsumption property (invalid / unrealistic values)

STTL-116705 Indicators are able to retrieve Battery Diagnostics
    [Documentation]
    [Tags]    Android
    readResult    are able to retrieve Battery Diagnostics

STTL-116706 Indicators will report different Battery Diagnostics if the tripDuration and averageCurrentConsumption are changed
    [Documentation]
    [Tags]    Android
    readResult    will report different Battery Diagnostics if the tripDuration and averageCurrentConsumption are changed

STTL-116707 Indicators Able to access Signal status synchronously
    [Documentation]
    [Tags]    Android
    readResult    Able to access Signal status synchronously

STTL-116708 Indicators Able to Show and Hide the Signal Icon - TODO: Screenshot Automation
    [Documentation]
    [Tags]    Android
    readResult    Able to Show and Hide the Signal Icon - TODO: Screenshot Automation

STTL-116709 Indicators Able to access Battery status synchronously
    [Documentation]
    [Tags]    Android
    readResult    Able to access Battery status synchronously

STTL-116710 Indicators Able to Show and Hide the Battery Icon - TODO: Screenshot Automation
    [Documentation]
    [Tags]    Android
    readResult    Able to Show and Hide the Battery Icon - TODO: Screenshot Automation

STTL-116711 Indicators Able to access Smart Battery Information
    [Documentation]
    [Tags]    Android
    readResult    Able to access Smart Battery Information

STTL-116712 Indicators TODO - Able to Show and Hide the KeyState Icons
    [Documentation]
    [Tags]    Android
    readResult    TODO - Able to Show and Hide the KeyState Icons

