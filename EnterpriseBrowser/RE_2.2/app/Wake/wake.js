(function(){
	var pbTest = function(){
		var pbTestObj = {};
		pbTestObj.testCases = [
			{
				"VTID":"VT187-2842",
				"RegLevel":"R1",
				"Description":"Wake <br/> Display ON",
				"PreCondition":["In the 'Battery Power' setting select 'disable backlight if the device is not used for' option and set time to 1 minute.","In the 'Power settings' in the 'Advance' option select 'turn off the device if not used for' and set time to 5 minutes."], 
				"Steps":["Note : Before launching the application the above two procedures should be executed.","Don't touch the device screen for 1 minute."],
				"ExpectedOutcome":["The screen should be in the enabled state even after 1 minute."],
				"testToPerform":function(){
					 wake.wakeLock = 'Enabled';
				},
				"FinalResult":""
			},{
				"VTID":"VT187-2843",
				"RegLevel":"R1",
				"Description":"Wake <br/> Display OFF",
				"PreCondition":["In the 'Battery Power' setting select 'disable backlight if the device is not used for' option and set time to 1 minute.","In the 'Power settings' in the 'Advance' option select 'turn off the device if not used for' and set time to 5 minutes."], 
				"Steps":["Note : Before launching the application the above two procedures should be executed.","Don't touch the device screen for 1 minute."],
				"ExpectedOutcome":["The screen should be disabled."],
				"testToPerform":function(){
					 wake.wakeLock = 'Disabled';
				},
				"FinalResult":""
			},{
				"VTID":"VT187-2845",
				"RegLevel":"R1",
				"Description":"Wake <br/> WIFI ON",
				"PreCondition":["In the 'Battery Power' setting  unselect 'disable backlight if the device is not used for' option.","In the 'Power settings' in the 'Advance' option select 'turn off the device if not used for' and set time to 1 minutes."], 
				"Steps":["Note : Before launching the application the above two procedures should be executed.","Don't touch the device screen for 1 minute."],
				"ExpectedOutcome":["The device will be suspended after one minute but wifi will remain enabled.","A file will be transferred to ftp location after the device gets suspend"],
				"testToPerform":function(){
					wake.wifiLock = 'Enabled';
					
					setTimeout(function(){
					    fileTransfer.source = "url('file://\\Application\\file.txt')"; 
        				fileTransfer.destination = "url('ftp://ftpadmin:ftpadmin@/10.233.85.82/Received/file.txt')";
        				fileTransfer.transfer(); 
					}, 70000);
				},
				"FinalResult":""
			},{
				"VTID":"VT187-2846",
				"RegLevel":"R1",
				"Description":"Wake <br/> WIFI OFF",
				"PreCondition":["In the 'Battery Power' setting  unselect 'disable backlight if the device is not used for' option.","In the 'Power settings' in the 'Advance' option select 'turn off the device if not used for' and set time to 1 minutes."], 
				"Steps":["Note : Before launching the application the above two procedures should be executed.","Don't touch the device screen for 1 minute."],
				"ExpectedOutcome":["The device will be suspended after one minute and wifi will be  disabled.","A file will be not be transferred to ftp location after the device gets suspend"],
				"testToPerform":function(){
					wake.wifiLock = 'Disabled';
					
					setTimeout(function(){
						fileTransfer.source = "url('file://\\Application\\file.txt')"; 
        				fileTransfer.destination = "url('ftp://ftpadmin:ftpadmin@/10.233.85.82/Received/file.txt')";
        				fileTransfer.transfer();
					}, 70000);
				},
				"FinalResult":""
			}];
		pbTestObj.afterEach = function(){
			
		}
		return pbTestObj;
	}
	window.pbTest = pbTest();
})();