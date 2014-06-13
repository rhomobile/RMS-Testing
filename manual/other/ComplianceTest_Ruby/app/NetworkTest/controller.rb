require 'rho/rhocontroller'
require 'json'
require 'helpers/application_helper'
require 'helpers/browser_helper'

class NetworkTestController < Rho::RhoController


def status_notify_callback
	Rho::WebView.executeJavascript("setActual('#{@params['current_status']}')")
    Rho::WebView.executeJavascript("setStatus('Network status changed from' + '#{@params['prev_status']}' + ' to ' + '#{@params['current_status']}')")
end


def set_status
	@result = ""
	@result +=  "<br/>phoneSignalStrength : " + @params["phoneSignalStrength"]
	@result +=	"<br/>networkOperator : " + @params["networkOperator"]
	@result += 	"<br/>connectionTypeAvailable : " + @params["connectionTypeAvailable"]
	@result += 	"<br/>connectionTypeConnected : " + @params["connectionTypeConnected"]
	@result += 	"<br/>connectionManagerMessage : " + @params["connectionManagerMessage"]
	Rho::WebView.executeJavascript("setStatus('#{@result}')")
end

def detect_connection_notify_callback
	Rho::WebView.executeJavascript("setActual('#{@params['connectionInformation']}')")
    
    if @params["connectionInformation"] == "Disconnected"
        Rho::WebView.executeJavascript("setStatus('#{@params['failureMessage']}')")
    else
    	Rho::WebView.executeJavascript("setStatus('Connected')")
    end
end


def response_timeout
	Rho::Network.responseTimeout = @params['time'].to_i if @params['time']
end


def start_status
	Rho::Network.startStatusNotify(6,  url_for(:action => :status_notify_callback))
end

def stop_status
	Rho::Network.stopStatusNotify()
	Rho::WebView.executeJavascript("setStatus('Status notification stopped')")
end

def disconnect_wan
	Rho::Network.disconnectWan()
	
	if @params['call']
		Rho::Network.connectWan("My ISP", url_for(:action => :set_status))
	elsif @params['notify']
		@myvar = Rho::Network.connectWan("My ISP")
		
		@result = ""
		@result +=  "<br/>phoneSignalStrength : " + @myvar["phoneSignalStrength"]
		@result +=	"<br/>networkOperator : " + @myvar["networkOperator"]
		@result += 	"<br/>connectionTypeAvailable : " + @myvar["connectionTypeAvailable"]
		@result += 	"<br/>connectionTypeConnected : " + @myvar["connectionTypeConnected"]
		@result += 	"<br/>connectionManagerMessage : " + @myvar["connectionManagerMessage"]
		Rho::WebView.executeJavascript("setStatus('#{@result}')")
	end
end

def disconnect_wan1
	Rho::Network.disconnectWan()
	Rho::Network.connectWan("My ISP", url_for(:action => :set_status))
end

def cell_network
	@cell_network = Rho::Network.hasCellNetwork()
    Rho::WebView.executeJavascript("setActual('#{@cell_network}')")
end

def has_network
	@network = Rho::Network.hasNetwork()
    Rho::WebView.executeJavascript("setActual('#{@network}')")
end

def wifi_network
	@wifi_network = Rho::Network.hasWifiNetwork()
    Rho::WebView.executeJavascript("setActual('#{@wifi_network}')")
end

def stop_detecting_connection
	Rho::Network.stopDetectingConnection(url_for(:action => :detect_connection_notify_callback))
	Rho::WebView.executeJavascript("setStatus('Network Detection stopped')")
end

end