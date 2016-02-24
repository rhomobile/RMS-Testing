package com.utils;

import org.apache.log4j.FileAppender;
import org.apache.log4j.Level;
import org.apache.log4j.Logger;
import org.apache.log4j.PatternLayout;




public class TestUtil {
	
public static Logger app_Logs( String append, String Folder){
		
		FileAppender appender = new FileAppender();
		//appender.setFile(System.getProperty("user.dir")+"\\src\\com\\logs\\"+append+".log");
		appender.setFile(System.getProperty("user.dir")+"\\src\\com\\logs\\"+Folder+"\\"+append+".log");
		appender.setLayout(new PatternLayout("%d %-5p [%c{1}] %m%n"));
		appender.setAppend(false);
		appender.activateOptions();
		
		Logger Application_Log= Logger.getLogger(append);
		Application_Log.setLevel(Level.DEBUG);
		Application_Log.addAppender(appender);
		
		return Application_Log;
		
	}
	
public static boolean isTestCaseExecutable(String testCase_Id, Xls_Reader xls){
	
	String Automatable=null;
	String Reg_Level=null;
	for(int rNum=2;rNum<=xls.getRowCount("Test Cases");rNum++){
		if(testCase_Id.equals(xls.getCellData("Test Cases", "TCID", rNum))){
			// check runmode
			if(Constants.TESTCASE_RUNMODE.equalsIgnoreCase(Automatable) &&  Constants.REGRESSION_LEVEL >=Double.parseDouble(Reg_Level))
				return true;
			else
				return false;
		}
			
	}
	
	return false;
	
}
	
	
	

}
