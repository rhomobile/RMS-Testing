package com.testcases;

import io.selendroid.standalone.SelendroidLauncher;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.util.Hashtable;
import java.util.Hashtable.*;

import junit.framework.Assert;

import org.apache.log4j.Logger;




import com.utils.Constants;
import com.utils.Keywords;
import com.utils.TestUtil;
import com.utils.Xls_Reader;

public class EBDriverScript {

	public void runTest(String testid, String ModuleNames){
		System.out.println("Java Module test id : "+ testid);
		//String ModuleNames=this.getClass().getName().split("\\.")[2];
		System.out.println("Java Module Name : "+ ModuleNames);
		Hashtable<String, String> data;
		data = getData(ModuleNames, testid);	
		System.out.println("Java constants : " + Constants.Testcase_ID_Col);
		try {
			Rhomobile_test(data, ModuleNames);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public Logger log;
	//public String ModuleName=this.getClass().getName().split("\\.")[2];
	
	public void Rhomobile_test(Hashtable<String,String> data, String ModuleName){
		System.out.println("This is Rhomobile_test method: " + ModuleName);
		if(!(Constants.TESTCASE_RUNMODE.equalsIgnoreCase(data.get(Constants.Automatable_Col)) &&  Constants.REGRESSION_LEVEL >=Double.parseDouble(data.get(Constants.Regression_Col))))
			log.debug("Skipping the test as data set for automable as NA or Regression level not matching");
		System.out.println("start of test method");
		System.out.println(data.get(Constants.Testcase_ID_Col));
		log=TestUtil.app_Logs(ModuleName+data.get(Constants.Testcase_ID_Col),ModuleName);
		log.debug("Executing Test Case ID: "+data.get(Constants.Testcase_ID_Col));
		Keywords app=null;
		Xls_Reader excelReader= new Xls_Reader(Constants.Xls_Path+ModuleName+".xlsx");
		SelendroidLauncher launch=null;
		String res="";
		String actRes="";
		String res1="";
		int row=0;
		try
		{	
			app= Keywords.getInstance();				
			app.setLogger(log);	
			if(data.get("matchedRow").equals(String.valueOf(2))) {
				app.stopAppiumServer();
				Thread.sleep(5000);
				app.startAppiumServer();
			}
			String AutName = "EB_AUT_Name";
			String AutId = "EB_AUT_ID";
			res1=app.Init_Selendroid(AutName, AutId,1);
			res=app.start(data,ModuleName);
			res1=app.reporterror;
			app.quitSelendroid(launch);
		}catch(Throwable t){
			System.out.println("Exception : " + t);
			log.debug("Exception in test case: "+t.getMessage());
			app.quitSelendroid(launch);
			res1="Fail";
		}
		row=app.getDescriptionRow(excelReader, data.get(Constants.TestCaseObjective_Col));
		log.debug("Row number:"+row);
		if(res.equalsIgnoreCase("Pass") && res1.equalsIgnoreCase("Pass")){
			actRes="Pass";				
			excelReader.setCellData(Constants.Xls_Sheetname, Constants.TestResult_Col, row, "Pass");				
			Assert.assertEquals("Pass", actRes);
		}else{
			actRes="Fail";
			excelReader.setCellData(Constants.Xls_Sheetname, Constants.TestResult_Col, row, "Fail");
			try{
				String verify, putData = null;
	            File file = new File(System.getProperty("user.dir")+"\\src\\com\\logs\\"+ModuleName+"\\"+ModuleName+data.get(Constants.Testcase_ID_Col)+".log");
	            FileReader fr = new FileReader(file);
	            BufferedReader br = new BufferedReader(fr);
	            while( (verify=br.readLine()) != null ){ 
	            	verify = verify.substring(34);
	            	putData = putData+"\n"+verify;
	               }
	            br.close();
	           Assert.assertEquals(putData, "Pass", actRes);
	        }catch(IOException e){
	        	e.printStackTrace();
	        }
		}
		log.debug("Ending Test Case ID"+data.get("Testcase ID"));	
	}
	

	public Hashtable<String, String> getData(String ModuleNames, String testId){
		System.out.println("GetData Module : " + ModuleNames);
		System.out.println("GetData testId : " + testId);
		Xls_Reader readExcel=new Xls_Reader(Constants.Xls_Path+ModuleNames+".xlsx");
		int startRow = 1;
		String value = readExcel.getCellData(Constants.Xls_Sheetname, 1, 1);
		System.out.println("GetData from xls : " + value);
		int cols=0;
		while(!readExcel.getCellData(Constants.Xls_Sheetname, cols, startRow).equals("")){
			System.out.println("getData colunm : " + readExcel.getCellData(Constants.Xls_Sheetname, cols, startRow));
			cols++;
		}
		int rows=0;
		int actualRow = -1;
		while(!readExcel.getCellData(Constants.Xls_Sheetname, 0, (startRow+rows)).equals("")){
			String recordData = readExcel.getCellData(Constants.Xls_Sheetname, 0, (startRow+rows));
			System.out.println("GetData record data : " + recordData);
			//System.out.println("GetData rows : " + testId);
			if(recordData.equals(testId)){
				actualRow = startRow+rows;
				System.out.println("row to actual row : " + actualRow);
				break;
			}
			rows++;
		}
		Hashtable<String,String> table=null;
		table=new Hashtable<String,String>();
		for(int cNum=0;cNum<cols;cNum++){
			table.put(readExcel.getCellData(Constants.Xls_Sheetname, cNum, 1),readExcel.getCellData(Constants.Xls_Sheetname, cNum, actualRow));
		}
		table.put("matchedRow", String.valueOf(actualRow));
		System.out.println("GetData matching row : " + actualRow);
		return table;
	}
}
