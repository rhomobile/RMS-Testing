require 'rho/rhocontroller'
require 'helpers/application_helper'
require 'helpers/browser_helper'

class SystemRE1TestController < Rho::RhoController
  include BrowserHelper
  include ApplicationHelper
  
  def get_registry_sync
	puts "Retrieving Registry Setting for #{@params['regHive']}, #{@params['regSubkey']}, #{@params['regSetting']}"
	theRegSetting = Rho::System.getRegistrySetting({hive:@params['regHive'], key:@params['regSubkey'], setting:@params['regSetting']})
	puts "Registry Setting retrieved: #{theRegSetting}"
	render :json => theRegSetting
	return theRegSetting
  end
  
  def set_registry_sync
	puts "Setting Registry Setting for #{@params['regHive']}, #{@params['regType']}, #{@params['regSubkey']}, #{@params['regSetting']}, #{@params['regValue']}, persistent: #{@params['regPersistent']}"
	theRegSetting = Rho::System.setRegistrySetting({hive:@params['regHive'], type:@params['regType'], key:@params['regSubkey'], setting:@params['regSetting'], value:@params['regValue'], persistent:eval(@params['regPersistent'])})
#	theRegSetting = Rho::System.setRegistrySetting(Integer(@params['regHive']), Integer(@params['regType']), @params['regSubkey'], @params['regSetting'], @params['regValue'], eval(@params['regPersistent']))
	puts "Registry Setting Success?: #{theRegSetting}"
	returnValue = "false"
	if theRegSetting == true
		returnValue = "true"
	end
	render :json => returnValue
	return returnValue
  end
  
  def delete_registry_sync
	puts "Deleting Registry Setting for #{@params['regHive']}, #{@params['regSubkey']}, #{@params['regSetting']}, persistent: #{@params['regPersistent']}"
	theRegSetting = Rho::System.deleteRegistrySetting({hive:@params['regHive'], key:@params['regSubkey'], setting:@params['regSetting'], persistent:eval(@params['regPersistent'])})
#	theRegSetting = Rho::System.deleteRegistrySetting(Integer(@params['regHive']), @params['regSubkey'], @params['regSetting'], eval(@params['regPersistent']))
	returnValue = "false"
	if theRegSetting == true
		returnValue = "true"
	end
	render :json => returnValue
	return returnValue
  end
  
  def get_oem_sync
	puts "Retrieving OEM"
	theOem = Rho::System.oemInfo
	puts "OEM Info Retrieved: #{theOem}"
	render :json => theOem
	return theOem
  end
  
  def get_uuid_sync
	puts "Retrieving UUID"
	theUuid = Rho::System.uuid
	puts "UUID Retrieved: #{theUuid}"
	render :json => theUuid
	return theUuid
  end
  
  
  #@@test_proc = lambda{|args| puts "lamda: #{args}"}
  def index
	render :back => '/app/NetworkConnectionTest'
  end

 
end
