*** Settings ***
Library    jasmineTests.py
Library    config.py
Suite Setup    precondition

*** keywords ***
precondition
    waitTimeCapture    60
    startPath    Configuration/Applications/Application/General,StartPage,<StartPage value="http://127.0.0.1:8082/app/NetworkTest/specRunner.html" name="Menu"/>

*** Test Cases ***
STTL-116701 Network VT293-0013 - cancel with wan/mguest connection
    [Documentation]
    [Tags]    Android
    readResult    VT293-0013 - cancel with wan/mguest connection

STTL-116702 Network VT293-0014 - detectConnection with wlan profile enabled
    [Documentation]
    [Tags]    Android
    readResult    VT293-0014 - detectConnection with wlan profile enabled

STTL-116703 Network VT293-0020 - detectConnection with detectionTimeout
    [Documentation]
    [Tags]    Android
    readResult    VT293-0020 - detectConnection with detectionTimeout

STTL-116704 Network VT293-0021 - detectConnection with pollinterval and dtectionTimeout
    [Documentation]
    [Tags]    Android
    readResult    VT293-0021 - detectConnection with pollinterval and dtectionTimeout

STTL-116705 Network VT293-0022 - stopDetectingConnection with wlan profile enabled
    [Documentation]
    [Tags]    Android
    readResult    VT293-0022 - stopDetectingConnection with wlan profile enabled

STTL-116706 Network VT293-0037 - verifyPeerCertificate with default value
    [Documentation]
    [Tags]    Android
    readResult    VT293-0037 - verifyPeerCertificate with default value

STTL-116707 Network VT293-0038 - verifyPeerCertificate with value true
    [Documentation]
    [Tags]    Android
    readResult    VT293-0038 - verifyPeerCertificate with value true

STTL-116708 Network VT293-0039 - verifyPeerCertificate with false
    [Documentation]
    [Tags]    Android
    readResult    VT293-0039 - verifyPeerCertificate with false

STTL-116709 Network VT293-0040 - post with valide url
    [Documentation]
    [Tags]    Android
    readResult    VT293-0040 - post with valide url

STTL-116710 Network VT293-0041 - post with sync
    [Documentation]
    [Tags]    Android
    readResult    VT293-0041 - post with sync

STTL-116711 Network VT293-0042 - post with anonymous call back event
    [Documentation]
    [Tags]    Android
    readResult    VT293-0042 - post with anonymous call back event

STTL-116712 Network VT293-0043 - get with callback
    [Documentation]
    [Tags]    Android
    readResult    VT293-0043 - get with callback

STTL-116713 Network VT293-0044 - get with sync event
    [Documentation]
    [Tags]    Android
    readResult    VT293-0044 - get with sync event

STTL-116714 Network VT293-0045 - get with anonymous call back event
    [Documentation]
    [Tags]    Android
    readResult    VT293-0045 - get with anonymous call back event

STTL-116715 Network VT293-0046 - download file from http with callback event
    [Documentation]
    [Tags]    Android
    readResult    VT293-0046 - download file from http with callback event

STTL-116716 Network VT293-0047 - download file with overwrite default and callback event
    [Documentation]
    [Tags]    Android
    readResult    VT293-0047 - download file with overwrite default and callback event

STTL-116717 Network VT293-0048 - download file with overwrite true and callback event
    [Documentation]
    [Tags]    Android
    readResult    VT293-0048 - download file with overwrite true and callback event

STTL-116718 Network VT293-0049 - download file with overwrite true and createfolder default value and callback
    [Documentation]
    [Tags]    Android
    readResult    VT293-0049 - download file with overwrite true and createfolder default value and callback

STTL-116719 Network VT293-0050 - download file with overwrite true and createfolder fasle value with callback
    [Documentation]
    [Tags]    Android
    readResult    VT293-0050 - download file with overwrite true and createfolder fasle value with callback

STTL-116720 Network VT293-0051 - download file with overwrite true and createfolder true value with callback
    [Documentation]
    [Tags]    Android
    readResult    VT293-0051 - download file with overwrite true and createfolder true value with callback

STTL-116721 Network VT293-0052 - download file with anonymus event
    [Documentation]
    [Tags]    Android
    readResult    VT293-0052 - download file with anonymus event

STTL-116722 Network VT293-0057 - download file with authentication properties with callback event
    [Documentation]
    [Tags]    Android
    readResult    VT293-0057 - download file with authentication properties with callback event

STTL-116723 Network VT293-0068 - uploadFile to http with callback event
    [Documentation]
    [Tags]    Android
    readResult    VT293-0068 - uploadFile to http with callback event

STTL-116724 Network VT293-0069 - uploadFile with synch callback event
    [Documentation]
    [Tags]    Android
    readResult    VT293-0069 - uploadFile with synch callback event

STTL-116725 Network VT293-0070 - uploadFile with anonymus event
    [Documentation]
    [Tags]    Android
    readResult    VT293-0070 - uploadFile with anonymus event

STTL-116726 Network VT293-0071 - uploadFile with autherisation properties
    [Documentation]
    [Tags]    Android
    readResult    VT293-0071 - uploadFile with autherisation properties

STTL-116727 Network VT293-0082 - download file from http with sync
    [Documentation]
    [Tags]    Android
    readResult    VT293-0082 - download file from http with sync

STTL-116728 Network Post GZipped body
    [Documentation]
    [Tags]    Android
    readResult    Post GZipped body

STTL-116729 Network Get GZipped body
    [Documentation]
    [Tags]    Android
    readResult    Get GZipped body

