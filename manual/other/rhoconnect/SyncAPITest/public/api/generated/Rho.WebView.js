
(function ($, rho, rhoUtil) {
    'use strict';

    var moduleNS = 'Rho.WebView';
    var apiReq = rhoUtil.apiReqFor(moduleNS);

    // === WebView class definition ===

    function WebView() {
        var id = null;
        this.getId = function () {return id;};

        if (1 == arguments.length && arguments[0][rhoUtil.rhoIdParam()]) {
            if (moduleNS != arguments[0][rhoUtil.rhoClassParam()]) {
                throw "Wrong class instantiation!";
            }
            id = arguments[0][rhoUtil.rhoIdParam()];
        } else {
            id = rhoUtil.nextId();
            // constructor methods are following:
            
        }
    };

    // === WebView instance properties ===

    

    // === WebView instance methods ===

    

    // === WebView constants ===

    
            WebView.SCROLL_NONE = 'None';
        
    
            WebView.SCROLL_SCROLLBARS = 'Scrollbars';
        
    
            WebView.SCROLL_FINGER = 'FingerScroll';
        
    

    // === WebView static properties ===

    
        
        
        WebView['getFramework'] = function(/* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'framework',
                valueCallbackIndex: 0
            });
        };
        
    
        
        WebView['setFullScreen'] = function(/* any valid value */ value, /* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'fullScreen=',
                valueCallbackIndex: 1
            });
        };
        
        
        WebView['getFullScreen'] = function(/* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'fullScreen',
                valueCallbackIndex: 0
            });
        };
        
    
        
        WebView['setNativeMenu'] = function(/* any valid value */ value, /* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'nativeMenu=',
                valueCallbackIndex: 1
            });
        };
        
        
        WebView['getNativeMenu'] = function(/* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'nativeMenu',
                valueCallbackIndex: 0
            });
        };
        
    
        
        WebView['setEnableZoom'] = function(/* any valid value */ value, /* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'enableZoom=',
                valueCallbackIndex: 1
            });
        };
        
        
        WebView['getEnableZoom'] = function(/* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'enableZoom',
                valueCallbackIndex: 0
            });
        };
        
    
        
        WebView['setEnablePageLoadingIndication'] = function(/* any valid value */ value, /* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'enablePageLoadingIndication=',
                valueCallbackIndex: 1
            });
        };
        
        
        WebView['getEnablePageLoadingIndication'] = function(/* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'enablePageLoadingIndication',
                valueCallbackIndex: 0
            });
        };
        
    
        
        WebView['setEnableWebPlugins'] = function(/* any valid value */ value, /* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'enableWebPlugins=',
                valueCallbackIndex: 1
            });
        };
        
        
        WebView['getEnableWebPlugins'] = function(/* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'enableWebPlugins',
                valueCallbackIndex: 0
            });
        };
        
    
        
        WebView['setNavigationTimeout'] = function(/* any valid value */ value, /* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'navigationTimeout=',
                valueCallbackIndex: 1
            });
        };
        
        
        WebView['getNavigationTimeout'] = function(/* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'navigationTimeout',
                valueCallbackIndex: 0
            });
        };
        
    
        
        
        WebView['getScrollTechnique'] = function(/* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'scrollTechnique',
                valueCallbackIndex: 0
            });
        };
        
    
        
        
        WebView['getFontFamily'] = function(/* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'fontFamily',
                valueCallbackIndex: 0
            });
        };
        
    
        
        
        WebView['getUserAgent'] = function(/* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'userAgent',
                valueCallbackIndex: 0
            });
        };
        
    
        
        
        WebView['getViewportEnabled'] = function(/* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'viewportEnabled',
                valueCallbackIndex: 0
            });
        };
        
    
        
        
        WebView['getViewportWidth'] = function(/* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'viewportWidth',
                valueCallbackIndex: 0
            });
        };
        
    
        
        
        WebView['getCacheSize'] = function(/* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'cacheSize',
                valueCallbackIndex: 0
            });
        };
        
    
        
        WebView['setEnableCache'] = function(/* any valid value */ value, /* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'enableCache=',
                valueCallbackIndex: 1
            });
        };
        
        
        WebView['getEnableCache'] = function(/* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'enableCache',
                valueCallbackIndex: 0
            });
        };
        
    
        
        WebView['setAcceptLanguage'] = function(/* any valid value */ value, /* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'acceptLanguage=',
                valueCallbackIndex: 1
            });
        };
        
        
        WebView['getAcceptLanguage'] = function(/* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'acceptLanguage',
                valueCallbackIndex: 0
            });
        };
        
    
        
        WebView['setZoomPage'] = function(/* any valid value */ value, /* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'zoomPage=',
                valueCallbackIndex: 1
            });
        };
        
        
        WebView['getZoomPage'] = function(/* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'zoomPage',
                valueCallbackIndex: 0
            });
        };
        
    
        
        WebView['setTextZoomLevel'] = function(/* any valid value */ value, /* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'textZoomLevel=',
                valueCallbackIndex: 1
            });
        };
        
        
        WebView['getTextZoomLevel'] = function(/* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'textZoomLevel',
                valueCallbackIndex: 0
            });
        };
        
    
        
        
        WebView['getActiveTab'] = function(/* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'activeTab',
                valueCallbackIndex: 0
            });
        };
        
    

    // === WebView static methods ===

    
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
    
        WebView['setCookie'] = function(/* const rho::String& */ url, /* const rho::String& */ cookie, /* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'setCookie',
                
                valueCallbackIndex: 2
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
    

    // === WebView default instance support ===

    

    rhoUtil.namespace(moduleNS, WebView);

})(jQuery, Rho, Rho.util);
