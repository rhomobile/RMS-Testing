require 'rho/rhocontroller'
require 'helpers/browser_helper'

class BatteryModuleController < Rho::RhoController
  include BrowserHelper
  
  def FunMinimize
     #Alert.show_popup('Scanner1')
     Application.minimize
     redirect :action =>  :index
  end

  def callgetBatteryStatus
    #Alert.show_popup("getBatteryStatus called")
    Battery.getBatteryStatus  
    redirect :action => :index
  end
  
  def callgetSmartBatteryStatus
    #Alert.show_popup("getSmartBatteryStatus called")
    Battery.getSmartBatteryStatus  
    redirect :action => :index
  end
  
  
  def selectVisibility
       selectedVisibility = @params['batVisibility']
       case selectedVisibility
       when 'Visible'; 
         Battery.visibility = 'visible' 
       when 'Hidden';   
         Battery.visibility = 'hidden'
       when 'Address'; 
         Battery.visibility = 'Address'  
       end                    
       redirect :action => :index 
  end  
    
    def applybatteryEvent
        selected_Event = @params['batteryEvent']  
         if selected_Event=="JAVASCRIPT"
         Battery.batteryEvent=url_for(:action => :battery_event_cb)
         elsif selected_Event=="JSON"
    #      Battery.batteryEvent=
         elsif selected_Event=="HTML"
    #     Battery.batteryEvent=
         elsif selected_Event=="DETACHEVENT"
          Battery.batteryEvent=''
         elsif selected_Event=="EMPTYEVENT"
    #     Battery.batteryEvent=
       end  
      redirect :action => :index 
      end
      
  def battery_event_cb
         puts "battery Object : #{@params}"
          resultHash = @params
          $count = $count.to_i + 1
          batbuf = "Battery event info-"
          if resultHash
            batbuf += "<br/>"+ "ACLineStatus : " + resultHash["acLineStatus"] 
            batbuf += "<br/>"+ "BatteryLife : " + resultHash["batteryLifePercent"] 
            batbuf += "<br/>"+ "BackupBatteryLife : " + resultHash["backupBatteryLifePercent"]
            batbuf += "<br/>"+ "eventSource : " + resultHash["eventSource"]             
            batbuf += "<br/>"+ "Count:"+$count.to_s     
          end
          WebView.execute_js('setFieldValue("'+batbuf+'")')   
          puts batbuf
  
        end
      
      
      def getsmartbattery
        selected_Event = @params['smartbatteryEvent']  
         if selected_Event=="JAVASCRIPT"
        Battery.smartBatteryEvent= url_for(:action => :smartbattery_event_cb)
         elsif selected_Event=="JSON"
    #      Battery.smartBatteryEvent=
         elsif selected_Event=="HTML"
    #     Battery.smartBatteryEvent=
         elsif selected_Event=="DETACHEVENT"
         Battery.smartBatteryEvent=''
         elsif selected_Event=="EMPTYEVENT"
    #     Battery.smartBatteryEvent=
        end  
      end
      
      
    def smartbattery_event_cb
         puts "inside smart battery callback : #{@params}"
         resultHash = @params
         smartbuf = "smart battey info:-"
         if resultHash
           smartbuf += "serialNumber : " + resultHash["serialNumber"] +
                       "partNumber : " + resultHash["partNumber"] +
                        "batteryChargeCycles : " + resultHash["batteryChargeCycles"]+
                        "ratedCapacity : " + resultHash["ratedCapacity"] +
                        "manufactureDate : " + resultHash["manufactureDate"] +
                        "stateOfHealth : " + resultHash["stateOfHealth"]  
         end
          WebView.execute_js('setFieldValue("'+smartbuf+'")')   
         puts smartbuf
       end
      
      
      def setLeftPosition
            leftpst=@params['leftPosition']
            puts "setting left param of battery #{leftpst}"  
            Battery.left=leftpst;
            redirect :action => :index 
       end
            
        def setTopPosition
          toppst=@params['topPosition']
          puts "setting top param of battery #{toppst}"    
         Battery.top=toppst
          redirect :action => :index 
        end
      
      def setColor
        colorValue=@params['colorVal']
        puts "setting color battery #{colorValue}"    
        Battery.color=colorValue
        redirect :action => :index 
      end
      
      def setLayout
        layoutVal=@params['layoutList']
        puts "setting  battery layout #{layoutVal}"    
           if layoutVal=="Left"
            Battery.layout='left' 
             elsif layoutVal=="Up"
              Battery.layout='up' 
             elsif layoutVal=="Right"
             Battery.layout='right' 
             elsif layoutVal=="Down"
             Battery.layout='down' 
             elsif layoutVal=="Invalid"
             Battery.layout='invalid' 
           end  
           
            redirect :action => :index 
      end
  
  def setsampleInterval
    sampleIntervalValue=@params['sampleIntervalVal']
    puts "sampleInterval #{sampleIntervalValue}"
    #Alert.show_popup(sampleIntervalValue)    
    Battery.sampleInterval=sampleIntervalValue
    redirect :action => :index 
  end
  
  def selectsetSystemNotifications
    #Alert.show_popup("setSystemNotifications called")
       selectedsetSystemNotifications = @params['batsetSystemNotifications']
    #Alert.show_popup(selectedsetSystemNotifications)
       case selectedsetSystemNotifications
       when 'Enabled'; 
         Battery.setSystemNotifications = 'Enabled' 
       when 'Disabled';   
         Battery.setSystemNotifications = 'Disabled'
       when 'Invalid'; 
         Battery.setSystemNotifications = 'Invalid'  
       end                    
       redirect :action => :index 
  end  
  
  
  # GET /BatteryModule
  def index
    GC.enable()
    @batterymodules = BatteryModule.find(:all)
    $count=0
    render :back => '/app'
  end

  # GET /BatteryModule/{1}
  def show
    @batterymodule = BatteryModule.find(@params['id'])
    if @batterymodule
      render :action => :show, :back => url_for(:action => :index)
    else
      redirect :action => :index
    end
  end

  # GET /BatteryModule/new
  def new
    @batterymodule = BatteryModule.new
    render :action => :new, :back => url_for(:action => :index)
  end

  # GET /BatteryModule/{1}/edit
  def edit
    @batterymodule = BatteryModule.find(@params['id'])
    if @batterymodule
      render :action => :edit, :back => url_for(:action => :index)
    else
      redirect :action => :index
    end
  end

  # POST /BatteryModule/create
  def create
    @batterymodule = BatteryModule.create(@params['batterymodule'])
    redirect :action => :index
  end

  # POST /BatteryModule/{1}/update
  def update
    @batterymodule = BatteryModule.find(@params['id'])
    @batterymodule.update_attributes(@params['batterymodule']) if @batterymodule
    redirect :action => :index
  end

  # POST /BatteryModule/{1}/delete
  def delete
    @batterymodule = BatteryModule.find(@params['id'])
    @batterymodule.destroy if @batterymodule
    redirect :action => :index  
  end
end
