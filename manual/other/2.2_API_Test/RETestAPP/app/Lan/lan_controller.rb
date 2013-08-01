require 'rho/rhocontroller'
require 'helpers/browser_helper'

class LanController < Rho::RhoController
  include BrowserHelper

  def FunMinimize
     #Alert.show_popup('Scanner1')
     Application.minimize
     redirect :action =>  :index
  end
    
  # GET /Lan
  def index
    @lans = Lan.find(:all)
    render :back => '/app'
  end

  # GET /Lan/{1}
  def show
    @lan = Lan.find(@params['id'])
    if @lan
      render :action => :show, :back => url_for(:action => :index)
    else
      redirect :action => :index
    end
  end

  # GET /Lan/new
  def new
    @lan = Lan.new
    render :action => :new, :back => url_for(:action => :index)
  end

  # GET /Lan/{1}/edit
  def edit
    @lan = Lan.find(@params['id'])
    if @lan
      render :action => :edit, :back => url_for(:action => :index)
    else
      redirect :action => :index
    end
  end

  # POST /Lan/create
  def create
    @lan = Lan.create(@params['lan'])
    redirect :action => :index
  end

  # POST /Lan/{1}/update
  def update
    @lan = Lan.find(@params['id'])
    @lan.update_attributes(@params['lan']) if @lan
    redirect :action => :index
  end

  # POST /Lan/{1}/delete
  def delete
    @lan = Lan.find(@params['id'])
    @lan.destroy if @lan
    redirect :action => :index  
  end
  def enableadapter1
            WebView.execute_js('setFieldValue("enable method")')  
            puts "calling enable method"
            Wlan.enableAdapter
            redirect :action => :index        
  end 
        
  def disableadapter1
    WebView.execute_js('setFieldValue("disable method")')
    puts "calling disable method"
    Wlan.disableAdapter
    redirect :action => :index  
   end
  
  def powerstate1
       WebView.execute_js('setFieldValue("Getting power state of the WLAN adapter")')
       puts "Getting power state of the WLAN adapter"
       Wlan.getAdapterPowerState
       redirect :action => :index 
     end  
   
   
   def registerpowerStateEvent
     eventvalue = @params['selecttriggerevent']
     if eventvalue == "JavaScript"
       #Alert.show_popup("insideEvent")
       WebView.execute_js('setFieldValue("Applying Event")')
       Wlan.adapterPowerStateEvent=url_for(:action => :mypowerstateevent)
     end     
   end
   
   def mypowerstateevent
         mystatus=@params['status']
         #Alert.show_popup("power state is = "+mystatus)
         WebView.execute_js('setFieldValue("'+mystatus+'")')   
       end
end
