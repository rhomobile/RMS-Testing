function setapplicationIconBadge(iconbadgeValue)
{
	Rho.System.applicationIconBadge=iconbadgeValue;
}

function getapplicationIconBadge()
{
	data = Rho.System.getProperty('applicationIconBadge');
	$("#Rho_System_getapplicationIconBadge span.result").text($.toJSON(data));
}

function sethttpProxyURI()
{
	Rho.System.httpProxyURI='http://wwwgate0.mot.com:1080';
}

function gethttpProxyURI()
{
	data = Rho.System.getProperty('httpProxyURI');
	$("#Rho_System_httpProxyURI span.result").text($.toJSON(data));
}

function getisEmulator()
{
	data = Rho.System.getProperty('isEmulator');
	$("#Rho_System_isEmulator span.result").text($.toJSON(data));
}

function setlockWindowSize(lockwindowsizeValue)
{
	Rho.System.lockWindowSize=lockwindowsizeValue;
}

function getlockWindowSize()
{
	data = Rho.System.getProperty('lockWindowSize');
	$("#Rho_System_lockWindowSize span.result").text($.toJSON(data));
}

function setscreenAutoRotate(autorotateValue)
{
	Rho.System.screenAutoRotate=autorotateValue;
}

function getscreenAutoRotate()
{
	data = Rho.System.getProperty('screenAutoRotate');
	$("#Rho_System_screenAutoRotate span.result").text($.toJSON(data));
}

function getscreenOrientation()
{
	data = Rho.System.getProperty('screenOrientation');
	$("#Rho_System_screenOrientation span.result").text($.toJSON(data));
}

function setscreenSleeping(screensleepingValue)
{
	Rho.System.screenSleeping=screensleepingValue;
}

function getscreenSleeping()
{
	data = Rho.System.getProperty('screenSleeping');
	$("#Rho_System_screenSleeping span.result").text($.toJSON(data));
}

function setkeyboardState(keyboardstatValue)
{
	Rho.System.keyboardState=keyboardstatValue;
}

function getkeyboardState()
{
	data = Rho.System.getProperty('keyboardState');
	$("#Rho_System_keyboardState span.result").text($.toJSON(data));
}

function callapplicationInstall(applicationUrl)
{
	
	Rho.System.applicationInstall(applicationUrl);
}

function callapplicationUninstall(applicationName)
{
	
	Rho.System.applicationUninstall(applicationName);
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

function callisApplicationInstalled(appinstalledValue)
{
	data = Rho.System.isApplicationInstalled(appinstalledValue)
	if(data == 1)
		alert(appinstalledValue+" application is installed in the device");
	else
		alert(appinstalledValue+" application is not installed in the device");
}

function callopenUrl(openurlValue)
{
	Rho.System.openUrl(openurlValue);
}

function callreplaceCurrentBundle()
{
	//Need to add path and hash
	Rho.System.replaceCurrentBundle("http://192.168.6.27/filestoinstall/", {});
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
	$("#Rho_System_setproperty span.result").text($.toJSON(data));
}

function callsetProperties(propertyName, propertyValue)
{
	Rho.System.setProperties({ propertyName:propertyValue });
}

function callgetProperties(propertyName)
{
	data = Rho.System.getProperties([propertyName]);
	$("#Rho_System_getProperties span.result").text($.toJSON(data));
}





