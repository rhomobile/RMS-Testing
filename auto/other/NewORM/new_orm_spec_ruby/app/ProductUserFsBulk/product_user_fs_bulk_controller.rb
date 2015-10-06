require 'rho/rhocontroller'
require 'helpers/browser_helper'

class ProductUserFsBulkController < Rho::RhoController
  include BrowserHelper

  # GET /ProductUserFsBulk
  def index
    @productuserfsbulks = ProductUserFsBulk.find(:all)
    render :back => '/app'
  end

  # GET /ProductUserFsBulk/{1}
  def show
    @productuserfsbulk = ProductUserFsBulk.find(@params['id'])
    if @productuserfsbulk
      render :action => :show, :back => url_for(:action => :index)
    else
      redirect :action => :index
    end
  end

  # GET /ProductUserFsBulk/new
  def new
    @productuserfsbulk = ProductUserFsBulk.new
    render :action => :new, :back => url_for(:action => :index)
  end

  # GET /ProductUserFsBulk/{1}/edit
  def edit
    @productuserfsbulk = ProductUserFsBulk.find(@params['id'])
    if @productuserfsbulk
      render :action => :edit, :back => url_for(:action => :index)
    else
      redirect :action => :index
    end
  end

  # POST /ProductUserFsBulk/create
  def create
    @productuserfsbulk = ProductUserFsBulk.create(@params['productuserfsbulk'])
    redirect :action => :index
  end

  # POST /ProductUserFsBulk/{1}/update
  def update
    @productuserfsbulk = ProductUserFsBulk.find(@params['id'])
    @productuserfsbulk.update_attributes(@params['productuserfsbulk']) if @productuserfsbulk
    redirect :action => :index
  end

  # POST /ProductUserFsBulk/{1}/delete
  def delete
    @productuserfsbulk = ProductUserFsBulk.find(@params['id'])
    @productuserfsbulk.destroy if @productuserfsbulk
    redirect :action => :index  
  end
end
