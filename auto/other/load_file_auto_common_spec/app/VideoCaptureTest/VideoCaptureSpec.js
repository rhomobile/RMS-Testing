describe("VideoCaptureTestSuite", function() {
	describe("Testing Video Capture Module in Ruby via AJAX.  ", function() {
		
		var deviceOS = Rho.System.platform;
		
		if (deviceOS == "ANDROID")
		{
			it("AT55561, Set and get the Video capture properties", function() {			
				var result = getVideocapture();			
				expect(result).toBe("fileName:- /RhoVideoCapture.mp4 duration:- 30000 Gallery:- true Resolution:- LOW");				
			});		
			
			it("AT55562, Clear and get all the Video capture properties", function() {			
				var result = getAllVideocapture();
				expect(result).toBe("fileName:-  duration:- 5000 Gallery:- false Resolution:- HIGH");				
			});		
			
			it("AT55563 - opens the Video capture", function() {	
				var result = startVideocapture();
				expect(result).toBe("true");
			});
			
			it("AT55564 - stops the Video capture", function() {
				var result = stopVideocapture();
				expect(result).toBe("true");			
			});
		}
	});
});
