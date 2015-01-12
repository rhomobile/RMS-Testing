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
        if (callbackValue.status == Rho.Printer.PRINTER_STATUS_SUCCESS) {
            if (printer_id && printer_id.length > 0) {
                SO.discovered.push(printer_id);
                SO.last_printer_id = printer_id;
                SO.last_printer = Rho.Printer.getPrinterByID(printer_id);
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
                Rho.Printer.searchPrinters(options, searchPrinterCallback);
            } else {
                setTimeout(function() {
                    Rho.Printer.searchPrinters(options, searchPrinterCallback);
                }, 200);
            }
        }
    }

    displayPrinterResult('Starting search', options, true);

    checkSearch();

    return SO;
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
        var conn_types = [Rho.Printer.CONNECTION_TYPE_BLUETOOTH, Rho.Printer.CONNECTION_TYPE_ON_BOARD, Rho.Printer.CONNECTION_TYPE_TCP, Rho.Printer.CONNECTION_TYPE_USB];
        for (var i = conn_types.length - 1; i >= 0; i--) {

            $('#dev_conn_type')
                .append($('<option>', {
                        value: conn_types[i]
                    })
                    .text(conn_types[i].replace('CONNECTION_TYPE_', '')));
        }
    }
);
