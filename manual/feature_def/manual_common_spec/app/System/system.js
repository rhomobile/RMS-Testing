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

function rhobundle_getfilename()
{
    return Rho.RhoFile.join( Rho.Application.bundleFolder, '/RhoBundle/upgrade_bundle.zip');
}

function rhobundle_download(download_url)
{
    var file_name = rhobundle_getfilename();
    var dir_name = Rho.RhoFile.dirname(file_name);
    if ( Rho.RhoFile.exists(dir_name) )
    {
        Rho.RhoFile.deleteRecursive(dir_name);
    }
    
    if ( !Rho.RhoFile.exists(dir_name) )
    {
        Rho.RhoFile.makeDir(dir_name);
    }
    
    var res = Rho.Network.downloadFile( { url : download_url, filename : file_name } );
             
    return res['status'] == 'ok';
}

function callreplaceCurrentBundle()
{
    var res = rhobundle_download(httpServerUrl+'/upgrade_bundle.zip');
    if (!res)
    {
        Rho.Log.error("Cannot download bundle.", "SPEC");
        return;
    }
    
    if ( Rho.System.unzipFile( rhobundle_getfilename()) == 0)
    {
    	Rho.System.replaceCurrentBundle( Rho.RhoFile.dirname(rhobundle_getfilename()), {do_not_restart_app:false});
    }else
    {
        Rho.Log.error("Cannot unzip bundle.", "SPEC");
        return;
    }
    	
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



