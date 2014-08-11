
describe("<generator API specs>", function() {

    if (EB.System.platform != EB.System.PLATFORM_WP8)
    {
    describe("Native bridge", function() {

        describe("Normal test case", function() {
            it("passing boolean", function() {
                expect(EB.NativeBridgeTest.testBool(false)).toEqual(false);
                expect(EB.NativeBridgeTest.testBool(true)).toEqual(true);
            });

            it("passing integer", function() {
                expect(EB.NativeBridgeTest.testInt(0)).toEqual(0);
                expect(EB.NativeBridgeTest.testInt(1)).toEqual(1);
                expect(EB.NativeBridgeTest.testInt(-1)).toEqual(-1);
                expect(EB.NativeBridgeTest.testInt(2147483647)).toEqual(2147483647);
                expect(EB.NativeBridgeTest.testInt(-2147483648)).toEqual(-2147483648);
            });

            it("passing float", function() {
                expect(EB.NativeBridgeTest.testFloat(0.0)).toEqual(0.0);
                expect(EB.NativeBridgeTest.testFloat(1.0)).toEqual(1.0);
                expect(EB.NativeBridgeTest.testFloat(-1.0)).toEqual(-1.0);
                expect(EB.NativeBridgeTest.testFloat(1234567890.0)).toEqual(1234567890.0);
                expect(EB.NativeBridgeTest.testFloat(0.123456789)).toEqual(0.123456789);
            });

            it("passing string", function() {
                expect(EB.NativeBridgeTest.testString("")).toEqual("");
                expect(EB.NativeBridgeTest.testString("a")).toEqual("a");
                expect(EB.NativeBridgeTest.testString('"')).toEqual('"');
                expect(EB.NativeBridgeTest.testString('\\')).toEqual('\\');
                expect(EB.NativeBridgeTest.testString('/')).toEqual('/');
                
                var str = ""; var str2 = "";
                for(var i=32; i < 128; i++) {
                    var chr = String.fromCharCode(i);
                    str += chr;
                    str2 += chr + chr;
                }
                expect(EB.NativeBridgeTest.testString(str)).toEqual(str);
                expect(EB.NativeBridgeTest.testString(str2)).toEqual(str2);
            });
        });
        describe("Edge test case", function() {
            it("passing integer", function() {
                expect(EB.NativeBridgeTest.testInt(2147483647)).toEqual(2147483647);
                expect(EB.NativeBridgeTest.testInt(-2147483648)).toEqual(-2147483648);
                expect(EB.NativeBridgeTest.testInt(2147483648)).toNotEqual(2147483648);
                expect(EB.NativeBridgeTest.testInt(-2147483649)).toNotEqual(-2147483649);
            });

            it("passing float", function() {
                expect(EB.NativeBridgeTest.testFloat(-1.23e-32)).toEqual(-1.23e-32);
                expect(EB.NativeBridgeTest.testFloat(1.23e+32)).toEqual(1.23e+32);
                expect(EB.NativeBridgeTest.testFloat(-1.2356789e-300)).toEqual(-1.2356789e-300);
                expect(EB.NativeBridgeTest.testFloat(1.2356789e+300)).toEqual(1.2356789e+300);
                expect(EB.NativeBridgeTest.testFloat(123456789012345.0)).toEqual(123456789012345.0);
                expect(EB.NativeBridgeTest.testFloat(0.123456789012345)).toEqual(0.123456789012345);

            });

            it("passing string escapes", function() {
                var str = ""; var str2 = "";
                for(var i=0; i < 32; i++) {
                    var chr = String.fromCharCode(i);
                    str += chr;
                    str2 += chr + chr;
                }
                expect(EB.NativeBridgeTest.testString(str)).toEqual(str);
                expect(EB.NativeBridgeTest.testString(str2)).toEqual(str2);
            });
            it("passing string non escapes", function() {
                var str = ""; var str2 = "";
                for(var i=32; i < 256; i++) {
                    var chr = String.fromCharCode(i);
                    str += chr;
                    str2 += chr + chr;
                }
                expect(EB.NativeBridgeTest.testString(str)).toEqual(str);
                expect(EB.NativeBridgeTest.testString(str2)).toEqual(str2);
            });
            it("passing single/double character combinations", function() {
                var str = ""; var str2 = "";
                /*
                for(var i=0; i < 256; i++) {
                    var chr = String.fromCharCode(i);
                    expect(EB.NativeBridgeTest.testString(chr)).toEqual(chr);
                    expect(EB.NativeBridgeTest.testString(chr+chr)).toEqual(chr+chr);
                }
                */
            });
        });
    });
    }

    describe("Default instance", function() {

        describe("as module object", function() {
            it("provides bool default property", function() {
                EB.GenPropBag.boolProp = false;
                expect(EB.GenPropBag.boolProp).toEqual(false);
                EB.GenPropBag.boolProp = true;
                expect(EB.GenPropBag.boolProp).toEqual(true);
            });
    
            it("provides int default property", function() {
                EB.GenPropBag.intProp = 0;
                expect(EB.GenPropBag.intProp).toEqual(0);
                EB.GenPropBag.intProp = 15;
                expect(EB.GenPropBag.intProp).toEqual(15);
            });
    
            it("provides float default property", function() {
                EB.GenPropBag.floatProp = 0.1;
                expect(EB.GenPropBag.floatProp).toEqual(0.1);
                EB.GenPropBag.floatProp = 1.5;
                expect(EB.GenPropBag.floatProp).toEqual(1.5);
            });
        });

        describe("from getDefault()", function() {
            it("provides bool property", function() {
                EB.GenPropBag.getDefault().boolProp = false;
                expect(EB.GenPropBag.getDefault().boolProp).toEqual(false);
                EB.GenPropBag.getDefault().boolProp = true;
                expect(EB.GenPropBag.getDefault().boolProp).toEqual(true);
            });
    
            it("provides int property", function() {
                EB.GenPropBag.getDefault().intProp = 0;
                expect(EB.GenPropBag.getDefault().intProp).toEqual(0);
                EB.GenPropBag.getDefault().intProp = 15;
                expect(EB.GenPropBag.getDefault().intProp).toEqual(15);
            });
    
            it("provides float property", function() {
                EB.GenPropBag.getDefault().floatProp = 0.1;
                expect(EB.GenPropBag.getDefault().floatProp).toEqual(0.1);
                EB.GenPropBag.getDefault().floatProp = 1.5;
                expect(EB.GenPropBag.getDefault().floatProp).toEqual(1.5);
            });
        });

        describe("from defaultInstance prop", function() {
            it("provides bool property", function() {
                EB.GenPropBag.defaultInstance.boolProp = false;
                expect(EB.GenPropBag.defaultInstance.boolProp).toEqual(false);
                EB.GenPropBag.defaultInstance.boolProp = true;
                expect(EB.GenPropBag.defaultInstance.boolProp).toEqual(true);
            });
    
            it("provides int property", function() {
                EB.GenPropBag.defaultInstance.intProp = 0;
                expect(EB.GenPropBag.defaultInstance.intProp).toEqual(0);
                EB.GenPropBag.defaultInstance.intProp = 15;
                expect(EB.GenPropBag.defaultInstance.intProp).toEqual(15);
            });
    
            it("provides float property", function() {
                EB.GenPropBag.defaultInstance.floatProp = 0.1;
                expect(EB.GenPropBag.defaultInstance.floatProp).toEqual(0.1);
                EB.GenPropBag.defaultInstance.floatProp = 1.5;
                expect(EB.GenPropBag.defaultInstance.floatProp).toEqual(1.5);
            });
        });

        it("accepts int values for float property", function() {
            EB.GenPropBag.floatProp = 3;
            expect(EB.GenPropBag.floatProp).toEqual(3);
        });

        it("provides a correct property value accessed either way", function() {
            EB.GenPropBag.intProp = 15;
            expect(EB.GenPropBag.getDefault().intProp).toEqual(15);

            EB.GenPropBag.getDefault().intProp = 25;
            expect(EB.GenPropBag.intProp).toEqual(25);

            EB.GenPropBag.defaultInstance.intProp = 35;
            expect(EB.GenPropBag.getDefault().intProp).toEqual(35);

            EB.GenPropBag.getDefault().intProp = 45;
            expect(EB.GenPropBag.defaultInstance.intProp).toEqual(45);
        });

    });

    describe("Optional callback", function() {

        it("can be omitted", function() {
            var val = EB.System.getProperty('platform');
            expect(typeof val).toEqual('string');
            expect(val.length).toBeGreaterThan(0);
        });

        it("works being defined", function() {
            var cbVal = null;
            var val = EB.System.getProperty('platform');
            EB.System.getProperty('platform', function(v){ cbVal = v; });

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
            var val = EB.System.getProperty('platform');
            EB.System.getProperty('platform', function(v, p){ cbVal = v; cbParams = p; }, params);

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
            var objs = EB.GenPropBag.enumerate();

            EB.Log.info(objs.toString(), "test" );

            objs[1].boolProp = true;
            expect(objs[1].boolProp).toEqual(true);
        });

        it("enumerates module instances with callback", function() 
        {
            var objs = null;
            EB.GenPropBag.enumerate( function(v){ objs = v; } );
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
        if (EB.System.platform != EB.System.PLATFORM_WP8)
        it("Should return all properties", function () {
            EB.GenPropBag.floatProp= 3.14156;
            EB.GenPropBag.intProp = 999;
            EB.GenPropBag.boolProp = true;
            EB.GenPropBag.stringProp = "some string";

            var allProperties = EB.GenPropBag.getAllProperties();

            expect(Object.keys(allProperties).length).toEqual(5); // getAllProperties return ID also
            //expect(allProperties["floatProp"]).toEqual("3.14156");
            expect(allProperties["intProp"]).toEqual("999");
            expect(allProperties["boolProp"]).toEqual("true");
            expect(allProperties["stringProp"]).toEqual("some string");
        });

        it("Should return two properties", function () {
            EB.GenPropBag.floatProp= 3.14156;
            EB.GenPropBag.intProp= 3;

            var properties = EB.GenPropBag.getProperties(["intProp", "floatProp"]);

            expect(Object.keys(properties).length).toEqual(2);
            //expect(properties["floatProp"]).toEqual("3.14156");
            expect(properties["intProp"]).toEqual("3");
        });

        it("Should return three properties if request for two esxists and one absent property", function () {
            EB.GenPropBag.floatProp= 3.14156;
            EB.GenPropBag.intProp= 3;

            var properties = EB.GenPropBag.getProperties(["intProp", "floatProp", "absentProperty"]);

            expect(Object.keys(properties).length).toEqual(3);
            //expect(properties["floatProp"]).toEqual("3.14156");
            expect(properties["intProp"]).toEqual("3");
        });

        it("Should return null if property has valid name, but it is absent", function () {
            var properties = EB.GenPropBag.getProperties(["absentProperty"]);

            expect(Object.keys(properties).length).toEqual(1);
        });
    });

    describe("Test access to GenPropBag instances", function() {
        var instances = [];

        beforeEach(function(){
            instances = EB.GenPropBag.enumerate();

            if (instances.length > 1) { 
                instances[1].boolProp = true;
                instances[1].intProp = 10;
                instances[1].floatProp = -1.1;

                instances[0].boolProp = false;
                instances[0].intProp = 20;
                instances[0].floatProp = 1.1;
            }
        });

        it("enumerates module instances", function() {
            expect(instances.length).toEqual(2);
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
            EB.GenPropBag.setDefault(instances[1]);
            expect(EB.GenPropBag.intProp).toEqual(10);
            EB.GenPropBag.setDefault(instances[0]);
            expect(EB.GenPropBag.intProp).toEqual(20);
        });

        it("setDefault, get floatProp using getDefault()", function() {
            EB.GenPropBag.setDefault(instances[1]);
            expect(EB.GenPropBag.getDefault().floatProp).toEqual(-1.1);
            EB.GenPropBag.setDefault(instances[0]);
            expect(EB.GenPropBag.getDefault().floatProp).toEqual(1.1);
        });

        it ("defaultInstance, get boolProp using defaultInstance", function() {
            EB.GenPropBag.defaultInstance = instances[1];
            expect(EB.GenPropBag.defaultInstance.boolProp).toEqual(true);
            EB.GenPropBag.defaultInstance = instances[0];
            expect(EB.GenPropBag.defaultInstance.boolProp).toEqual(false);
        });

        describe("test synchonization of object Ids", function() {

            it("1 - set using setDefault, get using getDefault",function(){
                EB.GenPropBag.setDefault(instances[0]);
                expect(EB.GenPropBag.getDefault().getId()).toEqual(instances[0].getId());
            });

            it("1 - get id using getDefaultID", function() {
                EB.GenPropBag.setDefault(instances[0]);
                expect(EB.GenPropBag.getDefaultID()).toEqual(instances[0].getId());
            });

            it("1 - get id using defaultID", function() {
                EB.GenPropBag.setDefault(instances[0]);
                expect(EB.GenPropBag.defaultID).toEqual(instances[0].getId());
            });

            it("2 - set using defaultInstance, get using defaultInstance",function(){
                EB.GenPropBag.defaultInstance = instances[1];
                expect(EB.GenPropBag.defaultInstance.getId()).toEqual(instances[1].getId());
            });

            it("2 - get id using getDefaultID", function() {
                EB.GenPropBag.defaultInstance = instances[1];
                expect(EB.GenPropBag.getDefaultID()).toEqual(instances[1].getId());
            });

            it("2 -get id using defaultID", function() {
                EB.GenPropBag.defaultInstance = instances[1];
                expect(EB.GenPropBag.defaultID).toEqual(instances[1].getId());
            });

            it("3 - set using setDefault, get using defaultInstance",function(){
                EB.GenPropBag.setDefault(instances[0]);
                expect(EB.GenPropBag.defaultInstance.getId()).toEqual(instances[0].getId());
            });

            it("4 - set using defaultInstance, get using getDefault",function(){
                EB.GenPropBag.defaultInstance = instances[1];
                expect(EB.GenPropBag.getDefault().getId()).toEqual(instances[1].getId());
            });

            it("5 - set using setDefaultID, get using getDefault",function(){
                EB.GenPropBag.setDefaultID(instances[0].getId());
                expect(EB.GenPropBag.getDefault().getId()).toEqual(instances[0].getId());
            });

            it("5 - get id using getDefaultID", function() {
                EB.GenPropBag.setDefaultID(instances[0].getId());
                expect(EB.GenPropBag.getDefaultID()).toEqual(instances[0].getId());
            });

            it("5 - get id using defaultID", function() {
                EB.GenPropBag.setDefaultID(instances[0].getId());
                expect(EB.GenPropBag.defaultID).toEqual(instances[0].getId());
            });

            it("5 - get id using defaultInstance", function() {
                EB.GenPropBag.setDefaultID(instances[0].getId());
                expect(EB.GenPropBag.defaultInstance.getId()).toEqual(instances[0].getId());
            });

            it("5 - get id using getDefault", function() {
                EB.GenPropBag.setDefaultID(instances[0].getId());
                expect(EB.GenPropBag.getDefault().getId()).toEqual(instances[0].getId());
            });
        });
    });

    xit("Test testMethod1", function() {
        var objs = EB.GenProRhopBag.testMethod1();

        EB.Log.info(objs.toString(), "test" );

    });

});
