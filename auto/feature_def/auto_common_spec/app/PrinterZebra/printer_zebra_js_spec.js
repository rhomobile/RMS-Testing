describe('Rho.PrinterZebra JS API', function() {
        describe('Rho.PrinterZebra APIs Set Test', function() {
                var enumData = Rho.PrinterZebra.enumerateSupportedTypes();
                for (var j = 0; j < enumData.length; j++) {
                    if (enumData[j].printerID == "PRINTER_TYPE_ZEBRA") {
                    (function(enumObject) {
                        describe("Printer type " + enumData[j].printerID, function() {
							describe('Getting ID', function () {
								it('Should return ID value as a string', function () {
									expect(enumObject.ID).isNotEmptyString();
								});
							});


							describe('Getting deviceName', function () {
								it('Should return deviceName value as a string', function () {
									expect(enumObject.deviceName).isNotEmptyString();
								});
							});


							describe('Getting printerType', function () {
								it('Should return printerType value as a string', function () {
									expect(enumObject.printerType).isNotEmptyString();
								});
							});


							describe('Getting deviceAddress', function () {
								it('Should return deviceAddress value as a string', function () {
									expect(enumObject.deviceAddress).isNotEmptyString();
								});
							});

							describe('Getting devicePort', function () {
								it('Should return devicePort value as an integer', function () {
									expect(enumObject.devicePort).isNumberGreaterThenZero();
								});
							});


							describe('Getting connectionType', function () {
								it('Should return connectionType value as a string', function () {
									expect(enumObject.connectionType).isNotEmptyString();
								});
							});


							describe('Getting isConnected', function () {
								it('Should return isConnected value as BOOLEAN (true or false)', function () {
									expect(enumObject.isConnected).isBoolean();
								});
							});

							describe('Getting printerEventCallback', function () {
								it('Should return printerEventCallback value as a Callback', function () {
									expect(enumObject.printerEventCallback).toEqual(typeof (function () {
										searchPrintersNow();
									}));
								});
							});

							describe('Getting controlLanguage', function () {
								it('Should return controlLanguage value as a string', function () {
									expect(enumObject.controlLanguage).isNotEmptyString();
								});
							});
							
                            describe('Setting maxTimeoutForRead', function() {
								 it('Should Get maxTimeoutForRead default value', function() {
                                    expect(enumObject.getProperty('maxTimeoutForRead')).isNumberGreaterThenZero();
                                });
								
                                it('Should Set maxTimeoutForRead to 0 using direct calling method', function() {
                                    enumObject.maxTimeoutForRead = 0;
                                    expect(enumObject.maxTimeoutForRead).toEqual(0);
                                });
                                it('Should Set maxTimeoutForRead to 0 using setProperty calling method', function() {
                                    enumObject.setProperty('maxTimeoutForRead', '0');
                                    expect(enumObject.getProperty('maxTimeoutForRead')).toEqual('0');
                                });
                                it('Should Set maxTimeoutForRead to 0 using setProperties calling method', function() {
                                    enumObject.setProperties({
                                        'maxTimeoutForRead': 0
                                    });
                                    var data = enumObject.getProperties(['maxTimeoutForRead']);
                                    data = data['maxTimeoutForRead'];
                                    expect(data).toEqual('0');
                                });
                                it('Should Set maxTimeoutForRead to 5000 using direct calling method', function() {
                                    enumObject.maxTimeoutForRead = 5000;
                                    expect(enumObject.maxTimeoutForRead).toEqual(5000);
                                });
                                it('Should Set maxTimeoutForRead to 5000 using setProperty calling method', function() {
                                    enumObject.setProperty('maxTimeoutForRead', '5000');
                                    expect(enumObject.getProperty('maxTimeoutForRead')).toEqual('5000');
                                });
                                it('Should Set maxTimeoutForRead to 5000 using setProperties calling method', function() {
                                    enumObject.setProperties({
                                        'maxTimeoutForRead': 5000
                                    });
                                    var data = enumObject.getProperties(['maxTimeoutForRead']);
                                    data = data['maxTimeoutForRead'];
                                    expect(data).toEqual('5000');
                                });
                                it('Should Set maxTimeoutForRead to 10000 using direct calling method', function() {
                                    enumObject.maxTimeoutForRead = 10000;
                                    expect(enumObject.maxTimeoutForRead).toEqual(10000);
                                });
                                it('Should Set maxTimeoutForRead to 10000 using setProperty calling method', function() {
                                    enumObject.setProperty('maxTimeoutForRead', '10000');
                                    expect(enumObject.getProperty('maxTimeoutForRead')).toEqual('10000');
                                });
                                it('Should Set maxTimeoutForRead to 10000 using setProperties calling method', function() {
                                    enumObject.setProperties({
                                        'maxTimeoutForRead': 10000
                                    });
                                    var data = enumObject.getProperties(['maxTimeoutForRead']);
                                    data = data['maxTimeoutForRead'];
                                    expect(data).toEqual('10000');
                                });
                                it('Should Set maxTimeoutForRead to 50000 using direct calling method', function() {
                                    enumObject.maxTimeoutForRead = 50000;
                                    expect(enumObject.maxTimeoutForRead).toEqual(50000);
                                });
                                it('Should Set maxTimeoutForRead to 50000 using setProperty calling method', function() {
                                    enumObject.setProperty('maxTimeoutForRead', '50000');
                                    expect(enumObject.getProperty('maxTimeoutForRead')).toEqual('50000');
                                });
                                it('Should Set maxTimeoutForRead to 50000 using setProperties calling method', function() {
                                    enumObject.setProperties({
                                        'maxTimeoutForRead': 50000
                                    });
                                    var data = enumObject.getProperties(['maxTimeoutForRead']);
                                    data = data['maxTimeoutForRead'];
                                    expect(data).toEqual('50000');
                                });
                            });


                            describe('Setting maxTimeoutForOpen', function() {
								it('Should Get maxTimeoutForOpen default value', function() {
                                    expect(enumObject.getProperty('maxTimeoutForOpen')).isNumberGreaterThenZero();
                                });
								
                                it('Should Set maxTimeoutForOpen to 0 using direct calling method', function() {
                                    enumObject.maxTimeoutForOpen = 0;
                                    expect(enumObject.maxTimeoutForOpen).toEqual(0);
                                });
                                it('Should Set maxTimeoutForOpen to 0 using setProperty calling method', function() {
                                    enumObject.setProperty('maxTimeoutForOpen', '0');
                                    expect(enumObject.getProperty('maxTimeoutForOpen')).toEqual('0');
                                });
                                it('Should Set maxTimeoutForOpen to 0 using setProperties calling method', function() {
                                    enumObject.setProperties({
                                        'maxTimeoutForOpen': 0
                                    });
                                    var data = enumObject.getProperties(['maxTimeoutForOpen']);
                                    data = data['maxTimeoutForOpen'];
                                    expect(data).toEqual('0');
                                });
                                it('Should Set maxTimeoutForOpen to 5000 using direct calling method', function() {
                                    enumObject.maxTimeoutForOpen = 5000;
                                    expect(enumObject.maxTimeoutForOpen).toEqual(5000);
                                });
                                it('Should Set maxTimeoutForOpen to 5000 using setProperty calling method', function() {
                                    enumObject.setProperty('maxTimeoutForOpen', '5000');
                                    expect(enumObject.getProperty('maxTimeoutForOpen')).toEqual('5000');
                                });
                                it('Should Set maxTimeoutForOpen to 5000 using setProperties calling method', function() {
                                    enumObject.setProperties({
                                        'maxTimeoutForOpen': 5000
                                    });
                                    var data = enumObject.getProperties(['maxTimeoutForOpen']);
                                    data = data['maxTimeoutForOpen'];
                                    expect(data).toEqual('5000');
                                });
                                it('Should Set maxTimeoutForOpen to 10000 using direct calling method', function() {
                                    enumObject.maxTimeoutForOpen = 10000;
                                    expect(enumObject.maxTimeoutForOpen).toEqual(10000);
                                });
                                it('Should Set maxTimeoutForOpen to 10000 using setProperty calling method', function() {
                                    enumObject.setProperty('maxTimeoutForOpen', '10000');
                                    expect(enumObject.getProperty('maxTimeoutForOpen')).toEqual('10000');
                                });
                                it('Should Set maxTimeoutForOpen to 10000 using setProperties calling method', function() {
                                    enumObject.setProperties({
                                        'maxTimeoutForOpen': 10000
                                    });
                                    var data = enumObject.getProperties(['maxTimeoutForOpen']);
                                    data = data['maxTimeoutForOpen'];
                                    expect(data).toEqual('10000');
                                });
                                it('Should Set maxTimeoutForOpen to 50000 using direct calling method', function() {
                                    enumObject.maxTimeoutForOpen = 50000;
                                    expect(enumObject.maxTimeoutForOpen).toEqual(50000);
                                });
                                it('Should Set maxTimeoutForOpen to 50000 using setProperty calling method', function() {
                                    enumObject.setProperty('maxTimeoutForOpen', '50000');
                                    expect(enumObject.getProperty('maxTimeoutForOpen')).toEqual('50000');
                                });
                                it('Should Set maxTimeoutForOpen to 50000 using setProperties calling method', function() {
                                    enumObject.setProperties({
                                        'maxTimeoutForOpen': 50000
                                    });
                                    var data = enumObject.getProperties(['maxTimeoutForOpen']);
                                    data = data['maxTimeoutForOpen'];
                                    expect(data).toEqual('50000');
                                });
                            });


                            describe('Setting timeToWaitForMoreData', function() {
								it('Should Get timeToWaitForMoreData default value', function() {
                                    expect(enumObject.getProperty('timeToWaitForMoreData')).isNumberGreaterThenZero();
                                });
								
                                it('Should Set timeToWaitForMoreData to 0 using direct calling method', function() {
                                    enumObject.timeToWaitForMoreData = 0;
                                    expect(enumObject.timeToWaitForMoreData).toEqual(0);
                                });
                                it('Should Set timeToWaitForMoreData to 0 using setProperty calling method', function() {
                                    enumObject.setProperty('timeToWaitForMoreData', '0');
                                    expect(enumObject.getProperty('timeToWaitForMoreData')).toEqual('0');
                                });
                                it('Should Set timeToWaitForMoreData to 0 using setProperties calling method', function() {
                                    enumObject.setProperties({
                                        'timeToWaitForMoreData': 0
                                    });
                                    var data = enumObject.getProperties(['timeToWaitForMoreData']);
                                    data = data['timeToWaitForMoreData'];
                                    expect(data).toEqual('0');
                                });
                                it('Should Set timeToWaitForMoreData to 5000 using direct calling method', function() {
                                    enumObject.timeToWaitForMoreData = 5000;
                                    expect(enumObject.timeToWaitForMoreData).toEqual(5000);
                                });
                                it('Should Set timeToWaitForMoreData to 5000 using setProperty calling method', function() {
                                    enumObject.setProperty('timeToWaitForMoreData', '5000');
                                    expect(enumObject.getProperty('timeToWaitForMoreData')).toEqual('5000');
                                });
                                it('Should Set timeToWaitForMoreData to 5000 using setProperties calling method', function() {
                                    enumObject.setProperties({
                                        'timeToWaitForMoreData': 5000
                                    });
                                    var data = enumObject.getProperties(['timeToWaitForMoreData']);
                                    data = data['timeToWaitForMoreData'];
                                    expect(data).toEqual('5000');
                                });
                                it('Should Set timeToWaitForMoreData to 10000 using direct calling method', function() {
                                    enumObject.timeToWaitForMoreData = 10000;
                                    expect(enumObject.timeToWaitForMoreData).toEqual(10000);
                                });
                                it('Should Set timeToWaitForMoreData to 10000 using setProperty calling method', function() {
                                    enumObject.setProperty('timeToWaitForMoreData', '10000');
                                    expect(enumObject.getProperty('timeToWaitForMoreData')).toEqual('10000');
                                });
                                it('Should Set timeToWaitForMoreData to 10000 using setProperties calling method', function() {
                                    enumObject.setProperties({
                                        'timeToWaitForMoreData': 10000
                                    });
                                    var data = enumObject.getProperties(['timeToWaitForMoreData']);
                                    data = data['timeToWaitForMoreData'];
                                    expect(data).toEqual('10000');
                                });
                                it('Should Set timeToWaitForMoreData to 50000 using direct calling method', function() {
                                    enumObject.timeToWaitForMoreData = 50000;
                                    expect(enumObject.timeToWaitForMoreData).toEqual(50000);
                                });
                                it('Should Set timeToWaitForMoreData to 50000 using setProperty calling method', function() {
                                    enumObject.setProperty('timeToWaitForMoreData', '50000');
                                    expect(enumObject.getProperty('timeToWaitForMoreData')).toEqual('50000');
                                });
                                it('Should Set timeToWaitForMoreData to 50000 using setProperties calling method', function() {
                                    enumObject.setProperties({
                                        'timeToWaitForMoreData': 50000
                                    });
                                    var data = enumObject.getProperties(['timeToWaitForMoreData']);
                                    data = data['timeToWaitForMoreData'];
                                    expect(data).toEqual('50000');
                                });
                            });


                            describe('Setting timeToWaitAfterReadInMilliseconds', function() {
								it('Should Get timeToWaitAfterReadInMilliseconds default value', function() {
                                    expect(enumObject.getProperty('timeToWaitAfterReadInMilliseconds')).toEqual('10000');
                                });
								
                                it('Should Set timeToWaitAfterReadInMilliseconds to 0 using direct calling method', function() {
                                    enumObject.timeToWaitAfterReadInMilliseconds = 0;
                                    expect(enumObject.timeToWaitAfterReadInMilliseconds).toEqual(0);
                                });
                                it('Should Set timeToWaitAfterReadInMilliseconds to 0 using setProperty calling method', function() {
                                    enumObject.setProperty('timeToWaitAfterReadInMilliseconds', '0');
                                    expect(enumObject.getProperty('timeToWaitAfterReadInMilliseconds')).toEqual('0');
                                });
                                it('Should Set timeToWaitAfterReadInMilliseconds to 0 using setProperties calling method', function() {
                                    enumObject.setProperties({
                                        'timeToWaitAfterReadInMilliseconds': 0
                                    });
                                    var data = enumObject.getProperties(['timeToWaitAfterReadInMilliseconds']);
                                    data = data['timeToWaitAfterReadInMilliseconds'];
                                    expect(data).toEqual('0');
                                });
                                it('Should Set timeToWaitAfterReadInMilliseconds to 5000 using direct calling method', function() {
                                    enumObject.timeToWaitAfterReadInMilliseconds = 5000;
                                    expect(enumObject.timeToWaitAfterReadInMilliseconds).toEqual(5000);
                                });
                                it('Should Set timeToWaitAfterReadInMilliseconds to 5000 using setProperty calling method', function() {
                                    enumObject.setProperty('timeToWaitAfterReadInMilliseconds', '5000');
                                    expect(enumObject.getProperty('timeToWaitAfterReadInMilliseconds')).toEqual('5000');
                                });
                                it('Should Set timeToWaitAfterReadInMilliseconds to 5000 using setProperties calling method', function() {
                                    enumObject.setProperties({
                                        'timeToWaitAfterReadInMilliseconds': 5000
                                    });
                                    var data = enumObject.getProperties(['timeToWaitAfterReadInMilliseconds']);
                                    data = data['timeToWaitAfterReadInMilliseconds'];
                                    expect(data).toEqual('5000');
                                });
                                it('Should Set timeToWaitAfterReadInMilliseconds to 10000 using direct calling method', function() {
                                    enumObject.timeToWaitAfterReadInMilliseconds = 10000;
                                    expect(enumObject.timeToWaitAfterReadInMilliseconds).toEqual(10000);
                                });
                                it('Should Set timeToWaitAfterReadInMilliseconds to 10000 using setProperty calling method', function() {
                                    enumObject.setProperty('timeToWaitAfterReadInMilliseconds', '10000');
                                    expect(enumObject.getProperty('timeToWaitAfterReadInMilliseconds')).toEqual('10000');
                                });
                                it('Should Set timeToWaitAfterReadInMilliseconds to 10000 using setProperties calling method', function() {
                                    enumObject.setProperties({
                                        'timeToWaitAfterReadInMilliseconds': 10000
                                    });
                                    var data = enumObject.getProperties(['timeToWaitAfterReadInMilliseconds']);
                                    data = data['timeToWaitAfterReadInMilliseconds'];
                                    expect(data).toEqual('10000');
                                });
                                it('Should Set timeToWaitAfterReadInMilliseconds to 50000 using direct calling method', function() {
                                    enumObject.timeToWaitAfterReadInMilliseconds = 50000;
                                    expect(enumObject.timeToWaitAfterReadInMilliseconds).toEqual(50000);
                                });
                                it('Should Set timeToWaitAfterReadInMilliseconds to 50000 using setProperty calling method', function() {
                                    enumObject.setProperty('timeToWaitAfterReadInMilliseconds', '50000');
                                    expect(enumObject.getProperty('timeToWaitAfterReadInMilliseconds')).toEqual('50000');
                                });
                                it('Should Set timeToWaitAfterReadInMilliseconds to 50000 using setProperties calling method', function() {
                                    enumObject.setProperties({
                                        'timeToWaitAfterReadInMilliseconds': 50000
                                    });
                                    var data = enumObject.getProperties(['timeToWaitAfterReadInMilliseconds']);
                                    data = data['timeToWaitAfterReadInMilliseconds'];
                                    expect(data).toEqual('50000');
                                });
                            });


                            describe('Setting timeToWaitAfterWriteInMilliseconds', function() {
								it('Should Get timeToWaitAfterWriteInMilliseconds default value', function() {
                                    expect(enumObject.getProperty('timeToWaitAfterWriteInMilliseconds')).toEqual('200000');
                                });
								
                                it('Should Set timeToWaitAfterWriteInMilliseconds to 0 using direct calling method', function() {
                                    enumObject.timeToWaitAfterWriteInMilliseconds = 0;
                                    expect(enumObject.timeToWaitAfterWriteInMilliseconds).toEqual(0);
                                });
                                it('Should Set timeToWaitAfterWriteInMilliseconds to 0 using setProperty calling method', function() {
                                    enumObject.setProperty('timeToWaitAfterWriteInMilliseconds', '0');
                                    expect(enumObject.getProperty('timeToWaitAfterWriteInMilliseconds')).toEqual('0');
                                });
                                it('Should Set timeToWaitAfterWriteInMilliseconds to 0 using setProperties calling method', function() {
                                    enumObject.setProperties({
                                        'timeToWaitAfterWriteInMilliseconds': 0
                                    });
                                    var data = enumObject.getProperties(['timeToWaitAfterWriteInMilliseconds']);
                                    data = data['timeToWaitAfterWriteInMilliseconds'];
                                    expect(data).toEqual('0');
                                });
                                it('Should Set timeToWaitAfterWriteInMilliseconds to 5000 using direct calling method', function() {
                                    enumObject.timeToWaitAfterWriteInMilliseconds = 5000;
                                    expect(enumObject.timeToWaitAfterWriteInMilliseconds).toEqual(5000);
                                });
                                it('Should Set timeToWaitAfterWriteInMilliseconds to 5000 using setProperty calling method', function() {
                                    enumObject.setProperty('timeToWaitAfterWriteInMilliseconds', '5000');
                                    expect(enumObject.getProperty('timeToWaitAfterWriteInMilliseconds')).toEqual('5000');
                                });
                                it('Should Set timeToWaitAfterWriteInMilliseconds to 5000 using setProperties calling method', function() {
                                    enumObject.setProperties({
                                        'timeToWaitAfterWriteInMilliseconds': 5000
                                    });
                                    var data = enumObject.getProperties(['timeToWaitAfterWriteInMilliseconds']);
                                    data = data['timeToWaitAfterWriteInMilliseconds'];
                                    expect(data).toEqual('5000');
                                });
                                it('Should Set timeToWaitAfterWriteInMilliseconds to 10000 using direct calling method', function() {
                                    enumObject.timeToWaitAfterWriteInMilliseconds = 10000;
                                    expect(enumObject.timeToWaitAfterWriteInMilliseconds).toEqual(10000);
                                });
                                it('Should Set timeToWaitAfterWriteInMilliseconds to 10000 using setProperty calling method', function() {
                                    enumObject.setProperty('timeToWaitAfterWriteInMilliseconds', '10000');
                                    expect(enumObject.getProperty('timeToWaitAfterWriteInMilliseconds')).toEqual('10000');
                                });
                                it('Should Set timeToWaitAfterWriteInMilliseconds to 10000 using setProperties calling method', function() {
                                    enumObject.setProperties({
                                        'timeToWaitAfterWriteInMilliseconds': 10000
                                    });
                                    var data = enumObject.getProperties(['timeToWaitAfterWriteInMilliseconds']);
                                    data = data['timeToWaitAfterWriteInMilliseconds'];
                                    expect(data).toEqual('10000');
                                });
                                it('Should Set timeToWaitAfterWriteInMilliseconds to 50000 using direct calling method', function() {
                                    enumObject.timeToWaitAfterWriteInMilliseconds = 50000;
                                    expect(enumObject.timeToWaitAfterWriteInMilliseconds).toEqual(50000);
                                });
                                it('Should Set timeToWaitAfterWriteInMilliseconds to 50000 using setProperty calling method', function() {
                                    enumObject.setProperty('timeToWaitAfterWriteInMilliseconds', '50000');
                                    expect(enumObject.getProperty('timeToWaitAfterWriteInMilliseconds')).toEqual('50000');
                                });
                                it('Should Set timeToWaitAfterWriteInMilliseconds to 50000 using setProperties calling method', function() {
                                    enumObject.setProperties({
                                        'timeToWaitAfterWriteInMilliseconds': 50000
                                    });
                                    var data = enumObject.getProperties(['timeToWaitAfterWriteInMilliseconds']);
                                    data = data['timeToWaitAfterWriteInMilliseconds'];
                                    expect(data).toEqual('50000');
                                });
                            });

                        });
                    })(enumData[j]);
                }
            }
        });
});

var printers = [];
var discovery_finished = false;
var connect_type = Rho.Printer.connectionType;
function searchPrinterCallback(printer) {
    testResult = printer.status;
    if (printer.status == Rho.Printer.STATUS_SUCCESS) {
        printers.push(printer);
    } else if (printer.status == Rho.Printer.STATUS_DONE || printer.status == Rho.Printer.STATUS_ERR_TIMEOUT) {
        discovery_finished = true;
    } else {
        errmsg = printer.message; // when status = ERROR
    }
}

function searchPrintersNow() {
    if (!connect_type) {
        connect_type = Rho.Printer.connectionType;
    }
    Rho.Printer.searchPrinters({
        "printerType": Printer.PRINTER_TYPE_ANY,
        "connectionType": connect_type
    }, searchPrinterCallback);
}