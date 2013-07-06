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
	document.getElementById("clbkData").innerHTML = data;
}
function callbackdata2(data)
{
	document.getElementById("clbkData2").innerHTML = data;
}

var TEST_11 = '';var VALUE_11 = '';
var TEST_12 = '';var VALUE_12 = '';
var TEST_13 = '';var VALUE_13 = '';
var TEST_14 = '';var VALUE_14 = '';
var TEST_15 = '';var VALUE_15 = '';
var TEST_18 = '';var VALUE_18 = '';
var TEST_21 = '';var VALUE_21 = '';

if (isAndroidPlatform())
{
	TEST_11 = '0x19';VALUE_11 = "Key P1/VolumeUp";
	TEST_13 = '0x18';VALUE_13 = "Key P2/VolumeDown";
	TEST_14 = '82';VALUE_14 = "Key Menu";
	TEST_15 = '0x18';VALUE_15 = "Key P2/VolumeDown";
	TEST_18 = '4';VALUE_18 = "Retrun Key";
	TEST_21 = '25';VALUE_21 = "Key P1/VolumeUp";
}
else if (isWindowsMobilePlatform() && Rho.System.isMotorolaDevice == true)
{
	TEST_15 = '84';VALUE_15 = "Key P3/search key";
}
else if (isWindowsMobilePlatform())
{
	TEST_11 = '0x31';VALUE_11 = "Key 1";
	TEST_13 = '0x65';VALUE_13 = "Key a";
	TEST_14 = '0x66';VALUE_14 = "Key B";
	TEST_15 = '0x32';VALUE_15 = "Key 2";
	TEST_18 = '0x0D';VALUE_18 = "Enter Key";
	TEST_21 = '51';VALUE_21 = "Key 3";
}
else if (isApplePlatform())
{
	TEST_11 = '0xa';VALUE_11 = "Key VolumeUp";
	TEST_13 = '0xb';VALUE_13 = "Key VolumeDown";
	TEST_14 = '11';VALUE_14 = "Key VolumeDown";
	TEST_15 = '11';VALUE_15 = "Key VolumeDown";
	TEST_18 = '10';VALUE_18 = "Key VolumeUp";
	TEST_21 = '10';VALUE_21 = "Key VolumeUp";
}