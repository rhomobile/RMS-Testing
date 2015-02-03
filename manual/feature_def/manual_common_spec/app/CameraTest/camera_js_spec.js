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
            spec.addExpectation('The returned status should be OK and absoulte imagepath of the selected image. The returned image height and width should be same as the displayed image. Also image format should be as jpg in callback.');
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

		it("Should call choosePicture with outputFormat as image &  callback as anonymous function", function(){
			var spec = new ManualSpec(jasmine, window.document);
        	spec.addGoal(jasmine.getEnv().currentSpec.description);
            spec.addStep("Press 'RunTest' button");
            spec.addStep("Choose the image");
            spec.addStep("Check for the returned imageFormat");
            spec.addExpectation('The returned status should be OK and the path of the image should be mentioned in callback.');
            spec.displayScenario();
            spec.waitForButtonPressing("Run test");

			runs(function(){

				Rho.Camera.choosePicture({'outputFormat':'image'}, function(cbData){

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
            spec.addExpectation('The displayed image will not have any affect of the properties set, should get a valid callback.');
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

		it("Should call choosePicture with 'outputFormat' property value as dataUri ", function(){
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
				document.getElementById('imageUri').src = imageUriData;
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

			it("Should call getCameraByType with back and callback as function ", function(){
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
				},"waiting for callback data", 20000);

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
				},"waiting for callback data", 20000);

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

					it("Should call showPreview & capture with default properties |" + camid + camtype , function(){
						var spec = new ManualSpec(jasmine, window.document);
			        	spec.addGoal(jasmine.getEnv().currentSpec.description);
			        	spec.addPrecondition("Call showPreview() without any properties.");
			            spec.addStep("Press 'RunTest' button");
			            spec.addStep("Capture will happen after Check for the returned callback status & property set");
			            spec.addExpectation('Preview window should be with default values, flash off, aim mode off, captured callback value with status OK, imageHeight & imageWidth with max supported by the device, path of the image saved would be default root of the device with image name as timestamp and imageFormat: jpg.');
			            spec.displayScenario();
			            spec.waitForButtonPressing("Run test");

						runs(function(){
							objCAM.showPreview();

							setTimeout(function(){
								objCAM.capture(callbackFunc);
							},6000);
						});

						waitsFor(function(){
							return cbkResponseTimeout;
						},"waiting for callback data", 12000);

						runs(function(){
							spec.addResult(callbackData);
							spec.displayResults();
							objCAM.hidePreview();
			                spec.waitForResponse();
						});

					});

					it("Should call showPreview with preview window values, compressionFormat & filename |" + camid + camtype , function(){
						var spec = new ManualSpec(jasmine, window.document);
			        	spec.addGoal(jasmine.getEnv().currentSpec.description);
			        	spec.addPrecondition("Call showPreview() with properties previewLeft:10, previewTop:10, previewWidth:100, previewHeight:60, commpressionFormat:'jpg', fileName:'\\Application\\camImage', flashMode: off, aimMode:off.");
			            spec.addStep("Press 'RunTest' button");
			            spec.addStep("Capture will happen after Check for the returned callback status & property set");
			            spec.addExpectation('Preview window should be as set(left:10, top:10, width:100 & height:60). Capture callback should return status OK with imagePath, imageFormat as jpg & the filename camImage.jpg.');
			            spec.displayScenario();
			            spec.waitForButtonPressing("Run test");

						runs(function(){
							objCAM.showPreview({'previewLeft':10, 'previewTop':10, 'previewWidth':100, 'previewHeight':60, 'commpressionFormat':'jpg', 'fileName':'\\Application\\camImage', 'flashMode': 'off', 'aimMode':'off'});

							setTimeout(function(){
								objCAM.capture(callbackFunc);
							},6000);
						});

						waitsFor(function(){
							return cbkResponseTimeout;
						},"waiting for callback data", 12000);

						runs(function(){
							spec.addResult(callbackData);
							spec.displayResults();
							objCAM.hidePreview();
			                spec.waitForResponse();
						});

					});

					it("Should call showPreview with preview window values, ouputFomat:dataUri & captureSound |" + camid + camtype , function(){
						var spec = new ManualSpec(jasmine, window.document);
			        	spec.addGoal(jasmine.getEnv().currentSpec.description);
			        	spec.addPrecondition("Call showPreview() with properties previewLeft:-10, previewTop:-10, previewWidth:40, previewHeight:80, outputFormat:dataUri, captureSound:'//Application//alarm2.wav'.");
			            spec.addStep("Press 'RunTest' button");
			            spec.addStep("Capture will happen after Check for the returned callback status & property set");
			            spec.addExpectation('Preview window should be as set(left:-10, top:-10, width:40 & height:80). Should play a wav file after capture. The returned status should be OK and captured image should be displayed as dataUri. .');
			            spec.displayScenario();
			            spec.waitForButtonPressing("Run test");

						runs(function(){
							objCAM.showPreview({'previewLeft':-10, 'previewTop':-10, 'previewWidth':40, 'previewHeight':80, 'outputFormat':'dataUri', 'captureSound':'//Application//alarm2.wav'
							});

							setTimeout(function(){
								objCAM.capture(callbackFunc);
							},6000);
						});

						waitsFor(function(){
							return cbkResponseTimeout;
						},"waiting for callback data", 12000);

						runs(function(){
							spec.addResult(callbackData);
							document.getElementById('imageUri').src = imageUriData;
							spec.displayResults();
							objCAM.hidePreview();
			                spec.waitForResponse();
						});

					});

					it("Should call showPreview with flash: on, aimmode:on (if imager), desiredHeight & desiredWidth set |" + camid + camtype , function(){
						var spec = new ManualSpec(jasmine, window.document);
			        	spec.addGoal(jasmine.getEnv().currentSpec.description);
			        	spec.addPrecondition("Call showPreview() with properties previewLeft:10, previewTop:10, previewWidth:100, previewHeight:60, desiredHeight:120, desiredWidth:240, outputFormat:image, flashMode:on, aimMode:on, captureSound:''.");
			            spec.addStep("Press 'RunTest' button");
			            spec.addStep("Capture will happen after Check for the returned callback status & property set");
			            spec.addExpectation('Flash should be ON if available or aim ON in case of imager. The returned status should be OK, imagePath would be th efile saved path in the device, imageHeight: 120 & imageWidth: 240. After capture there should not be any wav file played.');
			            spec.displayScenario();
			            spec.waitForButtonPressing("Run test");

						runs(function(){
							objCAM.showPreview({'previewLeft':10, 'previewTop':10, 'previewWidth':100, 'previewHeight':60, 'desiredHeight':120, 'desiredWidth':240, 'outputFormat':'image', 'flashMode':'on', 'aimMode':'on', 'captureSound':''
							});

							setTimeout(function(){
								objCAM.capture(callbackFunc);
							},6000);
						});

						waitsFor(function(){
							return cbkResponseTimeout;
						},"waiting for callback data", 12000);

						runs(function(){
							spec.addResult(callbackData);
							spec.displayResults();
							objCAM.hidePreview();
			                spec.waitForResponse();
						});

					});

					it("Should call showPreview & capture in landscape mode" + camid + camtype , function(){
						var spec = new ManualSpec(jasmine, window.document);
			        	spec.addGoal(jasmine.getEnv().currentSpec.description);
			        	spec.addPrecondition("Call capture(callback) method holding device in landscape mode");
			            spec.addStep("Press 'RunTest' button");
			            spec.addStep("Check for the returned status");
			            spec.addExpectation('The returned status should be OK, image should be displayed as dataUri in landscape mode.');
			            spec.displayScenario();
			            spec.waitForButtonPressing("Run test");

						runs(function(){
							objCAM.showPreview({'previewLeft':10, 'previewTop':10, 'previewWidth':100, 'previewHeight':60, 'desiredHeight':120, 'desiredWidth':240, 'outputFormat':'dataUri'
							});

							setTimeout(function(){
								objCAM.capture(callbackFunc);
							},6000);
						});

						waitsFor(function(){
							return cbkResponseTimeout;
						},"waiting for callback data", 12000);

						runs(function(){
							spec.addResult(callbackData);
							document.getElementById('imageUri').src = imageUriData;
							spec.displayResults();
							objCAM.hidePreview();
			                spec.waitForResponse();
						});

					});

					it("Should call showPreview with all properties set & capture |" + camid + camtype , function(){
						var spec = new ManualSpec(jasmine, window.document);
			        	spec.addGoal(jasmine.getEnv().currentSpec.description);
			        	spec.addPrecondition("Call showPreview() with properties previewLeft:10, previewTop:10, previewWidth:100, previewHeight:60, fileName:camImage123, desiredHeight:360, desiredWidth:480, compressionFormat:png, outputFormat:image, flashMode:off, aimMode:off, previewLeft:40, previewTop:20, previewWidth:50, previewHeight:50, captureSound:'//Application//alarm2.wav'.");
			            spec.addStep("Press 'RunTest' button");
			            spec.addStep("Check for the returned callback status & property set");
			            spec.addExpectation('The viewfinder with properties set should reflect. Both flashMode & aimMode is off. Should play a wav file after capture. The returned status should be OK and captured imagePath should be with the name camImage123.jpg, imageHeight: 360, imageWidth:480 & imageFormat: jpg.');
			            spec.displayScenario();
			            spec.waitForButtonPressing("Run test");

						runs(function(){
							objCAM.showPreview({'previewLeft':10, 'previewTop':10, 'previewWidth':100, 'previewHeight':60, 'fileName':'camImage123', 'desiredHeight':360, 'desiredWidth':480, 'compressionFormat':'png', 'outputFormat':'image', 'flashMode':'off', 'aimMode':'off', 'previewLeft':40, 'previewTop':20, 'previewWidth':50, 'previewHeight':50, 'captureSound':'//Application//alarm2.wav'
							});

							setTimeout(function(){
								objCAM.capture(callbackFunc);
							},6000);
						});

						waitsFor(function(){
							return cbkResponseTimeout;
						},"waiting for callback data", 12000);

						runs(function(){
							spec.addResult(callbackData);
							spec.displayResults();
							objCAM.hidePreview();
			                spec.waitForResponse();
						});

					});

					it("Should rotate the screen rightHanded after call showPreview | " + camid + camtype , function(){
						var spec = new ManualSpec(jasmine, window.document);
			        	spec.addGoal(jasmine.getEnv().currentSpec.description);
			            spec.addStep("Press 'RunTest' button");
			            spec.addStep("NOTE: If auto rotate supported, rotate the device in all directions");
			            spec.addExpectation('The viewfinder should realign and there should not be any error.');
			            spec.displayScenario();
			            spec.waitForButtonPressing("Run test");

						runs(function(){
							objCAM.showPreview();
							
							setTimeout(function(){
								Rho.ScreenOrientation.rightHanded();
								objCAM.capture(callbackFunc);
							},6000);
						});

						waitsFor(function(){
							return cbkResponseTimeout;
						},"waiting for callback data", 12000);

						runs(function(){
							spec.addResult(callbackData);
							spec.displayResults();
							objCAM.hidePreview();
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
							objCAM.showPreview();

							setTimeout(function(){
								objCAM.hidePreview();
							},6000);
						});

						runs(function(){
			                spec.waitForResponse();
						});
					});

					it("Should call showPreview and minimize | " + camid + camtype , function(){
						var spec = new ManualSpec(jasmine, window.document);
			        	spec.addGoal(jasmine.getEnv().currentSpec.description);
			            spec.addStep("Press 'RunTest' button");
			            spec.addStep("Once the preview window appears, Minimize & restore the application (restore manually by clicking on the application)");
			            spec.addExpectation('Should display error with error message in callback.');
			            spec.displayScenario();
			            spec.waitForButtonPressing("Run test");

			            runs(function(){
							objCAM.showPreview();

							setTimeout(function(){
								Rho.Application.minimize();
							},6000);
						});


						runs(function(){
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
			            spec.addExpectation('Preview should be there and application should not behave abnormally.');
			            spec.displayScenario();
			            spec.waitForButtonPressing("Run test");

			            runs(function(){
							objCAM.showPreview();
						});

						runs(function(){
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
							objCAM.showPreview();
						});

						runs(function(){
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

				it("Should call takePicture and invalid fileName path | " + camid + camtype , function(){
					var spec = new ManualSpec(jasmine, window.document);
		        	spec.addGoal(jasmine.getEnv().currentSpec.description);
		            spec.addStep("Call takePicture({}, callback function) with fileName:'//InvalidPath//camimage'");
		            spec.addStep("Press 'RunTest' button");
		            spec.addStep("Check for the returned status");
		            spec.addExpectation('The returned status should be error with message as wrong file path.');
		            spec.displayScenario();
		            spec.waitForButtonPressing("Run test");

		            runs(function(){
						objCAM.takePicture({'fileName':"//InvalidPath//camimage"}, callbackFunc);
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

				it("Should rotate the screen after screen rightHanded calling takePicture() method. | " + camid + camtype , function(){
					var spec = new ManualSpec(jasmine, window.document);
		        	spec.addGoal(jasmine.getEnv().currentSpec.description);
		            spec.addStep("Press 'RunTest' button");
		            spec.addStep("NOTE: If auto rotate supported, rotate the device in all directions");
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
						return cbkResponseTimeout;
					},"waiting for callback data", 15000);

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
		            spec.addExpectation('Image should be displayed as dataUri.');
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

				if (isAndroidPlatform() || isApplePlatform()) {

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

				it("Should capture image by calling takePicture() method in portrait mode. | " + camid + camtype , function(){
					var spec = new ManualSpec(jasmine, window.document);
					spec.addGoal(jasmine.getEnv().currentSpec.description);
					spec.addStep("Call takePicture() method with imageFormat as dataUri keeping the device in portrait mode.");
				    spec.addStep("Press 'RunTest' button");
				    spec.addStep("Check for the returned status.");
				    spec.addExpectation('The preview should be in Full Screen. The image captured should be deplayed as dataUri in the portrait mode.');
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
						document.getElementById('imageUri').src = imageUriData;
						spec.displayResults();
				        spec.waitForResponse();
					});

				});

				it("Should capture image by calling takePicture() method in landscape mode. | " + camid + camtype , function(){
					var spec = new ManualSpec(jasmine, window.document);
					spec.addGoal(jasmine.getEnv().currentSpec.description);
					spec.addStep("Call takePicture() method with imageFormat as dataUri keeping the device in landscape mode.");
				    spec.addStep("Press 'RunTest' button");
				    spec.addStep("Check for the returned status.");
				    spec.addExpectation('The preview should be in Full Screen. The image captured should be deplayed as dataUri in the landscape mode.');
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
						document.getElementById('imageUri').src = imageUriData;
						spec.displayResults();
				        spec.waitForResponse();
					});

				});							

			});

		})(enumData[j]);

	}


	describe("Miscellaneous Tests | " , function() {

		it("Should try to enable fullscreen after preview window |" , function(){
			var spec = new ManualSpec(jasmine, window.document);
        	spec.addGoal(jasmine.getEnv().currentSpec.description);
        	spec.addPrecondition("Call showPreview() without any properties.");
            spec.addStep("Press 'RunTest' button");
            spec.addStep("Capture will happen after Check for the returned callback status & property set");
            spec.addExpectation('1st enable preview window should remain and fullscreen window should not come up..');
            spec.displayScenario();
            spec.waitForButtonPressing("Run test");

			runs(function(){
				Rho.Camera.showPreview();

				setTimeout(function(){
					Rho.Camera.takepicture({}, callbackFunc);
					spec.addResult("takePicture called in background");
					spec.displayResults();
				},6000);
			});

			runs(function(){
                spec.waitForResponse();
			});

			runs(function(){
                Rho.Camera.hidePreview();
			});

		});

		it("Persistance test for showpreview & capture |" , function(){
			var spec = new ManualSpec(jasmine, window.document);
        	spec.addGoal(jasmine.getEnv().currentSpec.description);
        	spec.addPrecondition(" Call showPreview() with properties previewLeft: 50, previewTop:50, previewHeight: 80, previewWidth: 40, fileName: '\\Application\\persistCapture', flashMode: on & aimMode: ON.");
            spec.addStep("Press 'RunTest' button");
            spec.addStep("Run test should open preview window and navigate to another page.");
            spec.addStep("capture should be called in another page.")
            spec.addExpectation('Preview window properties should persist and the capture call would enable flash for color camera (if avaiable) or aim will be ON in case of imager. Captured image should be persistCapture.jpg in Application folder.');
            spec.displayScenario();
            spec.waitForButtonPressing("Run test");

			runs(function(){
				Rho.Camera.showPreview({'previewLeft': 50, 'previewTop':50, 'previewHeight': 80, 'previewWidth': 40, 'fileName': '\\Application\\persistCapture', 'flashMode': 'on', 'aimMode': 'ON'});

				setTimeout(function(){
					window.location="./cameraPersistPage.html";
				},6000);
			});

			runs(function(){
                spec.waitForResponse();
			});

		});

	});

	
});