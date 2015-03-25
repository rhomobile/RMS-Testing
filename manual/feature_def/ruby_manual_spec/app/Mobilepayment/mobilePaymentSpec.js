var platformSupported = ["ANDROID"];
var deviceSupported = ["MC40","RhoSimulator"];
var paymentDeviceName = "MPOS-64003288";

beforeEach(function(){
	document.getElementById('open').innerHTML = '';
	document.getElementById('result1').innerHTML = '';
	document.getElementById('cbstatus').innerHTML = '';
	document.getElementById('cbresult').innerHTML = '';
	document.getElementById("result2").innerHTML = '';
});

describe("Test spec for D180 payment device support", function(){
	if(platformSupported.indexOf(Rho.System.platform)!= -1){

		// Negative:
		// Should throw an exception when open method is called without deviceName parameter. 
		it("VT377-001 - Should - Should throw an exception when \"open()\" is called without deviceName param", function(){
			var spec = new ManualSpec(jasmine, window.document);
        	spec.addGoal("VT377-001 - Should - Should throw an exception when \"open()\" is called without deviceName param");
        	spec.addPrecondition("Payment device is paired via bluetooth to the device.");
            spec.addStep("Press 'RunTest' button");
            spec.addExpectation('This is Semi- Auto case !.');
            spec.displayScenario();
            spec.waitForButtonPressing("Run test");
            var isOpen='';
            runs(function(){
            	Ruby.call('Mobilepayment','mobpay_opentry');
            });
			waitsFor(function(){
				return !!(document.getElementById('result1').innerHTML !== '');
	        },5000);
	        runs(function(){
	        	isOpen = document.getElementById('result1').innerHTML;
				expect(isOpen).toEqual("Wrong number of arguments");            	
            });
		});

		//####VT377-002 Should support method mobpay_isopenedpened()####
		//Access : `Rho.MobilePayment.isOpened()`  
		//Return : Boolean (True/False)
		it("VT377-002 - Should support \"isOpened\" method with the paymentDevice object, to check the connection already exists or not when device is not paried at all.", function(){
			var spec = new ManualSpec(jasmine, window.document);
        	spec.addGoal("VT377-002 - Should support \"isOpened\" property with the paymentDevice object, to check the connection already exists or not when device is not paried at all.");
        	spec.addPrecondition("Payment device is not paired via bluetooth to the device.");
            spec.addStep("Press 'RunTest' button");
            spec.addExpectation('This is Semi- Auto case !.');
            spec.displayScenario();
            spec.waitForButtonPressing("Run test");
            var isOpen;
            runs(function(){
            	Ruby.call('Mobilepayment','mobpay_isopened');
            });
			waitsFor(function(){
	        	return !!(document.getElementById('result1').innerHTML !== '');
	        },5000);
	        runs(function(){
	        	isOpen = document.getElementById('result1').innerHTML;
				expect(isOpen).toEqual("false");
            });
		});

		//####VT377-003 Should supportmobpay_isopened method open(deviceName)####
		//Access : `Rho.MobilePayment.open(callbackfunction);  
		//Paramater : Callback function (mandatory)  
		//Callback Paramaters: ```{"status":"success"}```  
		it("VT377-003 - Should support for the method \"Open(deviceName)\" with deviceName as param, to open the connection with paymentDevice.", function(){
			var spec = new ManualSpec(jasmine, window.document);
        	spec.addGoal("VT377-003 - Should support for the method \"Open(deviceName)\" with the instance of paymentDevice object, to open the connection with paymentDevice.");
        	spec.addPrecondition("Payment device is paired via bluetooth to the device.");
            spec.addStep("Press 'RunTest' button");
            spec.addExpectation('This is Semi- Auto case !.');
            spec.displayScenario();
            spec.waitForButtonPressing("Run test");
 			var cbstatus;
            runs(function () {
				Ruby.call('Mobilepayment','mobpay_open');
			});
			waitsFor(function(){
				return !!(document.getElementById('open').innerHTML !== '');
            },"wait for Mobile Payment device to open",25000);
            runs(function(){
            	cbstatus = document.getElementById('open').innerHTML;
            	expect(cbstatus).toEqual("success");
            });
		});

		//####VT377-004 Should support method isOpened()####
		//Access : `Rho.MobilePayment.isOpened()`  
		//Return : Boolean (True/False)
		it("VT377-004 - Should support \"isOpened\" method with the paymentDevice object, to check the connection exist.", function(){
			var spec = new ManualSpec(jasmine, window.document);
        	spec.addGoal("VT377-004 - Should support \"isOpened\" property with the paymentDevice object, to check the connection exist.");
        	spec.addPrecondition("Payment device is paired via bluetooth to the device.");
            spec.addStep("Press 'RunTest' button");
            spec.addExpectation('This is Semi- Auto case !.');
            spec.displayScenario();
            spec.waitForButtonPressing("Run test");
			var isOpen;
 			var cbstatus;
            runs(function () {
				Ruby.call('Mobilepayment','mobpay_open');
			});
			waitsFor(function(){
				return !!(document.getElementById('open').innerHTML !== '');
            },"wait for Mobile Payment device to open",25000);
            runs(function(){
            	cbstatus = document.getElementById('open').innerHTML;
            	expect(cbstatus).toEqual("success");
            	Ruby.call('Mobilepayment','mobpay_isopened');
            });
        	waitsFor(function(){
        		return !!(document.getElementById('result1').innerHTML !== '');
        	},25000);
            runs(function(){
            	isOpen = document.getElementById('result1').innerHTML;
	            expect(isOpen).toEqual('true');
            });
		});

		//####VT377-005 support method isOpened()####
		//Access : `Rho.MobilePayment.isOpened()`  
		//Return : Boolean (True/False)
		it("VT377-005 - Should support \"isOpened\" method with the paymentDevice object, to check the connection does not exist.", function(){
			var spec = new ManualSpec(jasmine, window.document);
        	spec.addGoal("VT377-005 - Should support \"isOpened\" property with the paymentDevice object, to check the connection already exists or not.");
        	spec.addPrecondition("Payment device is paired via bluetooth to the device.");
            spec.addStep("Press 'RunTest' button");
            spec.addExpectation('This is Semi- Auto case !.');
            spec.displayScenario();
            spec.waitForButtonPressing("Run test");
			var cbstatus;
			var isOpen;
            runs(function () {
				Ruby.call('Mobilepayment','mobpay_close');
			});
			waitsFor(function(){
				return !!(document.getElementById('open').innerHTML !== '');
            },"wait for Mobile Payment device to close",25000);
            runs(function(){
            	cbstatus = document.getElementById('open').innerHTML;
            	expect(cbstatus).toEqual("success");
            	Ruby.call('Mobilepayment','mobpay_isopened');
            });
        	waitsFor(function(){
        		return !!(document.getElementById('result1').innerHTML !== '');
        	},25000);
        	runs(function(){
	        	isOpen = document.getElementById('result1').innerHTML;
	            expect(isOpen).toEqual('true');
            });
		});

		
		//####VT377-006 support method close()####
		//Access : `Rho.MobilePayment.close(callbackfunction);  
		//Paramater : Callback function (mandatory)  
		//Callback Paramaters (Hash): ```{"status":success,"errorId":"","description":""}```  
		it("VT377-006 - Should support \"close()\" method with the instance of paymentDevice object, to disconnect paymentDevice.", function(){
			var spec = new ManualSpec(jasmine, window.document);
        	spec.addGoal("VT377-006 - Should support \"close()\" method with the instance of paymentDevice object, to disconnect paymentDevice.");
        	spec.addPrecondition("Payment device is paired via bluetooth to the device.");
        	spec.addPrecondition("Payment device is already opened a connection with your device.");
            spec.addStep("Press 'RunTest' button");
            spec.addExpectation('This is Semi- Auto case !.');
            spec.displayScenario();
            spec.waitForButtonPressing("Run test");
            var cbstatus;
			if(Rho.MobilePayment.isOpened()){
				runs(function () {
					Ruby.call('Mobilepayment','mobpay_close');
				});
				waitsFor(function(){
					return !!(document.getElementById('open').innerHTML !== '');
	            },"wait for Mobile Payment device to close",25000);
	            runs(function(){
	            	cbstatus = document.getElementById('open').innerHTML;
	            	expect(cbstatus).toEqual("success");
	            });
			}
		});

		//####Executing close() method multiple times VT377-000 not behave abnormally####
		it("VT377-007 - Should disconnect paymentDevice successfully by running \"close()\" method multiple times.", function(){
			var spec = new ManualSpec(jasmine, window.document);
        	spec.addGoal("VT377-007 - Should support \"close()\" method with the instance of paymentDevice object, to disconnect paymentDevice.");
        	spec.addPrecondition("Payment device is paired via bluetooth to the device.");
        	spec.addPrecondition("Payment device is already opened a connection with your device.");
            spec.addStep("Press 'RunTest' button");
            spec.addExpectation('This is Semi- Auto case !.');
            spec.displayScenario();
            spec.waitForButtonPressing("Run test");
 			var cbstatus;
 			var isOpen;
            runs(function () {
				Ruby.call('Mobilepayment','mobpay_open');
			});
			waitsFor(function(){
				return !!(document.getElementById('open').innerHTML !== '');
            },"wait for Mobile Payment device to open",25000);
			if(Rho.MobilePayment.isOpened()){
				runs(function () {
					Ruby.call('Mobilepayment','mobpay_close_close');
				});
				waitsFor(function(){
					return !!(document.getElementById('open').innerHTML !== '');
	            },"wait for Mobile Payment device to close",25000);
	            runs(function () {
		           	Ruby.call('Mobilepayment','mobpay_isopened');
		        });
	        	waitsFor(function(){
	        		return !!(document.getElementById('result1').innerHTML !== '');
	        	},25000);
	        	runs(function () {
		        	isOpen = document.getElementById('result1').innerHTML;
		            expect(isOpen).toEqual('true');
	            });
			}
		});

		//####VT377-008 Should read data from MagStripe Card using method "readCardData()" with readMode-Swipe####
		//Access : `Rho.MobilePayment.readCardData();`  
		//param : {"amount":200.00,"otherAmount":10.00,"readMode":0,"transactionMessage":"This is transaction","readTimeOut":4000}
		//Callback : Callback function (mandatory)  
		//Callback Paramaters (Hash): ```{"status":success,"errorName":"","accountNumber":"","cardHolderName":"","expiryDate":"","track1Data":"","track2Data":"","track3Data":"","tlvStrings":"","tagIds":"","lengths":"","values":""}```  
		it("VT377-008 - Should read data from MagStripe card with readMode-Swipe", function(){
			var spec = new ManualSpec(jasmine, window.document);
        	spec.addGoal("VT377-008 - Should read data from MagStripe card with readMode-Swipe.");
        	spec.addPrecondition("Payment device is paired via bluetooth to the device.");
            spec.addStep("Press 'RunTest' button");
            spec.addStep("Swipe a valid MagStripe Credit card to readCardData");
            spec.addExpectation('Data from the card read and displayed successfully using D180 payment Device.');
            spec.displayScenario();
            spec.waitForButtonPressing("Run test");
            var cbstatus;
			runs(function(){
				Ruby.call('Mobilepayment','mobpay_open');
			});
			waitsFor(function(){
				return !!(document.getElementById('open').innerHTML !== '');
            },"wait for Mobile Payment device to open",25000);
            runs(function(){
            	cbstatus = document.getElementById('open').innerHTML;
            	expect(cbstatus).toEqual("success");
				Ruby.call('Mobilepayment','mobpay_readcard');
                spec.waitForResponse();
			});
		});

		//####VT377-009 Should read data from Smart chip Card using method "readCardData()" with readMode-Insert####
		//Access : `Rho.MobilePayment.readCardData();`  
		//param : {"amount":200.00,"otherAmount":10.00,"readMode":1,"transactionMessage":"any String","readTimeOut":4000}
		//Callback : Callback function (mandatory)  
		//Callback Paramaters (Hash): ```{"status":success,"errorName":"","accountNumber":"","cardHolderName":"","expiryDate":"","track1Data":"","track2Data":"","track3Data":"","tlvStrings":"","tagIds":"","lengths":"","values":""}```  
		it("VT377-009 - Should read data from SmartCard with readMode-Insert", function(){
			var spec = new ManualSpec(jasmine, window.document);
        	spec.addGoal("VT377-009 - Should read data from SmartCard with readMode-Insert.");
        	spec.addPrecondition("Payment device is paired via bluetooth to the device.");
            spec.addStep("Press 'RunTest' button");
            spec.addStep("Insert a valid SmartCard Credit card to readCardData from paymentDevice.");
            spec.addExpectation('Data from the card read and displayed successfully using D180 payment Device.');
            spec.addExpectation('Ensure callback parameter tlvStrings is not undefined.');
            spec.displayScenario();
            spec.waitForButtonPressing("Run test");
            var cbstatus;
			runs(function(){
				Ruby.call('Mobilepayment','mobpay_open');
			});
			waitsFor(function(){
				return !!(document.getElementById('open').innerHTML !== '');
			},"waiting for open callback", 25000);
			runs(function(){
            	cbstatus = document.getElementById('open').innerHTML;
            	expect(cbstatus).toEqual("success");				
				Ruby.call('Mobilepayment','mobpay_readcard?readmode=insert');
                spec.waitForResponse();
			});
		});

		//####VT377-010 Should read data from either MagStripe/SmartCard/EMVContactless Card using method "readCardData()" with readMode-All####
		//Access : `Rho.MobilePayment.readCardData();`  
		//param : {"amount":200.00,"otherAmount":10.00,"readMode":3,"transactionMessage":"any String","readTimeOut":4000}
		//Callback : Callback function (mandatory)  
		//Callback Paramaters (Hash): ```{"status":success,"errorName":"","accountNumber":"","cardHolderName":"","expiryDate":"","track1Data":"","track2Data":"","track3Data":"","tlvStrings":"","tagIds":"","lengths":"","values":""}```  
		it("VT377-010 - Should read data from either MagStripe/SmartCard/EMVContactless tag with readMode-All", function(){
			var spec = new ManualSpec(jasmine, window.document);
        	spec.addGoal("VT377-010 - Should read data from swipe of MagStripe card or Insertion of Smart card or by a Touch of EMVContactless card with readMode-All.");
        	spec.addPrecondition("Payment device is paired via bluetooth to the device.");
            spec.addStep("Press 'RunTest' button");
            spec.addStep("Swipe a MagStripe card or Insert a SmartCard or Touch a valid EMVContactless card to the paymentDevice.");
            spec.addExpectation('Data from the card read and displayed successfully using D180 payment Device.');
            spec.displayScenario();
            spec.waitForButtonPressing("Run test");
            var cbstatus;
			runs(function(){
				Ruby.call('Mobilepayment','mobpay_open');
			});
			waitsFor(function(){
				return !!(document.getElementById('open').innerHTML !== '');
			},"waiting for open callback", 25000);
			runs(function(){
            	cbstatus = document.getElementById('open').innerHTML;
            	expect(cbstatus).toEqual("success");
				Ruby.call('Mobilepayment','mobpay_readcard?readmode=all');
                spec.waitForResponse();
			});
		});

		//####VT377-011 Should not read data from MagStripe Card using method "readCardData()" with readMode-Insert####
		//Access : `Rho.MobilePayment.readCardData();`  
		//param : {"amount":200.00,"otherAmount":10.00,"readMode":1,"transactionMessage":"any String","readTimeOut":4000}
		//Callback : Callback function (mandatory)  
		//Callback Paramaters (Hash): ```{"status":"error","errorName":"TIMED_OUT"}```  
		it("VT377-011 - Should not read data from MagStripe card with readMode-Insert and callback triggered with status:error and errorName:TIMED_OUT", function(){
			var spec = new ManualSpec(jasmine, window.document);
			spec.addGoal("VT377-011 - Should return errorId:15 and description:TIMED_OUT with callback, when MagStrip card is inserted with SmartCard slot");
			spec.addPrecondition("Payment device is paired via bluetooth to the device.");
			spec.addStep("Press 'RunTest' button");
			spec.addStep("Insert a valid MagStripe card in to the smart card slot");
			spec.addExpectation("Semi auto test to check the callback function triggered with status:error and errorName:TIMED_OUT");
			spec.displayScenario();
            spec.waitForButtonPressing("Run test");
            var cbstatus;
			runs(function(){
				Ruby.call('Mobilepayment','mobpay_open');
			});
			waitsFor(function(){
				return !!(document.getElementById('open').innerHTML !== '');
			},"waiting for open callback", 25000);
			runs(function(){
            	cbstatus = document.getElementById('open').innerHTML;
            	expect(cbstatus).toEqual("success");				
				Ruby.call('Mobilepayment','mobpay_readcard?readmode=insert');
			});
			waitsFor(function(){
        		return !!(document.getElementById('result1').innerHTML !== '');
        	},25000);
        	runs(function () {
        		var status = document.getElementById('cbstatus').innerHTML;
        		var result = document.getElementById('result1').innerHTML;
	            expect(status).toEqual('error');
	            expect(result).toEqual('CARD_INSERTION_ERROR');
            });
		});

		//####VT377-012 Should not read data from SmartCard using method "readCardData()" with readMode-Swipe####
		//Access : `Rho.MobilePayment.readCardData();`  
		//param : {"amount":200.00,"otherAmount":10.00,"readMode":0,"transactionMessage":"any String","readTimeOut":4000}
		//Callback : Callback function (mandatory)  
		//Callback Paramaters (Hash): ```{"status":"error","errorName":"TIMED_OUT"}```  
		it("VT377-012 - Should not read data from SmartCard with readMode-Swipe and callback triggered with status:error and errorName:TIMED_OUT", function(){
			var spec = new ManualSpec(jasmine, window.document);
			spec.addGoal("VT377-012 - Should return status:error and errorName:TIMED_OUT with callback, when SmartCard got swiped with paymentDevice");
			spec.addPrecondition("Payment device is paired via bluetooth to the device.");
			spec.addStep("Press 'RunTest' button");
			spec.addStep("Swipe a valid SmartCard with paymentDevice");
			spec.addExpectation("Semi auto test to check the callback function triggered with status:error and errorName:TIMED_OUT");
			spec.displayScenario();
            spec.waitForButtonPressing("Run test");
           	var cbstatus;
			runs(function(){
				Ruby.call('Mobilepayment','mobpay_open');
			});
			waitsFor(function(){
				return !!(document.getElementById('open').innerHTML !== '');
			},"waiting for open callback", 25000);
			runs(function(){
            	cbstatus = document.getElementById('open').innerHTML;
            	expect(cbstatus).toEqual("success");				
				Ruby.call('Mobilepayment','mobpay_readcard');
			});
			waitsFor(function(){
        		return !!(document.getElementById('result1').innerHTML !== '');
        	},25000);
        	runs(function () {
        		var status = document.getElementById('cbstatus').innerHTML;
        		var result = document.getElementById('result1').innerHTML;
	            expect(status).toEqual('error');
	            expect(result).toEqual('TIMED_OUT');
            });
		});

		//#### It VT377-013 Should trigger callback with proper error details while trying to read card data before open method.####
		//Access : `Rho.MobilePayment.readCardData();`  
		//param : {"amount":200.00,"otherAmount":10.00,"readMode":1,"transactionMessage":"any String","readTimeOut":4000}
		//Callback : Callback function (mandatory)  
		//Callback Paramaters (Hash): ```{"status":"error","errorName":"DEVICE_NOT_ENABLED"}```  
		it("VT377-013 - Should trigger callback with status:error and errorName:DEVICE_NOT_ENABLED when trying to readCardData() before open() method.", function(){
			var spec = new ManualSpec(jasmine, window.document);
			spec.addGoal("VT377-013 - Should return errorId:8 and description:DEVICE_NOT_ENABLED with callback, when MagStripe card swiped with paymentDevice");
			spec.addPrecondition("Payment device is paired via bluetooth to the device.");
			spec.addStep("Press 'RunTest' button");
			spec.addStep("Swipe a valid MagStripe with paymentDevice");
			spec.addExpectation("Semi auto test to check the callback function triggered with status:error and errorName:DEVICE_NOT_ENABLED");
			spec.displayScenario();
            spec.waitForButtonPressing("Run test");
           	var cbstatus;
			runs(function(){
				Ruby.call('Mobilepayment','mobpay_close');
			});
			waitsFor(function(){
				return !!(document.getElementById('open').innerHTML !== '');
			},"waiting for open callback", 25000);
			runs(function(){
            	cbstatus = document.getElementById('open').innerHTML;
            	expect(cbstatus).toEqual("success");				
				Ruby.call('Mobilepayment','mobpay_readcard');
			});
			waitsFor(function(){
        		return !!(document.getElementById('result1').innerHTML !== '');
        	},25000);
        	runs(function () {
        		var status = document.getElementById('cbstatus').innerHTML;
        		var result = document.getElementById('result1').innerHTML;
	            expect(status).toEqual('error');
	            expect(result).toEqual('DEVICE_NOT_ENABLED');
            });
		});

		//It VT377-014 Should trigger callback with proper error while smart card removed.
		//Access : `Rho.MobilePayment.readCardData();`  
		//param : {"amount":200.00,"otherAmount":10.00,"readMode":1,"transactionMessage":"Remove card while reading","readTimeOut":4000}
		//Callback : Callback function (mandatory)  
		//Callback Paramaters (Hash): ```{"status":"error","errorName":"CARD_REMOVED"}```  
		it("VT377-014 - Should trigger callback with status:error and errorName:CARD_REMOVED when smartCard is removed while reading", function(){
			var spec = new ManualSpec(jasmine, window.document);
			spec.addGoal("VT377-014 - Should return status:error and errorName:CARD_REMOVED with callback, when SmartCard is inserted and removed while reading.");
			spec.addPrecondition("Payment device is paired via bluetooth to the device.");
			spec.addStep("Press 'RunTest' button");
			spec.addStep("Insert a valid SmartCard with paymentDevice");
			spec.addStep("Remove the card while the data is reading");
			spec.addExpectation("Semi auto test to check the callback function triggered with status:error and errorName:CARD_REMOVED");
			spec.displayScenario();
            spec.waitForButtonPressing("Run test");
	        var cbstatus;
			runs(function(){
				Ruby.call('Mobilepayment','mobpay_open');
			});
			waitsFor(function(){
				return !!(document.getElementById('open').innerHTML !== '');
			},"waiting for open callback", 25000);
			runs(function(){
            	cbstatus = document.getElementById('open').innerHTML;
            	expect(cbstatus).toEqual("success");				
				Ruby.call('Mobilepayment','mobpay_readcard?readmode=insert');
			});
			waitsFor(function(){
        		return !!(document.getElementById('result1').innerHTML !== '');
        	},25000);
        	runs(function () {
        		var status = document.getElementById('cbstatus').innerHTML;
        		var result = document.getElementById('result1').innerHTML;
	            expect(status).toEqual('error');
	            expect(result).toEqual('CARD_REMOVED');
            });
		});

		//It VT377-015 Should trigger callback with proper error when no card is "Inserted"/Swiped/Touched while reading.
		//Access : `Rho.MobilePayment.readCardData();`  
		//param : {"amount":200.00,"otherAmount":10.00,"readMode":0,"transactionMessage":"any String","readTimeOut":4000}
		//Callback : Callback function (mandatory)  
		//Callback Paramaters (Hash): ```{"status":"error","errorName":"TIMED_OUT"}```  
		it("VT377-015 - Should trigger callback with status:error and errorName:TIMED_OUT when MagStripe card is not swiped at all while method readCardData() is called", function(){
			var spec = new ManualSpec(jasmine, window.document);
			spec.addGoal("VT377-015 - Should return errorId:9 and description:TIMED_OUT with callback, when MagStripe card not swiped with paymentDevice");
			spec.addPrecondition("Payment device is paired via bluetooth to the device.");
			spec.addStep("Press 'RunTest' button");
			spec.addStep("Do not swipe any valid MagStripe card with paymentDevice");
			spec.addExpectation("Semi auto test to check the callback function triggered with status:error and errorName:TIMED_OUT");
			spec.displayScenario();
            spec.waitForButtonPressing("Run test");
	        var cbstatus;
			runs(function(){
				Ruby.call('Mobilepayment','mobpay_open');
			});
			waitsFor(function(){
				return !!(document.getElementById('open').innerHTML !== '');
			},"waiting for open callback", 25000);
			runs(function(){
            	cbstatus = document.getElementById('open').innerHTML;
            	expect(cbstatus).toEqual("success");				
				Ruby.call('Mobilepayment','mobpay_readcard');
			});
			waitsFor(function(){
        		return !!(document.getElementById('result1').innerHTML !== '');
        	},25000);
        	runs(function () {
        		var status = document.getElementById('cbstatus').innerHTML;
        		var result = document.getElementById('result1').innerHTML;
	            expect(status).toEqual('error');
	            expect(result).toEqual('TIMED_OUT');
            });
		});

		//It VT377-016 trigger callback with proper error when no card is Swiped/"Inserted"/Touched while reading.
		//Access : `Rho.MobilePayment.readCardData();`  
		//param : {"amount":200.00,"otherAmount":10.00,"readMode":1,"transactionMessage":"any String","readTimeOut":4000}
		//Callback : Callback function (mandatory)  
		//Callback Paramaters (Hash): ```{"status":"error","errorName":"TIMED_OUT"}```  
		it("VT377-016 - Should trigger callback with status:error and errorName:TIMED_OUT when SmartCard is not Inserted at all while method readCardData() is called", function(){
			var spec = new ManualSpec(jasmine, window.document);
			spec.addGoal("VT377-016 - Should return status:error and errorName:TIMED_OUT with callback, when SmartCard is not inserted with paymentDevice");
			spec.addPrecondition("Payment device is paired via bluetooth to the device.");
			spec.addStep("Press 'RunTest' button");
			spec.addStep("Do not Insert any valid SmartCard with paymentDevice");
			spec.addExpectation("Semi auto test to check the callback function triggered with errorId:9 and description:TIMED_OUT");
			spec.displayScenario();
            spec.waitForButtonPressing("Run test");
 	        var cbstatus;
			runs(function(){
				Ruby.call('Mobilepayment','mobpay_open');
			});
			waitsFor(function(){
				return !!(document.getElementById('open').innerHTML !== '');
			},"waiting for open callback", 25000);
			runs(function(){
            	cbstatus = document.getElementById('open').innerHTML;
            	expect(cbstatus).toEqual("success");				
				Ruby.call('Mobilepayment','mobpay_readcard?readmode=insert');
			});
			waitsFor(function(){
        		return !!(document.getElementById('result1').innerHTML !== '');
        	},25000);
        	runs(function () {
        		var status = document.getElementById('cbstatus').innerHTML;
        		var result = document.getElementById('result1').innerHTML;
	            expect(status).toEqual('error');
	            expect(result).toEqual('TIMED_OUT');
            });
		});

		//It VT377-017 Should trigger callback with proper error when no card is Swiped/Inserted/"Touched" while reading.
		//Access : `Rho.MobilePayment.readCardData();`  
		//param : {"amount":200.00,"otherAmount":10.00,"readMode":2,"transactionMessage":"any String","readTimeOut":4000}
		//Callback : Callback function (mandatory)  
		//Callback Paramaters (Hash): ```{"status":"error","errorName":"TIMED_OUT"}```  
		it("VT377-017 - Should trigger callback with status:error and errorName:TIMED_OUT when EMVContactless is not touched at all while method readCardData() is called", function(){
			var spec = new ManualSpec(jasmine, window.document);
			spec.addGoal("VT377-017 - Should return status:error and errorName:TIMED_OUT with callback, when EMVContactless is not touched with paymentDevice");
			spec.addPrecondition("Payment device is paired via bluetooth to the device.");
			spec.addStep("Press 'RunTest' button");
			spec.addStep("Do not touch any valid EMVContactless with paymentDevice");
			spec.addExpectation("Semi auto test to check the callback function triggered with errorId:9 and description:TIMED_OUT");
			spec.displayScenario();
            spec.waitForButtonPressing("Run test");
	        var cbstatus;
			runs(function(){
				Ruby.call('Mobilepayment','mobpay_open');
			});
			waitsFor(function(){
				return !!(document.getElementById('open').innerHTML !== '');
			},"waiting for open callback", 25000);
			runs(function(){
            	cbstatus = document.getElementById('open').innerHTML;
            	expect(cbstatus).toEqual("success");				
				Ruby.call('Mobilepayment','mobpay_readcard?readmode=touch');
			});
			waitsFor(function(){
        		return !!(document.getElementById('result1').innerHTML !== '');
        	},25000);
        	runs(function () {
        		var status = document.getElementById('cbstatus').innerHTML;
        		var result = document.getElementById('result1').innerHTML;
	            expect(status).toEqual('error');
	            expect(result).toEqual('TIMED_OUT');
            });
		});

		//It VT377-018 Should trigger callback with proper error when no parameter is passed with the method readCardData()
		//Access : `Rho.MobilePayment.readCardData();`  
		//param : {"amount":"invalidValue","otherAmount":"invalidValue","readMode":10,"transactionMessage":10,"readTimeOut":4000}
		//Callback : Callback function (mandatory)  
		//Callback Paramaters (Hash): ```{"status":"error","errorName":"INVALID_VALUE"}```  
		it("VT377-018 - Should trigger callback with status:error and errorName:INVALID_VALUE when invalid parameters passed with readCardData()", function(){
			var spec = new ManualSpec(jasmine, window.document);
			spec.addGoal("VT377-018 - Should return errorId:4 and description:INVALID_VALUE with callback, when no parameter is passed with readCardData()");
			spec.addPrecondition("Payment device is paired via bluetooth to the device.");
			spec.addStep("Press 'RunTest' button");
			spec.addExpectation("Semi auto test to check the callback function triggered with errorId:4 and description:INVALID_VALUE");
			spec.displayScenario();
            spec.waitForButtonPressing("Run test");
	        var cbstatus;
			runs(function(){
				Ruby.call('Mobilepayment','mobpay_open');
			});
			waitsFor(function(){
				return !!(document.getElementById('open').innerHTML !== '');
			},"waiting for open callback", 25000);
			runs(function(){
            	cbstatus = document.getElementById('open').innerHTML;
            	expect(cbstatus).toEqual("success");				
				Ruby.call('Mobilepayment','mobpay_readcard_invalid');
			});
			waitsFor(function(){
        		return !!(document.getElementById('result1').innerHTML !== '');
        	},25000);
        	runs(function () {
        		var status = document.getElementById('cbstatus').innerHTML;
        		var result = document.getElementById('result1').innerHTML;
	            expect(status).toEqual('error');
	            expect(result).toEqual('INVALID_VALUE');
            });
		});

		//VT377-019 Should support method promptPin()
		//Access : ```Rho.MobilePayment.promptPin({"accountNumber":"asd123458765", "minPINLength":4, "maxPINLength":8, "isPINOptional":false, "message1":"Enter PIN", "message2":"min 4 digits & max 8 digits", "processingMessage":"Pin processsing", "readTimeOut":5000 },callbackfunction);```  
		//Paramater : Callback function (mandatory)  
		//Callback Paramaters (Hash): ```{"status":success", "serialNumber":"", "pinBlockStr":"", "isPinEntered":""}```  
		it("VT377-019 - Should support \"promptPin()\" method with the paymentDevice object, to prompt for PIN.", function(){
			var spec = new ManualSpec(jasmine, window.document);
			spec.addGoal("VT377-019 - Should request PIN code with the paymentDevice, when promptPin() method is called in the application");
			spec.addPrecondition("Payment device is paired with bluetooth to the device.");
			spec.addStep("Press 'RunTest' button");
			spec.addStep("Swipe card to read card data.");
			spec.addStep("Observe that PIN code request is prompted at the paymentDevice, after reading card data successully.");
			spec.addStep("Enter PIN value of length 4 and press 'Ok.");
			spec.addExpectation("Check for the status:'Success' and no errorId with the callback parameter");
			spec.displayScenario();
            spec.waitForButtonPressing("Run test");
 	        var cbstatus;
			runs(function(){
				Ruby.call('Mobilepayment','mobpay_open');
			});
			waitsFor(function(){
				return !!(document.getElementById('open').innerHTML !== '');
			},"waiting for open callback", 25000);
			runs(function(){
            	cbstatus = document.getElementById('open').innerHTML;
            	expect(cbstatus).toEqual("success");				
				Ruby.call('Mobilepayment','mobpay_readcard');
			});
			waitsFor(function(){
        		return !!(document.getElementById('result1').innerHTML !== '');
        	},25000);
			runs(function(){
				Ruby.call('Mobilepayment','mobpay_promptpin');
				spec.waitForResponse();
			});
		});

		//VT377-020 Should prompt for PIN number when below given parameters are called with promptPin() and send back proper error id with the callback
		// PIN number length less than minPinLength ( <4 )
		//Access : ```Rho.MobilePayment.promptPin({"accountNumber":"asd123458765", "minPINLength":4, "maxPINLength":8, "isPINOptional":false, "message1":"Enter PIN", "message2":"min 4 digits & max 8 digits", "processingMessage":"Pin processsing", "readTimeOut":5000},callbackfunction);```  
		//Paramater : Callback function (mandatory)  
		//Callback Paramaters (Hash): ```{"status":"error", "errorName":"INVALID_VALUE"}```  
		it("VT377-020 - Should prompt for PIN number and send back proper error status with the callback when entered PIN length is lesser than minPINLength.", function(){
			var spec = new ManualSpec(jasmine, window.document);
			spec.addGoal("VT377-020 - Should send status:error and errorName:\"INVALID_VALUE\"");
			spec.addPrecondition("Payment device is paired with bluetooth to the device.");
			spec.addStep("Press 'RunTest' button");
			spec.addStep("Swipe magstripe card with the payment device.");
			spec.addStep("Observe that PIN code request is prompted at the paymentDevice");
			spec.addStep("Enter PIN of length less than 4 characters and press 'Ok'")
			spec.addExpectation("Semi Auto test, to check for the status:error and errorName:INVALID_VALUE with the callback");
			spec.displayScenario();
            spec.waitForButtonPressing("Run test");
	        var cbstatus;
			runs(function(){
				Ruby.call('Mobilepayment','mobpay_open');
			});
			waitsFor(function(){
				return !!(document.getElementById('open').innerHTML !== '');
			},"waiting for open callback", 25000);
			runs(function(){
            	cbstatus = document.getElementById('open').innerHTML;
            	expect(cbstatus).toEqual("success");				
				Ruby.call('Mobilepayment','mobpay_readcard');
			});
			waitsFor(function(){
        		return !!(document.getElementById('cbresult').innerHTML !== '');
        	},25000);
			runs(function(){
				document.getElementById('cbstatus').innerHTML = '';
				document.getElementById('cbresult').innerHTML = '';
				document.getElementById('result2').innerHTML = '';
				Ruby.call('Mobilepayment','mobpay_promptpin');
			});
			waitsFor(function(){
        		return !!(document.getElementById('cbresult').innerHTML !== '');
        	},25000);			
			runs(function(){
        		var status = document.getElementById('cbstatus').innerHTML;
        		var result = document.getElementById('result1').innerHTML;
	            expect(status).toEqual('error');
	            expect(result).toEqual('INVALID_VALUE');
			});
		});

		it("VT377-021 - Should prompt for PIN number and send back proper error status with the callback when pin length is greater than maxPINLength", function(){
			var spec = new ManualSpec(jasmine, window.document);
			spec.addGoal("VT377-021 - Should send status:error and errorName:\"INVALID_VALUE\"");
			spec.addPrecondition("Payment device is paired with bluetooth to the device.");
			spec.addStep("Press 'RunTest' button");
			spec.addStep("Swipe magstripe card with payment device.");
			spec.addStep("Observe that PIN code request is prompted at the paymentDevice");
			spec.addStep("Enter PIN of length greater than 8 characters and press 'Ok'")
			spec.addExpectation("Semi Auto test, to check for the status:error and errorName:INVALID_VALUE with the callback");
			spec.displayScenario();
            spec.waitForButtonPressing("Run test");
	        var cbstatus;
			runs(function(){
				Ruby.call('Mobilepayment','mobpay_open');
			});
			waitsFor(function(){
				return !!(document.getElementById('open').innerHTML !== '');
			},"waiting for open callback", 25000);
			runs(function(){
            	cbstatus = document.getElementById('open').innerHTML;
            	expect(cbstatus).toEqual("success");				
				Ruby.call('Mobilepayment','mobpay_readcard');
			});
			waitsFor(function(){
        		return !!(document.getElementById('cbresult').innerHTML !== '');
        	},25000);
			runs(function(){
				document.getElementById('cbstatus').innerHTML = '';
				document.getElementById('cbresult').innerHTML = '';
				document.getElementById('result2').innerHTML = '';
				Ruby.call('Mobilepayment','mobpay_promptpin');
			});
			waitsFor(function(){
        		return !!(document.getElementById('cbresult').innerHTML !== '');
        	},25000);			
			runs(function(){
        		var status = document.getElementById('cbstatus').innerHTML;
        		var result = document.getElementById('result1').innerHTML;
	            expect(status).toEqual('error');
	            expect(result).toEqual('INVALID_VALUE');
			});
		});

		//VT377-022 Should prompt for PIN number when below given parameters are called with promptPin() and send back proper error id with the callback
		//Do not enter any PIN number until the timeout
		//Access : ```Rho.MobilePayment.promptPin({"accountNumber":"asd123458765", "minPINLength":4, "maxPINLength":8, "isPINOptional":false, "message1":"Enter PIN", "message2":"min 4 digits & max 8 digits", "processingMessage":"Pin processsing", "readTimeOut":5000},callbackfunction);```  
		//Callback : mandatory  
		//Callback Paramaters (Hash): ```{"status":"error","errorName":"TIMED_OUT"}```  
		it("VT377-022 - Should send back proper error status with the callback when nothing entered till the timeout with \"promptPin()\" ", function(){
			var spec = new ManualSpec(jasmine, window.document);
			spec.addGoal("VT377-022 - Should send status:error and errorName:\"TIMED_OUT\"");
			spec.addPrecondition("Payment device is paired with bluetooth to the device.");
			spec.addStep("Press 'RunTest' button");
			spec.addStep("Swipe magstripe card with payment device.");
			spec.addStep("Observe that PIN code request is prompted at the paymentDevice");
			spec.addStep("Do not enter PIN untill the timeout.")
			spec.addExpectation("Semi auto test case to check for the status:error and errorName:TIMED_OUT with the callback");
			spec.displayScenario();
            spec.waitForButtonPressing("Run test");
	        var cbstatus;
			runs(function(){
				Ruby.call('Mobilepayment','mobpay_open');
			});
			waitsFor(function(){
				return !!(document.getElementById('open').innerHTML !== '');
			},"waiting for open callback", 25000);
			runs(function(){
            	cbstatus = document.getElementById('open').innerHTML;
            	expect(cbstatus).toEqual("success");				
				Ruby.call('Mobilepayment','mobpay_readcard');
			});
			waitsFor(function(){
        		return !!(document.getElementById('cbresult').innerHTML !== '');
        	},25000);
			runs(function(){
				document.getElementById('cbstatus').innerHTML = '';
				document.getElementById('cbresult').innerHTML = '';
				document.getElementById('result2').innerHTML = '';
				Ruby.call('Mobilepayment','mobpay_promptpin?option=yes');
			});
			waitsFor(function(){
        		return !!(document.getElementById('cbresult').innerHTML !== '');
        	},25000);			
			runs(function(){
        		var status = document.getElementById('cbstatus').innerHTML;
        		var result = document.getElementById('result1').innerHTML;
	            expect(status).toEqual('error');
	            expect(result).toEqual('TIMED_OUT');
			});
		});

		//VT377-023 Should support method promptMenu()
		//VT377-023 Should prompt for Menu when below given paramters are called with promptMenu() and send back proper status with the callback
		//Access : ```Rho.MobilePayment.promptMenu({"messageLine1":"Message1","messageLine2":"Message2","choice1":"myMenu1","choice2":"myMenu2","choice3":"myMenu3","choice4":"myMenu4","timeout":3000})
		//Callback : mandatory
		//Callback Parameters (Hash) : ```{"status":"success","choice":"myMenu2"}```
		it("VT377-023 - Should support \"promptMenu()\" method with the paymentDevice object, to prompt menu items", function(){
			var spec = new ManualSpec(jasmine, window.document);
			spec.addGoal("VT377-023 - Should prompt Menu list with the payment device.");
			spec.addPrecondition("Payment device is paired with bluetooth to the device.");
			spec.addStep("Press 'RunTest' button");
			spec.addStep("Observe that Menu list is prompted for user selection with 2 Mesage Line and 4 Menu items.");
			spec.addStep("Select myMenu2 menu from the list");
			spec.addExpectation("Observe that status:success, choice:myMenu2 send with callback function.");
			spec.displayScenario();
            spec.waitForButtonPressing("Run test");
 	        var cbstatus;
			runs(function(){
				Ruby.call('Mobilepayment','mobpay_open');
			});
			waitsFor(function(){
				return !!(document.getElementById('open').innerHTML !== '');
			},"waiting for open callback", 25000);
			runs(function(){
            	cbstatus = document.getElementById('open').innerHTML;
            	expect(cbstatus).toEqual("success");				
				Ruby.call('Mobilepayment','mobpay_promptmenu');
			});
			waitsFor(function(){
        		return !!(document.getElementById('result1').innerHTML !== '');
        	},25000);
        	runs(function () {
        		var status = document.getElementById('cbstatus').innerHTML;
        		var result = document.getElementById('result1').innerHTML;
	            expect(status).toEqual('success');
	            expect(result).toEqual('myMenu2');
            });
		});

		//VT377-024 Should prompt for Menu when below given paramters are called with promptMenu() and send back proper status with the callback
		//Access : ```Rho.MobilePayment.promptMenu({"messageLine1":"Message1","messageLine2":"","choice1":"myMenu1","choice2":"myMenu2","timeout":3000,"deviceIndex":1})
		//Callback : mandatory
		//Callback Parameters (Hash) : ```{"status":"success","choice":"myMenu2","errorName":""}```
		it("VT377-024 - Should prompt menu with only one message line.", function(){
			var spec = new ManualSpec(jasmine, window.document);
			spec.addGoal("VT377-024 - Should prompt Menu list with the payment device.");
			spec.addPrecondition("Payment device is paired with bluetooth to the device.");
			spec.addStep("Press 'RunTest' button");
			spec.addStep("Observe that Menu list is prompted for user selection with 1 Mesage Line.");
			spec.addStep("Select myMenu2 menu from the list");
			spec.addExpectation("This is semi-auto test !");
			spec.displayScenario();
            spec.waitForButtonPressing("Run test");
 	        var cbstatus;
			runs(function(){
				Ruby.call('Mobilepayment','mobpay_open');
			});
			waitsFor(function(){
				return !!(document.getElementById('open').innerHTML !== '');
			},"waiting for open callback", 25000);
			runs(function(){
            	cbstatus = document.getElementById('open').innerHTML;
            	expect(cbstatus).toEqual("success");				
				Ruby.call('Mobilepayment','mobpay_promptmenu_onemsg?msg=yes');
			});
			waitsFor(function(){
        		return !!(document.getElementById('result1').innerHTML !== '');
        	},25000);
        	runs(function () {
        		var status = document.getElementById('cbstatus').innerHTML;
        		var result = document.getElementById('result1').innerHTML;
	            expect(status).toEqual('success');
	            expect(result).toEqual('myMenu2');
            });
		});

		//VT377-025 prompt for Menu when below given paramters are called with promptMenu() and send back proper status with the callback
		//Access : ```Rho.MobilePayment.promptMenu({"messageLine1":"","messageLine2":"","choice1":"myMenu1","choice2":"myMenu2","timeout":3000,"deviceIndex":1})
		//Callback : mandatory
		//Callback Parameters (Hash) : ```{"status":"success","choice":"myMenu2","errorId":"","description":""}```
		it("VT377-025 - Should prompt menu in the paymentDevice with no Message Line", function(){
			var spec = new ManualSpec(jasmine, window.document);
			spec.addGoal("VT377-025 - Should prompt Menu list with the payment device.");
			spec.addPrecondition("Payment device is paired with bluetooth to the device.");
			spec.addStep("Press 'RunTest' button");
			spec.addStep("Observe that Menu list is prompted for user selection with  no Mesage Line.");
			spec.addStep("Select myMenu2 menu from the list");
			spec.addExpectation("Semi auto test case to check callback is triggered with status:success, choice:myMenu2,errorId:'' and description:'' send with callback function.");
			spec.displayScenario();
            spec.waitForButtonPressing("Run test");
 	        var cbstatus;
			runs(function(){
				Ruby.call('Mobilepayment','mobpay_open');
			});
			waitsFor(function(){
				return !!(document.getElementById('open').innerHTML !== '');
			},"waiting for open callback", 25000);
			runs(function(){
            	cbstatus = document.getElementById('open').innerHTML;
            	expect(cbstatus).toEqual("success");				
				Ruby.call('Mobilepayment','mobpay_promptmenu_onemsg?msg=yes');
			});
			waitsFor(function(){
        		return !!(document.getElementById('result1').innerHTML !== '');
        	},25000);
        	runs(function () {
        		var status = document.getElementById('cbstatus').innerHTML;
        		var result = document.getElementById('result1').innerHTML;
	            expect(status).toEqual('success');
	            expect(result).toEqual('myMenu2');
            });
		});

		//VT377-026 Should not prompt for Menu when below given paramters are called with promptMenu() and send back proper status with the callback
		//Access : ```Rho.MobilePayment.promptMenu({"messageLine1":"","messageLine2":"","choice1":"","choice2":"","timeout":3000,"deviceIndex":1})
		//Callback : mandatory
		//Callback Parameters (Hash) : ```{"status":"error","choice":"","errorId":4,"description":"INVALID_VALUE"}```
		it("VT377-026 - Should not prompt menu when no parameters are sent with the \"promptMenu()\" method", function(){
			var spec = new ManualSpec(jasmine, window.document);
			spec.addGoal("VT377-026 - Should not prompt Menu list when promptMenu called with null parameters.");
			spec.addPrecondition("Payment device is paired with bluetooth to the device.");
			spec.addStep("Press 'RunTest' button");
			spec.addExpectation("Observe that Menu list is not prompted.");
			spec.addExpectation("Semi auto test case to check callback is triggered with parameters 'status':'error','errorName':'INVALID_VALUE'}");
			spec.displayScenario();
            spec.waitForButtonPressing("Run test");
 	        var cbstatus;
			runs(function(){
				Ruby.call('Mobilepayment','mobpay_open');
			});
			waitsFor(function(){
				return !!(document.getElementById('open').innerHTML !== '');
			},"waiting for open callback", 25000);
			runs(function(){
            	cbstatus = document.getElementById('open').innerHTML;
            	expect(cbstatus).toEqual("success");				
				Ruby.call('Mobilepayment','mobpay_promptmenu_empty');
			});
			waitsFor(function(){
        		return !!(document.getElementById('result1').innerHTML !== '');
        	},25000);
        	runs(function () {
        		var status = document.getElementById('cbstatus').innerHTML;
        		var result = document.getElementById('result1').innerHTML;
	            expect(status).toEqual('success');
	            expect(result).toEqual('myMenu2');
            });
		});

		//VT377-027 Should send back proper status with the callback when no menu is selected and enter key is pressed
		//Access : ```Rho.MobilePayment.promptMenu({"messageLine1":"Message1","messageLine2":"Message2","choice1":"myMenu1","choice2":"myMenu2","timeout":3000,"deviceIndex":1})
		//Callback : mandatory
		//Callback Parameters (Hash) : ```{"status":"error","choice":"","errorId":18,"description":"ENTER_KEY_PRESSED"}```
		it("VT377-027 - Should send proper error status with the callback when enter key is pressed instead of selecting any menu item.", function(){
			var spec = new ManualSpec(jasmine, window.document);
			spec.addGoal("VT377-027 - Should send status:error errorName:OK_KEY_PRESSED with the callback by pressing entery key with the device in promptMenu.");
			spec.addPrecondition("Payment device is paired with bluetooth to the device.");
			spec.addStep("Press 'RunTest' button");
			spec.addExpectation("Press Enter/Ok key instead of selecting any menu item from the list.");
			spec.addExpectation("Semi auto test case to check callback is triggered with parameters 'status':'error','errorName':'OK_KEY_PRESSED'}");
			spec.displayScenario();
            spec.waitForButtonPressing("Run test");
 	        var cbstatus;
			runs(function(){
				Ruby.call('Mobilepayment','mobpay_open');
			});
			waitsFor(function(){
				return !!(document.getElementById('open').innerHTML !== '');
			},"waiting for open callback", 25000);
			runs(function(){
            	cbstatus = document.getElementById('open').innerHTML;
            	expect(cbstatus).toEqual("success");				
				Ruby.call('Mobilepayment','mobpay_promptmenu_key');
			});
			waitsFor(function(){
        		return !!(document.getElementById('result2').innerHTML !== '');
        	},25000);
        	runs(function () {
        		var status = document.getElementById('cbstatus').innerHTML;
        		var result = document.getElementById('result2').innerHTML;
	            expect(status).toEqual('error');
	            expect(result).toEqual('OK_KEY_PRESSED');
            });
		});

		//VT377-028 send back proper status with the callback when no menu is selected and cancel key is pressed
		//Access : ```Rho.MobilePayment.promptMenu({"messageLine1":"Message1","messageLine2":"Message2","choice1":"myMenu1","choice2":"myMenu2","timeout":3000,"deviceIndex":1})
		//Callback : mandatory
		//Callback Parameters (Hash) : ```{"status":"error","errorName":"CANCEL_KEY_PRESSED"}```
		it("VT377-028 - Should send proper error status with the callback when cancel key is pressed instead of selecting any menu item.", function(){
			var spec = new ManualSpec(jasmine, window.document);
			spec.addGoal("VT377-028 - Should send status:error errorName:CANCEL_KEY_PRESSED with the callback by pressing entery key with the device in promptMenu.");
			spec.addPrecondition("Payment device is paired with bluetooth to the device.");
			spec.addStep("Press 'RunTest' button");
			spec.addExpectation("Press Cancel key instead of selecting any menu item from the list.");
			spec.addExpectation("Semi auto test case to check callback is triggered with parameters 'status':'error','errorName':'CANCEL_KEY_PRESSED'}");
			spec.displayScenario();
            spec.waitForButtonPressing("Run test");
 	        var cbstatus;
			runs(function(){
				Ruby.call('Mobilepayment','mobpay_open');
			});
			waitsFor(function(){
				return !!(document.getElementById('open').innerHTML !== '');
			},"waiting for open callback", 25000);
			runs(function(){
            	cbstatus = document.getElementById('open').innerHTML;
            	expect(cbstatus).toEqual("success");				
				Ruby.call('Mobilepayment','mobpay_promptmenu_key?key=cancel');
			});
			waitsFor(function(){
        		return !!(document.getElementById('result2').innerHTML !== '');
        	},25000);
        	runs(function () {
        		var status = document.getElementById('cbstatus').innerHTML;
        		var result = document.getElementById('result2').innerHTML;
	            expect(status).toEqual('error');
	            expect(result).toEqual('CANCEL_KEY_PRESSED');
            });
		});

		//VT377-029 Should throw proper exception when no callback is passed withe the promptMenu() method.
		//Access : ```Rho.MobilePayment.promptMenu({},null);
		it("VT377-029 - Should throw proper exception when no callback is passed with the \"promptMenu()\" method.", function(){
			var spec = new ManualSpec(jasmine, window.document);
			spec.addGoal("VT377-000 - Should throw proper exception when no callback is passed with the promptMenu() method.");
			spec.addPrecondition("Payment device is paired with bluetooth to the device.");
			spec.addStep("Press 'RunTest' button");
			spec.addExpectation("Error should be displayed as 'Wrong number of arguments'");
			spec.displayScenario();
            spec.waitForButtonPressing("Run test");
 	        var cbstatus;
			runs(function(){
				Ruby.call('Mobilepayment','mobpay_open');
			});
			waitsFor(function(){
				return !!(document.getElementById('open').innerHTML !== '');
			},"waiting for open callback", 25000);
			runs(function(){
            	cbstatus = document.getElementById('open').innerHTML;
            	expect(cbstatus).toEqual("success");				
				Ruby.call('Mobilepayment','mobpay_promptmenu_exception');
			});
			waitsFor(function(){
        		return !!(document.getElementById('result2').innerHTML !== '');
        	},25000);
        	runs(function () {
        		var result = document.getElementById('result2').innerHTML;
	            expect(result).toEqual('Wrong number of arguments');
            });
		});

		//VT377-030 Should send back proper status with the callback when device is not opened before executing the method promptMenu()
		//Access : ```Rho.MobilePayment.promptMenu({"messageLine1":"Message1","messageLine2":"Message2","choice1":"myMenu1","choice2":"myMenu2","timeout":3000,"deviceIndex":1})
		//Callback : mandatory
		//Callback Parameters (Hash) : ```{"status":"error","errorName":"DEVICE_NOT_ENABLED"}```
		it("VT377-030 - Should send proper error status with the callback when \"promptMenu()\" method called before opening the device.", function(){
			var spec = new ManualSpec(jasmine, window.document);
			spec.addGoal("VT377-030 - Should send errorId:18 description:ENER_KEY_PRESSED with the callback by pressing entery key with the device in promptMenu.");
			spec.addPrecondition("Ensure Payment device is not paired with bluetooth to the device.");
			spec.addStep("Press 'RunTest' button");
			spec.addExpectation("Press Cancel key instead of selecting any menu item from the list.");
			spec.addExpectation("Semi auto test case to check callback is triggered with parameters 'status':'error','errorName':'DEVICE_NOT_ENABLED'}");
			spec.displayScenario();
            spec.waitForButtonPressing("Run test");
 	        var cbstatus;
			runs(function(){
				Ruby.call('Mobilepayment','mobpay_close');
			});
			waitsFor(function(){
				return !!(document.getElementById('open').innerHTML !== '');
			},"waiting for open callback", 25000);
			runs(function(){
            	cbstatus = document.getElementById('open').innerHTML;
            	expect(cbstatus).toEqual("success");				
				Ruby.call('Mobilepayment','mobpay_promptmenu_key');
			});
			waitsFor(function(){
        		return !!(document.getElementById('result2').innerHTML !== '');
        	},25000);
        	runs(function () {
        		var status = document.getElementById('cbstatus').innerHTML;
        		var result = document.getElementById('result2').innerHTML;
	            expect(status).toEqual('error');
	            expect(result).toEqual('DEVICE_NOT_ENABLED');
            });
		});

		//VT377-031 Should support method promptAdditionalInfo()
		//VT377-031 Should display the additionalInformation message with the payment device.
		//Access : ```Rho.MobilePayment.promptAdditionalInfo({})```
		//Parameters : Hash : {"amount":10.00,"langCode":0,"promptForTip":true,"cashBack":false,"surcharge":10.00,"timeout":3000}
		//Callback : Hash : {"status":true,"errorId":"","description":"","tip":10.00,"cashBack":0,"surchargeIndicator":""}
		it("VT377-031 - Should support \"promptAdditionalInfo()\" method with the paymentDevice object, to prompt/show for amount and tip information", function(){
			var spec = new ManualSpec(jasmine, window.document);
			spec.addGoal("VT377-031 - Should prompt additional information to confirm the amount passed by the application and request for the tip amount");
			spec.addPrecondition("Payment device is paired with bluetooth to the device.");
			spec.addStep("Press 'RunTest' button");
			spec.addStep("Prompt to enter tip amount is shown in the device");
			spec.addStep("Enter value '10.00' in the above prompt");
			spec.addExpectation("Observe that additional information with amount and tip amount is displayed with the payment device and callback is triggered with paramter {'status':true,'errorId':'','description':'','tip':10.00,'cashBack':0,'surchargeIndicator':''}");
			spec.displayScenario();
            spec.waitForButtonPressing("Run test");
 	        var cbstatus;
			runs(function(){
				Ruby.call('Mobilepayment','mobpay_open');
			});
			waitsFor(function(){
				return !!(document.getElementById('open').innerHTML !== '');
			},"waiting for open callback", 25000);
			runs(function(){
            	cbstatus = document.getElementById('open').innerHTML;
            	expect(cbstatus).toEqual("success");
				Ruby.call('Mobilepayment','mobpay_prompt_addinfo?promptpin=true');
				spec.waitForResponse();
			});
		});

		//VT377-032 Should display the additionalInformation message with the payment device.
		//Access : ```Rho.MobilePayment.promptAdditionalInfo({})```
		//Parameters : Hash : {"amount":100.00,"langCode":0,"promptForTip":false,"cashBack":true,"surcharge":10.00,"timeout":3000}  
		//Callback : Hash : {"status":true,"errorId":"","description":"","tip":0,"cashBack":20.00,"surchargeIndicator":""}  
		it("VT377-032 - Should support \"promptAdditionalInfo()\" method with the paymentDevice object, to prompt/show for amount and cashback information", function(){
			var spec = new ManualSpec(jasmine, window.document);
			spec.addGoal("VT377-032 - Should prompt additional information to confirm the amount passed by the application and request for the Cash back amount");
			spec.addPrecondition("Payment device is paired with bluetooth to the device.");
			spec.addStep("Press 'RunTest' button");
			spec.addStep("Prompt to select cash back is shown in the payment device");
			spec.addStep("Select $20.");
			spec.addExpectation("Observe that additional information with amount and cashback amount is displayed with the payment device and callback is triggered with paramter {'status':true,'errorId':'','description':'','tip':0,'cashBack':20.0,'surchargeIndicator':''}");
			spec.displayScenario();
            spec.waitForButtonPressing("Run test");
 	        var cbstatus;
			runs(function(){
				Ruby.call('Mobilepayment','mobpay_open');
			});
			waitsFor(function(){
				return !!(document.getElementById('open').innerHTML !== '');
			},"waiting for open callback", 25000);
			runs(function(){
            	cbstatus = document.getElementById('open').innerHTML;
            	expect(cbstatus).toEqual("success");
				Ruby.call('Mobilepayment','mobpay_prompt_addinfo?cashback=true');
				spec.waitForResponse();
			});
		});

		//VT377-033 Should display the additionalInformation message with the payment device.
		//Access : ```Rho.MobilePayment.promptAdditionalInfo({})```
		//Parameters : Hash : {"amount":100.00,"langCode":0,"promptForTip":false,"cashBack":false,"surcharge":0,"timeout":3000}
		//Callback : Hash : {"status":false,"errorId":8,"description":"DEVICE_NOT_ENABLED"}
		it("VT377-033 - Should not prompt in the payment device and should trigger callback with proper error status, when payment device is not paired with device", function(){
			var spec = new ManualSpec(jasmine, window.document);
			spec.addGoal("VT377-033 - Should prompt additional information to confirm the amount passed by the application.");
			spec.addPrecondition("Payment device is not opened with bluetooth to the device.");
			spec.addStep("Press 'RunTest' button");
			spec.addExpectation("Check that no prompt is shown with the payment device and callback is triggered with the param {'status':'error','errorName':'DEVICE_NOT_ENABLED'}");
			spec.displayScenario();
            spec.waitForButtonPressing("Run test");
 	        var cbstatus;
			runs(function(){
				Ruby.call('Mobilepayment','mobpay_close');
			});
			waitsFor(function(){
				return !!(document.getElementById('open').innerHTML !== '');
			},"waiting for open callback", 25000);
			runs(function(){
            	cbstatus = document.getElementById('open').innerHTML;
            	expect(cbstatus).toEqual("success");				
				Ruby.call('Mobilepayment','mobpay_prompt_addinfo?cashback=true');
			});
			waitsFor(function(){
        		return !!(document.getElementById('result1').innerHTML !== '');
        	},25000);
        	runs(function () {
        		var status = document.getElementById('cbstatus').innerHTML;
        		var result = document.getElementById('result1').innerHTML;
	            expect(status).toEqual('error');
	            expect(result).toEqual('DEVICE_NOT_ENABLED');
            });
		});

		//VT377-034 Should send back proper status with the callback when no menu is selected and enter key is pressed
		//Access : ```Rho.MobilePayment.promptAdditionalInfo({"amount":10.00,"langCode":0,"promptForTip":false,"cashBack":false,"surcharge":10.00,"timeout":3000})
		//Callback : mandatory
		//Callback Parameters (Hash) : ```{"status":"error","errorName":"OK_KEY_PRESSED"}```
		it("VT377-034 - Should send proper error status with the callback when enter key is pressed instead of selecting any menu item.", function(){
			var spec = new ManualSpec(jasmine, window.document);
			spec.addGoal("VT377-034 - Should not send status:error with the callback by pressing entery key with the device in promptAdditionalInfo.");
			spec.addPrecondition("Payment device is paired with bluetooth to the device.");
			spec.addStep("Press 'RunTest' button");
			spec.addExpectation("Press Enter/OK key with the additional info prompt.");
			spec.addExpectation("Semi auto test case to check callback is triggered with parameters 'status':'success'}");
			spec.displayScenario();
            spec.waitForButtonPressing("Run test");
 	        var cbstatus;
			runs(function(){
				Ruby.call('Mobilepayment','mobpay_open');
			});
			waitsFor(function(){
				return !!(document.getElementById('open').innerHTML !== '');
			},"waiting for open callback", 25000);
			runs(function(){
            	cbstatus = document.getElementById('open').innerHTML;
            	expect(cbstatus).toEqual("success");				
				Ruby.call('Mobilepayment','mobpay_prompt_addinfo?cashback=true');
			});
			waitsFor(function(){
        		return !!(document.getElementById('cbstatus').innerHTML !== '');
        	},25000);
        	runs(function () {
        		var status = document.getElementById('cbstatus').innerHTML;
	            expect(status).toEqual('success');
            });
		});

		//VT377-035 Should send back proper status with the callback when no menu is selected and cancel key is pressed
		//Access : ```Rho.MobilePayment.promptAdditionalInfo({"amount":10.00,"langCode":0,"promptForTip":false,"cashBack":false,"surcharge":10.00,"timeout":3000})
		//Callback : mandatory
		//Callback Parameters (Hash) : ```{"status":"error","errorName":"OPERATION_CANCELLED"}```
		it("VT377-035 - Should send proper error status with the callback when cancel key is pressed with additional info prompt.", function(){
			var spec = new ManualSpec(jasmine, window.document);
			spec.addGoal("VT377-035 - Should send status:error and errorName:CANCEL_KEY_PRESSED with the callback by pressing entery key with the device.");
			spec.addPrecondition("Payment device is paired with bluetooth to the device.");
			spec.addStep("Press 'RunTest' button");
			spec.addStep("Press Cancel key with the additional info prompt.");
			spec.addExpectation("Semi auto test case to check callback is triggered with parameters 'status':'error','errorName':'OPERATION_CANCELLED'}");
			spec.displayScenario();
            spec.waitForButtonPressing("Run test");
 	        var cbstatus;
			runs(function(){
				Ruby.call('Mobilepayment','mobpay_close');
			});
			waitsFor(function(){
				return !!(document.getElementById('open').innerHTML !== '');
			},"waiting for open callback", 25000);
			runs(function(){
            	cbstatus = document.getElementById('open').innerHTML;
            	expect(cbstatus).toEqual("success");				
				Ruby.call('Mobilepayment','mobpay_prompt_addinfo');
			});
			waitsFor(function(){
        		return !!(document.getElementById('result1').innerHTML !== '');
        	},25000);
        	runs(function () {
        		var status = document.getElementById('cbstatus').innerHTML;
        		var result = document.getElementById('result1').innerHTML;
	            expect(status).toEqual('error');
	            expect(result).toEqual('DEVICE_NOT_ENABLED');
            });
		});

		//VT377-036 Should support method promptMessage()
		//Access : ```Rho.MobilePayment.promptMessage()```
		//Param : Hash ({"messageLine1":"","messageLine2":"","messageLine3":"","messageLine4":"","getUserConfirmation":false,"timeout":3000,"deviceIndex":1})
		//Callback : mandatory
		//Callback param : Hash ({"status":"true", "errorId":, "description":""})
		it("VT377-036 - Should support \"prompmtMessage()\" method with the paymentDevice object, to prompt message with the payment device.", function(){
			var spec = new ManualSpec(jasmine, window.document);
			spec.addGoal("VT377-036 - Should prompt message with the paymentDevice.");
			spec.addPrecondition("Payment device is paired with bluetooth to the device.");
			spec.addPrecondition("Ensure payment device is opened");
			spec.addStep("Press 'RunTest' button.");
			spec.addExpectation("Check that promptMessage is shown with the payment device. and callback is triggered with the param {'status':'success','userConfirmationMessage':''}");
			spec.displayScenario();
            spec.waitForButtonPressing("Run test");
 	        var cbstatus;
			runs(function(){
				Ruby.call('Mobilepayment','mobpay_open');
			});
			waitsFor(function(){
				return !!(document.getElementById('open').innerHTML !== '');
			},"waiting for open callback", 25000);
			runs(function(){
            	cbstatus = document.getElementById('open').innerHTML;
            	expect(cbstatus).toEqual("success");
				Ruby.call('Mobilepayment','mobpay_prompt_msg');
				spec.waitForResponse();
			});
		});

		//VT377-037 Should support method promptMessage() with confirmation Ok
		//Access : ```Rho.MobilePayment.promptMessage()```
		//Param : Hash ({"messageLine1":"","messageLine2":"","messageLine3":"","messageLine4":"","getUserConfirmation":true,"timeout":3000,"deviceIndex":1})
		//Callback : mandatory
		//Callback param : Hash ({"status":"true", "errorId":, "description":"","userConfirmationMessage":"OK"})
		it("VT377-037 - Should support \"prompmtMessage()\" along with user confirmation with the paymentDevice object, to prompt message with the payment device.", function(){
			var spec = new ManualSpec(jasmine, window.document);
			spec.addGoal("VT377-037 - Should prompt message with user confirmation with the paymentDevice.");
			spec.addPrecondition("Payment device is paired with bluetooth to the device.");
			spec.addPrecondition("Ensure payment device is opened");
			spec.addStep("Press 'RunTest' button.");
			spec.addStep("Select positive selection from the confirmation.");
			spec.addExpectation("This is semi-auto test to check that promptMessage is shown with user confirmation with the payment device. and callback is triggered with the param {'status':'success','userConfirmationMessage':'OK'}");
			spec.displayScenario();
            spec.waitForButtonPressing("Run test");
 	        var cbstatus;
			runs(function(){
				Ruby.call('Mobilepayment','mobpay_open');
			});
			waitsFor(function(){
				return !!(document.getElementById('open').innerHTML !== '');
			},"waiting for open callback", 25000);
			runs(function(){
            	cbstatus = document.getElementById('open').innerHTML;
            	expect(cbstatus).toEqual("success");
				Ruby.call('Mobilepayment','mobpay_prompt_msg?confirm=true');
			});
			runs(function(){
        		var status = document.getElementById('cbstatus').innerHTML;
        		var result = document.getElementById('result2').innerHTML;
	            expect(status).toEqual('success');
	            expect(result).toEqual('OK_KEY_PRESSED');
			});
		});

		//VT377-038 Should support method promptMessage() with confirmation Cancel
		//Access : ```Rho.MobilePayment.promptMessage()```
		//Param : Hash ({"messageLine1":"","messageLine2":"","messageLine3":"","messageLine4":"","getUserConfirmation":true,"timeout":3000})
		//Callback : mandatory
		//Callback param : Hash ({"status":"success","userConfirmationMessage":"CANCEL"})
		it("VT377-038 - CANCEL-Should support \"prompmtMessage()\" along with user confirmation with the paymentDevice object, to prompt message with the payment device.", function(){
			var spec = new ManualSpec(jasmine, window.document);
			spec.addGoal("VT377-038 - Should prompt message with user confirmation with the paymentDevice.");
			spec.addPrecondition("Payment device is paired with bluetooth to the device.");
			spec.addPrecondition("Ensure payment device is opened");
			spec.addStep("Press 'RunTest' button.");
			spec.addStep("Select negative selection from the Message Prompt.");
			spec.addExpectation("Check that promptMessage is shown with user confirmation with the payment device. and callback is triggered with the param {'status':'success','errorName':'','userConfirmationMessage':'CANCEL'}");
			spec.displayScenario();
            spec.waitForButtonPressing("Run test");
			var cbstatus;
			runs(function(){
				Ruby.call('Mobilepayment','mobpay_open');
			});
			waitsFor(function(){
				return !!(document.getElementById('open').innerHTML !== '');
			},"waiting for open callback", 25000);
			runs(function(){
            	cbstatus = document.getElementById('open').innerHTML;
            	expect(cbstatus).toEqual("success");
				Ruby.call('Mobilepayment','mobpay_prompt_msg?confirm=true');
			});
			runs(function(){
        		var status = document.getElementById('cbstatus').innerHTML;
        		var result = document.getElementById('result2').innerHTML;
	            expect(status).toEqual('success');
	            expect(result).toEqual('CANCEL_KEY_PRESSED');
			});
		});

		//VT377-039 Should send proper error status with the callback when timedout without any user interaction with promptMessage()
		//Access : ```Rho.MobilePayment.promptMessage()```
		//Param : Hash ({"messageLine1":"","messageLine2":"","messageLine3":"","messageLine4":"","getUserConfirmation":true,"timeout":3000,"deviceIndex":1})
		//Callback : mandatory
		it("VT377-039 - Should send proper error status with the callback when timedout without any user interaction with promptMessage", function(){
			var spec = new ManualSpec(jasmine, window.document);
			spec.addGoal("VT377-039 - Should send proper error status with the callback when timedout without any user interaction with promptMessage");
			spec.addPrecondition("Payment device is paired with bluetooth to the device.");
			spec.addPrecondition("Ensure payment device is opened.");
			spec.addStep("Press 'RunTest' button.");
			spec.addExpectation("Semi auto test to check callback is triggered with status:error, errorName:TIMED_OUT");
			spec.displayScenario();
            spec.waitForButtonPressing("Run test");
			var cbstatus;
			runs(function(){
				Ruby.call('Mobilepayment','mobpay_open');
			});
			waitsFor(function(){
				return !!(document.getElementById('open').innerHTML !== '');
			},"waiting for open callback", 25000);
			runs(function(){
            	cbstatus = document.getElementById('open').innerHTML;
            	expect(cbstatus).toEqual("success");
				Ruby.call('Mobilepayment','mobpay_prompt_msg?confirm=true');
			});
			runs(function(){
        		var status = document.getElementById('cbstatus').innerHTML;
        		var result = document.getElementById('result1').innerHTML;
	            expect(status).toEqual('error');
	            expect(result).toEqual('TIMED_OUT');
			});
		});

		//VT377-040 Should send proper error status with the callback when Enter key is pressed with the payment device when message is prompted.
		//Access : ```Rho.MobilePayment.promptMessage()```
		//Param : Hash ({"messageLine1":"First Line","messageLine2":"Second Line","messageLine3":"Third Line","messageLine4":"Fourth Line","getUserConfirmation":true,"timeout":3000,"deviceIndex":1})
		//Callback : mandatory
		it("VT377-040 - FalseOk-Should send proper error status with the callback when timedout without any user interaction with promptMessage", function(){
			var spec = new ManualSpec(jasmine, window.document);
			spec.addGoal("VT377-040 - Should send proper error status with the callback when timedout without any user interaction with promptMessage");
			spec.addPrecondition("Payment device is paired with bluetooth to the device.");
			spec.addPrecondition("Ensure payment device is opened.");
			spec.addStep("Press 'RunTest' button.");
			spec.addStep("Press Enter key from the device when prompt message is shown to the user with the device.");
			spec.addExpectation("Semi auto test to check callback is triggered with status:error, errorName:OK_KEY_PRESSED");
			spec.displayScenario();
            spec.waitForButtonPressing("Run test");
			var cbstatus;
			runs(function(){
				Ruby.call('Mobilepayment','mobpay_open');
			});
			waitsFor(function(){
				return !!(document.getElementById('open').innerHTML !== '');
			},"waiting for open callback", 25000);
			runs(function(){
            	cbstatus = document.getElementById('open').innerHTML;
            	expect(cbstatus).toEqual("success");
				Ruby.call('Mobilepayment','mobpay_prompt_msg');
			});
			runs(function(){
        		var status = document.getElementById('cbstatus').innerHTML;
	            expect(status).toEqual('success');
			});
		});

		//VT377-041 Should send proper error status with the callback when Cancel key is pressed with the payment device when message is prompted.
		//Access : ```Rho.MobilePayment.promptMessage()```
		//Param : Hash ({"messageLine1":"First Line","messageLine2":"Second Line","messageLine3":"Third Line","messageLine4":"Fourth Line","getUserConfirmation":true,"timeout":3000,"deviceIndex":1})
		//Callback : mandatory
		it("VT377-041 - FalseCancel-Should send proper error status with the callback when timedout without any user interaction with promptMessage", function(){
			var spec = new ManualSpec(jasmine, window.document);
			spec.addGoal("VT377-041 - Should send proper error status with the callback when timedout without any user interaction with promptMessage");
			spec.addPrecondition("Payment device is paired with bluetooth to the device.");
			spec.addPrecondition("Ensure payment device is opened.");
			spec.addStep("Press 'RunTest' button.");
			spec.addStep("Press Cancel key from the device when prompt message is shown to the user with the device.");
			spec.addExpectation("Semi auto test to check callback is triggered with status:error, errorName:CANCEL_KEY_PRESSED");
			spec.displayScenario();
            spec.waitForButtonPressing("Run test");
			var cbstatus;
			runs(function(){
				Ruby.call('Mobilepayment','mobpay_open');
			});
			waitsFor(function(){
				return !!(document.getElementById('open').innerHTML !== '');
			},"waiting for open callback", 25000);
			runs(function(){
            	cbstatus = document.getElementById('open').innerHTML;
            	expect(cbstatus).toEqual("success");
				Ruby.call('Mobilepayment','mobpay_prompt_msg');
			});
			runs(function(){
        		var status = document.getElementById('cbstatus').innerHTML;
        		var result = document.getElementById('result1').innerHTML;
	            expect(status).toEqual('error');
	            expect(result).toEqual('CANCEL_KEY_PRESSED');
	        });
		});

		//VT377-042 Should support method abort() to cancel the previously issued method to paymentDevice
		it("VT377-042 - Should support \"abort()\" method with the paymentDevice object, to stop the previously given command to payment device.", function(){
			var spec = new ManualSpec(jasmine, window.document);
			spec.addGoal("VT377-042 - Should abort the previously given promptPin method");
			spec.addPrecondition("Payment device is paired with bluetooth to the device.");
			spec.addStep("Press 'RunTest' button.");
			spec.addExpectation("Check that payment device did not prompt for Pin.");
			spec.displayScenario();
            spec.waitForButtonPressing("Run test");
			var cbstatus;
			var wait;
			runs(function(){
				Ruby.call('Mobilepayment','mobpay_open');
			});
			waitsFor(function(){
				return !!(document.getElementById('open').innerHTML !== '');
			},"waiting for open callback", 25000);
			runs(function(){
            	cbstatus = document.getElementById('open').innerHTML;
            	expect(cbstatus).toEqual("success");
				Ruby.call('Mobilepayment','mobpay_prompt_abort');
			});
			waitsFor(function(){
				setTimeout(function(){ wait=true;}, 13000);
				return wait == true;
            },"waitsFor timeout",15000);
	       	runs(function(){
	       		var cbstatus = document.getElementById('result1').innerHTML;
	       		expect(cbstatus).toEqual('false');
			});
		});
		
		//VT377-043 Should support for method getting the battery level
		it("VT377-043 - Should support for method getBatteryLevel, for getting the battery level of the payment device.", function(){
			var spec = new ManualSpec(jasmine, window.document);
			spec.addGoal("VT377-043 - Should support for method getBatteryLevel, for getting the battery level of the payment device.");
			spec.addPrecondition("Payment device is paired with bluetooth to the device.");
			spec.addStep("Press 'RunTest' button.");
			spec.addExpectation("Battery level of the payment device is retrieved successfully and should be integer.");
			spec.displayScenario();
            spec.waitForButtonPressing("Run test");
			var cbstatus;
			runs(function(){
				Ruby.call('Mobilepayment','mobpay_open');
			});
			waitsFor(function(){
				return !!(document.getElementById('open').innerHTML !== '');
			},"waiting for open callback", 25000);
			runs(function(){
            	cbstatus = document.getElementById('open').innerHTML;
            	expect(cbstatus).toEqual("success");
				Ruby.call('Mobilepayment','mobpay_batterylevel');
				spec.waitForResponse();
			});
		});
		it("VT377-044 - Should get the battery level of the payment device even if it is not opened.", function(){
			var spec = new ManualSpec(jasmine, window.document);
			spec.addGoal("VT377-044 - Should get the battery level of the payment device even if it is not opened");
			spec.addPrecondition("Payment device is paired with bluetooth to the device.");
			spec.addStep("Press 'RunTest' button.");
			spec.addExpectation("Battery level of the payment device is retrieved successfully and VT377-000 be integer.");
			spec.displayScenario();
            spec.waitForButtonPressing("Run test");
			var cbstatus;
			runs(function(){
				Ruby.call('Mobilepayment','mobpay_close');
			});
			waitsFor(function(){
				return !!(document.getElementById('open').innerHTML !== '');
			},"waiting for open callback", 25000);
			runs(function(){
            	cbstatus = document.getElementById('open').innerHTML;
            	expect(cbstatus).toEqual("success");
				Ruby.call('Mobilepayment','mobpay_batterylevel');
				spec.waitForResponse();
			});
		});
		it("VT377-045 - Should get the threshold value of the low battery level using method getLowBatteryThreshold().", function(){
			var spec = new ManualSpec(jasmine, window.document);
			spec.addGoal("VT377-045 - Should get the threshold value of the LowBattery level.");
			spec.addPrecondition("Payment device is paired with bluetooth to the device.");
			spec.addStep("Press 'RunTest' button.");
			spec.addExpectation("LowBatteryThreshold value of the payment device is retrieved successfully.");
			spec.displayScenario();
            spec.waitForButtonPressing("Run test");
			var cbstatus;
			runs(function(){
				Ruby.call('Mobilepayment','mobpay_open');
			});
			waitsFor(function(){
				return !!(document.getElementById('open').innerHTML !== '');
			},"waiting for open callback", 25000);
			runs(function(){
            	cbstatus = document.getElementById('open').innerHTML;
            	expect(cbstatus).toEqual("success");
				Ruby.call('Mobilepayment','mobpay_lowbatterythreshold');
				spec.waitForResponse();
			});
		});
		it("VT377-046 - Should throw proper error status while getting lowBatteryThreshold value of payment device, when not opened", function(){
			var spec = new ManualSpec(jasmine, window.document);
			spec.addGoal("VT377-046 - Should return proper error status while getting lowBatteryThreshold value when device is not opened.");
			spec.addPrecondition("Payment device is paired with bluetooth to the device.");
			spec.addStep("Press 'RunTest' button.");
			spec.addExpectation("Proper error status is returned.");
			spec.displayScenario();
            spec.waitForButtonPressing("Run test");
			var cbstatus;
			runs(function(){
				Ruby.call('Mobilepayment','mobpay_close');
			});
			waitsFor(function(){
				return !!(document.getElementById('open').innerHTML !== '');
			},"waiting for open callback", 25000);
			runs(function(){
            	cbstatus = document.getElementById('open').innerHTML;
            	expect(cbstatus).toEqual("success");
				Ruby.call('Mobilepayment','mobpay_lowbatterythreshold');
				spec.waitForResponse();
			});
		});
		it("VT377-047 - Should set the threshold value for the low battery level using method setLowBatteryThreshold().", function(){
			var spec = new ManualSpec(jasmine, window.document);
			spec.addGoal("VT377-047 - Should set the threshold value for the low battery level using method setLowBatteryThreshold().");
			spec.addPrecondition("Payment device is paired with bluetooth to the device.");
			spec.addStep("Press 'RunTest' button.");
			spec.addExpectation("This is semi-auto to test for setting LowBattery threshold value to the payment device successfully.");
			spec.displayScenario();
            spec.waitForButtonPressing("Run test");
			var cbstatus;
			runs(function(){
				Ruby.call('Mobilepayment','mobpay_open');
			});
			waitsFor(function(){
				return !!(document.getElementById('open').innerHTML !== '');
			},"waiting for open callback", 25000);
			runs(function(){
            	cbstatus = document.getElementById('open').innerHTML;
            	expect(cbstatus).toEqual("success");
				Ruby.call('Mobilepayment','mobpay_setbatterylevel');
				spec.waitForResponse();
			});            
			runs(function(){
				var status = document.getElementById('cbstatus').innerHTML;
        		var result = document.getElementById('result1').innerHTML;
	            expect(status).toEqual('success');
	            expect(result).toEqual('1');				
			});
		});
		it("VT377-048 - Should set the threshold value for the low battery level, when the device is not opened.", function(){
			var spec = new ManualSpec(jasmine, window.document);
			spec.addGoal("VT377-048 - Should return proper error status while setting lowBatteryThreshold value when device is not opened.");
			spec.addPrecondition("Payment device is paired with bluetooth to the device.");
			spec.addStep("Press 'RunTest' button.");
			spec.addExpectation("Proper error status is returned.");
			spec.displayScenario();
            spec.waitForButtonPressing("Run test");
			var cbstatus;
			runs(function(){
				Ruby.call('Mobilepayment','mobpay_close');
			});
			waitsFor(function(){
				return !!(document.getElementById('open').innerHTML !== '');
			},"waiting for open callback", 25000);
			runs(function(){
            	cbstatus = document.getElementById('open').innerHTML;
            	expect(cbstatus).toEqual("success");
				Ruby.call('Mobilepayment','mobpay_setlowbatterylevel');
			});            
			runs(function(){
				var status = document.getElementById('cbstatus').innerHTML;
        		var error = document.getElementById('result1').innerHTML;
        		var olddata = document.getElementById('result2').innerHTML;
        		var newdata = document.getElementById('cbresult').innerHTML;
	            expect(status).toEqual('error');
	            expect(error).toEqual('DEVICE_NOT_ENABLED');
	            expect(olddata).toEqual(newdata);				
			});
		});

		it("VT377-049 - Try to set invalid value to lowBatteryThreshold to the payment device.", function(){
			var spec = new ManualSpec(jasmine, window.document);
			spec.addGoal("VT377-049 - Try to set invalid value to lowBatteryThreshold to the payment device.");
			spec.addPrecondition("Payment device is paired with bluetooth to the device.");
			spec.addStep("Press 'RunTest' button.");
			spec.addExpectation("Proper error status is returned.");
			spec.displayScenario();
            spec.waitForButtonPressing("Run test");
			var cbstatus;
			runs(function(){
				Ruby.call('Mobilepayment','mobpay_open');
			});
			waitsFor(function(){
				return !!(document.getElementById('open').innerHTML !== '');
			},"waiting for open callback", 25000);
			runs(function(){
            	cbstatus = document.getElementById('open').innerHTML;
            	expect(cbstatus).toEqual("success");
				Ruby.call('Mobilepayment','mobpay_setlowbatterylevel_invalid');
			});            
			runs(function(){
				var status = document.getElementById('cbstatus').innerHTML;
        		var error = document.getElementById('result1').innerHTML;
        		var olddata = document.getElementById('result2').innerHTML;
        		var newdata = document.getElementById('cbresult').innerHTML;
	            expect(status).toEqual('error');
	            expect(error).toEqual('INVALID_VALUE');
	            expect(olddata).toEqual(newdata);
	        });
		});
		it("VT377-050 - Try to perfrom readCardData when the battery level is less than LowBatteryThreshold.", function(){
			var spec = new ManualSpec(jasmine, window.document);
			spec.addGoal("VT377-050 - Try to perfrom readCardData when the battery level is less than LowBatteryThreshold.");
			spec.addPrecondition("Payment device is paired with bluetooth to the device.");
			spec.addStep("Press 'RunTest' button.");
			spec.addExpectation("This is semi-auto test to check, proper error message when battery is below threshold.");
			spec.displayScenario();
            spec.waitForButtonPressing("Run test");
			var cbstatus;
			runs(function(){
				Ruby.call('Mobilepayment','mobpay_open');
			});
			waitsFor(function(){
				return !!(document.getElementById('open').innerHTML !== '');
			},"waiting for open callback", 25000);
			runs(function(){
            	cbstatus = document.getElementById('open').innerHTML;
            	expect(cbstatus).toEqual("success");
				Ruby.call('Mobilepayment','mobpay_removecard');
			});
			waitsFor(function(){
				return !!(document.getElementById('result1').innerHTML !== '');
			},"waiting for open callback", 25000);		
			runs(function(){
				var status = document.getElementById('cbstatus').innerHTML;
        		var result = document.getElementById('result1').innerHTML;
	            expect(error).toEqual('error');
	            expect(error).toEqual('LOW_POWER_OPERATION_CANCELLED');
			});
		});

		it("VT377-051 - Should support for remove card method.", function(){
			var spec = new ManualSpec(jasmine, window.document);
			spec.addGoal("VT377-051 - Should show message to remove smartCard from the payment Device.");
			spec.addPrecondition("Payment device is paired with bluetooth to the device.");
			spec.addStep("Press 'RunTest' button.");
			spec.addStep("Insert Smart card in to the payment device");
			spec.addExpectation("Observe that remove smartCard message is shown to the user in the payment device.");
			spec.displayScenario();
            spec.waitForButtonPressing("Run test");
			var cbstatus;
			runs(function(){
				Ruby.call('Mobilepayment','mobpay_open');
			});
			waitsFor(function(){
				return !!(document.getElementById('open').innerHTML !== '');
			},"waiting for open callback", 25000);
			runs(function(){
            	cbstatus = document.getElementById('open').innerHTML;
            	expect(cbstatus).toEqual("success");
				Ruby.call('Mobilepayment','mobpay_removecard');
			});
			waitsFor(function(){
				return !!(document.getElementById('cbstatus').innerHTML !== '');
			},"waiting for open callback", 25000);		
			runs(function(){
				var status = document.getElementById('cbstatus').innerHTML;
	            expect(status).toEqual('success');
			});
		});

		it("VT377-00052 - Should send proper error status, when tried to remove card when no card inserted", function(){
			var spec = new ManualSpec(jasmine, window.document);
			spec.addGoal("VT377-052 - Should show message to remove smartCard from the payment Device.");
			spec.addPrecondition("Payment device is paired with bluetooth to the device.");
			spec.addStep("Press 'RunTest' button.");
			spec.addStep("Do not insert smart card in to the payment device");
			spec.addExpectation("Observe that remove smartCard message is not shown to the user in the payment device and proper error status is returned.");
			spec.displayScenario();
            spec.waitForButtonPressing("Run test");
			var cbstatus;
			runs(function(){
				Ruby.call('Mobilepayment','mobpay_open');
			});
			waitsFor(function(){
				return !!(document.getElementById('open').innerHTML !== '');
			},"waiting for open callback", 25000);
			runs(function(){
            	cbstatus = document.getElementById('open').innerHTML;
            	expect(cbstatus).toEqual("success");
				Ruby.call('Mobilepayment','mobpay_removecard');
			});
			waitsFor(function(){
				return !!(document.getElementById('cbstatus').innerHTML !== '');
			},"waiting for open callback", 25000);		
			runs(function(){
				var status = document.getElementById('cbstatus').innerHTML;
				var result = document.getElementById('result1').innerHTML;
	            expect(status).toEqual('error');
	            expect(result).toEqual('CARD_REMOVED');
			});
		});

		it("VT377-053 - Remove Card at the callback of readCardData.", function(){
			var spec = new ManualSpec(jasmine, window.document);
			spec.addGoal("VT377-053 - Remove card at the callback of readCardData.");
			spec.addPrecondition("Payment device is paired with bluetooth to the device.");
			spec.addStep("Press 'RunTest' button.");
			spec.addStep("Insert smart card in to the slot when prompted in the payment device.");
			spec.addExpectation("Observe that remove smartCard message is shown to the user after successfully reading card.");
			spec.displayScenario();
            spec.waitForButtonPressing("Run test");
			var cbstatus;
			runs(function(){
				Ruby.call('Mobilepayment','mobpay_open');
			});
			waitsFor(function(){
				return !!(document.getElementById('open').innerHTML !== '');
			},"waiting for open callback", 25000);
			runs(function(){
            	cbstatus = document.getElementById('open').innerHTML;
            	expect(cbstatus).toEqual("success");
				Ruby.call('Mobilepayment','mobpay_readcard?readmode=insert');
			});
			waitsFor(function(){
				return !!(document.getElementById('cbresult').innerHTML !== '');
				document.getElementById('cbstatus').innerHTML = '';
			},"waiting for open callback", 25000);
			runs(function(){
				Ruby.call('Mobilepayment','mobpay_removecard');
			});			
			waitsFor(function(){
				return !!(document.getElementById('cbstatus').innerHTML !== '');
			},"waiting for open callback", 25000);		
			runs(function(){
				var status = document.getElementById('cbstatus').innerHTML;
	            expect(status).toEqual('success');
			});
		});

		it("VT377-054 - Should send proper error status when tried to remove card when device is not opened", function(){
			var spec = new ManualSpec(jasmine, window.document);
			spec.addGoal("VT377-054 - Should send proper error status when tried to remove card when payment device is not opened.");
			spec.addPrecondition("Payment device is paired with bluetooth to the device.");
			spec.addStep("Press 'RunTest' button.");
			spec.addStep("Insert smart card in to the slot of payment device.");
			spec.addExpectation("Semi-auto test to check proper error status when tried to remove card when device is not opened.");
			spec.displayScenario();
            spec.waitForButtonPressing("Run test");
			var cbstatus;
			runs(function(){
				Ruby.call('Mobilepayment','mobpay_open');
			});
			waitsFor(function(){
				return !!(document.getElementById('open').innerHTML !== '');
			},"waiting for open callback", 25000);
			runs(function(){
            	cbstatus = document.getElementById('open').innerHTML;
            	expect(cbstatus).toEqual("success");
				Ruby.call('Mobilepayment','mobpay_removecard');
			});
			waitsFor(function(){
				return !!(document.getElementById('cbstatus').innerHTML !== '');
			},"waiting for open callback", 25000);
			runs(function(){
				var status = document.getElementById('cbstatus').innerHTML;
				var result = document.getElementById('result1').innerHTML;
	            expect(status).toEqual('error');
	            expect(result).toEqual('DEVICE_NOT_ENABLED');
			});
		});
		it("VT377-055 - Should get the device information from the payment device", function(){
			var spec = new ManualSpec(jasmine, window.document);
			spec.addGoal("VT377-055 - Should get the device information from the payment device.");
			spec.addPrecondition("Payment device is paired with bluetooth to the device.");
			spec.addStep("Press 'RunTest' button.");
			spec.addExpectation("Observe that device information of the payment device is displayed successfully.");
			spec.displayScenario();
            spec.waitForButtonPressing("Run test");
			var cbstatus;
			runs(function(){
				Ruby.call('Mobilepayment','mobpay_open');
			});
			waitsFor(function(){
				return !!(document.getElementById('open').innerHTML !== '');
			},"waiting for open callback", 25000);
			runs(function(){
            	cbstatus = document.getElementById('open').innerHTML;
            	expect(cbstatus).toEqual("success");
				Ruby.call('Mobilepayment','mobpay_getdeviceinfo');
				spec.waitForResponse();
			});
		});
		it("VT377-056 - Should send proper error message when tried to call getDeviceInfo when device is not opened.", function(){
			var spec = new ManualSpec(jasmine, window.document);
			spec.addGoal("VT377-056 - Should send proper error message when tried to call getDeviceInfo when device is not opened.");
			spec.addPrecondition("Payment device is paired via bluetooth with the device.");
			spec.addStep("Press 'RunTest' button to start the test.");
			spec.addExpectation("This is semi-auto test, to check for the proper error status.");
			spec.displayScenario();
			spec.waitForButtonPressing("Run test");
			var cbstatus;
			runs(function(){
				Ruby.call('Mobilepayment','mobpay_close');
			});
			waitsFor(function(){
				return !!(document.getElementById('open').innerHTML !== '');
			},"waiting for open callback", 25000);
			runs(function(){
            	cbstatus = document.getElementById('open').innerHTML;
            	expect(cbstatus).toEqual("success");
				Ruby.call('Mobilepayment','mobpay_getdeviceinfo');
			});
			waitsFor(function(){
				return !!(document.getElementById('cbstatus').innerHTML !== '');
			},"waiting for open callback", 25000);
			runs(function(){
				var status = document.getElementById('cbstatus').innerHTML;
				var result = document.getElementById('result1').innerHTML;
	            expect(status).toEqual('error');
	            expect(result).toEqual('DEVICE_NOT_ENABLED');
			});
		});
		it("VT377-057 - Should mac the passed 16 bit hex value successfully.", function(){
			var spec = new ManualSpec(jasmine, window.document);
			spec.addGoal("VT377-057 - Should mac the passed 16 bit hex value successfully.");
			spec.addPrecondition("Payment device is paired with bluetooth to the devie.");
			spec.addStep("Press 'Runtest' button to start the test.");
			spec.addExpectation("Observe that the passed 16 bit hex value is maced successfully.");
			spec.displayScenario();
			spec.waitForButtonPressing("Run test");
			var cbstatus;
			runs(function(){
				Ruby.call('Mobilepayment','mobpay_open');
			});
			waitsFor(function(){
				return !!(document.getElementById('open').innerHTML !== '');
			},"waiting for open callback", 25000);
			runs(function(){
            	cbstatus = document.getElementById('open').innerHTML;
            	expect(cbstatus).toEqual("success");
				Ruby.call('Mobilepayment','mobpay_createmac');
				spec.waitForResponse();
			});
		});
		it("VT377-058 - Should mac the passed 32 bit hex value successfully.", function(){
			var spec = new ManualSpec(jasmine, window.document);
			spec.addGoal("VT377-058 - Should mac the passed 32 bit hex value successfully.");
			spec.addPrecondition("Payment device is paired with bluetooth to the devie.");
			spec.addStep("Press 'Runtest' button to start the test.");
			spec.addExpectation("Observe that the passed 32 bit hex value is maced successfully.");
			spec.displayScenario();
			spec.waitForButtonPressing("Run test");
			var cbstatus;
			runs(function(){
				Ruby.call('Mobilepayment','mobpay_open');
			});
			waitsFor(function(){
				return !!(document.getElementById('open').innerHTML !== '');
			},"waiting for open callback", 25000);
			runs(function(){
            	cbstatus = document.getElementById('open').innerHTML;
            	expect(cbstatus).toEqual("success");
				Ruby.call('Mobilepayment','mobpay_createmac?bit=32');
				spec.waitForResponse();
			});
		});
		it("VT377-059 - Should mac the passed 48 bit hex value successfully.", function(){
			var spec = new ManualSpec(jasmine, window.document);
			spec.addGoal("VT377-059 - Should mac the passed 48 bit hex value successfully.");
			spec.addPrecondition("Payment device is paired with bluetooth to the devie.");
			spec.addStep("Press 'Runtest' button to start the test.");
			spec.addExpectation("Observe that the passed 48 bit hex value is maced successfully.");
			spec.displayScenario();
			spec.waitForButtonPressing("Run test");
			var cbstatus;
			runs(function(){
				Ruby.call('Mobilepayment','mobpay_open');
			});
			waitsFor(function(){
				return !!(document.getElementById('open').innerHTML !== '');
			},"waiting for open callback", 25000);
			runs(function(){
            	cbstatus = document.getElementById('open').innerHTML;
            	expect(cbstatus).toEqual("success");
				Ruby.call('Mobilepayment','mobpay_createmac?bit=48');
				spec.waitForResponse();
			});
		});
		it("VT377-060 - Should send proper error status when non hex value is passed to the method createMac.", function(){
			var spec = new ManualSpec(jasmine, window.document);
			spec.addGoal("VT377-060 - Should send proper error status when non hex value is passed to the method createMac");
			spec.addPrecondition("Payment device is paired with bluetooth to the devie.");
			spec.addStep("Press 'Runtest' button to start the test.");
			spec.addExpectation("Observe that the proper error status ");
			spec.displayScenario();
			spec.waitForButtonPressing("Run test");
			var cbstatus;
			runs(function(){
				Ruby.call('Mobilepayment','mobpay_open');
			});
			waitsFor(function(){
				return !!(document.getElementById('open').innerHTML !== '');
			},"waiting for open callback", 25000);
			runs(function(){
            	cbstatus = document.getElementById('open').innerHTML;
            	expect(cbstatus).toEqual("success");
				Ruby.call('Mobilepayment','mobpay_createmac?bit=invalid');
			});
			waitsFor(function(){
				return !!(document.getElementById('cbstatus').innerHTML !== '');
			},"waiting for open callback", 25000);
			runs(function(){
				var status = document.getElementById('cbstatus').innerHTML;
				var result = document.getElementById('result1').innerHTML;
	            expect(status).toEqual('error');
	            expect(result).toEqual('INVALID_MAC_KEY_LENGTH');
			});
		});
		it("VT377-061 - Should send proper error status by executing method createMac when device is not opened", function(){
			var spec = new ManualSpec(jasmine, window.document);
			spec.addGoal("VT377-061 - Should send proper error status by executing method createMac when device is not opened.");
			spec.addPrecondition("Payment device is paired via bluetooth to the device.");
			spec.addStep("Press 'Runtest' button to start the test.");
			spec.addExpectation("This is semi-auto test, to check proper error status when device is not opened.");
			spec.displayScenario();
			spec.waitForButtonPressing("Run test");
			var cbstatus;
			runs(function(){
				Ruby.call('Mobilepayment','mobpay_close');
			});
			waitsFor(function(){
				return !!(document.getElementById('open').innerHTML !== '');
			},"waiting for close callback", 25000);
			runs(function(){
            	cbstatus = document.getElementById('open').innerHTML;
            	expect(cbstatus).toEqual("success");
				Ruby.call('Mobilepayment','mobpay_createmac');
			});
			waitsFor(function(){
				return !!(document.getElementById('cbstatus').innerHTML !== '');
			},"waiting for open callback", 25000);
			runs(function(){
				var status = document.getElementById('cbstatus').innerHTML;
				var result = document.getElementById('result1').innerHTML;
	            expect(status).toEqual('error');
	            expect(result).toEqual('DEVICE_NOT_ENABLED');
			});
		});
		it("VT377-062 - Should validate the macblock and return the result successfully", function(){
			var spec = new ManualSpec(jasmine, window.document);
			spec.addGoal("VT377-062 - Should validate the macblock and return the result successfully");
			spec.addPrecondition("Paymet device is paired via bluetooth to the device.");
			spec.addStep("Press 'Runtest' button to start the test.");
			spec.addExpectation("This is semi-auto test to check for the validation of macblock is successfull.");
			spec.displayScenario();
			spec.waitForButtonPressing("Run test");
			var cbstatus;
			runs(function(){
				Ruby.call('Mobilepayment','mobpay_open');
			});
			waitsFor(function(){
				return !!(document.getElementById('open').innerHTML !== '');
			},"waiting for open callback", 25000);
			runs(function(){
            	cbstatus = document.getElementById('open').innerHTML;
            	expect(cbstatus).toEqual("success");
				Ruby.call('Mobilepayment','mobpay_createmac?val=yes');
			});
			waitsFor(function(){
				return !!(document.getElementById('result1').innerHTML !== '');
			},"waiting for open callback", 25000);
			runs(function(){
				var status = document.getElementById('cbstatus').innerHTML;
	            expect(status).toEqual('success');
			});
		});
		it("VT377-063 - MAC-Should send proper error status when macblock does not match, while validating.", function(){
			var spec = new ManualSpec(jasmine, window.document);
			spec.addGoal("VT377-063 - Should send proper error status when macblock does not match, while validating.");
			spec.addPrecondition("Payment device should be paired via bluetooth to the device.");
			spec.addStep("Press 'Run test' buton to start the test.");
			spec.addExpectation("This is semi-auto test to check error status when macblock and macdata does not match during validation.");
			spec.displayScenario();
			spec.waitForButtonPressing("Run test");
			var cbstatus;
			runs(function(){
				Ruby.call('Mobilepayment','mobpay_open');
			});
			waitsFor(function(){
				return !!(document.getElementById('open').innerHTML !== '');
			},"waiting for open callback", 25000);
			runs(function(){
            	cbstatus = document.getElementById('open').innerHTML;
            	expect(cbstatus).toEqual("success");
				Ruby.call('Mobilepayment','mobpay_createmac?val=yes&data=yes');
			});
			waitsFor(function(){
				return !!(document.getElementById('result1').innerHTML !== '');
			},"waiting for open callback", 25000);
			runs(function(){
				var status = document.getElementById('cbstatus').innerHTML;
				var error = document.getElementById('result2').innerHTML;
	            expect(status).toEqual('error');
	            expect(error).toEqual("MAC_VALIDATION_ERROR");
			});
		});
		it("VT377-064 - VAL-Should send proper error status when invalid value is passed with method validateMac.", function(){
			var spec = new ManualSpec(jasmine, window.document);
			spec.addGoal("VT377-064 - Should send proper error status when invalid parameters are passed to the method validateMac.");
			spec.addPrecondition("Payment device should be paired via bluetooth to the device.");
			spec.addStep("Press 'Run test' button to start the test.");
			spec.addExpectation("This is semi-auto test to check error status when invalid parameters are passed.");
			spec.displayScenario();
			spec.waitForButtonPressing("Run test");
			var cbstatus;
			runs(function(){
				Ruby.call('Mobilepayment','mobpay_open');
			});
			waitsFor(function(){
				return !!(document.getElementById('open').innerHTML !== '');
			},"waiting for open callback", 25000);
			runs(function(){
            	cbstatus = document.getElementById('open').innerHTML;
            	expect(cbstatus).toEqual("success");
				Ruby.call('Mobilepayment','mobpay_createmac?val=yes&invalid=yes');
			});
			waitsFor(function(){
				return !!(document.getElementById('result1').innerHTML !== '');
			},"waiting for open callback", 25000);
			runs(function(){
				var status = document.getElementById('cbstatus').innerHTML;
				var error = document.getElementById('result2').innerHTML;
	            expect(status).toEqual('error');
	            expect(error).toEqual("INVALID_DATA_LENGTH");
			});
		});
		it("VT377-065 - Should send success status when no message is passed with the method validateMac.", function(){
			var spec = new ManualSpec(jasmine, window.document);
			spec.addGoal("VT377-065 - Should send success status when no message is passed with the method validateMac");
			spec.addPrecondition("Pyament device should be paired via bluetooth to the device.");
			spec.addStep("Press 'Run test' button to start the test.");
			spec.addExpectation("This is semi-auto test to check validateMac still works even when no message is passed.");
			spec.displayScenario();
			spec.waitForButtonPressing("Run test");
			var cbstatus;
			runs(function(){
				Ruby.call('Mobilepayment','mobpay_open');
			});
			waitsFor(function(){
				return !!(document.getElementById('open').innerHTML !== '');
			},"waiting for open callback", 25000);
			runs(function(){
            	cbstatus = document.getElementById('open').innerHTML;
            	expect(cbstatus).toEqual("success");
				Ruby.call('Mobilepayment','mobpay_createmac?val=yes&empty=yes');
			});
			waitsFor(function(){
				return !!(document.getElementById('result1').innerHTML !== '');
			},"waiting for open callback", 25000);
			runs(function(){
				var status = document.getElementById('cbstatus').innerHTML;
	            expect(status).toEqual('success');
			});
		});
		it("VT377-066 - Should throw proper exception when callback is not passed with the method validateMac.", function(){
			var spec = new ManualSpec(jasmine, window.document);
			spec.addGoal("VT377-066 - Should throw proper exception when callback is not passed with the method validateMac.");
			spec.addPrecondition("Payment device should be paired via bluetooth to the device.");
			spec.addStep("Press 'Run test' button to start the test.");
			spec.addExpectation("This is semi-auto test to check proper exception is thrown when wrong parameters are passed.");
			spec.displayScenario();
			spec.waitForButtonPressing("Run test");
			var cbstatus;
			runs(function(){
				Ruby.call('Mobilepayment','mobpay_open');
			});
			waitsFor(function(){
				return !!(document.getElementById('open').innerHTML !== '');
			},"waiting for open callback", 25000);
			runs(function(){
            	cbstatus = document.getElementById('open').innerHTML;
            	expect(cbstatus).toEqual("success");
				Ruby.call('Mobilepayment','mobpay_createmac?val=yes&nocb=yes');
			});
			waitsFor(function(){
				return !!(document.getElementById('result2').innerHTML !== '');
			},"waiting for open callback", 25000);
			runs(function(){
				var error = document.getElementById('result2').innerHTML;
	            expect(error).toEqual("No callback handler provided");
			});
		});
		it("VT377-067 - Should support for the method completeOnlineEmv", function(){
			var spec = new ManualSpec(jasmine, window.document);
			spec.addGoal("VT377-067 - Should support for the method completeOnlineEmv.");
			spec.addPrecondition("Payment device is paired via bluetooth with the device");
			spec.addStep("Press 'Run test' button to start the test");
			spec.addExpectation("Observe that success status is retured with the callback");
			spec.displayScenario();
			spec.waitForButtonPressing("Run test");
			var cbstatus;
			runs(function(){
				Ruby.call('Mobilepayment','mobpay_open');
			});
			waitsFor(function(){
				return !!(document.getElementById('open').innerHTML !== '');
			},"waiting for open callback", 25000);
			runs(function(){
            	cbstatus = document.getElementById('open').innerHTML;
            	expect(cbstatus).toEqual("success");
				Ruby.call('Mobilepayment','mobpay_readcard?readmode=insert');
			});
			waitsFor(function(){
				return !!(document.getElementById('cbstatus').innerHTML !== '');
			},"waiting for open callback", 25000);
			runs(function(){
				document.getElementById('open').innerHTML = '';
				Ruby.call('Mobilepayment','mobpay_authcard');
			});
			waitsFor(function(){
				return !!(document.getElementById('open').innerHTML !== '');
			}, "waiting for compelteOnlineEmv callback", 25000);
			runs(function(){
				document.getElementById('cbstatus').innerHTML = '';
				Ruby.call('Mobilepayment','mobpay_completeevm');
				spec.waitForResponse();
			});
		});
		it("VT377-068 - Should throw proper exception when method completeOnlineEmv is called without callback", function(){
			var spec = new ManualSpec(jasmine, window.document);
			spec.addGoal("VT377-068 - Should throw proper exception when method completeOnlineEmv is called without callback.");
			spec.addPrecondition("Payment device is paired via bluetooth with the device");
			spec.addStep("Press 'Run test' button to start the test");
			spec.addExpectation("Observe that proper exception is thrown when callback is not passed with method completeOnlineEmv");
			spec.displayScenario();
			spec.waitForButtonPressing("Run test");
			var cbstatus;
			runs(function(){
				Ruby.call('Mobilepayment','mobpay_open');
			});
			waitsFor(function(){
				return !!(document.getElementById('open').innerHTML !== '');
			},"waiting for open callback", 25000);
			runs(function(){
            	cbstatus = document.getElementById('open').innerHTML;
            	expect(cbstatus).toEqual("success");
				Ruby.call('Mobilepayment','mobpay_completeevm?nocb=yes');
			});
			waitsFor(function(){
				return !!(document.getElementById('result2').innerHTML !== '');
			},"waiting for open callback", 25000);
			runs(function(){
				var error = document.getElementById('result2').innerHTML;
	            expect(error).toEqual("Wrong number of arguments");				
			});
		});
		it("VT377-069 - Should support for getEmvTags method", function(){
			var spec = new ManualSpec(jasmine, window.document);
			spec.addGoal("VT377-069 - Should support for getEmvTags method");
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
			var cbstatus;
			runs(function(){
				Ruby.call('Mobilepayment','mobpay_open');
			});
			waitsFor(function(){
				return !!(document.getElementById('open').innerHTML !== '');
			},"waiting for open callback", 25000);
			runs(function(){
            	cbstatus = document.getElementById('open').innerHTML;
            	expect(cbstatus).toEqual("success");
				Ruby.call('Mobilepayment','mobpay_readcard?readmode=insert');
			});
			waitsFor(function(){
				return !!(document.getElementById('cbstatus').innerHTML !== '');
			},"waiting for open callback", 25000);
			runs(function(){
				Ruby.call('Mobilepayment','mobpay_getemvtags');
				spec.waitForResponse();
			});
		});
		it("VT377-070 - Should throw exception by calling getEmvTags without callback", function(){
			var spec = new ManualSpec(jasmine, window.document);
			spec.addGoal("VT377-070 - Should throw proper exception when method getEmvTags is called without callback.");
			spec.addPrecondition("Payment device is paired via bluetooth with the device");
			spec.addStep("Press 'Run test' button to start the test");
			spec.addExpectation("Observe that proper exception is thrown when callback is not passed with method getEmvTags");
			spec.displayScenario();
			spec.waitForButtonPressing("Run test");
			var cbstatus;
			runs(function(){
				Ruby.call('Mobilepayment','mobpay_open');
			});
			waitsFor(function(){
				return !!(document.getElementById('open').innerHTML !== '');
			},"waiting for open callback", 25000);
			runs(function(){
            	cbstatus = document.getElementById('open').innerHTML;
            	expect(cbstatus).toEqual("success");
				Ruby.call('Mobilepayment','mobpay_getemvtags?nocb=yes');
			});
			waitsFor(function(){
				return !!(document.getElementById('result2').innerHTML !== '');
			},"waiting for open callback", 25000);
			runs(function(){
				var error = document.getElementById('result2').innerHTML;
	            expect(error).toEqual("Wrong number of arguments");				
			});
		});
		it("VT377-071 - Should support for setEmvTags method", function(){
			var spec = new ManualSpec(jasmine, window.document);
			spec.addGoal("VT377-071 - Should support for setEmvTags method");
			spec.addPrecondition("Payment device should be paired via bluetooth to the device.");
			spec.addStep("Press 'Run test' button to start the test.");
			spec.addExpectation("Observe that success status is retruned with the method.");
			spec.displayScenario();
			spec.waitForButtonPressing("Run test");
			var cbstatus;
			runs(function(){
				Ruby.call('Mobilepayment','mobpay_open');
			});
			waitsFor(function(){
				return !!(document.getElementById('open').innerHTML !== '');
			},"waiting for open callback", 25000);
			runs(function(){
            	cbstatus = document.getElementById('open').innerHTML;
            	expect(cbstatus).toEqual("success");
				Ruby.call('Mobilepayment','mobpay_readcard?readmode=insert');
			});
			waitsFor(function(){
				return !!(document.getElementById('cbstatus').innerHTML !== '');
			},"waiting for open callback", 25000);
			runs(function(){
				document.getElementById('cbstatus').innerHTML = '';
				Ruby.call('Mobilepayment','mobpay_setemvtags');
				spec.waitForResponse();
			});
		});
		it("VT377-072 - Should support for authorizeCard method with merchantDecison:1, displayResult:true, displayAmount:true.", function(){
			var spec = new ManualSpec(jasmine, window.document);
			spec.addGoal("VT377-072 - Should support for authorizeCard method with merchantDecision:1, displayResult:true, displayAmount:true.");
			spec.addPrecondition("Payment device is paired via bluetooth with the device.");
			spec.addStep("Press 'Run test' button to start the test");
			spec.addExpectation("Observe that success status is returned with the callback");
			spec.displayScenario();
			spec.waitForButtonPressing("Run test");
			var cbstatus;
			runs(function(){
				Ruby.call('Mobilepayment','mobpay_open');
			});
			waitsFor(function(){
				return !!(document.getElementById('open').innerHTML !== '');
			},"waiting for open callback", 25000);
			runs(function(){
            	cbstatus = document.getElementById('open').innerHTML;
            	expect(cbstatus).toEqual("success");
				Ruby.call('Mobilepayment','mobpay_readcard?readmode=insert');
			});
			waitsFor(function(){
				return !!(document.getElementById('cbstatus').innerHTML !== '');
			},"waiting for open callback", 25000);			
			runs(function(){
				Ruby.call('Mobilepayment','mobpay_authcard?data=yes');
				spec.waitForResponse();
			});
		});
		it("VT377-073 - Should support for authorizeCard method with merchantDecision 0", function(){
			var spec = new ManualSpec(jasmine, window.document);
			spec.addGoal("VT377-073 - Should support for authorizeCard method with merchantDecision:0, displayResult:true, displayAmount:true.");
			spec.addPrecondition("Payment device is paired via bluetooth with the device.");
			spec.addStep("Press 'Run test' button to start the test");
			spec.addExpectation("Observe that success status is returned with the callback");
			spec.displayScenario();
			spec.waitForButtonPressing("Run test");
			var cbstatus;
			runs(function(){
				Ruby.call('Mobilepayment','mobpay_open');
			});
			waitsFor(function(){
				return !!(document.getElementById('open').innerHTML !== '');
			},"waiting for open callback", 25000);
			runs(function(){
            	cbstatus = document.getElementById('open').innerHTML;
            	expect(cbstatus).toEqual("success");
				Ruby.call('Mobilepayment','mobpay_readcard?readmode=insert');
			});
			waitsFor(function(){
				return !!(document.getElementById('cbstatus').innerHTML !== '');
			},"waiting for open callback", 25000);			
			runs(function(){
				Ruby.call('Mobilepayment','mobpay_authcard?merchant=0');
				spec.waitForResponse();
			});
		});
		it("VT377-074 - Should support for authorizeCard method with merchantDecision 2", function(){
			var spec = new ManualSpec(jasmine, window.document);
			spec.addGoal("VT377-074 - Should support for authorizeCard method with merchantDecision:2, displayResult:true, displayAmount:true.");
			spec.addPrecondition("Payment device is paired via bluetooth with the device.");
			spec.addStep("Press 'Run test' button to start the test");
			spec.addExpectation("Observe that success status is returned with the callback");
			spec.displayScenario();
			spec.waitForButtonPressing("Run test");
			var cbstatus;
			runs(function(){
				Ruby.call('Mobilepayment','mobpay_open');
			});
			waitsFor(function(){
				return !!(document.getElementById('open').innerHTML !== '');
			},"waiting for open callback", 25000);
			runs(function(){
            	cbstatus = document.getElementById('open').innerHTML;
            	expect(cbstatus).toEqual("success");
				Ruby.call('Mobilepayment','mobpay_readcard?readmode=insert');
			});
			waitsFor(function(){
				return !!(document.getElementById('cbstatus').innerHTML !== '');
			},"waiting for open callback", 25000);			
			runs(function(){
				Ruby.call('Mobilepayment','mobpay_authcard?merchant=2');
				spec.waitForResponse();
			});
		});
		it("VT377-075 - Should support for authorizeCard method with displayResult false", function(){
			var spec = new ManualSpec(jasmine, window.document);
			spec.addGoal("VT377-075 - Should support for authorizeCard method with merchantDecision:1, displayResult:false, displayAmount:true.");
			spec.addPrecondition("Payment device is paired via bluetooth with the device.");
			spec.addStep("Press 'Run test' button to start the test");
			spec.addExpectation("Observe that success status is returned with the callback");
			spec.displayScenario();
			spec.waitForButtonPressing("Run test");
			var cbstatus;
			runs(function(){
				Ruby.call('Mobilepayment','mobpay_open');
			});
			waitsFor(function(){
				return !!(document.getElementById('open').innerHTML !== '');
			},"waiting for open callback", 25000);
			runs(function(){
            	cbstatus = document.getElementById('open').innerHTML;
            	expect(cbstatus).toEqual("success");
				Ruby.call('Mobilepayment','mobpay_readcard?readmode=insert');
			});
			waitsFor(function(){
				return !!(document.getElementById('cbstatus').innerHTML !== '');
			},"waiting for open callback", 25000);			
			runs(function(){
				Ruby.call('Mobilepayment','mobpay_authcard?displayresult=false');
				spec.waitForResponse();
			});
		});
		it("VT377-076 - Should support for authorizeCard method with displayAmount false", function(){
			var spec = new ManualSpec(jasmine, window.document);
			spec.addGoal("VT377-076 - Should support for authorizeCard method with merchantDecision:1, displayResult:true, displayAmount:false.");
			spec.addPrecondition("Payment device is paired via bluetooth with the device.");
			spec.addStep("Press 'Run test' button to start the test");
			spec.addExpectation("Observe that success status is returned with the callback");
			spec.displayScenario();
			spec.waitForButtonPressing("Run test");
			var cbstatus;
			runs(function(){
				Ruby.call('Mobilepayment','mobpay_open');
			});
			waitsFor(function(){
				return !!(document.getElementById('open').innerHTML !== '');
			},"waiting for open callback", 25000);
			runs(function(){
            	cbstatus = document.getElementById('open').innerHTML;
            	expect(cbstatus).toEqual("success");
				Ruby.call('Mobilepayment','mobpay_readcard?readmode=insert');
			});
			waitsFor(function(){
				return !!(document.getElementById('cbstatus').innerHTML !== '');
			},"waiting for open callback", 25000);			
			runs(function(){
				Ruby.call('Mobilepayment','mobpay_authcard?displayamt=false');
				spec.waitForResponse();
			});
		});
		it("VT377-077 - Should throw proper exception when authorizeCard method called without callback", function(){
			var spec = new ManualSpec(jasmine, window.document);
			spec.addGoal("VT377-077 - Should throw proper exception when method authorizeCard is called without callback.");
			spec.addPrecondition("Payment device is paired via bluetooth with the device");
			spec.addStep("Press 'Run test' button to start the test");
			spec.addExpectation("Observe that proper exception is thrown when callback is not passed with method authorizeCard");
			spec.displayScenario();
			spec.waitForButtonPressing("Run test");
			var cbstatus;
			runs(function(){
				Ruby.call('Mobilepayment','mobpay_open');
			});
			waitsFor(function(){
				return !!(document.getElementById('open').innerHTML !== '');
			},"waiting for open callback", 25000);
			runs(function(){
            	cbstatus = document.getElementById('open').innerHTML;
            	expect(cbstatus).toEqual("success");
				Ruby.call('Mobilepayment','mobpay_authcard?nocb=yes');
			});
			waitsFor(function(){
				return !!(document.getElementById('result2').innerHTML !== '');
			},"waiting for open callback", 25000);
			runs(function(){
				var error = document.getElementById('result2').innerHTML;
	            expect(error).toEqual("Wrong number of arguments");				
			});
		});
	}else{
		it("Your Platform/Device does not support this feature", function(){

		});
	}
});
