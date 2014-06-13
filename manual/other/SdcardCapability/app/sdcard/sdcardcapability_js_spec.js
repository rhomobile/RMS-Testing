describe('SDcard capability tests using different APIs', function(){

	describe('SDcard capability READ tests using different APIs', function(){
		
		beforeEach(function() {
			document.getElementById("actResult").innerHTML = "init";
			document.getElementById("clbkStatus").innerHTML = "";
			document.getElementById("clbkURI").innerHTML = "";
		});
		
		it("VT295-070 : ReadAll with valid file path| true",function(){
			displayObjective(jasmine.getEnv().currentSpec.description);
			
			_result.waitToRunTest();
			
			runs(function () {
				var testReadPath = '/sdcard/Temp/myfile.txt';
				var fOpen = new Rho.RhoFile(testReadPath,Rho.RhoFile.OPEN_FOR_READ);
				var data = fOpen.readAll();
				expect(!!data && !!data.length && data.length > 0).toEqual(true);
				fOpen.close();
			});
		});
		
		it("Mediaplayer API - play audio from sdcard |", function () {
			
		    displayObjective(jasmine.getEnv().currentSpec.description);
            dispTestCaseRunning("Make sure there is a audio file called myaudio.mp3 at '/sdcard/Temp/'");
            dispExpectedResult("Mediaplayer API should be play audio.mp3 from the sdcard at '/sdcard/Temp/'");
       
			_result.waitToRunTest();
			
			runs(function () {
				if(Rho.RhoFile.exists('/sdcard/Temp/myaudio.mp3')){
					Rho.Mediaplayer.start('/sdcard/Temp/myaudio.mp3');
					
					setTimeout(function(){
						Rho.Mediaplayer.stop();
					},15000);
				}
				else{
					document.getElementById("actResult").innerHTML = "<br/>File Not Exist";
				}
			});
			
			_result.waitForResponse();
		});
		
		it("Mediaplayer API - play Video from sdcard |", function () {
			
		    displayObjective(jasmine.getEnv().currentSpec.description);
            dispTestCaseRunning("Make sure there is a audio file called myvideo.mp4 at '/sdcard/Temp/'");
            dispExpectedResult("Mediaplayer API should be play myvideo.mp4 from the sdcard at '/sdcard/Temp/'");
       
			_result.waitToRunTest();
			
			runs(function () {
				if(Rho.RhoFile.exists('/sdcard/Temp/myvideo.mp4')){
					Rho.Mediaplayer.startvideo('/sdcard/Temp/myvideo.mp4');
					
					setTimeout(function(){
						Rho.Mediaplayer.stopvideo();
					},15000);
				}
				else{
					document.getElementById("actResult").innerHTML = "<br/>File Not Exist";
				}
			});
			
			_result.waitForResponse();
		});
	
	});
	
	


	describe('SDcard capability READ & WRITE tests using different APIs', function(){
	
		var filePath = '';
		var message = '';
		var callbackStatus = false;
		var waitFlag = false;
		
		beforeEach(function() {
			filePath = '';
			message = '';
			callbackStatus = false;
			waitFlag = false;
			document.getElementById("actResult").innerHTML = "init";
			document.getElementById("clbkStatus").innerHTML = "";
			document.getElementById("clbkURI").innerHTML = "";
		});
		
		var audioCallBack = function (args) {
			if(args['fileName']){
				filePath = args.fileName.substring(7);
				document.getElementById("clbkURI").innerHTML = filePath;
			}
			if(args['message']){
				message = args['message'];
			}
			if(args['status']){
				document.getElementById("clbkStatus").innerHTML = args['status'];
			}
			
			if(Rho.RhoFile.exists(filePath)){
				// Audio Play
				Rho.Mediaplayer.start(filePath);
				setTimeout(function(){
					Rho.Mediaplayer.stop();
				},30000);
			}
			else{
				document.getElementById("actResult").innerHTML = document.getElementById("actResult").innerHTML + "<br/>File Not Exist";
			}
			
			callbackStatus = true;		
		};
		
		var onCaptured = function (args) {
			if(Rho.RhoFile.exists('/sdcard/Temp/video_captured.mp4')){
				Rho.Mediaplayer.startvideo('/sdcard/Temp/video_captured.mp4');
				setTimeout(function(){
					Rho.Mediaplayer.stopvideo();
				},10000);
			}else{
				document.getElementById("actResult").innerHTML = document.getElementById("actResult").innerHTML + "<br/>File Not Exist";
			}
		};
		
		var callbackImage = function (data) {
			document.getElementById("clbkStatus").innerHTML = data.status;
			document.getElementById("clbkURI").innerHTML = data.imageUri;
			$("#capturedImage").attr('src', data.imageUri);
			callbackStatus = true;
		};
		
		var enumImagers = function (imagerArray){
			imager.enabled = imagerArray[0][0]
			waitFlag = true;
		}

		it('AudioCapture start with filename set to "/sdcard/Temp/myaudio"', function () {
			
			displayObjective(jasmine.getEnv().currentSpec.description);
            dispTestCaseRunning("Capture Audio for 15 seconds");
            dispExpectedResult("After 15secs of audio capture, it should play automatically using mediaplayer API");
            
			_result.waitToRunTest();
			
			var dirName = "/sdcard/Temp";
			var isDirExists = Rho.RhoFile.isDir(dirName);
			if(isDirExists == false){
				Rho.RhoFile.makeDir(dirName);
			}				
			
			runs(function(){
				Rho.AudioCapture.start({'fileName': "/sdcard/Temp/myaudio", 'maxDuration': 10000}, audioCallBack);
			});
			
			waitsFor(function(){
				return callbackStatus;
			},"Waiting for audio capture to finished",15000);
				
			_result.waitForResponse();
		});


		it("Signature takeFullScreen with callback |", function () {

            displayObjective("VT299-001 |Call takeFullScreen with callback as function and returned status OK|");
            dispTestCaseRunning("Wait for 10 sec for Fullscreen Signature box to comeup and press capture after drawing any signature on signature area");
            dispExpectedResult("The returned status should be OK and path of the captured signature image should be returned (Image should be rendered on page)");
            
			_result.waitToRunTest();
			
			var readFlag= false;
			var dirName = "/sdcard/Temp";
			var isDirExists = Rho.RhoFile.isDir(dirName);
			if(isDirExists == false){
				Rho.RhoFile.makeDir(dirName);
			}
			
            runs(function () {
                Rho.Signature.fileName = 'sdcard/Temp/signature_capture';
                Rho.Signature.takeFullScreen({}, callbackImage);
                setTimeout(function () {
					readFlag = true;
				}, 9000);
            });
            
			waitsFor(function () {
                return readFlag || callbackStatus;
            }, 'wait to callback to fire or timeout', 10000);

            runs(function () {
                Rho.Signature.hide();
            });
			
			_result.waitForResponse();
		});
		
		
		xit("Imager API - Capture and save the file in sdcard |", function () {
			
		    displayObjective(jasmine.getEnv().currentSpec.description);
            dispTestCaseRunning("Imager API - will enumerate and use the first available imager to capture and save in the sdcard path '/sdcard/Temp/'");
            dispExpectedResult("Image should be saved in the sdcard at '/sdcard/Temp/' as imager_capture.bmp");
       
			_result.waitToRunTest();
			
			var dirName = "/sdcard/Temp";
			var isDirExists = Rho.RhoFile.isDir(dirName);
			if(isDirExists == false){
				Rho.RhoFile.makeDir(dirName);
			}
			runs(function () {
				imager.imagerEnumEvent="enumImagers(%s);";
			});
			
			waitsFor(function () {
				return waitFlag;
			}, 'wait to callback to fire', 7000);
			 
			runs(function () {
				imager.height=200;
				imager.width=100;
				imager.destination = '/sdcard/Temp/imager_capture'
				imager.capture();
				
				waitFlag = false;
				setTimeout(function () {
					waitFlag = true;
				}, 7000);
			})
			
			waitsFor(function () {
				return waitFlag;
			}, 'wait for timeout', 7000);
			
			runs(function () {
				expect(waitFlag).toBeTruthy();
				expect(Rho.RhoFile.exists('/sdcard/Temp/imager_capture.bmp')).toBeTruthy();
				imager.disable();
			});
			
		});

		
		it("Network API - upload file from sdcard |", function () {
		
			displayObjective(jasmine.getEnv().currentSpec.description);
            dispTestCaseRunning("Kindly make sure image called loading.png exists in the sdcard path '/sdcard/Temp/' & connected to the same network as of the server before running this test");
            dispExpectedResult("Image file should be read from sdcard successfully & uploaded");
			
			_result.waitToRunTest();
			
			var dirName = "/sdcard/Temp";
			var isDirExists = Rho.RhoFile.isDir(dirName);
			if(isDirExists == false){
				Rho.RhoFile.makeDir(dirName);
			}
			
			var uploadfileProps = {
				url: "http://192.168.6.18/NEON/ReceivedFiles/Upload.aspx",
				filename: "/sdcard/Temp/loading.png",
				body: "uploading file",
				fileContentType: "image/png"
			};

			runs(function(){
				Rho.Network.uploadFile(uploadfileProps,  function(params){
							if (params["status"] == "ok") {
								document.getElementById("clbkStatus").innerHTML="Upload Succeeded, path is /public/images/nadaf.jpg";		
								document.getElementById("clbkStatus").innerHTML="<br>status"+params["status"]+"<br>"+
												"fileExists"+params["fileExists"];
							} else {
								document.getElementById("clbkStatus").innerHTML="Upload Failed";
								document.getElementById("clbkStatus").innerHTML="<br>status"+params["status"]+"<br>"
							}
				});
			});
		
			_result.waitForResponse();
		});
		
		xit("VideoCapture API - Capture and save the file in sdcard |", function () {
			
		    displayObjective(jasmine.getEnv().currentSpec.description);
            dispTestCaseRunning("");
            dispExpectedResult("VideoCapture should be saved in the sdcard at '/sdcard/Temp/' as video_captured.mp4");
       
			_result.waitToRunTest();
			
			var dirName = "/sdcard/Temp";
			var isDirExists = Rho.RhoFile.isDir(dirName);
			if(isDirExists == false){
				Rho.RhoFile.makeDir(dirName);
			}
			
			runs(function () {
				videoCapture.destination='/sdcard/Temp/video_captured';
				videoCapture.duration=5000;
				videoCapture.start();
				
				setTimeout(function () {
					waitFlag = true;
				}, 10000);
			});
			
			waitsFor(function () {
				return waitFlag;
			}, 'wait to callback to fire', 12000);
			
			runs(function () {
				expect(waitFlag).toBeTruthy();
				videoCapture.videoSaveEvent="onCaptured('%s')";
			});
			
			_result.waitForResponse();
		});
	});

});