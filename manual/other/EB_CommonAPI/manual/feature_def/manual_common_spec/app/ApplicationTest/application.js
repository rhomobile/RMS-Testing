function minimize() {
    EB.Application.minimize();
}

function restoreFromMinimized() {
    EB.Application.minimize();
    setTimeout(function () {
        console.log("Trying restore");
        EB.Application.restore();
    }, 3000);
}

function restored() {
    EB.Application.restore();
}

function minQuit() {

    EB.Application.minimize();
    setTimeout(function () {
        quit()
    }, 3000);
}

function quit() {
    EB.Application.quit();
}

function startOriginal() {
    EB.Application.startURI = '/app/index.html';
}

function startLocal() {
    EB.Application.startURI = '/app/loading.html';
}

function startWeb() {
    EB.Application.startURI = 'http://www.google.com';
}

function startNull() {
    EB.Application.startURI = '';
}

function startInvalid() {
    EB.Application.startURI = '/app/idontExist.html';
}

function setTitle() {
    EB.Application.title = 'MyTitle';
}

function getTitle() {
    var data = EB.Application.title;
    $("#Rho_Application_title span.result").text(JSON.stringify(data));
}

function setTitleNull() {
    EB.Application.title = '';
}

function menuCallback() {
    EB.Log.info("menuCallback", "LOG_TEST");
}

function menuTest() {
    EB.Application.nativeMenu = [
        { 'label': 'Home', 'action': 'Home'},
        {'label': 'separator', 'action': 'separator'},
        {'label': 'Options', 'action': 'options'},
        {'label': 'Log', 'action': 'log'},
        {'label': 'Exit', 'action': 'exit'},
        {'label': 'Refresh', 'action': 'refresh'},
        {'label': 'Callback', 'action': menuCallback}
    ];
}

function menuDefaultTest() {
    EB.Application.nativeMenu = EB.Application.defaultNativeMenu
}

function menuReservedItem() {
    EB.Application.nativeMenu = [
        {'label': 'Options', 'action': 'Options'},
        {'label': 'Exit', 'action': 'exit'},
        {'label': 'Log', 'action': 'Log'},
        {'label': 'Refresh', 'action': 'Refresh'},
        { 'label': 'Home', 'action': 'Home'},
        {'label': 'Load a page', 'action': '/app/loading.html'}
    ];
}

function menuJavascriptCall() {
    EB.Application.nativeMenu = [
        {'label': 'Log', 'action': 'Log'},
        {'label': 'fullscreen', 'action': 'fullscreen'},
        {'label': 'Exit', 'action': 'javascript:onQuit()'},
        {'label': 'separator', 'action': 'separator '},
        {'label': 'Refresh', 'action': 'Refresh'},
        { 'label': 'Home', 'action': 'Home'},
        {'label': 'Load a page', 'action': '/app/loading.html'}
    ];
}
function onQuit() {
    EB.Application.quit();
}


function getInvalidSecurityTokenStartPath() {
    var data = EB.Application.invalidSecurityTokenStartPath;
    $("#Rho_Application_securityToken span.result").text(JSON.stringify(data));
}

function securityTokenResult() {
    var data = EB.Application.securityTokenNotPassed;
    $("#Rho_Application_security span.result").text(JSON.stringify(data));
}

function applicationNotify() {
    //EB.AppEvents.simulateEvent(EB.AppEvents.APP_EVENT_DEACTIVATED);
    EB.Application.setApplicationNotify(notifyCallback);
}

function leftZeroFill(number, targetLength) {
    var output = number + '';
    while (output.length < targetLength) {
        output = '0' + output;
    }
    return output;
}

function notifyCallback(params) {
    //data=params;
    EB.Log.info(params.applicationEvent, 'APP_CALLBACK');

    $("#Rho_Application_Notify span.result").text(params.applicationEvent);

    var time = new Date();
    var timeStr = leftZeroFill(time.getHours(), 2) + ":" + leftZeroFill(time.getMinutes(), 2) + ":" + leftZeroFill(time.getSeconds(), 2) + "." + leftZeroFill(~~(time.getMilliseconds() / 10), 2);

    // create new ul
    var ul = $("#Rho_Application_Notify ul.list").append("<li><ul>Time: " + timeStr + "<li>Event: " + params.applicationEvent + "</li><li>eventData: " + params.eventData + "</li></ul></li>");
}	
	