describe('Network JS API', function() {
         
   
    var waitTimeout = 90000;
    
    beforeEach(function() {

    });
         
    afterEach(function() {

    });


    it('VT293-0046 | download file from http to sd card using network api', function() {
       var flag = false;
       var callbackCalled = false;
       var status = '';

       var download_file_callback = function (args){
            status = args['status'];
            callbackCalled = true;
       }

       runs( function() {
            

            downloadfileProps = {
                url: 'http://10.233.85.82:9092/network_0049.jpg',
                filename: 'sdcard/Temp/network_0049.jpg',
				overwriteFile: true,
				createFolders: true
            };

            Rho.Network.downloadFile(downloadfileProps, download_file_callback);

        } );

        waitsFor( function() {
                return callbackCalled;
            },
            "Callback never called",
            waitTimeout
        );

        runs(function() {
            expect(status).toEqual('ok');
			expect(Rho.RhoFile.exists("sdcard/Temp/network_0049.jpg")).toEqual(true);
        });
    });
	
	
	it('VT293-0050 |write file to sdcard using File api', function () {
	var fname = 'sdcard/Temp/myfile.txt';
	var file = new Rho.RhoFile(fname, Rho.RhoFile.OPEN_FOR_WRITE);
	   file.write("This is test");
	   file.close();
	   expect(Rho.RhoFile.exists("sdcard/Temp/myfile.txt")).toEqual(true);
   });
    
});