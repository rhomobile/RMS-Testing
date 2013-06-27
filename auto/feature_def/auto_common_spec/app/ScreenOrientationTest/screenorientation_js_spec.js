describe("ScreenOrientation JS API Test", function() {

	var displayflag = false;
	var orientationType = '';
	var callbackFired = false;

    beforeEach(function() {
		/* ... Set up your object ... */
		Rho.ScreenOrientation.autoRotate = true;
		displayflag = false;
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

	it("VT281-0905 | Test Screen Orientation rightHanded with callback |", function() {
	
		runs(function()
		{
			dispCurrentProcess("VT281-0905 | Test Screen Orientation rightHanded with callback |");
			Rho.ScreenOrientation.setScreenOrientationEvent(screenorientation_callback);
			Rho.ScreenOrientation.rightHanded();
		});

		waitsFor(function()
		{
			return callbackFired;
		}, 'The Screen Orientation should display', 10000);

		runs(function()
		{
			expect(orientationType).toEqual("righthanded");
		});

	});
	
	it("VT281-0906 | Test Screen Orientation leftHanded with callback |", function() {
		runs(function()
		{
			dispCurrentProcess("VT281-0906 | Test Screen Orientation leftHanded with callback |");
			Rho.ScreenOrientation.setScreenOrientationEvent(screenorientation_callback);
			Rho.ScreenOrientation.leftHanded();
		});

		waitsFor(function()
		{
			return callbackFired;
		}, 'The Screen Orientation should display', 10000);

		runs(function()
		{
			expect(orientationType).toEqual("lefthanded");
		});
	});

	it("VT281-0907 | Test Screen Orientation upsideDown with callback |", function() {
		runs(function()
		{
			dispCurrentProcess("VT281-0907 | Test Screen Orientation upsideDown with callback |");
			Rho.ScreenOrientation.setScreenOrientationEvent(screenorientation_callback);
			Rho.ScreenOrientation.upsideDown();
		});

		waitsFor(function()
		{
			return callbackFired;
		}, 'The Screen Orientation should display', 10000);

		runs(function()
		{
			expect(orientationType).toEqual("upsidedown");
		});
	});

	it("VT281-0908 | Test Screen Orientation normal with callback |", function() {
		runs(function()
		{
			dispCurrentProcess("VT281-0908 | Test Screen Orientation normal with callback |");
			Rho.ScreenOrientation.setScreenOrientationEvent(screenorientation_callback);
			Rho.ScreenOrientation.normal();
		});

		waitsFor(function()
		{
			return callbackFired;
		}, 'The Screen Orientation should display', 10000);

		runs(function()
		{
			expect(orientationType).toEqual("normal");
		});
	});

	it("VT281-0910 | Set autoRotate as false and call righthad method |", function() {

		runs(function()
		{
			dispCurrentProcess("VT281-0910 | Set autoRotate as false and call righthad method");
			Rho.ScreenOrientation.setScreenOrientationEvent(screenorientation_callback);
			Rho.ScreenOrientation.autoRotate = false;
			Rho.ScreenOrientation.rightHanded();
		});

		waitsFor(function()
		{
			return callbackFired;
		}, 'The Screen Orientation should display', 10000);

		runs(function()
		{
			expect(orientationType).toEqual("righthanded");
		});
	});

	it("VT281-0912| Set autoRotate as true and call right hand method |", function() {

		runs(function()
		{
			dispCurrentProcess("VT281-0912| Set autoRotate as true and call right hand method");
			Rho.ScreenOrientation.setScreenOrientationEvent(screenorientation_callback);
			Rho.ScreenOrientation.rightHanded();
		});

		waitsFor(function()
		{
			return captured;
		}, 'The Screen Orientation should display', 10000);

		runs(function()
		{
			expect(callbackFired).toEqual("righthanded");
		});
	});

});
