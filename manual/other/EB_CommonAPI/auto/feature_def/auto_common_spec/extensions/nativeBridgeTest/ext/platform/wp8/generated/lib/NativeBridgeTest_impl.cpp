#include "common/RhodesApp.h"
#include "../../wp8/rhoruntime/common/RhoConvertWP8.h"
//#include "../../../../shared/generated/cpp/NativeBridgeTestBase.h"
#include "NativeBridgeTestFactory.h"
#include "api_generator/wp8/MethodResultImpl.h"

using namespace rho::apiGenerator;
using namespace rhoruntime;

namespace rho {

class CNativeBridgeTestImpl: public CNativeBridgeTestBase
{
private:
    INativeBridgeTestImpl^ _runtime;
public:
    CNativeBridgeTestImpl(const rho::String& strID, INativeBridgeTestImpl^ runtime): CNativeBridgeTestBase(), _runtime(runtime) {}
};

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
