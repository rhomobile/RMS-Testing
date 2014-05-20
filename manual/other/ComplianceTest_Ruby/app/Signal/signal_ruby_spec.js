
describe("Signal Compliance Ruby API Tests", function () {
    
	afterEach(function () {
        var resultDiv = document.getElementById('actResult');
        resultDiv.innerHTML = "";
        resultDiv.style.display = 'none';
        
        Ruby.call('Signal','hide_icon');
    });

  if (isAnyButApplePlatform()) {
   
    it("VT200-0703|Signal showIcon with all properties|", function () {

      dispTestCaseRunning("VT200-0703 - Watch the change in the properties  of signal icon");
      dispExpectedResult("Signalicon should be shown with layout left and red in color horizontal and vertical position at 20 and 40 ");

      _result.waitToRunTest();

      runs(function () {        
        Ruby.call('Signal','show_icon');
      });

      _result.waitForResponse();

    });

  }
    
    it("VT200-0704|WlanStatus with default callback |", function () {

      dispTestCaseRunning("VT200-0704 - see whether all the return parameters are retrieved in callback and check whether event is fired for every 5 sec default");
      dispExpectedResult("All the retrun parameters with desired value should be returned and the event should be fired for every 5sec default ");

      _result.waitToRunTest();
      
      runs(function () {
        Ruby.call('Signal','wlan_status');
      });

      _result.waitForResponse();
      
      runs(function () {
         Ruby.call('Signal','stop_wlan_status');
      });

    });    
    
});