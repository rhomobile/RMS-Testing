#include "GenPropBag.h"


namespace rho {

IMPLEMENT_LOGCLASS(CGenPropBagBase, "GenPropBagJNI");

//GenPropBagFactorySingleton staff
const char* const CGenPropBagBase::FACTORY_SINGLETON_CLASS = "com.rho.genpropbag.GenPropBagFactorySingleton";
jclass CGenPropBagBase::s_clsFactorySingleton = 0;
jmethodID CGenPropBagBase::s_midFactorySetInstance;
jmethodID CGenPropBagBase::s_midFactoryGetInstance;

//GenPropBagFactory staff
const char* const CGenPropBagBase::IFACTORY_CLASS = "com.rho.genpropbag.IGenPropBagFactory";
jclass CGenPropBagBase::s_clsIFactory = 0;
jmethodID CGenPropBagBase::s_midGetApiSingleton;
jmethodID CGenPropBagBase::s_midGetApiObject;

//GenPropBagSingletonBase staff
const char* const CGenPropBagBase::SINGLETON_BASE_CLASS = "com.rho.genpropbag.GenPropBagSingletonBase";
jclass CGenPropBagBase::s_clsSingletonBase = 0;

//GenPropBagBase staff
const char* const CGenPropBagBase::OBJECT_BASE_CLASS = "com.rho.genpropbag.GenPropBagBase";
jclass CGenPropBagBase::s_clsObjectBase = 0;


//IRhoApiDefaultId staff
const char* const CGenPropBagBase::IDEFAULTID_CLASS = "com.rhomobile.rhodes.api.IRhoApiDefaultId";
jclass CGenPropBagBase::s_clsIDefaultId = 0;
jmethodID CGenPropBagBase::s_midGetDefaultID;
jmethodID CGenPropBagBase::s_midSetDefaultID;


//Method tasks

const char* const CGenPropBagBase::GETBOOLPROP_TASK_CLASS = 
        "com.rho.genpropbag.GenPropBagBase$getBoolPropTask";

jclass CGenPropBagBase::s_clsgetBoolPropTask = 0;
jmethodID CGenPropBagBase::s_midgetBoolPropTask;

const char* const CGenPropBagBase::SETBOOLPROP_TASK_CLASS = 
        "com.rho.genpropbag.GenPropBagBase$setBoolPropTask";

jclass CGenPropBagBase::s_clssetBoolPropTask = 0;
jmethodID CGenPropBagBase::s_midsetBoolPropTask;

const char* const CGenPropBagBase::GETINTPROP_TASK_CLASS = 
        "com.rho.genpropbag.GenPropBagBase$getIntPropTask";

jclass CGenPropBagBase::s_clsgetIntPropTask = 0;
jmethodID CGenPropBagBase::s_midgetIntPropTask;

const char* const CGenPropBagBase::SETINTPROP_TASK_CLASS = 
        "com.rho.genpropbag.GenPropBagBase$setIntPropTask";

jclass CGenPropBagBase::s_clssetIntPropTask = 0;
jmethodID CGenPropBagBase::s_midsetIntPropTask;

const char* const CGenPropBagBase::GETFLOATPROP_TASK_CLASS = 
        "com.rho.genpropbag.GenPropBagBase$getFloatPropTask";

jclass CGenPropBagBase::s_clsgetFloatPropTask = 0;
jmethodID CGenPropBagBase::s_midgetFloatPropTask;

const char* const CGenPropBagBase::SETFLOATPROP_TASK_CLASS = 
        "com.rho.genpropbag.GenPropBagBase$setFloatPropTask";

jclass CGenPropBagBase::s_clssetFloatPropTask = 0;
jmethodID CGenPropBagBase::s_midsetFloatPropTask;

const char* const CGenPropBagBase::GETSTRINGPROP_TASK_CLASS = 
        "com.rho.genpropbag.GenPropBagBase$getStringPropTask";

jclass CGenPropBagBase::s_clsgetStringPropTask = 0;
jmethodID CGenPropBagBase::s_midgetStringPropTask;

const char* const CGenPropBagBase::SETSTRINGPROP_TASK_CLASS = 
        "com.rho.genpropbag.GenPropBagBase$setStringPropTask";

jclass CGenPropBagBase::s_clssetStringPropTask = 0;
jmethodID CGenPropBagBase::s_midsetStringPropTask;

const char* const CGenPropBagBase::ENUMERATE_TASK_CLASS = 
        "com.rho.genpropbag.GenPropBagSingletonBase$enumerateTask";

jclass CGenPropBagBase::s_clsenumerateTask = 0;
jmethodID CGenPropBagBase::s_midenumerateTask;

const char* const CGenPropBagBase::GETPROPERTY_TASK_CLASS = 
        "com.rho.genpropbag.GenPropBagBase$getPropertyTask";

jclass CGenPropBagBase::s_clsgetPropertyTask = 0;
jmethodID CGenPropBagBase::s_midgetPropertyTask;

const char* const CGenPropBagBase::GETPROPERTIES_TASK_CLASS = 
        "com.rho.genpropbag.GenPropBagBase$getPropertiesTask";

jclass CGenPropBagBase::s_clsgetPropertiesTask = 0;
jmethodID CGenPropBagBase::s_midgetPropertiesTask;

const char* const CGenPropBagBase::GETALLPROPERTIES_TASK_CLASS = 
        "com.rho.genpropbag.GenPropBagBase$getAllPropertiesTask";

jclass CGenPropBagBase::s_clsgetAllPropertiesTask = 0;
jmethodID CGenPropBagBase::s_midgetAllPropertiesTask;

const char* const CGenPropBagBase::SETPROPERTY_TASK_CLASS = 
        "com.rho.genpropbag.GenPropBagBase$setPropertyTask";

jclass CGenPropBagBase::s_clssetPropertyTask = 0;
jmethodID CGenPropBagBase::s_midsetPropertyTask;

const char* const CGenPropBagBase::SETPROPERTIES_TASK_CLASS = 
        "com.rho.genpropbag.GenPropBagBase$setPropertiesTask";

jclass CGenPropBagBase::s_clssetPropertiesTask = 0;
jmethodID CGenPropBagBase::s_midsetPropertiesTask;


//----------------------------------------------------------------------------------------------------------------------

JNIEnv* CGenPropBagBase::jniInit()
{
    JNIEnv *env = jnienv();
    if(!env)
    {
        LOG(FATAL) + "JNI init failed: JNIEnv is null";
        return 0;
    }
    return jniInit(env);
}
//----------------------------------------------------------------------------------------------------------------------

JNIEnv* CGenPropBagBase::jniInit(JNIEnv* env)
{
    static bool initialized = false;
    env = MethodExecutorJni::jniInit(env);
    if (!env) {
        LOG(FATAL) + "JNI init failed";
        return 0;
    }

    if(!initialized)
    {
        //init GenPropBagFactorySingleton JNI
        s_clsFactorySingleton = loadClass(env, FACTORY_SINGLETON_CLASS);
        if (!s_clsFactorySingleton) return 0;

        s_midFactorySetInstance = env->GetStaticMethodID(s_clsFactorySingleton, "setInstance", "(Lcom/rho/genpropbag/IGenPropBagFactory;)V");
        if(!s_midFactorySetInstance)
        {
            LOG(FATAL) + "Failed to get method 'setInstance' for java class " + FACTORY_SINGLETON_CLASS;
            return NULL;
        }
        s_midFactoryGetInstance = env->GetStaticMethodID(s_clsFactorySingleton, "getInstance", "()Lcom/rho/genpropbag/IGenPropBagFactory;");
        if(!s_midFactoryGetInstance)
        {
            LOG(FATAL) + "Failed to get method 'getInstance' for java class " + FACTORY_SINGLETON_CLASS;
            return NULL;
        }

        //init IGenPropBagFactory JNI
        s_clsIFactory = loadClass(env, IFACTORY_CLASS);
        if (!s_clsIFactory) return 0;
        s_midGetApiSingleton = env->GetMethodID(s_clsIFactory, "getApiSingleton", "()Lcom/rho/genpropbag/IGenPropBagSingleton;");
        if(!s_midGetApiSingleton)
        {
            LOG(FATAL) + "Failed to get method 'getApiSingleton' for java class " + IFACTORY_CLASS;
            return NULL;
        }
        s_midGetApiObject = env->GetMethodID(s_clsIFactory, "getApiObject", "(Ljava/lang/String;)Lcom/rho/genpropbag/IGenPropBag;");
        if(!s_midGetApiObject)
        {
            LOG(FATAL) + "Failed to get method 'getApiObject' for java class " + IFACTORY_CLASS;
            return NULL;
        }

        s_clsSingletonBase = loadClass(env, SINGLETON_BASE_CLASS);
        if (!s_clsSingletonBase) return 0;
        s_clsObjectBase = loadClass(env, OBJECT_BASE_CLASS);
        if (!s_clsObjectBase) return 0;



        s_clsgetBoolPropTask = loadClass(env, GETBOOLPROP_TASK_CLASS);
        if (!s_clsgetBoolPropTask) return 0;
        s_midgetBoolPropTask = env->GetMethodID(s_clsgetBoolPropTask, "<init>",
                        "(Lcom/rho/genpropbag/IGenPropBag;Lcom/rhomobile/rhodes/api/IMethodResult;)V");
        if(!s_midgetBoolPropTask)
        {
            LOG(FATAL) + "Failed to get constructor for java class " + GETBOOLPROP_TASK_CLASS;
            return NULL;
        }

        s_clssetBoolPropTask = loadClass(env, SETBOOLPROP_TASK_CLASS);
        if (!s_clssetBoolPropTask) return 0;
        s_midsetBoolPropTask = env->GetMethodID(s_clssetBoolPropTask, "<init>",
                        "(Lcom/rho/genpropbag/IGenPropBag;ZLcom/rhomobile/rhodes/api/IMethodResult;)V");
        if(!s_midsetBoolPropTask)
        {
            LOG(FATAL) + "Failed to get constructor for java class " + SETBOOLPROP_TASK_CLASS;
            return NULL;
        }

        s_clsgetIntPropTask = loadClass(env, GETINTPROP_TASK_CLASS);
        if (!s_clsgetIntPropTask) return 0;
        s_midgetIntPropTask = env->GetMethodID(s_clsgetIntPropTask, "<init>",
                        "(Lcom/rho/genpropbag/IGenPropBag;Lcom/rhomobile/rhodes/api/IMethodResult;)V");
        if(!s_midgetIntPropTask)
        {
            LOG(FATAL) + "Failed to get constructor for java class " + GETINTPROP_TASK_CLASS;
            return NULL;
        }

        s_clssetIntPropTask = loadClass(env, SETINTPROP_TASK_CLASS);
        if (!s_clssetIntPropTask) return 0;
        s_midsetIntPropTask = env->GetMethodID(s_clssetIntPropTask, "<init>",
                        "(Lcom/rho/genpropbag/IGenPropBag;ILcom/rhomobile/rhodes/api/IMethodResult;)V");
        if(!s_midsetIntPropTask)
        {
            LOG(FATAL) + "Failed to get constructor for java class " + SETINTPROP_TASK_CLASS;
            return NULL;
        }

        s_clsgetFloatPropTask = loadClass(env, GETFLOATPROP_TASK_CLASS);
        if (!s_clsgetFloatPropTask) return 0;
        s_midgetFloatPropTask = env->GetMethodID(s_clsgetFloatPropTask, "<init>",
                        "(Lcom/rho/genpropbag/IGenPropBag;Lcom/rhomobile/rhodes/api/IMethodResult;)V");
        if(!s_midgetFloatPropTask)
        {
            LOG(FATAL) + "Failed to get constructor for java class " + GETFLOATPROP_TASK_CLASS;
            return NULL;
        }

        s_clssetFloatPropTask = loadClass(env, SETFLOATPROP_TASK_CLASS);
        if (!s_clssetFloatPropTask) return 0;
        s_midsetFloatPropTask = env->GetMethodID(s_clssetFloatPropTask, "<init>",
                        "(Lcom/rho/genpropbag/IGenPropBag;DLcom/rhomobile/rhodes/api/IMethodResult;)V");
        if(!s_midsetFloatPropTask)
        {
            LOG(FATAL) + "Failed to get constructor for java class " + SETFLOATPROP_TASK_CLASS;
            return NULL;
        }

        s_clsgetStringPropTask = loadClass(env, GETSTRINGPROP_TASK_CLASS);
        if (!s_clsgetStringPropTask) return 0;
        s_midgetStringPropTask = env->GetMethodID(s_clsgetStringPropTask, "<init>",
                        "(Lcom/rho/genpropbag/IGenPropBag;Lcom/rhomobile/rhodes/api/IMethodResult;)V");
        if(!s_midgetStringPropTask)
        {
            LOG(FATAL) + "Failed to get constructor for java class " + GETSTRINGPROP_TASK_CLASS;
            return NULL;
        }

        s_clssetStringPropTask = loadClass(env, SETSTRINGPROP_TASK_CLASS);
        if (!s_clssetStringPropTask) return 0;
        s_midsetStringPropTask = env->GetMethodID(s_clssetStringPropTask, "<init>",
                        "(Lcom/rho/genpropbag/IGenPropBag;Ljava/lang/String;Lcom/rhomobile/rhodes/api/IMethodResult;)V");
        if(!s_midsetStringPropTask)
        {
            LOG(FATAL) + "Failed to get constructor for java class " + SETSTRINGPROP_TASK_CLASS;
            return NULL;
        }

        s_clsenumerateTask = loadClass(env, ENUMERATE_TASK_CLASS);
        if (!s_clsenumerateTask) return 0;
        s_midenumerateTask = env->GetMethodID(s_clsenumerateTask, "<init>",
                        "(Lcom/rho/genpropbag/IGenPropBagSingleton;Lcom/rhomobile/rhodes/api/IMethodResult;)V");
        if(!s_midenumerateTask)
        {
            LOG(FATAL) + "Failed to get constructor for java class " + ENUMERATE_TASK_CLASS;
            return NULL;
        }

        s_clsgetPropertyTask = loadClass(env, GETPROPERTY_TASK_CLASS);
        if (!s_clsgetPropertyTask) return 0;
        s_midgetPropertyTask = env->GetMethodID(s_clsgetPropertyTask, "<init>",
                        "(Lcom/rho/genpropbag/IGenPropBag;Ljava/lang/String;Lcom/rhomobile/rhodes/api/IMethodResult;)V");
        if(!s_midgetPropertyTask)
        {
            LOG(FATAL) + "Failed to get constructor for java class " + GETPROPERTY_TASK_CLASS;
            return NULL;
        }

        s_clsgetPropertiesTask = loadClass(env, GETPROPERTIES_TASK_CLASS);
        if (!s_clsgetPropertiesTask) return 0;
        s_midgetPropertiesTask = env->GetMethodID(s_clsgetPropertiesTask, "<init>",
                        "(Lcom/rho/genpropbag/IGenPropBag;Ljava/util/List;Lcom/rhomobile/rhodes/api/IMethodResult;)V");
        if(!s_midgetPropertiesTask)
        {
            LOG(FATAL) + "Failed to get constructor for java class " + GETPROPERTIES_TASK_CLASS;
            return NULL;
        }

        s_clsgetAllPropertiesTask = loadClass(env, GETALLPROPERTIES_TASK_CLASS);
        if (!s_clsgetAllPropertiesTask) return 0;
        s_midgetAllPropertiesTask = env->GetMethodID(s_clsgetAllPropertiesTask, "<init>",
                        "(Lcom/rho/genpropbag/IGenPropBag;Lcom/rhomobile/rhodes/api/IMethodResult;)V");
        if(!s_midgetAllPropertiesTask)
        {
            LOG(FATAL) + "Failed to get constructor for java class " + GETALLPROPERTIES_TASK_CLASS;
            return NULL;
        }

        s_clssetPropertyTask = loadClass(env, SETPROPERTY_TASK_CLASS);
        if (!s_clssetPropertyTask) return 0;
        s_midsetPropertyTask = env->GetMethodID(s_clssetPropertyTask, "<init>",
                        "(Lcom/rho/genpropbag/IGenPropBag;Ljava/lang/String;Ljava/lang/String;Lcom/rhomobile/rhodes/api/IMethodResult;)V");
        if(!s_midsetPropertyTask)
        {
            LOG(FATAL) + "Failed to get constructor for java class " + SETPROPERTY_TASK_CLASS;
            return NULL;
        }

        s_clssetPropertiesTask = loadClass(env, SETPROPERTIES_TASK_CLASS);
        if (!s_clssetPropertiesTask) return 0;
        s_midsetPropertiesTask = env->GetMethodID(s_clssetPropertiesTask, "<init>",
                        "(Lcom/rho/genpropbag/IGenPropBag;Ljava/util/Map;Lcom/rhomobile/rhodes/api/IMethodResult;)V");
        if(!s_midsetPropertiesTask)
        {
            LOG(FATAL) + "Failed to get constructor for java class " + SETPROPERTIES_TASK_CLASS;
            return NULL;
        }


        s_clsIDefaultId = loadClass(env, IDEFAULTID_CLASS);
        if (!s_clsIDefaultId) return 0;
        s_midGetDefaultID = env->GetMethodID(s_clsIDefaultId, "getDefaultID", "()Ljava/lang/String;");
        if(!s_midGetDefaultID)
        {
            LOG(FATAL) + "Failed to get method 'getDefaultID' for java class " + IDEFAULTID_CLASS;
            return NULL;
        }
        s_midSetDefaultID = env->GetMethodID(s_clsIDefaultId, "setDefaultID", "(Ljava/lang/String;)V");
        if(!s_midSetDefaultID)
        {
            LOG(FATAL) + "Failed to get method 'setDefaultID' for java class " + IDEFAULTID_CLASS;
            return NULL;
        }


        initialized = true;
        LOG(TRACE) + "CGenPropBag JNI init succeeded";
    }
    return env;
}
//----------------------------------------------------------------------------------------------------------------------

void CGenPropBagBase::setJavaFactory(JNIEnv* env, jobject jFactory)
{
    LOG(TRACE) + "setJavaFactory";

    env = jniInit(env);
    if (!env) {
        LOG(FATAL) + "JNI initialization failed";
        return;
    }

    env->CallStaticVoidMethod(s_clsFactorySingleton, s_midFactorySetInstance, jFactory);

    LOG(TRACE) + "setJavaFactory succeeded";
}
//----------------------------------------------------------------------------------------------------------------------

rho::String CGenPropBagBase::getDefaultID()
{
    LOG(TRACE) + "getDefaultID";

    JNIEnv *env = jniInit();
    if (!env) {
        LOG(FATAL) + "JNI initialization failed";
        return rho::String();
    }

    jhobject jhSingleton = getSingleton(env);
    jhstring res = static_cast<jstring>(env->CallObjectMethod(jhSingleton.get(), s_midGetDefaultID));
    return rho_cast<rho::String>(env, res);
}
//----------------------------------------------------------------------------------------------------------------------

void CGenPropBagBase::setDefaultID(const rho::String& id)
{
    LOG(TRACE) + "setDefaultID: " + id;

    JNIEnv *env = jniInit();
    if (!env) {
        LOG(FATAL) + "JNI initialization failed";
        return;
    }

    jhobject instance = getSingleton(env);
    jhstring jhId = rho_cast<jstring>(env, id);
    env->CallVoidMethod(instance.get(), s_midSetDefaultID, jhId.get());
}
//----------------------------------------------------------------------------------------------------------------------

jobject CGenPropBagBase::getFactory(JNIEnv* env)
{
    jobject res = env->CallStaticObjectMethod(s_clsFactorySingleton, s_midFactoryGetInstance);
    return res;
}
//----------------------------------------------------------------------------------------------------------------------

jobject CGenPropBagBase::getSingleton(JNIEnv* env)
{
    jhobject jhFactory = getFactory(env);
    jobject res = env->CallObjectMethod(jhFactory.get(), s_midGetApiSingleton);
    return res;
}
//----------------------------------------------------------------------------------------------------------------------

jobject CGenPropBagBase::getObject(JNIEnv* env)
{
    jhstring jhId = rho_cast<jstring>(env, m_id);
    jhobject jhFactory = getFactory(env);
    jobject res = env->CallObjectMethod(jhFactory.get(), s_midGetApiObject, jhId.get());
    return res;
}
//----------------------------------------------------------------------------------------------------------------------


}
