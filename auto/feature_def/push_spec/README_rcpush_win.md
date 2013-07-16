RhoConnect Push Integration Test for Windows Mobile
===========

## Pre-requisites

In order to run RC Push Integration Tests for Windows Mobile platform you will need the following components:

- PC Machine (can be VMWare host) with installed Windows 7 OS + all services packs and latest patches
- Mac Machine with OSX 10.7
- Windows Mobile Motorola device (ES400, ...)

### Prepare Mac machine

1. Install latest RhoConnect
2. Install latest RhoConnect push server
3. Generate sample app by running `rhoconnect app testapp` command.
4. Follow [these instructions to prepare your RhoConnect app](http://edgedocs.rhomobile.com/rhoconnect/push-client-setup-rps)
5. Start Redis, RhoConnect app, and RhoConnect Push Server 

### Prepare Windows Mobile Motorola device

1. Install `RDBServer.exe` program on to device by copying the .exe file into device's /Application/StartUp folder (this will ensure that the program will start automatically upon re-boot)
2. Re-boot the device. Verify that the program is running by checking the Task Manager -> View -> All Processes.
3. Connect the device into Local Network. 
4. Make sure that the device is NOT connected to your Windows machine via USB.


### Prepare Windows machine

1. Install Microsoft Visual Studio 2008 + all service packs and latest patches
2. Install all required SDK and tools following [these instructions](http://edgedocs.rhomobile.com/guide/nativesdksetup#setup-for-windows-mobile)
3. Install and setup GitHub.
4. Install Ruby and Ruby DevKit from [here](http://rubyinstaller.org/). Make sure that your installation directory doesn't have spaces.
5. Clone the `rhodes` repo into `C:/Test/rhodes`
6. Setup Rhodes by running `rhodes-setup.bat` command from the `C:/Test/rhodes/bin` folder to point to correct locations of VCBuild, and CabWiz. See [here](http://edgedocs.rhomobile.com/guide/build_wm#setup)
7. Clone the `Motorola-Extensions` repo into `C:/Test/Motorola-Extensions`
8. Clone the `RMS-Testing` repo into `C:/Test/RMS-Testing`
9. Copy the `RDBClient.exe` file into `C:/Test/Motorola-Extensions/build/ci/windows/RDBClient/Release` directory
10. Modify `C:\Test\RMS-Testing\auto\feature_def\push_spec\config.yml` with the following settings:

	```ruby
	rhodes: "../../../../rhodes"
	rhoconnect: "../../../../rhoconnect"
	rhoelements: "../../../../Motorola-Extensions"
	testsuite_root: "../../../../RMS-Testing"

	rc_stack_address: <ip_address_of your_mac_machine>
	rc_stack_port: 9292

	rc_push_server_address: <ip_address_of_your_mac_machine>
	rc_push_server_port: 8675

	device_address: <ip_address_of_the_windows_mobile_device>
	```

11. Verify that the Windows Firewall is turned off and you can ping your Mac machine and Windows Mobile device from the PC.
12. Install the following gems by running `gem install <gemname>` command:

- mspec
- bundler
- uglifier
- any other gems that are required to build and run rhodes

### Running the specs

Once all pre-requisites are met, you can navigate into `C:/RMS-Testing/auto/feature_def/push_spec` directory and run the following command:

% mspec win_push_spec.rb


This command should perform the following steps:

* Build the Windows Mobile Test Application
* Re-boot the Windows Mobile device
* Install `NETCFv35.Messages.EN.wm.cab` package onto device
* Install `rhoconnect-push-service.cab` service onto device
* Install the Test Application onto device
* Start the test application
* Run the RC Push Integration Test



