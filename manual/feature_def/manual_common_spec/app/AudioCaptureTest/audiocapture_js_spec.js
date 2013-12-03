var androidFilepath = Rho.RhoFile.join(Rho.Application.userFolder, 'captured.mp3'); // "/mnt/sdcard/videofile";

function playaudio() {
        Rho.Mediaplayer.startvideo(androidfilepath);
}

describe("Audio Capture Test", function () {
    beforeEach(function () {
        captured = false;

    });

    afterEach(function () {
        /* ... Tear it down ... */
    });

    if (isAndroidPlatform()) {
        it("VT***-***1 | Start audio capture", function () {
            runs(function () {
                Rho.AudioCapture.destination =  androidFilepath();
                Rho.AudioCapture.start();
            });

            waitsFor(function () {
                return captured;
            }, "Waiting For Result", 180000);


            runs(function () {
                expect(testResult).toEqual(true);
            });

        });


        /*	it("VT281-0678 | Start videoCapture with callback  |", function() {
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
         });	*/

    }
});