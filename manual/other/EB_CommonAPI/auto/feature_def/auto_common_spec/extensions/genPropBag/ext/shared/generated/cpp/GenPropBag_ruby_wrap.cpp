
#include "GenPropBagBase.h"

#include "logging/RhoLog.h"
#undef DEFAULT_LOGCATEGORY
#define DEFAULT_LOGCATEGORY "GenPropBag"

#include "ruby/ext/rho/rhoruby.h"
#include "common/StringConverter.h"
#include "common/AutoPointer.h"

using namespace rho;
using namespace rho::common;
using namespace rho::apiGenerator;

extern "C"
{
void rho_wm_impl_performOnUiThread(rho::common::IRhoRunnable* pTask);
VALUE getRuby_GenPropBag_Module();


VALUE rb_GenPropBag_s_default(VALUE klass)
{
    rho::String strDefaultID = rho::CGenPropBagFactoryBase::getGenPropBagSingletonS()->getDefaultID();

    return rho_ruby_create_object_with_id( klass, strDefaultID.c_str() );
}

VALUE rb_GenPropBag_s_setDefault(VALUE klass, VALUE valObj)
{
    const char* szID = rho_ruby_get_object_id( valObj );
    rho::CGenPropBagFactoryBase::getGenPropBagSingletonS()->setDefaultID(szID);

    return rho_ruby_get_NIL();
}


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


static VALUE _api_generator_GenPropBag_getBoolProp(int argc, VALUE *argv, rho::IGenPropBag* pObj)
{
    rho::apiGenerator::CMethodResult oRes;

    oRes.setRequestedType(CMethodResult::eBool);
    rho::common::CInstanceClassFunctorBase<rho::apiGenerator::CMethodResult>* pFunctor = 0;
    bool bUseCallback = false;
    int nCallbackArg = 0;
    if ( argc > nCallbackArg )
    {

        oRes.setArgError("Wrong number of arguments: " + convertToStringA(argc) + " instead of " + convertToStringA(0) );
        return oRes.toRuby();
    }
    if ( bUseCallback )
    {
        pFunctor = rho_makeInstanceClassFunctor1( pObj, &rho::IGenPropBag::getBoolProp,  oRes );
        rho::CGenPropBagFactoryBase::getGenPropBagSingletonS()->addCommandToQueue( pFunctor );
    }
    else 
    {

        pObj->getBoolProp(  oRes );
    }
    
    return oRes.toRuby();
}



VALUE rb_GenPropBag_getBoolProp(int argc, VALUE *argv, VALUE obj)
{
    const char* szID = rho_ruby_get_object_id( obj );
    if (!szID)
        rho_ruby_raise_runtime("Object was deleted.");

    VALUE res = 0;
    rho::IGenPropBag* pObj =  rho::CGenPropBagFactoryBase::getInstance()->getModuleByID(szID);

    res = _api_generator_GenPropBag_getBoolProp(argc, argv, pObj);

    return res;
}



VALUE rb_s_GenPropBag_def_getBoolProp(int argc, VALUE *argv)
{
    rho::String strDefaultID = rho::CGenPropBagFactoryBase::getGenPropBagSingletonS()->getDefaultID();
    rho::IGenPropBag* pObj = rho::CGenPropBagFactoryBase::getInstance()->getModuleByID(strDefaultID);

    return _api_generator_GenPropBag_getBoolProp(argc, argv, pObj);
}


static VALUE _api_generator_GenPropBag_setBoolProp(int argc, VALUE *argv, rho::IGenPropBag* pObj)
{
    rho::apiGenerator::CMethodResult oRes;

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

        oRes.setArgError("Wrong number of arguments: " + convertToStringA(argc) + " instead of " + convertToStringA(1) );
        return oRes.toRuby();
    }
    if ( bUseCallback )
    {
        pFunctor = rho_makeInstanceClassFunctor2( pObj, &rho::IGenPropBag::setBoolProp, arg0,  oRes );
        rho::CGenPropBagFactoryBase::getGenPropBagSingletonS()->addCommandToQueue( pFunctor );
    }
    else 
    {

        pObj->setBoolProp( arg0,  oRes );
    }
    
    return oRes.toRuby();
}



VALUE rb_GenPropBag_setBoolProp(int argc, VALUE *argv, VALUE obj)
{
    const char* szID = rho_ruby_get_object_id( obj );
    if (!szID)
        rho_ruby_raise_runtime("Object was deleted.");

    VALUE res = 0;
    rho::IGenPropBag* pObj =  rho::CGenPropBagFactoryBase::getInstance()->getModuleByID(szID);

    res = _api_generator_GenPropBag_setBoolProp(argc, argv, pObj);

    return res;
}



VALUE rb_s_GenPropBag_def_setBoolProp(int argc, VALUE *argv)
{
    rho::String strDefaultID = rho::CGenPropBagFactoryBase::getGenPropBagSingletonS()->getDefaultID();
    rho::IGenPropBag* pObj = rho::CGenPropBagFactoryBase::getInstance()->getModuleByID(strDefaultID);

    return _api_generator_GenPropBag_setBoolProp(argc, argv, pObj);
}


static VALUE _api_generator_GenPropBag_getIntProp(int argc, VALUE *argv, rho::IGenPropBag* pObj)
{
    rho::apiGenerator::CMethodResult oRes;

    oRes.setRequestedType(CMethodResult::eInt);
    rho::common::CInstanceClassFunctorBase<rho::apiGenerator::CMethodResult>* pFunctor = 0;
    bool bUseCallback = false;
    int nCallbackArg = 0;
    if ( argc > nCallbackArg )
    {

        oRes.setArgError("Wrong number of arguments: " + convertToStringA(argc) + " instead of " + convertToStringA(0) );
        return oRes.toRuby();
    }
    if ( bUseCallback )
    {
        pFunctor = rho_makeInstanceClassFunctor1( pObj, &rho::IGenPropBag::getIntProp,  oRes );
        rho::CGenPropBagFactoryBase::getGenPropBagSingletonS()->addCommandToQueue( pFunctor );
    }
    else 
    {

        pObj->getIntProp(  oRes );
    }
    
    return oRes.toRuby();
}



VALUE rb_GenPropBag_getIntProp(int argc, VALUE *argv, VALUE obj)
{
    const char* szID = rho_ruby_get_object_id( obj );
    if (!szID)
        rho_ruby_raise_runtime("Object was deleted.");

    VALUE res = 0;
    rho::IGenPropBag* pObj =  rho::CGenPropBagFactoryBase::getInstance()->getModuleByID(szID);

    res = _api_generator_GenPropBag_getIntProp(argc, argv, pObj);

    return res;
}



VALUE rb_s_GenPropBag_def_getIntProp(int argc, VALUE *argv)
{
    rho::String strDefaultID = rho::CGenPropBagFactoryBase::getGenPropBagSingletonS()->getDefaultID();
    rho::IGenPropBag* pObj = rho::CGenPropBagFactoryBase::getInstance()->getModuleByID(strDefaultID);

    return _api_generator_GenPropBag_getIntProp(argc, argv, pObj);
}


static VALUE _api_generator_GenPropBag_setIntProp(int argc, VALUE *argv, rho::IGenPropBag* pObj)
{
    rho::apiGenerator::CMethodResult oRes;

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

        oRes.setArgError("Wrong number of arguments: " + convertToStringA(argc) + " instead of " + convertToStringA(1) );
        return oRes.toRuby();
    }
    if ( bUseCallback )
    {
        pFunctor = rho_makeInstanceClassFunctor2( pObj, &rho::IGenPropBag::setIntProp, arg0,  oRes );
        rho::CGenPropBagFactoryBase::getGenPropBagSingletonS()->addCommandToQueue( pFunctor );
    }
    else 
    {

        pObj->setIntProp( arg0,  oRes );
    }
    
    return oRes.toRuby();
}



VALUE rb_GenPropBag_setIntProp(int argc, VALUE *argv, VALUE obj)
{
    const char* szID = rho_ruby_get_object_id( obj );
    if (!szID)
        rho_ruby_raise_runtime("Object was deleted.");

    VALUE res = 0;
    rho::IGenPropBag* pObj =  rho::CGenPropBagFactoryBase::getInstance()->getModuleByID(szID);

    res = _api_generator_GenPropBag_setIntProp(argc, argv, pObj);

    return res;
}



VALUE rb_s_GenPropBag_def_setIntProp(int argc, VALUE *argv)
{
    rho::String strDefaultID = rho::CGenPropBagFactoryBase::getGenPropBagSingletonS()->getDefaultID();
    rho::IGenPropBag* pObj = rho::CGenPropBagFactoryBase::getInstance()->getModuleByID(strDefaultID);

    return _api_generator_GenPropBag_setIntProp(argc, argv, pObj);
}


static VALUE _api_generator_GenPropBag_getFloatProp(int argc, VALUE *argv, rho::IGenPropBag* pObj)
{
    rho::apiGenerator::CMethodResult oRes;

    oRes.setRequestedType(CMethodResult::eDouble);
    rho::common::CInstanceClassFunctorBase<rho::apiGenerator::CMethodResult>* pFunctor = 0;
    bool bUseCallback = false;
    int nCallbackArg = 0;
    if ( argc > nCallbackArg )
    {

        oRes.setArgError("Wrong number of arguments: " + convertToStringA(argc) + " instead of " + convertToStringA(0) );
        return oRes.toRuby();
    }
    if ( bUseCallback )
    {
        pFunctor = rho_makeInstanceClassFunctor1( pObj, &rho::IGenPropBag::getFloatProp,  oRes );
        rho::CGenPropBagFactoryBase::getGenPropBagSingletonS()->addCommandToQueue( pFunctor );
    }
    else 
    {

        pObj->getFloatProp(  oRes );
    }
    
    return oRes.toRuby();
}



VALUE rb_GenPropBag_getFloatProp(int argc, VALUE *argv, VALUE obj)
{
    const char* szID = rho_ruby_get_object_id( obj );
    if (!szID)
        rho_ruby_raise_runtime("Object was deleted.");

    VALUE res = 0;
    rho::IGenPropBag* pObj =  rho::CGenPropBagFactoryBase::getInstance()->getModuleByID(szID);

    res = _api_generator_GenPropBag_getFloatProp(argc, argv, pObj);

    return res;
}



VALUE rb_s_GenPropBag_def_getFloatProp(int argc, VALUE *argv)
{
    rho::String strDefaultID = rho::CGenPropBagFactoryBase::getGenPropBagSingletonS()->getDefaultID();
    rho::IGenPropBag* pObj = rho::CGenPropBagFactoryBase::getInstance()->getModuleByID(strDefaultID);

    return _api_generator_GenPropBag_getFloatProp(argc, argv, pObj);
}


static VALUE _api_generator_GenPropBag_setFloatProp(int argc, VALUE *argv, rho::IGenPropBag* pObj)
{
    rho::apiGenerator::CMethodResult oRes;

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

        oRes.setArgError("Wrong number of arguments: " + convertToStringA(argc) + " instead of " + convertToStringA(1) );
        return oRes.toRuby();
    }
    if ( bUseCallback )
    {
        pFunctor = rho_makeInstanceClassFunctor2( pObj, &rho::IGenPropBag::setFloatProp, arg0,  oRes );
        rho::CGenPropBagFactoryBase::getGenPropBagSingletonS()->addCommandToQueue( pFunctor );
    }
    else 
    {

        pObj->setFloatProp( arg0,  oRes );
    }
    
    return oRes.toRuby();
}



VALUE rb_GenPropBag_setFloatProp(int argc, VALUE *argv, VALUE obj)
{
    const char* szID = rho_ruby_get_object_id( obj );
    if (!szID)
        rho_ruby_raise_runtime("Object was deleted.");

    VALUE res = 0;
    rho::IGenPropBag* pObj =  rho::CGenPropBagFactoryBase::getInstance()->getModuleByID(szID);

    res = _api_generator_GenPropBag_setFloatProp(argc, argv, pObj);

    return res;
}



VALUE rb_s_GenPropBag_def_setFloatProp(int argc, VALUE *argv)
{
    rho::String strDefaultID = rho::CGenPropBagFactoryBase::getGenPropBagSingletonS()->getDefaultID();
    rho::IGenPropBag* pObj = rho::CGenPropBagFactoryBase::getInstance()->getModuleByID(strDefaultID);

    return _api_generator_GenPropBag_setFloatProp(argc, argv, pObj);
}


static VALUE _api_generator_GenPropBag_getStringProp(int argc, VALUE *argv, rho::IGenPropBag* pObj)
{
    rho::apiGenerator::CMethodResult oRes;

    oRes.setRequestedType(CMethodResult::eString);
    rho::common::CInstanceClassFunctorBase<rho::apiGenerator::CMethodResult>* pFunctor = 0;
    bool bUseCallback = false;
    int nCallbackArg = 0;
    if ( argc > nCallbackArg )
    {

        oRes.setArgError("Wrong number of arguments: " + convertToStringA(argc) + " instead of " + convertToStringA(0) );
        return oRes.toRuby();
    }
    if ( bUseCallback )
    {
        pFunctor = rho_makeInstanceClassFunctor1( pObj, &rho::IGenPropBag::getStringProp,  oRes );
        rho::CGenPropBagFactoryBase::getGenPropBagSingletonS()->addCommandToQueue( pFunctor );
    }
    else 
    {

        pObj->getStringProp(  oRes );
    }
    
    return oRes.toRuby();
}



VALUE rb_GenPropBag_getStringProp(int argc, VALUE *argv, VALUE obj)
{
    const char* szID = rho_ruby_get_object_id( obj );
    if (!szID)
        rho_ruby_raise_runtime("Object was deleted.");

    VALUE res = 0;
    rho::IGenPropBag* pObj =  rho::CGenPropBagFactoryBase::getInstance()->getModuleByID(szID);

    res = _api_generator_GenPropBag_getStringProp(argc, argv, pObj);

    return res;
}



VALUE rb_s_GenPropBag_def_getStringProp(int argc, VALUE *argv)
{
    rho::String strDefaultID = rho::CGenPropBagFactoryBase::getGenPropBagSingletonS()->getDefaultID();
    rho::IGenPropBag* pObj = rho::CGenPropBagFactoryBase::getInstance()->getModuleByID(strDefaultID);

    return _api_generator_GenPropBag_getStringProp(argc, argv, pObj);
}


static VALUE _api_generator_GenPropBag_setStringProp(int argc, VALUE *argv, rho::IGenPropBag* pObj)
{
    rho::apiGenerator::CMethodResult oRes;

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

        oRes.setArgError("Wrong number of arguments: " + convertToStringA(argc) + " instead of " + convertToStringA(1) );
        return oRes.toRuby();
    }
    if ( bUseCallback )
    {
        pFunctor = rho_makeInstanceClassFunctor2( pObj, &rho::IGenPropBag::setStringProp, arg0,  oRes );
        rho::CGenPropBagFactoryBase::getGenPropBagSingletonS()->addCommandToQueue( pFunctor );
    }
    else 
    {

        pObj->setStringProp( arg0,  oRes );
    }
    
    return oRes.toRuby();
}



VALUE rb_GenPropBag_setStringProp(int argc, VALUE *argv, VALUE obj)
{
    const char* szID = rho_ruby_get_object_id( obj );
    if (!szID)
        rho_ruby_raise_runtime("Object was deleted.");

    VALUE res = 0;
    rho::IGenPropBag* pObj =  rho::CGenPropBagFactoryBase::getInstance()->getModuleByID(szID);

    res = _api_generator_GenPropBag_setStringProp(argc, argv, pObj);

    return res;
}



VALUE rb_s_GenPropBag_def_setStringProp(int argc, VALUE *argv)
{
    rho::String strDefaultID = rho::CGenPropBagFactoryBase::getGenPropBagSingletonS()->getDefaultID();
    rho::IGenPropBag* pObj = rho::CGenPropBagFactoryBase::getInstance()->getModuleByID(strDefaultID);

    return _api_generator_GenPropBag_setStringProp(argc, argv, pObj);
}


VALUE rb_s_GenPropBag_enumerate(int argc, VALUE *argv)
{
    rho::apiGenerator::CMethodResult oRes;

    oRes.setParamName( "result" );
    oRes.setRubyObjectClass( getRuby_GenPropBag_Module() );
    oRes.setRequestedType(CMethodResult::eStringArray);
    rho::common::CInstanceClassFunctorBase<rho::apiGenerator::CMethodResult>* pFunctor = 0;
    bool bUseCallback = false;
    int nCallbackArg = 0;
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
        pFunctor = rho_makeInstanceClassFunctor1( rho::CGenPropBagFactoryBase::getGenPropBagSingletonS(), &rho::IGenPropBagSingleton::enumerate,  oRes );
        rho::CGenPropBagFactoryBase::getGenPropBagSingletonS()->addCommandToQueue( pFunctor );
    }
    else 
    {

        rho::CGenPropBagFactoryBase::getGenPropBagSingletonS()->enumerate(  oRes );
    }
    
    return oRes.toRuby();
}






static VALUE _api_generator_GenPropBag_getProperty(int argc, VALUE *argv, rho::IGenPropBag* pObj)
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
        pFunctor = rho_makeInstanceClassFunctor2( pObj, &rho::IGenPropBag::getProperty, arg0,  oRes );
        rho::CGenPropBagFactoryBase::getGenPropBagSingletonS()->addCommandToQueue( pFunctor );
    }
    else 
    {

        pObj->getProperty( arg0,  oRes );
    }
    
    return oRes.toRuby();
}



VALUE rb_GenPropBag_getProperty(int argc, VALUE *argv, VALUE obj)
{
    const char* szID = rho_ruby_get_object_id( obj );
    if (!szID)
        rho_ruby_raise_runtime("Object was deleted.");

    VALUE res = 0;
    rho::IGenPropBag* pObj =  rho::CGenPropBagFactoryBase::getInstance()->getModuleByID(szID);

    res = _api_generator_GenPropBag_getProperty(argc, argv, pObj);

    return res;
}



VALUE rb_s_GenPropBag_def_getProperty(int argc, VALUE *argv)
{
    rho::String strDefaultID = rho::CGenPropBagFactoryBase::getGenPropBagSingletonS()->getDefaultID();
    rho::IGenPropBag* pObj = rho::CGenPropBagFactoryBase::getInstance()->getModuleByID(strDefaultID);

    return _api_generator_GenPropBag_getProperty(argc, argv, pObj);
}


static VALUE _api_generator_GenPropBag_getProperties(int argc, VALUE *argv, rho::IGenPropBag* pObj)
{
    rho::apiGenerator::CMethodResult oRes;

    oRes.setRequestedType(CMethodResult::eStringHash);
    rho::common::CInstanceClassFunctorBase<rho::apiGenerator::CMethodResult>* pFunctor = 0;
    bool bUseCallback = false;
    int nCallbackArg = 0;
    nCallbackArg = 1;
    if ( argc == 0 )
    {
        oRes.setArgError("Wrong number of arguments: " + convertToStringA(argc) + " instead of " + convertToStringA(1) );
        return oRes.toRuby();
    }
    rho::Vector<rho::String> arg0;
    if ( argc > 0 )
    {
        if ( rho_ruby_is_array(argv[0]) )
            getStringArrayFromValue(argv[0], arg0);
        else if (!rho_ruby_is_NIL(argv[0]))
        {
            oRes.setArgError("Type error: argument " "0" " should be " "array" );
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
        pFunctor = rho_makeInstanceClassFunctor2( pObj, &rho::IGenPropBag::getProperties, arg0,  oRes );
        rho::CGenPropBagFactoryBase::getGenPropBagSingletonS()->addCommandToQueue( pFunctor );
    }
    else 
    {

        pObj->getProperties( arg0,  oRes );
    }
    
    return oRes.toRuby();
}



VALUE rb_GenPropBag_getProperties(int argc, VALUE *argv, VALUE obj)
{
    const char* szID = rho_ruby_get_object_id( obj );
    if (!szID)
        rho_ruby_raise_runtime("Object was deleted.");

    VALUE res = 0;
    rho::IGenPropBag* pObj =  rho::CGenPropBagFactoryBase::getInstance()->getModuleByID(szID);

    res = _api_generator_GenPropBag_getProperties(argc, argv, pObj);

    return res;
}



VALUE rb_s_GenPropBag_def_getProperties(int argc, VALUE *argv)
{
    rho::String strDefaultID = rho::CGenPropBagFactoryBase::getGenPropBagSingletonS()->getDefaultID();
    rho::IGenPropBag* pObj = rho::CGenPropBagFactoryBase::getInstance()->getModuleByID(strDefaultID);

    return _api_generator_GenPropBag_getProperties(argc, argv, pObj);
}


static VALUE _api_generator_GenPropBag_getAllProperties(int argc, VALUE *argv, rho::IGenPropBag* pObj)
{
    rho::apiGenerator::CMethodResult oRes;

    oRes.setRequestedType(CMethodResult::eStringHash);
    rho::common::CInstanceClassFunctorBase<rho::apiGenerator::CMethodResult>* pFunctor = 0;
    bool bUseCallback = false;
    int nCallbackArg = 0;
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
        pFunctor = rho_makeInstanceClassFunctor1( pObj, &rho::IGenPropBag::getAllProperties,  oRes );
        rho::CGenPropBagFactoryBase::getGenPropBagSingletonS()->addCommandToQueue( pFunctor );
    }
    else 
    {

        pObj->getAllProperties(  oRes );
    }
    
    return oRes.toRuby();
}



VALUE rb_GenPropBag_getAllProperties(int argc, VALUE *argv, VALUE obj)
{
    const char* szID = rho_ruby_get_object_id( obj );
    if (!szID)
        rho_ruby_raise_runtime("Object was deleted.");

    VALUE res = 0;
    rho::IGenPropBag* pObj =  rho::CGenPropBagFactoryBase::getInstance()->getModuleByID(szID);

    res = _api_generator_GenPropBag_getAllProperties(argc, argv, pObj);

    return res;
}



VALUE rb_s_GenPropBag_def_getAllProperties(int argc, VALUE *argv)
{
    rho::String strDefaultID = rho::CGenPropBagFactoryBase::getGenPropBagSingletonS()->getDefaultID();
    rho::IGenPropBag* pObj = rho::CGenPropBagFactoryBase::getInstance()->getModuleByID(strDefaultID);

    return _api_generator_GenPropBag_getAllProperties(argc, argv, pObj);
}


static VALUE _api_generator_GenPropBag_setProperty(int argc, VALUE *argv, rho::IGenPropBag* pObj)
{
    rho::apiGenerator::CMethodResult oRes;

    rho::common::CInstanceClassFunctorBase<rho::apiGenerator::CMethodResult>* pFunctor = 0;
    bool bUseCallback = false;
    int nCallbackArg = 0;
    nCallbackArg = 1;
    if ( argc == 0 )
    {
        oRes.setArgError("Wrong number of arguments: " + convertToStringA(argc) + " instead of " + convertToStringA(2) );
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

    nCallbackArg = 2;
    if ( argc == 1 )
    {
        oRes.setArgError("Wrong number of arguments: " + convertToStringA(argc) + " instead of " + convertToStringA(2) );
        return oRes.toRuby();
    }
    rho::String arg1 = "";
    if ( argc > 1 )
    {
        if ( rho_ruby_is_string(argv[1]) )
        {
            arg1 = getStringObjectFromValue(argv[1]);
        }
        else if (!rho_ruby_is_NIL(argv[1]))
        {
            oRes.setArgError("Type error: argument " "1" " should be " "string" );
            return oRes.toRuby();
        }
    }

    if ( argc > nCallbackArg )
    {

        oRes.setArgError("Wrong number of arguments: " + convertToStringA(argc) + " instead of " + convertToStringA(2) );
        return oRes.toRuby();
    }
    if ( bUseCallback )
    {
        pFunctor = rho_makeInstanceClassFunctor3( pObj, &rho::IGenPropBag::setProperty, arg0, arg1,  oRes );
        rho::CGenPropBagFactoryBase::getGenPropBagSingletonS()->addCommandToQueue( pFunctor );
    }
    else 
    {

        pObj->setProperty( arg0, arg1,  oRes );
    }
    
    return oRes.toRuby();
}



VALUE rb_GenPropBag_setProperty(int argc, VALUE *argv, VALUE obj)
{
    const char* szID = rho_ruby_get_object_id( obj );
    if (!szID)
        rho_ruby_raise_runtime("Object was deleted.");

    VALUE res = 0;
    rho::IGenPropBag* pObj =  rho::CGenPropBagFactoryBase::getInstance()->getModuleByID(szID);

    res = _api_generator_GenPropBag_setProperty(argc, argv, pObj);

    return res;
}



VALUE rb_s_GenPropBag_def_setProperty(int argc, VALUE *argv)
{
    rho::String strDefaultID = rho::CGenPropBagFactoryBase::getGenPropBagSingletonS()->getDefaultID();
    rho::IGenPropBag* pObj = rho::CGenPropBagFactoryBase::getInstance()->getModuleByID(strDefaultID);

    return _api_generator_GenPropBag_setProperty(argc, argv, pObj);
}


static VALUE _api_generator_GenPropBag_setProperties(int argc, VALUE *argv, rho::IGenPropBag* pObj)
{
    rho::apiGenerator::CMethodResult oRes;

    rho::common::CInstanceClassFunctorBase<rho::apiGenerator::CMethodResult>* pFunctor = 0;
    bool bUseCallback = false;
    int nCallbackArg = 0;
    nCallbackArg = 1;
    if ( argc == 0 )
    {
        oRes.setArgError("Wrong number of arguments: " + convertToStringA(argc) + " instead of " + convertToStringA(1) );
        return oRes.toRuby();
    }
    rho::Hashtable<rho::String, rho::String> arg0;
    if ( argc > 0 )
    {
        if ( rho_ruby_is_hash(argv[0]) )
            getStringHashFromValue(argv[0], arg0);
        else if (!rho_ruby_is_NIL(argv[0]))
        {
            oRes.setArgError("Type error: argument " "0" " should be " "hash" );
            return oRes.toRuby();
        }
    }

    if ( argc > nCallbackArg )
    {

        oRes.setArgError("Wrong number of arguments: " + convertToStringA(argc) + " instead of " + convertToStringA(1) );
        return oRes.toRuby();
    }
    if ( bUseCallback )
    {
        pFunctor = rho_makeInstanceClassFunctor2( pObj, &rho::IGenPropBag::setProperties, arg0,  oRes );
        rho::CGenPropBagFactoryBase::getGenPropBagSingletonS()->addCommandToQueue( pFunctor );
    }
    else 
    {

        pObj->setProperties( arg0,  oRes );
    }
    
    return oRes.toRuby();
}



VALUE rb_GenPropBag_setProperties(int argc, VALUE *argv, VALUE obj)
{
    const char* szID = rho_ruby_get_object_id( obj );
    if (!szID)
        rho_ruby_raise_runtime("Object was deleted.");

    VALUE res = 0;
    rho::IGenPropBag* pObj =  rho::CGenPropBagFactoryBase::getInstance()->getModuleByID(szID);

    res = _api_generator_GenPropBag_setProperties(argc, argv, pObj);

    return res;
}



VALUE rb_s_GenPropBag_def_setProperties(int argc, VALUE *argv)
{
    rho::String strDefaultID = rho::CGenPropBagFactoryBase::getGenPropBagSingletonS()->getDefaultID();
    rho::IGenPropBag* pObj = rho::CGenPropBagFactoryBase::getInstance()->getModuleByID(strDefaultID);

    return _api_generator_GenPropBag_setProperties(argc, argv, pObj);
}



}