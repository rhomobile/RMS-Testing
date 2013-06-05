
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

