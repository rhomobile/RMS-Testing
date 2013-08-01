require 'rho/rhocontroller'
require 'helpers/browser_helper'

class ImageController < Rho::RhoController
  include BrowserHelper

  # GET /Image
  def index
    puts "Camera index controller"
    puts @images = Image.find(:all)
    render :back => '/app'
  end

  # GET /Image/{1}
  def show
    @image = Image.find(@params['id'])
    if @image
      render :action => :show, :back => url_for(:action => :index)
    else
      redirect :action => :index
    end
  end

  # GET /Image/new
  def new
    @image = Image.new
    render :action => :new, :back => url_for(:action => :index)
  end

  # GET /Image/{1}/edit
  def edit
    @image = Image.find(@params['id'])
    if @image
      render :action => :edit, :back => url_for(:action => :index)
    else
      redirect :action => :index
    end
  end

  # POST /Image/create
  def create
    @image = Image.create(@params['image'])
    redirect :action => :index
  end

  # POST /Image/{1}/update
  def update
    @image = Image.find(@params['id'])
    @image.update_attributes(@params['image']) if @image
    redirect :action => :index
  end

  # POST /Image/{1}/delete
  def delete
    @image = Image.find(@params['id'])
    @image.destroy if @image
    redirect :action => :index  
  end
  
  #testcase ID VT229-0286
  def get_main_cam_info
    $testCaseID = "VT229-0286"
    main_info = Camera::get_camera_info('main')
    if main_info != nil
         camera_main = 'YES , '+main_info['max_resolution']['width'].to_s+'x'+main_info['max_resolution']['height'].to_s
    end
    puts main_info
    Alert.show_status("MainCamInfo",camera_main,"Dismiss")
    redirect :action => :index
  end

  #testcase ID VT229-0287
  def get_front_cam_info
    $testCaseID = "VT229-0287"
    main_info = Camera::get_camera_info('front')
    if main_info != nil
         camera_front = 'YES , '+main_info['max_resolution']['width'].to_s+'x'+main_info['max_resolution']['height'].to_s
    end
    puts main_info
    Alert.show_status("FrontCamInfo",camera_front,"Dismiss") 
    redirect :action => :index
  end
  
  #testcase ID VT229-0288
  def get_default_cam_info
    $testCaseID = "VT229-0288"
    main_info = Camera::get_camera_info()
    if main_info != nil
         camera_default = 'YES , '+main_info['max_resolution']['width'].to_s+'x'+main_info['max_resolution']['height'].to_s
    end
    puts main_info
    Alert.show_status("DefaultCamInfo",camera_default,"Dismiss") 
  end

  #testcase ID VT229-0290 VT229-0291 VT229-0292
  def choose_pic
    $testCaseID = "VT229-0290"
    Camera::choose_picture(url_for :action => :camera_callback)
  end

  #testcase ID VT229-0293 VT229-0294
  def take_pic
    $testCaseID = "VT229-0293"
    Camera::take_picture(url_for(:action => :camera_callback))
  end

  #testcase ID VT229-0298 (Use Ajax)
  def on_take_main
    $testCaseID = "VT229-0298"
    puts 'Image.on_take() !'
    settings = { :camera_type => 'main' }
    Camera::take_picture(url_for(:action => :camera_callback), settings)
  end
  
  #testcase ID VT229-0299 (Use Ajax)
  def on_take_front
    $testCaseID = "VT229-0299"
    puts 'Image.on_take() !'
    settings = { :camera_type => 'front' }
    Camera::take_picture(url_for(:action => :camera_callback), settings)
  end
  
  #testcase ID VT229-0299 (Use Ajax)
  def on_take_default
    $testCaseID = "VT229-0300"
    puts 'Image.on_take() !'
    settings = { :camera_type => '' }
    Camera::take_picture(url_for(:action => :camera_callback), settings)
  end
  
  #testcase ID VT229-0302
  def on_take_main_color_RGB
    $testCaseID = "VT229-0302"
    puts 'Image.on_take() !'
    settings = { :camera_type => 'main',:color_model => 'RGB' }
    Camera::take_picture(url_for(:action => :camera_callback), settings)
  end
  
  #testcase ID VT229-0302-A
  def on_take_main_color_grayscale
    $testCaseID = "VT229-0302-A"
    puts 'Image.on_take() !'
    settings = { :camera_type => 'main',:color_model => 'Grayscale' }
    Camera::take_picture(url_for(:action => :camera_callback), settings)
  end
  
  #testcase ID VT229-0302-B
  def on_take_front_color_RGB
    $testCaseID = "VT229-0302-B"
    puts 'Image.on_take() !'
    settings = { :camera_type => 'front',:color_model => 'RGB' }
    Camera::take_picture(url_for(:action => :camera_callback), settings)
  end
  
  #testcase ID VT229-0302-C
  def on_take_front_color_grayscale
    $testCaseID = "VT229-0302-C"
    puts 'Image.on_take() !'
    settings = { :camera_type => 'front',:color_model => 'Grayscale' }
    Camera::take_picture(url_for(:action => :camera_callback), settings)
  end
  
  #testcase ID VT229-0303
  def on_take_edit
    $testCaseID = "VT229-0303"
    puts 'Image.on_take() !'
    settings = { :camera_type => 'front',:enable_editing => 'true' }
    Camera::take_picture(url_for(:action => :camera_callback), settings)
  end
  
  #testcase ID VT229-
  def on_take_width
    $testCaseID = "VT229-0304"
    puts 'Image.on_take() !'
    settings = { :camera_type => 'main',:desired_width => '300' }
    Camera::take_picture(url_for(:action => :camera_callback), settings)
  end
  
  #testcase ID VT229-
  def on_take_height
    $testCaseID = "VT229-0308"
    puts 'Image.on_take() !'
    settings = { :camera_type => 'main',:desired_height => '500' }
    Camera::take_picture(url_for(:action => :camera_callback), settings)
  end
  
  #testcase ID VT229-
  def on_take_width_height
    $testCaseID = "VT229-"
    puts 'Image.on_take() !'
    settings = { :camera_type => 'main',:desired_width => '300',:desired_height => '500' }
    Camera::take_picture(url_for(:action => :camera_callback), settings)
  end
  
  #testcase ID VT229-0312
  def on_take_flash_on
    $testCaseID = "VT229-"
    puts 'Image.on_take() !'
    settings = { :camera_type => 'main', :flash_mode => 'on' }
    Camera::take_picture(url_for(:action => :camera_callback), settings)
  end
  
  #testcase ID VT229-0313
  def on_take_flash_off
    $testCaseID = "VT229-0313"
    puts 'Image.on_take() !'
    settings = { :camera_type => 'main', :flash_mode => 'off' }
    Camera::take_picture(url_for(:action => :camera_callback), settings)
  end
  
  #testcase ID VT229-0314
  def on_take_flash_auto
    $testCaseID = "VT229-0314"
    puts 'Image.on_take() !'
    settings = { :camera_type => 'main',:flash_mode => 'auto' }
    Camera::take_picture(url_for(:action => :camera_callback), settings)
  end
  
  #testcase ID VT229-0315
  def on_take_flash_torch
    $testCaseID = "VT229-0315"
    puts 'Image.on_take() !'
    settings = { :camera_type => 'main',:flash_mode => 'torch' }
    Camera::take_picture(url_for(:action => :camera_callback), settings)
  end
  
  #testcase ID VT229-0316
  def on_take_flash_redeye
    $testCaseID = "VT229-0316"
    puts 'Image.on_take() !'
    settings = { :camera_type => 'main',:flash_mode => 'red-eye' }
    Camera::take_picture(url_for(:action => :camera_callback), settings)
  end
  
  #testcase ID VT229-0317
  def on_take_format_jpg
    $testCaseID = "VT229-0317"
    puts 'Image.on_take() !'
    settings = { :camera_type => 'main',:format => 'jpg' }
    Camera::take_picture(url_for(:action => :camera_callback), settings)
  end
  
  #testcase ID VT229-0318
  def on_take_format_png
    $testCaseID = "VT229-0318"
    puts 'Image.on_take() !'
    settings = { :camera_type => 'main',:format => 'png' }
    Camera::take_picture(url_for(:action => :camera_callback), settings)
  end
  
  #testcase ID VT229-0319
  def on_take_format_default
    $testCaseID = "VT229-0319"
    puts 'Image.on_take() !'
    settings = { :camera_type => 'main',:format => '' }
    Camera::take_picture(url_for(:action => :camera_callback), settings)
  end
  
  
  
  def camera_callback
    puts "Camera CallBack Params: #{@params}"
    if @params['status'] == 'ok'
      #create image record in the DB
      image = Image.new({'image_uri'=>@params['image_uri']})
      image.save
      puts "new Image object: " + image.inspect
      if (((System::get_property('platform') == 'ANDROID') || (System::get_property('platform') == 'APPLE')))
           img_width = @params['image_width']
           img_height = @params['image_height']
           img_format = @params['image_format']
           puts "Captured Image  Size: #{img_width}x#{img_height}, Format: #{img_format} "
           img_info = "W * H #{img_width}x#{img_height}, Format: #{img_format}"
           Alert.show_status("ImgInfo",img_info,"Dismiss")
      end
    end
    if @params['status'] == 'cancel'
      Alert.show_status("Cancel",@params['message'],"Dismiss")
    end  
    WebView.navigate( url_for :action => :index )
    #WebView::refresh
    #reply on the callback
    #render :action => :ok, :layout => false
    ""
  end
  
  # POST /Image/{1}/delete
  def deleteall
    Alert.show_status("Deleted",'Delete','Dismiss');
    Image.delete_all
    redirect :action => :index  
  end
  

  
end
