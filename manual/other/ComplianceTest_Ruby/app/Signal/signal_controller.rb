require 'rho/rhocontroller'
require 'json'
require 'helpers/application_helper'
require 'helpers/browser_helper'

class SignalController < Rho::RhoController


def status_callback
  #@result = @params.to_json
  @result = ""
	@result += '<br/>signalStrength  :- ' + @params['signalStrength']
	@result += '<br/>essid  :- ' + @params['essid']
	@result += '<br/>macAddress  :- ' + @params['macAddress']
	@result += '<br/>adapterName  :- ' + @params['adapterName']
	@result += '<br/>dhcpServer  :- ' + @params['dhcpServer']
	@result += '<br/>dhcpStatic  :- ' + @params['dhcpStatic']
	@result += '<br/>gateway  :- ' + @params['gateway']
	@result += '<br/>ipAddress  :- ' + @params['ipAddress']
	@result += '<br/>rssi   :- ' + @params['rssi']
	@result += '<br/>subnetMask   :- ' + @params['subnetMask']
	@result += '<br/>wins   :- ' + @params['wins']
  #Rho::WebView.executeJavascript("document.getElementById('actResult').innerHTML=JSON.stringify(#{@result})")
  Rho::WebView.executeJavascript("document.getElementById('actResult').innerHTML='#{@result}'")
  Rho::WebView.executeJavascript("document.getElementById('actResult').style.display='block'")
end

def show_icon
	Rho::SignalIndicators.showIcon({'left' => 20, 'top' => 40, 'layout' => 'left', 'color' => '#FF0000'})
end

def hide_icon
	Rho::SignalIndicators.hideIcon()
end

def wlan_status
	Rho::SignalIndicators.wlanStatus(url_for(:action => :status_callback))
end

def stop_wlan_status
  Rho::SignalIndicators.stopWlanStatus()
end

end