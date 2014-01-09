
var dpxInstance = new Rho.DPX();

describe('Rho.DPX JS API', function() {
describe('Rho.DPX APIs Set Test', function() {

describe('getting property default value', function() {

		it('Should get audioFeedback default value', function() {
		expect(dpxInstance.audioFeedback).toEqual(true);
		});

		it('Should get ledFeedback default value', function() {
		expect(dpxInstance.ledFeedback).toEqual(true);
		});

		it('Should get debug default value', function() {
		expect(dpxInstance.debug).toEqual(false);
		});

		it('Should get hapticFeedback default value', function() {
		expect(dpxInstance.hapticFeedback).toEqual(true);
		});

		it('Should get fileInteractiveMode default value', function() {
		expect(dpxInstance.fileInteractiveMode).toEqual(true);
		});

		it('Should get flashMode default value', function() {
		expect(dpxInstance.flashMode).toEqual(off);
		});

		it('Should get identificationTimeout default value', function() {
		expect(dpxInstance.identificationTimeout).toEqual(1500);
		});

		it('Should get inputSource default value', function() {
		expect(dpxInstance.inputSource).toEqual('camera');
		});

		it('Should get logDirectory default value', function() {
		expect(dpxInstance.logDirectory).toEqual('/sdcard/DPXLog');
		});

		it('Should get manualResolution default value', function() {
		expect(dpxInstance.manualResolution).toEqual('1600x1200');
		});

		it('Should get manualResolutionMode default value', function() {
		expect(dpxInstance.manualResolutionMode).toEqual(false);
		});

		it('Should get ocrLanguage default value', function() {
		expect(dpxInstance.ocrLanguage).toEqual('english');
		});

		it('Should get processingTimeout default value', function() {
		expect(dpxInstance.processingTimeout).toEqual(10000);
		});

		it('Should get userMode default value', function() {
		expect(dpxInstance.userMode).toEqual('snapshot');
		});

		it('Should get uiResultConfirmation default value', function() {
		expect(dpxInstance.uiResultConfirmation).toEqual(true);
		});

		it('Should get zoomAmount default value', function() {
		expect(dpxInstance.zoomAmount).toEqual(0);
		});

	});

describe('Setting template', function() {

		it('Should Set template to file://Application/template.xml using direct calling method', function() {
		dpxInstance.template='file://Application/template.xml';
		expect(dpxInstance.template).toEqual('file://Application/template.xml');
		});
		it('Should Set template to file://Application/template.xml using setProperty calling method', function() {
		dpxInstance.setProperty('template','file://Application/template.xml');
		expect(dpxInstance.getProperty('template')).toEqual('file://Application/template.xml');
		});
		it('Should Set template to file://Application/template.xml using setProperties calling method', function() {
		dpxInstance.setProperties({'template' : 'file://Application/template.xml'});
		var data = dpxInstance.getProperties(['template']);
		data = data['template'];
		expect(data).toEqual('file://Application/template.xml');
		});
});


describe('Setting audioFeedback', function() {

		it('Should Set audioFeedback to true using direct calling method', function() {
		dpxInstance.audioFeedback=true;
		expect(dpxInstance.audioFeedback).toEqual(true);
		});
		
		it('Should Set audioFeedback to true using setProperty calling method', function() {
		dpxInstance.setProperty('audioFeedback','true');
		expect(dpxInstance.getProperty('audioFeedback')).toEqual('true');
		});
		
		it('Should Set audioFeedback to true using setProperties calling method', function() {
		dpxInstance.setProperties({'audioFeedback' : true});
		var data = dpxInstance.getProperties(['audioFeedback']);
		data = data['audioFeedback'];
		expect(data).toEqual('true');
		});
		
		it('Should Set audioFeedback to false using direct calling method', function() {
		dpxInstance.audioFeedback=false;
		expect(dpxInstance.audioFeedback).toEqual(false);
		});
		
		it('Should Set audioFeedback to false using setProperty calling method', function() {
		dpxInstance.setProperty('audioFeedback','false');
		expect(dpxInstance.getProperty('audioFeedback')).toEqual('false');
		});
		
		it('Should Set audioFeedback to false using setProperties calling method', function() {
		dpxInstance.setProperties({'audioFeedback' : false});
		var data = dpxInstance.getProperties(['audioFeedback']);
		data = data['audioFeedback'];
		expect(data).toEqual('false');
		});
});


describe('Setting debug', function() {

		it('Should Set debug to true using direct calling method', function() {
		dpxInstance.debug=true;
		expect(dpxInstance.debug).toEqual(true);
		});
		
		it('Should Set debug to true using setProperty calling method', function() {
		dpxInstance.setProperty('debug','true');
		expect(dpxInstance.getProperty('debug')).toEqual('true');
		});
		
		it('Should Set debug to true using setProperties calling method', function() {
		dpxInstance.setProperties({'debug' : true});
		var data = dpxInstance.getProperties(['debug']);
		data = data['debug'];
		expect(data).toEqual('true');
		});
		
		it('Should Set debug to false using direct calling method', function() {
		dpxInstance.debug=false;
		expect(dpxInstance.debug).toEqual(false);
		});
		
		it('Should Set debug to false using setProperty calling method', function() {
		dpxInstance.setProperty('debug','false');
		expect(dpxInstance.getProperty('debug')).toEqual('false');
		});
		
		it('Should Set debug to false using setProperties calling method', function() {
		dpxInstance.setProperties({'debug' : false});
		var data = dpxInstance.getProperties(['debug']);
		data = data['debug'];
		expect(data).toEqual('false');
		});
});


describe('Setting hapticFeedback', function() {

		it('Should Set hapticFeedback to true using direct calling method', function() {
		dpxInstance.hapticFeedback=true;
		expect(dpxInstance.hapticFeedback).toEqual(true);
		});
		
		it('Should Set hapticFeedback to true using setProperty calling method', function() {
		dpxInstance.setProperty('hapticFeedback','true');
		expect(dpxInstance.getProperty('hapticFeedback')).toEqual('true');
		});
		
		it('Should Set hapticFeedback to true using setProperties calling method', function() {
		dpxInstance.setProperties({'hapticFeedback' : true});
		var data = dpxInstance.getProperties(['hapticFeedback']);
		data = data['hapticFeedback'];
		expect(data).toEqual('true');
		});
		
		it('Should Set hapticFeedback to false using direct calling method', function() {
		dpxInstance.hapticFeedback=false;
		expect(dpxInstance.hapticFeedback).toEqual(false);
		});
		
		it('Should Set hapticFeedback to false using setProperty calling method', function() {
		dpxInstance.setProperty('hapticFeedback','false');
		expect(dpxInstance.getProperty('hapticFeedback')).toEqual('false');
		});
		
		it('Should Set hapticFeedback to false using setProperties calling method', function() {
		dpxInstance.setProperties({'hapticFeedback' : false});
		var data = dpxInstance.getProperties(['hapticFeedback']);
		data = data['hapticFeedback'];
		expect(data).toEqual('false');
		});
});


describe('Setting ledFeedback', function() {

		it('Should Set ledFeedback to true using direct calling method', function() {
		dpxInstance.ledFeedback=true;
		expect(dpxInstance.ledFeedback).toEqual(true);
		});
		
		it('Should Set ledFeedback to true using setProperty calling method', function() {
		dpxInstance.setProperty('ledFeedback','true');
		expect(dpxInstance.getProperty('ledFeedback')).toEqual('true');
		});
		
		it('Should Set ledFeedback to true using setProperties calling method', function() {
		dpxInstance.setProperties({'ledFeedback' : true});
		var data = dpxInstance.getProperties(['ledFeedback']);
		data = data['ledFeedback'];
		expect(data).toEqual('true');
		});
		
		it('Should Set ledFeedback to false using direct calling method', function() {
		dpxInstance.ledFeedback=false;
		expect(dpxInstance.ledFeedback).toEqual(false);
		});
		
		it('Should Set ledFeedback to false using setProperty calling method', function() {
		dpxInstance.setProperty('ledFeedback','false');
		expect(dpxInstance.getProperty('ledFeedback')).toEqual('false');
		});
		
		it('Should Set ledFeedback to false using setProperties calling method', function() {
		dpxInstance.setProperties({'ledFeedback' : false});
		var data = dpxInstance.getProperties(['ledFeedback']);
		data = data['ledFeedback'];
		expect(data).toEqual('false');
		});
});


describe('Setting fileInteractiveMode', function() {

		it('Should Set fileInteractiveMode to true using direct calling method', function() {
		dpxInstance.fileInteractiveMode=true;
		expect(dpxInstance.fileInteractiveMode).toEqual(true);
		});
		
		it('Should Set fileInteractiveMode to true using setProperty calling method', function() {
		dpxInstance.setProperty('fileInteractiveMode','true');
		expect(dpxInstance.getProperty('fileInteractiveMode')).toEqual('true');
		});
		
		it('Should Set fileInteractiveMode to true using setProperties calling method', function() {
		dpxInstance.setProperties({'fileInteractiveMode' : true});
		var data = dpxInstance.getProperties(['fileInteractiveMode']);
		data = data['fileInteractiveMode'];
		expect(data).toEqual('true');
		});
		
		it('Should Set fileInteractiveMode to false using direct calling method', function() {
		dpxInstance.fileInteractiveMode=false;
		expect(dpxInstance.fileInteractiveMode).toEqual(false);
		});
		
		it('Should Set fileInteractiveMode to false using setProperty calling method', function() {
		dpxInstance.setProperty('fileInteractiveMode','false');
		expect(dpxInstance.getProperty('fileInteractiveMode')).toEqual('false');
		});
		
		it('Should Set fileInteractiveMode to false using setProperties calling method', function() {
		dpxInstance.setProperties({'fileInteractiveMode' : false});
		var data = dpxInstance.getProperties(['fileInteractiveMode']);
		data = data['fileInteractiveMode'];
		expect(data).toEqual('false');
		});
});


describe('Setting flashMode', function() {

		it('Should Set flashMode to FLASH_OFF using direct calling method', function() {
		dpxInstance.flashMode=dpxInstance.FLASH_OFF;
		expect(dpxInstance.flashMode).toEqual(dpxInstance.FLASH_OFF);
		});
		
		it('Should Set flashMode to off using direct calling method', function() {
		dpxInstance.flashMode='off';
		expect(dpxInstance.flashMode).toEqual('off');
		});
		
		it('Should Set flashMode to off using setProperty calling method', function() {
		dpxInstance.setProperty('flashMode','off');
		expect(dpxInstance.getProperty('flashMode')).toEqual('off');
		});
		
		it('Should Set flashMode to off using setProperties calling method', function() {
		dpxInstance.setProperties({'flashMode' : 'off'});
		var data = dpxInstance.getProperties(['flashMode']);
		data = data['flashMode'];
		expect(data).toEqual('off');
		});
		
		it('Should Set flashMode to FLASH_AUTO using direct calling method', function() {
		dpxInstance.flashMode=dpxInstance.FLASH_AUTO;
		expect(dpxInstance.flashMode).toEqual(dpxInstance.FLASH_AUTO);
		});
		
		it('Should Set flashMode to auto using direct calling method', function() {
		dpxInstance.flashMode='auto';
		expect(dpxInstance.flashMode).toEqual('auto');
		});
		
		it('Should Set flashMode to auto using setProperty calling method', function() {
		dpxInstance.setProperty('flashMode','auto');
		expect(dpxInstance.getProperty('flashMode')).toEqual('auto');
		});
		
		it('Should Set flashMode to auto using setProperties calling method', function() {
		dpxInstance.setProperties({'flashMode' : 'auto'});
		var data = dpxInstance.getProperties(['flashMode']);
		data = data['flashMode'];
		expect(data).toEqual('auto');
		});
		
		it('Should Set flashMode to FLASH_ON using direct calling method', function() {
		dpxInstance.flashMode=dpxInstance.FLASH_ON;
		expect(dpxInstance.flashMode).toEqual(dpxInstance.FLASH_ON);
		});
		
		it('Should Set flashMode to on using direct calling method', function() {
		dpxInstance.flashMode='on';
		expect(dpxInstance.flashMode).toEqual('on');
		});
		
		it('Should Set flashMode to on using setProperty calling method', function() {
		dpxInstance.setProperty('flashMode','on');
		expect(dpxInstance.getProperty('flashMode')).toEqual('on');
		});
		
		it('Should Set flashMode to on using setProperties calling method', function() {
		dpxInstance.setProperties({'flashMode' : 'on'});
		var data = dpxInstance.getProperties(['flashMode']);
		data = data['flashMode'];
		expect(data).toEqual('on');
		});
});


describe('Setting identificationTimeout', function() {

		it('Should Set identificationTimeout to 0 using direct calling method', function() {
		dpxInstance.identificationTimeout=0;
		expect(dpxInstance.identificationTimeout).toEqual(0);
		});
		
		it('Should Set identificationTimeout to 0 using setProperty calling method', function() {
		dpxInstance.setProperty('identificationTimeout','0');
		expect(dpxInstance.getProperty('identificationTimeout')).toEqual('0');
		});
		
		it('Should Set identificationTimeout to 0 using setProperties calling method', function() {
		dpxInstance.setProperties({'identificationTimeout' : 0});
		var data = dpxInstance.getProperties(['identificationTimeout']);
		data = data['identificationTimeout'];
		expect(data).toEqual('0');
		});
		
		it('Should Set identificationTimeout to 1000 using direct calling method', function() {
		dpxInstance.identificationTimeout=1000;
		expect(dpxInstance.identificationTimeout).toEqual(1000);
		});
		
		it('Should Set identificationTimeout to 1000 using setProperty calling method', function() {
		dpxInstance.setProperty('identificationTimeout','1000');
		expect(dpxInstance.getProperty('identificationTimeout')).toEqual('1000');
		});
		
		it('Should Set identificationTimeout to 1000 using setProperties calling method', function() {
		dpxInstance.setProperties({'identificationTimeout' : 1000});
		var data = dpxInstance.getProperties(['identificationTimeout']);
		data = data['identificationTimeout'];
		expect(data).toEqual('1000');
		});
		
		it('Should Set identificationTimeout to 20000 using direct calling method', function() {
		dpxInstance.identificationTimeout=20000;
		expect(dpxInstance.identificationTimeout).toEqual(20000);
		});
		
		it('Should Set identificationTimeout to 20000 using setProperty calling method', function() {
		dpxInstance.setProperty('identificationTimeout','20000');
		expect(dpxInstance.getProperty('identificationTimeout')).toEqual('20000');
		});
		
		it('Should Set identificationTimeout to 20000 using setProperties calling method', function() {
		dpxInstance.setProperties({'identificationTimeout' : 20000});
		var data = dpxInstance.getProperties(['identificationTimeout']);
		data = data['identificationTimeout'];
		expect(data).toEqual('20000');
		});
});


describe('Setting inputSource', function() {

		it('Should Set inputSource to SOURCE_CAMERA using direct calling method', function() {
		dpxInstance.inputSource=dpxInstance.SOURCE_CAMERA;
		expect(dpxInstance.inputSource).toEqual(dpxInstance.SOURCE_CAMERA);
		});
		
		it('Should Set inputSource to camera using direct calling method', function() {
		dpxInstance.inputSource='camera';
		expect(dpxInstance.inputSource).toEqual('camera');
		});
		
		it('Should Set inputSource to camera using setProperty calling method', function() {
		dpxInstance.setProperty('inputSource','camera');
		expect(dpxInstance.getProperty('inputSource')).toEqual('camera');
		});
		
		it('Should Set inputSource to camera using setProperties calling method', function() {
		dpxInstance.setProperties({'inputSource' : 'camera'});
		var data = dpxInstance.getProperties(['inputSource']);
		data = data['inputSource'];
		expect(data).toEqual('camera');
		});
		
		it('Should Set inputSource to SOURCE_IMAGER using direct calling method', function() {
		dpxInstance.inputSource=dpxInstance.SOURCE_IMAGER;
		expect(dpxInstance.inputSource).toEqual(dpxInstance.SOURCE_IMAGER);
		});
		
		it('Should Set inputSource to imager using direct calling method', function() {
		dpxInstance.inputSource='imager';
		expect(dpxInstance.inputSource).toEqual('imager');
		});
		
		it('Should Set inputSource to imager using setProperty calling method', function() {
		dpxInstance.setProperty('inputSource','imager');
		expect(dpxInstance.getProperty('inputSource')).toEqual('imager');
		});
		
		it('Should Set inputSource to imager using setProperties calling method', function() {
		dpxInstance.setProperties({'inputSource' : 'imager'});
		var data = dpxInstance.getProperties(['inputSource']);
		data = data['inputSource'];
		expect(data).toEqual('imager');
		});
		
		it('Should Set inputSource to SOURCE_FILE using direct calling method', function() {
		dpxInstance.inputSource=dpxInstance.SOURCE_FILE;
		expect(dpxInstance.inputSource).toEqual(dpxInstance.SOURCE_FILE);
		});
		
		it('Should Set inputSource to file using direct calling method', function() {
		dpxInstance.inputSource='file';
		expect(dpxInstance.inputSource).toEqual('file');
		});
		
		it('Should Set inputSource to file using setProperty calling method', function() {
		dpxInstance.setProperty('inputSource','file');
		expect(dpxInstance.getProperty('inputSource')).toEqual('file');
		});
		
		it('Should Set inputSource to file using setProperties calling method', function() {
		dpxInstance.setProperties({'inputSource' : 'file'});
		var data = dpxInstance.getProperties(['inputSource']);
		data = data['inputSource'];
		expect(data).toEqual('file');
		});
});


describe('Setting inputSourceFilename', function() {

		it('Should Set inputSourceFilename to file://Application/image.jpg using direct calling method', function() {
		dpxInstance.inputSourceFilename='file://Application/image.jpg';
		expect(dpxInstance.inputSourceFilename).toEqual('file://Application/image.jpg');
		});
		
		it('Should Set inputSourceFilename to file://Application/image.jpg using setProperty calling method', function() {
		dpxInstance.setProperty('inputSourceFilename','file://Application/image.jpg');
		expect(dpxInstance.getProperty('inputSourceFilename')).toEqual('file://Application/image.jpg');
		});
		
		it('Should Set inputSourceFilename to file://Application/image.jpg using setProperties calling method', function() {
		dpxInstance.setProperties({'inputSourceFilename' : 'file://Application/image.jpg'});
		var data = dpxInstance.getProperties(['inputSourceFilename']);
		data = data['inputSourceFilename'];
		expect(data).toEqual('file://Application/image.jpg');
		});
});


describe('Setting logDirectory', function() {

		it('Should Set logDirectory to file://application/DPXLog using direct calling method', function() {
		dpxInstance.logDirectory='file://application/DPXLog';
		expect(dpxInstance.logDirectory).toEqual('file://application/DPXLog');
		});
		
		it('Should Set logDirectory to file://application/DPXLog using setProperty calling method', function() {
		dpxInstance.setProperty('logDirectory','file://application/DPXLog');
		expect(dpxInstance.getProperty('logDirectory')).toEqual('file://application/DPXLog');
		});
		
		it('Should Set logDirectory to file://application/DPXLog using setProperties calling method', function() {
		dpxInstance.setProperties({'logDirectory' : 'file://application/DPXLog'});
		var data = dpxInstance.getProperties(['logDirectory']);
		data = data['logDirectory'];
		expect(data).toEqual('file://application/DPXLog');
		});
});


describe('Setting manualResolution', function() {

		it('Should Set manualResolution to RESOLUTION_SMALL using direct calling method', function() {
		dpxInstance.manualResolution=dpxInstance.RESOLUTION_SMALL;
		expect(dpxInstance.manualResolution).toEqual(dpxInstance.RESOLUTION_SMALL);
		});
		
		it('Should Set manualResolution to 1280x960 using direct calling method', function() {
		dpxInstance.manualResolution='1280x960';
		expect(dpxInstance.manualResolution).toEqual('1280x960');
		});
		
		it('Should Set manualResolution to 1280x960 using setProperty calling method', function() {
		dpxInstance.setProperty('manualResolution','1280x960');
		expect(dpxInstance.getProperty('manualResolution')).toEqual('1280x960');
		});
		
		it('Should Set manualResolution to 1280x960 using setProperties calling method', function() {
		dpxInstance.setProperties({'manualResolution' : '1280x960'});
		var data = dpxInstance.getProperties(['manualResolution']);
		data = data['manualResolution'];
		expect(data).toEqual('1280x960');
		});
		
		it('Should Set manualResolution to RESOLUTION_MEDIUM using direct calling method', function() {
		dpxInstance.manualResolution=dpxInstance.RESOLUTION_MEDIUM;
		expect(dpxInstance.manualResolution).toEqual(dpxInstance.RESOLUTION_MEDIUM);
		});
		
		it('Should Set manualResolution to 1600x1200 using direct calling method', function() {
		dpxInstance.manualResolution='1600x1200';
		expect(dpxInstance.manualResolution).toEqual('1600x1200');
		});
		
		it('Should Set manualResolution to 1600x1200 using setProperty calling method', function() {
		dpxInstance.setProperty('manualResolution','1600x1200');
		expect(dpxInstance.getProperty('manualResolution')).toEqual('1600x1200');
		});
		
		it('Should Set manualResolution to 1600x1200 using setProperties calling method', function() {
		dpxInstance.setProperties({'manualResolution' : '1600x1200'});
		var data = dpxInstance.getProperties(['manualResolution']);
		data = data['manualResolution'];
		expect(data).toEqual('1600x1200');
		});
		
		it('Should Set manualResolution to RESOLUTION_LARGE using direct calling method', function() {
		dpxInstance.manualResolution=dpxInstance.RESOLUTION_LARGE;
		expect(dpxInstance.manualResolution).toEqual(dpxInstance.RESOLUTION_LARGE);
		});
		
		it('Should Set manualResolution to 2048x1536 using direct calling method', function() {
		dpxInstance.manualResolution='2048x1536';
		expect(dpxInstance.manualResolution).toEqual('2048x1536');
		});
		
		it('Should Set manualResolution to 2048x1536 using setProperty calling method', function() {
		dpxInstance.setProperty('manualResolution','2048x1536');
		expect(dpxInstance.getProperty('manualResolution')).toEqual('2048x1536');
		});
		
		it('Should Set manualResolution to 2048x1536 using setProperties calling method', function() {
		dpxInstance.setProperties({'manualResolution' : '2048x1536'});
		var data = dpxInstance.getProperties(['manualResolution']);
		data = data['manualResolution'];
		expect(data).toEqual('2048x1536');
		});
});


describe('Setting manualResolutionMode', function() {

		it('Should Set manualResolutionMode to true using direct calling method', function() {
		dpxInstance.manualResolutionMode=true;
		expect(dpxInstance.manualResolutionMode).toEqual(true);
		});
		
		it('Should Set manualResolutionMode to true using setProperty calling method', function() {
		dpxInstance.setProperty('manualResolutionMode','true');
		expect(dpxInstance.getProperty('manualResolutionMode')).toEqual('true');
		});
		
		it('Should Set manualResolutionMode to true using setProperties calling method', function() {
		dpxInstance.setProperties({'manualResolutionMode' : true});
		var data = dpxInstance.getProperties(['manualResolutionMode']);
		data = data['manualResolutionMode'];
		expect(data).toEqual('true');
		});
		
		it('Should Set manualResolutionMode to false using direct calling method', function() {
		dpxInstance.manualResolutionMode=false;
		expect(dpxInstance.manualResolutionMode).toEqual(false);
		});
		
		it('Should Set manualResolutionMode to false using setProperty calling method', function() {
		dpxInstance.setProperty('manualResolutionMode','false');
		expect(dpxInstance.getProperty('manualResolutionMode')).toEqual('false');
		});
		
		it('Should Set manualResolutionMode to false using setProperties calling method', function() {
		dpxInstance.setProperties({'manualResolutionMode' : false});
		var data = dpxInstance.getProperties(['manualResolutionMode']);
		data = data['manualResolutionMode'];
		expect(data).toEqual('false');
		});
});


describe('Setting ocrLanguage', function() {

		it('Should Set ocrLanguage to LANGUAGE_ENGLISH using direct calling method', function() {
		dpxInstance.ocrLanguage=dpxInstance.LANGUAGE_ENGLISH;
		expect(dpxInstance.ocrLanguage).toEqual(dpxInstance.LANGUAGE_ENGLISH);
		});
		
		it('Should Set ocrLanguage to english using direct calling method', function() {
		dpxInstance.ocrLanguage='english';
		expect(dpxInstance.ocrLanguage).toEqual('english');
		});
		
		it('Should Set ocrLanguage to english using setProperty calling method', function() {
		dpxInstance.setProperty('ocrLanguage','english');
		expect(dpxInstance.getProperty('ocrLanguage')).toEqual('english');
		});
		
		it('Should Set ocrLanguage to english using setProperties calling method', function() {
		dpxInstance.setProperties({'ocrLanguage' : 'english'});
		var data = dpxInstance.getProperties(['ocrLanguage']);
		data = data['ocrLanguage'];
		expect(data).toEqual('english');
		});
		
		it('Should Set ocrLanguage to LANGUAGE_EUROPEAN using direct calling method', function() {
		dpxInstance.ocrLanguage=dpxInstance.LANGUAGE_EUROPEAN;
		expect(dpxInstance.ocrLanguage).toEqual(dpxInstance.LANGUAGE_EUROPEAN);
		});
		
		it('Should Set ocrLanguage to european using direct calling method', function() {
		dpxInstance.ocrLanguage='european';
		expect(dpxInstance.ocrLanguage).toEqual('european');
		});
		
		it('Should Set ocrLanguage to european using setProperty calling method', function() {
		dpxInstance.setProperty('ocrLanguage','european');
		expect(dpxInstance.getProperty('ocrLanguage')).toEqual('european');
		});
		
		it('Should Set ocrLanguage to european using setProperties calling method', function() {
		dpxInstance.setProperties({'ocrLanguage' : 'european'});
		var data = dpxInstance.getProperties(['ocrLanguage']);
		data = data['ocrLanguage'];
		expect(data).toEqual('european');
		});
});


describe('Setting processingTimeout', function() {

		it('Should Set processingTimeout to 20000 using direct calling method', function() {
		dpxInstance.processingTimeout=20000;
		expect(dpxInstance.processingTimeout).toEqual(20000);
		});
		
		it('Should Set processingTimeout to 20000 using setProperty calling method', function() {
		dpxInstance.setProperty('processingTimeout','20000');
		expect(dpxInstance.getProperty('processingTimeout')).toEqual('20000');
		});
		
		it('Should Set processingTimeout to 20000 using setProperties calling method', function() {
		dpxInstance.setProperties({'processingTimeout' : 20000});
		var data = dpxInstance.getProperties(['processingTimeout']);
		data = data['processingTimeout'];
		expect(data).toEqual('20000');
		});
		
		it('Should Set processingTimeout to 30000 using direct calling method', function() {
		dpxInstance.processingTimeout=30000;
		expect(dpxInstance.processingTimeout).toEqual(30000);
		});
		
		it('Should Set processingTimeout to 30000 using setProperty calling method', function() {
		dpxInstance.setProperty('processingTimeout','30000');
		expect(dpxInstance.getProperty('processingTimeout')).toEqual('30000');
		});
		
		it('Should Set processingTimeout to 30000 using setProperties calling method', function() {
		dpxInstance.setProperties({'processingTimeout' : 30000});
		var data = dpxInstance.getProperties(['processingTimeout']);
		data = data['processingTimeout'];
		expect(data).toEqual('30000');
		});
});


describe('Getting version', function() {
		it('Should return version value as a string', function() {
		expect(dpxInstance.version).isNotEmptyString();
		});
});


describe('Setting userMode', function() {

		it('Should Set userMode to USER_MODE_PREVIEW using direct calling method', function() {
		dpxInstance.userMode=dpxInstance.USER_MODE_PREVIEW;
		expect(dpxInstance.userMode).toEqual(dpxInstance.USER_MODE_PREVIEW);
		});
		
		it('Should Set userMode to preview using direct calling method', function() {
		dpxInstance.userMode='preview';
		expect(dpxInstance.userMode).toEqual('preview');
		});
		
		it('Should Set userMode to preview using setProperty calling method', function() {
		dpxInstance.setProperty('userMode','preview');
		expect(dpxInstance.getProperty('userMode')).toEqual('preview');
		});
		
		it('Should Set userMode to preview using setProperties calling method', function() {
		dpxInstance.setProperties({'userMode' : 'preview'});
		var data = dpxInstance.getProperties(['userMode']);
		data = data['userMode'];
		expect(data).toEqual('preview');
		});
		
		it('Should Set userMode to USER_MODE_SNAPSHOT using direct calling method', function() {
		dpxInstance.userMode=dpxInstance.USER_MODE_SNAPSHOT;
		expect(dpxInstance.userMode).toEqual(dpxInstance.USER_MODE_SNAPSHOT);
		});
		
		it('Should Set userMode to snapshot using direct calling method', function() {
		dpxInstance.userMode='snapshot';
		expect(dpxInstance.userMode).toEqual('snapshot');
		});
		
		it('Should Set userMode to snapshot using setProperty calling method', function() {
		dpxInstance.setProperty('userMode','snapshot');
		expect(dpxInstance.getProperty('userMode')).toEqual('snapshot');
		});
		
		it('Should Set userMode to snapshot using setProperties calling method', function() {
		dpxInstance.setProperties({'userMode' : 'snapshot'});
		var data = dpxInstance.getProperties(['userMode']);
		data = data['userMode'];
		expect(data).toEqual('snapshot');
		});
});


describe('Setting uiResultConfirmation', function() {
		it('Should Set uiResultConfirmation to true using direct calling method', function() {
		dpxInstance.uiResultConfirmation=true;
		expect(dpxInstance.uiResultConfirmation).toEqual(true);
		});
		
		it('Should Set uiResultConfirmation to true using setProperty calling method', function() {
		dpxInstance.setProperty('uiResultConfirmation','true');
		expect(dpxInstance.getProperty('uiResultConfirmation')).toEqual('true');
		});
		
		it('Should Set uiResultConfirmation to true using setProperties calling method', function() {
		dpxInstance.setProperties({'uiResultConfirmation' : true});
		var data = dpxInstance.getProperties(['uiResultConfirmation']);
		data = data['uiResultConfirmation'];
		expect(data).toEqual('true');
		});
		
		it('Should Set uiResultConfirmation to false using direct calling method', function() {
		dpxInstance.uiResultConfirmation=false;
		expect(dpxInstance.uiResultConfirmation).toEqual(false);
		});
		
		it('Should Set uiResultConfirmation to false using setProperty calling method', function() {
		dpxInstance.setProperty('uiResultConfirmation','false');
		expect(dpxInstance.getProperty('uiResultConfirmation')).toEqual('false');
		});
		
		it('Should Set uiResultConfirmation to false using setProperties calling method', function() {
		dpxInstance.setProperties({'uiResultConfirmation' : false});
		var data = dpxInstance.getProperties(['uiResultConfirmation']);
		data = data['uiResultConfirmation'];
		expect(data).toEqual('false');
		});
});


describe('Setting zoomAmount', function() {
			it('Should Set zoomAmount to 0 using direct calling method', function() {
			dpxInstance.zoomAmount=0;
			expect(dpxInstance.zoomAmount).toEqual(0);
			});
			
			it('Should Set zoomAmount to 0 using setProperty calling method', function() {
			dpxInstance.setProperty('zoomAmount','0');
			expect(dpxInstance.getProperty('zoomAmount')).toEqual('0');
			});
			
			it('Should Set zoomAmount to 0 using setProperties calling method', function() {
			dpxInstance.setProperties({'zoomAmount' : 0});
			var data = dpxInstance.getProperties(['zoomAmount']);
			data = data['zoomAmount'];
			expect(data).toEqual('0');
			});
			
			it('Should Set zoomAmount to 50 using direct calling method', function() {
			dpxInstance.zoomAmount=50;
			expect(dpxInstance.zoomAmount).toEqual(50);
			});
			
			it('Should Set zoomAmount to 50 using setProperty calling method', function() {
			dpxInstance.setProperty('zoomAmount','50');
			expect(dpxInstance.getProperty('zoomAmount')).toEqual('50');
			});
			
			it('Should Set zoomAmount to 50 using setProperties calling method', function() {
			dpxInstance.setProperties({'zoomAmount' : 50});
			var data = dpxInstance.getProperties(['zoomAmount']);
			data = data['zoomAmount'];
			expect(data).toEqual('50');
			});
			
			it('Should Set zoomAmount to 100 using direct calling method', function() {
			dpxInstance.zoomAmount=100;
			expect(dpxInstance.zoomAmount).toEqual(100);
			});
			
			it('Should Set zoomAmount to 100 using setProperty calling method', function() {
			dpxInstance.setProperty('zoomAmount','100');
			expect(dpxInstance.getProperty('zoomAmount')).toEqual('100');
			});
			
			it('Should Set zoomAmount to 100 using setProperties calling method', function() {
			dpxInstance.setProperties({'zoomAmount' : 100});
			var data = dpxInstance.getProperties(['zoomAmount']);
			data = data['zoomAmount'];
			expect(data).toEqual('100');
			});
	    });

	});
});


/*describe("DPX feature definition tests", function () {

    it("Should capture document from file system", function () {
        var processedForm;
        var dpxInstance = Rho.DPX.init();
        dpxInstance.inputSource = Rho.DPX.FILE; // or dpxInstance.setFileSource(); dpxInstance.setFileSource(fileName);
        dpxInstance.inputSourceFilename = 'image.jpg';
        dpxInstance.template = Rho.RhoFile.join(Rho.Application.AppBundleFolder, 'template.xml');

        dpxInstance.captureDocument(function(dpxEvent){
            if (dpxEvent == Rho.DPX.FORM_DECODED) {
                processedForm = dpxEvent.processedForm;
            }
        });

        waitsFor(function(){
            return processedForm !== undefined;
        }, 5000);

        runs(function(){
            //TODO: Need add additional expect
            expect(processedForm.template).toEqual(dpxInstance.template);
        });

        //TODO: Is it valid place for call release method in async tests?
        dpxInstance.close();
    });


    it("Should capture document from camera", function () {
        var processedForm;
        var dpxInstance = Rho.DPX.init();
        dpxInstance.inputSource = Rho.DPX.CAMERA;
        dpxInstance.template = Rho.RhoFile.join(Rho.Application.AppBundleFolder, 'template.xml');

        dpxInstance.captureDocument(function(dpxEvent){
            if (dpxEvent == Rho.DPX.FORM_DECODED) {
                processedForm = dpxEvent.processedForm;
            }
        });

        waitsFor(function(){
            return processedForm !== undefined;
        }, 5000);

        runs(function(){
            //TODO: Need add additional expect
            expect(processedForm.template).toEqual(dpxInstance.template);
        });

        //TODO: Is it valid place for call release method in async tests?
        dpxInstance.close();
    });

    it("Starting two dpx engine and capture document from file system", function () {

    });


    it("Should capture two document from two files simultaneously", function () {
        var processedFormA;
        var processedFormB;
        var dpxInstanceA = Rho.DPX.init();
        var dpxInstanceB = Rho.DPX.init();
        dpxInstanceA.inputSource = Rho.DPX.FILE; // or dpxInstance.setFileSource(); dpxInstance.setFileSource(fileName);
        dpxInstanceA.inputSourceFilename = 'image.jpg';
        dpxInstanceA.template = Rho.RhoFile.join(Rho.Application.AppBundleFolder, 'template.xml');

        dpxInstanceB.inputSource = Rho.DPX.FILE; // or dpxInstance.setFileSource(); dpxInstance.setFileSource(fileName);
        dpxInstanceB.inputSourceFilename = 'anotherImage.jpg';
        dpxInstanceB.template = Rho.RhoFile.join(Rho.Application.AppBundleFolder, 'template.xml');

        dpxInstanceA.captureDocument(function(dpxEvent){
            if (dpxEvent == Rho.DPX.FORM_DECODED) {
                processedFormA = dpxEvent.processedForm;
            }
        });

        dpxInstanceB.captureDocument(function(dpxEvent){
            if (dpxEvent == Rho.DPX.FORM_DECODED) {
                processedFormB = dpxEvent.processedForm;
            }
        });


        waitsFor(function(){
            return (processedFormA !== undefined) && (processedFormB !== undefined);
        }, 5000);

        runs(function(){
            //TODO: Need add additional expect
            expect(processedFormA.template).toEqual(dpxInstanceA.template);
            // ...
            expect(processedFormB.template).toEqual(dpxInstanceA.template);
        });

        //TODO: Is it valid place for call release method in async tests?
        dpxInstanceA.close();
        dpxInstanceB.close();

    });

})*/




/*
describe("DPX", function () {
    beforeEach(function () {

    });

    afterEach(function () {

    });

    describe("testing boolean properties with valid input", function () {

        beforeEach(function () {});
        afterEach(function () {});

        it("able to configure the audioFeedback parameter", function() {
            runs(function(){
                //  todo : Set the audioFeedback parameter to true and false, the retrieved parameter
                //  should match the value just set.
                expect(true);
            });
        });

        it("able to configure the hapticFeedback parameter", function() {
            runs(function(){
                //  todo : Set the hapticFeedback parameter to true and false, the retrieved parameter
                //  should match the value just set.
                expect(true);
            });
        });

        it("able to configure the ledFeedback parameter", function() {
            runs(function(){
                //  todo : Set the ledFeedback parameter to true and false, the retrieved parameter
                //  should match the value just set.
                expect(true);
            });
        });

        it("able to configure the flash parameter", function() {
            runs(function(){
                //  todo : Set the flash parameter to true and false, the retrieved parameter
                //  should match the value just set.
                expect(true);
            });
        });

    });


    describe("testing string properties with valid input", function () {

        beforeEach(function () {});
        afterEach(function () {});

        it("able to configure the template parameter", function() {
            runs(function(){
                //  todo : Set the template parameter to a valid value (pointing to an xml), the retrieved parameter
                //  should match the value just set.  Repeat this with very long and very short valid values
                expect(true);
            });
        });

        it("able to configure the inputSourceFileUri parameter", function() {
            runs(function(){
                //  todo : Set the inputSourceFileUri parameter to a valid value (pointing to an image file), the retrieved parameter
                //  should match the value just set.  Repeat this with very long and very short valid values
                expect(true);
            });
        });

        it("able to configure the inputSource parameter", function() {
            runs(function(){
                //  todo : Set the inputSource parameter to a valid value (camera, file), the retrieved parameter
                //  should match the value just set.
                expect(true);
            });
        });

        it("able to configure the returnedPictureFormat parameter", function() {
            runs(function(){
                //  todo : Set the returnedPictureFormat parameter to a valid value (png, jpg, bmp), the retrieved parameter
                //  should match the value just set.
                expect(true);
            });
        });

    });

    describe("testing string properties with invalid input", function () {

        beforeEach(function () {});
        afterEach(function () {});

        it("unable to configure the template parameter with invalid input", function() {
            runs(function(){
                //  todo : Set the template parameter to an invalid value (not pointing to an xml or a malformed path), the retrieved parameter
                //  should not match the value just set.
                expect(true);
            });
        });

        it("unable to configure the inputSourceFileUri parameter with invalid input", function() {
            runs(function(){
                //  todo : Set the inputSourceFileUri parameter to an invalid value (not pointing to an image file), the retrieved parameter
                //  should not match the value just set.
                expect(true);
            });
        });

        it("unable to configure the inputSource parameter with invalid input", function() {
            runs(function(){
                //  todo : Set the inputSource parameter to a valid value (NOT camera or file), the retrieved parameter
                //  should match the value just set.
                expect(true);
            });
        });

        it("unable to configure the returnedPictureFormat parameter with invalid input", function() {
            runs(function(){
                //  todo : Set the returnedPictureFormat parameter to a valid value (NOT one of: png, jpg, bmp), the retrieved parameter
                //  should match the value just set.
                expect(true);
            });
        });

    });

    describe("testing integer properties with valid input", function () {

        beforeEach(function () {});
        afterEach(function () {});

        it("able to configure the identificationTimeout parameter", function() {
            runs(function(){
                //  todo : Set the identificationTimeout parameter to a valid value (positive integer including a huge value and 0), the retrieved parameter
                //  should match the value just set.  Repeat this with a number of valid values
                expect(true);
            });
        });

        it("able to configure the processingTimeout parameter", function() {
            runs(function(){
                //  todo : Set the processingTimeout parameter to a valid value (positive integer including a huge value and 0), the retrieved parameter
                //  should match the value just set.  Repeat this with a number of valid values
                expect(true);
            });
        });

    });

    describe("testing integer properties with invalid input", function () {

        beforeEach(function () {});
        afterEach(function () {});

        it("unable to configure the identificationTimeout parameter to an invalid value", function() {
            runs(function(){
                //  todo : Set the identificationTimeout parameter to an invalid value (negative integer), the retrieved parameter
                //  should match the value just set.  Repeat this with a number of valid values
                expect(true);
            });
        });

        it("unable to configure the processingTimeout parameter to an invalid value", function() {
            runs(function(){
                //  todo : Set the processingTimeout parameter to an invalid value (negative integer), the retrieved parameter
                //  should match the value just set.  Repeat this with a number of valid values
                expect(true);
            });
        });

    });


    describe("testing read only properties", function () {

        beforeEach(function () {});
        afterEach(function () {});

        it("unable to configure the version parameter", function() {
            runs(function(){
                //  todo : Set the version parameter to any String.  The version should not be changed and should return
                //  a valid version string (not blank)
                expect(true);
            });
        });

    });


    describe("capturing a document", function () {

        beforeEach(function () {});
        afterEach(function () {});

        //  todo : For each provided sample image and associated sample template capture and process that document.
        //         The returned regions will obviously be different for each document but should match the values
        //         (OCR / barcodes / OMR etc.) specified in the templates.  All returned values in the callback
        //         should be checked to ensure they are correct.  The callback will be called asynchronously so this
        //         test should take account of that.
        //         Whilst testing, ensure all values of 'returnedPictureFormat' are tested and verified.

        it("able to capture and process a document from a provided image", function() {
            runs(function(){
                //  todo : Each sample image / template should be tested within an it(), i.e. put this in a loop.
                expect(true);
            });
        });

    });

    describe("capturing a document is fault tolerant", function () {

        beforeEach(function () {});
        afterEach(function () {});

        it("will return a sensible error if an invalid template is provided", function() {
            runs(function(){
                //  todo : try and capture one of the sample images providing an invalid template (not an XML or corrupt xml).
                //         A callback with an error should be returned.  That error should make sense to the user.
                expect(true);
            });
        });

        it("will return a sensible error if an invalid image is provided", function() {
            runs(function(){
                //  todo : try and capture one of the sample images providing an invalid image (e.g. image not found).
                //         A callback with an error should be returned.  That error should make sense to the user.
                expect(true);
            });
        });

        it("will re-use the previously specified fileURI if not specified for a file capture", function() {
            runs(function(){
                //  todo : try and perform a capture from a file but do not specify the fileURI in the captureDocument propertyMap.
                //         Specify the fileURI previously through setProperty.  The document should be successfully captured.
                expect(true);
            });
        });

        it("will timeout if a non-matching template provided", function() {
            runs(function(){
                //  todo : try and capture one of the sample images providing a template not associated with that image.
                //         A callback with a timeout should be returned.
                expect(true);
            });
        });

        it("will timeout if the document cannot be processed quickly enough", function() {
            runs(function(){
                //  todo : try and capture one of the sample images providing the correct template but set the processing time
                //         too low to allow the processing to complete.
                //         A callback with a timeout should be returned.
                expect(true);
            });
        });

        it("will timeout if the user does not interact with the camera", function() {
            runs(function(){
                //  todo : try and capture with the camera.  Because this is an unmanned automated test there will be no interaction
                //         with the camera.  A callback with a timeout should be returned.
                expect(true);
            });
        });

    });

});
*/



/* describe("DPX feature definition tests", function () {

    it("Should capture document from file system", function () {
        var processedForm;
        var dpxInstance = Rho.DPX.init();
        dpxInstance.inputSource = Rho.DPX.FILE; // or dpxInstance.setFileSource(); dpxInstance.setFileSource(fileName);
        dpxInstance.inputSourceFilename = 'image.jpg';
        dpxInstance.template = Rho.RhoFile.join(Rho.Application.AppBundleFolder, 'template.xml');

        dpxInstance.captureDocument(function(dpxEvent){
            if (dpxEvent == Rho.DPX.FORM_DECODED) {
                processedForm = dpxEvent.processedForm;
            }
        });

        waitsFor(function(){
            return processedForm !== undefined;
        }, 5000);

        runs(function(){
            //TODO: Need add additional expect
            expect(processedForm.template).toEqual(dpxInstance.template);
        });

        //TODO: Is it valid place for call release method in async tests?
        dpxInstance.close();
    });


    it("Should capture document from camera", function () {
        var processedForm;
        var dpxInstance = Rho.DPX.init();
        dpxInstance.inputSource = Rho.DPX.CAMERA;
        dpxInstance.template = Rho.RhoFile.join(Rho.Application.AppBundleFolder, 'template.xml');

        dpxInstance.captureDocument(function(dpxEvent){
            if (dpxEvent == Rho.DPX.FORM_DECODED) {
                processedForm = dpxEvent.processedForm;
            }
        });

        waitsFor(function(){
            return processedForm !== undefined;
        }, 5000);

        runs(function(){
            //TODO: Need add additional expect
            expect(processedForm.template).toEqual(dpxInstance.template);
        });

        //TODO: Is it valid place for call release method in async tests?
        dpxInstance.close();
    });

    it("Starting two dpx engine and capture document from file system", function () {

    });


    it("Should capture two document from two files simultaneously", function () {
        var processedFormA;
        var processedFormB;
        var dpxInstanceA = Rho.DPX.init();
        var dpxInstanceB = Rho.DPX.init();
        dpxInstanceA.inputSource = Rho.DPX.FILE; // or dpxInstance.setFileSource(); dpxInstance.setFileSource(fileName);
        dpxInstanceA.inputSourceFilename = 'image.jpg';
        dpxInstanceA.template = Rho.RhoFile.join(Rho.Application.AppBundleFolder, 'template.xml');

        dpxInstanceB.inputSource = Rho.DPX.FILE; // or dpxInstance.setFileSource(); dpxInstance.setFileSource(fileName);
        dpxInstanceB.inputSourceFilename = 'anotherImage.jpg';
        dpxInstanceB.template = Rho.RhoFile.join(Rho.Application.AppBundleFolder, 'template.xml');

        dpxInstanceA.captureDocument(function(dpxEvent){
            if (dpxEvent == Rho.DPX.FORM_DECODED) {
                processedFormA = dpxEvent.processedForm;
            }
        });

        dpxInstanceB.captureDocument(function(dpxEvent){
            if (dpxEvent == Rho.DPX.FORM_DECODED) {
                processedFormB = dpxEvent.processedForm;
            }
        });


        waitsFor(function(){
            return (processedFormA !== undefined) && (processedFormB !== undefined);
        }, 5000);

        runs(function(){
            //TODO: Need add additional expect
            expect(processedFormA.template).toEqual(dpxInstanceA.template);
            // ...
            expect(processedFormB.template).toEqual(dpxInstanceA.template);
        });

        //TODO: Is it valid place for call release method in async tests?
        dpxInstanceA.close();
        dpxInstanceB.close();

    });

}) */




/*
describe("DPX", function () {
    beforeEach(function () {

    });

    afterEach(function () {

    });

    describe("testing boolean properties with valid input", function () {

        beforeEach(function () {});
        afterEach(function () {});

        it("able to configure the audioFeedback parameter", function() {
            runs(function(){
                //  todo : Set the audioFeedback parameter to true and false, the retrieved parameter
                //  should match the value just set.
                expect(true);
            });
        });

        it("able to configure the hapticFeedback parameter", function() {
            runs(function(){
                //  todo : Set the hapticFeedback parameter to true and false, the retrieved parameter
                //  should match the value just set.
                expect(true);
            });
        });

        it("able to configure the ledFeedback parameter", function() {
            runs(function(){
                //  todo : Set the ledFeedback parameter to true and false, the retrieved parameter
                //  should match the value just set.
                expect(true);
            });
        });

        it("able to configure the flash parameter", function() {
            runs(function(){
                //  todo : Set the flash parameter to true and false, the retrieved parameter
                //  should match the value just set.
                expect(true);
            });
        });

    });


    describe("testing string properties with valid input", function () {

        beforeEach(function () {});
        afterEach(function () {});

        it("able to configure the template parameter", function() {
            runs(function(){
                //  todo : Set the template parameter to a valid value (pointing to an xml), the retrieved parameter
                //  should match the value just set.  Repeat this with very long and very short valid values
                expect(true);
            });
        });

        it("able to configure the inputSourceFileUri parameter", function() {
            runs(function(){
                //  todo : Set the inputSourceFileUri parameter to a valid value (pointing to an image file), the retrieved parameter
                //  should match the value just set.  Repeat this with very long and very short valid values
                expect(true);
            });
        });

        it("able to configure the inputSource parameter", function() {
            runs(function(){
                //  todo : Set the inputSource parameter to a valid value (camera, file), the retrieved parameter
                //  should match the value just set.
                expect(true);
            });
        });

        it("able to configure the returnedPictureFormat parameter", function() {
            runs(function(){
                //  todo : Set the returnedPictureFormat parameter to a valid value (png, jpg, bmp), the retrieved parameter
                //  should match the value just set.
                expect(true);
            });
        });

    });

    describe("testing string properties with invalid input", function () {

        beforeEach(function () {});
        afterEach(function () {});

        it("unable to configure the template parameter with invalid input", function() {
            runs(function(){
                //  todo : Set the template parameter to an invalid value (not pointing to an xml or a malformed path), the retrieved parameter
                //  should not match the value just set.
                expect(true);
            });
        });

        it("unable to configure the inputSourceFileUri parameter with invalid input", function() {
            runs(function(){
                //  todo : Set the inputSourceFileUri parameter to an invalid value (not pointing to an image file), the retrieved parameter
                //  should not match the value just set.
                expect(true);
            });
        });

        it("unable to configure the inputSource parameter with invalid input", function() {
            runs(function(){
                //  todo : Set the inputSource parameter to a valid value (NOT camera or file), the retrieved parameter
                //  should match the value just set.
                expect(true);
            });
        });

        it("unable to configure the returnedPictureFormat parameter with invalid input", function() {
            runs(function(){
                //  todo : Set the returnedPictureFormat parameter to a valid value (NOT one of: png, jpg, bmp), the retrieved parameter
                //  should match the value just set.
                expect(true);
            });
        });

    });

    describe("testing integer properties with valid input", function () {

        beforeEach(function () {});
        afterEach(function () {});

        it("able to configure the identificationTimeout parameter", function() {
            runs(function(){
                //  todo : Set the identificationTimeout parameter to a valid value (positive integer including a huge value and 0), the retrieved parameter
                //  should match the value just set.  Repeat this with a number of valid values
                expect(true);
            });
        });

        it("able to configure the processingTimeout parameter", function() {
            runs(function(){
                //  todo : Set the processingTimeout parameter to a valid value (positive integer including a huge value and 0), the retrieved parameter
                //  should match the value just set.  Repeat this with a number of valid values
                expect(true);
            });
        });

    });

    describe("testing integer properties with invalid input", function () {

        beforeEach(function () {});
        afterEach(function () {});

        it("unable to configure the identificationTimeout parameter to an invalid value", function() {
            runs(function(){
                //  todo : Set the identificationTimeout parameter to an invalid value (negative integer), the retrieved parameter
                //  should match the value just set.  Repeat this with a number of valid values
                expect(true);
            });
        });

        it("unable to configure the processingTimeout parameter to an invalid value", function() {
            runs(function(){
                //  todo : Set the processingTimeout parameter to an invalid value (negative integer), the retrieved parameter
                //  should match the value just set.  Repeat this with a number of valid values
                expect(true);
            });
        });

    });


    describe("testing read only properties", function () {

        beforeEach(function () {});
        afterEach(function () {});

        it("unable to configure the version parameter", function() {
            runs(function(){
                //  todo : Set the version parameter to any String.  The version should not be changed and should return
                //  a valid version string (not blank)
                expect(true);
            });
        });

    });


    describe("capturing a document", function () {

        beforeEach(function () {});
        afterEach(function () {});

        //  todo : For each provided sample image and associated sample template capture and process that document.
        //         The returned regions will obviously be different for each document but should match the values
        //         (OCR / barcodes / OMR etc.) specified in the templates.  All returned values in the callback
        //         should be checked to ensure they are correct.  The callback will be called asynchronously so this
        //         test should take account of that.
        //         Whilst testing, ensure all values of 'returnedPictureFormat' are tested and verified.

        it("able to capture and process a document from a provided image", function() {
            runs(function(){
                //  todo : Each sample image / template should be tested within an it(), i.e. put this in a loop.
                expect(true);
            });
        });

    });

    describe("capturing a document is fault tolerant", function () {

        beforeEach(function () {});
        afterEach(function () {});

        it("will return a sensible error if an invalid template is provided", function() {
            runs(function(){
                //  todo : try and capture one of the sample images providing an invalid template (not an XML or corrupt xml).
                //         A callback with an error should be returned.  That error should make sense to the user.
                expect(true);
            });
        });

        it("will return a sensible error if an invalid image is provided", function() {
            runs(function(){
                //  todo : try and capture one of the sample images providing an invalid image (e.g. image not found).
                //         A callback with an error should be returned.  That error should make sense to the user.
                expect(true);
            });
        });

        it("will re-use the previously specified fileURI if not specified for a file capture", function() {
            runs(function(){
                //  todo : try and perform a capture from a file but do not specify the fileURI in the captureDocument propertyMap.
                //         Specify the fileURI previously through setProperty.  The document should be successfully captured.
                expect(true);
            });
        });

        it("will timeout if a non-matching template provided", function() {
            runs(function(){
                //  todo : try and capture one of the sample images providing a template not associated with that image.
                //         A callback with a timeout should be returned.
                expect(true);
            });
        });

        it("will timeout if the document cannot be processed quickly enough", function() {
            runs(function(){
                //  todo : try and capture one of the sample images providing the correct template but set the processing time
                //         too low to allow the processing to complete.
                //         A callback with a timeout should be returned.
                expect(true);
            });
        });

        it("will timeout if the user does not interact with the camera", function() {
            runs(function(){
                //  todo : try and capture with the camera.  Because this is an unmanned automated test there will be no interaction
                //         with the camera.  A callback with a timeout should be returned.
                expect(true);
            });
        });

    });

});
*/
