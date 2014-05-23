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
	
	describe('EventSource JS API Test By Bhakta', function() {

		var srvHost = SERVER_HOST;
		var srvPort = SERVER_PORT;
		var srvURL = "http://"+srvHost+":"+srvPort.toString()+"/time_stream";

		//var srvURL = "http://localhost:9090/sse/sse.php"
		var source = null;
		var cbOnopenCalled = false;
		var cbOnmessageCalled = false;
		var cbOnerrorCalled = false;
		var cbOnuserlogonCalled = false;

		beforeEach(function() {
			cbOnopenCalled = false;
			cbOnmessageCalled = false;
			cbOnerrorCalled = false;
			cbOnuserlogonCalled = false;
			source = null;
			source = new EventSource(srvURL);
		});
		
		afterEach(function(){
			source.close();
		});
		
		it('should check Server-Sent Events Support', function(){
			expect(EventSource).toBeDefined();
		});
		
		it("should raise exception if url is empty", function(){
			expect(function(){new EventSource("")}).toThrow(new Error("Failed to construct 'EventSource': Cannot open an EventSource to an empty URL."));
		});
		
		it('should create server sent event object and readyState status connecting',function(){
			source = new EventSource(srvURL);
			expect(source).not.toEqual(null);
			expect(source.readyState).toEqual(EventSource.CONNECTING);
		});
		
		it("should fire onopen callback and readyState status open ",function(){

			source.onopen(function(event){
				cbOnopenCalled = true;
			});
			waitsFor(function(){
				return cbOnopenCalled;
			},"waiting for onopen callback to be fired",50000);
			runs(function(){
				expect(source.readyState).toEqual(EventSource.OPEN);
			});
		});
		
		it("should fire onmessage callback when received from server", function(){
			var data = ''
			source.onmessage(function(event){
				data = event.data;
				cbOnmessageCalled = true;
			});
			
			waitsFor(function(){
				return cbOnmessageCalled;
			},"Waiting for onmessage callback to be fired", 50000);
			runs(function(){
				expect(data).toMatch(/server time:/);
			});
		});
		
		it("should check readyState status as closed when closed() called ", function(){
			source.close();
			expect(source.readyState).toEqual(EventSource.CLOSED);

		});
		
		it("should fire onerror callback when its not able to connect to specified server",function(){
			source = null
			source = new EventSource("/test.php");

			source.onerror = function(event){
				cbOnerrorCalled = true;
			}

			waitsFor(function(){
				return cbOnerrorCalled;
			},"Waiting for onerror callback to be fired", 50000);
		});
		
		it('should fire onopen callback while setting using addEventListener',function(){

			source.addEventListener('open', function(e) {
				cbOnopenCalled = true;
			}, false);

			waitsFor(function(){
				return cbOnopenCalled;
			},"waiting for onopen callback to be fired",50000);
			
			runs(function(){
				expect(source.readyState).toEqual(EventSource.OPEN);
			});

		});
		
		it('should fire onmessage callback while setting using addEventListener',function(){

			source.addEventListener('message', function(e) {
				data = e.data;
				cbOnmessageCalled = true;
			}, false);

			waitsFor(function(){
				return cbOnmessageCalled;
			},"Waiting for onmessage callback to be fired", 50000);
			runs(function(){
				expect(data).toMatch(/server time:/);
			});

		});
		
		it('should check for message event contains a e.lastEventId property', function(e){
			var lastEventId = null;
			source.addEventListener('message', function(e) {
				lastEventId = e.lastEventId;
				cbOnmessageCalled = true;
			}, false);
			
			waitsFor(function(){
				return cbOnmessageCalled;
			},"Waiting for onmessage callback to be fired", 50000);
			
			runs(function(){
				expect(lastEventId).not.toEqual(null);
			});
		});
		
		it("should check for message event contains a e.origin property",function(){
			var origin = null;
			source.addEventListener('message', function(e) {
				origin = e.origin;
				cbOnmessageCalled = true;
				console.log(origin);
			}, false);
			
			waitsFor(function(){
				return cbOnmessageCalled;
			},"Waiting for onmessage callback to be fired", 50000);
			
			runs(function(){
				expect(origin).toMatch(/http:/);
			});
		});
		
		it("should fire custom event set through addEventListener", function(){
			/* Sample server data that can be sent from server
			data: {"msg": "First message"}\n\n
			event: userlogon\n
			data: {"username": "John123"}\n\n
			event: update\n
			data: {"username": "John123", "emotion": "happy"}\n\n
			*/
			var data = '';
			source.addEventListener('userlogon', function(e){
				data = JSON.parse(e.data);
				cbOnuserlogonCalled = true;
				console.log(e);
			});
			waitsFor(function(){
				return cbOnuserlogonCalled;
			},'waiting for userlogon callback to be fired',50000);
			runs(function(){
				expect(data.username).toEqual("John123");
			});
		
		});
		
		it('should fire onerror callback while setting using addEventListener', function(){
			
			source = null
			source = new EventSource("/test.php");
			source.addEventListener('error', function(e) {
				cbOnerrorCalled = true;
			}, false);

			waitsFor(function(){
				return cbOnerrorCalled;
			},"Waiting for onerror callback to be fired", 50000);
			runs(function(){
				expect(source.readyState).toEqual(EventSource.CLOSED);
			});
		});
	

	
	});
/*
** Added PHP event source server implementation.
** There is no way available i can port this to WEBRICK, as I am not enable CORS in Webrick.

<?php
header('Content-Type: text/event-stream');
header('Cache-Control: no-cache'); // recommended to prevent caching of event data.
function sendMsg($id, $msg, $event=false) {
  if($event){
	echo 'event: userlogon'. PHP_EOL;
	echo 'data: {"username": "John123"}'. PHP_EOL;
  }else{
    echo "id: $id" . PHP_EOL;
	echo "data: $msg" . PHP_EOL;
  }
  echo PHP_EOL;
  ob_flush();
  flush();
}
$serverTime = time();
sendMsg($serverTime, 'server time: ' . date("h:i:s", time()));
sendMsg(null, null,true);
?>

*/
}