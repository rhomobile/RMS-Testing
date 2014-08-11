
(function ($, rho, rhoUtil) {
    'use strict';

    var moduleNS = 'Rho.NativeBridgeTest';
    var apiReq = rhoUtil.apiReqFor(moduleNS);


    // === NativeBridgeTest class definition ===

    function NativeBridgeTest() {
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

    // === NativeBridgeTest instance properties ===

    rhoUtil.createPropsProxy(NativeBridgeTest.prototype, [
    ], apiReq, function(){ return this.getId(); });

    // === NativeBridgeTest instance methods ===

    rhoUtil.createMethodsProxy(NativeBridgeTest.prototype, [
    
    ], apiReq, function(){ return this.getId(); });

    

    rhoUtil.createRawPropsProxy(NativeBridgeTest.prototype, [
    ]);

    // === NativeBridgeTest constants ===

    



    // === NativeBridgeTest static properties ===

    rhoUtil.createPropsProxy(NativeBridgeTest, [
    ], apiReq);

    // === NativeBridgeTest static methods ===

    rhoUtil.createMethodsProxy(NativeBridgeTest, [
    
          // function(/* bool */ val, /* optional function */ oResult)
          { methodName: 'testBool', nativeName: 'testBool', persistentCallbackIndex: 1, valueCallbackIndex: 3 }
    
          // function(/* int */ val, /* optional function */ oResult)
        , { methodName: 'testInt', nativeName: 'testInt', persistentCallbackIndex: 1, valueCallbackIndex: 3 }
    
          // function(/* double */ val, /* optional function */ oResult)
        , { methodName: 'testFloat', nativeName: 'testFloat', persistentCallbackIndex: 1, valueCallbackIndex: 3 }
    
          // function(/* const rho::String& */ val, /* optional function */ oResult)
        , { methodName: 'testString', nativeName: 'testString', persistentCallbackIndex: 1, valueCallbackIndex: 3 }
    
    ], apiReq);

    // === NativeBridgeTest default instance support ===
    

    rhoUtil.namespace(moduleNS, NativeBridgeTest);

    

    

})(Rho.jQuery, Rho, Rho.util);
