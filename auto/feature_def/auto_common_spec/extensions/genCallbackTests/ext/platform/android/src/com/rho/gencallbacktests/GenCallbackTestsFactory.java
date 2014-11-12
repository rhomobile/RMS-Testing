package com.rho.gencallbacktests;

import com.rhomobile.rhodes.api.RhoApiFactory;

public class GenCallbackTestsFactory
        extends RhoApiFactory< GenCallbackTests, GenCallbackTestsSingleton>
        implements IGenCallbackTestsFactory {

    @Override
    protected GenCallbackTestsSingleton createSingleton() {
        return new GenCallbackTestsSingleton(this);
    }

    @Override
    protected GenCallbackTests createApiObject(String id) {
        return new GenCallbackTests(id);
    }
}
