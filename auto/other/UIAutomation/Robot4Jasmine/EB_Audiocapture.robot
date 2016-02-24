*** Settings ***
Library    jasmineTests.py
Library    config.py
Suite Setup    precondition

*** keywords ***
precondition
    waitTimeCapture    400
    startPath    Configuration/Applications/Application/General,StartPage,<StartPage value="http://127.0.0.1:8082/app/AudiocaptureTest/specRunner.html" name="Menu"/>

*** Test Cases ***
STTL-116701 AudioCapture Should get maxDuration default value
    [Documentation]
    [Tags]    Android
    readResult    Should get maxDuration default value

STTL-116702 AudioCapture Should get encoder default value
    [Documentation]
    [Tags]    Android
    readResult    Should get encoder default value

STTL-116703 AudioCapture Should Set encoder to ENCODER_AAC using direct calling method
    [Documentation]
    [Tags]    Android
    readResult    Should Set encoder to ENCODER_AAC using direct calling method

STTL-116704 AudioCapture Should Set encoder to AAC using setProperty calling method
    [Documentation]
    [Tags]    Android
    readResult    Should Set encoder to AAC using setProperty calling method

STTL-116705 AudioCapture Should Set encoder to AAC using setProperties calling method
    [Documentation]
    [Tags]    Android
    readResult    Should Set encoder to AAC using setProperties calling method

STTL-116706 AudioCapture Should Set encoder to ENCODER_AMR_NB using direct calling method
    [Documentation]
    [Tags]    Android
    readResult    Should Set encoder to ENCODER_AMR_NB using direct calling method

STTL-116707 AudioCapture Should Set encoder to AMR_NB using setProperty calling method
    [Documentation]
    [Tags]    Android
    readResult    Should Set encoder to AMR_NB using setProperty calling method

STTL-116708 AudioCapture Should Set encoder to AMR_NB using setProperties calling method
    [Documentation]
    [Tags]    Android
    readResult    Should Set encoder to AMR_NB using setProperties calling method

STTL-116709 AudioCapture Should Set encoder to ENCODER_AMR_WB using direct calling method
    [Documentation]
    [Tags]    Android
    readResult    Should Set encoder to ENCODER_AMR_WB using direct calling method

STTL-116710 AudioCapture Should Set encoder to AMR_WB using setProperty calling method
    [Documentation]
    [Tags]    Android
    readResult    Should Set encoder to AMR_WB using setProperty calling method

STTL-116711 AudioCapture Should Set encoder to AMR_WB using setProperties calling method
    [Documentation]
    [Tags]    Android
    readResult    Should Set encoder to AMR_WB using setProperties calling method

STTL-116712 AudioCapture Should Set maxDuration to 1000 using direct calling method
    [Documentation]
    [Tags]    Android
    readResult    Should Set maxDuration to 1000 using direct calling method

STTL-116713 AudioCapture Should Set maxDuration to 1000 using setProperty calling method
    [Documentation]
    [Tags]    Android
    readResult    Should Set maxDuration to 1000 using setProperty calling method

STTL-116714 AudioCapture Should Set maxDuration to 1000 using setProperties calling method
    [Documentation]
    [Tags]    Android
    readResult    Should Set maxDuration to 1000 using setProperties calling method

STTL-116715 AudioCapture Should Set maxDuration to 2000 using direct calling method
    [Documentation]
    [Tags]    Android
    readResult    Should Set maxDuration to 2000 using direct calling method

STTL-116716 AudioCapture Should Set maxDuration to 2000 using setProperty calling method
    [Documentation]
    [Tags]    Android
    readResult    Should Set maxDuration to 2000 using setProperty calling method

STTL-116717 AudioCapture Should Set maxDuration to 2000 using setProperties calling method
    [Documentation]
    [Tags]    Android
    readResult    Should Set maxDuration to 2000 using setProperties calling method

STTL-116718 AudioCapture Should Set maxDuration to 30000 using direct calling method
    [Documentation]
    [Tags]    Android
    readResult    Should Set maxDuration to 30000 using direct calling method

STTL-116719 AudioCapture Should Set maxDuration to 30000 using setProperty calling method
    [Documentation]
    [Tags]    Android
    readResult    Should Set maxDuration to 30000 using setProperty calling method

STTL-116720 AudioCapture Should Set maxDuration to 30000 using setProperties calling method
    [Documentation]
    [Tags]    Android
    readResult    Should Set maxDuration to 30000 using setProperties calling method

STTL-116721 AudioCapture Should Set maxDuration to -1000 using direct calling method
    [Documentation]
    [Tags]    Android
    readResult    Should Set maxDuration to -1000 using direct calling method

STTL-116722 AudioCapture Should Set maxDuration to -1000 using setProperty calling method
    [Documentation]
    [Tags]    Android
    readResult    Should Set maxDuration to -1000 using setProperty calling method

STTL-116723 AudioCapture Should Set maxDuration to -1000 using setProperties calling method
    [Documentation]
    [Tags]    Android
    readResult    Should Set maxDuration to -1000 using setProperties calling method

STTL-116724 AudioCapture Should Set maxDuration to 0 using direct calling method
    [Documentation]
    [Tags]    Android
    readResult    Should Set maxDuration to 0 using direct calling method

STTL-116725 AudioCapture Should Set maxDuration to 0 using setProperty calling method
    [Documentation]
    [Tags]    Android
    readResult    Should Set maxDuration to 0 using setProperty calling method

STTL-116726 AudioCapture Should Set maxDuration to 0 using setProperties calling method
    [Documentation]
    [Tags]    Android
    readResult    Should Set maxDuration to 0 using setProperties calling method

STTL-116727 AudioCapture Should Set maxDuration to 500 using direct calling method
    [Documentation]
    [Tags]    Android
    readResult    Should Set maxDuration to 500 using direct calling method

STTL-116728 AudioCapture Should Set maxDuration to 500 using setProperty calling method
    [Documentation]
    [Tags]    Android
    readResult    Should Set maxDuration to 500 using setProperty calling method

STTL-116729 AudioCapture Should Set maxDuration to 500 using setProperties calling method
    [Documentation]
    [Tags]    Android
    readResult    Should Set maxDuration to 500 using setProperties calling method

STTL-116730 AudioCapture Should Set fileName to myAudio using direct calling method
    [Documentation]
    [Tags]    Android
    readResult    Should Set fileName to myAudio using direct calling method

STTL-116731 AudioCapture Should Set fileName to myAudio using setProperty calling method
    [Documentation]
    [Tags]    Android
    readResult    Should Set fileName to myAudio using setProperty calling method

STTL-116732 AudioCapture Should Set fileName to myAudio using setProperties calling method
    [Documentation]
    [Tags]    Android
    readResult    Should Set fileName to myAudio using setProperties calling method

STTL-116733 AudioCapture Should Set fileName to AudioCapture using direct calling method
    [Documentation]
    [Tags]    Android
    readResult    Should Set fileName to AudioCapture using direct calling method

STTL-116734 AudioCapture Should Set fileName to AudioCapture using setProperty calling method
    [Documentation]
    [Tags]    Android
    readResult    Should Set fileName to AudioCapture using setProperty calling method

STTL-116735 AudioCapture Should Set fileName to AudioCapture using setProperties calling method
    [Documentation]
    [Tags]    Android
    readResult    Should Set fileName to AudioCapture using setProperties calling method

STTL-116736 AudioCapture Should Set fileName to myAudio_test using direct calling method
    [Documentation]
    [Tags]    Android
    readResult    Should Set fileName to myAudio_test using direct calling method

STTL-116737 AudioCapture Should Set fileName to myAudio_test using setProperty calling method
    [Documentation]
    [Tags]    Android
    readResult    Should Set fileName to myAudio_test using setProperty calling method

STTL-116738 AudioCapture Should Set fileName to myAudio_test using setProperties calling method
    [Documentation]
    [Tags]    Android
    readResult    Should Set fileName to myAudio_test using setProperties calling method

STTL-116739 AudioCapture Should Set fileName to audio_test123 using direct calling method
    [Documentation]
    [Tags]    Android
    readResult    Should Set fileName to audio_test123 using direct calling method

STTL-116740 AudioCapture Should Set fileName to audio_test123 using setProperty calling method
    [Documentation]
    [Tags]    Android
    readResult    Should Set fileName to audio_test123 using setProperty calling method

STTL-116741 AudioCapture Should Set fileName to audio_test123 using setProperties calling method
    [Documentation]
    [Tags]    Android
    readResult    Should Set fileName to audio_test123 using setProperties calling method

STTL-116742 AudioCapture set maxDuration with value null
    [Documentation]
    [Tags]    Android
    readResult    set maxDuration with value null

STTL-116743 AudioCapture set maxDurationwith value 10000
    [Documentation]
    [Tags]    Android
    readResult    set maxDurationwith value 10000

STTL-116744 AudioCapture set maxDurationwith value 60000
    [Documentation]
    [Tags]    Android
    readResult    set maxDurationwith value 60000

STTL-116745 AudioCapture set maxDurationwith value 1000
    [Documentation]
    [Tags]    Android
    readResult    set maxDurationwith value 1000

STTL-116746 AudioCapture set maxDurationwith value 500
    [Documentation]
    [Tags]    Android
    readResult    set maxDurationwith value 500

STTL-116747 AudioCapture set maxDurationwith value 1500
    [Documentation]
    [Tags]    Android
    readResult    set maxDurationwith value 1500

STTL-116748 AudioCapture set maxDurationwith value 0
    [Documentation]
    [Tags]    Android
    readResult    set maxDurationwith value 0

STTL-116749 AudioCapture set maxDurationwith value -3000
    [Documentation]
    [Tags]    Android
    readResult    set maxDurationwith value -3000

STTL-116750 AudioCapture set fileNamewith value audio_123
    [Documentation]
    [Tags]    Android
    readResult    set fileNamewith value audio_123

STTL-116751 AudioCapture set fileNamewith value 1234
    [Documentation]
    [Tags]    Android
    readResult    set fileNamewith value 1234

STTL-116752 AudioCapture set fileNamewith value 12345 audio
    [Documentation]
    [Tags]    Android
    readResult    set fileNamewith value 12345 audio

STTL-116753 AudioCapture set fileNamewith value audio_capture
    [Documentation]
    [Tags]    Android
    readResult    set fileNamewith value audio_capture

STTL-116754 AudioCapture call start with filename set to "myaudio.mp4" with extension
    [Documentation]
    [Tags]    Android
    readResult    call start with filename set to "myaudio.mp4" with extension

STTL-116755 AudioCapture call start with filename set to "/sdcard/Temp/myaudio"
    [Documentation]
    [Tags]    Android
    readResult    call start with filename set to "/sdcard/Temp/myaudio"

STTL-116756 AudioCapture call start with filename set to "/sdcard/Temp/myaudio.mp4"
    [Documentation]
    [Tags]    Android
    readResult    call start with filename set to "/sdcard/Temp/myaudio.mp4"

STTL-116757 AudioCapture call start with filename set to path which does not exists in device /create/audio
    [Documentation]
    [Tags]    Android
    readResult    call start with filename set to path which does not exists in device /create/audio

STTL-116758 AudioCapture capture the audio with two different encoders(ENCODER_ACC and ENCODER_AMR_NB) with same fileName
    [Documentation]
    [Tags]    Android
    readResult    capture the audio with two different encoders(ENCODER_ACC and ENCODER_AMR_NB) with same fileName

STTL-116759 AudioCapture capture the audio with two different encoders(ENCODER_ACC and ENCODER_AMR_WB) with same fileName
    [Documentation]
    [Tags]    Android
    readResult    capture the audio with two different encoders(ENCODER_ACC and ENCODER_AMR_WB) with same fileName

STTL-116760 AudioCapture capture the audio with two different encoders(ENCODER_AMR_NB and ENCODER_AMR_WB) with same fileName
    [Documentation]
    [Tags]    Android
    readResult    capture the audio with two different encoders(ENCODER_AMR_NB and ENCODER_AMR_WB) with same fileName

STTL-116761 AudioCapture call stop method after capturing 2000 msecs of audio capture
    [Documentation]
    [Tags]    Android
    readResult    call stop method after capturing 2000 msecs of audio capture

STTL-116762 AudioCapture call stop method after capturing 4000 msecs of audio capture
    [Documentation]
    [Tags]    Android
    readResult    call stop method after capturing 4000 msecs of audio capture

STTL-116763 AudioCapture call stop method after capturing 10000 msecs of audio capture
    [Documentation]
    [Tags]    Android
    readResult    call stop method after capturing 10000 msecs of audio capture

STTL-116764 AudioCapture call cancel method after capturing 3000 msecs of audio capture
    [Documentation]
    [Tags]    Android
    readResult    call cancel method after capturing 3000 msecs of audio capture

STTL-116765 AudioCapture call cancel method after capturing 10000 msecs of audio capture
    [Documentation]
    [Tags]    Android
    readResult    call cancel method after capturing 10000 msecs of audio capture

STTL-116766 AudioCapture call stop method after capturing 10 seconds of audio capture and again call cancel method continuosly
    [Documentation]
    [Tags]    Android
    readResult    call stop method after capturing 10 seconds of audio capture and again call cancel method continuosly

STTL-116767 AudioCapture call cancel method after capturing 10 seconds of audio capture and again call stop method continuously
    [Documentation]
    [Tags]    Android
    readResult    call cancel method after capturing 10 seconds of audio capture and again call stop method continuously

STTL-116768 AudioCapture Once captured the audio file by setting all properties again call start without setting any properties
    [Documentation]
    [Tags]    Android
    readResult    Once captured the audio file by setting all properties again call start without setting any properties

