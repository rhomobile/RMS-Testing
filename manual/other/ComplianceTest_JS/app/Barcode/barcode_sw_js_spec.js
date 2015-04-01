var platformSupported = ["APPLE", "ANDROID"];

	describe("Barcode JS Test", function() {
		if(platformSupported.indexOf(Rho.System.platform)!= -1){

		var ENABLE8K = 8000;
		var enableFlag = false;
		var decodeFlag = false;
		var readFlag = false;

		var callbacktake = function (data){
			dispVerificationStatus(JSON.stringify(data));
		}

		var callbackenable = function (data){
			dispVerificationStatus(JSON.stringify(data).replace(/[,]/g,'<br />'));
		}

		enumData = Rho.Barcode.enumerate();

	   for (var j = 0;j<enumData.length;j++){

	   (function(objSCN){ 

	   		var scnid = objSCN.getProperty('scannerType');
	   		var scntype = objSCN.getProperty('scannerType');
			var reticleType = (objSCN.friendlyName == "2D Imager" && isAndroid ? "hardwareReticle" : "softwareReticle");

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

		it("VT200-0340 | Call setDefault with SCN1 and take |"+ scnid, function() {
			displayObjective("VT200-0340 | Call setDefault with SCN1and take");
			dispTestSteps("wait for viewfinder to come automatically for " + scnid + " Scan any barcode");
			dispExpectedResult("Code128 barcode should decode and retrun value should be decoded data and status");
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

		it("VT200-0341 | take with picklist " + reticleType + ", scanTimeout 7000 and callback |"+ scnid, function() {
			displayObjective("VT200-0341 | take with picklist " + reticleType + ", scanTimeout 7000 and callback |");
			dispTestSteps("Wait for scanner to start and check for picklist as " + reticleType + " with " + scnid);
			dispExpectedResult("only the barcode in the center of the image is decoded for picklistMode as " + reticleType);
			_result.waitToRunTest();
			runs(function() {
				objSCN.take({'scanTimeout':7000,'picklistMode':reticleType},callbackenable);
				setTimeout(function() {
					enableFlag = true;
				}, ENABLE8K);
			});
			waitsFor(function() {
				return enableFlag;
			}, '9sec wait to enable the Scanner', 9000);
			_result.waitForResponse();
		});

		it("VT200-0343 | Take with callback as anonymous function |"+ scnid, function() {
			displayObjective("VT200-0343 | Take with callback as anonymous function|");
			dispTestSteps("Scan any barcode with" + scnid);
			dispExpectedResult("Data of barcode and status as Ok should be returned");
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

		it("VT200-0346 | Call getAllProperties() without callback(Sync Access) |"+ scnid, function() {
			displayObjective("VT200-0346 | Call getAllProperties() without callback(Sync Access) |");
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

		it("VT200-0347 | call getSupportedProperties() with function callback |"+ scnid + scntype, function() {
			displayObjective("VT200-0347 | call getSupportedProperties() with function callback |");
			dispTestSteps("check for all the supported propertylist for scanner" + scnid);
			dispExpectedResult("all the supported properties should return in function callback");
			_result.waitToRunTest();
			runs(function() {
				objSCN.getSupportedProperties(function(data){dispVerificationStatus(JSON.stringify(data));});
				setTimeout(function() {             
					enableFlag = true;
				}, ENABLE8K);
			});
			waitsFor(function() {
				return enableFlag;
			}, '2sec wait to enable the Scanner', 9000);

			runs(function() {		
				objSCN.getSupportedProperties(callbackenable);							
			});
			_result.waitForResponse();
			runs(function() {
				objSCN.disable();
			});
		});

		it("VT200-0524 | Take with callback as function |"+ scnid, function() {
			displayObjective("VT200-0524 | Take with callback as function|");
			dispTestSteps("Wait for scanner to start and scan any barcode after strating scanner" + scnid);
			dispExpectedResult("Scanner should start comeup automatically and Decoded data and status only should be returned ");
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

		it("VT200-0525 | Take with callback as function and don't scan cancel it"+ scnid, function() {
			displayObjective("VT200-0525 | Take with callback as function and don't scan cancel it|");
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

		it("VT200-0526 | Call getAllProperties() with async callback |"+ scnid, function() {
			displayObjective("VT200-0526 | Call getAllProperties() with async callback |");
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

		it("VT200-0527 | call getAllProperties() with anonymous callback |"+ scnid, function() {
			displayObjective("VT200-0527 | call getAllProperties() with anonymous callback |");
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

		it("VT200-0528 | call getSupportedProperties() with anonymous callback |"+ scnid, function() {
			displayObjective("VT200-0528 | call getSupportedProperties() with anonymous callback |");
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

		it("VT200-0529 | call getSupportedProperties() with async callback |"+ scnid, function() {
			displayObjective("VT200-0529 | call getSupportedProperties() with async callback |");
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

		it("VT200-0530 | call getProperties() with scannerType without callback |"+ scnid, function() {
			displayObjective("VT200-0530 | call getProperties() with scannerType without callback|");
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

		it("VT200-0531 | call getProperties() with scannerType with callback |"+ scnid, function() {
			displayObjective("VT200-0531 | call getProperties() with scannerType with callback|");
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

		it("VT200-0532 | call getProperty() with scannerType with anonymous callback |"+ scnid, function() {
			displayObjective("VT200-0532 | call getProperty() with scannerType with anonymous callback|");
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

		it("VT200-0533 | call setDefault and getDefault |" + scnid, function() {
			displayObjective("VT200-0533 | call setDefault and getDefault |");
			dispTestSteps("Auto Test");
			    Rho.Barcode.setDefault(objSCN);
			    var defaultobj = Rho.Barcode.getDefault();
				expect(scnid).toEqual(defaultobj.getProperty('scannerType'));
		});
	})(enumData[j]);
	}
	}else{
		it("Your Platform/Device does not support this feature", function(){

		});
	}
});

