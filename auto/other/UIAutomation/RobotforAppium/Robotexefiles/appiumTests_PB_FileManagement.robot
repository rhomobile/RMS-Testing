*** Settings ***
Library    appiumTests_EB.py

*** Test Cases ***
STTL-116701 PBFileManagement
    [Documentation]    Change Start page
    startPBFileManagementModuleTests    STTL-116701

STTL-116702 PBFileManagement
    [Documentation]    HTTP Server to device
    startPBFileManagementModuleTests    STTL-116702

STTL-116703 PBFileManagement
    [Documentation]    Device File Systen to HTTP server
    startPBFileManagementModuleTests    STTL-116703

STTL-116704 PBFileManagement
    [Documentation]    FTP Server to Device
    startPBFileManagementModuleTests    STTL-116704

STTL-116705 PBFileManagement
    [Documentation]    Device File System to FTP Server
    startPBFileManagementModuleTests    STTL-116705

STTL-116706 PBFileManagement
    [Documentation]    Device File system to FTP Server with Transfer event URL
    startPBFileManagementModuleTests    STTL-116706

STTL-116707 PBFileManagement
    [Documentation]    HTTP Server to device with valid username and password
    startPBFileManagementModuleTests    STTL-116707

STTL-116708 PBFileManagement
    [Documentation]    Device File System to FTP Server with valid username and password
    startPBFileManagementModuleTests    STTL-116708

STTL-116709 PBFileManagement
    [Documentation]    FTP Server to Device Create folder default value
    startPBFileManagementModuleTests    STTL-116709

STTL-116710 PBFileManagement
    [Documentation]    FTP Server to Device Create folder:True
    startPBFileManagementModuleTests    STTL-116710

STTL-116711 PBFileManagement
    [Documentation]    FTP Server to Device Create folder:False
    startPBFileManagementModuleTests    STTL-116711

STTL-116712 PBFileManagement
    [Documentation]    Http server to device overwrite: default
    startPBFileManagementModuleTests    STTL-116712

STTL-116713 PBFileManagement
    [Documentation]    Http server to device overwrite: true
    startPBFileManagementModuleTests    STTL-116713

STTL-116714 PBFileManagement
    [Documentation]    Http server to device overwrite: false
    startPBFileManagementModuleTests    STTL-116714

STTL-116715 PBFileManagement
    [Documentation]    Device File System to FTP Server with valid username and invalid password
    startPBFileManagementModuleTests    STTL-116715

STTL-116716 PBFileManagement
    [Documentation]    Device File System to FTP Server with invalid username and valid password
    startPBFileManagementModuleTests    STTL-116716

STTL-116717 PBFileManagement
    [Documentation]    Http server to device invalid file
    startPBFileManagementModuleTests    STTL-116717

STTL-116718 PBFileManagement
    [Documentation]    Device file system to FTP server invalid file
    startPBFileManagementModuleTests    STTL-116718

STTL-116719 PBFileManagement
    [Documentation]    Filemanagement with invalid File system destination
    startPBFileManagementModuleTests    STTL-116719

STTL-116720 PBFileManagement
    [Documentation]    Filemanagement with invalid File system destination
    startPBFileManagementModuleTests    STTL-116720

STTL-116721 PBFileManagement
    [Documentation]    HTTP Server to device -large file(4mb)
    startPBFileManagementModuleTests    STTL-116721

STTL-116722 PBFileManagement
    [Documentation]    Device File Transfer to HTTP-Large file(4mb)
    startPBFileManagementModuleTests    STTL-116722

STTL-116723 PBFileManagement
    [Documentation]    FTP Server to Device-large file(4mb)
    startPBFileManagementModuleTests    STTL-116723

STTL-116724 PBFileManagement
    [Documentation]    Device to FTP-large file(4mb)
    startPBFileManagementModuleTests    STTL-116724

STTL-116725 PBFileManagement
    [Documentation]    FileTransfer Metatag with Empty parameter
    startPBFileManagementModuleTests    STTL-116725

