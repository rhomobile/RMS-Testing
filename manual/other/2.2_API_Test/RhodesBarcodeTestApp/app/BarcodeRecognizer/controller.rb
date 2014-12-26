require 'rho/rhocontroller'

class BarcodeRecognizerController < Rho::RhoController
  @layout = :simplelayout
  
  def index
    puts "Barcode index controller"
    #@barcodes = BarcodeRecognizer.find(:all)
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
  
  def scan_device_name
    $scanners = []
    Barcode.enumerate( url_for(:action => :enum_callback) )    
  end
  
  def enum_callback
    $SC = 0
    puts "enum_callback : #{@params}"
    $scanners = @params['scannerArray']
    $scanners.each do |scan|
      $deviceName << scan['deviceName']
      $SC = $SC + 1
    end
    take_device
  end
  
  def take_device
      #Barcode.stop
      puts "take - using scanner: #{$deviceName[$SC]}"
      Barcode.take_barcode(url_for(:action => :take_callback), {:deviceName => $deviceName[$SC]})
      redirect :action => :wait
  end

  def take_callback_device
      status = @params['status']
      barcode = @params['barcode']

      puts 'take_callback'
      puts 'status = '+status.to_s unless status == nil
      puts 'barcode = '+barcode.to_s unless barcode == nil

      if status == 'ok'
          Alert.show_popup(
              :message => "Device Name : #{$deviceName[$SC]} Barcode["+barcode.to_s+"]",
              :title => "Take barcode",
              :buttons => ["Ok"],
              :callback => url_for(:action => :popup_callback)
          )
      elsif status == 'cancel'
          Alert.show_popup(
              :message => "Device Name : #{$deviceName[$SC]} Barcode taking was canceled !",
              :title => "Take barcode",
              :buttons => ["Ok"],
              :callback => url_for(:action => :popup_callback)
          )
      end
      #Barcode.disable
      #WebView.navigate(url_for(:action => :index))
  end

  def popup_callback
    $SC = $SC - 1
    unless $SC == -1
      take_device
    end
    #puts "popup_callback: #{@params}"
    WebView.navigate url_for(:action => :index)
  end

end
