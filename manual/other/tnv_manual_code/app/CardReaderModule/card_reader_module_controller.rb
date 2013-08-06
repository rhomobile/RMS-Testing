require 'rho/rhocontroller'
require 'helpers/browser_helper'

class CardReaderModuleController < Rho::RhoController
  include BrowserHelper
  @layout = 'CardReaderModule/layout'
  
  # GET /CardReaderModule
  def index
    render :back => '/app'
  end

  def funminimize
    Rho::Application.minimize
  end 
  #set properties directly
  def setmoduledcr7000
    Rho::CardReader.moduleName = 'dcr7000'
  end
  
  def setmodulemsr9000
    Rho::CardReader.moduleName = 'msr9000'
  end
  
  def setmodulemsr9001
    Rho::CardReader.moduleName = 'msr9001'
  end 
  
  def setmodulemsr9500
    Rho::CardReader.moduleName = 'msr9500'
  end 
  
  def setmodulemsr7000
    Rho::CardReader.moduleName = 'msr7000'
  end
  
  def setmodulemsr55
    Rho::CardReader.moduleName = 'msr55'
  end
  
  def setmodulemsr3000
    Rho::CardReader.moduleName = 'msr3000'
  end
  
  def setmodulemsrcameo
    Rho::CardReader.moduleName = 'msrcameo'
  end
  
  def setmoduleinvalid
    Rho::CardReader.moduleName = 'testmsr'
  end
  
  def setmoduleEmpty
    Rho::CardReader.moduleName = ''
  end
  
  def setpandata
    Rho::CardReader.panData = 1234567891012131
  end
  
  def setpaninvalid
    Rho::CardReader.panData = 12
  end
  
  def setpaninvalid1
    Rho::CardReader.panData = -1234567891012131
  end
  
  def setpanempty
    Rho::CardReader.panData = ''
  end
  
  def setEntertrue
    Rho::CardReader.autoEnter = true
  end
  
  def setEnterfalse
    Rho::CardReader.autoEnter = false
  end
  
  def setEnterinvalid
    Rho::CardReader.autoEnter = entertesting
  end
  
  def setEnterempty
    Rho::CardReader.autoEnter = '' 
  end
  
  def setTabtrue
    Rho::CardReader.autoTab = true
  end
  
  def setTabfalse
    Rho::CardReader.autoTab = false
  end
  
  def setTabinvalid
    Rho::CardReader.autoTab = tabtesting
  end
  
  def setTabempty
    Rho::CardReader.autoTab = ''
  end
  
  def setpinentrytrue
    Rho::CardReader.pinEntry = true
  end
  
  def setpinentryfasle
    Rho::CardReader.pinEntry = false
  end
  
  def setpininvalid
    Rho::CardReader.pinEntry = pinentrytest
  end
  
  def setpinempty
    Rho::CardReader.pinEntry = ''
  end
  
  def setPintimeout
    Rho::CardReader.pinTimeout = 7000
  end
  
  def setPintimeoutzero
    Rho::CardReader.pinTimeout = 0
  end
  
  def setPintimeoutinvalid
    Rho::CardReader.pinTimeout = -1000
  end
  
  def setPintimeoutempty
    Rho::CardReader.pinTimeout = ''
 end
 
 #set property using setProperty
  def setpropmoduledcr7000
      Rho::CardReader.setProperty('moduleName','dcr7000')
  end
    
    def setpropmodulemsr9000
      Rho::CardReader.setProperty('moduleName','msr9000')
    end
    
    def setpropmodulemsr9001
      Rho::CardReader.setProperty('moduleName','msr9001')
    end 
    
    def setpropmodulemsr9500
      Rho::CardReader.setProperty('moduleName','msr9500')
    end 
    
    def setpropmodulemsr7000
      Rho::CardReader.setProperty('moduleName','msr7000')
    end
    
    def setpropmodulemsr55
      Rho::CardReader.setProperty('moduleName','msr55')
    end
    
    def setpropmodulemsr3000
      Rho::CardReader.setProperty('moduleName','msr3000')
    end
    
    def setpropmodulemsrcameo
      Rho::CardReader.setProperty('moduleName','msrcameo')
    end
    
    def setpropmoduleinvalid
      Rho::CardReader.setProperty('moduleName','testmsr')
    end
    
    def setpropmoduleEmpty
      Rho::CardReader.setProperty('moduleName','')
    end
    
    def setproppandata
      Rho::CardReader.setProperty('panData','1234567891012131')
    end
    
    def setproppaninvalid
      Rho::CardReader.setProperty('panData','12')
    end
    
    def setproppaninvalid1
      Rho::CardReader.setProperty('panData','-1234567891012131')
    end
    
    def setproppanempty
      Rho::CardReader.setProperty('panData','')
    end
    
    def setpropEntertrue
      Rho::CardReader.setProperty('autoEnter','true')
    end
    
    def setpropEnterfalse
      Rho::CardReader.setProperty('autoEnter','false')
    end
    
    def setpropEnterinvalid
      Rho::CardReader.setProperty('autoEnter','testenter')
    end
    
    def setpropEnterempty
      Rho::CardReader.setProperty('autoEnter','')
    end
    
    def setpropTabtrue
      Rho::CardReader.setProperty('autoTab','true')
    end
    
    def setpropTabfalse
      Rho::CardReader.setProperty('autoTab','false')
    end
    
    def setpropTabinvalid
      Rho::CardReader.setProperty('autoTab','tabtesting')
    end
    
    def setpropTabempty
      Rho::CardReader.setProperty('autoTab','')
    end
    
    def setproppinentrytrue
      Rho::CardReader.setProperty('pinEntry','true')
    end
    
    def setproppinentryfasle
      Rho::CardReader.setProperty('pinEntry','false')
    end
    
    def setproppininvalid
      Rho::CardReader.setProperty('pinEntry','pinentrytest')
    end
    
    def setproppinempty
      Rho::CardReader.setProperty('pinEntry','')
    end
    
    def setpropPintimeout
      Rho::CardReader.setProperty('pinTimeout',20000)
    end
    
    def setpropPintimeoutzero
      Rho::CardReader.setProperty('pinTimeout',0)
    end
    
    def setpropPintimeoutinvalid
      Rho::CardReader.setProperty('pinTimeout',-1000)
    end
    
    def setpropPintimeoutempty
      Rho::CardReader.setProperty('pinTimeout','')
   end
 #nnnnnnnnnnnnnnnn
  def closemsr
    Rho::CardReader.close
  end
  
  def openwithEnter
    Rho::CardReader.autoEnter = true
    Rho::CardReader.autoTab = false
    Rho::CardReader.open
  end
  
  def openwithTab
    Rho::CardReader.autoEnter = false
    Rho::CardReader.autoTab = true
    Rho::CardReader.open
  end
  
  def openwithoutEvent
    Rho::CardReader.open
  end
    
  def enum     
    myvar = Array.new
    myvar = Rho::CardReader.enumerate
    Alert.show_popup "#{myvar}"
    puts "available card readers: #{myvar}"
  end
  
  def setproppandata
    Rho::CardReader.setProperty('panData','1234567890123456')
  end
  
  def setdefaultprop
    myvar = Array.new
    myvar = Rho::CardReader.enumerate
    Rho::CardReader.setDefaultInstance(myvar)
  end
  
  def openwithEvent
    Rho::CardReader.open(url_for(:action => :myswipeevent))   
  end 
  
  def myswipeevent
   #Alert.show_popup "#{@params['mode']}" 
   #Alert.show_popup "#{@params['data']}"   
   puts "Swipe params: #{@params}"
   puts "Mode is #{@params['mode']}"
   puts "Data is #{@params['data']}"  
   mymode=@params['mode']
   mycarddata=@params['data'] 
   Rho::WebView.execute_js('setValue("'+mymode+'","'+mycarddata+'")')
  end 
  
  def openwithEnchead
    Rho::CardReader.open(url_for(:action => :myreadevent))   
  end 
  
  def myreadevent   
    myencryption=@params['encryption']
    mymode=@params['mode']
    mycarddata=@params['data']
    myrawData=@params['rawData']
    mytrack1=@params['track1']
    mytrack2=@params['track2']
    mytrack3=@params['track3']
    mytrack1Status=@params['track1Status']
    mytrack2Status=@params['track2Status']
    mytrack3Status=@params['track3Status']
    mytrack1Encrypted=@params['track1Encrypted']
    mytrack2Encrypted=@params['track2Encrypted']
    mytrack3Encrypted=@params['track3Encrypted']
    mytrack1EncryptedStatus=@params['track1EncryptedStatus']
    mytrack2EncryptedStatus=@params['track2EncryptedStatus']
    mytrack3EncryptedStatus=@params['track3EncryptedStatus']
    myksn=@params['ksn']
    Rho::WebView.execute_js('setFieldValue("'+myencryption+'","'+mymode+'","'+mycarddata+'","'+myrawData+'","'+mytrack1+'","'+mytrack2+'","'+mytrack3+'","'+mytrack1Status+'","'+mytrack2Status+'","'+mytrack3Status+'","'+mytrack1Encrypted+'","'+mytrack2Encrypted+'","'+mytrack3Encrypted+'","'+mytrack1EncryptedStatus+'","'+mytrack2EncryptedStatus+'","'+mytrack3EncryptedStatus+'","'+myksn+'")')
  end 

  def dcrtest
     Rho::CardReader.moduleName = 'dcr7000'
     Rho::CardReader.open(url_for(:action => :myreadevent))
     myProps = {'moduleName'=>'DCR7000', 'pinEntry'=>true, 'pinTimeout'=>15000}
     Rho::CardReader.setProperties(myProps)
     Rho::CardReader.open(url_for(:action => :myswipeevent))
  end

  def setcardProperties
   myProps = {'autoEnter'=>true, 'autoTab'=>true, 'moduleName'=>'MSR7000', 'panData'=>'1234562512345678', 'pinEntry'=>true, 'pinTimeout'=>15000}
   Rho::CardReader.setProperties(myProps)  
  end
  
  def setcardandroidProperties
   myProps = {'autoEnter'=>true, 'autoTab'=>true}
   Rho::CardReader.setProperties(myProps)  
  end

  def getpropTab
    myvar = Rho::CardReader.getProperty('autoTab')
    puts "autotab : #{myvar}"
    Alert.show_popup "#{myvar}"   
  end
  
  def getpropEnter
    myvar = Rho::CardReader.getProperty('autoEnter')
    puts "autoenter : #{myvar}"
    Alert.show_popup "#{myvar}"   
  end
  
  def getpropPinentry
    myvar = Rho::CardReader.getProperty('pinEntry')
    puts "Pinentry: #{myvar}"
    Alert.show_popup "#{myvar}"   
  end
  
  def getpropPintimeout
    myvar = Rho::CardReader.getProperty('pinTimeout')
    puts "pintimeout: #{myvar}"  
    Alert.show_popup "#{myvar}"    
  end
  
  def getpropmodulename
    myvar = Rho::CardReader.getProperty('moduleName')
    puts "getpropmodulename: #{myvar}"  
    Alert.show_popup "#{myvar}" 
    redirect :action => :index
  end
  
  def getproppandata
    myvar = Rho::CardReader.getProperty('panData')
    puts "getproppandata: #{myvar}"  
    Alert.show_popup "#{myvar}" 
    redirect :action => :index
  end
  
  def getcardProperties
   myvar = Hash.new 
   myProps = ['autoEnter','moduleName','panData','pinEntry','pinTimeout']
   myvar = Rho::CardReader.getProperties(myProps)
   puts "getallProps: #{myvar}" 
   Alert.show_popup "#{myvar}"  
  end
  
  def getAllcardProperties
    myValue = Hash.new
    myValue = Rho::CardReader.getAllProperties
    puts "getAllcardProperties : #{myValue}"
    Alert.show_popup "#{myValue}"   
  end
  
  def getdefaultprop
    myValue = Array.new
    myValue = Rho::CardReader.getDefault
    puts "getdefaultprop : #{myValue}"
    Alert.show_popup "#{myValue}"   
  end
  
  def allPropsclear
    Rho::CardReader.clearAllProperties   
  end  

end
