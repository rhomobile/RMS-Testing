var hardwareKeysTest = {};

hardwareKeysTest.deviceOS = Rho.System.platform;
console.log('DeviceOs: ' + hardwareKeysTest.deviceOS);
hardwareKeysTest.callbackFired = false;
hardwareKeysTest.TRIGGER = 100;
hardwareKeysTest.textBox = null;
hardwareKeysTest.cachedIsAndroid = null;

hardwareKeysTest.isAndroid = function()
{
	if(hardwareKeysTest.cachedIsAndroid == null)
	{
		if(!isAndroidPlatform())
		{
			hardwareKeysTest.cachedIsAndroid = false;
			console.log('It isnt android');
			return false;
		}
		console.log('It is android');
		hardwareKeysTest.cachedIsAndroid = true;
		return true;
	}
	return hardwareKeysTest.cachedIsAndroid;
};

hardwareKeysTest.loadEvent = function()
{
	if(hardwareKeysTest.isAndroid())
	{
		hardwareKeysTest.TRIGGER = 103;
		hardwareKeysTest.LETTER_A_CODE = 29;//TODO
	}
};
window.addEventListener('DOMContentLoaded', hardwareKeysTest.loadEvent);

hardwareKeysTest.simulateKeyPress = function(keyValue)
{
	Rho.Instrumentation.simulate_key_event_code(keyValue);
};

///////////////////////////////////////////////////////////////////////////
// Key Capture
///////////////////////////////////////////////////////////////////////////
hardwareKeysTest.captureKeyCallback = function(keyValueHash) 
{
	console.log('KeyCallback: ' + keyValueHash.keyValue);
	hardwareKeysTest.callbackFired = true;
	if(hardwareKeysTest.callbackFiredResult == null)
	{
		hardwareKeysTest.callbackFiredResult = keyValueHash["keyValue"];
	}
	else if(typeof hardwareKeysTest.callbackFiredResult == 'string' || typeof hardwareKeysTest.callbackFiredResult == 'number')
	{
		hardwareKeysTest.callbackFiredResult = [hardwareKeysTest.callbackFiredResult, keyValueHash["keyValue"]];
	}
	else
	{
		hardwareKeysTest.callbackFiredResult.push(keyValueHash["keyValue"]);
	}
	console.log('TriggerCallback-: ' + hardwareKeysTest.callbackFiredResult);
};

hardwareKeysTest.captureKey = function(bDispatch,key)
{
	Rho.KeyCapture.captureKey(bDispatch,key,hardwareKeysTest.captureKeyCallback);
};

hardwareKeysTest.resetCaptureKeyCallback = function(key)
{
	Rho.KeyCapture.captureKey(true,key); //NULL callback
};

///////////////////////////////////////////////////////////////////////////
// Key Remap
///////////////////////////////////////////////////////////////////////////
hardwareKeysTest.remapKey = function(keyFrom, keyTo)
{
	Rho.KeyCapture.remapKey(keyFrom, keyTo); 
};

hardwareKeysTest.clearRemap = function(keyFrom)
{
	Rho.KeyCapture.remapKey(keyFrom, null); 
};

///////////////////////////////////////////////////////////////////////////
// Trigger
///////////////////////////////////////////////////////////////////////////
hardwareKeysTest.triggerCallback = function(triggerFlagHash) 
{
	console.log('TriggerCallback+: ' + triggerFlagHash.triggerFlag);
	hardwareKeysTest.callbackFired = true;
	if(hardwareKeysTest.callbackFiredResult == null)
	{
		hardwareKeysTest.callbackFiredResult = triggerFlagHash["triggerFlag"];
	}
	else if(typeof hardwareKeysTest.callbackFiredResult == 'string' || typeof hardwareKeysTest.callbackFiredResult == 'number' )
	{
		hardwareKeysTest.callbackFiredResult = [hardwareKeysTest.callbackFiredResult, triggerFlagHash["triggerFlag"]];
	}
	else
	{
		hardwareKeysTest.callbackFiredResult.push(triggerFlagHash["triggerFlag"]);
	}
	console.log('TriggerCallback-: ' + hardwareKeysTest.callbackFiredResult);
};

hardwareKeysTest.setTrigger = function()
{
	Rho.KeyCapture.captureTrigger(hardwareKeysTest.triggerCallback);
};

hardwareKeysTest.resetTrigger = function()
{
	Rho.KeyCapture.captureTrigger();
};

//////////////////////////////////////////////////////////////////////////
// Text Box Generation
//////////////////////////////////////////////////////////////////////////
hardwareKeysTest.removeTextBox = function()
{
	document.body.removeChild(hardwareKeysTest.textBox);
	hardwareKeysTest.textBox = null;
};

hardwareKeysTest.createTextBox = function()
{
	hardwareKeysTest.textBox = document.createElement('input');
	hardwareKeysTest.textBox.type = 'text';
	hardwareKeysTest.textBox.id = 'keyCaptureTestTextBox';
	document.body.appendChild(hardwareKeysTest.textBox);
};

if (hardwareKeysTest.isAndroid())
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
	hardwareKeysTest.aKey 		= {string: '0x41', description: "a", value:0x41};
	hardwareKeysTest.bKey 		= {string: '0x42', description: "b", value:0x42};
	hardwareKeysTest.yKey 		= {string: '0x59', description: "y", value:0x59};
	hardwareKeysTest.zKey 		= {string: '0x5A', description: "z", value:0x5A};
	hardwareKeysTest.hashKey 	= {string: '0x78', description: "#", value:0x78};
	hardwareKeysTest.starKey 	= {string: '0x77', description: "*", value:0x77};
	hardwareKeysTest.oneKey 	= {string: '0x31', description: "1", value:0x31};
	hardwareKeysTest.twoKey 	= {string: '0x32', description: "2", value:0x32};
	hardwareKeysTest.fiveKey 	= {string: '0x35', description: "5", value:0x35};
	hardwareKeysTest.nineKey 	= {string: '0x39', description: "9", value:0x39};
	hardwareKeysTest.tabKey 	= {string: '0x09', description: "Tab", value:9};
	hardwareKeysTest.enterKey 	= {string: '0x0D', description: "Enter", value:13};
	hardwareKeysTest.f1Key 		= {string: '0x70', description: "F1", value:0x70};
	hardwareKeysTest.f5Key 		= {string: '0x74', description: "F5", value:116};
	hardwareKeysTest.testKey11 	= {string: '0x31', description: "1", value:0x31};
	hardwareKeysTest.testKey13 	= {string: '0x41', description: "a", value:0x41};
	hardwareKeysTest.testKey14 	= {string: '0x42', description: "b", value:0x42};
	hardwareKeysTest.testKey15 	= {string: '0x32', description: "2", value:0x32};
	hardwareKeysTest.testKey18 	= {string: '0x0D', description: "Enter", value:0x0D};
	hardwareKeysTest.testKey21 	= {string: '51', description: "3", value:51};
}
else if (isApplePlatform())
{
	hardwareKeysTest.testKey11 = {string: '0xa', description: "VolumeUp", value:0xA};
	hardwareKeysTest.testKey13 = {string: '0xb', description: "VolumeDown", value:0xB};
	hardwareKeysTest.testKey14 = {string: '11', description: "VolumeDown", value:11};
	hardwareKeysTest.testKey15 = {string: '11', description: "VolumeDown", value:11};
	hardwareKeysTest.testKey18 = {string: '10', description: "VolumeUp", value:10};
	hardwareKeysTest.testKey21 = {string: '10', description: "VolumeUp", value:10};
}