require 'rho/rhocontroller'

class SystemController < Rho::RhoController

  #GET /SystemTest
  def index
    puts "System index controller"

    #puts "#{Rho::WebView.nativeMenu}"	
    $sleeping = true unless $sleeping

    System.setScreenRotationNotification( url_for(:action => :screen_rotation_callback), "")
	
    render :back => '/app'  	
  end

  def disable_sleep
    $sleeping = !$sleeping
    System.screenSleeping = $sleeping
    render :action => :index
  end

  def screen_rotation_callback
    puts "screen_rotation_callback : #{@params}"
    WebView::refresh
  end


  def enable_fullscreen
    WebView.fullScreen = true
    render :action => :index
  end

  def disable_fullscreen
    WebView.fullScreen = false
    render :action => :index
  end
  
  def app_exit
    System.exit
  end


  def call_js
    WebView.executeJavascript("test();")
    #render :action => :call_js_result
    redirect :action => :call_js_result
  end  

  def show_alert
    Alert.show_popup "Alert from AJAX call."
  end

  def set_cookie
    WebView.setCookie("http://127.0.0.1", "test_key_1=test_value_1")
    WebView.setCookie("http://127.0.0.1", "test_key_2=test_value_2")
    redirect :action => :show_cookie
  end

  def show_cookie
    WebView.executeJavascript("show_cookie();")
    redirect :action => :index
  end

  def start_music_app
    System.runApplication('com.android.music', nil)
    redirect :action => :index
  end

  def get_start_test_app_ID
    if System.platform == 'ANDROID'
        return 'com.rhomobile.store'
    elsif System.platform == 'APPLE'
        return 'store'
    elsif System.platform == 'Blackberry'
        return 'store'
    elsif System.platform == 'WINDOWS_DESKTOP'
        return 'rhomobile/store/store.exe'
    else
        return 'rhomobile store/store.exe'
    end
  
  end

  def install_test_app
    url = 'http://localhost:42877/store-setup.exe'
    System.applicationInstall url
    redirect :action => :index
  end


  def is_test_app_installed
    installed = System.isApplicationInstalled(get_start_test_app_ID())
    Alert.show_popup(installed ? "installed" : "not installed")
    redirect :action => :index
  end

  def uninstall_test_app
    System.app_uninstall(get_start_test_app_ID())
    redirect :action => :index
  end

  def is_music_app_installed
    installed = System.isApplicationInstalled('com.android.music')
    Alert.show_popup(installed ? "installed" : "not installed")
    redirect :action => :index
  end

  def uninstall_music_app
    System.applicationUninstall('com.android.music')
    redirect :action => :index
  end

  def start_skype_app
    System.run_app('skype', nil)
    redirect :action => :index
  end

  def is_skype_app_installed
    installed = System.isApplicationInstalled('skype')
    Alert.show_popup(installed ? "installed" : "not installed")
    redirect :action => :index
  end

  def install_apk
    url = 'https://rhohub-prod-ota.s3.amazonaws.com/129b1fd5930d4d40b906addd08d61058/simpleapp-rhodes_signed.apk'
    System.applicationInstall url
    redirect :action => :index
  end

  def make_own_file
       fileNameW = File.join(Rho::RhoApplication::get_user_path(), 'tempfile.txt')
       f = File.new(fileNameW, 'w+')
       f.write('my own file !')
       f.close  
       render :action => :index
  end

  def show_own_file
      content = ''
      fileName = File.join(Rho::RhoApplication::get_user_path(), 'tempfile.txt')
      if File.exist?(fileName)
           File.open(fileName).each do |line|
               content = content + "\n" + line
           end
           Alert.show_popup(
                 :message=>"Own File is Exist. Content : "+"\n"+content,
                 :title=>"Own File",
                 :buttons => ["Ok"]
           )
      else
           Alert.show_popup(
                 :message=>"Own File is NOT Exist !",
                 :title=>"Own File",
                 :buttons => ["Ok"]
           )
      end
    render :action => :index
  end

  def set_badge_5
      System.applicationIconBadge = 5
      render :action => :index
  end

  def set_badge_0
      System.applicationIconBadge = 0
      render :action => :index
  end

end
