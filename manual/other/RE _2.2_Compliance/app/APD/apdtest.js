var a=0;
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
				"VTID":"VT366-0259",
				"RegLevel":"R1",
				"Description":"PSExternalEx Method  (Test with Bluetooth Printer)",
				"PreCondition":[],
				"Steps":["1. Set the bluetooth printer ID","2. Call PSExternalEx Method (266 ,stringData) to send data string.where 266- send string command"],
				"ExpectedOutcome":["PSExternal Method should return result value of the command.(0= successful and >0=Error)","String Data should be sent to printer and displayed successfully."],
				"testToPerform":function(){
					apd.PSExternalEx(261, printerID);
				    var code = '1234567890';
				    var sLabel = '! 0 200 200 350 1\n'
					 + 'JOURNAL\n'
					 + 'SPEED 3\n'
					 + 'PW 400\n'
					 + 'B 128 1 1 80 20 80 ' + code + '\n'
					 + 'T 5 3 20 196 £2.00 off\n'
					 + 'BOX 5 5 350 295 1\n'
					 + 'PRINT\n';
				     var data = "sendstringwithlabel: "+ apd.PSExternal(266, sLabel);
				     main.displayResult(data);
				},
				"FinalResult":""
			}

		];
		pbTestObj.afterEach = function(){
			audioCapture.duration = 20000;
		}
		return pbTestObj;
	}
	window.pbTest = pbTest();
})();