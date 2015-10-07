#pragma once

#include "../../../../shared/generated/cpp/IDummy.h"
#include "api_generator/wp8/IMethodResult.h"

namespace rhoruntime
{
    public interface class IDummyImpl
    {
    public:
        int64 getNativeImpl();
        void setNativeImpl(Platform::String^ strID, int64 native);


        void getSimpleStringProperty(IMethodResult^ oResult);
        void setSimpleStringProperty(Platform::String^ simpleStringProperty, IMethodResult^ oResult);
        void getPlatformName(IMethodResult^ oResult);
        void calcSumm(int a, int b, IMethodResult^ oResult);
        void joinStrings(Platform::String^ a, Platform::String^ b, IMethodResult^ oResult);
        void enable(int firingInterval, IMethodResult^ oResult);
        void enableString(int firingInterval, IMethodResult^ oResult);
        void enableInt(int firingInterval, IMethodResult^ oResult);
        void enableBool(int firingInterval, IMethodResult^ oResult);
        void enableFloat(int firingInterval, IMethodResult^ oResult);
        void enableArray(int firingInterval, IMethodResult^ oResult);
        void stop(IMethodResult^ oResult);
        void getProperty(Platform::String^ propertyName, IMethodResult^ oResult);
        void getProperties(Windows::Foundation::Collections::IVectorView<Platform::String^>^ arrayofNames, IMethodResult^ oResult);
        void getAllProperties(IMethodResult^ oResult);
        void setProperty(Platform::String^ propertyName, Platform::String^ propertyValue, IMethodResult^ oResult);
        void setProperties(Windows::Foundation::Collections::IMapView<Platform::String^, Platform::String^>^ propertyMap, IMethodResult^ oResult);
    };

    public interface class IDummySingletonImpl
    {
    public:
        void enumerate(IMethodResult^ oResult);
    };
    public interface class IDummyFactoryImpl
    {
    public:
        IDummyImpl^ getImpl();
        IDummySingletonImpl^ getSingletonImpl();
    };

    public ref class DummyRuntimeComponent sealed
    {
    public:
        DummyRuntimeComponent(IDummyImpl^ impl);
        void getProperty(Platform::String^ propertyName, IMethodResult^ oResult);
        void getProperties(Windows::Foundation::Collections::IVectorView<Platform::String^>^ arrayofNames, IMethodResult^ oResult);
        void getAllProperties(IMethodResult^ oResult);
        void setProperty(Platform::String^ propertyName, Platform::String^ propertyValue, IMethodResult^ oResult);
        void setProperties(Windows::Foundation::Collections::IMapView<Platform::String^, Platform::String^>^ propertyMap, IMethodResult^ oResult);
    private:
        IDummyImpl^ _impl;
        int64 _cppImpl;
        int64 getCppImpl();
    };

    public ref class DummySingletonComponent sealed: public IDummySingletonImpl
    {
    public:
        DummySingletonComponent(IDummySingletonImpl^ impl);
        virtual void enumerate(IMethodResult^ oResult);
    private:
        IDummySingletonImpl^ _impl;
    };

    public ref class DummyFactoryComponent sealed
    {
    public:
        static void setImpl(IDummyFactoryImpl^ impl);
    };
}
