require 'rho/rhocontroller'
require 'helpers/browser_helper'

class RSMController < Rho::RhoController
  include BrowserHelper

  def FunMinimize
     #Alert.show_popup('Scanner1')
     Application.minimize
     redirect :action =>  :index
   end 
  
  def enumeratescanner
    Scanner.enumerate
    redirect :action => :index
  end
   
  
  def registerenumevent
    puts "attaching scan enum event"  
    myeventvalue = @params['selectevent']
      
         if myeventvalue == "JavaScript"
           Scanner.enumScannerEvent = url_for(:action => :myscanenumevent)
         elsif myeventvalue == "DETACHEVENT"
           Scanner.enumScannerEvent = ''
         elsif myeventvalue == "EMPTYEVENT"
           Scanner.enumScannerEvent = ''
         end
#     Alert.show_popup("Inside Register EnumEvent")
    redirect :action => :index
  end
  
  def myscanenumevent
#     Alert.show_popup("In myscanenumevent")
#     buf="please check select scanner list"
#     WebView.execute_js('setFieldValue("'+buf+'")') 
    $scanners = @params['scannerArray']
    puts "$scanners : #{$scanners}"

    WebView.refresh
    #     redirect :action => :index
        #Alert.show_popup(scannerData)
        #String buf = ""
        #buf += 'Scanners:' + "\n"
        #scannerData["scannerArray"].each {|scanner| buf += '' + scanner["deviceName"] + " : " + scanner["friendlyName"] + "\n"}
        #Alert.show_popup buf
    
  end
  
  def registerdecodeevent
    myeventvalue = @params['selectdecodeevent']
    puts "attaching decodeevent"  
         if myeventvalue == "JavaScript"
           Scanner.decodeEvent = url_for(:action => :mydecodeevent)
         elsif myeventvalue == "DETACHEVENT"
           Scanner.decodeEvent = ''
         elsif myeventvalue == "EMPTYEVENT"
           Scanner.decodeEvent =''
         end
#     Alert.show_popup("attaching decodeevent")
    redirect :action => :index
  end
  
  
  def mydecodeevent
  #     Alert.show_popup("In mydecodeevent")
       puts "In mydecodeevent"  
       scannerData = @params
       mydata = scannerData["data"]
       mysource = scannerData["source"]  
       mytype = scannerData["type"]
       mytime = scannerData["time"]
       mylength = scannerData["length"]
       myevent = scannerData["event"]
         
       scandata="Data:- "+mydata+"  Source:- "+mysource+"  Type:- "+mytype+"  Time:- "+mytime+"  Length:- "+mylength+"  Event:- "+myevent  
  #     Alert.show_popup("Data:- "+mydata+"  Source:- "+mysource+"  Type:- "+mytype+"  Time:- "+mytime+"  Length:- "+mylength+"  Event:- "+myevent)
      
       WebView.execute_js('setFieldValue("'+scandata+'")') 
     end
   
  
  def enablescanner
    Scanner.enable
#     Alert.show_popup("Inside enable")
    redirect :action => :index
  end
  
  def enablescanner2
    Scanner.enabled = 'SCN2'
#     Alert.show_popup("Inside enable")
    redirect :action => :index
  end
  
  def enablescanner3
    Scanner.enabled = 'SCN3'
#     Alert.show_popup("Inside enable")
    redirect :action => :index
  end
  
    
  def disablescanner
    Scanner.disable
#     Alert.show_popup("Inside disable")
    redirect :action => :index
  end
  
  def stopscanner
    Scanner.stop
#     Alert.show_popup("Inside stop")
    redirect :action => :index
  end
  
  
  def startscanner
    Scanner.start
#     Alert.show_popup("Inside start")
    redirect :action => :index
  end
  
  def Unpair
    Rsm.bluetoothUnpair
#     Alert.show_popup("Inside start")
    redirect :action => :index
  end
  
  def Disconnect
    Rsm.bluetoothDisconnect
#     Alert.show_popup("Inside start")
    redirect :action => :index
  end
  
  def enableselectedscanner
    myselctedscannervalue = @params['selectscanner']
    Scanner.enabled=myselctedscannervalue
#     Alert.show_popup(myselctedscannervalue)
    redirect :action => :index
  end
  
  def registerrsmevent
    Rsm.markForRetrievalModelNumber
    Rsm.markForRetrievalSerialNumber
    Rsm.markForRetrievalDateOfManufacture
    Rsm.markForRetrievalDateOfService   
    Rsm.markForRetrievalBluetoothAddress
    Rsm.markForRetrievalFirmwareVersion
    Rsm.markForRetrievalDeviceClass
    Rsm.markForRetrievalBatteryStatus
    Rsm.markForRetrievalBatteryCapacity
    Rsm.markForRetrievalBatteryId
    Rsm.markForRetrievalBluetoothAuthentication  
    Rsm.markForRetrievalBluetoothEncryption
    Rsm.markForRetrievalBluetoothPinCode
    Rsm.markForRetrievalBluetoothPinCodeType
    Rsm.markForRetrievalBluetoothReconnectAttempts
    Rsm.markForRetrievalBluetoothBeepOnReconnectAttempt
    Rsm.markForRetrievalBluetoothHidAutoReconnect
    Rsm.markForRetrievalBluetoothFriendlyName
    Rsm.markForRetrievalBluetoothInquiryMode
    Rsm.markForRetrievalBluetoothAutoReconnect
    Rsm.markForRetrievalForceSavePairingBarcode
    Rsm.markForRetrievalLowBatteryIndication
    Rsm.markForRetrievalLowBatteryIndicationCycle
    Rsm.markForRetrievalScanLineWidth
    Rsm.markForRetrievalGoodScansDelay
    Rsm.markForRetrievalDecodeFeedback
    Rsm.markForRetrievalIgnoreCode128Usps
    Rsm.markForRetrievalScanTriggerWakeup
    Rsm.markForRetrievalMems
    Rsm.markForRetrievalProximityEnable
    Rsm.markForRetrievalProximityContinuous
    Rsm.markForRetrievalProximityDistance
    Rsm.markForRetrievalPagingEnable
    Rsm.markForRetrievalPagingBeepSequence
    
    Alert.show_popup("registerevent")
    
    Rsm.rsmGetEvent = url_for(:action => :myrsmevent)
  end
  
  def myrsmevent
    Alert.show_popup("RSM Even fired")
    puts "param is #{@params}"
    puts "Attribute is #{@attributeArray}"
    Alert.show_popup("Array of valuesPP #{@params}")
    #arrayofvalues = @attributeArray
    Alert.show_popup("Array of values #{@attributeArray}")
    
    #Alert.show_popup("Array of values"+ arrayofvalues)   
  end
  
  def registerrsmevent1    
      
    Alert.show_popup("hi")
      
    chkmarkForRetrievalModelNumber = @params['chkmarkForRetrievalModelNumber']
    chkmarkForRetrievalSerialNumber= @params['chkmarkForRetrievalSerialNumber']
    chkmarkForRetrievalDateOfManufacture= @params['chkmarkForRetrievalDateOfManufacture']
    chkmarkForRetrievalDateOfService= @params['chkmarkForRetrievalDateOfService']
    chkmarkForRetrievalBluetoothAddress= @params['chkmarkForRetrievalBluetoothAddress']
    chkmarkForRetrievalFirmwareVersion= @params['chkmarkForRetrievalFirmwareVersion']
    chkmarkForRetrievalDeviceClass= @params['chkmarkForRetrievalDeviceClass']
    chkmarkForRetrievalBatteryStatus= @params['chkmarkForRetrievalBatteryStatus']
    chkmarkForRetrievalBatteryCapacity= @params['chkmarkForRetrievalBatteryCapacity']
    chkmarkForRetrievalBatteryId= @params['chkmarkForRetrievalBatteryId']
    chkmarkForRetrievalBluetoothAuthentication= @params['chkmarkForRetrievalBluetoothAuthentication']
    chkmarkForRetrievalBluetoothEncryption= @params['chkmarkForRetrievalBluetoothEncryption']
    chkmarkForRetrievalBluetoothPinCode= @params['chkmarkForRetrievalBluetoothPinCode']
    chkmarkForRetrievalBluetoothPinCodeType= @params['chkmarkForRetrievalBluetoothPinCodeType']
    chkmarkForRetrievalBluetoothReconnectAttempts= @params['chkmarkForRetrievalBluetoothReconnectAttempts']
    chkmarkForRetrievalBluetoothBeepOnReconnectAttempt= @params['chkmarkForRetrievalBluetoothBeepOnReconnectAttempt']
    chkmarkForRetrievalBluetoothHidAutoReconnect= @params['chkmarkForRetrievalBluetoothHidAutoReconnect']
    chkmarkForRetrievalBluetoothFriendlyName= @params['chkmarkForRetrievalBluetoothFriendlyName']
    chkmarkForRetrievalBluetoothInquiryMode= @params['chkmarkForRetrievalBluetoothInquiryMode']
    chkmarkForRetrievalBluetoothAutoReconnect= @params['chkmarkForRetrievalBluetoothAutoReconnect']
    chkmarkForRetrievalForceSavePairingBarcode= @params['chkmarkForRetrievalForceSavePairingBarcode']
    chkmarkForRetrievalLowBatteryIndication= @params['chkmarkForRetrievalLowBatteryIndication']
    chkmarkForRetrievalLowBatteryIndicationCycle= @params['chkmarkForRetrievalLowBatteryIndicationCycle']
    chkmarkForRetrievalScanLineWidth= @params['chkmarkForRetrievalScanLineWidth']
    chkmarkForRetrievalGoodScansDelay= @params['chkmarkForRetrievalGoodScansDelay']
    chkmarkForRetrievalDecodeFeedback= @params['chkmarkForRetrievalDecodeFeedback']
    chkmarkForRetrievalIgnoreCode128Usps= @params['chkmarkForRetrievalIgnoreCode128Usps']
    chkmarkForRetrievalScanTriggerWakeup= @params['chkmarkForRetrievalScanTriggerWakeup']
    chkmarkForRetrievalMems= @params['chkmarkForRetrievalMems']
    chkmarkForRetrievalProximityEnable= @params['chkmarkForRetrievalProximityEnable']
    chkmarkForRetrievalProximityContinuous= @params['chkmarkForRetrievalProximityContinuous']
    chkmarkForRetrievalProximityDistance= @params['chkmarkForRetrievalProximityDistance']
    chkmarkForRetrievalPagingEnable= @params['chkmarkForRetrievalPagingEnable']
    chkmarkForRetrievalPagingBeepSequence= @params['chkmarkForRetrievalPagingBeepSequence']
    
    Alert.show_popup("helo")  
    
    Rsm.markForRetrievalModelNumber =chkmarkForRetrievalModelNumber unless chkmarkForRetrievalModelNumber == false  
    Rsm.markForRetrievalSerialNumber=chkmarkForRetrievalSerialNumber unless chkmarkForRetrievalSerialNumber == false 
    Rsm.markForRetrievalDateOfManufacture=chkmarkForRetrievalDateOfManufacture unless chkmarkForRetrievalDateOfManufacture == false 
    Rsm.markForRetrievalDateOfService=chkmarkForRetrievalDateOfService unless chkmarkForRetrievalDateOfService == false 
    Rsm.markForRetrievalBluetoothAddress=chkmarkForRetrievalBluetoothAddress unless chkmarkForRetrievalBluetoothAddress == false 
    Rsm.markForRetrievalFirmwareVersion=chkmarkForRetrievalFirmwareVersion unless chkmarkForRetrievalFirmwareVersion == false 
    Rsm.markForRetrievalDeviceClass=chkmarkForRetrievalDeviceClass unless chkmarkForRetrievalDeviceClass == false 
    Rsm.markForRetrievalBatteryStatus=chkmarkForRetrievalBatteryStatus unless chkmarkForRetrievalBatteryStatus == false 
    Rsm.markForRetrievalBatteryCapacity=chkmarkForRetrievalBatteryCapacity unless chkmarkForRetrievalBatteryCapacity == false 
    Rsm.markForRetrievalBatteryId=chkmarkForRetrievalBatteryId unless chkmarkForRetrievalBatteryId == false 
    Rsm.markForRetrievalBluetoothAuthentication=chkmarkForRetrievalBluetoothAuthentication unless chkmarkForRetrievalBluetoothAuthentication == false 
    Rsm.markForRetrievalBluetoothEncryption=chkmarkForRetrievalBluetoothEncryption unless chkmarkForRetrievalBluetoothEncryption == false 
    Rsm.markForRetrievalBluetoothPinCode=chkmarkForRetrievalBluetoothPinCode unless chkmarkForRetrievalBluetoothPinCode == false 
    Rsm.markForRetrievalBluetoothPinCodeType=chkmarkForRetrievalBluetoothPinCodeType unless chkmarkForRetrievalBluetoothPinCodeType == false 
    Rsm.markForRetrievalBluetoothReconnectAttempts=chkmarkForRetrievalBluetoothReconnectAttempts unless chkmarkForRetrievalBluetoothReconnectAttempts == false 
    Rsm.markForRetrievalBluetoothBeepOnReconnectAttempt=chkmarkForRetrievalBluetoothBeepOnReconnectAttempt unless chkmarkForRetrievalBluetoothBeepOnReconnectAttempt == false 
    Rsm.markForRetrievalBluetoothHidAutoReconnect=chkmarkForRetrievalBluetoothHidAutoReconnect unless chkmarkForRetrievalBluetoothHidAutoReconnect == false 
    Rsm.markForRetrievalBluetoothFriendlyName=chkmarkForRetrievalBluetoothFriendlyName unless chkmarkForRetrievalBluetoothFriendlyName == false 
    Rsm.markForRetrievalBluetoothInquiryMode=chkmarkForRetrievalBluetoothInquiryMode unless chkmarkForRetrievalBluetoothInquiryMode == false 
    Rsm.markForRetrievalBluetoothAutoReconnect=chkmarkForRetrievalBluetoothAutoReconnect unless chkmarkForRetrievalBluetoothAutoReconnect == false 
    Rsm.markForRetrievalForceSavePairingBarcode=chkmarkForRetrievalForceSavePairingBarcode unless chkmarkForRetrievalForceSavePairingBarcode == false 
    Rsm.markForRetrievalLowBatteryIndication=chkmarkForRetrievalLowBatteryIndication unless chkmarkForRetrievalLowBatteryIndication == false 
    Rsm.markForRetrievalLowBatteryIndicationCycle=chkmarkForRetrievalLowBatteryIndicationCycle unless chkmarkForRetrievalLowBatteryIndicationCycle == false 
    Rsm.markForRetrievalScanLineWidth=chkmarkForRetrievalScanLineWidth unless chkmarkForRetrievalScanLineWidth == false 
    Rsm.markForRetrievalGoodScansDelay=chkmarkForRetrievalGoodScansDelay unless chkmarkForRetrievalGoodScansDelay == false 
    Rsm.markForRetrievalDecodeFeedback=chkmarkForRetrievalDecodeFeedback unless chkmarkForRetrievalDecodeFeedback == false 
    Rsm.markForRetrievalIgnoreCode128Usps=chkmarkForRetrievalIgnoreCode128Usps unless chkmarkForRetrievalIgnoreCode128Usps == false 
    Rsm.markForRetrievalScanTriggerWakeup=chkmarkForRetrievalScanTriggerWakeup unless chkmarkForRetrievalScanTriggerWakeup == false 
    Rsm.markForRetrievalMems=chkmarkForRetrievalMems unless chkmarkForRetrievalMems == false 
    Rsm.markForRetrievalProximityEnable=chkmarkForRetrievalProximityEnable unless chkmarkForRetrievalProximityEnable == false 
    Rsm.markForRetrievalProximityContinuous=chkmarkForRetrievalProximityContinuous unless chkmarkForRetrievalProximityContinuous == false 
    Rsm.markForRetrievalProximityDistance=chkmarkForRetrievalProximityDistance unless chkmarkForRetrievalProximityDistance == false 
    Rsm.markForRetrievalPagingEnable=chkmarkForRetrievalPagingEnable unless chkmarkForRetrievalPagingEnable == false 
    Rsm.markForRetrievalPagingBeepSequence=chkmarkForRetrievalPagingBeepSequence unless chkmarkForRetrievalPagingBeepSequence == false 
    Alert.show_popup("heloall") 
    Rsm.rsmGetEvent = url_for(:action => :myrsmevent)
    
      
    Alert.show_popup("chkmarkForRetrievalModelNumber Value= "+chkmarkForRetrievalModelNumber+"chkmarkForRetrievalPagingBeepSequence"+chkmarkForRetrievalPagingBeepSequence)
  end
  

  
  
  # GET /RSM
  def index
    @rsms = RSM.find(:all)
    render :back => '/app'
  end

  # GET /RSM/{1}
  def show
    @rsm = RSM.find(@params['id'])
    if @rsm
      render :action => :show, :back => url_for(:action => :index)
    else
      redirect :action => :index
    end
  end

  # GET /RSM/new
  def new
    @rsm = RSM.new
    render :action => :new, :back => url_for(:action => :index)
  end

  # GET /RSM/{1}/edit
  def edit
    @rsm = RSM.find(@params['id'])
    if @rsm
      render :action => :edit, :back => url_for(:action => :index)
    else
      redirect :action => :index
    end
  end

  # POST /RSM/create
  def create
    @rsm = RSM.create(@params['rsm'])
    redirect :action => :index
  end

  # POST /RSM/{1}/update
  def update
    @rsm = RSM.find(@params['id'])
    @rsm.update_attributes(@params['rsm']) if @rsm
    redirect :action => :index
  end

  # POST /RSM/{1}/delete
  def delete
    @rsm = RSM.find(@params['id'])
    @rsm.destroy if @rsm
    redirect :action => :index  
  end
end
