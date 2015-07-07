function testPassed()
{
	document.getElementById("actResult").innerHTML = "pass";
}

function testFailed()
{
	document.getElementById("actResult").innerHTML = "fail";
}

function setObjective(objective)
{
	document.getElementById("objective").innerHTML = objective;
}

function setInstruction(instruction)
{
	document.getElementById("instruction").innerHTML = instruction;
}

function setExpected(expected)
{
	document.getElementById("expResult").innerHTML = expected;
}

function enablecallbackdata(data)
{
	document.getElementById("clbkData").innerHTML = data;
}

function callback1995(data)
{
	var outputHtml = "ScanTimeout: " + data.scanTimeout + "<br/>PickListMode: " + data.picklistMode + "<br />Length of results: " + Object.keys(data).length;
	document.getElementById("clbkData").innerHTML = outputHtml;
}

function callback1996(data)
{
	var outputHtml = "AllDecoders: " + data.AllDecoders + "<br/>Code39: " + data.code39 + "<br />Length of results: " + Object.keys(data).length;
	document.getElementById("clbkData").innerHTML = outputHtml;
}