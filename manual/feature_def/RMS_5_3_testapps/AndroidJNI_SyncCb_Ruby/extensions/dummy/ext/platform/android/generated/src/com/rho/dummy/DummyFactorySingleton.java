package com.rho.dummy;

public class DummyFactorySingleton {
    private static IDummyFactory mFactory;
    public static void setInstance(IDummyFactory factory) {
        mFactory = factory;
    }
    public static IDummyFactory getInstance() {
        return mFactory;
    }
}
