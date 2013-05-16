require 'rho/rhocontroller'
require 'helpers/browser_helper'

class CardReaderModuleController < Rho::RhoController
  include BrowserHelper
  
  # GET /CardReaderModule
  def index
    render :back => '/app'
  end

  def funminimize
    Rho::Application.minimize
    redirect :action =>  :index
  end 
  
  def setmodulename
    Rho::CardReader.moduleName = 'msr9500'
    redirect :action => :index
  end
  
  def setpandata
    Rho::CardReader.panData = 12345625
    redirect :action =>  :index
  end
  
  def setEnter
    Rho::CardReader.autoEnter = true
    redirect :action =>  :index
  end
  
  def setTab
    Rho::CardReader.autoTab = true
    redirect :action =>  :index
  end
  
  def setPinentry
    Rho::CardReader.pinEntry = true
    redirect :action =>  :index
  end
  
  def setPintimeout
    Rho::CardReader.pinTimeout = 7000
    redirect :action =>  :index
  end
  
  def closemsr
    Rho::CardReader.close
    redirect :action => :index
  end
  
  def openwithEnter
    Rho::CardReader.autoEnter = true
    Rho::CardReader.autoTab = false
    Rho::CardReader.open
    redirect :action =>  :index
  end
  
  def openwithTab
    Rho::CardReader.autoEnter = false
    Rho::CardReader.autoTab = true
    Rho::CardReader.open
    redirect :action =>  :index
  end
  
  def openwithoutEvent
    Rho::CardReader.autoEnter = false
    Rho::CardReader.autoTab = false
    Rho::CardReader.open
    redirect :action =>  :index
  end
    
  def enum     
    myvar = Array.new
    myvar = Rho::CardReader.enumerate
    Alert.show_popup "#{myvar}"
    puts "available card readers: #{myvar}"
    redirect :action =>  :index
  end
  
  def setproppandata
    Rho::CardReader.setProperty('panData',123456789)
    redirect :action =>  :index
  end
  
  def setdefaultprop
    myvar = Array.new
    myvar = Rho::CardReader.enumerate
    Rho::CardReader.setDefault(myvar)
    redirect :action =>  :index
  end
  
  def openwithEvent
    Rho::CardReader.open(url_for(:action => :myswipeevent))
    redirect :action =>  :index
  end 
  
  def myswipeevent   
   Alert.show_popup "#{@params}"   
   puts "Swipe params: #{@params}"
   puts "Mode is #{@params['mode']}"
   puts "Data is #{@params['data']}" 
   redirect :action =>  :index
  end 
  
  def openwithEnchead
    Rho::CardReader.open(url_for(:action => :myreadevent))
    redirect :action =>  :index
  end 
  
  def myreadevent   
    Alert.show_popup "Hello"
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
    #Alert.show_popup("Encryption= "+myencryption+"Mode= "+mymode+"Data= "+mycarddata+"RawData= "+myrawData+"Track1= "+mytrack1+"Track2= "+mytrack2+"Track3= "+mytrack3+"Track1Status= "+mytrack1Status+"Track2Status= "+mytrack2Status+"Track3Status= "+mytrack3Status+"Track1Encrypted ="+mytrack1Encrypted+"Track2Encrypted ="+mytrack2Encrypted+"Track3Encrypted ="+mytrack3Encrypted+"Track1EncryptedStatus ="+mytrack1EncryptedStatus+"Track2EncryptedStatus ="+mytrack2EncryptedStatus+"Track3EncryptedStatus ="+mytrack3EncryptedStatus+"Ksn ="+myksn)  
    Rho::WebView.execute_js('setFieldValue("'+myencryption+'","'+mymode+'","'+mycarddata+'","'+myrawData+'","'+mytrack1+'","'+mytrack2+'","'+mytrack3+'","'+mytrack1Status+'","'+mytrack2Status+'","'+mytrack3Status+'","'+mytrack1Encrypted+'","'+mytrack2Encrypted+'","'+mytrack3Encrypted+'","'+mytrack1EncryptedStatus+'","'+mytrack2EncryptedStatus+'","'+mytrack3EncryptedStatus+'","'+myksn+'")') 
    redirect :action =>  :index
  end 
   
 def setpropmodulename
    Rho::CardReader.setProperty('moduleName','msr9500')
    redirect :action => :index
  end
  
  def setpropEnter
   Rho::CardReader.setProperty('autoEnter','true')
   redirect :action =>  :index
  end
  
  def setpropTab
   Rho::CardReader.setProperty('autoTab','true')
   redirect :action =>  :index
  end
  
  def setpropPinentry
   Rho::CardReader.setProperty('pinEntry','true')
   redirect :action =>  :index
  end
  
  def setpropPintimeout
   Rho::CardReader.setProperty('pinTimeout',20000)
   redirect :action =>  :index
  end
  
  def setcardProperties
   myProps = {'autoEnter'=>true, 'autoTab'=>true, 'moduleName'=>'msr9500', 'panData'=>12345625, 'pinEntry'=>true, 'pinTimeout'=>15000}
   Rho::CardReader.setProperties(myProps)
   redirect :action =>  :index
  end

  def getpropTab
    myvar = Rho::CardReader.getProperty('autoTab')
    puts "autotab : #{myvar}"
    Alert.show_popup "#{myvar}"
    redirect :action =>  :index
  end
  
  def getpropEnter
    myvar = Rho::CardReader.getProperty('autoEnter')
    puts "autoenter : #{myvar}"
    Alert.show_popup "#{myvar}"
    redirect :action =>  :index
  end
  
  def getpropPinentry
    myvar = Rho::CardReader.getProperty('pinEntry')
    puts "Pinentry: #{myvar}"
    Alert.show_popup "#{myvar}"
    redirect :action =>  :index
  end
  
  def getpropPintimeout
    myvar = Rho::CardReader.getProperty('pinTimeout')
    puts "pintimeout: #{myvar}"  
    Alert.show_popup "#{myvar}"  
    redirect :action =>  :index
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
   redirect :action =>  :index
  end
  
  def getAllcardProperties
    myValue = Hash.new
    myValue = Rho::CardReader.getAllProperties
    puts "getAllcardProperties : #{myValue}"
    Alert.show_popup "#{myValue}"
    redirect :action =>  :index
  end
  
  def getdefaultprop
    myValue = Array.new
    myValue = Rho::CardReader.getDefault
    puts "getdefaultprop : #{myValue}"
    Alert.show_popup "#{myValue}"
    redirect :action =>  :index
  end
  
  def allPropsclear
    Rho::CardReader.clearAllProperties
    redirect :action =>  :index
  end  

end
