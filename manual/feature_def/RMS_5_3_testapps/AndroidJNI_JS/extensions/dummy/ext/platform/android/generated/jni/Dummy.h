#pragma once

#include "common/RhoStd.h"
#include "logging/RhoLog.h"
#include "rhodes/JNIRhodes.h"
#include "MethodExecutorJni.h"
#include "MethodResultJni.h"


namespace rho {

using rho::apiGenerator::MethodResultJni;
using rho::apiGenerator::MethodExecutorJni;

class CDummyBase : public MethodExecutorJni
{
protected:
    DEFINE_LOGCLASS;

    static const char* const FACTORY_SINGLETON_CLASS;
    static jclass s_clsFactorySingleton;
    static jmethodID s_midFactorySetInstance;
    static jmethodID s_midFactoryGetInstance;

    //IDummyFactory staff
    static const char* const IFACTORY_CLASS;
    static jclass s_clsIFactory;
    static jmethodID s_midGetApiSingleton;
    static jmethodID s_midGetApiObject;

    //DummySingletonBase staff
    static const char* const SINGLETON_BASE_CLASS;
    static jclass s_clsSingletonBase;

    //DummyBase staff
    static const char* const OBJECT_BASE_CLASS;
    static jclass s_clsObjectBase;

    //Method tasks

    static const char* const GETSIMPLESTRINGPROPERTY_TASK_CLASS;
    static jclass s_clsgetSimpleStringPropertyTask;
    static jmethodID s_midgetSimpleStringPropertyTask;
    static const char* const SETSIMPLESTRINGPROPERTY_TASK_CLASS;
    static jclass s_clssetSimpleStringPropertyTask;
    static jmethodID s_midsetSimpleStringPropertyTask;
    static const char* const ENUMERATE_TASK_CLASS;
    static jclass s_clsenumerateTask;
    static jmethodID s_midenumerateTask;
    static const char* const GETPLATFORMNAME_TASK_CLASS;
    static jclass s_clsgetPlatformNameTask;
    static jmethodID s_midgetPlatformNameTask;
    static const char* const CALCSUMM_TASK_CLASS;
    static jclass s_clscalcSummTask;
    static jmethodID s_midcalcSummTask;
    static const char* const JOINSTRINGS_TASK_CLASS;
    static jclass s_clsjoinStringsTask;
    static jmethodID s_midjoinStringsTask;
    static const char* const ENABLE_TASK_CLASS;
    static jclass s_clsenableTask;
    static jmethodID s_midenableTask;
    static const char* const ENABLE_INT_TASK_CLASS;
    static jclass s_clsenable_IntTask;
    static jmethodID s_midenable_IntTask;
    static const char* const ENABLE_STR_TASK_CLASS;
    static jclass s_clsenable_strTask;
    static jmethodID s_midenable_strTask;
    static const char* const ENABLE_BOOL_TASK_CLASS;
    static jclass s_clsenable_boolTask;
    static jmethodID s_midenable_boolTask;
    static const char* const ENABLE_DOUBLE_TASK_CLASS;
    static jclass s_clsenable_doubleTask;
    static jmethodID s_midenable_doubleTask;
    static const char* const STOP_TASK_CLASS;
    static jclass s_clsstopTask;
    static jmethodID s_midstopTask;
    static const char* const GETPROPERTY_TASK_CLASS;
    static jclass s_clsgetPropertyTask;
    static jmethodID s_midgetPropertyTask;
    static const char* const GETPROPERTIES_TASK_CLASS;
    static jclass s_clsgetPropertiesTask;
    static jmethodID s_midgetPropertiesTask;
    static const char* const GETALLPROPERTIES_TASK_CLASS;
    static jclass s_clsgetAllPropertiesTask;
    static jmethodID s_midgetAllPropertiesTask;
    static const char* const SETPROPERTY_TASK_CLASS;
    static jclass s_clssetPropertyTask;
    static jmethodID s_midsetPropertyTask;
    static const char* const SETPROPERTIES_TASK_CLASS;
    static jclass s_clssetPropertiesTask;
    static jmethodID s_midsetPropertiesTask;

    //IRhoApiDefaultId staff
    static const char* const IDEFAULTID_CLASS;
    static jclass s_clsIDefaultId;
    static jmethodID s_midGetDefaultID;
    static jmethodID s_midSetDefaultID;

    static JNIEnv* jniInit(JNIEnv* env);
    static JNIEnv* jniInit();

    static jobject getFactory(JNIEnv* env);
    static jobject getSingleton(JNIEnv* env);

    rho::String m_id;
    jobject getObject(JNIEnv* env);
public:
    static void setJavaFactory(JNIEnv* env, jobject jFactory);

    static rho::String getDefaultID();
    static void setDefaultID(const rho::String& id); 

    CDummyBase(const rho::String& id)
        : MethodExecutorJni(), m_id(id)
        {}
    virtual ~CDummyBase() {}
};

template <typename T>
class CDummyProxy : public CDummyBase
{
public:
    CDummyProxy(const rho::String& id)
        : CDummyBase(id)
        {}
    virtual ~CDummyProxy() {}

    void getSimpleStringProperty(const T& argsAdapter, MethodResultJni& result)
    {
        LOG(TRACE) + "getSimpleStringProperty";

        JNIEnv *env = jniInit();
        if (!env) {
            LOG(FATAL) + "JNI initialization failed";
            return;
        }

        jhobject jhObject = 
            getObject(env); 

        jhobject jhTask = env->NewObject(s_clsgetSimpleStringPropertyTask, s_midgetSimpleStringPropertyTask,
                    jhObject.get(), 
                    static_cast<jobject>(result));

        run(env, jhTask.get(), result, rho::apiGenerator::NOT_FORCE_THREAD);
        if(env->ExceptionCheck() == JNI_TRUE)
        {
            rho::String message = rho::common::clearException(env);
            LOG(ERROR) + message;
            result.setError(message);
        }
    }

    void setSimpleStringProperty(const T& argsAdapter, MethodResultJni& result)
    {
        LOG(TRACE) + "setSimpleStringProperty";

        JNIEnv *env = jniInit();
        if (!env) {
            LOG(FATAL) + "JNI initialization failed";
            return;
        }

        jhobject jhObject = 
            getObject(env); 

        if(argsAdapter.size() <= 0)
        {
            LOG(ERROR) + "Wrong number of arguments: 'simpleStringProperty' must be set ^^^";
            result.setArgError("Wrong number of arguments: 'simpleStringProperty' must be set");
            return;
        }
        jholder< jstring > jhsimpleStringProperty = 
            rho_cast< jstring >(env, argsAdapter[0]);

        jhobject jhTask = env->NewObject(s_clssetSimpleStringPropertyTask, s_midsetSimpleStringPropertyTask,
                    jhObject.get(), 
                    jhsimpleStringProperty.get(),
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
    void enumerate(const T& argsAdapter, MethodResultJni& result)
    {
        LOG(TRACE) + "enumerate";

        JNIEnv *env = jniInit();
        if (!env) {
            LOG(FATAL) + "JNI initialization failed";
            return;
        }

        jhobject jhObject = 
            getSingleton(env); 

        jhobject jhTask = env->NewObject(s_clsenumerateTask, s_midenumerateTask,
                    jhObject.get(), 
                    static_cast<jobject>(result));

        run(env, jhTask.get(), result, rho::apiGenerator::NOT_FORCE_THREAD);
        if(env->ExceptionCheck() == JNI_TRUE)
        {
            rho::String message = rho::common::clearException(env);
            LOG(ERROR) + message;
            result.setError(message);
        }
    }

    void getPlatformName(const T& argsAdapter, MethodResultJni& result)
    {
        LOG(TRACE) + "getPlatformName";

        JNIEnv *env = jniInit();
        if (!env) {
            LOG(FATAL) + "JNI initialization failed";
            return;
        }

        jhobject jhObject = 
            getObject(env); 

        jhobject jhTask = env->NewObject(s_clsgetPlatformNameTask, s_midgetPlatformNameTask,
                    jhObject.get(), 
                    static_cast<jobject>(result));

        run(env, jhTask.get(), result, rho::apiGenerator::NOT_FORCE_THREAD);
        if(env->ExceptionCheck() == JNI_TRUE)
        {
            rho::String message = rho::common::clearException(env);
            LOG(ERROR) + message;
            result.setError(message);
        }
    }

    void calcSumm(const T& argsAdapter, MethodResultJni& result)
    {
        LOG(TRACE) + "calcSumm";

        JNIEnv *env = jniInit();
        if (!env) {
            LOG(FATAL) + "JNI initialization failed";
            return;
        }

        jhobject jhObject = 
            getObject(env); 

        if(argsAdapter.size() <= 0)
        {
            LOG(ERROR) + "Wrong number of arguments: 'a' must be set ^^^";
            result.setArgError("Wrong number of arguments: 'a' must be set");
            return;
        }
        jholder< jint > jha = 
            rho_cast< jint >(env, argsAdapter[0]);

        if(argsAdapter.size() <= 1)
        {
            LOG(ERROR) + "Wrong number of arguments: 'b' must be set ^^^";
            result.setArgError("Wrong number of arguments: 'b' must be set");
            return;
        }
        jholder< jint > jhb = 
            rho_cast< jint >(env, argsAdapter[1]);

        jhobject jhTask = env->NewObject(s_clscalcSummTask, s_midcalcSummTask,
                    jhObject.get(), 
                    jha.get(),
                    jhb.get(),
                    static_cast<jobject>(result));

        run(env, jhTask.get(), result, rho::apiGenerator::NOT_FORCE_THREAD);
        if(env->ExceptionCheck() == JNI_TRUE)
        {
            rho::String message = rho::common::clearException(env);
            LOG(ERROR) + message;
            result.setError(message);
        }
    }

    void joinStrings(const T& argsAdapter, MethodResultJni& result)
    {
        LOG(TRACE) + "joinStrings";

        JNIEnv *env = jniInit();
        if (!env) {
            LOG(FATAL) + "JNI initialization failed";
            return;
        }

        jhobject jhObject = 
            getObject(env); 

        if(argsAdapter.size() <= 0)
        {
            LOG(ERROR) + "Wrong number of arguments: 'a' must be set ^^^";
            result.setArgError("Wrong number of arguments: 'a' must be set");
            return;
        }
        jholder< jstring > jha = 
            rho_cast< jstring >(env, argsAdapter[0]);

        if(argsAdapter.size() <= 1)
        {
            LOG(ERROR) + "Wrong number of arguments: 'b' must be set ^^^";
            result.setArgError("Wrong number of arguments: 'b' must be set");
            return;
        }
        jholder< jstring > jhb = 
            rho_cast< jstring >(env, argsAdapter[1]);

        jhobject jhTask = env->NewObject(s_clsjoinStringsTask, s_midjoinStringsTask,
                    jhObject.get(), 
                    jha.get(),
                    jhb.get(),
                    static_cast<jobject>(result));

        run(env, jhTask.get(), result, rho::apiGenerator::NOT_FORCE_THREAD);
        if(env->ExceptionCheck() == JNI_TRUE)
        {
            rho::String message = rho::common::clearException(env);
            LOG(ERROR) + message;
            result.setError(message);
        }
    }

    void enable(const T& argsAdapter, MethodResultJni& result)
    {
        LOG(TRACE) + "enable";

        JNIEnv *env = jniInit();
        if (!env) {
            LOG(FATAL) + "JNI initialization failed";
            return;
        }

        jhobject jhObject = 
            getObject(env); 

        if(argsAdapter.size() <= 0)
        {
            LOG(ERROR) + "Wrong number of arguments: 'firingInterval' must be set ^^^";
            result.setArgError("Wrong number of arguments: 'firingInterval' must be set");
            return;
        }
        jholder< jint > jhfiringInterval = 
            rho_cast< jint >(env, argsAdapter[0]);

        jhobject jhTask = env->NewObject(s_clsenableTask, s_midenableTask,
                    jhObject.get(), 
                    jhfiringInterval.get(),
                    static_cast<jobject>(result));

        run(env, jhTask.get(), result, rho::apiGenerator::NOT_FORCE_THREAD);
        if(env->ExceptionCheck() == JNI_TRUE)
        {
            rho::String message = rho::common::clearException(env);
            LOG(ERROR) + message;
            result.setError(message);
        }
    }

    void enable_Int(const T& argsAdapter, MethodResultJni& result)
    {
        LOG(TRACE) + "enable_Int";

        JNIEnv *env = jniInit();
        if (!env) {
            LOG(FATAL) + "JNI initialization failed";
            return;
        }

        jhobject jhObject = 
            getObject(env); 

        if(argsAdapter.size() <= 0)
        {
            LOG(ERROR) + "Wrong number of arguments: 'firingInterval' must be set ^^^";
            result.setArgError("Wrong number of arguments: 'firingInterval' must be set");
            return;
        }
        jholder< jint > jhfiringInterval = 
            rho_cast< jint >(env, argsAdapter[0]);

        jhobject jhTask = env->NewObject(s_clsenable_IntTask, s_midenable_IntTask,
                    jhObject.get(), 
                    jhfiringInterval.get(),
                    static_cast<jobject>(result));

        run(env, jhTask.get(), result, rho::apiGenerator::NOT_FORCE_THREAD);
        if(env->ExceptionCheck() == JNI_TRUE)
        {
            rho::String message = rho::common::clearException(env);
            LOG(ERROR) + message;
            result.setError(message);
        }
    }

    void enable_str(const T& argsAdapter, MethodResultJni& result)
    {
        LOG(TRACE) + "enable_str";

        JNIEnv *env = jniInit();
        if (!env) {
            LOG(FATAL) + "JNI initialization failed";
            return;
        }

        jhobject jhObject = 
            getObject(env); 

        if(argsAdapter.size() <= 0)
        {
            LOG(ERROR) + "Wrong number of arguments: 'firingInterval' must be set ^^^";
            result.setArgError("Wrong number of arguments: 'firingInterval' must be set");
            return;
        }
        jholder< jint > jhfiringInterval = 
            rho_cast< jint >(env, argsAdapter[0]);

        jhobject jhTask = env->NewObject(s_clsenable_strTask, s_midenable_strTask,
                    jhObject.get(), 
                    jhfiringInterval.get(),
                    static_cast<jobject>(result));

        run(env, jhTask.get(), result, rho::apiGenerator::NOT_FORCE_THREAD);
        if(env->ExceptionCheck() == JNI_TRUE)
        {
            rho::String message = rho::common::clearException(env);
            LOG(ERROR) + message;
            result.setError(message);
        }
    }

    void enable_bool(const T& argsAdapter, MethodResultJni& result)
    {
        LOG(TRACE) + "enable_bool";

        JNIEnv *env = jniInit();
        if (!env) {
            LOG(FATAL) + "JNI initialization failed";
            return;
        }

        jhobject jhObject = 
            getObject(env); 

        if(argsAdapter.size() <= 0)
        {
            LOG(ERROR) + "Wrong number of arguments: 'firingInterval' must be set ^^^";
            result.setArgError("Wrong number of arguments: 'firingInterval' must be set");
            return;
        }
        jholder< jint > jhfiringInterval = 
            rho_cast< jint >(env, argsAdapter[0]);

        jhobject jhTask = env->NewObject(s_clsenable_boolTask, s_midenable_boolTask,
                    jhObject.get(), 
                    jhfiringInterval.get(),
                    static_cast<jobject>(result));

        run(env, jhTask.get(), result, rho::apiGenerator::NOT_FORCE_THREAD);
        if(env->ExceptionCheck() == JNI_TRUE)
        {
            rho::String message = rho::common::clearException(env);
            LOG(ERROR) + message;
            result.setError(message);
        }
    }

    void enable_double(const T& argsAdapter, MethodResultJni& result)
    {
        LOG(TRACE) + "enable_double";

        JNIEnv *env = jniInit();
        if (!env) {
            LOG(FATAL) + "JNI initialization failed";
            return;
        }

        jhobject jhObject = 
            getObject(env); 

        if(argsAdapter.size() <= 0)
        {
            LOG(ERROR) + "Wrong number of arguments: 'firingInterval' must be set ^^^";
            result.setArgError("Wrong number of arguments: 'firingInterval' must be set");
            return;
        }
        jholder< jint > jhfiringInterval = 
            rho_cast< jint >(env, argsAdapter[0]);

        jhobject jhTask = env->NewObject(s_clsenable_doubleTask, s_midenable_doubleTask,
                    jhObject.get(), 
                    jhfiringInterval.get(),
                    static_cast<jobject>(result));

        run(env, jhTask.get(), result, rho::apiGenerator::NOT_FORCE_THREAD);
        if(env->ExceptionCheck() == JNI_TRUE)
        {
            rho::String message = rho::common::clearException(env);
            LOG(ERROR) + message;
            result.setError(message);
        }
    }

    void stop(const T& argsAdapter, MethodResultJni& result)
    {
        LOG(TRACE) + "stop";

        JNIEnv *env = jniInit();
        if (!env) {
            LOG(FATAL) + "JNI initialization failed";
            return;
        }

        jhobject jhObject = 
            getObject(env); 

        jhobject jhTask = env->NewObject(s_clsstopTask, s_midstopTask,
                    jhObject.get(), 
                    static_cast<jobject>(result));

        run(env, jhTask.get(), result, rho::apiGenerator::NOT_FORCE_THREAD);
        if(env->ExceptionCheck() == JNI_TRUE)
        {
            rho::String message = rho::common::clearException(env);
            LOG(ERROR) + message;
            result.setError(message);
        }
    }

    void getProperty(const T& argsAdapter, MethodResultJni& result)
    {
        LOG(TRACE) + "getProperty";

        JNIEnv *env = jniInit();
        if (!env) {
            LOG(FATAL) + "JNI initialization failed";
            return;
        }

        jhobject jhObject = 
            getObject(env); 

        if(argsAdapter.size() <= 0)
        {
            LOG(ERROR) + "Wrong number of arguments: 'propertyName' must be set ^^^";
            result.setArgError("Wrong number of arguments: 'propertyName' must be set");
            return;
        }
        jholder< jstring > jhpropertyName = 
            rho_cast< jstring >(env, argsAdapter[0]);

        jhobject jhTask = env->NewObject(s_clsgetPropertyTask, s_midgetPropertyTask,
                    jhObject.get(), 
                    jhpropertyName.get(),
                    static_cast<jobject>(result));

        run(env, jhTask.get(), result, rho::apiGenerator::NOT_FORCE_THREAD);
        if(env->ExceptionCheck() == JNI_TRUE)
        {
            rho::String message = rho::common::clearException(env);
            LOG(ERROR) + message;
            result.setError(message);
        }
    }

    void getProperties(const T& argsAdapter, MethodResultJni& result)
    {
        LOG(TRACE) + "getProperties";

        JNIEnv *env = jniInit();
        if (!env) {
            LOG(FATAL) + "JNI initialization failed";
            return;
        }

        jhobject jhObject = 
            getObject(env); 

        if(argsAdapter.size() <= 0)
        {
            LOG(ERROR) + "Wrong number of arguments: 'arrayofNames' must be set ^^^";
            result.setArgError("Wrong number of arguments: 'arrayofNames' must be set");
            return;
        }
        jholder< jobject > jharrayofNames = 
            rho_cast< jobject >(env, argsAdapter[0]);

        jhobject jhTask = env->NewObject(s_clsgetPropertiesTask, s_midgetPropertiesTask,
                    jhObject.get(), 
                    jharrayofNames.get(),
                    static_cast<jobject>(result));

        run(env, jhTask.get(), result, rho::apiGenerator::NOT_FORCE_THREAD);
        if(env->ExceptionCheck() == JNI_TRUE)
        {
            rho::String message = rho::common::clearException(env);
            LOG(ERROR) + message;
            result.setError(message);
        }
    }

    void getAllProperties(const T& argsAdapter, MethodResultJni& result)
    {
        LOG(TRACE) + "getAllProperties";

        JNIEnv *env = jniInit();
        if (!env) {
            LOG(FATAL) + "JNI initialization failed";
            return;
        }

        jhobject jhObject = 
            getObject(env); 

        jhobject jhTask = env->NewObject(s_clsgetAllPropertiesTask, s_midgetAllPropertiesTask,
                    jhObject.get(), 
                    static_cast<jobject>(result));

        run(env, jhTask.get(), result, rho::apiGenerator::NOT_FORCE_THREAD);
        if(env->ExceptionCheck() == JNI_TRUE)
        {
            rho::String message = rho::common::clearException(env);
            LOG(ERROR) + message;
            result.setError(message);
        }
    }

    void setProperty(const T& argsAdapter, MethodResultJni& result)
    {
        LOG(TRACE) + "setProperty";

        JNIEnv *env = jniInit();
        if (!env) {
            LOG(FATAL) + "JNI initialization failed";
            return;
        }

        jhobject jhObject = 
            getObject(env); 

        if(argsAdapter.size() <= 0)
        {
            LOG(ERROR) + "Wrong number of arguments: 'propertyName' must be set ^^^";
            result.setArgError("Wrong number of arguments: 'propertyName' must be set");
            return;
        }
        jholder< jstring > jhpropertyName = 
            rho_cast< jstring >(env, argsAdapter[0]);

        if(argsAdapter.size() <= 1)
        {
            LOG(ERROR) + "Wrong number of arguments: 'propertyValue' must be set ^^^";
            result.setArgError("Wrong number of arguments: 'propertyValue' must be set");
            return;
        }
        jholder< jstring > jhpropertyValue = 
            rho_cast< jstring >(env, argsAdapter[1]);

        jhobject jhTask = env->NewObject(s_clssetPropertyTask, s_midsetPropertyTask,
                    jhObject.get(), 
                    jhpropertyName.get(),
                    jhpropertyValue.get(),
                    static_cast<jobject>(result));

        run(env, jhTask.get(), result, rho::apiGenerator::NOT_FORCE_THREAD);
        if(env->ExceptionCheck() == JNI_TRUE)
        {
            rho::String message = rho::common::clearException(env);
            LOG(ERROR) + message;
            result.setError(message);
        }
    }

    void setProperties(const T& argsAdapter, MethodResultJni& result)
    {
        LOG(TRACE) + "setProperties";

        JNIEnv *env = jniInit();
        if (!env) {
            LOG(FATAL) + "JNI initialization failed";
            return;
        }

        jhobject jhObject = 
            getObject(env); 

        if(argsAdapter.size() <= 0)
        {
            LOG(ERROR) + "Wrong number of arguments: 'propertyMap' must be set ^^^";
            result.setArgError("Wrong number of arguments: 'propertyMap' must be set");
            return;
        }
        jholder< jobject > jhpropertyMap = 
            rho_cast< jobject >(env, argsAdapter[0]);

        jhobject jhTask = env->NewObject(s_clssetPropertiesTask, s_midsetPropertiesTask,
                    jhObject.get(), 
                    jhpropertyMap.get(),
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
