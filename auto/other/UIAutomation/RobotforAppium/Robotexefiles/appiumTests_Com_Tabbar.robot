*** Settings ***
Library    appiumTests_EB.py

*** Test Cases ***
STTL-116701 Tabbar
    [Documentation]    Change Start page
    startTabbarModuleTests    STTL-116701

STTL-116702 Tabbar
    [Documentation]    switch the active tab to second
    startTabbarModuleTests    STTL-116702

STTL-116703 Tabbar
    [Documentation]    Current tabindex on second page
    startTabbarModuleTests    STTL-116703

STTL-116704 Tabbar
    [Documentation]    Remove the Current Tab bar and replace with this one
    startTabbarModuleTests    STTL-116704

STTL-116705 Tabbar
    [Documentation]    Tabbar with background color for Tab
    startTabbarModuleTests    STTL-116705

STTL-116706 Tabbar
    [Documentation]    Remove the Current Tab bar and replace with this one along with reload
    startTabbarModuleTests    STTL-116706

STTL-116707 Tabbar
    [Documentation]    remove current tab and replaces with this one with useCurrentViewForTab as true
    startTabbarModuleTests    STTL-116707

STTL-116708 Tabbar
    [Documentation]    Change the selected color of the tab only for one tab
    startTabbarModuleTests    STTL-116708

STTL-116709 Tabbar
    [Documentation]    Disable the tab.
    startTabbarModuleTests    STTL-116709

STTL-116710 Tabbar
    [Documentation]    Tabbar with background color
    startTabbarModuleTests    STTL-116710

STTL-116711 Tabbar
    [Documentation]    Tabbar with callabck
    startTabbarModuleTests    STTL-116711

STTL-116712 Tabbar
    [Documentation]    Create tabbar at the bottom of the page
    startTabbarModuleTests    STTL-116712

STTL-116713 Tabbar
    [Documentation]    Create a Tabbar with 15 tabs
    startTabbarModuleTests    STTL-116713

STTL-116714 Tabbar
    [Documentation]    SwitchTab by passing  tabindex as zero 
    startTabbarModuleTests    STTL-116714

STTL-116715 Tabbar
    [Documentation]    call remove without creating any Tabbar
    startTabbarModuleTests    STTL-116715

STTL-116716 Tabbar
    [Documentation]    CurrentTab index on Main Page
    startTabbarModuleTests    STTL-116716

STTL-116717 Tabbar
    [Documentation]    Tabbar with anonymous callabck
    startTabbarModuleTests    STTL-116717

