describe("Enumerate Barcode Scanner ", function() {
	
	var enumObjCount = false;
	
	it("Enumerate Scanner callback as function", function() {
		displayObjective("Enumerate Scanner callback as function");
		dispTestCaseRunning("Auto Test");
		
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


describe("Barcode Test", function() {
	var ENABLE8K = 8000;
	var enableFlag = false;
	var decodeFlag = false;
	var readFlag = false;
	var enumData_json = '';
	var enumData = '';
	var scannerType = '';

	var getSelectedScannerType = function(){
		scannerType = document.getElementById("scanner_type").value
		return "?scanner_type="+ scannerType;
	}
	
	
	beforeEach(function() {
		enableFlag = false;
		decodeFlag = false;
		readFlag = false;
		decodedata ='';
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

	it("VT282-1778 | call setDefault with SCN and take |"+ scannerType, function() {
		displayObjective(jasmine.getEnv().currentSpec.description);
		dispTestCaseRunning("wait for viewfinder to come automatically for " + scannerType + " Scan any barcode");
		dispExpectedResult("code128 barcode should decode and retrun value should be decoded data and status");
		
		_result.waitToRunTest();	
		
		runs(function() {
			Ruby.call('Barcode','barcode_setdefault'+getSelectedScannerType());
		
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
		
		waitsFor(function(){
			return enableFlag;
		}, '9sec wait to enumerate Scanner', 9000);
		
		_result.waitForResponse();
		
		runs(function(){
			Ruby.call('Barcode','barcode_disable'+getSelectedScannerType());
		});
	});


	it("VT282-1790 | take with callback as function |", function() {
		displayObjective(jasmine.getEnv().currentSpec.description);
		dispTestCaseRunning("wait for scanner to start and scan any barcode after strating scanner");
		dispExpectedResult("scanner should start comeup automatically and Decoded data and status only should be returned ");
		
		_result.waitToRunTest();
		
		runs(function() {
			Ruby.call('Barcode','barcode_take'+getSelectedScannerType());
			
			setTimeout(function() {
				enableFlag = true;
			}, 4000);
		});
		
		waitsFor(function(){
			return enableFlag;
		}, '5sec wait to enable the Scanner', 5000);
		
		_result.waitForResponse();
	});

	it("VT282-1790A | take with callback as function and don't scan cancel it|", function() {
		displayObjective(jasmine.getEnv().currentSpec.description);
		dispTestCaseRunning("Don't scan any barcode after scanner starts automatically and cancle it");
		dispExpectedResult("Decoded data should come as nil and status should be cancel and Beam ore viewfinder will go after 10 sec ");
		_result.waitToRunTest();

		runs(function() {
			Ruby.call('Barcode','barcode_take'+getSelectedScannerType());
			
			setTimeout(function() {
				enableFlag = true;
			}, 4000);
		});
		
		waitsFor(function(){
			return enableFlag;
		}, '5sec wait to enable the Scanner', 5000);
		
		_result.waitForResponse();

	});

	it("VT282-1994 | call getAllProperties() with async callback |", function() {
		displayObjective(jasmine.getEnv().currentSpec.description);
		dispTestCaseRunning("Don't scan and check for all the supported propertylist for scanner");
		dispExpectedResult("all the supported properties with their default value should return in callback");
		
		_result.waitToRunTest();
		
		runs(function() {
			Ruby.call('Barcode','barcode_props'+getSelectedScannerType());
			
			setTimeout(function() {
				enableFlag = true;
			}, 4000);
		});
		
		waitsFor(function(){
			return enableFlag;
		}, '5sec wait to enable the Scanner', 5000);
		
		_result.waitForResponse();
	});

	it("VT282-1998 | call getAllProperties() without callback(Sync Access) |", function() {
		displayObjective(jasmine.getEnv().currentSpec.description);
		dispTestCaseRunning("Don't scan and check for all the supported propertylist for scanner");
		dispExpectedResult("all the supported properties with their default value should return with Sync Access");
		
		_result.waitToRunTest();
		
		runs(function() {
			Ruby.call('Barcode','barcode_props_withoutcb'+getSelectedScannerType());
			
			setTimeout(function() {
				enableFlag = true;
			}, 4000);
		});
		
		waitsFor(function(){
			return enableFlag;
		}, '5sec wait to enable the Scanner', 5000);
		
		_result.waitForResponse();
	});

	it("VT282-2008A | call getSupportedProperties() with async callback |", function() {
		displayObjective(jasmine.getEnv().currentSpec.description);
		dispTestCaseRunning("check for all the supported propertylist for scanner");
		dispExpectedResult("all the supported properties should return in async callback");
		
		_result.waitToRunTest();
		
		runs(function() {
			Ruby.call('Barcode','barcode_supportedprops'+getSelectedScannerType());
			
			setTimeout(function() {
				enableFlag = true;
			}, 4000);
		});
		
		waitsFor(function(){
			return enableFlag;
		}, '5sec wait to enable the Scanner', 5000);
		
		_result.waitForResponse();
	});

	it("VT282-2008B | call getProperties() with scannerType without callback |", function() {
		displayObjective(jasmine.getEnv().currentSpec.description);
		dispTestCaseRunning("check for retrurned value");
		dispExpectedResult("It should return the Scanner scannerType");
		_result.waitToRunTest();
		
		runs(function() {
			Ruby.call('Barcode','barcode_scannertype_withoutcb'+getSelectedScannerType());
			
			setTimeout(function() {
				enableFlag = true;
			}, 4000);
		});
		
		waitsFor(function(){
			return enableFlag;
		}, '5sec wait to enable the Scanner', 5000);
		
		_result.waitForResponse();
	});

	it("VT282-2008C | call getProperties() with scannerType with callback |", function() {
		displayObjective(jasmine.getEnv().currentSpec.description);
		dispTestCaseRunning("check for retrurned value");
		dispExpectedResult("It should return the Scanner scannerType");
		
		_result.waitToRunTest();
		
		runs(function() {
			Ruby.call('Barcode','barcode_scannertype'+getSelectedScannerType());
			
			setTimeout(function() {
				enableFlag = true;
			}, 4000);
		});
		
		waitsFor(function(){
			return enableFlag;
		}, '5sec wait to enable the Scanner', 5000);
		
		_result.waitForResponse();
	});

	xit("VT282-2006 | call setDefault and getDefault |", function() {
		displayObjective(jasmine.getEnv().currentSpec.description);
		dispTestCaseRunning("Auto Test");
		
		var defaultscan = '';
		runs(function() {
			Ruby.call('Barcode','barcode_setdefault');
			
			setTimeout(function() {
				enableFlag = true;
			}, 4000);
		});
		
		waitsFor(function(){
			return enableFlag;
		}, '5sec wait to enable the Scanner', 5000);
		
		runs(function() {
			Ruby.call('Barcode','barcode_getdefault');
			
			setTimeout(function() {
				defaultscan = Ruby.getReturnedValue();
			}, 7000);
		});
		
		waitsFor(function(){
			return defaultscan !== '';
		}, '8sec wait to enable the Scanner', 8000);
		
		expect(scannerType).toEqual(defaultscan);
	});
		
});


