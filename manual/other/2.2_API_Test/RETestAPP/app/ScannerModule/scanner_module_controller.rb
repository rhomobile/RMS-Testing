require 'rho/rhocontroller'
require 'helpers/browser_helper'

class ScannerModuleController < Rho::RhoController
  include BrowserHelper


  def FunMinimize
     #Alert.show_popup('Scanner1')
     Application.minimize
     redirect :action =>  :index
   end 
  
  
  def enableSCN1
     Alert.show_popup('Scanner1')
     Scanner.enabled = 'SCN1'
     redirect :action =>  :index
   end 
   
  def enableSCN2
     Alert.show_popup('Scanner2')
     Scanner.enabled = 'SCN2'
     redirect :action =>  :index
   end
   
   def enableAll
     Alert.show_popup('enableAll')
     Scanner.allDecoders = 'enabled'
     redirect :action =>  :index
   end
   
   def disableAll
     Alert.show_popup('disableAll')
     Scanner.allDecoders = 'disabled'
     redirect :action =>  :index
   end
   
  def EnableSignature
     myEnableSignature = @params['selectEnablesignature']
     #Alert.show_popup(myEnablesignature)
     Scanner.signature = myEnableSignature
     redirect :action =>  :index
   end 
   
  def SetsignatureImageHeight
     mysignatureImageHeight = @params['txtsignatureImageHeight']
     #Alert.show_popup(mysignatureImageHeight)
     Scanner.signatureImageHeight = mysignatureImageHeight
     redirect :action =>  :index
   end
   
  def SetsignatureImageWidth
     mysignatureImageWidth = @params['txtsignatureImageWidth']
     #Alert.show_popup(mysignatureImageWidth)
     Scanner.signatureImageWidth = mysignatureImageWidth
     redirect :action =>  :index
   end
   
  def SetsignatureImageQuality
     mysignatureImageQuality = @params['txtsignatureImageQuality']
     #Alert.show_popup(mysignatureImageQuality)
     Scanner.signatureImageQuality = mysignatureImageQuality
     redirect :action =>  :index
   end
  
  def SetbarcodeDataFormat
     mybarcodeDataFormat = @params['selectbarcodeDataFormat']
     #Alert.show_popup(mybarcodeDataFormat)
     Scanner.barcodeDataFormat = mybarcodeDataFormat
     redirect :action =>  :index
   end
   
  def SetdataBufferSize
     mydataBufferSize = @params['txtdataBufferSize']
     #Alert.show_popup(mydataBufferSize)
     Scanner.dataBufferSize = mydataBufferSize
     redirect :action =>  :index
   end
  
  def SetdisplayBtAddressBarcodeOnEnable
     myBtAddressBarcodeOnEnable = @params['selectBtAddressBarcodeOnEnable']
     #Alert.show_popup(myBtAddressBarcodeOnEnable)
     Scanner.displayBtAddressBarcodeOnEnable = myBtAddressBarcodeOnEnable
     redirect :action =>  :index
   end
  
  def SetenableTimeout
     myenableTimeout = @params['txtenableTimeout']
     #Alert.show_popup(myenableTimeout)
     Scanner.enableTimeout = myenableTimeout

     redirect :action =>  :index
   end
    
  def setdisconnectbtondisable
     mydisconnectbtondisable = @params['selectdisconnectbtondisable']
     Scanner.disconnectBtOnDisable = mydisconnectbtondisable
#     Alert.show_popup(mydisconnectbtondisable)
     redirect :action =>  :index
   end
   
   def setconnectionidletimeout
     myconnectionidletimeout = @params['txtconnectionidletimeout']
     Scanner.connectionIdleTimeout = myconnectionidletimeout
#     Alert.show_popup(myconnectionidletimeout)
     redirect :action =>  :index
   end
   
  def setbeamWidth
    mybeamWidth = @params['txtbeamWidth']
    #Alert.show_popup(mybeamWidth)
    Scanner.beamWidth = mybeamWidth

    redirect :action =>  :index
  end
   
   def setbidirectionalredundancy
     mybidirectionalredundancy = @params['selectbidirectionalredundancy']
     Scanner.bidirectionalRedundancy = mybidirectionalredundancy
#     Alert.show_popup(mybidirectionalredundancy)
     redirect :action =>  :index
   end
   
   def setadaptivescanning
     myadaptivescanning = @params['selectadaptivescanning']
     Scanner.adaptiveScanning = myadaptivescanning
#     Alert.show_popup(myadaptivescanning)
     redirect :action =>  :index
   end
   
   def setklasseeins
     myklasseeins = @params['selectklasseeins']
     Scanner.klasseEins = myklasseeins
#     Alert.show_popup(myklasseeins)
     redirect :action =>  :index
   end
   
   def setdbpmode
     mydbpmode = @params['selectdbpmode']
     Scanner.dbpMode = mydbpmode
#     Alert.show_popup(mydbpmode)
     redirect :action =>  :index
   end
   
   def setnarrowbeam
     mynarrowbeam = @params['selectnarrowbeam']
     Scanner.narrowBeam = mynarrowbeam
#     Alert.show_popup(mynarrowbeam)
     redirect :action =>  :index
   end
   
   def setpoorquality1dmode
     mypoorquality1dmode = @params['selectpoorquality1dmode']
     Scanner.poorQuality1dMode = mypoorquality1dmode
#     Alert.show_popup(mypoorquality1dmode)
     redirect :action =>  :index
   end
   
   def setinverse1dmode
     myinverse1dmode = @params['selectinverse1dmode']
     Scanner.inverse1dMode = myinverse1dmode
#     Alert.show_popup(myinverse1dmode)
     redirect :action =>  :index
   end
   
   def setdpmmode
     mydpmmode = @params['selectdpmmode']
     Scanner.dpmMode = mydpmmode
#     Alert.show_popup(mydpmmode)
     redirect :action =>  :index
   end
   
   def setilluminationmode
     myilluminationmode = @params['selectilluminationmode']
     Scanner.illuminationMode = myilluminationmode
#     Alert.show_popup(myilluminationmode)
     redirect :action =>  :index
   end
   
   def setfocusmode
     myfocusmode = @params['selectfocusmode']
     Scanner.focusMode = myfocusmode
#     Alert.show_popup(myfocusmode)
     redirect :action =>  :index
   end
   
   def setviewfinderfeedbacktime
     myviewfinderfeedbacktime = @params['txtviewfinderfeedbacktime']
     Scanner.viewfinderFeedbackTime= myviewfinderfeedbacktime
#     Alert.show_popup(myviewfinderfeedbacktime)
     redirect :action => :index
   end
   
   
   
   def setviewfinderfeedback
     myviewfinderfeedback = @params['selectviewfinderfeedback']
     Scanner.viewfinderMFeedback = myviewfinderfeedback
#     Alert.show_popup(myviewfinderfeedback)
     redirect :action =>  :index
   end
   
   
   
   def setviewfinderheight
     myviewfinderheight = @params['txtviewfinderheight']
     Scanner.viewfinderHeight= myviewfinderheight
#     Alert.show_popup(myviewfinderheight)
     redirect :action => :index
   end
   
   def setviewfinderwidth
     myviewfinderwidth = @params['txtviewfinderwidth']
     Scanner.viewfinderWidth = myviewfinderwidth
#     Alert.show_popup(myviewfinderwidth)
     redirect :action => :index
   end
   
   def setviewfindery
     myviewfindery = @params['txtviewfindery']
     Scanner.viewfinderY = myviewfindery
#     Alert.show_popup(myviewfindery)
     redirect :action => :index
   end
   
   def setviewfinderx
     myviewfinderx = @params['txtviewfinderx']
     Scanner.viewfinderX = myviewfinderx
#     Alert.show_popup(myviewfinderx)
     redirect :action => :index
   end
   
   def setviewfindermode
     myviewfindermode = @params['selectviewfindermode']
     Scanner.viewfinderMode = myviewfindermode
#     Alert.show_popup(myviewfindermode)
     redirect :action =>  :index
   end
   
   def setpicklistmode
     mypicklistmode = @params['selectpicklistmode']
     Scanner.picklistMode = mypicklistmode
#     Alert.show_popup(mypicklistmode)
     redirect :action =>  :index
   end
   
   def setaimmode
     myaimmode = @params['selectaimmode']
     Scanner.aimMode = myaimmode
#     Alert.show_popup(myaimmode)
     redirect :action =>  :index
   end
   
   
   def setdifferentsymboltimeout
     mydifferentsymboltimeout = @params['txtdifferentsymboltimeout']
     Scanner.differentSymbolTimeout = mydifferentsymboltimeout
#     Alert.show_popup(mydifferentsymboltimeout)
     redirect :action => :index
   end
   
   def setsamesymboltimeout
     mysamesymboltimeout = @params['txtsamesymboltimeout']
     Scanner.sameSymbolTimeout = mysamesymboltimeout
#     Alert.show_popup(mysamesymboltimeout)
     redirect :action => :index
   end
   
   def settimedaimduration
     mytimedaimduration = @params['txttimedaimduration']
     Scanner.timedAimDuration = mytimedaimduration
#     Alert.show_popup(mytimedaimduration)
     redirect :action => :index
   end
   
   def setaimtype
     myaimtype = @params['selectaimtype']
     Scanner.aimType = myaimtype
#     Alert.show_popup(myaimtype)
     redirect :action => :index
   end
   
   
   def setrasterheight
     myrasterheight = @params['txtrasterheight']
     Scanner.rasterHeight = myrasterheight
#     Alert.show_popup(myrasterheight)
     redirect :action => :index
   end
   
   def setrastermode
     myrastermode = @params['selectrastermode']
     Scanner.rasterMode = myrastermode
#     Alert.show_popup(myrastermode)
     redirect :action => :index
   end
   
   def setscantimeout
     myscantimeout = @params['txtscantimeout']
     Scanner.scanTimeout = myscantimeout
#     Alert.show_popup(myscantimeout)
     redirect :action => :index
   end
   
   def setlinearsecuritylevel
     mylinearsecuritylevel = @params['selectlinearsecuritylevel']
     Scanner.linearSecurityLevel=mylinearsecuritylevel
#     Alert.show_popup(mylinearsecuritylevel)
     redirect :action => :index
   end
   def setautotab
     myautotabvalue = @params['selectautotab']
     Scanner.autoTab=myautotabvalue
#     Alert.show_popup(myautotabvalue)
     redirect :action => :index
   end
   
   def setautoenter
     myautoentervalue = @params['selectautoenter']
     Scanner.autoEnter=myautoentervalue
#     Alert.show_popup(myautoentervalue)
     redirect :action => :index
   end
   
   def enableselectedscanner
     myselctedscannervalue = @params['selectscanner']
     Scanner.enabled=myselctedscannervalue
#     Alert.show_popup(myselctedscannervalue)
     redirect :action => :index
   end
   
   
   def enablescanner
     Scanner.enable
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
   
   def registerbluetoothstatusevent
     myeventvalue = @params['selectevent']
       
          if myeventvalue == "JavaScript"
            Scanner.bluetoothStatusEvent = url_for(:action => :mybtstatusevent)
          elsif myeventvalue == "DETACHEVENT"
            Scanner.bluetoothStatusEvent = ''
          elsif myeventvalue == "EMPTYEVENT"
            Scanner.bluetoothStatusEvent = ''
          end
     Alert.show_popup("Inside Register BTStatusEvent")
     redirect :action => :index
   end
   
   
   def mybtstatusevent
     Alert.show_popup("In mybtstatusevent")
     mystatus = @params['status']
     WebView.execute_js('setFieldValue("'+mystatus+'")')   
     Alert.show_popup("Status :-"+mystatus)
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
       if scannerData["type"]=="0x52"
         $data_return1 = scannerData["data"]
         WebView.refresh
       else
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
     end
   
   
  
  # GET /ScannerModule
  def index
    @scannermodules = ScannerModule.find(:all)
    render :back => '/app'
  end

  # GET /ScannerModule/{1}
  def show
    @scannermodule = ScannerModule.find(@params['id'])
    if @scannermodule
      render :action => :show, :back => url_for(:action => :index)
    else
      redirect :action => :index
    end
  end

  # GET /ScannerModule/new
  def new
    @scannermodule = ScannerModule.new
    render :action => :new, :back => url_for(:action => :index)
  end

  # GET /ScannerModule/{1}/edit
  def edit
    @scannermodule = ScannerModule.find(@params['id'])
    if @scannermodule
      render :action => :edit, :back => url_for(:action => :index)
    else
      redirect :action => :index
    end
  end

  # POST /ScannerModule/create
  def create
    @scannermodule = ScannerModule.create(@params['scannermodule'])
    redirect :action => :index
  end

  # POST /ScannerModule/{1}/update
  def update
    @scannermodule = ScannerModule.find(@params['id'])
    @scannermodule.update_attributes(@params['scannermodule']) if @scannermodule
    redirect :action => :index
  end

  # POST /ScannerModule/{1}/delete
  def delete
    @scannermodule = ScannerModule.find(@params['id'])
    @scannermodule.destroy if @scannermodule
    redirect :action => :index  
  end
end
