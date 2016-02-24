package com.utils;

public class Constants {
	
	//public static String TESTCASE_SHEET="TestCases";
	public static String TESTCASE_RUNMODE="A";
	public static double REGRESSION_LEVEL=3.0;
	public static String Xls_Sheetname="TestCases";// name of the sheet where test cases are there
	//Paths
	public static String Xls_Path=System.getProperty("user.dir")+ "\\src\\com\\xls\\";
	public static String OR_Path=System.getProperty("user.dir")+"\\src\\com\\config\\OR.properties";
	public static String Config_Path=System.getProperty("user.dir")+"\\src\\com\\config\\Config.properties";	
	public static String InputFiles_Path = System.getProperty("user.dir")+"\\test-input\\";
	public static String GetAppVersion_Path = System.getProperty("user.dir")+"\\test-output\\GetAppVersion_result.txt";;

	//excel columns
	public static String Testcase_ID_Col="Testcase ID";
	public static String Automatable_Col="Automatable";
	public static String Regression_Col="Testcase Regression Level";
	public static String TestCaseObjective_Col="Testcase Objective";
	public static String TestDescription_Col="Description";
	public static String TestExpectedResult_Col="Expected Behaviour";
	public static String TestResult_Col="Results";
	
	
	//Admin Login Detail
    public static String server_Admin_login_default="autodemo2@sharklasers.com";
    public static String server_Admin_password_default="12345678";
    public static String defaultadmin_firstname="autodemo2";
	public static String defaultadmin_latname="demotest";	
    public static String Image_Path=System.getProperty("user.dir")+"\\test-input\\Images\\";
    public static String random_num="2811";
    
//Device Under Test
    public static String client_device_model="TC75";
}
