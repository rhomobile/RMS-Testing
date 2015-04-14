describe("Smart Cradle API", function() {

		beforeEach(function() 
		{
			enableflag = false;
		});
				
		
		describe("Read / Write Properties of the Smart Cradle (via Accessors)", function() {

			beforeEach(function() 
			{
			});

			var deviceType = getDeviceType();
			var isSupported = false;
			isSupported = (deviceType.toLowerCase().indexOf("mc18") != -1);			
			
			it("is able to correctly set the rowId to a valid value (1) ", function() 
			{
				if (!isSupported) return;

				Rho.SmartCradle.rowId = 1;
				var readValue = Rho.SmartCradle.rowId;
				expect(readValue).toBe(1);
			});
			
			it("is able to correctly set the rowId to a valid value (5) ", function() 
			{
				if (!isSupported) return;

				Rho.SmartCradle.rowId = 5;
				var readValue = Rho.SmartCradle.rowId;
				expect(readValue).toBe(5);
			});

			it("is able to accept an unrealistically large rowId (10000) ", function() 
			{
				if (!isSupported) return;

				Rho.SmartCradle.rowId = 10000;
				var readValue = Rho.SmartCradle.rowId;
				expect(readValue).toBe(10000);
			});

			it("is able to fail gracefully when setting the rowId to an invalid value (-1) ", function() 
			{
				if (!isSupported) return;

				Rho.SmartCradle.rowId = 1;
				//  Expect this value to fail gracefully
				Rho.SmartCradle.rowId = -1;
				var readValue = Rho.SmartCradle.rowId;
				expect(readValue).toBe(1);
			});

			it("is able to fail gracefully when setting the rowId to an invalid value (-100) ", function() 
			{
				if (!isSupported) return;

				Rho.SmartCradle.rowId = 1;
				//  Expect this value to fail gracefully
				Rho.SmartCradle.rowId = -100;
				var readValue = Rho.SmartCradle.rowId;
				expect(readValue).toBe(1);
			});

			it("is able to correctly set the columnId to a valid value (1) ", function() 
			{
				if (!isSupported) return;

				Rho.SmartCradle.columnId = 1;
				var readValue = Rho.SmartCradle.columnId;
				expect(readValue).toBe(1);
			});
			
			it("is able to correctly set the columnId to a valid value (5) ", function() 
			{
				if (!isSupported) return;

				Rho.SmartCradle.columnId = 5;
				var readValue = Rho.SmartCradle.columnId;
				expect(readValue).toBe(5);
			});

			it("is able to accept an unrealistically large columnId (10000) ", function() 
			{
				if (!isSupported) return;

				Rho.SmartCradle.columnId = 10000;
				var readValue = Rho.SmartCradle.columnId;
				expect(readValue).toBe(10000);
			});

			it("is able to correctly set the columnId to an invalid value (-1) ", function() 
			{
				if (!isSupported) return;

				Rho.SmartCradle.columnId = 1;
				//  Expect this value to fail gracefully
				Rho.SmartCradle.columnId = -1;
				var readValue = Rho.SmartCradle.columnId;
				expect(readValue).toBe(1);
			});

			it("is able to correctly set the columnId to an invalid value (-100) ", function() 
			{
				if (!isSupported) return;

				Rho.SmartCradle.columnId = 1;
				//  Expect this value to fail gracefully
				Rho.SmartCradle.columnId = -100;
				var readValue = Rho.SmartCradle.columnId;
				expect(readValue).toBe(1);
			});

			it("is able to correctly set the wallId to a valid value (1) ", function() 
			{
				if (!isSupported) return;

				Rho.SmartCradle.wallId = 1;
				var readValue = Rho.SmartCradle.wallId;
				expect(readValue).toBe(1);
			});
			
			it("is able to correctly set the wallId to a valid value (5) ", function() 
			{
				if (!isSupported) return;

				Rho.SmartCradle.wallId = 5;
				var readValue = Rho.SmartCradle.wallId;
				expect(readValue).toBe(5);
			});

			it("is able to accept an unrealistically large wall ID (10000) ", function() 
			{
				if (!isSupported) return;

				Rho.SmartCradle.wallId = 10000;
				var readValue = Rho.SmartCradle.wallId;
				expect(readValue).toBe(10000);
			});

			it("is able to correctly set the wallId to an invalid value (-1) ", function() 
			{
				if (!isSupported) return;

				Rho.SmartCradle.wallId = 1;
				//  Expect this value to fail gracefully
				Rho.SmartCradle.wallId = -1;
				var readValue = Rho.SmartCradle.wallId;
				expect(readValue).toBe(1);
			});

			it("is able to correctly set the wallId to an invalid value (-100) ", function() 
			{
				if (!isSupported) return;

				Rho.SmartCradle.wallId = 1;
				//  Expect this value to fail gracefully
				Rho.SmartCradle.wallId = -100;
				var readValue = Rho.SmartCradle.wallId;
				expect(readValue).toBe(1);
			});

			it("is able to correctly set the chargeState to a valid value ('fast') ", function() 
			{
				if (!isSupported) return;

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
				if (!isSupported) return;

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
				if (!isSupported) return;

				Rho.SmartCradle.chargeState = "slow";
				//  Expect this to fail gracefully
				Rho.SmartCradle.chargeState = "bunnies";
				var readValue = Rho.SmartCradle.chargeState;
				expect(readValue).toBe("slow");
			});

			it("is able to correctly set the chargeState to an invalid value ('fastslow') ", function() 
			{
				if (!isSupported) return;

				Rho.SmartCradle.chargeState = "slow";
				//  Expect this to fail gracefully
				Rho.SmartCradle.chargeState = "fastslow";
				var readValue = Rho.SmartCradle.chargeState;
				expect(readValue).toBe("slow");
			});

			it("is able to correctly set the chargeState to an invalid value ('slowfast') ", function() 
			{
				if (!isSupported) return;

				Rho.SmartCradle.chargeState = "slow";
				//  Expect this to fail gracefully
				Rho.SmartCradle.chargeState = "slowfast";
				var readValue = Rho.SmartCradle.chargeState;
				expect(readValue).toBe("slow");
			});
			
		});
		
		describe("Read / Write Properties of the Smart Cradle (via Get / Set Property)", function() {

			beforeEach(function() 
			{
			});

			var deviceType = getDeviceType();
			var isSupported = false;
			isSupported = (deviceType.toLowerCase().indexOf("mc18") != -1);			

			
			it("is able to correctly set the rowId to a valid value (1) ", function() 
			{
				if (!isSupported) return;

				Rho.SmartCradle.setProperty("rowID", "1");
				var readValue = Rho.SmartCradle.getProperty("rowID");
				expect(readValue).toBe("1");
			});
			
			it("is able to correctly set the rowId to a valid value (5) ", function() 
			{
				if (!isSupported) return;

				Rho.SmartCradle.setProperty("rowID", "5");
				var readValue = Rho.SmartCradle.getProperty("rowID");
				expect(readValue).toBe("5");
			});

			it("is able to accept an unrealistically large rowId (10000) ", function() 
			{
				if (!isSupported) return;

				Rho.SmartCradle.setProperty("RowID", "10000");
				var readValue = Rho.SmartCradle.getProperty("rowID");
				expect(readValue).toBe("10000");
			});

			it("is able to fail gracefully when setting the rowId to an invalid value (-1) ", function() 
			{
				if (!isSupported) return;

				Rho.SmartCradle.setProperty("rowID", "1");
				//  Expect this value to fail gracefully
				Rho.SmartCradle.setProperty("rowID", "-1");
				var readValue = Rho.SmartCradle.getProperty("RowID");
				expect(readValue).toBe("1");
			});

			it("is able to fail gracefully when setting the rowId to an invalid value (-100) ", function() 
			{
				if (!isSupported) return;

				Rho.SmartCradle.setProperty("rowID", "1");
				//  Expect this value to fail gracefully
				Rho.SmartCradle.setProperty("rowID", "-100");
				var readValue = Rho.SmartCradle.getProperty("RowID");
				expect(readValue).toBe("1");
			});

			it("is able to correctly set the columnId to a valid value (1) ", function() 
			{
				if (!isSupported) return;

				Rho.SmartCradle.setProperty("columnID", "1");
				var readValue = Rho.SmartCradle.getProperty("columnID");
				expect(readValue).toBe("1");
			});
			
			it("is able to correctly set the columnID to a valid value (5) ", function() 
			{
				if (!isSupported) return;

				Rho.SmartCradle.setProperty("columnID", "5");
				var readValue = Rho.SmartCradle.getProperty("columnID");
				expect(readValue).toBe("5");
			});

			it("is able to accept an unrealistically large columnID (10000) ", function() 
			{
				if (!isSupported) return;

				Rho.SmartCradle.setProperty("columnID", "10000");
				var readValue = Rho.SmartCradle.getProperty("columnID");
				expect(readValue).toBe("10000");
			});

			it("is able to fail gracefully when setting the columnID to an invalid value (-1) ", function() 
			{
				if (!isSupported) return;

				Rho.SmartCradle.setProperty("columnID", "1");
				//  Expect this value to fail gracefully
				Rho.SmartCradle.setProperty("columnID", "-1");
				var readValue = Rho.SmartCradle.getProperty("columnID");
				expect(readValue).toBe("1");
			});

			it("is able to fail gracefully when setting the columnID to an invalid value (-100) ", function() 
			{
				if (!isSupported) return;

				Rho.SmartCradle.setProperty("columnID", "1");
				//  Expect this value to fail gracefully
				Rho.SmartCradle.setProperty("columnID", "-100");
				var readValue = Rho.SmartCradle.getProperty("columnID");
				expect(readValue).toBe("1");
			});

			it("is able to correctly set the wallID to a valid value (1) ", function() 
			{
				if (!isSupported) return;

				Rho.SmartCradle.setProperty("wallID", "1");
				var readValue = Rho.SmartCradle.getProperty("wallID");
				expect(readValue).toBe("1");
			});
			
			it("is able to correctly set the wallID to a valid value (5) ", function() 
			{
				if (!isSupported) return;

				Rho.SmartCradle.setProperty("wallID", "5");
				var readValue = Rho.SmartCradle.getProperty("wallID");
				expect(readValue).toBe("5");
			});

			it("is able to accept an unrealistically large wallID (10000) ", function() 
			{
				if (!isSupported) return;

				Rho.SmartCradle.setProperty("wallID", "10000");
				var readValue = Rho.SmartCradle.getProperty("wallID");
				expect(readValue).toBe("10000");
			});

			it("is able to fail gracefully when setting the wallID to an invalid value (-1) ", function() 
			{
				if (!isSupported) return;

				Rho.SmartCradle.setProperty("wallID", "1");
				//  Expect this value to fail gracefully
				Rho.SmartCradle.setProperty("wallID", "-1");
				var readValue = Rho.SmartCradle.getProperty("wallID");
				expect(readValue).toBe("1");
			});

			it("is able to fail gracefully when setting the wallID to an invalid value (-100) ", function() 
			{
				if (!isSupported) return;

				Rho.SmartCradle.setProperty("wallID", "1");
				//  Expect this value to fail gracefully
				Rho.SmartCradle.setProperty("wallID", "-100");
				var readValue = Rho.SmartCradle.getProperty("wallID");
				expect(readValue).toBe("1");
			});

			it("is able to correctly set the chargeState to a valid value ('fast') ", function() 
			{
				if (!isSupported) return;

				Rho.SmartCradle.setProperty("chargeState", "fast");
				var readValue = Rho.SmartCradle.getProperty("chargeState");
				expect(readValue).toBe("fast");

				//  Now test this with different cases
				Rho.SmartCradle.setProperty("chargeState", "FAST");
				var readValue = Rho.SmartCradle.getProperty("chargeState");
				expect(readValue).toBe("fast");

				Rho.SmartCradle.setProperty("chargeState", "fASt");
				var readValue = Rho.SmartCradle.getProperty("chargeState");
				expect(readValue).toBe("fast");

				Rho.SmartCradle.setProperty("chargeState", "FasT");
				var readValue = Rho.SmartCradle.getProperty("ChargeState");
				expect(readValue).toBe("fast");
			});
			
			it("is able to correctly set the chargeState to a valid value ('slow') ", function() 
			{
				if (!isSupported) return;

				Rho.SmartCradle.setProperty("chargeState", "slow");
				var readValue = Rho.SmartCradle.getProperty("chargeState");
				expect(readValue).toBe("slow");

				//  Now test this with different cases
				Rho.SmartCradle.setProperty("chargeState", "SLOW");
				var readValue = Rho.SmartCradle.getProperty("chargeState");
				expect(readValue).toBe("slow");

				Rho.SmartCradle.setProperty("chargeState", "sLOw");
				var readValue = Rho.SmartCradle.getProperty("chargeState");
				expect(readValue).toBe("slow");

				Rho.SmartCradle.setProperty("chargeState", "SloW");
				var readValue = Rho.SmartCradle.getProperty("ChargeState");
				expect(readValue).toBe("slow");
			});

			it("is able to correctly set the chargeState to an invalid value ('bunnies') ", function() 
			{
				if (!isSupported) return;

				Rho.SmartCradle.setProperty("chargeState", "slow");
				//  Expect this to fail gracefully
				Rho.SmartCradle.setProperty("chargeState", "bunnies");
				var readValue = Rho.SmartCradle.getProperty("chargeState");
				expect(readValue).toBe("slow");
			});

			it("is able to correctly set the chargeState to an invalid value ('fastslow') ", function() 
			{
				if (!isSupported) return;

				Rho.SmartCradle.setProperty("chargeState", "slow");
				//  Expect this to fail gracefully
				Rho.SmartCradle.setProperty("chargeState", "fastslow");
				var readValue = Rho.SmartCradle.getProperty("chargeState");
				expect(readValue).toBe("slow");
			});

			it("is able to correctly set the chargeState to an invalid value ('slowfast') ", function() 
			{
				if (!isSupported) return;

				Rho.SmartCradle.setProperty("chargeState", "slow");
				//  Expect this to fail gracefully
				Rho.SmartCradle.setProperty("chargeState", "slowfast");
				var readValue = Rho.SmartCradle.getProperty("chargeState");
				expect(readValue).toBe("slow");
			});
			
		});			

		if(Rho.System.platform == "WINDOWS"){
		describe("Read Only Properties of the Smart Cradle (Via Accessors)", function() {

			beforeEach(function() 
			{

			});
			
			var deviceType = getDeviceType();
			var isSupported = false;
			isSupported = (deviceType.toLowerCase().indexOf("mc18") != -1);			
					
			it("is able to successfully retrieve the hardwareId", function() 
			{
				if (!isSupported) return;

				var readValue = Rho.SmartCradle.hardwareId;
				console.log("Read property Hardware ID: (" + readValue + ")");
				expect(readValue.toString().length).toBe(1);
			});

			it("is able to successfully retrieve the partNumber", function() 
			{
				if (!isSupported) return;

				var readValue = Rho.SmartCradle.partNumber;
				console.log("Read property Part Number: " + readValue);
				var partNumberRegex = /CRD-MC18-.*/
				var partNumberMatched = partNumberRegex.exec(readValue);
				expect(partNumberMatched).not.toBe(null);
				expect(readValue.length).toBe(18);
			});

			it("is able to successfully retrieve the serialNumber", function() 
			{
				if (!isSupported) return;

				var readValue = Rho.SmartCradle.serialNumber;
				console.log("Read property Serial Number: " + readValue);
				expect(readValue.length).toBe(15);
			});

			it("is able to successfully retrieve the mfgDate", function() 
			{
				if (!isSupported) return;

				//  mfgDate should be in the correct format
				var readValue = Rho.SmartCradle.mfgDate;
				console.log("Read property MFG Date (DD-MM-YY): " + readValue);
				var mfgDateRegex = /[0-9]+-[0-9]+-[0-9]+/
				var mfgDateMatched = mfgDateRegex.exec(readValue);
				expect(mfgDateMatched).not.toBe(null);
			});

			it("is able to successfully retrieve the driverVersion", function() 
			{
				if (!isSupported) return;

				var readValue = Rho.SmartCradle.driverVersion;
				console.log("Read property Driver Version: " + readValue);
				//  Expect the result to be in the form m.n
				var regex = /[0-9]+\.[0-9]+/
				var matched = regex.exec(readValue);
				expect(matched).not.toBe(null);
			});

			it("is able to successfully retrieve the cApiVersion", function() 
			{
				if (!isSupported) return;

				var readValue = Rho.SmartCradle.cApiVersion;
				console.log("Read property C API: " + readValue);
				//  Expect the result to be in the form m.n
				var regex = /[0-9]+\.[0-9]+/
				var matched = regex.exec(readValue);
				expect(matched).not.toBe(null);
			});

			it("is able to successfully retrieve the firmwareVersion", function() 
			{
				if (!isSupported) return;

				var readValue = Rho.SmartCradle.firmwareVersion;
				console.log("Read property Firmware Version: " + readValue);
				//  Expect the result to be in the form m.n
				var regex = /[0-9]+\.[0-9]+/
				var matched = regex.exec(readValue);
				expect(matched).not.toBe(null);
			});

		});
}

if(Rho.System.platform == "ANDROID"){
		describe("Read Only Properties of the Smart Cradle (Via Accessors)", function() {

			beforeEach(function() 
			{

			});
			
			var deviceType = getDeviceType();
			var isSupported = false;
			isSupported = (deviceType.toLowerCase().indexOf("mc18") != -1);			
					
			it("is able to successfully retrieve the hardwareId", function() 
			{
				if (!isSupported) return;

				var readValue = Rho.SmartCradle.hardwareId;
				console.log("Read property Hardware ID: (" + readValue + ")");
				expect(readValue.toString().length).toBe(1);
			});

			it("is able to successfully retrieve the partNumber", function() 
			{
				if (!isSupported) return;

				var readValue = Rho.SmartCradle.partNumber;
				console.log("Read property Part Number: " + readValue);
				var partNumberRegex = /CRD-MC18-.*/
				var partNumberMatched = partNumberRegex.exec(readValue);
				expect(partNumberMatched).not.toBe(null);
				expect(readValue.length).toBe(18);
			});

			it("is able to successfully retrieve the serialNumber", function() 
			{
				if (!isSupported) return;

				var readValue = Rho.SmartCradle.serialNumber;
				console.log("Read property Serial Number: " + readValue);
				expect(readValue.length).toBe(15);
			});

			
		});
}
if(Rho.System.platform == "WINDOWS"){
		describe("Read Only Properties of the Smart Cradle (Via Get / Set Property)", function() {

			beforeEach(function() 
			{

			});
					
			var deviceType = getDeviceType();
			var isSupported = false;
			isSupported = (deviceType.toLowerCase().indexOf("mc18") != -1);			

			it("is able to successfully retrieve the hardwareId", function() 
			{
				if (!isSupported) return;

				var readValue = Rho.SmartCradle.getProperty("hardwareId");
				console.log("Read property Hardware ID: " + readValue);
				expect(readValue.length).toBe(1);
			});

			it("is able to successfully retrieve the partNumber", function() 
			{
				if (!isSupported) return;

				var readValue = Rho.SmartCradle.getProperty("partNumber");
				console.log("Read property Part Number: " + readValue);
				var partNumberRegex = /CRD-MC18-.*/
				var partNumberMatched = partNumberRegex.exec(readValue);
				expect(partNumberMatched).not.toBe(null);
				expect(readValue.length).toBe(18);
			});

			it("is able to successfully retrieve the serialNumber", function() 
			{
				if (!isSupported) return;

				var readValue = Rho.SmartCradle.getProperty("serialNumber");
				console.log("Read property Serial Number: " + readValue);
				expect(readValue.length).toBe(15);
			});

			it("is able to successfully retrieve the mfgDate", function() 
			{
				if (!isSupported) return;

				//  mfgDate should be in the correct format
				var readValue = Rho.SmartCradle.getProperty("mfgDate");
				console.log("Read property MFG Date (DD-MM-YY): " + readValue);
				var mfgDateRegex = /[0-9]+-[0-9]+-[0-9]+/
				var mfgDateMatched = mfgDateRegex.exec(readValue);
				expect(mfgDateMatched).not.toBe(null);
			});

			it("is able to successfully retrieve the driverVersion", function() 
			{
				if (!isSupported) return;

				var readValue = Rho.SmartCradle.getProperty("driverVersion");
				console.log("Read property Driver Version: " + readValue);
				//  Expect the result to be in the form m.n
				var regex = /[0-9]+\.[0-9]+/
				var matched = regex.exec(readValue);
				expect(matched).not.toBe(null);
			});

			it("is able to successfully retrieve the cApiVersion", function() 
			{
				if (!isSupported) return;

				var readValue = Rho.SmartCradle.getProperty("cApiVersion");
				console.log("Read property C API: " + readValue);
				//  Expect the result to be in the form m.n
				var regex = /[0-9]+\.[0-9]+/
				var matched = regex.exec(readValue);
				expect(matched).not.toBe(null);
			});

			it("is able to successfully retrieve the firmwareVersion", function() 
			{
				if (!isSupported) return;

				var readValue = Rho.SmartCradle.getProperty("firmwareVersion");
				console.log("Read property Firmware Version: " + readValue);
				//  Expect the result to be in the form m.n
				var regex = /[0-9]+\.[0-9]+/
				var matched = regex.exec(readValue);
				expect(matched).not.toBe(null);
			});

		});
		
}

if(Rho.System.platform == "ANDROID"){
		describe("Read Only Properties of the Smart Cradle (Via Get / Set Property)", function() {

			beforeEach(function() 
			{

			});
					
			var deviceType = getDeviceType();
			var isSupported = false;
			isSupported = (deviceType.toLowerCase().indexOf("mc18") != -1);			

			it("is able to successfully retrieve the hardwareId", function() 
			{
				if (!isSupported) return;

				var readValue = Rho.SmartCradle.getProperty("hardwareId");
				console.log("Read property Hardware ID: " + readValue);
				expect(readValue.length).toBe(1);
			});

			it("is able to successfully retrieve the partNumber", function() 
			{
				if (!isSupported) return;

				var readValue = Rho.SmartCradle.getProperty("partNumber");
				console.log("Read property Part Number: " + readValue);
				var partNumberRegex = /CRD-MC18-.*/
				var partNumberMatched = partNumberRegex.exec(readValue);
				expect(partNumberMatched).not.toBe(null);
				expect(readValue.length).toBe(18);
			});

			it("is able to successfully retrieve the serialNumber", function() 
			{
				if (!isSupported) return;

				var readValue = Rho.SmartCradle.getProperty("serialNumber");
				console.log("Read property Serial Number: " + readValue);
				expect(readValue.length).toBe(15);
			});

		});
		
}
if(Rho.System.platform == "WINDOWS"){
		describe("Able to Set and Retrieve properties via the Set / Get Properties methods", function() {

			beforeEach(function() 
			{

			});

			var deviceType = getDeviceType();
			var isSupported = false;
			isSupported = (deviceType.toLowerCase().indexOf("mc18") != -1);			

			it("is able to set all writable properties using the SetProperties method & retrieve using GetProperties", function() 
			{
				if (!isSupported) return;

				var propsToSet = {"chargeState":"fast","rowId":1,"columnId":1,"wallId":1}
				var propsToGet = ["chargeState","rowId","columnId","wallId"]
				Rho.SmartCradle.setProperties(propsToSet);
				var retrievedProps = Rho.SmartCradle.getProperties(propsToGet);
				console.log(JSON.stringify(retrievedProps));
				
				expect(retrievedProps.rowId).toBe("1");
				expect(retrievedProps.columnId).toBe("1");
				expect(retrievedProps.wallId).toBe("1");
				expect(retrievedProps.chargeState).toBe("fast");
				
				var propsToSet = {"chargeState":"slow","rowId":5,"columnId":4,"wallId":3}
				var propsToGet = ["chargeState","rowId","columnId","wallId"]
				Rho.SmartCradle.setProperties(propsToSet);
				var retrievedProps = Rho.SmartCradle.getProperties(propsToGet);
				
				expect(retrievedProps.rowId).toBe("5");
				expect(retrievedProps.columnId).toBe("4");
				expect(retrievedProps.wallId).toBe("3");
				expect(retrievedProps.chargeState).toBe("slow");				
			});
			

			it("is able to retrieve all properties using the GetAllProperties method", function() 
			{
				if (!isSupported) return;

				var propsToSet = {"chargeState":"fast","rowId":1,"columnId":1,"wallId":1}
				Rho.SmartCradle.setProperties(propsToSet);
				var retrievedProps = Rho.SmartCradle.getAllProperties();
				console.log(JSON.stringify(retrievedProps));
				
				expect(retrievedProps.rowId).toBe("1");
				expect(retrievedProps.columnId).toBe("1");
				expect(retrievedProps.wallId).toBe("1");
				expect(retrievedProps.chargeState).toBe("fast");
				console.log("hardware id:" + retrievedProps.hardwareId);
				expect(retrievedProps.hardwareId.length).toBe(1);
				var partNumberRegex = /CRD-MC18-.*/
				var partNumberMatched = partNumberRegex.exec(retrievedProps.partNumber);
				expect(partNumberMatched).not.toBe(null);
				expect(retrievedProps.partNumber.length).toBe(18);
				expect(retrievedProps.serialNumber.length).toBe(15);

				var mfgDateRegex = /[0-9]+-[0-9]+-[0-9]+/
				var mfgDateMatched = mfgDateRegex.exec(retrievedProps.mfgDate);
				expect(mfgDateMatched).not.toBe(null);
				var driverVersionRegex = /[0-9]+\.[0-9]+/
				var driverVersionMatched = driverVersionRegex.exec(retrievedProps.driverVersion);
				expect(driverVersionMatched).not.toBe(null);
				var cApiVersionRegex = /[0-9]+\.[0-9]+/
				var cApiVersionMatched = cApiVersionRegex.exec(retrievedProps.cApiVersion);
				expect(cApiVersionMatched).not.toBe(null);
				var firmwareVersionRegex = /[0-9]+\.[0-9]+/
				var firmwareVersionMatched = firmwareVersionRegex.exec(retrievedProps.firmwareVersion);
				expect(firmwareVersionMatched).not.toBe(null);			
			});

		});
	}
	
if(Rho.System.platform == "ANDROID"){
		describe("Able to Set and Retrieve properties via the Set / Get Properties methods", function() {

			beforeEach(function() 
			{

			});

			var deviceType = getDeviceType();
			var isSupported = false;
			isSupported = (deviceType.toLowerCase().indexOf("mc18") != -1);			

			it("is able to set all writable properties using the SetProperties method & retrieve using GetProperties", function() 
			{
				if (!isSupported) return;

				var propsToSet = {"chargeState":"fast","rowId":1,"columnId":1,"wallId":1}
				var propsToGet = ["chargeState","rowId","columnId","wallId"]
				Rho.SmartCradle.setProperties(propsToSet);
				var retrievedProps = Rho.SmartCradle.getProperties(propsToGet);
				console.log(JSON.stringify(retrievedProps));
				
				expect(retrievedProps.rowId).toBe("1");
				expect(retrievedProps.columnId).toBe("1");
				expect(retrievedProps.wallId).toBe("1");
				expect(retrievedProps.chargeState).toBe("fast");
				
				var propsToSet = {"chargeState":"slow","rowId":5,"columnId":4,"wallId":3}
				var propsToGet = ["chargeState","rowId","columnId","wallId"]
				Rho.SmartCradle.setProperties(propsToSet);
				var retrievedProps = Rho.SmartCradle.getProperties(propsToGet);
				
				expect(retrievedProps.rowId).toBe("5");
				expect(retrievedProps.columnId).toBe("4");
				expect(retrievedProps.wallId).toBe("3");
				expect(retrievedProps.chargeState).toBe("slow");				
			});
			

			it("is able to retrieve all properties using the GetAllProperties method", function() 
			{
				if (!isSupported) return;

				var propsToSet = {"chargeState":"fast","rowId":1,"columnId":1,"wallId":1}
				Rho.SmartCradle.setProperties(propsToSet);
				var retrievedProps = Rho.SmartCradle.getAllProperties();
				console.log(JSON.stringify(retrievedProps));
				
				expect(retrievedProps.rowId).toBe("1");
				expect(retrievedProps.columnId).toBe("1");
				expect(retrievedProps.wallId).toBe("1");
				expect(retrievedProps.chargeState).toBe("fast");
				console.log("hardware id:" + retrievedProps.hardwareId);
				expect(retrievedProps.hardwareId.length).toBe(1);
				var partNumberRegex = /CRD-MC18-.*/
				var partNumberMatched = partNumberRegex.exec(retrievedProps.partNumber);
				expect(partNumberMatched).not.toBe(null);
				expect(retrievedProps.partNumber.length).toBe(18);
				expect(retrievedProps.serialNumber.length).toBe(15);
					
			});

		});
	}
			
		//  Note - Unlock can only be tested in a manual way
				
});