require 'rho/rhocontroller'
require 'json'
require 'helpers/application_helper'
require 'helpers/browser_helper'

class NativemenubarController < Rho::RhoController
  
  def native_default
    Rho::NativeMenubar.defaultMainMenu
    #Rho::Log.info(natvieDefaultvalues, 'app')
  end
  
  def menu_test
    Rho::NativeMenubar.mainMenu = [
      {:label=>'Home',:action=>'Home',:disabled=>false},
      {:label=>'separator',:action=>'separator',:disabled=>false},
      {:label=>'Options',:action=>'Options',:disabled=>false},
      {:label=>'Log',:action=>'Log',:disabled=>false},
      {:label=>'Refresh',:action=>'Refresh',:disabled=>false},
      {:label=>'Exit',:action=>'Exit',:disabled=>false},
      {:label=>'Sync',:action=>'Sync',:disabled=>false},
      {:label=>'fullscreen',:action=>'fullscreen',:disabled=>false},
      {:label=>'Load a page',:action=>'/app/loading.html',:disabled=>false}
    ]
  end
  
  def menu_disabled
    Alert.show_popup("controller")
    Rho::NativeMenubar.mainMenu = [
      {:label=>'Home',:action=>'Home',:disabled=>false},
      {:label=>'Options',:action=>'Options',:disabled=>false},
      {:label=>'Log',:action=>'Log',:disabled=>true},
      {:label=>'Refresh',:action=>'Refresh',:disabled=>true},
      {:label=>'Exit',:action=>'Exit',:disabled=>false},
      {:label=>'Sync',:action=>'Sync',:disabled=>false},
      {:label=>'fullscreen',:action=>'fullscreen',:disabled=>false},
      {:label=>'Load a page',:action=>'/app/loading.html',:disabled=>false}
    ]
  end
  
  def extramenu_test
    Rho::NativeMenubar.extraMenu = [
      {:label=>'Home',:action=>'Home',:disabled=>false},
      {:label=>'separator',:action=>'separator',:disabled=>false},
      {:label=>'Options',:action=>'Options',:disabled=>false},
      {:label=>'Log',:action=>'Log',:disabled=>false},
      {:label=>'Refresh',:action=>'Refresh',:disabled=>false},
      {:label=>'Exit',:action=>'Exit',:disabled=>false},
      {:label=>'Sync',:action=>'Sync',:disabled=>false},
      {:label=>'fullscreen',:action=>'fullscreen',:disabled=>false},
      {:label=>'Load a page',:action=>'/app/loading.html',:disabled=>false}
    ]
  end

  def extramenu_disabled
    Rho::NativeMenubar.extraMenu = [
      {:label=>'Home',:action=>'Home',:disabled=>false},
      {:label=>'Options',:action=>'Options',:disabled=>false},
      {:label=>'Log',:action=>'Log',:disabled=>true},
      {:label=>'Refresh',:action=>'Refresh',:disabled=>true},
      {:label=>'Exit',:action=>'Exit',:disabled=>false},
      {:label=>'Sync',:action=>'Sync',:disabled=>false},
      {:label=>'fullscreen',:action=>'fullscreen',:disabled=>false},
      {:label=>'Load a page',:action=>'/app/loading.html',:disabled=>false}
    ]
  end

  def extramenu_action
    Rho::NativeMenubar.extraMenu = [
      {:label=>'Home',:action=>'Home',:disabled=>false},
      {:label=>'Options',:action=>'Options',:disabled=>false},
      {:label=>'Log',:action=>'Log',:disabled=>false},
      {:label=>'Refresh',:action=>'Refresh',:disabled=>false},
      {:label=>'Exit',:action=>'Exit',:disabled=>false},
      {:label=>'Sync',:action=>'Sync',:disabled=>false},
      {:label=>'fullscreen',:action=>'fullscreen',:disabled=>false}
    ]
  
    Rho::NativeMenubar.extraButton = {:label=>'Home',:action=>'Home',:disabled=>false}
  end
  
  def menu_action
    Rho::NativeMenubar.mainMenu = [ 
      {:label=>'Home',:action=>'Home',:disabled=>false},
      {:label=>'Options',:action=>'Options',:disabled=>false},
      {:label=>'Log',:action=>'Log',:disabled=>false},
      {:label=>'Refresh',:action=>'Refresh',:disabled=>false},
      {:label=>'Exit',:action=>'Exit',:disabled=>false},
      {:label=>'Sync',:action=>'Sync',:disabled=>false},
      {:label=>'fullscreen',:action=>'fullscreen',:disabled=>false}
    ]
  
    Rho::NativeMenubar.mainButton = {:label=> 'Home',:action=>'Home',:disabled=>false}
  end
  
end