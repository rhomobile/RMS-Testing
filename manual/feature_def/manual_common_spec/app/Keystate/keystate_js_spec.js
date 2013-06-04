describe("Key State Test", function() {
	var displayflag = false;
	beforeEach(function() {
		/* ... Set up your object ... */
		displayflag = false;
	});

	afterEach(function() {
		/* ... Tear it down ... */
	});

	it("VT281-0850 | Keystate showStates without any property |", function() {
		runs(function()
		{
			Rho.Keystate.showStates();
			setTimeout(function() {
				displayflag = true;
			}, 10000);
		});

		waitsFor(function()
		{
			dispCurrentProcess("Press Shift, Alt, Control, Function, Caps, Num lock and Orange key");
			return displayflag;
		}, 'The KeyState indicator should display', 11000);

		runs(function()
		{
			var testPassed = confirm("Do you see KeyState indicator?");
			expect(testPassed).toEqual(true);
		});
	});

	it("VT281-0851 | Keystate showStates with right to 50 |", function() {
		runs(function()
		{

			Rho.Keystate.showStates([{"right":50}]);
			setTimeout(function() {
				displayflag = true;
			}, 10000);
		});

		waitsFor(function()
		{
			dispCurrentProcess("Press Shift, Alt, Control, Function, Caps, Num lock and Orange key");
			return displayflag;
		}, 'The KeyState indicator should display', 11000);

		runs(function()
		{
			var testPassed = confirm("Do you see KeyState indicator at right 50 ?");
			expect(testPassed).toEqual(true);
		});
	});

	it("VT281-0854 | Keystate showStates with left to 70 |", function() {
		runs(function()
		{

			Rho.Keystate.showStates({"left":70})
			setTimeout(function() {
				displayflag = true;
			}, 10000);
		});

		waitsFor(function()
		{
			dispCurrentProcess("Press Shift, Alt, Control, Function, Caps, Num lock and Orange key");
			return displayflag;
		}, 'The KeyState indicator should display', 11000);

		runs(function()
		{
			var testPassed = confirm("Do you see KeyState indicator at left 70 ?");
			expect(testPassed).toEqual(true);
		});
	});

	it("VT281-0857 | Keystate showStates with width to 100 |", function() {
		runs(function()
		{

			Rho.Keystate.showStates({"width":100})
			setTimeout(function() {
				displayflag = true;
			}, 10000);
		});

		waitsFor(function()
		{
			dispCurrentProcess("Press Shift, Alt, Control, Function, Caps, Num lock and Orange key");
			return displayflag;
		}, 'The KeyState indicator should display', 11000);

		runs(function()
		{
			var testPassed = confirm("Do you see KeyState indicator width 100 ?");
			expect(testPassed).toEqual(true);
		});
	});

	it("VT281-0860 | Keystate showStates with height to 100 |", function() {
		runs(function()
		{

			Rho.Keystate.showStates({"height":150})
			setTimeout(function() {
				displayflag = true;
			}, 10000);
		});

		waitsFor(function()
		{
			dispCurrentProcess("Press Shift, Alt, Control, Function, Caps, Num lock and Orange key");
			return displayflag;
		}, 'The KeyState indicator should display', 11000);

		runs(function()
		{
			var testPassed = confirm("Do you see KeyState indicator width 100 ?");
			expect(testPassed).toEqual(true);
		});
	});

	it("VT281-0863 | Keystate showStates with all properties |", function() {
		runs(function()
		{

			Rho.Keystate.showStates({'right':100,'left':150,'height':200,'width':250})
			setTimeout(function() {
				displayflag = true;
			}, 10000);
		});

		waitsFor(function()
		{
			dispCurrentProcess("right:100,left:150,Height:200,width:250 </br> Press Shift, Alt, Control, Function, Caps, Num lock and Orange key");
			return displayflag;
		}, 'The KeyState indicator should display', 11000);

		runs(function()
		{
			var testPassed = confirm("Do you see KeyState indicator at </br> right:100,left:150 with Height:200,width:250 ?");
			expect(testPassed).toEqual(true);
		});
	});

	it("VT281-0864 | KeyState hideStates |", function() {
		runs(function()
		{

			Rho.Keystate.showStates({'right':100,'left':150,'height':200,'width':250});
			Rho.Keystate.hideStates();
			setTimeout(function() {
				displayflag = true;
			}, 10000);
		});

		waitsFor(function()
		{
			dispCurrentProcess("right:100,left:150,Height:200,width:250 </br> Press Shift, Alt, Control, Function, Caps, Num lock and Orange key");
			return displayflag;
		}, 'The KeyState indicator should display', 11000);

		runs(function()
		{
			var testPassed = confirm("KeyState indicator should be hidden and should not be shown on page. <br/> Have you seen this behavior ?");
			expect(testPassed).toEqual(true);
		});
	});

	var m = 0;
	var test_key = [{'testCaseId':'VT281-0866','keyName':'SHIFT'},
					{'testCaseId':'VT281-0867','keyName':'CTRL'},
					{'testCaseId':'VT281-0868','keyName':'Function'},
					{'testCaseId':'VT281-0869','keyName':'Caps'},
					{'testCaseId':'VT281-0870','keyName':'Num lock'},
					{'testCaseId':'VT281-0871','keyName':'ALT'}]
	for (var i=0;i<test_key.length;i++){

		it(test_key[i]['testCaseId']+" | KeyState functionality Test with "+test_key[i]['keyName']+"Key | ", function() {

		runs(function()
		{

			Rho.Keystate.showStates();
			setTimeout(function() {
				displayflag = true;
			}, 10000);
		});

		waitsFor(function()
		{
			dispCurrentProcess("Press "+test_key['keyName']+ " key");
			return displayflag;
		}, 'The KeyState indicator should display', 11000);

		runs(function()
		{
			var testPassed = confirm("Do you see KeyState indicator for <br/>"+test_key['keyName']+" Key ?");
			expect(testPassed).toEqual(true);
		});

		});

	}

	it("VT281-0872 | KeyState functionality Test with Orange key once |", function() {
		runs(function()
		{

			Rho.Keystate.showStates();
			add('text');
			text.focus();
			setTimeout(function() {
				displayflag = true;
			}, 10000);
		});

		waitsFor(function()
		{
			dispCurrentProcess("Press Orange Key once. <br/> Press another key from the keyboard");
			return displayflag;
		}, 'The KeyState indicator should display', 11000);

		runs(function()
		{
			var testPassed = confirm("The data should be seen in the input box. <br/> Are you able to see ?");
			expect(testPassed).toEqual(true);
		});
	});

	it("VT281-0873 | KeyState functionality Test with Orange key Twice |", function() {
		runs(function()
		{

			Rho.Keystate.showStates();
			setTimeout(function() {
				displayflag = true;
			}, 10000);
		});

		waitsFor(function()
		{
			dispCurrentProcess("Press Orange Key Twice. <br/> Press another key from the keyboard");
			return displayflag;
		}, 'The KeyState indicator should display', 11000);

		runs(function()
		{
			var testPassed = confirm("The data should be seen in the input box. <br/> Are you able to see ?");
			expect(testPassed).toEqual(true);
		});
	});

	it("VT281-0874 | KeyState functionality Test with Blue key once |", function() {
		runs(function()
		{

			Rho.Keystate.showStates();
			setTimeout(function() {
				displayflag = true;
			}, 10000);
		});

		waitsFor(function()
		{
			dispCurrentProcess("Press Blue Key once. <br/> Press another key from the keyboard");
			return displayflag;
		}, 'The KeyState indicator should display', 11000);

		runs(function()
		{
			var testPassed = confirm("The data should be seen in the input box. <br/> Are you able to see ?");
			expect(testPassed).toEqual(true);
		});
	});

	it("VT281-0875 | KeyState functionality Test with Blue key Twice |", function() {
		runs(function()
		{

			Rho.Keystate.showStates();
			setTimeout(function() {
				displayflag = true;
			}, 10000);
		});

		waitsFor(function()
		{
			dispCurrentProcess("Press Blue Key Twice. <br/> Press another key from the keyboard");
			return displayflag;
		}, 'The KeyState indicator should display', 11000);

		runs(function()
		{
			var testPassed = confirm("The data should be seen in the input box. <br/> Are you able to see ?");
			expect(testPassed).toEqual(true);
		});
	});

});
