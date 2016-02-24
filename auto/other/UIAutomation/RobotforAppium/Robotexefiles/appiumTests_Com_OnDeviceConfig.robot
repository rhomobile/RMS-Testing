*** Settings ***
Library    appiumTests_EB.py

*** Test Cases ***
STTL-116701 OnDeviceConfig
    [Documentation]    Change Start page
    startOnDeviceConfigModuleTests    STTL-116701

STTL-116702 OnDeviceConfig
    [Documentation]    On menu.htm page it should show settings button should be shown
    startOnDeviceConfigModuleTests    STTL-116702

STTL-116703 OnDeviceConfig
    [Documentation]    On click settings button it should load settings.html page
    startOnDeviceConfigModuleTests    STTL-116703

STTL-116704 OnDeviceConfig
    [Documentation]    On click back button on settings.html page its should take us back to return os page
    startOnDeviceConfigModuleTests    STTL-116704

STTL-116705 OnDeviceConfig
    [Documentation]    On click quit button on settings.html page its should quit EB
    startOnDeviceConfigModuleTests    STTL-116705

STTL-116706 OnDeviceConfig
    [Documentation]    set local file path to start path tag in settings.html and click on set config button
    startOnDeviceConfigModuleTests    STTL-116706

STTL-116707 OnDeviceConfig
    [Documentation]    Validation of startpath with local file path set in the previous test
    startOnDeviceConfigModuleTests    STTL-116707

STTL-116708 OnDeviceConfig
    [Documentation]    set http url path to start path tag in settings.html and click on set config button
    startOnDeviceConfigModuleTests    STTL-116708

STTL-116709 OnDeviceConfig
    [Documentation]    Validation of startpath with http file path set in the previous test
    startOnDeviceConfigModuleTests    STTL-116709

STTL-116710 OnDeviceConfig
    [Documentation]    validate setting ICON present in the badlink page
    startOnDeviceConfigModuleTests    STTL-116710

STTL-116711 OnDeviceConfig
    [Documentation]    Set startPath to default start path again
    startOnDeviceConfigModuleTests    STTL-116711

STTL-116712 OnDeviceConfig
    [Documentation]    set value to Debug button tag as 1 in settings.html and click on set config button
    startOnDeviceConfigModuleTests    STTL-116712

STTL-116713 OnDeviceConfig
    [Documentation]    validate debug buttons after setting to 1
    startOnDeviceConfigModuleTests    STTL-116713

STTL-116714 OnDeviceConfig
    [Documentation]    set value to Debug button tag as 0 in settings.html and click on set config button
    startOnDeviceConfigModuleTests    STTL-116714

STTL-116715 OnDeviceConfig
    [Documentation]    validate debug buttons after setting to 0
    startOnDeviceConfigModuleTests    STTL-116715

STTL-116716 OnDeviceConfig
    [Documentation]    set SettingsButton enabled
    startOnDeviceConfigModuleTests    STTL-116716

STTL-116717 OnDeviceConfig
    [Documentation]    validate SettingsButton is enabled
    startOnDeviceConfigModuleTests    STTL-116717

STTL-116718 OnDeviceConfig
    [Documentation]    set SettingsButton Disabled
    startOnDeviceConfigModuleTests    STTL-116718

STTL-116719 OnDeviceConfig
    [Documentation]    validate SettingsButton is disabled
    startOnDeviceConfigModuleTests    STTL-116719

STTL-116720 OnDeviceConfig
    [Documentation]    set SettingsButton enabled and set Setting Password Enable
    startOnDeviceConfigModuleTests    STTL-116720

STTL-116721 OnDeviceConfig
    [Documentation]    Validate Setting password with correct password and click OK button
    startOnDeviceConfigModuleTests    STTL-116721

STTL-116722 OnDeviceConfig
    [Documentation]    Validate Setting password with correct password and click Cancel button
    startOnDeviceConfigModuleTests    STTL-116722

STTL-116723 OnDeviceConfig
    [Documentation]    Validate Setting password with Wrong password and click OK button
    startOnDeviceConfigModuleTests    STTL-116723

STTL-116824 OnDeviceConfig
    [Documentation]    set Setting Password Enable and keep password empty
    startOnDeviceConfigModuleTests    STTL-116824

STTL-116825 OnDeviceConfig
    [Documentation]    set Setting Password Disable
    startOnDeviceConfigModuleTests    STTL-116825

STTL-116826 OnDeviceConfig
    [Documentation]    Validate Setting Password Disable
    startOnDeviceConfigModuleTests    STTL-116826

STTL-116827 OnDeviceConfig
    [Documentation]    set SettingsButton enabled and set Exit Password Enable
    startOnDeviceConfigModuleTests    STTL-116827

STTL-116828 OnDeviceConfig
    [Documentation]    Validate Exit password by clicking Debug button quit
    startOnDeviceConfigModuleTests    STTL-116828

STTL-116829 OnDeviceConfig
    [Documentation]    Validate Exit password by clicking CommonAPI quit
    startOnDeviceConfigModuleTests    STTL-116829

STTL-116830 OnDeviceConfig
    [Documentation]    Validate Exit password by clicking RE2.2 quit
    startOnDeviceConfigModuleTests    STTL-116830

STTL-116831 OnDeviceConfig
    [Documentation]    Validate Exit password by clicking PB quit
    startOnDeviceConfigModuleTests    STTL-116831

STTL-116832 OnDeviceConfig
    [Documentation]    Exit password with Empty value and click ok
    startOnDeviceConfigModuleTests    STTL-116832

STTL-116833 OnDeviceConfig
    [Documentation]    set SettingsButton enabled and set Exit Password Disable
    startOnDeviceConfigModuleTests    STTL-116833

STTL-116834 OnDeviceConfig
    [Documentation]    Validate Exit password Disable
    startOnDeviceConfigModuleTests    STTL-116834

STTL-116835 OnDeviceConfig
    [Documentation]    set Function Keys Capturable enable and Zoom-In and Zoom-out values
    startOnDeviceConfigModuleTests    STTL-116835

STTL-116836 OnDeviceConfig
    [Documentation]    Validate functionality of Zoom-In and Zoom-out
    startOnDeviceConfigModuleTests    STTL-116836

STTL-116837 OnDeviceConfig
    [Documentation]    set Function Keys Capturable Disable
    startOnDeviceConfigModuleTests    STTL-116837

STTL-116838 OnDeviceConfig
    [Documentation]    set username and password with correct value
    startOnDeviceConfigModuleTests    STTL-116838

STTL-116839 OnDeviceConfig
    [Documentation]    Validate username and password with correct value
    startOnDeviceConfigModuleTests    STTL-116839

STTL-116840 OnDeviceConfig
    [Documentation]    Reset and set to default settings
    startOnDeviceConfigModuleTests    STTL-116840

STTL-116841 OnDeviceConfig
    [Documentation]    Validate Reset
    startOnDeviceConfigModuleTests    STTL-116841

