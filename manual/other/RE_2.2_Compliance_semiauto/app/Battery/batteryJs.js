var a = 0;
var b = 0;
function callBackFunc(param) {
   var sig = document.getElementById("actualResult"); 
   sig.innerHTML = "Param: "+ param;
}
function OnBattery(AC,mainCB,backup){
	a = a + 1;
	var actual = "AC: " + AC + "\<BR>main:" + mainCB + "\<BR>backup: " + backup + "\<BR>Count: "+a;
	main.displayResult(actual);
}
function OnBatteryjson(jsonObject){  
	a = a + 1;
	var theOutput = "";       
    theOutput = theOutput + "acLineStatus: "+jsonObject.acLineStatus + "<BR>";        
    theOutput = theOutput + "batteryLifePercent: " + jsonObject.batteryLifePercent  + "<BR>";
    theOutput = theOutput + "backupBatteryLifePercent: " + jsonObject.backupBatteryLifePercent  + "<BR>";
    theOutput = theOutput + "eventSource: " + jsonObject.eventSource  + "<BR>";
	theOutput = theOutput + "batteryLifeKnown: " + jsonObject.batteryLifeKnown  + "<BR>";
	theOutput = theOutput + "backupBatteryLifeKnown: " + jsonObject.backupBatteryLifeKnown  + "<BR>";
    theOutput = theOutput + "Count: " + a  + "<BR>";
    main.displayResult(theOutput);	
}
function SmartBattery(SN, PN, BC, RC, MA, SH) {
	b = b + 1;
	var actual = "SN: " + SN + "\<BR>PN:" + PN + "\<BR>BC: " + BC + "\<BR>RC: " + RC + "\<BR>MA:" + MA + "\<BR>SH: " + SH + "\<BR>Count: "+b;
	main.displayResult(actual);
}
function getBatteryStatusmethod(){
	battery.getBatteryStatus();
	//alert("ho");
}