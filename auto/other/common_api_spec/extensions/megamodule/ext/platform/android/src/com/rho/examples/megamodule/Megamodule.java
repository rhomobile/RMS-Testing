package com.rho.examples.megamodule;

import java.util.List;
import java.util.Map;
import java.util.LinkedList;
import java.util.Hashtable;

import com.rhomobile.rhodes.api.IMethodResult;
import com.rhomobile.rhodes.api.MethodResult;

public class Megamodule extends MegamoduleBase implements IMegamodule {
    
	private int mInProp = 0;
	
	
	
    public Megamodule(String id) {
        super(id);
        mInProp = 0;
    }


    @Override
    public void produceArray(IMethodResult result) {
        List<Object> arr = new LinkedList<Object>();
        int i;
        for (i = 1; i <= 10; i++) {
        	arr.add(new Integer(i));
        }
        result.set(arr);
    }

    @Override
    public void produceHash(IMethodResult result) {
    	Hashtable<String, Object> map = new Hashtable<String, Object>();
        map.put("parame1", "value1");
        map.put("parama2", new Integer(55));
        result.set(map);
    }

    @Override
    public void produceComplicatedResult(IMethodResult result) {

    	
    	List<Object> ar = new LinkedList<Object>();
    	
    	Hashtable<String, Object> hash1 = new Hashtable<String, Object>();
    	hash1.put("parame1", "value1");
        hash1.put("parama2", new Integer(55));
    	
        ar.add(hash1);
    	
    	Hashtable<String, Object> hash2 = new Hashtable<String, Object>();
    	List<Object> array2 = new LinkedList<Object>();
    	array2.add(new Integer(1));
    	array2.add(new Integer(2));
    	array2.add(new Integer(3));
    	hash2.put("paramu3", array2);
    	
    	ar.add(hash2);
    	
    	result.set(ar);
    
    }

    @Override
    public void showAlertFromUIThread(String message, IMethodResult result) {
        // TODO Auto-generated method stub
        
    }

    @Override
    public void setPeriodicallyCallback(int periodInMilliseconds,
            IMethodResult result) {
        // TODO Auto-generated method stub
        
    }

    @Override
    public void isPeriodicallyCallbackSetted(IMethodResult result) {
        // TODO Auto-generated method stub
        
    }

    @Override
    public void stopPeriodicallyCallback(IMethodResult result) {
        // TODO Auto-generated method stub
        
    }

    @Override
    public void typesTest(String paramStr, boolean paramBool, int paramInt,
            double paramFloat, List<Integer> paramArray,
            Map<String, String> paramHash, IMethodResult result) {

    	if (!paramStr.equals("ABC")) {
    		result.set(false);
    		return;
    	}
    	
    	if (paramBool != true) {
    		result.set(false);
    		return;
    	}
    	
    	if (paramInt != 555123) {
    		result.set(false);
    		return;
    	}
    	
    	if (paramFloat != 3.14) {
    		result.set(false);
    		return;
    	}
    	
    	if (paramArray.size() != 3) {
    		result.set(false);
    		return;
    	}
    	
    	if (	(paramArray.get(0).intValue() != 1) || 
    			(paramArray.get(1).intValue() != 2) || 
    			(paramArray.get(2).intValue() != 3)) {
    		result.set(false);
    		return;
    	}
    	
    	if (paramHash.size() != 2) {
    		result.set(false);
    		return;
    	}
    	
    	String val1 = paramHash.get("p1");
    	String val2 = paramHash.get("p2");
    	
    	if ((val1 == null) || (val2 == null)) {
    		result.set(false);
    		return;
    	}
    	
    	if ((!val1.equals("abc")) || (!val2.equals("qwe"))) {
    		result.set(false);
    		return; 
    	}

    	result.set(true);
    }

    @Override
    public void complicatedTypesTest1(List<Map<String, Object>> paramArray,
            IMethodResult result) {
        // TODO Auto-generated method stub
        
    }


}