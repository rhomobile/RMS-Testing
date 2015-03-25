(function(){
	var pbTest = function(){
		var pbTestObj = {};
		pbTestObj.testCases = [
	    {
			"VTID":"VT366-0254",
	        "RegLevel":"R1",
	        "Description":'GetSmartBatteryStatus',
	        "PreCondition":[],
	        "Steps":[ "1.Attach smartBatteryEvent on page. ","2.Call GetSmartBatteryStatus method. "],
	        "ExpectedOutcome":['The Battery icon should be shown in the display','Once the GetSmartBatteryStatus method is called SmartBatteryEvent should get triggered and the event should return attributes about Serial Number, Part Number, Battery Charge Cycles, Rated Capacity, Manufacture Date and State of Health<br/>Note: State of Health should return any of the one from("Healthy", "Unhealthy" or "Unknown")','Date of the battery was manufactured should be expressed as MM/DD/YYYY.'],
	        "testToPerform":function(){
					battery.visibility = 'visible';
					battery.smartBatteryEvent = "SmartBattery('%s','%s','%s','%s','%s');";
	                battery.getSmartBatteryStatus();
			},
			"FinalResult":""
		},
	    {
			"VTID":"VT366-0255",
	        "RegLevel":"R1",
	        "Description":'getBatteryStatus',
	        "PreCondition":[],
	        "Steps":[ "1. Disable the automatic refresh by setting sampleInterval to 0.","2. Attach battery event","3.Call getBatteryStatus method"],
	        "ExpectedOutcome":["BatteryEvent should fire when only getBatteryStatus method is called.","Event should retrun eventSource as 'User Request'"],
	        "testToPerform":function(){
					battery.sampleInterval = 0;
					battery.batteryEvent = "OnBatteryjson(%json);";
					battery.getBatteryStatus();
	        },
	        "FinalResult":""
	    }];
		pbTestObj.afterEach = function(){
		   
			battery.sampleInterval = 0;
			battery.visibility = "hidden";
			main.displayResult("");
		}
		return pbTestObj;
	}
	window.pbTest = pbTest();
})();