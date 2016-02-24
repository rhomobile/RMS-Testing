*** Settings ***
Library    appiumTests_EB.py

*** Test Cases ***
STTL-116701 PB
    [Documentation]    Change Start page Gesture
    startPBGestureModuleTests    STTL-116701

STTL-116702 PB
    [Documentation]    Gesture - Gesture Type=linear
    startPBGestureModuleTests    STTL-116702

STTL-116703 PB
    [Documentation]    Gesture Gesture Type=Hold
    startPBGestureModuleTests    STTL-116703

STTL-116704 PB
    [Documentation]    Change Start Page Control and appearance
    startPBControlAppearanceModuleTests    STTL-116704

STTL-116705 PB
    [Documentation]    Addressbar Visible
    startPBControlAppearanceModuleTests    STTL-116705

STTL-116706 PB
    [Documentation]    Addressbar Hidden
    startPBControlAppearanceModuleTests    STTL-116706

STTL-116707 PB
    [Documentation]    Addressbar using the Keypad
    startPBControlAppearanceModuleTests    STTL-116707

STTL-116708 PB
    [Documentation]    BackButton Visible
    startPBControlAppearanceModuleTests    STTL-116708

STTL-116709 PB
    [Documentation]    BackButton Hidden
    startPBControlAppearanceModuleTests    STTL-116709

STTL-116710 PB
    [Documentation]    HomeButton Visible
    startPBControlAppearanceModuleTests    STTL-116710

STTL-116711 PB
    [Documentation]    HomeButton Hidden
    startPBControlAppearanceModuleTests    STTL-116711

STTL-116712 PB
    [Documentation]    ForwardButton Visible
    startPBControlAppearanceModuleTests    STTL-116712

STTL-116713 PB
    [Documentation]    ForwardButton Hidden
    startPBControlAppearanceModuleTests    STTL-116713

STTL-116714 PB
    [Documentation]    GoButton Visible
    startPBControlAppearanceModuleTests    STTL-116714

STTL-116715 PB
    [Documentation]    GoButton Hidden
    startPBControlAppearanceModuleTests    STTL-116715

STTL-116716 PB
    [Documentation]    MinimizeButton Visible
    startPBControlAppearanceModuleTests    STTL-116716

STTL-116717 PB
    [Documentation]    QuitButton Visible
    startPBControlAppearanceModuleTests    STTL-116717

STTL-116718 PB
    [Documentation]    ReloadButton Visible and functionality Test
    startPBControlAppearanceModuleTests    STTL-116718

STTL-116719 PB
    [Documentation]    SipButton Visible &  functionality Test
    startPBControlAppearanceModuleTests    STTL-116719

STTL-116720 PB
    [Documentation]    StopButton Visible
    startPBControlAppearanceModuleTests    STTL-116720

STTL-116721 PB
    [Documentation]    Stopbutton Functionality Test
    startPBControlAppearanceModuleTests    STTL-116721

STTL-116722 PB
    [Documentation]    ZoomtextButton functionality Test
    startPBControlAppearanceModuleTests    STTL-116722

STTL-116723 PB
    [Documentation]    QuitButton Visible
    startPBControlAppearanceModuleTests    STTL-116723

STTL-116724 PB
    [Documentation]    Change Start page Key handling
    startPBKeyhandlingModuleTests    STTL-116724

STTL-116725 PB
    [Documentation]    Set HomeKey Value to Enter
    startPBKeyhandlingModuleTests    STTL-116725

STTL-116726 PB
    [Documentation]    KeyValue:All  Dispatch:true for alphabets and special keys
    startPBKeyhandlingModuleTests    STTL-116726

STTL-116727 PB
    [Documentation]    KeyValue:All  Dispatch:false for Alphabets and Special Keys
    startPBKeyhandlingModuleTests    STTL-116727

STTL-116728 PB
    [Documentation]    Change Start page Generic
    startPBGenericModuleTests    STTL-116728

STTL-116729 PB
    [Documentation]    Generic ActiveX Object UUID
    startPBGenericModuleTests    STTL-116729

STTL-116730 PB
    [Documentation]    Generic ActiveX Object OEM Information String for the terminal
    startPBGenericModuleTests    STTL-116730

STTL-116731 PB
    [Documentation]    Change Start page device & application
    startPBDeviceApplicationModuleTests    STTL-116731

STTL-116732 PB
    [Documentation]    Set the alarm
    startPBDeviceApplicationModuleTests    STTL-116732

STTL-116733 PB
    [Documentation]    Restore with ApplicationEvent
    startPBDeviceApplicationModuleTests    STTL-116733

STTL-116734 PB
    [Documentation]    Hourglass visible
    startPBDeviceApplicationModuleTests    STTL-116734

STTL-116735 PB
    [Documentation]    ScreenOrientation with javascript
    startPBDeviceApplicationModuleTests    STTL-116735

STTL-116736 PB
    [Documentation]    Textsize as smallest
    startPBDeviceApplicationModuleTests    STTL-116736

STTL-116737 PB
    [Documentation]    Timer with url when  start method interval is set
    startPBDeviceApplicationModuleTests    STTL-116737

STTL-116738 PB
    [Documentation]    Change Start Page EMML
    startPBEMML11ModuleTests    STTL-116738

STTL-116739 PB
    [Documentation]    Addressbar 
    startPBEMML11ModuleTests    STTL-116739

STTL-116740 PB
    [Documentation]    Linear Gesture
    startPBEMML11ModuleTests    STTL-116740

STTL-116741 PB
    [Documentation]    Hold Gesture
    startPBEMML11ModuleTests    STTL-116741

STTL-116742 PB
    [Documentation]    Change Start Page EMML Profiles
    startPBEMMLProfilesModuleTests    STTL-116742

STTL-116743 PB
    [Documentation]    Imager Persistant
    startPBEMMLProfilesModuleTests    STTL-116743

STTL-116744 PB
    [Documentation]    Change Start Page File Management
    startPBFileManagementModuleTests    STTL-116744

STTL-116745 PB
    [Documentation]    HTTP Server to device
    startPBFileManagementModuleTests    STTL-116745

STTL-116746 PB
    [Documentation]    Device File Systen to HTTP server
    startPBFileManagementModuleTests    STTL-116746

STTL-116747 PB
    [Documentation]    FTP Server to Device
    startPBFileManagementModuleTests    STTL-116747

STTL-116748 PB
    [Documentation]    Device File System to FTP Server
    startPBFileManagementModuleTests    STTL-116748

STTL-116749 PB
    [Documentation]    Change Start page Imager
    startPBImagerModuleTests    STTL-116749

STTL-116750 PB
    [Documentation]    Imager
    startPBImagerModuleTests    STTL-116750

STTL-116751 PB
    [Documentation]    Change Start page PB Battery
    startPBBatteryModuleTests    STTL-116751

STTL-116752 PB
    [Documentation]    Battery visible 
    startPBBatteryModuleTests    STTL-116752

STTL-116753 PB
    [Documentation]    Change Start page PB Signal
    startPBSignalModuleTests    STTL-116753

STTL-116754 PB
    [Documentation]    Signal Visible
    startPBSignalModuleTests    STTL-116754

STTL-116755 PB
    [Documentation]    Change Start page PB Signature
    startPBSignatureModuleTests    STTL-116755

STTL-116756 PB
    [Documentation]    TransferEvent URL
    startPBSignatureModuleTests    STTL-116756

STTL-116757 PB
    [Documentation]    Change Start Page PB APD
    startPBApdModuleTests    STTL-116757

STTL-116758 PB
    [Documentation]    Show Progress Bar Command 0113
    startPBApdModuleTests    STTL-116758

STTL-116759 RE22
    [Documentation]    Change Start page RE22 Gesture
    startRE22GestureModuleTests    STTL-116759

STTL-116760 RE22
    [Documentation]    Gesture - Gesture Type=linear
    startRE22GestureModuleTests    STTL-116760

STTL-116761 RE22
    [Documentation]    Hold gesture - Preset value to Center
    startRE22GestureModuleTests    STTL-116761

STTL-116762 RE22
    [Documentation]    Change Start page RE22 Imager
    startRE22ImagerModuleTests    STTL-116762

STTL-116763 RE22
    [Documentation]    Imager Event with destination to ftp of JSON Object type
    startRE22ImagerModuleTests    STTL-116763

STTL-116764 RE22
    [Documentation]    Imager(URI) | Display the captured Image after setting co-ordinates of viewfinder
    startRE22ImagerModuleTests    STTL-116764

STTL-116765 RE22
    [Documentation]    Change Start page RE22 Generic
        STTL-116765

STTL-116766 RE22
    [Documentation]    Call UUID method
        STTL-116766

STTL-116767 RE22
    [Documentation]    OEMInfo Method
        STTL-116767

STTL-116768 RE22
    [Documentation]    Change Start page RE22 DA
    startRE22DeviceApplicationModuleTests    STTL-116768

STTL-116769 RE22
    [Documentation]    Set the alarm with Repeat value to true.
    startRE22DeviceApplicationModuleTests    STTL-116769

STTL-116770 RE22
    [Documentation]    Application with Quit
    startRE22DeviceApplicationModuleTests    STTL-116770

STTL-116771 RE22
    [Documentation]    Minimize with javascript ApplicationEvent
    startRE22DeviceApplicationModuleTests    STTL-116771

STTL-116772 RE22
    [Documentation]    PowerOn Event URL Offline page
    startRE22DeviceApplicationModuleTests    STTL-116772

STTL-116773 RE22
    [Documentation]    SIP with Automatic
    startRE22DeviceApplicationModuleTests    STTL-116773

STTL-116774 RE22
    [Documentation]    Zoom- page parameter value greater than 1
    startRE22DeviceApplicationModuleTests    STTL-116774

STTL-116775 RE22
    [Documentation]    Change Start page RE22 C&A
    startRE22ControlAppearanceModuleTests    STTL-116775

STTL-116776 RE22
    [Documentation]    Addressbar Functionality Test
    startRE22ControlAppearanceModuleTests    STTL-116776

STTL-116777 RE22
    [Documentation]    Change Start page RE22 Key handling
    startRE22KeyhandlingModuleTests    STTL-116777

STTL-116778 RE22
    [Documentation]    Set HomeKey disabled with Homekey first
    startRE22KeyhandlingModuleTests    STTL-116778

STTL-116779 RE22
    [Documentation]    KeyValue:All  Dispatch:true for Numeric
    startRE22KeyhandlingModuleTests    STTL-116779

STTL-116780 RE22
    [Documentation]    KeyValue:8(1 key) Dispatch:true
    startRE22KeyhandlingModuleTests    STTL-116780

STTL-116781 RE22
    [Documentation]    Change Start page RE22 Network
    startRE22NetworkModuleTests    STTL-116781

STTL-116782 RE22
    [Documentation]    Network Event with valid server IP
    startRE22NetworkModuleTests    STTL-116782

STTL-116783 RE22
    [Documentation]    Check NetworkPollInterval
    startRE22NetworkModuleTests    STTL-116783

STTL-116784 RE22
    [Documentation]    Check Network event of HTTP url type
    startRE22NetworkModuleTests    STTL-116784

STTL-116785 RE22
    [Documentation]    Change Start page RE22 Signal
    startRE22SignalModuleTests    STTL-116785

STTL-116786 RE22
    [Documentation]    Signal visible
    startRE22SignalModuleTests    STTL-116786

STTL-116787 RE22
    [Documentation]    Signal Event
    startRE22SignalModuleTests    STTL-116787

STTL-116788 RE22
    [Documentation]    Signal Event with URL
    startRE22SignalModuleTests    STTL-116788

STTL-116789 RE22
    [Documentation]    Change Start page RE22 Battery
    startRE22BatteryModuleTests    STTL-116789

STTL-116790 RE22
    [Documentation]    Battery visible
    startRE22BatteryModuleTests    STTL-116790

STTL-116791 RE22
    [Documentation]    BatteryEvent
    startRE22BatteryModuleTests    STTL-116791

STTL-116792 RE22
    [Documentation]    Change Start page RE22 Signature Capture
    startRE22SignatureModuleTests    STTL-116792

STTL-116793 RE22
    [Documentation]    SignatureCapture Visible
    startRE22SignatureModuleTests    STTL-116793

STTL-116794 RE22
    [Documentation]    SignatureCapture Destination(http)
    startRE22SignatureModuleTests    STTL-116794

STTL-116795 RE22
    [Documentation]    Vectortransfer Event
    startRE22SignatureModuleTests    STTL-116795

STTL-116796 RE22
    [Documentation]    Change Start page RE22 APD
    startRE22APDModuleTests    STTL-116796

STTL-116797 RE22
    [Documentation]    PSExternalEx Method
    startRE22APDModuleTests    STTL-116797

STTL-116798 RE22
    [Documentation]    Change Start page RE22 Rawsensors
    startRE22RawSensorsModuleTests    STTL-116798

STTL-116799 RE22
    [Documentation]    Enable all
    startRE22RawSensorsModuleTests    STTL-116799

STTL-116800 RE22
    [Documentation]    RawSensor event as HTTP URL
    startRE22RawSensorsModuleTests    STTL-116800

STTL-116801 RE22
    [Documentation]    Change Start page RE22 File Management
    startRE22FileManagementModuleTests    STTL-116801

STTL-116802 RE22
    [Documentation]    HTTP Server to device FileTransfer
    startRE22FileManagementModuleTests    STTL-116802

STTL-116803 RE22
    [Documentation]    Device File Transfer to FTP
    startRE22FileManagementModuleTests    STTL-116803

STTL-116804 CommonAPI
    [Documentation]    Change Start page Key Capture
    startKeycaptureModuleTests    STTL-116804

STTL-116805 CommonAPI
    [Documentation]    Set HomeKey Value to Enter
    startKeycaptureModuleTests    STTL-116805

STTL-116806 CommonAPI
    [Documentation]    Set HomeKey Value to Disabled
    startKeycaptureModuleTests    STTL-116806

STTL-116807 CommonAPI
    [Documentation]    call captureKey with dispatch True, keyValue ALL and callback for numeric keys
    startKeycaptureModuleTests    STTL-116807

STTL-116808 CommonAPI
    [Documentation]    call captureKey with different callback for 2 different keys
    startKeycaptureModuleTests    STTL-116808

STTL-116809 CommonAPI
    [Documentation]    call captureKey with no callback and dispatch false
    startKeycaptureModuleTests    STTL-116809

STTL-116810 CommonAPI
    [Documentation]    call captureTrigger with callback as anonymous function
    startKeycaptureModuleTests    STTL-116810

STTL-116811 CommonAPI
    [Documentation]    call remapKey with Enter and 1)
    startKeycaptureModuleTests    STTL-116811

STTL-116812 CommonAPI
    [Documentation]    Set HomeKey Value to 1 and then 2
    startKeycaptureModuleTests    STTL-116812

STTL-116813 CommonAPI
    [Documentation]    call captureKey with dispatch false, keyValue for 2 and press numeric key 1
    startKeycaptureModuleTests    STTL-116813

STTL-116814 CommonAPI
    [Documentation]    Change Start page Application
    startApplicationModuleTests    STTL-116814

STTL-116815 CommonAPI
    [Documentation]    set StartUri to a web page
    startApplicationModuleTests    STTL-116815

STTL-116816 CommonAPI
    [Documentation]    database file path with pre defined db partition "local"
    startApplicationModuleTests    STTL-116816

STTL-116817 CommonAPI
    [Documentation]    Minimize and quit the application
    startApplicationModuleTests    STTL-116817

STTL-116818 CommonAPI
    [Documentation]    Quit the application
    startApplicationModuleTests    STTL-116818

STTL-116819 CommonAPI
    [Documentation]    Security token not passed
    startApplicationModuleTests    STTL-116819

STTL-116820 CommonAPI
    [Documentation]    Native menu with Callback, fullscreen,JS call back, seperator
    startApplicationModuleTests    STTL-116820

STTL-116821 CommonAPI
    [Documentation]    Change Start page ToolBar
    startToolbarModuleTests    STTL-116821

STTL-116822 CommonAPI
    [Documentation]    Create a toolbar for Testing with label and icon for each of the action elements
    startToolbarModuleTests    STTL-116822

STTL-116823 CommonAPI
    [Documentation]    Create a toolbar for Testing with coloured icon for one of the buttons
    startToolbarModuleTests    STTL-116823

STTL-116824 CommonAPI
    [Documentation]    remove ToolBar
    startToolbarModuleTests    STTL-116824

STTL-116825 CommonAPI
    [Documentation]    Create a Toolbar for testing different set of Actions
    startToolbarModuleTests    STTL-116825

STTL-116826 CommonAPI
    [Documentation]    Create toolabar to with action to call a javascript method
    startToolbarModuleTests    STTL-116826

STTL-116827 CommonAPI
    [Documentation]    Create Toolbar with seperator and width parameter
    startToolbarModuleTests    STTL-116827

STTL-116828 CommonAPI
    [Documentation]    Change Start page Tabbar
    startTabbarModuleTests    STTL-116828

STTL-116829 CommonAPI
    [Documentation]    switch the active tab to second
    startTabbarModuleTests    STTL-116829

STTL-116830 CommonAPI
    [Documentation]    Current tabindex on second page
    startTabbarModuleTests    STTL-116830

STTL-116831 CommonAPI
    [Documentation]    Remove the Current Tab bar and replace with this one
    startTabbarModuleTests    STTL-116831

STTL-116832 CommonAPI
    [Documentation]    Tabbar with background color for Tab
    startTabbarModuleTests    STTL-116832

STTL-116833 CommonAPI
    [Documentation]    Change Start page notification
    startNotificationModuleTests    STTL-116833

STTL-116834 CommonAPI
    [Documentation]    showStatus
    startNotificationModuleTests    STTL-116834

STTL-116835 CommonAPI
    [Documentation]    show popup- with buttons and callback
    startNotificationModuleTests    STTL-116835

STTL-116836 CommonAPI
    [Documentation]    should display a popup when types is only EB.Notification.TYPE_DIALOG when application is in background
    startNotificationModuleTests    STTL-116836

STTL-116837 CommonAPI
    [Documentation]    should display a notification in notification bar when app is in background when types is only notification.
    startNotificationModuleTests    STTL-116837

STTL-116838 CommonAPI
    [Documentation]    should display a notification in notification bar when app is in background when types is only EB.TYPE_NOTIFICATION.
    startNotificationModuleTests    STTL-116838

STTL-116839 CommonAPI
    [Documentation]    Should allow to interact with application from notification area without activating the application when types is only notificationDialog.
    startNotificationModuleTests    STTL-116839

STTL-116840 CommonAPI
    [Documentation]    showPopup with Message and title , icon and buttons, with callback for buttton
    startNotificationModuleTests    STTL-116840

STTL-116841 CommonAPI
    [Documentation]    Change Start page network
    startNetworkModuleTests    STTL-116841

STTL-116842 CommonAPI
    [Documentation]    startStatusNotify without pollinterval
    startNetworkModuleTests    STTL-116842

STTL-116843 CommonAPI
    [Documentation]    hasWifiNetwork with Cell network
    startNetworkModuleTests    STTL-116843

STTL-116844 CommonAPI
    [Documentation]    hasNetwork with wifi
    startNetworkModuleTests    STTL-116844

STTL-116845 CommonAPI
    [Documentation]    hasWifiNetwork with wifi network
    startNetworkModuleTests    STTL-116845

STTL-116846 CommonAPI
    [Documentation]    stopStatusNotify
    startNetworkModuleTests    STTL-116846

STTL-116847 CommonAPI
    [Documentation]    Change Start page ScreenOrientation
    startScreenOrientationModuleTests    STTL-116847

STTL-116848 CommonAPI
    [Documentation]    ScreenOrientation RightHanded
    startScreenOrientationModuleTests    STTL-116848

STTL-116849 CommonAPI
    [Documentation]    autorRotate as true and rotate device manually
    startScreenOrientationModuleTests    STTL-116849

STTL-116850 CommonAPI
    [Documentation]    ScreenOrientation Normal
    startScreenOrientationModuleTests    STTL-116850

STTL-116851 CommonAPI
    [Documentation]    ScreenOrientation RightHanded
    startScreenOrientationModuleTests    STTL-116851

STTL-116852 CommonAPI
    [Documentation]    Change Start page System
    startSystemModuleTests    STTL-116852

STTL-116853 CommonAPI
    [Documentation]    call getproperty with Platform
    startSystemModuleTests    STTL-116853

STTL-116854 CommonAPI
    [Documentation]    Call applicationUninstall with application name 'com.rhomobile.testapp'
    startSystemModuleTests    STTL-116854

STTL-116855 CommonAPI
    [Documentation]    call getAllProperties()
    startSystemModuleTests    STTL-116855

STTL-116856 CommonAPI
    [Documentation]    call getproperties with deviceName
    startSystemModuleTests    STTL-116856

STTL-116857 CommonAPI
    [Documentation]    call getProperty with country
    startSystemModuleTests    STTL-116857

STTL-116858 CommonAPI
    [Documentation]    Application install for Android
    startSystemModuleTests    STTL-116858

STTL-116859 CommonAPI
    [Documentation]    Call runApplication with app name 'com.rhomobile.testapp
    startSystemModuleTests    STTL-116859

STTL-116860 CommonAPI
    [Documentation]    call setproperty with screenAutoRotate as true and check getproperty
    startSystemModuleTests    STTL-116860

STTL-116861 CommonAPI
    [Documentation]    call getProperty with deviceName
    startSystemModuleTests    STTL-116861

STTL-116862 CommonAPI
    [Documentation]    call getproperties with country
    startSystemModuleTests    STTL-116862

STTL-116863 CommonAPI
    [Documentation]    call getproperties with callback as async defined function
    startSystemModuleTests    STTL-116863

STTL-116864 CommonAPI
    [Documentation]    call getproperties with country,deviceName, devicePushId, freeServerPort and sync callback
    startSystemModuleTests    STTL-116864

STTL-116865 CommonAPI
    [Documentation]    Is TestApp.apk Application Installed Android
    startSystemModuleTests    STTL-116865

STTL-116866 CommonAPI
    [Documentation]    call setproperty with screenAutoRotate ate as false and check getproperty
    startSystemModuleTests    STTL-116866

STTL-116867 CommonAPI
    [Documentation]    Change Start page Webview
    startWebviewModuleTests    STTL-116867

STTL-116868 CommonAPI
    [Documentation]    Get enableZoom as true
    startWebviewModuleTests    STTL-116868

STTL-116869 CommonAPI
    [Documentation]    Call save with index as 1
    startWebviewModuleTests    STTL-116869

STTL-116870 CommonAPI
    [Documentation]    set fullScreen as false
    startWebviewModuleTests    STTL-116870

STTL-116871 CommonAPI
    [Documentation]    Call refresh with tabindex as 1
    startWebviewModuleTests    STTL-116871

STTL-116872 CommonAPI
    [Documentation]    Change Start page Battery
    startBatteryModuleTests    STTL-116872

STTL-116873 CommonAPI
    [Documentation]    Battery showIcon all property
    startBatteryModuleTests    STTL-116873

STTL-116874 CommonAPI
    [Documentation]    batteryStatus with callback and trigger to periodic with default refreshInterval value
    startBatteryModuleTests    STTL-116874

STTL-116875 CommonAPI
    [Documentation]    Change Start page Signal
    startSignalModuleTests    STTL-116875

STTL-116876 CommonAPI
    [Documentation]    Signal showIcon all property
    startSignalModuleTests    STTL-116876

STTL-116877 CommonAPI
    [Documentation]    wlanStatus with callback
    startSignalModuleTests    STTL-116877

STTL-116878 CommonAPI
    [Documentation]    Change Start page Intent
    startIntentModuleTests    STTL-116878

STTL-116879 CommonAPI
    [Documentation]    intentType - StartActivity: Launch target application by 'packageName', which is installed but not running.
    startIntentModuleTests    STTL-116879

STTL-116880 CommonAPI
    [Documentation]    intentType - Start service of the test appliation
    startIntentModuleTests    STTL-116880

STTL-116881 CommonAPI
    [Documentation]    intentType - Broadcast data from test app and receive back at test app
    startIntentModuleTests    STTL-116881

STTL-116882 CommonAPI
    [Documentation]    category - Launch browser from test application by setting category "CATEGORY_APP_BROWSER" and action "ACTION_MAIN"
    startIntentModuleTests    STTL-116882

STTL-116883 CommonAPI
    [Documentation]    mimeType - Launch Message application from test app by setting mimeType "vnd.android-dir/mms-sms" and Data to "<Some HTML text>"
    startIntentModuleTests    STTL-116883

STTL-116884 CommonAPI
    [Documentation]    appName - Launch Android application via 'appName' (packageName) from test application.
    startIntentModuleTests    STTL-116884

STTL-116885 CommonAPI
    [Documentation]    uri - Launch URL via browser appliation from test app by setting URI "http://www.google.com"
    startIntentModuleTests    STTL-116885

STTL-116886 CommonAPI
    [Documentation]    uri - Launch Message application with data from test app by setting URI "sms:9611896991"
    startIntentModuleTests    STTL-116886

STTL-116887 CommonAPI
    [Documentation]    uri - Launch dialler with pre-filled number from test application by setting URI "tel:9611896991" and with Action: ACTION_DIAL'
    startIntentModuleTests    STTL-116887

STTL-116888 CommonAPI
    [Documentation]    Callback : Send an Intent and the same intent details should be seen in the callback.
    startIntentModuleTests    STTL-116888

STTL-116889 CommonAPI
    [Documentation]    Start Listening to the background intents - broadcast messages (receiving broadcast messages)
    startIntentModuleTests    STTL-116889

STTL-116890 CommonAPI
    [Documentation]    Stop Listening to the background intents
    startIntentModuleTests    STTL-116890

STTL-116891 CommonAPI
    [Documentation]    Sending array of data with the intent
    startIntentModuleTests    STTL-116891

STTL-116892 CommonAPI
    [Documentation]    Change Start page Signature
    startSignatureModuleTests    STTL-116892

STTL-116893 CommonAPI
    [Documentation]    Call takeFullScreen with callback as function and retruned status OK
    startSignatureModuleTests    STTL-116893

STTL-116894 CommonAPI
    [Documentation]    Call takeFullScreen with callback as function and retruned status cancel
    startSignatureModuleTests    STTL-116894

STTL-116895 CommonAPI
    [Documentation]    Call show and capture with default path
    startSignatureModuleTests    STTL-116895

STTL-116896 CommonAPI
    [Documentation]    Call takeFullScreen with setting compressionFormat as jpg, fileName as VT299-0015 and outputFormat as Image
    startSignatureModuleTests    STTL-116896

STTL-116897 CommonAPI
    [Documentation]    Call takeFullScreen with compressionFormat as jpg, fileName as Test and outputFormat as dataUri
    startSignatureModuleTests    STTL-116897

STTL-116898 CommonAPI
    [Documentation]    Call show with bgColor as #FFFF8C00 (ARGB), penColor as #00FF00(RGB), penWidth as 1, and callback
    startSignatureModuleTests    STTL-116898

STTL-116899 CommonAPI
    [Documentation]    Call show after setting all properties and outputFormat as dataURI
    startSignatureModuleTests    STTL-116899

STTL-116900 CommonAPI
    [Documentation]    Call setVectorCallback with function callback
    startSignatureModuleTests    STTL-116900

STTL-116901 CommonAPI
    [Documentation]    Call show and then call capture and clear
    startSignatureModuleTests    STTL-116901

STTL-116902 CommonAPI
    [Documentation]    Call show and rotate the device
    startSignatureModuleTests    STTL-116902

STTL-116903 CommonAPI
    [Documentation]    Call takeFullScreen and rotate the device portrait to landscape
    startSignatureModuleTests    STTL-116903

