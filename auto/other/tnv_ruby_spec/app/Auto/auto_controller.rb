require 'rho/rhocontroller'
require 'helpers/browser_helper'
require 'helpers/api_helper'
#require 'helpers/automate_helper'

require 'json'

class AutoController < Rho::RhoController
  include BrowserHelper
  @layout = 'Auto/layout'
  
  def index
    $mode = ''
    $mode = @params['mode']
    erb = @params['erb']
    $module = @params['module']
    render :action => erb
  end
  
  #Imager Module Code : Enmurate and Create Test for each Imager Type
  def enumImager
    #callBackImagerEnum
    Imager.imagerEnumEvent = url_for(:action => :callBackImagerEnum)
    Imager.enumerate
  end

  def callBackImagerEnum

      imagerArray = @params['imagerArray'];
      arrImagerType = Array.new 
      i = 0

      imagerArray.each do |thing|
      arrImagerType << thing['deviceName']
      i = i +1 
      end

      #Sending Comma Separate Value to Javascript Code
      imagerType = arrImagerType.join(',');
      puts "Available Imagers Are #{imagerType}"
      
      WebView.execute_js("imagerCallBack('#{imagerType}')")
  end

  #Notification Module Code
  def enumNotification
    Notification.enumNotificationsEvent = url_for(:action => :callbackNotification)
    Notification.enumerate
  end
  
  def callbackNotification
    puts @params['notificationsArray']

    notificationsArray = @params['notificationsArray']

    jsonNotification = notificationsArray.to_json

    WebView.execute_js("callbackNotification('"+jsonNotification+"')")

  end
  
  #########################################
  # Automation Framework Code Starts Here #
  #########################################
  
def setMethod
  #Barcode.enumerate(url_for(:action => :enumCallback))
  puts "Parameter #{@params} "
  autoobject = @params['object']
  automethod = @params['method']
  type = @params['type']
  callback = @params['callback']  
    #callback = "enumCallbackCommon"

  if type == 'async'
      begin
        #eval autoobject +"."+ automethod +" url_for(:action => :"+callback+")"
        puts autoobject +"."+ automethod +"("+callback+")"
        eval autoobject +"."+ automethod +"("+callback+")"
      rescue => ex
        puts "Exception Thrown: #{ex.message}" 
      end

    elsif type == 'sync'
      if callback.index("|")
        puts "here in |"
        callbackValue = callback.split('|');
        arguments = callbackValue[0]
        callback = callbackValue[1]
        begin
          output = eval autoobject +"."+ automethod +"("+arguments+")"
          puts "#{output}"
          callMethod = callback+"(output)"
          eval callMethod
        rescue => ex
          Alert.show_popup "Exception Thrown: #{ex.message}" 
        end
      else
        begin
          output = eval autoobject +"."+ automethod
          puts "#{output}"
          callMethod = callback+"(output)"
          eval callMethod
        rescue => ex
          Alert.show_popup "Exception Thrown: #{ex.message}" 
        end
      end

    elsif type=='lambda'

      if callback.index("|")
        puts "here in |"
        callbackValue = callback.split('|');
        arguments = callbackValue[0]
        callback = callbackValue[1]
        puts "arguments #{arguments}"
        puts "callback #{callback}"

        fnlambda = arguments + "," + 'lambda{|args| puts "lambda: #{args}"
        callMethod = callback+"(args)"
        eval callMethod
        }'
      else
        fnlambda = 'lambda{|args| puts "lambda: #{args}"
        callMethod = callback+"(args)"
        eval callMethod
        }'
      end
      begin
        #eval autoobject +"."+ automethod +" url_for(:action => :"+callback+")"
        puts autoobject +"."+ automethod +"("+fnlambda+")"
        eval autoobject +"."+ automethod +"("+fnlambda+")"
      rescue => ex
        puts "Exception Thrown: #{ex.message}" 
      end
   else

    # autoobject = autoobject.capitalize
    autoobject = autoobject.slice(0,1).capitalize + autoobject.slice(1..-1)
    if(callback.empty?)
     puts autoobject +"."+ automethod
     eval autoobject +"."+ automethod
    else
      puts autoobject +"."+ automethod + "("+callback+")"
      eval autoobject +"."+ automethod +"("+callback+")"
    end
  end



end
    
    def setParameter
  
      puts "Parameter #{@params} "
      autoobject = @params['object']
      #autoobject = autoobject.capitalize
      autoobject = autoobject.slice(0,1).capitalize + autoobject.slice(1..-1)
      automethod = @params['method']
      autoparam  = @params['value']
  
      if autoparam.index("(")
  
        if autoparam.index("url(")
          #Alert.show_popup autoobject +"."+ automethod+'= "'+autoparam+'"'
          eval autoobject +"."+ automethod+'= "'+autoparam+'"'
        else
         autoparam = autoparam.split("(").first
         #Alert.show_popup autoobject +"."+ automethod+"=url_for(:action => :"+autoparam+")"
         eval autoobject +"."+ automethod+"=url_for(:action => :"+autoparam+")"
        end
      else
        if autoparam
          if autoparam == 'true' or autoparam == 'false'
            eval autoobject +"."+ automethod+"="+autoparam
          else
          #Alert.show_popup autoobject +"."+ automethod+"= '"+autoparam+"'"
          eval autoobject +"."+ automethod+"= '"+autoparam+"'"
          end
        else
        eval autoobject +"."+ automethod+"=''"
        end
      end
    end

    #Add All Module Reset Calls Here
    def reset
      #Imager Module
      Imager.imagerEnumEvent="";
      Imager.imagerEvent="";

      #FileTransfer Reset Module
      FileTransfer.createFolders = ""
      FileTransfer.overWrite = ""
      FileTransfer.transferEvent = ""

      #Battery Module
      Battery.batteryEvent = ""
      Battery.smartBatteryEvent = ""

      #Signal Module
      Signal.signalEvent = ""

      #Device And Apps
      Backlight.backlightSettingsEvent = ""
      Alarm.alarmTriggered =""
      Timer.timeout =""
      
      #Gesture Module
      Gesture.delete
    end


####################################################################
############## Common Call #########################################
####################################################################
    
    def checkFileExist
      path = @params['path']
      Rho::AsyncHttp.get(
        :url => path,
        #:authorization => {:type => :basic, :username => 'user', :password => 'none'},
        :callback => (url_for :action => :filecheck_callback_http),
        :callback_param => "" )
    end
    
    def checkFileExistFtp
      path = @params['path']
      Rho::AsyncHttp.post(
        :url => "http://192.168.6.18/jasmine/filecheck/fileexist.aspx",
        :body => "path=#{path}",
        :callback => (url_for :action => :filecheck_callback_ftp),
        :callback_param => "" )
    end
    
    def filecheck_callback_http
      fileExistMsg = ""
      puts "httpget_callback: #{@params}"
      if @params['status'] != 'ok'
        fileExistMsg = ""

      else
        fileExistMsg = "OK: File Exist"
      end

      WebView.execute_js("setFileExistFlag('#{fileExistMsg}')")
    end
    
    def filecheck_callback_ftp
      puts "httpget_callback: #{@params}"
      if @params['status'] != 'ok'
        fileExistMsg = ""
      else
        fileExistMsg = @params['body']
      end

      WebView.execute_js("setFileExistFlag('#{fileExistMsg}')")

    end
    
    #Create Folder On FTP
    def createFtpFolder
      path = @params['path']
      Rho::AsyncHttp.get(
        :url => path
      )
    end


####################################################################
############## Add Ruby Call Back Methods Here #####################
####################################################################

# Imager Module Callback Methods

  def onImageCapture
    puts @params
    imageData = @params['imageData']
    WebView.execute_js('onImageCapture("'+imageData+'")')
  end
  
  def JSimagerEnumEvent

    puts "In Enum imager Callback"
    deviceimagers = @params
    ienumbuf = 'Available Imagers:'
    if deviceimagers
      puts "inside if case"  
      deviceimagers["imagerArray"].each {|imager|  ienumbuf += '' + imager["deviceName"] + " : " + imager["friendlyName"] }
    end
    puts "imager enum event : #{ienumbuf}"
    WebView.execute_js("JSimagerEnumEvent('#{ienumbuf}')")  
  
  end
     
  def JSimagerEvent

    puts "inside imagerevent"
    resultHash = @params
    puts "resultHash value : #{resultHash}"
    imagereventinfo = ""
    if resultHash
      imagereventinfo = resultHash['transferResult'] 
    end
    puts "imager event : #{imagereventinfo}"
    WebView.execute_js("JSimagerEvent('#{imagereventinfo}')")

  end
  
# Signature Module

  def onSignatureCapture
    puts @params
    imageData = @params['imageData']
    WebView.execute_js('onSignatureCapture("'+imageData+'")')
  end
  
  def JSSigtranseferEvent

    sigeventinfo = ""
    puts "signature event info going on"
    sigeventinfo = @params['transferResult']  
    WebView.execute_js("JSSigtranseferEvent('#{sigeventinfo}')") 

  end

  def Jsvectoryarray

    resultHash = @params
    buf = ""
    if resultHash
      if resultHash["vectorArray"]
        resultHash["vectorArray"].each {|x| buf += x.to_s }
      end
    else
      buf = "vector array is empty"
    end

    WebView.execute_js("Jsvectoryarray('#{buf}')")
    puts buf
  end
  
  #File Transfer
  
  def jsFileTransferEvent
    puts @params
    transferResult = @params['transferResult']
    WebView.execute_js("jsFileTransferEvent('#{transferResult}')")

  end
  
  #Indicator Module
  
  # Battery
  
  def getsettingsjsFunction

    puts "Battery Params #{@params}"
    
    theOutput = "";
    acLineStatus = batteryLifePercent = backupBatteryLifePercent = eventSource = batteryLifeKnown = backupBatteryLifeKnown = "";

    acLineStatus = @params['acLineStatus']
    batteryLifePercent = @params['batteryLifePercent']
    backupBatteryLifePercent = @params['backupBatteryLifePercent']
    eventSource = @params['eventSource']
    batteryLifeKnown = @params['batteryLifeKnown']
    backupBatteryLifeKnown = @params['backupBatteryLifeKnown']
      
    if(acLineStatus)
      theOutput = theOutput + "acLineStatus: #{acLineStatus} <BR>";
    end

    if(batteryLifePercent)
      theOutput = theOutput + "batteryLifePercent: #{batteryLifePercent} <BR>";
    end

    if(backupBatteryLifePercent)
      theOutput = theOutput + "backupBatteryLifePercent: #{backupBatteryLifePercent} <BR>";
    end

    if(eventSource)
      theOutput = theOutput + "eventSource: #{eventSource} <BR>";
    end

    if(batteryLifeKnown)
      theOutput = theOutput + "batteryLifeKnown: #{batteryLifeKnown} <BR>";  
    end

    if(backupBatteryLifeKnown)
      theOutput = theOutput + "backupBatteryLifeKnown: #{backupBatteryLifeKnown} <BR>";
    end

   WebView.execute_js("getsettingsjsFunction('#{theOutput}')")
    
  end
  
  def smartBatteryjsonFunction

    puts "Smart Battery Params #{@params}"

    theOutput = "";
    serialNumber = partNumber = batteryChargeCycles = ratedCapacity = manufactureDate = stateOfHealth = "";

    serialNumber = @params['serialNumber']
    partNumber = @params['partNumber']
    batteryChargeCycles = @params['batteryChargeCycles']
    ratedCapacity = @params['ratedCapacity']
    manufactureDate = @params['manufactureDate']
    stateOfHealth = @params['stateOfHealth']

    if(serialNumber)
      theOutput = theOutput + "serialNumber: #{serialNumber} <BR>";
    end

    if(partNumber)
      theOutput = theOutput + "partNumber: #{partNumber} <BR>";
    end

    if(batteryChargeCycles)
      theOutput = theOutput + "batteryChargeCycles: #{batteryChargeCycles} <BR>";
    end

    if(ratedCapacity)
      theOutput = theOutput + "ratedCapacity: #{ratedCapacity} <BR>"
    end

    if(manufactureDate)
      theOutput = theOutput + "manufactureDate: #{manufactureDate} <BR>" 
    end

    if(stateOfHealth)
      theOutput = theOutput + "stateOfHealth: #{stateOfHealth} <BR>"
    end

    WebView.execute_js("smartBatteryjsonFunction('#{theOutput}')")

  end
  
  #Signal
  
  def jsSignalEventCallBack
    theOutput = "";
    signalStrength = essid = macAddress = adapterName = dhcpServer = dhcpStatic = gateway = ipAddress = rssi = subnetMask = wins = "";
    
    signalStrength = @params['signalStrength']
    essid = @params['essid']
    macAddress = @params['macAddress']
    adapterName = @params['adapterName']
    dhcpServer = @params['dhcpServer']
    dhcpStatic = @params['dhcpStatic']
    gateway = @params['gateway']
    ipAddress = @params['ipAddress']
    rssi = @params['rssi']
    subnetMask = @params['subnetMask']
    wins = @params['wins']
    
    if(signalStrength)
      theOutput = theOutput + "signalStrength: #{signalStrength} <BR>";
    end
    
    if(essid)
      theOutput = theOutput + "essid:  #{essid} <BR>";
    end
    
    if(macAddress)
      theOutput = theOutput + "macAddress:  #{macAddress} <BR>";
    end
    
    if(adapterName)
      theOutput = theOutput + "adapterName:  #{adapterName} <BR>";
    end
    
    if(dhcpServer)
      theOutput = theOutput + "dhcpServer:  #{dhcpServer} <BR>";  
    end
    
    if(dhcpStatic)
      theOutput = theOutput + "dhcpStatic:  #{dhcpStatic} <BR>";
    end
    
    if(gateway)
      theOutput = theOutput + "gateway:  #{gateway} <BR>";
    end
    
    if(ipAddress)
      theOutput = theOutput + "ipAddress:  #{ipAddress} <BR>";
    end
    
    if(rssi)
      theOutput = theOutput + "rssi:  #{rssi} <BR>";
    end
    
    if(subnetMask)
      theOutput = theOutput + "subnetMask:  #{subnetMask} <BR>";
    end
    
    if(wins)
      theOutput = theOutput + "wins:  #{wins} <BR>"; 
    end
    
    WebView.execute_js("jsSignalEventCallBack('#{theOutput}')")
  end

  
  def jsBacklightSettingsEvent

    puts "#{@params}"

    theOutput = ""

    backlight = @params

    theOutput = "Backlight State:- " + backlight['state'] 
    theOutput = theOutput + " Backlight Intensity: " + backlight['intensity'] 
    theOutput = theOutput + " Backlight Intensity Range: "

    buf = ""
    backlight['intensityRange'].each {|x| buf += x }
    theOutput = theOutput+buf  

    WebView.execute_js("jsBacklightSettingsEvent('#{theOutput}')")
  end
  
  def jsEnumNotificationsEvent
    
    puts "Notifyevent #{@params}"

    ienumbuf = ''

    notifyarray = @params

    notifyarray["notificationsArray"].each {|notarr|  ienumbuf += '' + notarr["notificationIndex"].to_s + " : " + notarr["notificationType"].to_s + " : " + notarr["notificationName"]+"---" }

    WebView.execute_js("jsEnumNotificationsEvent('#{ienumbuf}')")  
    
  end
    
  def jsScreenOrientationEvent
  
    screenOut = ""
  
    out = @params
  
    screenOut = out['orientation']
    WebView.execute_js("jsScreenOrientationEvent('#{screenOut}')")
  
  end
  
  def jsScreenOrientationEnableEvent
    screenOut = ""

    out = @params

    screenOut = out['orientation']
    WebView.execute_js("jsScreenOrientationEnableEvent('#{screenOut}')")
  end
  
  def jsTimeout
    time = @params['time']
    $outTimer =""
    $outTimer = "Current time is using Ruby is:"+time
    WebView.execute_js("jsTimeout('#{$outTimer}')")
  end
  
  def doAlarm
    WebView.execute_js("doAlarm()")
  end
  
# Device and Application
     
  def doStatejsFunction
    puts "Output #{@params}"
    appMessage = "Application #{@params}"
    WebView.execute_js("doStatejsFunction('#{appMessage}')")
  end

    #Call Back version for version event
  def fnVer

    puts ("Out Put: #{@params}")
    resultHash = @params
    String buf = ""
    buf += "Product Version : " + resultHash["productVersion"] + "\n"
    buf += "Hot Fixes: "
    resultHash["hotFixes"].each {|x| buf += x + ', '}
    buf += "\n"
    buf += 'Components:' + "\n"
    resultHash["componentVersions"].each {|component| buf += '' + component["module"] + " is version " + component["version"] + "\n"}
    puts buf
    WebView.execute_js("fnVer('#{buf}')")

  end
  
  ## Common API Implementation
  def commonReset
    #Barcode Code
    Rho::Barcode.disable
  end
  
  
  def enumScanner
    arBarcodes = Barcode.enumerate
    data = ''
    data = arBarcodes[0].to_s + "," + arBarcodes[1].to_s
    puts "After Enum #{data}"
    WebView.execute_js("scannerCallBack('#{data}')")
  end
  
  #Gesture CallBacks
  def onGestureJSON
    puts "Gesture CallBacks #{@params}"
    data = ''
    data = @params['id']
    WebView.execute_js("onGestureJSON('#{data}')")
  end
  
  #Key Capture Module
  def jsKeyEvent
    puts "Key Code Is #{@params}"
    data = ''
    data = @params['keyValue']
    WebView.execute_js("jsKeyEvent('#{data}')")
  end

  ###########################################################################
  ######################### COMMON API CALLBACKS ############################           
  ###########################################################################
  
#  def enumCallbackCommon (e)
#    puts "Barcode Sync Call Output is #{e}"
#    e.each {|x| buf += x.to_s }
#    WebView.execute_js("enumCallbackCommon('#{buf}')")
#  end
  
    def enumCallbackCommon(options = {})
      puts "Option Value #{options}"
      calltype = "Sync Call"
      puts "Variable #{options.is_a?(Hash)}"
      if(options.empty?)
        calltype = "Async Call"
        puts "Async Call. Data Inside Params[result]"
        puts "#{@params}"
        options = @params['result']
      elsif options.is_a?(Hash)
        if (options.has_key?("result"))
          calltype = "Lambda Call"
          options = options['result']
          puts "Lambda Enum #{options}"
        end
      end

      #Debugging Purposes
      puts calltype
      
      data = ''
      options.each do |thing|
        data = data.to_s() + "<br>" + thing.to_s
      end

      WebView.execute_js("enumCallbackCommon('#{data}')")

    end

    def scanCallbackCommon(options = {})

      if(options.empty?)
        calltype = "Async Call"
        puts "Async Call. Data Inside Body Of Params"
        puts "#{@params}"
        options = @params
      end

      puts "Scanned Data #{options}"
      scanners = ''
      options.each do |thing|
        scanners = scanners.to_s() + "<br>" + thing.map{|k,v| "#{k}=#{v}"}.join('<br>') 
      end

      puts scanners
      WebView.execute_js("enumCallbackCommon('#{scanners}')")
  
    end
    
    def returnGetProperty(options = {})
      puts "options Is #{options}"
      puts "Params Is #{@params}"
      if(options.nil? or options.empty?)
        calltype = "Async Call"
        puts "Async Call. Data Inside Body Of Params"
        puts "#{@params}"
        options = @params
      end
      
      puts "Get Data #{options}"
      data = ''
      if options.kind_of?(Hash)
        options.each do |thing|
          data = data.to_s() + "<br>" + thing.map{|k,v| "#{k}=#{v}"}.join('<br>') 
        end
      else
        data = options
      end
      puts data
      
      puts "Out Put #{data}"
      WebView.execute_js("returnGetProperty('#{data}')")
    end
    
    def drawPoints
      Automate.drawline 500,100,500,500
    end
    
    def scanDecodeCallback(options = {})
    
      if(options.empty?)
        calltype = "Async Call"
        puts "Async Call. Data Inside Body Of Params"
        puts "#{@params}"
        options = @params
      end
    
      puts "Scanned Data #{options}"
      
      scanners = ''
      scanners = options['data']
      puts scanners
      WebView.execute_js("scanDecodeCallback('#{scanners}')")
    end

end