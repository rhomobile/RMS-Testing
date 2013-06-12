describe("Video Capture Test", function() {
	
	var openFlag = false;
	
	beforeEach(function() {
		openFlag = false;
		/* ... Set up your object ... */
	});

	afterEach(function() {
		/* ... Tear it down ... */
	});

	it("VT286-0110 | async callback |", function() {

		var callbackVideoCapture = function (data){
			alert();
			dispCurrentProcess($.toJSON(data));
		}


		
		runs(function()
		{
			Rho.Videocapture.start();
			setTimeout(function() {
				openFlag = true;
			}, 10000);
		});



		runs(function()
		{
			var testPassed = confirm("Do you see Correct Behavior?");
			expect(testPassed).toEqual(true);
		});

	});

	

});