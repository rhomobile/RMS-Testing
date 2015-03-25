	var sys_setget_property = [
	
	{
		testName		:	"VT200-0419 | set httpProxyURI , call getProperty with httpProxyURI | 'http://wwwgate0.mot.com:1080'",
		propertyName	:	"httpProxyURI",
		propertyValue	:	"http://wwwgate0.mot.com:1080",
		expectedResult	:	"http://wwwgate0.mot.com:1080",
		osType			: 	["WINDOWS", "WP8", "WINDOWS_DESKTOP"]
	},
	{
		testName		:	"VT300-116 | set screenAutoRotate as false , call getProperty with screenAutoRotate | false",
		propertyName	:	"screenAutoRotate",
		propertyValue	:	"false",
		expectedResult	:	"false",
		osType			: 	["ANDROID","APPLE"]
	},
	{
		testName		:	"VT300-115 | set screenAutoRotate as true , call getProperty with screenAutoRotate | true",
		propertyName	:	"screenAutoRotate",
		propertyValue	:	"true",
		expectedResult	:	"true",
		osType			: 	["ANDROID","APPLE"]

	},
	{
		testName		:	"VT300-119 | set screenSleeping as true , call getProperty with screenSleeping | true",
		propertyName	:	"screenSleeping",
		propertyValue	:	"true",
		expectedResult	:	"true",
		osType			: 	["ANDROID","APPLE"]
	},
	{
		testName		:	"VT300-120 | set screenSleeping as false , call getProperty with screenSleeping | false",
		propertyName	:	"screenSleeping",
		propertyValue	:	"false",
		expectedResult	:	"false",
		osType			: 	["ANDROID","APPLE"]
	}

	];

	var sys_setget_properties = [
	
	{
		testName		:	"VT300-132 | call setproperties with applicationIconBadge as 1, call getproperties with  applicationIconBadge | 1",
		propertyName	:	'applicationIconBadge',
		propertyValue 	:	"1",
		expectedResult	:	"1",
		osType			: 	["APPLE"]
	},
	{
		testName		:	"VT300-133 | call setproperties with applicationIconBadge as 0, call getproperties with  applicationIconBadge | 0",
		propertyName	:	'applicationIconBadge',
		propertyValue 	:	"0",
		expectedResult	:	"0",
		osType			: 	["APPLE"]
	},
	{
		testName		:	"VT300-150 | call setproperties with httpProxyURI, call  getproperties with httpProxyURI | Bibash",
		propertyName	:	'httpProxyURI',
		propertyValue 	:	"Bibash",
		expectedResult	:	"Bibash",
		osType			: 	["WINDOWS", "WP8", "WINDOWS_DESKTOP"]
	},
	{
		testName		:	"VT300-178 | call setproperties with screenSleeping as true, call getproperties with screenSleeping | true",
		propertyName	:	'screenSleeping',
		propertyValue 	:	"true",
		expectedResult	:	"true",
		osType			: 	["ANDROID","APPLE"]
	},
	{
		testName		:	"VT300-179 | call setproperties with screenSleeping as false, call getproperties with screenSleeping | false",
		propertyName	:	'screenSleeping',
		propertyValue 	:	"false",
		expectedResult	:	"false",
		osType			: 	["ANDROID","APPLE"]
	}

	];