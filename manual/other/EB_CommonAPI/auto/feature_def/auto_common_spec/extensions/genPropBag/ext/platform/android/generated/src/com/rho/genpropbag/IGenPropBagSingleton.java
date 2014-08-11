package com.rho.genpropbag;



import java.util.Map;
import java.util.List;

import com.rhomobile.rhodes.api.IMethodResult;

import com.rhomobile.rhodes.api.IRhoApiDefaultId;


public interface IGenPropBagSingleton
       extends IRhoApiDefaultId  {



  // hash keys used in properties and parameters

    static final String PROPERTY_BOOL_PROP = "boolProp"; 
    static final String PROPERTY_FLOAT_PROP = "floatProp"; 
    static final String PROPERTY_INT_PROP = "intProp"; 
    static final String PROPERTY_STRING_PROP = "stringProp"; 


    void enumerate(IMethodResult result); 

}
