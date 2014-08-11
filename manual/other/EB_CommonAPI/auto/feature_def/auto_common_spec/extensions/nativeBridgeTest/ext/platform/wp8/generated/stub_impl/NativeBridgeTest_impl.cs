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
    public class NativeBridgeTest : INativeBridgeTestImpl
    {
        public NativeBridgeTest()
        {
            NativeBridgeTestRuntimeComponent _runtime = new NativeBridgeTestRuntimeComponent(this);
        }
    }

    public class NativeBridgeTestSingleton : INativeBridgeTestSingletonImpl
    {
        public NativeBridgeTestSingleton()
        {
            NativeBridgeTestSingletonComponent _runtime = new NativeBridgeTestSingletonComponent(this);
        }

        public void testBool(bool val, IMethodResult oResult)
        {
            // implement this method in C# here
        }

        public void testInt(int val, IMethodResult oResult)
        {
            // implement this method in C# here
        }

        public void testFloat(double val, IMethodResult oResult)
        {
            // implement this method in C# here
        }

        public void testString(string val, IMethodResult oResult)
        {
            // implement this method in C# here
        }
    }

    public class NativeBridgeTestFactory : INativeBridgeTestFactoryImpl
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
