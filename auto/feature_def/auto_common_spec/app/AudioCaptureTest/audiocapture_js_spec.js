describe('Rho.AudioCapture JS API', function () {

    describe('Rho.AudioCapture APIs Set Test', function () {
	
		if (["WINDOWS", "ANDROID", "APPLE"].indexOf(Rho.System.platform) != -1) {
			describe('getting property default value', function () {

				it('Should get maxDuration default value', function () {
					expect(Rho.AudioCapture.maxDuration).toEqual(20000);
				});

				/* --fileName is mandatory hence removed--
				it('Should get fileName default value', function () {
					expect(Rho.AudioCapture.fileName).toEqual('AudioCapture');
				});
				
                --source has been removed--
				it('Should get source default value', function () {
					expect(Rho.AudioCapture.source).toEqual(Rho.AudioCapture.MIC);
				});    */
			});
	
		}
		if (["ANDROID"].indexOf(Rho.System.platform) != -1) {
			describe('getting property default value', function () {

				it('Should get encoder default value', function () {
					expect(Rho.AudioCapture.encoder).toEqual(Rho.AudioCapture.ENCODER_AAC);
				});
				
			});    
		}
	
        if (["ANDROID"].indexOf(Rho.System.platform) != -1) {
            describe('Setting encoder', function () {
                it('Should Set encoder to ENCODER_AAC using direct calling method', function () {
                    Rho.AudioCapture.encoder = Rho.AudioCapture.ENCODER_AAC;
                    expect(Rho.AudioCapture.encoder).toEqual(Rho.AudioCapture.ENCODER_AAC);
                });
                it('Should Set encoder to AAC using setProperty calling method', function () {
                    Rho.AudioCapture.setProperty('encoder', Rho.AudioCapture.ENCODER_AAC);
                    expect(Rho.AudioCapture.getProperty('encoder')).toEqual(Rho.AudioCapture.ENCODER_AAC);
                });
                it('Should Set encoder to AAC using setProperties calling method', function () {
                    Rho.AudioCapture.setProperties({
                        'encoder': Rho.AudioCapture.ENCODER_AAC
                    });
                    var data = Rho.AudioCapture.getProperties(['encoder']);
                    data = data['encoder'];
                    expect(data).toEqual(Rho.AudioCapture.ENCODER_AAC);
                });
                it('Should Set encoder to ENCODER_AMR_NB using direct calling method', function () {
                    Rho.AudioCapture.encoder = Rho.AudioCapture.ENCODER_AMR_NB;
                    expect(Rho.AudioCapture.encoder).toEqual(Rho.AudioCapture.ENCODER_AMR_NB);
                });
                it('Should Set encoder to AMR_NB using setProperty calling method', function () {
                    Rho.AudioCapture.setProperty('encoder', Rho.AudioCapture.ENCODER_AMR_NB);
                    expect(Rho.AudioCapture.getProperty('encoder')).toEqual(Rho.AudioCapture.ENCODER_AMR_NB);
                });
                it('Should Set encoder to AMR_NB using setProperties calling method', function () {
                    Rho.AudioCapture.setProperties({
                        'encoder': Rho.AudioCapture.ENCODER_AMR_NB
                    });
                    var data = Rho.AudioCapture.getProperties(['encoder']);
                    data = data['encoder'];
                    expect(data).toEqual(Rho.AudioCapture.ENCODER_AMR_NB);
                });
                it('Should Set encoder to ENCODER_AMR_WB using direct calling method', function () {
                    Rho.AudioCapture.encoder = Rho.AudioCapture.ENCODER_AMR_WB;
                    expect(Rho.AudioCapture.encoder).toEqual(Rho.AudioCapture.ENCODER_AMR_WB);
                });
                it('Should Set encoder to AMR_WB using setProperty calling method', function () {
                    Rho.AudioCapture.setProperty('encoder', Rho.AudioCapture.ENCODER_AMR_WB);
                    expect(Rho.AudioCapture.getProperty('encoder')).toEqual(Rho.AudioCapture.ENCODER_AMR_WB);
                });
                it('Should Set encoder to AMR_WB using setProperties calling method', function () {
                    Rho.AudioCapture.setProperties({
                        'encoder': Rho.AudioCapture.ENCODER_AMR_WB
                    });
                    var data = Rho.AudioCapture.getProperties(['encoder']);
                    data = data['encoder'];
                    expect(data).toEqual(Rho.AudioCapture.ENCODER_AMR_WB);
					// resetting to default
					Rho.AudioCapture.encoder = Rho.AudioCapture.ENCODER_AAC;
                });
            });
        }
		
        if (["WINDOWS", "ANDROID", "APPLE"].indexOf(Rho.System.platform) != -1) {
            describe('Setting maxDuration', function () {
                it('Should Set maxDuration to 1000 using direct calling method', function () {
                    Rho.AudioCapture.maxDuration = 1000;
                    expect(Rho.AudioCapture.maxDuration).toEqual(1000);
                });
                it('Should Set maxDuration to 1000 using setProperty calling method', function () {
                    Rho.AudioCapture.setProperty('maxDuration', '1000');
                    expect(Rho.AudioCapture.getProperty('maxDuration')).toEqual('1000');
                });
                it('Should Set maxDuration to 1000 using setProperties calling method', function () {
                    Rho.AudioCapture.setProperties({
                        'maxDuration': '1000'
                    });
                    var data = Rho.AudioCapture.getProperties(['maxDuration']);
                    data = data['maxDuration'];
                    expect(data).toEqual('1000');
                });
                it('Should Set maxDuration to 2000 using direct calling method', function () {
                    Rho.AudioCapture.maxDuration = 2000;
                    expect(Rho.AudioCapture.maxDuration).toEqual(2000);
                });
                it('Should Set maxDuration to 2000 using setProperty calling method', function () {
                    Rho.AudioCapture.setProperty('maxDuration', '2000');
                    expect(Rho.AudioCapture.getProperty('maxDuration')).toEqual('2000');
                });
                it('Should Set maxDuration to 2000 using setProperties calling method', function () {
                    Rho.AudioCapture.setProperties({
                        'maxDuration': '2000'
                    });
                    var data = Rho.AudioCapture.getProperties(['maxDuration']);
                    data = data['maxDuration'];
                    expect(data).toEqual('2000');
                });
                it('Should Set maxDuration to 30000 using direct calling method', function () {
                    Rho.AudioCapture.maxDuration = 30000;
                    expect(Rho.AudioCapture.maxDuration).toEqual(30000);
                });
                it('Should Set maxDuration to 30000 using setProperty calling method', function () {
                    Rho.AudioCapture.setProperty('maxDuration', '30000');
                    expect(Rho.AudioCapture.getProperty('maxDuration')).toEqual('30000');
                });
                it('Should Set maxDuration to 30000 using setProperties calling method', function () {
                    Rho.AudioCapture.setProperties({
                        'maxDuration': '30000'
                    });
                    var data = Rho.AudioCapture.getProperties(['maxDuration']);
                    data = data['maxDuration'];
                    expect(data).toEqual('30000');
                });
                it('Should Set maxDuration to -1000 using direct calling method', function () {
                    Rho.AudioCapture.maxDuration = -1000;
                    expect(Rho.AudioCapture.maxDuration).toEqual(20000);
                });
                it('Should Set maxDuration to -1000 using setProperty calling method', function () {
                    Rho.AudioCapture.setProperty('maxDuration', '-1000');
                    expect(Rho.AudioCapture.getProperty('maxDuration')).toEqual('20000');
                });
                it('Should Set maxDuration to -1000 using setProperties calling method', function () {
                    Rho.AudioCapture.setProperties({
                        'maxDuration': '-1000'
                    });
                    var data = Rho.AudioCapture.getProperties(['maxDuration']);
                    data = data['maxDuration'];
                    expect(data).toEqual('20000');
                });
                it('Should Set maxDuration to 0 using direct calling method', function () {
                    Rho.AudioCapture.maxDuration = 0;
                    expect(Rho.AudioCapture.maxDuration).toEqual(20000);
                });
                it('Should Set maxDuration to 0 using setProperty calling method', function () {
                    Rho.AudioCapture.setProperty('maxDuration', '0');
                    expect(Rho.AudioCapture.getProperty('maxDuration')).toEqual('20000');
                });
                it('Should Set maxDuration to 0 using setProperties calling method', function () {
                    Rho.AudioCapture.setProperties({
                        'maxDuration': '0'
                    });
                    var data = Rho.AudioCapture.getProperties(['maxDuration']);
                    data = data['maxDuration'];
                    expect(data).toEqual('20000');
                });
                it('Should Set maxDuration to 500 using direct calling method', function () {
                    Rho.AudioCapture.maxDuration = 500;
                    expect(Rho.AudioCapture.maxDuration).toEqual(20000);
                });
                it('Should Set maxDuration to 500 using setProperty calling method', function () {
                    Rho.AudioCapture.setProperty('maxDuration', '500');
                    expect(Rho.AudioCapture.getProperty('maxDuration')).toEqual('20000');
                });
                it('Should Set maxDuration to 500 using setProperties calling method', function () {
                    Rho.AudioCapture.setProperties({
                        'maxDuration': '500'
                    });
                    var data = Rho.AudioCapture.getProperties(['maxDuration']);
                    data = data['maxDuration'];
                    expect(data).toEqual('20000');
                });
            });
        }
        if (["ANDROID", "APPLE"].indexOf(Rho.System.platform) != -1) {
            describe('Setting fileName', function () {
                it('Should Set fileName to myAudio using direct calling method', function () {
                    Rho.AudioCapture.fileName = 'myAudio.mp4';
                    expect(Rho.AudioCapture.fileName).toEqual('myAudio.mp4');
                });
                it('Should Set fileName to myAudio using setProperty calling method', function () {
                    Rho.AudioCapture.setProperty('fileName', 'myAudio');
                    expect(Rho.AudioCapture.getProperty('fileName')).toEqual('myAudio');
                });
                it('Should Set fileName to myAudio using setProperties calling method', function () {
                    Rho.AudioCapture.setProperties({
                        'fileName': 'myAudio'
                    });
                    var data = Rho.AudioCapture.getProperties(['fileName']);
                    data = data['fileName'];
                    expect(data).toEqual('myAudio');
                });
                it('Should Set fileName to AudioCapture using direct calling method', function () {
                    Rho.AudioCapture.fileName = 'AudioCapture';
                    expect(Rho.AudioCapture.fileName).toEqual('AudioCapture');
                });
                it('Should Set fileName to AudioCapture using setProperty calling method', function () {
                    Rho.AudioCapture.setProperty('fileName', 'AudioCapture');
                    expect(Rho.AudioCapture.getProperty('fileName')).toEqual('AudioCapture');
                });
                it('Should Set fileName to AudioCapture using setProperties calling method', function () {
                    Rho.AudioCapture.setProperties({
                        'fileName': 'AudioCapture'
                    });
                    var data = Rho.AudioCapture.getProperties(['fileName']);
                    data = data['fileName'];
                    expect(data).toEqual('AudioCapture');
                });
                it('Should Set fileName to myAudio_test using direct calling method', function () {
                    Rho.AudioCapture.fileName = 'myAudio_test';
                    expect(Rho.AudioCapture.fileName).toEqual('myAudio_test');
                });
                it('Should Set fileName to myAudio_test using setProperty calling method', function () {
                    Rho.AudioCapture.setProperty('fileName', 'myAudio_test');
                    expect(Rho.AudioCapture.getProperty('fileName')).toEqual('myAudio_test');
                });
                it('Should Set fileName to myAudio_test using setProperties calling method', function () {
                    Rho.AudioCapture.setProperties({
                        'fileName': 'myAudio_test'
                    });
                    var data = Rho.AudioCapture.getProperties(['fileName']);
                    data = data['fileName'];
                    expect(data).toEqual('myAudio_test');
                });
                it('Should Set fileName to audio_test123 using direct calling method', function () {
                    Rho.AudioCapture.fileName = 'audio_test123';
                    expect(Rho.AudioCapture.fileName).toEqual('audio_test123');
                });
                it('Should Set fileName to audio_test123 using setProperty calling method', function () {
                    Rho.AudioCapture.setProperty('fileName', 'audio_test123');
                    expect(Rho.AudioCapture.getProperty('fileName')).toEqual('audio_test123');
                });
                it('Should Set fileName to audio_test123 using setProperties calling method', function () {
                    Rho.AudioCapture.setProperties({
                        'fileName': 'audio_test123'
                    });
                    var data = Rho.AudioCapture.getProperties(['fileName']);
                    data = data['fileName'];
                    expect(data).toEqual('audio_test123');
                });
            });
        }
		if (["WINDOWS"].indexOf(Rho.System.platform) != -1) {
            describe('Setting fileName', function () {
                it('Should Set fileName to myAudio using direct calling method', function () {
                    Rho.AudioCapture.fileName = 'myAudio';
                    expect(Rho.AudioCapture.fileName).toEqual('\\myAudio.wav');
                });
                it('Should Set fileName to myAudio using setProperty calling method', function () {
                    Rho.AudioCapture.setProperty('fileName', 'myAudio');
                    expect(Rho.AudioCapture.getProperty('fileName')).toEqual('\\myAudio.wav');
                });
                it('Should Set fileName to myAudio using setProperties calling method', function () {
                    Rho.AudioCapture.setProperties({
                        'fileName': 'myAudio'
                    });
                    var data = Rho.AudioCapture.getProperties(['fileName']);
                    data = data['fileName'];
                    expect(data).toEqual('\\myAudio.wav');
                });
                it('Should Set fileName to AudioCapture using direct calling method', function () {
                    Rho.AudioCapture.fileName = 'AudioCapture.wav';
                    expect(Rho.AudioCapture.fileName).toEqual('\\AudioCapture.wav');
                });
                it('Should Set fileName to AudioCapture using setProperty calling method', function () {
                    Rho.AudioCapture.setProperty('fileName', 'AudioCapture');
                    expect(Rho.AudioCapture.getProperty('fileName')).toEqual('\\AudioCapture.wav');
                });
                it('Should Set fileName to AudioCapture using setProperties calling method', function () {
                    Rho.AudioCapture.setProperties({
                        'fileName': 'AudioCapture'
                    });
                    var data = Rho.AudioCapture.getProperties(['fileName']);
                    data = data['fileName'];
                    expect(data).toEqual('\\AudioCapture.wav');
                });
                it('Should Set fileName to myAudio_test using direct calling method', function () {
                    Rho.AudioCapture.fileName = 'myAudio_test';
                    expect(Rho.AudioCapture.fileName).toEqual('\\myAudio_test.wav');
                });
                it('Should Set fileName to myAudio_test using setProperty calling method', function () {
                    Rho.AudioCapture.setProperty('fileName', 'myAudio_test');
                    expect(Rho.AudioCapture.getProperty('fileName')).toEqual('\\myAudio_test.wav');
                });
                it('Should Set fileName to myAudio_test using setProperties calling method', function () {
                    Rho.AudioCapture.setProperties({
                        'fileName': 'myAudio_test'
                    });
                    var data = Rho.AudioCapture.getProperties(['fileName']);
                    data = data['fileName'];
                    expect(data).toEqual('\\myAudio_test.wav');
                });
                it('Should Set fileName to audio_test123 using direct calling method', function () {
                    Rho.AudioCapture.fileName = 'audio_test123';
                    expect(Rho.AudioCapture.fileName).toEqual('\\audio_test123.wav');
                });
                it('Should Set fileName to audio_test123 using setProperty calling method', function () {
                    Rho.AudioCapture.setProperty('fileName', 'audio_test123');
                    expect(Rho.AudioCapture.getProperty('fileName')).toEqual('\\audio_test123.wav');
                });
                it('Should Set fileName to audio_test123 using setProperties calling method', function () {
                    Rho.AudioCapture.setProperties({
                        'fileName': 'audio_test123'
                    });
                    var data = Rho.AudioCapture.getProperties(['fileName']);
                    data = data['fileName'];
                    expect(data).toEqual('\\audio_test123.wav');
                });
            });
        }
    });



	describe("Audio Capture Behaviour Test", function(){

		var callbackStatus = false;
		var status = "";
		var filePath = "";
		var message = "";
		var AudioCapturedFolder = Rho.RhoFile.join( Rho.Application.userFolder, "audio" );
		Rho.RhoFile.makeDir(AudioCapturedFolder);
		
		var audioCallBack = function (args) {
			if(args['fileName']){
					filePath = args.fileName.substring(7);
			}
			if(args['message']){
				message = args['message'];
			}
			if(args['status']){
				status = args['status'];
			}
			callbackStatus = true;			
		};
		
		var createPropertyArray = function(arrData){
			var arrAudio = {};
			//alert(JSON.stringify(arrData));
			if(arrData['fileName']){
				arrAudio['fileName'] = arrData['fileName']
			}
			else{
				arrAudio['fileName'] = Rho.RhoFile.join(AudioCapturedFolder,"myaudio");
			}
			
			if(arrData['maxDuration']){
				arrAudio['maxDuration'] = arrData['maxDuration'];
			}else if (arrData['maxDuration'] == 0){
				arrAudio['maxDuration'] = arrData['maxDuration'];
			}else{
				arrAudio['maxDuration'] = 10000;
			}
			
			if(arrData["encoder"]){
				arrAudio['encoder'] = arrData['encoder'];
			}
			//alert(JSON.stringify(arrAudio));
			return arrAudio;
		};
		
		var arrAudioCapture = {};
		
		arrAudioCapture['maxDuration'] = {
			"values": [10000, 60000, 1000, 500, 1500 , 0, -3000],
			"expected": "Callback should return ok and full file path of recorded audiofile and Capture audio duration should be "
		};

		arrAudioCapture['fileName']= {
			"values":  ["audio_123", "1234", "12345 audio", "audio_capture"],
			"expected": "Callback should return ok and full file path of recorded audiofile and captured audio should get save with the fileName as "
		};

		
		beforeEach(function () {
			callbackStatus = false;
			status = "";
			filePath = "";
		});
		
		afterEach(function () {
			if (filePath !== ""){
				Rho.RhoFile.deleteFile(filePath);
			}
		});
		
		
		it('set maxDuration with value null', function () {
				var startTime = '';
				
				runs(function () {
					startTime = new Date().getTime();
					Rho.AudioCapture.start({'fileName': Rho.RhoFile.join(AudioCapturedFolder,"myaudio"), 'maxDuration': null}, audioCallBack);
				});
				
				waitsFor(function(){
					return callbackStatus;
				},"Waiting for audio capture to finished", 25000);
				
				runs(function(){
					var endTime = new Date().getTime();
					expect(callbackStatus).toBeTruthy();
					expect(endTime - startTime).toBeGreaterThan(20000);
					expect(Rho.RhoFile.exists(filePath)).toBeTruthy();
				});
		});

 		for (var object in arrAudioCapture) {

			(function(propertyName,listPropertyValue){

				for (var i = 0; i < listPropertyValue['values'].length; i++) {
					
					(function(propertyValue){
						
						it('set '+propertyName+'with value '+ propertyValue, function () {
							var startTime = '';
							var arrayData = {};
							arrayData[propertyName] = propertyValue;
							var data = createPropertyArray(arrayData);
							var durationToWait = '';
							var durationToCompare = '';
							
							if(propertyName == "maxDuration" && propertyValue >= 1000){
								durationToWait = propertyValue + 5000;
								durationToCompare = propertyValue;
							} else if (propertyName == "fileName" ){
								durationToWait = 15000;
								durationToCompare = 10000;
							} else {
								durationToWait = 25000;
								durationToCompare = 20000;
							}
							
							runs(function () {
								startTime = new Date().getTime();
								Rho.AudioCapture.start(data, audioCallBack);
							});
							
							waitsFor(function(){
								return callbackStatus;
							},"Waiting for audio capture to finished", durationToWait);
							
							runs(function(){
								var endTime = new Date().getTime();
								expect(callbackStatus).toBeTruthy();
								if(propertyName == "maxDuration"){
								expect(endTime - startTime).toBeGreaterThan(durationToCompare);}
								expect(Rho.RhoFile.exists(filePath)).toBeTruthy();
							});

					   });
				   
				   })(listPropertyValue['values'][i])
					
				}

			})(object,arrAudioCapture[object]);
		   
		} 

		if(isWindowsMobilePlatform()){
			it('call start with filename set to "myaudio.wav" with extension', function () {

				runs(function(){
					Rho.AudioCapture.start(createPropertyArray({'fileName': Rho.RhoFile.join(AudioCapturedFolder,"myaudio.wav")}), audioCallBack);
				});
				
				waitsFor(function(){
					return callbackStatus;
				},"Waiting for audio capture to finished",15000);
				

				runs(function(){
					expect(callbackStatus).toBeTruthy();
					expect(filePath).toMatch(/.wav/);
					expect(Rho.RhoFile.exists(filePath)).toBeTruthy();
				});
				
			});

			it('call start with filename set to "\\Temp\\myaudio"', function () {

				runs(function(){
					Rho.AudioCapture.start(createPropertyArray({'fileName':  "\\Temp\\myaudio"}), audioCallBack);
				});
				
				waitsFor(function(){
					return callbackStatus;
				},"Waiting for audio capture to finished",15000);

				runs(function(){
					expect(callbackStatus).toBeTruthy();
					expect(Rho.RhoFile.exists(filePath)).toBeTruthy();
				});
				
			});
		
			it('call start with filename set to "\\Temp\\myaudio.wav"', function () {

				runs(function(){
					Rho.AudioCapture.start(createPropertyArray({'fileName':  "\\Temp\\myaudio.wav"}), audioCallBack);
				});
				
				waitsFor(function(){
					return callbackStatus;
				},"Waiting for audio capture to finished",15000);
				
				runs(function(){
					expect(callbackStatus).toBeTruthy();
					expect(filePath).toMatch(/.wav/);
					expect(Rho.RhoFile.exists(filePath)).toBeTruthy();
				});

			});
			
			it('call start with filename set to path which does not exists in device \\create\\audio', function () {

				runs(function(){
					Rho.AudioCapture.start(createPropertyArray({'fileName': "\\create\\audio"}), audioCallBack);
				});
				
				waitsFor(function(){
					return callbackStatus;
				},"Waiting for audio capture to finished",15000);
				
				runs(function(){
					expect(callbackStatus).toBeTruthy();
					expect(message).toMatch(/error/);
				});
			});

		}


		if(isAndroidPlatform()){

		   it('call start with filename set to "myaudio.mp4" with extension', function () {
				var fname = Rho.RhoFile.join(AudioCapturedFolder,"myaudio.mp4");
				
				runs(function(){
					Rho.AudioCapture.start(createPropertyArray({'fileName': fname}), audioCallBack);
				});
				
				waitsFor(function(){
					return callbackStatus;
				},"Waiting for audio capture to finished",15000);
				
				runs(function(){
					expect(callbackStatus).toBeTruthy();
					expect(filePath).toMatch(/.mp4/);
					expect(Rho.RhoFile.exists(filePath)).toBeTruthy();
				});
			});
			
			it('call start with filename set to "/sdcard/Temp/myaudio"', function () {

				var dirName = "/sdcard/Temp";
				var isDirExists = Rho.RhoFile.isDir(dirName);
				if(isDirExists == false){
					Rho.RhoFile.makeDir(dirName);
				}				
				
				runs(function(){
					Rho.AudioCapture.start(createPropertyArray({'fileName': "/sdcard/Temp/myaudio"}), audioCallBack);
				});
				
				waitsFor(function(){
					return callbackStatus;
				},"Waiting for audio capture to finished",15000);
				
				runs(function(){
					expect(callbackStatus).toBeTruthy();
					expect(filePath).toMatch(/.mp4/);
					expect(Rho.RhoFile.exists(filePath)).toBeTruthy();
				});
			});


			it('call start with filename set to "/sdcard/Temp/myaudio.mp4"', function () {

				var dirName = "/sdcard/Temp";
				var isDirExists = Rho.RhoFile.isDir(dirName);
				if(isDirExists == false){
					Rho.RhoFile.makeDir(dirName);
				}
				
				runs(function(){
					Rho.AudioCapture.start(createPropertyArray({'fileName': "/sdcard/Temp/myaudio.mp4"}), audioCallBack);
				});
				
				waitsFor(function(){
					return callbackStatus;
				},"Waiting for audio capture to finished",15000);				
				
				runs(function(){
					expect(callbackStatus).toBeTruthy();
					expect(filePath).toMatch(/.mp4/);
					expect(Rho.RhoFile.exists(filePath)).toBeTruthy();
				});
			});             
		
			it('call start with filename set to path which does not exists in device /create/audio', function () {

				runs(function(){
					Rho.AudioCapture.start(createPropertyArray({'fileName': "/create/audio"}), audioCallBack);
				});
				
				waitsFor(function(){
					return callbackStatus;
				},"Waiting for audio capture to finished",15000);				

				runs(function(){
					expect(callbackStatus).toBeTruthy();
					expect(Rho.RhoFile.exists(filePath)).toBeFalsy();
				});
			});
			
			it('capture the audio with two different encoders(ENCODER_ACC and ENCODER_AMR_NB) with same fileName', function () {
				var mp4file = '';
				runs(function(){
					Rho.AudioCapture.start(createPropertyArray({'encoder': Rho.AudioCapture.ENCODER_AAC}), audioCallBack);
				});
				
				waitsFor(function(){
					return callbackStatus;
				},"Waiting for audio capture to finished",15000);
				
				runs(function(){
					expect(callbackStatus).toBeTruthy();
					expect(filePath).toMatch(/.mp4/);
					expect(Rho.RhoFile.exists(filePath)).toBeTruthy();
					mp4file = filePath;
					callbackStatus = false;
				});
				
				
				runs(function(){
					Rho.AudioCapture.start(createPropertyArray({'encoder': Rho.AudioCapture.ENCODER_AMR_NB}), audioCallBack);
				});

				waitsFor(function(){
					return callbackStatus;
				},"Waiting for audio capture to finished",15000);

				runs(function(){
					expect(callbackStatus).toBeTruthy();
					expect(filePath).toMatch(/.3gpp/);
					expect(Rho.RhoFile.exists(mp4file)).toBeTruthy();
					expect(Rho.RhoFile.exists(filePath)).toBeTruthy();
					Rho.RhoFile.deleteFile(mp4file);
				});
			});

			
			it('capture the audio with two different encoders(ENCODER_ACC and ENCODER_AMR_WB) with same fileName', function () {
				var mp4file = '';
				runs(function(){
					Rho.AudioCapture.start(createPropertyArray({'encoder': Rho.AudioCapture.ENCODER_AAC}), audioCallBack);
				});
				
				waitsFor(function(){
					return callbackStatus;
				},"Waiting for audio capture to finished",15000);
				
				runs(function(){
					expect(filePath).toMatch(/.mp4/);
					expect(callbackStatus).toBeTruthy();
					mp4file = filePath;
					callbackStatus = false;
				});
				
				
				runs(function(){
					Rho.AudioCapture.start(createPropertyArray({'encoder': Rho.AudioCapture.ENCODER_AMR_WB}), audioCallBack);
				});

				waitsFor(function(){
					return callbackStatus;
				},"Waiting for audio capture to finished",15000);

				runs(function(){
					expect(callbackStatus).toBeTruthy();
					expect(Rho.RhoFile.exists(mp4file)).toBeTruthy();
					expect(filePath).toMatch(/.3gpp/);
					expect(Rho.RhoFile.exists(filePath)).toBeTruthy();
					Rho.RhoFile.deleteFile(mp4file);
				});
			});
	
			it('capture the audio with two different encoders(ENCODER_AMR_NB and ENCODER_AMR_WB) with same fileName', function () {
				
				runs(function(){
					Rho.AudioCapture.start(createPropertyArray({'encoder': Rho.AudioCapture.ENCODER_AMR_NB}), audioCallBack);
				});
				
				waitsFor(function(){
					return callbackStatus;
				},"Waiting for audio capture to finished",15000);
				
				runs(function(){
					expect(callbackStatus).toBeTruthy();
					expect(filePath).toMatch(/3gpp/);
					expect(Rho.RhoFile.exists(filePath)).toBeTruthy();
					callbackStatus = false;
				});

				runs(function(){
					Rho.AudioCapture.start(createPropertyArray({'encoder': Rho.AudioCapture.ENCODER_AMR_WB}), audioCallBack);
				});

				waitsFor(function(){
					return callbackStatus;
				},"Waiting for audio capture to finished",15000);

				runs(function(){
					expect(callbackStatus).toBeTruthy();
					expect(filePath).toMatch(/3gpp/);
					expect(Rho.RhoFile.exists(filePath)).toBeTruthy();
				});
			});


		}


		var arrStopTime = [2000, 4000, 10000];
		
		for (var i = 0; i < arrStopTime.length; i++) {
			(function(valStopTime){
				
				it('call stop method after capturing '+ valStopTime +' msecs of audio capture', function () {

					runs(function(){
						Rho.AudioCapture.start(createPropertyArray({}), audioCallBack);

						setTimeout(function(){
							Rho.AudioCapture.stop();
						},valStopTime);
					});
					
					waitsFor(function(){
						return callbackStatus;
					},"Waiting for audio capture to finished",valStopTime+5000);
					
					runs(function(){
						expect(callbackStatus).toBeTruthy();
						expect(Rho.RhoFile.exists(filePath)).toBeTruthy();
					});
				});
			
			})(arrStopTime[i])
		}


		var arrCancelTime = [3000, 10000];

		for (var i = 0; i < arrCancelTime.length; i++) {
			(function(valCancelTime){
				
				it('call cancel method after capturing '+ valCancelTime +' msecs of audio capture', function () {

					runs(function(){
						Rho.AudioCapture.start(createPropertyArray({'maxDuration': 15000}), audioCallBack);

						setTimeout(function(){
							Rho.AudioCapture.cancel();
						},valCancelTime);
					});
					
					waitsFor(function(){
						return callbackStatus;
					},"Waiting for audio capture to finished",valCancelTime+5000);
					
					runs(function(){
						expect(status).toEqual('cancel');
						expect(Rho.RhoFile.exists(filePath)).toBeFalsy();
					});
				});
			
			})(arrCancelTime[i])
		}   

		it('call stop method after capturing 10 seconds of audio capture and again call cancel method continuosly', function () {
		
			runs(function(){
				Rho.AudioCapture.start({'maxDuration': 15000}, audioCallBack);

				setTimeout(function(){
					Rho.AudioCapture.stop();
					Rho.AudioCapture.cancel();
				},10000);
			});
			
			waitsFor(function(){
				return callbackStatus;
			},"Waiting for audio capture to finished",15000);

			runs(function(){
				expect(callbackStatus).toBeTruthy();
				expect(Rho.RhoFile.exists(filePath)).toBeTruthy();
				expect(status).toEqual('ok');
			});
		});

		it('call cancel method after capturing 10 seconds of audio capture and again call stop method continuously', function () {
	
			runs(function(){
				Rho.AudioCapture.start({'maxDuration': 15000}, audioCallBack);

				setTimeout(function(){
					Rho.AudioCapture.cancel();
					Rho.AudioCapture.stop();
				},12000);
			});

			waitsFor(function(){
				return callbackStatus;
			},"Waiting for audio capture to finished",15000);			
			
			runs(function(){
				expect(callbackStatus).toBeTruthy();
				expect(Rho.RhoFile.exists(filePath)).toBeFalsy();
				expect(status).toEqual('cancel');
			});
		});

		it('Once captured the audio file by setting all properties again call start without setting any properties', function () {
		
			var data = {};
			
			if(isAndroidPlatform()){
				data = createPropertyArray({'encoder': Rho.AudioCapture.ENCODER_AMR_WB})
			}else{
				data = createPropertyArray({})
			}

			runs(function(){
				Rho.AudioCapture.start(data, audioCallBack);
			});

			waitsFor(function(){
				return callbackStatus;
			},"Waiting for audio capture to finished",15000);
			
			runs(function(){
				expect(callbackStatus).toBeTruthy();
				expect(Rho.RhoFile.exists(filePath)).toBeTruthy();
				callbackStatus = false;
			});
			
			runs(function(){
				Rho.AudioCapture.start({}, audioCallBack);
			});
			
			waitsFor(function(){
				return callbackStatus;
			},"Waiting for audio capture to finished",15000);
			
			runs(function(){
				expect(callbackStatus).toBeTruthy();
				expect(Rho.RhoFile.exists(filePath)).toBeTruthy();
			});			
			
		});
		
	});
    
});