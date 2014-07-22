
#Windows RT Support#

##Test Cases##
    
####TestCase ID : VTxxx-01  
**Goal          : [win7] Support to build WinRT application via Command Line**  
**Steps         :**  
1 Open your build path in command line / terminal.  
2 Enter command `rake build:wp8:production`  
**Expected      : An installable file should be created under `app/bin/target/wrt/` File  must appears in directory bin**  
  
####TestCase ID : VTxxx-02  
**Goal          : [win7] Support to deploy WinRT application with WinRT device via Command Line**  
**Steps         :**  
1 Open your build path in command line / terminal.  
2 Enter command `rake run:wp8:device`  
**Expected      : The built applciation should get installed in the device directly.** 
  
####TestCase ID : VTxxx-03  
**Goal          : [win7] Support to winRT clean via command line**  
**Steps         :**  
1 Open your build path in command line / terminal.  
2 Enter command `rake clean:wp8`  
**Expected      : The project should get clean and the `app/bin` folder should get cleaned/flushed.** 
  
####TestCase ID : VTxxx-04  
**Goal          : [win7] Support to run winRT application on RhoSimulator**  
**Steps         :**  
1 Open your build path in command line / terminal.  
2 Enter command `rake run:wp8:rhosimulator`  
**Expected      : The project should get clean and the `app/bin` folder should get cleaned/flushed.** 
  
####TestCase ID : VTxxx-05  
**Goal          : [win7] Support to build winRT application using RhoMobile Studio**  
**Steps         :**  
1 Launch RhoMobile Studio.  
2 Create new RhoMobile application project using RhoMobile Studio.  
3 Select `Menu->RhoMobile->Production build`.   
4 Select the `Project-> Actual application`, `Platform-> WindowsRT`, and `Build-> Local`.  
**Expected      : An installable file should be created under `app/bin/target/wrt/` File  must appears in directory bin.** 
  
####TestCase ID : VTxxx-06  
**Goal          : [win7] Support to clean winRT application using RhoMobile Studio**  
**Steps         :**  
1 Launch RhoMobile Studio.  
2 Create new RhoMobile application project using RhoMobile Studio.  
3 Select `Menu->Project->Clean...`.   
4 Select the project to get cleaned and select `ok`. 
**Expected      : The project should get clean and the `app/bin` folder should get cleaned/flushed.**  

####TestCase ID : VTxxx-07  
**Goal          : [win7] Application build time should not be more than any other platform**  
**Steps         :**  
1 Launch RhoMobile Studio.  
2 Create new RhoMobile application project using RhoMobile Studio.  
3 Select `Menu->RhoMobile->Production build`.   
4 Select the `Project-> Actual application`, `Platform-> WindowsRT`, and `Build-> Local`. 
**Expected      : The application build time should not be longer than any other platform.**  

####TestCase ID : VTxxx-08  
**Goal          : [Mac] Support to build WinRT application via Command Line**  
**Steps         :**  
1 Open your build path in command line / terminal.  
2 Enter command `rake build:wp8:production`  
**Expected      : An installable file should be created under `app/bin/target/wrt/` File  must appears in directory bin**  
  
####TestCase ID : VTxxx-09  
**Goal          : [Mac] Support to deploy WinRT application with WinRT device via Command Line**  
**Steps         :**  
1 Open your build path in command line / terminal.  
2 Enter command `rake run:wp8:device`  
**Expected      : The built applciation should get installed in the device directly.** 
  
####TestCase ID : VTxxx-10  
**Goal          : [Mac] Support to winRT clean via command line**  
**Steps         :**  
1 Open your build path in command line / terminal.  
2 Enter command `rake clean:wp8`  
**Expected      : The project should get clean and the `app/bin` folder should get cleaned/flushed.** 
  
####TestCase ID : VTxxx-11  
**Goal          : [Mac] Support to run winRT application on RhoSimulator**  
**Steps         :**  
1 Open your build path in command line / terminal.  
2 Enter command `rake run:wp8:rhosimulator`  
**Expected      : The project should get clean and the `app/bin` folder should get cleaned/flushed.** 
  
####TestCase ID : VTxxx-12  
**Goal          : [Mac] Support to build winRT application using RhoMobile Studio**  
**Steps         :**  
1 Launch RhoMobile Studio.  
2 Create new RhoMobile application project using RhoMobile Studio.  
3 Select `Menu->RhoMobile->Production build`.   
4 Select the `Project-> Actual application`, `Platform-> WindowsRT`, and `Build-> Local`.  
**Expected      : An installable file should be created under `app/bin/target/wrt/` File  must appears in directory bin.** 
  
####TestCase ID : VTxxx-13  
**Goal          : [Mac] Support to clean winRT application using RhoMobile Studio**  
**Steps         :**  
1 Launch RhoMobile Studio.  
2 Create new RhoMobile application project using RhoMobile Studio.  
3 Select `Menu->Project->Clean...`.   
4 Select the project to get cleaned and select `ok`. 
**Expected      : The project should get clean and the `app/bin` folder should get cleaned/flushed.**  

####TestCase ID : VTxxx-14  
**Goal          : [Mac] Application build time should not be more than any other platform**  
**Steps         :**  
1 Launch RhoMobile Studio.  
2 Create new RhoMobile application project using RhoMobile Studio.  
3 Select `Menu->RhoMobile->Production build`.   
4 Select the `Project-> Actual application`, `Platform-> WindowsRT`, and `Build-> Local`. 
**Expected      : The application build time should not be longer than any other platform.** 