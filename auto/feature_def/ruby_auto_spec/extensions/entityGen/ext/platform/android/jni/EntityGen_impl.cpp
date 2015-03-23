#include "rhodes.h"
#include "EntityGen.h"

#include "logging/RhoLog.h"
#undef DEFAULT_LOGCATEGORY
#define DEFAULT_LOGCATEGORY "EntityGen_impl"

#define ENTITYGEN_FACTORY_CLASS "com.rho.entitygen.EntityGenFactory"

extern "C" void Init_EntityGen_API(void);

extern "C" void Init_EntityGen(void)
{
    RAWTRACE(__FUNCTION__);

    JNIEnv *env = jnienv();
    if(env)
    {
        jclass cls = rho_find_class(env, ENTITYGEN_FACTORY_CLASS);
        if(!cls)
        {
            RAWLOG_ERROR1("Failed to find java class: %s", ENTITYGEN_FACTORY_CLASS);
            return;
        }
        jmethodID midFactory = env->GetMethodID(cls, "<init>", "()V");
        if(!midFactory)
        {
            RAWLOG_ERROR1("Failed to get constructor for java class %s", ENTITYGEN_FACTORY_CLASS);
            return;
        }
        jobject jFactory = env->NewObject(cls, midFactory);
        if(env->IsSameObject(jFactory, NULL))
        {
            RAWLOG_ERROR1("Failed to create %s instance", ENTITYGEN_FACTORY_CLASS);
            return;
        }
        
        RAWTRACE("Initializing Java factory");

        rho::CEntityGenBase::setJavaFactory(env, jFactory);

        RAWTRACE("Deleting JNI reference");

        env->DeleteLocalRef(jFactory);

        RAWTRACE("Initializing API");

        Init_EntityGen_API();

        RAWTRACE("Init_EntityGen succeeded");
    }
    else
    {
        RAWLOG_ERROR("Failed to initialize EntityGen API: jnienv() is failed");
    }

}

extern "C" void Init_EntityGen_extension() {
    Init_EntityGen();
}
