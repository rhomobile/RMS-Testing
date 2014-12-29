(function(){
	var pbTest = function(){
		var pbTestObj = {};
		pbTestObj.testCases = [
			{
				"VTID":"VT187-0740",
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
			},{
				"VTID":"VT187-0743",
				"RegLevel":"R1",
				"Description":"AirBEAM Smart Active X Object <br/> DeletePackage Property",
				"PreCondition":["Download the package using AddPackage method","Set the name of the package to be deleted to Delete property","Call the Run method.","Check the package in Airbeam client. "], 
				"Steps":[""],
				"ExpectedOutcome":["The package should be delete from the package list in the AirBeam client"],
				"testToPerform":function(){
					main.displayResult("Deleteing ");
				    airbeam.DeletePackage = "key35";
				    setTimeout('airbeam.Run()', 100);
				},
				"FinalResult":""
			}];
		pbTestObj.afterEach = function(){
			
		}
		return pbTestObj;
	}
	window.pbTest = pbTest();
})();