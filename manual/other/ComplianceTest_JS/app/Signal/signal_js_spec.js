var testResult = '';
var captured = false;



describe("Signal Manual FD  Tests", function () {
  var statusCallback = function (args){
      var result = '';
      result += '<br/>signalStrength  :- ' + JSON.stringify(args["signalStrength"]);
      result += '<br/>essid  :- ' + JSON.stringify(args["essid"]);
      result += '<br/>macAddress  :- ' + JSON.stringify(args["macAddress"]);
      result += '<br/>adapterName  :- ' + JSON.stringify(args["adapterName"]);
      result += '<br/>dhcpServer  :- ' + JSON.stringify(args["dhcpServer"]);
      result += '<br/>dhcpStatic  :- ' + JSON.stringify(args["dhcpStatic"]);
      result += '<br/>gateway  :- ' + JSON.stringify(args["gateway"]);
      result += '<br/>ipAddress  :- ' + JSON.stringify(args["ipAddress"]);
      result += '<br/>rssi   :- ' + JSON.stringify(args["rssi"]);
      result += '<br/>subnetMask   :- ' + JSON.stringify(args["subnetMask"]);
      result += '<br/>wins   :- ' + JSON.stringify(args["wins"]);
      displayResult("Output: ",result);
    } 

    var displayflag = false;
    beforeEach(function () {
        /* ... Set up your object ... */
        testResult = '';
        captured = false;
    });

    afterEach(function () {
        /* ... Tear it down ... */
    });

if (isAnyButApplePlatform()) {
   
    it("VT200-0445 | Signal showIcon with all properties|", function () {

        runs(function () {
            dispTestCaseRunning("VT200-0445 - Watch the change in the properties  of signal icon");
            dispExpectedResult("Signalicon should be shown with layout left and red in color horizontal and vertical position at 20 and 40 ");
          Rho.SignalIndicators.showIcon({left: 20,top: 40,layout:'left',color:'#FF0000'});

        });

        waitsFor(function () {
            return captured;
        }, 'Tester should have been displayed by now', 30000);

        runs(function () {
            expect(testResult).toEqual(true);
        });
    });
}
    
    it("VT200-0446 | WlanStatus with default callback |", function () {

        runs(function () {
            dispTestCaseRunning("VT200-0446 - see whether all the return parameters are retrieved in callback and check whether event is fired for every 5 sec default");
            dispExpectedResult("All the retrun parameters with desired value should be returned and the event should be fired for every 5sec default ");
          Rho.SignalIndicators.wlanStatus(statusCallback);
        
        });

        waitsFor(function () {
            return captured;
        }, 'Tester should have been displayed by now', 3000000);

        runs(function () {
            expect(testResult).toEqual(true);
        });
    });    
    
});