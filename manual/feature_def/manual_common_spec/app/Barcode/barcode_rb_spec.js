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

				it("VT282-1762 | Enable with callback as function |" + scnid + scntype , function() {

					runs(function()
					{
						setObjective("VT282-1762 |Enable with callback as function|");
						setInstruction("Scan Barcode code128 with " + scnid);
						setExpected("Is retruned decoded hash displayed correctly with all data?");
						var scnid = objSCN.getProperty('ID');
						Ruby.call("Barcode","enableSCN?scnid="+scnid);
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
						Ruby.call("Barcode","BarcodeDisable");
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
							var scnid = objSCN.getProperty('ID');
							Ruby.call("Barcode","enableSCN?scnid="+scnid);
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
							Ruby.call("Barcode","setTriggerConnected?value=false");
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
							Ruby.call("Barcode","setTriggerConnected?value=true");
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
							Ruby.call("Barcode","setTriggerConnected?value=false");
							Ruby.call("Barcode","BarcodeDisable");
							});

						});
					});	

					it("re-enable the scanner after disabling the trigger", function() {

						runs(function()
						{
							setObjective("re-enable the scanner after disabling the trigger");
							setInstruction("Press Hardware Trigger button");
							setExpected("Scanner beam should comeup and scan successful");
							var scnid = objSCN.getProperty('ID');
							Ruby.call("Barcode","enableSCN?scnid="+scnid);
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
							Ruby.call("Barcode","BarcodeDisable");
							});
						});
					});	

					it("disconnect the trigger when scanner disabled", function() {

						runs(function()
						{
							setObjective("disconnect the trigger when scanner disabled");
							setInstruction("Press Hardware Trigger button");
							setExpected("Scanner beam should not comeup");

							Ruby.call("Barcode","setTriggerConnected?value=false");						
							var scnid = objSCN.getProperty('ID');
							Ruby.call("Barcode","enableSCN?scnid="+scnid);
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
							Ruby.call("Barcode","BarcodeDisable");							
							});
						});
					});		

					it("set triggerConnected as true after scanner disable", function() {

						runs(function()
						{
							setObjective("set triggerConnected as true after scanner disable");
							setInstruction("Press Hardware Trigger button");
							setExpected("Scanner beam should not comeup");
							Ruby.call("Barcode","setTriggerConnected?value=true");							
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
							Ruby.call("Barcode","BarcodeDisable");
							});
						});
					});		

					it("call start after setting triggerConnected as false", function() {

						runs(function()
						{
							setObjective("call start after setting triggerConnected as false");
							setInstruction("wait for 9 sec and don't Press Hardware Trigger button");
							setExpected("Scanner beam should not comeup automatically");
							var scnid = objSCN.getProperty('ID');
							Ruby.call("Barcode","enableSCN?scnid="+scnid);
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
							Ruby.call("Barcode","setTriggerConnected?value=false");
							Ruby.call("Barcode","BarcodeStart");
							waitsFor(function() {
							return document.getElementById("actResult").innerHTML != "init";
							}, "Timed out waiting for tester to respond", 300000);
							runs(function() {
							expect("pass").toEqual(document.getElementById("actResult").innerHTML);
							Ruby.call("Barcode","BarcodeStop");
							Ruby.call("Barcode","BarcodeDisable");
							});

						});
					});		

					it("call captureTrigger after setting triggerConnected as false", function() {

						runs(function()
						{
							setObjective("call captureTrigger after setting triggerConnected as false");
							setInstruction("wait for 9 sec and Press Hardware Trigger button");
							setExpected("Scanner beam should not comeup and trigger value of should be shown");
							var scnid = objSCN.getProperty('ID');
							Ruby.call("Barcode","enableSCN?scnid="+scnid);
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
							Ruby.call("Barcode","setTriggerConnected?value=false");							
							Rho.KeyCapture.captureTrigger(function(data){alert(data.triggerFlag);});
							waitsFor(function() {
							return document.getElementById("actResult").innerHTML != "init";
							}, "Timed out waiting for tester to respond", 300000);
							runs(function() {
							expect("pass").toEqual(document.getElementById("actResult").innerHTML);
							Ruby.call("Barcode","BarcodeDisable");
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
							var scnid = objSCN.getProperty('ID');
							Ruby.call("Barcode","enableSCN?scnid="+scnid);
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
							Ruby.call("Barcode","setTriggerConnected?value=false");	
							Ruby.call("Barcode","setTriggerConnected?value=true");															
							waitsFor(function() {
							return document.getElementById("actResult").innerHTML != "init";
							}, "Timed out waiting for tester to respond", 300000);
							runs(function() {
							expect("pass").toEqual(document.getElementById("actResult").innerHTML);
							Ruby.call("Barcode","BarcodeDisable");
							});
						});
					});

					it("call triggerConnected as true after enabling scanner", function() {

						runs(function()
						{
							setObjective("call triggerConnected as true after enabling scanner");
							setInstruction("wait for 9 sec and Press Hardware Trigger button");
							setExpected("Scanner beam should comeup and scan should be successfully");
							var scnid = objSCN.getProperty('ID');
							Ruby.call("Barcode","enableSCN?scnid="+scnid);
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
							Ruby.call("Barcode","setTriggerConnected?value=true");
							waitsFor(function() {
							return document.getElementById("actResult").innerHTML != "init";
							}, "Timed out waiting for tester to respond", 300000);
							runs(function() {
							expect("pass").toEqual(document.getElementById("actResult").innerHTML);
							Ruby.call("Barcode","BarcodeDisable");							
							});
						});
					});	

					it("triggerConnected as false with application minimize", function() {

						runs(function()
						{
							setObjective("triggerConnected as false with application minimize");
							setInstruction("wait for 9 sec and Press Hardware Trigger button then minimize the app and restore it after 5 sec and press trigger again");
							setExpected("Scanner beam should not comeup after restore the application also");
							var scnid = objSCN.getProperty('ID');
							Ruby.call("Barcode","enableSCNwithTriggerConnected?value=false&scnid="+scnid);
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
							waitsFor(function() {
							return document.getElementById("actResult").innerHTML != "init";
							}, "Timed out waiting for tester to respond", 300000);
							runs(function() {
							expect("pass").toEqual(document.getElementById("actResult").innerHTML);
							Ruby.call("Barcode","BarcodeDisable");							
							});

						});
					});	

					it("triggerConnected as false with device suspend", function() {

						runs(function()
						{
							setObjective("triggerConnected as false with device suspend");
							setInstruction("wait for 9 sec and Press Hardware Trigger button then suspend the device and resume it after 5 sec and press trigger again");
							setExpected("Scanner beam should not comeup after restore the application also");
							var scnid = objSCN.getProperty('ID');
							Ruby.call("Barcode","enableSCN?scnid="+scnid);
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
							Ruby.call("Barcode","setTriggerConnected?value=false");
							waitsFor(function() {
							return document.getElementById("actResult").innerHTML != "init";
							}, "Timed out waiting for tester to respond", 300000);
							runs(function() {
							expect("pass").toEqual(document.getElementById("actResult").innerHTML);
							Ruby.call("Barcode","BarcodeDisable");							
							});
						});
					});	

					it("triggerConnected as false with application background to foreground", function() {

						runs(function()
						{
							setObjective("triggerConnected as false with application background to foreground");
							setInstruction("wait for 9 sec and Press Hardware Trigger button then send the app to background and bring back to foreground after 5 sec and press trigger again");
							setExpected("Scanner beam should not comeup after restore the application also");
							var scnid = objSCN.getProperty('ID');
							Ruby.call("Barcode","enableSCN?scnid="+scnid);
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
							Ruby.call("Barcode","setTriggerConnected?value=false");
							waitsFor(function() {
							return document.getElementById("actResult").innerHTML != "init";
							}, "Timed out waiting for tester to respond", 300000);
							runs(function() {
							expect("pass").toEqual(document.getElementById("actResult").innerHTML);
							Ruby.call("Barcode","BarcodeDisable");							
							});
						});
					});	
				}
			});	
		})(enumData[j]);
	}
});	