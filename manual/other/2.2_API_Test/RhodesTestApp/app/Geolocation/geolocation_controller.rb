require 'rho/rhocontroller'
require 'helpers/browser_helper'

class GeolocationController < Rho::RhoController
  include BrowserHelper

  $geo_latitude = 0
  $geo_longitude = 0 
  $geo_known_position = "Not Known"
  # GET /Geolocation
  def index
    puts "GeoLocation index controller"
    render :back => '/app'
  end
  
  def geo_callback
    puts "$$$$$$$$$$$ GEOCALLBACK : $$$$$$$$$$$$$$$"
    puts "geo_callback : #{@params}"
    puts WebView.current_location
    if WebView.current_location !~ /Geolocation/
        puts "Stopping geo location since we are away of geo page: " + WebView.current_location
        puts "########## GEOLOCATION TURNOFF ###############"
        GeoLocation.turnoff
        return
    end
    
    if @params['known_position'].to_i != 0 && @params['status'] =='ok'
        if System::get_property('platform') == 'Blackberry'
            WebView.refresh
        else
            WebView.execute_js("updateLocation(#{@params['latitude']}, #{@params['longitude']})")
        end
    end
  end
  
  
#Test Case ID VT229-0157
  def geo_latitude
    $testCaseID = "VT229-0157"
    geo_latitude = GeoLocation.latitude
    Alert.show_popup geo_latitude
    redirect :action => :index
  end
  
  #Test Case ID VT229-0158
  def geo_longitude
    $testCaseID = "VT229-0158"
    geo_longitude = GeoLocation.longitude
    Alert.show_popup geo_longitude
    redirect :action => :index
  end
  
  #Test Case ID VT229-0158
  def geo_known_position
    $testCaseID = "VT229-0158"
    geo_known_position = GeoLocation.known_position?
    Alert.show_popup geo_known_position
    redirect :action => :index
  end
  
  #Test Case ID VT229-0161
  def geo_set_notification
    $testCaseID = "VT229-0161"
    GeoLocation.set_notification url_for(:action => :geo_callback), "mytag=55", 3
    WebView.refresh
    redirect :action => :index
  end
  
  #Test Case ID VT229-0162
  def geo_set_notification_WM
    $testCaseID = "VT229-0162"
    GeoLocation.set_notification url_for(:action => :geo_callback2), "mytag=55", 3
    WebView.refresh
    redirect :action => :index
  end
  
  #Test Case ID VT229-0163
  def geo_set_notification_IOS_Andoird
    $testCaseID = "VT229-0163"
    GeoLocation.set_notification url_for(:action => :geo_callback2), "mytag=55", 2
    WebView.refresh
    redirect :action => :index
  end
  
  def geo_callback2
    puts "$$$$$$$$$$$ GEOCALLBACK : $$$$$$$$$$$$$$$"
    puts "geo_callback : #{@params}"
    puts $geo_params = @params
    WebView.execute_js("updateLocation(#{@params['latitude']}, #{@params['longitude']})")
  end
  
  #Test Case ID VT229-0166
  def geo_turn_off
    $testCaseID = "VT229-0166"
    puts "########## GEOLOCATION TURNOFF ###############"
    GeoLocation.turnoff
    return
    redirect :action => :index
  end
  
  
  
end
