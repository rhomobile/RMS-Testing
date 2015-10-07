#include "Dummy.h"


namespace rho {

IMPLEMENT_LOGCLASS(CDummyBase, "DummyJNI");

//DummyFactorySingleton staff
const char* const CDummyBase::FACTORY_SINGLETON_CLASS = "com.rho.dummy.DummyFactorySingleton";
jclass CDummyBase::s_clsFactorySingleton = 0;
jmethodID CDummyBase::s_midFactorySetInstance;
jmethodID CDummyBase::s_midFactoryGetInstance;

//DummyFactory staff
const char* const CDummyBase::IFACTORY_CLASS = "com.rho.dummy.IDummyFactory";
jclass CDummyBase::s_clsIFactory = 0;
jmethodID CDummyBase::s_midGetApiSingleton;
jmethodID CDummyBase::s_midGetApiObject;

//DummySingletonBase staff
const char* const CDummyBase::SINGLETON_BASE_CLASS = "com.rho.dummy.DummySingletonBase";
jclass CDummyBase::s_clsSingletonBase = 0;

//DummyBase staff
const char* const CDummyBase::OBJECT_BASE_CLASS = "com.rho.dummy.DummyBase";
jclass CDummyBase::s_clsObjectBase = 0;


//IRhoApiDefaultId staff
const char* const CDummyBase::IDEFAULTID_CLASS = "com.rhomobile.rhodes.api.IRhoApiDefaultId";
jclass CDummyBase::s_clsIDefaultId = 0;
jmethodID CDummyBase::s_midGetDefaultID;
jmethodID CDummyBase::s_midSetDefaultID;


//Method tasks

const char* const CDummyBase::GETSIMPLESTRINGPROPERTY_TASK_CLASS = 
        "com.rho.dummy.DummyBase$getSimpleStringPropertyTask";

jclass CDummyBase::s_clsgetSimpleStringPropertyTask = 0;
jmethodID CDummyBase::s_midgetSimpleStringPropertyTask;

const char* const CDummyBase::SETSIMPLESTRINGPROPERTY_TASK_CLASS = 
        "com.rho.dummy.DummyBase$setSimpleStringPropertyTask";

jclass CDummyBase::s_clssetSimpleStringPropertyTask = 0;
jmethodID CDummyBase::s_midsetSimpleStringPropertyTask;

const char* const CDummyBase::ENUMERATE_TASK_CLASS = 
        "com.rho.dummy.DummySingletonBase$enumerateTask";

jclass CDummyBase::s_clsenumerateTask = 0;
jmethodID CDummyBase::s_midenumerateTask;

const char* const CDummyBase::GETPLATFORMNAME_TASK_CLASS = 
        "com.rho.dummy.DummyBase$getPlatformNameTask";

jclass CDummyBase::s_clsgetPlatformNameTask = 0;
jmethodID CDummyBase::s_midgetPlatformNameTask;

const char* const CDummyBase::CALCSUMM_TASK_CLASS = 
        "com.rho.dummy.DummyBase$calcSummTask";

jclass CDummyBase::s_clscalcSummTask = 0;
jmethodID CDummyBase::s_midcalcSummTask;

const char* const CDummyBase::JOINSTRINGS_TASK_CLASS = 
        "com.rho.dummy.DummyBase$joinStringsTask";

jclass CDummyBase::s_clsjoinStringsTask = 0;
jmethodID CDummyBase::s_midjoinStringsTask;

const char* const CDummyBase::ENABLE_TASK_CLASS = 
        "com.rho.dummy.DummyBase$enableTask";

jclass CDummyBase::s_clsenableTask = 0;
jmethodID CDummyBase::s_midenableTask;

const char* const CDummyBase::ENABLESTRING_TASK_CLASS = 
        "com.rho.dummy.DummyBase$enableStringTask";

jclass CDummyBase::s_clsenableStringTask = 0;
jmethodID CDummyBase::s_midenableStringTask;

const char* const CDummyBase::ENABLEINT_TASK_CLASS = 
        "com.rho.dummy.DummyBase$enableIntTask";

jclass CDummyBase::s_clsenableIntTask = 0;
jmethodID CDummyBase::s_midenableIntTask;

const char* const CDummyBase::ENABLEBOOL_TASK_CLASS = 
        "com.rho.dummy.DummyBase$enableBoolTask";

jclass CDummyBase::s_clsenableBoolTask = 0;
jmethodID CDummyBase::s_midenableBoolTask;

const char* const CDummyBase::ENABLEFLOAT_TASK_CLASS = 
        "com.rho.dummy.DummyBase$enableFloatTask";

jclass CDummyBase::s_clsenableFloatTask = 0;
jmethodID CDummyBase::s_midenableFloatTask;

const char* const CDummyBase::ENABLEARRAY_TASK_CLASS = 
        "com.rho.dummy.DummyBase$enableArrayTask";

jclass CDummyBase::s_clsenableArrayTask = 0;
jmethodID CDummyBase::s_midenableArrayTask;

const char* const CDummyBase::STOP_TASK_CLASS = 
        "com.rho.dummy.DummyBase$stopTask";

jclass CDummyBase::s_clsstopTask = 0;
jmethodID CDummyBase::s_midstopTask;

const char* const CDummyBase::GETPROPERTY_TASK_CLASS = 
        "com.rho.dummy.DummyBase$getPropertyTask";

jclass CDummyBase::s_clsgetPropertyTask = 0;
jmethodID CDummyBase::s_midgetPropertyTask;

const char* const CDummyBase::GETPROPERTIES_TASK_CLASS = 
        "com.rho.dummy.DummyBase$getPropertiesTask";

jclass CDummyBase::s_clsgetPropertiesTask = 0;
jmethodID CDummyBase::s_midgetPropertiesTask;

const char* const CDummyBase::GETALLPROPERTIES_TASK_CLASS = 
        "com.rho.dummy.DummyBase$getAllPropertiesTask";

jclass CDummyBase::s_clsgetAllPropertiesTask = 0;
jmethodID CDummyBase::s_midgetAllPropertiesTask;

const char* const CDummyBase::SETPROPERTY_TASK_CLASS = 
        "com.rho.dummy.DummyBase$setPropertyTask";

jclass CDummyBase::s_clssetPropertyTask = 0;
jmethodID CDummyBase::s_midsetPropertyTask;

const char* const CDummyBase::SETPROPERTIES_TASK_CLASS = 
        "com.rho.dummy.DummyBase$setPropertiesTask";

jclass CDummyBase::s_clssetPropertiesTask = 0;
jmethodID CDummyBase::s_midsetPropertiesTask;


//----------------------------------------------------------------------------------------------------------------------

JNIEnv* CDummyBase::jniInit()
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

JNIEnv* CDummyBase::jniInit(JNIEnv* env)
{
    static bool initialized = false;
    env = MethodExecutorJni::jniInit(env);
    if (!env) {
        LOG(FATAL) + "JNI init failed";
        return 0;
    }

    if(!initialized)
    {
        //init DummyFactorySingleton JNI
        s_clsFactorySingleton = loadClass(env, FACTORY_SINGLETON_CLASS);
        if (!s_clsFactorySingleton) return 0;

        s_midFactorySetInstance = env->GetStaticMethodID(s_clsFactorySingleton, "setInstance", "(Lcom/rho/dummy/IDummyFactory;)V");
        if(!s_midFactorySetInstance)
        {
            LOG(FATAL) + "Failed to get method 'setInstance' for java class " + FACTORY_SINGLETON_CLASS;
            return NULL;
        }
        s_midFactoryGetInstance = env->GetStaticMethodID(s_clsFactorySingleton, "getInstance", "()Lcom/rho/dummy/IDummyFactory;");
        if(!s_midFactoryGetInstance)
        {
            LOG(FATAL) + "Failed to get method 'getInstance' for java class " + FACTORY_SINGLETON_CLASS;
            return NULL;
        }

        //init IDummyFactory JNI
        s_clsIFactory = loadClass(env, IFACTORY_CLASS);
        if (!s_clsIFactory) return 0;
        s_midGetApiSingleton = env->GetMethodID(s_clsIFactory, "getApiSingleton", "()Lcom/rho/dummy/IDummySingleton;");
        if(!s_midGetApiSingleton)
        {
            LOG(FATAL) + "Failed to get method 'getApiSingleton' for java class " + IFACTORY_CLASS;
            return NULL;
        }
        s_midGetApiObject = env->GetMethodID(s_clsIFactory, "getApiObject", "(Ljava/lang/String;)Lcom/rho/dummy/IDummy;");
        if(!s_midGetApiObject)
        {
            LOG(FATAL) + "Failed to get method 'getApiObject' for java class " + IFACTORY_CLASS;
            return NULL;
        }

        s_clsSingletonBase = loadClass(env, SINGLETON_BASE_CLASS);
        if (!s_clsSingletonBase) return 0;
        s_clsObjectBase = loadClass(env, OBJECT_BASE_CLASS);
        if (!s_clsObjectBase) return 0;



        s_clsgetSimpleStringPropertyTask = loadClass(env, GETSIMPLESTRINGPROPERTY_TASK_CLASS);
        if (!s_clsgetSimpleStringPropertyTask) return 0;
        s_midgetSimpleStringPropertyTask = env->GetMethodID(s_clsgetSimpleStringPropertyTask, "<init>",
                        "(Lcom/rho/dummy/IDummy;Lcom/rhomobile/rhodes/api/IMethodResult;)V");
        if(!s_midgetSimpleStringPropertyTask)
        {
            LOG(FATAL) + "Failed to get constructor for java class " + GETSIMPLESTRINGPROPERTY_TASK_CLASS;
            return NULL;
        }

        s_clssetSimpleStringPropertyTask = loadClass(env, SETSIMPLESTRINGPROPERTY_TASK_CLASS);
        if (!s_clssetSimpleStringPropertyTask) return 0;
        s_midsetSimpleStringPropertyTask = env->GetMethodID(s_clssetSimpleStringPropertyTask, "<init>",
                        "(Lcom/rho/dummy/IDummy;Ljava/lang/String;Lcom/rhomobile/rhodes/api/IMethodResult;)V");
        if(!s_midsetSimpleStringPropertyTask)
        {
            LOG(FATAL) + "Failed to get constructor for java class " + SETSIMPLESTRINGPROPERTY_TASK_CLASS;
            return NULL;
        }

        s_clsenumerateTask = loadClass(env, ENUMERATE_TASK_CLASS);
        if (!s_clsenumerateTask) return 0;
        s_midenumerateTask = env->GetMethodID(s_clsenumerateTask, "<init>",
                        "(Lcom/rho/dummy/IDummySingleton;Lcom/rhomobile/rhodes/api/IMethodResult;)V");
        if(!s_midenumerateTask)
        {
            LOG(FATAL) + "Failed to get constructor for java class " + ENUMERATE_TASK_CLASS;
            return NULL;
        }

        s_clsgetPlatformNameTask = loadClass(env, GETPLATFORMNAME_TASK_CLASS);
        if (!s_clsgetPlatformNameTask) return 0;
        s_midgetPlatformNameTask = env->GetMethodID(s_clsgetPlatformNameTask, "<init>",
                        "(Lcom/rho/dummy/IDummy;Lcom/rhomobile/rhodes/api/IMethodResult;)V");
        if(!s_midgetPlatformNameTask)
        {
            LOG(FATAL) + "Failed to get constructor for java class " + GETPLATFORMNAME_TASK_CLASS;
            return NULL;
        }

        s_clscalcSummTask = loadClass(env, CALCSUMM_TASK_CLASS);
        if (!s_clscalcSummTask) return 0;
        s_midcalcSummTask = env->GetMethodID(s_clscalcSummTask, "<init>",
                        "(Lcom/rho/dummy/IDummy;IILcom/rhomobile/rhodes/api/IMethodResult;)V");
        if(!s_midcalcSummTask)
        {
            LOG(FATAL) + "Failed to get constructor for java class " + CALCSUMM_TASK_CLASS;
            return NULL;
        }

        s_clsjoinStringsTask = loadClass(env, JOINSTRINGS_TASK_CLASS);
        if (!s_clsjoinStringsTask) return 0;
        s_midjoinStringsTask = env->GetMethodID(s_clsjoinStringsTask, "<init>",
                        "(Lcom/rho/dummy/IDummy;Ljava/lang/String;Ljava/lang/String;Lcom/rhomobile/rhodes/api/IMethodResult;)V");
        if(!s_midjoinStringsTask)
        {
            LOG(FATAL) + "Failed to get constructor for java class " + JOINSTRINGS_TASK_CLASS;
            return NULL;
        }

        s_clsenableTask = loadClass(env, ENABLE_TASK_CLASS);
        if (!s_clsenableTask) return 0;
        s_midenableTask = env->GetMethodID(s_clsenableTask, "<init>",
                        "(Lcom/rho/dummy/IDummy;ILcom/rhomobile/rhodes/api/IMethodResult;)V");
        if(!s_midenableTask)
        {
            LOG(FATAL) + "Failed to get constructor for java class " + ENABLE_TASK_CLASS;
            return NULL;
        }

        s_clsenableStringTask = loadClass(env, ENABLESTRING_TASK_CLASS);
        if (!s_clsenableStringTask) return 0;
        s_midenableStringTask = env->GetMethodID(s_clsenableStringTask, "<init>",
                        "(Lcom/rho/dummy/IDummy;ILcom/rhomobile/rhodes/api/IMethodResult;)V");
        if(!s_midenableStringTask)
        {
            LOG(FATAL) + "Failed to get constructor for java class " + ENABLESTRING_TASK_CLASS;
            return NULL;
        }

        s_clsenableIntTask = loadClass(env, ENABLEINT_TASK_CLASS);
        if (!s_clsenableIntTask) return 0;
        s_midenableIntTask = env->GetMethodID(s_clsenableIntTask, "<init>",
                        "(Lcom/rho/dummy/IDummy;ILcom/rhomobile/rhodes/api/IMethodResult;)V");
        if(!s_midenableIntTask)
        {
            LOG(FATAL) + "Failed to get constructor for java class " + ENABLEINT_TASK_CLASS;
            return NULL;
        }

        s_clsenableBoolTask = loadClass(env, ENABLEBOOL_TASK_CLASS);
        if (!s_clsenableBoolTask) return 0;
        s_midenableBoolTask = env->GetMethodID(s_clsenableBoolTask, "<init>",
                        "(Lcom/rho/dummy/IDummy;ILcom/rhomobile/rhodes/api/IMethodResult;)V");
        if(!s_midenableBoolTask)
        {
            LOG(FATAL) + "Failed to get constructor for java class " + ENABLEBOOL_TASK_CLASS;
            return NULL;
        }

        s_clsenableFloatTask = loadClass(env, ENABLEFLOAT_TASK_CLASS);
        if (!s_clsenableFloatTask) return 0;
        s_midenableFloatTask = env->GetMethodID(s_clsenableFloatTask, "<init>",
                        "(Lcom/rho/dummy/IDummy;ILcom/rhomobile/rhodes/api/IMethodResult;)V");
        if(!s_midenableFloatTask)
        {
            LOG(FATAL) + "Failed to get constructor for java class " + ENABLEFLOAT_TASK_CLASS;
            return NULL;
        }

        s_clsenableArrayTask = loadClass(env, ENABLEARRAY_TASK_CLASS);
        if (!s_clsenableArrayTask) return 0;
        s_midenableArrayTask = env->GetMethodID(s_clsenableArrayTask, "<init>",
                        "(Lcom/rho/dummy/IDummy;ILcom/rhomobile/rhodes/api/IMethodResult;)V");
        if(!s_midenableArrayTask)
        {
            LOG(FATAL) + "Failed to get constructor for java class " + ENABLEARRAY_TASK_CLASS;
            return NULL;
        }

        s_clsstopTask = loadClass(env, STOP_TASK_CLASS);
        if (!s_clsstopTask) return 0;
        s_midstopTask = env->GetMethodID(s_clsstopTask, "<init>",
                        "(Lcom/rho/dummy/IDummy;Lcom/rhomobile/rhodes/api/IMethodResult;)V");
        if(!s_midstopTask)
        {
            LOG(FATAL) + "Failed to get constructor for java class " + STOP_TASK_CLASS;
            return NULL;
        }

        s_clsgetPropertyTask = loadClass(env, GETPROPERTY_TASK_CLASS);
        if (!s_clsgetPropertyTask) return 0;
        s_midgetPropertyTask = env->GetMethodID(s_clsgetPropertyTask, "<init>",
                        "(Lcom/rho/dummy/IDummy;Ljava/lang/String;Lcom/rhomobile/rhodes/api/IMethodResult;)V");
        if(!s_midgetPropertyTask)
        {
            LOG(FATAL) + "Failed to get constructor for java class " + GETPROPERTY_TASK_CLASS;
            return NULL;
        }

        s_clsgetPropertiesTask = loadClass(env, GETPROPERTIES_TASK_CLASS);
        if (!s_clsgetPropertiesTask) return 0;
        s_midgetPropertiesTask = env->GetMethodID(s_clsgetPropertiesTask, "<init>",
                        "(Lcom/rho/dummy/IDummy;Ljava/util/List;Lcom/rhomobile/rhodes/api/IMethodResult;)V");
        if(!s_midgetPropertiesTask)
        {
            LOG(FATAL) + "Failed to get constructor for java class " + GETPROPERTIES_TASK_CLASS;
            return NULL;
        }

        s_clsgetAllPropertiesTask = loadClass(env, GETALLPROPERTIES_TASK_CLASS);
        if (!s_clsgetAllPropertiesTask) return 0;
        s_midgetAllPropertiesTask = env->GetMethodID(s_clsgetAllPropertiesTask, "<init>",
                        "(Lcom/rho/dummy/IDummy;Lcom/rhomobile/rhodes/api/IMethodResult;)V");
        if(!s_midgetAllPropertiesTask)
        {
            LOG(FATAL) + "Failed to get constructor for java class " + GETALLPROPERTIES_TASK_CLASS;
            return NULL;
        }

        s_clssetPropertyTask = loadClass(env, SETPROPERTY_TASK_CLASS);
        if (!s_clssetPropertyTask) return 0;
        s_midsetPropertyTask = env->GetMethodID(s_clssetPropertyTask, "<init>",
                        "(Lcom/rho/dummy/IDummy;Ljava/lang/String;Ljava/lang/String;Lcom/rhomobile/rhodes/api/IMethodResult;)V");
        if(!s_midsetPropertyTask)
        {
            LOG(FATAL) + "Failed to get constructor for java class " + SETPROPERTY_TASK_CLASS;
            return NULL;
        }

        s_clssetPropertiesTask = loadClass(env, SETPROPERTIES_TASK_CLASS);
        if (!s_clssetPropertiesTask) return 0;
        s_midsetPropertiesTask = env->GetMethodID(s_clssetPropertiesTask, "<init>",
                        "(Lcom/rho/dummy/IDummy;Ljava/util/Map;Lcom/rhomobile/rhodes/api/IMethodResult;)V");
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
        LOG(TRACE) + "CDummy JNI init succeeded";
    }
    return env;
}
//----------------------------------------------------------------------------------------------------------------------

void CDummyBase::setJavaFactory(JNIEnv* env, jobject jFactory)
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

rho::String CDummyBase::getDefaultID()
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

void CDummyBase::setDefaultID(const rho::String& id)
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

jobject CDummyBase::getFactory(JNIEnv* env)
{
    jobject res = env->CallStaticObjectMethod(s_clsFactorySingleton, s_midFactoryGetInstance);
    return res;
}
//----------------------------------------------------------------------------------------------------------------------

jobject CDummyBase::getSingleton(JNIEnv* env)
{
    jhobject jhFactory = getFactory(env);
    jobject res = env->CallObjectMethod(jhFactory.get(), s_midGetApiSingleton);
    return res;
}
//----------------------------------------------------------------------------------------------------------------------

jobject CDummyBase::getObject(JNIEnv* env)
{
    jhstring jhId = rho_cast<jstring>(env, m_id);
    jhobject jhFactory = getFactory(env);
    jobject res = env->CallObjectMethod(jhFactory.get(), s_midGetApiObject, jhId.get());
    return res;
}
//----------------------------------------------------------------------------------------------------------------------


}
