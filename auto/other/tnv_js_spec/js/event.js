function jsReadEvent(data, mode)
{
	resultdiv.innerHTML = "Data:- "+data+"Mode:- "+mode;
	switch(mode)
    {
	
	case 'CR':
		frmCardReader.txtCardData.value =data;
		ProcessCardData(data);
		break;
	case 'ENCDATA':
		frmCardReader.txtCardData.value ="Encrypted data:- "+data;
		break;
	case 'MESSAGE':
		frmCardReader.txtCardData.value ="Error:- "+data;
		break;
	case 'PAN':
		frmCardReader.txtCardData.value ="PAN:- "+data;
	    Message.innerHTML="Message:"+"Please turn the unit over and enter the PIN";
		
		break;		
    }					
}

function jsonReadEvent(jsonObject)
{
	resultdiv.innerHTML = "Message:using json"+jsonObject.data+jsonObject.mode;
	// alert("Data:- "+jsonObject.data+"Mode:- "+jsonObject.mode);

    switch(jsonObject.Mode)
    {
	
	case 'CR':
	   
		frmCardReader.txtCardData.value =jsonObject.Data;
		ProcessCardData(jsonObject.Data);
		break;
	case 'ENCDATA':
		frmCardReader.txtCardData.value ="Encrypted data:- "+jsonObject.Data;
		break;
	case 'MESSAGE':
		frmCardReader.txtCardData.value ="Error:- "+jsonObject.Data;
		break;
	case 'PAN':
		frmCardReader.txtCardData.value ="PAN:- "+jsonObject.Data;
		Message.innerHTML="Message:"+"Please turn the unit over and enter the PIN";
		break;		
    }					

}

function jsKeyEvent(keyValue)
{
 	var txtstring = "<b>JS event fired.Key Captured:</b><br>"; 	
 	txtstring = txtstring + "<br><i>KeyValue: </i> " + keyValue; 	
 	resultdiv.innerHTML = txtstring;

} 

function jsonKeyEvent(jsonObject) 	
{ 	
	
 	var txtstring = "<b>JSON event fired.Key Captured:</b><br>"; 	
 	txtstring = txtstring + "<br><i>KeyValue:</i> " + jsonObject.keyValue; 	
 	resultdiv.innerHTML = txtstring; 	

}

function jsTriggerEvent(triggerValue)
{
 	var txtstring = "<b>JS event fired.Triggered Captured:</b><br>"; 	
 	txtstring = txtstring + "<br><i>Trigger Value: </i> " + triggerValue; 	
 	resultdiv.innerHTML = txtstring;

} 

function jsonTriggerEvent(jsonObject) 	
{ 	
	
 	var txtstring = "<b>JSON event fired.Triggered Captured:</b><br>"; 	
 	txtstring = txtstring + "<br><i>Trigger Value:</i> " + jsonObject.triggerFlag; 	
 	resultdiv.innerHTML = txtstring; 	

}

function myjsenumScannerEvent(scannerArray)
{	
  var txtstring="";
     	for (i = 0; i < scannerArray.length; i++) 	
 	{ 	
		txtstring += 'DeviceName' +  scannerArray[i][0] + ': FriendlyName' + scannerArray[i][1] + '<br>'; 
 	} 	

    resultdiv.innerHTML=txtstring;
}

function myjsonenumScannerEvent(myjsonobject)
{	
    var txtstring="";

    for (i = 0; i < myjsonobject.scannerArray.length; i++) 	
 	{ 	
 	txtstring += 'DeviceNameJson' + myjsonobject.scannerArray[i].deviceName + ': FriendlyName' + myjsonobject.scannerArray[i].friendlyName + '<br>'; 	
 	} 	
 	txtstring += ""; 	
 	resultdiv.innerHTML=txtstring; 	
}


function myjsdecodeEvent(data, source, type, time, length, theEvent) 	
 	{ 	
	
	var txtstring="";
	if(theEvent== "Decode")
	{
		txtstring = 'data:-'+data+'<br>'+'source:-'+source+'<br>'+'type:-'+type+'<br>'+'time:-'+time+'<br>'+'length:-'+length+'<br>'+'Event:-'+theEvent+'<br>';
		//"data:"+data+" source"+source+" type"+type+" Time"+time+" length"+length+" theEvent"+theEvent;
		resultdiv.innerHTML=txtstring;
	}
 	} 	

function myjsondecodeEvent(jsonObject) 	
{ 	
	
 	var txtstring = "<b>Decoded Data:</b><br>"; 	
 	txtstring = txtstring + "<br><i>Data:</i> " + jsonObject.data; 	
 	txtstring = txtstring + "<br><i>Source:</i> " + jsonObject.source; 	
 	txtstring = txtstring + "<br><i>Type:</i> " + jsonObject.type; 	
 	txtstring = txtstring + "<br><i>Time:</i> " + jsonObject.time; 	
 	txtstring = txtstring + "<br><i>Length:</i> " + jsonObject.length; 	
 	txtstring = txtstring + "<br><i>Event:</i> " + jsonObject.event; 	
 	resultdiv.innerHTML = txtstring; 	
    
}

function myjsondecode(jsonObject) 	
{ 	
    signatureBarcode.src = jsonObject.data;

}


	function onSignatureCapture(jsonObject)
	{
		signatureImage.src = jsonObject.imageData;
	}


var theOutput="<b>Application State is:</b> ";
var count = 0;
function doAlarm()
{
	count++;
	var txtstring = "<b>Alarm Triggered:</b><br>"; 	
 	txtstring = txtstring + "Count = " + count; 	
 	resultdiv.innerHTML = txtstring;
}

function jsApplicationEvent(applicationState)
{
theOutput += applicationState;
resultdiv.innerHTML = theOutput;
}

function jsbacklightSettingsEvent(intensity,intensityRange,state)
  {
              var theOutput = "<B>Backlight State:</B>" + state + "<P>";
              theOutput = theOutput + "<B>Backlight Intensity:</b> " + intensity + "<P>";
              theOutput = theOutput + "<b>Backlight Intensity Range:</b><P>";
              for (var i=0; i<intensityRange.length; i = i + 1)
              {
                      theOutput = theOutput + intensityRange[i] + "<BR>";
              }
              theOutput = theOutput + "<P>";
              resultdiv.innerHTML = theOutput;
    }
	
	function jsonbacklightSettingsEvent(jsonObject)
  {
              var theOutput = "<B>Backlight State:</B>" + jsonObject.state + "<P>";
              theOutput = theOutput + "<B>Backlight Intensity:</b> " + jsonObject.intensity + "<P>";
              theOutput = theOutput + "<b>Backlight Intensity Range:</b><P>";
              for (var i=0; i<jsonObject.intensityRange.length; i = i + 1)
              {
                      theOutput = theOutput + jsonObject.intensityRange[i] + "<BR>";
              }
              theOutput = theOutput + "<P>";
              resultdiv.innerHTML = theOutput;
    }

function jsEnumNotificationsEvent(ntArray) 
{
  var html = "<table border=1>";
	for(i=0; i<ntArray.length; i++)	{
			html+='<tr><td><input type=button value="Invoke" onclick="doNot(' + ntArray[i][NTFY_INDEX] + ', ' 
				+ ntArray[i][NTFY_TYPE] + ');"></td><td>' 
				+ ntArray[i][NTFY_NAME] + '</td><td>'
				+ ((ntArray[i][NTFY_TYPE]==NTFY_UNKNOWN)?'UNKNOWN':notType[ntArray[i][NTFY_TYPE]]) + '</td></tr>';
	}
	html+="</table>";
	resultdiv.innerHTML = html;
  
}

function jsonEnumNotificationsEvent(jsonObject) 
{
  var html = "<table border=1>";
	for(i=0; i<jsonObject.notificationsArray.length; i++)	{
			html+='<tr><td><input type=button value="Invoke" onclick="doNot(' + jsonObject.notificationsArray[i].notificationIndex + ', ' 
				+ jsonObject.notificationsArray[i].notificationType + ');"></td><td>' 
				+ jsonObject.notificationsArray[i].notificationName + '</td><td>'
				+ ((jsonObject.notificationsArray[i].notificationType==NTFY_UNKNOWN)?'UNKNOWN':notType[jsonObject.notificationsArray[i].notificationType]) + '</td></tr>';
		
	}
	html+="</table>";
	resultdiv.innerHTML = html;
  
}

function jsScreenOrientationEvent(orientation)
{
//alert("Current Screen orientation using javascript is:"+orientation);
count=count+1;
resultdiv.innerHTML = "Current Screen orientation using javascript is:"+orientation+"Count:-"+count;
}

function jsonScreenOrientationEvent(jsonObject)
{
//alert("Current Screen orientation using json is:"+jsonObject.orientation);
resultdiv.innerHTML="Current Screen orientation using json is:"+jsonObject.orientation;
}

function jsTimeout(time)
{
//alert("Current time using javascript is:"+time);
resultdiv.innerHTML = "Current time is using javascript is:"+time;
}

function jsonTimeout(jsonObject)
{
//alert("Current time using json is:"+jsonObject.time);
resultdiv.innerHTML = "Current time using json is:"+jsonObject.time;
}

function jsTransferEvent(transferResult)
{
	resultdiv.innerHTML ="TransferResult= " + transferResult;
}

function jsonTransferEvent(myjsonobject)
{
	resultdiv.innerHTML = "JSON TransferResult= " + myjsonobject.transferResult;
}
function jsaudioTransferEvent(transferResult)
{
	resultdiv.innerHTML ="TransferResult= " + transferResult;
}

function jsonaudioTransferEvent(myjsonobject)
{
	resultdiv.innerHTML = "JSON TransferResult= " + myjsonobject.transferResult;
}

function jsvideoTransferEvent(transferResult)
{
	resultdiv.innerHTML ="TransferResult= " + transferResult;
}

function jsonvideoTransferEvent(myjsonobject)
{
	resultdiv.innerHTML = "JSON TransferResult= " + myjsonobject.transferResult;
}

function doLocatejs(func) 
    {
		var bNotify = false;
        if (func == 'locate') {
            alert("javascript");
            resultdiv.innerHTML = '<center><pre>Someone is trying to locate this device<br><br><input type="button" value="CANCEL" onclick="bNotify=false;locatediv.innerHTML=\'\';"></center></pre>';
			bNotify = true;
        }
        else {
            resultdiv.innerHTML = '';
            bNotify = false;
        }


    }
    
     function doLocatejson(jsonObject) 
     {  
	 var bNotify = false;
        if (jsonObject.value == "locate") 
        {
            alert("json2");
            resultdiv.innerHTML = '<center><pre>Someone is trying to locate this device<br><br><input type="button" value="CANCEL" onclick="bNotify=false;locatediv.innerHTML=\'\';"></center></pre>';
            bNotify = true;
        }
        else {
            resultdiv.innerHTML = '';
            bNotify = false;
        }


    }


function JSONimagerEnumEvent(json)
{
	var txtstring="";
     	for (i = 0; i < json.imagerArray.length; i++) 	
 	{ 	
		
		txtstring += 'DeviceNameJson:' + json.imagerArray[i].deviceName + ': FriendlyName' + json.imagerArray[i].friendlyName + '<br>'; 	
 	} 	

    resultdiv.innerHTML=txtstring;
}
function JSimagerEnumEvent(imagerArray)
{      
	var txtstring="";
     	for (i = 0; i < imagerArray.length; i++) 	
 	{ 	
		txtstring += 'DeviceNameJS:' +  imagerArray[i][0] + ': FriendlyName:' + imagerArray[i][1] + '<br>'; 
 	} 	

    resultdiv.innerHTML=txtstring;
}
function JSimagerEvent(transferResult)
{
var ImagerInfo = "Imagers captured "+transferResult;
resultdiv.innerHTML =ImagerInfo;
}

function JSONimagerEvent(myjsonobject)
{
	resultdiv.innerHTML = "JSON Imager TransferResult= " + myjsonobject.transferResult;
}

function onImageCapture(jsonObject)
    {
		capturedImage.src = jsonObject.imageData;
	}

function jssignalEvent(signalStrength, essid, macAddress, adapterName, dhcpServer, dhcpStatic, gateway, ipAddress, rssi, subnetMask, wins)
{	
    var txtstring="";
	//alert("js signal event Fired");
    txtstring = "JavaScript_SIGNAL_EVENT:  "+"Signal: " + signalStrength
								+ "<BR>ESSID:" + essid
								+ "<BR>MAC: " + macAddress
								+ "<BR>AdapterName: " + adapterName
								+ "<BR>DHCPServer: " + dhcpServer
								+ "<BR>DHCPStatic: " + dhcpStatic
								+ "<BR>Gateway: " + gateway
								+ "<BR>IPAddress: " + ipAddress
								+ "<BR>RSSI: " + rssi
								+ "<BR>SubnetMask: " + subnetMask
								+ "<BR>Wins: " + wins ;
   resultdiv.innerHTML=txtstring; 	
}

function jsonsignalEvent(json)
{	
  var txtstring="";
  //alert("json signal event Fired");
   txtstring = "JSON_SIGNAL_EVENT:  "+"Signal: " + json.signalStrength
								+ "<BR>ESSID:" + json.essid
								+ "<BR>MAC: " + json.macAddress
								+ "<BR>AdapterName: " + json.adapterName
								+ "<BR>DHCPServer: " + json.dhcpServer
								+ "<BR>DHCPStatic: " + json.dhcpStatic
								+ "<BR>Gateway: " + json.gateway
								+ "<BR>IPAddress: " + json.ipAddress
								+ "<BR>RSSI: " + json.rssi
								+ "<BR>SubnetMask: " + json.subnetMask
								+ "<BR>Wins: " + json.wins;


    resultdiv.innerHTML=txtstring;
}


function jsbatteryEvent(acLineStatus, batteryLifePercent, backupBatteryLifePercent, EventSource) 	
 	{ 	
	//alert("js battery event Fired");
	var txtstring="";
	txtstring  = "JavaScript_BATTERY_EVENT:  "+"acLineStatus: "+ acLineStatus + "<BR>"        
                 + "batteryLifePercent: " + batteryLifePercent  + "<BR>"
                 + "backupBatteryLifePercent: " + backupBatteryLifePercent  + "<BR>"
                 + "eventSource: " + EventSource  + "<BR>";

	 resultdiv.innerHTML=txtstring;

 	} 	

function jsonbatteryEvent(jsonObject) 	
 	{ 	
	//alert("json battery event Fired");
	var txtstring="";
	txtstring  = "JSON_BATTERY_EVENT:  "+"acLineStatus: "+jsonObject.acLineStatus + "<BR>"        
                 + "batteryLifePercent: " + jsonObject.batteryLifePercent  + "<BR>"
                 + "backupBatteryLifePercent: " + jsonObject.backupBatteryLifePercent  + "<BR>"
                 + "eventSource: " + jsonObject.eventSource  + "<BR>";

	 resultdiv.innerHTML=txtstring;

 	} 
	
	
function jssmartBatteryEvent(serialNumber, partNumber, batteryChargeCycles, ratedCapacity, manufactureDate, stateOfHealth) 	
 	{ 	
	//alert("js smart battery event Fired");
	var txtstring="";
	txtstring  =  "JavaScript_SMART_EVENT:  "+"serialNumber: "+ serialNumber + "<BR>"        
                  + "partNumber: " + partNumber  + "<BR>"
                  + "batteryChargeCycles: " + batteryChargeCycles  + "<BR>"
                  + "ratedCapacity: "+ ratedCapacity + "<BR>"        
                  + "manufactureDate: " + manufactureDate  + "<BR>"
                  + "stateOfHealth: " + stateOfHealth  + "<BR>";

	 resultdiv.innerHTML=txtstring;

 	} 	
	
	
	function jsonsmartBatteryEvent(serialNumber, partNumber, batteryChargeCycles, ratedCapacity, manufactureDate, stateOfHealth) 	
 	{ 	
	//alert("json smart battery event Fired");
	var txtstring="";
	txtstring  =  "JSON_SMART_EVENT:  "+"serialNumber: "+jsonObject.serialNumber + "<BR>"        
                  + "partNumber: " + jsonObject.partNumber  + "<BR>"
                  + "batteryChargeCycles: " + jsonObject.batteryChargeCycles  + "<BR>"
                  + "ratedCapacity: "+jsonObject.ratedCapacity + "<BR>"        
                  + "manufactureDate: " + jsonObject.manufactureDate  + "<BR>"
                  + "stateOfHealth: " + jsonObject.stateOfHealth  + "<BR>";

	 resultdiv.innerHTML=txtstring;

 	} 	
	
	function jsSensorEvent(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,a1,b1,c1,d1,e1,f1,g1)
	{
		var theOutput = "<BR><BR><B>Accelerometer  </B>";        
        theOutput = theOutput + "X: " + a + ", Y: " + b + ", Z: " + c + "<BR>";
		theOutput = theOutput + "<B>DeviceOrientation  </B>";  
		theOutput = theOutput + "X: " + d  + "<BR>";
        theOutput = theOutput + "<B>Tilt  </B>";
        theOutput = theOutput + "X: " + e  + ", Y: " + f  + ", Z: " + g  + "<BR>";
        theOutput = theOutput + "<B>Motion  </B>";
        theOutput = theOutput + "X: " + h  + "<BR>";
        theOutput = theOutput + "<B>Ecompass  </B>";
        theOutput = theOutput + "X: " + i  + "<BR>";
        theOutput = theOutput + "<B>Magnetometer  </B>";
        theOutput = theOutput + "X: " + j  + ", Y: " + k  + ", Z: " + l  + "<BR>";
        theOutput = theOutput + "<B>Gyroscope  </B>";
        theOutput = theOutput + "X: " + m  + ", Y: " + n + ", Z: " + o  + "<BR>";
        theOutput = theOutput + "<B>AmbientLight  </B>";
        theOutput = theOutput + "X: " + p  + "<BR>";
        theOutput = theOutput + "<B>Proximity  </B>";
        theOutput = theOutput + "X: " + q  + "<BR>";
        theOutput = theOutput + "<B>Proximitylongrange  </B>";
        theOutput = theOutput + "X: " + r  + "<BR>";
        theOutput = theOutput + "<B>Pressure  </B>";
        theOutput = theOutput + "X: " + s  + "<BR>";
        theOutput = theOutput + "<B>Temperature  </B>";
        theOutput = theOutput + "X: " + t  + "<BR>";
        theOutput = theOutput + "<B>Humidity  </B>";
        theOutput = theOutput + "X: " + u  + "<BR>";
        theOutput = theOutput + "<B>Gravity  </B>";
        theOutput = theOutput + "X: " + v  + ", Y: " + w  + ", Z: " + x  + "<BR>";
        theOutput = theOutput + "<B>Linear Acceleration  </B>";
        theOutput = theOutput + "X: " + y  + ", Y: " + z + ", Z: " + a1  + "<BR>";
        theOutput = theOutput + "<B>Rotation  </B>";
        theOutput = theOutput + "X: " + b1  + ", Y: " + c1  + ", Z: " + d1  + "<BR>";
        theOutput = theOutput + "<B>Orientation  </B>";
        theOutput = theOutput + "X: " + e1 + ", Y: " + f1  + ", Z: " + g1 + "<BR>";
		resultdiv.innerHTML = "JSObject"+theOutput;
	}
	
	function jsonSensorEvent(jsonObject)
	{
		var theOutput = "<BR><BR><B>Accelerometer  </B>";        
        theOutput = theOutput + "X: " + jsonObject.accelerometerX + ", Y: " + jsonObject.accelerometerY + ", Z: " + jsonObject.accelerometerZ + "<BR>";
        theOutput = theOutput + "<B>DeviceOrientation  </B>";        
        theOutput = theOutput + "X: " + jsonObject.deviceOrientation  + "<BR>";
        theOutput = theOutput + "<B>Tilt  </B>";
        theOutput = theOutput + "X: " + jsonObject.tiltangleX  + ", Y: " + jsonObject.tiltangleY  + ", Z: " + jsonObject.tiltangleZ  + "<BR>";
        theOutput = theOutput + "<B>Motion  </B>";
        theOutput = theOutput + "X: " + jsonObject.motion  + "<BR>";
        theOutput = theOutput + "<B>Ecompass  </B>";
        theOutput = theOutput + "X: " + jsonObject.ecompass  + "<BR>";
        theOutput = theOutput + "<B>Magnetometer  </B>";
        theOutput = theOutput + "X: " + jsonObject.magnetometerX  + ", Y: " + jsonObject.magnetometerY  + ", Z: " + jsonObject.magnetometerZ  + "<BR>";
        theOutput = theOutput + "<B>Gyroscope  </B>";
        theOutput = theOutput + "X: " + jsonObject.gyroscopeX  + ", Y: " + jsonObject.gyroscopeY  + ", Z: " + jsonObject.gyroscopeZ  + "<BR>";
        theOutput = theOutput + "<B>AmbientLight  </B>";
        theOutput = theOutput + "X: " + jsonObject.ambientLight  + "<BR>";
        theOutput = theOutput + "<B>Proximity  </B>";
        theOutput = theOutput + "X: " + jsonObject.proximity  + "<BR>";
        theOutput = theOutput + "<B>Proximitylongrange  </B>";
        theOutput = theOutput + "X: " + jsonObject.proximitylongrange  + "<BR>";
        theOutput = theOutput + "<B>Pressure  </B>";
        theOutput = theOutput + "X: " + jsonObject.pressure  + "<BR>";
        theOutput = theOutput + "<B>Temperature  </B>";
        theOutput = theOutput + "X: " + jsonObject.temperature  + "<BR>";
        theOutput = theOutput + "<B>Humidity  </B>";
        theOutput = theOutput + "X: " + jsonObject.humidity  + "<BR>";
        theOutput = theOutput + "<B>Gravity  </B>";
        theOutput = theOutput + "X: " + jsonObject.gravityX  + ", Y: " + jsonObject.gravityY  + ", Z: " + jsonObject.gravityZ  + "<BR>";
        theOutput = theOutput + "<B>Linear Acceleration  </B>";
        theOutput = theOutput + "X: " + jsonObject.linearAccelerationX  + ", Y: " + jsonObject.linearAccelerationY  + ", Z: " + jsonObject.linearAccelerationZ  + "<BR>";
        theOutput = theOutput + "<B>Rotation  </B>";
        theOutput = theOutput + "X: " + jsonObject.rotationX  + ", Y: " + jsonObject.rotationY  + ", Z: " + jsonObject.rotationZ  + "<BR>";
        theOutput = theOutput + "<B>Orientation  </B>";
        theOutput = theOutput + "X: " + jsonObject.orientationX  + ", Y: " + jsonObject.orientationY  + ", Z: " + jsonObject.orientationZ  + "<BR>";
        resultdiv.innerHTML = "JSON"+theOutput;
}

function jsKeyEvent(keyValue)
{
 	var txtstring = "<b>JS event fired.Key Captured:</b><br>"; 	
 	txtstring = txtstring + "<br><i>KeyValue: </i> " + keyValue; 	
 	resultdiv.innerHTML = txtstring;

} 

function jsonKeyEvent(jsonObject) 	
{ 	
	
 	var txtstring = "<b>JSON event fired.Key Captured:</b><br>"; 	
 	txtstring = txtstring + "<br><i>KeyValue:</i> " + jsonObject.keyValue; 	
 	resultdiv.innerHTML = txtstring; 	

}

function jsTriggerEvent(triggerValue)
{
 	var txtstring = "<b>JS event fired.Triggered Captured:</b><br>"; 	
 	txtstring = txtstring + "<br><i>Trigger Value: </i> " + triggerValue; 	
 	resultdiv.innerHTML = txtstring;

} 

function jsonTriggerEvent(jsonObject) 	
{ 	
	
 	var txtstring = "<b>JSON event fired.Triggered Captured:</b><br>"; 	
 	txtstring = txtstring + "<br><i>Trigger Value:</i> " + jsonObject.triggerFlag; 	
 	resultdiv.innerHTML = txtstring; 	

}