describe('Rho.AudioCapture JS API', function () {
    describe('Rho.AudioCapture APIs Set Test', function () {
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
                    var data = Rho.AudioCapture.getProperties([Rho.AudioCapture.ENCODER_AAC]);
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
                });
            });
        }
		if (["WINDOWS", "ANDROID", "APPLE"].indexOf(Rho.System.platform) != -1) {
			describe('getting property default value', function () {

				it('Should get maxDuration default value', function () {
					expect(Rho.AudioCapture.maxDuration).toEqual(20000);
				});

				it('Should get fileName default value', function () {
					expect(Rho.AudioCapture.fileName).toEqual('AudioCapture');
				});

				it('Should get source default value', function () {
					expect(Rho.AudioCapture.source).toEqual(Rho.AudioCapture.MIC);
				});    
			});
	
		}
		if (["ANDROID"].indexOf(Rho.System.platform) != -1) {
			describe('getting property default value', function () {

				it('Should get encoder default value', function () {
							expect(Rho.AudioCapture.encoder).toEqual(Rho.DPX.ENCODER_AAC);
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
                        'maxDuration': 1000
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
                        'maxDuration': 2000
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
                    expect(Rho.AudioCapture.maxDuration).toEqual(-1000);
                });
                it('Should Set maxDuration to -1000 using setProperty calling method', function () {
                    Rho.AudioCapture.setProperty('maxDuration', '-1000');
                    expect(Rho.AudioCapture.getProperty('maxDuration')).toEqual('-1000');
                });
                it('Should Set maxDuration to -1000 using setProperties calling method', function () {
                    Rho.AudioCapture.setProperties({
                        'maxDuration': '-1000'
                    });
                    var data = Rho.AudioCapture.getProperties(['maxDuration']);
                    data = data['maxDuration'];
                    expect(data).toEqual('-1000');
                });
                it('Should Set maxDuration to 0 using direct calling method', function () {
                    Rho.AudioCapture.maxDuration = 0;
                    expect(Rho.AudioCapture.maxDuration).toEqual(0);
                });
                it('Should Set maxDuration to 0 using setProperty calling method', function () {
                    Rho.AudioCapture.setProperty('maxDuration', '0');
                    expect(Rho.AudioCapture.getProperty('maxDuration')).toEqual('0');
                });
                it('Should Set maxDuration to 0 using setProperties calling method', function () {
                    Rho.AudioCapture.setProperties({
                        'maxDuration': '0'
                    });
                    var data = Rho.AudioCapture.getProperties(['maxDuration']);
                    data = data['maxDuration'];
                    expect(data).toEqual('0');
                });
                it('Should Set maxDuration to 500 using direct calling method', function () {
                    Rho.AudioCapture.maxDuration = 500;
                    expect(Rho.AudioCapture.maxDuration).toEqual(500);
                });
                it('Should Set maxDuration to 500 using setProperty calling method', function () {
                    Rho.AudioCapture.setProperty('maxDuration', '500');
                    expect(Rho.AudioCapture.getProperty('maxDuration')).toEqual('500');
                });
                it('Should Set maxDuration to 500 using setProperties calling method', function () {
                    Rho.AudioCapture.setProperties({
                        'maxDuration': '500'
                    });
                    var data = Rho.AudioCapture.getProperties(['maxDuration']);
                    data = data['maxDuration'];
                    expect(data).toEqual('500');
                });
            });
        }
        if (["ANDROID", "APPLE"].indexOf(Rho.System.platform) != -1) {
            describe('Setting fileName', function () {
                it('Should Set fileName to myAudio using direct calling method', function () {
                    Rho.AudioCapture.fileName = 'myAudio.mp4';
                    expect(Rho.AudioCapture.fileName).toEqual('myAudio');
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
                it('Should Set fileName to 123_!@* using direct calling method', function () {
                    Rho.AudioCapture.fileName = '123_!@*';
                    expect(Rho.AudioCapture.fileName).toEqual('123_!@*');
                });
                it('Should Set fileName to 123_!@* using setProperty calling method', function () {
                    Rho.AudioCapture.setProperty('fileName', '123_!@*');
                    expect(Rho.AudioCapture.getProperty('fileName')).toEqual('123_!@*');
                });
                it('Should Set fileName to 123_!@* using setProperties calling method', function () {
                    Rho.AudioCapture.setProperties({
                        'fileName': '123_!@*'
                    });
                    var data = Rho.AudioCapture.getProperties(['fileName']);
                    data = data['fileName'];
                    expect(data).toEqual('123_!@*');
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
                it('Should Set fileName to 123_!@* using direct calling method', function () {
                    Rho.AudioCapture.fileName = '123_!@*';
                    expect(Rho.AudioCapture.fileName).toEqual('\\123_!@*.wav');
                });
                it('Should Set fileName to 123_!@* using setProperty calling method', function () {
                    Rho.AudioCapture.setProperty('fileName', '123_!@*');
                    expect(Rho.AudioCapture.getProperty('fileName')).toEqual('\\123_!@*.wav');
                });
                it('Should Set fileName to 123_!@* using setProperties calling method', function () {
                    Rho.AudioCapture.setProperties({
                        'fileName': '123_!@*'
                    });
                    var data = Rho.AudioCapture.getProperties(['fileName']);
                    data = data['fileName'];
                    expect(data).toEqual('\\123_!@*.wav');
                });
            });
        }
    });
});