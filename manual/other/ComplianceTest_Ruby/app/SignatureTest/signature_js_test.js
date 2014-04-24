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

function imageCallback(data)
{
	document.getElementById("clbkStatus").innerHTML = data.status;
	document.getElementById("clbkURI").innerHTML = data.imageUri;
    $("#capturedImage").attr('src', data.imageUri);
}

function dataUriCallback(data)
{
	document.getElementById("clbkStatus").innerHTML = data.status;
	document.getElementById("capturedImage").src = data.imageUri;
}

function callbackStatus(data)
{
	document.getElementById("clbkStatus").innerHTML = data;
}

function callbackImgpath(data)
{
	document.getElementById("clbkURI").innerHTML = data;
}

function callbackImg(data)
{
	$("#capturedImage").attr('src', data);
}

function callbackDataURI(data)
{
	document.getElementById("capturedImage").src = data;
}


function vectorCallback(data)
{
	document.getElementById("clbkVector").innerHTML = data.vectorArray;
}

var CONST_JPG = (Rho.System.platform == "WINDOWS" ? 'bmp' : 'jpg');
var CONST_PNG = (Rho.System.platform == "WINDOWS" ? 'bmp' : 'png');