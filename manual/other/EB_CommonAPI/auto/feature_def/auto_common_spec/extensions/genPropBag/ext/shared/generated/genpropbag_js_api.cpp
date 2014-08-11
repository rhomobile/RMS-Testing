#include "api_generator/js_helpers.h"
#include "api_generator/Api.h"

#include "logging/RhoLog.h"
#undef DEFAULT_LOGCATEGORY
#define DEFAULT_LOGCATEGORY "GenPropBag"




rho::String js_GenPropBag_getBoolProp(const rho::String& strObjID, rho::json::CJSONArray& argv, const rho::String& strCallbackID, const rho::String& strJsVmID, const rho::String& strCallbackParam);
rho::String js_s_GenPropBag_def_getBoolProp(const rho::String& strObjID, rho::json::CJSONArray& argv, const rho::String& strCallbackID, const rho::String& strJsVmID, const rho::String& strCallbackParam);

rho::String js_GenPropBag_setBoolProp(const rho::String& strObjID, rho::json::CJSONArray& argv, const rho::String& strCallbackID, const rho::String& strJsVmID, const rho::String& strCallbackParam);
rho::String js_s_GenPropBag_def_setBoolProp(const rho::String& strObjID, rho::json::CJSONArray& argv, const rho::String& strCallbackID, const rho::String& strJsVmID, const rho::String& strCallbackParam);

rho::String js_GenPropBag_getIntProp(const rho::String& strObjID, rho::json::CJSONArray& argv, const rho::String& strCallbackID, const rho::String& strJsVmID, const rho::String& strCallbackParam);
rho::String js_s_GenPropBag_def_getIntProp(const rho::String& strObjID, rho::json::CJSONArray& argv, const rho::String& strCallbackID, const rho::String& strJsVmID, const rho::String& strCallbackParam);

rho::String js_GenPropBag_setIntProp(const rho::String& strObjID, rho::json::CJSONArray& argv, const rho::String& strCallbackID, const rho::String& strJsVmID, const rho::String& strCallbackParam);
rho::String js_s_GenPropBag_def_setIntProp(const rho::String& strObjID, rho::json::CJSONArray& argv, const rho::String& strCallbackID, const rho::String& strJsVmID, const rho::String& strCallbackParam);

rho::String js_GenPropBag_getFloatProp(const rho::String& strObjID, rho::json::CJSONArray& argv, const rho::String& strCallbackID, const rho::String& strJsVmID, const rho::String& strCallbackParam);
rho::String js_s_GenPropBag_def_getFloatProp(const rho::String& strObjID, rho::json::CJSONArray& argv, const rho::String& strCallbackID, const rho::String& strJsVmID, const rho::String& strCallbackParam);

rho::String js_GenPropBag_setFloatProp(const rho::String& strObjID, rho::json::CJSONArray& argv, const rho::String& strCallbackID, const rho::String& strJsVmID, const rho::String& strCallbackParam);
rho::String js_s_GenPropBag_def_setFloatProp(const rho::String& strObjID, rho::json::CJSONArray& argv, const rho::String& strCallbackID, const rho::String& strJsVmID, const rho::String& strCallbackParam);

rho::String js_GenPropBag_getStringProp(const rho::String& strObjID, rho::json::CJSONArray& argv, const rho::String& strCallbackID, const rho::String& strJsVmID, const rho::String& strCallbackParam);
rho::String js_s_GenPropBag_def_getStringProp(const rho::String& strObjID, rho::json::CJSONArray& argv, const rho::String& strCallbackID, const rho::String& strJsVmID, const rho::String& strCallbackParam);

rho::String js_GenPropBag_setStringProp(const rho::String& strObjID, rho::json::CJSONArray& argv, const rho::String& strCallbackID, const rho::String& strJsVmID, const rho::String& strCallbackParam);
rho::String js_s_GenPropBag_def_setStringProp(const rho::String& strObjID, rho::json::CJSONArray& argv, const rho::String& strCallbackID, const rho::String& strJsVmID, const rho::String& strCallbackParam);

rho::String js_s_GenPropBag_enumerate(const rho::String& strObjID, rho::json::CJSONArray& argv, const rho::String& strCallbackID, const rho::String& strJsVmID, const rho::String& strCallbackParam);

rho::String js_GenPropBag_getProperty(const rho::String& strObjID, rho::json::CJSONArray& argv, const rho::String& strCallbackID, const rho::String& strJsVmID, const rho::String& strCallbackParam);
rho::String js_s_GenPropBag_def_getProperty(const rho::String& strObjID, rho::json::CJSONArray& argv, const rho::String& strCallbackID, const rho::String& strJsVmID, const rho::String& strCallbackParam);

rho::String js_GenPropBag_getProperties(const rho::String& strObjID, rho::json::CJSONArray& argv, const rho::String& strCallbackID, const rho::String& strJsVmID, const rho::String& strCallbackParam);
rho::String js_s_GenPropBag_def_getProperties(const rho::String& strObjID, rho::json::CJSONArray& argv, const rho::String& strCallbackID, const rho::String& strJsVmID, const rho::String& strCallbackParam);

rho::String js_GenPropBag_getAllProperties(const rho::String& strObjID, rho::json::CJSONArray& argv, const rho::String& strCallbackID, const rho::String& strJsVmID, const rho::String& strCallbackParam);
rho::String js_s_GenPropBag_def_getAllProperties(const rho::String& strObjID, rho::json::CJSONArray& argv, const rho::String& strCallbackID, const rho::String& strJsVmID, const rho::String& strCallbackParam);

rho::String js_GenPropBag_setProperty(const rho::String& strObjID, rho::json::CJSONArray& argv, const rho::String& strCallbackID, const rho::String& strJsVmID, const rho::String& strCallbackParam);
rho::String js_s_GenPropBag_def_setProperty(const rho::String& strObjID, rho::json::CJSONArray& argv, const rho::String& strCallbackID, const rho::String& strJsVmID, const rho::String& strCallbackParam);

rho::String js_GenPropBag_setProperties(const rho::String& strObjID, rho::json::CJSONArray& argv, const rho::String& strCallbackID, const rho::String& strJsVmID, const rho::String& strCallbackParam);
rho::String js_s_GenPropBag_def_setProperties(const rho::String& strObjID, rho::json::CJSONArray& argv, const rho::String& strCallbackID, const rho::String& strJsVmID, const rho::String& strCallbackParam);



rho::String js_s_GenPropBag_getDefaultID(const rho::String& strObjID, rho::json::CJSONArray& argv, const rho::String& strCallbackID, const rho::String& strJsVmID, const rho::String& strCallbackParam);
rho::String js_s_GenPropBag_getDefault(const rho::String& strObjID, rho::json::CJSONArray& argv, const rho::String& strCallbackID, const rho::String& strJsVmID, const rho::String& strCallbackParam);
rho::String js_s_GenPropBag_setDefaultID(const rho::String& strObjID, rho::json::CJSONArray& argv, const rho::String& strCallbackID, const rho::String& strJsVmID, const rho::String& strCallbackParam);



namespace {
  using namespace rho::apiGenerator;
  class GenPropBagDispatcher : public ApiHandler<Func_JS>
  {
  public:
    GenPropBagDispatcher() : ApiHandler("Rho:GenPropBag") {}
    virtual ~GenPropBagDispatcher() {}
    virtual void initialize();
  };
  
  void GenPropBagDispatcher::initialize()
  {
    ApiHandler<Func_JS>::initialize();
    
    RAWTRACE("Initializing Rho:GenPropBag API...");


    defineInstanceMethod("boolProp", js_GenPropBag_getBoolProp);
    //  should define static method !     defineStaticMethod("def_boolProp", js_s_GenPropBag_def_getBoolProp);;


    defineInstanceMethod("boolProp=", js_GenPropBag_setBoolProp);
    //  should define static method !     defineStaticMethod("def_boolProp=", js_s_GenPropBag_def_setBoolProp);;


    defineInstanceMethod("intProp", js_GenPropBag_getIntProp);
    //  should define static method !     defineStaticMethod("def_intProp", js_s_GenPropBag_def_getIntProp);;


    defineInstanceMethod("intProp=", js_GenPropBag_setIntProp);
    //  should define static method !     defineStaticMethod("def_intProp=", js_s_GenPropBag_def_setIntProp);;


    defineInstanceMethod("floatProp", js_GenPropBag_getFloatProp);
    //  should define static method !     defineStaticMethod("def_floatProp", js_s_GenPropBag_def_getFloatProp);;


    defineInstanceMethod("floatProp=", js_GenPropBag_setFloatProp);
    //  should define static method !     defineStaticMethod("def_floatProp=", js_s_GenPropBag_def_setFloatProp);;


    defineInstanceMethod("stringProp", js_GenPropBag_getStringProp);
    //  should define static method !     defineStaticMethod("def_stringProp", js_s_GenPropBag_def_getStringProp);;


    defineInstanceMethod("stringProp=", js_GenPropBag_setStringProp);
    //  should define static method !     defineStaticMethod("def_stringProp=", js_s_GenPropBag_def_setStringProp);;


    defineStaticMethod("enumerate", js_s_GenPropBag_enumerate);


    defineInstanceMethod("getProperty", js_GenPropBag_getProperty);
    //  should define static method !     defineStaticMethod("def_getProperty", js_s_GenPropBag_def_getProperty);;


    defineInstanceMethod("getProperties", js_GenPropBag_getProperties);
    //  should define static method !     defineStaticMethod("def_getProperties", js_s_GenPropBag_def_getProperties);;


    defineInstanceMethod("getAllProperties", js_GenPropBag_getAllProperties);
    //  should define static method !     defineStaticMethod("def_getAllProperties", js_s_GenPropBag_def_getAllProperties);;


    defineInstanceMethod("setProperty", js_GenPropBag_setProperty);
    //  should define static method !     defineStaticMethod("def_setProperty", js_s_GenPropBag_def_setProperty);;


    defineInstanceMethod("setProperties", js_GenPropBag_setProperties);
    //  should define static method !     defineStaticMethod("def_setProperties", js_s_GenPropBag_def_setProperties);;


    defineStaticMethod("getDefaultID", js_s_GenPropBag_getDefaultID);
    defineStaticMethod("getDefault", js_s_GenPropBag_getDefault);
    defineStaticMethod("setDefaultID", js_s_GenPropBag_setDefaultID);

    RAWTRACE("Rho:GenPropBag API - done");
  }
}

extern "C" void Init_JSAPI_GenPropBag(void)
{
  rho::apiGenerator::defineJSApiModule(new GenPropBagDispatcher);
}
