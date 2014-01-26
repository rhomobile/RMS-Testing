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
