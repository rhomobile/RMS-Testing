package com.rho.genpropbag;

public class GenPropBagFactorySingleton {
    private static IGenPropBagFactory mFactory;
    public static void setInstance(IGenPropBagFactory factory) {
        mFactory = factory;
    }
    public static IGenPropBagFactory getInstance() {
        return mFactory;
    }
}
