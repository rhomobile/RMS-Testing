describe("<system module specs>", function () {

    it("does nothing", function() {
        expect(null).toBe(null);
    });

    if (isApplePlatform()) {
        var alptabet = [
            'alpha', 'beta', 'gamma', 'delta',
            'epsilon', 'zeta', 'eta', 'theta',
            'iota', 'kappa', 'lambda', 'mu',
            'nu', 'xi', 'omicron', 'pi',
            'rho', 'sigma', 'tau', 'upsilon',
            'phi', 'chi', 'psi', 'omega'
        ];
        var nicks = [
            'Horlitted','Opinkh1992','Maidest1930','Hicamen',
            'Waidelve','Tremen','Ressay','Beturped',
            'Haveretwound91','Theaver','Thamou1930','Schistermin1928',
            'Mong1936','Kinters','Firmervis','Affeard',
            'Tookins','Thrunt','Thaps1958','Offs1967',
            'Yount1939','Careason','Undidesix34','Uness1981'
        ];

        it("testString callback", function () {
            var teststring = 'TestData';

            var reversestring = teststring.toString().split('').reverse().join('');

            var flag, value;

            var callbackFunction = function (val) {
                value = val;
                flag = true
            };

            runs(function () {
                Rho.PlatformBridgeTest.testString(reversestring,callbackFunction);
            });

            waitsFor(
                function () {
                    return flag;
                },
                "Timeout",
                500
            );

            runs(function () {
                expect(value).toEqual(teststring)
            })
        });

        it("testBool callback", function () {
            var testValue = true;

            var flag, value;

            var callbackFunction = function (val) {
                value = val;
                flag = true
            };

            runs(function () {
                Rho.PlatformBridgeTest.testBool(testValue,callbackFunction);
            });

            waitsFor(
                function () {
                    return flag;
                },
                "Timeout",
                500
            );

            runs(function () {
                expect(value).toEqual(!testValue)
            })
        });

        it("testInt callback", function () {
            var testValue = 42;
            var flag, value;

            var callbackFunction = function (val) {
                value = val;
                flag = true
            };

            runs(function () {
                Rho.PlatformBridgeTest.testInt(testValue,callbackFunction);
            });

            waitsFor(
                function () {
                    return flag;
                },
                "Timeout",
                500
            );

            runs(function () {
                expect(value).toEqual(testValue + 1)
            })
        });

        it("testFloat callback", function () {
            var testValue = -42.0;
            var flag, value;

            var callbackFunction = function (val) {
                value = val;
                flag = true
            };

            runs(function () {
                Rho.PlatformBridgeTest.testFloat(testValue,callbackFunction);
            });

            waitsFor(
                function () {
                    return flag;
                },
                "Timeout",
                500
            );

            runs(function () {
                expect(value).toEqual(testValue-0.5)
            })
        });

        it("testArray callback", function () {
            var testarray = alptabet.slice(0);

            var sorted = testarray.sort(function(a, b) {
                return a.toLowerCase() < b.toLowerCase()?1:-1;
            });

            var reversed = sorted.reverse();

            var flag, value;

            var callbackFunction = function (val) {
                value = val;
                flag = true
            };

            runs(function () {
                Rho.PlatformBridgeTest.testArray(reversed,callbackFunction);
            });

            waitsFor(
                function () {
                    return flag;
                },
                "Timeout",
                500
            );

            runs(function () {
                expect(value).toEqual(sorted)
            })
        });

        it("testHash callback", function () {
            var testhash = {};
            var ref = {};

            for (var i = 0; i < alptabet.length; i++) {
                var k = alptabet[i];
                var v = nicks[i];

                testhash[k]=v;

                if ("aeiouy".indexOf(k[0])<0) {
                    ref[k] = v.split('').reverse().join('');
                }
            };

            var flag, value;

            var callbackFunction = function (val) {
                value = val;
                flag = true
            };

            runs(function () {
                Rho.PlatformBridgeTest.testHash(testhash,callbackFunction);
            });

            waitsFor(
                function () {
                    return flag;
                },
                "Timeout",
                500
            );

            runs(function () {
                expect(value).toEqual(ref)
            })
        });

        it("testNill callback", function () {
            var testhash = {};
            var ref = {};

            var flag, value;

            var callbackFunction = function (val) {
                value = val;
                flag = true
            };

            runs(function () {
                Rho.PlatformBridgeTest.testNull(callbackFunction);
            });

            waitsFor(
                function () {
                    return flag;
                },
                "Timeout",
                500
            );

            runs(function () {
                expect(value).toEqual(null);
            })
        });

        it("test saveCallback/fireCallback", function () {
            var testhash = {};
            var ref = {};
            var testString = "TEST_STRING";

            var flag, value;

            var callbackFunction = function (val) {
                value = val;
                flag = true
            };

            runs(function () {
                flag = false; value = null;
                Rho.PlatformBridgeTest.saveCallback(callbackFunction);
                Rho.PlatformBridgeTest.fireCallback(testString);
            });

            waitsFor(
                function () {
                    return flag;
                },
                "Timeout",
                500
            );

            runs(function () {
                expect(value).toEqual(testString);
            })

            runs(function () {
                flag = false; value = null;
                Rho.PlatformBridgeTest.fireCallback(testString+"a");
            });

            waitsFor(
                function () {
                    return flag;
                },
                "Timeout",
                500
            );

            runs(function () {
                expect(value).toEqual(testString+"a");
            })
        });

        it("should not crash when saveCallback to nil/fireCallback", function () {
            var testhash = {};
            var ref = {};
            var testString = "TEST_STRING";

            runs(function () {
                flag = false; value = null;
                Rho.PlatformBridgeTest.saveCallback(null);
                Rho.PlatformBridgeTest.fireCallback(testString+"a");
            });

            waits(200);

            runs(function () {
                expect(true).toEqual(true);
            })
        });
    }

})
;
