#include "api_generator/js_helpers.h"
#include "api_generator/Api.h"

#include "logging/RhoLog.h"
#undef DEFAULT_LOGCATEGORY
#define DEFAULT_LOGCATEGORY "NativeBridgeTest"




rho::String js_s_NativeBridgeTest_testBool(const rho::String& strObjID, rho::json::CJSONArray& argv, const rho::String& strCallbackID, const rho::String& strJsVmID, const rho::String& strCallbackParam);

rho::String js_s_NativeBridgeTest_testInt(const rho::String& strObjID, rho::json::CJSONArray& argv, const rho::String& strCallbackID, const rho::String& strJsVmID, const rho::String& strCallbackParam);

rho::String js_s_NativeBridgeTest_testFloat(const rho::String& strObjID, rho::json::CJSONArray& argv, const rho::String& strCallbackID, const rho::String& strJsVmID, const rho::String& strCallbackParam);

rho::String js_s_NativeBridgeTest_testString(const rho::String& strObjID, rho::json::CJSONArray& argv, const rho::String& strCallbackID, const rho::String& strJsVmID, const rho::String& strCallbackParam);





namespace {
  using namespace rho::apiGenerator;
  class NativeBridgeTestDispatcher : public ApiHandler<Func_JS>
  {
  public:
    NativeBridgeTestDispatcher() : ApiHandler("Rho:NativeBridgeTest") {}
    virtual ~NativeBridgeTestDispatcher() {}
    virtual void initialize();
  };
  
  void NativeBridgeTestDispatcher::initialize()
  {
    ApiHandler<Func_JS>::initialize();
    
    RAWTRACE("Initializing Rho:NativeBridgeTest API...");


    defineStaticMethod("testBool", js_s_NativeBridgeTest_testBool);


    defineStaticMethod("testInt", js_s_NativeBridgeTest_testInt);


    defineStaticMethod("testFloat", js_s_NativeBridgeTest_testFloat);


    defineStaticMethod("testString", js_s_NativeBridgeTest_testString);


    RAWTRACE("Rho:NativeBridgeTest API - done");
  }
}

extern "C" void Init_JSAPI_NativeBridgeTest(void)
{
  rho::apiGenerator::defineJSApiModule(new NativeBridgeTestDispatcher);
}
