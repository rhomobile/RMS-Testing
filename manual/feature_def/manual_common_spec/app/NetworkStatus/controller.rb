require 'rho/rhocontroller'

class NetworkStatusController < Rho::RhoController
  @layout = :simplelayout
  $callback_state = 'network status callback is not setted'

  def set_callback
    Rho::Network.startStatusNotify( 5, url_for( :action => :networkStatusCallback) )
    $callback_state = 'network status callback is setted'  
    redirect :action => :index
  end

  def unset_callback
      Rho::Network.stopStatusNotify()
    $callback_state = 'network status callback is not setted'  
    redirect :action => :index
  end
    
  def index
    render :back => '/app'  
  end

  def networkStatusCallback
    Alert.show_popup ("Network state changed from #{@params['prev_status']} to #{@params['current_status']}")    
  end

end
