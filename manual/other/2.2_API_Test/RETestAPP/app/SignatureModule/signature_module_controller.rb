require 'rho/rhocontroller'
require 'helpers/browser_helper'

class SignatureModuleController < Rho::RhoController
  include BrowserHelper
  
  def FunMinimize
     #Alert.show_popup('Scanner1')
     Application.minimize
     redirect :action =>  :index
   end 
  
  def captureevent
    Alert.show_popup("event")
    SignatureCapture.signatureCaptureEvent=url_for(:action => :capture_event_cb)
    
  end
  
  def capture_event_cb
    Alert.show_popup("eventfire")
    puts @params
    $data_return = @params['imageData']
#   WebView.execute_js('changeImgsrc()')
    WebView.refresh
  end

  def selectVisibility
        selectedVisibility = @params['sigVisibility']
        case selectedVisibility
        when 'Visible'; 
          puts "using setEMML"
          SignatureCapture.setEmml('visibility:visible')
#          SignatureCapture.visibility = 'visible'
        when 'Hidden';   
          SignatureCapture.visibility = 'hidden'
        when 'Address'; 
          SignatureCapture.visibility = 'Address'   
        when 'Null'; 
          SignatureCapture.visibility = ''
        end                  
        redirect :action => :index 
       end
      
       
   
  def selectBorder
      selectedBorder = @params['sigBorder']
      case selectedBorder
      when 'On';
          SignatureCapture.border = 'Visible'
      when 'Off';
            SignatureCapture.border = 'Hidden'
      when 'Test';
           SignatureCapture.border = 'Address'
      end 
      redirect :action => :index 
  end
      
      def clearSignature
        SignatureCapture.clear  
        redirect :action => :index 
      end   
      
      def captureLocalSignature
             SignatureCapture.capture
             redirect :action => :index 
      end 
        
      def setLeftPosition
         leftpstvalue= @params['leftPosition']
         SignatureCapture.left =leftpstvalue  
          redirect :action => :index 
      end
      
      def setTopPosition
        toppstvalue= @params['topPosition']
        SignatureCapture.top = toppstvalue
        redirect :action => :index 
      end      
      
      def setheight
         setheightvalue= @params['viewerHeight']
        SignatureCapture.height = setheightvalue
         redirect :action => :index 
      end
      
      def setwidth
        setwidthvalue= @params['viewerWidth']
        SignatureCapture.width = setwidthvalue
        redirect :action => :index 
      end
      
      def peninkwidth
        penwdvalue= @params['inkwidth']
        SignatureCapture.penWidth = penwdvalue
        redirect :action => :index     
      end
      
      def peninkcolor
        pencolorvalue= @params['inkcolor']
        SignatureCapture.penColor = pencolorvalue
        redirect :action => :index  
      end
      
      def bgroundcolor
        backgcolorvalue= @params['backgroundColor']
        SignatureCapture.bgColor = backgcolorvalue
        redirect :action => :index
      end
      
      def setSigLocalName
      localSigName = @params['textLocalName']
      SignatureCapture.name=localSigName  
      redirect :action => :index
      end
      
      
      def sigCapture
      uName = @params['txtUserName']  
      SignatureCapture.username = uName
      uPass = @params['txtPassword'] 
      SignatureCapture.password = uPass
       sigName=@params['txtName'] 
       if sigName==""
         Alert.show_popup "name param is empty"
        else
          SignatureCapture.name = sigName
        end 
       destination =@params['txtDestination'] 
       dest = "url('"+destination+"')"
        SignatureCapture.destination=dest
      
        type = @params['mygroup']
    
        if type=="javascript"
         SignatureCapture.signatureSaveEvent=url_for(:action => :sig_event_cb)
        elsif type=="HTML"
    #     SignatureCapture.signatureSaveEvent="url('http://192.168.6.18/Navigate.html?Resposnse=%s')"
        elsif(type=="DETACH")
          SignatureCapture.signatureSaveEvent=''
        end
        SignatureCapture.capture 
   
#                Alert.show_popup(
#                                  :message => "uName = "+uName+" uPass = "+uPass+" sigName = "+sigName+" dest = "+dest+" type = "+type,
#                                  :title => "signature",
#                                  :buttons => ["Ok"]
#                                    )
#       render :action => :index, :back => '/app'
        redirect :action => :index
      end
      
       def sig_event_cb
              Alert.show_popup "inside sig_event_cb callback"
              sigeventinfo = "signature event info"
              puts "signature event info going on"
              sigeventinfo += "result status is: " + @params['transferResult']   
              Alert.show_popup sigeventinfo
              WebView.execute_js('setFieldValue("'+sigeventinfo+'")') 
#             WebView.refresh
        end
        
        def setvectorevent
          type = @params['veceventdropdown']
          Alert.show_popup type
                 if type=="JSCRIPT"
                  SignatureCapture.vectorEvent=url_for(:action => :sigvector_event_cb)
                 elsif type=="DETACH"
                   SignatureCapture.vectorEvent=''
                 elsif(type=="URL")
                   SignatureCapture.signatureSaveEvent=''
                 end
          
        end
        
        
        def sigvector_event_cb
                  resultHash = @params
                  buf = ""
                  if resultHash
                    Alert.show_popup "inside resultHash"
                    if resultHash["vectorArray"]
                      Alert.show_popup "vectorArray has some value"
                      resultHash["vectorArray"].each {|x| buf += x.to_s }
                    else
                      Alert.show_popup "vectorArray is empty"
                    end
                  else
                    buf = "vector array is empty"
                    Alert.show_popup "resulthash is empty"
                  end
                  WebView.execute_js('setFieldValue("'+buf+'")')   
                  puts buf

        end
        
    
    
 # GET /SignatureModule
  def index
    @signaturemodules = SignatureModule.find(:all)
    render :back => '/app'
  end

  # GET /SignatureModule/{1}
  def show
    @signaturemodule = SignatureModule.find(@params['id'])
    if @signaturemodule
      render :action => :show, :back => url_for(:action => :index)
    else
      redirect :action => :index
    end
  end

  # GET /SignatureModule/new
  def new
    @signaturemodule = SignatureModule.new
    render :action => :new, :back => url_for(:action => :index)
  end

  # GET /SignatureModule/{1}/edit
  def edit
    @signaturemodule = SignatureModule.find(@params['id'])
    if @signaturemodule
      render :action => :edit, :back => url_for(:action => :index)
    else
      redirect :action => :index
    end
  end

  # POST /SignatureModule/create
  def create
    @signaturemodule = SignatureModule.create(@params['signaturemodule'])
    redirect :action => :index
  end

  # POST /SignatureModule/{1}/update
  def update
    @signaturemodule = SignatureModule.find(@params['id'])
    @signaturemodule.update_attributes(@params['signaturemodule']) if @signaturemodule
    redirect :action => :index
  end

  # POST /SignatureModule/{1}/delete
  def delete
    @signaturemodule = SignatureModule.find(@params['id'])
    @signaturemodule.destroy if @signaturemodule
    redirect :action => :index  
  end
end
