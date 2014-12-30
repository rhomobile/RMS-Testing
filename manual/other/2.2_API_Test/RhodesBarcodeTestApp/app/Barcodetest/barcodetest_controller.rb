require 'rho/rhocontroller'
require 'helpers/browser_helper'

class BarcodetestController < Rho::RhoController
  include BrowserHelper

  # GET /Barcodetest
  def index
    #@barcodetests = Barcodetest.find(:all)
    render :back => '/app'
  end

  def new

    if ((System::get_property('platform') == 'ANDROID') || (System::get_property('platform') == 'APPLE'))
      settings = { :color_model => 'Grayscale', :desired_width => 1000, :desired_height => 1000 }
      Camera::take_picture(url_for(:action => :camera_callback), settings)
    else 
      Camera::take_picture(url_for :action => :camera_callback)
    end
    redirect :action => :index
  end

  def take
    Barcode.take_barcode(url_for(:action => :take_callback), {})
    #Barcode.take_barcode(url_for(:action => :take_callback), {:camera => 'front'})
    redirect :action => :index
  end
    
  #testcase ID VT229-0329
  def take_front_cam
    $testCaseID = "VT229-0329"
    #Barcode.take_barcode(url_for(:action => :take_callback), {})
    Barcode.take_barcode(url_for(:action => :take_callback), {:camera => 'front'})
    redirect :action => :index
  end
  
  def take_callback
    status = @params['status']
    barcode = @params['barcode']

    puts 'BarcodeRecognizer::take_callback !'
    puts 'status = '+status.to_s unless status == nil
    puts 'barcode = '+barcode.to_s unless barcode == nil

    if status == 'ok'
       show_barcode_info(barcode)
    end
    if status == 'cancel'
       Alert.show_popup  ('Barcode taking was canceled !')  
    end
    redirect :action => :index
  end
  
  def edit
    Camera::choose_picture(url_for :action => :camera_callback)
    #redirect :action => :index
    ""
  end
    
  def delete
    @image = BarcodeRecognizer.find(@params['id'])
    @image.destroy
    redirect :action => :index
  end

  def rescan
    if @params['url'] != nil
      show_barcode_info (Barcode.barcode_recognize(Rho::RhoApplication::get_blob_path(@params['url']))) 
    end
    redirect :action => :index
  end


  def camera_callback
    WebView.navigate( url_for :action => :index )
    show_barcode_info (Barcode.barcode_recognize(Rho::RhoApplication::get_blob_path(@params['image_uri']))) 
    ""
  end


  def camera_callback_and_add
    if @params['status'] == 'ok'
      #create image record in the DB
      image = BarcodeRecognizer.new({'image_uri'=>@params['image_uri']})
      image.save
      puts "new Image object: " + image.inspect
    end  
    WebView.navigate( url_for :action => :index )
    #WebView::refresh
    #reply on the callback
    #render :action => :ok, :layout => false
    show_barcode_info (Barcode.barcode_recognize(Rho::RhoApplication::get_blob_path(@params['image_uri']))) 
    ""
  end

  def scan1
    show_barcode_info (Barcode.barcode_recognize(File.join(Rho::RhoApplication::get_model_path('app','BarcodeRecognizer'), 'Barcode_UPC_01.png')))
    redirect :action => :index
  end

  def scan2
    show_barcode_info (Barcode.barcode_recognize(File.join(Rho::RhoApplication::get_model_path('app','BarcodeRecognizer'), 'Barcode_UPC_02.jpg')))
    redirect :action => :index
  end

  def scan3
    show_barcode_info (Barcode.barcode_recognize(File.join(Rho::RhoApplication::get_model_path('app','BarcodeRecognizer'), 'Barcode_QR_01.png')))
    redirect :action => :index
  end

  def show_barcode_info(recognized_code)
    Alert.show_popup  ('Barcode['+recognized_code.to_s+']')  
  end
  
  #test caseid VT229-0330
  def take_device_scn1
      $testCaseID = "VT229-0330"
      puts "take - using scanner Hard Coded: SCN1}"
      Barcode.take_barcode(url_for(:action => :take_callback), {:deviceName => 'SCN1'})
      redirect :action => :index
  end
  
  #test caseid VT229-0331  
  def take_device_scn2
    $testCaseID = "VT229-0331"
    puts "take - using scanner Hard Coded: SCN2}"
    Barcode.take_barcode(url_for(:action => :take_callback), {:deviceName => 'SCN2'})
    redirect :action => :index
  end
  
  #test caseid VT229-0332 
  def enumerate
    $testCaseID = "VT229-0332"
    Barcode.enumerate( url_for(:action => :enum_callback) )
    redirect :action => :index
  end
  
  def enum_callback
    puts "enum_callback : #{@params}"
    result = ''
    @params.each do |thing|
      thing.each do |details|
        result = result.to_s() + details.map{|k,v| "#{k}=#{v}"}.join(' ')
      end
    end
    #Alert.show_status(@params, "Enumerate", "Dismiss")
    WebView.execute_js('barcodelog("'+result+'");')
  end
  
  #test caseid VT229-0333
  def enable_scanner_SCN1
    $testCaseID = "VT229-0333"
    Barcode.enable(url_for(:action => :enable_callback), {:deviceName=>'SCN1'})
    redirect :action => :index
  end
  
  #test caseid VT229-0334
  def enable_scanner_SCN2
  $testCaseID = "VT229-0334"
  Barcode.enable(url_for(:action => :enable_callback), {:deviceName=>'SCN2'})
    redirect :action => :index
  end
  
  #test caseid VT229-0335
  def enable_scanner_default
    $testCaseID = "VT229-0335"
    Barcode.enable(url_for(:action => :enable_callback), {:deviceName=>''})
    redirect :action => :index
  end
  
  #test caseid VT229-0336
  def enable_scanner_default_2
    $testCaseID = "VT229-0336"
    Barcode.enable(url_for(:action => :enable_callback))
    redirect :action => :index
  end
  
  def enable_callback
    result = ''
    @params.each do |thing|
      result = result.to_s() + "<br>" + thing.map{|k,v| "#{k}=#{v}"}.join(' ') + "<br/>" 
    end
    WebView.execute_js('barcodelog("'+result+'");')
  end
  
  #test caseid VT229-0337
  def enable_disable_scanner
    puts "Barcode.enable called"
  $testCaseID = "VT229-0337"
  Barcode.enable(url_for(:action => :enable_disable_callback), {:deviceName=>'SCN1'})
    redirect :action => :index
  end
  
  def enable_disable_callback
    Puts "Waiting for 5 sec to disable Scanner"
    Rho::Timer.start(5000, (url_for :action => :timer_callback), "test")
    redirect :action => :index
  end
  
  def timer_callback
    puts "Barcode.disable called"
    Barcode.disable
    redirect :action => :index
  end
  
  #test caseid VT229-0338
  def enable_start_stop_1
    puts "Barcode.enable called SCN1"
    $testCaseID = "VT229-0338"
    Barcode.enable(url_for(:action => :enable_start_callback), {:deviceName=>'SCN1'})
    redirect :action => :index
  end
  
  #test caseid VT229-0339
  def enable_start_stop_2
    puts "Barcode.enable called SCN2"
    $testCaseID = "VT229-0339"
    Barcode.enable(url_for(:action => :enable_start_callback), {:deviceName=>'SCN2'})
    redirect :action => :index
  end
  
  def enable_start_callback
    Puts "Waiting for 2 sec to start Scanner"
    Rho::Timer.start(2000, (url_for :action => :timer_start_callback), "test")
    redirect :action => :index
   end
   
   def timer_start_callback
    puts "Barcode.start called SCN1"
    Barcode.start
    Rho::Timer.start(5000, (url_for :action => :timer_stop_callback), "test")
     redirect :action => :index
   end
   
   def timer_stop_callback
     puts "Barcode.stop called SCN1"
     Barcode.stop
     redirect :action => :index
   end
  
  #test caseid VT229-0340
  def disable_start_scn1
  $testCaseID = "VT229-0340"
  enable_scanner_SCN1
  Rho::Timer.start(5000, (url_for :action => :timer_disable_start_callback), "test")
    redirect :action => :index
  end
  
  #test caseid VT229-0341
  def disable_start_scn2
  $testCaseID = "VT229-0341"
  enable_scanner_SCN2
  Rho::Timer.start(5000, (url_for :action => :timer_disable_start_callback), "test")
    redirect :action => :index
  end
  
  def timer_disable_start_callback
    Barcode.disable
    Rho::Timer.start(5000, (url_for :action => :barcode_disable_start_callback), "test")
    redirect :action => :index
  end
  
  def barcode_disable_start_callback
    Barcode.stop
    redirect :action => :index
  end
  
  def enableScanner
    puts scannerType = @params['type']
    Barcode.enable(url_for(:action => :enable_callback), {:deviceName=>scannerType})
  end
  
  def disableScanner
    Barcode.disable
  end
  
  def startScanner
    Barcode.start
  end
  
  def stopScanner
    Barcode.stop
  end
  
end
