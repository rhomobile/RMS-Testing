describe("Camera Manual Test", function() {
	
	var ENABLE5K = 5000;
	var ENABLE1K = 1000;
	var enumData = Rho.Camera.enumerate();
	var enableFlag = false;
	var decodeFlag = false;
	var callbackststatus = false;
	
	if(Rho.System.platform == 'ANDROID')
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
						objCAM.takePicture({colorModel:'greyscale',desiredHeight:640,desiredWidth:480,outputFormat:'dataUri'},function(data){callbackdatauri(data);callbackststatus = true;};
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

				it("VT285-030 | maxHeight and maxWidth of camera using the retruned object of enumerate|", function() {

					runs(function()
					{
						setObjective("VT285-029 | maxHeight and maxWidth of camera using the retruned object of enumerate|");
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

			Rho.Camera.setDefault(objCAM);

			it("VT285-001/006/007 | Call choosePicture with callback as function and retruned status OK |", function() {

				runs(function()
				{
					setObjective("VT285-001/006/007 |Call choosePicture with callback as function and retruned status OK|");
					setInstruction("choose the image ");
					setExpected("The retruned status should be OK and uri of the image should be returned");
					Rho.Camera.choosePicture({},callbackchoose);
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
					Rho.Camera.choosePicture({},callbackchoose);
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
					Rho.Camera.choosePicture({},callbackchoose);
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
					Rho.Camera.choosePicture({},function(data){callbackrawdata(JSON.stringify(data));callbackststatus = true;});
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
					Rho.Camera.choosePicture({"outputFormat":'dataUri'},callbackchooseuri);
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
					Rho.Camera.choosePicture({"outputFormat":'image'},callbackchooseraw);
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
					Rho.Camera.choosePicture({colorModel:'grayscale'},function(data){callbackdatauri(data);callbackststatus = true;};
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
					Rho.Camera.choosePicture({colorModel:'rgb',desiredHeight:640,desiredWidth:480},function(data){callbackdatauri(data);callbackststatus = true;};
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

		})(enumData[j]);

	}
});	
