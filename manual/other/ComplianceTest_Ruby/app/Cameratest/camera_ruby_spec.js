describe("Camera API Manual Tests", function(){

	beforeEach(function(){
		document.getElementById('imageUri').src = '';
	});


	describe("Select picture using choosePicture method", function() {

		it("should choosePicture with callback status OK", function(){
			var spec = new ManualSpec(jasmine, window.document);
        	spec.addGoal(jasmine.getEnv().currentSpec.description);
            spec.addStep("Press 'RunTest' button");
            spec.addStep("Choose the image");
            spec.addStep("Check for the returned status & image");
            spec.addExpectation('The returned status should be OK, image should be displayed through image URI, The returned image height and width should be same as the displayed image.');
            spec.displayScenario();
            spec.waitForButtonPressing("Run test");

			runs(function(){
				Ruby.call('Cameratest','choose_picture');
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
				Ruby.call('Cameratest','choose_picture');
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
				Ruby.call('Cameratest','choose_picture?colorModel=greyscale&desiredHeight='+640+'&desiredWidth='+480);
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
				Ruby.call('Cameratest','camera_enumerate');
				spec.waitForResponse();
			});

		});

	});

	if (isAndroidPlatform()) {
		describe("getCameraByType method & showSupportedList property", function() {

			it("Should call getCameraByType with Main and callback as function ", function(){
				var spec = new ManualSpec(jasmine, window.document);
	        	spec.addGoal(jasmine.getEnv().currentSpec.description);
	            spec.addStep("Press 'RunTest' button");
	            spec.addStep("If return value is main camera call takepicture using return value");
	            spec.addExpectation('The return values should be main camera object and the main camera should open to take picture.');
	            spec.displayScenario();
	            spec.waitForButtonPressing("Run test");

	            runs(function(){
	            	Ruby.call('Cameratest','get_camera_bytype?cameraType=Main');
	            	spec.waitForResponse();
				});

			});

			it("Should call getCameraByType with front and without callback function ", function(){
				var spec = new ManualSpec(jasmine, window.document);
	        	spec.addGoal(jasmine.getEnv().currentSpec.description);
	            spec.addStep("Press 'RunTest' button");
	            spec.addStep("If return value is Front camera call takepicture using return value");
	            spec.addExpectation('The return values should be main camera object and the main camera should open to take picture.');
	            spec.displayScenario();
	            spec.waitForButtonPressing("Run test");

	            runs(function(){
	            	Ruby.call('Cameratest','get_camera_bytype?cameraType=Front');
	            	spec.waitForResponse();
				});	

			});

			it("Should list supported resolution using showSupportedList " , function(){
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


	var getSelectedCameraType = function(){
		cameraType = document.getElementById("camera_type").value
		return "?cameraType="+ cameraType;
	}

   	if(isWindowsMobilePlatform()){

		describe("Should call showPreview with preview window values, compressionFormat & filename | " + getSelectedCameraType(), function() {

			it("Should call showPreview with properties & capture - Set 1 |" + getSelectedCameraType(), function(){
				var spec = new ManualSpec(jasmine, window.document);
	        	spec.addGoal(jasmine.getEnv().currentSpec.description);
	        	spec.addPrecondition("Call showPreview() with properties previewLeft:10, previewTop:10, previewWidth:100, previewHeight:60, commpressionFormat:'jpg', fileName:'\\Application\\camImage', flashMode: off, aimMode:off.");
	            spec.addStep("Press 'RunTest' button");
	            spec.addStep("Capture will happen, then Check for the returned callback status & property set");
	            spec.addExpectation('Preview window should be as set(left:10, top:10, width:100 & height:60). Capture callback should return status OK with imagePath, imageFormat as jpg & the filename camImage.jpg.');
	            spec.displayScenario();
	            spec.waitForButtonPressing("Run test");

				runs(function(){
					Ruby.call('Cameratest','show_preview_capture_set1'+getSelectedCameraType());
					spec.waitForResponse();
				});

			});

			it("Should call showPreview with preview window values, ouputFomat:dataUri & captureSound |" + getSelectedCameraType(), function(){
				var spec = new ManualSpec(jasmine, window.document);
	        	spec.addGoal(jasmine.getEnv().currentSpec.description);
	        	spec.addPrecondition("Call showPreview() with properties previewLeft:-10, previewTop:-10, previewWidth:40, previewHeight:80, outputFormat:dataUri, captureSound:'//Application//alarm2.wav'.");
	            spec.addStep("Press 'RunTest' button");
	            spec.addStep("Capture will happen, then Check for the returned callback status & property set");
	            spec.addExpectation('Preview window should be as set(left:-10, top:-10, width:40 & height:80). Should play a wav file after capture. The returned status should be OK and captured image should be displayed as dataUri.');
	            spec.displayScenario();
	            spec.waitForButtonPressing("Run test");

				runs(function(){
					Ruby.call('Cameratest','show_preview_capture_set2'+getSelectedCameraType());
					spec.waitForResponse();
				});

			});

			it("Should call showPreview with flash: on, aimmode:on (if imager), desiredHeight & desiredWidth set |" + getSelectedCameraType(), function(){
				var spec = new ManualSpec(jasmine, window.document);
	        	spec.addGoal(jasmine.getEnv().currentSpec.description);
	        	spec.addPrecondition("Call showPreview() with properties previewLeft:10, previewTop:10, previewWidth:100, previewHeight:60, desiredHeight:120, desiredWidth:240, outputFormat:image, flashMode:on, aimMode:on, captureSound:''.");
	            spec.addStep("Press 'RunTest' button");
	            spec.addStep("Check for the returned callback status & property set");
	            spec.addExpectation('Flash should be ON if available or aim ON in case of imager. The returned status should be OK, imagePath would be th efile saved path in the device, imageHeight: 120 & imageWidth: 240. After capture there should not be any wav file played.');
	            spec.displayScenario();
	            spec.waitForButtonPressing("Run test");

				runs(function(){
					Ruby.call('Cameratest','show_preview_capture_set3'+getSelectedCameraType());
					spec.waitForResponse();
				});

			});

			it("Should hide preview by using hidePreview | " + getSelectedCameraType(), function(){
				var spec = new ManualSpec(jasmine, window.document);
	        	spec.addGoal(jasmine.getEnv().currentSpec.description);
	            spec.addStep("Press 'RunTest' button");
	            spec.addExpectation('Viewfinder should get hidden.');
	            spec.displayScenario();
	            spec.waitForButtonPressing("Run test");

				runs(function(){
					Ruby.call('Cameratest','show_hide_preview'+getSelectedCameraType());
					spec.waitForResponse();
				});
			});

		});

	};

	describe("takePicture method | " + getSelectedCameraType() , function() {

		it("Should call takePicture and take image | " + getSelectedCameraType() , function(){
			var spec = new ManualSpec(jasmine, window.document);
        	spec.addGoal(jasmine.getEnv().currentSpec.description);
            spec.addStep("Press 'RunTest' button");
            spec.addStep("Capture the image & Check for the returned status.");
            spec.addExpectation('The preview should be in Full Screen. Default parameters values should be returned.');
            spec.displayScenario();
            spec.waitForButtonPressing("Run test");

			runs(function(){
				Ruby.call('Cameratest','take_picture'+getSelectedCameraType());
				spec.waitForResponse();
			});

		});

		it("Should call takePicture and returned status cancel | " + getSelectedCameraType() , function(){
			var spec = new ManualSpec(jasmine, window.document);
        	spec.addGoal(jasmine.getEnv().currentSpec.description);
            spec.addStep("Press 'RunTest' button");
            spec.addStep("Cancel the taking of image & Check for the returned status.");
            spec.addExpectation('The returned status should be cancel.');
            spec.displayScenario();
            spec.waitForButtonPressing("Run test");

			runs(function(){
				Ruby.call('Cameratest','take_picture'+getSelectedCameraType());
				spec.waitForResponse();
			});

		});

		it("Should call takePicture with flashMode FLASH_ON | " + getSelectedCameraType() , function(){
			var spec = new ManualSpec(jasmine, window.document);
        	spec.addGoal(jasmine.getEnv().currentSpec.description);
            spec.addStep("Press 'RunTest' button");
            spec.addStep("Capture any image in low illumination area");
            spec.addExpectation('Flash should be on while taking the image.');
            spec.displayScenario();
            spec.waitForButtonPressing("Run test");

			runs(function(){
				Ruby.call('Cameratest','take_picture'+getSelectedCameraType()+'&flashMode=on');
				spec.waitForResponse();
			});

			runs(function(){
				Ruby.call('Cameratest','flash_off');
			});	
		});

		if (isAndroidPlatform()) {	

			it("Should call takePicture with flashMode FLASH_AUTO in dark area | " + getSelectedCameraType() , function(){
				var spec = new ManualSpec(jasmine, window.document);
	        	spec.addGoal(jasmine.getEnv().currentSpec.description);
	            spec.addStep("Press 'RunTest' button");
	            spec.addStep("Capture any image in low illumination area");
	            spec.addExpectation('Flash should be on in low illumination area.');
	            spec.displayScenario();
	            spec.waitForButtonPressing("Run test");

				runs(function(){
					Ruby.call('Cameratest','take_picture'+getSelectedCameraType()+'&flashMode=auto');
					spec.waitForResponse();
				});

			});

			it("Should call takePicture with flashMode FLASH_AUTO in bright area | " + getSelectedCameraType() , function(){
				var spec = new ManualSpec(jasmine, window.document);
	        	spec.addGoal(jasmine.getEnv().currentSpec.description);
	            spec.addStep("Press 'RunTest' button");
	            spec.addStep("Capture any image in bright area");
	            spec.addExpectation('Flash should not be on in bright area.');
	            spec.displayScenario();
	            spec.waitForButtonPressing("Run test");

				runs(function(){
					Ruby.call('Cameratest','take_picture'+getSelectedCameraType()+'&flashMode=auto');
					spec.waitForResponse();
				});

			});

		};

		if (isWindowsMobilePlatform()){

			it("Should call takePicture with aimMode AIM_ON | " + getSelectedCameraType() , function(){
				var spec = new ManualSpec(jasmine, window.document);
	        	spec.addGoal(jasmine.getEnv().currentSpec.description);
	            spec.addStep("Press 'RunTest' button");
	            spec.addStep("Capture any image.");
	            spec.addExpectation('Aiming should be ON. Reticle should be there. Image should be catured..');
	            spec.displayScenario();
	            spec.waitForButtonPressing("Run test");

				runs(function(){
					Ruby.call('Cameratest','take_picture'+getSelectedCameraType()+'&aimMode=on');
					spec.waitForResponse();
				});
			});

		};

		it("Should call takePicture with outputFormat:dataUri  | " + getSelectedCameraType() , function(){
			var spec = new ManualSpec(jasmine, window.document);
        	spec.addGoal(jasmine.getEnv().currentSpec.description);
            spec.addStep("Press 'RunTest' button");
            spec.addStep("Capture any image.");
            spec.addExpectation('Image should be displayed as dataUri.');
            spec.displayScenario();
            spec.waitForButtonPressing("Run test");

			runs(function(){
				Ruby.call('Cameratest','take_picture'+getSelectedCameraType()+'&outputFormat=dataUri');
				spec.waitForResponse();
			});

		});

		it("Should call takePicture with desiredHeight 480 and desiredWidth 640 | " + getSelectedCameraType() , function(){
			var spec = new ManualSpec(jasmine, window.document);
        	spec.addGoal(jasmine.getEnv().currentSpec.description);
            spec.addStep("Press 'RunTest' button");
            spec.addStep("Capture any image. Check for the returned image height and width value. Open the saved image and check for height and width.");
            spec.addExpectation('The returned image height and width should be same as the saved image which are 640 and 480');
            spec.displayScenario();
            spec.waitForButtonPressing("Run test");

			runs(function(){
				Ruby.call('Cameratest','take_picture'+getSelectedCameraType()+'&desiredHeight='+480+'&desiredWidth='+640);
				spec.waitForResponse();
			});
		});

		if(isApplePlatform()){
			it("Should call takePicture with enableEditing as true | " + getSelectedCameraType() , function(){
				var spec = new ManualSpec(jasmine, window.document);
	        	spec.addGoal(jasmine.getEnv().currentSpec.description);
	            spec.addStep("Press 'RunTest' button");
	            spec.addStep("Capture any image.");
	            spec.addStep("check for photo capture image customizing.");
	            spec.addExpectation('It should Enable post photo capture image customizing by default.');
	            spec.displayScenario();
	            spec.waitForButtonPressing("Run test");

				runs(function(){
					Ruby.call('Cameratest','take_picture'+getSelectedCameraType()+'&enableEditing='+true);
					spec.waitForResponse();
				});
			});
		};

		if (isAndroidPlatform() || isApplePlatform()) {

			it("Should call takePicture with colorModel as greyscale | " + getSelectedCameraType() , function(){
				var spec = new ManualSpec(jasmine, window.document);
				spec.addGoal(jasmine.getEnv().currentSpec.description);
			    spec.addStep("Press 'RunTest' button");
			    spec.addStep("save the image and check for color.");
			    spec.addExpectation('The image captured should be a grayscale (Black and White) image.');
			    spec.displayScenario();
			    spec.waitForButtonPressing("Run test");

				runs(function(){
					Ruby.call('Cameratest','take_picture'+getSelectedCameraType()+'&colorModel=grayscale');
					spec.waitForResponse();
				});

				runs(function(){
					Ruby.call('Cameratest','color_rgb');
				});					
			});

		};

		it("Should capture image by calling takePicture() method with compressionFormat jpg. | " + getSelectedCameraType() , function(){
			var spec = new ManualSpec(jasmine, window.document);
			spec.addGoal(jasmine.getEnv().currentSpec.description);
		    spec.addStep("Press 'RunTest' button");
		    spec.addStep("Check for the returned status.");
		    spec.addExpectation('The image captured should be in .jpg and other Parameters should return default values.');
		    spec.displayScenario();
		    spec.waitForButtonPressing("Run test");

			runs(function(){
				Ruby.call('Cameratest','take_picture'+getSelectedCameraType()+'&compressionFormat=jpg');
				spec.waitForResponse();
			});
		});

		it("Should capture image by calling takePicture() method with compressionFormat png. | " + getSelectedCameraType() , function(){
			var spec = new ManualSpec(jasmine, window.document);
			spec.addGoal(jasmine.getEnv().currentSpec.description);
		    spec.addStep("Press 'RunTest' button");
		    spec.addStep("Check for the returned status.");
		    spec.addExpectation('The image captured should be in .png But in WM & CE it will be jpg only as png is not supported');
		    spec.displayScenario();
		    spec.waitForButtonPressing("Run test");

			runs(function(){
				Ruby.call('Cameratest','take_picture'+getSelectedCameraType()+'&compressionFormat=png');
				spec.waitForResponse();
			});
		});

	});

	
});