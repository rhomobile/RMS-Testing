describe("Barcode Test", function() {
	
	var enableFlag = false;
	var decodeFlag = false;
	//var enumData = '';
	enumData = Rho.Barcode.enumerate();

   for (var j = 0;j<enumData.length;j++){

   (function(objSCN){ 

	beforeEach(function() {
		enableFlag = false;
		decodeFlag = false;
		/* ... Set up your object ... */
	});

	afterEach(function() {
		/* ... Tear it down ... */
		objSCN.disable();
	});

	it("VT282-1762 | Enable with callback as function |", function() {
		
		var callbackBarcode = function (data){
			alert();
			dispCurrentProcess($.toJSON(data));
		}

		runs(function()
		{
			enumData = Rho.Barcode.enumerate();
			objSCN.enable({},callbackBarcode);
			setTimeout(function() {
				enableFlag = true;
			}, 8000);
		});

		waitsFor(function()
		{
			dispCurrentProcess("Enabling Scanner");
			return enableFlag;
		}, '8sec Wait to enable the Scanner', 9000);

		runs(function()
		{
			setTimeout(function() {
				decodeFlag = true;
			}, 15000);
		});

		waitsFor(function()
		{
			dispCurrentProcess("Scan any Barcode <br/> Check The Behavior");
			return decodeFlag;
		}, '15sec Wait to Scan the Barcode', 16000);

		runs(function()
		{
			var testPassed = confirm("Do you see Correct Behavior?");
			expect(testPassed).toEqual(true);
		});

	});

	it("VT282-1763 | Enable without callback and without any param (Synchronous Access) |", function() {
		
		runs(function()
		{
			var enumData = Rho.Barcode.enumerate();
			objSCN.enable();
			setTimeout(function() {
				enableFlag = true;
			}, 8000);
		});

		waitsFor(function()
		{
			dispCurrentProcess("Enabling Scanner");
			return enableFlag;
		}, '8sec Wait to enable the Scanner', 9000);

		runs(function()
		{			
			setTimeout(function() {
				decodeFlag = true;
			}, 15000);
		});

		waitsFor(function()
		{
			dispCurrentProcess("Scan any Barcode <br/> Check the Behavior");
			return decodeFlag;
		}, '15sec Wait to Scan the Barcode', 16000);

		runs(function()
		{
			var testPassed = confirm("Do you see Correct Behavior?");
			expect(testPassed).toEqual(true);
		});

	});

	it("VT282-1764 | Enable with alldecoders enabled and callback as function URL |", function() {
		
		var callbackBarcode = function (data){
			alert();
			dispCurrentProcess($.toJSON(data));
		}

		runs(function()
		{
			var enumData = Rho.Barcode.enumerate();
			objSCN.enable({'allDecoders':'true'},callbackBarcode);
			setTimeout(function() {
				enableFlag = true;
			}, 8000);
		});

		waitsFor(function()
		{
			dispCurrentProcess("Enabling Scanner");
			return enableFlag;
		}, '8sec Wait to enable the Scanner', 9000);

		runs(function()
		{
			setTimeout(function() {
				decodeFlag = true;
			}, 15000);
		});

		waitsFor(function()
		{
			dispCurrentProcess("Scan code93 barcodes <br/> Check The Behavior");
			return decodeFlag;
		}, '15sec Wait to Scan the Barcode', 16000);

		runs(function()
		{
			var testPassed = confirm("Do you see Correct Behavior?");
			expect(testPassed).toEqual(true);
		});

	});

	it("VT282-1765 | Enable with picklist software reticle, scantimeout 7000 and callback as function |", function() {
		
		var callbackBarcode = function (data){
			alert();
			dispCurrentProcess($.toJSON(data));
		}

		runs(function()
		{
			var enumData = Rho.Barcode.enumerate();
			objSCN.enable({'scanTimeout':7000,'picklistMode':'softwareReticle'},callbackBarcode);
			setTimeout(function() {
				enableFlag = true;
			}, 8000);
		});

		waitsFor(function()
		{
			dispCurrentProcess("Enabling Scanner");
			return enableFlag;
		}, '8sec Wait to enable the Scanner', 9000);

		runs(function()
		{
			//Rho.Barcode.scanTimeout = "7000";
			//Rho.Barcode.picklistMode = "softwareReticle";
			setTimeout(function() {
				decodeFlag = true;
			}, 15000);
		});

		waitsFor(function()
		{
			dispCurrentProcess("functionlity of scanTimeout as 7000 and picklistMode as reticle <br/> Check The Behavior");
			return decodeFlag;
		}, '15sec Wait to Scan the Barcode', 16000);

		runs(function()
		{
			var testPassed = confirm("Do you see Correct Behavior?");
			expect(testPassed).toEqual(true);
		});

	});

	it("VT282-1766 | Enable with alldecoders disabled, code128 as enabled without callback |", function() {
		
		runs(function()
		{
			var enumData = Rho.Barcode.enumerate();
			objSCN.enable({'allDecoders':'false','code128':'true'});
			setTimeout(function() {
				enableFlag = true;
			}, 8000);
		});

		waitsFor(function()
		{
			dispCurrentProcess("Enabling Scanner");
			return enableFlag;
		}, '8sec Wait to enable the Scanner', 9000);

		runs(function()
		{		
			//Rho.Barcode.allDecoders = false;
			//Rho.Barcode.code128 = true;
			setTimeout(function() {
				decodeFlag = true;
			}, 15000);
		});

		waitsFor(function()
		{
			dispCurrentProcess("Scan other barcode then scan code128 barcode <br/> only code128 barcode will decode");
			return decodeFlag;
		}, '15sec Wait to Scan the Barcode', 16000);

		runs(function()
		{
			var testPassed = confirm("Do you see Correct Behavior?");
			expect(testPassed).toEqual(true);
		});

	});

	it("VT282-1769 | Enable with callback as anonymous function |", function() {
		
		runs(function()
		{
			var enumData = Rho.Barcode.enumerate();
			objSCN.enable({},function(data){dispCurrentProcess($.toJSON(data));});
			setTimeout(function() {
				enableFlag = true;
			}, 8000);
		});

		waitsFor(function()
		{
			dispCurrentProcess("Enabling Scanner");
			return enableFlag;
		}, '8sec Wait to enable the Scanner', 9000);

		runs(function()
		{		
			setTimeout(function() {
				decodeFlag = true;
			}, 15000);
		});

		waitsFor(function()
		{
			dispCurrentProcess("Scan any Barcode <br/> Check the Behavior");
			return decodeFlag;
		}, '15sec Wait to Scan the Barcode', 16000);

		runs(function()
		{
			var testPassed = confirm("Do you see Correct Behavior?");
			expect(testPassed).toEqual(true);
		});

	});


	it("VT282-1770 | Enable with picklist software reticle, scantimeout 7000 and callback as anonymous function |", function() {
		
		runs(function()
		{
			var enumData = Rho.Barcode.enumerate();
			objSCN.enable({'scanTimeout':7000,'picklistMode':'softwareReticle'},function(data){dispCurrentProcess($.toJSON(data));});
			setTimeout(function() {
				enableFlag = true;
			}, 8000);
		});

		waitsFor(function()
		{
			dispCurrentProcess("Enabling Scanner");
			return enableFlag;
		}, '8sec Wait to enable the Scanner', 9000);

		runs(function()
		{		
			setTimeout(function() {
				decodeFlag = true;
			}, 15000);
		});

		waitsFor(function()
		{
			dispCurrentProcess("check functionality of scanTimeout as 7000 and picklistMode reticle <br/> Check the Behavior");
			return decodeFlag;
		}, '15sec Wait to Scan the Barcode', 16000);

		runs(function()
		{
			var testPassed = confirm("Do you see Correct Behavior?");
			expect(testPassed).toEqual(true);
		});
	});

	it("VT282-1771 | set picklist software reticle, scantimeout 7000 after calling enable |", function() {

		var callbackBarcode = function (data){
		alert();
		dispCurrentProcess($.toJSON(data));
		}
		
		runs(function()
		{
			var enumData = Rho.Barcode.enumerate();
			objSCN.enable({},callbackBarcode);
			setTimeout(function() {
				enableFlag = true;
			}, 8000);
		});

		waitsFor(function()
		{
			dispCurrentProcess("Enabling Scanner");
			return enableFlag;
		}, '8sec Wait to enable the Scanner', 9000);

		runs(function()
		{		
			Rho.Barcode.scanTimeout = "7000";
			Rho.Barcode.picklistMode = "softwareReticle";
			setTimeout(function() {
				decodeFlag = true;
			}, 15000);
		});

		waitsFor(function()
		{
			dispCurrentProcess("check functionality of scanTimeout aas 7000 and picklistMode reticle <br/> Check the Behavior");
			return decodeFlag;
		}, '15sec Wait to Scan the Barcode', 16000);

		runs(function()
		{
			var testPassed = confirm("Do you see Correct Behavior?");
			expect(testPassed).toEqual(true);
		});

	});

	it("VT282-1773 | set alldecoders false, code128 as true after enable |", function() {

		var callbackBarcode = function (data){
		alert();
		dispCurrentProcess($.toJSON(data));
		}
		
		runs(function()
		{
			var enumData = Rho.Barcode.enumerate();
			objSCN.enable({},callbackBarcode);
			setTimeout(function() {
				enableFlag = true;
			}, 8000);
		});

		waitsFor(function()
		{
			dispCurrentProcess("Enabling Scanner");
			return enableFlag;
		}, '8sec Wait to enable the Scanner', 9000);

		runs(function()
		{		
			objSCN.allDecoders = false;
			objSCN.code128 = true;
			setTimeout(function() {
				decodeFlag = true;
			}, 15000);
		});

		waitsFor(function()
		{
			dispCurrentProcess("scan code128 barcode <br/> only code128 will decode");
			return decodeFlag;
		}, '15sec Wait to Scan the Barcode', 16000);

		runs(function()
		{
			var testPassed = confirm("Do you see Correct Behavior?");
			expect(testPassed).toEqual(true);
		});

	});


	it("VT282-1778 | call setDefault with SCN1 and take |", function() {

		var callbacktake = function (data){
		alert();
		dispCurrentProcess($.toJSON(data));
		}
		
		runs(function()
		{
			var enumData = Rho.Barcode.enumerate();
			Rho.Barcode.setDefault(objSCN);
			Rho.Barcode.take({},callbacktake);
			setTimeout(function() {
				enableFlag = true;
			}, 8000);
		});

		waitsFor(function()
		{
			dispCurrentProcess("Enabling Scanner");
			return enableFlag;
		}, '8sec Wait to enable the Scanner', 9000);

		runs(function()
		{		
			setTimeout(function() {
				decodeFlag = true;
			}, 15000);
		});

		waitsFor(function()
		{
			dispCurrentProcess("scan any barcode <br/> check for Behavior");
			return decodeFlag;
		}, '15sec Wait to Scan the Barcode', 16000);

		runs(function()
		{
			var testPassed = confirm("Do you see Correct Behavior?");
			expect(testPassed).toEqual(true);
		});

	});

	it("VT282-1781 | call setDefault with SCN1 and enable |", function() {

		var callbackBarcode = function (data){
		alert();
		dispCurrentProcess($.toJSON(data));
		}
		
		runs(function()
		{
			var enumData = Rho.Barcode.enumerate();
			Rho.Barcode.setDefault(objSCN);
			Rho.Barcode.enable({},callbackBarcode);
			setTimeout(function() {
				enableFlag = true;
			}, 8000);
		});

		waitsFor(function()
		{
			dispCurrentProcess("Enabling Scanner");
			return enableFlag;
		}, '8sec Wait to enable the Scanner', 9000);

		runs(function()
		{		
			Rho.Barcode.picklistMode = 'softwareReticle'
			setTimeout(function() {
				decodeFlag = true;
			}, 15000);
		});

		waitsFor(function()
		{
			dispCurrentProcess("scan any barcode <br/> check for Behavior");
			return decodeFlag;
		}, '15sec Wait to Scan the Barcode', 16000);

		runs(function()
		{
			var testPassed = confirm("Do you see Correct Behavior?");
			expect(testPassed).toEqual(true);
			Rho.Barcode.disable();
		});

	});


	it("VT282-1784 | Start and stop scanner for laser/Imager scanner |", function() {

		var callbackBarcode = function (data){
		alert();
		dispCurrentProcess($.toJSON(data));
		}
		
		runs(function()
		{
			var enumData = Rho.Barcode.enumerate();
			objSCN.enable({},callbackBarcode);
			setTimeout(function() {
				enableFlag = true;
			}, 8000);
		});

		waitsFor(function()
		{
			dispCurrentProcess("Enabling Scanner");
			return enableFlag;
		}, '8sec Wait to enable the Scanner', 9000);

		runs(function()
		{		
			Rho.Barcode.scantimeout = '12000';
			Rho.Barcode.start();
			setTimeout(function() {
				decodeFlag = true;
			}, 8000);
		});

		waitsFor(function()
		{
			dispCurrentProcess("check for start and stop of scanner <br/> check for Behavior");
			return decodeFlag;
		}, '15sec Wait to Scan the Barcode', 9000);

		runs(function()
		{
			Rho.Barcode.stop();
			var testPassed = confirm("Do you see Correct Behavior?");
			expect(testPassed).toEqual(true);
		});

	});

	it("VT282-1790 | take with callback as function |", function() {

		var callbacktake = function (data){
		alert();
		dispCurrentProcess($.toJSON(data));
		}
		
		runs(function()
		{
			var enumData = Rho.Barcode.enumerate();
			objSCN.take({},callbacktake);
			setTimeout(function() {
				enableFlag = true;
			}, 8000);
		});

		waitsFor(function()
		{
			dispCurrentProcess("Enabling Scanner");
			return enableFlag;
		}, '8sec Wait to enable the Scanner', 9000);

		runs(function()
		{		
			setTimeout(function() {
				decodeFlag = true;
			}, 15000);
		});

		waitsFor(function()
		{
			dispCurrentProcess("scan any barcode <br/> check for Behavior");
			return decodeFlag;
		}, '15sec Wait to Scan the Barcode', 16000);

		runs(function()
		{
			var testPassed = confirm("Do you see Correct Behavior?");
			expect(testPassed).toEqual(true);
		});
	});

	it("VT282-1792 | take with alldecoders enabled and callback |", function() {

		var callbacktake = function (data){
		alert();
		dispCurrentProcess($.toJSON(data));
		}
		
		runs(function()
		{
			var enumData = Rho.Barcode.enumerate();
			objSCN.take({'allDecoders':'true'},callbacktake);
			setTimeout(function() {
				enableFlag = true;
			}, 8000);
		});

		waitsFor(function()
		{
			dispCurrentProcess("Enabling Scanner");
			return enableFlag;
		}, '8sec Wait to enable the Scanner', 9000);

		runs(function()
		{		
			setTimeout(function() {
				decodeFlag = true;
			}, 15000);
		});

		waitsFor(function()
		{
			dispCurrentProcess("scan code93 barcode <br/> only code128 will decode <br/> check for Behavior");
			return decodeFlag;
		}, '15sec Wait to Scan the Barcode', 16000);

		runs(function()
		{
			var testPassed = confirm("Do you see Correct Behavior?");
			expect(testPassed).toEqual(true);
		});

	});

	it("VT282-1793 | take with picklist software reticle, scantimeout 7000 and callback |", function() {

		var callbacktake = function (data){
		alert();
		dispCurrentProcess($.toJSON(data));
		}
		
		runs(function()
		{
			var enumData = Rho.Barcode.enumerate();
			objSCN.take({'scanTimeout':7000,'picklistMode':'softwareReticle'},callbacktake);
			setTimeout(function() {
				enableFlag = true;
			}, 8000);
		});

		waitsFor(function()
		{
			dispCurrentProcess("Enabling Scanner");
			return enableFlag;
		}, '8sec Wait to enable the Scanner', 9000);

		runs(function()
		{		
			setTimeout(function() {
				decodeFlag = true;
			}, 15000);
		});

		waitsFor(function()
		{
			dispCurrentProcess("check for scantimeout as 7000 and picklistMode as reticle <br/> check for Behavior");
			return decodeFlag;
		}, '15sec Wait to Scan the Barcode', 16000);

		runs(function()
		{
			var testPassed = confirm("Do you see Correct Behavior?");
			expect(testPassed).toEqual(true);
		});

	});

	it("VT282-1794 | Take with alldecoders disabled, code128 as enabled with callback as function URL |", function() {

		var callbacktake = function (data){
		alert();
		dispCurrentProcess($.toJSON(data));
		}
		
		runs(function()
		{
			var enumData = Rho.Barcode.enumerate();
			objSCN.take({'allDecoders':'false','code128':'true'},callbacktake);
			setTimeout(function() {
				enableFlag = true;
			}, 8000);
		});

		waitsFor(function()
		{
			dispCurrentProcess("Enabling Scanner");
			return enableFlag;
		}, '8sec Wait to enable the Scanner', 9000);

		runs(function()
		{		
			setTimeout(function() {
				decodeFlag = true;
			}, 15000);
		});

		waitsFor(function()
		{
			dispCurrentProcess("scan other barcode and scan code128 barcode <br/> only code128 will decode");
			return decodeFlag;
		}, '15sec Wait to Scan the Barcode', 16000);

		runs(function()
		{
			var testPassed = confirm("Do you see Correct Behavior?");
			expect(testPassed).toEqual(true);
		});

	});

	it("VT282-1797 | Take with callback as anonymous function |", function() {
		
		runs(function()
		{
			var enumData = Rho.Barcode.enumerate();
			objSCN.take({},function(data){dispCurrentProcess($.toJSON(data));});
			setTimeout(function() {
				enableFlag = true;
			}, 8000);
		});

		waitsFor(function()
		{
			dispCurrentProcess("Enabling Scanner");
			return enableFlag;
		}, '8sec Wait to enable the Scanner', 9000);

		runs(function()
		{		
			setTimeout(function() {
				decodeFlag = true;
			}, 15000);
		});

		waitsFor(function()
		{
			dispCurrentProcess("Scan any Barcode <br/> Check the Behavior");
			return decodeFlag;
		}, '15sec Wait to Scan the Barcode', 16000);

		runs(function()
		{
			var testPassed = confirm("Do you see Correct Behavior?");
			expect(testPassed).toEqual(true);
		});

	});

	it("VT282-1800 | All Decoders true with setproperty and nocallback |", function() {
		
		var callbackBarcode = function (data){
		dispCurrentProcess($.toJSON(data));
		}

		runs(function()
		{
			var enumData = Rho.Barcode.enumerate();
			objSCN.enable({},callbackBarcode);
			setTimeout(function() {
				enableFlag = true;
			}, 8000);
		});
		waitsFor(function()
		{
			dispCurrentProcess("Enabling Scanner");
			return enableFlag;
		}, '8sec Wait to enable the Scanner', 9000);

		runs(function()
		{		
			Rho.Barcode.setproperty(allDecoders,true);
			setTimeout(function() {
				decodeFlag = true;
			}, 15000);
		});

		waitsFor(function()
		{
			dispCurrentProcess("Scan code93 Barcode <br/> Barcode should decode");
			return decodeFlag;
		}, '15sec Wait to Scan the Barcode', 16000);

		runs(function()
		{
			var testPassed = confirm("Do you see Correct Behavior?");
			expect(testPassed).toEqual(true);
		});

	});

	it("VT282-1801 | All Decoders false with setproperty and nocallback |", function() {
		
		var callbackBarcode = function (data){
		dispCurrentProcess($.toJSON(data));
		}

		runs(function()
		{
			var enumData = Rho.Barcode.enumerate();
			objSCN.enable({},callbackBarcode);
			setTimeout(function() {
				enableFlag = true;
			}, 8000);
		});
		waitsFor(function()
		{
			dispCurrentProcess("Enabling Scanner");
			return enableFlag;
		}, '8sec Wait to enable the Scanner', 9000);

		runs(function()
		{		
			Rho.Barcode.setproperty(allDecoders,false);
			setTimeout(function() {
				decodeFlag = true;
			}, 15000);
		});

		waitsFor(function()
		{
			dispCurrentProcess("Scan code39 Barcode <br/> barcode should not decode");
			return decodeFlag;
		}, '15sec Wait to Scan the Barcode', 16000);

		runs(function()
		{
			var testPassed = confirm("Do you see Correct Behavior?");
			expect(testPassed).toEqual(true);
		});

	});


	it("VT282-1814 | autotenter true with setproperty |", function() {
		

		runs(function()
		{
			var enumData = Rho.Barcode.enumerate();
			objSCN.enable();
			setTimeout(function() {
				enableFlag = true;
			}, 8000);
		});
		waitsFor(function()
		{
			dispCurrentProcess("Enabling Scanner");
			return enableFlag;
		}, '8sec Wait to enable the Scanner', 9000);

		runs(function()
		{		
			Rho.Barcode.setproperty(autoenter,true);
			setTimeout(function() {
				decodeFlag = true;
			}, 15000);
		});

		waitsFor(function()
		{
			dispCurrentProcess("check for autoenter true <br/> check for behvaiour");
			return decodeFlag;
		}, '15sec Wait to Scan the Barcode', 16000);

		runs(function()
		{
			var testPassed = confirm("Do you see Correct Behavior?");
			expect(testPassed).toEqual(true);
		});

	});

	it("VT282-1815 | autoenter false with setproperty |", function() {
		
		runs(function()
		{
			var enumData = Rho.Barcode.enumerate();
			objSCN.enable();
			setTimeout(function() {
				enableFlag = true;
			}, 8000);
		});
		waitsFor(function()
		{
			dispCurrentProcess("Enabling Scanner");
			return enableFlag;
		}, '8sec Wait to enable the Scanner', 9000);

		runs(function()
		{		
			Rho.Barcode.setproperty(autoenter,false);
			setTimeout(function() {
				decodeFlag = true;
			}, 15000);
		});

		waitsFor(function()
		{
			dispCurrentProcess("check for autoenter false <br/> check for behvaiour");
			return decodeFlag;
		}, '15sec Wait to Scan the Barcode', 16000);

		runs(function()
		{
			var testPassed = confirm("Do you see Correct Behavior?");
			expect(testPassed).toEqual(true);
		});

	});


	it("VT282-1816 | autotab true with setproperty |", function() {
		

		runs(function()
		{
			var enumData = Rho.Barcode.enumerate();
			objSCN.enable();
			setTimeout(function() {
				enableFlag = true;
			}, 8000);
		});
		waitsFor(function()
		{
			dispCurrentProcess("Enabling Scanner");
			return enableFlag;
		}, '8sec Wait to enable the Scanner', 9000);

		runs(function()
		{		
			Rho.Barcode.setproperty(autotab,true);
			setTimeout(function() {
				decodeFlag = true;
			}, 15000);
		});

		waitsFor(function()
		{
			dispCurrentProcess("check for autotab true <br/> check for behvaiour");
			return decodeFlag;
		}, '15sec Wait to Scan the Barcode', 16000);

		runs(function()
		{
			var testPassed = confirm("Do you see Correct Behavior?");
			expect(testPassed).toEqual(true);
		});

	});

	it("VT282-1817 | autotab false with setproperty |", function() {
		

		runs(function()
		{
			var enumData = Rho.Barcode.enumerate();
			objSCN.enable();
			setTimeout(function() {
				enableFlag = true;
			}, 8000);
		});
		waitsFor(function()
		{
			dispCurrentProcess("Enabling Scanner");
			return enableFlag;
		}, '8sec Wait to enable the Scanner', 9000);

		runs(function()
		{		
			Rho.Barcode.setproperty(autotab,false);
			setTimeout(function() {
				decodeFlag = true;
			}, 15000);
		});

		waitsFor(function()
		{
			dispCurrentProcess("check for autotab false <br/> check for behvaiour");
			return decodeFlag;
		}, '15sec Wait to Scan the Barcode', 16000);

		runs(function()
		{
			var testPassed = confirm("Do you see Correct Behavior?");
			expect(testPassed).toEqual(true);
		});

	});

	it("VT282-1826 | Enable with autoenter and no callback |", function() {
		

		runs(function()
		{
			var enumData = Rho.Barcode.enumerate();
			objSCN.enable({"autoenter":"true"});
			setTimeout(function() {
				enableFlag = true;
			}, 8000);
		});
		waitsFor(function()
		{
			dispCurrentProcess("Enabling Scanner");
			return enableFlag;
		}, '8sec Wait to enable the Scanner', 9000);

		runs(function()
		{		
			//Rho.Barcode.setproperty(autotab,false);
			setTimeout(function() {
				decodeFlag = true;
			}, 15000);
		});

		waitsFor(function()
		{
			dispCurrentProcess("check for autoenter true <br/> check for behvaiour");
			return decodeFlag;
		}, '15sec Wait to Scan the Barcode', 16000);

		runs(function()
		{
			var testPassed = confirm("Do you see Correct Behavior?");
			expect(testPassed).toEqual(true);
		});

	});

	it("VT282-1964 | set decodeDuration to 5000 |", function() {
		
		var callbackBarcode = function (data){
			alert();
			dispCurrentProcess($.toJSON(data));
		}

		runs(function()
		{
			var enumData = Rho.Barcode.enumerate();
			objSCN.enable({},callbackBarcode);
			setTimeout(function() {
				enableFlag = true;
			}, 8000);
		});
		waitsFor(function()
		{
			dispCurrentProcess("Enabling Scanner");
			return enableFlag;
		}, '8sec Wait to enable the Scanner', 9000);

		runs(function()
		{		
			Rho.Barcode.decodeDuration = '5000';
			setTimeout(function() {
				decodeFlag = true;
			}, 15000);
		});

		waitsFor(function()
		{
			dispCurrentProcess("check decode beep duration as 5 sec <br/> check for behvaiour");
			return decodeFlag;
		}, '15sec Wait to Scan the Barcode', 16000);

		runs(function()
		{
			var testPassed = confirm("Do you see Correct Behavior?");
			expect(testPassed).toEqual(true);
		});

	});

	it("VT282-1968 | set decodeFrequency to 65535 |", function() {
		
		var callbackBarcode = function (data){
			alert();
			dispCurrentProcess($.toJSON(data));
		}

		runs(function()
		{
			var enumData = Rho.Barcode.enumerate();
			objSCN.enable({},callbackBarcode);
			setTimeout(function() {
				enableFlag = true;
			}, 8000);
		});
		waitsFor(function()
		{
			dispCurrentProcess("Enabling Scanner");
			return enableFlag;
		}, '8sec Wait to enable the Scanner', 9000);

		runs(function()
		{		
			Rho.Barcode.decodeFrequency  = '65535';
			setTimeout(function() {
				decodeFlag = true;
			}, 15000);
		});

		waitsFor(function()
		{
			dispCurrentProcess("check decode frequency as 65535<br/> check for behvaiour");
			return decodeFlag;
		}, '15sec Wait to Scan the Barcode', 16000);

		runs(function()
		{
			var testPassed = confirm("Do you see Correct Behavior?");
			expect(testPassed).toEqual(true);
		});

	});


	it("VT282-1969 | set decodeFrequency to 0 |", function() {
		
		var callbackBarcode = function (data){
			alert();
			dispCurrentProcess($.toJSON(data));
		}

		runs(function()
		{
			var enumData = Rho.Barcode.enumerate();
			objSCN.enable({},callbackBarcode);
			setTimeout(function() {
				enableFlag = true;
			}, 8000);
		});
		waitsFor(function()
		{
			dispCurrentProcess("Enabling Scanner");
			return enableFlag;
		}, '8sec Wait to enable the Scanner', 9000);

		runs(function()
		{		
			Rho.Barcode.decodeFrequency  = '0';
			setTimeout(function() {
				decodeFlag = true;
			}, 15000);
		});

		waitsFor(function()
		{
			dispCurrentProcess("check decode frequency as 0<br/> check for behvaiour");
			return decodeFlag;
		}, '15sec Wait to Scan the Barcode', 16000);

		runs(function()
		{
			var testPassed = confirm("Do you see Correct Behavior?");
			expect(testPassed).toEqual(true);
		});

	});

	it("VT282-1971 | set invalidDecodeFrequency to 65535 |", function() {
		
		var callbackBarcode = function (data){
			alert();
			dispCurrentProcess($.toJSON(data));
		}

		runs(function()
		{
			var enumData = Rho.Barcode.enumerate();
			objSCN.enable({},callbackBarcode);
			setTimeout(function() {
				enableFlag = true;
			}, 8000);
		});
		waitsFor(function()
		{
			dispCurrentProcess("Enabling Scanner");
			return enableFlag;
		}, '8sec Wait to enable the Scanner', 9000);

		runs(function()
		{		
			Rho.Barcode.invalidDecodeFrequency = '65535';
			setTimeout(function() {
				decodeFlag = true;
			}, 15000);
		});

		waitsFor(function()
		{
			dispCurrentProcess("check decode frequency as 65535<br/> check for behvaiour");
			return decodeFlag;
		}, '15sec Wait to Scan the Barcode', 16000);

		runs(function()
		{
			var testPassed = confirm("Do you see Correct Behavior?");
			expect(testPassed).toEqual(true);
		});

	});


	it("VT282-1972 | set invalidDecodeFrequency to 0 |", function() {
		
		var callbackBarcode = function (data){
			alert();
			dispCurrentProcess($.toJSON(data));
		}

		runs(function()
		{
			var enumData = Rho.Barcode.enumerate();
			objSCN.enable({},callbackBarcode);
			setTimeout(function() {
				enableFlag = true;
			}, 8000);
		});
		waitsFor(function()
		{
			dispCurrentProcess("Enabling Scanner");
			return enableFlag;
		}, '8sec Wait to enable the Scanner', 9000);

		runs(function()
		{		
			Rho.Barcode.invalidDecodeFrequency  = '0';
			setTimeout(function() {
				decodeFlag = true;
			}, 15000);
		});

		waitsFor(function()
		{
			dispCurrentProcess("check invaliddecode frequency as 0<br/> check for behvaiour");
			return decodeFlag;
		}, '15sec Wait to Scan the Barcode', 16000);

		runs(function()
		{
			var testPassed = confirm("Do you see Correct Behavior?");
			expect(testPassed).toEqual(true);
		});

	});

	it("VT282-1974 | set decodeSound to local wave file path |", function() {
		
		var callbackBarcode = function (data){
			alert();
			dispCurrentProcess($.toJSON(data));
		}

		runs(function()
		{
			var enumData = Rho.Barcode.enumerate();
			objSCN.enable({},callbackBarcode);
			setTimeout(function() {
				enableFlag = true;
			}, 8000);
		});
		waitsFor(function()
		{
			dispCurrentProcess("Enabling Scanner");
			return enableFlag;
		}, '8sec Wait to enable the Scanner', 9000);

		runs(function()
		{		
			Rho.Barcode.decodeSound = 'file://Application/alarm5.wav';
			setTimeout(function() {
				decodeFlag = true;
			}, 15000);
		});

		waitsFor(function()
		{
			dispCurrentProcess("check for the wave file playing after decode <br/> check for behvaiour");
			return decodeFlag;
		}, '15sec Wait to Scan the Barcode', 16000);

		runs(function()
		{
			var testPassed = confirm("Do you see Correct Behavior?");
			expect(testPassed).toEqual(true);
		});

	});

	it("VT282-1978 | set decodeVolume to 5 |", function() {
		
		var callbackBarcode = function (data){
			alert();
			dispCurrentProcess($.toJSON(data));
		}

		runs(function()
		{
			var enumData = Rho.Barcode.enumerate();
			objSCN.enable({},callbackBarcode);
			setTimeout(function() {
				enableFlag = true;
			}, 8000);
		});
		waitsFor(function()
		{
			dispCurrentProcess("Enabling Scanner");
			return enableFlag;
		}, '8sec Wait to enable the Scanner', 9000);

		runs(function()
		{		
			Rho.Barcode.decodeVolume = '5';
			setTimeout(function() {
				decodeFlag = true;
			}, 15000);
		});

		waitsFor(function()
		{
			dispCurrentProcess("check for the decode beep volume as 5 <br/> check for behvaiour");
			return decodeFlag;
		}, '15sec Wait to Scan the Barcode', 16000);

		runs(function()
		{
			var testPassed = confirm("Do you see Correct Behavior?");
			expect(testPassed).toEqual(true);
		});

	});

	it("VT282-1979 | set decodeVolume to 0 |", function() {
		
		var callbackBarcode = function (data){
			alert();
			dispCurrentProcess($.toJSON(data));
		}

		runs(function()
		{
			var enumData = Rho.Barcode.enumerate();
			objSCN.enable({},callbackBarcode);
			setTimeout(function() {
				enableFlag = true;
			}, 8000);
		});
		waitsFor(function()
		{
			dispCurrentProcess("Enabling Scanner");
			return enableFlag;
		}, '8sec Wait to enable the Scanner', 9000);

		runs(function()
		{		
			Rho.Barcode.decodeVolume = '0';
			setTimeout(function() {
				decodeFlag = true;
			}, 15000);
		});

		waitsFor(function()
		{
			dispCurrentProcess("check for the decode beep volume as 0 <br/> check for behvaiour");
			return decodeFlag;
		}, '15sec Wait to Scan the Barcode', 16000);

		runs(function()
		{
			var testPassed = confirm("Do you see Correct Behavior?");
			expect(testPassed).toEqual(true);
		});

	});


	it("VT282-2010 | set hapticFeedback as true |", function() {
		
		var callbackBarcode = function (data){
			alert();
			dispCurrentProcess($.toJSON(data));
		}

		runs(function()
		{
			var enumData = Rho.Barcode.enumerate();
			objSCN.enable({},callbackBarcode);
			setTimeout(function() {
				enableFlag = true;
			}, 8000);
		});
		waitsFor(function()
		{
			dispCurrentProcess("Enabling Scanner");
			return enableFlag;
		}, '8sec Wait to enable the Scanner', 9000);

		runs(function()
		{		
			Rho.Barcode.hapticFeedback = 'true';
			setTimeout(function() {
				decodeFlag = true;
			}, 15000);
		});

		waitsFor(function()
		{
			dispCurrentProcess("check for hapticFeedback true <br/> check for behvaiour");
			return decodeFlag;
		}, '15sec Wait to Scan the Barcode', 16000);

		runs(function()
		{
			var testPassed = confirm("Do you see Correct Behavior?");
			expect(testPassed).toEqual(true);
		});

	});

	it("VT282-2011 | set hapticFeedback as false |", function() {
		
		var callbackBarcode = function (data){
			alert();
			dispCurrentProcess($.toJSON(data));
		}

		runs(function()
		{
			var enumData = Rho.Barcode.enumerate();
			objSCN.enable({},callbackBarcode);
			setTimeout(function() {
				enableFlag = true;
			}, 8000);
		});
		waitsFor(function()
		{
			dispCurrentProcess("Enabling Scanner");
			return enableFlag;
		}, '8sec Wait to enable the Scanner', 9000);

		runs(function()
		{		
			Rho.Barcode.hapticFeedback = 'false';
			setTimeout(function() {
				decodeFlag = true;
			}, 15000);
		});

		waitsFor(function()
		{
			dispCurrentProcess("check for hapticFeedback false <br/> check for behvaiour");
			return decodeFlag;
		}, '15sec Wait to Scan the Barcode', 16000);

		runs(function()
		{
			var testPassed = confirm("Do you see Correct Behavior?");
			expect(testPassed).toEqual(true);
		});

	});

	it("VT282-1986 | set lowBatteryScan as true |", function() {
		
		var callbackBarcode = function (data){
			alert();
			dispCurrentProcess($.toJSON(data));
		}

		runs(function()
		{
			var enumData = Rho.Barcode.enumerate();
			objSCN.enable({},callbackBarcode);
			setTimeout(function() {
				enableFlag = true;
			}, 8000);
		});
		waitsFor(function()
		{
			dispCurrentProcess("Enabling Scanner");
			return enableFlag;
		}, '8sec Wait to enable the Scanner', 9000);

		runs(function()
		{		
			Rho.Barcode.lowBatteryScan='true';
			setTimeout(function() {
				decodeFlag = true;
			}, 15000);
		});

		waitsFor(function()
		{
			dispCurrentProcess("drain down the battery of device and when it reaches less than 10%, try to scan the barcode <br/> check for behvaiour");
			return decodeFlag;
		}, '15sec Wait to Scan the Barcode', 16000);

		runs(function()
		{
			var testPassed = confirm("Do you see Correct Behavior?");
			expect(testPassed).toEqual(true);
		});

	});

	it("VT282-1987 | set lowBatteryScan as false |", function() {
		
		var callbackBarcode = function (data){
			alert();
			dispCurrentProcess($.toJSON(data));
		}

		runs(function()
		{
			var enumData = Rho.Barcode.enumerate();
			objSCN.enable({},callbackBarcode);
			setTimeout(function() {
				enableFlag = true;
			}, 8000);
		});
		waitsFor(function()
		{
			dispCurrentProcess("Enabling Scanner");
			return enableFlag;
		}, '8sec Wait to enable the Scanner', 9000);

		runs(function()
		{		
			Rho.Barcode.lowBatteryScan='false';
			setTimeout(function() {
				decodeFlag = true;
			}, 15000);
		});

		waitsFor(function()
		{
			dispCurrentProcess("drain down the battery of device and when it reaches less than 10%, try to scan the barcode <br/> check for behvaiour");
			return decodeFlag;
		}, '15sec Wait to Scan the Barcode', 16000);

		runs(function()
		{
			var testPassed = confirm("Do you see Correct Behavior?");
			expect(testPassed).toEqual(true);
		});

	});

	it("VT282-1994 | call getAllProperties() with async callback |", function() {
		
		var callbackBarcode = function (data){
			alert();
			dispCurrentProcess($.toJSON(data));
		}
		var callbackallproperties =  function (data){
			alert();
			dispCurrentProcess($.toJSON(data));
		}

		runs(function()
		{
			var enumData = Rho.Barcode.enumerate();
			objSCN.enable();
			setTimeout(function() {
				enableFlag = true;
			}, 8000);
		});
		waitsFor(function()
		{
			dispCurrentProcess("Enabling Scanner");
			return enableFlag;
		}, '8sec Wait to enable the Scanner', 9000);

		runs(function()
		{		
			objSCN.getAllProperties(callbackallproperties);
			setTimeout(function() {
				decodeFlag = true;
			}, 15000);
		});

		waitsFor(function()
		{
			dispCurrentProcess("check for the retruned hash of getAllProperties <br/> check for behvaiour");
			return decodeFlag;
		}, '15sec Wait to Scan the Barcode', 16000);

		runs(function()
		{
			var testPassed = confirm("Do you see Correct Behavior?");
			expect(testPassed).toEqual(true);
		});

	});

	it("VT282-1994 | call getAllProperties() after set using Barcode.Propertyname for reader param |", function() {
		
		var callbackBarcode = function (data){
			alert();
			dispCurrentProcess($.toJSON(data));
		}
		var callbackallproperties =  function (data){
			alert();
			dispCurrentProcess($.toJSON(data));
		}

		runs(function()
		{
			var enumData = Rho.Barcode.enumerate();
			objSCN.enable();
			setTimeout(function() {
				enableFlag = true;
			}, 8000);
		});
		waitsFor(function()
		{
			dispCurrentProcess("Enabling Scanner");
			return enableFlag;
		}, '8sec Wait to enable the Scanner', 9000);

		runs(function()
		{		
			objSCN.picklistMode = "softwareReticle";
			objSCN.scantimeout = "7000";
			objSCN.getAllProperties(callbackallproperties);
			setTimeout(function() {
				decodeFlag = true;
			}, 15000);
		});

		waitsFor(function()
		{
			dispCurrentProcess("check for the retruned hash of getAllProperties <br/> check for behvaiour");
			return decodeFlag;
		}, '15sec Wait to Scan the Barcode', 16000);

		runs(function()
		{
			var testPassed = confirm("Do you see Correct Behavior?");
			expect(testPassed).toEqual(true);
		});

	});

})(enumData[j]);

}

});	