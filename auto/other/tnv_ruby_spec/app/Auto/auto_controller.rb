require 'rho/rhocontroller'
require 'helpers/browser_helper'
require 'helpers/api_helper'
#require 'helpers/automate_helper'

require 'json'

class AutoController < Rho::RhoController
  include BrowserHelper
  @layout = 'Auto/layout'
  #@layout = 'Auto/layoutTNV'
  
  
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
     if(autoobject != 'self') #If self is there no need to make it capital.
      autoobject = autoobject.slice(0,1).capitalize + autoobject.slice(1..-1)
     end
    answer = nil
    if(callback.empty?)
      puts autoobject +"."+ automethod
      answer = eval autoobject +"."+ automethod
    else
      puts autoobject +"."+ automethod + "("+callback+")"
      eval autoobject +"."+ automethod +"("+callback+")"
    end
    render :string => answer.to_s
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
         begin
            eval autoobject +"."+ automethod+'= "'+autoparam+'"'
         rescue => ex
           puts "Exception Thrown: #{ex.message}" 
         end
        else
         autoparam = autoparam.split("(").first
         #Alert.show_popup autoobject +"."+ automethod+"=url_for(:action => :"+autoparam+")"
         begin
            eval autoobject +"."+ automethod+"=url_for(:action => :"+autoparam+")"
         rescue => ex
           puts "Exception Thrown: #{ex.message}" 
         end
        end
      else
        if autoparam

          if autoparam == 'true' or autoparam == 'false' or /^[\d]+(\.[\d]+){0,1}$/ === autoparam
            begin
              eval autoobject +"."+ automethod+"="+autoparam
            rescue => ex
              puts "Exception Thrown: #{ex.message}" 
            end
          else
          #Alert.show_popup autoobject +"."+ automethod+"= '"+autoparam+"'"
            begin
              eval autoobject +"."+ automethod+"= '"+autoparam+"'"
            rescue => ex
              puts "Exception Thrown: #{ex.message}" 
            end
          end
        else
          begin
            eval autoobject +"."+ automethod+"=''"
          rescue => ex
            puts "Exception Thrown: #{ex.message}" 
          end
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
    
    def returnGetPropertyCallback(options = {})
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
      WebView.execute_js("returnGetPropertyCallback('#{data}')")
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
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
###########################################################################
######################### DATABASE COMMON API #############################           
###########################################################################
#Test case 1-To open a database
 def openDB
   db =Rho::Database.new(Rho::Application.databaseFilePath('local'), "local");
   puts "#{db.to_s}"
   data = db
   data
 end
 
# Test case2 - executeSql with no Args
def executeNoArgs
  db =Rho::Database.new(Rho::Application.databaseFilePath('local'), "local");
  
  tableName = Library.getRandomName
  puts "Table Name #{tableName}"
  
  db.executeSql("CREATE TABLE #{tableName}(x INTEGER, y TEXT)") 
  data = db.isTableExist(tableName)
  
  puts "#{data}"
  data
end

def excuteBatchNoArgs
  db=Rho::Database.new(Rho::Application.databaseFilePath('local'), "local");
  
  tableName1 = Library.getRandomName
  puts "Table Name #{tableName1}"
  tableName2 = Library.getRandomName
  puts "Table Name #{tableName2}"
  tableName3 = Library.getRandomName
  puts "Table Name #{tableName3}"
  tableName4 = Library.getRandomName
  puts "Table Name #{tableName4}"
  
  db.executeBatchSql("CREATE TABLE #{tableName1}(x INTEGER, y TEXT);CREATE TABLE #{tableName2}(x INTEGER, y TEXT);CREATE TABLE #{tableName3}(x INTEGER, y TEXT);CREATE TABLE #{tableName4}(x INTEGER, y TEXT)")
  puts "#{db.isTableExist(tableName1)}"
  puts "#{db.isTableExist(tableName2)}"
  puts "#{db.isTableExist(tableName3)}"
  puts "#{db.isTableExist(tableName4)}"
  
  if db.isTableExist(tableName1) && db.isTableExist(tableName2) && db.isTableExist(tableName3) && db.isTableExist(tableName4)
    data = 'true'
  else
    data = 'false'
  end

  data

end

#Test case4- Destroy All Tables 
 def destroyAll
  db1=Rho::Database.new(Rho::Application.databaseFilePath('local'), "local");
  
   tableName5 = Library.getRandomName
   puts "Table Name #{tableName5}"
   tableName6 = Library.getRandomName
   puts "Table Name #{tableName6}"
   tableName7 = Library.getRandomName
   puts "Table Name #{tableName7}"
   tableName8 = Library.getRandomName
   puts "Table Name #{tableName8}"
  
  db1.executeBatchSql("CREATE TABLE #{tableName5}(x INTEGER, y TEXT);CREATE TABLE #{tableName6}(x INTEGER, y TEXT);CREATE TABLE #{tableName7}(x INTEGER, y TEXT);CREATE TABLE #{tableName8}(x INTEGER, y TEXT)")
   puts "#{db1.isTableExist(tableName5)}"
   puts "#{db1.isTableExist(tableName6)}"
   puts "#{db1.isTableExist(tableName7)}"
   puts "#{db1.isTableExist(tableName8)}"

  a=Array.new
  a<<tableName5<<tableName6<<tableName7<<tableName8
  
  db1.destroyTables({"include" =>a, "exclude" =>""})
    
   puts "#{db1.isTableExist(tableName5)}"
   puts "#{db1.isTableExist(tableName6)}"
   puts "#{db1.isTableExist(tableName7)}"
   puts "#{db1.isTableExist(tableName8)}"
   
   if db1.isTableExist(tableName5) || db1.isTableExist(tableName6) || db1.isTableExist(tableName7) || db1.isTableExist(tableName8)
     data = 'true'
   else
     data = 'false'
   end

   data
 end
 
#Test case 5- To exclude tables from deletion and checkExcluded tables
 def excludeTables_exist
  db1=Rho::Database.new(Rho::Application.databaseFilePath('local'), "local");
  
   tableName5 = Library.getRandomName
   puts "Table Name #{tableName5}"
   tableName6 = Library.getRandomName
   puts "Table Name #{tableName6}"
   tableName7 = Library.getRandomName
   puts "Table Name #{tableName7}"
   tableName8 = Library.getRandomName
   puts "Table Name #{tableName8}"
   
  db1.executeBatchSql("CREATE TABLE #{tableName5}(x INTEGER, y TEXT);CREATE TABLE #{tableName6}(x INTEGER, y TEXT);CREATE TABLE #{tableName7}(x INTEGER, y TEXT);CREATE TABLE #{tableName8}(x INTEGER, y TEXT)")
   puts "#{db1.isTableExist(tableName5)}"
   puts "#{db1.isTableExist(tableName6)}"
   puts "#{db1.isTableExist(tableName7)}"
   puts "#{db1.isTableExist(tableName8)}"
     
     a=Array.new
     a<<tableName6<<tableName7
     
    db1.destroyTables({"include" =>"" , "exclude" =>a})
     puts "#{db1.isTableExist(tableName5)}"
     puts "#{db1.isTableExist(tableName6)}"
     puts "#{db1.isTableExist(tableName7)}"
     puts "#{db1.isTableExist(tableName8)}"
     
   if db1.isTableExist(tableName6) && db1.isTableExist(tableName7)
     data = 'true'
   else
     data = 'false'
   end

   data
   
 end
 
#Test case 5- To exclude tables from deletion and checkExcluded tables
 def excludeTables_notexist
  db1=Rho::Database.new(Rho::Application.databaseFilePath('local'), "local");
  
   tableName5 = Library.getRandomName
   puts "Table Name #{tableName5}"
   tableName6 = Library.getRandomName
   puts "Table Name #{tableName6}"
   tableName7 = Library.getRandomName
   puts "Table Name #{tableName7}"
   tableName8 = Library.getRandomName
   puts "Table Name #{tableName8}"
   
  db1.executeBatchSql("CREATE TABLE #{tableName5}(x INTEGER, y TEXT);CREATE TABLE #{tableName6}(x INTEGER, y TEXT);CREATE TABLE #{tableName7}(x INTEGER, y TEXT);CREATE TABLE #{tableName8}(x INTEGER, y TEXT)")
   puts "#{db1.isTableExist(tableName5)}"
   puts "#{db1.isTableExist(tableName6)}"
   puts "#{db1.isTableExist(tableName7)}"
   puts "#{db1.isTableExist(tableName8)}"
     
     a=Array.new
     a<<tableName6<<tableName7
     
    db1.destroyTables({"include" =>"" , "exclude" =>a})
     puts "#{db1.isTableExist(tableName5)}"
     puts "#{db1.isTableExist(tableName6)}"
     puts "#{db1.isTableExist(tableName7)}"
     puts "#{db1.isTableExist(tableName8)}"
     
   if db1.isTableExist(tableName5) && db1.isTableExist(tableName8)
     data = 'true'
   else
     data = 'false'
   end

   data
   
 end
 
 
#Test case6- To exclude and include few tables 
    
  def excludeFewTables
    
    db1=Rho::Database.new(Rho::Application.databaseFilePath('local'), "local");
    
    tableName5 = Library.getRandomName
    puts "Table Name #{tableName5}"
    tableName6 = Library.getRandomName
    puts "Table Name #{tableName6}"
    tableName7 = Library.getRandomName
    puts "Table Name #{tableName7}"
    tableName8 = Library.getRandomName
    puts "Table Name #{tableName8}"
    tableName9 = Library.getRandomName
    puts "Table Name #{tableName9}"
    
    db1.executeBatchSql("CREATE TABLE #{tableName5}(x INTEGER, y TEXT);CREATE TABLE #{tableName6}(x INTEGER, y TEXT);CREATE TABLE #{tableName7}(x INTEGER, y TEXT);CREATE TABLE #{tableName8}(x INTEGER, y TEXT);CREATE TABLE #{tableName9}(x INTEGER, y TEXT)")
     puts "#{db1.isTableExist(tableName5)}"
     puts "#{db1.isTableExist(tableName6)}"
     puts "#{db1.isTableExist(tableName7)}"
     puts "#{db1.isTableExist(tableName8)}"
     puts "#{db1.isTableExist(tableName9)}"
     
     a=Array.new
     a<<tableName5<<tableName6
     
     b=Array.new
     b<<tableName7<<tableName8
    
      db1.destroyTables({:include => a, :exclude => b})
      puts "#{db1.isTableExist(tableName5)}"
      puts "#{db1.isTableExist(tableName6)}"
      puts "#{db1.isTableExist(tableName7)}"
      puts "#{db1.isTableExist(tableName8)}"
      puts "#{db1.isTableExist(tableName9)}"

    if !(db1.isTableExist(tableName5) || db1.isTableExist(tableName6)) && (db1.isTableExist(tableName7) && db1.isTableExist(tableName8) && db1.isTableExist(tableName9))
      data = 'true'
    else
      data = 'false'
    end

    data
  end
  
  
  def destroytable
     db=Rho::Database.new(Rho::Application.databaseFilePath('local'), "local"); 
     
    tableName5 = Library.getRandomName
    puts "Table Name #{tableName5}"
     
     db.executeSql("CREATE TABLE #{tableName5}(x INTEGER, y TEXT)")
     puts "#{db.isTableExist(tableName5)}"
     db.destroyTable(tableName5)
     puts "#{db.isTableExist(tableName5)}"
     
    if db.isTableExist(tableName5)
      data = 'true'
    else
      data = 'false'
    end
 
    data

  end
 
 # Test case8 - Close Database and Perform Database Transaction -see how to handle exception
     
 def closeDb
   db=Rho::Database.new(Rho::Application.databaseFilePath('local'), "local");

   tableName5 = Library.getRandomName
   puts "Table Name #{tableName5}"
   
   db.executeSql("CREATE TABLE #{tableName5}(x INTEGER, y TEXT)")
   puts "#{db.isTableExist(tableName5)}"
   db.close()

   begin
     db.executeSql("CREATE TABLE willnevercreated(x INTEGER, y TEXT)")
     puts "#{db.isTableExist(willnevercreated)}"
   rescue => ex
     data = ex.message
   end
   
   data
   
 end
 
 
 #Test case9- Close Database and try reading from DB-try handling exeception
 def closeRead
  db=Rho::Database.new(Rho::Application.databaseFilePath('local'), "local");
  
   db.executeBatchSql("DROP TABLE IF EXISTS t15;CREATE TABLE t15(x INTEGER, y TEXT)")
   db.executeSql("INSERT INTO t15(x,y) VALUES(?,?)",[10,'ten'])
   puts "#{ db.executeSql("SELECT y FROM t15 WHERE x=10")}"
   db.close()

    begin
      value = db.executeSql("SELECT x FROM t15 WHERE y='ten'")
      puts "#{value}"
    rescue => ex
      data = ex.message
    end

    data

end
 
# Test case10- Open the closed Database and read from it 
def closeOpen
 db=Rho::Database.new(Rho::Application.databaseFilePath('local'), "local");
   
  db.executeBatchSql("DROP TABLE IF EXISTS t15;CREATE TABLE t15(x INTEGER, y TEXT)")
  db.executeSql("INSERT INTO t15(x,y) VALUES(?,?)",[10,'ten'])
  puts "#{ db.executeSql("SELECT y FROM t15 WHERE x=10")}"
  
  db.close()
  
  db=Rho::Database.new(Rho::Application.databaseFilePath('local'), "local");
  value = db.executeSql("SELECT x FROM t15 WHERE y='ten'")

  data = value[0]['x']
  
 data

end

#Test case11-To Demonstrate Commit Transaction 
def commitTxn
  db=Rho::Database.new(Rho::Application.databaseFilePath('local'), "local");

  db.startTransaction()
  db.executeBatchSql("DROP TABLE IF EXISTS t20;CREATE TABLE t20(x INTEGER, y TEXT)") 
  db.executeSql("INSERT INTO t20(x,y) VALUES(?,?)",[10,'ten'])
  db.commitTransaction()

  value = db.executeSql("SELECT y FROM t20 WHERE x=10")
  data = value[0]['y']
 
  data
end

#Test case12- To Demonstrate rollbackTransaction
def rollbackTxn
 db=Rho::Database.new(Rho::Application.databaseFilePath('local'), "local");

 db.startTransaction()
 db.executeBatchSql("DROP TABLE IF EXISTS t21;CREATE TABLE t21(x INTEGER, y TEXT)") 
 db.executeSql("INSERT INTO t21(x,y) VALUES(?,?)",[10,'fifteen'])
 db.rollbackTransaction()

 begin
    value = db.executeSql("SELECT y FROM t21  WHERE x=10")
    puts "#{value}"
  rescue => ex
    data = ex.message
  end
  
 data

end
 
  
#Test case 13- To Demonstrate RollbackTransaction after calling CommitTranscation
  
def comRollTxn
 db=Rho::Database.new(Rho::Application.databaseFilePath('local'), "local");
 db.startTransaction()
 db.executeBatchSql("DROP TABLE IF EXISTS t22;CREATE TABLE t22(x INTEGER, y TEXT)") 
 db.executeSql("INSERT INTO t22(x,y) VALUES(?,?)",[10,'fifteen'])
 db.commitTransaction()
 db.rollbackTransaction()

 value = db.executeSql("SELECT y FROM t22 WHERE x=10")
 
  data = value[0]['y']
  
  data

end

# Destroy table with null Value
def dropNull
  db=Rho::Database.new(Rho::Application.databaseFilePath('local'), "local");

  tableName = Library.getRandomName
  puts "Table Name #{tableName}"
  
  db.executeSql("CREATE TABLE #{tableName}(x INTEGER, y TEXT)")

  begin
    db.destroyTable("")
   rescue => ex
     Alert.show_popup ex.message
     data = ex.message
   end

  if db.isTableExist(tableName)
    data = 'true'
  else
    data = 'false'
  end

  data

end

def destroyTwice
  db=Rho::Database.new(Rho::Application.databaseFilePath('local'), "local");
 
  tableName = Library.getRandomName
  puts "Table Name #{tableName}"

  db.executeBatchSql("CREATE TABLE #{tableName}(x INTEGER, y TEXT)")
  db.isTableExist(tableName)
  db.destroyTable(tableName)

  if db.isTableExist(tableName)
    data = 'true'
  else
    data = 'false'
  end
  
  data
end
    
    
 # isTable exist with null value
def nullTable
  db=Rho::Database.new(Rho::Application.databaseFilePath('local'), "local"); 
  
  if db.isTableExist('')
    data = 'true'
  else
    data = 'false'
  end
  
  data

end
  
# Call rollbackTransaction without StartTransaction 
def rollTxn
  db=Rho::Database.new(Rho::Application.databaseFilePath('local'), "local");
  
  tableName = Library.getRandomName
  puts "Table Name #{tableName}"
  
  db.executeBatchSql("DROP TABLE IF EXISTS #{tableName};CREATE TABLE #{tableName}(x INTEGER, y TEXT)")
  puts "#{db.isTableExist(tableName)}"
  db.rollbackTransaction()
  
  if db.isTableExist(tableName)
    data = 'true'
  else
    data = 'false'
  end
  
  data
end   

# invalid execute statement passed with executeSQL 
def invalidSql
  db=Rho::Database.new(Rho::Application.databaseFilePath('local'), "local"); 
  
  begin
    db.executeBatchSql("DROP TABLE IF EXISTS fab;CREATE taasf  fab(x INTEGER, y TEXT)")
   rescue => ex
     data = ex.message
   end
   
  data
end

# initiate DB at invalid file path 
def fooDB

  begin
    db=Rho::Database.new("/fooo/fooo/fooo", "local");
   rescue => ex
     Alert.show_popup ex.message
     data = ex.message
   end
   
  data

end

# executeBatchSql method with one invalid statement-Drop , both the tables should get created 

def invalidBSql
  db=Rho::Database.new(Rho::Application.databaseFilePath('local'), "local"); 

  tableName1 = Library.getRandomName
  puts "Table Name #{tableName1}"

  tableName2 = Library.getRandomName
  puts "Table Name #{tableName2}"

  begin
     db.executeBatchSql("CREATE TABLE #{tableName1}(x INTEGER, y TEXT);DROP EXISTS t25;CREATE TABLE #{tableName2}(x INTEGER, y TEXT)")
   rescue => ex
     data = ex.message
   end

  data
  
end

# ExecuteSql with null statement 
def nullSql
  db=Rho::Database.new(Rho::Application.databaseFilePath('local'), "local"); 

  begin
    db.executeSql("")
   rescue => ex
     data = ex.message
   end
   
  data
  
end 

# ExecuteBatchSql with null statement 
def nullBSql
  db=Rho::Database.new(Rho::Application.databaseFilePath('local'), "local"); 

  begin
    db.executeBatchSql("")
   rescue => ex
     data = ex.message
   end
   
  data

end 

# Call commmitTransaction without startTransaction

def nullCommit
  db=Rho::Database.new(Rho::Application.databaseFilePath('dev'), "dev"); 
  db.executeBatchSql("DROP TABLE IF EXISTS bob;CREATE TABLE bob(x INTEGER, y TEXT)") 
  db.commitTransaction()

  if db.isTableExist("bob")
    data = 'true'
  else
    data = 'false'
  end
  
  data
end

# Db object with invalid Partition 
def invalidPartition

  begin
    db=Rho::Database.new(Rho::Application.databaseFilePath('local'));
   rescue => ex
     data = ex.message
   end
  data
end

#To demonstrate two DB objects pointing to two different paths with same db partition 
def multiDBsame

  tableName = Library.getRandomName
  puts "Table Name #{tableName}"

  db=Rho::Database.new(Rho::Application.databaseFilePath('testDB'), "testDB")
  db.executeBatchSql("CREATE TABLE #{tableName}(x INTEGER, y TEXT)")
  db.executeSql("INSERT INTO #{tableName} VALUES(?,?)",[10,'fifteen'])
  value = db.executeSql("SELECT y FROM #{tableName} WHERE x=10")

  puts getmodelpath = Rho::RhoApplication::get_model_path('app', 'Settings')

  db1=Rho::Database.new(File.join(getmodelpath, "testDB"), "testDB")
  db1.executeBatchSql("CREATE TABLE #{tableName}(x INTEGER, y TEXT)")
  db1.executeSql("INSERT INTO #{tableName}(x,y) VALUES(?,?)",[10,'fifty'])
  value1 = db1.executeSql("SELECT y FROM #{tableName} WHERE x=10")
  
  data = value[0]['y']+','+value1[0]['y']
  puts data
  data
  
end

#To demonstrate two DB objects pointing to two different  paths with different db partition 
def multiDBdifferent

  tableName = Library.getRandomName
  puts "Table Name #{tableName}"

  db=Rho::Database.new(Rho::Application.databaseFilePath('testDB1'), "testDB1")
  db.executeBatchSql("CREATE TABLE #{tableName}(x INTEGER, y TEXT)")
  db.executeSql("INSERT INTO #{tableName} VALUES(?,?)",[10,'fifteen'])
  value = db.executeSql("SELECT y FROM #{tableName} WHERE x=10")

  puts getmodelpath = Rho::RhoApplication::get_model_path('app', 'Settings')

  db1=Rho::Database.new(File.join(getmodelpath, "testDB2"), "testDB2");
  db1.executeBatchSql("CREATE TABLE #{tableName}(x INTEGER, y TEXT)")
  db1.executeSql("INSERT INTO #{tableName}(x,y) VALUES(?,?)",[10,'fifty'])
  value1 = db1.executeSql("SELECT y FROM #{tableName} WHERE x=10")
  
  data = value[0]['y']+','+value1[0]['y']
  puts data
  data
end


# To demonstrate two DB objects pointing to same path diffrent db partition 
def multiDBobjects

  tableName = Library.getRandomName
  puts "Table Name #{tableName}"

  db = Rho::Database.new(Rho::Application.databaseFilePath('local'), "part1");
  db2 = Rho::Database.new(Rho::Application.databaseFilePath('local'), "part2");

  db.executeBatchSql("CREATE TABLE #{tableName}(x INTEGER, y TEXT)")
  db2.executeSql("INSERT INTO #{tableName}(x,y) VALUES(?,?)",[10,'fifty'])
  value = db.executeSql("SELECT y FROM #{tableName} WHERE x=10")

  data = value[0]['y']

  data

end


#To demonstarte two db objects  pointing to same path and same db partition-closing one db object 
def multiDBobjects2
  tableName = Library.getRandomName
  puts "Table Name #{tableName}"

  db=Rho::Database.new(Rho::Application.databaseFilePath('testDB'), "testDB")
  db1=Rho::Database.new(Rho::Application.databaseFilePath('testDB'), "testDB")

  db.executeBatchSql("CREATE TABLE #{tableName}(x INTEGER, y TEXT)")
  db.executeSql("INSERT INTO #{tableName} VALUES(?,?)",[10,'fifteen'])
  db.close

  begin
    value1 = db1.executeSql("SELECT y FROM #{tableName} WHERE x=10")
    data = value1[0]['y']
    puts data
   rescue => ex
     data = ex.message
   end

   data
end

#To demonstrate two DB objects pointing to two different  paths with different db partition -Close one db object .

def closeIrrDb

  tableName = Library.getRandomName
  puts "Table Name #{tableName}"

  puts getmodelpath = Rho::RhoApplication::get_model_path('app', 'Settings')

  db=Rho::Database.new(Rho::Application.databaseFilePath('testDB1'), "testDB1")
  db1=Rho::Database.new(File.join(getmodelpath, "testDB2"), "testDB2")

  db.executeBatchSql("CREATE TABLE #{tableName}(x INTEGER, y TEXT)")
  db.executeSql("INSERT INTO #{tableName} VALUES(?,?)",[10,'fifteen'])
  value = db.executeSql("SELECT y FROM #{tableName} WHERE x=10")
  db.close()
  
  begin
    db1.executeBatchSql("CREATE TABLE #{tableName}(x INTEGER, y TEXT)")
    db1.executeSql("INSERT INTO #{tableName}(x,y) VALUES(?,?)",[10,'fifty'])
    value1 = db1.executeSql("SELECT y FROM #{tableName} WHERE x=10")
  
    data = value[0]['y']+','+value1[0]['y']
   rescue => ex
     data = ex.message
   end
   puts data
   data
end 

#Invalid db path and invalid db partition 
def invalid
  data = ''
  begin
    db=Rho::Database.new("/fooo/fooo/fooo", "@$$%%@#");
   rescue => ex
     data = ex.message
   end

  data

end

#valid db path and invalid db partition 
def invalid1

  data = ''
  begin
    getmodelpath = Rho::RhoApplication::get_model_path('app', 'Settings')
    db=Rho::Database.new(File.join(getmodelpath, "test"), "@#%^&*#")
    data = db.to_s
   rescue => ex
     data = ex.message
   end

  data
end



#user defined database "app"

def dbApp
 
  tableName = Library.getRandomName
  puts "Table Name #{tableName}"
  
  db =Rho::Database.new(Rho::Application.databaseFilePath('app'), "app");
 
 db.executeBatchSql("CREATE TABLE #{tableName}(x INTEGER, y TEXT)") 
 
  if db.isTableExist(tableName)
    data = 'true'
  else
    data = 'false'
  end
  
  data

 end

#user defined database "user "
def dbUser
  tableName = Library.getRandomName
  puts "Table Name #{tableName}"
  
  db =Rho::Database.new(Rho::Application.databaseFilePath('user'), "user");
 
 db.executeBatchSql("CREATE TABLE #{tableName}(x INTEGER, y TEXT)") 
 
  if db.isTableExist(tableName)
    data = 'true'
  else
    data = 'false'
  end
  
  data
 end

 
 
#DestroyTables with null value 
def destroyTablesNull

  db1=Rho::Database.new(Rho::Application.databaseFilePath('local'), "local");
  
   tableName5 = Library.getRandomName
   puts "Table Name #{tableName5}"
   tableName6 = Library.getRandomName
   puts "Table Name #{tableName6}"
   tableName7 = Library.getRandomName
   puts "Table Name #{tableName7}"
   tableName8 = Library.getRandomName
   puts "Table Name #{tableName8}"
  
  db1.executeBatchSql("CREATE TABLE #{tableName5}(x INTEGER, y TEXT);CREATE TABLE #{tableName6}(x INTEGER, y TEXT);CREATE TABLE #{tableName7}(x INTEGER, y TEXT);CREATE TABLE #{tableName8}(x INTEGER, y TEXT)")
   puts "#{db1.isTableExist(tableName5)}"
   puts "#{db1.isTableExist(tableName6)}"
   puts "#{db1.isTableExist(tableName7)}"
   puts "#{db1.isTableExist(tableName8)}"

  db1.destroyTables({"include" =>"", "exclude" =>""})
    
   puts "#{db1.isTableExist(tableName5)}"
   puts "#{db1.isTableExist(tableName6)}"
   puts "#{db1.isTableExist(tableName7)}"
   puts "#{db1.isTableExist(tableName8)}"
   
   if db1.isTableExist(tableName5) || db1.isTableExist(tableName6) || db1.isTableExist(tableName7) || db1.isTableExist(tableName8)
     data = 'true'
   else
     data = 'false'
   end

   data
 end
 

def destroyTablesInvalid

  tableName = Library.getRandomName
  puts "Table Name #{tableName}"

  db1=Rho::Database.new(Rho::Application.databaseFilePath('local'), "local");
  a=Array.new
  a<<"not_exist1"<<"not_exist2"
  b=Array.new
  b<<"not_exist3"<<"not_exist4"

  data = ''
  begin
    db1.destroyTables({:include => a, :exclude => b})

    db1.executeBatchSql("CREATE TABLE #{tableName}(x INTEGER, y TEXT)")
    if db1.isTableExist(tableName)
      data = 'true'
    else
      data = 'false'
    end
   rescue => ex
     data = ex.message
   end

   data

 end 

def destroyTablesInvalid1
  
  tableName5 = Library.getRandomName
  puts "Table Name #{tableName5}"
  tableName6 = Library.getRandomName
  puts "Table Name #{tableName6}"
  
   db1=Rho::Database.new(Rho::Application.databaseFilePath('local'), "local");
   
   db1.executeBatchSql("CREATE TABLE #{tableName5}(x INTEGER, y TEXT);CREATE TABLE #{tableName6}(x INTEGER, y TEXT)")
   a=Array.new
   a<<"a"<<tableName5
   b=Array.new
   b<<"b"<<tableName6
  db1.destroyTables({:include => a, :exclude => b})

  val1= db1.isTableExist(tableName5)
  val2= db1.isTableExist(tableName6)

  if (val1 or val2)
    data = 'Table Exist'
  else
    data = 'Table Does Not Exist'
  end
  
  data
 
end

def tableExistInvalid
  db1=Rho::Database.new(Rho::Application.databaseFilePath('local'), "local")

  if db1.isTableExist("!@^&%$$%")
    data = 'true'
  else
    data = 'false'
  end

  data

end


def rollDestroyTable
  
  getmodelpath = Rho::RhoApplication::get_model_path('app', 'Settings')
  db=Rho::Database.new(File.join(getmodelpath, "test"), "test")
  
  db.startTransaction()

  tableName = Library.getRandomName
  puts "Table Name #{tableName}"

  db.executeBatchSql("CREATE TABLE #{tableName}(x INTEGER, y TEXT)")
  db.executeSql("INSERT INTO #{tableName}(x,y) VALUES(?,?)",[10,'fifteen'])
  db.commitTransaction()

  db.startTransaction()
  db.executeSql("INSERT INTO #{tableName}(x,y) VALUES(?,?)",[11,'six'])
  db.executeSql("DROP TABLE #{tableName}")
  db.rollbackTransaction()
  
  if db.isTableExist(tableName)
    data = 'true'
  else
    data = 'false'
  end
  
  data

end

def columnAdd
  db=Rho::Database.new(Rho::Application.databaseFilePath('local'), "local");
  
  tableName = Library.getRandomName
  puts "Table Name #{tableName}"
  
  db.executeBatchSql("CREATE TABLE #{tableName}(Id INTEGER NOT NULL PRIMARY KEY, EMPLOYEE TEXT, DESIGNATION VARCHAR)") 
  db.executeBatchSql("INSERT INTO #{tableName}(Id,EMPLOYEE,Designation) VALUES (1,'deva','SystemEngineer');INSERT INTO #{tableName}(Id,EMPLOYEE,Designation) VALUES (2,'abc','SystemEngineer');INSERT INTO #{tableName}(Id,EMPLOYEE,Designation) VALUES (3,'bhaktha','SystemEngineer')")
  db.executeSql("ALTER TABLE #{tableName} ADD COLUMN Manager")
  
  db.executeSql("UPDATE #{tableName} SET Manager='Kumar Sunil'")
  
  value = db.executeSql("SELECT Manager FROM #{tableName} WHERE Id=1")
  
  data = value[0]['Manager']

  data
  
end

def databaseNull

  begin
    db=Rho::Database.new()
    data = db.to_s
   rescue => ex
     data = ex.message
   end

   data

end

def databaseLong

  getmodelpath = Rho::RhoApplication::get_model_path('app', 'Settings')

  begin
    db=Rho::Database.new(File.join(getmodelpath, "abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuv"), "deva");
    data = db.to_s
   rescue => ex
     data = ex.message
   end

  data

end


def databaseNullPath

  begin
    db=Rho::Database.new("","Reddy")
    data = db.to_s
   rescue => ex
     data = ex.message
   end
   
  data

end

def RowDelete

  db=Rho::Database.new(Rho::Application.databaseFilePath('local'), "local");

  tableName = Library.getRandomName
  puts "Table Name #{tableName}"
  value = nil
  db.executeBatchSql("CREATE TABLE #{tableName}(Id INTEGER NOT NULL PRIMARY KEY, EMPLOYEE TEXT, DESIGNATION VARCHAR)") 
  db.executeBatchSql("INSERT INTO #{tableName}(Id,EMPLOYEE,Designation) VALUES (1,'deva','SystemEngineer');INSERT INTO #{tableName}(Id,EMPLOYEE,Designation) VALUES (2,'deva','SystemEngineer');INSERT INTO #{tableName}(Id,EMPLOYEE,Designation) VALUES (3,'bhaktha','SystemEngineer')")
  db.executeSql("DELETE FROM #{tableName} WHERE ID=?",[1])

  value = db.executeSql("SELECT * FROM #{tableName} Where Id=1")

  puts value.to_s
  if value.any?
    data = value[0]['EMPLOYEE']
  else
    data = 'RECORD DOESNT EXISTS'
  end

  data

end

end
