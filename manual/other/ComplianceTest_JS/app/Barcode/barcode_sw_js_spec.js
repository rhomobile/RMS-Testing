describe("Barcode Test", function() {
	var ENABLE8K = 8000;
	var enableFlag = false;
	var decodeFlag = false;
	var readFlag = false;

	var callbacktake = function (data){
		dispVerificationStatus(JSON.stringify(data));
	}

	enumData = Rho.Barcode.enumerate();

   for (var j = 0;j<enumData.length;j++){

   (function(objSCN){ 

   	var scnid = objSCN.getProperty('scannerType');

	beforeEach(function() {
		enableFlag = false;
		decodeFlag = false;
		readFlag = false;
		decodedata ='';
		document.getElementById("verificationResult").innerHTML = "";
		//enablecallbackdata(decodedata);
	});

	afterEach(function() {
		/* ... Tear it down ... */
		//objSCN.disable();
	});

	it("VT282-1778 | call setDefault with SCN and take |"+ scnid, function() {
		displayObjective("VT282-1778 | call setDefault and take");
		dispTestSteps("wait for viewfinder to come automatically for " + scnid + " Scan any barcode");
		dispExpectedResult("code128 barcode should decode and retrun value should be decoded data and status");
		_result.waitToRunTest();	
		runs(function() {
			Rho.Barcode.setDefaultID(objSCN.getId());
			Rho.Barcode.take({},callbacktake);
			setTimeout(function() {
				enableFlag = true;
			}, 4000);
		});
		waitsFor(function(){
			return enableFlag;
		}, '5sec wait to enable the Scanner', 5000);
		_result.waitForResponse();
		runs(function(){
			objSCN.disable();
		});
	});

	it("VT282-1790 | take with callback as function |"+ scnid, function() {
		displayObjective("VT282-1790 | take with callback as function|");
		dispTestSteps("wait for scanner to start and scan any barcode after strating scanner" + scnid);
		dispExpectedResult("scanner should start comeup automatically and Decoded data and status only should be returned ");
		_result.waitToRunTest();
		runs(function() {
		objSCN.take({},callbacktake);
		setTimeout(function() {
			enableFlag = true;
		}, 4000);
		});
		waitsFor(function(){
			return enableFlag;
		}, '5sec wait to enable the Scanner', 5000);
		_result.waitForResponse();
	});

	it("VT282-1797 | Take with callback as anonymous function |"+ scnid, function() {
		displayObjective("VT282-1797 | Take with callback as anonymous function|");
		dispTestSteps("scan any barcode with" + scnid);
		dispExpectedResult("data of barcode and status as Ok should be returned");
		_result.waitToRunTest();
		runs(function() {
		objSCN.take({},function(data){dispVerificationStatus(JSON.stringify(data));});
		setTimeout(function() {
			enableFlag = true;
		}, 4000);
		});
		waitsFor(function() {
			return enableFlag;
		}, '5sec wait to enable the Scanner', 5000);
		_result.waitForResponse();
		runs(function() {		
			objSCN.disable();
		});
	});

	it("VT282-1790A | take with callback as function and don't scan cancel it|"+ scnid, function() {
		displayObjective("VT282-1790A | take with callback as function and don't scan cancel it|");
		dispTestSteps("Don't scan any barcode after scanner starts automatically and cancle it" + scnid);
		dispExpectedResult("Decoded data should come as nil and status should be cancel and Beam ore viewfinder will go after 10 sec ");
		_result.waitToRunTest();

		runs(function() {
		    objSCN.take({},callbacktake);
			setTimeout(function() {
				enableFlag = true;
			}, 4000);
		});

		waitsFor(function()
		{
			return enableFlag;
		}, '5sec wait to enable the Scanner', 5000);
		_result.waitForResponse();

	});

	it("VT282-1994 | call getAllProperties() with async callback |"+ scnid, function() {
		displayObjective("VT282-1994 | call getAllProperties() with async callback |");
		dispTestSteps("Don't scan and check for all the supported propertylist for scanner" + scnid);
		dispExpectedResult("all the supported properties with their default value should return in callback");
		_result.waitToRunTest();
		runs(function(){
			objSCN.getAllProperties(callbacktake);
			setTimeout(function() {
				enableFlag = true;
			}, 4000);
		});
		waitsFor(function(){
			return enableFlag;
		}, '5sec wait to enable the Scanner', 5000);
		_result.waitForResponse();
	});

	it("VT282-1998 | call getAllProperties() without callback(Sync Access) |"+ scnid, function() {
		displayObjective("VT282-1998 | call getAllProperties() without callback(Sync Access) |");
		dispTestSteps("Don't scan and check for all the supported propertylist for scanner" + scnid);
		dispExpectedResult("all the supported properties with their default value should return with Sync Access");
		_result.waitToRunTest();
		runs(function(){
			var data = objSCN.getAllProperties();
			callbacktake(data);
			setTimeout(function() {
				enableFlag = true;
			}, 4000);
		});
		waitsFor(function(){
			return enableFlag;
		}, '5sec wait to enable the Scanner', 5000);
		_result.waitForResponse();
	});

	it("VT282-1999 | call getAllProperties() with anonymous callback |"+ scnid, function() {
		displayObjective("VT282-1999 | call getAllProperties() with anonymous callback |");
		dispTestSteps("Don't scan and check for all the supported propertylist for scanner" + scnid);
		dispExpectedResult("all the properties with their default value should return with anonymous callback");
		_result.waitToRunTest();
		runs(function(){
			objSCN.getAllProperties(function(data){dispVerificationStatus(JSON.stringify(data));});
			setTimeout(function() {
				enableFlag = true;
			}, 4000);
		});
		waitsFor(function(){
			return enableFlag;
		}, '5sec wait to enable the Scanner', 5000);
		_result.waitForResponse();
	});

	it("VT282-2008 | call getSupportedProperties() with anonymous callback |"+ scnid, function() {
		displayObjective("VT282-2008 | call getSupportedProperties() with anonymous callback |");
		dispTestSteps("Don't scan and check for the supported propertylist for scanner" + scnid);
		dispExpectedResult("all the supported properties should return with anonymous callback");
		_result.waitToRunTest();
		runs(function(){
			objSCN.getSupportedProperties(function(data){dispVerificationStatus(JSON.stringify(data));});
			setTimeout(function() {
				enableFlag = true;
			}, 4000);
		});
		waitsFor(function(){
			return enableFlag;
		}, '5sec wait to enable the Scanner', 5000);
		_result.waitForResponse();
	});

	it("VT282-2008A | call getSupportedProperties() with async callback |"+ scnid, function() {
		displayObjective("VT282-2008A | call getSupportedProperties() with async callback |");
		dispTestSteps("check for all the supported propertylist for scanner" + scnid);
		dispExpectedResult("all the supported properties should return in async callback");
		_result.waitToRunTest();
		runs(function(){
			objSCN.getSupportedProperties(callbacktake);
			setTimeout(function() {
				enableFlag = true;
			}, 4000);
		});
		waitsFor(function()
		{
			return enableFlag;
		}, '5sec wait to enable the Scanner', 5000);
		_result.waitForResponse();
	});

	it("VT282-2008B | call getProperties() with scannerType without callback |"+ scnid, function() {
		displayObjective("VT282-2008B | call getProperties() with scannerType without callback|");
		dispTestSteps("check for retrurned value" + scnid);
		dispExpectedResult("It should return the Scanner scannerType");
		_result.waitToRunTest();
		runs(function() {
			var data = objSCN.getProperties(['scannerType']);
			callbacktake(data);
			setTimeout(function() {
				enableFlag = true;
			}, 4000);
		});
		waitsFor(function(){
			return enableFlag;
		}, '5sec wait to enable the Scanner', 5000);
		_result.waitForResponse();
	});

	it("VT282-2008C | call getProperties() with scannerType with callback |"+ scnid, function() {
		displayObjective("VT282-2008C | call getProperties() with scannerType with callback|");
		dispTestSteps("check for retrurned value" + scnid);
		dispExpectedResult("It should return the Scanner scannerType");
		_result.waitToRunTest();
		runs(function(){
			objSCN.getProperties(['scannerType'],callbacktake);
			setTimeout(function() {
				enableFlag = true;
			}, 4000);
		});
		waitsFor(function(){
			return enableFlag;
		}, '5sec wait to enable the Scanner', 5000);
		_result.waitForResponse();
	});

	it("VT282-2008D | call getProperty() with scannerType with anonymous callback |"+ scnid, function() {
		displayObjective("VT282-2008D | call getProperty() with scannerType with anonymous callback|");
		dispTestSteps("check for retrurned value" + scnid);
		dispExpectedResult("It should return the Scanner scannerType");
		_result.waitToRunTest();
		runs(function(){
			objSCN.getProperty('scannerType',function(data){dispVerificationStatus(JSON.stringify(data));});
			setTimeout(function() {
				enableFlag = true;
			}, 4000);
		});
		waitsFor(function(){
			return enableFlag;
		}, '5sec wait to enable the Scanner', 5000);
		_result.waitForResponse();
	});

	it("VT282-2006 | call setDefault and getDefault |" + scnid, function() {
		displayObjective("VT282-2006 | call setDefault and getDefault |");
		dispTestSteps("Auto Test");
		    Rho.Barcode.setDefault(objSCN);
		    var defaultobj = Rho.Barcode.getDefault();
			expect(scnid).toEqual(defaultobj.getProperty('scannerType'));
	});

	it("VT282-2006A | set and get using Default |" + scnid, function() {
		displayObjective("VT282-2006A | set and get using Default |");
		dispTestSteps("Auto Test");
		    Rho.Barcode.setDefault(objSCN);
		    var defaultobj = Rho.Barcode.getDefault();
			expect(scnid).toEqual(defaultobj.getProperty('scannerType'));
	});
})(enumData[j]);
}
});


describe("Enumerate Scanner ", function() {
	var enumObjCount = false;
	var enumCallback = function (enumobj){
		enumobj.length>0 ? enumObjCount=true : enumObjCount=false
	};

	beforeEach(function() {
		enumObjCount = false;
	});

	it("Enumerate Scanner callback as function", function() {
		displayObjective("Enumerate Scanner callback as function");
		dispTestSteps("Auto Test");
		runs(function() {
			Rho.Barcode.enumerate(enumCallback);
		});
		waitsFor(function(){
			return enumObjCount;
		});
		runs(function(){
			expect(enumObjCount).toEqual(true);
		});
	});

	it("Enumerate Scanner with anonymous function as callback", function() {
		displayObjective("Enumerate Scanner with anonymous function as callback");
		dispTestSteps("Auto Test");
		runs(function() {
			Rho.Barcode.enumerate(function(obj){
				enumCallback(obj);
			});
		});
		waitsFor(function(){
			return enumObjCount;
		});
		runs(function(){
			expect(enumObjCount).toEqual(true);
		});
 	});

	it("Enumerate Scanners without callback (Synchronous Access)", function() {
		displayObjective("Enumerate Scanners without callback (Synchronous Access)");
		dispTestSteps("Auto Test");
		runs(function() {
			var obj = Rho.Barcode.enumerate();
			callBackfired = enumCallback(obj);
			expect(enumObjCount).toEqual(true);
		});
 	});
 	
});