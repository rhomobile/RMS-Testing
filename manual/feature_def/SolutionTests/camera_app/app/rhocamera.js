var data = "";
var enumData;
var cameraObj;
var cameratype;
var imageuricb;
var status;
var srvURL = 'http://10.233.85.82/NEON/ReceivedFiles/Upload.aspx';
var enumFunc = function() {
	var enumData = Rho.Camera.enumerate();
	for (var i = 0; i <= enumData.length - 1; i++) {
		data += (i+1).toString() + ") " + enumData[i].cameraType +  "; ";
	};
	
	document.getElementById("enumdata").innerHTML = data;

	if (enumData.length > 0){
		for (i=0; i < enumData.length; i++){
	       	document.getElementById('cameradropdown').options[i + 1].text = enumData[i].cameraType;
		   	document.getElementById('cameradropdown').options[i + 1].value = enumData[i].cameraType;
		}
	}else{
		alert("cameras not available in this device");
	}
}
var selectCamera = function () {
	var w = document.getElementById('cameradropdown').selectedIndex;
    cameratype = document.getElementById('cameradropdown').options[w].value;
}
var	takepic = function(){
	cameraObj = Rho.Camera.getCameraByType(cameratype);
	cameraObj.takePicture({'outputFormat' : 'image'},cbfunc);
}
function cbfunc (cbData) {
	data = "status : " + cbData.status;
	data += "; message : " + cbData.message;
	data += "; imageHeight : " + cbData.imageHeight;
	data += "; imageWidth : " + cbData.imageWidth;
	data += "; imageFormat : " + cbData.imageFormat;
	data += "; imageUri : " + cbData.imageUri;

	document.getElementById("cbdata").innerHTML = data;
	document.getElementById('camImage').src = cbData.imageUri;
	imageuricb = cbData.imageUri;
}
var upload_file_callback = function (args){
	status = "File upload status : " + args['status'];
	data = args['body'];
	document.getElementById("uploadstatus").innerHTML = status;
}
var send = function(){
	var uploadfileProps = {
		url: srvURL,
		filename: imageuricb,
		body: "uploading file",
		fileContentType: "text/plain"
	};
	Rho.Network.uploadFile(uploadfileProps,upload_file_callback);
};
var cleardivs = function(){
	document.getElementById('cbdata').innerHTML = '';
	document.getElementById('imgdiv').innerHTML = "<img src='' id='camImage'></img>";
	document.getElementById('uploadstatus').innerHTML = '';
};
var choosepic = function () {
	Rho.Camera.choosePicture({},callbackfunc);
};
var selfie = function(){
	var selfieCb;
	var selfieStatus;
	var enumData = Rho.Camera.enumerate();
	var platform = Rho.System.platform;
	if (enumData.length>1 && platform != 'WINDOWS'){
		var frontCam = Rho.Camera.getCameraByType('front');
		if (platform == 'ANDROID' || platform == 'APPLE'){
			selfieCb = frontCam.takePicture({'saveToDeviceGallery': true});
		}else{
			selfieCb = frontCam.takePicture({});
		}
		selfieStatus = "Capture Status : " + selfieCb.status;		
		
	}else{
		selfieStatus = 'Front cam not found :( !!';
	}
	document.getElementById('status').innerHTML = selfieStatus;
};
var callbackfunc = function(cbData){
	document.getElementById('setimage').src = cbData.imageUri;
}