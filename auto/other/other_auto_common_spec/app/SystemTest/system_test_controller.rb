require 'rho/rhocontroller'
require 'helpers/browser_helper'

class SystemTestController < Rho::RhoController
  include BrowserHelper

  # GET /SystemTest
  def index
    @systemtests = SystemTest.find(:all)
    render :back => '/app'
  end

  # GET /SystemTest/{1}
  def show
    @systemtest = SystemTest.find(@params['id'])
    if @systemtest
      render :action => :show, :back => url_for(:action => :index)
    else
      redirect :action => :index
    end
  end

  # GET /SystemTest/new
  def new
    @systemtest = SystemTest.new
    render :action => :new, :back => url_for(:action => :index)
  end

  # GET /SystemTest/{1}/edit
  def edit
    @systemtest = SystemTest.find(@params['id'])
    if @systemtest
      render :action => :edit, :back => url_for(:action => :index)
    else
      redirect :action => :index
    end
  end

  # POST /SystemTest/create
  def create
    @systemtest = SystemTest.create(@params['systemtest'])
    redirect :action => :index
  end

  # POST /SystemTest/{1}/update
  def update
    @systemtest = SystemTest.find(@params['id'])
    @systemtest.update_attributes(@params['systemtest']) if @systemtest
    redirect :action => :index
  end

  # POST /SystemTest/{1}/delete
  def delete
    @systemtest = SystemTest.find(@params['id'])
    @systemtest.destroy if @systemtest
    redirect :action => :index  
  end
end
