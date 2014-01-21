describe('DPX Functionality Test', function() {

    var pprint = function(value) {
        var list = [];
        var each = function(object, f) {
            for (var p in object) {
                if (object.hasOwnProperty(p)) {
                    f(p, object[p]);
                }
            }
        };
        var pprint = function(prefix, value) {
            var indent = '....';
            if (value instanceof Array) {
                list.push('[\n' + prefix + indent);
                for (var i = 0; i < value.length; ++i) {
                    pprint(prefix + indent, value[i]);
                    if (i < value.length - 1) {
                        list.push(',\n' + prefix + indent);
                    }
                }
                list.push('\n' + prefix + ']');
            } else if (value instanceof Object) {
                list.push('{');
                var first = true;
                each(value, function(k, v) {
                    if (first) {
                        first = false;
                    } else {
                        list.push(',');
                    }
                    list.push('\n' + prefix + indent + "'" + k + "': ");
                    pprint(prefix + indent, v);
                });
                list.push('\n' + prefix + '}');
            } else if (typeof value === 'string' || value instanceof String) {
                list.push("'" + value + "'");
            } else {
                list.push(value);
            }
        };

        pprint('', value);
        return list.join('');
    };

    var getformCaptureImageId = null;
    var getregionImageId = null;
    var dpxInstance;

    beforeEach(function() {
        getformCaptureImageId = null;
        getregionImageId = null;
        dpxInstance = new Rho.DPX();
    });

    afterEach(function () {
        dpxInstance.close();
        dpxInstance = null;
    });

    it('Document capture with barcode, omr, ocr, picture.', function() {
        dispTestCaseRunning('Select "/sdcard/templates/1024w_754h_Delivery Attempt Notification.yuv" and tap to scan.');
        dispExpectedResult('No expected result. This is automatic test.');

        _result.waitToRunAutoTest();

        runs(function() {
            dpxInstance.template = 'file:///sdcard/templates/Logistics%20Post.xml';
            dpxInstance.inputSource = Rho.DPX.SOURCE_FILE;
            dpxInstance.inputSourceFilename = '/sdcard/templates/1024w_754h_Delivery Attempt Notification.yuv';
            dpxInstance.fileInteractiveMode = true;
            dpxInstance.uiResultConfirmation = false;

            dpxInstance.setCallback(function(dict) {
                // displayResult('Output: ', pprint(dict));
                expect(dict['callbackType']).toEqual(Rho.DPX.SUCCESS);
                var regions = dict['processedForm']['regions'];
                expect(regions[0]['processingMode']).toEqual(Rho.DPX.PM_BARCODE);
                expect(regions[1]['processingMode']).toEqual(Rho.DPX.PM_OMR);
                expect(regions[2]['processingMode']).toEqual(Rho.DPX.PM_OCR);
                expect(regions[5]['processingMode']).toEqual(Rho.DPX.PM_PICTURE);

                _result.passed();
            });

            dpxInstance.captureDocument();
        });

        _result.waitForResponse();
    });

    it('Only audio feedback is on.', function() {
        dispTestCaseRunning('Run test\nwait a little\nselect "/sdcard/templates/1024w_754h_Delivery Attempt Notification.yuv"\ntap to scan.');
        dispExpectedResult('callbackType should be success.\nThere must be only audio feedback at end of scan.');

        _result.waitToRunTest();

        runs(function() {
            dpxInstance.template = 'file:///sdcard/templates/Logistics%20Post.xml';
            dpxInstance.inputSource = Rho.DPX.SOURCE_FILE;
            dpxInstance.inputSourceFilename = '/sdcard/templates/1024w_754h_Delivery Attempt Notification.yuv';
            dpxInstance.fileInteractiveMode = true;
            dpxInstance.uiResultConfirmation = false;

            dpxInstance.audioFeedback = true;
            dpxInstance.hapticFeedback = false;
            dpxInstance.ledFeedback = false;

            dpxInstance.setCallback(function(dict) {
                displayResult('Output: ', 'callbackType is ' + dict['callbackType']);
            });

            dpxInstance.captureDocument();
        });

        _result.waitForResponse();
    });

    it('Only haptic feedback is on.', function() {
        dispTestCaseRunning('Run test\nwait a little\nselect "/sdcard/templates/1024w_754h_Delivery Attempt Notification.yuv"\ntap to scan.');
        dispExpectedResult('callbackType should be success.\nThere must be only haptic feedback at end of scan.');

        _result.waitToRunTest();

        runs(function() {
            dpxInstance.template = 'file:///sdcard/templates/Logistics%20Post.xml';
            dpxInstance.inputSource = Rho.DPX.SOURCE_FILE;
            dpxInstance.inputSourceFilename = '/sdcard/templates/1024w_754h_Delivery Attempt Notification.yuv';
            dpxInstance.fileInteractiveMode = true;
            dpxInstance.uiResultConfirmation = false;

            dpxInstance.audioFeedback = false;
            dpxInstance.hapticFeedback = true;
            dpxInstance.ledFeedback = false;

            dpxInstance.setCallback(function(dict) {
                displayResult('Output: ', 'callbackType is ' + dict['callbackType']);
            });

            dpxInstance.captureDocument();
        });

        _result.waitForResponse();
    });

    it('Only led feedback is on.', function() {
        dispTestCaseRunning('Run test\nwait a little\nselect "/sdcard/templates/1024w_754h_Delivery Attempt Notification.yuv"\ntap to scan.');
        dispExpectedResult('callbackType should be success.\nThere must be only led feedback at end of scan.');

        _result.waitToRunTest();

        runs(function() {
            dpxInstance.template = 'file:///sdcard/templates/Logistics%20Post.xml';
            dpxInstance.inputSource = Rho.DPX.SOURCE_FILE;
            dpxInstance.inputSourceFilename = '/sdcard/templates/1024w_754h_Delivery Attempt Notification.yuv';
            dpxInstance.fileInteractiveMode = true;
            dpxInstance.uiResultConfirmation = false;

            dpxInstance.audioFeedback = false;
            dpxInstance.hapticFeedback = false;
            dpxInstance.ledFeedback = true;

            dpxInstance.setCallback(function(dict) {
                displayResult('Output: ', 'callbackType is ' + dict['callbackType']);
            });

            dpxInstance.captureDocument();
        });

        _result.waitForResponse();
    });

    it('flash mode is on', function() {
        dispTestCaseRunning('Scan Delivery Attempt Notification');
        dispExpectedResult('callbackType should be success.\nFlash must be on during scan.');

        _result.waitToRunTest();

        runs(function() {
            dpxInstance.template = 'file:///sdcard/templates/Logistics%20Post.xml';
            dpxInstance.inputSource = Rho.DPX.SOURCE_CAMERA;
            dpxInstance.uiResultConfirmation = false;

            dpxInstance.flashMode = Rho.DPX.FLASH_ON;

            dpxInstance.setCallback(function(dict) {
                displayResult('Output: ', 'callbackType is ' + dict['callbackType']);
            });

            dpxInstance.captureDocument();
        });

        _result.waitForResponse();
    });

    it('flash mode is off', function() {
        dispTestCaseRunning('Scan Delivery Attempt Notification');
        dispExpectedResult('callbackType should be success.\nFlash must be off during scan.');

        _result.waitToRunTest();

        runs(function() {
            dpxInstance.template = 'file:///sdcard/templates/Logistics%20Post.xml';
            dpxInstance.inputSource = Rho.DPX.SOURCE_CAMERA;
            dpxInstance.uiResultConfirmation = false;

            dpxInstance.flashMode = Rho.DPX.FLASH_OFF;

            dpxInstance.setCallback(function(dict) {
                displayResult('Output: ', 'callbackType is ' + dict['callbackType']);
            });

            dpxInstance.captureDocument();
        });

        _result.waitForResponse();
    });

    it('flash mode is auto (dark)', function() {
        dispTestCaseRunning('Scan Delivery Attempt Notification in dark environment.');
        dispExpectedResult('callbackType should be success.\nFlash must be on.');

        _result.waitToRunTest();

        runs(function() {
            dpxInstance.template = 'file:///sdcard/templates/Logistics%20Post.xml';
            dpxInstance.inputSource = Rho.DPX.SOURCE_CAMERA;
            dpxInstance.uiResultConfirmation = false;

            dpxInstance.flashMode = Rho.DPX.FLASH_AUTO;

            dpxInstance.setCallback(function(dict) {
                displayResult('Output: ', 'callbackType is ' + dict['callbackType']);
            });

            dpxInstance.captureDocument();
        });

        _result.waitForResponse();
    });

    it('flash mode is auto (light)', function() {
        dispTestCaseRunning('Scan Delivery Attempt Notification in good lighting.');
        dispExpectedResult('callbackType should be success.\nFlash must be off.');

        _result.waitToRunTest();

        runs(function() {
            dpxInstance.template = 'file:///sdcard/templates/Logistics%20Post.xml';
            dpxInstance.inputSource = Rho.DPX.SOURCE_CAMERA;
            dpxInstance.uiResultConfirmation = false;

            dpxInstance.flashMode = Rho.DPX.FLASH_AUTO;

            dpxInstance.setCallback(function(dict) {
                displayResult('Output: ', 'callbackType is ' + dict['callbackType']);
            });

            dpxInstance.captureDocument();
        });

        _result.waitForResponse();
    });

    it('processingTimeout 1 second', function() {
        dispTestCaseRunning('1. Frame Delivery Attempt Notification in camera.\n2. Tap to scan.\n3. Immediately start swinging of device.');
        dispExpectedResult('failureReason should be processingTimeout. Scanning should take about one second.');

        _result.waitToRunTest();

        runs(function() {
            dpxInstance.template = 'file:///sdcard/templates/Logistics%20Post.xml';
            dpxInstance.inputSource = Rho.DPX.SOURCE_CAMERA;

            dpxInstance.processingTimeout = 1000;

            dpxInstance.setCallback(function(dict) {
                displayResult('Output: ', 'failureReason is ' + dict['failureReason']);
            });

            dpxInstance.captureDocument();
        });

        _result.waitForResponse();
    });

    it('processingTimeout 5 second', function() {
        dispTestCaseRunning('1. Frame Delivery Attempt Notification in camera.\n2. Tap to scan.\n3. Immediately start swinging of device.');
        dispExpectedResult('failureReason should be processingTimeout. Scanning should take about five second.');

        _result.waitToRunTest();

        runs(function() {
            dpxInstance.template = 'file:///sdcard/templates/Logistics%20Post.xml';
            dpxInstance.inputSource = Rho.DPX.SOURCE_CAMERA;

            dpxInstance.processingTimeout = 5000;

            dpxInstance.setCallback(function(dict) {
                displayResult('Output: ', 'failureReason is ' + dict['failureReason']);
            });

            dpxInstance.captureDocument();
        });

        _result.waitForResponse();
    });

    it('identificationTimeout 1 second', function() {
        dispTestCaseRunning('1. Frame Delivery Attempt Notification in camera.\n2. Tap to scan.\n3. ?');
        dispExpectedResult('failureReason should be identificationTimeout. Scanning should take about one second.');

        _result.waitToRunTest();

        runs(function() {
            dpxInstance.template = 'file:///sdcard/templates/Logistics%20Post.xml';
            dpxInstance.inputSource = Rho.DPX.SOURCE_CAMERA;

            dpxInstance.identificationTimeout = 1000;

            dpxInstance.setCallback(function(dict) {
                displayResult('Output: ', 'failureReason is ' + dict['failureReason']);
            });

            dpxInstance.captureDocument();
        });

        _result.waitForResponse();
    });

    it('identificationTimeout 5 second', function() {
        dispTestCaseRunning('1. Frame Delivery Attempt Notification in camera.\n2. Tap to scan.\n3. ?');
        dispExpectedResult('failureReason should be identificationTimeout. Scanning should take about five second.');

        _result.waitToRunTest();

        runs(function() {
            dpxInstance.template = 'file:///sdcard/templates/Logistics%20Post.xml';
            dpxInstance.inputSource = Rho.DPX.SOURCE_CAMERA;

            dpxInstance.identificationTimeout = 5000;

            dpxInstance.setCallback(function(dict) {
                displayResult('Output: ', 'failureReason is ' + dict['failureReason']);
            });

            dpxInstance.captureDocument();
        });

        _result.waitForResponse();
    });

    it('scan with imager', function() {
        dispTestCaseRunning('Scan Delivery Attempt Notification with imager');
        dispExpectedResult('No expected result. This is automatic test.');

        _result.waitToRunAutoTest();

        runs(function() {
            dpxInstance.template = 'file:///sdcard/templates/Logistics%20Post.xml';
            dpxInstance.inputSource = Rho.DPX.SOURCE_IMAGER;
            dpxInstance.uiResultConfirmation = false;

            dpxInstance.setCallback(function(dict) {
                expect(dict['callbackType']).toEqual(Rho.DPX.SUCCESS);
                _result.passed();
            });

            dpxInstance.captureDocument();
        });

        _result.waitForResponse();
    });

    it('Disable fileInteractiveMode for file source.', function() {
        dispTestCaseRunning('Just run test.');
        dispExpectedResult('No expected result. This is automatic test.');

        _result.waitToRunAutoTest();

        runs(function() {
            dpxInstance.template = 'file:///sdcard/templates/Logistics%20Post.xml';
            dpxInstance.inputSource = Rho.DPX.SOURCE_FILE;
            dpxInstance.inputSourceFilename = '/sdcard/templates/1024w_754h_Delivery Attempt Notification.yuv';
            dpxInstance.fileInteractiveMode = false;
            dpxInstance.uiResultConfirmation = false;

            dpxInstance.setCallback(function(dict) {
                expect(dict['callbackType']).toEqual(Rho.DPX.SUCCESS);
                _result.passed();
            });

            dpxInstance.captureDocument();
        });

        _result.waitForResponse();
    });

    it('Debug mode.', function() {
        dispTestCaseRunning('Select "/sdcard/templates/1024w_754h_Delivery Attempt Notification.yuv" and tap to scan.');
        dispExpectedResult('callbackType should be success.\nThere is new subdirectory in /sdcard/RhoDPXLog directory.');

        _result.waitToRunTest();

        runs(function() {
            dpxInstance.template = 'file:///sdcard/templates/Logistics%20Post.xml';
            dpxInstance.inputSource = Rho.DPX.SOURCE_FILE;
            dpxInstance.inputSourceFilename = '/sdcard/templates/1024w_754h_Delivery Attempt Notification.yuv';
            dpxInstance.fileInteractiveMode = true;
            dpxInstance.uiResultConfirmation = false;

            dpxInstance.debug = true;
            dpxInstance.logDirectory = '/sdcard/RhoDPXLog';

            dpxInstance.setCallback(function(dict) {
                displayResult('Output: ', 'callbackType is ' + dict['callbackType']);
            });

            dpxInstance.captureDocument();
        });

        _result.waitForResponse();
    });

    it('Different manual resolutions.', function() {
        dispTestCaseRunning('Repeat three times:\n1. Frame Delivery Attempt Notification in camera.\n2. Tap to scan.');
        dispExpectedResult('callbackType should be success.\nNote accending distances to document during framing.');

        _result.waitToRunTest();

        runs(function() {
            dpxInstance.template = 'file:///sdcard/templates/Logistics%20Post.xml';
            dpxInstance.uiResultConfirmation = false;
            dpxInstance.inputSource = Rho.DPX.SOURCE_CAMERA;
            dpxInstance.userMode = Rho.DPX.USER_MODE_PREVIEW;
            dpxInstance.manualResolutionMode = true;

            dpxInstance.manualResolution = Rho.DPX.RESOLUTION_SMALL;
            dpxInstance.setCallback(function(dict) {
                dpxInstance.manualResolution = Rho.DPX.RESOLUTION_MEDIUM;
                dpxInstance.setCallback(function(dict) {
                    dpxInstance.manualResolution = Rho.DPX.RESOLUTION_LARGE;
                    dpxInstance.setCallback(function(dict) {
                        displayResult('Output: ', 'callbackType is ' + dict['callbackType']);
                    });
                    dpxInstance.captureDocument();
                });
                dpxInstance.captureDocument();
            });
            dpxInstance.captureDocument();
        });

        _result.waitForResponse();
    });

    it('Different user modes.', function() {
        dispTestCaseRunning('Repeat twice:\n1. Frame Delivery Attempt Notification in camera.\n2. Tap to scan.');
        dispExpectedResult('callbackType should be success.\nNote descending distances to document during framing.');

        _result.waitToRunTest();

        runs(function() {
            dpxInstance.template = 'file:///sdcard/templates/Logistics%20Post.xml';
            dpxInstance.uiResultConfirmation = false;
            dpxInstance.inputSource = Rho.DPX.SOURCE_CAMERA;

            dpxInstance.userMode = Rho.DPX.USER_MODE_PREVIEW;
            dpxInstance.setCallback(function(dict) {
                dpxInstance.userMode = Rho.DPX.USER_MODE_SNAPSHOT;
                dpxInstance.setCallback(function(dict) {
                    displayResult('Output: ', 'callbackType is ' + dict['callbackType']);
                });
                dpxInstance.captureDocument();
            });
            dpxInstance.captureDocument();
        });

        _result.waitForResponse();
    });

    it('uiResultConfirmation in effect.', function() {
        dispTestCaseRunning('Run test\nwait a little\nselect "/sdcard/templates/1024w_754h_Delivery Attempt Notification.yuv"\ntap to scan.\npress "Accept" on UI confirmation screen.');
        dispExpectedResult('callbackType should be success.\nThere must be UI confirmation screen after scanning.');

        _result.waitToRunTest();

        runs(function() {
            dpxInstance.template = 'file:///sdcard/templates/Logistics%20Post.xml';
            dpxInstance.inputSource = Rho.DPX.SOURCE_FILE;
            dpxInstance.inputSourceFilename = '/sdcard/templates/1024w_754h_Delivery Attempt Notification.yuv';
            dpxInstance.fileInteractiveMode = true;
            dpxInstance.uiResultConfirmation = true;

            dpxInstance.setCallback(function(dict) {
                displayResult('Output: ', 'callbackType is ' + dict['callbackType']);
            });

            dpxInstance.captureDocument();
        });

        _result.waitForResponse();
    });

    it('Different zoom amounts.', function() {
        dispTestCaseRunning('Repeat three times:\n1. Frame Delivery Attempt Notification in camera.\n2. Tap to scan.');
        dispExpectedResult('callbackType should be success.\nNote accending distances to document during framing.');

        _result.waitToRunTest();

        runs(function() {
            dpxInstance.template = 'file:///sdcard/templates/Logistics%20Post.xml';
            dpxInstance.uiResultConfirmation = false;
            dpxInstance.inputSource = Rho.DPX.SOURCE_CAMERA;

            dpxInstance.zoomAmount = 0;
            dpxInstance.setCallback(function(dict) {
                dpxInstance.manualResolution = 50;
                dpxInstance.setCallback(function(dict) {
                    dpxInstance.zoomAmount = 100;
                    dpxInstance.setCallback(function(dict) {
                        displayResult('Output: ', 'callbackType is ' + dict['callbackType']);
                    });
                    dpxInstance.captureDocument();
                });
                dpxInstance.captureDocument();
            });
            dpxInstance.captureDocument();
        });

        _result.waitForResponse();
    });

    it('getDataUri retrieves images.', function() {
        var add_image = function(image) {
            var list = document.getElementById('myList');

            var item = document.createElement('li');
            list.appendChild(item);

            var img = document.createElement('img');
            img.setAttribute('src', dpxInstance.getDataUri(image['id']));
            item.appendChild(img);
        };

        dispTestCaseRunning('Run test\nwait a little\nselect "/sdcard/templates/1024w_754h_Delivery Attempt Notification.yuv"\ntap to scan.');
        dispExpectedResult('You should see images for regions and for whole form.');

        _result.waitToRunTest();

        runs(function() {
            dpxInstance.template = 'file:///sdcard/templates/Logistics%20Post.xml';
            dpxInstance.inputSource = Rho.DPX.SOURCE_FILE;
            dpxInstance.inputSourceFilename = '/sdcard/templates/1024w_754h_Delivery Attempt Notification.yuv';
            dpxInstance.fileInteractiveMode = true;
            dpxInstance.uiResultConfirmation = false;

            dpxInstance.setCallback(function(dict) {
                $('#myList').empty();
                var list = document.getElementById('myList');

                var regions = dict['processedForm']['regions'];
                for (var i = 0; i < regions.length; ++i) {
                    if (regions[i].hasOwnProperty('image')) {
                        add_image(regions[i]['image']);
                    }
                }
                add_image(dict['processedForm']['formCapture']['image']);
            });

            dpxInstance.captureDocument();
        });

        _result.waitForResponse();
    });

    it('Objective:\nDocument capture with template from invalid location', function() {
        dispTestCaseRunning('1. Set template property to http path of template.xml has region of  picture\n/Application/sdcard/template.xml\n2.Set inputsource to imager\n3. Call setCallback method with callback\n4. Call captureDocument method Capture a document by taking a photo using imager \n');
        dispExpectedResult('It should return DPX engine generic error.(FAILURE_ERROR) or identificationTimeout(FAILURE_IDENTIFICATION_TIMEOUT)');
        //Common Method implemented to wait for tester to run the test.Code available in specHelper.js
        _result.waitToRunTest();
        runs(function() {
                //var dpxInstance = new Rho.DPX();
                dpxInstance.inputSource = Rho.DPX.SOURCE_IMAGER;
                dpxInstance.setCallback(captureCallback);
                dpxInstance.template = Rho.RhoFile.join(Rho.Application.AppBundleFolder, 'invalid.xml');
                dpxInstance.captureDocument();
        });
        //Add more waitsfor or run blocks if required.
        //Common Method implemented to wait for tester to make it pass or fail.Code available in specHelper.js
        _result.waitForResponse();
    });

    it('Objective:\nDocument capture set audioFeedback  property with default value', function() {
        dispTestCaseRunning('1. Set template property to path of template.xml has region of Optical Character Recognition \n/sdcard/Application/template.xml\n2. Call setCallback method with callback\n3. Call captureDocument method Capture a document by taking a photo\n\n\n\n\n');
        dispExpectedResult('Should get the audio feedback at the time captured document is getting processed after proceessed successfully callback fired once for each field defined in the template');
        //Common Method implemented to wait for tester to run the test.Code available in specHelper.js
        _result.waitToRunTest();
        runs(function() {
                //var dpxInstance = new Rho.DPX();
                dpxInstance.inputSource = Rho.DPX.SOURCE_CAMERA;
                dpxInstance.setCallback(captureCallback);
                dpxInstance.template = Rho.RhoFile.join(Rho.Application.AppBundleFolder, 'picture.xml');
                dpxInstance.captureDocument();
        });
        //Add more waitsfor or run blocks if required.
        //Common Method implemented to wait for tester to make it pass or fail.Code available in specHelper.js
        _result.waitForResponse();
    });


    it('Objective:\nDocument capture with audioFeedback  property set to invalid', function() {
        dispTestCaseRunning('1. Set template property to path of template.xml has region of  picture\n/sdcard/Application/template.xml\n2.Set audioFeedback to audio\n3. Call setCallback method with callback\n4. Call captureDocument method Capture a document by taking a photo\n');
        dispExpectedResult('Should not get the audio feedback at the time captured document is getting processed but after proceessed successfully callback fired once for each field defined in the template');
        //Common Method implemented to wait for tester to run the test.Code available in specHelper.js
        _result.waitToRunTest();
        runs(function() {
                //var dpxInstance = new Rho.DPX();
                dpxInstance.inputSource = Rho.DPX.SOURCE_CAMERA;
                dpxInstance.setCallback(captureCallback);
                dpxInstance.audioFeedback = 'invalid';
                dpxInstance.template = Rho.RhoFile.join(Rho.Application.AppBundleFolder, 'picture.xml');
                dpxInstance.captureDocument();
        });
        //Add more waitsfor or run blocks if required.
        //Common Method implemented to wait for tester to make it pass or fail.Code available in specHelper.js
        _result.waitForResponse();
    });

    it('Objective:\nDocument capture with hapticFeedback  property set to invalid value', function() {
        dispTestCaseRunning('1. Set template property to path of template.xml has region of  picture\n/sdcard/Application/template.xml\n2.Set hapticFeedback to feedback\n3. Call setCallback method with callback\n4. Call captureDocument method Capture a document by taking a photo\n');
        dispExpectedResult('Should not get the haptic feedback at the time captured document is getting processed but after proceessed successfully callback fired once for each field defined in the template');
        //Common Method implemented to wait for tester to run the test.Code available in specHelper.js
        _result.waitToRunTest();
        runs(function() {
                //var dpxInstance = new Rho.DPX();
                dpxInstance.inputSource = Rho.DPX.SOURCE_CAMERA;
                dpxInstance.setCallback(captureCallback);
                dpxInstance.hapticFeedback = 'invalid';
                dpxInstance.template = Rho.RhoFile.join(Rho.Application.AppBundleFolder, 'picture.xml');
                dpxInstance.captureDocument();
        });
        //Add more waitsfor or run blocks if required.
        //Common Method implemented to wait for tester to make it pass or fail.Code available in specHelper.js
        _result.waitForResponse();
    });

    it('Objective:\nDocument capture with ledFeedback  property set to invalid value', function() {
        dispTestCaseRunning('1. Set template property to path of template.xml has region of  picture\n/sdcard/Application/template.xml\n2.Set ledFeedback to ledFeedback\n3. Call setCallback method with callback\n4. Call captureDocument method Capture a document by taking a photo\n');
        dispExpectedResult('Should not get the led feedback at the time captured document is getting processed but after proceessed successfully callback fired once for each field defined in the template');
        //Common Method implemented to wait for tester to run the test.Code available in specHelper.js
        _result.waitToRunTest();
        runs(function() {
                //var dpxInstance = new Rho.DPX();
                dpxInstance.inputSource = Rho.DPX.SOURCE_CAMERA;
                dpxInstance.setCallback(captureCallback);
                dpxInstance.ledFeedback = 'invalid';
                dpxInstance.template = Rho.RhoFile.join(Rho.Application.AppBundleFolder, 'picture.xml');
                dpxInstance.captureDocument();
        });
        //Add more waitsfor or run blocks if required.
        //Common Method implemented to wait for tester to make it pass or fail.Code available in specHelper.js
        _result.waitForResponse();
    });


    it('Objective:\nDocument capture with flashMode  property set to invalid value\n', function() {
        dispTestCaseRunning('1. Set template property to path of template.xml has region of  picture\n/sdcard/Application/template.xml\n2.Set flashMode to flash\n3. Call setCallback method with callback\n4. Call captureDocument method Capture a document by taking a photo\n');
        dispExpectedResult('Shold not get the flash at the time of capturing the photo and captured document should get  proceessed successfully callback fired once for each field defined in the template');
        //Common Method implemented to wait for tester to run the test.Code available in specHelper.js
        _result.waitToRunTest();
        runs(function() {
                //var dpxInstance = new Rho.DPX();
                dpxInstance.inputSource = Rho.DPX.SOURCE_CAMERA;
                dpxInstance.flashMode = 'invalid';
                dpxInstance.setCallback(captureCallback);
                dpxInstance.template = Rho.RhoFile.join(Rho.Application.AppBundleFolder, 'picture.xml');
                dpxInstance.captureDocument();
        });
        //Add more waitsfor or run blocks if required.
        //Common Method implemented to wait for tester to make it pass or fail.Code available in specHelper.js
        _result.waitForResponse();
    });

    it('Objective:\nDocument capture with identificationTimeout  property set to -10000 (-10 second)\n\n', function() {
        dispTestCaseRunning('1. Set template property to path of template.xml has region of  picture\n/sdcard/Application/template.xml\n2.Set inputSource to camera\n3.Set identificationTimeout to -10000\n4. Call setCallback method with callback\n5. Call captureDocument method Capture a document by taking a photo using camera\n');
        dispExpectedResult('Callack should return identification timout(FAILURE_IDENTIFICATION_TIMEOUT)\nwhen not able to capture the photo within -10 seconds');
        //Common Method implemented to wait for tester to run the test.Code available in specHelper.js
        _result.waitToRunTest();
        runs(function() {
                //var dpxInstance = new Rho.DPX();
                dpxInstance.inputSource = Rho.DPX.SOURCE_CAMERA;
                dpxInstance.identificationTimeout = -10000;
                dpxInstance.setCallback(captureCallback);
                dpxInstance.template = Rho.RhoFile.join(Rho.Application.AppBundleFolder, 'picture.xml');
                dpxInstance.captureDocument();
        });
        //Add more waitsfor or run blocks if required.
        //Common Method implemented to wait for tester to make it pass or fail.Code available in specHelper.js
        _result.waitForResponse();
    });

    it('Objective:\nDocument capture with set fileInteractiveMode property to inavlid value, inputSource  property set to SOURCE_FILE (file) and inputSourceFilename set to valid full path to the image to be processed\n\n', function() {
        dispTestCaseRunning('1. Set template property to path of template.xml has region of  picture\n/sdcard/Application/template.xml\n2.Set fileInteractiveMode to invalid\n3.Set inputSource to File\n4. inputSourceFilename to /sdcard/Appliaction/image.jpg\n5. Call setCallback method with callback\n6. Call captureDocument method Capture a document by given image as a file\n');
        dispExpectedResult('should not capture the impage because  fileInteractiveMode set to invalid');
        _result.waitToRunTest();
        runs(function() {
                //var dpxInstance = new Rho.DPX();
                dpxInstance.template = Rho.RhoFile.join(Rho.Application.AppBundleFolder, 'picture.xml');
                dpxInstance.inputSource = Rho.DPX.SOURCE_FILE;
                dpxInstance.fileInteractiveMode = 'invalid';
                dpxInstance.inputSourceFilename = Rho.RhoFile.join(Rho.Application.AppBundleFolder, 'image.jpg');
                dpxInstance.setCallback(captureCallback);
                dpxInstance.captureDocument();
         });
         _result.waitForResponse();
     });

    it('Objective:\nDocument capture with set fileInteractiveMode property to true, inputSource  property set to SOURCE_FILE (file) and inputSourceFilename set to invalid path to the image to be processed\n\n', function() {
        dispTestCaseRunning('1. Set template property to path of template.xml has region of  picture\n/sdcard/Application/template.xml\n2.Set fileInteractiveMode to true\n3.Set inputSource to File\n4. inputSourceFilename to /Appliaction/sdcard/image.jpg\n5. Call setCallback method with callback\n6. Call captureDocument method Capture a document by given image as a file\n');
        dispExpectedResult('should not capture the impage because  inputSourceFilename set to invalid path');
         //Common Method implemented to wait for tester to run the test.Code available in specHelper.js
         _result.waitToRunTest();
         runs(function() {
                //var dpxInstance = new Rho.DPX();
                dpxInstance.template = Rho.RhoFile.join(Rho.Application.AppBundleFolder, 'picture.xml');
                dpxInstance.inputSource = Rho.DPX.SOURCE_FILE;
                dpxInstance.fileInteractiveMode = 'true';
                dpxInstance.inputSourceFilename = Rho.RhoFile.join(Rho.Application.AppBundleFolder, 'invalid.jpg');
                dpxInstance.setCallback(captureCallback);
                dpxInstance.captureDocument();
        });
        //Add more waitsfor or run blocks if required.
        //Common Method implemented to wait for tester to make it pass or fail.Code available in specHelper.js
        _result.waitForResponse();
    });

    it('Objective:\nDocument capture with inputSource  property set to invalid value\n\n', function() {
        dispTestCaseRunning('1. Set template property to path of template.xml has region of  picture\n/sdcard/Application/template.xml\n2.Set fileInteractiveMode to true\n3.Set inputSource to Invalid\n4. inputSourceFilename to /sdcard/Appliaction/image.jpg\n5. Call setCallback method with callback\n6. Call captureDocument method Capture a document by given image as a file\n');
        dispExpectedResult('should not capture the impage because  inputSource set to invalid source');
        //Common Method implemented to wait for tester to run the test.Code available in specHelper.js
        _result.waitToRunTest();
        runs(function() {
                //var dpxInstance = new Rho.DPX();
                dpxInstance.template = Rho.RhoFile.join(Rho.Application.AppBundleFolder, 'picture.xml');
                dpxInstance.inputSource = 'invalid';
                dpxInstance.fileInteractiveMode = 'true';
                dpxInstance.inputSourceFilename = Rho.RhoFile.join(Rho.Application.AppBundleFolder, 'image.jpg');
                dpxInstance.setCallback(captureCallback);
                dpxInstance.captureDocument();
        });
        //Add more waitsfor or run blocks if required.
        //Common Method implemented to wait for tester to make it pass or fail.Code available in specHelper.js
        _result.waitForResponse();
    });

    it('Objective:\nDocument capture set debug property  to invalid value and logDirectory  property set to /sdcard/Application/DPXLog\n\n', function() {
        dispTestCaseRunning('1. Set template property to path of template.xml has region of  picture\n/sdcard/Application/template.xml\n2.Set debug to invalid\n3.Set logDirectory to /sdcard/Application/DPXLog\n4.Set inputSource to camera\n5. Call setCallback method with callback\n6. Call captureDocument method Capture a document by taking a photo using camera\n');
        dispExpectedResult('captured document should get processed successfully and callback fired once for each field defined in the template \n\nbut It should not create the logdirectory at specified path because debug property default value is set to invalid');
        //Common Method implemented to wait for tester to run the test.Code available in specHelper.js
        _result.waitToRunTest();
        runs(function() {
                //var dpxInstance = new Rho.DPX();
                dpxInstance.template = Rho.RhoFile.join(Rho.Application.AppBundleFolder, 'picture.xml');
                dpxInstance.debug = 'invalid';
                dpxInstance.logDirectory = '/sdcard/Application/DPXLog';
                dpxInstance.inputSource = Rho.DPX.SOURCE_CAMERA;
                dpxInstance.setCallback(captureCallback);
                dpxInstance.captureDocument();
        });
        //Add more waitsfor or run blocks if required.
        //Common Method implemented to wait for tester to make it pass or fail.Code available in specHelper.js
        _result.waitForResponse();
    });

    it('Objective:\nDocument capture set debug property  to true  and logDirectory  property set to invalid path\n', function() {
        dispTestCaseRunning('1. Set template property to path of template.xml has region of  picture\n/sdcard/Application/template.xml\n2.Set debug to true\n3.Set logDirectory to /Application/sdcard/DPXLog\n4.Set inputSource to camera\n5. Call setCallback method with callback\n6. Call captureDocument method Capture a document by taking a photo using camera\n');
        dispExpectedResult('captured document should get processed successfully and callback fired once for each field defined in the template \n\nand It should not create the logdirectory because specified path is invalid');
        //Common Method implemented to wait for tester to run the test.Code available in specHelper.js
        _result.waitToRunTest();
        runs(function() {
                //var dpxInstance = new Rho.DPX();
                dpxInstance.template = Rho.RhoFile.join(Rho.Application.AppBundleFolder, 'picture.xml');
                dpxInstance.debug = true;
                dpxInstance.logDirectory = '/Application/sdcard/DPXLog';
                dpxInstance.inputSource = Rho.DPX.SOURCE_CAMERA;
                dpxInstance.setCallback(captureCallback);
                dpxInstance.captureDocument();
        });
        //Add more waitsfor or run blocks if required.
        //Common Method implemented to wait for tester to make it pass or fail.Code available in specHelper.js
        _result.waitForResponse();
    });

    it('Objective:\nDocument capture set manualResolutionMode  set to true and manualResolution set to invalid value  \nNote: Only applicabel to inputsource camera', function() {
        dispTestCaseRunning('1. Set template property to path of template.xml has region of  picture\n/sdcard/Application/template.xml\n2. Set manualResolutionMode to true\n3. Set manualResolution to inavalid (0000X0000)\n4. Set inputSource to camera\n5. Call setCallback method with callback\n6. Call captureDocument method Capture a document by taking a photo using camera\n\nNote: Only applicabel to inputsource camera');
        dispExpectedResult('captured document should get processed successfully and callback fired once for each field defined in the template\n\n and image size should be RESOLUTION_MEDIUM (1600x1200) default value');
        //Common Method implemented to wait for tester to run the test.Code available in specHelper.js
        _result.waitToRunTest();
        runs(function() {
                //var dpxInstance = new Rho.DPX();
                dpxInstance.template = Rho.RhoFile.join(Rho.Application.AppBundleFolder, 'picture.xml');
                dpxInstance.manualResolutionMode = true;
                dpxInstance.manualResolution ='invalid';
                dpxInstance.inputSource = Rho.DPX.SOURCE_CAMERA;
                dpxInstance.setCallback(captureCallback);
                dpxInstance.captureDocument();
        });
        //Add more waitsfor or run blocks if required.
        //Common Method implemented to wait for tester to make it pass or fail.Code available in specHelper.js
        _result.waitForResponse();
    });

    it('Objective:\nDocument capture set processingTimeout  property set to invalid value', function() {
        dispTestCaseRunning('1. Set template property to path of template.xml has region of  picture\n/sdcard/Application/template.xml\n2.Set processingTimeout to invalid\n3. Set inputSource to camera\n4. Call setCallback method with callback\n5. Call captureDocument method Capture a document by taking a photo using camera');
        dispExpectedResult('processingTimeout error should returned in callback when captured document is not able to processed successfully in 10 seconds');
        //Common Method implemented to wait for tester to run the test.Code available in specHelper.js
        _result.waitToRunTest();
        runs(function() {
                //var dpxInstance = new Rho.DPX();
                dpxInstance.template = Rho.RhoFile.join(Rho.Application.AppBundleFolder, 'picture.xml');
                dpxInstance.processingTimeout = -10000;
                dpxInstance.inputSource = Rho.DPX.SOURCE_CAMERA;
                dpxInstance.setCallback(captureCallback);
                dpxInstance.captureDocument();
        });
        //Add more waitsfor or run blocks if required.
        //Common Method implemented to wait for tester to make it pass or fail.Code available in specHelper.js
        _result.waitForResponse();
    });

    it('Objective:\nDocument capture set userMode property with set to invalid value\n', function() {
        dispTestCaseRunning('1. Set template property to path of template.xml has region of  picture\n/sdcard/Application/template.xml\n2.Set userMode to invalid\n3. Set inputSource to camera\n4. Call setCallback method with callback\n5. Call captureDocument method Capture a document by taking a photo using camera\n\nNote: Only valid for Input Source is camera');
        dispExpectedResult('snapshot mode should be used to capture document and it should get processed successfully and callback fired once for each field defined in the template ');
        //Common Method implemented to wait for tester to run the test.Code available in specHelper.js
        _result.waitToRunTest();
        runs(function() {
                //var dpxInstance = new Rho.DPX();
                dpxInstance.template = Rho.RhoFile.join(Rho.Application.AppBundleFolder, 'picture.xml');
                dpxInstance.userMode = 'invalid';
                dpxInstance.inputSource = Rho.DPX.SOURCE_CAMERA;
                dpxInstance.setCallback(captureCallback);
                dpxInstance.captureDocument();
        });
        //Add more waitsfor or run blocks if required.
        //Common Method implemented to wait for tester to make it pass or fail.Code available in specHelper.js
        _result.waitForResponse();
    });

    it('Objective:\nDocument capture set uiResultConfirmation property set to invalid\n', function() {
        dispTestCaseRunning('1. Set template property to path of template.xml has region of  picture\n/sdcard/Application/template.xml\n2. Set uiResultConfirmation to invalid\n3. Set inputSource to camera\n4. Call setCallback method with callback\n5. Call captureDocument method Capture a document by taking a photo using camera\n');
        dispExpectedResult('It should shows a UI confirmation with results in DPXView before sending results back to application \n\nafter captured document successfully processed and callback fired once for each field defined in the template ');
        //Common Method implemented to wait for tester to run the test.Code available in specHelper.js
        _result.waitToRunTest();
        runs(function() {
                //var dpxInstance = new Rho.DPX();
                dpxInstance.template = Rho.RhoFile.join(Rho.Application.AppBundleFolder, 'picture.xml');
                dpxInstance.uiResultConfirmation = 'invalid';
                dpxInstance.inputSource = Rho.DPX.SOURCE_CAMERA;
                dpxInstance.setCallback(captureCallback);
                dpxInstance.captureDocument();
        });
        //Add more waitsfor or run blocks if required.
        //Common Method implemented to wait for tester to make it pass or fail.Code available in specHelper.js
        _result.waitForResponse();
    });


    it('Objective:\nDocument capture set zoomAmount property with set to 150 \n', function() {
        dispTestCaseRunning('1. Set template property to path of template.xml has region of  picture\n/sdcard/Application/template.xml\n2. Set zoomAmount to 150\n3. Set inputSource to camera\n4. Call setCallback method with callback\n5. Call captureDocument method Capture a document by taking a photo using camera\n\nNote: Only applicalbe to input source camera\n');
        dispExpectedResult('There should not be any camera zoom  and \ncaptured document should get processed successfully and callback fired once for each field defined in the template ');
        //Common Method implemented to wait for tester to run the test.Code available in specHelper.js
        _result.waitToRunTest();
        runs(function() {
                //var dpxInstance = new Rho.DPX();
                dpxInstance.template = Rho.RhoFile.join(Rho.Application.AppBundleFolder, 'picture.xml');
                dpxInstance.zoomAmount = 150;
                dpxInstance.inputSource = Rho.DPX.SOURCE_CAMERA;
                dpxInstance.setCallback(captureCallback);
                dpxInstance.captureDocument();
        });
        //Add more waitsfor or run blocks if required.
        //Common Method implemented to wait for tester to make it pass or fail.Code available in specHelper.js
        _result.waitForResponse();
    });

    it('Objective:\nDocument capture set zoomAmount property with set to -50 \n\n', function() {
        dispTestCaseRunning('1. Set template property to path of template.xml has region of  picture\n/sdcard/Application/template.xml\n2. Set zoomAmount to -50\n3. Set inputSource to camera\n4. Call setCallback method with callback\n5. Call captureDocument method Capture a document by taking a photo using camera\n\nNote: Only applicalbe to input source camera\n');
        dispExpectedResult('There should not be any camera zoom  and \ncaptured document should get processed successfully and callback fired once for each field defined in the template ');
        //Common Method implemented to wait for tester to run the test.Code available in specHelper.js
        _result.waitToRunTest();
        runs(function() {
                //var dpxInstance = new Rho.DPX();
                dpxInstance.template = Rho.RhoFile.join(Rho.Application.AppBundleFolder, 'picture.xml');
                dpxInstance.zoomAmount = -50;
                dpxInstance.inputSource = Rho.DPX.SOURCE_CAMERA;
                dpxInstance.setCallback(captureCallback);
                dpxInstance.captureDocument();
        });
        //Add more waitsfor or run blocks if required.
        //Common Method implemented to wait for tester to make it pass or fail.Code available in specHelper.js
        _result.waitForResponse();
    });

    it('Objective:\nDocument capture and show image on HTML page using invalid Id of image in imageId param calling getDataUri method\n', function() {
        dispTestCaseRunning('1. Set template property to path of template.xml has region of  picture\n/sdcard/Application/template.xml\n2. Set inputSource to camera\n3. Call setCallback method with callback\n4. Call captureDocument method Capture a document by taking a photo using camera\n5. Call getDataUri method with invalid imageid (id of image will be returned in callback with processedData)\n\n');
        dispExpectedResult('captured document should get processed successfully and callback fired once for each field defined in the template and \n\nit should not show the image on HTML page insert data URI in src attribute of img tag');
        //Common Method implemented to wait for tester to run the test.Code available in specHelper.js
        _result.waitToRunTest();
        runs(function() {
                //var dpxInstance = new Rho.DPX();
                dpxInstance.template = Rho.RhoFile.join(Rho.Application.AppBundleFolder, 'picture.xml');
                dpxInstance.zoomAmount = 100;
                dpxInstance.inputSource = Rho.DPX.SOURCE_CAMERA;
                dpxInstance.setCallback(captureCallback);
                dpxInstance.captureDocument();
                waitsFor(function () {
                        return getregionImageId != null;
                }, '90sec Wait before move to next test', 90000);
                dpxInstance.getDataUri(100);
        });
        //Add more waitsfor or run blocks if required.
        //Common Method implemented to wait for tester to make it pass or fail.Code available in specHelper.js
        _result.waitForResponse();
    });

    it('Objective:\nDocument capture with template from http location', function() {
        dispTestCaseRunning('1. Set template property to http path of template.xml has region of  picture\nhttp://192.168.6.18/neon/template.xml\n2.Set inputsource to camera\n3. Call setCallback method with callback\n4. Call captureDocument method Capture a document by taking a photo using camera\n');
        dispExpectedResult('captured document should get processed successfully and callback fired once for each field defined in the template');
        //Common Method implemented to wait for tester to run the test.Code available in specHelper.js
        _result.waitToRunTest();
        runs(function() {
                //var dpxInstance = new Rho.DPX();
                dpxInstance.inputSource = Rho.DPX.SOURCE_CAMERA;
                dpxInstance.setCallback(captureCallback);
                dpxInstance.template = 'http://192.168.6.18/neon/ReceivedFiles/picture.xml';
                dpxInstance.captureDocument();
        });
        //Add more waitsfor or run blocks if required.
        //Common Method implemented to wait for tester to make it pass or fail.Code available in specHelper.js
        _result.waitForResponse();
    });


    var captureCallback =  function (args){

        var result = '';
            //result = JSON.stringify(args);
            result += '<br/>Callbacktype:- ' + JSON.stringify(args.callbackType);
            result += '<br/>Failurereason:- ' + JSON.stringify(args.failureReason);
            result += '<br/>TemplatName:- ' + JSON.stringify(args.processedForm.template.name);
            result += '<br/>TemplatNumber:- ' + JSON.stringify(args.processedForm.template.number);
            result += '<br/>CapturedFormName:- ' + JSON.stringify(args.processedForm.formCapture.name);
            result += '<br/>CapturedFormwidth:- ' + JSON.stringify(args.processedForm.formCapture.image.width);
            result += '<br/>CapturedFormheight:- ' + JSON.stringify(args.processedForm.formCapture.image.height);
            result += '<br/>CapturedFormid:- ' + JSON.stringify(args.processedForm.formCapture.image.id);
            result += '<br/>RegionGroup:- ' + JSON.stringify(args.processedForm.regions[0].group);
            result += '<br/>RegionName:- ' + JSON.stringify(args.processedForm.regions[0].name);
            result += '<br/>RegionNumber:- ' + JSON.stringify(args.processedForm.regions[0].number);
            result += '<br/>RegionProccessingMode:- ' + JSON.stringify(args.processedForm.regions[0].processingMode);
            result += '<br/>RegionProccessingMode:- ' + JSON.stringify(args.processedForm.regions[0].processedData);
            result += '<br/>ProccessedImageWidth:- ' + JSON.stringify(args.processedForm.regions[0].image.width);
            result += '<br/>ProccessedImageWidth:- ' + JSON.stringify(args.processedForm.regions[0].image.height);
            result += '<br/>ProccessedImageHieght:- ' + JSON.stringify(args.processedForm.regions[0].image.id);
            result += '<br/>RelativeocrConfidence:- ' + JSON.stringify(args.processedForm.regions[0].relativeOcrConfidence);
            result += '<br/>AbsoluteocrConfidence:- ' + JSON.stringify(args.processedForm.regions[0].absoluteOcrConfidence);

            getformCaptureImageId =  JSON.stringify(args.processedForm.formCapture.image.id);
            getregionImageId =  JSON.stringify(args.processedForm.regions[0].image.id);

        displayResult("Output: ",result);
    };
});
