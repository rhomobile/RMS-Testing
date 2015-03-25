var testResult = '';
var captured = false;

describe("Key State Test", function() {
	var displayflag = false;
	beforeEach(function() {
		/* ... Set up your object ... */
		displayflag = false;
		testResult = '';
		captured = false;
	});

	afterEach(function() {
		/* ... Tear it down ... */
	});

	it("VT200-0412 | KeyState showStates with all properties |", function() {
		runs(function()
		{
            dispCurrentProcess("VT200-0412 | KeyState showStates with all properties<br>right:100,top:150,<br>Height:200,width:250 Press Shift, Alt, Control, <br>Function, Caps, Num lock and Orange key");
			Rho.KeyState.showStates({'right':100,'top':150,'height':200,'width':250})
			setTimeout(function() {
				displayflag = true;
			}, 10000);
		});

		waitsFor(function()
		{
			return captured;
		}, 'The KeyState indicator should display', 30000);

		runs(function()
		{
			expect(testResult).toEqual(true);
		});
	});

	it("VT200-0523 | KeyState hideStates |", function() {
		runs(function()
		{
            dispCurrentProcess("VT200-0523 | KeyState hideStates<br>right:100,top:150,<br>Height:200,width:250 </br> Press Shift, Alt, Control, Function, Caps, Num lock and Orange key");
			Rho.KeyState.showStates({'right':100,'top':150,'height':200,'width':250});
			Rho.KeyState.hideStates();
			setTimeout(function() {
				displayflag = true;
			}, 10000);
		});

		waitsFor(function()
		{
			return captured;
		}, 'The KeyState indicator should display', 30000);

		runs(function()
		{
			expect(testResult).toEqual(true);
		});
	});
/*
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

			Rho.KeyState.showStates();
			setTimeout(function() {
				displayflag = true;
			}, 10000);
		});

		waitsFor(function()
		{
			dispCurrentProcess("Press "+test_key['keyName']+ " key");
			return captured;
		}, 'The KeyState indicator should display', 30000);

		runs(function()
		{
			expect(testResult).toEqual(true);
		});

		});

	}

	xit("VT281-0872 | KeyState functionality Test with Orange key once |", function() {
		runs(function()
		{
            dispCurrentProcess("VT281-0872 | KeyState functionality Test with Orange key once<br>Press Orange Key once. <br/> Press another key from the keyboard");
			Rho.KeyState.showStates();
			add('text');
			text.focus();
			setTimeout(function() {
				displayflag = true;
			}, 10000);
		});

		waitsFor(function()
		{
			return captured;
		}, 'The KeyState indicator should display', 30000);

		runs(function()
		{
			expect(testResult).toEqual(true);
		});
	});

	xit("VT281-0875 | KeyState functionality Test with Blue key Twice |", function() {
		runs(function()
		{
			dispCurrentProcess("VT281-0875 | KeyState functionality Test with Blue key Twice<br>Press Blue Key Twice. <br/> Press another key from the keyboard");
			Rho.KeyState.showStates();
			setTimeout(function() {
				displayflag = true;
			}, 10000);
		});

		waitsFor(function()
		{
			return captured;
		}, 'The KeyState indicator should display', 30000);

		runs(function()
		{
			expect(testResult).toEqual(true);
		});
	});
*/

});
