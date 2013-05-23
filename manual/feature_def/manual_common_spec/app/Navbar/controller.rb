require 'rho/rhocontroller'

class NavbarController < Rho::RhoController

  @@this_page = '/app/Navbar'

  def index
    render :back => '/public/app/index.html'
  end

  def enable
    Rho::Navbar.create :title => "NavBar test", :left => {:action => :back, :label => 'Back'}, :right => {:action => '/app/NativeToolbarTest', :label => "NativeToolBar"}
    render :action => :index
  end

  def enable1
    Rho::Navbar.create :title => "NavBar test", :left => {:action => :back, :lable => 'Back'}
    render :action => :index
  end

  def disable
    Rho::Navbar.remove
    render :action => :index
  end


end
