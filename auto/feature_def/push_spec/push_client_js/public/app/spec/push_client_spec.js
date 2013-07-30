describe("Push Module", function() {
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
  var isRhoconnectPush = function() {
    return Rho.Push.type == 'rhoconnect-push';
  };

  var typeMatcher = new RegExp(/rhoconnect-push|native-push/),
      serverMatcher = isRhoconnectPush() ? new RegExp(/^(https?:\/\/)/) : new RegExp(''),
      appName = isRhoconnectPush() ? 'someappname' : '',
      notifyMode = 'backgroundNotifications';

  beforeEach(function() {
    Rho.Push.userNotifyMode = notifyMode;
  });

  describe("Properties", function(){

    it("should get pushAppName", function() {
      expect(Rho.Push.pushAppName).toEqual(appName);
      expect(Rho.Push.getProperty('pushAppName')).toEqual(appName);
    });

    it("should get pushServer", function() {
      expect(Rho.Push.pushServer).toMatch(serverMatcher);
      expect(Rho.Push.getProperty('pushServer')).toMatch(serverMatcher);
    });

    it("should get push type", function() {
      expect(Rho.Push.type).toMatch(typeMatcher);
      expect(Rho.Push.getProperty('type')).toMatch(typeMatcher);
    });

    it("should get userNotifyMode on Android", function() {
      if(Rho.System.platform === 'ANDROID') {
        expect(Rho.Push.userNotifyMode).toEqual(notifyMode);
        expect(Rho.Push.getProperty('userNotifyMode')).toEqual(notifyMode);
      } else {
        expect(Rho.Push.userNotifyMode).toEqual('');
        expect(Rho.Push.getProperty('userNotifyMode')).toEqual('');
      }
    });

    it("should set userNotifyMode on Android", function() {
      if(Rho.System.platform === 'ANDROID') {
        Rho.Push.userNotifyMode = 'none';
        expect(Rho.Push.userNotifyMode).toEqual('none');
      } 
    });
  });

  describe("Methods", function(){
    var verifyProperties = function(props) {
      expect(props.type).toMatch(typeMatcher);
      expect(props.pushAppName).toEqual(appName);
      expect(props.pushServer).toMatch(serverMatcher);
      expect(props.userNotifyMode).toEqual(notifyMode);
    };

    it("should enumerate instances", function() {
      var enumObject = [];
      runs(function() {
        Rho.Push.enumerate(function(obj) {
          enumObject = obj;
        });
      });

      waitsFor(function() {
        return enumObject.length > 0;
      }, 'wait', 1000);

      runs(function() {
        expect(enumObject.length).toBeGreaterThan(0);
      });
    });

    it("should getDefault instance", function() {
      var defaultObject = Rho.Push.getDefault();
      expect(defaultObject.getProperty('type')).toMatch(typeMatcher);
    });

    it("should getProperties", function() {
      var properties = Rho.Push.getProperties(['type','pushAppName','pushServer','userNotifyMode']);
      verifyProperties(properties);
    });

    it("should getAllProperties", function() {
      var properties = Rho.Push.getAllProperties();
      verifyProperties(properties);
    });

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
      }, "wait", 80000);

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
      }, "callback2", 100000);

      runs(function() {
        expect(alert1).toEqual('message 1');
        expect(alert2).toEqual('message 2');
      });
    });
  });

});

