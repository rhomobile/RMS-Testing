*** Settings ***
Library    appiumTests_EB.py

*** Test Cases ***
STTL-116701 PBKeyhandling
    [Documentation]    Change Start page
    startPBKeyhandlingModuleTests    STTL-116701

STTL-116702 PBKeyhandling
    [Documentation]    Set HomeKey Value to Enter
    startPBKeyhandlingModuleTests    STTL-116702

STTL-116703 PBKeyhandling
    [Documentation]    KeyValue:8(1 key) Dispatch:true
    startPBKeyhandlingModuleTests    STTL-116703

STTL-116704 PBKeyhandling
    [Documentation]    KeyValue:8(1 key) Dispatch:false
    startPBKeyhandlingModuleTests    STTL-116704

STTL-116705 PBKeyhandling
    [Documentation]    KeyValue:All  Dispatch:true for Numeric
    startPBKeyhandlingModuleTests    STTL-116705

STTL-116706 PBKeyhandling
    [Documentation]    KeyValue:All  Dispatch:true for alphabets and special keys
    startPBKeyhandlingModuleTests    STTL-116706

STTL-116707 PBKeyhandling
    [Documentation]    KeyValue:All  Dispatch:false for Numeric
    startPBKeyhandlingModuleTests    STTL-116707

STTL-116708 PBKeyhandling
    [Documentation]    KeyValue:All  Dispatch:false for Alphabets and Special Keys
    startPBKeyhandlingModuleTests    STTL-116708

STTL-116709 PBKeyhandling
    [Documentation]    KeyValue:All Dispatch:Empty String ""
    startPBKeyhandlingModuleTests    STTL-116709

STTL-116710 PBKeyhandling
    [Documentation]    Scenario
    startPBKeyhandlingModuleTests    STTL-116710

STTL-116711 PBKeyhandling
    [Documentation]    Scenario
    startPBKeyhandlingModuleTests    STTL-116711

STTL-116712 PBKeyhandling
    [Documentation]    Keyvalue 8, Remap:9 (Remap 1 to 2)
    startPBKeyhandlingModuleTests    STTL-116712

STTL-116713 PBKeyhandling
    [Documentation]    Tag Pesrsitance Check Keyvalue 8(1), Remap:9(2)
    startPBKeyhandlingModuleTests    STTL-116713

STTL-116714 PBKeyhandling
    [Documentation]    Tag Pesrsitance Check with KeyValue All with dispatch
    startPBKeyhandlingModuleTests    STTL-116714

STTL-116715 PBKeyhandling
    [Documentation]    Tag Pesrsitance Check with KeyValue All 
    startPBKeyhandlingModuleTests    STTL-116715

STTL-116716 PBKeyhandling
    [Documentation]    Tag Pesrsitance Check-Homekey:8 (1key)
    startPBKeyhandlingModuleTests    STTL-116716

STTL-116717 PBKeyhandling
    [Documentation]    Set HomeKey Value to Up Arrow
    startPBKeyhandlingModuleTests    STTL-116717

STTL-116718 PBKeyhandling
    [Documentation]    Set HomeKey disabled
    startPBKeyhandlingModuleTests    STTL-116718

STTL-116719 PBKeyhandling
    [Documentation]    Set HomeKey value to enter and then empty string
    startPBKeyhandlingModuleTests    STTL-116719

STTL-116720 PBKeyhandling
    [Documentation]    KeyValue:All(Alphabets)
    startPBKeyhandlingModuleTests    STTL-116720

STTL-116721 PBKeyhandling
    [Documentation]    KeyValue:All(Numeric, Arrow, Volume & PTT Keys)
    startPBKeyhandlingModuleTests    STTL-116721

STTL-116722 PBKeyhandling
    [Documentation]    KeyValue:All with event URL for alphabets
    startPBKeyhandlingModuleTests    STTL-116722

STTL-116723 PBKeyhandling
    [Documentation]    KeyValue:All with event URL for numeric
    startPBKeyhandlingModuleTests    STTL-116723

STTL-116724 PBKeyhandling
    [Documentation]    KeyValue:All with event URL for symbol keys
    startPBKeyhandlingModuleTests    STTL-116724

STTL-116725 PBKeyhandling
    [Documentation]    KeyValue:All with event URL for Function keys
    startPBKeyhandlingModuleTests    STTL-116725

STTL-116726 PBKeyhandling
    [Documentation]    KeyValue:All(Function & Special Keys)
    startPBKeyhandlingModuleTests    STTL-116726

STTL-116727 PBKeyhandling
    [Documentation]    KeyValue:66(Enter Key)
    startPBKeyhandlingModuleTests    STTL-116727

STTL-116728 PBKeyhandling
    [Documentation]    KeyValue:Enter and Up Arrow
    startPBKeyhandlingModuleTests    STTL-116728

STTL-116729 PBKeyhandling
    [Documentation]    Trigger Event Java Script function
    startPBKeyhandlingModuleTests    STTL-116729

STTL-116730 PBKeyhandling
    [Documentation]    Trigger Event Url
    startPBKeyhandlingModuleTests    STTL-116730

STTL-116731 PBKeyhandling
    [Documentation]    Pressing BackSpace in index page
    startPBKeyhandlingModuleTests    STTL-116731

STTL-116732 PBKeyhandling
    [Documentation]    KeyValue:All(Alphabets)- JavaScript function with iswindows key=1
    startPBKeyhandlingModuleTests    STTL-116732

STTL-116733 PBKeyhandling
    [Documentation]    KeyValue:All(Numeric, Arrow, Volume & PTT Keys)JavaScript function with iswindows key=1
    startPBKeyhandlingModuleTests    STTL-116733

STTL-116734 PBKeyhandling
    [Documentation]    KeyValue:All(Function & Special Keys) with iswindows key=1
    startPBKeyhandlingModuleTests    STTL-116734

STTL-116735 PBKeyhandling
    [Documentation]    Set HomeKey Value to Enter with windows key=1
    startPBKeyhandlingModuleTests    STTL-116735

STTL-116736 PBKeyhandling
    [Documentation]    KeyValue:8(1 key) Dispatch:true with windows key=1
    startPBKeyhandlingModuleTests    STTL-116736

STTL-116737 PBKeyhandling
    [Documentation]    KeyValue:8(1 key) Dispatch:false with windows key=1
    startPBKeyhandlingModuleTests    STTL-116737

STTL-116738 PBKeyhandling
    [Documentation]    Keyvalue 8, Remap:9 (Remap 1 to 2) with windows key=1
    startPBKeyhandlingModuleTests    STTL-116738

