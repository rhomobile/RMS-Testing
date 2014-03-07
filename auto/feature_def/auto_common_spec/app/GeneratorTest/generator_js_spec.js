
describe("<generator API specs>", function() {

    if (Rho.System.platform != Rho.System.PLATFORM_WP8)
    {
    describe("Native bridge", function() {

        describe("Normal test case", function() {
            it("passing boolean", function() {
                expect(Rho.NativeBridgeTest.testBool(false)).toEqual(false);
                expect(Rho.NativeBridgeTest.testBool(true)).toEqual(true);
            });

            it("passing integer", function() {
                expect(Rho.NativeBridgeTest.testInt(0)).toEqual(0);
                expect(Rho.NativeBridgeTest.testInt(1)).toEqual(1);
                expect(Rho.NativeBridgeTest.testInt(-1)).toEqual(-1);
                expect(Rho.NativeBridgeTest.testInt(2147483647)).toEqual(2147483647);
                expect(Rho.NativeBridgeTest.testInt(-2147483648)).toEqual(-2147483648);
            });

            it("passing float", function() {
                expect(Rho.NativeBridgeTest.testFloat(0.0)).toEqual(0.0);
                expect(Rho.NativeBridgeTest.testFloat(1.0)).toEqual(1.0);
                expect(Rho.NativeBridgeTest.testFloat(-1.0)).toEqual(-1.0);
                expect(Rho.NativeBridgeTest.testFloat(1234567890.0)).toEqual(1234567890.0);
                expect(Rho.NativeBridgeTest.testFloat(0.123456789)).toEqual(0.123456789);
            });

            it("passing string", function() {
                expect(Rho.NativeBridgeTest.testString("")).toEqual("");
                expect(Rho.NativeBridgeTest.testString("a")).toEqual("a");
                expect(Rho.NativeBridgeTest.testString('"')).toEqual('"');
                expect(Rho.NativeBridgeTest.testString('\\')).toEqual('\\');
                expect(Rho.NativeBridgeTest.testString('/')).toEqual('/');
                
                var str = ""; var str2 = "";
                for(var i=32; i < 128; i++) {
                    var chr = String.fromCharCode(i);
                    str += chr;
                    str2 += chr + chr;
                }
                expect(Rho.NativeBridgeTest.testString(str)).toEqual(str);
                expect(Rho.NativeBridgeTest.testString(str2)).toEqual(str2);
            });
        });
        describe("Edge test case", function() {
            it("passing integer", function() {
                expect(Rho.NativeBridgeTest.testInt(2147483647)).toEqual(2147483647);
                expect(Rho.NativeBridgeTest.testInt(-2147483648)).toEqual(-2147483648);
                expect(Rho.NativeBridgeTest.testInt(2147483648)).toNotEqual(2147483648);
                expect(Rho.NativeBridgeTest.testInt(-2147483649)).toNotEqual(-2147483649);
            });

            it("passing float", function() {
                expect(Rho.NativeBridgeTest.testFloat(-1.23e-32)).toEqual(-1.23e-32);
                expect(Rho.NativeBridgeTest.testFloat(1.23e+32)).toEqual(1.23e+32);
                expect(Rho.NativeBridgeTest.testFloat(-1.2356789e-300)).toEqual(-1.2356789e-300);
                expect(Rho.NativeBridgeTest.testFloat(1.2356789e+300)).toEqual(1.2356789e+300);
                expect(Rho.NativeBridgeTest.testFloat(123456789012345.0)).toEqual(123456789012345.0);
                expect(Rho.NativeBridgeTest.testFloat(0.123456789012345)).toEqual(0.123456789012345);

            });

            it("passing string escapes", function() {
                var str = ""; var str2 = "";
                for(var i=0; i < 32; i++) {
                    var chr = String.fromCharCode(i);
                    str += chr;
                    str2 += chr + chr;
                }
                expect(Rho.NativeBridgeTest.testString(str)).toEqual(str);
                expect(Rho.NativeBridgeTest.testString(str2)).toEqual(str2);
            });
            it("passing string non escapes", function() {
                var str = ""; var str2 = "";
                for(var i=32; i < 256; i++) {
                    var chr = String.fromCharCode(i);
                    str += chr;
                    str2 += chr + chr;
                }
                expect(Rho.NativeBridgeTest.testString(str)).toEqual(str);
                expect(Rho.NativeBridgeTest.testString(str2)).toEqual(str2);
            });
            it("passing single/double character combinations", function() {
                var str = ""; var str2 = "";
                /*
                for(var i=0; i < 256; i++) {
                    var chr = String.fromCharCode(i);
                    expect(Rho.NativeBridgeTest.testString(chr)).toEqual(chr);
                    expect(Rho.NativeBridgeTest.testString(chr+chr)).toEqual(chr+chr);
                }
                */
            });
        });
    });
    }

    describe("Default instance", function() {

        describe("as module object", function() {
            it("provides bool default property", function() {
                Rho.GenPropBag.boolProp = false;
                expect(Rho.GenPropBag.boolProp).toEqual(false);
                Rho.GenPropBag.boolProp = true;
                expect(Rho.GenPropBag.boolProp).toEqual(true);
            });
    
            it("provides int default property", function() {
                Rho.GenPropBag.intProp = 0;
                expect(Rho.GenPropBag.intProp).toEqual(0);
                Rho.GenPropBag.intProp = 15;
                expect(Rho.GenPropBag.intProp).toEqual(15);
            });
    
            it("provides float default property", function() {
                Rho.GenPropBag.floatProp = 0.1;
                expect(Rho.GenPropBag.floatProp).toEqual(0.1);
                Rho.GenPropBag.floatProp = 1.5;
                expect(Rho.GenPropBag.floatProp).toEqual(1.5);
            });
        });

        describe("from getDefault()", function() {
            it("provides bool property", function() {
                Rho.GenPropBag.getDefault().boolProp = false;
                expect(Rho.GenPropBag.getDefault().boolProp).toEqual(false);
                Rho.GenPropBag.getDefault().boolProp = true;
                expect(Rho.GenPropBag.getDefault().boolProp).toEqual(true);
            });
    
            it("provides int property", function() {
                Rho.GenPropBag.getDefault().intProp = 0;
                expect(Rho.GenPropBag.getDefault().intProp).toEqual(0);
                Rho.GenPropBag.getDefault().intProp = 15;
                expect(Rho.GenPropBag.getDefault().intProp).toEqual(15);
            });
    
            it("provides float property", function() {
                Rho.GenPropBag.getDefault().floatProp = 0.1;
                expect(Rho.GenPropBag.getDefault().floatProp).toEqual(0.1);
                Rho.GenPropBag.getDefault().floatProp = 1.5;
                expect(Rho.GenPropBag.getDefault().floatProp).toEqual(1.5);
            });
        });

        describe("from defaultInstance prop", function() {
            it("provides bool property", function() {
                Rho.GenPropBag.defaultInstance.boolProp = false;
                expect(Rho.GenPropBag.defaultInstance.boolProp).toEqual(false);
                Rho.GenPropBag.defaultInstance.boolProp = true;
                expect(Rho.GenPropBag.defaultInstance.boolProp).toEqual(true);
            });
    
            it("provides int property", function() {
                Rho.GenPropBag.defaultInstance.intProp = 0;
                expect(Rho.GenPropBag.defaultInstance.intProp).toEqual(0);
                Rho.GenPropBag.defaultInstance.intProp = 15;
                expect(Rho.GenPropBag.defaultInstance.intProp).toEqual(15);
            });
    
            it("provides float property", function() {
                Rho.GenPropBag.defaultInstance.floatProp = 0.1;
                expect(Rho.GenPropBag.defaultInstance.floatProp).toEqual(0.1);
                Rho.GenPropBag.defaultInstance.floatProp = 1.5;
                expect(Rho.GenPropBag.defaultInstance.floatProp).toEqual(1.5);
            });
        });

        it("accepts int values for float property", function() {
            Rho.GenPropBag.floatProp = 3;
            expect(Rho.GenPropBag.floatProp).toEqual(3);
        });

        it("provides a correct property value accessed either way", function() {
            Rho.GenPropBag.intProp = 15;
            expect(Rho.GenPropBag.getDefault().intProp).toEqual(15);

            Rho.GenPropBag.getDefault().intProp = 25;
            expect(Rho.GenPropBag.intProp).toEqual(25);

            Rho.GenPropBag.defaultInstance.intProp = 35;
            expect(Rho.GenPropBag.getDefault().intProp).toEqual(35);

            Rho.GenPropBag.getDefault().intProp = 45;
            expect(Rho.GenPropBag.defaultInstance.intProp).toEqual(45);
        });

    });

    describe("Optional callback", function() {

        it("can be omitted", function() {
            var val = Rho.System.getProperty('platform');
            expect(typeof val).toEqual('string');
            expect(val.length).toBeGreaterThan(0);
        });

        it("works being defined", function() {
            var cbVal = null;
            var val = Rho.System.getProperty('platform');
            Rho.System.getProperty('platform', function(v){ cbVal = v; });

            waitsFor(function(){return null != cbVal}, 'Callback should be called', 2000);
            runs(function() {
                expect(typeof cbVal).toEqual('string');
                expect(cbVal.length).toBeGreaterThan(0);
                expect(cbVal).toEqual(val);
            });
        });

        xit("can receive optional params", function() {
            var params = "abc123";
            var cbParams = null;
            var cbVal = null;
            var val = Rho.System.getProperty('platform');
            Rho.System.getProperty('platform', function(v, p){ cbVal = v; cbParams = p; }, params);

            waitsFor(function(){return null != cbVal}, 'Callback should be called', 2000);
            runs(function() {
                expect(typeof cbVal).toEqual('string');
                expect(cbVal.length).toBeGreaterThan(0);
                expect(cbVal).toEqual(val);
                expect(cbParams).toEqual(params);
            });
        });

    });

    describe("Enumerate method", function() {

        it("enumerates module instances", function() {
            var objs = Rho.GenPropBag.enumerate();

            Rho.Log.info(objs.toString(), "test" );

            expect(objs[1].boolProp).toEqual(false);
            objs[1].boolProp = true;
            expect(objs[1].boolProp).toEqual(true);
        });

        it("enumerates module instances with callback", function() 
        {
            var objs = null;
            Rho.GenPropBag.enumerate( function(v){ objs = v; } );
            waitsFor(function(){return null != objs}, 'Callback should be called', 2000);

            runs(function() 
            {
                expect(objs.length).toEqual(2);
                expect(typeof objs[1].getId).toEqual('function');
                expect(objs[1].boolProp).toEqual(true);
                objs[1].boolProp = false;
                expect(objs[1].boolProp).toEqual(false);
            });
        });
    });

    describe("Test getProperties, getAllProperties", function () {
        if (Rho.System.platform != Rho.System.PLATFORM_WP8)
        it("Should return all properties", function () {
            Rho.GenPropBag.floatProp= 3.14156;
            Rho.GenPropBag.intProp = 999;
            Rho.GenPropBag.boolProp = true;
            Rho.GenPropBag.stringProp = "some string";

            var allProperties = Rho.GenPropBag.getAllProperties();

            expect(Object.keys(allProperties).length).toEqual(5); // getAllProperties return ID also
            //expect(allProperties["floatProp"]).toEqual("3.14156");
            expect(allProperties["intProp"]).toEqual("999");
            expect(allProperties["boolProp"]).toEqual("true");
            expect(allProperties["stringProp"]).toEqual("some string");
        });

        it("Should return two properties", function () {
            Rho.GenPropBag.floatProp= 3.14156;
            Rho.GenPropBag.intProp= 3;

            var properties = Rho.GenPropBag.getProperties(["intProp", "floatProp"]);

            expect(Object.keys(properties).length).toEqual(2);
            //expect(properties["floatProp"]).toEqual("3.14156");
            expect(properties["intProp"]).toEqual("3");
        });

        it("Should return three properties if request for two esxists and one absent property", function () {
            Rho.GenPropBag.floatProp= 3.14156;
            Rho.GenPropBag.intProp= 3;

            var properties = Rho.GenPropBag.getProperties(["intProp", "floatProp", "absentProperty"]);

            expect(Object.keys(properties).length).toEqual(3);
            //expect(properties["floatProp"]).toEqual("3.14156");
            expect(properties["intProp"]).toEqual("3");
        });

        it("Should return null if property has valid name, but it is absent", function () {
            var properties = Rho.GenPropBag.getProperties(["absentProperty"]);

            expect(Object.keys(properties).length).toEqual(1);
        });
    });

    describe("Test access to GenPropBag instances", function() {
        var instances = [];

        it("enumerates module instances", function() {
            instances = Rho.GenPropBag.enumerate();

            expect(instances.length).toEqual(2);
        });

        it("set default instance values",function(){
            instances[1].boolProp = true;
            instances[1].intProp = 10;
            instances[1].floatProp = -1.1;

            instances[0].boolProp = false;
            instances[0].intProp = 20;
            instances[0].floatProp = 1.1;
        });

        it("check instance 1 values", function(){
            expect(instances[1].boolProp).toEqual(true);
            expect(instances[1].intProp).toEqual(10);
            expect(instances[1].floatProp).toEqual(-1.1);
        });

        it("check instance 0 values", function(){
            expect(instances[0].boolProp).toEqual(false);
            expect(instances[0].intProp).toEqual(20);
            expect(instances[0].floatProp).toEqual(1.1);
        });

        it("setDefault, get intProp as module object", function() {
            Rho.GenPropBag.setDefault(instances[1]);
            expect(Rho.GenPropBag.intProp).toEqual(10);
            Rho.GenPropBag.setDefault(instances[0]);
            expect(Rho.GenPropBag.intProp).toEqual(20);
        });

        it("setDefault, get floatProp using getDefault()", function() {
            Rho.GenPropBag.setDefault(instances[1]);
            expect(Rho.GenPropBag.getDefault().floatProp).toEqual(-1.1);
            Rho.GenPropBag.setDefault(instances[0]);
            expect(Rho.GenPropBag.getDefault().floatProp).toEqual(1.1);
        });

        it ("defaultInstance, get boolProp using defaultInstance", function() {
            Rho.GenPropBag.defaultInstance = instances[1];
            expect(Rho.GenPropBag.defaultInstance.boolProp).toEqual(true);
            Rho.GenPropBag.defaultInstance = instances[0];
            expect(Rho.GenPropBag.defaultInstance.boolProp).toEqual(false);
        });

        describe("test synchonization of object Ids", function() {

            it("1 - set using setDefault, get using getDefault",function(){
                Rho.GenPropBag.setDefault(instances[0]);
                expect(Rho.GenPropBag.getDefault().getId()).toEqual(instances[0].getId());
            });

            it("1 - get id using getDefaultID", function() {
                expect(Rho.GenPropBag.getDefaultID()).toEqual(instances[0].getId());
            });

            it("1 - get id using defaultID", function() {
                expect(Rho.GenPropBag.defaultID).toEqual(instances[0].getId());
            });

            it("2 - set using defaultInstance, get using defaultInstance",function(){
                Rho.GenPropBag.defaultInstance = instances[1];
                expect(Rho.GenPropBag.defaultInstance.getId()).toEqual(instances[1].getId());
            });

            it("2 - get id using getDefaultID", function() {
                expect(Rho.GenPropBag.getDefaultID()).toEqual(instances[1].getId());
            });

            it("2 -get id using defaultID", function() {
                expect(Rho.GenPropBag.defaultID).toEqual(instances[1].getId());
            });

            it("3 - set using setDefault, get using defaultInstance",function(){
                Rho.GenPropBag.setDefault(instances[0]);
                expect(Rho.GenPropBag.defaultInstance.getId()).toEqual(instances[0].getId());
            });

            it("4 - set using defaultInstance, get using getDefault",function(){
                Rho.GenPropBag.defaultInstance = instances[1];
                expect(Rho.GenPropBag.getDefault().getId()).toEqual(instances[1].getId());
            });

            it("5 - set using setDefaultID, get using getDefault",function(){
                Rho.GenPropBag.setDefaultID(instances[0].getId());
                expect(Rho.GenPropBag.getDefault().getId()).toEqual(instances[0].getId());
            });

            it("5 - get id using getDefaultID", function() {
                expect(Rho.GenPropBag.getDefaultID()).toEqual(instances[0].getId());
            });

            it("5 - get id using defaultID", function() {
                expect(Rho.GenPropBag.defaultID).toEqual(instances[0].getId());
            });

            it("5 - get id using defaultInstance", function() {
                expect(Rho.GenPropBag.defaultInstance.getId()).toEqual(instances[0].getId());
            });

            it("5 - get id using getDefault", function() {
                expect(Rho.GenPropBag.getDefault().getId()).toEqual(instances[0].getId());
            });
        });
    });

    xit("Test testMethod1", function() {
        var objs = Rho.GenProRhopBag.testMethod1();

        Rho.Log.info(objs.toString(), "test" );

    });

});
