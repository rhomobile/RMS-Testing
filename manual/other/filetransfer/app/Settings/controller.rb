require 'rho'
require 'rho/rhocontroller'
require 'rho/rhoerror'
require 'helpers/browser_helper'

class SettingsController < Rho::RhoController
  include BrowserHelper
  
  def index
    @msg = @params['msg']
    render
  end
  
  def test_http
    puts "test HTTP"
    
    FileTransfer.transferEvent=url_for(:action => :transferEventListener)
    FileTransfer.destination="url('http://mbp-alex.local/test_methods')"
    FileTransfer.port=8081
    FileTransfer.source="url('file:///image/image.jpg')"
    FileTransfer.transfer
    
  end
  
  def test_https
    puts "test HTTPS"
    
    FileTransfer.transferEvent=url_for(:action => :transferEventListener)
    FileTransfer.destination="url('https://mbp-alex.local/test_methods')"
    FileTransfer.port=8082
    FileTransfer.source="url('file:///image/image.jpg')"
    FileTransfer.transfer
    
  end
  
  def test_https_dl
    puts "test HTTPS download"
    
    FileTransfer.transferEvent=url_for(:action => :transferEventListener)
    FileTransfer.source="url('https://mbp-alex.local/download_image')"
    FileTransfer.port=8082
    FileTransfer.destination="url('file:///image/image.jpg')"
    FileTransfer.transfer
    FileTransfer.overWrite=true
    
  end

  
  def transferEventListener
    puts "transferEventListener: #{@params.inspect}"
    
    Rho::Notification.showPopup( :message => @params.inspect, :buttons => [ { :id=>"cancel", :title=>"cancel"} ] )
  end


  
end
