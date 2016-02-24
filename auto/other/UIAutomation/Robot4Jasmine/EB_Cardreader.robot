*** Settings ***
Library    jasmineTests.py
Library    config.py
Suite Setup    precondition

*** keywords ***
precondition
    waitTimeCapture    120
    startPath    Configuration/Applications/Application/General,StartPage,<StartPage value="http://127.0.0.1:8082/app/CardreaderTest/specRunner.html" name="Menu"/>

*** Test Cases ***
STTL-116701 Cardreader does nothing
    [Documentation]
    [Tags]    Android
    readResult    does nothing

STTL-116702 Cardreader Cardreader open1
    [Documentation]
    [Tags]    Android
    readResult    Cardreader open1

STTL-116703 Cardreader VT286-0001/VT286-0009 - autoEnter getproperty before setting any value - false
    [Documentation]
    [Tags]    Android
    readResult    VT286-0001/VT286-0009 - autoEnter getproperty before setting any value - false

STTL-116704 Cardreader VT286-0002/VT286-0010 - autoTab getproperty before setting any value - false
    [Documentation]
    [Tags]    Android
    readResult    VT286-0002/VT286-0010 - autoTab getproperty before setting any value - false

STTL-116705 Cardreader VT286-0001/VT286-0009 - autoEnter getproperties before setting any value - false
    [Documentation]
    [Tags]    Android
    readResult    VT286-0001/VT286-0009 - autoEnter getproperties before setting any value - false

STTL-116706 Cardreader VT286-0002/VT286-0010 - autoTab getproperties before setting any value - false
    [Documentation]
    [Tags]    Android
    readResult    VT286-0002/VT286-0010 - autoTab getproperties before setting any value - false

STTL-116707 Cardreader VT286-0208 - autoEnter getproperty instance before setting any value - false
    [Documentation]
    [Tags]    Android
    readResult    VT286-0208 - autoEnter getproperty instance before setting any value - false

STTL-116708 Cardreader VT286-0209 - autoTab getproperty instance before setting any value - false
    [Documentation]
    [Tags]    Android
    readResult    VT286-0209 - autoTab getproperty instance before setting any value - false

STTL-116709 Cardreader Cardreader open2
    [Documentation]
    [Tags]    Android
    readResult    Cardreader open2

STTL-116710 Cardreader VT286-0213 - get Auto enter default value as true
    [Documentation]
    [Tags]    Android
    readResult    VT286-0213 - get Auto enter default value as true

STTL-116711 Cardreader VT286-0214 - get Auto Tab default value as true
    [Documentation]
    [Tags]    Android
    readResult    VT286-0214 - get Auto Tab default value as true

STTL-116712 Cardreader Cardreader close1
    [Documentation]
    [Tags]    Android
    readResult    Cardreader close1

STTL-116713 Cardreader Cardreader open3
    [Documentation]
    [Tags]    Android
    readResult    Cardreader open3

STTL-116714 Cardreader VT286-0017/VT286-0045/VT286-0097 - set autoEnter to true and getproperty after setting - true
    [Documentation]
    [Tags]    Android
    readResult    VT286-0017/VT286-0045/VT286-0097 - set autoEnter to true and getproperty after setting - true

STTL-116715 Cardreader VT286-0018/VT286-0046/VT286-0098 - set autoEnter to false and getproperty after setting - false
    [Documentation]
    [Tags]    Android
    readResult    VT286-0018/VT286-0046/VT286-0098 - set autoEnter to false and getproperty after setting - false

STTL-116716 Cardreader VT286-0022/VT286-0050/VT286-0102 - set autoTab to true and getproperty after setting - false
    [Documentation]
    [Tags]    Android
    readResult    VT286-0022/VT286-0050/VT286-0102 - set autoTab to true and getproperty after setting - false

STTL-116717 Cardreader VT286-0023/VT286-0051/VT286-0103 - set autoTab to false and getproperty after setting - false
    [Documentation]
    [Tags]    Android
    readResult    VT286-0023/VT286-0051/VT286-0103 - set autoTab to false and getproperty after setting - false

STTL-116718 Cardreader Cardreader close2
    [Documentation]
    [Tags]    Android
    readResult    Cardreader close2

STTL-116719 Cardreader Cardreader open4
    [Documentation]
    [Tags]    Android
    readResult    Cardreader open4

STTL-116720 Cardreader VT286-0017/VT286-0045/VT286-0097 - set autoEnter to true and getproperties after setting - true
    [Documentation]
    [Tags]    Android
    readResult    VT286-0017/VT286-0045/VT286-0097 - set autoEnter to true and getproperties after setting - true

STTL-116721 Cardreader VT286-0018/VT286-0046/VT286-0098 - set autoEnter to false and getproperties after setting - false
    [Documentation]
    [Tags]    Android
    readResult    VT286-0018/VT286-0046/VT286-0098 - set autoEnter to false and getproperties after setting - false

STTL-116722 Cardreader VT286-0022/VT286-0050/VT286-0102 - set autoTab to true and getproperties after setting - false
    [Documentation]
    [Tags]    Android
    readResult    VT286-0022/VT286-0050/VT286-0102 - set autoTab to true and getproperties after setting - false

STTL-116723 Cardreader VT286-0023/VT286-0051/VT286-0103 - set autoTab to false and getproperties after setting - false
    [Documentation]
    [Tags]    Android
    readResult    VT286-0023/VT286-0051/VT286-0103 - set autoTab to false and getproperties after setting - false

STTL-116724 Cardreader Cardreader close3
    [Documentation]
    [Tags]    Android
    readResult    Cardreader close3

STTL-116725 Cardreader Cardreader open5
    [Documentation]
    [Tags]    Android
    readResult    Cardreader open5

STTL-116726 Cardreader VT286-0218/VT286-0226 - set autoEnter to true and getproperty instance after setting - true
    [Documentation]
    [Tags]    Android
    readResult    VT286-0218/VT286-0226 - set autoEnter to true and getproperty instance after setting - true

STTL-116727 Cardreader VT286-0219/VT286-0227 - set autoEnter to false and getproperty instance after setting - false
    [Documentation]
    [Tags]    Android
    readResult    VT286-0219/VT286-0227 - set autoEnter to false and getproperty instance after setting - false

STTL-116728 Cardreader VT286-0220/VT286-0228 - set autoTab to true and getproperty instance after setting - false
    [Documentation]
    [Tags]    Android
    readResult    VT286-0220/VT286-0228 - set autoTab to true and getproperty instance after setting - false

STTL-116729 Cardreader VT286-0221/VT286-0229 - set autoTab to false and getproperty instance after setting - false
    [Documentation]
    [Tags]    Android
    readResult    VT286-0221/VT286-0229 - set autoTab to false and getproperty instance after setting - false

STTL-116730 Cardreader Cardreader close4
    [Documentation]
    [Tags]    Android
    readResult    Cardreader close4

STTL-116731 Cardreader Cardreader open6
    [Documentation]
    [Tags]    Android
    readResult    Cardreader open6

STTL-116732 Cardreader VT286-0218/VT286-0226 - set autoEnter to true and getproperties instance after setting - true
    [Documentation]
    [Tags]    Android
    readResult    VT286-0218/VT286-0226 - set autoEnter to true and getproperties instance after setting - true

STTL-116733 Cardreader VT286-0219/VT286-0227 - set autoEnter to false and getproperties instance after setting - false
    [Documentation]
    [Tags]    Android
    readResult    VT286-0219/VT286-0227 - set autoEnter to false and getproperties instance after setting - false

STTL-116734 Cardreader VT286-0220/VT286-0228 - set autoTab to true and getproperties instance after setting - false
    [Documentation]
    [Tags]    Android
    readResult    VT286-0220/VT286-0228 - set autoTab to true and getproperties instance after setting - false

STTL-116735 Cardreader VT286-0221/VT286-0229 - set autoTab to false and getproperties instance after setting - false
    [Documentation]
    [Tags]    Android
    readResult    VT286-0221/VT286-0229 - set autoTab to false and getproperties instance after setting - false

STTL-116736 Cardreader Cardreader close5
    [Documentation]
    [Tags]    Android
    readResult    Cardreader close5

STTL-116737 Cardreader Cardreader open7
    [Documentation]
    [Tags]    Android
    readResult    Cardreader open7

STTL-116738 Cardreader VT286-0073 - Auto enter true
    [Documentation]
    [Tags]    Android
    readResult    VT286-0073 - Auto enter true

STTL-116739 Cardreader VT286-0074 - Auto enter false
    [Documentation]
    [Tags]    Android
    readResult    VT286-0074 - Auto enter false

STTL-116740 Cardreader VT286-0078 - Auto Tab true
    [Documentation]
    [Tags]    Android
    readResult    VT286-0078 - Auto Tab true

STTL-116741 Cardreader VT286-0079 - Auto Tab false
    [Documentation]
    [Tags]    Android
    readResult    VT286-0079 - Auto Tab false

STTL-116742 Cardreader Cardreader close6
    [Documentation]
    [Tags]    Android
    readResult    Cardreader close6

