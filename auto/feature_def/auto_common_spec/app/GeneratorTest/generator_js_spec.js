
describe("<generator API specs>", function() {

    describe("Default instance", function() {

        xit("provides bool default property via module object", function() {
            Rho.GenPropBag.boolProp = false;
            expect(Rho.GenPropBag.boolProp).toEqual(false);
            Rho.GenPropBag.boolProp = true;
            expect(Rho.GenPropBag.boolProp).toEqual(true);
        });

        xit("provides int default property via module object", function() {
            Rho.GenPropBag.intProp = 0;
            expect(Rho.GenPropBag.intProp).toEqual(0);
            Rho.GenPropBag.intProp = 15;
            expect(Rho.GenPropBag.intProp).toEqual(15);
        });

        xit("provides float default property via module object", function() {
            Rho.GenPropBag.floatProp = 0.1;
            expect(Rho.GenPropBag.floatProp).toEqual(0.1);
            Rho.GenPropBag.floatProp = 1.5;
            expect(Rho.GenPropBag.floatProp).toEqual(1.5);
        });

        xit("provides bool property from default object", function() {
            Rho.GenPropBag.getDefault().boolProp = false;
            expect(Rho.GenPropBag.getDefault().boolProp).toEqual(false);
            Rho.GenPropBag.getDefault().boolProp = true;
            expect(Rho.GenPropBag.getDefault().boolProp).toEqual(true);
        });

        xit("provides int property from default object", function() {
            Rho.GenPropBag.getDefault().intProp = 0;
            expect(Rho.GenPropBag.getDefault().intProp).toEqual(0);
            Rho.GenPropBag.getDefault().intProp = 15;
            expect(Rho.GenPropBag.getDefault().intProp).toEqual(15);
        });

        xit("provides float property from default object", function() {
            Rho.GenPropBag.getDefault().floatProp = 0.1;
            expect(Rho.GenPropBag.getDefault().floatProp).toEqual(0.1);
            Rho.GenPropBag.getDefault().floatProp = 1.5;
            expect(Rho.GenPropBag.getDefault().floatProp).toEqual(1.5);
        });

        xit("accepts int values for float property", function() {
            Rho.GenPropBag.floatProp = 3;
            expect(Rho.GenPropBag.floatProp).toEqual(3);
        });

        xit("provides a correct property value accessed either way", function() {
            Rho.GenPropBag.intProp = 25;
            expect(Rho.GenPropBag.getDefault().intProp).toEqual(25);
            Rho.GenPropBag.getDefault().intProp = 15;
            expect(Rho.GenPropBag.intProp).toEqual(15);
        });

    });

    describe("Optional callback", function() {

        xit("can be omitted", function() {
            var val = Rho.System.getProperty('platform');
            expect(typeof val).toEqual('string');
            expect(val.length).toBeGreaterThan(0);
        });

        xit("works being defined", function() {
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

            //expect(objs[1].boolProp).toEqual(false);
            //objs[1].boolProp = true;
            //expect(objs[1].boolProp).toEqual(true);
        });

        xit("enumerates module instances with callback", function() 
        {
            var objs = null;
            Rho.GenPropBag.enumerate( function(v){ objs = v; } );
            waitsFor(function(){return null != objs}, 'Callback should be called', 2000);

            runs(function() 
            {
                expect(objs.length).toEqual(2);
                objs[1].boolProp = true;
                expect(objs[1].boolProp).toEqual(true);
            });
        });
    });

    describe("Test getProperties, getAllProperties", function () {
        xit("Should return all properties", function () {
            Rho.GenPropBag.floatProp= 3.14156;
            Rho.GenPropBag.intProp = 999;
            Rho.GenPropBag.boolProp = true;
            Rho.GenPropBag.stringProp = "some string";

            var allProperties = Rho.GenPropBag.getAllProperties();

            expect(Object.keys(allProperties).length).toEqual(5); // getAllProperties return ID also
            expect(allProperties["floatProp"]).toEqual("3.14156");
            expect(allProperties["intProp"]).toEqual("999");
            expect(allProperties["boolProp"]).toEqual("true");
            expect(allProperties["stringProp"]).toEqual("some string");
        });

        xit("Should return two properties", function () {
            Rho.GenPropBag.floatProp= 3.14156;
            Rho.GenPropBag.intProp= 3;

            var properties = Rho.GenPropBag.getProperties(["intProp", "floatProp"]);

            expect(Object.keys(properties).length).toEqual(2);
            expect(properties["floatProp"]).toEqual("3.14156");
            expect(properties["intProp"]).toEqual("3");
        });

        xit("Should return two properties if request for two esxists and one absent property", function () {
            Rho.GenPropBag.floatProp= 3.14156;
            Rho.GenPropBag.intProp= 3;

            var properties = Rho.GenPropBag.getProperties(["intProp", "floatProp", "absentProperty"]);

            expect(Object.keys(properties).length).toEqual(2);
            expect(properties["floatProp"]).toEqual("3.14156");
            expect(properties["intProp"]).toEqual("3");
        });

        xit("Should return null if property has valid name, but it is absent", function () {
            var properties = Rho.GenPropBag.getProperties(["absentProperty"]);

            expect(Object.keys(properties).length).toEqual(0);
        });

        xit("Should return null if property has invalid name and it is absent", function () {
            var properties = Rho.GenPropBag.getProperties(["absent property"]);

            expect(Object.keys(properties).length).toEqual(0);
        });


    });

    xit("Test testMethod1", function() {
        var objs = Rho.GenProRhopBag.testMethod1();

        Rho.Log.info(objs.toString(), "test" );

    });

});
