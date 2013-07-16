require 'rho/rhocontroller'
require 'helpers/browser_helper'

class SystemController < Rho::RhoController
  include BrowserHelper
  @layout = 'System/layout'
  # GET /System
  def index
    render :back => '/app'
  end

  def get_registry_sync
    theRegSetting = System.getRegistrySetting({:hive => 'HKLM', :key => 'software', :Setting => 'RhoElementsTest'})
    puts "Registry Setting retrieved: #{theRegSetting}"
  end
  
  def get_registry_sync1
    theRegSetting = System.getRegistrySetting({"hive" => 'HKLM', "key" => 'software', "Setting" => 'RhoElementsTest'})
    puts "Registry Setting retrieved: #{theRegSetting}"
  end
  
  def windowFrameSet1
    System.setWindowFrame 50,50,200,200
  end
  
  def windowFrameSet2
    System.setWindowFrame(50,50,200,200)
  end
  
  def windowPositionSet1
    System.setWindowPosition(200,200)
  end

  def getProperties1
    myProps=['country','deviceName','devicePushId','freeServerPort']
    myValue = System.getProperties(myProps)
    puts "Values are #{myValue.to_s}"
  end
  
  def getPropertiesAsync
    System.getProperties(['country','deviceName','devicePushId','freeServerPort'], url_for(:action => :propertiesCallback))
  end
  
  def getPropertiesAsync2
    System.getProperties(['deviceName'], url_for(:action => :propertiesCallback))
  end
  
  def propertiesCallback
    puts "PARAMS #{@params}"
    Alert.show_popup "Hello"
  end
  
  def getPropertiesLambda
    System.getProperties(['country','deviceName','devicePushId','freeServerPort'], lambda{|args| puts "lamda: #{args}"});
  end
  
  def getoeminfo
    inf= System.oemInfo
    puts " working "
    Alert.show_popup(inf)
  end
  
  def getUuid
     id= System.uuid
     puts " working "
     Alert.show_popup(id)
   end
   
   def setautorotate
     System.setProperty('screenAutoRotate', 'true')
     render :action => :index, :back => '/app'
   end
   
   def reset_autorotate
     System.setProperty('screenAutoRotate', 'false')
     render :action => :index, :back => '/app'
   end
   
   def setautorotate1
     System.setProperties('screenAutoRotate'=>true)  
     render :action => :index, :back => '/app'      
   end  
   
    def reset_autorotate1
      System.setProperties('screenAutoRotate'=>false)
      render :action => :index, :back => '/app'
      end
     
    def setautorotate2
    System.screenAutoRotate=true
      render :action => :index, :back => '/app'
      end  
     
      def reset_autorotate2
       System.screenAutoRotate=false
        render :action => :index, :back => '/app'
      end
      
  def setscreensleep
    System.setProperty('screenSleeping','true') 
    render :action => :index, :back => '/app'
     end
     
     def reset_screensleep
       System.setProperty('screenSleeping','false')
       render :action => :index, :back => '/app'
     end
     
     def setscreensleep1
       System.setProperties('screenSleeping'=>true)
       render :action => :index, :back => '/app'
          end  
     
      def reset_screensleep1
        System.setProperties('screenSleeping'=>false)
        render :action => :index, :back => '/app'
        end
       
      def setscreensleep2
        System.screenSleeping=true
        render :action => :index, :back => '/app'
        end  
       
        def reset_screensleep2
          System.screenSleeping=false
          render :action => :index, :back => '/app'
        end  
      
  def install_cab_http
    applicationUrl='http://192.168.6.27/vinod/InstallTestapp.cab'
    System.applicationInstall(applicationUrl)
    render :action => :index, :back => '/app'   
end

  def install_cab_ftp
    applicationUrl= 'ftpadmin:ftpadmin@ftp://192.168.6.18:21/Received/InstallTestapp.cab'
    System.applicationInstall(applicationUrl)
       render :action => :index, :back => '/app'
     end
     
  def install_cab_local
    apppath = Rho::RhoApplication.get_app_path('app')
    applicationUrl=File.join(apppath, "InstallTestapp.cab")
    System.applicationInstall(applicationUrl)
        render :action => :index, :back => '/app'
      end

  def install_apk_http
    applicationUrl= 'http://192.168.6.27/vinod/InstallTestapp_signed.apk'
    System.applicationInstall(applicationUrl)
    render :action => :index, :back => '/app'
  end
  
  def install_apk_ftp
    applicationUrl= 'ftpadmin:ftpadmin@ftp://192.168.6.18:21/Received/InstallTestapp_signed.apk'
    System.applicationInstall(applicationUrl)
    render :action => :index, :back => '/app'
  end
  #
  def install_apk_local
    apppath = Rho::RhoApplication.get_app_path('app')
    applicationUrl= File.join(apppath, "InstallTestapp_signed.apk")
    System.applicationInstall(applicationUrl)
      render :action => :index, :back => '/app'
    end    
    
  def install_ipa_http
    applicationUrl='http://192.168.6.27/vinod/nativejasmine.ipa'
    System.applicationInstall(applicationUrl)
    render :action => :index, :back => '/app'   
end   
    
    
  def install_ipa_local
     apppath = Rho::RhoApplication.get_app_path('app')
     applicationUrl= File.join(apppath, "nativejasmine.ipa")
     System.applicationInstall(applicationUrl)
       render :action => :index, :back => '/app'
   end    
    
    
  def uninstall_cab
    applicationName ='rhomobile InstallTestapp'
        System.applicationUninstall(applicationName)
        render :action => :index, :back => '/app'   
 end     
  
  def uninstall_apk
     applicationName ='com.rhomobile.simpleapp-rhodes'
         System.applicationUninstall(applicationName)
         render :action => :index, :back => '/app'   
  end     
  
  def uninstall_ipa
     applicationName ='nativejasmine'
         System.applicationUninstall(applicationName)
         render :action => :index, :back => '/app'   
  end  
  
  def bringToFront
    System.bringToFront()
    render :action => :index, :back => '/app' 
  end
  
  def deleteFolder_local
    if System::get_property('platform') == 'ANDROID'
      pathToFolder = File.join('/sdcard/', "DummyFolder")
       else
    pathToFolder= File.join(Rho::RhoApplication.get_app_path('app'), 'DummyFolder')
    end
     System.deleteFolder(pathToFolder)
         render :action => :index, :back => '/app'
       end
 
   
   def deleteFolder_http
     pathToFolder="http://192.168.6.27/vinod/DummyFolder"
     System.deleteFolder(pathToFolder)
     puts" folder deleted"
     render :action => :index, :back => '/app'
   end
  
  def open_httpurl_pdf
      url ="http://192.168.6.27/vinod/RhoMobileSuite2217RCR.pdf"
      System.openUrl(url)
      redirect :action => :index
    end
  
  def open_webpage
       url ="http://www.rhomobile.com"
       System.openUrl(url)
       redirect :action => :index
     end
     
  def zip_file_password
   getmodelpath = Rho::RhoApplication::get_model_path('app', 'System')
   localPathToFile = File.join(getmodelpath, "file1.txt")
   password="rhoelements"
              if System::get_property('platform') == 'ANDROID'
                localPathToZip = File.join('/sdcard/', "GenZipfile_pass.zip")
                elsif System::get_property('platform') == 'APPLE'
                 localPathToZip = File.join(Rho::RhoApplication::get_user_path(), "GenZipfile_zip.zip")
                else
                apppath = Rho::RhoApplication.get_app_path('app')
                localPathToZip = File.join(apppath, "GenZipfile_pass.zip")
               end 
      System.zipFile( localPathToZip,localPathToFile,password)
      redirect :action => :index  
  end     
  def zip_file_zip
        password="rhoelements"
        if System::get_property('platform') == 'ANDROID'
          localPathToFile= File.join('/sdcard/', "GenZipfile.zip")
          elsif System::get_property('platform') == 'APPLE'
             localPathToFile = File.join(Rho::RhoApplication::get_user_path(), "GenZipfile.zip")
             else
               apppath = Rho::RhoApplication.get_app_path('app')
          localPathToFile= File.join(apppath, "GenZipfile.zip")
        end
        
         if System::get_property('platform') == 'ANDROID'
                   localPathToZip = File.join('/sdcard/', "GenZipfile_zip.zip")
                   elsif System::get_property('platform') == 'APPLE'
                     localPathToZip = File.join(Rho::RhoApplication::get_user_path(), "GenZipfile_zip.zip")
                   else
                   apppath = Rho::RhoApplication.get_app_path('app')
                   localPathToZip = File.join(apppath, "GenZipfile_zip.zip")
                  end             
                System.zipFile( localPathToZip,localPathToFile,password)
                 redirect :action => :index  
    end      

  def zip_file
        getmodelpath = Rho::RhoApplication::get_model_path('app', 'System')
         localPathToFile = File.join(getmodelpath, "file2.txt")
         if System::get_property('platform') == 'ANDROID'
           localPathToZip = File.join('/sdcard/', "GenZipfile.zip")
           elsif System::get_property('platform') == 'APPLE'
               localPathToZip = File.join(Rho::RhoApplication::get_user_path(), "GenZipfile_file.zip")
            else
           apppath = Rho::RhoApplication.get_app_path('app')
           localPathToZip = File.join(apppath, "GenZipfile.zip")
          end
          
        System.zipFile( localPathToZip,localPathToFile)
         redirect :action => :index  
  end
       
  def zip_file_img
              getmodelpath = Rho::RhoApplication::get_model_path('app', 'System')
          localPathToFile = File.join(getmodelpath, "blueButton.png")
         password="rhoelements"
              
               if System::get_property('platform') == 'ANDROID'
                 localPathToZip = File.join('/sdcard/', "GenZipfile_img.zip")
                elsif System::get_property('platform') == 'APPLE'
                 localPathToZip = File.join(Rho::RhoApplication::get_user_path(), "GenZipfile_img.zip")
               else
                 apppath = Rho::RhoApplication.get_app_path('app')
                 localPathToZip = File.join(apppath, "GenZipfile_img.zip")
                end
                
              System.zipFile( localPathToZip,localPathToFile)
               redirect :action => :index  
               end       
               
  #                      
  def zip_files
    
    basePath="./"
    getmodelpath  = Rho::RhoApplication::get_model_path('app', 'System')
        filePathsToZip = Array.new
       a1=File.join(getmodelpath, "file1.txt")    
       a2=File.join(getmodelpath, "blueButton.png") 
          filePathsToZip << a1 << a2
      if System::get_property('platform') == 'ANDROID'
        localPathToZip = File.join('/sdcard/', "GenZipfiles.zip") 
        elsif System::get_property('platform') == 'APPLE'
        localPathToZip = File.join(Rho::RhoApplication::get_user_path(), "GenZipfiles.zip")
      else
         apppath = Rho::RhoApplication.get_app_path('app')
        localPathToZip = File.join(apppath, "GenZipfiles.zip")
      end
    System.zipFiles(localPathToZip,basePath,filePathsToZip)
       redirect :action => :index 
    end                   
  # 
  def unzip_file
    if System::get_property('platform') == 'ANDROID'
      localPathToZip= File.join('/sdcard/', "GenZipfile.zip")
      elsif System::get_property('platform') == 'APPLE'
       localPathToZip = File.join(Rho::RhoApplication::get_user_path(), "GenZipfile.zip")
         else
    apppath = Rho::RhoApplication.get_app_path('app')
    localPathToZip= File.join(apppath, "GenZipfile.zip")
    end
    System.unzipFile(localPathToZip)
    redirect :action => :index 
  end    
 
  # 
  def unzip_NoPwd
     if System::get_property('platform') == 'ANDROID'
       localPathToZip= File.join('/sdcard/', "GenZipfile_pass.zip")
       elsif System::get_property('platform') == 'APPLE'
         localPathToZip = File.join(Rho::RhoApplication::get_user_path(), "GenZipfile_pass.zip")
        else
     apppath = Rho::RhoApplication.get_app_path('app')
     localPathToZip= File.join(apppath, "GenZipfile_pass.zip")
     end
     System.unzipFile(localPathToZip)
     redirect :action => :index 
   end   
  
   #
  def unzip_Pwd
        password="rhoelements"
       if System::get_property('platform') == 'ANDROID'
         localPathToZip= File.join('/sdcard/', "GenZipfile_pass.zip")
         elsif System::get_property('platform') == 'APPLE'
         localPathToZip = File.join(Rho::RhoApplication::get_user_path(), "GenZipfile_pass.zip")
            else
       apppath = Rho::RhoApplication.get_app_path('app')
       localPathToZip= File.join(apppath, "GenZipfile_pass.zip")
       end
       System.unzipFile(localPathToZip,password)
       redirect :action => :index 
     end 
 
  #VT281-096 call unzipFile() after calling zipfiles()
  def unzip_Pwd_files
         password="rhoelements"
        if System::get_property('platform') == 'ANDROID'
          localPathToZip= File.join('/sdcard/', "GenZipfiles.zip")
          elsif System::get_property('platform') == 'APPLE'
          localPathToZip = File.join(Rho::RhoApplication::get_user_path(), "GenZipfiles.zip")
          else
        apppath = Rho::RhoApplication.get_app_path('app')
        localPathToZip= File.join(apppath, "GenZipfiles.zip")
        end
        System.unzipFile(localPathToZip,password)
        redirect :action => :index 
      end 
    
  def keyboard_show
     System.keyboardState='shown'
       render :action => :index, :back => '/app'
   end  
          
  def keyboard_hidden
       System.keyboardState='hidden'
         render :action => :index, :back => '/app'
    end            
  
  def Keyboard_show_set
     System.setProperty('keyboardState', 'shown')
     render :action => :index, :back => '/app'
   end     
 
  def Keyboard_hidden_set
      System.setProperty('keyboardState', 'hidden')
      render :action => :index, :back => '/app'
    end      

 def set_do_not_bakup_true
   getmodelpath = Rho::RhoApplication::get_model_path('app', 'System')
   pathToFile = File.join(getmodelpath, "file1.txt")
   doNotBackup=true
   System.setDoNotBackupAttribute(pathToFile,doNotBackup)
   render :action => :index, :back => '/app'
 end   
 
  def set_do_not_bakup_false
     getmodelpath = Rho::RhoApplication::get_model_path('app', 'System')
     pathToFile = File.join(getmodelpath, "file1.txt")
     doNotBackup=false
     System.setDoNotBackupAttribute(pathToFile,doNotBackup)   
     render :action => :index, :back => '/app' 
   end         
  
  def set_do_not_bakup_false_img
       getmodelpath = Rho::RhoApplication::get_model_path('app', 'System')
       pathToFile = File.join(getmodelpath, "blueButton.png")
       doNotBackup=false
       System.setDoNotBackupAttribute(pathToFile,doNotBackup)    
       render :action => :index, :back => '/app'
   end        

end