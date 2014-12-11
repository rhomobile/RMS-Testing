package com.rho.entitygen;

import com.rhomobile.rhodes.api.RhoApiFactory;

public class EntityGenFactory
        extends RhoApiFactory< EntityGen, EntityGenSingleton>
        implements IEntityGenFactory {

    @Override
    protected EntityGenSingleton createSingleton() {
        return new EntityGenSingleton(this);
    }

    @Override
    protected EntityGen createApiObject(String id) {
        return new EntityGen(id);
    }
}
