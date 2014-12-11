testCases = [
	{
		testName		:	"Testing setting and retrieving the autoEnter Property",
		propertyName	:	"autoEnter",
		propertyRW		: 	"RW",
		scannerTypes	:	"All",
		excludedDevices	:	"",
		excludedOS		:	"",
		values			:	["true", "false"]
	},
	{
		testName		:	"Testing setting and retrieving the autoTab Property",
		propertyName	:	"autoTab",
		propertyRW		: 	"RW",
		scannerTypes	:	"All",
		excludedDevices	:	"",
		excludedOS		:	"",
		values			:	["true", "false"]
	},
	{
		//  Need two linearSecurityLevels as redundancyAndLength is only on Laser Scanners
		testName		:	"Testing setting and retrieving the linearSecurityLevel Property",
		propertyName	:	"linearSecurityLevel",
		propertyRW		: 	"RW",
		scannerTypes	:	"Imager",
		excludedDevices	:	"",
		excludedOS		:	"Android",
		values			:	["shortOrCodabar", "longAndShort", "allTwice", "allThrice"]
	},
	{
		//  Need two linearSecurityLevels as redundancyAndLength is only on Laser Scanners
		testName		:	"Testing setting and retrieving the linearSecurityLevel Property",
		propertyName	:	"linearSecurityLevel",
		propertyRW		: 	"RW",
		scannerTypes	:	"Laser",
		excludedDevices	:	"",
		excludedOS		:	"Android",
		values			:	["redundancyAndLength", "shortOrCodabar", "longAndShort", "allTwice", "allThrice"]
	},
	{
		testName		:	"Testing setting and retrieving the scanTimeout Property",
		propertyName	:	"scanTimeout",
		propertyRW		: 	"RW",
		scannerTypes	:	"All",
		excludedDevices	:	"",
		excludedOS		:	"",
		values			:	["0", "1000", "5000", "7000"]
	},
	{
		testName		:	"Testing setting and retrieving the rasterMode Property",
		propertyName	:	"rasterMode",
		propertyRW		: 	"RW",
		scannerTypes	:	"Laser",
		excludedDevices	:	"",
		excludedOS		:	"Android",
		values			:	["none", "openAlways", "smart", "cyclone"]
	},
	{
		testName		:	"Testing setting and retrieving the  Property",
		propertyName	:	"rasterHeight",
		propertyRW		: 	"RW",
		scannerTypes	:	"Laser",
		excludedDevices	:	"",
		excludedOS		:	"Android",
		values			:	["0", "50", "100"]
	},
	{
		testName		:	"Testing setting and retrieving the aimType Property",
		propertyName	:	"aimType",
		propertyRW		: 	"RW",
		scannerTypes	:	"All",
		excludedDevices	:	"",
		excludedOS		:	"Android",
		values			:	["trigger", "timedHold", "timedRelease", "presentation", "pressAndRelease", "continuousRead"]
	},
	{
		testName		:	"Testing setting and retrieving the timedAimDuration Property",
		propertyName	:	"timedAimDuration",
		propertyRW		: 	"RW",
		scannerTypes	:	"All",
		excludedDevices	:	"",
		excludedOS		:	"Android",
		values			:	["10", "500", "1000", "5000"]
	},
	{
		testName		:	"Testing setting and retrieving the sameSymbolTimeout Property",
		propertyName	:	"sameSymbolTimeout",
		propertyRW		: 	"RW",
		scannerTypes	:	"All",
		excludedDevices	:	"",
		excludedOS		:	"Android",
		values			:	["0", "500", "1000", "5000"]
	},
	{
		testName		:	"Testing setting and retrieving the differentSymbolTimeout Property",
		propertyName	:	"differentSymbolTimeout",
		propertyRW		: 	"RW",
		scannerTypes	:	"All",
		excludedDevices	:	"",
		excludedOS		:	"Android",
		values			:	["0", "500", "1000", "5000"]
	},
	{
		testName		:	"Testing setting and retrieving the aimMode Property",
		propertyName	:	"aimMode",
		propertyRW		: 	"RW",
		scannerTypes	:	"All",
		excludedDevices	:	"",
		excludedOS		:	"Android",
		values			:	["none", "dot", "slab", "reticle"]
	},
	{
		testName		:	"Testing setting and retrieving the picklistMode Property",
		propertyName	:	"picklistMode",
		propertyRW		: 	"RW",
		scannerTypes	:	"Imager",
		excludedDevices	:	"",
		excludedOS		:	"",
		values			:	["disabled", "hardwareReticle", "softwareReticle"]
	},
	{
		testName		:	"Testing setting and retrieving the viewfinderMode Property",
		propertyName	:	"viewfinderMode",
		propertyRW		: 	"RW",
		scannerTypes	:	"Imager",
		excludedDevices	:	"",
		excludedOS		:	"",
		values			:	["enabled", "disabled", "staticReticle", "dynamicReticle"]
	},
	{
		testName		:	"Testing setting and retrieving the viewfinderX Property",
		propertyName	:	"viewfinderX",
		propertyRW		: 	"RW",
		scannerTypes	:	"Imager",
		excludedDevices	:	"",
		excludedOS		:	"Android",
		values			:	["200", "50", "0"]
	},
	{
		testName		:	"Testing setting and retrieving the viewfinderY Property",
		propertyName	:	"viewfinderY",
		propertyRW		: 	"RW",
		scannerTypes	:	"Imager",
		excludedDevices	:	"",
		excludedOS		:	"Android",
		values			:	["200", "50", "0"]
	},
	{
		testName		:	"Testing setting and retrieving the viewfinderWidth Property",
		propertyName	:	"viewfinderWidth",
		propertyRW		: 	"RW",
		scannerTypes	:	"Imager",		
		excludedDevices	:	"",
		excludedOS		:	"Android",		
		values			:	["50", "100", "350"]
	},
	{
		testName		:	"Testing setting and retrieving the viewfinderHeight Property",
		propertyName	:	"viewfinderHeight",
		propertyRW		: 	"RW",
		scannerTypes	:	"Imager",
		excludedDevices	:	"",
		excludedOS		:	"Android",		
		values			:	["50", "100", "350"]
	},
	{
		testName		:	"Testing setting and retrieving the viewfinderFeedback Property",
		propertyName	:	"viewfinderFeedback",
		propertyRW		: 	"RW",
		scannerTypes	:	"Imager",
		excludedDevices	:	"",
		excludedOS		:	"",		
		values			:	["enabled", "disabled", "reticle"]
	},
	{
		testName		:	"Testing setting and retrieving the viewfinderFeedbackTime Property",
		propertyName	:	"viewfinderFeedbackTime",
		propertyRW		: 	"RW",
		scannerTypes	:	"Imager",
		excludedDevices	:	"",
		excludedOS		:	"",
		values			:	["0", "3", "10"]
	},
	{
		testName		:	"Testing setting and retrieving the focusMode Property",
		propertyName	:	"focusMode",
		propertyRW		: 	"RW",
		scannerTypes	:	"Imager",
		excludedDevices	:	"",
		excludedOS		:	"Android",
		values			:	["fixed", "auto"]
	},
	{
		testName		:	"Testing setting and retrieving the illuminationMode Property",
		propertyName	:	"illuminationMode",
		propertyRW		: 	"RW",
		scannerTypes	:	"Imager",
		excludedDevices	:	"",
		excludedOS		:	"",
		values			:	["auto", "alwaysOn", "alwaysOff"]
	},
	{
		testName		:	"Testing setting and retrieving the dpmMode Property",
		propertyName	:	"dpmMode",
		propertyRW		: 	"RW",
		scannerTypes	:	"Imager",
		excludedDevices	:	"MC75A",
		excludedOS		:	"Android",
		values			:	["true", "false"]
	},
	{
		testName		:	"Testing setting and retrieving the inverse1dMode Property",
		propertyName	:	"inverse1dMode",
		propertyRW		: 	"RW",
		scannerTypes	:	"Imager",
		excludedDevices	:	"",
		excludedOS		:	"",
		values			:	["enabled", "disabled", "auto"]
	},
	{
		testName		:	"Testing setting and retrieving the poorQuality1dMode Property",
		propertyName	:	"poorQuality1dMode",
		propertyRW		: 	"RW",
		scannerTypes	:	"Imager",
		excludedDevices	:	"",
		excludedOS		:	"Android",
		values			:	["true", "false"]
	},
	{
		testName		:	"Testing setting and retrieving the beamWidth Property",
		propertyName	:	"beamWidth",
		propertyRW		: 	"RW",
		scannerTypes	:	"Laser",
		excludedDevices	:	"",
		excludedOS		:	"",
		values			:	["normal", "wide", "narrow"]
	},
	{
		testName		:	"Testing setting and retrieving the dbpMode Property",
		propertyName	:	"dbpMode",
		propertyRW		: 	"RW",
		scannerTypes	:	"Laser",
		excludedDevices	:	"",
		excludedOS		:	"Android",
		values			:	["normal", "composite"]
	},
	{
		testName		:	"Testing setting and retrieving the klasseEins Property",
		propertyName	:	"klasseEins",
		propertyRW		: 	"RW",
		scannerTypes	:	"Laser",
		excludedDevices	:	"",
		excludedOS		:	"Android",
		values			:	["true", "false"]
	},
	{
		testName		:	"Testing setting and retrieving the adaptiveScanning Property",
		propertyName	:	"adaptiveScanning",
		propertyRW		: 	"RW",
		scannerTypes	:	"Laser",
		excludedDevices	:	"",
		excludedOS		:	"",
		values			:	["true", "false"]
	},
	{
		testName		:	"Testing setting and retrieving the bidirectionalRedundancy Property",
		propertyName	:	"bidirectionalRedundancy",
		propertyRW		: 	"RW",
		scannerTypes	:	"Laser",
		excludedDevices	:	"",
		excludedOS		:	"Android",
		values			:	["true", "false"]
	},
	{
		testName		:	"Testing setting and retrieving the barcodeDataFormat Property",
		propertyName	:	"barcodeDataFormat",
		propertyRW		: 	"RW",
		scannerTypes	:	"All",
		excludedDevices	:	"",
		excludedOS		:	"Android",
		values			:	["binary", "text"]
	},
	{
		testName		:	"Testing setting and retrieving the dataBufferSize Property",
		propertyName	:	"dataBufferSize",
		propertyRW		: 	"RW",
		scannerTypes	:	"All",
		excludedDevices	:	"",
		excludedOS		:	"Android",
		values			:	["50", "2000", "8000"]
	},
	{
		testName		:	"Testing setting and retrieving the connectionIdleTimeout Property",
		propertyName	:	"connectionIdleTimeout",
		propertyRW		: 	"RW",
		scannerTypes	:	"Bluetooth",
		excludedDevices	:	"",
		excludedOS		:	"Android",
		values			:	["5", "30", "300"]
	},
	{
		testName		:	"Testing setting and retrieving thedisconnectBtOnDisable  Property",
		propertyName	:	"disconnectBtOnDisable",
		propertyRW		: 	"RW",
		scannerTypes	:	"Bluetooth",
		excludedDevices	:	"",
		excludedOS		:	"Android",
		values			:	["true", "false"]
	},
	{
		testName		:	"Testing setting and retrieving the displayBtAddressBarcodeOnEnable Property",
		propertyName	:	"displayBtAddressBarcodeOnEnable",
		propertyRW		: 	"RW",
		scannerTypes	:	"Bluetooth",
		excludedDevices	:	"",
		excludedOS		:	"Android",
		values			:	["true", "false"]
	},
	{
		testName		:	"Testing setting and retrieving the enableTimeout Property",
		propertyName	:	"enableTimeout",
		propertyRW		: 	"RW",
		scannerTypes	:	"Bluetooth",
		excludedDevices	:	"",
		excludedOS		:	"",
		values			:	["5", "30", "300"]
	},
	{
		testName		:	"Testing setting and retrieving the lowBatteryScan Property",
		propertyName	:	"lowBatteryScan",
		propertyRW		: 	"RW",
		scannerTypes	:	"All",
		excludedDevices	:	"",
		excludedOS		:	"Android",
		values			:	["true", "false"]
	},
	{
		testName		:	"Testing setting and retrieving the disableScannerDuringNavigate Property",
		propertyName	:	"disableScannerDuringNavigate",
		propertyRW		: 	"RW",
		scannerTypes	:	"All",
		excludedDevices	:	"",
		excludedOS		:	"Android",
		values			:	["true", "false"]
	},
	{
		testName		:	"Testing setting and retrieving the decodeVolume Property",
		propertyName	:	"decodeVolume",
		propertyRW		: 	"RW",
		scannerTypes	:	"All",
		excludedDevices	:	"",
		excludedOS		:	"",
		values			:	["0", "3", "5"]
	},
	{
		testName		:	"Testing setting and retrieving the decodeDuration Property",
		propertyName	:	"decodeDuration",
		propertyRW		: 	"RW",
		scannerTypes	:	"",
		excludedDevices	:	"",
		excludedOS		:	"",
		values			:	["500", "2000", "4000"]
	},
	{
		testName		:	"Testing setting and retrieving the decodeFrequency Property",
		propertyName	:	"decodeFrequency",
		propertyRW		: 	"RW",
		scannerTypes	:	"",
		excludedDevices	:	"",
		excludedOS		:	"",
		values			:	["0", "2000", "4000"]
	},
	{
		testName		:	"Testing setting and retrieving the invalidDecodeFrequency Property",
		propertyName	:	"invalidDecodeFrequency",
		propertyRW		: 	"RW",
		scannerTypes	:	"",
		excludedDevices	:	"",
		excludedOS		:	"Android",
		values			:	["0", "2000", "4000"]
	},
	{
		testName		:	"Testing setting and retrieving the decodeSound Property",
		propertyName	:	"decodeSound",
		propertyRW		: 	"RW",
		scannerTypes	:	"",
		excludedDevices	:	"",
		excludedOS		:	"",
		values			:	["\\myfile.wav", "", "\\mydirectory\\myfile.wav"]
	},
	{
		testName		:	"Testing setting and retrieving the invalidDecodeSound Property",
		propertyName	:	"invalidDecodeSound",
		propertyRW		: 	"RW",
		scannerTypes	:	"",
		excludedDevices	:	"",
		excludedOS		:	"Android",
		values			:	["\\myInvalidFile.wav", "", "\\myInvalidDirectory\\myInvalidFile.wav"]
	},
	{
		testName		:	"Testing setting and retrieving the allDecoders Property",
		propertyName	:	"allDecoders",
		propertyRW		: 	"RW",
		scannerTypes	:	"",
		excludedDevices	:	"",
		excludedOS		:	"",
		values			:	["true", "false"]
	},
	{
		testName		:	"Testing setting and retrieving the aztec Property",
		propertyName	:	"aztec",
		propertyRW		: 	"RW",
		scannerTypes	:	"Imager",
		excludedDevices	:	"",
		excludedOS		:	"",
		values			:	["true", "false"]
	},
	{
		testName		:	"Testing setting and retrieving the chinese2of5 Property",
		propertyName	:	"chinese2of5",
		propertyRW		: 	"RW",
		scannerTypes	:	"",
		excludedDevices	:	"",
		excludedOS		:	"",
		values			:	["true", "false"]
	},
	{
		testName		:	"Testing setting and retrieving the codabar Property",
		propertyName	:	"codabar",
		propertyRW		: 	"RW",
		scannerTypes	:	"",
		excludedDevices	:	"",
		excludedOS		:	"",
		values			:	["true", "false"]
	},
	{
		testName		:	"Testing setting and retrieving the codabarClsiEditing Property",
		propertyName	:	"codabarClsiEditing",
		propertyRW		: 	"RW",
		scannerTypes	:	"",
		excludedDevices	:	"",
		excludedOS		:	"",
		values			:	["true", "false"]
	},
	{
		testName		:	"Testing setting and retrieving the codabarMaxLength Property",
		propertyName	:	"codabarMaxLength",
		propertyRW		: 	"RW",
		scannerTypes	:	"",
		excludedDevices	:	"",
		excludedOS		:	"",
		values			:	["10", "35", "55"]
	},
	{
		testName		:	"Testing setting and retrieving the codabarMinLength Property",
		propertyName	:	"codabarMinLength",
		propertyRW		: 	"RW",
		scannerTypes	:	"",
		excludedDevices	:	"",
		excludedOS		:	"",
		values			:	["10", "35", "55"]
	},
	{
		testName		:	"Testing setting and retrieving the codabarNotisEditing Property",
		propertyName	:	"codabarNotisEditing",
		propertyRW		: 	"RW",
		scannerTypes	:	"",
		excludedDevices	:	"",
		excludedOS		:	"",
		values			:	["true", "false"]
	},
	{
		testName		:	"Testing setting and retrieving the CodabarRedundancy Property",
		propertyName	:	"CodabarRedundancy",
		propertyRW		: 	"RW",
		scannerTypes	:	"",
		excludedDevices	:	"",
		excludedOS		:	"",
		values			:	["true", "false"]
	},
	{
		testName		:	"Testing setting and retrieving the code11 Property",
		propertyName	:	"code11",
		propertyRW		: 	"RW",
		scannerTypes	:	"",
		excludedDevices	:	"",
		excludedOS		:	"",
		values			:	["true", "false"]
	},
	{
		testName		:	"Testing setting and retrieving the code11checkDigitCount Property",
		propertyName	:	"code11checkDigitCount",
		propertyRW		: 	"RW",
		scannerTypes	:	"",
		excludedDevices	:	"",
		excludedOS		:	"",
		values			:	["none", "one", "two"]
	},
	{
		testName		:	"Testing setting and retrieving the code11maxLength Property",
		propertyName	:	"code11maxLength",
		propertyRW		: 	"RW",
		scannerTypes	:	"",
		excludedDevices	:	"",
		excludedOS		:	"",
		values			:	["10", "35", "55"]
	},
	{
		testName		:	"Testing setting and retrieving the code11minLength Property",
		propertyName	:	"code11minLength",
		propertyRW		: 	"RW",
		scannerTypes	:	"",
		excludedDevices	:	"",
		excludedOS		:	"",
		values			:	["10", "35", "55"]
	},
	{
		testName		:	"Testing setting and retrieving the code11redundancy Property",
		propertyName	:	"code11redundancy",
		propertyRW		: 	"RW",
		scannerTypes	:	"",
		excludedDevices	:	"",
		excludedOS		:	"",
		values			:	["true", "false"]
	},
	{
		testName		:	"Testing setting and retrieving the code11reportCheckDigit Property",
		propertyName	:	"code11reportCheckDigit",
		propertyRW		: 	"RW",
		scannerTypes	:	"",
		excludedDevices	:	"",
		excludedOS		:	"",
		values			:	["true", "false"]
	},
	{
		testName		:	"Testing setting and retrieving the code128 Property",
		propertyName	:	"code128",
		propertyRW		: 	"RW",
		scannerTypes	:	"",
		excludedDevices	:	"",
		excludedOS		:	"",
		values			:	["true", "false"]
	},
	{
		testName		:	"Testing setting and retrieving the code128checkIsBtTable Property",
		propertyName	:	"code128checkIsBtTable",
		propertyRW		: 	"RW",
		scannerTypes	:	"",
		excludedDevices	:	"",
		excludedOS		:	"",
		values			:	["true", "false"]
	},
	{
		testName		:	"Testing setting and retrieving the code128ean128 Property",
		propertyName	:	"code128ean128",
		propertyRW		: 	"RW",
		scannerTypes	:	"",
		excludedDevices	:	"",
		excludedOS		:	"",
		values			:	["true", "false"]
	},
	{
		testName		:	"Testing setting and retrieving the code128isbt128 Property",
		propertyName	:	"code128isbt128",
		propertyRW		: 	"RW",
		scannerTypes	:	"",
		excludedDevices	:	"",
		excludedOS		:	"",
		values			:	["true", "false"]
	},
	{
		testName		:	"Testing setting and retrieving the code128isbtConcatMode Property",
		propertyName	:	"code128isbt128ConcatMode",
		propertyRW		: 	"RW",
		scannerTypes	:	"",
		excludedDevices	:	"",
		excludedOS		:	"",
		values			:	["never", "always", "auto"]
	},
	{
		testName		:	"Testing setting and retrieving the code128maxLength Property",
		propertyName	:	"code128maxLength",
		propertyRW		: 	"RW",
		scannerTypes	:	"",
		excludedDevices	:	"",
		excludedOS		:	"",
		values			:	["10", "35", "55"]
	},
	{
		testName		:	"Testing setting and retrieving the code128minLength Property",
		propertyName	:	"code128minLength",
		propertyRW		: 	"RW",
		scannerTypes	:	"",
		excludedDevices	:	"",
		excludedOS		:	"",
		values			:	["10", "35", "55"]
	},
	{
		testName		:	"Testing setting and retrieving the code128other128 Property",
		propertyName	:	"code128other128",
		propertyRW		: 	"RW",
		scannerTypes	:	"",
		excludedDevices	:	"",
		excludedOS		:	"",
		values			:	["true", "false"]
	},
	{
		testName		:	"Testing setting and retrieving the code128redundancy Property",
		propertyName	:	"code128redundancy",
		propertyRW		: 	"RW",
		scannerTypes	:	"",
		excludedDevices	:	"",
		excludedOS		:	"",
		values			:	["true", "false"]
	},
	{
		testName		:	"Testing setting and retrieving the code128securityLevel Property",
		propertyName	:	"code128securityLevel",
		propertyRW		: 	"RW",
		scannerTypes	:	"",
		excludedDevices	:	"",
		excludedOS		:	"",
		values			:	["0", "1", "2", "3"]
	},
	{
		testName		:	"Testing setting and retrieving the compositeAb Property",
		propertyName	:	"compositeAb",
		propertyRW		: 	"RW",
		scannerTypes	:	"Imager",
		excludedDevices	:	"",
		excludedOS		:	"",
		values			:	["true", "false"]
	},
	{
		testName		:	"Testing setting and retrieving the compositeAbUccLinkMode Property",
		propertyName	:	"compositeAbUccLinkMode",
		propertyRW		: 	"RW",
		scannerTypes	:	"Imager",
		excludedDevices	:	"",
		excludedOS		:	"",
		values			:	["never", "always", "auto"]
	},
	{
		testName		:	"Testing setting and retrieving the compositeAbUseUpcPreambleCheckDigitRules Property",
		propertyName	:	"compositeAbUseUpcPreambleCheckDigitRules",
		propertyRW		: 	"RW",
		scannerTypes	:	"Imager",
		excludedDevices	:	"",
		excludedOS		:	"Android",
		values			:	["true", "false"]
	},
	{
		testName		:	"Testing setting and retrieving the compositeC Property",
		propertyName	:	"compositeC",
		propertyRW		: 	"RW",
		scannerTypes	:	"Imager",
		excludedDevices	:	"",
		excludedOS		:	"",
		values			:	["true", "false"]
	},
	{
		testName		:	"Testing setting and retrieving the code39 Property",
		propertyName	:	"code39",
		propertyRW		: 	"RW",
		scannerTypes	:	"",
		excludedDevices	:	"",
		excludedOS		:	"",
		values			:	["true", "false"]
	},
	{
		testName		:	"Testing setting and retrieving the code39code32Prefix Property",
		propertyName	:	"code39code32Prefix",
		propertyRW		: 	"RW",
		scannerTypes	:	"",
		excludedDevices	:	"",
		excludedOS		:	"",
		values			:	["true", "false"]
	},
	{
		testName		:	"Testing setting and retrieving the code39convertToCode32 Property",
		propertyName	:	"code39convertToCode32",
		propertyRW		: 	"RW",
		scannerTypes	:	"",
		excludedDevices	:	"",
		excludedOS		:	"",
		values			:	["true", "false"]
	},
	{
		testName		:	"Testing setting and retrieving the code39fullAscii Property",
		propertyName	:	"code39fullAscii",
		propertyRW		: 	"RW",
		scannerTypes	:	"",
		excludedDevices	:	"",
		excludedOS		:	"",
		values			:	["true", "false"]
	},
	{
		testName		:	"Testing setting and retrieving the code39maxLength Property",
		propertyName	:	"code39maxLength",
		propertyRW		: 	"RW",
		scannerTypes	:	"",
		excludedDevices	:	"",
		excludedOS		:	"",
		values			:	["10", "35", "55"]
	},
	{
		testName		:	"Testing setting and retrieving the code39minLength Property",
		propertyName	:	"code39minLength",
		propertyRW		: 	"RW",
		scannerTypes	:	"",
		excludedDevices	:	"",
		excludedOS		:	"",
		values			:	["10", "35", "55"]
	},
	{
		testName		:	"Testing setting and retrieving the code39redundancy Property",
		propertyName	:	"code39redundancy",
		propertyRW		: 	"RW",
		scannerTypes	:	"",
		excludedDevices	:	"",
		excludedOS		:	"",
		values			:	["true", "false"]
	},
	{
		testName		:	"Testing setting and retrieving thecode39reportCheckDigit  Property",
		propertyName	:	"code39reportCheckDigit",
		propertyRW		: 	"RW",
		scannerTypes	:	"",
		excludedDevices	:	"",
		excludedOS		:	"",
		values			:	["true", "false"]
	},
	{
		testName		:	"Testing setting and retrieving the code39securityLevel Property",
		propertyName	:	"code39securityLevel",
		propertyRW		: 	"RW",
		scannerTypes	:	"",
		excludedDevices	:	"",
		excludedOS		:	"",
		values			:	["0", "1", "2", "3"]
	},
	{
		testName		:	"Testing setting and retrieving the code39verifyCheckDigit Property",
		propertyName	:	"code39verifyCheckDigit",
		propertyRW		: 	"RW",
		scannerTypes	:	"",
		excludedDevices	:	"",
		excludedOS		:	"",
		values			:	["true", "false"]
	},
	{
		testName		:	"Testing setting and retrieving the code93 Property",
		propertyName	:	"code93",
		propertyRW		: 	"RW",
		scannerTypes	:	"",
		excludedDevices	:	"",
		excludedOS		:	"",
		values			:	["true", "false"]
	},
	{
		testName		:	"Testing setting and retrieving the code93maxLength Property",
		propertyName	:	"code93maxLength",
		propertyRW		: 	"RW",
		scannerTypes	:	"",
		excludedDevices	:	"",
		excludedOS		:	"",
		values			:	["10", "35", "55"]
	},
	{
		testName		:	"Testing setting and retrieving the code93minLength Property",
		propertyName	:	"code93minLength",
		propertyRW		: 	"RW",
		scannerTypes	:	"",
		excludedDevices	:	"",
		excludedOS		:	"",
		values			:	["10", "35", "55"]
	},
	{
		testName		:	"Testing setting and retrieving the code93redundancy Property",
		propertyName	:	"code93redundancy",
		propertyRW		: 	"RW",
		scannerTypes	:	"",
		excludedDevices	:	"",
		excludedOS		:	"",
		values			:	["true", "false"]
	},
	{
		testName		:	"Testing setting and retrieving the d2of5 Property",
		propertyName	:	"d2of5",
		propertyRW		: 	"RW",
		scannerTypes	:	"",
		excludedDevices	:	"",
		excludedOS		:	"",
		values			:	["true", "false"]
	},
	{
		testName		:	"Testing setting and retrieving the d2of5maxLength Property",
		propertyName	:	"d2of5maxLength",
		propertyRW		: 	"RW",
		scannerTypes	:	"",
		excludedDevices	:	"",
		excludedOS		:	"",
		values			:	["10", "35", "55"]
	},
	{
		testName		:	"Testing setting and retrieving the d2of5minLength Property",
		propertyName	:	"d2of5minLength",
		propertyRW		: 	"RW",
		scannerTypes	:	"",
		excludedDevices	:	"",
		excludedOS		:	"",
		values			:	["10", "35", "55"]
	},
	{
		testName		:	"Testing setting and retrieving the d2of5redundancy Property",
		propertyName	:	"d2of5redundancy",
		propertyRW		: 	"RW",
		scannerTypes	:	"",
		excludedDevices	:	"",
		excludedOS		:	"",
		values			:	["true", "false"]
	},
	{
		testName		:	"Testing setting and retrieving the datamatrix Property",
		propertyName	:	"datamatrix",
		propertyRW		: 	"RW",
		scannerTypes	:	"Imager",
		excludedDevices	:	"",
		excludedOS		:	"",
		values			:	["true", "false"]
	},
	{
		testName		:	"Testing setting and retrieving the ean8 Property",
		propertyName	:	"ean8",
		propertyRW		: 	"RW",
		scannerTypes	:	"",
		excludedDevices	:	"",
		excludedOS		:	"",
		values			:	["true", "false"]
	},
	{
		testName		:	"Testing setting and retrieving the ean8convertToEan13 Property",
		propertyName	:	"ean8convertToEan13",
		propertyRW		: 	"RW",
		scannerTypes	:	"",
		excludedDevices	:	"",
		excludedOS		:	"Android",
		values			:	["true", "false"]
	},
	{
		testName		:	"Testing setting and retrieving the i2of5 Property",
		propertyName	:	"i2of5",
		propertyRW		: 	"RW",
		scannerTypes	:	"",
		excludedDevices	:	"",
		excludedOS		:	"",
		values			:	["true", "false"]
	},
	{
		testName		:	"Testing setting and retrieving the i2of5convertToEan13 Property",
		propertyName	:	"i2of5convertToEan13",
		propertyRW		: 	"RW",
		scannerTypes	:	"",
		excludedDevices	:	"",
		excludedOS		:	"",
		values			:	["true", "false"]
	},
	{
		testName		:	"Testing setting and retrieving the i2of5maxLength Property",
		propertyName	:	"i2of5maxLength",
		propertyRW		: 	"RW",
		scannerTypes	:	"",
		excludedDevices	:	"",
		excludedOS		:	"",
		values			:	["10", "35", "55"]
	},
	{
		testName		:	"Testing setting and retrieving the i2of5minLength Property",
		propertyName	:	"i2of5minLength",
		propertyRW		: 	"RW",
		scannerTypes	:	"",
		excludedDevices	:	"",
		excludedOS		:	"",
		values			:	["10", "35", "55"]
	},
	{
		testName		:	"Testing setting and retrieving the i2of5redundancy Property",
		propertyName	:	"i2of5redundancy",
		propertyRW		: 	"RW",
		scannerTypes	:	"",
		excludedDevices	:	"",
		excludedOS		:	"",
		values			:	["true", "false"]
	},
	{
		testName		:	"Testing setting and retrieving the i2of5reportCheckDigit Property",
		propertyName	:	"i2of5reportCheckDigit",
		propertyRW		: 	"RW",
		scannerTypes	:	"",
		excludedDevices	:	"",
		excludedOS		:	"",
		values			:	["true", "false"]
	},
	{
		testName		:	"Testing setting and retrieving the i2of5verifyCheckDigit Property",
		propertyName	:	"i2of5verifyCheckDigit",
		propertyRW		: 	"RW",
		scannerTypes	:	"",
		excludedDevices	:	"",
		excludedOS		:	"",
		values			:	["none", "uss", "opcc"]
	},
	{
		testName		:	"Testing setting and retrieving the korean3of5 Property",
		propertyName	:	"korean3of5",
		propertyRW		: 	"RW",
		scannerTypes	:	"",
		excludedDevices	:	"",
		excludedOS		:	"",
		values			:	["true", "false"]
	},
	{
		testName		:	"Testing setting and retrieving the korean3of5redundancy Property",
		propertyName	:	"korean3of5redundancy",
		propertyRW		: 	"RW",
		scannerTypes	:	"",
		excludedDevices	:	"",
		excludedOS		:	"Android",
		values			:	["true", "false"]
	},
	{
		testName		:	"Testing setting and retrieving the korean3of5maxLength Property",
		propertyName	:	"korean3of5maxLength",
		propertyRW		: 	"RW",
		scannerTypes	:	"",
		excludedDevices	:	"",
		excludedOS		:	"Android",
		values			:	["10", "35", "55"]
	},
	{
		testName		:	"Testing setting and retrieving the korean3of5minLength Property",
		propertyName	:	"korean3of5minLength",
		propertyRW		: 	"RW",
		scannerTypes	:	"",
		excludedDevices	:	"",
		excludedOS		:	"Android",
		values			:	["10", "35", "55"]
	},
	{
		testName		:	"Testing setting and retrieving the macroPdf Property",
		propertyName	:	"macroPdf",
		propertyRW		: 	"RW",
		scannerTypes	:	"Imager",
		excludedDevices	:	"",
		excludedOS		:	"",
		values			:	["true", "false"]
	},
	{
		testName		:	"Testing setting and retrieving the macroPdfBufferLabels Property",
		propertyName	:	"macroPdfBufferLabels",
		propertyRW		: 	"RW",
		scannerTypes	:	"Imager",
		excludedDevices	:	"",
		excludedOS		:	"",
		values			:	["true", "false"]
	},
	{
		testName		:	"Testing setting and retrieving the macroPdfConvertToPdf417 Property",
		propertyName	:	"macroPdfConvertToPdf417",
		propertyRW		: 	"RW",
		scannerTypes	:	"Imager",
		excludedDevices	:	"",
		excludedOS		:	"",
		values			:	["true", "false"]
	},
	{
		testName		:	"Testing setting and retrieving the macroPdfExclusive Property",
		propertyName	:	"macroPdfExclusive",
		propertyRW		: 	"RW",
		scannerTypes	:	"Imager",
		excludedDevices	:	"",
		excludedOS		:	"",
		values			:	["true", "false"]
	},
	{
		testName		:	"Testing setting and retrieving the macroMicroPdf Property",
		propertyName	:	"macroMicroPdf",
		propertyRW		: 	"RW",
		scannerTypes	:	"Imager",
		excludedDevices	:	"",
		excludedOS		:	"",
		values			:	["true", "false"]
	},
	{
		testName		:	"Testing setting and retrieving the macroMicroPdfBufferLabels Property",
		propertyName	:	"macroMicroPdfBufferLabels",
		propertyRW		: 	"RW",
		scannerTypes	:	"Imager",
		excludedDevices	:	"",
		excludedOS		:	"",
		values			:	["true", "false"]
	},
	{
		testName		:	"Testing setting and retrieving the macroMicroPdfConvertToMicroPdf Property",
		propertyName	:	"macroMicroPdfConvertToMicroPdf",
		propertyRW		: 	"RW",
		scannerTypes	:	"Imager",
		excludedDevices	:	"",
		excludedOS		:	"",
		values			:	["true", "false"]
	},
	{
		testName		:	"Testing setting and retrieving the macroMicroPdfExclusive Property",
		propertyName	:	"macroMicroPdfExclusive",
		propertyRW		: 	"RW",
		scannerTypes	:	"Imager",
		excludedDevices	:	"",
		excludedOS		:	"",
		values			:	["true", "false"]
	},
	{
		testName		:	"Testing setting and retrieving the macroMicroPdfReportAppendInfo Property",
		propertyName	:	"macroMicroPdfReportAppendInfo",
		propertyRW		: 	"RW",
		scannerTypes	:	"Imager",
		excludedDevices	:	"",
		excludedOS		:	"",
		values			:	["true", "false"]
	},
	{
		testName		:	"Testing setting and retrieving the matrix2of5 Property",
		propertyName	:	"matrix2of5",
		propertyRW		: 	"RW",
		scannerTypes	:	"",
		excludedDevices	:	"Motorola ES400|MC45",
		excludedOS		:	"",
		values			:	["true", "false"]
	},
	{
		testName		:	"Testing setting and retrieving the matrix2of5maxLength Property",
		propertyName	:	"matrix2of5maxLength",
		propertyRW		: 	"RW",
		scannerTypes	:	"",
		excludedDevices	:	"Motorola ES400|MC45",
		excludedOS		:	"",
		values			:	["10", "35", "55"]
	},
	{
		testName		:	"Testing setting and retrieving the matrix2of5minLength Property",
		propertyName	:	"matrix2of5minLength",
		propertyRW		: 	"RW",
		scannerTypes	:	"",
		excludedDevices	:	"Motorola ES400|MC45",
		excludedOS		:	"",
		values			:	["10", "35", "55"]
	},
	{
		testName		:	"Testing setting and retrieving the matrix2of5reportCheckDigit Property",
		propertyName	:	"matrix2of5reportCheckDigit",
		propertyRW		: 	"RW",
		scannerTypes	:	"",
		excludedDevices	:	"Motorola ES400|MC45",
		excludedOS		:	"",
		values			:	["true", "false"]
	},
	{
		testName		:	"Testing setting and retrieving the matrix2of5verifyCheckDigit Property",
		propertyName	:	"matrix2of5verifyCheckDigit",
		propertyRW		: 	"RW",
		scannerTypes	:	"",
		excludedDevices	:	"Motorola ES400|MC45",
		excludedOS		:	"",
		values			:	["true", "false"]
	},
	{
		testName		:	"Testing setting and retrieving the maxiCode Property",
		propertyName	:	"maxiCode",
		propertyRW		: 	"RW",
		scannerTypes	:	"Imager",
		excludedDevices	:	"",
		excludedOS		:	"",
		values			:	["true", "false"]
	},
	{
		testName		:	"Testing setting and retrieving the microPdf Property",
		propertyName	:	"microPdf",
		propertyRW		: 	"RW",
		scannerTypes	:	"Imager",
		excludedDevices	:	"",
		excludedOS		:	"",
		values			:	["true", "false"]
	},
	{
		testName		:	"Testing setting and retrieving the microQr Property",
		propertyName	:	"microQr",
		propertyRW		: 	"RW",
		scannerTypes	:	"Imager",
		excludedDevices	:	"",
		excludedOS		:	"",
		values			:	["true", "false"]
	},
	{
		testName		:	"Testing setting and retrieving the msi Property",
		propertyName	:	"msi",
		propertyRW		: 	"RW",
		scannerTypes	:	"",
		excludedDevices	:	"",
		excludedOS		:	"",
		values			:	["true", "false"]
	},
	{
		testName		:	"Testing setting and retrieving the msiCheckDigits Property",
		propertyName	:	"msiCheckDigits",
		propertyRW		: 	"RW",
		scannerTypes	:	"",
		excludedDevices	:	"",
		excludedOS		:	"",
		values			:	["one", "two"]
	},
	{
		testName		:	"Testing setting and retrieving themsiCheckDigitScheme  Property",
		propertyName	:	"msiCheckDigitScheme",
		propertyRW		: 	"RW",
		scannerTypes	:	"",
		excludedDevices	:	"",
		excludedOS		:	"",
		values			:	["mod11", "mod10"]
	},
	{
		testName		:	"Testing setting and retrieving the msiMaxLength Property",
		propertyName	:	"msiMaxLength",
		propertyRW		: 	"RW",
		scannerTypes	:	"",
		excludedDevices	:	"",
		excludedOS		:	"",
		values			:	["10", "35", "55"]
	},
	{
		testName		:	"Testing setting and retrieving the msiMinLength Property",
		propertyName	:	"msiMinLength",
		propertyRW		: 	"RW",
		scannerTypes	:	"",
		excludedDevices	:	"",
		excludedOS		:	"",
		values			:	["10", "35", "55"]
	},
	{
		testName		:	"Testing setting and retrieving the msiRedundancy Property",
		propertyName	:	"msiRedundancy",
		propertyRW		: 	"RW",
		scannerTypes	:	"",
		excludedDevices	:	"",
		excludedOS		:	"",
		values			:	["true", "false"]
	},
	{
		testName		:	"Testing setting and retrieving the msiReportCheckDigit Property",
		propertyName	:	"msiReportCheckDigit",
		propertyRW		: 	"RW",
		scannerTypes	:	"",
		excludedDevices	:	"",
		excludedOS		:	"",
		values			:	["true", "false"]
	},
	{
		testName		:	"Testing setting and retrieving the pdf417 Property",
		propertyName	:	"pdf417",
		propertyRW		: 	"RW",
		scannerTypes	:	"Imager",
		excludedDevices	:	"",
		excludedOS		:	"",
		values			:	["true", "false"]
	},
	{
		testName		:	"Testing setting and retrieving the signature Property",
		propertyName	:	"signature",
		propertyRW		: 	"RW",
		scannerTypes	:	"Imager",
		excludedDevices	:	"",
		excludedOS		:	"",
		values			:	["true", "false"]
	},
	{
		testName		:	"Testing setting and retrieving the signatureImageHeight Property",
		propertyName	:	"signatureImageHeight",
		propertyRW		: 	"RW",
		scannerTypes	:	"Imager",
		excludedDevices	:	"",
		excludedOS		:	"",
		values			:	["50", "100", "300"]
	},
	{
		testName		:	"Testing setting and retrieving the signatureImageWidth Property",
		propertyName	:	"signatureImageWidth",
		propertyRW		: 	"RW",
		scannerTypes	:	"Imager",
		excludedDevices	:	"",
		excludedOS		:	"",
		values			:	["100", "200", "400"]
	},
	{
		testName		:	"Testing setting and retrieving the signatureImageQuality Property",
		propertyName	:	"signatureImageQuality",
		propertyRW		: 	"RW",
		scannerTypes	:	"Imager",
		excludedDevices	:	"",
		excludedOS		:	"",
		values			:	["15", "50", "90"]
	},
	{
		testName		:	"Testing setting and retrieving the ausPostal Property",
		propertyName	:	"ausPostal",
		propertyRW		: 	"RW",
		scannerTypes	:	"",
		excludedDevices	:	"MC45|Motorola MC92N0G",
		excludedOS		:	"",
		values			:	["true", "false"]
	},
	{
		testName		:	"Testing setting and retrieving the canPostal Property",
		propertyName	:	"canPostal",
		propertyRW		: 	"RW",
		scannerTypes	:	"",
		excludedDevices	:	"MC45|Motorola MC92N0G",
		excludedOS		:	"",
		values			:	["true", "false"]
	},
	{
		testName		:	"Testing setting and retrieving the dutchPostal Property",
		propertyName	:	"dutchPostal",
		propertyRW		: 	"RW",
		scannerTypes	:	"",
		excludedDevices	:	"MC45|Motorola MC92N0G",
		excludedOS		:	"",
		values			:	["true", "false"]
	},
	{
		testName		:	"Testing setting and retrieving the japPostal Property",
		propertyName	:	"japPostal",
		propertyRW		: 	"RW",
		scannerTypes	:	"",
		excludedDevices	:	"MC45|Motorola MC92N0G",
		excludedOS		:	"",
		values			:	["true", "false"]
	},
	{
		testName		:	"Testing setting and retrieving the ukPostal Property",
		propertyName	:	"ukPostal",
		propertyRW		: 	"RW",
		scannerTypes	:	"",
		excludedDevices	:	"MC45|Motorola MC92N0G",
		excludedOS		:	"",
		values			:	["true", "false"]
	},
	{
		testName		:	"Testing setting and retrieving the ukPostalReportCheckDigit Property",
		propertyName	:	"ukPostalReportCheckDigit",
		propertyRW		: 	"RW",
		scannerTypes	:	"",
		excludedDevices	:	"",
		excludedOS		:	"windows",
		values			:	["true", "false"]
	},
	{
		testName		:	"Testing setting and retrieving the us4state Property",
		propertyName	:	"us4state",
		propertyRW		: 	"RW",
		scannerTypes	:	"",
		excludedDevices	:	"MC45|Motorola MC92N0G",
		excludedOS		:	"",
		values			:	["true", "false"]
	},
	{
		testName		:	"Testing setting and retrieving the us4stateFics Property",
		propertyName	:	"us4stateFics",
		propertyRW		: 	"RW",
		scannerTypes	:	"",
		excludedDevices	:	"MC45|Motorola MC92N0G",
		excludedOS		:	"",
		excludedOS		:	"",
		values			:	["true", "false"]
	},
	{
		testName		:	"Testing setting and retrieving the usPlanet Property",
		propertyName	:	"usPlanet",
		propertyRW		: 	"RW",
		scannerTypes	:	"",
		excludedDevices	:	"MC45|Motorola MC92N0G",
		excludedOS		:	"",
		values			:	["true", "false"]
	},
/*	{ //Not supported in GingerBread
		testName		:	"Testing setting and retrieving the usPlanetReportCheckDigit Property",
		propertyName	:	"usPlanetReportCheckDigit",
		propertyRW		: 	"RW",
		scannerTypes	:	"",
		excludedDevices	:	"",
		excludedOS		:	"windows",
		values			:	["true", "false"]
	},*/
	{
		testName		:	"Testing setting and retrieving the usPostNet Property",
		propertyName	:	"usPostNet",
		propertyRW		: 	"RW",
		scannerTypes	:	"",
		excludedDevices	:	"MC45|Motorola MC92N0G",
		excludedOS		:	"",
		values			:	["true", "false"]
	},
/*	{ //Not supported in GingerBread
		testName		:	"Testing setting and retrieving the usPostNetReportCheckDigit Property",
		propertyName	:	"usPostNetReportCheckDigit",
		propertyRW		: 	"RW",
		scannerTypes	:	"",
		excludedDevices	:	"",
		excludedOS		:	"windows",
		values			:	["true", "false"]
	},*/
	{
		testName		:	"Testing setting and retrieving the qrCode Property",
		propertyName	:	"qrCode",
		propertyRW		: 	"RW",
		scannerTypes	:	"Imager",
		excludedDevices	:	"",
		excludedOS		:	"",
		values			:	["true", "false"]
	},
	{
		testName		:	"Testing setting and retrieving the gs1dataBar Property",
		propertyName	:	"gs1dataBar",
		propertyRW		: 	"RW",
		scannerTypes	:	"",
		excludedDevices	:	"",
		excludedOS		:	"",
		values			:	["true", "false"]
	},
	{
		testName		:	"Testing setting and retrieving the gs1dataBarExpanded Property",
		propertyName	:	"gs1dataBarExpanded",
		propertyRW		: 	"RW",
		scannerTypes	:	"",
		excludedDevices	:	"",
		excludedOS		:	"",
		values			:	["true", "false"]
	},
	{
		testName		:	"Testing setting and retrieving the gs1dataBarLimited Property",
		propertyName	:	"gs1dataBarLimited",
		propertyRW		: 	"RW",
		scannerTypes	:	"",
		excludedDevices	:	"",
		excludedOS		:	"",
		values			:	["true", "false"]
	},
	{
		testName		:	"Testing setting and retrieving the tlc39 Property",
		propertyName	:	"tlc39",
		propertyRW		: 	"RW",
		scannerTypes	:	"",
		excludedDevices	:	"",
		excludedOS		:	"",
		values			:	["true", "false"]
	},
	{
		testName		:	"Testing setting and retrieving the upcEanBookland Property",
		propertyName	:	"upcEanBookland",
		propertyRW		: 	"RW",
		scannerTypes	:	"",
		excludedDevices	:	"",
		excludedOS		:	"",
		values			:	["true", "false"]
	},
	{
		testName		:	"Testing setting and retrieving the upcEanBooklandFormat Property",
		propertyName	:	"upcEanBooklandFormat",
		propertyRW		: 	"RW",
		scannerTypes	:	"",
		excludedDevices	:	"",
		excludedOS		:	"Android",
		values			:	["Isbn10", "Isbn13"]
	},
	{
		testName		:	"Testing setting and retrieving the upcEanConvertGs1dataBarToUpcEan Property",
		propertyName	:	"upcEanConvertGs1dataBarToUpcEan",
		propertyRW		: 	"RW",
		scannerTypes	:	"",
		excludedDevices	:	"",
		excludedOS		:	"",
		values			:	["true", "false"]
	},
	{
		testName		:	"Testing setting and retrieving the upcEanCoupon Property",
		propertyName	:	"upcEanCoupon",
		propertyRW		: 	"RW",
		scannerTypes	:	"",
		excludedDevices	:	"",
		excludedOS		:	"",
		values			:	["true", "false"]
	},
	{
		testName		:	"Testing setting and retrieving the upcEanLinearDecode Property",
		propertyName	:	"upcEanLinearDecode",
		propertyRW		: 	"RW",
		scannerTypes	:	"",
		excludedDevices	:	"",
		excludedOS		:	"Android",
		values			:	["true", "false"]
	},
	{
		testName		:	"Testing setting and retrieving the upcEanRandomWeightCheckDigit Property",
		propertyName	:	"upcEanRandomWeightCheckDigit",
		propertyRW		: 	"RW",
		scannerTypes	:	"",
		excludedDevices	:	"",
		excludedOS		:	"Android",
		values			:	["true", "false"]
	},
	{
		testName		:	"Testing setting and retrieving the upcEanRetryCount Property",
		propertyName	:	"upcEanRetryCount",
		propertyRW		: 	"RW",
		scannerTypes	:	"",
		excludedDevices	:	"",
		excludedOS		:	"",
		values			:	["2", "10", "20"]
	},
	{
		testName		:	"Testing setting and retrieving the upcEanSecurityLevel Property",
		propertyName	:	"upcEanSecurityLevel",
		propertyRW		: 	"RW",
		scannerTypes	:	"",
		excludedDevices	:	"",
		excludedOS		:	"",
		values			:	["0", "1", "2", "3"]
	},
	{
		testName		:	"Testing setting and retrieving the upcEanSupplemental2 Property",
		propertyName	:	"upcEanSupplemental2",
		propertyRW		: 	"RW",
		scannerTypes	:	"",
		excludedDevices	:	"",
		excludedOS		:	"",
		values			:	["true", "false"]
	},
	{
		testName		:	"Testing setting and retrieving the upcEanSupplemental5 Property",
		propertyName	:	"upcEanSupplemental5",
		propertyRW		: 	"RW",
		scannerTypes	:	"",
		excludedDevices	:	"",
		excludedOS		:	"",
		values			:	["true", "false"]
	},
	{
		testName		:	"Testing setting and retrieving the upcEanSupplementalMode Property",
		propertyName	:	"upcEanSupplementalMode",
		propertyRW		: 	"RW",
		scannerTypes	:	"",
		excludedDevices	:	"",
		excludedOS		:	"",
		values			:	["none", "auto", "always", "smart", "378or379", "978or979", "414or419or434or439"]
	},
	{
		testName		:	"Testing setting and retrieving the upca Property",
		propertyName	:	"upca",
		propertyRW		: 	"RW",
		scannerTypes	:	"",
		excludedDevices	:	"",
		excludedOS		:	"",
		values			:	["true", "false"]
	},
	{
		testName		:	"Testing setting and retrieving the upcaPreamble Property",
		propertyName	:	"upcaPreamble",
		propertyRW		: 	"RW",
		scannerTypes	:	"",
		excludedDevices	:	"",
		excludedOS		:	"",
		values			:	["none", "systemChar", "countryAndSystemChars"]
	},
	{
		testName		:	"Testing setting and retrieving the upcaReportCheckDigit Property",
		propertyName	:	"upcaReportCheckDigit",
		propertyRW		: 	"RW",
		scannerTypes	:	"",
		excludedDevices	:	"",
		excludedOS		:	"",
		values			:	["true", "false"]
	},
	{
		testName		:	"Testing setting and retrieving the upce0 Property",
		propertyName	:	"upce0",
		propertyRW		: 	"RW",
		scannerTypes	:	"",
		excludedDevices	:	"",
		excludedOS		:	"",
		values			:	["true", "false"]
	},
	{
		testName		:	"Testing setting and retrieving the upce0convertToUpca Property",
		propertyName	:	"upce0convertToUpca",
		propertyRW		: 	"RW",
		scannerTypes	:	"",
		excludedDevices	:	"",
		excludedOS		:	"",
		values			:	["true", "false"]
	},
	{
		testName		:	"Testing setting and retrieving the upce0preamble Property",
		propertyName	:	"upce0preamble",
		propertyRW		: 	"RW",
		scannerTypes	:	"",
		excludedDevices	:	"",
		excludedOS		:	"",
		values			:	["none", "systemChar", "countryAndSystemChars"]
	},
	{
		testName		:	"Testing setting and retrieving the upce0reportCheckDigit Property",
		propertyName	:	"upce0reportCheckDigit",
		propertyRW		: 	"RW",
		scannerTypes	:	"",
		excludedDevices	:	"",
		excludedOS		:	"",
		values			:	["true", "false"]
	},
	{
		testName		:	"Testing setting and retrieving the upce1 Property",
		propertyName	:	"upce1",
		propertyRW		: 	"RW",
		scannerTypes	:	"",
		excludedDevices	:	"",
		excludedOS		:	"",
		values			:	["true", "false"]
	},
	{
		testName		:	"Testing setting and retrieving the upce1convertToUpca Property",
		propertyName	:	"upce1convertToUpca",
		propertyRW		: 	"RW",
		scannerTypes	:	"",
		excludedDevices	:	"",
		excludedOS		:	"",
		values			:	["true", "false"]
	},
	{
		testName		:	"Testing setting and retrieving the upce1preamble Property",
		propertyName	:	"upce1preamble",
		propertyRW		: 	"RW",
		scannerTypes	:	"",
		excludedDevices	:	"",
		excludedOS		:	"",
		values			:	["none", "systemChar", "countryAndSystemChars"]
	},
	{
		testName		:	"Testing setting and retrieving the upce1reportCheckDigit Property",
		propertyName	:	"upce1reportCheckDigit",
		propertyRW		: 	"RW",
		scannerTypes	:	"",
		excludedDevices	:	"",
		excludedOS		:	"",
		values			:	["true", "false"]
	},
	{
		testName		:	"Testing setting and retrieving the webcode Property",
		propertyName	:	"webcode",
		propertyRW		: 	"RW",
		scannerTypes	:	"",
		excludedDevices	:	"MC45|Motorola MC92N0G",
		excludedOS		:	"",
		values			:	["true", "false"]
	},
	{
		testName		:	"Testing setting and retrieving the webcodeDecodeGtSubtype Property",
		propertyName	:	"webcodeDecodeGtSubtype",
		propertyRW		: 	"RW",
		scannerTypes	:	"",
		excludedDevices	:	"MC45|Motorola MC92N0G",
		excludedOS		:	"",
		values			:	["true", "false"]
	},
];

function setBarcodeProperty(propertyName, propertyValue)
{
	$.get('/app/BarcodeTest/setBarcodeProperty', {name:propertyName, value:propertyValue});
}

function setBarcodePropertySync(propertyName, propertyValue)
{
	jQuery.ajax({
         url:    '/app/BarcodeTest/setBarcodeProperty',
		 data: {name:propertyName, value:propertyValue},
         async:   false
    });  
}

function getBarcodeProperty(propertyName)
{
	var returnedValue = "umbrella";	//  Function is asynchronous so this should not be returned
	$.get('/app/BarcodeTest/getBarcodeProperty', {name:propertyName})
		.always(function(data) 
			{
				document.getElementById('retProp').innerHTML = data;
				
			});
	return returnedValue;
}

function getBarcodePropertySync(propertyName)
{
	var returnedValue = "umbrella";	//  Function is asynchronous so this should not be returned
	jQuery.ajax({
         url:    '/app/BarcodeTest/getBarcodeProperty',
		 data: {name:propertyName},
         success: function(result) 	{
					returnedValue = result;
                  },
         async:   false
    });  
	return returnedValue;
}

function getScannerType()
{
	var returnedValue = "socks";
	jQuery.ajax({
         url:    '/app/BarcodeTest/getBarcodeProperty',
		 data: {name:"scannerType"},
         success: function(result) 	{
					returnedValue = result;
                  },
         async:   false
    });  
	return returnedValue;
}

function getScannerNumber()
{
	var returnedValue = 0;
	jQuery.ajax({
         url:    '/app/BarcodeTest/getScannerNumber',
         success: function(result) 	{
					returnedValue = result;
                  },
         async:   false
    });  
	return returnedValue;
}

//function barcodeEnable()
//{
//	$.get('/app/BarcodeTest/callBarcodeMethod', {method:'enable', dccParams:{}});
//}

function barcodeEnable()
{
		jQuery.ajax({
         url:    '/app/BarcodeTest/callBarcodeMethod',
		 data:	{method:'enable', dccParams:{}},
         success: function(result) 	{
					returnedValue = result;
                  },
         async:   false
    });  
}

function barcodeDisable()
{
		jQuery.ajax({
         url:    '/app/BarcodeTest/callBarcodeMethod',
		 data:	{method:'disable', dccParams:{}},
         success: function(result) 	{
					returnedValue = result;
                  },
         async:   false
    });  
}

function setDefaultScanner(id)
{
	var selectedScanner = "SCN" + (id + 1);
		jQuery.ajax({
         url:    '/app/BarcodeTest/setDefaultScanner',
		 data:	{specifiedScanner:selectedScanner},
         success: function(result) 	{
					returnedValue = result;
                  },
         async:   false
    });  	
}