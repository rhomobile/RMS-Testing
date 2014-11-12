#include "rhodes.h"
#include "GenCallbackTests.h"

#include "logging/RhoLog.h"
#undef DEFAULT_LOGCATEGORY
#define DEFAULT_LOGCATEGORY "GenCallbackTests_impl"

#define GENCALLBACKTESTS_FACTORY_CLASS "com.rho.gencallbacktests.GenCallbackTestsFactory"

extern "C" void Init_GenCallbackTests_API(void);

extern "C" void Init_GenCallbackTests(void)
{
    RAWTRACE(__FUNCTION__);

    JNIEnv *env = jnienv();
    if(env)
    {
        jclass cls = rho_find_class(env, GENCALLBACKTESTS_FACTORY_CLASS);
        if(!cls)
        {
            RAWLOG_ERROR1("Failed to find java class: %s", GENCALLBACKTESTS_FACTORY_CLASS);
            return;
        }
        jmethodID midFactory = env->GetMethodID(cls, "<init>", "()V");
        if(!midFactory)
        {
            RAWLOG_ERROR1("Failed to get constructor for java class %s", GENCALLBACKTESTS_FACTORY_CLASS);
            return;
        }
        jobject jFactory = env->NewObject(cls, midFactory);
        if(env->IsSameObject(jFactory, NULL))
        {
            RAWLOG_ERROR1("Failed to create %s instance", GENCALLBACKTESTS_FACTORY_CLASS);
            return;
        }
        
        RAWTRACE("Initializing Java factory");

        rho::CGenCallbackTestsBase::setJavaFactory(env, jFactory);

        RAWTRACE("Deleting JNI reference");

        env->DeleteLocalRef(jFactory);

        RAWTRACE("Initializing API");

        Init_GenCallbackTests_API();

        RAWTRACE("Init_GenCallbackTests succeeded");
    }
    else
    {
        RAWLOG_ERROR("Failed to initialize GenCallbackTests API: jnienv() is failed");
    }

}

extern "C" void Init_GenCallbackTests_extension() {
    Init_GenCallbackTests();
}
