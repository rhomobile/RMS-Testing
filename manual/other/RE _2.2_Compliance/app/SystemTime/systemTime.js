
//	<script type="text/javascript" src="http://10.233.85.82/src/elements.js"></script>
//	<script type="text/javascript">
function actualSet(param) {
	var sig = document.getElementById("actualResult");
	sig.innerHTML = "Setting time..";
	setTimeout(function(){ 
		var nowDate = new Date();
		sig.innerHTML = "Device time set: " + nowDate;
	}, 5000);
}

(function(){
	var pbTest = function(){
		var pbTestObj = {};
		pbTestObj.testCases = [
		{
				"VTID":"VT366-0116",
				"RegLevel":"R1",
				"Description":"System Time <br/> set Local Time String",
				"PreCondition":[],
				"Steps":["setLocal to 2014-09-22T04-15-00","check the local time has set on device or not"],
				"ExpectedOutcome":["Should set the device time to 4:15am on 22nd September 2014 without changing the timezone"],
				"testToPerform":function(){
					systemTime.setLocal = "2014-09-22T04-15-00";
					actualSet();
				},
				"FinalResult":""
			}];
		pbTestObj.afterEach = function(){
			
		}
		return pbTestObj;
	}
	window.pbTest = pbTest();
})();