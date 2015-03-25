
function readeventJS(data, mode)
{
	main.displayResult('Data: ' + data + '; Mode: ' + mode);
}
function readeventJSON(data)
{
	main.displayResult(JSON.stringify(data));
}

(function(){
	var pbTest = function(){
		var pbTestObj = {};
		pbTestObj.testCases = [
	{
		    "VTID":"VT366-0245",
            "RegLevel":"R1",
		    "Description":"Checking MSR Open",
		    "PreCondition":[],
		    "Steps":["1. Set the proper modulename if required.",
					"2. Open the MSR.",
					"3. Put the cursor inside a textbox.",
					"4. Swipe a card."],
		    "ExpectedOutcome":["Data should be returned as keystrokes inside the textbox."],
		    "testToPerform":function(){
		    	cardReader.open();
		    },
		    "FinalResult":""
		 },{
		    "VTID":"VT366-0246",
            "RegLevel":"R1",
		    "Description":"AutoEnter Enabled",
		    "PreCondition":[],
		    "Steps":["Make sure that ReadEvent is not attcahed.",
					"1. Set AutoEnter to Enabled.",
					"2. Open the MSR to receive data via keystroke",
					"3. Put the cursor inside a textbox.",
					"4. Swipe a Card."],
		    "ExpectedOutcome":["A carriage return should  be appended to any data returned as keystrokes by the Card Reader."],
		    "testToPerform":function(){
		    	cardReader.autoTab = 'Disabled';
		    	cardReader.autoEnter = 'Enabled';
		    	cardReader.open();
		    },
		    "FinalResult":""
		 },{
		    "VTID":"VT366-0247",
            "RegLevel":"R1",
		    "Description":"AutoTab Enabled",
		    "PreCondition":[],
		    "Steps":["Make sure that ReadEvent is not attcahed.",
					"1. Set AutoTab to Enabled.",
					"2. Open the MSR to receive data via keystroke.",
					"3. Put the cursor inside a textbox.",
					"4. Swipe a card."],
		    "ExpectedOutcome":["TAB should be appended to any data returned as keystrokes by the Card Reader. It should take the control to next UI control."],
		    "testToPerform":function(){
		    	cardReader.autoTab = 'Enabled';
		    	cardReader.autoEnter = 'Disabled';
		    	cardReader.open();
		    },
		    "FinalResult":""
		 }];
		pbTestObj.afterEach = function(){
			cardReader.close();
			//document.getElementById('txtInput1').value = '';
			//document.getElementById('txtInput2').value = '';
		}
		return pbTestObj;
	}
	window.pbTest = pbTest();
})();