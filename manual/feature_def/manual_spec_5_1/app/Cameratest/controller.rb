require 'rho/rhocontroller'
require 'json'
require 'helpers/application_helper'
require 'helpers/browser_helper'

class CameratestController < Rho::RhoController

$camera = nil
camerapath = Rho::Application.modelFolderPath("Cameratest")
@@sampleimage = Rho::RhoFile.join(camerapath, "/samplemedia/zebratechnologies.jpg")
@@soundwav = Rho::RhoFile.join(camerapath, "/samplemedia/cheering.wav")
@@soundmp3 = Rho::RhoFile.join(camerapath, "/samplemedia/glassbreak.mp3")

def set_camera
	camera_type = @params['camera_type']
	@obj = Rho::Camera.enumerate()

	@obj.each do |camObj|
	  $camera = camObj if camObj.cameraType == camera_type
	end
end

## callback methods
def camera_callback
  	@callback_data = "Status - " + @params['status']
  	@callback_data += ", Message - " + @params['message'] if(@params['message'])
	@callback_data += ", imageHeight - " + @params['imageHeight'].to_s if(@params['imageHeight'])
	@callback_data += ", imageWidth - " + @params['imageWidth'].to_s if(@params['imageWidth'])
	@callback_data += ", imageFormat - " + @params['imageFormat'] if(@params['imageFormat'])
	@data_uri = @params['imageUri'].gsub(/(?=\W)/, '\\') if @params['imageUri']

	Rho::WebView.executeJavascript('document.getElementById("expected").innerHTML= "'+@callback_data+'";')
	Rho::WebView.executeJavascript('document.getElementById("image").innerHTML= "imageUri - '+@data_uri+'";')
	Rho::WebView.executeJavascript('document.getElementById("imageUri").src = "'+@data_uri+'";')
end

def preview_callback
  	@callback_data = "Status - " + @params['status']
  	@callback_data += ", Message - " + @params['message'] if(@params['message'])
	@callback_data += ", imageHeight - " + @params['imageHeight'].to_s if(@params['imageHeight'])
	@callback_data += ", imageWidth - " + @params['imageWidth'].to_s if(@params['imageWidth'])
	@callback_data += ", imageFormat - " + @params['imageFormat'] if(@params['imageFormat'])
	@data_uri = @params['imageUri'].gsub(/(?=\W)/, '\\') if @params['imageUri']
	#$camera.hidePreview()

	Rho::WebView.executeJavascript('document.getElementById("expected").innerHTML= "'+@callback_data+'";')
	Rho::WebView.executeJavascript('document.getElementById("image").innerHTML= "imageUri - '+@data_uri+'";')
	Rho::WebView.executeJavascript('document.getElementById("imageUri").src = "'+@data_uri+'";')
end

def get_callback
	@callback_data = " "
 	#Alert.show_popup(@params['result'][0].cameraType.to_s)
	@params['result'].each_with_index do |enum, index|
		@callback_data += "cameraType- " + enum.cameraType.to_s + "; "
	end
	Rho::WebView.executeJavascript('document.getElementById("expected").innerHTML= "'+@callback_data+'";')
end

def get_camera_cb	
	@params['result'].takePicture({}, url_for(:action => :camera_callback))
end


## camera api methods
def choose_picture
	@props = {}
	if @params['outputFormat']
		@props['outputFormat'] = @params['outputFormat'] 
	else
		@props['outputFormat'] = 'image'
	end	
	@props['imageFormat'] = @params['imageFormat'] if @params['imageFormat']
	@props['colorModel'] = @params['colorModel'] if @params['colorModel']
	@props['desiredHeight'] = @params['desiredHeight'].to_i if @params['desiredHeight']
	@props['desiredWidth'] = @params['desiredWidth'].to_i if @params['desiredWidth']
	@props['compressionFormat'] = @params['compressionFormat'] if @params['compressionFormat']
	if @params['enableEditing']
		if @params['enableEditing'] == 'true'
			@props['enableEditing'] = true	
		else
			@props['enableEditing'] = false
		end
	end

	Rho::Camera.choosePicture(@props, url_for(:action => :camera_callback))
end

def copyto_gallery
	if @params['option']
		if @params['option'] == 'invalid'
			Rho::Camera.copyImageToDeviceGallery('/programfiles/invalid.jpg')
		else
			#Rho::Camera.copyImageToDeviceGallery('/programfiles/invalid.jpg')
		end
	else
		Rho::Camera.copyImageToDeviceGallery(@@sampleimage)
	end
end

def camera_enumerate
	#Rho::Camera.enumerate(url_for(:action => :get_callback))
	@callback_data = " "
	@obj = Rho::Camera.enumerate()
	@obj.each do |camObj|
		@callback_data += camObj.cameraType.to_s + "; "
	end
	Rho::WebView.executeJavascript('document.getElementById("expected").innerHTML= "'+@callback_data+'";')
end

def get_camera_bytype
	Rho::Camera.getCameraByType(@params['cameraType'], url_for(:action => :get_camera_cb))
end

def show_supported_list
	@supported_list = Rho::Camera.supportedSizeList
	@supported_list = @supported_list.to_json
	Rho::WebView.executeJavascript("document.getElementById('expected').innerHTML = JSON.stringify(#{@supported_list});")
end

def show_preview_capture
	set_camera
	@props = {}
	@props['desiredHeight'] = @params['desiredHeight'].to_i if @params['desiredHeight']
	@props['desiredWidth'] = @params['desiredWidth'].to_i if @params['desiredWidth']
	if @params['captureSound']
		@props['captureSound'] = @@soundwav
	else
		@props['captureSound'] = ''
	end
	if @params['fileName']
		@props['fileName'] = @params['fileName']
	else
		@props['fileName'] = ''
	end
	if @params['outputFormat']
		@props['outputFormat'] = @params['outputFormat']
	else
		@props['outputFormat'] = 'image'
	end
	if @params['flashMode']
		@props['flashMode'] = @params['flashMode'] 
	else
		@props['flashMode'] = 'off'
	end
	if @params['aimMode']
		@props['aimMode'] = @params['aimMode'] 
	else
		@props['aimMode'] = 'off'
	end
	if @params['compressionFormat']
		@props['compressionFormat'] = @params['compressionFormat']
	else
		@props['compressionFormat'] = 'jpg'
	end
	if @params['previewTop']
		@props['previewTop'] = @params['previewTop'].to_i
	else
		@props['previewTop'] = 10
	end
	if @params['previewLeft']
		@props['previewLeft'] = @params['previewLeft'].to_i
	else
		@props['previewLeft'] = 10
	end
	if @params['previewWidth']
		@props['previewWidth'] = @params['previewWidth'].to_i
	else
		@props['previewWidth'] = 100
	end
	if @params['previewHeight']
		@props['previewHeight'] = @params['previewHeight'].to_i
	else
		@props['previewHeight'] = 60
	end
	$camera.showPreview(@props)
	sleep 10
	$camera.capture(url_for(:action => :preview_callback))
end

def show_preview_minimize
	set_camera
	$camera.showPreview()
	sleep 6
	Rho::Application.minimize()
	sleep 8
	Rho::Application.restore()
	sleep 10
	$camera.capture(url_for(:action => :camera_callback))
end

def show_preview_suspend
	set_camera
	$camera.showPreview()
	sleep 20
	$camera.capture(url_for(:action => :camera_callback))
end

def show_hide_preview
	set_camera
	$camera.showPreview()
	sleep 8
	$camera.hidePreview()
end

def show_preview_quit
	set_camera
	$camera.showPreview()
	sleep 8
	Rho::Application.quit()
end

def show_preview_rotate
	set_camera
	$camera.showPreview({'previewHeight' => 60, 'previewWidth' => 100, 'previewLeft' => 10, 'previewTop' => 10})
	sleep 10
	$camera.capture(url_for(:action => :camera_callback))
end

def take_picture
	set_camera
	@props = {}
	if @params['flashMode']
		if @params['flashMode'] == 'on'
			@props['flashMode'] = Rho::Camera::FLASH_ON
		elsif @params['flashMode'] == 'off'
			@props['flashMode'] = Rho::Camera::FLASH_OFF
		elsif @params['flashMode'] == 'auto'
			@props['flashMode'] = Rho::Camera::FLASH_AUTO
		elsif @params['flashMode'] == 'redEye'
			@props['flashMode'] = Rho::Camera::FLASH_RED_EYE
		elsif @params['flashMode'] == 'torch'
			@props['flashMode'] = Rho::Camera::FLASH_TORCH
		end
	else
		@props['flashMode'] = 'off'
	end
	if @params['aimMode']
		if @params['aimMode'] == 'on'
			@props['aimMode'] = Rho::Camera::AIM_ON
		elsif @params['aimMode'] == 'off'
			@props['aimMode'] = Rho::Camera::AIM_OFF
		end
	end
	if @params['outputFormat']
		if @params['outputFormat'] == 'image'
			@props['outputFormat'] = Rho::Camera::OUTPUT_FORMAT_IMAGE
		elsif @params['outputFormat'] == 'dataUri'
			@props['outputFormat'] = Rho::Camera::OUTPUT_FORMAT_DATAURI
		end
	# else
	# 	@props['outputFormat'] = Rho::Camera::OUTPUT_FORMAT_IMAGE
	end
	if @params['fileName']
		@props['fileName'] = @params['fileName']
	elsif (Rho::System.platform != 'ANDROID')
		@props['fileName'] = ''
	end
	if @params['enableEditing']
		if @params['enableEditing'] == 'true'
			@props['enableEditing'] = true
		elsif @params['enableEditing'] == 'false'
			@props['enableEditing'] = false
		end
	# elsif (Rho::System.platform == 'APPLE')
	# 	@props['enableEditing'] = false
	end
	if @params['captureSound']
		if @params['captureSound'] == 'wm'
			@props['captureSound'] = @@soundwav
		else
			@props['captureSound'] = @@soundmp3
		end
	else
		@props['captureSound'] = ''
	end
	if @params['useSystemViewfinder']
		if @params['useSystemViewfinder'] == 'true'
			@props['useSystemViewfinder'] = true
		elsif @params['useSystemViewfinder'] == 'false'
			@props['useSystemViewfinder'] = false
		end
	end
	if @params['saveToDeviceGallery']
		if @params['saveToDeviceGallery'] == 'true'
			@props['saveToDeviceGallery'] = true
		elsif @params['saveToDeviceGallery'] == 'false'
			@props['saveToDeviceGallery'] = false
		end
	end
	if @params['compressionFormat']
		if @params['compressionFormat'] == 'jpg'
			@props['compressionFormat'] = Rho::Camera::COMPRESSION_FORMAT_JPG 
		elsif @params['compressionFormat'] == 'png'
			@props['compressionFormat'] = Rho::Camera::COMPRESSION_FORMAT_PNG
		end
	end
	@props['colorModel'] = @params['colorModel'] if @params['colorModel']
	@props['desiredHeight'] = @params['desiredHeight'].to_i if @params['desiredHeight']
	@props['desiredWidth'] = @params['desiredWidth'].to_i if @params['desiredWidth']
	@props['previewTop'] = @params['previewTop'].to_i if @params['previewTop']
	@props['previewWidth'] = @params['previewWidth'].to_i if @params['previewWidth']
	@props['previewLeft'] = @params['previewLeft'].to_i if @params['previewLeft']
	@props['previewHeight'] = @params['previewHeight'].to_i if @params['previewHeight']
	$camera.takePicture(@props, url_for(:action => :camera_callback))
end

def take_picture_rotate
	set_camera
	$camera.takePicture({}, url_for(:action => :camera_callback))
	#sleep 10
	#Rho::ScreenOrientation.rightHanded()
end

def showpreview_misc
	set_camera
	$camera.showPreview({'fileName' => 'showpreviewImage'})
end

def takepic_misc
	set_camera
	$camera.takePicture({'fileName' => 'takepictureImage'}, url_for(:action => :camera_callback))
end

def hidepreview
	set_camera
	$camera.hidePreview()
end

def showpreview_persist
	set_camera
	@props = {
		'previewLeft' => 50,
		'previewTop' => 50,
		'previewHeight' => 80,
		'previewWidth' => 40,
		'fileName' => '\\Application\\persistCapture',
		'flashMode' => 'on',
		'aimMode' => 'on'
	};
	$camera.showPreview(@props)
end

end