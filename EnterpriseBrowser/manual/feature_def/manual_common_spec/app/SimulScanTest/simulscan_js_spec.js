describe('SimulScan Functionality Test', function() {

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

    var runsCaptureDocument = function(callbackType, callback) {
        var stopped = false;

        runs(function() {
            displayResult('Output: ', '-');
            EB.SimulScan.captureDocument(function(dict) {
                if (dict['callbackType'] === callbackType) {
                    callback(dict);
                }
                if (dict['callbackType'] === EB.SimulScan.STOP) {
                    stopped = true;
                }
            });
        });

        waitsFor(function() {
            return stopped;
        }, "the capture to complete", 1000000);
    };

    var getformCaptureImageId = null;
    var getregionImageId = null;

    beforeEach(function() {
        getformCaptureImageId = null;
        getregionImageId = null;
        EB.SimulScan.close();
    });

	it('Document capture with barcode, omr, ocr, picture.', function() {
        dispTestCaseRunning('Scan Delivery Attempt Notification');
        dispExpectedResult('No expected result. This is automatic test.');

        _result.waitToRunAutoTest();

        EB.SimulScan.template = 'file:///sdcard/simulscan/templates/Logistics%20Post.xml';
        EB.SimulScan.uiResultConfirmation = false;
        EB.SimulScan.audioFeedback = false;

        var regions;

        runsCaptureDocument(EB.SimulScan.SUCCESS, function(dict) {
            regions = dict['processedForm']['regions'];
        });

        runs(function() {
            _result.passed();

            expect(regions[0]['processingMode']).toEqual(EB.SimulScan.PM_BARCODE);
            expect(regions[1]['processingMode']).toEqual(EB.SimulScan.PM_OMR);
            expect(regions[2]['processingMode']).toEqual(EB.SimulScan.PM_OCR);
            expect(regions[5]['processingMode']).toEqual(EB.SimulScan.PM_PICTURE);
        });

        _result.waitForResponse();
    });
	
	/*it('Document capture with template xml in http path.', function() {
        dispTestCaseRunning('1. Set template property to http path of template.xml has region of  picture\nhttp://192.168.6.18/neon/template.xml\n2.Set inputsource to camera\n3. Call captureDocument method Capture a document by taking a photo using camera\n');
        dispExpectedResult('captured document should get processed successfully and callback fired once for each field defined in the template.');

        _result.waitToRunTest();

        EB.SimulScan.template = 'http://192.168.6.18/neon/ReceivedFiles/Logistics%20Post.xml';
        runsCaptureDocument(EB.SimulScan.SUCCESS, function(dict) {
            displayResult('Output: ', 'callbackType is ' + dict['callbackType']);
        });

        _result.waitForResponse();
    });
	
	it('Document capture with template xml invalid path.', function() {
        dispTestCaseRunning('1. Set template property to http path of template.xml has region of  picture\nhttp://192.168.6.18/neon/template.xml\n2.Set inputsource to camera\n3. Call captureDocument method Capture a document by taking a photo using camera\n');
        dispExpectedResult('captured document should get processed successfully and callback fired once for each field defined in the template.');

        _result.waitToRunTest();

        EB.SimulScan.template = 'file:///templates/sdcard/Logistics%20Post.xml';
        runsCaptureDocument(EB.SimulScan.SUCCESS, function(dict) {
            displayResult('Output: ', 'callbackType is ' + dict['callbackType']);
        });

        _result.waitForResponse();
    });

	it('Document capture with template xml null path.', function() {
        dispTestCaseRunning('1. Set template property to http path of template.xml has region of  picture\nhttp://192.168.6.18/neon/template.xml\n2.Set inputsource to camera\n3. Call captureDocument method Capture a document by taking a photo using camera\n');
        dispExpectedResult('captured document should get processed successfully and callback fired once for each field defined in the template.');

        _result.waitToRunTest();

        EB.SimulScan.template = 'file:///templates/sdcard/Logistics%20Post.xml';
        runsCaptureDocument(EB.SimulScan.SUCCESS, function(dict) {
            displayResult('Output: ', 'callbackType is ' + dict['callbackType']);
        });

        _result.waitForResponse();
    });*/

    it('Only audio, led and haptic feedback is default on.', function() {
        dispTestCaseRunning('Scan Delivery Attempt Notification');
        dispExpectedResult('callbackType should be success.\nThere must be all audio, led and haptic feedback at end of scan.');

        _result.waitToRunTest();

        EB.SimulScan.template = 'file:///sdcard/simulscan/templates/Logistics%20Post.xml';
        runsCaptureDocument(EB.SimulScan.SUCCESS, function(dict) {
            displayResult('Output: ', 'callbackType is ' + dict['callbackType']);
        });

        _result.waitForResponse();
    });
	
	it('Only audio feedback is off.', function() {
        dispTestCaseRunning('Scan Delivery Attempt Notification');
        dispExpectedResult('callbackType should be success.\nThere should not be any audio feedback at end of scan.');

        _result.waitToRunTest();

        EB.SimulScan.template = 'file:///sdcard/simulscan/templates/Logistics%20Post.xml';
        EB.SimulScan.audioFeedback = false;
		EB.SimulScan.hapticFeedback = false;
        EB.SimulScan.ledFeedback = false;


        runsCaptureDocument(EB.SimulScan.SUCCESS, function(dict) {
            displayResult('Output: ', 'callbackType is ' + dict['callbackType']);
        });

        _result.waitForResponse();
    });
	
	it('Only audio feedback is on.', function() {
        dispTestCaseRunning('Scan Delivery Attempt Notification');
        dispExpectedResult('callbackType should be success.\nThere must be only audio feedback at end of scan.');

        _result.waitToRunTest();

        EB.SimulScan.template = 'file:///sdcard/simulscan/templates/Logistics%20Post.xml';
        EB.SimulScan.audioFeedback = true;
		EB.SimulScan.hapticFeedback = false;
        EB.SimulScan.ledFeedback = false;
        runsCaptureDocument(EB.SimulScan.SUCCESS, function(dict) {
            displayResult('Output: ', 'callbackType is ' + dict['callbackType']);
        });

        _result.waitForResponse();
    });
	
    it('Only audio feedback is invalid.', function() {
        dispTestCaseRunning('Scan Delivery Attempt Notification');
        dispExpectedResult('callbackType should be success.\nThere must be only audio feedback at end of scan.');

        _result.waitToRunTest();

        EB.SimulScan.template = 'file:///sdcard/simulscan/templates/Logistics%20Post.xml';
        EB.SimulScan.uiResultConfirmation = false;

        EB.SimulScan.audioFeedback = 'invalid';
        EB.SimulScan.hapticFeedback = false;
        EB.SimulScan.ledFeedback = false;

        runsCaptureDocument(EB.SimulScan.SUCCESS, function(dict) {
            displayResult('Output: ', 'callbackType is ' + dict['callbackType']);
        });

        _result.waitForResponse();
    });
	
	it('Only audio feedback null.', function() {
        dispTestCaseRunning('Scan Delivery Attempt Notification');
        dispExpectedResult('callbackType should be success.\nThere must be only audio feedback at end of scan.');

        _result.waitToRunTest();

        EB.SimulScan.template = 'file:///sdcard/simulscan/templates/Logistics%20Post.xml';
        EB.SimulScan.uiResultConfirmation = false;

        EB.SimulScan.audioFeedback = '';
        EB.SimulScan.hapticFeedback = false;
        EB.SimulScan.ledFeedback = false;

        runsCaptureDocument(EB.SimulScan.SUCCESS, function(dict) {
            displayResult('Output: ', 'callbackType is ' + dict['callbackType']);
        });

        _result.waitForResponse();
    });

    it('Only haptic feedback is off.', function() {
        dispTestCaseRunning('Scan Delivery Attempt Notification');
        dispExpectedResult('callbackType should be success.\nThere should not be haptic feedback at end of scan.');

        _result.waitToRunTest();

        EB.SimulScan.template = 'file:///sdcard/simulscan/templates/Logistics%20Post.xml';
        EB.SimulScan.uiResultConfirmation = false;

        EB.SimulScan.audioFeedback = false;
        EB.SimulScan.hapticFeedback = false;
        EB.SimulScan.ledFeedback = false;

        runsCaptureDocument(EB.SimulScan.SUCCESS, function(dict) {
            displayResult('Output: ', 'callbackType is ' + dict['callbackType']);
        });

        _result.waitForResponse();
    });
	
	it('Only haptic feedback is on.', function() {
        dispTestCaseRunning('Scan Delivery Attempt Notification');
        dispExpectedResult('callbackType should be success.\nThere must be only haptic feedback at end of scan.');

        _result.waitToRunTest();

        EB.SimulScan.template = 'file:///sdcard/simulscan/templates/Logistics%20Post.xml';
        EB.SimulScan.uiResultConfirmation = false;

        EB.SimulScan.audioFeedback = false;
        EB.SimulScan.hapticFeedback = true;
        EB.SimulScan.ledFeedback = false;

        runsCaptureDocument(EB.SimulScan.SUCCESS, function(dict) {
            displayResult('Output: ', 'callbackType is ' + dict['callbackType']);
        });

        _result.waitForResponse();
    });
	
	it('Only haptic feedback with invalid.', function() {
        dispTestCaseRunning('Scan Delivery Attempt Notification');
        dispExpectedResult('callbackType should be success.\nThere must be only haptic feedback at end of scan.');

        _result.waitToRunTest();

        EB.SimulScan.template = 'file:///sdcard/simulscan/templates/Logistics%20Post.xml';
        EB.SimulScan.uiResultConfirmation = false;

        EB.SimulScan.audioFeedback = false;
        EB.SimulScan.hapticFeedback = 'invalid';
        EB.SimulScan.ledFeedback = false;

        runsCaptureDocument(EB.SimulScan.SUCCESS, function(dict) {
            displayResult('Output: ', 'callbackType is ' + dict['callbackType']);
        });

        _result.waitForResponse();
    });
	
	it('Only haptic feedback with null.', function() {
        dispTestCaseRunning('Scan Delivery Attempt Notification');
        dispExpectedResult('callbackType should be success.\nThere must be only haptic feedback at end of scan.');

        _result.waitToRunTest();

        EB.SimulScan.template = 'file:///sdcard/simulscan/templates/Logistics%20Post.xml';
        EB.SimulScan.uiResultConfirmation = false;

        EB.SimulScan.audioFeedback = false;
        EB.SimulScan.hapticFeedback = '';
        EB.SimulScan.ledFeedback = false;

        runsCaptureDocument(EB.SimulScan.SUCCESS, function(dict) {
            displayResult('Output: ', 'callbackType is ' + dict['callbackType']);
        });

        _result.waitForResponse();
    });
	

    it('Only led feedback is off.', function() {
        dispTestCaseRunning('Scan Delivery Attempt Notification');
        dispExpectedResult('callbackType should be success.\nThere should not be only led feedback at end of scan.');

        _result.waitToRunTest();

        EB.SimulScan.template = 'file:///sdcard/simulscan/templates/Logistics%20Post.xml';
        EB.SimulScan.uiResultConfirmation = false;

        EB.SimulScan.audioFeedback = false;
        EB.SimulScan.hapticFeedback = false;
        EB.SimulScan.ledFeedback = true;

        runsCaptureDocument(EB.SimulScan.SUCCESS, function(dict) {
            displayResult('Output: ', 'callbackType is ' + dict['callbackType']);
        });

        _result.waitForResponse();
    });

    it('Only led feedback is on.', function() {
        dispTestCaseRunning('Scan Delivery Attempt Notification');
        dispExpectedResult('callbackType should be success.\nThere must be only led feedback at end of scan.');

        _result.waitToRunTest();

        EB.SimulScan.template = 'file:///sdcard/simulscan/templates/Logistics%20Post.xml';
        EB.SimulScan.uiResultConfirmation = false;

        EB.SimulScan.audioFeedback = false;
        EB.SimulScan.hapticFeedback = false;
        EB.SimulScan.ledFeedback = true;

        runsCaptureDocument(EB.SimulScan.SUCCESS, function(dict) {
            displayResult('Output: ', 'callbackType is ' + dict['callbackType']);
        });

        _result.waitForResponse();
    });

    it('Only led feedback with invalid.', function() {
        dispTestCaseRunning('Scan Delivery Attempt Notification');
        dispExpectedResult('callbackType should be success.\nThere must be only led feedback at end of scan.');

        _result.waitToRunTest();

        EB.SimulScan.template = 'file:///sdcard/simulscan/templates/Logistics%20Post.xml';
        EB.SimulScan.uiResultConfirmation = false;

        EB.SimulScan.audioFeedback = false;
        EB.SimulScan.hapticFeedback = false;
        EB.SimulScan.ledFeedback = 'invalid';

        runsCaptureDocument(EB.SimulScan.SUCCESS, function(dict) {
            displayResult('Output: ', 'callbackType is ' + dict['callbackType']);
        });

        _result.waitForResponse();
    });

    it('Only led feedback with null.', function() {
        dispTestCaseRunning('Scan Delivery Attempt Notification');
        dispExpectedResult('callbackType should be success.\nThere must be only led feedback at end of scan.');

        _result.waitToRunTest();

        EB.SimulScan.template = 'file:///sdcard/simulscan/templates/Logistics%20Post.xml';
        EB.SimulScan.uiResultConfirmation = false;

        EB.SimulScan.audioFeedback = false;
        EB.SimulScan.hapticFeedback = false;
        EB.SimulScan.ledFeedback = '';

        runsCaptureDocument(EB.SimulScan.SUCCESS, function(dict) {
            displayResult('Output: ', 'callbackType is ' + dict['callbackType']);
        });

        _result.waitForResponse();
    });	
	
    it('flash mode with default value', function() {
        dispTestCaseRunning('Scan Delivery Attempt Notification');
        dispExpectedResult('callbackType should be success.\nFlash must be off during scan.');

        _result.waitToRunTest();

        EB.SimulScan.template = 'file:///sdcard/simulscan/templates/Logistics%20Post.xml';
        EB.SimulScan.uiResultConfirmation = false;
        EB.SimulScan.audioFeedback = true;

        runsCaptureDocument(EB.SimulScan.SUCCESS, function(dict) {
            displayResult('Output: ', 'callbackType is ' + dict['callbackType']);
        });

        _result.waitForResponse();
    });

		
    it('flash mode is on', function() {
        dispTestCaseRunning('Scan Delivery Attempt Notification');
        dispExpectedResult('callbackType should be success.\nFlash must be on during scan.');

        _result.waitToRunTest();

        EB.SimulScan.template = 'file:///sdcard/simulscan/templates/Logistics%20Post.xml';
        EB.SimulScan.uiResultConfirmation = false;
        EB.SimulScan.audioFeedback = true;

        EB.SimulScan.flashMode = EB.SimulScan.FLASH_ON;

        runsCaptureDocument(EB.SimulScan.SUCCESS, function(dict) {
            displayResult('Output: ', 'callbackType is ' + dict['callbackType']);
        });

        _result.waitForResponse();
    });
	
	/*it('flash mode with invalid', function() {
        dispTestCaseRunning('Scan Delivery Attempt Notification');
        dispExpectedResult('callbackType should be success.\nFlash must be on during scan.');

        _result.waitToRunTest();

        EB.SimulScan.template = 'file:///sdcard/simulscan/templates/Logistics%20Post.xml';
        EB.SimulScan.uiResultConfirmation = false;
        EB.SimulScan.audioFeedback = true;

        EB.SimulScan.flashMode = 'invalid';

        runsCaptureDocument(EB.SimulScan.SUCCESS, function(dict) {
            displayResult('Output: ', 'callbackType is ' + dict['callbackType']);
        });

        _result.waitForResponse();
    });
	
	it('flash mode with null', function() {
        dispTestCaseRunning('Scan Delivery Attempt Notification');
        dispExpectedResult('callbackType should be success.\nFlash must be on during scan.');

        _result.waitToRunTest();

        EB.SimulScan.template = 'file:///sdcard/simulscan/templates/Logistics%20Post.xml';
        EB.SimulScan.uiResultConfirmation = false;
        EB.SimulScan.audioFeedback = true;

        EB.SimulScan.flashMode = '';

        runsCaptureDocument(EB.SimulScan.SUCCESS, function(dict) {
            displayResult('Output: ', 'callbackType is ' + dict['callbackType']);
        });

        _result.waitForResponse();
    });

    it('flash mode is auto (dark)', function() {
        dispTestCaseRunning('Scan Delivery Attempt Notification in dark environment.');
        dispExpectedResult('callbackType should be success.\nFlash must be on.');

        _result.waitToRunTest();

        EB.SimulScan.template = 'file:///sdcard/simulscan/templates/Logistics%20Post.xml';
        EB.SimulScan.uiResultConfirmation = false;
        EB.SimulScan.audioFeedback = false;

        EB.SimulScan.flashMode = EB.SimulScan.FLASH_AUTO;

        runsCaptureDocument(EB.SimulScan.SUCCESS, function(dict) {
            displayResult('Output: ', 'callbackType is ' + dict['callbackType']);
        });

        _result.waitForResponse();
    });

    it('flash mode is auto (light)', function() {
        dispTestCaseRunning('Scan Delivery Attempt Notification in good lighting.');
        dispExpectedResult('callbackType should be success.\nFlash must be off.');

        _result.waitToRunTest();

        EB.SimulScan.template = 'file:///sdcard/simulscan/templates/Logistics%20Post.xml';
        EB.SimulScan.uiResultConfirmation = false;
        EB.SimulScan.audioFeedback = false;

        EB.SimulScan.flashMode = EB.SimulScan.FLASH_AUTO;

        runsCaptureDocument(EB.SimulScan.SUCCESS, function(dict) {
            displayResult('Output: ', 'callbackType is ' + dict['callbackType']);
        });

        _result.waitForResponse();
    });*/
	
    it('flash mode is off', function() {
        dispTestCaseRunning('Scan Delivery Attempt Notification');
        dispExpectedResult('callbackType should be success.\nFlash must be off.');

        _result.waitToRunTest();

        EB.SimulScan.template = 'file:///sdcard/simulscan/templates/Logistics%20Post.xml';
        EB.SimulScan.uiResultConfirmation = false;
        EB.SimulScan.audioFeedback = true;

        EB.SimulScan.flashMode = EB.SimulScan.FLASH_OFF;

        runsCaptureDocument(EB.SimulScan.SUCCESS, function(dict) {
            displayResult('Output: ', 'callbackType is ' + dict['callbackType']);
        });

        _result.waitForResponse();
    });
	
it('identificationTimeout with default', function() {
        dispTestCaseRunning('Do not frame form. Wait for 20s. Press back button.');
        dispExpectedResult('identificationTimeout should be about 15.');

        _result.waitToRunTest();

        EB.SimulScan.template = 'file:///sdcard/simulscan/templates/Logistics%20Post.xml';
        EB.SimulScan.uiResultConfirmation = false;
        EB.SimulScan.audioFeedback = true;

        var start;
        runs(function() {
            start = new Date().getTime();
        });

        runsCaptureDocument(EB.SimulScan.FAILURE, function(dict) {
            var finish = new Date().getTime();
            displayResult('Output: ', 'identificationTimeout is ' + (finish - start) / 1000);
			displayResult('Output: ', 'failureReason is ' + dict['failureReason']);
        });

        _result.waitForResponse();
    });
	
    it('identificationTimeout 0 second', function() {
        dispTestCaseRunning('Do not frame form. Wait for 20s. Press back button.');
        dispExpectedResult('identificationTimeout should be about 0.');

        _result.waitToRunTest();

        EB.SimulScan.template = 'file:///sdcard/simulscan/templates/Logistics%20Post.xml';
        EB.SimulScan.uiResultConfirmation = false;
        EB.SimulScan.audioFeedback = true;

        EB.SimulScan.identificationTimeout = 0;

        var start;
        runs(function() {
            start = new Date().getTime();
        });

        runsCaptureDocument(EB.SimulScan.FAILURE, function(dict) {
            var finish = new Date().getTime();
            displayResult('Output: ', 'identificationTimeout is ' + (finish - start) / 1000);
			displayResult('Output: ', 'failureReason is ' + dict['failureReason']);
        });

        _result.waitForResponse();
    });

    it('identificationTimeout 10 second', function() {
        dispTestCaseRunning('Do not frame form. Wait for 20s. Press back button.');
        dispExpectedResult('identificationTimeout should be about 10.');

        _result.waitToRunTest();

        EB.SimulScan.template = 'file:///sdcard/simulscan/templates/Logistics%20Post.xml';
        EB.SimulScan.uiResultConfirmation = false;
        EB.SimulScan.audioFeedback = true;

        EB.SimulScan.identificationTimeout = 10000;

        var start;
        runs(function() {
            start = new Date().getTime();
        });

        runsCaptureDocument(EB.SimulScan.FAILURE, function(dict) {
            var finish = new Date().getTime();
            displayResult('Output: ', 'identificationTimeout is ' + (finish - start) / 1000);
			displayResult('Output: ', 'failureReason is ' + dict['failureReason']);
        });

        _result.waitForResponse();
    });
	
    it('identificationTimeout 5 second', function() {
        dispTestCaseRunning('Do not frame form. Wait for 20s. Press back button.');
        dispExpectedResult('identificationTimeout should be about 5.');

        _result.waitToRunTest();

        EB.SimulScan.template = 'file:///sdcard/simulscan/templates/Logistics%20Post.xml';
        EB.SimulScan.uiResultConfirmation = false;
        EB.SimulScan.audioFeedback = true;

        EB.SimulScan.identificationTimeout = 5000;

        var start;
        runs(function() {
            start = new Date().getTime();
        });

        runsCaptureDocument(EB.SimulScan.FAILURE, function(dict) {
            var finish = new Date().getTime();
            displayResult('Output: ', 'identificationTimeout is ' + (finish - start) / 1000);
			displayResult('Output: ', 'failureReason is ' + dict['failureReason']);
        });

        _result.waitForResponse();
    });
	
	it('identificationTimeout 20 second', function() {
        dispTestCaseRunning('Do not frame form. Wait for 20s. Press back button.');
        dispExpectedResult('identificationTimeout should be about 20.');

        _result.waitToRunTest();

        EB.SimulScan.template = 'file:///sdcard/simulscan/templates/Logistics%20Post.xml';
        EB.SimulScan.uiResultConfirmation = false;
        EB.SimulScan.audioFeedback = true;

        EB.SimulScan.identificationTimeout = 20000;

        var start;
        runs(function() {
            start = new Date().getTime();
        });

        runsCaptureDocument(EB.SimulScan.FAILURE, function(dict) {
            var finish = new Date().getTime();
            displayResult('Output: ', 'identificationTimeout is ' + (finish - start) / 1000);
			displayResult('Output: ', 'failureReason is ' + dict['failureReason']);
        });

        _result.waitForResponse();
    });
	
    it('identificationTimeout 22 second', function() {
        dispTestCaseRunning('Do not frame form. Wait for 20s. Press back button.');
        dispExpectedResult('identificationTimeout should be about 22.');

        _result.waitToRunTest();

        EB.SimulScan.template = 'file:///sdcard/simulscan/templates/Logistics%20Post.xml';
        EB.SimulScan.uiResultConfirmation = false;
        EB.SimulScan.audioFeedback = true;

        EB.SimulScan.identificationTimeout = 22000;

        var start;
        runs(function() {
            start = new Date().getTime();
        });

        runsCaptureDocument(EB.SimulScan.FAILURE, function(dict) {
            var finish = new Date().getTime();
            displayResult('Output: ', 'identificationTimeout is ' + (finish - start) / 1000);
			displayResult('Output: ', 'failureReason is ' + dict['failureReason']);
        });

        _result.waitForResponse();
    });
	
	/*it('identificationTimeout with invalid value', function() {
        dispTestCaseRunning('Do not frame form. Wait for 20s. Press back button.');
        dispExpectedResult('identificationTimeout should be about 22.');

        _result.waitToRunTest();

        EB.SimulScan.template = 'file:///sdcard/simulscan/templates/Logistics%20Post.xml';
        EB.SimulScan.uiResultConfirmation = false;
        EB.SimulScan.audioFeedback = true;

        EB.SimulScan.identificationTimeout = -10000;

        var start;
        runs(function() {
            start = new Date().getTime();
        });

        runsCaptureDocument(EB.SimulScan.FAILURE, function(dict) {
            var finish = new Date().getTime();
            displayResult('Output: ', 'identificationTimeout is ' + (finish - start) / 1000);
			displayResult('Output: ', 'failureReason is ' + dict['failureReason']);
        });

        _result.waitForResponse();
    });
	
	it('identificationTimeout with null value', function() {
        dispTestCaseRunning('Do not frame form. Wait for 20s. Press back button.');
        dispExpectedResult('identificationTimeout should be about 22.');

        _result.waitToRunTest();

        EB.SimulScan.template = 'file:///sdcard/simulscan/templates/Logistics%20Post.xml';
        EB.SimulScan.uiResultConfirmation = false;
        EB.SimulScan.audioFeedback = true;

        EB.SimulScan.identificationTimeout = '';

        var start;
        runs(function() {
            start = new Date().getTime();
        });

        runsCaptureDocument(EB.SimulScan.FAILURE, function(dict) {
            var finish = new Date().getTime();
            displayResult('Output: ', 'identificationTimeout is ' + (finish - start) / 1000);
			displayResult('Output: ', 'failureReason is ' + dict['failureReason']);
        });

        _result.waitForResponse();
    });*/
	
    it('inputSource default value', function() {
        dispTestCaseRunning('1.Set template \n2. Call captureDocument method with callback Capture a document \nby taking a photo using camera');
        dispExpectedResult('captured document should get processed successfully and callback fired once for each field defined in the template.');

        _result.waitToRunTest();

        EB.SimulScan.template = 'file:///sdcard/simulscan/templates/Logistics%20Post.xml';
        EB.SimulScan.uiResultConfirmation = false;
        EB.SimulScan.audioFeedback = true;

        runsCaptureDocument(EB.SimulScan.SUCCESS, function(dict) {
            displayResult('Output: ', 'callbackType is ' + dict['callbackType']);
			displayResult('Output: ', 'failureReason is ' + dict['failureReason']);
        });

        _result.waitForResponse();
    });
	
    it('inputSource set camera value', function() {
        dispTestCaseRunning('1.Set template \n2.2.Set inputSource to camera\n3. Call captureDocument method with callback Capture a document \nby taking a photo using camera');
        dispExpectedResult('captured document should get processed successfully and callback fired once for each field defined in the template.');

        _result.waitToRunTest();

        EB.SimulScan.template = 'file:///sdcard/simulscan/templates/Logistics%20Post.xml';
        EB.SimulScan.uiResultConfirmation = false;
        EB.SimulScan.audioFeedback = true;

		EB.SimulScan.inputSource = EB.SimulScan.SOURCE_CAMERA;
		
        runsCaptureDocument(EB.SimulScan.SUCCESS, function(dict) {
            displayResult('Output: ', 'callbackType is ' + dict['callbackType']);
			displayResult('Output: ', 'failureReason is ' + dict['failureReason']);
        });

        _result.waitForResponse();
    });
	
	it('inputSource set to invalid value', function() {
        dispTestCaseRunning('1.Set template \n2.2.Set inputSource to invalid\n3. Call captureDocument method with callback Capture a document \nby taking a photo using camera');
        dispExpectedResult('captured document should get processed successfully and callback fired once for each field defined in the template.');

        _result.waitToRunTest();

        EB.SimulScan.template = 'file:///sdcard/simulscan/templates/Logistics%20Post.xml';
        EB.SimulScan.uiResultConfirmation = false;
        EB.SimulScan.audioFeedback = true;

		EB.SimulScan.inputSource = 'invalid';
		
        runsCaptureDocument(EB.SimulScan.SUCCESS, function(dict) {
            displayResult('Output: ', 'callbackType is ' + dict['callbackType']);
			displayResult('Output: ', 'failureReason is ' + dict['failureReason']);
        });

        _result.waitForResponse();
    });
	
	it('inputSource set to null value', function() {
        dispTestCaseRunning('1.Set template \n2.2.Set inputSource to null\n3. Call captureDocument method with callback Capture a document \nby taking a photo using camera');
        dispExpectedResult('captured document should get processed successfully and callback fired once for each field defined in the template.');

        _result.waitToRunTest();

        EB.SimulScan.template = 'file:///sdcard/simulscan/templates/Logistics%20Post.xml';
        EB.SimulScan.uiResultConfirmation = false;
        EB.SimulScan.audioFeedback = true;

		EB.SimulScan.inputSource = '';
		
        runsCaptureDocument(EB.SimulScan.SUCCESS, function(dict) {
            displayResult('Output: ', 'callbackType is ' + dict['callbackType']);
			displayResult('Output: ', 'failureReason is ' + dict['failureReason']);
        });

        _result.waitForResponse();
    });
	
	it('fetchTmplates method with default value of templateDirectory', function() {
        dispTestCaseRunning('Scan Delivery Attempt Notification');
        dispExpectedResult('callbackType should be success.\nAll created templates in SimulScan server should get successfully \ndownloaded in device /sdcard/templates folder .');

        _result.waitToRunTest();

        //EB.SimulScan.template = 'file:///sdcard/simulscan/templates/Logistics%20Post.xml';
        //EB.SimulScan.uiResultConfirmation = false;
        //EB.SimulScan.audioFeedback = true;

        //EB.SimulScan.debug = true;
        //EB.SimulScan.logDirectory = '/sdcard/RhoSimulScanLog';
		
		EB.SimulScan.fetchTemplates("pxt367","");

        runsCaptureDocument(EB.SimulScan.SUCCESS, function(dict) {
            displayResult('Output: ', 'callbackType is ' + dict['callbackType']);
        });

        _result.waitForResponse();
    });
	
	it('fetchTmplates method with templateDirectory property set to\n /sdcard/Application/templates', function() {
        dispTestCaseRunning('Scan Delivery Attempt Notification');
        dispExpectedResult('callbackType should be success.\nAll created templates in SimulScan server should get successfully \ndownloaded in device /sdcard/Application/templates folder .');

        _result.waitToRunTest();

        //EB.SimulScan.template = 'file:///sdcard/simulscan/templates/Logistics%20Post.xml';
        //EB.SimulScan.uiResultConfirmation = false;
       //EB.SimulScan.audioFeedback = true;

        //EB.SimulScan.debug = true;
        //EB.SimulScan.logDirectory = '/sdcard/RhoSimulScanLog';
		EB.SimulScan.templateDirectory = '/sdcard/Application/templates';
		EB.SimulScan.fetchTemplates("pxt367","");

        runsCaptureDocument(EB.SimulScan.SUCCESS, function(dict) {
            displayResult('Output: ', 'callbackType is ' + dict['callbackType']);
        });

        _result.waitForResponse();
    });
	
	it('fetchTmplates method with templateDirectory property set to \n /sdcard/templates but in SimulScan server account \nshould not have any xml created', function() {
        dispTestCaseRunning('Scan Delivery Attempt Notification');
        dispExpectedResult('/sdcard/templates should be empty after calling fetchTmplates \nmethod because SimulScan server don’t have any xml in the account.');

        _result.waitToRunTest();

        //EB.SimulScan.template = 'file:///sdcard/simulscan/templates/Logistics%20Post.xml';
        //EB.SimulScan.uiResultConfirmation = false;
        //EB.SimulScan.audioFeedback = true;

        //EB.SimulScan.debug = true;
        //EB.SimulScan.logDirectory = '/sdcard/RhoSimulScanLog';
		EB.SimulScan.templateDirectory = '/sdcard/templates';
		EB.SimulScan.fetchTemplates("pxt367","");

        runsCaptureDocument(EB.SimulScan.SUCCESS, function(dict) {
            displayResult('Output: ', 'callbackType is ' + dict['callbackType']);
        });

        _result.waitForResponse();
    });
	
	it('fetchTmplates method with invalid username and valid password', function() {
        dispTestCaseRunning('Scan Delivery Attempt Notification');
        dispExpectedResult('Application should not behave abnormal/crash.');

        _result.waitToRunTest();

        //EB.SimulScan.template = 'file:///sdcard/simulscan/templates/Logistics%20Post.xml';
        //EB.SimulScan.uiResultConfirmation = false;
        //EB.SimulScan.audioFeedback = true;

       //EB.SimulScan.debug = true;
        //EB.SimulScan.logDirectory = '/sdcard/RhoSimulScanLog';
		EB.SimulScan.templateDirectory = '/sdcard/templates';
		EB.SimulScan.fetchTemplates("ptptpt","");

        runsCaptureDocument(EB.SimulScan.SUCCESS, function(dict) {
            displayResult('Output: ', 'callbackType is ' + dict['callbackType']);
        });

        _result.waitForResponse();
    });
	
	it('fetchTmplates method with valid username and invalid password', function() {
        dispTestCaseRunning('Scan Delivery Attempt Notification');
        dispExpectedResult('Application should not behave abnormal/crash.');

        _result.waitToRunTest();

        //EB.SimulScan.template = 'file:///sdcard/simulscan/templates/Logistics%20Post.xml';
        //EB.SimulScan.uiResultConfirmation = false;
        //EB.SimulScan.audioFeedback = true;

        //EB.SimulScan.debug = true;
        //EB.SimulScan.logDirectory = '/sdcard/RhoSimulScanLog';
		EB.SimulScan.templateDirectory = '/sdcard/templates';
		EB.SimulScan.fetchTemplates("pxt367","gtgtgt");

        runsCaptureDocument(EB.SimulScan.SUCCESS, function(dict) {
            displayResult('Output: ', 'callbackType is ' + dict['callbackType']);
        });

        _result.waitForResponse();
    });
	
	it('fetchTmplates method with invalid username and invalid password', function() {
        dispTestCaseRunning('Scan Delivery Attempt Notification');
        dispExpectedResult('Application should not behave abnormal/crash.');

        _result.waitToRunTest();

        //EB.SimulScan.template = 'file:///sdcard/simulscan/templates/Logistics%20Post.xml';
        //EB.SimulScan.uiResultConfirmation = false;
        //EB.SimulScan.audioFeedback = true;

        //EB.SimulScan.debug = true;
        //EB.SimulScan.logDirectory = '/sdcard/RhoSimulScanLog';
		EB.SimulScan.templateDirectory = '/sdcard/templates';
		EB.SimulScan.fetchTemplates("ptptpt","gtgtgt");

        runsCaptureDocument(EB.SimulScan.SUCCESS, function(dict) {
            displayResult('Output: ', 'callbackType is ' + dict['callbackType']);
        });

        _result.waitForResponse();
    });
	
	it('fetchTmplates method with null value in username and password', function() {
        dispTestCaseRunning('Scan Delivery Attempt Notification');
        dispExpectedResult('Application should not behave abnormal/crash.');

        _result.waitToRunTest();

        //EB.SimulScan.template = 'file:///sdcard/simulscan/templates/Logistics%20Post.xml';
        //EB.SimulScan.uiResultConfirmation = false;
        //EB.SimulScan.audioFeedback = true;

        //EB.SimulScan.debug = true;
        //EB.SimulScan.logDirectory = '/sdcard/RhoSimulScanLog';
		EB.SimulScan.templateDirectory = '/sdcard/templates';
		EB.SimulScan.fetchTemplates("","");

        runsCaptureDocument(EB.SimulScan.SUCCESS, function(dict) {
            displayResult('Output: ', 'callbackType is ' + dict['callbackType']);
        });

        _result.waitForResponse();
    });
	
	it('fetchTmplates method with invalid path set to templateDirectory property set\n /sdcard/Application/templates', function() {
        dispTestCaseRunning('Scan Delivery Attempt Notification');
        dispExpectedResult('callbackType should be success.\nAll created templates in SimulScan server should get successfully \ndownloaded in device /sdcard/Application/templates folder .');

        _result.waitToRunTest();

        //EB.SimulScan.template = 'file:///sdcard/simulscan/templates/Logistics%20Post.xml';
        //EB.SimulScan.uiResultConfirmation = false;
        //EB.SimulScan.audioFeedback = true;

        //EB.SimulScan.debug = true;
        //EB.SimulScan.logDirectory = '/sdcard/RhoSimulScanLog';
		EB.SimulScan.templateDirectory = '/Application/invalid/templates';
		EB.SimulScan.fetchTemplates("pxt367","");

        runsCaptureDocument(EB.SimulScan.SUCCESS, function(dict) {
            displayResult('Output: ', 'callbackType is ' + dict['callbackType']);
        });

        _result.waitForResponse();
    });
	
	it('fetchTmplates method with null path set to templateDirectory property set\n /sdcard/Application/templates', function() {
        dispTestCaseRunning('Scan Delivery Attempt Notification');
        dispExpectedResult('callbackType should be success.\nAll created templates in SimulScan server should get successfully \ndownloaded in device /sdcard/Application/templates folder .');

        _result.waitToRunTest();

        //EB.SimulScan.template = 'file:///sdcard/simulscan/templates/Logistics%20Post.xml';
        //EB.SimulScan.uiResultConfirmation = false;
        //EB.SimulScan.audioFeedback = true;

        //EB.SimulScan.debug = true;
        //EB.SimulScan.logDirectory = '/sdcard/RhoSimulScanLog';
		EB.SimulScan.templateDirectory = '';
		EB.SimulScan.fetchTemplates("pxt367","");

        runsCaptureDocument(EB.SimulScan.SUCCESS, function(dict) {
            displayResult('Output: ', 'callbackType is ' + dict['callbackType']);
        });

        _result.waitForResponse();
    });
	
    it('Debug mode with default value.', function() {
        dispTestCaseRunning('Scan Delivery Attempt Notification');
        dispExpectedResult('callbackType should be success.\nThere should not be any subdirectory in /sdcard/RhoSimulScanLog directory.');

        _result.waitToRunTest();

        EB.SimulScan.template = 'file:///sdcard/simulscan/templates/Logistics%20Post.xml';
        EB.SimulScan.uiResultConfirmation = false;
        EB.SimulScan.audioFeedback = true;

        runsCaptureDocument(EB.SimulScan.SUCCESS, function(dict) {
            displayResult('Output: ', 'callbackType is ' + dict['callbackType']);
        });

        _result.waitForResponse();
    });
	
    it('Debug mode to true.', function() {
        dispTestCaseRunning('Scan Delivery Attempt Notification');
        dispExpectedResult('callbackType should be success.\nThere is new subdirectory in /sdcard/Application/RhoSimulScanLog directory.');

        _result.waitToRunTest();

        EB.SimulScan.template = 'file:///sdcard/simulscan/templates/Logistics%20Post.xml';
        EB.SimulScan.uiResultConfirmation = false;
        EB.SimulScan.audioFeedback = true;

        EB.SimulScan.debug = true;
        EB.SimulScan.logDirectory = '/sdcard/Application/RhoSimulScanLog';

        runsCaptureDocument(EB.SimulScan.SUCCESS, function(dict) {
            displayResult('Output: ', 'callbackType is ' + dict['callbackType']);
        });

        _result.waitForResponse();
    });
	
    it('Debug mode to false.', function() {
        dispTestCaseRunning('Scan Delivery Attempt Notification');
        dispExpectedResult('callbackType should be success.\nThere should not be any subdirectory in /sdcard/Temp/RhoSimulScanLog directory.');

        _result.waitToRunTest();

        EB.SimulScan.template = 'file:///sdcard/simulscan/templates/Logistics%20Post.xml';
        EB.SimulScan.uiResultConfirmation = false;
        EB.SimulScan.audioFeedback = true;

        EB.SimulScan.debug = false;
        EB.SimulScan.logDirectory = '/sdcard/Temp/RhoSimulScanLog';

        runsCaptureDocument(EB.SimulScan.SUCCESS, function(dict) {
            displayResult('Output: ', 'callbackType is ' + dict['callbackType']);
        });

        _result.waitForResponse();
    });
	
	it('Debug mode to invalid.', function() {
        dispTestCaseRunning('Scan Delivery Attempt Notification');
        dispExpectedResult('callbackType should be success.\nThere should not be any subdirectory in /sdcard/RhoSimulScanLog directory.');

        _result.waitToRunTest();

        EB.SimulScan.template = 'file:///sdcard/simulscan/templates/Logistics%20Post.xml';
        EB.SimulScan.uiResultConfirmation = false;
        EB.SimulScan.audioFeedback = true;

        EB.SimulScan.debug = 'invalid';
        EB.SimulScan.logDirectory = '/sdcard/RhoSimulScanLog';

        runsCaptureDocument(EB.SimulScan.SUCCESS, function(dict) {
            displayResult('Output: ', 'callbackType is ' + dict['callbackType']);
        });

        _result.waitForResponse();
    });
	
	it('Debug mode to null.', function() {
        dispTestCaseRunning('Scan Delivery Attempt Notification');
        dispExpectedResult('callbackType should be success.\nThere should not be any subdirectory in /sdcard/RhoSimulScanLog directory.');

        _result.waitToRunTest();

        EB.SimulScan.template = 'file:///sdcard/simulscan/templates/Logistics%20Post.xml';
        EB.SimulScan.uiResultConfirmation = false;
        EB.SimulScan.audioFeedback = true;

        EB.SimulScan.debug = '';
        EB.SimulScan.logDirectory = '/sdcard/RhoSimulScanLog';

        runsCaptureDocument(EB.SimulScan.SUCCESS, function(dict) {
            displayResult('Output: ', 'callbackType is ' + dict['callbackType']);
        });

        _result.waitForResponse();
    });	
	
	it('logDirectory to invalid.', function() {
        dispTestCaseRunning('Scan Delivery Attempt Notification');
        dispExpectedResult('callbackType should be success.\nThere should not be any subdirectory.');

        _result.waitToRunTest();

        EB.SimulScan.template = 'file:///sdcard/simulscan/templates/Logistics%20Post.xml';
        EB.SimulScan.uiResultConfirmation = false;
        EB.SimulScan.audioFeedback = true;

        EB.SimulScan.debug = true;
        EB.SimulScan.logDirectory = '/sd/Temp/RhoSimulScanLog';

        runsCaptureDocument(EB.SimulScan.SUCCESS, function(dict) {
            displayResult('Output: ', 'callbackType is ' + dict['callbackType']);
        });

        _result.waitForResponse();
    });
	
	it('logDirectory to null.', function() {
        dispTestCaseRunning('Scan Delivery Attempt Notification');
        dispExpectedResult('callbackType should be success.\nThere should not be any subdirectory.');

        _result.waitToRunTest();

        EB.SimulScan.template = 'file:///sdcard/simulscan/templates/Logistics%20Post.xml';
        EB.SimulScan.uiResultConfirmation = false;
        EB.SimulScan.audioFeedback = true;

        EB.SimulScan.debug = true;
        EB.SimulScan.logDirectory = '';

        runsCaptureDocument(EB.SimulScan.SUCCESS, function(dict) {
            displayResult('Output: ', 'callbackType is ' + dict['callbackType']);
        });

        _result.waitForResponse();
    });
	
	it('processingTimeout with default 10 second', function() {
        dispTestCaseRunning('1. Frame Delivery Attempt Notification in camera.\n2. Tap to scan.\n3. Immediately start swinging of device.');
        dispExpectedResult('failureReason should be processingTimeout. Scanning should take about 10 second.');

        _result.waitToRunTest();

        EB.SimulScan.template = 'file:///sdcard/simulscan/templates/Logistics%20Post.xml';
        EB.SimulScan.uiResultConfirmation = false;
        EB.SimulScan.audioFeedback = true;


        runsCaptureDocument(EB.SimulScan.FAILURE, function(dict) {
            displayResult('Output: ', 'failureReason is ' + dict['failureReason']);
        });

        _result.waitForResponse();
    });

    it('processingTimeout 1 second', function() {
        dispTestCaseRunning('1. Frame Delivery Attempt Notification in camera.\n2. Tap to scan.\n3. Immediately start swinging of device.');
        dispExpectedResult('failureReason should be processingTimeout. Scanning should take about one second.');

        _result.waitToRunTest();

        EB.SimulScan.template = 'file:///sdcard/simulscan/templates/Logistics%20Post.xml';
        EB.SimulScan.uiResultConfirmation = false;
        EB.SimulScan.audioFeedback = true;

        EB.SimulScan.processingTimeout = 1000;

        runsCaptureDocument(EB.SimulScan.FAILURE, function(dict) {
            displayResult('Output: ', 'failureReason is ' + dict['failureReason']);
        });

        _result.waitForResponse();
    });

    it('processingTimeout 5 second', function() {
        dispTestCaseRunning('1. Frame Delivery Attempt Notification in camera.\n2. Tap to scan.\n3. Immediately start swinging of device.');
        dispExpectedResult('failureReason should be processingTimeout. Scanning should take about five second.');

        _result.waitToRunTest();

        EB.SimulScan.template = 'file:///sdcard/simulscan/templates/Logistics%20Post.xml';
        EB.SimulScan.uiResultConfirmation = false;
        EB.SimulScan.audioFeedback = true;

        EB.SimulScan.processingTimeout = 5000;

        runsCaptureDocument(EB.SimulScan.FAILURE, function(dict) {
            displayResult('Output: ', 'failureReason is ' + dict['failureReason']);
        });

        _result.waitForResponse();
    });
	
	/*it('processingTimeout with invalid', function() {
        dispTestCaseRunning('1. Frame Delivery Attempt Notification in camera.\n2. Tap to scan.\n3. Immediately start swinging of device.');
        dispExpectedResult('failureReason should be processingTimeout. Scanning should take about five second.');

        _result.waitToRunTest();

        EB.SimulScan.template = 'file:///sdcard/simulscan/templates/Logistics%20Post.xml';
        EB.SimulScan.uiResultConfirmation = false;
        EB.SimulScan.audioFeedback = true;

        EB.SimulScan.processingTimeout = -3000;

        runsCaptureDocument(EB.SimulScan.FAILURE, function(dict) {
            displayResult('Output: ', 'failureReason is ' + dict['failureReason']);
        });

        _result.waitForResponse();
    });
	
	it('processingTimeout with null', function() {
        dispTestCaseRunning('1. Frame Delivery Attempt Notification in camera.\n2. Tap to scan.\n3. Immediately start swinging of device.');
        dispExpectedResult('failureReason should be processingTimeout. Scanning should take about five second.');

        _result.waitToRunTest();

        EB.SimulScan.template = 'file:///sdcard/simulscan/templates/Logistics%20Post.xml';
        EB.SimulScan.uiResultConfirmation = false;
        EB.SimulScan.audioFeedback = true;

        EB.SimulScan.processingTimeout = '';

        runsCaptureDocument(EB.SimulScan.FAILURE, function(dict) {
            displayResult('Output: ', 'failureReason is ' + dict['failureReason']);
        });

        _result.waitForResponse();
    });*/
	
    it('uiResultConfirmation in default value.', function() {
        dispTestCaseRunning('Scan Delivery Attempt Notification\nPress "Accept" on UI confirmation screen.');
        dispExpectedResult('callbackType should be success.\nThere should not be UI confirmation screen after scanning.');

        _result.waitToRunTest();

        EB.SimulScan.template = 'file:///sdcard/simulscan/templates/Logistics%20Post.xml';
        EB.SimulScan.audioFeedback = true;

        runsCaptureDocument(EB.SimulScan.SUCCESS, function(dict) {
            displayResult('Output: ', 'callbackType is ' + dict['callbackType']);
        });

        _result.waitForResponse();
    });
	
    it('uiResultConfirmation in effect.', function() {
        dispTestCaseRunning('Scan Delivery Attempt Notification\nPress "Accept" on UI confirmation screen.');
        dispExpectedResult('callbackType should be success.\nThere must be UI confirmation screen after scanning.');

        _result.waitToRunTest();

        EB.SimulScan.template = 'file:///sdcard/simulscan/templates/Logistics%20Post.xml';
        EB.SimulScan.audioFeedback = true;

        EB.SimulScan.uiResultConfirmation = true;

        runsCaptureDocument(EB.SimulScan.SUCCESS, function(dict) {
            displayResult('Output: ', 'callbackType is ' + dict['callbackType']);
        });

        _result.waitForResponse();
    });
	
	it('uiResultConfirmation with invalid.', function() {
        dispTestCaseRunning('Scan Delivery Attempt Notification\nPress "Accept" on UI confirmation screen.');
        dispExpectedResult('callbackType should be success.\nThere must be UI confirmation screen after scanning.');

        _result.waitToRunTest();

        EB.SimulScan.template = 'file:///sdcard/simulscan/templates/Logistics%20Post.xml';
        EB.SimulScan.audioFeedback = true;

        EB.SimulScan.uiResultConfirmation = 'invalid';

        runsCaptureDocument(EB.SimulScan.SUCCESS, function(dict) {
            displayResult('Output: ', 'callbackType is ' + dict['callbackType']);
        });

        _result.waitForResponse();
    });
	
	it('uiResultConfirmation with null.', function() {
        dispTestCaseRunning('Scan Delivery Attempt Notification\nPress "Accept" on UI confirmation screen.');
        dispExpectedResult('callbackType should be success.\nThere must be UI confirmation screen after scanning.');

        _result.waitToRunTest();

        EB.SimulScan.template = 'file:///sdcard/simulscan/templates/Logistics%20Post.xml';
        EB.SimulScan.audioFeedback = true;

        EB.SimulScan.uiResultConfirmation = '';

        runsCaptureDocument(EB.SimulScan.SUCCESS, function(dict) {
            displayResult('Output: ', 'callbackType is ' + dict['callbackType']);
        });

        _result.waitForResponse();
    });	
	
    it('getDataUri retrieves images.', function() {
        var add_image = function(image) {
            var list = document.getElementById('myList');

            var item = document.createElement('li');
            list.appendChild(item);

            var img = document.createElement('img');
            img.setAttribute('src', EB.SimulScan.getDataUri(image['id']));
            item.appendChild(img);
        };

        dispTestCaseRunning('Scan Delivery Attempt Notification.');
        dispExpectedResult('You should see images for regions and for whole form.');

        _result.waitToRunTest();

        EB.SimulScan.template = 'file:///sdcard/simulscan/templates/Logistics%20Post.xml';
        EB.SimulScan.uiResultConfirmation = false;
        EB.SimulScan.audioFeedback = false;
		EB.SimulScan.autoImageCapture = false;

        runsCaptureDocument(EB.SimulScan.SUCCESS, function(dict) {
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

        _result.waitForResponse();
    });
	
	it('getDataUri retrieves images invalid id.', function() {
        var add_image = function(image) {
            var list = document.getElementById('myList');

            var item = document.createElement('li');
            list.appendChild(item);

            var img = document.createElement('img');
            img.setAttribute('src', EB.SimulScan.getDataUri(invalid));
            item.appendChild(img);
        };

        dispTestCaseRunning('Scan Delivery Attempt Notification.');
        dispExpectedResult('You should see images for regions and for whole form.');

        _result.waitToRunTest();

        EB.SimulScan.template = 'file:///sdcard/simulscan/templates/Logistics%20Post.xml';
        EB.SimulScan.uiResultConfirmation = false;
        EB.SimulScan.audioFeedback = false;

        runsCaptureDocument(EB.SimulScan.SUCCESS, function(dict) {
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

        _result.waitForResponse();
    });
	
	it('getDataUri retrieves images null id.', function() {
        var add_image = function(image) {
            var list = document.getElementById('myList');

            var item = document.createElement('li');
            list.appendChild(item);

            var img = document.createElement('img');
            img.setAttribute('src', EB.SimulScan.getDataUri());
            item.appendChild(img);
        };

        dispTestCaseRunning('Scan Delivery Attempt Notification.');
        dispExpectedResult('You should see images for regions and for whole form.');

        _result.waitToRunTest();

        EB.SimulScan.template = 'file:///sdcard/simulscan/templates/Logistics%20Post.xml';
        EB.SimulScan.uiResultConfirmation = false;
        EB.SimulScan.audioFeedback = false;

        runsCaptureDocument(EB.SimulScan.SUCCESS, function(dict) {
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

        _result.waitForResponse();
    });
	
    it('close method.', function() {
        var add_image = function(image) {
		    EB.SimulScan.close();
            var list = document.getElementById('myList');

            var item = document.createElement('li');
            list.appendChild(item);

            var img = document.createElement('img');
            img.setAttribute('src', EB.SimulScan.getDataUri(image['id']));
            item.appendChild(img);
        };

        dispTestCaseRunning('Scan Delivery Attempt Notification.');
        dispExpectedResult('You should not see images for regions and for whole form.');

        _result.waitToRunTest();

        EB.SimulScan.template = 'file:///sdcard/simulscan/templates/Logistics%20Post.xml';
        EB.SimulScan.uiResultConfirmation = false;
        EB.SimulScan.audioFeedback = false;

        runsCaptureDocument(EB.SimulScan.SUCCESS, function(dict) {
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

        _result.waitForResponse();
    });
	
/*    it('Objective:\nDocument capture with template from invalid location', function() {
        dispTestCaseRunning('1. Set template property to http path of template.xml has region of  picture\n/Application/sdcard/template.xml\n2.Set inputsource to imager\n3. Call captureDocument method Capture a document by taking a photo using imager \n');
        dispExpectedResult('It should return SimulScan engine generic error.(FAILURE_ERROR) or identificationTimeout(FAILURE_IDENTIFICATION_TIMEOUT)');
        //Common Method implemented to wait for tester to run the test.Code available in specHelper.js
        _result.waitToRunTest();
        runs(function() {
            EB.SimulScan.template = EB.RhoFile.join(EB.Application.AppBundleFolder, 'invalid.xml');
            EB.SimulScan.captureDocument(captureCallback);
        });
        //Add more waitsfor or run blocks if required.
        //Common Method implemented to wait for tester to make it pass or fail.Code available in specHelper.js
        _result.waitForResponse();
    });

    it('Objective:\nDocument capture set audioFeedback  property with default value', function() {
        dispTestCaseRunning('1. Set template property to path of template.xml has region of Optical Character Recognition \n/sdcard/Application/template.xml\n2. Call captureDocument method Capture a document by taking a photo\n\n\n\n\n');
        dispExpectedResult('Should get the audio feedback at the time captured document is getting processed after proceessed successfully callback fired once for each field defined in the template');
        //Common Method implemented to wait for tester to run the test.Code available in specHelper.js
        _result.waitToRunTest();
        runs(function() {
                EB.SimulScan.inputSource = EB.SimulScan.SOURCE_CAMERA;
                EB.SimulScan.template = EB.RhoFile.join(EB.Application.AppBundleFolder, 'picture.xml');
                EB.SimulScan.captureDocument(captureCallback);
        });
        //Add more waitsfor or run blocks if required.
        //Common Method implemented to wait for tester to make it pass or fail.Code available in specHelper.js
        _result.waitForResponse();
    });


    it('Objective:\nDocument capture with audioFeedback  property set to invalid', function() {
        dispTestCaseRunning('1. Set template property to path of template.xml has region of  picture\n/sdcard/Application/template.xml\n2.Set audioFeedback to audio\n3. Call captureDocument method Capture a document by taking a photo\n');
        dispExpectedResult('Should not get the audio feedback at the time captured document is getting processed but after proceessed successfully callback fired once for each field defined in the template');
        //Common Method implemented to wait for tester to run the test.Code available in specHelper.js
        _result.waitToRunTest();
        runs(function() {
                EB.SimulScan.inputSource = EB.SimulScan.SOURCE_CAMERA;
                EB.SimulScan.audioFeedback = 'invalid';
                EB.SimulScan.template = EB.RhoFile.join(EB.Application.AppBundleFolder, 'picture.xml');
                EB.SimulScan.captureDocument(captureCallback);
        });
        //Add more waitsfor or run blocks if required.
        //Common Method implemented to wait for tester to make it pass or fail.Code available in specHelper.js
        _result.waitForResponse();
    });

    it('Objective:\nDocument capture with hapticFeedback  property set to invalid value', function() {
        dispTestCaseRunning('1. Set template property to path of template.xml has region of  picture\n/sdcard/Application/template.xml\n2.Set hapticFeedback to feedback\n3. Call captureDocument method Capture a document by taking a photo\n');
        dispExpectedResult('Should not get the haptic feedback at the time captured document is getting processed but after proceessed successfully callback fired once for each field defined in the template');
        //Common Method implemented to wait for tester to run the test.Code available in specHelper.js
        _result.waitToRunTest();
        runs(function() {
                EB.SimulScan.inputSource = EB.SimulScan.SOURCE_CAMERA;
                EB.SimulScan.hapticFeedback = 'invalid';
                EB.SimulScan.template = EB.RhoFile.join(EB.Application.AppBundleFolder, 'picture.xml');
                EB.SimulScan.captureDocument(captureCallback);
        });
        //Add more waitsfor or run blocks if required.
        //Common Method implemented to wait for tester to make it pass or fail.Code available in specHelper.js
        _result.waitForResponse();
    });

    it('Objective:\nDocument capture with ledFeedback  property set to invalid value', function() {
        dispTestCaseRunning('1. Set template property to path of template.xml has region of  picture\n/sdcard/Application/template.xml\n2.Set ledFeedback to ledFeedback\n3. Call captureDocument method Capture a document by taking a photo\n');
        dispExpectedResult('Should not get the led feedback at the time captured document is getting processed but after proceessed successfully callback fired once for each field defined in the template');
        //Common Method implemented to wait for tester to run the test.Code available in specHelper.js
        _result.waitToRunTest();
        runs(function() {
                EB.SimulScan.inputSource = EB.SimulScan.SOURCE_CAMERA;
                EB.SimulScan.ledFeedback = 'invalid';
                EB.SimulScan.template = EB.RhoFile.join(EB.Application.AppBundleFolder, 'picture.xml');
                EB.SimulScan.captureDocument(captureCallback);
        });
        //Add more waitsfor or run blocks if required.
        //Common Method implemented to wait for tester to make it pass or fail.Code available in specHelper.js
        _result.waitForResponse();
    });


    it('Objective:\nDocument capture with flashMode  property set to invalid value\n', function() {
        dispTestCaseRunning('1. Set template property to path of template.xml has region of  picture\n/sdcard/Application/template.xml\n2.Set flashMode to flash\n3. Call captureDocument method Capture a document by taking a photo\n');
        dispExpectedResult('Shold not get the flash at the time of capturing the photo and captured document should get  proceessed successfully callback fired once for each field defined in the template');
        //Common Method implemented to wait for tester to run the test.Code available in specHelper.js
        _result.waitToRunTest();
        runs(function() {
                EB.SimulScan.inputSource = EB.SimulScan.SOURCE_CAMERA;
                EB.SimulScan.flashMode = 'invalid';
                EB.SimulScan.template = EB.RhoFile.join(EB.Application.AppBundleFolder, 'picture.xml');
                EB.SimulScan.captureDocument(captureCallback);
        });
        //Add more waitsfor or run blocks if required.
        //Common Method implemented to wait for tester to make it pass or fail.Code available in specHelper.js
        _result.waitForResponse();
    });

    it('Objective:\nDocument capture with identificationTimeout  property set to -10000 (-10 second)\n\n', function() {
        dispTestCaseRunning('1. Set template property to path of template.xml has region of  picture\n/sdcard/Application/template.xml\n2.Set inputSource to camera\n3.Set identificationTimeout to -10000\n4. Call captureDocument method Capture a document by taking a photo using camera\n');
        dispExpectedResult('Callack should return identification timout(FAILURE_IDENTIFICATION_TIMEOUT)\nwhen not able to capture the photo within -10 seconds');
        //Common Method implemented to wait for tester to run the test.Code available in specHelper.js
        _result.waitToRunTest();
        runs(function() {
                EB.SimulScan.inputSource = EB.SimulScan.SOURCE_CAMERA;
                EB.SimulScan.identificationTimeout = -10000;
                EB.SimulScan.template = EB.RhoFile.join(EB.Application.AppBundleFolder, 'picture.xml');
                EB.SimulScan.captureDocument(captureCallback);
        });
        //Add more waitsfor or run blocks if required.
        //Common Method implemented to wait for tester to make it pass or fail.Code available in specHelper.js
        _result.waitForResponse();
    });

    it('Objective:\nDocument capture with inputSource  property set to invalid value\n\n', function() {
        dispTestCaseRunning('1. Set template property to path of template.xml has region of  picture\n/sdcard/Application/template.xml\n2.Set fileInteractiveMode to true\n3.Set inputSource to Invalid\n4. inputSourceFilename to /sdcard/Appliaction/image.jpg\n5. Call captureDocument method Capture a document by given image as a file\n');
        dispExpectedResult('should not capture the impage because  inputSource set to invalid source');
        //Common Method implemented to wait for tester to run the test.Code available in specHelper.js
        _result.waitToRunTest();
        runs(function() {
                EB.SimulScan.template = EB.RhoFile.join(EB.Application.AppBundleFolder, 'picture.xml');
                EB.SimulScan.inputSource = 'invalid';
                EB.SimulScan.fileInteractiveMode = 'true';
                EB.SimulScan.inputSourceFilename = EB.RhoFile.join(EB.Application.AppBundleFolder, 'image.jpg');
                EB.SimulScan.captureDocument(captureCallback);
        });
        //Add more waitsfor or run blocks if required.
        //Common Method implemented to wait for tester to make it pass or fail.Code available in specHelper.js
        _result.waitForResponse();
    });

    it('Objective:\nDocument capture set debug property  to invalid value and logDirectory  property set to /sdcard/Application/SimulScanLog\n\n', function() {
        dispTestCaseRunning('1. Set template property to path of template.xml has region of  picture\n/sdcard/Application/template.xml\n2.Set debug to invalid\n3.Set logDirectory to /sdcard/Application/SimulScanLog\n4.Set inputSource to camera\n5. Call captureDocument method Capture a document by taking a photo using camera\n');
        dispExpectedResult('captured document should get processed successfully and callback fired once for each field defined in the template \n\nbut It should not create the logdirectory at specified path because debug property default value is set to invalid');
        //Common Method implemented to wait for tester to run the test.Code available in specHelper.js
        _result.waitToRunTest();
        runs(function() {
                EB.SimulScan.template = EB.RhoFile.join(EB.Application.AppBundleFolder, 'picture.xml');
                EB.SimulScan.debug = 'invalid';
                EB.SimulScan.logDirectory = '/sdcard/Application/SimulScanLog';
                EB.SimulScan.inputSource = EB.SimulScan.SOURCE_CAMERA;
                EB.SimulScan.captureDocument(captureCallback);
        });
        //Add more waitsfor or run blocks if required.
        //Common Method implemented to wait for tester to make it pass or fail.Code available in specHelper.js
        _result.waitForResponse();
    });

    it('Objective:\nDocument capture set debug property  to true  and logDirectory  property set to invalid path\n', function() {
        dispTestCaseRunning('1. Set template property to path of template.xml has region of  picture\n/sdcard/Application/template.xml\n2.Set debug to true\n3.Set logDirectory to /Application/sdcard/SimulScanLog\n4.Set inputSource to camera\n5. Call captureDocument method Capture a document by taking a photo using camera\n');
        dispExpectedResult('captured document should get processed successfully and callback fired once for each field defined in the template \n\nand It should not create the logdirectory because specified path is invalid');
        //Common Method implemented to wait for tester to run the test.Code available in specHelper.js
        _result.waitToRunTest();
        runs(function() {
                EB.SimulScan.template = EB.RhoFile.join(EB.Application.AppBundleFolder, 'picture.xml');
                EB.SimulScan.debug = true;
                EB.SimulScan.logDirectory = '/Application/sdcard/SimulScanLog';
                EB.SimulScan.inputSource = EB.SimulScan.SOURCE_CAMERA;
                EB.SimulScan.captureDocument(captureCallback);
        });
        //Add more waitsfor or run blocks if required.
        //Common Method implemented to wait for tester to make it pass or fail.Code available in specHelper.js
        _result.waitForResponse();
    });

    it('Objective:\nDocument capture set processingTimeout  property set to invalid value', function() {
        dispTestCaseRunning('1. Set template property to path of template.xml has region of  picture\n/sdcard/Application/template.xml\n2.Set processingTimeout to invalid\n3. Set inputSource to camera\n4. Call captureDocument method Capture a document by taking a photo using camera');
        dispExpectedResult('processingTimeout error should returned in callback when captured document is not able to processed successfully in 10 seconds');
        //Common Method implemented to wait for tester to run the test.Code available in specHelper.js
        _result.waitToRunTest();
        runs(function() {
                EB.SimulScan.template = EB.RhoFile.join(EB.Application.AppBundleFolder, 'picture.xml');
                EB.SimulScan.processingTimeout = -10000;
                EB.SimulScan.inputSource = EB.SimulScan.SOURCE_CAMERA;
                EB.SimulScan.captureDocument(captureCallback);
        });
        //Add more waitsfor or run blocks if required.
        //Common Method implemented to wait for tester to make it pass or fail.Code available in specHelper.js
        _result.waitForResponse();
    });

    it('Objective:\nDocument capture set uiResultConfirmation property set to invalid\n', function() {
        dispTestCaseRunning('1. Set template property to path of template.xml has region of  picture\n/sdcard/Application/template.xml\n2. Set uiResultConfirmation to invalid\n3. Set inputSource to camera\n4. Call captureDocument method Capture a document by taking a photo using camera\n');
        dispExpectedResult('It should shows a UI confirmation with results in SimulScanView before sending results back to application \n\nafter captured document successfully processed and callback fired once for each field defined in the template ');
        //Common Method implemented to wait for tester to run the test.Code available in specHelper.js
        _result.waitToRunTest();
        runs(function() {
                EB.SimulScan.template = EB.RhoFile.join(EB.Application.AppBundleFolder, 'picture.xml');
                EB.SimulScan.uiResultConfirmation = 'invalid';
                EB.SimulScan.inputSource = EB.SimulScan.SOURCE_CAMERA;
                EB.SimulScan.captureDocument(captureCallback);
        });
        //Add more waitsfor or run blocks if required.
        //Common Method implemented to wait for tester to make it pass or fail.Code available in specHelper.js
        _result.waitForResponse();
    });


    it('Objective:\nDocument capture and show image on HTML page using invalid Id of image in imageId param calling getDataUri method\n', function() {
        dispTestCaseRunning('1. Set template property to path of template.xml has region of  picture\n/sdcard/Application/template.xml\n2. Set inputSource to camera\n3. Call captureDocument method Capture a document by taking a photo using camera\n5. Call getDataUri method with invalid imageid (id of image will be returned in callback with processedData)\n\n');
        dispExpectedResult('captured document should get processed successfully and callback fired once for each field defined in the template and \n\nit should not show the image on HTML page insert data URI in src attribute of img tag');
        //Common Method implemented to wait for tester to run the test.Code available in specHelper.js
        _result.waitToRunTest();
        runs(function() {
                EB.SimulScan.template = EB.RhoFile.join(EB.Application.AppBundleFolder, 'picture.xml');
                EB.SimulScan.inputSource = EB.SimulScan.SOURCE_CAMERA;
                EB.SimulScan.captureDocument(captureCallback);
                waitsFor(function () {
                        return getregionImageId != null;
                }, '90sec Wait before move to next test', 90000);
                EB.SimulScan.getDataUri(100);
        });
        //Add more waitsfor or run blocks if required.
        //Common Method implemented to wait for tester to make it pass or fail.Code available in specHelper.js
        _result.waitForResponse();
    });

    it('Objective:\nDocument capture with template from http location', function() {
        dispTestCaseRunning('1. Set template property to http path of template.xml has region of  picture\nhttp://192.168.6.18/neon/template.xml\n2.Set inputsource to camera\n3. Call captureDocument method Capture a document by taking a photo using camera\n');
        dispExpectedResult('captured document should get processed successfully and callback fired once for each field defined in the template');
        //Common Method implemented to wait for tester to run the test.Code available in specHelper.js
        _result.waitToRunTest();
        runs(function() {
                EB.SimulScan.inputSource = EB.SimulScan.SOURCE_CAMERA;
                EB.SimulScan.template = 'http://192.168.6.18/neon/ReceivedFiles/picture.xml';
                EB.SimulScan.captureDocument(captureCallback);
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
    };*/
});