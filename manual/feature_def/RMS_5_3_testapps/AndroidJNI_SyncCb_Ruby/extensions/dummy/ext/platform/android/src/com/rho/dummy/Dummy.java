package com.rho.dummy;

import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
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
	IMethodResult enableStringCallback=null;
	IMethodResult enableIntCallback=null;
	IMethodResult enableBooleanCallback=null;
	IMethodResult enableFloatCallback=null;
	IMethodResult enableArrayCallback=null;
	
	
	HashMap<String,Object> hashMap=new HashMap<String,Object>();
	Collection<Object> colArray=new ArrayList<Object>();

    public Dummy(String id) {
        super(id);
    }


    @Override
    public void getPlatformName(IMethodResult result) {
          result.set("Android");	
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
		
		/*enableCallback=result;
		enableCallback.keepAlive();
		initializeTimerTask();
		long delay=2000;
		long fI=firingInterval*1000;
		Log.d("dummy","firingInterval="+firingInterval);
		timer.scheduleAtFixedRate(timerTask,delay, fI);
		*/
		fireHashMapSyncCallback(result);
	}
    private void fireHashMapSyncCallback(IMethodResult res)
    {
    	hashMap.clear();
		hashMap.put("status", "ok");
		hashMap.put("data", 99);
		Log.d("dummy","about to fire enable="+System.currentTimeMillis());
		res.set(hashMap);
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
				Log.d("dummy","about to fire enable="+System.currentTimeMillis());
				enableCallback.set(hashMap);
			    
				
			}
			
		};
	}
	private void initializeTimerTaskString()
	{
		timerTask=new TimerTask()
		{

			@Override
			public void run() {
				
				Log.d("dummy","about to fire string="+System.currentTimeMillis());
				enableStringCallback.set("ok");
				
				
			    
				
			}
			
		};
	}
	@Override
	public void stop(IMethodResult result) {
		
		timer.cancel();
		if(enableCallback!=null)
			enableCallback.release();
		if(enableStringCallback!=null)
			enableStringCallback.release();
		
	}


	@Override
	public void enableString(int firingInterval, IMethodResult result) {
		
		
		/*enableStringCallback=result;
		enableStringCallback.keepAlive();
		initializeTimerTaskString();
		long delay=2000;
		long fI=firingInterval*1000;
		Log.d("dummy","enableString->firingInterval="+firingInterval);
		timer.scheduleAtFixedRate(timerTask,delay,fI);*/
		fireHashMapSyncCallbackStr(result);
	}
	
	private void fireHashMapSyncCallbackStr(IMethodResult res)
	    {
	    	Log.d("dummy","about to fire enable="+System.currentTimeMillis());
			res.set("ok");
		}

	@Override
	public void enableInt(int firingInterval, IMethodResult result) {
		/*enableIntCallback=result;
		enableIntCallback.keepAlive();
		initializeTimerTask_Int();
		long delay=2000;
		long fI=firingInterval*1000;
		Log.d("dummy","enableString->firingInterval="+firingInterval);
		timer.scheduleAtFixedRate(timerTask,delay, fI);*/
		fireHashMapSyncCallbackInt(result);
		
	}
	private void fireHashMapSyncCallbackInt(IMethodResult res)
    {
    	Log.d("dummy","about to fire enable="+System.currentTimeMillis());
		res.set(45);
	}

	@Override
	public void enableBool(int firingInterval, IMethodResult result) {
		/*enableBooleanCallback=result;
		enableBooleanCallback.keepAlive();
		initializeTimerTask_Boolean();
		long delay=2000;
		long fI=firingInterval*1000;
		Log.d("dummy","enableString->firingInterval="+firingInterval);
		timer.scheduleAtFixedRate(timerTask,delay, fI);*/
		fireHashMapSyncCallbackBool(result);
	}
	private void fireHashMapSyncCallbackBool(IMethodResult res)
    {
    	Log.d("dummy","about to fire enable="+System.currentTimeMillis());
		res.set(true);
	}

	@Override
	public void enableFloat(int firingInterval, IMethodResult result) {
		/*enableFloatCallback=result;
		enableFloatCallback.keepAlive();
		initializeTimerTask_Float();
		long delay=2000;
		long fI=firingInterval*1000;
		Log.d("dummy","enableString->firingInterval="+firingInterval);
		timer.scheduleAtFixedRate(timerTask,delay, fI);*/
		fireHashMapSyncCallbackFloat(result);
		
	}
	private void fireHashMapSyncCallbackFloat(IMethodResult res)
    {
    	Log.d("dummy","about to fire enable="+System.currentTimeMillis());
		res.set(4.5);
	}
	private void initializeTimerTask_Int()
	{
		timerTask=new TimerTask()
		{

			@Override
			public void run() {
				
				Log.d("dummy","about to fire Integer="+System.currentTimeMillis());
				enableIntCallback.set(45);
			    
				
			}
			
		};
	}
	private void initializeTimerTask_Float()
	{
		timerTask=new TimerTask()
		{

			@Override
			public void run() {
				
				Log.d("dummy","about to fire FLOAT="+System.currentTimeMillis());
				enableFloatCallback.set(4.5);
			    
				
			}
			
		};
	}
	private void initializeTimerTask_Boolean()
	{
		timerTask=new TimerTask()
		{

			@Override
			public void run() {
				
				Log.d("dummy","about to fire Boolean="+System.currentTimeMillis());
				enableBooleanCallback.set(true);
			    
				
			}
			
		};
	}
	private void initializeTimerTask_Array()
	{
		timerTask=new TimerTask()
		{

			@Override
			public void run() {
				
				Log.d("dummy","about to fire Array="+System.currentTimeMillis());
				colArray.clear();
				colArray.add("abc");
				colArray.add(123);
				colArray.add(4.5);
				colArray.add(true);
				enableArrayCallback.set(colArray);
			    
				
			}
			
		};
	}


	@Override
	public void enableArray(int firingInterval, IMethodResult result) {
		/*enableArrayCallback=result;
		enableArrayCallback.keepAlive();
		initializeTimerTask_Array();
		long delay=2000;
		long fI=firingInterval*1000;
		Log.d("dummy","enableString->firingInterval="+firingInterval);
		timer.scheduleAtFixedRate(timerTask,delay, fI);*/
		fireHashMapSyncCallbackArray(result);
	}
	private void fireHashMapSyncCallbackArray(IMethodResult res)
    {
		colArray.clear();
		colArray.add("abc");
		colArray.add(123);
		colArray.add(4.5);
		colArray.add(true);
		Log.d("dummy","about to fire enable="+System.currentTimeMillis());
		res.set(colArray);
    }

}