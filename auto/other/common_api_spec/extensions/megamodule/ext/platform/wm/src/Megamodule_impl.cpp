#include "../../../shared/generated/cpp/MegamoduleBase.h"

namespace rho {

using namespace apiGenerator;

class CMegamoduleImpl: public CMegamoduleBase
{
public:
    CMegamoduleImpl(const rho::String& strID): CMegamoduleBase()
    {
    }

    virtual void typesTest( const rho::String& paramStr,  bool paramBool,  int paramInt,  double paramFloat,  const rho::Vector<rho::String>& paramArray,  const rho::Hashtable<rho::String, rho::String>& paramHash, rho::apiGenerator::CMethodResult& oResult)
    {
        
    }
    
    virtual void produceArray(rho::apiGenerator::CMethodResult& oResult)
    {
        
    
    }
    
    virtual void produceHash(rho::apiGenerator::CMethodResult& oResult)
    {
        
    }
    
    virtual void produceComplicatedResult(rho::apiGenerator::CMethodResult& oResult)
    {
        
    }
    
    virtual void showAlertFromUIThread( const rho::String& message, rho::apiGenerator::CMethodResult& oResult)
    {
        
    }
    
    virtual void setPeriodicallyCallback( int periodInMilliseconds, rho::apiGenerator::CMethodResult& oResult) {
        
    }
    
    virtual void isPeriodicallyCallbackSetted(rho::apiGenerator::CMethodResult& oResult) {
        
    }
    
    virtual void stopPeriodicallyCallback(rho::apiGenerator::CMethodResult& oResult) {
        
    }
    
    virtual void complicatedTypesTest1( const rho::Vector<rho::String>& paramArray, rho::apiGenerator::CMethodResult& oResult) {
        
    }

};

class CMegamoduleSingleton: public CMegamoduleSingletonBase
{
    ~CMegamoduleSingleton(){}
    virtual rho::String getInitialDefaultID();
    virtual void enumerate(CMethodResult& oResult);
};

class CMegamoduleFactory: public CMegamoduleFactoryBase
{
    ~CMegamoduleFactory(){}
    virtual IMegamoduleSingleton* createModuleSingleton();
    virtual IMegamodule* createModuleByID(const rho::String& strID);
};

extern "C" void Init_Megamodule_extension()
{
    CMegamoduleFactory::setInstance( new CMegamoduleFactory() );
    Init_Megamodule_API();
}

IMegamodule* CMegamoduleFactory::createModuleByID(const rho::String& strID)
{
    return new CMegamoduleImpl(strID);
}

IMegamoduleSingleton* CMegamoduleFactory::createModuleSingleton()
{
    return new CMegamoduleSingleton();
}

void CMegamoduleSingleton::enumerate(CMethodResult& oResult)
{
    rho::Vector<rho::String> arIDs;
    arIDs.addElement("MM1");
    arIDs.addElement("MM2");
    arIDs.addElement("MM3");

    oResult.set(arIDs);
}

rho::String CMegamoduleSingleton::getInitialDefaultID()
{
    CMethodResult oRes;
    enumerate(oRes);

    rho::Vector<rho::String>& arIDs = oRes.getStringArray();
        
    return arIDs[0];
}

}