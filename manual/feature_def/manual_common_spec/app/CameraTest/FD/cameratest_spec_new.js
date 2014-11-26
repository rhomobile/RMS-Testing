describe("Camera API Manual Tests", function(){

	describe("Select picture using choosePicture method", function() {
		itFD("should choosePicture with callback status OK", function(){

		});
		itFD("should choosePicture with callback status cancel", function(){

		});
		itFD("should choosePicture with callback status error and errorMessage", function(){

		});
		itFD("should choosePicture with callback and minimize", function(){

		});
		itFD("should choosePicture with callback and suspend the device", function(){

		});
	});

	describe("Enumerate and start the camera(s) on the device and then stop the camera", function() {
		itFD("should enumerate with callback", function(){

		});
		itFD("should startCamera using returned object of enumerate", function(){

		});
		itFD("should stop camera using stopCamera", function(){

		});
	});

	describe("Enable the enumerated camera(s) using startCamera ", function() {
		itFD("should call startCamera and minimize the application", function(){

		});
		itFD("should call startCamera and suspend the device", function(){

		});
		itFD("should call startCamera and quit the application", function(){

		});
	});

	describe("startCamera & takePicture with different properties", function() {
		itFD("should startCamera with cameraMode as CAM_PREVIEW_FULL (default) and Capture", function(){

		});
		itFD("should startCamera with cameraMode as CAM_PREVIEW_FULL and Cancel", function(){

		});
		itFD("should startCamera with cameraMode as CAM_PREVIEW_FULL and screen rotate", function(){

		});
		itFD("should startCamera with cameraMode as CAM_PREVIEW_NORMAL & takePicture", function(){

		});
		itFD("should call startCamera with cameraMode as CAM_PREVIEW_NORMAL & don't take any image", function(){

		});
		itFD("should startCamera with desiredHeight and desiredWidth and takePicture", function(){

		});
		itFD("should startCamera with captureSound and takePicture", function(){

		});
		itFD("should startCamera with flashMode FLASH_ON and takePicture", function(){

		});
		itFD("should startCamera with flashMode FLASH_OFF and takePicture", function(){

		});
		itFD("should startCamera with aimMode AIM_ON", function(){

		});
		itFD("should startCamera with aimMode AIM_OFF", function(){

		});
		itFD("should startCamera with empty string on cameraMode, aimMode & flashMode", function(){

		});
		itFD("should startCamera with all paramaters and takePicture", function(){

		});
		itFD("should startCamera with cameraMode as CAM_PREVIEW_FULL and left,top, height and width set", function(){

		});
	});

	describe("Miscellaneous tests", function() {
		itFD("should show more than one Image in one page", function(){

		});	
		itFD("should persist all the properties set in another page (Persistance Test)", function(){

		});	
	});
	
});