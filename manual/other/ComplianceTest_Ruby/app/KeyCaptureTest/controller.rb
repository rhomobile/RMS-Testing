require 'rho/rhocontroller'
require 'json'
require 'helpers/application_helper'
require 'helpers/browser_helper'

class KeyCaptureTestController < Rho::RhoController

# callback methods
def capturekey_callback
	Rho::WebView.executeJavascript("callbackdata(#{@params['keyValue']});")
end

def capturekey_callback2
	Rho::WebView.executeJavascript("callbackdata2(#{@params['keyValue']});")
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

def capturekey2
	if @params['truth'] 
		if @params['call']
			Rho::KeyCapture.captureKey(true, @params['keystring'], url_for(:action => :capturekey_callback2))
		else
			Rho::KeyCapture.captureKey(true, @params['keystring'])
		end
	else
		if @params['call']
			Rho::KeyCapture.captureKey(false, @params['keystring'], url_for(:action => :capturekey_callback2))
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