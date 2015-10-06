require 'rho/rhocontroller'
require 'helpers/browser_helper'

class ProductAppPbController < Rho::RhoController
  include BrowserHelper

  # GET /ProductAppPb
  def index
    @productapppbs = ProductAppPb.find(:all)
    render :back => '/app'
  end

  # GET /ProductAppPb/{1}
  def show
    @productapppb = ProductAppPb.find(@params['id'])
    if @productapppb
      render :action => :show, :back => url_for(:action => :index)
    else
      redirect :action => :index
    end
  end

  # GET /ProductAppPb/new
  def new
    @productapppb = ProductAppPb.new
    render :action => :new, :back => url_for(:action => :index)
  end

  # GET /ProductAppPb/{1}/edit
  def edit
    @productapppb = ProductAppPb.find(@params['id'])
    if @productapppb
      render :action => :edit, :back => url_for(:action => :index)
    else
      redirect :action => :index
    end
  end

  # POST /ProductAppPb/create
  def create
    @productapppb = ProductAppPb.create(@params['productapppb'])
    redirect :action => :index
  end

  # POST /ProductAppPb/{1}/update
  def update
    @productapppb = ProductAppPb.find(@params['id'])
    @productapppb.update_attributes(@params['productapppb']) if @productapppb
    redirect :action => :index
  end

  # POST /ProductAppPb/{1}/delete
  def delete
    @productapppb = ProductAppPb.find(@params['id'])
    @productapppb.destroy if @productapppb
    redirect :action => :index  
  end
end
