package com.rho.nativebridgetest;

import java.util.List;
import java.util.Map;

import com.rhomobile.rhodes.api.IMethodResult;

public abstract class NativeBridgeTestSingletonBase  {


    public static class testBoolTask implements Runnable {
        private INativeBridgeTestSingleton mApiSingleton; 
        private boolean val; 
        private IMethodResult mResult;

        public testBoolTask(INativeBridgeTestSingleton obj, 
                boolean val,         
                IMethodResult result) {
            this.mApiSingleton = obj; 
            this.val = val;        
            this.mResult = result;
        }

        @Override
        public void run() {
            try {
                mApiSingleton.testBool(
                    val,  mResult);
            } catch (Throwable ex) {
                mResult.set(ex);
            }
        }
    }

    public static class testIntTask implements Runnable {
        private INativeBridgeTestSingleton mApiSingleton; 
        private int val; 
        private IMethodResult mResult;

        public testIntTask(INativeBridgeTestSingleton obj, 
                int val,         
                IMethodResult result) {
            this.mApiSingleton = obj; 
            this.val = val;        
            this.mResult = result;
        }

        @Override
        public void run() {
            try {
                mApiSingleton.testInt(
                    val,  mResult);
            } catch (Throwable ex) {
                mResult.set(ex);
            }
        }
    }

    public static class testFloatTask implements Runnable {
        private INativeBridgeTestSingleton mApiSingleton; 
        private double val; 
        private IMethodResult mResult;

        public testFloatTask(INativeBridgeTestSingleton obj, 
                double val,         
                IMethodResult result) {
            this.mApiSingleton = obj; 
            this.val = val;        
            this.mResult = result;
        }

        @Override
        public void run() {
            try {
                mApiSingleton.testFloat(
                    val,  mResult);
            } catch (Throwable ex) {
                mResult.set(ex);
            }
        }
    }

    public static class testStringTask implements Runnable {
        private INativeBridgeTestSingleton mApiSingleton; 
        private String val; 
        private IMethodResult mResult;

        public testStringTask(INativeBridgeTestSingleton obj, 
                String val,         
                IMethodResult result) {
            this.mApiSingleton = obj; 
            this.val = val;        
            this.mResult = result;
        }

        @Override
        public void run() {
            try {
                mApiSingleton.testString(
                    val,  mResult);
            } catch (Throwable ex) {
                mResult.set(ex);
            }
        }
    }

    
}
