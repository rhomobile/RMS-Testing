
//	<script type="text/javascript" src="http://10.233.85.82/src/elements.js"></script>
//	<script type="text/javascript">

(function(){
	var pbTest = function(){
		var pbTestObj = {};
		pbTestObj.testCases = [
		{
				"VTID":"VT366-0279",
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
				"VTID":"VT366-0280",
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