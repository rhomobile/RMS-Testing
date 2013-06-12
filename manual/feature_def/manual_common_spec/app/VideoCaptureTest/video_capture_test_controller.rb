require 'rho/rhocontroller'
require 'helpers/browser_helper'

class VideoCaptureTestController < Rho::RhoController
  include BrowserHelper

  # GET /VideoCaptureTest
  def index
    @videocapturetests = VideoCaptureTest.find(:all)
    render :back => '/app'
  end

  # GET /VideoCaptureTest/{1}
  def show
    @videocapturetest = VideoCaptureTest.find(@params['id'])
    if @videocapturetest
      render :action => :show, :back => url_for(:action => :index)
    else
      redirect :action => :index
    end
  end

  # GET /VideoCaptureTest/new
  def new
    @videocapturetest = VideoCaptureTest.new
    render :action => :new, :back => url_for(:action => :index)
  end

  # GET /VideoCaptureTest/{1}/edit
  def edit
    @videocapturetest = VideoCaptureTest.find(@params['id'])
    if @videocapturetest
      render :action => :edit, :back => url_for(:action => :index)
    else
      redirect :action => :index
    end
  end

  # POST /VideoCaptureTest/create
  def create
    @videocapturetest = VideoCaptureTest.create(@params['videocapturetest'])
    redirect :action => :index
  end

  # POST /VideoCaptureTest/{1}/update
  def update
    @videocapturetest = VideoCaptureTest.find(@params['id'])
    @videocapturetest.update_attributes(@params['videocapturetest']) if @videocapturetest
    redirect :action => :index
  end

  # POST /VideoCaptureTest/{1}/delete
  def delete
    @videocapturetest = VideoCaptureTest.find(@params['id'])
    @videocapturetest.destroy if @videocapturetest
    redirect :action => :index  
  end
end
