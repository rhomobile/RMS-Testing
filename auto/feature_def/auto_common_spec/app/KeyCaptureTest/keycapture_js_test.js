var hardwareKeysTest = {};

hardwareKeysTest.deviceOS = Rho.System.platform;
console.log('DeviceOs: ' + hardwareKeysTest.deviceOS);
hardwareKeysTest.callbackFired = false;
hardwareKeysTest.TRIGGER = 100;
hardwareKeysTest.LETTER_A_CODE = 0x41;
hardwareKeysTest.textBox = null;
hardwareKeysTest.cachedIsAndroid = null;

hardwareKeysTest.isAndroid = function()
{
	if(hardwareKeysTest.cachedIsAndroid == null)
	{
		if(hardwareKeysTest.deviceOS.toLowerCase().indexOf('android') == -1)
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