function enablecallbackdata(data)
{
	document.getElementById("clbkData").innerHTML = data;
}	
var rsm_get_property_unknown_return = [
{
	testName		:	"VT282-2887 | Get rsmModelNumber | ",
	propertyName	:	"rsmModelNumber",
	scannerTypes	:	"RSM Bluetooth",
	OSTypes			:	"WINDOWS",
	propertyValue	:	"Readonly",
	expectedResult	:	"Unknown"
},
{
	testName		:	"VT282-2888 | Get rsmSerialNumber | ",
	propertyName	:	"rsmSerialNumber",
	scannerTypes	:	"RSM Bluetooth",
	OSTypes			:	"WINDOWS",
	propertyValue	:	"Readonly",
	expectedResult	:	"Unknown"
},
{
	testName		:	"VT282-2883 | Get rsmDateOfManufacture | ",
	propertyName	:	"rsmDateOfManufacture",
	scannerTypes	:	"RSM Bluetooth",
	OSTypes			:	"WINDOWS",
	propertyValue	:	"Readonly",
	expectedResult	:	"Unknown"
},
{
	testName		:	"VT282-2884 | Get rsmDateOfService | ",
	propertyName	:	"rsmDateOfService",
	scannerTypes	:	"RSM Bluetooth",
	OSTypes			:	"WINDOWS",
	propertyValue	:	"Readonly",
	expectedResult	:	"Unknown"
},
{
	testName		:	"VT282-2882 | Get rsmBluetoothAddress | ",
	propertyName	:	"rsmBluetoothAddress",
	scannerTypes	:	"RSM Bluetooth",
	OSTypes			:	"WINDOWS",
	propertyValue	:	"Readonly",
	expectedResult	:	"Unknown"
},
{
	testName		:	"VT282-2886 | Get rsmFirmwareVersion | ",
	propertyName	:	"rsmFirmwareVersion",
	scannerTypes	:	"RSM Bluetooth",
	OSTypes			:	"WINDOWS",
	propertyValue	:	"Readonly",
	expectedResult	:	"Unknown"
},
{
	testName		:	"VT282-2885 | Get rsmDeviceClass | ",
	propertyName	:	"rsmDeviceClass",
	scannerTypes	:	"RSM Bluetooth",
	OSTypes			:	"WINDOWS",
	propertyValue	:	"Readonly",
	expectedResult	:	"Unknown"
},
{
	testName		:	"VT282-2881 | Get rsmBatteryStatus | ",
	propertyName	:	"rsmBatteryStatus",
	scannerTypes	:	"RSM Bluetooth",
	OSTypes			:	"WINDOWS",
	propertyValue	:	"Readonly",
	expectedResult	:	"Unknown"
},
{
	testName		:	"VT282-2879 | Set rsmBatteryCapacity | ",
	propertyName	:	"rsmBatteryCapacity",
	scannerTypes	:	"RSM Bluetooth",
	OSTypes			:	"WINDOWS",
	propertyValue	:	"Readonly",
	expectedResult	:	"Unknown"
},
{
	testName		:	"VT282-2880 | Get rsmBatteryId | ",
	propertyName	:	"rsmBatteryId",
	scannerTypes	:	"RSM Bluetooth",
	OSTypes			:	"WINDOWS",
	propertyValue	:	"Readonly",
	expectedResult	:	"Unknown"
}
];
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