var platformSupported = ["ANDROID"];
var deviceSupported = ["MC40","RhoSimulator"];

describe("Test spec for D180 payment device support", function(){
	if(platformSupported.indexOf(Rho.System.platform)!= -1 && deviceSupported.indexOf(Rho.System.deviceName)!=-1){
		//####Should support method open()####
		//Access : `Rho.MobilePayment.open(callbackfunction);  
		//Paramater : Callback function (mandatory)  
		//Callback Paramaters: ```{"status":success,"errorId":"","description":""}```  
		it("Should support for the method \"Open()\" with the instance of paymentDevice object, to open the connection with paymentDevice.", function(){
			var spec = new ManualSpec(jasmine, window.document);
        	spec.addGoal("Should support for the method \"Open()\" with the instance of paymentDevice object, to open the connection with paymentDevice.");
        	spec.addPrecondition("Payment device is paired via bluetooth to the device.");
            spec.addStep("Press 'RunTest' button");
            spec.addExpectation('This is Semi- Auto case !.');
            spec.displayScenario();
            spec.waitForButtonPressing("Run test");
            var wait;
            var openHandler = {
					openCB: function(res){
						console.log("openCB: triggered");
						console.log(res);
					}
				};
            runs(function () {
				//spyOn(openHandler,'openCB').andCallThrough();
				spyOn(openHandler,'openCB');
				Rho.MobilePayment.open(openHandler.openCB);
				openHandler.openCB({"status":"success","errorId":"","description":""});
			});
			waitsFor(function(){
            	 setTimeout(function(){ wait=true;}, 3000);
            	 return wait == true;
            },"wait for Mobile Payment device to open",5000);
            runs(function(){
            	expect(openHandler.openCB).toHaveBeenCalledWith({"status":"success","errorId":"","description":""});
            });
		});

		//####Should support property isOpened####
		//Access : `Rho.MobilePayment.isOpened`  
		//Value : Boolean (True/False)
		xit("Should support \"isOpened\" property with the paymentDevice object, to check the connection already exists or not.", function(){
			var spec = new ManualSpec(jasmine, window.document);
        	spec.addGoal("Should support \"isOpened\" property with the paymentDevice object, to check the connection already exists or not.");
        	spec.addPrecondition("Payment device is paired via bluetooth to the device.");
            spec.addStep("Press 'RunTest' button");
            spec.addExpectation('This is Semi- Auto case !.');
            spec.displayScenario();
            spec.waitForButtonPressing("Run test");
			var wait;
			var openHandler = {
				openCB: function(){
					console.log("openCB: triggered");
				}
			};
			runs(function(){
				spyOn(openHandler,'openCB');
				Rho.MobilePayment.open(openHandler.openCB);
			});
			
			waitsFor(function(){
            	 setTimeout(function(){ wait=true;}, 3000);
            	 return wait == true;
            },"wait for Mobile Payment device to open",5000);
            runs(function(){
            	expect(Rho.MobilePayment.isOpened).toEqual(true);
            });
		});

		//####Should support method close() without unpair parameter####
		//Access : `Rho.MobilePayment.close(callbackfunction);  
		//Paramater : Callback function (mandatory)  
		//Callback Paramaters (Hash): ```{"status":success,"errorId":"","description":""}```  
		xit("Should support \"close()\" method with the instance of paymentDevice object, to disconnect paymentDevice without unpair.", function(){
			var spec = new ManualSpec(jasmine, window.document);
        	spec.addGoal("Should support \"close()\" method with the instance of paymentDevice object, to disconnect paymentDevice without unpair.");
        	spec.addPrecondition("Payment device is paired via bluetooth to the device.");
        	spec.addPrecondition("Payment device is already opened a connection with your device.");
            spec.addStep("Press 'RunTest' button");
            spec.addExpectation('This is Semi- Auto case !.');
            spec.displayScenario();
            spec.waitForButtonPressing("Run test");
			if(isOpened){
				var wait;
				var closeHandler = {
					closeCB: function(){
						console.log("closeCB: triggered");
					}
				};
				runs(function(){
					spyOn(closeHandler,'openCB');
					Rho.MobilePayment.close(closeHandler.closeCB());
				});
				
				waitsFor(function(){
	            	 setTimeout(function(){ wait=true;}, 3000);
	            	 return wait == true;
	            },"wait for Mobile Payment device to close",5000);
	            runs(function(){
	            	expect(openHandler.openCB).toHaveBeenCalledwith({"status":"success","errorId":"","description":""});
	            });
			}
		});

		//####Should support method close() with unpair parameter false####
		//Access : `Rho.MobilePayment.close(callbackfunction);  
		//Paramater : Callback function (mandatory)  
		//Callback Paramaters (Hash): ```{"status":success,"errorId":""}```  
		xit("Should support \"close()\" method with the instance of paymentDevice object, to disconnect paymentDevice with unpair set to false.", function(){
			var spec = new ManualSpec(jasmine, window.document);
        	spec.addGoal("Should support \"close()\" method with the instance of paymentDevice object, to disconnect paymentDevice without unpair.");
        	spec.addPrecondition("Payment device is paired via bluetooth to the device.");
        	spec.addPrecondition("Payment device is already opened a connection with your device.");
            spec.addStep("Press 'RunTest' button");
            spec.addExpectation('This is Semi- Auto case !.');
            spec.displayScenario();
            spec.waitForButtonPressing("Run test");
			if(isOpened){
				var wait;
				var closeHandler = {
					closeCB: function(){
						console.log("closeCB: triggered");
					}
				};
				runs(function(){
					spyOn(closeHandler,'openCB');
					Rho.MobilePayment.close(false,closeHandler.closeCB());
				})
				waitsFor(function(){
	            	 setTimeout(function(){ wait=true;}, 3000);
	            	 return wait == true;
	            },"wait for Mobile Payment device to close",5000);
	            runs(function(){
	            	expect(openHandler.openCB).toHaveBeenCalledwith({"status":"success","errorId":"","description":""});
	            });
			}
		});

		/*
		*	The test cases below are scenarios for readCardData() method
		*/

		//Should read data from MagStripe Card using method "readCardData()" with readMode-Swipe and transactionType-Credit
		//param:{"amount":200.00,"otherAmount":10.00,"readMode":0,"transactionType":0,"readTimeOut":4000}
		xit("Should read data from MagStripe card with readMode-Swipe and transactionType-Credit", function(){
			var spec = new ManualSpec(jasmine, window.document);
        	spec.addGoal("Should read data from MagStripe card with readMode-Swipe and transactionType-Credit.");
        	spec.addPrecondition("Payment device is paired via bluetooth to the device.");
            spec.addStep("Press 'RunTest' button");
            spec.addStep("Swipe a valid MagStripe Credit card to readCardData");
            spec.addExpectation('Data from the card read and displayed successfully using D180 payment Device.');
            spec.displayScenario();
            spec.waitForButtonPressing("Run test");
            var openCBTriggered = false;
            var readCBTriggered = false;
            var readData = {};
			runs(function(){
				var openCB = function(){
					console.log("openCB : triggered");
					openCBTriggered = true;
				};
				Rho.MobilePayment.open(openCB);
			});
			waitsFor(function(){
					return openCBTriggered;
				},"waiting for open callback", 3000);
			runs(function(){
				var param = {
					"amount":200.00,
					"otherAmount":10.00,
					"readMode":0,			//Read mode is Swipe for MagStripe card.
					"transactionType":0,	//Transaction type is Credit
					"readTimeOut":3000
				};
				var readCB = function(data){
					console.log("read CB: triggered");
					console.log(JSON.strigify(data));
					spec.addResult("Status : ", data.status);
					spec.addResult("errorId : ", data.errorId);
					spec.addResult("description :", data.description);
					spec.addResult("accountNumber :", accountNumber);
					spec.addResult("cardHolderName :", cardHolderName);
					spec.addResult("expiryDate :", expiryDate);
					spec.addResult("track1Data :",track1Data);
					spec.addResult("track2Data :",track2Data);
					spec.addResult("track3Data :",track3Data);
					spec.addResult("aid :",aid);
					spec.addResult("appLabel :",appLabel);
					spec.addResult("appPreferredName :",appPreferredName);
					spec.addResult("serviceCode :", serviceCode);
					spec.addResult("TagIDS :",TagIDS);		//Specific to EMV tags
					spec.addResult("Values :", Values)		//Specific to EMV tags
					readCBTriggered = true;
				}
				Rho.Mobile.Payment.readCardData(param,readCB);
			})
			waitsFor(function(){
				return readCBTriggered;
			},"wait for read card data", 4000);
			runs(function(){
				spec.displayResults();
                spec.waitForResponse();
			});
		});

		//Should read data from MagStripe Card using method "readCardData()" with readMode-Swipe and transactionType-Debit
		//param:{"amount":200.00,"otherAmount":10.00,"readMode":0,"transactionType":1,"readTimeOut":4000}
		xit("Should read data from MagStripe card with readMode-Swipe and transactionType-Debit", function(){
			var spec = new ManualSpec(jasmine, window.document);
        	spec.addGoal("Should read data from MagStripe card with readMode-Swipe and transactionType-Debit.");
        	spec.addPrecondition("Payment device is paired via bluetooth to the device.");
            spec.addStep("Press 'RunTest' button");
            spec.addStep("Swipe a valid MagStripe Debit card to readCardData");
            spec.addExpectation('Data from the card read and displayed successfully using D180 payment Device.');
            spec.displayScenario();
            spec.waitForButtonPressing("Run test");
			var openCBTriggered = false;
            var readCBTriggered = false;
            var readData = {};
			runs(function(){
				var openCB = function(){
					console.log("openCB : triggered");
					openCBTriggered = true;
				};
				Rho.MobilePayment.open(openCB);
			});
			waitsFor(function(){
					return openCBTriggered;
				},"waiting for open callback", 3000);
			runs(function(){
				var param = {
					"amount":200.00,
					"otherAmount":10.00,
					"readMode":0,				//Read mode is Swipe for MagStripe card.
					"transactionType":1,		//Transaction type is Debit
					"readTimeOut":3000
				};
				var readCB = function(data){
					console.log("read CB: triggered");
					console.log(JSON.strigify(data));
					spec.addResult("Status : ", data.status);
					spec.addResult("errorId : ", data.errorId);
					spec.addResult("description :", data.description);
					spec.addResult("accountNumber :", accountNumber);
					spec.addResult("cardHolderName :", cardHolderName);
					spec.addResult("expiryDate :", expiryDate);
					spec.addResult("track1Data :",track1Data);
					spec.addResult("track2Data :",track2Data);
					spec.addResult("track3Data :",track3Data);
					spec.addResult("aid :",aid);
					spec.addResult("appLabel :",appLabel);
					spec.addResult("appPreferredName :",appPreferredName);
					spec.addResult("serviceCode :", serviceCode);
					spec.addResult("TagIDS :",TagIDS);		//Specific to EMV tags
					spec.addResult("Values :", Values)		//Specific to EMV tags
					readCBTriggered = true;
				}
				Rho.Mobile.Payment.readCardData(param,readCB);
			})
			waitsFor(function(){
				return readCBTriggered;
			},"wait for read card data", 4000);
			runs(function(){
				spec.displayResults();
                spec.waitForResponse();
			});
		});

		//Should read data from MagStripe Card using method "readCardData()" with readMode-Swipe and transactionType-UserChoice
		xit("Should read data from MagStripe card with readMode-Swipe and transactionType-UserChoice", function(){
			var spec = new ManualSpec(jasmine, window.document);
        	spec.addGoal("Should read data from MagStripe card with readMode-Swipe and transactionType-UserChoice.");
        	spec.addPrecondition("Payment device is paired via bluetooth to the device.");
            spec.addStep("Press 'RunTest' button");
            spec.addStep("Swipe a valid MagStripe Debit/Credit card.");
            spec.addStep("Select either Debit/Credit to readCardData from payment Device.");
            spec.addExpectation('Data from the card read and displayed successfully using D180 payment Device.');
            spec.displayScenario();
            spec.waitForButtonPressing("Run test");
			var openCBTriggered = false;
            var readCBTriggered = false;
            var readData = {};
			runs(function(){
				var openCB = function(){
					console.log("openCB : triggered");
					openCBTriggered = true;
				};
				Rho.MobilePayment.open(openCB);
			});
			waitsFor(function(){
					return openCBTriggered;
				},"waiting for open callback", 3000);
			runs(function(){
				var param = {
					"amount":200.00,
					"otherAmount":10.00,
					"readMode":0,				// Read mode is Swipe for Mag Stripe card.
					"transactionType":2,		//User choice to select either Debit/Credit
					"readTimeOut":4000
				};
				var readCB = function(data){
					console.log("read CB: triggered");
					console.log(JSON.strigify(data));
					spec.addResult("Status : ", data.status);
					spec.addResult("errorId : ", data.errorId);
					spec.addResult("description :", data.description);
					spec.addResult("accountNumber :", accountNumber);
					spec.addResult("cardHolderName :", cardHolderName);
					spec.addResult("expiryDate :", expiryDate);
					spec.addResult("track1Data :",track1Data);
					spec.addResult("track2Data :",track2Data);
					spec.addResult("track3Data :",track3Data);
					spec.addResult("aid :",aid);
					spec.addResult("appLabel :",appLabel);
					spec.addResult("appPreferredName :",appPreferredName);
					spec.addResult("serviceCode :", serviceCode);
					spec.addResult("TagIDS :",TagIDS);		//Specific to EMV tags
					spec.addResult("Values :", Values)		//Specific to EMV tags
					readCBTriggered = true;
				}
				Rho.Mobile.Payment.readCardData(param,readCB);
			})
			waitsFor(function(){
				return readCBTriggered;
			},"wait for read card data", 8000);
			runs(function(){
				spec.displayResults();
                spec.waitForResponse();
			});
		});

		//Should read data from MagStripe Card using method "readCardData()" with readMode-Swipe and transactionType-Default
		//Q:How to set Default? TBD
		xit("Should read data from MagStripe card with readMode-Swipe and transactionType-Default", function(){
			var spec = new ManualSpec(jasmine, window.document);
        	spec.addGoal("Should read data from MagStripe card with readMode-Swipe and transactionType-Default.");
        	spec.addPrecondition("Payment device is paired via bluetooth to the device.");
            spec.addStep("Press 'RunTest' button");
            spec.addStep("Swipe a valid MagStripe.");
            spec.addExpectation('Data from the card read and displayed successfully using D180 payment Device.');
            spec.displayScenario();
            spec.waitForButtonPressing("Run test");
			var openCBTriggered = false;
            var readCBTriggered = false;
            var readData = {};
			runs(function(){
				var openCB = function(){
					console.log("openCB : triggered");
					openCBTriggered = true;
				};
				Rho.MobilePayment.open(openCB);
			});
			waitsFor(function(){
					return openCBTriggered;
				},"waiting for open callback", 3000);
			runs(function(){
				var param = {
					"amount":200.00,
					"otherAmount":10.00,
					"readMode":0,			//read mode - Swipe for Mag type card
					"transactionType":3, 	//default transaction type : TBD - Debit/Credit
					"readTimeOut":3000
				};
				var readCB = function(data){
					console.log("read CB: triggered");
					console.log(JSON.strigify(data));
					spec.addResult("Status : ", data.status);
					spec.addResult("errorId : ", data.errorId);
					spec.addResult("description :", data.description);
					spec.addResult("accountNumber :", accountNumber);
					spec.addResult("cardHolderName :", cardHolderName);
					spec.addResult("expiryDate :", expiryDate);
					spec.addResult("track1Data :",track1Data);
					spec.addResult("track2Data :",track2Data);
					spec.addResult("track3Data :",track3Data);
					spec.addResult("aid :",aid);
					spec.addResult("appLabel :",appLabel);
					spec.addResult("appPreferredName :",appPreferredName);
					spec.addResult("serviceCode :", serviceCode);
					spec.addResult("TagIDS :",TagIDS);		//Specific to EMV tags
					spec.addResult("Values :", Values)		//Specific to EMV tags
					readCBTriggered = true;
				}
				Rho.Mobile.Payment.readCardData(param,readCB);
			})
			waitsFor(function(){
				return readCBTriggered;
			},"wait for read card data", 4000);
			runs(function(){
				spec.displayResults();
                spec.waitForResponse();
			});
		});

		//Should read data from SmartCard using method "readCardData()" with readMode-Insert and transactionType-Credit
		xit("Should read data from SmartCard with readMode-Insert and transactionType-Credit", function(){
			var spec = new ManualSpec(jasmine, window.document);
        	spec.addGoal("Should read data from SmartCard with readMode-Insert and transactionType-Credit.");
        	spec.addPrecondition("Payment device is paired via bluetooth to the device.");
            spec.addStep("Press 'RunTest' button");
            spec.addStep("Insert a valid SmartCard Credit card to readCardData from paymentDevice.");
            spec.addExpectation('Data from the card read and displayed successfully using D180 payment Device.');
            spec.displayScenario();
            spec.waitForButtonPressing("Run test");
			var openCBTriggered = false;
            var readCBTriggered = false;
            var readData = {};
			runs(function(){
				var openCB = function(){
					console.log("openCB : triggered");
					openCBTriggered = true;
				};
				Rho.MobilePayment.open(openCB);
			});
			waitsFor(function(){
					return openCBTriggered;
				},"waiting for open callback", 3000);
			runs(function(){
				var param = {
					"amount":200.00,
					"otherAmount":10.00,
					"readMode":1,			//read mode - Insert for Smart card
					"transactionType":0, 	//Transaction type : Credit
					"readTimeOut":3000
				};
				var readCB = function(data){
					console.log("read CB: triggered");
					console.log(JSON.strigify(data));
					spec.addResult("Status : ", data.status);
					spec.addResult("errorId : ", data.errorId);
					spec.addResult("description :", data.description);
					spec.addResult("accountNumber :", accountNumber);
					spec.addResult("cardHolderName :", cardHolderName);
					spec.addResult("expiryDate :", expiryDate);
					spec.addResult("track1Data :",track1Data);
					spec.addResult("track2Data :",track2Data);
					spec.addResult("track3Data :",track3Data);
					spec.addResult("aid :",aid);
					spec.addResult("appLabel :",appLabel);
					spec.addResult("appPreferredName :",appPreferredName);
					spec.addResult("serviceCode :", serviceCode);
					spec.addResult("TagIDS :",TagIDS);		//Specific to EMV tags
					spec.addResult("Values :", Values)		//Specific to EMV tags
					readCBTriggered = true;
				}
				Rho.Mobile.Payment.readCardData(param,readCB);
			})
			waitsFor(function(){
				return readCBTriggered;
			},"wait for read card data", 4000);
			runs(function(){
				spec.displayResults();
                spec.waitForResponse();
			});
		});

		//Should read data from SmartCard using method "readCardData()" with readMode-Insert and transactionType-Debit
		xit("Should read data from SmartCard with readMode-Insert and transactionType-Debit", function(){
			var spec = new ManualSpec(jasmine, window.document);
        	spec.addGoal("Should read data from SmartCard with readMode-Insert and transactionType-Debit.");
        	spec.addPrecondition("Payment device is paired via bluetooth to the device.");
            spec.addStep("Press 'RunTest' button");
            spec.addStep("Insert a valid SmartCard Debit card to readCardData from paymentDevice.");
            spec.addExpectation('Data from the card read and displayed successfully using D180 payment Device.');
            spec.displayScenario();
            spec.waitForButtonPressing("Run test");
            var openCBTriggered = false;
            var readCBTriggered = false;
            var readData = {};
			runs(function(){
				var openCB = function(){
					console.log("openCB : triggered");
					openCBTriggered = true;
				};
				Rho.MobilePayment.open(openCB);
			});
			waitsFor(function(){
					return openCBTriggered;
				},"waiting for open callback", 3000);
			runs(function(){
				var param = {
					"amount":200.00,
					"otherAmount":10.00,
					"readMode":1,			//read mode - Insert for Smart card
					"transactionType":1, 	//Transaction type : Debit
					"readTimeOut":3000
				};
				var readCB = function(data){
					console.log("read CB: triggered");
					console.log(JSON.strigify(data));
					spec.addResult("Status : ", data.status);
					spec.addResult("errorId : ", data.errorId);
					spec.addResult("description :", data.description);
					spec.addResult("accountNumber :", accountNumber);
					spec.addResult("cardHolderName :", cardHolderName);
					spec.addResult("expiryDate :", expiryDate);
					spec.addResult("track1Data :",track1Data);
					spec.addResult("track2Data :",track2Data);
					spec.addResult("track3Data :",track3Data);
					spec.addResult("aid :",aid);
					spec.addResult("appLabel :",appLabel);
					spec.addResult("appPreferredName :",appPreferredName);
					spec.addResult("serviceCode :", serviceCode);
					spec.addResult("TagIDS :",TagIDS);		//Specific to EMV tags
					spec.addResult("Values :", Values)		//Specific to EMV tags
					readCBTriggered = true;
				}
				Rho.Mobile.Payment.readCardData(param,readCB);
			})
			waitsFor(function(){
				return readCBTriggered;
			},"wait for read card data", 4000);
			runs(function(){
				spec.displayResults();
                spec.waitForResponse();
			});
		});

		//Should read data from SmartCard using method "readCardData()" with readMode-Insert and transactionType-UserChoice
		xit("Should read data from SmartCard with readMode-Insert and transactionType-UserChoice", function(){
			var spec = new ManualSpec(jasmine, window.document);
        	spec.addGoal("Should read data from SmartCard with readMode-Insert and transactionType-UserChoice.");
        	spec.addPrecondition("Payment device is paired via bluetooth to the device.");
            spec.addStep("Press 'RunTest' button");
            spec.addStep("Insert a valid SmartCard Debit/Credit card.");
            spec.addStep("Select either Debit/Credit to readCardData from payment Device.");
            spec.addExpectation('Data from the card read and displayed successfully using D180 payment Device.');
            spec.displayScenario();
            spec.waitForButtonPressing("Run test");
			var openCBTriggered = false;
            var readCBTriggered = false;
            var readData = {};
			runs(function(){
				var openCB = function(){
					console.log("openCB : triggered");
					openCBTriggered = true;
				};
				Rho.MobilePayment.open(openCB);
			});
			waitsFor(function(){
					return openCBTriggered;
				},"waiting for open callback", 3000);
			runs(function(){
				var param = {
					"amount":200.00,
					"otherAmount":10.00,
					"readMode":1,			//read mode - Insert for Smart card
					"transactionType":2, 	//Transaction type : User choice Credit/Debit
					"readTimeOut":3000
				};
				var readCB = function(data){
					console.log("read CB: triggered");
					console.log(JSON.strigify(data));
					spec.addResult("Status : ", data.status);
					spec.addResult("errorId : ", data.errorId);
					spec.addResult("description :", data.description);
					spec.addResult("accountNumber :", accountNumber);
					spec.addResult("cardHolderName :", cardHolderName);
					spec.addResult("expiryDate :", expiryDate);
					spec.addResult("track1Data :",track1Data);
					spec.addResult("track2Data :",track2Data);
					spec.addResult("track3Data :",track3Data);
					spec.addResult("aid :",aid);
					spec.addResult("appLabel :",appLabel);
					spec.addResult("appPreferredName :",appPreferredName);
					spec.addResult("serviceCode :", serviceCode);
					spec.addResult("TagIDS :",TagIDS);		//Specific to EMV tags
					spec.addResult("Values :", Values)		//Specific to EMV tags
					readCBTriggered = true;
				}
				Rho.Mobile.Payment.readCardData(param,readCB);
			})
			waitsFor(function(){
				return readCBTriggered;
			},"wait for read card data", 4000);
			runs(function(){
				spec.displayResults();
                spec.waitForResponse();
			});
		});

		//Should read data from SmartCard using method "readCardData()" with readMode-Insert and transactionType-Default
		xit("Should read data from SmartCard with readMode-Insert and transactionType-Default", function(){
			var spec = new ManualSpec(jasmine, window.document);
        	spec.addGoal("Should read data from SmartCard card with readMode-Insert and transactionType-Default.");
        	spec.addPrecondition("Payment device is paired via bluetooth to the device.");
            spec.addStep("Press 'RunTest' button");
            spec.addStep("Insert a valid SmartCard.");
            spec.addExpectation('Data from the card read and displayed successfully using D180 payment Device.');
            spec.displayScenario();
            spec.waitForButtonPressing("Run test");
			var openCBTriggered = false;
            var readCBTriggered = false;
            var readData = {};
			runs(function(){
				var openCB = function(){
					console.log("openCB : triggered");
					openCBTriggered = true;
				};
				Rho.MobilePayment.open(openCB);
			});
			waitsFor(function(){
					return openCBTriggered;
				},"waiting for open callback", 3000);
			runs(function(){
				var param = {
					"amount":200.00,
					"otherAmount":10.00,
					"readMode":1,			//read mode - Insert for Smart card
					"transactionType":3, 	//Default Transaction type : Credit/Debit
					"readTimeOut":3000
				};
				var readCB = function(data){
					console.log("read CB: triggered");
					console.log(JSON.strigify(data));
					spec.addResult("Status : ", data.status);
					spec.addResult("errorId : ", data.errorId);
					spec.addResult("description :", data.description);
					spec.addResult("accountNumber :", accountNumber);
					spec.addResult("cardHolderName :", cardHolderName);
					spec.addResult("expiryDate :", expiryDate);
					spec.addResult("track1Data :",track1Data);
					spec.addResult("track2Data :",track2Data);
					spec.addResult("track3Data :",track3Data);
					spec.addResult("aid :",aid);
					spec.addResult("appLabel :",appLabel);
					spec.addResult("appPreferredName :",appPreferredName);
					spec.addResult("serviceCode :", serviceCode);
					spec.addResult("TagIDS :",TagIDS);		//Specific to EMV tags
					spec.addResult("Values :", Values)		//Specific to EMV tags
					readCBTriggered = true;
				}
				Rho.Mobile.Payment.readCardData(param,readCB);
			})
			waitsFor(function(){
				return readCBTriggered;
			},"wait for read card data", 4000);
			runs(function(){
				spec.displayResults();
                spec.waitForResponse();
			});
		});

		//Should read data from EMVContactless Card using method "readCardData()" with readMode-Touch and transactionType-Credit
		xit("Should read data from EMVContactless tag card with readMode-Touch and transactionType-Credit", function(){
			var spec = new ManualSpec(jasmine, window.document);
        	spec.addGoal("Should read data from EMVContactless card with readMode-Touch and transactionType-Credit.");
        	spec.addPrecondition("Payment device is paired via bluetooth to the device.");
            spec.addStep("Press 'RunTest' button");
            spec.addStep("Touch a valid EMVContactless card to the paymentDevice.");
            spec.addExpectation('Data from the card read and displayed successfully using D180 payment Device.');
            spec.displayScenario();
            spec.waitForButtonPressing("Run test");
			var openCBTriggered = false;
            var readCBTriggered = false;
            var readData = {};
			runs(function(){
				var openCB = function(){
					console.log("openCB : triggered");
					openCBTriggered = true;
				};
				Rho.MobilePayment.open(openCB);
			});
			waitsFor(function(){
					return openCBTriggered;
				},"waiting for open callback", 3000);
			runs(function(){
				var param = {
					"amount":200.00,
					"otherAmount":10.00,
					"readMode":2,			//read mode - Touch for Smart card
					"transactionType":0, 	//Transaction type : Credit
					"readTimeOut":3000
				};
				var readCB = function(data){
					console.log("read CB: triggered");
					console.log(JSON.strigify(data));
					spec.addResult("Status : ", data.status);
					spec.addResult("errorId : ", data.errorId);
					spec.addResult("description :", data.description);
					spec.addResult("accountNumber :", accountNumber);
					spec.addResult("cardHolderName :", cardHolderName);
					spec.addResult("expiryDate :", expiryDate);
					spec.addResult("track1Data :",track1Data);
					spec.addResult("track2Data :",track2Data);
					spec.addResult("track3Data :",track3Data);
					spec.addResult("aid :",aid);
					spec.addResult("appLabel :",appLabel);
					spec.addResult("appPreferredName :",appPreferredName);
					spec.addResult("serviceCode :", serviceCode);
					spec.addResult("TagIDS :",TagIDS);		//Specific to EMV tags
					spec.addResult("Values :", Values)		//Specific to EMV tags
					readCBTriggered = true;
				}
				Rho.Mobile.Payment.readCardData(param,readCB);
			})
			waitsFor(function(){
				return readCBTriggered;
			},"wait for read card data", 4000);
			runs(function(){
				spec.displayResults();
                spec.waitForResponse();
			});
		});

		//Should read data from EMVContactless Card using method "readCardData()" with readMode-Touch and transactionType-Debit
		xit("Should read data from EMVContactless tag card with readMode-Touch and transactionType-Debit", function(){
			var spec = new ManualSpec(jasmine, window.document);
        	spec.addGoal("Should read data from EMVContactless card with readMode-Touch and transactionType-Debit.");
        	spec.addPrecondition("Payment device is paired via bluetooth to the device.");
            spec.addStep("Press 'RunTest' button");
            spec.addStep("Touch a valid EMVContactless card to the paymentDevice.");
            spec.addExpectation('Data from the card read and displayed successfully using D180 payment Device.');
            spec.displayScenario();
            spec.waitForButtonPressing("Run test");
			var openCBTriggered = false;
            var readCBTriggered = false;
            var readData = {};
			runs(function(){
				var openCB = function(){
					console.log("openCB : triggered");
					openCBTriggered = true;
				};
				Rho.MobilePayment.open(openCB);
			});
			waitsFor(function(){
					return openCBTriggered;
				},"waiting for open callback", 3000);
			runs(function(){
				var param = {
					"amount":200.00,
					"otherAmount":10.00,
					"readMode":2,			//read mode - Touch for Smart card
					"transactionType":1, 	//Transaction type : Debit
					"readTimeOut":3000
				};
				var readCB = function(data){
					console.log("read CB: triggered");
					console.log(JSON.strigify(data));
					spec.addResult("Status : ", data.status);
					spec.addResult("errorId : ", data.errorId);
					spec.addResult("description :", data.description);
					spec.addResult("accountNumber :", accountNumber);
					spec.addResult("cardHolderName :", cardHolderName);
					spec.addResult("expiryDate :", expiryDate);
					spec.addResult("track1Data :", track1Data);
					spec.addResult("track2Data :", track2Data);
					spec.addResult("track3Data :", track3Data);
					spec.addResult("aid :", aid);
					spec.addResult("appLabel :", appLabel);
					spec.addResult("appPreferredName :", appPreferredName);
					spec.addResult("serviceCode :", serviceCode);
					spec.addResult("TagIDS :", TagIDS);		//Specific to EMV tags
					spec.addResult("Values :", Values)		//Specific to EMV tags
					readCBTriggered = true;
				}
				Rho.Mobile.Payment.readCardData(param,readCB);
			})
			waitsFor(function(){
				return readCBTriggered;
			},"wait for read card data", 4000);
			runs(function(){
				spec.displayResults();
                spec.waitForResponse();
			});
		});

		//Should read data from EMVContactless Card using method "readCardData()" with readMode-Touch and transactionType-UserChoice
		xit("Should read data from EMVContactless tag card with readMode-Touch and transactionType-UserChoice", function(){
			var spec = new ManualSpec(jasmine, window.document);
        	spec.addGoal("Should read data from EMVContactless card with readMode-Touch and transactionType-Credit.");
        	spec.addPrecondition("Payment device is paired via bluetooth to the device.");
            spec.addStep("Press 'RunTest' button");
            spec.addStep("Touch a valid EMVContactless card to the paymentDevice.");
            spec.addStep("Select Credit/Debit in the paymentDevice to readCardData.");
            spec.addExpectation('Data from the card read and displayed successfully using D180 payment Device.');
            spec.displayScenario();
            spec.waitForButtonPressing("Run test");
			var openCBTriggered = false;
            var readCBTriggered = false;
            var readData = {};
			runs(function(){
				var openCB = function(){
					console.log("openCB : triggered");
					openCBTriggered = true;
				};
				Rho.MobilePayment.open(openCB);
			});
			waitsFor(function(){
					return openCBTriggered;
				},"waiting for open callback", 3000);
			runs(function(){
				var param = {
					"amount":200.00,
					"otherAmount":10.00,
					"readMode":2,			//read mode - Touch for Smart card
					"transactionType":3, 	//Transaction type : User choice Credit/Debit
					"readTimeOut":3000
				};
				var readCB = function(data){
					console.log("read CB: triggered");
					console.log(JSON.strigify(data));
					spec.addResult("Status : ", data.status);
					spec.addResult("errorId : ", data.errorId);
					spec.addResult("description :", data.description);
					spec.addResult("accountNumber :", accountNumber);
					spec.addResult("cardHolderName :", cardHolderName);
					spec.addResult("expiryDate :", expiryDate);
					spec.addResult("track1Data :", track1Data);
					spec.addResult("track2Data :", track2Data);
					spec.addResult("track3Data :", track3Data);
					spec.addResult("aid :", aid);
					spec.addResult("appLabel :", appLabel);
					spec.addResult("appPreferredName :", appPreferredName);
					spec.addResult("serviceCode :", serviceCode);
					spec.addResult("TagIDS :", TagIDS);		//Specific to EMV tags
					spec.addResult("Values :", Values)		//Specific to EMV tags
					readCBTriggered = true;
				}
				Rho.Mobile.Payment.readCardData(param,readCB);
			})
			waitsFor(function(){
				return readCBTriggered;
			},"wait for read card data", 4000);
			runs(function(){
				spec.displayResults();
                spec.waitForResponse();
			});
		});

		//Should read data from either MagStripe/SmartCard/EMVContactless Card using method "readCardData()" with readMode-All and transactionType-credit
		xit("Should read data from either MagStripe/SmartCard/EMVContactless tag with readMode-All and transactionType-Credit", function(){
			var spec = new ManualSpec(jasmine, window.document);
        	spec.addGoal("Should read data from swipe of MagStripe card or Insertion of Smart card or by a Touch of EMVContactless card with readMode-All.");
        	spec.addPrecondition("Payment device is paired via bluetooth to the device.");
            spec.addStep("Press 'RunTest' button");
            spec.addStep("Swipe a MagStripe card or Insert a SmartCard or Touch a valid EMVContactless card to the paymentDevice.");
            spec.addExpectation('Data from the card read and displayed successfully using D180 payment Device.');
            spec.displayScenario();
            spec.waitForButtonPressing("Run test");
			var openCBTriggered = false;
            var readCBTriggered = false;
            var readData = {};
			runs(function(){
				var openCB = function(){
					console.log("openCB : triggered");
					openCBTriggered = true;
				};
				Rho.MobilePayment.open(openCB);
			});
			waitsFor(function(){
					return openCBTriggered;
				},"waiting for open callback", 3000);
			runs(function(){
				var param = {
					"amount":200.00,
					"otherAmount":10.00,
					"readMode":3,			//read mode - All
					"transactionType":0, 	//Transaction type : Credit
					"readTimeOut":3000
				};
				var readCB = function(data){
					console.log("read CB: triggered");
					console.log(JSON.strigify(data));
					spec.addResult("Status : ", data.status);
					spec.addResult("errorId : ", data.errorId);
					spec.addResult("description :", data.description);
					spec.addResult("accountNumber :", accountNumber);
					spec.addResult("cardHolderName :", cardHolderName);
					spec.addResult("expiryDate :", expiryDate);
					spec.addResult("track1Data :", track1Data);
					spec.addResult("track2Data :", track2Data);
					spec.addResult("track3Data :", track3Data);
					spec.addResult("aid :", aid);
					spec.addResult("appLabel :", appLabel);
					spec.addResult("appPreferredName :", appPreferredName);
					spec.addResult("serviceCode :", serviceCode);
					spec.addResult("TagIDS :", TagIDS);		//Specific to EMV tags
					spec.addResult("Values :", Values)		//Specific to EMV tags
					readCBTriggered = true;
				}
				Rho.Mobile.Payment.readCardData(param,readCB);
			})
			waitsFor(function(){
				return readCBTriggered;
			},"wait for read card data", 4000);
			runs(function(){
				spec.displayResults();
                spec.waitForResponse();
			});
		});

		//Should read data from EMVContactless Card using method "readCardData()" with readMode-Touch and transactionType-Default
		//Q: How to set the default value ? what is the default value ?
		xit("Should read data from EMVContactless tag card with readMode-Touch and transactionType-Default", function(){
			var spec = new ManualSpec(jasmine, window.document);
        	spec.addGoal("Should read data from EMVContactless card with readMode-Touch and transactionType-Default.");
        	spec.addPrecondition("Payment device is paired via bluetooth to the device.");
            spec.addStep("Press 'RunTest' button");
            spec.addStep("Touch a valid EMVContactless card to the paymentDevice.");
            spec.addStep("Select Credit/Debit in the paymentDevice to readCardData.");
            spec.addExpectation('Data from the card read and displayed successfully using D180 payment Device.');
            spec.displayScenario();
            spec.waitForButtonPressing("Run test");
			var openCBTriggered = false;
            var readCBTriggered = false;
            var readData = {};
			runs(function(){
				var openCB = function(){
					console.log("openCB : triggered");
					openCBTriggered = true;
				};
				Rho.MobilePayment.open(openCB);
			});
			waitsFor(function(){
					return openCBTriggered;
				},"waiting for open callback", 3000);
			runs(function(){
				var param = {
					"amount":200.00,
					"otherAmount":10.00,
					"readMode":2,			//read mode - Touch
					"transactionType":3, 	//Transaction type : Default
					"readTimeOut":3000
				};
				var readCB = function(data){
					console.log("read CB: triggered");
					console.log(JSON.strigify(data));
					spec.addResult("Status : ", data.status);
					spec.addResult("errorId : ", data.errorId);
					spec.addResult("description :", data.description);
					spec.addResult("accountNumber :", accountNumber);
					spec.addResult("cardHolderName :", cardHolderName);
					spec.addResult("expiryDate :", expiryDate);
					spec.addResult("track1Data :", track1Data);
					spec.addResult("track2Data :", track2Data);
					spec.addResult("track3Data :", track3Data);
					spec.addResult("aid :", aid);
					spec.addResult("appLabel :", appLabel);
					spec.addResult("appPreferredName :", appPreferredName);
					spec.addResult("serviceCode :", serviceCode);
					spec.addResult("TagIDS :", TagIDS);		//Specific to EMV tags
					spec.addResult("Values :", Values)		//Specific to EMV tags
					readCBTriggered = true;
				}
				Rho.Mobile.Payment.readCardData(param,readCB);
			})
			waitsFor(function(){
				return readCBTriggered;
			},"wait for read card data", 4000);
			runs(function(){
				spec.displayResults();
                spec.waitForResponse();
			});
		});

		//Should not read data from MagStripe Card using method "readCardData()" with readMode-Insert and transactionType-UserChoice
		xit("Should not read data from MagStripe card with readMode-Insert and transactionType-UserChoice and callback triggered with errorId:15 and description:CARD_NOT_SUPPORTED", function(){
			var spec = new ManualSpec(jasmine, window.document);
			spec.addGoal("Should return errorId:15 and description:CARD_NOT_SUPPORTED with callback, when MagStrip card is inserted with SmartCard slot");
			spec.addPrecondition("Payment device is paired via bluetooth to the device.");
			spec.addStep("Press 'RunTest' button");
			spec.addStep("Insert a valid MagStripe card in to the smart card slot");
			spec.addExpectation("Semi auto test to check the callback function triggered with errorId:15 and description:CARD_NOT_SUPPORTED");
			var readHandler = {
					readCB: function(data){
						console.log("openCB: triggered");
						console.log(data);
					}
				};
			var openCBTriggered = false;
            var wait = false;
			runs(function(){
				var openCB = function(){
					console.log("openCB : triggered");
					openCBTriggered = true;
				};
				Rho.MobilePayment.open(openCB);
			});
			waitsFor(function(){
					return openCBTriggered;
				},"waiting for open callback", 3000);
			runs(function(){
				var param = {
					"amount":200.00,
					"otherAmount":10.00,
					"readMode":1,			//read mode - Insert
					"transactionType":0, 	//Transaction type : Credit
					"readTimeOut":3000
				};
				var readHandler = {
					readCB: function(data){
						console.log("openCB: triggered");
						console.log(data);
					}
				};
				spyOn(readHandler,'readCB');
				Rho.Mobile.Payment.readCardData(param, readHandler.readCB);
			});
			// below wait is the time for the user to swipe card in to D180 device.
			waitsFor(function(){
				setTimeout(function(){
					wait = true;
				},4000);
				return wait == true;
			},"wait for readcard timeout", 5000);
			runs(function(){
				expect(readHandler.readCB).toHaveBeenCalledWith({"status":"error","errorId":15,"description":"CARD_NOT_SUPPORTED"});
			});
		});

		//Should not read data from SmartCard using method "readCardData()" with readMode-Swipe and transactionType-UserChoice
		xit("Should not read data from SmartCard with readMode-Swipe and transactionType-UserChoice and callback triggered with errorId:15 and description:CARD_NOT_SUPPORTED", function(){
			var spec = new ManualSpec(jasmine, window.document);
			spec.addGoal("Should return errorId:15 and description:CARD_NOT_SUPPORTED with callback, when SmartCard got swiped with paymentDevice");
			spec.addPrecondition("Payment device is paired via bluetooth to the device.");
			spec.addStep("Press 'RunTest' button");
			spec.addStep("Swipe a valid SmartCard with paymentDevice");
			spec.addExpectation("Semi auto test to check the callback function triggered with errorId:15 and description:CARD_NOT_SUPPORTED");
			var readHandler = {
					readCB: function(data){
						console.log("openCB: triggered");
						console.log(data);
					}
				};
			var openCBTriggered = false;
            var wait = false;
			runs(function(){
				var openCB = function(){
					console.log("openCB : triggered");
					openCBTriggered = true;
				};
				Rho.MobilePayment.open(openCB);
			});
			waitsFor(function(){
					return openCBTriggered;
				},"waiting for open callback", 3000);
			runs(function(){
				var param = {
					"amount":200.00,
					"otherAmount":10.00,
					"readMode":0,			//read mode - Swipe
					"transactionType":0, 	//Transaction type : Credit
					"readTimeOut":3000
				};
				var readHandler = {
					readCB: function(data){
						console.log("openCB: triggered");
						console.log(data);
					}
				};
				spyOn(readHandler,'readCB');
				Rho.Mobile.Payment.readCardData(param, readHandler.readCB);
			});
			// below wait is the time for the user to swipe card in to D180 device.
			waitsFor(function(){
				setTimeout(function(){
					wait = true;
				},4000);
				return wait == true;
			},"wait for readcard timeout", 5000);
			runs(function(){
				expect(readHandler.readCB).toHaveBeenCalledWith({"status":"error","errorId":15,"description":"CARD_NOT_SUPPORTED"});
			});
		});

		//Should not read data from EMVContactless using method "readCardData()" with readMode-Swipe and transactionType-UserChoice
		xit("Should not read data from EMVContactless tag card with readMode-Swipe and transactionType-UserChoice and callback triggered with errorId:15 and description:CARD_NOT_SUPPORTED", function(){
			var spec = new ManualSpec(jasmine, window.document);
			spec.addGoal("Should return errorId:15 and description:CARD_NOT_SUPPORTED with callback, when EMVContactless swiped with paymentDevice");
			spec.addPrecondition("Payment device is paired via bluetooth to the device.");
			spec.addStep("Press 'RunTest' button");
			spec.addStep("Swipe a valid EMVContactless with paymentDevice");
			spec.addExpectation("Semi auto test to check the callback function triggered with errorId:15 and description:CARD_NOT_SUPPORTED");
			var readHandler = {
					readCB: function(data){
						console.log("openCB: triggered");
						console.log(data);
					}
				};
			var openCBTriggered = false;
            var wait = false;
			runs(function(){
				var openCB = function(){
					console.log("openCB : triggered");
					openCBTriggered = true;
				};
				Rho.MobilePayment.open(openCB);
			});
			waitsFor(function(){
					return openCBTriggered;
				},"waiting for open callback", 3000);
			runs(function(){
				var param = {
					"amount":200.00,
					"otherAmount":10.00,
					"readMode":0,			//read mode - Swipe
					"transactionType":0, 	//Transaction type : Credit
					"readTimeOut":3000
				};
				spyOn(readHandler,'readCB');
				Rho.Mobile.Payment.readCardData(param, readHandler.readCB);
			});
			// below wait is the time for the user to swipe card in to D180 device.
			waitsFor(function(){
				setTimeout(function(){
					wait = true;
				},4000);
				return wait == true;
			},"wait for readcard timeout", 5000);
			runs(function(){
				expect(readHandler.readCB).toHaveBeenCalledWith({"status":"error","errorId":15,"description":"CARD_NOT_SUPPORTED"});
			});
		});

		//Should not read data from EMVContactless using method "readCardData()" with readMode-Insert and transactionType-UserChoice
		xit("Should not read data from EMVContactless tag card with readMode-Insert and transactionType-UserChoice and callback triggered with errorId:15 and description:CARD_NOT_SUPPORTED", function(){
			var spec = new ManualSpec(jasmine, window.document);
			spec.addGoal("Should return errorId:15 and description:CARD_NOT_SUPPORTED with callback, when EMVContactless inserted with paymentDevice");
			spec.addPrecondition("Payment device is paired via bluetooth to the device.");
			spec.addStep("Press 'RunTest' button");
			spec.addStep("Insert a valid EMVContactless with paymentDevice");
			spec.addExpectation("Semi auto test to check the callback function triggered with errorId:15 and description:CARD_NOT_SUPPORTED");
			var readHandler = {
					readCB: function(data){
						console.log("openCB: triggered");
						console.log(data);
					}
				};
			var openCBTriggered = false;
            var wait = false;
			runs(function(){
				var openCB = function(){
					console.log("openCB : triggered");
					openCBTriggered = true;
				};
				Rho.MobilePayment.open(openCB);
			});
			waitsFor(function(){
					return openCBTriggered;
				},"waiting for open callback", 3000);
			runs(function(){
				var param = {
					"amount":200.00,
					"otherAmount":10.00,
					"readMode":1,			//read mode - Insert
					"transactionType":0, 	//Transaction type : Credit
					"readTimeOut":3000
				};
				spyOn(readHandler,'readCB');
				Rho.Mobile.Payment.readCardData(param, readHandler.readCB);
			});
			// below wait is the time for the user to swipe card in to D180 device.
			waitsFor(function(){
				setTimeout(function(){
					wait = true;
				},4000);
				return wait == true;
			},"wait for readcard timeout", 5000);
			runs(function(){
				expect(readHandler.readCB).toHaveBeenCalledWith({"status":"error","errorId":15,"description":"CARD_NOT_SUPPORTED"});
			});
		});

		//It should trigger callback with proper error while trying to read card data before open method.
		xit("Should trigger callback with errorId:8 and description:DEVICE_NOT_OPENED when trying to readCardData() before open() method.", function(){
			var spec = new ManualSpec(jasmine, window.document);
			spec.addGoal("Should return errorId:8 and description:DEVICE_NOT_OPENED with callback, when MagStripe card swiped with paymentDevice");
			spec.addPrecondition("Payment device is paired via bluetooth to the device.");
			spec.addStep("Press 'RunTest' button");
			spec.addStep("Swipe a valid MagStripe with paymentDevice");
			spec.addExpectation("Semi auto test to check the callback function triggered with errorId:8 and description:DEVICE_NOT_OPENED");
			var readHandler = {
					readCB: function(data){
						console.log("openCB: triggered");
						console.log(data);
					}
				};
			var closeCBTriggered = false;
            var wait = false;
			runs(function(){
				var closeCB = function(){
					console.log("closeCB : triggered");
					closeCBTriggered = true;
				};
				Rho.MobilePayment.close(closeCB);
			});
			waitsFor(function(){
					return closeCBTriggered;
				},"waiting for open callback", 3000);
			runs(function(){
				var param = {
					"amount":200.00,
					"otherAmount":10.00,
					"readMode":0,			//read mode - Swipe
					"transactionType":0, 	//Transaction type : Credit
					"readTimeOut":3000
				};
				spyOn(readHandler,'readCB');
				Rho.Mobile.Payment.readCardData(param, readHandler.readCB);
			});
			waitsFor(function(){
				setTimeout(function(){
					wait = true;
				},4000);
				return wait == true;
			},"wait for readcard timeout", 5000);
			runs(function(){
				expect(readHandler.readCB).toHaveBeenCalledWith({"status":"error","errorId":8,"description":"DEVICE_NOT_OPENED"});
			});
		});

		//It should trigger callback with proper error while smart card removed or not inserted.
		xit("Should trigger callback with errorId:13 and description:CARD_REMOVED when smartCard is removed while reading", function(){
			var spec = new ManualSpec(jasmine, window.document);
			spec.addGoal("Should return errorId:13 and description:CARD_REMOVED with callback, when SmartCard is inserted and removed while reading.");
			spec.addPrecondition("Payment device is paired via bluetooth to the device.");
			spec.addStep("Press 'RunTest' button");
			spec.addStep("Insert a valid SmartCard with paymentDevice");
			spec.addExpectation("Semi auto test to check the callback function triggered with errorId:13 and description:CARD_REMOVED");
			var readHandler = {
					readCB: function(data){
						console.log("openCB: triggered");
						console.log(data);
					}
				};
			var openCBTriggered = false;
            var wait = false;
			runs(function(){
				var openCB = function(){
					console.log("openCB : triggered");
					openCBTriggered = true;
				};
				Rho.MobilePayment.open(openCB);
			});
			waitsFor(function(){
					return openCBTriggered;
				},"waiting for open callback", 3000);
			runs(function(){
				alert("insert and remove your smart card immediately.");
				var param = {
					"amount":200.00,
					"otherAmount":10.00,
					"readMode":1,			//read mode - Insert
					"transactionType":0, 	//Transaction type : Credit
					"readTimeOut":3000
				};
				spyOn(readHandler,'readCB');
				Rho.Mobile.Payment.readCardData(param, readHandler.readCB);
			});
			// below wait is the time for the user to insert card in to D180 device.
			waitsFor(function(){
				setTimeout(function(){
					wait = true;
				},4000);
				return wait == true;
			},"wait for readcard timeout", 5000);
			runs(function(){
				expect(readHandler.readCB).toHaveBeenCalledWith({"status":"error","errorId":13,"description":"CARD_REMOVED"});
			});
		});

		//It should trigger callback with proper error when no card is "Inserted"/Swiped/Touched while reading.
		xit("Should trigger callback with errorId:9 and description:TIMED_OUT when MagStripe card is not swiped at all while method readCardData() is called", function(){
			var spec = new ManualSpec(jasmine, window.document);
			spec.addGoal("Should return errorId:9 and description:TIMED_OUT with callback, when MagStripe card not swiped with paymentDevice");
			spec.addPrecondition("Payment device is paired via bluetooth to the device.");
			spec.addStep("Press 'RunTest' button");
			spec.addStep("Do not swipe any valid MagStripe card with paymentDevice");
			spec.addExpectation("Semi auto test to check the callback function triggered with errorId:9 and description:TIMED_OUT");
			var readHandler = {
					readCB: function(data){
						console.log("openCB: triggered");
						console.log(data);
					}
				};
			var openCBTriggered = false;
            var wait = false;
			runs(function(){
				var openCB = function(){
					console.log("openCB : triggered");
					openCBTriggered = true;
				};
				Rho.MobilePayment.open(openCB);
			});
			waitsFor(function(){
					return openCBTriggered;
				},"waiting for open callback", 3000);
			runs(function(){
				var param = {
					"amount":200.00,
					"otherAmount":10.00,
					"readMode":0,			//read mode - Swipe
					"transactionType":0, 	//Transaction type : Credit
					"readTimeOut":3000
				};
				spyOn(readHandler,'readCB');
				Rho.Mobile.Payment.readCardData(param, readHandler.readCB);
			});
			// below wait is the time for the user to insert card in to D180 device.
			waitsFor(function(){
				setTimeout(function(){
					wait = true;
				},4000);
				return wait == true;
			},"wait for readcard timeout", 5000);
			runs(function(){
				expect(readHandler.readCB).toHaveBeenCalledWith({"status":"error","errorId":9,"description":"TIMED_OUT"});
			});
		});

		//It should trigger callback with proper error when no card is Swiped/"Inserted"/Touched while reading.
		xit("Should trigger callback with errorId:9 and description:TIMED_OUT when SmartCard is not Inserted at all while method readCardData() is called", function(){
			var spec = new ManualSpec(jasmine, window.document);
			spec.addGoal("Should return errorId:9 and description:TIMED_OUT with callback, when SmartCard is not inserted with paymentDevice");
			spec.addPrecondition("Payment device is paired via bluetooth to the device.");
			spec.addStep("Press 'RunTest' button");
			spec.addStep("Do not Insert any valid SmartCard with paymentDevice");
			spec.addExpectation("Semi auto test to check the callback function triggered with errorId:9 and description:TIMED_OUT");
			var readHandler = {
					readCB: function(data){
						console.log("openCB: triggered");
						console.log(data);
					}
				};
			var openCBTriggered = false;
            var wait = false;
			runs(function(){
				var openCB = function(){
					console.log("openCB : triggered");
					openCBTriggered = true;
				};
				Rho.MobilePayment.open(openCB);
			});
			waitsFor(function(){
					return openCBTriggered;
				},"waiting for open callback", 3000);
			runs(function(){
				alert("insert and remove your smart card immediately.");
				var param = {
					"amount":200.00,
					"otherAmount":10.00,
					"readMode":1,			//read mode - Insert
					"transactionType":0, 	//Transaction type : Credit
					"readTimeOut":3000
				};
				spyOn(readHandler,'readCB');
				Rho.Mobile.Payment.readCardData(param, readHandler.readCB);
			});
			// below wait is the time for the user to insert card in to D180 device.
			waitsFor(function(){
				setTimeout(function(){
					wait = true;
				},4000);
				return wait == true;
			},"wait for readcard timeout", 5000);
			runs(function(){
				expect(readHandler.readCB).toHaveBeenCalledWith({"status":"error","errorId":9,"description":"TIMED_OUT"});
			});
		});

		//It should trigger callback with proper error when no card is Swiped/Inserted/"Touched" while reading.
		xit("Should trigger callback with errorId:9 and description:TIMED_OUT when EMVContactless is not touched at all while method readCardData() is called", function(){
			var spec = new ManualSpec(jasmine, window.document);
			spec.addGoal("Should return errorId:9 and description:TIMED_OUT with callback, when EMVContactless is not touched with paymentDevice");
			spec.addPrecondition("Payment device is paired via bluetooth to the device.");
			spec.addStep("Press 'RunTest' button");
			spec.addStep("Do not touch any valid EMVContactless with paymentDevice");
			spec.addExpectation("Semi auto test to check the callback function triggered with errorId:9 and description:TIMED_OUT");
			var readHandler = {
					readCB: function(data){
						console.log("openCB: triggered");
						console.log(data);
					}
				};
			var openCBTriggered = false;
            var wait = false;
			runs(function(){
				var openCB = function(){
					console.log("openCB : triggered");
					openCBTriggered = true;
				};
				Rho.MobilePayment.open(openCB);
			});
			waitsFor(function(){
					return openCBTriggered;
				},"waiting for open callback", 3000);
			runs(function(){
				alert("insert and remove your smart card immediately.");
				var param = {
					"amount":200.00,
					"otherAmount":10.00,
					"readMode":2,			//read mode - Touch
					"transactionType":0, 	//Transaction type : Credit
					"readTimeOut":3000
				};
				spyOn(readHandler,'readCB');
				Rho.Mobile.Payment.readCardData(param, readHandler.readCB);
			});
			// below wait is the time for the user to insert card in to D180 device.
			waitsFor(function(){
				setTimeout(function(){
					wait = true;
				},4000);
				return wait == true;
			},"wait for readcard timeout", 5000);
			runs(function(){
				expect(readHandler.readCB).toHaveBeenCalledWith({"status":"error","errorId":9,"description":"TIMED_OUT"});
			});
		});

		//It should trigger callback with proper error when no parameter is passed with the method readCardData()
		xit("Should trigger callback with errorId:4 and description:INVALID_VALUE when invalid parameters passed with readCardData()", function(){
			var spec = new ManualSpec(jasmine, window.document);
			spec.addGoal("Should return errorId:4 and description:INVALID_VALUE with callback, when no parameter is passed with readCardData()");
			spec.addPrecondition("Payment device is paired via bluetooth to the device.");
			spec.addStep("Press 'RunTest' button");
			spec.addExpectation("Semi auto test to check the callback function triggered with errorId:4 and description:INVALID_VALUE");
			var readHandler = {
					readCB: function(data){
						console.log("openCB: triggered");
						console.log(data);
					}
				};
			var openCBTriggered = false;
            var wait = false;
			runs(function(){
				var openCB = function(){
					console.log("openCB : triggered");
					openCBTriggered = true;
				};
				Rho.MobilePayment.open(openCB);
			});
			waitsFor(function(){
					return openCBTriggered;
				},"waiting for open callback", 3000);
			runs(function(){
				alert("insert and remove your smart card immediately.");
				var param = {
					"amount":"invalidValue", 		//string value is invalid for amount
					"otherAmount":"invalidValue",	//String value is invalid for other Amount
					"readMode":10,			//read mode - value 10 is invalid 
					"transactionType":10, 	//Transaction type : value 10 is invalid
					"readTimeOut":"3000"	//string value is invalid for readTimeOut
				};
				spyOn(readHandler,'readCB');
				Rho.Mobile.Payment.readCardData(param, readHandler.readCB);
			});
			// below wait is the time for the user to insert card in to D180 device.
			waitsFor(function(){
				setTimeout(function(){
					wait = true;
				},4000);
				return wait == true;
			},"wait for readcard timeout", 5000);
			runs(function(){
				expect(readHandler.readCB).toHaveBeenCalledWith({"status":"error","errorId":4,"description":"INVALID_VALUE"});
			});
		});

		//Should support method promptPin()
		//Access : ```Rho.MobilePayment.promptPin({},callbackfunction);```  
		//Paramater : Callback function (mandatory)  
		//Callback Paramaters (Hash): ```{"status":success,"errorId":""}```  
		xit("Should support \"promptPin()\" method with the paymentDevice object, to prompt for PIN.", function(){
			var spec = new ManualSpec(jasmine, window.document);
			spec.addGoal("Should request PIN code with the paymentDevice, when promptPin() method is called in the application");
			spec.addPrecondition("Payment device is paired with bluetooth to the device.");
			spec.addStep("Press 'RunTest' button");
			spec.addStep("Observe that PIN code request is prompted at the paymentDevice");
			spec.addStep("Enter PIN value of length 4 and press 'Ok.");
			spec.addStep("Check for the status:'Success' and no errorId with the callback parameter");
			var openCBTriggered = false;
			var promptPinCBTriggered = false;
			var promptPinCB = function(data){
				console.log("promptPinCB : triggered");
				spec.addResult("Status : ", data.status);
				spec.addResult("Error Id : ", data.errorId);
				spec.addResult("Description : ", data.description);
				spec.addResult("pinBlockStr : ", data.pinBlockStr);
				spec.addResult("SerialNumber : ", data.serialNumber);
				promptPinCBTriggered = true;
			};
			runs(function(){
				var openCB = function(){
					console.log("openCB : triggered");
					openCBTriggered = true;
				};
				Rho.MobilePayment.open(openCB);
			});
			waitsFor(function(){
				return openCBTriggered;
			},"wait for open callback trigger",3000);
			runs(function(){
				var param = {
					"accountNumber":"asd123458765",
					"expectedPINLength":4,
					"messageTitle":"Enter PIN",
					"message1":"only 4 digits",
					"readTimeOut":5000
				};
				Rho.MobilePayment.promptPin(param, promptPinCB);
			});
			waitsFor(function(){
				return promptPinCBTriggered;
			},"wait for prompt callback", 7000);
			runs(function(){
				spec.displayResults();
				spec.waitForResponse();
			});
		});

		//Should prompt for PIN number when below given parameters are called with promptPin() and send back proper error id with the callback
		// PIN number length less than expected ( <4 )
		//Access : ```Rho.MobilePayment.promptPin({"accountNumber":"09876543216", "expectedPINLength":"4", "messageTitle":"PIN Request", "message1":"Enter you PIN", "readTimeOut":5000},callbackfunction);```  
		//Paramater : Callback function (mandatory)  
		//Callback Paramaters (Hash): ```{"status":"error",errorId":"4","description":"INVALID_VALUE"}```  
		xit("Should prompt for PIN number and send back proper errorId with the callback when below given parameters are called with method \"promptPin()\" {\"accountNumber\":\"09876543216\", \"expectedPINLength\":4, \"messageTitle\":\"Enter PIN\", \"message1\":\"Enter you PIN\", \"readTimeOut\":5000}", function(){
			var spec = new ManualSpec(jasmine, window.document);
			spec.addGoal("Should send errorId:4 and description:\"INVALID_VALUE\"");
			spec.addPrecondition("Payment device is paired with bluetooth to the device.");
			spec.addStep("Press 'RunTest' button");
			spec.addStep("Observe that PIN code request is prompted at the paymentDevice");
			spec.addStep("Enter PIN of length less than 4 characters and press 'Ok")
			spec.addExpectation("Semi Auto test, to check for the status:error, errorId:4 and description:INVALID_VALUE with the callback");
			var openCBTriggered = false;
			var promptPinCBTriggered = false;
			var promptHandler = {
				promptPinCB: function(data){
					promptPinCBTriggered = true;
				}
			}
			runs(function(){
				var openCB = function(){
					console.log("openCB : triggered");
					openCBTriggered = true;
				};
				Rho.MobilePayment.open(openCB);
			});
			waitsFor(function(){
				return openCBTriggered;
			},"wait for open callback trigger",3000);
			runs(function(){
				var param = {
					"accountNumber":"09876543216",
	            	"expectedPINLength":"4",
	            	"messageTitle":"PIN Request",
	            	"message1":"Enter you PIN",
	            	"readTimeOut":5000
				};
				spyOn(promptHandler, "promptPinCB")
				Rho.MobilePayment.promptPin(param, promptHandler.promptPinCB);
			});
			waitsFor(function(){
				return promptPinCBTriggered;
			},"wait for prompt callback", 5000);
			runs(function(){
				expect(promptHandler.promptPinCB).toHaveBeenCalledwith({"status":"error","errorId":4,"description":"INVALID_VALUE"});
			});
		});

		//Should prompt for PIN number when below given parameters are called with promptPin() and send back proper error id with the callback
		//Do not enter any PIN number until the timeout
		//Access : ```Rho.MobilePayment.promptPin({"accountNumber":"09876543216", "expectedPINLength":"4", "messageTitle":"Enter PIN", "message1":"Enter you PIN", "readTimeOut":5000},callbackfunction);```  
		//Callback : mandatory  
		//Callback Paramaters (Hash): ```{"status":"error",errorId":"9","description":"TIMED_OUT"}```  
		xit("Should send back proper errorId with the callback when nothing entered till the timeout with \"promptPin()\" {\"accountNumber\":\"09876543216\", \"expectedPINLength\":4, \"messageTitle\":\"Enter PIN\", \"message1\":\"Enter you PIN\", \"readTimeOut\":5000}", function(){
			var spec = new ManualSpec(jasmine, window.document);
			spec.addGoal("Should send errorId:9 and description:\"TIMED_OUT\"");
			spec.addPrecondition("Payment device is paired with bluetooth to the device.");
			spec.addStep("Press 'RunTest' button");
			spec.addStep("Observe that PIN code request is prompted at the paymentDevice");
			spec.addStep("Do not enter PIN untill the timeout.")
			spec.addExpectation("Semi auto test case to check for the errorId:9 and description:TIMED_OUT with the callback");
			var openCBTriggered = false;
			var promptPinCBTriggered = false;
			var promptHandler = {
				promptPinCB: function(data){
					promptPinCBTriggered = true;
				}
			}
			runs(function(){
				var openCB = function(){
					console.log("openCB : triggered");
					openCBTriggered = true;
				};
				Rho.MobilePayment.open(openCB);
			});
			waitsFor(function(){
				return openCBTriggered;
			},"wait for open callback trigger",3000);
			runs(function(){
				var param = {
					"accountNumber":"09876543216",
	            	"expectedPINLength":"4",
	            	"messageTitle":"PIN Request",
	            	"message1":"Enter you PIN",
	            	"readTimeOut":5000
				};
				spyOn(promptHandler, "promptPinCB")
				Rho.MobilePayment.promptPin(param, promptHandler.promptPinCB);
			});
			waitsFor(function(){
				return promptPinCBTriggered;
			},"wait for prompt callback", 5000);
			runs(function(){
				expect(promptHandler.promptPinCB).toHaveBeenCalledwith({"status":"error","errorId":9,"description":"TIMED_OUT"});
			});
		});

		//Should support method promptMenu()
		//Should prompt for Menu when below given paramters are called with promptMenu() and send back proper status with the callback
		//Access : ```Rho.MobilePayment.promptMenu({"messageLine1":"Message1","messageLine2":"Message2","choice1":"myMenu1","choice2":"myMenu2","timeout":3000,"deviceIndex":1})
		//Callback : mandatory
		//Callback Parameters (Hash) : ```{"status":"success","choice":"myMenu2","errorId":"","description":""}```
		xit("Should support \"promptMenu()\" method with the paymentDevice object, to prompt menu items", function(){
			var spec = new ManualSpec(jasmine, window.document);
			spec.addGoal("Should prompt Menu list with the payment device.");
			spec.addPrecondition("Payment device is paired with bluetooth to the device.");
			spec.addStep("Press 'RunTest' button");
			spec.addStep("Observe that Menu list is prompted for user selection with 2 Mesage Line and 2 Menu items.");
			spec.addStep("Select myMenu2 menu from the list");
			spec.addExpectation("Observe that status:success, choice:myMenu2,errorId:'' and description:'' send with callback function.");
			var openCBTriggered = false;
			var promptMenuCBTriggered = false;
			var promptMenuCB = function(data){
				console.log("promptPinCB : triggered");
				spec.addResult("Status : ", data.status);
				spec.addResult("Error Id : ", data.errorId);
				spec.addResult("Description : ", data.description);
				spec.addResult("Choice : ", data.choice);
				promptMenuCBTriggered = true;
			};
			runs(function(){
				var openCB = function(){
					console.log("openCB : triggered");
					openCBTriggered = true;
				};
				Rho.MobilePayment.open(openCB);
			});
			waitsFor(function(){
				return openCBTriggered;
			},"wait for open callback trigger",3000);
			runs(function(){
				var param = {
					"messageLine1":"Message1",
	            	"messageLine2":"Message2",
	            	"choice1":"myMenu1",
	            	"choice2":"myMenu2",
	            	"timeout":3000,
	            	"deviceIndex":1
				};
				Rho.MobilePayment.promptMenu(param, promptMenuCB);
			});
			waitsFor(function(){
				return promptMenuCBTriggered;
			},"wait for prompt callback", 7000);
			runs(function(){
				spec.displayResults();
				spec.waitForResponse();
			});
		});

		//Should prompt for Menu when below given paramters are called with promptMenu() and send back proper status with the callback
		//Access : ```Rho.MobilePayment.promptMenu({"messageLine1":"Message1","messageLine2":"","choice1":"myMenu1","choice2":"myMenu2","timeout":3000,"deviceIndex":1})
		//Callback : mandatory
		//Callback Parameters (Hash) : ```{"status":"success","choice":"myMenu2","errorId":"","description":""}```
		xit("Should prompt menu with only one message line.", function(){
			var spec = new ManualSpec(jasmine, window.document);
			spec.addGoal("Should prompt Menu list with the payment device.");
			spec.addPrecondition("Payment device is paired with bluetooth to the device.");
			spec.addStep("Press 'RunTest' button");
			spec.addStep("Observe that Menu list is prompted for user selection with 1 Mesage Line.");
			spec.addStep("Select myMenu2 menu from the list");
			spec.addExpectation("Observe that status:success, choice:myMenu2,errorId:'' and description:'' send with callback function.");
			var openCBTriggered = false;
			var promptMenuCBTriggered = false;
			var promptMenuCB = function(data){
				console.log("promptPinCB : triggered");
				spec.addResult("Status : ", data.status);
				spec.addResult("Error Id : ", data.errorId);
				spec.addResult("Description : ", data.description);
				spec.addResult("Choice : ", data.choice);
				promptMenuCBTriggered = true;
			};
			runs(function(){
				var openCB = function(){
					console.log("openCB : triggered");
					openCBTriggered = true;
				};
				Rho.MobilePayment.open(openCB);
			});
			waitsFor(function(){
				return openCBTriggered;
			},"wait for open callback trigger",3000);
			runs(function(){
				var param = {
					"messageLine1":"Message1",
	            	"messageLine2":"",
	            	"choice1":"myMenu1",
	            	"choice2":"myMenu2",
	            	"timeout":3000,
	            	"deviceIndex":1
				};
				Rho.MobilePayment.promptMenu(param, promptMenuCB);
			});
			waitsFor(function(){
				return promptMenuCBTriggered;
			},"wait for prompt callback", 7000);
			runs(function(){
				spec.displayResults();
				spec.waitForResponse();
			});
		});

		//Should prompt for Menu when below given paramters are called with promptMenu() and send back proper status with the callback
		//Access : ```Rho.MobilePayment.promptMenu({"messageLine1":"","messageLine2":"","choice1":"myMenu1","choice2":"myMenu2","timeout":3000,"deviceIndex":1})
		//Callback : mandatory
		//Callback Parameters (Hash) : ```{"status":"success","choice":"myMenu2","errorId":"","description":""}```
		xit("Should prompt menu in the paymentDevice with no Message Line", function(){
			var spec = new ManualSpec(jasmine, window.document);
			spec.addGoal("Should prompt Menu list with the payment device.");
			spec.addPrecondition("Payment device is paired with bluetooth to the device.");
			spec.addStep("Press 'RunTest' button");
			spec.addStep("Observe that Menu list is prompted for user selection with  no Mesage Line.");
			spec.addStep("Select myMenu2 menu from the list");
			spec.addExpectation("Semi auto test case to check callback is triggered with status:success, choice:myMenu2,errorId:'' and description:'' send with callback function.");
			var openCBTriggered = false;
			var promptMenuCBTriggered = false;
			var promptMenuCB = function(data){
				console.log("promptPinCB : triggered");
				spec.addResult("Status : ", data.status);
				spec.addResult("Error Id : ", data.errorId);
				spec.addResult("Description : ", data.description);
				spec.addResult("Choice : ", data.choice);
				promptMenuCBTriggered = true;
			};
			runs(function(){
				var openCB = function(){
					console.log("openCB : triggered");
					openCBTriggered = true;
				};
				Rho.MobilePayment.open(openCB);
			});
			waitsFor(function(){
				return openCBTriggered;
			},"wait for open callback trigger",3000);
			runs(function(){
				var param = {
					"messageLine1":"",
	            	"messageLine2":"",
	            	"choice1":"myMenu1",
	            	"choice2":"myMenu2",
	            	"timeout":3000,
	            	"deviceIndex":1
				};
				Rho.MobilePayment.promptMenu(param, promptMenuCB);
			});
			waitsFor(function(){
				return promptMenuCBTriggered;
			},"wait for prompt callback", 7000);
			runs(function(){
				spec.displayResults();
				spec.waitForResponse();
			});
		});

		//Should not prompt for Menu when below given paramters are called with promptMenu() and send back proper status with the callback
		//Access : ```Rho.MobilePayment.promptMenu({"messageLine1":"","messageLine2":"","choice1":"","choice2":"","timeout":3000,"deviceIndex":1})
		//Callback : mandatory
		//Callback Parameters (Hash) : ```{"status":"error","choice":"","errorId":4,"description":"INVALID_VALUE"}```
		xit("Should not prompt menu when no parameters are sent with the \"promptMenu()\" method", function(){
			var spec = new ManualSpec(jasmine, window.document);
			spec.addGoal("Should not prompt Menu list when promptMenu called with null parameters.");
			spec.addPrecondition("Payment device is paired with bluetooth to the device.");
			spec.addStep("Press 'RunTest' button");
			spec.addExpectation("Observe that Menu list is not prompted.");
			spec.addExpectation("Semi auto test case to check callback is triggered with parameters 'status':'error','errorId':4,'description':'INVALID_VALUE'}");
			var openCBTriggered = false;
			var promptMenuCBTriggered = false;
			var promptMenuHandler = {
				promptMenuCB:function(data){
					console.log("promptPinCB : triggered");
					promptMenuCBTriggered = true;
				}
			};
			runs(function(){
				var openCB = function(){
					console.log("openCB : triggered");
					openCBTriggered = true;
				};
				Rho.MobilePayment.open(openCB);
			});
			waitsFor(function(){
				return openCBTriggered;
			},"wait for open callback trigger",3000);
			runs(function(){
				var param = {
					"messageLine1":"",
	            	"messageLine2":"",
	            	"choice1":"",
	            	"choice2":"",
	            	"timeout":3000,
	            	"deviceIndex":1
				};
				spyOn(promptMenuHandler, 'promptMenuCB');
				Rho.MobilePayment.promptMenu(param, promptMenuHandler.promptMenuCB);
			});
			waitsFor(function(){
				return promptMenuCBTriggered;
			},"wait for prompt callback", 7000);
			runs(function(){
				expect(promptMenuHandler.promptMenuCB).toHaveBeenCalledwith({"status":"error","errorId":4,"description":"INVALID_VALUE"});
			});
		});

		//Should send back proper status with the callback when no menu is selected and enter key is pressed
		//Access : ```Rho.MobilePayment.promptMenu({"messageLine1":"Message1","messageLine2":"Message2","choice1":"myMenu1","choice2":"myMenu2","timeout":3000,"deviceIndex":1})
		//Callback : mandatory
		//Callback Parameters (Hash) : ```{"status":"error","choice":"","errorId":18,"description":"ENTER_KEY_PRESSED"}```
		xit("Should send proper error status with the callback when enter key is pressed instead of selecting any menu item.", function(){
			var spec = new ManualSpec(jasmine, window.document);
			spec.addGoal("Should send errorId:18 description:ENER_KEY_PRESSED with the callback by pressing entery key with the device in promptMenu.");
			spec.addPrecondition("Payment device is paired with bluetooth to the device.");
			spec.addStep("Press 'RunTest' button");
			spec.addExpectation("Press Enter key instead of selecting any menu item from the list.");
			spec.addExpectation("Semi auto test case to check callback is triggered with parameters 'status':'error','errorId':18,'description':'ENTER_KEY_PRESSED'}");
			var openCBTriggered = false;
			var promptMenuCBTriggered = false;
			var promptMenuHandler = {
				promptMenuCB:function(data){
					console.log("promptPinCB : triggered");
					promptMenuCBTriggered = true;
				}
			};
			runs(function(){
				var openCB = function(){
					console.log("openCB : triggered");
					openCBTriggered = true;
				};
				Rho.MobilePayment.open(openCB);
			});
			waitsFor(function(){
				return openCBTriggered;
			},"wait for open callback trigger",3000);
			runs(function(){
				var param = {
					"messageLine1":"Dont select Menu",
	            	"messageLine2":"Press Enter key",
	            	"choice1":"myMenu1",
	            	"choice2":"myMenu2",
	            	"timeout":3000,
	            	"deviceIndex":1
				};
				spyOn(promptMenuHandler, 'promptMenuCB');
				Rho.MobilePayment.promptMenu(param, promptMenuHandler.promptMenuCB);
			});
			waitsFor(function(){
				return promptMenuCBTriggered;
			},"wait for prompt callback", 7000);
			runs(function(){
				expect(promptMenuHandler.promptMenuCB).toHaveBeenCalledwith({"status":"error","errorId":18,"description":"ENTER_KEY_PRESSED"});
			});
		});

		//Should send back proper status with the callback when no menu is selected and cancel key is pressed
		//Access : ```Rho.MobilePayment.promptMenu({"messageLine1":"Message1","messageLine2":"Message2","choice1":"myMenu1","choice2":"myMenu2","timeout":3000,"deviceIndex":1})
		//Callback : mandatory
		//Callback Parameters (Hash) : ```{"status":"error","choice":"","errorId":19,"description":"CANCEL_KEY_PRESSED"}```
		xit("Should send proper error status with the callback when cancel key is pressed instead of selecting any menu item.", function(){
			var spec = new ManualSpec(jasmine, window.document);
			spec.addGoal("Should send errorId:18 description:CANCEL_KEY_PRESSED with the callback by pressing entery key with the device in promptMenu.");
			spec.addPrecondition("Payment device is paired with bluetooth to the device.");
			spec.addStep("Press 'RunTest' button");
			spec.addExpectation("Press Cancel key instead of selecting any menu item from the list.");
			spec.addExpectation("Semi auto test case to check callback is triggered with parameters 'status':'error','errorId':19,'description':'CANCEL_KEY_PRESSED'}");
			var openCBTriggered = false;
			var promptMenuCBTriggered = false;
			var promptMenuHandler = {
				promptMenuCB:function(data){
					console.log("promptPinCB : triggered");
					promptMenuCBTriggered = true;
				}
			};
			runs(function(){
				var openCB = function(){
					console.log("openCB : triggered");
					openCBTriggered = true;
				};
				Rho.MobilePayment.open(openCB);
			});
			waitsFor(function(){
				return openCBTriggered;
			},"wait for open callback trigger",3000);
			runs(function(){
				var param = {
					"messageLine1":"Dont select Menu",
	            	"messageLine2":"Press Cancel key",
	            	"choice1":"myMenu1",
	            	"choice2":"myMenu2",
	            	"timeout":3000,
	            	"deviceIndex":1
				};
				spyOn(promptMenuHandler, 'promptMenuCB');
				Rho.MobilePayment.promptMenu(param, promptMenuHandler.promptMenuCB);
			});
			waitsFor(function(){
				return promptMenuCBTriggered;
			},"wait for prompt callback", 7000);
			runs(function(){
				expect(promptMenuHandler.promptMenuCB).toHaveBeenCalledwith({"status":"error","errorId":19,"description":"CANCEL_KEY_PRESSED"});
			});
		});

		//Should throw proper exception when no callback is passed withe the promptMenu() method.
		//Access : ```Rho.MobilePayment.promptMenu({},null);
		xit("Should throw proper exception when no callback is passed with the \"promptMenu()\" method.", function(){
			var spec = new ManualSpec(jasmine, window.document);
			spec.addGoal("Should throw proper exception when no callback is passed with the promptMenu() method.");
			spec.addPrecondition("Payment device is paired with bluetooth to the device.");
			spec.addStep("Press 'RunTest' button");
			spec.addExpectation("This is semi auto test case");
			var openCBTriggered = false;
			var errorThrown;
			runs(function(){
				var openCB = function(){
					console.log("openCB : triggered");
					openCBTriggered = true;
				};
				Rho.MobilePayment.open(openCB);
			});
			waitsFor(function(){
				return openCBTriggered;
			},"wait for open callback trigger",3000);
			runs(function(){
				try{
					Rho.MobilePayment.promptMenu();
				}
				catch(err){
					errorThrown = err;
				}
			});
			waitsFor(function(){
        			return errThrown != undefined;
        		},"waitsFor timeout", 6000);
			runs(function(){
				expect(errThrown).toEqual(""); // proper exception message to be compared with.
			});
		});

		//Should send back proper status with the callback when device is not opened before executing the method promptMenu()
		//Access : ```Rho.MobilePayment.promptMenu({"messageLine1":"Message1","messageLine2":"Message2","choice1":"myMenu1","choice2":"myMenu2","timeout":3000,"deviceIndex":1})
		//Callback : mandatory
		//Callback Parameters (Hash) : ```{"status":"error","choice":"","errorId":8,"description":"DEVICE_NOT_OPENED"}```
		xit("Should send proper error status with the callback when \"promptMenu()\" method called before opening the device.", function(){
			var spec = new ManualSpec(jasmine, window.document);
			spec.addGoal("Should send errorId:18 description:ENER_KEY_PRESSED with the callback by pressing entery key with the device in promptMenu.");
			pspec.addPrecondition("Ensure Payment device is not paired with bluetooth to the device.");
			spec.addStep("Press 'RunTest' button");
			spec.addExpectation("Press Cancel key instead of selecting any menu item from the list.");
			spec.addExpectation("Semi auto test case to check callback is triggered with parameters 'status':'error','choice':','errorId':8,'description':'DEVICE_NOT_OPENED'}");
			var closeCBTriggered = false;
			var promptMenuCBTriggered = false;
			var promptMenuHandler = {
				promptMenuCB:function(data){
					console.log("promptPinCB : triggered");
					promptMenuCBTriggered = true;
				}
			};
			runs(function(){
				var closeCB = function(){
					console.log("closeCB : triggered");
					closeCBTriggered = true;
				};
				Rho.MobilePayment.close(closeCB);
			});
			waitsFor(function(){
				return closeCBTriggered;
			},"wait for close callback trigger",3000);
			runs(function(){
				var param = {
					"messageLine1":"Dont select Menu",
	            	"messageLine2":"Press Cancel key",
	            	"choice1":"myMenu1",
	            	"choice2":"myMenu2",
	            	"timeout":3000,
	            	"deviceIndex":1
				};
				spyOn(promptMenuHandler, 'promptMenuCB');
				Rho.MobilePayment.promptMenu(param, promptMenuHandler.promptMenuCB);
			});
			waitsFor(function(){
				return promptMenuCBTriggered;
			},"wait for prompt callback", 7000);
			runs(function(){
				expect(promptMenuHandler.promptMenuCB).toHaveBeenCalledwith({"status":"error","errorId":8,"description":"DEVICE_NOT_OPENED"});
			});
		});

		//Should support method promptAdditionalInfo()
		//Should display the additionalInformation message with the payment device.
		//Access : ```Rho.MobilePayment.promptAdditionalInfo({})```
		//Parameters : Hash : {"amount":10.00,"langCode":0,"promptForTip":true,"cashBack":false,"surcharge":10.00,"timeout":3000}
		//Callback : Hash : {"status":true,"errorId":"","description":"","tip":10.00,"cashBack":0,"surchargeIndicator":""}
		xit("Should support \"promptAdditionalInfo()\" method with the paymentDevice object, to prompt/show for amount and tip information", function(){
			var spec = new ManualSpec(jasmine, window.document);
			spec.addGoal("Should prompt additional information to confirm the amount passed by the application and request for the tip amount");
			spec.addPrecondition("Payment device is paired with bluetooth to the device.");
			spec.addStep("Press 'RunTest' button");
			spec.addStep("Prompt to enter tip amount is shown in the device");
			spec.addStep("Enter value '10.00' in the above prompt");
			spec.addExpectation("Observe that additional information with amount and tip amount is displayed with the payment device and callback is triggered with paramter {'status':true,'errorId':'','description':'','tip':10.00,'cashBack':0,'surchargeIndicator':''}");
			var openCBTriggered = false;
			var promptAddInfoCBTriggered = false;
			var promptAddInfoHandler = {
				promptAddInfoCB:function(data){
					console.log("promptAddInfoCB : triggered");
					spec.addResult("Status : ", data.status);
					spec.addResult("ErrorId : ", data.errorId);
					spec.addResult("Description : ", data.description);
					spec.addResult("Tip you entered : ", data.tip);
					spec.addResult("CashBack : ", data.cashBack);
					spec.addResult("SurchargeIndicator : ", data.surchargeIndicator);
				}
			};
			runs(function(){
				var openCB = function(){
					console.log("closeCB : triggered");
					openCBTriggered = true;
				};
				Rho.MobilePayment.open(openCB);
			});
			waitsFor(function(){
				return openCBTriggered;
			},"wait for open callback trigger",3000);
			runs(function(){
				var param = {
					"amount":10.00,
	            	"langCode":0,
	            	"promptForTip":true,
	            	"cashBack":false,
	            	"surcharge":10.00,
	            	"timeout":3000
				};
				Rho.MobilePayment.promptAdditionalInfo(param, promptAddInfoHandler.promptAddInfoCB);
			});
			waitsFor(function(){
				return promptAddInfoCBTriggered;
			},"wait for prompt callback", 7000);
			runs(function(){
				spec.displayResults();
				spec.waitForResponse();
			});
		});

		//Should display the additionalInformation message with the payment device.
		//Access : ```Rho.MobilePayment.promptAdditionalInfo({})```
		//Parameters : Hash : {"amount":100.00,"langCode":0,"promptForTip":false,"cashBack":true,"surcharge":10.00,"timeout":3000}
		//Callback : Hash : {"status":true,"errorId":"","description":"","tip":0,"cashBack":20.00,"surchargeIndicator":""}
		xit("Should support \"promptAdditionalInfo()\" method with the paymentDevice object, to prompt/show for amount and cashback information", function(){
			var spec = new ManualSpec(jasmine, window.document);
			spec.addGoal("Should prompt additional information to confirm the amount passed by the application and request for the Cash back amount");
			spec.addPrecondition("Payment device is paired with bluetooth to the device.");
			spec.addStep("Press 'RunTest' button");
			spec.addStep("Prompt to select cash back is shown in the payment device");
			spec.addStep("Select 20%.");
			spec.addExpectation("Observe that additional information with amount and cashback amount is displayed with the payment device and callback is triggered with paramter {'status':true,'errorId':'','description':'','tip':0,'cashBack':20.0,'surchargeIndicator':''}");
			var openCBTriggered = false;
			var promptAddInfoCBTriggered = false;
			var promptAddInfoHandler = {
				promptAddInfoCB:function(data){
					console.log("promptAddInfoCB : triggered");
					spec.addResult("Status : ", data.status);
					spec.addResult("ErrorId : ", data.errorId);
					spec.addResult("Description : ", data.description);
					spec.addResult("Tip : ", data.tip);
					spec.addResult("CashBack should be 20.00 : ", data.cashBack);
					spec.addResult("SurchargeIndicator : ", data.surchargeIndicator);
				}
			};
			runs(function(){
				var openCB = function(){
					console.log("closeCB : triggered");
					openCBTriggered = true;
				};
				Rho.MobilePayment.open(openCB);
			});
			waitsFor(function(){
				return openCBTriggered;
			},"wait for open callback trigger",3000);
			runs(function(){
				var param = {
					"amount":10.00,
	            	"langCode":0,
	            	"promptForTip":false,
	            	"cashBack":true,
	            	"surcharge":10.00,
	            	"timeout":3000
				};
				Rho.MobilePayment.promptAdditionalInfo(param, promptAddInfoHandler.promptAddInfoCB);
			});
			waitsFor(function(){
				return promptAddInfoCBTriggered;
			},"wait for prompt callback", 7000);
			runs(function(){
				spec.displayResults();
				spec.waitForResponse();
			});
		});

		//Should display the additionalInformation message with the payment device.
		//Access : ```Rho.MobilePayment.promptAdditionalInfo({})```
		//Parameters : Hash : {"amount":100.00,"langCode":0,"promptForTip":false,"cashBack":false,"surcharge":0,"timeout":3000}
		//Callback : Hash : {"status":false,"errorId":8,"description":"DEVICE_NOT_OPENED"}
		xit("Should not prompt in the payment device and should trigger callback with proper error status, when payment device is not paired with device", function(){
			var spec = new ManualSpec(jasmine, window.document);
			spec.addGoal("Should prompt additional information to confirm the amount passed by the application.");
			spec.addPrecondition("Payment device is not paired with bluetooth to the device.");
			spec.addStep("Press 'RunTest' button");
			spec.addExpectation("Check that no prompt is shown with the payment device and callback is triggered with the param {'status':false,'errorId':'8','description':'DEVICE_NOT_OPENED','tip':0,'cashBack':0,'surchargeIndicator':''}");
			var closeCBTriggered = false;
			var promptAddInfoCBTriggered = false;
			var promptAddInfoHandler = {
				promptAddInfoCB:function(data){
					console.log("promptAddInfoCB : triggered");
					spec.addResult("Status : ", data.status);
					spec.addResult("ErrorId : ", data.errorId);
					spec.addResult("Description : ", data.description);
					spec.addResult("Tip : ", data.tip);
					spec.addResult("CashBack should be 20.00 : ", data.cashBack);
					spec.addResult("SurchargeIndicator : ", data.surchargeIndicator);
				}
			};
			runs(function(){
				var closeCB = function(){
					console.log("closeCB : triggered");
					closeCBTriggered = true;
				};
				Rho.MobilePayment.close(closeCB);
			});
			waitsFor(function(){
				return closeCBTriggered;
			},"wait for close callback trigger",3000);
			runs(function(){
				var param = {
					"amount":10.00,
	            	"langCode":0,
	            	"promptForTip":false,
	            	"cashBack":true,
	            	"surcharge":10.00,
	            	"timeout":3000
				};
				spyOn(promptAddInfoHandler, "promptAddInfoCB");
				Rho.MobilePayment.promptAdditionalInfo(param, promptAddInfoHandler.promptAddInfoCB);
			});
			waitsFor(function(){
				return promptAddInfoCBTriggered;
			},"wait for prompt callback", 7000);
			runs(function(){
				expect(promptAddInfoHandler.promptAddInfoCB).toHaveBeenCalledwith({"status":false,"errorId":8,"description":"DEVICE_NOT_OPENED"});
			});
		});

		//Should send back proper status with the callback when no menu is selected and enter key is pressed
		//Access : ```Rho.MobilePayment.promptAdditionalInfo({"amount":10.00,"langCode":0,"promptForTip":false,"cashBack":true,"surcharge":10.00,"timeout":3000})
		//Callback : mandatory
		//Callback Parameters (Hash) : ```{"status":"error","errorId":18,"description":"ENTER_KEY_PRESSED"}```
		xit("Should send proper error status with the callback when enter key is pressed instead of selecting any menu item.", function(){
			var spec = new ManualSpec(jasmine, window.document);
			spec.addGoal("Should send errorId:18 description:ENER_KEY_PRESSED with the callback by pressing entery key with the device in promptAdditionalInfo.");
			spec.addPrecondition("Payment device is paired with bluetooth to the device.");
			spec.addStep("Press 'RunTest' button");
			spec.addExpectation("Press Enter key with the additional info prompt.");
			spec.addExpectation("Semi auto test case to check callback is triggered with parameters 'status':'error','errorId':18,'description':'ENTER_KEY_PRESSED'}");
			var openCBTriggered = false;
			var promptAddInfoCBTriggered = false;
			var promptAddInfoHandler = {
				promptAddInfoCB:function(data){
					console.log("promptAddInfoCB : triggered");
					promptAddInfoCBTriggered = true;
				}
			};
			runs(function(){
				var openCB = function(){
					console.log("openCB : triggered");
					openCBTriggered = true;
				};
				Rho.MobilePayment.open(openCB);
			});
			waitsFor(function(){
				return openCBTriggered;
			},"wait for open callback trigger",3000);
			runs(function(){
				var param = {
					"amount":10.00,
	            	"langCode":0,
	            	"promptForTip":false,
	            	"cashBack":false,
	            	"surcharge":10.00,
	            	"timeout":3000
				};
				spyOn(promptAddInfoHandler, 'promptAddInfoCB');
				Rho.MobilePayment.promptAdditionalInfo(param, promptAddInfoHandler.promptAddInfoCB);
			});
			waitsFor(function(){
				return promptAddInfoCBTriggered;
			},"wait for prompt callback", 7000);
			runs(function(){
				expect(promptAddInfoHandler.promptAddInfoCB).toHaveBeenCalledwith({"status":"error","errorId":18,"description":"ENTER_KEY_PRESSED"});
			});
		});

		//Should send back proper status with the callback when no menu is selected and cancel key is pressed
		//Access : ```Rho.MobilePayment.promptAdditionalInfo({"amount":10.00,"langCode":0,"promptForTip":false,"cashBack":false,"surcharge":10.00,"timeout":3000})
		//Callback : mandatory
		//Callback Parameters (Hash) : ```{"status":"error","errorId":19,"description":"CANCEL_KEY_PRESSED"}```
		xit("Should send proper error status with the callback when cancel key is pressed with additional info prompt.", function(){
			var spec = new ManualSpec(jasmine, window.document);
			spec.addGoal("Should send errorId:18 description:CANCEL_KEY_PRESSED with the callback by pressing entery key with the device.");
			spec.addPrecondition("Payment device is paired with bluetooth to the device.");
			spec.addStep("Press 'RunTest' button");
			spec.addExpectation("Press Cancel key with the additional info prompt.");
			spec.addExpectation("Semi auto test case to check callback is triggered with parameters 'status':'error','errorId':19,'description':'CANCEL_KEY_PRESSED'}");
			var openCBTriggered = false;
			var promptAddInfoCBTriggered = false;
			var promptAddInfoHandler = {
				promptAddInfoCB:function(data){
					console.log("promptAddInfoCB : triggered");
					promptAddInfoCBTriggered = true;
				}
			};
			runs(function(){
				var openCB = function(){
					console.log("openCB : triggered");
					openCBTriggered = true;
				};
				Rho.MobilePayment.open(openCB);
			});
			waitsFor(function(){
				return openCBTriggered;
			},"wait for open callback trigger",3000);
			runs(function(){
				var param = {
					"amount":10.00,
	            	"langCode":0,
	            	"promptForTip":false,
	            	"cashBack":false,
	            	"surcharge":10.00,
	            	"timeout":3000
				};
				spyOn(promptAddInfoHandler, 'promptAddInfoCB');
				Rho.MobilePayment.promptAdditionalInfo(param, promptAddInfoHandler.promptAddInfoCB);
			});
			waitsFor(function(){
				return promptAddInfoCBTriggered;
			},"wait for prompt callback", 7000);
			runs(function(){
				expect(promptAddInfoHandler.promptAddInfoCB).toHaveBeenCalledwith({"status":"error","errorId":19,"description":"CANCEL_KEY_PRESSED"});
			});
		});

		//Should support method promptMessage()
		//Access : ```Rho.MobilePayment.promptMessage()```
		//Param : Hash ({"messageLine1":"","messageLine2":"","messageLine3":"","messageLine4":"","getUserConfirmation":false,"timeout":3000,"deviceIndex":1})
		//Callback : mandatory
		//Callback param : Hash ({"status":"true", "errorId":, "description":""})
		xit("Should support \"prompmtMessage()\" method with the paymentDevice object, to prompt message with the payment device.", function(){
			var spec = new ManualSpec(jasmine, window.document);
			spec.addGoal("Should prompt message with the paymentDevice.");
			spec.addPrecondition("Payment device is paired with bluetooth to the device.");
			spec.addPrecondition("Ensure payment device is opened");
			spec.addStep("Press 'RunTest' button.");
			spec.addExpectation("Check that promptMessage is shown with the payment device. and callback is triggered with the param {'status':true,'errorId':'','description':'','userConfirmationMessage':''}");
			var openCBTriggered = false;
			var promptMessageCBTriggered = false;
			var promptMessageHandler = {
				promptMessageCB : function(data){
					console.log("promptMessageCB : triggered");
					spec.addResult("Status : ", data.status);
					spec.addResult("Error Id : ", data.errorId);
					spec.addResult("Description : ", data.description);
					promptMessageCBTriggered = true;
				}
			};
			runs(function(){
				var openCB = function(){
					console.log("openCB : triggered");
					openCBTriggered = true;
				};
				Rho.MobilePayment.open(openCB);
			});
			waitsFor(function(){
				return openCBTriggered;
			},"wait for payment device to open", 3000);
			runs(function(){
				var param = {
					"messageLine1":"First Line",
	            	"messageLine2":"Second Line",
	            	"messageLine3":"Third Line",
	            	"messageLine4":"Fourth Line",
	            	"getUserConfirmation":false,
	            	"timeout":3000,
	            	"deviceIndex":1
				};
				Rho.MobilePayment.promptMessage(param, promptMessageHandler.promptMessageCB);
			});
			waitsFor(function(){
				return promptMessageCBTriggered;
			},"wait for promptMessage Callback", 3000);
			runs(function(){
				spec.displayResults();
				spec.waitForResponse();
			});
		});

		//Should support method promptMessage() with confirmation Ok
		//Access : ```Rho.MobilePayment.promptMessage()```
		//Param : Hash ({"messageLine1":"","messageLine2":"","messageLine3":"","messageLine4":"","getUserConfirmation":true,"timeout":3000,"deviceIndex":1})
		//Callback : mandatory
		//Callback param : Hash ({"status":"true", "errorId":, "description":"","userConfirmationMessage":"OK"})
		xit("Should support \"prompmtMessage()\" along with user confirmation with the paymentDevice object, to prompt message with the payment device.", function(){
			var spec = new ManualSpec(jasmine, window.document);
			spec.addGoal("Should prompt message with user confirmation with the paymentDevice.");
			spec.addPrecondition("Payment device is paired with bluetooth to the device.");
			spec.addPrecondition("Ensure payment device is opened");
			spec.addStep("Press 'RunTest' button.");
			spec.addStep("Select positive selection from the confirmation.");
			spec.addExpectation("Check that promptMessage is shown with user confirmation with the payment device. and callback is triggered with the param {'status':true,'errorId':'','description':'','userConfirmationMessage':'Ok'}");
			var openCBTriggered = false;
			var promptMessageCBTriggered = false;
			var promptMessageHandler = {
				promptMessageCB : function(data){
					console.log("promptMessageCB : triggered");
					spec.addResult("Status : ", data.status);
					spec.addResult("Error Id : ", data.errorId);
					spec.addResult("Description : ", data.description);
					spec.addResult("Confirmation selected : ", data.userConfirmationMessage);
					promptMessageCBTriggered = true;
				}
			};
			runs(function(){
				var openCB = function(){
					console.log("openCB : triggered");
					openCBTriggered = true;
				};
				Rho.MobilePayment.open(openCB);
			});
			waitsFor(function(){
				return openCBTriggered;
			},"wait for payment device to open", 3000);
			runs(function(){
				var param = {
					"messageLine1":"First Line",
	            	"messageLine2":"Second Line",
	            	"messageLine3":"Third Line",
	            	"messageLine4":"Fourth Line",
	            	"getUserConfirmation":true,
	            	"timeout":3000,
	            	"deviceIndex":1
				};
				Rho.MobilePayment.promptMessage(param, promptMessageHandler.promptMessageCB);
			});
			waitsFor(function(){
				return promptMessageCBTriggered;
			},"wait for promptMessage Callback", 3000);
			runs(function(){
				spec.displayResults();
				spec.waitForResponse();
			});
		});

		//Should support method promptMessage() with confirmation Cancel
		//Access : ```Rho.MobilePayment.promptMessage()```
		//Param : Hash ({"messageLine1":"","messageLine2":"","messageLine3":"","messageLine4":"","getUserConfirmation":true,"timeout":3000,"deviceIndex":1})
		//Callback : mandatory
		//Callback param : Hash ({"status":"true", "errorId":, "description":"","userConfirmationMessage":"CANCEL"})
		xit("Should support \"prompmtMessage()\" along with user confirmation with the paymentDevice object, to prompt message with the payment device.", function(){
			var spec = new ManualSpec(jasmine, window.document);
			spec.addGoal("Should prompt message with user confirmation with the paymentDevice.");
			spec.addPrecondition("Payment device is paired with bluetooth to the device.");
			spec.addPrecondition("Ensure payment device is opened");
			spec.addStep("Press 'RunTest' button.");
			spec.addStep("Select negative selection from the confirmation.");
			spec.addExpectation("Check that promptMessage is shown with user confirmation with the payment device. and callback is triggered with the param {'status':true,'errorId':'','description':'','userConfirmationMessage':'Cancel'}");
			var openCBTriggered = false;
			var promptMessageCBTriggered = false;
			var promptMessageHandler = {
				promptMessageCB : function(data){
					console.log("promptMessageCB : triggered");
					spec.addResult("Status : ", data.status);
					spec.addResult("Error Id : ", data.errorId);
					spec.addResult("Description : ", data.description);
					spec.addResult("Confirmation selected : ", data.userConfirmationMessage);
					promptMessageCBTriggered = true;
				}
			};
			runs(function(){
				var openCB = function(){
					console.log("openCB : triggered");
					openCBTriggered = true;
				};
				Rho.MobilePayment.open(openCB);
			});
			waitsFor(function(){
				return openCBTriggered;
			},"wait for payment device to open", 3000);
			runs(function(){
				var param = {
					"messageLine1":"First Line",
	            	"messageLine2":"Second Line",
	            	"messageLine3":"Third Line",
	            	"messageLine4":"Fourth Line",
	            	"getUserConfirmation":true,
	            	"timeout":3000,
	            	"deviceIndex":1
				};
				Rho.MobilePayment.promptMessage(param, promptMessageHandler.promptMessageCB);
			});
			waitsFor(function(){
				return promptMessageCBTriggered;
			},"wait for promptMessage Callback", 3000);
			runs(function(){
				spec.displayResults();
				spec.waitForResponse();
			});
		});

		//Should send proper error status with the callback when timedout without any user interaction with promptMessage()
		//Access : ```Rho.MobilePayment.promptMessage()```
		//Param : Hash ({"messageLine1":"","messageLine2":"","messageLine3":"","messageLine4":"","getUserConfirmation":true,"timeout":3000,"deviceIndex":1})
		//Callback : mandatory
		xit("Should send proper error status with the callback when timedout without any user interaction with promptMessage", function(){
			var spec = new ManualSpec(jasmine, window.document);
			spec.addGoal("Should send proper error status with the callback when timedout without any user interaction with promptMessage");
			spec.addPrecondition("Payment device is paired with bluetooth to the device.");
			spec.addPrecondition("Ensure payment device is opened.");
			spec.addStep("Press 'RunTest' button.");
			spec.addExpectation("Semi auto test to check callback is triggered with status:error, errorId:9, description:TIMED_OUT");
			var openCBTriggered = false;
			var promptMessageCBTriggered = false;
			var promptMessageHandler = {
				promptMessageCB : function(data){
					console.log("promptMessageCB : triggered");
					promptMessageCBTriggered = true;
				}
			};
			runs(function(){
				var openCB = function(){
					console.log("openCB : triggered");
					openCBTriggered = true;
				};
				Rho.MobilePayment.open(openCB);
			});
			waitsFor(function(){
				return openCBTriggered;
			},"wait for payment device to open", 3000);
			runs(function(){
				var param = {
					"messageLine1":"First Line",
	            	"messageLine2":"Second Line",
	            	"messageLine3":"Third Line",
	            	"messageLine4":"Fourth Line",
	            	"getUserConfirmation":true,
	            	"timeout":3000,
	            	"deviceIndex":1
				};
				spyOn(promptMessageHandler,'promptMessageCB');
				Rho.MobilePayment.promptMessage(param, promptMessageHandler.promptMessageCB);
			});
			waitsFor(function(){
				return promptMessageCBTriggered;
			},"wait for promptMessage Callback", 3000);
			runs(function(){
				expect(promptMessageHandler.promptMessageCB).toHaveBeenCalledwith({"status":"false","errorId":9,"description":"TIMED_OUT"});
			});
		});

		//Should send proper error status with the callback when Enter key is pressed with the payment device when message is prompted.
		//Access : ```Rho.MobilePayment.promptMessage()```
		//Param : Hash ({"messageLine1":"First Line","messageLine2":"Second Line","messageLine3":"Third Line","messageLine4":"Fourth Line","getUserConfirmation":true,"timeout":3000,"deviceIndex":1})
		//Callback : mandatory
		xit("Should send proper error status with the callback when timedout without any user interaction with promptMessage", function(){
			var spec = new ManualSpec(jasmine, window.document);
			spec.addGoal("Should send proper error status with the callback when timedout without any user interaction with promptMessage");
			spec.addPrecondition("Payment device is paired with bluetooth to the device.");
			spec.addPrecondition("Ensure payment device is opened.");
			spec.addStep("Press 'RunTest' button.");
			spec.addStep("Press Enter key from the device when prompt message is shown to the user with the device.");
			spec.addExpectation("Semi auto test to check callback is triggered with status:error, errorId:18, description:ENTER_KEY_PRESSED");
			var openCBTriggered = false;
			var promptMessageCBTriggered = false;
			var promptMessageHandler = {
				promptMessageCB : function(data){
					console.log("promptMessageCB : triggered");
					promptMessageCBTriggered = true;
				}
			};
			runs(function(){
				var openCB = function(){
					console.log("openCB : triggered");
					openCBTriggered = true;
				};
				Rho.MobilePayment.open(openCB);
			});
			waitsFor(function(){
				return openCBTriggered;
			},"wait for payment device to open", 3000);
			runs(function(){
				var param = {
					"messageLine1":"First Line",
	            	"messageLine2":"Second Line",
	            	"messageLine3":"Third Line",
	            	"messageLine4":"Fourth Line",
	            	"getUserConfirmation":true,
	            	"timeout":3000,
	            	"deviceIndex":1
				};
				spyOn(promptMessageHandler,'promptMessageCB');
				Rho.MobilePayment.promptMessage(param, promptMessageHandler.promptMessageCB);
			});
			waitsFor(function(){
				return promptMessageCBTriggered;
			},"wait for promptMessage Callback", 3000);
			runs(function(){
				expect(promptMessageHandler.promptMessageCB).toHaveBeenCalledwith({"status":"false","errorId":18,"description":"ENTER_KEY_PRESSED"});
			});
		});

		//Should send proper error status with the callback when Cancel key is pressed with the payment device when message is prompted.
		//Access : ```Rho.MobilePayment.promptMessage()```
		//Param : Hash ({"messageLine1":"First Line","messageLine2":"Second Line","messageLine3":"Third Line","messageLine4":"Fourth Line","getUserConfirmation":true,"timeout":3000,"deviceIndex":1})
		//Callback : mandatory
		xit("Should send proper error status with the callback when timedout without any user interaction with promptMessage", function(){
			var spec = new ManualSpec(jasmine, window.document);
			spec.addGoal("Should send proper error status with the callback when timedout without any user interaction with promptMessage");
			spec.addPrecondition("Payment device is paired with bluetooth to the device.");
			spec.addPrecondition("Ensure payment device is opened.");
			spec.addStep("Press 'RunTest' button.");
			spec.addStep("Press Cancel key from the device when prompt message is shown to the user with the device.");
			spec.addExpectation("Semi auto test to check callback is triggered with status:error, errorId:19, description:CANCEL_KEY_PRESSED");
			var openCBTriggered = false;
			var promptMessageCBTriggered = false;
			var promptMessageHandler = {
				promptMessageCB : function(data){
					console.log("promptMessageCB : triggered");
					promptMessageCBTriggered = true;
				}
			};
			runs(function(){
				var openCB = function(){
					console.log("openCB : triggered");
					openCBTriggered = true;
				};
				Rho.MobilePayment.open(openCB);
			});
			waitsFor(function(){
				return openCBTriggered;
			},"wait for payment device to open", 3000);
			runs(function(){
				var param = {
					"messageLine1":"First Line",
	            	"messageLine2":"Second Line",
	            	"messageLine3":"Third Line",
	            	"messageLine4":"Fourth Line",
	            	"getUserConfirmation":true,
	            	"timeout":3000,
	            	"deviceIndex":1
				};
				spyOn(promptMessageHandler,'promptMessageCB');
				Rho.MobilePayment.promptMessage(param, promptMessageHandler.promptMessageCB);
			});
			waitsFor(function(){
				return promptMessageCBTriggered;
			},"wait for promptMessage Callback", 3000);
			runs(function(){
				expect(promptMessageHandler.promptMessageCB).toHaveBeenCalledwith({"status":"false","errorId":19,"description":"CANCEL_KEY_PRESSED"});
			});
		});

		//Should support method abort() to cancel the previously issued method to paymentDevice
		xit("Should support \"abort()\" method with the paymentDevice object, to stop the previously given command to payment device.", function(){
			var spec = new ManualSpec(jasmine, window.document);
			spec.addGoal("Should abort the previously given promptPin method");
			spec.addPrecondition("Payment device is paired with bluetooth to the device.");
			spec.addStep("Press 'RunTest' button.");
			spec.addExpectation("Check that payment device did not prompt for Pin.");
			var openCBTriggered = false;
			var promptMessageCBTriggered = false;
			var wait;
			var promptMessageHandler = {
				promptMessageCB : function(data){
					console.log("promptMessageCB : triggered");
					promptMessageCBTriggered = true;
				}
			};
			runs(function(){
				var openCB = function(){
					console.log("openCB : triggered");
					openCBTriggered = true;
				};
				Rho.MobilePayment.open(openCB);
			});
			waitsFor(function(){
				return openCBTriggered;
			},"wait for payment device to open", 3000);
			runs(function(){
				var promptPinHandler = {
					promptPinCB : function(data){
						console.log("promptPinCB : triggered");
						promptPinCBTriggered = true;
					}
				};
				var abortCB = function(data){
					spec.addResult("Status : ", data.status);
					spec.addResult("ErrorId : ", data.errorId);
					spec.addResult("Description : ", data.description);
				};
				var param = {
						"accountNumber":"asd123458765",
						"expectedPINLength":4,
						"messageTitle":"Enter PIN",
						"message1":"only 4 digits",
						"readTimeOut":5000
					};
				spyOn(promptPinHandler, 'promptPinCB');
				Rho.MobilePayment.promptPin(param, promptPinHandler.promptPinCB);
				Rho.MobilePayment.abort(abortCB);
			});
			waitsFor(function(){
            	 setTimeout(function(){ wait=true;}, 5000);
            	 return wait == true;
            },"waitsFor timeout",7000);
            runs(function(){
            	expect(promptPinHandler.promptPinCB).not.toHaveBeenCalled();
            });
		});

		//Should support method getBatteryLevel() will return batterypercentage.
		xit("Should support \"getBatteryLevel()\" method with the paymentDevice object, to get the battery level of the payment device.", function(){
			var spec = new ManualSpec(jasmine, window.document);
			spec.addGoal("Should get the battery level of the payment device.");
			spec.addPrecondition("Payment device is paired with bluetooth to the device.");
			spec.addStep("Press 'RunTest' button.");
			spec.addExpectation("Check that battery level of the payment device is retrieved successfully.");
			var openCBTriggered = false;
			runs(function(){
				var openCB = function(){
					console.log("openCB : triggered");
					openCBTriggered = true;
				};
				Rho.MobilePayment.open(openCB);
			});
			waitsFor(function(){
				return openCBTriggered;
			},"wait for payment device to open", 3000);
			runs(function(){
				spec.addResult("Battery level of paymentDevice : ", Rho.MobilePayment.getBatteryLevel());
				spec.displayResults();
				spec.waitForResponse();
			});
		});

		//Should support method getLowBatteryThreshold()
		xit("Should support \"getLowBatteryThreshold()\" method with the paymentDevice, to know the battery low level threshold of the payment device.", function(){
			var spec = new ManualSpec(jasmine, window.document);
			spec.addGoal("Should get the low battery threshold of the payment device.");
			spec.addPrecondition("Payment device is paired with bluetooth to the device.");
			spec.addStep("Press 'RunTest' button.");
			spec.addExpectation("Check that low battery threshold of the payment device is retrieved successfully.");
			runs(function(){
				//test implementation TBD : To Be Done.
			});
		});

		//Should support method setLowBatteryThreshold()
		xit("Should support \"setLowBatteryThreshold()\" method with the paymentDevice, to set the batter low level threshold of the payment device.", function(){
			var spec = new ManualSpec(jasmine, window.document);
			spec.addGoal("Should set the low battery threshold of the payment device.");
			spec.addPrecondition("Payment device is paired with bluetooth to the device.");
			spec.addStep("Press 'RunTest' button.");
			spec.addExpectation("Check that low battery threshold of the payment device is set successfully.");
			runs(function(){
				//test implementation TBD : To Be Done.
			});
		});

		//Should support method createMac()
		xit("Should support \"createMac()\" method with the paymentDevice object, ", function(){
			var spec = new ManualSpec(jasmine, window.document);
			spec.addGoal("");
			spec.addPrecondition("");
			spec.addStep("");
			spec.addExpectation("");
			runs(function(){
				//test implementation TBD : To Be Done.
			});
		});
		//Should support method validateMac()
		xit("Should support \"validateMac()\" method with the paymentDevice object", function(){
			var spec = new ManualSpec(jasmine, window.document);
			spec.addGoal("");
			spec.addPrecondition("");
			spec.addStep("");
			spec.addExpectation("");
			runs(function(){
				//test implementation TBD : To Be Done.
			});
		});

		//Should support method completeOnlineEmv()
		xit("Should support \"completeOnlineEmv()\" method with the paymentDevice object", function(){
			var spec = new ManualSpec(jasmine, window.document);
			spec.addGoal("");
			spec.addPrecondition("");
			spec.addStep("");
			spec.addExpectation("");
			runs(function(){
				//test implementation TBD : To Be Done.
			});
		});

		//Should support method getEmvTags()
		xit("Should support \"getEmvTags()\" method with the paymentDevice", function(){
			var spec = new ManualSpec(jasmine, window.document);
			spec.addGoal("");
			spec.addPrecondition("");
			spec.addStep("");
			spec.addExpectation("");
			runs(function(){
				//test implementation TBD : To Be Done.
			});
		});

		//Should support method setEmvTags()
		xit("Should support \"setEmvTags()\" method with the paymentDevice", function(){
			var spec = new ManualSpec(jasmine, window.document);
			spec.addGoal("");
			spec.addPrecondition("");
			spec.addStep("");
			spec.addExpectation("");
			runs(function(){
				//test implementation TBD : To Be Done.
			});
		});

		//Should support method authorizeCard()
		xit("Should support \"authorizeCard()\" method with the paymentDevice, to authorize the EMV transaction amount using the inserted chip.", function(){
			var spec = new ManualSpec(jasmine, window.document);
			spec.addGoal("");
			spec.addPrecondition("");
			spec.addStep("");
			spec.addExpectation("");
			runs(function(){
				//test implementation TBD : To Be Done.
			});
		});

		//Should support method doTransaction()
		xit("Should support \"doTransaction()\" method with the paymentDevice, to execute set of API commands in one call.", function(){
			var spec = new ManualSpec(jasmine, window.document);
			spec.addGoal("");
			spec.addPrecondition("");
			spec.addStep("");
			spec.addExpectation("");
			runs(function(){
				//test implementation TBD : To Be Done.
			});
		});
	}else{
		xit("Your Platform/Device does not support this feature", function(){

		});
	}
});