#include "../../../shared/generated/cpp/GenCallbackTestsBase.h"

namespace rho {

using namespace apiGenerator;

class CGenCallbackTestsImpl: public CGenCallbackTestsBase
{
public:
    CGenCallbackTestsImpl(const rho::String& strID): CGenCallbackTestsBase()
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

class CGenCallbackTestsSingleton: public CGenCallbackTestsSingletonBase
{
    ~CGenCallbackTestsSingleton(){}
    virtual rho::String getInitialDefaultID();
    virtual void enumerate(CMethodResult& oResult);
};

class CGenCallbackTestsFactory: public CGenCallbackTestsFactoryBase
{
    ~CGenCallbackTestsFactory(){}
    virtual IGenCallbackTestsSingleton* createModuleSingleton();
    virtual IGenCallbackTests* createModuleByID(const rho::String& strID);
};

extern "C" void Init_GenCallbackTests_extension()
{
    CGenCallbackTestsFactory::setInstance( new CGenCallbackTestsFactory() );
    Init_GenCallbackTests_API();
}

IGenCallbackTests* CGenCallbackTestsFactory::createModuleByID(const rho::String& strID)
{
    return new CGenCallbackTestsImpl(strID);
}

IGenCallbackTestsSingleton* CGenCallbackTestsFactory::createModuleSingleton()
{
    return new CGenCallbackTestsSingleton();
}

void CGenCallbackTestsSingleton::enumerate(CMethodResult& oResult)
{
    rho::Vector<rho::String> arIDs;
    arIDs.addElement("SC1");
    arIDs.addElement("SC2");

    oResult.set(arIDs);
}

rho::String CGenCallbackTestsSingleton::getInitialDefaultID()
{
    CMethodResult oRes;
    enumerate(oRes);

    rho::Vector<rho::String>& arIDs = oRes.getStringArray();
        
    return arIDs[0];
}

}