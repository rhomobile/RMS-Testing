require 'rho'
require 'rho/rhocontroller'

class SettingsController < Rho::RhoController

  def ping
    puts "****** INSIDE PING: #{@params.inspect} *******"
    Rho::Network.post(
      :url => @params['url'],
      :body => { 'user_id' => @params['user_id'], 'message' => @params['message'] }.to_json,
      :callback => url_for(:action => :ping_callback),
      :headers => {
        'X-RhoConnect-API-TOKEN' => 'my-rhoconnect-token',
        'Content-Type' => 'application/json'
      }
    )
  end

  def ping_callback
    puts "ping finished: #{@params.inspect}"
  end

end
