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

namespace DummyImpl
{
    abstract public class DummyBase : IDummyImpl
    {
        protected string _strID = "1";
        protected long _nativeImpl = 0;
        protected DummyRuntimeComponent _runtime;

        public DummyBase()
        {
            _runtime = new DummyRuntimeComponent(this);
        }

        public long getNativeImpl()
        {
            return _nativeImpl;
        }

        public virtual void setNativeImpl(string strID, long native)
        {
            _strID = strID;
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

        abstract public void getSimpleStringProperty(IMethodResult oResult);
        abstract public void setSimpleStringProperty(string simpleStringProperty, IMethodResult oResult);
        abstract public void getPlatformName(IMethodResult oResult);
        abstract public void calcSumm(int a, int b, IMethodResult oResult);
        abstract public void joinStrings(string a, string b, IMethodResult oResult);
        abstract public void enable(int firingInterval, IMethodResult oResult);
        abstract public void enableString(int firingInterval, IMethodResult oResult);
        abstract public void enableInt(int firingInterval, IMethodResult oResult);
        abstract public void enableBool(int firingInterval, IMethodResult oResult);
        abstract public void enableFloat(int firingInterval, IMethodResult oResult);
        abstract public void enableArray(int firingInterval, IMethodResult oResult);
        abstract public void stop(IMethodResult oResult);
    }

    abstract public class DummySingletonBase : IDummySingletonImpl
    {
        protected DummySingletonComponent _runtime;

        public DummySingletonBase()
        {
            _runtime = new DummySingletonComponent(this);
        }

        abstract public void enumerate(IMethodResult oResult);
    }

    public class DummyFactoryBase : IDummyFactoryImpl
    {
        public virtual IDummyImpl getImpl() {
            return new Dummy();
        }
        public IDummySingletonImpl getSingletonImpl() {
            return new DummySingleton();
        }
    }
}

}
