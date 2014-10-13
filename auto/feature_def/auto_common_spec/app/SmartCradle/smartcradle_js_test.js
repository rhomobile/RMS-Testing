//var isAndroid = (Rho.System.platform == "ANDROID");
//var isJB = (isAndroid && Rho.System.osVersion.indexOf('4.') == 0);

function getDeviceType()
{
	return Rho.System.oemInfo;
}