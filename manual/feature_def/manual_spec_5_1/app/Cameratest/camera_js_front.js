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
    var camerapath = Rho.Application.modelFolderPath("Cameratest");
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
			camArray += (i+1).toString() + ") Camera Type: " + enumData[i].cameraType +  "; ";
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
		document.getElementById('imageUri').src = '<img src="" id="imageUri"></img>';
	});

//	for (var j = 0; j<enumData.length; j++){
//		(function(objCAM){ 
			var objCAM = enumData[1];
		   	var camid = objCAM.ID;
		   	var camtype = objCAM.cameraType;
		   	if(isWindowsMobilePlatform()){
				describe("showPreview, Capture & hidePreview methods | using " + camid + camtype , function() {
					it("VT285-0022 | Should call showPreview & capture with default properties | using " + camid + camtype , function(){
						Rho.Camera.desiredHeight = 480;
						Rho.Camera.desiredWidth = 640;
						var spec = new ManualSpec(jasmine, window.document);
			        	spec.addGoal(jasmine.getEnv().currentSpec.description);
			        	spec.addPrecondition("Call showPreview() without any parameters.");
			        	spec.addPrecondition("Default preview properties from property bag, given below:")
			            spec.addPrecondition("Left : " + objCAM.previewLeft);
			            spec.addPrecondition("Top : " + objCAM.previewTop);
			            spec.addPrecondition("Width : " + objCAM.previewWidth);
			            spec.addPrecondition("Height : " + objCAM.previewHeight);
			            spec.addStep("Press 'RunTest' button");
			            spec.addStep("Capture will happen, then Check for the returned callback status & property set");
			            spec.addExpectation('Ensure that below conditions are achieved.');
			            spec.addExpectation('Flashmode:off');
			            spec.addExpectation('Aimmode:off');
			            spec.addExpectation('Callback - status : OK');
			            spec.addExpectation('Callback - imageHeight : '+ Rho.Camera.desiredHeight);
			            spec.addExpectation('Callback - imageWidth : ' + Rho.Camera.desiredWidth);
			            spec.addExpectation('Image file name should be : IMG_<timestamp>');
			            spec.addExpectation('ImageFormat should be : jpg.');
			            spec.displayScenario();
			            spec.waitForButtonPressing("Run test");
						runs(function(){
							objCAM.showPreview({});
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
					it("VT285-0023 | Should call showPreview with preview window values, compressionFormat & filename | using " + camid + camtype , function(){
						var spec = new ManualSpec(jasmine, window.document);
			        	spec.addGoal(jasmine.getEnv().currentSpec.description);
			        	spec.addPrecondition("Call showPreview() with properties previewLeft:10, previewTop:10, previewWidth:100, previewHeight:60, commpressionFormat:'jpg', fileName:'\\Application\\camImage', flashMode: off, aimMode:off.");
			            spec.addStep("Press 'RunTest' button");
			            spec.addStep("Note: Capture will be called automatically & hidePreview is called after the capture");
			            spec.addStep("Capture will happen, then check for the returned callback status & property set");
			            spec.addExpectation('Preview window should be as set(left:10, top:10, width:100 & height:60)');
			            spec.addExpectation('Capture callback should return with status:');
			            spec.addExpectation('Status:OK, imagePath, imageFormat:jpg & filename camImage.jpg.');
			            spec.displayScenario();
			            spec.waitForButtonPressing("Run test");
						var param = {
							'previewLeft':10,
							'previewTop':10,
							'previewWidth':100,
							'previewHeight':60,
							'commpressionFormat':'jpg',
							'fileName':'\\Application\\camImage',
							'flashMode': 'off',
							'aimMode':'off'
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
					it("VT285-0024 | Should call showPreview with preview window values, ouputFomat:dataUri & captureSound | using " + camid + camtype , function(){
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
					it("VT285-0025 | Should call showPreview with flash: on, aimmode:on (if imager), desiredHeight & desiredWidth set | using " + camid + camtype , function(){
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
					it("VT285-0026 | Should call showPreview & capture in landscape mode" + camid + camtype , function(){
						var spec = new ManualSpec(jasmine, window.document);
			        	spec.addGoal(jasmine.getEnv().currentSpec.description);
			        	spec.addPrecondition("Call capture(callback) method holding device in landscape mode");
			            spec.addStep("Press 'RunTest' button");
			            spec.addStep("Note: Capture will be called automatically after 6secs & hidePreview is called after the capture");
			            spec.addStep("Check for the returned status");
			            spec.addExpectation('The returned status should be OK, image should be displayed as dataUri in landscape mode.');
			            spec.displayScenario();
			            spec.waitForButtonPressing("Run test");
						var param = {
							'previewLeft':10,
							'previewTop':10,
							'previewWidth':100,
							'previewHeight':100,
							'desiredHeight':120,
							'desiredWidth':240,
							'outputFormat':'dataUri'
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
					it("VT285-0027 | Should call showPreview with all properties set & capture | using " + camid + camtype , function(){
						var spec = new ManualSpec(jasmine, window.document);
			        	spec.addGoal(jasmine.getEnv().currentSpec.description);
			        	spec.addPrecondition("Call showPreview() with properties previewLeft:10, previewTop:10, previewWidth:100, previewHeight:60, fileName:camImage123, desiredHeight:360, desiredWidth:480, compressionFormat:png, outputFormat:image, flashMode:off, aimMode:off, captureSound: <added in the app>.");
			            spec.addStep("Press 'RunTest' button");
			            spec.addStep("Note: Capture will be called automatically & hidePreview is called after the capture");
			            spec.addStep("Check for the returned callback status & property set");
			            spec.addExpectation('The viewfinder with properties set should reflect. Both flashMode & aimMode is off. Should play a wav file after capture. The returned status should be OK and captured imagePath should be with the name camImage123.jpg, imageHeight: 360, imageWidth:480 & imageFormat: jpg.');
			            spec.displayScenario();
			            spec.waitForButtonPressing("Run test");
			            var param = {
			            	'previewLeft':10,
							'previewTop':10,
							'previewWidth':100,
							'previewHeight':60,
							'fileName':'camImage123',
							'desiredHeight':360,
							'desiredWidth':480,
							'compressionFormat':'png',
							'outputFormat':'image',
							'flashMode':'off',
							'aimMode':'off',
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
					it("VT285-0028 | Should rotate the screen upsideDown after call showPreview | using " + camid + camtype , function(){
						var spec = new ManualSpec(jasmine, window.document);
			        	spec.addGoal(jasmine.getEnv().currentSpec.description);
			            spec.addStep("Press 'RunTest' button");
			            spec.addStep("NOTE: ScreenOrientation upsideDown will be called in the script. After pass/fail click, ScreenOrientation normal will be called.");
			            spec.addExpectation('The viewfinder should realign and there should not be any error.');
			            spec.displayScenario();
			            spec.waitForButtonPressing("Run test");
						var param = {
							'previewLeft':10, 
							'previewTop':10, 
							'previewWidth':100, 
							'previewHeight':60
						};
						runs(function(){
							objCAM.showPreview(param);
							setTimeout(function(){
								Rho.ScreenOrientation.upsideDown();
								setTimeout(function(){
									objCAM.capture(callbackFunc);
								},4000);
							},6000);
						});
						waitsFor(function(){
							return callbackTriggered;
						},"waiting for callback data", 20000);
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
			                Rho.ScreenOrientation.normal();
						});
					});
					it("VT285-0029 | Should hide preview by using hidePreview | using " + camid + camtype , function(){
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
					it("VT285-0030 | Should call showPreview and minimize | using " + camid + camtype , function(){
						var spec = new ManualSpec(jasmine, window.document);
			        	spec.addGoal(jasmine.getEnv().currentSpec.description);
			            spec.addStep("Press 'RunTest' button");
			            spec.addStep("Once the preview window appears, Minimize & restore the application (restore manually by clicking on the application)");
			            spec.addExpectation('Preview should retain successfully even after restore.');
			            spec.displayScenario();
			            spec.waitForButtonPressing("Run test");
			            runs(function(){
							objCAM.showPreview();
							setTimeout(function(){
								Rho.Application.minimize();
								setTimeout(function(){
									Rho.Application.restore();
									setTimeout(function(){
										objCAM.capture(callbackFunc);
									},4000);
								},4000);
							},6000);
						});
						waitsFor(function(){
							return callbackTriggered;
						},"waiting for callback data", 25000);
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
					it("VT285-0031 | Should call showPreview and suspend | using " + camid + camtype , function(){
						var spec = new ManualSpec(jasmine, window.document);
			        	spec.addGoal(jasmine.getEnv().currentSpec.description);
			            spec.addStep("Press 'RunTest' button");
			            spec.addStep("Once the preview window appears, Suspend & resume the device");
			            spec.addStep("Capture will be called after 15secs.");
			            spec.addExpectation('Preview should be there and application should not behave abnormally.');
			            spec.displayScenario();
			            spec.waitForButtonPressing("Run test");
			            runs(function(){
							objCAM.showPreview();
							setTimeout(function(){
								objCAM.capture(callbackFunc);
							},15000);
						});
						waitsFor(function(){
							return callbackTriggered;
						},"waiting for callback data", 25000);
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
				});
			};

			describe("takePicture method | using " + camid + camtype , function() {

				it("VT285-0033 | Should call takePicture | using " + camid + camtype , function(){
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
				it("VT285-0034 | Should call takePicture and returned status cancel | using " + camid + camtype , function(){
					var spec = new ManualSpec(jasmine, window.document);
		        	spec.addGoal(jasmine.getEnv().currentSpec.description);
		            spec.addStep("Press 'RunTest' button");
		            spec.addStep("Press Cancel from the camera screen.");
		            spec.addStep("Check for the returned status.");
		            spec.addExpectation('The returned status should be cancel.');
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
				it("VT285-0035 | Should call takePicture and invalid fileName path | using " + camid + camtype , function(){
					var spec = new ManualSpec(jasmine, window.document);
		        	spec.addGoal(jasmine.getEnv().currentSpec.description);
		            spec.addStep("Call takePicture({}, callback function) with fileName:'\\InvalidPath\\camimage'");
		            spec.addStep("Press 'RunTest' button");
		            spec.addStep("Check for the returned status");
		            spec.addExpectation('The returned status should be error with message as wrong file path.');
		            spec.displayScenario();
		            spec.waitForButtonPressing("Run test");
		            var param = {
		            	'fileName':"\\InvalidPath\\camimage"
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
				it("VT285-0036 | Should call takePicture and suspend the device | using " + camid + camtype , function(){
					var spec = new ManualSpec(jasmine, window.document);
		        	spec.addGoal(jasmine.getEnv().currentSpec.description);
		            spec.addStep("Press 'RunTest' button");
		            spec.addStep("Suspend the application once the fullscreen mode opens.");
		            spec.addExpectation('Preview should not disappear. No abnormal behaviour should be observed.');
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

				//After discussing on SR EMBPD00169387, decided as invalid usecase and removing the test case
				if(!isApplePlatform()){
					xit("VT285-0037 | Should rotate the screen rightHanded after calling takePicture() method. | using " + camid + camtype , function(){
						var spec = new ManualSpec(jasmine, window.document);
			        	spec.addGoal(jasmine.getEnv().currentSpec.description);
			            spec.addStep("Press 'RunTest' button");
			            spec.addStep("After 4secs of fullscreen takePicture, screen will rotate rightHanded(called internally in script), then click on capture");
			            spec.addStep("NOTE: ScreenOrientation will become normal once pass/fail is clicked");
			            spec.addExpectation('The viewfinder should realign and there should not be any error.');
			            spec.displayScenario();
			            spec.waitForButtonPressing("Run test");
						runs(function(){
							objCAM.takePicture({}, callbackFunc);
							setTimeout(function(){
								Rho.ScreenOrientation.rightHanded();
							},4000);
						});
						waitsFor(function(){
							return callbackTriggered;
						},"waiting for callback data", 15000);
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
						runs(function(){
							Rho.ScreenOrientation.normal();
						});
					});
				};

				it("VT285-0038 | Should call takePicture with flashMode FLASH_ON | using " + camid + camtype , function(){
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
				it("VT285-0039 | Should call takePicture with flashMode FLASH_OFF | using " + camid + camtype , function(){
					var spec = new ManualSpec(jasmine, window.document);
		        	spec.addGoal(jasmine.getEnv().currentSpec.description);
		            spec.addStep("Press 'RunTest' button");
		            spec.addStep("Capture any image in low illumination area");
		            spec.addExpectation('Flash should be off while taking the image.');
		            spec.displayScenario();
		            spec.waitForButtonPressing("Run test");
		            var param = {
		            	'flashMode':Rho.Camera.FLASH_OFF
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

				if (!isWindowsMobilePlatform()) {	
					it("VT285-0040 | Should call takePicture with flashMode FLASH_AUTO in dark area | using " + camid + camtype , function(){
						var spec = new ManualSpec(jasmine, window.document);
			        	spec.addGoal(jasmine.getEnv().currentSpec.description);
			            spec.addStep("Press 'RunTest' button");
			            spec.addStep("Capture any image in low illumination area");
			            spec.addExpectation('Flash should be on in low illumination area.');
			            spec.displayScenario();
			            spec.waitForButtonPressing("Run test");
						var param = {
							'flashMode':Rho.Camera.FLASH_AUTO
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
					it("VT285-0041 | Should call takePicture with flashMode FLASH_AUTO in bright area | using " + camid + camtype , function(){
						var spec = new ManualSpec(jasmine, window.document);
			        	spec.addGoal(jasmine.getEnv().currentSpec.description);
			            spec.addStep("Press 'RunTest' button");
			            spec.addStep("Capture any image in bright area");
			            spec.addExpectation('Flash should not be ON in bright area.');
			            spec.displayScenario();
			            spec.waitForButtonPressing("Run test");
						runs(function(){
							Rho.Camera.flashMode = "auto";
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
				};

				if(isAndroidPlatform() || isWindowsPhone8Platform()){
					it("VT285-0042 | Should call takePicture with flashMode FLASH_RED_EYE | using " + camid + camtype , function(){
						var spec = new ManualSpec(jasmine, window.document);
			        	spec.addGoal(jasmine.getEnv().currentSpec.description);
			            spec.addStep("Press 'RunTest' button");
			            spec.addStep("Capture any image in low illumination area");
			            spec.addExpectation('Flash should be on while taking picture. The saved picture should not contain the redeye in it.');
			            spec.displayScenario();
			            spec.waitForButtonPressing("Run test");
						var param = {
							'flashMode':Rho.Camera.FLASH_RED_EYE
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
			                Rho.Camera.flashMode = "off";
						});			
					});
				};

				if(isAndroidPlatform()){
					it("VT285-0043 | Should call takePicture with flashMode FLASH_TORCH | using " + camid + camtype , function(){
						var spec = new ManualSpec(jasmine, window.document);
			        	spec.addGoal(jasmine.getEnv().currentSpec.description);
			            spec.addStep("Press 'RunTest' button");
			            spec.addStep("Capture any image in low illumination area");
			            spec.addExpectation('Flash should be on while taking the image. The flash is turned on in torch mode.');
			            spec.displayScenario();
			            spec.waitForButtonPressing("Run test");
			            var param = {
			            	'flashMode':Rho.Camera.FLASH_TORCH
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
			                Rho.Camera.flashMode = "off";
						});
					});
				};

				if (isWindowsMobilePlatform()){

					it("VT285-0044 | Should call takePicture with aimMode AIM_ON | using " + camid + camtype , function(){
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
					it("VT285-0045 | Should call takePicture with aimMode AIM_OFF | using " + camid + camtype , function(){
						var spec = new ManualSpec(jasmine, window.document);
			        	spec.addGoal(jasmine.getEnv().currentSpec.description);
			            spec.addStep("Press 'RunTest' button");
			            spec.addStep("Capture any image.");
			            spec.addExpectation('There should not be any aiming. Reticle should not be seen.');
			            spec.displayScenario();
			            spec.waitForButtonPressing("Run test");
			            var param = {
			            	'aimMode':Rho.Camera.AIM_OFF
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

				it("VT285-0046 | Should call takePicture with outputFormat:dataUri  | using " + camid + camtype , function(){
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
				it("VT285-0047 | Should call takePicture with desiredHeight 480 and desiredWidth 640 | using " + camid + camtype , function(){
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
				it("VT285-0048 | Should call takePicture with desiredHeight 0 and desiredWidth 0 | using " + camid + camtype , function(){
					var spec = new ManualSpec(jasmine, window.document);
		        	spec.addGoal(jasmine.getEnv().currentSpec.description);
		            spec.addStep("Press 'RunTest' button");
		            spec.addStep("Capture any image. Check for the returned image height and width value. Open the saved image and check for height and width.");
		            spec.addExpectation('The returned image height and width should default or as previously set (bec 0x0 is not supported). No abnormal behaviour should be observed.');
		            spec.displayScenario();
		            spec.waitForButtonPressing("Run test");
		            var param = {
		            	'desiredHeight':0,
		            	'desiredWidth':0
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
				it("VT285-0049 | Should call takePicture with desiredWidth & desiredHeight more than max supported and Capture | using " + camid + camtype , function(){
					var spec = new ManualSpec(jasmine, window.document);
		        	spec.addGoal(jasmine.getEnv().currentSpec.description);
		            spec.addStep("Press 'RunTest' button");
		            spec.addStep("Capture any image.");
		            spec.addExpectation('Image should be captured successfully with max supported by that device.');
		            spec.displayScenario();
		            spec.waitForButtonPressing("Run test");
		            var param = {
		            	'desiredHeight':7600,
		            	'desiredWidth':6400
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
				it("VT285-0050 | Should call takePicture with propertyhash outputFormat:image with fileName and using anonymous callback | using " + camid + camtype , function(){
					var spec = new ManualSpec(jasmine, window.document);
		        	spec.addGoal(jasmine.getEnv().currentSpec.description);
		            spec.addStep("Press 'RunTest' button");
		            spec.addStep("Capture any image.");
		            spec.addStep("Check for the returned URI to the taken image stored on the device.");
		            spec.addExpectation('The image should get stored at device default location and name of the image should be as set, cameraImage123. The callback data should have image of the stored image.');
		            spec.displayScenario();
		            spec.waitForButtonPressing("Run test");
		            var param = {
		            	'outputFormat':'image',
		            	'fileName':'cameraImage123'
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
					it("VT285-0051 | Should call takePicture with enableEditing as false | using " + camid + camtype , function(){
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
					it("VT285-0052 | Should call takePicture with enableEditing as true | using " + camid + camtype , function(){
						var spec = new ManualSpec(jasmine, window.document);
			        	spec.addGoal(jasmine.getEnv().currentSpec.description);
			            spec.addStep("Press 'RunTest' button");
			            spec.addStep("Capture any image.");
			            spec.addStep("check for photo capture image customizing.");
			            spec.addExpectation('It should enable post photo capture image customizing by default.');
			            spec.displayScenario();
			            spec.waitForButtonPressing("Run test");
			            var param = {
			            	'enableEditing':true
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

				it("VT285-0053 | Should call takePicture with previewHeight, previewLeft, previewTop, previewWidth and callback | using " + camid + camtype , function(){
					var spec = new ManualSpec(jasmine, window.document);
		        	spec.addGoal(jasmine.getEnv().currentSpec.description);
		        	spec.addPrecondition("takePicture set with previewHeight as 120, previewLeft 200,previewTop as 60, previewWidth as 160");
		            spec.addStep("Press 'RunTest' button");
		            spec.addStep("Check for the viewfinder position.");
		            spec.addExpectation('The viewfinder positions should be full screen and Image should be captured successfully.');
		            spec.displayScenario();
		            spec.waitForButtonPressing("Run test");
		            var param = {
		            	'previewHeight':120,
		            	'previewWidth':160,
		            	'previewLeft':200,
		            	'previewTop':60
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

				if (isAndroidPlatform() || isApplePlatform()) {

					it("VT285-0054 | Should call takePicture with colorModel as rgb | using " + camid + camtype , function(){
						var spec = new ManualSpec(jasmine, window.document);
						spec.addGoal(jasmine.getEnv().currentSpec.description);
					    spec.addStep("Press 'RunTest' button");
					    spec.addStep("Check for the preview screen color and saved image.");
					    spec.addExpectation('The camera screen & saved image should be in color mode.');
					    spec.displayScenario();
					    spec.waitForButtonPressing("Run test");
					    var param = {
					    	'colorModel':'rgb'
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
					it("VT285-0055 | Should call takePicture with colorModel as grayscale | using " + camid + camtype , function(){
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

				it("VT285-0056 | Should capture image by calling takePicture() method with compressionFormat jpg. | using " + camid + camtype , function(){
					var spec = new ManualSpec(jasmine, window.document);
					spec.addGoal(jasmine.getEnv().currentSpec.description);
				    spec.addStep("Press 'RunTest' button");
				    spec.addStep("Capture the image");
				    spec.addExpectation('The imageFormat returned should be .jpg');
				    spec.displayScenario();
				    spec.waitForButtonPressing("Run test");
				    var param = {
				    	'compressionFormat':'jpg'
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
				it("VT285-0057 | Should capture image by calling takePicture() method with compressionFormat png. | using " + camid + camtype , function(){
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
				it("VT285-0058 | Should capture image by calling takePicture() method in portrait mode. | using " + camid + camtype , function(){
					var spec = new ManualSpec(jasmine, window.document);
					spec.addGoal(jasmine.getEnv().currentSpec.description);
					spec.addStep("Keep the device in portrait mode");
				    spec.addStep("Press 'RunTest' button");
				    spec.addStep("Capture the image");
				    spec.addExpectation('The preview should be in Full Screen.');
				    spec.addExpectation('The image captured should be displayed as dataUri in the portrait mode.');
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
				it("VT285-0059 | Should capture image by calling takePicture() method in landscape mode. | using " + camid + camtype , function(){
					var spec = new ManualSpec(jasmine, window.document);
					spec.addGoal(jasmine.getEnv().currentSpec.description);
					spec.addStep("Keep the device in landscape mode.");
				    spec.addStep("Press 'RunTest' button");
				    spec.addStep("Capture the image");
				    spec.addExpectation('The preview should be in Full Screen.');
				    spec.addExpectation('The image captured should be displayed as dataUri in the landscape mode.');
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

				if(isWindowsMobilePlatform() || isAndroidPlatform()){

					it("VT285-0060 | Should capture image by calling takePicture() method with captureSound | using " + camid + camtype , function(){
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
					it("VT285-0061 | Should capture image by calling takePicture() method with useSystemViewfinder false | using " + camid + camtype , function(){
						var spec = new ManualSpec(jasmine, window.document);
						spec.addGoal(jasmine.getEnv().currentSpec.description);
						spec.addStep("Press 'RunTest' button");
					    spec.addStep("Check for the returned status.");
					    spec.addExpectation('Uses the rhodes Camera to take a picture.');
					    spec.displayScenario();
					    spec.waitForButtonPressing("Run test");
					    var param = {
					    	'outputFormat':'image', 
					    	'captureSound' : '', 
					    	'useSystemViewfinder' : false
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
					it("VT285-0062 | Should capture image by calling takePicture() method with useSystemViewfinder true | using " + camid + camtype , function(){
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

					it("VT285-0063 | Should capture image by calling takePicture() method with saveToDeviceGallery false | using " + camid + camtype , function(){
						var spec = new ManualSpec(jasmine, window.document);
						spec.addGoal(jasmine.getEnv().currentSpec.description);
						spec.addStep("Press 'RunTest' button");
					    spec.addStep("Check for the returned status.");
					    spec.addExpectation('Image captured should not be added to the device gallery');
					    spec.displayScenario();
					    spec.waitForButtonPressing("Run test");
					    var param = {
					    	'outputFormat':'image', 
					    	'saveToDeviceGallery' : false
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
					it("VT285-0064 | Should capture image by calling takePicture() method with saveToDeviceGallery true | using " + camid + camtype , function(){
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

				it("VT285-0067 | Should call takePicture and quit the application | using " + camid + camtype , function(){
					var spec = new ManualSpec(jasmine, window.document);
		        	spec.addGoal(jasmine.getEnv().currentSpec.description);
		            spec.addStep("Press 'RunTest' button");
		            spec.addExpectation('Camera screen should be shown to the user and after 5 secs application should get quit without any crash.');
		            spec.displayScenario();
		            spec.waitForButtonPressing("Run test");
		            runs(function(){
						objCAM.takePicture({}, callbackFunc);
						setTimeout(function(){
							Rho.Application.quit();
						}, 5000);
						spec.waitForResponse();
					});
				});
			});

			if(isWindowsMobilePlatform()){
				describe("Miscellaneous Tests " , function() {
					it("VT285-0065 | Should try to enable fullscreen after preview window | using "  + camid + camtype , function(){
						var spec = new ManualSpec(jasmine, window.document);
			        	spec.addGoal(jasmine.getEnv().currentSpec.description);
			        	spec.addPrecondition("Call showPreview() without any properties.");
			            spec.addStep("Press 'RunTest' button");
			            spec.addStep("Capture will happen, then check for the returned callback status");
			            spec.addExpectation('Preview window should remain and fullscreen window should not come up.');
			            spec.addExpectation('Callback data for imageUri should have saved image name as \'showpreviewImage\'.');
			            spec.displayScenario();
			            spec.waitForButtonPressing("Run test");
			            var response = false;
						runs(function(){
							objCAM.showPreview({'fileName':'showpreviewImage'});
							setTimeout(function(){
								objCAM.takePicture({'fileName':'takepictureImage'}, callbackFunc);
							},6000);
							setTimeout(function(){
								response = true;
							},15000);							
						});
						waitsFor(function(){
							return callbackTriggered || response;
						},"waiting for callback data", 25000);
						runs(function(){
							objCAM.hidePreview();
							if(callbackTriggered == true){
								spec.addResult("status : ", callbackData.status);
								spec.addResult("message : ", callbackData.message);
								spec.addResult("imageHeight : ", callbackData.imageHeight);
								spec.addResult("imageWidth : ", callbackData.imageWidth);
								spec.addResult("imageFormat : ", callbackData.imageFormat);
								spec.addResult("imageUri : ", callbackData.imageUri);
							}else{
								spec.addResult("takePicture method not triggered", "Hence test case is a pass !");
							}
							spec.displayResults();
			                spec.waitForResponse();
						});
					});
					it("VT285-0066 | Persistance test for showpreview & capture | using "  + camid + camtype , function(){
						var spec = new ManualSpec(jasmine, window.document);
			        	spec.addGoal(jasmine.getEnv().currentSpec.description);
			        	spec.addPrecondition(" Call showPreview() with properties previewLeft: 50, previewTop:50, previewHeight: 80, previewWidth: 40, fileName: '\\Application\\persistCapture', flashMode: on & aimMode: ON.");
			            spec.addStep("Press 'RunTest' button");
			            spec.addStep("Run test should open preview window and navigate to another page.");
			            spec.addStep("capture should be called in another page.")
			            spec.addExpectation('Preview window properties should persist and the capture call would enable flash for color camera (if available) or aim will be ON in case of imager. Captured image should be persistCapture.jpg in Application folder.');
			            spec.displayScenario();
			            spec.waitForButtonPressing("Run test");
			            var param = {
		            		'previewLeft': 50,
							'previewTop':50,
							'previewHeight': 80,
							'previewWidth': 40,
							'fileName': '\\Application\\persistCapture',
							'flashMode': 'on',
							'aimMode': 'on'
						};
						runs(function(){
							objCAM.showPreview(param);
							setTimeout(function(){
								window.location.href="./cameraPersistPage.html?"+camtype;
							},6000);
							spec.waitForResponse();
						});
					});
					it("VT285-0032 | Should call showPreview and quit the application | using " + camid + camtype , function(){
						var spec = new ManualSpec(jasmine, window.document);
			        	spec.addGoal(jasmine.getEnv().currentSpec.description);
			            spec.addStep("Press 'RunTest' button");
			            spec.addExpectation('Show preivew is shown to user and after 5 secs application should quit successfully.');
			            spec.displayScenario();
			            spec.waitForButtonPressing("Run test");
			            runs(function(){
							objCAM.showPreview();
							setTimeout(function(){
								Rho.Application.quit();
							},5000);
							spec.waitForResponse();
						});
					});
				});
			};
//		})(enumData[j]);
//	};
});