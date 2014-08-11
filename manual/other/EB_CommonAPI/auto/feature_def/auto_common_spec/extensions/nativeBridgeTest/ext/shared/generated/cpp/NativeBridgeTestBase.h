#pragma once

#include "INativeBridgeTest.h"
#include "logging/RhoLog.h"
#include "common/StringConverter.h"
#include "common/ExtManager.h"


namespace rho {

using namespace rho::apiGenerator;

// hash keys used in properties and parameters 

class CNativeBridgeTestFactoryBase : public CModuleFactoryBase<INativeBridgeTest, INativeBridgeTestSingleton, INativeBridgeTestFactory>
{
protected:
    static rho::common::CAutoPtr<CNativeBridgeTestFactoryBase> m_pInstance;
    HashtablePtr<rho::String,INativeBridgeTest*> m_hashModules;

public:

    static void setInstance(CNativeBridgeTestFactoryBase* pInstance){ m_pInstance = pInstance; }
    static CNativeBridgeTestFactoryBase* getInstance(){ return m_pInstance; }

    static INativeBridgeTestSingleton* getNativeBridgeTestSingletonS(){ return getInstance()->getModuleSingleton(); }

    virtual INativeBridgeTest* getModuleByID(const rho::String& strID)
    {
        if ( !m_hashModules.containsKey(strID) )
        {
            INativeBridgeTest* pObj = createModuleByID(strID);
            m_hashModules.put(strID, pObj );

            return pObj;
        }

        return m_hashModules[strID];
    }

    virtual INativeBridgeTest* createModuleByID(const rho::String& strID){ return (INativeBridgeTest*)0; };
    virtual void deleteModuleByID(const rho::String& strID)
    {
        m_hashModules.remove(strID);
    }

};

class CNativeBridgeTestSingletonBase : public CModuleSingletonBase< INativeBridgeTestSingleton >, public rho::common::IRhoExtension
{
protected:
    DEFINE_LOGCLASS;





public:
    virtual rho::LogCategory getModuleLogCategory(){ return getLogCategory(); }

    CNativeBridgeTestSingletonBase();
    ~CNativeBridgeTestSingletonBase();




};

class CNativeBridgeTestBase: public INativeBridgeTest
{
protected:
    DEFINE_LOGCLASS;


public:


    CNativeBridgeTestBase();


 

};

extern "C" void Init_NativeBridgeTest_API();


}
