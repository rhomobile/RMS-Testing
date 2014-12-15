//var isAndroid = (Rho.System.platform == "ANDROID");
//var isJB = (isAndroid && Rho.System.osVersion.indexOf('4.') == 0);

function getDeviceType()
{
	return EB.System.oemInfo;
}