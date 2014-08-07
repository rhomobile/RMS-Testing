#pragma once

#include "../../../../shared/generated/cpp/IGenPropBag.h"
#include "api_generator/wp8/IMethodResult.h"

namespace rhoruntime
{
    public interface class IGenPropBagImpl
    {
    public:
        void getBoolProp(IMethodResult^ oResult);
        void setBoolProp(bool boolProp, IMethodResult^ oResult);
        void getIntProp(IMethodResult^ oResult);
        void setIntProp(int intProp, IMethodResult^ oResult);
        void getFloatProp(IMethodResult^ oResult);
        void setFloatProp(double floatProp, IMethodResult^ oResult);
        void getStringProp(IMethodResult^ oResult);
        void setStringProp(Platform::String^ stringProp, IMethodResult^ oResult);
        void getProperty(Platform::String^ propertyName, IMethodResult^ oResult);
        void getProperties(Windows::Foundation::Collections::IVectorView<Platform::String^>^ arrayofNames, IMethodResult^ oResult);
        void getAllProperties(IMethodResult^ oResult);
        void setProperty(Platform::String^ propertyName, Platform::String^ propertyValue, IMethodResult^ oResult);
        void setProperties(Windows::Foundation::Collections::IMapView<Platform::String^, Platform::String^>^ propertyMap, IMethodResult^ oResult);
    };

    public interface class IGenPropBagSingletonImpl
    {
    public:
        void enumerate(IMethodResult^ oResult);
    };
    public interface class IGenPropBagFactoryImpl
    {
    public:
        IGenPropBagImpl^ getImpl();
        IGenPropBagSingletonImpl^ getSingletonImpl();
    };

    public ref class GenPropBagRuntimeComponent sealed: public IGenPropBagImpl
    {
    public:
        GenPropBagRuntimeComponent(IGenPropBagImpl^ impl);
        virtual void getBoolProp(IMethodResult^ oResult);
        virtual void setBoolProp(bool boolProp, IMethodResult^ oResult);
        virtual void getIntProp(IMethodResult^ oResult);
        virtual void setIntProp(int intProp, IMethodResult^ oResult);
        virtual void getFloatProp(IMethodResult^ oResult);
        virtual void setFloatProp(double floatProp, IMethodResult^ oResult);
        virtual void getStringProp(IMethodResult^ oResult);
        virtual void setStringProp(Platform::String^ stringProp, IMethodResult^ oResult);
        virtual void getProperty(Platform::String^ propertyName, IMethodResult^ oResult);
        virtual void getProperties(Windows::Foundation::Collections::IVectorView<Platform::String^>^ arrayofNames, IMethodResult^ oResult);
        virtual void getAllProperties(IMethodResult^ oResult);
        virtual void setProperty(Platform::String^ propertyName, Platform::String^ propertyValue, IMethodResult^ oResult);
        virtual void setProperties(Windows::Foundation::Collections::IMapView<Platform::String^, Platform::String^>^ propertyMap, IMethodResult^ oResult);
    private:
        IGenPropBagImpl^ _impl;
    };

    public ref class GenPropBagSingletonComponent sealed: public IGenPropBagSingletonImpl
    {
    public:
        GenPropBagSingletonComponent(IGenPropBagSingletonImpl^ impl);
        virtual void enumerate(IMethodResult^ oResult);
    private:
        IGenPropBagSingletonImpl^ _impl;
    };

    public ref class GenPropBagFactoryComponent sealed
    {
    public:
        static void setImpl(IGenPropBagFactoryImpl^ impl);
    };
}
