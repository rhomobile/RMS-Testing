require 'rho/rhocontroller'
require 'helpers/browser_helper'

class KeyCaptureModuleController < Rho::RhoController
  include BrowserHelper

  def FunMinimize
     #Alert.show_popup('Scanner1')
     Application.minimize
     redirect :action =>  :index
   end  
  
  
  def registertriggerevent
      eventvalue = @params['selecttriggerevent']
      if eventvalue == "JavaScript"
        KeyCapture.triggerEvent=url_for(:action => :mytriggerevent)
      end  
      
    if eventvalue == "DETACHTRIGGEREVENT"
      KeyCapture.triggerEvent=url_for()
    end 
    
    if eventvalue == "EMPTYTRIGGEREVENT"
      KeyCapture.triggerEvent=''
    end 
      
      
      
      #Alert.show_popup("triggerevent Value= "+eventvalue)
      WebView.execute_js('setFieldValue("'+eventvalue+'")')
      redirect :action => :index
    end
    
    def mytriggerevent
      mytriggerFlag=@params['triggerFlag']
      #Alert.show_popup("triggerFlag = "+mytriggerFlag)
      displayresult = "KeyValue= "+ mytriggerFlag
      WebView.execute_js('setFieldValue("'+displayresult+'")') 
    end
    
    
    def setacceleratekey
      acckeyvalue = @params['txtacckeyvalue']
      KeyCapture.accelerateKey=acckeyvalue
      #Alert.show_popup("AccelerateKey Value= "+acckeyvalue)
      displayresult = "accValue= "+ acckeyvalue
      WebView.execute_js('setFieldValue("'+displayresult+'")') 
      redirect :action => :index
    end
    def sethomekey
      homekeyvalue = @params['txthomekeyvalue']
      KeyCapture.homeKeyValue=homekeyvalue
      #Alert.show_popup("homekeyvalue= "+homekeyvalue)
      displayresult = "homeValue= "+ homekeyvalue
      WebView.execute_js('setFieldValue("'+displayresult+'")') 
      redirect :action => :index
    end
    
    def setkeyremap
      keyvaluetoremap = @params['txtkeyvalueforrempap']
      remapvalue = @params['txtremapavalue']
      KeyCapture.keyValue=keyvaluetoremap
      KeyCapture.remap=remapvalue
      #Alert.show_popup("Keyvalue= "+keyvaluetoremap+"RemapValue= "+remapvalue)
      displayresult = "Keyvalue=" + keyvaluetoremap+"   RemapValue= "+ remapvalue
      WebView.execute_js('setFieldValue("'+displayresult+'")') 
      redirect :action => :index
    end
    
    def setemptykeycapturetag
      KeyCapture.setEMML('')
      #Alert.show_popup("Empty KeyCaptureTag")
      redirect :action => :index
    end
    
    def setemptykeyevent
      KeyCapture.keyEvent=''
     # Alert.show_popup("Empty keyevent")
      redirect :action => :index
    end
    
    def unregisterkeyevent
      mydispatchvalue = @params['selectdispatch']
      mykeyvalue= @params['txtkeyvalue']
      KeyCapture.keyValue = mykeyvalue
      KeyCapture.dispatch = mydispatchvalue
      KeyCapture.keyEvent=url_for()
      #Alert.show_popup("unregister")
      redirect :action => :index
    end
    
    def registerkeyevent
      mydispatchvalue = @params['selectdispatch']
      mykeyvalue= @params['txtkeyvalue']
             
      KeyCapture.keyValue = mykeyvalue
      KeyCapture.dispatch = mydispatchvalue
      KeyCapture.keyEvent = url_for(:action => :mykeyevent)
   
     
      redirect :action => :index
      
    end
    
    def mykeyevent
      $count+=1
      temp=''
      temp = $count.to_s
      mykeyresult=@params['keyValue']
      #Alert.show_popup("KeyValue = "+mykeyresult)
      displayresult = "KeyEvent Fired.Count=" + temp+"   KeyValue= "+ mykeyresult
      WebView.execute_js('setFieldValue("'+displayresult+'")')   
    end
    

  # GET /KeyCaptureModule
  def index
    $count=0
    #Alert.show_popup("Hello")
    @keycapturemodules = KeyCaptureModule.find(:all)
    render :back => '/app'
  end

  # GET /KeyCaptureModule/{1}
  def show
    @keycapturemodule = KeyCaptureModule.find(@params['id'])
    if @keycapturemodule
      render :action => :show, :back => url_for(:action => :index)
    else
      redirect :action => :index
    end
  end

  # GET /KeyCaptureModule/new
  def new
    @keycapturemodule = KeyCaptureModule.new
    render :action => :new, :back => url_for(:action => :index)
  end

  # GET /KeyCaptureModule/{1}/edit
  def edit
    @keycapturemodule = KeyCaptureModule.find(@params['id'])
    if @keycapturemodule
      render :action => :edit, :back => url_for(:action => :index)
    else
      redirect :action => :index
    end
  end

  # POST /KeyCaptureModule/create
  def create
    @keycapturemodule = KeyCaptureModule.create(@params['keycapturemodule'])
    redirect :action => :index
  end

  # POST /KeyCaptureModule/{1}/update
  def update
    @keycapturemodule = KeyCaptureModule.find(@params['id'])
    @keycapturemodule.update_attributes(@params['keycapturemodule']) if @keycapturemodule
    redirect :action => :index
  end

  # POST /KeyCaptureModule/{1}/delete
  def delete
    @keycapturemodule = KeyCaptureModule.find(@params['id'])
    @keycapturemodule.destroy if @keycapturemodule
    redirect :action => :index  
  end
end
