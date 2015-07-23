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
    // using friendlyName instead of scannerType as cannot get later's value without enabling the scanner in WM/CE   
    var getSelectedScannerType = function(){
        scannerName = document.getElementById("scanner_type").value
        return "scanner_name="+ scannerName;
    }
    window.onload = function() {
    	scantype = getSelectedScannerType();
    }
	if(Rho.System.platform == 'ANDROID')
	{
		ENABLE8K = 0; ENABLE1K = 0;
		isAndroid = true;
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

		it("VT200-0335 | Enable with callback as function | ", function() {
			displayObjective(jasmine.getEnv().currentSpec.description);
			dispTestCaseRunning("Scan Barcode code128 with ");
			dispExpectedResult("Is returned decoded hash displayed correctly with all data?");
			
			_result.waitToRunTest();
			
			runs(function() {
				Ruby.call('Barcode','scanner_enable?'+getSelectedScannerType());
			});
			
			_result.waitForResponse();

			runs(function() {
				Ruby.call('Barcode','scanner_disable?'+getSelectedScannerType());
			});			
		});

		it("VT200-0336 | Enable with alldecoders enabled and callback as function URL | ", function() {
			displayObjective(jasmine.getEnv().currentSpec.description);
			dispTestCaseRunning("Scan code93 and MSI barcode");
			dispExpectedResult("Is decoded data comes after scanning code93 and MSI?");
			
			_result.waitToRunTest();
			
			runs(function() {
				Ruby.call('Barcode','scanner_enable?allDecoders=yes&'+getSelectedScannerType());
			});
			
			_result.waitForResponse();

			runs(function() {
				Ruby.call('Barcode','scanner_disable?'+getSelectedScannerType());
			});			
		});
			
		it("VT200-0337 | Enable with picklist , scanTimeout 3000 and callback as function |", function() {
			displayObjective(jasmine.getEnv().currentSpec.description);
			dispTestCaseRunning("don't scan and check scanTimeout as 3000 and check picklistMode as  with ");
			dispExpectedResult("Baeam or viewfinder will stop automatically after 3 second? \n only the barcode in the center of the image is decoded for picklistMode as ");
			
			_result.waitToRunTest();
			
			runs(function() {
				Ruby.call('Barcode','scanner_enable?time=3000&picklist='+isAndroid+'&'+getSelectedScannerType());
			});
			
			_result.waitForResponse();

			runs(function() {
				Ruby.call('Barcode','scanner_disable?'+getSelectedScannerType());
			});			
		});
		
		it("VT200-0338 | Enable with alldecoders disabled, code128 as enabled without callback |", function() {
			displayObjective(jasmine.getEnv().currentSpec.description);
			dispTestCaseRunning("putting focus inside textbox and Scan code39 barcode then scan code128 barcode");
			dispExpectedResult("only code128 barcode should decode");
			_result.waitToRunTest();

			runs(function() {
				Ruby.call('Barcode','scanner_enable_withoutcb?allDecoders=no&code128=true&'+getSelectedScannerType());
			});
		
			_result.waitForResponse();
		
			runs(function() {
				Ruby.call('Barcode','scanner_disable?'+getSelectedScannerType());
			});
		});

		it("VT200-0340 | call setDefault and take |", function() {
			displayObjective(jasmine.getEnv().currentSpec.description);
			dispTestCaseRunning("Take method wait for scanner beam or viewfinder to come automatically without pressing hadrware trigger scan code 128 barcode");
			dispExpectedResult("code128 barcode should decode and retrun value should be decoded data and status");
			_result.waitToRunTest();
			
			runs(function() {
				Ruby.call('Barcode','barcode_setdefault?'+getSelectedScannerType());
			
				setTimeout(function(){
					enableFlag = true;
				}, 1000);
			});
			
			waitsFor(function(){
				return enableFlag;
			}, '5sec wait to enumerate Scanner', 2000);
			
			runs(function() {
				Ruby.call('Barcode','barcode_take?default=true');
			});
			
			_result.waitForResponse();
		});

	  	//Commented because this test case is not part of test plan
	  	/*it("VT200-xxx | Start and stop scanner |", function() {
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
		});*/

		it("VT200-0597 | take with picklist, scanTimeout 7000 and callback |", function() {
			displayObjective(jasmine.getEnv().currentSpec.description);
			dispTestCaseRunning("Wait for scanner to start and check for picklist");
			dispExpectedResult("only the barcode in the center of the image is decoded for picklistMode as ");
			
			_result.waitToRunTest();
			
			runs(function(){
				Ruby.call('Barcode','barcode_take_props?time=7000&picklist=true&'+getSelectedScannerType());
			});
			
			_result.waitForResponse();
		});

		it("VT200-0598 | Take with alldecoders disabled, code128 as enabled with callback as function URL |", function() {
			displayObjective(jasmine.getEnv().currentSpec.description);
			dispTestCaseRunning("scan code39 and then code128");
			dispExpectedResult("Only code128 should be decoded");
			
			_result.waitToRunTest();
			
			runs(function(){
				Ruby.call('Barcode','barcode_take_disable?'+getSelectedScannerType());
			});
			
			_result.waitForResponse();
			
			runs(function() {		
				Ruby.call('Barcode','barcode_setproperty?attr=allDecoders&val=true&'+getSelectedScannerType());
			});
		});


		it("VT200-0344 | autotenter true with setproperty |", function() {
			displayObjective(jasmine.getEnv().currentSpec.description);
			dispTestCaseRunning("Put the focus inside textbox and scan code128 barcode using trigger");
			dispExpectedResult("Barcode data should come inside textbox with an enter at the end, no callback hash should return");
			
			_result.waitToRunTest();
			
			runs(function(){
				Ruby.call('Barcode','scanner_enable_withoutcb?autoenter=yes&'+getSelectedScannerType());				
			});

			_result.waitForResponse();

			runs(function() {
				Ruby.call('Barcode','scanner_disable?'+getSelectedScannerType());
			});			
		});

		it("VT200-0601 | set decodeSound to local wave file path |", function() {
			displayObjective(jasmine.getEnv().currentSpec.description);
			dispTestCaseRunning("By hardware trigger Scan code128 barcode check for the wave file to play(wave file should at application/sdcard folder)");
			dispExpectedResult("alarm5.wav file should play after barcode is decoded");
			
			_result.waitToRunTest();
			
			runs(function(){
				if(isAndroidPlatform()){
					Ruby.call('Barcode','scanner_enable?android=yes&decode=yes&'+getSelectedScannerType());
				}else{
					Ruby.call('Barcode','scanner_enable?decode=yes&'+getSelectedScannerType());
				}
			});
			
			_result.waitForResponse();
			
			runs(function() {
				Ruby.call('Barcode','scanner_disable?'+getSelectedScannerType());
			});
			
		});
		
		
		it("VT200-0602 | call getAllProperties() without callback(Sync Access) |", function() {
			displayObjective(jasmine.getEnv().currentSpec.description);
			dispTestCaseRunning("Don't scan and check for all the supported propertylist for scanner");
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
			
			runs(function() {
				Ruby.call('Barcode','scanner_disable?'+getSelectedScannerType());
			});			
		});

		it("VT200-0603 | call getSupportedProperties() with async callback |", function() {
			displayObjective(jasmine.getEnv().currentSpec.description);
			dispTestCaseRunning("check for all the supported propertylist for scanner");
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
				Ruby.call('Barcode','scanner_disable?'+getSelectedScannerType());
			});
		});

		it("VT200-0524 | Take with callback as function |", function() {
			displayObjective("VT200-0524 | Take with callback as function|");
			dispTestCaseRunning("Wait for scanner to start and scan any barcode after strating scanner");
			dispExpectedResult("Scanner should start comeup automatically and Decoded data and status only should be returned ");
			_result.waitToRunTest();
			runs(function(){
				Ruby.call('Barcode','barcode_take?'+getSelectedScannerType());
			});
			_result.waitForResponse();
		});

		it("VT200-0525 | Take with callback as function and don't scan cancel it", function() {
			displayObjective("VT200-0525 | Take with callback as function and don't scan cancel it|");
			dispTestCaseRunning("Don't scan any barcode after scanner starts automatically and cancle it");
			dispExpectedResult("Decoded data should come as nil and status should be cancel and Beam ore viewfinder will go after 10 sec ");
			_result.waitToRunTest();
			runs(function(){
				Ruby.call('Barcode','barcode_take?'+getSelectedScannerType());
			});
			_result.waitForResponse();

		});

		it("VT200-0526 | Call getAllProperties() with async callback |", function() {
			displayObjective("VT200-0526 | Call getAllProperties() with async callback |");
			dispTestCaseRunning("Don't scan and check for all the supported propertylist for scanner");
			dispExpectedResult("all the supported properties with their default value should return in callback");
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
				Ruby.call('Barcode','barcode_props?'+getSelectedScannerType());
			});
			_result.waitForResponse();
			
			runs(function() {
				Ruby.call('Barcode','scanner_disable?'+getSelectedScannerType());
			});			
		});

		it("VT200-0529 | call getSupportedProperties() with async callback |", function() {
			displayObjective("VT200-0529 | call getSupportedProperties() with async callback |");
			dispTestCaseRunning("check for all the supported propertylist for scanner");
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
				Ruby.call('Barcode','barcode_supportedprops_withoutcb?'+getSelectedScannerType());
			});
			_result.waitForResponse();
			
			runs(function() {
				Ruby.call('Barcode','scanner_disable?'+getSelectedScannerType());
			});			
		});

		it("VT200-0530 | call getProperties() with scannerType without callback |", function() {
			displayObjective("VT200-0530 | call getProperties() with scannerType without callback|");
			dispTestCaseRunning("check for retrurned value");
			dispExpectedResult("It should return the Scanner scannerType");
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
				Ruby.call('Barcode','barcode_scannertype_withoutcb?'+getSelectedScannerType());
			});
			_result.waitForResponse();
			runs(function() {
				Ruby.call('Barcode','scanner_disable?'+getSelectedScannerType());
			});
		});

		it("VT200-0531 | call getProperties() with scannerType with callback |", function() {
			displayObjective("VT200-0531 | call getProperties() with scannerType with callback|");
			dispTestCaseRunning("check for retrurned value");
			dispExpectedResult("It should return the Scanner scannerType");
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
				Ruby.call('Barcode','barcode_scannertype?'+getSelectedScannerType());
			});
			_result.waitForResponse();
			runs(function() {
				Ruby.call('Barcode','scanner_disable?'+getSelectedScannerType());
			});
		});

		it("VT200-0532 | call getProperty() with scannerType with callback |", function() {
			displayObjective("VT200-0532 | call getProperty() with scannerType with anonymous callback|");
			dispTestCaseRunning("check for retrurned value");
			dispExpectedResult("It should return the Scanner scannerType");
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
				Ruby.call('Barcode','barcode_scannertype_get?'+getSelectedScannerType());
			});
			_result.waitForResponse();
			runs(function() {
				Ruby.call('Barcode','scanner_disable?'+getSelectedScannerType());
			});
		});

	});	
		
});	

