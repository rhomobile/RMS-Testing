
describe("Battery Manual FD Tests", function () {

    afterEach(function () {
        var resultDiv = document.getElementById('actResult');
        resultDiv.innerHTML = "";
        resultDiv.style.display = 'none';
    	
    	Ruby.call('BatteryTest','hide_icon');
    });

  if (isAnyButApplePlatform())
  { 
  	it("VT200-0700|Battery showIcon all property|", function () {
      dispTestCaseRunning("VT200-0700 check for all the hash properties defined ");
      dispExpectedResult("battery icon should be shown with layout left and red in conlor horizontal and vertical position at 20 and 40");
      
      _result.waitToRunTest();

      runs(function () {
          Ruby.call('BatteryTest','show_icon');
      });
      
      _result.waitForResponse();

  	});          
  }

  if(!isAndroidPlatform())
  {
       
  	it("VT200-0701|Call batteryStatus method with Hash Property trigger to periodic, refreshInterval to 8000 and callback|", function () {
      dispTestCaseRunning("VT200-0701 batteryStatus method with Hash Property trigger to periodic with callback default refresh interval check for every 8 seconds");
      dispExpectedResult("batteryStatus callback should get fire and batteryStatus should updated for every 8 seconds");
      
      _result.waitToRunTest();

      runs(function () {
        Ruby.call('BatteryTest','battery_status');
      });

      _result.waitForResponse();
      
      runs(function () {
          Ruby.call('BatteryTest','stop_battery_status');
      });

  	});

  }


  if(!isAndroidPlatform() && isAnyButApplePlatform())
  {
  	it("VT200-0702|Call smartBatteryStatus method with callback|", function () {
      dispTestCaseRunning("VT200-0702 smartBatteryStatus with callback");
      dispExpectedResult("Smart Battery event should be fired with all the return parameters ");

      _result.waitToRunTest();

      runs(function () {
        Ruby.call('BatteryTest','smart_battery_status');
      });

      _result.waitForResponse();

  	});
  }

});
