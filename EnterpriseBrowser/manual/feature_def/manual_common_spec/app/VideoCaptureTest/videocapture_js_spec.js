var androidfilepath = "/mnt/sdcard/videofile";
var iphonefilepath = EB.RhoFile.join(EB.Application.databaseBlobFolder, "videofile");
var wmfilepath = "\Application\videofile";

function playvideo()
{
	if (isAndroidPlatform())
	{
		EB.Mediaplayer.startvideo(androidfilepath+'.mp4');
	}
	if (isApplePlatform())
	{
		EB.Mediaplayer.startvideo(iphonefilepath+'.mov');
	}	
	if (isWindowsMobilePlatform())
	{
		EB.Mediaplayer.startvideo(wmfilepath+'.mov');
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
				EB.Videocapture.start();
				
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
					EB.Videocapture.fileName = androidfilepath
				}
				if (isApplePlatform())
				{
					EB.Videocapture.fileName = iphonefilepath
				}	
				if (isWindowsMobilePlatform())
				{
					EB.Videocapture.fileName = wmfilepath
				}		
				EB.Videocapture.start(videocapturestart_callback);
				
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
					EB.Videocapture.fileName = androidfilepath
				}
				if (isApplePlatform())
				{
					EB.Videocapture.fileName = iphonefilepath
				}	
				if (isWindowsMobilePlatform())
				{
					EB.Videocapture.fileName = wmfilepath
				}	
				EB.Videocapture.start();
				
			});

			if(isWindowsMobilePlatform())
			{	
				waitsFor( function() {
					
				},
				"Wait for 2 secs ",
				2000);
				runs(function()
				{
					EB.Videocapture.stop();
					
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
					EB.Videocapture.fileName = androidfilepath
				}
				if (isApplePlatform())
				{
					EB.Videocapture.fileName = iphonefilepath
				}	
				if (isWindowsMobilePlatform())
				{
					EB.Videocapture.fileName = wmfilepath
				}	
				EB.Videocapture.start();
				
			});

			if(isWindowsMobilePlatform())
			{
				waitsFor( function() {
					
				},
				"Wait for 2 secs ",
				2000);
				runs(function()
				{
					EB.Videocapture.cancel();
					
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
					EB.Videocapture.fileName = androidfilepath
				}
				if (isApplePlatform())
				{
					EB.Videocapture.fileName = iphonefilepath
				}	
				if (isWindowsMobilePlatform())
				{
					EB.Videocapture.fileName = wmfilepath
				}	
				EB.Videocapture.duration = 10000
				EB.Videocapture.start();
				
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
					EB.Videocapture.fileName = androidfilepath
				}
				if (isApplePlatform())
				{
					EB.Videocapture.fileName = iphonefilepath
				}	
				if (isWindowsMobilePlatform())
				{
					EB.Videocapture.fileName = wmfilepath
				}	
				EB.Videocapture.setProperty('duration','30000')
				EB.Videocapture.start();
				
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
					EB.Videocapture.fileName = androidfilepath
				}
				if (isApplePlatform())
				{
					EB.Videocapture.fileName = iphonefilepath
				}	
				if (isWindowsMobilePlatform())
				{
					EB.Videocapture.fileName = wmfilepath
				}	
				EB.Videocapture.setProperties({'duration' :'20000'})
				EB.Videocapture.start();
				
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
					EB.Videocapture.fileName = androidfilepath
				}
				if (isApplePlatform())
				{
					EB.Videocapture.fileName = iphonefilepath
				}	
				if (isWindowsMobilePlatform())
				{
					EB.Videocapture.fileName = wmfilepath
				}					
				EB.Videocapture.duration = 0;
				EB.Videocapture.start();
				
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
					EB.Videocapture.fileName = androidfilepath
				}
				if (isApplePlatform())
				{
					EB.Videocapture.fileName = iphonefilepath
				}	
				if (isWindowsMobilePlatform())
				{
					EB.Videocapture.fileName = wmfilepath
				}					
				EB.Videocapture.duration = -10000;
				EB.Videocapture.start();
				
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
					EB.Videocapture.fileName = androidfilepath
				}
				if (isWindowsMobilePlatform())
				{
					EB.Videocapture.fileName = wmfilepath
				}				
				EB.Videocapture.start();
				
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
					EB.Videocapture.fileName = androidfilepath
				}
				if (isWindowsMobilePlatform())
				{
					EB.Videocapture.fileName = wmfilepath
				}	
				EB.Videocapture.resolution = "high"
				EB.Videocapture.start();
				
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
					EB.Videocapture.fileName = androidfilepath
				}
				if (isWindowsMobilePlatform())
				{
					EB.Videocapture.fileName = wmfilepath
				}				
				EB.Videocapture.setProperty('resolution','low')
				EB.Videocapture.start();
				
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
					EB.Videocapture.fileName = androidfilepath
				}
				if (isWindowsMobilePlatform())
				{
					EB.Videocapture.fileName = wmfilepath
				}				
				EB.Videocapture.setProperties({'resolution' :'high'})
				EB.Videocapture.start();
				
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
					EB.Videocapture.fileName = androidfilepath
				}
				if (isWindowsMobilePlatform())
				{
					EB.Videocapture.fileName = wmfilepath
				}					
				EB.Videocapture.resolution = "abcd"
				EB.Videocapture.start();
				
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
					EB.Videocapture.fileName = androidfilepath
				}
				if (isWindowsMobilePlatform())
				{
					EB.Videocapture.fileName = wmfilepath
				}				
				EB.Videocapture.resolution = null
				EB.Videocapture.start();
				
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
			
				EB.Videocapture.start();
				
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
				EB.Videocapture.saveToGallery = true;
				EB.Videocapture.start();
				
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
				EB.Videocapture.saveToGallery = false;
				EB.Videocapture.start();
				
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
				EB.Videocapture.saveToGallery = true;
				if (isAndroidPlatform())
				{
					EB.Videocapture.filename = "/mnt/sdcard/Rhovideocatpure"
				}
				if (isWindowsMobilePlatform())
				{
					EB.Videocapture.filename = "\Application\Rhovideocatpure"
				}
				EB.Videocapture.start();
				
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
				EB.Videocapture.saveToGallery = abcd;
				EB.Videocapture.start();
				
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
				EB.Videocapture.saveToGallery = null;
				EB.Videocapture.start();
				
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
					EB.Videocapture.fileName = androidfilepath
				}
				if (isApplePlatform())
				{
					iphonefilepath = "\Rhovideocatpure"
					EB.Videocapture.fileName = iphonefilepath
				}	
				if (isWindowsMobilePlatform())
				{
					wmfilepath = "\Rhovideocatpure"
					EB.Videocapture.fileName = wmfilepath
				}				
				EB.Videocapture.start();
				
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
					EB.Videocapture.setProperty('filename',androidfilepath)
				}
				if (isWindowsMobilePlatform())
				{
					wmfilepath = "\Temp\Rhovideocatpure"
					EB.Videocapture.setProperty('filename', wmfilepath)
				}
				if (isApplePlatform())
				{
					iphonefilepath = "/Temp/Rhovideocatpure"
					EB.Videocapture.setProperty('filename', iphonefilepath)
				}			
				EB.Videocapture.start();
				
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
					EB.Videocapture.setProperties({'filename' :androidfilepath})
				}
				if (isWindowsMobilePlatform())
				{
					wmfilepath = "\Temp\Rhovideocatpure"
					EB.Videocapture.setProperties({'filename' :wmfilepath})
				}
				if (isApplePlatform())
				{
					iphonefilepath = "/Temp/Rhovideocatpure"
					EB.Videocapture.setProperties({'filename' :iphonefilepath})
				}				
				EB.Videocapture.start();
				
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
					EB.Videocapture.filename = androidfilepath
				}
				if (isWindowsMobilePlatform())
				{
					wmfilepath = "\Temp\M123$_abc"
					EB.Videocapture.filename = wmfilepath
				}
				if (isApplePlatform())
				{
					iphonefilepath = "/Temp/M123$_abc"
					EB.Videocapture.filename = "/Temp/M123$_abc"
				}
				EB.Videocapture.start();
				
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
					EB.Videocapture.filename = androidfilepath
				}
				if (isWindowsMobilePlatform())
				{
					wmfilepath = "\invalid/Rhovideocatpure"
					EB.Videocapture.filename = wmfilepath
				}
				if (isApplePlatform())
				{
					iphonefilepath = "\invalid/Rhovideocatpure"
					EB.Videocapture.filename = iphonefilepath
				}
				EB.Videocapture.start();
				
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
					EB.Videocapture.filename = androidfilepath
				}
				if (isWindowsMobilePlatform())
				{
					wmfilepath = ""
					EB.Videocapture.filename = wmfilepath
				}
				if (isApplePlatform())
				{
					iphonefilepath = ""
					EB.Videocapture.filename = iphonefilepath
				}
				EB.Videocapture.start();
				
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
							EB.Videocapture.filename = androidfilepath
						}
						if (isApplePlatform())
						{
							iphonefilepath = "/Temp/Rhovideocatpure"
							EB.Videocapture.filename = iphonefilepath
						}
						EB.Videocapture.duration = 10000
						EB.Videocapture.start(videocapturestart_callback);
					});
				}
				if (isWindowsMobilePlatform())
				{
					runs(function()
					{	
						if (isWindowsMobilePlatform())
						{
							wmfilepath = "\Temp\Rhovideocatpure"
							EB.Videocapture.filename = wmfilepath
						}					
						EB.Videocapture.duration = 10000
						EB.Videocapture.start(videocapturestart_callback);
					});
					waitsFor(function(){
					
					},"Waiting For Result",5000);
					
					runs(function()
					{	
						EB.Videocapture.cancel();
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
							EB.Videocapture.filename = androidfilepath
						}
						if (isApplePlatform())
						{
							iphonefilepath = "/Temp/Rhovideocatpure"
							EB.Videocapture.filename = iphonefilepath
						}						
						EB.Videocapture.duration = 10000
						EB.Videocapture.start(videocapturestart_callback);
					});
				}
				if (isWindowsMobilePlatform())
				{
					runs(function()
					{			
						if (isWindowsMobilePlatform())
						{
							wmfilepath = "\Temp\Rhovideocatpure"
							EB.Videocapture.filename = wmfilepath
						}							
						EB.Videocapture.duration = 10000
						EB.Videocapture.start(videocapturestart_callback);
					});
					waitsFor(function(){
					
					},"Waiting For Result",5000);
					
					runs(function()
					{	
						EB.Videocapture.stop();
						EB.Videocapture.cancel();
						
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
				enumData = EB.Videocapture.enumerate(enumerate_callback);
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
				enumData = EB.Videocapture.enumerate();
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
				enumData = EB.Videocapture.enumerate();
				var j = enumData.length-1;
				EB.Videocapture.setDefault(enumData[j]);
				EB.Videocapture.start();
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
				data = EB.Videocapture.getDefault();
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
			EB.Videocapture.setProperties({'filename':'/Temp/Rhovideocapture', 'resolution':'low', 'saveToGallery': true, 'duration': 10000});
			EB.Videocapture.clearAllProperties();
			var data = {};
			data = EB.Videocapture.getAllProperties();
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
			data = EB.Videocapture.getProperties(['filename', 'resolution', 'saveToGallery', 'duration']);
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
				var data = EB.Videocapture.getProperty("filename");
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
			data = EB.Videocapture.getProperties(['filename', 'resolution', 'saveToGallery', 'duration'], callbackgetproperties);
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