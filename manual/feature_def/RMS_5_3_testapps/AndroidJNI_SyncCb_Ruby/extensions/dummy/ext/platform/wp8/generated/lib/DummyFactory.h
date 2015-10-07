#pragma once

#include "../../../../shared/generated/cpp/DummyBase.h"
#include "DummyRuntime.h"


namespace rho {
class CDummyFactory: public CDummyFactoryBase
{
private:
    static rhoruntime::IDummyFactoryImpl^ _impl;
public:
    static void setImpl(rhoruntime::IDummyFactoryImpl^ impl) { _impl = impl; }
    ~CDummyFactory(){}
    virtual IDummySingleton* createModuleSingleton();
    virtual IDummy* createModuleByID(const rho::String& strID);
};

}
