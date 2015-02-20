describe("Barcode Test", function() {
	
	var ENABLE8K = 8000;
	var ENABLE1K = 1000;
	var enableFlag = false;
	var decodeFlag = false;
	//var enumData = '';
	
	if(Rho.System.platform == 'ANDROID')
	{
		ENABLE8K = 0; ENABLE1K = 0;
		isAndroid = true;
	}

	var callbacktake = function (data){
			enablecallbackdata(JSON.stringify(data));
		}

	var callbackenable = function (data){
		enablecallbackdata(JSON.stringify(data).replace(/[,]/g,'<br />'));
		Rho.Barcode.start();
	}

	enumData = Rho.Barcode.enumerate();
        objSCN = enumData[0];

//   for (var j = 0;j<enumData.length;j++){

//   (function(objSCN){ 

   	var scnid = objSCN.getProperty('scannerType');

	beforeEach(function() {
		enableFlag = false;
		decodeFlag = false;
		decodedata ='';
		document.getElementById("actResult").innerHTML = "init";
		enablecallbackdata(decodedata);
	});

	afterEach(function() {
		/* ... Tear it down ... */
		//objSCN.disable();
	});

	if (isAndroidOrAppleOrWindowsPhone8Platform())
	{
		it("VT282-1778 | call setDefault with SCN and take |"+ scnid, function() {

			runs(function()
			{
				setObjective("VT282-1778 | call setDefault and take");
				setInstruction("wait for viewfinder to come automatically for " + scnid + " Scan any barcode");
				setExpected("code128 barcode should decode and retrun value should be decoded data and status");
				Rho.Barcode.setDefaultID(objSCN.getId());
				Rho.Barcode.take({},callbacktake);
				setTimeout(function() {
					enableFlag = true;
				}, 4000);
			});

			waitsFor(function()
			{
				return enableFlag;
			}, '5sec wait to enable the Scanner', 5000);

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

		it("VT282-1790 | take with callback as function |"+ scnid, function() {
			
			runs(function()
			{
				setObjective("VT282-1790 | take with callback as function|");
				setInstruction("wait for scanner to start and scan any barcode after strating scanner" + scnid);
				setExpected("scanner should start comeup automatically and Decoded data and status only should be returned ");
				objSCN.take({},callbacktake);
				setTimeout(function() {
					enableFlag = true;
				}, 4000);
			});

			waitsFor(function()
			{
				return enableFlag;
			}, '5sec wait to enable the Scanner', 5000);

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

		it("VT282-1797 | Take with callback as anonymous function |"+ scnid, function() {
			
			runs(function()
			{
				setObjective("VT282-1797 | Take with callback as anonymous function|");
				setInstruction("scan any barcode with" + scnid);
				setExpected("data of barcode and status as Ok should be returned");
				objSCN.take({},function(data){enablecallbackdata(JSON.stringify(data));});
				setTimeout(function() {
					enableFlag = true;
				}, 4000);
			});

			waitsFor(function()
			{
				return enableFlag;
			}, '5sec wait to enable the Scanner', 5000);

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

		it("VT282-1790A | take with callback as function and don't scan cancel it|"+ scnid, function() {
			
			runs(function()
			{
				setObjective("VT282-1790A | take with callback as function and don't scan cancel it|");
				setInstruction("Don't scan any barcode after scanner starts automatically and cancle it" + scnid);
				setExpected("Decoded data should come as nil and status should be cancel and Beam ore viewfinder will go after 10 sec ");
				objSCN.take({},callbacktake);
				setTimeout(function() {
					enableFlag = true;
				}, 4000);
			});

			waitsFor(function()
			{
				return enableFlag;
			}, '5sec wait to enable the Scanner', 5000);

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

		it("VT282-1994 | call getAllProperties() with async callback |"+ scnid, function() {

			runs(function()
			{
				setObjective("VT282-1994 | call getAllProperties() with async callback |");
				setInstruction("Don't scan and check for all the supported propertylist for scanner" + scnid);
				setExpected("all the supported properties with their default value should return in callback");
				objSCN.getAllProperties(callbacktake);
				setTimeout(function() {
					enableFlag = true;
				}, 4000);
			});
			waitsFor(function()
			{
				return enableFlag;
			}, '5sec wait to enable the Scanner', 5000);

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

		it("VT282-1998 | call getAllProperties() without callback(Sync Access) |"+ scnid, function() {
			
			runs(function()
			{
				setObjective("VT282-1998 | call getAllProperties() without callback(Sync Access) |");
				setInstruction("Don't scan and check for all the supported propertylist for scanner" + scnid);
				setExpected("all the supported properties with their default value should return with Sync Access");
				var data = objSCN.getAllProperties();
				callbacktake(data);
				setTimeout(function() {
					enableFlag = true;
				}, 4000);
			});
			waitsFor(function()
			{
				return enableFlag;
			}, '5sec wait to enable the Scanner', 5000);

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

		it("VT282-1999 | call getAllProperties() with anonymous callback |"+ scnid, function() {

			runs(function()
			{
				setObjective("VT282-1999 | call getAllProperties() with anonymous callback |");
				setInstruction("Don't scan and check for all the supported propertylist for scanner" + scnid);
				setExpected("all the properties with their default value should return with anonymous callback");
				objSCN.getAllProperties(function(data){enablecallbackdata(JSON.stringify(data));});
				setTimeout(function() {
					enableFlag = true;
				}, 4000);
			});
			waitsFor(function()
			{
				return enableFlag;
			}, '5sec wait to enable the Scanner', 5000);

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

		it("VT282-2008 | call getSupportedProperties() with anonymous callback |"+ scnid, function() {
			
			runs(function()
			{
				setObjective("VT282-2008 | call getSupportedProperties() with anonymous callback |");
				setInstruction("Don't scan and check for the supported propertylist for scanner" + scnid);
				setExpected("all the supported properties should return with anonymous callback");
				objSCN.getSupportedProperties(function(data){enablecallbackdata(JSON.stringify(data));});
				setTimeout(function() {
					enableFlag = true;
				}, 4000);
			});
			waitsFor(function()
			{
				return enableFlag;
			}, '5sec wait to enable the Scanner', 5000);

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

		it("VT282-2008A | call getSupportedProperties() with async callback |"+ scnid, function() {

			runs(function()
			{
				setObjective("VT282-2008A | call getSupportedProperties() with async callback |");
				setInstruction("check for all the supported propertylist for scanner" + scnid);
				setExpected("all the supported properties should return in async callback");
				objSCN.getSupportedProperties(callbacktake);
				setTimeout(function() {
					enableFlag = true;
				}, 4000);
			});
			waitsFor(function()
			{
				return enableFlag;
			}, '5sec wait to enable the Scanner', 5000);

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

		it("VT282-2008B | call getProperties() with scannerType without callback |"+ scnid, function() {

			runs(function()
			{
				setObjective("VT282-2008A | call getProperties() with scannerType without callback|");
				setInstruction("check for retrurned value" + scnid);
				setExpected("It should return the Scanner scannerType");
				var data = objSCN.getProperties(['scannerType']);
				callbacktake(data);
				setTimeout(function() {
					enableFlag = true;
				}, 4000);
			});
			waitsFor(function()
			{
				return enableFlag;
			}, '5sec wait to enable the Scanner', 5000);

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

		it("VT282-2008C | call getProperties() with scannerType with callback |"+ scnid, function() {

			runs(function()
			{
				setObjective("VT282-2008A | call getProperties() with scannerType with callback|");
				setInstruction("check for retrurned value" + scnid);
				setExpected("It should return the Scanner scannerType");
				objSCN.getProperties(['scannerType'],callbacktake);
				setTimeout(function() {
					enableFlag = true;
				}, 4000);
			});
			waitsFor(function()
			{
				return enableFlag;
			}, '5sec wait to enable the Scanner', 5000);

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

		it("VT282-2008D | call getProperty() with scannerType with anonymous callback |"+ scnid, function() {

			runs(function()
			{
				setObjective("VT282-2008A | call getProperty() with scannerType with anonymous callback|");
				setInstruction("check for retrurned value" + scnid);
				setExpected("It should return the Scanner scannerType");
				objSCN.getProperty('scannerType',function(data){enablecallbackdata(JSON.stringify(data));});
				setTimeout(function() {
					enableFlag = true;
				}, 4000);
			});
			waitsFor(function()
			{
				return enableFlag;
			}, '5sec wait to enable the Scanner', 5000);

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

		it("VT282-2006 | call setDefault and getDefault |" + scnid, function() {

			    Rho.Barcode.setDefault(objSCN);
			    var defaultobj = Rho.Barcode.getDefault();
				expect(scnid).toEqual(defaultobj.getProperty('scannerType'));
		});

		it("VT282-2006A | set and get using Default |" + scnid, function() {

			    Rho.Barcode.setDefault(objSCN);
			    var defaultobj = Rho.Barcode.getDefault();
				expect(scnid).toEqual(defaultobj.getProperty('scannerType'));
		});
	}

//The below tests are added for MK devices as Presentation mode is only supported on MK device
	if(isWindowsMobilePlatform())
	{
		it("VT282-xx1 | Scan the barcode with presentation mode as parameter of enable method|" + scnid , function() {

			runs(function()
			{
				setObjective("VT282-xx1 |Enable with presentation mode as parameter of enable method|");
				setInstruction("Scan Barcode code128 with " + scnid);
				setExpected("Is retruned decoded hash displayed correctly with all data?");
				objSCN.enable({'aimType':'presentation'},callbackenable);
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
				objSCN.start();
				waitsFor(function() {
				return document.getElementById("actResult").innerHTML != "init";
				}, "Timed out waiting for tester to respond", 300000);
				runs(function() {
				expect("pass").toEqual(document.getElementById("actResult").innerHTML);
				objSCN.disable();
				});
			});
		});

		it("VT282-xx2 | check for presentation mode without scan for the first time |" + scnid , function() {

			runs(function()
			{
				setObjective("VT282-xx2 |check for presentation mode without scan for the first time|");
				setInstruction("Don't Scan Barcode and check for beam to stop then bring back the barcode under scanner");
				setExpected("Scanner beam should come up and decode should be successful");
				objSCN.enable({'aimType':'presentation'},callbackenable);
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
				objSCN.start();
				waitsFor(function() {
				return document.getElementById("actResult").innerHTML != "init";
				}, "Timed out waiting for tester to respond", 300000);
				runs(function() {
				expect("pass").toEqual(document.getElementById("actResult").innerHTML);
				objSCN.disable();
				});
			});
		});

		it("VT282-xx3 | check for presentation mode with repeat scan |" + scnid , function() {

			runs(function()
			{
				setObjective("VT282-xx3 |check for presentation mode with repeat scan |");
				setInstruction("Scan Barcode then remove the barcode from beam area of scanner then bring back the scanner and repeat this for 3-4 times");
				setExpected("Scanner beam should come up and decode should be successful eachtime");
				objSCN.enable({'aimType':'presentation'},callbackenable);
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
				objSCN.start();
				waitsFor(function() {
				return document.getElementById("actResult").innerHTML != "init";
				}, "Timed out waiting for tester to respond", 300000);
				runs(function() {
				expect("pass").toEqual(document.getElementById("actResult").innerHTML);
				objSCN.disable();
				});
			});
		});

		it("VT282-xx4 | setting presentation mode after enable call |" + scnid , function() {

			runs(function()
			{
				setObjective("VT282-xx4 |setting presentation mode after enable call|");
				setInstruction("check for presentation mode " + scnid);
				setExpected("sacnner beam should come everytime the object goes near to scanner beam area");
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
				objSCN.aimType = 'presentation';
				objSCN.start();
				waitsFor(function() {
				return document.getElementById("actResult").innerHTML != "init";
				}, "Timed out waiting for tester to respond", 300000);
				runs(function() {
				expect("pass").toEqual(document.getElementById("actResult").innerHTML);
				objSCN.disable();
				});
			});
		});

		it("VT282-xx5 | Enable with presentation mode and scanTimeout 10000 and callback as anonymous function |"+ scnid, function() {
			
			runs(function()
			{
				setObjective("VT282-xx5 | Enable with presentation mode and scanTimeout 10000 and callback as anonymous function |");
				setInstruction("check functionality of scanTimeout as 10000 and presentation mode");
				setExpected("Baeam or viewfinder will stop automatically after 10 second?");
				objSCN.enable({'scanTimeout':10000,'aimType':'presentation'},function(data){enablecallbackdata(JSON.stringify(data));});
				setTimeout(function() {
					enableFlag = true;
				}, ENABLE8K);
			});

			waitsFor(function()
			{
				return enableFlag;
			}, '9sec Wait to enable the Scanner', 9000);

			runs(function()
			{	
				objSCN.start();
				waitsFor(function() {
				return document.getElementById("actResult").innerHTML != "init";
				}, "Timed out waiting for tester to respond", 300000);
				runs(function() {
				expect("pass").toEqual(document.getElementById("actResult").innerHTML);
				objSCN.disable();
				});		
			});
		});

		it("VT282-xx6 | Enable with alldecoders enabled and callback |"+ scnid, function() {
			
			runs(function()
			{
				setObjective("VT282-xx6 | Enable with alldecoders enabled and callback as function |");
				setInstruction("Scan code93 and MSI barcode with " + scnid);
				setExpected("Is decoded data comes after scanning code93 and MSI?");
				objSCN.enable({'allDecoders':'true','aimType':'presentation'},callbackenable);
				setTimeout(function() {
					enableFlag = true;
				}, ENABLE8K);
			});

			waitsFor(function()
			{
				return enableFlag;
			}, '9sec Wait to enable the Scanner', 9000);

			runs(function()
			{
				objSCN.start();
				waitsFor(function() {
				return document.getElementById("actResult").innerHTML != "init";
				}, "Timed out waiting for tester to respond", 300000);
				runs(function() {
				expect("pass").toEqual(document.getElementById("actResult").innerHTML);
				objSCN.disable();
				});			
			});
		});

		it("VT282-xx7 | Enable with alldecoders disabled, code128 as enabled without callback |"+ scnid, function() {
			
			runs(function()
			{
				setObjective("VT282-xx7 | Enable with alldecoders disabled, code128 as enabled without callback");
				setInstruction("putting focus inside textbox and Scan code39 barcode then scan code128 barcode with " + scnid);
				setExpected("only code128 barcode should decode");
				objSCN.enable({'allDecoders':false,'code128':true,'aimType':'presentation'});
				setTimeout(function() {
					enableFlag = true;
				}, ENABLE8K);
			});

			waitsFor(function()
			{
				return enableFlag;
			}, '9sec Wait to enable the Scanner', 9000);

			runs(function()
			{		
				objSCN.start();
				waitsFor(function() {
				return document.getElementById("actResult").innerHTML != "init";
				}, "Timed out waiting for tester to respond", 300000);
				runs(function() {
				expect("pass").toEqual(document.getElementById("actResult").innerHTML);
				objSCN.disable();				
				});	
			});
		});

		it("VT282-xx8 | call setDefault with" + scnid + "and take |", function() {

			runs(function()
			{
				setObjective("VT282-xx8 | call setDefault and take");
				setInstruction("Take method wait for scanner beam or viewfinder to come automatically and Scan code 128 barcode");
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
			}, '9sec wait to enable the Scanner', 9000);

			runs(function()
			{		
				objSCN.allDecoders = true;
				objSCN.start();
				waitsFor(function() {
				return document.getElementById("actResult").innerHTML != "init";
				}, "Timed out waiting for tester to respond", 300000);
				runs(function() {
				expect("pass").toEqual(document.getElementById("actResult").innerHTML);
				objSCN.disable();
				});	
			});
		});

		it("VT282-xx9 | call take with presentation mode|", function() {

			runs(function()
			{
				setObjective("VT282-xx9 | call setDefault and take");
				setInstruction("Take method wait for scanner beam or viewfinder to come automatically and Scan code 128 barcode");
				setExpected("code128 barcode should decode and retrun value should be decoded data and status");
				Rho.Barcode.setDefault(objSCN);
				Rho.Barcode.take({'aimType':'presentation'},callbackenable);
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
				objSCN.start();
				waitsFor(function() {
				return document.getElementById("actResult").innerHTML != "init";
				}, "Timed out waiting for tester to respond", 300000);
				runs(function() {
				expect("pass").toEqual(document.getElementById("actResult").innerHTML);
				objSCN.disable();
				});	
			});
		});

//	}

//})(enumData[j]);

}

});	
