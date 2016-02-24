*** Settings ***
Library    jasmineTests.py
Library    config.py
Suite Setup    precondition

*** keywords ***
precondition
    waitTimeCapture    520
    startPath    Configuration/Applications/Application/General,StartPage,<StartPage value="http://127.0.0.1:8082/app/PrinterZebra/specRunner_auto_tcp.html" name="Menu"/>

*** Test Cases ***
STTL-116701 Printer Zebra initialize before tests
    [Documentation]
    [Tags]    Android
    readResult    initialize before tests

STTL-116702 Printer Zebra enumerateSupportedTypes without callback
    [Documentation]
    [Tags]    Android
    readResult    enumerateSupportedTypes without callback

STTL-116703 Printer Zebra enumerateSupportedTypes with callback
    [Documentation]
    [Tags]    Android
    readResult    enumerateSupportedTypes with callback

STTL-116704 Printer Zebra enumerateSupportedTypes with anonymous callback
    [Documentation]
    [Tags]    Android
    readResult    enumerateSupportedTypes with anonymous callback

STTL-116705 Printer Zebra should getPrinterByID and get base properties
    [Documentation]
    [Tags]    Android
    readResult    should getPrinterByID and get base properties

STTL-116706 Printer Zebra should just connect
    [Documentation]
    [Tags]    Android
    readResult    should just connect

STTL-116707 Printer Zebra should just connect wait for isConnected
    [Documentation]
    [Tags]    Android
    readResult    should just connect wait for isConnected

STTL-116708 Printer Zebra disconnect and try to print should return status error
    [Documentation]
    [Tags]    Android
    readResult    disconnect and try to print should return status error

STTL-116709 Printer Zebra using connectWithOptions should connect without callback and params null
    [Documentation]
    [Tags]    Android
    readResult    using connectWithOptions should connect without callback and params null

STTL-116710 Printer Zebra using connectWithOptions should connect withcb callback and params null
    [Documentation]
    [Tags]    Android
    readResult    using connectWithOptions should connect withcb callback and params null

STTL-116711 Printer Zebra using connectWithOptions should connect anonymous callback and params null
    [Documentation]
    [Tags]    Android
    readResult    using connectWithOptions should connect anonymous callback and params null

STTL-116712 Printer Zebra using connectWithOptions should connect without callback and params 20000
    [Documentation]
    [Tags]    Android
    readResult    using connectWithOptions should connect without callback and params 20000

STTL-116713 Printer Zebra using connectWithOptions should connect withcb callback and params 20000
    [Documentation]
    [Tags]    Android
    readResult    using connectWithOptions should connect withcb callback and params 20000

STTL-116714 Printer Zebra using connectWithOptions should connect anonymous callback and params 20000
    [Documentation]
    [Tags]    Android
    readResult    using connectWithOptions should connect anonymous callback and params 20000

STTL-116715 Printer Zebra using connectWithOptions should connect without callback and params 10000
    [Documentation]
    [Tags]    Android
    readResult    using connectWithOptions should connect without callback and params 10000

STTL-116716 Printer Zebra using connectWithOptions should connect withcb callback and params 10000
    [Documentation]
    [Tags]    Android
    readResult    using connectWithOptions should connect withcb callback and params 10000

STTL-116717 Printer Zebra using connectWithOptions should connect anonymous callback and params 10000
    [Documentation]
    [Tags]    Android
    readResult    using connectWithOptions should connect anonymous callback and params 10000

STTL-116718 Printer Zebra using connectWithOptions should connect without callback and params 15000
    [Documentation]
    [Tags]    Android
    readResult    using connectWithOptions should connect without callback and params 15000

STTL-116719 Printer Zebra using connectWithOptions should connect withcb callback and params 15000
    [Documentation]
    [Tags]    Android
    readResult    using connectWithOptions should connect withcb callback and params 15000

STTL-116720 Printer Zebra using connectWithOptions should connect anonymous callback and params 15000
    [Documentation]
    [Tags]    Android
    readResult    using connectWithOptions should connect anonymous callback and params 15000

STTL-116721 Printer Zebra should connect before retrieveFileNames
    [Documentation]
    [Tags]    Android
    readResult    should connect before retrieveFileNames

STTL-116722 Printer Zebra should retrieveFileNames return non empty list with callback
    [Documentation]
    [Tags]    Android
    readResult    should retrieveFileNames return non empty list with callback

STTL-116723 Printer Zebra should retrieveFileNames return non empty list anonymous callback
    [Documentation]
    [Tags]    Android
    readResult    should retrieveFileNames return non empty list anonymous callback

STTL-116724 Printer Zebra should retrieveFileNamesWithExtensions return non empty list with callback
    [Documentation]
    [Tags]    Android
    readResult    should retrieveFileNamesWithExtensions return non empty list with callback

STTL-116725 Printer Zebra should retrieveFileNamesWithExtensions return non empty list anonymous callback
    [Documentation]
    [Tags]    Android
    readResult    should retrieveFileNamesWithExtensions return non empty list anonymous callback

STTL-116726 Printer Zebra should not retrieveFileNamesWithExtensions return empty list with callback
    [Documentation]
    [Tags]    Android
    readResult    should not retrieveFileNamesWithExtensions return empty list with callback

STTL-116727 Printer Zebra should connect before storeImage
    [Documentation]
    [Tags]    Android
    readResult    should connect before storeImage

STTL-116728 Printer Zebra should store image 320px png PNG with width 50 and height 50
    [Documentation]
    [Tags]    Android
    readResult    should store image 320px png PNG with width 50 and height 50

STTL-116729 Printer Zebra should store image 320px png E:TF1 with width 50 and height 50
    [Documentation]
    [Tags]    Android
    readResult    should store image 320px png E:TF1 with width 50 and height 50

STTL-116730 Printer Zebra should store image 320px png R:TF1 with width 50 and height 50
    [Documentation]
    [Tags]    Android
    readResult    should store image 320px png R:TF1 with width 50 and height 50

STTL-116731 Printer Zebra should store image 320px png TF2 with width -1 and height -1
    [Documentation]
    [Tags]    Android
    readResult    should store image 320px png TF2 with width -1 and height -1

STTL-116732 Printer Zebra should store image 320px png R:C010 with width 1 and height 1
    [Documentation]
    [Tags]    Android
    readResult    should store image 320px png R:C010 with width 1 and height 1

STTL-116733 Printer Zebra should store image 640px png R:C011 with width 1 and height 1
    [Documentation]
    [Tags]    Android
    readResult    should store image 640px png R:C011 with width 1 and height 1

STTL-116734 Printer Zebra should store image 1024px png R:C012 with width 1 and height 1
    [Documentation]
    [Tags]    Android
    readResult    should store image 1024px png R:C012 with width 1 and height 1

STTL-116735 Printer Zebra should store image 320px png R:C020 with width 10 and height 10
    [Documentation]
    [Tags]    Android
    readResult    should store image 320px png R:C020 with width 10 and height 10

STTL-116736 Printer Zebra should store image 640px png R:C021 with width 10 and height 10
    [Documentation]
    [Tags]    Android
    readResult    should store image 640px png R:C021 with width 10 and height 10

STTL-116737 Printer Zebra should store image 1024px png R:C022 with width 10 and height 10
    [Documentation]
    [Tags]    Android
    readResult    should store image 1024px png R:C022 with width 10 and height 10

STTL-116738 Printer Zebra should store image 320px png R:C030 with width 50 and height 50
    [Documentation]
    [Tags]    Android
    readResult    should store image 320px png R:C030 with width 50 and height 50

STTL-116739 Printer Zebra should store image 640px png R:C031 with width 50 and height 50
    [Documentation]
    [Tags]    Android
    readResult    should store image 640px png R:C031 with width 50 and height 50

STTL-116740 Printer Zebra should store image 1024px png R:C032 with width 50 and height 50
    [Documentation]
    [Tags]    Android
    readResult    should store image 1024px png R:C032 with width 50 and height 50

STTL-116741 Printer Zebra should store image 320px png R:C040 with width 100 and height 100
    [Documentation]
    [Tags]    Android
    readResult    should store image 320px png R:C040 with width 100 and height 100

STTL-116742 Printer Zebra should store image 640px png R:C041 with width 100 and height 100
    [Documentation]
    [Tags]    Android
    readResult    should store image 640px png R:C041 with width 100 and height 100

STTL-116743 Printer Zebra should store image 1024px png R:C042 with width 100 and height 100
    [Documentation]
    [Tags]    Android
    readResult    should store image 1024px png R:C042 with width 100 and height 100

STTL-116744 Printer Zebra should store image 320px png R:C050 with width 1000 and height 1000
    [Documentation]
    [Tags]    Android
    readResult    should store image 320px png R:C050 with width 1000 and height 1000

STTL-116745 Printer Zebra should store image 640px png R:C051 with width 1000 and height 1000
    [Documentation]
    [Tags]    Android
    readResult    should store image 640px png R:C051 with width 1000 and height 1000

STTL-116746 Printer Zebra should store image 1024px png R:C052 with width 1000 and height 1000
    [Documentation]
    [Tags]    Android
    readResult    should store image 1024px png R:C052 with width 1000 and height 1000

STTL-116747 Printer Zebra should store image 320px png R:C060 with width -1 and height -1
    [Documentation]
    [Tags]    Android
    readResult    should store image 320px png R:C060 with width -1 and height -1

STTL-116748 Printer Zebra should store image 640px png R:C061 with width -1 and height -1
    [Documentation]
    [Tags]    Android
    readResult    should store image 640px png R:C061 with width -1 and height -1

STTL-116749 Printer Zebra should store image 1024px png R:C062 with width -1 and height -1
    [Documentation]
    [Tags]    Android
    readResult    should store image 1024px png R:C062 with width -1 and height -1

STTL-116750 Printer Zebra should store image 320px jpg R:C110 with width 1 and height 1
    [Documentation]
    [Tags]    Android
    readResult    should store image 320px jpg R:C110 with width 1 and height 1

STTL-116751 Printer Zebra should store image 640px jpg R:C111 with width 1 and height 1
    [Documentation]
    [Tags]    Android
    readResult    should store image 640px jpg R:C111 with width 1 and height 1

STTL-116752 Printer Zebra should store image 1024px jpg R:C112 with width 1 and height 1
    [Documentation]
    [Tags]    Android
    readResult    should store image 1024px jpg R:C112 with width 1 and height 1

STTL-116753 Printer Zebra should store image 320px jpg R:C120 with width 10 and height 10
    [Documentation]
    [Tags]    Android
    readResult    should store image 320px jpg R:C120 with width 10 and height 10

STTL-116754 Printer Zebra should store image 640px jpg R:C121 with width 10 and height 10
    [Documentation]
    [Tags]    Android
    readResult    should store image 640px jpg R:C121 with width 10 and height 10

STTL-116755 Printer Zebra should store image 1024px jpg R:C122 with width 10 and height 10
    [Documentation]
    [Tags]    Android
    readResult    should store image 1024px jpg R:C122 with width 10 and height 10

STTL-116756 Printer Zebra should store image 320px jpg R:C130 with width 50 and height 50
    [Documentation]
    [Tags]    Android
    readResult    should store image 320px jpg R:C130 with width 50 and height 50

STTL-116757 Printer Zebra should store image 640px jpg R:C131 with width 50 and height 50
    [Documentation]
    [Tags]    Android
    readResult    should store image 640px jpg R:C131 with width 50 and height 50

STTL-116758 Printer Zebra should store image 1024px jpg R:C132 with width 50 and height 50
    [Documentation]
    [Tags]    Android
    readResult    should store image 1024px jpg R:C132 with width 50 and height 50

STTL-116759 Printer Zebra should store image 320px jpg R:C140 with width 100 and height 100
    [Documentation]
    [Tags]    Android
    readResult    should store image 320px jpg R:C140 with width 100 and height 100

STTL-116760 Printer Zebra should store image 640px jpg R:C141 with width 100 and height 100
    [Documentation]
    [Tags]    Android
    readResult    should store image 640px jpg R:C141 with width 100 and height 100

STTL-116761 Printer Zebra should store image 1024px jpg R:C142 with width 100 and height 100
    [Documentation]
    [Tags]    Android
    readResult    should store image 1024px jpg R:C142 with width 100 and height 100

STTL-116762 Printer Zebra should store image 320px jpg R:C150 with width 1000 and height 1000
    [Documentation]
    [Tags]    Android
    readResult    should store image 320px jpg R:C150 with width 1000 and height 1000

STTL-116763 Printer Zebra should store image 640px jpg R:C151 with width 1000 and height 1000
    [Documentation]
    [Tags]    Android
    readResult    should store image 640px jpg R:C151 with width 1000 and height 1000

STTL-116764 Printer Zebra should store image 1024px jpg R:C152 with width 1000 and height 1000
    [Documentation]
    [Tags]    Android
    readResult    should store image 1024px jpg R:C152 with width 1000 and height 1000

STTL-116765 Printer Zebra should store image 320px jpg R:C160 with width -1 and height -1
    [Documentation]
    [Tags]    Android
    readResult    should store image 320px jpg R:C160 with width -1 and height -1

STTL-116766 Printer Zebra should store image 640px jpg R:C161 with width -1 and height -1
    [Documentation]
    [Tags]    Android
    readResult    should store image 640px jpg R:C161 with width -1 and height -1

STTL-116767 Printer Zebra should store image 1024px jpg R:C162 with width -1 and height -1
    [Documentation]
    [Tags]    Android
    readResult    should store image 1024px jpg R:C162 with width -1 and height -1

STTL-116768 Printer Zebra should store image with callback 320px png PNG with width 50 and height 50
    [Documentation]
    [Tags]    Android
    readResult    should store image with callback 320px png PNG with width 50 and height 50

STTL-116769 Printer Zebra should store image Anonymous callback 640px png E:TF1 with width 50 and height 50
    [Documentation]
    [Tags]    Android
    readResult    should store image Anonymous callback 640px png E:TF1 with width 50 and height 50

STTL-116770 Printer Zebra should store image with callback 1024px png R:TF1 with width 50 and height 50
    [Documentation]
    [Tags]    Android
    readResult    should store image with callback 1024px png R:TF1 with width 50 and height 50

STTL-116771 Printer Zebra should store image with callback 320px png TF2 with width -1 and height -1
    [Documentation]
    [Tags]    Android
    readResult    should store image with callback 320px png TF2 with width -1 and height -1

STTL-116772 Printer Zebra should store image with callback 320px jpg JPG with width 50 and height 50
    [Documentation]
    [Tags]    Android
    readResult    should store image with callback 320px jpg JPG with width 50 and height 50

STTL-116773 Printer Zebra should store image Anonymous callback 640px jpg E:JF1 with width 50 and height 50
    [Documentation]
    [Tags]    Android
    readResult    should store image Anonymous callback 640px jpg E:JF1 with width 50 and height 50

STTL-116774 Printer Zebra should store image with callback 1024px jpg R:JF1 with width 50 and height 50
    [Documentation]
    [Tags]    Android
    readResult    should store image with callback 1024px jpg R:JF1 with width 50 and height 50

STTL-116775 Printer Zebra should store image with callback 320px jpg JF2 with width -1 and height -1
    [Documentation]
    [Tags]    Android
    readResult    should store image with callback 320px jpg JF2 with width -1 and height -1

STTL-116776 Printer Zebra Should getProperty connectionType value as a string
    [Documentation]
    [Tags]    Android
    readResult    Should getProperty connectionType value as a string

STTL-116777 Printer Zebra Should getProperties connectionType value as a string
    [Documentation]
    [Tags]    Android
    readResult    Should getProperties connectionType value as a string

STTL-116778 Printer Zebra Should getProperty deviceAddress value as a string
    [Documentation]
    [Tags]    Android
    readResult    Should getProperty deviceAddress value as a string

STTL-116779 Printer Zebra Should getProperties deviceAddress value as a string
    [Documentation]
    [Tags]    Android
    readResult    Should getProperties deviceAddress value as a string

STTL-116780 Printer Zebra Should getProperty ID value as a string
    [Documentation]
    [Tags]    Android
    readResult    Should getProperty ID value as a string

STTL-116781 Printer Zebra Should getProperties ID value as a string
    [Documentation]
    [Tags]    Android
    readResult    Should getProperties ID value as a string

STTL-116782 Printer Zebra Should getProperty deviceName value as a string
    [Documentation]
    [Tags]    Android
    readResult    Should getProperty deviceName value as a string

STTL-116783 Printer Zebra Should getProperties deviceName value as a string
    [Documentation]
    [Tags]    Android
    readResult    Should getProperties deviceName value as a string

STTL-116784 Printer Zebra Should getProperty printerType value as a string
    [Documentation]
    [Tags]    Android
    readResult    Should getProperty printerType value as a string

STTL-116785 Printer Zebra Should getProperties printerType value as a string
    [Documentation]
    [Tags]    Android
    readResult    Should getProperties printerType value as a string

STTL-116786 Printer Zebra Should getProperty isConnected value as a boolean
    [Documentation]
    [Tags]    Android
    readResult    Should getProperty isConnected value as a boolean

STTL-116787 Printer Zebra Should getProperties isConnected value as a boolean
    [Documentation]
    [Tags]    Android
    readResult    Should getProperties isConnected value as a boolean

STTL-116788 Printer Zebra Should return devicePort value as an integer
    [Documentation]
    [Tags]    Android
    readResult    Should return devicePort value as an integer

STTL-116789 Printer Zebra Should return devicePort value as an integer using get properties
    [Documentation]
    [Tags]    Android
    readResult    Should return devicePort value as an integer using get properties

STTL-116790 Printer Zebra enumerateSupportedControlLanguages without callback
    [Documentation]
    [Tags]    Android
    readResult    enumerateSupportedControlLanguages without callback

STTL-116791 Printer Zebra enumerateSupportedControlLanguages with callback
    [Documentation]
    [Tags]    Android
    readResult    enumerateSupportedControlLanguages with callback

STTL-116792 Printer Zebra enumerateSupportedControlLanguages with anonymous callback
    [Documentation]
    [Tags]    Android
    readResult    enumerateSupportedControlLanguages with anonymous callback

STTL-116793 Printer Zebra should connect before requestState method
    [Documentation]
    [Tags]    Android
    readResult    should connect before requestState method

STTL-116794 Printer Zebra Request printer state for list of parameters
    [Documentation]
    [Tags]    Android
    readResult    Request printer state for list of parameters

STTL-116795 Printer Zebra Result of Request printer state Boolean values
    [Documentation]
    [Tags]    Android
    readResult    Result of Request printer state Boolean values

STTL-116796 Printer Zebra Result of Request printer state int values
    [Documentation]
    [Tags]    Android
    readResult    Result of Request printer state int values

STTL-116797 Printer Zebra Result of Request printer state printmode values
    [Documentation]
    [Tags]    Android
    readResult    Result of Request printer state printmode values

STTL-116798 Printer Zebra callback should not fire after calling stopSearch
    [Documentation]
    [Tags]    Android
    readResult    callback should not fire after calling stopSearch

STTL-116799 Printer Zebra there is an instance of a printer
    [Documentation]
    [Tags]    Android
    readResult    there is an instance of a printer

STTL-116800 Printer Zebra set default PrinterZebra
    [Documentation]
    [Tags]    Android
    readResult    set default PrinterZebra

STTL-116801 Printer Zebra get default PrinterZebra
    [Documentation]
    [Tags]    Android
    readResult    get default PrinterZebra

STTL-116802 Printer Zebra should connect before printFile method
    [Documentation]
    [Tags]    Android
    readResult    should connect before printFile method

STTL-116803 Printer Zebra should print png with callback
    [Documentation]
    [Tags]    Android
    readResult    should print png with callback

STTL-116804 Printer Zebra should print png with anonymous callback
    [Documentation]
    [Tags]    Android
    readResult    should print png with anonymous callback

STTL-116805 Printer Zebra should print jpeg with callback
    [Documentation]
    [Tags]    Android
    readResult    should print jpeg with callback

STTL-116806 Printer Zebra should print jpeg with anonymous callback
    [Documentation]
    [Tags]    Android
    readResult    should print jpeg with anonymous callback

STTL-116807 Printer Zebra should not print empty filename with callback
    [Documentation]
    [Tags]    Android
    readResult    should not print empty filename with callback

STTL-116808 Printer Zebra should not print invalid filename with callback
    [Documentation]
    [Tags]    Android
    readResult    should not print invalid filename with callback

STTL-116809 Printer Zebra should print ZPL Command with callback
    [Documentation]
    [Tags]    Android
    readResult    should print ZPL Command with callback

STTL-116810 Printer Zebra should print CPCL Command with callback
    [Documentation]
    [Tags]    Android
    readResult    should print CPCL Command with callback

STTL-116811 Printer Zebra should not print String with callback
    [Documentation]
    [Tags]    Android
    readResult    should not print String with callback

STTL-116812 Printer Zebra should print test_zpl with callback
    [Documentation]
    [Tags]    Android
    readResult    should print test_zpl with callback

STTL-116813 Printer Zebra should print test_cpcl with callback
    [Documentation]
    [Tags]    Android
    readResult    should print test_cpcl with callback

STTL-116814 Printer Zebra should not print invalidcontentsfilepath with callback
    [Documentation]
    [Tags]    Android
    readResult    should not print invalidcontentsfilepath with callback

STTL-116815 Printer Zebra should print image 320px png at 0 0 with width 50 and height 50
    [Documentation]
    [Tags]    Android
    readResult    should print image 320px png at 0 0 with width 50 and height 50

STTL-116816 Printer Zebra should print image 640px png at 10 10 with width 50 and height 50
    [Documentation]
    [Tags]    Android
    readResult    should print image 640px png at 10 10 with width 50 and height 50

STTL-116817 Printer Zebra should print image 1024px png at -10 -10 with width 50 and height 50
    [Documentation]
    [Tags]    Android
    readResult    should print image 1024px png at -10 -10 with width 50 and height 50

STTL-116818 Printer Zebra should print image 2048px png at 50 50 with width 50 and height 50
    [Documentation]
    [Tags]    Android
    readResult    should print image 2048px png at 50 50 with width 50 and height 50

STTL-116819 Printer Zebra should print image 320px png at -50 -50 with width 100 and height 100
    [Documentation]
    [Tags]    Android
    readResult    should print image 320px png at -50 -50 with width 100 and height 100

STTL-116820 Printer Zebra should print image 640px png at 100 -100 with width 100 and height 100
    [Documentation]
    [Tags]    Android
    readResult    should print image 640px png at 100 -100 with width 100 and height 100

STTL-116821 Printer Zebra should print image 1024px png at 0 0 with width 100 and height 100
    [Documentation]
    [Tags]    Android
    readResult    should print image 1024px png at 0 0 with width 100 and height 100

STTL-116822 Printer Zebra should print image 2048px png at 10 10 with width 100 and height 100
    [Documentation]
    [Tags]    Android
    readResult    should print image 2048px png at 10 10 with width 100 and height 100

STTL-116823 Printer Zebra should print image 320px png at -10 -10 with width -1 and height -1
    [Documentation]
    [Tags]    Android
    readResult    should print image 320px png at -10 -10 with width -1 and height -1

STTL-116824 Printer Zebra should print image 640px png at 50 50 with width -1 and height -1
    [Documentation]
    [Tags]    Android
    readResult    should print image 640px png at 50 50 with width -1 and height -1

STTL-116825 Printer Zebra should print image 1024px png at -50 -50 with width -1 and height -1
    [Documentation]
    [Tags]    Android
    readResult    should print image 1024px png at -50 -50 with width -1 and height -1

STTL-116826 Printer Zebra should print image 2048px png at 100 -100 with width -1 and height -1
    [Documentation]
    [Tags]    Android
    readResult    should print image 2048px png at 100 -100 with width -1 and height -1

STTL-116827 Printer Zebra should print image 320px jpg at 0 0 with width 50 and height 50
    [Documentation]
    [Tags]    Android
    readResult    should print image 320px jpg at 0 0 with width 50 and height 50

STTL-116828 Printer Zebra should print image 640px jpg at 10 10 with width 50 and height 50
    [Documentation]
    [Tags]    Android
    readResult    should print image 640px jpg at 10 10 with width 50 and height 50

STTL-116829 Printer Zebra should print image 1024px jpg at -10 -10 with width 50 and height 50
    [Documentation]
    [Tags]    Android
    readResult    should print image 1024px jpg at -10 -10 with width 50 and height 50

STTL-116830 Printer Zebra should print image 2048px jpg at 50 50 with width 50 and height 50
    [Documentation]
    [Tags]    Android
    readResult    should print image 2048px jpg at 50 50 with width 50 and height 50

STTL-116831 Printer Zebra should print image 320px jpg at -50 -50 with width 100 and height 100
    [Documentation]
    [Tags]    Android
    readResult    should print image 320px jpg at -50 -50 with width 100 and height 100

STTL-116832 Printer Zebra should print image 640px jpg at 100 -100 with width 100 and height 100
    [Documentation]
    [Tags]    Android
    readResult    should print image 640px jpg at 100 -100 with width 100 and height 100

STTL-116833 Printer Zebra should print image 1024px jpg at 0 0 with width 100 and height 100
    [Documentation]
    [Tags]    Android
    readResult    should print image 1024px jpg at 0 0 with width 100 and height 100

STTL-116834 Printer Zebra should print image 2048px jpg at 10 10 with width 100 and height 100
    [Documentation]
    [Tags]    Android
    readResult    should print image 2048px jpg at 10 10 with width 100 and height 100

STTL-116835 Printer Zebra should print image 320px jpg at -10 -10 with width -1 and height -1
    [Documentation]
    [Tags]    Android
    readResult    should print image 320px jpg at -10 -10 with width -1 and height -1

STTL-116836 Printer Zebra should print image 640px jpg at 50 50 with width -1 and height -1
    [Documentation]
    [Tags]    Android
    readResult    should print image 640px jpg at 50 50 with width -1 and height -1

STTL-116837 Printer Zebra should print image 1024px jpg at -50 -50 with width -1 and height -1
    [Documentation]
    [Tags]    Android
    readResult    should print image 1024px jpg at -50 -50 with width -1 and height -1

STTL-116838 Printer Zebra should print image 2048px jpg at 100 -100 with width -1 and height -1
    [Documentation]
    [Tags]    Android
    readResult    should print image 2048px jpg at 100 -100 with width -1 and height -1

STTL-116839 Printer Zebra should print image Anonymous callback 640px png at 10 10 with width 50 and height 50
    [Documentation]
    [Tags]    Android
    readResult    should print image Anonymous callback 640px png at 10 10 with width 50 and height 50

STTL-116840 Printer Zebra should print image Anonymous callback 1024px png at 10 10 with width -1 and height -1
    [Documentation]
    [Tags]    Android
    readResult    should print image Anonymous callback 1024px png at 10 10 with width -1 and height -1

STTL-116841 Printer Zebra should print image Anonymous callback 640px jpg at 10 10 with width 50 and height 50
    [Documentation]
    [Tags]    Android
    readResult    should print image Anonymous callback 640px jpg at 10 10 with width 50 and height 50

STTL-116842 Printer Zebra should print image Anonymous callback 1024px jpg at 10 10 with width -1 and height -1
    [Documentation]
    [Tags]    Android
    readResult    should print image Anonymous callback 1024px jpg at 10 10 with width -1 and height -1

STTL-116843 Printer Zebra Should print a ZPL Language stored format by Hash with callback
    [Documentation]
    [Tags]    Android
    readResult    Should print a ZPL Language stored format by Hash with callback

STTL-116844 Printer Zebra Should print a ZPL Language stored format by Hash Anonymous callback
    [Documentation]
    [Tags]    Android
    readResult    Should print a ZPL Language stored format by Hash Anonymous callback

STTL-116845 Printer Zebra Should print a invalid stored format by Hash with callback
    [Documentation]
    [Tags]    Android
    readResult    Should print a invalid stored format by Hash with callback

STTL-116846 Printer Zebra Should print a ZPL Language stored format by Array with callback
    [Documentation]
    [Tags]    Android
    readResult    Should print a ZPL Language stored format by Array with callback

STTL-116847 Printer Zebra Should print a ZPL Language stored format by Array Anonymous callback
    [Documentation]
    [Tags]    Android
    readResult    Should print a ZPL Language stored format by Array Anonymous callback

STTL-116848 Printer Zebra Should print a invalid stored format by Array with callback
    [Documentation]
    [Tags]    Android
    readResult    Should print a invalid stored format by Array with callback

STTL-116849 Printer Zebra Should print a raw string after setting default printer
    [Documentation]
    [Tags]    Android
    readResult    Should print a raw string after setting default printer

