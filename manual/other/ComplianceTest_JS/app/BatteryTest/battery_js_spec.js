var testResult = '';
var captured = false;
var platformSupported = ["ANDROID", "WINDOWS", "APPLE"];

describe("Battery Compliance JS Tests", function () {
  if(platformSupported.indexOf(Rho.System.platform)!= -1){
    var smartBatteryStatusCallback = function (args){
        var result = '';
        result += '<br/>serialNumber: ' + JSON.stringify(args["serialNumber"]);
        result += '<br/>partNumber: ' + JSON.stringify(args["partNumber"]);
        result += '<br/>batteryChargeCycles: ' + JSON.stringify(args["batteryChargeCycles"]);
        result += '<br/>ratedCapacity: ' + JSON.stringify(args["ratedCapacity"]);
        result += '<br/>manufactureDate: ' + JSON.stringify(args["manufactureDate"]);
        result += '<br/>stateOfHealth: ' + JSON.stringify(args["stateOfHealth"]);
        displayResult("Output: ",result);
      } 

    var batteryStatusCallback = function (args){
          var result = '';
          result += '<br/>AcLineStatus: ' + JSON.stringify(args["acLineStatus"]);
          result += '<br/>BatteryLifePercent: ' + JSON.stringify(args["batteryLifePercent"]);
          result += '<br/>BackupBatteryLifePercent: ' + JSON.stringify(args["backupBatteryLifePercent"]);
          result += '<br/>Trigger: ' + JSON.stringify(args["trigger"]);
          result += '<br/>BatteryLifeKnown: ' + JSON.stringify(args["batteryLifeKnown"]);
          result += '<br/>BackupBatteryLifeKnown: ' + JSON.stringify(args["backupBatteryLifeKnown"]);
          displayResult("Output: ",result);
        } 


      var displayflag = false;
      beforeEach(function () {
          /* ... Set up your object ... */
          testResult = '';
          captured = false;
          displayResult("", "");
      });

      afterEach(function () {
          /* ... Tear it down ... */
      	Rho.Battery.stopBatteryStatus();
      });

  if (isAnyButApplePlatform())
  { 
  	it("VT200-0442 | Battery showIcon all property|", function () {
    
            runs(function () {
                dispTestCaseRunning("VT200-0442 check for all the hash properties defined ");
                dispExpectedResult("battery icon should be shown with layout left and red in conlor horizontal and vertical position at 20 and 40");
              Rho.Battery.showIcon({left: 20,top: 40,layout:'left',color:'#FF0000'});
            });
            waitsFor(function () {
                return captured;
            }, 'Battery should have been displayed by now', 30000);
    
            runs(function () {
                expect(testResult).toEqual(true);
            });
  	});          
  }

  it("VT200-0443 | Call batteryStatus method with Hash Property trigger to periodic, refreshInterval to 8000 and callback|", function () {
            runs(function () {
                dispTestCaseRunning("VT200-0443 batteryStatus method with Hash Property trigger to periodic with callback default refresh interval check for every 8 seconds");
                dispExpectedResult("batteryStatus callback should get fire and batteryStatus should updated for every 8 seconds");
              Rho.Battery.stopBatteryStatus();
              Rho.Battery.batteryStatus({trigger :'periodic',refreshInterval :8000},batteryStatusCallback);
            });
            
            waitsFor(function () {
                return captured;
            }, 'Tester should have responded by now', 180000);
    
            runs(function () {
                expect(testResult).toEqual(true);
            });
  	});           

  if(!isAndroidPlatform() && isAnyButApplePlatform())
  {
  	it("VT200-0444 | Call smartBatteryStatus method with callback|", function () {
  	          runs(function () {
  	              dispTestCaseRunning("VT200-0444 smartBatteryStatus with callback");
  	              dispExpectedResult("Smart Battery event should be fired with all the return parameters ");
  	            Rho.Battery.smartBatteryStatus(smartBatteryStatusCallback);
  	          });
  	    
  	          waitsFor(function () {
  	              return captured;
  	          }, 'Tester should have responded by now', 180000);
  	  
  	          runs(function () {
  	              expect(testResult).toEqual(true);
  	          });
  	});      
  }
  }else{
    it("Your Platform/Device does not support this feature", function(){

    });
  }     
});
