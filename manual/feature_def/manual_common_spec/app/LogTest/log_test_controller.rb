require 'rho/rhocontroller'
require 'helpers/browser_helper'

class LogTestController < Rho::RhoController
  include BrowserHelper

  # GET /LogTest
  def index
    @logtests = LogTest.find(:all)
    render :back => '/app'
  end

  # GET /LogTest/{1}
  def show
    @logtest = LogTest.find(@params['id'])
    if @logtest
      render :action => :show, :back => url_for(:action => :index)
    else
      redirect :action => :index
    end
  end

  # GET /LogTest/new
  def new
    @logtest = LogTest.new
    render :action => :new, :back => url_for(:action => :index)
  end

  # GET /LogTest/{1}/edit
  def edit
    @logtest = LogTest.find(@params['id'])
    if @logtest
      render :action => :edit, :back => url_for(:action => :index)
    else
      redirect :action => :index
    end
  end

  # POST /LogTest/create
  def create
    @logtest = LogTest.create(@params['logtest'])
    redirect :action => :index
  end

  # POST /LogTest/{1}/update
  def update
    @logtest = LogTest.find(@params['id'])
    @logtest.update_attributes(@params['logtest']) if @logtest
    redirect :action => :index
  end

  # POST /LogTest/{1}/delete
  def delete
    @logtest = LogTest.find(@params['id'])
    @logtest.destroy if @logtest
    redirect :action => :index  
  end
end
