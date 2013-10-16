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

function callbackdata(data)
{
	document.getElementById("clbkData").innerHTML = "status:" + data.status + " imageUri:" + data.imageUri + " imageHeight:" + data.imageHeight + " imageWidth:" +data.imageWidth + " imageFormat:" + data.imageFormat + " message:" + data.message;
}

function callbackdataraw(data)
{
	document.getElementById("clbkData").innerHTML = data;
}

function callbackdatauri(data)
{
	document.getElementById("clbkData").innerHTML = "status:" + data.status + " imageHeight:" + data.imageHeight + " imageWidth:" +data.imageWidth + " imageFormat:" + data.imageFormat + " message:" + data.message;
	capturedImage.src = data.imageUri;
}