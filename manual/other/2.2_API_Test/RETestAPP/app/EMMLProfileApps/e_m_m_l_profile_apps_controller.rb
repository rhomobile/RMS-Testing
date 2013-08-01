require 'rho/rhocontroller'
require 'helpers/browser_helper'

class EMMLProfileAppsController < Rho::RhoController
  include BrowserHelper

  def FunMinimize
     #Alert.show_popup('Scanner1')
     Application.minimize
     redirect :action =>  :index
   end  
  
  def doApplyProfile
    profile=@params['profile']  
    EmmlProfile.apply = profile
  end
  
  def clearProfile
    EmmlProfile.clear = "myIndicators"
  end

  def importEMMPProfile
    EmmlProfile.name = "myIndicators"
    EmmlProfile.importProfile = "url('http://192.168.6.18/NEON/EMMLProfilesNew/Indicators/EMMP/Indicators.emmp')"
  end
  
  def importEMMPProfileLocal
      EmmlProfile.name = "myIndicators"
      EmmlProfile.importProfile = "url('file://Application/Indicators.emmp')"
   end

  def importProfileinvalid
    EmmlProfile.name = "myIndicators";
    EmmlProfile.importProfile = "url('http://192.168.6.18/EMMLProfilesNe/Indicators/EMMP/Indicators.emmp')"
  end

  
  # GET /EMMLProfileApps
  def index
    @emmlprofileappses = EMMLProfileApps.find(:all)
    render :back => '/app'
  end

  # GET /EMMLProfileApps/{1}
  def show
    @emmlprofileapps = EMMLProfileApps.find(@params['id'])
    if @emmlprofileapps
      render :action => :show, :back => url_for(:action => :index)
    else
      redirect :action => :index
    end
  end

  # GET /EMMLProfileApps/new
  def new
    @emmlprofileapps = EMMLProfileApps.new
    render :action => :new, :back => url_for(:action => :index)
  end

  # GET /EMMLProfileApps/{1}/edit
  def edit
    @emmlprofileapps = EMMLProfileApps.find(@params['id'])
    if @emmlprofileapps
      render :action => :edit, :back => url_for(:action => :index)
    else
      redirect :action => :index
    end
  end

  # POST /EMMLProfileApps/create
  def create
    @emmlprofileapps = EMMLProfileApps.create(@params['emmlprofileapps'])
    redirect :action => :index
  end

  # POST /EMMLProfileApps/{1}/update
  def update
    @emmlprofileapps = EMMLProfileApps.find(@params['id'])
    @emmlprofileapps.update_attributes(@params['emmlprofileapps']) if @emmlprofileapps
    redirect :action => :index
  end

  # POST /EMMLProfileApps/{1}/delete
  def delete
    @emmlprofileapps = EMMLProfileApps.find(@params['id'])
    @emmlprofileapps.destroy if @emmlprofileapps
    redirect :action => :index  
  end
end
