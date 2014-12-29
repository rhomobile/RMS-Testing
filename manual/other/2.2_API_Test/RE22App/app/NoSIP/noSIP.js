
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
				"VTID":"VT187-737",
				"RegLevel":"R1",
				"Description":"NoSIP <br/> ShowSIP Method with parameter true",
				"PreCondition":[],
				"Steps":["Call ShowSIP(true) method","Check whether SIP is shown or not"],
				"ExpectedOutcome":["It should displays SIP and SIP should stay on screen"],
				"testToPerform":function(){
					nosip.ShowSIP(true);

				},
				"FinalResult":""
			},{
				"VTID":"VT187-738",
				"RegLevel":"R1",
				"Description":"NoSIP <br/> ShowSIP Method with parameter false",
				"PreCondition":[],
				"Steps":["Show the SIP on screen","Call ShowSIP(false) method","Check wether SIP is hidding or not"],
				"ExpectedOutcome":["It should hide SIP if ShowSIP(false) is called"],
				"testToPerform":function(){
					nosip.ShowSIP(true);
					setTimeout(function(){
								nosip.ShowSIP(false);
								alert("ShowSIP(false) method called");
							},5000);
					
					
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