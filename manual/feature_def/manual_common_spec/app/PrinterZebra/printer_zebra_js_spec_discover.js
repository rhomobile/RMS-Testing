describe('Printer Zebra', function() {
    var ENABLE9K = 9000;
    var ENABLE10K = 10000;
    var ENABLE60K = 60000;
    var ENABLE120K = 120000;
    var ENABLE5MIN = 300000;
    var ENABLE30MIN = 1800000;
    var connect_type = Rho.PrinterZebra.CONNECTION_TYPE_TCP;
    var CommandZPL = '^XA^FO50,50^ADN,36,20^FDZebraPrinting^FS^XZ';
    var CommandCCPL = '"! 0 200 200 210 1\r\nTEXT 4 0 30 40 Hello World\r\nFORM\r\nPRINT\r\n';
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
            setInstruction('Wait until devices are discovered to continue');
            setExpected('Press any button to continute');
            setupTestFields();
        });

        runs(function() {
            searchObject = runSearch({}, 15000);
        });

        waitsFor(function() {
            return searchObject.finished;
        }, '60sec waiting for Search printer', ENABLE60K);

        runs(function() {
            if (searchObject.printers.length > 0) {
                displaySearchResults({}, searchObject.printers, searchObject.errors);
                updatePrinterList(searchObject.printers);
                last_found_printer_id = searchObject.printers[0];
            }
            expect(searchObject.errors).toEqual([]);
            expect(searchObject.printers.length).toBeGreaterThan(0);
        });
    });


    // search printer automatically with all available parameters
    describe('searchPrinters Method', function() {
        var searchParamaters = {};

        beforeEach(function() {
            searchParamaters = {};
        });

        // generator for search

        function generateSearchTest(description, searchParamaters, shouldFail) {
            it(description, function() {
                var searchVals = {};
                var searchObj = {}
                runs(function() {
                    if (searchParamaters['printerType']) {
                        searchVals['printerType'] = Rho.Printer.PRINTER_TYPE_ZEBRA;
                    }
                    if (searchParamaters['connectionType']) {
                        searchVals['connectionType'] = $('#dev_conn_type').val();
                    }
                    if (searchParamaters['timeout']) {
                        searchVals['timeout'] = 10000;
                    }
                    if (searchParamaters['devicePort']) {
                        searchVals['devicePort'] = $('#dev_port').val();
                    }
                    if (searchParamaters['deviceAddress']) {
                        searchVals['deviceAddress'] = $('#dev_addr').val();
                    }
                    searchObject = runSearch(searchVals, 15000);
                });

                waits(2000);

                runs(function() {
                    // check if search was ended before printer discovery
                    if (searchParamaters['timeout'] && !searchParamaters['deviceAddress'] && $('#dev_conn_type').val() != Rho.PrinterZebra.CONNECTION_TYPE_BLUETOOTH) {
                        expect(searchObject.finished).toEqual(false);
                    }
                });

                waitsFor(function() {
                    return searchObject.finished;
                }, '20sec waiting for Search printer', 20000);

                runs(function() {
                    displaySearchResults(searchVals, searchObject.printers, searchObject.errors);
                });

                runs(function() {
                    if (shouldFail) {
                        expect(searchObject.errors).toBeGreaterThan(0);
                    } else {
                        expect(searchObject.errors).toEqual([]);
                        expect(searchObject.printers.length).toBeGreaterThan(0);
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
});
