require 'rho/rhocontroller'
require 'json'
require 'helpers/application_helper'
require 'helpers/browser_helper'

class NavbarController < Rho::RhoController
  
  
  def navbar_create
    Rho::Navbar.create({ 'left' => {'action' => '/app/index.html', 'label' => 'Back'}, 'title' => 'Navbar Test'})
  end
  
  def navbar_create_right
    Rho::Navbar.create({ 'left' => {'action' => '/app/index.html', 'label' => 'Back'}, 'right' => {'action' => '/app/System/system.html', 'label' => 'System'}, 'title' => 'Navbar Test'})
  end
  
  def navbar_remove
    Rho::Navbar.remove()
  end
  
  
end