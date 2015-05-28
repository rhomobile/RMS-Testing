require 'rho/rhocontroller'
require 'json'
require 'helpers/application_helper'
require 'helpers/browser_helper'

class SignatureTestController < Rho::RhoController

#Added to preserve the default values of signature
def signature_setprops
	@preservedProperties = Hash.new
    @preservedProperties['bgColor'] = Rho::Signature.bgColor

    #added the if condition because on WM it's failing and saying Invalid compression format
    if @params['win']
    	@preservedProperties['compressionFormat'] = Rho::Signature.compressionFormat
	end

    @preservedProperties['fileName'] = Rho::Signature.fileName
    @preservedProperties['outputFormat'] = Rho::Signature.outputFormat
    @preservedProperties['penColor'] = Rho::Signature.penColor
    @preservedProperties['penWidth'] = Rho::Signature.penWidth
    @preservedProperties['border'] = Rho::Signature.border
    @preservedProperties['height'] = Rho::Signature.height
    @preservedProperties['left'] = Rho::Signature.left
    @preservedProperties['top'] = Rho::Signature.top
    @preservedProperties['width'] = Rho::Signature.width

    return @preservedProperties
end

def signature_setprop_afteach

	Rho::Signature.clear()

    #setting the default values after each test    
	Rho::Signature.bgColor = @preservedProperties['bgColor']
	#added the if condition because on WM it' faling and saying Invalid compression format
	if @params['win']
		Rho::Signature.compressionFormat = @preservedProperties['compressionFormat']
	end
	Rho::Signature.fileName = @preservedProperties['fileName']
	Rho::Signature.outputFormat = @preservedProperties['outputFormat']
	Rho::Signature.penColor = @preservedProperties['penColor']
	Rho::Signature.penWidth = @preservedProperties['penWidth']
	Rho::Signature.border = @preservedProperties['border']
	Rho::Signature.height = @preservedProperties['height']
	Rho::Signature.left = @preservedProperties['left']
	Rho::Signature.top = @preservedProperties['top']
	Rho::Signature.width = @preservedProperties['width']
	
end

def delay_method(delay)
	@readFlag = false
	timeout(delay) do @readFlag = true end
	return @readFlag
end

#callback method for capture image
def callbackImage
	status = @params['status']
	image = @params['imageUri']
	Rho::WebView.executeJavascript('callbackStatus("'+status+'")')
	Rho::WebView.executeJavascript('callbackImgpath("'+image+'")')
	Rho::WebView.executeJavascript('callbackImg("'+image+'")')
end

#callback method for capture datauri
def callbackDatauri
	status = @params['status']
	image = @params['imageUri'].gsub(/(?=\W)/, '\\')
	Rho::WebView.executeJavascript('callbackStatus("'+status+'")')
	Rho::WebView.executeJavascript('callbackDataURI("'+image+'")')
end


def signature_fullscr
	Rho::Signature.fileName = Rho::RhoFile.join(Rho::Application.databaseBlobFolder, @params['vtid'])
    Rho::Signature.takeFullScreen({}, url_for(:action => :callbackImage))
end

def signature_fullscr_optImage
	Rho::Signature.bgColor = '#FF0000'
    Rho::Signature.penColor = '#0000FF'
    Rho::Signature.penWidth = 3
    fileName = Rho::RhoFile.join(Rho::Application.databaseBlobFolder, @params['vtid'])
    Rho::Signature.takeFullScreen({'compressionFormat' => @params['const'], 'fileName' => fileName, 'outputFormat' => Rho::Signature::OUTPUT_FORMAT_IMAGE}, url_for(:action => :callbackImage))
end

def signature_fullscr_optUri
	Rho::Signature.bgColor = '#000000'
    Rho::Signature.penColor = '#FFFFFF'
    Rho::Signature.penWidth = 3
    fileName = Rho::RhoFile.join(Rho::Application.databaseBlobFolder, @params['vtid'])
    Rho::Signature.takeFullScreen({'compressionFormat' => @params['const'], 'fileName' => fileName, 'outputFormat' => Rho::Signature::OUTPUT_FORMAT_DATAURI}, url_for(:action => :callbackDatauri))
end

def signature_show
	Rho::Signature.fileName = Rho::RhoFile.join(Rho::Application.databaseBlobFolder, @params['vtid'])
	Rho::Signature.show()
end

def signature_show_opt
	fileName = Rho::RhoFile.join(Rho::Application.databaseBlobFolder, @params['vtid'])
	Rho::Signature.show({'bgColor' => '#FFFF8C00', 
		'penColor' => '#FF00FF00', 'penWidth' => 1, 'compressionFormat' => @params['const'], 
		'fileName' => fileName, 'outputFormat' => Rho::Signature::OUTPUT_FORMAT_IMAGE
	})
end

def signature_set_allprops
	Rho::Signature.outputFormat = 'dataUri'
	Rho::Signature.bgColor = '#00FF00'
    Rho::Signature.penColor = '#FF800000'
    Rho::Signature.penWidth = 5
    Rho::Signature.left = 15
    Rho::Signature.top = 60
    Rho::Signature.height = 150
    Rho::Signature.width = 200
    Rho::Signature.border = true
end

def signature_capture
	Rho::Signature.capture(url_for(:action => :callbackImage))
end

def signature_capture_datauri
	Rho::Signature.capture(url_for(:action => :callbackDatauri))
end

def signature_hide
	Rho::Signature.hide()
end

def signature_clear
	Rho::Signature.clear()
end

end