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
	var scannerName = '';
	
	if(Rho.System.platform == 'ANDROID')
	{
		ENABLE8K = 0; ENABLE1K = 0;
		isAndroid = true;
	}
	
	// using friendlyName instead of scannerType as cannot get later's value without enabling the scanner in WM/CE	 
	var getSelectedScannerType = function(){
		scannerName = document.getElementById("scanner_type").value
		return "scanner_name="+ scannerName;
	}
		
	beforeEach(function() {
		enableFlag = false;
		document.getElementById("verificationResult").innerHTML = "";
	});

	// removing as not necessary and not able to get scannerType from WM/CE without enabling it
	xit("Enumerate and display the available scanners in the device ", function() {
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
			
		if (Rho.System.isSymbolDevice == true) 
		{
			it("VT200-0591 | Enable with callback as function | " + scannerName , function() {
				displayObjective(jasmine.getEnv().currentSpec.description);
				dispTestCaseRunning("Scan Barcode code128 with " + scannerName);
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
	
			it("VT200-0592 | Enable with alldecoders enabled and callback as function URL | " + scannerName, function() {
				displayObjective(jasmine.getEnv().currentSpec.description);
				dispTestCaseRunning("Scan code93 and MSI barcode with " + scannerName);
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
	
			it("VT200-0596| call setDefault with " + scannerName + "and take |", function() {
				displayObjective(jasmine.getEnv().currentSpec.description);
				dispTestCaseRunning("Take method wait for scanner beam or viewfinder to come automatically without pressing hadrware trigger " + scannerName + " Scan code 128 barcode");
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

			it("VT200-0597 | take with picklist, scanTimeout 10000 and callback |"+ scannerName, function() {
				displayObjective(jasmine.getEnv().currentSpec.description);
				dispTestCaseRunning("Wait for scanner to start and check for picklist as  with " + scannerName);
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

			it("VT200-0598 | Take with alldecoders disabled, code128 as enabled with callback as function URL |"+ scannerName, function() {
				displayObjective(jasmine.getEnv().currentSpec.description);
				dispTestCaseRunning("scan code39 and then code128 with" + scannerName);
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
	
	
			if (Rho.System.isSymbolDevice == true) 
			{
				it("VT200-0600 | autotenter true with setproperty |"+ scannerName, function() {
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
	
				it("VT200-0601 | set decodeSound to local wave file path |"+ scannerName, function() {
					displayObjective(jasmine.getEnv().currentSpec.description);
					dispTestCaseRunning("Scan code128 barcode with " + scannerName + " check for the wave file to play(wave file should at application/sdcard folder)");
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
			
			it("VT200-0602 | call getAllProperties() without callback(Sync Access) |"+ scannerName, function() {
				displayObjective(jasmine.getEnv().currentSpec.description);
				dispTestCaseRunning("Don't scan and check for all the supported propertylist for scanner" + scannerName);
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
	
			it("VT200-0603 | call getSupportedProperties() with async callback |"+ scannerName, function() {
				displayObjective(jasmine.getEnv().currentSpec.description);
				dispTestCaseRunning("check for all the supported propertylist for scanner" + scannerName);
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

