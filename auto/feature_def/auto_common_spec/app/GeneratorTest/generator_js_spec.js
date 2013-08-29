
describe("<generator API specs>", function() {

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
                expect(objs[1].boolProp).toEqual(true);
                objs[1].boolProp = false;
                expect(objs[1].boolProp).toEqual(false);
            });
        });
    });

    describe("Test getProperties, getAllProperties", function () {
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

    xit("Test testMethod1", function() {
        var objs = Rho.GenProRhopBag.testMethod1();

        Rho.Log.info(objs.toString(), "test" );

    });

});
