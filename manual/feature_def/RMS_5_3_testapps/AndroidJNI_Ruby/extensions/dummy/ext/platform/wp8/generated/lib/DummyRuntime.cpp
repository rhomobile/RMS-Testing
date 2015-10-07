// DummyRuntime.cpp
#include "DummyRuntime.h"
#include "DummyFactory.h"
#include "Dummy_impl.h"
#include "../../wp8/rhoruntime/common/RhoConvertWP8.h"

using namespace Platform;
using namespace rho::apiGenerator;

using namespace rho;

namespace rhoruntime
{

DummyRuntimeComponent::DummyRuntimeComponent(IDummyImpl^ impl):
    _impl(impl), _cppImpl(0)
{
    // TODO: implement runtime component constructor
}

int64 DummyRuntimeComponent::getCppImpl()
{
    if (_cppImpl == 0)
    {
        _cppImpl = _impl->getNativeImpl();
    }
    return _cppImpl;
}

DummySingletonComponent::DummySingletonComponent(IDummySingletonImpl^ impl):
    _impl(impl)
{
    // TODO: implement singleton component constructor
}

void DummySingletonComponent::enumerate(IMethodResult^ oResult)
{
    //((CDummyImpl*)getCppImpl())->enumerate(*(CMethodResult*)(oResult->getNative()));
}

void DummyRuntimeComponent::getProperty(Platform::String^ propertyName, IMethodResult^ oResult)
{
    ((CDummyImpl*)getCppImpl())->getProperty(rho::common::convertStringAFromWP8(propertyName), *(CMethodResult*)(oResult->getNative()));
}

void DummyRuntimeComponent::getProperties(Windows::Foundation::Collections::IVectorView<Platform::String^>^ arrayofNames, IMethodResult^ oResult)
{
    ((CDummyImpl*)getCppImpl())->getProperties(rho::common::convertArrayFromWP8(arrayofNames), *(CMethodResult*)(oResult->getNative()));
}

void DummyRuntimeComponent::getAllProperties(IMethodResult^ oResult)
{
    ((CDummyImpl*)getCppImpl())->getAllProperties(*(CMethodResult*)(oResult->getNative()));
}

void DummyRuntimeComponent::setProperty(Platform::String^ propertyName, Platform::String^ propertyValue, IMethodResult^ oResult)
{
    ((CDummyImpl*)getCppImpl())->setProperty(rho::common::convertStringAFromWP8(propertyName), rho::common::convertStringAFromWP8(propertyValue), *(CMethodResult*)(oResult->getNative()));
}

void DummyRuntimeComponent::setProperties(Windows::Foundation::Collections::IMapView<Platform::String^, Platform::String^>^ propertyMap, IMethodResult^ oResult)
{
    ((CDummyImpl*)getCppImpl())->setProperties(rho::common::convertHashFromWP8(propertyMap), *(CMethodResult*)(oResult->getNative()));
}

void DummyFactoryComponent::setImpl(IDummyFactoryImpl^ impl)
{
    CDummyFactory::setImpl(impl);
}

}