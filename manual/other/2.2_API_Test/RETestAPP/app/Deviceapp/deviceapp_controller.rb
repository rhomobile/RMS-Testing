require 'rho/rhocontroller'
require 'helpers/browser_helper'

class DeviceappController < Rho::RhoController
  include BrowserHelper

  # GET /Deviceapp
  def index
    @deviceapps = Deviceapp.find(:all)
    render :back => '/app'
  end

  # GET /Deviceapp/{1}
  def show
    @deviceapp = Deviceapp.find(@params['id'])
    if @deviceapp
      render :action => :show, :back => url_for(:action => :index)
    else
      redirect :action => :index
    end
  end

  # GET /Deviceapp/new
  def new
    @deviceapp = Deviceapp.new
    render :action => :new, :back => url_for(:action => :index)
  end

  # GET /Deviceapp/{1}/edit
  def edit
    @deviceapp = Deviceapp.find(@params['id'])
    if @deviceapp
      render :action => :edit, :back => url_for(:action => :index)
    else
      redirect :action => :index
    end
  end

  # POST /Deviceapp/create
  def create
    @deviceapp = Deviceapp.create(@params['deviceapp'])
    redirect :action => :index
  end

  # POST /Deviceapp/{1}/update
  def update
    @deviceapp = Deviceapp.find(@params['id'])
    @deviceapp.update_attributes(@params['deviceapp']) if @deviceapp
    redirect :action => :index
  end

  # POST /Deviceapp/{1}/delete
  def delete
    @deviceapp = Deviceapp.find(@params['id'])
    @deviceapp.destroy if @deviceapp
    redirect :action => :index  
  end
  
  #Function to manage application object
    def manageApplication
      action = @params['action']
      
      Application.quit if action == 'quit'
      if action == 'min'
#        Alert.show_popup("param #{action}")
        Application.minimize
      end
  
      if action == 'restore'
        Application.minimize
        Rho::Timer.start(5000, (url_for :action => :timer_stop_callback), "test")
      end

      if action == 'MandQ'
      Application.minimize
      Application.quit
      end
    end
  
    def timer_stop_callback
      Application.restore
      puts "Restored Called"
    end
    
    def setApplicationEvent
      action = @params['action']
      puts "Param : #{action}"
      Application.applicationEvent = url_for(:action => :displayWelcomeBack) if action == 'set'
      Application.applicationEvent = "" if action == 'det'         
    end
    
    def displayWelcomeBack
      puts "Output #{@params}"
      Alert.show_popup("Output #{@params}")
      $appMessage = "Application #{@params}"
      divid = 'appdiv'
      WebView.execute_js("changeDivContent(#{divid},'" +$appMessage+"')")
    end
          
    def getAppVersion
      puts "Version Called"
      Application.getVersion
    end
    
    def setVersionEvent
      action = @params['action']
      Alert.show_popup ""+action
      Application.versionEvent = url_for(:action => :displayVersionDetails) if action == "set"
      Application.versionEvent = "" if action == "det"
    end
  
    #Call Back version for version event
    def displayVersionDetails
      Alert.show_popup "displayVersionDetails"
            puts ("Out Put: #{@params}")
            divid = 'versiondiv'
                resultHash = @params
                String buf = ""
                buf += "Product Version : " + resultHash["productVersion"] + "\n"
                buf += "Hot Fixes: "
                resultHash["hotFixes"].each {|x| buf += x + ', '}
                buf += "\n"
                buf += 'Components:' + "\n"
                resultHash["componentVersions"].each {|component| buf += '' + component["module"] + " is version " + component["version"] + "\n"}
                puts buf
                Alert.show_popup buf
                WebView.execute_js("changeDivContent(#{divid},'" +buf+"')")
         
         
#      #$vDetails = nil;
#      @version = @params
#      @productVersion = @version['productVersion'] 
#      @hotFixes = @version['hotFixes']
#      $vDetails = "Version Details :<br/>"
#      $vDetails +="Product Version: #{@productVersion} <br/> Hot Fixes: #{@hotFixes} <br/> Component Version: " 
#      @componentVersions = @version['componentVersions']
#      for key , val in @componentVersions
#        for info in val[key]
#         $vDetails += "<br/> #{info}"
#        end 
#      end
    end
    
  #function to Adjust Backlight
    def adjustBacklight
      action = @params['action']
       if action == 'on'
         Backlight.on
       end
       if action == 'off'
         Backlight.off
       end
       if action == 'getBLSetting'
         Backlight.getBacklightSettings
         Alert.show_popup("getBacklightSettings function called")
       end
      redirect :action => :index 
    end
    
    #Call Back Function For Back Light
    def setBackLightEvent
      action = @params['action']
      if action == 'set'
              Backlight.backlightSettingsEvent = url_for(:action => :getBacklightMessage)
              Alert.show_popup("Backlight Event Got Set Successfully")
       end
      if action == 'det'
              Backlight.backlightSettingsEvent =""
              Alert.show_popup("Backlight Event Got detach Successfully")
       end
    end

    #Call back function for backlightsettingsevent
    def getBacklightMessage
      
      Alert.show_popup ("Out Put #{@params}")
      backlight = @params
      $theOutput = "Backlight State:-" + backlight['state'] 
      $theOutput = $theOutput + "Backlight Intensity: " + backlight['intensity'] 
      $theOutput = $theOutput + "Backlight Intensity Range:"
       buf = ""
      backlight['intensityRange'].each {|x| buf += x }
      $theOutput = $theOutput+buf  
  #    for (var i=0; i<intensityRange.length; i = i + 1)
  #    {
  #      $theOutput = $theOutput + intensityRange[i] + "<BR>";
  #    }
     
      Alert.show_popup ("String is #{$theOutput}")
    end
    
    def setIntensity
      intensityValue = @params['intensity']
      Backlight.intensity = intensityValue;
      #Alert.show_popup("Alarm Activated #{intensityValue}")
    end
  #  
  #Function to controll device functionality(1: suspend, 2: calibrate)
    def manageDevice
      action = @params['action']
      Device.suspend if action == 'suspend'
      Device.calibrate if action == 'calibrate'
      Device.wake if action == 'wake'     
      if action == 'SandC'
        Device.suspend
        Device.calibrate
      end
      if action == 'SandW'
        Device.suspend
        Device.wake
      end
    end
  #  
  #Function to display hour glass
    def manageHourglass
      action = @params['actionVisible']
      Alert.show_popup ""+action  
      Hourglass.visibility = action
    end
    
    def setLeftHourGlass
      puts "value: #{@params['left']}"
      positionLeft    = @params['left'] 
      Hourglass.left  = positionLeft
    end
    
    def setTopHourGlass
      puts "value: #{@params['top']}"
      positionTop   = @params['top']  
      Hourglass.top   = positionTop
    end
  #  
    #hide hour glass
    def hideHourglass
    action = @params['action']
    Alert.show_popup ""+action  
    puts "Value: #{action}"  
    Hourglass.visibility ="visible" if action == 'visible' 
    Hourglass.visibility ="hidden" if action == 'hidden'
    Hourglass.visibility ="address" if action == 'address'
    
    end
  #  
  #function to manage key light
    def manageKeylight
      action = @params['action']
      Keylight.on if action == 'on'
      Keylight.off if action == 'off'
      #keylight.intensity =IntensityValue;
    end
  #  
    def adjustIntensity
      intensityVal = @params['intensity'] 
      Alert.show_popup ""+intensityVal
      Keylight.intensity = intensityVal
      redirect :action => :index 
    end
  #  
    #Poweron Module
    def modulePoweron
      action = @params['action']
      puts "Value: #{action}"
      PowerOn.powerOnEvent = url_for(:action => :displayWelcomeMessage) if action == 'set'
      PowerOn.powerOnEvent = "" if action == 'det'
      Alert.show_popup "Power on event Changes Applied"
    end
  #  
    #Callback function for powseron event
    def displayWelcomeMessage
      Alert.show_popup "Welcome XYZ to testing"
    end
  #  
    def moduleReboot
      action = @params['action']
      Reboot.bootType="Warm" if action == 'warm'
      Reboot.bootType="Cold" if action == 'cold'
      Reboot.bootType="ColdCAD" if action == 'coldcad'
      Reboot.bootType="Null" if action == 'nul'
    end
  #  
    def moduleManageScreenOrientation
      action = @params['action']
      ScreenOrientation.rightHanded  if action == 'right' 
      ScreenOrientation.leftHanded if action == 'left'
      ScreenOrientation.upsideDown if action == 'upsidedown' 
      ScreenOrientation.normal if action == 'normal' 
    end
    
    def setScreenOrientation
      ScreenOrientation.screenOrientationEvent = url_for(:action => :callBackScreenOrientation)
      Alert.show_popup "ScreenOrientation Event Got Set Sucessfully"
    end
  
    def callBackScreenOrientation
      Alert.show_popup "Output: #{@params}"
      out = @params
      $screenOut = ""
      $screenOut += "Current Screen orientation using ruby is:"+out['orientation']
    end
  
    def displayAlert
      Alert.show_popup "Welcome XYZ to testing"
    end
  
    def screenOrientationDetach
      ScreenOrientation.screenOrientationEvent="";
    end
  
    def screenOrientationAutorotate
      action = @params['action'] 
      ScreenOrientation.autoRotate = action;
    end
  
    def manageSNTP
      sntpIp = @params['ip']
      Sntp.serverIp=sntpIp;
    end
   
    def manageSIP
      action          = @params['action']
      Sip.automatic if action == 'automatic'
      Sip.manual if action == 'manual'
    end
  
    def leftSIP
      positionLeft    = @params['left']
      Sip.left        = positionLeft;
    end
  
    def topSIP
      positionTop     = @params['top']
      Sip.top         = positionTop;
    end
  
    def manageStylus
      action = @params['action']
      Stylus.enable  if action == 'enable'
      Stylus.disable if action == 'disable'
      Stylus.enabled  if action == 'enabled'
      Stylus.disabled if action == 'disabled' 
    end
  
    def setInterval
      interval = @params['interval']
      Timer.interval  = interval;
    end
  
    def setTimerEvent
      action = @params['action']
      puts "Param: #{action}"
      Timer.timeout   = url_for(:action => :callBackTimer) if action == 'set'
      Timer.timeout   = "" if action == 'det'
      Alert.show_popup "Timer Event Changes Affected"
    end
  
    def callBackTimer
      Alert.show_popup "Output: #{@params}"
      time = @params['time']
      $outTimer =""
      $outTimer = "Current time is using Ruby is:"+time
   end
  
   def startTimer
     Timer.start
   end
   
   def stopTimer
     Timer.stop
     Alert.show_popup("Timer Stopped Successfully")
   end
  
    def manageVolume
      volume = @params['volume']
      Volume.setVolume=volume
    end
  
    #Function to trigger alarm
    def setAlarmTime
      time = @params['time']
      Alarm.time = time
      puts "alarm set at #{time}"
      Alert.show_popup("Alarm Time Set")
    end
    
    def triggerAlarm
    Alarm.set()
    Alert.show_popup("Alarm Set Successfully")
    end
    
    def setAlarmEvent
      Alarm.alarmTriggered = url_for(:action => :displayAlarmMessage)
      Alert.show_popup("Alarm Event Attached")
    end
    def displayAlarmMessage
      time = Time.new
      currentTime = time.inspect
      @params['alarm'] = "Alarm Is triggring time: #{currentTime}"
      divid = 'alarmdiv'
      WebView.execute_js("changeDivContent(#{divid},'" +@params['alarm']+"')")
    end
  #    
    def setAlarmRepeat
    repeat = @params['repeat']
    Alarm.repeat = repeat
    puts "Alarm Repeat Value #{repeat}"
    end
  
    def setAlarmInterval
    interval = @params['interval']
    Alarm.interval = interval
    puts "Alarm Interval Value #{interval}"
    end

    #Callback function for alarm triggered
    def displayAlert
      Alert.show_popup("Displaying alert in callback")
    end
    #Function to disable alarm
    def clearAlarm
      Alarm.clear();
      Alert.show_popup("Alarm Cleared ")
    end
    
    #function to manage zoom module
    def textZoom
      value = @params['zoomfactor']
      Zoom.text= value ;
    end
  
    def pageZoom
      value = @params['zoomfactor']
      ##Alert.show_popup("Alarm Activated #{value}")
      Zoom.page=value;
    end
    
    def funsetLocal
      setLocalValue    = @params['setLocal']
      Alert.show_popup(setLocalValue)
      SystemTime.setLocal = setLocalValue
    end
    
    def funsetUtc
      setUtcValue     = @params['setUtc']
      Alert.show_popup(setUtcValue)
      SystemTime.setUtc = setUtcValue
    end    
 
    def setsntpServerIp
      sntpServerIpValue     = @params['sntpServerIp']
      Alert.show_popup(sntpServerIpValue)
      SystemTime.sntpServerIp = sntpServerIpValue
    end 
    
    def setwakeLock
      action = @params['action']
      Alert.show_popup ""+action  
      puts "Value: #{action}"  
      Wake.wakeLock ="Enabled" if action == 'Enabled' 
      Wake.wakeLock ="Disabled" if action == 'Disabled'
      Wake.wakeLock ="Invalid" if action == 'Invalid' 
      Wake.wakeLock ="" if action == 'Null'
      end  
    
    def setwifiLock
       action = @params['action']
       Alert.show_popup ""+action  
       puts "Value: #{action}"  
       Wake.wifiLock ="Enabled" if action == 'Enabled' 
       Wake.wifiLock ="Disabled" if action == 'Disabled'
       Wake.wifiLock ="Invalid" if action == 'Invalid'  
       Wake.wifiLock ="" if action == 'Null'
    end
    
end
