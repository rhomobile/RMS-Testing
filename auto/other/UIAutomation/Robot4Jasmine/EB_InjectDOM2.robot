*** Settings ***
Library    jasmineTests.py
Library    config.py
Suite Setup    precondition

*** keywords ***
precondition
    waitTimeCapture    60
    startPath    Configuration/Applications/Application/General,StartPage,<StartPage value="http://127.0.0.1:8082/app/InjectDOM/specRunner2.html" name="Menu"/>

*** Test Cases ***
STTL-116701 InjectDOM VT399-0004 - Inject JS to load mytest2.js in only 2nd Page of the application(absolute)
    [Documentation]
    [Tags]    Android
    readResult    VT399-0004 - Inject JS to load mytest2.js in only 2nd Page of the application(absolute)

STTL-116702 InjectDOM VT399-0009 - Inject JS to load mytest24.js in only 2nd and 4th Page of the application(absolute)
    [Documentation]
    [Tags]    Android
    readResult    VT399-0009 - Inject JS to load mytest24.js in only 2nd and 4th Page of the application(absolute)

STTL-116703 InjectDOM VT399-0010 - Inject JS DOM elements in all pages [*] of application with mytest5.js(absolute)
    [Documentation]
    [Tags]    Android
    readResult    VT399-0010 - Inject JS DOM elements in all pages [*] of application with mytest5.js(absolute)

STTL-116704 InjectDOM VT399-0012 - Inject JS DOM elements only on page 2 of application with mytest4.js(absolute)
    [Documentation]
    [Tags]    Android
    readResult    VT399-0012 - Inject JS DOM elements only on page 2 of application with mytest4.js(absolute)

STTL-116705 InjectDOM VT399-0004 - Inject JS to load mytest2.js in only 2nd Page of the application(relative)
    [Documentation]
    [Tags]    Android
    readResult    VT399-0004 - Inject JS to load mytest2.js in only 2nd Page of the application(relative)

STTL-116706 InjectDOM VT399-0009 - Inject JS to load mytest24.js in only 2nd and 4th Page of the application(relative)
    [Documentation]
    [Tags]    Android
    readResult    VT399-0009 - Inject JS to load mytest24.js in only 2nd and 4th Page of the application(relative)

STTL-116707 InjectDOM VT399-0010 - Inject JS DOM elements in all pages [*] of application with mytest5.js(relative)
    [Documentation]
    [Tags]    Android
    readResult    VT399-0010 - Inject JS DOM elements in all pages [*] of application with mytest5.js(relative)

STTL-116708 InjectDOM VT399-0012 - Inject JS DOM elements only on page 2 of application with mytest4.js(relative)
    [Documentation]
    [Tags]    Android
    readResult    VT399-0012 - Inject JS DOM elements only on page 2 of application with mytest4.js(relative)

STTL-116709 InjectDOM VT399-0004 - Inject JS to load mytest2.js in only 2nd Page of the application(local)
    [Documentation]
    [Tags]    Android
    readResult    VT399-0004 - Inject JS to load mytest2.js in only 2nd Page of the application(local)

STTL-116710 InjectDOM VT399-0009 - Inject JS to load mytest24.js in only 2nd and 4th Page of the application(local)
    [Documentation]
    [Tags]    Android
    readResult    VT399-0009 - Inject JS to load mytest24.js in only 2nd and 4th Page of the application(local)

STTL-116711 InjectDOM VT399-0010 - Inject JS DOM elements in all pages [*] of application with mytest5.js(local)
    [Documentation]
    [Tags]    Android
    readResult    VT399-0010 - Inject JS DOM elements in all pages [*] of application with mytest5.js(local)

STTL-116712 InjectDOM VT399-0012 - Inject JS DOM elements only on page 2 of application with mytest4.js(local)
    [Documentation]
    [Tags]    Android
    readResult    VT399-0012 - Inject JS DOM elements only on page 2 of application with mytest4.js(local)

