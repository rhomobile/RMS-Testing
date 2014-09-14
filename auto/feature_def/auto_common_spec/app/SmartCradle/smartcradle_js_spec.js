	describe("Smart Cradle API", function() {

		beforeEach(function() 
		{
			enableflag = false;
		});
				

		describe("Read / Write Properties of the Smart Cradle", function() {

			beforeEach(function() 
			{
			});

			it("is able to correctly set the rowId to a valid value (1) ", function() 
			{
				expect(true).toBe(false);
			});
			
			it("is able to correctly set the rowId to a valid value (5) ", function() 
			{
				expect(true).toBe(false);
			});

			it("is able to correctly set the rowId to an invalid value (-1) ", function() 
			{
				expect(true).toBe(false);
			});

			it("is able to correctly set the rowId to an invalid value (-100) ", function() 
			{
				expect(true).toBe(false);;
			});

			it("is able to correctly set the rowId to an invalid value (1000) ", function() 
			{
				expect(true).toBe(false);;
			});

			it("is able to correctly set the columnId to a valid value (1) ", function() 
			{
				expect(true).toBe(false);;
			});
			
			it("is able to correctly set the columnId to a valid value (5) ", function() 
			{
				expect(true).toBe(false);;
			});

			it("is able to correctly set the columnId to an invalid value (-1) ", function() 
			{
				expect(true).toBe(false);;
			});

			it("is able to correctly set the columnId to an invalid value (-100) ", function() 
			{
				expect(true).toBe(false);;
			});

			it("is able to correctly set the columnId to an invalid value (1000) ", function() 
			{
				expect(true).toBe(false);;
			});

			it("is able to correctly set the wallId to a valid value (1) ", function() 
			{
				expect(true).toBe(false);;
			});
			
			it("is able to correctly set the wallId to a valid value (5) ", function() 
			{
				expect(true).toBe(false);;
			});

			it("is able to correctly set the wallId to an invalid value (-1) ", function() 
			{
				expect(true).toBe(false);;
			});

			it("is able to correctly set the wallId to an invalid value (-100) ", function() 
			{
				expect(true).toBe(false);;
			});

			it("is able to correctly set the wallId to an invalid value (1000) ", function() 
			{
				expect(true).toBe(false);;
			});

			it("is able to correctly set the chargeState to a valid value ('fast') ", function() 
			{
				expect(true).toBe(false);;
			});
			
			it("is able to correctly set the chargeState to a valid value ('slow') ", function() 
			{
				expect(true).toBe(false);;
			});

			it("is able to correctly set the chargeState to an invalid value ('bunnies') ", function() 
			{
				expect(true).toBe(false);
			});

			it("is able to correctly set the chargeState to an invalid value ('fastslow') ", function() 
			{
				expect(true).toBe(false);
			});

			it("is able to correctly set the chargeState to an invalid value ('slowfast') ", function() 
			{
				expect(true).toBe(false);
			});
			
		});
				
		describe("Read Only Properties of the Smart Cradle", function() {

			beforeEach(function() 
			{
				enableflag = false;
			});
					
			it("is able to successfully retrieve the hardwareId", function() 
			{
				expect(true).toBe(false);;
			});

			it("is able to successfully retrieve the partNumber", function() 
			{
				expect(true).toBe(false);;
			});

			it("is able to successfully retrieve the serialNumber", function() 
			{
				expect(true).toBe(false);;
			});

			it("is able to successfully retrieve the mfgDate", function() 
			{
				//  mfgDate should be in the correct format
				expect(true).toBe(false);;
			});

			it("is able to successfully retrieve the driverVersion", function() 
			{
				expect(true).toBe(false);;
			});

			it("is able to successfully retrieve the cApiVersion", function() 
			{
				expect(true).toBe(false);;
			});

			it("is able to successfully retrieve the firmwareVersion", function() 
			{
				expect(true).toBe(false);;
			});

		});
				
		//  Note - Unlock can only be tested in a manual way
				
	});
