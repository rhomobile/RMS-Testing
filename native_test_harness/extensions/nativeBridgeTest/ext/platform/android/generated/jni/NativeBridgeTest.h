#pragma once

#include "common/RhoStd.h"
#include "logging/RhoLog.h"
#include "rhodes/JNIRhodes.h"
#include "MethodExecutorJni.h"
#include "MethodResultJni.h"


namespace rho {

using rho::apiGenerator::MethodResultJni;
using rho::apiGenerator::MethodExecutorJni;

class CNativeBridgeTestBase : public MethodExecutorJni
{
protected:
    DEFINE_LOGCLASS;

    static const char* const FACTORY_SINGLETON_CLASS;
    static jclass s_clsFactorySingleton;
    static jmethodID s_midFactorySetInstance;
    static jmethodID s_midFactoryGetInstance;

    //INativeBridgeTestFactory staff
    static const char* const IFACTORY_CLASS;
    static jclass s_clsIFactory;
    static jmethodID s_midGetApiSingleton;
    static jmethodID s_midGetApiObject;

    //NativeBridgeTestSingletonBase staff
    static const char* const SINGLETON_BASE_CLASS;
    static jclass s_clsSingletonBase;

    //NativeBridgeTestBase staff
    static const char* const OBJECT_BASE_CLASS;
    static jclass s_clsObjectBase;

    //Method tasks

    static const char* const TESTBOOL_TASK_CLASS;
    static jclass s_clstestBoolTask;
    static jmethodID s_midtestBoolTask;
    static const char* const TESTINT_TASK_CLASS;
    static jclass s_clstestIntTask;
    static jmethodID s_midtestIntTask;
    static const char* const TESTFLOAT_TASK_CLASS;
    static jclass s_clstestFloatTask;
    static jmethodID s_midtestFloatTask;
    static const char* const TESTSTRING_TASK_CLASS;
    static jclass s_clstestStringTask;
    static jmethodID s_midtestStringTask;
    static const char* const TESTAPI_TASK_CLASS;
    static jclass s_clstestApiTask;
    static jmethodID s_midtestApiTask;


    static JNIEnv* jniInit(JNIEnv* env);
    static JNIEnv* jniInit();

    static jobject getFactory(JNIEnv* env);
    static jobject getSingleton(JNIEnv* env);

    rho::String m_id;
    jobject getObject(JNIEnv* env);
public:
    static void setJavaFactory(JNIEnv* env, jobject jFactory);


    CNativeBridgeTestBase(const rho::String& id)
        : MethodExecutorJni(), m_id(id)
        {}
    virtual ~CNativeBridgeTestBase() {}
};

template <typename T>
class CNativeBridgeTestProxy : public CNativeBridgeTestBase
{
public:
    CNativeBridgeTestProxy(const rho::String& id)
        : CNativeBridgeTestBase(id)
        {}
    virtual ~CNativeBridgeTestProxy() {}

    static
    void testBool(const T& argsAdapter, MethodResultJni& result)
    {
        LOG(TRACE) + "testBool";

        JNIEnv *env = jniInit();
        if (!env) {
            LOG(FATAL) + "JNI initialization failed";
            return;
        }

        jhobject jhObject = 
            getSingleton(env); 

        if(argsAdapter.size() <= 0)
        {
            LOG(ERROR) + "Wrong number of arguments: 'val' must be set ^^^";
            result.setArgError("Wrong number of arguments: 'val' must be set");
            return;
        }
        jholder< jboolean > jhval = 
            rho_cast< jboolean >(env, argsAdapter[0]);

        jhobject jhTask = env->NewObject(s_clstestBoolTask, s_midtestBoolTask,
                    jhObject.get(), 
                    jhval.get(),
                    static_cast<jobject>(result));

        run(env, jhTask.get(), result, rho::apiGenerator::NOT_FORCE_THREAD);
        if(env->ExceptionCheck() == JNI_TRUE)
        {
            rho::String message = rho::common::clearException(env);
            LOG(ERROR) + message;
            result.setError(message);
        }
    }

    static
    void testInt(const T& argsAdapter, MethodResultJni& result)
    {
        LOG(TRACE) + "testInt";

        JNIEnv *env = jniInit();
        if (!env) {
            LOG(FATAL) + "JNI initialization failed";
            return;
        }

        jhobject jhObject = 
            getSingleton(env); 

        if(argsAdapter.size() <= 0)
        {
            LOG(ERROR) + "Wrong number of arguments: 'val' must be set ^^^";
            result.setArgError("Wrong number of arguments: 'val' must be set");
            return;
        }
        jholder< jint > jhval = 
            rho_cast< jint >(env, argsAdapter[0]);

        jhobject jhTask = env->NewObject(s_clstestIntTask, s_midtestIntTask,
                    jhObject.get(), 
                    jhval.get(),
                    static_cast<jobject>(result));

        run(env, jhTask.get(), result, rho::apiGenerator::NOT_FORCE_THREAD);
        if(env->ExceptionCheck() == JNI_TRUE)
        {
            rho::String message = rho::common::clearException(env);
            LOG(ERROR) + message;
            result.setError(message);
        }
    }

    static
    void testFloat(const T& argsAdapter, MethodResultJni& result)
    {
        LOG(TRACE) + "testFloat";

        JNIEnv *env = jniInit();
        if (!env) {
            LOG(FATAL) + "JNI initialization failed";
            return;
        }

        jhobject jhObject = 
            getSingleton(env); 

        if(argsAdapter.size() <= 0)
        {
            LOG(ERROR) + "Wrong number of arguments: 'val' must be set ^^^";
            result.setArgError("Wrong number of arguments: 'val' must be set");
            return;
        }
        jholder< jdouble > jhval = 
            rho_cast< jdouble >(env, argsAdapter[0]);

        jhobject jhTask = env->NewObject(s_clstestFloatTask, s_midtestFloatTask,
                    jhObject.get(), 
                    jhval.get(),
                    static_cast<jobject>(result));

        run(env, jhTask.get(), result, rho::apiGenerator::NOT_FORCE_THREAD);
        if(env->ExceptionCheck() == JNI_TRUE)
        {
            rho::String message = rho::common::clearException(env);
            LOG(ERROR) + message;
            result.setError(message);
        }
    }

    static
    void testString(const T& argsAdapter, MethodResultJni& result)
    {
        LOG(TRACE) + "testString";

        JNIEnv *env = jniInit();
        if (!env) {
            LOG(FATAL) + "JNI initialization failed";
            return;
        }

        jhobject jhObject = 
            getSingleton(env); 

        if(argsAdapter.size() <= 0)
        {
            LOG(ERROR) + "Wrong number of arguments: 'val' must be set ^^^";
            result.setArgError("Wrong number of arguments: 'val' must be set");
            return;
        }
        jholder< jstring > jhval = 
            rho_cast< jstring >(env, argsAdapter[0]);

        jhobject jhTask = env->NewObject(s_clstestStringTask, s_midtestStringTask,
                    jhObject.get(), 
                    jhval.get(),
                    static_cast<jobject>(result));

        run(env, jhTask.get(), result, rho::apiGenerator::NOT_FORCE_THREAD);
        if(env->ExceptionCheck() == JNI_TRUE)
        {
            rho::String message = rho::common::clearException(env);
            LOG(ERROR) + message;
            result.setError(message);
        }
    }

    static
    void testApi(const T& argsAdapter, MethodResultJni& result)
    {
        LOG(TRACE) + "testApi";

        JNIEnv *env = jniInit();
        if (!env) {
            LOG(FATAL) + "JNI initialization failed";
            return;
        }

        jhobject jhObject = 
            getSingleton(env); 

        if(argsAdapter.size() <= 0)
        {
            LOG(ERROR) + "Wrong number of arguments: 'arrHashStr' must be set ^^^";
            result.setArgError("Wrong number of arguments: 'arrHashStr' must be set");
            return;
        }
        jholder< jobject > jharrHashStr = 
            rho_cast< jobject >(env, argsAdapter[0]);

        if(argsAdapter.size() <= 1)
        {
            LOG(ERROR) + "Wrong number of arguments: 'hashHashStr' must be set ^^^";
            result.setArgError("Wrong number of arguments: 'hashHashStr' must be set");
            return;
        }
        jholder< jobject > jhhashHashStr = 
            rho_cast< jobject >(env, argsAdapter[1]);

        if(argsAdapter.size() <= 2)
        {
            LOG(ERROR) + "Wrong number of arguments: 'hashArrStr' must be set ^^^";
            result.setArgError("Wrong number of arguments: 'hashArrStr' must be set");
            return;
        }
        jholder< jobject > jhhashArrStr = 
            rho_cast< jobject >(env, argsAdapter[2]);

        if(argsAdapter.size() <= 3)
        {
            LOG(ERROR) + "Wrong number of arguments: 'arrArrStr' must be set ^^^";
            result.setArgError("Wrong number of arguments: 'arrArrStr' must be set");
            return;
        }
        jholder< jobject > jharrArrStr = 
            rho_cast< jobject >(env, argsAdapter[3]);

        jhobject jhTask = env->NewObject(s_clstestApiTask, s_midtestApiTask,
                    jhObject.get(), 
                    jharrHashStr.get(),
                    jhhashHashStr.get(),
                    jhhashArrStr.get(),
                    jharrArrStr.get(),
                    static_cast<jobject>(result));

        run(env, jhTask.get(), result, rho::apiGenerator::NOT_FORCE_THREAD);
        if(env->ExceptionCheck() == JNI_TRUE)
        {
            rho::String message = rho::common::clearException(env);
            LOG(ERROR) + message;
            result.setError(message);
        }
    }


};


}
