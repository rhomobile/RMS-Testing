describe("Barcode Manual Test", function() {
	
	var ENABLE8K = 8000;
	var ENABLE1K = 1000;
	var enumData = EB.Barcode.enumerate();
	var enableFlag = false;
	var decodeFlag = false;
	var readFlag = false;
	var isAndroid = false;
	
	if(EB.System.platform == 'ANDROID')
	{
		ENABLE8K = 0; ENABLE1K = 0;
		isAndroid = true;
	}

	var callbackenable = function (data){
			dispVerificationStatus(JSON.stringify(data).replace(/[,]/g,'<br />'));
		}

   for (var j = 0;j<enumData.length;j++){

	   (function(objSCN){ 

		   	var scnid = objSCN.getProperty('ID');
		   	var scntype = objSCN.getProperty('scannerType');
		   	var reticleType = (objSCN.friendlyName == "2D Imager" && isAndroid ? "hardwareReticle" : "softwareReticle");

			beforeEach(function() {
				enableFlag = false;
				decodeFlag = false;
				readFlag = false;
				decodedata ='';
				document.getElementById("verificationResult").innerHTML = "";
			});

			afterEach(function() {
				//objSCN.clearAllProperties();
			});

			describe("Barcode Test with "+ scnid +": " + scntype , function() {
				if (EB.System.isMotorolaDevice == true) 
				{
					it("VT200-0591 | Enable with callback as function |" + scnid + scntype , function() {
						displayObjective("VT200-0591 |Enable with callback as function|");
						dispTestSteps("Scan Barcode code128 with " + scnid);
						dispExpectedResult("Is returned decoded hash displayed correctly with all data?");
						_result.waitToRunTest();
						runs(function(){
							objSCN.enable({},callbackenable);
							setTimeout(function() {
								enableFlag = true;
							}, ENABLE8K);
						});
						waitsFor(function(){
							return enableFlag;
						}, '2sec wait to enable the Scanner', 9000);
						_result.waitForResponse();
					});

					it("VT200-0592 | Enable with alldecoders enabled and callback as function URL |"+ scnid + scntype, function() {
						displayObjective("VT200-0592 | Enable with alldecoders enabled and callback as function |");
						dispTestSteps("Scan code93 and MSI barcode with " + scnid);
						dispExpectedResult("Is decoded data comes after scanning code93 and MSI?");
						_result.waitToRunTest();
						runs(function(){
							objSCN.enable({'allDecoders':'true'},callbackenable);
							setTimeout(function() {
								enableFlag = true;
							}, ENABLE1K);
						});
						waitsFor(function(){
							return enableFlag;
						}, '2sec Wait to enable the Scanner', 2000);
						_result.waitForResponse();
					});

					it("VT200-0593 | Enable with picklist " + reticleType + ", scanTimeout 3000 and callback as function |"+ scnid + scntype, function() {
						displayObjective("VT200-0593 | Enable with picklist " + reticleType + ", scanTimeout 3000 and callback as function ");
						dispTestSteps("don't scan and check scanTimeout as 3000 and check picklistMode as " + reticleType + " with " +  scnid);
						dispExpectedResult("Baeam or viewfinder will stop automatically after 3 second? \n only the barcode in the center of the image is decoded for picklistMode as " + reticleType);
						_result.waitToRunTest();
						runs(function(){
							objSCN.enable({'scanTimeout':'3000','picklistMode':reticleType},callbackenable);
							setTimeout(function() {
								enableFlag = true;
							}, ENABLE1K);
						});
						waitsFor(function() {
							return enableFlag;
						}, '2sec Wait to enable the Scanner', 2000);
						_result.waitForResponse();
					});

					it("VT200-0594| Enable with alldecoders disabled, code128 as enabled without callback |"+ scnid + scntype, function() {
						displayObjective("VT200-0594 | Enable with alldecoders disabled, code128 as enabled without callback");
						dispTestSteps("putting focus inside textbox and Scan code39 barcode then scan code128 barcode with " + scnid);
						dispExpectedResult("only code128 barcode should decode");
						_result.waitToRunTest();
						runs(function() {
							objSCN.enable({'allDecoders':false,'code128':true});
							setTimeout(function() {
								enableFlag = true;
							}, ENABLE1K);
						});
						waitsFor(function() {
							return enableFlag;
						}, '2sec Wait to enable the Scanner', 2000);
						_result.waitForResponse();
						runs(function() {
							objSCN.allDecoders = true;
						});
					});

					it("VT200-0595 | Enable with picklist " + reticleType + ", scanTimeout 3000 and callback as anonymous function |"+ scnid, function() {
						displayObjective("VT200-0595| Enable with picklist " + reticleType + ", scanTimeout 3000 and callback as anonymous function |");
						dispTestSteps("check functionality of scanTimeout as 3000 and picklistMode " + reticleType + " with " + scnid);
						dispExpectedResult("Baeam or viewfinder will stop automatically after 3 second? only the barcode in the center of the image is decoded for picklistMode as " + reticleType);
						_result.waitToRunTest();
						runs(function() {
							objSCN.enable({'scanTimeout':3000,'picklistMode':reticleType},function(data){enablecallbackdata(JSON.stringify(data));});
							setTimeout(function() {
								enableFlag = true;
							}, ENABLE1K);
						});
						waitsFor(function(){
							return enableFlag;
						}, '2sec Wait to enable the Scanner', 2000);
						_result.waitForResponse();
						runs(function(){
							objSCN.disable();
						});
					});
				}

					it("VT200-0596| call setDefault with" + scnid + "and take |", function() {
						displayObjective("VT200-0596 | call setDefault and take");
						dispTestSteps("Take method wait for scanner beam or viewfinder to come automatically without pressing hadrware trigger " + scnid + " Scan code 128 barcode");
						dispExpectedResult("code128 barcode should decode and retrun value should be decoded data and status");
						_result.waitToRunTest();
						runs(function(){
							EB.Barcode.setDefault(objSCN);
							EB.Barcode.take({},callbackenable);
							setTimeout(function() {
								enableFlag = true;
							}, ENABLE8K);
						});
						waitsFor(function(){
							return enableFlag;
						}, '2sec wait to enable the Scanner', 9000);
						_result.waitForResponse();
						runs(function(){		
							objSCN.allDecoders = true;
							objSCN.disable();
						});
					});

					it("VT200-xxx | Start and stop scanner |"+ scnid, function() {
						displayObjective("VT200-xxx | Start and stop scanner |");
						dispTestSteps("Don't press hardware trigger" + scnid);
						dispExpectedResult("Scanner beam or viewfinder should comeup automatically and will stop after 8 sec");
						_result.waitToRunTest();
						runs(function()
						{
							objSCN.enable({},callbackenable);
							setTimeout(function() {
								enableFlag = true;
							}, ENABLE8K);
						});

						waitsFor(function(){
							return enableFlag;
						}, '2sec wait to enable the Scanner', 9000);

						runs(function()
						{		
							objSCN.scanTimeout = 10000;
							objSCN.start();
							setTimeout(function() {
								decodeFlag = true;
							}, 8000);
						});

						waitsFor(function() {
							return decodeFlag;
						}, '15sec Wait to Scan the Barcode', 9000);

						runs(function(){
							objSCN.stop();
						});
						_result.waitForResponse();
						runs(function(){
							objSCN.disable();
						});
					});

					it("VT200-0597 | take with picklist " + reticleType + ", scanTimeout 10000 and callback |"+ scnid, function() {
						displayObjective("VT200-0597 | take with picklist " + reticleType + ", scanTimeout 10000 and callback |");
						dispTestSteps("Wait for scanner to start and check for picklist as " + reticleType + " with " + scnid);
						dispExpectedResult("only the barcode in the center of the image is decoded for picklistMode as " + reticleType);
						_result.waitToRunTest();
						runs(function() {
							objSCN.take({'scanTimeout':10000,'picklistMode':reticleType},callbackenable);
							setTimeout(function() {
								enableFlag = true;
							}, ENABLE8K);
						});
						waitsFor(function() {
							return enableFlag;
						}, '9sec wait to enable the Scanner', 9000);
						_result.waitForResponse();
					});

					it("VT200-0598 | Take with alldecoders disabled, code128 as enabled with callback as function URL |"+ scnid, function() {
						displayObjective("VT200-0598 | Take with alldecoders disabled, code128 as enabled with callback as function |");
						dispTestSteps("scan code39 and then code128 with" + scnid);
						dispExpectedResult("Only code128 should be decoded");
						_result.waitToRunTest();
						runs(function(){
							objSCN.take({'allDecoders':false,'code128':true,'scanTimeout':10000},callbackenable);
							setTimeout(function() {
								enableFlag = true;
							}, ENABLE1K);
						});
						waitsFor(function() {
							return enableFlag;
						}, '2sec wait to enable the Scanner', 2000);
						_result.waitForResponse();
						runs(function(){	
							objSCN.setProperty("allDecoders",true);
						});
					});

					it("VT200-0599 | Take with callback as anonymous function |"+ scnid, function() {
						displayObjective("VT200-0599 | Take with callback as anonymous function|");
						dispTestSteps("scan code39 with" + scnid);
						dispExpectedResult("data of code39 and status as Ok should be returned");
						_result.waitToRunTest();
						runs(function(){
							objSCN.take({'scanTimeout':10000},function(data){enablecallbackdata(JSON.stringify(data));});
							setTimeout(function() {
								enableFlag = true;
							}, 4000);
							objSCN.allDecoders = true;
						});
						waitsFor(function(){
							return enableFlag;
						}, '2sec wait to enable the Scanner', 5000);
						_result.waitForResponse();
						runs(function() {
							objSCN.disable();
						});
					});

				if (EB.System.isMotorolaDevice == true) 
				{
					it("VT200-0600 | autotenter true with setproperty |"+ scnid, function() {
						displayObjective("VT200-0600 | autotenter true with setproperty | ");
						dispTestSteps("Put the focus inside textbox and scan code128 barcode with" + scnid);
						dispExpectedResult("Barcode data should come inside textbox with an enter at the end, no callback hash should return");
						_result.waitToRunTest();
						runs(function() {
							objSCN.enable();
							setTimeout(function() {
								enableFlag = true;
							}, ENABLE1K);
						});
						waitsFor(function() {
							return enableFlag;
						}, '2sec wait to enable the Scanner', 2000);
						runs(function() {		
							objSCN.setProperty("autoenter","true");
						});
						_result.waitForResponse();
					});

					it("VT200-0601 | set decodeSound to local wave file path |"+ scnid, function() {
						displayObjective("VT200-0601 | set decodeSound to local wave file path|");
						dispTestSteps("Scan code128 barcode with" + scnid + "check for the wave file to play(wave file should at application/sdcard folder)");
						dispExpectedResult("wave file should play after barcode is decoded");
						_result.waitToRunTest();
						runs(function() {
							objSCN.enable({},callbackenable);
							setTimeout(function() {
								enableFlag = true;
							}, ENABLE1K);
						});
						waitsFor(function() {
							return enableFlag;
						}, '2sec wait to enable the Scanner', 2000);

						runs(function() {		
							if(isAndroid) {
								objSCN.decodeSound = 'file://sdcard/decode.wav';
							}
							else {
								objSCN.decodeSound = 'file://Application/alarm5.wav';
							}
							_result.waitForResponse();
							runs(function() {
								objSCN.disable();
							});
						});
					});
				}
				it("VT200-0602 | call getAllProperties() without callback(Sync Access) |"+ scnid, function() {
					displayObjective("VT200-0602 | call getAllProperties() without callback(Sync Access) |");
					dispTestSteps("Don't scan and check for all the supported propertylist for scanner" + scnid);
					dispExpectedResult("all the supported properties with their default value should return with Sync Access");
					_result.waitToRunTest();
					runs(function() {
						objSCN.enable();
						setTimeout(function() {
							enableFlag = true;
						}, ENABLE8K);
					});
					waitsFor(function() {
						return enableFlag;
					}, '2sec wait to enable the Scanner', 9000);
					runs(function() {		
						var data = objSCN.getAllProperties();
						callbackenable(data);
					});
					_result.waitForResponse();
				});

				it("VT200-0603 | call getSupportedProperties() with async callback |"+ scnid + scntype, function() {
					displayObjective("VT200-0603 | call getSupportedProperties() with async callback |");
					dispTestSteps("check for all the supported propertylist for scanner" + scnid);
					dispExpectedResult("all the supported properties should return in async callback");
					_result.waitToRunTest();
					runs(function() {
						objSCN.enable();
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
		runs(function() {
			EB.Barcode.enumerate(enumCallback);
		});
		waitsFor(function(){
			return enumObjCount;
		});
		runs(function(){
			expect(enumObjCount).toEqual(true);
		});
	});

	it("Enumerate Scanner with anonymous function as callback", function() {		
		runs(function() {
			EB.Barcode.enumerate(function(obj){
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
		runs(function() {
			var obj = EB.Barcode.enumerate();
			callBackfired = enumCallback(obj);
			expect(enumObjCount).toEqual(true);
		});
 	});
 	
});