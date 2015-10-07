package com.rho.dummy;



import java.util.Map;
import java.util.List;

import com.rhomobile.rhodes.api.IMethodResult;
import com.rhomobile.rhodes.api.IRhoApiObject;

import com.rhomobile.rhodes.api.IRhoApiPropertyBag;

public interface IDummy extends IRhoApiObject, IRhoApiPropertyBag {

    void getSimpleStringProperty(IMethodResult result);
    void setSimpleStringProperty(String simpleStringProperty, IMethodResult result);
    void getPlatformName(IMethodResult result);
    void calcSumm(int a, int b, IMethodResult result);
    void joinStrings(String a, String b, IMethodResult result);
    void enable(int firingInterval, IMethodResult result);
    void enableString(int firingInterval, IMethodResult result);
    void enableInt(int firingInterval, IMethodResult result);
    void enableBool(int firingInterval, IMethodResult result);
    void enableFloat(int firingInterval, IMethodResult result);
    void enableArray(int firingInterval, IMethodResult result);
    void stop(IMethodResult result);
};
