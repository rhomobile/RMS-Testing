*** Settings ***
Library    jasmineTests.py
Library    config.py
Suite Setup    precondition

*** keywords ***
precondition
    waitTimeCapture    240
    startPath    Configuration/Applications/Application/General,StartPage,<StartPage value="http://127.0.0.1:8082/app/SignatureTest/specRunner.html" name="Menu"/>

*** Test Cases ***
STTL-116701 Signature Default value of bgColor should be '#FFFFFFFF'
    [Documentation]
    [Tags]    Android
    readResult    Default value of bgColor should be '#FFFFFFFF'

STTL-116702 Signature Default value of compressionFormat should be 'png'
    [Documentation]
    [Tags]    Android
    readResult    Default value of compressionFormat should be 'png'

STTL-116703 Signature Default value of fileName should be 'signature'
    [Documentation]
    [Tags]    Android
    readResult    Default value of fileName should be 'signature'

STTL-116704 Signature Default value of outputFormat should be 'image'
    [Documentation]
    [Tags]    Android
    readResult    Default value of outputFormat should be 'image'

STTL-116705 Signature Default value of penColor should be '#FF000000'
    [Documentation]
    [Tags]    Android
    readResult    Default value of penColor should be '#FF000000'

STTL-116706 Signature Default value of penWidth should be 3
    [Documentation]
    [Tags]    Android
    readResult    Default value of penWidth should be 3

STTL-116707 Signature Default value of border should be true
    [Documentation]
    [Tags]    Android
    readResult    Default value of border should be true

STTL-116708 Signature Default value of height should be 150
    [Documentation]
    [Tags]    Android
    readResult    Default value of height should be 150

STTL-116709 Signature Default value of left should be 15
    [Documentation]
    [Tags]    Android
    readResult    Default value of left should be 15

STTL-116710 Signature Default value of top should be 60
    [Documentation]
    [Tags]    Android
    readResult    Default value of top should be 60

STTL-116711 Signature Default value of width should be 200
    [Documentation]
    [Tags]    Android
    readResult    Default value of width should be 200

STTL-116712 Signature VT299-2006 - call show() with all string -
    [Documentation]
    [Tags]    Android
    readResult    VT299-2006 - call show() with all string -

STTL-116713 Signature VT299-2007 - call takeFullScreen() with all string -
    [Documentation]
    [Tags]    Android
    readResult    VT299-2007 - call takeFullScreen() with all string -

STTL-116714 Signature VT299-2010 - Call takeFullScreen() to check default values of all property -
    [Documentation]
    [Tags]    Android
    readResult    VT299-2010 - Call takeFullScreen() to check default values of all property -

STTL-116715 Signature VT299-2011 - call show() to check default values of all property -
    [Documentation]
    [Tags]    Android
    readResult    VT299-2011 - call show() to check default values of all property -

STTL-116716 Signature VT299-2008- call show() with required data types -
    [Documentation]
    [Tags]    Android
    readResult    VT299-2008- call show() with required data types -

STTL-116717 Signature VT299-2009 - call takeFullScreen() with required data types -
    [Documentation]
    [Tags]    Android
    readResult    VT299-2009 - call takeFullScreen() with required data types -

STTL-116718 Signature setting directly VT299-1001 - Set bgColor :#FF0000- #FF0000
    [Documentation]
    [Tags]    Android
    readResult    setting directly VT299-1001 - Set bgColor :#FF0000- #FF0000

STTL-116719 Signature setting directly VT299-1002 - Set bgColor :#0000FFFF- #0000FFFF
    [Documentation]
    [Tags]    Android
    readResult    setting directly VT299-1002 - Set bgColor :#0000FFFF- #0000FFFF

STTL-116720 Signature setting directly VT299-1003 - Set bgColor :#00000000- #00000000
    [Documentation]
    [Tags]    Android
    readResult    setting directly VT299-1003 - Set bgColor :#00000000- #00000000

STTL-116721 Signature setting directly VT299-1004 - Set bgColor :#FFFFFF- #FFFFFF
    [Documentation]
    [Tags]    Android
    readResult    setting directly VT299-1004 - Set bgColor :#FFFFFF- #FFFFFF

STTL-116722 Signature setting directly VT299-1005 - Set border :false- false
    [Documentation]
    [Tags]    Android
    readResult    setting directly VT299-1005 - Set border :false- false

STTL-116723 Signature setting directly VT299-1006 - Set border :true- true
    [Documentation]
    [Tags]    Android
    readResult    setting directly VT299-1006 - Set border :true- true

STTL-116724 Signature setting directly VT299-1007 - Set compressionFormat :jpg- jpg
    [Documentation]
    [Tags]    Android
    readResult    setting directly VT299-1007 - Set compressionFormat :jpg- jpg

STTL-116725 Signature setting directly VT299-1008 - Set compressionFormat :png- png
    [Documentation]
    [Tags]    Android
    readResult    setting directly VT299-1008 - Set compressionFormat :png- png

STTL-116726 Signature setting directly VT299-1009 - Set compressionFormat :bmp- bmp
    [Documentation]
    [Tags]    Android
    readResult    setting directly VT299-1009 - Set compressionFormat :bmp- bmp

STTL-116727 Signature setting directly VT299-1010 - Set fileName :Test- Test
    [Documentation]
    [Tags]    Android
    readResult    setting directly VT299-1010 - Set fileName :Test- Test

STTL-116728 Signature setting directly VT299-1012 - Set fileName :Test123- Test123
    [Documentation]
    [Tags]    Android
    readResult    setting directly VT299-1012 - Set fileName :Test123- Test123

STTL-116729 Signature setting directly VT299-1013 - Set fileName :Test_123- Test_123
    [Documentation]
    [Tags]    Android
    readResult    setting directly VT299-1013 - Set fileName :Test_123- Test_123

STTL-116730 Signature setting directly VT299-1015 - Set fileName :signature- signature
    [Documentation]
    [Tags]    Android
    readResult    setting directly VT299-1015 - Set fileName :signature- signature

STTL-116731 Signature setting directly VT299-1016 - Set height :100- 100
    [Documentation]
    [Tags]    Android
    readResult    setting directly VT299-1016 - Set height :100- 100

STTL-116732 Signature setting directly VT299-1017 - Set height :500- 500
    [Documentation]
    [Tags]    Android
    readResult    setting directly VT299-1017 - Set height :500- 500

STTL-116733 Signature setting directly VT299-1018 - Set height :150- 150
    [Documentation]
    [Tags]    Android
    readResult    setting directly VT299-1018 - Set height :150- 150

STTL-116734 Signature setting directly VT299-1020 - Set left :90- 90
    [Documentation]
    [Tags]    Android
    readResult    setting directly VT299-1020 - Set left :90- 90

STTL-116735 Signature setting directly VT299-1021 - Set left :550- 550
    [Documentation]
    [Tags]    Android
    readResult    setting directly VT299-1021 - Set left :550- 550

STTL-116736 Signature setting directly VT299-1022 - Set left :15- 15
    [Documentation]
    [Tags]    Android
    readResult    setting directly VT299-1022 - Set left :15- 15

STTL-116737 Signature setting directly VT299-1022 - Set left :0- 0
    [Documentation]
    [Tags]    Android
    readResult    setting directly VT299-1022 - Set left :0- 0

STTL-116738 Signature setting directly VT299-1023 - Set top :50- 50
    [Documentation]
    [Tags]    Android
    readResult    setting directly VT299-1023 - Set top :50- 50

STTL-116739 Signature setting directly VT299-1024 - Set top :150- 150
    [Documentation]
    [Tags]    Android
    readResult    setting directly VT299-1024 - Set top :150- 150

STTL-116740 Signature setting directly VT299-1025 - Set top :60- 60
    [Documentation]
    [Tags]    Android
    readResult    setting directly VT299-1025 - Set top :60- 60

STTL-116741 Signature setting directly VT299-1026 - Set top :0- 0
    [Documentation]
    [Tags]    Android
    readResult    setting directly VT299-1026 - Set top :0- 0

STTL-116742 Signature setting directly VT299-1027 - Set width :140- 140
    [Documentation]
    [Tags]    Android
    readResult    setting directly VT299-1027 - Set width :140- 140

STTL-116743 Signature setting directly VT299-1028 - Set width :450- 450
    [Documentation]
    [Tags]    Android
    readResult    setting directly VT299-1028 - Set width :450- 450

STTL-116744 Signature setting directly VT299-1029 - Set width :200- 200
    [Documentation]
    [Tags]    Android
    readResult    setting directly VT299-1029 - Set width :200- 200

STTL-116745 Signature setting directly VT299-1031 - Set outputFormat :dataUri- dataUri
    [Documentation]
    [Tags]    Android
    readResult    setting directly VT299-1031 - Set outputFormat :dataUri- dataUri

STTL-116746 Signature setting directly VT299-1032 - Set outputFormat :image- image
    [Documentation]
    [Tags]    Android
    readResult    setting directly VT299-1032 - Set outputFormat :image- image

STTL-116747 Signature setting directly VT299-1033 - Set penColor :#FF000000- #FF000000
    [Documentation]
    [Tags]    Android
    readResult    setting directly VT299-1033 - Set penColor :#FF000000- #FF000000

STTL-116748 Signature setting directly VT299-1034 - Set penColor :#FF00FF- #FF00FF
    [Documentation]
    [Tags]    Android
    readResult    setting directly VT299-1034 - Set penColor :#FF00FF- #FF00FF

STTL-116749 Signature setting directly VT299-1035 - Set penColor :#000000- #000000
    [Documentation]
    [Tags]    Android
    readResult    setting directly VT299-1035 - Set penColor :#000000- #000000

STTL-116750 Signature setting directly VT299-1036 - Set penColor :#FFFFFFFF- #FFFFFFFF
    [Documentation]
    [Tags]    Android
    readResult    setting directly VT299-1036 - Set penColor :#FFFFFFFF- #FFFFFFFF

STTL-116751 Signature setting directly VT299-1037 - Set penWidth :1- 1
    [Documentation]
    [Tags]    Android
    readResult    setting directly VT299-1037 - Set penWidth :1- 1

STTL-116752 Signature setting directly VT299-1038 - Set penWidth :5- 5
    [Documentation]
    [Tags]    Android
    readResult    setting directly VT299-1038 - Set penWidth :5- 5

STTL-116753 Signature setting directly VT299-1040 - Set penWidth :10- 10
    [Documentation]
    [Tags]    Android
    readResult    setting directly VT299-1040 - Set penWidth :10- 10

STTL-116754 Signature set using show VT299-1001 - Set bgColor :#FF0000- #FF0000
    [Documentation]
    [Tags]    Android
    readResult    set using show VT299-1001 - Set bgColor :#FF0000- #FF0000

STTL-116755 Signature set using show VT299-1002 - Set bgColor :#0000FFFF- #0000FFFF
    [Documentation]
    [Tags]    Android
    readResult    set using show VT299-1002 - Set bgColor :#0000FFFF- #0000FFFF

STTL-116756 Signature set using show VT299-1003 - Set bgColor :#00000000- #00000000
    [Documentation]
    [Tags]    Android
    readResult    set using show VT299-1003 - Set bgColor :#00000000- #00000000

STTL-116757 Signature set using show VT299-1004 - Set bgColor :#FFFFFF- #FFFFFF
    [Documentation]
    [Tags]    Android
    readResult    set using show VT299-1004 - Set bgColor :#FFFFFF- #FFFFFF

STTL-116758 Signature set using show VT299-1005 - Set border :false- false
    [Documentation]
    [Tags]    Android
    readResult    set using show VT299-1005 - Set border :false- false

STTL-116759 Signature set using show VT299-1006 - Set border :true- true
    [Documentation]
    [Tags]    Android
    readResult    set using show VT299-1006 - Set border :true- true

STTL-116760 Signature set using show VT299-1007 - Set compressionFormat :jpg- jpg
    [Documentation]
    [Tags]    Android
    readResult    set using show VT299-1007 - Set compressionFormat :jpg- jpg

STTL-116761 Signature set using show VT299-1008 - Set compressionFormat :png- png
    [Documentation]
    [Tags]    Android
    readResult    set using show VT299-1008 - Set compressionFormat :png- png

STTL-116762 Signature set using show VT299-1009 - Set compressionFormat :bmp- bmp
    [Documentation]
    [Tags]    Android
    readResult    set using show VT299-1009 - Set compressionFormat :bmp- bmp

STTL-116763 Signature set using show VT299-1010 - Set fileName :Test- Test
    [Documentation]
    [Tags]    Android
    readResult    set using show VT299-1010 - Set fileName :Test- Test

STTL-116764 Signature set using show VT299-1012 - Set fileName :Test123- Test123
    [Documentation]
    [Tags]    Android
    readResult    set using show VT299-1012 - Set fileName :Test123- Test123

STTL-116765 Signature set using show VT299-1013 - Set fileName :Test_123- Test_123
    [Documentation]
    [Tags]    Android
    readResult    set using show VT299-1013 - Set fileName :Test_123- Test_123

STTL-116766 Signature set using show VT299-1015 - Set fileName :signature- signature
    [Documentation]
    [Tags]    Android
    readResult    set using show VT299-1015 - Set fileName :signature- signature

STTL-116767 Signature set using show VT299-1016 - Set height :100- 100
    [Documentation]
    [Tags]    Android
    readResult    set using show VT299-1016 - Set height :100- 100

STTL-116768 Signature set using show VT299-1017 - Set height :500- 500
    [Documentation]
    [Tags]    Android
    readResult    set using show VT299-1017 - Set height :500- 500

STTL-116769 Signature set using show VT299-1018 - Set height :150- 150
    [Documentation]
    [Tags]    Android
    readResult    set using show VT299-1018 - Set height :150- 150

STTL-116770 Signature set using show VT299-1020 - Set left :90- 90
    [Documentation]
    [Tags]    Android
    readResult    set using show VT299-1020 - Set left :90- 90

STTL-116771 Signature set using show VT299-1021 - Set left :550- 550
    [Documentation]
    [Tags]    Android
    readResult    set using show VT299-1021 - Set left :550- 550

STTL-116772 Signature set using show VT299-1022 - Set left :15- 15
    [Documentation]
    [Tags]    Android
    readResult    set using show VT299-1022 - Set left :15- 15

STTL-116773 Signature set using show VT299-1022 - Set left :0- 0
    [Documentation]
    [Tags]    Android
    readResult    set using show VT299-1022 - Set left :0- 0

STTL-116774 Signature set using show VT299-1023 - Set top :50- 50
    [Documentation]
    [Tags]    Android
    readResult    set using show VT299-1023 - Set top :50- 50

STTL-116775 Signature set using show VT299-1024 - Set top :150- 150
    [Documentation]
    [Tags]    Android
    readResult    set using show VT299-1024 - Set top :150- 150

STTL-116776 Signature set using show VT299-1025 - Set top :60- 60
    [Documentation]
    [Tags]    Android
    readResult    set using show VT299-1025 - Set top :60- 60

STTL-116777 Signature set using show VT299-1026 - Set top :0- 0
    [Documentation]
    [Tags]    Android
    readResult    set using show VT299-1026 - Set top :0- 0

STTL-116778 Signature set using show VT299-1027 - Set width :140- 140
    [Documentation]
    [Tags]    Android
    readResult    set using show VT299-1027 - Set width :140- 140

STTL-116779 Signature set using show VT299-1028 - Set width :450- 450
    [Documentation]
    [Tags]    Android
    readResult    set using show VT299-1028 - Set width :450- 450

STTL-116780 Signature set using show VT299-1029 - Set width :200- 200
    [Documentation]
    [Tags]    Android
    readResult    set using show VT299-1029 - Set width :200- 200

STTL-116781 Signature set using show VT299-1031 - Set outputFormat :dataUri- dataUri
    [Documentation]
    [Tags]    Android
    readResult    set using show VT299-1031 - Set outputFormat :dataUri- dataUri

STTL-116782 Signature set using show VT299-1032 - Set outputFormat :image- image
    [Documentation]
    [Tags]    Android
    readResult    set using show VT299-1032 - Set outputFormat :image- image

STTL-116783 Signature set using show VT299-1033 - Set penColor :#FF000000- #FF000000
    [Documentation]
    [Tags]    Android
    readResult    set using show VT299-1033 - Set penColor :#FF000000- #FF000000

STTL-116784 Signature set using show VT299-1034 - Set penColor :#FF00FF- #FF00FF
    [Documentation]
    [Tags]    Android
    readResult    set using show VT299-1034 - Set penColor :#FF00FF- #FF00FF

STTL-116785 Signature set using show VT299-1035 - Set penColor :#000000- #000000
    [Documentation]
    [Tags]    Android
    readResult    set using show VT299-1035 - Set penColor :#000000- #000000

STTL-116786 Signature set using show VT299-1036 - Set penColor :#FFFFFFFF- #FFFFFFFF
    [Documentation]
    [Tags]    Android
    readResult    set using show VT299-1036 - Set penColor :#FFFFFFFF- #FFFFFFFF

STTL-116787 Signature set using show VT299-1037 - Set penWidth :1- 1
    [Documentation]
    [Tags]    Android
    readResult    set using show VT299-1037 - Set penWidth :1- 1

STTL-116788 Signature set using show VT299-1038 - Set penWidth :5- 5
    [Documentation]
    [Tags]    Android
    readResult    set using show VT299-1038 - Set penWidth :5- 5

STTL-116789 Signature set using show VT299-1040 - Set penWidth :10- 10
    [Documentation]
    [Tags]    Android
    readResult    set using show VT299-1040 - Set penWidth :10- 10

STTL-116790 Signature set using takeFullScreen VT299-1001 - Set bgColor :#FF0000- #FF0000
    [Documentation]
    [Tags]    Android
    readResult    set using takeFullScreen VT299-1001 - Set bgColor :#FF0000- #FF0000

STTL-116791 Signature set using takeFullScreen VT299-1002 - Set bgColor :#0000FFFF- #0000FFFF
    [Documentation]
    [Tags]    Android
    readResult    set using takeFullScreen VT299-1002 - Set bgColor :#0000FFFF- #0000FFFF

STTL-116792 Signature set using takeFullScreen VT299-1003 - Set bgColor :#00000000- #00000000
    [Documentation]
    [Tags]    Android
    readResult    set using takeFullScreen VT299-1003 - Set bgColor :#00000000- #00000000

STTL-116793 Signature set using takeFullScreen VT299-1004 - Set bgColor :#FFFFFF- #FFFFFF
    [Documentation]
    [Tags]    Android
    readResult    set using takeFullScreen VT299-1004 - Set bgColor :#FFFFFF- #FFFFFF

STTL-116794 Signature set using takeFullScreen VT299-1007 - Set compressionFormat :jpg- jpg
    [Documentation]
    [Tags]    Android
    readResult    set using takeFullScreen VT299-1007 - Set compressionFormat :jpg- jpg

STTL-116795 Signature set using takeFullScreen VT299-1008 - Set compressionFormat :png- png
    [Documentation]
    [Tags]    Android
    readResult    set using takeFullScreen VT299-1008 - Set compressionFormat :png- png

STTL-116796 Signature set using takeFullScreen VT299-1009 - Set compressionFormat :bmp- bmp
    [Documentation]
    [Tags]    Android
    readResult    set using takeFullScreen VT299-1009 - Set compressionFormat :bmp- bmp

STTL-116797 Signature set using takeFullScreen VT299-1010 - Set fileName :Test- Test
    [Documentation]
    [Tags]    Android
    readResult    set using takeFullScreen VT299-1010 - Set fileName :Test- Test

STTL-116798 Signature set using takeFullScreen VT299-1012 - Set fileName :Test123- Test123
    [Documentation]
    [Tags]    Android
    readResult    set using takeFullScreen VT299-1012 - Set fileName :Test123- Test123

STTL-116799 Signature set using takeFullScreen VT299-1013 - Set fileName :Test_123- Test_123
    [Documentation]
    [Tags]    Android
    readResult    set using takeFullScreen VT299-1013 - Set fileName :Test_123- Test_123

STTL-116800 Signature set using takeFullScreen VT299-1015 - Set fileName :signature- signature
    [Documentation]
    [Tags]    Android
    readResult    set using takeFullScreen VT299-1015 - Set fileName :signature- signature

STTL-116801 Signature set using takeFullScreen VT299-1031 - Set outputFormat :dataUri- dataUri
    [Documentation]
    [Tags]    Android
    readResult    set using takeFullScreen VT299-1031 - Set outputFormat :dataUri- dataUri

STTL-116802 Signature set using takeFullScreen VT299-1032 - Set outputFormat :image- image
    [Documentation]
    [Tags]    Android
    readResult    set using takeFullScreen VT299-1032 - Set outputFormat :image- image

STTL-116803 Signature set using takeFullScreen VT299-1033 - Set penColor :#FF000000- #FF000000
    [Documentation]
    [Tags]    Android
    readResult    set using takeFullScreen VT299-1033 - Set penColor :#FF000000- #FF000000

STTL-116804 Signature set using takeFullScreen VT299-1034 - Set penColor :#FF00FF- #FF00FF
    [Documentation]
    [Tags]    Android
    readResult    set using takeFullScreen VT299-1034 - Set penColor :#FF00FF- #FF00FF

STTL-116805 Signature set using takeFullScreen VT299-1035 - Set penColor :#000000- #000000
    [Documentation]
    [Tags]    Android
    readResult    set using takeFullScreen VT299-1035 - Set penColor :#000000- #000000

STTL-116806 Signature set using takeFullScreen VT299-1036 - Set penColor :#FFFFFFFF- #FFFFFFFF
    [Documentation]
    [Tags]    Android
    readResult    set using takeFullScreen VT299-1036 - Set penColor :#FFFFFFFF- #FFFFFFFF

STTL-116807 Signature set using takeFullScreen VT299-1037 - Set penWidth :1- 1
    [Documentation]
    [Tags]    Android
    readResult    set using takeFullScreen VT299-1037 - Set penWidth :1- 1

STTL-116808 Signature set using takeFullScreen VT299-1038 - Set penWidth :5- 5
    [Documentation]
    [Tags]    Android
    readResult    set using takeFullScreen VT299-1038 - Set penWidth :5- 5

STTL-116809 Signature set using takeFullScreen VT299-1040 - Set penWidth :10- 10
    [Documentation]
    [Tags]    Android
    readResult    set using takeFullScreen VT299-1040 - Set penWidth :10- 10

