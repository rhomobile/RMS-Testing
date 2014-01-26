describe("Suite A", function () {
    it("Spec A-1", function () {
        expect(true).toBe(true);
    });

    it("Spec A-2", function () {
        expect(true).toBe(true);
    });
});

describe("Suite B", function () {

    describe("Suite C", function () {
        it("Spec C-1", function () {
            expect(true).toBe(true);
        });

        it("Spec C-2", function () {
            expect(true).toBe(true);
        });
    });


    it("Spec B-1", function () {
        expect(true).toBe(true);
    });

    it("Spec B-2", function () {
        expect(true).toBe(true);
    });
});

