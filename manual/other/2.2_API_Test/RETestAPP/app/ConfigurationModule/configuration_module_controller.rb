require 'rho/rhocontroller'
require 'helpers/browser_helper'

class ConfigurationModuleController < Rho::RhoController
  include BrowserHelper
  
  
  def SetRegistry
    Registry.hive = 'HKLM' 
    Registry.hive = 'Software\Name'
    Registry.setting = 'Soft'
    Registry.type = 'STRING'
    Registry.persistent = 'TRUE'
    Registry.value ='Hello'
    Alert.show_popup("SetRegistry")
    redirect :action => :index
  end
  
  
  # GET /ConfigurationModule
  def index
    @configurationmodules = ConfigurationModule.find(:all)
    render :back => '/app'
  end

  # GET /ConfigurationModule/{1}
  def show
    @configurationmodule = ConfigurationModule.find(@params['id'])
    if @configurationmodule
      render :action => :show, :back => url_for(:action => :index)
    else
      redirect :action => :index
    end
  end

  # GET /ConfigurationModule/new
  def new
    @configurationmodule = ConfigurationModule.new
    render :action => :new, :back => url_for(:action => :index)
  end

  # GET /ConfigurationModule/{1}/edit
  def edit
    @configurationmodule = ConfigurationModule.find(@params['id'])
    if @configurationmodule
      render :action => :edit, :back => url_for(:action => :index)
    else
      redirect :action => :index
    end
  end

  # POST /ConfigurationModule/create
  def create
    @configurationmodule = ConfigurationModule.create(@params['configurationmodule'])
    redirect :action => :index
  end

  # POST /ConfigurationModule/{1}/update
  def update
    @configurationmodule = ConfigurationModule.find(@params['id'])
    @configurationmodule.update_attributes(@params['configurationmodule']) if @configurationmodule
    redirect :action => :index
  end

  # POST /ConfigurationModule/{1}/delete
  def delete
    @configurationmodule = ConfigurationModule.find(@params['id'])
    @configurationmodule.destroy if @configurationmodule
    redirect :action => :index  
  end
end
