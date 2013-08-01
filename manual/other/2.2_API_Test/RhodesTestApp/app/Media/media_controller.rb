require 'rho/rhocontroller'
require 'helpers/browser_helper'

class MediaController < Rho::RhoController
  include BrowserHelper

  # GET /Media
  def index
    @medium = Media.find(:all)
    render :back => '/app'
  end

  # GET /Media/{1}
  def show
    @media = Media.find(@params['id'])
    if @media
      render :action => :show, :back => url_for(:action => :index)
    else
      redirect :action => :index
    end
  end

  # GET /Media/new
  def new
    @media = Media.new
    render :action => :new, :back => url_for(:action => :index)
  end

  # GET /Media/{1}/edit
  def edit
    @media = Media.find(@params['id'])
    if @media
      render :action => :edit, :back => url_for(:action => :index)
    else
      redirect :action => :index
    end
  end

  # POST /Media/create
  def create
    @media = Media.create(@params['media'])
    redirect :action => :index
  end

  # POST /Media/{1}/update
  def update
    @media = Media.find(@params['id'])
    @media.update_attributes(@params['media']) if @media
    redirect :action => :index
  end

  # POST /Media/{1}/delete
  def delete
    @media = Media.find(@params['id'])
    @media.destroy if @media
    redirect :action => :index  
  end
  def localpath
    
  end
end
