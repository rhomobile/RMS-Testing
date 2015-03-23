
var count1=0;
var count2=0;
function MyTriggerEvent(TriggerFlag)
{
	main.displayResult("TriggerEvent fired for " + count1 +"th time. TriggerFlag:-" + TriggerFlag);
	count1++;
}
function jsonTrigger(TriggerFlag)
{
	main.displayResult(JSON.stringify(TriggerFlag));
}
function MyKeyEvent(key)
{
	main.displayResult("KeyEvent fired for " + count2 + "th time. KeyValue:- " + key);
	count2++;
}
// function barcodeenable(){
// 	generic.InvokeMETAFunction("Scanner", "Enabled");
// }
(function(){
	var pbTest = function(){
		var pbTestObj = {};
		pbTestObj.testCases = [
		{
		    "VTID":"VT366-0242",
            "RegLevel":"R1",
		    "Description":"HomeKey-disabled",
		    "PreCondition":[],
		    "Steps":["1. Set HomeKeyValue to key (1) enter in Windows.","2. Set Homekey value to disabled.","3. Open the page and press the 1 key."],
		    "ExpectedOutcome":["Pressing key 1 should not take any action."],
		    "testToPerform":function(){
		    	keyCapture.homeKeyValue = '0x31';
				keyCapture.homeKeyValue = 'Disabled';
				main.displayResult("Press key 1 now..");
		    },
		    "FinalResult":""
		 },{
		    "VTID":"VT366-0242",
            "RegLevel":"R1",
		    "Description":"HomeKey-disabled",
		    "PreCondition":[],
		    "Steps":["1. Set HomeKeyValue to Menu key in Android.","2. Set Homekey value to disabled.","3. Open the page and press the Menu key."],
		    "ExpectedOutcome":["Pressing the Menu key should not take any action."],
		    "testToPerform":function(){
		    	keyCapture.homeKeyValue = '0x12';
				keyCapture.homeKeyValue = 'Disabled';
				main.displayResult("Press Menu key now..");
		    },
		    "FinalResult":""
		 },{
		    "VTID":"VT366-0243",
            "RegLevel":"R1",
		    "Description":"KeyValue:0x31(1 key) Dispatch:true",
		    "PreCondition":[],
		    "Steps":["1. Set KeyValue to 0x31.",
					"2. Set Dispatch:true",
					"3. Attach a keyevent and inside Javascript show the keyvalue.Do not use alert or messagebox.Because it takes some time to open the messagebox and the focus is shifted from textbox control.",
					"4. Inside the textbox Press 1."],
		    "ExpectedOutcome":["Pressing 1 should be captured. 1 should be seen inside the textbox."],
		    "testToPerform":function(){
				keyCapture.keyValue = '0x31';
				keyCapture.dispatch = 'True';
				keyCapture.keyEvent = "MyKeyEvent('%s');";
		    },
		    "FinalResult":""
		 },{
		    "VTID":"VT366-0244",
            "RegLevel":"R1",
		    "Description":"KeyValue:All Dispatch:true",
		    "PreCondition":[],
		    "Steps":["1. Set KeyValue to All.",
					"2. Set Dispatch:true",
					"3. Attach a keyevent and inside Javascript show the keyvalue.Do not use alert or messagebox.Because it takes some time to open the messagebox and the focus is shifted from textbox control.",
					"4. Inside the textbox Press all  keys."],
		    "ExpectedOutcome":["All keys should be shown inside the keybox."],
		    "testToPerform":function(){
				keyCapture.keyValue = 'All';
				keyCapture.dispatch = 'True';
				keyCapture.keyEvent = "MyKeyEvent('%s');";
		    },
		    "FinalResult":""
		 }];
		pbTestObj.afterEach = function(){
			keyCapture.homeKeyValue = 'Disabled';
			count1=0;
			count2=0;
		}
		return pbTestObj;
	}
	window.pbTest = pbTest();
})();