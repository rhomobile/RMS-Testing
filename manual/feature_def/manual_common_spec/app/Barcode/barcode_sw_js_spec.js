describe("Barcode Test", function() {
	
	var enableFlag = false;
	var decodeFlag = false;
	//var enumData = '';
	var decodedata ='';
	var callbackfired = false;

	var callbackenable = function (data){
			decodedata = data;
			displayResult("Data:- ",JSON.stringify(decodedata));
			callbackfired = true;			
		}

	var callbacktake = function (data){
			takedata = data;
			displayResult("take Data:- ",JSON.stringify(takedata));
		}

	enumData = Rho.Barcode.enumerate();

   for (var j = 0;j<enumData.length;j++){

   (function(objSCN){ 

   	var scnid = objSCN.getProperty('ID');

	beforeEach(function() {
		enableFlag = false;
		decodeFlag = false;
		decodedata ='';
		callbackfired = false;
		/* ... Set up your object ... */
	});

	afterEach(function() {
		/* ... Tear it down ... */
		//objSCN.disable();
	});


	it("VT282-1778 | call setDefault with SCN and take |"+ scnid, function() {

		runs(function()
		{
			Rho.Barcode.setDefaultID( objSCN.getId() );
			Rho.Barcode.take({},callbacktake);
			setTimeout(function() {
				enableFlag = true;
			}, 8000);
		});

		runs(function()
		{		
			setTimeout(function() {
				decodeFlag = true;
			}, 15000);
		});

		waitsFor(function()
		{
			dispCurrentProcess("scan any barcode <br/> check for retrurn value with take");
			return decodeFlag;
		}, '15sec Wait to Scan the Barcode', 16000);

		runs(function()
		{
			var testPassed = confirm("Do you see Correct Behavior?");
			expect(testPassed).toEqual(true);
		});

	});




	it("VT282-1790 | take with callback as function |"+ scnid, function() {
		
		runs(function()
		{
			objSCN.take({},callbacktake);
			setTimeout(function() {
				enableFlag = true;
			}, 8000);
		});

		runs(function()
		{		
			setTimeout(function() {
				decodeFlag = true;
			}, 15000);
		});

		waitsFor(function()
		{
			dispCurrentProcess("scan any barcode <br/> check for retrurn value with take");
			return decodeFlag;
		}, '15sec Wait to Scan the Barcode', 16000);

		runs(function()
		{
			var testPassed = confirm("Do you see Correct Behavior?");
			expect(testPassed).toEqual(true);
		});
	});




	it("VT282-1797 | Take with callback as anonymous function |"+ scnid, function() {
		
		runs(function()
		{
			objSCN.take({},function(data){displayResult("take Data:- ",JSON.stringify(data));});
			setTimeout(function() {
				enableFlag = true;
			}, 8000);
		});

		runs(function()
		{		
			setTimeout(function() {
				decodeFlag = true;
			}, 15000);
		});

		waitsFor(function()
		{
			dispCurrentProcess("Scan any Barcode <br/> Check for the retruned array of take");
			return decodeFlag;
		}, '15sec Wait to Scan the Barcode', 16000);

		runs(function()
		{
			var testPassed = confirm("Do you see Correct Behavior?");
			expect(testPassed).toEqual(true);
		});

	});


})(enumData[j]);

}

});	