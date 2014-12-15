#pragma once

#include "common/RhoStd.h"
#include "logging/RhoLog.h"
#include "rhodes/JNIRhodes.h"
#include "MethodExecutorJni.h"
#include "MethodResultJni.h"


namespace rho {

using rho::apiGenerator::MethodResultJni;
using rho::apiGenerator::MethodExecutorJni;

class CGenPropBagBase : public MethodExecutorJni
{
protected:
    DEFINE_LOGCLASS;

    static const char* const FACTORY_SINGLETON_CLASS;
    static jclass s_clsFactorySingleton;
    static jmethodID s_midFactorySetInstance;
    static jmethodID s_midFactoryGetInstance;

    //IGenPropBagFactory staff
    static const char* const IFACTORY_CLASS;
    static jclass s_clsIFactory;
    static jmethodID s_midGetApiSingleton;
    static jmethodID s_midGetApiObject;

    //GenPropBagSingletonBase staff
    static const char* const SINGLETON_BASE_CLASS;
    static jclass s_clsSingletonBase;

    //GenPropBagBase staff
    static const char* const OBJECT_BASE_CLASS;
    static jclass s_clsObjectBase;

    //Method tasks

    static const char* const GETBOOLPROP_TASK_CLASS;
    static jclass s_clsgetBoolPropTask;
    static jmethodID s_midgetBoolPropTask;
    static const char* const SETBOOLPROP_TASK_CLASS;
    static jclass s_clssetBoolPropTask;
    static jmethodID s_midsetBoolPropTask;
    static const char* const GETINTPROP_TASK_CLASS;
    static jclass s_clsgetIntPropTask;
    static jmethodID s_midgetIntPropTask;
    static const char* const SETINTPROP_TASK_CLASS;
    static jclass s_clssetIntPropTask;
    static jmethodID s_midsetIntPropTask;
    static const char* const GETFLOATPROP_TASK_CLASS;
    static jclass s_clsgetFloatPropTask;
    static jmethodID s_midgetFloatPropTask;
    static const char* const SETFLOATPROP_TASK_CLASS;
    static jclass s_clssetFloatPropTask;
    static jmethodID s_midsetFloatPropTask;
    static const char* const GETSTRINGPROP_TASK_CLASS;
    static jclass s_clsgetStringPropTask;
    static jmethodID s_midgetStringPropTask;
    static const char* const SETSTRINGPROP_TASK_CLASS;
    static jclass s_clssetStringPropTask;
    static jmethodID s_midsetStringPropTask;
    static const char* const ENUMERATE_TASK_CLASS;
    static jclass s_clsenumerateTask;
    static jmethodID s_midenumerateTask;
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

    CGenPropBagBase(const rho::String& id)
        : MethodExecutorJni(), m_id(id)
        {}
    virtual ~CGenPropBagBase() {}
};

template <typename T>
class CGenPropBagProxy : public CGenPropBagBase
{
public:
    CGenPropBagProxy(const rho::String& id)
        : CGenPropBagBase(id)
        {}
    virtual ~CGenPropBagProxy() {}

    void getBoolProp(const T& argsAdapter, MethodResultJni& result)
    {
        LOG(TRACE) + "getBoolProp";

        JNIEnv *env = jniInit();
        if (!env) {
            LOG(FATAL) + "JNI initialization failed";
            return;
        }

        jhobject jhObject = 
            getObject(env); 

        jhobject jhTask = env->NewObject(s_clsgetBoolPropTask, s_midgetBoolPropTask,
                    jhObject.get(), 
                    static_cast<jobject>(result));

        run(env, jhTask.get(), result, apiGenerator::NOT_FORCE_THREAD);
        if(env->ExceptionCheck() == JNI_TRUE)
        {
            rho::String message = rho::common::clearException(env);
            LOG(ERROR) + message;
            result.setError(message);
        }
    }

    void setBoolProp(const T& argsAdapter, MethodResultJni& result)
    {
        LOG(TRACE) + "setBoolProp";

        JNIEnv *env = jniInit();
        if (!env) {
            LOG(FATAL) + "JNI initialization failed";
            return;
        }

        jhobject jhObject = 
            getObject(env); 

        if(argsAdapter.size() <= 0)
        {
            LOG(ERROR) + "Wrong number of arguments: 'boolProp' must be set ^^^";
            result.setArgError("Wrong number of arguments: 'boolProp' must be set");
            return;
        }
        jholder< jboolean > jhboolProp = 
            rho_cast< jboolean >(env, argsAdapter[0]);

        jhobject jhTask = env->NewObject(s_clssetBoolPropTask, s_midsetBoolPropTask,
                    jhObject.get(), 
                    jhboolProp.get(),
                    static_cast<jobject>(result));

        run(env, jhTask.get(), result, apiGenerator::NOT_FORCE_THREAD);
        if(env->ExceptionCheck() == JNI_TRUE)
        {
            rho::String message = rho::common::clearException(env);
            LOG(ERROR) + message;
            result.setError(message);
        }
    }

    void getIntProp(const T& argsAdapter, MethodResultJni& result)
    {
        LOG(TRACE) + "getIntProp";

        JNIEnv *env = jniInit();
        if (!env) {
            LOG(FATAL) + "JNI initialization failed";
            return;
        }

        jhobject jhObject = 
            getObject(env); 

        jhobject jhTask = env->NewObject(s_clsgetIntPropTask, s_midgetIntPropTask,
                    jhObject.get(), 
                    static_cast<jobject>(result));

        run(env, jhTask.get(), result, apiGenerator::NOT_FORCE_THREAD);
        if(env->ExceptionCheck() == JNI_TRUE)
        {
            rho::String message = rho::common::clearException(env);
            LOG(ERROR) + message;
            result.setError(message);
        }
    }

    void setIntProp(const T& argsAdapter, MethodResultJni& result)
    {
        LOG(TRACE) + "setIntProp";

        JNIEnv *env = jniInit();
        if (!env) {
            LOG(FATAL) + "JNI initialization failed";
            return;
        }

        jhobject jhObject = 
            getObject(env); 

        if(argsAdapter.size() <= 0)
        {
            LOG(ERROR) + "Wrong number of arguments: 'intProp' must be set ^^^";
            result.setArgError("Wrong number of arguments: 'intProp' must be set");
            return;
        }
        jholder< jint > jhintProp = 
            rho_cast< jint >(env, argsAdapter[0]);

        jhobject jhTask = env->NewObject(s_clssetIntPropTask, s_midsetIntPropTask,
                    jhObject.get(), 
                    jhintProp.get(),
                    static_cast<jobject>(result));

        run(env, jhTask.get(), result, apiGenerator::NOT_FORCE_THREAD);
        if(env->ExceptionCheck() == JNI_TRUE)
        {
            rho::String message = rho::common::clearException(env);
            LOG(ERROR) + message;
            result.setError(message);
        }
    }

    void getFloatProp(const T& argsAdapter, MethodResultJni& result)
    {
        LOG(TRACE) + "getFloatProp";

        JNIEnv *env = jniInit();
        if (!env) {
            LOG(FATAL) + "JNI initialization failed";
            return;
        }

        jhobject jhObject = 
            getObject(env); 

        jhobject jhTask = env->NewObject(s_clsgetFloatPropTask, s_midgetFloatPropTask,
                    jhObject.get(), 
                    static_cast<jobject>(result));

        run(env, jhTask.get(), result, apiGenerator::NOT_FORCE_THREAD);
        if(env->ExceptionCheck() == JNI_TRUE)
        {
            rho::String message = rho::common::clearException(env);
            LOG(ERROR) + message;
            result.setError(message);
        }
    }

    void setFloatProp(const T& argsAdapter, MethodResultJni& result)
    {
        LOG(TRACE) + "setFloatProp";

        JNIEnv *env = jniInit();
        if (!env) {
            LOG(FATAL) + "JNI initialization failed";
            return;
        }

        jhobject jhObject = 
            getObject(env); 

        if(argsAdapter.size() <= 0)
        {
            LOG(ERROR) + "Wrong number of arguments: 'floatProp' must be set ^^^";
            result.setArgError("Wrong number of arguments: 'floatProp' must be set");
            return;
        }
        jholder< jdouble > jhfloatProp = 
            rho_cast< jdouble >(env, argsAdapter[0]);

        jhobject jhTask = env->NewObject(s_clssetFloatPropTask, s_midsetFloatPropTask,
                    jhObject.get(), 
                    jhfloatProp.get(),
                    static_cast<jobject>(result));

        run(env, jhTask.get(), result, apiGenerator::NOT_FORCE_THREAD);
        if(env->ExceptionCheck() == JNI_TRUE)
        {
            rho::String message = rho::common::clearException(env);
            LOG(ERROR) + message;
            result.setError(message);
        }
    }

    void getStringProp(const T& argsAdapter, MethodResultJni& result)
    {
        LOG(TRACE) + "getStringProp";

        JNIEnv *env = jniInit();
        if (!env) {
            LOG(FATAL) + "JNI initialization failed";
            return;
        }

        jhobject jhObject = 
            getObject(env); 

        jhobject jhTask = env->NewObject(s_clsgetStringPropTask, s_midgetStringPropTask,
                    jhObject.get(), 
                    static_cast<jobject>(result));

        run(env, jhTask.get(), result, apiGenerator::NOT_FORCE_THREAD);
        if(env->ExceptionCheck() == JNI_TRUE)
        {
            rho::String message = rho::common::clearException(env);
            LOG(ERROR) + message;
            result.setError(message);
        }
    }

    void setStringProp(const T& argsAdapter, MethodResultJni& result)
    {
        LOG(TRACE) + "setStringProp";

        JNIEnv *env = jniInit();
        if (!env) {
            LOG(FATAL) + "JNI initialization failed";
            return;
        }

        jhobject jhObject = 
            getObject(env); 

        if(argsAdapter.size() <= 0)
        {
            LOG(ERROR) + "Wrong number of arguments: 'stringProp' must be set ^^^";
            result.setArgError("Wrong number of arguments: 'stringProp' must be set");
            return;
        }
        jholder< jstring > jhstringProp = 
            rho_cast< jstring >(env, argsAdapter[0]);

        jhobject jhTask = env->NewObject(s_clssetStringPropTask, s_midsetStringPropTask,
                    jhObject.get(), 
                    jhstringProp.get(),
                    static_cast<jobject>(result));

        run(env, jhTask.get(), result, apiGenerator::NOT_FORCE_THREAD);
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

        run(env, jhTask.get(), result, apiGenerator::NOT_FORCE_THREAD);
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

        run(env, jhTask.get(), result, apiGenerator::NOT_FORCE_THREAD);
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

        run(env, jhTask.get(), result, apiGenerator::NOT_FORCE_THREAD);
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

        run(env, jhTask.get(), result, apiGenerator::NOT_FORCE_THREAD);
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

        run(env, jhTask.get(), result, apiGenerator::NOT_FORCE_THREAD);
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

        run(env, jhTask.get(), result, apiGenerator::NOT_FORCE_THREAD);
        if(env->ExceptionCheck() == JNI_TRUE)
        {
            rho::String message = rho::common::clearException(env);
            LOG(ERROR) + message;
            result.setError(message);
        }
    }


};


}
