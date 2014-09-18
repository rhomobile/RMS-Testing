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
				Rho.SmartCradle.rowId = 1;
				var readValue = Rho.SmartCradle.rowId;
				expect(readValue).toBe(1);
				
				//  I NEED TO DO THIS
				//  ST might want to add alternative ways of validating this property here, e.g. setProperty, setProperties etc.
			});
			
			it("is able to correctly set the rowId to a valid value (5) ", function() 
			{
				Rho.SmartCradle.rowId = 5;
				var readValue = Rho.SmartCradle.rowId;
				expect(readValue).toBe(5);
			});

			it("is able to accept an unrealistically large rowId (10000) ", function() 
			{
				Rho.SmartCradle.rowId = 10000;
				var readValue = Rho.SmartCradle.rowId;
				expect(readValue).toBe(10000);
			});

			it("is able to fail gracefully when setting the rowId to an invalid value (-1) ", function() 
			{
				Rho.SmartCradle.rowId = 1;
				//  Expect this value to fail gracefully
				Rho.SmartCradle.rowId = -1;
				var readValue = Rho.SmartCradle.rowId;
				expect(readValue).toBe(1);
			});

			it("is able to fail gracefully when setting the rowId to an invalid value (-100) ", function() 
			{
				Rho.SmartCradle.rowId = 1;
				//  Expect this value to fail gracefully
				Rho.SmartCradle.rowId = -100;
				var readValue = Rho.SmartCradle.rowId;
				expect(readValue).toBe(1);
			});

			it("is able to correctly set the columnId to a valid value (1) ", function() 
			{
				Rho.SmartCradle.columnId = 1;
				var readValue = Rho.SmartCradle.columnId;
				expect(readValue).toBe(1);
			});
			
			it("is able to correctly set the columnId to a valid value (5) ", function() 
			{
				Rho.SmartCradle.columnId = 5;
				var readValue = Rho.SmartCradle.columnId;
				expect(readValue).toBe(5);
			});

			it("is able to accept an unrealistically large columnId (10000) ", function() 
			{
				Rho.SmartCradle.columnId = 10000;
				var readValue = Rho.SmartCradle.columnId;
				expect(readValue).toBe(10000);
			});

			it("is able to correctly set the columnId to an invalid value (-1) ", function() 
			{
				Rho.SmartCradle.columnId = 1;
				//  Expect this value to fail gracefully
				Rho.SmartCradle.columnId = -1;
				var readValue = Rho.SmartCradle.columnId;
				expect(readValue).toBe(1);
			});

			it("is able to correctly set the columnId to an invalid value (-100) ", function() 
			{
				Rho.SmartCradle.columnId = 1;
				//  Expect this value to fail gracefully
				Rho.SmartCradle.columnId = -100;
				var readValue = Rho.SmartCradle.columnId;
				expect(readValue).toBe(1);
			});

			it("is able to correctly set the wallId to a valid value (1) ", function() 
			{
				Rho.SmartCradle.wallId = 1;
				var readValue = Rho.SmartCradle.wallId;
				expect(readValue).toBe(1);
			});
			
			it("is able to correctly set the wallId to a valid value (5) ", function() 
			{
				Rho.SmartCradle.wallId = 5;
				var readValue = Rho.SmartCradle.wallId;
				expect(readValue).toBe(5);
			});

			it("is able to accept an unrealistically large wall ID (10000) ", function() 
			{
				Rho.SmartCradle.wallId = 10000;
				var readValue = Rho.SmartCradle.wallId;
				expect(readValue).toBe(10000);
			});

			it("is able to correctly set the wallId to an invalid value (-1) ", function() 
			{
				Rho.SmartCradle.wallId = 1;
				//  Expect this value to fail gracefully
				Rho.SmartCradle.wallId = -1;
				var readValue = Rho.SmartCradle.wallId;
				expect(readValue).toBe(1);
			});

			it("is able to correctly set the wallId to an invalid value (-100) ", function() 
			{
				Rho.SmartCradle.wallId = 1;
				//  Expect this value to fail gracefully
				Rho.SmartCradle.wallId = -100;
				var readValue = Rho.SmartCradle.wallId;
				expect(readValue).toBe(1);
			});

			it("is able to correctly set the chargeState to a valid value ('fast') ", function() 
			{
				Rho.SmartCradle.chargeState = "fast";
				var readValue = Rho.SmartCradle.chargeState;
				expect(readValue).toBe("fast");

				//  Now test this with different cases
				Rho.SmartCradle.chargeState = "FAST";
				var readValue = Rho.SmartCradle.chargeState;
				expect(readValue).toBe("fast");

				Rho.SmartCradle.chargeState = "fASt";
				var readValue = Rho.SmartCradle.chargeState;
				expect(readValue).toBe("fast");

				Rho.SmartCradle.chargeState = "FasT";
				var readValue = Rho.SmartCradle.chargeState;
				expect(readValue).toBe("fast");
			});
			
			it("is able to correctly set the chargeState to a valid value ('slow') ", function() 
			{
				Rho.SmartCradle.chargeState = "slow";
				var readValue = Rho.SmartCradle.chargeState;
				expect(readValue).toBe("slow");

				//  Now test this with different cases
				Rho.SmartCradle.chargeState = "SLOW";
				var readValue = Rho.SmartCradle.chargeState;
				expect(readValue).toBe("slow");

				Rho.SmartCradle.chargeState = "sLOw";
				var readValue = Rho.SmartCradle.chargeState;
				expect(readValue).toBe("slow");

				Rho.SmartCradle.chargeState = "SloW";
				var readValue = Rho.SmartCradle.chargeState;
				expect(readValue).toBe("slow");
			});

			it("is able to correctly set the chargeState to an invalid value ('bunnies') ", function() 
			{
				Rho.SmartCradle.chargeState = "slow";
				//  Expect this to fail gracefully
				Rho.SmartCradle.chargeState = "bunnies";
				var readValue = Rho.SmartCradle.chargeState;
				expect(readValue).toBe("slow");
			});

			it("is able to correctly set the chargeState to an invalid value ('fastslow') ", function() 
			{
				Rho.SmartCradle.chargeState = "slow";
				//  Expect this to fail gracefully
				Rho.SmartCradle.chargeState = "fastslow";
				var readValue = Rho.SmartCradle.chargeState;
				expect(readValue).toBe("slow");
			});

			it("is able to correctly set the chargeState to an invalid value ('slowfast') ", function() 
			{
				Rho.SmartCradle.chargeState = "slow";
				//  Expect this to fail gracefully
				Rho.SmartCradle.chargeState = "slowfast";
				var readValue = Rho.SmartCradle.chargeState;
				expect(readValue).toBe("slow");
			});
			
		});
		
				
		describe("Read Only Properties of the Smart Cradle", function() {

			beforeEach(function() 
			{

			});
					
			it("is able to successfully retrieve the hardwareId", function() 
			{
				//  ALSO TEST WE CAN'T SET IT!!!
				var readValue = Rho.SmartCradle.hardwareId;
				console.log("Read property Hardware ID: " + readValue);
				expect(true).toBe(false);;
			});

			it("is able to successfully retrieve the partNumber", function() 
			{
				var readValue = Rho.SmartCradle.partNumber;
				console.log("Read property Part Number: " + readValue);
				expect(true).toBe(false);;
			});

			it("is able to successfully retrieve the serialNumber", function() 
			{
				var readValue = Rho.SmartCradle.serialNumber;
				console.log("Read property Serial Number: " + readValue);
				expect(true).toBe(false);;
			});

			it("is able to successfully retrieve the mfgDate", function() 
			{
				//  mfgDate should be in the correct format
				var readValue = Rho.SmartCradle.mfgDate;
				console.log("Read property MFG Date (DD-MM-YY): " + readValue);
				expect(true).toBe(false);;
			});

			it("is able to successfully retrieve the driverVersion", function() 
			{
				var readValue = Rho.SmartCradle.driverVersion;
				console.log("Read property Driver Version: " + readValue);
				//  Expect the result to be in the form m.n
				var regex = /[0-9]+\.[0-9]+/
				var matched = regex.exec(readValue);
				expect(matched).not.toBe(null);
			});

			it("is able to successfully retrieve the cApiVersion", function() 
			{
				var readValue = Rho.SmartCradle.cApiVersion;
				console.log("Read property C API: " + readValue);
				//  Expect the result to be in the form m.n
				var regex = /[0-9]+\.[0-9]+/
				var matched = regex.exec(readValue);
				expect(matched).not.toBe(null);
			});

			it("is able to successfully retrieve the firmwareVersion", function() 
			{
				var readValue = Rho.SmartCradle.firmwareVersion;
				console.log("Read property Firmware Version: " + readValue);
				//  Expect the result to be in the form m.n
				var regex = /[0-9]+\.[0-9]+/
				var matched = regex.exec(readValue);
				expect(matched).not.toBe(null);
			});

		});
				
		//  Note - Unlock can only be tested in a manual way
				
	});
