#pragma once

#include "common/RhoStd.h"
#include "api_generator/MethodResult.h"
#include "api_generator/BaseClasses.h"


namespace rho {
///////////////////////////////////////////////////////////



struct IGenPropBag
{
//constants


//methods
    virtual ~IGenPropBag(){}

    virtual void getBoolProp(rho::apiGenerator::CMethodResult& oResult) = 0;
    virtual void setBoolProp( bool boolProp, rho::apiGenerator::CMethodResult& oResult) = 0;
    virtual void getIntProp(rho::apiGenerator::CMethodResult& oResult) = 0;
    virtual void setIntProp( int intProp, rho::apiGenerator::CMethodResult& oResult) = 0;
    virtual void getFloatProp(rho::apiGenerator::CMethodResult& oResult) = 0;
    virtual void setFloatProp( double floatProp, rho::apiGenerator::CMethodResult& oResult) = 0;
    virtual void getStringProp(rho::apiGenerator::CMethodResult& oResult) = 0;
    virtual void setStringProp( const rho::String& stringProp, rho::apiGenerator::CMethodResult& oResult) = 0;
    virtual void getProperty( const rho::String& propertyName, rho::apiGenerator::CMethodResult& oResult) = 0;
    virtual void getProperties( const rho::Vector<rho::String>& arrayofNames, rho::apiGenerator::CMethodResult& oResult) = 0;
    virtual void getAllProperties(rho::apiGenerator::CMethodResult& oResult) = 0;
    virtual void setProperty( const rho::String& propertyName,  const rho::String& propertyValue, rho::apiGenerator::CMethodResult& oResult) = 0;
    virtual void setProperties( const rho::Hashtable<rho::String, rho::String>& propertyMap, rho::apiGenerator::CMethodResult& oResult) = 0;

};

struct IGenPropBagSingleton
{
//constants


    virtual ~IGenPropBagSingleton(){}

//methods
    virtual void enumerate(rho::apiGenerator::CMethodResult& oResult) = 0;


    virtual rho::String getDefaultID() = 0;
    virtual rho::String getInitialDefaultID() = 0;
    virtual void setDefaultID(const rho::String& strID) = 0;

    virtual void addCommandToQueue(rho::common::CInstanceClassFunctorBase<rho::apiGenerator::CMethodResult>* pFunctor) = 0;
    virtual void callCommandInThread(rho::common::IRhoRunnable* pFunctor) = 0;
};

struct IGenPropBagFactory
{
    virtual ~IGenPropBagFactory(){}

    virtual IGenPropBagSingleton* getModuleSingleton() = 0;


    virtual IGenPropBag* getModuleByID(const rho::String& strID) = 0;

};


}
