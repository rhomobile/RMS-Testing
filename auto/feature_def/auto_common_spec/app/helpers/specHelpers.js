
/* Basic test methods */

function isAndroidPlatform() {
    return "ANDROID" == Rho.System.platform;
}

function isApplePlatform() {
    return "APPLE" == Rho.System.platform;
}

function isWindowsMobilePlatform() {
    return "WINDOWS" == Rho.System.platform;
}

function isWindowsDesktopPlatform() {
    return "WINDOWS_DESKTOP" == Rho.System.platform;
}

function isWindowsPhone8Platform() {
    return "WP8" == Rho.System.platform;
}

/* Complex test methods */

function isAnyWindowsFamilyPlatform() {
    return isWindowsMobilePlatform() || isWindowsDesktopPlatform() || isWindowsPhone8Platform();
}

function isWindowsMobileOrWindowsDesktopPlatform() {
    return isWindowsMobilePlatform() || isWindowsDesktopPlatform();
}

function isAnyButWindowsFamilyPlatform() {
     return !isAnyWindowsFamilyPlatform();
}

function isAnyButApplePlatform() {
    return !isApplePlatform();
}

function isAnyButAppleAndWindowsMobilePlatform() {
    return !(isApplePlatform() || isWindowsMobilePlatform());
}

function isWindowsMobileOrAndroidPlatform() {
    return isAndroidPlatform() || isWindowsMobilePlatform();
}

function isAndroidOrApplePlatform() {
    return isAndroidPlatform() || isApplePlatform();
}

//Add user log to log file.
var writeIntoLog = function (desc, data){
		
}

//Display Results on Device
var displayResult = function (desc, data){
	var node=document.createElement("LI");
	var textnode =document.createTextNode(desc);
	node.appendChild(textnode);
	document.getElementById("myList").appendChild(node);
	node = document.createElement("LI");
	var output = "Output:"+ '<br/>' + data;
	textnode=document.createTextNode(output);
	node.appendChild(textnode);
	document.getElementById("myList").appendChild(node);
}

var dispCurrentProcess = function (data){
	document.getElementById('detailsdiv').innerHTML = data;
}

// Get Random Name {Used in Database to get Random table name for each test}
function getRandomName()
{
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    for( var i=0; i < 5; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}

var testApplicable = function (arrOSTypes){
    var platform = Rho.System.platform;
    return (jQuery.inArray(platform, arrOSTypes) == -1) ? false : true ;
}