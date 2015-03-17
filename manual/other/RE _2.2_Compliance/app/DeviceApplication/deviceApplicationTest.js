(function(){
	var pbTest = function(){
		var pbTestObj = {};
		pbTestObj.testCases = [
		{
				"VTID":"VT366-0097",
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
				"VTID":"VT366-0098",
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
				"VTID":"VT366-0099",
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
				"VTID":"VT366-0118",
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
				"VTID":"VT366-0100",
				"RegLevel":"R1",
				"Description":"Device & Application <br/> Wake the device from suspend mode",
				"PreCondition":[],
				"Steps":["Call the suspend mode method","Call the wake method after 5 second of suspend"],
				"ExpectedOutcome":["WM: The device should be suspended and once you wake the device manually an alert shows after 5 secs", "Android: The device should go to idle mode and device should wakeup after 5 secs."],
				"testToPerform":function(){
					device.suspend();
					setTimeout(function(){
						device.wake();	
						alert("Device wakeup")				
					},5000);
				},
				"FinalResult":""
			},{
				"VTID":"VT366-1442",
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
				"VTID":"VT366-0101",
				"RegLevel":"R1",
				"Description":"Keylight with Off",
				"PreCondition":[],
				"Steps":["1. Call the Keylight off  method.","2. Set Keylight intensity value to 4.","3. Check the device keylight."],
				"ExpectedOutcome":["Keylight intensity value of 4  should not take effect as Keylight is witched Off ."],
				"testToPerform":function(){
					keylight.off(); 
					keylight.intensity = '4'; 
					
				},
				"FinalResult":""	
			},{
				"VTID":"VT366-0102",
				"RegLevel":"R1",
				"Description":"Device & Application <br/> LED StateOn Notification",
				"PreCondition":[],
				"Steps":["Enumerate the notification object available on device.","Set LED state to ON for 3 secs and go OFF."],
				"ExpectedOutcome":["LED should glow when you run the test case and should get off after 3 secs."],
				"testToPerform":function(){
					notification.enumNotificationsEvent = 'doFunction(%json)';
					notification.enumerate();
					setTimeout(function(){
						if(notificationEnumLength!=0 && notificationEnumObj != null){
							for(var i=0; i<notificationEnumLength;i++){
								if(notificationEnumObj[i].notificationType == 0){
									notification.stateOn = i;
								}
							}
						}
						notification.setLEDOnDuration = '2000'; 
						notification.setLEDOffDuration = '1000'; 
						setTimeout(function(){
							if(notificationEnumLength!=0 && notificationEnumObj != null){
								for(var i=0; i<notificationEnumLength;i++){
									if(notificationEnumObj[i].notificationType == 0){
										notification.stateOff = i;
									}
								}
							}
						},3000);
					}, 3000);
				},
				"FinalResult":""			
			},{
				"VTID":"VT366-0103",
				"RegLevel":"R1",
				"Description":"Device & Application <br/> Beeper StateOn with valid beeper params",
				"PreCondition":[],
				"Steps":["Enumerate the notification object available on device.","Set SetBeeperVolume to 4.","Set setBeeperFrequency value to 3000 hz.",
						"Set setBeeperDuration value to 3000 ms.","Set the beeper state to ON.", "After 3secs the beeper state changed to OFF."],
				"ExpectedOutcome":["Device should beep with maximum volume of 4 and frequency of 3000 hz forever when the state of the Index value is set to On"],
				"testToPerform":function(){
					notification.enumNotificationsEvent = 'doFunction(%json)';
					notification.enumerate();
					setTimeout(function(){
						if(notificationEnumLength!=0 && notificationEnumObj != null){
							for(var i=0; i<notificationEnumLength;i++){
								if(notificationEnumObj[i].notificationType == 1){
									notification.stateOn = i;
								}
							}
						}
						notification.setBeeperFrequency = '3000';
						notification.setBeeperVolume = '4';
						setBeeperDuration = '3000';
						setTimeout(function(){
							if(notificationEnumLength!=0 && notificationEnumObj != null){
								for(var i=0; i<notificationEnumLength;i++){
									if(notificationEnumObj[i].notificationType == 1){
										notification.stateOff = i;
									}
								}
							}
						},3000);
					}, 3000);
				},
				"FinalResult":""	
			},{
				"VTID":"VT366-0104",
				"RegLevel":"R1",
				"Description":"Device & Application <br/> Vibrator StateOn",
				"PreCondition":[],
				"Steps":["Enumerate the notification object available on device.","Set the vibrator state to ON.", "After 3secs vibrate state changed to OFF."],
				"ExpectedOutcome":["Device vibrator should play for 3secs and then gets stopped."],
				"testToPerform":function(){
					notification.enumNotificationsEvent = 'doFunction(%json)';
					notification.enumerate();
					setTimeout(function(){
						if(notificationEnumLength!=0 && notificationEnumObj != null){
							for(var i=0; i<notificationEnumLength;i++){
								if(notificationEnumObj[i].notificationType == 2){
									notification.stateOn = i;
								}
							}
						}
						setVibrateDuration = '4000';
						setTimeout(function(){
							if(notificationEnumLength!=0 && notificationEnumObj != null){
								for(var i=0; i<notificationEnumLength;i++){
									if(notificationEnumObj[i].notificationType == 2){
										notification.stateOff = i;
									}
								}
							}
						},3000);
					}, 3000);
				},
				"FinalResult":""
			},{
				"VTID":"VT366-0105",
				"RegLevel":"R1",
				"Description":"Device & Application <br/> PowerOn Event URL Offline page",
				"PreCondition":[],
				"Steps":["Attach a PowerOn event with file url.","PowerOnEvent:url('file://\\Application\\offline.html')","Suspend the device","Resume the device"],
				"ExpectedOutcome":["On suspend/ resume, RE apps should navigate to specified offline local page. NOTE: Make sure 'offline.html' is kept in root folder \\offline.html"],
				"testToPerform":function(){
					powerOn.powerOnEvent = "url('javascript:alert('Powered Up');')"; 
				},
				"FinalResult":""		
			},{
				"VTID":"VT366-0106",
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
				"VTID":"VT366-0107",
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
				"VTID":"VT366-0108",
				"RegLevel":"R1",
				"Description":"Device & Application <br/> SIP with Automatic",
				"PreCondition":[],
				"Steps":["Make Visible the SIP Button on page","Call automatic. method of sip module.","Put the focus inside the text box","Now tap outside the textbox and move the focus to page."],
				"ExpectedOutcome":["SIP should appear when focus is put inside a textbox","SIP should disappear when focus is moved out of text box."],
				"testToPerform":function(){
					sipButton.visibility = 'visible';
					sip.automatic();
					main.displayResult("<input type='textbox' />");
				},
				"FinalResult":""	
			},{
				"VTID":"VT366-0109",
				"RegLevel":"R1",
				"Description":"Device & Application <br/> Volume with zero",
				"PreCondition":[],
				"Steps":["Keep the SetVolume parameter value to 0x0000.","Play the Wav file using playWave method..","Place alarm5.wav in application folder of the device"],
				"ExpectedOutcome":["Device volume should be set to 0 i.e. silence mode and wav file should not be audible"],
				"testToPerform":function(){
					volume.setVolume = '0x0000'; 
					setTimeout(function(){generic.PlayWave('\\Application\\alarm5.wav', 1);},2000);
				
				},
				"FinalResult":""		
			},{
				"VTID":"VT366-0110",
				"RegLevel":"R1",
				"Description":"Device & Application <br/> Zoom- page parameter value greater than 1",
				"PreCondition":[],
				"Steps":["Set the page parameter value greater than 1.","Check the page with font size and image element."],
				"ExpectedOutcome":["Page will be zoomed in.","All the content of page including image will be enlarged.."],
				"testToPerform":function(){
					zoom.page = '2'; 
				
				},
				"FinalResult":""
			}];
		pbTestObj.afterEach = function(){
			count = 0;
		}
		return pbTestObj;
	}
	window.pbTest = pbTest();
})();