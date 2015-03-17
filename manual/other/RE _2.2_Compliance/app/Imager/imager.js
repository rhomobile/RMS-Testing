var selected_imager = "";

function setEnumImagerTimer(){
	setTimeout("imagerEnum()", 3000);
}
function imagerEnum(){
	imager.imagerEnumEvent = "Enumimagers(%s)";
	imager.enumerate();  
}
function Enumimagers(imagerArray){
	if (imagerArray.length > 0){
		for (i=0; i < imagerArray.length; i++){
	       	document.getElementById('imagerdropdown').options[i + 1].text = imagerArray[i][0]+imagerArray[i][1];
		   	document.getElementById('imagerdropdown').options[i + 1].value = imagerArray[i][0];
		}
	}else{
		alert("imagers not available in this device");
	}
}
function selectImager(){
    var w = document.getElementById('imagerdropdown').selectedIndex;
    selected_imager = document.getElementById('imagerdropdown').options[w].value;
}

(function(){
	var pbTest = function(){
		var pbTestObj = {};
		pbTestObj.testCases = [
		{
				"VTID":"VT366-0090",
				"RegLevel":"R1",
				"Description":"lamp on and Aim on",
				"PreCondition":["Enable the imager view finder on device","Set the Lamp value to on","Set Aim value to On"],
				"Steps":[],
				"ExpectedOutcome":["Lamp should be on and illumination should go on.","Aiming should be on.","Reticle should be there","Image should be catured"],
				"testToPerform":function(){
					imager.lamp = 'on';
					imager.aim = 'on';
					enableImager();
					imager.capture();
				},
				"FinalResult":""	
			},{
				"VTID":"VT366-0091",
				"RegLevel":"R1",
				"Description":"Imager Event with destination to ftp of JSON Object type ",
				"PreCondition":["Enable the imager on device.","Set the destination to FTP location with correct username or password.","Attach the imager event of JSON Object type.","Call Capture method"],
				"Steps":[],
				"ExpectedOutcome":["imager event should fire and appropriate transferResult value should be returned by event.","Image should be captured and transferred to specified FTP location."],
				"testToPerform":function(){
					var Destination = "ftp://10.233.85.82/Received/imageInFTP.bmp";
					enableImager();
					imager.username = 'ftpadmin';
					imager.password = 'ftpadmin';
					imager.destination = "url('"+Destination+"')";
					imager.imagerEvent = "myjsonevent(%json)";
					imager.imagerCaptureEvent='onImageCapture(%json)';
					imager.capture();
				},
				"FinalResult":""	
			},{
				"VTID":"VT366-0117",
				"RegLevel":"R1",
				"Description":"Imager(URI) | Display the captured Image after setting co-ordinates of viewfinder",
				"PreCondition":["Enable the imager","Set left, top, height and width to other than default values","Attach the ImageCaptureEvent.","Capture the Image","Display the captured Image (saved as Data URI object)"],
				"Steps":[],
				"ExpectedOutcome":["The captured Image should dispalyed on page."],
				"testToPerform":function(){
					enableImager();
					imager.left = 200;
					imager.top = 20;
					imager.height = 100;
					imager.width = 100;
					imager.imagerEvent = "callbackFunc('%s')";
					imager.imagerCaptureEvent='onImageCapture(%json)';
					imager.capture();
				},
				"FinalResult":""	
			}];
		pbTestObj.afterEach = function(){
			capturedImage.src = "";
			disableImager();
			imager.destination = "";
			imager.sound = "";	
		}
		return pbTestObj;
	}
	window.pbTest = pbTest();
})();

var EnumimagersJS = function(imagerArray){
	var imagerInfo = "imagerEnumEvent (JS): ";
	for (i=0; i < imagerArray.length; i++){
	   	imagerInfo = imagerInfo + imagerArray[i][0] + ' -- ' + imagerArray[i][1] + '<BR>';
	}
	document.getElementById("actualResult").innerHTML = imagerInfo;
}
var EnumimagersJSON = function(jsonobject){
	var ImagerInfo = "imagerEnumEvent (JSON): ";
	for (i=0; i < jsonobject.length; i++){
	    ImagerInfo = ImagerInfo + jsonobject[i].deviceName + ' -- ' + jsonobject[i].friendlyName + '<BR>';
	}
	document.getElementById("actualResult").innerHTML = ImagerInfo;
}

var enableImager = function(){
	imager.enabled = selected_imager;
}
var disableImager = function(){
	imager.disable();
}
var captureImage = function(){
	imager.capture();
	imager.imagerCaptureEvent='onImageCapture(%json)';
	imager.imagerEvent = "callbackFunc('%s')";
}
var onImageCapture = function(jsonObject){
	capturedImage.src = jsonObject.imageData;
}
var callbackFunc = function(data){
	document.getElementById("actualResult").innerHTML = data;
}
var myjsonevent = function(jsonObject){
	document.getElementById("actualResult").innerHTML = "JSON response: " + jsonObject.transferResult;
}