require 'rho/rhocontroller'
require 'helpers/browser_helper'

class SignalModuleController < Rho::RhoController
  include BrowserHelper
  
  def FunMinimize
     #Alert.show_popup('Scanner1')
     Application.minimize
     redirect :action =>  :index
  end

  def selectVisibility
        selectedVisibility = @params['sigVisibility']
        case selectedVisibility
        when 'Visible'; 
          Signal.visibility = 'visible' 
        when 'Hidden';   
         Signal.visibility =  'hidden'
        when 'Address'; 
          Signal.visibility = 'Address'  
        end                      
        redirect :action => :index 
    end
    
      def applysignalEvent
        selected_Event = @params['signalEvent']  
         if selected_Event=="JAVASCRIPT"
         Signal.signalEvent= url_for(:action => :signal_event_cb)
         elsif selected_Event=="JSON"
    #      Signal.signalEvent=
         elsif selected_Event=="HTML"
    #     Signal.signalEvent=
         elsif selected_Event=="DETACHEVENT"
         Signal.signalEvent=''
         elsif selected_Event=="EMPTYEVENT"
    #     Signal.signalEvent=
       end  
        redirect :action => :index 
      end
      
      def signal_event_cb
        puts "inside signal_event callback"
#        Alert.show_popup "signal_event_cb called"
        resultHash = @params
        signalbufinfo = "signal event info:"
        if resultHash
                puts "inside if case"
                signalbufinfo += "<br/>"+ "SignalStrength : " + resultHash["signalStrength"]
                signalbufinfo += "<br/>"+ "ESSID : " + resultHash["essid"]
                signalbufinfo += "<br/>"+ "macAddress : " + resultHash["macAddress"]
                signalbufinfo += "<br/>"+ "adapterName : " + resultHash["adapterName"]
                signalbufinfo += "<br/>"+ "dhcpServer : " + resultHash["dhcpServer"]  
                signalbufinfo += "<br/>"+ "dhcpStatic : " + resultHash["dhcpStatic"]
                signalbufinfo += "<br/>"+ "gateway : " + resultHash["gateway"]
                signalbufinfo += "<br/>"+ "ipAddress : " + resultHash["ipAddress"]
                signalbufinfo += "<br/>"+ "rssi : " + resultHash["rssi"]
                signalbufinfo += "<br/>"+ "subnetMask : " + resultHash["subnetMask"]
                signalbufinfo += "<br/>"+ "wins : " + resultHash["wins"]  
        else 
          signalbufinfo += "is empty"       
        end
        WebView.execute_js('setFieldValue("'+signalbufinfo+'")')   
        puts signalbufinfo

      end
      
      
      def setLeftPosition
            leftpst=@params['leftPosition']
            puts "setting left param of battery #{leftpst}"  
            Signal.left=leftpst;
            redirect :action => :index 
       end
            
        def setTopPosition
          toppst=@params['topPosition']
          puts "setting top param of battery #{toppst}"    
          Signal.top=toppst
          redirect :action => :index 
        end
      
      def setColor
        colorValue=@params['colorVal']
        puts "setting color battery #{colorValue}"    
        Signal.color=colorValue
        redirect :action => :index 
      end
      
      def setLayout
        layoutVal=@params['layoutList']
        puts "setting  battery layout #{layoutVal}"    
           if layoutVal=="Left"
            Signal.layout='left' 
             elsif layoutVal=="Up"
              Signal.layout='up' 
             elsif layoutVal=="Right"
             Signal.layout='right' 
             elsif layoutVal=="Down"
             Signal.layout='down' 
             elsif layoutVal=="Invalid"
             Signal.layout='invalid' 
           end  
            redirect :action => :index 
      end
  
  
  
  
  # GET /SignalModule
  def index
    GC.enable()
    @signalmodules = SignalModule.find(:all)
    render :back => '/app'
  end

  # GET /SignalModule/{1}
  def show
    @signalmodule = SignalModule.find(@params['id'])
    if @signalmodule
      render :action => :show, :back => url_for(:action => :index)
    else
      redirect :action => :index
    end
  end

  # GET /SignalModule/new
  def new
    @signalmodule = SignalModule.new
    render :action => :new, :back => url_for(:action => :index)
  end

  # GET /SignalModule/{1}/edit
  def edit
    @signalmodule = SignalModule.find(@params['id'])
    if @signalmodule
      render :action => :edit, :back => url_for(:action => :index)
    else
      redirect :action => :index
    end
  end

  # POST /SignalModule/create
  def create
    @signalmodule = SignalModule.create(@params['signalmodule'])
    redirect :action => :index
  end

  # POST /SignalModule/{1}/update
  def update
    @signalmodule = SignalModule.find(@params['id'])
    @signalmodule.update_attributes(@params['signalmodule']) if @signalmodule
    redirect :action => :index
  end

  # POST /SignalModule/{1}/delete
  def delete
    @signalmodule = SignalModule.find(@params['id'])
    @signalmodule.destroy if @signalmodule
    redirect :action => :index  
  end
end
