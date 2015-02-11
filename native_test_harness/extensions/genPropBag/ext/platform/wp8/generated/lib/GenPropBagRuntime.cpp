// GenPropBagRuntime.cpp
#include "GenPropBagRuntime.h"
#include "GenPropBagFactory.h"
#include "GenPropBag_impl.h"
#include "../../wp8/rhoruntime/common/RhoConvertWP8.h"

using namespace Platform;
using namespace rho::apiGenerator;

using namespace rho;

namespace rhoruntime
{

GenPropBagRuntimeComponent::GenPropBagRuntimeComponent(IGenPropBagImpl^ impl):
    _impl(impl), _cppImpl(0)
{
    // TODO: implement runtime component constructor
}

int64 GenPropBagRuntimeComponent::getCppImpl()
{
    if (_cppImpl == 0)
    {
        _cppImpl = _impl->getNativeImpl();
    }
    return _cppImpl;
}

GenPropBagSingletonComponent::GenPropBagSingletonComponent(IGenPropBagSingletonImpl^ impl):
    _impl(impl)
{
    // TODO: implement singleton component constructor
}

void GenPropBagSingletonComponent::enumerate(IMethodResult^ oResult)
{
    //((CGenPropBagImpl*)getCppImpl())->enumerate(*(CMethodResult*)(oResult->getNative()));
}

void GenPropBagRuntimeComponent::getProperty(Platform::String^ propertyName, IMethodResult^ oResult)
{
    ((CGenPropBagImpl*)getCppImpl())->getProperty(rho::common::convertStringAFromWP8(propertyName), *(CMethodResult*)(oResult->getNative()));
}

void GenPropBagRuntimeComponent::getProperties(Windows::Foundation::Collections::IVectorView<Platform::String^>^ arrayofNames, IMethodResult^ oResult)
{
    ((CGenPropBagImpl*)getCppImpl())->getProperties(rho::common::convertArrayFromWP8(arrayofNames), *(CMethodResult*)(oResult->getNative()));
}

void GenPropBagRuntimeComponent::getAllProperties(IMethodResult^ oResult)
{
    ((CGenPropBagImpl*)getCppImpl())->getAllProperties(*(CMethodResult*)(oResult->getNative()));
}

void GenPropBagRuntimeComponent::setProperty(Platform::String^ propertyName, Platform::String^ propertyValue, IMethodResult^ oResult)
{
    ((CGenPropBagImpl*)getCppImpl())->setProperty(rho::common::convertStringAFromWP8(propertyName), rho::common::convertStringAFromWP8(propertyValue), *(CMethodResult*)(oResult->getNative()));
}

void GenPropBagRuntimeComponent::setProperties(Windows::Foundation::Collections::IMapView<Platform::String^, Platform::String^>^ propertyMap, IMethodResult^ oResult)
{
    ((CGenPropBagImpl*)getCppImpl())->setProperties(rho::common::convertHashFromWP8(propertyMap), *(CMethodResult*)(oResult->getNative()));
}

void GenPropBagFactoryComponent::setImpl(IGenPropBagFactoryImpl^ impl)
{
    CGenPropBagFactory::setImpl(impl);
}

}