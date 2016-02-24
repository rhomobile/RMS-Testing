*** Settings ***
Library    appiumTests_EB.py

*** Test Cases ***
STTL-116701 System
    [Documentation]    Change Start page
    startSystemModuleTests    STTL-116701

STTL-116702 System
    [Documentation]    call getProperty with country
    startSystemModuleTests    STTL-116702

STTL-116703 System
    [Documentation]    call getProperty with deviceName
    startSystemModuleTests    STTL-116703

STTL-116704 System
    [Documentation]    call getAllProperties()
    startSystemModuleTests    STTL-116704

STTL-116705 System
    [Documentation]    Application install for Android
    startSystemModuleTests    STTL-116705

STTL-116706 System
    [Documentation]    Is TestApp.apk Application Installed Android
    startSystemModuleTests    STTL-116706

STTL-116707 System
    [Documentation]    Call runApplication with app name 'com.rhomobile.testapp
    startSystemModuleTests    STTL-116707

STTL-116708 System
    [Documentation]    call getStartParams() 
    startSystemModuleTests    STTL-116708

STTL-116709 System
    [Documentation]    Call applicationUninstall with application name 'com.rhomobile.testapp'
    startSystemModuleTests    STTL-116709

STTL-116710 System
    [Documentation]    call openUrl() with http://www.google.co.in
    startSystemModuleTests    STTL-116710

STTL-116711 System
    [Documentation]    HTTP Proxy URI : Proxy should set successfully to http://wwwgate0.mot.com:1080
    startSystemModuleTests    STTL-116711

STTL-116712 System
    [Documentation]    call getproperties with country,deviceName, devicePushId, freeServerPort and sync callback
    startSystemModuleTests    STTL-116712

STTL-116713 System
    [Documentation]    call getproperties with country
    startSystemModuleTests    STTL-116713

STTL-116714 System
    [Documentation]    call getproperties with deviceName
    startSystemModuleTests    STTL-116714

STTL-116715 System
    [Documentation]    call getproperties with platform
    startSystemModuleTests    STTL-116715

STTL-116716 System
    [Documentation]    call getproperties with callback as async defined function
    startSystemModuleTests    STTL-116716

STTL-116717 System
    [Documentation]    Navigate to Google
    startSystemModuleTests    STTL-116717

STTL-116718 System
    [Documentation]    call getProperty with deviceOwnerEmail
    startSystemModuleTests    STTL-116718

STTL-116719 System
    [Documentation]    call getProperty with deviceOwnerName
    startSystemModuleTests    STTL-116719

STTL-116720 System
    [Documentation]    call getProperty with devicePushId
    startSystemModuleTests    STTL-116720

STTL-116721 System
    [Documentation]    call getProperty with freeServerPort
    startSystemModuleTests    STTL-116721

STTL-116722 System
    [Documentation]    call getProperty with hasCalendar
    startSystemModuleTests    STTL-116722

STTL-116723 System
    [Documentation]    call getProperty with hasCamera
    startSystemModuleTests    STTL-116723

STTL-116724 System
    [Documentation]    call getProperty with isRhoSimulator
    startSystemModuleTests    STTL-116724

STTL-116725 System
    [Documentation]    call getProperty with hasTouchscreen
    startSystemModuleTests    STTL-116725

STTL-116726 System
    [Documentation]    call getProperty with isEmulator
    startSystemModuleTests    STTL-116726

STTL-116727 System
    [Documentation]    call getProperty with isMotorolaDevice
    startSystemModuleTests    STTL-116727

STTL-116728 System
    [Documentation]    call getProperty with localServerPort
    startSystemModuleTests    STTL-116728

STTL-116729 System
    [Documentation]    call getProperty with oeminfo
    startSystemModuleTests    STTL-116729

STTL-116730 System
    [Documentation]    call getProperty with osVersion
    startSystemModuleTests    STTL-116730

STTL-116731 System
    [Documentation]    call getProperty with phoneId
    startSystemModuleTests    STTL-116731

STTL-116732 System
    [Documentation]    call getProperty with ppiX
    startSystemModuleTests    STTL-116732

STTL-116733 System
    [Documentation]    call getProperty with ppiY
    startSystemModuleTests    STTL-116733

STTL-116734 System
    [Documentation]    call getProperty with realScreenHeight
    startSystemModuleTests    STTL-116734

STTL-116735 System
    [Documentation]    call getProperty with realScreenWidth
    startSystemModuleTests    STTL-116735

STTL-116736 System
    [Documentation]    call getProperty with screenHeight
    startSystemModuleTests    STTL-116736

STTL-116737 System
    [Documentation]    call getProperty with screenWidth
    startSystemModuleTests    STTL-116737

STTL-116938 System
    [Documentation]    call getProperty with uuid
    startSystemModuleTests    STTL-116938

STTL-116939 System
    [Documentation]    call getProperty with webviewFramework
    startSystemModuleTests    STTL-116939

STTL-116940 System
    [Documentation]    call getProperties with deviceOwnerEmail
    startSystemModuleTests    STTL-116940

STTL-116941 System
    [Documentation]    call getProperties with deviceOwnerName
    startSystemModuleTests    STTL-116941

STTL-116942 System
    [Documentation]    call getProperties with devicePushId
    startSystemModuleTests    STTL-116942

STTL-116943 System
    [Documentation]    call getProperties with freeServerPort
    startSystemModuleTests    STTL-116943

STTL-116944 System
    [Documentation]    call getProperties with hasCalendar
    startSystemModuleTests    STTL-116944

STTL-116945 System
    [Documentation]    call getProperties with hasCamera
    startSystemModuleTests    STTL-116945

STTL-116946 System
    [Documentation]    call getProperties with hasTouchscreen
    startSystemModuleTests    STTL-116946

STTL-116947 System
    [Documentation]    call getProperties with isMotorolaDevice
    startSystemModuleTests    STTL-116947

STTL-116948 System
    [Documentation]    call getProperties with localServerPort
    startSystemModuleTests    STTL-116948

STTL-116949 System
    [Documentation]    call getProperties with oeminfo
    startSystemModuleTests    STTL-116949

STTL-116950 System
    [Documentation]    call getProperties with osVersion
    startSystemModuleTests    STTL-116950

STTL-116951 System
    [Documentation]    call getProperties with phoneId
    startSystemModuleTests    STTL-116951

STTL-116952 System
    [Documentation]    call getProperties with ppiX
    startSystemModuleTests    STTL-116952

STTL-116953 System
    [Documentation]    call getProperties with ppiY
    startSystemModuleTests    STTL-116953

STTL-116954 System
    [Documentation]    call getProperties with realScreenHeight
    startSystemModuleTests    STTL-116954

STTL-116955 System
    [Documentation]    call getProperties with realScreenWidth
    startSystemModuleTests    STTL-116955

STTL-116956 System
    [Documentation]    call getProperties with screenHeight
    startSystemModuleTests    STTL-116956

STTL-116957 System
    [Documentation]    call getProperties with screenWidth
    startSystemModuleTests    STTL-116957

STTL-116958 System
    [Documentation]    call getProperties with uuid
    startSystemModuleTests    STTL-116958

STTL-116959 System
    [Documentation]    call getProperties with webviewFramework
    startSystemModuleTests    STTL-116959

STTL-116960 System
    [Documentation]    call getProperties with hasSqlite
    startSystemModuleTests    STTL-116960

STTL-116961 System
    [Documentation]    run the application on device,call getproperties with isEmulator
    startSystemModuleTests    STTL-116961

STTL-116962 System
    [Documentation]    call getproperties with locale
    startSystemModuleTests    STTL-116962

STTL-116963 System
    [Documentation]    call getproperties with phoneNumber
    startSystemModuleTests    STTL-116963

STTL-116964 System
    [Documentation]    call getproperty with Platform
    startSystemModuleTests    STTL-116964

STTL-116965 System
    [Documentation]    call getproperty with screenOrientation
    startSystemModuleTests    STTL-116965

STTL-116966 System
    [Documentation]    call getproperties with screenOrientation
    startSystemModuleTests    STTL-116966

STTL-116967 System
    [Documentation]    call getproperty with isSymbolDevice
    startSystemModuleTests    STTL-116967

STTL-116968 System
    [Documentation]    call setproperties with screenAutoRotate as true and check getproperties
    startSystemModuleTests    STTL-116968

STTL-116969 System
    [Documentation]    call setproperties with screenAutoRotate as true and check getproperties
    startSystemModuleTests    STTL-116969

STTL-116970 System
    [Documentation]    Open the application associated with the URL
    startSystemModuleTests    STTL-116970

STTL-116971 System
    [Documentation]    call openUrl for image file from /sdcard
    startSystemModuleTests    STTL-116971

STTL-116972 System
    [Documentation]    call setproperty with screenAutoRotate as true and check getproperty
    startSystemModuleTests    STTL-116972

STTL-116973 System
    [Documentation]    call setproperty with screenAutoRotate ate as false and check getproperty
    startSystemModuleTests    STTL-116973

STTL-116974 System
    [Documentation]    call getproperties with callback as sync defined function
    startSystemModuleTests    STTL-116974

STTL-116975 System
    [Documentation]    call getproperties with callback as anonymous defined function
    startSystemModuleTests    STTL-116975

STTL-116976 System
    [Documentation]    call getproperty with callback as async defined function
    startSystemModuleTests    STTL-116976

STTL-116977 System
    [Documentation]    call getproperty with callback as anonymous defined function
    startSystemModuleTests    STTL-116977

STTL-116978 System
    [Documentation]    call getproperty with locale
    startSystemModuleTests    STTL-116978

STTL-116979 System
    [Documentation]    call getproperty with hasWifiNetwork
    startSystemModuleTests    STTL-116979

STTL-116980 System
    [Documentation]    call getproperty with hasWifiNetwork as false
    startSystemModuleTests    STTL-116980

