require 'rho'
require 'rho/rhocontroller'
require 'rho/rhoerror'
require 'helpers/browser_helper'
require 'local_server'

class SettingsController < Rho::RhoController
  include BrowserHelper

  def index
    @msg = @params['msg']

    puts "-- gcm_push_client: before Rho::Push.getDeviceId"
    Rho::Push.getDeviceId url_for(:action => 'registration_callback')
    puts "-- gcm_push_client: after Rho::Push.getDeviceId"

    render
  end

  def registration_callback
    puts "-- Check push registration"

    host = SPEC_LOCAL_SERVER_HOST
    port = SPEC_LOCAL_SERVER_PORT

    puts "-- Sending device_id: #{@params['result']}"
    Rho::AsyncHttp.get :url => "http://#{host}:#{port}?device_id=#{@params['result']}"
  end

  def push_callback
    host = SPEC_LOCAL_SERVER_HOST
    port = SPEC_LOCAL_SERVER_PORT
    exit = nil

    if @params['command']
      case @params['command']
      when 'exit'
        exit = true
        puts 'Exit command received!!!!!'
      end
    end

    puts "-- Sending response: http://#{host}:#{port}?alert=#{@params['alert']} <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<"

    Rho::AsyncHttp.get :url => "http://#{host}:#{port}?alert=#{@params['alert']}"

    System.exit if exit

  end
end
