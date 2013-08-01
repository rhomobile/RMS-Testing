require 'rho/rhocontroller'
require 'helpers/browser_helper'

class NetworkModuleController < Rho::RhoController
  include BrowserHelper

  def FunMinimize
     #Alert.show_popup('Scanner1')
     Application.minimize
     redirect :action =>  :index
   end 
  
  def applynetworkEvent
         selected_Event = @params['networkEvent']  
          if selected_Event=="JAVASCRIPT"
          Network.networkEvent = url_for(:action => :network_event_cb)
          elsif selected_Event=="DETACHEVENT"
           Network.networkEvent=''
          elsif selected_Event=="HTML"
       #     Network.networkEvent=
          elsif selected_Event=="EMPTYEVENT"
     #     Network.networkEvent=
        end 
         redirect :action => :index  
       end
       
       def network_event_cb
         puts "network event callback"
         resultHash = @params
         networkinfo = "Network event Info:"
         $networkCount=$networkCount.to_i + 1
         if resultHash
           networkinfo += " " + resultHash["connectionInformation"]+" Count:"+$networkCount.to_s
         end
         puts networkinfo
         WebView.execute_js('setFieldValue("'+networkinfo+'")')   
         puts networkinfo
       end
       
       
       def setHost
             hostValue=@params['hostText']
             puts "setting host value #{hostValue}"  
             Network.host =hostValue
             redirect :action => :index 
        end
             
      def setPort
              portValue=@params['portText']
              puts "setting port value #{portValue}"  
              Network.port =portValue
              redirect :action => :index 
         end
       
      def setnetworkPollInterval
                networkPollIntervalValue=@params['networkPollIntervalText']
                puts "setting networkPollIntervalValue to #{networkPollIntervalValue}"  
                Network.networkPollInterval =networkPollIntervalValue
                redirect :action => :index 
       end
    
     def setconnectionTimeout
                connectionTimeoutValue=@params['connectionTimeoutText']
                puts "setting connectionTimeout Value to #{connectionTimeoutValue}"  
                Network.connectionTimeout =connectionTimeoutValue
                redirect :action => :index 
     end
     
     
    def startPoll
                 
                 puts "started Poll"  
                 Network.start
                 redirect :action => :index 
    end
    
    def stopPoll
                   
                   puts "stopped Poll"  
                   Network.stop
                   redirect :action => :index 
    end
    
    
    def applywanEvent
         selected_Event = @params['wanEvent']  
          if selected_Event=="JAVASCRIPT"
          Network.wanStatusEvent = url_for(:action => :wanStatus_event_cb)
          elsif selected_Event=="DETACHEVENT"
           Network.wanStatusEvent=''
          elsif selected_Event=="HTML"
       #     Network.wanStatusEvent=
          elsif selected_Event=="EMPTYEVENT"
     #     Network.wanStatusEvent=
        end  
          redirect :action => :index 
       end
       
  
    def wanStatus_event_cb
      puts "wan network Object : #{@params}"
      resultHash = @params
      waninfo = "wan event info:-"
      if resultHash
            waninfo += "phoneSignalStrength : " + resultHash["phoneSignalStrength"]
            waninfo += "networkOperator : " + resultHash["networkOperator"] 
            waninfo += "connectionTypeAvailable : " + resultHash["connectionTypeAvailable"] 
            waninfo += "connectionTypeConnected : " + resultHash["connectionTypeConnected"]    
            waninfo += "connectionManagerMessage : " + resultHash["connectionManagerMessage"]
      end
      puts waninfo
      WebView.execute_js('setFieldValue("'+waninfo+'")')  
      end
    
      def setconnectionDestination
                  wanDestinationValue=@params['wanDestinationText']
                  puts "setting wanDestinationValue Value to #{wanDestinationValue}"  
                  Network.connectWan = wanDestinationValue
                  redirect :action => :index 
       end
       
     
      
      def disconnectWanNetwork
                     
                     puts "disconnecting Wan network"  
                     Network.disconnectWan
                     redirect :action => :index 
      end

  
  
  # GET /NetworkModule
  def index
    GC.enable()
    @networkmodules = NetworkModule.find(:all)
    $networkCount=0
    render :back => '/app'
  end

  # GET /NetworkModule/{1}
  def show
    @networkmodule = NetworkModule.find(@params['id'])
    if @networkmodule
      render :action => :show, :back => url_for(:action => :index)
    else
      redirect :action => :index
    end
  end

  # GET /NetworkModule/new
  def new
    @networkmodule = NetworkModule.new
    render :action => :new, :back => url_for(:action => :index)
  end

  # GET /NetworkModule/{1}/edit
  def edit
    @networkmodule = NetworkModule.find(@params['id'])
    if @networkmodule
      render :action => :edit, :back => url_for(:action => :index)
    else
      redirect :action => :index
    end
  end

  # POST /NetworkModule/create
  def create
    @networkmodule = NetworkModule.create(@params['networkmodule'])
    redirect :action => :index
  end

  # POST /NetworkModule/{1}/update
  def update
    @networkmodule = NetworkModule.find(@params['id'])
    @networkmodule.update_attributes(@params['networkmodule']) if @networkmodule
    redirect :action => :index
  end

  # POST /NetworkModule/{1}/delete
  def delete
    @networkmodule = NetworkModule.find(@params['id'])
    @networkmodule.destroy if @networkmodule
    redirect :action => :index  
  end
end
