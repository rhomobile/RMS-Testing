var bar_setget_scanner_property = [

{
	testName		:	"VT282-3001 | call setproperty with rastermode:None  | None",
	propertyName	:	"rasterMode",
	scannerTypes	:	"Laser",
	propertyValue	:	"none",
	expectedResult	:	"none"
},
{
	testName		:	"VT282-3002 | call setproperty with rastermode:openAlways | openAlways",
	propertyName	:	"rasterMode",
	scannerTypes	:	"Laser",
	propertyValue	:	"openAlways",
	expectedResult	:	"openAlways"
},
{
	testName		:	"VT282-3003 | call setproperty with rastermode:smart  | smart",
	propertyName	:	"rasterMode",
	scannerTypes	:	"Laser",
	propertyValue	:	"smart",
	expectedResult	:	"smart"
},
{
	testName		:	"VT282-3004 | call setproperty with rastermode:cyclone | openAlways",
	propertyName	:	"rasterMode",
	scannerTypes	:	"Laser",
	propertyValue	:	"cyclone",
	expectedResult	:	"cyclone"
},
{
	testName		:	"VT282-3005 | call setproperty with rasterHeight:50 | 50",
	propertyName	:	"rasterHeight",
	scannerTypes	:	"Laser",
	propertyValue	:	"50",
	expectedResult	:	"50"
},
{
	testName		:	"VT282-3006 | call setproperty with rasterHeight:0 | 0",
	propertyName	:	"rasterHeight",
	scannerTypes	:	"Laser",
	propertyValue	:	"0",
	expectedResult	:	"0"
},
{
	testName		:	"VT282-3007 | call setproperty with rasterHeight:100 | 100",
	propertyName	:	"rasterHeight",
	scannerTypes	:	"Laser",
	propertyValue	:	"100",
	expectedResult	:	"100"
},
{
	testName		:	"VT282-3008 | call setproperty with aimMode:none | none",
	propertyName	:	"aimMode",
	scannerTypes	:	"Imager",
	propertyValue	:	"none",
	expectedResult	:	"none"
},
{
	testName		:	"VT282-3009 | call setproperty with aimMode:dot | dot",
	propertyName	:	"aimMode",
	scannerTypes	:	"Laser",
	propertyValue	:	"dot",
	expectedResult	:	"dot"
},
{
	testName		:	"VT282-3010 | call setproperty with aimMode:slab | slab",
	propertyName	:	"aimMode",
	scannerTypes	:	"Laser",
	propertyValue	:	"slab",
	expectedResult	:	"slab"
},
{
	testName		:	"VT282-3011 | call setproperty with aimMode:reticle | reticle",
	propertyName	:	"aimMode",
	scannerTypes	:	"Imager",
	propertyValue	:	"reticle",
	expectedResult	:	"reticle"
},
{
	testName		:	"VT282-3012 | call setproperty with dpmMode:true | true",
	propertyName	:	"dpmMode",
	scannerTypes	:	"Imager",
	propertyValue	:	"true",
	expectedResult	:	"true"
},
{
	testName		:	"VT282-3013 | call setproperty with dpmMode:false | false",
	propertyName	:	"dpmMode",
	scannerTypes	:	"Imager",
	propertyValue	:	"false",
	expectedResult	:	"false"
},
{
	testName		:	"VT282-3014 | call setproperty with focusMode:fixed | fixed",
	propertyName	:	"focusMode",
	scannerTypes	:	"Imager",
	propertyValue	:	"fixed",
	expectedResult	:	"fixed"
},
{
	testName		:	"VT282-3015 | call setproperty with focusMode:auto | auto",
	propertyName	:	"focusMode",
	scannerTypes	:	"Imager",
	propertyValue	:	"auto",
	expectedResult	:	"auto"
},
{
	testName		:	"VT282-3016 | call setproperty with illuminationMode:auto | auto",
	propertyName	:	"illuminationMode",
	scannerTypes	:	"Imager",
	propertyValue	:	"auto",
	expectedResult	:	"auto"
},
{
	testName		:	"VT282-3017 | call setproperty with illuminationMode:alwaysOn | alwaysOn",
	propertyName	:	"illuminationMode",
	scannerTypes	:	"Imager",
	propertyValue	:	"alwaysOn",
	expectedResult	:	"alwaysOn"
},
{
	testName		:	"VT282-3018 | call setproperty with illuminationMode:alwaysOff | alwaysOff",
	propertyName	:	"illuminationMode",
	scannerTypes	:	"Imager",
	propertyValue	:	"alwaysOff",
	expectedResult	:	"alwaysOff"
},
{
	testName		:	"VT282-3019 | call setproperty with inverse1dMode:enabled| enabled",
	propertyName	:	"inverse1dMode",
	scannerTypes	:	"Imager",
	propertyValue	:	"enabled",
	expectedResult	:	"enabled"
},
{
	testName		:	"VT282-3020 | call setproperty with inverse1dMode:disabled | disabled",
	propertyName	:	"inverse1dMode",
	scannerTypes	:	"Imager",
	propertyValue	:	"disabled",
	expectedResult	:	"disabled"
},
{
	testName		:	"VT282-3021 | call setproperty with inverse1dMode:auto | auto",
	propertyName	:	"inverse1dMode",
	scannerTypes	:	"Imager",
	propertyValue	:	"auto",
	expectedResult	:	"auto"
},
{
	testName		:	"VT282-3022 | call setproperty with linearSecurityLevel:redundancyAndLength | redundancyAndLength",
	propertyName	:	"linearSecurityLevel",
	scannerTypes	:	"All",
	propertyValue	:	"redundancyAndLength",
	expectedResult	:	"redundancyAndLength"
},
{
	testName		:	"VT282-3023 | call setproperty with linearSecurityLevel:shortOrCodabar | shortOrCodabar",
	propertyName	:	"linearSecurityLevel",
	scannerTypes	:	"All",
	propertyValue	:	"shortOrCodabar",
	expectedResult	:	"shortOrCodabar"
},
{
	testName		:	"VT282-3024 | call setproperty with linearSecurityLevel:longAndShort | longAndShort",
	propertyName	:	"linearSecurityLevel",
	scannerTypes	:	"All",
	propertyValue	:	"longAndShort",
	expectedResult	:	"longAndShort"
},
{
	testName		:	"VT282-3025 | call setproperty with linearSecurityLevel:allTwice | allTwice",
	propertyName	:	"linearSecurityLevel",
	scannerTypes	:	"All",
	propertyValue	:	"allTwice",
	expectedResult	:	"allTwice"
},
{
	testName		:	"VT282-3026 | call setproperty with linearSecurityLevel:allThrice | allThrice",
	propertyName	:	"linearSecurityLevel",
	scannerTypes	:	"All",
	propertyValue	:	"allThrice",
	expectedResult	:	"allThrice"
},
{
	testName		:	"VT282-3027 | call setproperty with picklistMode:disabled | disabled",
	propertyName	:	"picklistMode",
	scannerTypes	:	"All",
	propertyValue	:	"disabled",
	expectedResult	:	"disabled"
},
{
	testName		:	"VT282-3028 | call setproperty with picklistMode:hardwareReticle | hardwareReticle",
	propertyName	:	"picklistMode",
	scannerTypes	:	"All",
	propertyValue	:	"hardwareReticle",
	expectedResult	:	"hardwareReticle"
},
{
	testName		:	"VT282-3029 | call setproperty with picklistMode:softwareReticle | softwareReticle",
	propertyName	:	"picklistMode",
	scannerTypes	:	"All",
	propertyValue	:	"softwareReticle",
	expectedResult	:	"softwareReticle"
},
{
	testName		:	"VT282-3030 | call setproperty with poorQuality1dMode:true | true",
	propertyName	:	"poorQuality1dMode",
	scannerTypes	:	"Imager",
	propertyValue	:	"true",
	expectedResult	:	"true"
},
{
	testName		:	"VT282-3031 | call setproperty with poorQuality1dMode:false | false",
	propertyName	:	"poorQuality1dMode",
	scannerTypes	:	"Imager",
	propertyValue	:	"false",
	expectedResult	:	"false"
},
{
	testName		:	"VT282-3032 | call setproperty with poorQuality1dMode:false | false",
	propertyName	:	"poorQuality1dMode",
	scannerTypes	:	"Imager",
	propertyValue	:	"false",
	expectedResult	:	"false"
},
{
	testName		:	"VT282-3033 | call setproperty with viewfinderMode:enabled | enabled",
	propertyName	:	"viewfinderMode",
	scannerTypes	:	"Imager",
	propertyValue	:	"enabled",
	expectedResult	:	"enabled"
},
{
	testName		:	"VT282-3034 | call setproperty with viewfinderMode:disabled | disabled",
	propertyName	:	"viewfinderMode",
	scannerTypes	:	"Imager",
	propertyValue	:	"disabled",
	expectedResult	:	"disabled"
},
{
	testName		:	"VT282-3035 | call setproperty with viewfinderMode:staticReticle | staticReticle",
	propertyName	:	"viewfinderMode",
	scannerTypes	:	"Imager",
	propertyValue	:	"staticReticle",
	expectedResult	:	"staticReticle"
},
{
	testName		:	"VT282-3036 | call setproperty with viewfinderMode:staticReticle | dynamicReticle",
	propertyName	:	"viewfinderMode",
	scannerTypes	:	"Imager",
	propertyValue	:	"dynamicReticle",
	expectedResult	:	"dynamicReticle"
},
{
	testName		:	"VT282-3037 | call setproperty with viewfinderFeedback:enabled | enabled",
	propertyName	:	"viewfinderFeedback",
	scannerTypes	:	"Imager",
	propertyValue	:	"enabled",
	expectedResult	:	"enabled"
},
{
	testName		:	"VT282-3038 | call setproperty with viewfinderFeedback:disabled | disabled",
	propertyName	:	"viewfinderFeedback",
	scannerTypes	:	"Imager",
	propertyValue	:	"disabled",
	expectedResult	:	"disabled"
},
{
	testName		:	"VT282-3039 | call setproperty with viewfinderFeedback:reticle | reticle",
	propertyName	:	"viewfinderFeedback",
	scannerTypes	:	"Imager",
	propertyValue	:	"reticle",
	expectedResult	:	"reticle"
},
{
	testName		:	"VT282-3040 | call setproperty with viewfinderHeight:200 | 200",
	propertyName	:	"viewfinderHeight",
	scannerTypes	:	"Imager",
	propertyValue	:	"200",
	expectedResult	:	"200"
},
{
	testName		:	"VT282-3041 | call setproperty with viewfinderWidth:250 | 250",
	propertyName	:	"viewfinderHeight",
	scannerTypes	:	"Imager",
	propertyValue	:	"250",
	expectedResult	:	"250"
},
{
	testName		:	"VT282-3042 | call setproperty with viewfinderX :150 | 150",
	propertyName	:	"viewfinderHeight",
	scannerTypes	:	"Imager",
	propertyValue	:	"150",
	expectedResult	:	"150"
},
{
	testName		:	"VT282-3043 | call setproperty with viewfinderY :100 | 100",
	propertyName	:	"viewfinderHeight",
	scannerTypes	:	"Imager",
	propertyValue	:	"100",
	expectedResult	:	"100"
},
{
	testName		:	"VT282-3044 | call setproperty with viewfinderFeedbackTime :4000 | 4000",
	propertyName	:	"viewfinderFeedbackTime",
	scannerTypes	:	"Imager",
	propertyValue	:	"4000",
	expectedResult	:	"4000"
},
{
	testName		:	"VT282-3045 | call setproperty with viewfinderFeedbackTime :7000 | 7000",
	propertyName	:	"viewfinderFeedbackTime",
	scannerTypes	:	"Imager",
	propertyValue	:	"7000",
	expectedResult	:	"7000"
},
{
	testName		:	"VT282-3046 | call setproperty with scanTimeout :10000 | 10000",
	propertyName	:	"scanTimeout",
	scannerTypes	:	"All",
	propertyValue	:	"10000",
	expectedResult	:	"10000"
},
{
	testName		:	"VT282-3047 | call setproperty with scanTimeout :3000 | 3000",
	propertyName	:	"scanTimeout",
	scannerTypes	:	"All",
	propertyValue	:	"3000",
	expectedResult	:	"3000"
},
{
	testName		:	"VT282-3048 | call setproperty with scanTimeout :0 | 0",
	propertyName	:	"scanTimeout",
	scannerTypes	:	"All",
	propertyValue	:	"0",
	expectedResult	:	"0"
},
{
	testName		:	"VT282-3049 | call setproperty with bidirectionalRedundancy :true | true",
	propertyName	:	"bidirectionalRedundancy",
	scannerTypes	:	"Laser",
	propertyValue	:	"true",
	expectedResult	:	"true"
},
{
	testName		:	"VT282-3050 | call setproperty with bidirectionalRedundancy :false | false",
	propertyName	:	"bidirectionalRedundancy",
	scannerTypes	:	"Laser",
	propertyValue	:	"false",
	expectedResult	:	"false"
},
{
	testName		:	"VT282-3051 | call setproperty with klasseEins :true | true",
	propertyName	:	"klasseEins",
	scannerTypes	:	"Laser",
	propertyValue	:	"true",
	expectedResult	:	"true"
},
{
	testName		:	"VT282-3052 | call setproperty with klasseEins :false | false",
	propertyName	:	"klasseEins",
	scannerTypes	:	"Laser",
	propertyValue	:	"false",
	expectedResult	:	"false"
},
{
	testName		:	"VT282-3053 | call setproperty with sameSymbolTimeout :5000 | 5000",
	propertyName	:	"sameSymbolTimeout",
	scannerTypes	:	"All",
	propertyValue	:	"5000",
	expectedResult	:	"5000"
},
{
	testName		:	"VT282-3054 | call setproperty with sameSymbolTimeout :0 | 0",
	propertyName	:	"sameSymbolTimeout",
	scannerTypes	:	"All",
	propertyValue	:	"0",
	expectedResult	:	"0"
},
{
	testName		:	"VT282-3055 | call setproperty with differentSymbolTimeout :2000 | 2000",
	propertyName	:	"differentSymbolTimeout",
	scannerTypes	:	"All",
	propertyValue	:	"2000",
	expectedResult	:	"2000"
},
{
	testName		:	"VT282-3056 | call setproperty with differentSymbolTimeout :0 | 0",
	propertyName	:	"differentSymbolTimeout",
	scannerTypes	:	"All",
	propertyValue	:	"0",
	expectedResult	:	"0"
},
{
	testName		:	"VT282-3057 | call setproperty with adaptiveScanning :true | true",
	propertyName	:	"adaptiveScanning",
	scannerTypes	:	"Laser",
	propertyValue	:	"true",
	expectedResult	:	"true"
},
{
	testName		:	"VT282-3058 | call setproperty with adaptiveScanning :false | false",
	propertyName	:	"adaptiveScanning",
	scannerTypes	:	"Laser",
	propertyValue	:	"false",
	expectedResult	:	"false"
},
{
	testName		:	"VT282-3059 | call setproperty with dbpMode :normal | normal",
	propertyName	:	"dbpMode",
	scannerTypes	:	"Laser",
	propertyValue	:	"normal",
	expectedResult	:	"normal"
},
{
	testName		:	"VT282-3060 | call setproperty with dbpMode :composite | composite",
	propertyName	:	"dbpMode",
	scannerTypes	:	"Laser",
	propertyValue	:	"composite",
	expectedResult	:	"composite"
},
{
	testName		:	"VT282-3061 | call setproperty with timedAimDuration :4000 | 4000",
	propertyName	:	"timedAimDuration",
	scannerTypes	:	"All",
	propertyValue	:	"2000",
	expectedResult	:	"2000"
},
{
	testName		:	"VT282-3062 | call setproperty with timedAimDuration :1000 | 1000",
	propertyName	:	"timedAimDuration",
	scannerTypes	:	"All",
	propertyValue	:	"1000",
	expectedResult	:	"1000"
},
{
	testName		:	"VT282-3063 | call setproperty with aimType :trigger | trigger",
	propertyName	:	"aimType",
	scannerTypes	:	"All",
	propertyValue	:	"trigger",
	expectedResult	:	"trigger"
},
{
	testName		:	"VT282-3064 | call setproperty with aimType :timedHold | timedHold",
	propertyName	:	"aimType",
	scannerTypes	:	"All",
	propertyValue	:	"timedHold",
	expectedResult	:	"timedHold"
},
{
	testName		:	"VT282-3065 | call setproperty with aimType :timedRelease | timedRelease",
	propertyName	:	"aimType",
	scannerTypes	:	"All",
	propertyValue	:	"timedRelease",
	expectedResult	:	"timedRelease"
},
{
	testName		:	"VT282-3066 | call setproperty with aimType :presentation | presentation",
	propertyName	:	"aimType",
	scannerTypes	:	"All",
	propertyValue	:	"presentation",
	expectedResult	:	"presentation"
},
{
	testName		:	"VT282-3067 | call setproperty with aimType :pressAndRelease | pressAndRelease",
	propertyName	:	"aimType",
	scannerTypes	:	"All",
	propertyValue	:	"pressAndRelease",
	expectedResult	:	"pressAndRelease"
},
{
	testName		:	"VT282-3068 | call setproperty with aimType :continuousRead | continuousRead",
	propertyName	:	"aimType",
	scannerTypes	:	"All",
	propertyValue	:	"continuousRead",
	expectedResult	:	"continuousRead"
},
{
	testName		:	"VT282-3069 | call setproperty with beamWidth :normal | normal",
	propertyName	:	"beamWidth",
	scannerTypes	:	"Laser",
	propertyValue	:	"normal",
	expectedResult	:	"normal"
},
{
	testName		:	"VT282-3070 | call setproperty with beamWidth :wide | wide",
	propertyName	:	"beamWidth",
	scannerTypes	:	"Laser",
	propertyValue	:	"wide",
	expectedResult	:	"wide"
},
{
	testName		:	"VT282-3071 | call setproperty with beamWidth :narrow | narrow",
	propertyName	:	"beamWidth",
	scannerTypes	:	"Laser",
	propertyValue	:	"narrow",
	expectedResult	:	"narrow"
},
{
	testName		:	"VT282-3072 | call setproperty with barcodeDataFormat :binary | binary",
	propertyName	:	"barcodeDataFormat",
	scannerTypes	:	"Imager",
	propertyValue	:	"binary",
	expectedResult	:	"binary"
},
{
	testName		:	"VT282-3073 | call setproperty with barcodeDataFormat :text | text",
	propertyName	:	"barcodeDataFormat",
	scannerTypes	:	"Imager",
	propertyValue	:	"text",
	expectedResult	:	"text"
},
{
	testName		:	"VT282-3074 | call setproperty with dataBufferSize :50000 | 50000",
	propertyName	:	"dataBufferSize",
	scannerTypes	:	"Imager",
	propertyValue	:	"50000",
	expectedResult	:	"50000"
},
{
	testName		:	"VT282-3075 | call setproperty with dataBufferSize :20000 | 20000",
	propertyName	:	"dataBufferSize",
	scannerTypes	:	"Imager",
	propertyValue	:	"20000",
	expectedResult	:	"20000"
},
{
	testName		:	"VT282-3076 | call setproperty with dataBufferSize :0 | 0",
	propertyName	:	"dataBufferSize",
	scannerTypes	:	"Imager",
	propertyValue	:	"0",
	expectedResult	:	"0"
},
{
	testName		:	"VT282-3077 | call setproperty with decodeDuration :1000 | 1000",
	propertyName	:	"decodeDuration",
	scannerTypes	:	"All",
	propertyValue	:	"1000",
	expectedResult	:	"1000"
},
{
	testName		:	"VT282-3078 | call setproperty with decodeDuration :5000 | 5000",
	propertyName	:	"decodeDuration",
	scannerTypes	:	"All",
	propertyValue	:	"5000",
	expectedResult	:	"5000"
},
{
	testName		:	"VT282-3079 | call setproperty with decodeFrequency :0 | 0",
	propertyName	:	"decodeFrequency",
	scannerTypes	:	"All",
	propertyValue	:	"0",
	expectedResult	:	"0"
},
{
	testName		:	"VT282-3080 | call setproperty with decodeFrequency :65535 | 65535",
	propertyName	:	"decodeFrequency",
	scannerTypes	:	"All",
	propertyValue	:	"65535",
	expectedResult	:	"65535"
},
{
	testName		:	"VT282-3081 | call setproperty with invalidDecodeFrequency :0 | 0",
	propertyName	:	"invalidDecodeFrequency",
	scannerTypes	:	"All",
	propertyValue	:	"0",
	expectedResult	:	"0"
},
{
	testName		:	"VT282-3082 | call setproperty with invalidDecodeFrequency :65535 | 65535",
	propertyName	:	"invalidDecodeFrequency",
	scannerTypes	:	"All",
	propertyValue	:	"65535",
	expectedResult	:	"65535"
},
{
	testName		:	"VT282-3083 | call setproperty with  decodeSound :localpath | application/alarm.wav",
	propertyName	:	"decodeSound",
	scannerTypes	:	"All",
	propertyValue	:	"file://application/alarm.wav",
	expectedResult	:	"application/alarm.wav"
},
{
	testName		:	"VT282-3084 | call setproperty with  invalidDecodeSound :localpath | application/alarm5.wav",
	propertyName	:	"invalidDecodeSound",
	scannerTypes	:	"All",
	propertyValue	:	"file://application/alarm5.wav",
	expectedResult	:	"application/alarm5.wav"
},
{
	testName		:	"VT282-3085 | call setproperty with  decodeVolume :5 | 5",
	propertyName	:	"decodeVolume",
	scannerTypes	:	"All",
	propertyValue	:	"5",
	expectedResult	:	"5"
},
{
	testName		:	"VT282-3086 | call setproperty with  decodeVolume :1 | 1",
	propertyName	:	"decodeVolume",
	scannerTypes	:	"All",
	propertyValue	:	"1",
	expectedResult	:	"1"
},
{
	testName		:	"VT282-3087 | call setproperty with  decodeVolume :0 | 0",
	propertyName	:	"decodeVolume",
	scannerTypes	:	"All",
	propertyValue	:	"0",
	expectedResult	:	"0"
},
{
	testName		:	"VT282-3088 | call setproperty with  disableScannerDuringNavigate :true | true",
	propertyName	:	"disableScannerDuringNavigate",
	scannerTypes	:	"All",
	propertyValue	:	"true",
	expectedResult	:	"true"
},
{
	testName		:	"VT282-3089 | call setproperty with  disableScannerDuringNavigate :false | false",
	propertyName	:	"disableScannerDuringNavigate",
	scannerTypes	:	"All",
	propertyValue	:	"false",
	expectedResult	:	"false"
},
{
	testName		:	"VT282-3090 | call setproperty with  lowBatteryScan :true | true",
	propertyName	:	"lowBatteryScan",
	scannerTypes	:	"All",
	propertyValue	:	"true",
	expectedResult	:	"true"
},
{
	testName		:	"VT282-3091 | call setproperty with  lowBatteryScan :false | false",
	propertyName	:	"lowBatteryScan",
	scannerTypes	:	"All",
	propertyValue	:	"false",
	expectedResult	:	"false"
},
{
	testName		:	"VT282-3092 | call setproperty with  autoEnter :true | true",
	propertyName	:	"autoEnter",
	scannerTypes	:	"All",
	propertyValue	:	"true",
	expectedResult	:	"true"
},
{
	testName		:	"VT282-3093 | call setproperty with  autoEnter :false| false",
	propertyName	:	"autoEnter",
	scannerTypes	:	"All",
	propertyValue	:	"false",
	expectedResult	:	"false"
},
{
	testName		:	"VT282-3094 | call setproperty with  autoTab :true | true",
	propertyName	:	"autoTab",
	scannerTypes	:	"All",
	propertyValue	:	"true",
	expectedResult	:	"true"
},
{
	testName		:	"VT282-3095 | call setproperty with  autoTab :false| false",
	propertyName	:	"autoTab",
	scannerTypes	:	"All",
	propertyValue	:	"false",
	expectedResult	:	"false"
},
{
	testName		:	"VT282-3096 | call setproperty with  hapticFeedback :true | true",
	propertyName	:	"hapticFeedback",
	scannerTypes	:	"All",
	propertyValue	:	"true",
	expectedResult	:	"true"
},
{
	testName		:	"VT282-3097 | call setproperty with  hapticFeedback :false| false",
	propertyName	:	"hapticFeedback",
	scannerTypes	:	"All",
	propertyValue	:	"false",
	expectedResult	:	"false"
}
];

var bar_setget_decoder_property = [

{
	testName		:	"VT282-4001 | call setproperty with allDecoders:True  | true",
	propertyName	:	"allDecoders",
	scannerTypes	:	"",
	propertyValue	:	"true",
	expectedResult	:	"true"
},
{
	testName		:	"VT282-4002 | call setproperty with allDecoders:false  | false",
	propertyName	:	"allDecoders",
	scannerTypes	:	"",
	propertyValue	:	"false",
	expectedResult	:	"false"
},
{
	testName		:	"VT282-4003 | call setproperty with ausPostal:True  | true",
	propertyName	:	"ausPostal",
	scannerTypes	:	"",
	propertyValue	:	"true",
	expectedResult	:	"true"
},
{
	testName		:	"VT282-4004 | call setproperty with ausPostal:false  | false",
	propertyName	:	"ausPostal",
	scannerTypes	:	"",
	propertyValue	:	"false",
	expectedResult	:	"false"
},
{
	testName		:	"VT282-4005 | call setproperty with canPostal:True  | true",
	propertyName	:	"canPostal",
	scannerTypes	:	"",
	propertyValue	:	"true",
	expectedResult	:	"true"
},
{
	testName		:	"VT282-4006 | call setproperty with canPostal:false  | false",
	propertyName	:	"canPostal",
	scannerTypes	:	"",
	propertyValue	:	"false",
	expectedResult	:	"false"
},
{
	testName		:	"VT282-4007 | call setproperty with codabar:True  | true",
	propertyName	:	"codabar",
	scannerTypes	:	"",
	propertyValue	:	"true",
	expectedResult	:	"true"
},
{
	testName		:	"VT282-4008 | call setproperty with codabar:false  | false",
	propertyName	:	"codabar",
	scannerTypes	:	"",
	propertyValue	:	"false",
	expectedResult	:	"false"
},
{
	testName		:	"VT282-4009 | call setproperty with codabarClsiEditing:True  | true",
	propertyName	:	"codabarClsiEditing",
	scannerTypes	:	"",
	propertyValue	:	"true",
	expectedResult	:	"true"
},
{
	testName		:	"VT282-4010 | call setproperty with codabarClsiEditing:false  | false",
	propertyName	:	"codabarClsiEditing",
	scannerTypes	:	"",
	propertyValue	:	"false",
	expectedResult	:	"false"
},
{
	testName		:	"VT282-4011 | call setproperty with codabarMaxLength:0  | 0",
	propertyName	:	"codabarMaxLength",
	scannerTypes	:	"",
	propertyValue	:	"0",
	expectedResult	:	"0"
},
{
	testName		:	"VT282-4012 | call setproperty with codabarMaxLength:10 | 10",
	propertyName	:	"codabarMaxLength",
	scannerTypes	:	"",
	propertyValue	:	"10",
	expectedResult	:	"10"
},
{
	testName		:	"VT282-4013 | call setproperty with codabarMaxLength:55 | 55",
	propertyName	:	"codabarMaxLength",
	scannerTypes	:	"",
	propertyValue	:	"55",
	expectedResult	:	"55"
},
{
	testName		:	"VT282-4014 | call setproperty with codabarMinLength:0  | 0",
	propertyName	:	"codabarMinLength",
	scannerTypes	:	"",
	propertyValue	:	"0",
	expectedResult	:	"0"
},
{
	testName		:	"VT282-4015 | call setproperty with codabarMinLength:10 | 10",
	propertyName	:	"codabarMinLength",
	scannerTypes	:	"",
	propertyValue	:	"10",
	expectedResult	:	"10"
},
{
	testName		:	"VT282-4016 | call setproperty with codabarMinLength:55 | 55",
	propertyName	:	"codabarMinLength",
	scannerTypes	:	"",
	propertyValue	:	"55",
	expectedResult	:	"55"
},
{
	testName		:	"VT282-4017 | call setproperty with codabarNotisEditing:True  | true",
	propertyName	:	"codabarNotisEditing",
	scannerTypes	:	"",
	propertyValue	:	"true",
	expectedResult	:	"true"
},
{
	testName		:	"VT282-4018 | call setproperty with codabarNotisEditing:false  | false",
	propertyName	:	"codabarNotisEditing",
	scannerTypes	:	"",
	propertyValue	:	"false",
	expectedResult	:	"false"
},
{
	testName		:	"VT282-4019 | call setproperty with codabarRedundancy:True  | true",
	propertyName	:	"codabarRedundancy",
	scannerTypes	:	"",
	propertyValue	:	"true",
	expectedResult	:	"true"
},
{
	testName		:	"VT282-4020 | call setproperty with codabarRedundancy:false  | false",
	propertyName	:	"codabarRedundancy",
	scannerTypes	:	"",
	propertyValue	:	"false",
	expectedResult	:	"false"
},
{
	testName		:	"VT282-4021 | call setproperty with code11 :True  | true",
	propertyName	:	"code11",
	scannerTypes	:	"",
	propertyValue	:	"true",
	expectedResult	:	"true"
},
{
	testName		:	"VT282-4022 | call setproperty with code11 :false  | false",
	propertyName	:	"code11",
	scannerTypes	:	"",
	propertyValue	:	"false",
	expectedResult	:	"false"
},
{
	testName		:	"VT282-4023 | call setproperty with code11checkDigitCount:none  | none",
	propertyName	:	"code11checkDigitCount",
	scannerTypes	:	"",
	propertyValue	:	"none",
	expectedResult	:	"none"
},
{
	testName		:	"VT282-4024 | call setproperty with code11checkDigitCount:one | one",
	propertyName	:	"code11checkDigitCount",
	scannerTypes	:	"",
	propertyValue	:	"one",
	expectedResult	:	"one"
},
{
	testName		:	"VT282-4025 | call setproperty with code11checkDigitCount:two | two",
	propertyName	:	"code11checkDigitCount",
	scannerTypes	:	"",
	propertyValue	:	"two",
	expectedResult	:	"two"
},
{
	testName		:	"VT282-4026 | call setproperty with code11maxLength:0  | 0",
	propertyName	:	"code11maxLength",
	scannerTypes	:	"",
	propertyValue	:	"0",
	expectedResult	:	"0"
},
{
	testName		:	"VT282-4027 | call setproperty with code11maxLength:10 | 10",
	propertyName	:	"code11maxLength",
	scannerTypes	:	"",
	propertyValue	:	"10",
	expectedResult	:	"10"
},
{
	testName		:	"VT282-4028 | call setproperty with code11maxLength:55 | 55",
	propertyName	:	"code11maxLength",
	scannerTypes	:	"",
	propertyValue	:	"55",
	expectedResult	:	"55"
},
{
	testName		:	"VT282-4029 | call setproperty with code11minLength:0  | 0",
	propertyName	:	"code11minLength",
	scannerTypes	:	"",
	propertyValue	:	"0",
	expectedResult	:	"0"
},
{
	testName		:	"VT282-4030 | call setproperty with code11minLength:10 | 10",
	propertyName	:	"code11minLength",
	scannerTypes	:	"",
	propertyValue	:	"10",
	expectedResult	:	"10"
},
{
	testName		:	"VT282-4031 | call setproperty with code11minLength:55 | 55",
	propertyName	:	"code11minLength",
	scannerTypes	:	"",
	propertyValue	:	"55",
	expectedResult	:	"55"
},
{
	testName		:	"VT282-4032 | call setproperty with code11redundancy:True  | true",
	propertyName	:	"code11redundancy",
	scannerTypes	:	"",
	propertyValue	:	"true",
	expectedResult	:	"true"
},
{
	testName		:	"VT282-4033 | call setproperty with code11redundancy:false  | false",
	propertyName	:	"code11redundancy",
	scannerTypes	:	"",
	propertyValue	:	"false",
	expectedResult	:	"false"
},
{
	testName		:	"VT282-4034 | call setproperty with code11reportCheckDigit:True  | true",
	propertyName	:	"code11reportCheckDigit",
	scannerTypes	:	"",
	propertyValue	:	"true",
	expectedResult	:	"true"
},
{
	testName		:	"VT282-4035 | call setproperty with code11reportCheckDigit:false  | false",
	propertyName	:	"code11reportCheckDigit",
	scannerTypes	:	"",
	propertyValue	:	"false",
	expectedResult	:	"false"
},
{
	testName		:	"VT282-4036 | call setproperty with code128 :True  | true",
	propertyName	:	"code128",
	scannerTypes	:	"",
	propertyValue	:	"true",
	expectedResult	:	"true"
},
{
	testName		:	"VT282-4037 | call setproperty with code128 :false  | false",
	propertyName	:	"code128",
	scannerTypes	:	"",
	propertyValue	:	"false",
	expectedResult	:	"false"
},
{
	testName		:	"VT282-4038 | call setproperty with code128checkIsBtTable:True  | true",
	propertyName	:	"code128checkIsBtTable",
	scannerTypes	:	"",
	propertyValue	:	"true",
	expectedResult	:	"true"
},
{
	testName		:	"VT282-4039 | call setproperty with code128checkIsBtTable:false  | false",
	propertyName	:	"code128checkIsBtTable",
	scannerTypes	:	"",
	propertyValue	:	"false",
	expectedResult	:	"false"
},
{
	testName		:	"VT282-4040 | call setproperty with code128ean128:True  | true",
	propertyName	:	"code128ean128",
	scannerTypes	:	"",
	propertyValue	:	"true",
	expectedResult	:	"true"
},
{
	testName		:	"VT282-4041 | call setproperty with code128ean128:false  | false",
	propertyName	:	"code128ean128",
	scannerTypes	:	"",
	propertyValue	:	"false",
	expectedResult	:	"false"
},
{
	testName		:	"VT282-4042 | call setproperty with code128isbt128:True  | true",
	propertyName	:	"code128isbt128",
	scannerTypes	:	"",
	propertyValue	:	"true",
	expectedResult	:	"true"
},
{
	testName		:	"VT282-4043 | call setproperty with code128isbt128:false  | false",
	propertyName	:	"code128isbt128",
	scannerTypes	:	"",
	propertyValue	:	"false",
	expectedResult	:	"false"
},
{
	testName		:	"VT282-4044 | call setproperty with code128isbt128ConcatMode:never  | never",
	propertyName	:	"code128isbt128ConcatMode",
	scannerTypes	:	"",
	propertyValue	:	"never",
	expectedResult	:	"never"
},
{
	testName		:	"VT282-4045 | call setproperty with code128isbt128ConcatMode:always | always",
	propertyName	:	"code128isbt128ConcatMode",
	scannerTypes	:	"",
	propertyValue	:	"always",
	expectedResult	:	"always"
},
{
	testName		:	"VT282-4046 | call setproperty with code128isbt128ConcatMode:auto | auto",
	propertyName	:	"code128isbt128ConcatMode",
	scannerTypes	:	"",
	propertyValue	:	"auto",
	expectedResult	:	"auto"
},
{
	testName		:	"VT282-4047| call setproperty with code128maxLength:0  | 0",
	propertyName	:	"code128maxLength",
	scannerTypes	:	"",
	propertyValue	:	"0",
	expectedResult	:	"0"
},
{
	testName		:	"VT282-4048 | call setproperty with code128maxLength:10 | 10",
	propertyName	:	"code128maxLength",
	scannerTypes	:	"",
	propertyValue	:	"10",
	expectedResult	:	"10"
},
{
	testName		:	"VT282-4049 | call setproperty with code128maxLength:55 | 55",
	propertyName	:	"code128maxLength",
	scannerTypes	:	"",
	propertyValue	:	"55",
	expectedResult	:	"55"
},
{
	testName		:	"VT282-4050 | call setproperty with code128minLength:0  | 0",
	propertyName	:	"code128minLength",
	scannerTypes	:	"",
	propertyValue	:	"0",
	expectedResult	:	"0"
},
{
	testName		:	"VT282-4051 | call setproperty with code128minLength:10 | 10",
	propertyName	:	"code128minLength",
	scannerTypes	:	"",
	propertyValue	:	"10",
	expectedResult	:	"10"
},
{
	testName		:	"VT282-4052 | call setproperty with code128minLength:55 | 55",
	propertyName	:	"code128minLength",
	scannerTypes	:	"",
	propertyValue	:	"55",
	expectedResult	:	"55"
},
{
	testName		:	"VT282-4053 | call setproperty with code128other128:True  | true",
	propertyName	:	"code128other128",
	scannerTypes	:	"",
	propertyValue	:	"true",
	expectedResult	:	"true"
},
{
	testName		:	"VT282-4054 | call setproperty with code128other128:false  | false",
	propertyName	:	"code128other128",
	scannerTypes	:	"",
	propertyValue	:	"false",
	expectedResult	:	"false"
},
{
	testName		:	"VT282-4055 | call setproperty with code128redundancy:True  | true",
	propertyName	:	"code128redundancy",
	scannerTypes	:	"",
	propertyValue	:	"true",
	expectedResult	:	"true"
},
{
	testName		:	"VT282-4056 | call setproperty with code128redundancy:false  | false",
	propertyName	:	"code128redundancy",
	scannerTypes	:	"",
	propertyValue	:	"false",
	expectedResult	:	"false"
},
{
	testName		:	"VT282-4057 | call setproperty with code128securityLevel:0  | 0",
	propertyName	:	"code128securityLevel",
	scannerTypes	:	"",
	propertyValue	:	"0",
	expectedResult	:	"0"
},
{
	testName		:	"VT282-4058 | call setproperty with code128securityLevel:1  | 1",
	propertyName	:	"code128securityLevel",
	scannerTypes	:	"",
	propertyValue	:	"1",
	expectedResult	:	"1"
},
{
	testName		:	"VT282-4059 | call setproperty with code128securityLevel:2  | 2",
	propertyName	:	"code128securityLevel",
	scannerTypes	:	"",
	propertyValue	:	"2",
	expectedResult	:	"2"
},
{
	testName		:	"VT282-4060 | call setproperty with code128securityLevel:3  | 3",
	propertyName	:	"code128securityLevel",
	scannerTypes	:	"",
	propertyValue	:	"3",
	expectedResult	:	"3"
},
{
	testName		:	"VT282-4061 | call setproperty with code39 :True  | true",
	propertyName	:	"code39",
	scannerTypes	:	"",
	propertyValue	:	"true",
	expectedResult	:	"true"
},
{
	testName		:	"VT282-4062| call setproperty with code39 :false  | false",
	propertyName	:	"code39",
	scannerTypes	:	"",
	propertyValue	:	"false",
	expectedResult	:	"false"
},
{
	testName		:	"VT282-4063 | call setproperty with code39code32Prefix :True  | true",
	propertyName	:	"code39code32Prefix",
	scannerTypes	:	"",
	propertyValue	:	"true",
	expectedResult	:	"true"
},
{
	testName		:	"VT282-4064 | call setproperty with code39code32Prefix :false  | false",
	propertyName	:	"code39code32Prefix",
	scannerTypes	:	"",
	propertyValue	:	"false",
	expectedResult	:	"false"
},
{
	testName		:	"VT282-4065 | call setproperty with code39convertToCode32 :True  | true",
	propertyName	:	"code39convertToCode32",
	scannerTypes	:	"",
	propertyValue	:	"true",
	expectedResult	:	"true"
},
{
	testName		:	"VT282-4066 | call setproperty with code39convertToCode32 :false  | false",
	propertyName	:	"code39convertToCode32",
	scannerTypes	:	"",
	propertyValue	:	"false",
	expectedResult	:	"false"
},
{
	testName		:	"VT282-4067 | call setproperty with code39fullAscii :True  | true",
	propertyName	:	"code39fullAscii",
	scannerTypes	:	"",
	propertyValue	:	"true",
	expectedResult	:	"true"
},
{
	testName		:	"VT282-4068 | call setproperty with code39fullAscii :false  | false",
	propertyName	:	"code39fullAscii",
	scannerTypes	:	"",
	propertyValue	:	"false",
	expectedResult	:	"false"
},
{
	testName		:	"VT282-4069| call setproperty with code39maxLength:0  | 0",
	propertyName	:	"code39maxLength",
	scannerTypes	:	"",
	propertyValue	:	"0",
	expectedResult	:	"0"
},
{
	testName		:	"VT282-4070 | call setproperty with code39maxLength:10 | 10",
	propertyName	:	"code39maxLength",
	scannerTypes	:	"",
	propertyValue	:	"10",
	expectedResult	:	"10"
},
{
	testName		:	"VT282-4071 | call setproperty with code39maxLength:55 | 55",
	propertyName	:	"code39maxLength",
	scannerTypes	:	"",
	propertyValue	:	"55",
	expectedResult	:	"55"
},
{
	testName		:	"VT282-4072 | call setproperty with code39minLength:0  | 0",
	propertyName	:	"code39minLength",
	scannerTypes	:	"",
	propertyValue	:	"0",
	expectedResult	:	"0"
},
{
	testName		:	"VT282-4073 | call setproperty with code39minLength:10 | 10",
	propertyName	:	"code39minLength",
	scannerTypes	:	"",
	propertyValue	:	"10",
	expectedResult	:	"10"
},
{
	testName		:	"VT282-4074 | call setproperty with code39minLength:55 | 55",
	propertyName	:	"code39minLength",
	scannerTypes	:	"",
	propertyValue	:	"55",
	expectedResult	:	"55"
},
{
	testName		:	"VT282-4075 | call setproperty with code39redundancy :True  | true",
	propertyName	:	"code39redundancy",
	scannerTypes	:	"",
	propertyValue	:	"true",
	expectedResult	:	"true"
},
{
	testName		:	"VT282-4076 | call setproperty with code39redundancy :false  | false",
	propertyName	:	"code39redundancy",
	scannerTypes	:	"",
	propertyValue	:	"false",
	expectedResult	:	"false"
},
{
	testName		:	"VT282-4076 | call setproperty with code39reportCheckDigit :True  | true",
	propertyName	:	"code39reportCheckDigit",
	scannerTypes	:	"",
	propertyValue	:	"true",
	expectedResult	:	"true"
},
{
	testName		:	"VT282-4077 | call setproperty with code39reportCheckDigit :false  | false",
	propertyName	:	"code39reportCheckDigit",
	scannerTypes	:	"",
	propertyValue	:	"false",
	expectedResult	:	"false"
},
{
	testName		:	"VT282-4078 | call setproperty with code39securityLevel:0  | 0",
	propertyName	:	"code39securityLevel",
	scannerTypes	:	"",
	propertyValue	:	"0",
	expectedResult	:	"0"
},
{
	testName		:	"VT282-4079 | call setproperty with code39securityLevel:1  | 1",
	propertyName	:	"code39securityLevel",
	scannerTypes	:	"",
	propertyValue	:	"1",
	expectedResult	:	"1"
},
{
	testName		:	"VT282-4080 | call setproperty with code39securityLevel:2  | 2",
	propertyName	:	"code39securityLevel",
	scannerTypes	:	"",
	propertyValue	:	"2",
	expectedResult	:	"2"
},
{
	testName		:	"VT282-4081 | call setproperty with code39securityLevel:3  | 3",
	propertyName	:	"code39securityLevel",
	scannerTypes	:	"",
	propertyValue	:	"3",
	expectedResult	:	"3"
},
{
	testName		:	"VT282-4082 | call setproperty with code39verifyCheckDigit :True  | true",
	propertyName	:	"code39verifyCheckDigit",
	scannerTypes	:	"",
	propertyValue	:	"true",
	expectedResult	:	"true"
},
{
	testName		:	"VT282-4083 | call setproperty with code39verifyCheckDigit :false  | false",
	propertyName	:	"code39verifyCheckDigit",
	scannerTypes	:	"",
	propertyValue	:	"false",
	expectedResult	:	"false"
},
{
	testName		:	"VT282-4084 | call setproperty with code93 :True  | true",
	propertyName	:	"code93",
	scannerTypes	:	"",
	propertyValue	:	"true",
	expectedResult	:	"true"
},
{
	testName		:	"VT282-4085 | call setproperty with code93 :false  | false",
	propertyName	:	"code93",
	scannerTypes	:	"",
	propertyValue	:	"false",
	expectedResult	:	"false"
},
{
	testName		:	"VT282-4086 | call setproperty with code93maxLength:0  | 0",
	propertyName	:	"code93maxLength",
	scannerTypes	:	"",
	propertyValue	:	"0",
	expectedResult	:	"0"
},
{
	testName		:	"VT282-4087 | call setproperty with code93maxLength:10 | 10",
	propertyName	:	"code93maxLength",
	scannerTypes	:	"",
	propertyValue	:	"10",
	expectedResult	:	"10"
},
{
	testName		:	"VT282-4088 | call setproperty with code93maxLength:55 | 55",
	propertyName	:	"code93maxLength",
	scannerTypes	:	"",
	propertyValue	:	"55",
	expectedResult	:	"55"
},
{
	testName		:	"VT282-4089 | call setproperty with code93minLength:0  | 0",
	propertyName	:	"code93minLength",
	scannerTypes	:	"",
	propertyValue	:	"0",
	expectedResult	:	"0"
},
{
	testName		:	"VT282-4090 | call setproperty with code93minLength:10 | 10",
	propertyName	:	"code93minLength",
	scannerTypes	:	"",
	propertyValue	:	"10",
	expectedResult	:	"10"
},
{
	testName		:	"VT282-4091 | call setproperty with code93minLength:55 | 55",
	propertyName	:	"code93minLength",
	scannerTypes	:	"",
	propertyValue	:	"55",
	expectedResult	:	"55"
},
{
	testName		:	"VT282-4092 | call setproperty with code93redundancy :True  | true",
	propertyName	:	"code93redundancy",
	scannerTypes	:	"",
	propertyValue	:	"true",
	expectedResult	:	"true"
},
{
	testName		:	"VT282-4093 | call setproperty with code93redundancy :false  | false",
	propertyName	:	"code93redundancy",
	scannerTypes	:	"",
	propertyValue	:	"false",
	expectedResult	:	"false"
},
{
	testName		:	"VT282-4094 | call setproperty with compositeAb  :True  | true",
	propertyName	:	"compositeAb",
	scannerTypes	:	"",
	propertyValue	:	"true",
	expectedResult	:	"true"
},
{
	testName		:	"VT282-4095 | call setproperty with compositeAb  :false  | false",
	propertyName	:	"compositeAb",
	scannerTypes	:	"",
	propertyValue	:	"false",
	expectedResult	:	"false"
},
{
	testName		:	"VT282-4096 | call setproperty with compositeAbUccLinkMode:never  | never",
	propertyName	:	"compositeAbUccLinkMode",
	scannerTypes	:	"",
	propertyValue	:	"never",
	expectedResult	:	"never"
},
{
	testName		:	"VT282-4097 | call setproperty with compositeAbUccLinkMode:always | always",
	propertyName	:	"compositeAbUccLinkMode",
	scannerTypes	:	"",
	propertyValue	:	"always",
	expectedResult	:	"always"
},
{
	testName		:	"VT282-4098 | call setproperty with compositeAbUccLinkMode:auto | auto",
	propertyName	:	"compositeAbUccLinkMode",
	scannerTypes	:	"",
	propertyValue	:	"auto",
	expectedResult	:	"auto"
},
{
	testName		:	"VT282-4099 | call setproperty with compositeAbUseUpcPreambleCheckDigitRules  :True  | true",
	propertyName	:	"compositeAbUseUpcPreambleCheckDigitRules",
	scannerTypes	:	"",
	propertyValue	:	"true",
	expectedResult	:	"true"
},
{
	testName		:	"VT282-4100 | call setproperty with compositeAbUseUpcPreambleCheckDigitRules  :false  | false",
	propertyName	:	"compositeAbUseUpcPreambleCheckDigitRules",
	scannerTypes	:	"",
	propertyValue	:	"false",
	expectedResult	:	"false"
},
{
	testName		:	"VT282-4101 | call setproperty with compositeC  :True  | true",
	propertyName	:	"compositeC",
	scannerTypes	:	"",
	propertyValue	:	"true",
	expectedResult	:	"true"
},
{
	testName		:	"VT282-4102 | call setproperty with compositeC  :false  | false",
	propertyName	:	"compositeC",
	scannerTypes	:	"",
	propertyValue	:	"false",
	expectedResult	:	"false"
},
{
	testName		:	"VT282-4103 | call setproperty with d2of5  :True  | true",
	propertyName	:	"d2of5",
	scannerTypes	:	"",
	propertyValue	:	"true",
	expectedResult	:	"true"
},
{
	testName		:	"VT282-4104 | call setproperty with d2of5  :false  | false",
	propertyName	:	"d2of5",
	scannerTypes	:	"",
	propertyValue	:	"false",
	expectedResult	:	"false"
},
{
	testName		:	"VT282-4105 | call setproperty with d2of5maxLength:0  | 0",
	propertyName	:	"d2of5maxLength",
	scannerTypes	:	"",
	propertyValue	:	"0",
	expectedResult	:	"0"
},
{
	testName		:	"VT282-4106| call setproperty with d2of5maxLength:10 | 10",
	propertyName	:	"d2of5maxLength",
	scannerTypes	:	"",
	propertyValue	:	"10",
	expectedResult	:	"10"
},
{
	testName		:	"VT282-4107 | call setproperty with d2of5maxLength:55 | 55",
	propertyName	:	"d2of5maxLength",
	scannerTypes	:	"",
	propertyValue	:	"55",
	expectedResult	:	"55"
},
{
	testName		:	"VT282-4108 | call setproperty with d2of5minLength:0  | 0",
	propertyName	:	"d2of5minLength",
	scannerTypes	:	"",
	propertyValue	:	"0",
	expectedResult	:	"0"
},
{
	testName		:	"VT282-4109 | call setproperty with d2of5minLength:10 | 10",
	propertyName	:	"d2of5minLength",
	scannerTypes	:	"",
	propertyValue	:	"10",
	expectedResult	:	"10"
},
{
	testName		:	"VT282-4110 | call setproperty with d2of5minLength:55 | 55",
	propertyName	:	"d2of5minLength",
	scannerTypes	:	"",
	propertyValue	:	"55",
	expectedResult	:	"55"
},
{
	testName		:	"VT282-4111 | call setproperty with d2of5redundancy  :True  | true",
	propertyName	:	"d2of5redundancy",
	scannerTypes	:	"",
	propertyValue	:	"true",
	expectedResult	:	"true"
},
{
	testName		:	"VT282-4112 | call setproperty with d2of5redundancy  :false  | false",
	propertyName	:	"d2of5redundancy",
	scannerTypes	:	"",
	propertyValue	:	"false",
	expectedResult	:	"false"
},
{
	testName		:	"VT282-4113 | call setproperty with datamatrix  :True  | true",
	propertyName	:	"datamatrix",
	scannerTypes	:	"",
	propertyValue	:	"true",
	expectedResult	:	"true"
},
{
	testName		:	"VT282-4114 | call setproperty with datamatrix  :false  | false",
	propertyName	:	"datamatrix",
	scannerTypes	:	"",
	propertyValue	:	"false",
	expectedResult	:	"false"
},
{
	testName		:	"VT282-4115 | call setproperty with dutchPostal  :True  | true",
	propertyName	:	"dutchPostal",
	scannerTypes	:	"",
	propertyValue	:	"true",
	expectedResult	:	"true"
},
{
	testName		:	"VT282-4116 | call setproperty with dutchPostal  :false  | false",
	propertyName	:	"dutchPostal",
	scannerTypes	:	"",
	propertyValue	:	"false",
	expectedResult	:	"false"
},
{
	testName		:	"VT282-4117 | call setproperty with ean13  :True  | true",
	propertyName	:	"ean13",
	scannerTypes	:	"",
	propertyValue	:	"true",
	expectedResult	:	"true"
},
{
	testName		:	"VT282-4118 | call setproperty with ean13  :false  | false",
	propertyName	:	"ean13",
	scannerTypes	:	"",
	propertyValue	:	"false",
	expectedResult	:	"false"
},
{
	testName		:	"VT282-4119 | call setproperty with ean8  :True  | true",
	propertyName	:	"ean8",
	scannerTypes	:	"",
	propertyValue	:	"true",
	expectedResult	:	"true"
},
{
	testName		:	"VT282-4120 | call setproperty with ean8  :false  | false",
	propertyName	:	"ean8",
	scannerTypes	:	"",
	propertyValue	:	"false",
	expectedResult	:	"false"
},
{
	testName		:	"VT282-4121 | call setproperty with ean8convertToEan13  :True  | true",
	propertyName	:	"ean8convertToEan13",
	scannerTypes	:	"",
	propertyValue	:	"true",
	expectedResult	:	"true"
},
{
	testName		:	"VT282-4122 | call setproperty with ean8convertToEan13  :false  | false",
	propertyName	:	"ean8convertToEan13",
	scannerTypes	:	"",
	propertyValue	:	"false",
	expectedResult	:	"false"
},
{
	testName		:	"VT282-4123 | call setproperty with gs1dataBar  :True  | true",
	propertyName	:	"gs1dataBar",
	scannerTypes	:	"",
	propertyValue	:	"true",
	expectedResult	:	"true"
},
{
	testName		:	"VT282-4124 | call setproperty with gs1dataBar  :false  | false",
	propertyName	:	"gs1dataBar",
	scannerTypes	:	"",
	propertyValue	:	"false",
	expectedResult	:	"false"
},
{
	testName		:	"VT282-4125 | call setproperty with gs1dataBarExpanded  :True  | true",
	propertyName	:	"gs1dataBarExpanded",
	scannerTypes	:	"",
	propertyValue	:	"true",
	expectedResult	:	"true"
},
{
	testName		:	"VT282-4126 | call setproperty with gs1dataBarExpanded  :false  | false",
	propertyName	:	"gs1dataBarExpanded",
	scannerTypes	:	"",
	propertyValue	:	"false",
	expectedResult	:	"false"
},
{
	testName		:	"VT282-4127 | call setproperty with gs1dataBarLimited  :True  | true",
	propertyName	:	"gs1dataBarLimited",
	scannerTypes	:	"",
	propertyValue	:	"true",
	expectedResult	:	"true"
},
{
	testName		:	"VT282-4128 | call setproperty with gs1dataBarLimited  :false  | false",
	propertyName	:	"gs1dataBarLimited",
	scannerTypes	:	"",
	propertyValue	:	"false",
	expectedResult	:	"false"
},
{
	testName		:	"VT282-4129 | call setproperty with i2of5  :True  | true",
	propertyName	:	"i2of5",
	scannerTypes	:	"",
	propertyValue	:	"true",
	expectedResult	:	"true"
},
{
	testName		:	"VT282-4130 | call setproperty with i2of5  :false  | false",
	propertyName	:	"i2of5",
	scannerTypes	:	"",
	propertyValue	:	"false",
	expectedResult	:	"false"
},
{
	testName		:	"VT282-4131 | call setproperty with i2of5convertToEan13  :True  | true",
	propertyName	:	"i2of5convertToEan13",
	scannerTypes	:	"",
	propertyValue	:	"true",
	expectedResult	:	"true"
},
{
	testName		:	"VT282-4132 | call setproperty with i2of5convertToEan13  :false  | false",
	propertyName	:	"i2of5convertToEan13",
	scannerTypes	:	"",
	propertyValue	:	"false",
	expectedResult	:	"false"
},
{
	testName		:	"VT282-4133 | call setproperty with i2of5maxLength:0  | 0",
	propertyName	:	"i2of5maxLength",
	scannerTypes	:	"",
	propertyValue	:	"0",
	expectedResult	:	"0"
},
{
	testName		:	"VT282-4134 | call setproperty with i2of5maxLength:10 | 10",
	propertyName	:	"i2of5maxLength",
	scannerTypes	:	"",
	propertyValue	:	"10",
	expectedResult	:	"10"
},
{
	testName		:	"VT282-4135 | call setproperty with i2of5maxLength:55 | 55",
	propertyName	:	"i2of5maxLength",
	scannerTypes	:	"",
	propertyValue	:	"55",
	expectedResult	:	"55"
},
{
	testName		:	"VT282-4136 | call setproperty with i2of5minLength:0  | 0",
	propertyName	:	"i2of5minLength",
	scannerTypes	:	"",
	propertyValue	:	"0",
	expectedResult	:	"0"
},
{
	testName		:	"VT282-4137 | call setproperty with i2of5minLength:10 | 10",
	propertyName	:	"i2of5minLength",
	scannerTypes	:	"",
	propertyValue	:	"10",
	expectedResult	:	"10"
},
{
	testName		:	"VT282-4138 | call setproperty with i2of5minLength:55 | 55",
	propertyName	:	"i2of5minLength",
	scannerTypes	:	"",
	propertyValue	:	"55",
	expectedResult	:	"55"
},
{
	testName		:	"VT282-4139 | call setproperty with i2of5redundancy  :True  | true",
	propertyName	:	"i2of5redundancy",
	scannerTypes	:	"",
	propertyValue	:	"true",
	expectedResult	:	"true"
},
{
	testName		:	"VT282-4140 | call setproperty with i2of5redundancy  :false  | false",
	propertyName	:	"i2of5redundancy",
	scannerTypes	:	"",
	propertyValue	:	"false",
	expectedResult	:	"false"
},
{
	testName		:	"VT282-4141 | call setproperty with i2of5reportCheckDigit  :True  | true",
	propertyName	:	"i2of5reportCheckDigit",
	scannerTypes	:	"",
	propertyValue	:	"true",
	expectedResult	:	"true"
},
{
	testName		:	"VT282-4142 | call setproperty with i2of5reportCheckDigit  :false  | false",
	propertyName	:	"i2of5reportCheckDigit",
	scannerTypes	:	"",
	propertyValue	:	"false",
	expectedResult	:	"false"
},
{
	testName		:	"VT282-4143 | call setproperty with i2of5verifyCheckDigit:none  | none",
	propertyName	:	"i2of5verifyCheckDigit",
	scannerTypes	:	"",
	propertyValue	:	"none",
	expectedResult	:	"none"
},
{
	testName		:	"VT282-4144 | call setproperty with i2of5verifyCheckDigit:uss | uss",
	propertyName	:	"i2of5verifyCheckDigit",
	scannerTypes	:	"",
	propertyValue	:	"uss",
	expectedResult	:	"uss"
},
{
	testName		:	"VT282-4145 | call setproperty with i2of5verifyCheckDigit:opcc | opcc",
	propertyName	:	"i2of5verifyCheckDigit",
	scannerTypes	:	"",
	propertyValue	:	"opcc",
	expectedResult	:	"opcc"
},
{
	testName		:	"VT282-4146 | call setproperty with japPostal  :True  | true",
	propertyName	:	"japPostal",
	scannerTypes	:	"",
	propertyValue	:	"true",
	expectedResult	:	"true"
},
{
	testName		:	"VT282-4147 | call setproperty with japPostal  :false  | false",
	propertyName	:	"japPostal",
	scannerTypes	:	"",
	propertyValue	:	"false",
	expectedResult	:	"false"
},
{
	testName		:	"VT282-4148 | call setproperty with korean3of5  :True  | true",
	propertyName	:	"korean3of5",
	scannerTypes	:	"",
	propertyValue	:	"true",
	expectedResult	:	"true"
},
{
	testName		:	"VT282-4149 | call setproperty with korean3of5  :false  | false",
	propertyName	:	"korean3of5",
	scannerTypes	:	"",
	propertyValue	:	"false",
	expectedResult	:	"false"
},
{
	testName		:	"VT282-4150 | call setproperty with korean3of5maxLength:0  | 0",
	propertyName	:	"korean3of5maxLength",
	scannerTypes	:	"",
	propertyValue	:	"0",
	expectedResult	:	"0"
},
{
	testName		:	"VT282-4151 | call setproperty with korean3of5maxLength:10 | 10",
	propertyName	:	"korean3of5maxLength",
	scannerTypes	:	"",
	propertyValue	:	"10",
	expectedResult	:	"10"
},
{
	testName		:	"VT282-4152 | call setproperty with korean3of5maxLength:55 | 55",
	propertyName	:	"korean3of5maxLength",
	scannerTypes	:	"",
	propertyValue	:	"55",
	expectedResult	:	"55"
},
{
	testName		:	"VT282-4153 | call setproperty with korean3of5minLength:0  | 0",
	propertyName	:	"korean3of5minLength",
	scannerTypes	:	"",
	propertyValue	:	"0",
	expectedResult	:	"0"
},
{
	testName		:	"VT282-4154 | call setproperty with korean3of5minLength:10 | 10",
	propertyName	:	"korean3of5minLength",
	scannerTypes	:	"",
	propertyValue	:	"10",
	expectedResult	:	"10"
},
{
	testName		:	"VT282-4155 | call setproperty with korean3of5minLength:55 | 55",
	propertyName	:	"korean3of5minLength",
	scannerTypes	:	"",
	propertyValue	:	"55",
	expectedResult	:	"55"
},
{
	testName		:	"VT282-4156 | call setproperty with korean3of5redundancy  :True  | true",
	propertyName	:	"korean3of5redundancy",
	scannerTypes	:	"",
	propertyValue	:	"true",
	expectedResult	:	"true"
},
{
	testName		:	"VT282-4157 | call setproperty with korean3of5redundancy  :false  | false",
	propertyName	:	"korean3of5redundancy",
	scannerTypes	:	"",
	propertyValue	:	"false",
	expectedResult	:	"false"
},
{
	testName		:	"VT282-4158 | call setproperty with macroMicroPdf  :True  | true",
	propertyName	:	"macroMicroPdf",
	scannerTypes	:	"Imager",
	propertyValue	:	"true",
	expectedResult	:	"true"
},
{
	testName		:	"VT282-4159 | call setproperty with macroMicroPdf  :false  | false",
	propertyName	:	"macroMicroPdf",
	scannerTypes	:	"Imager",
	propertyValue	:	"false",
	expectedResult	:	"false"
},
{
	testName		:	"VT282-4160 | call setproperty with macroMicroPdfBufferLabels  :True  | true",
	propertyName	:	"macroMicroPdfBufferLabels",
	scannerTypes	:	"Imager",
	propertyValue	:	"true",
	expectedResult	:	"true"
},
{
	testName		:	"VT282-4161 | call setproperty with macroMicroPdfBufferLabels  :false  | false",
	propertyName	:	"macroMicroPdfBufferLabels",
	scannerTypes	:	"Imager",
	propertyValue	:	"false",
	expectedResult	:	"false"
},
{
	testName		:	"VT282-4162 | call setproperty with macroMicroPdfBufferLabels  :True  | true",
	propertyName	:	"macroMicroPdfBufferLabels",
	scannerTypes	:	"Imager",
	propertyValue	:	"true",
	expectedResult	:	"true"
},
{
	testName		:	"VT282-4163 | call setproperty with macroMicroPdfBufferLabels  :false  | false",
	propertyName	:	"macroMicroPdfBufferLabels",
	scannerTypes	:	"Imager",
	propertyValue	:	"false",
	expectedResult	:	"false"
},
{
	testName		:	"VT282-4164 | call setproperty with macroMicroPdfConvertToMicroPdf  :True  | true",
	propertyName	:	"macroMicroPdfConvertToMicroPdf",
	scannerTypes	:	"Imager",
	propertyValue	:	"true",
	expectedResult	:	"true"
},
{
	testName		:	"VT282-4165 | call setproperty with macroMicroPdfConvertToMicroPdf  :false  | false",
	propertyName	:	"macroMicroPdfConvertToMicroPdf",
	scannerTypes	:	"Imager",
	propertyValue	:	"false",
	expectedResult	:	"false"
},
{
	testName		:	"VT282-4166 | call setproperty with macroMicroPdfExclusive  :True  | true",
	propertyName	:	"macroMicroPdfExclusive",
	scannerTypes	:	"Imager",
	propertyValue	:	"true",
	expectedResult	:	"true"
},
{
	testName		:	"VT282-4167 | call setproperty with macroMicroPdfExclusive  :false  | false",
	propertyName	:	"macroMicroPdfExclusive",
	scannerTypes	:	"Imager",
	propertyValue	:	"false",
	expectedResult	:	"false"
},
{
	testName		:	"VT282-4168 | call setproperty with macroMicroPdfReportAppendInfo  :True  | true",
	propertyName	:	"macroMicroPdfReportAppendInfo",
	scannerTypes	:	"Imager",
	propertyValue	:	"true",
	expectedResult	:	"true"
},
{
	testName		:	"VT282-4169 | call setproperty with macroMicroPdfReportAppendInfo  :false  | false",
	propertyName	:	"macroMicroPdfReportAppendInfo",
	scannerTypes	:	"Imager",
	propertyValue	:	"false",
	expectedResult	:	"false"
},
{
	testName		:	"VT282-4170 | call setproperty with macroPdf  :True  | true",
	propertyName	:	"macroPdf",
	scannerTypes	:	"Imager",
	propertyValue	:	"true",
	expectedResult	:	"true"
},
{
	testName		:	"VT282-4171 | call setproperty with macroPdf  :false  | false",
	propertyName	:	"macroPdf",
	scannerTypes	:	"Imager",
	propertyValue	:	"false",
	expectedResult	:	"false"
},
{
	testName		:	"VT282-4172 | call setproperty with macroPdfBufferLabels  :True  | true",
	propertyName	:	"macroPdfBufferLabels",
	scannerTypes	:	"Imager",
	propertyValue	:	"true",
	expectedResult	:	"true"
},
{
	testName		:	"VT282-4173 | call setproperty with macroPdfBufferLabels  :false  | false",
	propertyName	:	"macroPdfBufferLabels",
	scannerTypes	:	"Imager",
	propertyValue	:	"false",
	expectedResult	:	"false"
},
{
	testName		:	"VT282-4174 | call setproperty with macroPdfConvertToPdf417  :True  | true",
	propertyName	:	"macroPdfConvertToPdf417",
	scannerTypes	:	"Imager",
	propertyValue	:	"true",
	expectedResult	:	"true"
},
{
	testName		:	"VT282-4175 | call setproperty with macroPdfConvertToPdf417  :false  | false",
	propertyName	:	"macroPdfConvertToPdf417",
	scannerTypes	:	"Imager",
	propertyValue	:	"false",
	expectedResult	:	"false"
},
{
	testName		:	"VT282-4176 | call setproperty with macroPdfExclusive  :True  | true",
	propertyName	:	"macroPdfExclusive",
	scannerTypes	:	"Imager",
	propertyValue	:	"true",
	expectedResult	:	"true"
},
{
	testName		:	"VT282-4177 | call setproperty with macroPdfExclusive  :false  | false",
	propertyName	:	"macroPdfExclusive",
	scannerTypes	:	"Imager",
	propertyValue	:	"false",
	expectedResult	:	"false"
},
{
	testName		:	"VT282-4178 | call setproperty with msi  :True  | true",
	propertyName	:	"msi",
	scannerTypes	:	"",
	propertyValue	:	"true",
	expectedResult	:	"true"
},
{
	testName		:	"VT282-4179 | call setproperty with msi :false  | false",
	propertyName	:	"msi",
	scannerTypes	:	"",
	propertyValue	:	"false",
	expectedResult	:	"false"
},
{
	testName		:	"VT282-4180 | call setproperty with msimaxLength:0  | 0",
	propertyName	:	"msimaxLength",
	scannerTypes	:	"",
	propertyValue	:	"0",
	expectedResult	:	"0"
},
{
	testName		:	"VT282-4181 | call setproperty with matrix2of5maxLength:10 | 10",
	propertyName	:	"matrix2of5maxLength",
	scannerTypes	:	"",
	propertyValue	:	"10",
	expectedResult	:	"10"
},
{
	testName		:	"VT282-4182 | call setproperty with matrix2of5maxLength:55 | 55",
	propertyName	:	"matrix2of5maxLength",
	scannerTypes	:	"",
	propertyValue	:	"55",
	expectedResult	:	"55"
},
{
	testName		:	"VT282-4183 | call setproperty with matrix2of5minLength:0  | 0",
	propertyName	:	"matrix2of5minLength",
	scannerTypes	:	"",
	propertyValue	:	"0",
	expectedResult	:	"0"
},
{
	testName		:	"VT282-4184 | call setproperty with matrix2of5minLength:10 | 10",
	propertyName	:	"matrix2of5minLength",
	scannerTypes	:	"",
	propertyValue	:	"10",
	expectedResult	:	"10"
},
{
	testName		:	"VT282-4185 | call setproperty with matrix2of5minLength:55 | 55",
	propertyName	:	"matrix2of5minLength",
	scannerTypes	:	"",
	propertyValue	:	"55",
	expectedResult	:	"55"
},
{
	testName		:	"VT282-4186 | call setproperty with matrix2of5reportCheckDigit  :True  | true",
	propertyName	:	"matrix2of5reportCheckDigit",
	scannerTypes	:	"",
	propertyValue	:	"true",
	expectedResult	:	"true"
},
{
	testName		:	"VT282-4187 | call setproperty with matrix2of5reportCheckDigit :false  | false",
	propertyName	:	"matrix2of5reportCheckDigit",
	scannerTypes	:	"",
	propertyValue	:	"false",
	expectedResult	:	"false"
},
{
	testName		:	"VT282-4188 | call setproperty with matrix2of5verifyCheckDigit   :True  | true",
	propertyName	:	"matrix2of5verifyCheckDigit",
	scannerTypes	:	"",
	propertyValue	:	"true",
	expectedResult	:	"true"
},
{
	testName		:	"VT282-4189 | call setproperty with matrix2of5verifyCheckDigit  :false  | false",
	propertyName	:	"matrix2of5verifyCheckDigit",
	scannerTypes	:	"",
	propertyValue	:	"false",
	expectedResult	:	"false"
},
{
	testName		:	"VT282-4190 | call setproperty with maxiCode   :True  | true",
	propertyName	:	"maxiCode",
	scannerTypes	:	"",
	propertyValue	:	"true",
	expectedResult	:	"true"
},
{
	testName		:	"VT282-4191 | call setproperty with maxiCode  :false  | false",
	propertyName	:	"maxiCode",
	scannerTypes	:	"",
	propertyValue	:	"false",
	expectedResult	:	"false"
},
{
	testName		:	"VT282-4192 | call setproperty with microPdf   :True  | true",
	propertyName	:	"microPdf",
	scannerTypes	:	"",
	propertyValue	:	"true",
	expectedResult	:	"true"
},
{
	testName		:	"VT282-4193 | call setproperty with microPdf  :false  | false",
	propertyName	:	"microPdf",
	scannerTypes	:	"",
	propertyValue	:	"false",
	expectedResult	:	"false"
},
{
	testName		:	"VT282-4194 | call setproperty with microQr   :True  | true",
	propertyName	:	"microQr",
	scannerTypes	:	"",
	propertyValue	:	"true",
	expectedResult	:	"true"
},
{
	testName		:	"VT282-4195 | call setproperty with microQr  :false  | false",
	propertyName	:	"microQr",
	scannerTypes	:	"",
	propertyValue	:	"false",
	expectedResult	:	"false"
},
{
	testName		:	"VT282-4196 | call setproperty with msi   :True  | true",
	propertyName	:	"msi",
	scannerTypes	:	"",
	propertyValue	:	"true",
	expectedResult	:	"true"
},
{
	testName		:	"VT282-4197 | call setproperty with msi  :false  | false",
	propertyName	:	"msi",
	scannerTypes	:	"",
	propertyValue	:	"false",
	expectedResult	:	"false"
},
{
	testName		:	"VT282-4198 | call setproperty with msiCheckDigitScheme :mod11  | mod11",
	propertyName	:	"msiCheckDigitScheme",
	scannerTypes	:	"",
	propertyValue	:	"mod11",
	expectedResult	:	"mod11"
},
{
	testName		:	"VT282-4199 | call setproperty with msiCheckDigitScheme :mod10  | mod10",
	propertyName	:	"msiCheckDigitScheme",
	scannerTypes	:	"",
	propertyValue	:	"mod10",
	expectedResult	:	"mod10"
},
{
	testName		:	"VT282-4200 | call setproperty with msiCheckDigits :one  | one",
	propertyName	:	"msiCheckDigits",
	scannerTypes	:	"",
	propertyValue	:	"one",
	expectedResult	:	"one"
},
{
	testName		:	"VT282-4201 | call setproperty with msiCheckDigits :two  | two",
	propertyName	:	"msiCheckDigits",
	scannerTypes	:	"",
	propertyValue	:	"two",
	expectedResult	:	"two"
},
{
	testName		:	"VT282-4202 | call setproperty with msimaxLength:0  | 0",
	propertyName	:	"msimaxLength",
	scannerTypes	:	"",
	propertyValue	:	"0",
	expectedResult	:	"0"
},
{
	testName		:	"VT282-4203 | call setproperty with msimaxLength:10 | 10",
	propertyName	:	"msimaxLength",
	scannerTypes	:	"",
	propertyValue	:	"10",
	expectedResult	:	"10"
},
{
	testName		:	"VT282-4204 | call setproperty with msimaxLength:55 | 55",
	propertyName	:	"msimaxLength",
	scannerTypes	:	"",
	propertyValue	:	"55",
	expectedResult	:	"55"
},
{
	testName		:	"VT282-4205 | call setproperty with msiminLength:0  | 0",
	propertyName	:	"msiminLength",
	scannerTypes	:	"",
	propertyValue	:	"0",
	expectedResult	:	"0"
},
{
	testName		:	"VT282-4206 | call setproperty with msiminLength:10 | 10",
	propertyName	:	"msiminLength",
	scannerTypes	:	"",
	propertyValue	:	"10",
	expectedResult	:	"10"
},
{
	testName		:	"VT282-4207 | call setproperty with msiminLength:55 | 55",
	propertyName	:	"msiminLength",
	scannerTypes	:	"",
	propertyValue	:	"55",
	expectedResult	:	"55"
},
{
	testName		:	"VT282-4208 | call setproperty with msiRedundancy :True  | true",
	propertyName	:	"msiRedundancy",
	scannerTypes	:	"",
	propertyValue	:	"true",
	expectedResult	:	"true"
},
{
	testName		:	"VT282-4209 | call setproperty with msiRedundancy :false  | false",
	propertyName	:	"msiRedundancy",
	scannerTypes	:	"",
	propertyValue	:	"false",
	expectedResult	:	"false"
},
{
	testName		:	"VT282-4210 | call setproperty with msiReportCheckDigit :True  | true",
	propertyName	:	"msiReportCheckDigit",
	scannerTypes	:	"",
	propertyValue	:	"true",
	expectedResult	:	"true"
},
{
	testName		:	"VT282-4211 | call setproperty with msiReportCheckDigit :false  | false",
	propertyName	:	"msiReportCheckDigit",
	scannerTypes	:	"",
	propertyValue	:	"false",
	expectedResult	:	"false"
},
{
	testName		:	"VT282-4212 | call setproperty with pdf417 :True  | true",
	propertyName	:	"pdf417",
	scannerTypes	:	"",
	propertyValue	:	"true",
	expectedResult	:	"true"
},
{
	testName		:	"VT282-4213 | call setproperty with pdf417 :false  | false",
	propertyName	:	"pdf417",
	scannerTypes	:	"",
	propertyValue	:	"false",
	expectedResult	:	"false"
},
{
	testName		:	"VT282-4214 | call setproperty with qrCode :True  | true",
	propertyName	:	"qrCode",
	scannerTypes	:	"",
	propertyValue	:	"true",
	expectedResult	:	"true"
},
{
	testName		:	"VT282-4215 | call setproperty with qrCode :false  | false",
	propertyName	:	"qrCode",
	scannerTypes	:	"",
	propertyValue	:	"false",
	expectedResult	:	"false"
},
{
	testName		:	"VT282-4216 | call setproperty with signature :True  | true",
	propertyName	:	"signature",
	scannerTypes	:	"",
	propertyValue	:	"true",
	expectedResult	:	"true"
},
{
	testName		:	"VT282-4217 | call setproperty with signature :false  | false",
	propertyName	:	"signature",
	scannerTypes	:	"",
	propertyValue	:	"false",
	expectedResult	:	"false"
},
{
	testName		:	"VT282-4218 | call setproperty with signatureImageHeight :20  | 20",
	propertyName	:	"signatureImageHeight",
	scannerTypes	:	"",
	propertyValue	:	"20",
	expectedResult	:	"20"
},
{
	testName		:	"VT282-4219 | call setproperty with signatureImageHeight :200  | 200",
	propertyName	:	"signatureImageHeight",
	scannerTypes	:	"",
	propertyValue	:	"200",
	expectedResult	:	"200"
},
{
	testName		:	"VT282-4220 | call setproperty with signatureImageHeight :400  | 400",
	propertyName	:	"signatureImageHeight",
	scannerTypes	:	"",
	propertyValue	:	"400",
	expectedResult	:	"400"
},
{
	testName		:	"VT282-4221 | call setproperty with signatureImageWidth :20  | 20",
	propertyName	:	"signatureImageWidth",
	scannerTypes	:	"",
	propertyValue	:	"20",
	expectedResult	:	"20"
},
{
	testName		:	"VT282-4222 | call setproperty with signatureImageWidth :250  | 250",
	propertyName	:	"signatureImageWidth",
	scannerTypes	:	"",
	propertyValue	:	"250",
	expectedResult	:	"250"
},
{
	testName		:	"VT282-4223 | call setproperty with signatureImageWidth :350  | 350",
	propertyName	:	"signatureImageWidth",
	scannerTypes	:	"",
	propertyValue	:	"350",
	expectedResult	:	"350"
},
{
	testName		:	"VT282-4224 | call setproperty with signatureImageQuality :1  | 1",
	propertyName	:	"signatureImageQuality",
	scannerTypes	:	"",
	propertyValue	:	"1",
	expectedResult	:	"1"
},
{
	testName		:	"VT282-4225 | call setproperty with signatureImageQuality :50  | 50",
	propertyName	:	"signatureImageQuality",
	scannerTypes	:	"",
	propertyValue	:	"50",
	expectedResult	:	"50"
},
{
	testName		:	"VT282-4226 | call setproperty with signatureImageQuality :100  | 100",
	propertyName	:	"signatureImageQuality",
	scannerTypes	:	"",
	propertyValue	:	"100",
	expectedResult	:	"100"
},
{
	testName		:	"VT282-4227 | call setproperty with tlc39 :True  | true",
	propertyName	:	"tlc39",
	scannerTypes	:	"",
	propertyValue	:	"true",
	expectedResult	:	"true"
},
{
	testName		:	"VT282-4228 | call setproperty with tlc39 :false  | false",
	propertyName	:	"tlc39",
	scannerTypes	:	"",
	propertyValue	:	"false",
	expectedResult	:	"false"
},
{
	testName		:	"VT282-4229 | call setproperty with trioptic39 :True  | true",
	propertyName	:	"trioptic39",
	scannerTypes	:	"",
	propertyValue	:	"true",
	expectedResult	:	"true"
},
{
	testName		:	"VT282-4230 | call setproperty with trioptic39 :false  | false",
	propertyName	:	"trioptic39",
	scannerTypes	:	"",
	propertyValue	:	"false",
	expectedResult	:	"false"
},
{
	testName		:	"VT282-4231 | call setproperty with trioptic39Redundancy :True  | true",
	propertyName	:	"trioptic39Redundancy",
	scannerTypes	:	"",
	propertyValue	:	"true",
	expectedResult	:	"true"
},
{
	testName		:	"VT282-4232 | call setproperty with trioptic39Redundancy :false  | false",
	propertyName	:	"trioptic39Redundancy",
	scannerTypes	:	"",
	propertyValue	:	"false",
	expectedResult	:	"false"
},
{
	testName		:	"VT282-4233 | call setproperty with ukPostal :True  | true",
	propertyName	:	"ukPostal",
	scannerTypes	:	"",
	propertyValue	:	"true",
	expectedResult	:	"true"
},
{
	testName		:	"VT282-4234 | call setproperty with ukPostal :false  | false",
	propertyName	:	"ukPostal",
	scannerTypes	:	"",
	propertyValue	:	"false",
	expectedResult	:	"false"
},
{
	testName		:	"VT282-4235 | call setproperty with ukPostalReportCheckDigit :True  | true",
	propertyName	:	"ukPostalReportCheckDigit",
	scannerTypes	:	"",
	propertyValue	:	"true",
	expectedResult	:	"true"
},
{
	testName		:	"VT282-4236 | call setproperty with ukPostalReportCheckDigit :false  | false",
	propertyName	:	"ukPostalReportCheckDigit",
	scannerTypes	:	"",
	propertyValue	:	"false",
	expectedResult	:	"false"
},
{
	testName		:	"VT282-4237 | call setproperty with upcEanBookland  :True  | true",
	propertyName	:	"upcEanBookland",
	scannerTypes	:	"",
	propertyValue	:	"true",
	expectedResult	:	"true"
},
{
	testName		:	"VT282-4238 | call setproperty with upcEanBookland  :false  | false",
	propertyName	:	"upcEanBookland",
	scannerTypes	:	"",
	propertyValue	:	"false",
	expectedResult	:	"false"
},
{
	testName		:	"VT282-4239 | call setproperty with upcEanBooklandFormat  :isbn10  | isbn10",
	propertyName	:	"upcEanBooklandFormat",
	scannerTypes	:	"",
	propertyValue	:	"isbn10",
	expectedResult	:	"isbn10"
},
{
	testName		:	"VT282-4240 | call setproperty with upcEanBooklandFormat  :isbn13  | isbn13",
	propertyName	:	"upcEanBooklandFormat",
	scannerTypes	:	"",
	propertyValue	:	"isbn13",
	expectedResult	:	"isbn13"
},
{
	testName		:	"VT282-4241 | call setproperty with upcEanConvertGs1dataBarToUpcEan  :true  | true",
	propertyName	:	"upcEanConvertGs1dataBarToUpcEan",
	scannerTypes	:	"",
	propertyValue	:	"true",
	expectedResult	:	"true"
},
{
	testName		:	"VT282-4242 | call setproperty with upcEanConvertGs1dataBarToUpcEan  :false  | false",
	propertyName	:	"upcEanConvertGs1dataBarToUpcEan",
	scannerTypes	:	"",
	propertyValue	:	"false",
	expectedResult	:	"false"
},
{
	testName		:	"VT282-4243 | call setproperty with upcEanCoupon  :true  | true",
	propertyName	:	"upcEanCoupon",
	scannerTypes	:	"",
	propertyValue	:	"true",
	expectedResult	:	"true"
},
{
	testName		:	"VT282-4244 | call setproperty with upcEanCoupon  :false  | false",
	propertyName	:	"upcEanCoupon",
	scannerTypes	:	"",
	propertyValue	:	"false",
	expectedResult	:	"false"
},
{
	testName		:	"VT282-4245 | call setproperty with upcEanLinearDecode  :true  | true",
	propertyName	:	"upcEanLinearDecode",
	scannerTypes	:	"",
	propertyValue	:	"true",
	expectedResult	:	"true"
},
{
	testName		:	"VT282-4246 | call setproperty with upcEanLinearDecode  :false  | false",
	propertyName	:	"upcEanLinearDecode",
	scannerTypes	:	"",
	propertyValue	:	"false",
	expectedResult	:	"false"
},
{
	testName		:	"VT282-4247 | call setproperty with upcEanRandomWeightCheckDigit  :true  | true",
	propertyName	:	"upcEanRandomWeightCheckDigit",
	scannerTypes	:	"",
	propertyValue	:	"true",
	expectedResult	:	"true"
},
{
	testName		:	"VT282-4248 | call setproperty with upcEanRandomWeightCheckDigit  :false  | false",
	propertyName	:	"upcEanRandomWeightCheckDigit",
	scannerTypes	:	"",
	propertyValue	:	"false",
	expectedResult	:	"false"
},
{
	testName		:	"VT282-4249 | call setproperty with upcEanRetryCount  :2  | 2",
	propertyName	:	"upcEanRetryCount",
	scannerTypes	:	"",
	propertyValue	:	"2",
	expectedResult	:	"2"
},
{
	testName		:	"VT282-4250 | call setproperty with upcEanRetryCount  :20  | 20",
	propertyName	:	"upcEanRetryCount",
	scannerTypes	:	"",
	propertyValue	:	"20",
	expectedResult	:	"20"
},
{
	testName		:	"VT282-4251 | call setproperty with upcEanSecurityLevel:0  | 0",
	propertyName	:	"upcEanSecurityLevel",
	scannerTypes	:	"",
	propertyValue	:	"0",
	expectedResult	:	"0"
},
{
	testName		:	"VT282-4252 | call setproperty with upcEanSecurityLevel:1  | 1",
	propertyName	:	"upcEanSecurityLevel",
	scannerTypes	:	"",
	propertyValue	:	"1",
	expectedResult	:	"1"
},
{
	testName		:	"VT282-4253 | call setproperty with upcEanSecurityLevel:2  | 2",
	propertyName	:	"upcEanSecurityLevel",
	scannerTypes	:	"",
	propertyValue	:	"2",
	expectedResult	:	"2"
},
{
	testName		:	"VT282-4254 | call setproperty with upcEanSecurityLevel:3  | 3",
	propertyName	:	"upcEanSecurityLevel",
	scannerTypes	:	"",
	propertyValue	:	"3",
	expectedResult	:	"3"
},
{
	testName		:	"VT282-4255 | call setproperty with upcEanSupplemental2  :true  | true",
	propertyName	:	"upcEanSupplemental2",
	scannerTypes	:	"",
	propertyValue	:	"true",
	expectedResult	:	"true"
},
{
	testName		:	"VT282-4256 | call setproperty with upcEanSupplemental2  :false  | false",
	propertyName	:	"upcEanSupplemental2",
	scannerTypes	:	"",
	propertyValue	:	"false",
	expectedResult	:	"false"
},
{
	testName		:	"VT282-4257 | call setproperty with upcEanSupplemental5  :true  | true",
	propertyName	:	"upcEanSupplemental5",
	scannerTypes	:	"",
	propertyValue	:	"true",
	expectedResult	:	"true"
},
{
	testName		:	"VT282-4258 | call setproperty with upcEanSupplemental5  :false  | false",
	propertyName	:	"upcEanSupplemental5",
	scannerTypes	:	"",
	propertyValue	:	"false",
	expectedResult	:	"false"
},
{
	testName		:	"VT282-4259 | call setproperty with upcEanSupplementalMode:none  | none",
	propertyName	:	"upcEanSupplementalMode",
	scannerTypes	:	"",
	propertyValue	:	"none",
	expectedResult	:	"none"
},
{
	testName		:	"VT282-4260 | call setproperty with upcEanSupplementalMode:auto  | auto",
	propertyName	:	"upcEanSupplementalMode",
	scannerTypes	:	"",
	propertyValue	:	"auto",
	expectedResult	:	"auto"
},
{
	testName		:	"VT282-4261 | call setproperty with upcEanSupplementalMode:always  | always",
	propertyName	:	"upcEanSupplementalMode",
	scannerTypes	:	"",
	propertyValue	:	"always",
	expectedResult	:	"always"
},
{
	testName		:	"VT282-4262 | call setproperty with upcEanSupplementalMode:smart  | smart",
	propertyName	:	"upcEanSupplementalMode",
	scannerTypes	:	"",
	propertyValue	:	"smart",
	expectedResult	:	"smart"
},
{
	testName		:	"VT282-4263 | call setproperty with upcEanSupplementalMode:378or379  | 378or379",
	propertyName	:	"upcEanSupplementalMode",
	scannerTypes	:	"",
	propertyValue	:	"378or379",
	expectedResult	:	"378or379"
},
{
	testName		:	"VT282-4264 | call setproperty with upcEanSupplementalMode:978or979  | 978or979",
	propertyName	:	"upcEanSupplementalMode",
	scannerTypes	:	"",
	propertyValue	:	"978or979",
	expectedResult	:	"978or979"
},
{
	testName		:	"VT282-4265 | call setproperty with upcEanSupplementalMode:414or419or434or439  | 414or419or434or439",
	propertyName	:	"upcEanSupplementalMode",
	scannerTypes	:	"",
	propertyValue	:	"414or419or434or439",
	expectedResult	:	"414or419or434or439"
},
{
	testName		:	"VT282-4266 | call setproperty with upca  :true  | true",
	propertyName	:	"upca",
	scannerTypes	:	"",
	propertyValue	:	"true",
	expectedResult	:	"true"
},
{
	testName		:	"VT282-4267 | call setproperty with upca  :false  | false",
	propertyName	:	"upca",
	scannerTypes	:	"",
	propertyValue	:	"false",
	expectedResult	:	"false"
},
{
	testName		:	"VT282-4268 | call setproperty with upcaPreamble  :none  | none",
	propertyName	:	"upcaPreamble",
	scannerTypes	:	"",
	propertyValue	:	"none",
	expectedResult	:	"none"
},
{
	testName		:	"VT282-4269 | call setproperty with upcaPreamble  :systemChar  | systemChar",
	propertyName	:	"upcaPreamble",
	scannerTypes	:	"",
	propertyValue	:	"systemChar",
	expectedResult	:	"systemChar"
},
{
	testName		:	"VT282-4270 | call setproperty with upcaPreamble  :countryAndSystemChars  | countryAndSystemChars",
	propertyName	:	"upcaPreamble",
	scannerTypes	:	"",
	propertyValue	:	"countryAndSystemChars",
	expectedResult	:	"countryAndSystemChars"
},
{
	testName		:	"VT282-4271 | call setproperty with upcaReportCheckDigit  :true  | true",
	propertyName	:	"upcaReportCheckDigit",
	scannerTypes	:	"",
	propertyValue	:	"true",
	expectedResult	:	"true"
},
{
	testName		:	"VT282-4272 | call setproperty with upcaReportCheckDigit  :false  | false",
	propertyName	:	"upcaReportCheckDigit",
	scannerTypes	:	"",
	propertyValue	:	"false",
	expectedResult	:	"false"
},
{
	testName		:	"VT282-4273 | call setproperty with upce0  :true  | true",
	propertyName	:	"upce0",
	scannerTypes	:	"",
	propertyValue	:	"true",
	expectedResult	:	"true"
},
{
	testName		:	"VT282-4274 | call setproperty with upce0  :false  | false",
	propertyName	:	"upce0",
	scannerTypes	:	"",
	propertyValue	:	"false",
	expectedResult	:	"false"
},
{
	testName		:	"VT282-4275 | call setproperty with upce0convertToUpca  :true  | true",
	propertyName	:	"upce0convertToUpca",
	scannerTypes	:	"",
	propertyValue	:	"true",
	expectedResult	:	"true"
},
{
	testName		:	"VT282-4276 | call setproperty with upce0convertToUpca  :false  | false",
	propertyName	:	"upce0convertToUpca",
	scannerTypes	:	"",
	propertyValue	:	"false",
	expectedResult	:	"false"
},
{
	testName		:	"VT282-4277 | call setproperty with upce0Preamble  :none  | none",
	propertyName	:	"upce0Preamble",
	scannerTypes	:	"",
	propertyValue	:	"none",
	expectedResult	:	"none"
},
{
	testName		:	"VT282-4278 | call setproperty with upce0Preamble  :systemChar  | systemChar",
	propertyName	:	"upce0Preamble",
	scannerTypes	:	"",
	propertyValue	:	"systemChar",
	expectedResult	:	"systemChar"
},
{
	testName		:	"VT282-4279 | call setproperty with upce0Preamble  :countryAndSystemChars  | countryAndSystemChars",
	propertyName	:	"upce0Preamble",
	scannerTypes	:	"",
	propertyValue	:	"countryAndSystemChars",
	expectedResult	:	"countryAndSystemChars"
},
{
	testName		:	"VT282-4280 | call setproperty with upce0reportCheckDigit   :true  | true",
	propertyName	:	"upce0reportCheckDigit",
	scannerTypes	:	"",
	propertyValue	:	"true",
	expectedResult	:	"true"
},
{
	testName		:	"VT282-4281 | call setproperty with upce0reportCheckDigit   :false  | false",
	propertyName	:	"upce0reportCheckDigit",
	scannerTypes	:	"",
	propertyValue	:	"false",
	expectedResult	:	"false"
},
{
	testName		:	"VT282-4282 | call setproperty with upce1  :true  | true",
	propertyName	:	"upce1",
	scannerTypes	:	"",
	propertyValue	:	"true",
	expectedResult	:	"true"
},
{
	testName		:	"VT282-4283 | call setproperty with upce1  :false  | false",
	propertyName	:	"upce1",
	scannerTypes	:	"",
	propertyValue	:	"false",
	expectedResult	:	"false"
},
{
	testName		:	"VT282-4284 | call setproperty with upce1convertToUpca  :true  | true",
	propertyName	:	"upce1convertToUpca",
	scannerTypes	:	"",
	propertyValue	:	"true",
	expectedResult	:	"true"
},
{
	testName		:	"VT282-4285 | call setproperty with upce1convertToUpca  :false  | false",
	propertyName	:	"upce1convertToUpca",
	scannerTypes	:	"",
	propertyValue	:	"false",
	expectedResult	:	"false"
},
{
	testName		:	"VT282-4286 | call setproperty with upce1Preamble:none  | none",
	propertyName	:	"upce1Preamble",
	scannerTypes	:	"",
	propertyValue	:	"none",
	expectedResult	:	"none"
},
{
	testName		:	"VT282-4287 | call setproperty with upce1Preamble:systemChar  | systemChar",
	propertyName	:	"upce1Preamble",
	scannerTypes	:	"",
	propertyValue	:	"systemChar",
	expectedResult	:	"systemChar"
},
{
	testName		:	"VT282-4288 | call setproperty with upce1Preamble :countryAndSystemChars  | countryAndSystemChars",
	propertyName	:	"upce1Preamble",
	scannerTypes	:	"",
	propertyValue	:	"countryAndSystemChars",
	expectedResult	:	"countryAndSystemChars"
},
{
	testName		:	"VT282-4290 | call setproperty with upce1reportCheckDigit:true  | true",
	propertyName	:	"upce1reportCheckDigit",
	scannerTypes	:	"",
	propertyValue	:	"true",
	expectedResult	:	"true"
},
{
	testName		:	"VT282-4291 | call setproperty with upce1reportCheckDigit :false  | false",
	propertyName	:	"upce1reportCheckDigit",
	scannerTypes	:	"",
	propertyValue	:	"false",
	expectedResult	:	"false"
},
{
	testName		:	"VT282-4292 | call setproperty with us4state :true  | true",
	propertyName	:	"us4state",
	scannerTypes	:	"",
	propertyValue	:	"true",
	expectedResult	:	"true"
},
{
	testName		:	"VT282-4293 | call setproperty with us4state :false  | false",
	propertyName	:	"us4state",
	scannerTypes	:	"",
	propertyValue	:	"false",
	expectedResult	:	"false"
},
{
	testName		:	"VT282-4294 | call setproperty with us4stateFics :true  | true",
	propertyName	:	"us4stateFics",
	scannerTypes	:	"",
	propertyValue	:	"true",
	expectedResult	:	"true"
},
{
	testName		:	"VT282-4295 | call setproperty with us4stateFics :false  | false",
	propertyName	:	"us4stateFics",
	scannerTypes	:	"",
	propertyValue	:	"false",
	expectedResult	:	"false"
},
{
	testName		:	"VT282-4296 | call setproperty with usPlanet :true  | true",
	propertyName	:	"usPlanet",
	scannerTypes	:	"",
	propertyValue	:	"true",
	expectedResult	:	"true"
},
{
	testName		:	"VT282-4297 | call setproperty with usPlanet :false  | false",
	propertyName	:	"usPlanet",
	scannerTypes	:	"",
	propertyValue	:	"false",
	expectedResult	:	"false"
},
{
	testName		:	"VT282-4298 | call setproperty with usPlanetReportCheckDigit :true  | true",
	propertyName	:	"usPlanetReportCheckDigit",
	scannerTypes	:	"",
	propertyValue	:	"true",
	expectedResult	:	"true"
},
{
	testName		:	"VT282-4299 | call setproperty with usPlanetReportCheckDigit :false  | false",
	propertyName	:	"usPlanetReportCheckDigit",
	scannerTypes	:	"",
	propertyValue	:	"false",
	expectedResult	:	"false"
},
{
	testName		:	"VT282-4300 | call setproperty with usPostNet :true  | true",
	propertyName	:	"usPostNet",
	scannerTypes	:	"",
	propertyValue	:	"true",
	expectedResult	:	"true"
},
{
	testName		:	"VT282-4301 | call setproperty with usPostNet :false  | false",
	propertyName	:	"usPostNet",
	scannerTypes	:	"",
	propertyValue	:	"false",
	expectedResult	:	"false"
},
{
	testName		:	"VT282-4302 | call setproperty with usPostNetReportCheckDigit :true  | true",
	propertyName	:	"usPostNetReportCheckDigit",
	scannerTypes	:	"",
	propertyValue	:	"true",
	expectedResult	:	"true"
},
{
	testName		:	"VT282-4303 | call setproperty with usPostNetReportCheckDigit :false  | false",
	propertyName	:	"usPostNetReportCheckDigit",
	scannerTypes	:	"",
	propertyValue	:	"false",
	expectedResult	:	"false"
},
{
	testName		:	"VT282-4304 | call setproperty with webcode :true  | true",
	propertyName	:	"webcode",
	scannerTypes	:	"",
	propertyValue	:	"true",
	expectedResult	:	"true"
},
{
	testName		:	"VT282-4305 | call setproperty with webcode :false  | false",
	propertyName	:	"webcode",
	scannerTypes	:	"",
	propertyValue	:	"false",
	expectedResult	:	"false"
},
{
	testName		:	"VT282-4306 | call setproperty with webcodeDecodeGtSubtype :true  | true",
	propertyName	:	"webcodeDecodeGtSubtype",
	scannerTypes	:	"",
	propertyValue	:	"true",
	expectedResult	:	"true"
},
{
	testName		:	"VT282-4307 | call setproperty with webcodeDecodeGtSubtype :false  | false",
	propertyName	:	"webcodeDecodeGtSubtype",
	scannerTypes	:	"",
	propertyValue	:	"false",
	expectedResult	:	"false"
},
{
	testName		:	"VT282-4308 | call setproperty with upcEanRetryCount  :10  | 10",
	propertyName	:	"upcEanRetryCount",
	scannerTypes	:	"",
	propertyValue	:	"10",
	expectedResult	:	"10"
}
];
