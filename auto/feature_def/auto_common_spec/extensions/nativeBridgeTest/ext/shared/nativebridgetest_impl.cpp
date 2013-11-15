//
//  NativeBridgeTestImpl.cpp
#include "common/RhoStd.h"
#include "common/AutoPointer.h"
#include "common/RhodesApp.h"
#include "common/RhoConf.h"
#include "generated/cpp/NativeBridgeTestBase.h"
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
            oResult.set(val);
        } 
        // testInt  
        virtual void testInt( int val, rho::apiGenerator::CMethodResult& oResult) {
            // RAWLOGC_INFO("testInt","NativeBridgeTest");
            oResult.set(val);
        } 
        // testFloat  
        virtual void testFloat( double val, rho::apiGenerator::CMethodResult& oResult) {
            // RAWLOGC_INFO("testFloat","NativeBridgeTest");
            oResult.set(val);
        } 
        // testString
        virtual void testString( const rho::String& val, rho::apiGenerator::CMethodResult& oResult) {
            // RAWLOGC_INFO("testString","NativeBridgeTest");
            oResult.set(val);
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