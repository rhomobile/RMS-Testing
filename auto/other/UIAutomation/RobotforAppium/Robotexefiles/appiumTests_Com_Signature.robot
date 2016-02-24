*** Settings ***
Library    appiumTests_EB.py

*** Test Cases ***
STTL-116701 Signature
    [Documentation]    Change Start page
    startSignatureModuleTests    STTL-116701

STTL-116702 Signature
    [Documentation]    Call takeFullScreen with callback as function and retruned status OK
    startSignatureModuleTests    STTL-116702

STTL-116703 Signature
    [Documentation]    Call takeFullScreen with callback as function and retruned status cancel
    startSignatureModuleTests    STTL-116703

STTL-116704 Signature
    [Documentation]    Call takeFullScreen with callback as anonymous function
    startSignatureModuleTests    STTL-116704

STTL-116705 Signature
    [Documentation]    Call takeFullScreen and press clear
    startSignatureModuleTests    STTL-116705

STTL-116706 Signature
    [Documentation]    Call takeFullScreen with callback as function and minimize
    startSignatureModuleTests    STTL-116706

STTL-116707 Signature
    [Documentation]    Call takeFullScreen with callback as function and suspend the device
    startSignatureModuleTests    STTL-116707

STTL-116708 Signature
    [Documentation]    Call capture with callback as function and returned status OK
    startSignatureModuleTests    STTL-116708

STTL-116709 Signature
    [Documentation]    Call capture with callback as anonymous function
    startSignatureModuleTests    STTL-116709

STTL-116710 Signature
    [Documentation]    Call show and then call capture and clear
    startSignatureModuleTests    STTL-116710

STTL-116711 Signature
    [Documentation]    Call takeFullScreen with bgColor as #0000FF(RGB), penColor as #FFFFFF00 and callback
    startSignatureModuleTests    STTL-116711

STTL-116712 Signature
    [Documentation]    Call takeFullScreen with bgColor as #FFFFFF00 (ARGB), penColor as #FF00FF(RGB), penWidth as 1 and callback
    startSignatureModuleTests    STTL-116712

STTL-116713 Signature
    [Documentation]    Call takeFullScreen after setting bgColor as #FF87CEEB, penColor as #FF8B0000 and penWidth as 5
    startSignatureModuleTests    STTL-116713

STTL-116714 Signature
    [Documentation]    Call takeFullScreen with setting compressionFormat as jpg, fileName as VT299-0015 and outputFormat as Image
    startSignatureModuleTests    STTL-116714

STTL-116715 Signature
    [Documentation]    Call takeFullScreen after setting compressionFormat as png, fileName as VT299-016 and outputFormat as Image
    startSignatureModuleTests    STTL-116715

STTL-116716 Signature
    [Documentation]    Call takeFullScreen with compressionFormat as bmp, fileName as VT299-017 and outputFormat as Image
    startSignatureModuleTests    STTL-116716

STTL-116717 Signature
    [Documentation]    Call takeFullScreen with compressionFormat as jpg, fileName as Test and outputFormat as dataUri
    startSignatureModuleTests    STTL-116717

STTL-116718 Signature
    [Documentation]    Call show with bgColor as #FFFF8C00 (ARGB), penColor as #00FF00(RGB), penWidth as 1, and callback
    startSignatureModuleTests    STTL-116718

STTL-116719 Signature
    [Documentation]    Call show with left as 20, top as 70, width as 250 and height as 200, border as false and callback
    startSignatureModuleTests    STTL-116719

STTL-116720 Signature
    [Documentation]    Call show with left as 20, top as 70, width as 250 and height as 200, border as false and callback
    startSignatureModuleTests    STTL-116720

STTL-116721 Signature
    [Documentation]    Call show with left as 10, top as 50, width as 180 and height as 120, border as false and outputFormat as dataURI
    startSignatureModuleTests    STTL-116721

STTL-116722 Signature
    [Documentation]    Call show after setting all properties and outputFormat as dataURI
    startSignatureModuleTests    STTL-116722

STTL-116723 Signature
    [Documentation]    Call takeFullScreen with left,top,width,height and border
    startSignatureModuleTests    STTL-116723

STTL-116724 Signature
    [Documentation]    Call setVectorCallback with function callback
    startSignatureModuleTests    STTL-116724

STTL-116725 Signature
    [Documentation]    Call setVectorCallback with anonymous callback
    startSignatureModuleTests    STTL-116725

STTL-116726 Signature
    [Documentation]    Call setVectorCallback with takeFullScreen
    startSignatureModuleTests    STTL-116726

STTL-116727 Signature
    [Documentation]    Call setVectorCallback with capture and dataURI
    startSignatureModuleTests    STTL-116727

STTL-116728 Signature
    [Documentation]    Call takeFullScreen with default path
    startSignatureModuleTests    STTL-116728

STTL-116729 Signature
    [Documentation]    Call show and capture with default path
    startSignatureModuleTests    STTL-116729

STTL-116730 Signature
    [Documentation]    Call show and then call hide and then call show again
    startSignatureModuleTests    STTL-116730

STTL-116731 Signature
    [Documentation]    Call show and minimize
    startSignatureModuleTests    STTL-116731

STTL-116732 Signature
    [Documentation]    Call show and suspend the device
    startSignatureModuleTests    STTL-116732

STTL-116733 Signature
    [Documentation]    Call show and scroll the page on screen
    startSignatureModuleTests    STTL-116733

STTL-116734 Signature
    [Documentation]    Call show and rotate the device
    startSignatureModuleTests    STTL-116734

STTL-116735 Signature
    [Documentation]    Call takeFullScreen and rotate the device portrait to landscape
    startSignatureModuleTests    STTL-116735

STTL-116736 Signature
    [Documentation]    Call takeFullScreen and rotate the device  landscape to portrait
    startSignatureModuleTests    STTL-116736

STTL-116737 Signature
    [Documentation]    Call takeFullScreen with callback as function and wait for timeout
    startSignatureModuleTests    STTL-116737

