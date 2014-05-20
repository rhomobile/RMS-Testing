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
	
	describe("Web socket js api test by bhakta", function(){
	
        var srvHost = WEBSOCKET_HOST,
        srvPort = WEBSOCKET_PORT,
        srvURL = "ws://"+srvHost+":"+srvPort.toString(),

        ws1 = null,
		ws2 = null,
        receivedMessage = null,
        connected = false,
        cbOnopenCalled = false,
		cbOnmessageCalled = false,
		cbOncloseCalled = false
		cbOnerrorCalled = false;
             
        beforeEach(function() {
			cbOnopenCalled = false;
			cbOnmessageCalled = false;
			cbOncloseCalled = false;
			cbOnerrorCalled = false;
        });
		
		it('Creates websocket with first argument', function(){
			ws1 = new Websocket(srvURL);
			expect(ws1).not.toEqual(null);
			
			ws1.onopen = function() {
				cbOnopenCalled = true;
				Rho.Log.info("Websocket connection estabilished.", "WEBSOCKET");
			};
			
			waitsFor( function() {return cbOnopenCalled;}, 50000, "Websocket connect timeout" );
		});
		
		
		it('Creates websocket with second argument too', function(){
			ws2 = new Websocket(srvURL, ['soap', 'xmpp']);
			expect(ws2).not.toEqual(null);

			ws2.onopen = function() {
				cbOnopenCalled = true;
				Rho.Log.info("Websocket connection estabilished.", "WEBSOCKET");
			};
			
			waitsFor( function() {return cbOnopenCalled;}, 50000, "Websocket connect timeout" );
		});

		it('should check readystate connection connecting', function(){
			ws3 = new Websocket(srvURL);
			expect(ws3.readyState).toEqual(Websocket.CONNECTING);
			ws3.onopen = function() {
				cbOnopenCalled = true;
				Rho.Log.info("Websocket connection estabilished.", "WEBSOCKET");
			};
			ws3.onclose = function(event) {
				cbOncloseCalled = true;
				Rho.Log.info("Websocket connection closed.", "WEBSOCKET");
			};
			ws3.onmessage = function(event) {
				cbOnmessageCalled = true;
			};
			ws3.onerror = function(error) {
				cbOnerrorCalled = true;
			};
			
		});
		
		it('should check readystate connection open and onopen callback should fire', function(){
			waitsFor(function(){
				return cbOnopenCalled;
			},50000,"Waiting connection to be opened");
			
			runs(function(){
				expect(ws3.readyState).toEqual(Websocket.OPEN);
				/*No other callback should get fired*/
				expect(cbOnmessageCalled).toBeFalsy();
				expect(cbOncloseCalled).toBeFalsy();
				expect(cbOnerrorCalled).toBeFalsy();
			});
		});
		
		it('should send message to websocket server', function(){
			var message = "Test message";
			var receivedMessage = "";
			ws3.onmessage = function(event) {
				cbOnmessageCalled = true;
				receivedMessage = event.data;
				Rho.Log.info("Websocket data received " + event.data, "WEBSOCKET");
			};
					   
			runs(function() {
				ws3.send(message);
			});
			waitsFor( function() {return cbOnmessageCalled;}, 5000, "Websocket send timeout" );
			runs(function() {
				expect(receivedMessage).toEqual("Pong: " + message);
				/*No other callback should get fired*/
				expect(cbOnopenCalled).toBeFalsy();
				expect(cbOncloseCalled).toBeFalsy();
				expect(cbOnerrorCalled).toBeFalsy();
			});
		  
		});
		
		it('should receive JSON message from websocket server', function(){
			var message = "JSON";
			var data = '';
			ws3.onmessage = function(event) {
				data = JSON.parse(event.data);
				Rho.Log.info("Websocket data received " + event.data, "WEBSOCKET");
				cbOnmessageCalled = true;
			};
					   
			runs(function() {
				ws3.send(message);
			});
			waitsFor( function() {return cbOnmessageCalled;}, 5000, "Websocket send timeout" );
			runs(function() {
				expect(data.id).toEqual("ZoomIn");
				expect(data.label).toEqual("Zoom In");
				/*No other callback should get fired*/
				expect(cbOnopenCalled).toBeFalsy();
				expect(cbOncloseCalled).toBeFalsy();
				expect(cbOnerrorCalled).toBeFalsy();
			});
		  
		});
		
		it('should call close() to close connection, ready state closing and then readyState as closed and onclose callback should get fire', function(){
			//If on close set here then call back is not firing.
			/*ws3.onclose = function(event) {
				alert(JSON.stringify(event));
				cbOncloseCalled = true;
				Rho.Log.info("Websocket connection closed.", "WEBSOCKET");
			};*/
			runs(function(){
				ws3.close();
			});
			waitsFor(function(){
				return cbOncloseCalled;
			},50000,"Waiting connection to be opened");
			runs(function(){
				expect(ws3.readyState).toEqual(Websocket.CLOSED);
				/*No other callback should get fired*/
				expect(cbOnopenCalled).toBeFalsy();
				expect(cbOnmessageCalled).toBeFalsy();
				//Currently onerror callback is getting fired after close.
				//SR EMBPD00138418 [F][2] - onerror callback gets fired while calling onclose method to close websocket connection
				expect(cbOnerrorCalled).toBeFalsy();
				
			});
		});
		//Application is crashing here SR EMBPD00138431 [F][2] - Application is getting crashed by calling websocket.send after websocket.close
		xit('should not crash if send called after close', function(){
			var message = "Test message";
			var receivedMessage = "";
			ws3.onmessage = function(event) {
				receivedMessage = event.data;
				Rho.Log.info("Websocket data received " + event.data, "WEBSOCKET");
				cbOnmessageCalled = true;
			};
					   
			runs(function() {
				ws3.send(message);
			});
			waitsFor( function() {return cbCalled;}, 5000, "Websocket send timeout" );
			runs(function() {
				expect(receivedMessage).not.toEqual("Pong: " + message);
			});
		});
		
		it("should check onclose callback should get fired after onerror callback when web socket not able to connect to socket server",function(){
			ws3 = new Websocket("ws://echo.websocket.org");

			ws3.onclose = function(event) {
				cbOncloseCalled = true;
			};
			ws3.onerror = function(error) {
				cbOnerrorCalled = true;
			};
			
			waitsFor(function(){
				return cbOncloseCalled && cbOnerrorCalled;
			},80000,"Waiting onerror followed by on close callback should fire");

		});

	});
}