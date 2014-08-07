#pragma once

#include "../../../../shared/generated/cpp/GenPropBagBase.h"
#include "GenPropBagRuntime.h"


namespace rho {
class CGenPropBagFactory: public CGenPropBagFactoryBase
{
private:
    static rhoruntime::IGenPropBagFactoryImpl^ _impl;
public:
    static void setImpl(rhoruntime::IGenPropBagFactoryImpl^ impl) { _impl = impl; }
    ~CGenPropBagFactory(){}
    virtual IGenPropBagSingleton* createModuleSingleton();
    virtual IGenPropBag* createModuleByID(const rho::String& strID);
};

}
