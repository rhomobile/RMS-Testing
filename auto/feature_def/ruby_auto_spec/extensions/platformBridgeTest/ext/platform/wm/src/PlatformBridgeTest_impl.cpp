#include "../../../shared/generated/cpp/PlatformBridgeTestBase.h"

namespace rho {

using namespace apiGenerator;

class CPlatformBridgeTestImpl: public CPlatformBridgeTestBase
{
public:
    CPlatformBridgeTestImpl(const rho::String& strID): CPlatformBridgeTestBase()
    {
    }

    virtual void getPlatformName(rho::apiGenerator::CMethodResult& oResult) {
         oResult.set("WM");
    }

    virtual void calcSumm( int a,  int b, rho::apiGenerator::CMethodResult& oResult) {
         oResult.set(a+b);
    }
    
    virtual void joinStrings( const rho::String& a,  const rho::String& b, rho::apiGenerator::CMethodResult& oResult) {
         oResult.set(a+b);
    }

};

class CPlatformBridgeTestSingleton: public CPlatformBridgeTestSingletonBase
{
    ~CPlatformBridgeTestSingleton(){}
    virtual rho::String getInitialDefaultID();
    virtual void enumerate(CMethodResult& oResult);
};

class CPlatformBridgeTestFactory: public CPlatformBridgeTestFactoryBase
{
    ~CPlatformBridgeTestFactory(){}
    virtual IPlatformBridgeTestSingleton* createModuleSingleton();
    virtual IPlatformBridgeTest* createModuleByID(const rho::String& strID);
};

extern "C" void Init_PlatformBridgeTest_extension()
{
    CPlatformBridgeTestFactory::setInstance( new CPlatformBridgeTestFactory() );
    Init_PlatformBridgeTest_API();
}

IPlatformBridgeTest* CPlatformBridgeTestFactory::createModuleByID(const rho::String& strID)
{
    return new CPlatformBridgeTestImpl(strID);
}

IPlatformBridgeTestSingleton* CPlatformBridgeTestFactory::createModuleSingleton()
{
    return new CPlatformBridgeTestSingleton();
}

void CPlatformBridgeTestSingleton::enumerate(CMethodResult& oResult)
{
    rho::Vector<rho::String> arIDs;
    arIDs.addElement("SC1");
    arIDs.addElement("SC2");

    oResult.set(arIDs);
}

rho::String CPlatformBridgeTestSingleton::getInitialDefaultID()
{
    CMethodResult oRes;
    enumerate(oRes);

    rho::Vector<rho::String>& arIDs = oRes.getStringArray();
        
    return arIDs[0];
}

}