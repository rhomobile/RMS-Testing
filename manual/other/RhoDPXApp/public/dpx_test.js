
var dpx_tests = (function() {
    var TEMPLATES_DIR = '/storage/sdcard1/dpx/templates';

    var templates = [];
    if (!Rho.RhoFile.exists(TEMPLATES_DIR) || !Rho.RhoFile.isDir(TEMPLATES_DIR)) {
        alert('templates folder "' + TEMPLATES_DIR  + '" is not exist');
    } else {
        $.each(Rho.RhoFile.listDir(TEMPLATES_DIR), function(idx, fileName) {
            if (fileName.match(/\.xml$/))
            templates.push(fileName);
        });
    }

    var fillDropDown = function(dropDown, input, value, values) {
        input.val(value);
        $.each(values, function(idx, fileName) {
            var a = $('<a>').attr({
                href: '#', 'data-x-value': fileName
            }).text(
                fileName
            ).click(function(evt){
                input.val($(evt.target).data('x-value'));
            });
            var li = $('<li>').append(a);

            dropDown.append(li);
        });
    };

    $(document).ready(function(){
        fillDropDown($('ul.dropdown-menu.x-templates'  ), $('input.form-control.x-template'  ), 'Logistics Post.xml'     , templates  );
    });


    var each = function(object, f) {
        for (var p in object) {
            if (object.hasOwnProperty(p)) {
                f(p, object[p]);
            }
        } 
    };

    var list = function(object, f) {
        var list = [];
        each(object, function(k, v) {
            list.push(f(k, v));
        });
        return list;
    };

    var log = function(message) {
        console.log(message);
    };

    var pprint = function(list, prefix, value) {
        if (value instanceof Array) {
            list.push('[\n' + prefix + '    ');
            for (var i = 0; i < value.length; ++i) {
                pprint(list, prefix + '    ', value[i]);
                if (i < value.length - 1) {
                    list.push(',\n' + prefix + '    ');
                }
            }
            list.push('\n' + prefix + ']');
        } else if (value instanceof Object) {
            list.push('{');
            var first = true;
            each(value, function(k, v) {
                if (first) {
                    first = false;
                } else {
                    list.push(',');
                }
                list.push('\n' + prefix + "'" + k + "': ");
                pprint(list, prefix + '    ', v);
            });
            list.push('\n' + prefix + '}');
        } else if (value instanceof String) {
            list.push("'" + value + "'");
        } else {
            list.push(value);
        }
        return list.join('');
    };

    var log_call = function(dict) {
        var list = ['callbackType ' + dict['callbackType']];
        if (dict['processedForm'] !== undefined) {
            var template = dict['processedForm']['template'];
            list.push('template ' + template.number + ' ' + template.name);

            list.push('regions');
            var regions = dict['processedForm']['regions'];
            for (var i = 0; i < regions.length; ++i) {
                var region = regions[i];
                each(region, function(k, v) {
                    list.push(i + ':[' + k + ']:[' + v + ']');
                });
            }
        }
        log(list.join('\n    '));
        var ll = [];
        log(pprint(ll, '', dict));
    };

    var get_output = function() {
        return document.getElementById('output');
    };

    var remove_output = function() {
        var node = get_output();
        while (node.childNodes.length != 0) {
            node.removeChild(node.childNodes[node.childNodes.length - 1]);
        }
    };

    var create_tag = function(tag) {
        get_output().appendChild(document.createElement(tag));
    };

    var create_text = function(text) {
        get_output().appendChild(document.createTextNode(text));
    };

    var create_image = function(dpx, image) {
        var img = document.createElement('img');
        img.setAttribute('src', dpx.getDataUri(image['id']));
        get_output().appendChild(img);
        create_tag('br');
        create_text(image['width'] + 'x' + image['height']);
    };

    var show_failure = function(failure, dpx) {
        if (failure === undefined) {
            return;
        }
        create_tag('hr');
        create_text(failure);
    };

    var show_form = function(form, dpx) {
        if (form === undefined) {
            return;
        }
        var regions = form['regions'];
        for (var i = 0; i < regions.length; ++i) {
            var region = regions[i];

            create_tag('hr');
            create_text(region['processingMode'] + ' ' + region['number'] + ' ' + region['name']);
            create_tag('br');
            if (region['absoluteOcrConfidence'] !== undefined || region['absoluteOcrConfidence'] !== undefined) {
                create_text('AC: ' + region['absoluteOcrConfidence'] + ', ' + 'RC: ' + region['relativeOcrConfidence']);
                create_tag('br');
            } 
            if (region.hasOwnProperty('processedData')) {
                create_text(region['processedData']);
                create_tag('br');
            }
            if (region.hasOwnProperty('image')) {
                create_image(dpx, region['image']);
                create_tag('br');
            }
        }
        create_tag('hr');
        create_image(dpx, form['formCapture']['image']);
    };


    var create_dpx = function() {
        var dpx = Rho.DPX;

        var params = {
            'debug': false,

            'audioFeedback': false,
            'hapticFeedback': true,
            'ledFeedback': true,
            'autoImageCapture': false,
            'flashMode': 'off',

            'uiResultConfirmation': false,
            'processingTimeout': $('input.x-processing-timeout').val(),

            'template': 'file://' + encodeURI(Rho.RhoFile.join(TEMPLATES_DIR, $('input.form-control.x-template').val()))
        };

        each(params, function(k, v) {
            create_text(k + ': "' + v + '"');
            create_tag('br');
            dpx.setProperty(k, v);
        });
        return dpx;
    };

    var callback = function(dict, dpx) {
        log_call(dict);
        create_tag('hr');
        create_text('callbackType ' + dict['callbackType']);
        create_tag('br');
        show_form(dict['processedForm'], dpx);
        show_failure(dict['failureReason'], dpx);
    };

    var capture = function() {
        try {
            var dpx = create_dpx();
            dpx.captureDocument(function(dict) {
                callback(dict, dpx);

                if (dict['callbackType'] === Rho.DPX.STOP) {
                    dpx.close();
                }
            });
        } catch (e) {
            log('EXCEPTION ' + e);
        }
    };

    var dpx = undefined;

    var open = function() {
        try {
            dpx = create_dpx();
        } catch (e) {
            log('EXCEPTION ' + e);
        }
    };

    var start = function() {
        try {
            dpx.captureDocument(function(dict) {
                callback(dict, dpx);
            });
        } catch (e) {
            log('EXCEPTION ' + e);
        }
    };

    var close = function() {
        try {
            dpx.close();
        } catch (e) {
            log('EXCEPTION ' + e);
        }
    };

    var fetch = function() {
        try {
            create_dpx().fetchTemplates('userName', 'password');
        } catch (e) {
            log('EXCEPTION ' + e);
        }
    };

    return {
        capture: capture,
        fetch: fetch,
        open: open,
        start: start,
        close: close,
        clear: remove_output
    };
})();

