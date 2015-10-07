package com.rho.dummy;

import com.rhomobile.rhodes.api.IRhoApiFactory;
import com.rhomobile.rhodes.api.IRhoApiSingletonFactory;

public interface IDummyFactory
    extends IRhoApiFactory<IDummy>,
            IRhoApiSingletonFactory<IDummySingleton> {

    @Override
    IDummySingleton getApiSingleton();

    @Override
    IDummy getApiObject(String id);

}
