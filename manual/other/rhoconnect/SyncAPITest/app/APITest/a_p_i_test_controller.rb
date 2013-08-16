require 'rho/rhocontroller'
require 'helpers/browser_helper'

class APITestController < Rho::RhoController
  include BrowserHelper

  # GET /APITest
  def index
    @apitests = APITest.find(:all)
    render :back => '/app'
  end

  # GET /APITest/{1}
  def show
    @apitest = APITest.find(@params['id'])
    if @apitest
      render :action => :show, :back => url_for(:action => :index)
    else
      redirect :action => :index
    end
  end

  # GET /APITest/new
  def new
    @apitest = APITest.new
    render :action => :new, :back => url_for(:action => :index)
  end

  # GET /APITest/{1}/edit
  def edit
    @apitest = APITest.find(@params['id'])
    if @apitest
      render :action => :edit, :back => url_for(:action => :index)
    else
      redirect :action => :index
    end
  end

  # POST /APITest/create
  def create
    @apitest = APITest.create(@params['apitest'])
    redirect :action => :index
  end

  # POST /APITest/{1}/update
  def update
    @apitest = APITest.find(@params['id'])
    @apitest.update_attributes(@params['apitest']) if @apitest
    redirect :action => :index
  end

  # POST /APITest/{1}/delete
  def delete
    @apitest = APITest.find(@params['id'])
    @apitest.destroy if @apitest
    redirect :action => :index  
  end
end
