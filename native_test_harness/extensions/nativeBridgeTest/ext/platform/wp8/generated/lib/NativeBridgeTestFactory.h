#pragma once

#include "../../../../shared/generated/cpp/NativeBridgeTestBase.h"
#include "NativeBridgeTestRuntime.h"


namespace rho {
class CNativeBridgeTestFactory: public CNativeBridgeTestFactoryBase
{
private:
    static rhoruntime::INativeBridgeTestFactoryImpl^ _impl;
public:
    static void setImpl(rhoruntime::INativeBridgeTestFactoryImpl^ impl) { _impl = impl; }
    ~CNativeBridgeTestFactory(){}
    virtual INativeBridgeTestSingleton* createModuleSingleton();
    virtual INativeBridgeTest* createModuleByID(const rho::String& strID);
};

}
