


var ENABLE8K = 8000;
var ENABLE1K = 1000;
var enumData = Rho.Barcode.enumerate();
var srvHost = SERVER_HOST;
var srvPort = SERVER_PORT;
var srvURL = "http://"+SERVER_HOST+":"+SERVER_PORT.toString();
var bluetoothStatusdata ='';
var callbackstatus = false;
var callbackCalled;
var ringtone_names = "";
var global_ringtones = "";
var srvHttpDownloadImageUrl = srvURL + "/download_image";
var srvHttpUploadTextFileUrl = srvURL + "/upload_text_file";
var db;
var takecallbackfired = false;
takecallbackfired1 = false;
var tableNames;
var sensorInstance = null; 
var audioMediaPath = Rho.RhoFile.join(Rho.Application.modelFolderPath('Multiapptest'), "MediaFiles/Audio");
var videoMediaPath = Rho.RhoFile.join(Rho.Application.modelFolderPath('Multiapptest'), "MediaFiles/Video");

var callbackenable = function (data){
	enablecallbackdata(JSON.stringify(data));
}

function enablecallbackdata(data)
{
	document.getElementById("clbkData").innerHTML = data;
}

function enableScanner(scanner)
{
	for (var j = 0;j<=scanner;j++){
		if(j == scanner){
			(function(objSCN){ 
				var scnid = objSCN.getProperty('ID');
				var scntype = objSCN.getProperty('scannerType');
				objSCN.enable({},callbackenable);
				setTimeout(function() {
				}, ENABLE8K);
			})(enumData[j]);
		}	
	}
}

function disableScanner(scanner)
{
	for (var j = 0;j<=scanner;j++){
		if(j == scanner){
			(function(objSCN){ 
				objSCN.disable();
				setTimeout(function() {
				}, ENABLE8K);
			})(enumData[j]);
		}	
	}
}

var bluetoothStatus = function (data){
	bluetoothStatusdata = JSON.stringify(data);
	callbackstatus = true;
	BTstatus = data.status;
} 
var i = enumData.length -1;
function enableRSMScanner()
{
	
	(function(objSCN){ 
		var scnid = objSCN.getProperty('ID');
		var scntype = objSCN.getProperty('scannerType');
		enumData[i].connectionIdleTimeout = 30;
		enumData[i].disconnectBtOnDisable = false;
		enumData[i].displayBtAddressBarcodeOnEnable = true;
		enumData[i].disableScannerDuringNavigate = false;
		enumData[i].registerBluetoothStatus(bluetoothStatus);
		enumData[i].enable();
	})(enumData[i]);
}	



function getpropertywithval(id, propertyval){
	var data = enumData[i].getProperty(propertyval);
	var element = "#" + id + " span.result";
	$(element).text(JSON.stringify(data));
}
function softstart(scanner){
	for (var j = 0;j<=scanner;j++){
		if(j == scanner){
			(function(objSCN){ 
				objSCN.start();
				setTimeout(function() {
				}, ENABLE8K);
			})(enumData[j]);
		}	
	}
}

function softstop(scanner){
	for (var j = 0;j<=scanner;j++){
		if(j == scanner){
			(function(objSCN){ 
				objSCN.stop();
				setTimeout(function() {
				}, ENABLE8K);
			})(enumData[j]);
		}	
	}
}	


function setpropertywithval(scanner, propertyname, propertyvalue){
		for (var j = 0;j<=scanner;j++){
		if(j == scanner){
			(function(objSCN){ 
				objSCN.setProperty(propertyname,propertyvalue);
				setTimeout(function() {
				}, ENABLE8K);
			})(enumData[j]);
		}	
	}
}	

function enablealldecoders(scanner, propertyvalue){
		for (var j = 0;j<=scanner;j++){
		if(j == scanner){
			(function(objSCN){ 
				objSCN.alldecoders = propertyvalue;
				setTimeout(function() {
				}, ENABLE8K);
			})(enumData[j]);
		}	
	}
}
function enablecode93(scanner, propertyvalue){
	for (var j = 0;j<=scanner;j++){
		if(j == scanner){
			(function(objSCN){ 
				objSCN.code93 = propertyvalue;
				setTimeout(function() {
				}, ENABLE8K);
			})(enumData[j]);
		}	
	}
}

function showsignaliconleft(pos)
{
	Rho.SignalIndicators.showIcon({left: pos});
}	

function showsignaliconright(pos)
{
	Rho.SignalIndicators.showIcon({right: pos});
}

function hidesignalicon()
{
	Rho.SignalIndicators.hideIcon();
}

var statusCallback = function (args){
  var result = '';
  result += '<br/>signalStrength  :- ' + JSON.stringify(args["signalStrength"]);
  result += '<br/>essid  :- ' + JSON.stringify(args["essid"]);
  result += '<br/>macAddress  :- ' + JSON.stringify(args["macAddress"]);
  result += '<br/>adapterName  :- ' + JSON.stringify(args["adapterName"]);
  result += '<br/>dhcpServer  :- ' + JSON.stringify(args["dhcpServer"]);
  result += '<br/>dhcpStatic  :- ' + JSON.stringify(args["dhcpStatic"]);
  result += '<br/>gateway  :- ' + JSON.stringify(args["gateway"]);
  result += '<br/>ipAddress  :- ' + JSON.stringify(args["ipAddress"]);
  result += '<br/>rssi   :- ' + JSON.stringify(args["rssi"]);
  result += '<br/>subnetMask   :- ' + JSON.stringify(args["subnetMask"]);
  result += '<br/>wins   :- ' + JSON.stringify(args["wins"]);
  displayResult("Output: ",result);
}  

function wlanStatuswithcallback()
{
	Rho.SignalIndicators.wlanStatus(statusCallback);

}

function stopWlanStatussignal()
{
	Rho.SignalIndicators.stopWlanStatus();
}

function showbatteryiconleft(pos)
{
	Rho.Battery.showIcon({left: pos});
}	

function showbatteryiconright(pos)
{
	Rho.Battery.showIcon({right: pos});
}

function hidebatteryicon()
{
	Rho.Battery.hideIcon();
}
var smartBatteryStatusCallback = function (args){
  var result = '';
  result += '<br/>serialNumber: ' + JSON.stringify(args["serialNumber"]);
  result += '<br/>partNumber: ' + JSON.stringify(args["partNumber"]);
  result += '<br/>batteryChargeCycles: ' + JSON.stringify(args["batteryChargeCycles"]);
  result += '<br/>ratedCapacity: ' + JSON.stringify(args["ratedCapacity"]);
  result += '<br/>manufactureDate: ' + JSON.stringify(args["manufactureDate"]);
  result += '<br/>stateOfHealth: ' + JSON.stringify(args["stateOfHealth"]);
  displayResult("Output: ",result);
} 

var batteryStatusCallback = function (args){
	var result = '';
	result += '<br/>AcLineStatus: ' + JSON.stringify(args["acLineStatus"]);
	result += '<br/>BatteryLifePercent: ' + JSON.stringify(args["batteryLifePercent"]);
	result += '<br/>BackupBatteryLifePercent: ' + JSON.stringify(args["backupBatteryLifePercent"]);
	result += '<br/>Trigger: ' + JSON.stringify(args["trigger"]);
	result += '<br/>BatteryLifeKnown: ' + JSON.stringify(args["batteryLifeKnown"]);
	result += '<br/>BackupBatteryLifeKnown: ' + JSON.stringify(args["backupBatteryLifeKnown"]);
	displayResult("Output: ",result);
  } 

function CallsmartBatteryStatus()
{  
	Rho.Battery.smartBatteryStatus(smartBatteryStatusCallback);
}

function CallbatteryStatus()
{
	Rho.Battery.batteryStatus({trigger :'periodic'},batteryStatusCallback);
}

function setDomElementText(id, string){
	var element = "#" + id + " span.result";
	$(element).text(JSON.stringify(string));
}

function createTabbar() {
	var tabs = [
		{'label': 'Tab 0', 'action': '/app/MultiappTest/multiapp_test.html', 'icon': '/public/images/bar/colored_btn.png', 'reload': false},
		{'label': 'Tab 1', 'action': '/app/MultiappTest/multiapp_test.html', 'icon': '/public/images/bar/colored_btn.png', 'reload': false},
		{'label': 'Tab 2', 'action': '/app/MultiappTest/multiapp_test.html', 'icon': '/public/images/bar/colored_btn.png', 'reload': false},
		{'label': 'Tab 3', 'action': '/app/MultiappTest/multiapp_test.html', 'icon': '/public/images/bar/colored_btn.png', 'reload': false},
		{'label': 'Tab 4', 'action': '/app/MultiappTest/multiapp_test.html', 'icon': '/public/images/bar/colored_btn.png', 'reload': false}
	];
	var properties = {'verticalOrientation': false, 'hiddenTabs': false, 'createOnInit': true, 'placeTabsBottom': false};
	Rho.NativeTabbar.create(tabs, properties);
}


function removeTabbar() {
	Rho.NativeTabbar.remove();
}

function doAction(val) {
	var url = "/app/MultiappTest/" + val
	if (window.XMLHttpRequest) {
		var xhr = new window.XMLHttpRequest();
		xhr.open("GET", url, true);
		xhr.send(null);
	} else {
		var xmlHttpReq = new ActiveXObject("Msxml2.XMLHTTP");
		xmlHttpReq.open("GET", url, true);
		xmlHttpReq.send();
	}
}

function setRegistrySetting()
{
	Rho.System.setRegistrySetting({hive: 'HKLM', type: 'Binary', key: 'Software', setting: 'Rho', value: '10101010', persistent: false});
}

function getRegistrySetting(id)
{
	var data = Rho.System.getRegistrySetting({hive: 'HKLM', type: 'Binary', key: 'Software', setting: 'Rho'});	
	var element = "#" + id + " span.result";
	$(element).text(JSON.stringify(data));
}	

function deleteRegistrySetting(id)
{
	var actual = Rho.System.deleteRegistrySetting({hive: 'HKLM', type: 'Binary', key: 'Software', setting: 'Rho'});
	var element = "#" + id + " span.result";
	$(element).text(JSON.stringify(actual));
}
function getkeyboardState()
{
	data = Rho.System.getProperty('keyboardState');
	$("#Rho_System_keyboardState span.result").text(JSON.stringify(data));
}
function gethttpProxyURI()
{
	data = Rho.System.getProperty('httpProxyURI');
	$("#Rho_System_httpProxyURI span.result").text(JSON.stringify(data));
}

function callgetProperty(propertyName)
{
	data = Rho.System.getProperty(propertyName);
	$("#Rho_System_setproperty span.result").text(JSON.stringify(data));
}
function getRandomName()
{
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    for( var i=0; i < 5; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}
 
function makeTableNames(nTables) {
		tableNames = [];
		for (var i = 0; i < nTables; ++i) {
			tableNames.push(getRandomName());
		}
		return tableNames;
	};
	
function createTables(tableNames, id) {
	var statements = [];
	for (var i = 0; i < tableNames.length; ++i) {
		statements.push('CREATE TABLE "' + tableNames[i] + '" (x INTEGER, y TEXT)');
	}
	db.executeBatchSql(statements.join(';'));
	data = tableNames.length
	var element = "#" + id + " span.result";
	$(element).text(JSON.stringify(data));
};
		
function opendatabase_createtable(tables, id)
{
	db = new Rho.Database(Rho.Application.databaseFilePath('local'), 'local');
	tableNames = makeTableNames(tables);
	createTables(tableNames, id);
}	

function destroytables()
{
	db.destroyTables({'include': tableNames, 'exclude': []});
}

function beeperwithvol2()
{
	var propertyMap = {frequency: 1000, volume: 2, duration: 5000};
	Rho.Notification.beep(propertyMap);
}	

function beeperwithvol4()
{
	var propertyMap = {frequency: 1000, volume: 4, duration: 10000};
	Rho.Notification.beep(propertyMap);
}	

function playFileaudionotification()
{
	Rho.Notification.playFile(Rho.RhoFile.join(Rho.Application.modelFolderPath('MultiappTest'), 'media1.mp3'));
}
	
function mediaplayer_audiostart()
{
	var platform = Rho.System.platform;
	var audiolocation = "";

	if (platform == "WINDOWS")
	{
		audiolocation = Rho.RhoFile.join(audioMediaPath, 'badfeeling.wav');
	}
	else if (platform == "ANDROID")
	{
		audiolocation = Rho.RhoFile.join(audioMediaPath, 'super_android_tune.mp3');
	}

	Rho.Mediaplayer.start(audiolocation);	
}	

function mediaplayer_videostart()
{
	var platform = Rho.System.platform;
	var videolocation = "";

	if (platform == "WINDOWS")
	{
		videolocation = Rho.RhoFile.join(videoMediaPath, "test.mp4");
	}
	else if (platform == "ANDROID")
	{
		videolocation = "/mnt/sdcard/test.mp4";
	}

	Rho.Mediaplayer.startvideo(videolocation);
	
}	

function ringtoneCallback(arguments)
{
  var ringtones = arguments;
  global_ringtones = arguments;
  var htmlout = '<select name="choose a ringtone" size="1" id="item1">';
  var keys = getkeys(ringtones);
  ringtone_names = keys;
  for (var i = 0; i < keys.length; i++)
  {
    htmlout += '<option>';
    htmlout += keys[i];
    htmlout += '</option>'
  }
  htmlout += '</select>';
  document.getElementById('ringtones').innerHTML = htmlout;
  callbackCalled = true;
}

function stopthevideo()
{
Rho.Mediaplayer.stopvideo();
}

function playringtone()
{
	Rho.Mediaplayer.getAllRingtones(ringtoneCallback);
	Rho.Mediaplayer.playRingTone(global_ringtones[chosen]);
}
function stoptheringtone()
{
	Rho.Mediaplayer.stopRingTone();
}
function stopaudio()
{
	Rho.Mediaplayer.stop();
}	

function callNavbarcreate()
{
	Rho.Navbar.create({ 'left':{'action':'/app','label':'Back'},'title':'Navbar Test'})
}

function callNavbarcreateright()
{
	Rho.Navbar.create({ 'left':{'action':'/app', 'label':'Back'}, 'right':{'action':'/app/MultiappTest/barcode.html', 'label':'barcode'},'title':'Navbar Test'})
}

function callNavbarremove()
{
	Rho.Navbar.remove()
}

function toolCreate() {
    var toolElements = new Array();
    toolElements = [
        {label: 'back', action: 'back'},
        {label: 'Home', action: 'Home'},
        {action: "separator"},
        {action: '/app/MultiappTest/barcode.html', label: "[BUTTON]"},
        {label: 'refresh', action: 'refresh'},
        {label: 'Options', action: 'options'},
        {label: 'Exit', action: 'exit'}
    ];
    var toolProperties = {backgroundColor: 0x00804F,maskColor: 0xFF0000, viewHeight: 100};
    Rho.NativeToolbar.create(toolElements, toolProperties);
}

function toolRemove() {
    Rho.NativeToolbar.remove();
}

function Createtabbarnew(tabelements, tabbarproperties)
{
	Rho.NativeTabbar.create(tabelements,tabbarproperties);
}
  
function startgoogle()
{
    Rho.Application.startURI= 'http://192.168.6.27/';
}

function startyahoo()
{
    Rho.Application.startURI= 'http://192.168.6.27/vinod';
}

function keyshowstates()
{
	Rho.KeyState.showStates({"width":100})
}

function keyshowstates_all()
{
	Rho.KeyState.showStates({'right':100,'top':150,'height':200,'width':250})
}	

function screenlefthanded()
{
	Rho.ScreenOrientation.leftHanded();
}

function screenupsideDown()
{
	Rho.ScreenOrientation.upsideDown();
}

function screenrightHanded()
{
	Rho.ScreenOrientation.rightHanded();
}

function screennormal()
{
	Rho.ScreenOrientation.normal();
}

var screenorientation_callback = function (data){

	orientationType = data;
	displayResult('DATA:- ',JSON.stringify(orientationType));
	callbackFired = true;

}
	
function callsetScreenOrientationEvent()
{
	Rho.ScreenOrientation.setScreenOrientationEvent(screenorientation_callback);
}

function cleanlog()
{
	Rho.Log.cleanLogFile()
}	

function loginfo()
{
	Rho.Log.info("log view displayed", "VT290-403");
}

function logtrace()
{
	Rho.Log.trace("trace : Application Error Message", "VT29");
}	
var download_file_callback = function (args){
	status = args['status'];
	callbackCalled = true;
}
var fname = Rho.RhoFile.join(imagesDownloadFolder,"network_0049.jpg");
function downloadfile_callback()
{
	downloadfileProps = {
        url: srvHttpDownloadImageUrl,
        filename: fname
    };

    Rho.Network.downloadFile(downloadfileProps, download_file_callback);
}
function downloadfile_nocallback()
{
	downloadfileProps = {
        url: srvHttpDownloadImageUrl,
        filename: fname
    };

    Rho.Network.downloadFile(downloadfileProps);
}
	var data = '';
	var status = '';
var upload_file_callback = function (args){
	status = args['status'];
	data = args['body'];
	callbackCalled = true;
}
function uploadfile_callback()
{	
	var flag = false;
	var callbackCalled = false;
	
	var fname = Rho.RhoFile.join(Rho.Application.publicFolder,"/images/myfile.txt");

	var uploadfileProps = {
	  url: srvHttpUploadTextFileUrl,
	  filename: fname,
	  body: "uploading file",
	  fileContentType: "text/plain"
	};

	var args = Rho.Network.uploadFile(uploadfileProps,upload_file_callback);
}
	
function uploadfile_nocallback()
{	
	var flag = false;
	var callbackCalled = false;
	
	var fname = Rho.RhoFile.join(Rho.Application.publicFolder,"/images/myfile.txt");

	var uploadfileProps = {
	  url: srvHttpUploadTextFileUrl,
	  filename: fname,
	  body: "uploading file",
	  fileContentType: "text/plain"
	};

	var args = Rho.Network.uploadFile(uploadfileProps);
}	
function takecallbackdata(data)
{
	document.getElementById("clbkStatus").innerHTML = data.status;
	document.getElementById("clbkURI").innerHTML = data.imageUri;
    $("#capturedImage").attr('src', data.imageUri);
}
var callbacktake = function (data) {
	//takecallbackdata(JSON.stringify(data));
	takecallbackdata(data);
	takecallbackfired = true;
};
function takesignature()
{		
	Rho.Signature.takeFullScreen({}, callbacktake);		
}	

function showsignature()
{
	Rho.Signature.show();
	
}

function capturesignature()
{
	Rho.Signature.capture(callbacktake);
	
}

function hidesignature()
{
	Rho.Signature.hide();
}

function signatureclear()
{
	Rho.Signature.clear();
}
var callbackVector = function (data) {
	
	//vectorcallbackdata(JSON.stringify(data));
	vectorcallbackdata(data);
	takecallbackfired1 = true;
};	

function vectorcallbackdata(data)
{
	document.getElementById("clbkVector").innerHTML = data.vectorArray;
}

function callsetVectorCallback()
{	
	Rho.Signature.bgColor = '#00FF00';
	Rho.Signature.penColor = '#FF800000';
	Rho.Signature.penWidth = 5;
	Rho.Signature.left = 15;
	Rho.Signature.top = 60;
	Rho.Signature.height = 150;
	Rho.Signature.width = 200;
	Rho.Signature.outputFormat = 'image';
	Rho.Signature.border = false;
	Rho.Signature.fileName = Rho.RhoFile.join(Rho.Application.databaseBlobFolder, 'VT299-025');
	Rho.Signature.compressionFormat = CONST_JPG;
	Rho.Signature.setVectorCallback(callbackVector);
	Rho.Signature.show();
}

function signature_penwidth1()
{
	Rho.Signature.takeFullScreen({'bgColor': '#FF0000FF', 'penColor': '#FFFF00FF', 'penWidth': 1}, callbacktake);
}
function signature_penwidth5()
{
	Rho.Signature.takeFullScreen({'bgColor': '#FF0000FF', 'penColor': '#FFFF00FF', 'penWidth': 5}, callbacktake);
}	
	
var makesensorbytype_callback =  function (args){	
	sensorType = JSON.stringify(args);
	displayResult("Output: ",sensorType);
}

function sensor_accelerometer()
{
	sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_ACCELEROMETER,makesensorbytype_callback);					
}


function sensor_magnetometer()
{
	sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_MAGNETOMETER,makesensorbytype_callback);					
}

function sensor_rotation()
{
	sensorInstance = Rho.Sensor.makeSensorByType(Rho.Sensor.SENSOR_TYPE_ROTATION,makesensorbytype_callback);					
}
function sensor_start()
{
	sensorInstance.start();
}
function sensor_start()
{
	sensorInstance.stop();
}
function getminimumGap()
{
	sensorInstance.getProperty('minimumGap');
}
function getstatus()
{
	sensorInstance.getProperty('status');
}
var displayResult = function (desc, data){
	$('.myList').empty();
    if (desc != "Output: ")
    {
    	var node=document.createElement("LI");
    	var textnode =document.createTextNode(desc);
    	node.appendChild(textnode);
    	document.getElementsByClassName("myList").appendChild(node);
    }
	node = document.createElement("LI");
    textnode = document.createTextNode("Output:");
    node.appendChild(textnode);

    list = document.createElement("ul");
    node.appendChild(list);

    lines = data.split(/\r\n|\r|\n|<br>|<br\/>/g);

    var len = lines.length, i;

    for(i = 0; i < len; i++ )
        lines[i] && lines.push(lines[i]);

    lines.splice(0 , len);

    if (lines.length > 1)
    {
        var time = new Date();
        lines.unshift("Time: " + leftZeroFill(time.getHours(),2) + ":" + leftZeroFill(time.getMinutes(),2) + ":" + leftZeroFill(time.getSeconds(),2) + "." + leftZeroFill(~~(time.getMilliseconds()/10),2));
    }

    Rho.Log.info(lines.join('\n'),"GOT IT!");

    for(var cnt = 0 ; cnt < lines.length; cnt++ )
    {
       list.appendChild(document.createElement("LI")).appendChild(document.createTextNode(lines[cnt]));    
    }
	
	document.getElementsByClassName("myList").appendChild(node);
}
var callbackCardReader = function(args) {
	var result = '';
	result += '<br/>Data:- ' + JSON.stringify(args["data"]);
	result += '<br/>Mode:- ' + JSON.stringify(args["mode"]);
	displayResult("Output: ",result);
};
function opencardreader()
{
	Rho.CardReader.open(callbackCardReader);
}	

function closecardreader()
{
	Rho.CardReader.close();
}
var triggercallback = function (data){
	var trigger = data.triggerFlag
	callbackdata(trigger);
}
function callbackdata(data)
{
	document.getElementById("clbkData").innerHTML = data;
}

function capture_homekeyval_0D(){
	Rho.KeyCapture.homeKeyValue = '0x0D';
}	

function capture_homekeyval_66(){
	Rho.KeyCapture.homeKeyValue = '0x66';
}

function disable_homekeyval(){
	Rho.KeyCapture.homeKeyValue = 'Disabled';
}

function callcaptureKey_0D(){
	Rho.KeyCapture.captureKey(true,'0x0D',triggercallback);
}

function callcaptureKey_66(){
	Rho.KeyCapture.captureKey(true,'0x66',triggercallback);
}
function callcaptureTrigger()
{
	Rho.KeyCapture.captureTrigger(triggercallback);
}	

function callremapKey_enterto1()
{
	Rho.KeyCapture.remapKey('0x0D','0x31');
}

function callremapKey_f1to9()
{
	Rho.KeyCapture.remapKey('0x0170','0x39');
}

