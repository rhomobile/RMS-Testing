require 'rho/rhocontroller'
require 'helpers/browser_helper'

class BatteryTestController < Rho::RhoController
  include BrowserHelper

  # GET /BatteryTest
  def index
    @batterytests = BatteryTest.find(:all)
    render :back => '/app'
  end

  # GET /BatteryTest/{1}
  def show
    @batterytest = BatteryTest.find(@params['id'])
    if @batterytest
      render :action => :show, :back => url_for(:action => :index)
    else
      redirect :action => :index
    end
  end

  # GET /BatteryTest/new
  def new
    @batterytest = BatteryTest.new
    render :action => :new, :back => url_for(:action => :index)
  end

  # GET /BatteryTest/{1}/edit
  def edit
    @batterytest = BatteryTest.find(@params['id'])
    if @batterytest
      render :action => :edit, :back => url_for(:action => :index)
    else
      redirect :action => :index
    end
  end

  # POST /BatteryTest/create
  def create
    @batterytest = BatteryTest.create(@params['batterytest'])
    redirect :action => :index
  end

  # POST /BatteryTest/{1}/update
  def update
    @batterytest = BatteryTest.find(@params['id'])
    @batterytest.update_attributes(@params['batterytest']) if @batterytest
    redirect :action => :index
  end

  # POST /BatteryTest/{1}/delete
  def delete
    @batterytest = BatteryTest.find(@params['id'])
    @batterytest.destroy if @batterytest
    redirect :action => :index  
  end
end
