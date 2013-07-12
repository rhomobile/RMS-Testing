
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

function leftZeroFill(number, targetLength) {
    var output = number + '';
    while (output.length < targetLength) {
        output = '0' + output;
    }
    return output;
}

//Display Results on Device
var displayResult = function (desc, data){
    $('#myList').empty();
    if (desc != "Output: ")
    {
        var node=document.createElement("LI");
        var textnode =document.createTextNode(desc);
        node.appendChild(textnode);
        document.getElementById("myList").appendChild(node);
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