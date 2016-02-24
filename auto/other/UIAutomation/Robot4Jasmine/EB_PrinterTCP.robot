*** Settings ***
Library    jasmineTests.py
Library    config.py
Suite Setup    precondition

*** keywords ***
precondition
    waitTimeCapture    460
    startPath    Configuration/Applications/Application/General,StartPage,<StartPage value="http://127.0.0.1:8082/app/Printing/specRunner_auto_tcp.html" name="Menu"/>

*** Test Cases ***
STTL-116701 Printer initialize before tests
    [Documentation]
    [Tags]    Android
    readResult    initialize before tests

STTL-116702 Printer enumerateSupportedTypes without callback
    [Documentation]
    [Tags]    Android
    readResult    enumerateSupportedTypes without callback

STTL-116703 Printer enumerateSupportedTypes with callback
    [Documentation]
    [Tags]    Android
    readResult    enumerateSupportedTypes with callback

STTL-116704 Printer enumerateSupportedTypes with anonymous callback
    [Documentation]
    [Tags]    Android
    readResult    enumerateSupportedTypes with anonymous callback

STTL-116705 Printer should getPrinterByID and get base properties
    [Documentation]
    [Tags]    Android
    readResult    should getPrinterByID and get base properties

STTL-116706 Printer should just connect
    [Documentation]
    [Tags]    Android
    readResult    should just connect

STTL-116707 Printer should just connect wait for isConnected
    [Documentation]
    [Tags]    Android
    readResult    should just connect wait for isConnected

STTL-116708 Printer disconnect and try to print should return status error
    [Documentation]
    [Tags]    Android
    readResult    disconnect and try to print should return status error

STTL-116709 Printer using connectWithOptions should just connect without callback and params null
    [Documentation]
    [Tags]    Android
    readResult    using connectWithOptions should just connect without callback and params null

STTL-116710 Printer using connectWithOptions should just connect withcallback callback and params null
    [Documentation]
    [Tags]    Android
    readResult    using connectWithOptions should just connect withcallback callback and params null

STTL-116711 Printer using connectWithOptions should just connect anonymous callback and params null
    [Documentation]
    [Tags]    Android
    readResult    using connectWithOptions should just connect anonymous callback and params null

STTL-116712 Printer using connectWithOptions should just connect without callback and params 20000
    [Documentation]
    [Tags]    Android
    readResult    using connectWithOptions should just connect without callback and params 20000

STTL-116713 Printer using connectWithOptions should just connect withcallback callback and params 20000
    [Documentation]
    [Tags]    Android
    readResult    using connectWithOptions should just connect withcallback callback and params 20000

STTL-116714 Printer using connectWithOptions should just connect anonymous callback and params 20000
    [Documentation]
    [Tags]    Android
    readResult    using connectWithOptions should just connect anonymous callback and params 20000

STTL-116715 Printer using connectWithOptions should just connect without callback and params 10000
    [Documentation]
    [Tags]    Android
    readResult    using connectWithOptions should just connect without callback and params 10000

STTL-116716 Printer using connectWithOptions should just connect withcallback callback and params 10000
    [Documentation]
    [Tags]    Android
    readResult    using connectWithOptions should just connect withcallback callback and params 10000

STTL-116717 Printer using connectWithOptions should just connect anonymous callback and params 10000
    [Documentation]
    [Tags]    Android
    readResult    using connectWithOptions should just connect anonymous callback and params 10000

STTL-116718 Printer using connectWithOptions should just connect without callback and params 15000
    [Documentation]
    [Tags]    Android
    readResult    using connectWithOptions should just connect without callback and params 15000

STTL-116719 Printer using connectWithOptions should just connect withcallback callback and params 15000
    [Documentation]
    [Tags]    Android
    readResult    using connectWithOptions should just connect withcallback callback and params 15000

STTL-116720 Printer using connectWithOptions should just connect anonymous callback and params 15000
    [Documentation]
    [Tags]    Android
    readResult    using connectWithOptions should just connect anonymous callback and params 15000

STTL-116721 Printer should connect before enumerateSupportedControlLanguages method
    [Documentation]
    [Tags]    Android
    readResult    should connect before enumerateSupportedControlLanguages method

STTL-116722 Printer enumerateSupportedControlLanguages without callback
    [Documentation]
    [Tags]    Android
    readResult    enumerateSupportedControlLanguages without callback

STTL-116723 Printer enumerateSupportedControlLanguages with callback
    [Documentation]
    [Tags]    Android
    readResult    enumerateSupportedControlLanguages with callback

STTL-116724 Printer enumerateSupportedControlLanguages with anonymous callback
    [Documentation]
    [Tags]    Android
    readResult    enumerateSupportedControlLanguages with anonymous callback

STTL-116725 Printer callback should not fire after calling stopSearch
    [Documentation]
    [Tags]    Android
    readResult    callback should not fire after calling stopSearch

STTL-116726 Printer should connect before requestState method
    [Documentation]
    [Tags]    Android
    readResult    should connect before requestState method

STTL-116727 Printer Request printer state for list of parameters
    [Documentation]
    [Tags]    Android
    readResult    Request printer state for list of parameters

STTL-116728 Printer Result of Request printer state Boolean values
    [Documentation]
    [Tags]    Android
    readResult    Result of Request printer state Boolean values

STTL-116729 Printer Should getProperty connectionType value as a string
    [Documentation]
    [Tags]    Android
    readResult    Should getProperty connectionType value as a string

STTL-116730 Printer Should getProperties connectionType value as a string
    [Documentation]
    [Tags]    Android
    readResult    Should getProperties connectionType value as a string

STTL-116731 Printer Should getProperty deviceAddress value as a string
    [Documentation]
    [Tags]    Android
    readResult    Should getProperty deviceAddress value as a string

STTL-116732 Printer Should getProperties deviceAddress value as a string
    [Documentation]
    [Tags]    Android
    readResult    Should getProperties deviceAddress value as a string

STTL-116733 Printer Should getProperty ID value as a string
    [Documentation]
    [Tags]    Android
    readResult    Should getProperty ID value as a string

STTL-116734 Printer Should getProperties ID value as a string
    [Documentation]
    [Tags]    Android
    readResult    Should getProperties ID value as a string

STTL-116735 Printer Should getProperty deviceName value as a string
    [Documentation]
    [Tags]    Android
    readResult    Should getProperty deviceName value as a string

STTL-116736 Printer Should getProperties deviceName value as a string
    [Documentation]
    [Tags]    Android
    readResult    Should getProperties deviceName value as a string

STTL-116737 Printer Should getProperty printerType value as a string
    [Documentation]
    [Tags]    Android
    readResult    Should getProperty printerType value as a string

STTL-116738 Printer Should getProperties printerType value as a string
    [Documentation]
    [Tags]    Android
    readResult    Should getProperties printerType value as a string

STTL-116739 Printer Should getProperty isConnected value as a boolean
    [Documentation]
    [Tags]    Android
    readResult    Should getProperty isConnected value as a boolean

STTL-116740 Printer Should getProperties isConnected value as a boolean
    [Documentation]
    [Tags]    Android
    readResult    Should getProperties isConnected value as a boolean

STTL-116741 Printer should connect before getting properties
    [Documentation]
    [Tags]    Android
    readResult    should connect before getting properties

STTL-116742 Printer Should return devicePort value as an integer
    [Documentation]
    [Tags]    Android
    readResult    Should return devicePort value as an integer

STTL-116743 Printer Should return devicePort value as an integer using get properties
    [Documentation]
    [Tags]    Android
    readResult    Should return devicePort value as an integer using get properties

STTL-116744 Printer set printer using an instance of a printer
    [Documentation]
    [Tags]    Android
    readResult    set printer using an instance of a printer

STTL-116745 Printer get default Printer
    [Documentation]
    [Tags]    Android
    readResult    get default Printer

STTL-116746 Printer set default Printer
    [Documentation]
    [Tags]    Android
    readResult    set default Printer

STTL-116747 Printer should connect before negetive test
    [Documentation]
    [Tags]    Android
    readResult    should connect before negetive test

STTL-116748 Printer calling zebra specific method should throw exception
    [Documentation]
    [Tags]    Android
    readResult    calling zebra specific method should throw exception

STTL-116749 Printer should connect before printFile method
    [Documentation]
    [Tags]    Android
    readResult    should connect before printFile method

STTL-116750 Printer should print png with callback
    [Documentation]
    [Tags]    Android
    readResult    should print png with callback

STTL-116751 Printer should print png with anonymous function
    [Documentation]
    [Tags]    Android
    readResult    should print png with anonymous function

STTL-116752 Printer should print jpeg with callback
    [Documentation]
    [Tags]    Android
    readResult    should print jpeg with callback

STTL-116753 Printer should print jpeg with anonymous function
    [Documentation]
    [Tags]    Android
    readResult    should print jpeg with anonymous function

STTL-116754 Printer should not print empty filename with callback
    [Documentation]
    [Tags]    Android
    readResult    should not print empty filename with callback

STTL-116755 Printer should not print invalid filename with callback
    [Documentation]
    [Tags]    Android
    readResult    should not print invalid filename with callback

STTL-116756 Printer should print ZPL Command with callback
    [Documentation]
    [Tags]    Android
    readResult    should print ZPL Command with callback

STTL-116757 Printer should print ZPL Command with anonymous function
    [Documentation]
    [Tags]    Android
    readResult    should print ZPL Command with anonymous function

STTL-116758 Printer should print CPCL Command with callback
    [Documentation]
    [Tags]    Android
    readResult    should print CPCL Command with callback

STTL-116759 Printer should print CPCL Command with anonymous function
    [Documentation]
    [Tags]    Android
    readResult    should print CPCL Command with anonymous function

STTL-116760 Printer should print image 320px png at 0 0 with width 50 and height 50
    [Documentation]
    [Tags]    Android
    readResult    should print image 320px png at 0 0 with width 50 and height 50

STTL-116761 Printer should print image 640px png at 10 10 with width 50 and height 50
    [Documentation]
    [Tags]    Android
    readResult    should print image 640px png at 10 10 with width 50 and height 50

STTL-116762 Printer should print image 1024px png at -10 -10 with width 50 and height 50
    [Documentation]
    [Tags]    Android
    readResult    should print image 1024px png at -10 -10 with width 50 and height 50

STTL-116763 Printer should print image 320px png at 50 50 with width 100 and height 100
    [Documentation]
    [Tags]    Android
    readResult    should print image 320px png at 50 50 with width 100 and height 100

STTL-116764 Printer should print image 640px png at -50 -50 with width 100 and height 100
    [Documentation]
    [Tags]    Android
    readResult    should print image 640px png at -50 -50 with width 100 and height 100

STTL-116765 Printer should print image 1024px png at 100 -100 with width 100 and height 100
    [Documentation]
    [Tags]    Android
    readResult    should print image 1024px png at 100 -100 with width 100 and height 100

STTL-116766 Printer should print image 320px png at 0 0 with width -1 and height -1
    [Documentation]
    [Tags]    Android
    readResult    should print image 320px png at 0 0 with width -1 and height -1

STTL-116767 Printer should print image 640px png at 10 10 with width -1 and height -1
    [Documentation]
    [Tags]    Android
    readResult    should print image 640px png at 10 10 with width -1 and height -1

STTL-116768 Printer should print image 1024px png at -10 -10 with width -1 and height -1
    [Documentation]
    [Tags]    Android
    readResult    should print image 1024px png at -10 -10 with width -1 and height -1

STTL-116769 Printer should print image 320px jpg at 50 50 with width 50 and height 50
    [Documentation]
    [Tags]    Android
    readResult    should print image 320px jpg at 50 50 with width 50 and height 50

STTL-116770 Printer should print image 640px jpg at -50 -50 with width 50 and height 50
    [Documentation]
    [Tags]    Android
    readResult    should print image 640px jpg at -50 -50 with width 50 and height 50

STTL-116771 Printer should print image 1024px jpg at 100 -100 with width 50 and height 50
    [Documentation]
    [Tags]    Android
    readResult    should print image 1024px jpg at 100 -100 with width 50 and height 50

STTL-116772 Printer should print image 320px jpg at 0 0 with width 100 and height 100
    [Documentation]
    [Tags]    Android
    readResult    should print image 320px jpg at 0 0 with width 100 and height 100

STTL-116773 Printer should print image 640px jpg at 10 10 with width 100 and height 100
    [Documentation]
    [Tags]    Android
    readResult    should print image 640px jpg at 10 10 with width 100 and height 100

STTL-116774 Printer should print image 1024px jpg at -10 -10 with width 100 and height 100
    [Documentation]
    [Tags]    Android
    readResult    should print image 1024px jpg at -10 -10 with width 100 and height 100

STTL-116775 Printer should print image 320px jpg at 50 50 with width -1 and height -1
    [Documentation]
    [Tags]    Android
    readResult    should print image 320px jpg at 50 50 with width -1 and height -1

STTL-116776 Printer should print image 640px jpg at -50 -50 with width -1 and height -1
    [Documentation]
    [Tags]    Android
    readResult    should print image 640px jpg at -50 -50 with width -1 and height -1

STTL-116777 Printer should print image 1024px jpg at 100 -100 with width -1 and height -1
    [Documentation]
    [Tags]    Android
    readResult    should print image 1024px jpg at 100 -100 with width -1 and height -1

STTL-116778 Printer should print image Anonymous callback 640px png at 10 10 with width 50 and height 50
    [Documentation]
    [Tags]    Android
    readResult    should print image Anonymous callback 640px png at 10 10 with width 50 and height 50

STTL-116779 Printer should print image Anonymous callback 1024px png at 10 10 with width -1 and height -1
    [Documentation]
    [Tags]    Android
    readResult    should print image Anonymous callback 1024px png at 10 10 with width -1 and height -1

STTL-116780 Printer should print image Anonymous callback 640px jpg at 10 10 with width 50 and height 50
    [Documentation]
    [Tags]    Android
    readResult    should print image Anonymous callback 640px jpg at 10 10 with width 50 and height 50

STTL-116781 Printer should print image Anonymous callback 1024px jpg at 10 10 with width -1 and height -1
    [Documentation]
    [Tags]    Android
    readResult    should print image Anonymous callback 1024px jpg at 10 10 with width -1 and height -1

STTL-116782 Printer Set printer to PRINTER_STATE_IS_READY_TO_PRINT state
    [Documentation]
    [Tags]    Android
    readResult    Set printer to PRINTER_STATE_IS_READY_TO_PRINT state

STTL-116783 Printer Set printer to PRINTER_STATE_IS_PAPER_OUT state
    [Documentation]
    [Tags]    Android
    readResult    Set printer to PRINTER_STATE_IS_PAPER_OUT state

STTL-116784 Printer Should print a raw string using the get default printer
    [Documentation]
    [Tags]    Android
    readResult    Should print a raw string using the get default printer

