*** Settings ***
Library    appiumTests_EB.py

*** Test Cases ***
STTL-116701 Application
    [Documentation]    Change Start page
    startApplicationModuleTests    STTL-116701

STTL-116702 Application
    [Documentation]    get defaultNative menu
    startApplicationModuleTests    STTL-116702

STTL-116703 Application
    [Documentation]    Security token not passed
    startApplicationModuleTests    STTL-116703

STTL-116704 Application
    [Documentation]    set StartUri to a web page
    startApplicationModuleTests    STTL-116704

STTL-116705 Application
    [Documentation]    set StartUri to a web page google
    startApplicationModuleTests    STTL-116705

STTL-116706 Application
    [Documentation]    database file path with pre defined db partition "local"
    startApplicationModuleTests    STTL-116706

STTL-116707 Application
    [Documentation]    database file path with pre defined db partition "user"
    startApplicationModuleTests    STTL-116707

STTL-116708 Application
    [Documentation]    database file path with pre defined db partition null
    startApplicationModuleTests    STTL-116708

STTL-116709 Application
    [Documentation]    Quit the application
    startApplicationModuleTests    STTL-116709

STTL-116710 Application
    [Documentation]    Minimize and quit the application
    startApplicationModuleTests    STTL-116710

STTL-116711 Application
    [Documentation]    Native menu with Callback, fullscreen,JS call back, seperator
    startApplicationModuleTests    STTL-116711

STTL-116712 Application
    [Documentation]    Redefine the legacy menu options such as back, home, log etc to perform different actions
    startApplicationModuleTests    STTL-116712

STTL-116713 Application
    [Documentation]    call a reserved menu item
    startApplicationModuleTests    STTL-116713

STTL-116714 Application
    [Documentation]    Check for Application event callback ScreenOff/ScreenOn with pressing power button
    startApplicationModuleTests    STTL-116714

STTL-116715 Application
    [Documentation]    Check for Application event callback with pressing power button after minimizing application
    startApplicationModuleTests    STTL-116715

STTL-116716 Application
    [Documentation]    Check for Application event callback with pressing power button after sending the app to background
    startApplicationModuleTests    STTL-116716

STTL-116717 Application
    [Documentation]    Check for Application event callback ScreenOff/ScreenOn with minimize/Restore
    startApplicationModuleTests    STTL-116717

STTL-116718 Application
    [Documentation]    Check for Application event callback ScreenOff/ScreenOn with background/foreground
    startApplicationModuleTests    STTL-116718

