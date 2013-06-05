describe("Network Ruby API", function() {
	beforeEach(function() {
		document.getElementById('networkPort').innerHTML = "8999";
		document.getElementById('connectionStatus').innerHTML = "No Status";
		//  Stop polling the network
		stopDetectingConnection();
	});
	

	afterEach(function() 
	{
		//  Stop polling the network
		stopDetectingConnection();
	});

	//  Start a server and store the port (run in a test)
	//  TEST 1:
	//  Attempt to connect to that server / port
	//  Stop that server
	//  Network should return Disconnected
	//  TEST 2:
	//  Stop checking and start checking again with a different poll interval
	//  Once network connects stop the server
	//  after x seconds network should still report connected
	//  after y seconds network should return disconnected.
	
	//  Global Properties
	var remoteHost = "http://192.168.1.200";	//  Address of ServerSideAssistant
	var remotePort = "8084";				//  Port of ServerSideAssistant
	var blankPort = "8999";  //  A Port which will never have a server
	var timesToRunTest = 4;
	
	for (var i=0; i<timesToRunTest; i++) 
	{
		(function(idx) 
		{ 
			it ("Starting a Server and connecting with Poll Interval: " + ((5000 * idx) + 5000), function()
			{
				runs(function() 
				{		
					//  Start a server
					startServer(remoteHost, remotePort);
					//  Give server 5 seconds to start successfully and retrieve the port
					waitsFor(function() 
					{
						return document.getElementById('networkPort').innerHTML != "8999";
					}, "Starting a remote socket", 5000);

					runs(function()
					{
						var testPort = document.getElementById('networkPort').innerHTML;
						if (testPort == "")
							testPort = blankPort;

						//  Try to Connect to the specified port
						detectConnection(remoteHost, testPort, ((5000 * idx) + 5000));
						//  Give the server a second to establish the connection
						waitsFor(function() 
						{
							return document.getElementById('connectionStatus').innerHTML == "Connected";
						}, "Connecting to remote Socket", 2000);
						
						runs(function()
						{
							//  Stop the server running
							stopServer(remoteHost, remotePort, testPort)
							
							//  Right after stopping we expect the status to continue to report connected
							expect(document.getElementById('connectionStatus').innerHTML).toBe("Connected");
							
							//  Give the server 6 seconds to realise the connection has gone down.
							//  We say 2000ms more here to account for the socket connection timeout
							waitsFor(function() 
							{
								return document.getElementById('connectionStatus').innerHTML == "Disconnected";
							}, "Connecting to remote Socket", ((5000 * idx) + 6000));
					
						});
					});
				});
				
			});
		})(i);
	}
});

