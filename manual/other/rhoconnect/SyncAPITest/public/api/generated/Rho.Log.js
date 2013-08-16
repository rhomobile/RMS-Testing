
(function ($, rho, rhoUtil) {
    'use strict';

    var moduleNS = 'Rho.Log';
    var apiReq = rhoUtil.apiReqFor(moduleNS);

    // === Log class definition ===

    function Log() {
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

    // === Log instance properties ===

    

    // === Log instance methods ===

    

    // === Log constants ===

    
            Log.LEVEL_TRACE = 0;
        
    
            Log.LEVEL_INFO = 1;
        
    
            Log.LEVEL_WARNING = 2;
        
    
            Log.LEVEL_ERROR = 3;
        
    
            Log.LEVEL_FATAL = 4;
        
    
            Log.DEST_FILE = 'file';
        
    
            Log.DEST_OUTPUT = 'stdio';
        
    
            Log.DEST_URI = 'uri';
        
    

    // === Log static properties ===

    
        
        Log['setLevel'] = function(/* any valid value */ value, /* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'level=',
                valueCallbackIndex: 1
            });
        };
        
        
        Log['getLevel'] = function(/* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'level',
                valueCallbackIndex: 0
            });
        };
        
    
        
        Log['setDestination'] = function(/* any valid value */ value, /* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'destination=',
                valueCallbackIndex: 1
            });
        };
        
        
        Log['getDestination'] = function(/* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'destination',
                valueCallbackIndex: 0
            });
        };
        
    
        
        Log['setIncludeCategories'] = function(/* any valid value */ value, /* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'includeCategories=',
                valueCallbackIndex: 1
            });
        };
        
        
        Log['getIncludeCategories'] = function(/* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'includeCategories',
                valueCallbackIndex: 0
            });
        };
        
    
        
        Log['setExcludeCategories'] = function(/* any valid value */ value, /* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'excludeCategories=',
                valueCallbackIndex: 1
            });
        };
        
        
        Log['getExcludeCategories'] = function(/* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'excludeCategories',
                valueCallbackIndex: 0
            });
        };
        
    
        
        Log['setFileSize'] = function(/* any valid value */ value, /* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'fileSize=',
                valueCallbackIndex: 1
            });
        };
        
        
        Log['getFileSize'] = function(/* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'fileSize',
                valueCallbackIndex: 0
            });
        };
        
    
        
        Log['setFilePath'] = function(/* any valid value */ value, /* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'filePath=',
                valueCallbackIndex: 1
            });
        };
        
        
        Log['getFilePath'] = function(/* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'filePath',
                valueCallbackIndex: 0
            });
        };
        
    
        
        Log['setMemoryPeriod'] = function(/* any valid value */ value, /* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'memoryPeriod=',
                valueCallbackIndex: 1
            });
        };
        
        
        Log['getMemoryPeriod'] = function(/* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'memoryPeriod',
                valueCallbackIndex: 0
            });
        };
        
    
        
        Log['setNetTrace'] = function(/* any valid value */ value, /* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'netTrace=',
                valueCallbackIndex: 1
            });
        };
        
        
        Log['getNetTrace'] = function(/* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'netTrace',
                valueCallbackIndex: 0
            });
        };
        
    
        
        Log['setSkipPost'] = function(/* any valid value */ value, /* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'skipPost=',
                valueCallbackIndex: 1
            });
        };
        
        
        Log['getSkipPost'] = function(/* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'skipPost',
                valueCallbackIndex: 0
            });
        };
        
    
        
        Log['setExcludeFilter'] = function(/* any valid value */ value, /* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'excludeFilter=',
                valueCallbackIndex: 1
            });
        };
        
        
        Log['getExcludeFilter'] = function(/* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'excludeFilter',
                valueCallbackIndex: 0
            });
        };
        
    
        
        Log['setDestinationURI'] = function(/* any valid value */ value, /* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'destinationURI=',
                valueCallbackIndex: 1
            });
        };
        
        
        Log['getDestinationURI'] = function(/* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'destinationURI',
                valueCallbackIndex: 0
            });
        };
        
    

    // === Log static methods ===

    
        Log['trace'] = function(/* const rho::String& */ message, /* const rho::String& */ category, /* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'trace',
                
                valueCallbackIndex: 2
            });
        };
    
        Log['info'] = function(/* const rho::String& */ message, /* const rho::String& */ category, /* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'info',
                
                valueCallbackIndex: 2
            });
        };
    
        Log['warning'] = function(/* const rho::String& */ message, /* const rho::String& */ category, /* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'warning',
                
                valueCallbackIndex: 2
            });
        };
    
        Log['error'] = function(/* const rho::String& */ message, /* const rho::String& */ category, /* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'error',
                
                valueCallbackIndex: 2
            });
        };
    
        Log['fatalError'] = function(/* const rho::String& */ message, /* const rho::String& */ category, /* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'fatalError',
                
                valueCallbackIndex: 2
            });
        };
    
        Log['sendLogFile'] = function(/* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'sendLogFile',
                persistentCallbackIndex: 0,
                valueCallbackIndex: 2
            });
        };
    
        Log['showLog'] = function(/* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'showLog',
                
                valueCallbackIndex: 0
            });
        };
    
        Log['cleanLogFile'] = function(/* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'cleanLogFile',
                
                valueCallbackIndex: 0
            });
        };
    
        Log['readLogFile'] = function(/* int */ limit, /* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'readLogFile',
                
                valueCallbackIndex: 1
            });
        };
    

    // === Log default instance support ===

    

    rhoUtil.namespace(moduleNS, Log);

})(jQuery, Rho, Rho.util);
