
describe('Printing Generic', function() {

    //var allEnumPrinters = [Rho.Printer.PRINTER_TYPE_ANY, Rho.Printer.PRINTER_TYPE_NATIVE, Rho.Printer.PRINTER_TYPE_ZEBRA, Rho.Printer.PRINTER_TYPE_EPSON, Rho.Printer.PRINTER_TYPE_APD]
    var allEnumPrinters = [Rho.Printer.PRINTER_TYPE_ZEBRA]
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
    //var testResult = null;

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

/*  function displayTestDescription(aString) {
        $("#description").text(aString);
    }

    function displayTestInstruction(aString) {
        $("#instruction").text(aString);
    }

    function displayTestExpectation(aString) {
        $("#expectation").text(aString);
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

    function stopSearchPrinterCallback(printer) {
        testResult = printer.status;
        if (testResult.toLowerCase().indexOf("STATUS_ERROR") <= 0) {
            testResult = "STATUS_SUCCESS";
        } else {
            testResult = "STATUS_ERROR";
        }
    } */

    function searchPrinterCallback(callbackValue) {
        if (callbackValue.status == Rho.Printer.PRINTER_STATUS_SUCCESS && callbackValue.printerID && callbackValue.printerID.length > 0) {
            printers_array.push(callbackValue.printerID);
        } else if (callbackValue.status == Rho.Printer.PRINTER_STATUS_SUCCESS) {
            discovery_finished = true;
        } else {
            printers_errors.push(callbackValue);
            discovery_finished = true;
            //location = location;
        }
    }


    beforeEach(function() {
        //document.getElementById('actResult').innerHTML = 'init';
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

        var matchers = {
            isNotEmptyString: function () {
                return (typeof this.actual == 'string') && (this.actual.length != 0)
            }
        };
        this.addMatchers(
            matchers
        );
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
        }, '60sec waiting for Search printer', 60000);

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

    
    // enumerateSupportedTypes tests
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



    // search printer automatically with all available parameters - moved to discovery
    xdescribe('searchPrinters Method', function() {
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
        
        it('disconnect and try to print should return status error', function() {
            var callresult = null;
            var thisprinter = null;
            var CommandZPL = '^XA^FO50,50^ADN,36,20^FDPrinting^FS^XZ';
            expect(last_found_printer_id).toNotEqual(null);
            thisprinter = Rho.Printer.getPrinterByID(last_found_printer_id);

            if (thisprinter.isConnected == false){
                thisprinter.connect(function(val){
                    callresult = val;
                });
                waitsFor(function() {
                    return callresult !== null;
                }, 'wait until connected', 10000);
            }
            runs(function() {
                expect(thisprinter.isConnected).toEqual(true);
            });
            runs(function() {
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
				callresult = null;
                thisprinter.printRawString(CommandZPL, {}, function(val){
                    callresult = val;
                });
            });

            waitsFor(function() {
                return callresult !== null;
            }, 'wait.. trying to print..', 15000);

            runs(function() {
                expect(callresult.status).toEqual(Rho.Printer.PRINTER_STATUS_ERR_NOT_CONNECTED);
            });
        });


        // connectWithOptions tests
        function generateConnectWithParams(connectparams, case_type) {
            // connect and wait for callback
            it('using connectWithOptions should just connect ' + case_type + ' callback params' + JSON.stringify(connectparams, null, " "), function() {
                var thisprinter = null;
                var callresult = null;
                function cbkf(val) {
                    callresult = val;
                }

                runs(function() {
                    expect(last_found_printer_id).toNotEqual(null);
                    thisprinter = Rho.Printer.getPrinterByID(last_found_printer_id);
                    callresult = null;
                    thisprinter.disconnect(cbkf);
                });

                waitsFor(function() {
                    return callresult != null;
                }, 'wait until disconnected', 10000);

                runs(function() {
                    expect(callresult).toEqual(Rho.Printer.PRINTER_STATUS_SUCCESS);
                    expect(thisprinter.isConnected).toEqual(false);
                });

                runs(function() {
                    callresult = null;

                    if (case_type == 'without'){
                        thisprinter.connectWithOptions(connectparams);
                    } else if (case_type == 'withcallback') {
                        thisprinter.connectWithOptions(connectparams, cbkf);
                    } else if (case_type == 'anonymous') {
                        thisprinter.connectWithOptions(connectparams, function cbk(val) {
                            callresult = val;
                        });    
                    }
                });

                waitsFor(function() {
                    if(case_type == 'without') {
                        setTimeout(function(){callresult = true;},10000);
                        return callresult;
                    }
                    else {
                        return callresult !== null;
                    }
                }, 'wait for connect', 30000);

                runs(function() {
					if (case_type != 'without'){
						expect(callresult).toEqual(Rho.Printer.PRINTER_STATUS_SUCCESS);
					}
                    expect(thisprinter.isConnected).toEqual(true);
                });
            });
        }

        var connectParams = [{}, {
                "timeout": 20000
            }, 
		//	{"timeout": 0}, //timeout = 0 is invalid as per doc
			{
                "timeout": 1000
            }, {
                "timeout": 15000
        }, ];

        for (var i = 0; i < connectParams.length; i++) {
            generateConnectWithParams(connectParams[i], 'without');
            generateConnectWithParams(connectParams[i], 'withcallback');
            generateConnectWithParams(connectParams[i], 'anonymous');
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
            //expect(callresult).toEqual(Rho.Printer.PRINTER_STATUS_SUCCESS);
        });

        runs(function() {
            expect(thisprinter.isConnected).toEqual(true);
            callresult = null;
        });
    }


    // enumerateSupportedControlLanguages
    describe('enumerateSupportedControlLanguages method', function() {
        //var controlLangs = [Rho.Printer.PRINTER_LANGUAGE_ZPL, Rho.Printer.PRINTER_LANGUAGE_CPCL, Rho.Printer.PRINTER_LANGUAGE_EPS]
        var controlLangs = [Rho.Printer.PRINTER_LANGUAGE_ZPL, Rho.Printer.PRINTER_LANGUAGE_CPCL]
        it('should connect', function() {
            doConnect();
        });
        
        it('using result (without callback)', function() {
            runs(function() {
                var languagesTypes = thisprinter.enumerateSupportedControlLanguages();
                expect(languagesTypes).toEqual(controlLangs);
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
                expect(enumCb).toEqual(controlLangs);
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
                expect(enumCb).toEqual(controlLangs);
            });
        });
    });

    
     // stopSearch method tests
    if(!isWindowsMobilePlatform()) {

        describe('stopSearch method', function() {
            it("callback should not fire after calling stopSearch", function () {
                runs(function () {
                    // Let the printer be search first then use stop
                    searchObject = runSearch({}, 60000);
                    
                    setTimeout(function(){
                        Rho.Printer.stopSearch();
                    },4000);
                });

                waits(65000);

                runs(function() {
                    expect(searchObject.finished).toEqual(false);
                });

            });
        });
    }


    // requestState methods
    var listofrequeststate = [Rho.Printer.PRINTER_STATE_IS_READY_TO_PRINT,    Rho.Printer.PRINTER_STATE_IS_COVER_OPENED, Rho.Printer.PRINTER_STATE_IS_DRAWER_OPENED, Rho.Printer.PRINTER_STATE_IS_PAPER_OUT, Rho.Printer.PRINTER_STATE_IS_BATTERY_LOW];
    var requeststate_boolean = ["PRINTER_STATE_IS_READY_TO_PRINT", "PRINTER_STATE_IS_COVER_OPENED", "PRINTER_STATE_IS_DRAWER_OPENED", "PRINTER_STATE_IS_PAPER_OUT", "PRINTER_STATE_IS_BATTERY_LOW"];
    var requeststate_callbackValue = {};
    function requestStateCallback(args) {
        if (args.status == Rho.Printer.PRINTER_STATUS_SUCCESS) {
            expect(args.status).toEqual(Rho.Printer.PRINTER_STATUS_SUCCESS);   
            requeststate_callbackValue = args;
                
        } else if (args.status == Rho.Printer.PRINTER_STATUS_ERROR) {
            expect(args.status).toEqual(Rho.Printer.PRINTER_STATUS_SUCCESS);
        } 
        callresult = true;
    }
    
    describe('requestState method', function() {
        it('should connect', function() {
                doConnect();
        });
                
        it("Request printer state for list of parameters", function() {
            runs(function() {
                    callresult = null;
                    thisprinter.requestState(listofrequeststate, requestStateCallback);
            });

            waitsFor(function() {
                    return callresult !== null;
            }, 'wait requestState', 30000);
            
            runs(function() {
                expect(requeststate_callbackValue.status).toEqual(Rho.Printer.PRINTER_STATUS_SUCCESS);
            });
        }); 
            
        it("Result of Request printer state Boolean values", function() {   
            runs(function() {
                if(requeststate_callbackValue.status == Rho.Printer.PRINTER_STATUS_SUCCESS) {
                    for(var i =0; i<requeststate_boolean.length;i++) {
                        if(requeststate_callbackValue[requeststate_boolean[i]] != undefined) {
                            var result = requeststate_callbackValue[requeststate_boolean[i]];
                            expect(result).isBoolean();
                        }   
                    }
                }
                else
                {
                    expect(requeststate_callbackValue.status).toEqual(Rho.Printer.PRINTER_STATUS_SUCCESS);
                }                   
            });
        });
                
    }); 


    // functions for generate get property and properties
    function generategetproperty(property, type) {
        var deftext = ['Should return',property,'value as a ',type ];
        it( deftext.join(' ') , function() {
            runs(function() {
                if(type == 'string') {
                    expect(thisprinter.getProperty(property)).isNotEmptyString();
                }
                else if (type == 'int') {
                    expect(thisprinter.getProperty(property)).isNumberGreaterThenZero();
                }
                else if (type == 'isBoolean') {
                    expect(thisprinter.getProperty(property)).isBoolean();
                }       
            });
        });
        
    }
    
    function generategetproperties(property, type) {
        var deftext = ['Should return',property,'value as a ',type ];
        it( deftext.join(' ') , function() {
            runs(function() {
                if (type == 'string') {
                    var data = thisprinter.getProperties([property]);
                    data = JSON.stringify(data[property]);
                    expect(data).isNotEmptyString();
                }
                else if (type == 'int') {
                    var data = thisprinter.getProperties([property]);
                    data = parseInt(data[property],10);
                    expect(data).isNumberGreaterThenZero();
                }
                else if (type == 'isBoolean') {
                    var data = thisprinter.getProperties([property]);
                    expect(data.property).isBoolean();
                }       
            });
        });
    }

    // Get Printer property & properties
    describe("Getting properties of the connected printer", function() {
        
        var offIter = 0;
        var formats = [['connectionType', 'string'],['deviceAddress', 'string'],['ID', 'string'], ['deviceName', 'string'], ['printerType', 'string'], ['isConnected', 'boolean']];
        
        for (var i = 0; i < formats.length; i++) {
            var property = formats[i][0];
            var type = formats[i][1];
            generategetproperty(property, type);
            generategetproperties(property, type);
        }
        
       it('should connect', function() {
                doConnect();
            });

            it('Should return devicePort value as an integer', function () {
				runs(function() {
					if(thisprinter.getProperty("connectionType") != "CONNECTION_TYPE_BLUETOOTH") {
						expect(thisprinter.devicePort).isNumberGreaterThenZero();
					}
				});
            });

            it('Should return devicePort value as an integer using get properties', function () {
				runs(function() {
					if(thisprinter.getProperty("connectionType") != "CONNECTION_TYPE_BLUETOOTH") {
						var data = thisprinter.getProperties(['devicePort']);
						var val = parseInt(data.devicePort, 10);
						expect(val).isNumberGreaterThenZero();
					}
				});
            });

    }); 

    
    // get and set default printer
    describe("Get & Set default printer", function() {
        var printerObj = null;

        it('there is an instance of a printer', function() {
            runs(function() {
                expect(last_found_printer_id).toNotEqual(null);
                printerObj = Rho.Printer.getPrinterByID(last_found_printer_id);
                Rho.Printer.setDefault(printerObj);
            });
        });

        it('get default Printer', function() {
            runs(function() {
                thisprinter = Rho.Printer.getDefault();
                expect(thisprinter.ID).toNotEqual(null);
            });
        });

        it('set default Printer', function() {
            runs(function() {
                Rho.Printer.setDefault(printerObj);
                var defPrinter = Rho.Printer.getDefault();
                expect(defPrinter.ID).toEqual(printerObj.ID);
            });
        });


    });


    // negetive test case by using zebra specific method in generic printer module
	describe('negetive test case', function() {
        //var description = '';
        it('should connect', function() {
            doConnect();
        });
        
        it('calling zebra specific method should throw exception', function() {

            expect(function () {
                thisprinter.retrieveFileNames(cbk);
            }).toThrow();

            // catch(e){
            //     description = e;
            // }
        });

    });

});