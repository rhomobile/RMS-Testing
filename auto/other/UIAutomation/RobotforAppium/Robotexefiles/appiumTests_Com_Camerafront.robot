*** Settings ***
Library    appiumTests_EB.py

*** Test Cases ***
STTL-116701 Camerafront
    [Documentation]    Change Start page
    startCamerafrontModuleTests    STTL-116701

STTL-116702 Camerafront
    [Documentation]    Should call takePicture
    startCamerafrontModuleTests    STTL-116702

STTL-116703 Camerafront
    [Documentation]    Should call takePicture and returned status cancel
    startCamerafrontModuleTests    STTL-116703

STTL-116704 Camerafront
    [Documentation]    Should call takePicture and invalid fileName path
    startCamerafrontModuleTests    STTL-116704

STTL-116705 Camerafront
    [Documentation]    Should call takePicture and suspend the device
    startCamerafrontModuleTests    STTL-116705

STTL-116706 Camerafront
    [Documentation]    Should call takePicture with outputFormat:dataUri
    startCamerafrontModuleTests    STTL-116706

STTL-116707 Camerafront
    [Documentation]    Should call takePicture with desiredHeight 640 and desiredWidth 360
    startCamerafrontModuleTests    STTL-116707

STTL-116708 Camerafront
    [Documentation]    Should call takePicture with desiredHeight 0 and desiredWidth 0
    startCamerafrontModuleTests    STTL-116708

STTL-116709 Camerafront
    [Documentation]    Should call takePicture with desiredWidth & desiredHeight more than max supported and Capture
    startCamerafrontModuleTests    STTL-116709

STTL-116710 Camerafront
    [Documentation]    Should call takePicture with propertyhash outputFormat:image with fileName and using anonymous callback
    startCamerafrontModuleTests    STTL-116710

STTL-116711 Camerafront
    [Documentation]    Should call takePicture with previewHeight, previewLeft, previewTop, previewWidth and callback
    startCamerafrontModuleTests    STTL-116711

STTL-116712 Camerafront
    [Documentation]    Should capture image by calling takePicture() method with compressionFormat jpg.
    startCamerafrontModuleTests    STTL-116712

STTL-116713 Camerafront
    [Documentation]    Should capture image by calling takePicture() method with compressionFormat png.
    startCamerafrontModuleTests    STTL-116713

STTL-116714 Camerafront
    [Documentation]    Should capture image by calling takePicture() method with useSystemViewfinder false
    startCamerafrontModuleTests    STTL-116714

STTL-116715 Camerafront
    [Documentation]    Should capture image by calling takePicture() method with useSystemViewfinder true
    startCamerafrontModuleTests    STTL-116715

STTL-116716 Camerafront
    [Documentation]    Should capture image by calling takePicture() method with saveToDeviceGallery false 
    startCamerafrontModuleTests    STTL-116716

STTL-116717 Camerafront
    [Documentation]    Should capture image by calling takePicture() method with saveToDeviceGallery true
    startCamerafrontModuleTests    STTL-116717

STTL-116718 Camerafront
    [Documentation]    Should call takePicture and quit the application
    startCamerafrontModuleTests    STTL-116718

