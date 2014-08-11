//
//  GenPropBagImpl.cpp
#include "generated/cpp/GenPropBagBase.h"
#include "common/RhoStd.h"
#include "common/AutoPointer.h"
#include "common/RhodesApp.h"
#include "common/RhoConf.h"
#include "logging/RhoLog.h"

namespace rho {
    
    using namespace apiGenerator;
    using namespace common;
    
    class CGenPropBagSingletonImpl: public CGenPropBagSingletonBase
    {
    public:
        
        CGenPropBagSingletonImpl(): CGenPropBagSingletonBase(){}
        
        //methods
        // enumerate  
        virtual void enumerate(rho::apiGenerator::CMethodResult& oResult) {
            // RAWLOGC_INFO("enumerate","GenPropBag");
            
        } 

    };
    
    class CGenPropBagImpl : public CGenPropBagBase
    {
    public:
        virtual ~CGenPropBagImpl() {}

        //methods

        virtual void getBoolProp(rho::apiGenerator::CMethodResult& oResult) {

        } 

        virtual void setBoolProp( bool boolProp, rho::apiGenerator::CMethodResult& oResult) {

        } 

        virtual void getIntProp(rho::apiGenerator::CMethodResult& oResult) {

        } 

        virtual void setIntProp( int intProp, rho::apiGenerator::CMethodResult& oResult) {

        } 

        virtual void getFloatProp(rho::apiGenerator::CMethodResult& oResult) {

        } 

        virtual void setFloatProp( double floatProp, rho::apiGenerator::CMethodResult& oResult) {

        } 

        virtual void getStringProp(rho::apiGenerator::CMethodResult& oResult) {

        } 

        virtual void setStringProp( const rho::String& stringProp, rho::apiGenerator::CMethodResult& oResult) {

        } 

        virtual void getProperty( const rho::String& propertyName, rho::apiGenerator::CMethodResult& oResult) {

        } 

        virtual void getProperties( const rho::Vector<rho::String>& arrayofNames, rho::apiGenerator::CMethodResult& oResult) {

        } 

        virtual void getAllProperties(rho::apiGenerator::CMethodResult& oResult) {

        } 

        virtual void setProperty( const rho::String& propertyName,  const rho::String& propertyValue, rho::apiGenerator::CMethodResult& oResult) {

        } 

        virtual void setProperties( const rho::Hashtable<rho::String, rho::String>& propertyMap, rho::apiGenerator::CMethodResult& oResult) {

        } 

    };
    
    ////////////////////////////////////////////////////////////////////////
    
    class CGenPropBagFactory: public CGenPropBagFactoryBase    {
    public:
        CGenPropBagFactory(){}
        
        IGenPropBagSingleton* createModuleSingleton()
        { 
            return new CGenPropBagSingletonImpl();
        }
        
        virtual IGenPropBag* createModuleByID(const rho::String& strID){ return new CGenPropBagImpl(); };
        
    };
    
}

extern "C" void Init_GenPropBag_extension()
{
    rho::CGenPropBagFactory::setInstance( new rho::CGenPropBagFactory() );
    rho::Init_GenPropBag_API();
    
}