describe("Camera API Manual Tests", function(){
	var enumData = Rho.Camera.enumerate();
	var cam;
	if(enumData.length == 2){
		cam = enumData[0].getProperty('cameraType');
	}else{
		cam = enumData[0].getProperty('cameraType');
		if(cam == 'front' || cam == 'imager'){
			cam = '';
		}
	}
	var imagestatus = '';
	var callbackData;
	var callbackTriggered = false;
	var callbackTimeout = 30000;
	var camArray = "";
	var imageUriData = null;
	var camtype;
	var selectedCam = '';
	var sound = "";
	var camtype;
    var camerapath = Rho.Application.modelFolderPath("CameraTest");
    if(isWindowsMobilePlatform()){
    	sound = 'wm';
    }else{
    	sound = 'android';
    }
    var sampleimage = Rho.RhoFile.join(camerapath, "/samplemedia/zebratechnologies.jpg");

	beforeEach(function(){
		callbackData = "";
		imageUriData = null;
		callbackTriggered = false;
		document.getElementById('imageUriDiv').innerHTML = '<img src="" id="imageUri"></img>';
	});
	afterEach(function(){
		document.getElementById('imageUriDiv').innerHTML = '<img src="" id="imageUri"></img>';
		document.getElementById("expected").innerHTML= '';
		document.getElementById("image").innerHTML= '';
	});

	var getSelectedCameraType = function(){
		selectedCam = document.getElementById("camera_type").value;
		return "?camera_type=" + selectedCam;
	};
	var objCAM = {};
	if(isWindowsMobilePlatform()){
		camtype = 'camera_type=color';
	}else{
		camtype = 'camera_type=back';
	};
	if(cam == 'back' || cam == 'color'){
	   	if(isWindowsMobilePlatform()){
			describe("showPreview, Capture & hidePreview methods | using " + camtype , function() {
				it("VT200-0586 | Should call showPreview with preview window values, ouputFomat:dataUri & captureSound | using " + camtype , function(){
					var spec = new ManualSpec(jasmine, window.document);
		        	spec.addGoal(jasmine.getEnv().currentSpec.description);
		        	spec.addPrecondition("Call showPreview() with properties previewLeft:-10, previewTop:-10, previewWidth:40, previewHeight:80, outputFormat:dataUri, captureSound: <audiofile given with teh app>.");
		            spec.addStep("Press 'RunTest' button");
		            spec.addStep("Note: Capture will be called automatically & hidePreview is called after the capture");
		            spec.addStep("Capture will happen, then Check for the returned callback status & property set");
		            spec.addExpectation('Preview window should be as set(left:-10, top:-10, width:40 & height:80).');
		            spec.addExpectation('Should play a wav file after capture.');
		            spec.addExpectation('The returned status should be OK and captured image should be displayed as dataUri. .');
		            spec.displayScenario();
		            spec.waitForButtonPressing("Run test");
					runs(function(){
						Ruby.call('Cameratest','show_preview_capture?'+camtype+'&previewLeft=-10&previewTop=-10&previewHeight=80&previewWidth=40&outputFormat=dataUri&captureSound='+sound);
		                spec.waitForResponse();
					});
				});
				it("VT200-0587 | Should call showPreview with flash: on, aimmode:on (if imager), desiredHeight & desiredWidth set | using " + camtype , function(){
					var spec = new ManualSpec(jasmine, window.document);
		        	spec.addGoal(jasmine.getEnv().currentSpec.description);
		        	spec.addPrecondition("Call showPreview() with properties previewLeft:10, previewTop:10, previewWidth:100, previewHeight:60, desiredHeight:120, desiredWidth:240, outputFormat:image, flashMode:on, aimMode:on, captureSound:''.");
		            spec.addStep("Press 'RunTest' button");
		            spec.addStep("Note: Capture will be called automatically & hidePreview is called after the capture");
		            spec.addStep("Capture will happen, then Check for the returned callback status & property set");
		            spec.addExpectation('Flash should be ON if available or aim ON in case of imager.');
		            spec.addExpectation('The returned status should be OK');
		            spec.addExpectation('ImagePath would be the file saved path in the device');
		            spec.addExpectation('imageHeight: 120 & imageWidth: 240.');
		            spec.addExpectation('After capture there should not be any wav file played.');
		            spec.displayScenario();
		            spec.waitForButtonPressing("Run test");
					runs(function(){
						Ruby.call('Cameratest','show_preview_capture?'+camtype+'&desiredHeight=120&desiredWidth=240&flashMode=on&aimMode=on&outputFormat=image');
		                spec.waitForResponse();
					});
				});
				it("VT200-0588 | Should hide preview by using hidePreview | using " + camtype , function(){
					var spec = new ManualSpec(jasmine, window.document);
		        	spec.addGoal(jasmine.getEnv().currentSpec.description);
		            spec.addStep("Press 'RunTest' button");
		            spec.addExpectation('Viewfinder should get hidden around 10secs.');
		            spec.displayScenario();
		            spec.waitForButtonPressing("Run test");
		            runs(function(){
						Ruby.call('Cameratest','show_hide_preview?'+camtype);
		                spec.waitForResponse();
					});
				});
			});
		};

		describe("takePicture method | using " + camtype , function() {

			it("VT200-0589 | Should call takePicture | using " + camtype , function(){
				Rho.Camera.desiredHeight = 480;
				Rho.Camera.desiredWidth = 640;
				var spec = new ManualSpec(jasmine, window.document);
	        	spec.addGoal(jasmine.getEnv().currentSpec.description);
	            spec.addStep("Press 'RunTest' button");
	            /*spec.addStep("desiredHeight : " + Rho.Camera.desiredHeight);
	            spec.addStep("desitedWidth : " + Rho.Camera.desiredWidth);*/
	            spec.addStep("compressionFormat : " + Rho.Camera.compressionFormat);
	            spec.addStep("Capture the image & Check for the returned status.");
	            spec.addExpectation('The preview should be in Full Screen.');
	            spec.addExpectation('Callback data :');
	            spec.addExpectation('status:OK');
	            spec.addExpectation('message: to be empty');
	            spec.addExpectation('imageWidth & imageHeight depends on the default value of device');
	            spec.addExpectation('imageFormat(as seen in the steps) & imageUri(absolute image path with timestamp) of the saved image');
	            spec.displayScenario();
	            spec.waitForButtonPressing("Run test");
	            runs(function(){
					Ruby.call('Cameratest','take_picture?'+camtype);
	                spec.waitForResponse();
				});
			});
			it("VT200-0590 | Should call takePicture with flashMode FLASH_ON | using " + camtype , function(){
				var spec = new ManualSpec(jasmine, window.document);
	        	spec.addGoal(jasmine.getEnv().currentSpec.description);
	            spec.addStep("Press 'RunTest' button");
	            spec.addStep("Capture any image in low illumination area");
	            spec.addExpectation('Flash should be on while taking the image.');
	            spec.displayScenario();
	            spec.waitForButtonPressing("Run test");
				runs(function(){
					Ruby.call('Cameratest','take_picture?'+camtype+'&flashMode=on');
	                spec.waitForResponse();
				});	
			});

			if (isWindowsMobilePlatform()){
				it("VT200-0591 | Should call takePicture with aimMode AIM_ON | using " + camtype , function(){
					var spec = new ManualSpec(jasmine, window.document);
		        	spec.addGoal(jasmine.getEnv().currentSpec.description);
		            spec.addStep("Press 'RunTest' button");
		            spec.addStep("Capture any image.");
		            spec.addExpectation('Aiming should be ON. Reticle should be there. Image should be catured..');
		            spec.displayScenario();
		            spec.waitForButtonPressing("Run test");
					runs(function(){
						Ruby.call('Cameratest','take_picture?'+camtype+'&aimMode=on');
		                spec.waitForResponse();
					});
				});
			};

			it("VT200-0592 | Should call takePicture with outputFormat:dataUri  | using " + camtype , function(){
				var spec = new ManualSpec(jasmine, window.document);
	        	spec.addGoal(jasmine.getEnv().currentSpec.description);
	            spec.addStep("Press 'RunTest' button");
	            spec.addStep("Capture any image.");
	            spec.addExpectation('Image should be displayed as dataUri.');
	            spec.displayScenario();
	            spec.waitForButtonPressing("Run test");
				runs(function(){
					Ruby.call('Cameratest','take_picture?'+camtype+'&outputFormat=dataUri');
	                spec.waitForResponse();
				});
			});
			it("VT200-0593 | Should call takePicture with desiredHeight 480 and desiredWidth 640 | using " + camtype , function(){
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
				runs(function(){
					Ruby.call('Cameratest','take_picture?'+camtype+'&desiredHeight=480&desiredWidth=640');
	                spec.waitForResponse();
				});	
			});

			if(isApplePlatform()){
				it("VT200-0594 | Should call takePicture with enableEditing as false | using " + camtype , function(){
					var spec = new ManualSpec(jasmine, window.document);
		        	spec.addGoal(jasmine.getEnv().currentSpec.description);
		            spec.addStep("Press 'RunTest' button");
		            spec.addStep("Capture any image.");
		            spec.addStep("check for photo capture image customizing.");
		            spec.addExpectation('It should not Enable post photo capture image customizing.');
		            spec.displayScenario();
		            spec.waitForButtonPressing("Run test");
					runs(function(){
						Ruby.call('Cameratest','take_picture?'+camtype+'&enableEditing=false');
		                spec.waitForResponse();
					});						
				});
			};

			if (isAndroidPlatform() || isApplePlatform()) {
				it("VT200-0595 | Should call takePicture with colorModel as grayscale | using " + camtype , function(){
					var spec = new ManualSpec(jasmine, window.document);
					spec.addGoal(jasmine.getEnv().currentSpec.description);
				    spec.addStep("Press 'RunTest' button");
				    spec.addStep("Check for the preview screen color and saved image.");
				    spec.addExpectation('The camera screen & saved image should be in grayscale (Black and White).');
				    spec.displayScenario();
				    spec.waitForButtonPressing("Run test");
					runs(function(){
						Ruby.call('Cameratest','take_picture?'+camtype+'&colorModel=grayscale&outputFormat=dataUri');
				        spec.waitForResponse();
					});					
				});
			};

			it("VT200-0596 | Should capture image by calling takePicture() method with compressionFormat png. | using " + camtype , function(){
				var spec = new ManualSpec(jasmine, window.document);
				spec.addGoal(jasmine.getEnv().currentSpec.description);
			    spec.addStep("Press 'RunTest' button");
			    spec.addStep("Capture the image");
			    spec.addExpectation('The imageFormat returned should be .png in iOS. Other platform supports only jpg');
			    spec.displayScenario();
			    spec.waitForButtonPressing("Run test");
				runs(function(){
					Ruby.call('Cameratest','take_picture?'+camtype+'&compressionFormat=png');
			        spec.waitForResponse();
				});
			});

			if(isWindowsMobilePlatform() || isAndroidPlatform()){
				it("VT200-0597 | Should capture image by calling takePicture() method with captureSound | using " + camtype , function(){
					var spec = new ManualSpec(jasmine, window.document);
					spec.addGoal(jasmine.getEnv().currentSpec.description);
					spec.addStep("Press 'RunTest' button");
				    spec.addStep("Check for the returned status.");
				    spec.addExpectation('After successful capture, should play a mp3/wav file after capture.');
				    spec.displayScenario();
				    spec.waitForButtonPressing("Run test");
					runs(function(){
						Ruby.call('Cameratest','take_picture?'+camtype+'&outputFormat=image&captureSound='+sound);
				        spec.waitForResponse();
					});
				});
			};

			if(isAndroidPlatform()){
				it("VT200-0598 | Should capture image by calling takePicture() method with useSystemViewfinder true | using " + camtype , function(){
					var spec = new ManualSpec(jasmine, window.document);
					spec.addGoal(jasmine.getEnv().currentSpec.description);
					spec.addStep("Press 'RunTest' button");
				    spec.addStep("Check for the returned status.");
				    spec.addExpectation("Uses the system Camera application to take a picture instead of rhodes\' camera");
				    spec.displayScenario();
				    spec.waitForButtonPressing("Run test");
					runs(function(){
						Ruby.call('Cameratest','take_picture?'+camtype+'&useSystemViewfinder=true');
				        spec.waitForResponse();
					});
				});
			};

			if(isAndroidPlatform() || isApplePlatform()){
				it("VT200-0599 | Should capture image by calling takePicture() method with saveToDeviceGallery true | using " + camtype , function(){
					var spec = new ManualSpec(jasmine, window.document);
					spec.addGoal(jasmine.getEnv().currentSpec.description);
					spec.addStep("Press 'RunTest' button");
				    spec.addStep("Check for the returned status.");
				    spec.addExpectation('Image captured should be added to the device gallery');
				    spec.displayScenario();
				    spec.waitForButtonPressing("Run test");
					runs(function(){
						Ruby.call('Cameratest','take_picture?'+camtype+'&saveToDeviceGallery=true');
				        spec.waitForResponse();
					});
				});
			};
		});

	}else{
		alert('back or color camera not found');
	};
});