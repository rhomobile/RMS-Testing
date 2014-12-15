require 'rho/rhocontroller'
require 'helpers/browser_helper'

class PrinterZebraController < Rho::RhoController
  include BrowserHelper

  # GET /PrinterZebra
  def index
    @printerzebrum = PrinterZebra.find(:all)
    render :back => '/app'
  end

  # GET /PrinterZebra/{1}
  def show
    @printerzebra = PrinterZebra.find(@params['id'])
    if @printerzebra
      render :action => :show, :back => url_for(:action => :index)
    else
      redirect :action => :index
    end
  end

  # GET /PrinterZebra/new
  def new
    @printerzebra = PrinterZebra.new
    render :action => :new, :back => url_for(:action => :index)
  end

  # GET /PrinterZebra/{1}/edit
  def edit
    @printerzebra = PrinterZebra.find(@params['id'])
    if @printerzebra
      render :action => :edit, :back => url_for(:action => :index)
    else
      redirect :action => :index
    end
  end

  # POST /PrinterZebra/create
  def create
    @printerzebra = PrinterZebra.create(@params['printerzebra'])
    redirect :action => :index
  end

  # POST /PrinterZebra/{1}/update
  def update
    @printerzebra = PrinterZebra.find(@params['id'])
    @printerzebra.update_attributes(@params['printerzebra']) if @printerzebra
    redirect :action => :index
  end

  # POST /PrinterZebra/{1}/delete
  def delete
    @printerzebra = PrinterZebra.find(@params['id'])
    @printerzebra.destroy if @printerzebra
    redirect :action => :index  
  end
end
