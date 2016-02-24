*** Settings ***
Library    jasmineTests.py
Library    config.py
Suite Setup    precondition

*** keywords ***
precondition
    waitTimeCapture    60
    startPath    Configuration/Applications/Application/General,StartPage,<StartPage value="http://127.0.0.1:8082/app/SmartCradleTest/specRunner.html" name="Menu"/>

*** Test Cases ***
STTL-116701 SmartCradle 1 is able to correctly set the rowId to a valid value (1)   
    [Documentation]
    [Tags]    Android
    readResult    1 is able to correctly set the rowId to a valid value (1)   

STTL-116702 SmartCradle 2 is able to correctly set the rowId to a valid value (5)   
    [Documentation]
    [Tags]    Android
    readResult    2 is able to correctly set the rowId to a valid value (5)   

STTL-116703 SmartCradle 3 is able to accept an unrealistically large rowId (10000)   
    [Documentation]
    [Tags]    Android
    readResult    3 is able to accept an unrealistically large rowId (10000)   

STTL-116704 SmartCradle 4 is able to fail gracefully when setting the rowId to an invalid value (-1)   
    [Documentation]
    [Tags]    Android
    readResult    4 is able to fail gracefully when setting the rowId to an invalid value (-1)   

STTL-116705 SmartCradle 5 is able to fail gracefully when setting the rowId to an invalid value (-100)   
    [Documentation]
    [Tags]    Android
    readResult    5 is able to fail gracefully when setting the rowId to an invalid value (-100)   

STTL-116706 SmartCradle 6 is able to correctly set the columnId to a valid value (1)   
    [Documentation]
    [Tags]    Android
    readResult    6 is able to correctly set the columnId to a valid value (1)   

STTL-116707 SmartCradle 7 is able to correctly set the columnId to a valid value (5)   
    [Documentation]
    [Tags]    Android
    readResult    7 is able to correctly set the columnId to a valid value (5)   

STTL-116708 SmartCradle 8 is able to accept an unrealistically large columnId (10000)   
    [Documentation]
    [Tags]    Android
    readResult    8 is able to accept an unrealistically large columnId (10000)   

STTL-116709 SmartCradle 9 is able to correctly set the columnId to an invalid value (-1)   
    [Documentation]
    [Tags]    Android
    readResult    9 is able to correctly set the columnId to an invalid value (-1)   

STTL-116710 SmartCradle 10 is able to correctly set the columnId to an invalid value (-100)   
    [Documentation]
    [Tags]    Android
    readResult    10 is able to correctly set the columnId to an invalid value (-100)   

STTL-116711 SmartCradle 11 is able to correctly set the wallId to a valid value (1)   
    [Documentation]
    [Tags]    Android
    readResult    11 is able to correctly set the wallId to a valid value (1)   

STTL-116712 SmartCradle 12 is able to correctly set the wallId to a valid value (5)   
    [Documentation]
    [Tags]    Android
    readResult    12 is able to correctly set the wallId to a valid value (5)   

STTL-116713 SmartCradle 13 is able to accept an unrealistically large wall ID (10000)   
    [Documentation]
    [Tags]    Android
    readResult    13 is able to accept an unrealistically large wall ID (10000)   

STTL-116714 SmartCradle 14 is able to correctly set the wallId to an invalid value (-1)   
    [Documentation]
    [Tags]    Android
    readResult    14 is able to correctly set the wallId to an invalid value (-1)   

STTL-116715 SmartCradle 15 is able to correctly set the wallId to an invalid value (-100)   
    [Documentation]
    [Tags]    Android
    readResult    15 is able to correctly set the wallId to an invalid value (-100)   

STTL-116716 SmartCradle 16 is able to correctly set the chargeState to a valid value ('fast')   
    [Documentation]
    [Tags]    Android
    readResult    16 is able to correctly set the chargeState to a valid value ('fast')   

STTL-116717 SmartCradle 17 is able to correctly set the chargeState to a valid value ('slow')   
    [Documentation]
    [Tags]    Android
    readResult    17 is able to correctly set the chargeState to a valid value ('slow')   

STTL-116718 SmartCradle 18 is able to correctly set the chargeState to an invalid value ('bunnies')   
    [Documentation]
    [Tags]    Android
    readResult    18 is able to correctly set the chargeState to an invalid value ('bunnies')   

STTL-116719 SmartCradle 19 is able to correctly set the chargeState to an invalid value ('fastslow')   
    [Documentation]
    [Tags]    Android
    readResult    19 is able to correctly set the chargeState to an invalid value ('fastslow')   

STTL-116720 SmartCradle 20 is able to correctly set the chargeState to an invalid value ('slowfast')   
    [Documentation]
    [Tags]    Android
    readResult    20 is able to correctly set the chargeState to an invalid value ('slowfast')   

STTL-116721 SmartCradle 21 is able to correctly set the rowId to a valid value (1)   
    [Documentation]
    [Tags]    Android
    readResult    21 is able to correctly set the rowId to a valid value (1)   

STTL-116722 SmartCradle 22 is able to correctly set the rowId to a valid value (5)   
    [Documentation]
    [Tags]    Android
    readResult    22 is able to correctly set the rowId to a valid value (5)   

STTL-116723 SmartCradle 23 is able to accept an unrealistically large rowId (10000)   
    [Documentation]
    [Tags]    Android
    readResult    23 is able to accept an unrealistically large rowId (10000)   

STTL-116724 SmartCradle 24 is able to fail gracefully when setting the rowId to an invalid value (-1)   
    [Documentation]
    [Tags]    Android
    readResult    24 is able to fail gracefully when setting the rowId to an invalid value (-1)   

STTL-116725 SmartCradle 25 is able to fail gracefully when setting the rowId to an invalid value (-100)   
    [Documentation]
    [Tags]    Android
    readResult    25 is able to fail gracefully when setting the rowId to an invalid value (-100)   

STTL-116726 SmartCradle 26 is able to correctly set the columnId to a valid value (1)   
    [Documentation]
    [Tags]    Android
    readResult    26 is able to correctly set the columnId to a valid value (1)   

STTL-116727 SmartCradle 27 is able to correctly set the columnID to a valid value (5)   
    [Documentation]
    [Tags]    Android
    readResult    27 is able to correctly set the columnID to a valid value (5)   

STTL-116728 SmartCradle 28 is able to accept an unrealistically large columnID (10000)   
    [Documentation]
    [Tags]    Android
    readResult    28 is able to accept an unrealistically large columnID (10000)   

STTL-116729 SmartCradle 29 is able to fail gracefully when setting the columnID to an invalid value (-1)   
    [Documentation]
    [Tags]    Android
    readResult    29 is able to fail gracefully when setting the columnID to an invalid value (-1)   

STTL-116730 SmartCradle 30 is able to fail gracefully when setting the columnID to an invalid value (-100)   
    [Documentation]
    [Tags]    Android
    readResult    30 is able to fail gracefully when setting the columnID to an invalid value (-100)   

STTL-116731 SmartCradle 31 is able to correctly set the wallID to a valid value (1)   
    [Documentation]
    [Tags]    Android
    readResult    31 is able to correctly set the wallID to a valid value (1)   

STTL-116732 SmartCradle 32 is able to correctly set the wallID to a valid value (5)   
    [Documentation]
    [Tags]    Android
    readResult    32 is able to correctly set the wallID to a valid value (5)   

STTL-116733 SmartCradle 33 is able to accept an unrealistically large wallID (10000)   
    [Documentation]
    [Tags]    Android
    readResult    33 is able to accept an unrealistically large wallID (10000)   

STTL-116734 SmartCradle 34 is able to fail gracefully when setting the wallID to an invalid value (-1)   
    [Documentation]
    [Tags]    Android
    readResult    34 is able to fail gracefully when setting the wallID to an invalid value (-1)   

STTL-116735 SmartCradle 35 is able to fail gracefully when setting the wallID to an invalid value (-100)   
    [Documentation]
    [Tags]    Android
    readResult    35 is able to fail gracefully when setting the wallID to an invalid value (-100)   

STTL-116736 SmartCradle 36 is able to correctly set the chargeState to a valid value ('fast')   
    [Documentation]
    [Tags]    Android
    readResult    36 is able to correctly set the chargeState to a valid value ('fast')   

STTL-116737 SmartCradle 37 is able to correctly set the chargeState to a valid value ('slow')   
    [Documentation]
    [Tags]    Android
    readResult    37 is able to correctly set the chargeState to a valid value ('slow')   

STTL-116738 SmartCradle 38 is able to correctly set the chargeState to an invalid value ('bunnies')   
    [Documentation]
    [Tags]    Android
    readResult    38 is able to correctly set the chargeState to an invalid value ('bunnies')   

STTL-116739 SmartCradle 39 is able to correctly set the chargeState to an invalid value ('fastslow')   
    [Documentation]
    [Tags]    Android
    readResult    39 is able to correctly set the chargeState to an invalid value ('fastslow')   

STTL-116740 SmartCradle 40 is able to correctly set the chargeState to an invalid value ('slowfast')   
    [Documentation]
    [Tags]    Android
    readResult    40 is able to correctly set the chargeState to an invalid value ('slowfast')   

STTL-116741 SmartCradle 41 is able to successfully retrieve the hardwareId   
    [Documentation]
    [Tags]    Android
    readResult    41 is able to successfully retrieve the hardwareId   

STTL-116742 SmartCradle 42 is able to successfully retrieve the partNumber   
    [Documentation]
    [Tags]    Android
    readResult    42 is able to successfully retrieve the partNumber   

STTL-116743 SmartCradle 43 is able to successfully retrieve the serialNumber   
    [Documentation]
    [Tags]    Android
    readResult    43 is able to successfully retrieve the serialNumber   

STTL-116744 SmartCradle 44 is able to successfully retrieve the hardwareId   
    [Documentation]
    [Tags]    Android
    readResult    44 is able to successfully retrieve the hardwareId   

STTL-116745 SmartCradle 45 is able to successfully retrieve the partNumber   
    [Documentation]
    [Tags]    Android
    readResult    45 is able to successfully retrieve the partNumber   

STTL-116746 SmartCradle 46 is able to successfully retrieve the serialNumber   
    [Documentation]
    [Tags]    Android
    readResult    46 is able to successfully retrieve the serialNumber   

STTL-116747 SmartCradle 47 is able to set all writable properties using the SetProperties method & retrieve using GetProperties   
    [Documentation]
    [Tags]    Android
    readResult    47 is able to set all writable properties using the SetProperties method & retrieve using GetProperties   

STTL-116748 SmartCradle 48 is able to retrieve all properties using the GetAllProperties method
    [Documentation]
    [Tags]    Android
    readResult    48 is able to retrieve all properties using the GetAllProperties method

