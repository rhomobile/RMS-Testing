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
    public class GenPropBag : IGenPropBagImpl
    {
        public GenPropBag()
        {
            GenPropBagRuntimeComponent _runtime = new GenPropBagRuntimeComponent(this);
        }

        public void getBoolProp(IMethodResult oResult)
        {
            // implement this method in C# here
        }

        public void setBoolProp(bool boolProp, IMethodResult oResult)
        {
            // implement this method in C# here
        }

        public void getIntProp(IMethodResult oResult)
        {
            // implement this method in C# here
        }

        public void setIntProp(int intProp, IMethodResult oResult)
        {
            // implement this method in C# here
        }

        public void getFloatProp(IMethodResult oResult)
        {
            // implement this method in C# here
        }

        public void setFloatProp(double floatProp, IMethodResult oResult)
        {
            // implement this method in C# here
        }

        public void getStringProp(IMethodResult oResult)
        {
            // implement this method in C# here
        }

        public void setStringProp(string stringProp, IMethodResult oResult)
        {
            // implement this method in C# here
        }

        public void getProperty(string propertyName, IMethodResult oResult)
        {
            // implement this method in C# here
        }

        public void getProperties(IReadOnlyList<string> arrayofNames, IMethodResult oResult)
        {
            // implement this method in C# here
        }

        public void getAllProperties(IMethodResult oResult)
        {
            // implement this method in C# here
        }

        public void setProperty(string propertyName, string propertyValue, IMethodResult oResult)
        {
            // implement this method in C# here
        }

        public void setProperties(IReadOnlyDictionary<string, string> propertyMap, IMethodResult oResult)
        {
            // implement this method in C# here
        }
    }

    public class GenPropBagSingleton : IGenPropBagSingletonImpl
    {
        public GenPropBagSingleton()
        {
            GenPropBagSingletonComponent _runtime = new GenPropBagSingletonComponent(this);
        }

        public void enumerate(IMethodResult oResult)
        {
            // implement this method in C# here
        }
    }

    public class GenPropBagFactory : IGenPropBagFactoryImpl
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
