var a=0;
function callBackFunc(param) {
	       var sig = document.getElementById("actualResult"); 
	       sig.innerHTML = "Param: "+ param;
}
function onVectors(data)
{
  var VectorAsHTML = "<TABLE><TR><TH>X</TH><TH>Y</TH><TH>X</TH><TH>Y</TH><TH>X</TH><TH>Y</TH></TR>";
  //alert(JSON.stringify(data));
  for (var i=0; i<data.length; i = i + 6)
  {
    VectorAsHTML = VectorAsHTML + "<TR>"
    VectorAsHTML = VectorAsHTML + "<TD>" + data[i] + "</TD><TD>" + data[i+1] + "</TD>";
    VectorAsHTML = VectorAsHTML + "<TD>" + data[i+2] + "</TD><TD>" + data[i+3] + "</TD>";
    VectorAsHTML = VectorAsHTML + "<TD>" + data[i+4] + "</TD><TD>" + data[i+5] + "</TD>";
    VectorAsHTML = VectorAsHTML + "</TR>"
  }
  VectorAsHTML + "</TABLE>"
  main.displayResult(VectorAsHTML);
  //"If seen any undefined, its not a issue..."
	//vectorOut.innerHTML = JSON.stringify(data);
}

function onVectorsjson(jsondata)
{
  var VectorAsHTML = "<TABLE><TR><TH>X</TH><TH>Y</TH><TH>X</TH><TH>Y</TH><TH>X</TH><TH>Y</TH></TR>";
  for (var i=0; i<jsondata.vectorArray.length; i = i + 6)
  {
    VectorAsHTML = VectorAsHTML + "<TR>"
    VectorAsHTML = VectorAsHTML + "<TD>" + jsondata.vectorArray[i]+ "</TD><TD>" + jsondata.vectorArray[i+1] + "</TD>";
    VectorAsHTML = VectorAsHTML + "<TD>" + jsondata.vectorArray[i+2] + "</TD><TD>" + jsondata.vectorArray[i+3]+ "</TD>";
    VectorAsHTML = VectorAsHTML + "<TD>" + jsondata.vectorArray[i+4]+ "</TD><TD>" + jsondata.vectorArray[i+5]+ "</TD>";
    VectorAsHTML = VectorAsHTML + "</TR>"
  }
  VectorAsHTML + "</TABLE>"
  main.displayResult(VectorAsHTML);
}

function OnSignature(response)
{
	//alert('hi');
	var message1 = "Javascript response ="+response;
	main.displayResult(message1);
	//alert('hi1');
}

function OnSignaturejson(jsondata)
{
	var message2 = "JSON response: " +jsondata.transferResult;
	main.displayResult(message2);
}

function capture() {
			signatureCapture.capture();
			signatureCapture.visibility ="hidden";
			//genericObj.InvokeMETAFunction('SignatureCapture', "signatureSaveEvent:url('javascript:main.displayResult('%s')');");
        }

function clearSig(){
			signatureCapture.clear();
        }	
function hide(){
			signatureCapture.visibility ="hidden";
		}

(function(){
	var pbTest = function(){
		var pbTestObj = {};
		pbTestObj.testCases = [
		{
				"VTID":"VT366-0256",
				"RegLevel":"R1",
				"Description":"SignatureCapture Visible",
				"PreCondition":[],
				"Steps":["1. Make visible the SignatureCapture area.","2. Draw a line or something in the rectangular capture area check the Penwidth","3. Check Pencolor in the rectangular capture area","4. Check the background color of the rectangular capture area"],
				"ExpectedOutcome":["SignatureCapture's rectangular capture area should be shown in the Rhoelements","By default the border should be visible","Height and Width of rectangular capture area should 150 and 200","Left and Top position rectangular capture area should be 15 and 60","The Penwidth should be 1","The Pencolor should be black","The BGColor should be white"],
				"testToPerform":function(){
					signatureCapture.visibility = 'visible';
				},
				"FinalResult":""
			},{
				"VTID":"VT366-0257",
				"RegLevel":"R1",
				"Description":"signatureSaveEvent Destination(http)",
				"PreCondition":[],
				"Steps":["1. Make visible the SignatureCapture area.","2. Set Destination to Http server url.","3. Set valid UserName and Password of http server","4. Attach signatureSaveEvent on page.","5. Draw a signature in the rectangular capture area","6. Call capture method."],
				"ExpectedOutcome":["SignatureSaveEvent should fire and should return value of transferResult [destination server message ]","signature should be captured and sent to the ftp server successfully."],
				"testToPerform":function(){
					signatureCapture.visibility = 'visible';
					signatureCapture.destination = "url('http://10.233.85.82/NEON/ReceivedFiles/upload.aspx')";
					signatureCapture.signatureSaveEvent ="OnSignature('%s')";
				
				},
				"FinalResult":""
			},{
				"VTID":"VT366-0258",
				"RegLevel":"R1",
				"Description":"VectorTransferEvent",
				"PreCondition":[],
				"Steps":["1. Make visible the SignatureCapture area.","2. Attach vectorEvent on page.","3. Draw a signature in the rectangular capture area"],
				"ExpectedOutcome":["Vector Event should fire whenever a pen-up occurs in the signature box.","It should return JavaScript array of vectors  A single vector (array entry) contains an X, Y coordinate and the beginning / end of the signature is defined by (0xFFFF, 0xFFFF)"],
				"testToPerform":function(){
					signatureCapture.visibility = 'visible';
					signatureCapture.vectorEvent = 'onVectors(%s)';
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