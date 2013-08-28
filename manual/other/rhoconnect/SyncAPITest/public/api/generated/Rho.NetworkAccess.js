(function ($, rho, rhoUtil) {
    'use strict';

    var module = null;

    var apiReq = rhoUtil.apiReqFor('Rho.NetworkAccess');

    // === NetworkAccess class definition ===

    function NetworkAccess(id) {
        if (!(this instanceof NetworkAccess)) return new NetworkAccess(id);

        this.getId = function () {
            return id;
        };
    };

    // === NetworkAccess instance members ===

    

    // === NetworkAccess static members ===

    
            NetworkAccess.AUTH_BASIC = 'basic';
        
    

    
        NetworkAccess['cancel'] = function(/* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'cancel',
                valueCallbackIndex: 0
            });
        };
    
        NetworkAccess['downloadFile'] = function(/* const rho::Hashtable<rho::String, rho::String>& */ propertyMap, /* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'downloadFile',
                valueCallbackIndex: 1
            });
        };
    
        NetworkAccess['get'] = function(/* const rho::Hashtable<rho::String, rho::String>& */ propertyMap, /* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'get',
                valueCallbackIndex: 1
            });
        };
    
        NetworkAccess['post'] = function(/* const rho::Hashtable<rho::String, rho::String>& */ propertyMap, /* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'post',
                valueCallbackIndex: 1
            });
        };
    
        NetworkAccess['uploadFile'] = function(/* const rho::Hashtable<rho::String, rho::String>& */ propertyMap, /* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'uploadFile',
                valueCallbackIndex: 1
            });
        };
    

    // === NetworkAccess default instance support ===

    

    rhoUtil.namespace('Rho.NetworkAccess', NetworkAccess);

})(jQuery, Rho, Rho.util);
