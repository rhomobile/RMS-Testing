var objGeneric = new ActiveXObject("PocketBrowser.Generic");

function imageName()
{
validexitCode = objGeneric.LaunchProcessNonBlocking('\\Application\\RegEdit.exe', '');
}

function callBackFunc(param) {
	       var sig = document.getElementById("actualResult"); 
	       sig.innerHTML = "Param: "+ param;
}
