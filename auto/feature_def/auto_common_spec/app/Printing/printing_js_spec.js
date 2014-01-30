describe('Printing Generic', function() {

    var allEnumPrinters = [Rho.Printer.PRINTER_TYPE_ANY, Rho.Printer.PRINTER_TYPE_NATIVE, Rho.Printer.PRINTER_TYPE_ZEBRA, Rho.Printer.PRINTER_TYPE_EPSON, Rho.Printer.PRINTER_TYPE_APD]
    var printers_array = [];
    var printers_errors = [];
    var discovery_finished = false;
    var connect_type = Rho.Printer.CONNECTION_TYPE_TCP;
    var stopsearch = '';
    var deviceaddressFlag = false;
    var CommandZPL = '^XA^FO50,50^ADN,36,20^FDGenericPrinting^FS^XZ';
    var CommandCCPL = '"! 0 200 200 210 1\r\nTEXT 4 0 30 40 Hello World\r\nFORM\r\nPRINT\r\n';
    var connect_status = '';
    var last_found_printer = null;
    var last_found_printer_id = null;

    // DO NOT COPYPASTE IT!
    function makeFilePath(filename) {
        return Rho.RhoFile.join(Rho.Application.modelFolderPath('Printer'), Rho.RhoFile.join('PrinterFiles', filename));
    }

    function objkeys(obj) {
        var keys = [];
        $.each(obj, function(key, value) {
            keys.push(key);
        });
        return keys;
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

    function searchPrinterCallback(callbackValue) {
        if (callbackValue.status == Rho.Printer.PRINTER_STATUS_SUCCESS && callbackValue.printerID && callbackValue.printerID.length > 0) {
            printers_array.push(callbackValue.printerID);
        } else if (callbackValue.status == Rho.Printer.PRINTER_STATUS_SUCCESS) {
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
                    $('#dev_conn_type').val(Rho.Printer.CONNECTION_TYPE_TCP);
                } else {
                    var res = valueSelected.split('|');
                    $('#dev_conn_type').val(res[0]);
                    $('#dev_addr').val(res[1]);
                    $('#dev_port').val(res[2]);
                }
            });
        });

        runs(function() {
            Rho.Printer.searchPrinters({}, searchPrinterCallback);
        });

        waitsFor(function() {
            return discovery_finished;
        }, '60sec waiting for Search printer', 60000);

        runs(function() {
            for (var i = 0; i < printers_array.length; i++) {
                var printerInstance = Rho.Printer.getPrinterByID(printers_array[i]);
                last_found_printer_id = printers_array[i];
                last_found_printer = printerInstance;

                var printerType = printerInstance.printerType.replace('PRINTER_TYPE_', '');
                var connType = printerInstance.connectionType.replace('CONNECTION_TYPE_', '');
                var devName = printerType + '-' + connType + '@' + printerInstance.deviceAddress;
                var pid = printerInstance.connectionType + '|' + printerInstance.deviceAddress + '|' + printerInstance.devicePort;

                $('#dev_list').append($('<option>', {
                    value: pid
                }).text(devName));
            }
            $('#dev_list').val($('#dev_list option:eq(1)').val()).trigger('change');

            displaySearchResults({}, printers_array, printers_errors);
            expect(printers_errors).toEqual([]);
            expect(printers_array.length).toBeGreaterThan(0);
        });
    });


    // enumerateSupportedTypes 
    describe('enumerateSupportedTypes method', function() {
        it('using result', function() {
            runs(function() {
                var printerTypes = Rho.Printer.enumerateSupportedTypes();
                //alert(printerTypes);
                expect(printerTypes).toEqual(allEnumPrinters);
            });
        });
        it('using callback', function() {
            var enumCb = null;

            function enumerateCallback(callbackValue) {
                enumCb = callbackValue;
            }
            runs(function() {
                Rho.Printer.enumerateSupportedTypes(enumerateCallback);
            });
            waitsFor(function() {
                return enumCb !== null;
            }, 'Timed out waiting for testing callback', 2000);
            runs(function() {
                expect(enumCb).toEqual(allEnumPrinters);
            });
        });
        it('using anonymous callback', function() {
            var enumCb = null;

            runs(function() {
                Rho.Printer.enumerateSupportedTypes(
                    function(callbackValue) {
                        enumCb = callbackValue;
                    });
            });
            waitsFor(function() {
                return enumCb !== null;
            }, 'Timed out waiting for testing callback', 2000);
            runs(function() {
                expect(enumCb).toEqual(allEnumPrinters);
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
                    Rho.Printer.searchPrinters(searchVals, searchPrinterCallback);
                });

                waits(2000);

                runs(function() {
                    // check if search was ended before printer discovery
                    if (searchParamaters['timeout'] && !searchParamaters['deviceAddress'] && $('#dev_conn_type').val()!=Rho.Printer.CONNECTION_TYPE_BLUETOOTH) {
                        expect(discovery_finished).toEqual(false);
                    }
                });

                waitsFor(function() {
                    return discovery_finished;
                }, '20sec waiting for Search printer', 20000);

                // runs(function() {
                //     displaySearchResults(searchVals, printers_array, printers_errors);
                // });

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


    // getPrinterByID
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
                Rho.Printer.searchPrinters(searchVals, searchPrinterCallback);
            });

            waitsFor(function() {
                return discovery_finished;
            }, '20sec waiting for Search printer', 20000);

            // runs(function() {
            //     displaySearchResults(searchVals, printers_array, printers_errors);
            // });

            runs(function() {
                expect(printers_errors).toEqual([]);
                expect(printers_array.length).toBeGreaterThan(0);

                //usedPrinter = printers_array[0];

                expect(last_found_printer_id).toNotEqual(null);

                var thisprinter = Rho.Printer.getPrinterByID(last_found_printer_id);
                //thisprinter.connect();
                expect(thisprinter).toNotEqual(null);

                expect(parseInt(thisprinter.devicePort, 10)).toEqual(parseInt($('#dev_port').val(), 10));
                expect(thisprinter.deviceAddress).toEqual($('#dev_addr').val());
                expect(thisprinter.connectionType).toEqual($('#dev_conn_type').val());
                //expect(thisprinter.isConnected).toEqual(true);
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
                expect(last_found_printer_id).toNotEqual(null);
                thisprinter = Rho.Printer.getPrinterByID(last_found_printer_id);
                callresult = null;
                thisprinter.disconnect(function(result) {
                    callresult = result;
                });
            });

            waitsFor(function() {
                return callresult !== null;
            }, 'wait until connected', 10000);

            runs(function() {
                expect(callresult).toEqual(Rho.Printer.PRINTER_STATUS_SUCCESS);
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
                expect(last_found_printer_id).toNotEqual(null);
                thisprinter = Rho.Printer.getPrinterByID(last_found_printer_id);
                callresult = null;
                thisprinter.disconnect(function(result) {
                    callresult = result;
                });
            });

            waitsFor(function() {
                return callresult !== null;
            }, 'wait until disconnected', 10000);

            runs(function() {
                expect(callresult).toEqual(Rho.Printer.PRINTER_STATUS_SUCCESS);
                expect(thisprinter.isConnected).toEqual(false);
            });

            runs(function() {
                thisprinter.connect();
            });
            waitsFor(function() {
                return thisprinter.isConnected == true;
            }, 'wait untill connect', 10000);
            runs(function() {
                expect(thisprinter.isConnected).toEqual(true);
            });

        });

    // connectWithOptions not implemented
    /*  function generateConnectWithParams(connectparams) {
            // connect and wait for callback
            it('should just connect with callback params' + JSON.stringify(connectparams, null, " "), function() {
                var thisprinter = null;
                var callresult = null;

                runs(function() {
                    expect(last_found_printer_id).toNotEqual(null);
                    thisprinter = Rho.Printer.getPrinterByID(last_found_printer_id);
                    callresult = null;
                    thisprinter.disconnect(function(result) {
                        callresult = result;
                    });
                });

                waitsFor(function() {
                    return callresult != null;
                }, 'wait until disconnected', 5000);

                runs(function() {
                    expect(callresult).toEqual(Rho.Printer.PRINTER_STATUS_SUCCESS);
                    expect(thisprinter.isConnected).toEqual(false);
                });

                runs(function() {
                    callresult = null;
                    thisprinter.connectWithOptions(connectparams, function cbk(val) {
                        callresult = val;
                    });
                });
                waitsFor(function() {
                    return callresult != null;
                }, 'wait while disconnected', 5000);

                runs(function() {
                    expect(callresult).toEqual(Rho.Printer.PRINTER_STATUS_SUCCESS);
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
        }   */
    });


    
    var thisprinter = null;
    var callresult = null;
   
    function doConnect() {

        runs(function() {
            expect(last_found_printer_id).toNotEqual(null);
            thisprinter = Rho.Printer.getPrinterByID(last_found_printer_id);
            callresult = null;
            if (thisprinter.isConnected == false){
                thisprinter.connect(function(val){
                    callresult = val;
                });
                waitsFor(function() {
                    return callresult !== null;
                }, 'wait until connected', 10000);
            }
            expect(callresult).toEqual(Rho.Printer.PRINTER_STATUS_SUCCESS);
        });

        runs(function() {
            expect(thisprinter.isConnected).toEqual(true);
            callresult = null;
        });
    }


    // enumerateSupportedControlLanguages
    describe('enumerateSupportedControlLanguages method', function() {
        it('should connect', function() {
            doConnect();
        });
        
        it('using result', function() {
            runs(function() {
                var languagesTypes = thisprinter.enumerateSupportedControlLanguages();
                expect(languagesTypes).toEqual([Rho.Printer.PRINTER_LANGUAGE_ZPL, Rho.Printer.PRINTER_LANGUAGE_CPCL]);
            });
        });
        it('using callback', function() {
            var enumCb = null;

            function enumerateControlLanguagesCallback(callbackValue) {
                enumCb = callbackValue;
            }
            runs(function() {
                thisprinter.enumerateSupportedControlLanguages(enumerateControlLanguagesCallback);
            });
            waitsFor(function() {
                return enumCb !== null;
            }, 'Timed out waiting for testing callback', 2000);
            
            runs(function() {
                expect(enumCb).toEqual([Rho.Printer.PRINTER_LANGUAGE_ZPL, Rho.Printer.PRINTER_LANGUAGE_CPCL]);
            });
        });
        it('using anonymous callback', function() {
            var enumCb = null;

            runs(function() {
                thisprinter.enumerateSupportedControlLanguages(function(callbackValue){
                        enumCb = callbackValue;
                });
            });
            waitsFor(function() {
                return enumCb !== null;
            }, 'Timed out waiting for testing callback', 2000);
            runs(function() {
                expect(enumCb).toContain([Rho.Printer.PRINTER_LANGUAGE_ZPL, Rho.Printer.PRINTER_LANGUAGE_CPCL, Rho.Printer.PRINTER_LANGUAGE_EPS]);
            });
        });
    });

    
    // Get Printer properties
    describe("Getting properties of the connected printer", function() {
        
        var connected = false;
        var printer_instance = '';
        runs(function(){
            printer_instance = Rho.Printer.getPrinterByID(last_found_printer_id);
            //alert(typeof(printer_instance));
            printer_instance.connect(function(data){
                connected = true;
            });
        });
        waitsFor(function(){
            if(connected){
                return true;
            }
        },20000);


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
    });

		
});
