package com.rho.genpropbag;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.rhomobile.rhodes.api.IMethodResult;
import com.rhomobile.rhodes.api.RhoApiObject;

import com.rhomobile.rhodes.api.RhoApiPropertyBag; 

public class GenPropBagBase extends RhoApiObject {

    private RhoApiPropertyBag mPropertyBag;
    public Map<String, String> getPropertiesMap() {
        return mPropertyBag.getPropertiesMap();
    }
    public GenPropBagBase(String id) {
        super(id);

        mPropertyBag = new RhoApiPropertyBag();
    }

    public void getBoolProp(IMethodResult result) {
                    
        result.forceBooleanType(); 
        getProperty("boolProp", result);
    }

    public static class getBoolPropTask implements Runnable {
        private IGenPropBag mApiObject; 
        private IMethodResult mResult;

        public getBoolPropTask(IGenPropBag obj, 
                IMethodResult result) {
            this.mApiObject = obj; 
            this.mResult = result;
        }

        @Override
        public void run() {
            try {
                mApiObject.getBoolProp(mResult);
            } catch (Throwable ex) {
                mResult.set(ex);
            }
        }
    }

    public void setBoolProp(boolean boolProp, IMethodResult result) {
                    
        setProperty("boolProp", String.valueOf(boolProp), result);
    }

    public static class setBoolPropTask implements Runnable {
        private IGenPropBag mApiObject; 
        private boolean boolProp;
        private IMethodResult mResult;

        public setBoolPropTask(IGenPropBag obj, 
                boolean boolProp, 
                IMethodResult result) {
            this.mApiObject = obj; 
            this.boolProp = boolProp;
            this.mResult = result;
        }

        @Override
        public void run() {
            try {
                mApiObject.setBoolProp(
                    boolProp, mResult);
            } catch (Throwable ex) {
                mResult.set(ex);
            }
        }
    }

    public void getIntProp(IMethodResult result) {
                    
        result.forceIntegerType(); 
        getProperty("intProp", result);
    }

    public static class getIntPropTask implements Runnable {
        private IGenPropBag mApiObject; 
        private IMethodResult mResult;

        public getIntPropTask(IGenPropBag obj, 
                IMethodResult result) {
            this.mApiObject = obj; 
            this.mResult = result;
        }

        @Override
        public void run() {
            try {
                mApiObject.getIntProp(mResult);
            } catch (Throwable ex) {
                mResult.set(ex);
            }
        }
    }

    public void setIntProp(int intProp, IMethodResult result) {
                    
        setProperty("intProp", String.valueOf(intProp), result);
    }

    public static class setIntPropTask implements Runnable {
        private IGenPropBag mApiObject; 
        private int intProp;
        private IMethodResult mResult;

        public setIntPropTask(IGenPropBag obj, 
                int intProp, 
                IMethodResult result) {
            this.mApiObject = obj; 
            this.intProp = intProp;
            this.mResult = result;
        }

        @Override
        public void run() {
            try {
                mApiObject.setIntProp(
                    intProp, mResult);
            } catch (Throwable ex) {
                mResult.set(ex);
            }
        }
    }

    public void getFloatProp(IMethodResult result) {
                    
        result.forceDoubleType(); 
        getProperty("floatProp", result);
    }

    public static class getFloatPropTask implements Runnable {
        private IGenPropBag mApiObject; 
        private IMethodResult mResult;

        public getFloatPropTask(IGenPropBag obj, 
                IMethodResult result) {
            this.mApiObject = obj; 
            this.mResult = result;
        }

        @Override
        public void run() {
            try {
                mApiObject.getFloatProp(mResult);
            } catch (Throwable ex) {
                mResult.set(ex);
            }
        }
    }

    public void setFloatProp(double floatProp, IMethodResult result) {
                    
        setProperty("floatProp", String.valueOf(floatProp), result);
    }

    public static class setFloatPropTask implements Runnable {
        private IGenPropBag mApiObject; 
        private double floatProp;
        private IMethodResult mResult;

        public setFloatPropTask(IGenPropBag obj, 
                double floatProp, 
                IMethodResult result) {
            this.mApiObject = obj; 
            this.floatProp = floatProp;
            this.mResult = result;
        }

        @Override
        public void run() {
            try {
                mApiObject.setFloatProp(
                    floatProp, mResult);
            } catch (Throwable ex) {
                mResult.set(ex);
            }
        }
    }

    public void getStringProp(IMethodResult result) {
                     
        getProperty("stringProp", result);
    }

    public static class getStringPropTask implements Runnable {
        private IGenPropBag mApiObject; 
        private IMethodResult mResult;

        public getStringPropTask(IGenPropBag obj, 
                IMethodResult result) {
            this.mApiObject = obj; 
            this.mResult = result;
        }

        @Override
        public void run() {
            try {
                mApiObject.getStringProp(mResult);
            } catch (Throwable ex) {
                mResult.set(ex);
            }
        }
    }

    public void setStringProp(String stringProp, IMethodResult result) {
                    
        setProperty("stringProp", String.valueOf(stringProp), result);
    }

    public static class setStringPropTask implements Runnable {
        private IGenPropBag mApiObject; 
        private String stringProp;
        private IMethodResult mResult;

        public setStringPropTask(IGenPropBag obj, 
                String stringProp, 
                IMethodResult result) {
            this.mApiObject = obj; 
            this.stringProp = stringProp;
            this.mResult = result;
        }

        @Override
        public void run() {
            try {
                mApiObject.setStringProp(
                    stringProp, mResult);
            } catch (Throwable ex) {
                mResult.set(ex);
            }
        }
    }

    public void getProperty(String propertyName, IMethodResult result) { 
        mPropertyBag.getProperty(propertyName, result);
    }

    public static class getPropertyTask implements Runnable {
        private IGenPropBag mApiObject; 
        private String propertyName;
        private IMethodResult mResult;

        public getPropertyTask(IGenPropBag obj, 
                String propertyName, 
                IMethodResult result) {
            this.mApiObject = obj; 
            this.propertyName = propertyName;
            this.mResult = result;
        }

        @Override
        public void run() {
            try {
                mApiObject.getProperty(
                    propertyName, mResult);
            } catch (Throwable ex) {
                mResult.set(ex);
            }
        }
    }

    public void getProperties(List<String> arrayofNames, IMethodResult result) { 
        mPropertyBag.getProperties(arrayofNames, result);
    }

    public static class getPropertiesTask implements Runnable {
        private IGenPropBag mApiObject; 
        private List<String> arrayofNames;
        private IMethodResult mResult;

        public getPropertiesTask(IGenPropBag obj, 
                List<String> arrayofNames, 
                IMethodResult result) {
            this.mApiObject = obj; 
            this.arrayofNames = arrayofNames;
            this.mResult = result;
        }

        @Override
        public void run() {
            try {
                mApiObject.getProperties(
                    arrayofNames, mResult);
            } catch (Throwable ex) {
                mResult.set(ex);
            }
        }
    }

    public void getAllProperties(IMethodResult result) { 
        mPropertyBag.getAllProperties(result);
    }

    public static class getAllPropertiesTask implements Runnable {
        private IGenPropBag mApiObject; 
        private IMethodResult mResult;

        public getAllPropertiesTask(IGenPropBag obj, 
                IMethodResult result) {
            this.mApiObject = obj; 
            this.mResult = result;
        }

        @Override
        public void run() {
            try {
                mApiObject.getAllProperties(mResult);
            } catch (Throwable ex) {
                mResult.set(ex);
            }
        }
    }

    public void setProperty(String propertyName, String propertyValue, IMethodResult result) { 
        mPropertyBag.setProperty(propertyName, propertyValue, result);
    }

    public static class setPropertyTask implements Runnable {
        private IGenPropBag mApiObject; 
        private String propertyName;
        private String propertyValue;
        private IMethodResult mResult;

        public setPropertyTask(IGenPropBag obj, 
                String propertyName, 
                String propertyValue, 
                IMethodResult result) {
            this.mApiObject = obj; 
            this.propertyName = propertyName;
            this.propertyValue = propertyValue;
            this.mResult = result;
        }

        @Override
        public void run() {
            try {
                mApiObject.setProperty(
                    propertyName, 
                    propertyValue, mResult);
            } catch (Throwable ex) {
                mResult.set(ex);
            }
        }
    }

    public void setProperties(Map<String, String> propertyMap, IMethodResult result) { 
        mPropertyBag.setProperties(propertyMap, result);
    }

    public static class setPropertiesTask implements Runnable {
        private IGenPropBag mApiObject; 
        private Map<String, String> propertyMap;
        private IMethodResult mResult;

        public setPropertiesTask(IGenPropBag obj, 
                Map<String, String> propertyMap, 
                IMethodResult result) {
            this.mApiObject = obj; 
            this.propertyMap = propertyMap;
            this.mResult = result;
        }

        @Override
        public void run() {
            try {
                mApiObject.setProperties(
                    propertyMap, mResult);
            } catch (Throwable ex) {
                mResult.set(ex);
            }
        }
    }

}
