#include "../../../shared/generated/cpp/entityGenBase.h"

namespace rho {

using namespace apiGenerator;

class CentityGenImpl: public CentityGenBase
{
public:
    CentityGenImpl(const rho::String& strID): CentityGenBase()
    {
    }

    virtual void enable( const rho::Hashtable<rho::String, rho::String>& propertyMap, CMethodResult& oResult){}
    virtual void start(CMethodResult& oResult){}
    virtual void stop(CMethodResult& oResult){}
    virtual void disable(CMethodResult& oResult){}
    virtual void take( const rho::Hashtable<rho::String, rho::String>& propertyMap, CMethodResult& oResult){}

};

class CentityGenSingleton: public CentityGenSingletonBase
{
    ~CentityGenSingleton(){}
    virtual rho::String getInitialDefaultID();
    virtual void enumerate(CMethodResult& oResult);
};

class CentityGenFactory: public CentityGenFactoryBase
{
    ~CentityGenFactory(){}
    virtual IentityGenSingleton* createModuleSingleton();
    virtual IentityGen* createModuleByID(const rho::String& strID);
};

extern "C" void Init_entityGen_extension()
{
    CentityGenFactory::setInstance( new CentityGenFactory() );
    Init_entityGen_API();
}

IentityGen* CentityGenFactory::createModuleByID(const rho::String& strID)
{
    return new CentityGenImpl(strID);
}

IentityGenSingleton* CentityGenFactory::createModuleSingleton()
{
    return new CentityGenSingleton();
}

void CentityGenSingleton::enumerate(CMethodResult& oResult)
{
    rho::Vector<rho::String> arIDs;
    arIDs.addElement("SC1");
    arIDs.addElement("SC2");

    oResult.set(arIDs);
}

rho::String CentityGenSingleton::getInitialDefaultID()
{
    CMethodResult oRes;
    enumerate(oRes);

    rho::Vector<rho::String>& arIDs = oRes.getStringArray();
        
    return arIDs[0];
}

}