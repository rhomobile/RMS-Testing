var testResult = '';
var captured = false;



describe("Battery Manual FD  Tests", function () {
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
    it("VT284-001 |Call showIcon method without any property |", function () {

        runs(function () {
            dispTestCaseRunning("Battery showIcon color without any property");
            dispExpectedResult("Should display the battery indicator in the default position and default colour ");
          Rho.Battery.showIcon({});

        });


        waitsFor(function () {
            dispExpectedResult("see if the Battery indicator is displayed in the default position and default color");
            return captured;
        }, 'Battery should have been displayed by now', 30000);

        runs(function () {
            expect(testResult).toEqual(true);
        });
    });
    
	it("VT284-002 |Call showIcon method with Hash property left to 40|", function () {
  
          runs(function () {
              dispTestCaseRunning("Battery showIcon left with 40");
              dispExpectedResult("Battery icon should be shown in the specified horizontal position ");
            Rho.Battery.showIcon({left: 40});
  
          });
  
  
          waitsFor(function () {
              
              return captured;
          }, 'Battery should have been displayed by now', 30000);
  
          runs(function () {
              expect(testResult).toEqual(true);
          });
    });
    
	it("VT284-005 |Call showIcon method with Hash property top to 40|", function () {
  
          runs(function () {
              dispTestCaseRunning("Battery showIcon top with 40");
              dispExpectedResult("Battery icon should be shown in the specified vertical position");
            Rho.Battery.showIcon({top: 40});
  
          });
  
  
          waitsFor(function () {
              
              return captured;
          }, 'Battery should have been displayed by now', 30000);
  
          runs(function () {
              expect(testResult).toEqual(true);
          });
	});
    
	it("VT284-008 |Call showIcon method with Hash property layout to left|", function () {
  
          runs(function () {
              dispTestCaseRunning("Battery showIcon layout with left");
              dispExpectedResult("Positions the Battery indicator to the left of the screen.");
            Rho.Battery.showIcon({layout:'left'});
  
          });
  
  
          waitsFor(function () {
              
              return captured;
          }, 'Battery should have been displayed by now', 30000);
  
          runs(function () {
              expect(testResult).toEqual(true);
          });
	});  
    
	it("VT284-009|Call showIcon method with Hash property layout to right|", function () {
  
          runs(function () {
              dispTestCaseRunning("Battery showIcon layout with right");
              dispExpectedResult("Positions the Battery indicator to the right of the screen.");
            Rho.Battery.showIcon({layout:'right'});
  
          });
  
  
          waitsFor(function () {
              
              return captured;
          }, 'Battery should have been displayed by now', 30000);
  
          runs(function () {
              expect(testResult).toEqual(true);
          });
	});  
       
	it("VT284-010|Call showIcon method with Hash property layout to up|", function () {
  
          runs(function () {
              dispTestCaseRunning("Battery showIcon layout with up");
              dispExpectedResult("Positions the Battery indicator to the up of the screen.");
            Rho.Battery.showIcon({layout:'up'});
  
          });
  
  
          waitsFor(function () {
              
              return captured;
          }, 'Battery should have been displayed by now', 30000);
  
          runs(function () {
              expect(testResult).toEqual(true);
          });
	});    
    
	it("VT284-011|Call showIcon method with Hash property layout to down|", function () {
  
          runs(function () {
              dispTestCaseRunning("Battery showIcon layout with down");
              dispExpectedResult("Positions the Battery indicator to the down of the screen.");
            Rho.Battery.showIcon({layout:'down'});
  
          });
  
  
          waitsFor(function () {
              
              return captured;
          }, 'Battery should have been displayed by now', 30000);
  
          runs(function () {
              expect(testResult).toEqual(true);
          });
	});      
    
	it("VT284-015|Call showIcon method with Hash property color to #FF0000 value|", function () {
  
          runs(function () {
              dispTestCaseRunning("Battery showIcon color with #FF0000 value");
              dispExpectedResult("battery icon should be shown with red color.");
            Rho.Battery.showIcon({color:'#FF0000'});
  
          });
          waitsFor(function () {
              return captured;
          }, 'Battery should have been displayed by now', 30000);
  
          runs(function () {
              expect(testResult).toEqual(true);
          });
	});      
    
	it("VT284-014|Call showIcon method with Hash property color to #0000FF value|", function () {
  
          runs(function () {
              dispTestCaseRunning("Battery showIcon color with #0000FF value");
              dispExpectedResult("battery icon should be shown with blue color.");
            Rho.Battery.showIcon({color:'#0000FF'});
  
          });
          waitsFor(function () {
              return captured;
          }, 'Battery should have been displayed by now', 30000);
  
          runs(function () {
              expect(testResult).toEqual(true);
          });
	});   
         
	it("VT284-016|Call showIcon method with Hash property color to #FFFFFF value|", function () {
  
          runs(function () {
              dispTestCaseRunning("Battery showIcon color with #FFFFFF value");
              dispExpectedResult("battery icon should be shown with white color.");
            Rho.Battery.showIcon({color:'#FFFFFF'});
  
          });
          waitsFor(function () {
              return captured;
          }, 'Battery should have been displayed by now', 30000);
  
          runs(function () {
              expect(testResult).toEqual(true);
          });
	});           
    
	it("VT284-017|Battery showIcon all property|", function () {
  
          runs(function () {
              dispTestCaseRunning("check for all the hash properties defined ");
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
    
	it("VT284-018|Battery showIcon all property with powerSupply|", function () {
  
          runs(function () {
              dispTestCaseRunning("Connect the device to power supply before executing this case");
              dispExpectedResult("battery icon should be shown with powersupply and layout left and red in color horizontal and vertical position at 20 and 40");
            Rho.Battery.showIcon({left: 20,top: 40,layout:'left',color:'#FF0000'});
          });
          waitsFor(function () {
              return captured;
          }, 'Battery should have been displayed by now', 30000);
  
          runs(function () {
              expect(testResult).toEqual(true);
          });
	});    
    
	it("VT284-019|Battery hideIcon after calling showIcon method|", function () {
          runs(function () {
              dispTestCaseRunning("Hide Icon will hide the battery icon after 10 sec");
              dispExpectedResult("should Hide the battery icon after 10 sec");
            Rho.Battery.showIcon({left: 20,top: 40,layout:'left',color:'#FF0000'});
          });
          
             runs(function () {
               Rho.Battery.showIcon({left: 50});
                setTimeout(function () {
                    Rho.Battery.hideIcon();
                }, 10000);
            });
          waitsFor(function () {
              return captured;
          }, 'Battery should have been displayed by now', 30000);
  
          runs(function () {
              expect(testResult).toEqual(true);
          });
	});
}
if(!isAndroidPlatform())
{
	it("VT284-021|Call batteryStatus method with Hash Property trigger to periodic with callback|", function () {
          runs(function () {
              dispTestCaseRunning("batteryStatus method with Hash Property trigger to periodic with callback default refresh interval check for every five seconds");
              dispExpectedResult("batteryStatus callback should get fire and batteryStatus should updated for every 5 seconds");
            Rho.Battery.batteryStatus({trigger :'periodic'},batteryStatusCallback);
          });
          
          waitsFor(function () {
              return captured;
          }, 'Tester should have responded by now', 180000);
  
          runs(function () {
              expect(testResult).toEqual(true);
          });
	});          
      
	it("VT284-022|Call batteryStatus method with Hash Property trigger to periodic with sync callback|", function () {
		runs(function () {
			dispTestCaseRunning("batteryStatus method with Hash Property trigger to periodic with SYNC callback default refresh interval check for every five seconds");
            dispExpectedResult("batteryStatus callback should get fire and batteryStatus should updated for every 5 seconds");
            Rho.Battery.stopBatteryStatus();
			var batteryStatus= Rho.Battery.batteryStatus({trigger :'periodic'});
			var result = '';
			result += '<br/>AcLineStatus: ' + JSON.stringify(batteryStatus["acLineStatus"]);
			result += '<br/>BatteryLifePercent: ' + JSON.stringify(batteryStatus["batteryLifePercent"]);
			result += '<br/>BackupBatteryLifePercent: ' + JSON.stringify(batteryStatus["backupBatteryLifePercent"]);
			result += '<br/>Trigger: ' + JSON.stringify(batteryStatus["trigger"]);
			result += '<br/>BatteryLifeKnown: ' + JSON.stringify(batteryStatus["batteryLifeKnown"]);
			result += '<br/>BackupBatteryLifeKnown: ' + JSON.stringify(batteryStatus["backupBatteryLifeKnown"]);
			displayResult("Output: ",result);
		});
          
		waitsFor(function () {
			return captured;
		}, 'Tester should have responded by now', 180000);
  
		runs(function () {
			expect(testResult).toEqual(true);
		});
	});  
            
	it("VT284-023|Call batteryStatus method with Hash Property trigger to periodic with ANONYMOUS callback|", function () {
		runs(function () {
			dispTestCaseRunning("batteryStatus method with Hash Property trigger to periodic with ANONYMOUS callback default refresh interval check for every five seconds");
			dispExpectedResult("batteryStatus callback should get fire and batteryStatus should updated for every 5 seconds");
			Rho.Battery.stopBatteryStatus();
			Rho.Battery.batteryStatus({trigger :'periodic'},function (args)
			{
				var result = '';
				result += '<br/>AcLineStatus: ' + JSON.stringify(args["acLineStatus"]);
				result += '<br/>BatteryLifePercent: ' + JSON.stringify(args["batteryLifePercent"]);
				result += '<br/>BackupBatteryLifePercent: ' + JSON.stringify(args["backupBatteryLifePercent"]);
				result += '<br/>Trigger: ' + JSON.stringify(args["trigger"]);
				result += '<br/>BatteryLifeKnown: ' + JSON.stringify(args["batteryLifeKnown"]);
				result += '<br/>BackupBatteryLifeKnown: ' + JSON.stringify(args["backupBatteryLifeKnown"]);
				displayResult("Output: ",result);
			});
		});
          
		waitsFor(function () {
			return captured;
		}, 'Tester should have responded by now', 180000);
  
		runs(function () {
			expect(testResult).toEqual(true);
		});
	});        
           
      
	it("VT284-024|Call batteryStatus method with Hash Property trigger to periodic, refreshInterval to 8000 and callback|", function () {
          runs(function () {
              dispTestCaseRunning("batteryStatus method with Hash Property trigger to periodic with callback default refresh interval check for every 8 seconds");
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
      
	it("VT284-025|Call batteryStatus method with Hash Property trigger to periodic, refreshInterval to 0 and callback|", function () {
          runs(function () {
              dispTestCaseRunning("batteryStatus method with Hash Property trigger to periodic with callback, refresh interval 0");
              dispExpectedResult("batteryStatus callback should get fire and batteryStatus should not get updated");
            Rho.Battery.stopBatteryStatus();
            Rho.Battery.batteryStatus({trigger :'periodic',refreshInterval :0},batteryStatusCallback);
          });
          
          waitsFor(function () {
              return captured;
          }, 'Tester should have responded by now', 180000);
  
          runs(function () {
              expect(testResult).toEqual(true);
          });
	});
}

if(!isAndroidPlatform())
{
	it("VT284-035|Call stopBatteryStatus method to stop the callback|", function () {
		runs(function () {
			dispTestCaseRunning("stopBatteryStatus with trigger periodic, see that event is not firing after 20 secs");
			dispExpectedResult("should stop the batteryStatus callback after 20 sec ");
			Rho.Battery.stopBatteryStatus();
		});
		
		runs(function () {
			Rho.Battery.batteryStatus({trigger :'periodic'},batteryStatusCallback);
			setTimeout(function () {
				Rho.Battery.stopBatteryStatus();
			}, 20000);
		});
	
		waitsFor(function () {
			return captured;
		}, 'Tester should have responded by now', 180000);
	
		runs(function () {
			expect(testResult).toEqual(true);
		});
	});
}

if(!isAndroidPlatform() && isAnyButApplePlatform())
{
	it("VT284-038|Call smartBatteryStatus method with callback|", function () {
	          runs(function () {
	              dispTestCaseRunning("smartBatteryStatus with callback");
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
	      
	it("VT284-039|Call smartBatteryStatus method with SYNC callback|", function () {
		runs(function () {
			dispTestCaseRunning("smartBatteryStatus with SYNC callback");
			dispExpectedResult("Smart Battery event should be fired with all the return parameters ");
			var smartBatteryStatusCallback= Rho.Battery.smartBatteryStatus();
			var result = '';
			result += '<br/>serialNumber: ' + JSON.stringify(smartBatteryStatusCallback["serialNumber"]);
			result += '<br/>partNumber: ' + JSON.stringify(smartBatteryStatusCallback["partNumber"]);
			result += '<br/>batteryChargeCycles: ' + JSON.stringify(smartBatteryStatusCallback["batteryChargeCycles"]);
			result += '<br/>ratedCapacity: ' + JSON.stringify(smartBatteryStatusCallback["ratedCapacity"]);
			result += '<br/>manufactureDate: ' + JSON.stringify(smartBatteryStatusCallback["manufactureDate"]);
			result += '<br/>stateOfHealth: ' + JSON.stringify(smartBatteryStatusCallback["stateOfHealth"]);
			displayResult("Output: ",result);
		});

		waitsFor(function () {
			return captured;
		}, 'Tester should have responded by now', 180000);

		runs(function () {
			expect(testResult).toEqual(true);
		});
	});         
	      
	it("VT284-040|smart Battery status with  ANONYMOUS callback|", function () {
		runs(function () {
				dispTestCaseRunning("smart Battery status with  ANONYMOUS callback");
				dispExpectedResult("smart Battery event should be fired with all the return parameters");
				Rho.Battery.smartBatteryStatus(function (args){
						var result = '';
						result += '<br/>serialNumber: ' + JSON.stringify(args["serialNumber"]);
						result += '<br/>partNumber: ' + JSON.stringify(args["partNumber"]);
						result += '<br/>batteryChargeCycles: ' + JSON.stringify(args["batteryChargeCycles"]);
						result += '<br/>ratedCapacity: ' + JSON.stringify(args["ratedCapacity"]);
						result += '<br/>manufactureDate: ' + JSON.stringify(args["manufactureDate"]);
						result += '<br/>stateOfHealth: ' + JSON.stringify(args["stateOfHealth"]);
						displayResult("Output: ",result);
				});
		});
                  
		waitsFor(function () {
				return captured;
		}, 'Tester should have responded by now', 180000);
  
		runs(function () {
				expect(testResult).toEqual(true);
		});
    });        
	                 
	it("VT284-043|smartBatteryStatus with callback|", function () {
		runs(function () {
			dispTestCaseRunning("stopBatteryStatus with trigger periodic, see that event is not firing after 20 secs");
			dispExpectedResult("smart battery event will be fired and after 5 secs battery status event should overide it  ");
			Rho.Battery.stopBatteryStatus();
		});
		runs(function () {
			Rho.Battery.batteryStatus({trigger :'periodic'},batteryStatusCallback);
			setTimeout(function () {
				Rho.Battery.smartBatteryStatus(smartBatteryStatusCallback);
			}, 7000);
		});

		waitsFor(function () {
			return captured;
		}, 'Tester should have responded by now', 180000);

		runs(function () {
			expect(testResult).toEqual(true);
		});
	});
}
      
it("VT284-028|Call batteryStatus method with Hash Property trigger to System with callback |", function () {
	runs(function () {
		dispTestCaseRunning("ensure device is put on charge before calling this function ");
		dispExpectedResult("batteryStatus be should be shown on the page and the trigger parameter should show charging");
		Rho.Battery.batteryStatus({trigger :'system'},batteryStatusCallback);
	});

	waitsFor(function () {
		return captured;
	}, 'Tester should have responded by now', 18000000);

	runs(function () {
		expect(testResult).toEqual(true);
	});
});  

it("VT284-029|Call batteryStatus method with Hash Property trigger to System with callback for WP8|", function () {
	runs(function () {
		dispTestCaseRunning("batteryStatus method with Hash Property trigger to System with callback ");
		dispExpectedResult("batteryStatus be should be shown on the page and batteryStatus should updated every percentage value change in battery");
		Rho.Battery.batteryStatus({trigger :'system'},batteryStatusCallback);
	});
  
	waitsFor(function () {
		return captured;
	}, 'Tester should have responded by now', 18000000);

	runs(function () {
		expect(testResult).toEqual(true);
	});
});             
      

it("VT284-030|Call batteryStatus method with Hash Property trigger to System with callback for checking high battery|", function () {
	runs(function () {
		dispTestCaseRunning("ensure that device would be reaching high battery level in a while before firing this event");
		dispExpectedResult("batteryStatus be should be shown on the page and trigger parameter in the callback should show high battery");
		Rho.Battery.batteryStatus({trigger :'system'},batteryStatusCallback);
	});
  
	waitsFor(function () {
		return captured;
	}, 'Tester should have responded by now', 18000000);

	runs(function () {
		expect(testResult).toEqual(true);
	});
});  
      
it("VT284-032|Call batteryStatus method with Hash Property trigger to Periodic with callback for checking AClineStatus|", function () {
	runs(function () {
		dispTestCaseRunning("please connect the device to charge while executing and check whether AClineStatus is true or not ");
		dispExpectedResult("batteryStatus be should be shown on the page and ACLineStatus parameter in the callback should show true");
		Rho.Battery.batteryStatus({trigger :'periodic'},batteryStatusCallback);
	});
  
	waitsFor(function () {
		return captured;
	}, 'Tester should have responded by now', 18000000);

	runs(function () {
		expect(testResult).toEqual(true);
	});
});        
      
it("VT284-033|Call batteryStatus method with Hash Property trigger to Periodic with callback for checking AClineStatus|", function () {
	runs(function () {
		dispTestCaseRunning("please connect the device to charge while executing and check whether AClineStatus is true or not, put off charging and check again");
		dispExpectedResult("batteryStatus be should be shown on the page and ACLineStatus parameter in the callback should show true and later false after charge is put off");
		Rho.Battery.batteryStatus({trigger :'periodic'},batteryStatusCallback);
	});

	waitsFor(function () {
		return captured;
	}, 'Tester should have responded by now', 18000000);

	runs(function () {
		expect(testResult).toEqual(true);
	});
}); 
            
it("VT284-033|Call batteryStatus method with Hash Property trigger to System with callback for checking low battery|", function () {
	runs(function () {
		dispTestCaseRunning("ensure that device would be reaching low battery level(15%) in a while before firing this event");
		dispExpectedResult("batteryStatus be should be shown on the page and trigger parameter in the callback should show low battery");
		Rho.Battery.batteryStatus({trigger :'system'},batteryStatusCallback);
	});

	waitsFor(function () {
		return captured;
	}, 'Tester should have responded by now', 18000000);

	runs(function () {
		expect(testResult).toEqual(true);
	});
});  
      
it("VT284-034|Call batteryStatus method with Hash Property trigger to System with callback for checking Critical battery|", function () {
	runs(function () {
		dispTestCaseRunning("ensure that device would be reaching Critical  battery level(10%) in a while before firing this event");
		dispExpectedResult("batteryStatus be should be shown on the page and trigger parameter in the callback should show critical battery");
		Rho.Battery.batteryStatus({trigger :'system'},batteryStatusCallback);
	});

	waitsFor(function () {
		return captured;
	}, 'Tester should have responded by now', 18000000);

	runs(function () {
		expect(testResult).toEqual(true);
	});
});  

if(!isAndroidPlatform() && isAnyButApplePlatform())
{  
	it("VT284-041|Call smartBatteryStatus method with callback for checking stateofHealth as healthy|", function () {
		runs(function () {
			dispTestCaseRunning("Ensure that battery is charged more than 90% ");
			dispExpectedResult("Smart Battery event should be fired and stateOfHealth should be healthy");
			Rho.Battery.smartBatteryStatus(smartBatteryStatusCallback);
		});

		waitsFor(function () {
			return captured;
		}, 'Tester should have responded by now', 180000);

		runs(function () {
			expect(testResult).toEqual(true);
		});
	});   
			   
		  
	it("VT284-042|Call smartBatteryStatus method with callback for checking stateofHealth as unhealthy|", function () {
		runs(function () {
			dispTestCaseRunning("Ensure that battery is less than  10% ");
			dispExpectedResult("Smart Battery event should be fired and stateOfHealth should be unhealthy");
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
});
