describe("Push Module", function(){

  var pushServerUrl = 'http://' + PUSH_HOST + ':' + PUSH_PORT,
      syncServerUrl = 'http://' + RHOCONNECT_HOST + ':' + RHOCONNECT_PORT;

  beforeEach(function(){
    Rho.RhoConnectClient.syncServer = syncServerUrl;
    Rho.Push.pushServer = pushServerUrl;
  });
  
  it("should getDeviceId from push service", function(){
    var deviceId = '';
    runs(function() {
      Rho.RhoConnectClient.login('testuser','testuser', function(){
        Rho.Push.getDeviceId(function(something) {
          console.log("***** SOMETHING ****: " + JSON.stringify(something));
          deviceId = something;
        });
      });
    });

    waitsFor(function(){
      deviceId != '';
    }, "wait", 6000);

    runs(function() {
      expect(deviceId).toMatch('foo');
    });
  });

  it("should get one message from push service", function(){
    var deviceId = '';
    runs(function() {
      Rho.RhoConnectClient.login('testuser','testuser', function(){
        Rho.Push.getDeviceId(function() {});
        Rho.Push.startNotifications(function(args){
          alert("Msg: " + JSON.stringify(args));
        });
      });
    });

    waitsFor(function(){
      deviceId != '';
    }, "wait", 6000);

    runs(function() {
      expect(deviceId).toMatch('foo');
    });
  });
});