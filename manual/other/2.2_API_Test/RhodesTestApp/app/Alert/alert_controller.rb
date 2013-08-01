require 'rho/rhocontroller'
require 'helpers/browser_helper'

class AlertController < Rho::RhoController
  include BrowserHelper

  # GET /Alert
  def index
    render :back => '/app'
  end

  #testcase ID VT229-0043
  def show_popup
    $testCaseID = "VT229-0043"
    @flash = "Show popup page"
    Alert.show_popup "Some message!Long Message.Very Long Meeesage"
    render :action => :index, :back => '/app'
  end

  #testcase ID VT229-0044
  def show_popup1
    $testCaseID = "VT229-0044"
    @flash = "Show popup page"
    Alert.show_popup(
        :message=>"Check the title.\n",
        :title=>"MineAlert",
        :buttons => ["Ok"]
     )
    render :action => :index, :back => '/app'
  end
  
  #testcase ID VT229-0045
  def show_popup2
    $testCaseID = "VT229-0045"
    @flash = "Show popup page"
    Alert.show_popup(
        :message=>"Check the icon.\n",
        :title=>"MyTest",
        :icon => '/public/images/icon.png',
        :buttons => ["Ok", "Cancel"]
     )
    render :action => :index, :back => '/app'
  end
  
  #testcase ID VT229-0046
  def show_popup46
    $testCaseID = "VT229-0046"
    @flash = "Show popup page"
    
    Alert.show_popup(
        :message=>"The new password can't be empty.\n",
        :title=>"MyTest",
        :buttons => ["Yes", "No"],
        :callback => url_for(:action => :popup_callback)
     )
    render :action => :index, :back => '/app'
  end

  #testcase ID VT229-0049
  def show_popup3
    $testCaseID = "VT229-0049"
    @flash = "Show popup page"
    Alert.show_popup :title => "Wait...", :message => "Wait ..."
    Rho::Timer.start 5000, url_for(:action => :wait_callback), ""
    render :action => :index, :back => '/app'
  end

  def wait_callback
    $testCaseID = "VT229-0049"
    Alert.hide_popup
    WebView.navigate url_for(:action => :index)
  end

  #testcase ID VT229-0050
  def vibrate_for_0sec
    $testCaseID = "VT229-0050"
    @flash = "Vibrate page"
    Alert.vibrate 0
    render :action => :index, :back => '/app'
  end
    
  #testcase ID VT229-0051
  def vibrate
    $testCaseID = "VT229-0051"
    @flash = "Vibrate page"
    Alert.vibrate
    render :action => :index, :back => '/app'
  end
  
  #testcase ID VT229-0052
  def vibrate_for_2000sec
    $testCaseID = "VT229-0052"
    @flash = "Vibrate page"
    Alert.vibrate 2000
    render :action => :index, :back => '/app'
  end
    
  #testcase ID VT229-0053
  def vibrate_for_25500sec
    $testCaseID = "VT229-0053"
    @flash = "Vibrate for 10 sec page"    
    Alert.vibrate 25500
    render :action => :index, :back => '/app'
  end
    
  #testcase ID VT229-0054
  def vibrate_for_27000sec
    $testCaseID = "VT229-0054"
    @flash = "Vibrate for 10 sec page"    
    Alert.vibrate 27000
    render :action => :index, :back => '/app'
  end
  
  #testcase ID VT229-0055
  def play_file_mp3_ext
    $testCaseID = "VT229-0055"
    @flash = "Play file page"    
    Alert.play_file '/public/alerts/media1.mp3', '.mp3'
    render :action => :index, :back => '/app'
  end
  
  #testcase ID VT229-0056
  def play_file_mp3
    $testCaseID = "VT229-0056"
    @flash = "Play file page"    
    Alert.play_file '/public/alerts/media1.mp3'
    render :action => :index, :back => '/app'
  end
  
  #testcase ID VT229-0057
  def play_file_wav
    $testCaseID = "VT229-0057"
    @flash = "Play file page"    
    Alert.play_file '/public/alerts/media2.wav', '.wav'
    render :action => :index, :back => '/app'
  end
  
  #testcase ID VT229-0059
  def show_status
    $testCaseID = "VT229-0059"
    Alert.show_status("show status", "Showing status", "Dismiss")
    render :action => :index, :back => '/app'
  end

  #Callback Methods
  
  def popup_callback
    puts "popup_callback: #{@params}"
    Alert.show_popup("button_id: #{@params['button_id']} , button_title: #{@params['button_title']}")
    WebView.navigate url_for(:action => :index)
  end

end
