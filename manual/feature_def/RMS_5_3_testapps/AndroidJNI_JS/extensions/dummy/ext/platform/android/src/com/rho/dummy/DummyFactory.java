package com.rho.dummy;

import com.rhomobile.rhodes.api.RhoApiFactory;

public class DummyFactory
        extends RhoApiFactory< Dummy, DummySingleton>
        implements IDummyFactory {

    @Override
    protected DummySingleton createSingleton() {
        return new DummySingleton(this);
    }

    @Override
    protected Dummy createApiObject(String id) {
        return new Dummy(id);
    }
}
