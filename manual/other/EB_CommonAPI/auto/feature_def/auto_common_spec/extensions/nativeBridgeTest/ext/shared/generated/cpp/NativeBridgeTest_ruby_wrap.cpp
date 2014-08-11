
#include "NativeBridgeTestBase.h"

#include "logging/RhoLog.h"
#undef DEFAULT_LOGCATEGORY
#define DEFAULT_LOGCATEGORY "NativeBridgeTest"

#include "ruby/ext/rho/rhoruby.h"
#include "common/StringConverter.h"
#include "common/AutoPointer.h"

using namespace rho;
using namespace rho::common;
using namespace rho::apiGenerator;

extern "C"
{
void rho_wm_impl_performOnUiThread(rho::common::IRhoRunnable* pTask);
VALUE getRuby_NativeBridgeTest_Module();



static void string_iter(const char* szVal, int valueLen, void* par)
{
    rho::Vector<rho::String>& ar = *((rho::Vector<rho::String>*)(par));
    ar.addElement( rho::String(szVal,valueLen) );
}

static void getStringArrayFromValue(VALUE val, rho::Vector<rho::String>& res)
{
    rho_ruby_enum_strary_json(val, string_iter, &res);
}

static void hash_eachstr(const char* szName, const char* szVal, int valueLen, void* par)
{
    rho::Hashtable<rho::String, rho::String>& hash = *((rho::Hashtable<rho::String, rho::String>*)(par));
    hash.put( szName, rho::String(szVal,valueLen) );
}

static void getStringHashFromValue(VALUE val, rho::Hashtable<rho::String, rho::String>& res)
{
    rho_ruby_enum_strhash_json(val, hash_eachstr, &res);
}
    
static rho::String getStringObjectFromValue(VALUE val)
{
    return rho::String(getStringFromValue(val),getStringLenFromValue(val));
}


VALUE rb_s_NativeBridgeTest_testBool(int argc, VALUE *argv)
{
    rho::apiGenerator::CMethodResult oRes;

    oRes.setRequestedType(CMethodResult::eBool);
    rho::common::CInstanceClassFunctorBase<rho::apiGenerator::CMethodResult>* pFunctor = 0;
    bool bUseCallback = false;
    int nCallbackArg = 0;
    nCallbackArg = 1;
    if ( argc == 0 )
    {
        oRes.setArgError("Wrong number of arguments: " + convertToStringA(argc) + " instead of " + convertToStringA(1) );
        return oRes.toRuby();
    }
    bool arg0 = false;
    if ( argc > 0 )
    {
        if ( rho_ruby_is_boolean(argv[0]) )
            arg0 = rho_ruby_get_bool(argv[0]) ? true : false;
        else if (!rho_ruby_is_NIL(argv[0]))
        {
            oRes.setArgError("Type error: argument " "0" " should be " "boolean" );
            return oRes.toRuby();
        }
    }

    if ( argc > nCallbackArg )
    {

        if ( rho_ruby_is_proc(argv[nCallbackArg]) || rho_ruby_is_method(argv[nCallbackArg]) )
        {
            oRes.setRubyCallbackProc( argv[nCallbackArg] );
        }else if ( rho_ruby_is_string(argv[nCallbackArg]) )
        {
            oRes.setRubyCallback( getStringObjectFromValue(argv[nCallbackArg]) );
        }else
        {
            oRes.setArgError("Type error: callback should be String");
            return oRes.toRuby();
        }

        oRes.setCallInUIThread(false);
        if ( argc > nCallbackArg + 1 )
        {
            if ( !rho_ruby_is_NIL(argv[nCallbackArg + 1]) )
            {
                if ( !rho_ruby_is_string(argv[nCallbackArg + 1]) )
                {
                    oRes.setArgError("Type error: callback parameter should be String");
                    return oRes.toRuby();
                }

                oRes.setCallbackParam( getStringObjectFromValue(argv[nCallbackArg + 1]) );
            }
        }
        
        bUseCallback = true;
    }
    if ( bUseCallback )
    {
        pFunctor = rho_makeInstanceClassFunctor2( rho::CNativeBridgeTestFactoryBase::getNativeBridgeTestSingletonS(), &rho::INativeBridgeTestSingleton::testBool, arg0,  oRes );
        rho::CNativeBridgeTestFactoryBase::getNativeBridgeTestSingletonS()->addCommandToQueue( pFunctor );
    }
    else 
    {

        rho::CNativeBridgeTestFactoryBase::getNativeBridgeTestSingletonS()->testBool( arg0,  oRes );
    }
    
    return oRes.toRuby();
}






VALUE rb_s_NativeBridgeTest_testInt(int argc, VALUE *argv)
{
    rho::apiGenerator::CMethodResult oRes;

    oRes.setRequestedType(CMethodResult::eInt);
    rho::common::CInstanceClassFunctorBase<rho::apiGenerator::CMethodResult>* pFunctor = 0;
    bool bUseCallback = false;
    int nCallbackArg = 0;
    nCallbackArg = 1;
    if ( argc == 0 )
    {
        oRes.setArgError("Wrong number of arguments: " + convertToStringA(argc) + " instead of " + convertToStringA(1) );
        return oRes.toRuby();
    }
    int arg0 = 0;
    if ( argc > 0 )
    {
        if ( rho_ruby_is_integer(argv[0]) )
            arg0 = rho_ruby_get_int(argv[0]);
        else if (!rho_ruby_is_NIL(argv[0]))
        {
            oRes.setArgError("Type error: argument " "0" " should be " "integer" );
            return oRes.toRuby();
        }
    }

    if ( argc > nCallbackArg )
    {

        if ( rho_ruby_is_proc(argv[nCallbackArg]) || rho_ruby_is_method(argv[nCallbackArg]) )
        {
            oRes.setRubyCallbackProc( argv[nCallbackArg] );
        }else if ( rho_ruby_is_string(argv[nCallbackArg]) )
        {
            oRes.setRubyCallback( getStringObjectFromValue(argv[nCallbackArg]) );
        }else
        {
            oRes.setArgError("Type error: callback should be String");
            return oRes.toRuby();
        }

        oRes.setCallInUIThread(false);
        if ( argc > nCallbackArg + 1 )
        {
            if ( !rho_ruby_is_NIL(argv[nCallbackArg + 1]) )
            {
                if ( !rho_ruby_is_string(argv[nCallbackArg + 1]) )
                {
                    oRes.setArgError("Type error: callback parameter should be String");
                    return oRes.toRuby();
                }

                oRes.setCallbackParam( getStringObjectFromValue(argv[nCallbackArg + 1]) );
            }
        }
        
        bUseCallback = true;
    }
    if ( bUseCallback )
    {
        pFunctor = rho_makeInstanceClassFunctor2( rho::CNativeBridgeTestFactoryBase::getNativeBridgeTestSingletonS(), &rho::INativeBridgeTestSingleton::testInt, arg0,  oRes );
        rho::CNativeBridgeTestFactoryBase::getNativeBridgeTestSingletonS()->addCommandToQueue( pFunctor );
    }
    else 
    {

        rho::CNativeBridgeTestFactoryBase::getNativeBridgeTestSingletonS()->testInt( arg0,  oRes );
    }
    
    return oRes.toRuby();
}






VALUE rb_s_NativeBridgeTest_testFloat(int argc, VALUE *argv)
{
    rho::apiGenerator::CMethodResult oRes;

    oRes.setRequestedType(CMethodResult::eDouble);
    rho::common::CInstanceClassFunctorBase<rho::apiGenerator::CMethodResult>* pFunctor = 0;
    bool bUseCallback = false;
    int nCallbackArg = 0;
    nCallbackArg = 1;
    if ( argc == 0 )
    {
        oRes.setArgError("Wrong number of arguments: " + convertToStringA(argc) + " instead of " + convertToStringA(1) );
        return oRes.toRuby();
    }
    double arg0 = 0;
    if ( argc > 0 )
    {
        if ( rho_ruby_is_double(argv[0]) )
            arg0 = rho_ruby_get_double(argv[0]);
        else if (!rho_ruby_is_NIL(argv[0]))
        {
            oRes.setArgError("Type error: argument " "0" " should be " "float" );
            return oRes.toRuby();
        }
    }

    if ( argc > nCallbackArg )
    {

        if ( rho_ruby_is_proc(argv[nCallbackArg]) || rho_ruby_is_method(argv[nCallbackArg]) )
        {
            oRes.setRubyCallbackProc( argv[nCallbackArg] );
        }else if ( rho_ruby_is_string(argv[nCallbackArg]) )
        {
            oRes.setRubyCallback( getStringObjectFromValue(argv[nCallbackArg]) );
        }else
        {
            oRes.setArgError("Type error: callback should be String");
            return oRes.toRuby();
        }

        oRes.setCallInUIThread(false);
        if ( argc > nCallbackArg + 1 )
        {
            if ( !rho_ruby_is_NIL(argv[nCallbackArg + 1]) )
            {
                if ( !rho_ruby_is_string(argv[nCallbackArg + 1]) )
                {
                    oRes.setArgError("Type error: callback parameter should be String");
                    return oRes.toRuby();
                }

                oRes.setCallbackParam( getStringObjectFromValue(argv[nCallbackArg + 1]) );
            }
        }
        
        bUseCallback = true;
    }
    if ( bUseCallback )
    {
        pFunctor = rho_makeInstanceClassFunctor2( rho::CNativeBridgeTestFactoryBase::getNativeBridgeTestSingletonS(), &rho::INativeBridgeTestSingleton::testFloat, arg0,  oRes );
        rho::CNativeBridgeTestFactoryBase::getNativeBridgeTestSingletonS()->addCommandToQueue( pFunctor );
    }
    else 
    {

        rho::CNativeBridgeTestFactoryBase::getNativeBridgeTestSingletonS()->testFloat( arg0,  oRes );
    }
    
    return oRes.toRuby();
}






VALUE rb_s_NativeBridgeTest_testString(int argc, VALUE *argv)
{
    rho::apiGenerator::CMethodResult oRes;

    oRes.setRequestedType(CMethodResult::eString);
    rho::common::CInstanceClassFunctorBase<rho::apiGenerator::CMethodResult>* pFunctor = 0;
    bool bUseCallback = false;
    int nCallbackArg = 0;
    nCallbackArg = 1;
    if ( argc == 0 )
    {
        oRes.setArgError("Wrong number of arguments: " + convertToStringA(argc) + " instead of " + convertToStringA(1) );
        return oRes.toRuby();
    }
    rho::String arg0 = "";
    if ( argc > 0 )
    {
        if ( rho_ruby_is_string(argv[0]) )
        {
            arg0 = getStringObjectFromValue(argv[0]);
        }
        else if (!rho_ruby_is_NIL(argv[0]))
        {
            oRes.setArgError("Type error: argument " "0" " should be " "string" );
            return oRes.toRuby();
        }
    }

    if ( argc > nCallbackArg )
    {

        if ( rho_ruby_is_proc(argv[nCallbackArg]) || rho_ruby_is_method(argv[nCallbackArg]) )
        {
            oRes.setRubyCallbackProc( argv[nCallbackArg] );
        }else if ( rho_ruby_is_string(argv[nCallbackArg]) )
        {
            oRes.setRubyCallback( getStringObjectFromValue(argv[nCallbackArg]) );
        }else
        {
            oRes.setArgError("Type error: callback should be String");
            return oRes.toRuby();
        }

        oRes.setCallInUIThread(false);
        if ( argc > nCallbackArg + 1 )
        {
            if ( !rho_ruby_is_NIL(argv[nCallbackArg + 1]) )
            {
                if ( !rho_ruby_is_string(argv[nCallbackArg + 1]) )
                {
                    oRes.setArgError("Type error: callback parameter should be String");
                    return oRes.toRuby();
                }

                oRes.setCallbackParam( getStringObjectFromValue(argv[nCallbackArg + 1]) );
            }
        }
        
        bUseCallback = true;
    }
    if ( bUseCallback )
    {
        pFunctor = rho_makeInstanceClassFunctor2( rho::CNativeBridgeTestFactoryBase::getNativeBridgeTestSingletonS(), &rho::INativeBridgeTestSingleton::testString, arg0,  oRes );
        rho::CNativeBridgeTestFactoryBase::getNativeBridgeTestSingletonS()->addCommandToQueue( pFunctor );
    }
    else 
    {

        rho::CNativeBridgeTestFactoryBase::getNativeBridgeTestSingletonS()->testString( arg0,  oRes );
    }
    
    return oRes.toRuby();
}







}