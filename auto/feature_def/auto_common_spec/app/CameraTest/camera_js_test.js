var arr_camera_property = [
{
	testName		:	"Set  captureSound :localpath and wave file | application/alarm.wav",
	propertyName	:	"captureSound",
	cameraTypes		:	"All",
	OSTypes			:	"WINDOWS",
	propertyValue	:	"//application/alarm.wav",
	expectedResult	:	"//application/alarm.wav"
},
{
	testName		:	"Set  captureSound :localpath and mp3 file | application/alarm.mp3",
	propertyName	:	"captureSound",
	cameraTypes		:	"All",
	OSTypes			:	"ANDROID",
	propertyValue	:	"/mnt/sdcard/alarm.mp3",
	expectedResult	:	"/mnt/sdcard/alarm.mp3"
},
{
	testName		:	"Set colorModel :grayscale | grayscale",
	propertyName	:	"colorModel",
	cameraTypes		:	"All",
	OSTypes			:	"ANDROID APPLE",
	propertyValue	:	"grayscale",
	expectedResult	:	"grayscale"
},
{
	testName		:	"Set colorModel :rgb | rgb",
	propertyName	:	"colorModel",
	cameraTypes		:	"All",
	OSTypes			:	"ANDROID APPLE",
	propertyValue	:	"rgb",
	expectedResult	:	"rgb"
},
{
	testName		:	"Set color_model :grayscale | grayscale",
	propertyName	:	"color_model",
	cameraTypes		:	"All",
	OSTypes			:	"ANDROID APPLE",
	propertyValue	:	"grayscale",
	expectedResult	:	"grayscale"
},
{
	testName		:	"Set color_model :rgb | rgb",
	propertyName	:	"color_model",
	cameraTypes		:	"All",
	OSTypes			:	"ANDROID APPLE",
	propertyValue	:	"rgb",
	expectedResult	:	"rgb"
},
{
	testName		:	"Set compressionFormat :png | png",
	propertyName	:	"compressionFormat",
	cameraTypes		:	"All",
	OSTypes			:	"Apple",
	propertyValue	:	"png",
	expectedResult	:	"png"
},
{
	testName		:	"Set compressionFormat :jpg | jpg",
	propertyName	:	"compressionFormat",
	cameraTypes		:	"All",
	OSTypes			:	"All",
	propertyValue	:	"jpg",
	expectedResult	:	"jpg"
},
{
	testName		:	"Set format :png | png",
	propertyName	:	"format",
	cameraTypes		:	"All",
	OSTypes			:	"Apple",
	propertyValue	:	"png",
	expectedResult	:	"png"
},
{
	testName		:	"Set format :jpg | jpg",
	propertyName	:	"format",
	cameraTypes		:	"All",
	OSTypes			:	"All",
	propertyValue	:	"jpg",
	expectedResult	:	"jpg"
},
{
	testName		:	"Set desiredHeight :2048 | 2048",
	propertyName	:	"desiredHeight",
	cameraTypes		:	"All",
	OSTypes			:	"APPLE",
	propertyValue	:	"2048",
	expectedResult	:	"2048"
},
{
	testName		:	"Set desiredHeight :640 | 640",
	propertyName	:	"desiredHeight",
	cameraTypes		:	"All",
	OSTypes			:	"APPLE",
	propertyValue	:	"640",
	expectedResult	:	"640"
},
{
	testName		:	"Set desired_height :2048 | 2048",
	propertyName	:	"desired_height",
	cameraTypes		:	"All",
	OSTypes			:	"APPLE",
	propertyValue	:	"2048",
	expectedResult	:	"2048"
},
{
	testName		:	"Set desired_height :640 | 640",
	propertyName	:	"desired_height",
	cameraTypes		:	"All",
	OSTypes			:	"APPLE",
	propertyValue	:	"640",
	expectedResult	:	"640"
},
{
	testName		:	"Set desiredWidth :1536 | 1536",
	propertyName	:	"desiredWidth",
	cameraTypes		:	"All",
	OSTypes			:	"APPLE",
	propertyValue	:	"1536",
	expectedResult	:	"1536"
},
{
	testName		:	"Set desiredWidth :480 | 480",
	propertyName	:	"desiredWidth",
	cameraTypes		:	"All",
	OSTypes			:	"APPLE",
	propertyValue	:	"480",
	expectedResult	:	"480"
},
{
	testName		:	"Set desired_width :1536 | 1536",
	propertyName	:	"desired_width",
	cameraTypes		:	"All",
	OSTypes			:	"APPLE",
	propertyValue	:	"1536",
	expectedResult	:	"1536"
},
{
	testName		:	"Set desired_width :480 | 480",
	propertyName	:	"desired_width",
	cameraTypes		:	"All",
	OSTypes			:	"APPLE",
	propertyValue	:	"480",
	expectedResult	:	"480"
},
{
	testName		:	"Set enableEditing :false | false",
	propertyName	:	"enableEditing",
	cameraTypes		:	"All",
	OSTypes			:	"APPLE",
	propertyValue	:	"false",
	expectedResult	:	"false"
},
{
	testName		:	"Set enableEditing :true | true",
	propertyName	:	"enableEditing",
	cameraTypes		:	"All",
	OSTypes			:	"APPLE",
	propertyValue	:	"true",
	expectedResult	:	"true"
},
{
	testName		:	"Set enable_editing :false | false",
	propertyName	:	"enable_editing",
	cameraTypes		:	"All",
	OSTypes			:	"APPLE",
	propertyValue	:	"false",
	expectedResult	:	"false"
},
{
	testName		:	"Set enable_editing :true | true",
	propertyName	:	"enable_editing",
	cameraTypes		:	"All",
	OSTypes			:	"APPLE",
	propertyValue	:	"true",
	expectedResult	:	"true"
},
{
	testName		:	"Set fileName :localpath | application/test",
	propertyName	:	"fileName",
	cameraTypes		:	"All",
	OSTypes			:	"WINDOWS",
	propertyValue	:	"//application/test",
	expectedResult	:	"\\//application/test"
},
{
	testName		:	"Set fileName :localpath | /mnt/sdcard/test",
	propertyName	:	"fileName",
	cameraTypes		:	"All",
	OSTypes			:	"ANDROID",
	propertyValue	:	"/mnt/sdcard/test",
	expectedResult	:	"/mnt/sdcard/test"
},
{
	testName		:	"Set fileName :with special charecter | camera@$123",
	propertyName	:	"fileName",
	cameraTypes		:	"All",
	OSTypes			:	"WINDOWS",
	propertyValue	:	"camera@$123",
	expectedResult	:	"\\camera@$123"
},
{
	testName		:	"Set fileName :with special charecter | camera@$123",
	propertyName	:	"fileName",
	cameraTypes		:	"All",
	OSTypes			:	"ANDROID APPLE WP8",
	propertyValue	:	"camera@$123",
	expectedResult	:	"camera@$123"
},
{
	testName		:	"Set flashMode :on | on",
	propertyName	:	"flashMode",
	cameraTypes		:	"All",
	OSTypes			:	"All",
	propertyValue	:	"on",
	expectedResult	:	"on"
},
{
	testName		:	"Set flashMode :off | off",
	propertyName	:	"flashMode",
	cameraTypes		:	"All",
	OSTypes			:	"All",
	propertyValue	:	"off",
	expectedResult	:	"off"
},
{
	testName		:	"Set flash_mode :on | on",
	propertyName	:	"flash_mode",
	cameraTypes		:	"All",
	OSTypes			:	"All",
	propertyValue	:	"on",
	expectedResult	:	"on"
},
{
	testName		:	"Set flash_mode :off | off",
	propertyName	:	"flash_mode",
	cameraTypes		:	"All",
	OSTypes			:	"All",
	propertyValue	:	"off",
	expectedResult	:	"off"
},
{
	testName		:	"Set AimMode :on | on",
	propertyName	:	"AimMode",
	cameraTypes		:	"imager",
	OSTypes			:	"WINDOWS",
	propertyValue	:	"on",
	expectedResult	:	"on"
},
{
	testName		:	"Set AimMode :off | off",
	propertyName	:	"AimMode",
	cameraTypes		:	"imager",
	OSTypes			:	"WINDOWS",
	propertyValue	:	"off",
	expectedResult	:	"off"
},
{
	testName		:	"Set flashMode :auto | auto",
	propertyName	:	"flashMode",
	cameraTypes		:	"All",
	OSTypes			:	"ANDROID APPLE WP8",
	propertyValue	:	"auto",
	expectedResult	:	"auto"
},
{
	testName		:	"Set flashMode :redEye | redEye (applicable only if device supports)",
	propertyName	:	"flashMode",
	cameraTypes		:	"All",
	OSTypes			:	"ANDROID WP8",
	propertyValue	:	"redEye",
	expectedResult	:	"redEye"
},
{
	testName		:	"Set flashMode :torch | torch",
	propertyName	:	"flashMode",
	cameraTypes		:	"All",
	OSTypes			:	"ANDROID",
	propertyValue	:	"torch",
	expectedResult	:	"torch"
},
{
	testName		:	"Set flash_mode :auto | auto",
	propertyName	:	"flash_mode",
	cameraTypes		:	"All",
	OSTypes			:	"ANDROID APPLE WP8",
	propertyValue	:	"auto",
	expectedResult	:	"auto"
},
{
	testName		:	"Set flash_mode :redEye | redEye (applicable only if device supports)",
	propertyName	:	"flash_mode",
	cameraTypes		:	"All",
	OSTypes			:	"ANDROID WP8",
	propertyValue	:	"redEye",
	expectedResult	:	"redEye"
},
{
	testName		:	"Set flash_mode :torch | torch",
	propertyName	:	"flash_mode",
	cameraTypes		:	"All",
	OSTypes			:	"ANDROID",
	propertyValue	:	"torch",
	expectedResult	:	"torch"
},
{
	testName		:	"Set outputFormat :dataUri | dataUri",
	propertyName	:	"outputFormat",
	cameraTypes		:	"All",
	OSTypes			:	"All",
	propertyValue	:	"dataUri",
	expectedResult	:	"dataUri"
},
{
	testName		:	"Set outputFormat :image | image",
	propertyName	:	"outputFormat",
	cameraTypes		:	"All",
	OSTypes			:	"All",
	propertyValue	:	"image",
	expectedResult	:	"image"
},
{
	testName		:	"Set previewHeight :0 | 0",
	propertyName	:	"previewHeight",
	cameraTypes		:	"All",
	OSTypes			:	"WINDOWS",
	propertyValue	:	"0",
	expectedResult	:	"0"
},
{
	testName		:	"Set previewHeight :200 | 200",
	propertyName	:	"previewHeight",
	cameraTypes		:	"All",
	OSTypes			:	"WINDOWS",
	propertyValue	:	"200",
	expectedResult	:	"200"
},
{
	testName		:	"Set previewHeight :-200 | -200",
	propertyName	:	"previewHeight",
	cameraTypes		:	"All",
	OSTypes			:	"WINDOWS",
	propertyValue	:	"-200",
	expectedResult	:	"-200"
},
{
	testName		:	"Set previewLeft : 0 | 0",
	propertyName	:	"previewLeft",
	cameraTypes		:	"All",
	OSTypes			:	"WINDOWS",
	propertyValue	:	"0",
	expectedResult	:	"0"
},
{
	testName		:	"Set previewLeft :300 | 300",
	propertyName	:	"previewLeft",
	cameraTypes		:	"All",
	OSTypes			:	"WINDOWS",
	propertyValue	:	"300",
	expectedResult	:	"300"
},
{
	testName		:	"Set previewLeft : 0 | 0",
	propertyName	:	"previewLeft",
	cameraTypes		:	"All",
	OSTypes			:	"WINDOWS",
	propertyValue	:	"0",
	expectedResult	:	"0"
},
{
	testName		:	"Set previewLeft :-300 | -300",
	propertyName	:	"previewLeft",
	cameraTypes		:	"All",
	OSTypes			:	"WINDOWS",
	propertyValue	:	"-300",
	expectedResult	:	"-300"
},
{
	testName		:	"Set left :300 | 300",
	propertyName	:	"left",
	cameraTypes		:	"All",
	OSTypes			:	"WINDOWS",
	propertyValue	:	"300",
	expectedResult	:	"300"
},
{
	testName		:	"Set previewTop : 0 | 0",
	propertyName	:	"previewTop",
	cameraTypes		:	"All",
	OSTypes			:	"WINDOWS",
	propertyValue	:	"0",
	expectedResult	:	"0"
},
{
	testName		:	"Set previewTop :250 | 250",
	propertyName	:	"previewTop",
	cameraTypes		:	"All",
	OSTypes			:	"WINDOWS",
	propertyValue	:	"250",
	expectedResult	:	"250"
},
{
	testName		:	"Set top : 0 | 0",
	propertyName	:	"top",
	cameraTypes		:	"All",
	OSTypes			:	"WINDOWS",
	propertyValue	:	"0",
	expectedResult	:	"0"
},
{
	testName		:	"Set top :250 | 250",
	propertyName	:	"top",
	cameraTypes		:	"All",
	OSTypes			:	"WINDOWS",
	propertyValue	:	"250",
	expectedResult	:	"250"
},
{
	testName		:	"Set previewTop :-250 | -250",
	propertyName	:	"previewTop",
	cameraTypes		:	"All",
	OSTypes			:	"WINDOWS",
	propertyValue	:	"-250",
	expectedResult	:	"-250"
},
{
	testName		:	"Set previewWidth : 0 | 0",
	propertyName	:	"previewWidth",
	cameraTypes		:	"All",
	OSTypes			:	"WINDOWS",
	propertyValue	:	"0",
	expectedResult	:	"0"
},
{
	testName		:	"Set previewWidth :250 | 250",
	propertyName	:	"previewWidth",
	cameraTypes		:	"All",
	OSTypes			:	"WINDOWS",
	propertyValue	:	"250",
	expectedResult	:	"250"
},
{
	testName		:	"Set previewWidth :-250 | -250",
	propertyName	:	"previewWidth",
	cameraTypes		:	"All",
	OSTypes			:	"WINDOWS",
	propertyValue	:	"-250",
	expectedResult	:	"-250"
},
{
	testName		:	"Set saveToDeviceGallery :true | true",
	propertyName	:	"saveToDeviceGallery",
	cameraTypes		:	"All",
	OSTypes			:	"ANDROID APPLE",
	propertyValue	:	"true",
	expectedResult	:	"true"
},
{
	testName		:	"Set saveToDeviceGallery :false | false",
	propertyName	:	"saveToDeviceGallery",
	cameraTypes		:	"All",
	OSTypes			:	"ANDROID APPLE",
	propertyValue	:	"false",
	expectedResult	:	"false"
},
{
	testName		:	"Set useSystemViewfinder :true | true",
	propertyName	:	"useSystemViewfinder",
	cameraTypes		:	"All",
	OSTypes			:	"ANDROID",
	propertyValue	:	"true",
	expectedResult	:	"true"
},
{
	testName		:	"Set useSystemViewfinder :false | false",
	propertyName	:	"useSystemViewfinder",
	cameraTypes		:	"All",
	OSTypes			:	"ANDROID",
	propertyValue	:	"false",
	expectedResult	:	"false"
}
];

var arr_camera_property_inval = [
{
	testName		:	"Set  captureSound :empty",
	propertyName	:	"captureSound",
	cameraTypes		:	"All",
	OSTypes			:	"WINDOWS",
	DefaultValue    :   "//application/alarm2.wav",
	propertyValue	:	"",
	expectedResult	:	""
},
{
	testName		:	"Set  captureSound :empty ",
	propertyName	:	"captureSound",
	cameraTypes		:	"All",
	OSTypes			:	"ANDROID",
	DefaultValue    :   "/mnt/sdcard/alarm.mp3",
	propertyValue	:	"",
	expectedResult	:	""
},
{
	testName		:	"Set colorModel :invalid",
	propertyName	:	"colorModel",
	cameraTypes		:	"All",
	OSTypes			:	"ANDROID APPLE",
	DefaultValue    :   "rgb",
	propertyValue	:	"inval",
	expectedResult	:	"rgb"
},
{
	testName		:	"Set colorModel :empty",
	propertyName	:	"colorModel",
	cameraTypes		:	"All",
	OSTypes			:	"ANDROID APPLE",
	DefaultValue    :   "rgb",
	propertyValue	:	"",
	expectedResult	:	"rgb"
},
{
	testName		:	"Set compressionFormat :invalid",
	propertyName	:	"compressionFormat",
	cameraTypes		:	"All",
	OSTypes			:	"All",
	DefaultValue    :   "jpg",
	propertyValue	:	"inval",
	expectedResult	:	"jpg"
},
{
	testName		:	"Set compressionFormat :empty",
	propertyName	:	"compressionFormat",
	cameraTypes		:	"All",
	OSTypes			:	"All",
	DefaultValue    :   "jpg",
	propertyValue	:	"",
	expectedResult	:	"jpg"
},
/*{
	testName		:	"Set desiredHeight :empty value | empty value",
	propertyName	:	"desiredHeight",
	cameraTypes		:	"All",
	OSTypes			:	"All",
	DefaultValue    :   "360",
	propertyValue	:	"",
	expectedResult	:	"360"
},
{
	testName		:	"Set desiredWidth :empty value| empty value",
	propertyName	:	"desiredWidth",
	cameraTypes		:	"All",
	OSTypes			:	"All",
	DefaultValue    :   "480",
	propertyValue	:	"",
	expectedResult	:	"480"
},*/
{
	testName		:	"Set enableEditing : invalid",
	propertyName	:	"enableEditing",
	cameraTypes		:	"All",
	OSTypes			:	"APPLE",
	DefaultValue    :   "true",
	propertyValue	:	"inval",
	expectedResult	:	"true"
},
{
	testName		:	"Set enableEditing :empty",
	propertyName	:	"enableEditing",
	cameraTypes		:	"All",
	OSTypes			:	"APPLE",
	DefaultValue    :   "true",
	propertyValue	:	"",
	expectedResult	:	"true"
},
{
	testName		:	"Set AimMode :invalid  | invalid",
	propertyName	:	"AimMode",
	cameraTypes		:	"imager",
	OSTypes			:	"WINDOWS",
	DefaultValue    :   "off",
	propertyValue	:	"onn",
	expectedResult	:	"off"
},
{
	testName		:	"Set AimMode :empty  | empty",
	propertyName	:	"AimMode",
	cameraTypes		:	"imager",
	OSTypes			:	"WINDOWS",
	DefaultValue    :   "off",
	propertyValue	:	"",
	expectedResult	:	"off"
},
{
	testName		:	"Set flashMode :invalid value | invalid value",
	propertyName	:	"flashMode",
	cameraTypes		:	"All",
	OSTypes			:	"All",
	DefaultValue    :   "off",
	propertyValue	:	"onn",
	expectedResult	:	"off"
},
{
	testName		:	"Set flashMode :empty value | empty value",
	propertyName	:	"flashMode",
	cameraTypes		:	"All",
	OSTypes			:	"All",
	DefaultValue    :   "off",
	propertyValue	:	"",
	expectedResult	:	"off"
},
{
	testName		:	"Set outputFormat :invalid| invalid",
	propertyName	:	"outputFormat",
	cameraTypes		:	"All",
	OSTypes			:	"All",
	DefaultValue    :   "image",
	propertyValue	:	"inval",
	expectedResult	:	"image"
},
{
	testName		:	"Set outputFormat :empty| empty",
	propertyName	:	"outputFormat",
	cameraTypes		:	"All",
	OSTypes			:	"All",
	DefaultValue    :   "image",
	propertyValue	:	"",
	expectedResult	:	"image"
},
{
	testName		:	"Set useSystemViewfinder :invalid | invalid",
	propertyName	:	"useSystemViewfinder",
	cameraTypes		:	"All",
	OSTypes			:	"ANDROID",
	DefaultValue    :   "false",
	propertyValue	:	"abc",
	expectedResult	:	"false"
},
{
	testName		:	"Set useSystemViewfinder :empty | empty",
	propertyName	:	"useSystemViewfinder",
	cameraTypes		:	"All",
	OSTypes			:	"ANDROID",
	DefaultValue    :   "false",
	propertyValue	:	"",
	expectedResult	:	"false"
}
];

var camCallback = function (data){
	getcallbackdata = data;
	callbackstatus = true; 
};

var getApplicableProperties = function (objCamType){
	var deviceCameraType = objCamType.getProperty('cameraType');
	var finalCAMObj1 = [];
	for (var i = 0; i < arr_camera_property.length ; i++){
		if((arr_camera_property[i]['OSTypes'] == 'All') || (arr_camera_property[i]['OSTypes'].indexOf(Rho.System.platform) != -1)){
			var camType = arr_camera_property[i]['cameraTypes']
			if(camType == "All")
			{ 
				finalCAMObj1.push(arr_camera_property[i]);
			}
		}
	}
	return finalCAMObj1;
}

var getApplicableInvalidProperties = function (objCamType){
	var deviceCameraType = objCamType.getProperty('cameraType');
	var finalCAMObj2 = [];
	for (var i = 0; i < arr_camera_property_inval.length ; i++){
		if((arr_camera_property_inval[i]['OSTypes'] == 'All') || (arr_camera_property_inval[i]['OSTypes'].indexOf(Rho.System.platform) != -1)){
			var camType = arr_camera_property_inval[i]['cameraTypes']
			if(camType == "All")
			{ 
				finalCAMObj2.push(arr_camera_property_inval[i]);
			}
		}
	}
	return finalCAMObj2;
}

var ENABLE_TIMEOUT_VALUE = (Rho.System.platform == "ANDROID" ? 2000 : 2000);