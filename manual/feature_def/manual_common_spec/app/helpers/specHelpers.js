
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
	$('#myList').empty();
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

//Add Html Element Dynamically
function add(type) {
 
    //Create an input type dynamically.
    var element = document.createElement("input");
 
    //Assign different attributes to the element.
    element.setAttribute("type", type);
    element.setAttribute("value", type);
    element.setAttribute("name", type);
    element.setAttribute("id", type);
 
 
    var foo = document.getElementById("fooBar");
 
    //Append the element in page (in span).
    foo.appendChild(element);
 
}

var testApplicable = function (arrOSTypes){
    var platform = Rho.System.platform;
    return (jQuery.inArray(platform, arrOSTypes) == -1) ? false : true ;
}