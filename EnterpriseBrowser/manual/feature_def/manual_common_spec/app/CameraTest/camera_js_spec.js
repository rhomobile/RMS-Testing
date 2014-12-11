describe("Camera Manual Test", function() {
	
	var ENABLE5K = 5000;
	var ENABLE1K = 1000;
	var enumData = EB.Camera.enumerate();
	var enableFlag = false;
	var decodeFlag = false;
	var callbackststatus = false;
	
	if(EB.System.platform == 'ANDROID')
	{
		ENABLE5K = 0; ENABLE1K = 0;
	}

	var callbacktake = function (data){
			callbackdata(data);
			callbackststatus = true;
	}

	var callbacktakeuri = function (data){
			callbackdatauri(data);
			callbackststatus = true;
	}

	var callbacktakeraw = function (data){
			callbackdataraw(JSON.stringify(data));
	}

   for (var j = 0;j<enumData.length;j++){

	   (function(objCAM){ 

		   	var camid = objCAM.getProperty('ID');
		   	var camtype = objCAM.getProperty('cameraType');

			describe("Camera Test with "+ camid +": " + camtype , function() {

				beforeEach(function() {
					enableFlag = false;
					decodeFlag = false;
					nulldata ='';
					document.getElementById("actResult").innerHTML = "init";
					callbackdata(nulldata);
					callbackdatauri(nulldata);
					callbackdataraw(nulldata);
					callbackststatus = false;
				});

				afterEach(function() {
					//objCAM.clearAllProperties();
				});

				it("VT285-018/019 | Call takePicture with callback as function and retruned status OK |" + camid + camtype , function() {

					runs(function()
					{
						setObjective("VT285-018/019 |Call takePicture with callback as function and retruned status OK|");
						setInstruction("Take an image " + camid);
						setExpected("The Front/Main camera or Imager should start to take picture and The retruned status should be OK and it should return tha saved image path");
						objCAM.takePicture({},callbacktake);
					});

					waitsFor(function()
					{
						return callbackststatus;
					}, '10sec wait for callback to fire', 10000);

					runs(function()
					{
						waitsFor(function() {
						return document.getElementById("actResult").innerHTML != "init";
						}, "Timed out waiting for tester to respond", 300000);
						runs(function() {
						expect("pass").toEqual(document.getElementById("actResult").innerHTML);
						});
					});
				})

				it("VT285-020 | Call takePicture with callback as function and retruned status cancel |" + camid + camtype , function() {

					runs(function()
					{
						setObjective("VT285-020 |Call takePicture with callback as function and retruned status cancel|");
						setInstruction("Cancel the taking of image " + camid);
						setExpected("The Front/Main camera or Imager should start to take picture and The retruned status should be cancel");
						objCAM.takePicture({},callbacktake);
					});

					waitsFor(function()
					{
						return callbackststatus;
					}, '10sec wait for callback to fire', 10000);

					runs(function()
					{
						waitsFor(function() {
						return document.getElementById("actResult").innerHTML != "init";
						}, "Timed out waiting for tester to respond", 300000);
						runs(function() {
						expect("pass").toEqual(document.getElementById("actResult").innerHTML);
						});
					});
				})

				it("VT285-021 | Call takePicture with callback as function and don't take any image |" + camid + camtype , function() {

					runs(function()
					{
						setObjective("VT285-020 |Call takePicture with callback as function and retruned status cancel|");
						setInstruction("Don't take any image and wait for camera to stop automatically " + camid);
						setExpected("The Front/Main camera or Imager should start to take picture and The retruned status should be cancel");
						objCAM.takePicture({},callbacktake);
					});

					waitsFor(function()
					{
						return callbackststatus;
					}, '10sec wait for callback to fire', 10000);

					runs(function()
					{
						waitsFor(function() {
						return document.getElementById("actResult").innerHTML != "init";
						}, "Timed out waiting for tester to respond", 300000);
						runs(function() {
						expect("pass").toEqual(document.getElementById("actResult").innerHTML);
						});
					});
				})

				it("VT285-022 | Call takePicture with callback as function and minimize the application |" + camid + camtype , function() {

					runs(function()
					{
						setObjective("VT285-020 |Call takePicture with callback as function and retruned status cancel|");
						setInstruction("wait for camera viewfidner to comeup then Minimize the application and restore after 5 second" + camid);
						setExpected("the camera should be in open state after restoring the application.");
						objCAM.takePicture({},callbacktake);
					});

					waitsFor(function()
					{
						return callbackststatus;
					}, '10sec wait for callback to fire', 20000);

					runs(function()
					{
						waitsFor(function() {
						return document.getElementById("actResult").innerHTML != "init";
						}, "Timed out waiting for tester to respond", 300000);
						runs(function() {
						expect("pass").toEqual(document.getElementById("actResult").innerHTML);
						});
					});
				})

				it("VT285-023 | Call takePicture with callback as function and suspend the device |" + camid + camtype , function() {

					runs(function()
					{
						setObjective("VT285-023 |Call takePicture with callback as function and suspend the device|");
						setInstruction("wait for camera viewfidner to comeup then suspend the device and resume it after 5 second" + camid);
						setExpected("the camera should be in open state after restoring the device and application.");
						objCAM.takePicture({},callbacktake);
					});

					waitsFor(function()
					{
						return callbackststatus;
					}, '10sec wait for callback to fire', 20000);

					runs(function()
					{
						waitsFor(function() {
						return document.getElementById("actResult").innerHTML != "init";
						}, "Timed out waiting for tester to respond", 300000);
						runs(function() {
						expect("pass").toEqual(document.getElementById("actResult").innerHTML);
						});
					});
				})

				it("VT285-026 | Call takePicture with propertyhash outputFormat:dataUri and callback as anonymous function |" + camid + camtype , function() {

					runs(function()
					{
						setObjective("VT285-026 |Call takePicture with propertyhash outputFormat:dataUri and callback as anonymous function|");
						setInstruction("Take any image and wait for callback to fire" + camid);
						setExpected("The retruned status should be OK and the image should be displayed on view of the application");
						objCAM.takePicture({"outputFormat":"dataUri"},function(data){callbackdatauri(data);callbackststatus = true;});
					});

					waitsFor(function()
					{
						return callbackststatus;
					}, '10sec wait for callback to fire', 10000);

					runs(function()
					{
						waitsFor(function() {
						return document.getElementById("actResult").innerHTML != "init";
						}, "Timed out waiting for tester to respond", 300000);
						runs(function() {
						expect("pass").toEqual(document.getElementById("actResult").innerHTML);
						});
					});
				})

				it("VT285-027 | Call takePicture with propertyhash outputFormat:image and check for all callback values |" + camid + camtype , function() {

					runs(function()
					{
						setObjective("VT285-026 |Call takePicture with propertyhash outputFormat:image and check for all callback values|");
						setInstruction("Take any image and wait for callback to fire" + camid);
						setExpected("The retruned image height, width should be same as saved image, Imageformat should be jpg and file anme should be defaultname and it should saved at returned URI in device");
						objCAM.takePicture({"outputFormat":"image"},callbacktake);
					});

					waitsFor(function()
					{
						return callbackststatus;
					}, '10sec wait for callback to fire', 10000);

					runs(function()
					{
						waitsFor(function() {
						return document.getElementById("actResult").innerHTML != "init";
						}, "Timed out waiting for tester to respond", 300000);
						runs(function() {
						expect("pass").toEqual(document.getElementById("actResult").innerHTML);
						});
					});
				})

				it("VT285-028 | Call takePicture with propertyhash outputFormat:dataUri and check for all callback values  |" + camid + camtype , function() {

					runs(function()
					{
						setObjective("VT285-028 |Call takePicture with propertyhash outputFormat:dataUri and callback as anonymous function|");
						setInstruction("Take any image and wait for callback to fire" + camid);
						setExpected("The retruned image height, width and imageFormat should be same as displyaed image");
						objCAM.takePicture({"outputFormat":"dataUri"},callbacktakeuri);
					});

					waitsFor(function()
					{
						return callbackststatus;
					}, '10sec wait for callback to fire', 10000);

					runs(function()
					{
						waitsFor(function() {
						return document.getElementById("actResult").innerHTML != "init";
						}, "Timed out waiting for tester to respond", 300000);
						runs(function() {
						expect("pass").toEqual(document.getElementById("actResult").innerHTML);
						});
					});
				})

				it("VT285-029 | Call takePicture with propertyhash as colorModel, desiredHeight, desiredWidth, outputFormat and callback|", function() {

					runs(function()
					{
						setObjective("VT285-029 | Call choosePicture with property as colorModel,desiredHeight,desiredWidth and callback|");
						setInstruction("take any image and Check for the color of image, and width/height");
						setExpected("The displayed image should be in grey mode, retruned image height/width should be same as the displayed image, status should be Ok");
						objCAM.takePicture({colorModel:'greyscale',desiredHeight:640,desiredWidth:480,outputFormat:'dataUri'},function(data){callbackdatauri(data);callbackststatus = true;});
					});

					waitsFor(function()
					{
						return callbackststatus;
					}, '10sec wait for callback to fire', 10000);

					runs(function()
					{
						waitsFor(function() {
						return document.getElementById("actResult").innerHTML != "init";
						}, "Timed out waiting for tester to respond", 300000);
						runs(function() {
						expect("pass").toEqual(document.getElementById("actResult").innerHTML);
						});
					});
				});

				if(!isWindowsPhone8Platform())
				{
					it("VT285-030 | maxHeight and maxWidth of camera using the retruned object of enumerate|", function() {

						runs(function()
						{
							setObjective("VT285-030 | maxHeight and maxWidth of camera using the retruned object of enumerate|");
							setInstruction("take any image and Check for the height and width");
							setExpected("The retrurned image height/width should be same as the saved image, status should be Ok");
							var Height = objCAM.maxHeight;
							var Width = objCAM.maxWidth;
							objCAM.takePicture({colorModel:'rgb',desiredHeight:Height,desiredWidth:Width,outputFormat:'image'},callbacktake);
						});

						waitsFor(function()
						{
							return callbackststatus;
						}, '10sec wait for callback to fire', 10000);

						runs(function()
						{
							waitsFor(function() {
							return document.getElementById("actResult").innerHTML != "init";
							}, "Timed out waiting for tester to respond", 300000);
							runs(function() {
							expect("pass").toEqual(document.getElementById("actResult").innerHTML);
							});
						});
					});
				}

				it("VT285-035 | Call takePicture with captureSound and callback|", function() {

					var path = "";
					runs(function()
					{
						setObjective("VT285-035 | Call takePicture with captureSound and callback|");
						setInstruction("take any image and check for played wave file while capturing image");
						setExpected("The wave file should be played while capturing the image");
						if (isWindowsMobileOrAndroidPlatform()){path = 'file://application/alarm.wav';}
						if (isApplePlatform()) { path = '';}
						if (isWindowsPhone8Platform()) { path ='file://application/alarm.wav';}
						
						objCAM.takePicture({captureSound:path,outputFormat:'image'},callbacktake);
					});

					waitsFor(function()
					{
						return callbackststatus;
					}, '10sec wait for callback to fire', 10000);

					runs(function()
					{
						waitsFor(function() {
						return document.getElementById("actResult").innerHTML != "init";
						}, "Timed out waiting for tester to respond", 300000);
						runs(function() {
						expect("pass").toEqual(document.getElementById("actResult").innerHTML);
						});
					});
				});

				it("VT285-036/037 | Call takePicture with colorModel as rgb, compressionFormat as jpg and callback|", function() {

					runs(function()
					{
						setObjective("VT285-036/037 | Call takePicture with colorModel as rgb, compressionFormat as jpg and callback|");
						setInstruction("take any image and Check for format and colorModel");
						setExpected("The saved image should be colored one and format should be jpg of that image, callback retrun fromat should be jpg too");
						objCAM.takePicture({colorModel:'rgb',compressionFormat:'jpg',outputFormat:'image'},callbacktakeraw);
					});

					waitsFor(function()
					{
						return callbackststatus;
					}, '10sec wait for callback to fire', 10000);

					runs(function()
					{
						waitsFor(function() {
						return document.getElementById("actResult").innerHTML != "init";
						}, "Timed out waiting for tester to respond", 300000);
						runs(function() {
						expect("pass").toEqual(document.getElementById("actResult").innerHTML);
						});
					});
				});

				if (!isWindowsMobileOrAndroidPlatform())
				{
					it("VT285-038 | Call takePicture with colorModel as rgb, compressionFormat as png and callback|", function() {

						runs(function()
						{
							setObjective("VT285-038 | Call takePicture with colorModel as rgb, compressionFormat as png and callback|");
							setInstruction("take any image and Check for compressionFormat");
							setExpected("The saved image should be colored one and format should be png, callback retrun fromat should be png too");
							objCAM.takePicture({colorModel:'rgb',compressionFormat:'png',outputFormat:'image'},callbacktakeraw);
						});

						waitsFor(function()
						{
							return callbackststatus;
						}, '10sec wait for callback to fire', 10000);

						runs(function()
						{
							waitsFor(function() {
							return document.getElementById("actResult").innerHTML != "init";
							}, "Timed out waiting for tester to respond", 300000);
							runs(function() {
							expect("pass").toEqual(document.getElementById("actResult").innerHTML);
							});
						});
					});
				}

				if (isApplePlatform())
				{
					it("VT285-039 | Call takePicture with enableEditing as true and callback|", function() {

						runs(function()
						{
							setObjective("VT285-039 | Call takePicture with enableEditing as true and callback|");
							setInstruction("take any image and check for photo capture image customizing");
							setExpected("It should Enable post photo capture image customizing");
							objCAM.takePicture({enableEditing:true,outputFormat:'image'},callbacktakeraw);
						});

						waitsFor(function()
						{
							return callbackststatus;
						}, '10sec wait for callback to fire', 10000);

						runs(function()
						{
							waitsFor(function() {
							return document.getElementById("actResult").innerHTML != "init";
							}, "Timed out waiting for tester to respond", 300000);
							runs(function() {
							expect("pass").toEqual(document.getElementById("actResult").innerHTML);
							});
						});
					});

					it("VT285-040 | Call takePicture with enableEditing as false and callback|", function() {

						runs(function()
						{
							setObjective("VT285-039 | Call takePicture with enableEditing as false and callback|");
							setInstruction("take any image and check for photo capture image customizing");
							setExpected("It should not Enable post photo capture image customizing");
							objCAM.takePicture({enableEditing:false,outputFormat:'image'},callbacktakeraw);
						});

						waitsFor(function()
						{
							return callbackststatus;
						}, '10sec wait for callback to fire', 10000);

						runs(function()
						{
							waitsFor(function() {
							return document.getElementById("actResult").innerHTML != "init";
							}, "Timed out waiting for tester to respond", 300000);
							runs(function() {
							expect("pass").toEqual(document.getElementById("actResult").innerHTML);
							});
						});
					});
				}

				it("VT285-042 | Call takePicture with fileName as path to the device folder with name and callback|", function() {

					runs(function()
					{
						var path ='';
						setObjective("VT285-042 | Call takePicture with fileName as path to the device folder with name and callback|");
						setInstruction("take any image and Check for captured image to be saved at application folder of device");
						setExpected("The Image should be saved at specified location with specified name with extension as jpg");

						if (isWindowsMobileOrAndroidPlatform()){path = 'file://application/Image042';}
						if (isApplePlatform()) { path = '';}
						if (isWindowsPhone8Platform()) { path ='file://application/Image042';}
						objCAM.compressionFormat = 'jpg';
						objCAM.colorModel = 'grayscale';
						objCAM.takePicture({fileName:path,outputFormat:'image'},callbacktakeraw);
					});

					waitsFor(function()
					{
						return callbackststatus;
					}, '10sec wait for callback to fire', 10000);

					runs(function()
					{
						waitsFor(function() {
						return document.getElementById("actResult").innerHTML != "init";
						}, "Timed out waiting for tester to respond", 300000);
						runs(function() {
						expect("pass").toEqual(document.getElementById("actResult").innerHTML);
						});
					});
				});

				it("VT285-043 | Call takePicture with fileName as path to the device folder without name and callback|", function() {

					runs(function()
					{
						var path ='';
						setObjective("VT285-043 | Call takePicture with fileName as path to the device folder without name and callback|");
						setInstruction("take any image and Check for captured image to be saved at application folder of device");
						setExpected("The Image should be saved at specified location with specified name with extension as jpg");

						if (isWindowsMobileOrAndroidPlatform()){path = 'file://application/';}
						if (isApplePlatform()) { path = '';}
						if (isWindowsPhone8Platform()) { path ='file://application/';}
						objCAM.compressionFormat = 'jpg';
						objCAM.colorModel = 'rgb';
						objCAM.takePicture({fileName:path,outputFormat:'image'},callbacktakeraw);
					});

					waitsFor(function()
					{
						return callbackststatus;
					}, '10sec wait for callback to fire', 10000);

					runs(function()
					{
						waitsFor(function() {
						return document.getElementById("actResult").innerHTML != "init";
						}, "Timed out waiting for tester to respond", 300000);
						runs(function() {
						expect("pass").toEqual(document.getElementById("actResult").innerHTML);
						});
					});
				});

				it("VT285-044 | Call takePicture with fileName as path to the device folder with name.exetension and callback|", function() {

					runs(function()
					{
						var path ='';
						setObjective("VT285-044 | Call takePicture with fileName as path to the device folder with name.exetension and callback|");
						setInstruction("take any image and Check for captured image to be saved at application folder of device");
						setExpected("The Image should be saved at specified location with specified name with extension as jpg");

						if (isWindowsMobileOrAndroidPlatform()){path = 'file://application/Image044.png';}
						if (isApplePlatform()) { path = '';}
						if (isWindowsPhone8Platform()) { path ='file://application/Image044.png';}
						objCAM.compressionFormat = 'jpg';
						objCAM.colorModel = 'rgb';
						objCAM.takePicture({fileName:path,outputFormat:'image'},callbacktakeraw);
					});

					waitsFor(function()
					{
						return callbackststatus;
					}, '10sec wait for callback to fire', 10000);

					runs(function()
					{
						waitsFor(function() {
						return document.getElementById("actResult").innerHTML != "init";
						}, "Timed out waiting for tester to respond", 300000);
						runs(function() {
						expect("pass").toEqual(document.getElementById("actResult").innerHTML);
						});
					});
				});

				it("VT285-045 | Call takePicture with fileName as path to the device folder with name, compressionFormat as png|", function() {

					runs(function()
					{
						var path ='';
						setObjective("VT285-045 | Call takePicture with fileName as path to the device folder with name, compressionFormat as png|");
						setInstruction("take any image and Check for captured image to be saved at application folder of device");
						setExpected("The Image should be saved at specified location with specified name with extension as png");

						if (isWindowsMobileOrAndroidPlatform()){path = 'file://application/Image045';}
						if (isApplePlatform()) { path = '';}
						if (isWindowsPhone8Platform()) { path ='file://application/Image045';}
						objCAM.compressionFormat = 'png';
						objCAM.colorModel = 'rgb';
						objCAM.takePicture({fileName:path,outputFormat:'image'},callbacktakeraw);
					});

					waitsFor(function()
					{
						return callbackststatus;
					}, '10sec wait for callback to fire', 10000);

					runs(function()
					{
						waitsFor(function() {
						return document.getElementById("actResult").innerHTML != "init";
						}, "Timed out waiting for tester to respond", 300000);
						runs(function() {
						expect("pass").toEqual(document.getElementById("actResult").innerHTML);
						});
					});
				});

				if (isWindowsMobileOrAndroidPlatform())
				{
					it("VT285-046 | Call takePicture with flashMode as on and callback|", function() {

						runs(function()
						{
							setObjective("VT285-046 | Call takePicture with flashMode as on and callback|");
							setInstruction("take any image and check for flash while taking the picture");
							setExpected("Falsh should be on while taking picture and will get off automatically after picture has taken");
							objCAM.flashMode = 'on';
							objCAM.takePicture({outputFormat:'dataUri'},callbacktakeuri);
						});

						waitsFor(function()
						{
							return callbackststatus;
						}, '10sec wait for callback to fire', 10000);

						runs(function()
						{
							waitsFor(function() {
							return document.getElementById("actResult").innerHTML != "init";
							}, "Timed out waiting for tester to respond", 300000);
							runs(function() {
							expect("pass").toEqual(document.getElementById("actResult").innerHTML);
							});
						});
					});

					it("VT285-047 | Call takePicture with flashMode as off and callback|", function() {

						runs(function()
						{
							setObjective("VT285-046 | Call takePicture with flashMode as off and callback|");
							setInstruction("take any image and check for flash while taking the picture");
							setExpected("Falsh should be off while taking picture");
							objCAM.flashMode = 'on';
							objCAM.takePicture({flashMode:'off',outputFormat:'image'},callbacktakeraw);
						});

						waitsFor(function()
						{
							return callbackststatus;
						}, '10sec wait for callback to fire', 10000);

						runs(function()
						{
							waitsFor(function() {
							return document.getElementById("actResult").innerHTML != "init";
							}, "Timed out waiting for tester to respond", 300000);
							runs(function() {
							expect("pass").toEqual(document.getElementById("actResult").innerHTML);
							});
						});
					});

					it("VT285-048 | Call takePicture with flashMode as auto and callback|", function() {

						runs(function()
						{
							setObjective("VT285-046 | Call takePicture with flashMode as auto and callback|");
							setInstruction("take any image in dark or low light and check for flash while taking the picture");
							setExpected("Falsh should be on while taking picture in low light or dark");
							objCAM.takePicture({flashMode:'auto',outputFormat:'image'},callbacktakeraw);
						});

						waitsFor(function()
						{
							return callbackststatus;
						}, '10sec wait for callback to fire', 10000);

						runs(function()
						{
							waitsFor(function() {
							return document.getElementById("actResult").innerHTML != "init";
							}, "Timed out waiting for tester to respond", 300000);
							runs(function() {
							expect("pass").toEqual(document.getElementById("actResult").innerHTML);
							});
						});
					});
				}

				if (isAndroidPlatform())
				{
					it("VT285-050 | Call takePicture with flashMode as redEye and callback|", function() {

						runs(function()
						{
							setObjective("VT285-050 | Call takePicture with flashMode as redEye and callback|");
							setInstruction("take any image and check for flash while taking the picture, check for redeye in saved image");
							setExpected("Falsh should be on while taking picture and The saved picture should not contain the redeye in it");
							objCAM.takePicture({flashMode:'redEye',outputFormat:'image'},callbacktakeraw);
						});

						waitsFor(function()
						{
							return callbackststatus;
						}, '10sec wait for callback to fire', 10000);

						runs(function()
						{
							waitsFor(function() {
							return document.getElementById("actResult").innerHTML != "init";
							}, "Timed out waiting for tester to respond", 300000);
							runs(function() {
							expect("pass").toEqual(document.getElementById("actResult").innerHTML);
							});
						});
					});

					it("VT285-051 | Call takePicture with flashMode as torch and callback|", function() {

						runs(function()
						{
							setObjective("VT285-051 | Call takePicture with flashMode as redEye and callback|");
							setInstruction("check for continoius flash to be on");
							setExpected("Flash should be on in torch mode");
							objCAM.takePicture({flashMode:'torch',outputFormat:'image'},callbacktakeraw);
						});

						waitsFor(function()
						{
							return callbackststatus;
						}, '10sec wait for callback to fire', 10000);

						runs(function()
						{
							waitsFor(function() {
							return document.getElementById("actResult").innerHTML != "init";
							}, "Timed out waiting for tester to respond", 300000);
							runs(function() {
							expect("pass").toEqual(document.getElementById("actResult").innerHTML);
							});
						});
					});				
				}

				if (isWindowsMobilePlatform())
				{
					it("VT285-052 | Call takePicture with previewHeight, previewLeft,previewTop, previewWidth  and callback|", function() {

						runs(function()
						{
							setObjective("VT285-052 | Call takePicture with previewHeight as 200, previewLeft 300,previewTop as 300, previewWidth as 200 and callback|");
							setInstruction("check for the viewfinder position");
							setExpected("The viewfinder positions should be as per the specified positions and Image should be captured successfully");
							objCAM.takePicture({previewHeight:200,previewLeft:300,previewTop:300,previewWidth:200,outputFormat:'image'},callbacktakeraw);
						});

						waitsFor(function()
						{
							return callbackststatus;
						}, '10sec wait for callback to fire', 10000);

						runs(function()
						{
							waitsFor(function() {
							return document.getElementById("actResult").innerHTML != "init";
							}, "Timed out waiting for tester to respond", 300000);
							runs(function() {
							expect("pass").toEqual(document.getElementById("actResult").innerHTML);
							});
						});
					});	

					it("VT285-053/054 | Call takePicture with previewHeight, previewLeft,previewTop, previewWidth  and callback|", function() {

						runs(function()
						{
							setObjective("VT285-053/054 | Call takePicture with previewHeight as 100, previewLeft 200,previewTop as 150, previewWidth as 100 and callback|");
							setInstruction("check for the viewfinder position");
							setExpected("viewfinder position should change with respect to previous test");
							objCAM.takePicture({previewHeight:100,previewLeft:200,previewTop:150,previewWidth:100,outputFormat:'dataUri'},callbacktakeuri);
						});

						waitsFor(function()
						{
							return callbackststatus;
						}, '10sec wait for callback to fire', 10000);

						runs(function()
						{
							waitsFor(function() {
							return document.getElementById("actResult").innerHTML != "init";
							}, "Timed out waiting for tester to respond", 300000);
							runs(function() {
							expect("pass").toEqual(document.getElementById("actResult").innerHTML);
							});
						});
					});				
				}

				if (isAndroidOrApplePlatform())
				{
					it("VT285-058 | Call takePicture with saveToDeviceGallery as true and callback|", function() {

						runs(function()
						{
							setObjective("VT285-058 | Call takePicture with saveToDeviceGallery as true and callback|");
							setInstruction("take any image and check for location of image is saved");
							setExpected("The Image should get saved at DeviceGallery and imageuri should retrun the path of device gallery");
							objCAM.takePicture({outputFormat:'image',saveToDeviceGallery:true},callbacktakeraw);
						});

						waitsFor(function()
						{
							return callbackststatus;
						}, '10sec wait for callback to fire', 10000);

						runs(function()
						{
							waitsFor(function() {
							return document.getElementById("actResult").innerHTML != "init";
							}, "Timed out waiting for tester to respond", 300000);
							runs(function() {
							expect("pass").toEqual(document.getElementById("actResult").innerHTML);
							});
						});
					});

					it("VT285-059 | Call takePicture with saveToDeviceGallery as false and callback|", function() {

						runs(function()
						{
							setObjective("VT285-059 | Call takePicture with saveToDeviceGallery as false and callback|");
							setInstruction("take any image and check for location of image is saved");
							setExpected("The Image should not get saved at DeviceGallery and imageuri should not retrun the path of device gallery");
							objCAM.takePicture({outputFormat:'image',saveToDeviceGallery:false},callbacktakeraw);
						});

						waitsFor(function()
						{
							return callbackststatus;
						}, '10sec wait for callback to fire', 10000);

						runs(function()
						{
							waitsFor(function() {
							return document.getElementById("actResult").innerHTML != "init";
							}, "Timed out waiting for tester to respond", 300000);
							runs(function() {
							expect("pass").toEqual(document.getElementById("actResult").innerHTML);
							});
						});
					});		

					it("VT285-060 | Call takePicture with saveToDeviceGallery as false, fileName and callback|", function() {

						runs(function()
						{
							var path ='';
							setObjective("VT285-060 | Call takePicture with saveToDeviceGallery as false, fileName and callback|");
							setInstruction("take any image and check for location of image is saved");
							setExpected("The Image should not get saved at DeviceGallery and imageuri should retrun the path of saved image at application folder");

							if (isWindowsMobileOrAndroidPlatform()){path = 'file://application/Image060';}
							if (isApplePlatform()) { path = '';}
							if (isWindowsPhone8Platform()) { path ='file://application/Image060';}

							objCAM.takePicture({outputFormat:'image',saveToDeviceGallery:false,fileName:path},callbacktakeraw);
						});

						waitsFor(function()
						{
							return callbackststatus;
						}, '10sec wait for callback to fire', 10000);

						runs(function()
						{
							waitsFor(function() {
							return document.getElementById("actResult").innerHTML != "init";
							}, "Timed out waiting for tester to respond", 300000);
							runs(function() {
							expect("pass").toEqual(document.getElementById("actResult").innerHTML);
							});
						});
					});	

					it("VT285-061 | Call takePicture with saveToDeviceGallery as true, fileName and callback|", function() {

						runs(function()
						{
							var path ='';
							setObjective("VT285-061 | Call takePicture with saveToDeviceGallery as true, fileName and callback|");
							setInstruction("take any image and check for location of image is saved");
							setExpected("The Image should not get saved at DeviceGallery and imageuri should retrun the path of application folder");

							if (isWindowsMobileOrAndroidPlatform()){path = 'file://application/Image060';}
							if (isApplePlatform()) { path = '';}
							if (isWindowsPhone8Platform()) { path ='file://application/Image060';}

							objCAM.takePicture({outputFormat:'image',saveToDeviceGallery:true,fileName:path},callbacktakeraw);
						});

						waitsFor(function()
						{
							return callbackststatus;
						}, '10sec wait for callback to fire', 10000);

						runs(function()
						{
							waitsFor(function() {
							return document.getElementById("actResult").innerHTML != "init";
							}, "Timed out waiting for tester to respond", 300000);
							runs(function() {
							expect("pass").toEqual(document.getElementById("actResult").innerHTML);
							});
						});
					});	
				}

				if (isAndroidPlatform())
				{
					it("VT285-063 | supportedSizeList of camera using the retruned object of enumerate|", function() {

						runs(function()
						{
							setObjective("VT285-063 | supportedSizeList of camera using the retruned object of enumerate|");
							setInstruction("check for callback");
							setExpected("The supported resolution should return");
							var data = objCAM.supportedSizeList;
							callbacktakeraw(data);
						});

						waitsFor(function()
						{
							return callbackststatus;
						}, '10sec wait for callback to fire', 2000);

						runs(function()
						{
							waitsFor(function() {
							return document.getElementById("actResult").innerHTML != "init";
							}, "Timed out waiting for tester to respond", 300000);
							runs(function() {
							expect("pass").toEqual(document.getElementById("actResult").innerHTML);
							});
						});
					});

					it("VT285-064 | Call takePicture with useSystemViewfinder as true and with callback|", function() {

						runs(function()
						{
							setObjective("VT285-064 | Call takePicture with useSystemViewfinder as true and with callback|");
							setInstruction("Check for the open viewfinder and take any image");
							setExpected("System viewfinder should open to take the image and image should save successfully at device gallery");
							objCAM.takePicture({outputFormat:'image',useSystemViewfinder:true},callbacktakeraw);
						});

						waitsFor(function()
						{
							return callbackststatus;
						}, '10sec wait for callback to fire', 10000);

						runs(function()
						{
							waitsFor(function() {
							return document.getElementById("actResult").innerHTML != "init";
							}, "Timed out waiting for tester to respond", 300000);
							runs(function() {
							expect("pass").toEqual(document.getElementById("actResult").innerHTML);
							});
						});
					});

					it("VT285-065 | Call takePicture with useSystemViewfinder as false and with callback|", function() {

						runs(function()
						{
							setObjective("VT285-065 | Call takePicture with useSystemViewfinder as false and with callback|");
							setInstruction("Check for the open viewfinder and take any image");
							setExpected("Rhodes viewfinder should open to take the image and image should save successfully at device gallery");
							objCAM.takePicture({outputFormat:'image',useSystemViewfinder:false},callbacktakeraw);
						});

						waitsFor(function()
						{
							return callbackststatus;
						}, '10sec wait for callback to fire', 10000);

						runs(function()
						{
							waitsFor(function() {
							return document.getElementById("actResult").innerHTML != "init";
							}, "Timed out waiting for tester to respond", 300000);
							runs(function() {
							expect("pass").toEqual(document.getElementById("actResult").innerHTML);
							});
						});
					});

					it("VT285-066 | Call takePicture with useSystemViewfinder as true, outputFormat as Datauri and with callback|", function() {

						runs(function()
						{
							setObjective("VT285-066 | Call takePicture with useSystemViewfinder as true, outputFormat as Datauri and with callback|");
							setInstruction("Check for the open viewfinder and take any image");
							setExpected("System viewfinder should open to take the image and image should displayed successfully on application");
							objCAM.takePicture({outputFormat:'dataUri',useSystemViewfinder:true},callbacktakeuri);
						});

						waitsFor(function()
						{
							return callbackststatus;
						}, '10sec wait for callback to fire', 10000);

						runs(function()
						{
							waitsFor(function() {
							return document.getElementById("actResult").innerHTML != "init";
							}, "Timed out waiting for tester to respond", 300000);
							runs(function() {
							expect("pass").toEqual(document.getElementById("actResult").innerHTML);
							});
						});
					});

					it("VT285-067 | Call takePicture with useSystemViewfinder as true, outputFormat as Datauri and with callback|", function() {

						runs(function()
						{
							var path='';
							setObjective("VT285-067 | Call takePicture with useSystemViewfinder as true, outputFormat as Datauri and with callback|");
							setInstruction("Check for the open viewfinder and take any image");
							setExpected("System viewfinder should open to take the image and image should displayed successfully on application");

							if (isWindowsMobileOrAndroidPlatform()){path = 'file://application/Image067';}
							if (isApplePlatform()) { path = '';}
							if (isWindowsPhone8Platform()) { path ='file://application/Image067';}

							objCAM.takePicture({outputFormat:'dataUri',useSystemViewfinder:true,saveToDeviceGallery:false,fileName:path},callbacktakeuri);
						});

						waitsFor(function()
						{
							return callbackststatus;
						}, '10sec wait for callback to fire', 10000);

						runs(function()
						{
							waitsFor(function() {
							return document.getElementById("actResult").innerHTML != "init";
							}, "Timed out waiting for tester to respond", 300000);
							runs(function() {
							expect("pass").toEqual(document.getElementById("actResult").innerHTML);
							});
						});
					});

					it("VT285-068/069 | Call takePicture with useSystemViewfinder as true and other properties|", function() {

						runs(function()
						{
							setObjective("VT285-068/069 | Call takePicture with useSystemViewfinder as true and other properties|");
							setInstruction("Check for the open viewfinder and take any image");
							setExpected("The Image should be of grey color and resolution should be 640 and 480");
							objCAM.desiredHeight = 480;
							objCAM.desiredHeight = 640;
							objCAM.colorModel = 'greyscale';
							objCAM.takePicture({outputFormat:'image',useSystemViewfinder:true},callbacktaketake);
						});

						waitsFor(function()
						{
							return callbackststatus;
						}, '10sec wait for callback to fire', 10000);

						runs(function()
						{
							waitsFor(function() {
							return document.getElementById("actResult").innerHTML != "init";
							}, "Timed out waiting for tester to respond", 300000);
							runs(function() {
							expect("pass").toEqual(document.getElementById("actResult").innerHTML);
							});
						});
					});

					it("VT285-070 | Call takePicture with useSystemViewfinder as true, captureSound,flashMode and callback|", function() {

						runs(function()
						{
							var path='';
							setObjective("VT285-070 | Call takePicture with useSystemViewfinder as true, captureSound and callback|");
							setInstruction("Check for the open viewfinder and take any image");
							setExpected("it should be system viewfinder and the Image should be of rgb and resolution should be 1280x720 than prev, sound should play and flash should come");

							if (isWindowsMobileOrAndroidPlatform()){path = 'file://application/alarm.wav';}
							if (isApplePlatform()) { path = '';}
							if (isWindowsPhone8Platform()) { path ='file://application/alarm.wav';}

							objCAM.desiredHeight = 1280;
							objCAM.desiredHeight = 720;
							objCAM.colorModel = 'rgb';
							objCAM.takePicture({outputFormat:'image',useSystemViewfinder:true,flashMode:'on',captureSound:path},callbacktaketake);
						});

						waitsFor(function()
						{
							return callbackststatus;
						}, '10sec wait for callback to fire', 10000);

						runs(function()
						{
							waitsFor(function() {
							return document.getElementById("actResult").innerHTML != "init";
							}, "Timed out waiting for tester to respond", 300000);
							runs(function() {
							expect("pass").toEqual(document.getElementById("actResult").innerHTML);
							});
						});
					});
				}
			});	

		})(enumData[j]);

	}
});	


describe("Camera Test for choosePicture()", function() {

	var ENABLE5K = 5000;
	var ENABLE1K = 1000;
	var callbackststatus = false;

	var callbackchoose = function (data){
			callbackdata(data);
			callbackststatus = true;
	}

	var callbackchooseuri = function (data){
			callbackdatauri(data);
			callbackststatus = true;
	}

	var callbackchooseraw = function (data){
			callbackdataraw(JSON.stringify(data));
			callbackststatus = true;
	}

	beforeEach(function() {
		var nulldata ='';
		document.getElementById("actResult").innerHTML = "init";
		callbackdata(nulldata);
		callbackdataraw(nulldata);
		callbackdatauri(nulldata);
		callbackststatus = false;
	});

	afterEach(function() {
		//objCAM.clearAllProperties();
	});

	for (var j = 0;j<enumData.length;j++){

		(function(objCAM){

			EB.Camera.setDefault(objCAM);

			it("VT285-001/006/007 | Call choosePicture with callback as function and retruned status OK |", function() {

				runs(function()
				{
					setObjective("VT285-001/006/007 |Call choosePicture with callback as function and retruned status OK|");
					setInstruction("choose the image ");
					setExpected("The retruned status should be OK and uri of the image should be returned");
					EB.Camera.choosePicture({},callbackchoose);
				});

				waitsFor(function()
				{
					return callbackststatus;
				}, '10sec wait for callback to fire', 10000);

				runs(function()
				{
					waitsFor(function() {
					return document.getElementById("actResult").innerHTML != "init";
					}, "Timed out waiting for tester to respond", 300000);
					runs(function() {
					expect("pass").toEqual(document.getElementById("actResult").innerHTML);
					});
				});
			});

			it("VT285-002 | Call choosePicture with callback as function and retruned status cancel |" , function() {

				runs(function()
				{
					setObjective("VT285-002 | Call choosePicture with callback as function and retruned status cancel |");
					setInstruction("Cancel the choosing of image");
					setExpected("The retruned status should be cancel");
					EB.Camera.choosePicture({},callbackchoose);
					setTimeout(function() {
						enableFlag = true;
					}, ENABLE5K);
				});

				waitsFor(function()
				{
					return callbackststatus;
				}, '10sec wait for callback to fire', 10000);

				runs(function()
				{
					waitsFor(function() {
					return document.getElementById("actResult").innerHTML != "init";
					}, "Timed out waiting for tester to respond", 300000);
					runs(function() {
					expect("pass").toEqual(document.getElementById("actResult").innerHTML);
					});
				});
			});

			it("VT285-003 | Call choosePicture with callback as function and retruned status error |", function() {

				runs(function()
				{
					setObjective("VT285-003 | Call choosePicture with callback as function and retruned status error|");
					setInstruction("Choose some other file instead of image file");
					setExpected("The retruned status should be error and messge should containg the information on error");
					EB.Camera.choosePicture({},callbackchoose);
				});

				waitsFor(function()
				{
					return callbackststatus;
				}, '10sec wait for callback to fire', 10000);

				runs(function()
				{
					waitsFor(function() {
					return document.getElementById("actResult").innerHTML != "init";
					}, "Timed out waiting for tester to respond", 300000);
					runs(function() {
					expect("pass").toEqual(document.getElementById("actResult").innerHTML);
					});
				});
			});

			it("VT285-005 | Call choosePicture with callback as anonymous function |", function() {

				runs(function()
				{
					setObjective("VT285-003 | Call choosePicture with callback as anonymous function|");
					setInstruction("choose the image and .Check for the retruned  URI of choosen image");
					setExpected("uri of the choosen image should be returned in callback");
					EB.Camera.choosePicture({},function(data){callbackrawdata(JSON.stringify(data));callbackststatus = true;});
				});

				waitsFor(function()
				{
					return callbackststatus;
				}, '10sec wait for callback to fire', 10000);

				runs(function()
				{
					waitsFor(function() {
					return document.getElementById("actResult").innerHTML != "init";
					}, "Timed out waiting for tester to respond", 300000);
					runs(function() {
					expect("pass").toEqual(document.getElementById("actResult").innerHTML);
					});
				});
			});

			it("VT285-006 | Call choosePicture with outputFormat:dataUri and check for all retrun data |", function() {

				runs(function()
				{
					setObjective("VT285-006 | Call choosePicture with outputFormat:dataUri and callback function|");
					setInstruction("choose the image and Check for all retrun data with datauri");
					setExpected("The Image should be disaplayed in View of the application, retruned image height/width should be same as the displayed image, status should be Ok");
					EB.Camera.choosePicture({"outputFormat":'dataUri'},callbackchooseuri);
				});

				waitsFor(function()
				{
					return callbackststatus;
				}, '10sec wait for callback to fire', 10000);

				runs(function()
				{
					waitsFor(function() {
					return document.getElementById("actResult").innerHTML != "init";
					}, "Timed out waiting for tester to respond", 300000);
					runs(function() {
					expect("pass").toEqual(document.getElementById("actResult").innerHTML);
					});
				});
			});

			it("VT285-007 | Call choosePicture with outputFormat:image and check for all retrun data|", function() {

				runs(function()
				{
					setObjective("VT285-007 | Call choosePicture with outputFormat:image and check for all retrun data|");
					setInstruction("choose the image and Check for all retrun data with saved image");
					setExpected("The retruned image format should be same with the saved image format in device (default Jpg), retruned image height/width should be same as the displayed image, status should be Ok");
					EB.Camera.choosePicture({"outputFormat":'image'},callbackchooseraw);
				});

				waitsFor(function()
				{
					return callbackststatus;
				}, '10sec wait for callback to fire', 10000);

				runs(function()
				{
					waitsFor(function() {
					return document.getElementById("actResult").innerHTML != "init";
					}, "Timed out waiting for tester to respond", 300000);
					runs(function() {
					expect("pass").toEqual(document.getElementById("actResult").innerHTML);
					});
				});
			});

			it("VT285-008 | Call choosePicture with property as colorModel:grayscale and callback|", function() {

				runs(function()
				{
					setObjective("VT285-008 | Call choosePicture with outputFormat:image and check for all retrun data|");
					setInstruction("choose the image and Check for the color of image");
					setExpected("The displayed image should be in grey mode");
					EB.Camera.choosePicture({colorModel:'grayscale'},function(data){callbackdatauri(data);callbackststatus = true;});
				});

				waitsFor(function()
				{
					return callbackststatus;
				}, '10sec wait for callback to fire', 10000);

				runs(function()
				{
					waitsFor(function() {
					return document.getElementById("actResult").innerHTML != "init";
					}, "Timed out waiting for tester to respond", 300000);
					runs(function() {
					expect("pass").toEqual(document.getElementById("actResult").innerHTML);
					});
				});
			});

			it("VT285-009 | Call choosePicture with property as colorModel,desiredHeight,desiredWidth and callback|", function() {

				runs(function()
				{
					setObjective("VT285-009 | Call choosePicture with property as colorModel,desiredHeight,desiredWidth and callback|");
					setInstruction("choose the image and Check for the color of image");
					setExpected("The displayed image should be in rgb mode, retruned image height/width should be same as the displayed image, status should be Ok");
					EB.Camera.choosePicture({colorModel:'rgb',desiredHeight:640,desiredWidth:480},function(data){callbackdatauri(data);callbackststatus = true;});
				});

				waitsFor(function()
				{
					return callbackststatus;
				}, '10sec wait for callback to fire', 10000);

				runs(function()
				{
					waitsFor(function() {
					return document.getElementById("actResult").innerHTML != "init";
					}, "Timed out waiting for tester to respond", 300000);
					runs(function() {
					expect("pass").toEqual(document.getElementById("actResult").innerHTML);
					});
				});
			});

			it("VT285-071 | Call getCameraByType with Main/back and callback as function|", function() {

				runs(function()
				{
					setObjective("VT285-071 | Call getCameraByType with Main/back and callback as function|");
					setInstruction("check for callback to fire");
					setExpected("The return values should be main camera object and the main camera should open to take picture");
					var cam = EB.Camera.CameraType;
					EB.Camera.getCameraByType(cam,callbackchooseraw);
				});

				waitsFor(function()
				{
					return callbackststatus;
				}, '10sec wait for callback to fire', 10000);

				runs(function()
				{
					waitsFor(function() {
					return document.getElementById("actResult").innerHTML != "init";
					}, "Timed out waiting for tester to respond", 300000);
					runs(function() {
					expect("pass").toEqual(document.getElementById("actResult").innerHTML);
					});
				});
			});

			it("VT285-073 | Call getCameraByType with main/ front and callback as anonymous function|", function() {

				runs(function()
				{
					setObjective("VT285-073 | Call getCameraByType with main/ front and callback as anonymous function|");
					setInstruction("check for callback to fire");
					setExpected("The return values should be main camera object and the main camera should open to take picture");
					var cam = EB.Camera.CameraType;
					EB.Camera.getCameraByType(cam,function(data){callbackdataraw(data);callbackststatus = true;});
				});

				waitsFor(function()
				{
					return callbackststatus;
				}, '10sec wait for callback to fire', 10000);

				runs(function()
				{
					waitsFor(function() {
					return document.getElementById("actResult").innerHTML != "init";
					}, "Timed out waiting for tester to respond", 300000);
					runs(function() {
					expect("pass").toEqual(document.getElementById("actResult").innerHTML);
					});
				});
			});

			it("VT285-074 | Call getCameraByType with main/ front and no callback (Synchronous Access)|", function() {

				runs(function()
				{
					setObjective("VT285-074 | Call getCameraByType with main/ front and no callback (Synchronous Access)|");
					setInstruction("check for callback to fire");
					setExpected("The return values should be main camera object and the main camera should open to take picture");
					var cam = EB.Camera.CameraType;
					var data = EB.Camera.getCameraByType(cam);
					callbackchooseraw(data);
				});

				waitsFor(function()
				{
					return callbackststatus;
				}, '10sec wait for callback to fire', 10000);

				runs(function()
				{
					waitsFor(function() {
					return document.getElementById("actResult").innerHTML != "init";
					}, "Timed out waiting for tester to respond", 300000);
					runs(function() {
					expect("pass").toEqual(document.getElementById("actResult").innerHTML);
					});
				});
			});

			it("VT285-075| Call setDefault with front/Main camera |" + camid + camtype , function() {

					runs(function()
					{
						setObjective("VT285-075 |Call setDefault with front/Main camera|");
						setInstruction("Take an image " + camid);
						setExpected("The Front/main camera should start to take picture as it has set to default object");
						EB.Camera.takePicture({},callbackchooseraw);
					});

					waitsFor(function()
					{
						return callbackststatus;
					}, '10sec wait for callback to fire', 10000);

					runs(function()
					{
						waitsFor(function() {
						return document.getElementById("actResult").innerHTML != "init";
						}, "Timed out waiting for tester to respond", 300000);
						runs(function() {
						expect("pass").toEqual(document.getElementById("actResult").innerHTML);
						});
					});
			})

			if (isAndroidOrApplePlatform())
			{
				it("VT285-079| Call saveImageToDeviceGallery after takepicture |" + camid + camtype , function() {

						runs(function()
						{
							var path= '';
							setObjective("VT285-079 |Call saveImageToDeviceGallery after takepicture|");
							setInstruction("Take an image " + camid);
							setExpected("The Image should be saved at device gallery");
							EB.Camera.takePicture({saveToDeviceGallery:false},function(data){path = data.imageUri;callbackststatus = true;});
							saveImageToDeviceGallery(path);
						});

						waitsFor(function()
						{
							return callbackststatus;
						}, '10sec wait for callback to fire', 10000);

						runs(function()
						{
							waitsFor(function() {
							return document.getElementById("actResult").innerHTML != "init";
							}, "Timed out waiting for tester to respond", 300000);
							runs(function() {
							expect("pass").toEqual(document.getElementById("actResult").innerHTML);
							});
						});
				})

				it("VT285-080| Call saveImageToDeviceGallery after choosepicture |" + camid + camtype , function() {

						runs(function()
						{
							var path= '';
							setObjective("VT285-080 |Call saveImageToDeviceGallery after choosepicture|");
							setInstruction("choose an image " + camid);
							setExpected("The Image should be saved at device gallery");
							EB.Camera.choosePicture({saveToDeviceGallery:false},function(data){path = data.imageUri;callbackststatus = true;});
							saveImageToDeviceGallery(path);
						});

						waitsFor(function()
						{
							return callbackststatus;
						}, '10sec wait for callback to fire', 10000);

						runs(function()
						{
							waitsFor(function() {
							return document.getElementById("actResult").innerHTML != "init";
							}, "Timed out waiting for tester to respond", 300000);
							runs(function() {
							expect("pass").toEqual(document.getElementById("actResult").innerHTML);
							});
						});
				})

				it("VT285-081| Call saveImageToDeviceGallery with pathToImage |" + camid + camtype , function() {

						runs(function()
						{
							var path= '';
							setObjective("VT285-081 |Call saveImageToDeviceGallery with pathToImage|");
							setInstruction("choose an image " + camid);
							setExpected("The Image should be saved at device gallery");

							if (isWindowsMobileOrAndroidPlatform()){path = 'file://application/Image067';}
							if (isApplePlatform()) { path = '';}
							if (isWindowsPhone8Platform()) { path ='file://application/Image067';}

							saveImageToDeviceGallery(path);
						});

						waitsFor(function()
						{
							return callbackststatus;
						}, '10sec wait for callback to fire', 10000);

						runs(function()
						{
							waitsFor(function() {
							return document.getElementById("actResult").innerHTML != "init";
							}, "Timed out waiting for tester to respond", 300000);
							runs(function() {
							expect("pass").toEqual(document.getElementById("actResult").innerHTML);
							});
						});
				})
			}

			it("VT285-082| Call getAllProperties without any callback |" + camid + camtype , function() {

					runs(function()
					{
						setObjective("VT285-082 |Call getAllProperties without any callback|");
						setInstruction("check all the properties has retruened with deafult value or not " + camid);
						setExpected("It should return all the properties of camera with it's default value");
						var data = EB.Camera.getAllProperties();
						callbackchooseraw(data);
					});

					waitsFor(function()
					{
						return callbackststatus;
					}, '10sec wait for callback to fire', 10000);

					runs(function()
					{
						waitsFor(function() {
						return document.getElementById("actResult").innerHTML != "init";
						}, "Timed out waiting for tester to respond", 300000);
						runs(function() {
						expect("pass").toEqual(document.getElementById("actResult").innerHTML);
						});
					});
			})

			it("VT285-083| Call getAllProperties with Anonymous callback |" + camid + camtype , function() {

					runs(function()
					{
						setObjective("VT285-083 |Call getAllProperties with Anonymous callback|");
						setInstruction("check all the properties has retruened with deafult value or not " + camid);
						setExpected("It should return all the properties of camera with it's default value");
						EB.Camera.getSupportedProperties(function(data){callbackdataraw(data);callbackststatus = true;});
					});

					waitsFor(function()
					{
						return callbackststatus;
					}, '10sec wait for callback to fire', 10000);

					runs(function()
					{
						waitsFor(function() {
						return document.getElementById("actResult").innerHTML != "init";
						}, "Timed out waiting for tester to respond", 300000);
						runs(function() {
						expect("pass").toEqual(document.getElementById("actResult").innerHTML);
						});
					});
			})

		})(enumData[j]);

	}
});	
