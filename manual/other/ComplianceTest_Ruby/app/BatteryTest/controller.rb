require 'rho/rhocontroller'
require 'json'
require 'helpers/application_helper'
require 'helpers/browser_helper'

class BatteryTestController < Rho::RhoController

def status_callback
    @result = ""
	  @result += '<br/>AcLineStatus: ' + @params['acLineStatus']
    @result += '<br/>BatteryLifePercent: ' + @params['batteryLifePercent']
    @result += '<br/>BackupBatteryLifePercent: ' + @params['backupBatteryLifePercent']
    @result += '<br/>Trigger: ' + @params['trigger']
    @result += '<br/>BatteryLifeKnown: ' + @params['batteryLifeKnown']
    @result += '<br/>BackupBatteryLifeKnown: ' + @params['backupBatteryLifeKnown']
  Rho::WebView.executeJavascript("document.getElementById('actResult').innerHTML= '#{@result}'")
  Rho::WebView.executeJavascript("document.getElementById('actResult').style.display='block'")
end

def smart_battery_status_callback
  @result = ""
	@result += '<br/>serialNumber: ' + @params['serialNumber']
	@result += '<br/>partNumber: ' + @params['partNumber']
	@result += '<br/>batteryChargeCycles: ' + @params['batteryChargeCycles']
	@result += '<br/>ratedCapacity: ' + @params['ratedCapacity']
	@result += '<br/>manufactureDate: ' + @params['manufactureDate']
	@result += '<br/>stateOfHealth: ' + @params['stateOfHealth']
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