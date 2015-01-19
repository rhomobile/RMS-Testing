package com.rho.platformbridgetest;

import java.util.LinkedList;
import java.util.List;

import com.rhomobile.rhodes.api.IMethodResult;

class PlatformBridgeTestSingleton extends PlatformBridgeTestSingletonBase implements IPlatformBridgeTestSingleton {
    public PlatformBridgeTestSingleton(PlatformBridgeTestFactory factory) {
        super(factory);
    }

    List<Object> getIDs() {
        List<Object> ids = new LinkedList<Object>();
        ids.add("SCN1");
        ids.add("SCN2");
        return ids;
    }
    
    @Override
    protected String getInitialDefaultID() {
        return (String)(getIDs().get(0));
    }

    @Override
    public void enumerate(IMethodResult res) {
        res.set(getIDs());
    }
}