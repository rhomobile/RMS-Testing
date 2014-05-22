require 'rho/rhocontroller'
require 'json'
require 'helpers/application_helper'
require 'helpers/browser_helper'

class KeystateController < Rho::RhoController

def keystate_show
  Rho::KeyState.showStates({'right'=> 100, 'top'=> 150, 'height'=> 200, 'width'=> 250}) 
end

def keystate_hide
  Rho::KeyState.hideStates()
end

end