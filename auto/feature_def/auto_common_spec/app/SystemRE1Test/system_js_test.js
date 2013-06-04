	var sys_setget_property = [
	
	{
		testName		:	"VT300-107 | set httpProxyURI , call getProperty with httpProxyURI | 'http://wwwgate0.mot.com:1080'",
		propertyName	:	"httpProxyURI",
		propertyValue	:	"http://wwwgate0.mot.com:1080",
		expectedResult	:	"http://wwwgate0.mot.com:1080"
	},
	{
		testName		:	"VT300-108 | set localServerPort to 8081 , call getpropety with localServerPort | 8081",
		propertyName	:	"localServerPort",
		propertyValue	:	"8081",
		expectedResult	:	"8081"
	},
	{
		testName		:	"VT300-109 | Don't set localServerPort to any value , call getpropety with localServerPort | ''",
		propertyName	:	"localServerPort",
		propertyValue	:	"''",
		expectedResult	:	""
	},
	{
		testName		:	"VT300-115 | set screenAutoRotate as true , call getProperty with screenAutoRotate | true",
		propertyName	:	"screenAutoRotate",
		propertyValue	:	"true",
		expectedResult	:	"true"
	},
	{
		testName		:	"VT300-116 | set screenAutoRotate as false , call getProperty with screenAutoRotate | false",
		propertyName	:	"screenAutoRotate",
		propertyValue	:	"false",
		expectedResult	:	"false"
	},
	{
		testName		:	"VT300-119 | set screenSleeping as true , call getProperty with screenSleeping | true",
		propertyName	:	"screenSleeping",
		propertyValue	:	"true",
		expectedResult	:	"true"
	},
	{
		testName		:	"VT300-120 | set screenSleeping as false , call getProperty with screenSleeping | false",
		propertyName	:	"screenSleeping",
		propertyValue	:	"false",
		expectedResult	:	"false"
	}
	

	];

	var sys_get_property = [
	
	{
		testName		:	"VT300-005 | call getProperty with country | US",
		propertyName	:	"country"
	},
	{
		testName		:	"VT300-006 | call getProperty with deviceName | MC75",
		propertyName	:	"deviceName"
	},
	{
		testName		:	"VT300-007 | call getProperty with deviceOwnerEmail | ",
		propertyName	:	"deviceOwnerEmail"
	},
	{
		testName		:	"VT300-008 | call getProperty with deviceOwnerName | ",
		propertyName	:	"deviceOwnerName"
	},
	{
		testName		:	"VT300-009 | call getProperty with devicePushId | ",
		propertyName	:	"devicePushId"
	},
	{
		testName		:	"VT300-010 | call getProperty with freeServerPort | ",
		propertyName	:	"freeServerPort"
	},
	{
		testName		:	"VT300-011 | call getProperty with hasCalendar | ",
		propertyName	:	"hasCalendar"
	},
	{
		testName		:	"VT300-012 | call getProperty with hasCamera | ",
		propertyName	:	"hasCamera"
	},
	{
		testName		:	"VT300-017 | call getProperty with hasSqlite | ",
		propertyName	:	"hasSqlite"
	},
	{
		testName		:	"VT300-018 | call getProperty with hasTouchscreen | ",
		propertyName	:	"hasTouchscreen"
	},
	{
		testName		:	"VT300-024 | call getProperty with isEmulator | ",
		propertyName	:	"isEmulator"
	},
	
	{
		testName		:	"VT300-026 | call getProperty with isMotorolaDevice | ",
		propertyName	:	"isMotorolaDevice"
	},
	
	{
		testName		:	"VT300-028 | default localServerPort | ",
		propertyName	:	"localServerPort"
	},
	{
		testName		:	"VT300-035 | call getProperty with oemInfo | ",
		propertyName	:	"oemInfo"
	},
	
	{
		testName		:	"VT300-036 | call getProperty with osVersion | ",
		propertyName	:	"osVersion"
	},
	
	{
		testName		:	"VT300-037 | call getProperty with phoneId | ",
		propertyName	:	"phoneId"
	},
	
	{
		testName		:	"VT300-038 | call getProperty with phoneNumber | ",
		propertyName	:	"phoneNumber"
	},
	
	{
		testName		:	"VT300-039 | call getProperty with platform | ",
		propertyName	:	"platform"
	},
	{
		testName		:	"VT300-040 | call getProperty with ppiX | ",
		propertyName	:	"ppiX"
	},
	{
		testName		:	"VT300-041 | call getProperty with ppiY | ",
		propertyName	:	"ppiY"
	},
	{
		testName		:	"VT300-042 | call getProperty with realScreenHeight | ",
		propertyName	:	"realScreenHeight"
	},
	{
		testName		:	"VT300-043 | call getProperty with realScreenWidth | ",
		propertyName	:	"realScreenWidth"
	},
	{
		testName		:	"VT300-048 | call getProperty with screenHeight | ",
		propertyName	:	"screenHeight"
	},
	{
		testName		:	"VT300-049 | call getProperty with screenWidth | ",
		propertyName	:	"screenWidth"
	},
	{
		testName		:	"VT300-056 | call getProperty with securityTokenNotPassed | ",
		propertyName	:	"securityTokenNotPassed"
	},
	{
		testName		:	"VT300-061 | call getProperty with uuid | ",
		propertyName	:	"uuid"
	},
	{
		testName		:	"VT300-062 | call getProperty with webviewFramework | ",
		propertyName	:	"webviewFramework"
	}
	];
	
	var sys_get_properties = [
	
	{
		testName		:	"VT300-125 | call getproperties with country,deviceName, devicePushId, freeServerPort and sync callback | ",
		propertyName	:	"['country','deviceName','devicePushId','freeServerPort']"
	},
	
	{
		testName		:	"VT300-134 | call getproperties with country | ",
		propertyName	:	"['country']"
	},
	{
		testName		:	"VT300-135 | call getproperties with deviceName | ",
		propertyName	:	"['deviceName']"
	},
	{
		testName		:	"VT300-136 | call getproperties with deviceOwnerEmail | ",
		propertyName	:	"['deviceOwnerEmail']"
	},
	{
		testName		:	"VT300-137 | call getproperties with deviceOwnerName | ",
		propertyName	:	"['deviceOwnerName']"
	},
	{
		testName		:	"VT300-138 | call getproperties with devicePushId | ",
		propertyName	:	"['devicePushId']"
	},
	{
		testName		:	"VT300-139 | call getproperties with freeServerPort | ",
		propertyName	:	"['freeServerPort']"
	},
	{
		testName		:	"VT300-140 | call getproperties with hasCalendar | ",
		propertyName	:	"['hasCalendar']"
	},
	{
		testName		:	"VT300-141 | call getproperties with hasCamera | ",
		propertyName	:	"['hasCamera']"
	},
	{
		testName		:	"VT300-146 | call getproperties with hasSqlite | ",
		propertyName	:	"['hasSqlite']"
	},
	{
		testName		:	"VT300-147 | call getproperties with hasTouchscreen | ",
		propertyName	:	"['hasTouchscreen']"
	},
	{
		testName		:	"VT300-152 | Run the application on device, call getproperties with isEmulator | ",
		propertyName	:	"['isEmulator']"
	},
	{
		testName		:	"VT300-154 | call getproperties with isMotorolaDevice | ",
		propertyName	:	"['isMotorolaDevice']"
	},
	{
		testName		:	"VT300-157 | call getproperties with locale | ",
		propertyName	:	"['locale']"
	},
	{
		testName		:	"VT300-161 | call getproperties with oemInfo | ",
		propertyName	:	"['oemInfo']"
	},
	{
		testName		:	"VT300-162 | call getproperties with osVersion | ",
		propertyName	:	"['osVersion']"
	},
	{
		testName		:	"VT300-163 | call getproperties with phoneId | ",
		propertyName	:	"['phoneId']"
	},
	{
		testName		:	"VT300-164 | call getproperties with phoneNumber | ",
		propertyName	:	"['phoneNumber']"
	},
	{
		testName		:	"VT300-165 | call getproperties with platform | ",
		propertyName	:	"['platform']"
	},
	{
		testName		:	"VT300-166 | call getproperties with ppiX | ",
		propertyName	:	"['ppiX']"
	},
	{
		testName		:	"VT300-167 | call getproperties with ppiY | ",
		propertyName	:	"['ppiY']"
	},
	{
		testName		:	"VT300-168 | call getproperties with realScreenHeight | ",
		propertyName	:	"['realScreenHeight']"
	},
	{
		testName		:	"VT300-169 | call getproperties with realScreenWidth | ",
		propertyName	:	"['realScreenWidth']"
	},
	{
		testName		:	"VT300-172 | call getproperties with screenHeight | ",
		propertyName	:	"['screenHeight']"
	},
	{
		testName		:	"VT300-173 | call getproperties with screenWidth | ",
		propertyName	:	"['screenWidth']"
	},
	{
		testName		:	"VT300-180 | call getproperties with securityTokenNotPassed | ",
		propertyName	:	"['securityTokenNotPassed']"
	},
	{
		testName		:	"VT300-183 | call getproperties with uuid | ",
		propertyName	:	"['uuid']"
	},
	{
		testName		:	"VT300-184 | call getproperties with webviewFramework | ",
		propertyName	:	"['webviewFramework']"
	}

	];
	
	var sys_setget_properties = [
	
	{
		testName		:	"VT300-132 | call setproperties with applicationIconBadge as 1, call getproperties with  applicationIconBadge | 1",
		setPropertyName	:	'{"applicationIconBadge": "1"}',
		getPropertyName :	"['applicationIconBadge']",
		expectedResult	:	"1"
	},
	{
		testName		:	"VT300-133 | call setproperties with applicationIconBadge as 0, call getproperties with  applicationIconBadge | 0",
		setPropertyName	:	'{"applicationIconBadge": "0"}',
		getPropertyName :	"['applicationIconBadge']",
		expectedResult	:	"0"
	},
	{
		testName		:	"VT300-150 | call setproperties with httpProxyURI, call call getproperties with httpProxyURI | Bibash",
		setPropertyName	:	'{"httpProxyURI": "Bibash"}',
		getPropertyName :	"['httpProxyURI']",
		expectedResult	:	"Bibash"
	},
	{
		testName		:	"VT300-155 | call set/getproperties with localServerPort | 8081",
		setPropertyName	:	'{"localServerPort": "8081"}',
		getPropertyName :	"['localServerPort']",
		expectedResult	:	"8081"
	},

	{
		testName		:	"VT300-178 | call setproperties with screenSleeping as true, call getproperties with screenSleeping | true",
		setPropertyName	:	'{"screenSleeping": true}',
		getPropertyName :	"['screenSleeping']",
		expectedResult	:	"true"
	},
	{
		testName		:	"VT300-179 | call setproperties with screenSleeping as false, call getproperties with screenSleeping | false",
		setPropertyName	:	'{"screenSleeping": false}',
		getPropertyName :	"['screenSleeping']",
		expectedResult	:	"false"
	}

	];