
var count = 0;

(function(){
	var pbTest = function(){
		var pbTestObj = {};
		pbTestObj.testCases = [
		{
				"VTID":"VT187-1349",
				"RegLevel":"R1",
				"Description":"Device & Application <br/> Set the alarm with Repeat value to true",
				"PreCondition":[],
				"Steps":["Apply AlarmTriggered event on page.", "Set Interval parameter value to 30 seconds and keep repeat param vale to true.",
						"Call Set method to set the alarm at the specified time interval and wait for 60 seconds"],
				"ExpectedOutcome":["AlarmTriggered event should be fired two times at the interval of 30 seconds"],
				"testToPerform":function(){
					alarm.interval = "00-00-30";
					alarm.repeat = "true";
					alarm.set();
					alarm.alarmTriggered = 'doAlarm()'; 
					main.displayResult("wait for alarm trigger event..");
				},
				"FinalResult":""
			},{
				"VTID":"VT187-1352",
				"RegLevel":"R1",
				"Description":"Device & Application <br/> Clear the Alarm when set using interval param",
				"PreCondition":[],
				"Steps":["Apply AlarmTriggered event on page.", "Set Interval parameter value to 30 seconds and keep repeat param vale to true.",
						"Call Set method to set the alarm at the specified time interval and wait for first 30 seconds", "Call clear method to reset the alarm.", " Wait for next 30 seconds"],
				"ExpectedOutcome":["AlarmTriggered event should not be fired for second time as alarm has been cleared"],
				"testToPerform":function(){
					alarm.set();
					alarm.interval = "00-00-30";
					alarm.repeat = "true";
					alarm.alarmTriggered = 'doAlarm()';
					main.displayResult("wait for alarm trigger event..");
					setTimeout(function(){
								alarm.clear();
								alert("Alarm Cleared");
							},35000);
				},
				"FinalResult":""
			},{
				"VTID":"VT187-1355",
				"RegLevel":"R1",
				"Description":"Device & Application <br/> Set the alarm when offset time param is 00-00-00",
				"PreCondition":[],
				"Steps":["Apply AlarmTriggered event on page.", "Set time parameter in YYYY-MM-DDtHH-MM-SStzd format with offset 00-00-00","Call Set method to set the alarm and wait for specified time"],
				"ExpectedOutcome":["AlarmTriggered event should be fired at specified time"],
				"testToPerform":function(){
					alarm.time = '2014-09-24t05-05-05';
					alarm.set();
					alarm.alarmTriggered = 'doAlarm()';
					main.displayResult("wait for alarm trigger event..");
				},
				"FinalResult":""	
			},{
				"VTID":"VT187-1368",
				"RegLevel":"R1",
				"Description":"Device & Application <br/> Application with Quit",
				"PreCondition":[],
				"Steps":["Call Quit method using application module."],
				"ExpectedOutcome":["Rhoelements should quit without any error"],
				"testToPerform":function(){
					application.quit();
					
				},
				"FinalResult":""	
			},{
				"VTID":"VT187-1369",
				"RegLevel":"R1",
				"Description":"Device & Application <br/> Minimize with ApplicationEvent",
				"PreCondition":[],
				"Steps":["Attach ApplicationEvent on page", "Call Minimize method using application meta tag"],
				"ExpectedOutcome":["Rhoelements apps should be minimized", "ApplicationEvent should get fire and applicationState value is being returned by event."],
				"testToPerform":function(){
					application.minimize();
					
				},
				"FinalResult":""	
			},{
				"VTID":"VT187-1370",
				"RegLevel":"R1",
				"Description":"Device & Application <br/> Restore with ApplicationEvent",
				"PreCondition":[],
				"Steps":["Attach ApplicationEvent on page", "Call Minimize then Restore method."],
				"ExpectedOutcome":["Rhoelements apps should be minimized and restored","ApplicationEvent should get fire and applicationState value is being returned by event."],
				"testToPerform":function(){
					application.minimize();
					application.restore();
					application.setEMML("applicationEvent:url('JavaScript:doEvent');"); 
					//<script>
					//function doEvent(currentState)
   					 //{
        				//alert('RhoElements has been ' + currentState);
    				 //}
					//</script>
				},
				"FinalResult":""	
			},{
				"VTID":"VT187-1382",
				"RegLevel":"R1",
				"Description":"Device & Application <br/> Version Event(java script)",
				"PreCondition":[],
				"Steps":["Attach Version Event of javascript type", "Call GetVersion method."],
				"ExpectedOutcome":["Version event should get fired up upon calling GetVersion method."," Event should return all product version,hotfixes and componentversions info correctly."],
				"testToPerform":function(){
					application.getVersion();
					
					
				},
				"FinalResult":""	
			},{
				"VTID":"VT187-1394",
				"RegLevel":"R1",
				"Description":"Device & Application <br/> Backlight-Turn off the screen backlight",
				"PreCondition":[],
				"Steps":["Call off method using backlight META Tag.","Call on method using backlight META Tag"],
				"ExpectedOutcome":["screen backlight.should turn off", "screen backlight should turn on."],
				"testToPerform":function(){
					backlight.off();
					setTimeout(function(){
								backlight.on();
								alert("Backlight ON");
							},10000);
						
									
				},
				"FinalResult":""	
			},{
				"VTID":"VT187-1395",
				"RegLevel":"R1",
				"Description":"Device & Application <br/> Backlight-set the intensity of screen backlight with valid range",
				"PreCondition":[],
				"Steps":["Sets the screen backlgitht intensity to the all possible valid values.",],
				"ExpectedOutcome":["backlgitht intensity should be set to the all possible valid values and intensity change should be visualised on device."],
				"testToPerform":function(){
					backlight.intensity = '2'
					
					
				},
				"FinalResult":""
			},{
				"VTID":"VT187-1413",
				"RegLevel":"R1",
				"Description":"Device & Application <br/> Device tag with Suspend",
				"PreCondition":[],
				"Steps":["Call Suspend method using device moule.","Observe the device screen."],
				"ExpectedOutcome":["The Device should get suspended"],
				"testToPerform":function(){
					device.suspend(); 
										
				},
				"FinalResult":""	
			},{
				"VTID":"VT187-1414",
				"RegLevel":"R1",
				"Description":"Device & Application <br/> Device tag with Calibrate",
				"PreCondition":[],
				"Steps":["Call Calibrate method using device moule.","Observe the device screen."],
				"ExpectedOutcome":["The Device should open the caliberation screen"],
				"testToPerform":function(){
					device.calibrate(); 
									
				},
				"FinalResult":""				
			},{
				"VTID":"VT187-2801",
				"RegLevel":"R1",
				"Description":"Device & Application <br/> Wake the device from suspend mode",
				"PreCondition":[],
				"Steps":["Call the suspend mode method","Call the wake method after 30 second of suspend"],
				"ExpectedOutcome":["The device should be suspended and it should wake up after 30 seconds"],
				"testToPerform":function(){
					device.suspend(); 
					setTimeout(function(){
								device.wake();	
								alert("Device wakeup")				
							},30000);
					
				},
				"FinalResult":""
			},{
				"VTID":"VT187-1424",
				"RegLevel":"R1",
				"Description":"Device & Application <br/> History:Back Navigation",
				"PreCondition":[],
				"Steps":["Launch Rhoelements on device and navigate to some page.","Use History:Back on this page."],
				"ExpectedOutcome":["it should navigate to the previously visited page once History:Back is called"],
				"testToPerform":function(){
					
					
					
				},
				"FinalResult":""
			},{
				"VTID":"VT187-1431",
				"RegLevel":"R1",
				"Description":"Device & Application <br/> Hourglass hidden",
				"PreCondition":[],
				"Steps":["Set visibility parameter to visible of Hourglass module.","Set visibility parameter to hidden of Hourglass module."],
				"ExpectedOutcome":["Hourglass should be hidden when set to hidden"],
				"testToPerform":function(){
					hourglass.visibility = 'visible'; 
					setTimeout(function(){
								hourglass.visibility = 'hidden';	
								alert("Hourglass Hidden")				
							},10000);
					
					
				},
				"FinalResult":""	
			},{
				"VTID":"VT187-1442",
				"RegLevel":"R1",
				"Description":"Device & Application <br/> Keylight with On",
				"PreCondition":[],
				"Steps":["Call the on method of Keylight module","Navigate to other pages and check the keylight status"],
				"ExpectedOutcome":["The Keylight should be switched On","The keylight should be remain On across the pages"],
				"testToPerform":function(){
					keylight.on(); 
					
					
				},
				"FinalResult":""
			},{
				"VTID":"VT187-1444",
				"RegLevel":"R1",
				"Description":"Device & Application <br/> Keylight with Intensity to 2",
				"PreCondition":[],
				"Steps":["Call the on method of Keylight module","Set Keylight intensity value to 2.","Check the device keylight."],
				"ExpectedOutcome":["The Keylight intensity should change and should be set to 2."],
				"testToPerform":function(){
					keylight.on(); 
					keylight.intensity = '2'; 
					
				},
				"FinalResult":""	
			},{
				"VTID":"VT187-1454",
				"RegLevel":"R1",
				"Description":"Device & Application <br/> EnumNotificationsEvent",
				"PreCondition":[],
				"Steps":["Attach enumNotificationsEvent.","Call enumerate method"],
				"ExpectedOutcome":["Enumerate method should triggers the EnumNotificationsEvent","Event should return the notification objects information available on the device."],
				"testToPerform":function(){
					notification.enumerate();  
					
				},
				"FinalResult":""
			},{
				"VTID":"VT187-1458",
				"RegLevel":"R1",
				"Description":"Device & Application <br/> LED StateOn Notification",
				"PreCondition":[],
				"Steps":["Enumerate the notification object available on device.","Set LED state to ON."],
				"ExpectedOutcome":["LED should glow forever when the state of LED is set On"],
				"testToPerform":function(){
					notification.enumerate();  
					stateOn = '10000'
					setVibrateDuration ='5000'
					setBeeperFrequency = '2000'
					setBeeperVolume = '5'
					setBeeperDuration = '3000'
					notification.setLEDOnDuration = '3000'; 
					notification.setLEDOffDuration = '3000'; 
					
				},
				"FinalResult":""			
			},{
				"VTID":"VT187-1466",
				"RegLevel":"R1",
				"Description":"Device & Application <br/> Beeper StateOn with valid beeper params",
				"PreCondition":[],
				"Steps":["Enumerate the notification object available on device.","Set SetBeeperVolume to 4.","Set setBeeperFrequency value to 3000 hz.",
						"Set setBeeperDuration value to 5000 ms.","Set the beeper state to ON."],
				"ExpectedOutcome":["Device should beep with maximum volume of 4 and frequency of 3000 hz forever when the state of the Index value is set to On"],
				"testToPerform":function(){
					notification.enumerate();  
					stateOn = '10000'
					setBeeperFrequency = '3000'
					setBeeperVolume = '4'
					setBeeperDuration = '3000'
					notification.setLEDOnDuration = '3000'; 
					notification.setLEDOffDuration = '3000'; 
					
				},
				"FinalResult":""	
			},{
				"VTID":"VT187-1471",
				"RegLevel":"R1",
				"Description":"Device & Application <br/> Vibrator StateOn",
				"PreCondition":[],
				"Steps":["Enumerate the notification object available on device.","Set the vibrator state to ON."],
				"ExpectedOutcome":["Device vibrator should play forever when the state of the vibrator is set to O"],
				"testToPerform":function(){
					notification.enumerate();  
					stateOn = '10000'
					setVibrateDuration = '4000'
					notification.setLEDOnDuration = '3000'; 
					notification.setLEDOffDuration = '3000'; 
					
				},
				"FinalResult":""
			},{
				"VTID":"VT187-1483",
				"RegLevel":"R1",
				"Description":"Device & Application <br/> PowerOn Event URL Offline page",
				"PreCondition":[],
				"Steps":["Attach a PowerOn event with file url.","PowerOnEvent:url('file://\Application\XXX.html')","Suspend the device","Resume the device"],
				"ExpectedOutcome":["On suspend/ resume, RE apps should navigate to specified offline local page"],
				"testToPerform":function(){
					powerOn.setEMML("powerOnEvent:url('JavaScript:doFunction(%json)')"); 
					
				},
				"FinalResult":""		
			},{
				"VTID":"VT187-1492",
				"RegLevel":"R1",
				"Description":"Device & Application <br/> Reboot with Warmboot",
				"PreCondition":[],
				"Steps":["Set the BootType to Warm using reboot module"],
				"ExpectedOutcome":["The Device should get warm booted"],
				"testToPerform":function(){
					reboot.bootType = 'warm'; 
					
				},
				"FinalResult":""
			},{
				"VTID":"VT187-1493",
				"RegLevel":"R1",
				"Description":"Device & Application <br/> Reboot with Coldboot",
				"PreCondition":[],
				"Steps":["Set the BootType to cold using reboot module"],
				"ExpectedOutcome":["The Device should get cold booted"],
				"testToPerform":function(){
					reboot.bootType = 'cold'; 
					
				},
				"FinalResult":""
			},{
				"VTID":"VT187-1494",
				"RegLevel":"R1",
				"Description":"Device & Application <br/> Reboot with ColdCAD",
				"PreCondition":[],
				"Steps":["Set the BootType to ColdCAD using reboot module","Note:For CE6 devices a 'ColdCAD' boot is required to replicate the Coldboot key sequence, e.g. 1+9+Power on an MC3000."],
				"ExpectedOutcome":["The Device should get cold booted"],
				"testToPerform":function(){
					reboot.bootType = 'coldCAD'; 
					
				},
				"FinalResult":""
			},{
				"VTID":"VT187-2261",
				"RegLevel":"R1",
				"Description":"Device & Application <br/> Set autoRotate is enabled",
				"PreCondition":[],
				"Steps":["Attach screenOrientationEvent on page.","Set autoRotate value to enabled","Rotate the device now either using method or manually"],
				"ExpectedOutcome":["Screen should be rotated.","ScreenOrientationEvent should fire with each rotation and should return the correct orientation with below values normal,rightHanded,leftHanded"],
				"testToPerform":function(){
					screenOrientation.autoRotate = 'Enabled'; 
					
				},
				"FinalResult":""
			},{
				"VTID":"VT187-2262",
				"RegLevel":"R1",
				"Description":"Device & Application <br/> Set autoRotate is disabled",
				"PreCondition":[],
				"Steps":["Attach screenOrientationEvent on page","Set autoRotate value to disabled","rotate the device manually","Call rightHanded method.","rotate the device manually."],
				"ExpectedOutcome":["Screen should not be rotated at step 3","Screen should be rotated at step 4 and event should fire.","Screen should not be rotated at step 5."],
				"testToPerform":function(){
					screenOrientation.autoRotate = 'Disabled'; 
					setTimeout(function(){
								ScreenOrientation.rightHanded();	
								alert("RightHanded called")				
							},10000);
					
				},
				"FinalResult":""			
			},{
				"VTID":"VT187-2275",
				"RegLevel":"R1",
				"Description":"Device & Application <br/> SIP with Manual",
				"PreCondition":[],
				"Steps":["Make Visible the SIP Button on page","Call manual meyhod of sip module","Put the focus inside the text box","Now tap outside the textbox and move the focus to page",
						"Click on the SIP button","Again click on the SIP Button"],
				"ExpectedOutcome":["SIP should not appear when focus is put inside a textbox","SIP should not appear when focus is moved out of text box.","SIP should appear and disappear only when SIP button is clicked"],
				"testToPerform":function(){
					sipButton.visibility = 'visible';
					sip.manual();
								
				},
				"FinalResult":""	
			},{
				"VTID":"VT187-2276",
				"RegLevel":"R1",
				"Description":"Device & Application <br/> SIP with Automatic",
				"PreCondition":[],
				"Steps":["Make Visible the SIP Button on page","Call automatic. method of sip module.","Put the focus inside the text box","Now tap outside the textbox and move the focus to page."],
				"ExpectedOutcome":["SIP should appear when focus is put inside a textbox","SIP should disappear when focus is moved out of text box."],
				"testToPerform":function(){
					sipButton.visibility = 'visible';
					sip.automatic();
								
				},
				"FinalResult":""	
			},{
				"VTID":"VT187-2288",
				"RegLevel":"R1",
				"Description":"Device & Application <br/> synchronize device clock with valid sntp server address",
				"PreCondition":[],
				"Steps":["Set the different time in the device clock before executing this test case","Set the ServerIP parameter to valid server address using SNTP meta tag",
						"Minimize rhoElements and Check the device clock time"],
				"ExpectedOutcome":["The device clock time should get synchronized with the SNTP server i.e.device clock will have the same time of SNTP server."],
				"testToPerform":function(){
					systemTime.setLocal = '2011-12-25T20-30-00'
					systemTime.SntpServerIP = '10.233.85.82'
								
				},
				"FinalResult":""														
			},{
				"VTID":"VT187-2299",
				"RegLevel":"R1",
				"Description":"Device & Application <br/> Stylus with Disable",
				"PreCondition":[],
				"Steps":["Call disable() method of stylus module.","Check the page interaction with device screen."],
				"ExpectedOutcome":["Page interaction with device screen should be disabled."],
				"testToPerform":function(){
					stylus.disable(); 
					setTimeout(function(){
								stylus.enable();	
								alert("Stylus Enabled")				
							},10000);
					
				},
				"FinalResult":""
			},{
				"VTID":"VT187-2321",
				"RegLevel":"R1",
				"Description":"Device & Application <br/> Timer with start method when interval is set.",
				"PreCondition":[],
				"Steps":["Attach the timeout event","Set the interval value to 5000 ms.","Call the start method","Wait for some seconds."],
				"ExpectedOutcome":["timeout event should fire after 5 second when timer get expire","Event should return the current time of the deivce clock in DD/MM/YY HH:MM:SS Format."],
				"testToPerform":function(){
					timer.timeout="mytimeoutjs('%s');";
					timer.interval = '5000'; 
					timer.start(); 
				},
				"FinalResult":""	
			},{
				"VTID":"VT187-2323",
				"RegLevel":"R1",
				"Description":"Device & Application <br/> Timer with stop method",
				"PreCondition":[],
				"Steps":["Attach the timeout event of timer module","Set the interval value to 60000 ms ( 1 minute)","Call the start method.","Call the stop method after some seconds."],
				"ExpectedOutcome":["Timeout event should not fire as stop method has been called."],
				"testToPerform":function(){
					timer.timeout="mytimeoutjs('%s');";
					timer.interval = '60000'; 
					timer.start(); 
					setTimeout(function(){
								timer.stop();	
								alert("Timer Stopped")				
							},70000);
					
				},
				"FinalResult":""	
			},{
				"VTID":"VT187-2338",
				"RegLevel":"R1",
				"Description":"Device & Application <br/> Volume with zero",
				"PreCondition":[],
				"Steps":["Keep the SetVolume parameter value to 0x0000.","Play the Wav file using playWave method.."],
				"ExpectedOutcome":["Device volume should be set to 0 i.e. silence mode and wav file should not be audible"],
				"testToPerform":function(){
					volume.setVolume = '0x0000'; 
					generic.PlayWave('\\Application\audio.wav', 1);
				
				},
				"FinalResult":""		
			},{
				"VTID":"VT187-2339",
				"RegLevel":"R1",
				"Description":"Device & Application <br/> Volume with Maximum",
				"PreCondition":[],
				"Steps":["Keep the SetVolume parameter value to 0xFFFF.","Play the Wav file using playWave method.."],
				"ExpectedOutcome":["Device volume should be set to Maximum and wav file should be audible"],
				"testToPerform":function(){
					volume.setVolume = '0xFFFF'; 
					generic.PlayWave('\\Application\audio.wav', 1);
				
				},
				"FinalResult":""		
			},{
				"VTID":"VT187-2348",
				"RegLevel":"R1",
				"Description":"Device & Application <br/> Zoom- text parameter to 0.",
				"PreCondition":[],
				"Steps":["Set the text parameter value of zoom module to 0.","Check the page with font size and image element"],
				"ExpectedOutcome":["The text font of the page will be smallest but it should not affect the image size."],
				"testToPerform":function(){
					zoom.text = '0'; 
				
				},
				"FinalResult":""	
			},{
				"VTID":"VT187-2354",
				"RegLevel":"R1",
				"Description":"Device & Application <br/> Zoom- page parameter value greater than 1",
				"PreCondition":[],
				"Steps":["Set the page parameter value greater than 1.","Check the page with font size and image element."],
				"ExpectedOutcome":["Page will be zoomed in.","All the content of page including image will be enlarged.."],
				"testToPerform":function(){
					zoom.page = '2'; 
				
				},
				"FinalResult":""
			},{
				"VTID":"VT187-1500",
				"RegLevel":"R1",
				"Description":"Device & Application <br/> Zoom- page parameter value less than 1",
				"PreCondition":[],
				"Steps":["Set the page parameter value greater than 1.","Check the page with font size and image element."],
				"ExpectedOutcome":["Page will be zoomed out","All the content of page including image will be smaller"],
				"testToPerform":function(){
					zoom.page = '0.5'; 
				
				},
				"FinalResult":""			
			}];
		pbTestObj.afterEach = function(){
			
		}
		return pbTestObj;
	}
	window.pbTest = pbTest();
})();

var doAlarm = function(){
        count++;
       	var sig = document.getElementById("actualResult"); 
	    sig.innerHTML = "Alarm Triggered";
        sig.innerHTML += "<br/> Count = "+count;
}
function mytimeoutjs(time)
{
var sig = document.getElementById("actualResult"); 
sig.innerHTML="Current time is using javascript is:"+time;
}
//
//	<script type="text/javascript">
//		var count = 0;
//		function doAlarm(){
//			var resultDiv = document.getElementById("actualResult");
//			count++;
//        	resultDiv.innerHTML = 'Alarm Triggered';
 //       	resultDiv.innerHTML += "\nCount = "+count;
//		}
//	</script>
//<!--<script type="text/javascript" src="js/myMain.js"></script>-->
//	<script type="text/javascript">
//		main.init();
//	</script>