function sleep (msec)
{
    var start = new Date().getTime();
    while (new Date().getTime() - start < msec);
}

if (Rho.System.platform == Rho.System.PLATFORM_ANDROID ) {

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

          waitsFor( function() {return eventCount>=3;}, 30000, "Didn't receive all events." );
          runs(function() { expect(eventCount).toEqual(3); es.close(); } );
        });

        it('Works correctly when received wrong mime-type', function() {
          var es;
          var url = "http://"+srvHost+":"+srvPort.toString()+"/time_stream_wrong_mime";
          var haveError = false;

          runs(function(){
            es = new EventSource(url);
            es.onerror = function(event) {
              haveError = true;
            }

          });

          waitsFor( function() {return haveError;}, 2000, "Didn't receive error." );
          runs(function() { expect(haveError).toEqual(true); es.close(); } );
        });
                      
    });
	
	describe('EventSource JS API Test By Bhakta', function() {

		var srvHost = SERVER_HOST;
		var srvPort = SERVER_PORT;
		var srvURL = "http://"+srvHost+":"+srvPort.toString()+"/time_stream";

		//var srvURL = "http://localhost:9090/sse/sse.php"
		//var source = null;
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
			//source = new EventSource(srvURL);
		});
		
		afterEach(function(){
			//source.close();
		});
		
		it('should check Server-Sent Events Support', function(){
			expect(EventSource).toBeDefined();
		});
		
		it("should raise exception if url is empty", function(){
			expect(function(){
                new EventSource("")
            }
            ).toThrow(new Error("Failed to construct 'EventSource': Cannot open an EventSource to an empty URL."));
		});
		
		it('should create server sent event object and readyState status connecting',function(){
			var source = new EventSource(srvURL);
			expect(source).not.toEqual(null);
			expect(source.readyState).toEqual(EventSource.CONNECTING);
            source.close();
		});
		
		it("should fire onopen callback and readyState status open ",function(){
        
            var source = new EventSource(srvURL);
           
			source.onopen = function(event){
				cbOnopenCalled = true;
			};
			waitsFor(function(){
				return cbOnopenCalled;
			},"waiting for onopen callback to be fired",50000);
			runs(function(){
				expect(source.readyState).toEqual(EventSource.OPEN);
			});
            runs(function(){ source.close(); } );
		});
		
		it("should fire onmessage callback when received from server", function(){
            var source = new EventSource(srvURL);

        
			var data = ''
			source.onmessage = function(event){
				data = event.data;
				cbOnmessageCalled = true;
			};
			
			waitsFor(function(){
				return cbOnmessageCalled;
			},"Waiting for onmessage callback to be fired", 50000);
			runs(function(){
				expect(data).toMatch(/server time:/);
			});
           
            runs(function(){ source.close(); } );
		});
		
		it("should check readyState status as closed when closed() called ", function(){
            var source = new EventSource(srvURL);
			source.close();
			expect(source.readyState).toEqual(EventSource.CLOSED);

		});
		
		it("should fire onerror callback when its not able to connect to specified server",function(){
			var source = new EventSource("/test.php");

			source.onerror = function(event){
				cbOnerrorCalled = true;
			}

			waitsFor(function(){
				return cbOnerrorCalled;
			},"Waiting for onerror callback to be fired", 50000);
            
            runs(function(){ source.close(); } );
		});
		
		it('should fire onopen callback while setting using addEventListener',function(){
            var source = new EventSource(srvURL);

			source.addEventListener('open', function(e) {
				cbOnopenCalled = true;
			}, false);

			waitsFor(function(){
				return cbOnopenCalled;
			},"waiting for onopen callback to be fired",50000);
			
			runs(function(){
				expect(source.readyState).toEqual(EventSource.OPEN);
			});
           
            runs(function(){ source.close(); } );

		});
		
		it('should fire onmessage callback while setting using addEventListener',function(){
            var source = new EventSource(srvURL);
            var data = '';

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
           
            runs(function(){ source.close(); } );

		});
		
		it('should check for message event contains a e.lastEventId property', function(e){
            var source = new EventSource(srvURL);

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
           
            runs(function(){ source.close(); } );
		});
		
		it("should check for message event contains a e.origin property",function(){

            var source = new EventSource(srvURL);

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
            
            runs(function(){ source.close(); } );

		});
		
		it("should fire custom event set through addEventListener", function(){
			/* Sample server data that can be sent from server
			data: {"msg": "First message"}\n\n
			event: userlogon\n
			data: {"username": "John123"}\n\n
			event: update\n
			data: {"username": "John123", "emotion": "happy"}\n\n
			*/
            var source = new EventSource("http://"+srvHost+":"+srvPort.toString()+"/time_stream2");
            
			var data = '';
			source.addEventListener('userlogon', function(e){
				cbOnuserlogonCalled = true;
				data = JSON.parse(e.data);
				console.log(e);
			});
			waitsFor(function(){
				return cbOnuserlogonCalled;
			},'waiting for userlogon callback to be fired',50000);
			runs(function(){
				expect(data.username).toEqual("John123");
			});
            
            runs(function(){ source.close(); } );
		
		});
		
		it('should fire onerror callback while setting using addEventListener', function(){
			
			var source = new EventSource("/test.php");
			source.addEventListener('error', function(e) {
				cbOnerrorCalled = true;
                source.close();
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