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
					Rho.Camera.copyImageToDeviceGallery(sampleimage);
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

		if (isWindowsMobilePlatform()) {
			it("VT200-0584 | Should call getCameraByType with color and callback as function", function(){
				var spec = new ManualSpec(jasmine, window.document);
	        	spec.addGoal(jasmine.getEnv().currentSpec.description);
	            spec.addStep("Press 'RunTest' button");
	            spec.addStep("If return value is color camera call takepicture using return value");
	            spec.addExpectation('The return values should be color camera object and the color camera should open to take picture.');
	            spec.displayScenario();
	            spec.waitForButtonPressing("Run test");
	            var cameratype;
	            var cameraTypeCb = function(camtyp){
					cameratype = camtyp;
					callbackTriggered = true;
				};
	            runs(function(){
					Rho.Camera.getCameraByType('color', cameraTypeCb);
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
			it("VT200-0585 | Should call getCameraByType with imager and without callback function ", function(){
				var spec = new ManualSpec(jasmine, window.document);
	        	spec.addGoal(jasmine.getEnv().currentSpec.description);
	            spec.addStep("Press 'RunTest' button");
	            spec.addStep("If return value is imager camera call takepicture using return value");
	            spec.addExpectation('The return values should be imager camera object and the imager camera should open to take picture.');
	            spec.displayScenario();
	            spec.waitForButtonPressing("Run test");
	            var cameratype;
	            runs(function(){
					cameratype = Rho.Camera.getCameraByType('imager');
				});
				setTimeout(function(){
					cameratype.takePicture({}, callbackFunc);
				},5000);
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

	for (var j = 0; j<enumData.length; j++){
		(function(objCAM){ 
		   	var camid = objCAM.getProperty('ID');
		   	var camtype = objCAM.getProperty('cameraType');
		   	if(isWindowsMobilePlatform()){
				describe("showPreview, Capture & hidePreview methods | using " + camid + camtype , function() {
					it("VT200-0586 | Should call showPreview with preview window values, ouputFomat:dataUri & captureSound | using " + camid + camtype , function(){
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
			            var param = {
							'previewLeft':-10,
							'previewTop':-10,
							'previewWidth':40,
							'previewHeight':80,
							'outputFormat':'dataUri',
							'captureSound': sound
						};
						runs(function(){
							objCAM.showPreview(param);
							setTimeout(function(){
								objCAM.capture(callbackFunc);
							},10000);
						});
						waitsFor(function(){
							return callbackTriggered;
						},"waiting for callback data", 22000);
						runs(function(){
							spec.addResult("status : ", callbackData.status);
							spec.addResult("message : ", callbackData.message);
							spec.addResult("imageHeight : ", callbackData.imageHeight);
							spec.addResult("imageWidth : ", callbackData.imageWidth);
							spec.addResult("imageFormat : ", callbackData.imageFormat);
							spec.addResult("imageUri : ", callbackData.imageUri);
							spec.displayResults();
							objCAM.hidePreview();
			                spec.waitForResponse();
						});
					});
					it("VT200-0587 | Should call showPreview with flash: on, aimmode:on (if imager), desiredHeight & desiredWidth set | using " + camid + camtype , function(){
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
			            var param = {
							'previewLeft':10,
							'previewTop':10,
							'previewWidth':100,
							'previewHeight':60,
							'desiredHeight':120,
							'desiredWidth':240,
							'outputFormat':'image',
							'flashMode':'on',
							'aimMode':'on',
							'captureSound':''
						};
						runs(function(){
							objCAM.showPreview(param);
							setTimeout(function(){
								objCAM.capture(callbackFunc);
							},10000);
						});
						waitsFor(function(){
							return callbackTriggered;
						},"waiting for callback data", 22000);
						runs(function(){
							spec.addResult("status : ", callbackData.status);
							spec.addResult("message : ", callbackData.message);
							spec.addResult("imageHeight : ", callbackData.imageHeight);
							spec.addResult("imageWidth : ", callbackData.imageWidth);
							spec.addResult("imageFormat : ", callbackData.imageFormat);
							spec.addResult("imageUri : ", callbackData.imageUri);
							spec.displayResults();
							objCAM.hidePreview();
			                spec.waitForResponse();
						});
					});
					it("VT200-0588 | Should hide preview by using hidePreview | using " + camid + camtype , function(){
						var spec = new ManualSpec(jasmine, window.document);
			        	spec.addGoal(jasmine.getEnv().currentSpec.description);
			            spec.addStep("Press 'RunTest' button");
			            spec.addExpectation('Viewfinder should get hidden around 10secs.');
			            spec.displayScenario();
			            spec.waitForButtonPressing("Run test");
			            runs(function(){
							objCAM.showPreview();
							setTimeout(function(){
								objCAM.hidePreview();
							},10000);
						});
						runs(function(){
			                spec.waitForResponse();
						});
					});
				});
			};

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

				if (isWindowsMobilePlatform()){

					it("VT200-0591 | Should call takePicture with aimMode AIM_ON | using " + camid + camtype , function(){
						var spec = new ManualSpec(jasmine, window.document);
			        	spec.addGoal(jasmine.getEnv().currentSpec.description);
			            spec.addStep("Press 'RunTest' button");
			            spec.addStep("Capture any image.");
			            spec.addExpectation('Aiming should be ON. Reticle should be there. Image should be catured..');
			            spec.displayScenario();
			            spec.waitForButtonPressing("Run test");
			            var param = {
			            	'aimMode':Rho.Camera.AIM_ON
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
				};

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

				if(isApplePlatform()){
					it("VT200-0594 | Should call takePicture with enableEditing as false | using " + camid + camtype , function(){
						var spec = new ManualSpec(jasmine, window.document);
			        	spec.addGoal(jasmine.getEnv().currentSpec.description);
			            spec.addStep("Press 'RunTest' button");
			            spec.addStep("Capture any image.");
			            spec.addStep("check for photo capture image customizing.");
			            spec.addExpectation('It should not Enable post photo capture image customizing.');
			            spec.displayScenario();
			            spec.waitForButtonPressing("Run test");
			            var param = {
			            	'enableEditing':false
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
				};

				if (isAndroidPlatform() || isApplePlatform()) {
					it("VT200-0595 | Should call takePicture with colorModel as grayscale | using " + camid + camtype , function(){
						var spec = new ManualSpec(jasmine, window.document);
						spec.addGoal(jasmine.getEnv().currentSpec.description);
					    spec.addStep("Press 'RunTest' button");
					    spec.addStep("Check for the preview screen color and saved image.");
					    spec.addExpectation('The camera screen & saved image should be in grayscale (Black and White).');
					    spec.displayScenario();
					    spec.waitForButtonPressing("Run test");
					    var param = {
					    	'colorModel':'grayscale'
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
				};

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

				if(isWindowsMobilePlatform() || isAndroidPlatform()){

					it("VT200-0597 | Should capture image by calling takePicture() method with captureSound | using " + camid + camtype , function(){
						var spec = new ManualSpec(jasmine, window.document);
						spec.addGoal(jasmine.getEnv().currentSpec.description);
						spec.addStep("Press 'RunTest' button");
					    spec.addStep("Check for the returned status.");
					    spec.addExpectation('After successful capture, should play a mp3/wav file after capture.');
					    spec.displayScenario();
					    spec.waitForButtonPressing("Run test");
					    var param = {
					    	'outputFormat':'image', 
					    	'captureSound' : sound
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
				};

				if(isAndroidPlatform()){
					it("VT200-0598 | Should capture image by calling takePicture() method with useSystemViewfinder true | using " + camid + camtype , function(){
						var spec = new ManualSpec(jasmine, window.document);
						spec.addGoal(jasmine.getEnv().currentSpec.description);
						spec.addStep("Press 'RunTest' button");
					    spec.addStep("Check for the returned status.");
					    spec.addExpectation("Uses the system Camera application to take a picture instead of rhodes\' camera");
					    spec.displayScenario();
					    spec.waitForButtonPressing("Run test");
					    var param = {
					    	'outputFormat':'image', 
					    	'captureSound' : '', 
					    	'useSystemViewfinder' : true
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
				};

				if(isAndroidPlatform() || isApplePlatform()){

					it("VT200-0599 | Should capture image by calling takePicture() method with saveToDeviceGallery true | using " + camid + camtype , function(){
						var spec = new ManualSpec(jasmine, window.document);
						spec.addGoal(jasmine.getEnv().currentSpec.description);
						spec.addStep("Press 'RunTest' button");
					    spec.addStep("Check for the returned status.");
					    spec.addExpectation('Image captured should be added to the device gallery');
					    spec.displayScenario();
					    spec.waitForButtonPressing("Run test");
					    var param = {
					    	'outputFormat':'image', 
					    	'saveToDeviceGallery' : true
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
				};
			});

		})(enumData[j]);
	};
});