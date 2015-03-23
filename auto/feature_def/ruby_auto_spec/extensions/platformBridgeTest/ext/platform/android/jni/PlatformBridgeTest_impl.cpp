#include "rhodes.h"
#include "PlatformBridgeTest.h"

#include "logging/RhoLog.h"
#undef DEFAULT_LOGCATEGORY
#define DEFAULT_LOGCATEGORY "PlatformBridgeTest_impl"

#define PLATFORMBRIDGETEST_FACTORY_CLASS "com.rho.platformbridgetest.PlatformBridgeTestFactory"

extern "C" void Init_PlatformBridgeTest_API(void);

extern "C" void Init_PlatformBridgeTest(void)
{
    RAWTRACE(__FUNCTION__);

    JNIEnv *env = jnienv();
    if(env)
    {
        jclass cls = rho_find_class(env, PLATFORMBRIDGETEST_FACTORY_CLASS);
        if(!cls)
        {
            RAWLOG_ERROR1("Failed to find java class: %s", PLATFORMBRIDGETEST_FACTORY_CLASS);
            return;
        }
        jmethodID midFactory = env->GetMethodID(cls, "<init>", "()V");
        if(!midFactory)
        {
            RAWLOG_ERROR1("Failed to get constructor for java class %s", PLATFORMBRIDGETEST_FACTORY_CLASS);
            return;
        }
        jobject jFactory = env->NewObject(cls, midFactory);
        if(env->IsSameObject(jFactory, NULL))
        {
            RAWLOG_ERROR1("Failed to create %s instance", PLATFORMBRIDGETEST_FACTORY_CLASS);
            return;
        }
        
        RAWTRACE("Initializing Java factory");

        rho::CPlatformBridgeTestBase::setJavaFactory(env, jFactory);

        RAWTRACE("Deleting JNI reference");

        env->DeleteLocalRef(jFactory);

        RAWTRACE("Initializing API");

        Init_PlatformBridgeTest_API();

        RAWTRACE("Init_PlatformBridgeTest succeeded");
    }
    else
    {
        RAWLOG_ERROR("Failed to initialize PlatformBridgeTest API: jnienv() is failed");
    }

}

extern "C" void Init_PlatformBridgeTest_extension() {
    Init_PlatformBridgeTest();
}
