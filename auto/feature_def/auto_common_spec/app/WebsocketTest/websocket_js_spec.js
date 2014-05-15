function sleep (msec)
{
    var start = new Date().getTime();
    while (new Date().getTime() - start < msec);
}

if (Rho.System.platform == Rho.System.PLATFORM_ANDROID) {


    describe('Websocket JS API', function() {
             
        var srvHost = WEBSOCKET_HOST;
        var srvPort = WEBSOCKET_PORT;
        var srvURL = "ws://"+srvHost+":"+srvPort.toString();
        var ws = null;
             
             
        var receivedMessage = null;
        var connected = false;
        var cbCalled = false;
             
        beforeEach(function() {
            cbCalled = false;
        });
             
        it('Creates websocket', function() {
          ws = new Websocket(srvURL);
          expect(ws).toNotEqual(null);

          ws.onopen = function() {
            cbCalled = true;
            Rho.Log.info("Websocket connection estabilished.", "WEBSOCKET");
          };

          ws.onclose = function(event) {
            cbCalled = true;
            Rho.Log.info('Closed websocket with code: ' + event.code + ' reason: ' + event.reason, "WEBSOCKET");
          };

          ws.onmessage = function(event) {
            cbCalled = true;              
            Rho.Log.info("Websocket data received " + event.data, "WEBSOCKET");
            receivedMessage = event.data;
          };

          ws.onerror = function(error) {
            cbCalled = true;
            Rho.Log.error("Error " + error.message, "WEBSOCKET");
          };

          waitsFor( function() {return cbCalled;}, 5000, "Websocket connect timeout" );
        });
                      
        it('Connects websocket', function() {
             runs(function() { expect(ws.readyState).toEqual(Websocket.OPEN) });
        });
             
        it('Sends and receives message', function() {
             var message = "Test message";
             runs(function() { ws.send(message); } );
             waitsFor( function() {return cbCalled;}, 5000, "Websocket send timeout" );
             runs(function() {
                expect(receivedMessage).toEqual("Pong: " + message);
             });
        });

        it('Disconnects websocket', function() {
           runs(function() { ws.close(); });
           waitsFor( function() {return cbCalled;}, 5000, "Websocket disconnect timeout" );
           runs(function() { expect(ws.readyState).toEqual(Websocket.CLOSED) });
        });
    });
}

    