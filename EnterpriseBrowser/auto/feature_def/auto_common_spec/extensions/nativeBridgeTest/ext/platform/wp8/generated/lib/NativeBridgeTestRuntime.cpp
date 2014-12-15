// NativeBridgeTestRuntime.cpp
#include "NativeBridgeTestRuntime.h"
#include "NativeBridgeTestFactory.h"

using namespace Platform;
using namespace rho::apiGenerator;

using namespace rho;

namespace rhoruntime
{

NativeBridgeTestRuntimeComponent::NativeBridgeTestRuntimeComponent(INativeBridgeTestImpl^ impl):
    _impl(impl)
{
    // TODO: implement runtime component constructor
}

NativeBridgeTestSingletonComponent::NativeBridgeTestSingletonComponent(INativeBridgeTestSingletonImpl^ impl):
    _impl(impl)
{
    // TODO: implement singleton component constructor
}

void NativeBridgeTestSingletonComponent::testBool(bool val, IMethodResult^ oResult)
{
    _impl->testBool(val, oResult);
}

void NativeBridgeTestSingletonComponent::testInt(int val, IMethodResult^ oResult)
{
    _impl->testInt(val, oResult);
}

void NativeBridgeTestSingletonComponent::testFloat(double val, IMethodResult^ oResult)
{
    _impl->testFloat(val, oResult);
}

void NativeBridgeTestSingletonComponent::testString(Platform::String^ val, IMethodResult^ oResult)
{
    _impl->testString(val, oResult);
}

void NativeBridgeTestFactoryComponent::setImpl(INativeBridgeTestFactoryImpl^ impl)
{
    CNativeBridgeTestFactory::setImpl(impl);
}

}