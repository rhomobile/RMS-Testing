require 'rho/rhocontroller'
require 'json'
require 'helpers/application_helper'
require 'helpers/browser_helper'

class KeyCaptureTestController < Rho::RhoController

# callback methods
def capturekey_callback
	Rho::WebView.executeJavascript("callbackdata(#{@params['keyValue']});")
end

def capturekey_callback_method
	Rho::WebView.executeJavascript("callbackdatafunc(#{@params['keyValue']});")
end

def trigger_callback
	Rho::WebView.executeJavascript("callbackdata(#{@params['triggerFlag']});")
end


# keycapture methods
def capturekey
	if @params['truth'] 
		if @params['call']
			Rho::KeyCapture.captureKey(true, @params['keystring'], url_for(:action => :capturekey_callback))
		else
			Rho::KeyCapture.captureKey(true, @params['keystring'])
		end
	else
		if @params['call']
			Rho::KeyCapture.captureKey(false, @params['keystring'], url_for(:action => :capturekey_callback))
		else
			Rho::KeyCapture.captureKey(false, @params['keystring'])
		end
	end
end

def capturekey_method
	if @params['truth'] 
		if @params['call']
			Rho::KeyCapture.captureKey(true, @params['keystring'], url_for(:action => :capturekey_callback_method))
		else
			Rho::KeyCapture.captureKey(true, @params['keystring'])
		end
	else
		if @params['call']
			Rho::KeyCapture.captureKey(false, @params['keystring'], url_for(:action => :capturekey_callback_method))
		else
			Rho::KeyCapture.captureKey(false, @params['keystring'])
		end
	end
end

def capturetrigger
	if @params['call']
		Rho::KeyCapture.captureTrigger(url_for(:action => :trigger_callback))
	else
		Rho::KeyCapture.captureTrigger()
	end
end

def remapkey
	Rho::KeyCapture.remapKey(@params['keystring1'], @params['keystring2'])
end

def homekey
	Rho::KeyCapture.homeKeyValue = @params['val']
end


end