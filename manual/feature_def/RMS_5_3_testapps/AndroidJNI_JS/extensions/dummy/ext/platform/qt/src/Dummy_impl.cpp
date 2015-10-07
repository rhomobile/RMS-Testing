#include "../../../shared/generated/cpp/DummyBase.h"

namespace rho {

using namespace apiGenerator;

class CDummyImpl: public CDummyBase
{
public:
    CDummyImpl(const rho::String& strID): CDummyBase()
    {
    }

    virtual void getPlatformName(rho::apiGenerator::CMethodResult& oResult) {
         oResult.set("Win32");
    }

    virtual void calcSumm( int a,  int b, rho::apiGenerator::CMethodResult& oResult) {
         oResult.set(a+b);
    }
    
    virtual void joinStrings( const rho::String& a,  const rho::String& b, rho::apiGenerator::CMethodResult& oResult) {
         oResult.set(a+b);
    }

};

class CDummySingleton: public CDummySingletonBase
{
    ~CDummySingleton(){}
    virtual rho::String getInitialDefaultID();
    virtual void enumerate(CMethodResult& oResult);
};

class CDummyFactory: public CDummyFactoryBase
{
    ~CDummyFactory(){}
    virtual IDummySingleton* createModuleSingleton();
    virtual IDummy* createModuleByID(const rho::String& strID);
};

extern "C" void Init_Dummy_extension()
{
    CDummyFactory::setInstance( new CDummyFactory() );
    Init_Dummy_API();
}

IDummy* CDummyFactory::createModuleByID(const rho::String& strID)
{
    return new CDummyImpl(strID);
}

IDummySingleton* CDummyFactory::createModuleSingleton()
{
    return new CDummySingleton();
}

void CDummySingleton::enumerate(CMethodResult& oResult)
{
    rho::Vector<rho::String> arIDs;
    arIDs.addElement("SC1");
    arIDs.addElement("SC2");

    oResult.set(arIDs);
}

rho::String CDummySingleton::getInitialDefaultID()
{
    CMethodResult oRes;
    enumerate(oRes);

    rho::Vector<rho::String>& arIDs = oRes.getStringArray();
        
    return arIDs[0];
}

}