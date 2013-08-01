(function ($, rho, rhoUtil) {
    'use strict';

    var module = null;

    var apiReq = rhoUtil.apiReqFor('Rho.Database.SQLite3');

    // === SQLite3 class definition ===

    function SQLite3(id) {
        if (!(this instanceof SQLite3)) return new SQLite3(id);

        this.getId = function () {
            return id;
        };
    };

    // === SQLite3 instance members ===

    
        SQLite3.prototype.open = function(/* const rho::String& */ dbPath, /* const rho::String& */ dbPartition, /* optional function */ oResult) {
            return apiReq({
                instanceId: this.getId(),
                args: arguments,
                method: 'open',
                valueCallbackIndex: 2
            });
        };

    
        SQLite3.prototype.close = function(/* optional function */ oResult) {
            return apiReq({
                instanceId: this.getId(),
                args: arguments,
                method: 'close',
                valueCallbackIndex: 0
            });
        };

    
        SQLite3.prototype.startTransaction = function(/* optional function */ oResult) {
            return apiReq({
                instanceId: this.getId(),
                args: arguments,
                method: 'startTransaction',
                valueCallbackIndex: 0
            });
        };

    
        SQLite3.prototype.commitTransaction = function(/* optional function */ oResult) {
            return apiReq({
                instanceId: this.getId(),
                args: arguments,
                method: 'commitTransaction',
                valueCallbackIndex: 0
            });
        };

    
        SQLite3.prototype.rollbackTransaction = function(/* optional function */ oResult) {
            return apiReq({
                instanceId: this.getId(),
                args: arguments,
                method: 'rollbackTransaction',
                valueCallbackIndex: 0
            });
        };

    
        SQLite3.prototype.lockDb = function(/* optional function */ oResult) {
            return apiReq({
                instanceId: this.getId(),
                args: arguments,
                method: 'lockDb',
                valueCallbackIndex: 0
            });
        };

    
        SQLite3.prototype.unlockDb = function(/* optional function */ oResult) {
            return apiReq({
                instanceId: this.getId(),
                args: arguments,
                method: 'unlockDb',
                valueCallbackIndex: 0
            });
        };

    
        SQLite3.prototype.import = function(/* const rho::String& */ zipName, /* optional function */ oResult) {
            return apiReq({
                instanceId: this.getId(),
                args: arguments,
                method: 'import',
                valueCallbackIndex: 1
            });
        };

    
        SQLite3.prototype.export = function(/* optional function */ oResult) {
            return apiReq({
                instanceId: this.getId(),
                args: arguments,
                method: 'export',
                valueCallbackIndex: 0
            });
        };

    
        SQLite3.prototype.destroyTables = function(/* const rho::Vector<rho::String>& */ include, /* const rho::Vector<rho::String>& */ exclude, /* optional function */ oResult) {
            return apiReq({
                instanceId: this.getId(),
                args: arguments,
                method: 'destroyTables',
                valueCallbackIndex: 2
            });
        };

    
        SQLite3.prototype.isTableExist = function(/* const rho::String& */ tableName, /* optional function */ oResult) {
            return apiReq({
                instanceId: this.getId(),
                args: arguments,
                method: 'isTableExist',
                valueCallbackIndex: 1
            });
        };

    
        SQLite3.prototype.isUiWaitForDb = function(/* optional function */ oResult) {
            return apiReq({
                instanceId: this.getId(),
                args: arguments,
                method: 'isUiWaitForDb',
                valueCallbackIndex: 0
            });
        };

    
        SQLite3.prototype.execute = function(/* const rho::String& */ sqlStmt, /* bool */ isBatch, /* const rho::Vector<rho::String>& */ args, /* optional function */ oResult) {
            return apiReq({
                instanceId: this.getId(),
                args: arguments,
                method: 'execute',
                valueCallbackIndex: 3
            });
        };

    

    // === SQLite3 static members ===

    

    

    // === SQLite3 default instance support ===

    

    rhoUtil.namespace('Rho.Database.SQLite3', SQLite3);

})(jQuery, Rho, Rho.util);
