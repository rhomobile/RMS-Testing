
var printers = [];
var discovery_finished = false;
var testResult = '';
var connect_type = '';
var macipaddress = '';
var captured = false;
var errmsg = '';
var platform = Rho.System.platform;

function searchPrintersNow() {
    if (!connect_type) {
        /* Need to add get property for connection type
    	$('#test').css("display", "block");
    	setTimeout(function () {
            $('#test').onchange(function()
            	connect_type = $("#connection_type").val();
            	$('#test').css("display", "none");
            });
        }, 10000);*/
        connect_type = Rho.Printer.connectionType;
    }
    Rho.Printer.searchPrinters({
        "printerType": Printer.PRINTER_TYPE_ANY,
        "connectionType": connect_type
    }, searchPrinterCallback);
}

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


describe("Printing_with_JS", function () {
    beforeEach(function () {
        /* ... Set up your object ... */
        $('#for_js').hide();
        $('#for_ruby').show();
    });

    afterEach(function () {
        /* ... Tear it down ... */
    });

    describe('Rho.Printer APIs Set/Get Test', function () {
        var enumData = Rho.Printer.enumerate();
        for (var j = 0; j < enumData.length; j++) {
            (function (enumObject) {
                describe("PROPERTIES... ", function () {

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
                });
            })(enumData[j]);
        }
    });
});
