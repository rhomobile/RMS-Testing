package com.rho.dummy;



import java.util.Map;
import java.util.List;

import com.rhomobile.rhodes.api.IMethodResult;

import com.rhomobile.rhodes.api.IRhoApiDefaultId;


public interface IDummySingleton
       extends IRhoApiDefaultId  {



  // hash keys used in properties and parameters

    static final String HK_DATA = "data"; 
    static final String HK_STATUS = "status"; 
    static final String PROPERTY_SIMPLE_STRING_PROPERTY = "simpleStringProperty"; 


    void enumerate(IMethodResult result); 

}
