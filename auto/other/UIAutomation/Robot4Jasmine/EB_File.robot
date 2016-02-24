*** Settings ***
Library    jasmineTests.py
Library    config.py
Suite Setup    precondition

*** keywords ***
precondition
    waitTimeCapture    60
    startPath    Configuration/Applications/Application/General,StartPage,<StartPage value="http://127.0.0.1:8082/app/FileTest/specRunner.html" name="Menu"/>

*** Test Cases ***
STTL-116701 File Basic test - before all
    [Documentation]
    [Tags]    Android
    readResult    Basic test - before all

STTL-116702 File VT288-001 : get basename of file - 1
    [Documentation]
    [Tags]    Android
    readResult    VT288-001 : get basename of file - 1

STTL-116703 File Open File
    [Documentation]
    [Tags]    Android
    readResult    Open File

STTL-116704 File VT288-003 : is close ? - true
    [Documentation]
    [Tags]    Android
    readResult    VT288-003 : is close ? - true

STTL-116705 File VT288-004 : is close ? - false
    [Documentation]
    [Tags]    Android
    readResult    VT288-004 : is close ? - false

STTL-116706 File VT288-005 : Copy with valid parameters - true
    [Documentation]
    [Tags]    Android
    readResult    VT288-005 : Copy with valid parameters - true

STTL-116707 File VT288-006 : Copy to same folder - false
    [Documentation]
    [Tags]    Android
    readResult    VT288-006 : Copy to same folder - false

STTL-116708 File VT288-011 : Copy without parameters - false
    [Documentation]
    [Tags]    Android
    readResult    VT288-011 : Copy without parameters - false

STTL-116709 File VT288-022 : Delete recursive with leave root true - true
    [Documentation]
    [Tags]    Android
    readResult    VT288-022 : Delete recursive with leave root true - true

STTL-116710 File VT288-023 : Delete recursive with leave root false - true
    [Documentation]
    [Tags]    Android
    readResult    VT288-023 : Delete recursive with leave root false - true

STTL-116711 File VT288-024 : Delete recursive without leave root - true
    [Documentation]
    [Tags]    Android
    readResult    VT288-024 : Delete recursive without leave root - true

STTL-116712 File VT288-012 : Delete directory without contents - true
    [Documentation]
    [Tags]    Android
    readResult    VT288-012 : Delete directory without contents - true

STTL-116713 File VT288-013 : Delete directory with contents - false
    [Documentation]
    [Tags]    Android
    readResult    VT288-013 : Delete directory with contents - false

STTL-116714 File VT288-014 : Delete directory with invalid path - path
    [Documentation]
    [Tags]    Android
    readResult    VT288-014 : Delete directory with invalid path - path

STTL-116715 File VT288-015 : Delete directory without parameters - false
    [Documentation]
    [Tags]    Android
    readResult    VT288-015 : Delete directory without parameters - false

STTL-116716 File VT288-017 : Delete directory with contents folders and files - false
    [Documentation]
    [Tags]    Android
    readResult    VT288-017 : Delete directory with contents folders and files - false

STTL-116717 File VT288-018 : Delete file with valid path- true
    [Documentation]
    [Tags]    Android
    readResult    VT288-018 : Delete file with valid path- true

STTL-116718 File VT288-019 : Delete file with invalid file path - false
    [Documentation]
    [Tags]    Android
    readResult    VT288-019 : Delete file with invalid file path - false

STTL-116719 File VT288-020 : Delete file without parameter - false
    [Documentation]
    [Tags]    Android
    readResult    VT288-020 : Delete file without parameter - false

STTL-116720 File VT288-026: get directory name - true
    [Documentation]
    [Tags]    Android
    readResult    VT288-026: get directory name - true

STTL-116721 File VT288-027 : is File Exists - true
    [Documentation]
    [Tags]    Android
    readResult    VT288-027 : is File Exists - true

STTL-116722 File VT288-028 : is File Exists - false
    [Documentation]
    [Tags]    Android
    readResult    VT288-028 : is File Exists - false

STTL-116723 File VT288-030: get file size - true
    [Documentation]
    [Tags]    Android
    readResult    VT288-030: get file size - true

STTL-116724 File VT288-031: get file size with valid directory path - false
    [Documentation]
    [Tags]    Android
    readResult    VT288-031: get file size with valid directory path - false

STTL-116725 File VT288-032: get file size with invalid path - false
    [Documentation]
    [Tags]    Android
    readResult    VT288-032: get file size with invalid path - false

STTL-116726 File VT288-033 : is directory present with valid path - true
    [Documentation]
    [Tags]    Android
    readResult    VT288-033 : is directory present with valid path - true

STTL-116727 File VT288-034: is directory with valid filename - false
    [Documentation]
    [Tags]    Android
    readResult    VT288-034: is directory with valid filename - false

STTL-116728 File VT288-035 : is directory present with invalid path - false
    [Documentation]
    [Tags]    Android
    readResult    VT288-035 : is directory present with invalid path - false

STTL-116729 File VT288-046: isFile with valid filepath - true
    [Documentation]
    [Tags]    Android
    readResult    VT288-046: isFile with valid filepath - true

STTL-116730 File VT288-037: isFile with valid directory - false
    [Documentation]
    [Tags]    Android
    readResult    VT288-037: isFile with valid directory - false

STTL-116731 File VT288-038: isFile with invalid filepath - false
    [Documentation]
    [Tags]    Android
    readResult    VT288-038: isFile with invalid filepath - false

STTL-116732 File VT288-039 : is opened ? - true
    [Documentation]
    [Tags]    Android
    readResult    VT288-039 : is opened ? - true

STTL-116733 File VT288-040 : is opened ? - false
    [Documentation]
    [Tags]    Android
    readResult    VT288-040 : is opened ? - false

STTL-116734 File VT288-042 : Join operation - true
    [Documentation]
    [Tags]    Android
    readResult    VT288-042 : Join operation - true

STTL-116735 File VT288-043 : Join operation with spaces- true
    [Documentation]
    [Tags]    Android
    readResult    VT288-043 : Join operation with spaces- true

STTL-116736 File VT288-044 : listDir - true
    [Documentation]
    [Tags]    Android
    readResult    VT288-044 : listDir - true

STTL-116737 File VT288-045 : listDir with invalid path - false
    [Documentation]
    [Tags]    Android
    readResult    VT288-045 : listDir with invalid path - false

STTL-116738 File VT288-046: make directory and is directory present- true
    [Documentation]
    [Tags]    Android
    readResult    VT288-046: make directory and is directory present- true

STTL-116739 File VT288-047: make directory with invalid path - false
    [Documentation]
    [Tags]    Android
    readResult    VT288-047: make directory with invalid path - false

STTL-116740 File VT288-048 : make directory with some of toplevel directories not present - false
    [Documentation]
    [Tags]    Android
    readResult    VT288-048 : make directory with some of toplevel directories not present - false

STTL-116741 File VT288-051: make directory with mkdirs - true
    [Documentation]
    [Tags]    Android
    readResult    VT288-051: make directory with mkdirs - true

STTL-116742 File VT288-052: makedirs with invalid path - true
    [Documentation]
    [Tags]    Android
    readResult    VT288-052: makedirs with invalid path - true

STTL-116743 File VT288-053 : make directory with toplevel directories not present - true
    [Documentation]
    [Tags]    Android
    readResult    VT288-053 : make directory with toplevel directories not present - true

STTL-116744 File VT288-054: make directory and is directory present- true
    [Documentation]
    [Tags]    Android
    readResult    VT288-054: make directory and is directory present- true

STTL-116745 File VT288-056 : open file with mode 1 on file not exists - true
    [Documentation]
    [Tags]    Android
    readResult    VT288-056 : open file with mode 1 on file not exists - true

STTL-116746 File VT288-057 : open file with mode 1 on file exists- true
    [Documentation]
    [Tags]    Android
    readResult    VT288-057 : open file with mode 1 on file exists- true

STTL-116747 File VT288-059 : open file with mode 2 on file exists- true
    [Documentation]
    [Tags]    Android
    readResult    VT288-059 : open file with mode 2 on file exists- true

STTL-116748 File VT288-062 : open file with mode 4 on file not exists - true
    [Documentation]
    [Tags]    Android
    readResult    VT288-062 : open file with mode 4 on file not exists - true

STTL-116749 File VT288-063 : open file with mode 4 on file exists- false
    [Documentation]
    [Tags]    Android
    readResult    VT288-063 : open file with mode 4 on file exists- false

STTL-116750 File VT288-060 : open file with mode 3 on file not exists - true
    [Documentation]
    [Tags]    Android
    readResult    VT288-060 : open file with mode 3 on file not exists - true

STTL-116751 File VT288-061 : open file with mode 3 on file exists- true
    [Documentation]
    [Tags]    Android
    readResult    VT288-061 : open file with mode 3 on file exists- true

STTL-116752 File VT288-064 : Read contents with path- true
    [Documentation]
    [Tags]    Android
    readResult    VT288-064 : Read contents with path- true

STTL-116753 File VT288-066 : Read contents with specified size- true
    [Documentation]
    [Tags]    Android
    readResult    VT288-066 : Read contents with specified size- true

STTL-116754 File VT288-067 : Read contents with specified size with mentioned position- true
    [Documentation]
    [Tags]    Android
    readResult    VT288-067 : Read contents with specified size with mentioned position- true

STTL-116755 File VT288-068 : Read with specified size more than the file size true
    [Documentation]
    [Tags]    Android
    readResult    VT288-068 : Read with specified size more than the file size true

STTL-116756 File VT288-070 : ReadAll with valid file path- true
    [Documentation]
    [Tags]    Android
    readResult    VT288-070 : ReadAll with valid file path- true

STTL-116757 File VT288-072 : rename with valid source and destination path in different folder- true
    [Documentation]
    [Tags]    Android
    readResult    VT288-072 : rename with valid source and destination path in different folder- true

STTL-116758 File VT288-073 : rename with valid source and destination path in same folder- true
    [Documentation]
    [Tags]    Android
    readResult    VT288-073 : rename with valid source and destination path in same folder- true

STTL-116759 File VT288-074 : rename with invalid source name and valid destination path- false
    [Documentation]
    [Tags]    Android
    readResult    VT288-074 : rename with invalid source name and valid destination path- false

STTL-116760 File VT288-075 : rename withvalid source name and invalid destination path- false
    [Documentation]
    [Tags]    Android
    readResult    VT288-075 : rename withvalid source name and invalid destination path- false

STTL-116761 File VT288-077 : rename without parameters- false
    [Documentation]
    [Tags]    Android
    readResult    VT288-077 : rename without parameters- false

STTL-116762 File VT288-078 : seek value 10- true
    [Documentation]
    [Tags]    Android
    readResult    VT288-078 : seek value 10- true

STTL-116763 File VT288-082 : file size - true
    [Documentation]
    [Tags]    Android
    readResult    VT288-082 : file size - true

STTL-116764 File VT288-083 : file size on empty file - true
    [Documentation]
    [Tags]    Android
    readResult    VT288-083 : file size on empty file - true

STTL-116765 File VT288-084 : Write beginning - true
    [Documentation]
    [Tags]    Android
    readResult    VT288-084 : Write beginning - true

STTL-116766 File VT288-085 : Write end - true
    [Documentation]
    [Tags]    Android
    readResult    VT288-085 : Write end - true

STTL-116767 File VT288-086 : Write in between - true
    [Documentation]
    [Tags]    Android
    readResult    VT288-086 : Write in between - true

STTL-116768 File VT288-029 : flush - true
    [Documentation]
    [Tags]    Android
    readResult    VT288-029 : flush - true

STTL-116769 File VT288-087 :Raises exception while opening nonexistent file in OPEN_FOR_READ mode
    [Documentation]
    [Tags]    Android
    readResult    VT288-087 :Raises exception while opening nonexistent file in OPEN_FOR_READ mode

STTL-116770 File VT288-088 :Raises exception while opening nonexistent file in OPEN_FOR_READ_WRITE mode
    [Documentation]
    [Tags]    Android
    readResult    VT288-088 :Raises exception while opening nonexistent file in OPEN_FOR_READ_WRITE mode

STTL-116771 File VT288-089 :Don't Raises exception while opening nonexistent file in OPEN_FOR_APPEND mode
    [Documentation]
    [Tags]    Android
    readResult    VT288-089 :Don't Raises exception while opening nonexistent file in OPEN_FOR_APPEND mode

STTL-116772 File VT288-090 :Don't Raises exception while opening non existent file in OPEN_FOR_WRITE mode
    [Documentation]
    [Tags]    Android
    readResult    VT288-090 :Don't Raises exception while opening non existent file in OPEN_FOR_WRITE mode

STTL-116773 File VT288-091 :Raises exception when Read call with non existing file
    [Documentation]
    [Tags]    Android
    readResult    VT288-091 :Raises exception when Read call with non existing file

STTL-116774 File VT288-092 :Doesn't raises exception while reading empty file
    [Documentation]
    [Tags]    Android
    readResult    VT288-092 :Doesn't raises exception while reading empty file

STTL-116775 File VT288-093 :Doesn't raises exception while reading CR LF
    [Documentation]
    [Tags]    Android
    readResult    VT288-093 :Doesn't raises exception while reading CR LF

STTL-116776 File VT288-094 :Doesn't raises exception while loading file without double quote
    [Documentation]
    [Tags]    Android
    readResult    VT288-094 :Doesn't raises exception while loading file without double quote

