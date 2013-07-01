require 'rho/rhocontroller'
require 'helpers/application_helper'
require 'helpers/browser_helper'

class ScreenOrientationTestController < Rho::RhoController
  include BrowserHelper
  include ApplicationHelper
  
  #@@test_proc = lambda{|args| puts "lamda: #{args}"}
  def index
  render :back => :index
  end
  
  def enable
    Rho::ScreenOrientation.autoRotate = (@params['enabled'] == 'true')
    response = Rho::ScreenOrientation.autoRotate
    render :json => response.to_s
    return response
  end

  def normal
    Rho::ScreenOrientation.normal
    render :back => :index
  end
  
  def upside_down
    Rho::ScreenOrientation.upsideDown
    render :back => :index
  end
  
  def left_handed
    Rho::ScreenOrientation.leftHanded
    render :back => :index
  end
  
  def right_handed
    Rho::ScreenOrientation.rightHanded
    render :back => :index
  end
  
  def reset_callback
    Rho::ScreenOrientation.setScreenOrientationEvent("")
    render :back => :index
  end

  def set_callback
    Rho::ScreenOrientation.setScreenOrientationEvent(url_for(:action => :screen_orientation_callback))
    render :back => :index
  end
  
  def screen_orientation_callback
    puts "screen_orientation_callback"
    puts "screen_orientation_callback -- params: #{@params}"
    render :back => :index
  end
end
