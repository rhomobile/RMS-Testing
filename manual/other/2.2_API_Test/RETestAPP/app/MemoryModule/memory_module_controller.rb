require 'rho/rhocontroller'
require 'helpers/browser_helper'

class MemoryModuleController < Rho::RhoController
  include BrowserHelper
  
  def FunMinimize
     #Alert.show_popup('Scanner1')
     Application.minimize
     redirect :action =>  :index
   end 
  
  def callgetMemoryStats
    Alert.show_popup("getMemoryStats called")
    Memory.getMemoryStats  
    redirect :action => :index
  end

  def registermemoryEvent
    Alert.show_popup("attaching memoryEvent")
    myeventvalue = @params['selectmemoryEvent']
    puts "attaching memoryEvent"  
         if myeventvalue == "JavaScript"
           Memory.memoryEvent = url_for(:action => :mymemoryEvent)
         elsif myeventvalue == "DETACHEVENT"
           Memory.memoryEvent = ''
         elsif myeventvalue == "EMPTYEVENT"
           Memory.memoryEvent =''
         end

    redirect :action => :index
  end
  
  def mymemoryEvent
#    Alert.show_popup("In mymemoryEvent")
    puts "In mymemoryEvent"  
    memoryData = @params
    
    mytotalMemory = memoryData["totalMemory"]
    myavailMemory = memoryData["availMemory"]
      
    mymemorydata="totalMemory(KB):- "+mytotalMemory+"<br/>"+"  availMemory(KB):- "+myavailMemory
    
    WebView.execute_js('setFieldValue("'+mymemorydata+'")')     
  end
  
  def setlowMemThreshold
    mylowMemThreshold = @params['txtlowMemThreshold']
    Alert.show_popup(mylowMemThreshold)
    Memory.lowMemThreshold = mylowMemThreshold
    #Alert.show_popup(mylowMemThreshold)
    redirect :action => :index
  end
  
  # GET /MemoryModule
  def index
    @memorymodules = MemoryModule.find(:all)
    render :back => '/app'
  end

  # GET /MemoryModule/{1}
  def show
    @memorymodule = MemoryModule.find(@params['id'])
    if @memorymodule
      render :action => :show, :back => url_for(:action => :index)
    else
      redirect :action => :index
    end
  end

  # GET /MemoryModule/new
  def new
    @memorymodule = MemoryModule.new
    render :action => :new, :back => url_for(:action => :index)
  end

  # GET /MemoryModule/{1}/edit
  def edit
    @memorymodule = MemoryModule.find(@params['id'])
    if @memorymodule
      render :action => :edit, :back => url_for(:action => :index)
    else
      redirect :action => :index
    end
  end

  # POST /MemoryModule/create
  def create
    @memorymodule = MemoryModule.create(@params['memorymodule'])
    redirect :action => :index
  end

  # POST /MemoryModule/{1}/update
  def update
    @memorymodule = MemoryModule.find(@params['id'])
    @memorymodule.update_attributes(@params['memorymodule']) if @memorymodule
    redirect :action => :index
  end

  # POST /MemoryModule/{1}/delete
  def delete
    @memorymodule = MemoryModule.find(@params['id'])
    @memorymodule.destroy if @memorymodule
    redirect :action => :index  
  end
end
