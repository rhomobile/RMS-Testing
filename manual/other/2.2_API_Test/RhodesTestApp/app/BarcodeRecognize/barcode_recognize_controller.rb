require 'rho/rhocontroller'
require 'helpers/browser_helper'

class BarcodeRecognizeController < Rho::RhoController
  include BrowserHelper

  # GET /BarcodeRecognize
  def index
    #@barcoderecognizes = BarcodeRecognize.find(:all)
    puts "BHakta"
    render :back => '/app'
  end

  # GET /BarcodeRecognize/{1}
  def show
    @barcoderecognize = BarcodeRecognize.find(@params['id'])
    if @barcoderecognize
      render :action => :show, :back => url_for(:action => :index)
    else
      redirect :action => :index
    end
  end

  # GET /BarcodeRecognize/new
  def new
    @barcoderecognize = BarcodeRecognize.new
    render :action => :new, :back => url_for(:action => :index)
  end

  # GET /BarcodeRecognize/{1}/edit
  def edit
    @barcoderecognize = BarcodeRecognize.find(@params['id'])
    if @barcoderecognize
      render :action => :edit, :back => url_for(:action => :index)
    else
      redirect :action => :index
    end
  end

  # POST /BarcodeRecognize/create
  def create
    @barcoderecognize = BarcodeRecognize.create(@params['barcoderecognize'])
    redirect :action => :index
  end

  # POST /BarcodeRecognize/{1}/update
  def update
    @barcoderecognize = BarcodeRecognize.find(@params['id'])
    @barcoderecognize.update_attributes(@params['barcoderecognize']) if @barcoderecognize
    redirect :action => :index
  end

  # POST /BarcodeRecognize/{1}/delete
  def delete
    @barcoderecognize = BarcodeRecognize.find(@params['id'])
    @barcoderecognize.destroy if @barcoderecognize
    redirect :action => :index  
  end
  
  def start_recognize
    barcode_dir = Dir.open Rho::RhoApplication::get_model_path('app','BarcodeRecognize') + "barcodes"
    bfiles = barcode_dir.entries
    puts "#{bfiles}" 
    bfiles.each do |file| 
      next if file == '.' or file == '..' 
      puts file
      res = Barcode.barcode_recognize(File.join(Rho::RhoApplication::get_model_path('app','BarcodeRecognize')+ "barcodes", file))
      result = file +" : "+ res
      WebView.execute_js('myFunction("'+result+'");')

    end  

  end
end
