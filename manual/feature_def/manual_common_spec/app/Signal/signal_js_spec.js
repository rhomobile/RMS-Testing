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

    it("VT298-001 |Signal showIcon color without any property |", function () {

        runs(function () {
            dispTestCaseRunning("VT298-001 - Signal showIcon color without any property");
            dispExpectedResult("Should display the Signal indicator in the default position and default colour ");
          Rho.Signal.showIcon({});

        });


        waitsFor(function () {
            return captured;
        }, 'Tester should have been displayed by now', 30000);

        runs(function () {
            expect(testResult).toEqual(true);
        });
    });
    
    it("VT298-0002 |Signal showIcon left with 40 |", function () {

        runs(function () {
            dispTestCaseRunning("VT298-0002 - Watch the change in the position of signal icon");
            dispExpectedResult("Signalicon should be shown in the specified horizontal position ");
          Rho.Signal.showIcon({left: 40});

        });


        waitsFor(function () {
            return captured;
        }, 'Tester should have been displayed by now', 30000);

        runs(function () {
            expect(testResult).toEqual(true);
        });
    });
    
    it("VT298-0005 |Signal showIcon top with 40|", function () {

        runs(function () {
            dispTestCaseRunning("VT298-0005 - Watch the change in the position of signal icon");
            dispExpectedResult("Signalicon should be shown in the specified Vertical position ");
          Rho.Signal.showIcon({top: 40});

        });


        waitsFor(function () {
            return captured;
        }, 'Tester should have been displayed by now', 30000);

        runs(function () {
            expect(testResult).toEqual(true);
        });
    });
    
    it("VT298-0008 |Signal showIcon layout with left|", function () {

        runs(function () {
            dispTestCaseRunning("VT298-0008 - Watch the change in the position of signal icon");
            dispExpectedResult("Positions the Signalindicator to the left of the screen.");
          Rho.Signal.showIcon({layout:'left'});

        });

        waitsFor(function () {
            return captured;
        }, 'Tester should have been displayed by now', 30000);

        runs(function () {
            expect(testResult).toEqual(true);
        });
    });
    
    it("VT298-0009 |Signal showIcon layout with right|", function () {

        runs(function () {
            dispTestCaseRunning("VT298-0009 - Watch the change in the position of signal icon");
            dispExpectedResult("Positions the Signalindicator to the right of the screen.");
          Rho.Signal.showIcon({layout:'right'});

        });

        waitsFor(function () {
            return captured;
        }, 'Tester should have been displayed by now', 30000);

        runs(function () {
            expect(testResult).toEqual(true);
        });
    });
    
    it("VT298-0010 |Signal showIcon layout with up|", function () {

        runs(function () {
            dispTestCaseRunning("VT298-0010 - Watch the change in the position of signal icon");
            dispExpectedResult("Positions the Signalindicator to the up of the screen.");
          Rho.Signal.showIcon({layout:'up'});

        });

        waitsFor(function () {
            return captured;
        }, 'Tester should have been displayed by now', 30000);

        runs(function () {
            expect(testResult).toEqual(true);
        });
    });
    
    it("VT298-0011 |Signal showIcon layout with down|", function () {

        runs(function () {
            dispTestCaseRunning("VT298-0011 - Watch the change in the position of signal icon");
            dispExpectedResult("Positions the Signalindicator to the down of the screen.");
          Rho.Signal.showIcon({layout:'down'});

        });

        waitsFor(function () {
            return captured;
        }, 'Tester should have been displayed by now', 30000);

        runs(function () {
            expect(testResult).toEqual(true);
        });
    });
    
    it("VT298-0014|Signal showIcon color with #0000FF value|", function () {

        runs(function () {
            dispTestCaseRunning("VT298-0014 - Watch the change in the colour of signal icon");
            dispExpectedResult("Signalicon should be shown with blue colour..");
          Rho.Signal.showIcon({color:'#0000FF'});

        });

        waitsFor(function () {
            return captured;
        }, 'Tester should have been displayed by now', 30000);

        runs(function () {
            expect(testResult).toEqual(true);
        });
    });
    
    it("VT298-0015|Signal showIcon color with #FF0000 value|", function () {

        runs(function () {
            dispTestCaseRunning("VT298-0015 - Watch the change in the colour of signal icon");
            dispExpectedResult("Signalicon should be shown with red colour..");
          Rho.Signal.showIcon({color:'#FF0000'});

        });

        waitsFor(function () {
            return captured;
        }, 'Tester should have been displayed by now', 30000);

        runs(function () {
            expect(testResult).toEqual(true);
        });
    });
    
    it("VT298-0016|Signal showIcon color with #000000 value|", function () {

        runs(function () {
            dispTestCaseRunning("VT298-0016 - Watch the change in the colour of signal icon");
            dispExpectedResult("Signalicon should be shown with black colour..");
          Rho.Signal.showIcon({color:'#000000'});

        });

        waitsFor(function () {
            return captured;
        }, 'Tester should have been displayed by now', 30000);

        runs(function () {
            expect(testResult).toEqual(true);
        });
    });
    
    it("VT298-0017|Signal showIcon with all properties|", function () {

        runs(function () {
            dispTestCaseRunning("VT298-0017 - Watch the change in the properties  of signal icon");
            dispExpectedResult("Signalicon should be shown with layout left and blue in conlor horizontal and vertical position at 20 and 40 ");
          Rho.Signal.showIcon({left: 20,top: 40,layout:'left',color:'#FF0000'});

        });

        waitsFor(function () {
            return captured;
        }, 'Tester should have been displayed by now', 30000);

        runs(function () {
            expect(testResult).toEqual(true);
        });
    });
    
    it("VT298-0018|Signal hideIcon |", function () {

        runs(function () {
            dispTestCaseRunning("VT298-0018 - Hide icon will hide the signal icon after 10 secs");
            dispExpectedResult("Signalicon should be shown and after 10 sec it disappears");
          Rho.Signal.showIcon({top: 50});
          setTimeout(function () {
              Rho.Signal.hideIcon();
          }, 10000);
        });

        waitsFor(function () {
            return captured;
        }, 'Tester should have been displayed by now', 30000);

        runs(function () {
            expect(testResult).toEqual(true);
        });
    });
    
    it("VT298-0020|WlanStatus with default callback |", function () {

        runs(function () {
            dispTestCaseRunning("VT298-0020 - see whether all the return parameters are retrieved in callback and check whether event is fired for every 5 sec default");
            dispExpectedResult("All the retrun parameters with desired value should be returned and the event should be fired for every 5sec default ");
          Rho.Signal.wlanStatus(statusCallback);
        
        });

        waitsFor(function () {
            return captured;
        }, 'Tester should have been displayed by now', 3000000);

        runs(function () {
            expect(testResult).toEqual(true);
        });
    });
    
    it("VT298-0021|stop firing wlan Status  |", function () {

        runs(function () {
        	Rho.Signal.stopWlanStatus();
            dispTestCaseRunning("VT298-0021 - see whether all the return parameters are retrieved in callback and check whether event is fired for every 5 sec default and after 15 sec no more event should be fired");
            dispExpectedResult("All the retrun parameters with desired value should be returned and the event should be fired for every 5sec default and after 15 sec no more event will be fired ");
          Rho.Signal.wlanStatus(statusCallback);
          setTimeout(function () {
              Rho.Signal.stopWlanStatus();
          }, 15000);
        });

        waitsFor(function () {
            return captured;
        }, 'Tester should have been displayed by now', 3000000);

        runs(function () {
            expect(testResult).toEqual(true);
        });
    });
    
    it("VT298-0023|WlanStatus with changing the device proximity  to Router|", function () {

          runs(function () {
              dispTestCaseRunning("VT298-0023 - see whether all the return parameters are retrieved in callback and check whether the parameters are changing every 5 sec if you change the proximity to the server");
              dispExpectedResult("All the retrun parameters with desired value should be returned and the event should be fired for every 5sec default and return parameter values should be changed everytime ");
            Rho.Signal.wlanStatus(statusCallback);
          
          });

          waitsFor(function () {
              return captured;
          }, 'Tester should have been displayed by now', 3000000);

          runs(function () {
              expect(testResult).toEqual(true);
          });
    });
    
    it("VT298-0024|WlanStatus with default callback with disconnecting the profile |", function () {

        runs(function () {
            dispTestCaseRunning("VT298-0024 - Make sure u disconnect WLAN profile while running this test and check return parameters");
            dispExpectedResult("Event fired after disconnecting Wlan profile should return the the parameters which require connection with null or zero values and which doesn't require connection should return desired value ");
          Rho.Signal.wlanStatus(statusCallback);
        
        });

        waitsFor(function () {
            return captured;
        }, 'Tester should have been displayed by now', 3000000);

        runs(function () {
            expect(testResult).toEqual(true);
        });
    });
    
     it("VT298-0025|WlanStatus with SYNC callback |", function () {

        runs(function () {
            dispTestCaseRunning("VT298-0025 - see whether all the return parameters are retrieved in callback and check whether event is fired for every 8 sec ");
            dispExpectedResult("All the retrun parameters with desired value should be returned and the event should be fired for every 8 sec  ");
       var  statusCall= Rho.Signal.wlanStatus(statusCallback);
          result += '<br/>signalStrength  :- ' + JSON.stringify(statusCall["signalStrength"]);
          result += '<br/>essid  :- ' + JSON.stringify(statusCall["essid"]);
          result += '<br/>macAddress  :- ' + JSON.stringify(statusCall["macAddress"]);
          result += '<br/>adapterName  :- ' + JSON.stringify(statusCall["adapterName"]);
          result += '<br/>dhcpServer  :- ' + JSON.stringify(statusCall["dhcpServer"]);
          result += '<br/>dhcpStatic  :- ' + JSON.stringify(statusCall["dhcpStatic"]);
          result += '<br/>gateway  :- ' + JSON.stringify(statusCall["gateway"]);
          result += '<br/>ipAddress  :- ' + JSON.stringify(statusCall["ipAddress"]);
          result += '<br/>rssi   :- ' + JSON.stringify(statusCall["rssi"]);
          result += '<br/>subnetMask   :- ' + JSON.stringify(statusCall["subnetMask"]);
          result += '<br/>wins   :- ' + JSON.stringify(statusCall["wins"]);
          displayResult("Output: ",result);
        });

        waitsFor(function () {
            return captured;
        }, 'Tester should have been displayed by now', 3000000);

        runs(function () {
            expect(testResult).toEqual(true);
        });
    });
    
    it("VT298-0026|WlanStatus with Anonymous callback |", function () {

        runs(function () {
        dispTestCaseRunning("VT298-0026 - see whether all the return parameters are retrieved in callback and check whether event is fired for every 8 sec ");
        dispExpectedResult("All the retrun parameters with desired value should be returned and the event should be fired for every 8 sec  ");
        Rho.Signal.wlanStatus(function (args){
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
        });
         
        });

          waitsFor(function () {
                return captured;
            }, 'Tester should have been displayed by now', 3000000);

          runs(function () {
                expect(testResult).toEqual(true);
          });  
      });        
    
    it("VT298-0028| WlanStatus with 8 sec refresh interval |", function () {

        runs(function () {
            dispTestCaseRunning("VT298-0028 - see whether all the return parameters are retrieved in callback and check whether event is fired for every 8 sec ");
            dispExpectedResult("All the retrun parameters with desired value should be returned and the event should be fired for every 8 sec  ");
          Rho.Signal.wlanStatus({refreshInterval :8000},statusCallback);
        
        });

        waitsFor(function () {
            return captured;
        }, 'Tester should have been displayed by now', 3000000);

        runs(function () {
            expect(testResult).toEqual(true);
        });
    });  
});