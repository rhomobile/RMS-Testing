#include "GenPropBag_impl.h"
#include "../../wp8/rhoruntime/common/RhoConvertWP8.h"
#include "GenPropBagFactory.h"
#include "api_generator/wp8/MethodResultImpl.h"

using namespace rho::apiGenerator;
using namespace rhoruntime;

namespace rho {


void CGenPropBagImpl::getBoolProp(CMethodResult& oResult)
{
    try {
        _runtime->getBoolProp(ref new CMethodResultImpl((int64)&oResult));
    } catch (Platform::Exception^ e) {
        LOG(ERROR) + rho::common::convertStringAFromWP8(e->ToString());
    }
}

void CGenPropBagImpl::setBoolProp(bool boolProp, CMethodResult& oResult)
{
    try {
        _runtime->setBoolProp(boolProp, ref new CMethodResultImpl((int64)&oResult));
    } catch (Platform::Exception^ e) {
        LOG(ERROR) + rho::common::convertStringAFromWP8(e->ToString());
    }
}

void CGenPropBagImpl::getIntProp(CMethodResult& oResult)
{
    try {
        _runtime->getIntProp(ref new CMethodResultImpl((int64)&oResult));
    } catch (Platform::Exception^ e) {
        LOG(ERROR) + rho::common::convertStringAFromWP8(e->ToString());
    }
}

void CGenPropBagImpl::setIntProp(int intProp, CMethodResult& oResult)
{
    try {
        _runtime->setIntProp(intProp, ref new CMethodResultImpl((int64)&oResult));
    } catch (Platform::Exception^ e) {
        LOG(ERROR) + rho::common::convertStringAFromWP8(e->ToString());
    }
}

void CGenPropBagImpl::getFloatProp(CMethodResult& oResult)
{
    try {
        _runtime->getFloatProp(ref new CMethodResultImpl((int64)&oResult));
    } catch (Platform::Exception^ e) {
        LOG(ERROR) + rho::common::convertStringAFromWP8(e->ToString());
    }
}

void CGenPropBagImpl::setFloatProp(double floatProp, CMethodResult& oResult)
{
    try {
        _runtime->setFloatProp(floatProp, ref new CMethodResultImpl((int64)&oResult));
    } catch (Platform::Exception^ e) {
        LOG(ERROR) + rho::common::convertStringAFromWP8(e->ToString());
    }
}

void CGenPropBagImpl::getStringProp(CMethodResult& oResult)
{
    try {
        _runtime->getStringProp(ref new CMethodResultImpl((int64)&oResult));
    } catch (Platform::Exception^ e) {
        LOG(ERROR) + rho::common::convertStringAFromWP8(e->ToString());
    }
}

void CGenPropBagImpl::setStringProp(const rho::String& stringProp, CMethodResult& oResult)
{
        Platform::String^ _stringProp = rho::common::convertStringToWP8(stringProp);
    try {
        _runtime->setStringProp(_stringProp, ref new CMethodResultImpl((int64)&oResult));
    } catch (Platform::Exception^ e) {
        LOG(ERROR) + rho::common::convertStringAFromWP8(e->ToString());
    }
}


class CGenPropBagSingleton: public CGenPropBagSingletonBase
{
private:
    IGenPropBagSingletonImpl^ _runtime;
public:
    CGenPropBagSingleton(IGenPropBagSingletonImpl^ runtime): CGenPropBagSingletonBase(), _runtime(runtime) {}
    ~CGenPropBagSingleton(){}

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
    virtual void addCommandToQueue(rho::common::CInstanceClassFunctorBase<rho::apiGenerator::CMethodResult>* pFunctor){} // TODO: implement addCommandToQueue
    virtual void callCommandInThread(rho::common::IRhoRunnable* pFunctor){} // TODO: implement callCommandInThread
};

IGenPropBagFactoryImpl^ CGenPropBagFactory::_impl;

IGenPropBag* CGenPropBagFactory::createModuleByID(const rho::String& strID)
{
    return new CGenPropBagImpl(strID, _impl->getImpl());
}

IGenPropBagSingleton* CGenPropBagFactory::createModuleSingleton()
{
    return new CGenPropBagSingleton(_impl->getSingletonImpl());
}

}

extern "C" void Init_GenPropBag_extension()
{
    rho::CGenPropBagFactory::setInstance( new rho::CGenPropBagFactory() );
    rho::Init_GenPropBag_API();

    RHODESAPP().getExtManager().requireRubyFile("RhoGenPropBagApi");
}
