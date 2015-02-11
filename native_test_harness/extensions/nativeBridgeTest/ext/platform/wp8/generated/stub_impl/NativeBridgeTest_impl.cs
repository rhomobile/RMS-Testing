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
    public class NativeBridgeTest : NativeBridgeTestBase
    {
        public NativeBridgeTest()
        {
            // initialize class instance in C# here
        }
    }

    public class NativeBridgeTestSingleton : NativeBridgeTestSingletonBase
    {
        public NativeBridgeTestSingleton()
        {
            // initialize singleton instance in C# here
        }

        public override void testBool(bool val, IMethodResult oResult)
        {
            // implement this method in C# here
        }

        public override void testInt(int val, IMethodResult oResult)
        {
            // implement this method in C# here
        }

        public override void testFloat(double val, IMethodResult oResult)
        {
            // implement this method in C# here
        }

        public override void testString(string val, IMethodResult oResult)
        {
            // implement this method in C# here
        }

        public override void testApi(IReadOnlyList<string> arrHashStr, IReadOnlyDictionary<string, string> hashHashStr, IReadOnlyDictionary<string, string> hashArrStr, IReadOnlyList<string> arrArrStr, IMethodResult oResult)
        {
            // implement this method in C# here
        }
    }

    public class NativeBridgeTestFactory : NativeBridgeTestFactoryBase
    {
    }
}

}
