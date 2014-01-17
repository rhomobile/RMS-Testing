var printers = [];
var discovery_finished = false;
var timeouterror_flag = false;
var errmsg = '';
var connect_status = '';
var printer_instance = '';
var ENABLE120K = 120000;

function searchPrinterCallback(printer) {
    if (printer.status == Rho.PrinterZebra.PRINTER_STATUS_OK) {
        printers.push(printer);
    } else if (printer.status == Rho.PrinterZebra.PRINTER_STATUS_DONE ) {
        discovery_finished = true;
    }
	else if ( printer.status == Rho.PrinterZebra.PRINTER_STATUS_ERR_TIMEOUT )	{
		discovery_finished = true;
		timeouterror_flag = true;
    }
	else if (printer.status == Rho.PrinterZebra.PRINTER_STATUS_ERROR) {
        errmsg = printer.message; // when status = ERROR
    }
}

function searchPrintersNow() {
    Rho.PrinterZebra.searchPrinters({
        "printerType": Rho.PrinterZebra.PRINTER_TYPE_ZEBRA,
        "connectionType": Rho.PrinterZebra.CONNECTION_TYPE_BLUETOOTH
    }, searchPrinterCallback);
}

function connectCallback(printer) {
	if(printer.status == Rho.PrinterZebra.PRINTER_STATUS_OK) {
		connect_status = printer.status;
	}
	else {
		connect_status = printer.status;
	}	
}

describe('Rho.PrinterZebra Search Printer JS API', function() {
	it('Search Printer', function () {
		runs(function() {	
			searchPrintersNow();
		});
		waitsFor(function() {
			return discovery_finished;
		}, '120sec waiting for Search printer', ENABLE120K);
		
		runs(function() {
			if (printers.length > 0 && discovery_finished == true)	{
				printer_instance = Rho.PrinterZebra.getPrinterByID(printers[0].printerID);
				printer_instance.connect(connectCallback);
				expect(connect_status).toEqual(Rho.PrinterZebra.PRINTER_STATUS_OK);
			}
			else if (timeouterror_flag == true && printers.length == 0) {
				expect(printers.length).toBeGreaterThan('0');
			}
			else if (errmsg == Rho.Printer.STATUS_ERROR) {
				expect(errmsg).toEqual(Rho.PrinterZebra.PRINTER_STATUS_ERROR);
			}
		});
	});
});
if(printer_instance.isConnected == true) {
	describe('Rho.PrinterZebra APIs Set Test', function() {
		describe("Printer type " + printers[0].printerID, function() {
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

			describe('Getting printerEventCallback', function () {
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
}