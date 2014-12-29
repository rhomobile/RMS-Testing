
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
				"VTID":"VT187-2817",
				"RegLevel":"R1",
				"Description":"System Time <br/> set Local Time String",
				"PreCondition":[],
				"Steps":["setLocal to 2011-12-25T09-57-00","check the local time has set on device or not"],
				"ExpectedOutcome":["Should set the device time to 9:57am on 25th December 2011 without changing the timezone"],
				"testToPerform":function(){
					systemTime.setLocal = "2014-09-22T04-15-00";

				},
				"FinalResult":""
			},{
				"VTID":"VT187-2829",
				"RegLevel":"R1",
				"Description":"System Time <br/> set Local Time String with UTC offset as 12:00",
				"PreCondition":[],
				"Steps":["setLocal to 2012-11-24T08-58-09+12-00","check the local time has set on device or not"],
				"ExpectedOutcome":["Should set the device time to 9:58am on 24th Nov 2012 and UTC time 12 hr ahead of local time"],
				"testToPerform":function(){
					systemTime.setLocal = "2014-09-22T04-15-00+12-00";
					
				},
				"FinalResult":""
			},{
				"VTID":"VT187-2834",
				"RegLevel":"R1",
				"Description":"System Time <br/> set UTC Time String",
				"PreCondition":[],
				"Steps":["setLocal to 2011-12-25T09-57-00","check the local time has set on device or not"],
				"ExpectedOutcome":["Should set the UTC time to 9:57am on 25th December 2011 without changing the timezone"],
				"testToPerform":function(){
					systemTime.setUTC = "2014-09-22T05-15-00";
					
				},
				"FinalResult":""
			},{
				"VTID":"VT187-2837",
				"RegLevel":"R1",
				"Description":"System Time <br/> set UTC Time String with UTC offset as 12:00",
				"PreCondition":[],
				"Steps":["setLocal to 2012-11-24T08-58-09+012-00","check the local time has set on device or not"],
				"ExpectedOutcome":["Should set the UTC time to 9:58am on 24th Nov 2012 and device local time 12 hr ahead of UTC time so it should be 10:58pm"],
				"testToPerform":function(){
					systemTime.setUTC = "2014-09-22T05-15-00+12-00";
					
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