function outputToPage(theText)
{
	document.getElementById("output1").value = theText;
}

function getRegistrySync(hive, subkey, setting)
{
	var returnedValue = "umbrella";	//  Function is asynchronous so this should not be returned
	jQuery.ajax({
         url:    '/app/SystemRE1Test/get_registry_sync',
		 data: {regHive:hive,regSubkey:subkey,regSetting:setting},
         success: function(result) 	{
					returnedValue = result;
                  },
         async:   false
    });  
	//outputToPage(returnedValue);
	return returnedValue;
}

function setRegistrySync(hive, type, subkey, setting, value, persistent)
{
	var returnedValue = "umbrella";	//  Function is asynchronous so this should not be returned
	jQuery.ajax({
         url:    '/app/SystemRE1Test/set_registry_sync',
		 data: {regHive:hive,regType:type,regSubkey:subkey,regSetting:setting,regValue:value,regPersistent:persistent},
         success: function(result) 	{
					returnedValue = result;
                  },
         async:   false
    });  
	//alert(returnedValue);
	return returnedValue;
}

function deleteRegistrySync(hive, subkey, setting, persistent)
{
	var returnedValue = "umbrella";	//  Function is asynchronous so this should not be returned
	jQuery.ajax({
         url:    '/app/SystemRE1Test/delete_registry_sync',
		 data: {regHive:hive,regSubkey:subkey,regSetting:setting,regPersistent:persistent},
         success: function(result) 	{
					returnedValue = result;
                  },
         async:   false
    });  
	//outputToPage(returnedValue);
	return returnedValue;
}

function getUuidSync()
{
	var returnedValue = "umbrella";	//  Function is asynchronous so this should not be returned
	jQuery.ajax({
         url:    '/app/SystemRE1Test/get_uuid_sync',
		 data: {},
         success: function(result) 	{
					returnedValue = result;
                  },
         async:   false
    });  
	//outputToPage(returnedValue);
	return returnedValue;
}

function getOemSync()
{
	var returnedValue = "umbrella";	//  Function is asynchronous so this should not be returned
	jQuery.ajax({
         url:    '/app/SystemRE1Test/get_oem_sync',
		 data: {},
         success: function(result) 	{
					returnedValue = result;
                  },
         async:   false
    });  
	//outputToPage(returnedValue);
	return returnedValue;
}



function startServer(host, port)
{
	jQuery.ajax({
         url:    '/app/NetworkConnectionTest/startNetworkServer',
		 data: 	{remoteHost:host,remotePort:port},
         async:   true	
	});
}

function stopServer(host, port, sock)
{
	jQuery.ajax({
         url:    '/app/NetworkConnectionTest/stopNetworkServer',
		 data: 	{remoteHost:host,remotePort:port,remoteSocket:sock},
         async:   true	
	});
}

function serverStarted(port)
{
	//  The server has been successfully started
	document.getElementById('networkPort').innerHTML = port;
}

function detectConnection(host, port, timeout)
{
	var szTimeout = '' + timeout;
	jQuery.ajax({
         url:    '/app/NetworkConnectionTest/detectConnection',
		 data: 	{remoteHost:host,remotePort:port,pollTimeout:szTimeout},
         async:   true	
	});
}

function stopDetectingConnection()
{
	jQuery.ajax({
         url:    '/app/NetworkConnectionTest/stopDetectingConnection',
		 data: 	{},
         async:   true	
	});
}

function connectionEvent(connectionStatus)
{
	document.getElementById('connectionStatus').innerHTML = connectionStatus;
}

