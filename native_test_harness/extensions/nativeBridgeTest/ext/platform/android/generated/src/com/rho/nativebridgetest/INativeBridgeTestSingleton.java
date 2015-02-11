package com.rho.nativebridgetest;



import java.util.Map;
import java.util.List;

import com.rhomobile.rhodes.api.IMethodResult;


public interface INativeBridgeTestSingleton
 {



  // hash keys used in properties and parameters



    void testBool(boolean val, IMethodResult result); 
    void testInt(int val, IMethodResult result); 
    void testFloat(double val, IMethodResult result); 
    void testString(String val, IMethodResult result); 
    void testApi(List<Map<String, String>> arrHashStr, Map<String, String> hashHashStr, Map<String, String> hashArrStr, List<List<String>> arrArrStr, IMethodResult result); 

}
