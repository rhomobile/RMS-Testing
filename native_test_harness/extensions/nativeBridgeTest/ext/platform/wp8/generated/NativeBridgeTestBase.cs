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

namespace NativeBridgeTestImpl
{
    abstract public class NativeBridgeTestBase : INativeBridgeTestImpl
    {
        protected long _nativeImpl = 0;
        protected NativeBridgeTestRuntimeComponent _runtime;

        public NativeBridgeTestBase()
        {
            _runtime = new NativeBridgeTestRuntimeComponent(this);
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

    }

    abstract public class NativeBridgeTestSingletonBase : INativeBridgeTestSingletonImpl
    {
        protected NativeBridgeTestSingletonComponent _runtime;

        public NativeBridgeTestSingletonBase()
        {
            _runtime = new NativeBridgeTestSingletonComponent(this);
        }

        abstract public void testBool(bool val, IMethodResult oResult);
        abstract public void testInt(int val, IMethodResult oResult);
        abstract public void testFloat(double val, IMethodResult oResult);
        abstract public void testString(string val, IMethodResult oResult);
        abstract public void testApi(IReadOnlyList<string> arrHashStr, IReadOnlyDictionary<string, string> hashHashStr, IReadOnlyDictionary<string, string> hashArrStr, IReadOnlyList<string> arrArrStr, IMethodResult oResult);
    }

    public class NativeBridgeTestFactoryBase : INativeBridgeTestFactoryImpl
    {
        public INativeBridgeTestImpl getImpl() {
            return new NativeBridgeTest();
        }
        public INativeBridgeTestSingletonImpl getSingletonImpl() {
            return new NativeBridgeTestSingleton();
        }
    }
}

}
