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
             
        var wsCallback = function(args) {
             cbCalled = true;
             
             switch(args['event']) {
             case 'onConnect':
                connected = true;
                break;
             case 'onDisconnect':
                connected = false;
                break;
             case 'onMessage':
                receivedMessage = args['message'];
                break;
             case 'onError':
                receivedMessage = args['error'];
                break;
             }
        }
             
        beforeEach(function() {
            cbCalled = false;
        });
             
        it('Creates websocket', function() {
           ws = Rho.Websocket.create(srvURL);
           expect(ws).toNotEqual(null);
           ws.setListener(wsCallback);
        });
                      
        it('Connects websocket', function() {
             runs(function() { ws.connect(); });
             waitsFor( function() {return cbCalled;}, 5000, "Websocket connect timeout" );
             runs(function() { expect(connected).toEqual(true) });
        });
             
        it('Sends and receives message', function() {
             var message = "Test message";
             runs(function() { ws.send(message); } );
             waitsFor( function() {return cbCalled;}, 5000, "Websocket send timeout" );
             runs(function() {
                expect(receivedMessage).toEqual("Pong: " + message);
             });
        });
/*
        it('Disconnects websocket', function() {
           runs(function() { ws.disconnect(); });
           waitsFor( function() {return cbCalled;}, 5000, "Websocket disconnect timeout" );
           runs(function() { expect(connected).toEqual(false) });
        });
*/
    });
}

    