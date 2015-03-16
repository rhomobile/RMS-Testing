var testResult = '';
var captured = false;


describe("Screen Orientation Test", function() {

	var displayflag = false;
	var orientationType = '';
	var callbackFired = false;

    beforeEach(function() {
		/* ... Set up your object ... */
		Rho.ScreenOrientation.autoRotate = true;
		displayflag = false;
		testResult = '';
		captured = false;
		orientationType = '';
		callbackFired = false;
	});

	afterEach(function() {
		/* ... Tear it down ... */
	});

	var screenorientation_callback = function (data){

		orientationType = data;
		displayResult('DATA:- ',JSON.stringify(data));
		callbackFired = true;

	}

/*  I moved this test to first because on start we do not have defined callback, after test with defined callback we still have defined callback !   So only on begin stage we do not have defined callback ! */
		it("VT200-0415 | Set autoRotate  without callback rotate the device manualy |", function() {

			runs(function()
			{
	            dispCurrentProcess("VT200-0415 | Set autoRotate  without callback rotate the device manualy");
			});

			waitsFor(function()
			{
				return captured;
			}, 'The Screen Orientation should display', 20000);

			runs(function()
			{
				expect(testResult).toEqual(true);
			});
		});

		if (isAnyButApplePlatform()) {

        it("VT200-0413 | Test Screen Orientation rightHanded with callback |", function() {

		runs(function()
		{
			//dispCurrentProcess("VT281-0905 | Test Screen Orientation rightHanded with callback |");
			Rho.ScreenOrientation.setScreenOrientationEvent(screenorientation_callback);
			Rho.ScreenOrientation.rightHanded();
		});

		waitsFor(function()
		{
			return ( (callbackFired == true) && (orientationType == "rightHanded") )
		}, 'The Screen Orientation should display', 10000);
		});

        it("VT200-0414 | Test Screen Orientation normal with callback |", function() {
		runs(function()
		{
			//dispCurrentProcess("VT281-0908 | Test Screen Orientation normal with callback |");
			Rho.ScreenOrientation.setScreenOrientationEvent(screenorientation_callback);
			Rho.ScreenOrientation.normal();
		});

		waitsFor(function()
		{
			return ( (callbackFired == true) && (orientationType == "normal") )
		}, 'The Screen Orientation should display', 10000);
		});
    }
		it("VT200-0541| Set autoRotate as true and rotate the device in all direction |", function() {

			runs(function()
			{
			    dispCurrentProcess("VT200-0541| Set autoRotate as true and rotate the device in all direction");
				Rho.ScreenOrientation.setScreenOrientationEvent(screenorientation_callback);
			});

			waitsFor(function()
			{
				return captured;
			}, 'The Screen Orientation should display', 20000);

			runs(function()
			{
				expect(testResult).toEqual(true);
			});
		});

});
