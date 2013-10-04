describe("Barcode Ruby API Test", function() {
	describe("Testing Property Retrieval in Ruby via AJAX", function() {
	
		beforeEach(function() {
			document.getElementById('retProp').innerHTML = "blank";
		});
		
	
		afterEach(function() {
		});

		//  We need to hard code this information 
		var deviceOS = Rho.System.platform;
		var deviceType = Rho.System.deviceName;
		//alert(deviceType);
		//var excludedDevices = "MC45|Motorola MC92N0G";
		//alert(excludedDevices == "" || (excludedDevices != "" && excludedDevices.toLowerCase().indexOf(deviceType.toLowerCase()) == -1));
		var currentK = -1;
		
		var numberOfScanners = getScannerNumber();
		if(deviceOS.toLowerCase().indexOf('android') >= 0 && numberOfScanners > 1) numberOfScanners = 1;
		var scannerTypeUnderTest = "Laser";
				  
		for (var k=0; k<numberOfScanners; k++)
		{
			for ( var i=0; i<testCases.length; i++ ) 
			{ 
				for (var j=0; j<testCases[i].values.length; j++)
				{
					if (testCases[i].excludedDevices == "" || 
						(testCases[i].excludedDevices != "" && testCases[i].excludedDevices.toLowerCase().indexOf(deviceType.toLowerCase()) == -1))
					{
						if (testCases[i].excludedOS == "" || 
							(testCases[i].excludedOS != "" && deviceOS.toLowerCase().indexOf(testCases[i].excludedOS.toLowerCase()) == -1))
						{
							(function(idx, idj, idk) 
							{ 
								it (testCases[idx].testName + " with Value " + testCases[idx].values[idj] + " on scanner " + idk + " with device " + deviceType, function()
								{ 
									var currentScannerType = "";
									var scannerFriendlyName = "";
									runs(function() 
									{
										if (idk != currentK)
										{
											barcodeDisable();
											setDefaultScanner(idk);
											barcodeEnable();
											document.getElementById('scannerReady').innerHTML = "no"
											setTimeout(function(){document.getElementById('scannerReady').innerHTML = "yes"},10000);
											waitsFor(function() 
											{
												return document.getElementById('scannerReady').innerHTML == "yes";
											}, "Giving Scanner 10 seconds to enable", 11000);
											currentK = idk;
										}
										
										runs(function() 
										{
											//  We need to retrieve this here as the scanner is required to be enabled
											currentScannerType = getBarcodePropertySync("scannerType");
									
											if (testCases[idx].scannerTypes == "All" ||
												testCases[idx].scannerTypes == "" ||
												testCases[idx].scannerTypes == currentScannerType)
											{
												//  Don't run these tests for Bluetooth Scanners (Enable requires user interaction to pair the scanner and you can't plug the BT scanneres in)
												runs(function() 
												{
													document.getElementById('retProp').innerHTML = "blank";
													setBarcodePropertySync(testCases[idx].propertyName, testCases[idx].values[idj]);
													var storedPropertyValue = getBarcodePropertySync(testCases[idx].propertyName);
													expect(storedPropertyValue).toBe(testCases[idx].values[idj]);
												});
										
//												waitsFor(function() 
//												{
//													return document.getElementById('retProp').innerHTML != "blank";
//												}, "Property didn't get retrieved", 5000);

//												runs(function() 
//												{
//													expect(document.getElementById('retProp').innerHTML).toBe(testCases[idx].values[idj]);
//												});
											}
										});
									});
								}); 
							})(i, j, k); 
						}
					}
				}
			} 			

		}

	});
});
