describe("Barcode Manual Test", function() {
	
	var ENABLE8K = 8000;
	var ENABLE1K = 1000;
	var enumData = Rho.Barcode.enumerate();
	var enableFlag = false;
	var decodeFlag = false;
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
				decodedata ='';
				document.getElementById("actResult").innerHTML = "init";
				enablecallbackdata(decodedata);
			});

			afterEach(function() {
				//objSCN.clearAllProperties();
			});

			describe("Barcode Test with "+ scnid +": " + scntype , function() {

				//  Able to Disconnect Trigger
				//  Able to Reconnect Trigger

				it("VT282-1762 | Enable with callback as function |" + scnid + scntype , function() {

					runs(function()
					{
						setObjective("VT282-1762 |Enable with callback as function|");
						setInstruction("Scan Barcode code128 with " + scnid);
						setExpected("Is retruned decoded hash displayed correctly with all data?");
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
						objSCN.disable();
						});
					});
				});

				it("VT282-1763 | Enable without callback and without any param (Synchronous Access) |"+ scnid + scntype , function() {
					
					runs(function()
					{
						setObjective("VT282-1763 | Enable without callback and without any param (Synchronous Access) |");
						setInstruction("Scan Barcode code128 after tapping inside textbox with " + scnid);
						setExpected("Is decoded data comes inside textbox?");
						objSCN.enable();
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
						});	
					});
				});

				it("VT282-1769 | Enable with callback as anonymous function |", function() {
					
					runs(function()
					{
						setObjective("VT282-1769 | Enable with callback as anonymous function|");
						setInstruction("Scan code39 Barcode with " + scnid);
						setExpected("Is retruned decoded hash displayed correctly with all data (anonymous callback)?");
						objSCN.enable({},function(data){callbackenable(data);});
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
						objSCN.allDecoders = true;
						waitsFor(function() {
						return document.getElementById("actResult").innerHTML != "init";
						}, "Timed out waiting for tester to respond", 300000);
						runs(function() {
						expect("pass").toEqual(document.getElementById("actResult").innerHTML);
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
						});		
					});
				});

				it("VT282-1771 | set picklist " + reticleType + ", scanTimeout 3000 after calling enable |", function() {
					
					runs(function()
					{
						setObjective("VT282-1771 | set picklist " + reticleType + ", scanTimeout 3000 after calling enable |");
						setInstruction("check functionality of scanTimeout as 3000 and picklistMode " + reticleType + " with " + scnid);
						setExpected("Baeam or viewfinder will stop automatically after 3 second? only the barcode in the center of the image is decoded for picklistMode as " + reticleType);
						objSCN.enable({},callbackenable);
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
						objSCN.scanTimeout = 3000;
						objSCN.picklistMode = reticleType;
						waitsFor(function() {
						return document.getElementById("actResult").innerHTML != "init";
						}, "Timed out waiting for tester to respond", 300000);
						runs(function() {
						expect("pass").toEqual(document.getElementById("actResult").innerHTML);
						});		
					});
				});

				it("VT282-1773 | set alldecoders false, code128 as true after enable |"+ scnid, function() {
					
					runs(function()
					{
						setObjective("VT282-1773 | set alldecoders false, code128 as true after enable |");
						setInstruction("Scan code39 barcode then scan code128 barcode with " + scnid);
						setExpected("only code128 barcode should decode");
						objSCN.enable({},callbackenable);
						setTimeout(function() {
							enableFlag = true;
						}, ENABLE1K);
					});

					waitsFor(function()
					{
						return enableFlag;
					}, '1sec Wait to enable the Scanner', 2000);

					runs(function()
					{		
						objSCN.allDecoders = false;
						objSCN.code128 = true;
						waitsFor(function() {
						return document.getElementById("actResult").innerHTML != "init";
						}, "Timed out waiting for tester to respond", 300000);
						runs(function() {
						expect("pass").toEqual(document.getElementById("actResult").innerHTML);
						objSCN.allDecoders = true;
						objSCN.disable();
						});		
					});
				});


				it("VT282-1778/79 | call setDefault with" + scnid + "and take |", function() {

					runs(function()
					{
						setObjective("VT282-1778/79 | call setDefault and take");
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

				it("VT282-1781/82 | call setDefault and enable |"+ scnid, function() {
					
					runs(function()
					{	
						setObjective("VT282-1781/82 | call setDefault and enable");
						setInstruction("press hadrware trigger to start" + scnid);
						setExpected("code128 barcode should decode and retrun value should be displayed correctly with all data");
						Rho.Barcode.setDefault(objSCN);
						Rho.Barcode.enable({},callbackenable);
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

				it("VT282-1790 | take with callback as function |"+ scnid, function() {
					
					runs(function()
					{
						setObjective("VT282-1790 | take with callback as function|");
						setInstruction("Don't press hardware trigger to start scanner and scan code128 after strating scanner" + scnid);
						setExpected("Scanner beam or viewfinder should comeup automatically and Decoded data and status only should be returned ");
						objSCN.take({},callbackenable);
						setTimeout(function() {
							enableFlag = true;
						}, 4000);
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
						//objSCN.disable();
						});
					});
				});

				it("VT282-1791 | take with callback as function and don't scan|"+ scnid, function() {
					
					runs(function()
					{
						setObjective("VT282-1791 | take with callback as function and don't scan|");
						setInstruction("Don't scan any barcode after scanner starts automatically and wait for scanner to stop" + scnid);
						setExpected("Decoded data should come as nil and status should be cancel and Beam ore viewfinder will go after 10 sec ");
						objSCN.take({'scanTimeout':10000},callbackenable);
						setTimeout(function() {
							enableFlag = true;
						}, 4000);
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
						//objSCN.disable();
						});
					});
				});

				it("VT282-1792 | take with alldecoders enabled and callback |"+ scnid, function() {
				
					runs(function()
					{
						setObjective("VT282-1792 | take with alldecoders enabled and callback|");
						setInstruction("scan code93 after strating scanner automatically" + scnid);
						setExpected("Decoded data and status only should be returned ");
						objSCN.take({'allDecoders':true,'scanTimeout':10000},callbackenable);
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
						waitsFor(function() {
						return document.getElementById("actResult").innerHTML != "init";
						}, "Timed out waiting for tester to respond", 300000);
						runs(function() {
						expect("pass").toEqual(document.getElementById("actResult").innerHTML);
						//objSCN.disable();
						});
					});
				});

				it("VT282-1793 | take with picklist " + reticleType + ", scanTimeout 10000 and callback |"+ scnid, function() {
					
					runs(function()
					{
						setObjective("VT282-1793 | take with picklist " + reticleType + ", scanTimeout 10000 and callback |");
						setInstruction("check for picklist as " + reticleType + " with " + scnid);
						setExpected("only the barcode in the center of the image is decoded for picklistMode as " + reticleType);
						objSCN.take({'scanTimeout':10000,'picklistMode':reticleType},callbackenable);
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
						objSCN.take({'allDecoders':false,'code128':true,'scanTimeout':10000},callbackenable);
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
						objSCN.take({'scanTimeout':10000},function(data){enablecallbackdata(JSON.stringify(data));});
						setTimeout(function() {
							enableFlag = true;
						}, 4000);
						objSCN.allDecoders = true;
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

				it("VT282-1800 | AllDecoders true with setproperty and nocallback |"+ scnid, function() {
					
					runs(function()
					{
						setObjective("VT282-1800 | AllDecoders true with setproperty and nocallback |");
						setInstruction("Scan code93 Barcode with" + scnid);
						setExpected("Barcode should decode");
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
						objSCN.setProperty('allDecoders','true');
						waitsFor(function() {
						return document.getElementById("actResult").innerHTML != "init";
						}, "Timed out waiting for tester to respond", 300000);
						runs(function() {
						expect("pass").toEqual(document.getElementById("actResult").innerHTML);
						//objSCN.disable();
						});
					});
				});

				it("VT282-1801 | AllDecoders false with setproperty and nocallback |"+ scnid, function() {

					runs(function()
					{
						setObjective("VT282-1801 | AllDecoders false with setproperty and nocallback ");
						setInstruction("Scan code128 and code39 Barcode with" + scnid);
						setExpected("non of Barcode should decode");
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
						objSCN.setProperty("allDecoders","false");
						waitsFor(function() {
						return document.getElementById("actResult").innerHTML != "init";
						}, "Timed out waiting for tester to respond", 300000);
						runs(function() {
						expect("pass").toEqual(document.getElementById("actResult").innerHTML);
						objSCN.setProperty("allDecoders","true");
						//objSCN.disable();
						});
					});
				});


				it("VT282-1814 | autotenter true with setproperty |"+ scnid, function() {
					
					runs(function()
					{
						setObjective("VT282-1814 | autotenter true with setproperty | ");
						setInstruction("Put the focus inside textbox and scan code128 barcode with" + scnid);
						setExpected("Barcode data should come inside textbox with an enter at the end, no callback hash should retrun");
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

				it("VT282-1815 | autoenter false with setproperty |"+ scnid, function() {
					
					runs(function()
					{
						setObjective("VT282-1815 | autoenter false with setproperty |");
						setInstruction("Put the focus inside textbox and scan code128 barcode with" + scnid);
						setExpected("Barcode data should come inside textbox without an enter at end, no callback hash should retrun");
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
						objSCN.setProperty("autoenter","false");
						waitsFor(function() {
						return document.getElementById("actResult").innerHTML != "init";
						}, "Timed out waiting for tester to respond", 300000);
						runs(function() {
						expect("pass").toEqual(document.getElementById("actResult").innerHTML);
						//objSCN.disable();
						});
					});
				});


				it("VT282-1816 | autotab true with setproperty |"+ scnid, function() {
					
					runs(function()
					{
						setObjective("VT282-1816 | autotab true with setproperty |");
						setInstruction("Put the focus inside textbox and scan code128 barcode with" + scnid);
						setExpected("Barcode data should come inside textbox with a tab at the end, no callback hash should retrun");
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
						objSCN.setProperty('autotab',true);
						waitsFor(function() {
						return document.getElementById("actResult").innerHTML != "init";
						}, "Timed out waiting for tester to respond", 300000);
						runs(function() {
						expect("pass").toEqual(document.getElementById("actResult").innerHTML);
						//objSCN.disable();
						});
					});
				});

				it("VT282-1817 | autotab false with setproperty |"+ scnid, function() {
					

					runs(function()
					{
						setObjective("VT282-1817 | autotab false with setproperty |");
						setInstruction("Put the focus inside textbox and scan code128 barcode with" + scnid);
						setExpected("Barcode data should come inside textbox without a tab at the end, no callback hash should retrun");
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
						objSCN.setProperty('autotab',false);
						waitsFor(function() {
						return document.getElementById("actResult").innerHTML != "init";
						}, "Timed out waiting for tester to respond", 300000);
						runs(function() {
						expect("pass").toEqual(document.getElementById("actResult").innerHTML);
						//objSCN.disable();
						});
					});
				});

				it("VT282-1826 | Enable with autoenter and no callback |"+ scnid, function() {
					
					runs(function()
					{
						setObjective("VT282-1826 | Enable with autoenter and no callback |");
						setInstruction("Put the focus inside textbox and scan code128 barcode with" + scnid);
						setExpected("Barcode data should come inside textbox with an enter at the end, no callback hash should retrun");
						objSCN.enable({"autoenter":true});
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
						waitsFor(function() {
						return document.getElementById("actResult").innerHTML != "init";
						}, "Timed out waiting for tester to respond", 300000);
						runs(function() {
						expect("pass").toEqual(document.getElementById("actResult").innerHTML);
						//objSCN.disable();
						});
					});
				});

				it("VT282-1964 | set decodeDuration to 5000 |"+ scnid, function() {
					
					runs(function()
					{
						setObjective("VT282-1964 | set decodeDuration to 5000 |");
						setInstruction("Scan code128 barcode with" + scnid + "check for the decode sound duration");
						setExpected("the decode sound should should play for 5 sec after successful decode");
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
						objSCN.decodeDuration = 5000;
						waitsFor(function() {
							return document.getElementById("actResult").innerHTML != "init";
						}, "Timed out waiting for tester to respond", 300000);
						runs(function() {
						expect("pass").toEqual(document.getElementById("actResult").innerHTML);
						//objSCN.disable();
						});
					});
				});

				it("VT282-1968 | set decodeFrequency to 1500 |"+ scnid, function() {
					

					runs(function()
					{
						setObjective("VT282-1968 | set decodeFrequency to 400 |");
						setInstruction("Scan code128 barcode with" + scnid + "check for the decode sound frequency");
						setExpected("should able to hear the sound after successful decode");
						objSCN.enable({},callbackenable);
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
						objSCN.decodeFrequency = 400;
						waitsFor(function() {
						return document.getElementById("actResult").innerHTML != "init";
						}, "Timed out waiting for tester to respond", 300000);
						runs(function() {
						expect("pass").toEqual(document.getElementById("actResult").innerHTML);
						//objSCN.disable();
						});
					});
				});


				it("VT282-1969 | set decodeFrequency to 0 |"+ scnid, function() {
				
					runs(function()
					{
						setObjective("VT282-1969 | set decodeFrequency to 0 |");
						setInstruction("Scan code128 barcode with" + scnid + "check for the decode sound frequency");
						setExpected("should not able to hear the sound after successful decode");
						objSCN.enable({},callbackenable);
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
						objSCN.decodeFrequency = 0;
						waitsFor(function() {
							return document.getElementById("actResult").innerHTML != "init";
						}, "Timed out waiting for tester to respond", 300000);
						runs(function() {
							expect("pass").toEqual(document.getElementById("actResult").innerHTML);
							objSCN.decodeFrequency = 4000;
						});
					});
				});

				if(isWindowsMobilePlatform()){ 

					it("VT282-1971 | set invalidDecodeFrequency to 1500 |"+ scnid, function() {
						
						runs(function()
						{
							setObjective("VT282-1971 | set invalidDecodeFrequency to 1500 |");
							setInstruction("Scan code128 barcode with" + scnid + "check for the invalid decode sound frequency");
							setExpected("should able to hear the sound after barcode is scanned but not successfully decoded");
							objSCN.enable({},callbackenable);
							setTimeout(function() {
								enableFlag = true;
							}, ENABLE1K);
							dispCurrentProcess("Enabling Scanner");
						});
						waitsFor(function()
						{
							return enableFlag;
						}, '2sec wait to enable the Scanner', 2000);

						runs(function()
						{		
							objSCN.invalidDecodeFrequency = 1500;
							waitsFor(function() {
							return document.getElementById("actResult").innerHTML != "init";
							}, "Timed out waiting for tester to respond", 300000);
							runs(function() {
							expect("pass").toEqual(document.getElementById("actResult").innerHTML);
							//objSCN.disable();
							});
						});
					});


					it("VT282-1972 | set invalidDecodeFrequency to 0 |"+ scnid, function() {
						

						runs(function()
						{
							setObjective("VT282-1972 | set invalidDecodeFrequency to 0 |");
							setInstruction("Scan code128 barcode with" + scnid + "check for the invalid decode sound frequency");
							setExpected("should not able to hear the sound after barcode is scanned but not successfully decoded");
							objSCN.enable({},callbackenable);
							setTimeout(function() {
								enableFlag = true;
							}, ENABLE8K);
							dispCurrentProcess("Enabling Scanner");
						});
						waitsFor(function()
						{
							return enableFlag;
						}, '2sec wait to enable the Scanner', 9000);

						runs(function()
						{		
							objSCN.invalidDecodeFrequency  = 0;
							waitsFor(function() {
							return document.getElementById("actResult").innerHTML != "init";
							}, "Timed out waiting for tester to respond", 300000);
							runs(function() {
							expect("pass").toEqual(document.getElementById("actResult").innerHTML);
							//objSCN.disable();
							});
						});
					});

				}

				it("VT282-1978 | set decodeVolume to 5 |"+ scnid, function() {
					
					runs(function()
					{
						setObjective("VT282-1978 | set decodeVolume to 5 |");
						setInstruction("Scan code128 barcode with" + scnid + "check for the decode volume)");
						setExpected("decode sound should play at level 5 (high) after barcode is decoded");
						objSCN.enable({},callbackenable);
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
						objSCN.decodeVolume = 5;
						waitsFor(function() {
						return document.getElementById("actResult").innerHTML != "init";
						}, "Timed out waiting for tester to respond", 300000);
						runs(function() {
						expect("pass").toEqual(document.getElementById("actResult").innerHTML);
						//objSCN.disable();
						});
					});
				});

				it("VT282-1979 | set decodeVolume to 2 |"+ scnid, function() {
					
					runs(function()
					{
						setObjective("VT282-1979 | set decodeVolume to 2 |");
						setInstruction("Scan code128 barcode with" + scnid + "check for the decode volume)");
						setExpected("decode sound should play at level 2 (low) after barcode is decoded compare to prev test");
						objSCN.enable({},callbackenable);
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
						objSCN.decodeVolume = 2;
						waitsFor(function() {
							return document.getElementById("actResult").innerHTML != "init";
						}, "Timed out waiting for tester to respond", 300000);
						runs(function() {
						expect("pass").toEqual(document.getElementById("actResult").innerHTML);
							objSCN.decodeVolume = 5;
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
						//objSCN.disable();
						});
					});
				});

				if(isAndroidPlatform()){

					it("VT282-2010 | set hapticFeedback as true |"+ scnid, function() {
						
						runs(function()
						{
							setObjective("VT282-2010 | set hapticFeedback as true |");
							setInstruction("Scan code128 barcode with" + scnid + "check for the haptic feedback)");
							setExpected("device should vibrate after barcode is decoded");
							objSCN.enable({},callbackenable);
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
							objSCN.hapticFeedback = true;
							waitsFor(function() {
							return document.getElementById("actResult").innerHTML != "init";
							}, "Timed out waiting for tester to respond", 300000);
							runs(function() {
							expect("pass").toEqual(document.getElementById("actResult").innerHTML);
							//objSCN.disable();
							});		
						});
					});

					it("VT282-2011 | set hapticFeedback as false |"+ scnid, function() {
						
						runs(function()
						{
							setObjective("VT282-2011 | set hapticFeedback as false |");
							setInstruction("Scan code128 barcode with" + scnid + "check for the haptic feedback)");
							setExpected("device should not vibrate after barcode is decoded");
							objSCN.enable({},callbackenable);
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
							objSCN.hapticFeedback = false;
							waitsFor(function() {
							return document.getElementById("actResult").innerHTML != "init";
							}, "Timed out waiting for tester to respond", 300000);
							runs(function() {
							expect("pass").toEqual(document.getElementById("actResult").innerHTML);
							//objSCN.disable();
							});
						});
					});
				}

				if(isWindowsMobilePlatform()){

					it("VT282-1986 | set lowBatteryScan as true |"+ scnid, function() {
						
						runs(function()
						{
							setObjective("VT282-1986 | set lowBatteryScan as true |");
							setInstruction("Scan code128 barcode when the battery level is below 10% with" + scnid);
							setExpected("should able to decode the barcode at low battery");
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
							objSCN.lowBatteryScan= true;
							waitsFor(function() {
							return document.getElementById("actResult").innerHTML != "init";
							}, "Timed out waiting for tester to respond", 300000);
							runs(function() {
							expect("pass").toEqual(document.getElementById("actResult").innerHTML);
							//objSCN.disable();
							});
						});
					});

					it("VT282-1987 | set lowBatteryScan as false |"+ scnid, function() {

						runs(function()
						{
							setObjective("VT282-1987 | set lowBatteryScan as false |");
							setInstruction("Scan code128 barcode when the battery level is below 10% with" + scnid);
							setExpected("should not able to decode the barcode at low battery");
							objSCN.enable({},callbackenable);
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
							objSCN.lowBatteryScan=false;
							waitsFor(function() {
							return document.getElementById("actResult").innerHTML != "init";
							}, "Timed out waiting for tester to respond", 300000);
							runs(function() {
							expect("pass").toEqual(document.getElementById("actResult").innerHTML);
							objSCN.disable();
							});
						});
					});

				}

				it("VT282-1994 | call getAllProperties() with async callback |"+ scnid, function() {

					runs(function()
					{
						setObjective("VT282-1994 | call getAllProperties() with async callback |");
						setInstruction("Don't scan and check for all the supported propertylist for scanner" + scnid);
						setExpected("all the supported properties with their default value should return in callback");
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
						objSCN.getAllProperties(callbackenable);
						waitsFor(function() {
						return document.getElementById("actResult").innerHTML != "init";
						}, "Timed out waiting for tester to respond", 300000);
						runs(function() {
						expect("pass").toEqual(document.getElementById("actResult").innerHTML);
						//objSCN.disable();
						});
					});
				});

				it("VT282-1995 | call getAllProperties() after set reader param |"+ scnid, function() {
					
					runs(function()
					{
						setObjective("VT282-1995 | call getAllProperties() after set reader param |");
						setInstruction("Don't scan and check for all the supported propertylist for scanner" + scnid);
						setExpected("all the supported properties with their default value should return in callback, scanTimeout should be 7000 and picklistMode as " + reticleType);
						objSCN.enable();
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
						objSCN.picklistMode = reticleType;
						objSCN.scanTimeout = 7000;
						objSCN.getAllProperties(callback1995);
						waitsFor(function() {
						return document.getElementById("actResult").innerHTML != "init";
						}, "Timed out waiting for tester to respond", 300000);
						runs(function() {
						expect("pass").toEqual(document.getElementById("actResult").innerHTML);
						//objSCN.disable();
						});
					});
				});

				it("VT282-1996 | call getAllProperties() after set decoder param |"+ scnid, function() {
					
					runs(function()
					{
						setObjective("VT282-1996 | call getAllProperties() after set decoder param |");
						setInstruction("Don't scan and check for all the supported propertylist for scanner" + scnid);
						setExpected("all the supported properties with their default value should return in callback, alldecoders and code39 should be true");
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
						objSCN.alldecoders = "true";
						objSCN.code93 = "true";
						objSCN.getAllProperties(callback1996);
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

				it("VT282-1999 | call getAllProperties() with anonymous callback |"+ scnid, function() {
					
					runs(function()
					{
						setObjective("VT282-1999 | call getAllProperties() with anonymous callback |");
						setInstruction("Don't scan and check for all the supported propertylist for scanner" + scnid);
						setExpected("all the properties with their default value should return with anonymous callback");
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
						objSCN.alldecoders = "true";
						objSCN.code93 = "true";
						objSCN.getAllProperties(function(data){enablecallbackdata(JSON.stringify(data));});
						waitsFor(function() {
						return document.getElementById("actResult").innerHTML != "init";
						}, "Timed out waiting for tester to respond", 300000);
						runs(function() {
						expect("pass").toEqual(document.getElementById("actResult").innerHTML);
						//objSCN.disable();
						});
					});
				});

				it("VT282-2008 | call getSupportedProperties() with anonymous callback |"+ scnid, function()
				{
					runs(function()
					{
						setObjective("VT282-2008 | call getSupportedProperties() with anonymous callback |");
						setInstruction("Don't scan and check for the supported propertylist for scanner" + scnid);
						setExpected("all the supported properties should return with anonymous callback");
						objSCN.enable();
						
						setTimeout(function()
						{
							enableFlag = true;
						}, ENABLE1K);
					});
					
					waitsFor(function()
					{
						return enableFlag;
					}, '2sec wait to enable the Scanner', 2000);

					runs(function()
					{		
						objSCN.alldecoders = "true";
						objSCN.code93 = "true";
						objSCN.getSupportedProperties(function(data){enablecallbackdata(JSON.stringify(data));});
						
						waitsFor(function()
						{
							return document.getElementById("actResult").innerHTML != "init";
						}, "Timed out waiting for tester to respond", 300000);
						
						runs(function()
						{
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

//Added Test for property "triggerConnected" in 4.1
				if(isWindowsMobilePlatform()){

					it("disconnect the trigger of an enabled Scanner", function() {

						runs(function()
						{
							setObjective("disconnect the trigger after scanner is enabled (WM/CE Only)");
							setInstruction("Instruction to user: Please wait 9 seconds");
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
							setInstruction("Press Hardware Trigger button");
							setExpected("Scanner beam should not comeup");
							objSCN.setProperty("triggerConnected", "false");
							//var connectedState = objSCN.getProperty("triggerConnected");
							//expect(connectedState).toEqual("false"); // covered in Auto Spec
							waitsFor(function() {
							return document.getElementById("actResult").innerHTML != "init";
							}, "Timed out waiting for tester to respond", 300000);
							runs(function() {
							expect("pass").toEqual(document.getElementById("actResult").innerHTML);
							//objSCN.disable();
							});
						});
					});	

					it("Re-connect the trigger of an enabled Scanner", function() {

						runs(function()
						{
							setObjective("Re-connect the trigger of an enabled Scanner");
							setInstruction("Press Hardware Trigger button");
							setExpected("Scanner beam should comeup and scan successful");
							objSCN.setProperty("triggerConnected", "true");
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
							//var connectedState = objSCN.getProperty("triggerConnected");
							//expect(connectedState).toEqual("true"); // Covered in Auto Spec

							waitsFor(function() {
							return document.getElementById("actResult").innerHTML != "init";
							}, "Timed out waiting for tester to respond", 300000);
							runs(function() {
							expect("pass").toEqual(document.getElementById("actResult").innerHTML);
							objSCN.setProperty("triggerConnected", "false");
							alert("hi");
							objSCN.disable();
							});

						});
					});	

					it("re-enable the scanner after disabling the trigger", function() {

						runs(function()
						{
							setObjective("re-enable the scanner after disabling the trigger");
							setInstruction("Press Hardware Trigger button");
							setExpected("Scanner beam should comeup and scan successful");
							objSCN.enable({},callbackenable);
							setTimeout(function() {
								enableFlag = true;
							}, ENABLE8K);
						});

						waitsFor(function()
						{
							return enableFlag;
						}, '8sec wait to enable the Scanner', 9000);

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

					it("disconnect the trigger when scanner disabled", function() {

						runs(function()
						{
							setObjective("disconnect the trigger when scanner disabled");
							setInstruction("Press Hardware Trigger button");
							setExpected("Scanner beam should not comeup");
							objSCN.setProperty("triggerConnected", "false");
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
							objSCN.disable();							
							});
						});
					});		

					it("set triggerConnected as true after scanner disable", function() {

						runs(function()
						{
							setObjective("set triggerConnected as true after scanner disable");
							setInstruction("Press Hardware Trigger button");
							setExpected("Scanner beam should not comeup");
							objSCN.setProperty("triggerConnected", "true");
							//objSCN.enable({},callbackenable);
							setTimeout(function() {
								enableFlag = true;
							}, ENABLE1K);
						});

						waitsFor(function()
						{
							return enableFlag;
						}, '2sec wait', 2000);

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

					it("call start after setting triggerConnected as false", function() {

						runs(function()
						{
							setObjective("call start after setting triggerConnected as false");
							setInstruction("wait for 9 sec and don't Press Hardware Trigger button");
							setExpected("Scanner beam should not comeup automatically");
							objSCN.enable({},callbackenable);
							setTimeout(function() {
								enableFlag = true;
							}, ENABLE8K);
						});

						waitsFor(function()
						{
							return enableFlag;
						}, '9sec wait to enable the Scanner', 9000);

						runs(function()
						{
							objSCN.setProperty("triggerConnected", "false");
							objSCN.start();
							waitsFor(function() {
							return document.getElementById("actResult").innerHTML != "init";
							}, "Timed out waiting for tester to respond", 300000);
							runs(function() {
							expect("pass").toEqual(document.getElementById("actResult").innerHTML);
							objSCN.stop();
							objSCN.disable();
							});

						});
					});		

					it("call captureTrigger after setting triggerConnected as false", function() {

						runs(function()
						{
							setObjective("call captureTrigger after setting triggerConnected as false");
							setInstruction("wait for 9 sec and Press Hardware Trigger button");
							setExpected("Scanner beam should not comeup and trigger value of should be shown");
							objSCN.enable({},callbackenable);
							setTimeout(function() {
								enableFlag = true;
							}, ENABLE8K);
						});

						waitsFor(function()
						{
							return enableFlag;
						}, '9sec wait to enable the Scanner', 9000);

						runs(function()
						{
							objSCN.setProperty("triggerConnected", "false");
							Rho.KeyCapture.captureTrigger(function(data){alert(data.triggerFlag);});
							waitsFor(function() {
							return document.getElementById("actResult").innerHTML != "init";
							}, "Timed out waiting for tester to respond", 300000);
							runs(function() {
							expect("pass").toEqual(document.getElementById("actResult").innerHTML);
							objSCN.disable();
							Rho.KeyCapture.captureTrigger();							
							});
						});
					});		

					it("scan multiple times after triggerConnected as true", function() {

						runs(function()
						{
							setObjective("scan multiple times after triggerConnected as true");
							setInstruction("wait for 9 sec and Press Hardware Trigger button and scan (repeat this 4-5 times)");
							setExpected("Scanner beam should comeup and scan everytime successfully");
							objSCN.enable({},callbackenable);
							setTimeout(function() {
								enableFlag = true;
							}, ENABLE8K);
						});

						waitsFor(function()
						{
							return enableFlag;
						}, '9sec wait to enable the Scanner', 9000);

						runs(function()
						{
							objSCN.setProperty("triggerConnected", "false");
							objSCN.setProperty("triggerConnected", "true");
							waitsFor(function() {
							return document.getElementById("actResult").innerHTML != "init";
							}, "Timed out waiting for tester to respond", 300000);
							runs(function() {
							expect("pass").toEqual(document.getElementById("actResult").innerHTML);
							objSCN.disable();
							});
						});
					});

					it("call triggerConnected as true after enabling scanner", function() {

						runs(function()
						{
							setObjective("call triggerConnected as true after enabling scanner");
							setInstruction("wait for 9 sec and Press Hardware Trigger button");
							setExpected("Scanner beam should comeup and scan should be successfully");
							objSCN.enable({},callbackenable);
							setTimeout(function() {
								enableFlag = true;
							}, ENABLE8K);
						});

						waitsFor(function()
						{
							return enableFlag;
						}, '9sec wait to enable the Scanner', 9000);

						runs(function()
						{
							objSCN.setProperty("triggerConnected", "true");
							waitsFor(function() {
							return document.getElementById("actResult").innerHTML != "init";
							}, "Timed out waiting for tester to respond", 300000);
							runs(function() {
							expect("pass").toEqual(document.getElementById("actResult").innerHTML);
							objSCN.disable();							
							});
						});
					});	

					it("triggerConnected as false with application minimize", function() {

						runs(function()
						{
							setObjective("triggerConnected as false with application minimize");
							setInstruction("wait for 9 sec and Press Hardware Trigger button then minimize the app and restore it after 5 sec and press trigger again");
							setExpected("Scanner beam should not comeup after restore the application also");
							objSCN.enable({"triggerConnected":false},callbackenable);
							setTimeout(function() {
								enableFlag = true;
							}, ENABLE8K);
						});

						waitsFor(function()
						{
							return enableFlag;
						}, '9sec wait to enable the Scanner', 9000);

						runs(function()
						{
							//objSCN.setProperty("triggerConnected", "false");

							waitsFor(function() {
							return document.getElementById("actResult").innerHTML != "init";
							}, "Timed out waiting for tester to respond", 300000);
							runs(function() {
							expect("pass").toEqual(document.getElementById("actResult").innerHTML);
							objSCN.disable();							
							});

						});
					});	

					it("triggerConnected as false with device suspend", function() {

						runs(function()
						{
							setObjective("triggerConnected as false with device suspend");
							setInstruction("wait for 9 sec and Press Hardware Trigger button then suspend the device and resume it after 5 sec and press trigger again");
							setExpected("Scanner beam should not comeup after restore the application also");
							objSCN.enable({},callbackenable);
							setTimeout(function() {
								enableFlag = true;
							}, ENABLE8K);
						});

						waitsFor(function()
						{
							return enableFlag;
						}, '9sec wait to enable the Scanner', 9000);

						runs(function()
						{
							objSCN.setProperty("triggerConnected", "false");

							waitsFor(function() {
							return document.getElementById("actResult").innerHTML != "init";
							}, "Timed out waiting for tester to respond", 300000);
							runs(function() {
							expect("pass").toEqual(document.getElementById("actResult").innerHTML);
							objSCN.disable();							
							});
						});
					});	

					it("triggerConnected as false with application background to foreground", function() {

						runs(function()
						{
							setObjective("triggerConnected as false with application background to foreground");
							setInstruction("wait for 9 sec and Press Hardware Trigger button then send the app to background and bring back to foreground after 5 sec and press trigger again");
							setExpected("Scanner beam should not comeup after restore the application also");
							objSCN.enable({},callbackenable);
							setTimeout(function() {
								enableFlag = true;
							}, ENABLE8K);
						});

						waitsFor(function()
						{
							return enableFlag;
						}, '9sec wait to enable the Scanner', 9000);

						runs(function()
						{
							objSCN.setProperty("triggerConnected", "false");

							waitsFor(function() {
							return document.getElementById("actResult").innerHTML != "init";
							}, "Timed out waiting for tester to respond", 300000);
							runs(function() {
							expect("pass").toEqual(document.getElementById("actResult").innerHTML);
							objSCN.disable();							
							});
						});
					});	
				}
			});	
		})(enumData[j]);
	}
});	