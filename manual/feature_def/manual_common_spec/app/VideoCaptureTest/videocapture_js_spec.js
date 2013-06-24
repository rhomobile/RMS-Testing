
describe("Video Capture Test", function() {
	var callbackCount = 0;
	beforeEach(function(){
		captured = false;
		testResult = '';
	});
	afterEach(function() {
		/* ... Tear it down ... */
	});
	var videocapturestart_callback = function(params) {
		var data = "Result is"+ params['tab_index'  ]+"Name is"+params['fileName']+"Size is"+params['size'];
		alert(data);
		callbackCount += 1;
	}
	it("VT281-0677 | Start videoCapture with default duration|", function() {
		runs(function()
		{
			Rho.Videocapture.start();
			
		});

		waitsFor(function(){
			return captured;
		},"Waiting For Result",120000);	


		runs(function()
		{
			expect(testResult).toEqual(true);
		});

	});
	
	
	it("VT281-0678 | Start videoCapture with callback  |", function() {
		runs(function()
		{
			Rho.Videocapture.start(videocapturestart_callback);
			
		});
		
	    waitsFor( function() {
                return captured;
            },
            "Callback never called",
            120000
        );


		runs(function()
		{
			expect(callbackCount).toEqual(1);
			expect(testResult).toEqual(true);
		});

	});
	
	it("VT281-0679 | Stop videoCapture after 2 second|", function() {
		runs(function()
		{
			Rho.Videocapture.start();
			
		});
		waitsFor( function() {
                
            },
            "Wait for 2 secs ",
            2000
        );
		
		runs(function()
		{
			Rho.Videocapture.stop();
			
		});
		waitsFor(function(){
			return captured;
		},"Waiting For Result",120000);	


		runs(function()
		{
			expect(testResult).toEqual(true);
		});
	});

	it("VT281-0680 | cancel videoCapture after 2 second|", function() {
		runs(function()
		{
			Rho.Videocapture.start();
			
		});
		waitsFor( function() {
                
            },
            "Wait for 2 secs ",
            2000
        );
		
		runs(function()
		{
			Rho.Videocapture.cancel();
			
		});
		waitsFor(function(){
			return captured;
		},"Waiting For Result",120000);	


		runs(function()
		{
			expect(testResult).toEqual(true);
		});	
    });		
		
	it("VT281-0681 | set duration directly as 10second for videoCapture|", function() {
		runs(function()
		{
			Rho.Videocapture.duration = 10000
			Rho.Videocapture.start();
			
		});

		waitsFor(function(){
			return captured;
		},"Waiting For Result",60000);	


		runs(function()
		{
			expect(testResult).toEqual(true);
		});	
	});
	
	it("VT281-0682 | set duration using setproperty as 30second for videoCapture|", function() {
		runs(function()
		{
			Rho.Videocapture.setProperty('duration','120000')
			Rho.Videocapture.start();
			
		});

		waitsFor(function(){
			return captured;
		},"Waiting For Result",120000);	


		runs(function()
		{
			expect(testResult).toEqual(true);
		});	
	});

	it("VT281-0683 | set duration using setProperties as 20 second for videoCapture|", function() {
		runs(function()
		{
			Rho.Videocapture.setProperties({'duration' :'20000'})
			Rho.Videocapture.start();
			
		});

		waitsFor(function(){
			return captured;
		},"Waiting For Result",120000);	


		runs(function()
		{
			expect(testResult).toEqual(true);
		});	
	});	

	it("VT281-0684 | duration as 0second for videoCapture|", function() {
		runs(function()
		{
			Rho.Videocapture.duration = 0;
			Rho.Videocapture.start();
			
		});

		waitsFor(function(){
			return captured;
		},"Waiting For Result",120000);	


		runs(function()
		{
			expect(testResult).toEqual(true);
		});	
	});	
	
/*	it("VT281-0685 | duration as -10000 for videoCapture|", function() {
		runs(function()
		{
			Rho.Videocapture.duration = -10000;
			Rho.Videocapture.start();
			
		});

		waitsFor(function(){
			return captured;
		},"Waiting For Result",120000);	


		runs(function()
		{
			expect(testResult).toEqual(true);
		});	
	});	*/
	
	it("VT281-0686 | resolution default value videoCapture|", function() {
		runs(function()
		{
			Rho.Videocapture.start();
			
		});

		waitsFor(function(){
			return captured;
		},"Waiting For Result",120000);	


		runs(function()
		{
			expect(testResult).toEqual(true);
		});	
	});	
	
	it("VT281-0687 | set resolution directly as high videoCapture|", function() {
		runs(function()
		{
			Rho.Videocapture.resolution = "high"
			Rho.Videocapture.start();
			
		});

		waitsFor(function(){
			return captured;
		},"Waiting For Result",120000);	


		runs(function()
		{
			expect(testResult).toEqual(true);
		});	
	});	
	
	it("VT281-0688 | set resolution using setproperty as low for videoCapture|", function() {
		runs(function()
		{
			Rho.Videocapture.setProperty('resolution','low')
			Rho.Videocapture.start();
			
		});

		waitsFor(function(){
			return captured;
		},"Waiting For Result",120000);	


		runs(function()
		{
			expect(testResult).toEqual(true);
		});	
	});	

	it("VT281-0689 | set resolution using setProperties as high second for videoCapture|", function() {
		runs(function()
		{
			Rho.Videocapture.setProperties({'resolution' :'low'})
			Rho.Videocapture.start();
			
		});

		waitsFor(function(){
			return captured;
		},"Waiting For Result",120000);	


		runs(function()
		{
			expect(testResult).toEqual(true);
		});	
	});	
	
/*	it("VT281-0690 | set resolution  as invalid  videoCapture|", function() {
		runs(function()
		{
			Rho.Videocapture.resolution = "abcd"
			Rho.Videocapture.start();
			
		});

		waitsFor(function(){
			return captured;
		},"Waiting For Result",120000);	


		runs(function()
		{
			expect(testResult).toEqual(true);
		});	
	});		
	
	it("VT281-0691 | set resolution  as empty videoCapture|", function() {
		runs(function()
		{
			Rho.Videocapture.resolution = null
			Rho.Videocapture.start();
			
		});

		waitsFor(function(){
			return captured;
		},"Waiting For Result",120000);	


		runs(function()
		{
			expect(testResult).toEqual(true);
		});	
	});	
	*/
	it("VT281-0692 | Test saveToGallery with default value (false)videoCapture|", function() {
		runs(function()
		{
			Rho.Videocapture.start();
			
		});

		waitsFor(function(){
			return captured;
		},"Waiting For Result",120000);	


		runs(function()
		{
			expect(testResult).toEqual(true);
		});	
	});		

	it("VT281-0693 | set saveToGallery to true using setProperty method videoCapture|", function() {
		runs(function()
		{
			Rho.Videocapture.saveToGallery = true;
			Rho.Videocapture.start();
			
		});

		waitsFor(function(){
			return captured;
		},"Waiting For Result",120000);	


		runs(function()
		{
			expect(testResult).toEqual(true);
		});	
	});		

	it("VT281-0694 | set saveToGallery to false using setProperties method videoCapture|", function() {
		runs(function()
		{
			Rho.Videocapture.saveToGallery = false;
			Rho.Videocapture.start();
			
		});

		waitsFor(function(){
			return captured;
		},"Waiting For Result",120000);	


		runs(function()
		{
			expect(testResult).toEqual(true);
		});	
	});	
	
	it("VT281-0695 | set saveToGallery and filename videoCapture|", function() {
		runs(function()
		{
			Rho.Videocapture.saveToGallery = true;
			if (isAndroidPlatform())
			{
				Rho.Videocapture.saveToGallery = "/mnt/sdcard/Rhovideocatpure"
			}
			if (isWindowsMobilePlatform())
			{
				Rho.Videocapture.saveToGallery = "\Application\Rhovideocatpure"
			}
			Rho.Videocapture.start();
			
		});

		waitsFor(function(){
			return captured;
		},"Waiting For Result",120000);	


		runs(function()
		{
			expect(testResult).toEqual(true);
		});	
	});	

	
	
});