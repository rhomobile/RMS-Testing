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
				"VTID":"VT187-0169",
				"RegLevel":"R1",
				"Description":"Enumerate Imager",
				"PreCondition":[],
				"Steps":["Attach javascript type imagerEnumEvent","Call enumerate method to enumerate the available imager list on device"],
				"ExpectedOutcome":["imagerEnumEvent should fire and return all available imagers on device when enumerate method is called"],
				"testToPerform":function(){
					imager.imagerEnumEvent= "EnumimagersJS(%s)";
					imager.enumerate();
				},
				"FinalResult":""
			},{
				"VTID":"VT187-0170",
				"RegLevel":"R1",
				"Description":"Enumerate Imager JSON Event",
				"PreCondition":[],
				"Steps":["Attach JSON Object type imagerEnumEvent","Call enumerate method to enumerate the available imager list on device"],
				"ExpectedOutcome":["imagerEnumEvent should fire and return all available imagers on device when enumerate method is called"],
				"testToPerform":function(){
					imager.enumerate();   
					imager.imagerEnumEvent="EnumimagersJSON(%json);";
				},
				"FinalResult":""
		
			},{
				"VTID":"VT187-0172",
				"RegLevel":"R1",
				"Description":"Enable Camera Imager",
				"PreCondition":[],
				"Steps":["Enable the camera imager available in the device with valid ID (select from dropdown)"],
				"ExpectedOutcome":["Camera imager should be enabled and viewfinder should be seen"],
				"testToPerform":function(){
					enableImager();
				},
				"FinalResult":""	
			},{
				"VTID":"VT187-0173",
				"RegLevel":"R1",
				"Description":"Enable 2D Imager (Windows only)",
				"PreCondition":[],
				"Steps":["Enable the 2D imager available in the device with valid ID(IMG1) (select from dropdown)"],
				"ExpectedOutcome":["2D imager should be enabled and viewfinder should be seen"],
				"testToPerform":function(){
					enableImager();
				},
				"FinalResult":""	
			},{
				"VTID":"VT187-0176",
				"RegLevel":"R1",
				"Description":"Disable the 2D Imager (Windows only)",
				"PreCondition":["Enable the available 2D Imager on device."],
				"Steps":["Click disable button to disbale the 2D Imager"],
				"ExpectedOutcome":["2D Imager should be disabled successfully and viewfinder should go away."],
				"testToPerform":function(){
					enableImager();
					//imager.disable();
				},
				"FinalResult":""	
			},{
				"VTID":"VT187-0177",
				"RegLevel":"R1",
				"Description":"Disable the camera Imager",
				"PreCondition":["Enable the available Camera Imager on device"],
				"Steps":["Click disable button to disbale the Camera Imager"],
				"ExpectedOutcome":["2D Imager should be disabled successfully and viewfinder should go away."],
				"testToPerform":function(){
					enableImager();
					//imager.disable();
				},
				"FinalResult":""	
			},{
				"VTID":"VT187-0178",
				"RegLevel":"R1",
				"Description":"Set left to 150",
				"PreCondition":["Enable the imager view finder on device","Set the left value to 150"],
				"Steps":[],
				"ExpectedOutcome":["left coordinate of the viewfinder should be set at 150."],
				"testToPerform":function(){
					enableImager();
					imager.left = 150;
				},
				"FinalResult":""	
			},{
				"VTID":"VT187-0179",
				"RegLevel":"R1",
				"Description":"Set top to 20",
				"PreCondition":["Enable the imager view finder on device","Set the top value to 20"],
				"Steps":[],
				"ExpectedOutcome":["Top of the viewfinder should be set at 20."],
				"testToPerform":function(){
					enableImager();
					imager.top = 20;
				},
				"FinalResult":""	
			},{
				"VTID":"VT187-0180",
				"RegLevel":"R1",
				"Description":"Set height to 70",
				"PreCondition":["Enable the imager view finder on device","Set the Height value to 70"],
				"Steps":[],
				"ExpectedOutcome":["Viewfinder height should be set to 70."],
				"testToPerform":function(){
					enableImager();
					imager.height = 70;
				},
				"FinalResult":""	
			},{
				"VTID":"VT187-0181",
				"RegLevel":"R1",
				"Description":"Set width to 70",
				"PreCondition":["Enable the imager view finder on device","Set width to 70"],
				"Steps":[],
				"ExpectedOutcome":["Width of the viewfinder should be set to 70."],
				"testToPerform":function(){
					enableImager();
					imager.width = 70;
				},
				"FinalResult":""	
			},{
				"VTID":"VT187-0182",
				"RegLevel":"R1",
				"Description":"Enable First available Imager device",
				"PreCondition":["Enable the first available imager device using Enable() method without specifying the imager device name."],
				"Steps":[],
				"ExpectedOutcome":["Width of the viewfinder should be set to 70."],
				"testToPerform":function(){
					imager.enable();
				},
				"FinalResult":""	
			},{
				"VTID":"VT187-0200",
				"RegLevel":"R1",
				"Description":"lamp on",
				"PreCondition":["Enable the imager view finder on device","Set the Lamp value to on"],
				"Steps":[],
				"ExpectedOutcome":["Lamp should be on and illumination should go on."],
				"testToPerform":function(){
					imager.lamp = 'on';
					enableImager();
				},
				"FinalResult":""	
			},{
				"VTID":"VT187-0201",
				"RegLevel":"R1",
				"Description":"lamp off",
				"PreCondition":["Enable the imager view finder on device","Set the Lamp value to off"],
				"Steps":[],
				"ExpectedOutcome":["Lamp should be off,Illumination shouldnot be there."],
				"testToPerform":function(){
					imager.lamp = 'off';
					enableImager();
				},
				"FinalResult":""	
			},{
				"VTID":"VT187-0204",
				"RegLevel":"R1",
				"Description":"Aim on (Windows only)",
				"PreCondition":["Enable the imager view finder on device","Set Aim value to On"],
				"Steps":[],
				"ExpectedOutcome":["Aiming should be on.","Reticle should be there","Image should be catured"],
				"testToPerform":function(){
					imager.aim = 'on';
					enableImager();
					imager.capture();
				},
				"FinalResult":""	
			},{
				"VTID":"VT187-0205",
				"RegLevel":"R1",
				"Description":"Aim off (Windows only)",
				"PreCondition":["Enable the imager view finder on device","Set Aim value to off"],
				"Steps":[],
				"ExpectedOutcome":["There should not be any aiming","Reticle should not be seen."],
				"testToPerform":function(){
					imager.aim = 'off';
					enableImager();
				},
				"FinalResult":""	
			},{
				"VTID":"VT187-0208",
				"RegLevel":"R1",
				"Description":"Destination to file system",
				"PreCondition":["Enable the imager on device.","destination set to valid file system location 'file://\\Application\\CapturedImage.bmp'","Capture an image using capture() method"],
				"Steps":[],
				"ExpectedOutcome":["Image should be captured and transferred to specified file system location"],
				"testToPerform":function(){
					var Destination = "file://\\Application\\CapturedImage.bmp";
					enableImager();
					imager.destination = "url('"+Destination+"')";
					imager.capture();
				},
				"FinalResult":""	
			},{
				"VTID":"VT187-0211",
				"RegLevel":"R1",
				"Description":"Destination FTP with wrong usename and password",
				"PreCondition":["Enable the imager on device.","Set the destination to FTP location with wrong username or password.","Attach the imager event.","Call Capture method"],
				"Steps":[],
				"ExpectedOutcome":["Image should be captured locally but should not be transferred to ftp location since credentials are wrong.","Event should return error message."],
				"testToPerform":function(){
					var Destination = "ftp://10.233.85.82/Received/imageInFTP.bmp";
					enableImager();
					imager.username = 'ftpadmininvalid';
					imager.password = 'ftpadmin';
					imager.destination = "url('"+Destination+"')";
					imager.imagerEvent = "callbackFunc('%s')";
					imager.imagerCaptureEvent='onImageCapture(%json)';
					imager.capture();
				},
				"FinalResult":""	
			},{
				"VTID":"VT187-0221",
				"RegLevel":"R1",
				"Description":"Play wav on Image capture",
				"PreCondition":["Enable the imager on device.","Set the sound to a valid wav file","Call Capture method"],
				"Steps":[],
				"ExpectedOutcome":["Image should be captured and wav file should be played on image capture."],
				"testToPerform":function(){
					enableImager();
					imager.imagerEvent = "callbackFunc('%s')";
					imager.sound = "Application/Alarm5.wav"
					imager.imagerCaptureEvent='onImageCapture(%json)';
					imager.capture();
				},
				"FinalResult":""	
			},{
				"VTID":"VT187-0223",
				"RegLevel":"R1",
				"Description":"Imager Event",
				"PreCondition":["Enable the imager on device.","Set the destination to HTTP location.","Attach the imager event.","Call Capture method"],
				"Steps":[],
				"ExpectedOutcome":["imager event should fire and appropriate transferResult value should be returned by event.","Image should be captured and transferred to specified HTTP location."],
				"testToPerform":function(){
					var Destination = "http://10.233.85.82/NEON/ReceivedFiles/Upload.aspx";
					enableImager();
					imager.destination = "url('"+Destination+"')";
					imager.imagerEvent = "callbackFunc('%s')";
					imager.imagerCaptureEvent='onImageCapture(%json)';
					imager.capture();
				},
				"FinalResult":""	
			},{
				"VTID":"VT187-0224",
				"RegLevel":"R1",
				"Description":"Imager Event with HTTP URL",
				"PreCondition":["Enable the imager on device.","Set the destination to FTP location with correct username or password.","Attach the imager event of HTTP Url type.","Call Capture method"],
				"Steps":["NOTE: This also covers VTID: VT187-2567"],
				"ExpectedOutcome":["imager event should fire and should cause to navigate the specified http url page.","Image should be captured and transferred to specified FTP location."],
				"testToPerform":function(){
					var Destination = "ftp://10.233.85.82/Received/imageInFTP.bmp";
					enableImager();
					imager.username = 'ftpadmin';
					imager.password = 'ftpadmin';
					imager.destination = "url('"+Destination+"')";
					imager.imagerEvent = "url('http://10.233.85.82:9099/app/Imager/navigateTest.html')";
					imager.imagerCaptureEvent='onImageCapture(%json)';
					imager.capture();
				},
				"FinalResult":""	
			},{
				"VTID":"VT187-0235",
				"RegLevel":"R1",
				"Description":"Imager Event of JSON Object type",
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
				"VTID":"VT187-0237",
				"RegLevel":"R1",
				"Description":"Enable the front face camera (Android only)",
				"PreCondition":["Enable the front facing camera imager (CAM2) on android device.","Call Capture method to capture an image"],
				"Steps":["select the front camera from the dropdown and run the test"],
				"ExpectedOutcome":["Front facing camera should be enabled and image should be captured locally on device."],
				"testToPerform":function(){
					enableImager();
					imager.imagerEvent = "callbackFunc('%s')";
					imager.imagerCaptureEvent='onImageCapture(%json)';
					imager.capture();
				},
				"FinalResult":""	
			},{
				"VTID":"VT187-2562",
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