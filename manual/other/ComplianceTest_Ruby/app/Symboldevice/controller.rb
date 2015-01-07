require 'rho/rhocontroller'
require 'json'
require 'helpers/application_helper'
require 'helpers/browser_helper'

class SymboldeviceController < Rho::RhoController


## Callback methods
def idle_callback
	data = "IdleCb Status: " + @params['status'].to_s
	data += "\n IdleCb Message: " + @params['message'].to_s
	
	Rho::WebView.executeJavascript("spec.addResult('#{data}')")
	Rho::WebView.executeJavascript("spec.displayResults();")
end

def wake_callback
	data = "WakeCb Status: " + @params['status'].to_s
	data += "\n WakeCb Message: " + @params['message'].to_s
	
	Rho::WebView.executeJavascript("spec.addResult('#{data}')")
	Rho::WebView.executeJavascript("spec.displayResults();")
end

def suspend_callback
	data = "SuspendCb Status: " + @params['status'].to_s
	data += "\n SuspendCb Message: " + @params['message'].to_s
	
	Rho::WebView.executeJavascript("spec.addResult('#{data}')")
	Rho::WebView.executeJavascript("spec.displayResults();")
end

def poweroff_callback
	data = "PowerOffCb Status: " + @params['status'].to_s
	data += "\n PowerOffCb Message: " + @params['message'].to_s
	
	Rho::WebView.executeJavascript("spec.addResult('#{data}')")
	Rho::WebView.executeJavascript("spec.displayResults();")
end

## symbolDevice Methods
def device_calibrate
	Rho::Device.calibrate()
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
		Rho::Device.reboot(@params['type'])
	else
		Rho::Device.reboot()
	end
end


end