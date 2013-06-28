describe("ScreenOrientation Ruby API Test", function() {
	
	beforeEach(function() {
		document.getElementById('output').innerHTML = "";
	});
	
	afterEach(function() 
	{	
		resetCallback();
		setScreenOrientation(true);
	});		
	
	it("should enable automatic screen orientation", function() {
		expect(enable()).toBe(true);			
	});
	
	it("should disable automatic screen orientation", function() {			
		expect(disable()).toBe(false);			
	});
	
	it("should set current device orientation to upsidedown without callback", function() {			
		runs(function() {
			upsideDown();
		}, "Set the current orientation to upside down...");
	
		waitsFor(function() {
        	return document.getElementById('output').innerHTML == "";
    	}, "Something wrong happened", 3000);		
	});
	
	it("should set current device orientation to righthanded without callback", function() {			
		rightHanded();			
	});
	
	it("should set current device orientation to lefthanded without callback", function() {
		leftHanded();	
	});
	
	it("should set current device orientation to landscape without callback", function() {			
		normal();			
	});
	
	it("should set current device orientation to upsidedown and call a callback function", function()
	{			
		runs(function() {
			setCallback();
			upsideDown();
		}, "Set the current orientation to upsidedown...this should trigger a callback");
	
		waitsFor(function() {
        	return document.getElementById('output').innerHTML == "upsideDown"
    	}, document.getElementById('output').innerHTML + " is not the expected value upsidedown", 3000);
	});
	
	it("should set current device orientation to lefthanded and call a callback function", function()
	{			
		runs(function() {
			setCallback();
			leftHanded();
		}, "Set the current orientation to lefthanded...this should trigger a callback");
	
		waitsFor(function() {
        	return document.getElementById('output').innerHTML == "leftHanded"
    	}, document.getElementById('output').innerHTML + " is not the expected value lefthanded", 3000);
	});
	
	it("should set current device orientation to righthanded and call a callback function", function()
	{			
		runs(function() {
			setCallback();
			rightHanded();
		}, "Set the current orientation to righthanded...this should trigger a callback");
	
		waitsFor(function() {
        	return document.getElementById('output').innerHTML == "rightHanded"
    	}, document.getElementById('output').innerHTML + " is not the expected value righthanded", 3000);
	});
	
	it("should set current device orientation to normal and call a callback function", function()
	{			
		runs(function() {
			setCallback();
			normal();
		}, "Set the current orientation to normal...this should trigger a callback");
	
		waitsFor(function() {
        	return document.getElementById('output').innerHTML == "normal"
    	}, document.getElementById('output').innerHTML + " is not the expected value normal", 3000);
	});
});

