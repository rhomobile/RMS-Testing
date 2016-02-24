*** Settings ***
Library    appiumTests_EB.py

*** Test Cases ***
STTL-116701 PBGeneric
    [Documentation]    Change Start page
    startPBGenericModuleTests    STTL-116701

STTL-116702 PBGeneric
    [Documentation]    Generic ActiveX Object UUID
    startPBGenericModuleTests    STTL-116702

STTL-116703 PBGeneric
    [Documentation]    Generic ActiveX Object OEM Information String for the terminal
    startPBGenericModuleTests    STTL-116703

