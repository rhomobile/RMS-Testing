*** Settings ***
Library    appiumTests_EB.py

*** Test Cases ***
STTL-116701 Webview
    [Documentation]    Change Start page
    startWebviewModuleTests    STTL-116701

STTL-116702 Webview
    [Documentation]    get activeTab as 1
    startWebviewModuleTests    STTL-116702

STTL-116703 Webview
    [Documentation]    get activeTab as 0
    startWebviewModuleTests    STTL-116703

STTL-116704 Webview
    [Documentation]    Get enableCache as True
    startWebviewModuleTests    STTL-116704

STTL-116705 Webview
    [Documentation]    Do not set enableCache in Config.xml
    startWebviewModuleTests    STTL-116705

STTL-116706 Webview
    [Documentation]    Don't set enablePageLoadingIndication
    startWebviewModuleTests    STTL-116706

STTL-116707 Webview
    [Documentation]    Change pageload indication to 0
    startWebviewModuleTests    STTL-116707

STTL-116708 Webview
    [Documentation]    Get the value of enablePageLoadingIndication as false
    startWebviewModuleTests    STTL-116708

STTL-116709 Webview
    [Documentation]    Change pageload indication to 1
    startWebviewModuleTests    STTL-116709

STTL-116710 Webview
    [Documentation]    Get the value of enablePageLoadingIndication as true
    startWebviewModuleTests    STTL-116710

STTL-116711 Webview
    [Documentation]    don't set enableZoom 
    startWebviewModuleTests    STTL-116711

STTL-116712 Webview
    [Documentation]    Get enableZoom as false
    startWebviewModuleTests    STTL-116712

STTL-116914 Webview
    [Documentation]    Get enableZoom as true
    startWebviewModuleTests    STTL-116914

STTL-116915 Webview
    [Documentation]    get webviewFramework
    startWebviewModuleTests    STTL-116915

STTL-116916 Webview
    [Documentation]    Get fullScreen value without setting
    startWebviewModuleTests    STTL-116916

STTL-116917 Webview
    [Documentation]    set fullScreen as true
    startWebviewModuleTests    STTL-116917

STTL-116918 Webview
    [Documentation]    Get fullScreen value by setting it to true and rotating the device lefthanded
    startWebviewModuleTests    STTL-116918

STTL-116919 Webview
    [Documentation]    set fullScreen as false
    startWebviewModuleTests    STTL-116919

STTL-116920 Webview
    [Documentation]    Call navigate to online page with tabindex as 1
    startWebviewModuleTests    STTL-116920

STTL-116921 Webview
    [Documentation]    Call navigate to Secure page with tabindex as 4
    startWebviewModuleTests    STTL-116921

STTL-116922 Webview
    [Documentation]    Call navigateBack to online page with tabindex as 1
    startWebviewModuleTests    STTL-116922

STTL-116923 Webview
    [Documentation]    Call navigateBack with no tabindex
    startWebviewModuleTests    STTL-116923

STTL-116924 Webview
    [Documentation]    Call navigateBack with tabindex as 0
    startWebviewModuleTests    STTL-116924

STTL-116925 Webview
    [Documentation]    Call refresh with no tabindex
    startWebviewModuleTests    STTL-116925

STTL-116926 Webview
    [Documentation]    Call refresh with tabindex as 0
    startWebviewModuleTests    STTL-116926

STTL-116927 Webview
    [Documentation]    Call refresh with tabindex as 1
    startWebviewModuleTests    STTL-116927

STTL-116928 Webview
    [Documentation]    Call save with no tabindex
    startWebviewModuleTests    STTL-116928

STTL-116929 Webview
    [Documentation]    Call save with index as 1
    startWebviewModuleTests    STTL-116929

STTL-116930 Webview
    [Documentation]    Call save with index as 4
    startWebviewModuleTests    STTL-116930

