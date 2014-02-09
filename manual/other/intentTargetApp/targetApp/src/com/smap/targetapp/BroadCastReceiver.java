package com.smap.targetapp;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.util.Log;
import android.widget.Toast;

public class BroadCastReceiver extends BroadcastReceiver {

	@Override
	public void onReceive(Context context, Intent intent) {
	    
	    Log.i("targetApp", "Broadcast is received: " + intent );
	    
		String toastStr = intent.getStringExtra("toast");
		String myDataStr = intent.getStringExtra("myData");
		if (toastStr != null) {
		    Toast toast = Toast.makeText(context, toastStr + " - Toast from Target Application", Toast.LENGTH_SHORT);
		    toast.show();
		}
		if(myDataStr!= null){
			Toast toast = Toast.makeText(context, myDataStr + " - Toast from Target Application", Toast.LENGTH_SHORT);
		    toast.show();
		}
		
		String replyStr = intent.getStringExtra("reply");
		if (replyStr != null) {
		    Intent reply = new Intent();
		    reply.setClassName("com.rhomobile.manual_common_spec","com.rhomobile.rhodes.RhodesService");
		    reply.putExtra("reply", replyStr);

		    Log.i("targetApp", "Sending reply: " + reply);

		    context.startService(reply);
		}
	}
}
