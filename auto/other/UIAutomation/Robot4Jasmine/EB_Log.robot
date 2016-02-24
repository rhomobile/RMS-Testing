*** Settings ***
Library    jasmineTests.py
Library    config.py
Suite Setup    precondition

*** keywords ***
precondition
    waitTimeCapture    60
    startPath    Configuration/Applications/Application/General,StartPage,<StartPage value="http://127.0.0.1:8082/app/LogTest/specRunner.html" name="Menu"/>

*** Test Cases ***
STTL-116701 Log VT290-328 : Set Log filepath -
    [Documentation]
    [Tags]    Android
    readResult    VT290-328 : Set Log filepath -

STTL-116702 Log VT290-329 : Set Log filepath -
    [Documentation]
    [Tags]    Android
    readResult    VT290-329 : Set Log filepath -

STTL-116703 Log VT290-333 : Set Log filsize - 3000
    [Documentation]
    [Tags]    Android
    readResult    VT290-333 : Set Log filsize - 3000

STTL-116704 Log VT290-373 : Clear log file - true
    [Documentation]
    [Tags]    Android
    readResult    VT290-373 : Clear log file - true

STTL-116705 Log VT290-391 : Call readLogFile() method with valid parameter -
    [Documentation]
    [Tags]    Android
    readResult    VT290-391 : Call readLogFile() method with valid parameter - 

STTL-116706 Log VT290-397 : send log file with valid path, no callback- log exists
    [Documentation]
    [Tags]    Android
    readResult    VT290-397 : send log file with valid path, no callback- log exists

STTL-116707 Log VT290-398 : send log file with valid path, function callback- log exists
    [Documentation]
    [Tags]    Android
    readResult    VT290-398 : send log file with valid path, function callback- log exists

STTL-116708 Log VT290-400 : send log file with valid path, anonyomous function callback- log exists
    [Documentation]
    [Tags]    Android
    readResult    VT290-400 : send log file with valid path, anonyomous function callback- log exists

STTL-116709 Log VT290-300 : Log destination to file only
    [Documentation]
    [Tags]    Android
    readResult    VT290-300 : Log destination to file only

STTL-116710 Log VT290-301 : Log destination to stdio only
    [Documentation]
    [Tags]    Android
    readResult    VT290-301 : Log destination to stdio only

STTL-116711 Log VT290-302 : Log destination to URI only
    [Documentation]
    [Tags]    Android
    readResult    VT290-302 : Log destination to URI only

STTL-116712 Log VT290-303 : Log destination to file, stdio, uri
    [Documentation]
    [Tags]    Android
    readResult    VT290-303 : Log destination to file, stdio, uri

STTL-116713 Log VT290-304 : Log destination to stdio,file, uri
    [Documentation]
    [Tags]    Android
    readResult    VT290-304 : Log destination to stdio,file, uri

STTL-116714 Log VT290-305 : Log destination to stdio, uri , file
    [Documentation]
    [Tags]    Android
    readResult    VT290-305 : Log destination to stdio, uri , file

STTL-116715 Log VT290-306 : Log destination to uri, file,stdio
    [Documentation]
    [Tags]    Android
    readResult    VT290-306 : Log destination to uri, file,stdio

STTL-116716 Log VT290-307 : Log destination to uri, stdio,file
    [Documentation]
    [Tags]    Android
    readResult    VT290-307 : Log destination to uri, stdio,file

STTL-116717 Log VT290-308 : Log destination to file, stdio
    [Documentation]
    [Tags]    Android
    readResult    VT290-308 : Log destination to file, stdio

STTL-116718 Log VT290-309 : Log destination to file, uri
    [Documentation]
    [Tags]    Android
    readResult    VT290-309 : Log destination to file, uri

STTL-116719 Log VT290-310 : Log destination to stdio, uri
    [Documentation]
    [Tags]    Android
    readResult    VT290-310 : Log destination to stdio, uri

STTL-116720 Log VT290-311 : Log destination to empty
    [Documentation]
    [Tags]    Android
    readResult    VT290-311 : Log destination to empty

STTL-116721 Log VT290-312 : Log destination to empty
    [Documentation]
    [Tags]    Android
    readResult    VT290-312 : Log destination to empty

STTL-116722 Log VT290-313 : Set Log destinationURI to valid destination
    [Documentation]
    [Tags]    Android
    readResult    VT290-313 : Set Log destinationURI to valid destination

STTL-116723 Log VT290-314 : Set Log destinationURI to valid destination with host address having IP address.
    [Documentation]
    [Tags]    Android
    readResult    VT290-314 : Set Log destinationURI to valid destination with host address having IP address.

STTL-116724 Log VT290-315 : Set Log destinationURI to valid destination with host address having DNS Name as address.
    [Documentation]
    [Tags]    Android
    readResult    VT290-315 : Set Log destinationURI to valid destination with host address having DNS Name as address.

STTL-116725 Log VT290-316 : Set Log destinationURI to valid destination with port number
    [Documentation]
    [Tags]    Android
    readResult    VT290-316 : Set Log destinationURI to valid destination with port number

STTL-116726 Log VT290-317 : Set Log destinationURI to valid secure destination
    [Documentation]
    [Tags]    Android
    readResult    VT290-317 : Set Log destinationURI to valid secure destination

STTL-116727 Log VT290-321 : Set Log excludeCategories : Application
    [Documentation]
    [Tags]    Android
    readResult    VT290-321 : Set Log excludeCategories : Application

STTL-116728 Log VT290-322 : Set Log excludeCategories to multiple modules: database, WebView
    [Documentation]
    [Tags]    Android
    readResult    VT290-322 : Set Log excludeCategories to multiple modules: database, WebView

STTL-116729 Log VT290-325 : Set Log excludefilter : username, password
    [Documentation]
    [Tags]    Android
    readResult    VT290-325 : Set Log excludefilter : username, password

STTL-116730 Log VT290-326 : Set Log excludeFilter to empty
    [Documentation]
    [Tags]    Android
    readResult    VT290-326 : Set Log excludeFilter to empty

STTL-116731 Log VT290-327 : Set Log excludeFilter to invalid value
    [Documentation]
    [Tags]    Android
    readResult    VT290-327 : Set Log excludeFilter to invalid value

STTL-116732 Log VT290-334 : Set Log filsize - 102400000
    [Documentation]
    [Tags]    Android
    readResult    VT290-334 : Set Log filsize - 102400000

STTL-116733 Log VT290-335 : Set Log filsize - 0
    [Documentation]
    [Tags]    Android
    readResult    VT290-335 : Set Log filsize - 0

STTL-116734 Log VT290-339 : Set Log includeCategories - database
    [Documentation]
    [Tags]    Android
    readResult    VT290-339 : Set Log includeCategories - database

STTL-116735 Log VT290-340 : Set Log includeCategories to * - *
    [Documentation]
    [Tags]    Android
    readResult    VT290-340 : Set Log includeCategories to * - *

STTL-116736 Log VT290-341 : Set Log includeCategories to multiple modules - system, webview, database
    [Documentation]
    [Tags]    Android
    readResult    VT290-341 : Set Log includeCategories to multiple modules - system, webview, database

STTL-116737 Log VT290-342 : Set Log includeCategories with valid and invalid database, webview, System, aaaa
    [Documentation]
    [Tags]    Android
    readResult    VT290-342 : Set Log includeCategories with valid and invalid database, webview, System, aaaa

STTL-116738 Log VT290-343 : Set Log includeCategories to empty
    [Documentation]
    [Tags]    Android
    readResult    VT290-343 : Set Log includeCategories to empty

STTL-116739 Log VT290-345 : Set Log include and excludeCategories - application and WebView Logs displayed
    [Documentation]
    [Tags]    Android
    readResult    VT290-345 : Set Log include and excludeCategories - application and WebView Logs displayed

STTL-116740 Log VT290-346 : Set Log Level to 4 - 4
    [Documentation]
    [Tags]    Android
    readResult    VT290-346 : Set Log Level to 4 - 4

STTL-116741 Log VT290-347 : Set Log Level to 3 - 3
    [Documentation]
    [Tags]    Android
    readResult    VT290-347 : Set Log Level to 3 - 3

STTL-116742 Log VT290-348 : Set Log Level to 2 - 2
    [Documentation]
    [Tags]    Android
    readResult    VT290-348 : Set Log Level to 2 - 2

STTL-116743 Log VT290-349 : Set Log Level to 1 - 1
    [Documentation]
    [Tags]    Android
    readResult    VT290-349 : Set Log Level to 1 - 1

STTL-116744 Log VT290-350 : Set Log Level to 0 - 0
    [Documentation]
    [Tags]    Android
    readResult    VT290-350 : Set Log Level to 0 - 0

STTL-116745 Log VT290-355 : Set Log Memory period to 2 secs - 2000
    [Documentation]
    [Tags]    Android
    readResult    VT290-355 : Set Log Memory period to 2 secs - 2000

STTL-116746 Log VT290-361 : Set netrace to true - true
    [Documentation]
    [Tags]    Android
    readResult    VT290-361 : Set netrace to true - true

STTL-116747 Log VT290-362 : Set netrace to false - false
    [Documentation]
    [Tags]    Android
    readResult    VT290-362 : Set netrace to false - false

STTL-116748 Log VT290-367 : Set skipPost to true - true
    [Documentation]
    [Tags]    Android
    readResult    VT290-367 : Set skipPost to true - true

STTL-116749 Log VT290-368 : Set skipPost to false - false
    [Documentation]
    [Tags]    Android
    readResult    VT290-368 : Set skipPost to false - false

STTL-116750 Log VT290-375 : Call error() method with message and categories -
    [Documentation]
    [Tags]    Android
    readResult    VT290-375 : Call error() method with message and categories - 

STTL-116751 Log VT290-379 : Call error() method with message and wrong category -
    [Documentation]
    [Tags]    Android
    readResult    VT290-379 : Call error() method with message and wrong category - 

STTL-116752 Log VT290-385 : Call info() method with message and categories -
    [Documentation]
    [Tags]    Android
    readResult    VT290-385 : Call info() method with message and categories - 

STTL-116753 Log VT290-404 : Call trace() method with message and categories - 1
    [Documentation]
    [Tags]    Android
    readResult    VT290-404 : Call trace() method with message and categories - 1

STTL-116754 Log VT290-409 : Call warning() method with message and categories - 1
    [Documentation]
    [Tags]    Android
    readResult    VT290-409 : Call warning() method with message and categories - 1

STTL-116755 Log VT290-413 : Call warning() method with message and invalid category - Error
    [Documentation]
    [Tags]    Android
    readResult    VT290-413 : Call warning() method with message and invalid category - Error

