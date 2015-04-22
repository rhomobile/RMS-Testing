describe("Camera API Manual Tests", function(){
	var imagestatus = '';
	var callbackData;
	var callbackTriggered = false;
	var callbackTimeout = 30000;
	var imageUriData = null;
	var camtype;
	var sound = "";
	
	beforeEach(function(){
		imageUriData = null;
		callbackTriggered = false;
		document.getElementById("expected").innerHTML= "";
		document.getElementById("image").innerHTML= "";
		document.getElementById('imageUriDiv').innerHTML = '<img src="" id="imageUri"></img>';
	});

	afterEach(function(){
		document.getElementById('imageUriDiv').innerHTML = '<img src="" id="imageUri"></img>';
		document.getElementById("expected").innerHTML= "";
		document.getElementById("image").innerHTML= "";
	});


	describe("Select picture using choosePicture method | Note: NA for CE platform", function() {

		it("VT285-0001 | should call choosePicture with callback status OK", function(){
			var spec = new ManualSpec(jasmine, window.document);
        	spec.addGoal(jasmine.getEnv().currentSpec.description);
            spec.addStep("Press 'RunTest' button");
            spec.addStep("Choose the image");
            spec.addStep("Check for the returned status & image");
            spec.addExpectation("The returned status should be OK, message should be empty");
            spec.addExpectation("imageUri should have absolute imagepath of the selected image.");
            spec.addExpectation("The returned image height and width should be same as the displayed image.");
            spec.addExpectation("Also imageFormat should be as jpg/png in callback.");
            spec.displayScenario();
            spec.waitForButtonPressing("Run test");
			runs(function(){
				Ruby.call('Cameratest','choose_picture');
                spec.waitForResponse();
			});
		});
		it("VT285-0002 | should call choosePicture with callback status cancel", function(){
			var spec = new ManualSpec(jasmine, window.document);
        	spec.addGoal(jasmine.getEnv().currentSpec.description);
            spec.addStep("Press 'RunTest' button");
            spec.addStep("Cancel the choosing of image");
            spec.addStep("Check for the returned status");
            spec.addExpectation("The returned status should be cancel.");
            spec.displayScenario();
            spec.waitForButtonPressing("Run test");
			runs(function(){
				Ruby.call('Cameratest','choose_picture');
                spec.waitForResponse();
			});
		});
		it("VT285-0003 | Should call choosePicture with outputFormat as image", function(){
			var spec = new ManualSpec(jasmine, window.document);
        	spec.addGoal(jasmine.getEnv().currentSpec.description);
            spec.addStep("Press 'RunTest' button");
            spec.addStep("Choose the image");
            spec.addStep("Check for the returned imageFormat");
            spec.addExpectation('The returned status should be OK and the path of the image should be mentioned in callback.');
            spec.displayScenario();
            spec.waitForButtonPressing("Run test");
			runs(function(){
				Ruby.call('Cameratest','choose_picture?outputFormat=image');
                spec.waitForResponse();
            });
		});
		it("VT285-0004 | Should call choosePicture with 'outputFormat' property value as dataUri", function(){
			var spec = new ManualSpec(jasmine, window.document);
        	spec.addGoal(jasmine.getEnv().currentSpec.description);
            spec.addStep("Press 'RunTest' button");
            spec.addStep("Choose the image.");
            spec.addStep("Check the image on view");
            spec.addExpectation('The chosen image should be returned as Data URI object.');
            spec.displayScenario();
            spec.waitForButtonPressing("Run test");
			runs(function(){
				Ruby.call('Cameratest','choose_picture?outputFormat=dataUri');				
                spec.waitForResponse();
            });
		});
		if(isApplePlatform()){
			it("VT285-0005 | Should call choosePicture with property as colorModel: grayscale", function(){
				var spec = new ManualSpec(jasmine, window.document);
	        	spec.addGoal(jasmine.getEnv().currentSpec.description);
	            spec.addStep("Press 'RunTest' button");
	            spec.addPrecondition("Call choosePicture with propertyhash as colorModel:grayscale and callback.");
	            spec.addStep("Choose the image.");
	            spec.addExpectation('All images should be shown in the gallery');
	            spec.addExpectation('By selecting any of the image, should be displayed in grayscale with the test application.');
	            spec.displayScenario();
	            spec.waitForButtonPressing("Run test");
				runs(function(){
					Ruby.call('Cameratest','choose_picture?colorModel=grayscale');
	                spec.waitForResponse();
	            });
			});
			it("VT285-0006 | Should call choosePicture with property as colorModel:rgb", function(){
				var spec = new ManualSpec(jasmine, window.document);
	        	spec.addGoal(jasmine.getEnv().currentSpec.description);
	            spec.addStep("Press 'RunTest' button");
	            spec.addPrecondition("Call choosePicture with propertyhash as colorModel:rgb and callback.");
	            spec.addStep("Choose the image.");
	            spec.addExpectation('All images should be shown in the gallery');
	            spec.addExpectation('By selecting any of the image, should be displayed in RGB (normal color scale) in the test application.');
	            spec.displayScenario();
	            spec.waitForButtonPressing("Run test");
				runs(function(){
					Ruby.call('Cameratest','choose_picture?colorModel=rgb');
	                spec.waitForResponse();
	            });
			});
			it("VT285-0007 | Should call choosePicture with property as desiredHeight and desiredWidth", function(){
				var spec = new ManualSpec(jasmine, window.document);
	        	spec.addGoal(jasmine.getEnv().currentSpec.description);
	            spec.addStep("Press 'RunTest' button");
	            spec.addPrecondition("Call choosePicture with propertyhash as desiredHeight:640, desiredWidth:480 and callback.");
	            spec.addStep("Choose the image.");
	            spec.addExpectation('Should be saved with the resolution 640x480.');
	            spec.displayScenario();
	            spec.waitForButtonPressing("Run test");
				runs(function(){
					Ruby.call('Cameratest','choose_picture?desiredHeight=640&desiredWidth=480&enableEditing=false');
	                spec.waitForResponse();
	            });
			});
			it("VT285-0008 | Should call choosePicture with property as compressionFormat as jpg", function(){
				var spec = new ManualSpec(jasmine, window.document);
	        	spec.addGoal(jasmine.getEnv().currentSpec.description);
	            spec.addStep("Press 'RunTest' button");
	            spec.addStep("Choose the image.");
	            spec.addExpectation('Only jpg images should be returned.');
	            spec.displayScenario();
	            spec.waitForButtonPressing("Run test");
				runs(function(){
					Ruby.call('Cameratest','choose_picture?compressionFormat=jpg');
	                spec.waitForResponse();
	            });
			});
			it("VT285-0009 | Should call choosePicture with property as compressionFormat as png", function(){
				var spec = new ManualSpec(jasmine, window.document);
	        	spec.addGoal(jasmine.getEnv().currentSpec.description);
	            spec.addStep("Press 'RunTest' button");
	            spec.addPrecondition("Call choosePicture with propertyhash as compressionFormat:'png' and callback.");
	            spec.addStep("Choose the image.");
	            spec.addExpectation('Only png images should be returned.');
	            spec.displayScenario();
	            spec.waitForButtonPressing("Run test");
				runs(function(){
					Ruby.call('Cameratest','choose_picture?compressionFormat=png');
	                spec.waitForResponse();
	            });
			});
			it("VT285-0010 | Should call choosePicture with property as enableEditing as false", function(){
				var spec = new ManualSpec(jasmine, window.document);
	        	spec.addGoal(jasmine.getEnv().currentSpec.description);
	            spec.addStep("Press 'RunTest' button");
	            spec.addPrecondition("Call choosePicture with propertyhash as 'enableEditing':false and callback.");
	            spec.addStep("Choose the image.");
	            spec.addExpectation('After selecting image should not be avaiable for editting.');
	            spec.displayScenario();
	            spec.waitForButtonPressing("Run test");
				runs(function(){
					Ruby.call('Cameratest','choose_picture?enableEditing=false');
	                spec.waitForResponse();
	            });
			});
			it("VT285-0011 | Should call choosePicture with property as enableEditing as true", function(){
				var spec = new ManualSpec(jasmine, window.document);
	        	spec.addGoal(jasmine.getEnv().currentSpec.description);
	            spec.addStep("Press 'RunTest' button");
	            spec.addPrecondition("Call choosePicture with propertyhash as 'enableEditing':true and callback.");
	            spec.addStep("Choose the image.");
	            spec.addExpectation('After selecting image should be avaiable for editting.');
	            spec.displayScenario();
	            spec.waitForButtonPressing("Run test");
				runs(function(){
					Ruby.call('Cameratest','choose_picture?enableEditing=true');
	                spec.waitForResponse();
	            });
			});
		};
		it("VT285-0012 | should choosePicture with callback and suspend the device", function(){
			var spec = new ManualSpec(jasmine, window.document);
        	spec.addGoal(jasmine.getEnv().currentSpec.description);
            spec.addStep("Press 'RunTest' button");
            spec.addStep("Suspend the device and resume without choosing the file. After resume then select an image.");
            spec.addStep("Check for the returned status and returned message");
            spec.addExpectation('Image should be chosen successfully with callback data.');
            spec.displayScenario();
            spec.waitForButtonPressing("Run test");
			runs(function(){
				Ruby.call('Cameratest','choose_picture');
                spec.waitForResponse();
            });
		});
	});

	if(isAndroidPlatform() || isApplePlatform()){
		describe("copyImageToDeviceGallery method | " , function() {
			it("VT285-0013 | Should copy image to device gallery from the device", function(){
				var spec = new ManualSpec(jasmine, window.document);
				spec.addGoal(jasmine.getEnv().currentSpec.description);
				spec.addStep("Press 'RunTest' button");
			    spec.addStep("NOTE: image has been kept with the application. No need to copy to device separately."); 
			    spec.addExpectation("zebratechnologies.jpg' should get copied in to the gallery.");
			    spec.displayScenario();
			    spec.waitForButtonPressing("Run test");
				runs(function(){
					Ruby.call('Cameratest','copyto_gallery');
					spec.waitForResponse();
				});
			});
			it("VT285-0014 | Should copy image to device gallery from invalid path", function(){
				var spec = new ManualSpec(jasmine, window.document);
				spec.addGoal(jasmine.getEnv().currentSpec.description);
				spec.addStep("Press 'RunTest' button");
			    spec.addExpectation('Application should not crash or behave abnormally');
			    spec.displayScenario();
			    spec.waitForButtonPressing("Run test");
			    runs(function(){
			    	Ruby.call('Cameratest','copyto_gallery?option=invalid');
					spec.waitForResponse();
				});
			});
			xit("VT285-0015 | Should copyImageToDeviceGallery using choosePicture method (ie. gallery to gallery copy)", function(){
				var spec = new ManualSpec(jasmine, window.document);
	        	spec.addGoal(jasmine.getEnv().currentSpec.description);
	            spec.addStep("Press 'RunTest' button");
	            spec.addStep("Select an image from the gallery using choosePicture");
	            spec.addExpectation('Selected image should be copied again to the same gallery and application should not behave abnormally');
	            spec.displayScenario();
	            spec.waitForButtonPressing("Run test");
				runs(function(){
					Rho.Camera.choosePicture({'outputFormat' : 'image'}, callbackFunc);
				});
				waitsFor(function(){
					return callbackTriggered;
				},"waiting for callback data", callbackTimeout);
				runs(function(){
					if(imagestatus == 'ok'){
						Rho.Camera.copyImageToDeviceGallery(Rho.Application.expandDatabaseBlobFilePath(imageUriData));
					}else{
						alert('copyImageToDeviceGallery not run as image not choosen');
					}
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
	};


	describe("Enumerate Camera with callback ", function() {
		it("VT285-0016 | Should enumerate with callback", function(){
			var spec = new ManualSpec(jasmine, window.document);
        	spec.addGoal(jasmine.getEnv().currentSpec.description);
            spec.addStep("Press 'RunTest' button");
            spec.addStep("Check for the returned object.");
            spec.addExpectation('The returned object should contain the available cameras of device.');
            spec.displayScenario();
            spec.waitForButtonPressing("Run test");
			runs(function(){
				Ruby.call('Cameratest','camera_enumerate');
                spec.waitForResponse();
			});		            
		});
	});


	describe("getCameraByType method", function() {
		if (!isWindowsMobilePlatform()) {
			it("VT285-0017 | Should call getCameraByType with back", function(){
				var spec = new ManualSpec(jasmine, window.document);
	        	spec.addGoal(jasmine.getEnv().currentSpec.description);
	            spec.addStep("Press 'RunTest' button");
	            spec.addStep("If return value is back camera call takepicture using return value");
	            spec.addExpectation('The return values should be back camera object and the back camera should open to take picture.');
	            spec.displayScenario();
	            spec.waitForButtonPressing("Run test");
	            runs(function(){
					Ruby.call('Cameratest','get_camera_bytype?cameraType=back');
	                spec.waitForResponse();
				});
			});
			it("VT285-0018 | Should call getCameraByType with front", function(){
				var spec = new ManualSpec(jasmine, window.document);
	        	spec.addGoal(jasmine.getEnv().currentSpec.description);
	            spec.addStep("Press 'RunTest' button");
	            spec.addStep("If return value is Front camera call takepicture using return value");
	            spec.addExpectation('The return values should be front camera object and the front camera should open to take picture.');
	            spec.displayScenario();
	            spec.waitForButtonPressing("Run test");
	            runs(function(){
					Ruby.call('Cameratest','get_camera_bytype?cameraType=front');
	                spec.waitForResponse();
				});
			});
		};

		if (isWindowsMobilePlatform()) {
			it("VT285-0019 | Should call getCameraByType with color and callback as function", function(){
				var spec = new ManualSpec(jasmine, window.document);
	        	spec.addGoal(jasmine.getEnv().currentSpec.description);
	            spec.addStep("Press 'RunTest' button");
	            spec.addStep("If return value is color camera call takepicture using return value");
	            spec.addExpectation('The return values should be color camera object and the color camera should open to take picture.');
	            spec.displayScenario();
	            spec.waitForButtonPressing("Run test");
	            runs(function(){
					Ruby.call('Cameratest','get_camera_bytype?cameraType=color');
	                spec.waitForResponse();
				});
			});
			it("VT285-0020 | Should call getCameraByType with imager and without callback function ", function(){
				var spec = new ManualSpec(jasmine, window.document);
	        	spec.addGoal(jasmine.getEnv().currentSpec.description);
	            spec.addStep("Press 'RunTest' button");
	            spec.addStep("If return value is imager camera call takepicture using return value");
	            spec.addExpectation('The return values should be imager camera object and the imager camera should open to take picture.');
	            spec.displayScenario();
	            spec.waitForButtonPressing("Run test");
	            runs(function(){
					Ruby.call('Cameratest','get_camera_bytype?cameraType=imager');
	                spec.waitForResponse();
				});
			});
		};			
	});

	if (!isApplePlatform()){
		describe("supportedSizeList property", function() {
			it("VT285-0021 | Should list supported resolution using supportedSizeList " , function(){
				var spec = new ManualSpec(jasmine, window.document);
	        	spec.addGoal(jasmine.getEnv().currentSpec.description);
	            spec.addStep("Press 'RunTest' button");
	            spec.addStep("Check for the return value");
	            spec.addExpectation('The return values should be an array of width and height which are supported by the device.');
	            spec.displayScenario();
	            spec.waitForButtonPressing("Run test");
	            runs(function(){
					Ruby.call('Cameratest','show_supported_list');
	                spec.waitForResponse();
				});
			});
		});
	};

});