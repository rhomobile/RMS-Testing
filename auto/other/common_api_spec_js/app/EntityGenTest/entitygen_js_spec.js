
describe("EntityGen API specs>", function() {
    beforeEach(function () {
        Rho.EntityGen.resetState();
        Rho.EntityGen.clearCallList();
    });

    describe("Emtpy Entity test", function() {
        beforeEach(function () {
            Rho.EntityGen.clearCallList();
        });

        it("create entity, do not access it", function() {
            var res = new Rho.EntityGen.Emtpy();
            var callist = Rho.EntityGen.getCallList().join(',');
            expect(res).toNotEqual(undefined);
            expect(callist).toEqual('');
        });

        it("create entity, check constructor calls", function() {
            var res = new Rho.EntityGen.Emtpy();
            res.save();
            var callist = Rho.EntityGen.getCallList().join(',');
            expect(res).toNotEqual(undefined);
            expect(callist).toEqual('initEmtpy');
        });
    });

    describe("constEnt Entity test", function() {
        beforeEach(function () {
            Rho.EntityGen.clearCallList();
        });

        it("create entity, do not access it", function() {
            var res = new Rho.EntityGen.ConstEnt();
            var callist = Rho.EntityGen.getCallList().join(',');
            expect(res).toNotEqual(undefined);
            expect(callist).toEqual('');
        });

        it("create entity, check constructor calls", function() {
            var res = new Rho.EntityGen.ConstEnt();
            res.save();
            var callist = Rho.EntityGen.getCallList().join(',');
            expect(res).toNotEqual(undefined);
            expect(callist).toEqual('initConstEnt');
        });

        it("create entity, check access order calls", function() {
            var res = new Rho.EntityGen.ConstEnt();
            expect(res).toNotEqual(undefined);
            expect(res.getCconst()).toEqual("");
            expect(Rho.EntityGen.getCallList().join(',')).toEqual('');
            res.save();
            expect(Rho.EntityGen.getCallList().join(',')).toEqual('initConstEnt');
            expect(res.getCconst()).toEqual("initialized");
        });

        it("create entity, check propery accessors ", function() {
            var res = new Rho.EntityGen.ConstEnt();
            expect(res.cconst).toEqual("");
            res.save();
            expect(res.cconst).toEqual("initialized");
        });

        it("create entity, check propery read only access ", function() {
            var res = new Rho.EntityGen.ConstEnt();
            res.save();
            res.cconst = "abcd";
            expect(res.cconst).toEqual("initialized");
        });
    });

    describe("simpleEntity test", function() {
        beforeEach(function () {
            Rho.EntityGen.clearCallList();
        });

        it("create entity, do access it", function() {
            // create entity
            var res = new Rho.EntityGen.SimpleEntity();
            expect(res).toNotEqual(undefined);
            // set fields
            res.id = 100500;
            res.someField = "info";
            expect(Rho.EntityGen.getCallList().join(',')).toEqual('');
            res.save();

            // check initialization
            expect(Rho.EntityGen.getCallList().join(',')).toEqual('initSimpleEntity:info');
            Rho.EntityGen.clearCallList();

            // constant fields
            expect(res.id).toEqual(0);
            res.id = 100;
            expect(res.id).toEqual(0);
            // non constant fields
            expect(res.someField).toEqual('someValue');
            res.someField = 10;
            expect(res.someField).toEqual('10');

            // call method
            expect(res.justMethod).toNotEqual(undefined);
            expect(res.justMethod()).toEqual('foo'+res.id);

            // call static method
            expect(Rho.EntityGen.SimpleEntity.someMethod).toNotEqual(undefined);
            expect(Rho.EntityGen.SimpleEntity.someMethod()).toEqual('simple_result');
        });

        it("test entity returned from function", function() {
            // generate some entity
            var anotherEntity = Rho.EntityGen.SimpleEntity.oneEntity();
            expect(anotherEntity).toNotEqual(undefined);
            expect(anotherEntity.id).toEqual(0);
            expect(anotherEntity.someField).toEqual('otherValue');

            var anotherEntities = Rho.EntityGen.SimpleEntity.arrayOfEntites(10);
            for(var i = 0; i < 10; i++) {
                expect(anotherEntities[i]).toNotEqual(undefined);
                expect(anotherEntities[i].id).toEqual(i+1);
                expect(anotherEntities[i].someField).toEqual('yetAnotherValue');
            }
        });

    });


});
