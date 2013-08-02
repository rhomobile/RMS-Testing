require 'rho/rhocontroller'
require 'helpers/browser_helper'

class PushModuleController < Rho::RhoController
  include BrowserHelper

  def FunMinimize
     #Alert.show_popup('Scanner1')
     Application.minimize
     redirect :action =>  :index
   end 
  
  def applypushEvent
           selected_Event = @params['pushEvent']  
            if selected_Event=="JAVASCRIPT"
            Push.detected = url_for(:action => :push_event_cb)
            elsif selected_Event=="JSON"
       #      Push.detected=
            elsif selected_Event=="HTML"
       #     Push.detected=
            elsif selected_Event=="DETACHEVENT"
            Push.detected=''
            elsif selected_Event=="EMPTYEVENT"
       #     Push.detected=
          end  
           render :action => :index, :back => '/app' 
         end
         
         def push_event_cb
           puts "push Object : #{@params}"
           resultHash = @params
           $pusheventInfo = "Push Event:-"
           if resultHash
             $pusheventInfo += "with requested value : " + resultHash["value"]
           end
           puts $pusheventInfo
           Alert.show_popup $pusheventInfo
           WebView.refresh
         end
         
         
      
               
        def setPort
                portValue=@params['portText']
                puts "setting port value #{portValue}"  
                Push.port =portValue
                redirect :action => :index 
           end
           
           
        def setPasskey
              passkeyValue=@params['passkeyText']
              puts "setting Passkey value #{passkeyValue}"  
              Push.passKey =passkeyValue
              redirect :action => :index 
         end   
         
        def setPushPath
                  pathValue=@params['pathText']
                  puts "setting path Value to #{pathValue}"  
                  Push.path =pathValue
                  redirect :action => :index 
         end
      
       def setResponse
                  responseValue=@params['responseText']
                  puts "setting response Value to #{responseValue}"  
                  Push.response=responseValue
                  redirect :action => :index 
       end
       
       
      def startPushServer
                   
                   puts "started PushServer"  
                   Push.start
                   redirect :action => :index 
      end
      
      def stopPushServer
                     puts "stopped PushServer"  
                     Push.stop
                     redirect :action => :index 
      end
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  # GET /PushModule
  def index
    @pushmodules = PushModule.find(:all)
    render :back => '/app'
  end

  # GET /PushModule/{1}
  def show
    @pushmodule = PushModule.find(@params['id'])
    if @pushmodule
      render :action => :show, :back => url_for(:action => :index)
    else
      redirect :action => :index
    end
  end

  # GET /PushModule/new
  def new
    @pushmodule = PushModule.new
    render :action => :new, :back => url_for(:action => :index)
  end

  # GET /PushModule/{1}/edit
  def edit
    @pushmodule = PushModule.find(@params['id'])
    if @pushmodule
      render :action => :edit, :back => url_for(:action => :index)
    else
      redirect :action => :index
    end
  end

  # POST /PushModule/create
  def create
    @pushmodule = PushModule.create(@params['pushmodule'])
    redirect :action => :index
  end

  # POST /PushModule/{1}/update
  def update
    @pushmodule = PushModule.find(@params['id'])
    @pushmodule.update_attributes(@params['pushmodule']) if @pushmodule
    redirect :action => :index
  end

  # POST /PushModule/{1}/delete
  def delete
    @pushmodule = PushModule.find(@params['id'])
    @pushmodule.destroy if @pushmodule
    redirect :action => :index  
  end
end
