*** Settings ***
Library    jasmineTests.py
Library    config.py
Suite Setup    precondition

*** keywords ***
precondition
    waitTimeCapture    60
    startPath    Configuration/Applications/Application/General,StartPage,<StartPage value="http://127.0.0.1:8082/app/application/specRunner.html" name="Menu"/>

*** Test Cases ***
STTL-116701 Application Test appBundleFolder property
    [Documentation]
    [Tags]    Android
    readResult    Test appBundleFolder property

STTL-116702 Application Test appsBundleFolder proeprty
    [Documentation]
    [Tags]    Android
    readResult    Test appsBundleFolder proeprty

STTL-116703 Application Test userFolder property
    [Documentation]
    [Tags]    Android
    readResult    Test userFolder property

STTL-116704 Application Test modelsManifestPath property
    [Documentation]
    [Tags]    Android
    readResult    Test modelsManifestPath property

STTL-116705 Application Test databaseBlobFolder property
    [Documentation]
    [Tags]    Android
    readResult    Test databaseBlobFolder property

STTL-116706 Application Test publicFolder property
    [Documentation]
    [Tags]    Android
    readResult    Test publicFolder property

STTL-116707 Application Test startURI property
    [Documentation]
    [Tags]    Android
    readResult    Test startURI property

STTL-116708 Application Test settingsPageURI property
    [Documentation]
    [Tags]    Android
    readResult    Test settingsPageURI property

STTL-116709 Application Test splash property
    [Documentation]
    [Tags]    Android
    readResult    Test splash property

STTL-116710 Application Test version property
    [Documentation]
    [Tags]    Android
    readResult    Test version property

STTL-116711 Application Test name property
    [Documentation]
    [Tags]    Android
    readResult    Test name property

STTL-116712 Application relativeDatabaseBlobFilePath with relative path
    [Documentation]
    [Tags]    Android
    readResult    relativeDatabaseBlobFilePath with relative path

STTL-116713 Application relativeDatabaseBlobFilePath with invalid relative path
    [Documentation]
    [Tags]    Android
    readResult    relativeDatabaseBlobFilePath with invalid relative path

STTL-116714 Application relativeDatabaseBlobFilePath with empty relative path
    [Documentation]
    [Tags]    Android
    readResult    relativeDatabaseBlobFilePath with empty relative path

STTL-116715 Application ExpandDatabaseBlobFilePath with relative path
    [Documentation]
    [Tags]    Android
    readResult    ExpandDatabaseBlobFilePath with relative path

STTL-116716 Application ExpandDatabaseBlobFilePath with invalid relative path
    [Documentation]
    [Tags]    Android
    readResult    ExpandDatabaseBlobFilePath with invalid relative path

STTL-116717 Application ExpandDatabaseBlobFilePath with empty relative path
    [Documentation]
    [Tags]    Android
    readResult    ExpandDatabaseBlobFilePath with empty relative path

STTL-116718 Application Test minimize method
    [Documentation]
    [Tags]    Android
    readResult    Test minimize method

STTL-116719 Application Test restore method
    [Documentation]
    [Tags]    Android
    readResult    Test restore method

