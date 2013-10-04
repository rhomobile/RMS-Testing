require 'rho/rhocontroller'
require 'helpers/application_helper'
require 'helpers/browser_helper'

class IndicatorsTestController < Rho::RhoController
  include BrowserHelper
  include ApplicationHelper
  
  #########################
  def get_device_type
	puts "Retrieving OEM"
	theOem = Rho::System.oemInfo
	puts "OEM Info Retrieved: #{theOem}"
	render :json => theOem
	return theOem
  end
#######################

  def signal_status_async
	puts "Registering Signal Callback"
#	myProps = Hash.new
#	myProps['trigger'] = @params['theTrigger']
#	myProps['refreshInterval'] = @params['theRefreshInterval']
	Rho::Signal.wlanStatus(url_for(:action => :signalEvent))
  end

  def signal_status_sync
	puts "Signal Syncronously"
	signalValue = Rho::Signal.wlanStatus
	puts "next is Signal Value"
	puts signalValue
	returnValue = signalValue[@params['theReturnVal']]
	puts "Return value is: " + returnValue
	render :json => returnValue
	return returnValue
  end

  def deregister_signal_callback
	puts "Deregistering Signal Callback"
	Rho::Signal.stopWlanStatus
  end

  def signalEvent
	puts "Signal Event Fired: #{@params}"
#	WebView.execute_js("outputToPage('signalOutput', 'Signal Event: (Asynchronous).  Strength: #{@params["signalStrength"]}, ESS ID: #{@params["essid"]}, MacAddress: #{@params["macAddress"]}, AdapterName: #{@params["adapterName"]}, DHCP Server: #{@params["dhcpServer"]}, DHCP Static: #{@params["dhcpStatic"]}, Gateway: #{@params["gateway"]}, IP Address: #{@params["ipAddress"]}, RSSI: #{@params["rssi"]}, Subnet Mask: #{@params["subnetMask"]}, Wins: #{@params["wins"]}');")
	WebView.execute_js("outputToPage('indicatorOutput', 'Signal Event: (Asynchronous).  Strength: #{@params["signalStrength"]}, ESS ID: #{@params["essid"]}, MacAddress: #{@params["macAddress"]}, AdapterName: #{@params["adapterName"]}, DHCP Server: #{@params["dhcpServer"]}, DHCP Static: #{@params["dhcpStatic"]}, Gateway: #{@params["gateway"]}, IP Address: #{@params["ipAddress"]}, RSSI: #{@params["rssi"]}, Subnet Mask: #{@params["subnetMask"]}, Wins: #{@params["wins"]}');")
  end
  
  def change_signal_refresh
	puts "Changing Signal Refresh to #{@params['refreshMilliseconds']}"
	Rho::Signal.refreshInterval = Integer(@params['refreshMilliseconds'])
#	WebView.execute_js("outputToPage('signalOutput', 'Changing Signal Refresh to #{@params['refreshMilliseconds']}');")
  end

  def show_signal_icon
	puts "Setting Signal icon for #{@params['iconLeft']}, #{@params['iconTop']}, #{@params['iconLayout']}, #{@params['iconColour']}"
	Rho::Signal.showIcon({left:@params['iconLeft'], top:@params['iconTop'], color:@params['iconColour'], layout:@params['iconLayout']})
	returnValue = "true"
	render :json => returnValue
	return returnValue
  end

  def hide_signal_icon
	puts "Hiding Signal icon"
	Rho::Signal.hideIcon
	returnValue = "true"
	render :json => returnValue
	return returnValue
  end

  ##################################################################

  def get_smartbattery
	puts "Getting Smart Battery"
	smartBattery = Rho::Battery.smartBatteryStatus
	puts smartBattery
	returnValue = smartBattery[@params['theReturnVal']]
	puts returnValue
	render :json => returnValue
	return returnValue
  end
  
  def battery_status_async
	puts "Registering Battery Callback"
	myProps = Hash.new
	myProps['trigger'] = @params['theTrigger']
	myProps['refreshInterval'] = @params['theRefreshInterval']
	Rho::Battery.batteryStatus(myProps, url_for(:action => :batteryEvent))
  end

  def battery_status_sync
	puts "Battery Syncronously"
	batteryValue = Rho::Battery.batteryStatus({})
	puts "next is Battery Value"
	puts batteryValue
	returnValue = batteryValue[@params['theReturnVal']].to_s
	puts "Return value is: " + returnValue
	render :json => returnValue
	return returnValue
  end

  def deregister_battery_callback
	puts "Deregistering Battery Callback"
	Rho::Battery.stopBatteryStatus
  end

  def batteryEvent
	puts "Battery Event Fired: #{@params}"
	WebView.execute_js("outputToPage('indicatorOutput', 'Battery Event: (Asynchronous).  AC Line Status: #{@params["acLineStatus"]}, Battery Life Percent: #{@params["batteryLifePercent"]}, Backup Battery Life Percent: #{@params["backupBatteryLifePercent"]}, Status: #{@params["batteryStatus"]}, Battery Life Known: #{@params["batteryLifeKnown"]}, Backup Battery Life Known: #{@params["backupBatteryLifeKnown"]}');")
  end
  
  def change_battery_refresh
	puts "Changing Battery Refresh to #{@params['refreshMilliseconds']}"
	Rho::Battery.refreshInterval = Integer(@params['refreshMilliseconds'])
#	WebView.execute_js("outputToPage('batteryOutput', 'Changing Battery Refresh to #{@params['refreshMilliseconds']}');")
  end

  def show_battery_icon
	puts "Setting Battery icon for #{@params['iconLeft']}, #{@params['iconTop']}, #{@params['iconLayout']}, #{@params['iconColour']}"
	Rho::Battery.showIcon({left:@params['iconLeft'], top:@params['iconTop'], color:@params['iconColour'], layout:@params['iconLayout']})
	returnValue = "true"
	render :json => returnValue
	return returnValue
  end

  def hide_battery_icon
	puts "Hiding Battery icon"
	Rho::Battery.hideIcon
	returnValue = "true"
	render :json => returnValue
	return returnValue
  end  
  
####################################################  

  def show_keystate_defaults
	puts "Showing KeyState with Defaults"
	Rho::KeyState.showStates({})
	returnValue = "true"
	render :json => returnValue
	return returnValue
  end
  
  def show_keystate_values
	puts "Showing KeyState with Defaults"
	Rho::KeyState.showStates({right:@params['iconRight'], top:@params['iconTop'], width:@params['iconWidth'], height:@params['iconHeight']})
	returnValue = "true"
	render :json => returnValue
	return returnValue
  end
  
  def hide_keystate
	puts "Hiding Keystate"
	Rho::KeyState.hideStates
	returnValue = "true"
	render :json => returnValue
	return returnValue
  end
  
end
