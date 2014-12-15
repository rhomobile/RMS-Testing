#pragma once

#include "../../../../shared/generated/cpp/INativeBridgeTest.h"
#include "api_generator/wp8/IMethodResult.h"

namespace rhoruntime
{
    public interface class INativeBridgeTestImpl
    {
    };

    public interface class INativeBridgeTestSingletonImpl
    {
    public:
        void testBool(bool val, IMethodResult^ oResult);
        void testInt(int val, IMethodResult^ oResult);
        void testFloat(double val, IMethodResult^ oResult);
        void testString(Platform::String^ val, IMethodResult^ oResult);
    };
    public interface class INativeBridgeTestFactoryImpl
    {
    public:
        INativeBridgeTestImpl^ getImpl();
        INativeBridgeTestSingletonImpl^ getSingletonImpl();
    };

    public ref class NativeBridgeTestRuntimeComponent sealed: public INativeBridgeTestImpl
    {
    public:
        NativeBridgeTestRuntimeComponent(INativeBridgeTestImpl^ impl);
    private:
        INativeBridgeTestImpl^ _impl;
    };

    public ref class NativeBridgeTestSingletonComponent sealed: public INativeBridgeTestSingletonImpl
    {
    public:
        NativeBridgeTestSingletonComponent(INativeBridgeTestSingletonImpl^ impl);
        virtual void testBool(bool val, IMethodResult^ oResult);
        virtual void testInt(int val, IMethodResult^ oResult);
        virtual void testFloat(double val, IMethodResult^ oResult);
        virtual void testString(Platform::String^ val, IMethodResult^ oResult);
    private:
        INativeBridgeTestSingletonImpl^ _impl;
    };

    public ref class NativeBridgeTestFactoryComponent sealed
    {
    public:
        static void setImpl(INativeBridgeTestFactoryImpl^ impl);
    };
}
