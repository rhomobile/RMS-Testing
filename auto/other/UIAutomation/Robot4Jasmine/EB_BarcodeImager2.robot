*** Settings ***
Library    jasmineTests.py
Library    config.py
Suite Setup    precondition

*** keywords ***
precondition
    waitTimeCapture    300
    startPath    Configuration/Applications/Application/General,StartPage,<StartPage value="http://127.0.0.1:8082/app/Barcode/specRunner_imager2.html" name="Menu"/>

*** Test Cases ***
STTL-116701 Barcode Enable
    [Documentation]
    [Tags]    Android
    readResult    Enable

STTL-116702 Barcode VT282-3019 Set inverse1dMode:enabled enabled
    [Documentation]
    [Tags]    Android
    readResult    VT282-3019 Set inverse1dMode:enabled enabled

STTL-116703 Barcode VT282-3020 Set inverse1dMode:disabled disabled
    [Documentation]
    [Tags]    Android
    readResult    VT282-3020 Set inverse1dMode:disabled disabled

STTL-116704 Barcode VT282-3021 Set inverse1dMode:auto auto
    [Documentation]
    [Tags]    Android
    readResult    VT282-3021 Set inverse1dMode:auto auto

STTL-116705 Barcode VT282-3023 Set linearSecurityLevel:shortOrCodabar shortOrCodabar
    [Documentation]
    [Tags]    Android
    readResult    VT282-3023 Set linearSecurityLevel:shortOrCodabar shortOrCodabar

STTL-116706 Barcode VT282-3024 Set linearSecurityLevel:longAndShort longAndShort
    [Documentation]
    [Tags]    Android
    readResult    VT282-3024 Set linearSecurityLevel:longAndShort longAndShort

STTL-116707 Barcode VT282-3025 Set linearSecurityLevel:allTwice allTwice
    [Documentation]
    [Tags]    Android
    readResult    VT282-3025 Set linearSecurityLevel:allTwice allTwice

STTL-116708 Barcode VT282-3026 Set linearSecurityLevel:allThrice allThrice
    [Documentation]
    [Tags]    Android
    readResult    VT282-3026 Set linearSecurityLevel:allThrice allThrice

STTL-116709 Barcode VT282-3027 Set picklistMode:disabled disabled
    [Documentation]
    [Tags]    Android
    readResult    VT282-3027 Set picklistMode:disabled disabled

STTL-116710 Barcode VT282-3046 Set scanTimeout :10000 10000
    [Documentation]
    [Tags]    Android
    readResult    VT282-3046 Set scanTimeout :10000 10000

STTL-116711 Barcode VT282-3047 Set scanTimeout :3000 3000
    [Documentation]
    [Tags]    Android
    readResult    VT282-3047 Set scanTimeout :3000 3000

STTL-116712 Barcode VT282-3048 Set scanTimeout :0 0
    [Documentation]
    [Tags]    Android
    readResult    VT282-3048 Set scanTimeout :0 0

STTL-116713 Barcode VT282-3077 Set decodeDuration :1000 1000
    [Documentation]
    [Tags]    Android
    readResult    VT282-3077 Set decodeDuration :1000 1000

STTL-116714 Barcode VT282-3078 Set decodeDuration :5000 5000
    [Documentation]
    [Tags]    Android
    readResult    VT282-3078 Set decodeDuration :5000 5000

STTL-116715 Barcode VT282-3079 Set decodeFrequency :0 0
    [Documentation]
    [Tags]    Android
    readResult    VT282-3079 Set decodeFrequency :0 0

STTL-116716 Barcode VT282-3080 Set decodeFrequency :65535 65535
    [Documentation]
    [Tags]    Android
    readResult    VT282-3080 Set decodeFrequency :65535 65535

STTL-116717 Barcode VT282-3083 Set decodeSound :localpath application/alarm.wav
    [Documentation]
    [Tags]    Android
    readResult    VT282-3083 Set decodeSound :localpath application/alarm.wav

STTL-116718 Barcode VT282-3085 Set decodeVolume :5 5
    [Documentation]
    [Tags]    Android
    readResult    VT282-3085 Set decodeVolume :5 5

STTL-116719 Barcode VT282-3086 Set decodeVolume :1 1
    [Documentation]
    [Tags]    Android
    readResult    VT282-3086 Set decodeVolume :1 1

STTL-116720 Barcode VT282-3087 Set decodeVolume :0 0
    [Documentation]
    [Tags]    Android
    readResult    VT282-3087 Set decodeVolume :0 0

STTL-116721 Barcode VT282-3092 Set autoEnter :true true
    [Documentation]
    [Tags]    Android
    readResult    VT282-3092 Set autoEnter :true true

STTL-116722 Barcode VT282-3093 Set autoEnter :false false
    [Documentation]
    [Tags]    Android
    readResult    VT282-3093 Set autoEnter :false false

STTL-116723 Barcode VT282-3094 Set autoTab :true true
    [Documentation]
    [Tags]    Android
    readResult    VT282-3094 Set autoTab :true true

STTL-116724 Barcode VT282-3095 Set autoTab :false false
    [Documentation]
    [Tags]    Android
    readResult    VT282-3095 Set autoTab :false false

STTL-116725 Barcode VT282-3096 Set hapticFeedback :true true
    [Documentation]
    [Tags]    Android
    readResult    VT282-3096 Set hapticFeedback :true true

STTL-116726 Barcode VT282-3097 Set hapticFeedback :false false
    [Documentation]
    [Tags]    Android
    readResult    VT282-3097 Set hapticFeedback :false false

STTL-116727 Barcode VT282-4001 Set allDecoders:True true
    [Documentation]
    [Tags]    Android
    readResult    VT282-4001 Set allDecoders:True true

STTL-116728 Barcode VT282-4002 Set allDecoders:false false
    [Documentation]
    [Tags]    Android
    readResult    VT282-4002 Set allDecoders:false false

STTL-116729 Barcode VT282-4003 Set ausPostal:True true
    [Documentation]
    [Tags]    Android
    readResult    VT282-4003 Set ausPostal:True true

STTL-116730 Barcode VT282-4004 Set ausPostal:false false
    [Documentation]
    [Tags]    Android
    readResult    VT282-4004 Set ausPostal:false false

STTL-116731 Barcode VT282-4005 Set canPostal:True true
    [Documentation]
    [Tags]    Android
    readResult    VT282-4005 Set canPostal:True true

STTL-116732 Barcode VT282-4006 Set canPostal:false false
    [Documentation]
    [Tags]    Android
    readResult    VT282-4006 Set canPostal:false false

STTL-116733 Barcode VT282-4007 Set codabar:True true
    [Documentation]
    [Tags]    Android
    readResult    VT282-4007 Set codabar:True true

STTL-116734 Barcode VT282-4008 Set codabar:false false
    [Documentation]
    [Tags]    Android
    readResult    VT282-4008 Set codabar:false false

STTL-116735 Barcode VT282-4009 Set codabarClsiEditing:True true
    [Documentation]
    [Tags]    Android
    readResult    VT282-4009 Set codabarClsiEditing:True true

STTL-116736 Barcode VT282-4010 Set codabarClsiEditing:false false
    [Documentation]
    [Tags]    Android
    readResult    VT282-4010 Set codabarClsiEditing:false false

STTL-116737 Barcode VT282-4011 Set codabarMaxLength:0 0
    [Documentation]
    [Tags]    Android
    readResult    VT282-4011 Set codabarMaxLength:0 0

STTL-116738 Barcode VT282-4012 Set codabarMaxLength:10 10
    [Documentation]
    [Tags]    Android
    readResult    VT282-4012 Set codabarMaxLength:10 10

STTL-116739 Barcode VT282-4013 Set codabarMaxLength:55 55
    [Documentation]
    [Tags]    Android
    readResult    VT282-4013 Set codabarMaxLength:55 55

STTL-116740 Barcode VT282-4014 Set codabarMinLength:0 0
    [Documentation]
    [Tags]    Android
    readResult    VT282-4014 Set codabarMinLength:0 0

STTL-116741 Barcode VT282-4015 Set codabarMinLength:20 20
    [Documentation]
    [Tags]    Android
    readResult    VT282-4015 Set codabarMinLength:20 20

STTL-116742 Barcode VT282-4016 Set codabarMinLength:55 55
    [Documentation]
    [Tags]    Android
    readResult    VT282-4016 Set codabarMinLength:55 55

STTL-116743 Barcode VT282-4017 Set codabarNotisEditing:True true
    [Documentation]
    [Tags]    Android
    readResult    VT282-4017 Set codabarNotisEditing:True true

STTL-116744 Barcode VT282-4018 Set codabarNotisEditing:false false
    [Documentation]
    [Tags]    Android
    readResult    VT282-4018 Set codabarNotisEditing:false false

STTL-116745 Barcode VT282-4019 Set codabarRedundancy:True true
    [Documentation]
    [Tags]    Android
    readResult    VT282-4019 Set codabarRedundancy:True true

STTL-116746 Barcode VT282-4020 Set codabarRedundancy:false false
    [Documentation]
    [Tags]    Android
    readResult    VT282-4020 Set codabarRedundancy:false false

STTL-116747 Barcode VT282-4021 Set code11 :True true
    [Documentation]
    [Tags]    Android
    readResult    VT282-4021 Set code11 :True true

STTL-116748 Barcode VT282-4022 Set code11 :false false
    [Documentation]
    [Tags]    Android
    readResult    VT282-4022 Set code11 :false false

STTL-116749 Barcode VT282-4023 Set code11checkDigitCount:none none
    [Documentation]
    [Tags]    Android
    readResult    VT282-4023 Set code11checkDigitCount:none none

STTL-116750 Barcode VT282-4024 Set code11checkDigitCount:one one
    [Documentation]
    [Tags]    Android
    readResult    VT282-4024 Set code11checkDigitCount:one one

STTL-116751 Barcode VT282-4025 Set code11checkDigitCount:two two
    [Documentation]
    [Tags]    Android
    readResult    VT282-4025 Set code11checkDigitCount:two two

STTL-116752 Barcode VT282-4026 Set code11maxLength:0 0
    [Documentation]
    [Tags]    Android
    readResult    VT282-4026 Set code11maxLength:0 0

STTL-116753 Barcode VT282-4027 Set code11maxLength:30 30
    [Documentation]
    [Tags]    Android
    readResult    VT282-4027 Set code11maxLength:30 30

STTL-116754 Barcode VT282-4028 Set code11maxLength:55 55
    [Documentation]
    [Tags]    Android
    readResult    VT282-4028 Set code11maxLength:55 55

STTL-116755 Barcode VT282-4029 Set code11minLength:0 0
    [Documentation]
    [Tags]    Android
    readResult    VT282-4029 Set code11minLength:0 0

STTL-116756 Barcode VT282-4030 Set code11minLength:40 40
    [Documentation]
    [Tags]    Android
    readResult    VT282-4030 Set code11minLength:40 40

STTL-116757 Barcode VT282-4031 Set code11minLength:55 55
    [Documentation]
    [Tags]    Android
    readResult    VT282-4031 Set code11minLength:55 55

STTL-116758 Barcode VT282-4032 Set code11redundancy:True true
    [Documentation]
    [Tags]    Android
    readResult    VT282-4032 Set code11redundancy:True true

STTL-116759 Barcode VT282-4033 Set code11redundancy:false false
    [Documentation]
    [Tags]    Android
    readResult    VT282-4033 Set code11redundancy:false false

STTL-116760 Barcode VT282-4034 Set code11reportCheckDigit:True true
    [Documentation]
    [Tags]    Android
    readResult    VT282-4034 Set code11reportCheckDigit:True true

STTL-116761 Barcode VT282-4035 Set code11reportCheckDigit:false false
    [Documentation]
    [Tags]    Android
    readResult    VT282-4035 Set code11reportCheckDigit:false false

STTL-116762 Barcode VT282-4036 Set code128 :True true
    [Documentation]
    [Tags]    Android
    readResult    VT282-4036 Set code128 :True true

STTL-116763 Barcode VT282-4037 Set code128 :false false
    [Documentation]
    [Tags]    Android
    readResult    VT282-4037 Set code128 :false false

STTL-116764 Barcode VT282-4038 Set code128checkIsBtTable:True true
    [Documentation]
    [Tags]    Android
    readResult    VT282-4038 Set code128checkIsBtTable:True true

STTL-116765 Barcode VT282-4039 Set code128checkIsBtTable:false false
    [Documentation]
    [Tags]    Android
    readResult    VT282-4039 Set code128checkIsBtTable:false false

STTL-116766 Barcode VT282-4040 Set code128ean128:True true
    [Documentation]
    [Tags]    Android
    readResult    VT282-4040 Set code128ean128:True true

STTL-116767 Barcode VT282-4041 Set code128ean128:false false
    [Documentation]
    [Tags]    Android
    readResult    VT282-4041 Set code128ean128:false false

STTL-116768 Barcode VT282-4042 Set code128isbt128:True true
    [Documentation]
    [Tags]    Android
    readResult    VT282-4042 Set code128isbt128:True true

STTL-116769 Barcode VT282-4043 Set code128isbt128:false false
    [Documentation]
    [Tags]    Android
    readResult    VT282-4043 Set code128isbt128:false false

STTL-116770 Barcode VT282-4044 Set code128isbt128ConcatMode:never never
    [Documentation]
    [Tags]    Android
    readResult    VT282-4044 Set code128isbt128ConcatMode:never never

STTL-116771 Barcode VT282-4045 Set code128isbt128ConcatMode:always always
    [Documentation]
    [Tags]    Android
    readResult    VT282-4045 Set code128isbt128ConcatMode:always always

STTL-116772 Barcode VT282-4046 Set code128isbt128ConcatMode:auto auto
    [Documentation]
    [Tags]    Android
    readResult    VT282-4046 Set code128isbt128ConcatMode:auto auto

STTL-116773 Barcode VT282-4047 Set code128maxLength:0 0
    [Documentation]
    [Tags]    Android
    readResult    VT282-4047 Set code128maxLength:0 0

STTL-116774 Barcode VT282-4048 Set code128maxLength:15 15
    [Documentation]
    [Tags]    Android
    readResult    VT282-4048 Set code128maxLength:15 15

STTL-116775 Barcode VT282-4049 Set code128maxLength:55 55
    [Documentation]
    [Tags]    Android
    readResult    VT282-4049 Set code128maxLength:55 55

STTL-116776 Barcode VT282-4050 Set code128minLength:0 0
    [Documentation]
    [Tags]    Android
    readResult    VT282-4050 Set code128minLength:0 0

STTL-116777 Barcode VT282-4051 Set code128minLength:25 25
    [Documentation]
    [Tags]    Android
    readResult    VT282-4051 Set code128minLength:25 25

STTL-116778 Barcode VT282-4052 Set code128minLength:55 55
    [Documentation]
    [Tags]    Android
    readResult    VT282-4052 Set code128minLength:55 55

STTL-116779 Barcode VT282-4053 Set code128other128:True true
    [Documentation]
    [Tags]    Android
    readResult    VT282-4053 Set code128other128:True true

STTL-116780 Barcode VT282-4054 Set code128other128:false false
    [Documentation]
    [Tags]    Android
    readResult    VT282-4054 Set code128other128:false false

STTL-116781 Barcode VT282-4055 Set code128redundancy:True true
    [Documentation]
    [Tags]    Android
    readResult    VT282-4055 Set code128redundancy:True true

STTL-116782 Barcode VT282-4056 Set code128redundancy:false false
    [Documentation]
    [Tags]    Android
    readResult    VT282-4056 Set code128redundancy:false false

STTL-116783 Barcode VT282-4057 Set code128securityLevel:0 0
    [Documentation]
    [Tags]    Android
    readResult    VT282-4057 Set code128securityLevel:0 0

STTL-116784 Barcode VT282-4058 Set code128securityLevel:1 1
    [Documentation]
    [Tags]    Android
    readResult    VT282-4058 Set code128securityLevel:1 1

STTL-116785 Barcode VT282-4059 Set code128securityLevel:2 2
    [Documentation]
    [Tags]    Android
    readResult    VT282-4059 Set code128securityLevel:2 2

STTL-116786 Barcode VT282-4060 Set code128securityLevel:3 3
    [Documentation]
    [Tags]    Android
    readResult    VT282-4060 Set code128securityLevel:3 3

STTL-116787 Barcode VT282-4061 Set code39 :True true
    [Documentation]
    [Tags]    Android
    readResult    VT282-4061 Set code39 :True true

STTL-116788 Barcode VT282-4062 Set code39 :false false
    [Documentation]
    [Tags]    Android
    readResult    VT282-4062 Set code39 :false false

STTL-116789 Barcode VT282-4063 Set code39code32Prefix :True true
    [Documentation]
    [Tags]    Android
    readResult    VT282-4063 Set code39code32Prefix :True true

STTL-116790 Barcode VT282-4064 Set code39code32Prefix :false false
    [Documentation]
    [Tags]    Android
    readResult    VT282-4064 Set code39code32Prefix :false false

STTL-116791 Barcode VT282-4065 Set code39convertToCode32 :True true
    [Documentation]
    [Tags]    Android
    readResult    VT282-4065 Set code39convertToCode32 :True true

STTL-116792 Barcode VT282-4066 Set code39convertToCode32 :false false
    [Documentation]
    [Tags]    Android
    readResult    VT282-4066 Set code39convertToCode32 :false false

STTL-116793 Barcode VT282-4067 Set code39fullAscii :True true
    [Documentation]
    [Tags]    Android
    readResult    VT282-4067 Set code39fullAscii :True true

STTL-116794 Barcode VT282-4068 Set code39fullAscii :false false
    [Documentation]
    [Tags]    Android
    readResult    VT282-4068 Set code39fullAscii :false false

STTL-116795 Barcode VT282-4069 Set code39maxLength:0 0
    [Documentation]
    [Tags]    Android
    readResult    VT282-4069 Set code39maxLength:0 0

STTL-116796 Barcode VT282-4070 Set code39maxLength:35 35
    [Documentation]
    [Tags]    Android
    readResult    VT282-4070 Set code39maxLength:35 35

STTL-116797 Barcode VT282-4071 Set code39maxLength:55 55
    [Documentation]
    [Tags]    Android
    readResult    VT282-4071 Set code39maxLength:55 55

STTL-116798 Barcode VT282-4072 Set code39minLength:0 0
    [Documentation]
    [Tags]    Android
    readResult    VT282-4072 Set code39minLength:0 0

STTL-116799 Barcode VT282-4073 Set code39minLength:45 45
    [Documentation]
    [Tags]    Android
    readResult    VT282-4073 Set code39minLength:45 45

STTL-116800 Barcode VT282-4074 Set code39minLength:55 55
    [Documentation]
    [Tags]    Android
    readResult    VT282-4074 Set code39minLength:55 55

STTL-116801 Barcode VT282-4075 Set code39redundancy :True true
    [Documentation]
    [Tags]    Android
    readResult    VT282-4075 Set code39redundancy :True true

STTL-116802 Barcode VT282-4076 Set code39redundancy :false false
    [Documentation]
    [Tags]    Android
    readResult    VT282-4076 Set code39redundancy :false false

STTL-116803 Barcode VT282-4076 Set code39reportCheckDigit :True true
    [Documentation]
    [Tags]    Android
    readResult    VT282-4076 Set code39reportCheckDigit :True true

STTL-116804 Barcode VT282-4077 Set code39reportCheckDigit :false false
    [Documentation]
    [Tags]    Android
    readResult    VT282-4077 Set code39reportCheckDigit :false false

STTL-116805 Barcode VT282-4078 Set code39securityLevel:0 0
    [Documentation]
    [Tags]    Android
    readResult    VT282-4078 Set code39securityLevel:0 0

STTL-116806 Barcode VT282-4079 Set code39securityLevel:1 1
    [Documentation]
    [Tags]    Android
    readResult    VT282-4079 Set code39securityLevel:1 1

STTL-116807 Barcode VT282-4080 Set code39securityLevel:2 2
    [Documentation]
    [Tags]    Android
    readResult    VT282-4080 Set code39securityLevel:2 2

STTL-116808 Barcode VT282-4081 Set code39securityLevel:3 3
    [Documentation]
    [Tags]    Android
    readResult    VT282-4081 Set code39securityLevel:3 3

STTL-116809 Barcode VT282-4082 Set code39verifyCheckDigit :True true
    [Documentation]
    [Tags]    Android
    readResult    VT282-4082 Set code39verifyCheckDigit :True true

STTL-116810 Barcode VT282-4083 Set code39verifyCheckDigit :false false
    [Documentation]
    [Tags]    Android
    readResult    VT282-4083 Set code39verifyCheckDigit :false false

STTL-116811 Barcode VT282-4084 Set code93 :True true
    [Documentation]
    [Tags]    Android
    readResult    VT282-4084 Set code93 :True true

STTL-116812 Barcode VT282-4085 Set code93 :false false
    [Documentation]
    [Tags]    Android
    readResult    VT282-4085 Set code93 :false false

STTL-116813 Barcode VT282-4086 Set code93maxLength:0 0
    [Documentation]
    [Tags]    Android
    readResult    VT282-4086 Set code93maxLength:0 0

STTL-116814 Barcode VT282-4087 Set code93maxLength:11 11
    [Documentation]
    [Tags]    Android
    readResult    VT282-4087 Set code93maxLength:11 11

STTL-116815 Barcode VT282-4088 Set code93maxLength:55 55
    [Documentation]
    [Tags]    Android
    readResult    VT282-4088 Set code93maxLength:55 55

STTL-116816 Barcode VT282-4089 Set code93minLength:0 0
    [Documentation]
    [Tags]    Android
    readResult    VT282-4089 Set code93minLength:0 0

STTL-116817 Barcode VT282-4090 Set code93minLength:12 12
    [Documentation]
    [Tags]    Android
    readResult    VT282-4090 Set code93minLength:12 12

STTL-116818 Barcode VT282-4091 Set code93minLength:55 55
    [Documentation]
    [Tags]    Android
    readResult    VT282-4091 Set code93minLength:55 55

STTL-116819 Barcode VT282-4092 Set code93redundancy :True true
    [Documentation]
    [Tags]    Android
    readResult    VT282-4092 Set code93redundancy :True true

STTL-116820 Barcode VT282-4093 Set code93redundancy :false false
    [Documentation]
    [Tags]    Android
    readResult    VT282-4093 Set code93redundancy :false false

STTL-116821 Barcode VT282-4094 Set compositeAb :True true
    [Documentation]
    [Tags]    Android
    readResult    VT282-4094 Set compositeAb :True true

STTL-116822 Barcode VT282-4095 Set compositeAb :false false
    [Documentation]
    [Tags]    Android
    readResult    VT282-4095 Set compositeAb :false false

STTL-116823 Barcode VT282-4096 Set compositeAbUccLinkMode:never never
    [Documentation]
    [Tags]    Android
    readResult    VT282-4096 Set compositeAbUccLinkMode:never never

STTL-116824 Barcode VT282-4097 Set compositeAbUccLinkMode:always always
    [Documentation]
    [Tags]    Android
    readResult    VT282-4097 Set compositeAbUccLinkMode:always always

STTL-116825 Barcode VT282-4098 Set compositeAbUccLinkMode:auto auto
    [Documentation]
    [Tags]    Android
    readResult    VT282-4098 Set compositeAbUccLinkMode:auto auto

STTL-116826 Barcode VT282-4101 Set compositeC :True true
    [Documentation]
    [Tags]    Android
    readResult    VT282-4101 Set compositeC :True true

STTL-116827 Barcode VT282-4102 Set compositeC :false false
    [Documentation]
    [Tags]    Android
    readResult    VT282-4102 Set compositeC :false false

STTL-116828 Barcode VT282-4103 Set d2of5 :True true
    [Documentation]
    [Tags]    Android
    readResult    VT282-4103 Set d2of5 :True true

STTL-116829 Barcode VT282-4104 Set d2of5 :false false
    [Documentation]
    [Tags]    Android
    readResult    VT282-4104 Set d2of5 :false false

STTL-116830 Barcode VT282-4105 Set d2of5maxLength:0 0
    [Documentation]
    [Tags]    Android
    readResult    VT282-4105 Set d2of5maxLength:0 0

STTL-116831 Barcode VT282-4106 Set d2of5maxLength:13 13
    [Documentation]
    [Tags]    Android
    readResult    VT282-4106 Set d2of5maxLength:13 13

STTL-116832 Barcode VT282-4107 Set d2of5maxLength:55 55
    [Documentation]
    [Tags]    Android
    readResult    VT282-4107 Set d2of5maxLength:55 55

STTL-116833 Barcode VT282-4108 Set d2of5minLength:0 0
    [Documentation]
    [Tags]    Android
    readResult    VT282-4108 Set d2of5minLength:0 0

STTL-116834 Barcode VT282-4109 Set d2of5minLength:14 14
    [Documentation]
    [Tags]    Android
    readResult    VT282-4109 Set d2of5minLength:14 14

STTL-116835 Barcode VT282-4110 Set d2of5minLength:55 55
    [Documentation]
    [Tags]    Android
    readResult    VT282-4110 Set d2of5minLength:55 55

STTL-116836 Barcode VT282-4111 Set d2of5redundancy :True true
    [Documentation]
    [Tags]    Android
    readResult    VT282-4111 Set d2of5redundancy :True true

STTL-116837 Barcode VT282-4112 Set d2of5redundancy :false false
    [Documentation]
    [Tags]    Android
    readResult    VT282-4112 Set d2of5redundancy :false false

STTL-116838 Barcode VT282-4113 Set datamatrix :True true
    [Documentation]
    [Tags]    Android
    readResult    VT282-4113 Set datamatrix :True true

STTL-116839 Barcode VT282-4114 Set datamatrix :false false
    [Documentation]
    [Tags]    Android
    readResult    VT282-4114 Set datamatrix :false false

STTL-116840 Barcode VT282-4115 Set dutchPostal :True true
    [Documentation]
    [Tags]    Android
    readResult    VT282-4115 Set dutchPostal :True true

STTL-116841 Barcode VT282-4116 Set dutchPostal :false false
    [Documentation]
    [Tags]    Android
    readResult    VT282-4116 Set dutchPostal :false false

STTL-116842 Barcode VT282-4117 Set ean13 :True true
    [Documentation]
    [Tags]    Android
    readResult    VT282-4117 Set ean13 :True true

STTL-116843 Barcode VT282-4118 Set ean13 :false false
    [Documentation]
    [Tags]    Android
    readResult    VT282-4118 Set ean13 :false false

STTL-116844 Barcode VT282-4119 Set ean8 :True true
    [Documentation]
    [Tags]    Android
    readResult    VT282-4119 Set ean8 :True true

STTL-116845 Barcode VT282-4120 Set ean8 :false false
    [Documentation]
    [Tags]    Android
    readResult    VT282-4120 Set ean8 :false false

STTL-116846 Barcode VT282-4123 Set gs1dataBar :True true
    [Documentation]
    [Tags]    Android
    readResult    VT282-4123 Set gs1dataBar :True true

STTL-116847 Barcode VT282-4124 Set gs1dataBar :false false
    [Documentation]
    [Tags]    Android
    readResult    VT282-4124 Set gs1dataBar :false false

STTL-116848 Barcode VT282-4125 Set gs1dataBarExpanded :True true
    [Documentation]
    [Tags]    Android
    readResult    VT282-4125 Set gs1dataBarExpanded :True true

STTL-116849 Barcode VT282-4126 Set gs1dataBarExpanded :false false
    [Documentation]
    [Tags]    Android
    readResult    VT282-4126 Set gs1dataBarExpanded :false false

STTL-116850 Barcode VT282-4127 Set gs1dataBarLimited :True true
    [Documentation]
    [Tags]    Android
    readResult    VT282-4127 Set gs1dataBarLimited :True true

STTL-116851 Barcode VT282-4128 Set gs1dataBarLimited :false false
    [Documentation]
    [Tags]    Android
    readResult    VT282-4128 Set gs1dataBarLimited :false false

STTL-116852 Barcode VT282-4129 Set i2of5 :True true
    [Documentation]
    [Tags]    Android
    readResult    VT282-4129 Set i2of5 :True true

STTL-116853 Barcode VT282-4130 Set i2of5 :false false
    [Documentation]
    [Tags]    Android
    readResult    VT282-4130 Set i2of5 :false false

STTL-116854 Barcode VT282-4131 Set i2of5convertToEan13 :True true
    [Documentation]
    [Tags]    Android
    readResult    VT282-4131 Set i2of5convertToEan13 :True true

STTL-116855 Barcode VT282-4132 Set i2of5convertToEan13 :false false
    [Documentation]
    [Tags]    Android
    readResult    VT282-4132 Set i2of5convertToEan13 :false false

STTL-116856 Barcode VT282-4133 Set i2of5maxLength:0 0
    [Documentation]
    [Tags]    Android
    readResult    VT282-4133 Set i2of5maxLength:0 0

STTL-116857 Barcode VT282-4134 Set i2of5maxLength:22 22
    [Documentation]
    [Tags]    Android
    readResult    VT282-4134 Set i2of5maxLength:22 22

STTL-116858 Barcode VT282-4135 Set i2of5maxLength:55 55
    [Documentation]
    [Tags]    Android
    readResult    VT282-4135 Set i2of5maxLength:55 55

STTL-116859 Barcode VT282-4136 Set i2of5minLength:0 0
    [Documentation]
    [Tags]    Android
    readResult    VT282-4136 Set i2of5minLength:0 0

STTL-116860 Barcode VT282-4137 Set i2of5minLength:33 33
    [Documentation]
    [Tags]    Android
    readResult    VT282-4137 Set i2of5minLength:33 33

STTL-116861 Barcode VT282-4138 Set i2of5minLength:55 55
    [Documentation]
    [Tags]    Android
    readResult    VT282-4138 Set i2of5minLength:55 55

STTL-116862 Barcode VT282-4139 Set i2of5redundancy :True true
    [Documentation]
    [Tags]    Android
    readResult    VT282-4139 Set i2of5redundancy :True true

STTL-116863 Barcode VT282-4140 Set i2of5redundancy :false false
    [Documentation]
    [Tags]    Android
    readResult    VT282-4140 Set i2of5redundancy :false false

STTL-116864 Barcode VT282-4141 Set i2of5reportCheckDigit :True true
    [Documentation]
    [Tags]    Android
    readResult    VT282-4141 Set i2of5reportCheckDigit :True true

STTL-116865 Barcode VT282-4142 Set i2of5reportCheckDigit :false false
    [Documentation]
    [Tags]    Android
    readResult    VT282-4142 Set i2of5reportCheckDigit :false false

STTL-116866 Barcode VT282-4143 Set i2of5verifyCheckDigit:none none
    [Documentation]
    [Tags]    Android
    readResult    VT282-4143 Set i2of5verifyCheckDigit:none none

STTL-116867 Barcode VT282-4144 Set i2of5verifyCheckDigit:uss uss
    [Documentation]
    [Tags]    Android
    readResult    VT282-4144 Set i2of5verifyCheckDigit:uss uss

STTL-116868 Barcode VT282-4145 Set i2of5verifyCheckDigit:opcc opcc
    [Documentation]
    [Tags]    Android
    readResult    VT282-4145 Set i2of5verifyCheckDigit:opcc opcc

STTL-116869 Barcode VT282-4146 Set japPostal :True true
    [Documentation]
    [Tags]    Android
    readResult    VT282-4146 Set japPostal :True true

STTL-116870 Barcode VT282-4147 Set japPostal :false false
    [Documentation]
    [Tags]    Android
    readResult    VT282-4147 Set japPostal :false false

STTL-116871 Barcode VT282-4148 Set korean3of5 :True true
    [Documentation]
    [Tags]    Android
    readResult    VT282-4148 Set korean3of5 :True true

STTL-116872 Barcode VT282-4149 Set korean3of5 :false false
    [Documentation]
    [Tags]    Android
    readResult    VT282-4149 Set korean3of5 :false false

STTL-116873 Barcode VT282-4178 Set matrix2of5 :True true
    [Documentation]
    [Tags]    Android
    readResult    VT282-4178 Set matrix2of5 :True true

STTL-116874 Barcode VT282-4179 Set matrix2of5 :false false
    [Documentation]
    [Tags]    Android
    readResult    VT282-4179 Set matrix2of5 :false false

STTL-116875 Barcode VT282-4180 Set matrix2of5maxLength:0 0
    [Documentation]
    [Tags]    Android
    readResult    VT282-4180 Set matrix2of5maxLength:0 0

STTL-116876 Barcode VT282-4181 Set matrix2of5maxLength:01 01
    [Documentation]
    [Tags]    Android
    readResult    VT282-4181 Set matrix2of5maxLength:01 01

STTL-116877 Barcode VT282-4182 Set matrix2of5maxLength:55 55
    [Documentation]
    [Tags]    Android
    readResult    VT282-4182 Set matrix2of5maxLength:55 55

STTL-116878 Barcode VT282-4183 Set matrix2of5minLength:0 0
    [Documentation]
    [Tags]    Android
    readResult    VT282-4183 Set matrix2of5minLength:0 0

STTL-116879 Barcode VT282-4184 Set matrix2of5minLength:09 09
    [Documentation]
    [Tags]    Android
    readResult    VT282-4184 Set matrix2of5minLength:09 09

STTL-116880 Barcode VT282-4185 Set matrix2of5minLength:55 55
    [Documentation]
    [Tags]    Android
    readResult    VT282-4185 Set matrix2of5minLength:55 55

STTL-116881 Barcode VT282-4186 Set matrix2of5reportCheckDigit :True true
    [Documentation]
    [Tags]    Android
    readResult    VT282-4186 Set matrix2of5reportCheckDigit :True true

STTL-116882 Barcode VT282-4187 Set matrix2of5reportCheckDigit :false false
    [Documentation]
    [Tags]    Android
    readResult    VT282-4187 Set matrix2of5reportCheckDigit :false false

STTL-116883 Barcode VT282-4188 Set matrix2of5verifyCheckDigit :True true
    [Documentation]
    [Tags]    Android
    readResult    VT282-4188 Set matrix2of5verifyCheckDigit :True true

STTL-116884 Barcode VT282-4189 Set matrix2of5verifyCheckDigit :false false
    [Documentation]
    [Tags]    Android
    readResult    VT282-4189 Set matrix2of5verifyCheckDigit :false false

STTL-116885 Barcode VT282-4190 Set maxiCode :True true
    [Documentation]
    [Tags]    Android
    readResult    VT282-4190 Set maxiCode :True true

STTL-116886 Barcode VT282-4191 Set maxiCode :false false
    [Documentation]
    [Tags]    Android
    readResult    VT282-4191 Set maxiCode :false false

STTL-116887 Barcode VT282-4192 Set microPdf :True true
    [Documentation]
    [Tags]    Android
    readResult    VT282-4192 Set microPdf :True true

STTL-116888 Barcode VT282-4193 Set microPdf :false false
    [Documentation]
    [Tags]    Android
    readResult    VT282-4193 Set microPdf :false false

STTL-116889 Barcode VT282-4194 Set microQr :True true
    [Documentation]
    [Tags]    Android
    readResult    VT282-4194 Set microQr :True true

STTL-116890 Barcode VT282-4195 Set microQr :false false
    [Documentation]
    [Tags]    Android
    readResult    VT282-4195 Set microQr :false false

STTL-116891 Barcode VT282-4196 Set msi :True true
    [Documentation]
    [Tags]    Android
    readResult    VT282-4196 Set msi :True true

STTL-116892 Barcode VT282-4197 Set msi :false false
    [Documentation]
    [Tags]    Android
    readResult    VT282-4197 Set msi :false false

STTL-116893 Barcode VT282-4198 Set msiCheckDigitScheme :mod11 mod11
    [Documentation]
    [Tags]    Android
    readResult    VT282-4198 Set msiCheckDigitScheme :mod11 mod11

STTL-116894 Barcode VT282-4199 Set msiCheckDigitScheme :mod10 mod10
    [Documentation]
    [Tags]    Android
    readResult    VT282-4199 Set msiCheckDigitScheme :mod10 mod10

STTL-116895 Barcode VT282-4200 Set msiCheckDigits :one one
    [Documentation]
    [Tags]    Android
    readResult    VT282-4200 Set msiCheckDigits :one one

STTL-116896 Barcode VT282-4201 Set msiCheckDigits :two two
    [Documentation]
    [Tags]    Android
    readResult    VT282-4201 Set msiCheckDigits :two two

STTL-116897 Barcode VT282-4202 Set msiMaxLength:0 0
    [Documentation]
    [Tags]    Android
    readResult    VT282-4202 Set msiMaxLength:0 0

STTL-116898 Barcode VT282-4203 Set msiMaxLength:7 7
    [Documentation]
    [Tags]    Android
    readResult    VT282-4203 Set msiMaxLength:7 7

STTL-116899 Barcode VT282-4204 Set msiMaxLength:55 55
    [Documentation]
    [Tags]    Android
    readResult    VT282-4204 Set msiMaxLength:55 55

STTL-116900 Barcode VT282-4205 Set msiMinLength:0 0
    [Documentation]
    [Tags]    Android
    readResult    VT282-4205 Set msiMinLength:0 0

STTL-116901 Barcode VT282-4206 Set msiMinLength:8 8
    [Documentation]
    [Tags]    Android
    readResult    VT282-4206 Set msiMinLength:8 8

STTL-116902 Barcode VT282-4207 Set msiMinLength:55 55
    [Documentation]
    [Tags]    Android
    readResult    VT282-4207 Set msiMinLength:55 55

STTL-116903 Barcode VT282-4208 Set msiRedundancy :True true
    [Documentation]
    [Tags]    Android
    readResult    VT282-4208 Set msiRedundancy :True true

STTL-116904 Barcode VT282-4209 Set msiRedundancy :false false
    [Documentation]
    [Tags]    Android
    readResult    VT282-4209 Set msiRedundancy :false false

STTL-116905 Barcode VT282-4210 Set msiReportCheckDigit :True true
    [Documentation]
    [Tags]    Android
    readResult    VT282-4210 Set msiReportCheckDigit :True true

STTL-116906 Barcode VT282-4211 Set msiReportCheckDigit :false false
    [Documentation]
    [Tags]    Android
    readResult    VT282-4211 Set msiReportCheckDigit :false false

STTL-116907 Barcode VT282-4212 Set pdf417 :True true
    [Documentation]
    [Tags]    Android
    readResult    VT282-4212 Set pdf417 :True true

STTL-116908 Barcode VT282-4213 Set pdf417 :false false
    [Documentation]
    [Tags]    Android
    readResult    VT282-4213 Set pdf417 :false false

STTL-116909 Barcode VT282-4214 Set qrCode :True true
    [Documentation]
    [Tags]    Android
    readResult    VT282-4214 Set qrCode :True true

STTL-116910 Barcode VT282-4215 Set qrCode :false false
    [Documentation]
    [Tags]    Android
    readResult    VT282-4215 Set qrCode :false false

STTL-116911 Barcode VT282-4227 Set tlc39 :True true
    [Documentation]
    [Tags]    Android
    readResult    VT282-4227 Set tlc39 :True true

STTL-116912 Barcode VT282-4228 Set tlc39 :false false
    [Documentation]
    [Tags]    Android
    readResult    VT282-4228 Set tlc39 :false false

STTL-116913 Barcode VT282-4229 Set trioptic39 :True true
    [Documentation]
    [Tags]    Android
    readResult    VT282-4229 Set trioptic39 :True true

STTL-116914 Barcode VT282-4230 Set trioptic39 :false false
    [Documentation]
    [Tags]    Android
    readResult    VT282-4230 Set trioptic39 :false false

STTL-116915 Barcode VT282-4233 Set ukPostal :True true
    [Documentation]
    [Tags]    Android
    readResult    VT282-4233 Set ukPostal :True true

STTL-116916 Barcode VT282-4234 Set ukPostal :false false
    [Documentation]
    [Tags]    Android
    readResult    VT282-4234 Set ukPostal :false false

STTL-116917 Barcode VT282-4235 Set ukPostalReportCheckDigit :True true
    [Documentation]
    [Tags]    Android
    readResult    VT282-4235 Set ukPostalReportCheckDigit :True true

STTL-116918 Barcode VT282-4236 Set ukPostalReportCheckDigit :false false
    [Documentation]
    [Tags]    Android
    readResult    VT282-4236 Set ukPostalReportCheckDigit :false false

STTL-116919 Barcode VT282-4237 Set upcEanBookland :True true
    [Documentation]
    [Tags]    Android
    readResult    VT282-4237 Set upcEanBookland :True true

STTL-116920 Barcode VT282-4238 Set upcEanBookland :false false
    [Documentation]
    [Tags]    Android
    readResult    VT282-4238 Set upcEanBookland :false false

STTL-116921 Barcode VT282-4241 Set upcEanConvertGs1dataBarToUpcEan :true true
    [Documentation]
    [Tags]    Android
    readResult    VT282-4241 Set upcEanConvertGs1dataBarToUpcEan :true true

STTL-116922 Barcode VT282-4242 Set upcEanConvertGs1dataBarToUpcEan :false false
    [Documentation]
    [Tags]    Android
    readResult    VT282-4242 Set upcEanConvertGs1dataBarToUpcEan :false false

STTL-116923 Barcode VT282-4243 Set upcEanCoupon :true true
    [Documentation]
    [Tags]    Android
    readResult    VT282-4243 Set upcEanCoupon :true true

STTL-116924 Barcode VT282-4244 Set upcEanCoupon :false false
    [Documentation]
    [Tags]    Android
    readResult    VT282-4244 Set upcEanCoupon :false false

STTL-116925 Barcode VT282-4249 Set upcEanRetryCount :2 2
    [Documentation]
    [Tags]    Android
    readResult    VT282-4249 Set upcEanRetryCount :2 2

STTL-116926 Barcode VT282-4250 Set upcEanRetryCount :20 20
    [Documentation]
    [Tags]    Android
    readResult    VT282-4250 Set upcEanRetryCount :20 20

STTL-116927 Barcode VT282-4251 Set upcEanSecurityLevel:0 0
    [Documentation]
    [Tags]    Android
    readResult    VT282-4251 Set upcEanSecurityLevel:0 0

STTL-116928 Barcode VT282-4252 Set upcEanSecurityLevel:1 1
    [Documentation]
    [Tags]    Android
    readResult    VT282-4252 Set upcEanSecurityLevel:1 1

STTL-116929 Barcode VT282-4253 Set upcEanSecurityLevel:2 2
    [Documentation]
    [Tags]    Android
    readResult    VT282-4253 Set upcEanSecurityLevel:2 2

STTL-116930 Barcode VT282-4254 Set upcEanSecurityLevel:3 3
    [Documentation]
    [Tags]    Android
    readResult    VT282-4254 Set upcEanSecurityLevel:3 3

STTL-116931 Barcode VT282-4255 Set upcEanSupplemental2 :true true
    [Documentation]
    [Tags]    Android
    readResult    VT282-4255 Set upcEanSupplemental2 :true true

STTL-116932 Barcode VT282-4256 Set upcEanSupplemental2 :false false
    [Documentation]
    [Tags]    Android
    readResult    VT282-4256 Set upcEanSupplemental2 :false false

STTL-116933 Barcode VT282-4257 Set upcEanSupplemental5 :true true
    [Documentation]
    [Tags]    Android
    readResult    VT282-4257 Set upcEanSupplemental5 :true true

STTL-116934 Barcode VT282-4258 Set upcEanSupplemental5 :false false
    [Documentation]
    [Tags]    Android
    readResult    VT282-4258 Set upcEanSupplemental5 :false false

STTL-116935 Barcode VT282-4259 Set upcEanSupplementalMode:none none
    [Documentation]
    [Tags]    Android
    readResult    VT282-4259 Set upcEanSupplementalMode:none none

STTL-116936 Barcode VT282-4260 Set upcEanSupplementalMode:auto auto
    [Documentation]
    [Tags]    Android
    readResult    VT282-4260 Set upcEanSupplementalMode:auto auto

STTL-116937 Barcode VT282-4261 Set upcEanSupplementalMode:always always
    [Documentation]
    [Tags]    Android
    readResult    VT282-4261 Set upcEanSupplementalMode:always always

STTL-116938 Barcode VT282-4262 Set upcEanSupplementalMode:smart smart
    [Documentation]
    [Tags]    Android
    readResult    VT282-4262 Set upcEanSupplementalMode:smart smart

STTL-116939 Barcode VT282-4263 Set upcEanSupplementalMode:378or379 378or379
    [Documentation]
    [Tags]    Android
    readResult    VT282-4263 Set upcEanSupplementalMode:378or379 378or379

STTL-116940 Barcode VT282-4264 Set upcEanSupplementalMode:978or979 978or979
    [Documentation]
    [Tags]    Android
    readResult    VT282-4264 Set upcEanSupplementalMode:978or979 978or979

STTL-116941 Barcode VT282-4265 Set upcEanSupplementalMode:414or419or434or439 414or419or434or439
    [Documentation]
    [Tags]    Android
    readResult    VT282-4265 Set upcEanSupplementalMode:414or419or434or439 414or419or434or439

STTL-116942 Barcode VT282-4266 Set upca :true true
    [Documentation]
    [Tags]    Android
    readResult    VT282-4266 Set upca :true true

STTL-116943 Barcode VT282-4267 Set upca :false false
    [Documentation]
    [Tags]    Android
    readResult    VT282-4267 Set upca :false false

STTL-116944 Barcode VT282-4268 Set upcaPreamble :none none
    [Documentation]
    [Tags]    Android
    readResult    VT282-4268 Set upcaPreamble :none none

STTL-116945 Barcode VT282-4269 Set upcaPreamble :systemChar systemChar
    [Documentation]
    [Tags]    Android
    readResult    VT282-4269 Set upcaPreamble :systemChar systemChar

STTL-116946 Barcode VT282-4270 Set upcaPreamble :countryAndSystemChars countryAndSystemChars
    [Documentation]
    [Tags]    Android
    readResult    VT282-4270 Set upcaPreamble :countryAndSystemChars countryAndSystemChars

STTL-116947 Barcode VT282-4271 Set upcaReportCheckDigit :true true
    [Documentation]
    [Tags]    Android
    readResult    VT282-4271 Set upcaReportCheckDigit :true true

STTL-116948 Barcode VT282-4272 Set upcaReportCheckDigit :false false
    [Documentation]
    [Tags]    Android
    readResult    VT282-4272 Set upcaReportCheckDigit :false false

STTL-116949 Barcode VT282-4273 Set upce0 :true true
    [Documentation]
    [Tags]    Android
    readResult    VT282-4273 Set upce0 :true true

STTL-116950 Barcode VT282-4274 Set upce0 :false false
    [Documentation]
    [Tags]    Android
    readResult    VT282-4274 Set upce0 :false false

STTL-116951 Barcode VT282-4275 Set upce0convertToUpca :true true
    [Documentation]
    [Tags]    Android
    readResult    VT282-4275 Set upce0convertToUpca :true true

STTL-116952 Barcode VT282-4276 Set upce0convertToUpca :false false
    [Documentation]
    [Tags]    Android
    readResult    VT282-4276 Set upce0convertToUpca :false false

STTL-116953 Barcode VT282-4277 Set upce0preamble :none none
    [Documentation]
    [Tags]    Android
    readResult    VT282-4277 Set upce0preamble :none none

STTL-116954 Barcode VT282-4278 Set upce0preamble :systemChar systemChar
    [Documentation]
    [Tags]    Android
    readResult    VT282-4278 Set upce0preamble :systemChar systemChar

STTL-116955 Barcode VT282-4279 Set upce0preamble :countryAndSystemChars countryAndSystemChars
    [Documentation]
    [Tags]    Android
    readResult    VT282-4279 Set upce0preamble :countryAndSystemChars countryAndSystemChars

STTL-116956 Barcode VT282-4280 Set upce0reportCheckDigit :true true
    [Documentation]
    [Tags]    Android
    readResult    VT282-4280 Set upce0reportCheckDigit :true true

STTL-116957 Barcode VT282-4281 Set upce0reportCheckDigit :false false
    [Documentation]
    [Tags]    Android
    readResult    VT282-4281 Set upce0reportCheckDigit :false false

STTL-116958 Barcode VT282-4282 Set upce1 :true true
    [Documentation]
    [Tags]    Android
    readResult    VT282-4282 Set upce1 :true true

STTL-116959 Barcode VT282-4283 Set upce1 :false false
    [Documentation]
    [Tags]    Android
    readResult    VT282-4283 Set upce1 :false false

STTL-116960 Barcode VT282-4284 Set upce1convertToUpca :true true
    [Documentation]
    [Tags]    Android
    readResult    VT282-4284 Set upce1convertToUpca :true true

STTL-116961 Barcode VT282-4285 Set upce1convertToUpca :false false
    [Documentation]
    [Tags]    Android
    readResult    VT282-4285 Set upce1convertToUpca :false false

STTL-116962 Barcode VT282-4286 Set upce1preamble:none none
    [Documentation]
    [Tags]    Android
    readResult    VT282-4286 Set upce1preamble:none none

STTL-116963 Barcode VT282-4287 Set upce1preamble:systemChar systemChar
    [Documentation]
    [Tags]    Android
    readResult    VT282-4287 Set upce1preamble:systemChar systemChar

STTL-116964 Barcode VT282-4288 Set upce1preamble :countryAndSystemChars countryAndSystemChars
    [Documentation]
    [Tags]    Android
    readResult    VT282-4288 Set upce1preamble :countryAndSystemChars countryAndSystemChars

STTL-116965 Barcode VT282-4290 Set upce1reportCheckDigit:true true
    [Documentation]
    [Tags]    Android
    readResult    VT282-4290 Set upce1reportCheckDigit:true true

STTL-116966 Barcode VT282-4291 Set upce1reportCheckDigit :false false
    [Documentation]
    [Tags]    Android
    readResult    VT282-4291 Set upce1reportCheckDigit :false false

STTL-116967 Barcode VT282-4292 Set us4state :true true
    [Documentation]
    [Tags]    Android
    readResult    VT282-4292 Set us4state :true true

STTL-116968 Barcode VT282-4293 Set us4state :false false
    [Documentation]
    [Tags]    Android
    readResult    VT282-4293 Set us4state :false false

STTL-116969 Barcode VT282-4294 Set us4stateFics :true true
    [Documentation]
    [Tags]    Android
    readResult    VT282-4294 Set us4stateFics :true true

STTL-116970 Barcode VT282-4295 Set us4stateFics :false false
    [Documentation]
    [Tags]    Android
    readResult    VT282-4295 Set us4stateFics :false false

STTL-116971 Barcode VT282-4296 Set usPlanet :true true
    [Documentation]
    [Tags]    Android
    readResult    VT282-4296 Set usPlanet :true true

STTL-116972 Barcode VT282-4297 Set usPlanet :false false
    [Documentation]
    [Tags]    Android
    readResult    VT282-4297 Set usPlanet :false false

STTL-116973 Barcode VT282-4300 Set usPostNet :true true
    [Documentation]
    [Tags]    Android
    readResult    VT282-4300 Set usPostNet :true true

STTL-116974 Barcode VT282-4301 Set usPostNet :false false
    [Documentation]
    [Tags]    Android
    readResult    VT282-4301 Set usPostNet :false false

STTL-116975 Barcode VT282-4304 Set webcode :true true
    [Documentation]
    [Tags]    Android
    readResult    VT282-4304 Set webcode :true true

STTL-116976 Barcode VT282-4305 Set webcode :false false
    [Documentation]
    [Tags]    Android
    readResult    VT282-4305 Set webcode :false false

STTL-116977 Barcode VT282-4306 Set webcodeDecodeGtSubtype :true true
    [Documentation]
    [Tags]    Android
    readResult    VT282-4306 Set webcodeDecodeGtSubtype :true true

STTL-116978 Barcode VT282-4307 Set webcodeDecodeGtSubtype :false false
    [Documentation]
    [Tags]    Android
    readResult    VT282-4307 Set webcodeDecodeGtSubtype :false false

STTL-116979 Barcode VT282-4308 Set upcEanRetryCount :10 10
    [Documentation]
    [Tags]    Android
    readResult    VT282-4308 Set upcEanRetryCount :10 10

STTL-116980 Barcode Disable
    [Documentation]
    [Tags]    Android
    readResult    Disable

