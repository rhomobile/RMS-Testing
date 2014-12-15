// GenPropBagRuntime.cpp
#include "GenPropBagRuntime.h"
#include "GenPropBagFactory.h"

using namespace Platform;
using namespace rho::apiGenerator;

using namespace rho;

namespace rhoruntime
{

GenPropBagRuntimeComponent::GenPropBagRuntimeComponent(IGenPropBagImpl^ impl):
    _impl(impl)
{
    // TODO: implement runtime component constructor
}

GenPropBagSingletonComponent::GenPropBagSingletonComponent(IGenPropBagSingletonImpl^ impl):
    _impl(impl)
{
    // TODO: implement singleton component constructor
}

void GenPropBagRuntimeComponent::getBoolProp(IMethodResult^ oResult)
{
    _impl->getBoolProp(oResult);
}

void GenPropBagRuntimeComponent::setBoolProp(bool boolProp, IMethodResult^ oResult)
{
    _impl->setBoolProp(boolProp, oResult);
}

void GenPropBagRuntimeComponent::getIntProp(IMethodResult^ oResult)
{
    _impl->getIntProp(oResult);
}

void GenPropBagRuntimeComponent::setIntProp(int intProp, IMethodResult^ oResult)
{
    _impl->setIntProp(intProp, oResult);
}

void GenPropBagRuntimeComponent::getFloatProp(IMethodResult^ oResult)
{
    _impl->getFloatProp(oResult);
}

void GenPropBagRuntimeComponent::setFloatProp(double floatProp, IMethodResult^ oResult)
{
    _impl->setFloatProp(floatProp, oResult);
}

void GenPropBagRuntimeComponent::getStringProp(IMethodResult^ oResult)
{
    _impl->getStringProp(oResult);
}

void GenPropBagRuntimeComponent::setStringProp(Platform::String^ stringProp, IMethodResult^ oResult)
{
    _impl->setStringProp(stringProp, oResult);
}

void GenPropBagSingletonComponent::enumerate(IMethodResult^ oResult)
{
    _impl->enumerate(oResult);
}

void GenPropBagRuntimeComponent::getProperty(Platform::String^ propertyName, IMethodResult^ oResult)
{
    _impl->getProperty(propertyName, oResult);
}

void GenPropBagRuntimeComponent::getProperties(Windows::Foundation::Collections::IVectorView<Platform::String^>^ arrayofNames, IMethodResult^ oResult)
{
    _impl->getProperties(arrayofNames, oResult);
}

void GenPropBagRuntimeComponent::getAllProperties(IMethodResult^ oResult)
{
    _impl->getAllProperties(oResult);
}

void GenPropBagRuntimeComponent::setProperty(Platform::String^ propertyName, Platform::String^ propertyValue, IMethodResult^ oResult)
{
    _impl->setProperty(propertyName, propertyValue, oResult);
}

void GenPropBagRuntimeComponent::setProperties(Windows::Foundation::Collections::IMapView<Platform::String^, Platform::String^>^ propertyMap, IMethodResult^ oResult)
{
    _impl->setProperties(propertyMap, oResult);
}

void GenPropBagFactoryComponent::setImpl(IGenPropBagFactoryImpl^ impl)
{
    CGenPropBagFactory::setImpl(impl);
}

}