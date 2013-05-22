require 'rho/rhocontroller'

class ImageController < Rho::RhoController

  @layout = 'Image/layout'

  $camera_main = 'NONE'
  $camera_front = 'NONE'

  $use_new_api = true
  


  def index
    puts "Camera index controller"
    @images = Image.find(:all)

    main_camera = Rho::Camera.getCameraByType(Rho::Camera::CAMERA_TYPE_BACK)
    if main_camera != nil
        $camera_main = 'YES , '+main_camera.maxWidth.to_s+'x'+main_camera.maxHeight.to_s
    end

    front_camera = Rho::Camera.getCameraByType(Rho::Camera::CAMERA_TYPE_FRONT)
    if front_camera != nil
        $camera_front = 'YES , '+front_camera.maxWidth.to_s+'x'+front_camera.maxHeight.to_s
    end

    render :back => '/app'
  end

  def on_take
    puts 'Image.on_take() !'
    en_ed = (@params['enable_editing'] == 'enable')
    pr_size = @params['preferred_size']
    width = 0
    height = 0
    if pr_size == 'size1'
        width = 1000
        height = 1000
    end
    if pr_size == 'size2'
        width = 100
        height = 100
    end
    if pr_size == 'size3'
        width = 10
        height = 10
    end

    settings = { :camera_type => @params['camera_type'], :color_model => @params['color_model'], :enable_editing => en_ed, :desired_width => width, :desired_height => height, :flash_mode => 'auto' }

    cam = nil
    if @params['camera_type'] == 'main'
         cam = Rho::Camera.getCameraByType(Rho::Camera::CAMERA_TYPE_BACK)
    end
    if @params['camera_type'] == 'front'
         cam = Rho::Camera.getCameraByType(Rho::Camera::CAMERA_TYPE_FRONT)
    end

    if cam != nil
        cam.colorModel = @params['color_model']
        cam.enableEditing = en_ed
        cam.desiredWidth = width
        cam.desiredHeight = height
        cam.flashMode = 'auto'
        cam.fileName = File.join(Rho::RhoApplication.get_blob_folder(), Rho::RhoConfig.generate_id.to_s)
        cam.takePicture(nil,  url_for(:action => :camera_callback))
    end 

  end

  def edit
    Rho::Camera.choosePicture({:fileName => File.join(Rho::RhoApplication.get_blob_folder(), Rho::RhoConfig.generate_id.to_s)}, url_for(:action => :camera_callback))
    redirect :action => :index
  end
  
  def delete
    @image = Image.find(@params['id'])
    @image.destroy
    redirect :action => :index
  end
	
  def save_to_gallery
	  img = Image.find(@params['id'])
	  Rho::Camera.saveImageToDeviceGallery(Rho::RhoApplication::get_blob_path(img.image_uri))
	  redirect :action => :index
  end
  
  def open_image
    puts @params.inspect
    Rho::System.open_url(@params['url'])
    redirect :action => :index
  end

  def camera_callback
    if @params['status'] == 'ok'
      #create image record in the DB
      image = Image.new({'image_uri'=>@params['image_uri']})
      image.save
      puts "new Image object: " + image.inspect
      if (((System::get_property('platform') == 'ANDROID') || (System::get_property('platform') == 'APPLE')) && ($use_new_api))
           img_width = @params['image_width']
           img_height = @params['image_height']
           img_format = @params['image_format']
           puts "Captured Image  Size: #{img_width}x#{img_height}, Format: #{img_format} "
      end
    end  
    WebView.navigate( url_for :action => :index )
    #WebView::refresh
    #reply on the callback
    #render :action => :ok, :layout => false
    ""
  end
      
end
