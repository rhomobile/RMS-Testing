from robot.api import logger
from robot.libraries import BuiltIn
from robot.libraries import OperatingSystem
import os
import sys
sys.path.append('D:/Programs/RobotforAppium/appiumTests.jar')
sys.path.append('D:/Programs/RobotforAppium/appiumJar/java-client-3.2.0.jar')
sys.path.append('D:/Programs/RobotforAppium/Jars/apache-mime4j-0.6.jar')
sys.path.append('D:/Programs/RobotforAppium/Jars/bsh-1.3.0.jar')
sys.path.append('D:/Programs/RobotforAppium/Jars/commons-codec-1.9.jar')
sys.path.append('D:/Programs/RobotforAppium/Jars/commons-collections-3.2.1.jar')
sys.path.append('D:/Programs/RobotforAppium/Jars/commons-exec-1.1.jar')
sys.path.append('D:/Programs/RobotforAppium/Jars/commons-io-2.4.jar')
sys.path.append('D:/Programs/RobotforAppium/Jars/commons-jxpath-1.3.jar')
sys.path.append('D:/Programs/RobotforAppium/Jars/commons-lang3-3.2.1.jar')
sys.path.append('D:/Programs/RobotforAppium/Jars/commons-logging-1.1.3.jar')
sys.path.append('D:/Programs/RobotforAppium/Jars/cssparser-0.9.11.jar')
sys.path.append('D:/Programs/RobotforAppium/Jars/dom4j-1.1.jar')
sys.path.append('D:/Programs/RobotforAppium/Jars/guava-15.0.jar')
sys.path.append('D:/Programs/RobotforAppium/Jars/hamcrest-core-1.3.jar')
sys.path.append('D:/Programs/RobotforAppium/Jars/hamcrest-library-1.3.jar')
sys.path.append('D:/Programs/RobotforAppium/Jars/htmlunit-2.14.jar')
sys.path.append('D:/Programs/RobotforAppium/Jars/htmlunit-core-js-2.14.jar')
sys.path.append('D:/Programs/RobotforAppium/Jars/httpclient-4.3.2.jar')
sys.path.append('D:/Programs/RobotforAppium/Jars/httpcore-4.3.1.jar')
sys.path.append('D:/Programs/RobotforAppium/Jars/httpmime-4.3.2.jar')
sys.path.append('D:/Programs/RobotforAppium/Jars/ini4j-0.5.2.jar')
sys.path.append('D:/Programs/RobotforAppium/Jars/jcommander-1.29.jar')
sys.path.append('D:/Programs/RobotforAppium/Jars/jetty-websocket-8.1.8.jar')
sys.path.append('D:/Programs/RobotforAppium/Jars/jna-3.4.0.jar')
sys.path.append('D:/Programs/RobotforAppium/Jars/jna-platform-3.4.0.jar')
sys.path.append('D:/Programs/RobotforAppium/Jars/json-20080701.jar')
sys.path.append('D:/Programs/RobotforAppium/Jars/junit.jar')
sys.path.append('D:/Programs/RobotforAppium/Jars/junit-3.8.1.jar')
sys.path.append('D:/Programs/RobotforAppium/Jars/junit-dep-4.10.jar')
sys.path.append('D:/Programs/RobotforAppium/Jars/junit-dep-4.11.jar')
sys.path.append('D:/Programs/RobotforAppium/Jars/log4j-1.2.13.jar')
sys.path.append('D:/Programs/RobotforAppium/Jars/log4j-1.2.14.jar')
sys.path.append('D:/Programs/RobotforAppium/Jars/mail.jar')
sys.path.append('D:/Programs/RobotforAppium/Jars/mail_1.4.3.jar')
sys.path.append('D:/Programs/RobotforAppium/Jars/nekohtml-1.9.20.jar')
sys.path.append('D:/Programs/RobotforAppium/Jars/netty-3.5.7.Final.jar')
sys.path.append('D:/Programs/RobotforAppium/Jars/operadriver-1.5.jar')
sys.path.append('D:/Programs/RobotforAppium/Jars/phantomjsdriver-1.1.0.jar')
sys.path.append('D:/Programs/RobotforAppium/Jars/poi-3.6-20091214.jar')
sys.path.append('D:/Programs/RobotforAppium/Jars/poi-examples-3.8-20120326.jar')
sys.path.append('D:/Programs/RobotforAppium/Jars/poi-excelant-3.8-20120326.jar')
sys.path.append('D:/Programs/RobotforAppium/Jars/poi-ooxml-3.6-20091214.jar')
sys.path.append('D:/Programs/RobotforAppium/Jars/poi-ooxml-schemas-3.6-20091214.jar')
sys.path.append('D:/Programs/RobotforAppium/Jars/protobuf-java-2.4.1.jar')
sys.path.append('D:/Programs/RobotforAppium/Jars/sac-1.3.jar')
sys.path.append('D:/Programs/RobotforAppium/Jars/saxon-8.7.jar')
sys.path.append('D:/Programs/RobotforAppium/Jars/SaxonLiaison.jar')
sys.path.append('D:/Programs/RobotforAppium/Jars/selendroid-client-0.15.0.jar')
sys.path.append('D:/Programs/RobotforAppium/Jars/selendroid-standalone-0.15.0-with-dependencies.jar')
sys.path.append('D:/Programs/RobotforAppium/Jars/selenium-java-2.42.2.jar')
sys.path.append('D:/Programs/RobotforAppium/Jars/selenium-java-2.42.2-srcs.jar')
sys.path.append('D:/Programs/RobotforAppium/Jars/serializer-2.7.1.jar')
sys.path.append('D:/Programs/RobotforAppium/Jars/testng-6.0.1-nobsh-noguice.jar')
sys.path.append('D:/Programs/RobotforAppium/Jars/testng-6.8.5.jar')
sys.path.append('D:/Programs/RobotforAppium/Jars/testng-xslt-maven-plugin-test-0.0.jar')
sys.path.append('D:/Programs/RobotforAppium/Jars/xalan-2.7.1.jar')
sys.path.append('D:/Programs/RobotforAppium/Jars/xercesImpl-2.11.0.jar')
sys.path.append('D:/Programs/RobotforAppium/Jars/xml-apis-1.4.01.jar')
sys.path.append('D:/Programs/RobotforAppium/Jars/xmlbeans-2.3.0.jar')
sys.path.append('D:/Programs/RobotforAppium/Jars/xslt.jar')

from com.testcases import EBDriverScript

def startApplicationModuleTests(testid):
    logger.info("testcaseId : " + testid)
    module = "EBManual_Application_JS"
    logger.info("test module : " + module)
    test = EBDriverScript()
    test.runTest(testid, module)
	
def startBatteryModuleTests(testid):
    logger.info("testcaseId : " + testid)
    module = "EBManual_BatteryIndicator_JS"
    logger.info("test module : " + module)
    test = EBDriverScript()
    test.runTest(testid, module)
	
def startCameraModuleTests(testid):
    logger.info("testcaseId : " + testid)
    module = "EBManual_Camera_JS"
    logger.info("test module : " + module)
    test = EBDriverScript()
    test.runTest(testid, module)
	
def startCamerafrontModuleTests(testid):
    logger.info("testcaseId : " + testid)
    module = "EBManual_Camera_Front_JS"
    logger.info("test module : " + module)
    test = EBDriverScript()
    test.runTest(testid, module)
	
def startConfigxmlModuleTests(testid):
    logger.info("testcaseId : " + testid)
    module = "EBManual_Configxml_JS"
    logger.info("test module : " + module)
    test = EBDriverScript()
    test.runTest(testid, module)
	
def startOnDeviceConfigModuleTests(testid):
    logger.info("testcaseId : " + testid)
    module = "EBManual_OnDeviceConfig_JS"
    logger.info("test module : " + module)
    test = EBDriverScript()
    test.runTest(testid, module)
	
def startIntentModuleTests(testid):
    logger.info("testcaseId : " + testid)
    module = "EBManual_Intent_JS"
    logger.info("test module : " + module)
    test = EBDriverScript()
    test.runTest(testid, module)
	
def startKeycaptureModuleTests(testid):
    logger.info("testcaseId : " + testid)
    module = "EBManual_Keycapture_JS"
    logger.info("test module : " + module)
    test = EBDriverScript()
    test.runTest(testid, module)
	
def startNetworkModuleTests(testid):
    logger.info("testcaseId : " + testid)
    module = "EBManual_Network_JS"
    logger.info("test module : " + module)
    test = EBDriverScript()
    test.runTest(testid, module)
	
def startNotificationModuleTests(testid):
    logger.info("testcaseId : " + testid)
    module = "EBManual_Notification_JS"
    logger.info("test module : " + module)
    test = EBDriverScript()
    test.runTest(testid, module)
	
def startScreenOrientationModuleTests(testid):
    logger.info("testcaseId : " + testid)
    module = "EBManual_ScreenOrientation_JS"
    logger.info("test module : " + module)
    test = EBDriverScript()
    test.runTest(testid, module)
	
def startSignalModuleTests(testid):
    logger.info("testcaseId : " + testid)
    module = "EBManual_SignalIndicator_JS"
    logger.info("test module : " + module)
    test = EBDriverScript()
    test.runTest(testid, module)
	
def startSignatureModuleTests(testid):
    logger.info("testcaseId : " + testid)
    module = "EBManual_Signature_JS"
    logger.info("test module : " + module)
    test = EBDriverScript()
    test.runTest(testid, module)
	
def startSystemModuleTests(testid):
    logger.info("testcaseId : " + testid)
    module = "EBManual_System_JS"
    logger.info("test module : " + module)
    test = EBDriverScript()
    test.runTest(testid, module)
	
def startTabbarModuleTests(testid):
    logger.info("testcaseId : " + testid)
    module = "EBManual_Tabbar_JS"
    logger.info("test module : " + module)
    test = EBDriverScript()
    test.runTest(testid, module)
	
def startToolbarModuleTests(testid):
    logger.info("testcaseId : " + testid)
    module = "EBManual_Toolbar_JS"
    logger.info("test module : " + module)
    test = EBDriverScript()
    test.runTest(testid, module)
	
def startWebviewModuleTests(testid):
    logger.info("testcaseId : " + testid)
    module = "EBManual_Webview_JS"
    logger.info("test module : " + module)
    test = EBDriverScript()
    test.runTest(testid, module)
	
def startPBApdModuleTests(testid):
    logger.info("testcaseId : " + testid)
    module = "EBPB_APD"
    logger.info("test module : " + module)
    test = EBDriverScript()
    test.runTest(testid, module)
	
def startPBBatteryModuleTests(testid):
    logger.info("testcaseId : " + testid)
    module = "EBPB_Battery"
    logger.info("test module : " + module)
    test = EBDriverScript()
    test.runTest(testid, module)
	
def startPBControlAppearanceModuleTests(testid):
    logger.info("testcaseId : " + testid)
    module = "EBPB_ControlAppearance"
    logger.info("test module : " + module)
    test = EBDriverScript()
    test.runTest(testid, module)
	
def startPBDeviceApplicationModuleTests(testid):
    logger.info("testcaseId : " + testid)
    module = "EBPB_DeviceApplication"
    logger.info("test module : " + module)
    test = EBDriverScript()
    test.runTest(testid, module)
	
def startPBEMML10ModuleTests(testid):
    logger.info("testcaseId : " + testid)
    module = "EBPB_EMML10"
    logger.info("test module : " + module)
    test = EBDriverScript()
    test.runTest(testid, module)
	
def startPBEMML11ModuleTests(testid):
    logger.info("testcaseId : " + testid)
    module = "EBPB_EMML11"
    logger.info("test module : " + module)
    test = EBDriverScript()
    test.runTest(testid, module)
	
def startPBEMMLProfilesModuleTests(testid):
    logger.info("testcaseId : " + testid)
    module = "EBPB_EMMLProfiles"
    logger.info("test module : " + module)
    test = EBDriverScript()
    test.runTest(testid, module)
	
def startPBFileManagementModuleTests(testid):
    logger.info("testcaseId : " + testid)
    module = "EBPB_FileManagement"
    logger.info("test module : " + module)
    test = EBDriverScript()
    test.runTest(testid, module)
	
def startPBGenericModuleTests(testid):
    logger.info("testcaseId : " + testid)
    module = "EBPB_Generic"
    logger.info("test module : " + module)
    test = EBDriverScript()
    test.runTest(testid, module)
	
def startPBGestureModuleTests(testid):
    logger.info("testcaseId : " + testid)
    module = "EBPB_Gesture"
    logger.info("test module : " + module)
    test = EBDriverScript()
    test.runTest(testid, module)
	
def startPBImagerModuleTests(testid):
    logger.info("testcaseId : " + testid)
    module = "EBPB_Imager"
    logger.info("test module : " + module)
    test = EBDriverScript()
    test.runTest(testid, module)
	
def startPBKeyhandlingModuleTests(testid):
    logger.info("testcaseId : " + testid)
    module = "EBPB_Keyhandling"
    logger.info("test module : " + module)
    test = EBDriverScript()
    test.runTest(testid, module)
	
def startPBPB2ModuleTests(testid):
    logger.info("testcaseId : " + testid)
    module = "EBPB_PB2"
    logger.info("test module : " + module)
    test = EBDriverScript()
    test.runTest(testid, module)
	
def startPBSignalModuleTests(testid):
    logger.info("testcaseId : " + testid)
    module = "EBPB_Signal"
    logger.info("test module : " + module)
    test = EBDriverScript()
    test.runTest(testid, module)
	
def startPBSignatureModuleTests(testid):
    logger.info("testcaseId : " + testid)
    module = "EBPB_Signature"
    logger.info("test module : " + module)
    test = EBDriverScript()
    test.runTest(testid, module)
	
def startRE22APDModuleTests(testid):
    logger.info("testcaseId : " + testid)
    module = "EBRE22_APD"
    logger.info("test module : " + module)
    test = EBDriverScript()
    test.runTest(testid, module)
	
def startRE22BatteryModuleTests(testid):
    logger.info("testcaseId : " + testid)
    module = "EBRE22_Battery"
    logger.info("test module : " + module)
    test = EBDriverScript()
    test.runTest(testid, module)
	
def startRE22ControlAppearanceModuleTests(testid):
    logger.info("testcaseId : " + testid)
    module = "EBRE22_ControlAppearance"
    logger.info("test module : " + module)
    test = EBDriverScript()
    test.runTest(testid, module)
	
def startRE22DeviceApplicationModuleTests(testid):
    logger.info("testcaseId : " + testid)
    module = "EBRE22_DeviceApplication"
    logger.info("test module : " + module)
    test = EBDriverScript()
    test.runTest(testid, module)
	
def startRE22FileManagementModuleTests(testid):
    logger.info("testcaseId : " + testid)
    module = "EBRE22_FileManagement"
    logger.info("test module : " + module)
    test = EBDriverScript()
    test.runTest(testid, module)
	
def startRE22GestureModuleTests(testid):
    logger.info("testcaseId : " + testid)
    module = "EBRE22_Gesture"
    logger.info("test module : " + module)
    test = EBDriverScript()
    test.runTest(testid, module)
	
def startRE22ImagerModuleTests(testid):
    logger.info("testcaseId : " + testid)
    module = "EBRE22_Imager"
    logger.info("test module : " + module)
    test = EBDriverScript()
    test.runTest(testid, module)
	
def startRE22KeyhandlingModuleTests(testid):
    logger.info("testcaseId : " + testid)
    module = "EBRE22_Keyhandling"
    logger.info("test module : " + module)
    test = EBDriverScript()
    test.runTest(testid, module)
	
def startRE22NetworkModuleTests(testid):
    logger.info("testcaseId : " + testid)
    module = "EBRE22_Network"
    logger.info("test module : " + module)
    test = EBDriverScript()
    test.runTest(testid, module)
	
def startRE22SignalModuleTests(testid):
    logger.info("testcaseId : " + testid)
    module = "EBRE22_Signal"
    logger.info("test module : " + module)
    test = EBDriverScript()
    test.runTest(testid, module)
	
def startRE22SignatureModuleTests(testid):
    logger.info("testcaseId : " + testid)
    module = "EBRE22_Signature"
    logger.info("test module : " + module)
    test = EBDriverScript()
    test.runTest(testid, module)
	
def startAutotoManualIntentModuleTests(testid):
    logger.info("testcaseId : " + testid)
    module = "EBAutotoManual_Intent_JS"
    logger.info("test module : " + module)
    test = EBDriverScript()
    test.runTest(testid, module)
	
def startRE22RawSensorsModuleTests(testid):
    logger.info("testcaseId : " + testid)
    module = "EBRE22_RawSensors"
    logger.info("test module : " + module)
    test = EBDriverScript()
    test.runTest(testid, module)

    

