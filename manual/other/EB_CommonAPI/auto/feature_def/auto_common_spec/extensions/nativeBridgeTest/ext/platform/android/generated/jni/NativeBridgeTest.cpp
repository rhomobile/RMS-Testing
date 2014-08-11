#include "NativeBridgeTest.h"


namespace rho {

IMPLEMENT_LOGCLASS(CNativeBridgeTestBase, "NativeBridgeTestJNI");

//NativeBridgeTestFactorySingleton staff
const char* const CNativeBridgeTestBase::FACTORY_SINGLETON_CLASS = "com.rho.nativebridgetest.NativeBridgeTestFactorySingleton";
jclass CNativeBridgeTestBase::s_clsFactorySingleton = 0;
jmethodID CNativeBridgeTestBase::s_midFactorySetInstance;
jmethodID CNativeBridgeTestBase::s_midFactoryGetInstance;

//NativeBridgeTestFactory staff
const char* const CNativeBridgeTestBase::IFACTORY_CLASS = "com.rho.nativebridgetest.INativeBridgeTestFactory";
jclass CNativeBridgeTestBase::s_clsIFactory = 0;
jmethodID CNativeBridgeTestBase::s_midGetApiSingleton;
jmethodID CNativeBridgeTestBase::s_midGetApiObject;

//NativeBridgeTestSingletonBase staff
const char* const CNativeBridgeTestBase::SINGLETON_BASE_CLASS = "com.rho.nativebridgetest.NativeBridgeTestSingletonBase";
jclass CNativeBridgeTestBase::s_clsSingletonBase = 0;

//NativeBridgeTestBase staff
const char* const CNativeBridgeTestBase::OBJECT_BASE_CLASS = "com.rho.nativebridgetest.NativeBridgeTestBase";
jclass CNativeBridgeTestBase::s_clsObjectBase = 0;



//Method tasks

const char* const CNativeBridgeTestBase::TESTBOOL_TASK_CLASS = 
        "com.rho.nativebridgetest.NativeBridgeTestSingletonBase$testBoolTask";

jclass CNativeBridgeTestBase::s_clstestBoolTask = 0;
jmethodID CNativeBridgeTestBase::s_midtestBoolTask;

const char* const CNativeBridgeTestBase::TESTINT_TASK_CLASS = 
        "com.rho.nativebridgetest.NativeBridgeTestSingletonBase$testIntTask";

jclass CNativeBridgeTestBase::s_clstestIntTask = 0;
jmethodID CNativeBridgeTestBase::s_midtestIntTask;

const char* const CNativeBridgeTestBase::TESTFLOAT_TASK_CLASS = 
        "com.rho.nativebridgetest.NativeBridgeTestSingletonBase$testFloatTask";

jclass CNativeBridgeTestBase::s_clstestFloatTask = 0;
jmethodID CNativeBridgeTestBase::s_midtestFloatTask;

const char* const CNativeBridgeTestBase::TESTSTRING_TASK_CLASS = 
        "com.rho.nativebridgetest.NativeBridgeTestSingletonBase$testStringTask";

jclass CNativeBridgeTestBase::s_clstestStringTask = 0;
jmethodID CNativeBridgeTestBase::s_midtestStringTask;


//----------------------------------------------------------------------------------------------------------------------

JNIEnv* CNativeBridgeTestBase::jniInit()
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

JNIEnv* CNativeBridgeTestBase::jniInit(JNIEnv* env)
{
    static bool initialized = false;
    env = MethodExecutorJni::jniInit(env);
    if (!env) {
        LOG(FATAL) + "JNI init failed";
        return 0;
    }

    if(!initialized)
    {
        //init NativeBridgeTestFactorySingleton JNI
        s_clsFactorySingleton = loadClass(env, FACTORY_SINGLETON_CLASS);
        if (!s_clsFactorySingleton) return 0;

        s_midFactorySetInstance = env->GetStaticMethodID(s_clsFactorySingleton, "setInstance", "(Lcom/rho/nativebridgetest/INativeBridgeTestFactory;)V");
        if(!s_midFactorySetInstance)
        {
            LOG(FATAL) + "Failed to get method 'setInstance' for java class " + FACTORY_SINGLETON_CLASS;
            return NULL;
        }
        s_midFactoryGetInstance = env->GetStaticMethodID(s_clsFactorySingleton, "getInstance", "()Lcom/rho/nativebridgetest/INativeBridgeTestFactory;");
        if(!s_midFactoryGetInstance)
        {
            LOG(FATAL) + "Failed to get method 'getInstance' for java class " + FACTORY_SINGLETON_CLASS;
            return NULL;
        }

        //init INativeBridgeTestFactory JNI
        s_clsIFactory = loadClass(env, IFACTORY_CLASS);
        if (!s_clsIFactory) return 0;
        s_midGetApiSingleton = env->GetMethodID(s_clsIFactory, "getApiSingleton", "()Lcom/rho/nativebridgetest/INativeBridgeTestSingleton;");
        if(!s_midGetApiSingleton)
        {
            LOG(FATAL) + "Failed to get method 'getApiSingleton' for java class " + IFACTORY_CLASS;
            return NULL;
        }
        s_midGetApiObject = env->GetMethodID(s_clsIFactory, "getApiObject", "(Ljava/lang/String;)Lcom/rho/nativebridgetest/INativeBridgeTest;");
        if(!s_midGetApiObject)
        {
            LOG(FATAL) + "Failed to get method 'getApiObject' for java class " + IFACTORY_CLASS;
            return NULL;
        }

        s_clsSingletonBase = loadClass(env, SINGLETON_BASE_CLASS);
        if (!s_clsSingletonBase) return 0;
        s_clsObjectBase = loadClass(env, OBJECT_BASE_CLASS);
        if (!s_clsObjectBase) return 0;



        s_clstestBoolTask = loadClass(env, TESTBOOL_TASK_CLASS);
        if (!s_clstestBoolTask) return 0;
        s_midtestBoolTask = env->GetMethodID(s_clstestBoolTask, "<init>",
                        "(Lcom/rho/nativebridgetest/INativeBridgeTestSingleton;ZLcom/rhomobile/rhodes/api/IMethodResult;)V");
        if(!s_midtestBoolTask)
        {
            LOG(FATAL) + "Failed to get constructor for java class " + TESTBOOL_TASK_CLASS;
            return NULL;
        }

        s_clstestIntTask = loadClass(env, TESTINT_TASK_CLASS);
        if (!s_clstestIntTask) return 0;
        s_midtestIntTask = env->GetMethodID(s_clstestIntTask, "<init>",
                        "(Lcom/rho/nativebridgetest/INativeBridgeTestSingleton;ILcom/rhomobile/rhodes/api/IMethodResult;)V");
        if(!s_midtestIntTask)
        {
            LOG(FATAL) + "Failed to get constructor for java class " + TESTINT_TASK_CLASS;
            return NULL;
        }

        s_clstestFloatTask = loadClass(env, TESTFLOAT_TASK_CLASS);
        if (!s_clstestFloatTask) return 0;
        s_midtestFloatTask = env->GetMethodID(s_clstestFloatTask, "<init>",
                        "(Lcom/rho/nativebridgetest/INativeBridgeTestSingleton;DLcom/rhomobile/rhodes/api/IMethodResult;)V");
        if(!s_midtestFloatTask)
        {
            LOG(FATAL) + "Failed to get constructor for java class " + TESTFLOAT_TASK_CLASS;
            return NULL;
        }

        s_clstestStringTask = loadClass(env, TESTSTRING_TASK_CLASS);
        if (!s_clstestStringTask) return 0;
        s_midtestStringTask = env->GetMethodID(s_clstestStringTask, "<init>",
                        "(Lcom/rho/nativebridgetest/INativeBridgeTestSingleton;Ljava/lang/String;Lcom/rhomobile/rhodes/api/IMethodResult;)V");
        if(!s_midtestStringTask)
        {
            LOG(FATAL) + "Failed to get constructor for java class " + TESTSTRING_TASK_CLASS;
            return NULL;
        }



        initialized = true;
        LOG(TRACE) + "CNativeBridgeTest JNI init succeeded";
    }
    return env;
}
//----------------------------------------------------------------------------------------------------------------------

void CNativeBridgeTestBase::setJavaFactory(JNIEnv* env, jobject jFactory)
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

jobject CNativeBridgeTestBase::getFactory(JNIEnv* env)
{
    jobject res = env->CallStaticObjectMethod(s_clsFactorySingleton, s_midFactoryGetInstance);
    return res;
}
//----------------------------------------------------------------------------------------------------------------------

jobject CNativeBridgeTestBase::getSingleton(JNIEnv* env)
{
    jhobject jhFactory = getFactory(env);
    jobject res = env->CallObjectMethod(jhFactory.get(), s_midGetApiSingleton);
    return res;
}
//----------------------------------------------------------------------------------------------------------------------

jobject CNativeBridgeTestBase::getObject(JNIEnv* env)
{
    jhstring jhId = rho_cast<jstring>(env, m_id);
    jhobject jhFactory = getFactory(env);
    jobject res = env->CallObjectMethod(jhFactory.get(), s_midGetApiObject, jhId.get());
    return res;
}
//----------------------------------------------------------------------------------------------------------------------


}
