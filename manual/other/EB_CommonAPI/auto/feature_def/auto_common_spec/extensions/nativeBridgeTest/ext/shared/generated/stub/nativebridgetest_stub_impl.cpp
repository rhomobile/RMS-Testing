//
//  NativeBridgeTestImpl.cpp
#include "generated/cpp/NativeBridgeTestBase.h"
#include "common/RhoStd.h"
#include "common/AutoPointer.h"
#include "common/RhodesApp.h"
#include "common/RhoConf.h"
#include "logging/RhoLog.h"

namespace rho {
    
    using namespace apiGenerator;
    using namespace common;
    
    class CNativeBridgeTestSingletonImpl: public CNativeBridgeTestSingletonBase
    {
    public:
        
        CNativeBridgeTestSingletonImpl(): CNativeBridgeTestSingletonBase(){}
        
        //methods
        // testBool  
        virtual void testBool( bool val, rho::apiGenerator::CMethodResult& oResult) {
            // RAWLOGC_INFO("testBool","NativeBridgeTest");
            
        } 
        // testInt  
        virtual void testInt( int val, rho::apiGenerator::CMethodResult& oResult) {
            // RAWLOGC_INFO("testInt","NativeBridgeTest");
            
        } 
        // testFloat  
        virtual void testFloat( double val, rho::apiGenerator::CMethodResult& oResult) {
            // RAWLOGC_INFO("testFloat","NativeBridgeTest");
            
        } 
        // testString  
        virtual void testString( const rho::String& val, rho::apiGenerator::CMethodResult& oResult) {
            // RAWLOGC_INFO("testString","NativeBridgeTest");
            
        } 

    };
    
    class CNativeBridgeTestImpl : public CNativeBridgeTestBase
    {
    public:
        virtual ~CNativeBridgeTestImpl() {}

        //methods

    };
    
    ////////////////////////////////////////////////////////////////////////
    
    class CNativeBridgeTestFactory: public CNativeBridgeTestFactoryBase    {
    public:
        CNativeBridgeTestFactory(){}
        
        INativeBridgeTestSingleton* createModuleSingleton()
        { 
            return new CNativeBridgeTestSingletonImpl();
        }
        
        virtual INativeBridgeTest* createModuleByID(const rho::String& strID){ return new CNativeBridgeTestImpl(); };
        
    };
    
}

extern "C" void Init_NativeBridgeTest_extension()
{
    rho::CNativeBridgeTestFactory::setInstance( new rho::CNativeBridgeTestFactory() );
    rho::Init_NativeBridgeTest_API();
    
}