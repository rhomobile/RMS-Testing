require 'rho/rhocontroller'
require 'helpers/browser_helper'

class WebviewController < Rho::RhoController
  include BrowserHelper

  # GET /Webview
  def index
    @webviews = Webview.find(:all)
    render :back => '/app'
  end
  
  def navigate_test
    render :action=>:navigate_test, :back=>:index
  end

  def refresh
    WebView.refresh
  end
  
  def refreshsectab
    WebView.refresh 2
  end
  
  def navigate
    WebView.navigate("http://www.google.com")
  end
  
  def navigatewithindex
    WebView.navigate("http://www.google.com",2)
  end
  
  def navigate_controller
    WebView.navigate(url_for :action=>'navigate_test')
  end
  
  def navigate_controller_withindex
    WebView.navigate(url_for(:action=>'navigate_test'), 2)
  end

  def navigateback
    WebView.navigate_back
  end
  
  def getCurrentLocation
    message = WebView.current_location
    WebView.execute_js('addmessage("'+message+'");')
  end
  
  def getCurrentLocationWithIndex
    message = WebView.current_location(2)
    WebView.execute_js('addmessage("'+message+'");')
  end
  
  def executeJs
    time2 = Time.now
    puts "Current Time : " + time2.inspect
    WebView.execute_js('addmessage("'+time2.to_s+'");')
  end
  
  def activetab
   tab = WebView.active_tab
   WebView.execute_js('addmessage("'+tab.to_s+'");')
  end
  
  def fullscrEnable
    WebView.full_screen_mode(1)
    render :action => :index
  end
  
  def fullscrDisable
    WebView.full_screen_mode(0)
    render :action => :index
  end
  
  def setCookieSingle
    url = WebView.current_location()
    WebView.set_cookie(url, 'name=bhakta')
    redirect :action => :show_cookie
  end
  
  def setCookieMultiple
    url = WebView.current_location()
    WebView.set_cookie(url, 'age=26;sex=male')
    redirect :action => :show_cookie
  end

  def show_cookie
   WebView.execute_js("show_cookie();", 0)
   redirect :action => :index
  end
  
  
end
