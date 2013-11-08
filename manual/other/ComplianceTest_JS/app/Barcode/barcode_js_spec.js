describe("Barcode Manual Test", function() {
	
	var ENABLE8K = 8000;
	var ENABLE1K = 1000;
	var enumData = Rho.Barcode.enumerate();
	var enableFlag = false;
	var decodeFlag = false;
	var readFlag = false;
	var isAndroid = false;
	
	if(Rho.System.platform == 'ANDROID')
	{
		ENABLE8K = 0; ENABLE1K = 0;
		isAndroid = true;
	}

	var callbackenable = function (data){
			enablecallbackdata(JSON.stringify(data).replace(/[,]/g,'<br />'));
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
				document.getElementById("actResult").innerHTML = "init";
				enablecallbackdata(decodedata);
			});

			afterEach(function() {
				//objSCN.clearAllProperties();
			});

			describe("Barcode Test with "+ scnid +": " + scntype , function() {

				it("VT282-1762 | Enable with callback as function |" + scnid + scntype , function() {

					runs(function()
					{
						setObjective("VT282-1762 |Enable with callback as function|");
						setInstruction("Scan Barcode code128 with " + scnid);
						setExpected("Is returned decoded hash displayed correctly with all data?");
						objSCN.enable({},callbackenable);
						setTimeout(function() {
							enableFlag = true;
						}, ENABLE8K);
					});

					waitsFor(function()
					{
						return enableFlag;
					}, '2sec wait to enable the Scanner', 9000);

					runs(function()
					{
						waitsFor(function() {
						return document.getElementById("actResult").innerHTML != "init";
						}, "Timed out waiting for tester to respond", 300000);
						runs(function() {
						expect("pass").toEqual(document.getElementById("actResult").innerHTML);
						});
					});
				});

				it("VT282-1764 | Enable with alldecoders enabled and callback as function URL |"+ scnid + scntype, function() {
					
					runs(function()
					{
						setObjective("VT282-1764 | Enable with alldecoders enabled and callback as function |");
						setInstruction("Scan code93 and MSI barcode with " + scnid);
						setExpected("Is decoded data comes after scanning code93 and MSI?");
						objSCN.enable({'allDecoders':'true'},callbackenable);
						setTimeout(function() {
							enableFlag = true;
						}, ENABLE1K);
					});

					waitsFor(function()
					{
						return enableFlag;
					}, '2sec Wait to enable the Scanner', 2000);

					runs(function()
					{
						waitsFor(function() {
						return document.getElementById("actResult").innerHTML != "init";
						}, "Timed out waiting for tester to respond", 300000);
						runs(function() {
						expect("pass").toEqual(document.getElementById("actResult").innerHTML);
						});			
					});
				});

				it("VT282-1765 | Enable with picklist " + reticleType + ", scanTimeout 3000 and callback as function |"+ scnid + scntype, function() {
					

					runs(function()
					{
						setObjective("VT282-1765 | Enable with picklist " + reticleType + ", scanTimeout 3000 and callback as function ");
						setInstruction("don't scan and check scanTimeout as 3000 and check picklistMode as " + reticleType + " with " +  scnid);
						setExpected("Baeam or viewfinder will stop automatically after 3 second? \n only the barcode in the center of the image is decoded for picklistMode as " + reticleType);
						objSCN.enable({'scanTimeout':'3000','picklistMode':reticleType},callbackenable);
						setTimeout(function() {
							enableFlag = true;
						}, ENABLE1K);
					});

					waitsFor(function()
					{
						return enableFlag;
					}, '2sec Wait to enable the Scanner', 2000);

					runs(function()
					{
						waitsFor(function() {
						return document.getElementById("actResult").innerHTML != "init";
						}, "Timed out waiting for tester to respond", 300000);
						runs(function() {
						expect("pass").toEqual(document.getElementById("actResult").innerHTML);
						});	
					});

				});

				it("VT282-1766 | Enable with alldecoders disabled, code128 as enabled without callback |"+ scnid + scntype, function() {
					
					runs(function()
					{
						setObjective("VT282-1766 | Enable with alldecoders disabled, code128 as enabled without callback");
						setInstruction("putting focus inside textbox and Scan code39 barcode then scan code128 barcode with " + scnid);
						setExpected("only code128 barcode should decode");
						objSCN.enable({'allDecoders':false,'code128':true});
						setTimeout(function() {
							enableFlag = true;
						}, ENABLE1K);
					});

					waitsFor(function()
					{
						return enableFlag;
					}, '2sec Wait to enable the Scanner', 2000);

					runs(function()
					{		
						waitsFor(function() {
						return document.getElementById("actResult").innerHTML != "init";
						}, "Timed out waiting for tester to respond", 300000);
						runs(function() {
						expect("pass").toEqual(document.getElementById("actResult").innerHTML);
						objSCN.allDecoders = true;
						});	
					});
				});


				it("VT282-1770 | Enable with picklist " + reticleType + ", scanTimeout 3000 and callback as anonymous function |"+ scnid, function() {
					
					runs(function()
					{
						setObjective("VT282-1770 | Enable with picklist " + reticleType + ", scanTimeout 3000 and callback as anonymous function |");
						setInstruction("check functionality of scanTimeout as 3000 and picklistMode " + reticleType + " with " + scnid);
						setExpected("Baeam or viewfinder will stop automatically after 3 second? only the barcode in the center of the image is decoded for picklistMode as " + reticleType);
						//objSCN.enable({'scanTimeout':7000,'picklistMode':reticleType},function(data){enablecallbackdata(JSON.stringify(data));});
						objSCN.enable({'scanTimeout':3000,'picklistMode':reticleType},function(data){enablecallbackdata(JSON.stringify(data));});
						setTimeout(function() {
							enableFlag = true;
						}, ENABLE1K);
					});

					waitsFor(function()
					{
						return enableFlag;
					}, '2sec Wait to enable the Scanner', 2000);

					runs(function()
					{	
						waitsFor(function() {
						return document.getElementById("actResult").innerHTML != "init";
						}, "Timed out waiting for tester to respond", 300000);
						runs(function() {
						expect("pass").toEqual(document.getElementById("actResult").innerHTML);
						objSCN.disable();
						});		
					});
				});

				it("VT282-1778 | call setDefault with" + scnid + "and take |", function() {

					runs(function()
					{
						setObjective("VT282-1778 | call setDefault and take");
						setInstruction("Take method wait for scanner beam or viewfinder to come automatically without pressing hadrware trigger " + scnid + " Scan code 128 barcode");
						setExpected("code128 barcode should decode and retrun value should be decoded data and status");
						Rho.Barcode.setDefault(objSCN);
						Rho.Barcode.take({},callbackenable);
						setTimeout(function() {
							enableFlag = true;
						}, ENABLE8K);
					});

					waitsFor(function()
					{
						return enableFlag;
					}, '2sec wait to enable the Scanner', 9000);

					runs(function()
					{		
						objSCN.allDecoders = true;
						waitsFor(function() {
						return document.getElementById("actResult").innerHTML != "init";
						}, "Timed out waiting for tester to respond", 300000);
						runs(function() {
						expect("pass").toEqual(document.getElementById("actResult").innerHTML);
						objSCN.disable();
						});	
					});
				});

				it("VT282-1784 | Start and stop scanner |"+ scnid, function() {
					
					runs(function()
					{
						setObjective("VT282-1784 | Start and stop scanner |");
						setInstruction("Don't press hardware trigger" + scnid);
						setExpected("Scanner beam or viewfinder should comeup automatically and will stop after 8 sec");
						objSCN.enable({},callbackenable);
						setTimeout(function() {
							enableFlag = true;
						}, ENABLE8K);
					});

					waitsFor(function()
					{
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

					waitsFor(function()
					{
						return decodeFlag;
					}, '15sec Wait to Scan the Barcode', 9000);

					runs(function()
					{
						objSCN.stop();
						waitsFor(function() {
						return document.getElementById("actResult").innerHTML != "init";
						}, "Timed out waiting for tester to respond", 300000);
						runs(function() {
						expect("pass").toEqual(document.getElementById("actResult").innerHTML);
						objSCN.disable();
						});
					});
				});

				it("VT282-1793 | take with picklist " + reticleType + ", scanTimeout 10000 and callback |"+ scnid, function() {
					
					runs(function()
					{
						setObjective("VT282-1793 | take with picklist " + reticleType + ", scanTimeout 10000 and callback |");
						setInstruction("Wait for scanner to start and check for picklist as " + reticleType + " with " + scnid);
						setExpected("only the barcode in the center of the image is decoded for picklistMode as " + reticleType);
						setTimeout(function() {
							readFlag = true;
						}, ENABLE8K);

						runs(function() {
							waitsFor(function()
							{
								return readFlag;
							}, '8sec wait to read the instructions', 9000);

							objSCN.take({'scanTimeout':10000,'picklistMode':reticleType},callbackenable);
							setTimeout(function() {
								enableFlag = true;
							}, ENABLE8K);
							});
					});

					waitsFor(function()
					{
						return enableFlag;
					}, '9sec wait to enable the Scanner', 9000);

					runs(function()
					{		
						waitsFor(function() {
						return document.getElementById("actResult").innerHTML != "init";
						}, "Timed out waiting for tester to respond", 300000);
						runs(function() {
						expect("pass").toEqual(document.getElementById("actResult").innerHTML);
						//objSCN.disable();
						});
					});
				});

				it("VT282-1794 | Take with alldecoders disabled, code128 as enabled with callback as function URL |"+ scnid, function() {
				
					runs(function()
					{
						setObjective("VT282-1794 | Take with alldecoders disabled, code128 as enabled with callback as function |");
						setInstruction("scan code39 and then code128 with" + scnid);
						setExpected("Only code128 should be decoded");
						setTimeout(function() {
							readFlag = true;
						}, ENABLE8K);

						runs(function() {
							waitsFor(function()
							{
								return readFlag;
							}, '8sec wait to read the instructions', 9000);

							objSCN.take({'allDecoders':false,'code128':true,'scanTimeout':10000},callbackenable);
							setTimeout(function() {
								enableFlag = true;
							}, ENABLE1K);
							});
					});

					waitsFor(function()
					{
						return enableFlag;
					}, '2sec wait to enable the Scanner', 2000);

					runs(function()
					{		
						waitsFor(function() {
						return document.getElementById("actResult").innerHTML != "init";
						}, "Timed out waiting for tester to respond", 300000);
						runs(function() {
						expect("pass").toEqual(document.getElementById("actResult").innerHTML);
						objSCN.setProperty("allDecoders",true);
						//objSCN.disable();
						});
					});
				});

				it("VT282-1797 | Take with callback as anonymous function |"+ scnid, function() {
					
					runs(function()
					{
						setObjective("VT282-1797 | Take with callback as anonymous function|");
						setInstruction("scan code39 with" + scnid);
						setExpected("data of code39 and status as Ok should be returned");

						setTimeout(function() {
							readFlag = true;
						}, ENABLE8K);

						runs(function() {
							waitsFor(function()
							{
								return readFlag;
							}, '8sec wait to read the instructions', 9000);

							objSCN.take({'scanTimeout':10000},function(data){enablecallbackdata(JSON.stringify(data));});
							setTimeout(function() {
								enableFlag = true;
							}, 4000);
							objSCN.allDecoders = true;
							});
					});

					waitsFor(function()
					{
						return enableFlag;
					}, '2sec wait to enable the Scanner', 5000);

					runs(function()
					{		
						waitsFor(function() {
						return document.getElementById("actResult").innerHTML != "init";
						}, "Timed out waiting for tester to respond", 300000);
						runs(function() {
						expect("pass").toEqual(document.getElementById("actResult").innerHTML);
						objSCN.disable();
						});
					});
				});

				it("VT282-1814 | autotenter true with setproperty |"+ scnid, function() {
					
					runs(function()
					{
						setObjective("VT282-1814 | autotenter true with setproperty | ");
						setInstruction("Put the focus inside textbox and scan code128 barcode with" + scnid);
						setExpected("Barcode data should come inside textbox with an enter at the end, no callback hash should return");
						objSCN.enable();
						setTimeout(function() {
							enableFlag = true;
						}, ENABLE1K);
					});
					waitsFor(function()
					{
						return enableFlag;
					}, '2sec wait to enable the Scanner', 2000);

					runs(function()
					{		
						objSCN.setProperty("autoenter","true");
						waitsFor(function() {
						return document.getElementById("actResult").innerHTML != "init";
						}, "Timed out waiting for tester to respond", 300000);
						runs(function() {
						expect("pass").toEqual(document.getElementById("actResult").innerHTML);
						//objSCN.disable();
						});
					});
				});

				it("VT282-1974 | set decodeSound to local wave file path |"+ scnid, function() {
					
					runs(function()
					{
						setObjective("VT282-1974 | set decodeSound to local wave file path|");
						setInstruction("Scan code128 barcode with" + scnid + "check for the wave file to play(wave file should at application/sdcard folder)");
						setExpected("wave file should play after barcode is decoded");
						objSCN.enable({},callbackenable);
						setTimeout(function() {
							enableFlag = true;
						}, ENABLE1K);
						//dispCurrentProcess("Enabling Scanner");
					});
					waitsFor(function()
					{
						return enableFlag;
					}, '2sec wait to enable the Scanner', 2000);

					runs(function()
					{		
						if(isAndroid)
						{
							objSCN.decodeSound = 'file:///sdcard/decode.wav';
						}
						else
						{
							objSCN.decodeSound = 'file://Application/alarm5.wav';
						}
						waitsFor(function() {
						return document.getElementById("actResult").innerHTML != "init";
						}, "Timed out waiting for tester to respond", 300000);
						runs(function() {
						expect("pass").toEqual(document.getElementById("actResult").innerHTML);
						objSCN.disable();
						});
					});
				});

				it("VT282-1998 | call getAllProperties() without callback(Sync Access) |"+ scnid, function() {
					
					runs(function()
					{
						setObjective("VT282-1998 | call getAllProperties() without callback(Sync Access) |");
						setInstruction("Don't scan and check for all the supported propertylist for scanner" + scnid);
						setExpected("all the supported properties with their default value should return with Sync Access");
						objSCN.enable();
						setTimeout(function() {
							enableFlag = true;
						}, ENABLE8K);
					});
					waitsFor(function()
					{
						return enableFlag;
					}, '2sec wait to enable the Scanner', 9000);

					runs(function()
					{		
						var data = objSCN.getAllProperties();
						callbackenable(data);
						waitsFor(function() {
						return document.getElementById("actResult").innerHTML != "init";
						}, "Timed out waiting for tester to respond", 300000);
						runs(function() {
						expect("pass").toEqual(document.getElementById("actResult").innerHTML);
						//objSCN.disable();
						});
					});
				});

				it("VT282-2009 | call getSupportedProperties() with async callback |"+ scnid + scntype, function() {

					runs(function()
					{
						setObjective("VT282-2009 | call getSupportedProperties() with async callback |");
						setInstruction("check for all the supported propertylist for scanner" + scnid);
						setExpected("all the supported properties should return in async callback");
						objSCN.enable();
						setTimeout(function()
						{
							enableFlag = true;
						}, ENABLE8K);
					});
					waitsFor(function()
					{
						return enableFlag;
					}, '2sec wait to enable the Scanner', 9000);

					runs(function()
					{		
						objSCN.getSupportedProperties(callbackenable);
						waitsFor(function()
						{
							return document.getElementById("actResult").innerHTML != "init";
						}, "Timed out waiting for tester to respond", 300000);
						
						runs(function()
						{
							expect("pass").toEqual(document.getElementById("actResult").innerHTML);
							objSCN.disable();
						});
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
			
		runs(function() {
			var obj = Rho.Barcode.enumerate();
			callBackfired = enumCallback(obj);
			expect(enumObjCount).toEqual(true);
		});
 	});
 	
});