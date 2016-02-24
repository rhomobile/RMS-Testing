=============
RobotforAppium
=============


Description
-----------

Using this setup, run the manual_common_spec, PocketBrowser and RE2.2 appliction written in jasmine framework. Uses node.js, Appium, xunitparser and robot framework to initiate the jasmine tests through EnterpriseBrowser(EB) in the connected device. Once the tests are run, the result purged to result.xml are read and report is generated to report.html


Prerequisite
------------

Node.js
Appium
Python
Jython
Robot Framework


Usage
-----

*** In the Device ***

1) Install the latest Enterprise Browser.

2) Copy manual_common_spec, PB and RE2.2 folder to the device's internal storage by creating a folder "auto". Hence full application path becomes '/storage/sdcard0/auto/Applications to run/'.


*** In the System ***

1) Download the RobotFramework master folder and inside the folder enter into cmd mode and type jython setup.py install

2) Install Python and set the environment variable.

3) Copy RobotforAppium folder in the system which is the setup to run the manual_common_spec, PocketBrowser and RE2.2 tests.

4) Change the Jars path in the python file according to ur folder directory. 

5) Open cmd mode from RobotforAppium and type - jybot Robotexefiles

Finally once all the tests are run, the result will be avaiable in report.html in RobotforAppium.


*** Compliance Run ***

Compliance tests ca be run by executing in cmd - jybot Robot4EBCompliance

------

NOTE: 1. If one want to run a specific module, just run with specific robot file name (stored in Robotexefiles under Robotforappium folder in command prompt window.. ie., for CameraMain module, its 'jybot appiumTests_Com_Camera.robot'.

2. If any Java file changes are done in project, then a new jar file (appiumTests.jar) has to be created following the below steps.
   go to Eclipse IDE, rt clk on project(the project has to be imported with all updates)-->export-->selct jar under java and click next-->select only src under project-->under src-->input, unselect apk and then browse path to save jar file and name appiumtests.jar and finish.    


xxx EOF xxx