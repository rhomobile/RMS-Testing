require 'rho/rhocontroller'
require 'json'
require 'helpers/application_helper'
require 'helpers/browser_helper'

class TimerController < Rho::RhoController

## Callback methods

  def one_callback
    Rho::WebView.executeJavascript('alert("timer callback fired");') 
    #('document.getElementById("actResult").innerHTML= " timer callback fired"')
  end

  def timertest
    one = Rho::Timer.create()
    one.start(10000, url_for(:action => :one_callback));
  end

end