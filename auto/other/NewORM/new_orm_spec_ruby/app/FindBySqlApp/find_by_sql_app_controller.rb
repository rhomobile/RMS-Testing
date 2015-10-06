require 'rho/rhocontroller'
require 'helpers/browser_helper'

class FindBySqlAppController < Rho::RhoController
  include BrowserHelper

  # GET /FindBySqlApp
  def index
    @findbysqlapps = FindBySqlApp.find(:all)
    render :back => '/app'
  end

  # GET /FindBySqlApp/{1}
  def show
    @findbysqlapp = FindBySqlApp.find(@params['id'])
    if @findbysqlapp
      render :action => :show, :back => url_for(:action => :index)
    else
      redirect :action => :index
    end
  end

  # GET /FindBySqlApp/new
  def new
    @findbysqlapp = FindBySqlApp.new
    render :action => :new, :back => url_for(:action => :index)
  end

  # GET /FindBySqlApp/{1}/edit
  def edit
    @findbysqlapp = FindBySqlApp.find(@params['id'])
    if @findbysqlapp
      render :action => :edit, :back => url_for(:action => :index)
    else
      redirect :action => :index
    end
  end

  # POST /FindBySqlApp/create
  def create
    @findbysqlapp = FindBySqlApp.create(@params['findbysqlapp'])
    redirect :action => :index
  end

  # POST /FindBySqlApp/{1}/update
  def update
    @findbysqlapp = FindBySqlApp.find(@params['id'])
    @findbysqlapp.update_attributes(@params['findbysqlapp']) if @findbysqlapp
    redirect :action => :index
  end

  # POST /FindBySqlApp/{1}/delete
  def delete
    @findbysqlapp = FindBySqlApp.find(@params['id'])
    @findbysqlapp.destroy if @findbysqlapp
    redirect :action => :index  
  end
end
