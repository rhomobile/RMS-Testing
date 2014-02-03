package com.example.testtarget;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.widget.Toast;

public class BroadCastReceiver extends BroadcastReceiver {

	@Override
	public void onReceive(Context context, Intent intent) {
		String testData = "";
		testData = intent.getStringExtra("MyData");
		Toast toast = Toast.makeText(context, testData + " PERMISSION", Toast.LENGTH_SHORT);
		toast.show();
	}
}
