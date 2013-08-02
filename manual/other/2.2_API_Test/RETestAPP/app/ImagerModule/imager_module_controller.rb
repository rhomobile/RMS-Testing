require 'rho'
require 'rho/rhocontroller'
require 'rho/rhoerror'
require 'helpers/browser_helper'

class ImagerModuleController < Rho::RhoController
  include BrowserHelper
  
  def FunMinimize
     #Alert.show_popup('Scanner1')
     Application.minimize
     redirect :action =>  :index
   end 

def captureevent
  Imager.imagerCaptureEvent=url_for(:action => :capture_event_cb)
  #Alert.show_popup("event")
end

def capture_event_cb
  #Alert.show_popup("eventfire")
  puts @params
  $data_return = @params['imageData']
#  WebView.execute_js('changeImgsrc("'+data_return+'")')
  WebView.refresh
end
  
  def ApplyImagerEnumEvent
         selected_Event = @params['eventType']  
         if selected_Event=="JAVASCRIPT"  
         Imager.imagerEnumEvent= url_for(:action => :imagerenum_event_cb) 
         elsif selected_Event=="JSON"
            #      Imager.imagerEnumEvent=
           elsif selected_Event=="HTML"
            #     Imager.setEMML("imagerEnumEvent:url('http://192.168.6.18/NEON/Navigate.html')")
           elsif selected_Event=="DETACHEVENT"
           Imager.imagerEnumEvent=''
           elsif selected_Event=="EMPTYEVENT"
#           Imager.imagerEnumEvent=
           end  
#       render :action => :index, :back => '/app',:layout => false             
         redirect :action => :index 

     end
     
     def imagerenum_event_cb
           puts "In Enum imager Callback"
           deviceimagers = @params
           ienumbuf = 'Available Imagers:'
           if deviceimagers
             puts "inside if case"  
             deviceimagers["imagerArray"].each {|imager|  ienumbuf += '' + imager["deviceName"] + " : " + imager["friendlyName"] }
           end
            puts "imager enum event : #{ienumbuf}"
            WebView.execute_js('setFieldValue("'+ienumbuf+'")')   
#            redirect :action => :index  
#            WebView.refresh
     end
     
       def doEnumerate
         puts "inside doEnumerate function" 
#         WebView.execute_js('setFieldValue("doEnumerate")')
         Imager.enumerate
         render :action => :index, :back => '/app'
       end
       
       
  def enableselectedImager
        selected_Imager = @params['selImg'] 
        puts "selected imager : #{selected_Imager}"
        Imager.enabled=selected_Imager
        redirect :action => :index                                
   end
      
      def enablemyImager1
        puts "calling enable method"
        Imager.enable
        redirect :action => :index        
      end 
      
      def disableImager1
        puts "calling disable method"
        Imager.disable
        redirect :action => :index  
       end
      
      def captureImager
        puts "capture Imager locally"
        Imager.capture
        redirect :action => :index 
      end  
      
     def setLeftPosition
          leftpst=@params['leftPosition']
          puts "setting left param of imager #{leftpst}"  
          Imager.left=leftpst;
          render :action => :index, :back => '/app'
     end
          
      def setTopPosition
        toppst=@params['topPosition']
        puts "setting top param of imager #{toppst}"    
        Imager.top=toppst
        redirect :action => :index 
      end
  
     def setheight
         ht=@params['viewerHeight']
         puts "setting height param of imager #{ht}"      
         Imager.height=ht
         redirect :action => :index 
     end
          
      def setwidth
            wd=@params['viewerWidth']
            puts "setting width param of imager #{wd}"     
            Imager.width=wd
            redirect :action => :index 
      end  
      
      
     def selectLamp
        sltLamp=@params['imgLamp']
        puts "setting imager lamp to  #{sltLamp}"      
        Imager.lamp=sltLamp
       redirect :action => :index  
    end
      
      
      def selectAim
        sltAim=@params['imgAim']
        puts "setting imager aim to  #{sltAim}" 
        Imager.aim=sltAim
        redirect :action => :index 
    end
      
      

      
    
      def imgcapture
        uName = @params['txtUserName']  
        Imager.username = uName
        uPass = @params['txtPassword'] 
        Imager.password = uPass
        soundURL=@params['txtSound'] 
         if soundURL!=""
         Imager.sound=soundURL
         end 
         destination =@params['txtDestination'] 
         dest = "url('"+destination+"')"
         Imager.destination=dest
        
          type = @params['mygroup']
      
          if type=="javascript"
          Imager.imagerEvent=url_for(:action => :imager_event_cb)
          elsif type=="HTML"
      #     Imager.setEMML("imagerevent:url('http://192.168.6.18/Navigate.html?Resposnse=%s');")
          elsif type=="JSON"
      #     Imager.imagerEvent="myjsonevent(%json)"
          elsif(type=="DETACH")
            Imager.imagerEvent=''
          elsif(type=="URLEmpty")
      #    Imager.imagerEvent=""
          end
          Imager.capture    
    #      redirect :action => :index   
           render :action => :index, :back => '/app'                       
        end
        
        
        def imager_event_cb
          puts "inside imagerevent"
           resultHash = @params
           puts "resultHash value : #{resultHash}"
            imagereventinfo = "imager event info:"
            if resultHash
              imagereventinfo += "result status is: " + resultHash['transferResult'] 
            end
            puts "imager event : #{imagereventinfo}"
           WebView.execute_js('setFieldValue("'+imagereventinfo+'")') 

        end
  
  # GET /ImagerModule
  def index
    @imagermodules = ImagerModule.find(:all)
    render :back => '/app'
  end

  # GET /ImagerModule/{1}
  def show
    @imagermodule = ImagerModule.find(@params['id'])
    if @imagermodule
      render :action => :show, :back => url_for(:action => :index)
    else
      redirect :action => :index
    end
  end

  # GET /ImagerModule/new
  def new
    @imagermodule = ImagerModule.new
    render :action => :new, :back => url_for(:action => :index)
  end

  # GET /ImagerModule/{1}/edit
  def edit
    @imagermodule = ImagerModule.find(@params['id'])
    if @imagermodule
      render :action => :edit, :back => url_for(:action => :index)
    else
      redirect :action => :index
    end
  end

  # POST /ImagerModule/create
  def create
    @imagermodule = ImagerModule.create(@params['imagermodule'])
    redirect :action => :index
  end

  # POST /ImagerModule/{1}/update
  def update
    @imagermodule = ImagerModule.find(@params['id'])
    @imagermodule.update_attributes(@params['imagermodule']) if @imagermodule
    redirect :action => :index
  end

  # POST /ImagerModule/{1}/delete
  def delete
    @imagermodule = ImagerModule.find(@params['id'])
    @imagermodule.destroy if @imagermodule
    redirect :action => :index  
  end
  

end
