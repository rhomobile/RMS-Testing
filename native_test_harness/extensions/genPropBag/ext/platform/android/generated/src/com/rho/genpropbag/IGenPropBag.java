package com.rho.genpropbag;



import java.util.Map;
import java.util.List;

import com.rhomobile.rhodes.api.IMethodResult;
import com.rhomobile.rhodes.api.IRhoApiObject;

import com.rhomobile.rhodes.api.IRhoApiPropertyBag;

public interface IGenPropBag extends IRhoApiObject, IRhoApiPropertyBag {

    void getBoolProp(IMethodResult result);
    void setBoolProp(boolean boolProp, IMethodResult result);
    void getIntProp(IMethodResult result);
    void setIntProp(int intProp, IMethodResult result);
    void getFloatProp(IMethodResult result);
    void setFloatProp(double floatProp, IMethodResult result);
    void getStringProp(IMethodResult result);
    void setStringProp(String stringProp, IMethodResult result);
};
