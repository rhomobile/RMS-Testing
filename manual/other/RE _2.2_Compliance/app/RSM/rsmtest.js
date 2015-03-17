var a=0;
var count = 0;
var selected_scanner = "";
var selected_scannername = '';
function callBackFunc(param) {
	       var sig = document.getElementById("actualResult"); 
	       sig.innerHTML = "Param: "+ param;
}
function setEnumScannerTimer() 
    {
         //alert('1');
        setTimeout("onScannerEnable()", 1000);
    }
    
    function onScannerEnable() 
    {
       //alert('2');
      scanner.enumScannerEvent = 'EnumScanners(%json)';
      scanner.enumerate();
        
    }

 function EnumScanners(jsonObject) 
    {
    	var html = "<b>Device Name: Friendly Name</b><br>";
        for (i = 0; i < jsonObject.scannerArray.length; i++) 
        {
            //alert(i);
           document.getElementById('myscanner').options[i + 1].text = jsonObject.scannerArray[i].deviceName + jsonObject.scannerArray[i].friendlyName;
           document.getElementById('myscanner').options[i + 1].value = jsonObject.scannerArray[i].deviceName;
             
            
        }
    
    }



function selectScanner(){
		    var w = document.getElementById('myscanner').selectedIndex;
		    selected_scanner = document.getElementById('myscanner').options[w].value;
		    selected_scannername=document.getElementById('myscanner').options[w].text;
		    var temp = "enabled:"+ selected_scanner;
		    scanner.setEMML(temp);
		    var scnID =  selected_scanner.getProperty('ID');
		    var scntype = selected_scanner.getProperty('scannerType');
		    var scnname = selected_scanner.getProperty('friendlyName');
		}
function scannerenable(){
	
		    var temp1 = "enabled:"+ selected_scanner;
		    scanner.setEMML(temp1);
}
function onRSMAttributes(jsonObject){
	var message = JSON.stringify(jsonObject);
	main.displayResult(message);

}


(function(){
	var pbTest = function(){
		var pbTestObj = {};
		pbTestObj.testCases = [
		{
				"VTID":"VT366-0265",
				"RegLevel":"R1",
				"Description":"Retrieve all RSM attributes from Attribute array.",
				"PreCondition":[],
				"Steps":["1. Connect RSM device to the mobile unit. (select the port and Pair using apiring barcode)","2. Enable scanner","3. Register the rsmGetEvent ","3. retrieve all RSM attributes from AttributeArray.","4.Check each attribute value whether it is correct or not?"],
				"ExpectedOutcome":["All RSM attributes should be retrieved from AttributeArray. All the attributes should show the correct data"],
				"testToPerform":function(){
					 //scannerenable();
					 //rsm.rsmGetEvent = 'onRSMAttributes(%json)';
					 rsm.markForRetrievalModelNumber();	//  Array Index 0
	                 rsm.markForRetrievalSerialNumber();	
	                 rsm.markForRetrievalDateOfManufacture();
	                 rsm.markForRetrievalDateOfService();		
	                 rsm.markForRetrievalBluetoothAddress();	
	                 rsm.markForRetrievalFirmwareVersion();
	                 rsm.markForRetrievalDeviceClass();
	                 rsm.markForRetrievalBatteryStatus();
	                 rsm.markForRetrievalBatteryCapacity();
	                 rsm.markForRetrievalBatteryId();
	                 rsm.markForRetrievalBluetoothAuthentication();	
	                 rsm.markForRetrievalBluetoothEncryption();
	                 rsm.markForRetrievalBluetoothPinCode();
	                 rsm.markForRetrievalBluetoothPinCodeType();
	                 rsm.markForRetrievalBluetoothReconnectAttempts();
	                 rsm.markForRetrievalBluetoothBeepOnReconnectAttempt();
	                 rsm.markForRetrievalBluetoothHidAutoReconnect();
	                 rsm.markForRetrievalBluetoothFriendlyName();
	                 rsm.markForRetrievalBluetoothInquiryMode();
	                 rsm.markForRetrievalBluetoothAutoReconnect();
	                 rsm.markForRetrievalForceSavePairingBarcode();
	                 rsm.markForRetrievalLowBatteryIndication();
	                 rsm.markForRetrievalLowBatteryIndicationCycle();
	                 rsm.markForRetrievalScanLineWidth();
	                 rsm.markForRetrievalGoodScansDelay();
	                 rsm.markForRetrievalDecodeFeedback();
	                 rsm.markForRetrievalIgnoreCode128Usps();
	                 rsm.markForRetrievalScanTriggerWakeup();
	                 rsm.markForRetrievalMems();
	                 rsm.markForRetrievalProximityEnable();
	                 rsm.markForRetrievalProximityContinuous();
	                 rsm.markForRetrievalProximityDistance();
	                 rsm.markForRetrievalPagingEnable();
	                 rsm.markForRetrievalPagingBeepSequence();
	                 rsm.rsmGetEvent = 'onRSMAttributes(%json)';
					
				},
				"FinalResult":""
			},{
				"VTID":"VT366-0266",
				"RegLevel":"R1",
				"Description":"Set RSM BTDisconnect",
				"PreCondition":[],
				"Steps":["1.Connect RSM device to the mobile unit (select the port and Pair using pairing barcode)","2.enable BT scanner and decode any barcode","3.Call BTDisconnect","4.try to enable BT scanner again"],
				"ExpectedOutcome":["Commands scanner to disconnect from its connected device","It should ask for BT pairing while trying to re-enaable"],
				"testToPerform":function(){
					 //scannerenable();
					 rsm.bluetoothDisconnect();
					 //scannerenable();
					
				},
				"FinalResult":""
			},{
				"VTID":"VT366-0267",
				"RegLevel":"R1",
				"Description":"Set RSM BTUnpair",
				"PreCondition":[],
				"Steps":["1.Connect RSM device to the mobile unit (select the port and Pair using pairing barcode)","2.enable BT scanner and decode any barcode","3.Call BTUnpair","4.try to enable BT scanner again"],
				"ExpectedOutcome":["RSM META Tag Command scanner to unpair from its paired device","It should ask for BT pairing while trying to re-enaable"],
				"testToPerform":function(){
					 //scannerenable();
					 //scannerenable();
					 rsm.bluetoothUnpair();
					 //scannerenable();
					
				},
				"FinalResult":""
			}
			

		];
		pbTestObj.afterEach = function(){
			audioCapture.duration = 20000;
		}
		return pbTestObj;
	}
	window.pbTest = pbTest();
})();