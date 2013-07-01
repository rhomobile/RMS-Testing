function setapplicationIconBadge(iconbadgeValue)
{
	Rho.System.applicationIconBadge=iconbadgeValue;
}

function getapplicationIconBadge()
{
	data = Rho.System.getProperty('applicationIconBadge');
	$("#Rho_System_getapplicationIconBadge span.result").text(JSON.stringify(data));
}

function sethttpProxyURI()
{
	Rho.System.httpProxyURI='http://wwwgate0.mot.com:1080';
}

function gethttpProxyURI()
{
	data = Rho.System.getProperty('httpProxyURI');
	$("#Rho_System_httpProxyURI span.result").text(JSON.stringify(data));
}

function getisEmulator()
{
	data = Rho.System.getProperty('isEmulator');
	$("#Rho_System_isEmulator span.result").text(JSON.stringify(data));
}

function setlockWindowSize(lockwindowsizeValue)
{
	Rho.System.lockWindowSize=lockwindowsizeValue;
}

function getlockWindowSize()
{
	//data = Rho.System.getProperty('lockWindowSize');
	data = Rho.System.lockWindowSize;
	$("#Rho_System_lockWindowSize span.result").text(JSON.stringify(data));
}

function setscreenAutoRotate(autorotateValue)
{
	Rho.System.screenAutoRotate=autorotateValue;
}

function getscreenAutoRotate()
{
	data = Rho.System.getProperty('screenAutoRotate');
	$("#Rho_System_screenAutoRotate span.result").text(JSON.stringify(data));
}

function getscreenOrientation()
{
	data = Rho.System.getProperty('screenOrientation');
	$("#Rho_System_screenOrientation span.result").text(JSON.stringify(data));
}

function setscreenSleeping(screensleepingValue)
{
	Rho.System.screenSleeping=screensleepingValue;
}

function getscreenSleeping()
{
	data = Rho.System.getProperty('screenSleeping');
	$("#Rho_System_screenSleeping span.result").text(JSON.stringify(data));
}

function setkeyboardState(keyboardstatValue)
{
	Rho.System.keyboardState=keyboardstatValue;
}

function getkeyboardState()
{
	data = Rho.System.getProperty('keyboardState');
	$("#Rho_System_keyboardState span.result").text(JSON.stringify(data));
}


function callbringToFront()
{
	Rho.System.bringToFront();
}

function calldeleteFolder(deletefolderValue)
{
	Rho.System.deleteFolder(deletefolderValue);
}

function callgetStartParams()
{
	var getStartParamsValue = new Array();
	getStartParamsValue = Rho.System.getStartParams();
	alert(getStartParamsValue);
}

function callisApplicationInstalled(aString) {
    var isInstalled = Rho.System.isApplicationInstalled(aString)
    if (isInstalled)
        alert(aString + " application is installed in the device");
    else
        alert(aString + " application is not installed in the device");
}

function callopenUrl(openurlValue)
{
	Rho.System.openUrl(openurlValue);
}

function callreplaceCurrentBundleWindows()
{
	Rho.System.replaceCurrentBundle("http://'+server2+'/SystemJS.cab", {do_not_restart_app:false, not_thread_mode:true});
}

function callreplaceCurrentBundleAndroid()
{
	Rho.System.replaceCurrentBundle("http://'+server2+'/SystemJS.apk", {do_not_restart_app:false, not_thread_mode:true});
}

function CallsetDoNotBackupAttribute(pathValue, doNotBackupValue)
{
	Rho.System.setDoNotBackupAttribute(pathValue, doNotBackupValue);
}

function callsetProperty(propertyName, propertyValue)
{
	Rho.System.setProperty(propertyName,propertyValue);
}

function callgetProperty(propertyName)
{
	data = Rho.System.getProperty(propertyName);
	$("#Rho_System_setproperty span.result").text(JSON.stringify(data));
}

function callsetProperties(propertyName, propertyValue)
{
    var properties = {};
    properties[propertyName] = propertyValue;
	Rho.System.setProperties(properties);
}

function callgetProperties(propertyName)
{
	data = Rho.System.getProperties([propertyName]);
	$("#Rho_System_getProperties span.result").text(JSON.stringify(data));
}

function download_filetolocal(srvHttpDownloadImageUrl, filetoinstall)
{
	var file = filetoinstall;
	var fname = Rho.RhoFile.join(Rho.Application.userFolder, file);
	downloadfileProps = {
                url: srvHttpDownloadImageUrl,
                filename: fname
            };
	
    Rho.Network.downloadFile(downloadfileProps);
	return fname;
}



