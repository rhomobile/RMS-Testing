require 'rho/rhocontroller'
require 'helpers/browser_helper'

class VideocaptureTestController < Rho::RhoController
  include BrowserHelper

  # GET /VideocaptureTest
  def index
    @videocapturetests = VideocaptureTest.find(:all)
    render :back => '/app'
  end

  # GET /VideocaptureTest/{1}
  def show
    @videocapturetest = VideocaptureTest.find(@params['id'])
    if @videocapturetest
      render :action => :show, :back => url_for(:action => :index)
    else
      redirect :action => :index
    end
  end

  # GET /VideocaptureTest/new
  def new
    @videocapturetest = VideocaptureTest.new
    render :action => :new, :back => url_for(:action => :index)
  end

  # GET /VideocaptureTest/{1}/edit
  def edit
    @videocapturetest = VideocaptureTest.find(@params['id'])
    if @videocapturetest
      render :action => :edit, :back => url_for(:action => :index)
    else
      redirect :action => :index
    end
  end

  # POST /VideocaptureTest/create
  def create
    @videocapturetest = VideocaptureTest.create(@params['videocapturetest'])
    redirect :action => :index
  end

  # POST /VideocaptureTest/{1}/update
  def update
    @videocapturetest = VideocaptureTest.find(@params['id'])
    @videocapturetest.update_attributes(@params['videocapturetest']) if @videocapturetest
    redirect :action => :index
  end

  # POST /VideocaptureTest/{1}/delete
  def delete
    @videocapturetest = VideocaptureTest.find(@params['id'])
    @videocapturetest.destroy if @videocapturetest
    redirect :action => :index  
  end
  
  def FunMinimize
        #Alert.show_popup('Scanner1')
        Application.minimize
        redirect :action =>  :index
     end
     
     # GET /VideoCapture
   
    
   def DoStart
     #Alert.show_popup("Success") 
     puts "calling start method"
     VideoCapture.start
     WebView.execute_js('setFieldValue("start method called")') 
   end
        
   def DoStop
     #Alert.show_popup("Success")
     puts "calling stop method"
     VideoCapture.stop
     WebView.execute_js('setFieldValue("stop method called")') 
   end
        
   def DoCancel
     #Alert.show_popup("Success")
     puts "calling cancel method"
     VideoCapture.cancel
     WebView.execute_js('setFieldValue("cancel method called")') 
   end
        
   def setSigLocalName
     #Alert.show_popup("Success")
     localSigName = @params['textLocalName']
     VideoCapture.name=localSigName  
     myMessage="Local name is set to #{localSigName}"
     WebView.execute_js('setFieldValue("'+myMessage+'")')  
   end
   
   def setDuration
     #Alert.show_popup("Success")
     intervalVal = @params['intervalTimer']
     VideoCapture.duration  = intervalVal
     myMessage="Duration is set to #{intervalVal}"
     WebView.execute_js('setFieldValue("'+myMessage+'")') 
   end
   
   def setCodecType
     codecVal = @params['CodecValue']
     #VideoCapture.codec  = codecVal
     myMessage="Codec is set to #{codecVal}"
     WebView.execute_js('setFieldValue("'+myMessage+'")') 
     
   end
   
     def ApplyVideoCaptureEvent
        uName = @params['txtUserName']  
        VideoCapture.username = uName
        uPass = @params['txtPassword'] 
        VideoCapture.password = uPass
        
         destination =@params['txtDestination'] 
         dest = "url('"+destination+"')"
         VideoCapture.destination=dest
        
          type = @params['mygroup']
      
          if type=="javascript"
          VideoCapture.videoSaveEvent=url_for(:action => :video_event_cb)
          elsif type=="HTML"
      #     Imager.setEMML("imagerevent:url('http://192.168.6.18/Navigate.html?Resposnse=%s');")
          elsif type=="JSON"
      #     Imager.imagerEvent="myjsonevent(%json)"
          elsif(type=="DETACH")
           VideoCapture.videoSaveEvent=''
          elsif(type=="URLEmpty")
      #    Imager.imagerEvent=""
          end
       #VideoCapture.start    
       myMessage="Event is attached and type is  #{type}"
       WebView.execute_js('setFieldValue("'+myMessage+'")') 
       #redirect :action => :index   
   end 
        
   
   def video_event_cb
     puts "inside videoevent"
      resultHash = @params
      puts "resultHash value : #{resultHash}"
     videoeventinfo = "videoe event info:"
       if resultHash
         videoeventinfo += "result status is: " + resultHash['transferResult'] 
       end
      puts "videoe event : #{videoeventinfo}"
      WebView.execute_js('setFieldValue("'+videoeventinfo+'")') 
   end

end
