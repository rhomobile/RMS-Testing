require 'rho/rhocontroller'
require 'helpers/browser_helper'

class BarcodeTestController < Rho::RhoController
  include BrowserHelper

  # GET /BarcodeTest
  def index
    @barcodetests = BarcodeTest.find(:all)
    render :back => '/app'
  end

  # GET /BarcodeTest/{1}
  def show
    @barcodetest = BarcodeTest.find(@params['id'])
    if @barcodetest
      render :action => :show, :back => url_for(:action => :index)
    else
      redirect :action => :index
    end
  end

  # GET /BarcodeTest/new
  def new
    @barcodetest = BarcodeTest.new
    render :action => :new, :back => url_for(:action => :index)
  end

  # GET /BarcodeTest/{1}/edit
  def edit
    @barcodetest = BarcodeTest.find(@params['id'])
    if @barcodetest
      render :action => :edit, :back => url_for(:action => :index)
    else
      redirect :action => :index
    end
  end

  # POST /BarcodeTest/create
  def create
    @barcodetest = BarcodeTest.create(@params['barcodetest'])
    redirect :action => :index
  end

  # POST /BarcodeTest/{1}/update
  def update
    @barcodetest = BarcodeTest.find(@params['id'])
    @barcodetest.update_attributes(@params['barcodetest']) if @barcodetest
    redirect :action => :index
  end

  # POST /BarcodeTest/{1}/delete
  def delete
    @barcodetest = BarcodeTest.find(@params['id'])
    @barcodetest.destroy if @barcodetest
    redirect :action => :index  
  end
end
