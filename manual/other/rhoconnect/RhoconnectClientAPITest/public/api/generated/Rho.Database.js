
(function ($, rho, rhoUtil) {
    'use strict';

    var moduleNS = 'Rho.Database';
    var apiReq = rhoUtil.apiReqFor(moduleNS);

    // === Database class definition ===

    function Database() {
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

    // === Database instance properties ===

    

    // === Database instance methods ===

    

    // === Database constants ===

    

    // === Database static properties ===

    

    // === Database static methods ===

    

    // === Database default instance support ===

    

    rhoUtil.namespace(moduleNS, Database);

})(jQuery, Rho, Rho.util);
