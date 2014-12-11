var testResult = '';
var captured = false;


describe("Screen Orientation Test", function() {

	var displayflag = false;
	var orientationType = '';
	var callbackFired = false;

    beforeEach(function() {
		/* ... Set up your object ... */
		EB.ScreenOrientation.autoRotate = true;
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
	it("VT200-0672 | Set autoRotate  without callback rotate the device manualy |", function() {

		runs(function()
		{
            dispCurrentProcess("VT200-0672 | Set autoRotate  without callback rotate the device manualy<br>Rotate the device in all direction manually");
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

/*
	it("VT281-0911| Set autoRotate as false and try to rotate the device screen manually in all direction |", function() {

		runs(function()
		{
			dispCurrentProcess("VT281-0911| Set autoRotate as false and try to rotate the device screen manually in all direction<br>but its should not rotate in any direction");
			EB.ScreenOrientation.setScreenOrientationEvent(screenorientation_callback);
			EB.ScreenOrientation.autoRotate = false;
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
*/
	it("VT281-0xxx| Set autoRotate as true and rotate the device in all direction |", function() {

		runs(function()
		{
		    dispCurrentProcess("VT281-0xxx| Set autoRotate as true and rotate the device in all direction<br>Rotate the device in all direction mannually");
			EB.ScreenOrientation.setScreenOrientationEvent(screenorientation_callback);
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
