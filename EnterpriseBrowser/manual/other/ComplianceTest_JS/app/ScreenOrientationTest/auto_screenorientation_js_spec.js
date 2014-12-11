describe("ScreenOrientation JS API Test", function () {

    var displayflag = false;
    var orientationType = '';
    var callbackFired = false;

    beforeEach(function () {
        /* ... Set up your object ... */
        displayflag = false;
        orientationType = '';
        callbackFired = false;
    });

    afterEach(function () {
        EB.ScreenOrientation.autoRotate = true;
    });

    var screenorientation_callback = function (data) {

        orientationType = data;
        displayResult('DATA:- ', JSON.stringify(data));
        callbackFired = true;

    }

    if (isAnyButApplePlatform()) {

        it("VT200-0670 | Test Screen Orientation rightHanded with callback |", function() {

		runs(function()
		{
			//dispCurrentProcess("VT281-0905 | Test Screen Orientation rightHanded with callback |");
			EB.ScreenOrientation.setScreenOrientationEvent(screenorientation_callback);
			EB.ScreenOrientation.rightHanded();
		});

		waitsFor(function()
		{
			return ( (callbackFired == true) && (orientationType == "rightHanded") )
		}, 'The Screen Orientation should display', 10000);
		});
/*
        it("VT281-0906 | Test Screen Orientation leftHanded with callback |", function() {
		runs(function()
		{
			//dispCurrentProcess("VT281-0906 | Test Screen Orientation leftHanded with callback |");
			EB.ScreenOrientation.setScreenOrientationEvent(screenorientation_callback);
			EB.ScreenOrientation.leftHanded();
		});

		waitsFor(function()
		{
			return ( (callbackFired == true) && (orientationType == "leftHanded") )
		}, 'The Screen Orientation should display', 10000);
		});

        it("VT281-0907 | Test Screen Orientation upsideDown with callback |", function() {
		runs(function()
		{
			//dispCurrentProcess("VT281-0907 | Test Screen Orientation upsideDown with callback |");
			EB.ScreenOrientation.setScreenOrientationEvent(screenorientation_callback);
			EB.ScreenOrientation.upsideDown();
		});

		waitsFor(function()
		{
			return ( (callbackFired == true) && (orientationType == "upsideDown") )
		}, 'The Screen Orientation should display', 10000);
		});
*/
        it("VT200-0671 | Test Screen Orientation normal with callback |", function() {
		runs(function()
		{
			//dispCurrentProcess("VT281-0908 | Test Screen Orientation normal with callback |");
			EB.ScreenOrientation.setScreenOrientationEvent(screenorientation_callback);
			EB.ScreenOrientation.normal();
		});

		waitsFor(function()
		{
			return ( (callbackFired == true) && (orientationType == "normal") )
		}, 'The Screen Orientation should display', 10000);
		});
    }
});