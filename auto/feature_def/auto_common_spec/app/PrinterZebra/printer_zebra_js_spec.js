$(document).ready(function(){
document.body.innerHTML += '<div id="mystatus">Status Will Come Here<ul id="myList"></ul><button size="10" onclick="location=location">Refresh</button></div>';
});

describe('Rho.PrinterZebra Search Printer JS API', function() {
	var printers = [];
	var discovery_finished = false;
	var timeouterror_flag = false;
	var errmsg = '';
	var connect_status = '';
	var printer_instance = '';
	var ENABLE120K = 120000;
	var objPrinter = '';
	var connected = undefined;
	var searched = undefined;
	var CommandZPL = '^XA^FO50,50^ADN,36,20^FDZebraPrinting^FS^XZ';
	var callresult = null;
	
	beforeEach(function(){
		connected = undefined;
	});
	
	function connectCallback(data) {
		alert("Hello");

	}
	
	function cbk(val) {
        callresult = val;
  }
		

	

	function searchPrinterCallback(printer) {

		if ((printer.status == Rho.PrinterZebra.PRINTER_STATUS_SUCCESS) && printer.printerID && (printer.printerID.length > 0)) {
			//alert("Got 1");
			printers.push(printer.printerID);
		}
		else if (printer.status == Rho.PrinterZebra.PRINTER_STATUS_SUCCESS ) {
		//alert("Length"+printers.length);
			if(printers.length > 0){
				searched = true;
			}
			else{
			 location = location;
			}
		}
		else{
			//alert("Hello Else");
		}
	}
			describe('Rho.PrinterZebra APIs Set Test', function() {
				it("Search Printer", function(){
				runs(function(){
					Rho.PrinterZebra.searchPrinters({"printerType": Rho.PrinterZebra.PRINTER_TYPE_ZEBRA,"connectionType": Rho.PrinterZebra.CONNECTION_TYPE_TCP}, searchPrinterCallback);
				});
				waitsFor(function(){
					if(searched)
						return true;
				},50000);
				});

				describe("Printer type " + JSON.stringify(printer_instance), function() {
					describe('Connect to Printer', function () {
						it('Should connect to a printer and then start tests', function () {
							runs(function(){
								//alert(printers[0]);
								printer_instance = Rho.PrinterZebra.getPrinterByID(printers[0]);
								//alert(typeof(printer_instance));
								printer_instance.connect(function(data){
								alert(data);
								connected = true;
								});
							});
							waitsFor(function(){
								if(connected){
									return true;
								}
							},50000);
							
						
				
						});
						
						it('should print ZPL Command with callback', function() {
							alert('zpl');
							callresult = null;
							printer_instance.printRawString(CommandZPL, {}, cbk);
						});
						
						waitsFor(function() {
							return callresult !== null;
						}, 'wait until setting lable length', 15000);
						
						
					});
							
							describe('Getting connectionType', function () {
								it('Should return connectionType value as a string', function () {
									expect(printer_instance.connectionType).isNotEmptyString();
								});
							});
							
							describe('Getting deviceAddress', function () {
									it('Should return deviceAddress value as a string', function () {
										expect(printer_instance.deviceAddress).isNotEmptyString();
									});
							});		
							
							if(printer_instance.connectionType != "CONNECTION_TYPE_BLUETOOTH") {	
								describe('Getting devicePort', function () {
									it('Should return devicePort value as an integer', function () {
										expect(printer_instance.devicePort).isNumberGreaterThenZero();
									});
								});
							}

							
							describe('Getting ID', function () {
								it('Should return ID value as a string', function () {
									expect(printer_instance.ID).isNotEmptyString();
								});
							});


							describe('Getting deviceName', function () {
								it('Should return deviceName value as a string', function () {
									expect(printer_instance.deviceName).isNotEmptyString();
								});
							});


							describe('Getting printerType', function () {
								it('Should return printerType value as a string', function () {
									expect(printer_instance.printerType).isNotEmptyString();
								});
							});


							describe('Getting isConnected', function () {
								it('Should return isConnected value as BOOLEAN (true or false)', function () {
									expect(printer_instance.isConnected).isBoolean();
								});
							});

							xdescribe('Getting printerEventCallback', function () {
								it('Should return printerEventCallback value as a Callback', function () {
									//TODO : Need to modify the expected.
									expect(printer_instance.printerEventCallback).toEqual(function(event) {});
								});
							});

							describe('Getting controlLanguage', function () {
								it('Should return controlLanguage value as a string', function () {
									expect(printer_instance.controlLanguage).isNotEmptyString();
								});
							});
									
							describe('Setting maxTimeoutForRead', function() {
								 it('Should Get maxTimeoutForRead default value', function() {
									expect(printer_instance.getProperty('maxTimeoutForRead')).isNumberGreaterThenZero();
								});
								
								it('Should Set maxTimeoutForRead to 0 using direct calling method', function() {
									printer_instance.maxTimeoutForRead = 0;
									expect(printer_instance.maxTimeoutForRead).toEqual(0);
								});
								it('Should Set maxTimeoutForRead to 0 using setProperty calling method', function() {
									printer_instance.setProperty('maxTimeoutForRead', '0');
									expect(printer_instance.getProperty('maxTimeoutForRead')).toEqual('0');
								});
								it('Should Set maxTimeoutForRead to 0 using setProperties calling method', function() {
									printer_instance.setProperties({
										'maxTimeoutForRead': 0
									});
									var data = printer_instance.getProperties(['maxTimeoutForRead']);
									data = data['maxTimeoutForRead'];
									expect(data).toEqual('0');
								});
								it('Should Set maxTimeoutForRead to 50000 using direct calling method', function() {
									printer_instance.maxTimeoutForRead = 50000;
									expect(printer_instance.maxTimeoutForRead).toEqual(50000);
								});
								it('Should Set maxTimeoutForRead to 50000 using setProperty calling method', function() {
									printer_instance.setProperty('maxTimeoutForRead', '50000');
									expect(printer_instance.getProperty('maxTimeoutForRead')).toEqual('50000');
								});
								it('Should Set maxTimeoutForRead to 50000 using setProperties calling method', function() {
									printer_instance.setProperties({
										'maxTimeoutForRead': 50000
									});
									var data = printer_instance.getProperties(['maxTimeoutForRead']);
									data = data['maxTimeoutForRead'];
									expect(data).toEqual('50000');
								});
								
							});


							describe('Setting maxTimeoutForOpen', function() {
								it('Should Get maxTimeoutForOpen default value', function() {
									expect(printer_instance.getProperty('maxTimeoutForOpen')).isNumberGreaterThenZero();
								});
								
								it('Should Set maxTimeoutForOpen to 0 using direct calling method', function() {
									printer_instance.maxTimeoutForOpen = 0;
									expect(printer_instance.maxTimeoutForOpen).toEqual(0);
								});
								it('Should Set maxTimeoutForOpen to 0 using setProperty calling method', function() {
									printer_instance.setProperty('maxTimeoutForOpen', '0');
									expect(printer_instance.getProperty('maxTimeoutForOpen')).toEqual('0');
								});
								it('Should Set maxTimeoutForOpen to 0 using setProperties calling method', function() {
									printer_instance.setProperties({
										'maxTimeoutForOpen': 0
									});
									var data = printer_instance.getProperties(['maxTimeoutForOpen']);
									data = data['maxTimeoutForOpen'];
									expect(data).toEqual('0');
								});
								it('Should Set maxTimeoutForOpen to 50000 using direct calling method', function() {
									printer_instance.maxTimeoutForOpen = 50000;
									expect(printer_instance.maxTimeoutForOpen).toEqual(50000);
								});
								it('Should Set maxTimeoutForOpen to 50000 using setProperty calling method', function() {
									printer_instance.setProperty('maxTimeoutForOpen', '50000');
									expect(printer_instance.getProperty('maxTimeoutForOpen')).toEqual('50000');
								});
								it('Should Set maxTimeoutForOpen to 50000 using setProperties calling method', function() {
									printer_instance.setProperties({
										'maxTimeoutForOpen': 50000
									});
									var data = printer_instance.getProperties(['maxTimeoutForOpen']);
									data = data['maxTimeoutForOpen'];
									expect(data).toEqual('50000');
								});
							});


							describe('Setting timeToWaitForMoreData', function() {
								it('Should Get timeToWaitForMoreData default value', function() {
									expect(printer_instance.getProperty('timeToWaitForMoreData')).isNumberGreaterThenZero();
								});
								
								it('Should Set timeToWaitForMoreData to 0 using direct calling method', function() {
									printer_instance.timeToWaitForMoreData = 0;
									expect(printer_instance.timeToWaitForMoreData).toEqual(0);
								});
								it('Should Set timeToWaitForMoreData to 0 using setProperty calling method', function() {
									printer_instance.setProperty('timeToWaitForMoreData', '0');
									expect(printer_instance.getProperty('timeToWaitForMoreData')).toEqual('0');
								});
								it('Should Set timeToWaitForMoreData to 0 using setProperties calling method', function() {
									printer_instance.setProperties({
										'timeToWaitForMoreData': 0
									});
									var data = printer_instance.getProperties(['timeToWaitForMoreData']);
									data = data['timeToWaitForMoreData'];
									expect(data).toEqual('0');
								});
								it('Should Set timeToWaitForMoreData to 50000 using direct calling method', function() {
									printer_instance.timeToWaitForMoreData = 50000;
									expect(printer_instance.timeToWaitForMoreData).toEqual(50000);
								});
								it('Should Set timeToWaitForMoreData to 50000 using setProperty calling method', function() {
									printer_instance.setProperty('timeToWaitForMoreData', '50000');
									expect(printer_instance.getProperty('timeToWaitForMoreData')).toEqual('50000');
								});
								it('Should Set timeToWaitForMoreData to 50000 using setProperties calling method', function() {
									printer_instance.setProperties({
										'timeToWaitForMoreData': 50000
									});
									var data = printer_instance.getProperties(['timeToWaitForMoreData']);
									data = data['timeToWaitForMoreData'];
									expect(data).toEqual('50000');
								});
							});


							describe('Setting timeToWaitAfterReadInMilliseconds', function() {
								it('Should Get timeToWaitAfterReadInMilliseconds default value', function() {
									expect(printer_instance.getProperty('timeToWaitAfterReadInMilliseconds')).toEqual('10000');
								});
								
								it('Should Set timeToWaitAfterReadInMilliseconds to 0 using direct calling method', function() {
									printer_instance.timeToWaitAfterReadInMilliseconds = 0;
									expect(printer_instance.timeToWaitAfterReadInMilliseconds).toEqual(0);
								});
								it('Should Set timeToWaitAfterReadInMilliseconds to 0 using setProperty calling method', function() {
									printer_instance.setProperty('timeToWaitAfterReadInMilliseconds', '0');
									expect(printer_instance.getProperty('timeToWaitAfterReadInMilliseconds')).toEqual('0');
								});
								it('Should Set timeToWaitAfterReadInMilliseconds to 0 using setProperties calling method', function() {
									printer_instance.setProperties({
										'timeToWaitAfterReadInMilliseconds': 0
									});
									var data = printer_instance.getProperties(['timeToWaitAfterReadInMilliseconds']);
									data = data['timeToWaitAfterReadInMilliseconds'];
									expect(data).toEqual('0');
								});
								it('Should Set timeToWaitAfterReadInMilliseconds to 50000 using direct calling method', function() {
									printer_instance.timeToWaitAfterReadInMilliseconds = 50000;
									expect(printer_instance.timeToWaitAfterReadInMilliseconds).toEqual(50000);
								});
								it('Should Set timeToWaitAfterReadInMilliseconds to 50000 using setProperty calling method', function() {
									printer_instance.setProperty('timeToWaitAfterReadInMilliseconds', '50000');
									expect(printer_instance.getProperty('timeToWaitAfterReadInMilliseconds')).toEqual('50000');
								});
								it('Should Set timeToWaitAfterReadInMilliseconds to 50000 using setProperties calling method', function() {
									printer_instance.setProperties({
										'timeToWaitAfterReadInMilliseconds': 50000
									});
									var data = printer_instance.getProperties(['timeToWaitAfterReadInMilliseconds']);
									data = data['timeToWaitAfterReadInMilliseconds'];
									expect(data).toEqual('50000');
								});
							});


							describe('Setting timeToWaitAfterWriteInMilliseconds', function() {
								it('Should Get timeToWaitAfterWriteInMilliseconds default value', function() {
									expect(printer_instance.getProperty('timeToWaitAfterWriteInMilliseconds')).toEqual('200000');
								});
								
								it('Should Set timeToWaitAfterWriteInMilliseconds to 0 using direct calling method', function() {
									printer_instance.timeToWaitAfterWriteInMilliseconds = 0;
									expect(printer_instance.timeToWaitAfterWriteInMilliseconds).toEqual(0);
								});
								it('Should Set timeToWaitAfterWriteInMilliseconds to 0 using setProperty calling method', function() {
									printer_instance.setProperty('timeToWaitAfterWriteInMilliseconds', '0');
									expect(printer_instance.getProperty('timeToWaitAfterWriteInMilliseconds')).toEqual('0');
								});
								it('Should Set timeToWaitAfterWriteInMilliseconds to 0 using setProperties calling method', function() {
									printer_instance.setProperties({
										'timeToWaitAfterWriteInMilliseconds': 0
									});
									var data = printer_instance.getProperties(['timeToWaitAfterWriteInMilliseconds']);
									data = data['timeToWaitAfterWriteInMilliseconds'];
									expect(data).toEqual('0');
								});
								it('Should Set timeToWaitAfterWriteInMilliseconds to 50000 using direct calling method', function() {
									printer_instance.timeToWaitAfterWriteInMilliseconds = 50000;
									expect(printer_instance.timeToWaitAfterWriteInMilliseconds).toEqual(50000);
								});
								it('Should Set timeToWaitAfterWriteInMilliseconds to 50000 using setProperty calling method', function() {
									printer_instance.setProperty('timeToWaitAfterWriteInMilliseconds', '50000');
									expect(printer_instance.getProperty('timeToWaitAfterWriteInMilliseconds')).toEqual('50000');
								});
								it('Should Set timeToWaitAfterWriteInMilliseconds to 50000 using setProperties calling method', function() {
									printer_instance.setProperties({
										'timeToWaitAfterWriteInMilliseconds': 50000
									});
									var data = printer_instance.getProperties(['timeToWaitAfterWriteInMilliseconds']);
									data = data['timeToWaitAfterWriteInMilliseconds'];
									expect(data).toEqual('50000');
								});
							});

				});

			});

});
	
