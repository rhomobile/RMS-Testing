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
			runs(function(){
				//test implementation TBD : To Be Done.
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
			runs(function(){
				//test implementation TBD : To Be Done.
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
			runs(function(){
				//test implementation TBD : To Be Done.
			});
		});

		//Should read data from MagStripe Card using method "readCardData()" with readMode-Swipe and transactionType-Default
		//Q:How to set Default?
		xit("Should read data from MagStripe card with readMode-Swipe and transactionType-Default", function(){
			var spec = new ManualSpec(jasmine, window.document);
        	spec.addGoal("Should read data from MagStripe card with readMode-Swipe and transactionType-Default.");
        	spec.addPrecondition("Payment device is paired via bluetooth to the device.");
            spec.addStep("Press 'RunTest' button");
            spec.addStep("Swipe a valid MagStripe.");
            spec.addExpectation('Data from the card read and displayed successfully using D180 payment Device.');
            spec.displayScenario();
            spec.waitForButtonPressing("Run test");
			runs(function(){
				//test implementation TBD : To Be Done.
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
			runs(function(){
				//test implementation TBD : To Be Done.
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
            runs(function(){
				//test implementation TBD : To Be Done.
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
			runs(function(){
				//test implementation TBD : To Be Done.
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
			runs(function(){
				//test implementation TBD : To Be Done.
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
			runs(function(){
				//test implementation TBD : To Be Done.
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
			runs(function(){
				//test implementation TBD : To Be Done.
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
			runs(function(){
				//test implementation TBD : To Be Done.
			});
		});

		//Should read data from EMVContactless Card using method "readCardData()" with readMode-Touch and transactionType-Default
		//Q: How to set the default value ? what is the default value ?
		xit("Should read data from EMVContactless tag card with readMode-Touch and transactionType-Default", function(){
			var spec = new ManualSpec(jasmine, window.document);
        	spec.addGoal("Should read data from EMVContactless card with readMode-Touch and transactionType-Credit.");
        	spec.addPrecondition("Payment device is paired via bluetooth to the device.");
            spec.addStep("Press 'RunTest' button");
            spec.addStep("Touch a valid EMVContactless card to the paymentDevice.");
            spec.addStep("Select Credit/Debit in the paymentDevice to readCardData.");
            spec.addExpectation('Data from the card read and displayed successfully using D180 payment Device.');
            spec.displayScenario();
            spec.waitForButtonPressing("Run test");
			runs(function(){
				//test implementation TBD : To Be Done.
			});
		});

		//Should not read data from MagStripe Card using method "readCardData()" with readMode-Insert and transactionType-UserChoice
		xit("Should not read data from MagStripe card with readMode-Insert and transactionType-UserChoice and callback triggered with errorId:15 and description:CARD_NOT_SUPPORTED", function(){
			var spec = new ManualSpec(jasmine, window.document);
			spec.addGoal("Should return errorId:15 and description:CARD_NOT_SUPPORTED with callback, when MagStrip card is inserted with SmartCard slot");
			spec.addPrecondition("Payment device is paired via bluetooth to the device.");
			spec.addStep("Press 'RunTest' button");
			spec.addStep("Insert a valid MagStripe card in to the smart card slot");
			spec.addExpectation("Observe that callback function triggered with errorId:15 and description:CARD_NOT_SUPPORTED");
			runs(function(){
				//test implementation TBD : To Be Done.
			});
		});

		//Should not read data from SmartCard using method "readCardData()" with readMode-Swipe and transactionType-UserChoice
		xit("Should not read data from SmartCard with readMode-Swipe and transactionType-UserChoice and callback triggered with errorId:15 and description:CARD_NOT_SUPPORTED", function(){
			var spec = new ManualSpec(jasmine, window.document);
			spec.addGoal("Should return errorId:15 and description:CARD_NOT_SUPPORTED with callback, when SmartCard got swiped with paymentDevice");
			spec.addPrecondition("Payment device is paired via bluetooth to the device.");
			spec.addStep("Press 'RunTest' button");
			spec.addStep("Swipe a valid SmartCard with paymentDevice");
			spec.addExpectation("Observe that callback function triggered with errorId:15 and description:CARD_NOT_SUPPORTED");
			runs(function(){
				//test implementation TBD : To Be Done.
			});
		});

		//Should not read data from EMVContactless using method "readCardData()" with readMode-Swipe and transactionType-UserChoice
		xit("Should not read data from EMVContactless tag card with readMode-Swipe and transactionType-UserChoice and callback triggered with errorId:15 and description:CARD_NOT_SUPPORTED", function(){
			var spec = new ManualSpec(jasmine, window.document);
			spec.addGoal("Should return errorId:15 and description:CARD_NOT_SUPPORTED with callback, when EMVContactless swiped with paymentDevice");
			spec.addPrecondition("Payment device is paired via bluetooth to the device.");
			spec.addStep("Press 'RunTest' button");
			spec.addStep("Swipe a valid EMVContactless with paymentDevice");
			spec.addExpectation("Observe that callback function triggered with errorId:15 and description:CARD_NOT_SUPPORTED");
			runs(function(){
				//test implementation TBD : To Be Done.
			});
		});

		//Should not read data from EMVContactless using method "readCardData()" with readMode-Insert and transactionType-UserChoice
		xit("Should not read data from EMVContactless tag card with readMode-Insert and transactionType-UserChoice and callback triggered with errorId:15 and description:CARD_NOT_SUPPORTED", function(){
			var spec = new ManualSpec(jasmine, window.document);
			spec.addGoal("Should return errorId:15 and description:CARD_NOT_SUPPORTED with callback, when EMVContactless inserted with paymentDevice");
			spec.addPrecondition("Payment device is paired via bluetooth to the device.");
			spec.addStep("Press 'RunTest' button");
			spec.addStep("Insert a valid EMVContactless with paymentDevice");
			spec.addExpectation("Observe that callback function triggered with errorId:15 and description:CARD_NOT_SUPPORTED");
			runs(function(){
				//test implementation TBD : To Be Done.
			});
		});

		//It should trigger callback with proper error while trying to read card data before open method.
		xit("Should trigger callback with errorId:8 and description:DEVICE_NOT_OPENED when trying to readCardData() before open() method.", function(){
			var spec = new ManualSpec(jasmine, window.document);
			spec.addGoal("Should return errorId:8 and description:DEVICE_NOT_OPENED with callback, when MagStripe card swiped with paymentDevice");
			spec.addPrecondition("Payment device is paired via bluetooth to the device.");
			spec.addStep("Press 'RunTest' button");
			spec.addStep("Swipe a valid MagStripe with paymentDevice");
			spec.addExpectation("Observe that callback function triggered with errorId:8 and description:DEVICE_NOT_OPENED");
			runs(function(){
				//test implementation TBD : To Be Done.
			});
		});

		//It should trigger callback with proper error while smart card removed or not inserted.
		xit("Should trigger callback with errorId:13 and description:CARD_REMOVED when smartCard is removed while reading", function(){
			var spec = new ManualSpec(jasmine, window.document);
			spec.addGoal("Should return errorId:8 and description:DEVICE_NOT_OPENED with callback, when MagStripe card swiped with paymentDevice");
			spec.addPrecondition("Payment device is paired via bluetooth to the device.");
			spec.addStep("Press 'RunTest' button");
			spec.addStep("Swipe a valid MagStripe with paymentDevice");
			spec.addExpectation("Observe that callback function triggered with errorId:8 and description:DEVICE_NOT_OPENED");
			runs(function(){
				//test implementation TBD : To Be Done.
			});
		});

		//It should trigger callback with proper error when no card is "Inserted"/Swiped/Touched while reading.
		xit("Should trigger callback with errorId:9 and description:TIMED_OUT when MagStripe card is not swiped at all while method readCardData() is called", function(){
			var spec = new ManualSpec(jasmine, window.document);
			spec.addGoal("Should return errorId:9 and description:TIMED_OUT with callback, when MagStripe card not swiped with paymentDevice");
			spec.addPrecondition("Payment device is paired via bluetooth to the device.");
			spec.addStep("Press 'RunTest' button");
			spec.addStep("Do not swipe any valid MagStripe card with paymentDevice");
			spec.addExpectation("Observe that callback function triggered with errorId:9 and description:TIMED_OUT");
			runs(function(){
				//test implementation TBD : To Be Done.
			});
		});

		//It should trigger callback with proper error when no card is Swiped/"Inserted"/Touched while reading.
		xit("Should trigger callback with errorId:9 and description:TIMED_OUT when SmartCard is not Inserted at all while method readCardData() is called", function(){
			var spec = new ManualSpec(jasmine, window.document);
			spec.addGoal("Should return errorId:9 and description:TIMED_OUT with callback, when SmartCard is not inserted with paymentDevice");
			spec.addPrecondition("Payment device is paired via bluetooth to the device.");
			spec.addStep("Press 'RunTest' button");
			spec.addStep("Do not Insert any valid SmartCard with paymentDevice");
			spec.addExpectation("Observe that callback function triggered with errorId:9 and description:TIMED_OUT");
			runs(function(){
				//test implementation TBD : To Be Done.
			});
		});

		//It should trigger callback with proper error when no card is Swiped/Inserted/"Touched" while reading.
		xit("Should trigger callback with errorId:9 and description:TIMED_OUT when EMVContactless is not touched at all while method readCardData() is called", function(){
			var spec = new ManualSpec(jasmine, window.document);
			spec.addGoal("Should return errorId:9 and description:TIMED_OUT with callback, when EMVContactless is not touched with paymentDevice");
			spec.addPrecondition("Payment device is paired via bluetooth to the device.");
			spec.addStep("Press 'RunTest' button");
			spec.addStep("Do not touch any valid EMVContactless with paymentDevice");
			spec.addExpectation("Observe that callback function triggered with errorId:9 and description:TIMED_OUT");
			runs(function(){
				//test implementation TBD : To Be Done.
			});
		});

		//It should trigger callback with proper error when no parameter is passed with the method readCardData()
		xit("Should trigger callback with errorId:4 and description:INVALID_VALUE when no parameter is passed with readCardData()", function(){
			var spec = new ManualSpec(jasmine, window.document);
			spec.addGoal("Should return errorId:4 and description:INVALID_VALUE with callback, when no parameter is passed with readCardData()");
			spec.addPrecondition("Payment device is paired via bluetooth to the device.");
			spec.addStep("Press 'RunTest' button");
			spec.addExpectation("Observe that callback function triggered with errorId:4 and description:INVALID_VALUE");
			runs(function(){
				//test implementation TBD : To Be Done.
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
			runs(function(){
				//test implementation TBD : To Be Done.
			});
		});

		//Should prompt for PIN number when below given parameters are called with promptPin() and send back proper error id with the callback
		// PIN number length less than expected ( <4 )
		//Access : ```Rho.MobilePayment.promptPin({"accountNumber":"09876543216", "expectedPINLength":"4", "messageTitle":"Enter PIN", "message1":"Enter you PIN", "readTimeOut":5000},callbackfunction);```  
		//Paramater : Callback function (mandatory)  
		//Callback Paramaters (Hash): ```{"status":"error",errorId":"4","description":"INVALID_VALUE"}```  
		xit("Should prompt for PIN number and send back proper errorId with the callback when below given parameters are called with method \"promptPin()\" {\"accountNumber\":\"09876543216\", \"expectedPINLength\":4, \"messageTitle\":\"Enter PIN\", \"message1\":\"Enter you PIN\", \"readTimeOut\":5000}", function(){
			var spec = new ManualSpec(jasmine, window.document);
			spec.addGoal("Should send errorId:4 and description:\"INVALID_VALUE\"");
			spec.addPrecondition("Payment device is paired with bluetooth to the device.");
			spec.addStep("Press 'RunTest' button");
			spec.addStep("Observe that PIN code request is prompted at the paymentDevice");
			spec.addStep("Enter PIN of length less than 4 characters and press 'Ok")
			spec.addExpectation("Check for the status:error, errorId:4 and description:INVALID_VALUE with the callback");
			runs(function(){
				//test implementation TBD : To Be Done.
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
			spec.addExpectation("Check for the errorId:9 and description:TIMED_OUT with the callback");
			runs(function(){
				//test implementation TBD : To Be Done.
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
			spec.addPrecondtion("Payment device is paired with bluetooth to the device.");
			spec.addStep("Press 'RunTest' button");
			spec.addStep("Observe that Menu list is prompted for user selection with 2 Mesage Line and 2 Menu items.");
			spec.addStep("Select myMenu2 menu from the list");
			spec.addExpectation("Observe that status:success, choice:myMenu2,errorId:'' and description:'' send with callback function.");
			runs(function(){
				//test implementation TBD : To Be Done.
			});
		});

		//Should prompt for Menu when below given paramters are called with promptMenu() and send back proper status with the callback
		//Access : ```Rho.MobilePayment.promptMenu({"messageLine1":"Message1","messageLine2":"","choice1":"myMenu1","choice2":"myMenu2","timeout":3000,"deviceIndex":1})
		//Callback : mandatory
		//Callback Parameters (Hash) : ```{"status":"success","choice":"myMenu2","errorId":"","description":""}```
		xit("Should support \"promptMenu()\" method with the paymentDevice object, to prompt menu items", function(){
			var spec = new ManualSpec(jasmine, window.document);
			spec.addGoal("Should prompt Menu list with the payment device.");
			spec.addPrecondtion("Payment device is paired with bluetooth to the device.");
			spec.addStep("Press 'RunTest' button");
			spec.addStep("Observe that Menu list is prompted for user selection with 1 Mesage Line.");
			spec.addStep("Select myMenu2 menu from the list");
			spec.addExpectation("Observe that status:success, choice:myMenu2,errorId:'' and description:'' send with callback function.");
			runs(function(){
				//test implementation TBD : To Be Done.
			});
		});

		//Should prompt for Menu when below given paramters are called with promptMenu() and send back proper status with the callback
		//Access : ```Rho.MobilePayment.promptMenu({"messageLine1":"Message1","messageLine2":"","choice1":"myMenu1","choice2":"myMenu2","timeout":3000,"deviceIndex":1})
		//Callback : mandatory
		//Callback Parameters (Hash) : ```{"status":"success","choice":"myMenu2","errorId":"","description":""}```
		xit("Should support \"promptMenu()\" method with the paymentDevice object, to prompt menu items", function(){
			var spec = new ManualSpec(jasmine, window.document);
			spec.addGoal("Should prompt Menu list with the payment device.");
			spec.addPrecondtion("Payment device is paired with bluetooth to the device.");
			spec.addStep("Press 'RunTest' button");
			spec.addStep("Observe that Menu list is prompted for user selection with 1 Mesage Line.");
			spec.addStep("Select myMenu2 menu from the list");
			spec.addExpectation("Observe that status:success, choice:myMenu2,errorId:'' and description:'' send with callback function.");
			runs(function(){
				//test implementation TBD : To Be Done.
			});
		});

		//Should not prompt for Menu when below given paramters are called with promptMenu() and send back proper status with the callback
		//Access : ```Rho.MobilePayment.promptMenu({"messageLine1":"","messageLine2":"","choice1":"","choice2":"","timeout":3000,"deviceIndex":1})
		//Callback : mandatory
		//Callback Parameters (Hash) : ```{"status":"error","choice":"","errorId":4,"description":"INVALID_VALUE"}```
		xit("Should support \"promptMenu()\" method with the paymentDevice object, to prompt menu items", function(){
			var spec = new ManualSpec(jasmine, window.document);
			spec.addGoal("Should not prompt Menu list when promptMenu called with null parameters.");
			spec.addPrecondtion("Payment device is paired with bluetooth to the device.");
			spec.addStep("Press 'RunTest' button");
			spec.addExpectation("Observe that Menu list is not prompted.");
			spec.addExpectation("Callback is triggered with parameters 'status':'error','choice':','errorId':4,'description':'INVALID_VALUE'}");
			runs(function(){
				//test implementation TBD : To Be Done.
			});
		});

		//Should support method promptAdditionalInfo()
		xit("Should support \"promptAdditionalInfo()\" method with the instace of the paymentDevice object, to prompt/show additional information", function(){
			var spec = new ManualSpec(jasmine, window.document);
			spec.addGoal("");
			spec.addPrecondtion("");
			spec.addStep("");
			spec.addExpectation("");
			runs(function(){
				//test implementation TBD : To Be Done.
			});
		});

		//Should support method promptMessage()
		xit("Should support \"prompmtMessage()\" method with the paymentDevice object, to prompt message with the payment device.", function(){
			var spec = new ManualSpec(jasmine, window.document);
			spec.addGoal("");
			spec.addPrecondtion("");
			spec.addStep("");
			spec.addExpectation("");
			runs(function(){
				//test implementation TBD : To Be Done.
			});
		});

		//Should support method abort() to cancel the previously issued method to paymentDevice
		xit("Should support \"abort()\" method with the paymentDevice object, to stop the previously given command to payment device.", function(){
			var spec = new ManualSpec(jasmine, window.document);
			spec.addGoal("");
			spec.addPrecondtion("");
			spec.addStep("");
			spec.addExpectation("");
			runs(function(){
				//test implementation TBD : To Be Done.
			});
		});

		//Should support method getBatteryLevel() will return batterypercentage.
		xit("Should support \"getBatteryLevel()\" method with the paymentDevice object, to get the battery level of the payment device.", function(){
			var spec = new ManualSpec(jasmine, window.document);
			spec.addGoal("");
			spec.addPrecondtion("");
			spec.addStep("");
			spec.addExpectation("");
			runs(function(){
				//test implementation TBD : To Be Done.
			});
		});

		//Should support method createMac()
		xit("Should support \"createMac()\" method with the paymentDevice object, ", function(){
			var spec = new ManualSpec(jasmine, window.document);
			spec.addGoal("");
			spec.addPrecondtion("");
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
			spec.addPrecondtion("");
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
			spec.addPrecondtion("");
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
			spec.addPrecondtion("");
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
			spec.addPrecondtion("");
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
			spec.addPrecondtion("");
			spec.addStep("");
			spec.addExpectation("");
			runs(function(){
				//test implementation TBD : To Be Done.
			});
		});

		//Should support method getLowBatteryThreshold()
		xit("Should support \"getLowBatteryThreshold()\" method with the paymentDevice, to know the battery low level threshold of the payment device.", function(){
			var spec = new ManualSpec(jasmine, window.document);
			spec.addGoal("");
			spec.addPrecondtion("");
			spec.addStep("");
			spec.addExpectation("");
			runs(function(){
				//test implementation TBD : To Be Done.
			});
		});

		//Should support method setLowBatteryThreshold()
		xit("Should support \"setLowBatteryThreshold()\" method with the paymentDevice, to set the batter low level threshold of the payment device.", function(){
			var spec = new ManualSpec(jasmine, window.document);
			spec.addGoal("");
			spec.addPrecondtion("");
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
			spec.addPrecondtion("");
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