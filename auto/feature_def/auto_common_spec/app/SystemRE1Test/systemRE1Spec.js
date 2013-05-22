describe("System", function() {
	describe("Testing System APIs from RE1 in Ruby via AJAX", function() {
	
		beforeEach(function() {
			//document.getElementById('networkPort').innerHTML = "8999";
			//document.getElementById('connectionStatus').innerHTML = "No Status";
			//  Stop polling the network
			//stopDetectingConnection();
		});
		
	
		afterEach(function() 
		{
			//  Stop polling the network
			//stopDetectingConnection();
		});

		it ("Testing UUID, expect the length to be 32", function()
		{
			var myUUID = getUuidSync();
			expect(myUUID.length).toBe(32);
		});
		
		it ("Testing OEM, expect the returned value to not be empty", function()
		{
			var myOEM = getOemSync();
			expect(myOEM).not.toBe("");
		});
		
		var deviceOS = Rho.System.platform;
		if(deviceOS.toLowerCase().indexOf('windows') >= 0)
		{
			//  Registry Tests
			//  4 Keys to test:
			//  (In order HKEY_CLASSES_ROOT = 0, HKEY_CURRENT_USER = 1, HKEY_LOCAL_MACHINE = 2, HKEY_USERS = 3)
			var regHivesToTest = ['HKCR', 'HKCU', 'HKLM', 'HKU'];
			//  We'll use the same subkey for each corresponding HKEY
			var regSubkeysToTest = ['http', 'software', 'software', 'userKey'];
			//  4 Types of property to test:
			//  (In order: String = 1, Binary = 3, Number = 4, Multi-line String = 7)
			var regTypesToTest = ['String', 'Binary', 'DWORD', 'MultiSZ'];
			//  We need some data to test with
			var regSettingsToTest = ['lion', 'giraffeLegs', 'zebraCount', 'cow'];
			var regValuesToTest   = ['roar', '110011', '53698', 'moo\\nmoo\\nmoo'];
			var regValuesExpected = ['roar', '110011', '53698', 'moo\nmoo\nmoo'];
				
			for (var i=0; i<regHivesToTest.length; i++) 
			{
				for (var j=0; j<regTypesToTest.length; j++)
				{
					for (var k=0; k < regTypesToTest.length; k++)
					{
						(function(idx, idy, idz) 
						{ 
							//  Test each of the Registry Types
							it ("Testing the Registry with Key: " + regHivesToTest[idx] + " and subkey " + regSubkeysToTest[idy] + " for type " + regTypesToTest[idz], function()
							{
								runs(function() 
								{		
									//  Set the Registry Key
									var setSuccess = setRegistrySync(regHivesToTest[idx], regTypesToTest[idz], regSubkeysToTest[idy], regSettingsToTest[idz], regValuesToTest[idz], false);
									expect(setSuccess).toBe("true");
									
									//  Retrieve the Registry setting
									var retrievedSetting = getRegistrySync(regHivesToTest[idx], regSubkeysToTest[idy], regSettingsToTest[idz]);
									expect(retrievedSetting).toBe(regValuesExpected[idz]);
									
									//  Delete the Registry setting
									var deleteSuccess = deleteRegistrySync(regHivesToTest[idx], regSubkeysToTest[idy], regSettingsToTest[idz], false);
									expect(deleteSuccess).toBe("true");
									
									//  Retrieve the Registry setting (this time we expect a blank string)
									var retrievedSetting = getRegistrySync(regHivesToTest[idx], regSubkeysToTest[idy], regSettingsToTest[idz]);
									expect(retrievedSetting).toBe("");

								});
							});
						})(i, j, k);
					};
				}
			}
		}
	});
});
