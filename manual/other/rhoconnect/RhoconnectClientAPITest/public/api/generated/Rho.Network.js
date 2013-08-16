
(function ($, rho, rhoUtil) {
    'use strict';

    var moduleNS = 'Rho.Network';
    var apiReq = rhoUtil.apiReqFor(moduleNS);

    // === Network class definition ===

    function Network() {
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

    // === Network instance properties ===

    

    // === Network instance methods ===

    

    // === Network constants ===

    
            Network.AUTH_BASIC = 'basic';
        
    

    // === Network static properties ===

    
        
        Network['setUrl'] = function(/* any valid value */ value, /* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'url=',
                valueCallbackIndex: 1
            });
        };
        
        
        Network['getUrl'] = function(/* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'url',
                valueCallbackIndex: 0
            });
        };
        
    
        
        Network['setAuthType'] = function(/* any valid value */ value, /* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'authType=',
                valueCallbackIndex: 1
            });
        };
        
        
        Network['getAuthType'] = function(/* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'authType',
                valueCallbackIndex: 0
            });
        };
        
    
        
        Network['setAuthUser'] = function(/* any valid value */ value, /* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'authUser=',
                valueCallbackIndex: 1
            });
        };
        
        
        Network['getAuthUser'] = function(/* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'authUser',
                valueCallbackIndex: 0
            });
        };
        
    
        
        Network['setAuthPassword'] = function(/* any valid value */ value, /* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'authPassword=',
                valueCallbackIndex: 1
            });
        };
        
        
        Network['getAuthPassword'] = function(/* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'authPassword',
                valueCallbackIndex: 0
            });
        };
        
    
        
        Network['setVerifyPeerCertificate'] = function(/* any valid value */ value, /* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'verifyPeerCertificate=',
                valueCallbackIndex: 1
            });
        };
        
        
        Network['getVerifyPeerCertificate'] = function(/* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'verifyPeerCertificate',
                valueCallbackIndex: 0
            });
        };
        
    
        
        Network['setHttpVerb'] = function(/* any valid value */ value, /* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'httpVerb=',
                valueCallbackIndex: 1
            });
        };
        
        
        Network['getHttpVerb'] = function(/* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'httpVerb',
                valueCallbackIndex: 0
            });
        };
        
    
        
        Network['setHeaders'] = function(/* any valid value */ value, /* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'headers=',
                valueCallbackIndex: 1
            });
        };
        
        
        Network['getHeaders'] = function(/* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'headers',
                valueCallbackIndex: 0
            });
        };
        
    
        
        Network['setResponseTimeout'] = function(/* any valid value */ value, /* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'responseTimeout=',
                valueCallbackIndex: 1
            });
        };
        
        
        Network['getResponseTimeout'] = function(/* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'responseTimeout',
                valueCallbackIndex: 0
            });
        };
        
    

    // === Network static methods ===

    
        Network['cancel'] = function(/* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'cancel',
                persistentCallbackIndex: 0,
                valueCallbackIndex: 2
            });
        };
    
        Network['downloadFile'] = function(/* const rho::Hashtable<rho::String, rho::String>& */ propertyMap, /* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'downloadFile',
                persistentCallbackIndex: 1,
                valueCallbackIndex: 3
            });
        };
    
        Network['get'] = function(/* const rho::Hashtable<rho::String, rho::String>& */ propertyMap, /* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'get',
                persistentCallbackIndex: 1,
                valueCallbackIndex: 3
            });
        };
    
        Network['post'] = function(/* const rho::Hashtable<rho::String, rho::String>& */ propertyMap, /* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'post',
                persistentCallbackIndex: 1,
                valueCallbackIndex: 3
            });
        };
    
        Network['uploadFile'] = function(/* const rho::Hashtable<rho::String, rho::String>& */ propertyMap, /* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'uploadFile',
                persistentCallbackIndex: 1,
                valueCallbackIndex: 3
            });
        };
    
        Network['hasNetwork'] = function(/* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'hasNetwork',
                
                valueCallbackIndex: 0
            });
        };
    
        Network['hasWifiNetwork'] = function(/* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'hasWifiNetwork',
                
                valueCallbackIndex: 0
            });
        };
    
        Network['hasCellNetwork'] = function(/* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'hasCellNetwork',
                
                valueCallbackIndex: 0
            });
        };
    
        Network['startStatusNotify'] = function(/* int */ pollInterval, /* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'startStatusNotify',
                persistentCallbackIndex: 1,
                valueCallbackIndex: 3
            });
        };
    
        Network['stopStatusNotify'] = function(/* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'stopStatusNotify',
                
                valueCallbackIndex: 0
            });
        };
    
        Network['detectConnection'] = function(/* const rho::Hashtable<rho::String, rho::String>& */ propertyMap, /* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'detectConnection',
                persistentCallbackIndex: 1,
                valueCallbackIndex: 3
            });
        };
    
        Network['stopDetectingConnection'] = function(/* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'stopDetectingConnection',
                persistentCallbackIndex: 0,
                valueCallbackIndex: 2
            });
        };
    
        Network['connectWan'] = function(/* const rho::String& */ connectionDestination, /* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'connectWan',
                persistentCallbackIndex: 1,
                valueCallbackIndex: 3
            });
        };
    
        Network['disconnectWan'] = function(/* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'disconnectWan',
                
                valueCallbackIndex: 0
            });
        };
    

    // === Network default instance support ===

    

    rhoUtil.namespace(moduleNS, Network);

})(jQuery, Rho, Rho.util);
