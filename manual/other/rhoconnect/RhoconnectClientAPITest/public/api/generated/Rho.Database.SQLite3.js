
(function ($, rho, rhoUtil) {
    'use strict';

    var moduleNS = 'Rho.Database.SQLite3';
    var apiReq = rhoUtil.apiReqFor(moduleNS);

    // === SQLite3 class definition ===

    function SQLite3() {
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
            
                this.open.apply(this, arguments);
            
        }
    };

    // === SQLite3 instance properties ===

    

    // === SQLite3 instance methods ===

    
        SQLite3.prototype['open'] = function(/* const rho::String& */ dbPath, /* const rho::String& */ dbPartition, /* optional function */ oResult) {
            return apiReq({
                instanceId: this.getId(),
                args: arguments,
                method: 'open',
                
                valueCallbackIndex: 2
            });
        };

    
        SQLite3.prototype['close'] = function(/* optional function */ oResult) {
            return apiReq({
                instanceId: this.getId(),
                args: arguments,
                method: 'close',
                
                valueCallbackIndex: 0
            });
        };

    
        SQLite3.prototype['startTransaction'] = function(/* optional function */ oResult) {
            return apiReq({
                instanceId: this.getId(),
                args: arguments,
                method: 'startTransaction',
                
                valueCallbackIndex: 0
            });
        };

    
        SQLite3.prototype['commitTransaction'] = function(/* optional function */ oResult) {
            return apiReq({
                instanceId: this.getId(),
                args: arguments,
                method: 'commitTransaction',
                
                valueCallbackIndex: 0
            });
        };

    
        SQLite3.prototype['rollbackTransaction'] = function(/* optional function */ oResult) {
            return apiReq({
                instanceId: this.getId(),
                args: arguments,
                method: 'rollbackTransaction',
                
                valueCallbackIndex: 0
            });
        };

    
        SQLite3.prototype['lockDb'] = function(/* optional function */ oResult) {
            return apiReq({
                instanceId: this.getId(),
                args: arguments,
                method: 'lockDb',
                
                valueCallbackIndex: 0
            });
        };

    
        SQLite3.prototype['unlockDb'] = function(/* optional function */ oResult) {
            return apiReq({
                instanceId: this.getId(),
                args: arguments,
                method: 'unlockDb',
                
                valueCallbackIndex: 0
            });
        };

    
        SQLite3.prototype['destroyTables'] = function(/* const rho::Vector<rho::String>& */ include, /* const rho::Vector<rho::String>& */ exclude, /* optional function */ oResult) {
            return apiReq({
                instanceId: this.getId(),
                args: arguments,
                method: 'destroyTables',
                
                valueCallbackIndex: 2
            });
        };

    
        SQLite3.prototype['isTableExist'] = function(/* const rho::String& */ tableName, /* optional function */ oResult) {
            return apiReq({
                instanceId: this.getId(),
                args: arguments,
                method: 'isTableExist',
                
                valueCallbackIndex: 1
            });
        };

    
        SQLite3.prototype['isUiWaitForDb'] = function(/* optional function */ oResult) {
            return apiReq({
                instanceId: this.getId(),
                args: arguments,
                method: 'isUiWaitForDb',
                
                valueCallbackIndex: 0
            });
        };

    
        SQLite3.prototype['execute'] = function(/* const rho::String& */ sqlStmt, /* bool */ isBatch, /* const rho::Vector<rho::String>& */ args, /* optional function */ oResult) {
            return apiReq({
                instanceId: this.getId(),
                args: arguments,
                method: 'execute',
                
                valueCallbackIndex: 3
            });
        };

    

    // === SQLite3 constants ===

    

    // === SQLite3 static properties ===

    

    // === SQLite3 static methods ===

    

    // === SQLite3 default instance support ===

    

    rhoUtil.namespace(moduleNS, SQLite3);

})(jQuery, Rho, Rho.util);
