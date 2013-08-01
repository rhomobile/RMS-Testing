require 'rho/rhocontroller'
require 'helpers/browser_helper'

class RunExternalappController < Rho::RhoController
  include BrowserHelper

  # GET /RunExternalapp
  def index
    @runexternalapps = RunExternalapp.find(:all)
    render :back => '/app'
  end

  # GET /RunExternalapp/{1}
  def show
    @runexternalapp = RunExternalapp.find(@params['id'])
    if @runexternalapp
      render :action => :show, :back => url_for(:action => :index)
    else
      redirect :action => :index
    end
  end

  # GET /RunExternalapp/new
  def new
    @runexternalapp = RunExternalapp.new
    render :action => :new, :back => url_for(:action => :index)
  end

  # GET /RunExternalapp/{1}/edit
  def edit
    @runexternalapp = RunExternalapp.find(@params['id'])
    if @runexternalapp
      render :action => :edit, :back => url_for(:action => :index)
    else
      redirect :action => :index
    end
  end

  # POST /RunExternalapp/create
  def create
    @runexternalapp = RunExternalapp.create(@params['runexternalapp'])
    redirect :action => :index
  end

  # POST /RunExternalapp/{1}/update
  def update
    @runexternalapp = RunExternalapp.find(@params['id'])
    @runexternalapp.update_attributes(@params['runexternalapp']) if @runexternalapp
    redirect :action => :index
  end

  # POST /RunExternalapp/{1}/delete
  def delete
    @runexternalapp = RunExternalapp.find(@params['id'])
    @runexternalapp.destroy if @runexternalapp
    redirect :action => :index  
  end
  
  def open_rhodes_pdf_http_url
    http_url ="http://www.naver.com/test.pdf"
    System.open_url(http_url)
    redirect :action => :index
  end
  
  def open_rhodes_pdf_ftp_url
    ftp_url ="ftp://www.naver.com/test.pdf" 
    System.open_url(ftp_url) 
    redirect :action => :index
  end
end
