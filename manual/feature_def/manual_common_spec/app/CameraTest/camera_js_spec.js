describe("Camera API Manual Tests", function(){

	var enumData = Rho.Camera.enumerate();
	var callbackData = "";
	var cbkResponseTimeout = false;
	var camArray = null;
	
	var callbackFunc = function(cbData){

		callbackData = "status : " + cbData.status;
		callbackData += "\nmessage : " + cbData.message;
		callbackData += "\nimageHeight : " + cbData.imageHeight;
		callbackData += "\nimageWidth : " + cbData.imageWidth;
		callbackData += "\nimageFormat : " + cbData.imageFormat;
		callbackData += "\nimageUri : " + cbData.imageUri;

		cbkResponseTimeout = true;
	}

	var enumCallback = function(camArray){
		camArray = camArray;
		cbkResponseTimeout = true;
	}

	beforeEach(function(){
		callbackData = "";
		cbkResponseTimeout = false;
	});


	describe("Select picture using choosePicture method", function() {

		it("should choosePicture with callback status OK", function(){
			var spec = new ManualSpec(jasmine, window.document);
        	spec.addGoal(jasmine.getEnv().currentSpec.description);
            spec.addStep("Press 'RunTest' button");
            spec.addStep("Choose the image");
            spec.addStep("Check for the returned status & imagePath");
            spec.addExpectation('The returned status should be OK, image should be displayed through image URI, The returned image height and width should be same as the displayed image.');
            spec.displayScenario();
            spec.waitForButtonPressing("Run test");

			runs(function(){
				Rho.Camera.choosePicture({}, callbackFunc);
			});

			waitsFor(function(){
				return cbkResponseTimeout;
			},"waiting for callback data", 10000);

			runs(function(){
				spec.addResult(callbackData);
				spec.displayResults();
                spec.waitForResponse();
			});

		});

		it("should choosePicture with callback status cancel", function(){
			var spec = new ManualSpec(jasmine, window.document);
        	spec.addGoal(jasmine.getEnv().currentSpec.description);
            spec.addStep("Press 'RunTest' button");
            spec.addStep("Cancel the choosing of image");
            spec.addStep("Check for the returned status");
            spec.addExpectation('The returned status should be cancel.');
            spec.displayScenario();
            spec.waitForButtonPressing("Run test");
			
			runs(function(){
				Rho.Camera.choosePicture({}, callbackFunc);
			});

			waitsFor(function(){
				return cbkResponseTimeout;
			},"waiting for callback data", 10000);

			runs(function(){
				spec.addResult(callbackData);
				spec.displayResults();
                spec.waitForResponse();
			});

		});

		it("should choosePicture with callback status error and error message", function(){
			var spec = new ManualSpec(jasmine, window.document);
        	spec.addGoal(jasmine.getEnv().currentSpec.description);
            spec.addStep("Press 'RunTest' button");
            spec.addStep("Choose some other file instead of image file");
            spec.addStep("Check for the returned status and returned message");
            spec.addExpectation('The returned status should be error and messge should containg the information on error.');
            spec.displayScenario();
            spec.waitForButtonPressing("Run test");

			runs(function(){
				Rho.Camera.choosePicture({}, callbackFunc);
			});

			waitsFor(function(){
				return cbkResponseTimeout;
			},"waiting for callback data", 10000);

			runs(function(){
				spec.addResult(callbackData);
				spec.displayResults();
                spec.waitForResponse();
			});

		});

		it("Should call choosePicture with callback as anonymous function and check for returned imageFormat", function(){
			var spec = new ManualSpec(jasmine, window.document);
        	spec.addGoal(jasmine.getEnv().currentSpec.description);
            spec.addStep("Press 'RunTest' button");
            spec.addStep("Choose the image");
            spec.addStep("Save the image at device folders");
            spec.addStep("Check for the returned imageFormat");
            spec.addExpectation('The returned status should be OK and the returned image format should be same with the saved image format in device.');
            spec.displayScenario();
            spec.waitForButtonPressing("Run test");

			runs(function(){
				var data = {};

				if(isAndroid())
					data.imageFormat = 'png';
				else
					data.imageFormat = 'jpg';


				Rho.Camera.choosePicture(data, function(cbData){

					callbackData = "status : " + cbData.status;
					callbackData += "\nmessage : " + cbData.message;
					callbackData += "\nimageHeight : " + cbData.imageHeight;
					callbackData += "\nimageWidth : " + cbData.imageWidth;
					callbackData += "\nimageFormat : " + cbData.imageFormat;
					callbackData += "\nimageUri : " + cbData.imageUri;

					cbkResponseTimeout = true;

				});
			});

			waitsFor(function(){
				return cbkResponseTimeout;
			},"waiting for callback data", 10000);

			runs(function(){
				spec.addResult(callbackData);
				spec.displayResults();
                spec.waitForResponse();
			});

		});


		it("Should call choosePicture with property as colorModel, desiredHeight , desiredWidth and callback", function(){
			var spec = new ManualSpec(jasmine, window.document);
        	spec.addGoal(jasmine.getEnv().currentSpec.description);
            spec.addStep("Press 'RunTest' button");
            spec.addPrecondition("Call choosePicture with propertyhash as colorModel:greyscale, desiredHeight:640 , desiredWidth:480 and callback.");
            spec.addStep("Choose the image.");
            spec.addStep("Display the image on view and Check for the color and size of image");
            spec.addExpectation('The displayed image should be in grey mode with desiredHeight as 640 and desiredWidth as480.');
            spec.displayScenario();
            spec.waitForButtonPressing("Run test");
			
			runs(function(){
				Rho.Camera.choosePicture({'colorModel':'greyscale','desiredHeight':640,'desiredWidth':480}, callbackFunc);
			});

			waitsFor(function(){
				return cbkResponseTimeout;
			},"waiting for callback data", 10000);

			runs(function(){
				spec.addResult(callbackData);
				spec.displayResults();
                spec.waitForResponse();
			});

		});

		it("Should call choosePicture with 'outputFormat' property value as datauri ", function(){
			var spec = new ManualSpec(jasmine, window.document);
        	spec.addGoal(jasmine.getEnv().currentSpec.description);
            spec.addStep("Press 'RunTest' button");
            spec.addStep("Choose the image.");
            spec.addStep("Check the image on view");
            spec.addExpectation('The chosen image should be returned as Data URI object.');
            spec.displayScenario();
            spec.waitForButtonPressing("Run test");

			runs(function(){
				Rho.Camera.choosePicture({'outputFormat':'dataUri'}, callbackFunc);
			});

			waitsFor(function(){
				return cbkResponseTimeout;
			},"waiting for callback data", 10000);

			runs(function(){
				spec.addResult(callbackData);
				spec.displayResults();
                spec.waitForResponse();
			});

		});

		it("Should call choosePicture with 'compressionFormat' property value as png", function(){
			var spec = new ManualSpec(jasmine, window.document);
        	spec.addGoal(jasmine.getEnv().currentSpec.description);
            spec.addStep("Press 'RunTest' button");
            spec.addStep("Choose the image.");
            spec.addStep("Check for the returned status and returned message");
            spec.addExpectation('The returned status should be OK and png image should be saved in Android & iOS but error in WM and messge should containg the information on error as png format is not supported.');
            spec.displayScenario();
            spec.waitForButtonPressing("Run test");

			runs(function(){
				Rho.Camera.choosePicture({'compressionFormat':'png'}, callbackFunc);
			});

			waitsFor(function(){
				return cbkResponseTimeout;
			},"waiting for callback data", 10000);

			runs(function(){
				spec.addResult(callbackData);
				spec.displayResults();
                spec.waitForResponse();
			});

		});

		it("should choosePicture with callback and minimize", function(){
			var spec = new ManualSpec(jasmine, window.document);
        	spec.addGoal(jasmine.getEnv().currentSpec.description);
            spec.addStep("Press 'RunTest' button");
            spec.addStep("Minimize the Application without choosing the file");
            spec.addStep("Check for the returned status and returned message");
            spec.addExpectation('The returned status should be error and messge should containg the information on error.');
            spec.displayScenario();
            spec.waitForButtonPressing("Run test");
			
			runs(function(){
				Rho.Camera.choosePicture({}, callbackFunc);
			});

			waitsFor(function(){
				return cbkResponseTimeout;
			},"waiting for callback data", 10000);

			runs(function(){
				spec.addResult(callbackData);
				spec.displayResults();
                spec.waitForResponse();
			});

		});

		it("should choosePicture with callback and suspend the device", function(){
			var spec = new ManualSpec(jasmine, window.document);
        	spec.addGoal(jasmine.getEnv().currentSpec.description);
            spec.addStep("Press 'RunTest' button");
            spec.addStep("Suspend the device and resume without choosing the file");
            spec.addStep("Check for the returned status and returned message");
            spec.addExpectation('The returned status should be error and messge should containg the information on error.');
            spec.displayScenario();
            spec.waitForButtonPressing("Run test");

			runs(function(){
				Rho.Camera.choosePicture({}, callbackFunc);
			});

			waitsFor(function(){
				return cbkResponseTimeout;
			},"waiting for callback data", 10000);

			runs(function(){
				spec.addResult(callbackData);
				spec.displayResults();
                spec.waitForResponse();
			});

		});

	});


	describe("Enumerate Camera with callback ", function() {

		it("Should enumerate with callback", function(){
			var spec = new ManualSpec(jasmine, window.document);
        	spec.addGoal(jasmine.getEnv().currentSpec.description);
            spec.addStep("Press 'RunTest' button");
            spec.addStep("Check for the returned object.");
            spec.addExpectation('The returned object should contain the available cameras of device.');
            spec.displayScenario();
            spec.waitForButtonPressing("Run test");
			
			runs(function(){
				Rho.Camera.enumerate(enumCallback);
			});

			waitsFor(function(){
				return cbkResponseTimeout;
			},"waiting for callback data", 2000);

			runs(function(){
				spec.addResult(camArray.toString());
				spec.displayResults();
                spec.waitForResponse();
			});		            

		});

	});


	
});