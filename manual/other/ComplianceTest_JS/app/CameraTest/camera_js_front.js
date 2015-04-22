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

//	for (var j = 0; j<enumData.length; j++){
//		(function(objCAM){ 
			var objCAM = enumData[1];
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