var rsm_get_property_unknown_return = [

/*
{
	testName		:	"VT400-1001 | Get rsmModelNumber | ",
	propertyName	:	"rsmModelNumber",
	scannerTypes	:	"RSM Bluetooth",
	OSTypes			:	"WINDOWS",
	propertyValue	:	"Readonly",
	expectedResult	:	"Unknown"
},
{
	testName		:	"VT400-1002 | Get rsmSerialNumber | ",
	propertyName	:	"rsmSerialNumber",
	scannerTypes	:	"RSM Bluetooth",
	OSTypes			:	"WINDOWS",
	propertyValue	:	"Readonly",
	expectedResult	:	"Unknown"
},
{
	testName		:	"VT400-1003 | Get rsmDateOfManufacture | ",
	propertyName	:	"rsmDateOfManufacture",
	scannerTypes	:	"RSM Bluetooth",
	OSTypes			:	"WINDOWS",
	propertyValue	:	"Readonly",
	expectedResult	:	"Unknown"
},
{
	testName		:	"VT400-1004 | Get rsmDateOfService | ",
	propertyName	:	"rsmDateOfService",
	scannerTypes	:	"RSM Bluetooth",
	OSTypes			:	"WINDOWS",
	propertyValue	:	"Readonly",
	expectedResult	:	"Unknown"
},
{
	testName		:	"VT400-1005 | Get rsmBluetoothAddress | ",
	propertyName	:	"rsmBluetoothAddress",
	scannerTypes	:	"RSM Bluetooth",
	OSTypes			:	"WINDOWS",
	propertyValue	:	"Readonly",
	expectedResult	:	"Unknown"
},
{
	testName		:	"VT400-1006 | Get rsmFirmwareVersion | ",
	propertyName	:	"rsmFirmwareVersion",
	scannerTypes	:	"RSM Bluetooth",
	OSTypes			:	"WINDOWS",
	propertyValue	:	"Readonly",
	expectedResult	:	"Unknown"
},
{
	testName		:	"VT400-1007 | Get rsmDeviceClass | ",
	propertyName	:	"rsmDeviceClass",
	scannerTypes	:	"RSM Bluetooth",
	OSTypes			:	"WINDOWS",
	propertyValue	:	"Readonly",
	expectedResult	:	"Unknown"
},
{
	testName		:	"VT400-1008 | Get rsmBatteryStatus | ",
	propertyName	:	"rsmBatteryStatus",
	scannerTypes	:	"RSM Bluetooth",
	OSTypes			:	"WINDOWS",
	propertyValue	:	"Readonly",
	expectedResult	:	"Unknown"
},
{
	testName		:	"VT400-1009 | Set rsmBatteryCapacity | ",
	propertyName	:	"rsmBatteryCapacity",
	scannerTypes	:	"RSM Bluetooth",
	OSTypes			:	"WINDOWS",
	propertyValue	:	"Readonly",
	expectedResult	:	"Unknown"
},
*/
{
	testName		:	"VT200-0418 | Get rsmBatteryId | ",
	propertyName	:	"rsmBatteryId",
	scannerTypes	:	"RSM Bluetooth",
	OSTypes			:	"WINDOWS",
	propertyValue	:	"Readonly",
	expectedResult	:	"Unknown"
}
];
var rsm_set_get_property = [
{
	testName		:	"VT400-1011 | Set rsmBluetoothAuthentication:true | true",
	propertyName	:	"rsmBluetoothAuthentication",
	scannerTypes	:	"RSM Bluetooth",
	OSTypes			:	"WINDOWS",
	propertyValue	:	"true",
	expectedResult	:	"true"
},
{
	testName		:	"VT400-1012 | Set rsmBluetoothAuthentication:false | false",
	propertyName	:	"rsmBluetoothAuthentication",
	scannerTypes	:	"RSM Bluetooth",
	OSTypes			:	"WINDOWS",
	propertyValue	:	"false",
	expectedResult	:	"false"
},
{
	testName		:	"VT400-1013 | Set rsmBluetoothEncryption:true | true",
	propertyName	:	"rsmBluetoothEncryption",
	scannerTypes	:	"RSM Bluetooth",
	OSTypes			:	"WINDOWS",
	propertyValue	:	"true",
	expectedResult	:	"true"
},
{
	testName		:	"VT400-1014 | Set rsmBluetoothEncryption:false | false",
	propertyName	:	"rsmBluetoothEncryption",
	scannerTypes	:	"RSM Bluetooth",
	OSTypes			:	"WINDOWS",
	propertyValue	:	"false",
	expectedResult	:	"false"
},
{
	testName		:	"VT400-1015 | Set rsmBluetoothPinCode:12345 | 12345",
	propertyName	:	"rsmBluetoothPinCode",
	scannerTypes	:	"RSM Bluetooth",
	OSTypes			:	"WINDOWS",
	propertyValue	:	"12345",
	expectedResult	:	"12345"
},
{
	testName		:	"VT400-1016 | Set rsmBluetoothPinCode:ab1 | ab1",
	propertyName	:	"rsmBluetoothPinCode",
	scannerTypes	:	"RSM Bluetooth",
	OSTypes			:	"WINDOWS",
	propertyValue	:	"ab1",
	expectedResult	:	"ab1"
},
{
	testName		:	"VT400-1017 | Set rsmBluetoothPinCodeType:UseStored | UseStored",
	propertyName	:	"rsmBluetoothPinCodeType",
	scannerTypes	:	"RSM Bluetooth",
	OSTypes			:	"WINDOWS",
	propertyValue	:	"useStored",
	expectedResult	:	"useStored"
},
{
	testName		:	"VT400-1019 | Set  rsmBluetoothPinCodeType:PromptUser| PromptUser",
	propertyName	:	"rsmBluetoothPinCodeType",
	scannerTypes	:	"RSM Bluetooth",
	OSTypes			:	"WINDOWS",
	propertyValue	:	"promptUser",
	expectedResult	:	"promptUser"
},
{
	testName		:	"VT400-1021 | Set rsmBluetoothReconnectionAttempts: 30| 30",
	propertyName	:	"rsmBluetoothReconnectionAttempts",
	scannerTypes	:	"RSM Bluetooth",
	OSTypes			:	"WINDOWS",
	propertyValue	:	"30",
	expectedResult	:	"30"
},
{
	testName		:	"VT400-1022 | Set rsmBluetoothReconnectionAttempts: 45| 45",
	propertyName	:	"rsmBluetoothReconnectionAttempts",
	scannerTypes	:	"RSM Bluetooth",
	OSTypes			:	"WINDOWS",
	propertyValue	:	"45",
	expectedResult	:	"45"
},
{
	testName		:	"VT400-1023 | Set rsmBluetoothReconnectionAttempts: 60| 60",
	propertyName	:	"rsmBluetoothReconnectionAttempts",
	scannerTypes	:	"RSM Bluetooth",
	OSTypes			:	"WINDOWS",
	propertyValue	:	"60",
	expectedResult	:	"60"
},
{
	testName		:	"VT400-1024 | Set rsmBluetoothBeepOnReconnectAttempt: true | true",
	propertyName	:	"rsmBluetoothBeepOnReconnectAttempt",
	scannerTypes	:	"RSM Bluetooth",
	OSTypes			:	"WINDOWS",
	propertyValue	:	"true",
	expectedResult	:	"true"
},
{
	testName		:	"VT400-1025 | Set rsmBluetoothBeepOnReconnectAttempt: false | false",
	propertyName	:	"rsmBluetoothBeepOnReconnectAttempt",
	scannerTypes	:	"RSM Bluetooth",
	OSTypes			:	"WINDOWS",
	propertyValue	:	"false",
	expectedResult	:	"false"
},
{
	testName		:	"VT400-1026 | Set rsmBluetoothHidAutoReconnect:NeverReconnect | NeverReconnect",
	propertyName	:	"rsmBluetoothHidAutoReconnect",
	scannerTypes	:	"RSM Bluetooth",
	OSTypes			:	"WINDOWS",
	propertyValue	:	"neverReconnect",
	expectedResult	:	"neverReconnect"
},
{
	testName		:	"VT400-1027 | Set rsmBluetoothHidAutoReconnect:ReconnectOnData | ReconnectOnData",
	propertyName	:	"rsmBluetoothHidAutoReconnect",
	scannerTypes	:	"RSM Bluetooth",
	OSTypes			:	"WINDOWS",
	propertyValue	:	"reconnectOnData",
	expectedResult	:	"reconnectOnData"
},
{
	testName		:	"VT400-1028 | Set rsmBluetoothHidAutoReconnect:ReconnectImmediately | ReconnectImmediately",
	propertyName	:	"rsmBluetoothHidAutoReconnect",
	scannerTypes	:	"RSM Bluetooth",
	OSTypes			:	"WINDOWS",
	propertyValue	:	"reconnectImmediately",
	expectedResult	:	"reconnectImmediately"
},
{
	testName		:	"VT400-1029 | Set rsmBluetoothFriendlyName:MyBTScanner | MyBTScanner",
	propertyName	:	"rsmBluetoothFriendlyName",
	scannerTypes	:	"RSM Bluetooth",
	OSTypes			:	"WINDOWS",
	propertyValue	:	"MyBTScanner",
	expectedResult	:	"MyBTScanner"
},
{
	testName		:	"VT400-1030 | Set rsmBluetoothInquiryMode:General | General",
	propertyName	:	"rsmBluetoothInquiryMode",
	scannerTypes	:	"RSM Bluetooth",
	OSTypes			:	"WINDOWS",
	propertyValue	:	"general",
	expectedResult	:	"general"
},
{
	testName		:	"VT400-1031 | Set rsmBluetoothInquiryMode:Limited | Limited",
	propertyName	:	"rsmBluetoothInquiryMode",
	scannerTypes	:	"RSM Bluetooth",
	OSTypes			:	"WINDOWS",
	propertyValue	:	"limited",
	expectedResult	:	"limited"
},
{
	testName		:	"VT400-1032 | Set rsmBluetoothAutoReconnect: none| none",
	propertyName	:	"rsmBluetoothAutoReconnect",
	scannerTypes	:	"RSM Bluetooth",
	OSTypes			:	"WINDOWS",
	propertyValue	:	"none",
	expectedResult	:	"none"
},
{
	testName		:	"VT400-1033 | Set rsmBluetoothAutoReconnect: onPower| onPower",
	propertyName	:	"rsmBluetoothAutoReconnect",
	scannerTypes	:	"RSM Bluetooth",
	OSTypes			:	"WINDOWS",
	propertyValue	:	"onPower",
	expectedResult	:	"onPower"
},
{
	testName		:	"VT400-1034 | Set rsmBluetoothAutoReconnect: onOutOfRange| onOutOfRange",
	propertyName	:	"rsmBluetoothAutoReconnect",
	scannerTypes	:	"RSM Bluetooth",
	OSTypes			:	"WINDOWS",
	propertyValue	:	"onOutOfRange",
	expectedResult	:	"onOutOfRange"
},
{
	testName		:	"VT400-1035 | Set rsmBluetoothAutoReconnect: onPowerOutOfRange| onPowerOutOfRange",
	propertyName	:	"rsmBluetoothAutoReconnect",
	scannerTypes	:	"RSM Bluetooth",
	OSTypes			:	"WINDOWS",
	propertyValue	:	"onPowerOutOfRange",
	expectedResult	:	"onPowerOutOfRange"
},
{
	testName		:	"VT400-1036 | Set rsmForceSavePairingBarcode: true | true",
	propertyName	:	"rsmForceSavePairingBarcode",
	scannerTypes	:	"RSM Bluetooth",
	OSTypes			:	"WINDOWS",
	propertyValue	:	"true",
	expectedResult	:	"true"
},
{
	testName		:	"VT400-1037 | Set rsmForceSavePairingBarcode: false | false",
	propertyName	:	"rsmForceSavePairingBarcode",
	scannerTypes	:	"RSM Bluetooth",
	OSTypes			:	"WINDOWS",
	propertyValue	:	"false",
	expectedResult	:	"false"
},
{
	testName		:	"VT400-1038 | Set rsmLowBatteryIndication: true | true",
	propertyName	:	"rsmLowBatteryIndication",
	scannerTypes	:	"RSM Bluetooth",
	OSTypes			:	"WINDOWS",
	propertyValue	:	"true",
	expectedResult	:	"true"
},
{
	testName		:	"VT400-1039 | Set rsmLowBatteryIndication : false | false",
	propertyName	:	"rsmLowBatteryIndication",
	scannerTypes	:	"RSM Bluetooth",
	OSTypes			:	"WINDOWS",
	propertyValue	:	"false",
	expectedResult	:	"false"
},
{
	testName		:	"VT400-1040 | Set rsmLowBatteryIndicationCycle: 15| 15",
	propertyName	:	"rsmLowBatteryIndicationCycle",
	scannerTypes	:	"RSM Bluetooth",
	OSTypes			:	"WINDOWS",
	propertyValue	:	"15",
	expectedResult	:	"15"
},
{
	testName		:	"VT400-1041 | Set rsmLowBatteryIndicationCycle: 30| 30",
	propertyName	:	"rsmLowBatteryIndicationCycle",
	scannerTypes	:	"RSM Bluetooth",
	OSTypes			:	"WINDOWS",
	propertyValue	:	"30",
	expectedResult	:	"30"
},
{
	testName		:	"VT400-1042 | Set rsmLowBatteryIndicationCycle: 60| 60",
	propertyName	:	"rsmLowBatteryIndicationCycle",
	scannerTypes	:	"RSM Bluetooth",
	OSTypes			:	"WINDOWS",
	propertyValue	:	"60",
	expectedResult	:	"60"
},
{
	testName		:	"VT400-1043 | Set rsmLowBatteryIndicationCycle: 90| 90",
	propertyName	:	"rsmLowBatteryIndicationCycle",
	scannerTypes	:	"RSM Bluetooth",
	OSTypes			:	"WINDOWS",
	propertyValue	:	"90",
	expectedResult	:	"90"
},
{
	testName		:	"VT400-1044 | Set rsmLowBatteryIndicationCycle: 120| 120",
	propertyName	:	"rsmLowBatteryIndicationCycle",
	scannerTypes	:	"RSM Bluetooth",
	OSTypes			:	"WINDOWS",
	propertyValue	:	"120",
	expectedResult	:	"120"
},
{
	testName		:	"VT400-1045 | Set rsmScanLineWidth: Wide| Wide",
	propertyName	:	"rsmScanLineWidth",
	scannerTypes	:	"RSM Bluetooth",
	OSTypes			:	"WINDOWS",
	propertyValue	:	"wide",
	expectedResult	:	"wide"
},
{
	testName		:	"VT400-1046 | Set rsmScanLineWidth: Narrow| Narrow",
	propertyName	:	"rsmScanLineWidth",
	scannerTypes	:	"RSM Bluetooth",
	OSTypes			:	"WINDOWS",
	propertyValue	:	"narrow",
	expectedResult	:	"narrow"
},
{
	testName		:	"VT400-1047 | Set rsmGoodScansDelay: 0 | 0",
	propertyName	:	"rsmGoodScansDelay",
	scannerTypes	:	"RSM Bluetooth",
	OSTypes			:	"WINDOWS",
	propertyValue	:	"0",
	expectedResult	:	"0"
},
{
	testName		:	"VT400-1048 | Set rsmGoodScansDelay: 1500 | 1500",
	propertyName	:	"rsmGoodScansDelay",
	scannerTypes	:	"RSM Bluetooth",
	OSTypes			:	"WINDOWS",
	propertyValue	:	"1500",
	expectedResult	:	"1500"
},
{
	testName		:	"VT400-1049 | Set rsmDecodeFeedback: true | true",
	propertyName	:	"rsmDecodeFeedback",
	scannerTypes	:	"RSM Bluetooth",
	OSTypes			:	"WINDOWS",
	propertyValue	:	"true",
	expectedResult	:	"true"
},
{
	testName		:	"VT400-1050 | Set rsmDecodeFeedback: false | false",
	propertyName	:	"rsmDecodeFeedback",
	scannerTypes	:	"RSM Bluetooth",
	OSTypes			:	"WINDOWS",
	propertyValue	:	"false",
	expectedResult	:	"false"
},
{
	testName		:	"VT400-1051 | Set rsmIgnoreCode128Usps :true | true",
	propertyName	:	"rsmIgnoreCode128Usps",
	scannerTypes	:	"RSM Bluetooth",
	OSTypes			:	"WINDOWS",
	propertyValue	:	"true",
	expectedResult	:	"true"
},
{
	testName		:	"VT400-1052 | Set rsmIgnoreCode128Usps :false | false",
	propertyName	:	"rsmIgnoreCode128Usps",
	scannerTypes	:	"RSM Bluetooth",
	OSTypes			:	"WINDOWS",
	propertyValue	:	"false",
	expectedResult	:	"false"
},
{
	testName		:	"VT400-1053 | Set rsmScanTriggerWakeup :true | true",
	propertyName	:	"rsmScanTriggerWakeup",
	scannerTypes	:	"RSM Bluetooth",
	OSTypes			:	"WINDOWS",
	propertyValue	:	"true",
	expectedResult	:	"true"
},
{
	testName		:	"VT400-1054 | Set rsmScanTriggerWakeup :false | false",
	propertyName	:	"rsmScanTriggerWakeup",
	scannerTypes	:	"RSM Bluetooth",
	OSTypes			:	"WINDOWS",
	propertyValue	:	"false",
	expectedResult	:	"false"
},
{
	testName		:	"VT400-1055 | Set rsmScanTriggerWakeup :true | true",
	propertyName	:	"rsmScanTriggerWakeup",
	scannerTypes	:	"RSM Bluetooth",
	OSTypes			:	"WINDOWS",
	propertyValue	:	"true",
	expectedResult	:	"true"
},
{
	testName		:	"VT400-1056 | Set rsmScanTriggerWakeup :false | false",
	propertyName	:	"rsmScanTriggerWakeup",
	scannerTypes	:	"RSM Bluetooth",
	OSTypes			:	"WINDOWS",
	propertyValue	:	"false",
	expectedResult	:	"false"
},
{
	testName		:	"VT400-1057 | Set rsmMems :true | true",
	propertyName	:	"rsmMems",
	scannerTypes	:	"RSM Bluetooth",
	OSTypes			:	"WINDOWS",
	propertyValue	:	"true",
	expectedResult	:	"true"
},
{
	testName		:	"VT400-1058 | Set rsmMems :false | false",
	propertyName	:	"rsmMems",
	scannerTypes	:	"RSM Bluetooth",
	OSTypes			:	"WINDOWS",
	propertyValue	:	"false",
	expectedResult	:	"false"
},
{
	testName		:	"VT400-1059 | Set rsmProximityEnable :true | true",
	propertyName	:	"rsmProximityEnable",
	scannerTypes	:	"RSM Bluetooth",
	OSTypes			:	"WINDOWS",
	propertyValue	:	"true",
	expectedResult	:	"true"
},
{
	testName		:	"VT400-1060 | Set rsmProximityEnable :false | false",
	propertyName	:	"rsmProximityEnable",
	scannerTypes	:	"RSM Bluetooth",
	OSTypes			:	"WINDOWS",
	propertyValue	:	"false",
	expectedResult	:	"false"
},
{
	testName		:	"VT400-1061 | Set rsmProximityContinuous:true | true",
	propertyName	:	"rsmProximityContinuous",
	scannerTypes	:	"RSM Bluetooth",
	OSTypes			:	"WINDOWS",
	propertyValue	:	"true",
	expectedResult	:	"true"
},
{
	testName		:	"VT400-1062 | Set rsmProximityContinuous: false | false",
	propertyName	:	"rsmProximityContinuous",
	scannerTypes	:	"RSM Bluetooth",
	OSTypes			:	"WINDOWS",
	propertyValue	:	"false",
	expectedResult	:	"false"
},
{
	testName		:	"VT400-1063 | Set rsmProximityDistance: Short| Short",
	propertyName	:	"rsmProximityDistance",
	scannerTypes	:	"RSM Bluetooth",
	OSTypes			:	"WINDOWS",
	propertyValue	:	"short",
	expectedResult	:	"short"
},
{
	testName		:	"VT400-1064 | Set rsmProximityDistance: Medium| Medium",
	propertyName	:	"rsmProximityDistance",
	scannerTypes	:	"RSM Bluetooth",
	OSTypes			:	"WINDOWS",
	propertyValue	:	"medium",
	expectedResult	:	"medium"
},
{
	testName		:	"VT400-1065 | Set rsmProximityDistance: Long| Long",
	propertyName	:	"rsmProximityDistance",
	scannerTypes	:	"RSM Bluetooth",
	OSTypes			:	"WINDOWS",
	propertyValue	:	"long",
	expectedResult	:	"long"
},
{
	testName		:	"VT400-1066 | Set rsmPagingEnable: true| true",
	propertyName	:	"rsmPagingEnable",
	scannerTypes	:	"RSM Bluetooth",
	OSTypes			:	"WINDOWS",
	propertyValue	:	"true",
	expectedResult	:	"true"
},
{
	testName		:	"VT400-1067 | Set rsmPagingEnable: false | false",
	propertyName	:	"rsmPagingEnable",
	scannerTypes	:	"RSM Bluetooth",
	OSTypes			:	"WINDOWS",
	propertyValue	:	"false",
	expectedResult	:	"false"
},
{
	testName		:	"VT400-1068 | Set rsmPagingBeepSequence: 0 | 0",
	propertyName	:	"rsmPagingBeepSequence",
	scannerTypes	:	"RSM Bluetooth",
	OSTypes			:	"WINDOWS",
	propertyValue	:	"0",
	expectedResult	:	"0"
},
{
	testName		:	"VT400-1069 | Set rsmPagingBeepSequence 7| 7",
	propertyName	:	"rsmPagingBeepSequence",
	scannerTypes	:	"RSM Bluetooth",
	OSTypes			:	"WINDOWS",
	propertyValue	:	"7",
	expectedResult	:	"7"
},
{
	testName		:	"VT400-1070 | Set rsmPagingBeepSequence 15| 15",
	propertyName	:	"rsmPagingBeepSequence",
	scannerTypes	:	"RSM Bluetooth",
	OSTypes			:	"WINDOWS",
	propertyValue	:	"15",
	expectedResult	:	"15"
},
{
	testName		:	"VT400-1071 | Set connectionIdleTimeout: 10000| 10000",
	propertyName	:	"connectionIdleTimeout",
	scannerTypes	:	"RSM Bluetooth",
	OSTypes			:	"WINDOWS",
	propertyValue	:	"10000",
	expectedResult	:	"10000"
},
{
	testName		:	"VT400-1072 | Set disconnectBtOnDisable: true | true",
	propertyName	:	"disconnectBtOnDisable",
	scannerTypes	:	"RSM Bluetooth",
	OSTypes			:	"WINDOWS",
	propertyValue	:	"true",
	expectedResult	:	"true"
},
{
	testName		:	"VT400-1073 | Set disconnectBtOnDisable: false | false",
	propertyName	:	"disconnectBtOnDisable",
	scannerTypes	:	"RSM Bluetooth",
	OSTypes			:	"WINDOWS",
	propertyValue	:	"false",
	expectedResult	:	"false"
},
{
	testName		:	"VT400-1074 | Set displayBtAddressBarcodeOnEnable: true | true",
	propertyName	:	"displayBtAddressBarcodeOnEnable",
	scannerTypes	:	"RSM Bluetooth",
	OSTypes			:	"WINDOWS",
	propertyValue	:	"true",
	expectedResult	:	"true"
},
{
	testName		:	"VT400-1075 | Set displayBtAddressBarcodeOnEnable: false | false",
	propertyName	:	"displayBtAddressBarcodeOnEnable",
	scannerTypes	:	"RSM Bluetooth",
	OSTypes			:	"WINDOWS",
	propertyValue	:	"false",
	expectedResult	:	"false"
},
{
	testName		:	"VT400-1076 | Set enableTimeout: 45 sec | 45",
	propertyName	:	"enableTimeout",
	scannerTypes	:	"RSM Bluetooth",
	OSTypes			:	"WINDOWS",
	propertyValue	:	"45",
	expectedResult	:	"45"
}
];

var getApplicableProperties = function (objScnType){
	
	var isAndroid = (Rho.System.platform == "ANDROID");
	var deviceScannerType = objScnType.getProperty('friendlyName');
	var finalSCNObj = [];

	for (var i = 0; i < rsm_set_get_property.length ; i++){

		if(rsm_set_get_property[i]['OSTypes'] == 'WINDOWS')
		{
			finalSCNObj.push(rsm_set_get_property[i]);
		}
	}

	return finalSCNObj;
}

var getApplicableReadOnlyProperties = function (objScnType){
	
	var isAndroid = (Rho.System.platform == "ANDROID");
	var deviceScannerType = objScnType.getProperty('friendlyName');
	var finalReadSCNObj = [];

	for (var i = 0; i < rsm_get_property_unknown_return.length ; i++){

		if(rsm_get_property_unknown_return[i]['OSTypes'] == 'WINDOWS')
		{
			finalReadSCNObj.push(rsm_get_property_unknown_return[i]);
		}
	}

	return finalReadSCNObj;
}