//
//  NativeBridgeTestImpl.cpp
#include "common/RhoStd.h"
#include "common/AutoPointer.h"
#include "common/RhodesApp.h"
#include "common/RhoConf.h"
#include "generated/cpp/NativeBridgeTestBase.h"
#include "logging/RhoLog.h"
#include "api_generator/StringifyHelper.h"

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
            RAWLOGC_INFO("testString","NativeBridgeTest");
            oResult.set(val);
        }

        // testApi
        virtual void testApi( const rho::Vector<rho::Hashtable<rho::String, rho::String> > & arrHashStr,  const rho::Hashtable<rho::String, rho::Hashtable<rho::String, rho::String> > & hashHashStr,  const rho::Hashtable<rho::String, rho::Vector<rho::String> > & hashArrStr,  const rho::Vector<rho::Vector<rho::String> > & arrArrStr, rho::apiGenerator::CMethodResult& oResult) {
            RAWLOGC_INFO("testApi","System");

            StringifyVector res;

            // vector-hash
            //
            {
                StringifyVector outer;
                typedef rho::Vector<rho::Hashtable<rho::String, rho::String> >::const_iterator iter_type;
                for (iter_type iter = arrHashStr.begin(); iter != arrHashStr.end(); ++iter) {
                    StringifyHash inner;
                    inner.fromHash(*iter);
                    outer.push_back(inner);
                }
                res.push_back(outer);
            }

            // hash-hash
            {
                StringifyHash outer;
                typedef rho::Hashtable<rho::String, rho::Hashtable<rho::String, rho::String> >::const_iterator iter_type;
                for (iter_type iter = hashHashStr.begin(); iter != hashHashStr.end(); ++iter) {
                    StringifyHash inner;
                    inner.fromHash(iter->second);
                    outer.set(iter->first,inner);
                }
                res.push_back(outer);
            }

            // hash-vector
            {
                StringifyHash outer;
                typedef rho::Hashtable<rho::String, rho::Vector<rho::String> >::const_iterator iter_type;
                for (iter_type iter = hashArrStr.begin(); iter != hashArrStr.end(); ++iter) {
                    StringifyVector inner;
                    inner.fromVector(iter->second);
                    outer.set(iter->first,inner);
                }
                res.push_back(outer);
            }

            // vector-vector
            {
                StringifyVector outer;
                typedef rho::Vector< rho::Vector<rho::String> >::const_iterator iter_type;
                for (iter_type iter = arrArrStr.begin(); iter != arrArrStr.end(); ++iter) {
                    StringifyVector inner;
                    inner.fromVector(*iter);
                    outer.push_back(inner);
                }
                res.push_back(outer);
            }

            rho::String data;
            res.toString(data);

            oResult.set(data);
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