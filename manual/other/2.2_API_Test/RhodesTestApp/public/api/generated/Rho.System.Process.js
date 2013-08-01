(function ($, rho, rhoUtil) {
    'use strict';

    var module = null;

    var apiReq = rhoUtil.apiReqFor('Rho.System.Process');

    // === Process class definition ===

    function Process(id) {
        if (!(this instanceof Process)) return new Process(id);

        this.getId = function () {
            return id;
        };
    };

    // === Process instance members ===

    
        Process.prototype.waitForApplication = function(/* optional function */ oResult) {
            return apiReq({
                instanceId: this.getId(),
                args: arguments,
                method: 'waitForApplication',
                valueCallbackIndex: 0
            });
        };

    
        Process.prototype.closeHandle = function(/* optional function */ oResult) {
            return apiReq({
                instanceId: this.getId(),
                args: arguments,
                method: 'closeHandle',
                valueCallbackIndex: 0
            });
        };

    
        Process.prototype.getProcessExitCode = function(/* optional function */ oResult) {
            return apiReq({
                instanceId: this.getId(),
                args: arguments,
                method: 'getProcessExitCode',
                valueCallbackIndex: 0
            });
        };

    

    // === Process static members ===

    

    
        Process['runApplication'] = function(/* const rho::String& */ appName, /* const rho::String& */ params, /* bool */ blockingCall, /* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'runApplication',
                valueCallbackIndex: 3
            });
        };
    

    // === Process default instance support ===

    

    rhoUtil.namespace('Rho.System.Process', Process);

})(jQuery, Rho, Rho.util);
