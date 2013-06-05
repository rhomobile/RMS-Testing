var hardwareKeysTest = {};

hardwareKeysTest.deviceOS = Rho.System.platform;
hardwareKeysTest.callbackFired = true;
hardwareKeysTest.TRIGGER = 100;
if(hardwareKeysTest.isAndroid())
{
	hardwareKeysTest.TRIGGER = 103;			
}

hadwareKeysTest.isAndroid = function()
{
	if(hardwareKeysTest.deviceOS.toLowerCase().indexOf('android') == -1)
	{
		return false;
	}
	return true;
};

hardwareKeysTest.simulateKeyPress = function(keyValue)
{
	Rho.Instrumentation.simulate_key_event_code(keyValue);
};

///////////////////////////////////////////////////////////////////////////
// Key Capture
///////////////////////////////////////////////////////////////////////////
hardwareKeysTest.captureKeyCallback = function(keyValueHash) 
{
	hardwareKeysTest.callbackFired = true;
	if(hardwareKeysTest.callbackFiredResult == '')
	{
		hardwareKeysTest.callbackFiredResult = keyValueHash["keyValue"];
	}
	else if(typeof hardwareKeysTest.callbackFiredResult == 'string')
	{
		hardwareKeysTest.callbackFiredResult = [hardwareKeysTest.callbackFiredResult, keyValueHash["keyValue"]];
	}
	else
	{
		hardwareKeysTest.callbackFiredResult.push(keyValueHash["keyValue"]);
	}
};

hardwareKeysTest.captureKey = function(bDispatch,key)
{
	Rho.KeyCapture.captureKey(bDispatch,key,captureKeyCallback);
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
	hardwareKeysTest.callbackFired = true;
	if(hardwareKeysTest.callbackFiredResult == '')
	{
		hardwareKeysTest.callbackFiredResult = keyValueHash["triggerFlag"];
	}
	else if(typeof hardwareKeysTest.callbackFiredResult == 'string')
	{
		hardwareKeysTest.callbackFiredResult = [hardwareKeysTest.callbackFiredResult, keyValueHash["triggerFlag"]];
	}
	else
	{
		hardwareKeysTest.callbackFiredResult.push(keyValueHash["triggerFlag"]);
	}
};

hardwareKeysTest.setTrigger = function()
{
	Rho.KeyCapture.captureTrigger(triggerCallback);
};

hardwareKeysTest.resetTrigger = function()
{
	Rho.KeyCapture.captureTrigger();
};


