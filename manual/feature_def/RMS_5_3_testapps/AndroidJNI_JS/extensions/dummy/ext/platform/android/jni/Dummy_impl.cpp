#include "rhodes.h"
#include "Dummy.h"

#include "logging/RhoLog.h"
#undef DEFAULT_LOGCATEGORY
#define DEFAULT_LOGCATEGORY "Dummy_impl"

#define DUMMY_FACTORY_CLASS "com.rho.dummy.DummyFactory"

extern "C" void Init_Dummy_API(void);

extern "C" void Init_Dummy(void)
{
    RAWTRACE(__FUNCTION__);

    JNIEnv *env = jnienv();
    if(env)
    {
        jclass cls = rho_find_class(env, DUMMY_FACTORY_CLASS);
        if(!cls)
        {
            RAWLOG_ERROR1("Failed to find java class: %s", DUMMY_FACTORY_CLASS);
            return;
        }
        jmethodID midFactory = env->GetMethodID(cls, "<init>", "()V");
        if(!midFactory)
        {
            RAWLOG_ERROR1("Failed to get constructor for java class %s", DUMMY_FACTORY_CLASS);
            return;
        }
        jobject jFactory = env->NewObject(cls, midFactory);
        if(env->IsSameObject(jFactory, NULL))
        {
            RAWLOG_ERROR1("Failed to create %s instance", DUMMY_FACTORY_CLASS);
            return;
        }
        
        RAWTRACE("Initializing Java factory");

        rho::CDummyBase::setJavaFactory(env, jFactory);

        RAWTRACE("Deleting JNI reference");

        env->DeleteLocalRef(jFactory);

        RAWTRACE("Initializing API");

        Init_Dummy_API();

        RAWTRACE("Init_Dummy succeeded");
    }
    else
    {
        RAWLOG_ERROR("Failed to initialize Dummy API: jnienv() is failed");
    }

}

extern "C" void Init_Dummy_extension() {
    Init_Dummy();
}
