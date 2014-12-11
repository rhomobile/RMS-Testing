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

var hardwareKeysTest = {};

if (isAndroidPlatform())
{
	hardwareKeysTest.aKey 		= {string: '0x1D', description: "a",	value:29};
	hardwareKeysTest.bKey 		= {string: '0x1E', description: "b", 	value:30};
	hardwareKeysTest.yKey 		= {string: '0x35', description: "y", 	value:53};
	hardwareKeysTest.zKey 		= {string: '0x36', description: "z", 	value:54};
	hardwareKeysTest.hashKey 	= {string: '0x12', description: "#", 	value:18};
	hardwareKeysTest.starKey 	= {string: '0x11', description: "*", 	value:17};
	hardwareKeysTest.oneKey 	= {string: '0x08', description: "1", 	value:8};
	hardwareKeysTest.twoKey 	= {string: '0x09', description: "2", 	value:9};
	hardwareKeysTest.fiveKey 	= {string: '0x0C', description: "5", 	value:12};
	hardwareKeysTest.nineKey 	= {string: '0x10', description: "9", 	value:10};
	hardwareKeysTest.tabKey 	= {string: '0x3D', description: "Tab", 	value:61};
	hardwareKeysTest.enterKey 	= {string: '0x42', description: "Enter",value:66};
	hardwareKeysTest.f1Key 		= {string: '0x83', description: "F1", 	value:131};
	hardwareKeysTest.f5Key 		= {string: '0x87', description: "F5", 	value:135};
	hardwareKeysTest.volumeDown	= {string: '0x19', description: "P1/VolumeDown", value:25};
	hardwareKeysTest.volumeUp	= {string: '0x18', description: "P2/VolumeUp", value:24};
	hardwareKeysTest.searchKey	= {string: '0x54', description: "P3/Search", value:84};
	hardwareKeysTest.menuKey	= {string: '0x52', description: "Menu",	value:82};
	hardwareKeysTest.backKey	= {string: '0x04', description: "Back",	value:4};

	hardwareKeysTest.testKey11 	= {string: '0x19', description: "P1/VolumeDown", value:25};
	hardwareKeysTest.testKey13 	= {string: '0x18', description: "P2/VolumeUp", value:24};
	hardwareKeysTest.testKey14 	= {string: '82', description: "Menu", value:82};
	hardwareKeysTest.testKey15 	= {string: '84', description: "P3/search", value:84};
	hardwareKeysTest.testKey18 	= {string: '25', description: "P1/VolumeDown", value:25};
	hardwareKeysTest.testKey21 	= {string: '24', description: "P2/VolumeUp", value:24};
}
else if (isWindowsMobilePlatform())
{
	hardwareKeysTest.aKey 		= {string: '0x41', description: "a", 	value:65};
	hardwareKeysTest.bKey 		= {string: '0x42', description: "b", 	value:66};
	hardwareKeysTest.yKey 		= {string: '0x59', description: "y", 	value:89};
	hardwareKeysTest.zKey 		= {string: '0x5A', description: "z", 	value:90};
	hardwareKeysTest.hashKey 	= {string: '0x78', description: "#", 	value:120};
	hardwareKeysTest.starKey 	= {string: '0x77', description: "*",	value:119};
	hardwareKeysTest.oneKey 	= {string: '0x31', description: "1", 	value:49};
	hardwareKeysTest.twoKey 	= {string: '0x32', description: "2", 	value:50};
	hardwareKeysTest.fiveKey 	= {string: '0x35', description: "5", 	value:53};
	hardwareKeysTest.nineKey 	= {string: '0x39', description: "9", 	value:57};
	hardwareKeysTest.tabKey 	= {string: '0x09', description: "Tab", 	value:9};
	hardwareKeysTest.enterKey 	= {string: '0x0D', description: "Enter",value:13};
	hardwareKeysTest.f1Key 		= {string: '0x70', description: "F1", 	value:112};
	hardwareKeysTest.f5Key 		= {string: '0x74', description: "F5", 	value:116};
	hardwareKeysTest.testKey11 	= {string: '0x31', description: "1", 	value:49};
	hardwareKeysTest.testKey13 	= {string: '0x41', description: "a", 	value:65};
	hardwareKeysTest.testKey14 	= {string: '0x42', description: "b", 	value:66};
	hardwareKeysTest.testKey15 	= {string: '0x32', description: "2", 	value:50};
	hardwareKeysTest.testKey18 	= {string: '0x0D', description: "Enter",value:13};
	hardwareKeysTest.testKey21 	= {string: '51',   description: "3", 	value:51};
}
else if (isApplePlatform())
{
	hardwareKeysTest.testKey11 = {string: '0xa', description: "VolumeUp", 	value:10};
	hardwareKeysTest.testKey13 = {string: '0xb', description: "VolumeDown",	value:11};
	hardwareKeysTest.testKey14 = {string: '11',	 description: "VolumeDown", value:11};
	hardwareKeysTest.testKey15 = {string: '11',  description: "VolumeDown", value:11};
	hardwareKeysTest.testKey18 = {string: '10',  description: "VolumeUp", 	value:10};
	hardwareKeysTest.testKey21 = {string: '10',  description: "VolumeUp", 	value:10};
}