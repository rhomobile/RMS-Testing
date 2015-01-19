package com.rho.genpropbag;

import java.util.List;
import java.util.Map;

import com.rhomobile.rhodes.api.IMethodResult;

import com.rhomobile.rhodes.api.RhoApiDefaultId;

public abstract class GenPropBagSingletonBase 
    extends RhoApiDefaultId<IGenPropBag, IGenPropBagFactory>  {

    public GenPropBagSingletonBase(IGenPropBagFactory factory) {
        super(factory);
    } 

    public static class enumerateTask implements Runnable {
        private IGenPropBagSingleton mApiSingleton; 
        private IMethodResult mResult;

        public enumerateTask(IGenPropBagSingleton obj,         
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
