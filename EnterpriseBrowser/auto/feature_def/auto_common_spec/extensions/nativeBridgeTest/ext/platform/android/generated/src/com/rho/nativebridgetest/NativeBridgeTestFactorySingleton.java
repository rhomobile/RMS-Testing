package com.rho.nativebridgetest;

public class NativeBridgeTestFactorySingleton {
    private static INativeBridgeTestFactory mFactory;
    public static void setInstance(INativeBridgeTestFactory factory) {
        mFactory = factory;
    }
    public static INativeBridgeTestFactory getInstance() {
        return mFactory;
    }
}
