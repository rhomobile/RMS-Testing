*** Settings ***
Library    appiumTests_EB.py

*** Test Cases ***
STTL-116701 Camera
    [Documentation]    Change Start page
    startCameraModuleTests    STTL-116701

STTL-116702 Camera
    [Documentation]    should call choosePicture with callback status OK
    startCameraModuleTests    STTL-116702

STTL-116703 Camera
    [Documentation]    should call choosePicture with callback status cancel
    startCameraModuleTests    STTL-116703

STTL-116704 Camera
    [Documentation]    Should call choosePicture with outputFormat as image & callback as anonymous function
    startCameraModuleTests    STTL-116704

STTL-116705 Camera
    [Documentation]    Should call choosePicture with 'outputFormat' property value as dataUri
    startCameraModuleTests    STTL-116705

STTL-116706 Camera
    [Documentation]    should choosePicture with callback and suspend the device
    startCameraModuleTests    STTL-116706

STTL-116707 Camera
    [Documentation]    Should call takePicture
    startCameraModuleTests    STTL-116707

STTL-116708 Camera
    [Documentation]    Should call takePicture and returned status cancel
    startCameraModuleTests    STTL-116708

STTL-116709 Camera
    [Documentation]    Should call takePicture and invalid fileName path
    startCameraModuleTests    STTL-116709

STTL-116710 Camera
    [Documentation]    Should call takePicture and suspend the device
    startCameraModuleTests    STTL-116710

STTL-116711 Camera
    [Documentation]    Should call takePicture with outputFormat:dataUri
    startCameraModuleTests    STTL-116711

STTL-116712 Camera
    [Documentation]    Should call takePicture with desiredHeight 640 and desiredWidth 360
    startCameraModuleTests    STTL-116712

STTL-116713 Camera
    [Documentation]    Should call takePicture with desiredHeight 0 and desiredWidth 0
    startCameraModuleTests    STTL-116713

STTL-116714 Camera
    [Documentation]    Should call takePicture with desiredWidth & desiredHeight more than max supported and Capture
    startCameraModuleTests    STTL-116714

STTL-116715 Camera
    [Documentation]    Should call takePicture with propertyhash outputFormat:image with fileName and using anonymous callback
    startCameraModuleTests    STTL-116715

STTL-116716 Camera
    [Documentation]    Should call takePicture with previewHeight, previewLeft, previewTop, previewWidth and callback
    startCameraModuleTests    STTL-116716

STTL-116717 Camera
    [Documentation]    Should capture image by calling takePicture() method with compressionFormat jpg.
    startCameraModuleTests    STTL-116717

STTL-116718 Camera
    [Documentation]    Should capture image by calling takePicture() method with compressionFormat png.
    startCameraModuleTests    STTL-116718

STTL-116719 Camera
    [Documentation]    Should capture image by calling takePicture() method with useSystemViewfinder false
    startCameraModuleTests    STTL-116719

STTL-116720 Camera
    [Documentation]    Should capture image by calling takePicture() method with useSystemViewfinder true
    startCameraModuleTests    STTL-116720

STTL-116721 Camera
    [Documentation]    Should capture image by calling takePicture() method with saveToDeviceGallery false 
    startCameraModuleTests    STTL-116721

STTL-116722 Camera
    [Documentation]    Should capture image by calling takePicture() method with saveToDeviceGallery true
    startCameraModuleTests    STTL-116722

STTL-116723 Camera
    [Documentation]    Should call takePicture and quit the application
    startCameraModuleTests    STTL-116723

