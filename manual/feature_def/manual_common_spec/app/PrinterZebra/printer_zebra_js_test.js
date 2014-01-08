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
		
	//TODO: Need to modify
	function stopSearchPrinterCallback(printer) {
		if (testResult.toLowerCase().indexOf("STATUS_ERROR") <= 0) {
			testResult = "STATUS_SUCCESS";
			document.getElementById('actResult').innerHTML = testResult;
		} else {
			testResult = "STATUS_ERROR";
			document.getElementById('actResult').innerHTML = testResult;
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
