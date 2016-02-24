*** Settings ***
Library    jasmineTests.py
Library    config.py
Suite Setup    precondition

*** keywords ***
precondition
    waitTimeCapture    60
    startPath    Configuration/Applications/Application/General,StartPage,<StartPage value="http://127.0.0.1:8082/app/SystemTest/specRunner.html" name="Menu"/>

*** Test Cases ***
STTL-116701 System should return free server port
    [Documentation]
    [Tags]    Android
    readResult    should return free server port

STTL-116702 System VT300-037 - should return platform -
    [Documentation]
    [Tags]    Android
    readResult    VT300-037 - should return platform -

STTL-116703 System VT300-046 - set screenAutoRotate as false, call getProperty with screenAutoRotate - false
    [Documentation]
    [Tags]    Android
    readResult    VT300-046 - set screenAutoRotate as false, call getProperty with screenAutoRotate - false

STTL-116704 System VT300-047 - set screenAutoRotate as true, call getProperty with screenAutoRotate - true
    [Documentation]
    [Tags]    Android
    readResult    VT300-047 - set screenAutoRotate as true, call getProperty with screenAutoRotate - true

STTL-116705 System VT300-054 - set screenSleeping as true, call getProperty with screenSleeping - true
    [Documentation]
    [Tags]    Android
    readResult    VT300-054 - set screenSleeping as true, call getProperty with screenSleeping - true

STTL-116706 System VT300-055 - set screenSleeping as false, call getProperty with screenSleeping - false
    [Documentation]
    [Tags]    Android
    readResult    VT300-055 - set screenSleeping as false, call getProperty with screenSleeping - false

STTL-116707 System VT300-070 - Value of applicationIconBadge must be equal at getAllProperties and getProperty
    [Documentation]
    [Tags]    Android
    readResult    VT300-070 - Value of applicationIconBadge must be equal at getAllProperties and getProperty

STTL-116708 System VT300-070 - Value of application_icon_badge must be equal at getAllProperties and getProperty
    [Documentation]
    [Tags]    Android
    readResult    VT300-070 - Value of application_icon_badge must be equal at getAllProperties and getProperty

STTL-116709 System VT300-070 - Value of country must be equal at getAllProperties and getProperty
    [Documentation]
    [Tags]    Android
    readResult    VT300-070 - Value of country must be equal at getAllProperties and getProperty

STTL-116710 System VT300-070 - Value of deviceId must be equal at getAllProperties and getProperty
    [Documentation]
    [Tags]    Android
    readResult    VT300-070 - Value of deviceId must be equal at getAllProperties and getProperty

STTL-116711 System VT300-070 - Value of deviceName must be equal at getAllProperties and getProperty
    [Documentation]
    [Tags]    Android
    readResult    VT300-070 - Value of deviceName must be equal at getAllProperties and getProperty

STTL-116712 System VT300-070 - Value of deviceOwnerEmail must be equal at getAllProperties and getProperty
    [Documentation]
    [Tags]    Android
    readResult    VT300-070 - Value of deviceOwnerEmail must be equal at getAllProperties and getProperty

STTL-116713 System VT300-070 - Value of deviceOwnerName must be equal at getAllProperties and getProperty
    [Documentation]
    [Tags]    Android
    readResult    VT300-070 - Value of deviceOwnerName must be equal at getAllProperties and getProperty

STTL-116714 System VT300-070 - Value of devicePushId must be equal at getAllProperties and getProperty
    [Documentation]
    [Tags]    Android
    readResult    VT300-070 - Value of devicePushId must be equal at getAllProperties and getProperty

STTL-116715 System VT300-070 - Value of device_name must be equal at getAllProperties and getProperty
    [Documentation]
    [Tags]    Android
    readResult    VT300-070 - Value of device_name must be equal at getAllProperties and getProperty

STTL-116716 System VT300-070 - Value of device_owner_email must be equal at getAllProperties and getProperty
    [Documentation]
    [Tags]    Android
    readResult    VT300-070 - Value of device_owner_email must be equal at getAllProperties and getProperty

STTL-116717 System VT300-070 - Value of device_owner_name must be equal at getAllProperties and getProperty
    [Documentation]
    [Tags]    Android
    readResult    VT300-070 - Value of device_owner_name must be equal at getAllProperties and getProperty

STTL-116718 System VT300-070 - Value of device_push_id must be equal at getAllProperties and getProperty
    [Documentation]
    [Tags]    Android
    readResult    VT300-070 - Value of device_push_id must be equal at getAllProperties and getProperty

STTL-116719 System VT300-070 - Value of free_server_port must be equal at getAllProperties and getProperty
    [Documentation]
    [Tags]    Android
    readResult    VT300-070 - Value of free_server_port must be equal at getAllProperties and getProperty

STTL-116720 System VT300-070 - Value of hasCalendar must be equal at getAllProperties and getProperty
    [Documentation]
    [Tags]    Android
    readResult    VT300-070 - Value of hasCalendar must be equal at getAllProperties and getProperty

STTL-116721 System VT300-070 - Value of hasCamera must be equal at getAllProperties and getProperty
    [Documentation]
    [Tags]    Android
    readResult    VT300-070 - Value of hasCamera must be equal at getAllProperties and getProperty

STTL-116722 System VT300-070 - Value of hasCellNetwork must be equal at getAllProperties and getProperty
    [Documentation]
    [Tags]    Android
    readResult    VT300-070 - Value of hasCellNetwork must be equal at getAllProperties and getProperty

STTL-116723 System VT300-070 - Value of hasNetwork must be equal at getAllProperties and getProperty
    [Documentation]
    [Tags]    Android
    readResult    VT300-070 - Value of hasNetwork must be equal at getAllProperties and getProperty

STTL-116724 System VT300-070 - Value of hasSqlite must be equal at getAllProperties and getProperty
    [Documentation]
    [Tags]    Android
    readResult    VT300-070 - Value of hasSqlite must be equal at getAllProperties and getProperty

STTL-116725 System VT300-070 - Value of hasTouchscreen must be equal at getAllProperties and getProperty
    [Documentation]
    [Tags]    Android
    readResult    VT300-070 - Value of hasTouchscreen must be equal at getAllProperties and getProperty

STTL-116726 System VT300-070 - Value of hasWifiNetwork must be equal at getAllProperties and getProperty
    [Documentation]
    [Tags]    Android
    readResult    VT300-070 - Value of hasWifiNetwork must be equal at getAllProperties and getProperty

STTL-116727 System VT300-070 - Value of has_calendar must be equal at getAllProperties and getProperty
    [Documentation]
    [Tags]    Android
    readResult    VT300-070 - Value of has_calendar must be equal at getAllProperties and getProperty

STTL-116728 System VT300-070 - Value of has_camera must be equal at getAllProperties and getProperty
    [Documentation]
    [Tags]    Android
    readResult    VT300-070 - Value of has_camera must be equal at getAllProperties and getProperty

STTL-116729 System VT300-070 - Value of has_cell_network must be equal at getAllProperties and getProperty
    [Documentation]
    [Tags]    Android
    readResult    VT300-070 - Value of has_cell_network must be equal at getAllProperties and getProperty

STTL-116730 System VT300-070 - Value of has_network must be equal at getAllProperties and getProperty
    [Documentation]
    [Tags]    Android
    readResult    VT300-070 - Value of has_network must be equal at getAllProperties and getProperty

STTL-116731 System VT300-070 - Value of has_sqlite must be equal at getAllProperties and getProperty
    [Documentation]
    [Tags]    Android
    readResult    VT300-070 - Value of has_sqlite must be equal at getAllProperties and getProperty

STTL-116732 System VT300-070 - Value of has_touchscreen must be equal at getAllProperties and getProperty
    [Documentation]
    [Tags]    Android
    readResult    VT300-070 - Value of has_touchscreen must be equal at getAllProperties and getProperty

STTL-116733 System VT300-070 - Value of has_wifi_network must be equal at getAllProperties and getProperty
    [Documentation]
    [Tags]    Android
    readResult    VT300-070 - Value of has_wifi_network must be equal at getAllProperties and getProperty

STTL-116734 System VT300-070 - Value of httpProxyURI must be equal at getAllProperties and getProperty
    [Documentation]
    [Tags]    Android
    readResult    VT300-070 - Value of httpProxyURI must be equal at getAllProperties and getProperty

STTL-116735 System VT300-070 - Value of http_proxy_uri must be equal at getAllProperties and getProperty
    [Documentation]
    [Tags]    Android
    readResult    VT300-070 - Value of http_proxy_uri must be equal at getAllProperties and getProperty

STTL-116736 System VT300-070 - Value of http_proxy_url must be equal at getAllProperties and getProperty
    [Documentation]
    [Tags]    Android
    readResult    VT300-070 - Value of http_proxy_url must be equal at getAllProperties and getProperty

STTL-116737 System VT300-070 - Value of isEmulator must be equal at getAllProperties and getProperty
    [Documentation]
    [Tags]    Android
    readResult    VT300-070 - Value of isEmulator must be equal at getAllProperties and getProperty

STTL-116738 System VT300-070 - Value of isMotorolaDevice must be equal at getAllProperties and getProperty
    [Documentation]
    [Tags]    Android
    readResult    VT300-070 - Value of isMotorolaDevice must be equal at getAllProperties and getProperty

STTL-116739 System VT300-070 - Value of isRhoSimulator must be equal at getAllProperties and getProperty
    [Documentation]
    [Tags]    Android
    readResult    VT300-070 - Value of isRhoSimulator must be equal at getAllProperties and getProperty

STTL-116740 System VT300-070 - Value of isSymbolDevice must be equal at getAllProperties and getProperty
    [Documentation]
    [Tags]    Android
    readResult    VT300-070 - Value of isSymbolDevice must be equal at getAllProperties and getProperty

STTL-116741 System VT300-070 - Value of is_emulator must be equal at getAllProperties and getProperty
    [Documentation]
    [Tags]    Android
    readResult    VT300-070 - Value of is_emulator must be equal at getAllProperties and getProperty

STTL-116742 System VT300-070 - Value of is_motorola_device must be equal at getAllProperties and getProperty
    [Documentation]
    [Tags]    Android
    readResult    VT300-070 - Value of is_motorola_device must be equal at getAllProperties and getProperty

STTL-116743 System VT300-070 - Value of is_rho_simulator must be equal at getAllProperties and getProperty
    [Documentation]
    [Tags]    Android
    readResult    VT300-070 - Value of is_rho_simulator must be equal at getAllProperties and getProperty

STTL-116744 System VT300-070 - Value of is_symbol_device must be equal at getAllProperties and getProperty
    [Documentation]
    [Tags]    Android
    readResult    VT300-070 - Value of is_symbol_device must be equal at getAllProperties and getProperty

STTL-116745 System VT300-070 - Value of keyboardState must be equal at getAllProperties and getProperty
    [Documentation]
    [Tags]    Android
    readResult    VT300-070 - Value of keyboardState must be equal at getAllProperties and getProperty

STTL-116746 System VT300-070 - Value of keyboard_state must be equal at getAllProperties and getProperty
    [Documentation]
    [Tags]    Android
    readResult    VT300-070 - Value of keyboard_state must be equal at getAllProperties and getProperty

STTL-116747 System VT300-070 - Value of localServerPort must be equal at getAllProperties and getProperty
    [Documentation]
    [Tags]    Android
    readResult    VT300-070 - Value of localServerPort must be equal at getAllProperties and getProperty

STTL-116748 System VT300-070 - Value of local_server_port must be equal at getAllProperties and getProperty
    [Documentation]
    [Tags]    Android
    readResult    VT300-070 - Value of local_server_port must be equal at getAllProperties and getProperty

STTL-116749 System VT300-070 - Value of locale must be equal at getAllProperties and getProperty
    [Documentation]
    [Tags]    Android
    readResult    VT300-070 - Value of locale must be equal at getAllProperties and getProperty

STTL-116750 System VT300-070 - Value of lockWindowSize must be equal at getAllProperties and getProperty
    [Documentation]
    [Tags]    Android
    readResult    VT300-070 - Value of lockWindowSize must be equal at getAllProperties and getProperty

STTL-116751 System VT300-070 - Value of lock_window_size must be equal at getAllProperties and getProperty
    [Documentation]
    [Tags]    Android
    readResult    VT300-070 - Value of lock_window_size must be equal at getAllProperties and getProperty

STTL-116752 System VT300-070 - Value of main_window_closed must be equal at getAllProperties and getProperty
    [Documentation]
    [Tags]    Android
    readResult    VT300-070 - Value of main_window_closed must be equal at getAllProperties and getProperty

STTL-116753 System VT300-070 - Value of oemInfo must be equal at getAllProperties and getProperty
    [Documentation]
    [Tags]    Android
    readResult    VT300-070 - Value of oemInfo must be equal at getAllProperties and getProperty

STTL-116754 System VT300-070 - Value of oem_info must be equal at getAllProperties and getProperty
    [Documentation]
    [Tags]    Android
    readResult    VT300-070 - Value of oem_info must be equal at getAllProperties and getProperty

STTL-116755 System VT300-070 - Value of osVersion must be equal at getAllProperties and getProperty
    [Documentation]
    [Tags]    Android
    readResult    VT300-070 - Value of osVersion must be equal at getAllProperties and getProperty

STTL-116756 System VT300-070 - Value of os_version must be equal at getAllProperties and getProperty
    [Documentation]
    [Tags]    Android
    readResult    VT300-070 - Value of os_version must be equal at getAllProperties and getProperty

STTL-116757 System VT300-070 - Value of phoneId must be equal at getAllProperties and getProperty
    [Documentation]
    [Tags]    Android
    readResult    VT300-070 - Value of phoneId must be equal at getAllProperties and getProperty

STTL-116758 System VT300-070 - Value of phone_id must be equal at getAllProperties and getProperty
    [Documentation]
    [Tags]    Android
    readResult    VT300-070 - Value of phone_id must be equal at getAllProperties and getProperty

STTL-116759 System VT300-070 - Value of platform must be equal at getAllProperties and getProperty
    [Documentation]
    [Tags]    Android
    readResult    VT300-070 - Value of platform must be equal at getAllProperties and getProperty

STTL-116760 System VT300-070 - Value of ppiX must be equal at getAllProperties and getProperty
    [Documentation]
    [Tags]    Android
    readResult    VT300-070 - Value of ppiX must be equal at getAllProperties and getProperty

STTL-116761 System VT300-070 - Value of ppiY must be equal at getAllProperties and getProperty
    [Documentation]
    [Tags]    Android
    readResult    VT300-070 - Value of ppiY must be equal at getAllProperties and getProperty

STTL-116762 System VT300-070 - Value of ppi_x must be equal at getAllProperties and getProperty
    [Documentation]
    [Tags]    Android
    readResult    VT300-070 - Value of ppi_x must be equal at getAllProperties and getProperty

STTL-116763 System VT300-070 - Value of ppi_y must be equal at getAllProperties and getProperty
    [Documentation]
    [Tags]    Android
    readResult    VT300-070 - Value of ppi_y must be equal at getAllProperties and getProperty

STTL-116764 System VT300-070 - Value of realScreenHeight must be equal at getAllProperties and getProperty
    [Documentation]
    [Tags]    Android
    readResult    VT300-070 - Value of realScreenHeight must be equal at getAllProperties and getProperty

STTL-116765 System VT300-070 - Value of realScreenWidth must be equal at getAllProperties and getProperty
    [Documentation]
    [Tags]    Android
    readResult    VT300-070 - Value of realScreenWidth must be equal at getAllProperties and getProperty

STTL-116766 System VT300-070 - Value of real_screen_height must be equal at getAllProperties and getProperty
    [Documentation]
    [Tags]    Android
    readResult    VT300-070 - Value of real_screen_height must be equal at getAllProperties and getProperty

STTL-116767 System VT300-070 - Value of real_screen_width must be equal at getAllProperties and getProperty
    [Documentation]
    [Tags]    Android
    readResult    VT300-070 - Value of real_screen_width must be equal at getAllProperties and getProperty

STTL-116768 System VT300-070 - Value of screenAutoRotate must be equal at getAllProperties and getProperty
    [Documentation]
    [Tags]    Android
    readResult    VT300-070 - Value of screenAutoRotate must be equal at getAllProperties and getProperty

STTL-116769 System VT300-070 - Value of screenHeight must be equal at getAllProperties and getProperty
    [Documentation]
    [Tags]    Android
    readResult    VT300-070 - Value of screenHeight must be equal at getAllProperties and getProperty

STTL-116770 System VT300-070 - Value of screenOrientation must be equal at getAllProperties and getProperty
    [Documentation]
    [Tags]    Android
    readResult    VT300-070 - Value of screenOrientation must be equal at getAllProperties and getProperty

STTL-116771 System VT300-070 - Value of screenSleeping must be equal at getAllProperties and getProperty
    [Documentation]
    [Tags]    Android
    readResult    VT300-070 - Value of screenSleeping must be equal at getAllProperties and getProperty

STTL-116772 System VT300-070 - Value of screenWidth must be equal at getAllProperties and getProperty
    [Documentation]
    [Tags]    Android
    readResult    VT300-070 - Value of screenWidth must be equal at getAllProperties and getProperty

STTL-116773 System VT300-070 - Value of screen_auto_rotate must be equal at getAllProperties and getProperty
    [Documentation]
    [Tags]    Android
    readResult    VT300-070 - Value of screen_auto_rotate must be equal at getAllProperties and getProperty

STTL-116774 System VT300-070 - Value of screen_height must be equal at getAllProperties and getProperty
    [Documentation]
    [Tags]    Android
    readResult    VT300-070 - Value of screen_height must be equal at getAllProperties and getProperty

STTL-116775 System VT300-070 - Value of screen_orientation must be equal at getAllProperties and getProperty
    [Documentation]
    [Tags]    Android
    readResult    VT300-070 - Value of screen_orientation must be equal at getAllProperties and getProperty

STTL-116776 System VT300-070 - Value of screen_sleeping must be equal at getAllProperties and getProperty
    [Documentation]
    [Tags]    Android
    readResult    VT300-070 - Value of screen_sleeping must be equal at getAllProperties and getProperty

STTL-116777 System VT300-070 - Value of screen_width must be equal at getAllProperties and getProperty
    [Documentation]
    [Tags]    Android
    readResult    VT300-070 - Value of screen_width must be equal at getAllProperties and getProperty

STTL-116778 System VT300-070 - Value of uuid must be equal at getAllProperties and getProperty
    [Documentation]
    [Tags]    Android
    readResult    VT300-070 - Value of uuid must be equal at getAllProperties and getProperty

STTL-116779 System VT300-070 - Value of webviewFramework must be equal at getAllProperties and getProperty
    [Documentation]
    [Tags]    Android
    readResult    VT300-070 - Value of webviewFramework must be equal at getAllProperties and getProperty

STTL-116780 System VT300-070 - Value of webview_framework must be equal at getAllProperties and getProperty
    [Documentation]
    [Tags]    Android
    readResult    VT300-070 - Value of webview_framework must be equal at getAllProperties and getProperty

STTL-116781 System VT300-116 - set screenAutoRotate as false , call getProperty with screenAutoRotate - false
    [Documentation]
    [Tags]    Android
    readResult    VT300-116 - set screenAutoRotate as false , call getProperty with screenAutoRotate - false

STTL-116782 System VT300-115 - set screenAutoRotate as true , call getProperty with screenAutoRotate - true
    [Documentation]
    [Tags]    Android
    readResult    VT300-115 - set screenAutoRotate as true , call getProperty with screenAutoRotate - true

STTL-116783 System VT300-119 - set screenSleeping as true , call getProperty with screenSleeping - true
    [Documentation]
    [Tags]    Android
    readResult    VT300-119 - set screenSleeping as true , call getProperty with screenSleeping - true

STTL-116784 System VT300-120 - set screenSleeping as false , call getProperty with screenSleeping - false
    [Documentation]
    [Tags]    Android
    readResult    VT300-120 - set screenSleeping as false , call getProperty with screenSleeping - false

STTL-116785 System VT300-178 - call setproperties with screenSleeping as true, call getproperties with screenSleeping - true
    [Documentation]
    [Tags]    Android
    readResult    VT300-178 - call setproperties with screenSleeping as true, call getproperties with screenSleeping - true

STTL-116786 System VT300-179 - call setproperties with screenSleeping as false, call getproperties with screenSleeping - false
    [Documentation]
    [Tags]    Android
    readResult    VT300-179 - call setproperties with screenSleeping as false, call getproperties with screenSleeping - false

STTL-116787 System VT300-098 - Test zipFile method without password
    [Documentation]
    [Tags]    Android
    readResult    VT300-098 - Test zipFile method without password

STTL-116788 System VT300-097 - Test zipFle method with password
    [Documentation]
    [Tags]    Android
    readResult    VT300-097 - Test zipFle method with password

STTL-116789 System VT300-093 - Test unzipFile method without password
    [Documentation]
    [Tags]    Android
    readResult    VT300-093 - Test unzipFile method without password

STTL-116790 System VT300-094 - Test unzipFile method without password which requires password
    [Documentation]
    [Tags]    Android
    readResult    VT300-094 - Test unzipFile method without password which requires password

STTL-116791 System VT300-095 - Test unzipFile method with password
    [Documentation]
    [Tags]    Android
    readResult    VT300-095 - Test unzipFile method with password

STTL-116792 System VT300-96 - Test unzipFile method after calling zipfiles method
    [Documentation]
    [Tags]    Android
    readResult    VT300-96 - Test unzipFile method after calling zipfiles method

STTL-116793 System VT300-100 - Test zipFiles method without password
    [Documentation]
    [Tags]    Android
    readResult    VT300-100 - Test zipFiles method without password

STTL-116794 System VT300-099 - Test zipFiles method with password
    [Documentation]
    [Tags]    Android
    readResult    VT300-099 - Test zipFiles method with password

