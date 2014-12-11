	var sys_get_property = [
	
	{
		testName		:	"VT200-0688 | call getProperty with country | US",
		propertyName	:	"country",
		osType			: 	["WINDOWS","ANDROID","APPLE","WP8","WINDOWS_DESKTOP"]
	},
	{
		testName		:	"VT200-0687 | call getProperty with deviceName | MC75",
		propertyName	:	"deviceName",
		osType			: 	["WINDOWS","ANDROID","APPLE","WP8","WINDOWS_DESKTOP"]
	}
	/*
	{
		testName		:	"VT300-007 | call getProperty with deviceOwnerEmail | ",
		propertyName	:	"deviceOwnerEmail",
		osType			: 	["ANDROID"]
	},
	{
		testName		:	"VT300-008 | call getProperty with deviceOwnerName | ",
		propertyName	:	"deviceOwnerName",
		osType			: 	["ANDROID"]
	},
	{
		testName		:	"VT300-009 | call getProperty with devicePushId | ",
		propertyName	:	"devicePushId",
		osType			: 	["WINDOWS","ANDROID","APPLE","WP8","WINDOWS_DESKTOP"]
	},
	{
		testName		:	"VT300-010 | call getProperty with freeServerPort | ",
		propertyName	:	"freeServerPort",
		osType			: 	["WINDOWS","ANDROID","APPLE","WP8","WINDOWS_DESKTOP"]
	},
	{
		testName		:	"VT300-011 | call getProperty with hasCalendar | ",
		propertyName	:	"hasCalendar",
		osType			: 	["WINDOWS","ANDROID","APPLE","WP8","WINDOWS_DESKTOP"]
	},
	{
		testName		:	"VT300-012 | call getProperty with hasCamera | ",
		propertyName	:	"hasCamera",
		osType			: 	["WINDOWS","ANDROID","APPLE","WP8","WINDOWS_DESKTOP"]
	},
	{
		testName		:	"VT300-017 | call getProperty with isRhoSimulator | ",
		propertyName	:	"isRhoSimulator",
		osType			: 	["WINDOWS","ANDROID","APPLE","WP8","WINDOWS_DESKTOP"]
	},
	{
		testName		:	"VT300-018 | call getProperty with hasTouchscreen | ",
		propertyName	:	"hasTouchscreen",
		osType			: 	["WINDOWS","ANDROID","APPLE","WP8","WINDOWS_DESKTOP"]
	},
	{
		testName		:	"VT300-023 | call getProperty with isEmulator | ",
		propertyName	:	"isEmulator",
		osType			: 	["WINDOWS","ANDROID","APPLE","WP8","WINDOWS_DESKTOP"]
	},
	{
		testName		:	"VT300-024 | call getProperty with isMotorolaDevice | ",
		propertyName	:	"isMotorolaDevice",
		osType			: 	["WINDOWS","ANDROID","APPLE","WP8","WINDOWS_DESKTOP"]
	},
	{
		testName		:	"VT300-026 | default localServerPort | ",
		propertyName	:	"localServerPort",
		osType			: 	["WINDOWS","ANDROID","APPLE","WP8","WINDOWS_DESKTOP"]
	},
	{
		testName		:	"VT300-033 | call getProperty with oemInfo | ",
		propertyName	:	"oemInfo",
		osType			: 	["WINDOWS","ANDROID","MOTOROLA"]
	},
	
	{
		testName		:	"VT300-034 | call getProperty with osVersion | ",
		propertyName	:	"osVersion",
		osType			: 	["WINDOWS","ANDROID","APPLE","WP8","WINDOWS_DESKTOP"]
	},
	
	{
		testName		:	"VT300-035 | call getProperty with phoneId | ",
		propertyName	:	"phoneId",
		osType			: 	["WINDOWS","ANDROID"]
	},
	{
		testName		:	"VT300-038 | call getProperty with ppiX | ",
		propertyName	:	"ppiX",
		osType			: 	["WINDOWS","ANDROID","APPLE","WP8","WINDOWS_DESKTOP"]
	},
	{
		testName		:	"VT300-039 | call getProperty with ppiY | ",
		propertyName	:	"ppiY",
		osType			: 	["WINDOWS","ANDROID","APPLE","WP8","WINDOWS_DESKTOP"]
	},
	{
		testName		:	"VT300-040 | call getProperty with realScreenHeight | ",
		propertyName	:	"realScreenHeight",
		osType			: 	["WINDOWS","ANDROID","APPLE","WP8","WINDOWS_DESKTOP"]
	},
	{
		testName		:	"VT300-041 | call getProperty with realScreenWidth | ",
		propertyName	:	"realScreenWidth",
		osType			: 	["WINDOWS","ANDROID","APPLE","WP8","WINDOWS_DESKTOP"]
	},
	{
		testName		:	"VT300-046 | call getProperty with screenHeight | ",
		propertyName	:	"screenHeight",
		osType			: 	["WINDOWS","ANDROID","APPLE","WP8","WINDOWS_DESKTOP"]
	},
	{
		testName		:	"VT300-047 | call getProperty with screenWidth | ",
		propertyName	:	"screenWidth",
		osType			: 	["WINDOWS","ANDROID","APPLE","WP8","WINDOWS_DESKTOP"]
	},
	{
		testName		:	"VT300-059 | call getProperty with uuid | ",
		propertyName	:	"uuid",
		osType			: 	["WINDOWS","ANDROID","MOTOROLA"]
	},
	{
		testName		:	"VT300-060 | call getProperty with webviewFramework | ",
		propertyName	:	"webviewFramework",
		osType			: 	["WINDOWS","ANDROID","APPLE","WP8","WINDOWS_DESKTOP"]
	}
	*/
	];
	
	var sys_get_properties = [
	
	{
		testName		:	"VT200-0688 | call getproperties with country | ",
		propertyName	:	"country",
		osType			: 	["WINDOWS","ANDROID","APPLE","WP8","WINDOWS_DESKTOP"]
	},
	{
		testName		:	"VT200-0689 | call getproperties with deviceName | ",
		propertyName	:	"deviceName",
		osType			: 	["WINDOWS","ANDROID","APPLE","WP8","WINDOWS_DESKTOP"]
	},
	/*
	{
		testName		:	"VT300-136 | call getproperties with deviceOwnerEmail | ",
		propertyName	:	"deviceOwnerEmail",
		osType			: 	["ANDROID"]
	},
	{
		testName		:	"VT300-137 | call getproperties with deviceOwnerName | ",
		propertyName	:	"deviceOwnerName",
		osType			: 	["ANDROID"]
	},
	{
		testName		:	"VT300-138 | call getproperties with devicePushId | ",
		propertyName	:	"devicePushId",
		osType			: 	["WINDOWS","ANDROID","APPLE","WP8","WINDOWS_DESKTOP"]
	},
	{
		testName		:	"VT300-139 | call getproperties with freeServerPort | ",
		propertyName	:	"freeServerPort",
		osType			: 	["WINDOWS","ANDROID","APPLE","WP8","WINDOWS_DESKTOP"]
	},
	{
		testName		:	"VT300-140 | call getproperties with hasCalendar | ",
		propertyName	:	"hasCalendar",
		osType			: 	["WINDOWS","ANDROID","APPLE","WP8","WINDOWS_DESKTOP"]
	},
	{
		testName		:	"VT300-141 | call getproperties with hasCamera | ",
		propertyName	:	"hasCamera",
		osType			: 	["WINDOWS","ANDROID","APPLE","WP8","WINDOWS_DESKTOP"]
	},
	{
		testName		:	"VT300-146 | call getproperties with hasSqlite | ",
		propertyName	:	"hasSqlite",
		osType			: 	["WINDOWS","ANDROID","APPLE","WP8","WINDOWS_DESKTOP"]
	},
	{
		testName		:	"VT300-147 | call getproperties with hasTouchscreen | ",
		propertyName	:	"hasTouchscreen",
		osType			: 	["WINDOWS","ANDROID","APPLE","WP8","WINDOWS_DESKTOP"]
	},
	{
		testName		:	"VT300-151 | Run the application on device, call getproperties with isEmulator | ",
		propertyName	:	"isEmulator",
		osType			: 	["WINDOWS","ANDROID","APPLE","WP8","WINDOWS_DESKTOP"]
	},
	{
		testName		:	"VT300-152 | call getproperties with isMotorolaDevice | ",
		propertyName	:	"isMotorolaDevice",
		osType			: 	["WINDOWS","ANDROID","APPLE","WP8","WINDOWS_DESKTOP"]
	},
	{
		testName		:	"VT300-153 | getproperties with localServerPort | ",
		propertyName	:	"localServerPort",
		osType			: 	["WINDOWS","ANDROID","APPLE","WP8","WINDOWS_DESKTOP"]
	},
	{
		testName		:	"VT300-154 | call getproperties with locale | ",
		propertyName	:	"locale",
		osType			: 	["WINDOWS","ANDROID","APPLE","WP8","WINDOWS_DESKTOP"]
	},
	{
		testName		:	"VT300-161 | call getproperties with oemInfo | ",
		propertyName	:	"oemInfo",
		osType			: 	["WINDOWS","ANDROID","MOTOROLA"]
	},
	{
		testName		:	"VT300-162 | call getproperties with osVersion | ",
		propertyName	:	"osVersion",
		osType			: 	["WINDOWS","ANDROID","APPLE","WP8","WINDOWS_DESKTOP"]
	},
	{
		testName		:	"VT300-163 | call getproperties with phoneId | ",
		propertyName	:	"phoneId",
		osType			: 	["WINDOWS","ANDROID","APPLE","WP8","WINDOWS_DESKTOP"]
	},
	{
		testName		:	"VT300-164 | call getproperties with phoneNumber | ",
		propertyName	:	"phoneNumber",
		osType			: 	["WINDOWS","ANDROID","APPLE","WP8","WINDOWS_DESKTOP"]
	},
	*/
	{
		testName		:	"VT200-0677 | call getproperties with platform | ",
		propertyName	:	"platform",
		osType			: 	["WINDOWS","ANDROID","APPLE","WP8","WINDOWS_DESKTOP"]
	}
	/*
	{
		testName		:	"VT300-166 | call getproperties with ppiX | ",
		propertyName	:	"ppiX",
		osType			: 	["WINDOWS","ANDROID","APPLE","WP8","WINDOWS_DESKTOP"]
	},
	{
		testName		:	"VT300-167 | call getproperties with ppiY | ",
		propertyName	:	"ppiY",
		osType			: 	["WINDOWS","ANDROID","APPLE","WP8","WINDOWS_DESKTOP"]
	},
	{
		testName		:	"VT300-168 | call getproperties with realScreenHeight | ",
		propertyName	:	"realScreenHeight",
		osType			: 	["WINDOWS","ANDROID","APPLE","WP8","WINDOWS_DESKTOP"]
	},
	{
		testName		:	"VT300-169 | call getproperties with realScreenWidth | ",
		propertyName	:	"realScreenWidth",
		osType			: 	["WINDOWS","ANDROID","APPLE","WP8","WINDOWS_DESKTOP"]
	},
	{
		testName		:	"VT300-172 | call getproperties with screenHeight | ",
		propertyName	:	"screenHeight",
		osType			: 	["WINDOWS","ANDROID","APPLE","WP8","WINDOWS_DESKTOP"]
	},
	{
		testName		:	"VT300-173 | call getproperties with screenWidth | ",
		propertyName	:	"screenWidth",
		osType			: 	["WINDOWS","ANDROID","APPLE","WP8","WINDOWS_DESKTOP"]
	},
	{
		testName		:	"VT300-183 | call getproperties with uuid | ",
		propertyName	:	"uuid",
		osType			: 	["WINDOWS","ANDROID","MOTOROLA"]
	},
	{
		testName		:	"VT300-184 | call getproperties with webviewFramework | ",
		propertyName	:	"webviewFramework",
		osType			: 	["WINDOWS","ANDROID","APPLE","WP8","WINDOWS_DESKTOP"]
	}
*/
	];