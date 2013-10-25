
describe("<SimpleOnlyStatic API specs>", function() {

    describe("static methods", function() {

        describe("calcSumm", function() {

            it("positive result", function() {
                var res = Rho.Examples.SimpleOnlyStaticModule.calcSumm(2,3);
                expect(res).toEqual(5);
            });
    
            it("negative result", function() {
                var res = Rho.Examples.SimpleOnlyStaticModule.calcSumm(-2,-3);
                expect(res).toEqual(-5);
            });

        });

        describe("joinStrings", function() {

            it("01", function() {
                var res = Rho.Examples.SimpleOnlyStaticModule.joinStrings(['111','222','333']);
                expect(res).toEqual('111222333');
            });
    
            it("02", function() {
                var res = Rho.Examples.SimpleOnlyStaticModule.joinStrings(['1','2','3']);
                expect(res).toEqual('123');
            });

            it("03", function() {
                var res = Rho.Examples.SimpleOnlyStaticModule.joinStrings(["1","","3"]);
                expect(res).toEqual("13");
            });

        });

    });

});
