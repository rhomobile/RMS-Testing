package com.rho.examples.megamodule;

import java.util.LinkedList;
import java.util.List;

import com.rhomobile.rhodes.api.IMethodResult;

class MegamoduleSingleton extends MegamoduleSingletonBase implements IMegamoduleSingleton {
    public MegamoduleSingleton(MegamoduleFactory factory) {
        super(factory);
    }

    List<Object> getIDs() {
        List<Object> ids = new LinkedList<Object>();
        ids.add("MM1");
        ids.add("MM2");
        ids.add("MM3");
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

    @Override
    public void getObjectsCount(IMethodResult result) {
        result.set(3);
    }

    @Override
    public void getObjectByIndex(int index, IMethodResult result) {
    	if (index == 0) {
    		result.set("MM1");
    	}
    	if (index == 1) {
    		result.set("MM2");
    	}
    	if (index == 2) {
    		result.set("MM3");
    	}
    }
}