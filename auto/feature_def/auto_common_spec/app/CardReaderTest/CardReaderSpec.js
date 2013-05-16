describe("CardReaderTestSuite", function() {
	describe("Testing Card Reader Module in Ruby via AJAX.  ", function() {
		
		var deviceOS = Rho.System.platform;
		
		it("AT55551, Set and get the card reader properties", function() {			
			//Rho.CardReader.autoTab = true;
			//Rho.CardReader.autoEnter = true;
			//expect(Rho.CardReader.autoTab).toBe(true);
			//expect(Rho.CardReader.autoEnter).toBe(true);
			var result = getCardReader();
			expect(result).toBe("autoTab:- TRUE autoEnter:- TRUE");
		});
		
		it("AT55552, Clear and get all the card reader properties", function() {					
			var result = getAllCardReader();
			if (deviceOS == "ANDROID")
			{
				expect(result).toBe("timeout:-  entry:-  panData:-  tab:- FALSE enter:- FALSE module:- ");
			}
			else if (deviceOS == "WINDOWS")
			{
				expect(result).toBe("timeout:- 30000 entry:- FALSE panData:-  tab:- TRUE enter:- TRUE module:- ");
			}
		});
		
		it("AT55553, opens the card reader", function() {			
			var result = openCardReader();
			expect(result).toBe("true");					
		});
		
		it("AT55554, closes the card reader", function() {
			var result = closeCardReader();
			expect(result).toBe("true");					
		});
	});
});
