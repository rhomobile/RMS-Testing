
//	<script type="text/javascript" src="/public/re1/elements.js"></script>
//	<script type="text/javascript">
function callBackFunc(param) {
	       var sig = document.getElementById("actualResult"); 
	       sig.innerHTML = "Param: "+ param;
}

(function(){
	var pbTest = function(){
		var pbTestObj = {};
		pbTestObj.testCases = [
		{
				"VTID":"VT187-1526",
				"RegLevel":"R1",
				"Description":"AddressBar functionality Test",
				"PreCondition":[],
				"Steps":["Set visibility parameter to visible of addressbar.","Enter page url starting with www and http identifier in address bar using sip.","Press enter button.",
						"Enter page url without any identifier in addressbar like google.com"],
				"ExpectedOutcome":["User should be able to type character in addressbar using SIP","The specified url should open with and without identifier.",
									"Address bar should be populated with the history of visited URLs and should show current page url."],
				"testToPerform":function(){
					addressBar.visibility = 'visible';  

				},
				"FinalResult":""
			},{
				"VTID":"VT187-1528",
				"RegLevel":"R1",
				"Description":"AddressBar with secure https site",
				"PreCondition":[],
				"Steps":["Set visibility parameter to visible of addressbar","Enter secure site link which satrts with https identifier","Press enter button"],
				"ExpectedOutcome":["Page sholuld navigate to secure https site successfully"],
				"testToPerform":function(){
					addressBar.visibility = 'visible';  

				},
				"FinalResult":""	
			},{
				"VTID":"VT187-1581",
				"RegLevel":"R1",
				"Description":"BackButton functionality Test",
				"PreCondition":[],
				"Steps":["Set visibility param of BackButton with Content=Visible","Set visibility param of Addressbar with Content=Visible","Click on BackButton."],
				"ExpectedOutcome":["When BackButton is clicked, the BackButton shall navigate to the previously navigated page if there is not previously navigated page then this button will have no effect.","Addressbar url should be changed with each page navigated by BackButton."],
				"testToPerform":function(){
					backButton.visibility = 'visible'; 
					addressBar.visibility = 'visible';  

				},
				"FinalResult":""
		
		
			},{
				"VTID":"VT187-1593",
				"RegLevel":"R1",
				"Description":"ForwardButton functionality Test",
				"PreCondition":[],
				"Steps":["Set visibility param of ForwardButton with Content=Visible","Set visibility param of Addressbar with Content=Visible","Click on ForwardButton."],
				"ExpectedOutcome":["When ForwardButton is clicked, ForwardButton will navigate forward to the browser history, if possible","Addressbar url should be changed with each page navigated by ForwardButton."],
				"testToPerform":function(){
					forwardButton.visibility = 'visible'; 
					addressBar.visibility = 'visible';  
					
				},
				"FinalResult":""	
			},{
				"VTID":"VT187-1604",
				"RegLevel":"R1",
				"Description":"GoButton functionality Test",
				"PreCondition":[],
				"Steps":["Set visibility param of GoButton with Content=Visible ","Set visibility param of Addressbar with Content=Visible","Click on GoButton."],
				"ExpectedOutcome":["Go button shall navigate to the page mentioned in the Address Bar.","The Go button will not be visible when the browser is navigating as it is replaced by the stop button (if visible), in line with all major browsers."],
				"testToPerform":function(){
					goButton.visibility = 'visible'; 
					addressBar.visibility = 'visible';  
					
				},
				"FinalResult":""	
			},{
				"VTID":"VT187-1616",
				"RegLevel":"R1",
				"Description":"HomeButton functionality Test",
				"PreCondition":[],
				"Steps":["Set visibility param of HomeButton with Content=Visible ","Set visibility param of Addressbar with Content=Visible","Click on HomeButton"],
				"ExpectedOutcome":["When HomeButton is clicked, it will navigate to the start page as defined in the configuration file under device.","Addressbar url should be changed with page navigated by HomeButton"],
				"testToPerform":function(){
					homeButton.visibility = 'visible'; 
					addressBar.visibility = 'visible';  
				},
				"FinalResult":""	
			},{
				"VTID":"VT187-1627",
				"RegLevel":"R1",
				"Description":"MinimizeButton functionality Test",
				"PreCondition":[],
				"Steps":["Set visibility param of MinimizeButton with Content=Visible ","Click on MinimizeButton"],
				"ExpectedOutcome":["When MinimizeButton is clicked, Rhoelements Application will minimize and lose focus."],
				"testToPerform":function(){
					minimizeButton.visibility = 'visible'; 
					
					
					
				},
				"FinalResult":""	
			},{
				"VTID":"VT187-1639",
				"RegLevel":"R1",
				"Description":"QuitButton functionality Test",
				"PreCondition":[],
				"Steps":["Set visibility param of QuitButton with Content=Visible ","Click on QuitButton"],
				"ExpectedOutcome":["QuitButton will exit the application gracefully and no error should occur."],
				"testToPerform":function(){
					quitButton.visibility = 'visible'; 
						
									
				},
				"FinalResult":""	
			},{
				"VTID":"VT187-1650",
				"RegLevel":"R1",
				"Description":"ReloadButton functionality Test",
				"PreCondition":[],
				"Steps":["Set visibility param of ReloadButton with Content=Visible","Set visibility param of QuitButton with Content=Visible","Click on ReloadButton.","Click on QuitButton"],
				"ExpectedOutcome":["When ReloadButton is clicked, the current page is reloaded","Applicaion should exit gracefully upon quit."],
				"testToPerform":function(){
					reloadButton.visibility = 'visible'; 
					quitButton.visibility = 'visible'; 
					
					
				},
				"FinalResult":""
			},{
				"VTID":"VT187-1661",
				"RegLevel":"R1",
				"Description":"ReloadButton functionality Test",
				"PreCondition":[],
				"Steps":["Set visibility param of StopButton with Content=Visible","type the valid page url in address bar which takes some time to load then press enter/gobutton.","Click on stop button before the page navigation to page url."],
				"ExpectedOutcome":["When StopButton is clicked, it will cease the current navigation and navigate to the badlink page (if defined)."],
				"testToPerform":function(){
					stopButton.visibility = 'visible'; 

	
					
					
				},
				"FinalResult":""	
			},{
				
				"VTID":"VT187-1677",
				"RegLevel":"R1",
				"Description":"SIPButton functionality Test",
				"PreCondition":[],
				"Steps":["Set visibility param of SIPButton with Content=Visible","Set visibility param of Addressbar with Content=Visible","Click on SIPButton","Click on SIPButton again."],
				"ExpectedOutcome":["The SIPButton will toggle the display of the soft input panel when clicked."],
				"testToPerform":function(){
					sipButton.visibility = 'visible'; 
					addressBar.visibility = 'visible'; 
									
				},
				"FinalResult":""				
			},{
				"VTID":"VT187-1688",
				"RegLevel":"R1",
				"Description":"ZoomTextButton functionality Test",
				"PreCondition":[],
				"Steps":["Set visibility param of ZoomTextButton with Content=Visible","Set visibility param of Addressbar with Content=Visible","Click on ZoomTextButton multiple times"],
				"ExpectedOutcome":["When ZoomTextButton is clicked, the font size will change from smallest to largest."],
				"testToPerform":function(){
					zoomTextButton.visibility = 'visible'; 
					addressBar.visibility = 'visible'; 
					
					
				},
				"FinalResult":""
			},{
				"VTID":"VT187-1690",
				"RegLevel":"R1",
				"Description":"KeyState hidden",
				"PreCondition":[],
				"Steps":["Set visibility param of KeyState with Content=hidden","Press any keystate button on keyboard like Control, Function,Orange key"],
				"ExpectedOutcome":["KeyState indicator should be hidden and should not be shown on page."],
				"testToPerform":function(){
					keyState.visibility = 'hidden'; 
									
					
				},
				"FinalResult":""
			},{
				"VTID":"VT187-1693",
				"RegLevel":"R1",
				"Description":"KeyState with all valid patrams",
				"PreCondition":[],
				"Steps":["Set left param of KeyState with Content=left:50","Set top param of KeyState with Content=top:100","Set width param of KeyState with Content=width:200","Set Height param of KeyState with Content=Height:200",
						"Set visibility param of KeyState with Content=Visible","Press any keystate button on keyboard"],
				"ExpectedOutcome":["KeyState indicator should be shown on page with specified size at specified position.."],
				"testToPerform":function(){
					keyState.left = '50'; 
					keyState.top = '100'; 
					keyState.width = '200'; 
					keyState.height = '200'; 
					keyState.visibility = 'visible'; 
					
					
				},
				"FinalResult":""	
			},{
				"VTID":"VT187-1694",
				"RegLevel":"R1",
				"Description":"KeyState functionality with all keys on Qwerty Keyboard",
				"PreCondition":[],
				"Steps":["Set visibility param of KeyState with Content=Visible","Test KeyState functionality with all keys [Shift, Alt, Control, Function, Caps, Num lock and Orange key]"],
				"ExpectedOutcome":["The KeyState indicator should display icons for all keys on Qwerty Keyboard device."],
				"testToPerform":function(){
					keyState.visibility = 'visible'; 
					
					
				},
				"FinalResult":""
			},{
				"VTID":"VT187-1695",
				"RegLevel":"R1",
				"Description":"KeyState functionality with all keys on Non Qwerty Keyboard",
				"PreCondition":[],
				"Steps":["Set visibility param of KeyState with Content=Visible","Test KeyState functionality with all keys [Shift, Alt, Control, Function, Caps, Num lock and Orange key]"],
				"ExpectedOutcome":["The KeyState indicator should display icons for all keys on Non Qwerty Keyboard device."],
				"testToPerform":function(){
					keyState.visibility = 'visible';
					
				},
				"FinalResult":""	

			}];
		pbTestObj.afterEach = function(){
			
		}
		return pbTestObj;
	}
	window.pbTest = pbTest();
})();
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