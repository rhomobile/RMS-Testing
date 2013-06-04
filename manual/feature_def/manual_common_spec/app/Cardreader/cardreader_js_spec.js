describe("Card Reader Test", function() {
	beforeEach(function() {
		/* ... Set up your object ... */
	});

	afterEach(function() {
		/* ... Tear it down ... */
	});

	it("should be able to retrieve all ringtones", function() {
		runs(function()
		{
			Rho.Mediaplayer.getAllRingtones(ringtoneCallback);
		});

		waitsFor(function()
		{
			return callbackCalled;
		}, 'Ringtone Callback should have responded', 5000);

		runs(function()
		{
			var testPassed = confirm("Do you see a list of ringtones?");
			expect(testPassed).toEqual(true);
		});
	});
	
});