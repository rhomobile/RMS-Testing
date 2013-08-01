require 'rho/rhocontroller'

class NavbarController < Rho::RhoController

  @@this_page = '/app/Navbar'

  def index
    render :back => '/app'
  end

  def enable
    NavBar.create :title => "NavBar test", :left => {:action => :back, :label => 'Back'}, :right => {:action => '/app/NativeToolbarTest', :label => "NativeToolBar"}
    render :action => :index
  end

  def enable1
    NavBar.create :title => "NavBar test", :left => {:action => :back, :lable => 'Back'}
    render :action => :index
  end
  
  def enable2
    NavBar.create :title => "NavBar test", :right => {:action => '/app/NativeToolbarTest', :label => "NativeToolBar"}
    render :action => :index
  end

  def disable
    NavBar.remove
    render :action => :index
  end

end
