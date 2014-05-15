function testPassed() {
    document.getElementById('actResult').innerHTML = 'pass';
}

function testFailed() {
    document.getElementById('actResult').innerHTML = 'fail';
}

function setExpected(expected) {
    document.getElementById('expResult').innerHTML = expected;
}

function enablecallbackdata(data) {
    document.getElementById('clbkData').innerHTML = data;
}

function setAction(data) {
    document.getElementById('action').innerHTML = data;
}

function setObjective(objective) {
    document.getElementById('objective').innerHTML = objective;
}

function setInstruction(instruction) {
    document.getElementById('instruction').innerHTML = instruction;
}

var displayPrinterResult = function(desc, data, placeTimestamp) {

    var myel = $('#event_list').length ? $('#event_list') : $('<ul id="event_list">').css('list-style-position', 'outside').appendTo($('#test_output'));
    var timestamp = '';
    if (placeTimestamp) {
        var time = new Date();
        timestamp = leftZeroFill(time.getHours(), 2) + ':' + leftZeroFill(time.getMinutes(), 2) + ':' + leftZeroFill(time.getSeconds(), 2) + '.' + leftZeroFill(~~(time.getMilliseconds() / 10), 2);
        timestamp = '(' + timestamp + ')   ';
    }
    var myel = $('<li>').appendTo(myel);
    $(myel).text(timestamp + desc);
    var myel = $('<ul>').appendTo(myel);

    if ((typeof data) == 'string') {
        lines = data.split(/\r\n|\r|\n|<br>|<br\/>/g);
        var len = lines.length,
            i;
        for (i = 0; i < len; i++)
            lines[i] && lines.push(lines[i]);
        lines.splice(0, len);
        for (var cnt = 0; cnt < lines.length; cnt++) {
            $(myel).append($('<li>').text(lines[cnt]));
        }
    } else if ($.isArray(data)) {
        for (var cnt = 0; cnt < data.length; cnt++) {
            $(myel).append('<li><pre>' + JSON.stringify(data[cnt], null, 2) + '</pre>');
        }
    } else {
        $.each(data, function(key, value) {
            var elem = $('<li>').appendTo(myel);
            elem.text(key);
            elem.append('<pre>' + JSON.stringify(value, null, 2) + '</pre>');
        });

    }
};

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

function setupTestFields() {
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
}

function updatePrinterList(printers) {
    for (var i = 0; i < printers.length; i++) {
        var printerInstance = Rho.PrinterZebra.getPrinterByID(printers[i]);
        var printerType = printerInstance.printerType.replace('PRINTER_TYPE_', '');
        var connType = printerInstance.connectionType.replace('CONNECTION_TYPE_', '');
        var devName = printerType + '-' + connType + '@' + printerInstance.deviceAddress;
        var pid = printerInstance.connectionType + '|' + printerInstance.deviceAddress + '|' + printerInstance.devicePort + '|' + printers[i];

        $('#dev_list').append($('<option>', {
            value: pid
        }).text(devName));
    }
    $('#dev_list').val($('#dev_list option:eq(1)').val()).trigger('change');
}

function uniqArray(array) {
    var temp = {};
    for (var i = 0; i < array.length; i++) {
        temp[array[i]] = true;
    }
    var uniq = [];
    for (var k in temp) {
        uniq.push(k);
    }
    return uniq;
}

function runSearch(options, timeout) {
    Rho.Log.info("doSearch #1", "JSC");

    if (!timeout || timeout < 100) {
        timeout = 100;
    }

    var SO = {
        discovered: [],
        printers: [],
        errors: [],
        last_printer: null,
        last_printer_id: null,
        finished: false,
        total: 3,
        curr: 0,
    };

    var start = new Date();
    var last_start = start;

    function searchPrinterCallback(callbackValue) {
        var printer_id = callbackValue.printerID;
        if (callbackValue.status == Rho.PrinterZebra.PRINTER_STATUS_SUCCESS) {
            if (printer_id && printer_id.length > 0) {
                SO.discovered.push(printer_id);
                SO.last_printer_id = printer_id;
                SO.last_printer = Rho.PrinterZebra.getPrinterByID(printer_id);
            } else {
                checkSearch();
            }
        } else {
            SO.errors.push(callbackValue);

            displayPrinterResult('Search error:', callbackValue, true);

            SO.finished = true;
        }
    }

    function checkSearch() {
        var curr_time = new Date();
        var last_el = curr_time - last_start;
        var elapsed = curr_time - start;
        last_start = curr_time;

        SO.curr += 1;

        if ((SO.curr > SO.total) || ((elapsed + last_el) > timeout)) {
            SO.printers = uniqArray(SO.discovered);

            displayPrinterResult('Discovered printers', SO.printers, true);

            SO.finished = true;
        } else {
            if (SO.curr <= 1) {
                Rho.PrinterZebra.searchPrinters(options, searchPrinterCallback);
            } else {
                setTimeout(function() {
                    Rho.PrinterZebra.searchPrinters(options, searchPrinterCallback);
                }, 200);
            }
        }
    }

    displayPrinterResult('Starting search', options, true);

    checkSearch();

    return SO;
}

function makeTestLabel(label) {
    return '^XA^MNN^LL200^XZ^XA^JUS^XZ^XA^FO150,50,0^A0I25,25^TBI,300,75^FD' + label + '^FS^XZ\r\n';
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
    return combinations;
}

function addCombo() {
    $('#select_box_wrapper').show();
    var textb = {
        'txtfile': txtfilepath,
        'csvfile': csvfilepath,
        'xlsfile': xlsfilepath,
        'docfile': docfilepath,
        'htmlcssfile': htmlcssfilepath,
        'jsfile': jsfilepath,
        'cppfile': cppfilepath,
        'pdffile': pdffilepath,
        'hashzplfile': hashzplfilepath,
        'hashccplfile': hashccplfilepath,
        'arrayzplfile': arrayzplfilepath,
        'arrayccplfile': arrayccplfilepath,
        'invalidcontentsfile': invalidcontentsfilepath,
        'invalidfilepath': invalidfilepath
    };
    for (var files in textb) {
        var combo = document.getElementById('combo');
        var option = document.createElement('option');
        option.text = files;
        option.value = textb[files];
        try {
            combo.add(option, null);
        } catch (error) {
            combo.add(option);
        }
    }
}

function hideCombo() {
    $('#select_box_wrapper').hide();
}

$(window).load(
    function() {
        var conn_types = [Rho.PrinterZebra.CONNECTION_TYPE_BLUETOOTH, Rho.PrinterZebra.CONNECTION_TYPE_ON_BOARD, Rho.PrinterZebra.CONNECTION_TYPE_TCP];
        for (var i = conn_types.length - 1; i >= 0; i--) {

            $('#dev_conn_type')
                .append($('<option>', {
                        value: conn_types[i]
                    })
                    .text(conn_types[i].replace('CONNECTION_TYPE_', '')));
        }
    }
);
