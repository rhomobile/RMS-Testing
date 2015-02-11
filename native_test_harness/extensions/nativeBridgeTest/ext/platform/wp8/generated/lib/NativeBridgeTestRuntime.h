#pragma once

#include "../../../../shared/generated/cpp/INativeBridgeTest.h"
#include "api_generator/wp8/IMethodResult.h"

namespace rhoruntime
{
    public interface class INativeBridgeTestImpl
    {
    public:
        int64 getNativeImpl();
        void setNativeImpl(int64 native);
    };

    public interface class INativeBridgeTestSingletonImpl
    {
    public:
        void testBool(bool val, IMethodResult^ oResult);
        void testInt(int val, IMethodResult^ oResult);
        void testFloat(double val, IMethodResult^ oResult);
        void testString(Platform::String^ val, IMethodResult^ oResult);
        void testApi(Windows::Foundation::Collections::IVectorView<Platform::String^>^ arrHashStr, Windows::Foundation::Collections::IMapView<Platform::String^, Platform::String^>^ hashHashStr, Windows::Foundation::Collections::IMapView<Platform::String^, Platform::String^>^ hashArrStr, Windows::Foundation::Collections::IVectorView<Platform::String^>^ arrArrStr, IMethodResult^ oResult);
    };
    public interface class INativeBridgeTestFactoryImpl
    {
    public:
        INativeBridgeTestImpl^ getImpl();
        INativeBridgeTestSingletonImpl^ getSingletonImpl();
    };

    public ref class NativeBridgeTestRuntimeComponent sealed
    {
    public:
        NativeBridgeTestRuntimeComponent(INativeBridgeTestImpl^ impl);
    private:
        INativeBridgeTestImpl^ _impl;
        int64 _cppImpl;
        int64 getCppImpl();
    };

    public ref class NativeBridgeTestSingletonComponent sealed: public INativeBridgeTestSingletonImpl
    {
    public:
        NativeBridgeTestSingletonComponent(INativeBridgeTestSingletonImpl^ impl);
        virtual void testBool(bool val, IMethodResult^ oResult);
        virtual void testInt(int val, IMethodResult^ oResult);
        virtual void testFloat(double val, IMethodResult^ oResult);
        virtual void testString(Platform::String^ val, IMethodResult^ oResult);
        virtual void testApi(Windows::Foundation::Collections::IVectorView<Platform::String^>^ arrHashStr, Windows::Foundation::Collections::IMapView<Platform::String^, Platform::String^>^ hashHashStr, Windows::Foundation::Collections::IMapView<Platform::String^, Platform::String^>^ hashArrStr, Windows::Foundation::Collections::IVectorView<Platform::String^>^ arrArrStr, IMethodResult^ oResult);
    private:
        INativeBridgeTestSingletonImpl^ _impl;
    };

    public ref class NativeBridgeTestFactoryComponent sealed
    {
    public:
        static void setImpl(INativeBridgeTestFactoryImpl^ impl);
    };
}
