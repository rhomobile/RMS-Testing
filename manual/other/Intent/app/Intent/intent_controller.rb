require 'rho/rhocontroller'
require 'helpers/browser_helper'

class IntentController < Rho::RhoController
  include BrowserHelper

  # GET /Intent
  def index
    @intents = Intent.find(:all)
    render :back => '/app'
  end

  # GET /Intent/{1}
  def show
    @intent = Intent.find(@params['id'])
    if @intent
      render :action => :show, :back => url_for(:action => :index)
    else
      redirect :action => :index
    end
  end

  # GET /Intent/new
  def new
    @intent = Intent.new
    render :action => :new, :back => url_for(:action => :index)
  end

  # GET /Intent/{1}/edit
  def edit
    @intent = Intent.find(@params['id'])
    if @intent
      render :action => :edit, :back => url_for(:action => :index)
    else
      redirect :action => :index
    end
  end

  # POST /Intent/create
  def create
    @intent = Intent.create(@params['intent'])
    redirect :action => :index
  end

  # POST /Intent/{1}/update
  def update
    @intent = Intent.find(@params['id'])
    @intent.update_attributes(@params['intent']) if @intent
    redirect :action => :index
  end

  # POST /Intent/{1}/delete
  def delete
    @intent = Intent.find(@params['id'])
    @intent.destroy if @intent
    redirect :action => :index  
  end
  
  def getAppName
    appName = ''
    case Rho::System.platform
    when "APPLE"
      appName = "manual_common_spec"
    when "WINDOWS"
      appName = "rhomobile Intent/manual_common_spec.exe"
    when "ANDROID"
      appName = "com.rhomobile.manual_common_spec"
    when "WINDOWS_DESKTOP"
      appName = "rhomobile Intent/manual_common_spec.exe"
    end
    appName
  end
  
  def message_notify
    if @params.has_key?("GPS")
      GeoLocation.set_notification (url_for(:action => :geo_callback), "mytag=55", 3)
    elsif @params.has_key?("SCAN")
      Rho::Barcode.take({}, url_for(:action => :scan_callback))
    end
  end
  
  def geo_callback
    puts "$$$$$$$$$$$ GEOCALLBACK : $$$$$$$$$$$$$$$"
    puts "geo_callback : #{@params}"
    
    if @params['known_position'].to_i != 0 && @params['status'] =='ok'
      Rho::System.sendApplicationMessage getAppName, "latitude=#{@params['latitude']}&longitude=#{@params['longitude']}"
    elsif
      Rho::System.sendApplicationMessage getAppName, "latitude=#{@params['status']}&longitude=#{@params['status']}"
    end
  end
  
  def scan_callback
    Rho::System.sendApplicationMessage getAppName, @params.to_s
  end
  
end
