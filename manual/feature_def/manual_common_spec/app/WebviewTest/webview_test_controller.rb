require 'rho/rhocontroller'
require 'helpers/browser_helper'

class WebviewTestController < Rho::RhoController
  include BrowserHelper

  # GET /WebviewTest
  def index
    @webviewtests = WebviewTest.find(:all)
    render :back => '/app'
  end

  # GET /WebviewTest/{1}
  def show
    @webviewtest = WebviewTest.find(@params['id'])
    if @webviewtest
      render :action => :show, :back => url_for(:action => :index)
    else
      redirect :action => :index
    end
  end

  # GET /WebviewTest/new
  def new
    @webviewtest = WebviewTest.new
    render :action => :new, :back => url_for(:action => :index)
  end

  # GET /WebviewTest/{1}/edit
  def edit
    @webviewtest = WebviewTest.find(@params['id'])
    if @webviewtest
      render :action => :edit, :back => url_for(:action => :index)
    else
      redirect :action => :index
    end
  end

  # POST /WebviewTest/create
  def create
    @webviewtest = WebviewTest.create(@params['webviewtest'])
    redirect :action => :index
  end

  # POST /WebviewTest/{1}/update
  def update
    @webviewtest = WebviewTest.find(@params['id'])
    @webviewtest.update_attributes(@params['webviewtest']) if @webviewtest
    redirect :action => :index
  end

  # POST /WebviewTest/{1}/delete
  def delete
    @webviewtest = WebviewTest.find(@params['id'])
    @webviewtest.destroy if @webviewtest
    redirect :action => :index  
  end
end
