package com.rho.genpropbag;

import com.rhomobile.rhodes.api.IRhoApiFactory;
import com.rhomobile.rhodes.api.IRhoApiSingletonFactory;

public interface IGenPropBagFactory
    extends IRhoApiFactory<IGenPropBag>,
            IRhoApiSingletonFactory<IGenPropBagSingleton> {

    @Override
    IGenPropBagSingleton getApiSingleton();

    @Override
    IGenPropBag getApiObject(String id);

}
