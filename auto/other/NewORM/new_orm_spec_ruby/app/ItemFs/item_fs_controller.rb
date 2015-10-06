require 'rho/rhocontroller'
require 'helpers/browser_helper'

class ItemFsController < Rho::RhoController
  include BrowserHelper

  # GET /ItemFs
  def index
    @itemfs = ItemFs.find(:all)
    render :back => '/app'
  end

  # GET /ItemFs/{1}
  def show
    @itemfs = ItemFs.find(@params['id'])
    if @itemfs
      render :action => :show, :back => url_for(:action => :index)
    else
      redirect :action => :index
    end
  end

  # GET /ItemFs/new
  def new
    @itemfs = ItemFs.new
    render :action => :new, :back => url_for(:action => :index)
  end

  # GET /ItemFs/{1}/edit
  def edit
    @itemfs = ItemFs.find(@params['id'])
    if @itemfs
      render :action => :edit, :back => url_for(:action => :index)
    else
      redirect :action => :index
    end
  end

  # POST /ItemFs/create
  def create
    @itemfs = ItemFs.create(@params['itemfs'])
    redirect :action => :index
  end

  # POST /ItemFs/{1}/update
  def update
    @itemfs = ItemFs.find(@params['id'])
    @itemfs.update_attributes(@params['itemfs']) if @itemfs
    redirect :action => :index
  end

  # POST /ItemFs/{1}/delete
  def delete
    @itemfs = ItemFs.find(@params['id'])
    @itemfs.destroy if @itemfs
    redirect :action => :index  
  end
end
