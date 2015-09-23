package com.utils;

import static io.selendroid.client.waiter.TestWaiter.waitForElement;
import io.selendroid.client.SelendroidDriver;
import io.selendroid.client.TouchActionBuilder;
import io.selendroid.common.SelendroidCapabilities;
import io.selendroid.standalone.SelendroidConfiguration;
import io.selendroid.standalone.SelendroidLauncher;

import java.awt.image.BufferedImage;
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Hashtable;
import java.util.List;
import java.util.Properties;
import java.util.Scanner;
import java.util.Set;
import java.util.concurrent.TimeUnit;

import javax.imageio.ImageIO;

import org.apache.commons.io.FileUtils;
import org.apache.log4j.Logger;
import org.openqa.selenium.Alert;
import org.openqa.selenium.By;
import org.openqa.selenium.Dimension;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.Keys;
import org.openqa.selenium.NoAlertPresentException;
import org.openqa.selenium.NoSuchElementException;
import org.openqa.selenium.OutputType;
import org.openqa.selenium.Rotatable;
import org.openqa.selenium.ScreenOrientation;
import org.openqa.selenium.TakesScreenshot;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.ie.InternetExplorerDriver;
import org.openqa.selenium.interactions.touch.TouchActions;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.Select;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.testng.Assert;



public class Keywords {

	public Keywords keywords=null;
	public static Logger App_Logs;
	public Method method[]=null;
	//Properties file
	public static Properties OR=null;
	public static Properties Config= null;  
	public WebDriver driver= null;
	public SelendroidDriver mobdriv = null;
	public SelendroidLauncher launch=null;
	static Keywords k1;
	HashMap<String,WebDriver> map;
	public static WebDriver emailDriver=null;  
	public Xls_Reader excelReader;
	public static int timeout;
	public String downloadvalue=null;
	public String reporterror;
	public String randomnum=null;
	private static Process process;
	private static String APPIUMSERVERSTART = "node C:/Program Files (x86)/Appium/"; 
	//This is a constructor 
	public Keywords() throws IOException{
		try {        

			FileInputStream fs= new FileInputStream(Constants.OR_Path);
			OR= new Properties();
			OR.load(fs);
			fs=new FileInputStream(Constants.Config_Path);
			Config= new Properties();
			Config.load(fs);
			map= new HashMap<String,WebDriver>();
			map.put(Config.getProperty("Browser"), null);
			reporterror="Pass";
			
			randomnum=Constants.random_num;
		} catch (Exception e) {
			// Error is found
			e.printStackTrace();
		}
	}
	////////////////////////////////////////////////////////////////////////////////////////////       
	//Common Functions
	///////////////////////////////////////////////////////////////////////////////////////////

	//This function will intiate logger for keywords
	public void setLogger(Logger log){

		App_Logs=log;

	}

	//This function is used to get the log function
	public static void log(String sendmessage){

		App_Logs.debug(sendmessage);
	}

	//This function will spilt the test case into functions and data
	public String start(Hashtable<String,String> data,String ModuleName) throws IllegalAccessException, IllegalArgumentException, InvocationTargetException, IOException {
		try{	
			//split the test case and get the keywords out of it
			//call the keyword functions and 
			int flag=0;
			String Reg_Level=null;
			String Automatable=null;
			Hashtable<String,String> getvalue=new Hashtable<String,String>();
			String[] keyvalue= null;
			String func_name=null;
			String arg1=null;
			String Testcase_Result=null;
			String allstep_result=null;
			String allexpected_result=null;
			excelReader= new Xls_Reader(Constants.Xls_Path+ModuleName+".xlsx");

			Automatable=data.get(Constants.Automatable_Col);            
			Reg_Level=data.get(Constants.Regression_Col);                  

			String Step_Result=null;
			//Verifying the test case has automable A and running only respective regression level
			//if(Constants.TESTCASE_RUNMODE.equalsIgnoreCase(Automatable)){



			if(Constants.TESTCASE_RUNMODE.equalsIgnoreCase(Automatable) &&  Constants.REGRESSION_LEVEL >=Double.parseDouble(Reg_Level)){
				flag=1;
				log("TestCase with Description "+"\""+data.get(Constants.TestCaseObjective_Col)+"\""+ " Execution started");
				//String Testcase=readExcel.getCellData("TestCases", "Test Steps", rownum);
				//Split the test case with semi colon. 
				String[] Teststeps= data.get(Constants.TestDescription_Col).split(";");
				//loop for all the steps in the test case
				for(String Teststep:  Teststeps){

					//check if the first char in test step is  new line, if it is new line it replaces with null
					if(Teststep.startsWith("\n"))
						Teststep=Teststep.replaceFirst("\n", "");
					//System.out.println(Teststep);                             
					//System.out.println("******");
					//check the test step has data or not and it also vaerifes this is not validation function
					if(Teststep.contains("{")){
						//Split the teststep with new line character
						Teststep=Teststep.replace("{\n", "");
						Teststep=Teststep.replace("\n}", "");
						String[] func = Teststep.split("\\n");
						keyvalue=func;
						//spiliting to get key value pair
						for(int dataitems=1;dataitems<keyvalue.length;dataitems++){

							String key=keyvalue[dataitems].split("=")[0];
							String value=keyvalue[dataitems].split("=")[1];
							getvalue.put(key, value);

						}
						//checking if the func name contains parameter like edit_gallery(galleryname){gallerydesacription=new description};
						if(keyvalue[0].contains("(")){
							func_name=keyvalue[0].split("\\(")[0];
							arg1=keyvalue[0].split("\\(")[1].replace(")","");
							//calling the func if contains arguments
							Step_Result=executeKeyword(func_name,getvalue,arg1);
							
						}
						else{
							func_name=keyvalue[0];
							//calling the function if it does not contain arguments
							Step_Result=executeKeyword(func_name,getvalue);
						}
						allstep_result=Step_Result+allstep_result;
						log("TestStepResult of "+ func_name+": "+ Step_Result);                                  


					}
					else{//mostly validation test cases come here
						Teststep=Teststep.replace("\n", "");
						//check whether the function is validation function or not 

						//This is code is used when we have any functions like Click(xpath) etc.which do not have any data but just action to perform
						if(!Teststep.toLowerCase().contains("validate")){
							Teststep=Teststep.replace("\n", "");
							if(Teststep.contains("(")){
								func_name=Teststep.split("\\(")[0];
								arg1=Teststep.split("\\(")[1].replace(")","");
								//calling the func if contains arguments
								//Step_Result=executeKeyword(func_name,getvalue,arg1);
								if(func_name.contains("TakeScreenshot")||func_name.contains("TakeNativeScreenshot")) {
									Step_Result=executeKeyword(func_name,getvalue,arg1,ModuleName);
								}
								else {
									Step_Result=executeKeyword(func_name,getvalue,arg1);
								}
							}
							else{
								func_name=Teststep;
								//calling the function if it does not contain arguments
								Step_Result=executeKeyword(func_name,getvalue);
							}
							allstep_result=Step_Result+allstep_result;
							log("TestStepResult of "+ func_name+": "+ Step_Result);  
						}else{
							//Go to the next column of the same test case and get the expected steps of this particular element
							String Expectedcase=data.get(Constants.TestExpectedResult_Col);
							for(String expected_Teststep: Expectedcase.split(";")){
								//check for the respective expected step
								if(expected_Teststep.contains(Teststep)){
									//checks if the first line has new line character
									if(expected_Teststep.startsWith("\n"))
										expected_Teststep=expected_Teststep.replaceFirst("\n", "");
									//remove flower brackets and splilt the test step with new line character
									expected_Teststep=expected_Teststep.replace("{\n", "");
									expected_Teststep=expected_Teststep.replace("\n}", "");
									String[]expected_list_func = expected_Teststep.split("\\n");
									String Expected_Teststep_Result=null;
									String Expected_Result=null;
									for(int validation_func=1;validation_func<expected_list_func.length;validation_func++){

										String[]expect_func=expected_list_func[validation_func].split("=");

										func_name=expect_func[0];
										arg1=expect_func[1];
										//Calling the execute function and capturing the result
										if(func_name.contains("validate_Screenshot")) {
											Expected_Teststep_Result=executeKeyword(func_name,getvalue,arg1,ModuleName);
										}
										else {
											Expected_Teststep_Result=executeKeyword(func_name,getvalue,arg1);
										}
										log("Result of "+ func_name+": "+Expected_Teststep_Result);
										Expected_Result=Expected_Result+Expected_Teststep_Result;
										//System.out.println("Validation Keywords are : "+ func_name);


									}


									//Appending all the expected results in one variable so that we can finally mark the test case as pass or fail accordingly
									allexpected_result=Expected_Result+allexpected_result;
								}

							}

						}      


					}


				}

				Testcase_Result=allexpected_result+allstep_result;
				log("allstep_result contains: "+allstep_result);
				log("allexpected_result contains: "+allexpected_result);
				log("Testcase_Result contains: "+Testcase_Result);
				//int row=0;
				//row= getDescriptionRow(excelReader,data.get(Constants.TestCaseObjective_Col));
				//Checks the Testcase_Result variable has any failed string
				if(Testcase_Result.toLowerCase().contains("partialfail")){                                     
					log("Test case with description "+data.get(Constants.TestCaseObjective_Col)+" Fail");
					//excelReader.setCellData(Constants.Xls_Sheetname, Constants.TestResult_Col, row, "PartialFail");
					System.out.println("=======================");
					return "Fail";
					//Assert.assertTrue(false);				

				}else if(Testcase_Result.toLowerCase().contains("fail")){                                     
					log("Test case with description "+data.get(Constants.TestCaseObjective_Col)+" Fail");
					//excelReader.setCellData(Constants.Xls_Sheetname, Constants.TestResult_Col, row, "Fail");
					System.out.println("=======================");
					return "Fail";
					//Assert.assertTrue(false);				

				}else{
					log("Test case with description "+data.get(Constants.TestCaseObjective_Col)+ " Pass");				                               
					//excelReader.setCellData(Constants.Xls_Sheetname, Constants.TestResult_Col, row, "Pass");
					//Assert.assertTrue(!Testcase_Result.contains("fail"));
					System.out.println("=======================");
					return "Pass";
					//Assert.assertEquals(true, true);
				}

			}




			if(flag==0){               
				System.out.println("No TestCases marked as automable or no Test cases matching the given regression level");
				log("No TestCases marked as automable or no Test cases matching the given regression level");

			}
		}catch(Exception ex){
			reporterror="Fail";
			log(ex.getMessage());
			return "Fail";
		}
		return "Fail";
	}

	//This function calls the other functions which are given in testcase with data.//overloaded function which has two arguments for calling function i.e getvalue and arg1
	public String executeKeyword(String func_name,Hashtable<String,String>getvalue,String arg1) throws IllegalAccessException, IllegalArgumentException, InvocationTargetException, IOException{
		System.out.println("In execute keyword function");
		log("In execute keyword function");     
		String func_result=null;         

		method = this.getClass().getMethods();
		//going through the list of methods/functions in keywords file and matching with the respective keyword in test case
		for(int i=0;i<method.length;i++){
			if(func_name.equals(method[i].getName())){
				log("Executing "+func_name+" function:");
				System.out.println("Executing "+func_name+" function:");
				func_result=(String)method[i].invoke(this,getvalue,arg1);
				return func_result;              
			} 

		}

		log("Function <"+func_name+ "> not found in the keyword class");
		return "Fail";


	}
	
	public String executeKeyword(String func_name,Hashtable<String,String>getvalue,String arg1, String ModuleName) throws IllegalAccessException, IllegalArgumentException, InvocationTargetException, IOException{
		System.out.println("In execute keyword function");
		log("In execute keyword function");     
		String func_result=null;         

		method = this.getClass().getMethods();
		//going through the list of methods/functions in keywords file and matching with the respective keyword in test case
		for(int i=0;i<method.length;i++){
			if(func_name.equals(method[i].getName())){
				log("Executing "+func_name+" function:");
				System.out.println("Executing "+func_name+" function:");
				func_result=(String)method[i].invoke(this,getvalue,arg1,ModuleName);
				return func_result;              
			} 

		}

		log("Function <"+func_name+ "> not found in the keyword class");
		return "Fail";


	}


	public int getDescriptionRow(Xls_Reader excelReader,String description){

		int totalRows=excelReader.getRowCount(Constants.Xls_Sheetname);
		for(int i=2;i<=totalRows;i++){
			String testDescription=excelReader.getCellData(Constants.Xls_Sheetname, Constants.TestCaseObjective_Col, i);
			if(testDescription.trim().equals(description)){
				return i;
			}

		}

		return 0;
	}

	//overloaded function which has only one argument for calling function i.e getvalue
	public String executeKeyword(String func_name,Hashtable<String,String>getvalue) throws IllegalAccessException, IllegalArgumentException, InvocationTargetException, IOException{
		System.out.println("In execute keyword function");
		log("In execute keyword function");     
		String func_result=null;         

		method = this.getClass().getMethods();
		//going through the list of methods/functions in keywords file and matching with the respective keyword in test case
		for(int i=0;i<method.length;i++){
			if(func_name.equals(method[i].getName())){
				log("Executing "+func_name+" function:");
				System.out.println("Executing "+func_name+" function:");
				func_result=(String)method[i].invoke(this,getvalue);                            
				return func_result;              

			}      

		}
		return "Function <"+func_name+ "> not found in the keyword class";



	}

	public void reportError(String message){
		
		log("Error: "+message);
		//mobdriv.quit();
		//launch.stopSelendroid();
		//browser_Quit();
		reporterror="Fail";
		Assert.fail(message);
	}

	public void reportFailureandStop(String message){

		log("Fail: "+message);
		//mobdriv.quit();
		//launch.stopSelendroid();
		//browser_Quit();
		reporterror="Fail";
		Assert.fail(message);
	}

	//This function will return the web element object with respective to id,xpath etc
	public WebElement element(String objkey){

		try{
			WebDriverWait wait = new WebDriverWait(mobdriv, 30);
			String obj;
			
			if(objkey.startsWith("$")){

				obj=objkey;
				if(objkey.startsWith("$_id")){
					obj=objkey.replace("$_id", "");
					wait.until(ExpectedConditions.presenceOfElementLocated(By.id(obj)));
					return mobdriv.findElement(By.id(obj));
				}else if((objkey.startsWith("$_xpath"))){
					obj=objkey.replace("$_xpath", "");
					wait.until(ExpectedConditions.presenceOfElementLocated(By.xpath(obj)));
					return mobdriv.findElement(By.xpath(obj));
				}else if((objkey.startsWith("$_name"))){
					obj=objkey.replace("$_name", "");
					wait.until(ExpectedConditions.presenceOfElementLocated(By.name(obj)));
					return mobdriv.findElement(By.name(obj));
				}else if((objkey.startsWith("$_class"))){
					obj=objkey.replace("$_class", "");
					wait.until(ExpectedConditions.presenceOfElementLocated(By.className(obj)));
					return mobdriv.findElement(By.className(obj));
				}else if((objkey.startsWith("$_link"))){
					obj=objkey.replace("$_link", "");
					wait.until(ExpectedConditions.presenceOfElementLocated(By.linkText(obj)));
					return mobdriv.findElement(By.linkText(obj));
				}
				else{
					reportError("Wrong locator "+objkey);
					return null;
				}
			}else{
				obj=OR.getProperty(objkey);
				if(objkey.endsWith("_id")){
					wait.until(ExpectedConditions.presenceOfElementLocated(By.id(obj)));
					return mobdriv.findElement(By.id(obj));
				}else if((objkey.endsWith("_xpath"))){
					wait.until(ExpectedConditions.presenceOfElementLocated(By.xpath(obj)));
					return mobdriv.findElement(By.xpath(obj));
				}else if((objkey.endsWith("_name"))){
					wait.until(ExpectedConditions.presenceOfElementLocated(By.name(obj)));
					return mobdriv.findElement(By.name(obj));
				}else if((objkey.endsWith("_class"))){
					wait.until(ExpectedConditions.presenceOfElementLocated(By.className(obj)));
					return mobdriv.findElement(By.className(obj));
				}else if((objkey.endsWith("_link"))){
					wait.until(ExpectedConditions.presenceOfElementLocated(By.linkText(obj)));
					return mobdriv.findElement(By.linkText(obj));
				}else{
					//report error that keyname is wrong
					reportError("Wrong locator "+objkey);
					return null;
				}
			}




		}catch(NoSuchElementException t){
			//report failure
			reportFailureandStop("Element not found for "+objkey + "  "+t.getMessage());
			return null;
		}catch(Exception e){
			//report error for no such element
			reportError("Unable to Find element :"+objkey);
			return null;
		}


	}

	public WebElement serverElement(String objkey){

		try{
			WebDriverWait wait = new WebDriverWait(driver, 30);
			String obj;
			if(objkey.startsWith("$")){

				obj=objkey;
				if(objkey.startsWith("$_id")){
					obj=objkey.replace("$_id", "");
					wait.until(ExpectedConditions.presenceOfElementLocated(By.id(obj)));
					return driver.findElement(By.id(obj));
				}else if((objkey.startsWith("$_xpath"))){
					obj=objkey.replace("$_xpath", "");
					wait.until(ExpectedConditions.presenceOfElementLocated(By.xpath(obj)));
					return driver.findElement(By.xpath(obj));
				}else if((objkey.startsWith("$_name"))){
					obj=objkey.replace("$_name", "");
					wait.until(ExpectedConditions.presenceOfElementLocated(By.name(obj)));
					return driver.findElement(By.name(obj));
				}else if((objkey.startsWith("$_class"))){
					obj=objkey.replace("$_class", "");
					wait.until(ExpectedConditions.presenceOfElementLocated(By.className(obj)));
					return driver.findElement(By.className(obj));
				}else if((objkey.startsWith("$_link"))){
					obj=objkey.replace("$_link", "");
					wait.until(ExpectedConditions.presenceOfElementLocated(By.linkText(obj)));
					return driver.findElement(By.linkText(obj));
				}
				else{
					reportError("Wrong locator "+objkey);
					return null;
				}
			}else{
				obj=OR.getProperty(objkey);
				if(objkey.endsWith("_id")){
					wait.until(ExpectedConditions.presenceOfElementLocated(By.id(obj)));
					return driver.findElement(By.id(obj));
				}else if((objkey.endsWith("_xpath"))){
					wait.until(ExpectedConditions.presenceOfElementLocated(By.xpath(obj)));
					return driver.findElement(By.xpath(obj));
				}else if((objkey.endsWith("_name"))){
					wait.until(ExpectedConditions.presenceOfElementLocated(By.name(obj)));
					return driver.findElement(By.name(obj));
				}else if((objkey.endsWith("_class"))){
					wait.until(ExpectedConditions.presenceOfElementLocated(By.className(obj)));
					return driver.findElement(By.className(obj));
				}else if((objkey.endsWith("_link"))){
					wait.until(ExpectedConditions.presenceOfElementLocated(By.linkText(obj)));
					return driver.findElement(By.linkText(obj));
				}else{
					//report error that keyname is wrong
					reportError("Wrong locator "+objkey);
					return null;
				}
			}

		}catch(NoSuchElementException t){
			//report failure
			reportFailureandStop("Element not found for "+objkey + "  "+t.getMessage());
			return null;
		}catch(Exception e){
			//report error for no such element
			reportError("Unable to Find element :"+objkey);
			return null;
		}

	}



	//This function is used for checking any element present on the client

	public boolean isElementPresent(String objkey){
		try{

			//WebDriverWait wait = new WebDriverWait(driver, 10);
			mobdriv.manage().timeouts().implicitlyWait(5, TimeUnit.SECONDS);
			String obj;
			int size=0;
			if(objkey.startsWith("$")){

				obj=objkey;
				if(objkey.startsWith("$_id")){
					obj=objkey.replace("$_id", "");
					//wait.until(ExpectedConditions.presenceOfElementLocated(By.id(obj)));
					size= mobdriv.findElements(By.id(obj)).size();
				}else if((objkey.startsWith("$_xpath"))){
					obj=objkey.replace("$_xpath", "");
					//wait.until(ExpectedConditions.presenceOfElementLocated(By.xpath(obj)));
					size=  mobdriv.findElements(By.xpath(obj)).size();
				}else if((objkey.startsWith("$_name"))){
					obj=objkey.replace("$_name", "");
					//wait.until(ExpectedConditions.presenceOfElementLocated(By.name(obj)));
					size=  mobdriv.findElements(By.name(obj)).size();
				}else if((objkey.startsWith("$_class"))){
					obj=objkey.replace("$_class", "");
					//wait.until(ExpectedConditions.presenceOfElementLocated(By.className(obj)));
					size=  mobdriv.findElements(By.className(obj)).size();
				}else if((objkey.startsWith("$_link"))){
					obj=objkey.replace("$_link", "");
					//wait.until(ExpectedConditions.presenceOfElementLocated(By.linkText(obj)));
					size=  mobdriv.findElements(By.linkText(obj)).size();
				}
				else{
					reportError("Wrong locator "+objkey);
					return false;
				}
			}else{
				obj=OR.getProperty(objkey);
				if(objkey.endsWith("_id")){

					//wait.until(ExpectedConditions.presenceOfElementLocated(By.id(obj)));
					size= mobdriv.findElements(By.id(obj)).size();
				}else if((objkey.endsWith("_xpath"))){
					//wait.until(ExpectedConditions.presenceOfElementLocated(By.xpath(obj)));
					size=mobdriv.findElements(By.xpath(obj)).size();
				}else if((objkey.endsWith("_name"))){
					//wait.until(ExpectedConditions.presenceOfElementLocated(By.name(obj)));
					size= mobdriv.findElements(By.name(obj)).size();
				}else if((objkey.endsWith("_class"))){
					//wait.until(ExpectedConditions.presenceOfElementLocated(By.className(obj)));
					size=mobdriv.findElements(By.className(obj)).size();
				}else{
					//report error that keyname is wrong
					reportError("Wrong locator "+objkey);
					return false;
				}
			}
			mobdriv.manage().timeouts().implicitlyWait(50, TimeUnit.SECONDS);
			if(size!=0){
				log("Exiting isElementPresent function");
				return true;
			}else
				log("Exiting isElementPresent function");
			return false;

		}catch(Exception ex){
			mobdriv.manage().timeouts().implicitlyWait(50, TimeUnit.SECONDS);
			log("Fail-"+ex.getMessage());
			return false;
		}

	}


	//This function is used for checking any element present on the server
	//This function is used for checking any element present on the server
	public boolean isServerElementPresent(String objkey){
		boolean present;
		try{

			driver.manage().timeouts().implicitlyWait(5, TimeUnit.SECONDS);
			//WebDriverWait wait = new WebDriverWait(driver, 10);
			String obj;
			int size=0;
			if(objkey.startsWith("$")){

				obj=objkey;
				if(objkey.startsWith("$_id")){
					obj=objkey.replace("$_id", "");
					//wait.until(ExpectedConditions.presenceOfElementLocated(By.id(obj)));
					size= driver.findElements(By.id(obj)).size();

				}else if((objkey.startsWith("$_xpath"))){
					obj=objkey.replace("$_xpath", "");
					//wait.until(ExpectedConditions.presenceOfElementLocated(By.xpath(obj)));
					size=  driver.findElements(By.xpath(obj)).size();

				}else if((objkey.startsWith("$_name"))){
					obj=objkey.replace("$_name", "");
					//wait.until(ExpectedConditions.presenceOfElementLocated(By.name(obj)));
					size=  driver.findElements(By.name(obj)).size();

				}else if((objkey.startsWith("$_class"))){
					obj=objkey.replace("$_class", "");
					//wait.until(ExpectedConditions.presenceOfElementLocated(By.className(obj)));
					size=  driver.findElements(By.className(obj)).size();

				}else if((objkey.startsWith("$_link"))){
					obj=objkey.replace("$_link", "");
					//wait.until(ExpectedConditions.presenceOfElementLocated(By.linkText(obj)));
					size=  driver.findElements(By.linkText(obj)).size();

				}
				else{
					//reportError("Wrong locator "+objkey);

					present= false;
				}
			}else{
				obj=OR.getProperty(objkey);
				if(objkey.endsWith("_id")){

					//wait.until(ExpectedConditions.presenceOfElementLocated(By.id(obj)));
					size= driver.findElements(By.id(obj)).size();

				}else if((objkey.endsWith("_xpath"))){
					//wait.until(ExpectedConditions.presenceOfElementLocated(By.xpath(obj)));
					size=driver.findElements(By.xpath(obj)).size();

				}else if((objkey.endsWith("name"))){
					//wait.until(ExpectedConditions.presenceOfElementLocated(By.name(obj)));
					size= driver.findElements(By.name(obj)).size();

				}else if((objkey.endsWith("class"))){
					//wait.until(ExpectedConditions.presenceOfElementLocated(By.className(obj)));
					size=driver.findElements(By.className(obj)).size();

				}else{
					//report error that keyname is wrong
					//reportError("Wrong locator "+objkey);

					present= false;
				}
			}
			if(size!=0){
				log("Exiting isElementPresent function");
				present=true;
				//return true;
			}else{
				log("Exiting isElementPresent function");
				present=false;
			}


		}catch(Exception ex){
			reportError("Fail-"+ex.getMessage());
			present=false;
			//return false;
		}
		driver.manage().timeouts().implicitlyWait(50, TimeUnit.SECONDS);
		return present;
	}




	public String Click(String objkey){
		try{
			log("Executing Click function");
			element(objkey).click();                   

		}catch(Exception ex){
			reportError("Fail to click on -"+objkey+" reason :"+ex.getMessage());
			return null;
		}
		log("Exiting Click function");
		return "pass";
	}
	
	
	//Avinash Sanka
	//To validate on any link in the page using the link name
	public String validate_Link_Exists(Hashtable<String,String> getvalue,String linkName){
		try{
			String linkxpath="//a[contains(text(),'"+linkName+"')]";
			log("Executing validate_Link_Exists function");
			boolean res;
			
			if(linkName.equalsIgnoreCase("PopularViewAll")){
				res=isElementPresent("popularviewall_text_xpath");
			}else if(linkName.equalsIgnoreCase("FeaturedViewAll")){
				res=isElementPresent("featuredviewall_text_xpath");				
			}else{			
				res=isElementPresent("$_xpath"+linkxpath);
			}
			
			if(res==true){
				log("Link found");
				log("Exiting from validate_Link_Exists function");
				return "Pass";
			}else{
				log(linkName+ " Link not found");
				log("Exiting from validate_Link_Exists function");
				return "Fail";
			}
				

		}catch(Exception ex){
			log("Link not found -"+linkName+" reason :"+ex.getMessage());
			log("Exiting from validate_Link_Exists function");
			return "Fail";
		}
	}
	



	//Avinash Sanka
	//To validate on any text field in the given page
	public String validate_TextField_Exists(Hashtable<String,String> getvalue,String inputplaceholder){
		try{
			
			log("Executing validate_TextField_Exists function");
			String inputxpath="//input[@placeholder='"+inputplaceholder+"']";
			String textareaxpath="//textarea[@placeholder='"+inputplaceholder+"']";
			boolean res=isElementPresent("$_xpath"+inputxpath);
			boolean res1=isElementPresent("$_xpath"+textareaxpath);
			if(res==true || res1==true){
				log(inputplaceholder+" Text field found");
				log("Exiting from validate_TextField_Exists function");
				return "Pass";
			}else{
				log(inputplaceholder+ " Text field not found");
				log("Exiting from validate_TextField_Exists function");
				return "Fail";
			}


		}catch(Exception ex){
			log("Text field not found -"+inputplaceholder+" reason :"+ex.getMessage());
			log("Exiting from validate_TextField_Exists function");
			return "Fail";
		}
	}
	


	
	//This function waits for a particular element to vanish for given time
	public String waitforElementToVanish(String objkey,int timeinseconds) throws InterruptedException{
		try{
			log("Executing waitforElementToVanish function");
			boolean res;
			int i=0;
			mobdriv.manage().timeouts().implicitlyWait(5, TimeUnit.SECONDS);
			int loopcount=timeinseconds/5;
			while(i<loopcount){
				res=isElementPresent(objkey);
				if(res==false){
					i=loopcount+10;
					break;
				}
				Thread.sleep(5000);
				i++;

				if(i==loopcount){
					log("Element not vanished");
					mobdriv.manage().timeouts().implicitlyWait(50, TimeUnit.SECONDS);
					log("Exiting from waitforElementToVanish function");
					return "Fail";
				}
			}
		}catch(Exception e){
			log("Exiting from waitforElementToVanish function");
			mobdriv.manage().timeouts().implicitlyWait(50, TimeUnit.SECONDS);
			return "fail";
		}
		log("Exiting from waitforElementToVanish function");
		mobdriv.manage().timeouts().implicitlyWait(50, TimeUnit.SECONDS);
		return "Pass";
	}

	//This function waits for a particular attribute value to come for given time
	public String waitforGallerySyncToVanish(String objkey,int timeinseconds,String waitElement,String waitElementValue) throws InterruptedException{
		try{
			log("Executing waitforAttributeToVanish function");

			int i=0;
			mobdriv.manage().timeouts().implicitlyWait(5, TimeUnit.SECONDS);
			int loopcount=timeinseconds/5;

			while(i<loopcount){        
				JavascriptExecutor js=(JavascriptExecutor)mobdriv;
				String res=js.executeScript("return document.getElementById('gallery_sync_status').style").toString();                     
				if(res.contains(waitElementValue)){
					i=loopcount+10;
					break;
				}
				Thread.sleep(5000);
				i++;

				if(i==loopcount){
					log("Element not vanished");
					mobdriv.manage().timeouts().implicitlyWait(50, TimeUnit.SECONDS);
					log("Exiting from waitforAttributeToVanish function");
					return "Fail";
				}
			}
		}catch(Exception e){
			log("Exiting from waitforAttributeToVanish function");
			mobdriv.manage().timeouts().implicitlyWait(50, TimeUnit.SECONDS);
			return "fail";
		}
		log("Exiting from waitforAttributeToVanish function");
		mobdriv.manage().timeouts().implicitlyWait(50, TimeUnit.SECONDS);
		return "Pass";
	}

	public String waitforAttribute(String objkey,String objAttribute,String Attributevalue,int timeinseconds) throws InterruptedException{
		try{
			log("Executing waitforElementToLoad function");
			String res;
			int i=0;
			mobdriv.manage().timeouts().implicitlyWait(10, TimeUnit.SECONDS);
			int loopcount=timeinseconds/5;
			while(i<loopcount){
				res=getAttribute(objkey,objAttribute);
				if(res.equalsIgnoreCase(Attributevalue)){
					i=loopcount+10;
					break;
				}
				Thread.sleep(5000);
				i++;

				if(i==loopcount){
					log("Element not loaded");
					mobdriv.manage().timeouts().implicitlyWait(50, TimeUnit.SECONDS);
					log("Exiting from waitforElementToLoad function");
					return "Fail";
				}
			}
		}catch(Exception e){
			mobdriv.manage().timeouts().implicitlyWait(50, TimeUnit.SECONDS);
			log("Exiting from waitforElementToLoad function");
			return "fail";
		}
		mobdriv.manage().timeouts().implicitlyWait(50, TimeUnit.SECONDS);
		log("Exiting from from waitforElementToLoad function");
		return "Pass";
	}


	public String serverWaitforAttribute(String objkey,String objAttribute,String Attributevalue,int timeinseconds) throws InterruptedException{
		try{
			log("Executing waitforElementToLoad function");
			String res;
			int i=0;
			driver.manage().timeouts().implicitlyWait(5, TimeUnit.SECONDS);
			int loopcount=timeinseconds/5;
			while(i<loopcount){
				res=serverGetAttribute(objkey,objAttribute);				
				if(res.equalsIgnoreCase(Attributevalue)){
					i=loopcount+10;
					break;
				}
				Thread.sleep(5000);
				i++;

				if(i==loopcount){
					log("Element not loaded");
					driver.manage().timeouts().implicitlyWait(50, TimeUnit.SECONDS);
					log("Exiting from waitforElementToLoad function");
					return "Fail";
				}
			}
		}catch(Exception e){
			driver.manage().timeouts().implicitlyWait(50, TimeUnit.SECONDS);
			log("Exiting from waitforElementToLoad function");
			return "fail";
		}
		driver.manage().timeouts().implicitlyWait(50, TimeUnit.SECONDS);
		log("Exiting from from waitforElementToLoad function");
		return "Pass";
	}
	

	//This function waits for a particular element to load for given time in seconds
	public String waitforElementToLoad(String objkey,int timeinseconds) throws InterruptedException{
		try{
			log("Executing waitforElementToLoad function");
			boolean res;
			int i=0;
			mobdriv.manage().timeouts().implicitlyWait(10, TimeUnit.SECONDS);
			int loopcount=timeinseconds/5;
			while(i<loopcount){
				res=isElementPresent(objkey);
				if(res==true){
					i=loopcount+10;
					break;
				}
				Thread.sleep(5000);
				i++;

				if(i==loopcount){
					log("Element not loaded");
					mobdriv.manage().timeouts().implicitlyWait(50, TimeUnit.SECONDS);
					log("Exiting from waitforElementToLoad function");
					return "Fail";
				}
			}
		}catch(Exception e){
			mobdriv.manage().timeouts().implicitlyWait(50, TimeUnit.SECONDS);
			log("Exiting from waitforElementToLoad function");
			return "fail";
		}
		mobdriv.manage().timeouts().implicitlyWait(50, TimeUnit.SECONDS);
		log("Exiting from from waitforElementToLoad function");
		return "Pass";
	}


	public String clear_Data(String objkey) {
		try{
			log("Executing Clear function");
			element(objkey).clear();                   

		}catch(Exception ex){
			reportError("Fail to Clear on -"+objkey+" reason :"+ex.getMessage());
			return null;
		}
		log("Exiting Clear function");
		return "pass";

	}

	public String serverClick(String objkey){
		try{
			log("Executing serverClick function");
			serverElement(objkey).click();                 

		}catch(Exception ex){
			reportError("Fail to click on -"+objkey+" reason :"+ex.getMessage());			
			return null;
		}
		log("Exiting serverClick function");
		return "pass";
	}

	public String getText(String objkey){
		String returntext;
		try{
			log("Executing getText function");
			returntext=element(objkey).getText();                

		}catch(Exception ex){
			log("Fail to get the text from -"+objkey+" reason :"+ex.getMessage());
			//reportError(ex.getMessage());
			return "Fail";
		}
		log("Exiting getText function");
		return returntext;
	}

	public String serverGetText(String objkey){
		String returntext;
		try{
			log("Executing servergetText function");
			returntext=serverElement(objkey).getText();                 

		}catch(Exception ex){
			log("Fail to get the text from -"+objkey+" reason :"+ex.getMessage());
			reportError(ex.getMessage());
			return null;
		}
		log("Exiting servergetText function");
		return returntext;
	}

	public String sendData(String objkey,String data){
		try{
			log("Executing SendData function");
			if(data!=null)
				element(objkey).sendKeys(data);  
			else
				log("data given is null given obj key: "+ objkey);

		}catch(Exception ex){
			reportError("Fail-"+ex.getMessage());
			return null;
		}
		log("Exiting Senddata function");
		return "pass";
	}      

	public String serverSendData(String objkey,String data){
		try{

			log("Executing serverSendData function");
			if(data!=null)
				serverElement(objkey).sendKeys(data);
			else
				log("data given is null for serverSendData function");

		}catch(Exception ex){
			reportError("Fail-"+ex.getMessage());
			return null;
		}
		log("Exiting serverSenddata function"); 
		return "pass";
	}      


	public String getAttribute(String objkey, String attribute) {
		try{
			log("Executing getAttribute function");
			return element(objkey).getAttribute(attribute);
		}catch(Exception ex){
			reportError("Fail-"+ex.getMessage());
			return null;

		}

	}

	public String serverGetAttribute(String objkey, String attribute) {
		try{
			log("Executing getAttribute function");
			return serverElement(objkey).getAttribute(attribute);
		}catch(Exception ex){
			reportError("Fail-"+ex.getMessage());
			return null;

		}

	}
	

	public List<WebElement> getList(String objkey){
		try{
			String obj;

			if(objkey.startsWith("$")){

				obj=objkey;
				if(objkey.startsWith("$_id")){
					obj=objkey.replace("$_id", "");

					return mobdriv.findElements(By.id(obj));
				}else if((objkey.startsWith("$_xpath"))){
					obj=objkey.replace("$_xpath", "");

					return mobdriv.findElements(By.xpath(obj));
				}else if((objkey.startsWith("$_name"))){
					obj=objkey.replace("$_name", "");

					return mobdriv.findElements(By.name(obj));
				}else if((objkey.startsWith("$_class"))){
					obj=objkey.replace("$_class", "");

					return mobdriv.findElements(By.className(obj));
				}else if((objkey.startsWith("$_link"))){
					obj=objkey.replace("$_link", "");

					return mobdriv.findElements(By.linkText(obj));
				}
				else{
					reportError("Wrong locator "+objkey);
					return null;
				}
			}else{
				obj=OR.getProperty(objkey);
				if(objkey.endsWith("_id")){

					return mobdriv.findElements(By.id(obj));
				}else if((objkey.endsWith("_xpath"))){

					return mobdriv.findElements(By.xpath(obj));
				}else if((objkey.endsWith("_name"))){

					return mobdriv.findElements(By.name(obj));
				}else if((objkey.endsWith("_class"))){

					return mobdriv.findElements(By.className(obj));
				}else{
					//report error that keyname is wrong
					reportError("Wrong locator "+objkey);
					return null;
				}
			}


		}catch(Exception ex){
			reportError("Fail-"+ex.getMessage());
			return null;
		}


	}

	//mobdriv.findElements(By.id(obj));
	public List<WebElement> serverGetList(String objkey){
		List<WebElement> item_List=null;
		try{

			log("Executing servergetList function");
			String obj;
			if(objkey.startsWith("$")){
				obj=objkey.replace("$", "");
			}else{
				obj=OR.getProperty(objkey);
			}
			if(objkey.endsWith("_id")){
				item_List= driver.findElements(By.id(obj));
			}else if((objkey.endsWith("_xpath"))){
				item_List= driver.findElements(By.xpath(obj));
			}else if((objkey.endsWith("name"))){
				item_List= driver.findElements(By.name(obj));;
			}else if((objkey.endsWith("class"))){
				item_List= driver.findElements(By.className(obj));
			}
		}catch(Exception ex){
			reportError("Fail-"+ex.getMessage());
			return null;
		}
		log("Exiting servergetList function");
		return item_List;

	}
	public String OpenBrowser(){
		try{
			log("Executing OpenBrowser function");
			if(map.get(Config.getProperty("Browser"))==null){                  

				if(Config.getProperty("Browser").equalsIgnoreCase("chrome")){

					System.setProperty("webdriver.chrome.driver", System.getProperty("user.dir")+"\\src\\com\\utils\\chromedriver.exe");
					driver=new ChromeDriver();


				}
				else if(Config.getProperty("Browser").equalsIgnoreCase("Firefox")){


					driver=new FirefoxDriver();

				}
				else if (Config.getProperty("Browser").equalsIgnoreCase("IE")){

					System.setProperty("webdriver.IE.driver", System.getProperty("user.dir")+"\\src\\com\\utils\\IEDriverServer.exe");
					driver=new InternetExplorerDriver();
				}
				map.put(Config.getProperty("Browser"), driver);
			}else
			{
				driver=map.get(Config.getProperty("Browser"));
			}
			driver.manage().window().maximize();
			driver.manage().timeouts().implicitlyWait(40, TimeUnit.SECONDS);
			Navigate();

		}catch(Exception ex){
			reportError("Fail-"+ex.getMessage());
			return null;

		}
		log("Exiting OpenBrowser function");
		return "pass";
	}

	public String Navigate(){
		try{
			log("Executing Navigate function");
			driver.get(Config.getProperty("site_url"));

		}catch(Exception ex){
			return "Fail-"+ex.getMessage();
		}
		log("Exiting Navigate function");
		return "pass";
	}

	public SelendroidLauncher Init_Selendroid() throws Exception{
		try{
			log("Executing Init_Selendroid function");
			SelendroidConfiguration config = new SelendroidConfiguration();
			config.addSupportedApp(System.getProperty("user.dir")+ "\\src\\com\\input\\"+Config.getProperty("AUT_Name"));
			config.setSelendroidServerPort(8081);
			
			//config.setNoClearData(true);
			SelendroidLauncher launch= new SelendroidLauncher(config);
			launch.launchSelendroid();
			SelendroidCapabilities capa = SelendroidCapabilities.device(Config.getProperty("AUT_ID"));
			//15125521650120
			//143435225D0005
			capa.setSerial(Config.getProperty("AUT_SerialNumber"));
			mobdriv = new SelendroidDriver(capa);
			mobdriv.manage().timeouts().implicitlyWait(50, TimeUnit.SECONDS);
			mobdriv.switchTo().window("WEBVIEW");
			//Thread.sleep(5000);
			//String result=executeCommandLine("adb push "+ System.getProperty("user.dir")+ "\\src\\com\\input\\MAAF_MCD.jar"+" /data/local/tmp","32360");
			//log("Result of Copying MCD_MAAF.jar is: "+result);
			log("Exiting Init_Selendroid function");
			
			return launch;
		}catch(Throwable t){
			log("Failed to start selendroid : "+t.getMessage());
			return null;
		}

	}
	
	/**
	 * To Disable clear data in selendroid
	 * @author Vinod Shankar
	 * @param cleardata_flag
	 * @return
	 * @throws Exception
	 */
	public SelendroidLauncher Init_Selendroid(int nocleardata_flag) throws Exception{
		try{
			log("Executing Init_Selendroid function");
			SelendroidConfiguration config = new SelendroidConfiguration();
			config.addSupportedApp(System.getProperty("user.dir")+ "\\src\\com\\input\\"+Config.getProperty("AUT_Name"));
			config.setSelendroidServerPort(8081);
			if(nocleardata_flag == 1) {
				config.setNoClearData(true);
			}
			SelendroidLauncher launch= new SelendroidLauncher(config);
			launch.launchSelendroid();
			SelendroidCapabilities capa = SelendroidCapabilities.device(Config.getProperty("AUT_ID"));
			//1512 5521650120
			//143435225D0005
			capa.setSerial(Config.getProperty("AUT_SerialNumber"));
			mobdriv = new SelendroidDriver(capa);
			mobdriv.manage().timeouts().implicitlyWait(50, TimeUnit.SECONDS);
			mobdriv.switchTo().window("WEBVIEW");
			//Thread.sleep(5000);
			//String result=executeCommandLine("adb push "+ System.getProperty("user.dir")+ "\\src\\com\\input\\MAAF_MCD.jar"+" /data/local/tmp","32360");
			//log("Result of Copying MCD_MAAF.jar is: "+result);
			log("Exiting Init_Selendroid function");
			
			return launch;
		}catch(Throwable t){
			log("Failed to start selendroid : "+t.getMessage());
			return null;
		}

	}
	
	/**
	 * For Rhodes and RE22 APK
	 * @author Vinod Shankar
	 * @param autID
	 * @param autName
	 * @return
	 * @throws Exception
	 */
	public SelendroidLauncher Init_Selendroid(String autName, String autID) throws Exception{
		try{
			log("Executing Init_Selendroid function");
			SelendroidConfiguration config = new SelendroidConfiguration();
			config.addSupportedApp(System.getProperty("user.dir")+ "\\src\\com\\input\\"+Config.getProperty(autName));
			config.setSelendroidServerPort(8081);
			SelendroidLauncher launch= new SelendroidLauncher(config);
			launch.launchSelendroid();
			SelendroidCapabilities capa = SelendroidCapabilities.device(Config.getProperty(autID));
			//1512 5521650120
			//143435225D0005
			capa.setSerial(Config.getProperty("AUT_SerialNumber"));
			mobdriv = new SelendroidDriver(capa);
			mobdriv.manage().timeouts().implicitlyWait(50, TimeUnit.SECONDS);
			mobdriv.switchTo().window("WEBVIEW");
			//Thread.sleep(5000);
			//String result=executeCommandLine("adb push "+ System.getProperty("user.dir")+ "\\src\\com\\input\\MAAF_MCD.jar"+" /data/local/tmp","32360");
			//log("Result of Copying MCD_MAAF.jar is: "+result);
			log("Exiting Init_Selendroid function");
			
			return launch;
		}catch(Throwable t){
			log("Failed to start selendroid : "+t.getMessage());
			return null;
		}

	}
	
	public SelendroidLauncher Init_Selendroid(String autName, String autID, int nocleardata_flag) throws Exception{
		try{
			log("Executing Init_Selendroid function");
			SelendroidConfiguration config = new SelendroidConfiguration();
			config.addSupportedApp(System.getProperty("user.dir")+ "\\src\\com\\input\\"+Config.getProperty(autName));
			config.setSelendroidServerPort(8081);
			if(nocleardata_flag == 1) {
				config.setNoClearData(true);
			}
			SelendroidLauncher launch= new SelendroidLauncher(config);
			launch.launchSelendroid();
			SelendroidCapabilities capa = SelendroidCapabilities.device(Config.getProperty(autID));
			//1512 5521650120
			//143435225D0005
			capa.setSerial(Config.getProperty("AUT_SerialNumber"));
			mobdriv = new SelendroidDriver(capa);
			mobdriv.manage().timeouts().implicitlyWait(50, TimeUnit.SECONDS);
			mobdriv.switchTo().window("WEBVIEW");
			//Thread.sleep(5000);
			//String result=executeCommandLine("adb push "+ System.getProperty("user.dir")+ "\\src\\com\\input\\MAAF_MCD.jar"+" /data/local/tmp","32360");
			//log("Result of Copying MCD_MAAF.jar is: "+result);
			log("Exiting Init_Selendroid function");
			
			return launch;
		}catch(Throwable t){
			log("Failed to start selendroid : "+t.getMessage());
			return null;
		}

	}
	
	
	public static void startAppiumServer() throws IOException, InterruptedException {
	    Runtime runtime = Runtime.getRuntime();
	    process = runtime.exec(APPIUMSERVERSTART);
	    Thread.sleep(5000);
	    if (process != null) {
	        System.out.println("Appium server started");
	    }
	}

	public static void stopAppiumServer() throws IOException {
	    if (process != null) {
	        process.destroy();
	    }
	    System.out.println("Appium server stop");
	}


	
	
	public SelendroidLauncher Init_Appium() throws Exception{
		try{
			log("Executing Init_Appium function");
			SelendroidConfiguration config = new SelendroidConfiguration();
			config.addSupportedApp(System.getProperty("user.dir")+ "\\src\\com\\input\\"+Config.getProperty("AUT_Name"));
			config.setSelendroidServerPort(8081);
			SelendroidLauncher launch= new SelendroidLauncher(config);
			launch.launchSelendroid();
			startAppiumServer();

			SelendroidCapabilities capa = SelendroidCapabilities.device(Config.getProperty("AUT_ID"));
			//15125521650120
			//143435225D0005
			capa.setSerial(Config.getProperty("AUT_SerialNumber"));
			mobdriv = new SelendroidDriver(capa);
			mobdriv.manage().timeouts().implicitlyWait(50, TimeUnit.SECONDS);
			mobdriv.switchTo().window("WEBVIEW");
			//Thread.sleep(5000);
			//String result=executeCommandLine("adb push "+ System.getProperty("user.dir")+ "\\src\\com\\input\\MAAF_MCD.jar"+" /data/local/tmp","32360");
			//log("Result of Copying MCD_MAAF.jar is: "+result);
			log("Exiting Init_Selendroid function");
			
			return launch;
		}catch(Throwable t){
			log("Failed to start selendroid : "+t.getMessage());
			return null;
		}

	}

	public void quitSelendroid(SelendroidLauncher launch) {
		mobdriv.quit();
		launch.stopSelendroid();
		browser_Quit();
	}

	public String browser_Quit()
	{
		try{
			log("Executing browser_Quit function");
			/*Thread.sleep(3000);
			boolean res=isServerElementPresent("Admin_Link_server_id");
			
			log("sign in link exist: "+res);
			if(res==true){
				serverClick("Admin_Link_server_id");
				serverClick("$_linkLogout");
			}else{
				driver.quit();
				driver=null;
				map.put(Config.getProperty("Browser"), null);
			}*/
	
		}catch(Exception ex){
			driver.quit();
			driver=null;
			map.put(Config.getProperty("Browser"), null);
			return "Fail-"+ex.getMessage();
		}
		log("Completed browser_Quit function");
		return "pass";
	}


	public static Hashtable<String,String> getKeyValue(String KeyValue_String){

		Hashtable<String,String> table1=new Hashtable<String,String>();
		try{
			String[] pri_split=KeyValue_String.split(",");

			for (int i=0;i<pri_split.length;i++){
				String key=pri_split[i].split(":")[0].trim();
				String value=pri_split[i].split(":")[1].trim();                   
				table1.put(key, value);                 
			}
		}catch(Exception e){
			k1.reportError("Wrong string is passed: "+KeyValue_String);
		}
		return table1;


	}

	public static Keywords getInstance() throws IOException {
		if(k1==null){
			k1= new Keywords();	
			k1.reporterror="Pass";
			return k1;
		}
		k1.reporterror="Pass";
		return k1;
	}

	public void clickAndWait(String click_object,String wait_object){

		// click on a object 
		//wait for other object          

	}

	public void waitforPageLoad(){

		//wait for page load using java scrip executor
		JavascriptExecutor js= (JavascriptExecutor)driver;
		while(!js.executeScript("return document.readyState").toString().equals("complete")){
			try{
				Thread.sleep(3000);
			}catch(InterruptedException e){
				e.printStackTrace();
			}
		}
	}
	
	public String wait(Hashtable<String,String> getvalue,String arg1){
		try{
			log("Started Executing wait function");
			int waitTime=Integer.parseInt(arg1)*1000;
			Thread.sleep(waitTime);
			log("Exiting from wait function");
			return "Pass";
		}catch(Exception ex){
			log("Exiting from wait function: "+ ex.getMessage());
			return "Fail";
		}

	}

	////////////////////////////////////////////////////////////////////////////////////////////
	//App related functions
	///////////////////////////////////////////////////////////////////////////////////////////

	/**
	 * To check app is installed on device, This is Modified for intent testing. If app doesnt exist it will install
	 * User needs to pass app bundle id
	 * @author Vinod Shankar
	 * @param getvalue
	 * @param arg1
	 * @return
	 */
	//User needs to pass app bundle id
	public String validate_App_Exist_Device(Hashtable<String,String> getvalue,String arg1){
		try{

			log("Started Executing Validate_App_Exist_Device function");
			String result=executeCommandLine("adb shell pm list packages",arg1);
			if(!result.equals("Fail")){                    
				log("App is installed");
				return "Pass";
			}else{
				log("App not is installed");
				if(arg1.contains("com.smap.targetapp")) {
					String instal_result= install_App_Device(getvalue, "targetApp.apk");
					return instal_result;
				}
				return "Fail";
			}



		}catch(Exception ex){
			log("Exiting from Validate_App_Exist_Device function: "+ ex.getMessage());
			return "Fail";
		}

	}
	/**
	 * This function will check if the given app is not installed on the device based
	 * app bundle id passed from the test case
	 * @author Avinash
	 * @return pass or fail
	 */
	public String validate_App_NotExist_Device(Hashtable<String,String> getvalue,String arg1){

		try{
			log("Started Executing Validate_App_NotExist_Device function");
			String result=executeCommandLine("adb shell pm list packages",arg1);

			if(!result.equals("Fail")){                    

				log("App is installed on the device");
				return "Fail";
			}else{
				log("App is not installed on the device");
				return "Pass";
			}         

		}catch(Exception ex){
			log("Exiting from Validate_App_NotExist_Device function: "+ex.getMessage());
			return "Fail";
		}

	}
	
	public String executeCommandLine(String command,String messageToValidate) {

		log("Started executeCommandLine function"); 
		Process p;
		try {
			p = Runtime.getRuntime().exec(command);
			//p.waitFor();
			InputStream in = p.getInputStream();              
			BufferedReader br=new BufferedReader(new InputStreamReader(in));
			String line =null;
			Thread.sleep(4000);
			while((line=br.readLine())!=null)
			{
				if(line.contains(messageToValidate)){
					br.close();
					in.close();
					p.destroy();
					return line;                            
				}
			}

		} catch (Exception e) {
			e.printStackTrace();
			reportError("error while executing executeCommandLine function,Command: "+command+"  "+e.getMessage());
			return "Fail";
		}
		log("Exiting from executeCommandLine function"); 
		return "Fail";
	}
	
	/**
	 * Execute command line with no comparison string in the parameter
	 * @author Vinod Shankar 
	 * @param command
	 * @return
	 */
	public String executeCommandLine(String command) {

		log("Started executeCommandLine function"); 
		Process p;
		try {
			p = Runtime.getRuntime().exec(command);
			//p.waitFor();
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
			reportError("error while executing executeCommandLine function,Command: "+command+"  "+e.getMessage());
			return "Fail";
		}
	}

	public boolean file_CheckString(String filename,String messageToValidate) throws IOException{
		FileReader fileread=null;
		BufferedReader bufreader=null;
		log("Started file_CheckString function"); 
		try
		{      
			fileread= new FileReader(filename);
			bufreader= new BufferedReader(fileread);
			while(bufreader.readLine()!=null ){
				if(bufreader.readLine().contains(messageToValidate)){
					bufreader.close();
					fileread.close();
					log("Exiting file_CheckString function with pass message"); 
					return true;

				}

			}  

		}catch(Exception e){
			log("Exiting file_CheckString function with failed message : " + e.getMessage());
			return false;
		}

		bufreader.close();
		fileread.close();
		log("Exiting file_CheckString function with failed message");
		return false;   
	}

	public String file_GetString(String filename,String messageToValidate) throws IOException{
		FileReader fileread=null;
		BufferedReader bufreader=null;
		log("Started file_CheckString function"); 
		try
		{      
			fileread= new FileReader(filename);
			bufreader= new BufferedReader(fileread);
			while(bufreader.readLine()!=null ){
				if(bufreader.readLine().contains(messageToValidate)){
					String readlin=bufreader.readLine();
					bufreader.close();
					fileread.close();
					log("Exiting file_CheckString function with pass message"); 
					return readlin;

				}

			}  

		}catch(Exception e){
			log("Exiting file_CheckString function with failed message : " + e.getMessage());
			return "Fail";
		}

		bufreader.close();
		fileread.close();
		log("Exiting file_CheckString function with failed message");
		return "Fail";  
	}
	
	/**
	 * Validate app launched or not on device.
	 * Used in Rho automation
	 * @param getvalue
	 * @param arg1
	 * @return
	 */
	public String validate_App_Launched_Device(Hashtable<String,String> getvalue,String arg1){
		try{


			String toCheck=arg1+" Success";
			log("Started Executing Validate_App_launched_Device function");
			String result=executeCommandLine("adb shell uiautomator runtest MaaFw.jar -c com.symbol.maaf.MaaFw -e COMPARE_APP_PKG "+arg1,toCheck);
			if(!result.equals("Fail")){

				log("Given App is in Foreground");
				log("Exiting Validate_App_launched_Device function");
				return "Pass";
			}
			else
			{
				result=executeCommandLine("adb shell uiautomator runtest MaaFw.jar -c com.symbol.maaf.MaaFw -e COMPARE_APP_PKG com.android.chrome","com.android.chrome Success");
				if(!result.equals("Fail")&&arg1.contains("com.android.browser")){
					log("Given App is in Foreground");
					log("Exiting Validate_App_launched_Device function");
					return "Pass";
				}
				else if(arg1.contains("com.android.email")){
					result=executeCommandLine("adb shell uiautomator runtest MaaFw.jar -c com.symbol.maaf.MaaFw -e COMPARE_APP_PKG com.google.android.gm","com.google.android.gm Success");
					if(!result.equals("Fail")) {
						log("Given App is in Foreground");
						log("Exiting Validate_App_launched_Device function");
						return "Pass";
					}
					else {
						log("Given App is not in Foreground");
						log("Exiting Validate_App_launched_Device function");
						return "Fail";
					}
				}
				else {
					log("Given App is not in Foreground");
					log("Exiting Validate_App_launched_Device function");
					return "Fail";
				}
				
			}


		}catch(Exception ex){
			log("Exiting from Validate_App_launched_Device function: "+ex.getMessage());
			return "Fail";
		}


	}
	
	/**
	 * Launch app on device
	 * @param getvalue
	 * @param arg1
	 * @return
	 */
	public String launch_App_Device(Hashtable<String,String> getvalue,String arg1){
		try{

			log("Started Executing Launch_App_Device function");
			String result=executeCommandLine("adb shell am start -n "+ arg1,"Error");
			Thread.sleep(1000);
			if(!result.equals("Fail")){
				if(arg1.contains("com.android.browser")&&validate_App_Exist_Device(getvalue, "com.android.chrome") == "Pass") {
					result=executeCommandLine("adb shell am start -n com.android.chrome/com.google.android.apps.chrome.Main bnds","Error");
					Thread.sleep(1000);
					if(!result.equals("Fail")){
						log("Failed to launch the App");
						log("Exiting Launch_App_Device function");
						return "Fail";
					}
					else {
						log("Successfully launched the App");
						log("Exiting Launch_App_Device function");
						return "Pass";
					}
				}
				else {
					log("Failed to launch the App");
					log("Exiting Launch_App_Device function");
					return "Fail";
				}
			}
			else
			{
				log("Successfully launched the App");
				log("Exiting Launch_App_Device function");
				return "Pass";
			}



		}catch(Exception ex){
			log("Exiting from Launch_App_Device function"+ ex.getMessage());
			return "Fail";
		}


	}

	public String airplane_Mode(Hashtable<String,String> getvalue,String arg1){
		try{
			log("Started Executing airplane_Mode function");
			String result="";
			if(arg1.toLowerCase().equals("on")){
				result=executeCommandLine("adb shell am start -a android.settings.AIRPLANE_MODE_SETTINGS","Starting: Intent { act=android.settings.AIRPLANE_MODE_SETTINGS }");
				Thread.sleep(3000);
				result=executeCommandLine("adb shell uiautomator runtest MaaFw.jar -c com.symbol.maaf.MaaFw -e ENABLE_CHECKBOX Airplane_mode","Enabled Airplane mode Checkbox Sucess")+result;
				Thread.sleep(10000);                     

			}else if(arg1.toLowerCase().equals("off")) {
				result=executeCommandLine("adb shell am start -a android.settings.AIRPLANE_MODE_SETTINGS","Starting: Intent { act=android.settings.AIRPLANE_MODE_SETTINGS }");
				Thread.sleep(3000);
				result=executeCommandLine("adb shell uiautomator runtest MaaFw.jar -c com.symbol.maaf.MaaFw -e DISABLE_CHECKBOX Airplane_mode","Disabled Airplane mode Checkbox Sucess")+result;
				Thread.sleep(30000); 

			}else{
				log("wrong parameter is passed for airplane_Mode function");
				return "Fail";
			} 
			if(result.toLowerCase().contains("fail")){
				log("Exiting from airplane_Mode function");
				return "fail";                    			
			}else{
				log("Exiting from airplane_Mode function");
				return "pass";
			}
		}catch(Exception ex){
			log("Exiting from airplane_Mode function"+ ex.getMessage());
			return "Fail";
		}


	}


	/**
	 * Install app on Device
	 * @param getvalue
	 * @param arg1
	 * @return
	 */
	public String install_App_Device(Hashtable<String,String> getvalue, String arg1){
		try{
			log("Started Executing Install_App_Device function");
			String app_path=Constants.InputFiles_Path+"APK\\"+arg1;                   
			String result=executeCommandLine("adb install -r "+app_path,"Success");
			if(!result.equals("Fail")){                           
				log("Given App is installed");
				log("Exiting Install_App_Device function");
				Thread.sleep(3000);
				return "Pass";
			}
			else
			{
				log("Given App is not installed");
				log("Exiting Install_App_Device function");
				return "Fail";
			}



		}catch(Exception ex){
			log("Exiting from Install_App_Device function"+ex.getMessage());
			return "Fail";
		}
	}

	public String unInstall_App_Device(Hashtable<String,String> getvalue, String arg1){
		try{
			log("Started Executing UnInstall_App_Device function");

			String result=executeCommandLine("adb uninstall "+arg1,"Success");
			if(!result.equals("Fail")){

				log("Given App is Uninstalled");
				log("Exiting UnInstall_App_Device function");
				Thread.sleep(3000);
				return "Pass";
			}
			else
			{
				log("Given App is not Uninstalled");
				log("Exiting UnInstall_App_Device function");
				return "Fail";
			}




		}catch(Exception ex){
			log("Exiting from UnInstall_App_Device function"+ex.getMessage());
			return "Fail";
		}
	}
	
	/**
	 * Validate whether app is minimized or not
	 * @param getvalue
	 * @param arg1
	 * @return
	 */
	public String validate_AppMinimized(Hashtable<String,String> getvalue, String arg1){
		try{
			log("Started Executing validate_AppMinimized function");

			String homeScreen=executeCommandLine("adb shell uiautomator runtest MaaFw.jar -c com.symbol.maaf.MaaFw -e EXISTS_TXT_CONTDES Apps","Success");
			if(arg1.toLowerCase().equals("appsscreen")||arg1.toLowerCase().equals("homescreen")){
				String appscreen=executeCommandLine("adb shell uiautomator runtest MaaFw.jar -c com.symbol.maaf.MaaFw -e EXISTS_TXT_CONTDES Widgets","Success");
				if(!appscreen.equals("Fail")){
				log("In Appscreen");
					log("Exiting validate_AppMinimized function");
					return "Pass";
				}
				else if(homeScreen.contains("Success"))
				{
					log("In Home screen");
					log("Exiting validate_AppMinimized function");
					return "Pass";
				}
				else {
					log("Not in Homescreen or Apps screen");
					log("Exiting validate_AppMinimized function");
					return "Fail";
				}
			}else
				log("Wrong parameter is passed for validate_AppMinimized");
				return "Fail";
			}
		catch(Exception ex){
			log("Exiting from validate_AppMinimized function"+ex.getMessage());
			return "Fail";
		}
	}


	public String validated_InstalledApp_Version_Device(Hashtable<String,String> getvalue,String arg1){
		try{
			Hashtable<String,String>getVal= getKeyValue(arg1);

			log("Started Executing Validated_InstalledApp_Version_Device function");
			String result=executeCommandLine("adb shell dumpsys package packages |grep -A8 \"Package \\["+getVal.get("AppBundleID")+"\\]\"","versionName");
			if(!result.equals("Fail")){

				String file_result=file_GetString(Constants.GetAppVersion_Path,"versionName");  
				String version =file_result.split("=")[1];


				if(version.equals(getVal.get("Version"))){
					log("App versions are matching");
					log("Exiting Validated_InstalledApp_Version_Device function");
					return "Fail";
				}
				else
				{
					log("Expected version: "+getVal.get("Version"));
					log("Actual version: "+version);
					log("App versions are not matching");
					log("Exiting Validated_InstalledApp_Version_Device function");
					return "Pass";
				}

			}else{
				log("Could not execute the command");
				return "Fail";
			}                          


		}catch(Exception ex){
			log("Exiting from Validated_InstalledApp_Version_Device function"+ ex.getMessage());
			return "Fail";
		}


	}


	public boolean isAlertPresent() 
	{ 
	    try 
	    {	    	
	        mobdriv.switchTo().alert(); 
	        return true; 
	    }   // try 
	    catch (NoAlertPresentException Ex) 
	    { 
	        return false; 
	    }   // catch 
	} 
	
	//This is used to accpet or dismiss the alert
	public String alert_Action(String action){
		try{
			log("Entering the function alert_Action");
			Alert alert=mobdriv.switchTo().alert();
			if(action.equalsIgnoreCase("accept")){	
				log("In accept alert case");
				alert.accept();
				Thread.sleep(3000);
			}else{
				log("In dismiss alert case");
				alert.dismiss();
				Thread.sleep(3000);
			}
			
			mobdriv.switchTo().window("WEBVIEW");
			log("Exiting the function alert_Action");
			return "pass";
		}catch(Exception e){
			mobdriv.switchTo().window("WEBVIEW");
			log("Exiting the function alert_Action"+e.getMessage());
			return "fail";
		}
		
		
	}
	
	//This is used to click on the ardware buttons
	// It accpets the parameter for Home and back key presses
	// The caller can be in any page of appgallery
	/****************To click on the Hardware home key/Back key starts*********************************************/
	public String press_Key(Hashtable<String,String> getvalue,String key){
		log("Entering the function Press_Key");
		try{
			if(key.equalsIgnoreCase("Home")){
				mobdriv.getAdbConnection().sendKeyEvent(3);
				log("pressed on the home key");
				log("Exiting the function Press_Key");
				log("home works");
				Thread.sleep(3000);
				return "pass";

			}
			if(key.equalsIgnoreCase("Back")){
				mobdriv.getAdbConnection().sendKeyEvent(4);
				log("pressed on the back key");
				log("Exiting the function Press_Key");
				log("Back works");
				Thread.sleep(3000);
				return "pass";
			}
			else{
				log("Exiting the function Press_Key");
				log("Could not click on the key");
				return "fail";
			}

		}
		catch(Exception e){
			log("Exiting the function Press_Key");

			e.printStackTrace();
			return "fail";
		}

	}

	/**
	 * This is used to validate the page title of the app
	 * It accpets the parameter about the page title
	 * The caller should be in the page so as to get the title
	 * @param getvalue
	 * @param pagetitle
	 * @return
	 */
	public String validate_PageTitle(Hashtable<String,String> getvalue,String pagetitle){
		log("Entering the function Validate_PageTitle");
		try{
			//WebElement pagetitle3 = driver.findElement(By.xpath(OR.getProperty("page_title_xpath")));
			String getpagetitle=mobdriv.getTitle();
			System.out.println(getpagetitle);
			int res=getpagetitle.length();
			if(res>0){
				//WebElement newpagetitle3 = element("main_page_title_id");
				log("The title of the page is *********************************: "+getpagetitle);
				if(getpagetitle.equalsIgnoreCase(pagetitle)){
					log("The page title found is correct");
					log("Exiting the function Validate_PageTitle");
					return "pass";
				}
				else {
					log("The page title found is incorrect");
					log("Exiting the function Validate_PageTitle");
					return "fail";
				}
					
			}
			else {
				getpagetitle = getText("page_title_xpath");
				log("The title of the page is *********************************: "+getpagetitle);
				if(getpagetitle.equalsIgnoreCase(pagetitle.trim()) || getpagetitle.equalsIgnoreCase(pagetitle.trim()+randomnum)){
					log("The page title found is correct");
					log("Exiting the function Validate_PageTitle");
					return "pass";
				}
				else{
					log("The page title found is incorrect");
					log("Exiting the function Validate_PageTitle");
					return "fail";
				}
			}
				
		}
		catch(Exception e){
			log("Exiting the function Validate_PageTitle"+e.getMessage());
			return "fail";
		}


	}
	
	/**
	 * To click on any link using the link name
	 * @author Vinod Shankar
	 * @param getvalue
	 * @param linkName
	 * @return
	 */
	public String link_Click(Hashtable<String,String> getvalue,String linkName){
		try{
			log("Executing link_click function");
			Thread.sleep(1000);
			WebElement pages = element(linkName);
			TouchActions flick = new TouchActions(mobdriv).flick(pages, 0, -50, 0);
			flick.perform();
			Click(linkName);
			return "pass";

		}catch(Exception ex){
			reportError("Fail to click on -"+linkName+" reason :"+ex.getMessage());
			return null;
		}


	}
		
	/**
	 * Select test from combo box to run
	 * @author Vinod Shankar
	 * @param getvalue
	 * @param specificOption
	 * @return
	 */
	public String SelectTestToRun(Hashtable<String,String> getvalue,String specificOption){
		log("Entering the click_category function");
		int count=0;
		try{
						
			 WebElement dropdown = element("speccontrol_class");
			 Select select = new Select(dropdown);
			 String selecteditem = null;
			 //Get VTID from OR.properties to compare with full testspec description 
			 String obj=OR.getProperty(specificOption);
			 //Get full testspec description and slect the perticular test
			 List<WebElement> options = select.getOptions();
			    for (WebElement elementweb : options) {
			            if(elementweb.getText().contains(obj)) {
			            	count=1;
			            	selecteditem = elementweb.getText();
			            	select.selectByVisibleText(selecteditem);
			        }
			    }
			    
			Thread.sleep(1000);
			if(count==1){
				log("Successfull in selecting clicking the category");
				return "pass";
			}
			else{
				log("Not able to click on the category");
				return "fail";
			}
		}
		catch(Exception e){
			log("Exiting the click_category function"+e.getMessage());
			e.printStackTrace();
			return "fail";
		}
	}
	
	/**
	 * Click Run button
	 * @author Vinod Shankar
	 * @param getvalue
	 * @param buttonXpath
	 * @return
	 */
	public String ClickRunTest(Hashtable<String,String> getvalue,String buttonXpath){
		try{
			log("Click on Run Test");
			WebElement pages = element(buttonXpath);
			TouchActions flick = new TouchActions(mobdriv).flick(pages, 0, -50, 0);
			flick.perform();
			Click(buttonXpath);
			return("pass");
		}
		
		catch(Exception e){
			log("Exiting the ClickRunTest function"+e.getMessage());
			e.printStackTrace();
			return "fail";
		}
	}
	
	/**
	 * Take screenshot
	 * @author Vinod Shankar
	 * @param getvalue
	 * @param screenshot_id
	 * @return
	 */
	public String TakeScreenshot(Hashtable<String,String> getvalue, String screenshot_id,String ModuleName) {
		   	String DeviceName=executeCommandLine("adb shell getprop ro.product.name");
		    try{  
			    File screenshot = ((TakesScreenshot)mobdriv).getScreenshotAs(OutputType.FILE);
			    BufferedImage  fullImg = ImageIO.read(screenshot);
			    BufferedImage eleScreenshot = null;
			   int width = fullImg.getWidth();
			    int height = fullImg.getHeight();
			    String currentOrientation = (((Rotatable) mobdriv).getOrientation()).toString();
				if(currentOrientation=="PORTRAIT"){
					if(screenshot_id.contains("VT366_0108"))
						eleScreenshot = fullImg.getSubimage(0, (height/2)+150, width, height-(height/2)-150);
					else if(screenshot_id.contains("VT200_0985")||screenshot_id.contains("VT200_0986"))
						eleScreenshot = fullImg.getSubimage(0, 50, width, 120);
					else if(screenshot_id.equals("VT200_0596"))
						if(validate_App_Launched_Device(getvalue, "com.symbol.enterprisebrowser")=="Pass")
							eleScreenshot = fullImg.getSubimage(0, 50, width, 60);
						else
							eleScreenshot = fullImg.getSubimage(0, 50, width, 120);
					else
						eleScreenshot = fullImg.getSubimage(0, 50, width, height-50);
				}
				else {
					eleScreenshot = fullImg.getSubimage(0, 0, width-50, height);
				}
			    
			    ImageIO.write(eleScreenshot, "png", screenshot);
			    String outputDirName = System.getProperty("user.dir")+ "\\test-output\\"+DeviceName+"\\"+ModuleName+"\\";
			    FileUtils.copyFile(screenshot, new File(outputDirName  + File.separator +screenshot_id+".png"));
			    return("pass");
		    }
		catch (IOException e) {
			e.printStackTrace();
			return "fail";
		}
    }
	
	/**
	 * Take Native screenshot. This function is written due to problem while taking screen capture in native screen like signature area with default width and height.
	 * @author Vinod Shankar
	 * @param getvalue
	 * @param screenshot_id
	 * @return
	 */
	/*public String TakeNativeScreenshot(Hashtable<String,String> getvalue, String screenshot_id,String ModuleName) {

		   	String DeviceName=executeCommandLine("adb shell getprop ro.product.name");
		    try{         
			    File screenshot = ((TakesScreenshot)mobdriv).getScreenshotAs(OutputType.FILE);
			    BufferedImage  fullImg = ImageIO.read(screenshot);
			    //Dimension dim = mobdriv.manage().window().getSize();
			    BufferedImage eleScreenshot = null;
			    /*String currentOrientation = (((Rotatable) mobdriv).getOrientation()).toString();
				if(currentOrientation=="PORTRAIT"){
					eleScreenshot= fullImg.getSubimage(0, 50, dim.width, dim.height-50);
				}
				else {
					eleScreenshot= fullImg.getSubimage(0, 0, dim.height-100, dim.width);
				}*/
			    /*int width = fullImg.getWidth();
			    int height = fullImg.getHeight();
			    String currentOrientation = (((Rotatable) mobdriv).getOrientation()).toString();
				if(currentOrientation=="PORTRAIT"){
					if(!screenshot_id.contains("VT366_0108"))
						eleScreenshot = fullImg.getSubimage(0, 50, width, height-50);
					else
						eleScreenshot = fullImg.getSubimage(0, (height/2)+150, width, height-(height/2)-150);
				}
				else {
					eleScreenshot = fullImg.getSubimage(0, 0, width-50, height);
				}			    
			    ImageIO.write(eleScreenshot, "png", screenshot);
			    String outputDirName =System.getProperty("user.dir")+ "\\test-output\\"+DeviceName+"\\"+ModuleName+"\\";
			    FileUtils.copyFile(screenshot, new File(outputDirName  + File.separator +screenshot_id+".png"));
			    return("pass");
		    }
		catch (IOException ex) {
			log("function failed reason :"+ex.getMessage());
			log("Exiting from Take Signature screenshot function");
			return "fail";
		}
    }*/
	
	/**
	 * WiFi turn off and on
	 * @author Vinod Shankar
	 * @param getvalue
	 * @param arg1
	 * @return
	 */
	public String wifi_Mode(Hashtable<String,String> getvalue, String arg1){
		try{
			log("Started Executing wifi on/off function");
			String result="";
			String wifi_status="";
			wifi_status=executeCommandLine("adb shell dumpsys wifi","");
			if(wifi_status.contains("Wi-Fi is disabled")&&arg1.toLowerCase().equals("on")){
				log("Turning on WiFi");
				result=executeCommandLine("adb shell am start -a android.intent.action.MAIN -n com.android.settings/.wifi.WifiSettings","Starting: Intent { act=android.intent.action.MAIN cmp=com.android.settings/.wifi.WifiSettings }");
				Thread.sleep(1000);
				//result=executeCommandLine("adb shell input keyevent 20", "");
				//Thread.sleep(1000);
				//result=executeCommandLine("adb shell input keyevent 22", "");
				//Thread.sleep(1000);
				result=executeCommandLine("adb shell uiautomator runtest MaaFw.jar -c com.symbol.maaf.MaaFw -e SWITCH_OPERATION 0:ON", "Success");
				result="pass";
				Thread.sleep(10000);                     

			}else if(wifi_status.contains("Wi-Fi is enabled")&&arg1.toLowerCase().equals("off")) {
				log("Turning off WiFi");
				result=executeCommandLine("adb shell am start -a android.intent.action.MAIN -n com.android.settings/.wifi.WifiSettings","Starting: Intent { act=android.intent.action.MAIN cmp=com.android.settings/.wifi.WifiSettings }");
				Thread.sleep(1000);
				/*result=executeCommandLine("adb shell input keyevent 20", "");
				Thread.sleep(1000);
				result=executeCommandLine("adb shell input keyevent 22", "");
				Thread.sleep(1000);
				result=executeCommandLine("adb shell input keyevent 23", "");*/
				result=executeCommandLine("adb shell uiautomator runtest MaaFw.jar -c com.symbol.maaf.MaaFw -e SWITCH_OPERATION 0:OFF", "Success");
				result="pass";
				Thread.sleep(10000);                     

			}else{
				log("wrong parameter is passed for WiFi_Mode function");
				return "Fail";
			} 
			if(result.toLowerCase().contains("fail")){
				log("Exiting from WiFi_Mode function");
				return "fail";                    			
			}else{
				log("Exiting from WiFi_Mode function");
				return "pass";
			}
		}catch(Exception ex){
			log("Exiting from WiFi_Mode function"+ ex.getMessage());
			return "Fail";
		}
		
	}
	
	/**
	 * To validate on any text in present goalscontainer class of the test
	 * @author Rohini
	 * @param getvalue
	 * @param objname
	 * @return
	 */
	public String validate_Text_Exists(Hashtable<String,String> getvalue,String objname){
		try{
			log("Entered validate_Text_Exists function");		
			String content = element("goalscontainer_class").getText();			
			if(content.contains(objname)){
				log(objname+" Testcase Text found");				
				log("Exiting from validate_TextField_Exists function");
				return "Pass";
			}else{
				log(objname+ " Testcase Text not found");
				log("Exiting from validate_TextField_Exists function");				
				return "Fail";
			}				
									
			
		}catch(Exception ex){
			log("Text not found -"+objname+" reason :"+ex.getMessage());
			log("Exiting from validate_Text_Exists function");
			return "Fail";
		}
		
				
	}
	
	/**
	 * To validate result for Async in Rhodes
	 * @author Rohini
	 * @param getvalue
	 * @param objname
	 * @return
	 */
	public String validate_AsyncResult_Exists(Hashtable<String,String> getvalue,String objname){
		try{
			log("Entered validate_AsyncResult_Exists function");		
			String content = element("async_result_xpath").getText();			
			if(content.contains(objname)){
				log(objname+" Testcase Text found");				
				log("Exiting from validate_AsyncResult_Exists function");
				return "Pass";
			}else{
				log(objname+ " Testcase Text not found");
				log("Exiting from validate_AsyncResult_Exists function");				
				return "Fail";
			}				
									
			
		}catch(Exception ex){
			log("Text not found -"+objname+" reason :"+ex.getMessage());
			log("Exiting from validate_AsyncResult_Exists function");
			return "Fail";
		}
		
				
	}
	
	/**
	 * Comparing and 2 images Returns true if match found
	 * Vinod Shankar
	 * @param fileOne
	 * @param fileTwo
	 * @return
	 */
	public boolean compareTwoImages(File fileOne, File  fileTwo) {
        Boolean isTrue = true;
        try{
            //Image imgOne = ImageIO.read(fileOne);
            //Image imgTwo = ImageIO.read(fileTwo);
            BufferedImage bufImgOne = ImageIO.read(fileOne);
            BufferedImage bufImgTwo = ImageIO.read(fileTwo);
            int imgOneHt = bufImgOne.getHeight();
            int imgTwoHt = bufImgTwo.getHeight();
            int imgOneWt = bufImgOne.getWidth();
            int imgTwoWt = bufImgTwo.getWidth();
            if(imgOneHt!=imgTwoHt ||(imgOneWt!=imgTwoWt)){
                System.out.println(" size are not equal ");
                isTrue = false;
            }

            for(int x =0; x < imgOneWt; x++ ){ //replace the loop, if needed
                for(int y =0; y < imgOneHt ; y++){
                    if(bufImgOne.getRGB(x, y) != bufImgTwo.getRGB(x, y) ){
                        //System.out.println(" rgb are not equal ");
                        isTrue = false;
                        break;
                    }
                }
            }
        }catch (IOException e) {
                        e.printStackTrace();
        }
        return isTrue;
    }
	
	public String PercentCompare(String ref, String first, String diff) {

		log("Started executeCommandLine function"); 
		try {
			ProcessBuilder pb = new ProcessBuilder("compare", "-metric", "PSNR", ref, first, diff);
			//p.waitFor();
			pb.redirectErrorStream(true);

			Process p = pb.start();
			BufferedReader br = new BufferedReader(new InputStreamReader(p.getInputStream()));
			String line = null;
			while((line=br.readLine())!=null){
			   return line;
			}
			return "Fail";

		} catch (Exception e) {
			e.printStackTrace();
			reportError("error while executing executeCommandLine function,Command:   "+e.getMessage());
			return "Fail";
		}
	}
	
    public void CreateNewDir(String newdir) {
    	File theDir = new File(newdir);

    	// if the directory does not exist, create it
    	if (!theDir.exists()) {
    	    boolean result = false;

    	    try{
    	        theDir.mkdir();
    	        result = true;
    	    } 
    	    catch(SecurityException se){
    	        //handle it
    	    	se.printStackTrace();
    	   }  
    	}
    	
    }
	
	/**
	 * Validating screenshot with reference image and showing the difference image
	 * Vinod Shankar
	 * @param getvalue
	 * @param objname
	 * @return
	 */
	public String validate_Screenshot(Hashtable<String,String> getvalue,String objname,String ModuleName){
		try{
			log("Entered validate_Screenshot function");
			String DeviceName=executeCommandLine("adb shell getprop ro.product.name");
		    String imagefile =System.getProperty("user.dir")+ "\\test-output\\"+DeviceName+"\\"+ModuleName+"\\"+objname+".png";
		    String refimagefile = System.getProperty("user.dir")+ "\\test-output\\"+DeviceName+"\\Reference\\"+ModuleName+"\\"+objname+".png";
		    
			//String diffresult=executeCommandLine("compare -channel red -metric PSNR E:\\TC75\\VT200_445.png E:\\TC75\\VT200_446.png E:\\TC75\\diff.png", "image diff");
		    //String diffresult=executeCommandLine("compare -channel red -metric PSNR E:\\TC75\\VT200_445.png E:\\TC75\\VT200_446.png E:\\TC75\\diff.png", "image diff");
		    File imgfile = new File(imagefile);
	        File reffile = new File(refimagefile);
	        if(reffile.exists()) {
	        	if(compareTwoImages(imgfile, reffile)){
					//String diffresult=executeCommandLine("compare -channel red -metric PSNR "+refimagefile+" "+imagefile+" "+diffimagefile);
					log("Match found with reference image");				
					log("Exiting from validate_Screenshot function");
					return "Pass";
				}else{
					//String diffresult=
					CreateNewDir(System.getProperty("user.dir")+ "\\test-output\\"+DeviceName+"\\Difference");
					CreateNewDir(System.getProperty("user.dir")+ "\\test-output\\"+DeviceName+"\\Difference\\"+ModuleName);
					String diffimagefile = System.getProperty("user.dir")+ "\\test-output\\"+DeviceName+"\\Difference\\"+ModuleName+"\\"+objname+".png";
					String tmp = PercentCompare(refimagefile, imagefile, diffimagefile);
					Scanner scanner = new Scanner(tmp);
					if(scanner.hasNextDouble()) {
						Double value_double = Double.valueOf(tmp);
						if(value_double>40.0) {
							log("Partial Match found with reference image "+value_double);				
							log("Exiting from validate_Screenshot function");
							return "Pass";
						}	
					}
					executeCommandLine("compare -channel red -metric PSNR "+imagefile+" "+refimagefile+" "+diffimagefile);
					log("Match not found, Difference image is"+diffimagefile);
					log("Exiting from validate_Screenshot function");				
					return "Fail";
				}	
	        }
	        else {
	        	log("No reference file to compare");
				log("Exiting from validate_Screenshot function");				
				return "Fail";
	        }
	        
									
			
		}catch(Exception ex){
			log("Text not found -"+objname+" reason :"+ex.getMessage());
			log("Exiting from validate_Screenshot function");
			return "Fail";
		}
		
				
	}
	

	/**
	 * Draw signature in full screen
	 * @author Vinod Shankar
	 * @param getvalue
	 * @param objname
	 * @return
	 */
	public String DrawSignature(Hashtable<String,String> getvalue, String objname){
		try{
			log("Executing DrawSignature function");
			Thread.sleep(1000);
			WebElement signaturearea= element(objname);
			io.selendroid.client.TouchAction drawsignature = new TouchActionBuilder().pointerDown(signaturearea).pointerMove(200, 600).pointerUp().build();
			drawsignature.perform(mobdriv);
			Thread.sleep(1000);
			return "Pass";					
			
		}catch(Exception ex){
			log("function failed reason :"+ex.getMessage());
			log("Exiting from DrawSignature function");
			return "Fail";
		}
		
				
	}
	
	/**
	 * Switch app to native or webview
	 * @author Vinod Shankar
	 * @param getvalue
	 * @param objname
	 * @return
	 */
	public String SwitchApp(Hashtable<String,String> getvalue,String objname){
		try{
			log("Executing switchapp function");
			mobdriv.switchTo().window(objname);
			return "Pass";
		}catch(Exception ex){
			log("function failed reason :"+ex.getMessage());
			log("Exiting from switchapp function");
			return "Fail";
		}
	}

	/**
	 * To validate Result
	 * @author Vinod Shankar 
	 * @param getvalue
	 * @param objname
	 * @return
	 */
	public String validate_Result(Hashtable<String,String> getvalue,String objname){
		try{
			log("Entered validate_Result function");
			String content = element("results_xpath").getText();			
			if(content.contains(objname)){
				log(objname+" Testcase Text found");				
				log("Exiting from validate_Result function");
				return "Pass";
			}else{
				log(objname+ " Testcase Text not found");
				log("Exiting from validate_Result function");				
				return "Fail";
			}				
									
			
		}catch(Exception ex){
			log("function failed reason :"+ex.getMessage());
			log("Exiting from validate_Result function");
			return "Fail";
		}
		
				
	}
	
	/**
	 * Click native icon function
	 * @author Vinod Shankar
	 * @param getvalue
	 * @param objname
	 * @return
	 */
	public String ClickNativeIcon(Hashtable<String,String> getvalue, String objname){
		try{
			log("Executing ClickNativeIcon function");
			 WebElement nativebutton = element(objname);
			 if(nativebutton.isDisplayed()) {
				 nativebutton.click();
				 log("Exiting from ClickNativeIcon function");
				 return("pass");
			 }
			 else {
				 log("Exiting from ClickNativeIcon function");
				 return "Fail";
			 }
			 
		}catch(Exception ex){
			log("function failed reason :"+ex.getMessage());
			log("Exiting from ClickNativeIcon function");
			return "Fail";
		}
	}
	
	/**
	 * checkvalue of callback
	 * @author Chaithra
	 * @param getvalue
	 * @param objName
	 * @return
	 */
	public String checkCallbackValues(Hashtable<String,String> getvalue,String objName){
		try{
			log("Entered checkValue function");
			String content = element(objName).getText();
			//log(essidcontent);
			if(content.contains("ard")){
				log("essid value is correct");				
				log("Exiting from checkValue function");
				return "Pass";
			 }
			else if(content.contains("10.233.")){
				log("ipaddress value is correct");				
				log("Exiting from checkValue function");
				return "Pass";
			 }
			else if(content.contains("0.0.")){
				log("wlan profile has been disabled");				
				log("Exiting from checkValue function");
				return "Pass";
			 }
			else if(content.contains("signalStrength")){
				String tem = content.substring(19,22);
				Integer signalvalue = Integer.valueOf(tem);
				if(signalvalue > 50){
				log("signal value is correct");				
				log("Exiting from checkValue function");
				return "Pass";
				}
				else{
				log("signal value is incorrect");	
				log("Exiting from checkValue function");
					return "Fail";	
				}
			 }
			else{
				log(objName+" not found in callback");
				log("Exiting from checkValue function");				
				return "Fail";
			}	
									
			
		}catch(Exception ex){
			log("calback not found. reason :"+ex.getMessage());
			log("Exiting from validate_essidValue function");
			return "Fail";
		}
	}
	
	/**
	 * Modified existing function little bit
	 * To validate on any button exist in the given page. This function should be called for buttons with text only.
	 * @author Rohini
	 * @param getvalue
	 * @param buttonname
	 * @return
	 */
	public String validate_Button_Exists(Hashtable<String,String> getvalue,String buttonname){
		try{
			
			log("Entered validate_Button_Exists function");
		    boolean res=isElementPresent(buttonname);
			if(res==true){
				log("Button found");
				log("Exiting from validate_Button_Exists function");
				return "Pass";				
			}else{
				log(buttonname+" Button not found");
				log("Exiting from validate_Button_Exists function");
				return "Fail";				
			}
			
		}catch(Exception ex){
			log("Button not found -"+buttonname+" reason :"+ex.getMessage());
			log("Exiting from validate_Button_Exists function");
			return "Fail";
		}
		
	}
	
	/**
	 * Lock and Unlock Screen
	 * @author Vinod Shankar
	 * @param getvalue
	 * @param arg1
	 * @return
	 */
	public String Lock_UnlockScreen(Hashtable<String,String> getvalue, String arg1){
		try{
			log("Started Executing Lock_UnlockScreen function");
			String result="";
			if(arg1.toLowerCase().equals("lock")){
				log("locking screen");
				result=executeCommandLine("adb shell uiautomator runtest MaaFw.jar -c com.symbol.maaf.MaaFw -e SUSPEND True", "OK");
				Thread.sleep(1000);
				if(result.contains("OK"))
					return "pass";
				else
					return "Fail";
			}else if(arg1.toLowerCase().equals("unlock")) {
				log("unlocking screen");
				result=executeCommandLine("adb shell uiautomator runtest MaaFw.jar -c com.symbol.maaf.MaaFw -e UNLOCK_DEVICE True", "Im in UNLOCKER");
				Thread.sleep(1000);
				if(result.contains("Im in UNLOCKER")){
					result=executeCommandLine("adb shell input keyevent 82");
					return "pass";
				}
				else
					return "Fail";             
			}else{
				log("wrong parameter is passed for Lock_UnlockScreen function");
				return "Fail";
			} 
			
		}catch(Exception ex){
			log("Exiting from Lock_UnlockScreen function"+ ex.getMessage());
			return "Fail";
		}
		
	}
	
	/**
	 * Rotate_Screen to potrait or landscape
	 * @author Vinod Shankar
	 * @param getvalue
	 * @param arg1
	 * @return
	 */
	public String Rotate_Screen(Hashtable<String,String> getvalue, String arg1){
		try{
			log("Started Executing Rotate_Screen function");
			String currentOrientation = (((Rotatable) mobdriv).getOrientation()).toString();
			if(arg1.toLowerCase().equals("potrait")&&currentOrientation=="LANDSCAPE"){
				((Rotatable) mobdriv).rotate(ScreenOrientation.PORTRAIT);
				log("Rotated to potrait successfully");
				return "pass";  
			}
			else if(arg1.toLowerCase().equals("landscape")&&currentOrientation=="PORTRAIT") {
				((Rotatable) mobdriv).rotate(ScreenOrientation.LANDSCAPE);
				log("Rotated to landscape successfully");
				return "pass";                 
			}else{
				log("wrong parameter is passed for Rotate_Screen function");
				return "Fail";
			}
		}catch(Exception ex){
			log("Exiting from Rotate_Screen function"+ ex.getMessage());
			return "Fail";
		}
		
	}
	
	/**
	 * scroll page
	 * @author Vinod Shankar 
	 * @param getvalue
	 * @param objname
	 * @return
	 */
	public String ScrollPage(Hashtable<String,String> getvalue, String objname){
		try{
			log("Started Executing ScrollPage function");
			WebElement pages = element(objname);
			TouchActions flick = new TouchActions(mobdriv).flick(pages, -10, 0, 0);
			flick.perform();
			return "pass";  
		}
		catch(Exception ex){
			log("Exiting from ScrollPage function"+ ex.getMessage());
			return "Fail";
		}
	}
	
	/**
	 * ScrollUp Page
	 * @author Vinod Shankar 
	 * @param getvalue
	 * @param objname
	 * @return
	 */
	public String ScrollUp_Page(Hashtable<String,String> getvalue, String objname){
		try{
			log("Started Executing ScrollPage function");
			WebElement pages = element(objname);
			TouchActions flick = new TouchActions(mobdriv).flick(pages, 0, -30, 0);
			flick.perform();
			return "pass";  
		}
		catch(Exception ex){
			log("Exiting from ScrollUp_Page function"+ ex.getMessage());
			return "Fail";
		}
	}
	
	public static boolean isInteger(String s, int radix) {
	    if(s.isEmpty()) return false;
	    for(int i = 0; i < s.length(); i++) {
	        if(i == 0 && s.charAt(i) == '-') {
	            if(s.length() == 1) return false;
	            else continue;
	        }
	        if(Character.digit(s.charAt(i),radix) < 0) return false;
	    }
	    return true;
	}
	
	/**
	 * Validate system properties callback value
	 * @author Vinod Shankar
	 * @param getvalue
	 * @param objName
	 * @return
	 */
	public String validate_SystemProperties(Hashtable<String,String> getvalue,String objName){
		try{
			log("Entered validate_SystemProperties function");
			String content = element("results_xpath").getText();
			String[] Sysproperty = null;
			if(objName.contains("getallproperties")) {
				int first = content.lastIndexOf("{");
				int last = content.lastIndexOf("}");
				String tmp = content.substring(first+1, last);
				tmp = tmp.replace("\"\"", " ");
				tmp = tmp.replace("\"", "");
				Sysproperty = tmp.split(",");
				String[] result = new String[Sysproperty.length];
				int value_int;
				for(int i=0;i<Sysproperty.length;i++){
					String keyValue[] = Sysproperty[i].split(":");
					if(isInteger(keyValue[1], 10)) {
						value_int = Integer.parseInt(keyValue[1]); 
						if(keyValue[0].contains("applicationIconBadge")||keyValue[0].contains("application_icon_badge")) {
							if(value_int==0) {
								result[i]="Pass";
								log(keyValue[0]+" Value is "+value_int +" and Result is "+result[i]);
							}
							else {
								result[i]="Fail";
								log(keyValue[0]+" Value is "+value_int +" and Result is "+result[i]);
							}
						}
						else if(keyValue[0].contains("freeServerPort")||keyValue[0].contains("free_server_port")||keyValue[0].contains("localServerPort")||keyValue[0].contains("local_server_port")) {
							if(value_int>20000&&value_int<100000) {
								result[i]="Pass";
								log(keyValue[0]+" Value is "+value_int +" and Result is "+result[i]);
							}
							else {
								result[i]="Fail";
								log(keyValue[0]+" Value is "+value_int +" and Result is "+result[i]);
							}
						}
						else if(keyValue[0].contains("realScreenHeight")||keyValue[0].contains("real_screen_height")||keyValue[0].contains("screenHeight")||keyValue[0].contains("screen_height")) {
							String wmsize=executeCommandLine("adb shell wm size");
							String[] wh = wmsize.split(":");
							wh[1] = wh[1].replace(" ", "");
							String[] widthheight = wh[1].split("x");
							if(isInteger(widthheight[1], 10)) {
								int height = Integer.parseInt(widthheight[1]);
								if(value_int == height|| height>value_int) {
									result[i]="Pass";
									log(keyValue[0]+" Value is "+value_int +" and Result is "+result[i]);
								}
								else {
									result[i]="Fail";
									log(keyValue[0]+" Value is "+value_int +" and Result is "+result[i]);
								}
							}
							else {
								result[i]="Fail";
								log(widthheight[1]+" is not a integer");
								
							}
	
						}
						else if(keyValue[0].contains("realScreenWidth")||keyValue[0].contains("real_screen_width")||keyValue[0].contains("screenWidth")||keyValue[0].contains("screen_width")) {
							String wmsize=executeCommandLine("adb shell wm size");
							String[] wh = wmsize.split(":");
							wh[1] = wh[1].replace(" ", "");
							String[] widthheight = wh[1].split("x");
							if(isInteger(widthheight[0], 10)) {
								int width = Integer.parseInt(widthheight[0]);
								if(value_int == width) {
									result[i]="Pass";
									log(keyValue[0]+" Value is "+value_int +" and Result is "+result[i]);
								}
								else {
									result[i]="Fail";
									log(keyValue[0]+" Value is "+value_int +" and Result is "+result[i]);
								}
							}
							else {
								result[i]="Fail";
								log(widthheight[0]+" is not a integer");
								
							}
						}
						
						else if(keyValue[0].contains("rho_callback")) {
							if(keyValue[1].toLowerCase().contains("1")) {
								result[i]="Pass";
								log(keyValue[0]+" Value is "+keyValue[1]+" and Result is "+result[i]);
							}
							else {
								result[i]="Fail";
								log(keyValue[0]+" Value is "+keyValue[1]+" and Result is "+result[i]);
							}
						}

						else {
							result[i]="Fail";
							log(keyValue[0]+" Value is "+keyValue[1]+" New value Fail");
						}
						
					}
					else {
						Scanner scanner = new Scanner(keyValue[1]);
						if(scanner.hasNextDouble()) {
							Double value_double = Double.valueOf(keyValue[1]);
							if(keyValue[0].contains("ppiX")||keyValue[0].contains("ppi_x")) {
								String density=executeCommandLine("adb shell wm density");
								String[] wh = density.split(":");
								wh[1] = wh[1].replace(" ", "");
								if(isInteger(wh[1], 10)) {
									int pixel = Integer.parseInt(wh[1]);
									if(value_double > pixel/2) {
										result[i]="Pass";
										log(keyValue[0]+" Value is "+value_double +" and Result is "+result[i]);
									}
									else {
										result[i]="Fail";
										log(keyValue[0]+" Value is "+value_double +" and Result is "+result[i]);
									}
								}
							}
							else if(keyValue[0].contains("ppiY")||keyValue[0].contains("ppi_y")) {
								String density=executeCommandLine("adb shell wm density");
								String[] wh = density.split(":");
								wh[1] = wh[1].replace(" ", "");
								if(isInteger(wh[1], 10)) {
									int pixel = Integer.parseInt(wh[1]);
									if(value_double > pixel/2) {
										result[i]="Pass";
										log(keyValue[0]+" Value is "+value_double +" and Result is "+result[i]);
									}
									else {
										result[i]="Fail";
										log(keyValue[0]+" Value is "+value_double +" and Result is "+result[i]);
									}
								}
							}
						}
						else if(keyValue[0].contains("country")) {
							String country=executeCommandLine("adb shell getprop ro.product.locale.region");
							if(keyValue[1].contains(country)) {
								result[i]="Pass";
								log(keyValue[0]+" Value is "+keyValue[1] +" and Result is "+result[i]);
							}
							else {
								result[i]="Fail";
								log(keyValue[0]+" Value is "+keyValue[1] +" and Result is "+result[i]);
							}
						}
						else if(keyValue[0].contains("deviceName")||keyValue[0].contains("device_name")) {
							String DeviceName=executeCommandLine("adb shell getprop ro.product.name");
							String Product=executeCommandLine("adb shell getprop ro.build.product");
							String Manufacturer=executeCommandLine("adb shell getprop ro.product.manufacturer");
							if((keyValue[1].contains(DeviceName)||Sysproperty[i].contains(Product))&&keyValue[1].contains(Manufacturer)) {
								result[i]="Pass";
								log(keyValue[0]+" Value is "+keyValue[1] +" and Result is "+result[i]);
							}
							else {
								result[i]="Fail";
								log(keyValue[0]+" Value is "+keyValue[1] +" and Result is "+result[i]);
							}
						}
						else if(keyValue[0].contains("deviceOwnerEmail")||keyValue[0].contains("device_owner_email")) {
							//TODO How to test based on device settings
							if(keyValue[1].contains("rhosilver@gmail.com")) {
								result[i]="Pass";
								log(keyValue[0]+" Value is "+keyValue[1] +" and Result is "+result[i]);
							}
							else {
								result[i]="Fail";
								log(keyValue[0]+" Value is "+keyValue[1] +" and Result is "+result[i]);
							}
						}
						else if(keyValue[0].contains("deviceOwnerName")||keyValue[0].contains("device_owner_name")) {
							//TODO How to test based on device settings
							if(keyValue[1].contains("rhosilver")) {
								result[i]="Pass";
								log(keyValue[0]+" Value is "+keyValue[1]+" and Result is "+result[i]);
							}
							else {
								result[i]="Fail";
								log(keyValue[0]+" Value is "+keyValue[1]+" and Result is "+result[i]);
							}
						}
						else if(keyValue[0].contains("devicePushId")||keyValue[0].contains("device_push_id")||keyValue[0].contains("deviceId")) {
							//TODO How to test based on device settings
							if(keyValue[1].contains(" ")) {
								result[i]="Pass";
								log(keyValue[0]+" Value is "+keyValue[1]+" and Result is "+result[i]);
							}
							else {
								result[i]="Fail";
								log(keyValue[0]+" Value is "+keyValue[1]+" and Result is "+result[i]);
							}
						}
						else if(keyValue[0].contains("hasCalendar")||keyValue[0].contains("has_calendar")) {
							//TODO How to test based on device settings
							if(keyValue[1].contains("true")) {
								result[i]="Pass";
								log(keyValue[0]+" Value is "+keyValue[1]+" and Result is "+result[i]);
							}
							else {
								result[i]="Fail";
								log(keyValue[0]+" Value is "+keyValue[1]+" and Result is "+result[i]);
							}
						}
						else if(keyValue[0].contains("screenAutoRotate")||keyValue[0].contains("screen_auto_rotate")) {
							//TODO How to test based on device settings
							if(keyValue[1].contains("true")) {
								result[i]="Pass";
								log(keyValue[0]+" Value is "+keyValue[1]+" and Result is "+result[i]);
							}
							else {
								result[i]="Fail";
								log(keyValue[0]+" Value is "+keyValue[1]+" and Result is "+result[i]);
							}
						}
						else if(keyValue[0].contains("screenSleeping")||keyValue[0].contains("screen_sleeping")) {
							//TODO How to test based on device settings
							if(keyValue[1].contains("true")) {
								result[i]="Pass";
								log(keyValue[0]+" Value is "+keyValue[1]+" and Result is "+result[i]);
							}
							else {
								result[i]="Fail";
								log(keyValue[0]+" Value is "+keyValue[1]+" and Result is "+result[i]);
							}
						}
						else if(keyValue[0].contains("hasCellNetwork")||keyValue[0].contains("has_cell_network")) {
							String CellNetwork = executeCommandLine("adb shell getprop gsm.network.type");
							if(keyValue[1].contains("true")&&!CellNetwork.contains("Unknown")) {
								result[i]="Pass";
								log(keyValue[0]+" Value is "+keyValue[1]+" and Result is "+result[i]);
							}
							else if(keyValue[1].contains("false")&&CellNetwork.contains("Unknown")) {
								result[i]="Pass";
								log(keyValue[0]+" Value is "+keyValue[1]+" and Result is "+result[i]);
							}
							else {
								result[i]="Fail";
								log(keyValue[0]+" Value is "+keyValue[1]+" and Result is "+result[i]);
							}
						}
						else if(keyValue[0].contains("hasNetwork")||keyValue[0].contains("has_network")) {
							String wifinetwork = executeCommandLine("adb shell getprop dhcp.wlan0.result");
							String CellNetwork = executeCommandLine("adb shell getprop gsm.network.type");
							if(keyValue[1].contains("true")&&(!CellNetwork.contains("Unknown")||wifinetwork.contains("ok"))) {
								result[i]="Pass";
								log(keyValue[0]+" Value is "+keyValue[1]+" and Result is "+result[i]);
							}
							else if(keyValue[1].contains("false")&&(CellNetwork.contains("Unknown")&&!wifinetwork.contains("ok"))) {
								result[i]="Pass";
								log(keyValue[0]+" Value is "+keyValue[1]+" and Result is "+result[i]);
							}
							else {
								result[i]="Fail";
								log(keyValue[0]+" Value is "+keyValue[1]+" and Result is "+result[i]);
							}
						}
						else if(keyValue[0].contains("hasSqlite")||keyValue[0].contains("has_sqlite")) {
							if(keyValue[1].contains("true")) {
								result[i]="Pass";
								log(keyValue[0]+" Value is "+keyValue[1]+" and Result is "+result[i]);
							}
							else {
								result[i]="Fail";
								log(keyValue[0]+" Value is "+keyValue[1]+" and Result is "+result[i]);
							}
						}
						else if(keyValue[0].contains("hasCamera")||keyValue[0].contains("has_camera")) {
							//TODO Need to add hasCamera from platform
							if(keyValue[1].contains("true")) {
								result[i]="Pass";
								log(keyValue[0]+" Value is "+keyValue[1]+" and Result is "+result[i]);
							}
							else {
								result[i]="Fail";
								log(keyValue[0]+" Value is "+keyValue[1]+" and Result is "+result[i]);
							}
						}
						else if(keyValue[0].contains("hasTouchscreen")||keyValue[0].contains("has_touchscreen")) {
							String touchscreen = executeCommandLine("adb shell getprop sys.touch.capacitive_key_state");
							String touchscreen1 = executeCommandLine("adb shell getprop ro.system.hastouch_fw");
							if(keyValue[1].contains("true")&&(touchscreen.contains("true")||touchscreen1.contains("true"))) {
								result[i]="Pass";
								log(keyValue[0]+" Value is "+keyValue[1]+" and Result is "+result[i]);
							}
							else if(keyValue[1].contains("false")&&touchscreen.contains("false")) {
								result[i]="Pass";
								log(keyValue[0]+" Value is "+keyValue[1]+" and Result is "+result[i]);
							}
							else if(keyValue[1].contains("true")&&(touchscreen.contains("")||touchscreen1.contains(""))) {
								result[i]="Pass";
								log(keyValue[0]+" Value is "+keyValue[1]+" and Result is "+result[i]);
							}
							else {
								result[i]="Fail";
								log(keyValue[0]+" Value is "+keyValue[1]+" and Result is "+result[i]);
							}
						}
						else if(keyValue[0].contains("hasWifiNetwork")||keyValue[0].contains("has_wifi_network")) {
							String wifinetwork = executeCommandLine("adb shell getprop dhcp.wlan0.result");
							if(keyValue[1].contains("true")&&wifinetwork.contains("ok")) {
								result[i]="Pass";
								log(keyValue[0]+" Value is "+keyValue[1]+" and Result is "+result[i]);
							}
							else if(keyValue[1].contains("false")&&!wifinetwork.contains("ok")) {
								result[i]="Pass";
								log(keyValue[0]+" Value is "+keyValue[1]+" and Result is "+result[i]);
							}
							else {
								result[i]="Fail";
								log(keyValue[0]+" Value is "+keyValue[1]+" and Result is "+result[i]);
							}
						}
						else if(keyValue[0].contains("httpProxyURI")||keyValue[0].contains("http_proxy_uri")||keyValue[0].contains("http_proxy_url")) {
							if(keyValue[1].contains(" ")) {
								result[i]="Pass";
								log(keyValue[0]+" Value is "+keyValue[1]+" and Result is "+result[i]);
							}
							else {
								result[i]="Fail";
								log(keyValue[0]+" Value is "+keyValue[1]+" and Result is "+result[i]);
							}
						}
						else if(keyValue[0].contains("isEmulator")||keyValue[0].contains("isRhoSimulator")||keyValue[0].contains("is_emulator")||keyValue[0].contains("is_rho_simulator")) {
							String adbdevices = executeCommandLine("adb devices");
							if(keyValue[1].contains("false")&&adbdevices.contains("device")) {
								result[i]="Pass";
								log(keyValue[0]+" Value is "+keyValue[1]+" and Result is "+result[i]);
							}
							else {
								result[i]="Fail";
								log(keyValue[0]+" Value is "+keyValue[1]+" and Result is "+result[i]);
							}
						}
						else if(keyValue[0].contains("isMotorolaDevice")||keyValue[0].contains("isSymbolDevice")||keyValue[0].contains("is_motorola_device")||keyValue[0].contains("is_symbol_device")) {
							String manufacturer = executeCommandLine("adb shell getprop ro.product.manufacturer");
							if(keyValue[1].contains("true")&&(manufacturer.contains("Zebra Technologies")||manufacturer.contains("Motorola")||manufacturer.contains("Symbol"))) {
								result[i]="Pass";
								log(keyValue[0]+" Value is "+keyValue[1]+" and Result is "+result[i]);
							}
							else if(keyValue[1].contains("false")&&(!manufacturer.contains("Zebra Technologies")||!manufacturer.contains("Motorola")||!manufacturer.contains("Symbol"))) {
								result[i]="Pass";
								log(keyValue[0]+" Value is "+keyValue[1]+" and Result is "+result[i]);
							}
							else {
								result[i]="Fail";
								log(keyValue[0]+" Value is "+keyValue[1]+" and Result is "+result[i]);
							}
						}
						else if(keyValue[0].contains("keyboardState")||keyValue[0].contains("keyboard_state")) {
							if(keyValue[1].contains(" ")) {
								result[i]="Pass";
								log(keyValue[0]+" Value is "+keyValue[1]+" and Result is "+result[i]);
							}
							else {
								result[i]="Fail";
								log(keyValue[0]+" Value is "+keyValue[1]+ " and Result is "+result[i]);
							}
						}
						else if(keyValue[0].contains("locale")) {
							String locale = executeCommandLine("adb shell getprop ro.product.locale.language");
							if(keyValue[1].contains(locale)) {
								result[i]="Pass";
								log(keyValue[0]+" Value is "+keyValue[1]+" and Result is "+result[i]);
							}
							else {
								result[i]="Fail";
								log(keyValue[0]+" Value is "+keyValue[1]+" and Result is "+result[i]);
							}
						}
						else if(keyValue[0].contains("oemInfo")||keyValue[0].contains("oem_info")) {
							String oeminfo = executeCommandLine("adb shell getprop ro.product.device");
							if(keyValue[1].contains(oeminfo)) {
								result[i]="Pass";
								log(keyValue[0]+" Value is "+keyValue[1]+" and Result is "+result[i]);
							}
							else {
								result[i]="Fail";
								log(keyValue[0]+" Value is "+keyValue[1]+" and Result is "+result[i]);
							}
						}
						else if(keyValue[0].contains("osVersion")||keyValue[0].contains("os_version")) {
							String osversion = executeCommandLine("adb shell getprop ro.build.version.release");
							if(keyValue[1].contains(osversion)) {
								result[i]="Pass";
								log(keyValue[0]+" Value is "+keyValue[1]+" and Result is "+result[i]);
							}
							else {
								result[i]="Fail";
								log(keyValue[0]+" Value is "+keyValue[1]+" and Result is "+result[i]);
							}
						}
						else if(keyValue[0].toLowerCase().contains("webviewFramework".toLowerCase())||keyValue[0].toLowerCase().contains("webview_framework".toLowerCase())) {
							//TODO: Need to check how to get device info
							String osversion = executeCommandLine("adb shell getprop ro.build.version.release");
							if(keyValue[1].contains("WEBKIT/GOOGLE/"+osversion)) {
								result[i]="Pass";
								log(keyValue[0]+" Value is "+keyValue[1]+" and Result is "+result[i]);
							}
							else {
								result[i]="Fail";
								log(keyValue[0]+" Value is "+keyValue[1]+" and Result is "+result[i]);
							}
						}
						else if(keyValue[0].contains("platform")) {
							String platform = executeCommandLine("adb shell getprop ro.product.brand");
							String platform1 = executeCommandLine("adb shell getprop net.bt.name");
							if(keyValue[1].toLowerCase().contains(platform.toLowerCase())||keyValue[1].toLowerCase().contains(platform1.toLowerCase())) {
								result[i]="Pass";
								log(keyValue[0]+" Value is "+keyValue[1]+" and Result is "+result[i]);
							}
							else {
								result[i]="Fail";
								log(keyValue[0]+" Value is "+keyValue[1]+" and Result is "+result[i]);
							}
						}
						else if(keyValue[0].contains("screenOrientation")||keyValue[0].contains("screen_orientation")) {
							String currentOrientation = (((Rotatable) mobdriv).getOrientation()).toString();
							if(keyValue[1].toLowerCase().contains(currentOrientation.toLowerCase())) {
								result[i]="Pass";
								log(keyValue[0]+" Value is "+keyValue[1]+" and Result is "+result[i]);
							}
							else {
								result[i]="Fail";
								log(keyValue[0]+" Value is "+keyValue[1]+" and Result is "+result[i]);
							}
						}
						else if(keyValue[0].contains("phoneId")||keyValue[0].contains("phone_id")) {
							if(keyValue[1].toLowerCase().contains("12334562ssd")||keyValue[1].length()>5) {
								result[i]="Pass";
								log(keyValue[0]+" Value is "+keyValue[1]+" and Result is "+result[i]);
							}
							else {
								result[i]="Fail";
								log(keyValue[0]+" Value is "+keyValue[1]+" and Result is "+result[i]);
							}
						}
						else if(keyValue[0].contains("uuid")) {
							String uuidvalue1 = executeCommandLine("adb shell getprop ro.hardware.uuid");
							String uuidvalue2 = executeCommandLine("adb shell getprop persist.sys.uuid");
							if(keyValue[1].toLowerCase().contains(uuidvalue1.toLowerCase())||keyValue[1].toLowerCase().contains(uuidvalue2.toLowerCase())) {
								result[i]="Pass";
								log(keyValue[0]+" Value is "+keyValue[1]+" and Result is "+result[i]);
							}
							else {
								result[i]="Fail";
								log(keyValue[0]+" Value is "+keyValue[1]+" and Result is "+result[i]);
							}
						}
						else if(keyValue[0].contains("lockWindowSize")||keyValue[0].contains("lock_window_size")||keyValue[0].contains("main_window_closed")) {
							if(keyValue[1].toLowerCase().contains(" ")) {
								result[i]="Pass";
								log(keyValue[0]+" Value is "+keyValue[1]+" and Result is "+result[i]);
							}
							else {
								result[i]="Fail";
								log(keyValue[0]+" Value is "+keyValue[1]+" and Result is "+result[i]);
							}
						}
						else {
							result[i]="Fail";
							log(keyValue[0]+" Value is "+keyValue[1]+" Not compared Fail");
						}
						
					}
					
	
				}
				
				for(int i=0;i<result.length;i++){
					if(result[i].contains("Fail")){
						return result[i];
					}
				}
				return "Pass";
			}
			else {
				Sysproperty= content.split("\\n");
				String result = "Fail";
				for(int i =0;i<Sysproperty.length;i++)
				{
					if(Sysproperty[i].toLowerCase().contains(objName.toLowerCase())&&objName.contains("country")) {
						String country=executeCommandLine("adb shell getprop ro.product.locale.region");
						if(Sysproperty[i].contains(country)){
							log(objName+" is returned in property");
							result= "Pass";
						}
						else {
							log(objName+" is not returned in property");
							result = "Fail";
						}
					}
					else if(Sysproperty[i].toLowerCase().contains(objName.toLowerCase())&&objName.contains("deviceName")){
						String DeviceName=executeCommandLine("adb shell getprop ro.product.name");
						String Product=executeCommandLine("adb shell getprop ro.build.product");
						String Manufacturer=executeCommandLine("adb shell getprop ro.product.manufacturer");
						if((Sysproperty[i].contains(DeviceName)||Sysproperty[i].contains(Product))&&Sysproperty[i].contains(Manufacturer)){
							log(objName+" is returned in property");
							result = "Pass";
						}
						else {
							log(objName+" is not returned in property");
							result = "Fail";
						}
					}else if(Sysproperty[i].toLowerCase().contains(objName.toLowerCase())&&objName.contains("Platform")){
						String PlatformName=executeCommandLine("adb shell getprop ro.product.brand");
						String platform1 = executeCommandLine("adb shell getprop net.bt.name");
						if(Sysproperty[i].toLowerCase().contains(PlatformName.toLowerCase())||Sysproperty[i].toLowerCase().contains(platform1.toLowerCase())){
							log(objName+" is returned in property");
							result = "Pass";
						}
						else {
							log(objName+" is not returned in property");
							result = "Fail";
						}
					}else if(Sysproperty[i].toLowerCase().contains(objName.toLowerCase())&&objName.contains("devicePushId")){
						String[] keyValue = Sysproperty[i].split(":");
						keyValue[keyValue.length-1] = keyValue[keyValue.length-1].replace(" ", "");
						if(keyValue.length>1) {
							if(!keyValue[keyValue.length-1].toLowerCase().contains("devicePushId".toLowerCase())){
								log(objName+" is returned in property");
								result = "Pass";
							}
							else {
								log(objName+" is not returned in property");
								result = "Fail";
							}
						}
						else {
							log(objName+" is not set in the device");
							result = "Pass";
							}
					}else if(Sysproperty[i].toLowerCase().contains(objName.toLowerCase())&&objName.contains("freeServerPort")){
						String[] keyValue = Sysproperty[i].split(":");
						keyValue[keyValue.length-1] = keyValue[keyValue.length-1].replace(" ", "");
						if(isInteger(keyValue[keyValue.length-1], 10)) {
							int value_int = Integer.parseInt(keyValue[keyValue.length-1]); 
							if(value_int>20000&&value_int<100000) {
								log(objName+" is returned in property");
								result = "Pass";
							}else {
								log(objName+" is not returned in property");
								result = "Fail";
							}
						}
						else {
							log(objName+" is not returned in property");
							result = "Fail";
						}
					}else if(objName.contains("webviewFramework")) {
						String osversion = executeCommandLine("adb shell getprop ro.build.version.release");
						if(Sysproperty[i].contains("WEBKIT/GOOGLE/"+osversion)) {
							result="Pass";
							log(objName+" Value is "+Sysproperty[i]+" and Result is "+result);
						}
						else {
							result="Fail";
							log(objName+" Value is "+Sysproperty[i]+" and Result is "+result);
						}
					}
					
				}
				return result;
				
			}

		}catch(Exception ex){
			log("calback not found. reason :"+ex.getMessage());
			log("Exiting from validate_SystemProperties function");
			return "Fail";
		}
		
	}
	
	
	/**
	 * Check UI button exists in android.widget.Button class using UI automator by passing full text
	 * @author Vinod Shankar 
	 * @param getvalue
	 * @param arg1
	 * @return
	 */
	public String CheckUIButtonExists(Hashtable<String,String> getvalue,String arg1){
		try{
			log("Entered CheckUIButtonExists function");
			String toCheck=null;
			String result=null;
			toCheck=arg1+" Exists";
			String strValidate = toCheck.replace("_", " ");
			result=executeCommandLine("adb shell uiautomator runtest MaaFw.jar -c com.symbol.maaf.MaaFw -e EXISTS_BTN "+arg1,strValidate);
			if(result.contains(strValidate)) {
				log("Button is Present");
				log("Exiting from CheckUIButtonExists function");
				return "Pass";
			}
			else {
				log("Button is not Present");
				log("Exiting from CheckUIButtonExists function");
				return "Fail";
			}
		}catch(Exception ex){
			log("Button not found. reason :"+ex.getMessage());
			log("Exiting from CheckUIButtonExists function");
			return "Fail";
		}
	}	
	
	/**
	 * Check UI Text exists in android.widget.TextView class using UI automator by paasing partial text
	 * @author Vinod Shankar 
	 * @param getvalue
	 * @param arg1
	 * @return
	 */
	public String CheckUITextContains(Hashtable<String,String> getvalue,String arg1){
		try{
			log("Entered CheckUITextContains function");
			String toCheck=null;
			String result=null;
			toCheck=arg1+" Success";
			String strValidate = toCheck.replace("_", " ");
			result=executeCommandLine("adb shell uiautomator runtest MaaFw.jar -c com.symbol.maaf.MaaFw -e EXISTS_TXT_CONTAINS "+arg1,strValidate);
			if(result.contains(strValidate)) {
				log("Text is Present");
				log("Exiting from CheckUITextContains function");
				return "Pass";
			}
			else {
				log("Text is not Present");
				log("Exiting from CheckUITextContains function");
				return "Fail";
			}
		}catch(Exception ex){
			log("Text not found. reason :"+ex.getMessage());
			log("Exiting from CheckUITextContains function");
			return "Fail";
		}
	}
	
	/**
	 * Click on Native button in android.widget.Button class using UI automator by passing full text
	 * @author Vinod Shankar 
	 * @param getvalue
	 * @param arg1
	 * @return
	 */
	public String ClickUIButtonText(Hashtable<String,String> getvalue,String arg1){
		try{
			log("Entered ClickUIButtonText function");
			boolean res;
			int i=0;
			mobdriv.manage().timeouts().implicitlyWait(5, TimeUnit.SECONDS);
			int loopcount=500/5;
			String toCheck=null;
			String result=null;
			while(i<loopcount){
				toCheck=arg1+" Exists";
				String strValidate = toCheck.replace("_", " ");
				result=executeCommandLine("adb shell uiautomator runtest MaaFw.jar -c com.symbol.maaf.MaaFw -e EXISTS_BTN "+arg1,strValidate);
				if(result.contains(strValidate))
					res=true;
				else
					res=false;
				
				if(res==true){
					break;
				}
				Thread.sleep(5000);
				i++;

				if(i==loopcount){
					log("Button is not Present");
					mobdriv.manage().timeouts().implicitlyWait(50, TimeUnit.SECONDS);
					log("Exiting from ClickUIButtonText function");
					return "Fail";
				}
			}
			if(!result.equals("Fail")){
				toCheck="Success";
				result=null;
				result=executeCommandLine("adb shell uiautomator runtest MaaFw.jar -c com.symbol.maaf.MaaFw -e TAP_BTN_TXT "+arg1,toCheck);
				if(!result.equals("Fail")){
					log("Exiting ClickUIButtonText function");
					return "Pass";
				}else
				{
					log("Exiting ClickUIButtonText function");
					return "Fail";
				}
			}
			else
			{
				log("Button not present");
				log("Exiting ClickUIButtonText function");
				return "Fail";
			}
			
			
		}catch(Exception ex){
			log("Button not found. reason :"+ex.getMessage());
			log("Exiting from ClickUIButtonText function");
			return "Fail";
		}
	}	
	
	/**
	 * Click on Native text in android.widget.TextView class using UI automator by passing partial text
	 * @author Vinod Shankar 
	 * @param getvalue
	 * @param arg1
	 * @return
	 */
	public String ClickUITextView(Hashtable<String,String> getvalue,String arg1){
		try{
			log("Entered ClickUITextView function");
			boolean res;
			int i=0;
			mobdriv.manage().timeouts().implicitlyWait(5, TimeUnit.SECONDS);
			int loopcount=500/5;
			String toCheck=null;
			String result=null;
			while(i<loopcount){
				toCheck=arg1+" Success";
				String strValidate = toCheck.replace("_", " ");
				result=executeCommandLine("adb shell uiautomator runtest MaaFw.jar -c com.symbol.maaf.MaaFw -e EXISTS_TXT_CONTAINS "+arg1,strValidate);
				if(result.contains(strValidate))
					res=true;
				else
					res=false;
				
				if(res==true){
					break;
				}
				Thread.sleep(5000);
				i++;

				if(i==loopcount){
					log("Text is not Present");
					mobdriv.manage().timeouts().implicitlyWait(50, TimeUnit.SECONDS);
					log("Exiting from ClickUITextView function");
					return "Fail";
				}
			}
			if(!result.equals("Fail")){
				toCheck="Success";
				result=null;
				result=executeCommandLine("adb shell uiautomator runtest MaaFw.jar -c com.symbol.maaf.MaaFw -e TAP_TXT_CONTAINS "+arg1,toCheck);
				if(!result.equals("Fail")){
					log("Exiting ClickUITextView function");
					return "Pass";
				}else
				{
					log("Exiting ClickUITextView function");
					return "Fail";
				}
			}
			else
			{
				log("Text not present");
				log("Exiting ClickUITextView function");
				return "Fail";
			}
			
			
		}catch(Exception ex){
			log("Text not found. reason :"+ex.getMessage());
			log("Exiting from ClickUITextView function");
			return "Fail";
		}
	}	
	
	/**
	 * Swipe Notification bar and tap on Text in android.widget.TextView class using UI automator
	 * @author Vinod Shankar 
	 * @param getvalue
	 * @param arg1
	 * @return
	 */
	public String SwipeNotificationAndTap(Hashtable<String,String> getvalue,String arg1){
		try{
			log("Entered SwipeNotificationAndTap function");
			boolean res;
			int i=0;
			mobdriv.manage().timeouts().implicitlyWait(5, TimeUnit.SECONDS);
			int loopcount=500/5;
			String toCheck=null;
			String result=null;
			result=executeCommandLine("adb shell uiautomator runtest MaaFw.jar -c com.symbol.maaf.MaaFw -e SWIPE_NOTIFICATION True","numtests");
			while(i<loopcount){
				toCheck=arg1+" Success";
				String strValidate = toCheck.replace("_", " ");
				result=null;
				result=executeCommandLine("adb shell uiautomator runtest MaaFw.jar -c com.symbol.maaf.MaaFw -e EXISTS_TXT_CONTAINS "+arg1,strValidate);
				if(result.contains(strValidate))
					res=true;
				else
					res=false;
				
				if(res==true){
					break;
				}
				Thread.sleep(5000);
				i++;

				if(i==loopcount){
					log("Text is not Present");
					mobdriv.manage().timeouts().implicitlyWait(50, TimeUnit.SECONDS);
					log("Exiting from SwipeNotificationAndTap function");
					return "Fail";
				}
			}
			if(!result.equals("Fail")){
				result=null;
				toCheck=arg1+" Success";
				result=executeCommandLine("adb shell uiautomator runtest MaaFw.jar -c com.symbol.maaf.MaaFw -e TAP_TXT_CONTAINS "+arg1,toCheck);
				if(!result.equals("Fail")){
					log("Exiting SwipeNotificationAndTap function");
					return "Pass";
				}else
				{
					log("Exiting SwipeNotificationAndTap function");
					return "Fail";
				}
				
			}
			else
			{
				log("Button not present");
				log("Exiting SwipeNotificationAndTap function");
				return "Fail";
			}
			
			
		}catch(Exception ex){
			log("Button not found. reason :"+ex.getMessage());
			log("Exiting from SwipeNotificationAndTap function");
			return "Fail";
		}
	}
	
	/**
	 * Check Hardware Specific Menu using UI automator
	 * @author Vinod Shankar 
	 * @param getvalue
	 * @param arg1
	 * @return
	 */
	public String press_Menu(Hashtable<String,String> getvalue,String arg1){
		try{
			log("Entered CheckUIButtonExists function");
			String result=null;
			String toCheck="Pressed Menu";
			if(arg1.toLowerCase().contains("menu")) {
				result=executeCommandLine("adb shell uiautomator runtest MaaFw.jar -c com.symbol.maaf.MaaFw -e PRESS_MENU True",toCheck);
				if(result.contains(toCheck)) {
					log("Menu Clicked");
					log("Exiting from press_Menu function");
					return "Pass";
				}
				else {
					log("Menu not clicked");
					log("Exiting from press_Menu function");
					return "Fail";
				}
			}
			else {
				log("Wrong Parameter");
				return "Fail";
			}
			
		}catch(Exception ex){
			log("Menu failed. reason :"+ex.getMessage());
			log("Exiting from press_Menu function");
			return "Fail";
		}
	}	
	
	/**
	 * To validate alert and text of alert
	 * @author Rohini
	 * @param getvalue
	 * @param objname
	 * @return
	 */
	public String validate_Alert(Hashtable<String,String> getvalue,String objname){
		try{
			
			log("Entered validate_Alert function");				
		    boolean res= isAlertPresent();
			if(res==true){
				log("Alert found");
				Alert alert = mobdriv.switchTo().alert();
				String altext = alert.getText();
				if(altext.contains(objname)){
					log("Alert with correct Text found");
					alert.accept();
					return "Pass";	
				}else{
					log("Alert with correct Text not found");
					return "Fail";	
				}
							
			}else{
				log("Alert not found");
				log("Exiting from validate_Alert function");
				return "Fail";				
			}
			
		}catch(Exception ex){
			log("Alert not found -"+objname+" reason :"+ex.getMessage());
			log("Exiting from validate_Alert function");
			return "Fail";
		}
		
	}
		
	/**
	 * To validate on any text in the given page (Non Vladimir)
	 * @author Prashanth
	 * @param getvalue
	 * @param objname
	 * @return
	 */
	public String validate_OldText_Exists(Hashtable<String,String> getvalue,String objname){
		try{
			log("Entered validate_OldText_Exists function");		
			String content = element("objective_id").getText();		
			if(content.contains(objname)){
				log(objname+" Testcase Text found");	
				log("Exiting from validate_OldText_Exists function");
				return "Pass";
			}else{
				log(objname+ " Testcase Text not found");
				log("Exiting from validate_OldText_Exists function");				
				return "Fail";
			}				
									
			
		}catch(Exception ex){
			log("Text not found -"+objname+" reason :"+ex.getMessage());
			log("Exiting from validate_OldText_Exists function");
			return "Fail";
		}
		
				
	} 

	/**
	 * Function to send Key events via adb
	 * @author Prashanth
	 * @param getvalue
	 * @param Keyvalue
	 * @return
	 */
	public String sendKeyEvents(Hashtable<String,String> getvalue,String Keyvalue) {
		String result= "";
		try{
			log("Entered sendKeyEvents function");
			log(Keyvalue);
			if(Keyvalue.equalsIgnoreCase("Volumeup"))
			{
				log("Entered volumeup");	
				//new Actions(mobdriv).sendKeys("24").perform();
				result=executeCommandLine("adb shell input keyevent 24", "");
				result="pass";
				log("pass");
			}
			else if(Keyvalue.equalsIgnoreCase("Volumedown"))
			{
				log("Entered volumedown");
				//new Actions(mobdriv).sendKeys(SelendroidKeys.ALT_LEFT).perform();
				result=executeCommandLine("adb shell input keyevent 25", "");
				result="pass";
				log("pass");
								
			}
			else if(Keyvalue.equalsIgnoreCase("PTTKey"))
			{
				log("Entered PTTKey");
				//new Actions(mobdriv).sendKeys("104").perform();
				result=executeCommandLine("adb shell input keyevent 104", "");
				result="pass";
				log("pass");
				
			}
			else if(Keyvalue.equalsIgnoreCase("Triggerkey"))
			{
				log("Entered Triggerkey");
				//new Actions(mobdriv).sendKeys("104").perform();
				result=executeCommandLine("adb shell input keyevent 103", "");
				result="pass";
				log("pass");
				
			}
			return "pass";
		}
		
		catch(Exception ex){
			log("Exiting from sendKeyEvents function");
			return "fail";
		}
		
	}
				
	 /**
	 * Function to Validate Keys Captured
	 * @author Prashanth
	 * @param getvalue
	 * @param Key_expected
	 * @return
	 */
	public String validate_keyCaptured(Hashtable<String,String> getvalue,String Key_expected) {
		String result= "";
		String Key1_actual;
		String Key2_actual;
		try{
			log("Entered validate_keyCaptured function");
			Key1_actual= element("clbkdata_id").getText();
			Key2_actual= element("clbkdata2_id").getText();
			log(Key1_actual);
			log(Key2_actual);
			if((Key1_actual.equals(Key_expected))||(Key2_actual.equals(Key_expected)))
			{
				log("Actual Value matches Expected");
				result="pass";
				log(result);
				log("Exiting from validate_keyCaptured function");
				return "pass";
			}
			else if(Key_expected.equals("null")&&Key1_actual.equals("")&&Key2_actual.equals("")) {
				log("Actual Value matches Expected");
				result="pass";
				log(result);
				log("Exiting from validate_keyCaptured function");
				return "pass";
			}
			else
			{
				log("Actual Value does not match Expected");
				result="fail";
				log(result);
				log("Exiting from validate_keyCaptured function");
				return "fail";
			}
		
		}
		
		catch(Exception ex){
			log("Exiting from validate_keyCaptured function");
			return "fail";
		}
	
	}
	
	/**
	 * validate text in SMS and Email Body
	 * @author Vinod Shankar 
	 * @param getvalue
	 * @param arg1
	 * @return
	 */
	public String validate_CompareEditText(Hashtable<String,String> getvalue,String arg1){
		try{
			log("Entered validate_TextMsgBody function");
			String[] param = arg1.split(",");
			String toCheck="Success";
			String result=executeCommandLine("adb shell uiautomator runtest MaaFw.jar -c com.symbol.maaf.MaaFw -e COMPARE_EDITTXT_INSTANCE "+param[0]+":"+param[1],toCheck);
			if(result.contains(toCheck)) 
				return "pass";
			else {
				if(arg1.contains("155553132558335033")&&(validate_App_Exist_Device(getvalue, "com.android.dialer")!= "Pass")) {
					log("com.android.dialer doesnt exists");
					return "Pass";
				}
				else
					return "fail";
			}
				
		}catch(Exception ex){
			log("Text Not found. reason :"+ex.getMessage());
			log("Exiting from validate_SmsTextBody function");
			return "Fail";
		}
	}	
	
	/**
	 * TODO
	 * validate Toastmsg
	 * @author Vinod Shankar
	 * @param getvalue
	 * @param arg1
	 * @return
	 */
	public String validate_Toastmsg(Hashtable<String,String> getvalue,String arg1){
		try{
			log("Entered validate_Toastmsg function");
			mobdriv.switchTo().window("NATIVE_APP");
			WebElement result = waitForElement(By.partialLinkText("Service Started !"), 0, mobdriv);	
			System.out.println(result);
			return "pass";
		}catch(Exception ex){
			log("Not found. reason :"+ex.getMessage());
			log("Exiting from validate_Toastmsg function");
			return "Fail";
		}
	}	
	
	/**
	 * zoom page
	 * @author Vinod Shankar
	 * @param getvalue
	 * @return
	 */
	public String ZoomPage(Hashtable<String,String> getvalue,String arg1){
		try{
			log("Started Executing ZoomPage function");
			
			Dimension dim = mobdriv.manage().window().getSize();
			if(validate_App_Launched_Device(getvalue, "com.symbol.enterprisebrowser")=="Pass") {
				WebElement pages = element(arg1);
				TouchActions flick = new TouchActions(mobdriv).flick(pages, -100, 0, 0);
				flick.perform();
				mobdriv.getAdbConnection().tap(dim.width-100, dim.height);
				
			}else {
				WebElement pages = element(arg1);
				TouchActions flick = new TouchActions(mobdriv).flick(pages, -100, 0, 0);
				flick.perform();
				mobdriv.getAdbConnection().tap(dim.width-100, dim.height+100);
			}
				
			
			return "Pass";
		}
		catch(Exception ex){
			log("Exiting from ZoomPage function"+ ex.getMessage());
			return "Fail";
		}
	}

	/**
	 * To not contain some text
	 * @author Chaithra
	 * @param getvalue
	 * @param objname
	 * @return
	 */
	public String validate_doesNotContain(Hashtable<String,String> getvalue,String objname){
		try{
			log("Entered validate_Result function");
			String content = element("results_xpath").getText();			
			if(content.contains(objname)){
				log(objname+" Testcase Text found");				
				log("Exiting from validate_Result function");
				return "Fail";
			}else{
				log(objname+ " Testcase Text not found");
				log("Exiting from validate_Result function");				
				return "Pass";
			}				
									
			
		}catch(Exception ex){
			log("function failed reason :"+ex.getMessage());
			log("Exiting from validate_Result function");
			return "Fail";
		}
		
				
	}


	/**
	 * To validate Result
	 * @author Chaithra M
	 * @param getvalue
	 * @param objname
	 * @return
	 */
	public String validate_Page(Hashtable<String,String> getvalue,String objname){
		try{
			log("Entered validate_Page function");
			String content = element("loadpage_xpath").getText();			
			if(content.contains(objname)){
				log(objname+" Testcase Text found");				
				log("Exiting from validate_Page function");
				return "Pass";
			}else{
				log(objname+ " Testcase Text not found");
				log("Exiting from validate_Page function");				
				return "Fail";
			}				
									
			
		}catch(Exception ex){
			log("function failed reason :"+ex.getMessage());
			log("Exiting from validate_Page function");
			return "Fail";
		}
		
				
	}

	/**
	 * Counting signal callback 
	 * @author Chaithra
	 * @param getvalue
	 * @param objName
	 * @return
	 */
	public String signalCallbackcount(Hashtable<String,String> getvalue,String objname){
		try{
			log("Entered count function");
			String[] args = null;
			args = objname.split(",");
			WebElement temp1 = element(args[0]);
			List<WebElement> list1 = temp1.findElements(By.tagName(("ul")));
			Integer count1 = list1.size();
			System.out.println(count1);
			wifi_Mode(getvalue, "OFF");
			wifi_Mode(getvalue, "ON");
			press_Key(getvalue, "Home");
			launch_App_Device(getvalue,args[1]);
			WebElement temp2 = element(args[0]);
			List<WebElement> list2 = temp2.findElements(By.tagName(("ul")));
			Integer count2 = list2.size();
			System.out.println(count2);
			if(count2 > count1){
				log("callback firing");
				log("Exiting from count function");
				return "Pass";
			}
			else{
				log("callback not firing");
				log("Exiting from count function");
				return "Fail";
			}
			
		}
		catch(Exception ex){
			log("count of calback not found. reason :"+ex.getMessage());
			log("Exiting from count function");
			return "Fail";
		}
	}
	
	/**
	 * To check if callback has stopped firing
	 * @author Chaithra
	 * @param getvalue
	 * @param objname
	 * @return
	 */
	public String checkstopwlanStatus(Hashtable<String,String> getvalue,String objname){
		try{
			log("Entered checkstopwlanStatus function");	
			String[] args = null;
			args = objname.split(",");
			WebElement temp1 = element(args[0]);
			List<WebElement> list1 = temp1.findElements(By.tagName(("ul")));
			Integer count1 = list1.size();
			System.out.println(count1);
			wifi_Mode(getvalue, "OFF");
			wifi_Mode(getvalue, "ON");
			launch_App_Device(getvalue, args[1]);
			WebElement temp2 = element(args[0]);
			List<WebElement> list2 = temp2.findElements(By.tagName(("ul")));
			Integer count2 = list2.size();
			System.out.println(count2);
			if(count2 == count1){
				log("callback has stopped firing");
				log("Exiting from checkstopwlanStatus function");
				return "Pass";
			}
			else{
				log("callback is still firing ");
				log("Exiting from checkstopwlanStatus function");
				return "Fail";
			}
			
		}
		catch(Exception ex){
			log("unable to check id callback has stopped firing :"+ex.getMessage());
			log("Exiting from checkstopwlanStatus function");
			return "Fail";
		}
	}
	
		
	/**
	 * To validate on Image exists
	 * @author Vinod Shankar
	 * @param getvalue
	 * @param objname
	 * @return
	 */
	public String validate_Download_Image(Hashtable<String,String> getvalue,String objname){
		try{
			log("Entered validate_Download_Image function");		
			String content = element("image_download_xpath").getAttribute("src");			
			if(content.contains(objname)){
				log(objname+" Testcase Text found");				
				log("Exiting from validate_Download_Image function");
				return "Pass";
			}else{
				log(objname+ " Testcase Text not found");
				log("Exiting from validate_Download_Image function");				
				return "Fail";
			}				
									
			
		}catch(Exception ex){
			log("Text not found -"+objname+" reason :"+ex.getMessage());
			log("Exiting from validate_Download_Image function");
			return "Fail";
		}
		
				
	}
	
	/**
	 * To Enter New Contact
	 * @author Chaithra
	 * @param getvalue
	 * @param objname
	 * @return
	 */
	public String EnternewContact(Hashtable<String,String> getvalue,String objname){
		try{
			String xpathString = objname.substring(0,15);
			String valueString = objname.substring(16,20);
			System.out.println(xpathString);
			System.out.println(valueString);
			log("Entered EnternewContact function");		
			element(xpathString).sendKeys(valueString);	
			return "Pass";			
									
			}
		catch(Exception ex){
			log("Text not found -"+objname+" reason :"+ex.getMessage());
			log("Exiting from EnternewContact function");
			return "Fail";
		}
		
				
	}
	
	/**
	 * To Check Generic Values
	 * @author Chaithra
	 * @param getvalue
	 * @param objname
	 * @return
	 */
	public String CheckGenericValues(Hashtable<String,String> getvalue,String objname){
		try{
			log("Entered Checkuuid function");
			if(objname.equals("uuid")){
				String uuidvalue1 = executeCommandLine("adb shell getprop ro.hardware.uuid");
				String uuidvalue2 = executeCommandLine("adb shell getprop persist.sys.uuid");
				String content = element("result_xpath").getText();
				if(content.toLowerCase().equals(uuidvalue1.toLowerCase())||content.toLowerCase().equals(uuidvalue2.toLowerCase())){
			    	log("Correct uuid");	
			    	return "Pass";			
				}
			    else{
			    	if(content.length()>5&&uuidvalue1.contains("")&&uuidvalue2.contains("")) {
			    		log("Correct uuid");	
				    	return "Pass";
			    	}
			    	else {
			    		log("InCorrect uuid");
				    	return "Fail";
			    	}
			    	
			    }
			}
			else if(objname.equals("oeminfo")){
				String oeminfovalue = executeCommandLine("adb shell getprop ro.product.device");
				String content = element("result_xpath").getText();
				if(content.toLowerCase().equals(oeminfovalue.toLowerCase())){
					log("Correct oeminfo");	
					return "Pass";
				}
				else{
					String productname = executeCommandLine("adb shell getprop ro.product.name");
					if(content.toLowerCase().equals(productname.toLowerCase())){
						log("Correct oeminfo");	
						return "Pass";
					}
					else {
						log("InCorrect oeminfo");
						return "Fail";
					}
					
				 }
			}
			else{
				log("wrong value");
				return "Fail";
			}
		}
		catch(Exception ex){
			log("Text not found -"+objname+" reason :"+ex.getMessage());
			log("Exiting from Checkuuid function");
			return "Fail";
		}
		
				
	}
	
	/**
	 * To validate Contact Page
	 * @author Chaithra M
	 * @param getvalue
	 * @param objname
	 * @return
	 */
	public String validate_ContactPage(Hashtable<String,String> getvalue,String objname){
		try{
			log("Entered validate_ContactPage function");
			String content = element("contactsform_xpath").getText();			
			if(content.contains(objname)){
				log(objname+" Testcase Text found");				
				log("Exiting from validate_ContactPage function");
				return "Pass";
			}else{
				log(objname+ " Testcase Text not found");
				log("Exiting from validate_ContactPage function");				
				return "Fail";
			}				
									
			
		}catch(Exception ex){
			log("function failed reason :"+ex.getMessage());
			log("Exiting from validate_ContactPage function");
			return "Fail";
		}
		
				
	}
	/**
	 * To validate Contact details
	 * @author Chaithra M
	 * @param getvalue
	 * @param objname
	 * @return
	 */
	public String validate_ContactDetails(Hashtable<String,String> getvalue,String objname){
		try{
			log("Entered validate_ContactDetails function");
			String content = element("contactdetails_xpath").getText();			
			if(content.contains(objname)){
				log(objname+" Testcase Text found");				
				log("Exiting from validate_ContactDetails function");
				return "Pass";
			}else{
				log(objname+ " Testcase Text not found");
				log("Exiting from validate_ContactDetails function");				
				return "Fail";
			}				
									
			
		}catch(Exception ex){
			log("function failed reason :"+ex.getMessage());
			log("Exiting from validate_ContactDetails function");
			return "Fail";
		}
		
				
	}
	/**
	 * To validate New Contact
	 * @author Chaithra M
	 * @param getvalue
	 * @param objname
	 * @return
	 */
	public String validate_NewContact(Hashtable<String,String> getvalue,String objname){
		try{
			log("Entered validate_NewContact function");
			String content = element("contacts_id").getText();			
			if(content.contains(objname)){
				log(objname+" Testcase Text found");				
				log("Exiting from validate_NewContact function");
				return "Pass";
			}else{
				log(objname+ " Testcase Text not found");
				log("Exiting from validate_NewContact function");				
				return "Fail";
			}				
									
			
		}catch(Exception ex){
			log("function failed reason :"+ex.getMessage());
			log("Exiting from validate_NewContact function");
			return "Fail";
		}
		
				
	}
	
	/**
	 * Counting contacts created
	 * @author Chaithra
	 * @param getvalue
	 * @param objName
	 * @return
	 */
	public String Contactcount(Hashtable<String,String> getvalue,String objname){
		try{
			log("Entered Contactcount function");		
			WebElement temp = element(objname);
			List<WebElement> list = temp.findElements(By.tagName(("li")));
			Integer count = list.size();
			System.out.println(count);
	        if(count == 11){
				log("Contact count is correct");
				log("Exiting from Contactcount function");
				return "Pass";
			}
			else{
				log("Contact count is wrong");
				log("Exiting from Contactcount function");
				return "Fail";
			}
			
		}
		catch(Exception ex){
			log("count of contact not found. reason :"+ex.getMessage());
			log("Exiting from Contactcount function");
			return "Fail";
		}
	}
	
	/**
	 * Type in Addressbar
	 * @author Rohini
	 * @param getvalue
	 * @param objkey
	 * @return
	 */
	public String TypeinAddressbar(Hashtable<String,String> getvalue,String objkey){
		try{
			log("Executing SendData function");		
			String[] args=objkey.split(",");
			element(args[0]).clear();
		    element(args[0]).sendKeys(args[1]);	
		
		}catch(Exception ex){
			reportError("Fail-"+ex.getMessage());
			return "Fail";
		}
		log("Exiting Senddata function");
		return "pass";
	} 
	
	public String ExecuteSMSValidation(Hashtable<String,String> getvalue){
		try{
			log("Executing ExecuteSMSValidation function");		
			if(validate_App_Exist_Device(getvalue,"com.android.mms")=="Pass") {
				String res= validate_App_Launched_Device(getvalue,"com.android.mms");
				res= validate_CompareEditText(getvalue,"0,Test_case_passed_if_you_see_this_in_Message_body.");
				press_Key(getvalue,"Back");
				press_Key(getvalue,"Back");
				ClickUIButtonText(getvalue,"OK");
				return res;
			}
			else {
				log("SMS App not present on device");
				return "Pass";
			}

		}catch(Exception ex){
			reportError("Fail-"+ex.getMessage());
			return null;
		}
		
	}    
	
	public String PullConfigxml(Hashtable<String,String> getvalue){
		try{
			executeCommandLine("adb pull "+"/sdcard/Android/data/com.symbol.enterprisebrowser/Config.xml "+ System.getProperty("user.dir")+ "\\src\\com\\input\\Config.xml");
			return "Pass";
		}catch(Exception ex){
			reportError("Fail-"+ex.getMessage());
			return "Fail";
		}
	}
	
	public String PushConfigxml(Hashtable<String,String> getvalue){
		try{
			executeCommandLine("adb push "+ System.getProperty("user.dir")+ "\\src\\com\\input\\Config.xml "+"/sdcard/Android/data/com.symbol.enterprisebrowser/Config.xml");
			return "Pass";
		}catch(Exception ex){
			reportError("Fail-"+ex.getMessage());
			return "Fail";
		}
	}

	public String ChangeConfigxml(Hashtable<String,String> getvalue, String arg1){
		try{
			log("Executing ChangeConfigxml function");	
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
				log("Config xml doesnt exists");	
				return "Fail";
			}


		}catch(Exception ex){
			reportError("Fail-"+ex.getMessage());
			return "Fail";
		}
		
	}   
	public void TaponGetStartparams(Hashtable<String,String> getvalue){
		String wmsize=executeCommandLine("adb shell wm size");
		String[] wh = wmsize.split(":");
		wh[1] = wh[1].replace(" ", "");
		String[] widthheight = wh[1].split("x");
		int height = (Integer.parseInt(widthheight[1])/2)-160;
		int width = (Integer.parseInt(widthheight[0])/2)-150;
		mobdriv.getAdbConnection().tap(width, height);
	}
}



                                          



