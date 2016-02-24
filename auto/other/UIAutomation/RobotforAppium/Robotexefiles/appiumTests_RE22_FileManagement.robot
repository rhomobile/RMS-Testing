*** Settings ***
Library   appiumTests_EB.py

*** Test Cases ***
STTL-116701 RE22FileManagement
    [Documentation]    Change Start page
    startRE22FileManagementModuleTests    STTL-116701

STTL-116702 RE22FileManagement
    [Documentation]    Note: Run this test with Javascript object.

HTTP Server to device FileTransfer
    startRE22FileManagementModuleTests    STTL-116702

STTL-116703 RE22FileManagement
    [Documentation]    Note: Run this test with Javascript object.

Device File Transfer to HTTP
    startRE22FileManagementModuleTests    STTL-116703

STTL-116704 RE22FileManagement
    [Documentation]    Note: Run this test with Javascript object.

FTP Server to Device File Transfer
    startRE22FileManagementModuleTests    STTL-116704

STTL-116705 RE22FileManagement
    [Documentation]    Note: Run this test with Javascript object.

Device File Transfer to FTP
    startRE22FileManagementModuleTests    STTL-116705

STTL-116706 RE22FileManagement
    [Documentation]    Note: Run this test with Javascript object.

Device File Transfer to device file system
    startRE22FileManagementModuleTests    STTL-116706

STTL-116707 RE22FileManagement
    [Documentation]    Note: Run this test with Javascript object.

File transfer with fully qualified FTP URL to device
    startRE22FileManagementModuleTests    STTL-116707

STTL-116708 RE22FileManagement
    [Documentation]    Note: Run this test with Javascript object.

Create Folder Set to true
    startRE22FileManagementModuleTests    STTL-116708

STTL-116709 RE22FileManagement
    [Documentation]    Note: Run this test with Javascript object.

Create Folder Set to false
    startRE22FileManagementModuleTests    STTL-116709

STTL-116710 RE22FileManagement
    [Documentation]    Note: Run this test with Javascript object.

OverWrite set to true
    startRE22FileManagementModuleTests    STTL-116710

STTL-116711 RE22FileManagement
    [Documentation]    Note: Run this test with Javascript object.

OverWrite Set to false
    startRE22FileManagementModuleTests    STTL-116711

STTL-116712 RE22FileManagement
    [Documentation]    Note: Run this test with Javascript object.
Transfer Event with HTTP Url
    startRE22FileManagementModuleTests    STTL-116712

STTL-116713 RE22FileManagement
    [Documentation]    Note: Run this test with Javascript object.

HTTP Server to device -large file(4mb)
    startRE22FileManagementModuleTests    STTL-116713

STTL-116714 RE22FileManagement
    [Documentation]    Note: Run this test with Javascript object.

Device File Transfer to HTTP-Large file(4mb)
    startRE22FileManagementModuleTests    STTL-116714

STTL-116715 RE22FileManagement
    [Documentation]    Note: Run this test with Javascript object.

FTP Server to Device File Transfer-large file(4mb)
    startRE22FileManagementModuleTests    STTL-116715

STTL-116716 RE22FileManagement
    [Documentation]    Note: Run this test with Javascript object.

Device File Transfer to FTP-large file(4mb)
    startRE22FileManagementModuleTests    STTL-116716

