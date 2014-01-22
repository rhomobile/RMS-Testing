require 'rho/rhocontroller'
require 'helpers/browser_helper'

class GeolocationController < Rho::RhoController
  include BrowserHelper
  
  def index
    render :back => '/app'  
  end
  
  def getLatitude
    latitude = 100;
    begin
      latitude = GeoLocation.latitude.to_s
      Rho::WebView.executeJavascript("Ruby.sendValueToJS('#{latitude}')")
    rescue => ex
      puts "Exception Thrown: #{ex.message}"
      Rho::WebView.executeJavascript("Ruby.sendValueToJS('#{ex.message}')")
    end
    
  end

  def getLongitude
    begin
      longitude = GeoLocation.longitude.to_s
      Rho::WebView.executeJavascript("Ruby.sendValueToJS('#{longitude}')")
    rescue => ex
      puts "Exception Thrown: #{ex.message}"
      jsmethod = 'Ruby.sendValueToJS("' + ex.message + '")'
      Rho::WebView.executeJavascript(jsmethod)
    end
  end

  def getKnownPostion
    begin
      knownposition = GeoLocation.known_position?.to_s
      Rho::WebView.executeJavascript("Ruby.sendValueToJS('#{knownposition}')")
    rescue => ex
      jsmethod = 'Ruby.sendValueToJS("' + ex.message + '")'
      Rho::WebView.executeJavascript(jsmethod)
    end
  end

  def getHaversineDistance
    begin
      #Distance between Washington, D.C. and Moscow, Russia: expected  4856.99 miles, geolocation returns
      distance = GeoLocation.haversine_distance(38.895, -77.036667, 55.755786, 37.617633).to_s
      Rho::WebView.executeJavascript("Ruby.sendValueToJS('#{distance}')")
    rescue => ex
      puts "Exception Thrown: #{ex.message}"
      jsmethod = 'Ruby.sendValueToJS("' + ex.message + '")'
      Rho::WebView.executeJavascript(jsmethod)
    end
  end

  def getAltitude
    begin
      altitude = GeoLocation.altitude.to_s
      Rho::WebView.executeJavascript("Ruby.sendValueToJS('#{altitude}')")
    rescue => ex
      puts "Exception Thrown: #{ex.message}"
      jsmethod = 'Ruby.sendValueToJS("' + ex.message + '")'
      Rho::WebView.executeJavascript(jsmethod)
    end
  end

  def getSpeed
    begin
      speed = GeoLocation.speed.to_s
      Rho::WebView.executeJavascript("Ruby.sendValueToJS('#{speed}')")
    rescue => ex
      puts "Exception Thrown: #{ex.message}"
      jsmethod = 'Ruby.sendValueToJS("' + ex.message + '")'
      Rho::WebView.executeJavascript(jsmethod)
    end
  end

  def getAccuracy
    begin
      accuracy = GeoLocation.accuracy.to_s
      Rho::WebView.executeJavascript("Ruby.sendValueToJS('#{accuracy}')")
    rescue => ex
      puts "Exception Thrown: #{ex.message}"
      jsmethod = 'Ruby.sendValueToJS("' + ex.message + '")'
      Rho::WebView.executeJavascript(jsmethod)
    end
  end

  def getSatellitesCount
    begin
      satellites = GeoLocation.satellites.to_s
      Rho::WebView.executeJavascript("Ruby.sendValueToJS('#{satellites}')")
    rescue => ex
      puts "Exception Thrown: #{ex.message}"
      jsmethod = 'Ruby.sendValueToJS("' + ex.message + '")'
      Rho::WebView.executeJavascript(jsmethod)
    end
  end
  
  def setNotification
    $count = 0
    begin
      GeoLocation.set_notification url_for(:action => :geo_callback), "mytag=55", 3
    rescue => ex
      puts "Exception Thrown: #{ex.message}"
      jsmethod = "updateSetNotificationEXDiv('" + ex.message + "')"
      Rho::WebView.executeJavascript(jsmethod)
    end
      
  end
  
  def setNotificationEX
    $count = 0
    begin
      GeoLocation.set_notification_ex url_for(:action => :geo_callback_EX), @params, "mytag=55"
    rescue => ex
      puts "Exception Thrown: #{ex.message}"
      jsmethod = "updateSetNotificationEXDiv('" + ex.message + "')"
      Rho::WebView.executeJavascript(jsmethod)
    end
  end

  def geo_callback

    puts "$$$$$$$$$$$ GEOCALLBACK : $$$$$$$$$$$$$$$"
    puts "geo_callback : #{@params}"
    value = @params.to_json
    value = "Callback fired count #{$count} <br> Value: "+value
    jsmethod = "updateSetNotificationDiv('" + value + "')"
    $count += 1
    Rho::WebView.executeJavascript(jsmethod)
  end

  def geo_callback_EX
    puts "$$$$$$$$$$$ GEOCALLBACK EX : $$$$$$$$$$$$$$$"
    puts "geo_callback : #{@params}"
    value = @params.to_json
    value = "Callback fired count #{$count} <br> Value:"+value 
    jsmethod = "updateSetNotificationEXDiv('" + value + "')"
    $count += 1
    Rho::WebView.executeJavascript(jsmethod)
  end

  def geoTurnOff
    GeoLocation.turnoff
    return
  end
end
