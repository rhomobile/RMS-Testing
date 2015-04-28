require 'rho/rhocontroller'
require 'json'
require 'helpers/application_helper'
require 'helpers/browser_helper'

class BatteryTestController < Rho::RhoController

def status_callback
  @result = ""
  @result += '<br/>Time Now: ' + Time.now.to_s
  @result += '<br/>AcLineStatus: ' + @params['acLineStatus'].to_s
  @result += '<br/>BatteryLifePercent: ' + @params['batteryLifePercent'].to_s
  @result += '<br/>BackupBatteryLifePercent: ' + @params['backupBatteryLifePercent'].to_s
  @result += '<br/>Trigger: ' + @params['trigger'].to_s
  @result += '<br/>BatteryLifeKnown: ' + @params['batteryLifeKnown'].to_s
  @result += '<br/>BackupBatteryLifeKnown: ' + @params['backupBatteryLifeKnown'].to_s
  Rho::WebView.executeJavascript("document.getElementById('actResult').innerHTML= '#{@result}'")
  Rho::WebView.executeJavascript("document.getElementById('actResult').style.display='block'")
end

def smart_battery_status_callback
  @result = ""
	@result += '<br/>serialNumber: ' + @params['serialNumber'].to_s
	@result += '<br/>partNumber: ' + @params['partNumber'].to_s
	@result += '<br/>batteryChargeCycles: ' + @params['batteryChargeCycles'].to_s
	@result += '<br/>ratedCapacity: ' + @params['ratedCapacity'].to_s
	@result += '<br/>manufactureDate: ' + @params['manufactureDate'].to_s
	@result += '<br/>stateOfHealth: ' + @params['stateOfHealth'].to_s
  Rho::WebView.executeJavascript("document.getElementById('actResult').innerHTML='#{@result}'")
  Rho::WebView.executeJavascript("document.getElementById('actResult').style.display='block'")
end

def stop_battery_status
	Rho::Battery.stopBatteryStatus()
end

def show_icon
	Rho::Battery.showIcon({'left' => 20, 'top' => 40, 'layout' => 'left', 'color' => '#FF0000'})
end

def hide_icon
  Rho::Battery.hideIcon()
end

def battery_status
	Rho::Battery.batteryStatus({'trigger' => 'periodic', 'refreshInterval' => 8000}, url_for(:action => :status_callback))
end

def smart_battery_status
	Rho::Battery.smartBatteryStatus(url_for(:action => :smart_battery_status_callback))
end

end