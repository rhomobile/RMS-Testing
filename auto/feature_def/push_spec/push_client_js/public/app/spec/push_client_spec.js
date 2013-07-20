describe("Push Module", function(){
  var rcHeaders = {
    'X-RhoConnect-API-TOKEN':'my-rhoconnect-token',
    'Content-Type':'application/json'
  };
  var sendPushMessage = function(args) {
    var body = JSON.stringify({
      user_id: args.user_id,
      message: args.message
    });
    var postData = {
      body: body,
      headers: rcHeaders,
      url: Rho.RhoConnectClient.syncServer + '/rc/v1/users/ping'
    };
    Rho.Network.post(postData, function(){});
  };

  // TODO: Enable this code when specs are stable
  // var reset = false;
  // beforeEach(function() {
  //   reset = false;
  //   var resetProps = {
  //     url: Rho.RhoConnectClient.syncServer + '/rc/v1/system/reset',
  //     headers: rcHeaders
  //   };
  //   runs(function() {
  //     Rho.Network.post(resetProps, function() { reset = true; });
  //   });

  //   waitsFor(function() {
  //     return reset;
  //   }, "resets", 10000);
  // });

  it("should register and getDeviceId from push service", function(){
    var deviceId = '';
    runs(function() {
      Rho.RhoConnectClient.login('testuser','testuser', function(){
        Rho.Push.getDeviceId(function(args) {
          deviceId = args;
        });
      });
    });

    waitsFor(function(){
      return deviceId != '';
    }, "wait", 30000);

    runs(function() {
      expect(deviceId.length).toBeGreaterThan(10);
    });
  });

  it("should get one message from push service", function(){
    var alert = '',
        callbackCalled = false;
    runs(function() {
      Rho.RhoConnectClient.login('testuser','testuser', function(){
        Rho.Push.startNotifications(function(args){
          if(args.alert) {
            alert = args.alert;
            callbackCalled = true;
          }
        });
        Rho.Push.getDeviceId(function(args){
          if(args !== '') {
            sendPushMessage({message: 'push message', user_id: 'testuser'});
          }
        });
      });
    });

    waitsFor(function(){
      return callbackCalled;
    }, "wait", 30000);

    runs(function() {
      expect(alert).toMatch('push message');
    });
  });

  it("should get n unordered (5) messages from push service", function(){
    var messages = [],
        callbackCalled = false;
    runs(function() {
      Rho.RhoConnectClient.login('testuser','testuser', function(){
        Rho.Push.startNotifications(function(args){
          if(args.alert) {
            messages.push(args.alert);
          }
        });
        Rho.Push.getDeviceId(function(args){
          var i = 0;
          var loop = setInterval(function() {
            if(i === 5) {
              clearInterval(loop);
            } else {
              var msg = 'message ' + i;
              sendPushMessage({message: msg, user_id: 'testuser'});
              i++;
            }
          }, 1000);
        });
      });
    });

    waitsFor(function(){
      return messages.length === 5;
    }, "wait", 30000);

    runs(function() {
      expect(messages.length).toEqual(5);
      messages.sort();
      expect(messages).toEqual(
        ['message 0','message 1','message 2','message 3','message 4']
      );
    });
  });

  it("should stop/start and receive notifications", function(){
    var alert1 = ''
        alert2 = '',
        callback1 = false,
        callback2 = false;
    runs(function() {
      Rho.RhoConnectClient.login('testuser','testuser', function(){
        Rho.Push.startNotifications(function(args){
          if(args.alert) {
            alert1 = args.alert;
            callback1 = true;
          }
        });
        Rho.Push.getDeviceId(function(args){
          if(args !== '') {
            sendPushMessage({message: 'message 1', user_id: 'testuser'});
          }
        });
      });
    });

    waitsFor(function() {
      return callback1;
    }, "wait", 30000);

    runs(function() {
      Rho.Push.stopNotifications();
      setTimeout(function() {
        Rho.Push.startNotifications(function(args) {
          if(args.alert) {
            alert2 = args.alert;
            callback2 = true;
          }
        });
        sendPushMessage({message: 'message 2', user_id: 'testuser'});
      }, 10000);
    });

    waitsFor(function() {
      return callback2;
    }, "wait", 30000);

    runs(function() {
      expect(alert1).toEqual('message 1');
      expect(alert2).toEqual('message 2');
    });
  });

  it("should unregister/register and receive notifications", function(){
    var alert1 = ''
        alert2 = '',
        callback1 = false,
        callback2 = false,
        deviceId1 = '',
        deviceId2 = '';
    runs(function() {
      Rho.RhoConnectClient.login('testuser','testuser', function(){
        setTimeout(function(){
          Rho.Push.startNotifications(function(args){
            if(args.alert) {
              alert1 = args.alert;
              callback1 = true;
            }
          });
          Rho.Push.getDeviceId(function(args){
            if(args !== '') {
              deviceId1 = args;
              sendPushMessage({message: 'message 1', user_id: 'testuser'});
            }
          });
        }, 10000);
      });
    });

    waitsFor(function() {
      return callback1;
    }, "wait", 30000);

    runs(function() {
      Rho.RhoConnectClient.logout();
      // TODO: getDeviceId should only return after register finishes
      setTimeout(function(){
        Rho.RhoConnectClient.login('testuser2','testuser2', function(){
          Rho.Push.startNotifications(function(args){
            if(args.alert) {
              alert2 = args.alert;
              callback2 = true;
            }
          });
        });
        setTimeout(function(){
          Rho.Push.getDeviceId(function(args){
            if(args !== '') {
              deviceId2 = args;
              sendPushMessage({message: 'message 2', user_id: 'testuser2'});
            }
          });
        }, 10000);
      }, 10000);
    });

    waitsFor(function() {
      return callback2;
    }, "callback2", 60000);

    runs(function() {
      expect(alert1).toEqual('message 1');
      expect(alert2).toEqual('message 2');
    });
  });
});
