
(function ($, rho, rhoUtil) {
    'use strict';

    var moduleNS = 'Rho.Application';
    var apiReq = rhoUtil.apiReqFor(moduleNS);

    // === Application class definition ===

    function Application() {
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

    // === Application instance properties ===

    

    // === Application instance methods ===

    

    // === Application constants ===

    

    // === Application static properties ===

    
        
        
        Application['getAppBundleFolder'] = function(/* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'appBundleFolder',
                valueCallbackIndex: 0
            });
        };
        
    
        
        
        Application['getAppsBundleFolder'] = function(/* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'appsBundleFolder',
                valueCallbackIndex: 0
            });
        };
        
    
        
        
        Application['getUserFolder'] = function(/* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'userFolder',
                valueCallbackIndex: 0
            });
        };
        
    
        
        
        Application['getConfigPath'] = function(/* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'configPath',
                valueCallbackIndex: 0
            });
        };
        
    
        
        
        Application['getModelsManifestPath'] = function(/* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'modelsManifestPath',
                valueCallbackIndex: 0
            });
        };
        
    
        
        
        Application['getDatabaseBlobFolder'] = function(/* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'databaseBlobFolder',
                valueCallbackIndex: 0
            });
        };
        
    
        
        
        Application['getPublicFolder'] = function(/* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'publicFolder',
                valueCallbackIndex: 0
            });
        };
        
    
        
        Application['setStartURI'] = function(/* any valid value */ value, /* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'startURI=',
                valueCallbackIndex: 1
            });
        };
        
        
        Application['getStartURI'] = function(/* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'startURI',
                valueCallbackIndex: 0
            });
        };
        
    
        
        Application['setSettingsPageURI'] = function(/* any valid value */ value, /* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'settingsPageURI=',
                valueCallbackIndex: 1
            });
        };
        
        
        Application['getSettingsPageURI'] = function(/* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'settingsPageURI',
                valueCallbackIndex: 0
            });
        };
        
    
        
        
        Application['getSplash'] = function(/* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'splash',
                valueCallbackIndex: 0
            });
        };
        
    
        
        
        Application['getVersion'] = function(/* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'version',
                valueCallbackIndex: 0
            });
        };
        
    
        
        Application['setTitle'] = function(/* any valid value */ value, /* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'title=',
                valueCallbackIndex: 1
            });
        };
        
        
        Application['getTitle'] = function(/* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'title',
                valueCallbackIndex: 0
            });
        };
        
    
        
        
        Application['getName'] = function(/* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'name',
                valueCallbackIndex: 0
            });
        };
        
    
        
        
        Application['getLocale'] = function(/* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'locale',
                valueCallbackIndex: 0
            });
        };
        
    
        
        
        Application['getCountry'] = function(/* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'country',
                valueCallbackIndex: 0
            });
        };
        
    
        
        Application['setBadLinkURI'] = function(/* any valid value */ value, /* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'badLinkURI=',
                valueCallbackIndex: 1
            });
        };
        
        
        Application['getBadLinkURI'] = function(/* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'badLinkURI',
                valueCallbackIndex: 0
            });
        };
        
    

    // === Application static methods ===

    
        Application['modelFolderPath'] = function(/* const rho::String& */ name, /* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'modelFolderPath',
                
                valueCallbackIndex: 1
            });
        };
    
        Application['databaseFilePath'] = function(/* const rho::String& */ partitionName, /* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'databaseFilePath',
                
                valueCallbackIndex: 1
            });
        };
    
        Application['expandDatabaseBlobFilePath'] = function(/* const rho::String& */ relativePath, /* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'expandDatabaseBlobFilePath',
                
                valueCallbackIndex: 1
            });
        };
    
        Application['quit'] = function(/* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'quit',
                
                valueCallbackIndex: 0
            });
        };
    
        Application['minimize'] = function(/* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'minimize',
                
                valueCallbackIndex: 0
            });
        };
    
        Application['restore'] = function(/* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'restore',
                
                valueCallbackIndex: 0
            });
        };
    
        Application['setActivationNotify'] = function(/* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'setActivationNotify',
                persistentCallbackIndex: 0,
                valueCallbackIndex: 2
            });
        };
    
        Application['getRhoPlatformVersion'] = function(/* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'getRhoPlatformVersion',
                persistentCallbackIndex: 0,
                valueCallbackIndex: 2
            });
        };
    

    // === Application default instance support ===

    

    rhoUtil.namespace(moduleNS, Application);

})(jQuery, Rho, Rho.util);
