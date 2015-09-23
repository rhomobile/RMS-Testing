package com.testcases;

import io.selendroid.standalone.SelendroidLauncher;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.util.Hashtable;

import junit.framework.Assert;

import org.apache.log4j.Logger;
import org.testng.SkipException;
import org.testng.annotations.DataProvider;
import org.testng.annotations.Test;

import com.utils.Constants;
import com.utils.Keywords;
import com.utils.TestUtil;
import com.utils.Xls_Reader;

public class BatteryIndicator_Ruby {



	public Logger log;
	public String ModuleName=this.getClass().getName().split("\\.")[2];
	@Test(dataProvider="getData",groups={"BatteryIndicator_JS"})
	public void Rhomobile_test(Hashtable<String,String> data) throws Exception {
		if(!(Constants.TESTCASE_RUNMODE.equalsIgnoreCase(data.get(Constants.Automatable_Col)) &&  Constants.REGRESSION_LEVEL >=Double.parseDouble(data.get(Constants.Regression_Col))))
			throw new SkipException("Skipping the test as data set for automable as NA or Regression level not matching");
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
			launch=app.Init_Selendroid();
			//app.OpenBrowser();
			res=app.start(data,ModuleName);
			res1=app.reporterror;
			app.quitSelendroid(launch);
		}catch(Throwable t){
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
			//Assert.assertEquals("Pass", actRes);
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
	
	
	
	
	@DataProvider
	public Object[][] getData(){
		Xls_Reader readExcel=new Xls_Reader(Constants.Xls_Path+ModuleName+".xlsx");		
		int testCaseStartRowNum=0;
		
		// total cols
		int colStartRowNum=testCaseStartRowNum+1;
		int cols=0;
		while(!readExcel.getCellData(Constants.Xls_Sheetname, cols, colStartRowNum).equals("")){
			cols++;
		}
		System.out.println("Total cols in test -> "+ cols);		

		// rows
		int rowStartRowNum=testCaseStartRowNum+2;
		int rows=0;
		while(!readExcel.getCellData(Constants.Xls_Sheetname, 0, (rowStartRowNum+rows)).equals("")){
			rows++;
		}
		System.out.println("Total rows in test -> "+ rows);
		Object[][] data = new Object[rows][1];
		Hashtable<String,String> table=null;
		
		// print the test data. Put the test data in hash table and return it
 		for(int rNum=rowStartRowNum;rNum<(rows+rowStartRowNum);rNum++){
		table=new Hashtable<String,String>();
			for(int cNum=0;cNum<cols;cNum++){
				table.put(readExcel.getCellData(Constants.Xls_Sheetname, cNum, colStartRowNum),readExcel.getCellData(Constants.Xls_Sheetname, cNum, rNum));
				//System.out.print(xls.getCellData("Test Data", cNum, rNum)+" - ");
			}
			data[rNum-rowStartRowNum][0]=table;
			//log.debug("total number of test cases : "+(rNum-rowStartRowNum));
			//System.out.println();
		}
		System.out.println("end of getdata");
		
		return data;
		
		
	}
	
	
	
	



}
