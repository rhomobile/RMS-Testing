var platformSupported = ["ANDROID"];
var deviceSupported = ["MC40","RhoSimulator"];
var paymentDeviceName = "MPOS-64003288";

describe("Test spec for D180 payment device support", function(){
	if(platformSupported.indexOf(Rho.System.platform)!= -1){

		// Negative:
		// Should throw an exception when open method is called without deviceName parameter. 
		it("Should throw an exception when \"open()\" is called without deviceName param", function(){
			var spec = new ManualSpec(jasmine, window.document);
        	spec.addGoal("Should throw an exception when \"open()\" is called without deviceName param");
        	spec.addPrecondition("Payment device is paired via bluetooth to the device.");
            spec.addStep("Press 'RunTest' button");
            spec.addExpectation('This is Semi- Auto case !.');
            spec.displayScenario();
            spec.waitForButtonPressing("Run test");
            var errorThrown = "";
            var cbResult="";
            var openHandler = {
					openCB: function(res){
						cbResult = res;
					}
				};
            runs(function () {
				try{
					Rho.MobilePayment.open();
				}catch(err){
					errorThrown = err;
				}
			});
            runs(function(){
            	expect(errorThrown).toEqual("Wrong number of arguments");
            	expect(cbResult).toEqual("");
            });
		});

		//####Should support method isOpened()####
		//Access : `Rho.MobilePayment.isOpened()`  
		//Return : Boolean (True/False)
		it("Should support \"isOpened\" method with the paymentDevice object, to check the connection already exists or not when device is not paried at all.", function(){
			var spec = new ManualSpec(jasmine, window.document);
        	spec.addGoal("Should support \"isOpened\" property with the paymentDevice object, to check the connection already exists or not when device is not paried at all.");
        	spec.addPrecondition("Payment device is not paired via bluetooth to the device.");
            spec.addStep("Press 'RunTest' button");
            spec.addExpectation('This is Semi- Auto case !.');
            spec.displayScenario();
            spec.waitForButtonPressing("Run test");
            runs(function(){
            	expect(Rho.MobilePayment.isOpened()).toEqual(false);
            });
		});

		//####Should support method open(deviceName)####
		//Access : `Rho.MobilePayment.open(callbackfunction);  
		//Paramater : Callback function (mandatory)  
		//Callback Paramaters: ```{"status":"success"}```  
		it("Should support for the method \"Open(deviceName)\" with deviceName as param, to open the connection with paymentDevice.", function(){
			var spec = new ManualSpec(jasmine, window.document);
        	spec.addGoal("Should support for the method \"Open(deviceName)\" with the instance of paymentDevice object, to open the connection with paymentDevice.");
        	spec.addPrecondition("Payment device is paired via bluetooth to the device.");
            spec.addStep("Press 'RunTest' button");
            spec.addExpectation('This is Semi- Auto case !.');
            spec.displayScenario();
            spec.waitForButtonPressing("Run test");
            var cbResult;
            var openCBTriggered = false;
            var openHandler = {
					openCB: function(res){
						cbResult = res;
						openCBTriggered = true;
					}
				};
            runs(function(){
				Rho.MobilePayment.open(paymentDeviceName, openHandler.openCB);
			});
			waitsFor(function(){
            	 return openCBTriggered;
            },"wait for Mobile Payment device to open",25000);
            runs(function(){
            	expect(cbResult.status).toEqual("success");
            });
		});

		//####Should support method isOpened()####
		//Access : `Rho.MobilePayment.isOpened()`  
		//Return : Boolean (True/False)
		it("Should support \"isOpened\" method with the paymentDevice object, to check the connection exist.", function(){
			var spec = new ManualSpec(jasmine, window.document);
        	spec.addGoal("Should support \"isOpened\" property with the paymentDevice object, to check the connection exist.");
        	spec.addPrecondition("Payment device is paired via bluetooth to the device.");
            spec.addStep("Press 'RunTest' button");
            spec.addExpectation('This is Semi- Auto case !.');
            spec.displayScenario();
            spec.waitForButtonPressing("Run test");
			var callbackCalled = false;
			var openCB = function(){
				console.log("openCB: triggered");
				callbackCalled = true;
			};
			runs(function(){
				Rho.MobilePayment.open(paymentDeviceName, openCB);
			});
			
			waitsFor(function(){
            	 return callbackCalled;
            },"wait for Mobile Payment device to open",25000);
            runs(function(){
            	expect(Rho.MobilePayment.isOpened()).toEqual(true);
            });
		});

		//####Should support method isOpened()####
		//Access : `Rho.MobilePayment.isOpened()`  
		//Return : Boolean (True/False)
		it("Should support \"isOpened\" method with the paymentDevice object, to check the connection does not exist.", function(){
			var spec = new ManualSpec(jasmine, window.document);
        	spec.addGoal("Should support \"isOpened\" property with the paymentDevice object, to check the connection already exists or not.");
        	spec.addPrecondition("Payment device is paired via bluetooth to the device.");
            spec.addStep("Press 'RunTest' button");
            spec.addExpectation('This is Semi- Auto case !.');
            spec.displayScenario();
            spec.waitForButtonPressing("Run test");
			var closeCBTriggered=false;
			var closeCB = function(){
				console.log("closeCB: triggered");
				closeCBTriggered=true;
			};
			runs(function(){
				Rho.MobilePayment.close(closeCB);
			});
			waitsFor(function(){
            	 return closeCBTriggered;
            },"wait for Mobile Payment device to close",25000);
            runs(function(){
            	expect(Rho.MobilePayment.isOpened()).toEqual(false);
            });
		});

		
		//####Should support method close()####
		//Access : `Rho.MobilePayment.close(callbackfunction);  
		//Paramater : Callback function (mandatory)  
		//Callback Paramaters (Hash): ```{"status":success,"errorId":"","description":""}```  
		it("Should support \"close()\" method with the instance of paymentDevice object, to disconnect paymentDevice.", function(){
			var spec = new ManualSpec(jasmine, window.document);
        	spec.addGoal("Should support \"close()\" method with the instance of paymentDevice object, to disconnect paymentDevice.");
        	spec.addPrecondition("Payment device is paired via bluetooth to the device.");
        	spec.addPrecondition("Payment device is already opened a connection with your device.");
            spec.addStep("Press 'RunTest' button");
            spec.addExpectation('This is Semi- Auto case !.');
            spec.displayScenario();
            spec.waitForButtonPressing("Run test");
			if(Rho.MobilePayment.isOpened()){
				var closeCBTriggered=false;
				var cbResult;
				var closeHandler = {
					closeCB: function(res){
						console.log("closeCB: triggered");
						cbResult = res;
						closeCBTriggered=true;
					}
				};
				runs(function(){
					Rho.MobilePayment.close(closeHandler.closeCB());
				});
				
				waitsFor(function(){
					return closeCBTriggered;
	            },"wait for Mobile Payment device to close",25000);
	            runs(function(){
	            	expect(cbResult.status).toEqual("success");
	            	
	            });
			}
		});

		//####Executing close() method multiple times should not behave abnormally####
		it("Should disconnect paymentDevice successfully by running \"close()\" method multiple times.", function(){
			var spec = new ManualSpec(jasmine, window.document);
        	spec.addGoal("Should support \"close()\" method with the instance of paymentDevice object, to disconnect paymentDevice.");
        	spec.addPrecondition("Payment device is paired via bluetooth to the device.");
        	spec.addPrecondition("Payment device is already opened a connection with your device.");
            spec.addStep("Press 'RunTest' button");
            spec.addExpectation('This is Semi- Auto case !.');
            spec.displayScenario();
            spec.waitForButtonPressing("Run test");
			var openCBTriggered=false;
			var openHandler = {
					openCB: function(res){
						cbResult = res;
						openCBTriggered = true;
					}
				};
			Rho.MobilePayment.open(paymentDeviceName, openHandler.openCB);
			
				waitsFor(function(){
	            	 return openCBTriggered;
	            },"wait for Mobile Payment device to open",20000);
			if(Rho.MobilePayment.isOpened()){
				var closeCBTriggered = false;
				var closeCB = function(data){
					console.log("closeCB: triggered");
					closeCBTriggered = true;
				};
				runs(function(){
					Rho.MobilePayment.close(closeCB);
					Rho.MobilePayment.close(closeCB);
					Rho.MobilePayment.close(closeCB);
				})
				waitsFor(function(){
	            	 return closeCBTriggered;
	            },"wait for Mobile Payment device to close",20000);
	            runs(function(){
	            	expect(Rho.MobilePayment.isOpened()).toEqual(false);
	            });
			}
		});

		//####Should read data from MagStripe Card using method "readCardData()" with readMode-Swipe####
		//Access : `Rho.MobilePayment.readCardData();`  
		//param : {"amount":200.00,"otherAmount":10.00,"readMode":0,"transactionMessage":"This is transaction","readTimeOut":4000}
		//Callback : Callback function (mandatory)  
		//Callback Paramaters (Hash): ```{"status":success,"errorName":"","accountNumber":"","cardHolderName":"","expiryDate":"","track1Data":"","track2Data":"","track3Data":"","tlvStrings":"","tagIds":"","lengths":"","values":""}```  
		it("Should read data from MagStripe card with readMode-Swipe", function(){
			var spec = new ManualSpec(jasmine, window.document);
        	spec.addGoal("Should read data from MagStripe card with readMode-Swipe.");
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
				Rho.MobilePayment.open(paymentDeviceName, openCB);
			});
			waitsFor(function(){
					return openCBTriggered;
				},"waiting for open callback", 25000);
			runs(function(){
				var param = {
					"amount":200.00,
					"otherAmount":10.00,
					"readMode":0,			//Read mode is Swipe for MagStripe card.
					"messageTitle":"Message Title",		//Message Title
					"message1":"This is message 1.",	//Message one
					"message2":"This is message 2.",	//Message two
					"readTimeOut":5000
				};
				var readCB = function(data){
					spec.addResult("Status : ", data.status);
					spec.addResult("errorName : ", data.errorName);
					spec.addResult("accountNumber :", data.accountNumber);
					spec.addResult("cardHolderName :", data.cardHolderName);
					spec.addResult("expiryDate :", data.expiryDate);
					spec.addResult("track1Data :", data.track1Data);
					spec.addResult("track2Data :", data.track2Data);
					spec.addResult("track3Data :", data.track3Data);
					spec.addResult("maskedPan :", data.maskedPan);
					//spec.addResult("tlvStrings :", JSON.stringify(data.tlvStrings)); //Specific to EMV tags ie., only for smart cards
					readCBTriggered = true;
				};
				Rho.MobilePayment.readCardData(param, readCB);
			})
			waitsFor(function(){
				return readCBTriggered;
			},"wait for read card data", 15000);
			runs(function(){
				spec.displayResults();
                spec.waitForResponse();
			});
		});

		//####Should read data from Smart chip Card using method "readCardData()" with readMode-Insert####
		//Access : `Rho.MobilePayment.readCardData();`  
		//param : {"amount":200.00,"otherAmount":10.00,"readMode":1,"transactionMessage":"any String","readTimeOut":4000}
		//Callback : Callback function (mandatory)  
		//Callback Paramaters (Hash): ```{"status":success,"errorName":"","accountNumber":"","cardHolderName":"","expiryDate":"","track1Data":"","track2Data":"","track3Data":"","tlvStrings":"","tagIds":"","lengths":"","values":""}```  
		it("Should read data from SmartCard with readMode-Insert", function(){
			var spec = new ManualSpec(jasmine, window.document);
        	spec.addGoal("Should read data from SmartCard with readMode-Insert.");
        	spec.addPrecondition("Payment device is paired via bluetooth to the device.");
            spec.addStep("Press 'RunTest' button");
            spec.addStep("Insert a valid SmartCard Credit card to readCardData from paymentDevice.");
            spec.addExpectation('Data from the card read and displayed successfully using D180 payment Device.');
            spec.addExpectation('Ensure callback parameter tlvStrings is not undefined.');
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
				Rho.MobilePayment.open(paymentDeviceName, openCB);
			});
			waitsFor(function(){
					return openCBTriggered;
				},"waiting for open callback", 25000);
			runs(function(){
				var param = {
					"amount":200.00,
					"otherAmount":10.00,
					"readMode":1,			//read mode - Insert for Smart card
					"messageTitle":"Message Title",		//Message Title
					"message1":"This is message 1.",	//Message one
					"message2":"This is message 2.",	//Message two
					"readTimeOut":10000
				};
				var readCB = function(data){
					spec.addResult("Status : ", data.status);
					spec.addResult("errorId : ", data.errorId);
					spec.addResult("description :", data.description);
					spec.addResult("accountNumber :", data.accountNumber);
					spec.addResult("cardHolderName :", data.cardHolderName);
					spec.addResult("expiryDate :", data.expiryDate);
					spec.addResult("track1Data :", data.track1Data);
					spec.addResult("track2Data :", data.track2Data);
					spec.addResult("track3Data :", data.track3Data);
					spec.addResult("maskedPan :", data.maskedPan);
					spec.addResult("tlvStrings :", JSON.stringify(data.tlvStrings)); //Specific to EMV tags
					readCBTriggered = true;
				}
				Rho.MobilePayment.readCardData(param,readCB);
			})
			waitsFor(function(){
				return readCBTriggered;
			},"wait for read card data", 25000);
			runs(function(){
				spec.displayResults();
                spec.waitForResponse();
			});
		});

		//####Should read data from either MagStripe/SmartCard/EMVContactless Card using method "readCardData()" with readMode-All####
		//Access : `Rho.MobilePayment.readCardData();`  
		//param : {"amount":200.00,"otherAmount":10.00,"readMode":3,"transactionMessage":"any String","readTimeOut":4000}
		//Callback : Callback function (mandatory)  
		//Callback Paramaters (Hash): ```{"status":success,"errorName":"","accountNumber":"","cardHolderName":"","expiryDate":"","track1Data":"","track2Data":"","track3Data":"","tlvStrings":"","tagIds":"","lengths":"","values":""}```  
		it("Should read data from either MagStripe/SmartCard/EMVContactless tag with readMode-All", function(){
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
					openCBTriggered = true;
				};
				Rho.MobilePayment.open(paymentDeviceName, openCB);
			});
			waitsFor(function(){
					return openCBTriggered;
				},"waiting for open callback", 25000);
			runs(function(){
				var param = {
					"amount":200.00,
					"otherAmount":10.00,
					"readMode":4,			//read mode - All
					"messageTitle":"Read mode All",		//Message Title
					"message1":"This is message 1.",	//Message one
					"message2":"This is message 2.",	//Message two
					"readTimeOut":10000
				};
				var readCB = function(data){
					spec.addResult("Status : ", data.status);
					spec.addResult("errorId : ", data.errorId);
					spec.addResult("description :", data.description);
					spec.addResult("accountNumber :", data.accountNumber);
					spec.addResult("cardHolderName :", data.cardHolderName);
					spec.addResult("expiryDate :", data.expiryDate);
					spec.addResult("track1Data :", data.track1Data);
					spec.addResult("track2Data :", data.track2Data);
					spec.addResult("track3Data :", data.track3Data);
					spec.addResult("maskedPan :", data.maskedPan);
					spec.addResult("tlvStrings :", JSON.stringify(data.tlvStrings)); //Specific to EMV tags
					readCBTriggered = true;
				}
				Rho.MobilePayment.readCardData(param,readCB);
			})
			waitsFor(function(){
				return readCBTriggered;
			},"wait for read card data", 25000);
			runs(function(){
				spec.displayResults();
                spec.waitForResponse();
			});
		});

		//####Should not read data from MagStripe Card using method "readCardData()" with readMode-Insert####
		//Access : `Rho.MobilePayment.readCardData();`  
		//param : {"amount":200.00,"otherAmount":10.00,"readMode":1,"transactionMessage":"any String","readTimeOut":4000}
		//Callback : Callback function (mandatory)  
		//Callback Paramaters (Hash): ```{"status":"error","errorName":"TIMED_OUT"}```  
		it("Should not read data from MagStripe card with readMode-Insert and callback triggered with status:error and errorName:TIMED_OUT", function(){
			var spec = new ManualSpec(jasmine, window.document);
			spec.addGoal("Should return errorId:15 and description:TIMED_OUT with callback, when MagStrip card is inserted with SmartCard slot");
			spec.addPrecondition("Payment device is paired via bluetooth to the device.");
			spec.addStep("Press 'RunTest' button");
			spec.addStep("Insert a valid MagStripe card in to the smart card slot");
			spec.addExpectation("Semi auto test to check the callback function triggered with status:error and errorName:TIMED_OUT");
			spec.displayScenario();
            spec.waitForButtonPressing("Run test");
			var openCBTriggered = false;
            var readCBTriggered = false;
            var cbResult;
            
			runs(function(){
				var openCB = function(){
					openCBTriggered = true;
				};
				Rho.MobilePayment.open(paymentDeviceName, openCB);
			});
			waitsFor(function(){
					return openCBTriggered;
				},"waiting for open callback", 25000);
			runs(function(){
				var readHandler = {
					readCB: function(data){
						alert("am callback");
						cbResult = data;
						readCBTriggered = true;
					}
				};
				var param = {
					"amount":200.00,
					"otherAmount":10.00,
					"readMode":1,			//read mode - Insert
					"messageTitle":"Read mode Insert",		//Message Title
					"message1":"Swipe mag stripe.",	//Message one
					"message2":"Invalid operation.",	//Message two
					"readTimeOut":10000
				};
				Rho.MobilePayment.readCardData(param, readHandler.readCB);
			});
			// below wait is the time for the user to swipe card in to D180 device.
			waitsFor(function(){
				return readCBTriggered;
			},"wait for readcard timeout", 25000);
			runs(function(){
				expect(cbResult.status).toEqual("error");
				expect(cbResult.errorName).toEqual("TIMED_OUT");
			});
		});

		//####Should not read data from SmartCard using method "readCardData()" with readMode-Swipe####
		//Access : `Rho.MobilePayment.readCardData();`  
		//param : {"amount":200.00,"otherAmount":10.00,"readMode":0,"transactionMessage":"any String","readTimeOut":4000}
		//Callback : Callback function (mandatory)  
		//Callback Paramaters (Hash): ```{"status":"error","errorName":"TIMED_OUT"}```  
		it("Should not read data from SmartCard with readMode-Swipe and callback triggered with status:error and errorName:TIMED_OUT", function(){
			var spec = new ManualSpec(jasmine, window.document);
			spec.addGoal("Should return status:error and errorName:TIMED_OUT with callback, when SmartCard got swiped with paymentDevice");
			spec.addPrecondition("Payment device is paired via bluetooth to the device.");
			spec.addStep("Press 'RunTest' button");
			spec.addStep("Swipe a valid SmartCard with paymentDevice");
			spec.addExpectation("Semi auto test to check the callback function triggered with status:error and errorName:TIMED_OUT");
			spec.displayScenario();
            spec.waitForButtonPressing("Run test");
            var openCBTriggered = false;
            var readCBTriggered = false;
            var cbResult;
            var readHandler = {
				readCB: function(data){
					cbResult = data;
					readCBTriggered = true;
				}
			};
			var openCBTriggered = false;
            var readCBTriggered = false;
			runs(function(){
				var openCB = function(){
					openCBTriggered = true;
				};
				Rho.MobilePayment.open(paymentDeviceName, openCB);
			});
			waitsFor(function(){
					return openCBTriggered;
				},"waiting for open callback", 25000);
			runs(function(){
				var param = {
					"amount":200.00,
					"otherAmount":10.00,
					"readMode":0,			//read mode - Swipe
					"messageTitle":"Swipe mode",		//Message Title
					"message1":"Insert smart",	//Message one
					"message2":"Invalid Operation",	//Message two
					"readTimeOut":10000
				};
				Rho.MobilePayment.readCardData(param, readHandler.readCB);
			});
			// below wait is the time for the user to swipe card in to D180 device.
			waitsFor(function(){
				return readCBTriggered;
			},"wait for readcard timeout", 25000);
			runs(function(){
				expect(cbResult.status).toEqual("error");
				expect(cbResult.errorName).toEqual("TIMED_OUT");
			});
		});

		//#### It should trigger callback with proper error details while trying to read card data before open method.####
		//Access : `Rho.MobilePayment.readCardData();`  
		//param : {"amount":200.00,"otherAmount":10.00,"readMode":1,"transactionMessage":"any String","readTimeOut":4000}
		//Callback : Callback function (mandatory)  
		//Callback Paramaters (Hash): ```{"status":"error","errorName":"DEVICE_NOT_ENABLED"}```  
		it("Should trigger callback with status:error and errorName:DEVICE_NOT_ENABLED when trying to readCardData() before open() method.", function(){
			var spec = new ManualSpec(jasmine, window.document);
			spec.addGoal("Should return errorId:8 and description:DEVICE_NOT_ENABLED with callback, when MagStripe card swiped with paymentDevice");
			spec.addPrecondition("Payment device is paired via bluetooth to the device.");
			spec.addStep("Press 'RunTest' button");
			spec.addStep("Swipe a valid MagStripe with paymentDevice");
			spec.addExpectation("Semi auto test to check the callback function triggered with status:error and errorName:DEVICE_NOT_ENABLED");
			spec.displayScenario();
            spec.waitForButtonPressing("Run test");
            var closeCBTriggered = false;
            var readCBTriggered = false;
            var cbResult;
			
			runs(function(){
				var closeCB = function(){
					closeCBTriggered = true;
				};
				Rho.MobilePayment.close(closeCB);
			});
			waitsFor(function(){
					return closeCBTriggered;
				},"waiting for open callback", 25000);
			runs(function(){
			
				var readHandler = {
					readCB: function(data){
						cbResult = data;
						readCBTriggered = true;
						alert(data.status);
						alert(data.errorName);
					}
				};
					var param = {
					"amount":200.00,
					"otherAmount":10.00,
					"readMode":0,			//read mode - Swipe
					"messageTitle":"Swipe Mode",		//Message Title
					"message1":"Insert",	//Message one
					"message2":"Device Not Enabled",	//Message two
					"readTimeOut":10000
				};
				Rho.MobilePayment.readCardData(param, readHandler.readCB);
			});
			waitsFor(function(){
				return readCBTriggered;
			},"wait for readcard timeout", 25000);
			runs(function(){
				expect(cbResult.status).toEqual("error");
				expect(cbResult.errorName).toEqual("DEVICE_NOT_ENABLED");
			});
		});

		//It should trigger callback with proper error while smart card removed.
		//Access : `Rho.MobilePayment.readCardData();`  
		//param : {"amount":200.00,"otherAmount":10.00,"readMode":1,"transactionMessage":"Remove card while reading","readTimeOut":4000}
		//Callback : Callback function (mandatory)  
		//Callback Paramaters (Hash): ```{"status":"error","errorName":"CARD_REMOVED"}```  
		it("Should trigger callback with status:error and errorName:CARD_REMOVED when smartCard is removed while reading", function(){
			var spec = new ManualSpec(jasmine, window.document);
			spec.addGoal("Should return status:error and errorName:CARD_REMOVED with callback, when SmartCard is inserted and removed while reading.");
			spec.addPrecondition("Payment device is paired via bluetooth to the device.");
			spec.addStep("Press 'RunTest' button");
			spec.addStep("Insert a valid SmartCard with paymentDevice");
			spec.addStep("Remove the card while the data is reading");
			spec.addExpectation("Semi auto test to check the callback function triggered with status:error and errorName:CARD_REMOVED");
			spec.displayScenario();
            spec.waitForButtonPressing("Run test");
            var openCBTriggered = false;
            var readCBTriggered = false;
            var cbResult;
			var readHandler = {
				readCB: function(data){
					cbResult = data;
					readCBTriggered = true;
				}
			};
			
			runs(function(){
				var openCB = function(){
					openCBTriggered = true;
				};
				Rho.MobilePayment.open(paymentDeviceName, openCB);
			});
			waitsFor(function(){
					return openCBTriggered;
				},"waiting for open callback", 25000);
			runs(function(){
				alert("insert and remove your smart card immediately.");
				var param = {
					"amount":200.00,
					"otherAmount":10.00,
					"readMode":1,			//read mode - Insert
					"messageTitle":"Insert Mode",		//Message Title
					"message1":"Insert and remove",	//Message one
					"message2":"Invalid Operation",	//Message two
					"readTimeOut":10000
				};
				Rho.MobilePayment.readCardData(param, readHandler.readCB);
			});
			// below wait is the time for the user to insert card in to D180 device.
			waitsFor(function(){
				return readCBTriggered;
			},"wait for readcard timeout", 25000);

			runs(function(){
				expect(cbResult.status).toEqual("error");
				expect(cbResult.errorName).toEqual("CARD_REMOVED");
			});
		});

		//It should trigger callback with proper error when no card is "Inserted"/Swiped/Touched while reading.
		//Access : `Rho.MobilePayment.readCardData();`  
		//param : {"amount":200.00,"otherAmount":10.00,"readMode":0,"transactionMessage":"any String","readTimeOut":4000}
		//Callback : Callback function (mandatory)  
		//Callback Paramaters (Hash): ```{"status":"error","errorName":"TIMED_OUT"}```  
		it("Should trigger callback with status:error and errorName:TIMED_OUT when MagStripe card is not swiped at all while method readCardData() is called", function(){
			var spec = new ManualSpec(jasmine, window.document);
			spec.addGoal("Should return errorId:9 and description:TIMED_OUT with callback, when MagStripe card not swiped with paymentDevice");
			spec.addPrecondition("Payment device is paired via bluetooth to the device.");
			spec.addStep("Press 'RunTest' button");
			spec.addStep("Do not swipe any valid MagStripe card with paymentDevice");
			spec.addExpectation("Semi auto test to check the callback function triggered with status:error and errorName:TIMED_OUT");
			spec.displayScenario();
            spec.waitForButtonPressing("Run test");
            var openCBTriggered = false;
            var readCBTriggered = false;
            var cbResult;
			var readHandler = {
					readCB: function(data){
						cbResult = data;
						readCBTriggered = true;
					}
				};
			runs(function(){
				var openCB = function(){
					openCBTriggered = true;
				};
				Rho.MobilePayment.open(paymentDeviceName, openCB);
			});
			waitsFor(function(){
					return openCBTriggered;
				},"waiting for open callback", 25000);
			runs(function(){
				var param = {
					"amount":200.00,
					"otherAmount":10.00,
					"readMode":0,			//read mode - Swipe
					"messageTitle":"Swipe",		//Message Title
					"message1":"Dont Swipe",	//Message one
					"message2":"Invalid Operation",	//Message two
					"readTimeOut":10000
				};
				Rho.MobilePayment.readCardData(param, readHandler.readCB);
			});
			// below wait is the time for the user to insert card in to D180 device.
			waitsFor(function(){
				return readCBTriggered;
			},"wait for readcard timeout", 25000);
			runs(function(){
				expect(cbResult.status).toEqual("error");
				expect(cbResult.errorName).toEqual("TIMED_OUT");
			});
		});

		//It should trigger callback with proper error when no card is Swiped/"Inserted"/Touched while reading.
		//Access : `Rho.MobilePayment.readCardData();`  
		//param : {"amount":200.00,"otherAmount":10.00,"readMode":1,"transactionMessage":"any String","readTimeOut":4000}
		//Callback : Callback function (mandatory)  
		//Callback Paramaters (Hash): ```{"status":"error","errorName":"TIMED_OUT"}```  
		it("Should trigger callback with status:error and errorName:TIMED_OUT when SmartCard is not Inserted at all while method readCardData() is called", function(){
			var spec = new ManualSpec(jasmine, window.document);
			spec.addGoal("Should return status:error and errorName:TIMED_OUT with callback, when SmartCard is not inserted with paymentDevice");
			spec.addPrecondition("Payment device is paired via bluetooth to the device.");
			spec.addStep("Press 'RunTest' button");
			spec.addStep("Do not Insert any valid SmartCard with paymentDevice");
			spec.addExpectation("Semi auto test to check the callback function triggered with errorId:9 and description:TIMED_OUT");
			spec.displayScenario();
            spec.waitForButtonPressing("Run test");
            var openCBTriggered = false;
            var readCBTriggered= false;
            var cbResult;
			var readHandler = {
					readCB: function(data){
						cbResult = data;
						readCBTriggered = true;
					}
				};
			runs(function(){
				var openCB = function(){
					openCBTriggered = true;
				};
				Rho.MobilePayment.open(paymentDeviceName, openCB);
			});
			waitsFor(function(){
					return openCBTriggered;
				},"waiting for open callback", 25000);
			runs(function(){
				alert("insert and remove your smart card immediately.");
				var param = {
					"amount":200.00,
					"otherAmount":10.00,
					"readMode":1,			//read mode - Insert
					"messageTitle":"Insert",		//Message Title
					"message1":"Donot Insert",	//Message one
					"message2":"Invalid Operation",	//Message two
					"readTimeOut":10000
				};
				Rho.MobilePayment.readCardData(param, readHandler.readCB);
			});
			// below wait is the time for the user to insert card in to D180 device.
			waitsFor(function(){
				return readCBTriggered;
			},"wait for readcard timeout", 25000);
			runs(function(){
				expect(cbResult.status).toEqual("error");
				expect(cbResult.errorName).toEqual("TIMED_OUT");
			});
		});

		//It should trigger callback with proper error when no card is Swiped/Inserted/"Touched" while reading.
		//Access : `Rho.MobilePayment.readCardData();`  
		//param : {"amount":200.00,"otherAmount":10.00,"readMode":2,"transactionMessage":"any String","readTimeOut":4000}
		//Callback : Callback function (mandatory)  
		//Callback Paramaters (Hash): ```{"status":"error","errorName":"TIMED_OUT"}```  
		it("Should trigger callback with status:error and errorName:TIMED_OUT when EMVContactless is not touched at all while method readCardData() is called", function(){
			var spec = new ManualSpec(jasmine, window.document);
			spec.addGoal("Should return status:error and errorName:TIMED_OUT with callback, when EMVContactless is not touched with paymentDevice");
			spec.addPrecondition("Payment device is paired via bluetooth to the device.");
			spec.addStep("Press 'RunTest' button");
			spec.addStep("Do not touch any valid EMVContactless with paymentDevice");
			spec.addExpectation("Semi auto test to check the callback function triggered with errorId:9 and description:TIMED_OUT");
			spec.displayScenario();
            spec.waitForButtonPressing("Run test");
            var openCBTriggered = false;
            var readCBTriggered = false;
            var cbResult;
			var readHandler = {
					readCB: function(data){
						cbResult = data;
						readCBTriggered = true;
					}
				};
			runs(function(){
				var openCB = function(){
					openCBTriggered = true;
				};
				Rho.MobilePayment.open(paymentDeviceName, openCB);
			});
			waitsFor(function(){
					return openCBTriggered;
				},"waiting for open callback", 25000);
			runs(function(){
				alert("insert and remove your smart card immediately.");
				var param = {
					"amount":200.00,
					"otherAmount":10.00,
					"readMode":2,			//read mode - Touch
					"messageTitle":"anything",		//Message Title
					"message1":"anything",	//Message one
					"message2":"operation",	//Message two
					"readTimeOut":10000
				};
				Rho.MobilePayment.readCardData(param, readHandler.readCB);
			});
			// below wait is the time for the user to insert card in to D180 device.
			waitsFor(function(){
				return readCBTriggered;
			},"wait for readcard timeout", 25000);
			runs(function(){
				expect(cbResult.status).toEqual("error");
				expect(cbResult.errorName).toEqual("TIMED_OUT");
			});
		});

		//It should trigger callback with proper error when no parameter is passed with the method readCardData()
		//Access : `Rho.MobilePayment.readCardData();`  
		//param : {"amount":"invalidValue","otherAmount":"invalidValue","readMode":10,"transactionMessage":10,"readTimeOut":4000}
		//Callback : Callback function (mandatory)  
		//Callback Paramaters (Hash): ```{"status":"error","errorName":"INVALID_VALUE"}```  
		it("Should trigger callback with status:error and errorName:INVALID_VALUE when invalid parameters passed with readCardData()", function(){
			var spec = new ManualSpec(jasmine, window.document);
			spec.addGoal("Should return errorId:4 and description:INVALID_VALUE with callback, when no parameter is passed with readCardData()");
			spec.addPrecondition("Payment device is paired via bluetooth to the device.");
			spec.addStep("Press 'RunTest' button");
			spec.addExpectation("Semi auto test to check the callback function triggered with errorId:4 and description:INVALID_VALUE");
			spec.displayScenario();
            spec.waitForButtonPressing("Run test");
            var openCBTriggered = false;
            var readCBTriggered = false;
            var cbResult;
			var readHandler = {
					readCB: function(data){
						cbResult = data;
						readCBTriggered = true;
					}
				};
			runs(function(){
				var openCB = function(){
					openCBTriggered = true;
				};
				Rho.MobilePayment.open(paymentDeviceName, openCB);
			});
			waitsFor(function(){
					return openCBTriggered;
				},"waiting for open callback", 25000);
			runs(function(){
				alert("insert and remove your smart card immediately.");
				var param = {
					"amount":"invalidValue", 		//string value is invalid for amount
					"otherAmount":"invalidValue",	//String value is invalid for other Amount
					"readMode":10,			//read mode - value 10 is invalid 
					"messageTitle":"With",		//Message Title
					"message1":"Do",	//Message one
					"message2":"perform",	//Message two
					"readTimeOut":"10000"	//string value is invalid for readTimeOut
				};
				Rho.MobilePayment.readCardData(param, readHandler.readCB);
			});
			// below wait is the time for the user to insert card in to D180 device.
			waitsFor(function(){
				return readCBTriggered;
			},"wait for readcard timeout", 25000);
			runs(function(){
				expect(cbResult.status).toEqual("error");
				expect(cbResult.errorName).toEqual("INVALID_VALUE");
			});
		});

		//Should support method promptPin()
		//Access : ```Rho.MobilePayment.promptPin({"accountNumber":"asd123458765", "minPINLength":4, "maxPINLength":8, "isPINOptional":false, "message1":"Enter PIN", "message2":"min 4 digits & max 8 digits", "processingMessage":"Pin processsing", "readTimeOut":5000 },callbackfunction);```  
		//Paramater : Callback function (mandatory)  
		//Callback Paramaters (Hash): ```{"status":success", "serialNumber":"", "pinBlockStr":"", "isPinEntered":""}```  
		xit("Should support \"promptPin()\" method with the paymentDevice object, to prompt for PIN.", function(){
			var spec = new ManualSpec(jasmine, window.document);
			spec.addGoal("Should request PIN code with the paymentDevice, when promptPin() method is called in the application");
			spec.addPrecondition("Payment device is paired with bluetooth to the device.");
			spec.addStep("Press 'RunTest' button");
			spec.addStep("Observe that PIN code request is prompted at the paymentDevice");
			spec.addStep("Enter PIN value of length 4 and press 'Ok.");
			spec.addExpectation("Check for the status:'Success' and no errorId with the callback parameter");
			spec.displayScenario();
            spec.waitForButtonPressing("Run test");
			var openCBTriggered = false;
			var promptPinCBTriggered = false;
			var promptPinCB = function(data){
				spec.addResult("Status : ", data.status);
				spec.addResult("Serial Number: ", data.serialNumber);
				spec.addResult("pinBlockStr : ", data.pinBlockStr);
				spec.addResult("IsPinEntered : ", data.isPinEntered);
				promptPinCBTriggered = true;
			};
			runs(function(){
				var openCB = function(){
					openCBTriggered = true;
				};
				Rho.MobilePayment.open(paymentDeviceName, openCB);
			});
			waitsFor(function(){
				return openCBTriggered;
			},"wait for open callback trigger",25000);
			runs(function(){
				var param = {
					"accountNumber":"asd123458765",
					"minPINLength":4,
					"maxPINLength":8,
					"message1":"Enter PIN",
					"message2":"min 4 dig",
					"processingMessage":"Pin",
					"readTimeOut":10000
				};
				Rho.MobilePayment.promptPin(param, promptPinCB);
			});
			waitsFor(function(){
				return promptPinCBTriggered;
			},"wait for prompt callback", 15000);
			runs(function(){
				spec.displayResults();
				spec.waitForResponse();
			});
		});

		//Should prompt for PIN number when below given parameters are called with promptPin() and send back proper error id with the callback
		// PIN number length less than minPinLength ( <4 )
		//Access : ```Rho.MobilePayment.promptPin({"accountNumber":"asd123458765", "minPINLength":4, "maxPINLength":8, "isPINOptional":false, "message1":"Enter PIN", "message2":"min 4 digits & max 8 digits", "processingMessage":"Pin processsing", "readTimeOut":5000},callbackfunction);```  
		//Paramater : Callback function (mandatory)  
		//Callback Paramaters (Hash): ```{"status":"error", "errorName":"INVALID_VALUE"}```  
		xit("Should prompt for PIN number and send back proper error status with the callback when entered PIN length is lesser than minPINLength.", function(){
			var spec = new ManualSpec(jasmine, window.document);
			spec.addGoal("Should send status:error and errorName:\"INVALID_VALUE\"");
			spec.addPrecondition("Payment device is paired with bluetooth to the device.");
			spec.addStep("Press 'RunTest' button");
			spec.addStep("Observe that PIN code request is prompted at the paymentDevice");
			spec.addStep("Enter PIN of length less than 4 characters and press 'Ok'")
			spec.addExpectation("Semi Auto test, to check for the status:error and errorName:INVALID_VALUE with the callback");
			spec.displayScenario();
            spec.waitForButtonPressing("Run test");
			var openCBTriggered = false;
			var promptPinCBTriggered = false;
			var cbResult;
			var promptHandler = {
				promptPinCB: function(data){
					promptPinCBTriggered = true;
					cbResult = data;
				}
			};
			runs(function(){
				var openCB = function(){
					openCBTriggered = true;
				};
				Rho.MobilePayment.open(paymentDeviceName, openCB);
			});
			waitsFor(function(){
				return openCBTriggered;
			},"wait for open callback trigger",25000);
			runs(function(){
				var param = {
					"accountNumber":"asd123458765",
					"minPINLength":4,
					"maxPINLength":8,
					"message1":"Enter PIN",
					"message2":"min 4 ",
					"processingMessage":"Pin processsing",
					"readTimeOut":10000
				};
				Rho.MobilePayment.promptPin(param, promptHandler.promptPinCB);
			});
			waitsFor(function(){
				return promptPinCBTriggered;
			},"wait for prompt callback", 15000);
			runs(function(){
				expect(cbResult.status).toEqual("error");
				expect(cbResult.errorName).toEqual("INVALID_VALUE");
			});
		});

		xit("Should prompt for PIN number and send back proper error status with the callback when pin length is greater than maxPINLength", function(){
			var spec = new ManualSpec(jasmine, window.document);
			spec.addGoal("Should send status:error and errorName:\"INVALID_VALUE\"");
			spec.addPrecondition("Payment device is paired with bluetooth to the device.");
			spec.addStep("Press 'RunTest' button");
			spec.addStep("Observe that PIN code request is prompted at the paymentDevice");
			spec.addStep("Enter PIN of length greater than 8 characters and press 'Ok'")
			spec.addExpectation("Semi Auto test, to check for the status:error and errorName:INVALID_VALUE with the callback");
			spec.displayScenario();
            spec.waitForButtonPressing("Run test");
			var openCBTriggered = false;
			var promptPinCBTriggered = false;
			var cbResult;
			var promptHandler = {
				promptPinCB: function(data){
					promptPinCBTriggered = true;
					cbResult = data;
				}
			};
			runs(function(){
				var openCB = function(){
					openCBTriggered = true;
				};
				Rho.MobilePayment.open(paymentDeviceName, openCB);
			});
			waitsFor(function(){
				return openCBTriggered;
			},"wait for open callback trigger",25000);
			runs(function(){
				var param = {
					"accountNumber":"asd123458765",
					"minPINLength":4,
					"maxPINLength":8,
					"message1":"Enter PIN",
					"message2":"min 4 digits & max 8 digits",
					"processingMessage":"Pin processsing",
					"readTimeOut":10000
				};
				Rho.MobilePayment.promptPin(param, promptHandler.promptPinCB);
			});
			waitsFor(function(){
				return promptPinCBTriggered;
			},"wait for prompt callback", 15000);
			runs(function(){
				expect(cbResult.status).toEqual("error");
				expect(cbResult.errorName).toEqual("INVALID_VALUE");
			});
		});

		//Should prompt for PIN number when below given parameters are called with promptPin() and send back proper error id with the callback
		//Do not enter any PIN number until the timeout
		//Access : ```Rho.MobilePayment.promptPin({"accountNumber":"asd123458765", "minPINLength":4, "maxPINLength":8, "isPINOptional":false, "message1":"Enter PIN", "message2":"min 4 digits & max 8 digits", "processingMessage":"Pin processsing", "readTimeOut":5000},callbackfunction);```  
		//Callback : mandatory  
		//Callback Paramaters (Hash): ```{"status":"error","errorName":"TIMED_OUT"}```  
		xit("Should send back proper error status with the callback when nothing entered till the timeout with \"promptPin()\" ", function(){
			var spec = new ManualSpec(jasmine, window.document);
			spec.addGoal("Should send status:error and errorName:\"TIMED_OUT\"");
			spec.addPrecondition("Payment device is paired with bluetooth to the device.");
			spec.addStep("Press 'RunTest' button");
			spec.addStep("Observe that PIN code request is prompted at the paymentDevice");
			spec.addStep("Do not enter PIN untill the timeout.")
			spec.addExpectation("Semi auto test case to check for the status:error and errorName:TIMED_OUT with the callback");
			spec.displayScenario();
            spec.waitForButtonPressing("Run test");
			var openCBTriggered = false;
			var promptPinCBTriggered = false;
			var cbResult;
			var promptHandler = {
				promptPinCB: function(data){
					cbResult = data;
					promptPinCBTriggered = true;
				}
			};
			runs(function(){
				var openCB = function(){
					openCBTriggered = true;
				};
				Rho.MobilePayment.open(paymentDeviceName, openCB);
			});
			waitsFor(function(){
				return openCBTriggered;
			},"wait for open callback trigger",25000);
			runs(function(){
				var param = {
					"accountNumber":"asd123458765",
					"minPINLength":4,
					"maxPINLength":8,
					"message1":"Enter PIN",
					"message2":"min 4 digits",
					"processingMessage":"Pin processsing",
					"readTimeOut":10000
				};
				Rho.MobilePayment.promptPin(param, promptHandler.promptPinCB);
			});
			waitsFor(function(){
				return promptPinCBTriggered;
			},"wait for prompt callback", 15000);
			runs(function(){
				expect(cbResult.status).toEqual("error");
				expect(cbResult.errorName).toEqual("TIMED_OUT");
			});
		});

		//Should support method promptMenu()
		//Should prompt for Menu when below given paramters are called with promptMenu() and send back proper status with the callback
		//Access : ```Rho.MobilePayment.promptMenu({"messageLine1":"Message1","messageLine2":"Message2","choice1":"myMenu1","choice2":"myMenu2","choice3":"myMenu3","choice4":"myMenu4","timeout":3000})
		//Callback : mandatory
		//Callback Parameters (Hash) : ```{"status":"success","choice":"myMenu2"}```
		it("Should support \"promptMenu()\" method with the paymentDevice object, to prompt menu items", function(){
			var spec = new ManualSpec(jasmine, window.document);
			spec.addGoal("Should prompt Menu list with the payment device.");
			spec.addPrecondition("Payment device is paired with bluetooth to the device.");
			spec.addStep("Press 'RunTest' button");
			spec.addStep("Observe that Menu list is prompted for user selection with 2 Mesage Line and 4 Menu items.");
			spec.addStep("Select myMenu2 menu from the list");
			spec.addExpectation("Observe that status:success, choice:myMenu2 send with callback function.");
			spec.displayScenario();
            spec.waitForButtonPressing("Run test");
			var openCBTriggered = false;
			var promptMenuCBTriggered = false;
			var cbResult;
			var promptMenuCB = function(data){
				spec.addResult("Status : ", data.status);
				spec.addResult("Choice : ", data.choice);
				cbResult = data;
				promptMenuCBTriggered = true;
			};
			runs(function(){
				var openCB = function(){
					openCBTriggered = true;
				};
				Rho.MobilePayment.open(paymentDeviceName, openCB);
			});
			waitsFor(function(){
				return openCBTriggered;
			},"wait for open callback trigger",25000);
			runs(function(){
				var param = {
					"messageLine1":"Message1",
	            	"messageLine2":"Message2",
	            	"choice1":"myMenu1",
	            	"choice2":"myMenu2",
	            	"choice3":"myMenu3",
	            	"choice4":"myMenu4",
	            	"timeout":10000
				};
				Rho.MobilePayment.promptMenu(param, promptMenuCB);
			});
			waitsFor(function(){
				return promptMenuCBTriggered;
			},"wait for prompt callback", 15000);
			runs(function(){
				expect(cbResult.status).toEqual("success");
				expect(cbResult.choice).toEqual("myMenu2");
				
			});
		});

		//Should prompt for Menu when below given paramters are called with promptMenu() and send back proper status with the callback
		//Access : ```Rho.MobilePayment.promptMenu({"messageLine1":"Message1","messageLine2":"","choice1":"myMenu1","choice2":"myMenu2","timeout":3000,"deviceIndex":1})
		//Callback : mandatory
		//Callback Parameters (Hash) : ```{"status":"success","choice":"myMenu2","errorName":""}```
		it("Should prompt menu with only one message line.", function(){
			var spec = new ManualSpec(jasmine, window.document);
			spec.addGoal("Should prompt Menu list with the payment device.");
			spec.addPrecondition("Payment device is paired with bluetooth to the device.");
			spec.addStep("Press 'RunTest' button");
			spec.addStep("Observe that Menu list is prompted for user selection with 1 Mesage Line.");
			spec.addStep("Select myMenu2 menu from the list");
			spec.addExpectation("This is semi-auto test !");
			spec.displayScenario();
            spec.waitForButtonPressing("Run test");
			var openCBTriggered = false;
			var promptMenuCBTriggered = false;
			var cbResult;
			var promptMenuCB = function(data){
				spec.addResult("Status : ", data.status);
				spec.addResult("Choice : ", data.choice);
				cbResult = data;
				promptMenuCBTriggered = true;
			};
			runs(function(){
				var openCB = function(){
					openCBTriggered = true;
				};
				Rho.MobilePayment.open(paymentDeviceName, openCB);
			});
			waitsFor(function(){
				return openCBTriggered;
			},"wait for open callback trigger",25000);
			runs(function(){
				var param = {
					"messageLine1":"Message1",
	            	"messageLine2":"",
	            	"choice1":"myMenu1",
	            	"choice2":"myMenu2",
	            	"timeout":10000
				};
				Rho.MobilePayment.promptMenu(param, promptMenuCB);
			});
			waitsFor(function(){
				return promptMenuCBTriggered;
			},"wait for prompt callback", 15000);
			runs(function(){
				expect(cbResult.status).toEqual("success");
				expect(cbResult.choice).toEqual("myMenu2");
				
			});
		});

		//Should prompt for Menu when below given paramters are called with promptMenu() and send back proper status with the callback
		//Access : ```Rho.MobilePayment.promptMenu({"messageLine1":"","messageLine2":"","choice1":"myMenu1","choice2":"myMenu2","timeout":3000,"deviceIndex":1})
		//Callback : mandatory
		//Callback Parameters (Hash) : ```{"status":"success","choice":"myMenu2","errorId":"","description":""}```
		it("Should prompt menu in the paymentDevice with no Message Line", function(){
			var spec = new ManualSpec(jasmine, window.document);
			spec.addGoal("Should prompt Menu list with the payment device.");
			spec.addPrecondition("Payment device is paired with bluetooth to the device.");
			spec.addStep("Press 'RunTest' button");
			spec.addStep("Observe that Menu list is prompted for user selection with  no Mesage Line.");
			spec.addStep("Select myMenu2 menu from the list");
			spec.addExpectation("Semi auto test case to check callback is triggered with status:success, choice:myMenu2,errorId:'' and description:'' send with callback function.");
			spec.displayScenario();
            spec.waitForButtonPressing("Run test");
			var openCBTriggered = false;
			var promptMenuCBTriggered = false;
			var cbResult;
			var promptMenuCB = function(data){
				spec.addResult("Status : ", data.status);
				spec.addResult("Choice : ", data.choice);
				cbResult = data;
				promptMenuCBTriggered = true;
			};
			runs(function(){
				var openCB = function(){
					openCBTriggered = true;
				};
				Rho.MobilePayment.open(paymentDeviceName, openCB);
			});
			waitsFor(function(){
				return openCBTriggered;
			},"wait for open callback trigger",25000);
			runs(function(){
				var param = {
					"messageLine1":"",
	            	"messageLine2":"",
	            	"choice1":"myMenu1",
	            	"choice2":"myMenu2",
	            	"timeout":10000
				};
				Rho.MobilePayment.promptMenu(param, promptMenuCB);
			});
			waitsFor(function(){
				return promptMenuCBTriggered;
			},"wait for prompt callback", 15000);
			runs(function(){
				expect(cbResult.status).toEqual("success");
				expect(cbResult.choice).toEqual("myMenu2");
				
			});
		});

		//Should not prompt for Menu when below given paramters are called with promptMenu() and send back proper status with the callback
		//Access : ```Rho.MobilePayment.promptMenu({"messageLine1":"","messageLine2":"","choice1":"","choice2":"","timeout":3000,"deviceIndex":1})
		//Callback : mandatory
		//Callback Parameters (Hash) : ```{"status":"error","choice":"","errorId":4,"description":"INVALID_VALUE"}```
		it("Should not prompt menu when no parameters are sent with the \"promptMenu()\" method", function(){
			var spec = new ManualSpec(jasmine, window.document);
			spec.addGoal("Should not prompt Menu list when promptMenu called with null parameters.");
			spec.addPrecondition("Payment device is paired with bluetooth to the device.");
			spec.addStep("Press 'RunTest' button");
			spec.addExpectation("Observe that Menu list is not prompted.");
			spec.addExpectation("Semi auto test case to check callback is triggered with parameters 'status':'error','errorName':'INVALID_VALUE'}");
			spec.displayScenario();
            spec.waitForButtonPressing("Run test");
			var openCBTriggered = false;
			var promptMenuCBTriggered = false;
			var cbResult;
			var promptMenuHandler = {
				promptMenuCB:function(data){
					cbResult = data;
					promptMenuCBTriggered = true;
				}
			};
			runs(function(){
				var openCB = function(){
					openCBTriggered = true;
				};
				Rho.MobilePayment.open(paymentDeviceName, openCB);
			});
			waitsFor(function(){
				return openCBTriggered;
			},"wait for open callback trigger",25000);
			runs(function(){
				var param = {
					"messageLine1":"",
	            	"messageLine2":"",
	            	"choice1":"",
	            	"choice2":"",
	            	"timeout":10000
				};
				Rho.MobilePayment.promptMenu(param, promptMenuHandler.promptMenuCB);
			});
			waitsFor(function(){
				return promptMenuCBTriggered;
			},"wait for prompt callback", 15000);
			runs(function(){
				expect(cbResult.status).toEqual("error");
				expect(cbResult.errorName).toEqual("INVALID_VALUE");
			});
		});

		//Should send back proper status with the callback when no menu is selected and enter key is pressed
		//Access : ```Rho.MobilePayment.promptMenu({"messageLine1":"Message1","messageLine2":"Message2","choice1":"myMenu1","choice2":"myMenu2","timeout":3000,"deviceIndex":1})
		//Callback : mandatory
		//Callback Parameters (Hash) : ```{"status":"error","choice":"","errorId":18,"description":"ENTER_KEY_PRESSED"}```
		it("Should send proper error status with the callback when enter key is pressed instead of selecting any menu item.", function(){
			var spec = new ManualSpec(jasmine, window.document);
			spec.addGoal("Should send status:error errorName:OK_KEY_PRESSED with the callback by pressing entery key with the device in promptMenu.");
			spec.addPrecondition("Payment device is paired with bluetooth to the device.");
			spec.addStep("Press 'RunTest' button");
			spec.addExpectation("Press Enter/Ok key instead of selecting any menu item from the list.");
			spec.addExpectation("Semi auto test case to check callback is triggered with parameters 'status':'error','errorName':'OK_KEY_PRESSED'}");
			spec.displayScenario();
            spec.waitForButtonPressing("Run test");
			var openCBTriggered = false;
			var promptMenuCBTriggered = false;
			var cbResult;
			var promptMenuHandler = {
				promptMenuCB:function(data){
					cbResult = data;
					promptMenuCBTriggered = true;
				}
			};
			runs(function(){
				var openCB = function(){
					openCBTriggered = true;
				};
				Rho.MobilePayment.open(paymentDeviceName, openCB);
			});
			waitsFor(function(){
				return openCBTriggered;
			},"wait for open callback trigger",25000);
			runs(function(){
				var param = {
					"messageLine1":"Dont select Menu",
	            	"messageLine2":"Press Enter/Ok key",
	            	"choice1":"myMenu1",
	            	"choice2":"myMenu2",
	            	"timeout":10000
				};
				Rho.MobilePayment.promptMenu(param, promptMenuHandler.promptMenuCB);
			});
			waitsFor(function(){
				return promptMenuCBTriggered;
			},"wait for prompt callback", 15000);
			runs(function(){
				expect(cbResult.status).toEqual("error");
				expect(cbResult.errorName).toEqual("OK_KEY_PRESSED");
			});
		});

		//Should send back proper status with the callback when no menu is selected and cancel key is pressed
		//Access : ```Rho.MobilePayment.promptMenu({"messageLine1":"Message1","messageLine2":"Message2","choice1":"myMenu1","choice2":"myMenu2","timeout":3000,"deviceIndex":1})
		//Callback : mandatory
		//Callback Parameters (Hash) : ```{"status":"error","errorName":"CANCEL_KEY_PRESSED"}```
		it("Should send proper error status with the callback when cancel key is pressed instead of selecting any menu item.", function(){
			var spec = new ManualSpec(jasmine, window.document);
			spec.addGoal("Should send status:error errorName:CANCEL_KEY_PRESSED with the callback by pressing entery key with the device in promptMenu.");
			spec.addPrecondition("Payment device is paired with bluetooth to the device.");
			spec.addStep("Press 'RunTest' button");
			spec.addExpectation("Press Cancel key instead of selecting any menu item from the list.");
			spec.addExpectation("Semi auto test case to check callback is triggered with parameters 'status':'error','errorName':'CANCEL_KEY_PRESSED'}");
			spec.displayScenario();
            spec.waitForButtonPressing("Run test");
			var openCBTriggered = false;
			var promptMenuCBTriggered = false;
			var cbResult;
			var promptMenuHandler = {
				promptMenuCB:function(data){
					cbResult = data;
					promptMenuCBTriggered = true;
				}
			};
			runs(function(){
				var openCB = function(){
					openCBTriggered = true;
				};
				Rho.MobilePayment.open(paymentDeviceName, openCB);
			});
			waitsFor(function(){
				return openCBTriggered;
			},"wait for open callback trigger",25000);
			runs(function(){
				var param = {
					"messageLine1":"Dont select Menu",
	            	"messageLine2":"Press Cancel key",
	            	"choice1":"myMenu1",
	            	"choice2":"myMenu2",
	            	"timeout":10000
				};
				Rho.MobilePayment.promptMenu(param, promptMenuHandler.promptMenuCB);
			});
			waitsFor(function(){
				return promptMenuCBTriggered;
			},"wait for prompt callback", 15000);
			runs(function(){
				expect(cbResult.status).toEqual("error");
				expect(cbResult.errorName).toEqual("CANCEL_KEY_PRESSED");
			});
		});

		//Should throw proper exception when no callback is passed withe the promptMenu() method.
		//Access : ```Rho.MobilePayment.promptMenu({},null);
		it("Should throw proper exception when no callback is passed with the \"promptMenu()\" method.", function(){
			var spec = new ManualSpec(jasmine, window.document);
			spec.addGoal("Should throw proper exception when no callback is passed with the promptMenu() method.");
			spec.addPrecondition("Payment device is paired with bluetooth to the device.");
			spec.addStep("Press 'RunTest' button");
			spec.addExpectation("This is semi auto test case");
			spec.displayScenario();
            spec.waitForButtonPressing("Run test");
			var openCBTriggered = false;
			var errThrown;
			runs(function(){
				var openCB = function(){
					openCBTriggered = true;
				};
				Rho.MobilePayment.open(paymentDeviceName, openCB);
			});
			waitsFor(function(){
				return openCBTriggered;
			},"wait for open callback trigger",25000);
			runs(function(){
				try{
					Rho.MobilePayment.promptMenu();
				}
				catch(err){
					errThrown = err;
				}
			});
			waitsFor(function(){
        			return errThrown != undefined;
        		},"waitsFor timeout", 6000);
			runs(function(){
				expect(errThrown).toEqual("Wrong number of arguments"); // proper exception message to be compared with.
			});
		});

		//Should send back proper status with the callback when device is not opened before executing the method promptMenu()
		//Access : ```Rho.MobilePayment.promptMenu({"messageLine1":"Message1","messageLine2":"Message2","choice1":"myMenu1","choice2":"myMenu2","timeout":3000,"deviceIndex":1})
		//Callback : mandatory
		//Callback Parameters (Hash) : ```{"status":"error","errorName":"DEVICE_NOT_ENABLED"}```
		it("Should send proper error status with the callback when \"promptMenu()\" method called before opening the device.", function(){
			var spec = new ManualSpec(jasmine, window.document);
			spec.addGoal("Should send errorId:18 description:ENER_KEY_PRESSED with the callback by pressing entery key with the device in promptMenu.");
			spec.addPrecondition("Ensure Payment device is not paired with bluetooth to the device.");
			spec.addStep("Press 'RunTest' button");
			spec.addExpectation("Press Cancel key instead of selecting any menu item from the list.");
			spec.addExpectation("Semi auto test case to check callback is triggered with parameters 'status':'error','errorName':'DEVICE_NOT_ENABLED'}");
			spec.displayScenario();
            spec.waitForButtonPressing("Run test");
			var closeCBTriggered = false;
			var promptMenuCBTriggered = false;
			var cbResult;
			var promptMenuHandler = {
				promptMenuCB:function(data){
					cbResult = data;
					promptMenuCBTriggered = true;
				}
			};
			runs(function(){
				var closeCB = function(){
					closeCBTriggered = true;
				};
				Rho.MobilePayment.close(closeCB);
			});
			waitsFor(function(){
				return closeCBTriggered;
			},"wait for close callback trigger",25000);
			runs(function(){
				var param = {
					"messageLine1":"Menu items",
	            	"messageLine2":"Select any Menu",
	            	"choice1":"myMenu1",
	            	"choice2":"myMenu2",
	            	"timeout":10000,
	            	"deviceIndex":1
				};
				Rho.MobilePayment.promptMenu(param, promptMenuHandler.promptMenuCB);
			});
			waitsFor(function(){
				return promptMenuCBTriggered;
			},"wait for prompt callback", 15000);
			runs(function(){
				expect(cbResult.status).toEqual("error");
				expect(cbResult.errorName).toEqual("DEVICE_NOT_ENABLED");
			});
		});

		//Should support method promptAdditionalInfo()
		//Should display the additionalInformation message with the payment device.
		//Access : ```Rho.MobilePayment.promptAdditionalInfo({})```
		//Parameters : Hash : {"amount":10.00,"langCode":0,"promptForTip":true,"cashBack":false,"surcharge":10.00,"timeout":3000}
		//Callback : Hash : {"status":true,"errorId":"","description":"","tip":10.00,"cashBack":0,"surchargeIndicator":""}
		it("Should support \"promptAdditionalInfo()\" method with the paymentDevice object, to prompt/show for amount and tip information", function(){
			var spec = new ManualSpec(jasmine, window.document);
			spec.addGoal("Should prompt additional information to confirm the amount passed by the application and request for the tip amount");
			spec.addPrecondition("Payment device is paired with bluetooth to the device.");
			spec.addStep("Press 'RunTest' button");
			spec.addStep("Prompt to enter tip amount is shown in the device");
			spec.addStep("Enter value '10.00' in the above prompt");
			spec.addExpectation("Observe that additional information with amount and tip amount is displayed with the payment device and callback is triggered with paramter {'status':true,'errorId':'','description':'','tip':10.00,'cashBack':0,'surchargeIndicator':''}");
			spec.displayScenario();
            spec.waitForButtonPressing("Run test");
			var openCBTriggered = false;
			var promptAddInfoCBTriggered = false;
			var promptAddInfoHandler = {
				promptAddInfoCB:function(data){
					spec.addResult("Status : ", data.status);
					spec.addResult("ErrorName : ", data.errorName);
					spec.addResult("Tip you entered : ", data.tip);
					spec.addResult("CashBack : ", data.cashBack);
					spec.addResult("SurchargeIndicator : ", data.surchargeIndicator);
					promptAddInfoCBTriggered=true;
				}
			};
			runs(function(){
				var openCB = function(){
					openCBTriggered = true;
				};
				Rho.MobilePayment.open(paymentDeviceName, openCB);
			});
			waitsFor(function(){
				return openCBTriggered;
			},"wait for open callback trigger",25000);
			runs(function(){
				var param = {
					"amount":10.00,
	            	"langCode":0,
	            	"promptForTip":true,
	            	"cashBack":false,
	            	"surcharge":10.00,
	            	"timeout":10000
				};
				Rho.MobilePayment.promptAdditionalInfo(param, promptAddInfoHandler.promptAddInfoCB);
			});
			waitsFor(function(){
				return promptAddInfoCBTriggered;
			},"wait for prompt callback", 15000);
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
			spec.addStep("Select $20.");
			spec.addExpectation("Observe that additional information with amount and cashback amount is displayed with the payment device and callback is triggered with paramter {'status':true,'errorId':'','description':'','tip':0,'cashBack':20.0,'surchargeIndicator':''}");
			spec.displayScenario();
            spec.waitForButtonPressing("Run test");
			var openCBTriggered = false;
			var promptAddInfoCBTriggered = false;
			var promptAddInfoHandler = {
				promptAddInfoCB:function(data){
					spec.addResult("Status : ", data.status);
					spec.addResult("ErrorName : ", data.errorName);
					spec.addResult("Tip : ", data.tip);
					spec.addResult("CashBack should be $20.00 : ", data.cashBack);
					spec.addResult("SurchargeIndicator : ", data.surchargeIndicator);
					promptAddInfoCBTriggered=true;
				}
			};
			runs(function(){
				var openCB = function(){
					openCBTriggered = true;
				};
				Rho.MobilePayment.open(paymentDeviceName, openCB);
			});
			waitsFor(function(){
				return openCBTriggered;
			},"wait for open callback trigger",25000);
			runs(function(){
				var param = {
					"amount":10.00,
	            	"langCode":0,
	            	"promptForTip":false,
	            	"cashBack":true,
	            	"surcharge":10.00,
	            	"timeout":10000
				};
				Rho.MobilePayment.promptAdditionalInfo(param, promptAddInfoHandler.promptAddInfoCB);
			});
			waitsFor(function(){
				return promptAddInfoCBTriggered;
			},"wait for prompt callback", 15000);
			runs(function(){
				spec.displayResults();
				spec.waitForResponse();
			});
		});

		//Should display the additionalInformation message with the payment device.
		//Access : ```Rho.MobilePayment.promptAdditionalInfo({})```
		//Parameters : Hash : {"amount":100.00,"langCode":0,"promptForTip":false,"cashBack":false,"surcharge":0,"timeout":3000}
		//Callback : Hash : {"status":false,"errorId":8,"description":"DEVICE_NOT_ENABLED"}
		xit("Should not prompt in the payment device and should trigger callback with proper error status, when payment device is not paired with device", function(){
			var spec = new ManualSpec(jasmine, window.document);
			spec.addGoal("Should prompt additional information to confirm the amount passed by the application.");
			spec.addPrecondition("Payment device is not opened with bluetooth to the device.");
			spec.addStep("Press 'RunTest' button");
			spec.addExpectation("Check that no prompt is shown with the payment device and callback is triggered with the param {'status':'error','errorName':'DEVICE_NOT_ENABLED'}");
			spec.displayScenario();
            spec.waitForButtonPressing("Run test");
			var closeCBTriggered = false;
			var promptAddInfoCBTriggered = false;
			var cbResult;
			var promptAddInfoHandler = {
				promptAddInfoCB:function(data){
					cbResult = data;
					spec.addResult("Status : ", data.status);
					spec.addResult("Error Name : ", data.errorName);
					spec.addResult("Tip : ", data.tip);
					spec.addResult("CashBack : ", data.cashBack);
					spec.addResult("SurchargeIndicator : ", data.surchargeIndicator);
					promptAddInfoCBTriggered = true;
				}
			};
			runs(function(){
				var closeCB = function(){
					closeCBTriggered = true;
				};
				Rho.MobilePayment.close(closeCB);
			});
			waitsFor(function(){
				return closeCBTriggered;
			},"wait for close callback trigger",25000);
			runs(function(){
				var param = {
					"amount":10.00,
	            	"langCode":0,
	            	"promptForTip":false,
	            	"cashBack":true,
	            	"surcharge":10.00,
	            	"timeout":10000
				};
				Rho.MobilePayment.promptAdditionalInfo(param, promptAddInfoHandler.promptAddInfoCB);
			});
			waitsFor(function(){
				return promptAddInfoCBTriggered;
			},"wait for prompt callback", 15000);
			runs(function(){
				expect(cbResult.status).toEqual("error");
				expect(cbResult.errorName).toEqual("DEVICE_NOT_ENABLED");
			});
		});

		//Should send back proper status with the callback when no menu is selected and enter key is pressed
		//Access : ```Rho.MobilePayment.promptAdditionalInfo({"amount":10.00,"langCode":0,"promptForTip":false,"cashBack":false,"surcharge":10.00,"timeout":3000})
		//Callback : mandatory
		//Callback Parameters (Hash) : ```{"status":"error","errorName":"OK_KEY_PRESSED"}```
		xit("Should send proper error status with the callback when enter key is pressed instead of selecting any menu item.", function(){
			var spec = new ManualSpec(jasmine, window.document);
			spec.addGoal("Should not send status:error with the callback by pressing entery key with the device in promptAdditionalInfo.");
			spec.addPrecondition("Payment device is paired with bluetooth to the device.");
			spec.addStep("Press 'RunTest' button");
			spec.addExpectation("Press Enter/OK key with the additional info prompt.");
			spec.addExpectation("Semi auto test case to check callback is triggered with parameters 'status':'success'}");
			spec.displayScenario();
            spec.waitForButtonPressing("Run test");
			var openCBTriggered = false;
			var promptAddInfoCBTriggered = false;
			var cbResult="";
			var promptAddInfoHandler = {
				promptAddInfoCB:function(data){
					cbResult = data;
					promptAddInfoCBTriggered = true;
				}
			};
			runs(function(){
				var openCB = function(){
					openCBTriggered = true;
				};
				Rho.MobilePayment.open(paymentDeviceName, openCB);
			});
			waitsFor(function(){
				return openCBTriggered;
			},"wait for open callback trigger",25000);
			runs(function(){
				var param = {
					"amount":10.00,
	            	"langCode":0,
	            	"promptForTip":false,
	            	"cashBack":false,
	            	"surcharge":10.00,
	            	"timeout":10000
				};
				Rho.MobilePayment.promptAdditionalInfo(param, promptAddInfoHandler.promptAddInfoCB);
			});
			waitsFor(function(){
				return promptAddInfoCBTriggered;
			},"wait for prompt callback", 15000);
			runs(function(){
				expect(cbResult.status).toEqual("success");
			});
		});

		//Should send back proper status with the callback when no menu is selected and cancel key is pressed
		//Access : ```Rho.MobilePayment.promptAdditionalInfo({"amount":10.00,"langCode":0,"promptForTip":false,"cashBack":false,"surcharge":10.00,"timeout":3000})
		//Callback : mandatory
		//Callback Parameters (Hash) : ```{"status":"error","errorName":"OPERATION_CANCELLED"}```
		xit("Should send proper error status with the callback when cancel key is pressed with additional info prompt.", function(){
			var spec = new ManualSpec(jasmine, window.document);
			spec.addGoal("Should send status:error and errorName:CANCEL_KEY_PRESSED with the callback by pressing entery key with the device.");
			spec.addPrecondition("Payment device is paired with bluetooth to the device.");
			spec.addStep("Press 'RunTest' button");
			spec.addStep("Press Cancel key with the additional info prompt.");
			spec.addExpectation("Semi auto test case to check callback is triggered with parameters 'status':'error','errorName':'OPERATION_CANCELLED'}");
			spec.displayScenario();
            spec.waitForButtonPressing("Run test");
			var openCBTriggered = false;
			var promptAddInfoCBTriggered = false;
			var cbResult="";
			var promptAddInfoHandler = {
				promptAddInfoCB:function(data){
					cbResult = data;
					promptAddInfoCBTriggered = true;
				}
			};
			runs(function(){
				var openCB = function(){
					openCBTriggered = true;
				};
				Rho.MobilePayment.open(paymentDeviceName, openCB);
			});
			waitsFor(function(){
				return openCBTriggered;
			},"wait for open callback trigger",25000);
			runs(function(){
				var param = {
					"amount":10.00,
	            	"langCode":0,
	            	"promptForTip":false,
	            	"cashBack":false,
	            	"surcharge":10.00,
	            	"timeout":10000
				};
				Rho.MobilePayment.promptAdditionalInfo(param, promptAddInfoHandler.promptAddInfoCB);
			});
			waitsFor(function(){
				return promptAddInfoCBTriggered;
			},"wait for prompt callback", 15000);
			runs(function(){
				expect(cbResult.status).toEqual("error");
				expect(cbResult.errorName).toEqual("OPERATION_CANCELLED");
			});
		});

		//Should support method promptMessage()
		//Access : ```Rho.MobilePayment.promptMessage()```
		//Param : Hash ({"messageLine1":"","messageLine2":"","messageLine3":"","messageLine4":"","getUserConfirmation":false,"timeout":3000,"deviceIndex":1})
		//Callback : mandatory
		//Callback param : Hash ({"status":"true", "errorId":, "description":""})
		it("Should support \"prompmtMessage()\" method with the paymentDevice object, to prompt message with the payment device.", function(){
			var spec = new ManualSpec(jasmine, window.document);
			spec.addGoal("Should prompt message with the paymentDevice.");
			spec.addPrecondition("Payment device is paired with bluetooth to the device.");
			spec.addPrecondition("Ensure payment device is opened");
			spec.addStep("Press 'RunTest' button.");
			spec.addExpectation("Check that promptMessage is shown with the payment device. and callback is triggered with the param {'status':'success','userConfirmationMessage':''}");
			spec.displayScenario();
            spec.waitForButtonPressing("Run test");
			var openCBTriggered = false;
			var promptMessageCBTriggered = false;
			var promptMessageHandler = {
				promptMessageCB : function(data){
					spec.addResult("Status : ", data.status);
					spec.addResult("Error Name : ", data.errorName);
					spec.addResult("User confirmation : ", data.userConfirmationMessage);
					promptMessageCBTriggered = true;
				}
			};
			runs(function(){
				var openCB = function(){
					openCBTriggered = true;
				};
				Rho.MobilePayment.open(paymentDeviceName, openCB);
			});
			waitsFor(function(){
				return openCBTriggered;
			},"wait for payment device to open", 25000);
			runs(function(){
				var param = {
					"messageLine1":"First Line",
	            	"messageLine2":"Second Line",
	            	"messageLine3":"Third Line",
	            	"messageLine4":"Fourth Line",
	            	"getUserConfirmation":false,
	            	"timeout":10000
				};
				Rho.MobilePayment.promptMessage(param, promptMessageHandler.promptMessageCB);
			});
			waitsFor(function(){
				return promptMessageCBTriggered;
			},"wait for promptMessage Callback", 15000);
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
		it("Should support \"prompmtMessage()\" along with user confirmation with the paymentDevice object, to prompt message with the payment device.", function(){
			var spec = new ManualSpec(jasmine, window.document);
			spec.addGoal("Should prompt message with user confirmation with the paymentDevice.");
			spec.addPrecondition("Payment device is paired with bluetooth to the device.");
			spec.addPrecondition("Ensure payment device is opened");
			spec.addStep("Press 'RunTest' button.");
			spec.addStep("Select positive selection from the confirmation.");
			spec.addExpectation("This is semi-auto test to check that promptMessage is shown with user confirmation with the payment device. and callback is triggered with the param {'status':'success','userConfirmationMessage':'OK'}");
			spec.displayScenario();
            spec.waitForButtonPressing("Run test");
			var openCBTriggered = false;
			var promptMessageCBTriggered = false;
			var cbResult ;
			var promptMessageHandler = {
				promptMessageCB : function(data){
					cbResult = data;
					spec.addResult("Status : ", data.status);
					spec.addResult("Error Name : ", data.errorName);
					spec.addResult("Confirmation selected : ", data.userConfirmationMessage);
					promptMessageCBTriggered = true;
				}
			};
			runs(function(){
				var openCB = function(){
					openCBTriggered = true;
				};
				Rho.MobilePayment.open(paymentDeviceName, openCB);
			});
			waitsFor(function(){
				return openCBTriggered;
			},"wait for payment device to open", 25000);
			runs(function(){
				var param = {
					"messageLine1":"First Line",
	            	"messageLine2":"Second Line",
	            	"messageLine3":"Third Line",
	            	"messageLine4":"Fourth Line",
	            	"getUserConfirmation":true,
	            	"timeout":10000
				};
				Rho.MobilePayment.promptMessage(param, promptMessageHandler.promptMessageCB);
			});
			waitsFor(function(){
				return promptMessageCBTriggered;
			},"wait for promptMessage Callback", 15000);
			runs(function(){
				expect(cbResult.status).toEqual("success");
				expect(cbResult.userConfirmationMessage).toEqual("OK_KEY_PRESSED");
			});
		});

		//Should support method promptMessage() with confirmation Cancel
		//Access : ```Rho.MobilePayment.promptMessage()```
		//Param : Hash ({"messageLine1":"","messageLine2":"","messageLine3":"","messageLine4":"","getUserConfirmation":true,"timeout":3000})
		//Callback : mandatory
		//Callback param : Hash ({"status":"success","userConfirmationMessage":"CANCEL"})
		it("CANCEL-Should support \"prompmtMessage()\" along with user confirmation with the paymentDevice object, to prompt message with the payment device.", function(){
			var spec = new ManualSpec(jasmine, window.document);
			spec.addGoal("Should prompt message with user confirmation with the paymentDevice.");
			spec.addPrecondition("Payment device is paired with bluetooth to the device.");
			spec.addPrecondition("Ensure payment device is opened");
			spec.addStep("Press 'RunTest' button.");
			spec.addStep("Select negative selection from the Message Prompt.");
			spec.addExpectation("Check that promptMessage is shown with user confirmation with the payment device. and callback is triggered with the param {'status':'success','errorName':'','userConfirmationMessage':'CANCEL'}");
			spec.displayScenario();
            spec.waitForButtonPressing("Run test");
			var openCBTriggered = false;
			var promptMessageCBTriggered = false;
			var cbResult = "";
			var promptMessageHandler = {
				promptMessageCB : function(data){
					cbResult = data;
					spec.addResult("Status : ", data.status);
					spec.addResult("Error Name : ", data.errorName);
					spec.addResult("Confirmation selected : ", data.userConfirmationMessage);
					promptMessageCBTriggered = true;
				}
			};
			runs(function(){
				var openCB = function(){
					openCBTriggered = true;
				};
				Rho.MobilePayment.open(paymentDeviceName, openCB);
			});
			waitsFor(function(){
				return openCBTriggered;
			},"wait for payment device to open", 25000);
			runs(function(){
				var param = {
					"messageLine1":"First Line",
	            	"messageLine2":"Second Line",
	            	"messageLine3":"Third Line",
	            	"messageLine4":"Fourth Line",
	            	"getUserConfirmation":true,
	            	"timeout":10000
				};
				Rho.MobilePayment.promptMessage(param, promptMessageHandler.promptMessageCB);
			});
			waitsFor(function(){
				return promptMessageCBTriggered;
			},"wait for promptMessage Callback", 15000);
			runs(function(){
				expect(cbResult.status).toEqual("success");
				expect(cbResult.userConfirmationMessage).toEqual("CANCEL_KEY_PRESSED");
			});
		});

		//Should send proper error status with the callback when timedout without any user interaction with promptMessage()
		//Access : ```Rho.MobilePayment.promptMessage()```
		//Param : Hash ({"messageLine1":"","messageLine2":"","messageLine3":"","messageLine4":"","getUserConfirmation":true,"timeout":3000,"deviceIndex":1})
		//Callback : mandatory
		it("Should send proper error status with the callback when timedout without any user interaction with promptMessage", function(){
			var spec = new ManualSpec(jasmine, window.document);
			spec.addGoal("Should send proper error status with the callback when timedout without any user interaction with promptMessage");
			spec.addPrecondition("Payment device is paired with bluetooth to the device.");
			spec.addPrecondition("Ensure payment device is opened.");
			spec.addStep("Press 'RunTest' button.");
			spec.addExpectation("Semi auto test to check callback is triggered with status:error, errorName:TIMED_OUT");
			spec.displayScenario();
            spec.waitForButtonPressing("Run test");
			var openCBTriggered = false;
			var promptMessageCBTriggered = false;
			var cbResult = "";
			var promptMessageHandler = {
				promptMessageCB : function(data){
					cbResult = data;
					promptMessageCBTriggered = true;
				}
			};
			runs(function(){
				var openCB = function(){
					openCBTriggered = true;
				};
				Rho.MobilePayment.open(paymentDeviceName, openCB);
			});
			waitsFor(function(){
				return openCBTriggered;
			},"wait for payment device to open", 25000);
			runs(function(){
				var param = {
					"messageLine1":"First Line",
	            	"messageLine2":"Second Line",
	            	"messageLine3":"Third Line",
	            	"messageLine4":"Fourth Line",
	            	"getUserConfirmation":true,
	            	"timeout":10000
				};
				Rho.MobilePayment.promptMessage(param, promptMessageHandler.promptMessageCB);
			});
			waitsFor(function(){
				return promptMessageCBTriggered;
			},"wait for promptMessage Callback", 15000);
			runs(function(){
				expect(cbResult.status).toEqual("error");
				expect(cbResult.errorName).toEqual("TIMED_OUT");
			});
		});

		//Should send proper error status with the callback when Enter key is pressed with the payment device when message is prompted.
		//Access : ```Rho.MobilePayment.promptMessage()```
		//Param : Hash ({"messageLine1":"First Line","messageLine2":"Second Line","messageLine3":"Third Line","messageLine4":"Fourth Line","getUserConfirmation":true,"timeout":3000,"deviceIndex":1})
		//Callback : mandatory
		it("FalseOk-Should send proper error status with the callback when timedout without any user interaction with promptMessage", function(){
			var spec = new ManualSpec(jasmine, window.document);
			spec.addGoal("Should send proper error status with the callback when timedout without any user interaction with promptMessage");
			spec.addPrecondition("Payment device is paired with bluetooth to the device.");
			spec.addPrecondition("Ensure payment device is opened.");
			spec.addStep("Press 'RunTest' button.");
			spec.addStep("Press Enter key from the device when prompt message is shown to the user with the device.");
			spec.addExpectation("Semi auto test to check callback is triggered with status:error, errorName:OK_KEY_PRESSED");
			spec.displayScenario();
            spec.waitForButtonPressing("Run test");
			var openCBTriggered = false;
			var promptMessageCBTriggered = false;
			var cbResult = "";
			var promptMessageHandler = {
				promptMessageCB : function(data){
					cbResult = data;
					promptMessageCBTriggered = true;
				}
			};
			runs(function(){
				var openCB = function(){
					openCBTriggered = true;
				};
				Rho.MobilePayment.open(paymentDeviceName, openCB);
			});
			waitsFor(function(){
				return openCBTriggered;
			},"wait for payment device to open", 25000);
			runs(function(){
				var param = {
					"messageLine1":"First Line",
	            	"messageLine2":"Second Line",
	            	"messageLine3":"Third Line",
	            	"messageLine4":"Fourth Line",
	            	"getUserConfirmation":false,
	            	"timeout":10000
				};
				Rho.MobilePayment.promptMessage(param, promptMessageHandler.promptMessageCB);
			});
			waitsFor(function(){
				return promptMessageCBTriggered;
			},"wait for promptMessage Callback", 15000);
			runs(function(){
				expect(cbResult.status).toEqual("success");
			});
		});

		//Should send proper error status with the callback when Cancel key is pressed with the payment device when message is prompted.
		//Access : ```Rho.MobilePayment.promptMessage()```
		//Param : Hash ({"messageLine1":"First Line","messageLine2":"Second Line","messageLine3":"Third Line","messageLine4":"Fourth Line","getUserConfirmation":true,"timeout":3000,"deviceIndex":1})
		//Callback : mandatory
		it("FalseCancel-Should send proper error status with the callback when timedout without any user interaction with promptMessage", function(){
			var spec = new ManualSpec(jasmine, window.document);
			spec.addGoal("Should send proper error status with the callback when timedout without any user interaction with promptMessage");
			spec.addPrecondition("Payment device is paired with bluetooth to the device.");
			spec.addPrecondition("Ensure payment device is opened.");
			spec.addStep("Press 'RunTest' button.");
			spec.addStep("Press Cancel key from the device when prompt message is shown to the user with the device.");
			spec.addExpectation("Semi auto test to check callback is triggered with status:error, errorName:CANCEL_KEY_PRESSED");
			spec.displayScenario();
            spec.waitForButtonPressing("Run test");
			var openCBTriggered = false;
			var promptMessageCBTriggered = false;
			var cbResult = "";
			var promptMessageHandler = {
				promptMessageCB : function(data){
					cbResult = data;
					promptMessageCBTriggered = true;
				}
			};
			runs(function(){
				var openCB = function(){
					openCBTriggered = true;
				};
				Rho.MobilePayment.open(paymentDeviceName, openCB);
			});
			waitsFor(function(){
				return openCBTriggered;
			},"wait for payment device to open", 25000);
			runs(function(){
				var param = {
					"messageLine1":"First Line",
	            	"messageLine2":"Second Line",
	            	"messageLine3":"Third Line",
	            	"messageLine4":"Fourth Line",
	            	"getUserConfirmation":false,
	            	"timeout":10000
				};
				Rho.MobilePayment.promptMessage(param, promptMessageHandler.promptMessageCB);
			});
			waitsFor(function(){
				return promptMessageCBTriggered;
			},"wait for promptMessage Callback", 15000);
			runs(function(){
				expect(cbResult.status).toEqual("success");
			});
		});

		//Should support method abort() to cancel the previously issued method to paymentDevice
		xit("Should support \"abort()\" method with the paymentDevice object, to stop the previously given command to payment device.", function(){
			var spec = new ManualSpec(jasmine, window.document);
			spec.addGoal("Should abort the previously given promptPin method");
			spec.addPrecondition("Payment device is paired with bluetooth to the device.");
			spec.addStep("Press 'RunTest' button.");
			spec.addExpectation("Check that payment device did not prompt for Pin.");
			spec.displayScenario();
            spec.waitForButtonPressing("Run test");
			var openCBTriggered = false;
			var promptMessageCBTriggered = false;
			var wait;
			var promptMessageHandler = {
				promptMessageCB : function(data){
					promptMessageCBTriggered = true;
				}
			};
			runs(function(){
				var openCB = function(){
					openCBTriggered = true;
				};
				Rho.MobilePayment.open(paymentDeviceName, openCB);
			});
			waitsFor(function(){
				return openCBTriggered;
			},"wait for payment device to open", 25000);
			runs(function(){
				var promptPinHandler = {
					promptPinCB : function(data){
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
						"readTimeOut":10000
					};
				spyOn(promptPinHandler, 'promptPinCB');
				Rho.MobilePayment.promptPin(param, promptPinHandler.promptPinCB);
				Rho.MobilePayment.abort(abortCB);
			});
			waitsFor(function(){
            	 setTimeout(function(){ wait=true;}, 13000);
            	 return wait == true;
            },"waitsFor timeout",15000);
            runs(function(){
            	expect(promptPinHandler.promptPinCB).not.toHaveBeenCalled();
            });
		});
		
		//should support for method getting the battery level
		it("Should support for method getBatteryLevel, for getting the battery level of the payment device.", function(){
			var spec = new ManualSpec(jasmine, window.document);
			spec.addGoal("Should support for method getBatteryLevel, for getting the battery level of the payment device.");
			spec.addPrecondition("Payment device is paired with bluetooth to the device.");
			spec.addStep("Press 'RunTest' button.");
			spec.addExpectation("Battery level of the payment device is retrieved successfully and should be integer.");
			spec.displayScenario();
            spec.waitForButtonPressing("Run test");
			var openCBTriggered = false;
			runs(function(){
				var openCB = function(){
					openCBTriggered = true;
				};
				Rho.MobilePayment.open(paymentDeviceName, openCB);
			});
			waitsFor(function(){
				return openCBTriggered;
			}, "Waits for device to open", 10000);
			runs(function(){
				var data = Rho.MobilePayment.getBatteryLevel();
				spec.addResult("Battery Level : ", data.batteryLevel);
				spec.displayResults();
				spec.waitForResponse();
			});
		});
		it("Should get the battery level of the payment device even if it is not opened.", function(){
			var spec = new ManualSpec(jasmine, window.document);
			spec.addGoal("Should get the battery level of the payment device even if it is not opened");
			spec.addPrecondition("Payment device is paired with bluetooth to the device.");
			spec.addStep("Press 'RunTest' button.");
			spec.addExpectation("Battery level of the payment device is retrieved successfully and should be integer.");
			spec.displayScenario();
            spec.waitForButtonPressing("Run test");
            var closeCBTriggered=false;
			var closeCB = function(){
				console.log("closeCB: triggered");
				closeCBTriggered=true;
			};
			runs(function(){
				Rho.MobilePayment.close(closeCB);
			});
			waitsFor(function(){
            	 return closeCBTriggered;
            },"wait for Mobile Payment device to close",10000);
			runs(function(){
				var data = Rho.MobilePayment.getBatteryLevel();
				expect(data.status).toEqual("error");
				expect(data.errorName).toEqual("DEVICE_NOT_ENABLED");
			});
		});
		it("Should get the threshold value of the low battery level using method getLowBatteryThreshold().", function(){
			var spec = new ManualSpec(jasmine, window.document);
			spec.addGoal("Should get the threshold value of the LowBattery level.");
			spec.addPrecondition("Payment device is paired with bluetooth to the device.");
			spec.addStep("Press 'RunTest' button.");
			spec.addExpectation("LowBatteryThreshold value of the payment device is retrieved successfully.");
			spec.displayScenario();
            spec.waitForButtonPressing("Run test");
            var openCBTriggered = false;
			runs(function(){
				var openCB = function(){
					openCBTriggered = true;
				};
				Rho.MobilePayment.open(paymentDeviceName, openCB);
			});
			waitsFor(function(){
				return openCBTriggered;
			}, "Waits for device to open", 10000);
            runs(function(){
            	var data = Rho.MobilePayment.getLowBatteryThreshold();
            	spec.addResult("LowBatteryThreshold : ", data.lowBatteryThreshold);
            	spec.displayResults();
				spec.waitForResponse();
            });

		});
		it("Should throw proper error status while getting lowBatteryThreshold value of payment device, when not opened", function(){
			var spec = new ManualSpec(jasmine, window.document);
			spec.addGoal("Should return proper error status while getting lowBatteryThreshold value when device is not opened.");
			spec.addPrecondition("Payment device is paired with bluetooth to the device.");
			spec.addStep("Press 'RunTest' button.");
			spec.addExpectation("Proper error status is returned.");
			spec.displayScenario();
            spec.waitForButtonPressing("Run test");
            var closeCBTriggered=false;
			var closeCB = function(){
				console.log("closeCB: triggered");
				closeCBTriggered=true;
			};
			runs(function(){
				Rho.MobilePayment.close(closeCB);
			});
			waitsFor(function(){
            	 return closeCBTriggered;
            },"wait for Mobile Payment device to close",10000);
            runs(function(){
            	var data = Rho.MobilePayment.getLowBatteryThreshold();
            	expect(data.status).toEqual("error");
            	expect(data.errorName).toEqual("DEVICE_NOT_ENABLED");
            	expect(data.lowBatteryThreshold).toEqual("");
            });
		});
		it("Should set the threshold value for the low battery level using method setLowBatteryThreshold().", function(){
			var spec = new ManualSpec(jasmine, window.document);
			spec.addGoal("Should set the threshold value for the low battery level using method setLowBatteryThreshold().");
			spec.addPrecondition("Payment device is paired with bluetooth to the device.");
			spec.addStep("Press 'RunTest' button.");
			spec.addExpectation("This is semi-auto to test for setting LowBattery threshold value to the payment device successfully.");
			spec.displayScenario();
            spec.waitForButtonPressing("Run test");
			var openCBTriggered = false;
			runs(function(){
				var openCB = function(){
					openCBTriggered = true;
				};
				Rho.MobilePayment.open(paymentDeviceName, openCB);
			});
			waitsFor(function(){
				return openCBTriggered;
			}, "Waits for device to open", 10000);
			runs(function(){
				var data = Rho.MobilePayment.setLowBatteryThreshold(1, "Battery Low");
				expect(data.status).toEqual("success");
				var lData = Rho.MobilePayment.getLowBatteryThreshold();
				expect(lData.lowBatteryThreshold).toEqual(1);
			});
		});
		it("Should set the threshold value for the low battery level, when the device is not opened.", function(){
			var spec = new ManualSpec(jasmine, window.document);
			spec.addGoal("Should return proper error status while setting lowBatteryThreshold value when device is not opened.");
			spec.addPrecondition("Payment device is paired with bluetooth to the device.");
			spec.addStep("Press 'RunTest' button.");
			spec.addExpectation("Proper error status is returned.");
			spec.displayScenario();
            spec.waitForButtonPressing("Run test");
            var closeCBTriggered=false;
			var closeCB = function(){
				console.log("closeCB: triggered");
				closeCBTriggered=true;
			};
			runs(function(){
				Rho.MobilePayment.close(closeCB);
			});
			waitsFor(function(){
            	 return closeCBTriggered;
            },"wait for Mobile Payment device to close",10000);
            runs(function(){
            	var oldData = Rho.MobilePayment.getLowBatteryThreshold();
            	var data = Rho.MobilePayment.setLowBatteryThreshold(2, "battery low");
            	var newData = Rho.MobilePayment.getLowBatteryThreshold();
            	expect(data.status).toEqual("error");
            	expect(data.errorName).toEqual("DEVICE_NOT_ENABLED");
            	expect(oldData.lowBatteryThreshold).toEqual(newData.lowBatteryThreshold);
            });
		});

		it("Try to set invalid value to lowBatteryThreshold to the payment device.", function(){
			var spec = new ManualSpec(jasmine, window.document);
			spec.addGoal("Try to set invalid value to lowBatteryThreshold to the payment device.");
			spec.addPrecondition("Payment device is paired with bluetooth to the device.");
			spec.addStep("Press 'RunTest' button.");
			spec.addExpectation("Proper error status is returned.");
			spec.displayScenario();
            spec.waitForButtonPressing("Run test");
            var openCBTriggered = false;
			runs(function(){
				var openCB = function(){
					openCBTriggered = true;
				};
				Rho.MobilePayment.open(paymentDeviceName, openCB);
			});
			waitsFor(function(){
				return openCBTriggered;
			}, "Waits for device to open", 10000);
            runs(function(){
            	var oldData = Rho.MobilePayment.getLowBatteryThreshold();
            	var data = Rho.MobilePayment.setLowBatteryThreshold(10, "Invalid value");
            	var newData = Rho.MobilePayment.getLowBatteryThreshold();
            	expect(data.status).toEqual("error");
            	expect(data.errorName).toEqual("INVALID_VALUE");
            	expect(oldData.batteryLevel).toEqual(newData.batteryLevel);
            });
		});
		it("Try to perfrom readCardData when the battery level is less than LowBatteryThreshold.", function(){
			var spec = new ManualSpec(jasmine, window.document);
			spec.addGoal("Try to perfrom readCardData when the battery level is less than LowBatteryThreshold.");
			spec.addPrecondition("Payment device is paired with bluetooth to the device.");
			spec.addStep("Press 'RunTest' button.");
			spec.addExpectation("This is semi-auto test to check, proper error message when battery is below threshold.");
			spec.displayScenario();
            spec.waitForButtonPressing("Run test");
			var result = false;
			var openCBTriggered = false;
			var cbResult = "";
			var readCBTriggered = false;
			runs(function(){
				var openCB = function(){
					openCBTriggered = true;
				};
				Rho.MobilePayment.open(paymentDeviceName, openCB);
			});
			waitsFor(function(){
				return openCBTriggered;
			}, "Waits for device to open", 10000);
			runs(function(){
				var batLevelData = Rho.MobilePayment.getBatteryLevel();
				var data = Rho.MobilePayment.setLowBatteryThreshold((batLevelData.batteryLevel) + 1, "battery Low");
				if(data.status == "success"){
					result = true;
				}
			});
			waitsFor(function(){
				return result;
			}, "Wait for setting lowbattery threshold", 5000);
			runs(function(){
				var params = {};
				var readCBT = function(data){
					cbResult = data;
					readCBTriggered = true;
				};
				var param = {
					"amount":200.00,
					"otherAmount":10.00,
					"readMode":1,			//read mode - Insert for Smart card
					"messageTitle":"Message Title",		//Message Title
					"message1":"This is message 1.",	//Message one
					"message2":"This is message 2.",	//Message two
					"readTimeOut":10000
				};
				
				Rho.MobilePayment.readCardData(param,readCBT);
			});
			waitsFor(function(){
				return readCBTriggered;
			}, "Waits for readCardData", 20000);
			runs(function(){
				expect(cbResult.status).toEqual("error");
				expect(cbResult.errorName).toEqual("LOW_POWER_OPERATION_CANCELLED");
			});
		});

		it("Should support for remove card method.", function(){
			var spec = new ManualSpec(jasmine, window.document);
			spec.addGoal("Should show message to remove smartCard from the payment Device.");
			spec.addPrecondition("Payment device is paired with bluetooth to the device.");
			spec.addStep("Press 'RunTest' button.");
			spec.addStep("Insert Smart card in to the payment device");
			spec.addExpectation("Observe that remove smartCard message is shown to the user in the payment device.");
			spec.displayScenario();
            spec.waitForButtonPressing("Run test");
            var openCBTriggered = false;
			runs(function(){
				var openCB = function(){
					openCBTriggered = true;
				};
				Rho.MobilePayment.open(paymentDeviceName, openCB);
			});
			waitsFor(function(){
				return openCBTriggered;
			}, "Waits for device to open", 10000);
        	runs(function(){
        		var data = Rho.MobilePayment.removeCard("Message1", "Message2");
        		expect(data.status).toEqual("success");
        	});
		});

		it("Should send proper error status, when tried to remove card when no card inserted", function(){
			var spec = new ManualSpec(jasmine, window.document);
			spec.addGoal("Should show message to remove smartCard from the payment Device.");
			spec.addPrecondition("Payment device is paired with bluetooth to the device.");
			spec.addStep("Press 'RunTest' button.");
			spec.addStep("Do not insert smart card in to the payment device");
			spec.addExpectation("Observe that remove smartCard message is not shown to the user in the payment device and proper error status is returned.");
			spec.displayScenario();
            spec.waitForButtonPressing("Run test");
            var openCBTriggered = false;
			runs(function(){
				var openCB = function(){
					openCBTriggered = true;
				};
				Rho.MobilePayment.open(paymentDeviceName, openCB);
			});
			waitsFor(function(){
				return openCBTriggered;
			}, "Waits for device to open", 10000);
        	runs(function(){
        		var data = Rho.MobilePayment.removeCard("Message1", "Message2");
        		expect(data.status).toEqual("error");
        		expect(data.errorName).toEqual("CARD_REMOVED");
        	});
		});

		it("Remove Card at the callback of readCardData.", function(){
			var spec = new ManualSpec(jasmine, window.document);
			spec.addGoal("Remove card at the callback of readCardData.");
			spec.addPrecondition("Payment device is paired with bluetooth to the device.");
			spec.addStep("Press 'RunTest' button.");
			spec.addStep("Insert smart card in to the slot when prompted in the payment device.");
			spec.addExpectation("Observe that remove smartCard message is shown to the user after successfully reading card.");
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
				Rho.MobilePayment.open(paymentDeviceName, openCB);
			});
			waitsFor(function(){
					return openCBTriggered;
				},"waiting for open callback", 25000);
			runs(function(){
				var param = {
					"amount":200.00,
					"otherAmount":10.00,
					"readMode":1,			//read mode - Insert for Smart card
					"messageTitle":"Message Title",		//Message Title
					"message1":"This is message 1.",	//Message one
					"message2":"This is message 2.",	//Message two
					"readTimeOut":10000
				};
				var readCB = function(data){
					spec.addResult("Status : ", data.status);
					spec.addResult("errorId : ", data.errorId);
					spec.addResult("description :", data.description);
					spec.addResult("accountNumber :", data.accountNumber);
					spec.addResult("cardHolderName :", data.cardHolderName);
					spec.addResult("expiryDate :", data.expiryDate);
					spec.addResult("track1Data :", data.track1Data);
					spec.addResult("track2Data :", data.track2Data);
					spec.addResult("track3Data :", data.track3Data);
					spec.addResult("maskedPan :", data.maskedPan);
					spec.addResult("tlvStrings :", JSON.stringify(data.tlvStrings)); //Specific to EMV tags
					readCBTriggered = true;
				}
				Rho.MobilePayment.readCardData(param,readCB);
			})
			waitsFor(function(){
				return readCBTriggered;
			},"wait for read card data", 25000);
			runs(function(){
				var data = Rho.MobilePayment.removeCard("Message1", "Message2");
        		expect(data.status).toEqual("success");
			});
		});

		it("Should send proper error status when tried to remove card when device is not opened", function(){
			var spec = new ManualSpec(jasmine, window.document);
			spec.addGoal("Should send proper error status when tried to remove card when payment device is not opened.");
			spec.addPrecondition("Payment device is paired with bluetooth to the device.");
			spec.addStep("Press 'RunTest' button.");
			spec.addStep("Insert smart card in to the slot of payment device.");
			spec.addExpectation("Semi-auto test to check proper error status when tried to remove card when device is not opened.");
			spec.displayScenario();
            spec.waitForButtonPressing("Run test");
			var closeCBTriggered=false;
			var closeCB = function(){
				console.log("closeCB: triggered");
				closeCBTriggered=true;
			};
			runs(function(){
				Rho.MobilePayment.close(closeCB);
			});
			waitsFor(function(){
            	 return closeCBTriggered;
            },"wait for Mobile Payment device to close",10000);
            runs(function(){
        		var data = Rho.MobilePayment.removeCard("Message1", "Message2");
        		expect(data.status).toEqual("error");
        		expect(data.errorName).toEqual("DEVICE_NOT_ENABLED");
        	});
		});
		it("Should get the device information from the payment device", function(){
			var spec = new ManualSpec(jasmine, window.document);
			spec.addGoal("Should get the device information from the payment device.");
			spec.addPrecondition("Payment device is paired with bluetooth to the device.");
			spec.addStep("Press 'RunTest' button.");
			spec.addExpectation("Observe that device information of the payment device is displayed successfully.");
			spec.displayScenario();
            spec.waitForButtonPressing("Run test");
            var openCBTriggered = false;
			runs(function(){
				var openCB = function(data){
					openCBTriggered = true;
				};
				Rho.MobilePayment.open(paymentDeviceName, openCB);
			});
			waitsFor(function(){
				return openCBTriggered;
			},"waiting for open callback", 25000);
			runs(function(){
				var devInfo = Rho.MobilePayment.getDeviceInfo();
				spec.addResult("Status : ", devInfo.status);
				spec.addResult("Application Version : ", devInfo.applicationVersion);
				spec.addResult("Firmware Version : ", devInfo.firmwareVersion);
				spec.addResult("Connection Type : ", devInfo.connectiontype);
				spec.addResult("Device Type : ", devInfo.devicetype);
				spec.addResult("Friendly Name : ", devInfo.friendlyname);
				spec.displayResults();
				spec.waitForResponse();
			});
		});
		it("Should send proper error message when tried to call getDeviceInfo when device is not opened.", function(){
			var spec = new ManualSpec(jasmine, window.document);
			spec.addGoal("Should send proper error message when tried to call getDeviceInfo when device is not opened.");
			spec.addPrecondition("Payment device is paired via bluetooth with the device.");
			spec.addStep("Press 'RunTest' button to start the test.");
			spec.addExpectation("This is semi-auto test, to check for the proper error status.");
			spec.displayScenario();
			spec.waitForButtonPressing("Run test");
			var closeCBTriggered=false;
			var closeCB = function(){
				console.log("closeCB: triggered");
				closeCBTriggered=true;
			};
			runs(function(){
				Rho.MobilePayment.close(closeCB);
			});
			waitsFor(function(){
            	 return closeCBTriggered;
            },"wait for Mobile Payment device to close",10000);
            runs(function(){
            	var devInfo = Rho.MobilePayment.getDeviceInfo();
            	expect(devInfo.status).toEqual('error');
            	expect(devInfo.errorName).toEqual('DEVICE_NOT_ENABLED');
            });
		});
		it("Should mac the passed 16 bit hex value successfully.", function(){
			var spec = new ManualSpec(jasmine, window.document);
			spec.addGoal("Should mac the passed 16 bit hex value successfully.");
			spec.addPrecondition("Payment device is paired with bluetooth to the devie.");
			spec.addStep("Press 'Runtest' button to start the test.");
			spec.addExpectation("Observe that the passed 16 bit hex value is maced successfully.");
			spec.displayScenario();
			spec.waitForButtonPressing("Run test");
			var openCBTriggered = false;
			runs(function(){
				var openCB = function(){
					openCBTriggered = true;
				};
				Rho.MobilePayment.open(paymentDeviceName, openCB);
			});
			waitsFor(function(){
				return openCBTriggered;
			}, "waiting for open callback", 25000);
			runs(function(){
				var retData = Rho.MobilePayment.createMac("0123456789ABCDEF");
				spec.addResult("Status : ", retData.status);
				spec.addResult("MacBlock : ", retData.macBlock);
				spec.addResult("ErrorName : ", retData.errorName);
				spec.displayResults();
				spec.waitForResponse();
			});
		});
		it("Should mac the passed 32 bit hex value successfully.", function(){
			var spec = new ManualSpec(jasmine, window.document);
			spec.addGoal("Should mac the passed 32 bit hex value successfully.");
			spec.addPrecondition("Payment device is paired with bluetooth to the devie.");
			spec.addStep("Press 'Runtest' button to start the test.");
			spec.addExpectation("Observe that the passed 32 bit hex value is maced successfully.");
			spec.displayScenario();
			spec.waitForButtonPressing("Run test");
			var openCBTriggered = false;
			runs(function(){
				var openCB = function(){
					openCBTriggered = true;
				};
				Rho.MobilePayment.open(paymentDeviceName, openCB);
			});
			waitsFor(function(){
				return openCBTriggered;
			}, "waiting for open callback", 25000);
			runs(function(){
				var retData = Rho.MobilePayment.createMac("0123456789ABCDEF0123456789ABCDEF");
				spec.addResult("Status : ", retData.status);
				spec.addResult("MacBlock : ", retData.macBlock);
				spec.displayResults();
				spec.waitForResponse();
			});
		});
		it("Should mac the passed 48 bit hex value successfully.", function(){
			var spec = new ManualSpec(jasmine, window.document);
			spec.addGoal("Should mac the passed 48 bit hex value successfully.");
			spec.addPrecondition("Payment device is paired with bluetooth to the devie.");
			spec.addStep("Press 'Runtest' button to start the test.");
			spec.addExpectation("Observe that the passed 48 bit hex value is maced successfully.");
			spec.displayScenario();
			spec.waitForButtonPressing("Run test");
			var openCBTriggered = false;
			runs(function(){
				var openCB = function(){
					openCBTriggered = true;
				};
				Rho.MobilePayment.open(paymentDeviceName, openCB);
			});
			waitsFor(function(){
				return openCBTriggered;
			}, "waiting for open callback", 25000);
			runs(function(){
				var retData = Rho.MobilePayment.createMac("0123456789ABCDEF0123456789ABCDEF0123456789ABCDEF");
				spec.addResult("Status : ", retData.status);
				spec.addResult("MacBlock : ", retData.macBlock);
				spec.displayResults();
				spec.waitForResponse();
			});
		});
		it("Should send proper error status when non hex value is passed to the method createMac.", function(){
			var spec = new ManualSpec(jasmine, window.document);
			spec.addGoal("Should send proper error status when non hex value is passed to the method createMac");
			spec.addPrecondition("Payment device is paired with bluetooth to the devie.");
			spec.addStep("Press 'Runtest' button to start the test.");
			spec.addExpectation("Observe that the proper error status ");
			spec.displayScenario();
			spec.waitForButtonPressing("Run test");
			var openCBTriggered = false;
			runs(function(){
				var openCB = function(){
					openCBTriggered = true;
				};
				Rho.MobilePayment.open(paymentDeviceName, openCB);
			});
			waitsFor(function(){
				return openCBTriggered;
			}, "waiting for open callback", 25000);
			runs(function(){
				var retData = Rho.MobilePayment.createMac("0123456789ABCDEFTHISISNONHEX");
				expect(retData.status).toEqual("error");
				expect(retData.errorName).toEqual("INVALID_MAC_KEY_LENGTH");
			});
		});
		it("Should send proper error status by executing method createMac when device is not opened", function(){
			var spec = new ManualSpec(jasmine, window.document);
			spec.addGoal("Should send proper error status by executing method createMac when device is not opened.");
			spec.addPrecondition("Payment device is paired via bluetooth to the device.");
			spec.addStep("Press 'Runtest' button to start the test.");
			spec.addExpectation("This is semi-auto test, to check proper error status when device is not opened.");
			spec.displayScenario();
			spec.waitForButtonPressing("Run test");
			var closeCBTriggered=false;
			var closeCB = function(){
				console.log("closeCB: triggered");
				closeCBTriggered=true;
			};
			runs(function(){
				Rho.MobilePayment.close(closeCB);
			});
			waitsFor(function(){
            	 return closeCBTriggered;
            },"wait for Mobile Payment device to close",10000);
			runs(function(){
				var retData = Rho.MobilePayment.createMac("0123456789ABCDEF");
				expect(retData.status).toEqual("error");
				expect(retData.errorName).toEqual("DEVICE_NOT_ENABLED");
			});
		});
		it("Should validate the macblock and return the result successfully", function(){
			var spec = new ManualSpec(jasmine, window.document);
			spec.addGoal("Should validate the macblock and return the result successfully");
			spec.addPrecondition("Paymet device is paired via bluetooth to the device.");
			spec.addStep("Press 'Runtest' button to start the test.");
			spec.addExpectation("This is semi-auto test to check for the validation of macblock is successfull.");
			spec.displayScenario();
			spec.waitForButtonPressing("Run test");
			var openCBTriggered = false;
			var validateCBTriggered = false;
			var cbResult;
			var validateCB = function(data){
				cbResult = data;
				validateCBTriggered = true;
			}
			var macBlock = "";
			runs(function(){
				var openCB = function(){
					openCBTriggered = true;
				};
				Rho.MobilePayment.open(paymentDeviceName, openCB);
			});
			waitsFor(function(){
				return openCBTriggered;
			}, "waiting for open callback", 25000);
			runs(function(){
				var retData = Rho.MobilePayment.createMac("0123456789ABCDEF");
				macBlock = retData.macBlock;
				Rho.MobilePayment.validateMac(macBlock, 0, "", "", "message1", "message2", "0123456789ABCDEF", validateCB);
			});
			waitsFor(function(){
				return validateCBTriggered;
			}, "waiting for validate mac", 10000);
			runs(function(){
				expect(cbResult.status).toEqual("success");
			});
		});
		it("MAC-Should send proper error status when macblock does not match, while validating.", function(){
			var spec = new ManualSpec(jasmine, window.document);
			spec.addGoal("Should send proper error status when macblock does not match, while validating.");
			spec.addPrecondition("Payment device should be paired via bluetooth to the device.");
			spec.addStep("Press 'Run test' buton to start the test.");
			spec.addExpectation("This is semi-auto test to check error status when macblock and macdata does not match during validation.");
			spec.displayScenario();
			spec.waitForButtonPressing("Run test");
			var openCBTriggered = false;
			var validateCBTriggered = false;
			var cbResult;
			var validateCB = function(data){
				cbResult = data;
				validateCBTriggered = true;
			}
			var macBlock = "";
			runs(function(){
				var openCB = function(){
					openCBTriggered = true;
				};
				Rho.MobilePayment.open(paymentDeviceName, openCB);
			});
			waitsFor(function(){
				return openCBTriggered;
			}, "waiting for open callback", 25000);
			runs(function(){
				var retData = Rho.MobilePayment.createMac("FEDCBA9876543210");
				macBlock = retData.macBlock; // non - matching mac block.
				Rho.MobilePayment.validateMac(macBlock, 0, "", "", "message1", "message2", "0123456789ABCDEF", validateCB);
			});
			waitsFor(function(){
				return validateCBTriggered;
			}, "waiting for validate mac", 10000);
			runs(function(){
				expect(cbResult.status).toEqual("error");
				expect(cbResult.errorName).toEqual("MAC_VALIDATION_ERROR");
			});
		});
		it("VAL-Should send proper error status when invalid value is passed with method validateMac.", function(){
			var spec = new ManualSpec(jasmine, window.document);
			spec.addGoal("Should send proper error status when invalid parameters are passed to the method validateMac.");
			spec.addPrecondition("Payment device should be paired via bluetooth to the device.");
			spec.addStep("Press 'Run test' button to start the test.");
			spec.addExpectation("This is semi-auto test to check error status when invalid parameters are passed.");
			spec.displayScenario();
			spec.waitForButtonPressing("Run test");
			var openCBTriggered = false;
			var validateCBTriggered = false;
			var cbResult;
			var validateCB = function(data){
				cbResult = data;
				validateCBTriggered = true;
			}
			var macBlock = "";
			runs(function(){
				var openCB = function(){
					openCBTriggered = true;
				};
				Rho.MobilePayment.open(paymentDeviceName, openCB);
			});
			waitsFor(function(){
				return openCBTriggered;
			}, "waiting for open callback", 25000);
			runs(function(){
				var retData = Rho.MobilePayment.createMac("0123456789ABCDEF");
				macBlock = retData.macBlock;
				Rho.MobilePayment.validateMac(macBlock, 0, "", "", "10", "10", "this is invalid", validateCB);
			});
			waitsFor(function(){
				return validateCBTriggered;
			}, "waiting for validate mac", 10000);
			runs(function(){
				expect(cbResult.status).toEqual("error");
				expect(cbResult.errorName).toEqual("INVALID_DATA_LENGTH");
			});
		});
		it("Should send success status when no message is passed with the method validateMac.", function(){
			var spec = new ManualSpec(jasmine, window.document);
			spec.addGoal("Should send success status when no message is passed with the method validateMac");
			spec.addPrecondition("Pyament device should be paired via bluetooth to the device.");
			spec.addStep("Press 'Run test' button to start the test.");
			spec.addExpectation("This is semi-auto test to check validateMac still works even when no message is passed.");
			spec.displayScenario();
			spec.waitForButtonPressing("Run test");
			var openCBTriggered = false;
			var validateCBTriggered = false;
			var cbResult;
			var validateCB = function(data){
				cbResult = data;
				validateCBTriggered = true;
			}
			var macBlock = "";
			runs(function(){
				var openCB = function(){
					openCBTriggered = true;
				};
				Rho.MobilePayment.open(paymentDeviceName, openCB);
			});
			waitsFor(function(){
				return openCBTriggered;
			}, "waiting for open callback", 25000);
			runs(function(){
				var retData = Rho.MobilePayment.createMac("0123456789ABCDEF");
				macBlock = retData.macBlock;
				Rho.MobilePayment.validateMac(macBlock, 0, "", "", "", "", "0123456789ABCDEF", validateCB);
			});
			waitsFor(function(){
				return validateCBTriggered;
			}, "waiting for validate mac", 10000);
			runs(function(){
				expect(cbResult.status).toEqual("success");
			});
		});
		it("Should throw proper exception when callback is not passed with the method validateMac.", function(){
			var spec = new ManualSpec(jasmine, window.document);
			spec.addGoal("Should throw proper exception when callback is not passed with the method validateMac.");
			spec.addPrecondition("Payment device should be paired via bluetooth to the device.");
			spec.addStep("Press 'Run test' button to start the test.");
			spec.addExpectation("This is semi-auto test to check proper exception is thrown when wrong parameters are passed.");
			spec.displayScenario();
			spec.waitForButtonPressing("Run test");
			var openCBTriggered = false;
			var validateCBTriggered = false;
			var errThrown;
			var validateCB = function(data){
				cbResult = data;
				validateCBTriggered = true;
			}
			var macBlock = "";
			runs(function(){
				var openCB = function(){
					openCBTriggered = true;
				};
				Rho.MobilePayment.open(paymentDeviceName, openCB);
			});
			waitsFor(function(){
				return openCBTriggered;
			}, "waiting for open callback", 25000);
			runs(function(){
				var retData = Rho.MobilePayment.createMac("0123456789ABCDEF");
				macBlock = retData.macBlock;
				try{
					Rho.MobilePayment.validateMac(macBlock, 0, "", "", "message1", "message2", "0123456789ABCDEF");
				}catch(err){
					errThrown = err;
				}
			});
			waitsFor(function(){
        			return errThrown != undefined;
        		},"waitsFor timeout", 6000);
			runs(function(){
				expect(errThrown).toEqual("No callback handler provided"); // proper exception message to be compared with.
			});
		});
		it("Should support for the method completeOnlineEmv", function(){
			var spec = new ManualSpec(jasmine, window.document);
			spec.addGoal("Should support for the method completeOnlineEmv.");
			spec.addPrecondition("Payment device is paired via bluetooth with the device");
			spec.addStep("Press 'Run test' button to start the test");
			spec.addExpectation("Observe that success status is retured with the callback");
			spec.displayScenario();
			spec.waitForButtonPressing("Run test");
			var readCardDataTriggered = false;
			var openCBTriggered = false;
			var completeOnlineEmvCBTriggered = false;
			var cbResult;
			var errThrown;
			var completeOnlineEmvCB = function(data){
				cbResult = data;
				spec.addResult("Status : ", cbResult.status);
				spec.addResult("tlvStrings : ", JSON.stringify(cbResult.tlvStrings));
				completeOnlineEmvCBTriggered = true;
			};
			runs(function(){
				var openCB = function(){
					openCBTriggered = true;
				};
				Rho.MobilePayment.open(paymentDevice, openCB);
			});
			waitsFor(function(){
				return openCBTriggered;
			}, "waiting for open callback", 25000);
			runs(function(){
			var param = {
					"amount":200.00,
					"otherAmount":10.00,
					"readMode":1,			//read mode - Insert for Smart card
					"messageTitle":"Message Title",		//Message Title
					"message1":"This is message 1.",	//Message one
					"message2":"This is message 2.",	//Message two
					"readTimeOut":10000
				};
				var readCB = function(data){
					readCardDataTriggered = true;
				};
				Rho.MobilePayment.readCardData(param,readCB);
			});
			waitsFor(function(){
				return readCardDataTriggered;
			}, "waiting for compelteOnlineEmv callback", 25000);
			runs(function(){
			var athcb = function(data){
					authorizecardTriggered = true;
				};
			var val=["9F41","9F02","5F36","9F1B","9F1C","9F35","9F1A"];
			Rho.MobilePayment.authorizeCard(15.0,2.0,0,val,true,false,true,true,10000,athcb);
			});
			waitsFor(function(){
				return authorizecardTriggered;
			}, "waiting for compelteOnlineEmv callback", 25000);
			runs(function(){
				Rho.MobilePayment.completeOnlineEmv(0, true, ["91", "71", "8A", "89"], completeOnlineEmvCB);
			});
			waitsFor(function(){
				return completeOnlineEmvCBTriggered;
			}, "waiting for compelteOnlineEmv callback", 25000);
			runs(function(){
				spec.displayResults();
				spec.waitForResponse();
			});
		});
		it("Should throw proper exception when method completeOnlineEmv is called without callback", function(){
			var spec = new ManualSpec(jasmine, window.document);
			spec.addGoal("Should throw proper exception when method completeOnlineEmv is called without callback.");
			spec.addPrecondition("Payment device is paired via bluetooth with the device");
			spec.addStep("Press 'Run test' button to start the test");
			spec.addExpectation("Observe that proper exception is thrown when callback is not passed with method completeOnlineEmv");
			spec.displayScenario();
			spec.waitForButtonPressing("Run test");
			var openCBTriggered = false;
			var errThrown;
			runs(function(){
				var openCB = function(){
					openCBTriggered = true;
				};
				Rho.MobilePayment.open(paymentDevice, openCB);
			});
			waitsFor(function(){
				return openCBTriggered;
			}, "waiting for open callback", 25000);
			runs(function(){
				try{
					Rho.MobilePayment.completeOnlineEmv();
				}catch(err){
					errThrown = err;
				}
			});
			waitsFor(function(){
        			return errThrown != undefined;
        		},"waitsFor timeout", 6000);
			runs(function(){
				expect(errThrown).toEqual("Wrong number of arguments"); // proper exception message to be compared with.
			});
		});
		it("Should support for getEmvTags method", function(){
			var spec = new ManualSpec(jasmine, window.document);
			spec.addGoal("Should support for getEmvTags method");
			spec.addPrecondition("Payment device is paired via bluetooth with device.");
			spec.addStep("Press 'Run test' button to start the test.");
			spec.addExpectation("Observe that tlvstings for the passed tags are returned with the callback.");
			spec.displayScenario();
			spec.waitForButtonPressing("Run test");
			var readCardDataTriggered = false;
			var openCBTriggered = false;
			var getEmvCBTriggered = false;
			var cbResult;
			var getEmvCB = function(data){
				cbResult = data;
				spec.addResult("Status : ", data.status);
				spec.addResult("tlvStrings : ", JSON.stringify(data.tlvStrings));
				getEmvCBTriggered = true;
			};
			runs(function(){
				var openCB = function(){
					openCBTriggered = true;
				};
				Rho.MobilePayment.open(paymentDevice, openCB);
			});
			waitsFor(function(){
				return openCBTriggered;
			}, "waiting for open callback", 25000);
			runs(function(){
			var param = {
					"amount":200.00,
					"otherAmount":10.00,
					"readMode":1,			//read mode - Insert for Smart card
					"messageTitle":"Message Title",		//Message Title
					"message1":"This is message 1.",	//Message one
					"message2":"This is message 2.",	//Message two
					"readTimeOut":10000
				};
				var readCB = function(data){
					readCardDataTriggered = true;
				};
				Rho.MobilePayment.readCardData(param,readCB);
			});
			waitsFor(function(){
				return readCardDataTriggered;
			}, "waiting for readCardDataTriggered callback", 25000);
			runs(function(){
				Rho.MobilePayment.getEmvTags(["9F41", "9F02", "5F36", "9F1B"], getEmvCB);
			});
			waitsFor(function(){
				return getEmvCBTriggered;
			}, "waiting for getEmv callback", 25000);
			runs(function(){
				spec.displayResults();
				spec.waitForResponse();
			});
		});
		it("Should throw exception by calling getEmvTags without callback", function(){
			var spec = new ManualSpec(jasmine, window.document);
			spec.addGoal("Should throw proper exception when method getEmvTags is called without callback.");
			spec.addPrecondition("Payment device is paired via bluetooth with the device");
			spec.addStep("Press 'Run test' button to start the test");
			spec.addExpectation("Observe that proper exception is thrown when callback is not passed with method getEmvTags");
			spec.displayScenario();
			spec.waitForButtonPressing("Run test");
			var openCBTriggered = false;
			var errThrown;
			runs(function(){
				var openCB = function(){
					openCBTriggered = true;
				};
				Rho.MobilePayment.open(paymentDevice, openCB);
			});
			waitsFor(function(){
				return openCBTriggered;
			}, "waiting for open callback", 25000);
			runs(function(){
				try{
					Rho.MobilePayment.getEmvTags();
				}catch(err){
					errThrown = err;
				}
			});
			waitsFor(function(){
        			return errThrown != undefined;
        		},"waitsFor timeout", 6000);
			runs(function(){
				expect(errThrown).toEqual("Wrong number of arguments"); // proper exception message to be compared with.
			});
		});
		it("Should support for setEmvTags method", function(){
			var spec = new ManualSpec(jasmine, window.document);
			spec.addGoal("Should support for setEmvTags method");
			spec.addPrecondition("Payment device should be paired via bluetooth to the device.");
			spec.addStep("Press 'Run test' button to start the test.");
			spec.addExpectation("Observe that success status is retruned with the method.");
			spec.displayScenario();
			spec.waitForButtonPressing("Run test");
			var readCardDataTriggered = false;
			var openCBTriggered = false;
			runs(function(){
				var openCB = function(){
					openCBTriggered = true;
				};
				Rho.MobilePayment.open(paymentDevice, openCB);
			});
			waitsFor(function(){
				return openCBTriggered;
			}, "waiting for open callback", 25000);
			runs(function(){
			var param = {
					"amount":200.00,
					"otherAmount":10.00,
					"readMode":1,			//read mode - Insert for Smart card
					"messageTitle":"Message Title",		//Message Title
					"message1":"This is message 1.",	//Message one
					"message2":"This is message 2.",	//Message two
					"readTimeOut":10000
				};
				var readCB = function(data){
					readCardDataTriggered = true;
				};
				Rho.MobilePayment.readCardData(param,readCB);
			});
			waitsFor(function(){
				return readCardDataTriggered;
			}, "waiting for readCardDataTriggered callback", 25000);
			runs(function(){
				var resData = Rho.MobilePayment.setEmvTags(["9F41", "9F02", "5F36", "9F1B"]);
				spec.addResult("Status : ", resData.status);
				spec.displayResult();
				spec.waitForResponse();
			});
		});
		it("Should support for authorizeCard method with merchantDecison:1, displayResult:true, displayAmount:true.", function(){
			var spec = new ManualSpec(jasmine, window.document);
			spec.addGoal("Should support for authorizeCard method with merchantDecision:1, displayResult:true, displayAmount:true.");
			spec.addPrecondition("Payment device is paired via bluetooth with the device.");
			spec.addStep("Press 'Run test' button to start the test");
			spec.addExpectation("Observe that success status is returned with the callback");
			spec.displayScenario();
			spec.waitForButtonPressing("Run test");
			var readCardDataTriggered = false;
			var openCBTriggered = false;
			var authorizeCardCBTriggered = false;
			var authorizeCardCB = function(data){
				cbResult = data;
				spec.addResult("Staus : ", cbResult.status);
				spec.addResult("tlvStrings : ", JSON.stringify(cbResult.tlvStrings));
				spec.addResult("keySerialNo : ", cbResult.keySerialNo);
				spec.addResult("pinBlock : ", cbResult.pinBlock);
				authorizeCardCBTriggered = true;
			};
			runs(function(){
				var openCB = function(){
					openCBTriggered = true;
				};
				Rho.MobilePayment.open(paymentDevice, openCB);
			});
			waitsFor(function(){
				return openCBTriggered;
			}, "waiting for open callback", 25000);
			runs(function(){
			var param = {
					"amount":200.00,
					"otherAmount":10.00,
					"readMode":1,			//read mode - Insert for Smart card
					"messageTitle":"Message Title",		//Message Title
					"message1":"This is message 1.",	//Message one
					"message2":"This is message 2.",	//Message two
					"readTimeOut":10000
				};
				var readCB = function(data){
					readCardDataTriggered = true;
				};
				Rho.MobilePayment.readCardData(param,readCB);
			});
			waitsFor(function(){
				return readCardDataTriggered;
			}, "waiting for readCardDataTriggered callback", 25000);
			runs(function(){
				Rho.MobilePayment.authorizeCard(100.00, 10.00, 1, ["C2", "95", "9B"], true, false, true, false, 10000, authorizeCardCB);
			});
			waitsFor(function(){
				return authorizeCardCBTriggered;
			}, "waiting for authorizeCard callback", 25000);
			runs(function(){
				spec.displayResult();
				spec.waitForResponse();
			});
		});
		it("Should support for authorizeCard method with merchantDecision 0", function(){
			var spec = new ManualSpec(jasmine, window.document);
			spec.addGoal("Should support for authorizeCard method with merchantDecision:0, displayResult:true, displayAmount:true.");
			spec.addPrecondition("Payment device is paired via bluetooth with the device.");
			spec.addStep("Press 'Run test' button to start the test");
			spec.addExpectation("Observe that success status is returned with the callback");
			spec.displayScenario();
			spec.waitForButtonPressing("Run test");
			var readCardDataTriggered = false;
			var openCBTriggered = false;
			var authorizeCardCBTriggered = false;
			var authorizeCardCB = function(data){
				cbResult = data;
				spec.addResult("Staus : ", cbResult.status);
				spec.addResult("tlvStrings : ", JSON.stringify(cbResult.tlvStrings));
				spec.addResult("keySerialNo : ", cbResult.keySerialNo);
				spec.addResult("pinBlock : ", cbResult.pinBlock);
				authorizeCardCBTriggered = true;
			};
			runs(function(){
				var openCB = function(){
					openCBTriggered = true;
				};
				Rho.MobilePayment.open(paymentDevice, openCB);
			});
			waitsFor(function(){
				return openCBTriggered;
			}, "waiting for open callback", 25000);
			runs(function(){
			var param = {
					"amount":200.00,
					"otherAmount":10.00,
					"readMode":1,			//read mode - Insert for Smart card
					"messageTitle":"Message Title",		//Message Title
					"message1":"This is message 1.",	//Message one
					"message2":"This is message 2.",	//Message two
					"readTimeOut":10000
				};
				var readCB = function(data){
					readCardDataTriggered = true;
				};
				Rho.MobilePayment.readCardData(param,readCB);
			});
			waitsFor(function(){
				return readCardDataTriggered;
			}, "waiting for readCardDataTriggered callback", 25000);
			runs(function(){
				Rho.MobilePayment.authorizeCard(100.00, 10.00, 0, ["C2", "95", "9B"], true, false, true, false, 10000, authorizeCardCB);
			});
			waitsFor(function(){
				return authorizeCardCBTriggered;
			}, "waiting for authorizeCard callback", 25000);
			runs(function(){
				spec.displayResult();
				spec.waitForResponse();
			});
		});
		it("Should support for authorizeCard method with merchantDecision 2", function(){
			var spec = new ManualSpec(jasmine, window.document);
			spec.addGoal("Should support for authorizeCard method with merchantDecision:2, displayResult:true, displayAmount:true.");
			spec.addPrecondition("Payment device is paired via bluetooth with the device.");
			spec.addStep("Press 'Run test' button to start the test");
			spec.addExpectation("Observe that success status is returned with the callback");
			spec.displayScenario();
			spec.waitForButtonPressing("Run test");
			var readCardDataTriggered = false;
			var openCBTriggered = false;
			var authorizeCardCBTriggered = false;
			var authorizeCardCB = function(data){
				cbResult = data;
				spec.addResult("Staus : ", cbResult.status);
				spec.addResult("tlvStrings : ", JSON.stringify(cbResult.tlvStrings));
				spec.addResult("keySerialNo : ", cbResult.keySerialNo);
				spec.addResult("pinBlock : ", cbResult.pinBlock);
				authorizeCardCBTriggered = true;
			};
			runs(function(){
				var openCB = function(){
					openCBTriggered = true;
				};
				Rho.MobilePayment.open(paymentDevice, openCB);
			});
			waitsFor(function(){
				return openCBTriggered;
			}, "waiting for open callback", 25000);
			runs(function(){
			var param = {
					"amount":200.00,
					"otherAmount":10.00,
					"readMode":1,			//read mode - Insert for Smart card
					"messageTitle":"Message Title",		//Message Title
					"message1":"This is message 1.",	//Message one
					"message2":"This is message 2.",	//Message two
					"readTimeOut":10000
				};
				var readCB = function(data){
					readCardDataTriggered = true;
				};
				Rho.MobilePayment.readCardData(param,readCB);
			});
			waitsFor(function(){
				return readCardDataTriggered;
			}, "waiting for readCardDataTriggered callback", 25000);
			runs(function(){
				Rho.MobilePayment.authorizeCard(100.00, 10.00, 2, ["C2", "95", "9B"], true, false, true, false, 10000, authorizeCardCB);
			});
			waitsFor(function(){
				return authorizeCardCBTriggered;
			}, "waiting for authorizeCard callback", 25000);
			runs(function(){
				spec.displayResult();
				spec.waitForResponse();
			});
		});
		it("Should support for authorizeCard method with displayResult false", function(){
			var spec = new ManualSpec(jasmine, window.document);
			spec.addGoal("Should support for authorizeCard method with merchantDecision:1, displayResult:false, displayAmount:true.");
			spec.addPrecondition("Payment device is paired via bluetooth with the device.");
			spec.addStep("Press 'Run test' button to start the test");
			spec.addExpectation("Observe that success status is returned with the callback");
			spec.displayScenario();
			spec.waitForButtonPressing("Run test");
			var readCardDataTriggered = false;
			var openCBTriggered = false;
			var authorizeCardCBTriggered = false;
			var authorizeCardCB = function(data){
				cbResult = data;
				spec.addResult("Staus : ", cbResult.status);
				spec.addResult("tlvStrings : ", JSON.stringify(cbResult.tlvStrings));
				spec.addResult("keySerialNo : ", cbResult.keySerialNo);
				spec.addResult("pinBlock : ", cbResult.pinBlock);
				authorizeCardCBTriggered = true;
			};
			runs(function(){
				var openCB = function(){
					openCBTriggered = true;
				};
				Rho.MobilePayment.open(paymentDevice, openCB);
			});
			waitsFor(function(){
				return openCBTriggered;
			}, "waiting for open callback", 25000);
			runs(function(){
			var param = {
					"amount":200.00,
					"otherAmount":10.00,
					"readMode":1,			//read mode - Insert for Smart card
					"messageTitle":"Message Title",		//Message Title
					"message1":"This is message 1.",	//Message one
					"message2":"This is message 2.",	//Message two
					"readTimeOut":10000
				};
				var readCB = function(data){
					readCardDataTriggered = true;
				};
				Rho.MobilePayment.readCardData(param,readCB);
			});
			waitsFor(function(){
				return readCardDataTriggered;
			}, "waiting for readCardDataTriggered callback", 25000);
			runs(function(){
				Rho.MobilePayment.authorizeCard(100.00, 10.00, 1, ["C2", "95", "9B"], false, false, true, false, 10000, authorizeCardCB);
			});
			waitsFor(function(){
				return authorizeCardCBTriggered;
			}, "waiting for authorizeCard callback", 25000);
			runs(function(){
				spec.displayResult();
				spec.waitForResponse();
			});
		});
		it("Should support for authorizeCard method with displayAmount false", function(){
			var spec = new ManualSpec(jasmine, window.document);
			spec.addGoal("Should support for authorizeCard method with merchantDecision:1, displayResult:true, displayAmount:false.");
			spec.addPrecondition("Payment device is paired via bluetooth with the device.");
			spec.addStep("Press 'Run test' button to start the test");
			spec.addExpectation("Observe that success status is returned with the callback");
			spec.displayScenario();
			spec.waitForButtonPressing("Run test");
			var readCardDataTriggered = false;
			var openCBTriggered = false;
			var authorizeCardCBTriggered = false;
			var authorizeCardCB = function(data){
				cbResult = data;
				spec.addResult("Staus : ", cbResult.status);
				spec.addResult("tlvStrings : ", JSON.stringify(cbResult.tlvStrings));
				spec.addResult("keySerialNo : ", cbResult.keySerialNo);
				spec.addResult("pinBlock : ", cbResult.pinBlock);
				authorizeCardCBTriggered = true;
			};
			runs(function(){
				var openCB = function(){
					openCBTriggered = true;
				};
				Rho.MobilePayment.open(paymentDevice, openCB);
			});
			waitsFor(function(){
				return openCBTriggered;
			}, "waiting for open callback", 25000);
			runs(function(){
			var param = {
					"amount":200.00,
					"otherAmount":10.00,
					"readMode":1,			//read mode - Insert for Smart card
					"messageTitle":"Message Title",		//Message Title
					"message1":"This is message 1.",	//Message one
					"message2":"This is message 2.",	//Message two
					"readTimeOut":10000
				};
				var readCB = function(data){
					readCardDataTriggered = true;
				};
				Rho.MobilePayment.readCardData(param,readCB);
			});
			waitsFor(function(){
				return readCardDataTriggered;
			}, "waiting for readCardDataTriggered callback", 25000);
			runs(function(){
				Rho.MobilePayment.authorizeCard(100.00, 10.00, 1, ["C2", "95", "9B"], true, false, false, false, 10000, authorizeCardCB);
			});
			waitsFor(function(){
				return authorizeCardCBTriggered;
			}, "waiting for authorizeCard callback", 25000);
			runs(function(){
				spec.displayResult();
				spec.waitForResponse();
			});
		});
		it("Should throw proper exception when authorizeCard method called without callback", function(){
			var spec = new ManualSpec(jasmine, window.document);
			spec.addGoal("Should throw proper exception when method authorizeCard is called without callback.");
			spec.addPrecondition("Payment device is paired via bluetooth with the device");
			spec.addStep("Press 'Run test' button to start the test");
			spec.addExpectation("Observe that proper exception is thrown when callback is not passed with method authorizeCard");
			spec.displayScenario();
			spec.waitForButtonPressing("Run test");
			var openCBTriggered = false;
			var errThrown;
			runs(function(){
				var openCB = function(){
					openCBTriggered = true;
				};
				Rho.MobilePayment.open(paymentDevice, openCB);
			});
			waitsFor(function(){
				return openCBTriggered;
			}, "waiting for open callback", 25000);
			runs(function(){
				try{
					Rho.MobilePayment.authorizeCard();
				}catch(err){
					errThrown = err;
				}
			});
			waitsFor(function(){
        			return errThrown != undefined;
        		},"waitsFor timeout", 6000);
			runs(function(){
				expect(errThrown).toEqual("Wrong number of arguments"); // proper exception message to be compared with.
			});
		});
	}else{
		it("Your Platform/Device does not support this feature", function(){

		});
	}
});