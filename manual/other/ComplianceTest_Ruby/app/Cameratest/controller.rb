require 'rho/rhocontroller'
require 'json'
require 'helpers/application_helper'
require 'helpers/browser_helper'

class CameratestController < Rho::RhoController

$camera = nil


def set_camera
	camera_type = @params['camera_type']
	@obj = Rho::Camera.enumerate

	@obj.each do |camObj|
	  $camera = camObj if camObj.cameraType == camera_type
	end
end

## callback methods
def camera_callback
	@callback_data = "status : " + @params['status']
	@callback_data += "\nmessage : " + @params['message']
	@callback_data += "\nimageHeight : " + @params['imageHeight']
	@callback_data += "\nimageWidth : " + @params['imageWidth']
	@callback_data += "\nimageFormat : " + @params['imageFormat']
	@callback_data += "\nimageUri : " + @params['imageUri']

	@data_uri = @params['imageUri']
	callback_response = true;

	Rho::WebView.executeJavascript("document.getElementById('imageUri').src = #{@data_uri};")
	Rho::WebView.executeJavascript("spec.addResult(#{@callback_data});")
	Rho::WebView.executeJavascript("spec.displayResults();")
end

def get_callback
	@cb_data = @params.to_json

	Rho::WebView.executeJavascript("spec.addResult('Camera by using getCameraByType : ');")
	Rho::WebView.executeJavascript("spec.addResult(JSON.stringify(#{@cb_data}));")
	Rho::WebView.executeJavascript("spec.displayResults();")
	Rho::Camera.setDefault(@params)
	Rho::Camera.takePicture({}, url_for(:action => :camera_callback))
end


## camera api methods
def choose_picture
	@props = {}
	@props['colorModel'] = @params['colorModel'] if @params['colorModel']
	@props['desiredHeight'] = @params['desiredHeight'] if @params['desiredHeight']
	@props['desiredWidth'] = @params['desiredWidth'] if @params['desiredWidth']

	Rho::Camera.choosePicture(@props, url_for(:action => :camera_callback))
end

def camera_enumerate
	Rho::Camera.enumerate(url_for(:action => :get_callback))
end

def get_camera_bytype
	@props = {}
	@props['cameraType'] = @params['cameraType'] if @params['cameraType']

	Rho::Camera.getCameraByType(@props, url_for(:action => :get_callback))
end

def show_supported_list
	@supported_list = Rho::Camera.showSupportedList()
	@supported_list = @supported_list.to_json
	Rho::WebView.executeJavascript("spec.addResult(JSON.stringify(#{@supported_list}));")
end

def show_preview_capture_set1
	set_camera

	$camera.showPreview({'fileName' => '\\Application\\camImage', 'compressionFormat' => 'jpg', 'flashMode' => 'off', 'aimMode' => 'off', 
						'previewLeft'=> 10, 'previewTop' => 10, 'previewWidth' => 100, 'previewHeight' => 60})

	sleep(6000)

	$camera.capture(url_for(:action => :camera_callback))
end

def show_preview_capture_set2
	set_camera

	$camera.showPreview({'outputFormat' => 'dataUri', 'captureSound' => '\\Application\\alarm2.wav',
						'previewLeft'=> -10, 'previewTop' => -10, 'previewWidth' => 40, 'previewHeight' => 80})


	sleep(6000)

	$camera.capture(url_for(:action => :camera_callback))
end

def show_preview_capture_set3
	set_camera

	$camera.showPreview({'outputFormat' => 'image', 'flashMode' => 'on', 'aimMode' => 'on', 'captureSound' => '', 'desiredHeight' => 120, 'desiredWidth' => 240,
						'previewLeft'=> 10, 'previewTop' => 10, 'previewWidth' => 100, 'previewHeight' => 60})


	sleep(6000)

	$camera.capture(url_for(:action => :camera_callback))
end

def show_hide_preview
	set_camera
	$camera.showPreview()

	sleep(6000)
	$camera.hidePreview()
end

def take_picture
	set_camera

	@props = {}

	@props['flashMode'] = @params['flashMode'] if @params['flashMode']
	@props['aimMode'] = @params['aimMode'] if @params['aimMode']
	@props['outputFormat'] = @params['outputFormat'] if @params['outputFormat']
	@props['fileName'] = @params['fileName'] if @params['fileName']
	@props['enableEditing'] = @params['enableEditing'] if @params['enableEditing']
	@props['colorModel'] = @params['colorModel'] if @params['colorModel']
	@props['compressionFormat'] = @params['compressionFormat'] if @params['compressionFormat']
	@props['desiredHeight'] = @params['desiredHeight'] if @params['desiredHeight']
	@props['desiredWidth'] = @params['desiredWidth'] if @params['desiredWidth']

	$camera.takePicture(@props, url_for(:action => :camera_callback))
end

def flash_off
	set_camera

	$camera::flashMode::FLASH_OFF
end

def color_rgb
	set_camera

	$camera::colorModel::COLOR_MODEL_RGB
end

end