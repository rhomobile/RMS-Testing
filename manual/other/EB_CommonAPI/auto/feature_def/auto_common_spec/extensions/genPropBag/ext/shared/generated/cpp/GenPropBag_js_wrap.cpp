

#include "GenPropBagBase.h"
#include "api_generator/js_helpers.h"

#include "logging/RhoLog.h"
#undef DEFAULT_LOGCATEGORY
#define DEFAULT_LOGCATEGORY "GenPropBag"

#include "common/StringConverter.h"

extern "C" void rho_wm_impl_performOnUiThread(rho::common::IRhoRunnable* pTask);

using namespace rho;
using namespace rho::json;
using namespace rho::common;
using namespace rho::apiGenerator;


rho::String js_GenPropBag_getBoolProp(const rho::String& strObjID, rho::json::CJSONArray& argv, const rho::String& strCallbackID, const rho::String& strJsVmID, const rho::String& strCallbackParam)
{
    RAWTRACE3("getBoolProp(strObjID = %s, strCallbackID = %s, strJsVmID = %s)", strObjID.c_str(), strCallbackID.c_str(), strJsVmID.c_str());

    rho::apiGenerator::CMethodResult oRes;


    oRes.setRequestedType(CMethodResult::eBool);

    rho::common::CInstanceClassFunctorBase<rho::apiGenerator::CMethodResult>* pFunctor = 0;
    int argc = argv.getSize();

    rho::IGenPropBag* pObj = rho::CGenPropBagFactoryBase::getInstance()->getModuleByID(strObjID);







    if ( oRes.hasCallback() )
    {
        pFunctor = rho_makeInstanceClassFunctor1( pObj, &rho::IGenPropBag::getBoolProp,  oRes );
        rho::CGenPropBagFactoryBase::getGenPropBagSingletonS()->addCommandToQueue( pFunctor );
    }
    else 
    {

        pObj->getBoolProp(  oRes );
    }

    return oRes.toJSON();

}

rho::String js_GenPropBag_setBoolProp(const rho::String& strObjID, rho::json::CJSONArray& argv, const rho::String& strCallbackID, const rho::String& strJsVmID, const rho::String& strCallbackParam)
{
    RAWTRACE3("setBoolProp(strObjID = %s, strCallbackID = %s, strJsVmID = %s)", strObjID.c_str(), strCallbackID.c_str(), strJsVmID.c_str());

    rho::apiGenerator::CMethodResult oRes;



    rho::common::CInstanceClassFunctorBase<rho::apiGenerator::CMethodResult>* pFunctor = 0;
    int argc = argv.getSize();

    rho::IGenPropBag* pObj = rho::CGenPropBagFactoryBase::getInstance()->getModuleByID(strObjID);



    
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

















    if ( oRes.hasCallback() )
    {
        pFunctor = rho_makeInstanceClassFunctor2( pObj, &rho::IGenPropBag::setBoolProp, arg0,  oRes );
        rho::CGenPropBagFactoryBase::getGenPropBagSingletonS()->addCommandToQueue( pFunctor );
    }
    else 
    {

        pObj->setBoolProp( arg0,  oRes );
    }

    return oRes.toJSON();

}

rho::String js_GenPropBag_getIntProp(const rho::String& strObjID, rho::json::CJSONArray& argv, const rho::String& strCallbackID, const rho::String& strJsVmID, const rho::String& strCallbackParam)
{
    RAWTRACE3("getIntProp(strObjID = %s, strCallbackID = %s, strJsVmID = %s)", strObjID.c_str(), strCallbackID.c_str(), strJsVmID.c_str());

    rho::apiGenerator::CMethodResult oRes;


    oRes.setRequestedType(CMethodResult::eInt);

    rho::common::CInstanceClassFunctorBase<rho::apiGenerator::CMethodResult>* pFunctor = 0;
    int argc = argv.getSize();

    rho::IGenPropBag* pObj = rho::CGenPropBagFactoryBase::getInstance()->getModuleByID(strObjID);







    if ( oRes.hasCallback() )
    {
        pFunctor = rho_makeInstanceClassFunctor1( pObj, &rho::IGenPropBag::getIntProp,  oRes );
        rho::CGenPropBagFactoryBase::getGenPropBagSingletonS()->addCommandToQueue( pFunctor );
    }
    else 
    {

        pObj->getIntProp(  oRes );
    }

    return oRes.toJSON();

}

rho::String js_GenPropBag_setIntProp(const rho::String& strObjID, rho::json::CJSONArray& argv, const rho::String& strCallbackID, const rho::String& strJsVmID, const rho::String& strCallbackParam)
{
    RAWTRACE3("setIntProp(strObjID = %s, strCallbackID = %s, strJsVmID = %s)", strObjID.c_str(), strCallbackID.c_str(), strJsVmID.c_str());

    rho::apiGenerator::CMethodResult oRes;



    rho::common::CInstanceClassFunctorBase<rho::apiGenerator::CMethodResult>* pFunctor = 0;
    int argc = argv.getSize();

    rho::IGenPropBag* pObj = rho::CGenPropBagFactoryBase::getInstance()->getModuleByID(strObjID);



    
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



















    if ( oRes.hasCallback() )
    {
        pFunctor = rho_makeInstanceClassFunctor2( pObj, &rho::IGenPropBag::setIntProp, arg0,  oRes );
        rho::CGenPropBagFactoryBase::getGenPropBagSingletonS()->addCommandToQueue( pFunctor );
    }
    else 
    {

        pObj->setIntProp( arg0,  oRes );
    }

    return oRes.toJSON();

}

rho::String js_GenPropBag_getFloatProp(const rho::String& strObjID, rho::json::CJSONArray& argv, const rho::String& strCallbackID, const rho::String& strJsVmID, const rho::String& strCallbackParam)
{
    RAWTRACE3("getFloatProp(strObjID = %s, strCallbackID = %s, strJsVmID = %s)", strObjID.c_str(), strCallbackID.c_str(), strJsVmID.c_str());

    rho::apiGenerator::CMethodResult oRes;


    oRes.setRequestedType(CMethodResult::eDouble);

    rho::common::CInstanceClassFunctorBase<rho::apiGenerator::CMethodResult>* pFunctor = 0;
    int argc = argv.getSize();

    rho::IGenPropBag* pObj = rho::CGenPropBagFactoryBase::getInstance()->getModuleByID(strObjID);







    if ( oRes.hasCallback() )
    {
        pFunctor = rho_makeInstanceClassFunctor1( pObj, &rho::IGenPropBag::getFloatProp,  oRes );
        rho::CGenPropBagFactoryBase::getGenPropBagSingletonS()->addCommandToQueue( pFunctor );
    }
    else 
    {

        pObj->getFloatProp(  oRes );
    }

    return oRes.toJSON();

}

rho::String js_GenPropBag_setFloatProp(const rho::String& strObjID, rho::json::CJSONArray& argv, const rho::String& strCallbackID, const rho::String& strJsVmID, const rho::String& strCallbackParam)
{
    RAWTRACE3("setFloatProp(strObjID = %s, strCallbackID = %s, strJsVmID = %s)", strObjID.c_str(), strCallbackID.c_str(), strJsVmID.c_str());

    rho::apiGenerator::CMethodResult oRes;



    rho::common::CInstanceClassFunctorBase<rho::apiGenerator::CMethodResult>* pFunctor = 0;
    int argc = argv.getSize();

    rho::IGenPropBag* pObj = rho::CGenPropBagFactoryBase::getInstance()->getModuleByID(strObjID);



    
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















    if ( oRes.hasCallback() )
    {
        pFunctor = rho_makeInstanceClassFunctor2( pObj, &rho::IGenPropBag::setFloatProp, arg0,  oRes );
        rho::CGenPropBagFactoryBase::getGenPropBagSingletonS()->addCommandToQueue( pFunctor );
    }
    else 
    {

        pObj->setFloatProp( arg0,  oRes );
    }

    return oRes.toJSON();

}

rho::String js_GenPropBag_getStringProp(const rho::String& strObjID, rho::json::CJSONArray& argv, const rho::String& strCallbackID, const rho::String& strJsVmID, const rho::String& strCallbackParam)
{
    RAWTRACE3("getStringProp(strObjID = %s, strCallbackID = %s, strJsVmID = %s)", strObjID.c_str(), strCallbackID.c_str(), strJsVmID.c_str());

    rho::apiGenerator::CMethodResult oRes;


    oRes.setRequestedType(CMethodResult::eString);

    rho::common::CInstanceClassFunctorBase<rho::apiGenerator::CMethodResult>* pFunctor = 0;
    int argc = argv.getSize();

    rho::IGenPropBag* pObj = rho::CGenPropBagFactoryBase::getInstance()->getModuleByID(strObjID);







    if ( oRes.hasCallback() )
    {
        pFunctor = rho_makeInstanceClassFunctor1( pObj, &rho::IGenPropBag::getStringProp,  oRes );
        rho::CGenPropBagFactoryBase::getGenPropBagSingletonS()->addCommandToQueue( pFunctor );
    }
    else 
    {

        pObj->getStringProp(  oRes );
    }

    return oRes.toJSON();

}

rho::String js_GenPropBag_setStringProp(const rho::String& strObjID, rho::json::CJSONArray& argv, const rho::String& strCallbackID, const rho::String& strJsVmID, const rho::String& strCallbackParam)
{
    RAWTRACE3("setStringProp(strObjID = %s, strCallbackID = %s, strJsVmID = %s)", strObjID.c_str(), strCallbackID.c_str(), strJsVmID.c_str());

    rho::apiGenerator::CMethodResult oRes;



    rho::common::CInstanceClassFunctorBase<rho::apiGenerator::CMethodResult>* pFunctor = 0;
    int argc = argv.getSize();

    rho::IGenPropBag* pObj = rho::CGenPropBagFactoryBase::getInstance()->getModuleByID(strObjID);



    
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





















    if ( oRes.hasCallback() )
    {
        pFunctor = rho_makeInstanceClassFunctor2( pObj, &rho::IGenPropBag::setStringProp, arg0,  oRes );
        rho::CGenPropBagFactoryBase::getGenPropBagSingletonS()->addCommandToQueue( pFunctor );
    }
    else 
    {

        pObj->setStringProp( arg0,  oRes );
    }

    return oRes.toJSON();

}

rho::String js_s_GenPropBag_enumerate(const rho::String& strObjID, rho::json::CJSONArray& argv, const rho::String& strCallbackID, const rho::String& strJsVmID, const rho::String& strCallbackParam)
{
    RAWTRACE3("enumerate(strObjID = %s, strCallbackID = %s, strJsVmID = %s)", strObjID.c_str(), strCallbackID.c_str(), strJsVmID.c_str());

    rho::apiGenerator::CMethodResult oRes;


    oRes.setParamName( "result" );
    oRes.setJSObjectClassPath( "Rho.GenPropBag" );
    oRes.setRequestedType(CMethodResult::eStringArray);

    rho::common::CInstanceClassFunctorBase<rho::apiGenerator::CMethodResult>* pFunctor = 0;
    int argc = argv.getSize();





    oRes.setCallInUIThread(false);
    oRes.setJSCallback( strCallbackID );
    oRes.setCallbackParam( strCallbackParam );



    if ( oRes.hasCallback() )
    {
        pFunctor = rho_makeInstanceClassFunctor1( rho::CGenPropBagFactoryBase::getGenPropBagSingletonS(), &rho::IGenPropBagSingleton::enumerate,  oRes );
        rho::CGenPropBagFactoryBase::getGenPropBagSingletonS()->addCommandToQueue( pFunctor );
    }
    else 
    {

        rho::CGenPropBagFactoryBase::getGenPropBagSingletonS()->enumerate(  oRes );
    }

    return oRes.toJSON();

}

rho::String js_GenPropBag_getProperty(const rho::String& strObjID, rho::json::CJSONArray& argv, const rho::String& strCallbackID, const rho::String& strJsVmID, const rho::String& strCallbackParam)
{
    RAWTRACE3("getProperty(strObjID = %s, strCallbackID = %s, strJsVmID = %s)", strObjID.c_str(), strCallbackID.c_str(), strJsVmID.c_str());

    rho::apiGenerator::CMethodResult oRes;


    oRes.setRequestedType(CMethodResult::eString);

    rho::common::CInstanceClassFunctorBase<rho::apiGenerator::CMethodResult>* pFunctor = 0;
    int argc = argv.getSize();

    rho::IGenPropBag* pObj = rho::CGenPropBagFactoryBase::getInstance()->getModuleByID(strObjID);



    
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
        pFunctor = rho_makeInstanceClassFunctor2( pObj, &rho::IGenPropBag::getProperty, arg0,  oRes );
        rho::CGenPropBagFactoryBase::getGenPropBagSingletonS()->addCommandToQueue( pFunctor );
    }
    else 
    {

        pObj->getProperty( arg0,  oRes );
    }

    return oRes.toJSON();

}

rho::String js_GenPropBag_getProperties(const rho::String& strObjID, rho::json::CJSONArray& argv, const rho::String& strCallbackID, const rho::String& strJsVmID, const rho::String& strCallbackParam)
{
    RAWTRACE3("getProperties(strObjID = %s, strCallbackID = %s, strJsVmID = %s)", strObjID.c_str(), strCallbackID.c_str(), strJsVmID.c_str());

    rho::apiGenerator::CMethodResult oRes;


    oRes.setRequestedType(CMethodResult::eStringHash);

    rho::common::CInstanceClassFunctorBase<rho::apiGenerator::CMethodResult>* pFunctor = 0;
    int argc = argv.getSize();

    rho::IGenPropBag* pObj = rho::CGenPropBagFactoryBase::getInstance()->getModuleByID(strObjID);



    
    if ( argc == 0 )
    {
        oRes.setArgError( "Wrong number of arguments: " + convertToStringA(argc) + " instead of " + convertToStringA(1) );
        return oRes.toJSON();
    }
    










    rho::Vector<rho::String> arg0;
    if ( argc > 0 )
    {
        if ( argv[0].isArray() )
        {
            CJSONArray arParam(argv[0]);
            for( int i = 0; i < arParam.getSize(); i++ )
            {
                arg0.addElement( arParam[i].getStringObject() );
            }
        }
        else if (!argv[0].isNull())
        {
            oRes.setArgError("Type error: argument " "0" " should be " "array" );
            return oRes.toJSON();
        }
    }











    oRes.setCallInUIThread(false);
    oRes.setJSCallback( strCallbackID );
    oRes.setCallbackParam( strCallbackParam );



    if ( oRes.hasCallback() )
    {
        pFunctor = rho_makeInstanceClassFunctor2( pObj, &rho::IGenPropBag::getProperties, arg0,  oRes );
        rho::CGenPropBagFactoryBase::getGenPropBagSingletonS()->addCommandToQueue( pFunctor );
    }
    else 
    {

        pObj->getProperties( arg0,  oRes );
    }

    return oRes.toJSON();

}

rho::String js_GenPropBag_getAllProperties(const rho::String& strObjID, rho::json::CJSONArray& argv, const rho::String& strCallbackID, const rho::String& strJsVmID, const rho::String& strCallbackParam)
{
    RAWTRACE3("getAllProperties(strObjID = %s, strCallbackID = %s, strJsVmID = %s)", strObjID.c_str(), strCallbackID.c_str(), strJsVmID.c_str());

    rho::apiGenerator::CMethodResult oRes;


    oRes.setRequestedType(CMethodResult::eStringHash);

    rho::common::CInstanceClassFunctorBase<rho::apiGenerator::CMethodResult>* pFunctor = 0;
    int argc = argv.getSize();

    rho::IGenPropBag* pObj = rho::CGenPropBagFactoryBase::getInstance()->getModuleByID(strObjID);





    oRes.setCallInUIThread(false);
    oRes.setJSCallback( strCallbackID );
    oRes.setCallbackParam( strCallbackParam );



    if ( oRes.hasCallback() )
    {
        pFunctor = rho_makeInstanceClassFunctor1( pObj, &rho::IGenPropBag::getAllProperties,  oRes );
        rho::CGenPropBagFactoryBase::getGenPropBagSingletonS()->addCommandToQueue( pFunctor );
    }
    else 
    {

        pObj->getAllProperties(  oRes );
    }

    return oRes.toJSON();

}

rho::String js_GenPropBag_setProperty(const rho::String& strObjID, rho::json::CJSONArray& argv, const rho::String& strCallbackID, const rho::String& strJsVmID, const rho::String& strCallbackParam)
{
    RAWTRACE3("setProperty(strObjID = %s, strCallbackID = %s, strJsVmID = %s)", strObjID.c_str(), strCallbackID.c_str(), strJsVmID.c_str());

    rho::apiGenerator::CMethodResult oRes;



    rho::common::CInstanceClassFunctorBase<rho::apiGenerator::CMethodResult>* pFunctor = 0;
    int argc = argv.getSize();

    rho::IGenPropBag* pObj = rho::CGenPropBagFactoryBase::getInstance()->getModuleByID(strObjID);



    
    if ( argc == 0 )
    {
        oRes.setArgError( "Wrong number of arguments: " + convertToStringA(argc) + " instead of " + convertToStringA(2) );
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

















    
    if ( argc == 1 )
    {
        oRes.setArgError( "Wrong number of arguments: " + convertToStringA(argc) + " instead of " + convertToStringA(2) );
        return oRes.toJSON();
    }
    


    rho::String arg1 = "";
    if ( argc > 1 )
    {
        if ( argv[1].isString() )
        {
            arg1 = argv[1].getStringObject();
        }
        else if (!argv[1].isNull())
        {
            oRes.setArgError( "Type error: argument " "1" " should be " "string" );
            return oRes.toJSON();
        }
    }





















    if ( oRes.hasCallback() )
    {
        pFunctor = rho_makeInstanceClassFunctor3( pObj, &rho::IGenPropBag::setProperty, arg0, arg1,  oRes );
        rho::CGenPropBagFactoryBase::getGenPropBagSingletonS()->addCommandToQueue( pFunctor );
    }
    else 
    {

        pObj->setProperty( arg0, arg1,  oRes );
    }

    return oRes.toJSON();

}

rho::String js_GenPropBag_setProperties(const rho::String& strObjID, rho::json::CJSONArray& argv, const rho::String& strCallbackID, const rho::String& strJsVmID, const rho::String& strCallbackParam)
{
    RAWTRACE3("setProperties(strObjID = %s, strCallbackID = %s, strJsVmID = %s)", strObjID.c_str(), strCallbackID.c_str(), strJsVmID.c_str());

    rho::apiGenerator::CMethodResult oRes;



    rho::common::CInstanceClassFunctorBase<rho::apiGenerator::CMethodResult>* pFunctor = 0;
    int argc = argv.getSize();

    rho::IGenPropBag* pObj = rho::CGenPropBagFactoryBase::getInstance()->getModuleByID(strObjID);



    
    if ( argc == 0 )
    {
        oRes.setArgError( "Wrong number of arguments: " + convertToStringA(argc) + " instead of " + convertToStringA(1) );
        return oRes.toJSON();
    }
    












    rho::Hashtable<rho::String, rho::String> arg0;
    if ( argc > 0 )
    {
        if ( argv[0].isObject() )
        {
            CJSONStructIterator objIter(argv[0]);

            for( ; !objIter.isEnd(); objIter.next() )
            {
                arg0[objIter.getCurKey()] = objIter.getCurString();
            }
        }
        else if (!argv[0].isNull())
        {
            oRes.setArgError("Type error: argument " "0" " should be " "hash" );
            return oRes.toJSON();
        }
    }











    if ( oRes.hasCallback() )
    {
        pFunctor = rho_makeInstanceClassFunctor2( pObj, &rho::IGenPropBag::setProperties, arg0,  oRes );
        rho::CGenPropBagFactoryBase::getGenPropBagSingletonS()->addCommandToQueue( pFunctor );
    }
    else 
    {

        pObj->setProperties( arg0,  oRes );
    }

    return oRes.toJSON();

}



rho::String js_s_GenPropBag_getDefaultID(const rho::String& strObjID, rho::json::CJSONArray& argv, const rho::String& strCallbackID, const rho::String& strJsVmID, const rho::String& strCallbackParam)
{
    rho::apiGenerator::CMethodResult oRes;
    rho::String strDefaultID = rho::CGenPropBagFactoryBase::getGenPropBagSingletonS()->getDefaultID();
    oRes.set(strDefaultID);

    return oRes.toJSON();
}

rho::String js_s_GenPropBag_getDefault(const rho::String& strObjID, rho::json::CJSONArray& argv, const rho::String& strCallbackID, const rho::String& strJsVmID, const rho::String& strCallbackParam)
{
    rho::apiGenerator::CMethodResult oRes;
    rho::String strDefaultID = rho::CGenPropBagFactoryBase::getGenPropBagSingletonS()->getDefaultID();
    oRes.set(strDefaultID);
    oRes.setJSObjectClassPath("Rho.GenPropBag");

    return oRes.toJSON();
}

rho::String js_s_GenPropBag_setDefaultID(const rho::String& strObjID, rho::json::CJSONArray& argv, const rho::String& strCallbackID, const rho::String& strJsVmID, const rho::String& strCallbackParam)
{
    rho::apiGenerator::CMethodResult oRes;
    rho::json::CJSONEntry el = argv[0];

    if (el.isString()) {
        rho::CGenPropBagFactoryBase::getGenPropBagSingletonS()->setDefaultID(el.getString());
    } else {
        oRes.setError("Method parameter should be defined as string!");
    }

    return oRes.toJSON();
}


