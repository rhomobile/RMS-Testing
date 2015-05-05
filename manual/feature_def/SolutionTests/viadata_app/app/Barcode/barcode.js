var enumData;
var objSCN;
var callbackData;
var callbacktake = function(cbData){
	callbackData = cbData;
	if(callbackData.status == 'ok'){
		document.getElementById("result").innerHTML = "Status: " +callbackData.status +", Data: " +callbackData.barcode;
	}else{
		document.getElementById("result").innerHTML = "Status: " +callbackData.status +", Data: " +"User Cancelled Operation";
	}
}

var enableScan1 = function(){
	objSCN = enumData[0];
	alert("scan1 enabled");
}

var enableScan2 = function(){
	objSCN = enumData[1];
	alert("scan2 enabled");
}
var enumFunc =  function(){
	enumData=Rho.Barcode.enumerate();
	objSCN = enumData[0]; // setting default scanner
	if(enumData.length >=0){
	alert("enumerate success");
	}else{
	alert("enumerate failed");
	}
}

var takeBarcode = function(){
	objSCN.take({},callbacktake);
}