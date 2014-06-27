var testResult = '';
var captured = false;

describe("Screen Orientation Test", function() {

    beforeEach(function() {
    	testResult = '';
		captured = false;
		Ruby.call('ScreenOrientationTest','auto_rotate');
	});


	/*  I moved this test to first because on start we do not have defined callback, after test with defined callback we still have defined callback !   So only on begin stage we do not have defined callback ! */
	it("VT200-0672 | Set autoRotate  without callback rotate the device manually |", function() {
		
		dispCurrentProcess("VT200-0672 | Set autoRotate  without callback rotate the device manualy<br>Rotate the device in all direction manually");

		waitsFor(function(){
			return captured;
		}, 'The Screen Orientation should display', 30000);

		runs(function(){
			expect(testResult).toEqual(true);
		});

	});

	it("VT281-0xxx| Set autoRotate as true and rotate the device in all direction |", function() {
		
		dispCurrentProcess("VT281-0xxx| Set autoRotate as true and rotate the device in all direction<br>Rotate the device in all direction mannually");
		
		runs(function(){
			Ruby.call('ScreenOrientationTest','set_event');
		});

		waitsFor(function(){
			return captured;
		}, 'The Screen Orientation should display', 30000);

		runs(function(){
			expect(testResult).toEqual(true);
		});
	});

});
