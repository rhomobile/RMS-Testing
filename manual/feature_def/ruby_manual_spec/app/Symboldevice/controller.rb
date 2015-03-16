require 'rho/rhocontroller'
require 'json'
require 'helpers/application_helper'
require 'helpers/browser_helper'

class SymboldeviceController < Rho::RhoController


## Callback methods
def caliberate_callback
	data = "Caliberate Status: " + @params['status']
	data += ", Caliberate Message: " + @params['message'] if @params['message']
	
	Rho::WebView.executeJavascript('document.getElementById("cbdata").innerHTML= "'+data+'";')
end

def idle_callback
	data = "IdleCb Status: " + @params['status']
	data += ", IdleCb Message: " + @params['message'] if @params['message']
	
	Rho::WebView.executeJavascript('document.getElementById("cbdata").innerHTML= "'+data+'";')
end

def wake_callback
	data = "WakeCb Status: " + @params['status']
	data += ", WakeCb Message: " + @params['message'] if @params['message']
	
	Rho::WebView.executeJavascript('document.getElementById("cbdata").innerHTML= "'+data+'";')
end

def suspend_callback
	data = "SuspendCb Status: " + @params['status']
	data += ", SuspendCb Message: " + @params['message'] if @params['message']
	
	Rho::WebView.executeJavascript('document.getElementById("cbdata").innerHTML= "'+data+'";')
end

def poweroff_callback
	data = "PowerOffCb Status: " + @params['status']
	data += ", PowerOffCb Message: " + @params['message'] if @params['message']
	
	Rho::WebView.executeJavascript('document.getElementById("cbdata").innerHTML= "'+data+'";')
end

def reboot_callback
	data = "Reboot Status: " + @params['status']
	data += ", Reboot Message: " + @params['message'] if @params['message']
	
	Rho::WebView.executeJavascript('document.getElementById("cbdata").innerHTML= "'+data+'";')
end

## symbolDevice Methods
def device_calibrate
	if @params['cb']
		Rho::Device.calibrate(url_for(:action => :caliberate_callback))
	else
		Rho::Device.calibrate()
	end
end

def device_idle
	if @params['cb']
		Rho::Device.idle(url_for(:action => :idle_callback))
	else
		Rho::Device.idle()
	end
end

def device_wake
	if @params['cb']
		Rho::Device.wake(url_for(:action => :wake_callback))
	else
		Rho::Device.wake()
	end
end

def device_suspend
	if @params['cb']
		Rho::Device.suspend(url_for(:action => :suspend_callback))
	else
		Rho::Device.suspend()
	end
end

def device_poweroff
	if @params['cb']
		Rho::Device.powerOff(url_for(:action => :poweroff_callback))
	else
		Rho::Device.powerOff()
	end
end

def device_reboot
	if @params['type']
		if @params['cb']
			Rho::Device.reboot(@params['type'], url_for(:action => :reboot_callback))
		end
		Rho::Device.reboot(@params['type'])
	else
		Rho::Device.reboot()
	end
end

end