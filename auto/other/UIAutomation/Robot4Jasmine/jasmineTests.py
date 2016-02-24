from robot.api import logger
from robot.libraries import BuiltIn
from robot.libraries import OperatingSystem
import os
import sys
import time
import xml.sax
import xml.etree.ElementTree as ElementTree
import config
import xunitparser

config.init()
robotBuiltIn = BuiltIn.BuiltIn()

# Path to jasmineTests.jar inside the application folder in the system.
sys.path.append('D:\Robot4Jasmine\jasmineTests.jar')

from com.zebra import EBConfig

waitTime = 3
def waitTimeCapture(timeout):
	global waitTime
	waitTime = int(timeout)

def startPath(node):
	target = open(config.resultXmlPath, 'w+')
	target.close()
	time.sleep(3)
	test = EBConfig()
	test.PullConfigxml()
	test = EBConfig()
	# test.ChangeConfigxml('Configuration/Applications/Application,CustomDOMElements,<CustomDOMElements value="file://%INSTALLDIR%/mytags.txt"/>')
	# test.ChangeConfigxml('Configuration/WebServer,Enabled,<Enabled value="1"/>')
	# test.ChangeConfigxml('Configuration/WebServer,WebFolder,<WebFolder value="\\auto\\auto_common_spec\\"/>')
	test.ChangeConfigxml(node)
	test = EBConfig()
	test.PushConfigxml()
	time.sleep(3)
	test.launchEB()
	time.sleep(waitTime)

def readResult(testSpec):
	time.sleep(3)
	print "spec : ", testSpec
	ts, tr = xunitparser.parse(open(config.resultXmlPath))
	match = ""
	for tc in ts:
		print tc.methodname
		testname = tc.methodname
		if tc.methodname == testSpec:
			match = "found"
			print "Test : ", tc.result
			if tc.result != "success":
				robotBuiltIn.fail(tc.trace)
			else:
				print "Not Found"
	if match != "found":
		robotBuiltIn.fail("Test not found")
