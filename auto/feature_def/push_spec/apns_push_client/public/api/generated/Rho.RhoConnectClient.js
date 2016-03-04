
(function ($, rho, rhoUtil) {
    'use strict';

    var moduleNS = 'Rho.RhoConnectClient';
    var apiReq = rhoUtil.apiReqFor(moduleNS);

    // === RhoConnectClient class definition ===

    function RhoConnectClient() {
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

    // === RhoConnectClient instance properties ===

    

    // === RhoConnectClient instance methods ===

    

    // === RhoConnectClient constants ===

    

    // === RhoConnectClient static properties ===

    
        
        
        RhoConnectClient['getUserName'] = function(/* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'userName',
                valueCallbackIndex: 0
            });
        };
        
    
        
        RhoConnectClient['setPollInterval'] = function(/* any valid value */ value, /* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'pollInterval=',
                valueCallbackIndex: 1
            });
        };
        
        
        RhoConnectClient['getPollInterval'] = function(/* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'pollInterval',
                valueCallbackIndex: 0
            });
        };
        
    
        
        RhoConnectClient['setSyncServer'] = function(/* any valid value */ value, /* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'syncServer=',
                valueCallbackIndex: 1
            });
        };
        
        
        RhoConnectClient['getSyncServer'] = function(/* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'syncServer',
                valueCallbackIndex: 0
            });
        };
        
    
        
        RhoConnectClient['setPageSize'] = function(/* any valid value */ value, /* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'pageSize=',
                valueCallbackIndex: 1
            });
        };
        
        
        RhoConnectClient['getPageSize'] = function(/* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'pageSize',
                valueCallbackIndex: 0
            });
        };
        
    
        
        RhoConnectClient['setThreadedMode'] = function(/* any valid value */ value, /* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'threadedMode=',
                valueCallbackIndex: 1
            });
        };
        
        
        RhoConnectClient['getThreadedMode'] = function(/* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'threadedMode',
                valueCallbackIndex: 0
            });
        };
        
    
        
        RhoConnectClient['setShowStatusPopup'] = function(/* any valid value */ value, /* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'showStatusPopup=',
                valueCallbackIndex: 1
            });
        };
        
        
        RhoConnectClient['getShowStatusPopup'] = function(/* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'showStatusPopup',
                valueCallbackIndex: 0
            });
        };
        
    
        
        RhoConnectClient['setSslVerifyPeer'] = function(/* any valid value */ value, /* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'sslVerifyPeer=',
                valueCallbackIndex: 1
            });
        };
        
        
        RhoConnectClient['getSslVerifyPeer'] = function(/* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'sslVerifyPeer',
                valueCallbackIndex: 0
            });
        };
        
    

    // === RhoConnectClient static methods ===

    
        RhoConnectClient['loggedIn?'] = function(/* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'loggedIn?',
                
                valueCallbackIndex: 0
            });
        };
    
        RhoConnectClient['syncing?'] = function(/* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'syncing?',
                
                valueCallbackIndex: 0
            });
        };
    
        RhoConnectClient['search'] = function(/* const rho::Hashtable<rho::String, rho::String>& */ args, /* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'search',
                persistentCallbackIndex: 1,
                valueCallbackIndex: 3
            });
        };
    
        RhoConnectClient['doSync'] = function(/* bool */ showStatusPopup, /* const rho::String& */ queryParams, /* bool */ syncOnlyChangedSources, /* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'doSync',
                
                valueCallbackIndex: 3
            });
        };
    
        RhoConnectClient['doSyncSource'] = function(/* const rho::String& */ sourceName, /* bool */ showStatusPopup, /* const rho::String& */ queryParams, /* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'doSyncSource',
                
                valueCallbackIndex: 3
            });
        };
    
        RhoConnectClient['login'] = function(/* const rho::String& */ login, /* const rho::String& */ password, /* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'login',
                persistentCallbackIndex: 2,
                valueCallbackIndex: 4
            });
        };
    
        RhoConnectClient['logout'] = function(/* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'logout',
                
                valueCallbackIndex: 0
            });
        };
    
        RhoConnectClient['stopSync'] = function(/* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'stopSync',
                
                valueCallbackIndex: 0
            });
        };
    
        RhoConnectClient['setNotification'] = function(/* const rho::String& */ sourceName, /* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'setNotification',
                persistentCallbackIndex: 1,
                valueCallbackIndex: 3
            });
        };
    
        RhoConnectClient['clearNotification'] = function(/* const rho::String& */ sourceName, /* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'clearNotification',
                
                valueCallbackIndex: 1
            });
        };
    
        RhoConnectClient['setObjectNotification'] = function(/* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'setObjectNotification',
                persistentCallbackIndex: 0,
                valueCallbackIndex: 2
            });
        };
    
        RhoConnectClient['addObjectNotify'] = function(/* const rho::String& */ sourceName, /* const rho::String& */ object, /* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'addObjectNotify',
                
                valueCallbackIndex: 2
            });
        };
    
        RhoConnectClient['cleanObjectNotify'] = function(/* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'cleanObjectNotify',
                
                valueCallbackIndex: 0
            });
        };
    
        RhoConnectClient['getLastSyncObjectCount'] = function(/* const rho::String& */ sourceName, /* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'getLastSyncObjectCount',
                
                valueCallbackIndex: 1
            });
        };
    
        RhoConnectClient['setSourceProperty'] = function(/* const rho::String& */ sourceName, /* const rho::String& */ propertyName, /* const rho::String& */ propertyValue, /* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'setSourceProperty',
                
                valueCallbackIndex: 3
            });
        };
    
        RhoConnectClient['getSourceProperty'] = function(/* const rho::String& */ sourceName, /* const rho::String& */ propertyName, /* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'getSourceProperty',
                
                valueCallbackIndex: 2
            });
        };
    

    // === RhoConnectClient default instance support ===

    

    rhoUtil.namespace(moduleNS, RhoConnectClient);

})(jQuery, Rho, Rho.util);
