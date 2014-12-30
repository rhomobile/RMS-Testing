
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
				"VTID":"VT187-0587",
				"RegLevel":"R1",
				"Description":"Registry <br/> HKLM with Persistent",
				"PreCondition":[],
				"Steps":["Set the following params of registry module","hive param value to HKLM","key param value to Software","setting param value to Rhoelements","type param value to DWORD",
						 "persistent param value to True","registry param value to 12345"],
				"ExpectedOutcome":["A DWORD registry Rhoelements should be created in HKLM/Software with value 12345"],
				"testToPerform":function(){
					registry.hive = 'HKLM';
					registry.key = 'Software';
					registry.setting = 'Rhoelements';
					registry.type = 'DWORD';
					registry.persistent = 'True';
					registry.value = '12345';


				},
				"FinalResult":""
			},{
				"VTID":"VT187-0588",
				"RegLevel":"R1",
				"Description":"Registry <br/> Delete HKLM Value without Persistent",
				"PreCondition":[],
				"Steps":["Set the following params of registry module","hive param value to HKLM","key param value to Software","setting param value to Rhoelements","persistent param value to False",
						"Call delete method of registry module."],
				"ExpectedOutcome":["It should delete the registry setting called Rhoelements in HKLM/Software","the existing .reg file should not be deleted from the \Application folder on the device"],
				"testToPerform":function(){
					registry.hive = 'HKLM';
					registry.key = 'Software';
					registry.setting = 'Rhoelements';
					registry.persistent = 'False';
					registry.delete();
				},
				"FinalResult":""
			},{
				"VTID":"VT187-0589",
				"RegLevel":"R1",
				"Description":"Registry <br/> Delete HKLM Value with Persistent",
				"PreCondition":[],
				"Steps":["Set the following params of registry module","hive param value to HKLM","key param value to Software","setting param value to Rhoelements","persistent param value to True",
						"Call delete method of registry module."],
				"ExpectedOutcome":["This module should delete the registry setting called Rhoelements in HKLM/Software",
									" The module deletes any existing .reg file created before and creates a new .reg file which will delete the setting when merged."],
				"testToPerform":function(){
					registry.hive = 'HKLM';
					registry.key = 'Software';
					registry.setting = 'Rhoelements';
					registry.persistent = 'True';
					registry.delete();
					
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