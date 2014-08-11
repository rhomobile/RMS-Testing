#include "../../../shared/generated/cpp/EntityGenBase.h"

namespace rho {

using namespace apiGenerator;

class CEntityGenImpl: public CEntityGenBase
{
public:
    CEntityGenImpl(const rho::String& strID): CEntityGenBase()
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

class CEntityGenSingleton: public CEntityGenSingletonBase
{
    ~CEntityGenSingleton(){}
    virtual rho::String getInitialDefaultID();
    virtual void enumerate(CMethodResult& oResult);
};

class CEntityGenFactory: public CEntityGenFactoryBase
{
    ~CEntityGenFactory(){}
    virtual IEntityGenSingleton* createModuleSingleton();
    virtual IEntityGen* createModuleByID(const rho::String& strID);
};

extern "C" void Init_EntityGen_extension()
{
    CEntityGenFactory::setInstance( new CEntityGenFactory() );
    Init_EntityGen_API();
}

IEntityGen* CEntityGenFactory::createModuleByID(const rho::String& strID)
{
    return new CEntityGenImpl(strID);
}

IEntityGenSingleton* CEntityGenFactory::createModuleSingleton()
{
    return new CEntityGenSingleton();
}

void CEntityGenSingleton::enumerate(CMethodResult& oResult)
{
    rho::Vector<rho::String> arIDs;
    arIDs.addElement("SC1");
    arIDs.addElement("SC2");

    oResult.set(arIDs);
}

rho::String CEntityGenSingleton::getInitialDefaultID()
{
    CMethodResult oRes;
    enumerate(oRes);

    rho::Vector<rho::String>& arIDs = oRes.getStringArray();
        
    return arIDs[0];
}

}