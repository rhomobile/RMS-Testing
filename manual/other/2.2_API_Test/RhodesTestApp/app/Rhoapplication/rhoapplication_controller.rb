require 'rho/rhocontroller'
require 'helpers/browser_helper'

class RhoapplicationController < Rho::RhoController
  include BrowserHelper

  # GET /Rhoapplication
  def index
    puts @images = Image.find(:all)
    render :back => '/app'
  end

  # GET /Rhoapplication/{1}
  def show
    @rhoapplication = Rhoapplication.find(@params['id'])
    if @rhoapplication
      render :action => :show, :back => url_for(:action => :index)
    else
      redirect :action => :index
    end
  end

  # GET /Rhoapplication/new
  def new
    @rhoapplication = Rhoapplication.new
    render :action => :new, :back => url_for(:action => :index)
  end

  # GET /Rhoapplication/{1}/edit
  def edit
    @rhoapplication = Rhoapplication.find(@params['id'])
    if @rhoapplication
      render :action => :edit, :back => url_for(:action => :index)
    else
      redirect :action => :index
    end
  end

  # POST /Rhoapplication/create
  def create
    @rhoapplication = Rhoapplication.create(@params['rhoapplication'])
    redirect :action => :index
  end

  # POST /Rhoapplication/{1}/update
  def update
    @rhoapplication = Rhoapplication.find(@params['id'])
    @rhoapplication.update_attributes(@params['rhoapplication']) if @rhoapplication
    redirect :action => :index
  end

  # POST /Rhoapplication/{1}/delete
  def delete
    @rhoapplication = Rhoapplication.find(@params['id'])
    @rhoapplication.destroy if @rhoapplication
    redirect :action => :index  
  end
end
