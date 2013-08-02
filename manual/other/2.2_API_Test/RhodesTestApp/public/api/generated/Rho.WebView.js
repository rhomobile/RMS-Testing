(function ($, rho, rhoUtil) {
    'use strict';

    var module = null;

    var apiReq = rhoUtil.apiReqFor('Rho.WebView');

    // === WebView class definition ===

    function WebView(id) {
        if (!(this instanceof WebView)) return new WebView(id);

        this.getId = function () {
            return id;
        };
    };

    // === WebView instance members ===

    

    // === WebView static members ===

    
            WebView.SCROLL_NONE = 'None';
        
    
            WebView.SCROLL_SCROLLBARS = 'Scrollbars';
        
    
            WebView.SCROLL_FINGER = 'FingerScroll';
        
    

    
        WebView['framework'] = function(/* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'framework',
                valueCallbackIndex: 0
            });
        };
    
        WebView['fullScreen'] = function(/* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'fullScreen',
                valueCallbackIndex: 0
            });
        };
    
        WebView['fullScreen='] = function(/* bool */ value, /* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'fullScreen=',
                valueCallbackIndex: 1
            });
        };
    
        WebView['nativeMenu'] = function(/* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'nativeMenu',
                valueCallbackIndex: 0
            });
        };
    
        WebView['nativeMenu='] = function(/* const rho::Hashtable<rho::String, rho::String>& */ value, /* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'nativeMenu=',
                valueCallbackIndex: 1
            });
        };
    
        WebView['enableZoom'] = function(/* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'enableZoom',
                valueCallbackIndex: 0
            });
        };
    
        WebView['enableZoom='] = function(/* bool */ value, /* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'enableZoom=',
                valueCallbackIndex: 1
            });
        };
    
        WebView['enablePageLoadingIndication'] = function(/* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'enablePageLoadingIndication',
                valueCallbackIndex: 0
            });
        };
    
        WebView['enablePageLoadingIndication='] = function(/* bool */ value, /* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'enablePageLoadingIndication=',
                valueCallbackIndex: 1
            });
        };
    
        WebView['enableWebPlugins'] = function(/* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'enableWebPlugins',
                valueCallbackIndex: 0
            });
        };
    
        WebView['enableWebPlugins='] = function(/* bool */ value, /* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'enableWebPlugins=',
                valueCallbackIndex: 1
            });
        };
    
        WebView['navigationTimeout'] = function(/* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'navigationTimeout',
                valueCallbackIndex: 0
            });
        };
    
        WebView['navigationTimeout='] = function(/* int */ value, /* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'navigationTimeout=',
                valueCallbackIndex: 1
            });
        };
    
        WebView['scrollTechnique'] = function(/* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'scrollTechnique',
                valueCallbackIndex: 0
            });
        };
    
        WebView['scrollTechnique='] = function(/* const rho::String& */ value, /* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'scrollTechnique=',
                valueCallbackIndex: 1
            });
        };
    
        WebView['fontFamily'] = function(/* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'fontFamily',
                valueCallbackIndex: 0
            });
        };
    
        WebView['fontFamily='] = function(/* const rho::String& */ value, /* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'fontFamily=',
                valueCallbackIndex: 1
            });
        };
    
        WebView['userAgent'] = function(/* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'userAgent',
                valueCallbackIndex: 0
            });
        };
    
        WebView['userAgent='] = function(/* const rho::String& */ value, /* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'userAgent=',
                valueCallbackIndex: 1
            });
        };
    
        WebView['viewportEnabled'] = function(/* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'viewportEnabled',
                valueCallbackIndex: 0
            });
        };
    
        WebView['viewportEnabled='] = function(/* bool */ value, /* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'viewportEnabled=',
                valueCallbackIndex: 1
            });
        };
    
        WebView['viewportWidth'] = function(/* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'viewportWidth',
                valueCallbackIndex: 0
            });
        };
    
        WebView['viewportWidth='] = function(/* int */ value, /* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'viewportWidth=',
                valueCallbackIndex: 1
            });
        };
    
        WebView['cacheSize'] = function(/* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'cacheSize',
                valueCallbackIndex: 0
            });
        };
    
        WebView['cacheSize='] = function(/* int */ value, /* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'cacheSize=',
                valueCallbackIndex: 1
            });
        };
    
        WebView['enableCache'] = function(/* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'enableCache',
                valueCallbackIndex: 0
            });
        };
    
        WebView['enableCache='] = function(/* bool */ value, /* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'enableCache=',
                valueCallbackIndex: 1
            });
        };
    
        WebView['acceptLanguage'] = function(/* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'acceptLanguage',
                valueCallbackIndex: 0
            });
        };
    
        WebView['acceptLanguage='] = function(/* const rho::String& */ value, /* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'acceptLanguage=',
                valueCallbackIndex: 1
            });
        };
    
        WebView['zoomPage'] = function(/* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'zoomPage',
                valueCallbackIndex: 0
            });
        };
    
        WebView['zoomPage='] = function(/* double */ value, /* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'zoomPage=',
                valueCallbackIndex: 1
            });
        };
    
        WebView['textZoomLevel'] = function(/* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'textZoomLevel',
                valueCallbackIndex: 0
            });
        };
    
        WebView['textZoomLevel='] = function(/* int */ value, /* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'textZoomLevel=',
                valueCallbackIndex: 1
            });
        };
    
        WebView['refresh'] = function(/* int */ tabIndex, /* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'refresh',
                valueCallbackIndex: 1
            });
        };
    
        WebView['navigate'] = function(/* const rho::String& */ url, /* int */ tabIndex, /* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'navigate',
                valueCallbackIndex: 2
            });
        };
    
        WebView['navigateBack'] = function(/* int */ tabIndex, /* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'navigateBack',
                valueCallbackIndex: 1
            });
        };
    
        WebView['currentLocation'] = function(/* int */ tabIndex, /* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'currentLocation',
                valueCallbackIndex: 1
            });
        };
    
        WebView['currentURL'] = function(/* int */ tabIndex, /* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'currentURL',
                valueCallbackIndex: 1
            });
        };
    
        WebView['executeJavascript'] = function(/* const rho::String& */ javascriptText, /* int */ tabIndex, /* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'executeJavascript',
                valueCallbackIndex: 2
            });
        };
    
        WebView['active_tab'] = function(/* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'active_tab',
                valueCallbackIndex: 0
            });
        };
    
        WebView['full_screen_mode'] = function(/* bool */ enable, /* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'full_screen_mode',
                valueCallbackIndex: 1
            });
        };
    
        WebView['setCookie'] = function(/* const rho::String& */ url, /* const rho::String& */ cookie, /* int */ tabIndex, /* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'setCookie',
                valueCallbackIndex: 3
            });
        };
    
        WebView['save'] = function(/* const rho::String& */ format, /* const rho::String& */ path, /* int */ tabIndex, /* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'save',
                valueCallbackIndex: 3
            });
        };
    
        WebView['set_menu_items'] = function(/* const rho::Hashtable<rho::String, rho::String>& */ menuItems, /* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'set_menu_items',
                valueCallbackIndex: 1
            });
        };
    

    // === WebView default instance support ===

    

    rhoUtil.namespace('Rho.WebView', WebView);

})(jQuery, Rho, Rho.util);
