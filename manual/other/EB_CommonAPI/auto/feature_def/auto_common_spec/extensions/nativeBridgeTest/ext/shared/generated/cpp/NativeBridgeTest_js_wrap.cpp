

#include "NativeBridgeTestBase.h"
#include "api_generator/js_helpers.h"

#include "logging/RhoLog.h"
#undef DEFAULT_LOGCATEGORY
#define DEFAULT_LOGCATEGORY "NativeBridgeTest"

#include "common/StringConverter.h"

extern "C" void rho_wm_impl_performOnUiThread(rho::common::IRhoRunnable* pTask);

using namespace rho;
using namespace rho::json;
using namespace rho::common;
using namespace rho::apiGenerator;


rho::String js_s_NativeBridgeTest_testBool(const rho::String& strObjID, rho::json::CJSONArray& argv, const rho::String& strCallbackID, const rho::String& strJsVmID, const rho::String& strCallbackParam)
{
    RAWTRACE3("testBool(strObjID = %s, strCallbackID = %s, strJsVmID = %s)", strObjID.c_str(), strCallbackID.c_str(), strJsVmID.c_str());

    rho::apiGenerator::CMethodResult oRes;


    oRes.setRequestedType(CMethodResult::eBool);

    rho::common::CInstanceClassFunctorBase<rho::apiGenerator::CMethodResult>* pFunctor = 0;
    int argc = argv.getSize();



    
    if ( argc == 0 )
    {
        oRes.setArgError( "Wrong number of arguments: " + convertToStringA(argc) + " instead of " + convertToStringA(1) );
        return oRes.toJSON();
    }
    






    bool arg0 = false;
    if ( argc > 0 )
    {
        if ( argv[0].isBoolean() )
            arg0 = argv[0].getBoolean();
        else if (!argv[0].isNull())
        {
            oRes.setArgError("Type error: argument " "0" " should be " "boolean" );
            return oRes.toJSON();
        }
    }















    oRes.setCallInUIThread(false);
    oRes.setJSCallback( strCallbackID );
    oRes.setCallbackParam( strCallbackParam );



    if ( oRes.hasCallback() )
    {
        pFunctor = rho_makeInstanceClassFunctor2( rho::CNativeBridgeTestFactoryBase::getNativeBridgeTestSingletonS(), &rho::INativeBridgeTestSingleton::testBool, arg0,  oRes );
        rho::CNativeBridgeTestFactoryBase::getNativeBridgeTestSingletonS()->addCommandToQueue( pFunctor );
    }
    else 
    {

        rho::CNativeBridgeTestFactoryBase::getNativeBridgeTestSingletonS()->testBool( arg0,  oRes );
    }

    return oRes.toJSON();

}

rho::String js_s_NativeBridgeTest_testInt(const rho::String& strObjID, rho::json::CJSONArray& argv, const rho::String& strCallbackID, const rho::String& strJsVmID, const rho::String& strCallbackParam)
{
    RAWTRACE3("testInt(strObjID = %s, strCallbackID = %s, strJsVmID = %s)", strObjID.c_str(), strCallbackID.c_str(), strJsVmID.c_str());

    rho::apiGenerator::CMethodResult oRes;


    oRes.setRequestedType(CMethodResult::eInt);

    rho::common::CInstanceClassFunctorBase<rho::apiGenerator::CMethodResult>* pFunctor = 0;
    int argc = argv.getSize();



    
    if ( argc == 0 )
    {
        oRes.setArgError( "Wrong number of arguments: " + convertToStringA(argc) + " instead of " + convertToStringA(1) );
        return oRes.toJSON();
    }
    




    int arg0 = 0;
    if ( argc > 0 )
    {
        if ( argv[0].isInteger() )
            arg0 = argv[0].getInt();
        else if (!argv[0].isNull())
        {
            oRes.setArgError("Type error: argument " "0" " should be " "integer" );
            return oRes.toJSON();
        }
    }

















    oRes.setCallInUIThread(false);
    oRes.setJSCallback( strCallbackID );
    oRes.setCallbackParam( strCallbackParam );



    if ( oRes.hasCallback() )
    {
        pFunctor = rho_makeInstanceClassFunctor2( rho::CNativeBridgeTestFactoryBase::getNativeBridgeTestSingletonS(), &rho::INativeBridgeTestSingleton::testInt, arg0,  oRes );
        rho::CNativeBridgeTestFactoryBase::getNativeBridgeTestSingletonS()->addCommandToQueue( pFunctor );
    }
    else 
    {

        rho::CNativeBridgeTestFactoryBase::getNativeBridgeTestSingletonS()->testInt( arg0,  oRes );
    }

    return oRes.toJSON();

}

rho::String js_s_NativeBridgeTest_testFloat(const rho::String& strObjID, rho::json::CJSONArray& argv, const rho::String& strCallbackID, const rho::String& strJsVmID, const rho::String& strCallbackParam)
{
    RAWTRACE3("testFloat(strObjID = %s, strCallbackID = %s, strJsVmID = %s)", strObjID.c_str(), strCallbackID.c_str(), strJsVmID.c_str());

    rho::apiGenerator::CMethodResult oRes;


    oRes.setRequestedType(CMethodResult::eDouble);

    rho::common::CInstanceClassFunctorBase<rho::apiGenerator::CMethodResult>* pFunctor = 0;
    int argc = argv.getSize();



    
    if ( argc == 0 )
    {
        oRes.setArgError( "Wrong number of arguments: " + convertToStringA(argc) + " instead of " + convertToStringA(1) );
        return oRes.toJSON();
    }
    








    double arg0 = 0;
    if ( argc > 0 )
    {
        if ( argv[0].isFloat() )
            arg0 = argv[0].getDouble();
        else if ( argv[0].isInteger() )
            arg0 = (int64)argv[0].getUInt64();
        else if (!argv[0].isNull())
        {
            oRes.setArgError("Type error: argument " "0" " should be " "float" );
            return oRes.toJSON();
        }
    }













    oRes.setCallInUIThread(false);
    oRes.setJSCallback( strCallbackID );
    oRes.setCallbackParam( strCallbackParam );



    if ( oRes.hasCallback() )
    {
        pFunctor = rho_makeInstanceClassFunctor2( rho::CNativeBridgeTestFactoryBase::getNativeBridgeTestSingletonS(), &rho::INativeBridgeTestSingleton::testFloat, arg0,  oRes );
        rho::CNativeBridgeTestFactoryBase::getNativeBridgeTestSingletonS()->addCommandToQueue( pFunctor );
    }
    else 
    {

        rho::CNativeBridgeTestFactoryBase::getNativeBridgeTestSingletonS()->testFloat( arg0,  oRes );
    }

    return oRes.toJSON();

}

rho::String js_s_NativeBridgeTest_testString(const rho::String& strObjID, rho::json::CJSONArray& argv, const rho::String& strCallbackID, const rho::String& strJsVmID, const rho::String& strCallbackParam)
{
    RAWTRACE3("testString(strObjID = %s, strCallbackID = %s, strJsVmID = %s)", strObjID.c_str(), strCallbackID.c_str(), strJsVmID.c_str());

    rho::apiGenerator::CMethodResult oRes;


    oRes.setRequestedType(CMethodResult::eString);

    rho::common::CInstanceClassFunctorBase<rho::apiGenerator::CMethodResult>* pFunctor = 0;
    int argc = argv.getSize();



    
    if ( argc == 0 )
    {
        oRes.setArgError( "Wrong number of arguments: " + convertToStringA(argc) + " instead of " + convertToStringA(1) );
        return oRes.toJSON();
    }
    


    rho::String arg0 = "";
    if ( argc > 0 )
    {
        if ( argv[0].isString() )
        {
            arg0 = argv[0].getStringObject();
        }
        else if (!argv[0].isNull())
        {
            oRes.setArgError( "Type error: argument " "0" " should be " "string" );
            return oRes.toJSON();
        }
    }



















    oRes.setCallInUIThread(false);
    oRes.setJSCallback( strCallbackID );
    oRes.setCallbackParam( strCallbackParam );



    if ( oRes.hasCallback() )
    {
        pFunctor = rho_makeInstanceClassFunctor2( rho::CNativeBridgeTestFactoryBase::getNativeBridgeTestSingletonS(), &rho::INativeBridgeTestSingleton::testString, arg0,  oRes );
        rho::CNativeBridgeTestFactoryBase::getNativeBridgeTestSingletonS()->addCommandToQueue( pFunctor );
    }
    else 
    {

        rho::CNativeBridgeTestFactoryBase::getNativeBridgeTestSingletonS()->testString( arg0,  oRes );
    }

    return oRes.toJSON();

}



