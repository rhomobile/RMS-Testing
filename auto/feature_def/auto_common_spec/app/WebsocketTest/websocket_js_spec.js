function sleep (msec)
{
    var start = new Date().getTime();
    while (new Date().getTime() - start < msec);
}

if (Rho.System.platform == Rho.System.PLATFORM_ANDROID) {

    describe('WebSocket JS API', function() {
             
        var srvHost = WEBSOCKET_HOST;
        var srvPort = WEBSOCKET_PORT;
        var srvURL = "ws://"+srvHost+":"+srvPort.toString();
             
        it('Creates websocket, connects, sends/receives message and close websocket', function() {
          var openCalled = false;
          var errorCalled = false;
          var numMessageCalled = 0;
          var closeCalled = false;
          var message = "Test message";
          var receivedMessage = null;
          
          var ws = new WebSocket(srvURL);
          expect(ws).toNotEqual(null);

          ws.onopen = function() {
            openCalled = true;
            Rho.Log.info("WebSocket connection estabilished.", "WEBSOCKET");
          };
          
          ws.onmessage = function(event) {
               ++numMessageCalled;
               Rho.Log.info("WebSocket data received " + event.data, "WEBSOCKET");
               receivedMessage = event.data;
          };
           
          ws.onerror = function(error) {
            errorCalled = true;
            Rho.Log.error("Error " + error.message, "WEBSOCKET");
          };
          
          ws.onclose = function(event) {
            closeCalled = true;
            Rho.Log.info('Closed websocket with code: ' + event.code + ' reason: ' + event.reason, "WEBSOCKET");
           };
           
          waitsFor( function() {return openCalled;}, 5000, "WebSocket connect timeout" );
          
          runs(function() {
            expect(ws.readyState).toEqual(WebSocket.OPEN);
            expect(errorCalled).toBeFalsy();
          }
          );
          
          runs(function() {
            for (var i=0;i<5;++i)
              ws.send(message);
          });
           
           waitsFor( function() {return numMessageCalled==5;}, 5000, "WebSocket send timeout" );
           runs(function() {
             expect(receivedMessage).toEqual("Pong: " + message);
           });

           runs(function() { ws.close(); });
           waitsFor( function() {return closeCalled;}, 5000, "WebSocket disconnect timeout" );
           runs(function() { expect(ws.readyState).toEqual(WebSocket.CLOSED) });
        });
             
    });
	
	describe("Web socket js api test by bhakta", function(){
	
        var srvHost = WEBSOCKET_HOST,
        srvPort = WEBSOCKET_PORT,
        srvURL = "ws://"+srvHost+":"+srvPort.toString();

		it("should raise exception if url is empty", function(){
			expect(function(){new WebSocket("")}).toThrow(new Error("WebSocket URL is empty."));
		});
		
		it('Creates websocket with first argument', function(){

			var cbOnopenCalled = false;

			var ws1 = new WebSocket(srvURL);
			expect(ws1).not.toEqual(null);
			
			ws1.onopen = function() {
				cbOnopenCalled = true;
				Rho.Log.info("WebSocket connection estabilished.", "WEBSOCKET");
			};
			
			waitsFor( function() {return cbOnopenCalled; }, 50000, "WebSocket connect timeout" );

			runs( function() { ws1.close(); } );
		});
		
		
		it('Creates websocket with second argument too', function(){

			var cbOnopenCalled = false;

			var ws2 = new WebSocket(srvURL, ['soap', 'xmpp']);
			expect(ws2).not.toEqual(null);

			ws2.onopen = function() {
				cbOnopenCalled = true;
				Rho.Log.info("WebSocket connection estabilished.", "WEBSOCKET");
			};
			
			waitsFor( function() {return cbOnopenCalled; }, 50000, "WebSocket connect timeout" );

			runs( function() { ws2.close(); } );
		});

    it('should check readystate connection connecting AND should check readystate connection open and onopen callback should fire', function(){
			var cbOnopenCalled = false;
			var cbOnmessageCalled = false;
			var cbOncloseCalled = false;
			var cbOnerrorCalled = false;

			var ws3 = new WebSocket(srvURL);
			expect(ws3.readyState).toEqual(WebSocket.CONNECTING);
			ws3.onopen = function() {
				cbOnopenCalled = true;
				Rho.Log.info("WebSocket connection estabilished.", "WEBSOCKET");
			};
			ws3.onclose = function(event) {
				cbOncloseCalled = true;
				Rho.Log.info("WebSocket connection closed.", "WEBSOCKET");
			};
			ws3.onmessage = function(event) {
				cbOnmessageCalled = true;
			};
			ws3.onerror = function(error) {
				cbOnerrorCalled = true;
			};
			
			waitsFor(function(){
				return cbOnopenCalled;
			},50000,"Waiting connection to be opened");
			
			runs(function(){
				expect(ws3.readyState).toEqual(WebSocket.OPEN);
				/*No other callback should get fired*/
				expect(cbOnmessageCalled).toBeFalsy();
				expect(cbOncloseCalled).toBeFalsy();
				expect(cbOnerrorCalled).toBeFalsy();
				ws3.close();
			});
      
      waitsFor(function(){
				return cbOncloseCalled;
			},50000,"Waiting connection to be closed");
      
      runs(function(){
				expect(cbOncloseCalled).toEqual(true);
        expect(cbOnerrorCalled).toBeFalsy();
			});

      
		});
		
		it('should send message to websocket server', function(){

			var cbOnopenCalled = false;
			var cbOnmessageCalled = false;
			var cbOncloseCalled = false;
			var cbOnerrorCalled = false;

			var message = "Test message";
			var receivedMessage = "";

			var ws = new WebSocket(srvURL);

			ws.onopen = function() {
				cbOnopenCalled = true;
				Rho.Log.info("WebSocket connection estabilished.", "WEBSOCKET");
			}
			ws.onclose = function(event) {
				cbOncloseCalled = true;
				Rho.Log.info("WebSocket connection closed.", "WEBSOCKET");
			};
			ws.onerror = function(error) {
				cbOnerrorCalled = true;
			};
			waitsFor(function(){
				return cbOnopenCalled;
			},50000,"Waiting connection to be opened");


			ws.onmessage = function(event) {
				cbOnmessageCalled = true;
				receivedMessage = event.data;
				Rho.Log.info("WebSocket data received " + event.data, "WEBSOCKET");
			};
					   
			runs(function() {
				cbOnopenCalled = false;
				ws.send(message);
			});
			waitsFor( function() {return cbOnmessageCalled;}, 5000, "WebSocket send timeout" );
			runs(function() {
				expect(receivedMessage).toEqual("Pong: " + message);
				/*No other callback should get fired*/
				expect(cbOnopenCalled).toBeFalsy();
				expect(cbOncloseCalled).toBeFalsy();
				expect(cbOnerrorCalled).toBeFalsy();

				ws.close();
			});
		  
		});
		
		it('should receive JSON message from websocket server', function(){
			var cbOnopenCalled = false;
			var cbOnmessageCalled = false;
			var cbOncloseCalled = false;
			var cbOnerrorCalled = false;

			var ws = new WebSocket(srvURL);

			var message = "JSON";
			var data = '';
			ws.onmessage = function(event) {
				data = JSON.parse(event.data);
				Rho.Log.info("WebSocket data received " + event.data, "WEBSOCKET");
				cbOnmessageCalled = true;
			};
			ws.onopen = function() {
				cbOnopenCalled = true;
				Rho.Log.info("WebSocket connection estabilished.", "WEBSOCKET");
			};
			ws.onclose = function(event) {
				cbOncloseCalled = true;
				Rho.Log.info("WebSocket connection closed.", "WEBSOCKET");
			};
			ws.onerror = function(error) {
				cbOnerrorCalled = true;
			};

			waitsFor(function(){
				return cbOnopenCalled;
			},50000,"Waiting connection to be opened");
					   
			runs(function() {
				cbOnopenCalled = false;
				ws.send(message);
			});
			waitsFor( function() {return cbOnmessageCalled;}, 5000, "WebSocket send timeout" );
			runs(function() {
				expect(data.id).toEqual("ZoomIn");
				expect(data.label).toEqual("Zoom In");
				/*No other callback should get fired*/
				expect(cbOnopenCalled).toBeFalsy();
				expect(cbOncloseCalled).toBeFalsy();
				expect(cbOnerrorCalled).toBeFalsy();
				ws.close();
			});
		  
		});
		
		it('should call close() to close connection, ready state closing and then readyState as closed and onclose callback should get fire', function(){
			//If on close set here then call back is not firing.
			/*ws3.onclose = function(event) {
				alert(JSON.stringify(event));
				cbOncloseCalled = true;
				Rho.Log.info("WebSocket connection closed.", "WEBSOCKET");
			};*/

			var cbOnopenCalled = false;
			var cbOnmessageCalled = false;
			var cbOncloseCalled = false;
			var cbOnerrorCalled = false;

			var ws = new WebSocket(srvURL);

			ws.onopen = function() {
				cbOnopenCalled = true;
                Rho.Log.info("WebSocket connection estabilished.", "WEBSOCKET");
            }
			ws.onclose = function(event) {
				cbOncloseCalled = true;
				Rho.Log.info("WebSocket connection closed.", "WEBSOCKET");
			};
			ws.onerror = function(error) {
				Rho.Log.info("WebSocket error: " + error, "WEBSOCKET");
				cbOnerrorCalled = true;
			};
			ws.onmessage = function(event) {
				Rho.Log.info("WebSocket data received " + event.data, "WEBSOCKET");
				cbOnmessageCalled = true;
			};   

			waitsFor(function(){
				return cbOnopenCalled;
			},50000,"Waiting connection to be opened");

			runs(function(){
				Rho.Log.info("Closing websocket", "WEBSOCKET");
				cbOnopenCalled = false;
				ws.close();
			});
			waitsFor(function(){
				return cbOncloseCalled;
			},50000,"Waiting connection to be opened");
			runs(function(){
				expect(ws.readyState).toEqual(WebSocket.CLOSED);
				/*No other callback should get fired*/
				expect(cbOnopenCalled).toBeFalsy();
				expect(cbOnmessageCalled).toBeFalsy();
				expect(cbOnerrorCalled).toBeFalsy();				
			});
		});
		
		it('should not crash if send called after close', function(){
			var message = "Test message";
			var receivedMessage = "";

			var cbOnopenCalled = false;
			var cbOnmessageCalled = false;
			var cbOncloseCalled = false;
			var cbOnerrorCalled = false;

			var ws = new WebSocket(srvURL);

			ws.onopen = function() {
				cbOnopenCalled = true;
				Rho.Log.info("WebSocket connection estabilished.", "WEBSOCKET");
			};
			ws.onclose = function(event) {
				cbOncloseCalled = true;
				Rho.Log.info("WebSocket connection closed.", "WEBSOCKET");
			};
			ws.onerror = function(error) {
				cbOnerrorCalled = true;
			};
			ws.onmessage = function(event) {
				Rho.Log.info("WebSocket data received " + event.data, "WEBSOCKET");
				receivedMessage = event.data;
				cbOnmessageCalled = true;
			};   

			waitsFor(function(){
				return cbOnopenCalled;
			},50000,"Waiting connection to be opened");

			runs(function(){
				cbOnopenCalled = false;
				ws.close();
			});

			waitsFor(function(){
				return cbOncloseCalled;
			},50000,"Waiting connection to be opened");
					   
			runs(function() {
				ws.send(message);
			});

			waitsFor( function() {return cbOnerrorCalled;}, 5000, "WebSocket send timeout" );

			runs(function() {
				expect(receivedMessage).not.toEqual("Pong: " + message);
			});
		});
		
		it("should check onclose callback should get fired after onerror callback when web socket not able to connect to socket server",function(){

			var cbOncloseCalled = false;
			var cbOnerrorCalled = false;

			var ws3 = new WebSocket("ws://some.unavailable.domain");

			ws3.onclose = function(event) {
				Rho.Log.info("WebSocket onclose", "WEBSOCKET");
				cbOncloseCalled = true;
			};
			ws3.onerror = function(error) {
				Rho.Log.info("WebSocket onerror " + error, "WEBSOCKET");
				cbOnerrorCalled = true;
			};
			
			waitsFor(function(){
				return cbOncloseCalled && cbOnerrorCalled;
			},80000,"Waiting onerror followed by on close callback should fire");

		});

	});
}