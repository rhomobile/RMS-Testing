describe("Card Reader Test", function() {
	
	var openFlag = false;
	var swipeFlag = false;

	beforeEach(function() {
		openFlag = false;
		swipeFlag = false;
		/* ... Set up your object ... */
	});

	afterEach(function() {
		/* ... Tear it down ... */
	});

	it("VT286-0097 | Swipe a Card after clearAllproperties |", function() {
		runs(function()
		{
			Rho.CardReader.open();
			setTimeout(function() {
				openFlag = true;
			}, 5000);
		});

		waitsFor(function()
		{
			dispCurrentProcess("Opening CardReader");
			return openFlag;
		}, '5sec Wait to open the CardReader', 6000);

		runs(function()
		{
			Rho.CardReader.autoEnter=true;
			Rho.CardReader.clearAllProperties();
			setTimeout(function() {
				swipeFlag = true;
			}, 15000);
		});

		waitsFor(function()
		{
			dispCurrentProcess("Swipe The Card <br/> Check The Behavior");
			return swipeFlag;
		}, '5sec Wait to open the CardReader', 16000);

		runs(function()
		{
			var testPassed = confirm("Do you see Correct Behavior?");
			expect(testPassed).toEqual(true);
		});

	});


	it("VT286-0110 | async callback |", function() {

		var callbackCardReader = function (data){
			alert();
			dispCurrentProcess($.toJSON(data));
		}

		runs(function()
		{
			Rho.CardReader.open({},callbackCardReader);
			setTimeout(function() {
				openFlag = true;
			}, 5000);
		});

		waitsFor(function()
		{
			dispCurrentProcess("Opening CardReader to Check async callback");
			return openFlag;
		}, '5sec Wait to open the CardReader', 6000);

		runs(function()
		{
			Rho.CardReader.autoEnter=true;
			Rho.CardReader.clearAllProperties();
			setTimeout(function() {
				swipeFlag = true;
			}, 15000);
		});

		waitsFor(function()
		{
			dispCurrentProcess("Swipe The Card <br/> Check The Behavior");
			return swipeFlag;
		}, '5sec Wait to open the CardReader', 16000);

		runs(function()
		{
			var testPassed = confirm("Do you see Correct Behavior?");
			expect(testPassed).toEqual(true);
		});

	});

	it("VT286-0110 | async anonymous callback |", function() {

		runs(function()
		{
			Rho.CardReader.open({},function(data){dispCurrentProcess($.toJSON(data));});
			setTimeout(function() {
				openFlag = true;
			}, 5000);
		});

		waitsFor(function()
		{
			dispCurrentProcess("Opening CardReader to Check async anonymous callback");
			return openFlag;
		}, '5sec Wait to open the CardReader', 6000);

		runs(function()
		{
			Rho.CardReader.autoEnter=true;
			Rho.CardReader.clearAllProperties();
			setTimeout(function() {
				swipeFlag = true;
			}, 15000);
		});

		waitsFor(function()
		{
			dispCurrentProcess("Swipe The Card <br/> Check The Behavior");
			return swipeFlag;
		}, '5sec Wait to open the CardReader', 16000);

		runs(function()
		{
			var testPassed = confirm("Do you see Correct Behavior?");
			expect(testPassed).toEqual(true);
		});

	});

});