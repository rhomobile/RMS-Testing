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
            expect(Rho.System.getProperty("platform")).isNotEmptyString();
            expect(Rho.System.platform).isNotEmptyString();
        });

        it("Should return true if device has camera [Test hasCamera property]", function () {
	        expect(typeof Rho.System.hasCamera).toEqual('boolean');
	    });
	
	    it("Test screenWidth property", function () {
	        expect(Rho.System.screenWidth).isNumberGreaterThenZero();
	    });
	
	    it("Test screenHeight property", function () {
	        expect(Rho.System.screenHeight).isNumberGreaterThenZero();
	    });
	
	    it("Test realScreenWidth property", function () {
	        expect(Rho.System.realScreenWidth).isNumberGreaterThenZero();
	    });
	
	    it("Test realScreenHeight property", function () {
	        expect(Rho.System.realScreenHeight).isNumberGreaterThenZero();
	    });
	
	    it("Test screen orientation property", function () {
	        expect(Rho.System.screenOrientation).isNotEmptyString();
            expect(["portrait", "landscape"].indexOf(Rho.System.screenOrientation)).toBeGreaterThan(-1)
	    });
	
	    it("Test ppiX property", function () {
	        expect(Rho.System.ppiX).isNumberGreaterThenZero();
	    });
	
	    it("Test ppiY property", function () {
	        expect(Rho.System.ppiY).isNumberGreaterThenZero();
	    });
	
	    it("Test deviceName property", function () {
	        expect(Rho.System.deviceName).isNotEmptyString();
	    });
	
	    it("Test OsVersion property", function () {
	        expect(Rho.System.osVersion).isNotEmptyString();
	    });
	
	    it("Test locale property", function () {
	        expect(Rho.System.locale).isNotEmptyString();
	    });
	
	    it("Test country property", function () {
	        expect(Rho.System.country).isNotEmptyString();
	    });
	
	    it("Test isEmulator property", function () {
	        expect(Rho.System.isEmulator).isBoolean;
	    });

        it("Test isRhoSimulator property", function () {
            expect(Rho.System.isRhoSimulator).isBoolean;
        });

        it("Test hasCalendar property", function () {
	        expect(Rho.System.hasCalendar).isBoolean();
	    });
	
	    it("Test isMotorolaDevice property", function () {
	        expect(Rho.System.isMotorolaDevice).isBoolean();
	    });
	
	    it("Test default value of localServerPort property", function () {
	        expect(Rho.System.localServerPort).isNumberGreaterThenZero();
	    });
	
	    it("Test freeServerPort property", function () {
	        expect(Rho.System.freeServerPort).isNumberGreaterThenZero();
	    });
	
	    it("Test hasTouchscreen property", function () {
	        expect(Rho.System.hasTouchscreen).toEqual(true);
	    });
	
	    xit("Test securityTokenNotPased property", function () {
	        expect(Rho.System.securityTokenNotPassed).isBoolean();
	    });
	
	    it("Test webviewFramework property", function () {
	        expect(Rho.System.webviewFramework).isNotEmptyString();
	    });
	
	    it("Test startParams method", function () {
	        expect(typeof Rho.System.getStartParams()).toEqual('string');
	    });
	
	    it("Test bringToFront method", function () {
	        Rho.System.bringToFront();
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
	            Rho.System.getStartParams(callbackFunction);
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
	            expect(Rho.System.phoneId).isNotEmptyString();
	        });
	
	        it("Test httpProxyURI property", function () {
	            Rho.System.setHttpProxyURI = 'http://localhost';
	            expect(Rho.System.httpProxyURI).toEqual('http://localhost');
	        });
	
	        it("Test keyboardState property", function () {
	            expect(Rho.System.keyboardState).toEqual('automatic');
	        });
	
	    }
	
	    if (isAndroidPlatform()) {
	        it("Test deviceOwnerEmail property", function () {
	            expect(Rho.System.deviceOwnerEmail).isNotEmptyString();
	        });
	
	        it("Test deviceOwnerName property", function () {
	            expect(Rho.System.deviceOwnerName).isNotEmptyString();
	        });
	    }
	
                          /* not applicable to iOS 8.0 !
                          From iOS 8.0 application must request permission from User for access to applicationIconBadge
                          It can not be automatically passed !
	    if (isApplePlatform()) {
	        it("Test applicationIconBadge property", function () {
	            Rho.System.applicationIconBadge = 1;
	            expect(Rho.System.applicationIconBadge).toEqual(1);
	        });
	    }
                          */
	
	    if (isAnyButWindowsFamilyPlatform()) {
	        it("Test devicePushId property", function () {
	            expect(Rho.System.devicePushId).isNotEmptyString();
	        });
	
	        it("Test screenAutoRotate property", function () {
	            Rho.System.screenAutoRotate = false;
	            expect(Rho.System.screenAutoRotate).toEqual(false);

                                  /* we must return this property to initial state after this test because the ScreenOrientation test will check after initial state   */
	            Rho.System.screenAutoRotate = true;
	            expect(Rho.System.screenAutoRotate).toEqual(true);
	
	        });

            it("Test screenSleeping property", function () {
                Rho.System.screenSleeping = true;
                expect(Rho.System.screenSleeping).toEqual(true);

                Rho.System.screenSleeping = false;
                expect(Rho.System.screenSleeping).toEqual(false);
            });
	    }
	
	    if (isWindowsMobileOrAndroidPlatform()) {
	        it("Test oemInfo property", function () {
	            expect(Rho.System.oemInfo).isNotEmptyString();
	        });
	
	        it("Test uuid property", function () {
	            expect(Rho.System.uuid).isNotEmptyString();
	        });
	    }
	
	    if (isWindowsMobileOrWindowsDesktopPlatform()) {
	        it("Test deleteRegistrySetting property", function () {
	            Rho.System.deleteRegistrySetting({hive: 'HKCU', key: 'phone_spec', setting: 'phone_spec_registry_key'})
	
	            Rho.System.setRegistrySetting({hive: 'HKCU', type: 'String', key: 'phone_spec', setting: 'phone_spec_registry_key', value: 'test'});
	            expect(Rho.System.getRegistrySetting({hive: 'HKCU', key: 'phone_spec', setting: 'phone_spec_registry_key'})).toEqual('test')
	        });
	    }
	
	    if (isWindowsDesktopPlatform()) {
	        it("Test default value of lockWindowSize property", function () {
	            expect(Rho.System.lockWindowSize).toEqual(false);
	        });
	
	        it("Test lockWindowsSize property", function () {
	            Rho.System.lockWindowSize = false;
	            expect(Rho.System.lockWindowSize).toEqual(false);
	        });
	
	        it("Test windowFrame method", function () {
	            Rho.System.setWindowFrame(1, 1, 200, 200);
	        });
	
	        it("Test windowPosition method", function () {
	            Rho.System.setWindowPosition(1, 1);
	        });
	
	        it("Test windowSize method", function () {
	            Rho.System.setWindowSize(100, 100);
	        });
	    }

        it("Test get property ", function () {
            expect(Rho.System.getProperty("platform")).toEqual(Rho.System.platform);
        });

        /* not applicable to iOS 8.0 !
        it("Test set property", function () {
            expect(Rho.System.setProperty("applicationIconBadge", "5"));
            expect(Rho.System.getProperty("applicationIconBadge")).toEqual("5");
        });
        */

        it("Test get properties ", function () {
            var actual = Rho.System.getProperties(["platform", "osVersion"]);
            expect(actual["platform"]).isNotEmptyString();
            expect(actual["osVersion"]).isNotEmptyString();
        });

        it("Test get all properties ", function () {
            var actual = Rho.System.getAllProperties();
            expect(actual["platform"]).isNotEmptyString();
            expect(actual["osVersion"]).isNotEmptyString();
        });

        /* not applicable to iOS 8.0
        it("Test get properties ", function () {
            Rho.System.setProperties({applicationIconBadge: "5"});
            expect(Rho.System.applicationIconBadge).toEqual(5);
        });
        */
	});

    describe("FileSystem tests", function () {

        var tempDirectory = Rho.RhoFile.join(Rho.Application.userFolder, 'tempDirectory');
        var target = Rho.RhoFile.join(tempDirectory, 'target.zip');
        var sourceA = Rho.RhoFile.join(Rho.Application.publicFolder, 'do not remove me.txt');
        var sourceB = Rho.RhoFile.join(Rho.Application.publicFolder, 'do not remove me too.txt');

        beforeEach(function () {
            Rho.RhoFile.makeDir(tempDirectory);
        });

        afterEach(function () {
            Rho.RhoFile.deleteRecursive(tempDirectory);
        });

        it("Test zipFile method without password", function () {
            expect(Rho.RhoFile.exists(target)).toEqual(false);

            var result = Rho.System.zipFile(target, sourceA);
            expect(result).toEqual(0);
            expect(Rho.RhoFile.exists(target)).toEqual(true);
        });

        it("Test zipFle method with password", function () {
            expect(Rho.RhoFile.exists(target)).toEqual(false);

            var result = Rho.System.zipFile(target, sourceA, 'password');
            expect(result).toEqual(0);
            expect(Rho.RhoFile.exists(target)).toEqual(true);
        });

        it("Test unzipFile method without password", function () {
            Rho.System.zipFile(target, sourceA);

            var result = Rho.System.unzipFile(target);
            expect(result).toEqual(0);
            expect(Rho.RhoFile.exists(Rho.RhoFile.join(tempDirectory, 'do not remove me.txt'))).toEqual(true);
        });

        it("Test unzipFile method with password", function () {
            Rho.System.zipFile(target, sourceA, 'password');

            var result = Rho.System.unzipFile(target, 'password');
            //TODO: Why result succefull unzipFile is not equal 0?
            //expect(result).toEqual(0);
            expect(Rho.RhoFile.exists(Rho.RhoFile.join(tempDirectory, 'do not remove me.txt'))).toEqual(true);
        });

        it("Test zipFiles method without password", function () {
            expect(Rho.RhoFile.exists(target)).toEqual(false);

            var sources = [];
            sources[0] = sourceA;
            sources[1] = sourceB;

            var result = Rho.System.zipFiles(target, tempDirectory, sources);
            expect(result).toEqual(0);
            expect(Rho.RhoFile.exists(target)).toEqual(true);
        });

        it("Test zipFiles method with password", function () {
            expect(Rho.RhoFile.exists(target)).toEqual(false);

            var sources = [];
            sources[0] = sourceA;
            sources[1] = sourceB;

            var result = Rho.System.zipFiles(target, tempDirectory, sources, 'password');
            expect(result).toEqual(0);
            expect(Rho.RhoFile.exists(target)).toEqual(true);
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
