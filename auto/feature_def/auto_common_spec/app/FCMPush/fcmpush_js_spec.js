if (Rho.System.platform == Rho.System.PLATFORM_ANDROID ) {

    describe('FCM Push', function() {
             
        var srvHost = SERVER_HOST;
        var srvPort = SERVER_PORT;
        var srvURL = "http://"+srvHost+":"+srvPort.toString()+"/ping_fcm";
             
        beforeEach(function() {
			Rho.Push.stopNotifications();
        });

		afterEach(function() {
			Rho.Push.stopNotifications();
		});
             
        it('Pings app with FCM', function() {
          
		  var pushReceived = false;
		  var pushPayload = null;

		  var deviceId = Rho.Push.getDeviceId();

		  var referenceMessage = "Auto Ping Message For " + deviceId;

		  Rho.Push.startNotifications( function(params) {			
			Rho.Push.stopNotifications();
			pushReceived = true;
			pushPayload = params;
		  });

		  Rho.Network.get( { url: srvURL + '?device='+deviceId+"&message="+encodeURIComponent(referenceMessage) }, function(params){} );

          waitsFor( function() {return pushReceived;}, 30000, "Didn't receive push message." );

          runs(function() { expect( pushPayload['data']['message'] ).toEqual( referenceMessage ); } );
        });     
                      
    });	
}
