require 'rho/rhocontroller'
require 'helpers/browser_helper'

class NotificationModuleController < Rho::RhoController
  include BrowserHelper

  def FunMinimize
     #Alert.show_popup('Scanner1')
     Application.minimize
     redirect :action =>  :index
   end 
  
  def SetNotifyEvent
             selected_Event = @params['notifyEvent']  
             if selected_Event=="JSCRIPT"  
              Notification.enumNotificationsEvent= url_for(:action => :notifyenum_event_cb) 
             elsif selected_Event=="DETACH"
               Notification.enumNotificationsEvent= ''
               elsif selected_Event=="setEMML"
               Notification.setEmml('url_for(:action => :notifyenum_event_cb)')
              end          
             redirect :action => :index 
    
  end
  
  def notifyenum_event_cb
    puts "Notifyevent #{@params}"
#    Alert.show_popup ("Notifyevent #{@params}")
    notifyarray = @params
    ienumbuf = ''
    notifyarray["notificationsArray"].each {|notarr|  ienumbuf += '' + notarr["notificationIndex"].to_s + " : " + notarr["notificationType"].to_s + " : " + notarr["notificationName"]+"---" }
    WebView.execute_js('setFieldValue("'+ienumbuf+'")')   
  end
  
  def Enumerateobjects
    Notification.enumerate
    redirect :action => :index  
  end
  
  def setState
    txtNotifyIndex = @params['txtNotifyIndex'] 
    stateVal = @params['statedropdown'] 
    if stateVal=="On"  
    Notification.stateOn= txtNotifyIndex
    elsif stateVal=="Off"
     Notification.stateOff= txtNotifyIndex
    elsif stateVal=="Cycle"
     Notification.stateCycle= txtNotifyIndex
    end          
    redirect :action => :index 
  end
  
  
  def setLEDONDuration
      txtLEDOnDuration = @params['txtLEDOnDuration'] 
      Notification.setLEDOnDuration = txtLEDOnDuration         
      redirect :action => :index 
  end
  
  def setLEDOFFDuration
    txtLEDOffDuration = @params['txtLEDOffDuration'] 
    Notification.setLEDOffDuration = txtLEDOffDuration         
      redirect :action => :index 
  end
  
  def setLEDCycles
    txtLEDNumberOfCycles = @params['txtLEDNumberOfCycles'] 
     Notification.setLEDNumberOfCycles = txtLEDNumberOfCycles         
       redirect :action => :index 
  end
  
  def setBeeperFrequency
    txtBeeperFrequency = @params['txtBeeperFrequency'] 
       Notification.setBeeperFrequency = txtBeeperFrequency         
         redirect :action => :index 
    end
    
  def setBeeperVolume
    txtBeeperVolume = @params['txtBeeperVolume'] 
        Notification.setBeeperVolume = txtBeeperVolume         
          redirect :action => :index 
     end
  
  def setBeeperDuration
    txtBeeperDuration = @params['txtBeeperDuration'] 
        Notification.setBeeperDuration = txtBeeperDuration         
          redirect :action => :index 
     end
     
  def setVibrateDuration
    txtVibrateDuration = @params['txtVibrateDuration'] 
    Notification.setVibrateDuration = txtVibrateDuration         
    redirect :action => :index 
   end
  
# GET /NotificationModule
  def index
    @notificationmodules = NotificationModule.find(:all)
    render :back => '/app'
  end

  # GET /NotificationModule/{1}
  def show
    @notificationmodule = NotificationModule.find(@params['id'])
    if @notificationmodule
      render :action => :show, :back => url_for(:action => :index)
    else
      redirect :action => :index
    end
  end

  # GET /NotificationModule/new
  def new
    @notificationmodule = NotificationModule.new
    render :action => :new, :back => url_for(:action => :index)
  end

  # GET /NotificationModule/{1}/edit
  def edit
    @notificationmodule = NotificationModule.find(@params['id'])
    if @notificationmodule
      render :action => :edit, :back => url_for(:action => :index)
    else
      redirect :action => :index
    end
  end

  # POST /NotificationModule/create
  def create
    @notificationmodule = NotificationModule.create(@params['notificationmodule'])
    redirect :action => :index
  end

  # POST /NotificationModule/{1}/update
  def update
    @notificationmodule = NotificationModule.find(@params['id'])
    @notificationmodule.update_attributes(@params['notificationmodule']) if @notificationmodule
    redirect :action => :index
  end

  # POST /NotificationModule/{1}/delete
  def delete
    @notificationmodule = NotificationModule.find(@params['id'])
    @notificationmodule.destroy if @notificationmodule
    redirect :action => :index  
  end
end
