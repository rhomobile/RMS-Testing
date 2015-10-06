require 'rho/rhocontroller'
require 'helpers/browser_helper'

class ProductAppFsController < Rho::RhoController
  include BrowserHelper

  # GET /ProductAppFs
  def index
    @productappfs = ProductAppFs.find(:all)
    render :back => '/app'
  end

  # GET /ProductAppFs/{1}
  def show
    @productappfs = ProductAppFs.find(@params['id'])
    if @productappfs
      render :action => :show, :back => url_for(:action => :index)
    else
      redirect :action => :index
    end
  end

  # GET /ProductAppFs/new
  def new
    @productappfs = ProductAppFs.new
    render :action => :new, :back => url_for(:action => :index)
  end

  # GET /ProductAppFs/{1}/edit
  def edit
    @productappfs = ProductAppFs.find(@params['id'])
    if @productappfs
      render :action => :edit, :back => url_for(:action => :index)
    else
      redirect :action => :index
    end
  end

  # POST /ProductAppFs/create
  def create
    @productappfs = ProductAppFs.create(@params['productappfs'])
    redirect :action => :index
  end

  # POST /ProductAppFs/{1}/update
  def update
    @productappfs = ProductAppFs.find(@params['id'])
    @productappfs.update_attributes(@params['productappfs']) if @productappfs
    redirect :action => :index
  end

  # POST /ProductAppFs/{1}/delete
  def delete
    @productappfs = ProductAppFs.find(@params['id'])
    @productappfs.destroy if @productappfs
    redirect :action => :index  
  end
end
