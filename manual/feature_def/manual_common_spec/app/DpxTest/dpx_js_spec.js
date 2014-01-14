describe('DPX Functionality Test', function() {
    var getformCaptureImageId = null;
    var getregionImageId = null;
    var dpxInstance = null;

	beforeEach(function() {
		getformCaptureImageId = null;
		getregionImageId = null;
		displayResult("Output: ","");
		dpxInstance = new Rho.DPX();
	});
	
	afterEach(function () {
		dpxInstance.close(); 
    });
	
    it('Objective:\nDocument capture with template having Optical Character Recognition (ocr)', function() {
        dispTestCaseRunning('1. Set template property to path of template.xml has region of Optical Character Recognition \n/sdcard/Application/template.xml\n2.Set inputsource to camera\n3. Call setCallback method with callback\n4. Call captureDocument method Capture a document by taking a photo usig camera');
        dispExpectedResult('captured document should get processed successfully and callback fired once for each field defined in the template');
        //Common Method implemented to wait for tester to run the test.Code available in specHelper.js
        _result.waitToRunTest();
        runs(function() {
				//var dpxInstance = new Rho.DPX();
				dpxInstance.inputSource = Rho.DPX.SOURCE_CAMERA;
				dpxInstance.setCallback(captureCallback);
				//dpxInstance.template = 'file:///sdcard/templates/ocr.xml';
				dpxInstance.template = Rho.RhoFile.join(Rho.Application.AppBundleFolder, 'ocr.xml');
				dpxInstance.captureDocument();
        });
        //Add more waitsfor or run blocks if required.
        //Common Method implemented to wait for tester to make it pass or fail.Code available in specHelper.js
        _result.waitForResponse();
    });
	
    it('Objective:\nDocument capture with template having Optical Mark Recognition (omr)', function() {
        dispTestCaseRunning('1. Set template property to path of template.xml has region of  Optical Mark Recognition \n/sdcard/Application/template.xml\n2.Set inputsource to imager\n3. Call setCallback method with callback\n4. Call captureDocument method Capture a document by taking a photo using imager\n');
        dispExpectedResult('captured document should get processed successfully and callback fired once for each field defined in the template');
        //Common Method implemented to wait for tester to run the test.Code available in specHelper.js
        _result.waitToRunTest();
        runs(function() {
				//var dpxInstance = new Rho.DPX();
				dpxInstance.inputSource = Rho.DPX.SOURCE_IMAGER;
				dpxInstance.setCallback(captureCallback);
				//dpxInstance.template = 'file:///sdcard/templates/ocr.xml';
				dpxInstance.template = Rho.RhoFile.join(Rho.Application.AppBundleFolder, 'omr.xml');
				dpxInstance.captureDocument();
        });
        //Add more waitsfor or run blocks if required.
        //Common Method implemented to wait for tester to make it pass or fail.Code available in specHelper.js
        _result.waitForResponse();
    });
	
    it('Objective:\nDocument capture with template with The defined region was captured as a picture (picture)', function() {
        dispTestCaseRunning('1. Set template property to path of template.xml has region of  picture \n/sdcard/Application/template.xml\n2.Set inputsource to camera\n3. Call setCallback method with callback\n4. Call captureDocument method Capture a document by taking a photo using camera\n');
        dispExpectedResult('captured document should get processed successfully and callback fired once for each field defined in the template');
        //Common Method implemented to wait for tester to run the test.Code available in specHelper.js
        _result.waitToRunTest();
        runs(function() {
				//var dpxInstance = new Rho.DPX();
				dpxInstance.inputSource = Rho.DPX.SOURCE_CAMERA;
				dpxInstance.setCallback(captureCallback);
				//dpxInstance.template = 'file:///sdcard/templates/barcode.xml';
				dpxInstance.template = Rho.RhoFile.join(Rho.Application.AppBundleFolder, 'picture.xml');
				dpxInstance.captureDocument();
        });
        //Add more waitsfor or run blocks if required.
        //Common Method implemented to wait for tester to make it pass or fail.Code available in specHelper.js
        _result.waitForResponse();
    });
	
    it('Objective:\nDocument capture with template with The defined region was captured as a barcode (barcode)', function() {
        dispTestCaseRunning('1. Set template property to path of template.xml has region of  barcode\n/sdcard/Application/template.xml\n2.Set inputsource to imager\n3. Call setCallback method with callback\n4. Call captureDocument method Capture a document by taking a photo using imager \n');
        dispExpectedResult('captured document should get processed successfully and callback fired once for each field defined in the template');
        //Common Method implemented to wait for tester to run the test.Code available in specHelper.js
        _result.waitToRunTest();
        runs(function() {
				//var dpxInstance = new Rho.DPX();
				dpxInstance.inputSource = Rho.DPX.SOURCE_IMAGER;
				dpxInstance.setCallback(captureCallback);
				dpxInstance.template = Rho.RhoFile.join(Rho.Application.AppBundleFolder, 'barcode.xml');
				dpxInstance.captureDocument();
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
	
    it('Objective:\nDocument capture with audioFeedback  property set to false', function() {
        dispTestCaseRunning('1. Set template property to path of template.xml has region of  picture\n/sdcard/Application/template.xml\n2.Set audioFeedback to false\n3. Call setCallback method with callback\n4. Call captureDocument method Capture a document by taking a photo\n');
        dispExpectedResult('Should not get the audio feedback at the time captured document is getting processed\n\n but after proceessed successfully callback fired once for each field defined in the template');
        //Common Method implemented to wait for tester to run the test.Code available in specHelper.js
        _result.waitToRunTest();
        runs(function() {
				//var dpxInstance = new Rho.DPX();
				dpxInstance.inputSource = Rho.DPX.SOURCE_CAMERA;
				dpxInstance.setCallback(captureCallback);
				dpxInstance.audioFeedback = false;
				dpxInstance.template = Rho.RhoFile.join(Rho.Application.AppBundleFolder, 'picture.xml');
				dpxInstance.captureDocument();
        });
        //Add more waitsfor or run blocks if required.
        //Common Method implemented to wait for tester to make it pass or fail.Code available in specHelper.js
        _result.waitForResponse();
    });
	
    it('Objective:\nDocument capture with audioFeedback  property set to true', function() {
        dispTestCaseRunning('1. Set template property to path of template.xml has region of  picture\n/sdcard/Application/template.xml\n2.Set audioFeedback to true\n3. Call setCallback method with callback\n4. Call captureDocument method Capture a document by taking a photo\n');
        dispExpectedResult('Should get the audio feedback at the time captured document is getting processed after proceessed successfully callback fired once for each field defined in the template');
        //Common Method implemented to wait for tester to run the test.Code available in specHelper.js
        _result.waitToRunTest();
        runs(function() {
				//var dpxInstance = new Rho.DPX();
				dpxInstance.inputSource = Rho.DPX.SOURCE_CAMERA;
				dpxInstance.setCallback(captureCallback);
				dpxInstance.audioFeedback = true;
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
	
    it('Objective:\nDocument capture set hapticFeedback  property with default value', function() {
        dispTestCaseRunning('1. Set template property to path of template.xml has region of  picture\n/sdcard/Application/template.xml\n2. Call setCallback method with callback\n3. Call captureDocument method Capture a document by taking a photo\n');
        dispExpectedResult('Should get the haptic feedback at the time captured document is getting processed after proceessed successfully callback fired once for each field defined in the template');
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
	
    it('Objective:\nDocument capture with hapticFeedback  property set to false ', function() {
        dispTestCaseRunning('1. Set template property to path of template.xml has region of  picture\n/sdcard/Application/template.xml\n2.Set hapticFeedback to false\n3. Call setCallback method with callback\n4. Call captureDocument method Capture a document by taking a photo\n');
        dispExpectedResult('Should not get the haptic feedback at the time captured document is getting processed but after proceessed successfully callback fired once for each field defined in the template');
        //Common Method implemented to wait for tester to run the test.Code available in specHelper.js
        _result.waitToRunTest();
        runs(function() {
				//var dpxInstance = new Rho.DPX();
				dpxInstance.inputSource = Rho.DPX.SOURCE_CAMERA;
				dpxInstance.setCallback(captureCallback);
				dpxInstance.hapticFeedback = false;
				dpxInstance.template = Rho.RhoFile.join(Rho.Application.AppBundleFolder, 'picture.xml');
				dpxInstance.captureDocument();
        });
        //Add more waitsfor or run blocks if required.
        //Common Method implemented to wait for tester to make it pass or fail.Code available in specHelper.js
        _result.waitForResponse();
    });
	
    it('Objective:\nDocument capture with hapticFeedback  property set to true ', function() {
        dispTestCaseRunning('1. Set template property to path of template.xml has region of  picture\n/sdcard/Application/template.xml\n2.Set hapticFeedback to true\n3. Call setCallback method with callback\n4. Call captureDocument method Capture a document by taking a photo\n');
        dispExpectedResult('Should get the haptic feedback at the time captured document is getting processed after proceessed successfully callback fired once for each field defined in the template');
        //Common Method implemented to wait for tester to run the test.Code available in specHelper.js
        _result.waitToRunTest();
        runs(function() {
				//var dpxInstance = new Rho.DPX();
				dpxInstance.inputSource = Rho.DPX.SOURCE_CAMERA;
				dpxInstance.setCallback(captureCallback);
				dpxInstance.hapticFeedback = true;
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
	
    it('Objective:\nDocument capture set ledFeedback  property with default value (true)', function() {
        dispTestCaseRunning('1. Set template property to path of template.xml has region of  picture\n/sdcard/Application/template.xml\n2. Call setCallback method with callback\n3. Call captureDocument method Capture a document by taking a photo\n');
        dispExpectedResult('Should get the led feedback at the time captured document is getting processed after proceessed successfully callback fired once for each field defined in the template');
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
	
    it('Objective:\nDocument capture with ledFeedback  property set to false ', function() {
        dispTestCaseRunning('1. Set template property to path of template.xml has region of  picture\n/sdcard/Application/template.xml\n2.Set ledFeedback to false\n3. Call setCallback method with callback\n4. Call captureDocument method Capture a document by taking a photo\n');
        dispExpectedResult('Should not get the led feedback at the time captured document is getting processed but after proceessed successfully callback fired once for each field defined in the template');
        //Common Method implemented to wait for tester to run the test.Code available in specHelper.js
        _result.waitToRunTest();
        runs(function() {
				//var dpxInstance = new Rho.DPX();
				dpxInstance.inputSource = Rho.DPX.SOURCE_CAMERA;
				dpxInstance.setCallback(captureCallback);
				dpxInstance.ledFeedback = false;
				dpxInstance.template = Rho.RhoFile.join(Rho.Application.AppBundleFolder, 'picture.xml');
				dpxInstance.captureDocument();
        });
        //Add more waitsfor or run blocks if required.
        //Common Method implemented to wait for tester to make it pass or fail.Code available in specHelper.js
        _result.waitForResponse();
    });
	
    it('Objective:\nDocument capture with ledFeedback  property set to true ', function() {
        dispTestCaseRunning('1. Set template property to path of template.xml has region of  picture\n/sdcard/Application/template.xml\n2.Set ledFeedback to true\n3. Call setCallback method with callback\n4. Call captureDocument method Capture a document by taking a photo\n');
        dispExpectedResult('Should get the led feedback at the time captured document is getting processed after proceessed successfully callback fired once for each field defined in the template');
        //Common Method implemented to wait for tester to run the test.Code available in specHelper.js
        _result.waitToRunTest();
        runs(function() {
				//var dpxInstance = new Rho.DPX();
				dpxInstance.inputSource = Rho.DPX.SOURCE_CAMERA;
				dpxInstance.setCallback(captureCallback);
				dpxInstance.ledFeedback = true;
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
	
    it('Objective:\nDocument capture set flashMode  property with default value\n', function() {
        dispTestCaseRunning('1. Set template property to path of template.xml has region of  picture\n/sdcard/Application/template.xml\n2. Call setCallback method with callback\n3. Call captureDocument method Capture a document by taking a photo\n');
        dispExpectedResult('Shold not get the flash at the time of capturing the photo and captured document should get  proceessed successfully callback fired once for each field defined in the template');
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
	
    it('Objective:\nDocument capture with flashMode  property set to on\n\n\n', function() {
        dispTestCaseRunning('1. Set template property to path of template.xml has region of  picture\n/sdcard/Application/template.xml\n2.Set flashMode to on\n3. Call setCallback method with callback\n4. Call captureDocument method Capture a document by taking a photo\n');
        dispExpectedResult('Shold get flash at the time of capturing the photo and captured document should get  proceessed successfully callback fired once for each field defined in the template');
        //Common Method implemented to wait for tester to run the test.Code available in specHelper.js
        _result.waitToRunTest();
        runs(function() {
				//var dpxInstance = new Rho.DPX();
				dpxInstance.inputSource = Rho.DPX.SOURCE_CAMERA;
				dpxInstance.flashMode = Rho.DPX.FLASH_ON;
				dpxInstance.setCallback(captureCallback);
				dpxInstance.template = Rho.RhoFile.join(Rho.Application.AppBundleFolder, 'picture.xml');
				dpxInstance.captureDocument();
        });
        //Add more waitsfor or run blocks if required.
        //Common Method implemented to wait for tester to make it pass or fail.Code available in specHelper.js
        _result.waitForResponse();
    });
	
    it('Objective:\nDocument capture with flashMode  property set to off\n', function() {
        dispTestCaseRunning('1. Set template property to path of template.xml has region of  picture\n/sdcard/Application/template.xml\n2.Set flashMode to off\n3. Call setCallback method with callback\n4. Call captureDocument method Capture a document by taking a photo\n');
        dispExpectedResult('Shold not get the flash at the time of capturing the photo and captured document should get  proceessed successfully callback fired once for each field defined in the template');
        //Common Method implemented to wait for tester to run the test.Code available in specHelper.js
        _result.waitToRunTest();
        runs(function() {
				//var dpxInstance = new Rho.DPX();
				dpxInstance.inputSource = Rho.DPX.SOURCE_CAMERA;
				dpxInstance.flashMode = Rho.DPX.FLASH_OFF;
				dpxInstance.setCallback(captureCallback);
				dpxInstance.template = Rho.RhoFile.join(Rho.Application.AppBundleFolder, 'picture.xml');
				dpxInstance.captureDocument();
        });
        //Add more waitsfor or run blocks if required.
        //Common Method implemented to wait for tester to make it pass or fail.Code available in specHelper.js
        _result.waitForResponse();
    });
	
    it('Objective:\nDocument capture with flashMode  property set to auto\n', function() {
        dispTestCaseRunning('1. Set template property to path of template.xml has region of  picture\n/sdcard/Application/template.xml\n2.Set flashMode to auto\n3. Call setCallback method with callback\n4. Call captureDocument method Capture a document by taking a photo\n');
        dispExpectedResult('Shold get flash at the time of capturing the photo and captured document should get  proceessed successfully callback fired once for each field defined in the template\n\nNote:flash on/off depends upon the avilability of the light where the photo is capture');
        //Common Method implemented to wait for tester to run the test.Code available in specHelper.js
        _result.waitToRunTest();
        runs(function() {
				//var dpxInstance = new Rho.DPX();
				dpxInstance.inputSource = Rho.DPX.SOURCE_CAMERA;
				dpxInstance.flashMode = Rho.DPX.FLASH_AUTO;
				dpxInstance.setCallback(captureCallback);
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
	
    it('Objective:\nDocument capture set identificationTimeout  property with default value 15000(15 secods)\n', function() {
        dispTestCaseRunning('1. Set template property to path of template.xml has region of  picture\n/sdcard/Application/template.xml\n2.Set inputSource to camera\n3. Call setCallback method with callback\n4. Call captureDocument method Capture a document by taking a photo using camera\n');
        dispExpectedResult('Callack should return identification timout(FAILURE_IDENTIFICATION_TIMEOUT)\nwhen not able to capture the photo within 15 seconds');
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
	
    it('Objective:\nDocument capture with identificationTimeout  property set to 0\n\n', function() {
        dispTestCaseRunning('1. Set template property to path of template.xml has region of  picture\n/sdcard/Application/template.xml\n2.Set inputSource to imager\n3.Set identificationTimeout to 0\n4. Call setCallback method with callback\n5. Call captureDocument method Capture a document by taking a photo using imager\n');
        dispExpectedResult('Callack should return identification timout(FAILURE_IDENTIFICATION_TIMEOUT)\nwhen not able to capture the photo within 0 seconds');
        //Common Method implemented to wait for tester to run the test.Code available in specHelper.js
        _result.waitToRunTest();
        runs(function() {
				//var dpxInstance = new Rho.DPX();
				dpxInstance.inputSource = Rho.DPX.SOURCE_CAMERA;
				dpxInstance.identificationTimeout = 0;
				dpxInstance.setCallback(captureCallback);
				dpxInstance.template = Rho.RhoFile.join(Rho.Application.AppBundleFolder, 'picture.xml');
				dpxInstance.captureDocument();
        });
        //Add more waitsfor or run blocks if required.
        //Common Method implemented to wait for tester to make it pass or fail.Code available in specHelper.js
        _result.waitForResponse();
    });
	
    it('Objective:\nDocument capture with identificationTimeout  property set to 2000 (1 second)\n\n', function() {
        dispTestCaseRunning('1. Set template property to path of template.xml has region of  picture\n/sdcard/Application/template.xml\n2.Set inputSource to camera\n3.Set identificationTimeout to 2000\n4. Call setCallback method with callback\n5. Call captureDocument method Capture a document by taking a photo using camera\n');
        dispExpectedResult('Callack should return identification timout(FAILURE_IDENTIFICATION_TIMEOUT)\nwhen not able to capture the photo within 2 seconds');
        //Common Method implemented to wait for tester to run the test.Code available in specHelper.js
        _result.waitToRunTest();
        runs(function() {
				//var dpxInstance = new Rho.DPX();
				dpxInstance.inputSource = Rho.DPX.SOURCE_CAMERA;
				dpxInstance.identificationTimeout = 2000;
				dpxInstance.setCallback(captureCallback);
				dpxInstance.template = Rho.RhoFile.join(Rho.Application.AppBundleFolder, 'picture.xml');
				dpxInstance.captureDocument();
        });
        //Add more waitsfor or run blocks if required.
        //Common Method implemented to wait for tester to make it pass or fail.Code available in specHelper.js
        _result.waitForResponse();
    });
	
    it('Objective:\nDocument capture with identificationTimeout  property set to 5000\n\n', function() {
        dispTestCaseRunning('1. Set template property to path of template.xml has region of  picture\n/sdcard/Application/template.xml\n2.Set inputSource to imager\n3.Set identificationTimeout to 5000\n4. Call setCallback method with callback\n5. Call captureDocument method Capture a document by taking a photo using imager\n');
        dispExpectedResult('Callack should return identification timout(FAILURE_IDENTIFICATION_TIMEOUT)\nwhen not able to capture the photo more then 5 seconds');
        //Common Method implemented to wait for tester to run the test.Code available in specHelper.js
        _result.waitToRunTest();
        runs(function() {
				//var dpxInstance = new Rho.DPX();
				dpxInstance.inputSource = Rho.DPX.SOURCE_CAMERA;
				dpxInstance.identificationTimeout = 5000;
				dpxInstance.setCallback(captureCallback);
				dpxInstance.template = Rho.RhoFile.join(Rho.Application.AppBundleFolder, 'picture.xml');
				dpxInstance.captureDocument();
        });
        //Add more waitsfor or run blocks if required.
        //Common Method implemented to wait for tester to make it pass or fail.Code available in specHelper.js
        _result.waitForResponse();
    });
	
    it('Objective:\nDocument capture with identificationTimeout  property set to 20000 (20 second)\n\n', function() {
        dispTestCaseRunning('1. Set template property to path of template.xml has region of  picture\n/sdcard/Application/template.xml\n2.Set inputSource to camera\n3.Set identificationTimeout to 20000\n4. Call setCallback method with callback\n5. Call captureDocument method Capture a document by taking a photo using camera\n');
        dispExpectedResult('Callack should return identification timout(FAILURE_IDENTIFICATION_TIMEOUT)\nwhen not able to capture the photo within 20 seconds');
        //Common Method implemented to wait for tester to run the test.Code available in specHelper.js
        _result.waitToRunTest();
        runs(function() {
				//var dpxInstance = new Rho.DPX();
				dpxInstance.inputSource = Rho.DPX.SOURCE_CAMERA;
				dpxInstance.identificationTimeout = 20000;
				dpxInstance.setCallback(captureCallback);
				dpxInstance.template = Rho.RhoFile.join(Rho.Application.AppBundleFolder, 'picture.xml');
				dpxInstance.captureDocument();
        });
        //Add more waitsfor or run blocks if required.
        //Common Method implemented to wait for tester to make it pass or fail.Code available in specHelper.js
        _result.waitForResponse();
    });
	
    it('Objective:\nDocument capture with identificationTimeout  property set to 22000 (22 second)\n\n', function() {
        dispTestCaseRunning('1. Set template property to path of template.xml has region of  picture\n/sdcard/Application/template.xml\n2.Set inputSource to imager\n3.Set identificationTimeout to 22000\n4. Call setCallback method with callback\n5. Call captureDocument method Capture a document by taking a photo using imager\n');
        dispExpectedResult('Callack should return identification timout(FAILURE_IDENTIFICATION_TIMEOUT)\nwhen not able to capture the photo within 22 seconds');
        //Common Method implemented to wait for tester to run the test.Code available in specHelper.js
        _result.waitToRunTest();
        runs(function() {
				//var dpxInstance = new Rho.DPX();
				dpxInstance.inputSource = Rho.DPX.SOURCE_CAMERA;
				dpxInstance.identificationTimeout = 22000;
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
	
    it('Objective:\nDocument capture set inputSource  property with default value (camera)', function() {
        dispTestCaseRunning('1. Set template property to path of template.xml has region of  picture\n/sdcard/Application/template.xml\n2. Call setCallback method with callback\n3. Call captureDocument method Capture a document by taking a photo using camera\n');
        dispExpectedResult('captured document should get processed successfully and callback fired once for each field defined in the template');
        //Common Method implemented to wait for tester to run the test.Code available in specHelper.js
        _result.waitToRunTest();
        runs(function() {
				//var dpxInstance = new Rho.DPX();
				dpxInstance.setCallback(captureCallback);
				dpxInstance.template = Rho.RhoFile.join(Rho.Application.AppBundleFolder, 'picture.xml');
				dpxInstance.captureDocument();
        });
        //Add more waitsfor or run blocks if required.
        //Common Method implemented to wait for tester to make it pass or fail.Code available in specHelper.js
        _result.waitForResponse();
    });
	
    it('Objective:\nDocument capture with inputSource  property set to SOURCE_IMAGER(imager)\n\n', function() {
        dispTestCaseRunning('1. Set template property to path of template.xml has region of  picture\n/sdcard/Application/template.xml\n2.Set inputSource to imager\n3. Call setCallback method with callback\n4. Call captureDocument method Capture a document by taking a photo using imager\n');
        dispExpectedResult('captured document should get processed successfully and callback fired once for each field defined in the template');
        //Common Method implemented to wait for tester to run the test.Code available in specHelper.js
        _result.waitToRunTest();
        runs(function() {
				//var dpxInstance = new Rho.DPX();
				dpxInstance.inputSource = Rho.DPX.SOURCE_IMAGER;
				dpxInstance.setCallback(captureCallback);
				dpxInstance.template = Rho.RhoFile.join(Rho.Application.AppBundleFolder, 'picture.xml');
				dpxInstance.captureDocument();
        });
        //Add more waitsfor or run blocks if required.
        //Common Method implemented to wait for tester to make it pass or fail.Code available in specHelper.js
        _result.waitForResponse();
    });
	
    it('Objective:\nDocument capture with inputSource  property set to SOURCE_CAMERA (camera)\n\n', function() {
        dispTestCaseRunning('1. Set template property to path of template.xml has region of  picture\n/sdcard/Application/template.xml\n2.Set inputSource to camera\n3. Call setCallback method with callback\n4. Call captureDocument method Capture a document by taking a photo using camera\n');
        dispExpectedResult('captured document should get processed successfully and callback fired once for each field defined in the template');
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
	
    it('Objective:\nDocument capture with fileInteractiveMode property default value, inputSource  property set to SOURCE_FILE (file) and inputSourceFilename set to valid full path to the image to be processed\n\n', function() {
        dispTestCaseRunning('1. Set template property to path of template.xml has region of  picture\n/sdcard/Application/template.xml\n2.Set inputSource to File\n3. inputSourceFilename to /sdcard/Appliaction/image.jpg\n4. Call setCallback method with callback\n5. Call captureDocument method Capture a document by given image as a file\n');
        dispExpectedResult('captured document should get processed successfully and callback fired once for each field defined in the template');
        //Common Method implemented to wait for tester to run the test.Code available in specHelper.js
        _result.waitToRunTest();
        runs(function() {
				//var dpxInstance = new Rho.DPX();
				dpxInstance.inputSource = Rho.DPX.SOURCE_FILE;
				dpxInstance.inputSourceFilename = Rho.RhoFile.join(Rho.Application.AppBundleFolder, 'image.jpg');
				dpxInstance.setCallback(captureCallback);
				dpxInstance.template = Rho.RhoFile.join(Rho.Application.AppBundleFolder, 'picture.xml');
				dpxInstance.captureDocument();
        });
        //Add more waitsfor or run blocks if required.
        //Common Method implemented to wait for tester to make it pass or fail.Code available in specHelper.js
        _result.waitForResponse();
    });
	
    it('Objective:\nDocument capture with set fileInteractiveMode property to false, inputSource  property set to SOURCE_FILE (file) and inputSourceFilename set to valid full path to the image to be processed\n\n', function() {
        dispTestCaseRunning('1. Set template property to path of template.xml has region of  picture\n/sdcard/Application/template.xml\n2.Set fileInteractiveMode to false\n3.Set inputSource to File\n4. inputSourceFilename to /sdcard/Appliaction/image.jpg\n5. Call setCallback method with callback\n6. Call captureDocument method Capture a document by given image as a file\n');
        dispExpectedResult('should not capture the impage because  fileInteractiveMode set to false');
        //Common Method implemented to wait for tester to run the test.Code available in specHelper.js
        _result.waitToRunTest();
        runs(function() {
				//var dpxInstance = new Rho.DPX();
				dpxInstance.template = Rho.RhoFile.join(Rho.Application.AppBundleFolder, 'picture.xml');
				dpxInstance.fileInteractiveMode = false;
				dpxInstance.inputSource = Rho.DPX.SOURCE_FILE;
				dpxInstance.inputSourceFilename = Rho.RhoFile.join(Rho.Application.AppBundleFolder, 'image.jpg');
				dpxInstance.setCallback(captureCallback);
				dpxInstance.captureDocument();
        });
        //Add more waitsfor or run blocks if required.
        //Common Method implemented to wait for tester to make it pass or fail.Code available in specHelper.js
        _result.waitForResponse();
    });
	
    it('Objective:\nDocument capture with set fileInteractiveMode property to true, inputSource  property set to SOURCE_FILE (file) and inputSourceFilename set to valid full path to the image to be processed\n\n', function() {
        dispTestCaseRunning('1. Set template property to path of template.xml has region of  picture\n/sdcard/Application/template.xml\n2.Set fileInteractiveMode to true\n3.Set inputSource to File\n4. inputSourceFilename to /sdcard/Appliaction/image.jpg\n5. Call setCallback method with callback\n6. Call captureDocument method Capture a document by given image as a file\n');
        dispExpectedResult('captured document should get processed successfully and callback fired once for each field defined in the template');
        //Common Method implemented to wait for tester to run the test.Code available in specHelper.js
        _result.waitToRunTest();
        runs(function() {
				//var dpxInstance = new Rho.DPX();
				dpxInstance.template = Rho.RhoFile.join(Rho.Application.AppBundleFolder, 'picture.xml');				
				dpxInstance.inputSource = Rho.DPX.SOURCE_FILE;
				dpxInstance.fileInteractiveMode = true;
				dpxInstance.inputSourceFilename = Rho.RhoFile.join(Rho.Application.AppBundleFolder, 'image.jpg');
				dpxInstance.setCallback(captureCallback);
				dpxInstance.captureDocument();
        });
        //Add more waitsfor or run blocks if required.
        //Common Method implemented to wait for tester to make it pass or fail.Code available in specHelper.js
        _result.waitForResponse();
    });
	
    it('Objective:\nDocument capture with set fileInteractiveMode property to inavlid value, inputSource  property set to SOURCE_FILE (file) and inputSourceFilename set to valid full path to the image to be processed\n\n', function() {
        dispTestCaseRunning('1. Set template property to path of template.xml has region of  picture\n/sdcard/Application/template.xml\n2.Set fileInteractiveMode to invalid\n3.Set inputSource to File\n4. inputSourceFilename to /sdcard/Appliaction/image.jpg\n5. Call setCallback method with callback\n6. Call captureDocument method Capture a document by given image as a file\n');
        dispExpectedResult('should not capture the impage because  fileInteractiveMode set to invalid');
        //Common Method implemented to wait for tester to run the test.Code available in specHelper.js
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
        //Add more waitsfor or run blocks if required.
        //Common Method implemented to wait for tester to make it pass or fail.Code available in specHelper.js
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
	
    it('Objective:\nDocument capture debug property with default value(false) and logDirectory  property with default value (/sdcard/DPXLog)', function() {
        dispTestCaseRunning('1. Set template property to path of template.xml has region of  picture\n/sdcard/Application/template.xml\n2.Set logDirectory to /sdcard/DPXLog\n3.Set inputSource to File\n4. inputSourceFilename to /sdcard/Appliaction/image.jpg\n5. Call setCallback method with callback\n6. Call captureDocument method Capture a document by given image as a file\n');
        dispExpectedResult('captured document should get processed successfully and callback fired once for each field defined in the template \n\nbut It should not create the logdirectory at specified path because debug property default value is set to false');
        //Common Method implemented to wait for tester to run the test.Code available in specHelper.js
        _result.waitToRunTest();
        runs(function() {
				//var dpxInstance = new Rho.DPX();
				dpxInstance.template = Rho.RhoFile.join(Rho.Application.AppBundleFolder, 'picture.xml');				
				dpxInstance.inputSource = Rho.DPX.SOURCE_CAMERA;
				dpxInstance.setCallback(captureCallback);
				dpxInstance.captureDocument();
        });
        //Add more waitsfor or run blocks if required.
        //Common Method implemented to wait for tester to make it pass or fail.Code available in specHelper.js
        _result.waitForResponse();
    });
	
    it('Objective:\nDocument capture set debug property  to true\n', function() {
        dispTestCaseRunning('1. Set template property to path of template.xml has region of  picture\n/sdcard/Application/template.xml\n2.Set debug to true\n3.Set inputSource to camera\n4. Call setCallback method with callback\n5. Call captureDocument method Capture a document by taking a photo using camera\n');
        dispExpectedResult('captured document should get processed successfully and callback fired once for each field defined in the template \n\nand It should create the logdirectory at specified path with name /sdcard/DPXLog');
        //Common Method implemented to wait for tester to run the test.Code available in specHelper.js
        _result.waitToRunTest();
        runs(function() {
				//var dpxInstance = new Rho.DPX();
				dpxInstance.template = Rho.RhoFile.join(Rho.Application.AppBundleFolder, 'picture.xml');
				dpxInstance.debug = true;	
				dpxInstance.inputSource = Rho.DPX.SOURCE_CAMERA;
				dpxInstance.setCallback(captureCallback);
				dpxInstance.captureDocument();
        });
        //Add more waitsfor or run blocks if required.
        //Common Method implemented to wait for tester to make it pass or fail.Code available in specHelper.js
        _result.waitForResponse();
    });
	
	it('Objective:\nDocument capture set debug property  to true and logDirectory  property set to /sdcard/Application/DPXLog\n\n', function() {
        dispTestCaseRunning('1. Set template property to path of template.xml has region of  picture\n/sdcard/Application/template.xml\n2.Set debug to true\n3.Set logDirectory to /sdcard/Application/DPXLog\n4.Set inputSource to camera\n5. Call setCallback method with callback\n6. Call captureDocument method Capture a document by taking a photo using camera\n');
        dispExpectedResult('captured document should get processed successfully and callback fired once for each field defined in the template \n\nand It should create the logdirectory at specified path  with name DPXLog and generate log for currently captured file');
        //Common Method implemented to wait for tester to run the test.Code available in specHelper.js
        _result.waitToRunTest();
        runs(function() {
				//var dpxInstance = new Rho.DPX();
				dpxInstance.template = Rho.RhoFile.join(Rho.Application.AppBundleFolder, 'picture.xml');
				dpxInstance.debug = true;	
				dpxInstance.logDirectory = '/sdcard/Application/DPXLog';				
				dpxInstance.inputSource = Rho.DPX.SOURCE_CAMERA;
				dpxInstance.setCallback(captureCallback);
				dpxInstance.captureDocument();
        });
        //Add more waitsfor or run blocks if required.
        //Common Method implemented to wait for tester to make it pass or fail.Code available in specHelper.js
        _result.waitForResponse();
    });
	
    it('Objective:\nDocument capture set debug property  to false and logDirectory  property set to /sdcard/Application/DPXLog\n\n', function() {
        dispTestCaseRunning('1. Set template property to path of template.xml has region of  picture\n/sdcard/Application/template.xml\n2.Set debug to false\n3.Set logDirectory to /sdcard/Application/DPXLog\n4.Set inputSource to imager\n5. Call setCallback method with callback\n6. Call captureDocument method Capture a document by taking a photo using imager\n');
        dispExpectedResult('captured document should get processed successfully and callback fired once for each field defined in the template \n\nbut It should not create the logdirectory at specified path because debug property default value is set to false');
        //Common Method implemented to wait for tester to run the test.Code available in specHelper.js
        _result.waitToRunTest();
        runs(function() {
				//var dpxInstance = new Rho.DPX();
				dpxInstance.template = Rho.RhoFile.join(Rho.Application.AppBundleFolder, 'picture.xml');
				dpxInstance.debug = false;	
				dpxInstance.logDirectory = '/sdcard/Application/DPXLog';				
				dpxInstance.inputSource = Rho.DPX.SOURCE_CAMERA;
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
	
    it('Objective:\nDocument capture with manualResolutionMode default value\n', function() {
        dispTestCaseRunning('1. Set template property to path of template.xml has region of  picture\n/sdcard/Application/template.xml\n2. Set inputSource to camera\n3. Call setCallback method with callback\n4. Call captureDocument method Capture a document by taking a photo using camera\n\nNote: Only applicabel to inputsource camera');
        dispExpectedResult('captured document should get processed successfully and callback fired once for each field defined in the template ');
        //Common Method implemented to wait for tester to run the test.Code available in specHelper.js
        _result.waitToRunTest();
        runs(function() {
 				//var dpxInstance = new Rho.DPX();
				dpxInstance.template = Rho.RhoFile.join(Rho.Application.AppBundleFolder, 'picture.xml');
				dpxInstance.inputSource = Rho.DPX.SOURCE_CAMERA;
				dpxInstance.setCallback(captureCallback);
				dpxInstance.captureDocument();
        });
        //Add more waitsfor or run blocks if required.
        //Common Method implemented to wait for tester to make it pass or fail.Code available in specHelper.js
        _result.waitForResponse();
    });
	
    it('Objective:\nDocument capture set manualResolutionMode  set to true\n', function() {
        dispTestCaseRunning('1. Set template property to path of template.xml has region of  picture\n/sdcard/Application/template.xml\n2. Set manualResolutionMode to true\n3. Set inputSource to camera\n4. Call setCallback method with callback\n5. Call captureDocument method Capture a document by taking a photo using camera\n\nNote: Only applicabel to inputsource camera');
        dispExpectedResult('captured document should get processed successfully and callback fired once for each field defined in the template\n\n and manualResolution of the image size should be 1600x1200 (RESOLUTION_MEDIUM) because manualResolutionMode default value is false');
        //Common Method implemented to wait for tester to run the test.Code available in specHelper.js
        _result.waitToRunTest();
        runs(function() {
 				//var dpxInstance = new Rho.DPX();
				dpxInstance.template = Rho.RhoFile.join(Rho.Application.AppBundleFolder, 'picture.xml');
                dpxInstance.manualResolutionMode = true;				
				dpxInstance.inputSource = Rho.DPX.SOURCE_CAMERA;
				dpxInstance.setCallback(captureCallback);
				dpxInstance.captureDocument();
        });
        //Add more waitsfor or run blocks if required.
        //Common Method implemented to wait for tester to make it pass or fail.Code available in specHelper.js
        _result.waitForResponse();
    });
	
    it('Objective:\nDocument capture set manualResolutionMode  set to true and manualResolution set to RESOLUTION_SMALL (1280x960) \nNote: Only applicabel to inputsource camera', function() {
        dispTestCaseRunning('1. Set template property to path of template.xml has region of  picture\n/sdcard/Application/template.xml\n2. Set manualResolutionMode to true\n3. Set manualResolution to RESOLUTION_SMALL (1280x960) \n4. Set inputSource to camera\n5. Call setCallback method with callback\n6. Call captureDocument method Capture a document by taking a photo using camera\n\nNote: Only applicabel to inputsource camera');
        dispExpectedResult('captured document should get processed successfully and callback fired once for each field defined in the template \n\nand image size should be RESOLUTION_SMALL (1280x960) because ');
        //Common Method implemented to wait for tester to run the test.Code available in specHelper.js
        _result.waitToRunTest();
        runs(function() {
 				//var dpxInstance = new Rho.DPX();
				dpxInstance.template = Rho.RhoFile.join(Rho.Application.AppBundleFolder, 'picture.xml');
                dpxInstance.manualResolutionMode = true;	
                dpxInstance.manualResolution = Rho.DPX.RESOLUTION_SMALL;				
				dpxInstance.inputSource = Rho.DPX.SOURCE_CAMERA;
				dpxInstance.setCallback(captureCallback);
				dpxInstance.captureDocument();
        });
        //Add more waitsfor or run blocks if required.
        //Common Method implemented to wait for tester to make it pass or fail.Code available in specHelper.js
        _result.waitForResponse();
    });
	
    it('Objective:\nDocument capture set manualResolutionMode  set to true and manualResolution set to RESOLUTION_MEDIUM (1600x1200) \nNote: Only applicabel to inputsource camera', function() {
        dispTestCaseRunning('1. Set template property to path of template.xml has region of  picture\n/sdcard/Application/template.xml\n2. Set manualResolutionMode to true\n3. Set manualResolution to RESOLUTION_MEDIUM (1600x1200)\n4. Set inputSource to camera\n5. Call setCallback method with callback\n6. Call captureDocument method Capture a document by taking a photo using camera\n\nNote: Only applicabel to inputsource camera');
        dispExpectedResult('captured document should get processed successfully and callback fired once for each field defined in the template \n\nand image size should be RESOLUTION_MEDIUM (1600x1200) ');
        //Common Method implemented to wait for tester to run the test.Code available in specHelper.js
        _result.waitToRunTest();
        runs(function() {
 				//var dpxInstance = new Rho.DPX();
				dpxInstance.template = Rho.RhoFile.join(Rho.Application.AppBundleFolder, 'picture.xml');
                dpxInstance.manualResolutionMode = true;	
                dpxInstance.manualResolution = Rho.DPX.RESOLUTION_MEDIUM;				
				dpxInstance.inputSource = Rho.DPX.SOURCE_CAMERA;
				dpxInstance.setCallback(captureCallback);
				dpxInstance.captureDocument();
        });
        //Add more waitsfor or run blocks if required.
        //Common Method implemented to wait for tester to make it pass or fail.Code available in specHelper.js
        _result.waitForResponse();
    });
	
    it('Objective:\nDocument capture set manualResolutionMode  set to true and manualResolution set to RESOLUTION_LARGE (2048x1536) \nNote: Only applicabel to inputsource camera', function() {
        dispTestCaseRunning('1. Set template property to path of template.xml has region of  picture\n/sdcard/Application/template.xml\n2. Set manualResolutionMode to true\n3. Set manualResolution to RESOLUTION_LARGE (2048x1536) \n4. Set inputSource to camera\n5. Call setCallback method with callback\n6. Call captureDocument method Capture a document by taking a photo using camera\n\nNote: Only applicabel to inputsource camera');
        dispExpectedResult('captured document should get processed successfully and callback fired once for each field defined in the template and image size should beRESOLUTION_LARGE (2048x1536) ');
        //Common Method implemented to wait for tester to run the test.Code available in specHelper.js
        _result.waitToRunTest();
        runs(function() {
 				//var dpxInstance = new Rho.DPX();
				dpxInstance.template = Rho.RhoFile.join(Rho.Application.AppBundleFolder, 'picture.xml');
                dpxInstance.manualResolutionMode = true;	
                dpxInstance.manualResolution = Rho.DPX.RESOLUTION_LARGE;				
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
	
    it('Objective:\nDocument capture set ocrLanguage  property with default value (english)', function() {
        dispTestCaseRunning('1. Set template property to path of template.xml has region of  picture\n/sdcard/Application/template.xml\n2. Set inputSource to camera\n3. Call setCallback method with callback\n4. Call captureDocument method Capture a document by taking a photo using camera\n\n');
        dispExpectedResult('captured document should get processed successfully and callback fired once for \n\neach field defined in the template which has european character set');
        //Common Method implemented to wait for tester to run the test.Code available in specHelper.js
        _result.waitToRunTest();
        runs(function() {
 				//var dpxInstance = new Rho.DPX();
				dpxInstance.template = Rho.RhoFile.join(Rho.Application.AppBundleFolder, 'picture.xml');
				dpxInstance.inputSource = Rho.DPX.SOURCE_CAMERA;
				dpxInstance.setCallback(captureCallback);
				dpxInstance.captureDocument();
        });
        //Add more waitsfor or run blocks if required.
        //Common Method implemented to wait for tester to make it pass or fail.Code available in specHelper.js
        _result.waitForResponse();
    });
	
    it('Objective:\nDocument capture set ocrLanguage  property set to LANGUAGE_EUROPEAN (european)', function() {
        dispTestCaseRunning('1. Set template property to path of template.xml has region of  picture\n/sdcard/Application/template.xml (which has european character set)\n2.Set ocrLanguage to LANGUAGE_EUROPEAN (european)\n3. Set inputSource to camera\n4. Call setCallback method with callback\n5. Call captureDocument method Capture a document by taking a photo using camera\n');
        dispExpectedResult('captured document should get processed successfully and callback fired once for \n\neach field defined in the template which has european character set');
        //Common Method implemented to wait for tester to run the test.Code available in specHelper.js
        _result.waitToRunTest();
        runs(function() {
 				//var dpxInstance = new Rho.DPX();
				dpxInstance.template = Rho.RhoFile.join(Rho.Application.AppBundleFolder, 'picture.xml');
				dpxInstance.ocrLanguage = Rho.DPX.LANGUAGE_EUROPEAN;				
				dpxInstance.inputSource = Rho.DPX.SOURCE_CAMERA;
				dpxInstance.setCallback(captureCallback);
				dpxInstance.captureDocument();
        });
        //Add more waitsfor or run blocks if required.
        //Common Method implemented to wait for tester to make it pass or fail.Code available in specHelper.js
        _result.waitForResponse();
    });
	
    it('Objective:\nDocument capture set ocrLanguage  property set to LANGUAGE_ENGLISH (english)', function() {
        dispTestCaseRunning('1. Set template property to path of template.xml has region of  picture\n/sdcard/Application/template.xml\n2.Set ocrLanguage to LANGUAGE_ENGLISH (english)\n3. Set inputSource to camera\n4. Call setCallback method with callback\n5. Call captureDocument method Capture a document by taking a photo using camera\n');
        dispExpectedResult('captured document should get processed successfully and callback fired once for \n\neach field defined in the template which has english character set');
        //Common Method implemented to wait for tester to run the test.Code available in specHelper.js
        _result.waitToRunTest();
        runs(function() {
 				//var dpxInstance = new Rho.DPX();
				dpxInstance.template = Rho.RhoFile.join(Rho.Application.AppBundleFolder, 'picture.xml');
				dpxInstance.ocrLanguage = Rho.DPX.LANGUAGE_ENGLISH;				
				dpxInstance.inputSource = Rho.DPX.SOURCE_CAMERA;
				dpxInstance.setCallback(captureCallback);
				dpxInstance.captureDocument();
        });
        //Add more waitsfor or run blocks if required.
        //Common Method implemented to wait for tester to make it pass or fail.Code available in specHelper.js
        _result.waitForResponse();
    });
	
    it('Objective:\nDocument capture set ocrLanguage  property set to invalid value use the template which has the character set englilsh', function() {
        dispTestCaseRunning('1. Set template property to path of template.xml has region of  picture\n/sdcard/Application/template.xml (which has english character set)\n2.Set ocrLanguage to invalid\n3. Set inputSource to camera\n4. Call setCallback method with callback\n5. Call captureDocument method Capture a document by taking a photo using camera\n\n');
        dispExpectedResult('captured document should get processed successfully and callback fired once for \n\neach field defined in the template has english character set because ocrLanguage set to invalid but default values is english');
        //Common Method implemented to wait for tester to run the test.Code available in specHelper.js
        _result.waitToRunTest();
        runs(function() {
 				//var dpxInstance = new Rho.DPX();
				dpxInstance.template = Rho.RhoFile.join(Rho.Application.AppBundleFolder, 'picture.xml');
				dpxInstance.ocrLanguage = 'invalid';				
				dpxInstance.inputSource = Rho.DPX.SOURCE_CAMERA;
				dpxInstance.setCallback(captureCallback);
				dpxInstance.captureDocument();
        });
        //Add more waitsfor or run blocks if required.
        //Common Method implemented to wait for tester to make it pass or fail.Code available in specHelper.js
        _result.waitForResponse();
    });
	
    it('Objective:\nDocument capture set ocrLanguage  property set to invalid value use the template which has the character set european', function() {
        dispTestCaseRunning('1. Set template property to path of template.xml has region of  picture\n/sdcard/Application/template.xml (which has european character set)\n2.Set ocrLanguage to invalid\n3. Set inputSource to camera\n4. Call setCallback method with callback\n5. Call captureDocument method Capture a document by taking a photo using camera\n\n');
        dispExpectedResult('it should capture and process successfully the document because the template has \n\neuropean character set because ocrLanguage set to invalid but default value is english');
        //Common Method implemented to wait for tester to run the test.Code available in specHelper.js
        _result.waitToRunTest();
        runs(function() {
 				//var dpxInstance = new Rho.DPX();
				dpxInstance.template = Rho.RhoFile.join(Rho.Application.AppBundleFolder, 'picture.xml');
				dpxInstance.ocrLanguage = 'invalid';				
				dpxInstance.inputSource = Rho.DPX.SOURCE_CAMERA;
				dpxInstance.setCallback(captureCallback);
				dpxInstance.captureDocument();
        });
        //Add more waitsfor or run blocks if required.
        //Common Method implemented to wait for tester to make it pass or fail.Code available in specHelper.js
        _result.waitForResponse();
    });
	
    it('Objective:\nDocument capture set processingTimeout  property with default value (10000)', function() {
        dispTestCaseRunning('1. Set template property to path of template.xml has region of  picture\n/sdcard/Application/template.xml\n2. Set inputSource to camera\n3. Call setCallback method with callback\n4. Call captureDocument method Capture a document by taking a photo using camera');
        dispExpectedResult('processingTimeout error should returned in callback when captured document is not able to processed successfully in 10 seconds');
        //Common Method implemented to wait for tester to run the test.Code available in specHelper.js
        _result.waitToRunTest();
        runs(function() {
 				//var dpxInstance = new Rho.DPX();
				dpxInstance.template = Rho.RhoFile.join(Rho.Application.AppBundleFolder, 'picture.xml');
				dpxInstance.inputSource = Rho.DPX.SOURCE_CAMERA;
				dpxInstance.setCallback(captureCallback);
				dpxInstance.captureDocument();
        });
        //Add more waitsfor or run blocks if required.
        //Common Method implemented to wait for tester to make it pass or fail.Code available in specHelper.js
        _result.waitForResponse();
    });
	
    it('Objective:\nDocument capture set processingTimeout  property set to 20000', function() {
        dispTestCaseRunning('1. Set template property to path of template.xml has region of  picture\n/sdcard/Application/template.xml\n2.Set processingTimeout to 20000\n3. Set inputSource to imager\n4. Call setCallback method with callback\n5. Call captureDocument method Capture a document by taking a photo using imager');
        dispExpectedResult('processingTimeout error should returned in callback when captured document is not able to processed successfully in 20 seconds');
        //Common Method implemented to wait for tester to run the test.Code available in specHelper.js
        _result.waitToRunTest();
        runs(function() {
 				//var dpxInstance = new Rho.DPX();
				dpxInstance.template = Rho.RhoFile.join(Rho.Application.AppBundleFolder, 'picture.xml');
				dpxInstance.processingTimeout = 20000;				
				dpxInstance.inputSource = Rho.DPX.SOURCE_CAMERA;
				dpxInstance.setCallback(captureCallback);
				dpxInstance.captureDocument();
        });
        //Add more waitsfor or run blocks if required.
        //Common Method implemented to wait for tester to make it pass or fail.Code available in specHelper.js
        _result.waitForResponse();
    });
	
    it('Objective:\nDocument capture set processingTimeout  property set to 30000', function() {
        dispTestCaseRunning('1. Set template property to path of template.xml has region of  picture\n/sdcard/Application/template.xml\n2.Set processingTimeout to 30000\n3. Set inputSource to File\n4. inputSourceFilename to /sdcard/Appliaction/image.jpg\n5. Call setCallback method with callback\n6. Call captureDocument method Capture a document by given image as a file');
        dispExpectedResult('processingTimeout error should returned in callback when captured document is not able to processed successfully in 30 seconds');
        //Common Method implemented to wait for tester to run the test.Code available in specHelper.js
        _result.waitToRunTest();
        runs(function() {
 				//var dpxInstance = new Rho.DPX();
				dpxInstance.template = Rho.RhoFile.join(Rho.Application.AppBundleFolder, 'picture.xml');
				dpxInstance.processingTimeout = 30000;				
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
	
    it('Objective:\nDocument capture set userMode property with default value (snapshot)\n', function() {
        dispTestCaseRunning('1. Set template property to path of template.xml has region of  picture\n/sdcard/Application/template.xml\n2. Set inputSource to camera\n3. Call setCallback method with callback\n4. Call captureDocument method Capture a document by taking a photo using camera\n\nNote: Only valid for Input Source is camera');
        dispExpectedResult('snapshot mode should be used to capture document and it should get processed successfully and callback fired once for each field defined in the template ');
        //Common Method implemented to wait for tester to run the test.Code available in specHelper.js
        _result.waitToRunTest();
        runs(function() {
 				//var dpxInstance = new Rho.DPX();
				dpxInstance.template = Rho.RhoFile.join(Rho.Application.AppBundleFolder, 'picture.xml');
				dpxInstance.inputSource = Rho.DPX.SOURCE_CAMERA;
				dpxInstance.setCallback(captureCallback);
				dpxInstance.captureDocument();
        });
        //Add more waitsfor or run blocks if required.
        //Common Method implemented to wait for tester to make it pass or fail.Code available in specHelper.js
        _result.waitForResponse();
    });
	
    it('Objective:\nDocument capture set userMode property with set to value USER_MODE_PREVIEW (preview)\n', function() {
        dispTestCaseRunning('1. Set template property to path of template.xml has region of  picture\n/sdcard/Application/template.xml\n2.Set userMode to USER_MODE_PREVIEW (preview)\n3. Set inputSource to camera\n4. Call setCallback method with callback\n5. Call captureDocument method Capture a document by taking a photo using camera\n\nNote: Only valid for Input Source is camera');
        dispExpectedResult('USER_MODE_PREVIEW (preview) mode should be used to capture document and it should get processed successfully \n\nand callback fired once for each field defined in the template ');
        //Common Method implemented to wait for tester to run the test.Code available in specHelper.js
        _result.waitToRunTest();
        runs(function() {
 				//var dpxInstance = new Rho.DPX();
				dpxInstance.template = Rho.RhoFile.join(Rho.Application.AppBundleFolder, 'picture.xml');
				dpxInstance.userMode = Rho.DPX.USER_MODE_PREVIEW;				
				dpxInstance.inputSource = Rho.DPX.SOURCE_CAMERA;
				dpxInstance.setCallback(captureCallback);
				dpxInstance.captureDocument();
        });
        //Add more waitsfor or run blocks if required.
        //Common Method implemented to wait for tester to make it pass or fail.Code available in specHelper.js
        _result.waitForResponse();
    });
	
    it('Objective:\nDocument capture set userMode property with set to value USER_MODE_SNAPSHOT (snapshot)\n', function() {
        dispTestCaseRunning('1. Set template property to path of template.xml has region of  picture\n/sdcard/Application/template.xml\n2.Set userMode to USER_MODE_SNAPSHOT (snapshot)\n3. Set inputSource to camera\n4. Call setCallback method with callback\n5. Call captureDocument method Capture a document by taking a photo using camera\n\nNote: Only valid for Input Source is camera');
        dispExpectedResult('USER_MODE_SNAPSHOT (snapshot)mode should be used to capture document and it should get processed successfully and callback fired once for each field defined in the template ');
        //Common Method implemented to wait for tester to run the test.Code available in specHelper.js
        _result.waitToRunTest();
        runs(function() {
 				//var dpxInstance = new Rho.DPX();
				dpxInstance.template = Rho.RhoFile.join(Rho.Application.AppBundleFolder, 'picture.xml');
				dpxInstance.userMode = Rho.DPX.USER_MODE_SNAPSHOT;				
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
	
    it('Objective:\nDocument capture set uiResultConfirmation property with default value (true)\n', function() {
        dispTestCaseRunning('1. Set template property to path of template.xml has region of  picture\n/sdcard/Application/template.xml\n2. Set inputSource to camera\n3. Call setCallback method with callback\n4. Call captureDocument method Capture a document by taking a photo using camera\n');
        dispExpectedResult('It should shows a UI confirmation with results in DPXView before sending results back to application \n\nafter captured document successfully processed and callback fired once for each field defined in the template ');
        //Common Method implemented to wait for tester to run the test.Code available in specHelper.js
        _result.waitToRunTest();
        runs(function() {
 				//var dpxInstance = new Rho.DPX();
				dpxInstance.template = Rho.RhoFile.join(Rho.Application.AppBundleFolder, 'picture.xml');
				dpxInstance.inputSource = Rho.DPX.SOURCE_CAMERA;
				dpxInstance.setCallback(captureCallback);
				dpxInstance.captureDocument();
        });
        //Add more waitsfor or run blocks if required.
        //Common Method implemented to wait for tester to make it pass or fail.Code available in specHelper.js
        _result.waitForResponse();
    });
	
    it('Objective:\nDocument capture set uiResultConfirmation property set to false\n', function() {
        dispTestCaseRunning('1. Set template property to path of template.xml has region of  picture\n/sdcard/Application/template.xml\n2. Set uiResultConfirmation to false\n3. Set inputSource to camera\n4. Call setCallback method with callback\n5. Call captureDocument method Capture a document by taking a photo using camera\n');
        dispExpectedResult('It should not shows a UI confirmation with results in DPXView before sending results back to application \n\nafter captured document successfully processed and callback fired once for each field defined in the template ');
        //Common Method implemented to wait for tester to run the test.Code available in specHelper.js
        _result.waitToRunTest();
        runs(function() {
 				//var dpxInstance = new Rho.DPX();
				dpxInstance.template = Rho.RhoFile.join(Rho.Application.AppBundleFolder, 'picture.xml');
				dpxInstance.uiResultConfirmation = false;				
				dpxInstance.inputSource = Rho.DPX.SOURCE_CAMERA;
				dpxInstance.setCallback(captureCallback);
				dpxInstance.captureDocument();
        });
        //Add more waitsfor or run blocks if required.
        //Common Method implemented to wait for tester to make it pass or fail.Code available in specHelper.js
        _result.waitForResponse();
    });
	
    it('Objective:\nDocument capture set uiResultConfirmation property set to true\n', function() {
        dispTestCaseRunning('1. Set template property to path of template.xml has region of  picture\n/sdcard/Application/template.xml\n2. Set uiResultConfirmation to ture\n3. Set inputSource to camera\n4. Call setCallback method with callback\n5. Call captureDocument method Capture a document by taking a photo using camera\n');
        dispExpectedResult('It should shows a UI confirmation with results in DPXView before sending results back to application\n\n after captured document successfully processed and callback fired once for each field defined in the template ');
        //Common Method implemented to wait for tester to run the test.Code available in specHelper.js
        _result.waitToRunTest();
        runs(function() {
 				//var dpxInstance = new Rho.DPX();
				dpxInstance.template = Rho.RhoFile.join(Rho.Application.AppBundleFolder, 'picture.xml');
				dpxInstance.uiResultConfirmation = true;				
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
	
    it('Objective:\nDocument capture set zoomAmount property with default value (0 denotes no zoom)\nNote: Only applicalbe to input source camera\n', function() {
        dispTestCaseRunning('1. Set template property to path of template.xml has region of  picture\n/sdcard/Application/template.xml\n2. Set inputSource to camera\n3. Call setCallback method with callback\n4. Call captureDocument method Capture a document by taking a photo using camera\n\nNote: Only applicalbe to input source camera\n');
        dispExpectedResult('There should not be any camera zoom  and \ncaptured document should get processed successfully and callback fired once for each field defined in the template ');
        //Common Method implemented to wait for tester to run the test.Code available in specHelper.js
        _result.waitToRunTest();
        runs(function() {
 				//var dpxInstance = new Rho.DPX();
				dpxInstance.template = Rho.RhoFile.join(Rho.Application.AppBundleFolder, 'picture.xml');
				dpxInstance.inputSource = Rho.DPX.SOURCE_CAMERA;
				dpxInstance.setCallback(captureCallback);
				dpxInstance.captureDocument();
        });
        //Add more waitsfor or run blocks if required.
        //Common Method implemented to wait for tester to make it pass or fail.Code available in specHelper.js
        _result.waitForResponse();
    });
	
    it('Objective:\nDocument capture set zoomAmount property with set to 50\n\n', function() {
        dispTestCaseRunning('1. Set template property to path of template.xml has region of  picture\n/sdcard/Application/template.xml\n2. Set zoomAmount to 50\n3. Set inputSource to camera\n4. Call setCallback method with callback\n5. Call captureDocument method Capture a document by taking a photo using camera\n\nNote: Only applicalbe to input source camera\n');
        dispExpectedResult('There should be 50 amount of  camera shold get zoom and \n\ncaptured document should get processed successfully and callback fired once for each field defined in the template ');
        //Common Method implemented to wait for tester to run the test.Code available in specHelper.js
        _result.waitToRunTest();
        runs(function() {
 				//var dpxInstance = new Rho.DPX();
				dpxInstance.template = Rho.RhoFile.join(Rho.Application.AppBundleFolder, 'picture.xml');
				dpxInstance.zoomAmount = 50;				
				dpxInstance.inputSource = Rho.DPX.SOURCE_CAMERA;
				dpxInstance.setCallback(captureCallback);
				dpxInstance.captureDocument();
        });
        //Add more waitsfor or run blocks if required.
        //Common Method implemented to wait for tester to make it pass or fail.Code available in specHelper.js
        _result.waitForResponse();
    });
	
    it('Objective:\nDocument capture set zoomAmount property with set to 100 (denotes max zoom)\n\n', function() {
        dispTestCaseRunning('1. Set template property to path of template.xml has region of  picture\n/sdcard/Application/template.xml\n2. Set zoomAmount to 100\n3. Set inputSource to camera\n4. Call setCallback method with callback\n5. Call captureDocument method Capture a document by taking a photo using camera\n\nNote: Only applicalbe to input source camera\n');
        dispExpectedResult('There should be 100 (denotes max zoom) amount of  camera shold get zoom and \n\ncaptured document should get processed successfully and callback fired once for each field defined in the template ');
        //Common Method implemented to wait for tester to run the test.Code available in specHelper.js
        _result.waitToRunTest();
        runs(function() {
 				//var dpxInstance = new Rho.DPX();
				dpxInstance.template = Rho.RhoFile.join(Rho.Application.AppBundleFolder, 'picture.xml');
				dpxInstance.zoomAmount = 100;				
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
	
    it('Objective:\nDocument capture and show image on HTML page using Id of form captured image in imageId param calling getDataUri method with camera\n', function() {
        dispTestCaseRunning('1. Set template property to path of template.xml has region of  picture\n/sdcard/Application/template.xml\n2. Set inputSource to camera\n3. Call setCallback method with callback\n4. Call captureDocument method Capture a document by taking a photo using camera\n5. Call getDataUri method with form catpured imageid (id of image will be returned in callback with processedData)\n\n\n');
        dispExpectedResult('captured document should get processed successfully and callback fired once for each field defined in the template and \n\nReturn data URI encoding of the raw image assocated with the region or captured form\n\n To show image on HTML page insert data URI in src attribute of img tag');
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
                        return getformCaptureImageId != null;
                }, '90sec Wait before move to next test', 90000);
				dpxInstance.getDataUri(getformCaptureImageId);
		});
        //Add more waitsfor or run blocks if required.
        //Common Method implemented to wait for tester to make it pass or fail.Code available in specHelper.js
        _result.waitForResponse();
    });
	
	   it('Objective:\nDocument capture and show image on HTML page using Id of region from image in imageId param calling getDataUri method with camera\n', function() {
        dispTestCaseRunning('1. Set template property to path of template.xml has region of  picture\n/sdcard/Application/template.xml\n2. Set inputSource to camera\n3. Call setCallback method with callback\n4. Call captureDocument method Capture a document by taking a photo using camera\n5. Call getDataUri method with region from catpured imageid (id of image will be returned in callback with processedData)\n\n\n');
        dispExpectedResult('captured document should get processed successfully and callback fired once for each field defined in the template and \n\nReturn data URI encoding of the raw image assocated with the region or captured form\n\n To show image on HTML page insert data URI in src attribute of img tag');
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
				dpxInstance.getDataUri(getregionImageId);
			
        });
        //Add more waitsfor or run blocks if required.
        //Common Method implemented to wait for tester to make it pass or fail.Code available in specHelper.js
        _result.waitForResponse();
    });
	
    it('Objective:\nDocument capture and show image on HTML page using Id of image in imageId param calling getDataUri method with imager\n', function() {
        dispTestCaseRunning('1. Set template property to path of template.xml has region of  picture\n/sdcard/Application/template.xml\n2. Set inputSource to imiager\n3. Call setCallback method with callback\n4. Call captureDocument method Capture a document by taking a photo using imager\n5. Call getDataUri method with imageid (id of image will be returned in callback with processedData)\n\n\n');
        dispExpectedResult('captured document should get processed successfully and callback fired once for each field defined in the template and \n\nReturn data URI encoding of the raw image assocated with the region or captured form\n\n To show image on HTML page insert data URI in src attribute of img tag');
        //Common Method implemented to wait for tester to run the test.Code available in specHelper.js
        _result.waitToRunTest();
        runs(function() {
 				//var dpxInstance = new Rho.DPX();
				dpxInstance.template = Rho.RhoFile.join(Rho.Application.AppBundleFolder, 'picture.xml');
				dpxInstance.zoomAmount = 100;				
				dpxInstance.inputSource = Rho.DPX.SOURCE_IMAGER;
				dpxInstance.setCallback(captureCallback);
				dpxInstance.captureDocument();
				waitsFor(function () {
                        return getformCaptureImageId != null;
                }, '90sec Wait before move to next test', 90000);
				dpxInstance.getDataUri(getformCaptureImageId);
        });
        //Add more waitsfor or run blocks if required.
        //Common Method implemented to wait for tester to make it pass or fail.Code available in specHelper.js
        _result.waitForResponse();
    });
	
    it('Objective:\nDocument capture and show image on HTML page using Id of image in imageId param calling getDataUri method with input source as file\n', function() {
        dispTestCaseRunning('1. Set template property to path of template.xml has region of  picture\n/sdcard/Application/template.xml\n2. Set inputSource to File\n3. Call setCallback method with callback\n4. inputSourceFilename to /sdcard/Appliaction/image.jpg\n5. Call captureDocument method Capture a document by given image as a file\n6. Call getDataUri method with imageid (id of image will be returned in callback with processedData)\n\n\n');
        dispExpectedResult('captured document should get processed successfully and callback fired once for each field defined in the template and \n\nReturn data URI encoding of the raw image assocated with the region or captured form\n\n To show image on HTML page insert data URI in src attribute of img tag');
        //Common Method implemented to wait for tester to run the test.Code available in specHelper.js
        _result.waitToRunTest();
        runs(function() {
 				//var dpxInstance = new Rho.DPX();
				dpxInstance.template = Rho.RhoFile.join(Rho.Application.AppBundleFolder, 'picture.xml');
				dpxInstance.zoomAmount = 100;				
				dpxInstance.inputSource = Rho.DPX.SOURCE_FILE;
				dpxInstance.fileInteractiveMode = true;
				dpxInstance.inputSourceFilename = Rho.RhoFile.join(Rho.Application.AppBundleFolder, 'image.jpg');
				dpxInstance.setCallback(captureCallback);
				dpxInstance.captureDocument();
				waitsFor(function () {
                        return getregionImageId != null;
                }, '90sec Wait before move to next test', 90000);
				dpxInstance.getDataUri(getregionImageId);
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
	
    it('Objective:\nClose DPX engine, and release allocated resources\n', function() {
        dispTestCaseRunning('1. Set template property to path of template.xml has region of  picture\n/sdcard/Application/template.xml\n2. Set inputSource to imiager\n3. Call setCallback method with callback\n4. Call captureDocument method Capture a document by taking a photo using camera\n5.Call close method\n5. Call getDataUri method with imageid (id of image will be returned in callback with processedData)\n\n\n');
        dispExpectedResult('captured document should get processed successfully and callback fired once for each field defined in the template and \n\nit should not show the image on HTML page insert data URI in src attribute of img tag because DPX is closed');
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
				dpxInstance.close();
				setTimeout(dpxInstance.getDataUri(getformCaptureImageId), 10000);
				//dpxInstance.getDataUri(getformCaptureImageId);
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
