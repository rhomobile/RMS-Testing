describe("Camera API Manual Tests", function(){

	var enumData = Rho.Camera.enumerate();
	var callbackData = "";
	var cbkResponseTimeout = false;
	var camArray = null;
	var imageUriData = null;
	
	var callbackFunc = function(cbData){

		callbackData = "status : " + cbData.status;
		callbackData += "\nmessage : " + cbData.message;
		callbackData += "\nimageHeight : " + cbData.imageHeight;
		callbackData += "\nimageWidth : " + cbData.imageWidth;
		callbackData += "\nimageFormat : " + cbData.imageFormat;
		callbackData += "\nimageUri : " + cbData.imageUri;

		imageUriData = cbData.imageUri;
		cbkResponseTimeout = true;
	}

	var getCallbackData = function(camArr){
		camArray = camArr;
		cbkResponseTimeout = true;
	}

	beforeEach(function(){
		callbackData = "";
		imageUriData = null;
		document.getElementById('imageUri').src = '';
		cbkResponseTimeout = false;
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

		it("Should call choosePicture with callback as anonymous function and check for returned compressionFormat", function(){
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

				if(isAndroidPlatform())
					data.compressionFormat = 'png';
				else
					data.compressionFormat = 'jpg';


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

		xit("Should call choosePicture with 'compressionFormat' property value as png", function(){
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
				Rho.Camera.enumerate(getCallbackData);
			});

			waitsFor(function(){
				return cbkResponseTimeout;
			},"waiting for callback data", 2000);

			runs(function(){
				spec.addResult(JSON.stringify(camArray));
				spec.displayResults();
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
					Rho.Camera.getCameraByType({'cameraType':'Main'}, getCallbackData);
				});

				waitsFor(function(){
					return cbkResponseTimeout;
				},"waiting for callback data", 10000);

				runs(function(){
					cbkResponseTimeout = false;
					if(getCallbackData == 'main'){
						Rho.Camera.takepicture({},callbackFunc);
					}
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

			it("Should call getCameraByType with front and without callback function ", function(){
				var spec = new ManualSpec(jasmine, window.document);
	        	spec.addGoal(jasmine.getEnv().currentSpec.description);
	            spec.addStep("Press 'RunTest' button");
	            spec.addStep("If return value is Front camera call takepicture using return value");
	            spec.addExpectation('The return values should be main camera object and the main camera should open to take picture.');
	            spec.displayScenario();
	            spec.waitForButtonPressing("Run test");

	            runs(function(){
					Rho.Camera.getCameraByType({'cameraType':'Front'});
				});

				waitsFor(function(){
					return cbkResponseTimeout;
				},"waiting for callback data", 10000);

				runs(function(){
					cbkResponseTimeout = false;
					if(getCallbackData == 'front'){
						Rho.Camera.takepicture({},callbackFunc);
					}
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

			it("Should list supported resolution using showSupportedList " , function(){
				var spec = new ManualSpec(jasmine, window.document);
	        	spec.addGoal(jasmine.getEnv().currentSpec.description);
	            spec.addStep("Press 'RunTest' button");
	            spec.addStep("Check for the return value");
	            spec.addExpectation('The return values should be an array of width and height which are supported by the device.');
	            spec.displayScenario();
	            spec.waitForButtonPressing("Run test");

	            var supportedList = "";

	            runs(function(){
					supportedList = Rho.Camera.showSupportedList();
					spec.addResult(supportedList.toString());
					spec.displayResults();
	                spec.waitForResponse();
				});

			});
		});
	
	};


	for (var j = 0; j<enumData.length; j++){

		(function(objCAM){ 

		   	var camid = objCAM.getProperty('ID');
		   	var camtype = objCAM.getProperty('cameraType');

		   	if(isWindowsMobilePlatform()){

				describe("showPreview, Capture & hidePreview methods | " + camid + camtype , function() {

					it("Should call showPreview with properties & capture - Set 1 |" + camid + camtype , function(){
						var spec = new ManualSpec(jasmine, window.document);
			        	spec.addGoal(jasmine.getEnv().currentSpec.description);
			        	spec.addPrecondition("Call showPreview with propertyhash as fileName:\\Application\\camImage, desiredHeight:480, desiredWidth:640, compressionFormat:png, outputFormat:imageUri, flashMode:ON, previewLeft:80, previewTop:10, previewWidth:100, previewHeight:60, captureSound:'alarm5.wav', aimMode:on and callback.");
			            spec.addStep("Press 'RunTest' button");
			            spec.addStep("Check for the returned callback status & property set");
			            spec.addExpectation('The viewfinder with properties set should reflect. The returned status should be OK and captured image should be displayed as imageUri with all callback properties and play a sound on capture. Also flashMode should be ON for color camera & aimMode ON for imager camera.');
			            spec.displayScenario();
			            spec.waitForButtonPressing("Run test");

						runs(function(){
							objCAM.showPreview({'fileName':'\\Application\\camImage', 'captureSound':'alarm5.wav',
								'compressionFormat':'png', 'outputFormat':'dataUri', 'flashMode':'on', 'aimMode':'on', 
								'desiredHeight':720, 'desiredWidth':1080, 'previewLeft':80, 'previewTop':10, 'previewWidth':100, 'previewHeight':60
							}, callbackFunc);

							waitsFor(function(){
								objCAM.capture();
							},"waiting 2secs for capture", 2000);
						});

						waitsFor(function(){
							return cbkResponseTimeout;
						},"waiting for callback data", 10000);

						runs(function(){
							spec.addResult(callbackData);
							document.getElementById('imageUri').src = imageUriData;
							spec.displayResults();
			                spec.waitForResponse();
						});

					});

					it("Should call showPreview with properties & capture - Set 2 |" + camid + camtype , function(){
						var spec = new ManualSpec(jasmine, window.document);
			        	spec.addGoal(jasmine.getEnv().currentSpec.description);
			        	spec.addPrecondition("Call showPreview with propertyhash as fileName:camImage123, desiredHeight:360, desiredWidth:480, compressionFormat:jpg, outputFormat:image, flashMode:off, previewLeft:80, previewTop:10, previewWidth:40, previewHeight:120, aimMode:off, captureSound:'' and callback.");
			            spec.addStep("Press 'RunTest' button");
			            spec.addStep("Check for the returned callback status & property set");
			            spec.addExpectation('The viewfinder with properties set should reflect. The returned status should be OK and captured image should be displayed with all callback properties. Also flashMode should be OFF for color camera & aimMode OFF for imager camera. Should not be any sound played after capture.');
			            spec.displayScenario();
			            spec.waitForButtonPressing("Run test");

						runs(function(){
							objCAM.showPreview({'fileName':'camImage123', 'compressionFormat':'jpg', 'outputFormat':'image', 
								'flashMode':'off', 'aimMode':'off', 'captureSound':'', 'desiredHeight':360, 'desiredWidth':480,
								'previewLeft':80, 'previewTop':10, 'previewWidth':40, 'previewHeight':120
							}, callbackFunc);

							waitsFor(function(){
								objCAM.capture();
							},"waiting 2secs for capture", 2000);
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

					it("Should rotate the screen rightHanded after call showPreview | " + camid + camtype , function(){
						var spec = new ManualSpec(jasmine, window.document);
			        	spec.addGoal(jasmine.getEnv().currentSpec.description);
			            spec.addStep("Press 'RunTest' button");
			            spec.addExpectation('The viewfinder should realign and there should not be any error.');
			            spec.displayScenario();
			            spec.waitForButtonPressing("Run test");

						runs(function(){
							objCAM.showPreview({}, callbackFunc);
							Rho.ScreenOrientation.rightHanded();
						});

						waitsFor(function(){
							return cbkResponseTimeout;
						},"waiting for callback data", 10000);

						runs(function(){
							spec.addResult(callbackData);
							spec.displayResults();
			                spec.waitForResponse();
						});

						runs(function(){
							Rho.ScreenOrientation.normal();
						});

					});

					it("Should hide preview by using hidePreview | " + camid + camtype , function(){
						var spec = new ManualSpec(jasmine, window.document);
			        	spec.addGoal(jasmine.getEnv().currentSpec.description);
			            spec.addStep("Press 'RunTest' button");
			            spec.addExpectation('Viewfinder should get hidden.');
			            spec.displayScenario();
			            spec.waitForButtonPressing("Run test");

			            runs(function(){
							objCAM.showPreview({}, callbackFunc);
						});

						waitsFor(function(){
							return cbkResponseTimeout;
						},"waiting for callback data", 10000);

						runs(function(){
							objCAM.hidePreview();
			                spec.waitForResponse();
						});
					});

					it("Should call showPreview and minimize | " + camid + camtype , function(){
						var spec = new ManualSpec(jasmine, window.document);
			        	spec.addGoal(jasmine.getEnv().currentSpec.description);
			            spec.addStep("Press 'RunTest' button");
			            spec.addStep("Once the preview window appears, Minimize & restore the application");
			            spec.addExpectation('Should display error with error message in callback.');
			            spec.displayScenario();
			            spec.waitForButtonPressing("Run test");

			            runs(function(){
							objCAM.showPreview({}, callbackFunc);
						});

						waitsFor(function(){
							return cbkResponseTimeout;
						},"waiting for callback data", 10000);

						runs(function(){
							spec.addResult(callbackData);
							spec.displayResults();
			                spec.waitForResponse();
						});

						runs(function(){
							objCAM.hidePreview();
						});
					});

					it("Should call showPreview and suspend | " + camid + camtype , function(){
						var spec = new ManualSpec(jasmine, window.document);
			        	spec.addGoal(jasmine.getEnv().currentSpec.description);
			            spec.addStep("Press 'RunTest' button");
			            spec.addStep("Once the preview window appears, Suspend & resume the device");
			            spec.addExpectation('Should display error with error message in callback.');
			            spec.displayScenario();
			            spec.waitForButtonPressing("Run test");

			            runs(function(){
							objCAM.showPreview({}, callbackFunc);
						});

						waitsFor(function(){
							return cbkResponseTimeout;
						},"waiting for callback data", 10000);

						runs(function(){
							spec.addResult(callbackData);
							spec.displayResults();
			                spec.waitForResponse();
						});

						runs(function(){
							objCAM.hidePreview();
						});
					});

					it("Should call showPreview and quit the application | " + camid + camtype , function(){
						var spec = new ManualSpec(jasmine, window.document);
			        	spec.addGoal(jasmine.getEnv().currentSpec.description);
			            spec.addStep("Press 'RunTest' button");
			            spec.addStep("Once the preview window appears, Quit the application");
			            spec.addExpectation('Should not crash the application or any other abnormal behaviour.');
			            spec.displayScenario();
			            spec.waitForButtonPressing("Run test");

			            runs(function(){
							objCAM.showPreview({}, callbackFunc);
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

			};


			describe("takePicture method | " + camid + camtype , function() {

				it("Should call takePicture and take image | " + camid + camtype , function(){
					var spec = new ManualSpec(jasmine, window.document);
		        	spec.addGoal(jasmine.getEnv().currentSpec.description);
		            spec.addStep("Press 'RunTest' button");
		            spec.addStep("Capture the image & Check for the returned status.");
		            spec.addExpectation('The preview should be in Full Screen. Default parameters values should be returned.');
		            spec.displayScenario();
		            spec.waitForButtonPressing("Run test");

		            runs(function(){
						objCAM.takePicture({}, callbackFunc);
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

				it("Should call takePicture and returned status cancel | " + camid + camtype , function(){
					var spec = new ManualSpec(jasmine, window.document);
		        	spec.addGoal(jasmine.getEnv().currentSpec.description);
		            spec.addStep("Press 'RunTest' button");
		            spec.addStep("Cancel the taking of image & Check for the returned status.");
		            spec.addExpectation('The returned status should be cancel.');
		            spec.displayScenario();
		            spec.waitForButtonPressing("Run test");

		            runs(function(){
						objCAM.takePicture({}, callbackFunc);
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

				it("Should call takePicture and minimize the application | " + camid + camtype , function(){
					var spec = new ManualSpec(jasmine, window.document);
		        	spec.addGoal(jasmine.getEnv().currentSpec.description);
		            spec.addStep("Press 'RunTest' button");
		            spec.addStep("Minimize the application once the fullscreen mode opens.");
		            spec.addExpectation('Preview should not disappear. No abnormal behaviour should be observed.');
		            spec.displayScenario();
		            spec.waitForButtonPressing("Run test");

		            runs(function(){
						objCAM.takePicture({}, callbackFunc);
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

				it("Should call takePicture and quit the application | " + camid + camtype , function(){
					var spec = new ManualSpec(jasmine, window.document);
		        	spec.addGoal(jasmine.getEnv().currentSpec.description);
		            spec.addStep("Press 'RunTest' button");
		            spec.addStep("Quit the appliation once the fullscreen mode opens.");
		            spec.addExpectation('There should not be any odd behaviour observed.');
		            spec.displayScenario();
		            spec.waitForButtonPressing("Run test");

		            runs(function(){
						objCAM.takePicture({}, callbackFunc);
					});
				});

				it("Should call takePicture and suspend the device | " + camid + camtype , function(){
					var spec = new ManualSpec(jasmine, window.document);
		        	spec.addGoal(jasmine.getEnv().currentSpec.description);
		            spec.addStep("Press 'RunTest' button");
		            spec.addStep("Minimize the application once the fullscreen mode opens.");
		            spec.addExpectation('Preview should not disappear. No abnormal behaviour should be observed.');
		            spec.displayScenario();
		            spec.waitForButtonPressing("Run test");

		            runs(function(){
						objCAM.takePicture({}, callbackFunc);
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

				it("Should rotate the screen after screen rightHanded calling takePicture() method. | " + camid + camtype , function(){
					var spec = new ManualSpec(jasmine, window.document);
		        	spec.addGoal(jasmine.getEnv().currentSpec.description);
		            spec.addStep("Press 'RunTest' button");
		            spec.addStep("NOTE: ScreenOrientation will become normal once pass/fail is clicked");
		            spec.addExpectation('The viewfinder should realign and there should not be any error.');
		            spec.displayScenario();
		            spec.waitForButtonPressing("Run test");

					runs(function(){
						objCAM.takePicture({}, callbackFunc);
						Rho.ScreenOrientation.leftHanded();
					});

					waitsFor(function(){
						return cbkResponseTimeout;
					},"waiting for callback data", 10000);

					runs(function(){
						spec.addResult(callbackData);
						spec.displayResults();
		                spec.waitForResponse();
					});

					runs(function(){
						Rho.ScreenOrientation.normal();
					});

				});

				it("Should call takePicture with flashMode FLASH_ON | " + camid + camtype , function(){
					var spec = new ManualSpec(jasmine, window.document);
		        	spec.addGoal(jasmine.getEnv().currentSpec.description);
		            spec.addStep("Press 'RunTest' button");
		            spec.addStep("Capture any image in low illumination area");
		            spec.addExpectation('Flash should be on while taking the image.');
		            spec.displayScenario();
		            spec.waitForButtonPressing("Run test");

					runs(function(){
						objCAM.flashMode.FLASH_ON;
						objCAM.takePicture({}, callbackFunc);
					});

					waitsFor(function(){
						return cbkResponseTimeout;
					},"waiting for callback data", 10000);

					runs(function(){
						spec.addResult(callbackData);
						spec.displayResults();
		                spec.waitForResponse();
					});

					runs(function(){
						objCAM.flashMode.FLASH_OFF
					});	
				});

				it("Should call takePicture with flashMode FLASH_OFF | " + camid + camtype , function(){
					var spec = new ManualSpec(jasmine, window.document);
		        	spec.addGoal(jasmine.getEnv().currentSpec.description);
		            spec.addStep("Press 'RunTest' button");
		            spec.addStep("Capture any image in low illumination area");
		            spec.addExpectation('Flash should be off while taking the image.');
		            spec.displayScenario();
		            spec.waitForButtonPressing("Run test");

					runs(function(){
						objCAM.takePicture({'flashMode':'off'}, callbackFunc);
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

				if (isAndroidPlatform()) {	

					it("Should call takePicture with flashMode FLASH_AUTO in dark area | " + camid + camtype , function(){
						var spec = new ManualSpec(jasmine, window.document);
			        	spec.addGoal(jasmine.getEnv().currentSpec.description);
			            spec.addStep("Press 'RunTest' button");
			            spec.addStep("Capture any image in low illumination area");
			            spec.addExpectation('Flash should be on in low illumination area.');
			            spec.displayScenario();
			            spec.waitForButtonPressing("Run test");

						runs(function(){
							objCAM.flashMode.FLASH_AUTO;
							objCAM.takePicture({}, callbackFunc);
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

					it("Should call takePicture with flashMode FLASH_AUTO in bright area | " + camid + camtype , function(){
						var spec = new ManualSpec(jasmine, window.document);
			        	spec.addGoal(jasmine.getEnv().currentSpec.description);
			            spec.addStep("Press 'RunTest' button");
			            spec.addStep("Capture any image in bright area");
			            spec.addExpectation('Flash should not be on in bright area.');
			            spec.displayScenario();
			            spec.waitForButtonPressing("Run test");

						runs(function(){
							objCAM.flashMode = "auto";
							objCAM.takePicture({}, callbackFunc);
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

					it("Should call takePicture with flashMode FLASH_RED_EYE | " + camid + camtype , function(){
						var spec = new ManualSpec(jasmine, window.document);
			        	spec.addGoal(jasmine.getEnv().currentSpec.description);
			            spec.addStep("Press 'RunTest' button");
			            spec.addStep("Capture any image in low illumination area");
			            spec.addExpectation('Flash should be on while taking picture. The saved picture should not contain the redeye in it.');
			            spec.displayScenario();
			            spec.waitForButtonPressing("Run test");

						runs(function(){
							objCAM.takePicture({'flashMode':'redEye'}, callbackFunc);
						});

						waitsFor(function(){
							return cbkResponseTimeout;
						},"waiting for callback data", 10000);

						runs(function(){
							spec.addResult(callbackData);
							spec.displayResults();
			                spec.waitForResponse();
						});

						runs(function(){
							objCAM.flashMode.FLASH_AUTO
						});				
					});

					it("Should call takePicture with flashMode FLASH_TORCH | " + camid + camtype , function(){
						var spec = new ManualSpec(jasmine, window.document);
			        	spec.addGoal(jasmine.getEnv().currentSpec.description);
			            spec.addStep("Press 'RunTest' button");
			            spec.addStep("Capture any image in low illumination area");
			            spec.addExpectation('Flash should be on while taking the image. The flash is turned on in torch mode.');
			            spec.displayScenario();
			            spec.waitForButtonPressing("Run test");

						runs(function(){
							objCAM.takePicture({'flashMode':'torch'}, callbackFunc);
						});

						waitsFor(function(){
							return cbkResponseTimeout;
						},"waiting for callback data", 10000);

						runs(function(){
							spec.addResult(callbackData);
							spec.displayResults();
			                spec.waitForResponse();
						});

						runs(function(){
							objCAM.flashMode.FLASH_AUTO
						});
					});

				};

				if (isWindowsMobilePlatform()){

					it("Should call takePicture with aimMode AIM_ON | " + camid + camtype , function(){
						var spec = new ManualSpec(jasmine, window.document);
			        	spec.addGoal(jasmine.getEnv().currentSpec.description);
			            spec.addStep("Press 'RunTest' button");
			            spec.addStep("Capture any image.");
			            spec.addExpectation('Aiming should be ON. Reticle should be there. Image should be catured..');
			            spec.displayScenario();
			            spec.waitForButtonPressing("Run test");

						runs(function(){
							objCAM.takePicture({'aimMode':'on'}, callbackFunc);
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

					it("Should call takePicture with aimMode AIM_OFF | " + camid + camtype , function(){
						var spec = new ManualSpec(jasmine, window.document);
			        	spec.addGoal(jasmine.getEnv().currentSpec.description);
			            spec.addStep("Press 'RunTest' button");
			            spec.addStep("Capture any image.");
			            spec.addExpectation('There should not be any aiming. Reticle should not be seen.');
			            spec.displayScenario();
			            spec.waitForButtonPressing("Run test");

						runs(function(){
							objCAM.aimMode.AIM_OFF;
							objCAM.takePicture({}, callbackFunc);
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

				};

				it("Should call takePicture with outputFormat:dataUri  | " + camid + camtype , function(){
					var spec = new ManualSpec(jasmine, window.document);
		        	spec.addGoal(jasmine.getEnv().currentSpec.description);
		            spec.addStep("Press 'RunTest' button");
		            spec.addStep("Capture any image.");
		            spec.addExpectation('Image should be displayed as imageUri.');
		            spec.displayScenario();
		            spec.waitForButtonPressing("Run test");

					runs(function(){
						objCAM.takePicture({'outputFormat':'dataUri'}, callbackFunc);
					});

					waitsFor(function(){
						return cbkResponseTimeout;
					},"waiting for callback data", 10000);

					runs(function(){
						spec.addResult(callbackData);
						document.getElementById('imageUri').src = imageUriData;
						spec.displayResults();
		                spec.waitForResponse();
					});
				});

				it("Should call takePicture with desiredHeight 480 and desiredWidth 640 | " + camid + camtype , function(){
					var spec = new ManualSpec(jasmine, window.document);
		        	spec.addGoal(jasmine.getEnv().currentSpec.description);
		            spec.addStep("Press 'RunTest' button");
		            spec.addStep("Capture any image. Check for the returned image height and width value. Open the saved image and check for height and width.");
		            spec.addExpectation('The returned image height and width should be same as the saved image which are 640 and 480');
		            spec.displayScenario();
		            spec.waitForButtonPressing("Run test");

					runs(function(){
						objCAM.takePicture({'desiredHeight':480,'desiredWidth':640}, callbackFunc);
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

				it("Should call takePicture with desiredHeight 0 and desiredWidth 0 | " + camid + camtype , function(){
					var spec = new ManualSpec(jasmine, window.document);
		        	spec.addGoal(jasmine.getEnv().currentSpec.description);
		            spec.addStep("Press 'RunTest' button");
		            spec.addStep("Capture any image. Check for the returned image height and width value. Open the saved image and check for height and width.");
		            spec.addExpectation('The returned image height and width should default or previously set as 0x0 is not supported. No abnormal behaviour should be observed.');
		            spec.displayScenario();
		            spec.waitForButtonPressing("Run test");

					runs(function(){
						objCAM.takePicture({'desiredHeight':0,'desiredWidth':0}, callbackFunc);
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

				it("Should call takePicture with desiredWidth & desiredHeight more than max supported and Capture | " + camid + camtype , function(){
					var spec = new ManualSpec(jasmine, window.document);
		        	spec.addGoal(jasmine.getEnv().currentSpec.description);
		            spec.addStep("Press 'RunTest' button");
		            spec.addStep("Capture any image.");
		            spec.addExpectation('Image should be captured successfully with max supported by that device to the set which is supported.');
		            spec.displayScenario();
		            spec.waitForButtonPressing("Run test");

					runs(function(){
						objCAM.takePicture({'desiredHeight':7600,'desiredWidth':6400}, callbackFunc);
					});

					waitsFor(function(){
						return cbkResponseTimeout;
					},"waiting for callback data", 10000);

					runs(function(){
						spec.addResult(callbackData);
						spec.displayResults();
		                spec.waitForResponse();
					});	
					runs(function(){
						objCAM.desiredHeight(480);
						objCAM.desiredWidth(640);
					});
				});

				it("Should call takePicture with propertyhash outputFormat:image with fileName and using anonymous callback | " + camid + camtype , function(){
					var spec = new ManualSpec(jasmine, window.document);
		        	spec.addGoal(jasmine.getEnv().currentSpec.description);
		            spec.addStep("Press 'RunTest' button");
		            spec.addStep("Capture any image.");
		            spec.addStep("Check for the returned URI to the taken image stored on the device.");
		            spec.addExpectation('The image should get stored at device default loaction and name of the image should be as set, cameraImage123. The callback data should have image of the stored image.');
		            spec.displayScenario();
		            spec.waitForButtonPressing("Run test");

					runs(function(){
						objCAM.takePicture({'outputFormat':'image','fileName':'cameraImage123'}, callbackFunc);
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

				if(isApplePlatform()){
					it("Should call takePicture with enableEditing as false | " + camid + camtype , function(){
						var spec = new ManualSpec(jasmine, window.document);
			        	spec.addGoal(jasmine.getEnv().currentSpec.description);
			            spec.addStep("Press 'RunTest' button");
			            spec.addStep("Capture any image.");
			            spec.addStep("check for photo capture image customizing.");
			            spec.addExpectation('It should not Enable post photo capture image customizing.');
			            spec.displayScenario();
			            spec.waitForButtonPressing("Run test");

						runs(function(){
							objCAM.takePicture({'enableEditing':false}, callbackFunc);
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

					it("Should call takePicture with enableEditing as true | " + camid + camtype , function(){
						var spec = new ManualSpec(jasmine, window.document);
			        	spec.addGoal(jasmine.getEnv().currentSpec.description);
			            spec.addStep("Press 'RunTest' button");
			            spec.addStep("Capture any image.");
			            spec.addStep("check for photo capture image customizing.");
			            spec.addExpectation('It should Enable post photo capture image customizing by default.');
			            spec.displayScenario();
			            spec.waitForButtonPressing("Run test");

						runs(function(){
							objCAM.takePicture({'enableEditing':true}, callbackFunc);
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
				};

				it("Should call takePicture with previewHeight, previewLeft,previewTop, previewWidth  and callback | " + camid + camtype , function(){
					var spec = new ManualSpec(jasmine, window.document);
		        	spec.addGoal(jasmine.getEnv().currentSpec.description);
		        	spec.addPrecondition("takePicture set with previewHeight as 120, previewLeft 200,previewTop as 60, previewWidth as 160");
		            spec.addStep("Press 'RunTest' button");
		            spec.addStep("Check for the viewfinder position.");
		            spec.addExpectation('The viewfinder positions should be full screen and Image should be captured successfully.');
		            spec.displayScenario();
		            spec.waitForButtonPressing("Run test");

					runs(function(){
						objCAM.takePicture({'previewHeight':120,'previewWidth':160,'previewLeft':200,'previewTop':60}, callbackFunc);
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

				if (isAndroid() || isApplePlatform()) {

					it("Should call takePicture with colorModel as rgb | " + camid + camtype , function(){
						var spec = new ManualSpec(jasmine, window.document);
						spec.addGoal(jasmine.getEnv().currentSpec.description);
					    spec.addStep("Press 'RunTest' button");
					    spec.addStep("save the image and check for color.");
					    spec.addExpectation('The saved image should be colored one.');
					    spec.displayScenario();
					    spec.waitForButtonPressing("Run test");

						runs(function(){
							objCAM.takePicture({'colorModel':'rgb'}, callbackFunc);
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

					it("Should call takePicture with colorModel as greyscale | " + camid + camtype , function(){
						var spec = new ManualSpec(jasmine, window.document);
						spec.addGoal(jasmine.getEnv().currentSpec.description);
					    spec.addStep("Press 'RunTest' button");
					    spec.addStep("save the image and check for color.");
					    spec.addExpectation('The image captured should be a grayscale (Black and White) image.');
					    spec.displayScenario();
					    spec.waitForButtonPressing("Run test");

						runs(function(){
							objCAM.takePicture({'colorModel':'grayscale'}, callbackFunc);
						});

						waitsFor(function(){
							return cbkResponseTimeout;
						},"waiting for callback data", 10000);

						runs(function(){
							spec.addResult(callbackData);
							spec.displayResults();
					        spec.waitForResponse();
						});	

						runs(function(){
							objCAM.colorModel.COLOR_MODEL_RGB;
						});					
					});

				};

				it("Should capture image by calling takePicture() method with compressionFormat jpg. | " + camid + camtype , function(){
					var spec = new ManualSpec(jasmine, window.document);
					spec.addGoal(jasmine.getEnv().currentSpec.description);
				    spec.addStep("Press 'RunTest' button");
				    spec.addStep("Check for the returned status.");
				    spec.addExpectation('The image captured should be in .jpg and other Parameters should return default values.');
				    spec.displayScenario();
				    spec.waitForButtonPressing("Run test");

					runs(function(){
						objCAM.takePicture({'compressionFormat':'jpg'}, callbackFunc);
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

				it("Should capture image by calling takePicture() method with compressionFormat png. | " + camid + camtype , function(){
					var spec = new ManualSpec(jasmine, window.document);
					spec.addGoal(jasmine.getEnv().currentSpec.description);
				    spec.addStep("Press 'RunTest' button");
				    spec.addStep("Check for the returned status.");
				    spec.addExpectation('The image captured should be in .png But in WM & CE it will be jpg only as png is not supported');
				    spec.displayScenario();
				    spec.waitForButtonPressing("Run test");

					runs(function(){
						objCAM.takePicture({'compressionFormat':'png'}, callbackFunc);
					});

					waitsFor(function(){
						return cbkResponseTimeout;
					},"waiting for callback data", 10000);

					runs(function(){
						spec.addResult(callbackData);
						spec.displayResults();
				        spec.waitForResponse();
					});

					runs(function(){
						objCAM.colorModel.COMPRESSION_FORMAT_JPG;
					});
				});

			});

		})(enumData[j]);

	}

	
});