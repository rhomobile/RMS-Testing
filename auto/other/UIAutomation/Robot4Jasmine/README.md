=============
Robot4Jasmine
=============


Description
-----------

Using this setup, run the auto_common_spec appliction written in jasmine framework. Uses node.js, xunitparser and robot framework to initiate the auto_common_spec jasmine tests through EnterpriseBrowser(EB) in the connected device. Once the tests are run, the result purged to result.xml are read and report is generated to report.html


Prerequisite
------------

Node.js
Python
Jython
Robot Framework


Usage
-----

*** In the Device ***

1) Install the latest Enterprise Browser.

2) Copy auto_common_spec folder to the device's internal storage by creating a folder "auto". Hence full application path becomes '/storage/sdcard0/auto/auto_common_spec/'.

3) A file inside this auto_common_spec need your system IP to communicate the result. Get the file jasmine.junit_reporter.js from the path \auto_common_spec\public\jasmine\jasmine.junit_reporter.js which needs your system IP in the following line to communicate the result.

	var requestString = 'http://10.233.82.66:4040/sendresult?text=' + encodeURIComponent(text);		<< Inside function 'writeFile' just update the IP with your system IP.


*** In the System ***

1) Copy Robot4Jasmine folder in the system which is the setup to run the auto_common_spec tests.

2) Go to the path <Path till the application>\Robot4Jasmine\xunitparser-1.3.3\ and run in command prompt - 'python setup.py install' to install the xunitparser setup.

3) Now make the following changes in the respective files in Robot4Jasmine :

	a) server.js at the path <Path till the application>\Robot4Jasmine\server\server.js -
		var server_ip = "10.233.82.66";								<< The system ip at line 8.
		var writeSource = 'D:/Robot4Jasmine/server/result.xml';		<< Path to the result.xml where the result gets purged from the device at line 20.

	b) config.py at the path <Path till the application>\Robot4Jasmine\config.py -
		serverIp = "10.233.82.66"									<< The system ip at line 4.
		resultXmlPath = "D:/Robot4Jasmine/server/result.xml"		<< Path to the result.xml where the result gets purged from the device at line 9.

	c) jasmineTests.py at the path <Path till the application>\Robot4Jasmine\jasmineTests.py -
		sys.path.append('D:\Robot4Jasmine\jasmineTests.jar')		<< Path to jasmineTests.jar which has java code required at line 16.

4) At the path "<Path till the application>\Robot4Jasmine\server\", run the command through command prompt - 'node server.js' which will start the node server.

5) At the path "<Path till the application>\Robot4Jasmine\", run in another command prompt window - 'jybot <Path till the application>\Robot4Jasmine\' which will run all the robot tests.

Finally once all the tests are run, the result will be available in report.html in Robot4Jasmine.

------

NOTE: 
1) If one want to run a specific module, just run with specific robot file name in command prompt window..ie., for CameraMain module, its 'jybot CameraMain.robot'.
2) Source file 'EBConfig.java' is present in the path - Robot4Jasmine\jasmineTests\src\com\zebra - from which one can change and build the jar file, jasmineTests.jar if required.


xxx EOF xxx