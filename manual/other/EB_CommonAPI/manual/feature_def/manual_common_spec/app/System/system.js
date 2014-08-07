function getCountry()
{
	data = EB.System.getProperty('country');
	$("#Rho_System_Country span.result").text(JSON.stringify(data));
}

function getapplicationIconBadge()
{
	data = EB.System.getProperty('applicationIconBadge');
	$("#Rho_System_getapplicationIconBadge span.result").text(JSON.stringify(data));
}

function gethttpProxyURI()
{
	data = EB.System.getProperty('httpProxyURI');
	$("#Rho_System_httpProxyURI span.result").text(JSON.stringify(data));
}


function getlockWindowSize()
{
	//data = EB.System.getProperty('lockWindowSize');
	data = EB.System.lockWindowSize;
	$("#Rho_System_lockWindowSize span.result").text(JSON.stringify(data));
}

function getscreenAutoRotate()
{
	data = EB.System.getProperty('screenAutoRotate');
	$("#Rho_System_screenAutoRotate span.result").text(JSON.stringify(data));
}

function getscreenOrientation()
{
	data = EB.System.getProperty('screenOrientation');
	$("#Rho_System_screenOrientation span.result").text(JSON.stringify(data));
}

function getscreenSleeping()
{
	data = EB.System.getProperty('screenSleeping');
	$("#Rho_System_screenSleeping span.result").text(JSON.stringify(data));
}

function getkeyboardState()
{
	data = EB.System.getProperty('keyboardState');
	$("#Rho_System_keyboardState span.result").text(JSON.stringify(data));
}


function callisApplicationInstalled(aString) {
    var isInstalled = EB.System.isApplicationInstalled(aString)
    if (isInstalled)
        alert(aString + " application is installed in the device");
    else
        alert(aString + " application is not installed in the device");
}

function rhobundle_getfilename()
{
    if (EB.System.platform == EB.System.PLATFORM_WM_CE || EB.System.platform == EB.System.PLATFORM_WP8 || EB.System.platform == EB.System.PLATFORM_WINDOWS_DESKTOP)
    {
        return EB.RhoFile.join( EB.Application.bundleFolder, '/RhoBundle/upgrade_bundle.zip');
    }else
    {
        return EB.RhoFile.join( EB.Application.userFolder, '/RhoBundle/upgrade_bundle.zip');
    }
}

function rhobundle_download(download_url)
{
    var file_name = rhobundle_getfilename();
    var dir_name = EB.RhoFile.dirname(file_name);
    if ( EB.RhoFile.exists(dir_name) )
    {
        EB.RhoFile.deleteRecursive(dir_name);
    }

    if ( !EB.RhoFile.exists(dir_name) )
    {
        EB.RhoFile.makeDir(dir_name);
    }

    var res = EB.Network.downloadFile( { url : download_url, filename : file_name,  overwriteFile : true } );

    return res['status'] == 'ok';
}

function callreplaceCurrentBundle()
{
    var res = rhobundle_download(httpServerUrl+'/upgrade_bundle.zip');
    //var res = rhobundle_download('http://manual-common-spec.s3.amazonaws.com/upgrade_bundle.zip');
    if (!res)
    {
        EB.Log.error("Cannot download bundle.", "SPEC");
        return;
    }

    if ( EB.System.unzipFile( rhobundle_getfilename()) == 0)
    {
    	EB.System.replaceCurrentBundle( EB.RhoFile.dirname(rhobundle_getfilename()), {do_not_restart_app:false});
    }else
    {
        EB.Log.error("Cannot unzip bundle.", "SPEC");
        return;
    }

}

function callupdateCurrentBundle()
{
    var res = rhobundle_download(httpServerUrl+'/upgrade_bundle_partial.zip');
    //var res = rhobundle_download('http://manual-common-spec.s3.amazonaws.com/upgrade_bundle_partial.zip');
    if (!res)
    {
        EB.Log.error("Cannot download bundle.", "SPEC");
        return;
    }

    if ( EB.System.unzipFile( rhobundle_getfilename()) == 0)
    {
    	EB.System.replaceCurrentBundle( EB.RhoFile.dirname(rhobundle_getfilename()), {do_not_restart_app:true});
    }else
    {
        EB.Log.error("Cannot unzip bundle.", "SPEC");
        return;
    }

}



function callgetProperty(propertyName)
{
	data = EB.System.getProperty(propertyName);
	$("#Rho_System_setproperty span.result").text(JSON.stringify(data));
}

function callsetProperties(propertyName, propertyValue)
{
    var properties = {};
    properties[propertyName] = propertyValue;
	EB.System.setProperties(properties);
}

function callgetProperties(propertyName)
{
	data = EB.System.getProperties([propertyName]);
	$("#Rho_System_getProperties span.result").text(JSON.stringify(data));
}

function download_filetolocal(srvHttpDownloadImageUrl, filetoinstall)
{
	var file = filetoinstall;
	var fname = EB.RhoFile.join(EB.Application.userFolder, file);
	downloadfileProps = {
                url: srvHttpDownloadImageUrl,
                filename: fname,
                overwriteFile: true
            };

    EB.Network.downloadFile(downloadfileProps);
	return fname;
}

function createFileWithDoNotBackupAttribute(doBackup)
{
    var fPath = EB.RhoFile.join(EB.Application.userFolder, "testBackupFile.txt");

    if (EB.RhoFile.exists(fPath))
    {
        EB.RhoFile.deleteFile(fPath);
    };

    var fOpen = new EB.RhoFile(fPath,EB.RhoFile.OPEN_FOR_APPEND);
    var writeValue = fOpen.write("Do not backup file is set to " + doBackup);
    fOpen.close();

    return EB.System.setDoNotBackupAttribute(fPath, doBackup);
}

function isBackupFileExists()
{
    var fPath = EB.RhoFile.join(EB.Application.userFolder, "testBackupFile.txt");

    return EB.RhoFile.exists(fPath);
}

function checkBackupFileExists()
{
    $("#Rho_System_DoNotBackupAttribute span.result").text(JSON.stringify(isBackupFileExists()));
}

var getAppNameTosendMessage = function(){
    var appName = undefined;
    if(isAndroidPlatform()){
        appName = "com.rhomobile.intent"
    }
    else if(isApplePlatform()){
        appName = "Intent"
    }
    else if(isWindowsMobilePlatform()){
        appName = "rhomobile Intent/Intent.exe"
    }

    return appName;
}

//This method will give you the base64 encoded data for Images
var getBase64FromImageUrl = function(URL) {
    var img = new Image();
    img.src = URL;
    img.onload = function () {

        var canvas = document.createElement("canvas");
        canvas.width =this.width;
        canvas.height =this.height;

        var ctx = canvas.getContext("2d");
        ctx.drawImage(this, 0, 0);

        var dataURL = canvas.toDataURL("image/png");
        dataURL = dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
        return dataURL;
    }
}

var sendJSONStringToTarget = function(){
    EB.System.sendApplicationMessage(getAppNameTosendMessage(), 'data={"Users":[{"Name":"user999","Value":"test"},{"Name":"test2","Value":"test"}]}');
}

var getGPSCoordinates = function(){
    EB.System.sendApplicationMessage(getAppNameTosendMessage(),'GPS=true');
    EB.System.startApplicationMessageNotifications(function(geodata){
        if(document.getElementById('geodiv')){
            document.getElementById('geodiv').innerHTML = "Latitude= "+geodata.latitude+"Longitude= "+geodata.longitude;
        }
    });
}

var scanBarcode = function(){
    EB.System.sendApplicationMessage(getAppNameTosendMessage(),'SCAN=true');
    EB.System.startApplicationMessageNotifications(function(scandata){
        if(document.getElementById('scandiv')){
            document.getElementById('scandiv').innerHTML = "Data= "+scandata;
        }
    });
}

var getNonRhodesApp = function(){
    var appName = undefined;
    if(isAndroidPlatform()){
        appName = "com.android.music"
    }
    else if(isApplePlatform()){
        appName = "Safari"
    }
    else if(isWindowsMobilePlatform()){
        appName = "Internet Exlporer.exe"
    }

    return appName;
}

