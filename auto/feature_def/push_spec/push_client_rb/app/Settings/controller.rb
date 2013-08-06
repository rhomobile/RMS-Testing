require 'rho'
require 'rho/rhocontroller'
require 'rho/rhoerror'
require 'helpers/browser_helper'
require 'local_server'

class SettingsController < Rho::RhoController
  include BrowserHelper

  def index
    @msg = @params['msg']
    puts "-- push server is #{RhoConf.get_property_by_name('Push.rhoconnect.pushServer')}"
    SyncEngine.login('pushclient', 'pushclient', '/app/Settings/login_callback' )
  end

  def login_callback
    errCode = @params['error_code'].to_i
    puts "-- login callback, error code: #{errCode}"

    if errCode != 0
      if errCode == Rho::RhoError::ERR_CUSTOMSYNCSERVER
        @msg = @params['error_message']
      end
      if !@msg || @msg.length == 0
        @msg = Rho::RhoError.new(errCode).message
      end
    end
    # # Register for push service
    Rho::Push.getDeviceId url_for(:action => 'registration_callback')

    puts "-- login callback, sent error code to the spec server"
    host = SPEC_LOCAL_SERVER_HOST
    port = SPEC_LOCAL_SERVER_PORT
    Rho::AsyncHttp.get :url => "http://#{host}:#{port}?method=login&error=#{errCode}"

  end

  def registration_callback
    host = SPEC_LOCAL_SERVER_HOST
    port = SPEC_LOCAL_SERVER_PORT

    puts "-- registration callback, deviceId: #{@params['result']}"
    Rho::AsyncHttp.get :url => "http://#{host}:#{port}?method=register&device_id=#{@params['result']}"
  end

  def push_callback
    host = SPEC_LOCAL_SERVER_HOST
    port = SPEC_LOCAL_SERVER_PORT
    exit = nil
    call_clientreset_and_logout = nil

    puts "-- push_callback: params #{@params.inspect}"
    if @params['alert']
      action = @params['alert']
      case @params['alert']
      when 'exit'
        exit = true
        puts '-- push_callback: exit command received!'
      when 'exit_and_logout'
        exit = true
        puts '-- push_callback: exit and logout command received!'
        SyncEngine.logout
      when 'logout'
        # TODO:
        puts '-- push_callback: logout command received!'
        SyncEngine.logout
      when 'login'
        puts '-- push_callback: login command received!'
        SyncEngine.login('pushclient', 'pushclient', '/app/Settings/login_callback')
      end
    end

    url = "http://#{host}:#{port}?method=push&alert=#{@params['alert']}&error=#{@params['error']}"
    if @params['error']
      puts "-- push_callback - skipping response: #{url} <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<"
    else
		  begin
		    if action == 'properties' # Read properties and return them
		      pushAppName = Rho::Push.pushAppName
          pushServer = Rho::Push.pushServer
          type = Rho::Push.type
          userNotifyMode = Rho::Push.userNotifyMode
          url = "http://#{host}:#{port}?pushAppName=#{pushAppName}&pushServer=#{pushServer}&type=#{type}&userNotifyMode=#{userNotifyMode}"
  		  elsif action == 'getProperties' # getProperty(name) and return all of them
		      pushAppName = Rho::Push.getProperty('pushAppName')
          pushServer = Rho::Push.getProperty('pushServer')
          type = Rho::Push.getProperty('type')
          userNotifyMode = Rho::Push.getProperty('userNotifyMode')
          url = "http://#{host}:#{port}?pushAppName=#{pushAppName}&pushServer=#{pushServer}&type=#{type}&userNotifyMode=#{userNotifyMode}"  		    
        elsif action == 'userNotifyMode'
          Rho::Push.userNotifyMode = 'backgroundNotifications'
          notifyMode = Rho::Push.userNotifyMode
          url = "http://#{host}:#{port}?userNotifyMode=#{notifyMode}"
		    end
			  puts "-- push_callback - get request: #{url}"
        res = Rho::AsyncHttp.get :url => url
        puts "-- push_callback - response: #{res} "
		  rescue Exception => e
			  "Exception has been thrown #{e.inspect}"
		  end
    end

    if call_clientreset_and_logout
      ::Rhom::Rhom.database_fullclient_reset_and_logout
      puts "push_callback: CALLING FULL CLIENT RESET AND LOGOUT!!!!"
    end

    System.exit if exit

  end
end
