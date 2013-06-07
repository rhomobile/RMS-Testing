#include "../../../shared/generated/cpp/logCaptureBase.h"

namespace rho {

using namespace apiGenerator;

class ClogCaptureImpl: public ClogCaptureBase
{
public:
    ClogCaptureImpl(const rho::String& strID): ClogCaptureBase()
    {
    }

    virtual void enable( const rho::Hashtable<rho::String, rho::String>& propertyMap, CMethodResult& oResult){}
    virtual void start(CMethodResult& oResult){}
    virtual void stop(CMethodResult& oResult){}
    virtual void disable(CMethodResult& oResult){}
    virtual void take( const rho::Hashtable<rho::String, rho::String>& propertyMap, CMethodResult& oResult){}

};

class ClogCaptureSingleton: public ClogCaptureSingletonBase
{
    ~ClogCaptureSingleton(){}
    virtual rho::String getInitialDefaultID();
    virtual void enumerate(CMethodResult& oResult);
};

class ClogCaptureFactory: public ClogCaptureFactoryBase
{
    ~ClogCaptureFactory(){}
    virtual IlogCaptureSingleton* createModuleSingleton();
    virtual IlogCapture* createModuleByID(const rho::String& strID);
};

extern "C" void Init_logCapture_extension()
{
    ClogCaptureFactory::setInstance( new ClogCaptureFactory() );
    Init_logCapture_API();
}

IlogCapture* ClogCaptureFactory::createModuleByID(const rho::String& strID)
{
    return new ClogCaptureImpl(strID);
}

IlogCaptureSingleton* ClogCaptureFactory::createModuleSingleton()
{
    return new ClogCaptureSingleton();
}

void ClogCaptureSingleton::enumerate(CMethodResult& oResult)
{
    rho::Vector<rho::String> arIDs;
    arIDs.addElement("SC1");
    arIDs.addElement("SC2");

    oResult.set(arIDs);
}

rho::String ClogCaptureSingleton::getInitialDefaultID()
{
    CMethodResult oRes;
    enumerate(oRes);

    rho::Vector<rho::String>& arIDs = oRes.getStringArray();
        
    return arIDs[0];
}

}