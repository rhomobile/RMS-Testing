#include "common/RhodesApp.h"
#include "../../wp8/rhoruntime/common/RhoConvertWP8.h"
//#include "../../../../shared/generated/cpp/GenPropBagBase.h"
#include "GenPropBagFactory.h"
#include "api_generator/wp8/MethodResultImpl.h"

using namespace rho::apiGenerator;
using namespace rhoruntime;

namespace rho {

class CGenPropBagImpl: public CGenPropBagBase
{
private:
    IGenPropBagImpl^ _runtime;
public:
    CGenPropBagImpl(const rho::String& strID, IGenPropBagImpl^ runtime): CGenPropBagBase(), _runtime(runtime) {}

    virtual void getBoolProp(CMethodResult& oResult)
    {
        try {
            _runtime->getBoolProp(ref new CMethodResultImpl((int64)&oResult));
        } catch (Platform::Exception^ e) {
            LOG(ERROR) + rho::common::convertStringAFromWP8(e->ToString());
        }
    }

    virtual void setBoolProp(bool boolProp, CMethodResult& oResult)
    {
        try {
            _runtime->setBoolProp(boolProp, ref new CMethodResultImpl((int64)&oResult));
        } catch (Platform::Exception^ e) {
            LOG(ERROR) + rho::common::convertStringAFromWP8(e->ToString());
        }
    }

    virtual void getIntProp(CMethodResult& oResult)
    {
        try {
            _runtime->getIntProp(ref new CMethodResultImpl((int64)&oResult));
        } catch (Platform::Exception^ e) {
            LOG(ERROR) + rho::common::convertStringAFromWP8(e->ToString());
        }
    }

    virtual void setIntProp(int intProp, CMethodResult& oResult)
    {
        try {
            _runtime->setIntProp(intProp, ref new CMethodResultImpl((int64)&oResult));
        } catch (Platform::Exception^ e) {
            LOG(ERROR) + rho::common::convertStringAFromWP8(e->ToString());
        }
    }

    virtual void getFloatProp(CMethodResult& oResult)
    {
        try {
            _runtime->getFloatProp(ref new CMethodResultImpl((int64)&oResult));
        } catch (Platform::Exception^ e) {
            LOG(ERROR) + rho::common::convertStringAFromWP8(e->ToString());
        }
    }

    virtual void setFloatProp(double floatProp, CMethodResult& oResult)
    {
        try {
            _runtime->setFloatProp(floatProp, ref new CMethodResultImpl((int64)&oResult));
        } catch (Platform::Exception^ e) {
            LOG(ERROR) + rho::common::convertStringAFromWP8(e->ToString());
        }
    }

    virtual void getStringProp(CMethodResult& oResult)
    {
        try {
            _runtime->getStringProp(ref new CMethodResultImpl((int64)&oResult));
        } catch (Platform::Exception^ e) {
            LOG(ERROR) + rho::common::convertStringAFromWP8(e->ToString());
        }
    }

    virtual void setStringProp(const rho::String& stringProp, CMethodResult& oResult)
    {
        Platform::String^ _stringProp = rho::common::convertStringToWP8(stringProp);
        try {
            _runtime->setStringProp(_stringProp, ref new CMethodResultImpl((int64)&oResult));
        } catch (Platform::Exception^ e) {
            LOG(ERROR) + rho::common::convertStringAFromWP8(e->ToString());
        }
    }

    virtual void getProperty(const rho::String& propertyName, CMethodResult& oResult)
    {
        Platform::String^ _propertyName = rho::common::convertStringToWP8(propertyName);
        try {
            _runtime->getProperty(_propertyName, ref new CMethodResultImpl((int64)&oResult));
        } catch (Platform::Exception^ e) {
            LOG(ERROR) + rho::common::convertStringAFromWP8(e->ToString());
        }
    }

    virtual void getProperties(const rho::Vector<rho::String>& arrayofNames, CMethodResult& oResult)
    {
        Windows::Foundation::Collections::IVectorView<Platform::String^>^ _arrayofNames = rho::common::convertArrayToWP8(arrayofNames);
        try {
            _runtime->getProperties(_arrayofNames, ref new CMethodResultImpl((int64)&oResult));
        } catch (Platform::Exception^ e) {
            LOG(ERROR) + rho::common::convertStringAFromWP8(e->ToString());
        }
    }

    virtual void getAllProperties(CMethodResult& oResult)
    {
        try {
            _runtime->getAllProperties(ref new CMethodResultImpl((int64)&oResult));
        } catch (Platform::Exception^ e) {
            LOG(ERROR) + rho::common::convertStringAFromWP8(e->ToString());
        }
    }

    virtual void setProperty(const rho::String& propertyName, const rho::String& propertyValue, CMethodResult& oResult)
    {
        Platform::String^ _propertyName = rho::common::convertStringToWP8(propertyName);
        Platform::String^ _propertyValue = rho::common::convertStringToWP8(propertyValue);
        try {
            _runtime->setProperty(_propertyName, _propertyValue, ref new CMethodResultImpl((int64)&oResult));
        } catch (Platform::Exception^ e) {
            LOG(ERROR) + rho::common::convertStringAFromWP8(e->ToString());
        }
    }

    virtual void setProperties(const rho::Hashtable<rho::String, rho::String>& propertyMap, CMethodResult& oResult)
    {
        Windows::Foundation::Collections::IMapView<Platform::String^, Platform::String^>^ _propertyMap = rho::common::convertHashToWP8(propertyMap);
        try {
            _runtime->setProperties(_propertyMap, ref new CMethodResultImpl((int64)&oResult));
        } catch (Platform::Exception^ e) {
            LOG(ERROR) + rho::common::convertStringAFromWP8(e->ToString());
        }
    }
};

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
