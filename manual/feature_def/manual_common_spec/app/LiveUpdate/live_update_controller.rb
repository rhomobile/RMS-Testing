require 'rho/rhocontroller'
require 'helpers/browser_helper'

class LiveUpdateController < Rho::RhoController
  include BrowserHelper

  # GET /LiveUpdate
  def index
    @liveupdates = LiveUpdate.find(:all)
    render :back => '/app/LiveUpdate'
  end

  # GET /LiveUpdate/{1}
  def show
    @liveupdate = LiveUpdate.find(@params['id'])
    if @liveupdate
      render :action => :show, :back => url_for(:action => :index)
    else
      redirect :action => :index
    end
  end

  # GET /LiveUpdate/new
  def new
    @liveupdate = LiveUpdate.new
    render :action => :new, :back => url_for(:action => :index)
  end

  # GET /LiveUpdate/{1}/edit
  def edit
    @liveupdate = LiveUpdate.find(@params['id'])
    if @liveupdate
      render :action => :edit, :back => url_for(:action => :index)
    else
      redirect :action => :index
    end
  end

  # POST /LiveUpdate/create
  def create
    @liveupdate = LiveUpdate.create(@params['liveupdate'])
    redirect :action => :index
  end

  # POST /LiveUpdate/{1}/update
  def update
    @liveupdate = LiveUpdate.find(@params['id'])
    @liveupdate.update_attributes(@params['liveupdate']) if @liveupdate
    redirect :action => :index
  end

  # POST /LiveUpdate/{1}/delete
  def delete
    @liveupdate = LiveUpdate.find(@params['id'])
    @liveupdate.destroy if @liveupdate
    redirect :action => :index  
  end
  def show_popup
    Alert.show_popup "Alert Displayed";
	end
end
