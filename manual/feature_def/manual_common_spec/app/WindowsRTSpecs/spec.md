
#Windows RT Support#
##Requirement description##
*Rho application support in WinRT devices, Build for WP8 should work in both WP8 and WinRT devices.*  
####API supported with WinRT####
- Application
- Database
- Log
- NativeTabBar
- NativeToolBar
- Network
- ORM and ORMModel
- Rhoconnect Client
- RhoFile
- System
- WebView  
- 2.2 Non Depricated API support

##Test Cases##
    
####TestCase ID : VTxxx-01  
**Goal          : [win8] Support to build WinRT application via Command Line**  
**Steps         :**  
1 Open your build path in command line / terminal.  
2 Enter command `rake build:wp8:production`  
**Expected      : An installable file should be created under `app/bin/target/wp8/` File  must appears in directory bin**  
  
####TestCase ID : VTxxx-02  
**Goal          : [win8] Support to deploy WinRT application with WinRT device via Command Line**  
**Steps         :**  
1 Open your build path in command line / terminal.  
2 Enter command `rake run:wp8:device`  
**Expected      : The built applciation should get installed in the device directly.** 
  
####TestCase ID : VTxxx-03  
**Goal          : [win8] Support to winRT clean via command line**  
**Steps         :**  
1 Open your build path in command line / terminal.  
2 Enter command `rake clean:wp8`  
**Expected      : The project should get clean and the `app/bin` folder should get cleaned/flushed.** 
  
####TestCase ID : VTxxx-04  
**Goal          : [win8] Support to run winRT application on RhoSimulator**  
**Steps         :**  
1 Open your build path in command line / terminal.  
2 Enter command `rake run:wp8:rhosimulator`  
**Expected      : The project should get clean and the `app/bin` folder should get cleaned/flushed.** 
  
####TestCase ID : VTxxx-05  
**Goal          : [win8] Support to build winRT application using RhoMobile Studio**  
**Steps         :**  
1 Launch RhoMobile Studio.  
2 Create new RhoMobile application project using RhoMobile Studio.  
3 Select `Menu->RhoMobile->Production build`.   
4 Select the `Project-> Actual application`, `Platform-> WindowsRT`, and `Build-> Local`.  
**Expected      : An installable file should be created under `app/bin/target/wp8/` File  must appears in directory bin.** 
  
####TestCase ID : VTxxx-06  
**Goal          : [win8] Support to clean winRT application using RhoMobile Studio**  
**Steps         :**  
1 Launch RhoMobile Studio.  
2 Create new RhoMobile application project using RhoMobile Studio.  
3 Select `Menu->Project->Clean...`.   
4 Select the project to get cleaned and select `ok`.  
**Expected      : The project should get clean and the `app/bin` folder should get cleaned/flushed.**  

####TestCase ID : VTxxx-07  
**Goal          : [win8] Application build time should not be more than any other platform**  
**Steps         :**  
1 Launch RhoMobile Studio.  
2 Create new RhoMobile application project using RhoMobile Studio.  
3 Select `Menu->RhoMobile->Production build`.   
4 Select the `Project-> Actual application`, `Platform-> WindowsRT`, and `Build-> Local`.  
**Expected      : The application build time should not be longer than any other platform.**  