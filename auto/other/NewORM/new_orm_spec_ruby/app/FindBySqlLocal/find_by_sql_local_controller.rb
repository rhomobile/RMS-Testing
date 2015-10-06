require 'rho/rhocontroller'
require 'helpers/browser_helper'

class FindBySqlLocalController < Rho::RhoController
  include BrowserHelper

  # GET /FindBySqlLocal
  def index
    @findbysqllocals = FindBySqlLocal.find(:all)
    render :back => '/app'
  end

  # GET /FindBySqlLocal/{1}
  def show
    @findbysqllocal = FindBySqlLocal.find(@params['id'])
    if @findbysqllocal
      render :action => :show, :back => url_for(:action => :index)
    else
      redirect :action => :index
    end
  end

  # GET /FindBySqlLocal/new
  def new
    @findbysqllocal = FindBySqlLocal.new
    render :action => :new, :back => url_for(:action => :index)
  end

  # GET /FindBySqlLocal/{1}/edit
  def edit
    @findbysqllocal = FindBySqlLocal.find(@params['id'])
    if @findbysqllocal
      render :action => :edit, :back => url_for(:action => :index)
    else
      redirect :action => :index
    end
  end

  # POST /FindBySqlLocal/create
  def create
    @findbysqllocal = FindBySqlLocal.create(@params['findbysqllocal'])
    redirect :action => :index
  end

  # POST /FindBySqlLocal/{1}/update
  def update
    @findbysqllocal = FindBySqlLocal.find(@params['id'])
    @findbysqllocal.update_attributes(@params['findbysqllocal']) if @findbysqllocal
    redirect :action => :index
  end

  # POST /FindBySqlLocal/{1}/delete
  def delete
    @findbysqllocal = FindBySqlLocal.find(@params['id'])
    @findbysqllocal.destroy if @findbysqllocal
    redirect :action => :index  
  end
end
