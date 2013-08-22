require 'rho/rhocontroller'
require 'helpers/browser_helper'

class CameraImageController < Rho::RhoController
  include BrowserHelper

  def show_signature
              Rho::SignatureCapture.visible(true, :penColor => 0xff0000, :penWidth=>1, :border => true, :bgColor => 0x00ff00 )
            end
            
            def capture_signature          
                Rho::SignatureCapture.capture(url_for( :action => :signature_callback))    
            end
              
            def clear_signature          
                Rho::SignatureCapture.clear()
            end
            
            
            def signature_callback
              if @params['status'] == 'ok'
                #create signature record in the DB
                #signature = CameraImage.new({'signature_uri'=>@params['signature_uri']})
                #image_name = Time.now.to_f.to_s
                #signature = CameraImage.new({'image_uri'=>@params['signature_uri'],'image_name' => image_name})
                signature = CameraImage.new({'image_uri'=>@params['signature_uri']})
                signature.save
                Alert.show_popup("Captured and saved")
                puts "new Signature object: " + signature.inspect
              end  
              WebView.navigate(url_for :action => :index )
              #WebView::refresh
              #reply on the callback
              #render :action => :ok, :layout => false
              ""
            end
            
            def delete
               @signature = CameraImage.find(@params['id'])
               @signature.destroy
               redirect :action => :index
             end
            
            #Imager handling code
             
              def capture_photo    
                if System::get_property('has_camera')
                  Camera::take_picture(url_for(:action => :camera_callback))
                else
                Alert.show_popup("doesn't has camera")
                end
                redirect :action => :index
              end
             
            def camera_callback
               if @params['status'] == 'ok'
                 #create image record in the DB
                 image = CameraImage.new({'image_uri'=>@params['image_uri']})
                 image.save
                 Alert.show_popup("Photo Captured and saved")
                 puts "new Image object: " + image.inspect
          #       if (((System::get_property('platform') == 'ANDROID') || (System::get_property('platform') == 'APPLE')) && ($use_new_api))
          #            img_width = @params['image_width']
          #            img_height = @params['image_height']
          #            img_format = @params['image_format']
          #            puts "Captured Image  Size: #{img_width}x#{img_height}, Format: #{img_format} "
          #       end
               end  
               WebView.navigate( url_for :action => :index )
               #WebView::refresh
               #reply on the callback
               #render :action => :ok, :layout => false
               ""
             end
             
          def setSyncServerUrl
            syncurl=@params['syncUrl']
            Rho::RhoConfig.syncserver=syncurl 
            Alert.show_popup "sync server URL set to #{syncurl}"
          end
               
         
        def doDBRecordCount 
          count=0;
          @dbdata = CameraImage.find(:all)
          @dbdata.each do |x|
          count = count.to_i + 1
          end
          Alert.show_popup "Number of Database records are #{count}"
          redirect :action => :index
        end   
        
  #     def doDBSRecordCount 
  #        count=0;
  #        @dbsdata = BlobBulkTest_s.find(:all)
  #        @dbsdata.each do |x|
  #        count = count.to_i + 1
  #        end
  #        Alert.show_popup "Number of Database records are #{count}"
  #        redirect :action => :index
  #      end   
        
        def startSync
          $eventVal = ""
          #Rho::RhoConfig.bulksync_state='0'
          #SyncEngine.set_notification(-1, "/app/Product/sync_notify", '')
          #SyncEngine.set_notification(CameraImage.get_source_id, "/app/Product/sync_notify", '')
          #SyncEngine.dosync_source(CameraImage.get_source_id.to_i, true)
          SyncEngine.dosync
          redirect :action => :index
        end
    
    
    
  # GET /CameraImage
  def index
    @dbdata = CameraImage.find(:all)
    #@cameraimages = CameraImage.find(:all)
    render :back => '/app'
  end

  # GET /CameraImage/{1}
  def show
    @cameraimage = CameraImage.find(@params['id'])
    if @cameraimage
      render :action => :show, :back => url_for(:action => :index)
    else
      redirect :action => :index
    end
  end

  # GET /CameraImage/new
  def new
    @cameraimage = CameraImage.new
    render :action => :new, :back => url_for(:action => :index)
  end

  # GET /CameraImage/{1}/edit
  def edit
    @cameraimage = CameraImage.find(@params['id'])
    if @cameraimage
      render :action => :edit, :back => url_for(:action => :index)
    else
      redirect :action => :index
    end
  end

  # POST /CameraImage/create
  def create
    @cameraimage = CameraImage.create(@params['cameraimage'])
    redirect :action => :index
  end

  # POST /CameraImage/{1}/update
  def update
    @cameraimage = CameraImage.find(@params['id'])
    @cameraimage.update_attributes(@params['cameraimage']) if @cameraimage
    redirect :action => :index
  end

  # POST /CameraImage/{1}/delete
  def delete
    @cameraimage = CameraImage.find(@params['id'])
    @cameraimage.destroy if @cameraimage
    redirect :action => :index  
  end
end
