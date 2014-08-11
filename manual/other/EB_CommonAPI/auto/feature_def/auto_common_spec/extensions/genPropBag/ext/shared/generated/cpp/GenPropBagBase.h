#pragma once

#include "IGenPropBag.h"
#include "logging/RhoLog.h"
#include "common/StringConverter.h"
#include "common/ExtManager.h"


namespace rho {

using namespace rho::apiGenerator;

// hash keys used in properties and parameters 
namespace genpropbag {

    static const char PROPERTY_BOOL_PROP[] = "boolProp"; 

    static const char PROPERTY_FLOAT_PROP[] = "floatProp"; 

    static const char PROPERTY_INT_PROP[] = "intProp"; 

    static const char PROPERTY_STRING_PROP[] = "stringProp"; 
 
} 

class CGenPropBagFactoryBase : public CModuleFactoryBase<IGenPropBag, IGenPropBagSingleton, IGenPropBagFactory>
{
protected:
    static rho::common::CAutoPtr<CGenPropBagFactoryBase> m_pInstance;
    HashtablePtr<rho::String,IGenPropBag*> m_hashModules;

public:

    static void setInstance(CGenPropBagFactoryBase* pInstance){ m_pInstance = pInstance; }
    static CGenPropBagFactoryBase* getInstance(){ return m_pInstance; }

    static IGenPropBagSingleton* getGenPropBagSingletonS(){ return getInstance()->getModuleSingleton(); }

    virtual IGenPropBag* getModuleByID(const rho::String& strID)
    {
        if ( !m_hashModules.containsKey(strID) )
        {
            IGenPropBag* pObj = createModuleByID(strID);
            m_hashModules.put(strID, pObj );

            return pObj;
        }

        return m_hashModules[strID];
    }

    virtual IGenPropBag* createModuleByID(const rho::String& strID){ return (IGenPropBag*)0; };
    virtual void deleteModuleByID(const rho::String& strID)
    {
        m_hashModules.remove(strID);
    }

};

class CGenPropBagSingletonBase : public CModuleSingletonBase< IGenPropBagSingleton >, public rho::common::IRhoExtension
{
protected:
    DEFINE_LOGCLASS;


    rho::String m_strDefaultID;




public:
    virtual rho::LogCategory getModuleLogCategory(){ return getLogCategory(); }

    CGenPropBagSingletonBase();
    ~CGenPropBagSingletonBase();




    virtual void setDefaultID(const rho::String& strDefaultID){ m_strDefaultID = strDefaultID; }
    virtual rho::String getDefaultID()
    { 
        if ( m_strDefaultID.length() == 0 )
            setDefaultID(getInitialDefaultID());
        return m_strDefaultID; 
    }

};

class CGenPropBagBase: public IGenPropBag
{
protected:
    DEFINE_LOGCLASS;


    rho::Hashtable<rho::String, rho::String> m_hashProps;
    rho::Hashtable<rho::String, rho::apiGenerator::CMethodAccessor< IGenPropBag > *> m_mapPropAccessors;

public:


    CGenPropBagBase();

    virtual void getProperty( const rho::String& propertyName, CMethodResult& oResult);
    virtual void getProperties( const rho::Vector<rho::String>& arrayofNames, CMethodResult& oResult);
    virtual void getAllProperties(CMethodResult& oResult);
    virtual void setProperty( const rho::String& propertyName,  const rho::String& propertyValue, CMethodResult& oResult);
    virtual void setProperties( const rho::Hashtable<rho::String, rho::String>& propertyMap, CMethodResult& oResult);
    virtual void clearAllProperties(CMethodResult& oResult);


    virtual void getBoolProp(rho::apiGenerator::CMethodResult& oResult);

    virtual void setBoolProp( bool boolProp, rho::apiGenerator::CMethodResult& oResult);

    virtual void getIntProp(rho::apiGenerator::CMethodResult& oResult);

    virtual void setIntProp( int intProp, rho::apiGenerator::CMethodResult& oResult);

    virtual void getFloatProp(rho::apiGenerator::CMethodResult& oResult);

    virtual void setFloatProp( double floatProp, rho::apiGenerator::CMethodResult& oResult);

    virtual void getStringProp(rho::apiGenerator::CMethodResult& oResult);

    virtual void setStringProp( const rho::String& stringProp, rho::apiGenerator::CMethodResult& oResult);


    static CGenPropBagBase* getInstance(){ return static_cast< CGenPropBagBase* >(CGenPropBagFactoryBase::getInstance()->getModuleByID(CGenPropBagFactoryBase::getGenPropBagSingletonS()->getDefaultID())); }
 

};

extern "C" void Init_GenPropBag_API();


}
