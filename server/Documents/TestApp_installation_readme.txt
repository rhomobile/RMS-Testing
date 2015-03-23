
iOS specific:
~~~~~~~~~~~~~~~~~

Currently TestApp.ipa located on Amamzon server:
https://rhomobile-suite.s3.amazonaws.com/test_data/TestApp/TestApp.ipa

TestApp.ipa valid only until 5 March 2016 !!!
Check you connection to amazon server before test (use default browser for it) !

There are 2 reason for it :

1. from iOS 7.1 only HTTPS location can be used for intallation plist files
2. Configure our local secure server for trusted connection from device is too complicated 


~~~~~~~~~~~~~~~~~






Non-finished instruction for setup trusted connection to our local test server (just ignore it now) :

1. you should install SSL sertificate to device and make it trusted :

1.1 Run RMS-Testing server - Go to server folder and run "ruby server.rb"
1.2 Open standard browser (Safari) on iOS device and open next URL:http://YOUR_SERVER_IP:8082/LocalSSL.cer
1.3 System open UI for install certificate - just press always [Install] buttons
1.4 In the end of installation you should see - certificate is "Valid" and "Trusted"
1.5 Now device trust our local HTTPS server - you can try to install application

2.You should checking /RMS-Testing/server/Documents/TestApp.ipa for valid on your device.

2.1 Install /RMS-Testing/server/Documents/TestApp.ipa via iTunes - it should be installed and start on your device
2.2 Current TestApp.ipa valid until 5 March 2016 !
2.3 If TestApp.ipa not installed to your device via iTunes - you should rebuild it wuth updated mobileprovision etc.

