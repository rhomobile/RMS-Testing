
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
	
	var enumerate_callback = function(params) {
	
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
				Rho.Videocapture.filename = "/mnt/sdcard/Rhovideocatpure"
			}
			if (isWindowsMobilePlatform())
			{
				Rho.Videocapture.filename = "\Application\Rhovideocatpure"
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

/*	it("VT281-0696 | set saveToGallery invalid value videoCapture|", function() {
		runs(function()
		{
			Rho.Videocapture.saveToGallery = abcd;
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

	it("VT281-0697 | set saveToGallery empty value videoCapture|", function() {
		runs(function()
		{
			Rho.Videocapture.saveToGallery = null;
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

	it("VT281-0698 | set filename videoCapture|", function() {
		runs(function()
		{
			if (isAndroidPlatform())
			{
				Rho.Videocapture.filename = "/Rhovideocatpure"
			}
			if (isWindowsMobilePlatform())
			{
				Rho.Videocapture.filename = "\Rhovideocatpure"
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

	it("VT281-0699 | set filename using set Property method videoCapture|", function() {
		runs(function()
		{
			if (isAndroidPlatform())
			{
				Rho.Videocapture.setProperty('filename','/Temp/Rhovideocatpure')
			}
			if (isWindowsMobilePlatform())
			{
				Rho.Videocapture.setProperty('filename','\Temp\Rhovideocatpure')
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
	
	it("VT281-0700 | set filename using set Properties method videoCapture|", function() {
		runs(function()
		{
			if (isAndroidPlatform())
			{
				Rho.Videocapture.setProperties({'filename' :'/Temp/Rhovideocatpure'})
			}
			if (isWindowsMobilePlatform())
			{
				Rho.Videocapture.setProperties({'filename' :'\Temp\Rhovideocatpure'})
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
	
	it("VT281-0701 | set filename to M123$_abc videoCapture|", function() {
		runs(function()
		{
			if (isAndroidPlatform())
			{
				Rho.Videocapture.filename = "/Temp/M123$_abc"
			}
			if (isWindowsMobilePlatform())
			{
				Rho.Videocapture.filename = "\Temp\M123$_abc"
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
	
	/*it("VT281-0702 | set filename to invalid path videoCapture|", function() {
		runs(function()
		{
			if (isAndroidPlatform())
			{
				Rho.Videocapture.filename = "\invalid/Rhovideocatpure"
			}
			if (isWindowsMobilePlatform())
			{
				Rho.Videocapture.filename = "\invalid/Rhovideocatpure"
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

	it("VT281-0703 | set filename to empty path videoCapture|", function() {
		runs(function()
		{
			if (isAndroidPlatform())
			{
				Rho.Videocapture.filename = ""
			}
			if (isWindowsMobilePlatform())
			{
				Rho.Videocapture.filename = ""
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
	});	*/	

	it("VT281-0704 | cancel after recoreded video saves|", function() {
		runs(function()
		{
			if (isAndroidPlatform())
			{
				runs(function()
				{
					Rho.Videocapture.filename = "/Temp/Rhovideocatpure"
					Rho.Videocapture.duration = 10000
					Rho.Videocapture.start(videocapturestart_callback);
				});
			}
			if (isWindowsMobilePlatform())
			{
				runs(function()
				{			
					Rho.Videocapture.filename = "\Temp\Rhovideocatpure"
					Rho.Videocapture.duration = 10000
					Rho.Videocapture.start(videocapturestart_callback);
				});
				waitsFor(function(){
				
				},"Waiting For Result",5000);
				
				runs(function()
				{	
					Rho.Videocapture.cancel();
				});
			}
			
		});

		waitsFor(function(){
			return captured;
		},"Waiting For Result",120000);	


		runs(function()
		{
			expect(testResult).toEqual(true);
		});	
	});
	
	it("VT281-0704 | cancel after calling stop|", function() {
		runs(function()
		{
			if (isAndroidPlatform())
			{
				runs(function()
				{
					Rho.Videocapture.filename = "/Temp/Rhovideocatpure"
					Rho.Videocapture.duration = 10000
					Rho.Videocapture.start(videocapturestart_callback);
				});
			}
			if (isWindowsMobilePlatform())
			{
				runs(function()
				{			
					Rho.Videocapture.filename = "\Temp\Rhovideocatpure"
					Rho.Videocapture.duration = 10000
					Rho.Videocapture.start(videocapturestart_callback);
				});
				waitsFor(function(){
				
				},"Waiting For Result",5000);
				
				runs(function()
				{	
					Rho.Videocapture.stop();
					Rho.Videocapture.cancel();
					
				});
			}	
			
		});

		waitsFor(function(){
			return captured;
		},"Waiting For Result",120000);	


		runs(function()
		{
			expect(testResult).toEqual(true);
		});	
	});	
	
	it("VT281-0706 | Call enumerate method with call back videocapture|", function() {
		runs(function()
		{
			enumData = Rho.Videocapture.enumerate(enumerate_callback);
			for (var j = 0;j<enumData.length;j++){
				displayResult("Enum | ",enumData[j]);
				waits(10000);
			}
			
		});

		waitsFor(function(){
			return captured;
		},"Waiting For Result",120000);	


		runs(function()
		{
			expect(testResult).toEqual(true);
		});	
	});		

	it("VT281-0707 | Call enumerate method without call back videocapture|", function() {
		runs(function()
		{
			enumData = Rho.Videocapture.enumerate();
			for (var j = 0;j<enumData.length;j++){
				displayResult("Enum | ",enumData[j]);
				waits(10000);
			}
			
		});

		waitsFor(function(){
			return captured;
		},"Waiting For Result",120000);	


		runs(function()
		{
			expect(testResult).toEqual(true);
		});	
	});		

	it("VT281-0708 | Call setDefault method videocapture|", function() {
		runs(function()
		{
			Rho.Videocapture.setDefault(cam1);
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
	
	it("VT281-0708 | Call getDefault method videocapture|", function() {
		runs(function()
		{
			data = Rho.Videocapture.getDefault();
			displayResult("VT281-0708 | Call getDefault method videocapture",data);
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