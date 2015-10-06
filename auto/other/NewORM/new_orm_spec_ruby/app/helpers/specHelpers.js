/* Basic test methods */

function isAndroidPlatform() {
    return "ANDROID" == Rho.System.platform;
}

function isApplePlatform() {
    return "APPLE" == Rho.System.platform;
}

function isWindowsMobilePlatform() {
    return "WINDOWS" == Rho.System.platform;
}

function isWindowsDesktopPlatform() {
    return "WINDOWS_DESKTOP" == Rho.System.platform;
}

function isWindowsPhone8Platform() {
    return "WP8" == Rho.System.platform;
}

/* Complex test methods */

function isAnyWindowsFamilyPlatform() {
    return isWindowsMobilePlatform() || isWindowsDesktopPlatform() || isWindowsPhone8Platform();
}

function isWindowsMobileOrWindowsDesktopPlatform() {
    return isWindowsMobilePlatform() || isWindowsDesktopPlatform();
}

function isAnyButWindowsFamilyPlatform() {
     return !isAnyWindowsFamilyPlatform();
}

function isAnyButApplePlatform() {
    return !isApplePlatform();
}

function isAnyButAppleAndWindowsMobilePlatform() {
    return !(isApplePlatform() || isWindowsMobilePlatform());
}

function isWindowsMobileOrAndroidPlatform() {
    return isAndroidPlatform() || isWindowsMobilePlatform();
}

function isAndroidOrApplePlatform() {
    return isAndroidPlatform() || isApplePlatform();
}

function isAndroidOrAppleOrWindowsPhone8Platform() {
    return isAndroidPlatform() || isApplePlatform() || isWindowsPhone8Platform();
}

//Add user log to log file.
var writeIntoLog = function (desc, data){
		
}

function leftZeroFill(number, targetLength) {
    var output = number + '';
    while (output.length < targetLength) {
        output = '0' + output;
    }
    return output;
}

//Display Results on Device
var displayResult = function (desc, data){
	$('#myList').empty();
    if (desc != "Output: ")
    {
    	var node=document.createElement("LI");
    	var textnode =document.createTextNode(desc);
    	node.appendChild(textnode);
    	document.getElementById("myList").appendChild(node);
    }
	node = document.createElement("LI");
    textnode = document.createTextNode("Output:");
    node.appendChild(textnode);

    list = document.createElement("ul");
    node.appendChild(list);

    lines = data.split(/\r\n|\r|\n|<br>|<br\/>/g);

    var len = lines.length, i;

    for(i = 0; i < len; i++ )
        lines[i] && lines.push(lines[i]);

    lines.splice(0 , len);

    if (lines.length > 1)
    {
        var time = new Date();
        lines.unshift("Time: " + leftZeroFill(time.getHours(),2) + ":" + leftZeroFill(time.getMinutes(),2) + ":" + leftZeroFill(time.getSeconds(),2) + "." + leftZeroFill(~~(time.getMilliseconds()/10),2));
    }

    Rho.Log.info(lines.join('\n'),"GOT IT!");

    for(var cnt = 0 ; cnt < lines.length; cnt++ )
    {
       list.appendChild(document.createElement("LI")).appendChild(document.createTextNode(lines[cnt]));    
    }
	
	document.getElementById("myList").appendChild(node);
}

var dispCurrentProcess = function (data){
	document.getElementById('detailsdiv').innerHTML = data;
}

var displayObjective = function(data){
    document.getElementById('objective').innerHTML = data;
}
var displayPrecondition = function(data){
    if(data.length>0){
        var retData = "<b>PreConditions:</b><br/><ul>";
        for (var i=0; i<data.length;i++){
            retData = retData + "<li>"+data[i]+"</li>"
        }
        retData = retData + "</ul>";
        document.getElementById('preCondition').innerHTML = retData;
    }else{
        document.getElementById('preCondition').innerHTML = " - ";
    }
}
var dispExpectedResult= function (data){
	document.getElementById('expectedresult').innerHTML = data;
}

var dispTestCaseRunning = function (data){
    data = nl2br(data);
	document.getElementById('instruction').innerHTML = data;
}

// Get Random Name {Used in Database to get Random table name for each test}
function getRandomName()
{
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    for( var i=0; i < 5; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}

//Add Html Element Dynamically
function add(type) {
 
    //Create an input type dynamically.
    var element = document.createElement("input");
 
    //Assign different attributes to the element.
    element.setAttribute("type", type);
    element.setAttribute("value", type);
    element.setAttribute("name", type);
    element.setAttribute("id", type);
 
 
    var foo = document.getElementById("fooBar");
 
    //Append the element in page (in span).
    foo.appendChild(element);
 
}

function isTestApplicable (anArray){
    var platform = Rho.System.platform;
    return (anArray.indexOf(platform) == -1) ? false : true ;
}

//Common Method for ruby method call from javascript
var Ruby = {
    data: undefined,
    call: function(controller,method){
        Ruby.data = undefined;
        url = '/app/'+controller+'/'+method
        $.get(url)
        .success(function(data){

            }); 
        return false;
    },
    sendValueToJS: function(data){ //Send data from ruby controller to js
        Ruby.data = data;
    },
    getReturnedValue: function(){
        return Ruby.data;
    }
}

//Common Method to Make a Test Pass/Fail for Semi Automatic App.
//Methods is used in System, CardReader

var captureResult = function(status){
    testResult = status;
    captured = true;
}

var _result = {
	status: undefined,
	time_to_wait: 300000,
	responded: undefined,
    auto_test: false,
    auto_fill: undefined,
	passed: function(){
		_result.status = true;
		_result.responded = true;
	},
	failed: function(){
		_result.status = false;
		_result.responded = true;
	},
    done: function(){
        _result.status = true;
        _result.responded = true;
    },
	reset: function(){
		_result.status = undefined;
		_result.responded = undefined;
        _result.auto_test = false;
	},
    runTest: function(){
        _result.responded = true;
        if (!_result.auto_test) {
            $('#pass').show();
            $('#fail').show();
        }
        $('#runtest').hide();
        $('#done').hide();

    },
    auto: function() {
        _result.auto_fill = true;
    },
    man: function() {
        _result.auto_fill = false;
    },
    waitForSelectTestMode: function() {
        $("#action").find(":button").hide();
        $("#auto").show();
        $("#man").show();
        _result.auto_fill = undefined;

        runs(function() {
            setTimeout(function() {
                timeout = true;
            }, _result.time_to_wait);
        });

        waitsFor(function() {
            return _result.auto_fill !== undefined;
        }, 'waiting for user response', _result.time_to_wait+5000);

        runs(function() {
            $("#action").find(":button").hide();
        });
    },
	waitForResponse: function(){
		var timeout = false;
		runs(function() {
            setTimeout(function() {
                timeout = true;
            }, _result.time_to_wait);
        });

        waitsFor(function() {
            return _result.responded;
        }, 'waiting for user response', _result.time_to_wait+5000);

        runs(function() {
            expect(true).toEqual(_result.status);
        });
    },
    waitToRunTest: function(){
        runs(function() {
            $('#pass').hide();
            $('#fail').hide();
            $('#done').hide();
            $('#runtest').show();
            setTimeout(function() {
                timeout = true;
            }, _result.time_to_wait);
        });

        waitsFor(function() {
            return _result.responded;
        }, 'waiting for user response', _result.time_to_wait+5000);

        runs(function() {
            _result.responded = undefined;
        });
    },
    waitUntilDone: function(needToWaitFn){
        var canWeSkipWait = false;

        runs(function() {
            $('#pass').hide();
            $('#fail').hide();
            $('#done').show();
            $('#runtest').hide();
            _result.responded = false;

            if (needToWaitFn !== undefined && needToWaitFn !== null) {
                canWeSkipWait = !needToWaitFn();
            }
            setTimeout(function() {
                timeout = true;
            }, _result.time_to_wait);
        });

        waitsFor(function() {
            return _result.responded || canWeSkipWait;
        }, 'waiting for user response', _result.time_to_wait+5000);

        runs(function() {
            _result.responded = undefined;
             $('#done').hide();
        });
    },
    waitToRunAutoTest: function() {
        _result.auto_test = true;
        _result.waitToRunTest();
    }
}

beforeEach(function() {
    _result.reset();
    //document.getElementById("myList").innerHTML = '';
});

function nl2br (str, is_xhtml) {   
    var breakTag = (is_xhtml || typeof is_xhtml === 'undefined') ? '<br />' : '<br>';    
    return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1'+ breakTag +'$2');
}
