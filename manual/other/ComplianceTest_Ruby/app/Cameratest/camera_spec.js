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

		it("VT200-0576 | Should call choosePicture with 'outputFormat' property value as dataUri", function(){
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
				runs(function(){
					Ruby.call('Cameratest','choose_picture?colorModel=grayscale');
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
				runs(function(){
					Ruby.call('Cameratest','choose_picture?desiredHeight='+640+'&desiredWidth='+480);
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
				runs(function(){
					Ruby.call('Cameratest','choose_picture?enableEditing='+false);
	                spec.waitForResponse();
	            });
			});
		};
	});

	if(isAndroidPlatform() || isApplePlatform()){
		describe("copyImageToDeviceGallery method | " , function() {
			it("VT200-0580 | Should copy image to device gallery from the device", function(){
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
		});
	};


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
				Ruby.call('Cameratest','camera_enumerate');
                spec.waitForResponse();
			});		            
		});
	});


	describe("getCameraByType method", function() {
		if (!isWindowsMobilePlatform()) {
			it("VT200-0582 | Should call getCameraByType with back", function(){
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
			it("VT200-0583 | Should call getCameraByType with front", function(){
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
			it("VT200-0584 | Should call getCameraByType with color and callback as function", function(){
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
			it("VT200-0585 | Should call getCameraByType with imager and without callback function ", function(){
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

});