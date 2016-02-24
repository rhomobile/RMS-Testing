package com.zebra;
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;


public class EBConfig {
	public void PullConfigxml(){
		System.out.println(System.getProperty("user.dir"));
        try{
        	executeCommandLine("adb shell am force-stop com.symbol.enterprisebrowser");
        	executeCommandLine("adb pull "+"/storage/sdcard/Android/data/com.symbol.enterprisebrowser/Config.xml "+ System.getProperty("user.dir")+ "\\src\\com\\input\\Config.xml");
            executeCommandLine("adb pull "+"/storage/sdcard0/Android/data/com.symbol.enterprisebrowser/Config.xml "+ System.getProperty("user.dir")+ "\\src\\com\\input\\Config.xml");
           	executeCommandLine("adb pull "+"/storage/sdcard1/Android/data/com.symbol.enterprisebrowser/Config.xml "+ System.getProperty("user.dir")+ "\\src\\com\\input\\Config.xml");
        	System.out.println("Pass");
        }catch(Exception ex){
	        System.out.println("Fail : " + ex.getMessage());
        }
	}
	public void launchEB() {
		try{
			executeCommandLine("adb shell am start -n com.symbol.enterprisebrowser/com.rhomobile.rhodes.RhodesActivity");
		}catch(Exception ex){
			System.out.println("Fail : " + ex.getMessage());
		}
	}
	public void PushConfigxml(){
		try{
			executeCommandLine("adb push "+ System.getProperty("user.dir")+ "\\src\\com\\input\\Config.xml "+"/storage/sdcard/Android/data/com.symbol.enterprisebrowser/Config.xml");
			executeCommandLine("adb push "+ System.getProperty("user.dir")+ "\\src\\com\\input\\Config.xml "+"/storage/sdcard0/Android/data/com.symbol.enterprisebrowser/Config.xml");
			executeCommandLine("adb push "+ System.getProperty("user.dir")+ "\\src\\com\\input\\Config.xml "+"/storage/sdcard1/Android/data/com.symbol.enterprisebrowser/Config.xml");
			System.out.println("Pass");
		}catch(Exception ex){
			System.out.println("Fail : " + ex.getMessage());
		}
	}
	
	public void PushHtml(String arg, String arg2){
		try{
			executeCommandLine("adb push "+ System.getProperty("user.dir")+ arg +" "+arg2);
			System.out.println("Pass");
		}catch(Exception ex){
			System.out.println("Fail : " + ex.getMessage());
		}
	}
	
	public String ChangeConfigxml(String arg1){
		try{
			System.out.println("Executing ChangeConfigxml function");	
			String line = null;
			List<String> lines = new ArrayList<String>();
			File f1 = new File(System.getProperty("user.dir")+ "\\src\\com\\input\\Config.xml");
			if(f1.exists()) {
				String argsplit [] = arg1.split(",");
				String XmlNest = argsplit[0];
	            String ConfigTagToAdd = argsplit[1];
	            String XMLtagArrayList [] = XmlNest.split("/");
	            FileReader fr = new FileReader(f1);
	            BufferedReader br = new BufferedReader(fr);
	            int i = 0;
	            int flag = 0;
	            System.out.println(XMLtagArrayList.length);
	            while ((line = br.readLine()) != null) {
	            	if (line.contains("<"+XMLtagArrayList[i])) {
	            		if(i< XMLtagArrayList.length-1)
	            			i++;
	               	}
	           		if(XMLtagArrayList.length == i+1 && line.contains("<"+ConfigTagToAdd) ) {
	           			for(int j = 0; j<XMLtagArrayList.length;j++) {
	           				argsplit[2] = argsplit[2].replace(argsplit[2], "  "+argsplit[2]);
	           			}
	           			argsplit[2] = argsplit[2].replace("endl", "\n");
	           			if(!argsplit[2].contains(line))
	           				line = line.replaceAll(".+", argsplit[2]);
	           			flag = 1;
	           		}
	           		else if(line.contains("</"+XMLtagArrayList[i]) && XMLtagArrayList.length == i+1 && flag ==0) {
	           			String space = null;
	           			for(int j = 0; j<XMLtagArrayList.length;j++) {
	           				space = "  ";
	           				argsplit[2] = argsplit[2].replace(argsplit[2], space+argsplit[2]);
	           			}
	           			argsplit[2] = argsplit[2].replace("endl", "\n"+space);
	           			XMLtagArrayList[i] = XMLtagArrayList[i].replace(XMLtagArrayList[i], "</"+XMLtagArrayList[i]+">");
	           			for(int j = 0; j<XMLtagArrayList.length-1;j++) {
	           				XMLtagArrayList[i] = XMLtagArrayList[i].replace(XMLtagArrayList[i], "  "+XMLtagArrayList[i]);
	           			}
	           			line = line.replaceAll(".+", argsplit[2]+"\n"+XMLtagArrayList[i]);
	           		}
	                lines.add(line);
	            }
	            fr.close();
	            br.close();
				FileWriter fw = new FileWriter(f1);
				BufferedWriter out = new BufferedWriter(fw);
				for(String s : lines)
				     out.write(s+"\n");
				out.flush();
				out.close();
				return "Pass";
			}
			else {
				System.out.println("Config xml doesnt exists");	
				return "Fail";
			}


		}catch(Exception ex){
			System.out.println("Fail-"+ex.getMessage());
			return "Fail";
		}
	}
	public String executeCommandLine(String command) {

		System.out.println("Started executeCommandLine function"); 
		System.out.println(command);
		Process p;
		try {
			p = Runtime.getRuntime().exec(command);
			InputStream in = p.getInputStream();              
			BufferedReader br=new BufferedReader(new InputStreamReader(in));
			String line =null;
			Thread.sleep(4000);
			line=br.readLine();
			br.close();
			in.close();
			p.destroy();
			return line;
		} catch (Exception e) {
			e.printStackTrace();
			System.out.println("error while executing executeCommandLine function, Command: "+command+" : "+e.getMessage());
			return "Fail";
		}
	}

}
