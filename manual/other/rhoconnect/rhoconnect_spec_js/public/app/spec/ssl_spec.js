
describe("Rhoconnect Client: SSL Settings", function() {
  var callbackCalled = false,
  errorCode = 0;

  beforeEach(function(){
    callbackCalled = false;
    Rho.ORM.clear();
    var db = new Rho.Database.SQLite3(Rho.Application.databaseFilePath('user'), 'user');
    db.execute("DELETE FROM SOURCES");
    db.execute("DELETE FROM CLIENT_INFO");
    db.execute("DELETE FROM OBJECT_VALUES");
  });

  if (Rho.System.platform != "WP8") {
      it(" | should not connect to self-signed SSL with enabled peer check | unexpected server response", function () {
          Rho.RhoConnectClient.syncServer = 'https://ssl-test.rhohub.com';
          Rho.RhoConnectClient.sslVerifyPeer = true;

          runs(function () {
              expect(Rho.RhoConnectClient.sslVerifyPeer).toEqual(true);
              Rho.RhoConnectClient.login('test', 'test', function (result) {
                  errorCode = parseInt(result.error_code, 10);
                  callbackCalled = true;
              });
          });

          waitsFor(function () {
              return callbackCalled;
          }, "wait", 20000);

          runs(function () {
              expect(errorCode).toEqual(1);
          });

      });

      it(" | should connect to self-signed SSL with disabled peer check | no error", function () {
          Rho.RhoConnectClient.syncServer = 'https://ssl-test.rhohub.com';
          Rho.RhoConnectClient.sslVerifyPeer = false;

          runs(function () {
              Rho.RhoConnectClient.login('test', 'test', function (result) {
                  errorCode = parseInt(result.error_code, 10);
                  callbackCalled = true;
              });
          });

          waitsFor(function () {
              return callbackCalled;
          }, "wait", 20000);

          runs(function () {
              expect(errorCode).toEqual(0);
          });

      });

      xit(" | should connect to trusted SSL server | login successfully", function () {

      });
  }
});