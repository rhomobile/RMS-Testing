using System;
using System.Collections.Generic;
using System.Net;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Documents;
using System.Windows.Ink;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Animation;
using System.Windows.Shapes;
using rhoruntime;

namespace rho {

namespace GenPropBagImpl
{
    abstract public class GenPropBagBase : IGenPropBagImpl
    {
        protected long _nativeImpl = 0;
        protected GenPropBagRuntimeComponent _runtime;

        public GenPropBagBase()
        {
            _runtime = new GenPropBagRuntimeComponent(this);
        }

        public long getNativeImpl()
        {
            return _nativeImpl;
        }

        public void setNativeImpl(long native)
        {
            _nativeImpl = native;
        }

        public void DispatchInvoke(Action a)
        {
            if (Deployment.Current.Dispatcher != null)
                Deployment.Current.Dispatcher.BeginInvoke(a);
            else
                a();
        }

        public void getProperty(string propertyName, IMethodResult oResult)
        {
            _runtime.getProperty(propertyName, oResult);
        }

        public void getProperties(IReadOnlyList<string> arrayofNames, IMethodResult oResult)
        {
            _runtime.getProperties(arrayofNames, oResult);
        }

        public void getAllProperties(IMethodResult oResult)
        {
            _runtime.getAllProperties(oResult);
        }

        public void setProperty(string propertyName, string propertyValue, IMethodResult oResult)
        {
            _runtime.setProperty(propertyName, propertyValue, oResult);
        }

        public void setProperties(IReadOnlyDictionary<string, string> propertyMap, IMethodResult oResult)
        {
            _runtime.setProperties(propertyMap, oResult);
        }

        abstract public void getBoolProp(IMethodResult oResult);
        abstract public void setBoolProp(bool boolProp, IMethodResult oResult);
        abstract public void getIntProp(IMethodResult oResult);
        abstract public void setIntProp(int intProp, IMethodResult oResult);
        abstract public void getFloatProp(IMethodResult oResult);
        abstract public void setFloatProp(double floatProp, IMethodResult oResult);
        abstract public void getStringProp(IMethodResult oResult);
        abstract public void setStringProp(string stringProp, IMethodResult oResult);
    }

    abstract public class GenPropBagSingletonBase : IGenPropBagSingletonImpl
    {
        protected GenPropBagSingletonComponent _runtime;

        public GenPropBagSingletonBase()
        {
            _runtime = new GenPropBagSingletonComponent(this);
        }

        abstract public void enumerate(IMethodResult oResult);
    }

    public class GenPropBagFactoryBase : IGenPropBagFactoryImpl
    {
        public IGenPropBagImpl getImpl() {
            return new GenPropBag();
        }
        public IGenPropBagSingletonImpl getSingletonImpl() {
            return new GenPropBagSingleton();
        }
    }
}

}
