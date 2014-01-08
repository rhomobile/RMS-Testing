function testPassed() {
	document.getElementById("actResult").innerHTML = "pass";
}

function testFailed() {
	document.getElementById("actResult").innerHTML = "fail";
}

function setObjective(objective) {
	document.getElementById("objective").innerHTML = objective;
}

function setInstruction(instruction) {
	document.getElementById("instruction").innerHTML = instruction;
}

function setExpected(expected) {
	document.getElementById("expResult").innerHTML = expected;
}

function enablecallbackdata(data) {
	document.getElementById("clbkData").innerHTML = data;
}	

function setAction(data) {
	document.getElementById("action").innerHTML = data;
}

function searchPrinterCallback(printer) {
	if (printer.status == Rho.PrinterZebra.STATUS_SUCCESS && printer.printerID == STATUS_OK) {
		printers_array.push(printer);
	} 
	else if (printer.status == Rho.PrinterZebra.STATUS_DONE || printer.status == Rho.PrinterZebra.STATUS_ERR_TIMEOUT) {
		discovery_finished = true;
	} 
	else if (printer.message == Rho.PrinterZebra.STATUS_ERROR) {
		printers_errors.push(printer)
	}
}

function displaySearchResults(display_printers, display_errors) {
	if (display_printers.length > 0) {
		document.getElementById('actResult').innerHTML = display_printers.toString();
	} 
	if (display_errors.length > 0) {
		$("#actResult").append(display_errors.toString());
	}

}

function PrinterConnectiontype() {
	connect_type = Rho.PrinterZebra.connectionType;
	document.getElementById("connectionType").innerHTML = connect_type;
}

function enumerateCallback(printer) {
	if (printer.length > 0) {
		document.getElementById('actResult').innerHTML = printer.toString();
	} 
	else {
		document.getElementById('actResult').innerHTML = "Could not find printer types.";
	}
}
		
function stopSearchPrinterCallback(printer) {
	if(printer.toString() == Rho.PrinterZebra.STATUS_SUCCESS) {
		document.getElementById('actResult').innerHTML = printer.toString();
	}
	else if(printer.toString() == Rho.PrinterZebra.STATUS_ERROR) {
		document.getElementById('actResult').innerHTML = printer.toString();
	}
	else {
		document.getElementById('actResult').innerHTML = printer.toString();
	}
}		

function printRawStringCallback(printer) {
	if(printer.toString() == Rho.PrinterZebra.STATUS_SUCCESS) {
		document.getElementById('actResult').innerHTML = printer.toString();
	}
	else if(printer.toString() == Rho.PrinterZebra.STATUS_ERROR) {
		document.getElementById('actResult').innerHTML = printer.toString();
	}
	else {
		document.getElementById('actResult').innerHTML = printer.toString();
	}	
}

function connectCallback(printer) {
	if(printer) {
		document.getElementById('actResult').innerHTML = printer.toString();
	}
	else {
		document.getElementById('actResult').innerHTML = "Nil value";
	}	
}

function disconnectCallback(printer) {
	if(printer.toString() == Rho.PrinterZebra.STATUS_SUCCESS) {
		document.getElementById('actResult').innerHTML = printer.toString();
	}
	else if(printer.toString() == Rho.PrinterZebra.STATUS_ERROR) {
		document.getElementById('actResult').innerHTML = printer.toString();
	}
	else {
		document.getElementById('actResult').innerHTML = printer.toString();
	}		
}



function printFileCallback(printer) {
	if(printer.toString() == Rho.PrinterZebra.STATUS_SUCCESS) {
		document.getElementById('actResult').innerHTML = printer.toString();
	}
	else if(printer.toString() == Rho.PrinterZebra.STATUS_ERROR) {
		document.getElementById('actResult').innerHTML = printer.toString();
	}
	else {
		document.getElementById('actResult').innerHTML = printer.toString();
	}		
}

function retrieveCallback(printer) {
	if (printer.status == Rho.PrinterZebra.STATUS_SUCCESS) {
		document.getElementById('actResult').innerHTML = JSON.stringify(printer);
	} 
	else if(printer.status == Rho.PrinterZebra.STATUS_ERROR) {
		document.getElementById('actResult').innerHTML = JSON.stringify(printer);
	} 
	else {
		document.getElementById('actResult').innerHTML = JSON.stringify(printer);
	} 
}

function retrieveextensionCallback(printer) {
	if (printer.status == Rho.PrinterZebra.STATUS_SUCCESS) {
		document.getElementById('actResult').innerHTML = JSON.stringify(printer);
	} 
	else if(printer.status == Rho.PrinterZebra.STATUS_ERROR) {
		document.getElementById('actResult').innerHTML = JSON.stringify(printer);
	} 
	else {
		document.getElementById('actResult').innerHTML = JSON.stringify(printer);
	} 
}

function sendfilecontentsCallback(printer) {
	if (printer.status == Rho.PrinterZebra.STATUS_SUCCESS) {
		document.getElementById('actResult').innerHTML = printer.toString();
	} 
	else if(printer.status == Rho.PrinterZebra.STATUS_ERROR) {
		document.getElementById('actResult').innerHTML = printer.toString();
	} 
	else {
		document.getElementById('actResult').innerHTML = printer.toString();
	} 
}

function printStoredHashCallback(printer) {
	if (printer.status == Rho.PrinterZebra.STATUS_SUCCESS) {
		document.getElementById('actResult').innerHTML = printer.toString();
	} 
	else if(printer.status == Rho.PrinterZebra.STATUS_ERROR) {
		document.getElementById('actResult').innerHTML = printer.toString();
	} 
	else {
		document.getElementById('actResult').innerHTML = printer.toString();
	} 
}

function printStoredArrayCallback(printer) {
	if (printer.status == Rho.PrinterZebra.STATUS_SUCCESS) {
		document.getElementById('actResult').innerHTML = printer.toString();
	} 
	else if(printer.status == Rho.PrinterZebra.STATUS_ERROR) {
		document.getElementById('actResult').innerHTML = printer.toString();
	} 
	else {
		document.getElementById('actResult').innerHTML = printer.toString();
	} 
}

function printImageFromFileCallback(printer) {
	if (printer.status == Rho.PrinterZebra.STATUS_SUCCESS) {
		document.getElementById('actResult').innerHTML = printer.toString();
	} 
	else if(printer.status == Rho.PrinterZebra.STATUS_ERROR) {
		document.getElementById('actResult').innerHTML = printer.toString();
	} 
	else {
		document.getElementById('actResult').innerHTML = printer.toString();
	} 
}

function storeImageCallback(printer) {
	if (printer.status == Rho.PrinterZebra.STATUS_SUCCESS) {
		document.getElementById('actResult').innerHTML = printer.toString();
	} 
	else if(printer.status == Rho.PrinterZebra.STATUS_ERROR) {
		document.getElementById('actResult').innerHTML = printer.toString();
	} 
	else {
		document.getElementById('actResult').innerHTML = printer.toString();
	} 
}

function requestStateCallback(printer) {
	if (printer.status == Rho.PrinterZebra.STATUS_SUCCESS) {
		document.getElementById('actResult').innerHTML = JSON.stringify(printer);
	} 
	else if(printer.status == Rho.PrinterZebra.STATUS_ERROR) {
		document.getElementById('actResult').innerHTML = JSON.stringify(printer.status);
	} 
	else {
		document.getElementById('actResult').innerHTML = JSON.stringify(printer);
	} 
}
/*
function addCombo()	{
	var textb=document.getElementById("txtCombo");
	var combo=document.getElementById("combo");
	var option=document.createElement("option");
	option.text=textb.value;
	option.value=textb.value;
	try {
		combo.add(option,null);
	}
	catch(error) {
		combo.add(option);
	}
	textb.value="";
}
*/
var fileURI = Rho.RhoFile.join(Rho.Application.modelFolderPath('PrinterZebra'), "PrinterZebraFiles/image1.jpg");
var txtfilepath = Rho.RhoFile.join(Rho.Application.modelFolderPath('PrinterZebra'), "PrinterZebraFiles/txtfile.txt");
var csvfilepath = Rho.RhoFile.join(Rho.Application.modelFolderPath('PrinterZebra'), "PrinterZebraFiles/csvfile.csv");
var xlsfilepath = Rho.RhoFile.join(Rho.Application.modelFolderPath('PrinterZebra'), "PrinterZebraFiles/xlsfile.xls");
var docfilepath = Rho.RhoFile.join(Rho.Application.modelFolderPath('PrinterZebra'), "PrinterZebraFiles/docfile.doc");
var htmlcssfilepath = Rho.RhoFile.join(Rho.Application.modelFolderPath('PrinterZebra'), "PrinterZebraFiles/htmlfile.html");
var jsfilepath = Rho.RhoFile.join(Rho.Application.modelFolderPath('PrinterZebra'), "PrinterZebraFiles/jsfile.js");
var cppfilepath = Rho.RhoFile.join(Rho.Application.modelFolderPath('PrinterZebra'), "PrinterZebraFiles/cppfile.cpp");
var pdffilepath = Rho.RhoFile.join(Rho.Application.modelFolderPath('PrinterZebra'), "PrinterZebraFiles/pdffile.pdf");
var hashzplfilepath = Rho.RhoFile.join(Rho.Application.modelFolderPath('PrinterZebra'), "PrinterZebraFiles/hashzplfile.zpl");
var hashccplfilepath = Rho.RhoFile.join(Rho.Application.modelFolderPath('PrinterZebra'), "PrinterZebraFiles/hashccplfile.ccpl");
var arrayzplfilepath = Rho.RhoFile.join(Rho.Application.modelFolderPath('PrinterZebra'), "PrinterZebraFiles/arrayzplfile.zpl");
var arrayccplfilepath = Rho.RhoFile.join(Rho.Application.modelFolderPath('PrinterZebra'), "PrinterZebraFiles/arrayccplfile.ccpl");
var invalidcontentsfilepath = Rho.RhoFile.join(Rho.Application.modelFolderPath('PrinterZebra'), "PrinterZebraFiles/invalidcontetsfile");
var invalidfilepath = "ZA://flder"


var zplformatpath = "";
var hashzpl = {};
var ccplformatpath = "";
var hashccpl = "";
var invalidformatpath = "";
var invalidzplhash = {};
var arrayzpl = [];
var arrayccpl = [];
var pngimagepath_320px = Rho.RhoFile.join(Rho.Application.modelFolderPath('PrinterZebra'), "PrinterZebraFiles/pngimagepath_320px.png"); 
var pngimagepath_640px = Rho.RhoFile.join(Rho.Application.modelFolderPath('PrinterZebra'), "PrinterZebraFiles/pngimagepath_640px.png"); 
var pngimagepath_1024px = Rho.RhoFile.join(Rho.Application.modelFolderPath('PrinterZebra'), "PrinterZebraFiles/pngimagepath_1024px.png"); 
var pngimagepath_2048px = Rho.RhoFile.join(Rho.Application.modelFolderPath('PrinterZebra'), "PrinterZebraFiles/pngimagepath_2048px.png"); 

var jpgimagepath_320px = Rho.RhoFile.join(Rho.Application.modelFolderPath('PrinterZebra'), "PrinterZebraFiles/jpgimagepath_320px.jpg"); 
var jpgimagepath_640px = Rho.RhoFile.join(Rho.Application.modelFolderPath('PrinterZebra'), "PrinterZebraFiles/jpgimagepath_640px.jpg"); 
var jpgimagepath_1024px = Rho.RhoFile.join(Rho.Application.modelFolderPath('PrinterZebra'), "PrinterZebraFiles/jpgimagepath_1024px.jpg"); 
var jpgimagepath_2048px = Rho.RhoFile.join(Rho.Application.modelFolderPath('PrinterZebra'), "PrinterZebraFiles/jpgimagepath_2048px.jpg"); 

var gifimagepath_320px = Rho.RhoFile.join(Rho.Application.modelFolderPath('PrinterZebra'), "PrinterZebraFiles/gifimagepath_320px.gif"); 
var gifimagepath_640px = Rho.RhoFile.join(Rho.Application.modelFolderPath('PrinterZebra'), "PrinterZebraFiles/gifimagepath_640px.gif"); 
var gifimagepath_1024px = Rho.RhoFile.join(Rho.Application.modelFolderPath('PrinterZebra'), "PrinterZebraFiles/gifimagepath_1024px.gif"); 
var gifimagepath_2048px = Rho.RhoFile.join(Rho.Application.modelFolderPath('PrinterZebra'), "PrinterZebraFiles/gifimagepath_2048px.gif"); 

var bmpimagepath_320px = Rho.RhoFile.join(Rho.Application.modelFolderPath('PrinterZebra'), "PrinterZebraFiles/bmpimagepath_320px.bmp"); 
var bmpimagepath_640px = Rho.RhoFile.join(Rho.Application.modelFolderPath('PrinterZebra'), "PrinterZebraFiles/bmpimagepath_640px.bmp"); 
var bmpimagepath_1024px = Rho.RhoFile.join(Rho.Application.modelFolderPath('PrinterZebra'), "PrinterZebraFiles/bmpimagepath_1024px.bmp"); 
var bmpimagepath_2048px = Rho.RhoFile.join(Rho.Application.modelFolderPath('PrinterZebra'), "PrinterZebraFiles/bmpimagepath_2048px.bmp"); 

var printerDriveAndFileName = "";