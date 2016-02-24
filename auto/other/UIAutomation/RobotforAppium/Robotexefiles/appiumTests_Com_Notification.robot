*** Settings ***
Library    appiumTests_EB.py

*** Test Cases ***
STTL-116701 Notification
    [Documentation]    Change Start page
    startNotificationModuleTests    STTL-116701

STTL-116702 Notification
    [Documentation]    showPopup up and then hide Pop up
    startNotificationModuleTests    STTL-116702

STTL-116703 Notification
    [Documentation]    showStatus
    startNotificationModuleTests    STTL-116703

STTL-116704 Notification
    [Documentation]    showStatus with all null parameters
    startNotificationModuleTests    STTL-116704

STTL-116705 Notification
    [Documentation]    should display a status message on android when app is in foreground
    startNotificationModuleTests    STTL-116705

STTL-116706 Notification
    [Documentation]    should display a toast message on android when application is in background
    startNotificationModuleTests    STTL-116706

STTL-116707 Notification
    [Documentation]    should check the behavior of toast when message length is too large
    startNotificationModuleTests    STTL-116707

STTL-116708 Notification
    [Documentation]    should check the behavior of toast when status_text is empty in showStatus
    startNotificationModuleTests    STTL-116708

STTL-116709 Notification
    [Documentation]    should display a normal pop up if no type has mentioned
    startNotificationModuleTests    STTL-116709

STTL-116710 Notification
    [Documentation]    Should check the default functionality of showPopup when application is in background.
    startNotificationModuleTests    STTL-116710

STTL-116711 Notification
    [Documentation]    should display a popup when types is only EB.Notification.TYPE_DIALOG
    startNotificationModuleTests    STTL-116711

STTL-116712 Notification
    [Documentation]    should display a popup when types is only EB.Notification.TYPE_DIALOG when application is in background
    startNotificationModuleTests    STTL-116712

STTL-116713 Notification
    [Documentation]    should display a notification in notification bar when app is in background when types is only notification.
    startNotificationModuleTests    STTL-116713

STTL-116714 Notification
    [Documentation]    should display a notification in notification bar when app is in background when types is only EB.TYPE_NOTIFICATION.
    startNotificationModuleTests    STTL-116714

STTL-116715 Notification
    [Documentation]    should not display any notification in notification bar when app is in foreground when types is only notification.
    startNotificationModuleTests    STTL-116715

STTL-116716 Notification
    [Documentation]    should display user defined icon in notification bar with message with type Rho.Notification.TYPE_NOTIFICATION
    startNotificationModuleTests    STTL-116716

STTL-116717 Notification
    [Documentation]    Should allow to interact with application from notification area without activating the application when types is only notificationDialog.
    startNotificationModuleTests    STTL-116717

STTL-116718 Notification
    [Documentation]    Should allow to interact with application from notification area without activating the application when types is only EB.TYPE_NOTIFICATION_DIALOG.
    startNotificationModuleTests    STTL-116718

STTL-116719 Notification
    [Documentation]    should display a dialog when app is in foreground when types is only notificationDialog
    startNotificationModuleTests    STTL-116719

STTL-116720 Notification
    [Documentation]    should display a alert(!) icon in notification bar with message
    startNotificationModuleTests    STTL-116720

STTL-116721 Notification
    [Documentation]    should display a question(?) icon in notification bar with message
    startNotificationModuleTests    STTL-116721

STTL-116722 Notification
    [Documentation]    should display a info icon in notification bar with message
    startNotificationModuleTests    STTL-116722

STTL-116723 Notification
    [Documentation]    should display application icon in notification bar with message when no icon param provided (default behavior)
    startNotificationModuleTests    STTL-116723

STTL-116724 Notification
    [Documentation]    should display a alert(!) icon in notification bar with buttons with type Rho.Notification.TYPE_NOTIFICATION_DIALOG
    startNotificationModuleTests    STTL-116724

STTL-116725 Notification
    [Documentation]    should display a question(?) icon in notification bar with buttons and with type Rho.Notification.TYPE_NOTIFICATION_DIALOG
    startNotificationModuleTests    STTL-116725

STTL-116726 Notification
    [Documentation]    should display a info icon in notification bar with buttons and with type Rho.Notification.TYPE_NOTIFICATION_DIALOG
    startNotificationModuleTests    STTL-116726

STTL-116727 Notification
    [Documentation]    should display application icon in notification bar with message and buttons when no icon param provided (default behavior) and with type Rho.Notification.TYPE_NOTIFICATION_DIALOG
    startNotificationModuleTests    STTL-116727

STTL-116728 Notification
    [Documentation]    should display user defined icon in notification bar with message and buttons and with type Rho.Notification.TYPE_NOTIFICATION_DIALOG
    startNotificationModuleTests    STTL-116728

STTL-116729 Notification
    [Documentation]    showPopup with only Message
    startNotificationModuleTests    STTL-116729

STTL-116730 Notification
    [Documentation]    showPopup with Message and title as well
    startNotificationModuleTests    STTL-116730

STTL-116731 Notification
    [Documentation]    showPopup with Message, title and predefined icon
    startNotificationModuleTests    STTL-116731

STTL-116732 Notification
    [Documentation]    show popup- with buttons and callback
    startNotificationModuleTests    STTL-116732

STTL-116733 Notification
    [Documentation]    showPopup with all null parameters and only button
    startNotificationModuleTests    STTL-116733

