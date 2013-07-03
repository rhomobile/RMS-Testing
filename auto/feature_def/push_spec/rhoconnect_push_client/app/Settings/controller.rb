require 'rho'
require 'rho/rhocontroller'
require 'rho/rhoerror'
require 'helpers/browser_helper'
require 'sync_server'
require 'local_server'
require 'push_server'


class SettingsController < Rho::RhoController
  include BrowserHelper

  def index
    @msg = @params['msg']
    puts "-- push server is #{RhoConf.get_property_by_name('Push.rhoconnect.pushServer')}"
    SyncEngine.login('pushclient', 'pushclient', '/app/Settings/login_callback' )

    # # Register for push service
    # Rho::Push.getDeviceId url_for(:action => 'registration_callback')
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

    host = SPEC_LOCAL_SERVER_HOST
    port = SPEC_LOCAL_SERVER_PORT
    Rho::AsyncHttp.get :url => "http://#{host}:#{port}?error=#{errCode}"
    puts "-- login callback, sent error code to the spec server"
  end

  def registration_callback
    puts "-- registration callback"

    host = SPEC_LOCAL_SERVER_HOST
    port = SPEC_LOCAL_SERVER_PORT

    puts "-- registration callback, deviceId: #{@params['result']}"
    Rho::AsyncHttp.get :url => "http://#{host}:#{port}?device_id=#{@params['result']}"
  end

  def push_callback
    puts "-- push_callback: params #{@params.inspect}"

    host = SPEC_LOCAL_SERVER_HOST
    port = SPEC_LOCAL_SERVER_PORT
    exit = nil
    call_clientreset_and_logout = nil

    if @params['alert']
      case @params['alert']
      when 'exit'
        exit = true
        puts '-- push_callback: exit command received!'
      when 'exit_and_logout'
        exit = true
        call_clientreset_and_logout = true
      when 'logout'
        # TODO:
        puts '-- push_callback: logout command received!'
        SyncEngine.logout
      when 'login'
        puts '-- push_callback: login command received!'
        SyncEngine.login('pushclient', 'pushclient', '/app/Settings/login_callback' )
      end
    end

    url = "http://#{host}:#{port}?alert=#{@params['alert']}&error=#{@params['error']}"
    if @params['error']
      puts "-- push_callback - skipping response: #{url} <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<"
    else
		  puts "-- push_callback - sending response: #{url} <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<"
		  Rho::AsyncHttp.get :url => url
    end

    if call_clientreset_and_logout
      ::Rhom::Rhom.database_fullclient_reset_and_logout
      puts "push_callback: CALLING FULL CLIENT RESET AND LOGOUT!!!!"
    end

    # puts "before exit, exit = #{exit}"
    if exit then
      # puts "before exit, exit = #{exit}"
      System.exit
      # puts "after exit, exit = #{exit}"
    end
    # puts "after exit, exit = #{exit}"
  end

end
