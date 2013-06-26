function toolCreate() {
    var toolElements = new Array();
    toolElements = [
        {label: 'back', action: 'back'},
        {label: 'Home', action: 'Home'},
        {action: "separator"},
        {action: '/app/NativeToolbarTest/Page1.html', label: "[BUTTON]"},
        {label: 'refresh', action: 'refresh'},
        {label: 'Options', action: 'options'},
        {label: 'Exit', action: 'exit'}
    ];
    var toolProperties = {maskColor: '', viewHeight: 100};
    Rho.NativeToolbar.create(toolElements, toolProperties);
}


function toolIconLabelMask() {
    var toolElements = new Array();
    toolElements = [
        {label: 'back', action: 'back'},
        {label: 'Home', action: 'Home', icon: '/public/images/bar/colored_btn.png'},
        {action: "separator"},
        {label: 'refresh', action: 'refresh', icon: '/public/images/bar/refresh_btn.png'},
        {label: 'Exit', action: 'exit', icon: '/public/images/bar/forward_btn.png'}
    ];
    var toolProperties = {backgroundColor: 0x00804F, maskColor: 0xFF00, viewHeight: 100};
    Rho.NativeToolbar.create(toolElements, toolProperties);
}


function toolColored() {
    var toolElements = new Array();
    toolElements = [
        {label: 'back', action: 'back', icon: '/public/images/bar/back_btn_colored.png', coloredIcon: true},
        {action: "separator"},
        {label: 'Home', action: 'Home', icon: '/public/images/bar/colored_btn.png'},
        {label: 'Exit', action: 'exit', icon: '/public/images/bar/refresh_btn.png'}
    ];
    var toolProperties = {backgroundColor: 0x002F00, maskColor: 0xFF0000, viewHeight: 100};
    Rho.NativeToolbar.create(toolElements, toolProperties);
}

function toolRemove() {
    Rho.NativeToolbar.remove();
}


function toolNoLabelIcon() {
    var toolElements = new Array();
    toolElements = [
        {action: 'Home'},
        {label: 'Exit', action: 'exit', icon: '/public/images/bar/refresh_btn.png'},
        {label: 'back', action: 'back', icon: '/public/images/bar/back_btn_colored.png', coloredIcon: true},
        {action: 'fullscreen'}
    ];
    var toolProperties = {backgroundColor: 0xFF0000, maskColor: 0xFF0000, viewHeight: 100};
    Rho.NativeToolbar.create(toolElements, toolProperties);
}

function toolNoAction() {
    var toolElements = new Array();
    toolElements = [
        {label: 'Home', action: '', icon: '/public/images/bar/colored_btn.png'},
        {label: 'refresh', action: 'refresh', icon: '/public/images/bar/refresh_btn.png'},
        {label: 'refresh', action: 'refresh', icon: '/public/images/bar/forward_btn.png'}
    ];
    var toolProperties = {backgroundColor: 0xFF0000, maskColor: 0xFF0000, viewHeight: 100};
    Rho.NativeToolbar.create(toolElements, toolProperties);
}

function toolInvalidAction() {
    var toolElements = new Array();
    toolElements = [
        {label: 'Home', action: 'InvalidAction@#', icon: '/public/images/bar/colored_btn.png'},
        {label: 'refresh', action: 'refresh', icon: '/public/images/bar/refresh_btn.png'},
        {label: 'refresh', action: 'refresh', icon: '/public/images/bar/forward_btn.png'}
    ];
    var toolProperties = {backgroundColor: 0xFF0000, maskColor: 0xFF0000, viewHeight: 100};
    Rho.NativeToolbar.create(toolElements, toolProperties);
}

function toolLoadIndex() {
    var toolElements = new Array();
    toolElements = [
        {label: 'Home', action: 'home', icon: '/public/images/bar/colored_btn.png'},
        {label: 'refresh', action: 'refresh', icon: '/public/images/bar/refresh_btn.png'},
        {label: 'refresh', action: 'refresh', icon: '/public/images/bar/forward_btn.png'},
        {label: 'Load Application Test on clicking this button this is also a test to check long Label  ', action: '/public/app/api/application_tnv.html'}
    ];
    var toolProperties = {backgroundColor: 0xFF0000, maskColor: 0xFF0000, viewHeight: 100};
    Rho.NativeToolbar.create(toolElements, toolProperties);
}

function toolTestActions1() {
    var toolElements = new Array();
    toolElements = [
        {label: 'Home', action: 'Home'},
        {label: 'Exit', action: 'exit'},
        {label: 'close', action: 'close'},
        {label: 'Options', action: 'options'},
        {label: 'refresh', action: 'refresh'}
    ];
    var toolProperties = {backgroundColor: 0xFF00, maskColor: '', viewHeight: 100};
    Rho.NativeToolbar.create(toolElements, toolProperties);
}

function toolTestActions2( {
    var toolElements = new Array();
    toolElements = [
        {label: 'back', action: 'back'},
        {label: 'log', action: 'log'},
        {label: 'Fullscreen', action: 'fullscreen'},
        {label: 'sync', action: 'sync'},
        {label: 'minimize', action: 'minimize'}
    ];
    var toolProperties = {backgroundColor: 0xFF00, maskColor: '', viewHeight: 100};
    Rho.NativeToolbar.create(toolElements, toolProperties);
}

function toolTestActions3() {
    var toolElements = new Array();
    toolElements = [
        {label: 'SIP', action: 'SIP'},
        {label: 'Home', action: 'Home'},
        {label: 'Exit', action: 'exit'},
        {label: 'close', action: 'close'},
        {label: 'Options', action: 'options'}
    ];
    var toolProperties = {backgroundColor: 0xFF00, maskColor: '', viewHeight: 100};
    Rho.NativeToolbar.create(toolElements, toolProperties);
}

function toolTestActions4() {
    var toolElements = new Array();
    toolElements = [
        {label: 'refresh', action: 'refresh'},
        {label: 'back', action: 'back'},
        {label: 'log', action: 'log'},
        {label: 'Fullscreen', action: 'fullscreen'},
        {label: 'sync', action: 'sync'}
    ];
    var toolProperties = {backgroundColor: 0xFF00, maskColor: '', viewHeight: 100};
    Rho.NativeToolbar.create(toolElements, toolProperties);
}

function toolTestActions5() {
    var toolElements = new Array();
    toolElements = [
        {label: 'minimize', action: 'minimize'},
        {label: 'SIP', action: 'SIP'}
    ];
    var toolProperties = {backgroundColor: 0xFF00, maskColor: '', viewHeight: 100};
    Rho.NativeToolbar.create(toolElements, toolProperties);
}

function toolAnime() {
    var toolElements = new Array();
    toolElements = [
        {label: 'Home', action: 'Home', icon: '/app/NativeToolbarTest/man_48.jpg'},
        {label: 'refresh', action: 'refresh', icon: '/app/NativeToolbarTest/twocats_wm.jpg'},
        {label: 'refresh', action: 'refresh', icon: '/app/NativeToolbarTest/phones_485.png'}
    ];
    var toolProperties = {backgroundColor: 0xFF00, maskColor: '', viewHeight: 100};
    Rho.NativeToolbar.create(toolElements, toolProperties);
}

function toolAnimeOther() {
    var toolElements = new Array();
    toolElements = [
        {label: 'Home', action: 'Home', icon: '/app/NativeToolbarTest/cake_30.png'},
        {label: 'refresh', action: 'refresh', icon: '/public/images/bar/refresh_btn.png'},
        {label: 'refresh', action: 'refresh', icon: '/app/NativeToolbarTest/cat_30.png'}
    ];
    var toolProperties = {backgroundColor: 0xFF00, maskColor: '', viewHeight: 100};
    Rho.NativeToolbar.create(toolElements, toolProperties);
}

function toolInvalidView() {
    var toolElements = new Array();
    toolElements = [
        {label: 'Home', action: 'Home', icon: '/public/images/bar/colored_btn.png'},
        {label: 'refresh', action: 'refresh', icon: '/public/images/bar/refresh_btn.png'},
        {label: 'refresh', action: 'refresh', icon: '/public/images/bar/forward_btn.png'}
    ];
    var toolProperties = {backgroundColor: 0xFF0000, maskColor: 0xFF0000, viewHeight: 0.8923};
    Rho.NativeToolbar.create(toolElements, toolProperties);
}

function toolInvalidBkg() {
    var toolElements = new Array();
    toolElements = [
        {label: 'Home', action: 'Home', icon: '/public/images/bar/colored_btn.png'},
        {label: 'refresh', action: 'refresh', icon: '/public/images/bar/refresh_btn.png'},
        {label: 'refresh', action: 'refresh', icon: '/public/images/bar/forward_btn.png'}
    ];
    var toolProperties = {backgroundColor: 0.3030, maskColor: 0xFF0000, viewHeight: 300};
    Rho.NativeToolbar.create(toolElements, toolProperties);
}


function toolInvalidMAsk() {
    var toolElements = new Array();
    toolElements = [
        {label: 'Home', action: 'Home', icon: '/public/images/bar/colored_btn.png'},
        {label: 'refresh', action: 'refresh', icon: '/public/images/bar/refresh_btn.png'},
        {label: 'refresh', action: 'refresh', icon: '/public/images/bar/forward_btn.png'}
    ];
    var toolProperties = {backgroundColor: 0xFF0000, maskColor: 0.3264, viewHeight: 300};
    Rho.NativeToolbar.create(toolElements, toolProperties);
}

function toolJavascript() {
    var toolElements = new Array();
    toolElements = [
        {label: 'Home', action: 'home', icon: '/public/images/bar/colored_btn.png'},
        {label: 'exit', action: 'javascript:onQuit()', icon: '/public/images/bar/refresh_btn.png'},
        {label: 'refresh', action: 'refresh', icon: '/public/images/bar/forward_btn.png'},
        {label: 'Load a HTML page', action: 'app/ApplicationTest/application.html'}
    ];
    var toolProperties = {backgroundColor: 0xFF0000, maskColor: 0xFF0000, viewHeight: 100};
    Rho.NativeToolbar.create(toolElements, toolProperties);

}

function toolViewHeight() {
    var toolElements = new Array();
    toolElements = [
        {label: 'Home', action: 'home', icon: '/public/images/bar/colored_btn.png'},
        {label: 'exit', action: 'javascript:onQuit()', icon: '/public/images/bar/refresh_btn.png'},
        {label: 'refresh', action: 'refresh', icon: '/public/images/bar/forward_btn.png'},
        {label: 'Load a HTML page ', action: 'app/ApplicationTest/application.html'}
    ];
    var toolProperties = {backgroundColor: 0xFF0000, maskColor: 0xFF0000, viewHeight: 700};
    Rho.NativeToolbar.create(toolElements, toolProperties);
}

function onQuit() {
    Rho.Application.quit();
}

function toolSeparatorWidth(width) {
    var toolElements = new Array();
    toolElements = [
        {action: '/app/NativeToolbarTest/Page1.html', icon: '/public/images/bar/switch/btn_1.png'},
        {action: 'separator', width: width},
        {action: '/app/NativeToolbarTest/Page2.html', icon: '/public/images/bar/switch/btn_2.png'}
    ];

    var toolProperties = {backgroundColor: 0xFF0000, maskColor: 0xFF0000, viewHeight: 100};
    Rho.NativeToolbar.create(toolElements, toolProperties);
    Rho.WebView.navigate("/app/NativeToolbarTest/page1.html");

}

