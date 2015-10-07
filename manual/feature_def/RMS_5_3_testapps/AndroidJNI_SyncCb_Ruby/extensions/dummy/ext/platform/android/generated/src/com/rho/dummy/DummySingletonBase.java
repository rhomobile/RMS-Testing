package com.rho.dummy;

import java.util.List;
import java.util.Map;

import com.rhomobile.rhodes.api.IMethodResult;

import com.rhomobile.rhodes.api.RhoApiDefaultId;

public abstract class DummySingletonBase 
    extends RhoApiDefaultId<IDummy, IDummyFactory>  {

    public DummySingletonBase(IDummyFactory factory) {
        super(factory);
    } 

    public static class enumerateTask implements Runnable {
        private IDummySingleton mApiSingleton; 
        private IMethodResult mResult;

        public enumerateTask(IDummySingleton obj,         
                IMethodResult result) {
            this.mApiSingleton = obj;         
            this.mResult = result;
        }

        @Override
        public void run() {
            try {
                mApiSingleton.enumerate( mResult);
            } catch (Throwable ex) {
                mResult.set(ex);
            }
        }
    }

    
}
