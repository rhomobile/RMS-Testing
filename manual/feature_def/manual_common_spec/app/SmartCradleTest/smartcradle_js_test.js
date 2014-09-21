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

var time_val;
var time_handle;
function startTestTimer()
{
	time_val = 1;
	time_handle = setInterval(function(){document.getElementById('testDuration').textContent = time_val;time_val = time_val + 1;}, 1000);
}

function stopTestTimer()
{
	clearInterval(time_handle);
}

var hardwareKeysTest = {};
