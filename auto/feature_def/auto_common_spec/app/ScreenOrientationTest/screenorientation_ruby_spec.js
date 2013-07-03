describe("ScreenOrientation Ruby API Test", function () {

    beforeEach(function () {
        document.getElementById('output').innerHTML = "";
    });

    afterEach(function () {
        resetCallback();
        enable(true);
    });

	it("should enable automatic screen orientation", function() {
		expect(enable(true)).toBe(true);			
	});
	
	it("should disable automatic screen orientation", function() {			
		expect(enable(false)).toBe(false);			
	});
	
    if (isAnyButApplePlatform()) {


        it("should set current device orientation to upsideDown without callback", function () {
            runs(function () {
                upsideDown();
            }, "Set the current orientation to upside down...");

            waitsFor(function () {
                return document.getElementById('output').innerHTML == "";
            }, "Something wrong happened", 10000);
        });

        it("should set current device orientation to rightHanded without callback", function () {
            rightHanded();
        });

        it("should set current device orientation to leftHanded without callback", function () {
            leftHanded();
        });

        it("should set current device orientation to normal without callback", function () {
            normal();
        });

        it("should set current device orientation to upsideDown and call a callback function", function () {
            runs(function () {
                setCallback();
                upsideDown();
            }, "Set the current orientation to upsideDown...this should trigger a callback");

            waitsFor(function () {
                return document.getElementById('output').innerHTML == "upsideDown"
            }, document.getElementById('output').innerHTML + " is not the expected value upsideDown", 10000);
        });

        it("should set current device orientation to leftHanded and call a callback function", function () {
            runs(function () {
                setCallback();
                leftHanded();
            }, "Set the current orientation to leftHanded...this should trigger a callback");

            waitsFor(function () {
                return document.getElementById('output').innerHTML == "leftHanded"
            }, document.getElementById('output').innerHTML + " is not the expected value leftHanded", 10000);
        });

        it("should set current device orientation to rightHanded and call a callback function", function () {
            runs(function () {
                setCallback();
                rightHanded();
            }, "Set the current orientation to rightHanded...this should trigger a callback");

            waitsFor(function () {
                return document.getElementById('output').innerHTML == "rightHanded"
            }, document.getElementById('output').innerHTML + " is not the expected value rightHanded", 10000);
        });

        it("should set current device orientation to normal and call a callback function", function () {
            runs(function () {
                setCallback();
                normal();
            }, "Set the current orientation to normal...this should trigger a callback");

            waitsFor(function () {
                return document.getElementById('output').innerHTML == "normal"
            }, document.getElementById('output').innerHTML + " is not the expected value normal", 10000);
        });
    }
});

