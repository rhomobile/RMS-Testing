var androidfilepath = "/mnt/sdcard/videofile";
var iphonefilepath = Rho.RhoFile.join(Rho.Application.databaseBlobFolder, "videofile");
var wmfilepath = "\Application\videofile";

function playvideo()
{
	if (isAndroidPlatform())
	{
		Rho.Mediaplayer.startvideo(androidfilepath+'.mp4');
	}
	if (isApplePlatform())
	{
		Rho.Mediaplayer.startvideo(iphonefilepath+'.mov');
	}	
	if (isWindowsMobilePlatform())
	{
		Rho.Mediaplayer.startvideo(wmfilepath+'.mov');
	}		
}

describe("Video Capture Test", function() {
	var callbackCount = 0;
	beforeEach(function(){
		captured = false;
		testResult = '';
		callbackstatus = false;
		androidfilepath = "/mnt/sdcard/videofile";
		iphonefilepath = "";
		wmfilepath = "\Application\videofile";
	});
	afterEach(function() {
		/* ... Tear it down ... */
	});
	 var callbackgetproperties = function (data){
		getpropertiesdata = JSON.stringify(data);
		callbackstatus = true;
	}
	
	var videocapturestart_callback = function(params) {
		var data = "Result is"+ params['tab_index']+"Name is"+params['fileName']+"Size is"+params['size'];
		alert(data);
		callbackCount += 1;
	}
	
	var enumerate_callback = function(params) {
		callbackCount += 1;
	}
	if (isAndroidPlatform() || isApplePlatform() || isWindowsMobilePlatform()) {
		it("VT281-0677 | Start videoCapture with default duration|", function() {
			runs(function()
			{
				Rho.Videocapture.start();
				
			});

			waitsFor(function(){
				return captured;
			},"Waiting For Result",180000);	


			runs(function()
			{
				expect(testResult).toEqual(true);
			});

		});
		
	
	
		it("VT281-0678 | Start videoCapture with callback  |", function() {
			runs(function()
			{
				if (isAndroidPlatform())
				{
					Rho.Videocapture.fileName = androidfilepath
				}
				if (isApplePlatform())
				{
					Rho.Videocapture.fileName = iphonefilepath
				}	
				if (isWindowsMobilePlatform())
				{
					Rho.Videocapture.fileName = wmfilepath
				}		
				Rho.Videocapture.start(videocapturestart_callback);
				
			});
			
			waitsFor( function() {
					return captured;
				},
				"Callback ",
				180000
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
				if (isAndroidPlatform())
				{
					Rho.Videocapture.fileName = androidfilepath
				}
				if (isApplePlatform())
				{
					Rho.Videocapture.fileName = iphonefilepath
				}	
				if (isWindowsMobilePlatform())
				{
					Rho.Videocapture.fileName = wmfilepath
				}	
				Rho.Videocapture.start();
				
			});

			if(isWindowsMobilePlatform())
			{	
				waitsFor( function() {
					
				},
				"Wait for 2 secs ",
				2000);
				runs(function()
				{
					Rho.Videocapture.stop();
					
				});
			}
			waitsFor(function(){
				return captured;
			},"Waiting For Result",180000);	


			runs(function()
			{
				expect(testResult).toEqual(true);
			});
		});

		it("VT281-0680 | cancel videoCapture after 2 second|", function() {
			runs(function()
			{
				if (isAndroidPlatform())
				{
					Rho.Videocapture.fileName = androidfilepath
				}
				if (isApplePlatform())
				{
					Rho.Videocapture.fileName = iphonefilepath
				}	
				if (isWindowsMobilePlatform())
				{
					Rho.Videocapture.fileName = wmfilepath
				}	
				Rho.Videocapture.start();
				
			});

			if(isWindowsMobilePlatform())
			{
				waitsFor( function() {
					
				},
				"Wait for 2 secs ",
				2000);
				runs(function()
				{
					Rho.Videocapture.cancel();
					
				});
			}
			waitsFor(function(){
				return captured;
			},"Waiting For Result",180000);	

		
			runs(function()
			{
				expect(testResult).toEqual(true);
			});	
		});		
		
		it("VT281-0681 | set duration directly as 10second for videoCapture|", function() {
			runs(function()
			{
				if (isAndroidPlatform())
				{
					Rho.Videocapture.fileName = androidfilepath
				}
				if (isApplePlatform())
				{
					Rho.Videocapture.fileName = iphonefilepath
				}	
				if (isWindowsMobilePlatform())
				{
					Rho.Videocapture.fileName = wmfilepath
				}	
				Rho.Videocapture.duration = 10000
				Rho.Videocapture.start();
				
			});

			waitsFor(function(){
				return captured;
			},"Waiting For Result",180000);	


			runs(function()
			{
				expect(testResult).toEqual(true);
			});	
		});
	
		it("VT281-0682 | set duration using setproperty as 30second for videoCapture|", function() {
			runs(function()
			{
				if (isAndroidPlatform())
				{
					Rho.Videocapture.fileName = androidfilepath
				}
				if (isApplePlatform())
				{
					Rho.Videocapture.fileName = iphonefilepath
				}	
				if (isWindowsMobilePlatform())
				{
					Rho.Videocapture.fileName = wmfilepath
				}	
				Rho.Videocapture.setProperty('duration','30000')
				Rho.Videocapture.start();
				
			});

			waitsFor(function(){
				return captured;
			},"Waiting For Result",180000);	


			runs(function()
			{
				expect(testResult).toEqual(true);
			});	
		});

		it("VT281-0683 | set duration using setProperties as 20 second for videoCapture|", function() {
			runs(function()
			{
				if (isAndroidPlatform())
				{
					Rho.Videocapture.fileName = androidfilepath
				}
				if (isApplePlatform())
				{
					Rho.Videocapture.fileName = iphonefilepath
				}	
				if (isWindowsMobilePlatform())
				{
					Rho.Videocapture.fileName = wmfilepath
				}	
				Rho.Videocapture.setProperties({'duration' :'20000'})
				Rho.Videocapture.start();
				
			});

			waitsFor(function(){
				return captured;
			},"Waiting For Result",180000);	


			runs(function()
			{
				expect(testResult).toEqual(true);
			});	
		});	

		it("VT281-0684 | duration as 0second for videoCapture|", function() {
			runs(function()
			{
				if (isAndroidPlatform())
				{
					Rho.Videocapture.fileName = androidfilepath
				}
				if (isApplePlatform())
				{
					Rho.Videocapture.fileName = iphonefilepath
				}	
				if (isWindowsMobilePlatform())
				{
					Rho.Videocapture.fileName = wmfilepath
				}					
				Rho.Videocapture.duration = 0;
				Rho.Videocapture.start();
				
			});

			waitsFor(function(){
				return captured;
			},"Waiting For Result",180000);	


			runs(function()
			{
				expect(testResult).toEqual(true);
			});	
		});	
	
	/*	it("VT281-0685 | duration as -10000 for videoCapture|", function() {
			runs(function()
			{
				if (isAndroidPlatform())
				{
					Rho.Videocapture.fileName = androidfilepath
				}
				if (isApplePlatform())
				{
					Rho.Videocapture.fileName = iphonefilepath
				}	
				if (isWindowsMobilePlatform())
				{
					Rho.Videocapture.fileName = wmfilepath
				}					
				Rho.Videocapture.duration = -10000;
				Rho.Videocapture.start();
				
			});

			waitsFor(function(){
				return captured;
			},"Waiting For Result",180000);	


			runs(function()
			{
				expect(testResult).toEqual(true);
			});	
		});	*/
	}
	
	if (isAndroidPlatform() || isWindowsMobilePlatform()) {	
		it("VT281-0686 | resolution default value videoCapture|", function() {
			runs(function()
			{
				if (isAndroidPlatform())
				{
					Rho.Videocapture.fileName = androidfilepath
				}
				if (isWindowsMobilePlatform())
				{
					Rho.Videocapture.fileName = wmfilepath
				}				
				Rho.Videocapture.start();
				
			});

			waitsFor(function(){
				return captured;
			},"Waiting For Result",180000);	


			runs(function()
			{
				expect(testResult).toEqual(true);
			});	
		});	
	
		it("VT281-0687 | set resolution directly as high videoCapture|", function() {
			runs(function()
			{
				if (isAndroidPlatform())
				{
					Rho.Videocapture.fileName = androidfilepath
				}
				if (isWindowsMobilePlatform())
				{
					Rho.Videocapture.fileName = wmfilepath
				}	
				Rho.Videocapture.resolution = "high"
				Rho.Videocapture.start();
				
			});

			waitsFor(function(){
				return captured;
			},"Waiting For Result",180000);	


			runs(function()
			{
				expect(testResult).toEqual(true);
			});	
		});	
	
		it("VT281-0688 | set resolution using setproperty as low for videoCapture|", function() {
			runs(function()
			{
				if (isAndroidPlatform())
				{
					Rho.Videocapture.fileName = androidfilepath
				}
				if (isWindowsMobilePlatform())
				{
					Rho.Videocapture.fileName = wmfilepath
				}				
				Rho.Videocapture.setProperty('resolution','low')
				Rho.Videocapture.start();
				
			});

			waitsFor(function(){
				return captured;
			},"Waiting For Result",180000);	


			runs(function()
			{
				expect(testResult).toEqual(true);
			});	
		});	

		it("VT281-0689 | set resolution using setProperties as high second for videoCapture|", function() {
			runs(function()
			{
				if (isAndroidPlatform())
				{
					Rho.Videocapture.fileName = androidfilepath
				}
				if (isWindowsMobilePlatform())
				{
					Rho.Videocapture.fileName = wmfilepath
				}				
				Rho.Videocapture.setProperties({'resolution' :'high'})
				Rho.Videocapture.start();
				
			});

			waitsFor(function(){
				return captured;
			},"Waiting For Result",180000);	


			runs(function()
			{
				expect(testResult).toEqual(true);
			});	
		});	
		
	/*	it("VT281-0690 | set resolution  as invalid  videoCapture|", function() {
			runs(function()
			{
				if (isAndroidPlatform())
				{
					Rho.Videocapture.fileName = androidfilepath
				}
				if (isWindowsMobilePlatform())
				{
					Rho.Videocapture.fileName = wmfilepath
				}					
				Rho.Videocapture.resolution = "abcd"
				Rho.Videocapture.start();
				
			});

			waitsFor(function(){
				return captured;
			},"Waiting For Result",180000);	


			runs(function()
			{
				expect(testResult).toEqual(true);
			});	
		});		
	
		it("VT281-0691 | set resolution  as empty videoCapture|", function() {
			runs(function()
			{
				if (isAndroidPlatform())
				{
					Rho.Videocapture.fileName = androidfilepath
				}
				if (isWindowsMobilePlatform())
				{
					Rho.Videocapture.fileName = wmfilepath
				}				
				Rho.Videocapture.resolution = null
				Rho.Videocapture.start();
				
			});

			waitsFor(function(){
				return captured;
			},"Waiting For Result",180000);	


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
			},"Waiting For Result",180000);	


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
			},"Waiting For Result",180000);	


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
			},"Waiting For Result",180000);	


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
			},"Waiting For Result",180000);	


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
			},"Waiting For Result",180000);	


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
			},"Waiting For Result",180000);	


			runs(function()
			{
				expect(testResult).toEqual(true);
			});	
		});		
		*/
	}
	if (isAndroidPlatform() || isApplePlatform() || isWindowsMobilePlatform()) {
		it("VT281-0698 | set filename videoCapture|", function() {
			runs(function()
			{
				if (isAndroidPlatform())
				{
					androidfilepath = "/Rhovideocatpure"
					Rho.Videocapture.fileName = androidfilepath
				}
				if (isApplePlatform())
				{
					iphonefilepath = "\Rhovideocatpure"
					Rho.Videocapture.fileName = iphonefilepath
				}	
				if (isWindowsMobilePlatform())
				{
					wmfilepath = "\Rhovideocatpure"
					Rho.Videocapture.fileName = wmfilepath
				}				
				Rho.Videocapture.start();
				
			});

			waitsFor(function(){
				return captured;
			},"Waiting For Result",180000);	


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
					androidfilepath = "/Temp/Rhovideocatpure"
					Rho.Videocapture.setProperty('filename',androidfilepath)
				}
				if (isWindowsMobilePlatform())
				{
					wmfilepath = "\Temp\Rhovideocatpure"
					Rho.Videocapture.setProperty('filename', wmfilepath)
				}
				if (isApplePlatform())
				{
					iphonefilepath = "/Temp/Rhovideocatpure"
					Rho.Videocapture.setProperty('filename', iphonefilepath)
				}			
				Rho.Videocapture.start();
				
			});

			waitsFor(function(){
				return captured;
			},"Waiting For Result",180000);	


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
					androidfilepath = "/Temp/Rhovideocatpure"
					Rho.Videocapture.setProperties({'filename' :androidfilepath})
				}
				if (isWindowsMobilePlatform())
				{
					wmfilepath = "\Temp\Rhovideocatpure"
					Rho.Videocapture.setProperties({'filename' :wmfilepath})
				}
				if (isApplePlatform())
				{
					iphonefilepath = "/Temp/Rhovideocatpure"
					Rho.Videocapture.setProperties({'filename' :iphonefilepath})
				}				
				Rho.Videocapture.start();
				
			});

			waitsFor(function(){
				return captured;
			},"Waiting For Result",180000);	


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
					androidfilepath = "/Temp/M123$_abc"
					Rho.Videocapture.filename = androidfilepath
				}
				if (isWindowsMobilePlatform())
				{
					wmfilepath = "\Temp\M123$_abc"
					Rho.Videocapture.filename = wmfilepath
				}
				if (isApplePlatform())
				{
					iphonefilepath = "/Temp/M123$_abc"
					Rho.Videocapture.filename = "/Temp/M123$_abc"
				}
				Rho.Videocapture.start();
				
			});

			waitsFor(function(){
				return captured;
			},"Waiting For Result",180000);	


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
					androidfilepath = "\invalid/Rhovideocatpure"
					Rho.Videocapture.filename = androidfilepath
				}
				if (isWindowsMobilePlatform())
				{
					wmfilepath = "\invalid/Rhovideocatpure"
					Rho.Videocapture.filename = wmfilepath
				}
				if (isApplePlatform())
				{
					iphonefilepath = "\invalid/Rhovideocatpure"
					Rho.Videocapture.filename = iphonefilepath
				}
				Rho.Videocapture.start();
				
			});

			waitsFor(function(){
				return captured;
			},"Waiting For Result",180000);	


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
					androidfilepath = ""
					Rho.Videocapture.filename = androidfilepath
				}
				if (isWindowsMobilePlatform())
				{
					wmfilepath = ""
					Rho.Videocapture.filename = wmfilepath
				}
				if (isApplePlatform())
				{
					iphonefilepath = ""
					Rho.Videocapture.filename = iphonefilepath
				}
				Rho.Videocapture.start();
				
			});

			waitsFor(function(){
				return captured;
			},"Waiting For Result",180000);	


			runs(function()
			{
				expect(testResult).toEqual(true);
			});	
		});	*/	
    }
	if (isAndroidPlatform() || isApplePlatform() || isWindowsMobilePlatform()) {
		it("VT281-0704 | cancel after recorded video saves|", function() {
			runs(function()
			{
				if (isAndroidPlatform()|| isApplePlatform())
				{
					runs(function()
					{
						if (isAndroidPlatform())
						{
							androidfilepath = "/Temp/Rhovideocatpure"
							Rho.Videocapture.filename = androidfilepath
						}
						if (isApplePlatform())
						{
							iphonefilepath = "/Temp/Rhovideocatpure"
							Rho.Videocapture.filename = iphonefilepath
						}
						Rho.Videocapture.duration = 10000
						Rho.Videocapture.start(videocapturestart_callback);
					});
				}
				if (isWindowsMobilePlatform())
				{
					runs(function()
					{	
						if (isWindowsMobilePlatform())
						{
							wmfilepath = "\Temp\Rhovideocatpure"
							Rho.Videocapture.filename = wmfilepath
						}					
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
			},"Waiting For Result",180000);	


			runs(function()
			{
				expect(testResult).toEqual(true);
			});	
		});
	
		it("VT281-0704 | cancel after calling stop|", function() {
			runs(function()
			{
				if (isAndroidPlatform() || isApplePlatform())
				{
					runs(function()
					{
						if (isAndroidPlatform())
						{
							androidfilepath = "/Temp/Rhovideocatpure"
							Rho.Videocapture.filename = androidfilepath
						}
						if (isApplePlatform())
						{
							iphonefilepath = "/Temp/Rhovideocatpure"
							Rho.Videocapture.filename = iphonefilepath
						}						
						Rho.Videocapture.duration = 10000
						Rho.Videocapture.start(videocapturestart_callback);
					});
				}
				if (isWindowsMobilePlatform())
				{
					runs(function()
					{			
						if (isWindowsMobilePlatform())
						{
							wmfilepath = "\Temp\Rhovideocatpure"
							Rho.Videocapture.filename = wmfilepath
						}							
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
			},"Waiting For Result",180000);	


			runs(function()
			{
				expect(testResult).toEqual(true);
			});	
		});	
	}
	if (isAndroidPlatform() || isApplePlatform() || isWindowsMobilePlatform() || isWindowsPhone8Platform() || isWindowsDesktopPlatform()) {
		it("VT281-0706 | Call enumerate method with call back videocapture|", function() {
			runs(function()
			{
				var enumData = new array();
				enumData = Rho.Videocapture.enumerate(enumerate_callback);
				var data = enumData.toString(); 
				displayResult("VT281-0706 | Call enumerate method with call back videocapture| ",data);
				
			});

			waitsFor(function(){
				return captured;
			},"Waiting For Result",180000);	


			runs(function()

			{
				expect(callbackCount).toEqual(2);
				expect(testResult).toEqual(true);
			});	
		});		

		it("VT281-0707 | Call enumerate method without callback videocapture|", function() {
			runs(function()
			{
				var enumData = new array();
				enumData = Rho.Videocapture.enumerate();
				var data = enumData.toString(); 
				displayResult("VT281-0707 | Call enumerate method without callback videocapture | ",data);
				
			});

			waitsFor(function(){
				return captured;
			},"Waiting For Result",180000);	


			runs(function()
			{
				expect(testResult).toEqual(true);
			});	
		});		

		it("VT281-0708 | Call setDefault method videocapture|", function() {
			runs(function()
			{
				var enumData = new array();
				enumData = Rho.Videocapture.enumerate();
				var j = enumData.length-1;
				Rho.Videocapture.setDefaultInstance(enumData[j]);
				Rho.Videocapture.start();
			});

			waitsFor(function(){
				return captured;
			},"Waiting For Result",180000);	


			runs(function()
			{
				expect(testResult).toEqual(true);
			});	
		});	
	
		it("VT281-0708 | Call getDefault method videocapture|", function() {
			runs(function()
			{
				data = Rho.Videocapture.getDefaultInstance();
				displayResult("VT281-0708 | Call getDefault method videocapture",data);
			});

			waitsFor(function(){
				return captured;
			},"Waiting For Result",180000);	


			runs(function()
			{
				expect(testResult).toEqual(true);
			});	
		});	
	}
	
	it("VT281-0658 | Call clearAllProperties method videocapture|", function() {
		runs(function()
		{
			Rho.Videocapture.setProperties({'filename':'/Temp/Rhovideocapture', 'resolution':'low', 'saveToGallery': true, 'duration': 10000});
			Rho.Videocapture.clearAllProperties();
			var data = {};
			data = Rho.Videocapture.getAllProperties();
			displayResult("VT281-0658 | Call clearAllProperties method videocapture | ",data);
		});		
				
		waitsFor(function(){
			return captured;
		},"Waiting For Result",180000);					
		runs(function()
		{
			expect(testResult).toEqual(true);
		});	

	});	
	it("VT281-0655 | Call getProperties method for filename,resolution, saveToGallery and duration videocapture|", function() {
		runs(function()
		{	
			var data = {};
			data = Rho.Videocapture.getProperties(['filename', 'resolution', 'saveToGallery', 'duration']);
			displayResult("VT281-0655 | Call getProperties method for filename,resolution, saveToGallery and duration videocapture | ",data);
		});		
				
		waitsFor(function(){
			return captured;
		},"Waiting For Result",180000);					
		runs(function()
		{
			expect(testResult).toEqual(true);
		});				
	});		
	if (isAndroidPlatform() || isApplePlatform() || isWindowsMobilePlatform()) {
		it("VT281-0654 | Call getProperty method for filename videocapture|", function() {
			runs(function()
			{			
				var data = Rho.Videocapture.getProperty("filename");
				displayResult("VT281-0654 | Call getProperty method for filename videocapture|",data);
			});		
			waitsFor(function(){
				return captured;
			},"Waiting For Result",180000);					
			runs(function()
			{
				expect(testResult).toEqual(true);
			});		
		});
	}

	it("VT281-0713 | Call getProperties method with callback for filename,resolution, saveToGallery and duration videocapture|", function() {
		runs(function()
		{
			var data = {};
			data = Rho.Videocapture.getProperties(['filename', 'resolution', 'saveToGallery', 'duration'], callbackgetproperties);
			displayResult("VT281-0713 | Call getProperties method with callback for filename,resolution, saveToGallery and duration videocapture|",data);
		});		
		waitsFor(function(){
			return captured;
		},"Waiting For Result",180000);					
		runs(function()
		{
			expect(callbackstatus).toEqual(true);
			expect(testResult).toEqual(true);
		});	
					
	});		
});