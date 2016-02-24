*** Settings ***
Library  appiumTests_EB.py

*** Test Cases ***
STTL-116701 RE22EBRE22_Keyhandling
    [Documentation]    Change Start page
    startRE22KeyhandlingModuleTests    STTL-116701

STTL-116702 RE22EBRE22_Keyhandling
    [Documentation]    Set HomeKey Value to Enter
    startRE22KeyhandlingModuleTests    STTL-116702

STTL-116703 RE22EBRE22_Keyhandling
    [Documentation]    Set HomeKey Value to Up Menu
    startRE22KeyhandlingModuleTests    STTL-116703

STTL-116704 RE22EBRE22_Keyhandling
    [Documentation]    Set HomeKey disabled with Homekey first
    startRE22KeyhandlingModuleTests    STTL-116704

STTL-116705 RE22EBRE22_Keyhandling
    [Documentation]    Set HomeKey disabled with Menukey first
    startRE22KeyhandlingModuleTests    STTL-116705

STTL-116706 RE22EBRE22_Keyhandling
    [Documentation]    KeyValue:All(Alphabets)- JavaScript function
    startRE22KeyhandlingModuleTests    STTL-116706

STTL-116707 RE22EBRE22_Keyhandling
    [Documentation]    KeyValue:All(Numeric, Arrow, Volume & PTT Keys)JavaScript function
    startRE22KeyhandlingModuleTests    STTL-116707

STTL-116708 RE22EBRE22_Keyhandling
    [Documentation]    KeyValue:All with event URL for alphabets
    startRE22KeyhandlingModuleTests    STTL-116708

STTL-116709 RE22EBRE22_Keyhandling
    [Documentation]    KeyValue:All with event URL for numeric
    startRE22KeyhandlingModuleTests    STTL-116709

STTL-116710 RE22EBRE22_Keyhandling
    [Documentation]    KeyValue:All with event URL for symbol keys
    startRE22KeyhandlingModuleTests    STTL-116710

STTL-116711 RE22EBRE22_Keyhandling
    [Documentation]    KeyValue:All with event URL for Function keys
    startRE22KeyhandlingModuleTests    STTL-116711

STTL-116712 RE22EBRE22_Keyhandling
    [Documentation]    KeyValue:All(Function & Special Keys)Json Object
    startRE22KeyhandlingModuleTests    STTL-116712

STTL-116713 RE22EBRE22_Keyhandling
    [Documentation]    KeyValue:All(Function & Special Keys)
    startRE22KeyhandlingModuleTests    STTL-116713

STTL-116714 RE22EBRE22_Keyhandling
    [Documentation]    KeyValue:Menu and Back Key
    startRE22KeyhandlingModuleTests    STTL-116714

STTL-116715 RE22EBRE22_Keyhandling
    [Documentation]    KeyValue:8(1 key) Dispatch:true
    startRE22KeyhandlingModuleTests    STTL-116715

STTL-116716 RE22EBRE22_Keyhandling
    [Documentation]    KeyValue:8(1 key) Dispatch:false
    startRE22KeyhandlingModuleTests    STTL-116716

STTL-116717 RE22EBRE22_Keyhandling
    [Documentation]    KeyValue:All  Dispatch:true for Numeric
    startRE22KeyhandlingModuleTests    STTL-116717

STTL-116718 RE22EBRE22_Keyhandling
    [Documentation]    KeyValue:All  Dispatch:true for alphabets and special keys
    startRE22KeyhandlingModuleTests    STTL-116718

STTL-116719 RE22EBRE22_Keyhandling
    [Documentation]    KeyValue:All  Dispatch:false for Numeric
    startRE22KeyhandlingModuleTests    STTL-116719

STTL-116720 RE22EBRE22_Keyhandling
    [Documentation]    KeyValue:All  Dispatch:false for Alphabets and Special Keys
    startRE22KeyhandlingModuleTests    STTL-116720

STTL-116721 RE22EBRE22_Keyhandling
    [Documentation]    Keyvalue 8
Remap:9
(Remap 1 to 2)
    startRE22KeyhandlingModuleTests    STTL-116721

STTL-116722 RE22EBRE22_Keyhandling
    [Documentation]    Keyvalue 61
Remap:10
(Remap Tab to 3)
    startRE22KeyhandlingModuleTests    STTL-116722

STTL-116723 RE22EBRE22_Keyhandling
    [Documentation]    Trigger Event Java Script function
    startRE22KeyhandlingModuleTests    STTL-116723

STTL-116724 RE22EBRE22_Keyhandling
    [Documentation]    KeyValue:All(Alphabets)- JavaScript function with iswindows key=1
    startRE22KeyhandlingModuleTests    STTL-116724

STTL-116725 RE22EBRE22_Keyhandling
    [Documentation]    KeyValue:All(Numeric, Arrow, Volume & PTT Keys)JavaScript function with iswindows key=1
    startRE22KeyhandlingModuleTests    STTL-116725

STTL-116726 RE22EBRE22_Keyhandling
    [Documentation]    KeyValue:All(Function & Special Keys) with iswindows key=1
    startRE22KeyhandlingModuleTests    STTL-116726

STTL-116727 RE22EBRE22_Keyhandling
    [Documentation]    Set HomeKey Value to Enter with windows key=1
    startRE22KeyhandlingModuleTests    STTL-116727

STTL-116728 RE22EBRE22_Keyhandling
    [Documentation]    KeyValue:8(1 key) Dispatch:true with windows key=1
    startRE22KeyhandlingModuleTests    STTL-116728

STTL-116729 RE22EBRE22_Keyhandling
    [Documentation]    KeyValue:8(1 key) Dispatch:false with windows key=1
    startRE22KeyhandlingModuleTests    STTL-116729

STTL-116730 RE22EBRE22_Keyhandling
    [Documentation]    Keyvalue 8
Remap:9
(Remap 1 to 2) with windows key=1
    startRE22KeyhandlingModuleTests    STTL-116730

