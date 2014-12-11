require 'rho/rhocontroller'
require 'helpers/browser_helper'

class AjaxbridgeController < Rho::RhoController
  include BrowserHelper

  # GET /Ajaxbridge
  def index
    @ajaxbridges = Ajaxbridge.find(:all)
    render :back => '/app'
  end

  # GET /Ajaxbridge/{1}
  def show
    @ajaxbridge = Ajaxbridge.find(@params['id'])
    if @ajaxbridge
      render :action => :show, :back => url_for(:action => :index)
    else
      redirect :action => :index
    end
  end

  # GET /Ajaxbridge/new
  def new
    @ajaxbridge = Ajaxbridge.new
    render :action => :new, :back => url_for(:action => :index)
  end

  # GET /Ajaxbridge/{1}/edit
  def edit
    @ajaxbridge = Ajaxbridge.find(@params['id'])
    if @ajaxbridge
      render :action => :edit, :back => url_for(:action => :index)
    else
      redirect :action => :index
    end
  end

  # POST /Ajaxbridge/create
  def create
    @ajaxbridge = Ajaxbridge.create(@params['ajaxbridge'])
    redirect :action => :index
  end

  # POST /Ajaxbridge/{1}/update
  def update
    @ajaxbridge = Ajaxbridge.find(@params['id'])
    @ajaxbridge.update_attributes(@params['ajaxbridge']) if @ajaxbridge
    redirect :action => :index
  end

  # POST /Ajaxbridge/{1}/delete
  def delete
    @ajaxbridge = Ajaxbridge.find(@params['id'])
    @ajaxbridge.destroy if @ajaxbridge
    redirect :action => :index  
  end
end
