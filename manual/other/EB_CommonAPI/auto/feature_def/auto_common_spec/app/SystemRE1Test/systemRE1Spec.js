describe("System", function() {

    beforeEach(function () {
        var matchers = {
            isNotEmptyString: function () {
                return (typeof this.actual == 'string') && (this.actual.length != 0)
            },
            isNumberGreaterThenZero: function () {
                return (typeof this.actual == 'number') && (this.actual > 0)
            },
            isBoolean: function () {
                return typeof this.actual == 'boolean';
            }
        };
        this.addMatchers(
            matchers
        );
    });
	describe("<System Module Specs>", function () {

	    /* System property specs */




        it("Should return platform name [VT300-039:Test platform property]", function () {
            expect(EB.System.getProperty("platform")).isNotEmptyString();
            expect(EB.System.platform).isNotEmptyString();
        });

        it("Should return true if device has camera [Test hasCamera property]", function () {
	        expect(typeof EB.System.hasCamera).toEqual('boolean');
	    });
	
	    it("Test screenWidth property", function () {
	        expect(EB.System.screenWidth).isNumberGreaterThenZero();
	    });
	
	    it("Test screenHeight property", function () {
	        expect(EB.System.screenHeight).isNumberGreaterThenZero();
	    });
	
	    it("Test realScreenWidth property", function () {
	        expect(EB.System.realScreenWidth).isNumberGreaterThenZero();
	    });
	
	    it("Test realScreenHeight property", function () {
	        expect(EB.System.realScreenHeight).isNumberGreaterThenZero();
	    });
	
	    it("Test screen orientation property", function () {
	        expect(EB.System.screenOrientation).isNotEmptyString();
            expect(["portrait", "landscape"].indexOf(EB.System.screenOrientation)).toBeGreaterThan(-1)
	    });
	
	    it("Test ppiX property", function () {
	        expect(EB.System.ppiX).isNumberGreaterThenZero();
	    });
	
	    it("Test ppiY property", function () {
	        expect(EB.System.ppiY).isNumberGreaterThenZero();
	    });
	
	    it("Test deviceName property", function () {
	        expect(EB.System.deviceName).isNotEmptyString();
	    });
	
	    it("Test OsVersion property", function () {
	        expect(EB.System.osVersion).isNotEmptyString();
	    });
	
	    it("Test locale property", function () {
	        expect(EB.System.locale).isNotEmptyString();
	    });
	
	    it("Test country property", function () {
	        expect(EB.System.country).isNotEmptyString();
	    });
	
	    it("Test isEmulator property", function () {
	        expect(EB.System.isEmulator).isBoolean;
	    });

        it("Test isRhoSimulator property", function () {
            expect(EB.System.isRhoSimulator).isBoolean;
        });

        it("Test hasCalendar property", function () {
	        expect(EB.System.hasCalendar).isBoolean();
	    });
	
	    it("Test isMotorolaDevice property", function () {
	        expect(EB.System.isMotorolaDevice).isBoolean();
	    });
	
	    it("Test default value of localServerPort property", function () {
	        expect(EB.System.localServerPort).isNumberGreaterThenZero();
	    });
	
	    it("Test freeServerPort property", function () {
	        expect(EB.System.freeServerPort).isNumberGreaterThenZero();
	    });
	
	    it("Test hasTouchscreen property", function () {
	        expect(EB.System.hasTouchscreen).toEqual(true);
	    });
	
	    xit("Test securityTokenNotPased property", function () {
	        expect(EB.System.securityTokenNotPassed).isBoolean();
	    });
	
	    it("Test webviewFramework property", function () {
	        expect(EB.System.webviewFramework).isNotEmptyString();
	    });
	
	    it("Test startParams method", function () {
	        expect(typeof EB.System.getStartParams()).toEqual('string');
	    });
	
	    it("Test bringToFront method", function () {
	        EB.System.bringToFront();
	    });
	
	    it("Test callback", function () {
	
	        var flag, value;
	
	        var callbackFunction = function () {
	            value = 10;
	            flag = true
	        };
	
	        runs(function () {
	            value = 0;
	            flag = false;
	            EB.System.getStartParams(callbackFunction);
	        });
	
	        waitsFor(
	            function () {
	                return flag;
	            },
	            "Timeout",
	            500
	        );
	
	        runs(function () {
	            expect(value).toEqual(10)
	        })
	    });




        /* ----------          platform dependent specs          ---------- */
	
	
	    if (isAnyButApplePlatform()) {
	        it("Test phoneId property", function () {
	            expect(EB.System.phoneId).isNotEmptyString();
	        });
	
	        it("Test httpProxyURI property", function () {
	            EB.System.setHttpProxyURI = 'http://localhost';
	            expect(EB.System.httpProxyURI).toEqual('http://localhost');
	        });
	
	        it("Test keyboardState property", function () {
	            expect(EB.System.keyboardState).toEqual('automatic');
	        });
	
	    }
	
	    if (isAndroidPlatform()) {
	        it("Test deviceOwnerEmail property", function () {
	            expect(EB.System.deviceOwnerEmail).isNotEmptyString();
	        });
	
	        it("Test deviceOwnerName property", function () {
	            expect(EB.System.deviceOwnerName).isNotEmptyString();
	        });
	    }
	
	    if (isApplePlatform()) {
	        it("Test applicationIconBadge property", function () {
	            EB.System.applicationIconBadge = 1;
	            expect(EB.System.applicationIconBadge).toEqual(1);
	        });
	    }
	
	    if (isAnyButWindowsFamilyPlatform()) {
	        it("Test devicePushId property", function () {
	            expect(EB.System.devicePushId).isNotEmptyString();
	        });
	
	        it("Test screenAutoRotate property", function () {
	            EB.System.screenAutoRotate = false;
	            expect(EB.System.screenAutoRotate).toEqual(false);

                                  /* we must return this property to initial state after this test because the ScreenOrientation test will check after initial state   */
	            EB.System.screenAutoRotate = true;
	            expect(EB.System.screenAutoRotate).toEqual(true);
	
	        });

            it("Test screenSleeping property", function () {
                EB.System.screenSleeping = true;
                expect(EB.System.screenSleeping).toEqual(true);

                EB.System.screenSleeping = false;
                expect(EB.System.screenSleeping).toEqual(false);
            });
	    }
	
	    if (isWindowsMobileOrAndroidPlatform()) {
	        it("Test oemInfo property", function () {
	            expect(EB.System.oemInfo).isNotEmptyString();
	        });
	
	        it("Test uuid property", function () {
	            expect(EB.System.uuid).isNotEmptyString();
	        });
	    }
	
	    if (isWindowsMobileOrWindowsDesktopPlatform()) {
	        it("Test deleteRegistrySetting property", function () {
	            EB.System.deleteRegistrySetting({hive: 'HKCU', key: 'phone_spec', setting: 'phone_spec_registry_key'})
	
	            EB.System.setRegistrySetting({hive: 'HKCU', type: 'String', key: 'phone_spec', setting: 'phone_spec_registry_key', value: 'test'});
	            expect(EB.System.getRegistrySetting({hive: 'HKCU', key: 'phone_spec', setting: 'phone_spec_registry_key'})).toEqual('test')
	        });
	    }
	
	    if (isWindowsDesktopPlatform()) {
	        it("Test default value of lockWindowSize property", function () {
	            expect(EB.System.lockWindowSize).toEqual(false);
	        });
	
	        it("Test lockWindowsSize property", function () {
	            EB.System.lockWindowSize = false;
	            expect(EB.System.lockWindowSize).toEqual(false);
	        });
	
	        it("Test windowFrame method", function () {
	            EB.System.setWindowFrame(1, 1, 200, 200);
	        });
	
	        it("Test windowPosition method", function () {
	            EB.System.setWindowPosition(1, 1);
	        });
	
	        it("Test windowSize method", function () {
	            EB.System.setWindowSize(100, 100);
	        });
	    }

        it("Test get property ", function () {
            expect(EB.System.getProperty("platform")).toEqual(EB.System.platform);
        });

        it("Test set property", function () {
            expect(EB.System.setProperty("applicationIconBadge", "5"));
            expect(EB.System.getProperty("applicationIconBadge")).toEqual("5");
        });

        it("Test get properties ", function () {
            var actual = EB.System.getProperties(["platform", "osVersion"]);
            expect(actual["platform"]).isNotEmptyString();
            expect(actual["osVersion"]).isNotEmptyString();
        });

        it("Test get all properties ", function () {
            var actual = EB.System.getAllProperties();
            expect(actual["platform"]).isNotEmptyString();
            expect(actual["osVersion"]).isNotEmptyString();
        });

        it("Test get properties ", function () {
            EB.System.setProperties({applicationIconBadge: "5"});
            expect(EB.System.applicationIconBadge).toEqual(5);
        });
	});

    describe("FileSystem tests", function () {

        var tempDirectory = EB.RhoFile.join(EB.Application.userFolder, 'tempDirectory');
        var target = EB.RhoFile.join(tempDirectory, 'target.zip');
        var sourceA = EB.RhoFile.join(EB.Application.publicFolder, 'do not remove me.txt');
        var sourceB = EB.RhoFile.join(EB.Application.publicFolder, 'do not remove me too.txt');

        beforeEach(function () {
            EB.RhoFile.makeDir(tempDirectory);
        });

        afterEach(function () {
            EB.RhoFile.deleteRecursive(tempDirectory);
        });

        it("Test zipFile method without password", function () {
            expect(EB.RhoFile.exists(target)).toEqual(false);

            var result = EB.System.zipFile(target, sourceA);
            expect(result).toEqual(0);
            expect(EB.RhoFile.exists(target)).toEqual(true);
        });

        it("Test zipFle method with password", function () {
            expect(EB.RhoFile.exists(target)).toEqual(false);

            var result = EB.System.zipFile(target, sourceA, 'password');
            expect(result).toEqual(0);
            expect(EB.RhoFile.exists(target)).toEqual(true);
        });

        it("Test unzipFile method without password", function () {
            EB.System.zipFile(target, sourceA);

            var result = EB.System.unzipFile(target);
            expect(result).toEqual(0);
            expect(EB.RhoFile.exists(EB.RhoFile.join(tempDirectory, 'do not remove me.txt'))).toEqual(true);
        });

        it("Test unzipFile method with password", function () {
            EB.System.zipFile(target, sourceA, 'password');

            var result = EB.System.unzipFile(target, 'password');
            //TODO: Why result succefull unzipFile is not equal 0?
            //expect(result).toEqual(0);
            expect(EB.RhoFile.exists(EB.RhoFile.join(tempDirectory, 'do not remove me.txt'))).toEqual(true);
        });

        it("Test zipFiles method without password", function () {
            expect(EB.RhoFile.exists(target)).toEqual(false);

            var sources = [];
            sources[0] = sourceA;
            sources[1] = sourceB;

            var result = EB.System.zipFiles(target, tempDirectory, sources);
            expect(result).toEqual(0);
            expect(EB.RhoFile.exists(target)).toEqual(true);
        });

        it("Test zipFiles method with password", function () {
            expect(EB.RhoFile.exists(target)).toEqual(false);

            var sources = [];
            sources[0] = sourceA;
            sources[1] = sourceB;

            var result = EB.System.zipFiles(target, tempDirectory, sources, 'password');
            expect(result).toEqual(0);
            expect(EB.RhoFile.exists(target)).toEqual(true);
        });
    });


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
		
		var deviceOS = EB.System.platform;
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
