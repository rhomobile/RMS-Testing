var a=0;
var returnValue;
function callBackFunc(param) {
	       var sig = document.getElementById("actualResult"); 
	       sig.innerHTML = "Param: "+ param;
}
function onCaptured(response)
{   //alert('hi');
   // setTimeout(function(){
	var message1 = "Javascript response ="+response;
	main.displayResult(message1);
  // },2000);
}

function onCapturedjson(jsondata)
{
	var message2 = "JSON response: " +jsondata.transferResult;
	main.displayResult(message2);
}

var printerID = "";
function getprintermac(){
	var index = myPrinterAddress.selectedIndex;
	printerID = myPrinterAddress.options[index].value;
	document.getElementById('printAdd').innerHTML= "PrinterAddress: " + printerID;
}


(function(){
	var pbTest = function(){
		var pbTestObj = {};
		pbTestObj.testCases = [
		{
				"VTID":"VT366-0092",
				"RegLevel":"R1",
				"Description":"Launch a new process",
				"PreCondition":[],
				"Steps":["1. Call LaunchProcess() method by passing the executable application name.","2. Close the launched application.","Note - Make sure particuar executable is present in the Application folder on device."],
				"ExpectedOutcome":["It should launch the application process","It should return code of the launched process after termination only since it's a blocking call."],
				"testToPerform":function(){
					var validexitCode1 = generic.LaunchProcess('\\Application\\MemoryCheck.exe', '');
					main.displayResult(validexitCode1);
					//generic.CloseProcess(validexitCode1);
				},
				"FinalResult":""
			},{
				"VTID":"VT366-0093",
				"RegLevel":"R1",
				"Description":"Set and Get RegistrySetting under  HKEY_LOCAL_MACHINE",
				"PreCondition":[],
				"Steps":["1.Make registry changes in HKEY_LOCAL_MACHINE by passing the lHive,lType, strKey, strSetting and strData to SetRegistrySetting() method.","2. Call the GetRegistrySetting() method by passing the lKey, strKey and strSetting to get the changed registry value in HKEY_LOCAL_MACHINE.","Note: Repeat steps 1 and 2 with all registry value types(REG_SZ = 1, REG_BINARY = 3, REG_DWORD = 4, REG_MULTI_SZ = 7)"],
				"ExpectedOutcome":["SetRegistrySetting method should set the registry value under HKEY_LOCAL_MACHINE for all registry value types.","GetRegistrySetting method should return the data 'hello' from specified registry setting."],
				"testToPerform":function(){
					var lType = 1;
				    var lHive = 2;
				    var strKey = 'Software\\Motorola\\PySettings';
				    var strSetting = 'Software';
				    var strData = 'Hello';
					generic.SetRegistrySetting(lHive, lType, strKey, strSetting, strData);
					strData = generic.GetRegistrySetting(lHive, strKey, strSetting);
					main.displayResult(strData);
				},
				"FinalResult":""
			},{
				"VTID":"VT366-0094",
				"RegLevel":"R1",
				"Description":"PlayWave asynchronously",
				"PreCondition":[],
				"Steps":["1. Call PlayWave() method to play alarm5.wav file asynchronously with flag value to 1.","2.Check the value return by PlayWave method.","Note - Make sure alarm5.wav is present in the Application folder of the mobile device."],
				"ExpectedOutcome":["The wav file will be played in asynchronised manner and boolean value true will be returned during play of the wav file. "],
				"testToPerform":function(){
					returnValue = generic.PlayWave('\\Application\\alarm5.wav', 0x00000001);
					main.displayResult(returnValue);
				},
				"FinalResult":""
			},{
				"VTID":"VT366-0095",
				"RegLevel":"R1",
				"Description":"Call UUID method",
				"PreCondition":[],
				"Steps":["1. Retrieve the UUID of the Deivce using UUID property."],
				"ExpectedOutcome":["The Proper UUID of the Device should be returned which should match exactly to the UUID specified under system info."],
				"testToPerform":function(){
					main.displayResult(generic.UUID);
				},
				"FinalResult":""
			},{
				"VTID":"VT366-0096",
				"RegLevel":"R1",
				"Description":"OEMInfo Method",
				"PreCondition":[],
				"Steps":["1. Retrieve the OEM Information of device using OEMInfo Property."],
				"ExpectedOutcome":["OEM informaion of the terminal should be returned which should match exactly to the OEM info specified under system info."],
				"testToPerform":function(){
					main.displayResult(generic.OEMInfo);
				},
				"FinalResult":""
			}

		];
		pbTestObj.afterEach = function(){
			returnValue = "";
		}
		return pbTestObj;
	}
	window.pbTest = pbTest();
})();