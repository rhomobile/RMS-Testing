describe("Enumerate Scanner ", function() {
	var enumObjCount = false;

	it("Enumerate Scanner callback as function", function() {		
		displayObjective(jasmine.getEnv().currentSpec.description);
		dispExpectedResult("Auto Test");
		
		runs(function() {
			Ruby.call('Barcode','enumerate_barcode_auto');
		});
		
		waitsFor(function(){
			enumObjCount = Ruby.getReturnedValue();
			return enumObjCount;
		});
		
		runs(function(){
			expect(enumObjCount).toEqual('true');
		});
		
	});
 	
});


describe("Barcode Manual Test", function() {
	
	var ENABLE8K = 8000;
	var ENABLE1K = 1000;
	//var enumData = Rho.Barcode.enumerate();
	var enableFlag = false;
	var isAndroid = false;
	var scannerType = '';
	
	if(Rho.System.platform == 'ANDROID')
	{
		ENABLE8K = 0; ENABLE1K = 0;
		isAndroid = true;
	}
	
	 
	var getSelectedScannerType = function(){
		scannerType = document.getElementById("scanner_type").value
		return "scanner_type="+ scannerType;
	}
		
	beforeEach(function() {
		enableFlag = false;
		document.getElementById("verificationResult").innerHTML = "";
	});

	it("Enumerate and display the available scanners in the device ", function() {
		displayObjective(jasmine.getEnv().currentSpec.description);
		dispExpectedResult("List of scannerTypes avaiable should be shown");
		
		_result.waitToRunTest();
		
		runs(function() {
			Ruby.call('Barcode','enumerate_barcode_print');
		
			setTimeout(function(){
				enableFlag = true;
			}, 4000);
		});
		
		waitsFor(function(){
			return enableFlag;
		}, '5sec wait to enumerate Scanner', 5000);
		
		_result.waitForResponse();
	});		
			

	describe("Barcode Test with selected scannerType" , function() {
			
		if (Rho.System.isMotorolaDevice == true) 
		{
			it("VT200-0591 | Enable with callback as function | " + scannerType , function() {
				displayObjective(jasmine.getEnv().currentSpec.description);
				dispTestCaseRunning("Scan Barcode code128 with " + scannerType);
				dispExpectedResult("Is returned decoded hash displayed correctly with all data?");
				
				_result.waitToRunTest();
				
				runs(function() {
					Ruby.call('Barcode','scanner_enable?'+getSelectedScannerType());
				
					setTimeout(function(){
						enableFlag = true;
					}, 4000);
				});
				
				waitsFor(function(){
					return enableFlag;
				}, '5sec wait to enumerate Scanner', 5000);
				
				_result.waitForResponse();
			});
	
			it("VT200-0592 | Enable with alldecoders enabled and callback as function URL | " + scannerType, function() {
				displayObjective(jasmine.getEnv().currentSpec.description);
				dispTestCaseRunning("Scan code93 and MSI barcode with " + scannerType);
				dispExpectedResult("Is decoded data comes after scanning code93 and MSI?");
				
				_result.waitToRunTest();
				
				runs(function() {
					Ruby.call('Barcode','scanner_enable?allDecoders=yes&'+getSelectedScannerType());
				
					setTimeout(function(){
						enableFlag = true;
					}, 4000);
				});
				
				waitsFor(function(){
					return enableFlag;
				}, '5sec wait to enumerate Scanner', 5000);
				
				_result.waitForResponse();
			});
			
		
				
			it("VT200-0593 | Enable with picklist , scanTimeout 3000 and callback as function |", function() {
				displayObjective(jasmine.getEnv().currentSpec.description);
				dispTestCaseRunning("don't scan and check scanTimeout as 3000 and check picklistMode as  with ");
				dispExpectedResult("Baeam or viewfinder will stop automatically after 3 second? \n only the barcode in the center of the image is decoded for picklistMode as ");
				
				_result.waitToRunTest();
				
				runs(function() {
					Ruby.call('Barcode','scanner_enable?time=3000&picklist='+isAndroid+'&'+getSelectedScannerType());
				
					setTimeout(function(){
						enableFlag = true;
					}, 4000);
				});
				
				waitsFor(function(){
					return enableFlag;
				}, '5sec wait to enumerate Scanner', 5000);
				
				_result.waitForResponse();
			});
			
			it("VT200-0594| Enable with alldecoders disabled, code128 as enabled without callback |", function() {
				displayObjective(jasmine.getEnv().currentSpec.description);
				dispTestCaseRunning("putting focus inside textbox and Scan code39 barcode then scan code128 barcode with ");
				dispExpectedResult("only code128 barcode should decode");
				_result.waitToRunTest();
	
				runs(function() {
					Ruby.call('Barcode','scanner_enable_withoutcb?allDecoders=no&code128=true&'+getSelectedScannerType());
				
					setTimeout(function(){
						enableFlag = true;
					}, 4000);
				});
				
				waitsFor(function(){
					return enableFlag;
				}, '5sec wait to enumerate Scanner', 5000);
			
				_result.waitForResponse();
			
				runs(function() {
					Ruby.call('Barcode','scanner_enable?allDecoders=yes&'+getSelectedScannerType());
				});
			});
	
		}
	
			it("VT200-0596| call setDefault with " + scannerType + "and take |", function() {
				displayObjective(jasmine.getEnv().currentSpec.description);
				dispTestCaseRunning("Take method wait for scanner beam or viewfinder to come automatically without pressing hadrware trigger " + scannerType + " Scan code 128 barcode");
				dispExpectedResult("code128 barcode should decode and retrun value should be decoded data and status");
				_result.waitToRunTest();
				
				runs(function() {
					Ruby.call('Barcode','barcode_setdefault?'+getSelectedScannerType());
				
					setTimeout(function(){
						enableFlag = true;
					}, 4000);
				});
				
				waitsFor(function(){
					return enableFlag;
				}, '5sec wait to enumerate Scanner', 5000);
				
				runs(function() {
					enableFlag = false;
					Ruby.call('Barcode','barcode_take?default=true');
				
					setTimeout(function(){
						enableFlag = true;
					}, 8000);
				});
				
				_result.waitForResponse();
			});

			it("VT200-xxx | Start and stop scanner |", function() {
				displayObjective(jasmine.getEnv().currentSpec.description);
				dispTestCaseRunning("Don't press hardware trigger" );
				dispExpectedResult("Scanner beam or viewfinder should comeup automatically and will stop after 8 sec");
				
				_result.waitToRunTest();
				
				runs(function(){
					Ruby.call('Barcode','scanner_enable?'+getSelectedScannerType());
					
					setTimeout(function() {
						enableFlag = true;
					}, 4000);
				});

				waitsFor(function(){
					return enableFlag;
				}, '9sec wait to enable the Scanner', 5000);

				runs(function(){	
					enableFlag = false;
					Ruby.call('Barcode','barcode_start?'+getSelectedScannerType());
					
					setTimeout(function() {
						enableFlag = true;
					}, 8000);
				});

				waitsFor(function() {
					return enableFlag;
				}, '9sec Wait to Scan the Barcode', 9000);

				runs(function(){
					Ruby.call('Barcode','barcode_stop?'+getSelectedScannerType());
				});
				
				_result.waitForResponse();
				
				runs(function(){
					Ruby.call('Barcode','barcode_disable?'+getSelectedScannerType());
				});
			});

			it("VT200-0597 | take with picklist, scanTimeout 10000 and callback |"+ scannerType, function() {
				displayObjective(jasmine.getEnv().currentSpec.description);
				dispTestCaseRunning("Wait for scanner to start and check for picklist as  with " + scannerType);
				dispExpectedResult("only the barcode in the center of the image is decoded for picklistMode as ");
				
				_result.waitToRunTest();
				
				runs(function(){
					Ruby.call('Barcode','scanner_enable?time=10000&picklist=true&'+getSelectedScannerType());
					
					setTimeout(function() {
						enableFlag = true;
					}, 12000);
				});
				
				_result.waitForResponse();
			});

			it("VT200-0598 | Take with alldecoders disabled, code128 as enabled with callback as function URL |"+ scannerType, function() {
				displayObjective(jasmine.getEnv().currentSpec.description);
				dispTestCaseRunning("scan code39 and then code128 with" + scannerType);
				dispExpectedResult("Only code128 should be decoded");
				
				_result.waitToRunTest();
				
				runs(function(){
					Ruby.call('Barcode','barcode_take_disable?'+getSelectedScannerType());
					
					setTimeout(function() {
						enableFlag = true;
					}, 4000);
				});

				waitsFor(function(){
					return enableFlag;
				}, '4sec wait to enable the Scanner', 5000);
				
				_result.waitForResponse();
				
				runs(function() {		
					Ruby.call('Barcode','barcode_setproperty?attr=allDecoders&val=true&'+getSelectedScannerType());
				});
			});
	
	
			if (Rho.System.isMotorolaDevice == true) 
			{
				it("VT200-0600 | autotenter true with setproperty |"+ scannerType, function() {
					displayObjective(jasmine.getEnv().currentSpec.description);
					dispTestCaseRunning("Put the focus inside textbox and scan code128 barcode with" + scannerType);
					dispExpectedResult("Barcode data should come inside textbox with an enter at the end, no callback hash should return");
					
					_result.waitToRunTest();
					
					runs(function(){
						Ruby.call('Barcode','scanner_enable_withoutcb?'+getSelectedScannerType());
						
						setTimeout(function() {
							enableFlag = true;
						}, 4000);
					});
	
					waitsFor(function(){
						return enableFlag;
					}, '4sec wait to enable the Scanner', 5000);
					
					runs(function() {		
						Ruby.call('Barcode','barcode_setproperty?attr=autoenter&val=true&'+getSelectedScannerType());
					});
					
					_result.waitForResponse();
				});
	
				it("VT200-0601 | set decodeSound to local wave file path |"+ scannerType, function() {
					displayObjective(jasmine.getEnv().currentSpec.description);
					dispTestCaseRunning("Scan code128 barcode with " + scannerType + " check for the wave file to play(wave file should at application/sdcard folder)");
					dispExpectedResult("wave file should play after barcode is decoded");
					
					_result.waitToRunTest();
					
					runs(function(){
						Ruby.call('Barcode','scanner_enable?'+getSelectedScannerType());
						
						setTimeout(function() {
							enableFlag = true;
						}, 4000);
					});
	
					waitsFor(function(){
						return enableFlag;
					}, '4sec wait to enable the Scanner', 5000);
					
					runs(function() {		
						if(isAndroid) {
							Ruby.call("Barcode","barcode_decode?file='file:///sdcard/decode.wav'&"+getSelectedScannerType());
						}
						else {
							Ruby.call("Barcode","barcode_decode?file='file://Application/alarm5.wav'&"+getSelectedScannerType());
						}
					});
					
					_result.waitForResponse();
					
					runs(function() {
						Ruby.call('Barcode','barcode_disable?'+getSelectedScannerType());
					});
					
				});
			}
			
			it("VT200-0602 | call getAllProperties() without callback(Sync Access) |"+ scannerType, function() {
				displayObjective(jasmine.getEnv().currentSpec.description);
				dispTestCaseRunning("Don't scan and check for all the supported propertylist for scanner" + scannerType);
				dispExpectedResult("all the supported properties with their default value should return with Sync Access");
				
				_result.waitToRunTest();
				
				runs(function(){
					Ruby.call('Barcode','scanner_enable_withoutcb?'+getSelectedScannerType());
					
					setTimeout(function() {
						enableFlag = true;
					}, 4000);
				});
	
				waitsFor(function(){
					return enableFlag;
				}, '5sec wait to enable the Scanner', 5000);
				
				runs(function() {		
					Ruby.call('Barcode','barcode_props_withoutcb?'+getSelectedScannerType());
				});
				
				_result.waitForResponse();
			});
	
			it("VT200-0603 | call getSupportedProperties() with async callback |"+ scannerType, function() {
				displayObjective(jasmine.getEnv().currentSpec.description);
				dispTestCaseRunning("check for all the supported propertylist for scanner" + scannerType);
				dispExpectedResult("all the supported properties should return in async callback");
				
				_result.waitToRunTest();
				
				runs(function(){
					Ruby.call('Barcode','scanner_enable?'+getSelectedScannerType());
					
					setTimeout(function() {
						enableFlag = true;
					}, 8000);
				});
	
				waitsFor(function(){
					return enableFlag;
				}, '9sec wait to enable the Scanner', 9000);
				
				runs(function() {		
					Ruby.call('Barcode','barcode_supportedprops?'+getSelectedScannerType());
				});
				
				_result.waitForResponse();
				
				runs(function() {
					Ruby.call('Barcode','barcode_disable?'+getSelectedScannerType());
				});
			});
	});	
		
});	

