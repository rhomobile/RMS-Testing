(function(){
	var pbTest = function(){
		var pbTestObj = {};
		pbTestObj.testCases = [
			{
				"VTID":"VT366-0274",
				"RegLevel":"R1",
				"Description":"AirBEAM Smart Active X Object <br/> AddPackage",
				"PreCondition":["Delete all the package from AirBeam client on device.","Launch RE application and set the name of the package to AddPackage method","Call the Run method.","Check the package in Airbeam client."], 
				"Steps":[""],
				"ExpectedOutcome":["The Package should be download through AirBeam when Run method is called. Airbeam client should show the downloaded package in package list."],
				"testToPerform":function(){
					var retVal = airbeam.AddPackage("key35");
					setTimeout('airbeam.Run()', 100);
					main.displayResult("Add Package named key35: "+retVal);
				},
				"FinalResult":""
			}];
		pbTestObj.afterEach = function(){
			
		}
		return pbTestObj;
	}
	window.pbTest = pbTest();
})();