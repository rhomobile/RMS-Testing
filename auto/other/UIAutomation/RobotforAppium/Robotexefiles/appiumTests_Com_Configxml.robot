*** Settings ***
Library    appiumTests_EB.py

*** Test Cases ***
STTL-116701 Configxml
    [Documentation]    Change Start page
    startConfigxmlModuleTests    STTL-116701

STTL-116702 Configxml
    [Documentation]    DebugButtonsEnabled
    startConfigxmlModuleTests    STTL-116702

STTL-116703 Configxml
    [Documentation]    DebugButtonsDisabled
    startConfigxmlModuleTests    STTL-116703

STTL-116704 Configxml
    [Documentation]    FullScreenDisabled 
    startConfigxmlModuleTests    STTL-116704

STTL-116705 Configxml
    [Documentation]    FullScreenEnabled
    startConfigxmlModuleTests    STTL-116705

STTL-116706 Configxml
    [Documentation]    PageZoomEnabled as 1.0
    startConfigxmlModuleTests    STTL-116706

STTL-116707 Configxml
    [Documentation]    PageZoomEnabled as 2.0
    startConfigxmlModuleTests    STTL-116707

STTL-116708 Configxml
    [Documentation]    PageZoomEnabled as 3.0
    startConfigxmlModuleTests    STTL-116708

STTL-116709 Configxml
    [Documentation]    PageZoomEnabled as 4.0
    startConfigxmlModuleTests    STTL-116709

STTL-116710 Configxml
    [Documentation]    PageZoomEnabled as -1.0
    startConfigxmlModuleTests    STTL-116710

STTL-116711 Configxml
    [Documentation]    DefaultMetaTags Signature
    startConfigxmlModuleTests    STTL-116711

STTL-116712 Configxml
    [Documentation]    DefaultMetaTags Signal
    startConfigxmlModuleTests    STTL-116712

STTL-116914 Configxml
    [Documentation]    DefaultMetaTags Battery
    startConfigxmlModuleTests    STTL-116914

STTL-116915 Configxml
    [Documentation]    SplashScreen
    startConfigxmlModuleTests    STTL-116915

STTL-116916 Configxml
    [Documentation]    Exit Password Enabled
    startConfigxmlModuleTests    STTL-116916

STTL-116917 Configxml
    [Documentation]    Exit Password Enabled with Pwd exceeds
    startConfigxmlModuleTests    STTL-116917

STTL-116918 Configxml
    [Documentation]    Exit Password Invalid
    startConfigxmlModuleTests    STTL-116918

STTL-116919 Configxml
    [Documentation]    Exit Password  Without enterPwd
    startConfigxmlModuleTests    STTL-116919

STTL-116920 Configxml
    [Documentation]    Exit Password  Press Cancel
    startConfigxmlModuleTests    STTL-116920

STTL-116921 Configxml
    [Documentation]    SettingsButtonEnabled
    startConfigxmlModuleTests    STTL-116921

STTL-116922 Configxml
    [Documentation]    SettingsButtonDisabled
    startConfigxmlModuleTests    STTL-116922

STTL-116923 Configxml
    [Documentation]    SettingsButtonProtection password
    startConfigxmlModuleTests    STTL-116923

STTL-116924 Configxml
    [Documentation]    SettingsButtonProtection password Exceeds
    startConfigxmlModuleTests    STTL-116924

STTL-116925 Configxml
    [Documentation]    SettingsButtonProtection Invalid password
    startConfigxmlModuleTests    STTL-116925

STTL-116926 Configxml
    [Documentation]    SettingsButtonProtection Without EnterPwd
    startConfigxmlModuleTests    STTL-116926

STTL-116927 Configxml
    [Documentation]    SettingsButton Protection Password  Press Cancel
    startConfigxmlModuleTests    STTL-116927

STTL-116928 Configxml
    [Documentation]    Home Debug Button
    startConfigxmlModuleTests    STTL-116928

STTL-116929 Configxml
    [Documentation]    Go Debug Button
    startConfigxmlModuleTests    STTL-116929

STTL-116930 Configxml
    [Documentation]    Back Debug Button 
    startConfigxmlModuleTests    STTL-116930

STTL-116831 Configxml
    [Documentation]    Forward Debug Button
    startConfigxmlModuleTests    STTL-116831

STTL-116832 Configxml
    [Documentation]    SIP Debug Button
    startConfigxmlModuleTests    STTL-116832

STTL-116833 Configxml
    [Documentation]    Zoom Debug Button(ClickTwice)
    startConfigxmlModuleTests    STTL-116833

STTL-116834 Configxml
    [Documentation]    Minimize Debug Button
    startConfigxmlModuleTests    STTL-116834

STTL-116835 Configxml
    [Documentation]    Default Navigation Timeout value
    startConfigxmlModuleTests    STTL-116835

STTL-116836 Configxml
    [Documentation]    User defined Navigation Timeout value
    startConfigxmlModuleTests    STTL-116836

STTL-116837 Configxml
    [Documentation]    Invalid Navigation Timeout value
    startConfigxmlModuleTests    STTL-116837

STTL-116838 Configxml
    [Documentation]    Default Navigation Timeout badlink file
    startConfigxmlModuleTests    STTL-116838

STTL-116839 Configxml
    [Documentation]    Invalid Navigation Timeout badlink file
    startConfigxmlModuleTests    STTL-116839

STTL-116840 Configxml
    [Documentation]    User defined Navigation Timeout badlink file
    startConfigxmlModuleTests    STTL-116840

STTL-116841 Configxml
    [Documentation]    HourGlass Enabled
    startConfigxmlModuleTests    STTL-116841

STTL-116842 Configxml
    [Documentation]    HourGlass Disabled
    startConfigxmlModuleTests    STTL-116842

STTL-116843 Configxml
    [Documentation]    ServerCookie Validation
    startConfigxmlModuleTests    STTL-116843

STTL-116844 Configxml
    [Documentation]    VT187-2679 - check the message box after resume the device with HostURL set  other device ip address in config with default Timeoutvalue
    startConfigxmlModuleTests    STTL-116844

STTL-116845 Configxml
    [Documentation]    VT187-2676 - check the message box after resume the device with HostURL set in config with default Timeoutvalue
    startConfigxmlModuleTests    STTL-116845

STTL-116846 Configxml
    [Documentation]    VT187-2680 - check the message box after resume the device with HostURL set  other device ip address with port set to 9097 in config with default Timeoutvalue
    startConfigxmlModuleTests    STTL-116846

STTL-116847 Configxml
    [Documentation]    VT187-2681 - check the message box after resume the device with HostURL set  other device ip address with port set to 9095 in config with default Timeoutvalue
    startConfigxmlModuleTests    STTL-116847

STTL-116848 Configxml
    [Documentation]    VT187-2682 - check the message box after resume the device with HostURL set  other device ip address in config with default Timeoutvalue
    startConfigxmlModuleTests    STTL-116848

STTL-116849 Configxml
    [Documentation]    VT187-2683 - check the message box after resume the device with HostURL set  ip address which does not exists in config with default Timeoutvalue
    startConfigxmlModuleTests    STTL-116849

STTL-116850 Configxml
    [Documentation]    VT187-2685 - check the message box after resume the device with message set and  Timeoutvalue set to 60 seconds
    startConfigxmlModuleTests    STTL-116850

STTL-116851 Configxml
    [Documentation]    VT187-2686 - check the message box after resume the device with message set and   Timeoutvalue set to 15 seconds
    startConfigxmlModuleTests    STTL-116851

STTL-116852 Configxml
    [Documentation]    VT187-2687 - check the message box after resume the device with message set and   Timeoutvalue set to 5 seconds
    startConfigxmlModuleTests    STTL-116852

STTL-116853 Configxml
    [Documentation]    VT187-2688 - check the message box after resume the device with message set and   Timeoutvalue set to 0 seconds
    startConfigxmlModuleTests    STTL-116853

STTL-116854 Configxml
    [Documentation]    VT187-2689 - check the message box after resume the device with Timeoutvalue set to -15  seconds
    startConfigxmlModuleTests    STTL-116854

STTL-116855 Configxml
    [Documentation]    VT187-2684 - check the message box after resume the device without Timeoutvalue tag default value
    startConfigxmlModuleTests    STTL-116855

STTL-116856 Configxml
    [Documentation]    VT187-2697 - message box on minimize and restore application
    startConfigxmlModuleTests    STTL-116856

STTL-116857 Configxml
    [Documentation]    VT187-0660 - Preload with NPAPI plugin PreloadLegacyGeneric
    startConfigxmlModuleTests    STTL-116857

STTL-116858 Configxml
    [Documentation]    VT187-0661 - Do not Preload with NPAPI plugin PreloadLegacyGeneric
    startConfigxmlModuleTests    STTL-116858

STTL-116859 Configxml
    [Documentation]    VT187-0670 - Preload with NPAPI plugin PreloadJSObjects
    startConfigxmlModuleTests    STTL-116859

STTL-116860 Configxml
    [Documentation]    VT187-0671 - Do not Preload with NPAPI plugin PreloadJSObjects
    startConfigxmlModuleTests    STTL-116860

STTL-116861 Configxml
    [Documentation]    Logger with Log info disabled
    startConfigxmlModuleTests    STTL-116861

STTL-116862 Configxml
    [Documentation]    Logger with Log info enabled
    startConfigxmlModuleTests    STTL-116862

STTL-116863 Configxml
    [Documentation]    Logger with Log Warning disabled
    startConfigxmlModuleTests    STTL-116863

STTL-116864 Configxml
    [Documentation]    Logger with Log Warning enabled
    startConfigxmlModuleTests    STTL-116864

STTL-116865 Configxml
    [Documentation]    Logger with Log Error disabled
    startConfigxmlModuleTests    STTL-116865

STTL-116866 Configxml
    [Documentation]    Logger with Log Error Enabled
    startConfigxmlModuleTests    STTL-116866

STTL-116867 Configxml
    [Documentation]    Logger with LogError, LogWarning, LogInfo and LogUser Enabled
    startConfigxmlModuleTests    STTL-116867

STTL-116868 Configxml
    [Documentation]    Logger with LogError, LogWarning, LogInfo and LogUser Disabled
    startConfigxmlModuleTests    STTL-116868

STTL-116869 Configxml
    [Documentation]    Logger with File protocol
    startConfigxmlModuleTests    STTL-116869

STTL-116870 Configxml
    [Documentation]    Logger Path using Substitution Variable
    startConfigxmlModuleTests    STTL-116870

STTL-116871 Configxml
    [Documentation]    Logger with File protocol with invalid path
    startConfigxmlModuleTests    STTL-116871

STTL-116872 Configxml
    [Documentation]    File name missing inLogURI XML Tag
    startConfigxmlModuleTests    STTL-116872

STTL-116873 Configxml
    [Documentation]    LogURI XML Tag  with null
    startConfigxmlModuleTests    STTL-116873

STTL-116874 Configxml
    [Documentation]    WebServer Enabled
    startConfigxmlModuleTests    STTL-116874

STTL-116875 Configxml
    [Documentation]    Navigate to webserver without mentioning html page
    startConfigxmlModuleTests    STTL-116875

STTL-116876 Configxml
    [Documentation]    WEBSPORT with other than 80
    startConfigxmlModuleTests    STTL-116876

STTL-116877 Configxml
    [Documentation]    WebServer Disabled
    startConfigxmlModuleTests    STTL-116877

STTL-116878 Configxml
    [Documentation]    All XML tag with 'VALUE' in caps
    startConfigxmlModuleTests    STTL-116878

STTL-116879 Configxml
    [Documentation]    FunctionKeysCapturable with value 0  and ENABLEFUNCTIONKEY_Fx with value 1
    startConfigxmlModuleTests    STTL-116879

STTL-116880 Configxml
    [Documentation]    FunctionKeysCapturable with value 1 and ENABLEFUNCTIONKEY_Fx with value 1
    startConfigxmlModuleTests    STTL-116880

STTL-116881 Configxml
    [Documentation]    Don't provide No_Proxy tag
    startConfigxmlModuleTests    STTL-116881

STTL-116882 Configxml
    [Documentation]    HTTP_Proxy with URL and port 
    startConfigxmlModuleTests    STTL-116882

STTL-116883 Configxml
    [Documentation]    HTTP_Proxy with blank
    startConfigxmlModuleTests    STTL-116883

STTL-116884 Configxml
    [Documentation]    HTTPS_Proxy with URL and port 
    startConfigxmlModuleTests    STTL-116884

STTL-116885 Configxml
    [Documentation]    HTTPS_Proxy with blank
    startConfigxmlModuleTests    STTL-116885

STTL-116886 Configxml
    [Documentation]    cookie.db file name in config
    startConfigxmlModuleTests    STTL-116886

STTL-116887 Configxml
    [Documentation]    cookie.db with quit of RE
    startConfigxmlModuleTests    STTL-116887

STTL-116888 Configxml
    [Documentation]    cookie.db with relaunch of RE after boot
    startConfigxmlModuleTests    STTL-116888

STTL-116889 Configxml
    [Documentation]    cookie.db with path to application folder and name as Mycookies.db
    startConfigxmlModuleTests    STTL-116889

STTL-116890 Configxml
    [Documentation]    don't mention any path and name of db for NetworkCookieDatabase tag in config
    startConfigxmlModuleTests    STTL-116890

STTL-116891 Configxml
    [Documentation]    Navigation/ UserAgent with default setting
    startConfigxmlModuleTests    STTL-116891

STTL-116892 Configxml
    [Documentation]    VerifyPeerCertificate 0 and browse ssl sites
    startConfigxmlModuleTests    STTL-116892

STTL-116893 Configxml
    [Documentation]    VerifyPeerCertificate 0 and browse non ssl sites
    startConfigxmlModuleTests    STTL-116893

STTL-116894 Configxml
    [Documentation]    VerifyPeerCertificate 1 and browse ssl sites
    startConfigxmlModuleTests    STTL-116894

STTL-116895 Configxml
    [Documentation]    VerifyPeerCertificate 1 and browse non ssl sites
    startConfigxmlModuleTests    STTL-116895

