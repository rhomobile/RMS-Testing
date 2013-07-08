require 'rho/rhocontroller'
require 'helpers/browser_helper'

class RSMTestController < Rho::RhoController
  include BrowserHelper

  # GET /RSMTest
  def index
    @rsmtests = RSMTest.find(:all)
    render :back => '/app'
  end

  # GET /RSMTest/{1}
  def show
    @rsmtest = RSMTest.find(@params['id'])
    if @rsmtest
      render :action => :show, :back => url_for(:action => :index)
    else
      redirect :action => :index
    end
  end

  # GET /RSMTest/new
  def new
    @rsmtest = RSMTest.new
    render :action => :new, :back => url_for(:action => :index)
  end

  # GET /RSMTest/{1}/edit
  def edit
    @rsmtest = RSMTest.find(@params['id'])
    if @rsmtest
      render :action => :edit, :back => url_for(:action => :index)
    else
      redirect :action => :index
    end
  end

  # POST /RSMTest/create
  def create
    @rsmtest = RSMTest.create(@params['rsmtest'])
    redirect :action => :index
  end

  # POST /RSMTest/{1}/update
  def update
    @rsmtest = RSMTest.find(@params['id'])
    @rsmtest.update_attributes(@params['rsmtest']) if @rsmtest
    redirect :action => :index
  end

  # POST /RSMTest/{1}/delete
  def delete
    @rsmtest = RSMTest.find(@params['id'])
    @rsmtest.destroy if @rsmtest
    redirect :action => :index  
  end
end
