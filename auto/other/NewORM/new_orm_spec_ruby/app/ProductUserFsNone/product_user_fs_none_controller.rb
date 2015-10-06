require 'rho/rhocontroller'
require 'helpers/browser_helper'

class ProductUserFsNoneController < Rho::RhoController
  include BrowserHelper

  # GET /ProductUserFsNone
  def index
    @productuserfsnones = ProductUserFsNone.find(:all)
    render :back => '/app'
  end

  # GET /ProductUserFsNone/{1}
  def show
    @productuserfsnone = ProductUserFsNone.find(@params['id'])
    if @productuserfsnone
      render :action => :show, :back => url_for(:action => :index)
    else
      redirect :action => :index
    end
  end

  # GET /ProductUserFsNone/new
  def new
    @productuserfsnone = ProductUserFsNone.new
    render :action => :new, :back => url_for(:action => :index)
  end

  # GET /ProductUserFsNone/{1}/edit
  def edit
    @productuserfsnone = ProductUserFsNone.find(@params['id'])
    if @productuserfsnone
      render :action => :edit, :back => url_for(:action => :index)
    else
      redirect :action => :index
    end
  end

  # POST /ProductUserFsNone/create
  def create
    @productuserfsnone = ProductUserFsNone.create(@params['productuserfsnone'])
    redirect :action => :index
  end

  # POST /ProductUserFsNone/{1}/update
  def update
    @productuserfsnone = ProductUserFsNone.find(@params['id'])
    @productuserfsnone.update_attributes(@params['productuserfsnone']) if @productuserfsnone
    redirect :action => :index
  end

  # POST /ProductUserFsNone/{1}/delete
  def delete
    @productuserfsnone = ProductUserFsNone.find(@params['id'])
    @productuserfsnone.destroy if @productuserfsnone
    redirect :action => :index  
  end
end
