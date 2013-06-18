describe("Barcode Test", function() {
	
	var enableFlag = false;
	var decodeFlag = false;
	//var enumData = '';

	var callbacktake = function (data){
			enablecallbackdata(JSON.stringify(data));
		}

	enumData = Rho.Barcode.enumerate();

   for (var j = 0;j<enumData.length;j++){

   (function(objSCN){ 

   	var scnid = objSCN.getProperty('ID');

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


	it("VT282-1790A | take with callback as function and don't scan|"+ scnid, function() {
		
		runs(function()
		{
			setObjective("VT282-1790A | take with callback as function and don't scan|");
			setInstruction("Don't scan any barcode after scanner starts automatically and wait for scanner to stop" + scnid);
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


	it("VT282-2008B | call getProperties() with ID without callback |"+ scnid, function() {

		runs(function()
		{
			setObjective("VT282-2008A | call getProperties() with ID without callback|");
			setInstruction("check for retrurned value" + scnid);
			setExpected("It should return the Scanner ID");
			var data = objSCN.getProperties(['ID']);
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

	it("VT282-2008C | call getProperties() with ID with callback |"+ scnid, function() {

		runs(function()
		{
			setObjective("VT282-2008A | call getProperties() with ID with callback|");
			setInstruction("check for retrurned value" + scnid);
			setExpected("It should return the Scanner ID");
			objSCN.getProperties(['ID'],callbacktake);
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

	it("VT282-2008D | call getProperty() with ID with anonymous callback |"+ scnid, function() {

		runs(function()
		{
			setObjective("VT282-2008A | call getProperty() with ID with anonymous callback|");
			setInstruction("check for retrurned value" + scnid);
			setExpected("It should return the Scanner ID");
			objSCN.getProperty(['ID'],function(data){enablecallbackdata(JSON.stringify(data));});
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

})(enumData[j]);

}

});	