package com.rho.platformbridgetest;

import com.rhomobile.rhodes.api.RhoApiFactory;

public class PlatformBridgeTestFactory
        extends RhoApiFactory< PlatformBridgeTest, PlatformBridgeTestSingleton>
        implements IPlatformBridgeTestFactory {

    @Override
    protected PlatformBridgeTestSingleton createSingleton() {
        return new PlatformBridgeTestSingleton(this);
    }

    @Override
    protected PlatformBridgeTest createApiObject(String id) {
        return new PlatformBridgeTest(id);
    }
}
