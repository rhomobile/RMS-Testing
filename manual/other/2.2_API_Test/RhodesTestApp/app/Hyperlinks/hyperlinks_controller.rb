require 'rho/rhocontroller'
require 'helpers/browser_helper'

class HyperlinksController < Rho::RhoController
  include BrowserHelper

  # GET /Hyperlinks
  def index
    @hyperlinkses = Hyperlinks.find(:all)
    render :back => '/app'
  end

  # GET /Hyperlinks/{1}
  def show
    @hyperlinks = Hyperlinks.find(@params['id'])
    if @hyperlinks
      render :action => :show, :back => url_for(:action => :index)
    else
      redirect :action => :index
    end
  end

  # GET /Hyperlinks/new
  def new
    @hyperlinks = Hyperlinks.new
    render :action => :new, :back => url_for(:action => :index)
  end

  # GET /Hyperlinks/{1}/edit
  def edit
    @hyperlinks = Hyperlinks.find(@params['id'])
    if @hyperlinks
      render :action => :edit, :back => url_for(:action => :index)
    else
      redirect :action => :index
    end
  end

  # POST /Hyperlinks/create
  def create
    @hyperlinks = Hyperlinks.create(@params['hyperlinks'])
    redirect :action => :index
  end

  # POST /Hyperlinks/{1}/update
  def update
    @hyperlinks = Hyperlinks.find(@params['id'])
    @hyperlinks.update_attributes(@params['hyperlinks']) if @hyperlinks
    redirect :action => :index
  end

  # POST /Hyperlinks/{1}/delete
  def delete
    @hyperlinks = Hyperlinks.find(@params['id'])
    @hyperlinks.destroy if @hyperlinks
    redirect :action => :index  
  end
  def send_mail
    WebView.navigate( 'mailto:test@host.com' )
    render :action => :index
  end
end
