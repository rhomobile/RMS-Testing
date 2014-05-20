function sleep (msec)
{
    var start = new Date().getTime();
    while (new Date().getTime() - start < msec);
}

if (Rho.System.platform == Rho.System.PLATFORM_ANDROID) {

    describe('Eventsource JS API', function() {
             
        var srvHost = SERVER_HOST;
        var srvPort = SERVER_PORT;
        var srvURL = "http://"+srvHost+":"+srvPort.toString()+"/time_stream";
             
        beforeEach(function() {
        });
             
        it('Creates websocket', function() {
          
        });
                      
    });
}