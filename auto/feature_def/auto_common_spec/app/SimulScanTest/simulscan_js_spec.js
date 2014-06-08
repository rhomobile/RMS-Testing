describe('Rho.SimulScan APIs Set Test', function () {

    beforeEach(function(){
        var matchers = {
            isNotEmptyString: function () {
                return (typeof this.actual == 'string') && (this.actual.length != 0)
            }
        };

        this.addMatchers(
            matchers
        );

    })

    var failCaptureDocument = function (expectedFailureReason) {
        var stopped = false;
        var failureReason;

        runs(function () {
            Rho.SimulScan.captureDocument(function (dict) {
                if (dict['callbackType'] === Rho.SimulScan.FAILURE) {
                    failureReason = dict['failureReason'];
                }
                if (dict['callbackType'] === Rho.SimulScan.STOP) {
                    stopped = true;
                }
            });
        });

        waitsFor(function () {
            return stopped;
        }, 'the capture to complete', 5000);

        runs(function () {
            expect(failureReason).toEqual(expectedFailureReason);
        });
    };

    var describePropertySetTest = function (property, values, invalidValues) {

        describe('Set ' + property, function () {
            var check = function (value) {
                expect(simulscanInstance[property]).toEqual(value);
                expect(simulscanInstance.getProperty(property)).toEqual(value.toString());
                expect(simulscanInstance.getProperties([property])[property]).toEqual(value.toString());
            };

            var makeIt = function (caption, code) {
                return function (value) {
                    it(caption(value), function () {
                        code(value);
                        check(value);
                    });
                };
            };

            var its = [
                makeIt(
                    function (v) {
                        return "simulscanInstance['" + property + "'] = " + v;
                    },
                    function (v) {
                        simulscanInstance[property] = v;
                    }
                ),
                makeIt(
                    function (v) {
                        return "simulscanInstance.setProperty('" + property + "', " + v + ')';
                    },
                    function (v) {
                        simulscanInstance.setProperty(property, v);
                    }
                ),
                makeIt(
                    function (v) {
                        return "simulscanInstance.setProperties({'" + property + "': '" + v + "'})'";
                    },
                    function (v) {
                        var map = {};
                        map[property] = v.toString();
                        simulscanInstance.setProperties(map);
                    }
                )
            ];

            for (var i = 0; i < its.length; ++i) {
                for (var j = 0; j < values.length; ++j) {
                    its[i](values[j]);
                }
            }
        });

        describe('Set invalid ' + property, function () {
            for (var j = 0; j < invalidValues.length; ++j) {
                (function (value) {
                    it("Rho.SimulScan['" + property + "'] = " + value, function () {
                        Rho.SimulScan.template = 'file://' + encodeURI('/storage/sdcard1/simulscan/templates/Logistics Post.xml');
                        Rho.SimulScan[property] = value;
                        runs(function () {
                            expect(Rho.SimulScan[property]).toEqual(value);
                        });

                        failCaptureDocument("error: Invalid value '" + value + "' for " + property + " property.");

                        runs(function () {
                            expect(Rho.SimulScan[property]).toEqual(value);
                        });
                    });
                })(invalidValues[j]);
            }
            ;
        });
    };


    var simulscanInstance = Rho.SimulScan;

    afterEach(function () {
        simulscanInstance.close();
    });

    describe('getting property default value', function () {

        it('Should get audioFeedback default value', function () {
            expect(simulscanInstance.audioFeedback).toEqual(true);
        });

        it('Should get ledFeedback default value', function () {
            expect(simulscanInstance.ledFeedback).toEqual(true);
        });

        it('Should get debug default value', function () {
            expect(simulscanInstance.debug).toEqual(false);
        });

        it('Should get hapticFeedback default value', function () {
            expect(simulscanInstance.hapticFeedback).toEqual(true);
        });

        it('Should get flashMode default value', function () {
            expect(simulscanInstance.flashMode).toEqual(Rho.SimulScan.FLASH_OFF);
        });

        it('Should get identificationTimeout default value', function () {
            expect(simulscanInstance.identificationTimeout).toEqual(15000);
        });

        it('Should get inputSource default value', function () {
            expect(simulscanInstance.inputSource).toEqual(Rho.SimulScan.SOURCE_CAMERA);
        });

        it('Should get logDirectory default value', function () {
            expect(simulscanInstance.logDirectory).toEqual('/sdcard/SimulScanLog');
        });

        it('Should get ocrLanguage default value', function () {
            expect(simulscanInstance.ocrLanguage).toEqual(Rho.SimulScan.LANGUAGE_ENGLISH);
        });

        it('Should get processingTimeout default value', function () {
            expect(simulscanInstance.processingTimeout).toEqual(10000);
        });

        it('Should get uiResultConfirmation default value', function () {
            expect(simulscanInstance.uiResultConfirmation).toEqual(true);
        });

    });

    describe('Setting template', function () {

        it('Should Set template to file://Application/template.xml using direct calling method', function () {
            simulscanInstance.template = 'file://Application/template.xml';
            expect(simulscanInstance.template).toEqual('file://Application/template.xml');
        });
        it('Should Set template to file://Application/template.xml using setProperty calling method', function () {
            simulscanInstance.setProperty('template', 'file://Application/template.xml');
            expect(simulscanInstance.getProperty('template')).toEqual('file://Application/template.xml');
        });
        it('Should Set template to file://Application/template.xml using setProperties calling method', function () {
            simulscanInstance.setProperties({'template': 'file://Application/template.xml'});
            var data = simulscanInstance.getProperties(['template']);
            data = data['template'];
            expect(data).toEqual('file://Application/template.xml');
        });
    });

    describePropertySetTest('audioFeedback', [false, true            ], [         ]);
    describePropertySetTest('autoImageCapture', [false, true            ], [         ]);
    describePropertySetTest('flashMode', ['on', 'off', 'disabled'], ['invalid']);
    describePropertySetTest('delayResultDisplay', [false, true            ], [         ]);
    describePropertySetTest('frameThreshold', [5, 15, 30              ], [4, 31    ]);
    describePropertySetTest('negativeFrameThreshold', [0, 2, 20               ], [-1, 21   ]);
    describePropertySetTest('decodeAudioFeedback', ['', 'file.wav'         ], [         ]);

    describe('Setting audioFeedback', function () {

        it('Should Set audioFeedback to true using direct calling method', function () {
            simulscanInstance.audioFeedback = true;
            expect(simulscanInstance.audioFeedback).toEqual(true);
        });

        it('Should Set audioFeedback to true using setProperty calling method', function () {
            simulscanInstance.setProperty('audioFeedback', true);
            expect(simulscanInstance.getProperty('audioFeedback')).toEqual('true');
        });

        it('Should Set audioFeedback to true using setProperties calling method', function () {
            simulscanInstance.setProperties({'audioFeedback': 'true'});
            var data = simulscanInstance.getProperties(['audioFeedback']);
            data = data['audioFeedback'];
            expect(data).toEqual('true');
        });

        it('Should Set audioFeedback to false using direct calling method', function () {
            simulscanInstance.audioFeedback = false;
            expect(simulscanInstance.audioFeedback).toEqual(false);
        });

        it('Should Set audioFeedback to false using setProperty calling method', function () {
            simulscanInstance.setProperty('audioFeedback', 'false');
            expect(simulscanInstance.getProperty('audioFeedback')).toEqual('false');
        });

        it('Should Set audioFeedback to false using setProperties calling method', function () {
            simulscanInstance.setProperties({'audioFeedback': 'false'});
            var data = simulscanInstance.getProperties(['audioFeedback']);
            data = data['audioFeedback'];
            expect(data).toEqual('false');
        });
    });


    describe('Setting debug', function () {

        it('Should Set debug to true using direct calling method', function () {
            simulscanInstance.debug = true;
            expect(simulscanInstance.debug).toEqual(true);
        });

        it('Should Set debug to true using setProperty calling method', function () {
            simulscanInstance.setProperty('debug', true);
            expect(simulscanInstance.getProperty('debug')).toEqual('true');
        });

        it('Should Set debug to true using setProperties calling method', function () {
            simulscanInstance.setProperties({'debug': 'true'});
            var data = simulscanInstance.getProperties(['debug']);
            data = data['debug'];
            expect(data).toEqual('true');
        });

        it('Should Set debug to false using direct calling method', function () {
            simulscanInstance.debug = false;
            expect(simulscanInstance.debug).toEqual(false);
        });

        it('Should Set debug to false using setProperty calling method', function () {
            simulscanInstance.setProperty('debug', 'false');
            expect(simulscanInstance.getProperty('debug')).toEqual('false');
        });

        it('Should Set debug to false using setProperties calling method', function () {
            simulscanInstance.setProperties({'debug': 'false'});
            var data = simulscanInstance.getProperties(['debug']);
            data = data['debug'];
            expect(data).toEqual('false');
        });
    });


    describe('Setting hapticFeedback', function () {

        it('Should Set hapticFeedback to true using direct calling method', function () {
            simulscanInstance.hapticFeedback = true;
            expect(simulscanInstance.hapticFeedback).toEqual(true);
        });

        it('Should Set hapticFeedback to true using setProperty calling method', function () {
            simulscanInstance.setProperty('hapticFeedback', true);
            expect(simulscanInstance.getProperty('hapticFeedback')).toEqual('true');
        });

        it('Should Set hapticFeedback to true using setProperties calling method', function () {
            simulscanInstance.setProperties({'hapticFeedback': 'true'});
            var data = simulscanInstance.getProperties(['hapticFeedback']);
            data = data['hapticFeedback'];
            expect(data).toEqual('true');
        });

        it('Should Set hapticFeedback to false using direct calling method', function () {
            simulscanInstance.hapticFeedback = false;
            expect(simulscanInstance.hapticFeedback).toEqual(false);
        });

        it('Should Set hapticFeedback to false using setProperty calling method', function () {
            simulscanInstance.setProperty('hapticFeedback', 'false');
            expect(simulscanInstance.getProperty('hapticFeedback')).toEqual('false');
        });

        it('Should Set hapticFeedback to false using setProperties calling method', function () {
            simulscanInstance.setProperties({'hapticFeedback': 'false'});
            var data = simulscanInstance.getProperties(['hapticFeedback']);
            data = data['hapticFeedback'];
            expect(data).toEqual('false');
        });
    });


    describe('Setting ledFeedback', function () {

        it('Should Set ledFeedback to true using direct calling method', function () {
            simulscanInstance.ledFeedback = true;
            expect(simulscanInstance.ledFeedback).toEqual(true);
        });

        it('Should Set ledFeedback to true using setProperty calling method', function () {
            simulscanInstance.setProperty('ledFeedback', true);
            expect(simulscanInstance.getProperty('ledFeedback')).toEqual('true');
        });

        it('Should Set ledFeedback to true using setProperties calling method', function () {
            simulscanInstance.setProperties({'ledFeedback': 'true'});
            var data = simulscanInstance.getProperties(['ledFeedback']);
            data = data['ledFeedback'];
            expect(data).toEqual('true');
        });

        it('Should Set ledFeedback to false using direct calling method', function () {
            simulscanInstance.ledFeedback = false;
            expect(simulscanInstance.ledFeedback).toEqual(false);
        });

        it('Should Set ledFeedback to false using setProperty calling method', function () {
            simulscanInstance.setProperty('ledFeedback', 'false');
            expect(simulscanInstance.getProperty('ledFeedback')).toEqual('false');
        });

        it('Should Set ledFeedback to false using setProperties calling method', function () {
            simulscanInstance.setProperties({'ledFeedback': 'false'});
            var data = simulscanInstance.getProperties(['ledFeedback']);
            data = data['ledFeedback'];
            expect(data).toEqual('false');
        });
    });


    describe('Setting flashMode', function () {

        it('Should Set flashMode to FLASH_OFF using direct calling method', function () {
            simulscanInstance.flashMode = Rho.SimulScan.FLASH_OFF;
            expect(simulscanInstance.flashMode).toEqual(Rho.SimulScan.FLASH_OFF);
        });

        it('Should Set flashMode to off using setProperty calling method', function () {
            simulscanInstance.setProperty('flashMode', Rho.SimulScan.FLASH_OFF);
            expect(simulscanInstance.getProperty('flashMode')).toEqual(Rho.SimulScan.FLASH_OFF);
        });

        it('Should Set flashMode to off using setProperties calling method', function () {
            simulscanInstance.setProperties({'flashMode': Rho.SimulScan.FLASH_OFF});
            var data = simulscanInstance.getProperties(['flashMode']);
            data = data['flashMode'];
            expect(data).toEqual(Rho.SimulScan.FLASH_OFF);
        });

        it('Should Set flashMode to FLASH_ON using direct calling method', function () {
            simulscanInstance.flashMode = Rho.SimulScan.FLASH_ON;
            expect(simulscanInstance.flashMode).toEqual(Rho.SimulScan.FLASH_ON);
        });

        it('Should Set flashMode to on using setProperty calling method', function () {
            simulscanInstance.setProperty('flashMode', Rho.SimulScan.FLASH_ON);
            expect(simulscanInstance.getProperty('flashMode')).toEqual(Rho.SimulScan.FLASH_ON);
        });

        it('Should Set flashMode to on using setProperties calling method', function () {
            simulscanInstance.setProperties({'flashMode': Rho.SimulScan.FLASH_ON});
            var data = simulscanInstance.getProperties(['flashMode']);
            data = data['flashMode'];
            expect(data).toEqual(Rho.SimulScan.FLASH_ON);
        });
    });


    describe('Setting identificationTimeout', function () {

        it('Should Set identificationTimeout to 0 using direct calling method', function () {
            simulscanInstance.identificationTimeout = 0;
            expect(simulscanInstance.identificationTimeout).toEqual(0);
        });

        it('Should Set identificationTimeout to 0 using setProperty calling method', function () {
            simulscanInstance.setProperty('identificationTimeout', '0');
            expect(simulscanInstance.getProperty('identificationTimeout')).toEqual('0');
        });

        it('Should Set identificationTimeout to 0 using setProperties calling method', function () {
            simulscanInstance.setProperties({'identificationTimeout': '0'});
            var data = simulscanInstance.getProperties(['identificationTimeout']);
            data = data['identificationTimeout'];
            expect(data).toEqual('0');
        });

        it('Should Set identificationTimeout to 1000 using direct calling method', function () {
            simulscanInstance.identificationTimeout = 1000;
            expect(simulscanInstance.identificationTimeout).toEqual(1000);
        });

        it('Should Set identificationTimeout to 1000 using setProperty calling method', function () {
            simulscanInstance.setProperty('identificationTimeout', '1000');
            expect(simulscanInstance.getProperty('identificationTimeout')).toEqual('1000');
        });

        it('Should Set identificationTimeout to 1000 using setProperties calling method', function () {
            simulscanInstance.setProperties({'identificationTimeout': '1000'});
            var data = simulscanInstance.getProperties(['identificationTimeout']);
            data = data['identificationTimeout'];
            expect(data).toEqual('1000');
        });

        it('Should Set identificationTimeout to 20000 using direct calling method', function () {
            simulscanInstance.identificationTimeout = 20000;
            expect(simulscanInstance.identificationTimeout).toEqual(20000);
        });

        it('Should Set identificationTimeout to 20000 using setProperty calling method', function () {
            simulscanInstance.setProperty('identificationTimeout', '20000');
            expect(simulscanInstance.getProperty('identificationTimeout')).toEqual('20000');
        });

        it('Should Set identificationTimeout to 20000 using setProperties calling method', function () {
            simulscanInstance.setProperties({'identificationTimeout': '20000'});
            var data = simulscanInstance.getProperties(['identificationTimeout']);
            data = data['identificationTimeout'];
            expect(data).toEqual('20000');
        });
    });


    describe('Setting inputSource', function () {

        it('Should Set inputSource to SOURCE_CAMERA using direct calling method', function () {
            simulscanInstance.inputSource = Rho.SimulScan.SOURCE_CAMERA;
            expect(simulscanInstance.inputSource).toEqual(Rho.SimulScan.SOURCE_CAMERA);
        });

        it('Should Set inputSource to camera using setProperty calling method', function () {
            simulscanInstance.setProperty('inputSource', Rho.SimulScan.SOURCE_CAMERA);
            expect(simulscanInstance.getProperty('inputSource')).toEqual(Rho.SimulScan.SOURCE_CAMERA);
        });

        it('Should Set inputSource to camera using setProperties calling method', function () {
            simulscanInstance.setProperties({'inputSource': Rho.SimulScan.SOURCE_CAMERA});
            var data = simulscanInstance.getProperties(['inputSource']);
            data = data['inputSource'];
            expect(data).toEqual(Rho.SimulScan.SOURCE_CAMERA);
        });
    });


    describe('Setting logDirectory', function () {

        it('Should Set logDirectory to file://application/SimulScanLog using direct calling method', function () {
            simulscanInstance.logDirectory = 'file://application/SimulScanLog';
            expect(simulscanInstance.logDirectory).toEqual('file://application/SimulScanLog');
        });

        it('Should Set logDirectory to file://application/SimulScanLog using setProperty calling method', function () {
            simulscanInstance.setProperty('logDirectory', 'file://application/SimulScanLog');
            expect(simulscanInstance.getProperty('logDirectory')).toEqual('file://application/SimulScanLog');
        });

        it('Should Set logDirectory to file://application/SimulScanLog using setProperties calling method', function () {
            simulscanInstance.setProperties({'logDirectory': 'file://application/SimulScanLog'});
            var data = simulscanInstance.getProperties(['logDirectory']);
            data = data['logDirectory'];
            expect(data).toEqual('file://application/SimulScanLog');
        });
    });


    describe('Setting processingTimeout', function () {

        it('Should Set processingTimeout to 20000 using direct calling method', function () {
            simulscanInstance.processingTimeout = 20000;
            expect(simulscanInstance.processingTimeout).toEqual(20000);
        });

        it('Should Set processingTimeout to 20000 using setProperty calling method', function () {
            simulscanInstance.setProperty('processingTimeout', '20000');
            expect(simulscanInstance.getProperty('processingTimeout')).toEqual('20000');
        });

        it('Should Set processingTimeout to 20000 using setProperties calling method', function () {
            simulscanInstance.setProperties({'processingTimeout': '20000'});
            var data = simulscanInstance.getProperties(['processingTimeout']);
            data = data['processingTimeout'];
            expect(data).toEqual('20000');
        });

        it('Should Set processingTimeout to 30000 using direct calling method', function () {
            simulscanInstance.processingTimeout = 30000;
            expect(simulscanInstance.processingTimeout).toEqual(30000);
        });

        it('Should Set processingTimeout to 30000 using setProperty calling method', function () {
            simulscanInstance.setProperty('processingTimeout', '30000');
            expect(simulscanInstance.getProperty('processingTimeout')).toEqual('30000');
        });

        it('Should Set processingTimeout to 30000 using setProperties calling method', function () {
            simulscanInstance.setProperties({'processingTimeout': '30000'});
            var data = simulscanInstance.getProperties(['processingTimeout']);
            data = data['processingTimeout'];
            expect(data).toEqual('30000');
        });
    });


    describe('Getting version', function () {
        it('Should return version value as a string', function () {
            expect(Rho.SimulScan.version).isNotEmptyString();
        });
    });


    describe('Setting uiResultConfirmation', function () {
        it('Should Set uiResultConfirmation to true using direct calling method', function () {
            simulscanInstance.uiResultConfirmation = true;
            expect(simulscanInstance.uiResultConfirmation).toEqual(true);
        });

        it('Should Set uiResultConfirmation to true using setProperty calling method', function () {
            simulscanInstance.setProperty('uiResultConfirmation', true);
            expect(simulscanInstance.getProperty('uiResultConfirmation')).toEqual('true');
        });

        it('Should Set uiResultConfirmation to true using setProperties calling method', function () {
            simulscanInstance.setProperties({'uiResultConfirmation': 'true'});
            var data = simulscanInstance.getProperties(['uiResultConfirmation']);
            data = data['uiResultConfirmation'];
            expect(data).toEqual('true');
        });

        it('Should Set uiResultConfirmation to false using direct calling method', function () {
            simulscanInstance.uiResultConfirmation = false;
            expect(simulscanInstance.uiResultConfirmation).toEqual(false);
        });

        it('Should Set uiResultConfirmation to false using setProperty calling method', function () {
            simulscanInstance.setProperty('uiResultConfirmation', 'false');
            expect(simulscanInstance.getProperty('uiResultConfirmation')).toEqual('false');
        });

        it('Should Set uiResultConfirmation to false using setProperties calling method', function () {
            simulscanInstance.setProperties({'uiResultConfirmation': 'false'});
            var data = simulscanInstance.getProperties(['uiResultConfirmation']);
            data = data['uiResultConfirmation'];
            expect(data).toEqual('false');
        });
    });


    it('Nonexistent template URI', function () {
        Rho.SimulScan.template = 'file:///nonexistent.xml';
        failCaptureDocument('error: Can not read template.');
    });

    it('HTTP template URI', function () {
        Rho.SimulScan.template = 'http://rhomobile-suite.s3.amazonaws.com/tmp/Logistics%20Post.xml';
        failCaptureDocument('error: Can not read template.');
    });

});
