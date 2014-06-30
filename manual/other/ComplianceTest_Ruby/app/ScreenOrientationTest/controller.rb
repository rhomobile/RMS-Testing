require 'rho/rhocontroller'
require 'json'
require 'helpers/application_helper'
require 'helpers/browser_helper'

class ScreenOrientationTestController < Rho::RhoController

#ScreenOrientation Callback
def screenorientation_callback
  @result = @params.to_json
	Rho::WebView.executeJavascript("document.getElementById('fooBar').innerHTML= 'DATA:- ' + JSON.stringify(#{@result})")
	Rho::WebView.executeJavascript("document.getElementById('fooBar').style.display='block'")
end 

#ScreenOrientation methods
def auto_rotate
  Rho::ScreenOrientation.autoRotate = true;
end

def set_event
	Rho::ScreenOrientation.setScreenOrientationEvent(url_for(:action => :screenorientation_callback))
end


end