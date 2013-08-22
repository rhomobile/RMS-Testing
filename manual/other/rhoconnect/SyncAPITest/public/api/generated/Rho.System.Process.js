
(function ($, rho, rhoUtil) {
    'use strict';

    var moduleNS = 'Rho.System.Process';
    var apiReq = rhoUtil.apiReqFor(moduleNS);

    // === Process class definition ===

    function Process() {
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

    // === Process instance properties ===

    

    // === Process instance methods ===

    
        Process.prototype['waitForApplication'] = function(/* optional function */ oResult) {
            return apiReq({
                instanceId: this.getId(),
                args: arguments,
                method: 'waitForApplication',
                
                valueCallbackIndex: 0
            });
        };

    
        Process.prototype['closeHandle'] = function(/* optional function */ oResult) {
            return apiReq({
                instanceId: this.getId(),
                args: arguments,
                method: 'closeHandle',
                
                valueCallbackIndex: 0
            });
        };

    
        Process.prototype['getProcessExitCode'] = function(/* optional function */ oResult) {
            return apiReq({
                instanceId: this.getId(),
                args: arguments,
                method: 'getProcessExitCode',
                
                valueCallbackIndex: 0
            });
        };

    

    // === Process constants ===

    

    // === Process static properties ===

    

    // === Process static methods ===

    
        Process['runApplication'] = function(/* const rho::String& */ appName, /* const rho::String& */ params, /* bool */ blockingCall, /* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'runApplication',
                
                valueCallbackIndex: 3
            });
        };
    

    // === Process default instance support ===

    

    rhoUtil.namespace(moduleNS, Process);

})(jQuery, Rho, Rho.util);
