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
    hello = System.getProperties(['country','deviceName','devicePushId','freeServerPort'])
    puts "Hello #{hello}"
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
  

end
