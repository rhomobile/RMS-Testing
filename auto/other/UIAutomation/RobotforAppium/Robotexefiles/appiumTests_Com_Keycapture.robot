*** Settings ***
Library    appiumTests_EB.py

*** Test Cases ***
STTL-116701 Keycapture
    [Documentation]    Change Start page
    startKeycaptureModuleTests    STTL-116701

STTL-116702 Keycapture
    [Documentation]    call captureKey with dispatch true, keyValue for 1 and function callback
    startKeycaptureModuleTests    STTL-116702

STTL-116703 Keycapture
    [Documentation]    call captureKey with keyValue for 1 with dispatch false and function callback 
    startKeycaptureModuleTests    STTL-116703

STTL-116704 Keycapture
    [Documentation]    call captureKey Value for Menu and callback as Anonymous function
    startKeycaptureModuleTests    STTL-116704

STTL-116705 Keycapture
    [Documentation]    call captureKey with dispatch True, keyValue ALL and callback for numeric keys
    startKeycaptureModuleTests    STTL-116705

STTL-116706 Keycapture
    [Documentation]    call captureKey with dispatch True, keyValue ALL and callback for alphabets and special keys
    startKeycaptureModuleTests    STTL-116706

STTL-116707 Keycapture
    [Documentation]    call captureKey twice, dispatch false with KeyValue ALL first then true with particular key
    startKeycaptureModuleTests    STTL-116707

STTL-116708 Keycapture
    [Documentation]    call captureKey twice, dispatch true with particular key first then false with keyValue ALL
    startKeycaptureModuleTests    STTL-116708

STTL-116709 Keycapture
    [Documentation]    call captureKey twice, dispatch true with keyvalue ALL firts then false with particular key
    startKeycaptureModuleTests    STTL-116709

STTL-116710 Keycapture
    [Documentation]    call captureKey with different callback for 2 different keys
    startKeycaptureModuleTests    STTL-116710

STTL-116711 Keycapture
    [Documentation]    call captureKey twice , one with callback and other without callback
    startKeycaptureModuleTests    STTL-116711

STTL-116712 Keycapture
    [Documentation]    call captureKey twice , one with callback and other without callback for KeyValue ALL
    startKeycaptureModuleTests    STTL-116712

STTL-116713 Keycapture
    [Documentation]    call captureKey with dispatch True, keyValue ALL and callback (Numeric, Arrow, Volume & PTT Keys)
    startKeycaptureModuleTests    STTL-116713

STTL-116714 Keycapture
    [Documentation]    call captureKey to check the keyvalues of all hardware key(Alphabets)
    startKeycaptureModuleTests    STTL-116714

STTL-116715 Keycapture
    [Documentation]    call captureKey with dispatch True, keyValue ALL and callback (Function & Special Keys)(VT023,024 & 025)
    startKeycaptureModuleTests    STTL-116715

STTL-116716 Keycapture
    [Documentation]    call captureKey with no callback and dispatch false
    startKeycaptureModuleTests    STTL-116716

STTL-116717 Keycapture
    [Documentation]    call captureKey with no callback after setting P1/VolumeDown
    startKeycaptureModuleTests    STTL-116717

STTL-116718 Keycapture
    [Documentation]    call captureTrigger withfunction callback
    startKeycaptureModuleTests    STTL-116718

STTL-116719 Keycapture
    [Documentation]    call captureTrigger with callback as anonymous function
    startKeycaptureModuleTests    STTL-116719

STTL-116720 Keycapture
    [Documentation]    call captureTrigger with no callback after calling with callback
    startKeycaptureModuleTests    STTL-116720

STTL-116721 Keycapture
    [Documentation]    call remapKey with Enter and 1)
    startKeycaptureModuleTests    STTL-116721

STTL-116722 Keycapture
    [Documentation]    call remapKey with F1 and 9)
    startKeycaptureModuleTests    STTL-116722

STTL-116723 Keycapture
    [Documentation]    call remapKey with a and null)
    startKeycaptureModuleTests    STTL-116723

STTL-116824 Keycapture
    [Documentation]    call capturekey after remapKey
    startKeycaptureModuleTests    STTL-116824

STTL-116825 Keycapture
    [Documentation]    call capture key after remapKey and callback to fire with both key
    startKeycaptureModuleTests    STTL-116825

STTL-116826 Keycapture
    [Documentation]    call remap key after captureKey and callback to fire with both key
    startKeycaptureModuleTests    STTL-116826

STTL-116827 Keycapture
    [Documentation]    call captureKey with dispatch false, keyValue for 2 and press numeric key 1
    startKeycaptureModuleTests    STTL-116827

STTL-116828 Keycapture
    [Documentation]    Set HomeKey Value to Enter
    startKeycaptureModuleTests    STTL-116828

STTL-116829 Keycapture
    [Documentation]    Set HomeKey Value to Disabled
    startKeycaptureModuleTests    STTL-116829

STTL-116830 Keycapture
    [Documentation]    Set HomeKey Value to UpArrow
    startKeycaptureModuleTests    STTL-116830

STTL-116831 Keycapture
    [Documentation]    Set HomeKey Value to numeric Key 1
    startKeycaptureModuleTests    STTL-116831

STTL-116832 Keycapture
    [Documentation]    Set HomeKey Value to Alphabet Key C (caps)
    startKeycaptureModuleTests    STTL-116832

STTL-116833 Keycapture
    [Documentation]    Set HomeKey Value to Alphabet Key a
    startKeycaptureModuleTests    STTL-116833

STTL-116834 Keycapture
    [Documentation]    Set HomeKey Value to null
    startKeycaptureModuleTests    STTL-116834

STTL-116835 Keycapture
    [Documentation]    Set HomeKey Value to 1 and then 2
    startKeycaptureModuleTests    STTL-116835

STTL-116836 Keycapture
    [Documentation]    Call Capture Key after setting homeKey value
    startKeycaptureModuleTests    STTL-116836

STTL-116837 Keycapture
    [Documentation]    Call RemapKey after setting homeKey value
    startKeycaptureModuleTests    STTL-116837

STTL-116838 Keycapture
    [Documentation]    call remapKey after setting homeKeyValue and navigate to homepage 
    startKeycaptureModuleTests    STTL-116838

STTL-116839 Keycapture
    [Documentation]    Change isWindowsKey  to 1
    startKeycaptureModuleTests    STTL-116839

STTL-116840 Keycapture
    [Documentation]    KeyValue:All(Alphabets)- JavaScript function with iswindows key=1
    startKeycaptureModuleTests    STTL-116840

STTL-116841 Keycapture
    [Documentation]    KeyValue:All(Numeric, Arrow, Volume & PTT Keys)JavaScript function with iswindows key=1
    startKeycaptureModuleTests    STTL-116841

STTL-116842 Keycapture
    [Documentation]    KeyValue:All(Function & Special Keys) with iswindows key=1
    startKeycaptureModuleTests    STTL-116842

STTL-116843 Keycapture
    [Documentation]    Set HomeKey Value to Enter with windows key=1
    startKeycaptureModuleTests    STTL-116843

STTL-116844 Keycapture
    [Documentation]    KeyValue:8(1 key) Dispatch:true with windows key=1
    startKeycaptureModuleTests    STTL-116844

STTL-116845 Keycapture
    [Documentation]    KeyValue:8(1 key) Dispatch:false with windows key=1
    startKeycaptureModuleTests    STTL-116845

STTL-116846 Keycapture
    [Documentation]    Keyvalue 8 Remap:9 (Remap Enter to 1) with windows key=1
    startKeycaptureModuleTests    STTL-116846

