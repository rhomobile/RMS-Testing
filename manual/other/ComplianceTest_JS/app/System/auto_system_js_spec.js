describe("System JS API", function () {

/*
	describe("server port", function() {
		it("should return free server port", function(){
			expect(Rho.System.freeServerPort).toBeBetween(1024, 65536);
			}
		);
	});


    describe("properties directly", function () {

        if (isApplePlatform()) {
            it("VT300-003 | should set applicationIconBadge to 1", function () {
                Rho.System.applicationIconBadge = 1;
                expect(Rho.System.applicationIconBadge).toEqual(1);
            });

            it("VT300-004 | should set applicationIconBadge to 0", function () {
                Rho.System.applicationIconBadge = 0;
                expect(Rho.System.applicationIconBadge).toEqual(0);
            });
        }

        if (isAnyWindowsFamilyPlatform()) {
            it("VT300-022 | call getProperty with httpProxyURI (RhoSimpulator support it only on Windows)| 'http://wwwgate0.mot.com:1080'", function () {

                Rho.System.httpProxyURI = 'http://wwwgate0.mot.com:1080';
                var data = Rho.System.getProperty('httpProxyURI');
                expect(data).toEqual('http://wwwgate0.mot.com:1080');

            });
        }

        if (isWindowsDesktopPlatform()) {

            it("VT300-033 | set lockWindowSize as True, call getProperty with lockWindowSize (RhoSimpulator support it only on Windows)| true", function () {

                Rho.System.lockWindowSize = true;
                var data = Rho.System.getProperty('lockWindowSize');
                expect(data).toEqual('true');

            });

            it("VT300-034 | set lockWindowSize as false, call getProperty with lockWindowSize (RhoSimpulator support it only on Windows)| false", function () {

                Rho.System.lockWindowSize = false;
                var data = Rho.System.getProperty('lockWindowSize');
                expect(data).toEqual('false');

            });

        }

        it("VT300-037 | should return platform | ", function() {
            var possiblePlatforms = ["ANDROID", "APPLE", "WINDOWS", "WINDOWS_DESKTOP", "WP8"];
            expect(possiblePlatforms).toContain(Rho.System.platform);
        });

        if (isAndroidOrApplePlatform()) {

            it("VT300-046 | set screenAutoRotate as false, call getProperty with screenAutoRotate | false", function () {

                Rho.System.screenAutoRotate = false;
                var data = Rho.System.getProperty('screenAutoRotate');
                expect(data).toEqual('false');
            });

            it("VT300-047 | set screenAutoRotate as true, call getProperty with screenAutoRotate | true", function () {

                Rho.System.screenAutoRotate = true;
                var data = Rho.System.getProperty('screenAutoRotate');
                expect(data).toEqual('true');

            });

            it("VT300-054 | set screenSleeping as true, call getProperty with screenSleeping | true", function () {

                Rho.System.screenSleeping = true;
                var data = Rho.System.getProperty('screenSleeping');
                expect(data).toEqual('true');

            });

            it("VT300-055 | set screenSleeping as false, call getProperty with screenSleeping | false", function () {

                Rho.System.screenSleeping = false;
                var data = Rho.System.getProperty('screenSleeping');
                expect(data).toEqual('false');

            });
        }


        (function () {
            var allProperties = Rho.System.getAllProperties();
            delete allProperties.freeServerPort;
            delete allProperties.free_Server_Port;

            for (var propertyName in allProperties) {
                if (allProperties.hasOwnProperty(propertyName)) {
                    var testName = "VT300-070 | Value of " + propertyName + " must be equal at getAllProperties and getProperty";
                    it(testName, function () {
                        expect(Rho.System.getProperty(propertyName)).toEqual(allProperties[propertyName]);
                    })
                }
            }

        })();


        if (isWindowsMobilePlatform()) {

            it("VT278-187 | call getRegistrySetting with hive as HKLM type as MULTISZ subkey as Software setting as Rhoelements value as hello world , call setRegistrySetting with hive, subkey and setting | hello world", function () {

                Rho.System.setRegistrySetting({hive: 'HKLM', type: 'MULTISZ', key: 'Software', setting: 'RhoElementsTest', value: 'hello world', persistent: true});
                var data = Rho.System.getRegistrySetting({hive: 'HKLM', key: 'Software', setting: 'RhoElementsTest'});
                expect(data).toEqual('hello world');

            });

            it("VT278-189 | call setRegistrySetting with hive, subkey and setting and check the ret value | 10101010", function () {

                Rho.System.setRegistrySetting({hive: 'HKLM', type: 'Binary', key: 'Software', setting: 'Rho', value: '10101010', persistent: false});
                var data = Rho.System.getRegistrySetting({hive: 'HKLM', type: 'Binary', key: 'Software', setting: 'Rho'});
                expect(data).toEqual("10101010");

            });


            it("VT278-191 | call deleteRegistrySetting  with Persistence  check the return value | Test123", function () {

                Rho.System.setRegistrySetting({hive: 'HKCU', type: 'String', key: 'Software', setting: 'RhoElementsTest', value: 'Test123', persistent: true});
                var actual = Rho.System.deleteRegistrySetting({hive: 'HKCU', key: 'Software', setting: 'RhoElementsTest'});
                expect(actual).toEqual(true);
            });

            it("VT278-192 | call deleteRegistrySetting with settings not exist  | false", function () {

                var data = Rho.System.deleteRegistrySetting({hive: 'HKLM', key: 'Softy', setting: 'RhoElementsTest', persistent: true});
                expect(data).toEqual(false);

            });

            it("VT278-193 | set and getRegistry setting with HKU and persistence as True and type MultiSZ | hello world", function () {

                Rho.System.setRegistrySetting({hive: 'HKU', type: 'MultiSZ', key: 'Software', setting: 'RhoElementsTest', value: "StringA\\nStringB\\nStringC", persistent: true});
                var data = Rho.System.getRegistrySetting({hive: 'HKU', key: 'Software', setting: 'RhoElementsTest'});
                expect(data).toEqual("StringA\nStringB\nStringC");

            });

            it("VT278-194 | set and getRegistry setting with HKCU and persistence as False and Type as String | Test123", function () {

                Rho.System.setRegistrySetting({hive: 'HKCU', type: 'String', key: 'Software', setting: 'Motorola', value: 'Test123', persistent: false});
                var data = Rho.System.getRegistrySetting({hive: 'HKCU', key: 'Software', setting: 'Motorola'});
                expect(data).toEqual('Test123');

            });

            it("VT278-195 | set and getRegistry setting with HKCR and persistence as False and Type as DWORD | 12345", function () {

                Rho.System.setRegistrySetting({hive: 'HKCR', type: 'DWORD', key: 'Software', setting: 'Symbol', value: '12345', persistent: false});
                var data = Rho.System.getRegistrySetting({hive: 'HKCR', key: 'Software', setting: 'Symbol'});
                expect(data).toEqual('12345');

            });

            it("VT278-196 | set and getRegistry setting with HKLM and persistence True and Type as Binary | 111111", function () {

                Rho.System.setRegistrySetting({hive: 'HKLM', type: 'Binary', key: 'Software', setting: 'RhoTnV', value: '111111', persistent: true});
                var data = Rho.System.getRegistrySetting({hive: 'HKLM', key: 'Software', setting: 'RhoTnV'});
                expect(data).toEqual('111111');

            });

            it("VT278-197 | set and getRegistry setting with HKLM and persistence False and Type as Binary and key as multilevel path | 111111", function () {

                Rho.System.setRegistrySetting({hive: 'HKLM', type: 'Binary', key: 'Software\Symbol\Audio', setting: 'Rhoelement', value: '111111', persistent: false});
                var data = Rho.System.getRegistrySetting({hive: 'HKLM', key: 'Software\Symbol\Audio', setting: 'Rhoelement'});
                expect(data).toEqual('111111');

            });

            it("VT278-198 | call getRegistry setting with invalid properties | ", function () {

                var data = Rho.System.getRegistrySetting({hive: 'HKLM', key: 'Boo', setting: 'Rhoelement'});
                expect(data).toEqual('');

            });

        }

    });

    describe("setProperty / getProperty", function () {

        for (var i = 0; i < sys_setget_property.length; i++) {
            (function (idx) {

                var record = sys_setget_property[i];
                var testName = record['testName'];
                var suitablePlatforms = record['osType'];
                var propertyName = record['propertyName'];
                var stringValue = record['propertyValue'];
                var expectedValue = record['expectedResult'];

                if (isTestApplicable(suitablePlatforms)) {
                    it(testName, function () {
                        Rho.System.setProperty(propertyName, stringValue)

                        var actual = Rho.System.getProperty(propertyName);
                        expect(actual).toEqual(expectedValue);
                    });
                }
            })(i);
        }
    });

    describe("setProperties / getProperties", function () {

        for (var i = 0; i < sys_setget_properties.length; i++) {
            (function (idx) {

                var record = sys_setget_properties[i];
                var testName = record['testName'];
                var suitablePlatforms = record['osType'];
                var propertyName = record['propertyName'];
                var stringValue = record['propertyValue'];
                var expectedValue = record['expectedResult'];

                if (isTestApplicable(suitablePlatforms)) {
                    it(sys_setget_properties[idx]['testName'], function () {

                        var propertyValue = stringValue;
                        if (["true", "false"].indexOf(stringValue) != -1) {
                            propertyValue = (stringValue == "true" ? true : false);
                        }
                        if (/^\d+$/.test(stringValue)) {
                            propertyValue = parseInt(stringValue);
                        }
                        var obj = {};
                        obj[propertyName] = propertyValue;
                        Rho.System.setProperties(obj);

                        var readedObj =  Rho.System.getProperties([propertyName]);
                        expect(readedObj[propertyName]).toEqual(expectedValue);
                    });
                }
            })(i);
        }
    });
*/
    describe("FileSystem", function () {

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

        it("VT200-0xxx | Test zipFile method without password", function () {
            expect(Rho.RhoFile.exists(target)).toEqual(false);

            var result = Rho.System.zipFile(target, sourceA);
            expect(result).toEqual(0);
            expect(Rho.RhoFile.exists(target)).toEqual(true);
        });

        it("VT200-0685 | Test zipFle method with password", function () {
            expect(Rho.RhoFile.exists(target)).toEqual(false);

            var result = Rho.System.zipFile(target, sourceA, 'password');
            expect(result).toEqual(0);
            expect(Rho.RhoFile.exists(target)).toEqual(true);
        });

        it("VT200-0xxx | Test unzipFile method without password", function () {
            Rho.System.zipFile(target, sourceA);

            var result = Rho.System.unzipFile(target);
            expect(result).toEqual(0);
            expect(Rho.RhoFile.exists(Rho.RhoFile.join(tempDirectory, 'do not remove me.txt'))).toEqual(true);
        });

        it("VT200-0xxx | Test unzipFile method without password which requires password", function () {
            Rho.System.zipFile(target, sourceA, 'password');

           var result = Rho.System.unzipFile(target);
           expect(Rho.RhoFile.exists(Rho.RhoFile.join(tempDirectory, 'do not remove me.txt'))).toEqual(true);
           expect( Rho.RhoFile.getFileSize(Rho.RhoFile.join(tempDirectory, 'do not remove me.txt')) ).toEqual(0);
        });

        it("VT200-0684 | Test unzipFile method with password", function () {
            Rho.System.zipFile(target, sourceA, 'password');

            var result = Rho.System.unzipFile(target, 'password');
            //TODO: Why result succefull unzipFile is not equal 0?
            //expect(result).toEqual(0);
            expect(Rho.RhoFile.exists(Rho.RhoFile.join(tempDirectory, 'do not remove me.txt'))).toEqual(true);
        });

        it("VT200-0xxx | Test unzipFile method after calling zipfiles method ", function () {
            expect(Rho.RhoFile.exists(target)).toEqual(false);

            var sources = [];
            sources[0] = sourceA;
            sources[1] = sourceB;

            var result = Rho.System.zipFiles(target, Rho.RhoFile.dirname(sources[0]), sources);

            result = Rho.System.unzipFile(target);
            expect(Rho.RhoFile.exists(Rho.RhoFile.join(tempDirectory, 'do not remove me.txt'))).toEqual(true);
            expect( Rho.RhoFile.getFileSize(Rho.RhoFile.join(tempDirectory, 'do not remove me.txt')) ).toBeGreaterThan(0);
            expect(Rho.RhoFile.exists(Rho.RhoFile.join(tempDirectory, 'do not remove me too.txt'))).toEqual(true);
            expect( Rho.RhoFile.getFileSize(Rho.RhoFile.join(tempDirectory, 'do not remove me too.txt')) ).toBeGreaterThan(0); 
           
        });

        it("VT200-0xxx | Test zipFiles method without password", function () {
            expect(Rho.RhoFile.exists(target)).toEqual(false);

            var sources = [];
            sources[0] = sourceA;
            sources[1] = sourceB;

            var result = Rho.System.zipFiles(target, tempDirectory, sources);
            expect(result).toEqual(0);
            expect(Rho.RhoFile.exists(target)).toEqual(true);
        });

        it("VT200-0xxx | Test zipFiles method with password", function () {
            expect(Rho.RhoFile.exists(target)).toEqual(false);

            var sources = [];
            sources[0] = sourceA;
            sources[1] = sourceB;

            var result = Rho.System.zipFiles(target, tempDirectory, sources, 'password');
            expect(result).toEqual(0);
            expect(Rho.RhoFile.exists(target)).toEqual(true);
        });
    });
});