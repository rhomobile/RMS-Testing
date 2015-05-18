
function callbackdata(data)
{
	document.getElementById("clbkData").innerHTML = data;
}
function callbackdatafunc(data)
{
	document.getElementById("clbkDatadiv").innerHTML = data;
}
var hardwareKeysTest = {};

if (isAndroidPlatform())
{
	hardwareKeysTest.aKey 		= {string: '0x1D', description: "a",	value:0x1D};
	hardwareKeysTest.bKey 		= {string: '0x1E', description: "b", 	value:0x1E};
	hardwareKeysTest.yKey 		= {string: '0x35', description: "y", 	value:0x35};
	hardwareKeysTest.zKey 		= {string: '0x36', description: "z", 	value:0x36};
	hardwareKeysTest.hashKey 	= {string: '0x12', description: "#", 	value:0x12};
	hardwareKeysTest.starKey 	= {string: '0x11', description: "*", 	value:0x11};
	hardwareKeysTest.oneKey 	= {string: '0x08', description: "1", 	value:0x08};
	hardwareKeysTest.twoKey 	= {string: '0x09', description: "2", 	value:0x09};
	hardwareKeysTest.fiveKey 	= {string: '0x0C', description: "5", 	value:0x0C};
	hardwareKeysTest.nineKey 	= {string: '0x10', description: "9", 	value:0x10};
	hardwareKeysTest.tabKey 	= {string: '0x3D', description: "Tab", 	value:0x3d};
	hardwareKeysTest.enterKey 	= {string: '0x42', description: "Enter",value:0x42};
	hardwareKeysTest.f1Key 		= {string: '0x83', description: "F1", 	value:0x83};
	hardwareKeysTest.f5Key 		= {string: '0x87', description: "F5", 	value:0x87};
	hardwareKeysTest.volumeDown	= {string: '0x19', description: "P1/VolumeDown", value:0x19};
	hardwareKeysTest.volumeUp	= {string: '0x18', description: "P2/VolumeUp", value:0x18};
	hardwareKeysTest.searchKey	= {string: '0x54', description: "P3/Search", value:0x54};
	hardwareKeysTest.menuKey	= {string: '0x52', description: "Menu",	value:0x52};
	hardwareKeysTest.backKey	= {string: '0x04', description: "Back",	value:0x04};

	hardwareKeysTest.testKey11 	= {string: '0x19', description: "P1/VolumeDown", value:0x19};
	hardwareKeysTest.testKey13 	= {string: '0x18', description: "P2/VolumeUp", value:0x18};
	hardwareKeysTest.testKey14 	= {string: '82', description: "Menu", value:82};
	hardwareKeysTest.testKey15 	= {string: '84', description: "P3/search", value:84};
	hardwareKeysTest.testKey18 	= {string: '25', description: "P1/VolumeDown", value:25};
	hardwareKeysTest.testKey21 	= {string: '24', description: "P2/VolumeUp", value:24};
}
else if (isWindowsMobilePlatform())
{
	hardwareKeysTest.aKey 		= {string: '0x41', description: "a", 	value:0x41};
	hardwareKeysTest.bKey 		= {string: '0x42', description: "b", 	value:0x42};
	hardwareKeysTest.yKey 		= {string: '0x59', description: "y", 	value:0x59};
	hardwareKeysTest.zKey 		= {string: '0x5A', description: "z", 	value:0x5A};
	hardwareKeysTest.hashKey 	= {string: '0x78', description: "#", 	value:0x78};
	hardwareKeysTest.starKey 	= {string: '0x77', description: "*",	value:0x77};
	hardwareKeysTest.oneKey 	= {string: '0x31', description: "1", 	value:0x31};
	hardwareKeysTest.twoKey 	= {string: '0x32', description: "2", 	value:0x32};
	hardwareKeysTest.fiveKey 	= {string: '0x35', description: "5", 	value:0x35};
	hardwareKeysTest.nineKey 	= {string: '0x39', description: "9", 	value:0x39};
	hardwareKeysTest.tabKey 	= {string: '0x09', description: "Tab", 	value:9};
	hardwareKeysTest.enterKey 	= {string: '0x0D', description: "Enter",value:13};
	hardwareKeysTest.f1Key 		= {string: '0x70', description: "F1", 	value:0x70};
	hardwareKeysTest.f5Key 		= {string: '0x74', description: "F5", 	value:116};
	hardwareKeysTest.testKey11 	= {string: '0x31', description: "1", 	value:0x31};
	hardwareKeysTest.testKey13 	= {string: '0x41', description: "a", 	value:0x41};
	hardwareKeysTest.testKey14 	= {string: '0x42', description: "b", 	value:0x42};
	hardwareKeysTest.testKey15 	= {string: '0x32', description: "2", 	value:0x32};
	hardwareKeysTest.testKey18 	= {string: '0x0D', description: "Enter",value:0x0D};
	hardwareKeysTest.testKey21 	= {string: '49',   description: "1", 	value:49};
}
else if (isApplePlatform())
{
	hardwareKeysTest.testKey11 = {string: '0xa', description: "VolumeUp", 	value:0xA};
	hardwareKeysTest.testKey13 = {string: '0xb', description: "VolumeDown",	value:0xB};
	hardwareKeysTest.testKey14 = {string: '11',	 description: "VolumeDown", value:11};
	hardwareKeysTest.testKey15 = {string: '11',  description: "VolumeDown", value:11};
	hardwareKeysTest.testKey18 = {string: '10',  description: "VolumeUp", 	value:10};
	hardwareKeysTest.testKey21 = {string: '10',  description: "VolumeUp", 	value:10};
}