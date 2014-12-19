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
	OSTypes			:	"WINDOWS",
	propertyValue	:	"file://application/alarm.wav",
	expectedResult	:	"file://application/alarm.wav"
},
/*{
	testName		:	"VT285-1001 | Set  captureSound :localpath and wave file | application/alarm.wav",
	propertyName	:	"captureSound",
	cameraTypes		:	"All",
	OSTypes			:	"APPLE",
	propertyValue	:	"file://application/alarm.wav",
	expectedResult	:	"file://application/alarm.wav"
},*/
{
	testName		:	"VT285-1002 | Set  captureSound :localpath and mp3 file | application/alarm.mp3",
	propertyName	:	"captureSound",
	cameraTypes		:	"All",
	OSTypes			:	"ANDROID",
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
/*{
	testName		:	"VT285-1002 | Set  captureSound :localpath and mp3 file | application/alarm.mp3",
	propertyName	:	"captureSound",
	cameraTypes		:	"All",
	OSTypes			:	"APPLE",
	propertyValue	:	"file://application/alarm.mp3",
	expectedResult	:	"file://application/alarm.mp3"
},*/
{
	testName		:	"VT285-1001 | Set  captureSound :invalid path",
	propertyName	:	"captureSound",
	cameraTypes		:	"All",
	OSTypes			:	"WINDOWS",
	propertyValue	:	"file://application/inval",
	expectedResult	:	"file://application/inval"
},
{
	testName		:	"VT285-1001 | Set  captureSound :empty",
	propertyName	:	"captureSound",
	cameraTypes		:	"All",
	OSTypes			:	"WINDOWS",
	propertyValue	:	"",
	expectedResult	:	""
},
{
	testName		:	"VT285-1002 | Set  captureSound :invalid path ",
	propertyName	:	"captureSound",
	cameraTypes		:	"All",
	OSTypes			:	"ANDROID",
	propertyValue	:	"file://application/inval",
	expectedResult	:	"file://application/inval"
},
{
	testName		:	"VT285-1002 | Set  captureSound :empty ",
	propertyName	:	"captureSound",
	cameraTypes		:	"All",
	OSTypes			:	"ANDROID",
	propertyValue	:	"",
	expectedResult	:	""
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
	testName		:	"VT285-1003 | Set color_model :grayscale | grayscale",
	propertyName	:	"color_model",
	cameraTypes		:	"All",
	OSTypes			:	"ANDROID APPLE",
	propertyValue	:	"grayscale",
	expectedResult	:	"grayscale"
},
{
	testName		:	"VT285-1004 | Set color_model :rgb | rgb",
	propertyName	:	"color_model",
	cameraTypes		:	"All",
	OSTypes			:	"ANDROID APPLE",
	propertyValue	:	"rgb",
	expectedResult	:	"rgb"
},
{
	testName		:	"VT285-1003 | Set colorModel :invalid",
	propertyName	:	"colorModel",
	cameraTypes		:	"All",
	OSTypes			:	"ANDROID APPLE",
	propertyValue	:	"inval",
	expectedResult	:	"inval"
},
{
	testName		:	"VT285-1004 | Set colorModel :empty",
	propertyName	:	"colorModel",
	cameraTypes		:	"All",
	OSTypes			:	"ANDROID APPLE",
	propertyValue	:	"",
	expectedResult	:	""
},
{
	testName		:	"VT285-1005 | Set compressionFormat :png | png",
	propertyName	:	"compressionFormat",
	cameraTypes		:	"All",
	OSTypes			:	"Android Apple Windows",
	propertyValue	:	"png",
	expectedResult	:	"png"
},
{
	testName		:	"VT285-1006 | Set compressionFormat :jpg | jpg",
	propertyName	:	"compressionFormat",
	cameraTypes		:	"All",
	OSTypes			:	"Android Apple Windows",
	propertyValue	:	"jpg",
	expectedResult	:	"jpg"
},
{
	testName		:	"VT285-1005 | Set compressionFormat :invalid",
	propertyName	:	"compressionFormat",
	cameraTypes		:	"All",
	OSTypes			:	"Android Apple Windows",
	propertyValue	:	"inval",
	expectedResult	:	"inval"
},
{
	testName		:	"VT285-1006 | Set compressionFormat :empty",
	propertyName	:	"compressionFormat",
	cameraTypes		:	"All",
	OSTypes			:	"Android Apple Windows",
	propertyValue	:	"",
	expectedResult	:	""
},
{
	testName		:	"VT285-1005 | Set format :png | png",
	propertyName	:	"format",
	cameraTypes		:	"All",
	OSTypes			:	"Android Apple Windows",
	propertyValue	:	"png",
	expectedResult	:	"png"
},
{
	testName		:	"VT285-1006 | Set format :jpg | jpg",
	propertyName	:	"format",
	cameraTypes		:	"All",
	OSTypes			:	"Android Apple Windows",
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
	testName		:	"VT285-1007 | Set desired_height :2048 | 2048",
	propertyName	:	"desired_height",
	cameraTypes		:	"All",
	OSTypes			:	"All",
	propertyValue	:	"2048",
	expectedResult	:	"2048"
},
{
	testName		:	"VT285-1008 | Set desired_height :640 | 640",
	propertyName	:	"desired_height",
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
	testName		:	"VT285-1009 | Set desired_width :1536 | 1536",
	propertyName	:	"desired_width",
	cameraTypes		:	"All",
	OSTypes			:	"All",
	propertyValue	:	"1536",
	expectedResult	:	"1536"
},
{
	testName		:	"VT285-1010 | Set desired_width :480 | 480",
	propertyName	:	"desired_width",
	cameraTypes		:	"All",
	OSTypes			:	"All",
	propertyValue	:	"480",
	expectedResult	:	"480"
},
{
	testName		:	"VT285-1007 | Set desiredHeight :-2048 | -2048",
	propertyName	:	"desiredHeight",
	cameraTypes		:	"All",
	OSTypes			:	"All",
	propertyValue	:	"-2048",
	expectedResult	:	"-2048"
},
{
	testName		:	"VT285-1008 | Set desiredHeight :-640 | -640",
	propertyName	:	"desiredHeight",
	cameraTypes		:	"All",
	OSTypes			:	"All",
	propertyValue	:	"-640",
	expectedResult	:	"-640"
},
{
	testName		:	"VT285-1009 | Set desiredWidth :-1536 | -1536",
	propertyName	:	"desiredWidth",
	cameraTypes		:	"All",
	OSTypes			:	"All",
	propertyValue	:	"-1536",
	expectedResult	:	"-1536"
},
{
	testName		:	"VT285-1010 | Set desiredWidth :-480 | -480",
	propertyName	:	"desiredWidth",
	cameraTypes		:	"All",
	OSTypes			:	"All",
	propertyValue	:	"-480",
	expectedResult	:	"-480"
},
{
	testName		:	"VT285-1008 | Set desiredHeight :empty value | empty value",
	propertyName	:	"desiredHeight",
	cameraTypes		:	"All",
	OSTypes			:	"All",
	propertyValue	:	"",
	expectedResult	:	""
},
{
	testName		:	"VT285-1010 | Set desiredWidth :empty value| empty value",
	propertyName	:	"desiredWidth",
	cameraTypes		:	"All",
	OSTypes			:	"All",
	propertyValue	:	"",
	expectedResult	:	""
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
	testName		:	"VT285-1011 | Set enable_editing :false | false",
	propertyName	:	"enable_editing",
	cameraTypes		:	"All",
	OSTypes			:	"APPLE",
	propertyValue	:	"false",
	expectedResult	:	"false"
},
{
	testName		:	"VT285-1012 | Set enable_editing :true | true",
	propertyName	:	"enable_editing",
	cameraTypes		:	"All",
	OSTypes			:	"APPLE",
	propertyValue	:	"true",
	expectedResult	:	"true"
},
{
	testName		:	"VT285-1011 | Set enableEditing : invalid",
	propertyName	:	"enableEditing",
	cameraTypes		:	"All",
	OSTypes			:	"APPLE",
	propertyValue	:	"inval",
	expectedResult	:	"inval"
},
{
	testName		:	"VT285-1012 | Set enableEditing :empty",
	propertyName	:	"enableEditing",
	cameraTypes		:	"All",
	OSTypes			:	"APPLE",
	propertyValue	:	"",
	expectedResult	:	""
},
{
	testName		:	"VT285-1013 | Set fileName :localpath | application/test",
	propertyName	:	"fileName",
	cameraTypes		:	"All",
	OSTypes			:	"All",
	propertyValue	:	"file://application/test",
	expectedResult	:	"application/test"
},
{
	testName		:	"VT285-1013 | Set fileName :invalid path | invalid path",
	propertyName	:	"fileName",
	cameraTypes		:	"All",
	OSTypes			:	"All",
	propertyValue	:	"file://application/InvalidFolder",
	expectedResult	:	"file://application/InvalidFolder"
},
{
	testName		:	"VT285-1013 | Set fileName :with special charecter | camera@$123",
	propertyName	:	"fileName",
	cameraTypes		:	"All",
	OSTypes			:	"All",
	propertyValue	:	"camera@$123",
	expectedResult	:	"camera@$123"
},
{
	testName		:	"VT285-1013 | Set fileName :empty path | empty path",
	propertyName	:	"fileName",
	cameraTypes		:	"All",
	OSTypes			:	"All",
	propertyValue	:	"",
	expectedResult	:	""
},
/*{
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
},*/
{
	testName		:	"VT285-1014 | Set flashMode :on | on",
	propertyName	:	"flashMode",
	cameraTypes		:	"All",
	OSTypes			:	"All",
	propertyValue	:	"on",
	expectedResult	:	"on"
},
{
	testName		:	"VT285-1015 | Set flashMode :off | off",
	propertyName	:	"flashMode",
	cameraTypes		:	"All",
	OSTypes			:	"All",
	propertyValue	:	"off",
	expectedResult	:	"off"
},
{
	testName		:	"VT285-1014 | Set flash_mode :on | on",
	propertyName	:	"flash_mode",
	cameraTypes		:	"All",
	OSTypes			:	"All",
	propertyValue	:	"on",
	expectedResult	:	"on"
},
{
	testName		:	"VT285-1015 | Set flash_mode :off | off",
	propertyName	:	"flash_mode",
	cameraTypes		:	"All",
	OSTypes			:	"All",
	propertyValue	:	"off",
	expectedResult	:	"off"
},
{
	testName		:	"VT285-1014 | Set AimMode :on | on",
	propertyName	:	"AimMode",
	cameraTypes		:	"All",
	OSTypes			:	"WINDOWS",
	propertyValue	:	"on",
	expectedResult	:	"on"
},
{
	testName		:	"VT285-1015 | Set AimMode :off | off",
	propertyName	:	"AimMode",
	cameraTypes		:	"All",
	OSTypes			:	"WINDOWS",
	propertyValue	:	"off",
	expectedResult	:	"off"
},
{
	testName		:	"VT285-1014 | Set AimMode :invalid  | invalid",
	propertyName	:	"AimMode",
	cameraTypes		:	"All",
	OSTypes			:	"WINDOWS",
	propertyValue	:	"onn",
	expectedResult	:	"onn"
},
{
	testName		:	"VT285-1016 | Set flashMode :auto | auto",
	propertyName	:	"flashMode",
	cameraTypes		:	"All",
	OSTypes			:	"ANDROID",
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
	testName		:	"VT285-1016 | Set flash_mode :auto | auto",
	propertyName	:	"flash_mode",
	cameraTypes		:	"All",
	OSTypes			:	"ANDROID",
	propertyValue	:	"auto",
	expectedResult	:	"auto"
},
{
	testName		:	"VT285-1017 | Set flash_mode :redEye | redEye",
	propertyName	:	"flash_mode",
	cameraTypes		:	"All",
	OSTypes			:	"ANDROID",
	propertyValue	:	"redEye",
	expectedResult	:	"redEye"
},
{
	testName		:	"VT285-1014 | Set flashMode :invalid value | invalid value",
	propertyName	:	"flashMode",
	cameraTypes		:	"All",
	OSTypes			:	"All",
	propertyValue	:	"onn",
	expectedResult	:	"onn"
},
{
	testName		:	"VT285-1014 | Set flashMode :empty value | empty value",
	propertyName	:	"flashMode",
	cameraTypes		:	"All",
	OSTypes			:	"All",
	propertyValue	:	"",
	expectedResult	:	""
},
{
	testName		:	"VT285-1018 | Set flash_mode :torch | torch",
	propertyName	:	"flash_mode",
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
	testName		:	"VT285-1019 | Set outputFormat :invalid| invalid",
	propertyName	:	"outputFormat",
	cameraTypes		:	"All",
	OSTypes			:	"All",
	propertyValue	:	"inval",
	expectedResult	:	"inval"
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
	testName		:	"VT285-1022 | Set previewHeight :-200 | -200",
	propertyName	:	"previewHeight",
	cameraTypes		:	"All",
	OSTypes			:	"WINDOWS",
	propertyValue	:	"-200",
	expectedResult	:	"-200"
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
	testName		:	"VT285-1023 | Set previewLeft : 0 | 0",
	propertyName	:	"previewLeft",
	cameraTypes		:	"All",
	OSTypes			:	"WINDOWS",
	propertyValue	:	"0",
	expectedResult	:	"0"
},
{
	testName		:	"VT285-1024 | Set previewLeft :-300 | -300",
	propertyName	:	"previewLeft",
	cameraTypes		:	"All",
	OSTypes			:	"WINDOWS",
	propertyValue	:	"-300",
	expectedResult	:	"-300"
},
{
	testName		:	"VT285-1024 | Set left :300 | 300",
	propertyName	:	"left",
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
	testName		:	"VT285-1025 | Set top : 0 | 0",
	propertyName	:	"top",
	cameraTypes		:	"All",
	OSTypes			:	"WINDOWS",
	propertyValue	:	"0",
	expectedResult	:	"0"
},
{
	testName		:	"VT285-1026 | Set top :250 | 250",
	propertyName	:	"top",
	cameraTypes		:	"All",
	OSTypes			:	"WINDOWS",
	propertyValue	:	"250",
	expectedResult	:	"250"
},
{
	testName		:	"VT285-1026 | Set previewTop :-250 | -250",
	propertyName	:	"previewTop",
	cameraTypes		:	"All",
	OSTypes			:	"WINDOWS",
	propertyValue	:	"-250",
	expectedResult	:	"-250"
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
	testName		:	"VT285-1028 | Set previewWidth :-250 | -250",
	propertyName	:	"previewWidth",
	cameraTypes		:	"All",
	OSTypes			:	"WINDOWS",
	propertyValue	:	"-250",
	expectedResult	:	"-250"
},
/*{
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
},*/
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
},
{
	testName		:	"VT285-1031 | Set useSystemViewfinder :invalid | invalid",
	propertyName	:	"useSystemViewfinder",
	cameraTypes		:	"All",
	OSTypes			:	"ANDROID",
	propertyValue	:	"abc",
	expectedResult	:	"abc"
},
{
	testName		:	"VT285-1032 | Set useSystemViewfinder :empty | empty",
	propertyName	:	"useSystemViewfinder",
	cameraTypes		:	"All",
	OSTypes			:	"ANDROID",
	propertyValue	:	"",
	expectedResult	:	""
},
{
	testName		:	"VT285-1033 | Set cameraType : front | front ",
	propertyName	:	"cameraType",
	cameraTypes		:	"All",
	OSTypes			:	"ANDROID APPLE",
	propertyValue	:	"front",
	expectedResult	:	"front"
},
{
	testName		:	"VT285-1033 | Set cameraType : back | back ",
	propertyName	:	"cameraType",
	cameraTypes		:	"All",
	OSTypes			:	"ANDROID APPLE",
	propertyValue	:	"back",
	expectedResult	:	"back"
},
{
	testName		:	"VT285-1033 | Set cameraType : imager | imager ",
	propertyName	:	"cameraType",
	cameraTypes		:	"All",
	OSTypes			:	"WINDOWS",
	propertyValue	:	"imager",
	expectedResult	:	"imager"
},
{
	testName		:	"VT285-1033 | Set cameraType : color | color ",
	propertyName	:	"cameraType",
	cameraTypes		:	"All",
	OSTypes			:	"WINDOWS",
	propertyValue	:	"color",
	expectedResult	:	"color"
},
{
	testName		:	"VT285-1033 | Set cameraType : invalid | invalid ",
	propertyName	:	"cameraType",
	cameraTypes		:	"All",
	OSTypes			:	"ANDROID APPLE WINDOWS",
	propertyValue	:	"abc",
	expectedResult	:	"abc"
},
{
	testName		:	"VT285-1033 | Set cameraType : empty | empty ",
	propertyName	:	"cameraType",
	cameraTypes		:	"All",
	OSTypes			:	"ANDROID APPLE WINDOWS",
	propertyValue	:	"",
	expectedResult	:	""
},
{
	testName		:	"VT285-1033 | Set camera_type : front | front ",
	propertyName	:	"camera_type",
	cameraTypes		:	"All",
	OSTypes			:	"ANDROID APPLE",
	propertyValue	:	"front",
	expectedResult	:	"front"
},
{
	testName		:	"VT285-1033 | Set camera_type : back | back ",
	propertyName	:	"camera_type",
	cameraTypes		:	"All",
	OSTypes			:	"ANDROID APPLE",
	propertyValue	:	"back",
	expectedResult	:	"back"
},
{
	testName		:	"VT285-1033 | Set camera_type : imager | imager ",
	propertyName	:	"camera_type",
	cameraTypes		:	"All",
	OSTypes			:	"WINDOWS",
	propertyValue	:	"imager",
	expectedResult	:	"imager"
},
{
	testName		:	"VT285-1033 | Set camera_type : color | color ",
	propertyName	:	"camera_type",
	cameraTypes		:	"All",
	OSTypes			:	"WINDOWS",
	propertyValue	:	"color",
	expectedResult	:	"color"
}
//,{
// 	testName		:	"VT285-1033 | Set maxwidth : 640 | 640 ",
// 	propertyName	:	"maxWidth",
// 	cameraTypes		:	"All",
// 	OSTypes			:	"Android Apple",
// 	propertyValue	:	"640",
// 	expectedResult	:	"640"
// },
// {
// 	testName		:	"VT285-1033 | Set maxheight : 480 | 480 ",
// 	propertyName	:	"maxHeight",
// 	cameraTypes		:	"All",
// 	OSTypes			:	"Android Apple",
// 	propertyValue	:	"480",
// 	expectedResult	:	"480"
// }
];

var camCallback = function (data){
 getcallbackdata = data ;
 callbackstatus = true; 
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