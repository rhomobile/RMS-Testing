package com.rho.nativebridgetest;

import com.rhomobile.rhodes.api.IRhoApiFactory;
import com.rhomobile.rhodes.api.IRhoApiSingletonFactory;

public interface INativeBridgeTestFactory
    extends IRhoApiFactory<INativeBridgeTest>,
            IRhoApiSingletonFactory<INativeBridgeTestSingleton> {

    @Override
    INativeBridgeTestSingleton getApiSingleton();

    @Override
    INativeBridgeTest getApiObject(String id);

}
