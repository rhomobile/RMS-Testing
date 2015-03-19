var a=0;
function callBackFunc(param) {
	       var sig = document.getElementById("actualResult"); 
	       sig.innerHTML = "Param: "+ param;
}
 function EnumScanners(scannerArray)
	{
		var scannerInfo = "Scanners On Device: " + scannerArray.length + "<BR>ID  --  Name<BR>" ;
		//alert('1');
		//alert(scannerInfo);
		for (i=0; i < scannerArray.length; i++)
		{
			scannerInfo = scannerInfo + scannerArray[i][0] + ' -- ' + scannerArray[i][1] + '<BR>';
		}
		//alert(scannerInfo);
		main.displayResult(scannerInfo);
		//alert('1');
	}
function EnumScannersjson(jsonscannerObject)
	{
		var jsonObject = JSON.stringify(jsonscannerObject);
		//alert(jsonObject);
		main.displayResult(jsonObject);
	}
 function onDecodeEventJS(data, source, type, time, length)
  {
	var html = "<b>Decoded Data:</b><br>";
	html = html + "<br><i>Data:</i> " + data;
	html = html + "<br><i>Source:</i> " + source;
	html = html + "<br><i>Type:</i> " + type;
	html = html + "<br><i>Time:</i> " + time;
	html = html + "<br><i>Length:</i> " + length;
	//html = html + "<br><i>Event:</i> " + event;
    main.displayResult(html);
  }
 function onDecodeEventJSON(jsonObject)
  {
	var html = "<b>Decoded Data:</b><br>";
	html = html + "<br><i>Data:</i> " + jsonObject.data;
	html = html + "<br><i>Source:</i> " + jsonObject.source;
	html = html + "<br><i>Type:</i> " + jsonObject.type;
	html = html + "<br><i>Time:</i> " + jsonObject.time;
	html = html + "<br><i>Length:</i> " + jsonObject.length;
	html = html + "<br><i>Event:</i> " + jsonObject.event;
    main.displayResult(html);
  }
 function enableSpecifiedScanner(theScanner)
	{
		var message = "Enabling Specified Scanner: " + theScanner;
		main.displayResult(message);
		//generic.InvokeMETAFunction("Scanner","enabled:"+theScanner);
		scanner.enabled = theScanner;
	}
 function disableSpecifiedScanner(theScanner)
	{
		scanner.disable();
	}
function setDecoder(decoder)
	{
		
		
			var message = "Setting " + decoder + " to Enabled";
			scanner.setEMML("" + decoder + ":" + "enabled");
			//generic.InvokeMETAFunction("Scanner","" + decoder + ":" + "Enabled");
		
		
	}
function unsetDecoder(decoder)
	{
		
		
			var message = "Setting " + decoder + " to Disabled";			
			scanner.setEMML("" + decoder + ":" + "disabled");
			//generic.InvokeMETAFunction("Scanner","" + decoder + ":" + "Enabled");
		
		
	}
function onBluetoothEvent(response)
	{
		var message = "Bluetooth Message " + response;
		main.displayResult(message);
	}
function onBluetoothEventjson(jsonObject)
	{
		var message = "Bluetooth Message " + jsonObject.status;
		main.displayResult(message);
	}


(function(){
	var pbTest = function(){
		var pbTestObj = {};
		pbTestObj.testCases = [
		{
				"VTID":"VT366-0260",
				"RegLevel":"R1",
				"Description":"Enumerate Scanner using JS event",
				"PreCondition":[],
				"Steps":["1.Attach the JS event for enumScannerEvent","2.Call method enumerate","3.check for the enumerated scanners."],
				"ExpectedOutcome":["EnumScanners array should return a list of scanners present on the device including the BT scanner if connected via EnumScannerEvent invokation."],
				"testToPerform":function(){
					scanner.enumerate();
		            scanner.enumScannerEvent = "EnumScanners(%s);";
				},
				"FinalResult":""
			},{
				"VTID":"VT366-0261",
				"RegLevel":"R1",
				"Description":"Decode event using JS event",
				"PreCondition":[],
				"Steps":["1. Attach Decoded Event using JS object 'decodeEvent:uri(Javascript:doScan('%s,%s,%s,%s,%s,%s);'","2. Enable scanner.","3. Scan barcode."],
				"ExpectedOutcome":["Should be able to get following after decode of any barcode 1. Data2. Source3. Type4. time5. length 6. event"],
				"testToPerform":function(){
					
					scanner.decodeEvent = "onDecodeEventJS('%s', '%s', '%s', '%s', '%s', '%s');";
					scanner.enable();
					scanner.start();
				},
				"FinalResult":""
			},{
				"VTID":"VT366-0262",
				"RegLevel":"R1",
				"Description":"Enable SCN1 and Enable All Decoders",
				"PreCondition":[],
				"Steps":["1.Enable Scanner1 (SCN1)","2.Set alldecoders to enabled.","3.start the scanner","4. Read All barcodes supported on Device."],
				"ExpectedOutcome":["The scanner SCN1 should  be enabled and should  read all  the barcode supported on device as alldecoders:enabled."],
				"testToPerform":function(){
					enableSpecifiedScanner('SCN1');
					setDecoder('allDecoders');
					scanner.decodeEvent = "onDecodeEventJS('%s', '%s', '%s', '%s', '%s', '%s');";
					scanner.start();
				},
				"FinalResult":""
			},{
				"VTID":"VT366-0263",
				"RegLevel":"R1",
				"Description":"Scanner with auotenter enabled",
				"PreCondition":[],
				"Steps":["1.Enable the scanner","2.Enable the autoenter funcationality","3.Start Scanner","4.Put the focus inside any textbox","5.Scan any barcode","Note: Don't attach decode event. Decoded data should be received as keystrokes "],
				"ExpectedOutcome":["Scanner will scan the barcode and will append an enter at the end of decoded data"],
				"testToPerform":function(){
					enableSpecifiedScanner('SCN1');
					enableSpecifiedScanner('autoenter');
					setDecoder('allDecoders');
					scanner.decodeEvent = "onDecodeEventJS('%s', '%s', '%s', '%s', '%s', '%s');";
					scanner.start();
				},
				"FinalResult":""
			},{
				"VTID":"VT366-0264",
				"RegLevel":"R1",
				"Description":"Scanner with autotab enabled",
				"PreCondition":[],
				"Steps":["1.Enable the scanner","2.Enable the autotab funcationality","3.Start Scanner","4.Put the focus inside any textbox","5.Scan any barcode","Note: Don't attach decode event. Decoded data should be received as keystrokes "],
				"ExpectedOutcome":["Scanner will scan the barcode and will append a tab at the end of decoded data"],
				"testToPerform":function(){
					enableSpecifiedScanner('SCN1');
					enableSpecifiedScanner('autotab');
					setDecoder('allDecoders');
					scanner.decodeEvent = "onDecodeEventJS('%s', '%s', '%s', '%s', '%s', '%s');";
					scanner.start();
				},
				"FinalResult":""
			}
         ];
		pbTestObj.afterEach = function(){
			signatureCapture.clear();
			signatureCapture.visibility = 'hidden';
		}
		return pbTestObj;
	}
	window.pbTest = pbTest();
})();