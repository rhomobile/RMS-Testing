var arr_camera_property = [
{
	testName		:	"VT285-1001 | Set  captureSound :localpath and wave file| application/alarm.wav",
	propertyName	:	"captureSound",
	cameraTypes		:	"All",
	OSTypes			:	"WINDOWS",
	propertyValue	:	"file://application/alarm.wav",
	expectedResult	:	"application/alarm.wav"
},
{
	testName		:	"VT285-1001 | Set  captureSound :localpath and wave file | application/alarm.wav",
	propertyName	:	"captureSound",
	cameraTypes		:	"All",
	OSTypes			:	"ANDROID",
	propertyValue	:	"file://application/alarm.wav",
	expectedResult	:	"file://application/alarm.wav"
},
{
	testName		:	"VT285-1001 | Set  captureSound :localpath and wave file | application/alarm.wav",
	propertyName	:	"captureSound",
	cameraTypes		:	"All",
	OSTypes			:	"APPLE",
	propertyValue	:	"file://application/alarm.wav",
	expectedResult	:	"file://application/alarm.wav"
},
{
	testName		:	"VT285-1002 | Set  captureSound :localpath and mp3 file | application/alarm.mp3",
	propertyName	:	"captureSound",
	cameraTypes		:	"All",
	OSTypes			:	"WINDOWS",
	propertyValue	:	"file://application/alarm.mp3",
	expectedResult	:	"application/alarm.mp3"
},
{
	testName		:	"VT285-1002 | Set  captureSound :localpath and mp3 file | application/alarm.mp3",
	propertyName	:	"captureSound",
	cameraTypes		:	"All",
	OSTypes			:	"ANDROID",
	propertyValue	:	"file://application/alarm.mp3",
	expectedResult	:	"file://application/alarm.mp3"
},
{
	testName		:	"VT285-1002 | Set  captureSound :localpath and mp3 file | application/alarm.mp3",
	propertyName	:	"captureSound",
	cameraTypes		:	"All",
	OSTypes			:	"APPLE",
	propertyValue	:	"file://application/alarm.mp3",
	expectedResult	:	"file://application/alarm.mp3"
},
{
	testName		:	"VT285-1003 | Set colorModel :grayscale | grayscale",
	propertyName	:	"colorModel",
	cameraTypes		:	"All",
	OSTypes			:	"ANDROID APPLE",
	propertyValue	:	"grayscale",
	expectedResult	:	"grayscale"
},
{
	testName		:	"VT285-1004 | Set colorModel :rgb | rgb",
	propertyName	:	"colorModel",
	cameraTypes		:	"All",
	OSTypes			:	"ANDROID APPLE",
	propertyValue	:	"rgb",
	expectedResult	:	"rgb"
},
{
	testName		:	"VT285-1005 | Set compressionFormat :png | png",
	propertyName	:	"compressionFormat",
	cameraTypes		:	"All",
	OSTypes			:	"All",
	propertyValue	:	"png",
	expectedResult	:	"png"
},
{
	testName		:	"VT285-1006 | Set compressionFormat :jpg | jpg",
	propertyName	:	"compressionFormat",
	cameraTypes		:	"All",
	OSTypes			:	"All",
	propertyValue	:	"jpg",
	expectedResult	:	"jpg"
},
{
	testName		:	"VT285-1007 | Set desiredHeight :2048 | 2048",
	propertyName	:	"desiredHeight",
	cameraTypes		:	"All",
	OSTypes			:	"All",
	propertyValue	:	"2048",
	expectedResult	:	"2048"
},
{
	testName		:	"VT285-1008 | Set desiredHeight :640 | 640",
	propertyName	:	"desiredHeight",
	cameraTypes		:	"All",
	OSTypes			:	"All",
	propertyValue	:	"640",
	expectedResult	:	"640"
},
{
	testName		:	"VT285-1009 | Set desiredWidth :1536 | 1536",
	propertyName	:	"desiredWidth",
	cameraTypes		:	"All",
	OSTypes			:	"All",
	propertyValue	:	"1536",
	expectedResult	:	"1536"
},
{
	testName		:	"VT285-1010 | Set desiredWidth :480 | 480",
	propertyName	:	"desiredWidth",
	cameraTypes		:	"All",
	OSTypes			:	"All",
	propertyValue	:	"480",
	expectedResult	:	"480"
},
{
	testName		:	"VT285-1011 | Set enableEditing :false | false",
	propertyName	:	"enableEditing",
	cameraTypes		:	"All",
	OSTypes			:	"APPLE",
	propertyValue	:	"false",
	expectedResult	:	"false"
},
{
	testName		:	"VT285-1012 | Set enableEditing :true | true",
	propertyName	:	"enableEditing",
	cameraTypes		:	"All",
	OSTypes			:	"APPLE",
	propertyValue	:	"true",
	expectedResult	:	"true"
},
{
	testName		:	"VT285-1013 | Set fileName :localpath | application/test",
	propertyName	:	"fileName",
	cameraTypes		:	"All",
	OSTypes			:	"WINDOWS",
	propertyValue	:	"file://application/test",
	expectedResult	:	"application/test"
},
{
	testName		:	"VT285-1013 | Set fileName :localpath | application/test",
	propertyName	:	"fileName",
	cameraTypes		:	"All",
	OSTypes			:	"ANDROID",
	propertyValue	:	"file://application/test",
	expectedResult	:	"file://application/test"
},
{
	testName		:	"VT285-1013 | Set fileName :localpath | application/test",
	propertyName	:	"fileName",
	cameraTypes		:	"All",
	OSTypes			:	"APPLE",
	propertyValue	:	"file://application/test",
	expectedResult	:	"file://application/test"
},
{
	testName		:	"VT285-1014 | Set flashMode :on | on",
	propertyName	:	"flashMode",
	cameraTypes		:	"All",
	OSTypes			:	"WINDOWS ANDROID",
	propertyValue	:	"on",
	expectedResult	:	"on"
},
{
	testName		:	"VT285-1015 | Set flashMode :off | off",
	propertyName	:	"flashMode",
	cameraTypes		:	"All",
	OSTypes			:	"WINDOWS ANDROID",
	propertyValue	:	"off",
	expectedResult	:	"off"
},
{
	testName		:	"VT285-1016 | Set flashMode :auto | auto",
	propertyName	:	"flashMode",
	cameraTypes		:	"All",
	OSTypes			:	"WINDOWS ANDROID",
	propertyValue	:	"auto",
	expectedResult	:	"auto"
},
{
	testName		:	"VT285-1017 | Set flashMode :redEye | redEye",
	propertyName	:	"flashMode",
	cameraTypes		:	"All",
	OSTypes			:	"ANDROID",
	propertyValue	:	"redEye",
	expectedResult	:	"redEye"
},
{
	testName		:	"VT285-1018 | Set flashMode :torch | torch",
	propertyName	:	"flashMode",
	cameraTypes		:	"All",
	OSTypes			:	"ANDROID",
	propertyValue	:	"torch",
	expectedResult	:	"torch"
},
{
	testName		:	"VT285-1019 | Set outputFormat :dataUri | dataUri",
	propertyName	:	"outputFormat",
	cameraTypes		:	"All",
	OSTypes			:	"All",
	propertyValue	:	"dataUri",
	expectedResult	:	"dataUri"
},
{
	testName		:	"VT285-1020 | Set outputFormat :image | image",
	propertyName	:	"outputFormat",
	cameraTypes		:	"All",
	OSTypes			:	"All",
	propertyValue	:	"image",
	expectedResult	:	"image"
},
{
	testName		:	"VT285-1021 | Set previewHeight :0 | 0",
	propertyName	:	"previewHeight",
	cameraTypes		:	"All",
	OSTypes			:	"WINDOWS",
	propertyValue	:	"0",
	expectedResult	:	"0"
},
{
	testName		:	"VT285-1022 | Set previewHeight :200 | 200",
	propertyName	:	"previewHeight",
	cameraTypes		:	"All",
	OSTypes			:	"WINDOWS",
	propertyValue	:	"200",
	expectedResult	:	"200"
},
{
	testName		:	"VT285-1023 | Set previewLeft : 0 | 0",
	propertyName	:	"previewLeft",
	cameraTypes		:	"All",
	OSTypes			:	"WINDOWS",
	propertyValue	:	"0",
	expectedResult	:	"0"
},
{
	testName		:	"VT285-1024 | Set previewLeft :300 | 300",
	propertyName	:	"previewLeft",
	cameraTypes		:	"All",
	OSTypes			:	"WINDOWS",
	propertyValue	:	"300",
	expectedResult	:	"300"
},
{
	testName		:	"VT285-1025 | Set previewTop : 0 | 0",
	propertyName	:	"previewTop",
	cameraTypes		:	"All",
	OSTypes			:	"WINDOWS",
	propertyValue	:	"0",
	expectedResult	:	"0"
},
{
	testName		:	"VT285-1026 | Set previewTop :250 | 250",
	propertyName	:	"previewTop",
	cameraTypes		:	"All",
	OSTypes			:	"WINDOWS",
	propertyValue	:	"250",
	expectedResult	:	"250"
},
{
	testName		:	"VT285-1027 | Set previewWidth : 0 | 0",
	propertyName	:	"previewWidth",
	cameraTypes		:	"All",
	OSTypes			:	"WINDOWS",
	propertyValue	:	"0",
	expectedResult	:	"0"
},
{
	testName		:	"VT285-1028 | Set previewWidth :250 | 250",
	propertyName	:	"previewWidth",
	cameraTypes		:	"All",
	OSTypes			:	"WINDOWS",
	propertyValue	:	"250",
	expectedResult	:	"250"
},
{
	testName		:	"VT285-1029 | Set saveToDeviceGallery :true | true",
	propertyName	:	"saveToDeviceGallery",
	cameraTypes		:	"All",
	OSTypes			:	"ANDROID APPLE",
	propertyValue	:	"true",
	expectedResult	:	"true"
},
{
	testName		:	"VT285-1030 | Set saveToDeviceGallery :false | false",
	propertyName	:	"saveToDeviceGallery",
	cameraTypes		:	"All",
	OSTypes			:	"ANDROID APPLE",
	propertyValue	:	"false",
	expectedResult	:	"false"
},
{
	testName		:	"VT285-1031 | Set useSystemViewfinder :true | true",
	propertyName	:	"useSystemViewfinder",
	cameraTypes		:	"All",
	OSTypes			:	"ANDROID",
	propertyValue	:	"true",
	expectedResult	:	"true"
},
{
	testName		:	"VT285-1032 | Set useSystemViewfinder :false | false",
	propertyName	:	"useSystemViewfinder",
	cameraTypes		:	"All",
	OSTypes			:	"ANDROID",
	propertyValue	:	"false",
	expectedResult	:	"false"
}
];

var camCallback = function (data){

};

var getApplicableProperties = function (objCamType){
	
	var deviceCameraType = objCamType.getProperty('cameraType');
	var finalCAMObj = [];

	for (var i = 0; i < arr_camera_property.length ; i++){

		if((arr_camera_property[i]['OSTypes'] == 'All') || (arr_camera_property[i]['OSTypes'].indexOf(Rho.System.platform) != -1)){
			var camType = arr_camera_property[i]['cameraTypes']

			if(camType == "All")
			{ 
				finalCAMObj.push(arr_camera_property[i]);
			}
		}
	}

	return finalCAMObj;
}

var ENABLE_TIMEOUT_VALUE = (Rho.System.platform == "ANDROID" ? 2000 : 2000);