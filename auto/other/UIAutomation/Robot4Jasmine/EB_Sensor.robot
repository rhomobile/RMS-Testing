*** Settings ***
Library    jasmineTests.py
Library    config.py
Suite Setup    precondition

*** keywords ***
precondition
    waitTimeCapture    240
    startPath    Configuration/Applications/Application/General,StartPage,<StartPage value="http://127.0.0.1:8082/app/SensorTest/specRunner.html" name="Menu"/>

*** Test Cases ***
STTL-116701 Sensor VT297-0001 - minimumGap getproperty before setting any value with synch for accelerometer -
    
    [Tags]    Android
    readResult    VT297-0001 - minimumGap getproperty before setting any value with synch for accelerometer -

STTL-116702 Sensor VT297-0002 - minimumGap getproperty before setting any value with synch for deviceOrientation -
    
    [Tags]    Android
    readResult    VT297-0002 - minimumGap getproperty before setting any value with synch for deviceOrientation -

STTL-116703 Sensor VT297-0003 - minimumGap getproperty before setting any value with synch for tiltangle -
    
    [Tags]    Android
    readResult    VT297-0003 - minimumGap getproperty before setting any value with synch for tiltangle -

STTL-116704 Sensor VT297-0004 - minimumGap getproperty before setting any value with synch for motion -
    
    [Tags]    Android
    readResult    VT297-0004 - minimumGap getproperty before setting any value with synch for motion -

STTL-116705 Sensor VT297-0005 - minimumGap getproperty before setting any value with synch for ecompass -
    
    [Tags]    Android
    readResult    VT297-0005 - minimumGap getproperty before setting any value with synch for ecompass -

STTL-116706 Sensor VT297-0006 - minimumGap getproperty before setting any value with synch for magnetometer -
    
    [Tags]    Android
    readResult    VT297-0006 - minimumGap getproperty before setting any value with synch for magnetometer -

STTL-116707 Sensor VT297-0007 - minimumGap getproperty before setting any value with synch for gyroscope -
    
    [Tags]    Android
    readResult    VT297-0007 - minimumGap getproperty before setting any value with synch for gyroscope -

STTL-116708 Sensor VT297-0008 - minimumGap getproperty before setting any value with synch for ambientlight -
    
    [Tags]    Android
    readResult    VT297-0008 - minimumGap getproperty before setting any value with synch for ambientlight -

STTL-116709 Sensor VT297-0009 - minimumGap getproperty before setting any value with synch for proximity -
    
    [Tags]    Android
    readResult    VT297-0009 - minimumGap getproperty before setting any value with synch for proximity -

STTL-116710 Sensor VT297-0010 - minimumGap getproperty before setting any value with synch for proximitylongrange -
    
    [Tags]    Android
    readResult    VT297-0010 - minimumGap getproperty before setting any value with synch for proximitylongrange -

STTL-116711 Sensor VT297-0011 - minimumGap getproperty before setting any value with synch for pressure -
    
    [Tags]    Android
    readResult    VT297-0011 - minimumGap getproperty before setting any value with synch for pressure -

STTL-116712 Sensor VT297-0012 - minimumGap getproperty before setting any value with synch for temperature -
    
    [Tags]    Android
    readResult    VT297-0012 - minimumGap getproperty before setting any value with synch for temperature -

STTL-116713 Sensor VT297-0013 - minimumGap getproperty before setting any value with synch for humidity -
    
    [Tags]    Android
    readResult    VT297-0013 - minimumGap getproperty before setting any value with synch for humidity -

STTL-116714 Sensor VT297-0014 - minimumGap getproperty before setting any value with synch for gravity -
    
    [Tags]    Android
    readResult    VT297-0014 - minimumGap getproperty before setting any value with synch for gravity -

STTL-116715 Sensor VT297-0015 - minimumGap getproperty before setting any value with synch for linearAcceleration -
    
    [Tags]    Android
    readResult    VT297-0015 - minimumGap getproperty before setting any value with synch for linearAcceleration -

STTL-116716 Sensor VT297-0016 - minimumGap getproperty before setting any value with synch for rotation -
    
    [Tags]    Android
    readResult    VT297-0016 - minimumGap getproperty before setting any value with synch for rotation -

STTL-116717 Sensor VT297-0017 - minimumGap getproperty before setting any value with synch for orientation -
    
    [Tags]    Android
    readResult    VT297-0017 - minimumGap getproperty before setting any value with synch for orientation -

STTL-116718 Sensor VT297-0018 - type getproperty before setting any value with synch for accelerometer -
    
    [Tags]    Android
    readResult    VT297-0018 - type getproperty before setting any value with synch for accelerometer -

STTL-116719 Sensor VT297-0019 - type getproperty before setting any value with synch for deviceOrientation -
    
    [Tags]    Android
    readResult    VT297-0019 - type getproperty before setting any value with synch for deviceOrientation -

STTL-116720 Sensor VT297-0020 - type getproperty before setting any value with synch for tiltangle -
    
    [Tags]    Android
    readResult    VT297-0020 - type getproperty before setting any value with synch for tiltangle -

STTL-116721 Sensor VT297-0021 - type getproperty before setting any value with synch for motion -
    
    [Tags]    Android
    readResult    VT297-0021 - type getproperty before setting any value with synch for motion -

STTL-116722 Sensor VT297-0022 - type getproperty before setting any value with synch for ecompass -
    
    [Tags]    Android
    readResult    VT297-0022 - type getproperty before setting any value with synch for ecompass -

STTL-116723 Sensor VT297-0023 - type getproperty before setting any value with synch for magnetometer -
    
    [Tags]    Android
    readResult    VT297-0023 - type getproperty before setting any value with synch for magnetometer -

STTL-116724 Sensor VT297-0024 - type getproperty before setting any value with synch for gyroscope -
    
    [Tags]    Android
    readResult    VT297-0024 - type getproperty before setting any value with synch for gyroscope -

STTL-116725 Sensor VT297-0025 - type getproperty before setting any value with synch for ambientlight -
    
    [Tags]    Android
    readResult    VT297-0025 - type getproperty before setting any value with synch for ambientlight -

STTL-116726 Sensor VT297-0026 - type getproperty before setting any value with synch for proximity -
    
    [Tags]    Android
    readResult    VT297-0026 - type getproperty before setting any value with synch for proximity -

STTL-116727 Sensor VT297-0027 - type getproperty before setting any value with synch for proximitylongrange -
    
    [Tags]    Android
    readResult    VT297-0027 - type getproperty before setting any value with synch for proximitylongrange -

STTL-116728 Sensor VT297-0028 - type getproperty before setting any value with synch for pressure -
    
    [Tags]    Android
    readResult    VT297-0028 - type getproperty before setting any value with synch for pressure -

STTL-116729 Sensor VT297-0029 - type getproperty before setting any value with synch for temperature -
    
    [Tags]    Android
    readResult    VT297-0029 - type getproperty before setting any value with synch for temperature -

STTL-116730 Sensor VT297-0030 - type getproperty before setting any value with synch for humidity -
    
    [Tags]    Android
    readResult    VT297-0030 - type getproperty before setting any value with synch for humidity -

STTL-116731 Sensor VT297-0031 - type getproperty before setting any value with synch for gravity -
    
    [Tags]    Android
    readResult    VT297-0031 - type getproperty before setting any value with synch for gravity -

STTL-116732 Sensor VT297-0032 - type getproperty before setting any value with synch for linearAcceleration -
    
    [Tags]    Android
    readResult    VT297-0032 - type getproperty before setting any value with synch for linearAcceleration -

STTL-116733 Sensor VT297-0033 - type getproperty before setting any value with synch for rotation -
    
    [Tags]    Android
    readResult    VT297-0033 - type getproperty before setting any value with synch for rotation -

STTL-116734 Sensor VT297-0034 - type getproperty before setting any value with synch for orientation -
    
    [Tags]    Android
    readResult    VT297-0034 - type getproperty before setting any value with synch for orientation -

STTL-116735 Sensor VT297-0035 - status getproperty synch for accelerometer before start sensor -
    
    [Tags]    Android
    readResult    VT297-0035 - status getproperty synch for accelerometer before start sensor -

STTL-116736 Sensor VT297-0036 - status getproperty synch for deviceOrientation before start sensor -
    
    [Tags]    Android
    readResult    VT297-0036 - status getproperty synch for deviceOrientation before start sensor -

STTL-116737 Sensor VT297-0037 - status getproperty synch for tiltangle before start sensor -
    
    [Tags]    Android
    readResult    VT297-0037 - status getproperty synch for tiltangle before start sensor -

STTL-116738 Sensor VT297-0038 - status getproperty synch for motion before start sensor -
    
    [Tags]    Android
    readResult    VT297-0038 - status getproperty synch for motion before start sensor -

STTL-116739 Sensor VT297-0039 - status getproperty synch for ecompass before start sensor -
    
    [Tags]    Android
    readResult    VT297-0039 - status getproperty synch for ecompass before start sensor -

STTL-116740 Sensor VT297-0040 - status getproperty synch for magnetometer before start sensor -
    
    [Tags]    Android
    readResult    VT297-0040 - status getproperty synch for magnetometer before start sensor -

STTL-116741 Sensor VT297-0041 - status getproperty synch for gyroscope before start sensor -
    
    [Tags]    Android
    readResult    VT297-0041 - status getproperty synch for gyroscope before start sensor -

STTL-116742 Sensor VT297-0042 - status getproperty synch for ambientlight before start sensor -
    
    [Tags]    Android
    readResult    VT297-0042 - status getproperty synch for ambientlight before start sensor -

STTL-116743 Sensor VT297-0043 - status getproperty synch for proximity before start sensor -
    
    [Tags]    Android
    readResult    VT297-0043 - status getproperty synch for proximity before start sensor -

STTL-116744 Sensor VT297-0044 - status getproperty synch for proximitylongrange before start sensor -
    
    [Tags]    Android
    readResult    VT297-0044 - status getproperty synch for proximitylongrange before start sensor -

STTL-116745 Sensor VT297-0045 - status getproperty synch for pressure before start sensor -
    
    [Tags]    Android
    readResult    VT297-0045 - status getproperty synch for pressure before start sensor -

STTL-116746 Sensor VT297-0046 - status getproperty synch for temperature before start sensor -
    
    [Tags]    Android
    readResult    VT297-0046 - status getproperty synch for temperature before start sensor -

STTL-116747 Sensor VT297-0047 - status getproperty synch for humidity before start sensor -
    
    [Tags]    Android
    readResult    VT297-0047 - status getproperty synch for humidity before start sensor -

STTL-116748 Sensor VT297-0048 - status getproperty synch for gravity before start sensor -
    
    [Tags]    Android
    readResult    VT297-0048 - status getproperty synch for gravity before start sensor -

STTL-116749 Sensor VT297-0049 - status getproperty synch for linearAcceleration before start sensor -
    
    [Tags]    Android
    readResult    VT297-0049 - status getproperty synch for linearAcceleration before start sensor -

STTL-116750 Sensor VT297-0050 - status getproperty synch for rotation before start sensor -
    
    [Tags]    Android
    readResult    VT297-0050 - status getproperty synch for rotation before start sensor -

STTL-116751 Sensor VT297-0051 - status getproperty synch for orientation before start sensor -
    
    [Tags]    Android
    readResult    VT297-0051 - status getproperty synch for orientation before start sensor -

STTL-116752 Sensor VT297-0052 - status getproperty synch for accelerometer after start sensor -
    
    [Tags]    Android
    readResult    VT297-0052 - status getproperty synch for accelerometer after start sensor -

STTL-116753 Sensor VT297-0053 - status getproperty synch for deviceOrientation after start sensor -
    
    [Tags]    Android
    readResult    VT297-0053 - status getproperty synch for deviceOrientation after start sensor -

STTL-116754 Sensor VT297-0054 - status getproperty synch for tiltangle after start sensor -
    
    [Tags]    Android
    readResult    VT297-0054 - status getproperty synch for tiltangle after start sensor -

STTL-116755 Sensor VT297-0055 - status getproperty synch for motion after start sensor -
    
    [Tags]    Android
    readResult    VT297-0055 - status getproperty synch for motion after start sensor -

STTL-116756 Sensor VT297-0056 - status getproperty synch for ecompass after start sensor -
    
    [Tags]    Android
    readResult    VT297-0056 - status getproperty synch for ecompass after start sensor -

STTL-116757 Sensor VT297-0057 - status getproperty synch for magnetometer after start sensor -
    
    [Tags]    Android
    readResult    VT297-0057 - status getproperty synch for magnetometer after start sensor -

STTL-116758 Sensor VT297-0058 - status getproperty synch for gyroscope after start sensor -
    
    [Tags]    Android
    readResult    VT297-0058 - status getproperty synch for gyroscope after start sensor -

STTL-116759 Sensor VT297-0059 - status getproperty synch for ambientlight after start sensor -
    
    [Tags]    Android
    readResult    VT297-0059 - status getproperty synch for ambientlight after start sensor -

STTL-116760 Sensor VT297-0060 - status getproperty synch for proximity after start sensor -
    
    [Tags]    Android
    readResult    VT297-0060 - status getproperty synch for proximity after start sensor -

STTL-116761 Sensor VT297-0061 - status getproperty synch for proximitylongrange after start sensor -
    
    [Tags]    Android
    readResult    VT297-0061 - status getproperty synch for proximitylongrange after start sensor -

STTL-116762 Sensor VT297-0062 - status getproperty synch for pressure after start sensor -
    
    [Tags]    Android
    readResult    VT297-0062 - status getproperty synch for pressure after start sensor -

STTL-116763 Sensor VT297-0063 - status getproperty synch for temperature after start sensor -
    
    [Tags]    Android
    readResult    VT297-0063 - status getproperty synch for temperature after start sensor -

STTL-116764 Sensor VT297-0064 - status getproperty synch for humidity after start sensor -
    
    [Tags]    Android
    readResult    VT297-0064 - status getproperty synch for humidity after start sensor -

STTL-116765 Sensor VT297-0065 - status getproperty synch for gravity after start sensor -
    
    [Tags]    Android
    readResult    VT297-0065 - status getproperty synch for gravity after start sensor -

STTL-116766 Sensor VT297-0066 - status getproperty synch for linearAcceleration after start sensor -
    
    [Tags]    Android
    readResult    VT297-0066 - status getproperty synch for linearAcceleration after start sensor -

STTL-116767 Sensor VT297-0067 - status getproperty synch for rotation after start sensor -
    
    [Tags]    Android
    readResult    VT297-0067 - status getproperty synch for rotation after start sensor -

STTL-116768 Sensor VT297-0068 - status getproperty synch for orientation after start sensor -
    
    [Tags]    Android
    readResult    VT297-0068 - status getproperty synch for orientation after start sensor -

STTL-116769 Sensor VT297-0069 - status getproperty synch for accelerometer after stop sensor -
    
    [Tags]    Android
    readResult    VT297-0069 - status getproperty synch for accelerometer after stop sensor -

STTL-116770 Sensor VT297-0070 - status getproperty synch for deviceOrientation after stop sensor -
    
    [Tags]    Android
    readResult    VT297-0070 - status getproperty synch for deviceOrientation after stop sensor -

STTL-116771 Sensor VT297-0071 - status getproperty synch for tiltangle after stop sensor -
    
    [Tags]    Android
    readResult    VT297-0071 - status getproperty synch for tiltangle after stop sensor -

STTL-116772 Sensor VT297-0072 - status getproperty synch for motion after stop sensor -
    
    [Tags]    Android
    readResult    VT297-0072 - status getproperty synch for motion after stop sensor -

STTL-116773 Sensor VT297-0073 - status getproperty synch for ecompass after stop sensor -
    
    [Tags]    Android
    readResult    VT297-0073 - status getproperty synch for ecompass after stop sensor -

STTL-116774 Sensor VT297-0074 - status getproperty synch for magnetometer after stop sensor -
    
    [Tags]    Android
    readResult    VT297-0074 - status getproperty synch for magnetometer after stop sensor -

STTL-116775 Sensor VT297-0075 - status getproperty synch for gyroscope after stop sensor -
    
    [Tags]    Android
    readResult    VT297-0075 - status getproperty synch for gyroscope after stop sensor -

STTL-116776 Sensor VT297-0076 - status getproperty synch for ambientlight after stop sensor -
    
    [Tags]    Android
    readResult    VT297-0076 - status getproperty synch for ambientlight after stop sensor -

STTL-116777 Sensor VT297-0077 - status getproperty synch for proximity after stop sensor -
    
    [Tags]    Android
    readResult    VT297-0077 - status getproperty synch for proximity after stop sensor -

STTL-116778 Sensor VT297-0078 - status getproperty synch for proximitylongrange after stop sensor -
    
    [Tags]    Android
    readResult    VT297-0078 - status getproperty synch for proximitylongrange after stop sensor -

STTL-116779 Sensor VT297-0079 - status getproperty synch for pressure after stop sensor -
    
    [Tags]    Android
    readResult    VT297-0079 - status getproperty synch for pressure after stop sensor -

STTL-116780 Sensor VT297-0080 - status getproperty synch for temperature after stop sensor -
    
    [Tags]    Android
    readResult    VT297-0080 - status getproperty synch for temperature after stop sensor -

STTL-116781 Sensor VT297-0081 - status getproperty synch for humidity after stop sensor -
    
    [Tags]    Android
    readResult    VT297-0081 - status getproperty synch for humidity after stop sensor -

STTL-116782 Sensor VT297-0082 - status getproperty synch for gravity after stop sensor -
    
    [Tags]    Android
    readResult    VT297-0082 - status getproperty synch for gravity after stop sensor -

STTL-116783 Sensor VT297-0083 - status getproperty synch for linearAcceleration after stop sensor -
    
    [Tags]    Android
    readResult    VT297-0083 - status getproperty synch for linearAcceleration after stop sensor -

STTL-116784 Sensor VT297-0084 - status getproperty synch for rotation after stop sensor -
    
    [Tags]    Android
    readResult    VT297-0084 - status getproperty synch for rotation after stop sensor -

STTL-116785 Sensor VT297-0085 - status getproperty synch for orientation after stop sensor -
    
    [Tags]    Android
    readResult    VT297-0085 - status getproperty synch for orientation after stop sensor -

STTL-116786 Sensor VT297-0086 - minimumGap getProperties before setting any value with synch for accelerometer -
    
    [Tags]    Android
    readResult    VT297-0086 - minimumGap getProperties before setting any value with synch for accelerometer -

STTL-116787 Sensor VT297-0087 - minimumGap getProperties before setting any value with synch for deviceOrientation -
    
    [Tags]    Android
    readResult    VT297-0087 - minimumGap getProperties before setting any value with synch for deviceOrientation -

STTL-116788 Sensor VT297-0088 - minimumGap getProperties before setting any value with synch for tiltangle -
    
    [Tags]    Android
    readResult    VT297-0088 - minimumGap getProperties before setting any value with synch for tiltangle -

STTL-116789 Sensor VT297-0089 - minimumGap getProperties before setting any value with synch for motion -
    
    [Tags]    Android
    readResult    VT297-0089 - minimumGap getProperties before setting any value with synch for motion -

STTL-116790 Sensor VT297-0090 - minimumGap getProperties before setting any value with synch for ecompass -
    
    [Tags]    Android
    readResult    VT297-0090 - minimumGap getProperties before setting any value with synch for ecompass -

STTL-116791 Sensor VT297-0091 - minimumGap getProperties before setting any value with synch for magnetometer -
    
    [Tags]    Android
    readResult    VT297-0091 - minimumGap getProperties before setting any value with synch for magnetometer -

STTL-116792 Sensor VT297-0092 - minimumGap getProperties before setting any value with synch for gyroscope -
    
    [Tags]    Android
    readResult    VT297-0092 - minimumGap getProperties before setting any value with synch for gyroscope -

STTL-116793 Sensor VT297-0093 - minimumGap getProperties before setting any value with synch for ambientlight -
    
    [Tags]    Android
    readResult    VT297-0093 - minimumGap getProperties before setting any value with synch for ambientlight -

STTL-116794 Sensor VT297-0094 - minimumGap getProperties before setting any value with synch for proximity -
    
    [Tags]    Android
    readResult    VT297-0094 - minimumGap getProperties before setting any value with synch for proximity -

STTL-116795 Sensor VT297-0095 - minimumGap getProperties before setting any value with synch for proximitylongrange -
    
    [Tags]    Android
    readResult    VT297-0095 - minimumGap getProperties before setting any value with synch for proximitylongrange -

STTL-116796 Sensor VT297-0096 - minimumGap getProperties before setting any value with synch for pressure -
    
    [Tags]    Android
    readResult    VT297-0096 - minimumGap getProperties before setting any value with synch for pressure -

STTL-116797 Sensor VT297-0097 - minimumGap getProperties before setting any value with synch for temperature -
    
    [Tags]    Android
    readResult    VT297-0097 - minimumGap getProperties before setting any value with synch for temperature -

STTL-116798 Sensor VT297-0098 - minimumGap getProperties before setting any value with synch for humidity -
    
    [Tags]    Android
    readResult    VT297-0098 - minimumGap getProperties before setting any value with synch for humidity -

STTL-116799 Sensor VT297-0099 - minimumGap getProperties before setting any value with synch for gravity -
    
    [Tags]    Android
    readResult    VT297-0099 - minimumGap getProperties before setting any value with synch for gravity -

STTL-116800 Sensor VT297-0100 - minimumGap getProperties before setting any value with synch for linearAcceleration -
    
    [Tags]    Android
    readResult    VT297-0100 - minimumGap getProperties before setting any value with synch for linearAcceleration -

STTL-116801 Sensor VT297-0101 - minimumGap getProperties before setting any value with synch for rotation -
    
    [Tags]    Android
    readResult    VT297-0101 - minimumGap getProperties before setting any value with synch for rotation -

STTL-116802 Sensor VT297-0102 - minimumGap getProperties before setting any value with synch for orientation -
    
    [Tags]    Android
    readResult    VT297-0102 - minimumGap getProperties before setting any value with synch for orientation -

STTL-116803 Sensor VT297-0103 - type getProperties before setting any value with synch for accelerometer -
    
    [Tags]    Android
    readResult    VT297-0103 - type getProperties before setting any value with synch for accelerometer -

STTL-116804 Sensor VT297-0104 - type getProperties before setting any value with synch for deviceOrientation -
    
    [Tags]    Android
    readResult    VT297-0104 - type getProperties before setting any value with synch for deviceOrientation -

STTL-116805 Sensor VT297-0105 - type getProperties before setting any value with synch for tiltangle -
    
    [Tags]    Android
    readResult    VT297-0105 - type getProperties before setting any value with synch for tiltangle -

STTL-116806 Sensor VT297-0106 - type getProperties before setting any value with synch for motion -
    
    [Tags]    Android
    readResult    VT297-0106 - type getProperties before setting any value with synch for motion -

STTL-116807 Sensor VT297-0107 - type getProperties before setting any value with synch for ecompass -
    
    [Tags]    Android
    readResult    VT297-0107 - type getProperties before setting any value with synch for ecompass -

STTL-116808 Sensor VT297-0108 - type getProperties before setting any value with synch for magnetometer -
    
    [Tags]    Android
    readResult    VT297-0108 - type getProperties before setting any value with synch for magnetometer -

STTL-116809 Sensor VT297-0109 - type getProperties before setting any value with synch for gyroscope -
    
    [Tags]    Android
    readResult    VT297-0109 - type getProperties before setting any value with synch for gyroscope -

STTL-116810 Sensor VT297-0110 - type getProperties before setting any value with synch for ambientlight -
    
    [Tags]    Android
    readResult    VT297-0110 - type getProperties before setting any value with synch for ambientlight -

STTL-116811 Sensor VT297-0111 - type getProperties before setting any value with synch for proximity -
    
    [Tags]    Android
    readResult    VT297-0111 - type getProperties before setting any value with synch for proximity -

STTL-116812 Sensor VT297-0112 - type getProperties before setting any value with synch for proximitylongrange -
    
    [Tags]    Android
    readResult    VT297-0112 - type getProperties before setting any value with synch for proximitylongrange -

STTL-116813 Sensor VT297-0113 - type getProperties before setting any value with synch for pressure -
    
    [Tags]    Android
    readResult    VT297-0113 - type getProperties before setting any value with synch for pressure -

STTL-116814 Sensor VT297-0114 - type getProperties before setting any value with synch for temperature -
    
    [Tags]    Android
    readResult    VT297-0114 - type getProperties before setting any value with synch for temperature -

STTL-116815 Sensor VT297-0115 - type getProperties before setting any value with synch for humidity -
    
    [Tags]    Android
    readResult    VT297-0115 - type getProperties before setting any value with synch for humidity -

STTL-116816 Sensor VT297-0116 - type getProperties before setting any value with synch for gravity -
    
    [Tags]    Android
    readResult    VT297-0116 - type getProperties before setting any value with synch for gravity -

STTL-116817 Sensor VT297-0117 - type getProperties before setting any value with synch for linearAcceleration -
    
    [Tags]    Android
    readResult    VT297-0117 - type getProperties before setting any value with synch for linearAcceleration -

STTL-116818 Sensor VT297-0118 - type getProperties before setting any value with synch for rotation -
    
    [Tags]    Android
    readResult    VT297-0118 - type getProperties before setting any value with synch for rotation -

STTL-116819 Sensor VT297-0119 - type getProperties before setting any value with synch for orientation -
    
    [Tags]    Android
    readResult    VT297-0119 - type getProperties before setting any value with synch for orientation -

STTL-116820 Sensor VT297-0120 - status getProperties synch for accelerometer before start sensor -
    
    [Tags]    Android
    readResult    VT297-0120 - status getProperties synch for accelerometer before start sensor -

STTL-116821 Sensor VT297-0121 - status getProperties synch for deviceOrientation before start sensor -
    
    [Tags]    Android
    readResult    VT297-0121 - status getProperties synch for deviceOrientation before start sensor -

STTL-116822 Sensor VT297-0122 - status getProperties synch for tiltangle before start sensor -
    
    [Tags]    Android
    readResult    VT297-0122 - status getProperties synch for tiltangle before start sensor -

STTL-116823 Sensor VT297-0123 - status getProperties synch for motion before start sensor -
    
    [Tags]    Android
    readResult    VT297-0123 - status getProperties synch for motion before start sensor -

STTL-116824 Sensor VT297-0124 - status getProperties synch for ecompass before start sensor -
    
    [Tags]    Android
    readResult    VT297-0124 - status getProperties synch for ecompass before start sensor -

STTL-116825 Sensor VT297-0125 - status getProperties synch for magnetometer before start sensor -
    
    [Tags]    Android
    readResult    VT297-0125 - status getProperties synch for magnetometer before start sensor -

STTL-116826 Sensor VT297-0126 - status getProperties synch for gyroscope before start sensor -
    
    [Tags]    Android
    readResult    VT297-0126 - status getProperties synch for gyroscope before start sensor -

STTL-116827 Sensor VT297-0127 - status getProperties synch for ambientlight before start sensor -
    
    [Tags]    Android
    readResult    VT297-0127 - status getProperties synch for ambientlight before start sensor -

STTL-116828 Sensor VT297-0128 - status getProperties synch for proximity before start sensor -
    
    [Tags]    Android
    readResult    VT297-0128 - status getProperties synch for proximity before start sensor -

STTL-116829 Sensor VT297-0129 - status getProperties synch for proximitylongrange before start sensor -
    
    [Tags]    Android
    readResult    VT297-0129 - status getProperties synch for proximitylongrange before start sensor -

STTL-116830 Sensor VT297-0130 - status getProperties synch for pressure before start sensor -
    
    [Tags]    Android
    readResult    VT297-0130 - status getProperties synch for pressure before start sensor -

STTL-116831 Sensor VT297-0131 - status getProperties synch for temperature before start sensor -
    
    [Tags]    Android
    readResult    VT297-0131 - status getProperties synch for temperature before start sensor -

STTL-116832 Sensor VT297-0132 - status getProperties synch for humidity before start sensor -
    
    [Tags]    Android
    readResult    VT297-0132 - status getProperties synch for humidity before start sensor -

STTL-116833 Sensor VT297-0133 - status getProperties synch for gravity before start sensor -
    
    [Tags]    Android
    readResult    VT297-0133 - status getProperties synch for gravity before start sensor -

STTL-116834 Sensor VT297-0134 - status getProperties synch for linearAcceleration before start sensor -
    
    [Tags]    Android
    readResult    VT297-0134 - status getProperties synch for linearAcceleration before start sensor -

STTL-116835 Sensor VT297-0135 - status getProperties synch for rotation before start sensor -
    
    [Tags]    Android
    readResult    VT297-0135 - status getProperties synch for rotation before start sensor -

STTL-116836 Sensor VT297-0136 - status getProperties synch for orientation before start sensor -
    
    [Tags]    Android
    readResult    VT297-0136 - status getProperties synch for orientation before start sensor -

STTL-116837 Sensor VT297-0137 - status getProperties synch for accelerometer after start sensor -
    
    [Tags]    Android
    readResult    VT297-0137 - status getProperties synch for accelerometer after start sensor -

STTL-116838 Sensor VT297-0138 - status getProperties synch for deviceOrientation after start sensor -
    
    [Tags]    Android
    readResult    VT297-0138 - status getProperties synch for deviceOrientation after start sensor -

STTL-116839 Sensor VT297-0139 - status getProperties synch for tiltangle after start sensor -
    
    [Tags]    Android
    readResult    VT297-0139 - status getProperties synch for tiltangle after start sensor -

STTL-116840 Sensor VT297-0140 - status getProperties synch for motion after start sensor -
    
    [Tags]    Android
    readResult    VT297-0140 - status getProperties synch for motion after start sensor -

STTL-116841 Sensor VT297-0141 - status getProperties synch for ecompass after start sensor -
    
    [Tags]    Android
    readResult    VT297-0141 - status getProperties synch for ecompass after start sensor -

STTL-116842 Sensor VT297-0142 - status getProperties synch for magnetometer after start sensor -
    
    [Tags]    Android
    readResult    VT297-0142 - status getProperties synch for magnetometer after start sensor -

STTL-116843 Sensor VT297-0143 - status getProperties synch for gyroscope after start sensor -
    
    [Tags]    Android
    readResult    VT297-0143 - status getProperties synch for gyroscope after start sensor -

STTL-116844 Sensor VT297-0144 - status getProperties synch for ambientlight after start sensor -
    
    [Tags]    Android
    readResult    VT297-0144 - status getProperties synch for ambientlight after start sensor -

STTL-116845 Sensor VT297-0145 - status getProperties synch for proximity after start sensor -
    
    [Tags]    Android
    readResult    VT297-0145 - status getProperties synch for proximity after start sensor -

STTL-116846 Sensor VT297-0146 - status getProperties synch for proximitylongrange after start sensor -
    
    [Tags]    Android
    readResult    VT297-0146 - status getProperties synch for proximitylongrange after start sensor -

STTL-116847 Sensor VT297-0147 - status getProperties synch for pressure after start sensor -
    
    [Tags]    Android
    readResult    VT297-0147 - status getProperties synch for pressure after start sensor -

STTL-116848 Sensor VT297-0148 - status getProperties synch for temperature after start sensor -
    
    [Tags]    Android
    readResult    VT297-0148 - status getProperties synch for temperature after start sensor -

STTL-116849 Sensor VT297-0149 - status getProperties synch for humidity after start sensor -
    
    [Tags]    Android
    readResult    VT297-0149 - status getProperties synch for humidity after start sensor -

STTL-116850 Sensor VT297-0150 - status getProperties synch for gravity after start sensor -
    
    [Tags]    Android
    readResult    VT297-0150 - status getProperties synch for gravity after start sensor -

STTL-116851 Sensor VT297-0151 - status getProperties synch for linearAcceleration after start sensor -
    
    [Tags]    Android
    readResult    VT297-0151 - status getProperties synch for linearAcceleration after start sensor -

STTL-116852 Sensor VT297-0152 - status getProperties synch for rotation after start sensor -
    
    [Tags]    Android
    readResult    VT297-0152 - status getProperties synch for rotation after start sensor -

STTL-116853 Sensor VT297-0153 - status getProperties synch for orientation after start sensor -
    
    [Tags]    Android
    readResult    VT297-0153 - status getProperties synch for orientation after start sensor -

STTL-116854 Sensor VT297-0154 - status getProperties synch for accelerometer after stop sensor -
    
    [Tags]    Android
    readResult    VT297-0154 - status getProperties synch for accelerometer after stop sensor -

STTL-116855 Sensor VT297-0155 - status getProperties synch for deviceOrientation after stop sensor -
    
    [Tags]    Android
    readResult    VT297-0155 - status getProperties synch for deviceOrientation after stop sensor -

STTL-116856 Sensor VT297-0156 - status getProperties synch for tiltangle after stop sensor -
    
    [Tags]    Android
    readResult    VT297-0156 - status getProperties synch for tiltangle after stop sensor -

STTL-116857 Sensor VT297-0157 - status getProperties synch for motion after stop sensor -
    
    [Tags]    Android
    readResult    VT297-0157 - status getProperties synch for motion after stop sensor -

STTL-116858 Sensor VT297-0158 - status getProperties synch for ecompass after stop sensor -
    
    [Tags]    Android
    readResult    VT297-0158 - status getProperties synch for ecompass after stop sensor -

STTL-116859 Sensor VT297-0159 - status getProperties synch for magnetometer after stop sensor -
    
    [Tags]    Android
    readResult    VT297-0159 - status getProperties synch for magnetometer after stop sensor -

STTL-116860 Sensor VT297-0160 - status getProperties synch for gyroscope after stop sensor -
    
    [Tags]    Android
    readResult    VT297-0160 - status getProperties synch for gyroscope after stop sensor -

STTL-116861 Sensor VT297-0161 - status getProperties synch for ambientlight after stop sensor -
    
    [Tags]    Android
    readResult    VT297-0161 - status getProperties synch for ambientlight after stop sensor -

STTL-116862 Sensor VT297-0162 - status getProperties synch for proximity after stop sensor -
    
    [Tags]    Android
    readResult    VT297-0162 - status getProperties synch for proximity after stop sensor -

STTL-116863 Sensor VT297-0163 - status getProperties synch for proximitylongrange after stop sensor -
    
    [Tags]    Android
    readResult    VT297-0163 - status getProperties synch for proximitylongrange after stop sensor -

STTL-116864 Sensor VT297-0164 - status getProperties synch for pressure after stop sensor -
    
    [Tags]    Android
    readResult    VT297-0164 - status getProperties synch for pressure after stop sensor -

STTL-116865 Sensor VT297-0165 - status getProperties synch for temperature after stop sensor -
    
    [Tags]    Android
    readResult    VT297-0165 - status getProperties synch for temperature after stop sensor -

STTL-116866 Sensor VT297-0166 - status getProperties synch for humidity after stop sensor -
    
    [Tags]    Android
    readResult    VT297-0166 - status getProperties synch for humidity after stop sensor -

STTL-116867 Sensor VT297-0167 - status getProperties synch for gravity after stop sensor -
    
    [Tags]    Android
    readResult    VT297-0167 - status getProperties synch for gravity after stop sensor -

STTL-116868 Sensor VT297-0168 - status getProperties synch for linearAcceleration after stop sensor -
    
    [Tags]    Android
    readResult    VT297-0168 - status getProperties synch for linearAcceleration after stop sensor -

STTL-116869 Sensor VT297-0169 - status getProperties synch for rotation after stop sensor -
    
    [Tags]    Android
    readResult    VT297-0169 - status getProperties synch for rotation after stop sensor -

STTL-116870 Sensor VT297-0170 - status getProperties synch for orientation after stop sensor -
    
    [Tags]    Android
    readResult    VT297-0170 - status getProperties synch for orientation after stop sensor -

STTL-116871 Sensor VT297-0171 - setproperty minimumGap to 300 and getProperty synch for accelerometer sensor -
    
    [Tags]    Android
    readResult    VT297-0171 - setproperty minimumGap to 300 and getProperty synch for accelerometer sensor -

STTL-116872 Sensor VT297-0172 - setproperty minimumGap to 100 and getProperty synch for accelerometer sensor -
    
    [Tags]    Android
    readResult    VT297-0172 - setproperty minimumGap to 100 and getProperty synch for accelerometer sensor -

STTL-116873 Sensor VT297-0173 - setproperty minimumGap to 300 and getProperty synch for deviceOrientation sensor -
    
    [Tags]    Android
    readResult    VT297-0173 - setproperty minimumGap to 300 and getProperty synch for deviceOrientation sensor -

STTL-116874 Sensor VT297-0174 - setproperty minimumGap to 100 and getProperty synch for deviceOrientation sensor -
    
    [Tags]    Android
    readResult    VT297-0174 - setproperty minimumGap to 100 and getProperty synch for deviceOrientation sensor -

STTL-116875 Sensor VT297-0175 - setproperty minimumGap to 300 and getProperty synch for tiltangle sensor -
    
    [Tags]    Android
    readResult    VT297-0175 - setproperty minimumGap to 300 and getProperty synch for tiltangle sensor -

STTL-116876 Sensor VT297-0176 - setproperty minimumGap to 100 and getProperty synch for tiltangle sensor -
    
    [Tags]    Android
    readResult    VT297-0176 - setproperty minimumGap to 100 and getProperty synch for tiltangle sensor -

STTL-116877 Sensor VT297-0177 - setproperty minimumGap to 300 and getProperty synch for motion sensor -
    
    [Tags]    Android
    readResult    VT297-0177 - setproperty minimumGap to 300 and getProperty synch for motion sensor -

STTL-116878 Sensor VT297-0178 - setproperty minimumGap to 100 and getProperty synch for motion sensor -
    
    [Tags]    Android
    readResult    VT297-0178 - setproperty minimumGap to 100 and getProperty synch for motion sensor -

STTL-116879 Sensor VT297-0179 - setproperty minimumGap to 300 and getProperty synch for ecompass sensor -
    
    [Tags]    Android
    readResult    VT297-0179 - setproperty minimumGap to 300 and getProperty synch for ecompass sensor -

STTL-116880 Sensor VT297-0180 - setproperty minimumGap to 100 and getProperty synch for ecompass sensor -
    
    [Tags]    Android
    readResult    VT297-0180 - setproperty minimumGap to 100 and getProperty synch for ecompass sensor -

STTL-116881 Sensor VT297-0181 - setproperty minimumGap to 300 and getProperty synch for magnetometer sensor -
    
    [Tags]    Android
    readResult    VT297-0181 - setproperty minimumGap to 300 and getProperty synch for magnetometer sensor -

STTL-116882 Sensor VT297-0182 - setproperty minimumGap to 100 and getProperty synch for magnetometer sensor -
    
    [Tags]    Android
    readResult    VT297-0182 - setproperty minimumGap to 100 and getProperty synch for magnetometer sensor -

STTL-116883 Sensor VT297-0183 - setproperty minimumGap to 300 and getProperty synch for gyroscope sensor -
    
    [Tags]    Android
    readResult    VT297-0183 - setproperty minimumGap to 300 and getProperty synch for gyroscope sensor -

STTL-116884 Sensor VT297-0184 - setproperty minimumGap to 100 and getProperty synch for gyroscope sensor -
    
    [Tags]    Android
    readResult    VT297-0184 - setproperty minimumGap to 100 and getProperty synch for gyroscope sensor -

STTL-116885 Sensor VT297-0185 - setproperty minimumGap to 300 and getProperty synch for ambientlight sensor -
    
    [Tags]    Android
    readResult    VT297-0185 - setproperty minimumGap to 300 and getProperty synch for ambientlight sensor -

STTL-116886 Sensor VT297-0186 - setproperty minimumGap to 100 and getProperty synch for ambientlight sensor -
    
    [Tags]    Android
    readResult    VT297-0186 - setproperty minimumGap to 100 and getProperty synch for ambientlight sensor -

STTL-116887 Sensor VT297-0187 - setproperty minimumGap to 300 and getProperty synch for proximity sensor -
    
    [Tags]    Android
    readResult    VT297-0187 - setproperty minimumGap to 300 and getProperty synch for proximity sensor -

STTL-116888 Sensor VT297-0188 - setproperty minimumGap to 100 and getProperty synch for proximity sensor -
    
    [Tags]    Android
    readResult    VT297-0188 - setproperty minimumGap to 100 and getProperty synch for proximity sensor -

STTL-116889 Sensor VT297-0189 - setproperty minimumGap to 300 and getProperty synch for proximitylongrange sensor -
    
    [Tags]    Android
    readResult    VT297-0189 - setproperty minimumGap to 300 and getProperty synch for proximitylongrange sensor -

STTL-116890 Sensor VT297-0190 - setproperty minimumGap to 100 and getProperty synch for proximitylongrange sensor -
    
    [Tags]    Android
    readResult    VT297-0190 - setproperty minimumGap to 100 and getProperty synch for proximitylongrange sensor -

STTL-116891 Sensor VT297-0191 - setproperty minimumGap to 300 and getProperty synch for pressure sensor -
    
    [Tags]    Android
    readResult    VT297-0191 - setproperty minimumGap to 300 and getProperty synch for pressure sensor -

STTL-116892 Sensor VT297-0192 - setproperty minimumGap to 100 and getProperty synch for pressure sensor -
    
    [Tags]    Android
    readResult    VT297-0192 - setproperty minimumGap to 100 and getProperty synch for pressure sensor -

STTL-116893 Sensor VT297-0193 - setproperty minimumGap to 300 and getProperty synch for temperature sensor -
    
    [Tags]    Android
    readResult    VT297-0193 - setproperty minimumGap to 300 and getProperty synch for temperature sensor -

STTL-116894 Sensor VT297-0194 - setproperty minimumGap to 100 and getProperty synch for temperature sensor -
    
    [Tags]    Android
    readResult    VT297-0194 - setproperty minimumGap to 100 and getProperty synch for temperature sensor -

STTL-116895 Sensor VT297-0195 - setproperty minimumGap to 300 and getProperty synch for humidity sensor -
    
    [Tags]    Android
    readResult    VT297-0195 - setproperty minimumGap to 300 and getProperty synch for humidity sensor -

STTL-116896 Sensor VT297-0196 - setproperty minimumGap to 100 and getProperty synch for humidity sensor -
    
    [Tags]    Android
    readResult    VT297-0196 - setproperty minimumGap to 100 and getProperty synch for humidity sensor -

STTL-116897 Sensor VT297-0197 - setproperty minimumGap to 300 and getProperty synch for gravity sensor -
    
    [Tags]    Android
    readResult    VT297-0197 - setproperty minimumGap to 300 and getProperty synch for gravity sensor -

STTL-116898 Sensor VT297-0198 - setproperty minimumGap to 100 and getProperty synch for gravity sensor -
    
    [Tags]    Android
    readResult    VT297-0198 - setproperty minimumGap to 100 and getProperty synch for gravity sensor -

STTL-116899 Sensor VT297-0199 - setproperty minimumGap to 300 and getProperty synch for linearAcceleration sensor -
    
    [Tags]    Android
    readResult    VT297-0199 - setproperty minimumGap to 300 and getProperty synch for linearAcceleration sensor -

STTL-116900 Sensor VT297-0200 - setproperty minimumGap to 100 and getProperty synch for linearAcceleration sensor -
    
    [Tags]    Android
    readResult    VT297-0200 - setproperty minimumGap to 100 and getProperty synch for linearAcceleration sensor -

STTL-116901 Sensor VT297-0201 - setproperty minimumGap to 300 and getProperty synch for rotation sensor -
    
    [Tags]    Android
    readResult    VT297-0201 - setproperty minimumGap to 300 and getProperty synch for rotation sensor -

STTL-116902 Sensor VT297-0202 - setproperty minimumGap to 100 and getProperty synch for rotation sensor -
    
    [Tags]    Android
    readResult    VT297-0202 - setproperty minimumGap to 100 and getProperty synch for rotation sensor -

STTL-116903 Sensor VT297-0203 - setproperty minimumGap to 300 and getProperty synch for orientation sensor -
    
    [Tags]    Android
    readResult    VT297-0203 - setproperty minimumGap to 300 and getProperty synch for orientation sensor -

STTL-116904 Sensor VT297-0204 - setproperty minimumGap to 100 and getProperty synch for orientation sensor -
    
    [Tags]    Android
    readResult    VT297-0204 - setproperty minimumGap to 100 and getProperty synch for orientation sensor -

STTL-116905 Sensor VT297-0205 - setProperties minimumGap to 300 and getProperties synch for accelerometer sensor -
    
    [Tags]    Android
    readResult    VT297-0205 - setProperties minimumGap to 300 and getProperties synch for accelerometer sensor -

STTL-116906 Sensor VT297-0206 - setProperties minimumGap to 100 and getProperties synch for accelerometer sensor -
    
    [Tags]    Android
    readResult    VT297-0206 - setProperties minimumGap to 100 and getProperties synch for accelerometer sensor -

STTL-116907 Sensor VT297-0207 - setProperties minimumGap to 300 and getProperties synch for deviceOrientation sensor -
    
    [Tags]    Android
    readResult    VT297-0207 - setProperties minimumGap to 300 and getProperties synch for deviceOrientation sensor -

STTL-116908 Sensor VT297-0208 - setProperties minimumGap to 100 and getProperties synch for deviceOrientation sensor -
    
    [Tags]    Android
    readResult    VT297-0208 - setProperties minimumGap to 100 and getProperties synch for deviceOrientation sensor -

STTL-116909 Sensor VT297-0209 - setProperties minimumGap to 300 and getProperties synch for tiltangle sensor -
    
    [Tags]    Android
    readResult    VT297-0209 - setProperties minimumGap to 300 and getProperties synch for tiltangle sensor -

STTL-116910 Sensor VT297-0210 - setProperties minimumGap to 100 and getProperties synch for tiltangle sensor -
    
    [Tags]    Android
    readResult    VT297-0210 - setProperties minimumGap to 100 and getProperties synch for tiltangle sensor -

STTL-116911 Sensor VT297-0211 - setProperties minimumGap to 300 and getProperties synch for motion sensor -
    
    [Tags]    Android
    readResult    VT297-0211 - setProperties minimumGap to 300 and getProperties synch for motion sensor -

STTL-116912 Sensor VT297-0212 - setProperties minimumGap to 100 and getProperties synch for motion sensor -
    
    [Tags]    Android
    readResult    VT297-0212 - setProperties minimumGap to 100 and getProperties synch for motion sensor -

STTL-116913 Sensor VT297-0213 - setProperties minimumGap to 300 and getProperties synch for ecompass sensor -
    
    [Tags]    Android
    readResult    VT297-0213 - setProperties minimumGap to 300 and getProperties synch for ecompass sensor -

STTL-116914 Sensor VT297-0214 - setProperties minimumGap to 100 and getProperties synch for ecompass sensor -
    
    [Tags]    Android
    readResult    VT297-0214 - setProperties minimumGap to 100 and getProperties synch for ecompass sensor -

STTL-116915 Sensor VT297-0215 - setProperties minimumGap to 300 and getProperties synch for magnetometer sensor -
    
    [Tags]    Android
    readResult    VT297-0215 - setProperties minimumGap to 300 and getProperties synch for magnetometer sensor -

STTL-116916 Sensor VT297-0216 - setProperties minimumGap to 100 and getProperties synch for magnetometer sensor -
    
    [Tags]    Android
    readResult    VT297-0216 - setProperties minimumGap to 100 and getProperties synch for magnetometer sensor -

STTL-116917 Sensor VT297-0217 - setProperties minimumGap to 300 and getProperties synch for gyroscope sensor -
    
    [Tags]    Android
    readResult    VT297-0217 - setProperties minimumGap to 300 and getProperties synch for gyroscope sensor -

STTL-116918 Sensor VT297-0216 - setProperties minimumGap to 100 and getProperties synch for gyroscope sensor -
    
    [Tags]    Android
    readResult    VT297-0216 - setProperties minimumGap to 100 and getProperties synch for gyroscope sensor -

STTL-116919 Sensor VT297-0219 - setProperties minimumGap to 300 and getProperties synch for eambientlighte sensor -
    
    [Tags]    Android
    readResult    VT297-0219 - setProperties minimumGap to 300 and getProperties synch for eambientlighte sensor -

STTL-116920 Sensor VT297-0220 - setProperties minimumGap to 100 and getProperties synch for eambientlighte sensor -
    
    [Tags]    Android
    readResult    VT297-0220 - setProperties minimumGap to 100 and getProperties synch for eambientlighte sensor -

STTL-116921 Sensor VT297-0221 - setProperties minimumGap to 300 and getProperties synch for proximity sensor -
    
    [Tags]    Android
    readResult    VT297-0221 - setProperties minimumGap to 300 and getProperties synch for proximity sensor -

STTL-116922 Sensor VT297-0222 - setProperties minimumGap to 100 and getProperties synch for proximity sensor -
    
    [Tags]    Android
    readResult    VT297-0222 - setProperties minimumGap to 100 and getProperties synch for proximity sensor -

STTL-116923 Sensor VT297-0223 - setProperties minimumGap to 300 and getProperties synch for proximitylongrange sensor -
    
    [Tags]    Android
    readResult    VT297-0223 - setProperties minimumGap to 300 and getProperties synch for proximitylongrange sensor -

STTL-116924 Sensor VT297-0224 - setProperties minimumGap to 100 and getProperties synch for proximitylongrange sensor -
    
    [Tags]    Android
    readResult    VT297-0224 - setProperties minimumGap to 100 and getProperties synch for proximitylongrange sensor -

STTL-116925 Sensor VT297-0225 - setProperties minimumGap to 300 and getProperties synch for pressure sensor -
    
    [Tags]    Android
    readResult    VT297-0225 - setProperties minimumGap to 300 and getProperties synch for pressure sensor -

STTL-116926 Sensor VT297-0226 - setProperties minimumGap to 100 and getProperties synch for pressure sensor -
    
    [Tags]    Android
    readResult    VT297-0226 - setProperties minimumGap to 100 and getProperties synch for pressure sensor -

STTL-116927 Sensor VT297-0227 - setProperties minimumGap to 300 and getProperties synch for temperature sensor -
    
    [Tags]    Android
    readResult    VT297-0227 - setProperties minimumGap to 300 and getProperties synch for temperature sensor -

STTL-116928 Sensor VT297-0228 - setProperties minimumGap to 100 and getProperties synch for temperature sensor -
    
    [Tags]    Android
    readResult    VT297-0228 - setProperties minimumGap to 100 and getProperties synch for temperature sensor -

STTL-116929 Sensor VT297-0229 - setProperties minimumGap to 300 and getProperties synch for humidity sensor -
    
    [Tags]    Android
    readResult    VT297-0229 - setProperties minimumGap to 300 and getProperties synch for humidity sensor -

STTL-116930 Sensor VT297-0230 - setProperties minimumGap to 100 and getProperties synch for humidity sensor -
    
    [Tags]    Android
    readResult    VT297-0230 - setProperties minimumGap to 100 and getProperties synch for humidity sensor -

STTL-116931 Sensor VT297-0231 - setProperties minimumGap to 300 and getProperties synch for gravity sensor -
    
    [Tags]    Android
    readResult    VT297-0231 - setProperties minimumGap to 300 and getProperties synch for gravity sensor -

STTL-116932 Sensor VT297-0232 - setProperties minimumGap to 100 and getProperties synch for gravity sensor -
    
    [Tags]    Android
    readResult    VT297-0232 - setProperties minimumGap to 100 and getProperties synch for gravity sensor -

STTL-116933 Sensor VT297-0233 - setProperties minimumGap to 300 and getProperties synch for linearAcceleration sensor -
    
    [Tags]    Android
    readResult    VT297-0233 - setProperties minimumGap to 300 and getProperties synch for linearAcceleration sensor -

STTL-116934 Sensor VT297-0234 - setProperties minimumGap to 100 and getProperties synch for linearAcceleration sensor -
    
    [Tags]    Android
    readResult    VT297-0234 - setProperties minimumGap to 100 and getProperties synch for linearAcceleration sensor -

STTL-116935 Sensor VT297-0235 - setProperties minimumGap to 300 and getProperties synch for rotation sensor -
    
    [Tags]    Android
    readResult    VT297-0235 - setProperties minimumGap to 300 and getProperties synch for rotation sensor -

STTL-116936 Sensor VT297-0236 - setProperties minimumGap to 100 and getProperties synch for rotation sensor -
    
    [Tags]    Android
    readResult    VT297-0236 - setProperties minimumGap to 100 and getProperties synch for rotation sensor -

STTL-116937 Sensor VT297-0237 - setProperties minimumGap to 300 and getProperties synch for orientation sensor -
    
    [Tags]    Android
    readResult    VT297-0237 - setProperties minimumGap to 300 and getProperties synch for orientation sensor -

STTL-116938 Sensor VT297-0238 - setProperties minimumGap to 100 and getProperties synch for orientation sensor -
    
    [Tags]    Android
    readResult    VT297-0238 - setProperties minimumGap to 100 and getProperties synch for orientation sensor -

STTL-116939 Sensor VT297-0239 - minimumGap getproperty with asynch for Accelerometer -
    
    [Tags]    Android
    readResult    VT297-0239 - minimumGap getproperty with asynch for Accelerometer -

STTL-116940 Sensor VT297-0240 - getProperty ananymous for Accelerometer sensor -
    
    [Tags]    Android
    readResult    VT297-0240 - getProperty ananymous for Accelerometer sensor -

STTL-116941 Sensor VT297-0241 - getProperties asynch for accelerometer sensor -
    
    [Tags]    Android
    readResult    VT297-0241 - getProperties asynch for accelerometer sensor -

STTL-116942 Sensor VT297-0242 - getProperties for accelerometer sensor with ananymous -
    
    [Tags]    Android
    readResult    VT297-0242 - getProperties for accelerometer sensor with ananymous -

STTL-116943 Sensor VT297-0243 - set minimumGap to 300 through set property and getProperty asynch for accelerometer sensor -
    
    [Tags]    Android
    readResult    VT297-0243 - set minimumGap to 300 through set property and getProperty asynch for accelerometer sensor -

STTL-116944 Sensor VT297-0244 - set minimumGap to 500 through set property and getProperty ananymous for accelerometer sensor -
    
    [Tags]    Android
    readResult    VT297-0244 - set minimumGap to 500 through set property and getProperty ananymous for accelerometer sensor -

STTL-116945 Sensor VT297-0245 - set minimumGap to 400 through set properties and getProperties asynch for accelerometer sensor -
    
    [Tags]    Android
    readResult    VT297-0245 - set minimumGap to 400 through set properties and getProperties asynch for accelerometer sensor -

STTL-116946 Sensor VT297-0246 - set minimumGap to 700 through set properties and getProperties ananymous for accelerometer sensor -
    
    [Tags]    Android
    readResult    VT297-0246 - set minimumGap to 700 through set properties and getProperties ananymous for accelerometer sensor -

STTL-116947 Sensor VT297-0247 - set minimumGap to 800 directly without using any setProperty -
    
    [Tags]    Android
    readResult    VT297-0247 - set minimumGap to 800 directly without using any setProperty -

STTL-116948 Sensor VT297-0248 - set minimumGap to 900 directly without using any using any setProperty -
    
    [Tags]    Android
    readResult    VT297-0248 - set minimumGap to 900 directly without using any using any setProperty -

STTL-116949 Sensor VT297-0249 - getAllProperties for accelerometer with asynch callback -
    
    [Tags]    Android
    readResult    VT297-0249 - getAllProperties for accelerometer with asynch callback -

STTL-116950 Sensor VT297-0250 - getAllProperties for accelerometer with synch -
    
    [Tags]    Android
    readResult    VT297-0250 - getAllProperties for accelerometer with synch -

STTL-116951 Sensor VT297-0251 - getAllProperties for accelerometer with ananymous -
    
    [Tags]    Android
    readResult    VT297-0251 - getAllProperties for accelerometer with ananymous -

STTL-116952 Sensor VT297-0254 - setProperty MinimumGap to 0 and call getproperty -
    
    [Tags]    Android
    readResult    VT297-0254 - setProperty MinimumGap to 0 and call getproperty -

STTL-116953 Sensor VT297-0255 - makeSensorByType to get Return the new Accelerometer sensor object by type -
    
    [Tags]    Android
    readResult    VT297-0255 - makeSensorByType to get Return the new Accelerometer sensor object by type -

STTL-116954 Sensor VT297-0256 - readData for Accelerometer before start to get read current sensor data -
    
    [Tags]    Android
    readResult    VT297-0256 - readData for Accelerometer before start to get read current sensor data -

STTL-116955 Sensor VT297-0257 - start to enable the Accelerometer sensor data retrieval with asych callback -
    
    [Tags]    Android
    readResult    VT297-0257 - start to enable the Accelerometer sensor data retrieval with asych callback -

STTL-116956 Sensor VT297-0258 - readData for Accelerometer after start to get read current sensor data -
    
    [Tags]    Android
    readResult    VT297-0258 - readData for Accelerometer after start to get read current sensor data -

STTL-116957 Sensor VT297-0260 - makeSensorByType to get Return the new DeviceOrientation sensor object by type -
    
    [Tags]    Android
    readResult    VT297-0260 - makeSensorByType to get Return the new DeviceOrientation sensor object by type -

STTL-116958 Sensor VT297-0265 - makeSensorByType to get Return the new TiltAngle sensor object by type -
    
    [Tags]    Android
    readResult    VT297-0265 - makeSensorByType to get Return the new TiltAngle sensor object by type -

STTL-116959 Sensor VT297-0266 - readData for TiltAngle before start to get read current sensor data -
    
    [Tags]    Android
    readResult    VT297-0266 - readData for TiltAngle before start to get read current sensor data -

STTL-116960 Sensor VT297-0267 - start to enable the TiltAngle sensor data retrieval with asych callback -
    
    [Tags]    Android
    readResult    VT297-0267 - start to enable the TiltAngle sensor data retrieval with asych callback -

STTL-116961 Sensor VT297-0268 - readData for TiltAngle after start to get read current sensor data -
    
    [Tags]    Android
    readResult    VT297-0268 - readData for TiltAngle after start to get read current sensor data -

STTL-116962 Sensor VT297-0269 - stop to Stop listening to the TiltAngle sensor -
    
    [Tags]    Android
    readResult    VT297-0269 - stop to Stop listening to the TiltAngle sensor -

STTL-116963 Sensor VT297-0270 - makeSensorByType to get Return the new Motion sensor object by type -
    
    [Tags]    Android
    readResult    VT297-0270 - makeSensorByType to get Return the new Motion sensor object by type -

STTL-116964 Sensor VT297-0275 - makeSensorByType to get Return the new ECompass sensor object by type -
    
    [Tags]    Android
    readResult    VT297-0275 - makeSensorByType to get Return the new ECompass sensor object by type -

STTL-116965 Sensor VT297-0276 - readData for ECompass before start to get read current sensor data -
    
    [Tags]    Android
    readResult    VT297-0276 - readData for ECompass before start to get read current sensor data -

STTL-116966 Sensor VT297-0277 - start to enable the ECompass sensor data retrieval with asych callback -
    
    [Tags]    Android
    readResult    VT297-0277 - start to enable the ECompass sensor data retrieval with asych callback -

STTL-116967 Sensor VT297-0278 - readData for ECompass after start to get read current sensor data -
    
    [Tags]    Android
    readResult    VT297-0278 - readData for ECompass after start to get read current sensor data -

STTL-116968 Sensor VT297-0279 - stop to Stop listening to the ECompass sensor -
    
    [Tags]    Android
    readResult    VT297-0279 - stop to Stop listening to the ECompass sensor -

STTL-116969 Sensor VT297-0280 - makeSensorByType to get Return the new Magnetometer sensor object by type -
    
    [Tags]    Android
    readResult    VT297-0280 - makeSensorByType to get Return the new Magnetometer sensor object by type -

STTL-116970 Sensor VT297-0281 - readData for Magnetometer before start to get read current sensor data -
    
    [Tags]    Android
    readResult    VT297-0281 - readData for Magnetometer before start to get read current sensor data -

STTL-116971 Sensor VT297-0282 - start to enable the Magnetometer sensor data retrieval with asych callback -
    
    [Tags]    Android
    readResult    VT297-0282 - start to enable the Magnetometer sensor data retrieval with asych callback -

STTL-116972 Sensor VT297-0283 - readData for Magnetometer after start to get read current sensor data -
    
    [Tags]    Android
    readResult    VT297-0283 - readData for Magnetometer after start to get read current sensor data -

STTL-116973 Sensor VT297-0284 - stop to Stop listening to the Magnetometer sensor -
    
    [Tags]    Android
    readResult    VT297-0284 - stop to Stop listening to the Magnetometer sensor -

STTL-116974 Sensor VT297-0285 - makeSensorByType to get Return the new Gyroscope sensor object by type -
    
    [Tags]    Android
    readResult    VT297-0285 - makeSensorByType to get Return the new Gyroscope sensor object by type -

STTL-116975 Sensor VT297-0286 - readData for Gyroscope before start to get read current sensor data -
    
    [Tags]    Android
    readResult    VT297-0286 - readData for Gyroscope before start to get read current sensor data -

STTL-116976 Sensor VT297-0287 - start to enable the Gyroscope sensor data retrieval with asych callback -
    
    [Tags]    Android
    readResult    VT297-0287 - start to enable the Gyroscope sensor data retrieval with asych callback -

STTL-116977 Sensor VT297-0288 - readData for Gyroscope after start to get read current sensor data -
    
    [Tags]    Android
    readResult    VT297-0288 - readData for Gyroscope after start to get read current sensor data -

STTL-116978 Sensor VT297-0289 - stop to Stop listening to the Gyroscope sensor -
    
    [Tags]    Android
    readResult    VT297-0289 - stop to Stop listening to the Gyroscope sensor -

STTL-116979 Sensor VT297-0290 - makeSensorByType to get Return the new AmbientLight sensor object by type -
    
    [Tags]    Android
    readResult    VT297-0290 - makeSensorByType to get Return the new AmbientLight sensor object by type -

STTL-116980 Sensor VT297-0295 - makeSensorByType to get Return the new Proximity sensor object by type -
    
    [Tags]    Android
    readResult    VT297-0295 - makeSensorByType to get Return the new Proximity sensor object by type -

STTL-116981 Sensor VT297-0300 - makeSensorByType to get Return the new ProximityLongRange sensor object by type -
    
    [Tags]    Android
    readResult    VT297-0300 - makeSensorByType to get Return the new ProximityLongRange sensor object by type -

STTL-116982 Sensor VT297-0305 - makeSensorByType to get Return the new Pressure sensor object by type -
    
    [Tags]    Android
    readResult    VT297-0305 - makeSensorByType to get Return the new Pressure sensor object by type -

STTL-116983 Sensor VT297-0310 - makeSensorByType to get Return the new Temperature sensor object by type -
    
    [Tags]    Android
    readResult    VT297-0310 - makeSensorByType to get Return the new Temperature sensor object by type -

STTL-116984 Sensor VT297-0311 - readData for Temperature before start to get read current sensor data -
    
    [Tags]    Android
    readResult    VT297-0311 - readData for Temperature before start to get read current sensor data -

STTL-116985 Sensor VT297-0312 - start to enable the Temperature sensor data retrieval with asych callback -
    
    [Tags]    Android
    readResult    VT297-0312 - start to enable the Temperature sensor data retrieval with asych callback -

STTL-116986 Sensor VT297-0313 - readData for Temperature after start to get read current sensor data -
    
    [Tags]    Android
    readResult    VT297-0313 - readData for Temperature after start to get read current sensor data -

STTL-116987 Sensor VT297-0314 - stop to Stop listening to the Temperature sensor -
    
    [Tags]    Android
    readResult    VT297-0314 - stop to Stop listening to the Temperature sensor -

STTL-116988 Sensor VT297-0315 - makeSensorByType to get Return the new Humidity sensor object by type -
    
    [Tags]    Android
    readResult    VT297-0315 - makeSensorByType to get Return the new Humidity sensor object by type -

STTL-116989 Sensor VT297-0316 - readData for Humidity before start to get read current sensor data -
    
    [Tags]    Android
    readResult    VT297-0316 - readData for Humidity before start to get read current sensor data -

STTL-116990 Sensor VT297-0317 - start to enable the Humidity sensor data retrieval with asych callback -
    
    [Tags]    Android
    readResult    VT297-0317 - start to enable the Humidity sensor data retrieval with asych callback -

STTL-116991 Sensor VT297-0318 - readData for Humidity after start to get read current sensor data -
    
    [Tags]    Android
    readResult    VT297-0318 - readData for Humidity after start to get read current sensor data -

STTL-116992 Sensor VT297-0319 - stop to Stop listening to the Humidity sensor -
    
    [Tags]    Android
    readResult    VT297-0319 - stop to Stop listening to the Humidity sensor -

STTL-116993 Sensor VT297-0320 - makeSensorByType to get Return the new Gravity sensor object by type -
    
    [Tags]    Android
    readResult    VT297-0320 - makeSensorByType to get Return the new Gravity sensor object by type -

STTL-116994 Sensor VT297-0325 - makeSensorByType to get Return the new LinearAcceleration sensor object by type -
    
    [Tags]    Android
    readResult    VT297-0325 - makeSensorByType to get Return the new LinearAcceleration sensor object by type -

STTL-116995 Sensor VT297-0326 - readData for LinearAcceleration before start to get read current sensor data -
    
    [Tags]    Android
    readResult    VT297-0326 - readData for LinearAcceleration before start to get read current sensor data -

STTL-116996 Sensor VT297-0327 - start to enable the LinearAcceleration sensor data retrieval with asych callback -
    
    [Tags]    Android
    readResult    VT297-0327 - start to enable the LinearAcceleration sensor data retrieval with asych callback -

STTL-116997 Sensor VT297-0328 - readData for LinearAcceleration after start to get read current sensor data -
    
    [Tags]    Android
    readResult    VT297-0328 - readData for LinearAcceleration after start to get read current sensor data -

STTL-116998 Sensor VT297-0329 - stop to Stop listening to the LinearAcceleration sensor -
    
    [Tags]    Android
    readResult    VT297-0329 - stop to Stop listening to the LinearAcceleration sensor -

STTL-116999 Sensor VT297-0330 - makeSensorByType to get Return the new Rotation sensor object by type -
    
    [Tags]    Android
    readResult    VT297-0330 - makeSensorByType to get Return the new Rotation sensor object by type -

STTL-117000 Sensor VT297-0331 - readData for Rotation before start to get read current sensor data -
    
    [Tags]    Android
    readResult    VT297-0331 - readData for Rotation before start to get read current sensor data -

STTL-117001 Sensor VT297-0332 - start to enable the Rotation sensor data retrieval with asych callback -
    
    [Tags]    Android
    readResult    VT297-0332 - start to enable the Rotation sensor data retrieval with asych callback -

STTL-117002 Sensor VT297-0333 - readData for Rotation after start to get read current sensor data -
    
    [Tags]    Android
    readResult    VT297-0333 - readData for Rotation after start to get read current sensor data -

STTL-117003 Sensor VT297-0334 - stop to Stop listening to the Rotation sensor -
    
    [Tags]    Android
    readResult    VT297-0334 - stop to Stop listening to the Rotation sensor -

STTL-117004 Sensor VT297-0335 - makeSensorByType to get Return the new Orientation sensor object by type -
    
    [Tags]    Android
    readResult    VT297-0335 - makeSensorByType to get Return the new Orientation sensor object by type -

STTL-117005 Sensor VT297-0336 - readData for Orientation before start to get read current sensor data -
    
    [Tags]    Android
    readResult    VT297-0336 - readData for Orientation before start to get read current sensor data -

STTL-117006 Sensor VT297-0337 - start to enable the Orientation sensor data retrieval with asych callback -
    
    [Tags]    Android
    readResult    VT297-0337 - start to enable the Orientation sensor data retrieval with asych callback -

STTL-117007 Sensor VT297-0338 - readData for Orientation after start to get read current sensor data -
    
    [Tags]    Android
    readResult    VT297-0338 - readData for Orientation after start to get read current sensor data -

STTL-117008 Sensor VT297-0339 - stop to Stop listening to the Orientation sensor -
    
    [Tags]    Android
    readResult    VT297-0339 - stop to Stop listening to the Orientation sensor -

