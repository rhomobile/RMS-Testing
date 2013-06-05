function sleep (msec)
{
    var start = new Date().getTime();
    while (new Date().getTime() - start < msec);
}

describe('Network JS API', function() {
         
    var srvHost = SERVER_HOST;
    var srvPort = SERVER_PORT;
    var srvURL = "http://"+SERVER_HOST+":"+SERVER_PORT.toString();
         
    var callbackCount = 0;
         
    var connectionInfo = "";
         
    var detectConnectionCallback = function(args) {
        callbackCount += 1;
        connectionInfo = args.connectionInformation;
    }
         
         
    beforeEach(function() {
        callbackCount = 0;
        connectionInfo = "";
    });
         
    afterEach(function() {
        Rho.Network.stopDetectingConnection(detectConnectionCallback);
    });
         
         
    it('VT293-0013 | cancel with wan/mguest connection', function() {
       var getCallback = function(args) {
            callbackCount += 1;
       }

       runs( function() {
            getProps = {
                url: "http://www.apache.org/licenses/LICENSE-2.0"
            };
            Rho.Network.get(getProps, getCallback);
            sleep(50);
            Rho.Network.cancel();
        } );

        runs(function() {
            expect(callbackCount).toEqual(0);
        });
    });
         
    it('VT293-0014 | detectConnection with wlan profile enabled', function() {
       
        runs( function() {
            detectconnectionProps = {
                 host: srvHost,
                 port: srvPort
            };
            Rho.Network.detectConnection(detectconnectionProps, detectConnectionCallback);
        } );
       
       waitsFor( function() {
                return callbackCount==1;
            },
            "Callback never called",
            5100
        );
            
        runs(function() {
            expect(callbackCount).toEqual(1);
            expect(connectionInfo).toEqual("Connected");
        });
    });
         
    it('VT293-0046 | get with valid url', function() {
       var fullURL = srvURL + "/download";
       var content = "";
       var errCode = -1;
       
        var getCallback = function(args) {
            callbackCount += 1;
            content = args.body;
            errCode = args.http_error;
        }
            
        runs( function() {
             getProps = {
                url: fullURL
             };
             Rho.Network.get(getProps, getCallback);
        });
       
       waitsFor( function() {
                return callbackCount==1;
            },
            "Callback never called",
            2000
        );
       
            
        runs(function() {
            expect(callbackCount).toEqual(1);
            expect(content).toEqual("Downloaded content");
            expect(errCode).toEqual('200');
        });
    });
});