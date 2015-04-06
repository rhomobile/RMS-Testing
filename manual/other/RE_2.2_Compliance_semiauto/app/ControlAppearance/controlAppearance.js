
//	<script type="text/javascript" src="http://10.233.85.82/src/elements.js"></script>
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
				"VTID":"VT366-0111",
				"RegLevel":"R1",
				"Description":"AddressBar with secure https site",
				"PreCondition":[],
				"Steps":["Set visibility parameter to visible of addressbar","Connect to open network WIFI(M-guest)","Enter any secure site link which starts with https identifier","Press enter button"],
				"ExpectedOutcome":["Page sholuld navigate to secure https site successfully"],
				"testToPerform":function(){
					addressBar.top = '100';
					addressBar.visibility = 'visible';  

				},
				"FinalResult":""	
			},{
				"VTID":"VT366-0112",
				"RegLevel":"R1",
				"Description":"KeyState functionality with all keys on Qwerty Keyboard",
				"PreCondition":[],
				"Steps":["Set visibility param of KeyState with Content=Visible","Test KeyState functionality with all keys [Shift, Alt, Control, Function, Caps, Num lock and Orange key]"],
				"ExpectedOutcome":["The KeyState indicator should display icons for all keys on Qwerty Keyboard device."],
				"testToPerform":function(){
					keyState.left = '50'; 
					keyState.top = '100'; 
					keyState.width = '200'; 
					keyState.height = '200'; 
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