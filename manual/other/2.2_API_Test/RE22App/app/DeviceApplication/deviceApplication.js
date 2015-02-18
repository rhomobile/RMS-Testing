var count = 0;
var notificationEnumLength = 0;
var notificationEnumObj = null;
var temp = "";
// VT187-1454 : callback for enumeration
function doFunction(data){
	var arrLen = data.notificationsArray.length;
	notificationEnumObj = data.notificationsArray;
	notificationEnumLength = data.notificationsArray.length;
	var outPut = "";
	for(var i=0; i<arrLen; i++){
		outPut = outPut + JSON.stringify(data.notificationsArray[i]);
	}
	main.displayResult(outPut);
};

// VT187-1382 : callback for application versionEvent 
function versionHandler(data){
	main.displayResult(JSON.stringify(data));
};

// General callback for alarm test cases
var doAlarm = function(){
    count++;
   	var sig = "Alarm Triggered";
    sig += "<br/> Count = "+count;
    main.displayResult(sig);
};

//V187-2261 : screenOrienCB
var screenOrienCB = function(data){
	main.displayResult(JSON.stringify(data));
};

function mytimeoutjs(time){
var sig = document.getElementById("actualResult"); 
sig.innerHTML="Current time is using javascript is:"+time;
};

//VT187-1483 : powerOnCB
var powerOnCB = function(data){
	main.displayResult(JSON.stringify(data));
};

// VTID 1370
var applicationStateHandler = function(data){
	temp = temp + "<br/>" + JSON.stringify(data);
	main.displayResult(temp);
}
