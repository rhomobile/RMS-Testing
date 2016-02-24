*** Settings ***
Library    jasmineTests.py
Library    config.py
Suite Setup    precondition

*** keywords ***
precondition
    waitTimeCapture    60
    startPath    Configuration/Applications/Application/General,StartPage,<StartPage value="http://127.0.0.1:8082/app/KeycaptureTest/specRunner.html" name="Menu"/>

*** Test Cases ***
STTL-116701 Keycapture 0-1-focuses the RhoElements Window
    [Documentation]
    [Tags]    Android
    readResult    0-1-focuses the RhoElements Window

STTL-116702 Keycapture 1-1-should check default value of the Home Key
    [Documentation]
    [Tags]    Android
    readResult    1-1-should check default value of the Home Key

STTL-116703 Keycapture 1-2-should set the Home Key to ENTER
    [Documentation]
    [Tags]    Android
    readResult    1-2-should set the Home Key to ENTER

STTL-116704 Keycapture 1-3-should set the Home Key to disabled
    [Documentation]
    [Tags]    Android
    readResult    1-3-should set the Home Key to disabled

STTL-116705 Keycapture 1-4-should set the Home Key to disable
    [Documentation]
    [Tags]    Android
    readResult    1-4-should set the Home Key to disable

STTL-116706 Keycapture 1-5-should set the Home Key to enabled
    [Documentation]
    [Tags]    Android
    readResult    1-5-should set the Home Key to enabled

STTL-116707 Keycapture 1-6-should set the Home Key to enable
    [Documentation]
    [Tags]    Android
    readResult    1-6-should set the Home Key to enable

STTL-116708 Keycapture 1-9-(VT289-051)set the Home Key to enabled with setProperty and without callback
    [Documentation]
    [Tags]    Android
    readResult    1-9-(VT289-051)set the Home Key to enabled with setProperty and without callback

STTL-116709 Keycapture 2-1-should capture ENTER key when specified with HEX
    [Documentation]
    [Tags]    Android
    readResult    2-1-should capture ENTER key when specified with HEX

STTL-116710 Keycapture 2-2-should ignore any other key than ENTER
    [Documentation]
    [Tags]    Android
    readResult    2-2-should ignore any other key than ENTER

STTL-116711 Keycapture 2-3-should capture any key using a lowercase 'all'
    [Documentation]
    [Tags]    Android
    readResult    2-3-should capture any key using a lowercase 'all'

STTL-116712 Keycapture 2-4-should capture any key using an uppercase ALL
    [Documentation]
    [Tags]    Android
    readResult    2-4-should capture any key using an uppercase ALL

STTL-116713 Keycapture 2-5-should not capture any key after resetting 'all' keyValue keyCapture
    [Documentation]
    [Tags]    Android
    readResult    2-5-should not capture any key after resetting 'all' keyValue keyCapture

STTL-116714 Keycapture 2-6-should not capture any key after resetting 'all' keyValue keyCapture with mixed letter case
    [Documentation]
    [Tags]    Android
    readResult    2-6-should not capture any key after resetting 'all' keyValue keyCapture with mixed letter case

STTL-116715 Keycapture 2-7-should capture multiple keys
    [Documentation]
    [Tags]    Android
    readResult    2-7-should capture multiple keys

STTL-116716 Keycapture 2-8-should not capture a key after it has been reset
    [Documentation]
    [Tags]    Android
    readResult    2-8-should not capture a key after it has been reset

STTL-116717 Keycapture 2-9-should only fire 'all' callback if both 'all' and a key has been registered
    [Documentation]
    [Tags]    Android
    readResult    2-9-should only fire 'all' callback if both 'all' and a key has been registered

STTL-116718 Keycapture 2-10-should fire 'all' callback if a key specific callback is registered after the all callback is registered (all persistence)
    [Documentation]
    [Tags]    Android
    readResult    2-10-should fire 'all' callback if a key specific callback is registered after the all callback is registered (all persistence)

STTL-116719 Keycapture 2-11-should not obstruct the key event from reaching the page when dispatch is set to true
    [Documentation]
    [Tags]    Android
    readResult    2-11-should not obstruct the key event from reaching the page when dispatch is set to true

STTL-116720 Keycapture 2-12-should obstruct the key event from reaching the page when dispatch is set to false
    [Documentation]
    [Tags]    Android
    readResult    2-12-should obstruct the key event from reaching the page when dispatch is set to false

STTL-116721 Keycapture 2-13-should capture ENTER key when specified with DECIMAL
    [Documentation]
    [Tags]    Android
    readResult    2-13-should capture ENTER key when specified with DECIMAL

STTL-116722 Keycapture 2-14-should capture P1 (volume down) key
    [Documentation]
    [Tags]    Android
    readResult    2-14-should capture P1 (volume down) key

STTL-116723 Keycapture 2-15-should capture P2 (volume up) key
    [Documentation]
    [Tags]    Android
    readResult    2-15-should capture P2 (volume up) key

STTL-116724 Keycapture 2-16-should capture P3 (search) key
    [Documentation]
    [Tags]    Android
    readResult    2-16-should capture P3 (search) key

STTL-116725 Keycapture 2-17-should capture back key
    [Documentation]
    [Tags]    Android
    readResult    2-17-should capture back key

STTL-116726 Keycapture 2-18-should capture menu key
    [Documentation]
    [Tags]    Android
    readResult    2-18-should capture menu key

STTL-116727 Keycapture VT289-011 - call captureKey with dispatch true, keyValue for P1/VolumeDown and function callback -
    [Documentation]
    [Tags]    Android
    readResult    VT289-011 - call captureKey with dispatch true, keyValue for P1/VolumeDown and function callback -

STTL-116728 Keycapture VT289-012 - call captureKey with dispatch false, keyValue for P1/VolumeDown and function callback -
    [Documentation]
    [Tags]    Android
    readResult    VT289-012 - call captureKey with dispatch false, keyValue for P1/VolumeDown and function callback -

STTL-116729 Keycapture VT289-013 - call captureKey with dispatch true, keyValue for P2/VolumeUp and no callback(Sync) -
    [Documentation]
    [Tags]    Android
    readResult    VT289-013 - call captureKey with dispatch true, keyValue for P2/VolumeUp and no callback(Sync) -

STTL-116730 Keycapture VT289-014 - call captureKey with dispatch true, keyValue for Menu and callback as anonymous function -
    [Documentation]
    [Tags]    Android
    readResult    VT289-014 - call captureKey with dispatch true, keyValue for Menu and callback as anonymous function -

STTL-116731 Keycapture VT289-015 - call captureKey with dispatch false, keyValue for P3/search and press Menu
    [Documentation]
    [Tags]    Android
    readResult    VT289-015 - call captureKey with dispatch false, keyValue for P3/search and press Menu

STTL-116732 Keycapture VT289-016 - call captureKey with dispatch True, keyValue ALL and callback -
    [Documentation]
    [Tags]    Android
    readResult    VT289-016 - call captureKey with dispatch True, keyValue ALL and callback -

STTL-116733 Keycapture VT289-021 - call captureKey twice, one with callback and other without callback -
    [Documentation]
    [Tags]    Android
    readResult    VT289-021 - call captureKey twice, one with callback and other without callback -

STTL-116734 Keycapture VT289-030 - call captureKey with no callback -
    [Documentation]
    [Tags]    Android
    readResult    VT289-030 - call captureKey with no callback -

STTL-116735 Keycapture VT289-031 - call captureKey with no callback after setting P1/VolumeDown
    [Documentation]
    [Tags]    Android
    readResult    VT289-031 - call captureKey with no callback after setting P1/VolumeDown

STTL-116736 Keycapture 3-1-should remap TAB key to the ENTER key
    [Documentation]
    [Tags]    Android
    readResult    3-1-should remap TAB key to the ENTER key

STTL-116737 Keycapture 3-2-should clear a remap using null value
    [Documentation]
    [Tags]    Android
    readResult    3-2-should clear a remap using null value

STTL-116738 Keycapture 3-3-should clear a remap using empty string
    [Documentation]
    [Tags]    Android
    readResult    3-3-should clear a remap using empty string

STTL-116739 Keycapture VT289-039 - call remapKey with enter and numeric key 1 -
    [Documentation]
    [Tags]    Android
    readResult    VT289-039 - call remapKey with enter and numeric key 1 -

STTL-116740 Keycapture VT289-040 - call remapKey with functionkey F1 and numeric key 9 -
    [Documentation]
    [Tags]    Android
    readResult    VT289-040 - call remapKey with functionkey F1 and numeric key 9 -

STTL-116741 Keycapture VT289-041 - call remapKey with numeric key 5 and null -
    [Documentation]
    [Tags]    Android
    readResult    VT289-041 - call remapKey with numeric key 5 and null -

STTL-116742 Keycapture VT289-044 - call capturekey after remapKey -
    [Documentation]
    [Tags]    Android
    readResult    VT289-044 - call capturekey after remapKey -

STTL-116743 Keycapture VT289-045 - call capturekey after remapKey and callback to fire -
    [Documentation]
    [Tags]    Android
    readResult    VT289-045 - call capturekey after remapKey and callback to fire -

STTL-116744 Keycapture VT289-046 - call remapKey after capturekey and callback to fire -
    [Documentation]
    [Tags]    Android
    readResult    VT289-046 - call remapKey after capturekey and callback to fire -

STTL-116745 Keycapture 4-1-should capture the trigger press
    [Documentation]
    [Tags]    Android
    readResult    4-1-should capture the trigger press

STTL-116746 Keycapture 4-2-should NOT capture the trigger when other key pressed
    [Documentation]
    [Tags]    Android
    readResult    4-2-should NOT capture the trigger when other key pressed

STTL-116747 Keycapture 4-3-should NOT capture the trigger after the trigger callback is cleared
    [Documentation]
    [Tags]    Android
    readResult    4-3-should NOT capture the trigger after the trigger callback is cleared

