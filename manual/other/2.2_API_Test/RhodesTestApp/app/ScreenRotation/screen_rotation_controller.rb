require 'rho/rhocontroller'
require 'helpers/browser_helper'

class ScreenRotationController < Rho::RhoController
  include BrowserHelper
 
  @layout = :simplelayout
  $callback_state = 'screen rotation callback is not setted'  

  def set_callback
    System::set_screen_rotation_notification(url_for(:action => :screenRotateCallback), "" )
    $callback_state = 'screen rotation callback is setted'  
    redirect :action => :index
  end

  def set_callback_left
    System::set_screen_rotation_notification(url_for(:action => :screenRotateCallback), "left" )
    $callback_state = 'Left screen rotation callback is setted'  
    redirect :action => :index
  end
  
  def set_callback_right
    System::set_screen_rotation_notification(url_for(:action => :screenRotateCallback), "right" )
    $callback_state = 'Right screen rotation callback is setted'  
    redirect :action => :index
  end
  
  def unset_callback
    System::set_screen_rotation_notification( nil, nil )
    $callback_state = 'screen rotation callback is not setted'  
    redirect :action => :index
  end
  # GET /ScreenRotation
  def index
    @screenrotations = ScreenRotation.find(:all)
    render :back => '/app'
  end

  # GET /ScreenRotation/{1}
  def show
    @screenrotation = ScreenRotation.find(@params['id'])
    if @screenrotation
      render :action => :show, :back => url_for(:action => :index)
    else
      redirect :action => :index
    end
  end

  # GET /ScreenRotation/new
  def new
    @screenrotation = ScreenRotation.new
    render :action => :new, :back => url_for(:action => :index)
  end

  # GET /ScreenRotation/{1}/edit
  def edit
    @screenrotation = ScreenRotation.find(@params['id'])
    if @screenrotation
      render :action => :edit, :back => url_for(:action => :index)
    else
      redirect :action => :index
    end
  end

  # POST /ScreenRotation/create
  def create
    @screenrotation = ScreenRotation.create(@params['screenrotation'])
    redirect :action => :index
  end

  # POST /ScreenRotation/{1}/update
  def update
    @screenrotation = ScreenRotation.find(@params['id'])
    @screenrotation.update_attributes(@params['screenrotation']) if @screenrotation
    redirect :action => :index
  end

  # POST /ScreenRotation/{1}/delete
  def delete
    @screenrotation = ScreenRotation.find(@params['id'])
    @screenrotation.destroy if @screenrotation
    redirect :action => :index  
  end
  def screenRotateCallback
    Alert.show_popup ("Screen Rotated W["+@params['width']+"]xH["+@params['height']+"] Degrees["+@params['degrees']+"]")    
  end
end
