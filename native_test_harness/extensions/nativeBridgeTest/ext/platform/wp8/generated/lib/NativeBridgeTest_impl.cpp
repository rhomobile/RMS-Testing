#include "NativeBridgeTest_impl.h"
#include "../../wp8/rhoruntime/common/RhoConvertWP8.h"
#include "NativeBridgeTestFactory.h"
#include "api_generator/wp8/MethodResultImpl.h"

using namespace rho::apiGenerator;
using namespace rhoruntime;

namespace rho {



class CNativeBridgeTestSingleton: public CNativeBridgeTestSingletonBase
{
private:
    INativeBridgeTestSingletonImpl^ _runtime;
public:
    CNativeBridgeTestSingleton(INativeBridgeTestSingletonImpl^ runtime): CNativeBridgeTestSingletonBase(), _runtime(runtime) {}
    ~CNativeBridgeTestSingleton(){}

    virtual void testBool(bool val, CMethodResult& oResult)
    {
        try {
            _runtime->testBool(val, ref new CMethodResultImpl((int64)&oResult));
        } catch (Platform::Exception^ e) {
            LOG(ERROR) + rho::common::convertStringAFromWP8(e->ToString());
        }
    }

    virtual void testInt(int val, CMethodResult& oResult)
    {
        try {
            _runtime->testInt(val, ref new CMethodResultImpl((int64)&oResult));
        } catch (Platform::Exception^ e) {
            LOG(ERROR) + rho::common::convertStringAFromWP8(e->ToString());
        }
    }

    virtual void testFloat(double val, CMethodResult& oResult)
    {
        try {
            _runtime->testFloat(val, ref new CMethodResultImpl((int64)&oResult));
        } catch (Platform::Exception^ e) {
            LOG(ERROR) + rho::common::convertStringAFromWP8(e->ToString());
        }
    }

    virtual void testString(const rho::String& val, CMethodResult& oResult)
    {
        Platform::String^ _val = rho::common::convertStringToWP8(val);
        try {
            _runtime->testString(_val, ref new CMethodResultImpl((int64)&oResult));
        } catch (Platform::Exception^ e) {
            LOG(ERROR) + rho::common::convertStringAFromWP8(e->ToString());
        }
    }

    virtual void testApi(const rho::Vector<rho::Hashtable<rho::String, rho::String> >& arrHashStr, const rho::Hashtable<rho::String, rho::Hashtable<rho::String, rho::String> >& hashHashStr, const rho::Hashtable<rho::String, rho::Vector<rho::String> >& hashArrStr, const rho::Vector<rho::Vector<rho::String> >& arrArrStr, CMethodResult& oResult)
    {
        Windows::Foundation::Collections::IVectorView<Platform::String^>^ _arrHashStr = rho::common::convertArrayToWP8(arrHashStr);
        Windows::Foundation::Collections::IMapView<Platform::String^, Platform::String^>^ _hashHashStr = rho::common::convertHashToWP8(hashHashStr);
        Windows::Foundation::Collections::IMapView<Platform::String^, Platform::String^>^ _hashArrStr = rho::common::convertHashToWP8(hashArrStr);
        Windows::Foundation::Collections::IVectorView<Platform::String^>^ _arrArrStr = rho::common::convertArrayToWP8(arrArrStr);
        try {
            _runtime->testApi(_arrHashStr, _hashHashStr, _hashArrStr, _arrArrStr, ref new CMethodResultImpl((int64)&oResult));
        } catch (Platform::Exception^ e) {
            LOG(ERROR) + rho::common::convertStringAFromWP8(e->ToString());
        }
    }

    virtual void addCommandToQueue(rho::common::CInstanceClassFunctorBase<rho::apiGenerator::CMethodResult>* pFunctor){} // TODO: implement addCommandToQueue
    virtual void callCommandInThread(rho::common::IRhoRunnable* pFunctor){} // TODO: implement callCommandInThread
};

INativeBridgeTestFactoryImpl^ CNativeBridgeTestFactory::_impl;

INativeBridgeTest* CNativeBridgeTestFactory::createModuleByID(const rho::String& strID)
{
    return new CNativeBridgeTestImpl(strID, _impl->getImpl());
}

INativeBridgeTestSingleton* CNativeBridgeTestFactory::createModuleSingleton()
{
    return new CNativeBridgeTestSingleton(_impl->getSingletonImpl());
}

}

extern "C" void Init_NativeBridgeTest_extension()
{
    rho::CNativeBridgeTestFactory::setInstance( new rho::CNativeBridgeTestFactory() );
    rho::Init_NativeBridgeTest_API();

    RHODESAPP().getExtManager().requireRubyFile("RhoNativeBridgeTestApi");
}
