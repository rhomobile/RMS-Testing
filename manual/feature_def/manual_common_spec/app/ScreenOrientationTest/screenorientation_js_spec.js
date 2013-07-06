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
	it("VT281-0916 | Set autoRotate  without callback rotate the device manualy |", function() {

		runs(function()
		{
            dispCurrentProcess("VT281-0916 | Set autoRotate  without callback rotate the device manualy<br>Rotate the device in all direction manually");
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

	it("VT281-0901 | Test Screen Orientation rightHanded without callback |", function() {
		runs(function()
		{
			dispCurrentProcess("VT281-0901 | Test Screen Orientation rightHanded without callback<br>device screen should move to rightHanded direction");
			Rho.ScreenOrientation.rightHanded();
			setTimeout(function() {
				displayflag = true;
			}, 5000);
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

	it("VT281-0902 | Test Screen Orientation leftHanded without callback |", function() {
		runs(function()
		{
			dispCurrentProcess("VT281-0902 | Test Screen Orientation leftHanded without callback<br>device screen should move to leftHanded direction");
			Rho.ScreenOrientation.leftHanded();
			setTimeout(function() {
				displayflag = true;
			}, 5000);
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

	it("VT281-0903 | Test Screen Orientation upsideDown without callback |", function() {
		runs(function()
		{
			dispCurrentProcess("VT281-0903 | Test Screen Orientation upsideDown without callback<br>device screen should move to upsideDown direction");
			Rho.ScreenOrientation.upsideDown();
			setTimeout(function() {
				displayflag = true;
			}, 5000);
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

	it("VT281-0904 | Test Screen Orientation normal without callback |", function() {
		runs(function()
		{
			dispCurrentProcess("VT281-0904 | Test Screen Orientation normal without callback<br>device screen should move to normal direction");
			Rho.ScreenOrientation.normal();
			setTimeout(function() {
				displayflag = true;
			}, 5000);
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
    }

	it("VT281-0909 | autoRotate with default value |", function() {

		runs(function()
		{
			dispCurrentProcess("VT281-0909 | autoRotate with default value<br>Rotate the device in all direction manually");
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

	it("VT281-0911| Set autoRotate as false and try to rotate the device screen manually in all direction |", function() {

		runs(function()
		{
			dispCurrentProcess("VT281-0911| Set autoRotate as false and try to rotate the device screen manually in all direction<br>but its should not rotate in any direction");
			Rho.ScreenOrientation.setScreenOrientationEvent(screenorientation_callback);
			Rho.ScreenOrientation.autoRotate = false;
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

	it("VT281-0913| Set autoRotate as true and rotate the device in all direction |", function() {

		runs(function()
		{
		    dispCurrentProcess("VT281-0913| Set autoRotate as true and rotate the device in all direction<br>Rotate the device in all direction mannually");
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

    if (isAnyButApplePlatform()) {

	it("VT281-0915 | Set autoRotate as true with ananymous callback |", function() {
		runs(function()
		{
            dispCurrentProcess("VT281-0915 | Set autoRotate as true with ananymous callback<br>Rotate the device in all direction manually");
			Rho.ScreenOrientation.normal(function (data){		
		    displayResult('DATA:- ',JSON.stringify(data));});
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
    }

    if (isAnyButApplePlatform()) {

	it("VT281-0917 | Set autoRotate ture without callback and call right hand method |", function() {
		runs(function()
		{
			dispCurrentProcess("VT281-0917 | Set autoRotate ture without callback and call right hand method<br>Rotate the device in all direction");
			Rho.ScreenOrientation.rightHanded();
			setTimeout(function() {
				displayflag = true;
			}, 5000);
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
    }
	it("VT281-0920 | ScreenOrientation tag persistancy |", function() {

		runs(function()
		{
			dispCurrentProcess("VT281-0920 | ScreenOrientation tag persistancy<br>Rotate the device in all direction after navigating to other page");
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
