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
             
        it('Accepts events from server', function() {
          var eventCount = 0;
          var es;

          runs(function(){
            es = new EventSource(srvURL);
            es.onmessage = function(event) {
              ++eventCount;
            }
          });

          waitsFor( function() {return eventCount>=21;}, 30000, "Didn't receive all events." );
          runs(function() { expect(eventCount).toEqual(21); es.close(); } );          
        });
                      
    });
}