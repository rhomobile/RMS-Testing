describe("Camera API Manual Tests", function(){
	var enumData = Rho.Camera.enumerate();
	var imagestatus = '';
	var callbackData;
	var callbackTriggered = false;
	var callbackTimeout = 30000;
	var camArray = "";
	var imageUriData = null;
	var camtype;
	var sound = "";
    var camerapath = Rho.Application.modelFolderPath("CameraTest");
    if(isWindowsMobilePlatform()){
    	sound = Rho.RhoFile.join(camerapath, "/samplemedia/cheering.wav");
    }else{
    	sound = Rho.RhoFile.join(camerapath, "/samplemedia/glassbreak.mp3");
    }
    var sampleimage = Rho.RhoFile.join(camerapath, "/samplemedia/zebratechnologies.jpg");
	var callbackFunc = function(cbData){
		callbackData = cbData;
		callbackTriggered = true;
		imagestatus = cbData.status;
		imageUriData = cbData.imageUri;
		document.getElementById('imageUri').src = imageUriData;
	};
	var getCallbackData = function(camArr){
		for (var i = 0; i < camArr.length; i++) {
			camArray += (i+1).toString() + ") Camera Type: " + enumData[i].getProperty('cameraType') +  "; ";
		};
		callbackTriggered = true;
	};
	beforeEach(function(){
		callbackData = "";
		imageUriData = null;
		callbackTriggered = false;
		document.getElementById('imageUriDiv').innerHTML = '<img src="" id="imageUri"></img>';
	});
	afterEach(function(){
		document.getElementById('imageUriDiv').innerHTML = '<img src="" id="imageUri"></img>';
	});

	describe("Select picture using choosePicture method | Note: NA for CE platform", function() {
		it("VT200-0576 | Should call choosePicture with 'outputFormat' property value as dataUri", function(){
			var spec = new ManualSpec(jasmine, window.document);
        	spec.addGoal(jasmine.getEnv().currentSpec.description);
            spec.addStep("Press 'RunTest' button");
            spec.addStep("Choose the image.");
            spec.addStep("Check the image on view");
            spec.addExpectation('The chosen image should be returned as Data URI object.');
            spec.displayScenario();
            spec.waitForButtonPressing("Run test");
            var param = {
            	'outputFormat': Rho.Camera.OUTPUT_FORMAT_DATAURI
        	};
			runs(function(){
				Rho.Camera.choosePicture(param, callbackFunc);
			});
			waitsFor(function(){
				return callbackTriggered;
			},"waiting for callback data", callbackTimeout);
			runs(function(){
				spec.addResult("status : ", callbackData.status);
				spec.addResult("message : ", callbackData.message);
				spec.addResult("imageHeight : ", callbackData.imageHeight);
				spec.addResult("imageWidth : ", callbackData.imageWidth);
				spec.addResult("imageFormat : ", callbackData.imageFormat);
				spec.addResult("imageUri : ", callbackData.imageUri);
				spec.displayResults();
                spec.waitForResponse();
			});
		});

		if(isApplePlatform()){
			
			it("VT200-0577 | Should call choosePicture with property as colorModel: grayscale", function(){
				var spec = new ManualSpec(jasmine, window.document);
	        	spec.addGoal(jasmine.getEnv().currentSpec.description);
	            spec.addStep("Press 'RunTest' button");
	            spec.addPrecondition("Call choosePicture with propertyhash as colorModel:grayscale and callback.");
	            spec.addStep("Choose the image.");
	            spec.addExpectation('All images should be shown in the gallery');
	            spec.addExpectation('By selecting any of the image, should be displayed in grayscale with the test application.');
	            spec.displayScenario();
	            spec.waitForButtonPressing("Run test");
	            var param = {
	            	'colorModel': Rho.Camera.COLOR_MODEL_GRAYSCALE,
	            	'outputFormat':'dataUri',
	            	'enableEditing':false
	            };
				runs(function(){
					Rho.Camera.choosePicture(param, callbackFunc);
				});
				waitsFor(function(){
					return callbackTriggered;
				},"waiting for callback data", callbackTimeout);
				runs(function(){
					spec.addResult("status : ", callbackData.status);
					spec.addResult("message : ", callbackData.message);
					spec.addResult("imageHeight : ", callbackData.imageHeight);
					spec.addResult("imageWidth : ", callbackData.imageWidth);
					spec.addResult("imageFormat : ", callbackData.imageFormat);
					spec.addResult("imageUri : ", callbackData.imageUri);
					spec.displayResults();
	                spec.waitForResponse();
				});
			});
			it("VT200-0578 | Should call choosePicture with property as desiredHeight and desiredWidth", function(){
				var spec = new ManualSpec(jasmine, window.document);
	        	spec.addGoal(jasmine.getEnv().currentSpec.description);
	            spec.addStep("Press 'RunTest' button");
	            spec.addPrecondition("Call choosePicture with propertyhash as desiredHeight:640, desiredWidth:480 and callback.");
	            spec.addStep("Choose the image.");
	            spec.addExpectation('Should be saved with the resolution 640x480.');
	            spec.displayScenario();
	            spec.waitForButtonPressing("Run test");
				var param = {
					'desiredHeight':640,
					'desiredWidth':480, 
					'outputFormat': 'image',
					'enableEditing': false
				};	            
				runs(function(){
					Rho.Camera.choosePicture(param, callbackFunc);
				});
				waitsFor(function(){
					return callbackTriggered;
				},"waiting for callback data", callbackTimeout);
				runs(function(){
					spec.addResult("status : ", callbackData.status);
					spec.addResult("message : ", callbackData.message);
					spec.addResult("imageHeight : ", callbackData.imageHeight);
					spec.addResult("imageWidth : ", callbackData.imageWidth);
					spec.addResult("imageFormat : ", callbackData.imageFormat);
					spec.addResult("imageUri : ", callbackData.imageUri);
					spec.displayResults();
	                spec.waitForResponse();
				});
			});
			it("VT200-0579 | Should call choosePicture with property as enableEditing as false", function(){
				var spec = new ManualSpec(jasmine, window.document);
	        	spec.addGoal(jasmine.getEnv().currentSpec.description);
	            spec.addStep("Press 'RunTest' button");
	            spec.addPrecondition("Call choosePicture with propertyhash as 'enableEditing':false and callback.");
	            spec.addStep("Choose the image.");
	            spec.addExpectation('After selecting image should not be avaiable for editting.');
	            spec.displayScenario();
	            spec.waitForButtonPressing("Run test");
				var param = {
					'enableEditing':false
				};				
				runs(function(){
					Rho.Camera.choosePicture(param, callbackFunc);
				});
				waitsFor(function(){
					return callbackTriggered;
				},"waiting for callback data", callbackTimeout);
				runs(function(){
					spec.addResult("status : ", callbackData.status);
					spec.addResult("message : ", callbackData.message);
					spec.addResult("imageHeight : ", callbackData.imageHeight);
					spec.addResult("imageWidth : ", callbackData.imageWidth);
					spec.addResult("imageFormat : ", callbackData.imageFormat);
					spec.addResult("imageUri : ", callbackData.imageUri);
					spec.displayResults();
	                spec.waitForResponse();
				});
			});
		};
	});

	describe("Enumerate Camera with callback ", function() {

		it("VT200-0581 | Should enumerate with callback", function(){
			var spec = new ManualSpec(jasmine, window.document);
        	spec.addGoal(jasmine.getEnv().currentSpec.description);
            spec.addStep("Press 'RunTest' button");
            spec.addStep("Check for the returned object.");
            spec.addExpectation('The returned object should contain the available cameras of device.');
            spec.displayScenario();
            spec.waitForButtonPressing("Run test");
			runs(function(){
				Rho.Camera.enumerate(getCallbackData);
			});
			waitsFor(function(){
				return callbackTriggered;
			},"waiting for callback data", 2000);
			runs(function(){
				spec.addResult("enumerated cameras: ", camArray);
				spec.displayResults();
                spec.waitForResponse();
			});		            
		});
	});

	describe("getCameraByType method", function() {

		if (!isWindowsMobilePlatform()) {

			it("VT200-0582 | Should call getCameraByType with back and callback as function ", function(){
				var spec = new ManualSpec(jasmine, window.document);
	        	spec.addGoal(jasmine.getEnv().currentSpec.description);
	            spec.addStep("Press 'RunTest' button");
	            spec.addStep("If return value is back camera call takePicture using return value");
	            spec.addExpectation('The return values should be back camera object and the back camera should open to take picture.');
	            spec.displayScenario();
	            spec.waitForButtonPressing("Run test");
	            var cameratype;
	            var cameraTypeCb = function(camtyp){
					cameratype = camtyp;
					callbackTriggered = true;
				};
	            runs(function(){
					Rho.Camera.getCameraByType('back', cameraTypeCb);
				});
				waitsFor(function(){
					return callbackTriggered;
				},"waiting for callback data", 10000);
				runs(function(){
					callbackTriggered = false;
					cameratype.takePicture({}, callbackFunc);
				});
				waitsFor(function(){
					return callbackTriggered;
				},"waiting for callback data", callbackTimeout);
				runs(function(){
					spec.addResult("status : ", callbackData.status);
					spec.addResult("message : ", callbackData.message);
					spec.addResult("imageHeight : ", callbackData.imageHeight);
					spec.addResult("imageWidth : ", callbackData.imageWidth);
					spec.addResult("imageFormat : ", callbackData.imageFormat);
					spec.addResult("imageUri : ", callbackData.imageUri);
					spec.displayResults();
	                spec.waitForResponse();
				});
			});
			it("VT200-0583 | Should call getCameraByType with front and without callback function ", function(){
				var spec = new ManualSpec(jasmine, window.document);
	        	spec.addGoal(jasmine.getEnv().currentSpec.description);
	            spec.addStep("Press 'RunTest' button");
	            spec.addStep("If return value is Front camera call takepicture using return value");
	            spec.addExpectation('The return values should be front camera object and the front camera should open to take picture.');
	            spec.displayScenario();
	            spec.waitForButtonPressing("Run test");
	            var cameratype;
	            runs(function(){
					cameratype = Rho.Camera.getCameraByType('front');
					cameratype.takePicture({}, callbackFunc);
				});
/*				setTimeout(function(){
					cameratype.takePicture({}, callbackFunc);
				},5000);*/
				waitsFor(function(){
					return callbackTriggered;
				},"waiting for callback data", callbackTimeout);
				runs(function(){
					spec.addResult("status : ", callbackData.status);
					spec.addResult("message : ", callbackData.message);
					spec.addResult("imageHeight : ", callbackData.imageHeight);
					spec.addResult("imageWidth : ", callbackData.imageWidth);
					spec.addResult("imageFormat : ", callbackData.imageFormat);
					spec.addResult("imageUri : ", callbackData.imageUri);
					spec.displayResults();
	                spec.waitForResponse();
				});
			});
		};
			
	});

//	for (var j = 0; j<enumData.length; j++){
//		(function(objCAM){ 
			var objCAM = enumData[0];
		   	var camid = objCAM.ID;
		   	var camtype = objCAM.cameraType;

			describe("takePicture method | using " + camid + camtype , function() {

				it("VT200-0589 | Should call takePicture | using " + camid + camtype , function(){
					Rho.Camera.desiredHeight = 480;
					Rho.Camera.desiredWidth = 640;
					var spec = new ManualSpec(jasmine, window.document);
		        	spec.addGoal(jasmine.getEnv().currentSpec.description);
		            spec.addStep("Press 'RunTest' button");
		            spec.addStep("desiredHeight : " + Rho.Camera.desiredHeight);
		            spec.addStep("desitedWidth : " + Rho.Camera.desiredWidth);
		            spec.addStep("compressionFormat : " + Rho.Camera.compressionFormat);
		            spec.addStep("Capture the image & Check for the returned status.");
		            spec.addExpectation('The preview should be in Full Screen.');
		            spec.addExpectation('Callback data :');
		            spec.addExpectation('status:OK');
		            spec.addExpectation('message: to be empty');
		            spec.addExpectation('imageWidth & imageHeight (as seen with the steps)');
		            spec.addExpectation('imageFormat(as seen in the steps) & imageUri(absolute image path with timestamp) of the saved image');
		            spec.displayScenario();
		            spec.waitForButtonPressing("Run test");
		            runs(function(){
						objCAM.takePicture({}, callbackFunc);
					});
					waitsFor(function(){
						return callbackTriggered;
					},"waiting for callback data", 10000);
					runs(function(){
						spec.addResult("status : ", callbackData.status);
						spec.addResult("message : ", callbackData.message);
						spec.addResult("imageHeight : ", callbackData.imageHeight);
						spec.addResult("imageWidth : ", callbackData.imageWidth);
						spec.addResult("imageFormat : ", callbackData.imageFormat);
						spec.addResult("imageUri : ", callbackData.imageUri);
						spec.displayResults();
		                spec.waitForResponse();
					});
				});
				it("VT200-0590 | Should call takePicture with flashMode FLASH_ON | using " + camid + camtype , function(){
					var spec = new ManualSpec(jasmine, window.document);
		        	spec.addGoal(jasmine.getEnv().currentSpec.description);
		            spec.addStep("Press 'RunTest' button");
		            spec.addStep("Capture any image in low illumination area");
		            spec.addExpectation('Flash should be on while taking the image.');
		            spec.displayScenario();
		            spec.waitForButtonPressing("Run test");
		            var param = {
		            	'flashMode':Rho.Camera.FLASH_ON
		            };
					runs(function(){
						objCAM.takePicture(param, callbackFunc);
					});
					waitsFor(function(){
						return callbackTriggered;
					},"waiting for callback data", 10000);
					runs(function(){
						spec.addResult("status : ", callbackData.status);
						spec.addResult("message : ", callbackData.message);
						spec.addResult("imageHeight : ", callbackData.imageHeight);
						spec.addResult("imageWidth : ", callbackData.imageWidth);
						spec.addResult("imageFormat : ", callbackData.imageFormat);
						spec.addResult("imageUri : ", callbackData.imageUri);
						spec.displayResults();
		                spec.waitForResponse();
					});	
				});

				it("VT200-0592 | Should call takePicture with outputFormat:dataUri  | using " + camid + camtype , function(){
					var spec = new ManualSpec(jasmine, window.document);
		        	spec.addGoal(jasmine.getEnv().currentSpec.description);
		            spec.addStep("Press 'RunTest' button");
		            spec.addStep("Capture any image.");
		            spec.addExpectation('Image should be displayed as dataUri.');
		            spec.displayScenario();
		            spec.waitForButtonPressing("Run test");
		            var param = {
		            	'outputFormat':'dataUri'
		            };
					runs(function(){
						objCAM.takePicture(param, callbackFunc);
					});
					waitsFor(function(){
						return callbackTriggered;
					},"waiting for callback data", 10000);
					runs(function(){
						spec.addResult("status : ", callbackData.status);
						spec.addResult("message : ", callbackData.message);
						spec.addResult("imageHeight : ", callbackData.imageHeight);
						spec.addResult("imageWidth : ", callbackData.imageWidth);
						spec.addResult("imageFormat : ", callbackData.imageFormat);
						spec.addResult("imageUri : ", callbackData.imageUri);
						spec.displayResults();
		                spec.waitForResponse();
					});
				});
				it("VT200-0593 | Should call takePicture with desiredHeight 480 and desiredWidth 640 | using " + camid + camtype , function(){
					var spec = new ManualSpec(jasmine, window.document);
		        	spec.addGoal(jasmine.getEnv().currentSpec.description);
		            spec.addStep("Press 'RunTest' button");
		            spec.addStep("Capture any image.");
		            if(!isApplePlatform()){
		            	spec.addStep("supportedSizeList: "+ JSON.stringify(Rho.Camera.supportedSizeList));
		            }
		            spec.addStep("Check for the returned image height and width value. Open the saved image and check for height and width.");
		            spec.addExpectation("The returned image height and width should be same as the saved image");
		            spec.addExpectation("And the returned value should be imageHeight: 480 and imageWidth: 640 (if supported by the device)");
		            spec.addExpectation("Or nearest supported resolution which is listed in steps");
		            spec.displayScenario();
		            spec.waitForButtonPressing("Run test");
		            var param = {
		            	'desiredHeight':480,
		            	'desiredWidth':640
		        	};
					runs(function(){
						objCAM.takePicture(param, callbackFunc);
					});
					waitsFor(function(){
						return callbackTriggered;
					},"waiting for callback data", 10000);
					runs(function(){
						spec.addResult("status : ", callbackData.status);
						spec.addResult("message : ", callbackData.message);
						spec.addResult("imageHeight : ", callbackData.imageHeight);
						spec.addResult("imageWidth : ", callbackData.imageWidth);
						spec.addResult("imageFormat : ", callbackData.imageFormat);
						spec.addResult("imageUri : ", callbackData.imageUri);
						spec.displayResults();
		                spec.waitForResponse();
					});	
				});

				it("VT200-0596 | Should capture image by calling takePicture() method with compressionFormat png. | using " + camid + camtype , function(){
					var spec = new ManualSpec(jasmine, window.document);
					spec.addGoal(jasmine.getEnv().currentSpec.description);
				    spec.addStep("Press 'RunTest' button");
				    spec.addStep("Capture the image");
				    spec.addExpectation('The imageFormat returned should be .png in iOS. Other platform supports only jpg');
				    spec.displayScenario();
				    spec.waitForButtonPressing("Run test");
				    var param = {
				    	'compressionFormat':'png'
				    };
					runs(function(){
						objCAM.takePicture(param, callbackFunc);
					});
					waitsFor(function(){
						return callbackTriggered;
					},"waiting for callback data", 10000);
					runs(function(){
						spec.addResult("status : ", callbackData.status);
						spec.addResult("message : ", callbackData.message);
						spec.addResult("imageHeight : ", callbackData.imageHeight);
						spec.addResult("imageWidth : ", callbackData.imageWidth);
						spec.addResult("imageFormat : ", callbackData.imageFormat);
						spec.addResult("imageUri : ", callbackData.imageUri);
						spec.displayResults();
				        spec.waitForResponse();
					});
				});

			});

//		})(enumData[j]);
//	};
});