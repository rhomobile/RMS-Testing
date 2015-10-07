#include "Dummy_impl.h"
#include "DummyFactory.h"
#include "api_generator/wp8/MethodResultImpl.h"

using namespace rho::apiGenerator;
using namespace rhoruntime;

namespace rho {


void CDummyImpl::getSimpleStringProperty(CMethodResult& oResult)
{
    try {
        _runtime->getSimpleStringProperty(ref new CMethodResultImpl((int64)&oResult));
    } catch (Platform::Exception^ e) {
        LOG(ERROR) + rho::common::convertStringAFromWP8(e->ToString());
    }
}

void CDummyImpl::setSimpleStringProperty(const rho::String& simpleStringProperty, CMethodResult& oResult)
{
        Platform::String^ _simpleStringProperty = rho::common::convertStringToWP8(simpleStringProperty);
    try {
        _runtime->setSimpleStringProperty(_simpleStringProperty, ref new CMethodResultImpl((int64)&oResult));
    } catch (Platform::Exception^ e) {
        LOG(ERROR) + rho::common::convertStringAFromWP8(e->ToString());
    }
}

void CDummyImpl::getPlatformName(CMethodResult& oResult)
{
    try {
        _runtime->getPlatformName(ref new CMethodResultImpl((int64)&oResult));
    } catch (Platform::Exception^ e) {
        LOG(ERROR) + rho::common::convertStringAFromWP8(e->ToString());
    }
}

void CDummyImpl::calcSumm(int a, int b, CMethodResult& oResult)
{
    try {
        _runtime->calcSumm(a, b, ref new CMethodResultImpl((int64)&oResult));
    } catch (Platform::Exception^ e) {
        LOG(ERROR) + rho::common::convertStringAFromWP8(e->ToString());
    }
}

void CDummyImpl::joinStrings(const rho::String& a, const rho::String& b, CMethodResult& oResult)
{
        Platform::String^ _a = rho::common::convertStringToWP8(a);
        Platform::String^ _b = rho::common::convertStringToWP8(b);
    try {
        _runtime->joinStrings(_a, _b, ref new CMethodResultImpl((int64)&oResult));
    } catch (Platform::Exception^ e) {
        LOG(ERROR) + rho::common::convertStringAFromWP8(e->ToString());
    }
}

void CDummyImpl::enable(int firingInterval, CMethodResult& oResult)
{
    try {
        _runtime->enable(firingInterval, ref new CMethodResultImpl((int64)&oResult));
    } catch (Platform::Exception^ e) {
        LOG(ERROR) + rho::common::convertStringAFromWP8(e->ToString());
    }
}

void CDummyImpl::enable_Int(int firingInterval, CMethodResult& oResult)
{
    try {
        _runtime->enable_Int(firingInterval, ref new CMethodResultImpl((int64)&oResult));
    } catch (Platform::Exception^ e) {
        LOG(ERROR) + rho::common::convertStringAFromWP8(e->ToString());
    }
}

void CDummyImpl::enable_str(int firingInterval, CMethodResult& oResult)
{
    try {
        _runtime->enable_str(firingInterval, ref new CMethodResultImpl((int64)&oResult));
    } catch (Platform::Exception^ e) {
        LOG(ERROR) + rho::common::convertStringAFromWP8(e->ToString());
    }
}

void CDummyImpl::enable_bool(int firingInterval, CMethodResult& oResult)
{
    try {
        _runtime->enable_bool(firingInterval, ref new CMethodResultImpl((int64)&oResult));
    } catch (Platform::Exception^ e) {
        LOG(ERROR) + rho::common::convertStringAFromWP8(e->ToString());
    }
}

void CDummyImpl::enable_double(int firingInterval, CMethodResult& oResult)
{
    try {
        _runtime->enable_double(firingInterval, ref new CMethodResultImpl((int64)&oResult));
    } catch (Platform::Exception^ e) {
        LOG(ERROR) + rho::common::convertStringAFromWP8(e->ToString());
    }
}

void CDummyImpl::stop(CMethodResult& oResult)
{
    try {
        _runtime->stop(ref new CMethodResultImpl((int64)&oResult));
    } catch (Platform::Exception^ e) {
        LOG(ERROR) + rho::common::convertStringAFromWP8(e->ToString());
    }
}


class CDummySingleton: public CDummySingletonBase
{
private:
    IDummySingletonImpl^ _runtime;
public:
    CDummySingleton(IDummySingletonImpl^ runtime): CDummySingletonBase(), _runtime(runtime) {}
    ~CDummySingleton(){}

    virtual void enumerate(CMethodResult& oResult)
    {
        try {
            _runtime->enumerate(ref new CMethodResultImpl((int64)&oResult));
        } catch (Platform::Exception^ e) {
            LOG(ERROR) + rho::common::convertStringAFromWP8(e->ToString());
        }
    }


    virtual rho::String getDefaultID(){return "1";} // TODO: implement getDefaultID
    virtual rho::String getInitialDefaultID(){return "1";} // TODO: implement getInitialDefaultID
    virtual void setDefaultID(const rho::String& strID){} // TODO: implement setDefaultID
    
    //virtual void addCommandToQueue(rho::common::CInstanceClassFunctorBase<rho::apiGenerator::CMethodResult>* pFunctor){} // TODO: implement addCommandToQueue
    //virtual void callCommandInThread(rho::common::IRhoRunnable* pFunctor){} // TODO: implement callCommandInThread
};

IDummyFactoryImpl^ CDummyFactory::_impl;

IDummy* CDummyFactory::createModuleByID(const rho::String& strID)
{
    return new CDummyImpl(strID, _impl->getImpl());
}

IDummySingleton* CDummyFactory::createModuleSingleton()
{
    return new CDummySingleton(_impl->getSingletonImpl());
}

}

extern "C" void Init_Dummy_extension()
{
    rho::CDummyFactory::setInstance( new rho::CDummyFactory() );
    rho::Init_Dummy_API();

    RHODESAPP().getExtManager().requireRubyFile("RhoDummyApi");
}
