
(function ($, rho, rhoUtil) {
    'use strict';

    var moduleNS = 'Rho.GenPropBag';
    var apiReq = rhoUtil.apiReqFor(moduleNS);


    // === GenPropBag class definition ===

    function GenPropBag() {
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

    // === GenPropBag instance properties ===

    rhoUtil.createPropsProxy(GenPropBag.prototype, [
        { propName: 'boolProp', propAccess: 'rw' }
      , { propName: 'intProp', propAccess: 'rw' }
      , { propName: 'floatProp', propAccess: 'rw' }
      , { propName: 'stringProp', propAccess: 'rw' }
    ], apiReq, function(){ return this.getId(); });

    // === GenPropBag instance methods ===

    rhoUtil.createMethodsProxy(GenPropBag.prototype, [
    
          // function(/* const rho::String& */ propertyName, /* optional function */ oResult)
          { methodName: 'getProperty', nativeName: 'getProperty', persistentCallbackIndex: 1, valueCallbackIndex: 3 }
    
          // function(/* const rho::Vector<rho::String>& */ arrayofNames, /* optional function */ oResult)
        , { methodName: 'getProperties', nativeName: 'getProperties', persistentCallbackIndex: 1, valueCallbackIndex: 3 }
    
          // function(/* optional function */ oResult)
        , { methodName: 'getAllProperties', nativeName: 'getAllProperties', persistentCallbackIndex: 0, valueCallbackIndex: 2 }
    
          // function(/* const rho::String& */ propertyName, /* const rho::String& */ propertyValue, /* optional function */ oResult)
        , { methodName: 'setProperty', nativeName: 'setProperty', valueCallbackIndex: 2 }
    
          // function(/* const rho::Hashtable<rho::String, rho::String>& */ propertyMap, /* optional function */ oResult)
        , { methodName: 'setProperties', nativeName: 'setProperties', valueCallbackIndex: 1 }
    
    ], apiReq, function(){ return this.getId(); });

    

    rhoUtil.createRawPropsProxy(GenPropBag.prototype, [
    ]);

    // === GenPropBag constants ===

    



    // === GenPropBag static properties ===

    rhoUtil.createPropsProxy(GenPropBag, [
    ], apiReq);

    // === GenPropBag static methods ===

    rhoUtil.createMethodsProxy(GenPropBag, [
    
          // function(/* optional function */ oResult)
          { methodName: 'enumerate', nativeName: 'enumerate', persistentCallbackIndex: 0, valueCallbackIndex: 2 }
    
    ], apiReq);

    // === GenPropBag default instance support ===
    

        rhoUtil.createPropsProxy(GenPropBag, [
            { propName: 'defaultInstance:getDefault:setDefault', propAccess: 'rw', customSet: function(obj) { if(!obj || 'function' != typeof obj.getId){ throw 'Default object should provide getId method!' }; GenPropBag.setDefaultID(obj.getId()); } }
          , { propName: 'defaultID:getDefaultID:setDefaultID', propAccess: 'rw' }
        ], apiReq);

        GenPropBag.getId = function() {
            return GenPropBag.getDefaultID();
        }

        // === GenPropBag default instance properties ===

        rhoUtil.createPropsProxy(GenPropBag, [
            { propName: 'boolProp', propAccess: 'rw' }
          , { propName: 'intProp', propAccess: 'rw' }
          , { propName: 'floatProp', propAccess: 'rw' }
          , { propName: 'stringProp', propAccess: 'rw' }
        ], apiReq, function(){ return this.getId(); });

        // === GenPropBag default instance methods ===

        rhoUtil.createMethodsProxy(GenPropBag, [
        
              // function(/* const rho::String& */ propertyName, /* optional function */ oResult)
              { methodName: 'getProperty', nativeName: 'getProperty', persistentCallbackIndex: 1, valueCallbackIndex: 3 }
        
              // function(/* const rho::Vector<rho::String>& */ arrayofNames, /* optional function */ oResult)
            , { methodName: 'getProperties', nativeName: 'getProperties', persistentCallbackIndex: 1, valueCallbackIndex: 3 }
        
              // function(/* optional function */ oResult)
            , { methodName: 'getAllProperties', nativeName: 'getAllProperties', persistentCallbackIndex: 0, valueCallbackIndex: 2 }
        
              // function(/* const rho::String& */ propertyName, /* const rho::String& */ propertyValue, /* optional function */ oResult)
            , { methodName: 'setProperty', nativeName: 'setProperty', valueCallbackIndex: 2 }
        
              // function(/* const rho::Hashtable<rho::String, rho::String>& */ propertyMap, /* optional function */ oResult)
            , { methodName: 'setProperties', nativeName: 'setProperties', valueCallbackIndex: 1 }
        
        ], apiReq, function(){ return this.getId(); });

        // will reuse already defined methods
        rhoUtil.createRawPropsProxy(GenPropBag, [
        ]);

    

    rhoUtil.namespace(moduleNS, GenPropBag);

    

    

})(Rho.jQuery, Rho, Rho.util);
