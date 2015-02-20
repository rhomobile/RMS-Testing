var arr_scanner_property = [
{
	testName		:	"VT282-3001 | Set rastermode:None  | None",
	propertyName	:	"rasterMode",
	scannerTypes	:	"1D Scanner",
	OSTypes			:	"WINDOWS",
	propertyValue	:	"none",
	expectedResult	:	"none"
},
{
	testName		:	"VT282-3002 | Set rastermode:openAlways | openAlways",
	propertyName	:	"rasterMode",
	scannerTypes	:	"1D Scanner",
	OSTypes			:	"WINDOWS",
	propertyValue	:	"openAlways",
	expectedResult	:	"openAlways"
},
{
	testName		:	"VT282-3003 | Set rastermode:smart  | smart",
	propertyName	:	"rasterMode",
	scannerTypes	:	"1D Scanner",
	OSTypes			:	"WINDOWS",
	propertyValue	:	"smart",
	expectedResult	:	"smart"
},
{
	testName		:	"VT282-3004 | Set rastermode:cyclone | openAlways",
	propertyName	:	"rasterMode",
	scannerTypes	:	"1D Scanner",
	OSTypes			:	"WINDOWS",
	propertyValue	:	"cyclone",
	expectedResult	:	"cyclone"
},
{
	testName		:	"VT282-3005 | Set rasterHeight:50 | 50",
	propertyName	:	"rasterHeight",
	scannerTypes	:	"1D Scanner",
	OSTypes			:	"WINDOWS",
	propertyValue	:	"50",
	expectedResult	:	"50"
},
{
	testName		:	"VT282-3006 | Set rasterHeight:0 | 0",
	propertyName	:	"rasterHeight",
	scannerTypes	:	"1D Scanner",
	OSTypes			:	"WINDOWS",
	propertyValue	:	"0",
	expectedResult	:	"0"
},
{
	testName		:	"VT282-3007 | Set rasterHeight:100 | 100",
	propertyName	:	"rasterHeight",
	scannerTypes	:	"1D Scanner",
	OSTypes			:	"WINDOWS",
	propertyValue	:	"100",
	expectedResult	:	"100"
},
{
	testName		:	"VT282-3008 | Set aimMode:none | none",
	propertyName	:	"aimMode",
	scannerTypes	:	"Imager",
	OSTypes			:	"WINDOWS",
	propertyValue	:	"none",
	expectedResult	:	"none"
},
{
	testName		:	"VT282-3009 | Set aimMode:dot | dot",
	propertyName	:	"aimMode",
	scannerTypes	:	"1D Scanner",
	OSTypes			:	"WINDOWS",
	propertyValue	:	"dot",
	expectedResult	:	"dot"
},
{
	testName		:	"VT282-3010 | Set aimMode:slab | slab",
	propertyName	:	"aimMode",
	scannerTypes	:	"1D Scanner",
	OSTypes			:	"WINDOWS",
	propertyValue	:	"slab",
	expectedResult	:	"slab"
},
{
	testName		:	"VT282-3011 | Set aimMode:reticle | reticle",
	propertyName	:	"aimMode",
	scannerTypes	:	"Imager",
	OSTypes			:	"WINDOWS",
	propertyValue	:	"reticle",
	expectedResult	:	"reticle"
},
//  DCC - Removing DPM Mode test until Test script as it is only supported on a small number of scanner drivers (not all Imager Scanners)
//{
//	testName		:	"VT282-3012 | Set dpmMode:true | true",
//	propertyName	:	"dpmMode",
//	scannerTypes	:	"Imager",
//	OSTypes			:	"WINDOWS",
//	propertyValue	:	"true",
//	expectedResult	:	"true"
//},
{
	testName		:	"VT282-3013 | Set dpmMode:false | false",
	propertyName	:	"dpmMode",
	scannerTypes	:	"Imager",
	OSTypes			:	"WINDOWS",
	propertyValue	:	"false",
	expectedResult	:	"false"
},
{
	testName		:	"VT282-3014 | Set focusMode:fixed | fixed",
	propertyName	:	"focusMode",
	scannerTypes	:	"Imager",
	OSTypes			:	"WINDOWS",
	propertyValue	:	"fixed",
	expectedResult	:	"fixed"
},
{
	testName		:	"VT282-3015 | Set focusMode:auto | auto",
	propertyName	:	"focusMode",
	scannerTypes	:	"Imager",
	OSTypes			:	"WINDOWS",
	propertyValue	:	"auto",
	expectedResult	:	"auto"
},
{
	testName		:	"VT282-3016 | Set illuminationMode:auto | auto",
	propertyName	:	"illuminationMode",
	scannerTypes	:	"Imager",
	OSTypes			:	"WINDOWS",
	propertyValue	:	"auto",
	expectedResult	:	"auto",
	notOnAndroidImager: true,
	notInAndroidEMDK3: true
},
{
	testName		:	"VT282-3017 | Set illuminationMode:alwaysOn | alwaysOn",
	propertyName	:	"illuminationMode",
	scannerTypes	:	"Imager",
	OSTypes			:	"All",
	propertyValue	:	"alwaysOn",
	expectedResult	:	"alwaysOn",
	notOnAndroidImager: true,
	notInAndroidEMDK3: true
},
{
	testName		:	"VT282-3018 | Set illuminationMode:alwaysOff | alwaysOff",
	propertyName	:	"illuminationMode",
	scannerTypes	:	"Imager",
	OSTypes			:	"All",
	propertyValue	:	"alwaysOff",
	expectedResult	:	"alwaysOff",
	notOnAndroidImager: true,
	notInAndroidEMDK3: true
},
{
	testName		:	"VT282-3019 | Set inverse1dMode:enabled| enabled",
	propertyName	:	"inverse1dMode",
	scannerTypes	:	"Imager",
	OSTypes			:	"All",
	propertyValue	:	"enabled",
	expectedResult	:	"enabled"
},
{
	testName		:	"VT282-3020 | Set inverse1dMode:disabled | disabled",
	propertyName	:	"inverse1dMode",
	scannerTypes	:	"Imager",
	OSTypes			:	"All",
	propertyValue	:	"disabled",
	expectedResult	:	"disabled"
},
{
	testName		:	"VT282-3021 | Set inverse1dMode:auto | auto",
	propertyName	:	"inverse1dMode",
	scannerTypes	:	"Imager",
	OSTypes			:	"All",
	propertyValue	:	"auto",
	expectedResult	:	"auto"
},
{
	testName		:	"VT282-3022 | Set linearSecurityLevel:redundancyAndLength | redundancyAndLength",
	propertyName	:	"linearSecurityLevel",
	scannerTypes	:	"1D Scanner",
	OSTypes			:	"WINDOWS",
	propertyValue	:	"redundancyAndLength",
	expectedResult	:	"redundancyAndLength"
},
{
	testName		:	"VT282-3023 | Set linearSecurityLevel:shortOrCodabar | shortOrCodabar",
	propertyName	:	"linearSecurityLevel",
	scannerTypes	:	"All",
	OSTypes			:	"All",
	propertyValue	:	"shortOrCodabar",
	expectedResult	:	"shortOrCodabar"
},
{
	testName		:	"VT282-3024 | Set linearSecurityLevel:longAndShort | longAndShort",
	propertyName	:	"linearSecurityLevel",
	scannerTypes	:	"All",
	OSTypes			:	"All",
	propertyValue	:	"longAndShort",
	expectedResult	:	"longAndShort"
},
{
	testName		:	"VT282-3025 | Set linearSecurityLevel:allTwice | allTwice",
	propertyName	:	"linearSecurityLevel",
	scannerTypes	:	"All",
	OSTypes			:	"All",
	propertyValue	:	"allTwice",
	expectedResult	:	"allTwice"
},
{
	testName		:	"VT282-3026 | Set linearSecurityLevel:allThrice | allThrice",
	propertyName	:	"linearSecurityLevel",
	scannerTypes	:	"All",
	OSTypes			:	"All",
	propertyValue	:	"allThrice",
	expectedResult	:	"allThrice"
},
{
	testName		:	"VT282-3027 | Set picklistMode:disabled | disabled",
	propertyName	:	"picklistMode",
	scannerTypes	:	"Imager",
	OSTypes			:	"All",
	propertyValue	:	"disabled",
	expectedResult	:	"disabled"
},
{
	testName		:	"VT282-3028 | Set picklistMode:hardwareReticle | hardwareReticle",
	propertyName	:	"picklistMode",
	scannerTypes	:	"Imager",
	OSTypes			:	"WINDOWS",
	propertyValue	:	"hardwareReticle",
	expectedResult	:	"hardwareReticle" //TODO should work on Android EMDK3 as well
},
{
	testName		:	"VT282-3029 | Set picklistMode:softwareReticle | softwareReticle",
	propertyName	:	"picklistMode",
	scannerTypes	:	"Imager",
	OSTypes			:	"All",
	propertyValue	:	"softwareReticle",
	expectedResult	:	"softwareReticle",
	notOnAndroidImager: true,
	notInAndroidEMDK3: true
},
{
	testName		:	"VT282-3030 | Set poorQuality1dMode:true | true",
	propertyName	:	"poorQuality1dMode",
	scannerTypes	:	"Imager",
	OSTypes			:	"WINDOWS",
	propertyValue	:	"true",
	expectedResult	:	"true"
},
{
	testName		:	"VT282-3031 | Set poorQuality1dMode:false | false",
	propertyName	:	"poorQuality1dMode",
	scannerTypes	:	"Imager",
	OSTypes			:	"WINDOWS",
	propertyValue	:	"false",
	expectedResult	:	"false"
},
{
	testName		:	"VT282-3032 | Set poorQuality1dMode:false | false",
	propertyName	:	"poorQuality1dMode",
	scannerTypes	:	"Imager",
	OSTypes			:	"WINDOWS",
	propertyValue	:	"false",
	expectedResult	:	"false"
},
{
	testName		:	"VT282-3033 | Set viewfinderMode:enabled | enabled",
	propertyName	:	"viewfinderMode",
	scannerTypes	:	"Imager",
	OSTypes			:	"All",
	propertyValue	:	"enabled",
	expectedResult	:	"enabled",
	notOnAndroidImager: true,
	notInAndroidEMDK3: true
},
{
	testName		:	"VT282-3034 | Set viewfinderMode:disabled | disabled",
	propertyName	:	"viewfinderMode",
	scannerTypes	:	"Imager",
	OSTypes			:	"WINDOWS",
	propertyValue	:	"disabled",
	expectedResult	:	"disabled",
	notOnAndroidImager: true
},
{
	testName		:	"VT282-3035 | Set viewfinderMode:staticReticle | staticReticle",
	propertyName	:	"viewfinderMode",
	scannerTypes	:	"Imager",
	OSTypes			:	"All",
	propertyValue	:	"staticReticle",
	expectedResult	:	"staticReticle",
	notOnAndroidImager: true,
	notInAndroidEMDK3: true
},
{
	testName		:	"VT282-3036 | Set viewfinderMode:staticReticle | dynamicReticle",
	propertyName	:	"viewfinderMode",
	scannerTypes	:	"Imager",
	OSTypes			:	"WINDOWS",
	propertyValue	:	"dynamicReticle",
	expectedResult	:	"dynamicReticle",
	notOnAndroidImager: true
},
{
	testName		:	"VT282-3037 | Set viewfinderFeedback:enabled | enabled",
	propertyName	:	"viewfinderFeedback",
	scannerTypes	:	"Imager",
	OSTypes			:	"WINDOWS",
	propertyValue	:	"enabled",
	expectedResult	:	"enabled"
},
{
	testName		:	"VT282-3038 | Set viewfinderFeedback:disabled | disabled",
	propertyName	:	"viewfinderFeedback",
	scannerTypes	:	"Imager",
	OSTypes			:	"WINDOWS",
	propertyValue	:	"disabled",
	expectedResult	:	"disabled"
},
{
	testName		:	"VT282-3039 | Set viewfinderFeedback:reticle | reticle",
	propertyName	:	"viewfinderFeedback",
	scannerTypes	:	"Imager",
	OSTypes			:	"WINDOWS",
	propertyValue	:	"reticle",
	expectedResult	:	"reticle"
},
{
	testName		:	"VT282-3040 | Set viewfinderHeight:200 | 200",
	propertyName	:	"viewfinderHeight",
	scannerTypes	:	"Imager",
	OSTypes			:	"WINDOWS",
	propertyValue	:	"200",
	expectedResult	:	"200"
},
{
	testName		:	"VT282-3041 | Set viewfinderWidth:250 | 250",
	propertyName	:	"viewfinderHeight",
	scannerTypes	:	"Imager",
	OSTypes			:	"WINDOWS",
	propertyValue	:	"250",
	expectedResult	:	"250"
},
{
	testName		:	"VT282-3042 | Set viewfinderX :150 | 150",
	propertyName	:	"viewfinderHeight",
	scannerTypes	:	"Imager",
	OSTypes			:	"WINDOWS",
	propertyValue	:	"150",
	expectedResult	:	"150"
},
{
	testName		:	"VT282-3043 | Set viewfinderY :100 | 100",
	propertyName	:	"viewfinderHeight",
	scannerTypes	:	"Imager",
	OSTypes			:	"WINDOWS",
	propertyValue	:	"100",
	expectedResult	:	"100"
},
{
	testName		:	"VT282-3044 | Set viewfinderFeedbackTime :4000 | 4000",
	propertyName	:	"viewfinderFeedbackTime",
	scannerTypes	:	"Imager",
	OSTypes			:	"WINDOWS",
	propertyValue	:	"4000",
	expectedResult	:	"4000"
},
{
	testName		:	"VT282-3045 | Set viewfinderFeedbackTime :7000 | 7000",
	propertyName	:	"viewfinderFeedbackTime",
	scannerTypes	:	"Imager",
	OSTypes			:	"WINDOWS",
	propertyValue	:	"7000",
	expectedResult	:	"7000"
},
{
	testName		:	"VT282-3046 | Set scanTimeout :10000 | 10000",
	propertyName	:	"scanTimeout",
	scannerTypes	:	"All",
	OSTypes			:	"All",
	propertyValue	:	"10000",
	expectedResult	:	"10000"
},
{
	testName		:	"VT282-3047 | Set scanTimeout :3000 | 3000",
	propertyName	:	"scanTimeout",
	scannerTypes	:	"All",
	OSTypes			:	"All",
	propertyValue	:	"3000",
	expectedResult	:	"3000"
},
{
	testName		:	"VT282-3048 | Set scanTimeout :0 | 0",
	propertyName	:	"scanTimeout",
	scannerTypes	:	"All",
	OSTypes			:	"All",
	propertyValue	:	"0",
	expectedResult	:	"0"
},
{
	testName		:	"VT282-3049 | Set bidirectionalRedundancy :true | true",
	propertyName	:	"bidirectionalRedundancy",
	scannerTypes	:	"1D Scanner",
	OSTypes			:	"WINDOWS",
	propertyValue	:	"true",
	expectedResult	:	"true"
},
{
	testName		:	"VT282-3050 | Set bidirectionalRedundancy :false | false",
	propertyName	:	"bidirectionalRedundancy",
	scannerTypes	:	"1D Scanner",
	OSTypes			:	"WINDOWS",
	propertyValue	:	"false",
	expectedResult	:	"false"
},
{
	testName		:	"VT282-3051 | Set klasseEins :true | true",
	propertyName	:	"klasseEins",
	scannerTypes	:	"1D Scanner",
	OSTypes			:	"WINDOWS",
	propertyValue	:	"true",
	expectedResult	:	"true"
},
{
	testName		:	"VT282-3052 | Set klasseEins :false | false",
	propertyName	:	"klasseEins",
	scannerTypes	:	"1D Scanner",
	OSTypes			:	"WINDOWS",
	propertyValue	:	"false",
	expectedResult	:	"false"
},
{
	testName		:	"VT282-3053 | Set sameSymbolTimeout :5000 | 5000",
	propertyName	:	"sameSymbolTimeout",
	scannerTypes	:	"All",
	OSTypes			:	"WINDOWS",
	propertyValue	:	"5000",
	expectedResult	:	"5000"
},
{
	testName		:	"VT282-3054 | Set sameSymbolTimeout :0 | 0",
	propertyName	:	"sameSymbolTimeout",
	scannerTypes	:	"All",
	OSTypes			:	"WINDOWS",
	propertyValue	:	"0",
	expectedResult	:	"0"
},
{
	testName		:	"VT282-3055 | Set differentSymbolTimeout :2000 | 2000",
	propertyName	:	"differentSymbolTimeout",
	scannerTypes	:	"All",
	OSTypes			:	"WINDOWS",
	propertyValue	:	"2000",
	expectedResult	:	"2000"
},
{
	testName		:	"VT282-3056 | Set differentSymbolTimeout :0 | 0",
	propertyName	:	"differentSymbolTimeout",
	scannerTypes	:	"All",
	OSTypes			:	"WINDOWS",
	propertyValue	:	"0",
	expectedResult	:	"0"
},
{
	testName		:	"VT282-3057 | Set adaptiveScanning :true | true",
	propertyName	:	"adaptiveScanning",
	scannerTypes	:	"1D Scanner",
	OSTypes			:	"WINDOWS",
	propertyValue	:	"true",
	expectedResult	:	"true"
},
{
	testName		:	"VT282-3058 | Set adaptiveScanning :false | false",
	propertyName	:	"adaptiveScanning",
	scannerTypes	:	"1D Scanner",
	OSTypes			:	"WINDOWS",
	propertyValue	:	"false",
	expectedResult	:	"false"
},
{
	testName		:	"VT282-3059 | Set dbpMode :normal | normal",
	propertyName	:	"dbpMode",
	scannerTypes	:	"1D Scanner",
	OSTypes			:	"WINDOWS",
	propertyValue	:	"normal",
	expectedResult	:	"normal"
},
{
	testName		:	"VT282-3060 | Set dbpMode :composite | composite",
	propertyName	:	"dbpMode",
	scannerTypes	:	"1D Scanner",
	OSTypes			:	"WINDOWS",
	propertyValue	:	"composite",
	expectedResult	:	"composite"
},
{
	testName		:	"VT282-3061 | Set timedAimDuration :4000 | 4000",
	propertyName	:	"timedAimDuration",
	scannerTypes	:	"All",
	OSTypes			:	"WINDOWS",
	propertyValue	:	"2000",
	expectedResult	:	"2000"
},
{
	testName		:	"VT282-3062 | Set timedAimDuration :1000 | 1000",
	propertyName	:	"timedAimDuration",
	scannerTypes	:	"All",
	OSTypes			:	"WINDOWS",
	propertyValue	:	"1000",
	expectedResult	:	"1000"
},
{
	testName		:	"VT282-3063 | Set aimType :trigger | trigger",
	propertyName	:	"aimType",
	scannerTypes	:	"All",
	OSTypes			:	"WINDOWS",
	propertyValue	:	"trigger",
	expectedResult	:	"trigger"
},
{
	testName		:	"VT282-3064 | Set aimType :timedHold | timedHold",
	propertyName	:	"aimType",
	scannerTypes	:	"All",
	OSTypes			:	"WINDOWS",
	propertyValue	:	"timedHold",
	expectedResult	:	"timedHold",
	deviceNotSupport	: ["MK3100"]
},
{
	testName		:	"VT282-3065 | Set aimType :timedRelease | timedRelease",
	propertyName	:	"aimType",
	scannerTypes	:	"All",
	OSTypes			:	"WINDOWS",
	propertyValue	:	"timedRelease",
	expectedResult	:	"timedRelease",
	deviceNotSupport	: ["MK3100"]
},
{
	testName		:	"VT282-3066 | Set aimType :presentation | presentation",
	propertyName	:	"aimType",
	scannerTypes	:	"All",
	OSTypes			:	"WINDOWS",
	propertyValue	:	"presentation",
	expectedResult	:	"presentation",
	deviceNotSupport	: ["MK3100"]
},
{
	testName		:	"VT282-3067 | Set aimType :pressAndRelease | pressAndRelease",
	propertyName	:	"aimType",
	scannerTypes	:	"All",
	OSTypes			:	"WINDOWS",
	propertyValue	:	"pressAndRelease",
	expectedResult	:	"pressAndRelease",
	deviceNotSupport	: ["MK3100"]
},
{
	testName		:	"VT282-3068 | Set aimType :continuousRead | continuousRead",
	propertyName	:	"aimType",
	scannerTypes	:	"All",
	OSTypes			:	"WINDOWS",
	propertyValue	:	"continuousRead",
	expectedResult	:	"continuousRead",
	deviceNotSupport	: ["MK3100"]
},
{
	testName		:	"VT282-3069 | Set beamWidth :normal | normal",
	propertyName	:	"beamWidth",
	scannerTypes	:	"1D Scanner",
	OSTypes			:	"WINDOWS",
	propertyValue	:	"normal",
	expectedResult	:	"normal"
},
{
	testName		:	"VT282-3070 | Set beamWidth :wide | wide",
	propertyName	:	"beamWidth",
	scannerTypes	:	"1D Scanner",
	OSTypes			:	"WINDOWS",
	propertyValue	:	"wide",
	expectedResult	:	"wide"
},
{
	testName		:	"VT282-3071 | Set beamWidth :narrow | narrow",
	propertyName	:	"beamWidth",
	scannerTypes	:	"1D Scanner",
	OSTypes			:	"WINDOWS",
	propertyValue	:	"narrow",
	expectedResult	:	"narrow"
},
{
	testName		:	"VT282-3072 | Set barcodeDataFormat :binary | binary",
	propertyName	:	"barcodeDataFormat",
	scannerTypes	:	"Imager",
	OSTypes			:	"WINDOWS",
	propertyValue	:	"binary",
	expectedResult	:	"binary"
},
{
	testName		:	"VT282-3073 | Set barcodeDataFormat :text | text",
	propertyName	:	"barcodeDataFormat",
	scannerTypes	:	"Imager",
	OSTypes			:	"WINDOWS",
	propertyValue	:	"text",
	expectedResult	:	"text"
},
{
	testName		:	"VT282-3074 | Set dataBufferSize :50000 | 50000",
	propertyName	:	"dataBufferSize",
	scannerTypes	:	"Imager",
	OSTypes			:	"WINDOWS",
	propertyValue	:	"50000",
	expectedResult	:	"50000"
},
{
	testName		:	"VT282-3075 | Set dataBufferSize :20000 | 20000",
	propertyName	:	"dataBufferSize",
	scannerTypes	:	"Imager",
	OSTypes			:	"WINDOWS",
	propertyValue	:	"20000",
	expectedResult	:	"20000"
},
{
	testName		:	"VT282-3076 | Set dataBufferSize :0 | 0",
	propertyName	:	"dataBufferSize",
	scannerTypes	:	"Imager",
	OSTypes			:	"WINDOWS",
	propertyValue	:	"0",
	expectedResult	:	"0"
},
{
	testName		:	"VT282-3077 | Set decodeDuration :1000 | 1000",
	propertyName	:	"decodeDuration",
	scannerTypes	:	"All",
	OSTypes			:	"All",
	propertyValue	:	"1000",
	expectedResult	:	"1000"
},
{
	testName		:	"VT282-3078 | Set decodeDuration :5000 | 5000",
	propertyName	:	"decodeDuration",
	scannerTypes	:	"All",
	OSTypes			:	"All",
	propertyValue	:	"5000",
	expectedResult	:	"5000"
},
{
	testName		:	"VT282-3079 | Set decodeFrequency :0 | 0",
	propertyName	:	"decodeFrequency",
	scannerTypes	:	"All",
	OSTypes			:	"All",
	propertyValue	:	"0",
	expectedResult	:	"0"
},
{
	testName		:	"VT282-3080 | Set decodeFrequency :65535 | 65535",
	propertyName	:	"decodeFrequency",
	scannerTypes	:	"All",
	OSTypes			:	"All",
	propertyValue	:	"65535",
	expectedResult	:	"65535"
},
{
	testName		:	"VT282-3081 | Set invalidDecodeFrequency :0 | 0",
	propertyName	:	"invalidDecodeFrequency",
	scannerTypes	:	"All",
	OSTypes			:	"WINDOWS",
	propertyValue	:	"0",
	expectedResult	:	"0"
},
{
	testName		:	"VT282-3082 | Set invalidDecodeFrequency :65535 | 65535",
	propertyName	:	"invalidDecodeFrequency",
	scannerTypes	:	"All",
	OSTypes			:	"WINDOWS",
	propertyValue	:	"65535",
	expectedResult	:	"65535"
},
{
	testName		:	"VT282-3083 | Set  decodeSound :localpath | application/alarm.wav",
	propertyName	:	"decodeSound",
	scannerTypes	:	"All",
	OSTypes			:	"WINDOWS",
	propertyValue	:	"file://application/alarm.wav",
	expectedResult	:	"application/alarm.wav"
},
{
	testName		:	"VT282-3083 | Set  decodeSound :localpath | application/alarm.wav",
	propertyName	:	"decodeSound",
	scannerTypes	:	"All",
	OSTypes			:	"ANDROID",
	propertyValue	:	"file:///sdcard/alarm.wav",
	expectedResult	:	"file:///sdcard/alarm.wav",
	notInAndroidEMDK3: true//TODO Is actually file:/sdcard/alarm.wav. This is still correct. Need to change test framework (to allow EMDK3 only tests).
},
{
	testName		:	"VT282-3084 | Set  invalidDecodeSound :localpath | application/alarm5.wav",
	propertyName	:	"invalidDecodeSound",
	scannerTypes	:	"All",
	OSTypes			:	"WINDOWS",
	propertyValue	:	"file://application/alarm5.wav",
	expectedResult	:	"application/alarm5.wav"
},
{
	testName		:	"VT282-3085 | Set  decodeVolume :5 | 5",
	propertyName	:	"decodeVolume",
	scannerTypes	:	"All",
	OSTypes			:	"All",
	propertyValue	:	"5",
	expectedResult	:	"5"
},
{
	testName		:	"VT282-3086 | Set  decodeVolume :1 | 1",
	propertyName	:	"decodeVolume",
	scannerTypes	:	"All",
	OSTypes			:	"All",
	propertyValue	:	"1",
	expectedResult	:	"1"
},
{
	testName		:	"VT282-3087 | Set  decodeVolume :0 | 0",
	propertyName	:	"decodeVolume",
	scannerTypes	:	"All",
	OSTypes			:	"All",
	propertyValue	:	"0",
	expectedResult	:	"0"
},

// disableScannerDuringNavigate has been removed from xml
/*
{
	testName		:	"VT282-3088 | Set  disableScannerDuringNavigate :true | true",
	propertyName	:	"disableScannerDuringNavigate",
	scannerTypes	:	"All",
	OSTypes			:	"WINDOWS",
	propertyValue	:	"true",
	expectedResult	:	"true"
},
{
	testName		:	"VT282-3089 | Set  disableScannerDuringNavigate :false | false",
	propertyName	:	"disableScannerDuringNavigate",
	scannerTypes	:	"All",
	OSTypes			:	"WINDOWS",
	propertyValue	:	"false",
	expectedResult	:	"false"
},
*/
{
	testName		:	"VT282-3090 | Set  lowBatteryScan :true | true",
	propertyName	:	"lowBatteryScan",
	scannerTypes	:	"All",
	OSTypes			:	"WINDOWS",
	propertyValue	:	"true",
	expectedResult	:	"true"
},
{
	testName		:	"VT282-3091 | Set  lowBatteryScan :false | false",
	propertyName	:	"lowBatteryScan",
	scannerTypes	:	"All",
	OSTypes			:	"WINDOWS",
	propertyValue	:	"false",
	expectedResult	:	"false"
},
{
	testName		:	"VT282-3092 | Set  autoEnter :true | true",
	propertyName	:	"autoEnter",
	scannerTypes	:	"All",
	OSTypes			:	"All",
	propertyValue	:	"true",
	expectedResult	:	"true"
},
{
	testName		:	"VT282-3093 | Set  autoEnter :false| false",
	propertyName	:	"autoEnter",
	scannerTypes	:	"All",
	OSTypes			:	"All",
	propertyValue	:	"false",
	expectedResult	:	"false"
},
{
	testName		:	"VT282-3094 | Set  autoTab :true | true",
	propertyName	:	"autoTab",
	scannerTypes	:	"All",
	OSTypes			:	"All",
	propertyValue	:	"true",
	expectedResult	:	"true"
},
{
	testName		:	"VT282-3095 | Set  autoTab :false| false",
	propertyName	:	"autoTab",
	scannerTypes	:	"All",
	OSTypes			:	"All",
	propertyValue	:	"false",
	expectedResult	:	"false"
},
{
	testName		:	"VT282-3096 | Set  hapticFeedback :true | true",
	propertyName	:	"hapticFeedback",
	scannerTypes	:	"All",
	OSTypes			:	"ANDROID",
	propertyValue	:	"true",
	expectedResult	:	"true"
},
{
	testName		:	"VT282-3097 | Set  hapticFeedback :false| false",
	propertyName	:	"hapticFeedback",
	scannerTypes	:	"All",
	OSTypes			:	"ANDROID",
	propertyValue	:	"false",
	expectedResult	:	"false"
},
{
	testName		:	"VT282-4001 | Set allDecoders:True  | true",
	propertyName	:	"allDecoders",
	scannerTypes	:	"All",
	OSTypes			:	"All",
	propertyValue	:	"true",
	expectedResult	:	"true"
},
{
	testName		:	"VT282-4002 | Set allDecoders:false  | false",
	propertyName	:	"allDecoders",
	scannerTypes	:	"All",
	OSTypes			:	"All",
	propertyValue	:	"false",
	expectedResult	:	"false"
},
{
	testName		:	"VT282-4003 | Set ausPostal:True  | true",
	propertyName	:	"ausPostal",
	scannerTypes	:	"All",
	OSTypes			:	"All",
	propertyValue	:	"true",
	expectedResult	:	"true",
	deviceNotSupport	:["MC32"]
},
{
	testName		:	"VT282-4004 | Set ausPostal:false  | false",
	propertyName	:	"ausPostal",
	scannerTypes	:	"All",
	OSTypes			:	"All",
	propertyValue	:	"false",
	expectedResult	:	"false",
	deviceNotSupport	:["MC32"]
},
{
	testName		:	"VT282-4005 | Set canPostal:True  | true",
	propertyName	:	"canPostal",
	scannerTypes	:	"All",
	OSTypes			:	"All",
	propertyValue	:	"true",
	expectedResult	:	"true",
	deviceNotSupport	:["MC32"]
},
{
	testName		:	"VT282-4006 | Set canPostal:false  | false",
	propertyName	:	"canPostal",
	scannerTypes	:	"All",
	OSTypes			:	"All",
	propertyValue	:	"false",
	expectedResult	:	"false",
	deviceNotSupport	:["MC32"]
},
{
	testName		:	"VT282-4007 | Set codabar:True  | true",
	propertyName	:	"codabar",
	scannerTypes	:	"All",
	OSTypes			:	"All",
	propertyValue	:	"true",
	expectedResult	:	"true"
},
{
	testName		:	"VT282-4008 | Set codabar:false  | false",
	propertyName	:	"codabar",
	scannerTypes	:	"All",
	OSTypes			:	"All",
	propertyValue	:	"false",
	expectedResult	:	"false"
},
{
	testName		:	"VT282-4009 | Set codabarClsiEditing:True  | true",
	propertyName	:	"codabarClsiEditing",
	scannerTypes	:	"All",
	OSTypes			:	"All",
	propertyValue	:	"true",
	expectedResult	:	"true"
},
{
	testName		:	"VT282-4010 | Set codabarClsiEditing:false  | false",
	propertyName	:	"codabarClsiEditing",
	scannerTypes	:	"All",
	OSTypes			:	"All",
	propertyValue	:	"false",
	expectedResult	:	"false"
},
{
	testName		:	"VT282-4011 | Set codabarMaxLength:0  | 0",
	propertyName	:	"codabarMaxLength",
	scannerTypes	:	"All",
	OSTypes			:	"All",
	propertyValue	:	"0",
	expectedResult	:	"0"
},
{
	testName		:	"VT282-4012 | Set codabarMaxLength:10 | 10",
	propertyName	:	"codabarMaxLength",
	scannerTypes	:	"All",
	OSTypes			:	"All",
	propertyValue	:	"10",
	expectedResult	:	"10"
},
{
	testName		:	"VT282-4013 | Set codabarMaxLength:55 | 55",
	propertyName	:	"codabarMaxLength",
	scannerTypes	:	"All",
	OSTypes			:	"All",
	propertyValue	:	"55",
	expectedResult	:	"55"
},
{
	testName		:	"VT282-4014 | Set codabarMinLength:0  | 0",
	propertyName	:	"codabarMinLength",
	scannerTypes	:	"All",
	OSTypes			:	"All",
	propertyValue	:	"0",
	expectedResult	:	"0"
},
{
	testName		:	"VT282-4015 | Set codabarMinLength:20 | 20",
	propertyName	:	"codabarMinLength",
	scannerTypes	:	"All",
	OSTypes			:	"All",
	propertyValue	:	"20",
	expectedResult	:	"20"
},
{
	testName		:	"VT282-4016 | Set codabarMinLength:55 | 55",
	propertyName	:	"codabarMinLength",
	scannerTypes	:	"All",
	OSTypes			:	"All",
	propertyValue	:	"55",
	expectedResult	:	"55"
},
{
	testName		:	"VT282-4017 | Set codabarNotisEditing:True  | true",
	propertyName	:	"codabarNotisEditing",
	scannerTypes	:	"All",
	OSTypes			:	"All",
	propertyValue	:	"true",
	expectedResult	:	"true"
},
{
	testName		:	"VT282-4018 | Set codabarNotisEditing:false  | false",
	propertyName	:	"codabarNotisEditing",
	scannerTypes	:	"All",
	OSTypes			:	"All",
	propertyValue	:	"false",
	expectedResult	:	"false"
},
{
	testName		:	"VT282-4019 | Set codabarRedundancy:True  | true",
	propertyName	:	"codabarRedundancy",
	scannerTypes	:	"All",
	OSTypes			:	"All",
	propertyValue	:	"true",
	expectedResult	:	"true"
},
{
	testName		:	"VT282-4020 | Set codabarRedundancy:false  | false",
	propertyName	:	"codabarRedundancy",
	scannerTypes	:	"All",
	OSTypes			:	"All",
	propertyValue	:	"false",
	expectedResult	:	"false"
},
{
	testName		:	"VT282-4021 | Set code11 :True  | true",
	propertyName	:	"code11",
	scannerTypes	:	"All",
	OSTypes			:	"All",
	propertyValue	:	"true",
	expectedResult	:	"true"
},
{
	testName		:	"VT282-4022 | Set code11 :false  | false",
	propertyName	:	"code11",
	scannerTypes	:	"All",
	OSTypes			:	"All",
	propertyValue	:	"false",
	expectedResult	:	"false"
},
{
	testName		:	"VT282-4023 | Set code11checkDigitCount:none  | none",
	propertyName	:	"code11checkDigitCount",
	scannerTypes	:	"All",
	OSTypes			:	"All",
	propertyValue	:	"none",
	expectedResult	:	"none",
	notInAndroidEMDK3: true
},
{
	testName		:	"VT282-4024 | Set code11checkDigitCount:one | one",
	propertyName	:	"code11checkDigitCount",
	scannerTypes	:	"All",
	OSTypes			:	"All",
	propertyValue	:	"one",
	expectedResult	:	"one",
	notInAndroidEMDK3: true
},
{
	testName		:	"VT282-4025 | Set code11checkDigitCount:two | two",
	propertyName	:	"code11checkDigitCount",
	scannerTypes	:	"All",
	OSTypes			:	"All",
	propertyValue	:	"two",
	expectedResult	:	"two",
	notInAndroidEMDK3: true
},
{
	testName		:	"VT282-4026 | Set code11maxLength:0  | 0",
	propertyName	:	"code11maxLength",
	scannerTypes	:	"All",
	OSTypes			:	"All",
	propertyValue	:	"0",
	expectedResult	:	"0"
},
{
	testName		:	"VT282-4027 | Set code11maxLength:30 | 30",
	propertyName	:	"code11maxLength",
	scannerTypes	:	"All",
	OSTypes			:	"All",
	propertyValue	:	"30",
	expectedResult	:	"30"
},
{
	testName		:	"VT282-4028 | Set code11maxLength:55 | 55",
	propertyName	:	"code11maxLength",
	scannerTypes	:	"All",
	OSTypes			:	"All",
	propertyValue	:	"55",
	expectedResult	:	"55"
},
{
	testName		:	"VT282-4029 | Set code11minLength:0  | 0",
	propertyName	:	"code11minLength",
	scannerTypes	:	"All",
	OSTypes			:	"All",
	propertyValue	:	"0",
	expectedResult	:	"0"
},
{
	testName		:	"VT282-4030 | Set code11minLength:40 | 40",
	propertyName	:	"code11minLength",
	scannerTypes	:	"All",
	OSTypes			:	"All",
	propertyValue	:	"40",
	expectedResult	:	"40"
},
{
	testName		:	"VT282-4031 | Set code11minLength:55 | 55",
	propertyName	:	"code11minLength",
	scannerTypes	:	"All",
	OSTypes			:	"All",
	propertyValue	:	"55",
	expectedResult	:	"55"
},
{
	testName		:	"VT282-4032 | Set code11redundancy:True  | true",
	propertyName	:	"code11redundancy",
	scannerTypes	:	"All",
	OSTypes			:	"All",
	propertyValue	:	"true",
	expectedResult	:	"true"
},
{
	testName		:	"VT282-4033 | Set code11redundancy:false  | false",
	propertyName	:	"code11redundancy",
	scannerTypes	:	"All",
	OSTypes			:	"All",
	propertyValue	:	"false",
	expectedResult	:	"false"
},
{
	testName		:	"VT282-4034 | Set code11reportCheckDigit:True  | true",
	propertyName	:	"code11reportCheckDigit",
	scannerTypes	:	"All",
	OSTypes			:	"All",
	propertyValue	:	"true",
	expectedResult	:	"true"
},
{
	testName		:	"VT282-4035 | Set code11reportCheckDigit:false  | false",
	propertyName	:	"code11reportCheckDigit",
	scannerTypes	:	"All",
	OSTypes			:	"All",
	propertyValue	:	"false",
	expectedResult	:	"false"
},
{
	testName		:	"VT282-4036 | Set code128 :True  | true",
	propertyName	:	"code128",
	scannerTypes	:	"All",
	OSTypes			:	"All",
	propertyValue	:	"true",
	expectedResult	:	"true"
},
{
	testName		:	"VT282-4037 | Set code128 :false  | false",
	propertyName	:	"code128",
	scannerTypes	:	"All",
	OSTypes			:	"All",
	propertyValue	:	"false",
	expectedResult	:	"false"
},
{
	testName		:	"VT282-4038 | Set code128checkIsBtTable:True  | true",
	propertyName	:	"code128checkIsBtTable",
	scannerTypes	:	"All",
	OSTypes			:	"All",
	propertyValue	:	"true",
	expectedResult	:	"true"
},
{
	testName		:	"VT282-4039 | Set code128checkIsBtTable:false  | false",
	propertyName	:	"code128checkIsBtTable",
	scannerTypes	:	"All",
	OSTypes			:	"All",
	propertyValue	:	"false",
	expectedResult	:	"false"
},
{
	testName		:	"VT282-4040 | Set code128ean128:True  | true",
	propertyName	:	"code128ean128",
	scannerTypes	:	"All",
	OSTypes			:	"All",
	propertyValue	:	"true",
	expectedResult	:	"true"
},
{
	testName		:	"VT282-4041 | Set code128ean128:false  | false",
	propertyName	:	"code128ean128",
	scannerTypes	:	"All",
	OSTypes			:	"All",
	propertyValue	:	"false",
	expectedResult	:	"false"
},
{
	testName		:	"VT282-4042 | Set code128isbt128:True  | true",
	propertyName	:	"code128isbt128",
	scannerTypes	:	"All",
	OSTypes			:	"All",
	propertyValue	:	"true",
	expectedResult	:	"true"
},
{
	testName		:	"VT282-4043 | Set code128isbt128:false  | false",
	propertyName	:	"code128isbt128",
	scannerTypes	:	"All",
	OSTypes			:	"All",
	propertyValue	:	"false",
	expectedResult	:	"false"
},
{
	testName		:	"VT282-4044 | Set code128isbt128ConcatMode:never  | never",
	propertyName	:	"code128isbt128ConcatMode",
	scannerTypes	:	"All",
	OSTypes			:	"All",
	propertyValue	:	"never",
	expectedResult	:	"never"
},
{
	testName		:	"VT282-4045 | Set code128isbt128ConcatMode:always | always",
	propertyName	:	"code128isbt128ConcatMode",
	scannerTypes	:	"All",
	OSTypes			:	"All",
	propertyValue	:	"always",
	expectedResult	:	"always"
},
{
	testName		:	"VT282-4046 | Set code128isbt128ConcatMode:auto | auto",
	propertyName	:	"code128isbt128ConcatMode",
	scannerTypes	:	"All",
	OSTypes			:	"All",
	propertyValue	:	"auto",
	expectedResult	:	"auto"
},
{
	testName		:	"VT282-4047 | Set code128maxLength:0  | 0",
	propertyName	:	"code128maxLength",
	scannerTypes	:	"All",
	OSTypes			:	"All",
	propertyValue	:	"0",
	expectedResult	:	"0"
},
{
	testName		:	"VT282-4048 | Set code128maxLength:15 | 15",
	propertyName	:	"code128maxLength",
	scannerTypes	:	"All",
	OSTypes			:	"All",
	propertyValue	:	"15",
	expectedResult	:	"15"
},
{
	testName		:	"VT282-4049 | Set code128maxLength:55 | 55",
	propertyName	:	"code128maxLength",
	scannerTypes	:	"All",
	OSTypes			:	"All",
	propertyValue	:	"55",
	expectedResult	:	"55"
},
{
	testName		:	"VT282-4050 | Set code128minLength:0  | 0",
	propertyName	:	"code128minLength",
	scannerTypes	:	"All",
	OSTypes			:	"All",
	propertyValue	:	"0",
	expectedResult	:	"0"
},
{
	testName		:	"VT282-4051 | Set code128minLength:25 | 25",
	propertyName	:	"code128minLength",
	scannerTypes	:	"All",
	OSTypes			:	"All",
	propertyValue	:	"25",
	expectedResult	:	"25"
},
{
	testName		:	"VT282-4052 | Set code128minLength:55 | 55",
	propertyName	:	"code128minLength",
	scannerTypes	:	"All",
	OSTypes			:	"All",
	propertyValue	:	"55",
	expectedResult	:	"55"
},
{
	testName		:	"VT282-4053 | Set code128other128:True  | true",
	propertyName	:	"code128other128",
	scannerTypes	:	"All",
	OSTypes			:	"All",
	propertyValue	:	"true",
	expectedResult	:	"true"
},
{
	testName		:	"VT282-4054 | Set code128other128:false  | false",
	propertyName	:	"code128other128",
	scannerTypes	:	"All",
	OSTypes			:	"All",
	propertyValue	:	"false",
	expectedResult	:	"false"
},
{
	testName		:	"VT282-4055 | Set code128redundancy:True  | true",
	propertyName	:	"code128redundancy",
	scannerTypes	:	"All",
	OSTypes			:	"All",
	propertyValue	:	"true",
	expectedResult	:	"true"
},
{
	testName		:	"VT282-4056 | Set code128redundancy:false  | false",
	propertyName	:	"code128redundancy",
	scannerTypes	:	"All",
	OSTypes			:	"All",
	propertyValue	:	"false",
	expectedResult	:	"false"
},
{
	testName		:	"VT282-4057 | Set code128securityLevel:0  | 0",
	propertyName	:	"code128securityLevel",
	scannerTypes	:	"All",
	OSTypes			:	"All",
	propertyValue	:	"0",
	expectedResult	:	"0"
},
{
	testName		:	"VT282-4058 | Set code128securityLevel:1  | 1",
	propertyName	:	"code128securityLevel",
	scannerTypes	:	"All",
	OSTypes			:	"All",
	propertyValue	:	"1",
	expectedResult	:	"1"
},
{
	testName		:	"VT282-4059 | Set code128securityLevel:2  | 2",
	propertyName	:	"code128securityLevel",
	scannerTypes	:	"All",
	OSTypes			:	"All",
	propertyValue	:	"2",
	expectedResult	:	"2"
},
{
	testName		:	"VT282-4060 | Set code128securityLevel:3  | 3",
	propertyName	:	"code128securityLevel",
	scannerTypes	:	"All",
	OSTypes			:	"All",
	propertyValue	:	"3",
	expectedResult	:	"3"
},
{
	testName		:	"VT282-4061 | Set code39 :True  | true",
	propertyName	:	"code39",
	scannerTypes	:	"All",
	OSTypes			:	"All",
	propertyValue	:	"true",
	expectedResult	:	"true"
},
{
	testName		:	"VT282-4062 | Set code39 :false  | false",
	propertyName	:	"code39",
	scannerTypes	:	"All",
	OSTypes			:	"All",
	propertyValue	:	"false",
	expectedResult	:	"false"
},
{
	testName		:	"VT282-4063 | Set code39code32Prefix :True  | true",
	propertyName	:	"code39code32Prefix",
	scannerTypes	:	"All",
	OSTypes			:	"All",
	propertyValue	:	"true",
	expectedResult	:	"true"
},
{
	testName		:	"VT282-4064 | Set code39code32Prefix :false  | false",
	propertyName	:	"code39code32Prefix",
	scannerTypes	:	"All",
	OSTypes			:	"All",
	propertyValue	:	"false",
	expectedResult	:	"false"
},
{
	testName		:	"VT282-4065 | Set code39convertToCode32 :True  | true",
	propertyName	:	"code39convertToCode32",
	scannerTypes	:	"All",
	OSTypes			:	"All",
	propertyValue	:	"true",
	expectedResult	:	"true"
},
{
	testName		:	"VT282-4066 | Set code39convertToCode32 :false  | false",
	propertyName	:	"code39convertToCode32",
	scannerTypes	:	"All",
	OSTypes			:	"All",
	propertyValue	:	"false",
	expectedResult	:	"false"
},
{
	testName		:	"VT282-4067 | Set code39fullAscii :True  | true",
	propertyName	:	"code39fullAscii",
	scannerTypes	:	"All",
	OSTypes			:	"All",
	propertyValue	:	"true",
	expectedResult	:	"true"
},
{
	testName		:	"VT282-4068 | Set code39fullAscii :false  | false",
	propertyName	:	"code39fullAscii",
	scannerTypes	:	"All",
	OSTypes			:	"All",
	propertyValue	:	"false",
	expectedResult	:	"false"
},
{
	testName		:	"VT282-4069 | Set code39maxLength:0  | 0",
	propertyName	:	"code39maxLength",
	scannerTypes	:	"All",
	OSTypes			:	"All",
	propertyValue	:	"0",
	expectedResult	:	"0"
},
{
	testName		:	"VT282-4070 | Set code39maxLength:35 | 35",
	propertyName	:	"code39maxLength",
	scannerTypes	:	"All",
	OSTypes			:	"All",
	propertyValue	:	"35",
	expectedResult	:	"35"
},
{
	testName		:	"VT282-4071 | Set code39maxLength:55 | 55",
	propertyName	:	"code39maxLength",
	scannerTypes	:	"All",
	OSTypes			:	"All",
	propertyValue	:	"55",
	expectedResult	:	"55"
},
{
	testName		:	"VT282-4072 | Set code39minLength:0  | 0",
	propertyName	:	"code39minLength",
	scannerTypes	:	"All",
	OSTypes			:	"All",
	propertyValue	:	"0",
	expectedResult	:	"0"
},
{
	testName		:	"VT282-4073 | Set code39minLength:45 | 45",
	propertyName	:	"code39minLength",
	scannerTypes	:	"All",
	OSTypes			:	"All",
	propertyValue	:	"45",
	expectedResult	:	"45"
},
{
	testName		:	"VT282-4074 | Set code39minLength:55 | 55",
	propertyName	:	"code39minLength",
	scannerTypes	:	"All",
	OSTypes			:	"All",
	propertyValue	:	"55",
	expectedResult	:	"55"
},
{
	testName		:	"VT282-4075 | Set code39redundancy :True  | true",
	propertyName	:	"code39redundancy",
	scannerTypes	:	"All",
	OSTypes			:	"All",
	propertyValue	:	"true",
	expectedResult	:	"true"
},
{
	testName		:	"VT282-4076 | Set code39redundancy :false  | false",
	propertyName	:	"code39redundancy",
	scannerTypes	:	"All",
	OSTypes			:	"All",
	propertyValue	:	"false",
	expectedResult	:	"false"
},
{
	testName		:	"VT282-4076 | Set code39reportCheckDigit :True  | true",
	propertyName	:	"code39reportCheckDigit",
	scannerTypes	:	"All",
	OSTypes			:	"All",
	propertyValue	:	"true",
	expectedResult	:	"true"
},
{
	testName		:	"VT282-4077 | Set code39reportCheckDigit :false  | false",
	propertyName	:	"code39reportCheckDigit",
	scannerTypes	:	"All",
	OSTypes			:	"All",
	propertyValue	:	"false",
	expectedResult	:	"false"
},
{
	testName		:	"VT282-4078 | Set code39securityLevel:0  | 0",
	propertyName	:	"code39securityLevel",
	scannerTypes	:	"All",
	OSTypes			:	"All",
	propertyValue	:	"0",
	expectedResult	:	"0"
},
{
	testName		:	"VT282-4079 | Set code39securityLevel:1  | 1",
	propertyName	:	"code39securityLevel",
	scannerTypes	:	"All",
	OSTypes			:	"All",
	propertyValue	:	"1",
	expectedResult	:	"1"
},
{
	testName		:	"VT282-4080 | Set code39securityLevel:2  | 2",
	propertyName	:	"code39securityLevel",
	scannerTypes	:	"All",
	OSTypes			:	"All",
	propertyValue	:	"2",
	expectedResult	:	"2"
},
{
	testName		:	"VT282-4081 | Set code39securityLevel:3  | 3",
	propertyName	:	"code39securityLevel",
	scannerTypes	:	"All",
	OSTypes			:	"All",
	propertyValue	:	"3",
	expectedResult	:	"3"
},
{
	testName		:	"VT282-4082 | Set code39verifyCheckDigit :True  | true",
	propertyName	:	"code39verifyCheckDigit",
	scannerTypes	:	"All",
	OSTypes			:	"All",
	propertyValue	:	"true",
	expectedResult	:	"true"
},
{
	testName		:	"VT282-4083 | Set code39verifyCheckDigit :false  | false",
	propertyName	:	"code39verifyCheckDigit",
	scannerTypes	:	"All",
	OSTypes			:	"All",
	propertyValue	:	"false",
	expectedResult	:	"false"
},
{
	testName		:	"VT282-4084 | Set code93 :True  | true",
	propertyName	:	"code93",
	scannerTypes	:	"All",
	OSTypes			:	"All",
	propertyValue	:	"true",
	expectedResult	:	"true"
},
{
	testName		:	"VT282-4085 | Set code93 :false  | false",
	propertyName	:	"code93",
	scannerTypes	:	"All",
	OSTypes			:	"All",
	propertyValue	:	"false",
	expectedResult	:	"false"
},
{
	testName		:	"VT282-4086 | Set code93maxLength:0  | 0",
	propertyName	:	"code93maxLength",
	scannerTypes	:	"All",
	OSTypes			:	"All",
	propertyValue	:	"0",
	expectedResult	:	"0"
},
{
	testName		:	"VT282-4087 | Set code93maxLength:11 | 11",
	propertyName	:	"code93maxLength",
	scannerTypes	:	"All",
	OSTypes			:	"All",
	propertyValue	:	"11",
	expectedResult	:	"11"
},
{
	testName		:	"VT282-4088 | Set code93maxLength:55 | 55",
	propertyName	:	"code93maxLength",
	scannerTypes	:	"All",
	OSTypes			:	"All",
	propertyValue	:	"55",
	expectedResult	:	"55"
},
{
	testName		:	"VT282-4089 | Set code93minLength:0  | 0",
	propertyName	:	"code93minLength",
	scannerTypes	:	"All",
	OSTypes			:	"All",
	propertyValue	:	"0",
	expectedResult	:	"0"
},
{
	testName		:	"VT282-4090 | Set code93minLength:12 | 12",
	propertyName	:	"code93minLength",
	scannerTypes	:	"All",
	OSTypes			:	"All",
	propertyValue	:	"12",
	expectedResult	:	"12"
},
{
	testName		:	"VT282-4091 | Set code93minLength:55 | 55",
	propertyName	:	"code93minLength",
	scannerTypes	:	"All",
	OSTypes			:	"All",
	propertyValue	:	"55",
	expectedResult	:	"55"
},
{
	testName		:	"VT282-4092 | Set code93redundancy :True  | true",
	propertyName	:	"code93redundancy",
	scannerTypes	:	"All",
	OSTypes			:	"All",
	propertyValue	:	"true",
	expectedResult	:	"true"
},
{
	testName		:	"VT282-4093 | Set code93redundancy :false  | false",
	propertyName	:	"code93redundancy",
	scannerTypes	:	"All",
	OSTypes			:	"All",
	propertyValue	:	"false",
	expectedResult	:	"false"
},
{
	testName		:	"VT282-4094 | Set compositeAb  :True  | true",
	propertyName	:	"compositeAb",
	scannerTypes	:	"Imager",
	OSTypes			:	"All",
	propertyValue	:	"true",
	expectedResult	:	"true"
},
{
	testName		:	"VT282-4095 | Set compositeAb  :false  | false",
	propertyName	:	"compositeAb",
	scannerTypes	:	"Imager",
	OSTypes			:	"All",
	propertyValue	:	"false",
	expectedResult	:	"false"
},
{
	testName		:	"VT282-4096 | Set compositeAbUccLinkMode:never  | never",
	propertyName	:	"compositeAbUccLinkMode",
	scannerTypes	:	"Imager",
	OSTypes			:	"All",
	propertyValue	:	"never",
	expectedResult	:	"never"
},
{
	testName		:	"VT282-4097 | Set compositeAbUccLinkMode:always | always",
	propertyName	:	"compositeAbUccLinkMode",
	scannerTypes	:	"Imager",
	OSTypes			:	"All",
	propertyValue	:	"always",
	expectedResult	:	"always"
},
{
	testName		:	"VT282-4098 | Set compositeAbUccLinkMode:auto | auto",
	propertyName	:	"compositeAbUccLinkMode",
	scannerTypes	:	"Imager",
	OSTypes			:	"All",
	propertyValue	:	"auto",
	expectedResult	:	"auto"
},
{
	testName		:	"VT282-4099 | Set compositeAbUseUpcPreambleCheckDigitRules  :True  | true",
	propertyName	:	"compositeAbUseUpcPreambleCheckDigitRules",
	scannerTypes	:	"Imager",
	OSTypes			:	"WINDOWS",
	propertyValue	:	"true",
	expectedResult	:	"true"
},
{
	testName		:	"VT282-4100 | Set compositeAbUseUpcPreambleCheckDigitRules  :false  | false",
	propertyName	:	"compositeAbUseUpcPreambleCheckDigitRules",
	scannerTypes	:	"Imager",
	OSTypes			:	"WINDOWS",
	propertyValue	:	"false",
	expectedResult	:	"false"
},
{
	testName		:	"VT282-4101 | Set compositeC  :True  | true",
	propertyName	:	"compositeC",
	scannerTypes	:	"Imager",
	OSTypes			:	"All",
	propertyValue	:	"true",
	expectedResult	:	"true"
},
{
	testName		:	"VT282-4102 | Set compositeC  :false  | false",
	propertyName	:	"compositeC",
	scannerTypes	:	"Imager",
	OSTypes			:	"All",
	propertyValue	:	"false",
	expectedResult	:	"false"
},
{
	testName		:	"VT282-4103 | Set d2of5  :True  | true",
	propertyName	:	"d2of5",
	scannerTypes	:	"All",
	OSTypes			:	"All",
	propertyValue	:	"true",
	expectedResult	:	"true"
},
{
	testName		:	"VT282-4104 | Set d2of5  :false  | false",
	propertyName	:	"d2of5",
	scannerTypes	:	"All",
	OSTypes			:	"All",
	propertyValue	:	"false",
	expectedResult	:	"false"
},
{
	testName		:	"VT282-4105 | Set d2of5maxLength:0  | 0",
	propertyName	:	"d2of5maxLength",
	scannerTypes	:	"All",
	OSTypes			:	"All",
	propertyValue	:	"0",
	expectedResult	:	"0"
},
{
	testName		:	"VT282-4106 | Set d2of5maxLength:13 | 13",
	propertyName	:	"d2of5maxLength",
	scannerTypes	:	"All",
	OSTypes			:	"All",
	propertyValue	:	"13",
	expectedResult	:	"13"
},
{
	testName		:	"VT282-4107 | Set d2of5maxLength:55 | 55",
	propertyName	:	"d2of5maxLength",
	scannerTypes	:	"All",
	OSTypes			:	"All",
	propertyValue	:	"55",
	expectedResult	:	"55"
},
{
	testName		:	"VT282-4108 | Set d2of5minLength:0  | 0",
	propertyName	:	"d2of5minLength",
	scannerTypes	:	"All",
	OSTypes			:	"All",
	propertyValue	:	"0",
	expectedResult	:	"0"
},
{
	testName		:	"VT282-4109 | Set d2of5minLength:14 | 14",
	propertyName	:	"d2of5minLength",
	scannerTypes	:	"All",
	OSTypes			:	"All",
	propertyValue	:	"14",
	expectedResult	:	"14"
},
{
	testName		:	"VT282-4110 | Set d2of5minLength:55 | 55",
	propertyName	:	"d2of5minLength",
	scannerTypes	:	"All",
	OSTypes			:	"All",
	propertyValue	:	"55",
	expectedResult	:	"55"
},
{
	testName		:	"VT282-4111 | Set d2of5redundancy  :True  | true",
	propertyName	:	"d2of5redundancy",
	scannerTypes	:	"All",
	OSTypes			:	"All",
	propertyValue	:	"true",
	expectedResult	:	"true"
},
{
	testName		:	"VT282-4112 | Set d2of5redundancy  :false  | false",
	propertyName	:	"d2of5redundancy",
	scannerTypes	:	"All",
	OSTypes			:	"All",
	propertyValue	:	"false",
	expectedResult	:	"false"
},
{
	testName		:	"VT282-4113 | Set datamatrix  :True  | true",
	propertyName	:	"datamatrix",
	scannerTypes	:	"Imager",
	OSTypes			:	"All",
	propertyValue	:	"true",
	expectedResult	:	"true"
},
{
	testName		:	"VT282-4114 | Set datamatrix  :false  | false",
	propertyName	:	"datamatrix",
	scannerTypes	:	"Imager",
	OSTypes			:	"All",
	propertyValue	:	"false",
	expectedResult	:	"false"
},
{
	testName		:	"VT282-4115 | Set dutchPostal  :True  | true",
	propertyName	:	"dutchPostal",
	scannerTypes	:	"Imager",
	OSTypes			:	"All",
	propertyValue	:	"true",
	expectedResult	:	"true"
},
{
	testName		:	"VT282-4116 | Set dutchPostal  :false  | false",
	propertyName	:	"dutchPostal",
	scannerTypes	:	"Imager",
	OSTypes			:	"All",
	propertyValue	:	"false",
	expectedResult	:	"false"
},
{
	testName		:	"VT282-4117 | Set ean13  :True  | true",
	propertyName	:	"ean13",
	scannerTypes	:	"All",
	OSTypes			:	"All",
	propertyValue	:	"true",
	expectedResult	:	"true"
},
{
	testName		:	"VT282-4118 | Set ean13  :false  | false",
	propertyName	:	"ean13",
	scannerTypes	:	"All",
	OSTypes			:	"All",
	propertyValue	:	"false",
	expectedResult	:	"false"
},
{
	testName		:	"VT282-4119 | Set ean8  :True  | true",
	propertyName	:	"ean8",
	scannerTypes	:	"All",
	OSTypes			:	"All",
	propertyValue	:	"true",
	expectedResult	:	"true"
},
{
	testName		:	"VT282-4120 | Set ean8  :false  | false",
	propertyName	:	"ean8",
	scannerTypes	:	"All",
	OSTypes			:	"All",
	propertyValue	:	"false",
	expectedResult	:	"false"
},
{
	testName		:	"VT282-4121 | Set ean8convertToEan13  :True  | true",
	propertyName	:	"ean8convertToEan13",
	scannerTypes	:	"All",
	OSTypes			:	"WINDOWS",
	propertyValue	:	"true",
	expectedResult	:	"true"
},
{
	testName		:	"VT282-4122 | Set ean8convertToEan13  :false  | false",
	propertyName	:	"ean8convertToEan13",
	scannerTypes	:	"All",
	OSTypes			:	"WINDOWS",
	propertyValue	:	"false",
	expectedResult	:	"false"
},
{
	testName		:	"VT282-4123 | Set gs1dataBar  :True  | true",
	propertyName	:	"gs1dataBar",
	scannerTypes	:	"All",
	OSTypes			:	"All",
	propertyValue	:	"true",
	expectedResult	:	"true"
},
{
	testName		:	"VT282-4124 | Set gs1dataBar  :false  | false",
	propertyName	:	"gs1dataBar",
	scannerTypes	:	"All",
	OSTypes			:	"All",
	propertyValue	:	"false",
	expectedResult	:	"false"
},
{
	testName		:	"VT282-4125 | Set gs1dataBarExpanded  :True  | true",
	propertyName	:	"gs1dataBarExpanded",
	scannerTypes	:	"All",
	OSTypes			:	"All",
	propertyValue	:	"true",
	expectedResult	:	"true"
},
{
	testName		:	"VT282-4126 | Set gs1dataBarExpanded  :false  | false",
	propertyName	:	"gs1dataBarExpanded",
	scannerTypes	:	"All",
	OSTypes			:	"All",
	propertyValue	:	"false",
	expectedResult	:	"false"
},
{
	testName		:	"VT282-4127 | Set gs1dataBarLimited  :True  | true",
	propertyName	:	"gs1dataBarLimited",
	scannerTypes	:	"All",
	OSTypes			:	"All",
	propertyValue	:	"true",
	expectedResult	:	"true"
},
{
	testName		:	"VT282-4128 | Set gs1dataBarLimited  :false  | false",
	propertyName	:	"gs1dataBarLimited",
	scannerTypes	:	"All",
	OSTypes			:	"All",
	propertyValue	:	"false",
	expectedResult	:	"false"
},
{
	testName		:	"VT282-4129 | Set i2of5  :True  | true",
	propertyName	:	"i2of5",
	scannerTypes	:	"All",
	OSTypes			:	"All",
	propertyValue	:	"true",
	expectedResult	:	"true"
},
{
	testName		:	"VT282-4130 | Set i2of5  :false  | false",
	propertyName	:	"i2of5",
	scannerTypes	:	"All",
	OSTypes			:	"All",
	propertyValue	:	"false",
	expectedResult	:	"false"
},
{
	testName		:	"VT282-4131 | Set i2of5convertToEan13  :True  | true",
	propertyName	:	"i2of5convertToEan13",
	scannerTypes	:	"All",
	OSTypes			:	"All",
	propertyValue	:	"true",
	expectedResult	:	"true"
},
{
	testName		:	"VT282-4132 | Set i2of5convertToEan13  :false  | false",
	propertyName	:	"i2of5convertToEan13",
	scannerTypes	:	"All",
	OSTypes			:	"All",
	propertyValue	:	"false",
	expectedResult	:	"false"
},
{
	testName		:	"VT282-4133 | Set i2of5maxLength:0  | 0",
	propertyName	:	"i2of5maxLength",
	scannerTypes	:	"All",
	OSTypes			:	"All",
	propertyValue	:	"0",
	expectedResult	:	"0"
},
{
	testName		:	"VT282-4134 | Set i2of5maxLength:22 | 22",
	propertyName	:	"i2of5maxLength",
	scannerTypes	:	"All",
	OSTypes			:	"All",
	propertyValue	:	"22",
	expectedResult	:	"22"
},
{
	testName		:	"VT282-4135 | Set i2of5maxLength:55 | 55",
	propertyName	:	"i2of5maxLength",
	scannerTypes	:	"All",
	OSTypes			:	"All",
	propertyValue	:	"55",
	expectedResult	:	"55"
},
{
	testName		:	"VT282-4136 | Set i2of5minLength:0  | 0",
	propertyName	:	"i2of5minLength",
	scannerTypes	:	"All",
	OSTypes			:	"All",
	propertyValue	:	"0",
	expectedResult	:	"0"
},
{
	testName		:	"VT282-4137 | Set i2of5minLength:33 | 33",
	propertyName	:	"i2of5minLength",
	scannerTypes	:	"All",
	OSTypes			:	"All",
	propertyValue	:	"33",
	expectedResult	:	"33"
},
{
	testName		:	"VT282-4138 | Set i2of5minLength:55 | 55",
	propertyName	:	"i2of5minLength",
	scannerTypes	:	"All",
	OSTypes			:	"All",
	propertyValue	:	"55",
	expectedResult	:	"55"
},
{
	testName		:	"VT282-4139 | Set i2of5redundancy  :True  | true",
	propertyName	:	"i2of5redundancy",
	scannerTypes	:	"All",
	OSTypes			:	"All",
	propertyValue	:	"true",
	expectedResult	:	"true"
},
{
	testName		:	"VT282-4140 | Set i2of5redundancy  :false  | false",
	propertyName	:	"i2of5redundancy",
	scannerTypes	:	"All",
	OSTypes			:	"All",
	propertyValue	:	"false",
	expectedResult	:	"false"
},
{
	testName		:	"VT282-4141 | Set i2of5reportCheckDigit  :True  | true",
	propertyName	:	"i2of5reportCheckDigit",
	scannerTypes	:	"All",
	OSTypes			:	"All",
	propertyValue	:	"true",
	expectedResult	:	"true"
},
{
	testName		:	"VT282-4142 | Set i2of5reportCheckDigit  :false  | false",
	propertyName	:	"i2of5reportCheckDigit",
	scannerTypes	:	"All",
	OSTypes			:	"All",
	propertyValue	:	"false",
	expectedResult	:	"false"
},
{
	testName		:	"VT282-4143 | Set i2of5verifyCheckDigit:none  | none",
	propertyName	:	"i2of5verifyCheckDigit",
	scannerTypes	:	"All",
	OSTypes			:	"All",
	propertyValue	:	"none",
	expectedResult	:	"none"
},
{
	testName		:	"VT282-4144 | Set i2of5verifyCheckDigit:uss | uss",
	propertyName	:	"i2of5verifyCheckDigit",
	scannerTypes	:	"All",
	OSTypes			:	"All",
	propertyValue	:	"uss",
	expectedResult	:	"uss"
},
{
	testName		:	"VT282-4145 | Set i2of5verifyCheckDigit:opcc | opcc",
	propertyName	:	"i2of5verifyCheckDigit",
	scannerTypes	:	"All",
	OSTypes			:	"All",
	propertyValue	:	"opcc",
	expectedResult	:	"opcc"
},
{
	testName		:	"VT282-4146 | Set japPostal  :True  | true",
	propertyName	:	"japPostal",
	scannerTypes	:	"All",
	OSTypes			:	"All",
	propertyValue	:	"true",
	expectedResult	:	"true",
	deviceNotSupport	: ["MC32"]
},
{
	testName		:	"VT282-4147 | Set japPostal  :false  | false",
	propertyName	:	"japPostal",
	scannerTypes	:	"All",
	OSTypes			:	"All",
	propertyValue	:	"false",
	expectedResult	:	"false",
	deviceNotSupport	: ["MC32"]
},
{
	testName		:	"VT282-4148 | Set korean3of5  :True  | true",
	propertyName	:	"korean3of5",
	scannerTypes	:	"All",
	OSTypes			:	"All",
	propertyValue	:	"true",
	expectedResult	:	"true"
},
{
	testName		:	"VT282-4149 | Set korean3of5  :false  | false",
	propertyName	:	"korean3of5",
	scannerTypes	:	"All",
	OSTypes			:	"All",
	propertyValue	:	"false",
	expectedResult	:	"false"
},
{
	testName		:	"VT282-4150 | Set korean3of5maxLength:0  | 0",
	propertyName	:	"korean3of5maxLength",
	scannerTypes	:	"All",
	OSTypes			:	"WINDOWS",
	propertyValue	:	"0",
	expectedResult	:	"0"
},
{
	testName		:	"VT282-4151 | Set korean3of5maxLength:44 | 44",
	propertyName	:	"korean3of5maxLength",
	scannerTypes	:	"All",
	OSTypes			:	"WINDOWS",
	propertyValue	:	"44",
	expectedResult	:	"44"
},
{
	testName		:	"VT282-4152 | Set korean3of5maxLength:55 | 55",
	propertyName	:	"korean3of5maxLength",
	scannerTypes	:	"All",
	OSTypes			:	"WINDOWS",
	propertyValue	:	"55",
	expectedResult	:	"55"
},
{
	testName		:	"VT282-4153 | Set korean3of5minLength:0  | 0",
	propertyName	:	"korean3of5minLength",
	scannerTypes	:	"All",
	OSTypes			:	"WINDOWS",
	propertyValue	:	"0",
	expectedResult	:	"0"
},
{
	testName		:	"VT282-4154 | Set korean3of5minLength:43 | 43",
	propertyName	:	"korean3of5minLength",
	scannerTypes	:	"All",
	OSTypes			:	"WINDOWS",
	propertyValue	:	"43",
	expectedResult	:	"43"
},
{
	testName		:	"VT282-4155 | Set korean3of5minLength:55 | 55",
	propertyName	:	"korean3of5minLength",
	scannerTypes	:	"All",
	OSTypes			:	"WINDOWS",
	propertyValue	:	"55",
	expectedResult	:	"55"
},
{
	testName		:	"VT282-4156 | Set korean3of5redundancy  :True  | true",
	propertyName	:	"korean3of5redundancy",
	scannerTypes	:	"All",
	OSTypes			:	"WINDOWS",
	propertyValue	:	"true",
	expectedResult	:	"true"
},
{
	testName		:	"VT282-4157 | Set korean3of5redundancy  :false  | false",
	propertyName	:	"korean3of5redundancy",
	scannerTypes	:	"All",
	OSTypes			:	"WINDOWS",
	propertyValue	:	"false",
	expectedResult	:	"false"
},
{
	testName		:	"VT282-4158 | Set macroMicroPdf  :True  | true",
	propertyName	:	"macroMicroPdf",
	scannerTypes	:	"Imager",
	OSTypes			:	"WINDOWS",
	propertyValue	:	"true",
	expectedResult	:	"true"
},
{
	testName		:	"VT282-4159 | Set macroMicroPdf  :false  | false",
	propertyName	:	"macroMicroPdf",
	scannerTypes	:	"Imager",
	OSTypes			:	"WINDOWS",
	propertyValue	:	"false",
	expectedResult	:	"false"
},
{
	testName		:	"VT282-4160 | Set macroMicroPdfBufferLabels  :True  | true",
	propertyName	:	"macroMicroPdfBufferLabels",
	scannerTypes	:	"Imager",
	OSTypes			:	"WINDOWS",
	propertyValue	:	"true",
	expectedResult	:	"true"
},
{
	testName		:	"VT282-4161 | Set macroMicroPdfBufferLabels  :false  | false",
	propertyName	:	"macroMicroPdfBufferLabels",
	scannerTypes	:	"Imager",
	OSTypes			:	"WINDOWS",
	propertyValue	:	"false",
	expectedResult	:	"false"
},
{
	testName		:	"VT282-4162 | Set macroMicroPdfBufferLabels  :True  | true",
	propertyName	:	"macroMicroPdfBufferLabels",
	scannerTypes	:	"Imager",
	OSTypes			:	"WINDOWS",
	propertyValue	:	"true",
	expectedResult	:	"true"
},
{
	testName		:	"VT282-4163 | Set macroMicroPdfBufferLabels  :false  | false",
	propertyName	:	"macroMicroPdfBufferLabels",
	scannerTypes	:	"Imager",
	OSTypes			:	"WINDOWS",
	propertyValue	:	"false",
	expectedResult	:	"false"
},
{
	testName		:	"VT282-4164 | Set macroMicroPdfConvertToMicroPdf  :True  | true",
	propertyName	:	"macroMicroPdfConvertToMicroPdf",
	scannerTypes	:	"Imager",
	OSTypes			:	"WINDOWS",
	propertyValue	:	"true",
	expectedResult	:	"true"
},
{
	testName		:	"VT282-4165 | Set macroMicroPdfConvertToMicroPdf  :false  | false",
	propertyName	:	"macroMicroPdfConvertToMicroPdf",
	scannerTypes	:	"Imager",
	OSTypes			:	"WINDOWS",
	propertyValue	:	"false",
	expectedResult	:	"false"
},
{
	testName		:	"VT282-4166 | Set macroMicroPdfExclusive  :True  | true",
	propertyName	:	"macroMicroPdfExclusive",
	scannerTypes	:	"Imager",
	OSTypes			:	"WINDOWS",
	propertyValue	:	"true",
	expectedResult	:	"true"
},
{
	testName		:	"VT282-4167 | Set macroMicroPdfExclusive  :false  | false",
	propertyName	:	"macroMicroPdfExclusive",
	scannerTypes	:	"Imager",
	OSTypes			:	"WINDOWS",
	propertyValue	:	"false",
	expectedResult	:	"false"
},
{
	testName		:	"VT282-4168 | Set macroMicroPdfReportAppendInfo  :True  | true",
	propertyName	:	"macroMicroPdfReportAppendInfo",
	scannerTypes	:	"Imager",
	OSTypes			:	"WINDOWS",
	propertyValue	:	"true",
	expectedResult	:	"true"
},
{
	testName		:	"VT282-4169 | Set macroMicroPdfReportAppendInfo  :false  | false",
	propertyName	:	"macroMicroPdfReportAppendInfo",
	scannerTypes	:	"Imager",
	OSTypes			:	"WINDOWS",
	propertyValue	:	"false",
	expectedResult	:	"false"
},
{
	testName		:	"VT282-4170 | Set macroPdf  :True  | true",
	propertyName	:	"macroPdf",
	scannerTypes	:	"Imager",
	OSTypes			:	"WINDOWS",
	propertyValue	:	"true",
	expectedResult	:	"true"
},
{
	testName		:	"VT282-4171 | Set macroPdf  :false  | false",
	propertyName	:	"macroPdf",
	scannerTypes	:	"Imager",
	OSTypes			:	"WINDOWS",
	propertyValue	:	"false",
	expectedResult	:	"false"
},
{
	testName		:	"VT282-4172 | Set macroPdfBufferLabels  :True  | true",
	propertyName	:	"macroPdfBufferLabels",
	scannerTypes	:	"Imager",
	OSTypes			:	"WINDOWS",
	propertyValue	:	"true",
	expectedResult	:	"true"
},
{
	testName		:	"VT282-4173 | Set macroPdfBufferLabels  :false  | false",
	propertyName	:	"macroPdfBufferLabels",
	scannerTypes	:	"Imager",
	OSTypes			:	"WINDOWS",
	propertyValue	:	"false",
	expectedResult	:	"false"
},
{
	testName		:	"VT282-4174 | Set macroPdfConvertToPdf417  :True  | true",
	propertyName	:	"macroPdfConvertToPdf417",
	scannerTypes	:	"Imager",
	OSTypes			:	"WINDOWS",
	propertyValue	:	"true",
	expectedResult	:	"true"
},
{
	testName		:	"VT282-4175 | Set macroPdfConvertToPdf417  :false  | false",
	propertyName	:	"macroPdfConvertToPdf417",
	scannerTypes	:	"Imager",
	OSTypes			:	"WINDOWS",
	propertyValue	:	"false",
	expectedResult	:	"false"
},
{
	testName		:	"VT282-4176 | Set macroPdfExclusive  :True  | true",
	propertyName	:	"macroPdfExclusive",
	scannerTypes	:	"Imager",
	OSTypes			:	"WINDOWS",
	propertyValue	:	"true",
	expectedResult	:	"true"
},
{
	testName		:	"VT282-4177 | Set macroPdfExclusive  :false  | false",
	propertyName	:	"macroPdfExclusive",
	scannerTypes	:	"Imager",
	OSTypes			:	"WINDOWS",
	propertyValue	:	"false",
	expectedResult	:	"false"
},
{
	testName		:	"VT282-4178 | Set matrix2of5  :True  | true",
	propertyName	:	"matrix2of5",
	scannerTypes	:	"All",
	OSTypes			:	"All",
	propertyValue	:	"true",
	expectedResult	:	"true"
},
{
	testName		:	"VT282-4179 | Set matrix2of5 :false  | false",
	propertyName	:	"matrix2of5",
	scannerTypes	:	"All",
	OSTypes			:	"All",
	propertyValue	:	"false",
	expectedResult	:	"false"
},
{
	testName		:	"VT282-4180 | Set matrix2of5maxLength:0  | 0",
	propertyName	:	"matrix2of5maxLength",
	scannerTypes	:	"All",
	OSTypes			:	"All",
	propertyValue	:	"0",
	expectedResult	:	"0"
},
{
	testName		:	"VT282-4181 | Set matrix2of5maxLength:01 | 01",
	propertyName	:	"matrix2of5maxLength",
	scannerTypes	:	"All",
	OSTypes			:	"All",
	propertyValue	:	"1",
	expectedResult	:	"1"
},
{
	testName		:	"VT282-4182 | Set matrix2of5maxLength:55 | 55",
	propertyName	:	"matrix2of5maxLength",
	scannerTypes	:	"All",
	OSTypes			:	"All",
	propertyValue	:	"55",
	expectedResult	:	"55"
},
{
	testName		:	"VT282-4183 | Set matrix2of5minLength:0  | 0",
	propertyName	:	"matrix2of5minLength",
	scannerTypes	:	"All",
	OSTypes			:	"All",
	propertyValue	:	"0",
	expectedResult	:	"0"
},
{
	testName		:	"VT282-4184 | Set matrix2of5minLength:09 | 09",
	propertyName	:	"matrix2of5minLength",
	scannerTypes	:	"All",
	OSTypes			:	"All",
	propertyValue	:	"9",
	expectedResult	:	"9"
},
{
	testName		:	"VT282-4185 | Set matrix2of5minLength:55 | 55",
	propertyName	:	"matrix2of5minLength",
	scannerTypes	:	"All",
	OSTypes			:	"All",
	propertyValue	:	"55",
	expectedResult	:	"55"
},
{
	testName		:	"VT282-4186 | Set matrix2of5reportCheckDigit  :True  | true",
	propertyName	:	"matrix2of5reportCheckDigit",
	scannerTypes	:	"All",
	OSTypes			:	"All",
	propertyValue	:	"true",
	expectedResult	:	"true"
},
{
	testName		:	"VT282-4187 | Set matrix2of5reportCheckDigit :false  | false",
	propertyName	:	"matrix2of5reportCheckDigit",
	scannerTypes	:	"All",
	OSTypes			:	"All",
	propertyValue	:	"false",
	expectedResult	:	"false"
},
{
	testName		:	"VT282-4188 | Set matrix2of5verifyCheckDigit   :True  | true",
	propertyName	:	"matrix2of5verifyCheckDigit",
	scannerTypes	:	"All",
	OSTypes			:	"All",
	propertyValue	:	"true",
	expectedResult	:	"true"
},
{
	testName		:	"VT282-4189 | Set matrix2of5verifyCheckDigit  :false  | false",
	propertyName	:	"matrix2of5verifyCheckDigit",
	scannerTypes	:	"All",
	OSTypes			:	"All",
	propertyValue	:	"false",
	expectedResult	:	"false"
},
{
	testName		:	"VT282-4190 | Set maxiCode   :True  | true",
	propertyName	:	"maxiCode",
	scannerTypes	:	"Imager",
	OSTypes			:	"All",
	propertyValue	:	"true",
	expectedResult	:	"true"
},
{
	testName		:	"VT282-4191 | Set maxiCode  :false  | false",
	propertyName	:	"maxiCode",
	scannerTypes	:	"Imager",
	OSTypes			:	"All",
	propertyValue	:	"false",
	expectedResult	:	"false"
},
{
	testName		:	"VT282-4192 | Set microPdf   :True  | true",
	propertyName	:	"microPdf",
	scannerTypes	:	"Imager",
	OSTypes			:	"All",
	propertyValue	:	"true",
	expectedResult	:	"true"
},
{
	testName		:	"VT282-4193 | Set microPdf  :false  | false",
	propertyName	:	"microPdf",
	scannerTypes	:	"Imager",
	OSTypes			:	"All",
	propertyValue	:	"false",
	expectedResult	:	"false"
},
{
	testName		:	"VT282-4194 | Set microQr   :True  | true",
	propertyName	:	"microQr",
	scannerTypes	:	"Imager",
	OSTypes			:	"All",
	propertyValue	:	"true",
	expectedResult	:	"true"
},
{
	testName		:	"VT282-4195 | Set microQr  :false  | false",
	propertyName	:	"microQr",
	scannerTypes	:	"Imager",
	OSTypes			:	"All",
	propertyValue	:	"false",
	expectedResult	:	"false"
},
{
	testName		:	"VT282-4196 | Set msi   :True  | true",
	propertyName	:	"msi",
	scannerTypes	:	"All",
	OSTypes			:	"All",
	propertyValue	:	"true",
	expectedResult	:	"true"
},
{
	testName		:	"VT282-4197 | Set msi  :false  | false",
	propertyName	:	"msi",
	scannerTypes	:	"All",
	OSTypes			:	"All",
	propertyValue	:	"false",
	expectedResult	:	"false"
},
{
	testName		:	"VT282-4198 | Set msiCheckDigitScheme :mod11  | mod11",
	propertyName	:	"msiCheckDigitScheme",
	scannerTypes	:	"All",
	OSTypes			:	"All",
	propertyValue	:	"mod11",
	expectedResult	:	"mod11"
},
{
	testName		:	"VT282-4199 | Set msiCheckDigitScheme :mod10  | mod10",
	propertyName	:	"msiCheckDigitScheme",
	scannerTypes	:	"All",
	OSTypes			:	"All",
	propertyValue	:	"mod10",
	expectedResult	:	"mod10"
},
{
	testName		:	"VT282-4200 | Set msiCheckDigits :one  | one",
	propertyName	:	"msiCheckDigits",
	scannerTypes	:	"All",
	OSTypes			:	"All",
	propertyValue	:	"one",
	expectedResult	:	"one"
},
{
	testName		:	"VT282-4201 | Set msiCheckDigits :two  | two",
	propertyName	:	"msiCheckDigits",
	scannerTypes	:	"All",
	OSTypes			:	"All",
	propertyValue	:	"two",
	expectedResult	:	"two"
},
{
	testName		:	"VT282-4202 | Set msiMaxLength:0  | 0",
	propertyName	:	"msiMaxLength",
	scannerTypes	:	"All",
	OSTypes			:	"All",
	propertyValue	:	"0",
	expectedResult	:	"0"
},
{
	testName		:	"VT282-4203 | Set msiMaxLength:7 | 7",
	propertyName	:	"msiMaxLength",
	scannerTypes	:	"All",
	OSTypes			:	"All",
	propertyValue	:	"7",
	expectedResult	:	"7"
},
{
	testName		:	"VT282-4204 | Set msiMaxLength:55 | 55",
	propertyName	:	"msiMaxLength",
	scannerTypes	:	"All",
	OSTypes			:	"All",
	propertyValue	:	"55",
	expectedResult	:	"55"
},
{
	testName		:	"VT282-4205 | Set msiMinLength:0  | 0",
	propertyName	:	"msiMinLength",
	scannerTypes	:	"All",
	OSTypes			:	"All",
	propertyValue	:	"0",
	expectedResult	:	"0"
},
{
	testName		:	"VT282-4206 | Set msiMinLength:8 | 8",
	propertyName	:	"msiMinLength",
	scannerTypes	:	"All",
	OSTypes			:	"All",
	propertyValue	:	"8",
	expectedResult	:	"8"
},
{
	testName		:	"VT282-4207 | Set msiMinLength:55 | 55",
	propertyName	:	"msiMinLength",
	scannerTypes	:	"All",
	OSTypes			:	"All",
	propertyValue	:	"55",
	expectedResult	:	"55"
},
{
	testName		:	"VT282-4208 | Set msiRedundancy :True  | true",
	propertyName	:	"msiRedundancy",
	scannerTypes	:	"All",
	OSTypes			:	"All",
	propertyValue	:	"true",
	expectedResult	:	"true"
},
{
	testName		:	"VT282-4209 | Set msiRedundancy :false  | false",
	propertyName	:	"msiRedundancy",
	scannerTypes	:	"All",
	OSTypes			:	"All",
	propertyValue	:	"false",
	expectedResult	:	"false"
},
{
	testName		:	"VT282-4210 | Set msiReportCheckDigit :True  | true",
	propertyName	:	"msiReportCheckDigit",
	scannerTypes	:	"All",
	OSTypes			:	"All",
	propertyValue	:	"true",
	expectedResult	:	"true"
},
{
	testName		:	"VT282-4211 | Set msiReportCheckDigit :false  | false",
	propertyName	:	"msiReportCheckDigit",
	scannerTypes	:	"All",
	OSTypes			:	"All",
	propertyValue	:	"false",
	expectedResult	:	"false"
},
{
	testName		:	"VT282-4212 | Set pdf417 :True  | true",
	propertyName	:	"pdf417",
	scannerTypes	:	"Imager",
	OSTypes			:	"All",
	propertyValue	:	"true",
	expectedResult	:	"true"
},
{
	testName		:	"VT282-4213 | Set pdf417 :false  | false",
	propertyName	:	"pdf417",
	scannerTypes	:	"Imager",
	OSTypes			:	"All",
	propertyValue	:	"false",
	expectedResult	:	"false"
},
{
	testName		:	"VT282-4214 | Set qrCode :True  | true",
	propertyName	:	"qrCode",
	scannerTypes	:	"Imager",
	OSTypes			:	"All",
	propertyValue	:	"true",
	expectedResult	:	"true"
},
{
	testName		:	"VT282-4215 | Set qrCode :false  | false",
	propertyName	:	"qrCode",
	scannerTypes	:	"Imager",
	OSTypes			:	"All",
	propertyValue	:	"false",
	expectedResult	:	"false"
},
{
	testName		:	"VT282-4216 | Set signature :True  | true",
	propertyName	:	"signature",
	scannerTypes	:	"Imager",
	OSTypes			:	"WINDOWS",
	propertyValue	:	"true",
	expectedResult	:	"true"
},
{
	testName		:	"VT282-4217 | Set signature :false  | false",
	propertyName	:	"signature",
	scannerTypes	:	"Imager",
	OSTypes			:	"WINDOWS",
	propertyValue	:	"false",
	expectedResult	:	"false"
},
{
	testName		:	"VT282-4218 | Set signatureImageHeight :20  | 20",
	propertyName	:	"signatureImageHeight",
	scannerTypes	:	"Imager",
	OSTypes			:	"WINDOWS",
	propertyValue	:	"20",
	expectedResult	:	"20"
},
{
	testName		:	"VT282-4219 | Set signatureImageHeight :200  | 200",
	propertyName	:	"signatureImageHeight",
	scannerTypes	:	"Imager",
	OSTypes			:	"WINDOWS",
	propertyValue	:	"200",
	expectedResult	:	"200"
},
{
	testName		:	"VT282-4220 | Set signatureImageHeight :400  | 400",
	propertyName	:	"signatureImageHeight",
	scannerTypes	:	"Imager",
	OSTypes			:	"WINDOWS",
	propertyValue	:	"400",
	expectedResult	:	"400"
},
{
	testName		:	"VT282-4221 | Set signatureImageWidth :20  | 20",
	propertyName	:	"signatureImageWidth",
	scannerTypes	:	"Imager",
	OSTypes			:	"WINDOWS",
	propertyValue	:	"20",
	expectedResult	:	"20"
},
{
	testName		:	"VT282-4222 | Set signatureImageWidth :250  | 250",
	propertyName	:	"signatureImageWidth",
	scannerTypes	:	"Imager",
	OSTypes			:	"WINDOWS",
	propertyValue	:	"250",
	expectedResult	:	"250"
},
{
	testName		:	"VT282-4223 | Set signatureImageWidth :350  | 350",
	propertyName	:	"signatureImageWidth",
	scannerTypes	:	"Imager",
	OSTypes			:	"WINDOWS",
	propertyValue	:	"350",
	expectedResult	:	"350"
},
{
	testName		:	"VT282-4224 | Set signatureImageQuality :10  | 10",
	propertyName	:	"signatureImageQuality",
	scannerTypes	:	"Imager",
	OSTypes			:	"WINDOWS",
	propertyValue	:	"10",
	expectedResult	:	"10"
},
{
	testName		:	"VT282-4225 | Set signatureImageQuality :50  | 50",
	propertyName	:	"signatureImageQuality",
	scannerTypes	:	"Imager",
	OSTypes			:	"WINDOWS",
	propertyValue	:	"50",
	expectedResult	:	"50"
},
{
	testName		:	"VT282-4226 | Set signatureImageQuality :100  | 100",
	propertyName	:	"signatureImageQuality",
	scannerTypes	:	"Imager",
	OSTypes			:	"WINDOWS",
	propertyValue	:	"100",
	expectedResult	:	"100"
},
{
	testName		:	"VT282-4227 | Set tlc39 :True  | true",
	propertyName	:	"tlc39",
	scannerTypes	:	"Imager",
	OSTypes			:	"All",
	propertyValue	:	"true",
	expectedResult	:	"true"
},
{
	testName		:	"VT282-4228 | Set tlc39 :false  | false",
	propertyName	:	"tlc39",
	scannerTypes	:	"Imager",
	OSTypes			:	"All",
	propertyValue	:	"false",
	expectedResult	:	"false"
},
{
	testName		:	"VT282-4229 | Set trioptic39 :True  | true",
	propertyName	:	"trioptic39",
	scannerTypes	:	"Imager",
	OSTypes			:	"All",
	propertyValue	:	"true",
	expectedResult	:	"true"
},
{
	testName		:	"VT282-4230 | Set trioptic39 :false  | false",
	propertyName	:	"trioptic39",
	scannerTypes	:	"Imager",
	OSTypes			:	"All",
	propertyValue	:	"false",
	expectedResult	:	"false"
},
{
	testName		:	"VT282-4231 | Set trioptic39Redundancy :True  | true",
	propertyName	:	"trioptic39Redundancy",
	scannerTypes	:	"Imager",
	OSTypes			:	"WINDOWS",
	propertyValue	:	"true",
	expectedResult	:	"true"
},
{
	testName		:	"VT282-4232 | Set trioptic39Redundancy :false  | false",
	propertyName	:	"trioptic39Redundancy",
	scannerTypes	:	"Imager",
	OSTypes			:	"WINDOWS",
	propertyValue	:	"false",
	expectedResult	:	"false"
},
{
	testName		:	"VT282-4233 | Set ukPostal :True  | true",
	propertyName	:	"ukPostal",
	scannerTypes	:	"All",
	OSTypes			:	"All",
	propertyValue	:	"true",
	expectedResult	:	"true",
	deviceNotSupport	: ["MC32"]
},
{
	testName		:	"VT282-4234 | Set ukPostal :false  | false",
	propertyName	:	"ukPostal",
	scannerTypes	:	"All",
	OSTypes			:	"All",
	propertyValue	:	"false",
	expectedResult	:	"false",
	deviceNotSupport	: ["MC32"]
},
{
	testName		:	"VT282-4235 | Set ukPostalReportCheckDigit :True  | true",
	propertyName	:	"ukPostalReportCheckDigit",
	scannerTypes	:	"All",
	OSTypes			:	"ANDROID",
	propertyValue	:	"true",
	expectedResult	:	"true",
	deviceNotSupport	: ["MC32"]
},
{
	testName		:	"VT282-4236 | Set ukPostalReportCheckDigit :false  | false",
	propertyName	:	"ukPostalReportCheckDigit",
	scannerTypes	:	"All",
	OSTypes			:	"ANDROID",
	propertyValue	:	"false",
	expectedResult	:	"false",
	deviceNotSupport	: ["MC32"]
},
{
	testName		:	"VT282-4237 | Set upcEanBookland  :True  | true",
	propertyName	:	"upcEanBookland",
	scannerTypes	:	"All",
	OSTypes			:	"All",
	propertyValue	:	"true",
	expectedResult	:	"true"
},
{
	testName		:	"VT282-4238 | Set upcEanBookland  :false  | false",
	propertyName	:	"upcEanBookland",
	scannerTypes	:	"All",
	OSTypes			:	"All",
	propertyValue	:	"false",
	expectedResult	:	"false"
},
{
	testName		:	"VT282-4239 | Set upcEanBooklandFormat  :isbn10  | isbn10",
	propertyName	:	"upcEanBooklandFormat",
	scannerTypes	:	"All",
	OSTypes			:	"WINDOWS",
	propertyValue	:	"isbn10",
	expectedResult	:	"isbn10"
},
{
	testName		:	"VT282-4240 | Set upcEanBooklandFormat  :isbn13  | isbn13",
	propertyName	:	"upcEanBooklandFormat",
	scannerTypes	:	"All",
	OSTypes			:	"WINDOWS",
	propertyValue	:	"isbn13",
	expectedResult	:	"isbn13"
},
{
	testName		:	"VT282-4241 | Set upcEanConvertGs1dataBarToUpcEan  :true  | true",
	propertyName	:	"upcEanConvertGs1dataBarToUpcEan",
	scannerTypes	:	"All",
	OSTypes			:	"All",
	propertyValue	:	"true",
	expectedResult	:	"true"
},
{
	testName		:	"VT282-4242 | Set upcEanConvertGs1dataBarToUpcEan  :false  | false",
	propertyName	:	"upcEanConvertGs1dataBarToUpcEan",
	scannerTypes	:	"All",
	OSTypes			:	"All",
	propertyValue	:	"false",
	expectedResult	:	"false"
},
{
	testName		:	"VT282-4243 | Set upcEanCoupon  :true  | true",
	propertyName	:	"upcEanCoupon",
	scannerTypes	:	"All",
	OSTypes			:	"All",
	propertyValue	:	"true",
	expectedResult	:	"true"
},
{
	testName		:	"VT282-4244 | Set upcEanCoupon  :false  | false",
	propertyName	:	"upcEanCoupon",
	scannerTypes	:	"All",
	OSTypes			:	"All",
	propertyValue	:	"false",
	expectedResult	:	"false"
},
{
	testName		:	"VT282-4245 | Set upcEanLinearDecode  :true  | true",
	propertyName	:	"upcEanLinearDecode",
	scannerTypes	:	"All",
	OSTypes			:	"WINDOWS",
	propertyValue	:	"true",
	expectedResult	:	"true"
},
{
	testName		:	"VT282-4246 | Set upcEanLinearDecode  :false  | false",
	propertyName	:	"upcEanLinearDecode",
	scannerTypes	:	"All",
	OSTypes			:	"WINDOWS",
	propertyValue	:	"false",
	expectedResult	:	"false"
},
{
	testName		:	"VT282-4247 | Set upcEanRandomWeightCheckDigit  :true  | true",
	propertyName	:	"upcEanRandomWeightCheckDigit",
	scannerTypes	:	"All",
	OSTypes			:	"WINDOWS",
	propertyValue	:	"true",
	expectedResult	:	"true"
},
{
	testName		:	"VT282-4248 | Set upcEanRandomWeightCheckDigit  :false  | false",
	propertyName	:	"upcEanRandomWeightCheckDigit",
	scannerTypes	:	"All",
	OSTypes			:	"WINDOWS",
	propertyValue	:	"false",
	expectedResult	:	"false"
},
{
	testName		:	"VT282-4249 | Set upcEanRetryCount  :2  | 2",
	propertyName	:	"upcEanRetryCount",
	scannerTypes	:	"All",
	OSTypes			:	"All",
	propertyValue	:	"2",
	expectedResult	:	"2"
},
{
	testName		:	"VT282-4250 | Set upcEanRetryCount  :20  | 20",
	propertyName	:	"upcEanRetryCount",
	scannerTypes	:	"All",
	OSTypes			:	"All",
	propertyValue	:	"20",
	expectedResult	:	"20"
},
{
	testName		:	"VT282-4251 | Set upcEanSecurityLevel:0  | 0",
	propertyName	:	"upcEanSecurityLevel",
	scannerTypes	:	"All",
	OSTypes			:	"All",
	propertyValue	:	"0",
	expectedResult	:	"0"
},
{
	testName		:	"VT282-4252 | Set upcEanSecurityLevel:1  | 1",
	propertyName	:	"upcEanSecurityLevel",
	scannerTypes	:	"All",
	OSTypes			:	"All",
	propertyValue	:	"1",
	expectedResult	:	"1"
},
{
	testName		:	"VT282-4253 | Set upcEanSecurityLevel:2  | 2",
	propertyName	:	"upcEanSecurityLevel",
	scannerTypes	:	"All",
	OSTypes			:	"All",
	propertyValue	:	"2",
	expectedResult	:	"2"
},
{
	testName		:	"VT282-4254 | Set upcEanSecurityLevel:3  | 3",
	propertyName	:	"upcEanSecurityLevel",
	scannerTypes	:	"All",
	OSTypes			:	"All",
	propertyValue	:	"3",
	expectedResult	:	"3"
},
{
	testName		:	"VT282-4255 | Set upcEanSupplemental2  :true  | true",
	propertyName	:	"upcEanSupplemental2",
	scannerTypes	:	"All",
	OSTypes			:	"All",
	propertyValue	:	"true",
	expectedResult	:	"true"
},
{
	testName		:	"VT282-4256 | Set upcEanSupplemental2  :false  | false",
	propertyName	:	"upcEanSupplemental2",
	scannerTypes	:	"All",
	OSTypes			:	"All",
	propertyValue	:	"false",
	expectedResult	:	"false"
},
{
	testName		:	"VT282-4257 | Set upcEanSupplemental5  :true  | true",
	propertyName	:	"upcEanSupplemental5",
	scannerTypes	:	"All",
	OSTypes			:	"All",
	propertyValue	:	"true",
	expectedResult	:	"true"
},
{
	testName		:	"VT282-4258 | Set upcEanSupplemental5  :false  | false",
	propertyName	:	"upcEanSupplemental5",
	scannerTypes	:	"All",
	OSTypes			:	"All",
	propertyValue	:	"false",
	expectedResult	:	"false"
},
{
	testName		:	"VT282-4259 | Set upcEanSupplementalMode:none  | none",
	propertyName	:	"upcEanSupplementalMode",
	scannerTypes	:	"All",
	OSTypes			:	"All",
	propertyValue	:	"none",
	expectedResult	:	"none"
},
{
	testName		:	"VT282-4260 | Set upcEanSupplementalMode:auto  | auto",
	propertyName	:	"upcEanSupplementalMode",
	scannerTypes	:	"All",
	OSTypes			:	"All",
	propertyValue	:	"auto",
	expectedResult	:	"auto"
},
{
	testName		:	"VT282-4261 | Set upcEanSupplementalMode:always  | always",
	propertyName	:	"upcEanSupplementalMode",
	scannerTypes	:	"All",
	OSTypes			:	"All",
	propertyValue	:	"always",
	expectedResult	:	"always"
},
{
	testName		:	"VT282-4262 | Set upcEanSupplementalMode:smart  | smart",
	propertyName	:	"upcEanSupplementalMode",
	scannerTypes	:	"All",
	OSTypes			:	"All",
	propertyValue	:	"smart",
	expectedResult	:	"smart"
},
{
	testName		:	"VT282-4263 | Set upcEanSupplementalMode:378or379  | 378or379",
	propertyName	:	"upcEanSupplementalMode",
	scannerTypes	:	"All",
	OSTypes			:	"All",
	propertyValue	:	"378or379",
	expectedResult	:	"378or379"
},
{
	testName		:	"VT282-4264 | Set upcEanSupplementalMode:978or979  | 978or979",
	propertyName	:	"upcEanSupplementalMode",
	scannerTypes	:	"All",
	OSTypes			:	"All",
	propertyValue	:	"978or979",
	expectedResult	:	"978or979"
},
{
	testName		:	"VT282-4265 | Set upcEanSupplementalMode:414or419or434or439  | 414or419or434or439",
	propertyName	:	"upcEanSupplementalMode",
	scannerTypes	:	"All",
	OSTypes			:	"All",
	propertyValue	:	"414or419or434or439",
	expectedResult	:	"414or419or434or439"
},
{
	testName		:	"VT282-4266 | Set upca  :true  | true",
	propertyName	:	"upca",
	scannerTypes	:	"All",
	OSTypes			:	"All",
	propertyValue	:	"true",
	expectedResult	:	"true"
},
{
	testName		:	"VT282-4267 | Set upca  :false  | false",
	propertyName	:	"upca",
	OSTypes			:	"All",
	scannerTypes	:	"All",
	propertyValue	:	"false",
	expectedResult	:	"false"
},
{
	testName		:	"VT282-4268 | Set upcaPreamble  :none  | none",
	propertyName	:	"upcaPreamble",
	scannerTypes	:	"All",
	OSTypes			:	"All",
	propertyValue	:	"none",
	expectedResult	:	"none"
},
{
	testName		:	"VT282-4269 | Set upcaPreamble  :systemChar  | systemChar",
	propertyName	:	"upcaPreamble",
	scannerTypes	:	"All",
	OSTypes			:	"All",
	propertyValue	:	"systemChar",
	expectedResult	:	"systemChar"
},
{
	testName		:	"VT282-4270 | Set upcaPreamble  :countryAndSystemChars  | countryAndSystemChars",
	propertyName	:	"upcaPreamble",
	scannerTypes	:	"All",
	OSTypes			:	"All",
	propertyValue	:	"countryAndSystemChars",
	expectedResult	:	"countryAndSystemChars"
},
{
	testName		:	"VT282-4271 | Set upcaReportCheckDigit  :true  | true",
	propertyName	:	"upcaReportCheckDigit",
	scannerTypes	:	"All",
	OSTypes			:	"All",
	propertyValue	:	"true",
	expectedResult	:	"true"
},
{
	testName		:	"VT282-4272 | Set upcaReportCheckDigit  :false  | false",
	propertyName	:	"upcaReportCheckDigit",
	scannerTypes	:	"All",
	OSTypes			:	"All",
	propertyValue	:	"false",
	expectedResult	:	"false"
},
{
	testName		:	"VT282-4273 | Set upce0  :true  | true",
	propertyName	:	"upce0",
	scannerTypes	:	"All",
	OSTypes			:	"All",
	propertyValue	:	"true",
	expectedResult	:	"true"
},
{
	testName		:	"VT282-4274 | Set upce0  :false  | false",
	propertyName	:	"upce0",
	scannerTypes	:	"All",
	OSTypes			:	"All",
	propertyValue	:	"false",
	expectedResult	:	"false"
},
{
	testName		:	"VT282-4275 | Set upce0convertToUpca  :true  | true",
	propertyName	:	"upce0convertToUpca",
	scannerTypes	:	"All",
	OSTypes			:	"All",
	propertyValue	:	"true",
	expectedResult	:	"true"
},
{
	testName		:	"VT282-4276 | Set upce0convertToUpca  :false  | false",
	propertyName	:	"upce0convertToUpca",
	scannerTypes	:	"All",
	OSTypes			:	"All",
	propertyValue	:	"false",
	expectedResult	:	"false"
},
{
	testName		:	"VT282-4277 | Set upce0preamble  :none  | none",
	propertyName	:	"upce0preamble",
	scannerTypes	:	"All",
	OSTypes			:	"All",
	propertyValue	:	"none",
	expectedResult	:	"none"
},
{
	testName		:	"VT282-4278 | Set upce0preamble  :systemChar  | systemChar",
	propertyName	:	"upce0preamble",
	scannerTypes	:	"All",
	OSTypes			:	"All",
	propertyValue	:	"systemChar",
	expectedResult	:	"systemChar"
},
{
	testName		:	"VT282-4279 | Set upce0preamble  :countryAndSystemChars  | countryAndSystemChars",
	propertyName	:	"upce0preamble",
	scannerTypes	:	"All",
	OSTypes			:	"All",
	propertyValue	:	"countryAndSystemChars",
	expectedResult	:	"countryAndSystemChars"
},
{
	testName		:	"VT282-4280 | Set upce0reportCheckDigit   :true  | true",
	propertyName	:	"upce0reportCheckDigit",
	scannerTypes	:	"All",
	OSTypes			:	"All",
	propertyValue	:	"true",
	expectedResult	:	"true"
},
{
	testName		:	"VT282-4281 | Set upce0reportCheckDigit   :false  | false",
	propertyName	:	"upce0reportCheckDigit",
	scannerTypes	:	"All",
	OSTypes			:	"All",
	propertyValue	:	"false",
	expectedResult	:	"false"
},
{
	testName		:	"VT282-4282 | Set upce1  :true  | true",
	propertyName	:	"upce1",
	scannerTypes	:	"All",
	OSTypes			:	"All",
	propertyValue	:	"true",
	expectedResult	:	"true"
},
{
	testName		:	"VT282-4283 | Set upce1  :false  | false",
	propertyName	:	"upce1",
	scannerTypes	:	"All",
	OSTypes			:	"All",
	propertyValue	:	"false",
	expectedResult	:	"false"
},
{
	testName		:	"VT282-4284 | Set upce1convertToUpca  :true  | true",
	propertyName	:	"upce1convertToUpca",
	scannerTypes	:	"All",
	OSTypes			:	"All",
	propertyValue	:	"true",
	expectedResult	:	"true"
},
{
	testName		:	"VT282-4285 | Set upce1convertToUpca  :false  | false",
	propertyName	:	"upce1convertToUpca",
	scannerTypes	:	"All",
	OSTypes			:	"All",
	propertyValue	:	"false",
	expectedResult	:	"false"
},
{
	testName		:	"VT282-4286 | Set upce1preamble:none  | none",
	propertyName	:	"upce1preamble",
	scannerTypes	:	"All",
	OSTypes			:	"All",
	propertyValue	:	"none",
	expectedResult	:	"none"
},
{
	testName		:	"VT282-4287 | Set upce1preamble:systemChar  | systemChar",
	propertyName	:	"upce1preamble",
	scannerTypes	:	"All",
	OSTypes			:	"All",
	propertyValue	:	"systemChar",
	expectedResult	:	"systemChar"
},
{
	testName		:	"VT282-4288 | Set upce1preamble :countryAndSystemChars  | countryAndSystemChars",
	propertyName	:	"upce1preamble",
	scannerTypes	:	"All",
	OSTypes			:	"All",
	propertyValue	:	"countryAndSystemChars",
	expectedResult	:	"countryAndSystemChars"
},
{
	testName		:	"VT282-4290 | Set upce1reportCheckDigit:true  | true",
	propertyName	:	"upce1reportCheckDigit",
	scannerTypes	:	"All",
	OSTypes			:	"All",
	propertyValue	:	"true",
	expectedResult	:	"true"
},
{
	testName		:	"VT282-4291 | Set upce1reportCheckDigit :false  | false",
	propertyName	:	"upce1reportCheckDigit",
	scannerTypes	:	"All",
	OSTypes			:	"All",
	propertyValue	:	"false",
	expectedResult	:	"false"
},
{
	testName		:	"VT282-4292 | Set us4state :true  | true",
	propertyName	:	"us4state",
	scannerTypes	:	"All",
	OSTypes			:	"All",
	propertyValue	:	"true",
	expectedResult	:	"true",
	deviceNotSupport	: ["MC32"]
},
{
	testName		:	"VT282-4293 | Set us4state :false  | false",
	propertyName	:	"us4state",
	scannerTypes	:	"All",
	OSTypes			:	"All",
	propertyValue	:	"false",
	expectedResult	:	"false",
	deviceNotSupport	: ["MC32"]
},
{
	testName		:	"VT282-4294 | Set us4stateFics :true  | true",
	propertyName	:	"us4stateFics",
	scannerTypes	:	"All",
	OSTypes			:	"All",
	propertyValue	:	"true",
	expectedResult	:	"true",
	deviceNotSupport	: ["MC32"]
},
{
	testName		:	"VT282-4295 | Set us4stateFics :false  | false",
	propertyName	:	"us4stateFics",
	scannerTypes	:	"All",
	OSTypes			:	"All",
	propertyValue	:	"false",
	expectedResult	:	"false",
	deviceNotSupport	: ["MC32"]
},
{
	testName		:	"VT282-4296 | Set usPlanet :true  | true",
	propertyName	:	"usPlanet",
	scannerTypes	:	"All",
	OSTypes			:	"All",
	propertyValue	:	"true",
	expectedResult	:	"true",
	deviceNotSupport	: ["MC32"]
},
{
	testName		:	"VT282-4297 | Set usPlanet :false  | false",
	propertyName	:	"usPlanet",
	scannerTypes	:	"All",
	OSTypes			:	"All",
	propertyValue	:	"false",
	expectedResult	:	"false",
	deviceNotSupport	: ["MC32"]
},
//NOT SUPPORTED ON GINGERBREAD.
//{
//	testName		:	"VT282-4298 | Set usPlanetReportCheckDigit :true  | true",
//	propertyName	:	"usPlanetReportCheckDigit",
//	scannerTypes	:	"All",
//	OSTypes			:	"ANDROID",
//	propertyValue	:	"true",
//	expectedResult	:	"true"
//},
//{
//	testName		:	"VT282-4299 | Set usPlanetReportCheckDigit :false  | false",
//	propertyName	:	"usPlanetReportCheckDigit",
//	scannerTypes	:	"All",
//	OSTypes			:	"ANDROID",
//	propertyValue	:	"false",
//	expectedResult	:	"false"
//},
{
	testName		:	"VT282-4300 | Set usPostNet :true  | true",
	propertyName	:	"usPostNet",
	scannerTypes	:	"All",
	OSTypes			:	"All",
	propertyValue	:	"true",
	expectedResult	:	"true",
	deviceNotSupport	: ["MC32"]
},
{
	testName		:	"VT282-4301 | Set usPostNet :false  | false",
	propertyName	:	"usPostNet",
	scannerTypes	:	"All",
	OSTypes			:	"All",
	propertyValue	:	"false",
	expectedResult	:	"false",
	deviceNotSupport	: ["MC32"]
},
//NOT SUPPORTED ON GINGERBREAD.
//{
//	testName		:	"VT282-4302 | Set usPostNetReportCheckDigit :true  | true",
//	propertyName	:	"usPostNetReportCheckDigit",
//	scannerTypes	:	"All",
//	OSTypes			:	"ANDROID",
//	propertyValue	:	"true",
//	expectedResult	:	"true"
//},
//{
//	testName		:	"VT282-4303 | Set usPostNetReportCheckDigit :false  | false",
//	propertyName	:	"usPostNetReportCheckDigit",
//	scannerTypes	:	"All",
//	OSTypes			:	"ANDROID",
//	propertyValue	:	"false",
//	expectedResult	:	"false"
//},
{
	testName		:	"VT282-4304 | Set webcode :true  | true",
	propertyName	:	"webcode",
	scannerTypes	:	"Imager",
	OSTypes			:	"All",
	propertyValue	:	"true",
	expectedResult	:	"true",
	notOnAndroidJB  :   true
},
{
	testName		:	"VT282-4305 | Set webcode :false  | false",
	propertyName	:	"webcode",
	scannerTypes	:	"Imager",
	OSTypes			:	"All",
	propertyValue	:	"false",
	expectedResult	:	"false",
	notOnAndroidJB  :   true
},
{
	testName		:	"VT282-4306 | Set webcodeDecodeGtSubtype :true  | true",
	propertyName	:	"webcodeDecodeGtSubtype",
	scannerTypes	:	"Imager",
	OSTypes			:	"All",
	propertyValue	:	"true",
	expectedResult	:	"true",
	notOnAndroidJB  :   true
},
{
	testName		:	"VT282-4307 | Set webcodeDecodeGtSubtype :false  | false",
	propertyName	:	"webcodeDecodeGtSubtype",
	scannerTypes	:	"Imager",
	OSTypes			:	"All",
	propertyValue	:	"false",
	expectedResult	:	"false",
	notOnAndroidJB  :   true
},
{
	testName		:	"VT282-4308 | Set upcEanRetryCount  :10  | 10",
	propertyName	:	"upcEanRetryCount",
	scannerTypes	:	"All",
	OSTypes			:	"All",
	propertyValue	:	"10",
	expectedResult	:	"10"
},
{
	testName		:	"VT282-4309 | Set triggerConnected :true  | true",
	propertyName	:	"triggerConnected",
	scannerTypes	:	"Imager",
	OSTypes			:	"WINDOWS",
	propertyValue	:	"true",
	expectedResult	:	"true"
},
{
	testName		:	"VT282-4310 | Set triggerConnected  :false  | false",
	propertyName	:	"triggerConnected",
	scannerTypes	:	"Imager",
	OSTypes			:	"WINDOWS",
	propertyValue	:	"false",
	expectedResult	:	"false"
}

];

var scanCallback = function (data){

};

var getApplicableProperties = function (objScnType){
	
	var deviceScannerType = objScnType.getProperty('friendlyName');
	var finalSCNObj = [];
	
	//Consumer Android
	if(isAndroid && Rho.System.deviceName.indexOf('Motorola Solutions') == -1)
	{
		return;
	}

	for (var i = 0; i < arr_scanner_property.length ; i++){

		if((arr_scanner_property[i]['OSTypes'] == 'All') || (arr_scanner_property[i]['OSTypes'] == Rho.System.platform)){
			var scnType = arr_scanner_property[i]['scannerTypes']
			if ((deviceScannerType == "2D Imager" || Rho.System.oemInfo == "MC40") && isAndroid && arr_scanner_property[i]['notOnAndroidImager'] === true || //If it is the Android hardware Imager
				(arr_scanner_property[i]['notOnAndroidJB'] === true && isJB) ||
				(arr_scanner_property[i]['notInAndroidEMDK3'] === true && isKK))
			{
				//Dont add
			}
			else if(scnType == "All")
			{ 
				if(!arr_scanner_property[i]['deviceNotSupport']){
					if(deviceScannerType.indexOf("Bluetooth") == -1){
						finalSCNObj.push(arr_scanner_property[i]);
					}
				}else{
					if(arr_scanner_property[i]['deviceNotSupport'].indexOf(Rho.System.deviceName) == -1){
						if(deviceScannerType.indexOf("Bluetooth") == -1){
							finalSCNObj.push(arr_scanner_property[i]);
						}
					}
				}
			}
			else if (deviceScannerType.indexOf(scnType) != -1) //for Imager and Laser
			{
				finalSCNObj.push(arr_scanner_property[i]);
			}
			else if ((deviceScannerType.indexOf("Camera") != -1) && scnType == "Imager") //for camera Scanner
			{
				finalSCNObj.push(arr_scanner_property[i]);
			}
			else if ((deviceScannerType.indexOf("Pico") != -1) && scnType == "Imager") //for Pico Imaging Scanner
			{
				finalSCNObj.push(arr_scanner_property[i]);
			}
			else if ((deviceScannerType.indexOf("Bluetooth") == -1))
			{
				if ((deviceScannerType.indexOf("SSI Scanner") != -1) && scnType == "1D Scanner"){
					finalSCNObj.push(arr_scanner_property[i]);
				}
			}
		}
	}

	return finalSCNObj;
}

var isAndroid = (Rho.System.platform == "ANDROID");
var isKK = (isAndroid && Rho.System.osVersion.indexOf('4.4') == 0);
var isJB = (isAndroid && Rho.System.osVersion.indexOf('4.') == 0 && !isKK);

var ENABLE_TIMEOUT_VALUE = (Rho.System.platform == "ANDROID" ? 10 : 8000);