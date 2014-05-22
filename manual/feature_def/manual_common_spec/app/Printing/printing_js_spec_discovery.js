describe('Printing Generic', function() {
    var ENABLE9K = 9000;
    var ENABLE10K = 10000;
	var ENABLE30K = 30000;
    var ENABLE60K = 60000;
    var ENABLE120K = 120000;
    var ENABLE5MIN = 300000;
    var ENABLE30MIN = 1800000;
    var connect_type = Rho.Printer.CONNECTION_TYPE_TCP;
    var CommandZPL = '^XA^FO50,50^ADN,36,20^FDPrinting Generic ZPL^FS^XZ';
    var CommandCCPL = '"! 0 200 200 210 1\r\nTEXT 4 0 30 40 Printing Generic CCPL\r\nFORM\r\nPRINT\r\n';
    var last_found_printer_id = null;

    beforeEach(function() {
        document.getElementById('actResult').innerHTML = 'init';
        $('#select_box_wrapper').empty();
        $('#myList').empty();
        $('#event_list').empty();
    });

    afterEach(function() {});

    // setup 
    it('initialize before tests', function() {
        var searchObject = {};

        runs(function() {
            setObjective(jasmine.getEnv().currentSpec.description);
            setInstruction('Select desired discovery mode');
        });

        _result.waitForSelectTestMode();

        runs(function() {
            if (_result.auto_fill === false) {
                setInstruction('Set device type, address and port, then press "done button"');
            } else {
                setInstruction('Wait until devices are discovered to continue');
            }
        });

        _result.waitUntilDone(function(){ return _result.auto_fill === false; });

        runs(function() {
            if (_result.auto_fill == true) {
                searchObject = runSearch({}, 30000);
            } else {
                searchVals = {};
                searchVals['connectionType'] = $('#dev_conn_type').val();
                searchVals['devicePort'] = $('#dev_port').val();
                searchVals['deviceAddress'] = $('#dev_addr').val();
                searchObject = runSearch(searchVals, 30000);
            }
            setExpected('');
            setupTestFields();
        });

        waitsFor(function() {
            return searchObject.finished;
        }, '60sec waiting for Search printer', ENABLE60K);

        runs(function() {
            setInstruction('Use drop-down list to select tested device and then press "done" button.');
            setExpected('There shopud be at least one device to select.');
            if (searchObject.printers.length > 0) {
                displaySearchResults({}, searchObject.printers, searchObject.errors);
                updatePrinterList(searchObject.printers);
                last_found_printer_id = searchObject.printers[0];
            }
            expect(searchObject.errors).toEqual([]);
            expect(searchObject.printers.length).toBeGreaterThan(0);
        });

        _result.waitUntilDone(function(){ return _result.auto_fill === true; });

        runs(function() {
            var printerSettings = $('#dev_list').val().split('|');
            last_found_printer_id = printerSettings[3];
            window.onunload = function(){
                var printer = Rho.Printer.getPrinterByID(last_found_printer_id);
                printer.disconnect();
            };
            last_found_printer = Rho.Printer.getPrinterByID(last_found_printer_id);
        });
    });


    // search printer automatically with all available parameters
    describe('searchPrinters Method', function() {
        var searchParamaters = {};

        beforeEach(function() {
            searchParamaters = {};
        });

        // generator for search

        function generateSearchTest(description, searchParamaters) {
            it(description, function() {
                var searchVals = {};
                var searchObj = {}
               var shouldFail = false;
               var isTimeout = false;
                runs(function() {
                    if (searchParamaters['printerType']) {
                        searchVals['printerType'] = Rho.Printer.PRINTER_TYPE_ZEBRA;
                    }
                    if (searchParamaters['connectionType']) {
                        searchVals['connectionType'] = $('#dev_conn_type').val();
                    }
                    if (searchParamaters['timeout']) {
                        searchVals['timeout'] = 100;
                        isTimeout = true;
                    }
                    if (searchParamaters['devicePort']) {
                        searchVals['devicePort'] = $('#dev_port').val();
                    }
                    if (searchParamaters['deviceAddress']) {
                        searchVals['deviceAddress'] = $('#dev_addr').val();
                    }
                     if (searchParamaters['shouldFailed']) {
                        shouldFail = true;
                     }
                    searchObject = runSearch(searchVals, 35000);
                });

                waits(ENABLE30K);

                runs(function() {
                    // check if search was ended before printer discovery
                    //if (searchParamaters['timeout'] && !searchParamaters['deviceAddress'] && $('#dev_conn_type').val() != Rho.PrinterZebra.CONNECTION_TYPE_BLUETOOTH) {
                    if (isTimeout) {
                        expect(searchObject.finished).toEqual(true);
                    }
                });

                waitsFor(function() {
                    return searchObject.finished;
                }, '60sec waiting for Search printer', ENABLE60K);

                runs(function() {
                    displaySearchResults(searchVals, searchObject.printers, searchObject.errors);
                });

                runs(function() {
                     if (!isTimeout) {
                       if (shouldFail) {
                           expect(searchObject.errors).toEqual([]);
                           expect(searchObject.printers.length).toEqual(0);
                           //expect(searchObject.errors).toBeGreaterThan(0);
                       } else {
                           expect(searchObject.errors).toEqual([]);
                           expect(searchObject.printers.length).toBeGreaterThan(0);
                       }
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
        //var combinations = makeAllCombinationsOfFileds(searchParamaters);
        var combinations = [
                            {    'printerType': false,  'connectionType': false,    'timeout': false,   'devicePort': false,    'deviceAddress': false, 'shouldFailed': false},
                            {    'printerType': false,  'connectionType': false,    'timeout': false,   'devicePort': false,    'deviceAddress': true,  'shouldFailed': false},
                            {    'printerType': false,  'connectionType': false,    'timeout': false,   'devicePort': true,     'deviceAddress': false, 'shouldFailed': false},
                            {    'printerType': false,  'connectionType': false,    'timeout': false,   'devicePort': true,     'deviceAddress': true,  'shouldFailed': false},
                            {    'printerType': false,  'connectionType': false,    'timeout': true,    'devicePort': false,    'deviceAddress': false, 'shouldFailed': true},
                            {    'printerType': false,  'connectionType': false,    'timeout': true,    'devicePort': false,    'deviceAddress': true,  'shouldFailed': true},
                            {    'printerType': false,  'connectionType': false,    'timeout': true,    'devicePort': true,     'deviceAddress': false, 'shouldFailed': true},
                            {    'printerType': false,  'connectionType': false,    'timeout': true,    'devicePort': true,     'deviceAddress': true,  'shouldFailed': true},
                            {    'printerType': false,  'connectionType': true,     'timeout': false,   'devicePort': false,    'deviceAddress': false, 'shouldFailed': false},
                            {    'printerType': false,  'connectionType': true,     'timeout': false,   'devicePort': false,    'deviceAddress': true,  'shouldFailed': false},
                            {    'printerType': false,  'connectionType': true,     'timeout': false,   'devicePort': true,     'deviceAddress': false, 'shouldFailed': false},
                            {    'printerType': false,  'connectionType': true,     'timeout': false,   'devicePort': true,     'deviceAddress': true,  'shouldFailed': false},
                            {    'printerType': false,  'connectionType': true,     'timeout': true,    'devicePort': false,    'deviceAddress': false, 'shouldFailed': true},
                            {    'printerType': false,  'connectionType': true,     'timeout': true,    'devicePort': false,    'deviceAddress': true,  'shouldFailed': true},
                            {    'printerType': false,  'connectionType': true,     'timeout': true,    'devicePort': true,     'deviceAddress': false, 'shouldFailed': true},
                            {    'printerType': false,  'connectionType': true,     'timeout': true,    'devicePort': true,     'deviceAddress': true,  'shouldFailed': true},
                            {    'printerType': true,   'connectionType': false,    'timeout': false,   'devicePort': false,    'deviceAddress': false, 'shouldFailed': false},
                            {    'printerType': true,   'connectionType': false,    'timeout': false,   'devicePort': false,    'deviceAddress': true,  'shouldFailed': false},
                            {    'printerType': true,   'connectionType': false,    'timeout': false,   'devicePort': true,     'deviceAddress': false, 'shouldFailed': false},
                            {    'printerType': true,   'connectionType': false,    'timeout': false,   'devicePort': true,     'deviceAddress': true,  'shouldFailed': false},
                            {    'printerType': true,   'connectionType': false,    'timeout': true,    'devicePort': false,    'deviceAddress': false, 'shouldFailed': true},
                            {    'printerType': true,   'connectionType': false,    'timeout': true,    'devicePort': false,    'deviceAddress': true,  'shouldFailed': true},
                            {    'printerType': true,   'connectionType': false,    'timeout': true,    'devicePort': true,     'deviceAddress': false, 'shouldFailed': true},
                            {    'printerType': true,   'connectionType': false,    'timeout': true,    'devicePort': true,     'deviceAddress': true,  'shouldFailed': true},
                            {    'printerType': true,   'connectionType': true,     'timeout': false,   'devicePort': false,    'deviceAddress': false, 'shouldFailed': false},
                            {    'printerType': true,   'connectionType': true,     'timeout': false,   'devicePort': false,    'deviceAddress': true,  'shouldFailed': false},
                            {    'printerType': true,   'connectionType': true,     'timeout': false,   'devicePort': true,     'deviceAddress': false, 'shouldFailed': false},
                            {    'printerType': true,   'connectionType': true,     'timeout': false,   'devicePort': true,     'deviceAddress': true,  'shouldFailed': false},
                            {    'printerType': true,   'connectionType': true,     'timeout': true,    'devicePort': false,    'deviceAddress': false, 'shouldFailed': true},
                            {    'printerType': true,   'connectionType': true,     'timeout': true,    'devicePort': false,    'deviceAddress': true,  'shouldFailed': true},
                            {    'printerType': true,   'connectionType': true,     'timeout': true,    'devicePort': true,     'deviceAddress': false, 'shouldFailed': true},
                            {    'printerType': true,   'connectionType': true,     'timeout': true,    'devicePort': true,     'deviceAddress': true,  'shouldFailed': true},
             ];

        for (var i = 0; i < combinations.length; i++) {
            var obj = combinations[i];
            var keys = objkeys(obj);
            var description = '(default options)';
            if (keys.length > 0) {
                //description = '(with options ' + keys.join(', ') + ')';
                description = '(with options ';
                for (var j = 0; j < keys.length; j++) {
                    if (obj[keys[j]]) {
                        description = description + keys[j] + ', ';
                    }
                }
              description = description + ')';
            }
            generateSearchTest(description, obj);
        }

    });
});
