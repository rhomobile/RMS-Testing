describe("Camera API Manual Tests", function(){

	var enumData = Rho.Camera.enumerate();
	var callbackData = "";
	var cbkResponseTimeout = false;
	var camArray = "";
	var imageUriData = null;
	var camtype;
	
	var callbackFunc = function(cbData){

		callbackData = "status : " + cbData.status;
		callbackData += "; message : " + cbData.message;
		callbackData += "; imageHeight : " + cbData.imageHeight;
		callbackData += "; imageWidth : " + cbData.imageWidth;
		callbackData += "; imageFormat : " + cbData.imageFormat;
		callbackData += "; imageUri : " + cbData.imageUri;

		imageUriData = cbData.imageUri;
		cbkResponseTimeout = true;
	}

	var getCallbackData = function(camArr){
		
		for (var i = 0; i <= camArr.length - 1; i++) {
			camArray += (i+1).toString() + ") " + enumData[i].getProperty('ID') + ' ' + enumData[i].getProperty('cameraType') +  "; ";
		};

		cbkResponseTimeout = true;
	}

	beforeEach(function(){
		callbackData = "";
		imageUriData = null;
		cbkResponseTimeout = false;
	});

	afterEach(function(){
		document.getElementById('imageUri').src = "";
	});


	describe("Select picture using choosePicture method", function() {

		it("VT285-0001 | should choosePicture with callback status OK", function(){
			var spec = new ManualSpec(jasmine, window.document);
        	spec.addGoal(jasmine.getEnv().currentSpec.description);
            spec.addStep("Press 'RunTest' button");
            spec.addStep("Choose the image");
            spec.addStep("Check for the returned status & image");
            spec.addExpectation('The returned status should be OK, message should be empty and imageUri should have absolute imagepath of the selected image. The returned image height and width should be same as the displayed image. Also imageFormat should be as jpg/png in callback.');
            spec.displayScenario();
            spec.waitForButtonPressing("Run test");

			runs(function(){
				Rho.Camera.choosePicture({}, callbackFunc);
			});

			waitsFor(function(){
				return cbkResponseTimeout;
			},"waiting for callback data", 20000);

			runs(function(){
				spec.addResult("callbackdata: ", callbackData);
				spec.displayResults();
                spec.waitForResponse();
			});

		});

		it("VT285-0002 | should choosePicture with callback status cancel", function(){
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
			},"waiting for callback data", 20000);

			runs(function(){
				spec.addResult("callbackdata: ", callbackData);
				spec.displayResults();
                spec.waitForResponse();
			});

		});

		it("VT285-0003 | Should call choosePicture with outputFormat as image &  callback as anonymous function", function(){
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
					callbackData += "; message : " + cbData.message;
					callbackData += "; imageHeight : " + cbData.imageHeight;
					callbackData += "; imageWidth : " + cbData.imageWidth;
					callbackData += "; imageFormat : " + cbData.imageFormat;
					callbackData += "; imageUri : " + cbData.imageUri;

					cbkResponseTimeout = true;

				});
			});

			waitsFor(function(){
				return cbkResponseTimeout;
			},"waiting for callback data", 20000);

			runs(function(){
				spec.addResult("callbackdata: ", callbackData);
				spec.displayResults();
                spec.waitForResponse();
			});

		});


		it("VT285-0004 | Should call choosePicture with property as colorModel, desiredHeight , desiredWidth and callback", function(){
			var spec = new ManualSpec(jasmine, window.document);
        	spec.addGoal(jasmine.getEnv().currentSpec.description);
            spec.addStep("Press 'RunTest' button");
            spec.addPrecondition("Call choosePicture with propertyhash as colorModel:greyscale, desiredHeight:640 , desiredWidth:480 and callback.");
            spec.addStep("Choose the image.");
            spec.addExpectation('The selected image will not have any affect of the properties set, should return callback data.');
            spec.displayScenario();
            spec.waitForButtonPressing("Run test");
			
			runs(function(){
				Rho.Camera.choosePicture({'colorModel':'greyscale','desiredHeight':640,'desiredWidth':480}, callbackFunc);
			});

			waitsFor(function(){
				return cbkResponseTimeout;
			},"waiting for callback data", 20000);

			runs(function(){
				spec.addResult("callbackdata: ", callbackData);
				spec.displayResults();
                spec.waitForResponse();
			});

		});

		it("VT285-0005 | Should call choosePicture with 'outputFormat' property value as dataUri ", function(){
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
			},"waiting for callback data", 20000);

			runs(function(){
				spec.addResult("callbackdata: ", callbackData);
				document.getElementById('imageUri').src = imageUriData;
				spec.displayResults();
                spec.waitForResponse();
			});

		});

		it("VT285-0006 | should choosePicture with callback and minimize", function(){
			var spec = new ManualSpec(jasmine, window.document);
        	spec.addGoal(jasmine.getEnv().currentSpec.description);
            spec.addStep("Press 'RunTest' button");
            spec.addStep("Minimize the Application & restore, then select an image file");
            spec.addStep("Check for the returned status and returned message");
            spec.addExpectation('Image should be captued successfully with callback data.');
            spec.displayScenario();
            spec.waitForButtonPressing("Run test");
			
			runs(function(){
				Rho.Camera.choosePicture({}, callbackFunc);
			});

			waitsFor(function(){
				return cbkResponseTimeout;
			},"waiting for callback data", 20000);

			runs(function(){
				spec.addResult("callbackdata: ", callbackData);
				spec.displayResults();
                spec.waitForResponse();
			});

		});

		it("VT285-0007 | should choosePicture with callback and suspend the device", function(){
			var spec = new ManualSpec(jasmine, window.document);
        	spec.addGoal(jasmine.getEnv().currentSpec.description);
            spec.addStep("Press 'RunTest' button");
            spec.addStep("Suspend the device and resume without choosing the file. After resume then select an image.");
            spec.addStep("Check for the returned status and returned message");
            spec.addExpectation('Image should be captued successfully with callback data.');
            spec.displayScenario();
            spec.waitForButtonPressing("Run test");

			runs(function(){
				Rho.Camera.choosePicture({}, callbackFunc);
			});

			waitsFor(function(){
				return cbkResponseTimeout;
			},"waiting for callback data", 20000);

			runs(function(){
				spec.addResult("callbackdata: ", callbackData);
				spec.displayResults();
                spec.waitForResponse();
			});

		});

	});


	describe("Enumerate Camera with callback ", function() {

		it("VT285-0008 | Should enumerate with callback", function(){
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
				spec.addResult("enumerated cameras: ", camArray);
				spec.displayResults();
                spec.waitForResponse();
			});		            

		});

	});

	

		describe("getCameraByType method", function() {

			if (isAndroidPlatform() || isApplePlatform()) {

				it("VT285-0009 | Should call getCameraByType with back and callback as function ", function(){
					var spec = new ManualSpec(jasmine, window.document);
		        	spec.addGoal(jasmine.getEnv().currentSpec.description);
		            spec.addStep("Press 'RunTest' button");
		            spec.addStep("If return value is back camera call takepicture using return value");
		            spec.addExpectation('The return values should be back camera object and the back camera should open to take picture.');
		            spec.displayScenario();
		            spec.waitForButtonPressing("Run test");

		            var cameraTypeCb = function(camtype){
						camtype = camtype;
						cbkResponseTimeout = true;
					};

		            runs(function(){
						Rho.Camera.getCameraByType({'cameraType':'back'}, cameraTypeCb);
					});

					waitsFor(function(){
						return cbkResponseTimeout;
					},"waiting for callback data", 10000);

					runs(function(){
						cbkResponseTimeout = false;
						camtype.takepicture({}, callbackFunc);
					});

					waitsFor(function(){
						return cbkResponseTimeout;
					},"waiting for callback data", 20000);

					runs(function(){
						spec.addResult("callbackdata: ", callbackData);
						spec.displayResults();
		                spec.waitForResponse();
					});
				});

				it("VT285-0010 | Should call getCameraByType with front and without callback function ", function(){
					var spec = new ManualSpec(jasmine, window.document);
		        	spec.addGoal(jasmine.getEnv().currentSpec.description);
		            spec.addStep("Press 'RunTest' button");
		            spec.addStep("If return value is Front camera call takepicture using return value");
		            spec.addExpectation('The return values should be front camera object and the front camera should open to take picture.');
		            spec.displayScenario();
		            spec.waitForButtonPressing("Run test");
		            camtype = null;

		            runs(function(){
						camtype = Rho.Camera.getCameraByType({'cameraType':'front'});
					});

					waitsFor(function(){
						return cbkResponseTimeout;
					},"waiting for callback data", 10000);

					runs(function(){
						cbkResponseTimeout = false;
						camtype.takepicture({}, callbackFunc);
					});

					waitsFor(function(){
						return cbkResponseTimeout;
					},"waiting for callback data", 20000);

					runs(function(){
						spec.addResult("callbackdata: ", callbackData);
						spec.displayResults();
		                spec.waitForResponse();
					});				

				});

			};

			if (isWindowsMobilePlatform()) {

				it("VT285-0009 | Should call getCameraByType with color and callback as function ", function(){
					var spec = new ManualSpec(jasmine, window.document);
		        	spec.addGoal(jasmine.getEnv().currentSpec.description);
		            spec.addStep("Press 'RunTest' button");
		            spec.addStep("If return value is color camera call takepicture using return value");
		            spec.addExpectation('The return values should be color camera object and the color camera should open to take picture.');
		            spec.displayScenario();
		            spec.waitForButtonPressing("Run test");

		            var cameraTypeCb = function(camtype){
						camtype = camtype;
						cbkResponseTimeout = true;
					};

		            runs(function(){
						Rho.Camera.getCameraByType({'cameraType':'color'}, cameraTypeCb);
					});

					waitsFor(function(){
						return cbkResponseTimeout;
					},"waiting for callback data", 10000);

					runs(function(){
						cbkResponseTimeout = false;
						camtype.takepicture({}, callbackFunc);
					});

					waitsFor(function(){
						return cbkResponseTimeout;
					},"waiting for callback data", 20000);

					runs(function(){
						spec.addResult("callbackdata: ", callbackData);
						spec.displayResults();
		                spec.waitForResponse();
					});
				});

				it("VT285-0010 | Should call getCameraByType with imager and without callback function ", function(){
					var spec = new ManualSpec(jasmine, window.document);
		        	spec.addGoal(jasmine.getEnv().currentSpec.description);
		            spec.addStep("Press 'RunTest' button");
		            spec.addStep("If return value is Front camera call takepicture using return value");
		            spec.addExpectation('The return values should be imager camera object and the imager camera should open to take picture.');
		            spec.displayScenario();
		            spec.waitForButtonPressing("Run test");
		            camtype = null;

		            runs(function(){
						camtype = Rho.Camera.getCameraByType({'cameraType':'imager'});
					});

					waitsFor(function(){
						return cbkResponseTimeout;
					},"waiting for callback data", 10000);

					runs(function(){
						cbkResponseTimeout = false;
						camtype.takepicture({}, callbackFunc);
					});

					waitsFor(function(){
						return cbkResponseTimeout;
					},"waiting for callback data", 20000);

					runs(function(){
						spec.addResult("callbackdata: ", callbackData);
						spec.displayResults();
		                spec.waitForResponse();
					});				

				});

			};			

		});


	if (isAndroidPlatform() || isWindowsMobilePlatform()){

		describe("supportedSizeList property", function() {

			it("VT285-0011 | Should list supported resolution using supportedSizeList " , function(){
				var spec = new ManualSpec(jasmine, window.document);
	        	spec.addGoal(jasmine.getEnv().currentSpec.description);
	            spec.addStep("Press 'RunTest' button");
	            spec.addStep("Check for the return value");
	            spec.addExpectation('The return values should be an array of width and height which are supported by the device.');
	            spec.displayScenario();
	            spec.waitForButtonPressing("Run test");

	            var supportedList = "";

	            runs(function(){
					supportedList = Rho.Camera.supportedSizeList();
					spec.addResult("supportedList: ", JSON.stringify(supportedList));
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

				describe("showPreview, Capture & hidePreview methods | using " + camid + camtype , function() {

					it("VT285-0012 | Should call showPreview & capture with default properties | using " + camid + camtype , function(){
						var spec = new ManualSpec(jasmine, window.document);
			        	spec.addGoal(jasmine.getEnv().currentSpec.description);
			        	spec.addPrecondition("Call showPreview() without any properties.");
			            spec.addStep("Press 'RunTest' button");
			            spec.addStep("Capture will happen, then Check for the returned callback status & property set");
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
							spec.addResult("callbackdata: ", callbackData);
							spec.displayResults();
							objCAM.hidePreview();
			                spec.waitForResponse();
						});

					});

					it("VT285-0013 | Should call showPreview with preview window values, compressionFormat & filename | using " + camid + camtype , function(){
						var spec = new ManualSpec(jasmine, window.document);
			        	spec.addGoal(jasmine.getEnv().currentSpec.description);
			        	spec.addPrecondition("Call showPreview() with properties previewLeft:10, previewTop:10, previewWidth:100, previewHeight:60, commpressionFormat:'jpg', fileName:'\\Application\\camImage', flashMode: off, aimMode:off.");
			            spec.addStep("Press 'RunTest' button");
			            spec.addStep("Note: Capture will be called automatically & hidePreview is called after the capture");
			            spec.addStep("Capture will happen, then check for the returned callback status & property set");
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
							spec.addResult("callbackdata: ", callbackData);
							spec.displayResults();
							objCAM.hidePreview();
			                spec.waitForResponse();
						});

					});

					it("VT285-0014 | Should call showPreview with preview window values, ouputFomat:dataUri & captureSound | using " + camid + camtype , function(){
						var spec = new ManualSpec(jasmine, window.document);
			        	spec.addGoal(jasmine.getEnv().currentSpec.description);
			        	spec.addPrecondition("Call showPreview() with properties previewLeft:-10, previewTop:-10, previewWidth:40, previewHeight:80, outputFormat:dataUri, captureSound:'\\Application\\Alarm5.wav'.");
			            spec.addStep("Press 'RunTest' button");
			            spec.addStep("Note: Capture will be called automatically & hidePreview is called after the capture");
			            spec.addStep("Capture will happen, then Check for the returned callback status & property set");
			            spec.addExpectation('Preview window should be as set(left:-10, top:-10, width:40 & height:80). Should play a wav file after capture. The returned status should be OK and captured image should be displayed as dataUri. .');
			            spec.displayScenario();
			            spec.waitForButtonPressing("Run test");

						runs(function(){
							objCAM.showPreview({'previewLeft':-10, 'previewTop':-10, 'previewWidth':40, 'previewHeight':80, 'outputFormat':'dataUri', 'captureSound':'\\Application\\Alarm5.wav'
							});

							setTimeout(function(){
								objCAM.capture(callbackFunc);
							},6000);
						});

						waitsFor(function(){
							return cbkResponseTimeout;
						},"waiting for callback data", 12000);

						runs(function(){
							spec.addResult("callbackdata: ", callbackData);
							document.getElementById('imageUri').src = imageUriData;
							spec.displayResults();
							objCAM.hidePreview();
			                spec.waitForResponse();
						});

					});

					it("VT285-0015 | Should call showPreview with flash: on, aimmode:on (if imager), desiredHeight & desiredWidth set | using " + camid + camtype , function(){
						var spec = new ManualSpec(jasmine, window.document);
			        	spec.addGoal(jasmine.getEnv().currentSpec.description);
			        	spec.addPrecondition("Call showPreview() with properties previewLeft:10, previewTop:10, previewWidth:100, previewHeight:60, desiredHeight:120, desiredWidth:240, outputFormat:image, flashMode:on, aimMode:on, captureSound:''.");
			            spec.addStep("Press 'RunTest' button");
			            spec.addStep("Note: Capture will be called automatically & hidePreview is called after the capture");
			            spec.addStep("Capture will happen, then Check for the returned callback status & property set");
			            spec.addExpectation('Flash should be ON if available or aim ON in case of imager. The returned status should be OK, imagePath would be the file saved path in the device, imageHeight: 120 & imageWidth: 240. After capture there should not be any wav file played.');
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
							spec.addResult("callbackdata: ", callbackData);
							spec.displayResults();
							objCAM.hidePreview();
			                spec.waitForResponse();
						});

					});

					it("VT285-0016 | Should call showPreview & capture in landscape mode" + camid + camtype , function(){
						var spec = new ManualSpec(jasmine, window.document);
			        	spec.addGoal(jasmine.getEnv().currentSpec.description);
			        	spec.addPrecondition("Call capture(callback) method holding device in landscape mode");
			            spec.addStep("Press 'RunTest' button");
			            spec.addStep("Note: Capture will be called automatically after 6secs & hidePreview is called after the capture");
			            spec.addStep("Check for the returned status");
			            spec.addExpectation('The returned status should be OK, image should be displayed as dataUri in landscape mode.');
			            spec.displayScenario();
			            spec.waitForButtonPressing("Run test");

						runs(function(){
							objCAM.showPreview({'previewLeft':10, 'previewTop':10, 'previewWidth':100, 'previewHeight':100, 'desiredHeight':120, 'desiredWidth':240, 'outputFormat':'dataUri'
							});

							setTimeout(function(){
								objCAM.capture(callbackFunc);
							},6000);
						});

						waitsFor(function(){
							return cbkResponseTimeout;
						},"waiting for callback data", 12000);

						runs(function(){
							spec.addResult("callbackdata: ", callbackData);
							document.getElementById('imageUri').src = imageUriData;
							spec.displayResults();
							objCAM.hidePreview();
			                spec.waitForResponse();
						});

					});

					it("VT285-0017 | Should call showPreview with all properties set & capture | using " + camid + camtype , function(){
						var spec = new ManualSpec(jasmine, window.document);
			        	spec.addGoal(jasmine.getEnv().currentSpec.description);
			        	spec.addPrecondition("Call showPreview() with properties previewLeft:10, previewTop:10, previewWidth:100, previewHeight:60, fileName:camImage123, desiredHeight:360, desiredWidth:480, compressionFormat:png, outputFormat:image, flashMode:off, aimMode:off, captureSound:'\\Application\\Alarm5.wav'.");
			            spec.addStep("Press 'RunTest' button");
			            spec.addStep("Note: Capture will be called automatically & hidePreview is called after the capture");
			            spec.addStep("Check for the returned callback status & property set");
			            spec.addExpectation('The viewfinder with properties set should reflect. Both flashMode & aimMode is off. Should play a wav file after capture. The returned status should be OK and captured imagePath should be with the name camImage123.jpg, imageHeight: 360, imageWidth:480 & imageFormat: jpg.');
			            spec.displayScenario();
			            spec.waitForButtonPressing("Run test");

						runs(function(){
							objCAM.showPreview({'previewLeft':10, 'previewTop':10, 'previewWidth':100, 'previewHeight':60, 'fileName':'camImage123', 'desiredHeight':360, 'desiredWidth':480, 'compressionFormat':'png', 'outputFormat':'image', 'flashMode':'off', 'aimMode':'off', 'previewLeft':40, 'previewTop':20, 'previewWidth':50, 'previewHeight':50, 'captureSound':'\\Application\\Alarm5.wav'
							});

							setTimeout(function(){
								objCAM.capture(callbackFunc);
							},6000);
						});

						waitsFor(function(){
							return cbkResponseTimeout;
						},"waiting for callback data", 12000);

						runs(function(){
							spec.addResult("callbackdata: ", callbackData);
							spec.displayResults();
							objCAM.hidePreview();
			                spec.waitForResponse();
						});

					});

					it("VT285-0018 | Should rotate the screen rightHanded after call showPreview | using " + camid + camtype , function(){
						var spec = new ManualSpec(jasmine, window.document);
			        	spec.addGoal(jasmine.getEnv().currentSpec.description);
			            spec.addStep("Press 'RunTest' button");
			            spec.addStep("NOTE: ScreenOrientation rightHanded will be called in the script. After pass/fail click, ScreenOrientation normal will be called.");
			            spec.addExpectation('The viewfinder should realign and there should not be any error.');
			            spec.displayScenario();
			            spec.waitForButtonPressing("Run test");

						runs(function(){
							objCAM.showPreview({'previewLeft':10, 'previewTop':10, 'previewWidth':100, 'previewHeight':60});
							
							setTimeout(function(){
								Rho.ScreenOrientation.rightHanded();

								setTimeout(function(){
									objCAM.capture(callbackFunc);
								},2000);
							},6000);
						});

						waitsFor(function(){
							return cbkResponseTimeout;
						},"waiting for callback data", 12000);

						runs(function(){
							spec.addResult("callbackdata: ", callbackData);
							spec.displayResults();
							objCAM.hidePreview();
			                spec.waitForResponse();
						});

						runs(function(){
							Rho.ScreenOrientation.normal();
						});

					});

					it("VT285-0019 | Should hide preview by using hidePreview | using " + camid + camtype , function(){
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

					it("VT285-0020 | Should call showPreview and minimize | using " + camid + camtype , function(){
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

					it("VT285-0021 | Should call showPreview and suspend | using " + camid + camtype , function(){
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

					it("VT285-0022 | Should call showPreview and quit the application | using " + camid + camtype , function(){
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


			describe("takePicture method | using " + camid + camtype , function() {

				it("VT285-0023 | Should call takePicture and take image | using " + camid + camtype , function(){
					var spec = new ManualSpec(jasmine, window.document);
		        	spec.addGoal(jasmine.getEnv().currentSpec.description);
		            spec.addStep("Press 'RunTest' button");
		            spec.addStep("Capture the image & Check for the returned status.");
		            spec.addExpectation('The preview should be in Full Screen. After capture, callback data should be returned: status as OK, message will be empty(not only if status is error), imageWidth, imageHeight, imageFormat(whether jpg/png) & imageUri(absolute image path) of the saved image');
		            spec.displayScenario();
		            spec.waitForButtonPressing("Run test");

		            runs(function(){
						objCAM.takePicture({}, callbackFunc);
					});

					waitsFor(function(){
						return cbkResponseTimeout;
					},"waiting for callback data", 10000);

					runs(function(){
						spec.addResult("callbackdata: ", callbackData);
						spec.displayResults();
		                spec.waitForResponse();
					});

				});

				it("VT285-0024 | Should call takePicture and returned status cancel | using " + camid + camtype , function(){
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
						spec.addResult("callbackdata: ", callbackData);
						spec.displayResults();
		                spec.waitForResponse();
					});

				});

				it("VT285-0025 | Should call takePicture and invalid fileName path | using " + camid + camtype , function(){
					var spec = new ManualSpec(jasmine, window.document);
		        	spec.addGoal(jasmine.getEnv().currentSpec.description);
		            spec.addStep("Call takePicture({}, callback function) with fileName:'\\InvalidPath\\camimage'");
		            spec.addStep("Press 'RunTest' button");
		            spec.addStep("Check for the returned status");
		            spec.addExpectation('The returned status should be error with message as wrong file path.');
		            spec.displayScenario();
		            spec.waitForButtonPressing("Run test");

		            runs(function(){
						objCAM.takePicture({'fileName':"\\InvalidPath\\camimage"}, callbackFunc);
					});

					waitsFor(function(){
						return cbkResponseTimeout;
					},"waiting for callback data", 10000);

					runs(function(){
						spec.addResult("callbackdata: ", callbackData);
						spec.displayResults();
		                spec.waitForResponse();
					});

				});				

				it("VT285-0026 | Should call takePicture and minimize the application | using " + camid + camtype , function(){
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
						spec.addResult("callbackdata: ", callbackData);
						spec.displayResults();
		                spec.waitForResponse();
					});
				});

				it("VT285-0027 | Should call takePicture and suspend the device | using " + camid + camtype , function(){
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
						spec.addResult("callbackdata: ", callbackData);
						spec.displayResults();
		                spec.waitForResponse();
					});
				});

				it("VT285-0028 | Should call takePicture and quit the application | using " + camid + camtype , function(){
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

				it("VT285-0029 | Should rotate the screen rightHanded after calling takePicture() method. | using " + camid + camtype , function(){
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
						return cbkResponseTimeout;
					},"waiting for callback data", 15000);

					runs(function(){
						spec.addResult("callbackdata: ", callbackData);
						spec.displayResults();
		                spec.waitForResponse();
					});

					runs(function(){
						Rho.ScreenOrientation.normal();
					});

				});

				it("VT285-0030 | Should call takePicture with flashMode FLASH_ON | using " + camid + camtype , function(){
					var spec = new ManualSpec(jasmine, window.document);
		        	spec.addGoal(jasmine.getEnv().currentSpec.description);
		            spec.addStep("Press 'RunTest' button");
		            spec.addStep("Capture any image in low illumination area");
		            spec.addExpectation('Flash should be on while taking the image.');
		            spec.displayScenario();
		            spec.waitForButtonPressing("Run test");

					runs(function(){
						objCAM.takePicture({'flashMode':Rho.Camera.FLASH_ON}, callbackFunc);
					});

					waitsFor(function(){
						return cbkResponseTimeout;
					},"waiting for callback data", 10000);

					runs(function(){
						spec.addResult("callbackdata: ", callbackData);
						spec.displayResults();
		                spec.waitForResponse();
					});	
				});

				it("VT285-0031 | Should call takePicture with flashMode FLASH_OFF | using " + camid + camtype , function(){
					var spec = new ManualSpec(jasmine, window.document);
		        	spec.addGoal(jasmine.getEnv().currentSpec.description);
		            spec.addStep("Press 'RunTest' button");
		            spec.addStep("Capture any image in low illumination area");
		            spec.addExpectation('Flash should be off while taking the image.');
		            spec.displayScenario();
		            spec.waitForButtonPressing("Run test");

					runs(function(){
						objCAM.takePicture({'flashMode':Rho.Camera.FLASH_OFF}, callbackFunc);
					});

					waitsFor(function(){
						return cbkResponseTimeout;
					},"waiting for callback data", 10000);

					runs(function(){
						spec.addResult("callbackdata: ", callbackData);
						spec.displayResults();
		                spec.waitForResponse();
					});
					
				});

				if (isAndroidPlatform()) {	

					it("VT285-0032 | Should call takePicture with flashMode FLASH_AUTO in dark area | using " + camid + camtype , function(){
						var spec = new ManualSpec(jasmine, window.document);
			        	spec.addGoal(jasmine.getEnv().currentSpec.description);
			            spec.addStep("Press 'RunTest' button");
			            spec.addStep("Capture any image in low illumination area");
			            spec.addExpectation('Flash should be on in low illumination area.');
			            spec.displayScenario();
			            spec.waitForButtonPressing("Run test");

						runs(function(){
							objCAM.takePicture({'flashMode':Rho.Camera.FLASH_AUTO}, callbackFunc);
						});

						waitsFor(function(){
							return cbkResponseTimeout;
						},"waiting for callback data", 10000);

						runs(function(){
							spec.addResult("callbackdata: ", callbackData);
							spec.displayResults();
			                spec.waitForResponse();
						});					
					});

					it("VT285-0033 | Should call takePicture with flashMode FLASH_AUTO in bright area | using " + camid + camtype , function(){
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
							spec.addResult("callbackdata: ", callbackData);
							spec.displayResults();
			                spec.waitForResponse();
						});						
					});

					it("VT285-0034 | Should call takePicture with flashMode FLASH_RED_EYE | using " + camid + camtype , function(){
						var spec = new ManualSpec(jasmine, window.document);
			        	spec.addGoal(jasmine.getEnv().currentSpec.description);
			            spec.addStep("Press 'RunTest' button");
			            spec.addStep("Capture any image in low illumination area");
			            spec.addExpectation('Flash should be on while taking picture. The saved picture should not contain the redeye in it.');
			            spec.displayScenario();
			            spec.waitForButtonPressing("Run test");

						runs(function(){
							objCAM.takePicture({'flashMode':Rho.Camera.FLASH_RED_EYE}, callbackFunc);
						});

						waitsFor(function(){
							return cbkResponseTimeout;
						},"waiting for callback data", 10000);

						runs(function(){
							spec.addResult("callbackdata: ", callbackData);
							spec.displayResults();
			                spec.waitForResponse();
						});

						runs(function(){
							objCAM.flashMode.FLASH_AUTO
						});				
					});

					it("VT285-0035 | Should call takePicture with flashMode FLASH_TORCH | using " + camid + camtype , function(){
						var spec = new ManualSpec(jasmine, window.document);
			        	spec.addGoal(jasmine.getEnv().currentSpec.description);
			            spec.addStep("Press 'RunTest' button");
			            spec.addStep("Capture any image in low illumination area");
			            spec.addExpectation('Flash should be on while taking the image. The flash is turned on in torch mode.');
			            spec.displayScenario();
			            spec.waitForButtonPressing("Run test");

						runs(function(){
							objCAM.takePicture({'flashMode':Rho.Camera.FLASH_RED_EYE}, callbackFunc);
						});

						waitsFor(function(){
							return cbkResponseTimeout;
						},"waiting for callback data", 10000);

						runs(function(){
							spec.addResult("callbackdata: ", callbackData);
							spec.displayResults();
			                spec.waitForResponse();
						});

						runs(function(){
							objCAM.flashMode.FLASH_AUTO
						});
					});

				};

				if (isWindowsMobilePlatform()){

					it("VT285-0036 | Should call takePicture with aimMode AIM_ON | using " + camid + camtype , function(){
						var spec = new ManualSpec(jasmine, window.document);
			        	spec.addGoal(jasmine.getEnv().currentSpec.description);
			            spec.addStep("Press 'RunTest' button");
			            spec.addStep("Capture any image.");
			            spec.addExpectation('Aiming should be ON. Reticle should be there. Image should be catured..');
			            spec.displayScenario();
			            spec.waitForButtonPressing("Run test");

						runs(function(){
							objCAM.takePicture({'aimMode':Rho.Camera.AIM_ON}, callbackFunc);
						});

						waitsFor(function(){
							return cbkResponseTimeout;
						},"waiting for callback data", 10000);

						runs(function(){
							spec.addResult("callbackdata: ", callbackData);
							spec.displayResults();
			                spec.waitForResponse();
						});
					});

					it("VT285-0037 | Should call takePicture with aimMode AIM_OFF | using " + camid + camtype , function(){
						var spec = new ManualSpec(jasmine, window.document);
			        	spec.addGoal(jasmine.getEnv().currentSpec.description);
			            spec.addStep("Press 'RunTest' button");
			            spec.addStep("Capture any image.");
			            spec.addExpectation('There should not be any aiming. Reticle should not be seen.');
			            spec.displayScenario();
			            spec.waitForButtonPressing("Run test");

						runs(function(){
							objCAM.takePicture({'aimMode':Rho.Camera.AIM_OFF}, callbackFunc);
						});

						waitsFor(function(){
							return cbkResponseTimeout;
						},"waiting for callback data", 10000);

						runs(function(){
							spec.addResult("callbackdata: ", callbackData);
							spec.displayResults();
			                spec.waitForResponse();
						});					
					});

				};

				it("VT285-0038 | Should call takePicture with outputFormat:dataUri  | using " + camid + camtype , function(){
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
						spec.addResult("callbackdata: ", callbackData);
						document.getElementById('imageUri').src = imageUriData;
						spec.displayResults();
		                spec.waitForResponse();
					});
				});

				it("VT285-0039 | Should call takePicture with desiredHeight 480 and desiredWidth 640 | using " + camid + camtype , function(){
					var spec = new ManualSpec(jasmine, window.document);
		        	spec.addGoal(jasmine.getEnv().currentSpec.description);
		            spec.addStep("Press 'RunTest' button");
		            spec.addStep("Capture any image. Check for the returned image height and width value. Open the saved image and check for height and width.");
		            spec.addExpectation('The returned image height and width should be same as the saved image which are 480 and 640(if supported by the device), else nearest supported resolution');
		            spec.displayScenario();
		            spec.waitForButtonPressing("Run test");

					runs(function(){
						objCAM.takePicture({'desiredHeight':480,'desiredWidth':640}, callbackFunc);
					});

					waitsFor(function(){
						return cbkResponseTimeout;
					},"waiting for callback data", 10000);

					runs(function(){
						spec.addResult("callbackdata: ", callbackData);
						spec.displayResults();
		                spec.waitForResponse();
					});	
				});

				it("VT285-0040 | Should call takePicture with desiredHeight 0 and desiredWidth 0 | using " + camid + camtype , function(){
					var spec = new ManualSpec(jasmine, window.document);
		        	spec.addGoal(jasmine.getEnv().currentSpec.description);
		            spec.addStep("Press 'RunTest' button");
		            spec.addStep("Capture any image. Check for the returned image height and width value. Open the saved image and check for height and width.");
		            spec.addExpectation('The returned image height and width should default or as previously set (bec 0x0 is not supported). No abnormal behaviour should be observed.');
		            spec.displayScenario();
		            spec.waitForButtonPressing("Run test");

					runs(function(){
						objCAM.takePicture({'desiredHeight':0,'desiredWidth':0}, callbackFunc);
					});

					waitsFor(function(){
						return cbkResponseTimeout;
					},"waiting for callback data", 10000);

					runs(function(){
						spec.addResult("callbackdata: ", callbackData);
						spec.displayResults();
		                spec.waitForResponse();
					});						
				});

				it("VT285-0041 | Should call takePicture with desiredWidth & desiredHeight more than max supported and Capture | using " + camid + camtype , function(){
					var spec = new ManualSpec(jasmine, window.document);
		        	spec.addGoal(jasmine.getEnv().currentSpec.description);
		            spec.addStep("Press 'RunTest' button");
		            spec.addStep("Capture any image.");
		            spec.addExpectation('Image should be captured successfully with max supported by that device.');
		            spec.displayScenario();
		            spec.waitForButtonPressing("Run test");

					runs(function(){
						objCAM.takePicture({'desiredHeight':7600,'desiredWidth':6400}, callbackFunc);
					});

					waitsFor(function(){
						return cbkResponseTimeout;
					},"waiting for callback data", 10000);

					runs(function(){
						spec.addResult("callbackdata: ", callbackData);
						spec.displayResults();
		                spec.waitForResponse();
					});	
					runs(function(){
						objCAM.desiredHeight(480);
						objCAM.desiredWidth(640);
					});
				});

				it("VT285-0042 | Should call takePicture with propertyhash outputFormat:image with fileName and using anonymous callback | using " + camid + camtype , function(){
					var spec = new ManualSpec(jasmine, window.document);
		        	spec.addGoal(jasmine.getEnv().currentSpec.description);
		            spec.addStep("Press 'RunTest' button");
		            spec.addStep("Capture any image.");
		            spec.addStep("Check for the returned URI to the taken image stored on the device.");
		            spec.addExpectation('The image should get stored at device default location and name of the image should be as set, cameraImage123. The callback data should have image of the stored image.');
		            spec.displayScenario();
		            spec.waitForButtonPressing("Run test");

					runs(function(){
						objCAM.takePicture({'outputFormat':'image','fileName':'cameraImage123'}, callbackFunc);
					});

					waitsFor(function(){
						return cbkResponseTimeout;
					},"waiting for callback data", 10000);

					runs(function(){
						spec.addResult("callbackdata: ", callbackData);
						spec.displayResults();
		                spec.waitForResponse();
					});	
				});

				if(isApplePlatform()){
					it("VT285-0043 | Should call takePicture with enableEditing as false | using " + camid + camtype , function(){
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
							spec.addResult("callbackdata: ", callbackData);
							spec.displayResults();
			                spec.waitForResponse();
						});						
					});

					it("VT285-0044 | Should call takePicture with enableEditing as true | using " + camid + camtype , function(){
						var spec = new ManualSpec(jasmine, window.document);
			        	spec.addGoal(jasmine.getEnv().currentSpec.description);
			            spec.addStep("Press 'RunTest' button");
			            spec.addStep("Capture any image.");
			            spec.addStep("check for photo capture image customizing.");
			            spec.addExpectation('It should enable post photo capture image customizing by default.');
			            spec.displayScenario();
			            spec.waitForButtonPressing("Run test");

						runs(function(){
							objCAM.takePicture({'enableEditing':true}, callbackFunc);
						});

						waitsFor(function(){
							return cbkResponseTimeout;
						},"waiting for callback data", 10000);

						runs(function(){
							spec.addResult("callbackdata: ", callbackData);
							spec.displayResults();
			                spec.waitForResponse();
						});						
					});
				};

				it("VT285-0045 | Should call takePicture with previewHeight, previewLeft,previewTop, previewWidth  and callback | using " + camid + camtype , function(){
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
						spec.addResult("callbackdata: ", callbackData);
						spec.displayResults();
		                spec.waitForResponse();
					});				
				});

				if (isAndroidPlatform() || isApplePlatform()) {

					it("VT285-0046 | Should call takePicture with colorModel as rgb | using " + camid + camtype , function(){
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
							spec.addResult("callbackdata: ", callbackData);
							spec.displayResults();
					        spec.waitForResponse();
						});
					});

					it("VT285-0047 | Should call takePicture with colorModel as greyscale | using " + camid + camtype , function(){
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
							spec.addResult("callbackdata: ", callbackData);
							spec.displayResults();
					        spec.waitForResponse();
						});	

						runs(function(){
							objCAM.colorModel.COLOR_MODEL_RGB;
						});					
					});

				};

				it("VT285-0048 | Should capture image by calling takePicture() method with compressionFormat jpg. | using " + camid + camtype , function(){
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
						spec.addResult("callbackdata: ", callbackData);
						spec.displayResults();
				        spec.waitForResponse();
					});
				});

				it("VT285-0049 | Should capture image by calling takePicture() method with compressionFormat png. | using " + camid + camtype , function(){
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
						spec.addResult("callbackdata: ", callbackData);
						spec.displayResults();
				        spec.waitForResponse();
					});

					runs(function(){
						objCAM.compressionFormat.COMPRESSION_FORMAT_JPG;
					});
				});

				it("VT285-0050 | Should capture image by calling takePicture() method in portrait mode. | using " + camid + camtype , function(){
					var spec = new ManualSpec(jasmine, window.document);
					spec.addGoal(jasmine.getEnv().currentSpec.description);
					spec.addStep("Call takePicture() method with imageFormat as dataUri keeping the device in portrait mode.");
				    spec.addStep("Press 'RunTest' button");
				    spec.addStep("Check for the returned status.");
				    spec.addExpectation('The preview should be in Full Screen. The image captured should be deplayed as dataUri in the portrait mode.');
				    spec.displayScenario();
				    spec.waitForButtonPressing("Run test");

					runs(function(){
						objCAM.takePicture({'outputFormat':'dataUri'}, callbackFunc);
					});

					waitsFor(function(){
						return cbkResponseTimeout;
					},"waiting for callback data", 10000);

					runs(function(){
						spec.addResult("callbackdata: ", callbackData);
						document.getElementById('imageUri').src = imageUriData;
						spec.displayResults();
				        spec.waitForResponse();
					});

				});

				it("VT285-0051 | Should capture image by calling takePicture() method in landscape mode. | using " + camid + camtype , function(){
					var spec = new ManualSpec(jasmine, window.document);
					spec.addGoal(jasmine.getEnv().currentSpec.description);
					spec.addStep("Call takePicture() method with imageFormat as dataUri keeping the device in landscape mode.");
				    spec.addStep("Press 'RunTest' button");
				    spec.addStep("Check for the returned status.");
				    spec.addExpectation('The preview should be in Full Screen. The image captured should be deplayed as dataUri in the landscape mode.');
				    spec.displayScenario();
				    spec.waitForButtonPressing("Run test");

					runs(function(){
						objCAM.takePicture({'outputFormat':'dataUri'}, callbackFunc);
					});

					waitsFor(function(){
						return cbkResponseTimeout;
					},"waiting for callback data", 10000);

					runs(function(){
						spec.addResult("callbackdata: ", callbackData);
						document.getElementById('imageUri').src = imageUriData;
						spec.displayResults();
				        spec.waitForResponse();
					});

				});							

			});

		})(enumData[j]);

	}


	describe("Miscellaneous Tests | " , function() {

		it("VT285-0052 | Should try to enable fullscreen after preview window |" , function(){
			var spec = new ManualSpec(jasmine, window.document);
        	spec.addGoal(jasmine.getEnv().currentSpec.description);
        	spec.addPrecondition("Call showPreview() without any properties.");
            spec.addStep("Press 'RunTest' button");
            spec.addStep("Capture will happen, then check for the returned callback status");
            spec.addExpectation('Preview window should remain and fullscreen window should not come up.');
            spec.addExpectation('NOTE: hidePreview will be called once pass/fail is clicked.');
            spec.displayScenario();
            spec.waitForButtonPressing("Run test");

			runs(function(){
				Rho.Camera.showPreview();

				setTimeout(function(){
					Rho.Camera.takepicture({}, callbackFunc);
				},6000);

				setTimeout(function(){
					objCAM.capture(callbackFunc);
				},12000);
			});

			runs(function(){
				spec.addResult("callbackdata: ", callbackData);
				spec.displayResults();
                spec.waitForResponse();
			});

			runs(function(){
                Rho.Camera.hidePreview();
			});

		});

		it("VT285-0053 | Persistance test for showpreview & capture |" , function(){
			var spec = new ManualSpec(jasmine, window.document);
        	spec.addGoal(jasmine.getEnv().currentSpec.description);
        	spec.addPrecondition(" Call showPreview() with properties previewLeft: 50, previewTop:50, previewHeight: 80, previewWidth: 40, fileName: '\\Application\\persistCapture', flashMode: on & aimMode: ON.");
            spec.addStep("Press 'RunTest' button");
            spec.addStep("Run test should open preview window and navigate to another page.");
            spec.addStep("capture should be called in another page.")
            spec.addExpectation('Preview window properties should persist and the capture call would enable flash for color camera (if available) or aim will be ON in case of imager. Captured image should be persistCapture.jpg in Application folder.');
            spec.displayScenario();
            spec.waitForButtonPressing("Run test");

			runs(function(){
				Rho.Camera.showPreview({'previewLeft': 50, 'previewTop':50, 'previewHeight': 80, 'previewWidth': 40, 'fileName': '\\Application\\persistCapture', 'flashMode': 'on', 'aimMode': 'on'});

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