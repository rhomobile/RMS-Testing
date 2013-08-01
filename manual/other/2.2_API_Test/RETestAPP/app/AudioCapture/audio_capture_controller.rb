require 'rho/rhocontroller'
require 'helpers/browser_helper'

class AudioCaptureController < Rho::RhoController
  include BrowserHelper

  def FunMinimize
     #Alert.show_popup('Scanner1')
     Application.minimize
     redirect :action =>  :index
  end
  
  # GET /AudioCapture

 
def DoStart
  #Alert.show_popup("Success") 
  puts "calling start method"
  AudioCapture.start
  WebView.execute_js('setFieldValue("start method called")') 
end
     
def DoStop
  #Alert.show_popup("Success")
  puts "calling stop method"
  AudioCapture.stop
  WebView.execute_js('setFieldValue("stop method called")') 
end
     
def DoCancel
  #Alert.show_popup("Success")
  puts "calling cancel method"
  AudioCapture.cancel
  WebView.execute_js('setFieldValue("cancel method called")') 
end
     
def setSigLocalName
  #Alert.show_popup("Success")
  localSigName = @params['textLocalName']
  AudioCapture.name=localSigName  
  myMessage="Local name is set to #{localSigName}"
  WebView.execute_js('setFieldValue("'+myMessage+'")')  
end

def setDuration
  #Alert.show_popup("Success")
  intervalVal = @params['intervalTimer']
  AudioCapture.duration  = intervalVal
  myMessage="Duration is set to #{intervalVal}"
  WebView.execute_js('setFieldValue("'+myMessage+'")') 
end

def setCodecType
  codecVal = @params['CodecValue']
  AudioCapture.codec  = codecVal
  myMessage="Codec is set to #{codecVal}"
  WebView.execute_js('setFieldValue("'+myMessage+'")') 
  
end

  def ApplyAudioCaptureEvent
     uName = @params['txtUserName']  
     AudioCapture.username = uName
     uPass = @params['txtPassword'] 
     AudioCapture.password = uPass
     
      destination =@params['txtDestination'] 
      dest = "url('"+destination+"')"
      AudioCapture.destination=dest
     
       type = @params['mygroup']
   
       if type=="javascript"
       AudioCapture.audioSaveEvent=url_for(:action => :audio_event_cb)
       elsif type=="HTML"
   #     Imager.setEMML("imagerevent:url('http://192.168.6.18/Navigate.html?Resposnse=%s');")
       elsif type=="JSON"
   #     Imager.imagerEvent="myjsonevent(%json)"
       elsif(type=="DETACH")
        AudioCapture.audioSaveEvent=''
       elsif(type=="URLEmpty")
   #    Imager.imagerEvent=""
       end
    #AudioCapture.start    
    myMessage="Event is attached and type is  #{type}"
    WebView.execute_js('setFieldValue("'+myMessage+'")') 
    #redirect :action => :index   
end 
     

def audio_event_cb
  puts "inside audioevent"
   resultHash = @params
   puts "resultHash value : #{resultHash}"
   audioeventinfo = "audio event info:"
    if resultHash
      audioeventinfo += "result status is: " + resultHash['transferResult'] 
    end
   puts "audio event : #{audioeventinfo}"
   WebView.execute_js('setFieldValue("'+audioeventinfo+'")') 
end
      


end
