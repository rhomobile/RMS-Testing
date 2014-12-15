	
var video_setget_property = [
	{
		testName		:	"VT281-0659 | Call set and get property duration videocapture | 10000",
		propertyName	:	"duration",
		propertyValue	:	10000,
		expectedResult	:	10000,
		osType			: 	["WINDOWS", "WP8", "ANDROID", "APPLE", "WINDOWS_DESKTOP"]
	},
	{
		testName		:	"VT281-0660 | Call set and get property duration videocapture | 15000",
		propertyName	:	"duration",
		propertyValue	:	15000,
		expectedResult	:	15000,
		osType			: 	["WINDOWS", "WP8", "ANDROID", "APPLE", "WINDOWS_DESKTOP"]
	},
/*	{
		testName		:	"VT281-0661 | Call set and get property duration with nagative value videocapture| -15000",
		propertyName	:	"duration",
		propertyValue	:	-15000,
		expectedResult	:	-15000,
		osType			: 	["WINDOWS", "WP8", "ANDROID", "APPLE", "WINDOWS_DESKTOP"]
	},*/
	{
		testName		:	"VT281-0662 | Call set and get property resolution videocapture | low",
		propertyName	:	"resolution",
		propertyValue	:	"low",
		expectedResult	:	"low",
		osType			: 	["WINDOWS", "WP8", "ANDROID", "APPLE", "WINDOWS_DESKTOP"]
	},
	{
		testName		:	"VT281-0663 | Call set and get property resolution videocapture| high",
		propertyName	:	"resolution",
		propertyValue	:	"high",
		expectedResult	:	"high",
		osType			: 	["WINDOWS", "WP8", "ANDROID", "APPLE", "WINDOWS_DESKTOP"]
	},	
	{
		testName		:	"VT281-0664 | Call set and get property saveToGallery videocapture| true",
		propertyName	:	"saveToGallery",
		propertyValue	:	true,
		expectedResult	:	true,
		osType			: 	["WINDOWS", "WP8", "ANDROID", "APPLE", "WINDOWS_DESKTOP"]
	},
	{
		testName		:	"VT281-0665 | Call set and get property saveToGallery videocapture| false",
		propertyName	:	"saveToGallery",
		propertyValue	:	false,
		expectedResult	:	false,
		osType			: 	["WINDOWS", "WP8", "ANDROID", "APPLE", "WINDOWS_DESKTOP"]
	},
	{
		testName		:	"VT281-0666 | Call set and get property filename videocapture| '/Application/Rhovideocapture'",
		propertyName	:	"filename",
		propertyValue	:	"/Application/Rhovideocapture",
		expectedResult	:	"/Application/Rhovideocapture.mp4",
		osType			: 	["ANDROID"]
	},
	{
		testName		:	"VT281-0666 | Call set and get property filename videocapture| '/Application/Rhovideocapture'",
		propertyName	:	"filename",
		propertyValue	:	"/Application/Rhovideocapture",
		expectedResult	:	"/Application/Rhovideocapture.mov",
		osType			: 	["WINDOWS", "APPLE"]
	},	
	{
		testName		:	"VT281-0667 | Call set and get property filename videocapture| '/Temp/Rhovideocapture'",
		propertyName	:	"filename",
		propertyValue	:	"/Temp/Rhovideocapture",
		expectedResult	:	"/Temp/Rhovideocapture.mp4",
		osType			: 	["ANDROID"]
	},
	{
		testName		:	"VT281-0667 | Call set and get property filename videocapture| '/Temp/Rhovideocapture'",
		propertyName	:	"filename",
		propertyValue	:	"/Temp/Rhovideocapture",
		expectedResult	:	"/Temp/Rhovideocapture.mov",
		osType			: 	["WINDOWS", "APPLE"]
	}		
	];

var video_setget_properties = [
	
	{
		testName		:	"VT281-0668 | Call set and get properties duration videocapture | 10000",
		propertyName	:	"duration",
		propertyValue	:	10000,
		expectedResult	:	10000,
		osType			: 	["WINDOWS", "WP8", "ANDROID", "APPLE", "WINDOWS_DESKTOP"]
	},
	{
		testName		:	"VT281-0669 | Call set and get properties duration videocapture | 15000",
		propertyName	:	"duration",
		propertyValue	:	15000,
		expectedResult	:	15000,
		osType			: 	["WINDOWS", "WP8", "ANDROID", "APPLE", "WINDOWS_DESKTOP"]
	},
/*	{
		testName		:	"VT281-0670 | Call set and get properties duration with nagative value videocapture| -15000",
		propertyName	:	"duration",
		propertyValue	:	"-15000",
		expectedResult	:	"-15000",
		osType			: 	["WINDOWS", "WP8", "ANDROID", "APPLE", "WINDOWS_DESKTOP"]
	},*/
	{
		testName		:	"VT281-0671 | Call set and get properties resolution videocapture | low",
		propertyName	:	"resolution",
		propertyValue	:	"low",
		expectedResult	:	"low",
		osType			: 	["WINDOWS", "WP8", "ANDROID", "APPLE", "WINDOWS_DESKTOP"]
	},
	{
		testName		:	"VT281-0672 | Call set and get properties resolution videocapture| high",
		propertyName	:	"resolution",
		propertyValue	:	"high",
		expectedResult	:	"high",
		osType			: 	["WINDOWS", "WP8", "ANDROID", "APPLE", "WINDOWS_DESKTOP"]
	},	
	{
		testName		:	"VT281-0673 | Call set and get properties saveToGallery videocapture| true",
		propertyName	:	"saveToGallery",
		propertyValue	:	true,
		expectedResult	:	true,
		osType			: 	["WINDOWS", "WP8", "ANDROID", "APPLE", "WINDOWS_DESKTOP"]
	},
	{
		testName		:	"VT281-0674 | Call set and get properties saveToGallery videocapture| false",
		propertyName	:	"saveToGallery",
		propertyValue	:	false,
		expectedResult	:	false,
		osType			: 	["WINDOWS", "WP8", "ANDROID", "APPLE", "WINDOWS_DESKTOP"]
	},
	{
		testName		:	"VT281-0675 | Call set and get properties filename videocapture| '/Application/Rhovideocapture'",
		propertyName	:	"filename",
		propertyValue	:	"/Application/Rhovideocapture",
		expectedResult	:	"/Application/Rhovideocapture.mp4",
		osType			: 	["ANDROID"]
	},
	{
		testName		:	"VT281-0675 | Call set and get properties filename videocapture| '/Application/Rhovideocapture'",
		propertyName	:	"filename",
		propertyValue	:	"/Application/Rhovideocapture",
		expectedResult	:	"/Application/Rhovideocapture.mov",
		osType			: 	["WINDOWS", "APPLE",]
	},	
	{
		testName		:	"VT281-0676 | Call set and get properties filename videocapture| '/Temp/Rhovideocapture'",
		propertyName	:	"filename",
		propertyValue	:	"/Temp/Rhovideocapture",
		expectedResult	:	"/Temp/Rhovideocapture.mp4",
		osType			: 	["ANDROID"]
	},
	{
		testName		:	"VT281-0676 | Call set and get properties filename videocapture| '/Temp/Rhovideocapture'",
		propertyName	:	"filename",
		propertyValue	:	"/Temp/Rhovideocapture",
		expectedResult	:	"/Temp/Rhovideocapture.mov",
		osType			: 	["WINDOWS", "APPLE"]
	}	

	];