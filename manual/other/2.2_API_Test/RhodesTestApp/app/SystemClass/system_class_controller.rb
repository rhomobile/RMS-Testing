require 'rho/rhocontroller'
require 'helpers/browser_helper'

class SystemClassController < Rho::RhoController
  include BrowserHelper

  # GET /SystemClass
  def index
    @systemclasses = SystemClass.find(:all)
  
    $sleeping = true unless $sleeping

    render :back => '/app'
  end

  # GET /SystemClass/{1}
  def show
    @systemclass = SystemClass.find(@params['id'])
    if @systemclass
      render :action => :show, :back => url_for(:action => :index)
    else
      redirect :action => :index
    end
  end

  # GET /SystemClass/new
  def new
    @systemclass = SystemClass.new
    render :action => :new, :back => url_for(:action => :index)
  end

  # GET /SystemClass/{1}/edit
  def edit
    @systemclass = SystemClass.find(@params['id'])
    if @systemclass
      render :action => :edit, :back => url_for(:action => :index)
    else
      redirect :action => :index
    end
  end

  # POST /SystemClass/create
  def create
    @systemclass = SystemClass.create(@params['systemclass'])
    redirect :action => :index
  end

  # POST /SystemClass/{1}/update
  def update
    @systemclass = SystemClass.find(@params['id'])
    @systemclass.update_attributes(@params['systemclass']) if @systemclass
    redirect :action => :index
  end


   def disable_sleep
    $sleeping = !$sleeping
    System.set_sleeping($sleeping)
    render :action => :index
  end
  
  # POST /SystemClass/{1}/delete
  def delete
    @systemclass = SystemClass.find(@params['id'])
    @systemclass.destroy if @systemclass
    redirect :action => :index  
  end
  
  def app_exit
    System.exit
  end
  

  def disable_sleep
    $sleeping = !$sleeping
    System.set_sleeping($sleeping)
    render :action => :index
  end
  
  def open_external_url
    System.open_url('http://www.rhomobile.com')
    redirect :action => :index
  end
  

  def open_rhodes_pdf_http_url
    http_url ="http://192.168.6.27/vinod/RhoMobileSuite2217RCR.pdf"
    System.open_url(http_url)
    redirect :action => :index
  end
  
  def open_rhodes_pdf_ftp_url
    ftp_url ="ftpadmin:ftpadmin@ftp://192.168.6.18/TFTP/Received/RhoMobileSuite2217RCR.pdf" 
    System.open_url(ftp_url) 
    redirect :action => :index
  end
  
  def start_music_app
    System.run_app('com.rhomobile.installtestapp', nil)
    redirect :action => :index
  end
  
  def install_apk_http
    url = 'http://http://192.168.6.27/vinod/InstallTestapp_signed.apk'
    System.app_install url
    redirect :action => :index
  end
  
  def install_apk_ftp
    url = 'ftpadmin:ftpadmin@ftp://192.168.6.18/TFTP/Received/InstallTestapp_signed.apk'
    System.app_install url
    redirect :action => :index
  end
  
  def install_apk_Local
      url = "File.join(Rho::RhoApplication.get_app_path('app'), 'InstallTestapp_signed.apk')"
      System.app_install url
      redirect :action => :index
    end
    
  def is_music_app_installed
    installed = System.app_installed?('com.rhomobile.installtestapp')
    Alert.show_popup(installed ? "installed" : "not installed")
    redirect :action => :index
  end
  
  def uninstall_music_app
    System.app_uninstall('com.rhomobile.installtestapp')
    redirect :action => :index
  end
 
  def start_skype_app
    System.run_app('skype', nil)
    redirect :action => :index
  end

  def is_skype_app_installed
    installed = System.app_installed?('skype')
    Alert.show_popup(installed ? "installed" : "not installed")
    redirect :action => :index
  end
  
  def skype_app_uninstall
    System.app_uninstall('skype')
    redirect :action => :index
  end
  
  def start_cab_music_app
     System.run_app('InstallTestapp', nil)
     redirect :action => :index
   end
   
   def install_cab_http
     url = 'http://192.168.6.27/vinod/InstallTestapp.cab'
     System.app_install url
     redirect :action => :index
   end
   
   def install_cab_ftp
     url = 'ftpadmin:ftpadmin@ftp://192.168.6.18/TFTP/Received/InstallTestapp.cab'
     System.app_install url
     redirect :action => :index
   end
   
   def install_cab_local
       url = "File.join(Rho::RhoApplication.get_app_path('app'), 'InstallTestapp.cab')"
       System.app_install url
       redirect :action => :index
     end
     
   def unzip_file
     getmodelpath = Rho::RhoApplication::get_model_path('app', 'SystemClass')
     local_path_to_zip = File.join(getmodelpath, "test1.zip")
     System.unzip_file(local_path_to_zip)
     redirect :action => :index 
   end
  
  def zip_file
      getmodelpath = Rho::RhoApplication::get_model_path('app', 'SystemClass')
      local_path_to_file = File.join(getmodelpath, "new.erb")
      
       if System::get_property('platform') == 'ANDROID'
         local_path_to_zip = File.join('/sdcard/', "GenZipfile.zip")
        else
         apppath = Rho::RhoApplication.get_app_path('app')
         local_path_to_zip = File.join(apppath, "GenZipfile.zip")
        end
        
      System.zip_file(local_path_to_zip, local_path_to_file)
       redirect :action => :index 
    end
    
    def zip_file_password
      getmodelpath = Rho::RhoApplication::get_model_path('app', 'SystemClass')
      local_path_to_file = File.join(getmodelpath, "new.erb")    
       if System::get_property('platform') == 'ANDROID'
        local_path_to_zip = File.join('/sdcard/', "GenZipfilepass.zip")
       else
        apppath = Rho::RhoApplication.get_app_path('app')
        local_path_to_zip = File.join(apppath, "GenZipfilepass.zip")
       end
       
       System.zip_file(local_path_to_zip, local_path_to_file, "test1234")
       redirect :action => :index 
     end
     
    def zip_files
      getmodelpath = Rho::RhoApplication::get_model_path('app', 'SystemClass')
      array_of_files_to_be_zipped = Array.new
      a1=File.join(getmodelpath, "new.erb")    
      a2=File.join(getmodelpath, "new.bb.erb") 
      a3=File.join(getmodelpath, "rholog.txt") 
      array_of_files_to_be_zipped << a1 << a2 << a3
     if System::get_property('platform') == 'ANDROID'
        local_path_to_zip = File.join('/sdcard/', "GenZipfiles.zip") 
     else
        apppath = Rho::RhoApplication.get_app_path('app')
        local_path_to_zip = File.join(apppath, "GenZipfiless.zip")
     end
       
     System.zip_files(local_path_to_zip, './', array_of_files_to_be_zipped)
      redirect :action => :index 
   end
   
   def zip_files_password
     getmodelpath = Rho::RhoApplication::get_model_path('app', 'SystemClass')
         array_of_files_to_be_zipped = Array.new
         a1=File.join(getmodelpath, "new.erb")    
         a2=File.join(getmodelpath, "new.bb.erb") 
         a3=File.join(getmodelpath, "rholog.txt") 
         array_of_files_to_be_zipped << a1 << a2 << a3
     if System::get_property('platform') == 'ANDROID'
        local_path_to_zip = File.join('/sdcard/', "GenZipfilespass.zip")
     else
        apppath = Rho::RhoApplication.get_app_path('app')
        local_path_to_zip = File.join(apppath, "GenZipfilespass1.zip")
     end
     System.zip_files(local_path_to_zip, './', array_of_files_to_be_zipped, 'test1234')
     redirect :action => :index 
    end
    
  
  def set_badge_5
      System.set_application_icon_badge(5)
      render :action => :index
  end

  def set_badge_0
      System.set_application_icon_badge(0)
      render :action => :index
  end
  
  def change_locale_to_spanish
  
    System::set_locale("es")
    redirect :action => :index  
  end

  def change_locale_to_english
  
    System::set_locale("en")
    redirect :action => :index  
  end
  
  def set_proxy
    System.set_http_proxy_url('http://wwwgate0.mot.com:1080')
    redirect :action => :index 
  end
  
  def unset_proxy
    System.unset_http_proxy()
    redirect :action => :index 
  end
  

end
