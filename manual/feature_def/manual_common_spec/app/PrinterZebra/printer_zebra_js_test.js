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

var displayPrinterResult = function (desc, data){
	if (desc != "Output: ")
    {
    	var node=document.createElement("LI");
    	var textnode =document.createTextNode(desc);
    	node.appendChild(textnode);
    	document.getElementById("myList").appendChild(node);
    }
	node = document.createElement("LI");
    textnode = document.createTextNode("Output:");
    node.appendChild(textnode);

    list = document.createElement("ul");
    node.appendChild(list);

    lines = data.split(/\r\n|\r|\n|<br>|<br\/>/g);

    var len = lines.length, i;

    for(i = 0; i < len; i++ )
        lines[i] && lines.push(lines[i]);

    lines.splice(0 , len);

    if (lines.length > 1)
    {
        var time = new Date();
        lines.unshift("Time: " + leftZeroFill(time.getHours(),2) + ":" + leftZeroFill(time.getMinutes(),2) + ":" + leftZeroFill(time.getSeconds(),2) + "." + leftZeroFill(~~(time.getMilliseconds()/10),2));
    }

    Rho.Log.info(lines.join('\n'),"GOT IT!");

    for(var cnt = 0 ; cnt < lines.length; cnt++ )
    {
       list.appendChild(document.createElement("LI")).appendChild(document.createTextNode(lines[cnt]));    
    }
	
	document.getElementById("myList").appendChild(node);
}

function displaySearchResults(display_printers, display_errors) {
	if (display_printers.length > 0) {
		displayPrinterResult("Result:", JSON.stringify(display_printers," "));
	} 
	
	if (display_errors.length > 0) {
		$('#myList').append("<li>"+JSON.stringify(display_errors," ")+"<li>");
	}

}

function PrinterConnectiontype() {
	//connect_type = Rho.PrinterZebra.connectionType;
	$('#connectionType').show();
	//$('#connectionType').empty();
	//document.getElementById("connectionType").innerTEXT = connect_type;
	//$('#connectionType').html(connect_type);
}

function enumerateCallback(callbackValue) {
	if (callbackValue.length > 0) {
		displayPrinterResult("Result:", JSON.stringify(callbackValue," "));
	} 
	else {
		displayPrinterResult("Result:","Could not find callbackValue types.");
	}
}
		
function handleStatusCallback(callbackValue) {
	if(callbackValue == Rho.PrinterZebra.PRINTER_STATUS_SUCCESS) {
		displayPrinterResult("Result:",JSON.stringify(callbackValue, 2));
	}
	else {
		displayPrinterResult("Error:",JSON.stringify(callbackValue, 2));
	}
}		

function connectCallback(callbackValue) {
	if(callbackValue) {
		displayPrinterResult("Result:",JSON.stringify(callbackValue, 2));
	}
	else {
		displayPrinterResult("Result:","Nil value");
	}	
}

function retrieveCallback(callbackValue) {
	if (callbackValue.status == Rho.PrinterZebra.PRINTER_STATUS_SUCCESS) {
		displayPrinterResult("Result:",JSON.stringify(callbackValue));
	} 
	else if(callbackValue.status == Rho.PrinterZebra.PRINTER_STATUS_ERROR) {
		displayPrinterResult("Result:",JSON.stringify(callbackValue));
	} 
	else {
		displayPrinterResult("Result:",JSON.stringify(callbackValue));
	} 
}

function retrieveextensionCallback(callbackValue) {
	if (callbackValue.status == Rho.PrinterZebra.PRINTER_STATUS_SUCCESS) {
		displayPrinterResult("Result:",JSON.stringify(callbackValue));
	} 
	else if(callbackValue.status == Rho.PrinterZebra.PRINTER_STATUS_ERROR) {
		displayPrinterResult("Result:",JSON.stringify(callbackValue));
	} 
	else {
		displayPrinterResult("Result:",JSON.stringify(callbackValue));
	} 
}
function requestStateCallback(callbackValue) {
	if (callbackValue.status == Rho.PrinterZebra.PRINTER_STATUS_SUCCESS) {
		displayPrinterResult("Result:",JSON.stringify(callbackValue));
	} 
	else if(callbackValue.status == Rho.PrinterZebra.PRINTER_STATUS_ERROR) {
		displayPrinterResult("Result:",JSON.stringify(callbackValue.status));
	} 
	else {
		displayPrinterResult("Result:",JSON.stringify(callbackValue));
	} 
}

function addCombo()
{
	$('#select_box_wrapper').show();
	var textb= {'txtfile': txtfilepath, 'csvfile':csvfilepath, 'xlsfile':xlsfilepath, 'docfile':docfilepath, 'htmlcssfile':htmlcssfilepath, 'jsfile':jsfilepath, 'cppfile':cppfilepath, 'pdffile':pdffilepath, 'hashzplfile':hashzplfilepath, 'hashccplfile':hashccplfilepath, 'arrayzplfile':arrayzplfilepath, 'arrayccplfile':arrayccplfilepath, 'invalidcontentsfile':invalidcontentsfilepath, 'invalidfilepath':invalidfilepath};
	for(var files in textb) {
		var combo=document.getElementById("combo");
		var option=document.createElement("option");
		option.text=files;
		option.value=textb[files];
		try {
			combo.add(option,null);
		}
		catch(error) {
			combo.add(option);
		}
	}	
}
function hideCombo() {
	$('#select_box_wrapper').hide();
}
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


var zplformatpath = "e:zplformat.zpl";
var hashzpl = {0:'val1',5:'val2',1:'val3',25:'val4',100:'val5'};
var ccplformatpath = "e:ccplformat.ccpl";
var hashccpl = {0:'val1',1:'val3',5:'val2',25:'val4',100:'val5'};
var invalidformatpath = "bg:ccplformat.invalid";
// hash should be parseable by javascript
var invalidzplhash = {0:'val1',10203:'val1',2211:'val1','3355sasa':'val1'};
var arrayzpl = [0,1,10,5,20];
var arrayccpl = [0,1,2,3,4,5,6];
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

var printerDriveAndFileName = "D:FILE.GRF";
var printerOnlyFileName = "FILE.GRF"