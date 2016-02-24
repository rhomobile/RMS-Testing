*** Settings ***
Library    jasmineTests.py
Library    config.py
Suite Setup    precondition

*** keywords ***
precondition
    waitTimeCapture    400
    startPath    Configuration/Applications/Application/General,StartPage,<StartPage value="http://127.0.0.1:8082/app/CameraFront/specRunner.html" name="Menu"/>

*** Test Cases ***
STTL-116701 Camera Front Call getDefault
    [Documentation]
    [Tags]    Android
    readResult    Call getDefault

STTL-116702 Camera Front Check default values of all writeable property
    [Documentation]
    [Tags]    Android
    readResult    Check default values of all writeable property

STTL-116703 Camera Front Check values of all read only property
    [Documentation]
    [Tags]    Android
    readResult    Check values of all read only property

STTL-116704 Camera Front Call getProperties with sync callback and hash
    [Documentation]
    [Tags]    Android
    readResult    Call getProperties with sync callback and hash

STTL-116705 Camera Front Call getProperties with anonymous callback and hash
    [Documentation]
    [Tags]    Android
    readResult    Call getProperties with anonymous callback and hash

STTL-116706 Camera Front Call getProperties without callback
    [Documentation]
    [Tags]    Android
    readResult    Call getProperties without callback

STTL-116707 Camera Front Call getProperty with sync callback and property
    [Documentation]
    [Tags]    Android
    readResult    Call getProperty with sync callback and property

STTL-116708 Camera Front Call getProperty with anonymous callback and property
    [Documentation]
    [Tags]    Android
    readResult    Call getProperty with anonymous callback and property

STTL-116709 Camera Front Call getProperty without callback
    [Documentation]
    [Tags]    Android
    readResult    Call getProperty without callback

STTL-116710 Camera Front Call getAllProperties with Anonymous callback
    [Documentation]
    [Tags]    Android
    readResult    Call getAllProperties with Anonymous callback

STTL-116711 Camera Front Should set flashMode to FLASH_ON using direct calling method
    [Documentation]
    [Tags]    Android
    readResult    Should set flashMode to FLASH_ON using direct calling method

STTL-116712 Camera Front Should set flashMode to FLASH_ON using setproperty calling method
    [Documentation]
    [Tags]    Android
    readResult    Should set flashMode to FLASH_ON using setproperty calling method

STTL-116713 Camera Front Should set flashMode to FLASH_ON using setproperties calling method
    [Documentation]
    [Tags]    Android
    readResult    Should set flashMode to FLASH_ON using setproperties calling method

STTL-116714 Camera Front Should set flashMode to FLASH_OFF using direct calling method
    [Documentation]
    [Tags]    Android
    readResult    Should set flashMode to FLASH_OFF using direct calling method

STTL-116715 Camera Front Should set flashMode to FLASH_OFF using setproperty calling method
    [Documentation]
    [Tags]    Android
    readResult    Should set flashMode to FLASH_OFF using setproperty calling method

STTL-116716 Camera Front Should set flashMode to FLASH_OFF using setproperties calling method
    [Documentation]
    [Tags]    Android
    readResult    Should set flashMode to FLASH_OFF using setproperties calling method

STTL-116717 Camera Front Should set flashMode to FLASH_AUTO using direct calling method
    [Documentation]
    [Tags]    Android
    readResult    Should set flashMode to FLASH_AUTO using direct calling method

STTL-116718 Camera Front Should set flashMode to FLASH_AUTO using setproperty calling method
    [Documentation]
    [Tags]    Android
    readResult    Should set flashMode to FLASH_AUTO using setproperty calling method

STTL-116719 Camera Front Should set flashMode to FLASH_AUTO using setproperties calling method
    [Documentation]
    [Tags]    Android
    readResult    Should set flashMode to FLASH_AUTO using setproperties calling method

STTL-116720 Camera Front Should set flashMode to FLASH_RED_EYE using direct calling method
    [Documentation]
    [Tags]    Android
    readResult    Should set flashMode to FLASH_RED_EYE using direct calling method

STTL-116721 Camera Front Should set flashMode to FLASH_RED_EYE using setproperty calling method
    [Documentation]
    [Tags]    Android
    readResult    Should set flashMode to FLASH_RED_EYE using setproperty calling method

STTL-116722 Camera Front Should set flashMode to FLASH_RED_EYE using setproperties calling method
    [Documentation]
    [Tags]    Android
    readResult    Should set flashMode to FLASH_RED_EYE using setproperties calling method

STTL-116723 Camera Front Should set flashMode to FLASH_TORCH using direct calling method
    [Documentation]
    [Tags]    Android
    readResult    Should set flashMode to FLASH_TORCH using direct calling method

STTL-116724 Camera Front Should set flashMode to FLASH_TORCH using setproperty calling method
    [Documentation]
    [Tags]    Android
    readResult    Should set flashMode to FLASH_TORCH using setproperty calling method

STTL-116725 Camera Front Should set flashMode to FLASH_TORCH using setproperties calling method
    [Documentation]
    [Tags]    Android
    readResult    Should set flashMode to FLASH_TORCH using setproperties calling method

STTL-116726 Camera Front Should set colorModel to COLOR_MODEL_RGB using direct calling method
    [Documentation]
    [Tags]    Android
    readResult    Should set colorModel to COLOR_MODEL_RGB using direct calling method

STTL-116727 Camera Front Should set colorModel to COLOR_MODEL_RGB using setproperty calling method
    [Documentation]
    [Tags]    Android
    readResult    Should set colorModel to COLOR_MODEL_RGB using setproperty calling method

STTL-116728 Camera Front Should set colorModel to COLOR_MODEL_RGB using setproperties calling method
    [Documentation]
    [Tags]    Android
    readResult    Should set colorModel to COLOR_MODEL_RGB using setproperties calling method

STTL-116729 Camera Front Should set colorModel to COLOR_MODEL_GRAYSCALE using direct calling method
    [Documentation]
    [Tags]    Android
    readResult    Should set colorModel to COLOR_MODEL_GRAYSCALE using direct calling method

STTL-116730 Camera Front Should set colorModel to COLOR_MODEL_GRAYSCALE using setproperty calling method
    [Documentation]
    [Tags]    Android
    readResult    Should set colorModel to COLOR_MODEL_GRAYSCALE using setproperty calling method

STTL-116731 Camera Front Should set colorModel to COLOR_MODEL_GRAYSCALE using setproperties calling method
    [Documentation]
    [Tags]    Android
    readResult    Should set colorModel to COLOR_MODEL_GRAYSCALE using setproperties calling method

STTL-116732 Camera Front Should set outputFormat to OUTPUT_FORMAT_IMAGE using direct calling method
    [Documentation]
    [Tags]    Android
    readResult    Should set outputFormat to OUTPUT_FORMAT_IMAGE using direct calling method

STTL-116733 Camera Front Should set outputFormat to OUTPUT_FORMAT_IMAGE using setproperty calling method
    [Documentation]
    [Tags]    Android
    readResult    Should set outputFormat to OUTPUT_FORMAT_IMAGE using setproperty calling method

STTL-116734 Camera Front Should set outputFormat to OUTPUT_FORMAT_IMAGE using setproperties calling method
    [Documentation]
    [Tags]    Android
    readResult    Should set outputFormat to OUTPUT_FORMAT_IMAGE using setproperties calling method

STTL-116735 Camera Front Should set outputFormat to OUTPUT_FORMAT_DATAURI using direct calling method
    [Documentation]
    [Tags]    Android
    readResult    Should set outputFormat to OUTPUT_FORMAT_DATAURI using direct calling method

STTL-116736 Camera Front Should set outputFormat to OUTPUT_FORMAT_DATAURI using setproperty calling method
    [Documentation]
    [Tags]    Android
    readResult    Should set outputFormat to OUTPUT_FORMAT_DATAURI using setproperty calling method

STTL-116737 Camera Front Should set outputFormat to OUTPUT_FORMAT_DATAURI using setproperties calling method
    [Documentation]
    [Tags]    Android
    readResult    Should set outputFormat to OUTPUT_FORMAT_DATAURI using setproperties calling method

STTL-116738 Camera Front Should set compressionFormat to COMPRESSION_FORMAT_JPG using direct calling method
    [Documentation]
    [Tags]    Android
    readResult    Should set compressionFormat to COMPRESSION_FORMAT_JPG using direct calling method

STTL-116739 Camera Front Should set compressionFormat to COMPRESSION_FORMAT_JPG using setproperty calling method
    [Documentation]
    [Tags]    Android
    readResult    Should set compressionFormat to COMPRESSION_FORMAT_JPG using setproperty calling method

STTL-116740 Camera Front Should set compressionFormat to COMPRESSION_FORMAT_JPG using setproperties calling method
    [Documentation]
    [Tags]    Android
    readResult    Should set compressionFormat to COMPRESSION_FORMAT_JPG using setproperties calling method

STTL-116741 Camera Front Set captureSound :localpath and mp3 file
    [Documentation]
    [Tags]    Android
    readResult    Set captureSound :localpath and mp3 file

STTL-116742 Camera Front Set colorModel :grayscale
    [Documentation]
    [Tags]    Android
    readResult    Set colorModel :grayscale

STTL-116743 Camera Front Set colorModel :rgb
    [Documentation]
    [Tags]    Android
    readResult    Set colorModel :rgb

STTL-116744 Camera Front Set color_model :grayscale
    [Documentation]
    [Tags]    Android
    readResult    Set color_model :grayscale

STTL-116745 Camera Front Set color_model :rgb
    [Documentation]
    [Tags]    Android
    readResult    Set color_model :rgb

STTL-116746 Camera Front Set compressionFormat :jpg
    [Documentation]
    [Tags]    Android
    readResult    Set compressionFormat :jpg

STTL-116747 Camera Front Set format :jpg
    [Documentation]
    [Tags]    Android
    readResult    Set format :jpg

STTL-116748 Camera Front Set fileName :localpath
    [Documentation]
    [Tags]    Android
    readResult    Set fileName :localpath

STTL-116749 Camera Front Set fileName :with special charecter
    [Documentation]
    [Tags]    Android
    readResult    Set fileName :with special charecter

STTL-116750 Camera Front Set flashMode :on
    [Documentation]
    [Tags]    Android
    readResult    Set flashMode :on

STTL-116751 Camera Front Set flashMode :off
    [Documentation]
    [Tags]    Android
    readResult    Set flashMode :off

STTL-116752 Camera Front Set flash_mode :on
    [Documentation]
    [Tags]    Android
    readResult    Set flash_mode :on

STTL-116753 Camera Front Set flash_mode :off
    [Documentation]
    [Tags]    Android
    readResult    Set flash_mode :off

STTL-116754 Camera Front Set flashMode :auto
    [Documentation]
    [Tags]    Android
    readResult    Set flashMode :auto

STTL-116755 Camera Front Set flashMode :redEye
    [Documentation]
    [Tags]    Android
    readResult    Set flashMode :redEye

STTL-116756 Camera Front Set flashMode :torch
    [Documentation]
    [Tags]    Android
    readResult    Set flashMode :torch

STTL-116757 Camera Front Set flash_mode :auto
    [Documentation]
    [Tags]    Android
    readResult    Set flash_mode :auto

STTL-116758 Camera Front Set flash_mode :redEye
    [Documentation]
    [Tags]    Android
    readResult    Set flash_mode :redEye

STTL-116759 Camera Front Set flash_mode :torch
    [Documentation]
    [Tags]    Android
    readResult    Set flash_mode :torch

STTL-116760 Camera Front Set outputFormat :dataUri
    [Documentation]
    [Tags]    Android
    readResult    Set outputFormat :dataUri

STTL-116761 Camera Front Set outputFormat :image
    [Documentation]
    [Tags]    Android
    readResult    Set outputFormat :image

STTL-116762 Camera Front Set saveToDeviceGallery :true
    [Documentation]
    [Tags]    Android
    readResult    Set saveToDeviceGallery :true

STTL-116763 Camera Front Set saveToDeviceGallery :false
    [Documentation]
    [Tags]    Android
    readResult    Set saveToDeviceGallery :false

STTL-116764 Camera Front Set useSystemViewfinder :true
    [Documentation]
    [Tags]    Android
    readResult    Set useSystemViewfinder :true

STTL-116765 Camera Front Set useSystemViewfinder :false
    [Documentation]
    [Tags]    Android
    readResult    Set useSystemViewfinder :false

STTL-116766 Camera Front Set captureSound :localpath and mp3 file
    [Documentation]
    [Tags]    Android
    readResult    Set captureSound :localpath and mp3 file

STTL-116767 Camera Front Set colorModel :grayscale
    [Documentation]
    [Tags]    Android
    readResult    Set colorModel :grayscale

STTL-116768 Camera Front Set colorModel :rgb
    [Documentation]
    [Tags]    Android
    readResult    Set colorModel :rgb

STTL-116769 Camera Front Set color_model :grayscale
    [Documentation]
    [Tags]    Android
    readResult    Set color_model :grayscale

STTL-116770 Camera Front Set color_model :rgb
    [Documentation]
    [Tags]    Android
    readResult    Set color_model :rgb

STTL-116771 Camera Front Set compressionFormat :jpg
    [Documentation]
    [Tags]    Android
    readResult    Set compressionFormat :jpg

STTL-116772 Camera Front Set format :jpg
    [Documentation]
    [Tags]    Android
    readResult    Set format :jpg

STTL-116773 Camera Front Set fileName :localpath
    [Documentation]
    [Tags]    Android
    readResult    Set fileName :localpath

STTL-116774 Camera Front Set fileName :with special charecter
    [Documentation]
    [Tags]    Android
    readResult    Set fileName :with special charecter

STTL-116775 Camera Front Set flashMode :on
    [Documentation]
    [Tags]    Android
    readResult    Set flashMode :on

STTL-116776 Camera Front Set flashMode :off
    [Documentation]
    [Tags]    Android
    readResult    Set flashMode :off

STTL-116777 Camera Front Set flash_mode :on
    [Documentation]
    [Tags]    Android
    readResult    Set flash_mode :on

STTL-116778 Camera Front Set flash_mode :off
    [Documentation]
    [Tags]    Android
    readResult    Set flash_mode :off

STTL-116779 Camera Front Set flashMode :auto
    [Documentation]
    [Tags]    Android
    readResult    Set flashMode :auto

STTL-116780 Camera Front Set flashMode :redEye
    [Documentation]
    [Tags]    Android
    readResult    Set flashMode :redEye

STTL-116781 Camera Front Set flashMode :torch
    [Documentation]
    [Tags]    Android
    readResult    Set flashMode :torch

STTL-116782 Camera Front Set flash_mode :auto
    [Documentation]
    [Tags]    Android
    readResult    Set flash_mode :auto

STTL-116783 Camera Front Set flash_mode :redEye
    [Documentation]
    [Tags]    Android
    readResult    Set flash_mode :redEye

STTL-116784 Camera Front Set flash_mode :torch
    [Documentation]
    [Tags]    Android
    readResult    Set flash_mode :torch

STTL-116785 Camera Front Set outputFormat :dataUri
    [Documentation]
    [Tags]    Android
    readResult    Set outputFormat :dataUri

STTL-116786 Camera Front Set outputFormat :image
    [Documentation]
    [Tags]    Android
    readResult    Set outputFormat :image

STTL-116787 Camera Front Set saveToDeviceGallery :true
    [Documentation]
    [Tags]    Android
    readResult    Set saveToDeviceGallery :true

STTL-116788 Camera Front Set saveToDeviceGallery :false
    [Documentation]
    [Tags]    Android
    readResult    Set saveToDeviceGallery :false

STTL-116789 Camera Front Set useSystemViewfinder :true
    [Documentation]
    [Tags]    Android
    readResult    Set useSystemViewfinder :true

STTL-116790 Camera Front Set useSystemViewfinder :false
    [Documentation]
    [Tags]    Android
    readResult    Set useSystemViewfinder :false

STTL-116791 Camera Front Set captureSound :localpath and mp3 file
    [Documentation]
    [Tags]    Android
    readResult    Set captureSound :localpath and mp3 file

STTL-116792 Camera Front Set colorModel :grayscale
    [Documentation]
    [Tags]    Android
    readResult    Set colorModel :grayscale

STTL-116793 Camera Front Set colorModel :rgb
    [Documentation]
    [Tags]    Android
    readResult    Set colorModel :rgb

STTL-116794 Camera Front Set color_model :grayscale
    [Documentation]
    [Tags]    Android
    readResult    Set color_model :grayscale

STTL-116795 Camera Front Set color_model :rgb
    [Documentation]
    [Tags]    Android
    readResult    Set color_model :rgb

STTL-116796 Camera Front Set compressionFormat :jpg
    [Documentation]
    [Tags]    Android
    readResult    Set compressionFormat :jpg

STTL-116797 Camera Front Set format :jpg
    [Documentation]
    [Tags]    Android
    readResult    Set format :jpg

STTL-116798 Camera Front Set fileName :localpath
    [Documentation]
    [Tags]    Android
    readResult    Set fileName :localpath

STTL-116799 Camera Front Set fileName :with special charecter
    [Documentation]
    [Tags]    Android
    readResult    Set fileName :with special charecter

STTL-116800 Camera Front Set flashMode :on
    [Documentation]
    [Tags]    Android
    readResult    Set flashMode :on

STTL-116801 Camera Front Set flashMode :off
    [Documentation]
    [Tags]    Android
    readResult    Set flashMode :off

STTL-116802 Camera Front Set flash_mode :on
    [Documentation]
    [Tags]    Android
    readResult    Set flash_mode :on

STTL-116803 Camera Front Set flash_mode :off
    [Documentation]
    [Tags]    Android
    readResult    Set flash_mode :off

STTL-116804 Camera Front Set flashMode :auto
    [Documentation]
    [Tags]    Android
    readResult    Set flashMode :auto

STTL-116805 Camera Front Set flashMode :redEye
    [Documentation]
    [Tags]    Android
    readResult    Set flashMode :redEye

STTL-116806 Camera Front Set flashMode :torch
    [Documentation]
    [Tags]    Android
    readResult    Set flashMode :torch

STTL-116807 Camera Front Set flash_mode :auto
    [Documentation]
    [Tags]    Android
    readResult    Set flash_mode :auto

STTL-116808 Camera Front Set flash_mode :redEye
    [Documentation]
    [Tags]    Android
    readResult    Set flash_mode :redEye

STTL-116809 Camera Front Set flash_mode :torch
    [Documentation]
    [Tags]    Android
    readResult    Set flash_mode :torch

STTL-116810 Camera Front Set outputFormat :dataUri
    [Documentation]
    [Tags]    Android
    readResult    Set outputFormat :dataUri

STTL-116811 Camera Front Set outputFormat :image
    [Documentation]
    [Tags]    Android
    readResult    Set outputFormat :image

STTL-116812 Camera Front Set saveToDeviceGallery :true
    [Documentation]
    [Tags]    Android
    readResult    Set saveToDeviceGallery :true

STTL-116813 Camera Front Set saveToDeviceGallery :false
    [Documentation]
    [Tags]    Android
    readResult    Set saveToDeviceGallery :false

STTL-116814 Camera Front Set useSystemViewfinder :true
    [Documentation]
    [Tags]    Android
    readResult    Set useSystemViewfinder :true

STTL-116815 Camera Front Set useSystemViewfinder :false
    [Documentation]
    [Tags]    Android
    readResult    Set useSystemViewfinder :false

