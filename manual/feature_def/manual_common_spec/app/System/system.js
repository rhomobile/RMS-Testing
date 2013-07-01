function getapplicationIconBadge()
{
	data = Rho.System.getProperty('applicationIconBadge');
	$("#Rho_System_getapplicationIconBadge span.result").text(JSON.stringify(data));
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

function getlockWindowSize()
{
	//data = Rho.System.getProperty('lockWindowSize');
	data = Rho.System.lockWindowSize;
	$("#Rho_System_lockWindowSize span.result").text(JSON.stringify(data));
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

function getscreenSleeping()
{
	data = Rho.System.getProperty('screenSleeping');
	$("#Rho_System_screenSleeping span.result").text(JSON.stringify(data));
}

function getkeyboardState()
{
	data = Rho.System.getProperty('keyboardState');
	$("#Rho_System_keyboardState span.result").text(JSON.stringify(data));
}


function callisApplicationInstalled(aString) {
    var isInstalled = Rho.System.isApplicationInstalled(aString)
    if (isInstalled)
        alert(aString + " application is installed in the device");
    else
        alert(aString + " application is not installed in the device");
}

function callreplaceCurrentBundleWindows()
{
	Rho.System.replaceCurrentBundle("httpServerUrl+'/download_app?device=wm'", {do_not_restart_app:false, not_thread_mode:true});
}

function callreplaceCurrentBundleAndroid()
{
	Rho.System.replaceCurrentBundle("httpServerUrl+'/download_app?device=android'", {do_not_restart_app:false, not_thread_mode:true});
}

function callreplaceCurrentBundlewin32()
{
	Rho.System.replaceCurrentBundle("httpServerUrl+'/download_app?device=win32'", {do_not_restart_app:false, not_thread_mode:true});
}

function callreplaceCurrentBundlewp8()
{
	Rho.System.replaceCurrentBundle("httpServerUrl+'/download_app?device=wp8'", {do_not_restart_app:false, not_thread_mode:true});
}

function callreplaceCurrentBundlece()
{
	Rho.System.replaceCurrentBundle("httpServerUrl+'/download_app?device=wp8'", {do_not_restart_app:false, not_thread_mode:true});
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
                filename: fname,
                overwriteFile: true
            };

    Rho.Network.downloadFile(downloadfileProps);
	return fname;
}



