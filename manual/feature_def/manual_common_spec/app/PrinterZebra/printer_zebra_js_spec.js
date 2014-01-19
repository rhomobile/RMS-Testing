describe('Printer Zebra', function() {
    var ENABLE9K = 9000;
    var ENABLE10K = 10000;
    var ENABLE60K = 60000;
    var ENABLE120K = 120000;
    var ENABLE5MIN = 300000;
    var ENABLE30MIN = 1800000;
    var enableFlag = false;
    var callbackstatus = false;
    //var enumData = Rho.PrinterZebra.enumerateSupportedTypes();
    var printers_array = [];
    var printers_errors = [];
    var discovery_finished = false;
    var connect_type = Rho.PrinterZebra.CONNECTION_TYPE_TCP;
    var macipaddress = '';
    var stopsearch = '';
    var deviceaddressFlag = false;
    var CommandZPL = '^XA^FO50,50^ADN,36,20^FDZebraPrinting^FS^XZ';
    var CommandCCPL = '! U1 setvar "device.languages" "line_print"\r\n! 0.3937 200 200 1 1IN-INCHEST 4 0 0 0 1 cm = 0.3937”IN-DOTST 4 0 0 48 1 mm = 8 dotsB 128 1 1 48 16 112 UNITST40 48 160 UNITSFORMPRINT\r! U1 setvar "device.languages" "zpl"\r\n';
    var connect_status = '';
    var existingPritingObject = null;
    var last_found_printer = null;

    // DO NOT COPYPASTE IT!

    function makeFilePath(filename) {
        return Rho.RhoFile.join(Rho.Application.modelFolderPath('PrinterZebra'), Rho.RhoFile.join('PrinterZebraFiles', filename));
    }

    function objkeys(obj) {
        var keys = [];
        $.each(obj, function(key, value) {
            keys.push(key);
        });
        return keys;
    }

    function makeTestLabel() {
        return '^XA^MNN^LL200^XZ^XA^JUS^XZ^XA^FO50,50^A0I25,25^FD' + jasmine.getEnv().currentSpec.description + '^FS^XZ\r\n';
    }

    // BLACK WOODO MAGIC

    function evaluateHashValues(obj) {
        var result = {};
        var keys = objkeys(searchParamaters);
        for (var i = keys.length - 1; i >= 0; i--) {
            var key = keys[i];
            result[key] = obj[key]();
        }
        return result;
    }

    // make a list of all available combinations of fields within object

    function makeAllCombinationsOfFileds(obj) {
        var combinations = []; //All combinations
        var keys = objkeys(obj);
        var quantity = (1 << keys.length);
        if (quantity > 0) {
            for (var i = 0; i < quantity; i++) {
                var combination = {};
                for (var j = 0; j < keys.length; j++) {
                    if ((i & (1 << j))) {
                        var key = keys[j];
                        combination[key] = obj[key];
                    }
                }
                combinations.push(combination);
            }
        }
        Rho.Log.info(" " + JSON.stringify(combinations, null, 2), "APP");
        return combinations;
    }

    var txtfilepath = makeFilePath('txtfile.txt');
    var csvfilepath = makeFilePath('csvfile.csv');
    var xlsfilepath = makeFilePath('xlsfile.xls');
    var docfilepath = makeFilePath('docfile.doc');
    var htmlcssfilepath = makeFilePath('htmlfile.html');
    var jsfilepath = makeFilePath('jsfile.js');
    var cppfilepath = makeFilePath('cppfile.cpp');
    var pdffilepath = makeFilePath('pdffile.pdf');
    var hashzplfilepath = makeFilePath('hashzplfile.zpl');
    var hashccplfilepath = makeFilePath('hashccplfile.ccpl');
    var arrayzplfilepath = makeFilePath('arrayzplfile.zpl');
    var arrayccplfilepath = makeFilePath('arrayccplfile.ccpl');
    var invalidcontentsfilepath = makeFilePath('invalidcontetsfile');

    var pngimagepath_320px = makeFilePath('pngimagepath_320px.png');
    var pngimagepath_640px = makeFilePath('pngimagepath_640px.png');
    var pngimagepath_1024px = makeFilePath('pngimagepath_1024px.png');
    var pngimagepath_2048px = makeFilePath('pngimagepath_2048px.png');

    var jpgimagepath_320px = makeFilePath('jpgimagepath_320px.jpg');
    var jpgimagepath_640px = makeFilePath('jpgimagepath_640px.jpg');
    var jpgimagepath_1024px = makeFilePath('jpgimagepath_1024px.jpg');
    var jpgimagepath_2048px = makeFilePath('jpgimagepath_2048px.jpg');

    var gifimagepath_320px = makeFilePath('gifimagepath_320px.gif');
    var gifimagepath_640px = makeFilePath('gifimagepath_640px.gif');
    var gifimagepath_1024px = makeFilePath('gifimagepath_1024px.gif');
    var gifimagepath_2048px = makeFilePath('gifimagepath_2048px.gif');

    var bmpimagepath_320px = makeFilePath('bmpimagepath_320px.bmp');
    var bmpimagepath_640px = makeFilePath('bmpimagepath_640px.bmp');
    var bmpimagepath_1024px = makeFilePath('bmpimagepath_1024px.bmp');
    var bmpimagepath_2048px = makeFilePath('bmpimagepath_2048px.bmp');

    var printerDriveAndFileName = 'D:FILE.GRF';
    var printerOnlyFileName = 'FILE.GRF';
    var invalidfilepath = 'ZA://flder';


    var zplformatpath = 'e:zplformat.zpl';
    var hashzpl = {
        0: 'val1',
        5: 'val2',
        1: 'val3',
        25: 'val4',
        100: 'val5'
    };
    var ccplformatpath = 'e:ccplformat.ccpl';
    var hashccpl = {
        0: 'val1',
        1: 'val3',
        5: 'val2',
        25: 'val4',
        100: 'val5'
    };
    var invalidformatpath = 'bg:ccplformat.invalid';
    // hash should be parseable by javascript
    var invalidzplhash = {
        0: 'val1',
        10203: 'val1',
        2211: 'val1',
        '3355sasa': 'val1'
    };
    var arrayzpl = [0, 1, 10, 5, 20];
    var arrayccpl = [0, 1, 2, 3, 4, 5, 6];

    function displaySearchResults(paramaters, display_printers, display_errors) {
        var query = {
            'Parameters:': paramaters
        };
        if (display_errors.length > 0) {
            query['Errors:'] = display_errors;
        }
        if (display_printers.length > 0) {
            query['Discoveder printers:'] = display_printers;
        }

        displayPrinterResult(jasmine.getEnv().currentSpec.description, query);
    }

    function PrinterConnectiontype() {
        //connect_type = Rho.PrinterZebra.connectionType;
        $('#connectionType').show();
        //$('#connectionType').empty();
        //document.getElementById("connectionType").innerTEXT = connect_type;
        //$('#connectionType').html(connect_type);
    }

    function enumerateCallback(callbackValue) {
        if (callbackValue.length > 0) {
            displayPrinterResult('Result:', callbackValue);
        } else {
            displayPrinterResult('Result:', 'Could not find callbackValue types.');
        }
    }

    function handleStatusCallback(callbackValue) {
        if (callbackValue == Rho.PrinterZebra.PRINTER_STATUS_SUCCESS) {
            displayPrinterResult('Result:', callbackValue);
        } else {
            displayPrinterResult('Error:', callbackValue);
        }
    }

    function connectCallback(callbackValue) {
        if (callbackValue) {
            displayPrinterResult('Result:', callbackValue);
        } else {
            displayPrinterResult('Result:', 'Nil value');
        }
    }

    function retrieveCallback(callbackValue) {
        if (callbackValue.status == Rho.PrinterZebra.PRINTER_STATUS_SUCCESS) {
            displayPrinterResult('Result:', callbackValue);
        } else if (callbackValue.status == Rho.PrinterZebra.PRINTER_STATUS_ERROR) {
            displayPrinterResult('Result:', callbackValue);
        } else {
            displayPrinterResult('Result:', callbackValue);
        }
    }

    function retrieveextensionCallback(callbackValue) {
        if (callbackValue.status == Rho.PrinterZebra.PRINTER_STATUS_SUCCESS) {
            displayPrinterResult('Result:', callbackValue);
        } else if (callbackValue.status == Rho.PrinterZebra.PRINTER_STATUS_ERROR) {
            displayPrinterResult('Result:', callbackValue);
        } else {
            displayPrinterResult('Result:', callbackValue);
        }
    }

    function requestStateCallback(callbackValue) {
        if (callbackValue.status == Rho.PrinterZebra.PRINTER_STATUS_SUCCESS) {
            displayPrinterResult('Result:', callbackValue);
        } else if (callbackValue.status == Rho.PrinterZebra.PRINTER_STATUS_ERROR) {
            displayPrinterResult('Result:', callbackValue.status);
        } else {
            displayPrinterResult('Result:', callbackValue);
        }
    }

    // put discovered printers in the one list and update input field values

    function setupDiscoverPrintersCallback(callbackValue) {
        $('#myList').append('<li>' + JSON.stringify(callbackValue, null, ' ') + '<li>');
        if (callbackValue.status == Rho.PrinterZebra.PRINTER_STATUS_SUCCESS && callbackValue.printerID && callbackValue.printerID.length > 0) {
            var printerId = callbackValue.printerID;
            printers_array.push(printerId);

            var printerInstance = Rho.PrinterZebra.getPrinterByID(printerId);
            last_found_printer = printerInstance;

            var printerType = printerInstance.printerType.replace('PRINTER_TYPE_', '');
            var connType = printerInstance.connectionType.replace('CONNECTION_TYPE_', '');
            var devName = printerType + '-' + connType + '@' + printerInstance.deviceAddress;
            var pid = printerInstance.connectionType + '|' + printerInstance.deviceAddress + '|' + printerInstance.devicePort;

            $('#dev_list').append($('<option>', {
                value: pid
            }).text(devName));
        } else if (callbackValue.status == Rho.PrinterZebra.PRINTER_STATUS_SUCCESS) {
            discovery_finished = true;

            $('#dev_list').val($('#dev_list option:eq(1)').val()).trigger('change');
        } else if (callbackValue.message == Rho.PrinterZebra.PRINTER_STATUS_ERROR) {
            discovery_finished = true;

            printers_errors.push(callbackValue);
        }
    }

    // regular search callback

    function searchPrinterCallback(callbackValue) {
        if (callbackValue.status == Rho.PrinterZebra.PRINTER_STATUS_SUCCESS && callbackValue.printerID && callbackValue.printerID.length > 0) {
            printers_array.push(callbackValue.printerID);
        } else if (callbackValue.status == Rho.PrinterZebra.PRINTER_STATUS_SUCCESS) {
            discovery_finished = true;
        } else {
            printers_errors.push(callbackValue);
            discovery_finished = true;
        }
    }

    beforeEach(function() {
        document.getElementById('actResult').innerHTML = 'init';
        $('#select_box_wrapper').empty();
        discovery_finished = false;
        connectFlag = false;
        stopsearch = '';
        deviceaddressFlag = false;
        retrievedFlag = false;
        connect_status = '';
        $('#myList').empty();
        $('#event_list').empty();

        printers_array = [];
        printers_errors = [];
    });

    afterEach(function() {});

    // setup 
    it('initialize before tests', function() {
        runs(function() {
            setObjective(jasmine.getEnv().currentSpec.description);
            setInstruction('Wait until devices are discovered to continue');
            setExpected('Press any button to continute');
            $('#dev_list').empty();
            $('#dev_list').prepend('<option value=\'\'>none</option>').val('');
            $('#dev_list').change(function() {
                var valueSelected = $(this).val();
                if (valueSelected == '') {
                    $('#dev_addr').val('127.0.0.1');
                    $('#dev_port').val('6101');
                    $('#dev_conn_type').val(Rho.PrinterZebra.CONNECTION_TYPE_TCP);
                } else {
                    var res = valueSelected.split('|');
                    $('#dev_conn_type').val(res[0]);
                    $('#dev_addr').val(res[1]);
                    $('#dev_port').val(res[2]);
                }
            });
        });

        runs(function() {
            Rho.PrinterZebra.searchPrinters({}, setupDiscoverPrintersCallback);
        });

        waitsFor(function() {
            return discovery_finished;
        }, '60sec waiting for Search printer', ENABLE60K);

        runs(function() {
            displaySearchResults({}, printers_array, printers_errors);
            expect(printers_errors).toEqual([]);
            expect(printers_array.length).toBeGreaterThan(0);
        });
    });

    // call function 
    describe('enumerateSupportedTypes method', function() {
        it('using result', function() {
            runs(function() {
                var printerTypes = Rho.PrinterZebra.enumerateSupportedTypes();
                expect(printerTypes).toEqual([Rho.PrinterZebra.PRINTER_TYPE_ZEBRA]);
            });
        });
        it('using callback', function() {
            var enumCb = null;

            function enumerateCallback(callbackValue) {
                enumCb = callbackValue;
            }
            runs(function() {
                Rho.PrinterZebra.enumerateSupportedTypes(enumerateCallback);
            });
            waitsFor(function() {
                return enumCb !== null;
            }, 'Timed out waiting for testing callback', 2000);
            runs(function() {
                expect(enumCb).toEqual([Rho.PrinterZebra.PRINTER_TYPE_ZEBRA]);
            });
        });
        it('using anonymous callback', function() {
            var enumCb = null;

            runs(function() {
                Rho.PrinterZebra.enumerateSupportedTypes(
                    function(callbackValue) {
                        enumCb = callbackValue;
                    });
            });
            waitsFor(function() {
                return enumCb !== null;
            }, 'Timed out waiting for testing callback', 2000);
            runs(function() {
                expect(enumCb).toEqual([Rho.PrinterZebra.PRINTER_TYPE_ZEBRA]);
            });
        });
    });

    // search printer automatically with all available parameters
    describe('searchPrinters Method', function() {
        var searchParamaters = {};

        beforeEach(function() {
            printers_array = [];
            printers_errors = [];
            searchParamaters = {};
        });

        // generator for search

        function generateSearchTest(description, searchParamaters, shouldFail) {
            it(description, function() {
                var searchVals = {};
                runs(function() {
                    if (searchParamaters['printerType']) {
                        searchVals['printerType'] = Rho.Printer.PRINTER_TYPE_ZEBRA;
                    }
                    if (searchParamaters['connectionType']) {
                        searchVals['connectionType'] = $('#dev_conn_type').val();
                    }
                    if (searchParamaters['timeout']) {
                        searchVals['timeout'] = 5000;
                    }
                    if (searchParamaters['devicePort']) {
                        searchVals['devicePort'] = $('#dev_port').val();
                    }
                    if (searchParamaters['deviceAddress']) {
                        searchVals['deviceAddress'] = $('#dev_addr').val();
                    }
                    Rho.PrinterZebra.searchPrinters(searchVals, searchPrinterCallback);
                });

                waits(2000);

                runs(function() {
                    // check if search was ended before printer discovery
                    if (searchVals['timeout'] && !searchParamaters['deviceAddress']) {
                        expect(discovery_finished).toEqual(false);
                    }
                });

                waitsFor(function() {
                    return discovery_finished;
                }, '20sec waiting for Search printer', 7000);

                runs(function() {
                    displaySearchResults(searchVals, printers_array, printers_errors);
                });

                runs(function() {
                    if (shouldFail) {
                        expect(printers_errors.length).toBeGreaterThan(0);
                    } else {
                        expect(printers_errors).toEqual([]);
                        expect(printers_array.length).toBeGreaterThan(0);
                    }
                });
            });
        }

        // search params
        // due to function is
        searchParamaters = {
            'printerType': true,
            'connectionType': true,
            'timeout': true,
            'devicePort': true,
            'deviceAddress': true,
        };

        // test all the combinations
        var combinations = makeAllCombinationsOfFileds(searchParamaters);

        for (var i = 0; i < combinations.length; i++) {
            var obj = combinations[i];
            var keys = objkeys(obj);
            var description = '(default options)';
            if (keys.length > 0) {
                description = '(with options ' + keys.join(', ') + ')';
            }
            generateSearchTest(description, obj, false);
        }

    });


    var errorCode = null;
    var usedPrinter = null;

    describe('should getPrinterByID', function() {
        // find printer
        it('and get base properties', function() {
            var searchVals = {};
            runs(function() {
                searchVals = {};
                searchVals.devicePort = $('#dev_port').val();
                searchVals.deviceAddress = $('#dev_addr').val();
                searchVals.connectionType = $('#dev_conn_type').val();
                Rho.PrinterZebra.searchPrinters(searchVals, searchPrinterCallback);
            });

            waitsFor(function() {
                return discovery_finished;
            }, '20sec waiting for Search printer', 7000);

            runs(function() {
                displaySearchResults(searchVals, printers_array, printers_errors);
            });

            runs(function() {
                expect(printers_errors).toEqual([]);
                expect(printers_array.length).toBeGreaterThan(0);

                usedPrinter = printers_array[0];

                expect(usedPrinter).toNotEqual(null);

                var thisprinter = Rho.PrinterZebra.getPrinterByID(usedPrinter);
                expect(thisprinter).toNotEqual(null);

                expect(parseInt(thisprinter.devicePort, 10)).toEqual(parseInt($('#dev_port').val(), 10));
                expect(thisprinter.deviceAddress).toEqual($('#dev_addr').val());
                expect(thisprinter.connectionType).toEqual($('#dev_conn_type').val());
                expect(thisprinter.isConnected).isNotEmptyString();
            });
        });
    });

    // connect printers
    describe('connect and disconnect methods', function() {
        // just connect
        it('should just connect', function() {
            var thisprinter = null;
            var callresult = null;

            runs(function() {
                expect(usedPrinter).toNotEqual(null);
                thisprinter = Rho.PrinterZebra.getPrinterByID(usedPrinter);
                callresult = null;
                thisprinter.disconnect(function(result) {
                    callresult = result;
                });
            });

            waitsFor(function() {
                return callresult !== null;
            }, 'wait until disconnected', 7000);

            runs(function() {
                expect(callresult).toEqual(Rho.PrinterZebra.PRINTER_STATUS_SUCCESS);
                expect(thisprinter.isConnected).toEqual(false);
            });

            runs(function() {
                thisprinter.connect();
            });
        });

        // connect without callback, wait for property isConnected to become 'true'
        it('should just connect, wait for isConnected', function() {
            var thisprinter = null;
            var callresult = null;

            runs(function() {
                expect(usedPrinter).toNotEqual(null);
                thisprinter = Rho.PrinterZebra.getPrinterByID(usedPrinter);
                callresult = null;
                thisprinter.disconnect(function(result) {
                    callresult = result;
                });
            });

            waitsFor(function() {
                return callresult !== null;
            }, 'wait until disconnected', 7000);

            runs(function() {
                expect(callresult).toEqual(Rho.PrinterZebra.PRINTER_STATUS_SUCCESS);
                expect(thisprinter.isConnected).toEqual(false);
            });

            runs(function() {
                thisprinter.connect();
            });
            waitsFor(function() {
                return thisprinter.isConnected == true;
            }, 'wait untill connect', 7000);
        });

        function generateConnectWithParams(connectparams) {
            // connect and wait for callback
            it('should just connect with callback params' + JSON.stringify(connectparams, null, " "), function() {
                var thisprinter = null;
                var callresult = null;

                runs(function() {
                    expect(usedPrinter).toNotEqual(null);
                    thisprinter = Rho.PrinterZebra.getPrinterByID(usedPrinter);
                    callresult = null;
                    thisprinter.disconnect(function(result) {
                        callresult = result;
                    });
                });

                waitsFor(function() {
                    return callresult != null;
                }, 'wait until disconnected', 2000);

                runs(function() {
                    expect(callresult).toEqual(Rho.PrinterZebra.PRINTER_STATUS_SUCCESS);
                    expect(thisprinter.isConnected).toEqual(false);
                });

                runs(function() {
                    callresult = null;
                    thisprinter.connect(connectparams, function cbk(val) {
                        callresult = val;
                    });
                });
                waitsFor(function() {
                    return callresult != null;
                }, 'wait while disconnected', 2000);

                runs(function() {
                    expect(callresult).toEqual(Rho.PrinterZebra.PRINTER_STATUS_SUCCESS);
                    expect(thisprinter.isConnected).toEqual(true);
                });
            });
        }

        var connectParams = [{}, {
            "timeout": 20000
        }, {
            "timeout": 0
        }, {
            "timeout": 1000
        }, {
            "timeout": 15000.5
        }, ];

        for (var i = 0; i < connectParams.length; i++) {
            generateConnectWithParams(connectParams[i]);
        }
    });


    ////////////////////////////////
    var thisprinter = null;
    var callresult = null;

    function cbk(val) {
        callresult = val;
    }

    function doConnect() {
        runs(function() {
            expect(usedPrinter).toNotEqual(null);
            thisprinter = Rho.PrinterZebra.getPrinterByID(usedPrinter);
            callresult = null;
            thisprinter.connect({}, cbk);
        });

        waitsFor(function() {
            return callresult !== null;
        }, 'wait until connected', 7000);

        runs(function() {
            expect(callresult).toEqual(Rho.PrinterZebra.PRINTER_STATUS_SUCCESS);
            expect(thisprinter.isConnected).toEqual(true);
        });
    }

    function doPrintTestLabel() {
        runs(function() {
            callresult = null;
            thisprinter.printRawString(makeTestLabel(), {}, cbk);
        });

        waitsFor(function() {
            return callresult !== null;
        }, 'wait until printingLabel', 7000);

        runs(function() {
            expect(callresult.status).toEqual(Rho.PrinterZebra.PRINTER_STATUS_SUCCESS);
        });
    }

    function doSetLabelLength(len) {
        runs(function() {
            callresult = null;
            thisprinter.printRawString('^XA^MNN^LL' + len + '^XA^JUS^XZ', {}, cbk);
        });

        waitsFor(function() {
            return callresult !== null;
        }, 'wait until setting lable length', 7000);
    }

    function doPrintPrintFile(filename, options, isOk) {
        runs(function() {
            callresult = null;
            thisprinter.printFile(filename, options, cbk);
        });

        waitsFor(function() {
            return callresult !== null;
        }, 'wait until printingFile', 7000);

        runs(function() {
            if (isOk !== false) {
                expect(callresult).toEqual(Rho.PrinterZebra.PRINTER_STATUS_SUCCESS);
            } else {
                expect(callresult).toNotEqual(Rho.PrinterZebra.PRINTER_STATUS_SUCCESS);
            }
        });
    }

    function doPrintRawCommand(cmd) {
        runs(function() {
            callresult = null;
            thisprinter.printRawString(cmd, {}, cbk);
        });

        waitsFor(function() {
            return callresult !== null;
        }, 'wait until setting lable length', 7000);
    }

    // 
    describe('printFile method', function() {
        it('should just print label', function() {
            doConnect();
            doPrintTestLabel();
        });

        it('should print png with callback', function() {
            doPrintTestLabel();
            doSetLabelLength(500);
            doPrintPrintFile(pngimagepath_320px, {});
        });

        it('should print jpeg with callback', function() {
            doPrintTestLabel();
            doSetLabelLength(500);
            doPrintPrintFile(jpgimagepath_320px, {});
        });
        it('should not print bmp with callback', function() {
            doPrintTestLabel();
            doSetLabelLength(500);
            doPrintPrintFile(bmpimagepath_320px, {}, false);
        });
        it('should not print pdf with callback', function() {
            doPrintTestLabel();
            doSetLabelLength(500);
            doPrintPrintFile(pdffilepath, {}, false);
        });
        it('should not print empty filename with callback', function() {
            doPrintTestLabel();
            doSetLabelLength(500);
            doPrintPrintFile('', {}, false);
        });
        it('should not print invalid filename with callback', function() {
            doPrintTestLabel();
            doSetLabelLength(500);
            doPrintPrintFile(invalidfilepath, {}, false);
        });
    });

    describe('printRawString method', function() {
        it('should just print label', function() {
            doConnect();
            doPrintTestLabel();
        });

        it('should print ZPL Command with callback', function() {
            doPrintTestLabel();
            doPrintRawCommand(CommandZPL);
        });
        it('should print CPCL Command with callback', function() {
            doPrintTestLabel();
            //doPrintRawCommand(CommandCCPL);
        });
    });
});
