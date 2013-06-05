require 'rho/rhocontroller'
require 'helpers/browser_helper'

class KeystateController < Rho::RhoController
  include BrowserHelper

  # GET /Keystate
  def index
    @keystates = Keystate.find(:all)
    render :back => '/app'
  end

  # GET /Keystate/{1}
  def show
    @keystate = Keystate.find(@params['id'])
    if @keystate
      render :action => :show, :back => url_for(:action => :index)
    else
      redirect :action => :index
    end
  end

  # GET /Keystate/new
  def new
    @keystate = Keystate.new
    render :action => :new, :back => url_for(:action => :index)
  end

  # GET /Keystate/{1}/edit
  def edit
    @keystate = Keystate.find(@params['id'])
    if @keystate
      render :action => :edit, :back => url_for(:action => :index)
    else
      redirect :action => :index
    end
  end

  # POST /Keystate/create
  def create
    @keystate = Keystate.create(@params['keystate'])
    redirect :action => :index
  end

  # POST /Keystate/{1}/update
  def update
    @keystate = Keystate.find(@params['id'])
    @keystate.update_attributes(@params['keystate']) if @keystate
    redirect :action => :index
  end

  # POST /Keystate/{1}/delete
  def delete
    @keystate = Keystate.find(@params['id'])
    @keystate.destroy if @keystate
    redirect :action => :index  
  end
end
