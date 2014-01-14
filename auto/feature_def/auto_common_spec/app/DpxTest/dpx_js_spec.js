describe('Rho.DPX APIs Set Test', function() {
var dpxInstance = new Rho.DPX();

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
		expect(dpxInstance.flashMode).toEqual(Rho.DPX.FLASH_OFF);
		});

		it('Should get identificationTimeout default value', function() {
		expect(dpxInstance.identificationTimeout).toEqual(1500);
		});

		it('Should get inputSource default value', function() {
		expect(dpxInstance.inputSource).toEqual(Rho.DPX.SOURCE_CAMERA);
		});

		it('Should get logDirectory default value', function() {
		expect(dpxInstance.logDirectory).toEqual('/sdcard/DPXLog');
		});

		it('Should get manualResolution default value', function() {
		expect(dpxInstance.manualResolution).toEqual(Rho.DPX.RESOLUTION_MEDIUM);
		});

		it('Should get manualResolutionMode default value', function() {
		expect(dpxInstance.manualResolutionMode).toEqual(false);
		});

		it('Should get ocrLanguage default value', function() {
		expect(dpxInstance.ocrLanguage).toEqual(Rho.DPX.LANGUAGE_ENGLISH);
		});

		it('Should get processingTimeout default value', function() {
		expect(dpxInstance.processingTimeout).toEqual(10000);
		});

		it('Should get userMode default value', function() {
		expect(dpxInstance.userMode).toEqual(Rho.DPX.USER_MODE_SNAPSHOT);
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
		dpxInstance.flashMode=Rho.DPX.FLASH_OFF;
		expect(dpxInstance.flashMode).toEqual(Rho.DPX.FLASH_OFF);
		});
		
		it('Should Set flashMode to off using setProperty calling method', function() {
		dpxInstance.setProperty('flashMode',Rho.DPX.FLASH_OFF);
		expect(dpxInstance.getProperty('flashMode')).toEqual(Rho.DPX.FLASH_OFF);
		});
		
		it('Should Set flashMode to off using setProperties calling method', function() {
		dpxInstance.setProperties({'flashMode' : Rho.DPX.FLASH_OFF});
		var data = dpxInstance.getProperties(['flashMode']);
		data = data['flashMode'];
		expect(data).toEqual(Rho.DPX.FLASH_OFF);
		});
		
		it('Should Set flashMode to FLASH_AUTO using direct calling method', function() {
		dpxInstance.flashMode=Rho.DPX.FLASH_AUTO;
		expect(dpxInstance.flashMode).toEqual(Rho.DPX.FLASH_AUTO);
		});
		
    	it('Should Set flashMode to auto using setProperty calling method', function() {
		dpxInstance.setProperty('flashMode',Rho.DPX.FLASH_AUTO);
		expect(dpxInstance.getProperty('flashMode')).toEqual('FLASH_AUTO');
		});
		
		it('Should Set flashMode to auto using setProperties calling method', function() {
		dpxInstance.setProperties({'flashMode' : Rho.DPX.FLASH_AUTO});
		var data = dpxInstance.getProperties(['flashMode']);
		data = data['flashMode'];
		expect(data).toEqual(Rho.DPX.FLASH_AUTO);
		});
		
		it('Should Set flashMode to FLASH_ON using direct calling method', function() {
		dpxInstance.flashMode=Rho.DPX.FLASH_ON;
		expect(dpxInstance.flashMode).toEqual(Rho.DPX.FLASH_ON);
		});		

		it('Should Set flashMode to on using setProperty calling method', function() {
		dpxInstance.setProperty('flashMode',Rho.DPX.FLASH_ON);
		expect(dpxInstance.getProperty('flashMode')).toEqual(Rho.DPX.FLASH_ON);
		});
		
		it('Should Set flashMode to on using setProperties calling method', function() {
		dpxInstance.setProperties({'flashMode' : Rho.DPX.FLASH_ON});
		var data = dpxInstance.getProperties(['flashMode']);
		data = data['flashMode'];
		expect(data).toEqual(Rho.DPX.FLASH_ON);
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
		dpxInstance.inputSource=Rho.DPX.SOURCE_CAMERA;
		expect(dpxInstance.inputSource).toEqual(Rho.DPX.SOURCE_CAMERA);
		});
	
		it('Should Set inputSource to camera using setProperty calling method', function() {
		dpxInstance.setProperty('inputSource', Rho.DPX.SOURCE_CAMERA);
		expect(dpxInstance.getProperty('inputSource')).toEqual(Rho.DPX.SOURCE_CAMERA);
		});
		
		it('Should Set inputSource to camera using setProperties calling method', function() {
		dpxInstance.setProperties({'inputSource' : Rho.DPX.SOURCE_CAMERA});
		var data = dpxInstance.getProperties(['inputSource']);
		data = data['inputSource'];
		expect(data).toEqual(Rho.DPX.SOURCE_CAMERA);
		});
		
		it('Should Set inputSource to SOURCE_IMAGER using direct calling method', function() {
		dpxInstance.inputSource=Rho.DPX.SOURCE_IMAGER;
		expect(dpxInstance.inputSource).toEqual(Rho.DPX.SOURCE_IMAGER);
		});
		
		it('Should Set inputSource to imager using setProperty calling method', function() {
		dpxInstance.setProperty('inputSource',Rho.DPX.SOURCE_IMAGER);
		expect(dpxInstance.getProperty('inputSource')).toEqual(Rho.DPX.SOURCE_IMAGER);
		});
		
		it('Should Set inputSource to imager using setProperties calling method', function() {
		dpxInstance.setProperties({'inputSource' : Rho.DPX.SOURCE_IMAGER});
		var data = dpxInstance.getProperties(['inputSource']);
		data = data['inputSource'];
		expect(data).toEqual(Rho.DPX.SOURCE_IMAGER);
		});
		
		it('Should Set inputSource to SOURCE_FILE using direct calling method', function() {
		dpxInstance.inputSource=Rho.DPX.SOURCE_FILE;
		expect(dpxInstance.inputSource).toEqual(Rho.DPX.SOURCE_FILE);
		});
		
		it('Should Set inputSource to file using setProperty calling method', function() {
		dpxInstance.setProperty('inputSource',Rho.DPX.SOURCE_FILE);
		expect(dpxInstance.getProperty('inputSource')).toEqual(Rho.DPX.SOURCE_FILE);
		});
		
		it('Should Set inputSource to file using setProperties calling method', function() {
		dpxInstance.setProperties({'inputSource' : Rho.DPX.SOURCE_FILE});
		var data = dpxInstance.getProperties(['inputSource']);
		data = data['inputSource'];
		expect(data).toEqual(Rho.DPX.SOURCE_FILE);
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
		dpxInstance.manualResolution=Rho.DPX.RESOLUTION_SMALL;
		expect(dpxInstance.manualResolution).toEqual(Rho.DPX.RESOLUTION_SMALL);
		});
		
		it('Should Set manualResolution to 1280x960 small using setProperty calling method', function() {
		dpxInstance.setProperty('manualResolution',Rho.DPX.RESOLUTION_SMALL);
		expect(dpxInstance.getProperty('manualResolution')).toEqual(Rho.DPX.RESOLUTION_SMALL);
		});
		
		it('Should Set manualResolution to 1280x960 using setProperties calling method', function() {
		dpxInstance.setProperties({'manualResolution' : Rho.DPX.RESOLUTION_SMALL});
		var data = dpxInstance.getProperties(['manualResolution']);
		data = data['manualResolution'];
		expect(data).toEqual(Rho.DPX.RESOLUTION_SMALL);
		});
		
		it('Should Set manualResolution to RESOLUTION_MEDIUM using direct calling method', function() {
		dpxInstance.manualResolution=Rho.DPX.RESOLUTION_MEDIUM;
		expect(dpxInstance.manualResolution).toEqual(Rho.DPX.RESOLUTION_MEDIUM);
		});
		
		it('Should Set manualResolution to 1600x1200 medium using setProperty calling method', function() {
		dpxInstance.setProperty('manualResolution',Rho.DPX.RESOLUTION_MEDIUM);
		expect(dpxInstance.getProperty('manualResolution')).toEqual(Rho.DPX.RESOLUTION_MEDIUM);
		});
		
		it('Should Set manualResolution to 1600x1200 using setProperties calling method', function() {
		dpxInstance.setProperties({'manualResolution' : Rho.DPX.RESOLUTION_MEDIUM});
		var data = dpxInstance.getProperties(['manualResolution']);
		data = data['manualResolution'];
		expect(data).toEqual(Rho.DPX.RESOLUTION_MEDIUM);
		});
		
		it('Should Set manualResolution to RESOLUTION_LARGE using direct calling method', function() {
		dpxInstance.manualResolution=Rho.DPX.RESOLUTION_MEDIUM;
		expect(dpxInstance.manualResolution).toEqual(Rho.DPX.RESOLUTION_MEDIUM);
		});
		
		it('Should Set manualResolution to 2048x1536 large using setProperty calling method', function() {
		dpxInstance.setProperty('manualResolution', Rho.DPX.RESOLUTION_MEDIUM);
		expect(dpxInstance.getProperty('manualResolution')).toEqual(Rho.DPX.RESOLUTION_MEDIUM);
		});
		
		it('Should Set manualResolution to 2048x1536 using setProperties calling method', function() {
		dpxInstance.setProperties({'manualResolution' : Rho.DPX.RESOLUTION_MEDIUM});
		var data = dpxInstance.getProperties(['manualResolution']);
		data = data['manualResolution'];
		expect(data).toEqual(Rho.DPX.RESOLUTION_MEDIUM);
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
		dpxInstance.userMode= Rho.DPX.USER_MODE_PREVIEW;
		expect(dpxInstance.userMode).toEqual(Rho.DPX.USER_MODE_PREVIEW);
		});		

		it('Should Set userMode to preview using setProperty calling method', function() {
		dpxInstance.setProperty('userMode',Rho.DPX.USER_MODE_PREVIEW);
		expect(dpxInstance.getProperty('userMode')).toEqual(Rho.DPX.USER_MODE_PREVIEW);
		});
		
		it('Should Set userMode to preview using setProperties calling method', function() {
		dpxInstance.setProperties({'userMode' : Rho.DPX.USER_MODE_PREVIEW});
		var data = dpxInstance.getProperties(['userMode']);
		data = data['userMode'];
		expect(data).toEqual(Rho.DPX.USER_MODE_PREVIEW);
		});
		
		it('Should Set userMode to USER_MODE_SNAPSHOT using direct calling method', function() {
		dpxInstance.userMode= Rho.DPX.USER_MODE_SNAPSHOT;
		expect(dpxInstance.userMode).toEqual(Rho.DPX.USER_MODE_SNAPSHOT);
		});
		
		it('Should Set userMode to snapshot using direct calling method', function() {
		dpxInstance.userMode=Rho.DPX.USER_MODE_SNAPSHOT;
		expect(dpxInstance.userMode).toEqual(Rho.DPX.USER_MODE_SNAPSHOT);
		});
		
		it('Should Set userMode to snapshot using setProperty calling method', function() {
		dpxInstance.setProperty('userMode',Rho.DPX.USER_MODE_SNAPSHOT);
		expect(dpxInstance.getProperty('userMode')).toEqual(Rho.DPX.USER_MODE_SNAPSHOT);
		});
		
		it('Should Set userMode to snapshot using setProperties calling method', function() {
		dpxInstance.setProperties({'userMode' : Rho.DPX.USER_MODE_SNAPSHOT});
		var data = dpxInstance.getProperties(['userMode']);
		data = data['userMode'];
		expect(data).toEqual(Rho.DPX.USER_MODE_SNAPSHOT);
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
