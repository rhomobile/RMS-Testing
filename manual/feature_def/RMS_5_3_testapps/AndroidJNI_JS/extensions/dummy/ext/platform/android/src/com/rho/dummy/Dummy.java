package com.rho.dummy;

import java.util.HashMap;
import java.util.Map;
import java.util.Timer;
import java.util.TimerTask;

import android.util.Log;

import com.rhomobile.rhodes.api.IMethodResult;
import com.rhomobile.rhodes.api.MethodResult;

public class Dummy extends DummyBase implements IDummy {
	
	TimerTask timerTask=null;
	Timer timer=new Timer();
	IMethodResult enableCallback=null;
	IMethodResult enableCallbackInt=null;
	IMethodResult enableCallbackStr=null;
	IMethodResult enableCallbackBool=null;
	IMethodResult enableCallbackDouble=null;
	
	HashMap<String,Object> hashMap=new HashMap<String,Object>();

    public Dummy(String id) {
        super(id);
    }


    @Override
    public void getPlatformName(IMethodResult result) {
          result.set("Android");	
    }
    
    @Override
    public void enable_double(int firingInterval, IMethodResult result){
    	enableCallbackDouble=result;
		enableCallbackDouble.keepAlive();
		initializeTimerTask_double();
		long delay=2000;
		long fI=firingInterval*1000;
		Log.d("dummy","firingInterval="+firingInterval);
		timer.scheduleAtFixedRate(timerTask,delay, fI);
    }
    
    void initializeTimerTask_double(){
    	timerTask=new TimerTask()
		{

			@Override
			public void run() {
				//hashMap.clear();
				//Log.d("dummy","getting integer= "+hashMap.get("value"));				
				Log.d("dummy","about to fire="+System.currentTimeMillis());
				enableCallbackDouble.set(2.12345678);
			    			
			}
			
		};
    	
    }
    
    @Override
    public void enable_bool(int firingInterval, IMethodResult result){
    	enableCallbackBool=result;
		enableCallbackBool.keepAlive();
		initializeTimerTask_bool();
		long delay=2000;
		long fI=firingInterval*1000;
		Log.d("dummy","firingInterval="+firingInterval);
		timer.scheduleAtFixedRate(timerTask,delay, fI);
    }
    
    void initializeTimerTask_bool(){
    	timerTask=new TimerTask()
		{

			@Override
			public void run() {
				//hashMap.clear();
				//Log.d("dummy","getting integer= "+hashMap.get("value"));				
				Log.d("dummy","about to fire="+System.currentTimeMillis());
				enableCallbackBool.set(true);
			    			
			}
			
		};
    	
    }
    @Override
    public void enable_str(int firingInterval, IMethodResult result){
    	enableCallbackStr=result;
		enableCallbackStr.keepAlive();
		initializeTimerTask_str();
		long delay=2000;
		long fI=firingInterval*1000;
		Log.d("dummy","firingInterval="+firingInterval);
		timer.scheduleAtFixedRate(timerTask,delay, fI);
    }
    
    void initializeTimerTask_str(){
    	timerTask=new TimerTask()
		{

			@Override
			public void run() {
				//hashMap.clear();
				//hashMap.put("status", "ok");
				//Log.d("dummy","getting integer= "+hashMap.get("status"));				
				Log.d("dummy","about to fire="+System.currentTimeMillis());
				enableCallbackStr.set("ok");
			    			
			}
			
		};
    	
    }
    @Override
    public void enable_Int(int firingInterval, IMethodResult result){
    	enableCallbackInt=result;
		enableCallbackInt.keepAlive();
		initializeTimerTask_int();
		long delay=2000;
		long fI=firingInterval*1000;
		Log.d("dummy","firingInterval="+firingInterval);
		timer.scheduleAtFixedRate(timerTask,delay, fI);
    }
    
    void initializeTimerTask_int(){
    	timerTask=new TimerTask()
		{

			@Override
			public void run() {
				//hashMap.clear();
				//hashMap.put("number", 99);
				//Log.d("dummy","getting integer= "+hashMap.get("number"));				
				Log.d("dummy","about to fire="+System.currentTimeMillis());
				enableCallbackInt.set(99);
			    
				
			}
			
		};
    	
    }
    
    @Override
    public void calcSumm(int a, int b, IMethodResult result) {
          result.set(a+b);
    }

    @Override
    public void joinStrings(String a, String b, IMethodResult result) {
          result.set(a+b);
    }


	@Override
	public void enable(int firingInterval, IMethodResult result) {
		
		enableCallback=result;
		enableCallback.keepAlive();
		initializeTimerTask();
		long delay=2000;
		long fI=firingInterval*1000;
		Log.d("dummy","firingInterval="+firingInterval);
		timer.scheduleAtFixedRate(timerTask,delay, fI);
	}
    
	private void initializeTimerTask()
	{
		timerTask=new TimerTask()
		{

			@Override
			public void run() {
				hashMap.clear();
				hashMap.put("status", "ok");
				hashMap.put("data", 99);
				Log.d("dummy","about to fire="+System.currentTimeMillis());
				enableCallback.set(hashMap);
			    
				
			}
			
		};
	}

	@Override
	public void stop(IMethodResult result) {
		
		timer.cancel();		
		if(enableCallback!=null)
			enableCallback.release();
		if(enableCallbackStr!=null)
			enableCallbackStr.release();
		
	}


}