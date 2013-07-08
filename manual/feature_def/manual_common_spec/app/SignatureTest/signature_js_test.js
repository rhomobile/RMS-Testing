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

function takecallbackdata(data)
{
	document.getElementById("clbkStatus").innerHTML = data.status;
	document.getElementById("clbkURI").innerHTML = data.imageUri;
}

function URIcallbackdata(data)
{
	document.getElementById("clbkStatus").innerHTML = data.status;
	capturedImage.src = data.imageUri;
}

function vectorcallbackdata(data)
{
	document.getElementById("clbkVector").innerHTML = data.vectorArray;
}